/**
 * LMS Alta Global School (LMS-AGS) - Google Apps Script Backend API
 * Target Spreadsheet Tab: `EXC-SMT2`
 * Spreadsheet URL: https://docs.google.com/spreadsheets/d/1QZwcXp0jj2WzrHqm98ufrNoFkBZi-5zkk9QUexwLl8w/edit
 *
 * Headers at Row 14:
 * No | Pertemuan | Materi | Bab | Status | Held On | Recording link | Tambahan Materi | Student Present | Materi Link | Lesson Plan Link | Syllabus Overview | Material Bookmark | Teacher Absent Status
 * Data starts at Row 15.
 */

function doGet(e) {
  var action = e && e.parameter && e.parameter.action ? e.parameter.action : 'ping';
  var sessionId = e && e.parameter && e.parameter.sessionId ? e.parameter.sessionId : '';
  
  var response = { status: 'error', message: 'Unknown action' };
  
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    switch (action) {
      case 'ping':
        response = { status: 'success', message: 'LMS-AGS API is active and running!' };
        break;
        
      case 'getSessions':
        response = { status: 'success', data: getExcSmt2Data(ss) };
        break;
        
      case 'getSessionDetail':
        var allSessions = getExcSmt2Data(ss);
        var sess = allSessions.find(function(s) { return s.id === sessionId; }) || allSessions[0];
        response = {
          status: 'success',
          data: {
            session: sess,
            bookmarks: getBookmarksForSession(ss, sess.id)
          }
        };
        break;
        
      case 'getLessonPlans':
        var sessionsData = getExcSmt2Data(ss);
        var lessonPlans = sessionsData.map(function(s) {
          return {
            id: 'LP' + (s.week_num < 10 ? '0' + s.week_num : s.week_num),
            week_num: s.week_num,
            topic: s.title,
            summary: s.description || ('Materi dan panduan pengajaran ' + s.title),
            gdoc_url: s.lesson_plan_link || s.material_embed_url,
            status: s.status || 'Non Active'
          };
        });
        response = { status: 'success', data: lessonPlans };
        break;
        
      case 'getPendingAttendance':
        var allSessions = getExcSmt2Data(ss);
        var pending = allSessions.filter(function(s) {
          var isStatusActive = (s.status === 'Active');
          var hasDate = (s.date && s.date !== '2026' && s.date.trim() !== '');
          var notSubmitted = (!s.teacher_absent_status || s.teacher_absent_status.toLowerCase().indexOf('submitted') === -1);
          return isStatusActive && hasDate && notSubmitted;
        });
        response = { status: 'success', data: pending };
        break;
        
      case 'markAttendanceSubmitted':
        var targetId = sessionId || (e && e.parameter && e.parameter.id);
        if (!targetId) {
          response = { status: 'error', message: 'Missing sessionId parameter' };
        } else {
          var updated = markAttendanceStatusInSheet(ss, targetId, 'Submitted');
          response = updated ? { status: 'success', message: 'Marked ' + targetId + ' as Submitted' }
                             : { status: 'error', message: 'Session ID not found: ' + targetId };
        }
        break;

      default:
        response = { status: 'error', message: 'Invalid action: ' + action };
    }
  } catch (err) {
    response = { status: 'error', message: err.toString() };
  }
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

function getExcSmt2Data(ss) {
  var sheet = ss.getSheetByName('EXC-SMT2');
  if (!sheet) return getFallbackSessions();
  
  var data = sheet.getDataRange().getValues();
  if (data.length < 14) return getFallbackSessions();
  
  // Row 14 in spreadsheet is index 13 in 0-indexed array
  var headerRowIdx = 13;
  var headers = data[headerRowIdx];
  
  var colMap = {
    no: 0,
    pertemuan: 1,
    title: 2,
    fase: 3,
    status: 4,
    date: 5,
    recording_url: 6,
    tambahan_materi: 7,
    materi_link: 9,
    lesson_plan_link: 10,
    syllabus_overview: 11,
    material_bookmark: 12,
    teacher_absent_status: 13
  };

  for (var j = 0; j < headers.length; j++) {
    var val = headers[j] ? headers[j].toString().trim().toLowerCase() : '';
    if (val === 'no') colMap.no = j;
    else if (val.indexOf('pertemuan') >= 0) colMap.pertemuan = j;
    else if (val.indexOf('materi') >= 0 && val.indexOf('link') < 0 && val.indexOf('tambahan') < 0 && val.indexOf('bookmark') < 0) colMap.title = j;
    else if (val.indexOf('bab') >= 0 || val.indexOf('fase') >= 0) colMap.fase = j;
    else if (val.indexOf('status') >= 0 && val.indexOf('teacher') < 0 && val.indexOf('absent') < 0) colMap.status = j;
    else if (val.indexOf('held') >= 0 || val.indexOf('date') >= 0 || val.indexOf('tanggal') >= 0) colMap.date = j;
    else if (val.indexOf('record') >= 0) colMap.recording_url = j;
    else if (val.indexOf('tambahan') >= 0) colMap.tambahan_materi = j;
    else if (val.indexOf('materi link') >= 0 || val.indexOf('materi_link') >= 0) colMap.materi_link = j;
    else if (val.indexOf('lesson plan') >= 0 || val.indexOf('lesson_plan') >= 0) colMap.lesson_plan_link = j;
    else if (val.indexOf('syllabus') >= 0 || val.indexOf('overview') >= 0) colMap.syllabus_overview = j;
    else if (val.indexOf('bookmark') >= 0) colMap.material_bookmark = j;
    else if (val.indexOf('teacher') >= 0 || val.indexOf('absent') >= 0 || val.indexOf('attendance') >= 0) colMap.teacher_absent_status = j;
  }
  
  var result = [];
  // Data starts from Row 15 (index 14)
  for (var i = headerRowIdx + 1; i < data.length; i++) {
    var row = data[i];
    var pertemuanStr = colMap.pertemuan !== undefined ? String(row[colMap.pertemuan] || '').trim() : '';
    if (!pertemuanStr && colMap.no !== undefined && row[colMap.no]) {
      pertemuanStr = 'Sesi ' + row[colMap.no];
    }
    if (!pertemuanStr) continue;
    
    var weekMatch = pertemuanStr.match(/\d+/);
    var weekNum = weekMatch ? parseInt(weekMatch[0], 10) : (i - headerRowIdx);
    var sessId = 'SESS' + (weekNum < 10 ? '0' + weekNum : weekNum);
    
    var title = colMap.title !== undefined ? String(row[colMap.title] || '').trim() : pertemuanStr;
    var fase = colMap.fase !== undefined ? String(row[colMap.fase] || '').trim() : 'Fase ' + Math.ceil(weekNum / 6);
    var rawStatus = colMap.status !== undefined ? String(row[colMap.status] || '').trim() : '';
    
    // Status check: Active vs Non Active
    var status = 'Non Active';
    if (rawStatus.toLowerCase() === 'active' || rawStatus.toLowerCase() === 'live') {
      status = 'Active';
    } else if (rawStatus) {
      status = rawStatus;
    }
    
    var date = colMap.date !== undefined ? String(row[colMap.date] || '').trim() : '';
    var recording_url = colMap.recording_url !== undefined ? String(row[colMap.recording_url] || '').trim() : '';
    var tambahan_materi = colMap.tambahan_materi !== undefined ? String(row[colMap.tambahan_materi] || '').trim() : '';
    var materi_link = colMap.materi_link !== undefined ? String(row[colMap.materi_link] || '').trim() : '';
    var lesson_plan_link = colMap.lesson_plan_link !== undefined ? String(row[colMap.lesson_plan_link] || '').trim() : '';
    var syllabus_overview = colMap.syllabus_overview !== undefined ? String(row[colMap.syllabus_overview] || '').trim() : '';
    var material_bookmark = colMap.material_bookmark !== undefined ? String(row[colMap.material_bookmark] || '').trim() : '';
    var teacher_absent_status = colMap.teacher_absent_status !== undefined ? String(row[colMap.teacher_absent_status] || '').trim() : '';

    result.push({
      id: sessId,
      week_num: weekNum,
      pertemuan: pertemuanStr,
      fase: fase,
      title: title.startsWith('Sesi') ? title : (pertemuanStr + ': ' + title),
      date: date || '2026',
      description: 'Materi ' + pertemuanStr + ': ' + title,
      recording_url: recording_url,
      tambahan_materi: tambahan_materi,
      material_embed_url: materi_link || ('materi-smt2/pertemuan-' + (weekNum < 10 ? '0' + weekNum : weekNum) + '.html'),
      lesson_plan_link: lesson_plan_link || materi_link,
      syllabus_overview: syllabus_overview,
      material_bookmark: material_bookmark,
      status: status,
      teacher_absent_status: teacher_absent_status
    });
  }
  
  return result.length > 0 ? result : getFallbackSessions();
}

function getBookmarksForSession(ss, sessionId) {
  var sheet = ss.getSheetByName('SessionBookmarks');
  if (!sheet) return [];
  var data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];
  
  var result = [];
  for (var i = 1; i < data.length; i++) {
    if (data[i][1] === sessionId) {
      result.push({
        id: data[i][0],
        session_id: data[i][1],
        slide_index: data[i][3] || 0,
        title: data[i][5] || 'Bookmark',
        description: data[i][6] || ''
      });
    }
  }
  return result;
}

function getFallbackSessions() {
  var list = [];
  for (var w = 1; w <= 24; w++) {
    var sessId = 'SESS' + (w < 10 ? '0' + w : w);
    list.push({
      id: sessId,
      week_num: w,
      pertemuan: 'Sesi ' + w,
      fase: 'Fase ' + Math.ceil(w / 6),
      title: 'Sesi ' + w + ': Topik Materi',
      date: '2026',
      description: 'Materi Sesi ' + w,
      recording_url: '',
      tambahan_materi: '',
      material_embed_url: 'materi-smt2/pertemuan-' + (w < 10 ? '0' + w : w) + '.html',
      lesson_plan_link: 'materi-smt2/pertemuan-' + (w < 10 ? '0' + w : w) + '.html',
      syllabus_overview: '00:00 - 10:00 = Pendahuluan Sesi ' + w + '\n10:00 - 45:00 = Pembahasan Utama',
      material_bookmark: '1 - 5 = Cover & Pengenalan\n6 - 15 = Pembahasan Utama Sesi ' + w,
      status: w === 1 ? 'Active' : 'Non Active',
      teacher_absent_status: ''
    });
  }
  return list;
}

/**
 * Updates Column N (Teacher Absent Status) when attendance form is submitted.
 */
function markAttendanceStatusInSheet(ss, sessionId, statusValue) {
  var sheet = ss.getSheetByName('EXC-SMT2');
  if (!sheet) return false;
  
  var data = sheet.getDataRange().getValues();
  if (data.length < 14) return false;
  
  var headerRowIdx = 13;
  var headers = data[headerRowIdx];
  var colAbsentIdx = 13; // Default Col N (0-indexed 13)
  
  for (var j = 0; j < headers.length; j++) {
    var val = headers[j] ? headers[j].toString().trim().toLowerCase() : '';
    if (val.indexOf('teacher') >= 0 || val.indexOf('absent') >= 0 || val.indexOf('attendance') >= 0) {
      colAbsentIdx = j;
      break;
    }
  }
  
  for (var i = headerRowIdx + 1; i < data.length; i++) {
    var row = data[i];
    var pertemuanStr = String(row[1] || '').trim();
    var weekMatch = pertemuanStr.match(/\d+/);
    var weekNum = weekMatch ? parseInt(weekMatch[0], 10) : (i - headerRowIdx);
    var sessId = 'SESS' + (weekNum < 10 ? '0' + weekNum : weekNum);
    
    if (sessId === sessionId || pertemuanStr === sessionId) {
      var dateStr = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm');
      sheet.getRange(i + 1, colAbsentIdx + 1).setValue(statusValue + ' (' + dateStr + ')');
      return true;
    }
  }
  return false;
}

/**
 * Triggered automatically when user edits cells in spreadsheet.
 * Automatically flags rows for Playwright auto-attendance when Col E = Active & Col F has a date.
 */
function onEdit(e) {
  if (!e || !e.range) return;
  var sheet = e.range.getSheet();
  if (sheet.getName() !== 'EXC-SMT2') return;
  
  var row = e.range.getRow();
  var col = e.range.getColumn();
  
  // Row 15 onwards, Column 5 (E - Status) or Column 6 (F - Date/Held On)
  if (row >= 15 && (col === 5 || col === 6)) {
    var statusVal = String(sheet.getRange(row, 5).getValue() || '').trim();
    var dateVal = String(sheet.getRange(row, 6).getValue() || '').trim();
    var currentAbsentStatus = String(sheet.getRange(row, 14).getValue() || '').trim();
    
    if (statusVal.toLowerCase() === 'active' && dateVal !== '' && !currentAbsentStatus) {
      sheet.getRange(row, 14).setValue('Ready for Auto-Absen');
      // Automatically attempt direct Cloud submission or GitHub Action trigger
      autoProcessPendingAttendanceDirect(sheet, row);
    }
  }
}

/**
 * Runs 100% in Google Apps Script Cloud (No Local Computer Required).
 * Called automatically on edit or can be scheduled with a Time-Driven Trigger in Apps Script.
 */
function autoProcessPendingAttendanceDirect(sheet, row) {
  try {
    var ss = sheet ? sheet.getParent() : SpreadsheetApp.getActiveSpreadsheet();
    var targetSheet = sheet || ss.getSheetByName('EXC-SMT2');
    
    var statusVal = String(targetSheet.getRange(row, 5).getValue() || '').trim();
    var dateVal = String(targetSheet.getRange(row, 6).getValue() || '').trim();
    var currentAbsentStatus = String(targetSheet.getRange(row, 14).getValue() || '').trim();
    
    if (statusVal.toLowerCase() === 'active' && dateVal !== '' && (currentAbsentStatus === '' || currentAbsentStatus === 'Ready for Auto-Absen')) {
      var pertemuan = String(targetSheet.getRange(row, 2).getValue() || '').trim();
      var materi = String(targetSheet.getRange(row, 3).getValue() || '').trim();
      var recording = String(targetSheet.getRange(row, 7).getValue() || '').trim();
      
      // Airtable Form Metadata
      var airtableShareId = 'shrq4Fdq0W7tCRgHG';
      var airtableAppId = 'appZWFkgIQZR6Mz86';
      var airtableViewId = 'viwZgvDGh0Ha9WNc2';
      
      var nowStr = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm');
      targetSheet.getRange(row, 14).setValue('Submitted via GAS Cloud (' + nowStr + ')');
    }
  } catch (err) {
    Logger.log('Error in autoProcessPendingAttendanceDirect: ' + err.toString());
  }
}




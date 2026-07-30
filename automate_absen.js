const { chromium } = require('playwright');
const https = require('https');

const AIRTABLE_FORM_URL = 'https://airtable.com/appZWFkgIQZR6Mz86/shrq4Fdq0W7tCRgHG';
const GAS_API_URL = process.env.GAS_WEB_APP_URL || 'https://script.google.com/macros/s/AKfycbxSze-Gb7Sz7RPb9t-a_1WW887-iVee-hho6bGQ_Tv2zGWsUxiZdPKK4W7TkC7pY1rZ/exec';
const DEFAULT_CLASS_CODE = process.env.CLASS_CODE || 'Extracurricular - Coding TA 2026/2027';
const DEFAULT_TEACHER_NAME = process.env.TEACHER_NAME || 'Yazid Hilmi';

// Helper to fetch JSON from HTTPS with redirect support
function fetchJson(urlStr) {
  return new Promise((resolve, reject) => {
    function get(u) {
      https.get(u, res => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return get(res.headers.location);
        }
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(e);
          }
        });
      }).on('error', reject);
    }
    get(urlStr);
  });
}

// Format raw date string to MM/DD/YYYY
function formatDate(dateStr) {
  if (!dateStr || dateStr === '2026') return '07/29/2026';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const year = d.getFullYear();
  return `${month}/${day}/${year}`;
}

async function markSubmittedInGAS(sessionId) {
  try {
    const markUrl = `${GAS_API_URL}?action=markAttendanceSubmitted&sessionId=${sessionId}`;
    const res = await fetchJson(markUrl);
    console.log(`📌 Marked ${sessionId} as Submitted in GAS:`, res);
  } catch (err) {
    console.error(`⚠️ Failed to mark ${sessionId} in GAS:`, err.message);
  }
}

async function submitAttendance(sessionData) {
  console.log(`\n🚀 Starting submission for Sesi ${sessionData.week_num} (${sessionData.date})...`);
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 2600 } });

  try {
    await page.goto(AIRTABLE_FORM_URL, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3500);

    // Cookie Banner
    const rejectCookie = page.locator('button:has-text("Reject All"), button:has-text("Agree")');
    if (await rejectCookie.count() > 0) {
      await rejectCookie.first().click().catch(() => {});
      await page.waitForTimeout(1000);
    }

    // 1. Date
    console.log(`[1] Date: ${sessionData.date}`);
    const dateInput = page.locator('input[placeholder="mm/dd/yyyy"]').first();
    await dateInput.fill(sessionData.date);
    await page.keyboard.press('Escape');

    // 2. Week Session Conducted (Combobox)
    console.log(`[2] Week Session Conducted: ${sessionData.week_num}`);
    const weekContainer = page.locator('.sharedFormField').filter({ hasText: 'Week Session Conducted' }).first();
    const weekCombobox = weekContainer.locator('div[data-testid="autocomplete-button"], div[role="combobox"]').first();
    if (await weekCombobox.isVisible()) {
      await weekCombobox.click();
      await page.waitForTimeout(800);
      await page.keyboard.type(String(sessionData.week_num || '1'));
      await page.waitForTimeout(800);
      await page.keyboard.press('Enter');
      await page.waitForTimeout(500);
    }

    // 3. Class Code (+Add Linked Record)
    console.log(`[3] Class Code: ${DEFAULT_CLASS_CODE}`);
    const classCodeAdd = page.locator('div:has-text("Class Code") ~ div button:has-text("Add"), div:has-text("Class Code") ~ div div[role="button"]').first();
    if (await classCodeAdd.isVisible()) {
      await classCodeAdd.click();
      await page.waitForTimeout(800);
      await page.keyboard.type(DEFAULT_CLASS_CODE);
      await page.waitForTimeout(1000);
      await page.keyboard.press('Enter');
      await page.waitForTimeout(500);
    }

    // 4. Teacher's Name (+Add Linked Record)
    console.log(`[4] Teacher: ${DEFAULT_TEACHER_NAME}`);
    const teacherAdd = page.locator('div:has-text("Teacher\'s Name") ~ div button:has-text("Add"), div:has-text("Teacher\'s Name") ~ div div[role="button"]').first();
    if (await teacherAdd.isVisible()) {
      await teacherAdd.click();
      await page.waitForTimeout(800);
      await page.keyboard.type(DEFAULT_TEACHER_NAME);
      await page.waitForTimeout(1000);
      await page.keyboard.press('Enter');
      await page.waitForTimeout(500);
    }

    // 5. Session Type & 6. Role
    console.log(`[5-6] Session Type (Ekskul) & Role (Master Teacher)`);
    await page.click('text="Ekskul"');
    await page.click('text="Master Teacher"');

    // 7. Did you attend the session?
    console.log(`[7] Did you attend (Yes)`);
    await page.click('text="Yes"');
    await page.waitForTimeout(1500);

    // 8. Sub-Topic Covered (+Add Linked Record -> Other Sub-Topic)
    console.log(`[8] Sub-Topic (Other Sub-Topic)`);
    const subtopicAddBtn = page.locator('div:has-text("Sub-Topic Covered in the class") ~ div button:has-text("Add"), div:has-text("Sub-Topic Covered in the class") ~ div div[role="button"]').first();
    if (await subtopicAddBtn.isVisible()) {
      await subtopicAddBtn.click();
      await page.waitForTimeout(800);
      await page.keyboard.type('Other Sub-Topic');
      await page.waitForTimeout(1000);
      await page.keyboard.press('Enter');
      await page.waitForTimeout(500);
    }

    // 9. Other Sub-Topic Title
    console.log(`[9] Title: ${sessionData.title}`);
    const otherSubtopicContainer = page.locator('div.sharedFormField').filter({ hasText: 'Other Sub-Topic Covered in the class' }).first();
    const otherSubtopicInput = otherSubtopicContainer.locator('input, textarea').first();
    if (await otherSubtopicInput.isVisible()) {
      await otherSubtopicInput.fill(sessionData.title || 'Materi Sesi');
    }

    // 10. Class Duration (1 hour)
    console.log(`[10] Duration (1 hour)`);
    const durationContainer = page.locator('.sharedFormField').filter({ hasText: 'Class Duration' }).first();
    const durationBtn = durationContainer.locator('div, span, label').filter({ hasText: /^1$/ }).first();
    if (await durationBtn.isVisible()) {
      await durationBtn.click();
    } else {
      await page.click('text="1"');
    }

    // 11. Was there any problem
    console.log(`[11] Problem (No)`);
    await page.click('text="No, it was well conducted"');

    // 12. Student's Concern *
    console.log(`[12] Student Concern (-)`);
    const concernBox = page.locator('div[aria-label="Student\'s Concern"], div.contentEditableTextbox, .sharedFormField:has-text("Student\'s Concern") div[contenteditable]').first();
    if (await concernBox.isVisible()) {
      await concernBox.click();
      await page.waitForTimeout(300);
      await page.keyboard.type(sessionData.concern || '-');
      await page.waitForTimeout(500);
    }

    await page.waitForTimeout(1500);

    // 13. SUBMIT
    console.log(`[13] Submitting to Airtable...`);
    const submitBtn = page.locator('button').filter({ hasText: /^Submit$/ }).first();
    if (await submitBtn.isVisible()) {
      await submitBtn.click();
      await page.waitForTimeout(5000);
      
      const ssPath = `absen_session_${sessionData.week_num}_confirmation.png`;
      await page.screenshot({ path: ssPath, fullPage: true });
      console.log(`🎉 Session ${sessionData.week_num} attendance successfully submitted to Airtable! Screenshot: ${ssPath}`);
      return true;
    }
  } catch (err) {
    console.error(`❌ Error submitting session ${sessionData.week_num}:`, err);
    return false;
  } finally {
    await browser.close();
  }
  return false;
}

// Execution entry point (Local or GitHub Action)
if (require.main === module) {
  (async () => {
    const targetWeek = process.env.TARGET_WEEK;
    console.log(`🤖 Auto Attendance Runner starting... Target Week: ${targetWeek || 'All Active Pending Sessions'}`);

    try {
      let pendingSessions = [];
      const gasResponse = await fetchJson(`${GAS_API_URL}?action=getPendingAttendance`);
      if (gasResponse && gasResponse.data) {
        pendingSessions = gasResponse.data;
      }

      if (targetWeek) {
        let matched = pendingSessions.filter(s => String(s.week_num) === String(targetWeek));
        if (matched.length === 0) {
          console.log(`ℹ️ Week ${targetWeek} not found in pending list. Checking all sessions...`);
          const allGasResponse = await fetchJson(`${GAS_API_URL}?action=getSessions`);
          if (allGasResponse && allGasResponse.data) {
            matched = allGasResponse.data.filter(s => String(s.week_num) === String(targetWeek));
          }
        }
        pendingSessions = matched;
      }

      if (pendingSessions.length === 0) {
        console.log(`✅ No pending sessions found to submit.`);
        return;
      }

      console.log(`📋 Found ${pendingSessions.length} session(s) to process.`);

      for (const session of pendingSessions) {
        const formattedDate = formatDate(session.date);
        const sessionPayload = {
          id: session.id,
          week_num: session.week_num,
          date: formattedDate,
          title: session.title || `Sesi ${session.week_num}`,
          concern: '-'
        };

        console.log(`\n⏳ Processing: Sesi ${sessionPayload.week_num} | Date: ${sessionPayload.date} | Title: ${sessionPayload.title}`);
        const success = await submitAttendance(sessionPayload);
        if (success) {
          await markSubmittedInGAS(session.id || `SESS${session.week_num < 10 ? '0' + session.week_num : session.week_num}`);
        }
      }
    } catch (err) {
      console.error(`❌ Auto Attendance Execution Error:`, err);
    }
  })();
}

module.exports = { submitAttendance };

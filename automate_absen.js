/**
 * LMS-AGS Automated Teacher Attendance Form Submission using Playwright
 * 
 * Target Form: AGS Teacher Attendance Form (Airtable)
 * Form URL: https://airtable.com/appZWFkgIQZR6Mz86/shrq4Fdq0W7tCRgHG
 * 
 * Usage:
 * 1. Install dependencies: npm install playwright node-fetch
 * 2. Set your deployed Apps Script Web App URL in GAS_WEB_APP_URL below (or via process.env.GAS_WEB_APP_URL).
 * 3. Run script: node automate_absen.js
 */

const { chromium } = require('playwright');
const fetch = require('node-fetch');

// CONFIGURATION
const GAS_WEB_APP_URL = process.env.GAS_WEB_APP_URL || 'https://script.google.com/macros/s/AKfycbxSze-Gb7Sz7RPb9t-a_1WW887-iVee-hho6bGQ_Tv2zGWsUxiZdPKK4W7TkC7pY1rZ/exec';
const AIRTABLE_FORM_URL = 'https://airtable.com/appZWFkgIQZR6Mz86/shrq4Fdq0W7tCRgHG';

const DEFAULT_TEACHER_NAME = process.env.TEACHER_NAME || 'Yazid Hilmi';
const DEFAULT_CLASS_CODE = process.env.CLASS_CODE || 'Extracurricular - Coding TA 2026/2027';

async function fetchPendingSessions() {
  if (GAS_WEB_APP_URL.includes('YOUR_DEPLOYED_SCRIPT_ID')) {
    console.warn('[!] WARNING: GAS_WEB_APP_URL is not configured yet.');
    console.warn('[!] Please deploy code.gs as Web App and set GAS_WEB_APP_URL in automate_absen.js or process.env.GAS_WEB_APP_URL');
  }

  try {
    const res = await fetch(`${GAS_WEB_APP_URL}?action=getPendingAttendance`);
    const json = await res.json();
    if (json.status === 'success' && Array.isArray(json.data)) {
      return json.data;
    }
  } catch (err) {
    console.error('Error fetching pending sessions from Apps Script:', err.message);
  }
  return [];
}

async function markSessionSubmitted(sessionId) {
  try {
    const res = await fetch(`${GAS_WEB_APP_URL}?action=markAttendanceSubmitted&sessionId=${encodeURIComponent(sessionId)}`);
    const json = await res.json();
    console.log(`[+] Marked session ${sessionId} status:`, json.message);
  } catch (err) {
    console.error(`[-] Failed to mark session ${sessionId} as submitted:`, err.message);
  }
}

async function fillAirtableAttendanceForm(browser, session) {
  console.log(`\n[>] Processing Attendance for: ${session.pertemuan} (${session.title})`);
  console.log(`    Date: ${session.date} | Class Code: ${DEFAULT_CLASS_CODE}`);

  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(AIRTABLE_FORM_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2500);

    // Reject Cookie Banner if present
    const rejectCookie = page.locator('button:has-text("Reject All"), button:has-text("Agree")');
    if (await rejectCookie.count() > 0) {
      await rejectCookie.first().click().catch(() => {});
      await page.waitForTimeout(1000);
    }

    // 1. Class Conducted Date *
    const dateInput = page.locator('input[placeholder="mm/dd/yyyy"], input[type="date"]').first();
    if (await dateInput.isVisible()) {
      await dateInput.fill(session.date || '07/22/2026');
    }

    // 2. Week Session Conducted *
    const weekNumStr = String(session.week_num || '1');
    const weekSelect = page.locator('div:has-text("Week Session Conducted") ~ div div[role="button"], select').first();
    if (await weekSelect.isVisible()) {
      await weekSelect.click().catch(() => {});
      await page.waitForTimeout(500);
      const opt = page.locator('div[role="option"]').filter({ hasText: weekNumStr }).first();
      if (await opt.isVisible()) await opt.click();
    }

    // 3. Class Code * (+Add Linked Record)
    const classCodeAdd = page.locator('div:has-text("Class Code") ~ div button:has-text("Add"), div:has-text("Class Code") ~ div div[role="button"]:has-text("Add")').first();
    if (await classCodeAdd.isVisible()) {
      await classCodeAdd.click();
      await page.waitForTimeout(1000);
      await page.keyboard.type(DEFAULT_CLASS_CODE);
      await page.waitForTimeout(1000);
      await page.keyboard.press('Enter');
      await page.waitForTimeout(500);
    }

    // 4. Teacher's Name * (+Add Linked Record)
    const teacherAdd = page.locator('div:has-text("Teacher\'s Name") ~ div button:has-text("Add"), div:has-text("Teacher\'s Name") ~ div div[role="button"]:has-text("Add")').first();
    if (await teacherAdd.isVisible()) {
      await teacherAdd.click();
      await page.waitForTimeout(1000);
      await page.keyboard.type(DEFAULT_TEACHER_NAME);
      await page.waitForTimeout(1000);
      await page.keyboard.press('Enter');
      await page.waitForTimeout(500);
    }

    // 5. Type of Session * (Ekskul)
    const ekskulBtn = page.locator('text="Ekskul"').first();
    if (await ekskulBtn.isVisible()) {
      await ekskulBtn.click().catch(() => {});
    }

    // 6. Role * (Master Teacher)
    const roleBtn = page.locator('text="Master Teacher"').first();
    if (await roleBtn.isVisible()) {
      await roleBtn.click().catch(() => {});
    }

    // 7. Did you attend the session? * (Yes)
    const attendBtn = page.locator('text="Yes"').first();
    if (await attendBtn.isVisible()) {
      await attendBtn.click().catch(() => {});
    }

    // 8. Student's Concern *
    const concernField = page.locator('textarea, input[type="text"]').last();
    if (await concernField.isVisible()) {
      await concernField.fill('-').catch(() => {});
    }

    console.log(`[+] Form populated successfully for ${session.pertemuan}`);

    // Click Submit button
    const submitBtn = page.locator('button[type="submit"], input[type="submit"], div[role="button"]:has-text("Submit")').first();
    if (await submitBtn.isVisible()) {
      await submitBtn.click();
      await page.waitForTimeout(3000);
      console.log(`[✔] Form submitted on Airtable for ${session.pertemuan}`);
      
      // Update Google Spreadsheet status via Apps Script API
      await markSessionSubmitted(session.id);
    } else {
      console.warn(`[!] Submit button not found on Airtable form!`);
    }

  } catch (err) {
    console.error(`[!] Error processing form for ${session.pertemuan}:`, err.message);
  } finally {
    await context.close();
  }
}

async function runAutoAbsen() {
  console.log('====================================================');
  console.log('🤖 LMS-AGS Auto Attendance Script (Playwright)');
  console.log('====================================================');

  const pendingSessions = await fetchPendingSessions();

  if (pendingSessions.length === 0) {
    console.log('[i] No pending sessions found. (Make sure Status = Active & Date is filled in Col E & F)');
    return;
  }

  console.log(`[i] Found ${pendingSessions.length} pending session(s) to submit.`);

  const browser = await chromium.launch({ headless: true });
  for (const session of pendingSessions) {
    await fillAirtableAttendanceForm(browser, session);
  }
  await browser.close();
  console.log('\n[✔] All pending attendance forms processed.');
}

if (require.main === module) {
  runAutoAbsen();
}

module.exports = { runAutoAbsen, fetchPendingSessions };

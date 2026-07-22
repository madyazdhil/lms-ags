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
    await page.waitForTimeout(2000); // Allow Airtable form components to fully render

    // Fill Teacher Name & Class Code
    const textInputs = page.locator('input[type="text"], textarea');
    const inputCount = await textInputs.count();

    for (let i = 0; i < inputCount; i++) {
      const input = textInputs.nth(i);
      const placeholder = (await input.getAttribute('placeholder') || '').toLowerCase();
      const parentText = (await input.locator('xpath=ancestor::div[contains(@class, "field")]').innerText().catch(() => '')).toLowerCase();

      if (parentText.includes('class code') || parentText.includes('kode kelas') || placeholder.includes('class code')) {
        await input.fill(DEFAULT_CLASS_CODE);
      } else if (parentText.includes('nama') || parentText.includes('teacher') || placeholder.includes('nama')) {
        await input.fill(DEFAULT_TEACHER_NAME);
      } else if (parentText.includes('pertemuan') || parentText.includes('sesi') || parentText.includes('session')) {
        await input.fill(session.pertemuan);
      } else if (parentText.includes('materi') || parentText.includes('topik') || parentText.includes('topic')) {
        await input.fill(session.title);
      } else if (parentText.includes('recording') || parentText.includes('link') || parentText.includes('url')) {
        await input.fill(session.recording_url || '-');
      } else if (parentText.includes('tanggal') || parentText.includes('date')) {
        await input.fill(session.date);
      }
    }

    // Handle Airtable Single-Select Dropdowns if Class Code is a dropdown picker
    const selectPills = page.locator('div[role="option"], div[data-test="option"]');
    if (await selectPills.count() > 0) {
      const targetOption = selectPills.filter({ hasText: 'Coding' }).first();
      if (await targetOption.isVisible()) {
        await targetOption.click();
      }
    }


    // Date picker field (if date input type="date" or specialized picker exists)
    const dateInput = page.locator('input[type="date"]');
    if (await dateInput.count() > 0 && await dateInput.first().isVisible()) {
      await dateInput.first().fill(session.date);
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

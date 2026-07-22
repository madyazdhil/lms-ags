const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const AIRTABLE_FORM_URL = 'https://airtable.com/appZWFkgIQZR6Mz86/shrq4Fdq0W7tCRgHG';
const GAS_API_URL = 'https://script.google.com/macros/s/AKfycbzQ_FIXME_YOUR_DEPLOYED_ID/exec'; // Replace with deployed Web App URL if fetching dynamically
const DEFAULT_CLASS_CODE = 'Extracurricular - Coding TA 2026/2027';
const DEFAULT_TEACHER_NAME = 'Yazid Hilmi';

async function submitAttendance(sessionData) {
  console.log(`\n🚀 Starting submission for Sesi ${sessionData.week_num} (${sessionData.date})...`);
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 2600 } });

  try {
    await page.goto(AIRTABLE_FORM_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2500);

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
    const concernContainer = page.locator('.sharedFormField').filter({ hasText: "Student's Concern" }).first();
    const textarea = concernContainer.locator('textarea, input, [contenteditable="true"]').first();
    if (await textarea.isVisible()) {
      await textarea.fill(sessionData.concern || '-');
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

// Standalone execution entry point (Local or GitHub Action)
if (require.main === module) {
  (async () => {
    const targetWeek = process.env.TARGET_WEEK || '1';
    console.log(`🤖 Auto Attendance Runner starting for Week: ${targetWeek}`);
    
    // Sample data structure for target session
    const sampleSession = {
      date: '07/22/2026',
      week_num: targetWeek,
      title: 'Pertemuan 1: Perkenalan Markas Coding di Cloud (GitHub Codespaces)',
      concern: '-'
    };

    await submitAttendance(sampleSession);
  })();
}

module.exports = { submitAttendance };

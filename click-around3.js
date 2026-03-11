const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const errors = [];
  page.on('pageerror', err => {
    errors.push(err.message);
  });
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  await page.goto('http://127.0.0.1:4173');
  await page.waitForTimeout(1000);

  // Settings
  await page.click('#homeSettingsBtn');
  await page.waitForTimeout(500);

  // Switch to EN
  await page.click('[data-lang="en"]');
  await page.waitForTimeout(500);

  // Close Settings
  await page.click('#settingsCloseBtn');
  await page.waitForTimeout(500);

  // Open Help
  await page.click('#homeHelpBtn');
  await page.waitForTimeout(500);

  // Next page
  await page.click('[data-help-nav="next"]');
  await page.waitForTimeout(500);
  await page.click('[data-help-nav="next"]');
  await page.waitForTimeout(500);

  // Close Help
  await page.click('#helpCloseBtn');
  await page.waitForTimeout(500);

  if (errors.length > 0) {
    console.log("Errors found during Settings/Help Mode:", errors);
  } else {
    console.log("No console errors found during Settings/Help Mode.");
  }

  await browser.close();
})();

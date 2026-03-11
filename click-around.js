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

  // Click Daily Entry
  await page.click('#dailyEntryBtn');
  await page.waitForTimeout(1000);

  // Click start daily
  await page.click('#dailyStartBtn');
  await page.waitForTimeout(1000);

  if (errors.length > 0) {
    console.log("Errors found during Daily Mode:", errors);
  } else {
    console.log("No console errors found during Daily Mode.");
  }

  await browser.close();
})();

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

  // Click start classic
  await page.click('#startEntryBtn');
  await page.waitForTimeout(1000);

  // Click easy
  await page.click('[data-difficulty="easy"]');
  await page.waitForTimeout(1000);

  // Select a cell and press a number
  await page.click('.cell:not(.fixed)');
  await page.waitForTimeout(500);
  await page.keyboard.press('1');
  await page.waitForTimeout(500);

  if (errors.length > 0) {
    console.log("Errors found during Classic Mode:", errors);
  } else {
    console.log("No console errors found during Classic Mode.");
  }

  await browser.close();
})();

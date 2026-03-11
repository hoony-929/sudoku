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
  await page.waitForTimeout(2000);

  if (errors.length > 0) {
    console.log("Errors found:", errors);
  } else {
    console.log("No console errors found on load.");
  }

  await browser.close();
})();

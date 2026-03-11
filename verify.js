const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:3000');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'home.png' });

  // click help
  await page.click('button:has-text("설명 보기")');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'help.png' });

  // next page in help
  await page.click('button:has-text("다음")');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'help_page2.png' });

  await browser.close();
})();

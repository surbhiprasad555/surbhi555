const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.error('PAGE ERROR:', error.message));
  page.on('response', response => {
    if (response.status() === 404) {
      console.error('404 NOT FOUND:', response.url());
    }
  });

  console.log("Navigating to http://localhost:5174 ...");
  await page.goto('http://localhost:5174', { waitUntil: 'networkidle0' });
  console.log("Done.");
  
  await browser.close();
})();

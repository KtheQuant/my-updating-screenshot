const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();

  // If cookies were saved from a previous run, load them
  if (fs.existsSync('cookies.json')) {
    const savedCookies = JSON.parse(fs.readFileSync('cookies.json', 'utf-8'));
    for (let cookie of savedCookies) {
      await page.setCookie(cookie);
    }
  }

  // Use a newer user agent to look like a very up-to-date browser
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36');

  const url = 'https://coinstats.app/fr/address/CRVidEDtEUTYZisCxBZkpELzhQc9eauMLR3FWg74tReL/';
  
  // Go to the page
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

  // Wait 30 seconds to allow any CAPTCHA or verification checks to appear and possibly vanish
  await new Promise(resolve => setTimeout(resolve, 30000));

  // Perform more extensive human-like interactions
  // Move mouse to multiple coordinates, pausing between moves
  const mouseMoves = [
    [300, 300],
    [500, 500],
    [100, 400]
  ];
  for (let coords of mouseMoves) {
    await page.mouse.move(coords[0], coords[1]);
    await new Promise(r => setTimeout(r, 2000)); // 2 second pause between moves
  }

  // Scroll multiple times
  for (let i = 0; i < 3; i++) {
    await page.evaluate(() => { window.scrollBy(0, window.innerHeight); });
    await new Promise(r => setTimeout(r, 2000)); // Pause after each scroll
  }

  // Wait another 20 seconds after interactions
  await new Promise(resolve => setTimeout(resolve, 20000));

  // Attempt to take the screenshot
  await page.screenshot({ path: 'latest.png', fullPage: true });

  // Save cookies so next time might bypass CAPTCHA
  const cookies = await page.cookies();
  fs.writeFileSync('cookies.json', JSON.stringify(cookies));

  await browser.close();
})();


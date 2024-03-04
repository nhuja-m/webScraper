// puppeteerFunctions.ts

import fs from 'fs';
import path from 'path';

import puppeteer, { Page } from 'puppeteer';
// ... other imports

const USERNAME = process.env.USERNAME || '';
const PASSWORD = process.env.PASSWORD || '';

export const scrapeUrl = async (url: string): Promise<{ success: boolean }> => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

//   await login(page, url, USERNAME, PASSWORD);
const pdfBuffer = await page.pdf({ format: 'A4' });
fs.writeFileSync(path.join(__dirname, '..', 'pdfs','output.pdf'), pdfBuffer);
  // ... rest of your scraping logic

  await browser.close();
  return { success: true };
};

async function login(page: Page, url: string, username: string, password: string): Promise<void> {
    await page.goto(url);
  
    // Wait for the username input to be clickable and type into it
    await page.waitForSelector('#i0116', { visible: true });
    await page.type('#i0116', username);
  
    // Click the login button after entering the username
    await page.click('#idSIButton9');
  
    // Wait for the password input to be clickable, type into it and click the login button
    await page.waitForSelector('#i0118', { visible: true });
    await page.type('#i0118', password);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds
    await page.click('#idSIButton9');
  
    // Assuming you need to wait for 2FA completion
    await page.waitForXPath("//a[@href='https://rockco.sharepoint.com/sites/RockcoCommunications/RRC']", { timeout: 300000 }); // Wait up to 5 minutes
  }

export default {
  scrapeUrl
};

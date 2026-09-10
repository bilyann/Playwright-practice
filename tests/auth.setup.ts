import { test as setup, expect } from '@playwright/test';

const user1File = 'playwright/.auth/user1.json';
const user2File = 'playwright/.auth/user2.json';

const targetUrl = 'https://guest:welcome2qauto@qauto.forstudy.space/';

// Логін першого користувача
setup('authenticate user 1', async ({ page, context }) => {
  await page.goto(targetUrl);
  await page.getByRole('button', { name: 'Sign In' }).click();
  
  const email1 = (process.env.USER1_EMAIL || 'test1m2@gmail.com').trim();
  const pass1 = (process.env.USER1_PASSWORD || 'plm123QA').trim();
  
  await page.locator('#signinEmail').fill(email1);
  await page.locator('#signinPassword').fill(pass1);
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/\/panel\/garage/);
  await context.storageState({ path: user1File });
});

// Логін другого користувача
setup('authenticate user 2', async ({ page, context }) => {
  await page.goto(targetUrl);
  await page.getByRole('button', { name: 'Sign In' }).click();
  
  const email2 = (process.env.USER2_EMAIL || 'qann21test@gmail.com').trim();
  const pass2 = (process.env.USER2_PASSWORD || 'plm123QA').trim();
  
  await page.locator('#signinEmail').fill(email2);
  await page.locator('#signinPassword').fill(pass2);
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/\/panel\/garage/);
  await context.storageState({ path: user2File });
});
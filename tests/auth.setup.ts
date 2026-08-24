import { test as setup, expect } from '@playwright/test';

const user1File = 'playwright/.auth/user1.json';
const user2File = 'playwright/.auth/user2.json';

// Логін першого користувача
setup('authenticate user 1', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('/');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.locator('#signinEmail').fill('test1m2@gmail.com');
  await page.locator('#signinPassword').fill('plm123QA');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/\/panel\/garage/);
  await context.storageState({ path: user1File });
  await context.close();
});

// Логін другого користувача з правильними креативами
setup('authenticate user 2', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('/');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.locator('#signinEmail').fill('qann21test@gmail.com');
  await page.locator('#signinPassword').fill('plm123QA');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/\/panel\/garage/);
  await context.storageState({ path: user2File });
  await context.close();
});
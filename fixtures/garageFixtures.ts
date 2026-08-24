import { test as base } from '@playwright/test';
import { GaragePage } from '../pom/pages/GaragePage';

// Розширюємо тип фікстур, додаючи можливість вибору користувача ('user1' або 'user2')
type MyFixtures = {
  userGaragePage: GaragePage;
  userType: 'user1' | 'user2';
};

export const test = base.extend<MyFixtures>({
  // За замовчуванням будемо брати 'user1' якщо не вказано інше
  userType: ['user1', { option: true }],

  userGaragePage: async ({ browser, userType }, use) => {
    // Визначаємо шлях до файла стану залежно від обраного користувача
    const authFile = userType === 'user2' 
      ? 'playwright/.auth/user2.json' 
      : 'playwright/.auth/user1.json';

    // Створюємо контекст із відповідним storageState
    const context = await browser.newContext({
      storageState: authFile,
    });
    
    const page = await context.newPage();
    const garagePage = new GaragePage(page);
    
    await garagePage.goto();
    await use(garagePage);
    await context.close();
  },
});

export { expect } from '@playwright/test';
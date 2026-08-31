import { test, expect } from '@playwright/test';

test.describe('Profile mocking tests', () => {
  // Використовуємо збережений стан авторизації реального користувача
  test.use({ storageState: 'playwright/.auth/user1.json' });

  test('should mock user profile and verify UI data', async ({ page }) => {
    // 1. Перехоплюємо GET запит на профіль і підміняємо response body
    await page.route('**/api/users/profile', async route => {
      const mockProfile = {
        status: 'ok',
        data: {
          userId: 391938,
          photoFilename: 'default-user.png',
          name: 'Stanislav',
          lastName: 'Taran',
        },
      };

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockProfile),
      });
    });

    // 2. Відкриваємо сторінку профілю
    await page.goto('/panel/profile');

    // 3. Перевіряємо, що в UI відображаються підмінені дані
    const profileNameElement = page.locator('p.profile_name');
    await expect(profileNameElement).toHaveText('Stanislav Taran');
    await page.pause();
  });
});
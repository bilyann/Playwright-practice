import { test, expect } from '../fixtures/garageFixtures';

// Цей тест виконається під першим користувачем (значення за замовчуванням)
test('User 1 can open garage page and see Add car button', async ({ userGaragePage }) => {
  await expect(userGaragePage.addCarButton).toBeVisible();
});

// Цей тест виконається під другим користувачем завдяки перевизначенню опції у тесті
test.describe('Tests for User 2', () => {
  test.use({ userType: 'user2' });

  test('User 2 can open garage page and see Add car button', async ({ userGaragePage }) => {
    await expect(userGaragePage.addCarButton).toBeVisible();
  });
});
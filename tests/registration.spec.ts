import { test, expect } from '@playwright/test';

test.describe('Registration Form Validation and Registration Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Клік на кнопку Sign In у шапці
    await page.locator('.header_signin').click();
    // Клік на посилання "Registration" у модалці входу
    await page.locator('.modal-footer .btn-link').click();
  });

  test('1. Name field validation (empty and invalid characters)', async ({ page }) => {
    const nameInput = page.locator('#signupName');
    
    // Перевірка на порожнє поле (Blur)
    await nameInput.focus();
    await nameInput.blur();
    await expect(nameInput.locator('xpath=following-sibling::div[@class="invalid-feedback"]')).toHaveText('Name required');

    // Перевірка на невалідні символи
    await nameInput.fill('123');
    await expect(nameInput.locator('xpath=following-sibling::div[@class="invalid-feedback"]')).toHaveText('Name is invalid');
  });

  test('2. Last Name field validation (too short value)', async ({ page }) => {
    const lastNameInput = page.locator('#signupLastName');
    
    await lastNameInput.fill('A');
    await lastNameInput.blur();
    await expect(lastNameInput.locator('xpath=following-sibling::div[@class="invalid-feedback"]')).toHaveText('Last name has to be from 2 to 20 characters long');
  });

  test('3. Password field validation (weak password)', async ({ page }) => {
    const passwordInput = page.locator('#signupPassword');
    
    await passwordInput.fill('qwer123');
    await passwordInput.blur();
    await expect(passwordInput.locator('xpath=following-sibling::div[@class="invalid-feedback"]')).toHaveText(
      'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
    );
  });

  test('4. Email field validation (incorrect format)', async ({ page }) => {
    const emailInput = page.locator('#signupEmail');
    
    await emailInput.fill('invalidemail');
    await emailInput.blur();
    await expect(emailInput.locator('xpath=following-sibling::div[@class="invalid-feedback"]')).toHaveText('Email is incorrect');
  });

  test('5. Re-enter password validation (mismatch)', async ({ page }) => {
    const passwordInput = page.locator('#signupPassword');
    const repeatPasswordInput = page.locator('#signupRepeatPassword');
    
    await passwordInput.fill('Password123');
    await repeatPasswordInput.fill('Different123');
    await repeatPasswordInput.blur();
    await expect(repeatPasswordInput.locator('xpath=following-sibling::div[@class="invalid-feedback"]')).toHaveText('Passwords do not match');
  });

  test('6. Register button state and Success Registration with aqa prefix', async ({ page }) => {
    const registerBtn = page.getByRole('button', { name: 'Register' });
    
    // Перевіряємо, що кнопка Register видима і заблокована для порожньої форми
    await expect(registerBtn).toBeVisible();
    await expect(registerBtn).toBeDisabled();

    // Заповнюємо валідними даними з префіксом aqa для email
    const uniqueEmail = `aqa-user-${Date.now()}@test.com`;

    await page.locator('#signupName').fill('John');
    await page.locator('#signupLastName').fill('Doe');
    await page.locator('#signupEmail').fill(uniqueEmail);
    await page.locator('#signupPassword').fill('Password123');
    await page.locator('#signupRepeatPassword').fill('Password123');

    // Кнопка має стати активною
    await expect(registerBtn).toBeEnabled();
    await registerBtn.click();

    // Перевіряємо успішний редирект у панель
    await expect(page).toHaveURL(/.*\/panel\/garage/);
  });
});
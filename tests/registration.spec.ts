import { test, expect } from '@playwright/test';
import HomePage from '../pom/pages/HomePage';

test.describe('Registration Form Validation and Registration Tests with POM', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.open();
    await homePage.openRegistrationModal();
  });

  test('1. Name field validation (empty and invalid characters)', async ({ page }) => {
    const { nameInput } = homePage.signUpForm;
    
    await nameInput.focus();
    await nameInput.blur();
    await expect(nameInput.locator('xpath=following-sibling::div[@class="invalid-feedback"]')).toHaveText('Name required');

    await nameInput.fill('123');
    await expect(nameInput.locator('xpath=following-sibling::div[@class="invalid-feedback"]')).toHaveText('Name is invalid');
  });

  test('2. Last Name field validation (too short value)', async () => {
    const { lastNameInput } = homePage.signUpForm;
    
    await lastNameInput.fill('A');
    await lastNameInput.blur();
    await expect(lastNameInput.locator('xpath=following-sibling::div[@class="invalid-feedback"]')).toHaveText('Last name has to be from 2 to 20 characters long');
  });

  test('3. Password field validation (weak password)', async () => {
    const { passwordInput } = homePage.signUpForm;
    
    await passwordInput.fill('qwer123');
    await passwordInput.blur();
    await expect(passwordInput.locator('xpath=following-sibling::div[@class="invalid-feedback"]')).toHaveText(
      'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
    );
  });

  test('4. Email field validation (incorrect format)', async () => {
    const { emailInput } = homePage.signUpForm;
    
    await emailInput.fill('invalidemail');
    await emailInput.blur();
    await expect(emailInput.locator('xpath=following-sibling::div[@class="invalid-feedback"]')).toHaveText('Email is incorrect');
  });

  test('5. Re-enter password validation (mismatch)', async () => {
    const { passwordInput, repeatPasswordInput } = homePage.signUpForm;
    
    await passwordInput.fill('Password123');
    await repeatPasswordInput.fill('Different123');
    await repeatPasswordInput.blur();
    await expect(repeatPasswordInput.locator('xpath=following-sibling::div[@class="invalid-feedback"]')).toHaveText('Passwords do not match');
  });

  test('6. Register button state and Success Registration with aqa prefix', async ({ page }) => {
    const { registerButton } = homePage.signUpForm;
    
    await expect(registerButton).toBeVisible();
    await expect(registerButton).toBeDisabled();

    const uniqueEmail = `aqa-user-${Date.now()}@test.com`;
    await homePage.signUpForm.fillForm('John', 'Doe', uniqueEmail, 'Password123', 'Password123');

    await expect(registerButton).toBeEnabled();
    await registerButton.click();

    await expect(page).toHaveURL(/.*\/panel\/garage/);
  });
});
import { Locator, Page } from '@playwright/test';

export default class SignUpForm {
  public readonly nameInput: Locator;
  public readonly lastNameInput: Locator;
  public readonly emailInput: Locator;
  public readonly passwordInput: Locator;
  public readonly repeatPasswordInput: Locator;
  public readonly registerButton: Locator;

  constructor(page: Page) {
    this.nameInput = page.locator('#signupName');
    this.lastNameInput = page.locator('#signupLastName');
    this.emailInput = page.locator('#signupEmail');
    this.passwordInput = page.locator('#signupPassword');
    this.repeatPasswordInput = page.locator('#signupRepeatPassword');
    this.registerButton = page.getByRole('button', { name: 'Register' });
  }

  async fillForm(name: string, lastName: string, email: string, pass: string, repeatPass: string) {
    await this.nameInput.fill(name);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
    await this.repeatPasswordInput.fill(repeatPass);
  }
}
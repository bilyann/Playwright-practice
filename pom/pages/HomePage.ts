import { Locator, Page } from '@playwright/test';
import SignUpForm from '../forms/SignUpForm';

export default class HomePage {
  private readonly page: Page;
  public readonly signInButton: Locator;
  public readonly registrationLink: Locator;
  public readonly signUpForm: SignUpForm;

  constructor(page: Page) {
    this.page = page;
    this.signInButton = page.locator('.header_signin');
    this.registrationLink = page.locator('.modal-footer .btn-link');
    this.signUpForm = new SignUpForm(page);
  }

  async open() {
    await this.page.goto('/');
  }

  async openRegistrationModal() {
    await this.signInButton.click();
    await this.registrationLink.click();
  }
}
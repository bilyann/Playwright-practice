import { Page, Locator } from '@playwright/test';

export class GaragePage {
  readonly page: Page;
  readonly addCarButton: Locator;
  readonly garageHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addCarButton = page.getByRole('button', { name: 'Add car' });
    this.garageHeader = page.locator('h1', { hasText: 'Garage' });
  }

  async goto() {
    await this.page.goto('/panel/garage');
  }

  async clickAddCar() {
    await this.addCarButton.click();
  }
}
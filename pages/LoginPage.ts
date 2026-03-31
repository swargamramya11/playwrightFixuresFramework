import { Page, expect, Locator } from '@playwright/test'

export class LoginPage {
  private readonly page: Page;
  private readonly email: Locator;
  private readonly password: Locator;

  constructor(page: Page) {
    this.page = page;
    this.password = page.locator("#userPassword");
    this.email = page.locator("#userEmail");
  }

  async enterEmail(enterEmail: string) {
    await this.email.fill(enterEmail)
  }

  async enterPassword(enterPassword: string) {
    await this.password.fill(enterPassword)
  }
}
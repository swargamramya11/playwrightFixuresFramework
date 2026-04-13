import { Page, expect, Locator } from '@playwright/test'

export class LoginPage {
  private readonly page: Page;
  private readonly email: Locator;
  private readonly password: Locator;
  private readonly login: Locator;

  constructor(page: Page) {
    this.page = page;
    this.password = page.locator("#userPassword");
    this.email = page.locator("#userEmail");
    this.login = page.locator('input[value="Login"]')
  }

  async enterEmail(enterEmail: string) {
//Way 1 to handle visual testing    
    await expect(this.page).toHaveScreenshot(); 

//Way 2 to handle visual testing     
    expect(await this.page.screenshot()).toMatchSnapshot("homepage.png"); 

//Handle visual testing for particular element
    expect(await this.email.screenshot()).toMatchSnapshot('email.png'); 

    await this.email.fill(enterEmail)
    await this.email.screenshot({ path: 'test-results/screenshots/emailscreenshot.png' })
  }

  async enterPassword(enterPassword: string) {
    await this.password.fill(enterPassword)
  }

   async clickLogin() {
    await this.login.click()
  }
}
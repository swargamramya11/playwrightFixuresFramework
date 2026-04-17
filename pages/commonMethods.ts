import { Page, expect, Locator } from '@playwright/test'
import { TestData } from '../utils/testData';

export class CommonMethods {
  private readonly page: Page;

  constructor(page: Page, testData: TestData) {
    this.page = page
  }

  async verifyErrorMessage(fieldName: string, expectedErrorMessage:string) {
    expect(this.page.locator("//label[text()='"+fieldName+"']//parent::div//div//div")).toHaveText(expectedErrorMessage) 
  }
}
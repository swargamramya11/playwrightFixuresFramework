import { test, expect } from '../utils/hooks';
import { RandomDataUtil } from '../utils/randomDataGenerator'
import { TestConfig } from '../test.config'
import { DataProvider } from '../utils/dataproviders'
import { LoginPage } from '../pages/LoginPage'

const jsonPath = 'testdata/logindata.json'
const data = DataProvider.getTestDataFromJson(jsonPath)

for (const dataset of data) {
  test(`User Login with ${dataset.email}`, async ({ page }) => {
    let loginPage = new LoginPage(page);
    await loginPage.enterEmail(dataset.email)
    await loginPage.enterPassword(dataset.password)
    await page.waitForTimeout(5000)
  });
}
import { test, expect } from '../utils/hooks';
import { RandomDataUtil } from '../utils/randomDataGenerator'
import { TestConfig } from '../testdata/test.config'
import { DataProvider } from '../utils/dataproviders'
import { LoginPage } from '../pages/LoginPage'
import { CommonMethods } from '../pages/CommonMethods'
import { RegistrationPage } from '../pages/RegistrationPage'
import { ReusableMethods } from '../utils/reusableMethods';

const jsonPath = 'testdata/logindata.json'
const data = DataProvider.getTestDataFromJson(jsonPath)

for (const dataset of data) {
  test(`User Login with ${dataset.email}`, { tag: ['@smoke', '@login'] }, async ({ page }) => {
    let loginPage = new LoginPage(page);
    await loginPage.enterEmail(dataset.email)
    await loginPage.enterPassword(dataset.password)
    await loginPage.clickLogin()
  });
}

test('User Login errors validation for mandatory fields', { tag: ['@smoke', '@login', '@negative'] }, async ({ page, testData }) => {
  let commonMethods = new CommonMethods(page, testData)
  let registrationPage = new RegistrationPage(page, testData)
  let loginPage = new LoginPage(page);

  await loginPage.clickLogin()
  await commonMethods.verifyErrorMessage('Email', ReusableMethods.getProperty("EMAIL_ERROR_MESSAGE"))
  await commonMethods.verifyErrorMessage('Password', ReusableMethods.getProperty("Password_ERROR_MESSAGE"))
});
import { test, expect } from '../utils/hooks';
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
//Timeouts  
  test.setTimeout(10000)
  test.slow()
  page.setDefaultTimeout(10000)
  page.setDefaultNavigationTimeout(10000)

  let commonMethods = new CommonMethods(page, testData)
  let registrationPage = new RegistrationPage(page, testData)
  let loginPage = new LoginPage(page);
  let reusableMethods = new ReusableMethods(page);

  await loginPage.clickLogin()
  await commonMethods.verifyErrorMessage('Email', ReusableMethods.getProperty("EMAIL_ERROR_MESSAGE"))
  await commonMethods.verifyErrorMessage('Password', ReusableMethods.getProperty("Password_ERROR_MESSAGE"))
  const newPage = await reusableMethods.openNewBlankWindow()
  await newPage.goto("https://www.google.com")
});
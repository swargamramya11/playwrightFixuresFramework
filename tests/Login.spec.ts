import { test } from '../utils/hooks';
import { DataProvider } from '../utils/dataproviders'
import { LoginPage } from '../pages/LoginPage'
import { CommonMethods } from '../pages/CommonMethods'
import { RegistrationPage } from '../pages/RegistrationPage'
import { ReusableMethods } from '../utils/reusableMethods';

const jsonPath = 'testdata/logindata.json'
const jsonData = DataProvider.getTestDataFromJson(jsonPath)

const csvPath = 'testdata/logindata.csv'
const csvData = DataProvider.getDataFromCSV(csvPath)

for (const { email, password } of jsonData) {
  test(`User Login with json data ${email}`, { tag: ['@smoke', '@login', '@json'] }, async ({ page }) => {
    let loginPage = new LoginPage(page);
    await loginPage.enterEmail(email)
    await loginPage.enterPassword(password)
    await loginPage.clickLogin()
  });
}

test.describe('Login with csv data', () => {
  for (const { email, password } of csvData) {
    test(`User Login with csv data ${email}`, { tag: ['@smoke', '@login', '@csv'] }, async ({ page }) => {
      let loginPage = new LoginPage(page);
      await loginPage.enterEmail(email)
      await loginPage.enterPassword(password)
      await loginPage.clickLogin()
    });
  }
})

const excelPath = 'testdata/logindata.xlsx'
const excelData = DataProvider.getDataFromXLSX(excelPath)

for (const { Email, Password } of excelData) {
  test(`User Login with excel data ${Email}`, { tag: ['@smoke', '@login', '@excel'] }, async ({ page }) => {
    let loginPage = new LoginPage(page);
    await loginPage.enterEmail(Email)
    await loginPage.enterPassword(Password)
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
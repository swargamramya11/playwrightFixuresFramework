import { test } from '../utils/hooks';
import { DataProvider } from '../utils/dataproviders'
import { ReusableMethods } from '../utils/reusableMethods';

test.describe.configure({ mode: 'parallel' });

const jsonPath = 'resources/testdata/logindata.json'
const jsonData = DataProvider.getTestDataFromJson(jsonPath)

const csvPath = 'resources/testdata/logindata.csv'
const csvData = DataProvider.getDataFromCSV(csvPath)

for (const { email, password } of jsonData) {
  test(`User Login with json data ${email}`, { tag: ['@smoke', '@login', '@json'] }, async ({ page, loginPage }) => {
    await loginPage.enterEmail(email)
    await loginPage.enterPassword(password)
    await loginPage.clickLogin()
    await page.screenshot({ path: 'test-results/screenshots/screenshot.png', fullPage: true });
  });
}

test.describe('Login with csv data', () => {
  for (const { email, password } of csvData) {
    test(`User Login with csv data ${email}`, { tag: ['@smoke', '@login', '@csv'] }, async ({ page, loginPage }) => {
      await loginPage.enterEmail(email)
      await loginPage.enterPassword(password)
      await loginPage.clickLogin()
    });
  }
})

const excelPath = 'resources/testdata/logindata.xlsx'
const excelData = DataProvider.getDataFromXLSX(excelPath)

for (const { Email, Password } of excelData) {
  test(`User Login with excel data ${Email}`, { tag: ['@smoke', '@login', '@excel'] }, async ({ page, loginPage }) => {
    await loginPage.enterEmail(Email)
    await loginPage.enterPassword(Password)
    await loginPage.clickLogin()
  });
}

test('User Login errors validation for mandatory fields', { tag: ['@smoke', '@login', '@negative'] }, async ({ page, testData, loginPage, registrationPage, commonMethods, reusableMethods }) => {
  //Timeouts  
  test.setTimeout(10000)
  test.slow()
  page.setDefaultTimeout(10000)
  page.setDefaultNavigationTimeout(10000)

  await loginPage.clickLogin()
  await commonMethods.verifyErrorMessage('Email', ReusableMethods.getProperty("EMAIL_ERROR_MESSAGE"))
  await commonMethods.verifyErrorMessage('Password', ReusableMethods.getProperty("Password_ERROR_MESSAGE"))
  const newPage = await reusableMethods.openNewBlankWindow()
  await newPage.goto("https://www.google.com")
});
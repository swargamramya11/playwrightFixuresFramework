import { test, expect } from '../utils/hooks';
import { RandomDataUtil } from '../utils/randomDataGenerator'
import { TestConfig } from '../testdata/test.config'
import { DataProvider } from '../utils/dataproviders'
import { RegistrationPage } from '../pages/RegistrationPage'
import { LoginPage } from '../pages/LoginPage'
import { ReusableMethods } from '../utils/reusableMethods';
import { TestData } from '../utils/testData';
import { CommonMethods } from '../pages/CommonMethods'

test('User Registration', { tag: ['@smoke', '@registration'] }, async ({ page, testData }) => {
  let password = RandomDataUtil.getPassword()
  let registrationPage = new RegistrationPage(page, testData)
  let loginPage = new LoginPage(page)

  await test.step('Click on register here button', async () => {
    registrationPage.clickOnRegisterHere()
  })

  await registrationPage.enterFirstName(RandomDataUtil.getFirstName())
  await registrationPage.enterLastName(RandomDataUtil.getlastName())
  await registrationPage.enterEmail(RandomDataUtil.getEmail())
  await registrationPage.enterPhoneNumber(RandomDataUtil.getPhoneNumber())
  await registrationPage.enterOccupation("Doctor")
  await registrationPage.checkGender('Female')
  await registrationPage.enterPassword(password)
  await registrationPage.enterConfirmPassword(password)
  await registrationPage.check18YearOld()
  await registrationPage.clickRegister()
  await registrationPage.verifySuccessMessage(ReusableMethods.getProperty("REGISTRATIONSUCCESSMESSAGE"))
  await registrationPage.clickLogin()

  await loginPage.enterEmail(testData.email)
  await loginPage.enterPassword(testData.password)
  await loginPage.clickLogin()
});

test('User Registration Page errors validation for mandatory fields', { tag: ['@smoke', '@registration'] }, async ({ page, testData }) => {
  let commonMethods = new CommonMethods(page, testData)
  let registrationPage = new RegistrationPage(page, testData)

  await registrationPage.clickOnRegisterHere()
  await registrationPage.clickRegister()
  await commonMethods.verifyErrorMessage('First Name', ReusableMethods.getProperty("FIRSTNAME_ERROR_MESSAGE"))
  await commonMethods.verifyErrorMessage('Email', ReusableMethods.getProperty("EMAIL_ERROR_MESSAGE"))
  await commonMethods.verifyErrorMessage('Phone Number', ReusableMethods.getProperty("PHONE_NUMBER_ERROR_MESSAGE"))
  await commonMethods.verifyErrorMessage('Password', ReusableMethods.getProperty("Password_ERROR_MESSAGE"))
  await commonMethods.verifyErrorMessage('Confirm Password', ReusableMethods.getProperty("CONFIRM_PASSWORD_ERROR_MESSAGE"))
});
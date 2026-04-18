import { test } from '../../utils/hooks';
import { RandomDataUtil } from '../../utils/randomDataGenerator'
import { ReusableMethods } from '../../utils/reusableMethods';

test('User Registration', { tag: ['@smoke', '@registration'] }, async ({ page, testData, loginPage, registrationPage }) => {
  let password = RandomDataUtil.getPassword()

  await test.step('Click on register here button', async () => {
    registrationPage.clickOnRegisterHere()
  })

  await registrationPage.enterFirstName(RandomDataUtil.getFirstName())
  await registrationPage.enterLastName(RandomDataUtil.getLastName())
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

test('User Registration Page errors validation for mandatory fields', { tag: ['@smoke', '@registration'] }, async ({ page, commonMethods, registrationPage, testData }) => {
  await registrationPage.clickOnRegisterHere()
  await registrationPage.clickRegister()
  await commonMethods.verifyErrorMessage('First Name', ReusableMethods.getProperty("FIRSTNAME_ERROR_MESSAGE"))
  await commonMethods.verifyErrorMessage('Email', ReusableMethods.getProperty("EMAIL_ERROR_MESSAGE"))
  await commonMethods.verifyErrorMessage('Phone Number', ReusableMethods.getProperty("PHONE_NUMBER_ERROR_MESSAGE"))
  await commonMethods.verifyErrorMessage('Password', ReusableMethods.getProperty("Password_ERROR_MESSAGE"))
  await commonMethods.verifyErrorMessage('Confirm Password', ReusableMethods.getProperty("CONFIRM_PASSWORD_ERROR_MESSAGE"))
});
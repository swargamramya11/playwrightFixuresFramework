import { test,expect } from '../utils/hooks';
import { DataProvider } from '../utils/dataproviders'
import { ReusableMethods } from '../utils/reusableMethods';

const jsonPath = 'testdata/logindata.json'
const data = DataProvider.getTestDataFromJson(jsonPath)

test("Simple Alert", { tag: ['@salerts'] }, async ({ page }) => {
  let reusableMethods = new ReusableMethods(page)

  reusableMethods.acceptAlert()
  await page.locator("#alertBtn").click()
});

test("Comfirmation Alert", { tag: ['@Calerts'] }, async ({ page }) => {
  let reusableMethods = new ReusableMethods(page)

  reusableMethods.dismissAlert()
  await page.locator("#confirmBtn").click()

  await expect(page.locator("#demo")).toContainText("You pressed Cancel!")
});

test("Prompt Alert", { tag: ['@Palerts'] }, async ({ page }) => {
  let reusableMethods = new ReusableMethods(page)

  reusableMethods.enterValueAndAcceptAlert("Ramya")
  await page.locator("#promptBtn").click()

  await expect(page.locator("#demo")).toContainText("Hello Ramya! How are you today?")
});
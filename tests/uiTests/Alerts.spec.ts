import { test, expect } from '../../utils/hooks';

test("Simple Alert", { tag: ['@salerts'] }, async ({ page, reusableMethods }) => {
  reusableMethods.acceptAlert()
  await page.locator("#alertBtn").click()
});

test("Comfirmation Alert", { tag: ['@Calerts'] }, async ({ page, reusableMethods }) => {
  reusableMethods.dismissAlert()
  await page.locator("#confirmBtn").click()

  await expect(page.locator("#demo")).toContainText("You pressed Cancel!")
});

test("Prompt Alert", { tag: ['@Palerts'] }, async ({ page, reusableMethods }) => {
  reusableMethods.enterValueAndAcceptAlert("Ramya")
  await page.locator("#promptBtn").click()

  await expect(page.locator("#demo")).toContainText("Hello Ramya! How are you today?")
});
import { test, expect } from '../../utils/hooks';

test("Tab and Window handling using index", { tag: ['@tabHandle'] }, async ({ page, reusableMethods }) => {
  const newTab = await reusableMethods.clickOnButtonToOpenNewTab(page.getByText("New Tab"))
  await expect(newTab.locator("h1.title")).toHaveText("SDET-QA Blog");
  newTab.close()

  const newWindows = await reusableMethods.clickOnButtonToOpenNewWindow(page.getByText("Popup Windows"))
  newWindows[2].close() // Close 2nd popup window

  const newTab1 = await reusableMethods.navigateToParticularWindowByIndex(1)
  const tab2 = await reusableMethods.clickOnButtonToOpenNewTab(newTab1.getByText("Register now!"))
  newTab1.close()
  await expect(tab2.locator("h1")).toContainText("Register");
})

test("Tab and Window handling using URL", { tag: ['@tabHandleUsingURL'] }, async ({ page, reusableMethods }) => {
  await reusableMethods.clickOnButtonToOpenNewTab(page.getByText("New Tab"))
  const newTab = await reusableMethods.switchToWindowByURL("pavan")
  await expect(newTab.locator("h1.title")).toHaveText("SDET-QA Blog");
  newTab.close()

  await reusableMethods.clickOnButtonToOpenNewWindow(page.getByText("Popup Windows"))
  const newWindowPlaywright = await reusableMethods.switchToWindowByURL("playwright")
  const newWindowSelenium = await reusableMethods.switchToWindowByURL("selenium")
  newWindowPlaywright.close() // Close 2nd popup window

  await reusableMethods.clickOnButtonToOpenNewTab(newWindowSelenium.getByText("Register now!"))
  newWindowSelenium.close()
  const newWindowSeleniumConf = await reusableMethods.switchToWindowByURL("seleniumconf")
  await expect(newWindowSeleniumConf.locator("h1")).toContainText("Register");
})

test("Tab and Window handling using Title", { tag: ['@tabHandleUsingTitle'] }, async ({ page, reusableMethods }) => {
  await reusableMethods.clickOnButtonToOpenNewTab(page.getByText("New Tab"))
  const newTab = await reusableMethods.switchToWindowByTitle("SDET-QA Blog")
  await expect(newTab.locator("h1.title")).toHaveText("SDET-QA Blog");
  newTab.close()

  await reusableMethods.clickOnButtonToOpenNewWindow(page.getByText("Popup Windows"))
  const newWindowPlaywright = await reusableMethods.switchToWindowByTitle("Playwright")
  const newWindowSelenium = await reusableMethods.switchToWindowByTitle("Selenium")
  newWindowPlaywright.close() // Close 2nd popup window

  await reusableMethods.clickOnButtonToOpenNewTab(newWindowSelenium.getByText("Register now!"))
  newWindowSelenium.close()
  const newWindowSeleniumConf = await reusableMethods.switchToWindowByTitle("Register")
  await expect(newWindowSeleniumConf.locator("h1")).toContainText("Register");
})
import { test, expect } from '../utils/hooks';
import { ReusableMethods } from '../utils/reusableMethods';

test('Dropdown selection', { tag: ['@dropdowns'] }, async ({ page }, testInfo) => {
  let reusableMethods = new ReusableMethods(page);
  await reusableMethods.selectDropDownByVisibleText(page.locator("#country"), 'India')

  await reusableMethods.checkForDuplicateOptions(page.locator("#country"))
  await reusableMethods.printAllDropDownOptions(page.locator("#country"))
  await reusableMethods.verifycountDropdownElements(page.locator("#country option"), 10)
  await reusableMethods.verifyIfOptionIsPresentInDropdrown(page.locator("#country option"), 'India')
  expect(testInfo.title).toBe('Dropdown selection');
  // await page.screenshot(testInfo.outputPath('screenshot.png'));
  // console.log(testInfo.title);        
  // console.log(testInfo.file);        
  // console.log(testInfo.retry);  
  // console.log(testInfo.status);        
  // console.log(testInfo.expectedStatus);        
  // console.log(testInfo.project.name);   
  // await reusableMethods.verifyIfDropdownValuesAreAlphabeticalOrder(page.locator("#country option"))
});
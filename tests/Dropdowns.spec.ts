import { test, expect } from '../utils/hooks';
import { DataProvider } from '../utils/dataproviders'
import { LoginPage } from '../pages/LoginPage'
import { ReusableMethods } from '../utils/reusableMethods';
import { ProductsListPage } from '../pages/ProductsListPage'
import { resourceUsage } from 'node:process';

test('Dropdown selection', { tag: ['@dropdowns'] }, async ({ page, testData }) => {
  let reusableMethods = new ReusableMethods(page);
  await reusableMethods.selectDropDownByVisibleText(page.locator("#country"), 'India')

  await reusableMethods.checkForDuplicateOptions(page.locator("#country"))
  await reusableMethods.printAllDropDownOptions(page.locator("#country"))
  await reusableMethods.verifycountDropdownElements(page.locator("#country option"), 10)
  await reusableMethods.verifyIfOptionIsPresentInDropdrown(page.locator("#country option"), 'India')
  // await reusableMethods.verifyIfDropdownValuesAreAlphabeticalOrder(page.locator("#country option"))
});
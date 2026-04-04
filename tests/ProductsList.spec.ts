import { test, expect } from '../utils/hooks';
import { RandomDataUtil } from '../utils/randomDataGenerator'
import { TestConfig } from '../testdata/test.config'
import { DataProvider } from '../utils/dataproviders'
import { RegistrationPage } from '../pages/RegistrationPage'
import { LoginPage } from '../pages/LoginPage'
import { ReusableMethods } from '../utils/reusableMethods';
import { TestData } from '../utils/testData';
import { CommonMethods } from '../pages/CommonMethods'
import { ProductsListPage } from '../pages/ProductsListPage'

test('Print products list in excel', { tag: ['@smoke, @writeExcel'] }, async ({ page, testData }) => {
  let productsListPage = new ProductsListPage(page, testData)
  let loginPage = new LoginPage(page);
  
  await loginPage.enterEmail(ReusableMethods.getProperty("EMAIL"))
  await loginPage.enterPassword(ReusableMethods.getProperty("PASSWORD"))
  await loginPage.clickLogin()

  let data: any[] = await productsListPage.getProductsList()
  console.log(data)
  DataProvider.writeDataToXLSX('testdata/ProductsList.xlsx', 'Products', data)
});
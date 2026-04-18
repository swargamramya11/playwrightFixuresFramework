import { test } from '../../utils/hooks';
import { DataProvider } from '../../utils/dataproviders'
import { ReusableMethods } from '../../utils/reusableMethods';

test('Print products list in excel', { tag: ['@smoke, @writeExcel'] }, async ({ page, reusableMethods, testData,loginPage, productsListPage }) => {
  await loginPage.enterEmail(ReusableMethods.getProperty("EMAIL"))
  await loginPage.enterPassword(ReusableMethods.getProperty("PASSWORD"))
  await loginPage.clickLogin()

  let data: any[] = await productsListPage.getProductsList()
  console.log(data)
  DataProvider.writeDataToXLSX('resources/testdata/ProductsList.xlsx', 'Products', data)
});
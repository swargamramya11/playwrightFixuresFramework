import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage'
import { CommonMethods } from '../pages/CommonMethods'
import { ProductsListPage } from '../pages/ProductsListPage'
import { RegistrationPage } from '../pages/RegistrationPage'
import { TestData } from '../utils/testData'
import { ReusableMethods } from '../utils/reusableMethods'

type MyPageFixtures = {
  loginPage: LoginPage
  commonMethods: CommonMethods
  registrationPage: RegistrationPage
  productsListPage: ProductsListPage
  reusableMethods: ReusableMethods
  testData: TestData
}

export const MyTest = base.extend<MyPageFixtures>({
  loginPage: async ({ page }, use) => { await use(new LoginPage(page)) },
  commonMethods: async ({ page, testData }, use) => { await use(new CommonMethods(page, testData)) },
  registrationPage: async ({ page, testData }, use) => { await use(new RegistrationPage(page, testData)) },
  productsListPage: async ({ page, testData }, use) => { await use(new ProductsListPage(page, testData)) },
  reusableMethods: async ({ page }, use) => { await use(new ReusableMethods(page)) },
  testData: async ({ }, use) => { await use({} as TestData) }
})
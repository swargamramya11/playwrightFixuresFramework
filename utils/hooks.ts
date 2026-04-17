import { ReusableMethods } from './reusableMethods'
import { MyTest } from '../utils/pageFixures'

MyTest.beforeAll(async () => {
  console.log('Running Before All');
})

MyTest.beforeEach(async ({ page }) => {
  console.log('Running before each test');
  await page.goto(ReusableMethods.getProperty("URL"));
})

MyTest.afterEach(async ({ page }) => {
  console.log('Running after each test');
  await page.close()
})

MyTest.afterAll(async () => {
  console.log('Running After All');
})

export const test = MyTest;
export const expect = MyTest.expect;
import { test as base } from '@playwright/test';
import { TestConfig } from '../test.config'

export const test = base.extend({
  // you can add fixtures here if needed
});

test.beforeEach(async ({ page }) => {
  console.log('Running before each test');

  console.log(process.env.URL)
  console.log(process.env.MESSAGE)

  let config: TestConfig = new TestConfig();
  await page.goto(config.appUrl);

});

test.afterEach(async ({ page }) => {
  console.log('Running after each test');
  await page.close()
});

export const expect = test.expect;
import { defineConfig, devices } from '@playwright/test';
import { allure } from 'allure-playwright';
import dotenv from 'dotenv';

dotenv.config({
  path: `env/.env.${process.env.ENV}`, // process is nodejs object, env contains environment variables, ENV is custom variable name
})

export default defineConfig({
  globalTeardown: require.resolve('./utils/global-teardown'),
  globalSetup: './utils/global-setup.ts',
  timeout: 100 * 1000,
  expect: { timeout: 50000 },
  testDir: './tests',
  fullyParallel: false,
  // retries: 1,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html', { outputFolder: 'reports/html-report' }],
    ['allure-playwright', { outputFolder: 'reports/allure-results' }]
  ],

  use: {
    headless: false,
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    permissions: ['geolocation'],
    actionTimeout: 10000, // Action timeout
    navigationTimeout: 15000, // navigation timeout
    launchOptions: {
      slowMo: 1000
    }
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    // {name: 'firefox', use: { ...devices['Desktop Firefox'] }},
    // {name: 'webkit', use: { ...devices['Desktop Safari'] }},
  ]
});
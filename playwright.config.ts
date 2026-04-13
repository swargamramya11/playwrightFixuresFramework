import { defineConfig, devices } from '@playwright/test';
import { allure } from 'allure-playwright';
import dotenv from 'dotenv';

dotenv.config({
  path: `env/.env.${process.env.ENV}`, // process is nodejs object, env contains environment variables, ENV is custom variable name
})

export default defineConfig({
  snapshotDir: './visual-snapshots',
  globalTeardown: './utils/global-teardown',
  globalSetup: './utils/global-setup.ts',
  timeout: 100 * 1000,
  expect: { timeout: 50000 },
  testDir: './tests',
  fullyParallel: true,
  retries: 0,
  workers: 1,

  reporter: [
    ['html', { outputFolder: 'reports/html-report' }],
    ['list'],
    ['json', { outputFile: 'reports/json-report' }],
    ['junit', { outputFile: 'reports/junit-report' }],
    ['allure-playwright', { outputFolder: 'reports/allure-results' }]
  ],

  use: {
    headless: false,
    baseURL: process.env.BASE_URL,
    trace: 'retain-on-failure',  // Options: 'off', 'on', 'retain-on-failure', 'on-first-retry' 
    screenshot: 'only-on-failure',  // Options: 'on', 'off', 'only-on-failure', 'on-first-failure'
    video: 'retain-on-failure', // Options: 'on', 'off', 'retain-on-failure', 'on-first-retry' 
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
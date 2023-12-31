// @ts-check
import { defineConfig, devices } from '@playwright/test'
import {config as testConfig} from "./config/config.js"

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */

/**
 * @see https://playwright.dev/docs/test-configuration
 */

const config =  defineConfig({
  testMatch: 'tests/**/*.spec.js',
  globalSetup: './globalSetup',
  globalTeardown: './globalTeardown',
  timeout: 40000,
  outputDir: 'test-results',
  // grep: /@ui/,
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
//   reporter: [
//       ['dot'],
//     ['./node_modules/@testomatio/reporter/lib/adapter/playwright.js',
//       {
//     apiKey: testConfig.reporters.testomat.key,
//        },
//       ],
// ],
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    headless: true,
    httpCredentials: {
      username: testConfig.username,
      password: testConfig.password
    },
    baseURL: testConfig.baseURL,
    viewport: {
      width: 1280,
      height: 720
    },
    trace: 'on-first-retry',
    launchOptions:{
      slowMo: 1000
    }
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testMatch: '**/setup/**/*.setup.js',
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup'],
      testIgnore: 'tests/api/**/*.spec.js',
    },
    {
      name: 'api',
      testMatch: 'tests/api/**/*.spec.js',
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    //
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
export default config


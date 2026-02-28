// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: { timeout: 5000 },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html', {
      outputFolder: 'reports/playwright-report',
      open: 'never',
      includeStdio: true,
    }],
  ],

  use: {
    baseURL: 'https://jsonplaceholder.typicode.com',
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'api',
      testMatch: /.*\.api\.spec\.(js|ts)/,
      use: {
        ...devices['Desktop Chrome'],
        headless: true,
      },
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
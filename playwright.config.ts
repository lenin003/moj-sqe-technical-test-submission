import { defineConfig, devices } from '@playwright/test';
import { env } from './utils/env';

export default defineConfig({
  testDir: './tests',

  // Keep fast feedback for PRs and local runs
  fullyParallel: true,
  timeout: 30_000,
  expect: { timeout: 5_000 },

  // CI-friendly: retries + worker cap
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,

  reporter: [
    ['list'],
    ['html', { open: 'always', outputFolder: 'playwright-report' }],
    ['junit', { outputFile: 'test-results/junit.xml' }]
  ],

  use: {
    // UI base URL (can be overridden via .env / CI variables)
    baseURL: env.uiBaseUrl,

    // Set HEADED=true to watch tests run in a visible browser window.
    headless: !env.headed,
    viewport: { width: 1280, height: 720 },

    // Artefacts attached to HTML report
    screenshot: 'on',
    video: 'on',
    trace: 'retain-on-failure',

    ignoreHTTPSErrors: true
  },

  // For this technical test, Chromium-only is a sensible default (fast + stable).
  // Set CROSS_BROWSER=true to enable cross-browser coverage.
  projects: env.crossBrowser
    ? [
        { name: 'Chromium', use: { ...devices['Desktop Chrome'] } },
        { name: 'Firefox', use: { ...devices['Desktop Firefox'] } },
        { name: 'WebKit', use: { ...devices['Desktop Safari'] } }
      ]
    : [{ name: 'Chromium', use: { ...devices['Desktop Chrome'] } }]
});

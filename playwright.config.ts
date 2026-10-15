import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import { settings } from './config/config';

const testDir = defineBddConfig({
  features: 'features/*.feature',
  steps: [
    'step-definitions/*.ts',
    'support/playwrightFixtures.ts',
  ],
});

export default defineConfig({
  testDir,
  fullyParallel: true,
  workers: process.env.CI ? 2 : undefined,
  timeout: settings.timeout,
  reporter: [
    ['list'],
    ['allure-playwright', { outputFolder: 'allure-results' }],
  ],
  use: {
    baseURL: settings.baseUrl,
    headless: settings.headless,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: settings.browserName,
      use: {
        browserName: settings.browserName,
      },
    },
  ],
});

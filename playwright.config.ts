import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? 'line' : 'html',

  use: {
    // чистий baseURL без user:pass@
    baseURL: 'https://tip.stg.wearebrain.com/en-gb/',
    headless: true,
    trace: 'on-first-retry',
    // HTTP Basic Auth замість вшивання в URL
    httpCredentials: {
      username: 'tip',
      password: 'tip',
    },
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // додаткові браузери можна ввімкнути пізніше
  ],
});

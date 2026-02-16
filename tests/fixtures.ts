// tests/fixtures.ts
import { test as base } from '@playwright/test';

const BASE_URL = 'https://tip.stg.wearebrain.com/en-gb/';

type Fixtures = {
  loginAsDealer: () => Promise<void>;
};

export const test = base.extend<Fixtures>({
  loginAsDealer: async ({ page }, use) => {
    await page.goto(BASE_URL);
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByLabel('Email').fill('dealercontact460@gmail.com');
    await page.getByLabel('Password').fill('Testdc123');
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForURL('**/welcome/**');
    // await use();
  },
});

export { expect } from '@playwright/test';

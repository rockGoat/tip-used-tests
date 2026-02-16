// tests/fixtures.ts
import { test as base, expect } from '@playwright/test';

type Fixtures = {
  loginAsDealer: void;
};

export const test = base.extend<Fixtures>({
  loginAsDealer: [
    async ({ page }, use) => {
      await page.goto('/');
      await page.getByRole('link', { name: 'Login' }).click();
      await page.getByLabel(/email/i).fill('dealercontact460@gmail.com');
      await page.getByLabel(/password/i).fill('Testdc123');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.waitForURL('**/welcome/**');

      await use(); // no argument – fixture just ensures logged-in state
    },
    { auto: false },
  ],
});

export { expect };

// tests/fixtures/fixtures.ts
import { test as base, expect, Page } from '@playwright/test';

type Fixtures = {
  dealerLoggedIn: Page;
};

export const test = base.extend<Fixtures>({
  dealerLoggedIn: async ({ page }, use) => {
    await page.goto('https://tip:tip@tip.stg.wearebrain.com/en-gb/');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'E-mail*' }).click();
    await page.getByRole('textbox', { name: 'E-mail*' }).fill('dealercontact460@gmail.com');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('Testdc123');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.waitForURL('**/welcome/**');

    // expose logged-in page
    await use(page);
  },
});

export { expect };

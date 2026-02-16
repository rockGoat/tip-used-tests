// tests/auth.spec.ts
import { assert } from 'node:console';
import { test, expect } from './fixtures';

const BASE_URL = 'https://tip:tip@tip.stg.wearebrain.com/en-gb/';

test.describe('Authentication & cabinet', () => {
  test('Login with Dealer account', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByRole('link', { name: /Login/i }).click();
    await expect(page).toHaveURL(/\/login/);
    await page.getByRole('textbox', { name: 'E-mail*' }).click();
    await page.getByRole('textbox', { name: 'E-mail*' }).fill('dealercontact460@gmail.com');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('Testdc123');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.waitForURL('**/welcome/**');
    await expect(
      page.getByRole('heading', { name: /Welcome, Dealer DealerContact!/i })
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'View the Stock' })
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Favourites' }).first()
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Saved Searches' })
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Details' })
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Change Password' })
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'My Company' })
    ).toBeVisible();
  });

  // test('dealer can logout', async ({ page, loginAsDealer }) => {
  //   await expect(page.getByRole('link', { name: /Login/i })).not.toBeVisible();
  //   await page.getByRole('button', { name: /LOG OUT/i }).click();
  //   assert(await page.getByRole('link', { name: /Login/i }).isVisible());
  // });
});

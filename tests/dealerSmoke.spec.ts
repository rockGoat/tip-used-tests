// tests/auth.spec.ts
import { test, expect } from './fixtures';

const BASE_URL = 'https://tip:tip@tip.stg.wearebrain.com/en-gb/';

test.describe('Authentication & cabinet', () => {
  test('Login with test account', async ({ page }) => {
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

  test('Welcome page navigation & details', async ({ page, loginAsDealer }) => {
    await loginAsDealer();
    const menu = page.getByRole('navigation', { name: /Account/i }); // підбери правильний selector

    await expect(menu.getByRole('link', { name: /Welcome/i })).toBeVisible();
    await expect(menu.getByRole('link', { name: /Favourites/i })).toBeVisible();
    await expect(menu.getByRole('link', { name: /Saved Searches/i })).toBeVisible();
    await expect(menu.getByRole('link', { name: /Details/i })).toBeVisible();
    await expect(menu.getByRole('link', { name: /Change Password/i })).toBeVisible();

    await expect(page.getByText(/Logged in as: Dealer DealerContact/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /LOG OUT/i })).toBeVisible();
  });

  test('Details page readonly', async ({ page, loginAsDealer }) => {
    await loginAsDealer();
    await page.getByRole('link', { name: /Details/i }).click();
    await expect(page).toHaveURL(/\/profile|details/);

    const firstName = page.getByLabel(/First name/i);
    await expect(firstName).toBeVisible();
    await expect(firstName).toBeDisabled(); // або hasAttribute('readonly', 'readonly')
  });

  test('Change password validation', async ({ page, loginAsDealer }) => {
    await loginAsDealer();
    await page.getByRole('link', { name: /Change Password/i }).click();

    await page.getByLabel(/Current Password/i).fill('wrong');
    await page.getByLabel(/New Password/i).fill('Newpass123!');
    await page.getByLabel(/Confirm New Password/i).fill('Newpass123!');
    await page.getByRole('button', { name: /Save|Change password/i }).click();
    await expect(page.getByText(/incorrect current password/i)).toBeVisible();

    // позитивний сценарій – тільки якщо дозволено міняти тестовий пароль
  });

  test('Logout and access control', async ({ page, loginAsDealer }) => {
    await loginAsDealer();
    await page.getByRole('button', { name: /LOG OUT/i }).click();
    await expect(page).toHaveURL(/\/(en-gb\/|login)/);
    await expect(page.getByRole('link', { name: /Login/i })).toBeVisible();

    await page.goto('https://tip.stg.wearebrain.com/en-gb/welcome/');
    await expect(page).toHaveURL(/\/login/);
  });
});

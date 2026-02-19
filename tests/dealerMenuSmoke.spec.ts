// tests/auth.spec.ts
import { test, expect } from './fixtures/fixtures';

test.describe('Authentication & cabinet', () => {
  test('dealer can navigate cabinet pages', async ({ page, dealerLoggedIn }) => {
    // Already logged in and on /welcome/ via dealerLoggedIn fixture

    // Welcome page
    await expect(
      page.getByRole('heading', { name: /Welcome, Dealer DealerContact!/i })
    ).toBeVisible();

    // View the Stock button → dealer stock listing opens
    await page.getByRole('button', { name: 'View the Stock' }).isVisible();

    const sideNav = page.getByRole('navigation');

    // Welcome link → welcome page
    await sideNav.getByRole('link', { name: 'Welcome' }).click();
    await expect(page).toHaveURL(/\/en-gb\/welcome\/?$/);
    await expect(
      page.getByRole('heading', { name: /Welcome, Dealer DealerContact!/i })
    ).toBeVisible();

    // Favourites link → favourites page
    await sideNav.getByRole('link', { name: /Favourites/i }).click();
    await expect(page).toHaveURL(/\/en-gb\/favourites\/?$/);
    await expect(
      page.getByRole('heading', { name: /My favourite vehicles/i })
    ).toBeVisible();

    // Saved Searches link → saved searches page
    await sideNav.getByRole('link', { name: 'Saved Searches' }).click();
    await expect(page).toHaveURL(/\/en-gb\/saved-searches\/?$/);
    await expect(
      page.getByRole('heading', { name: /Saved/i })
    ).toBeVisible();

    // Details link → profile details page
    await sideNav.getByRole('link', { name: 'Details' }).click();
    await expect(page).toHaveURL(/\/en-gb\/details\/?$/);
    await expect(
      page.getByRole('heading', { name: /My Details/i })
    ).toBeVisible();

    // Change Password link → change password page
    await sideNav.getByRole('link', { name: 'Change Password' }).click();
    await expect(page).toHaveURL(/\/en-gb\/change-password\/?$/);
    await expect(
      page.getByRole('heading', { name: /Change Password/i })
    ).toBeVisible();
  });
});

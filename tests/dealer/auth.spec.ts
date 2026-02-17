// tests/auth.spec.ts
import { test, expect } from '../fixtures/fixtures';

test.describe('Authentication & cabinet', () => {
  test('Login with Dealer account', async ({ dealerLoggedIn }) => {
    const page = dealerLoggedIn;

    // Welcome heading
    await expect(
      page.getByRole('heading', { name: /Welcome, Dealer DealerContact!/i })
    ).toBeVisible();

    // CTA on welcome page
    await expect(
      page.getByRole('button', { name: 'View the Stock' })
    ).toBeVisible();

    // Right-side menu links
    const sideNav = page.getByRole('navigation');
    await expect(sideNav.getByRole('link', { name: 'Welcome' })).toBeVisible();
    await expect(
      sideNav.getByRole('link', { name: /Favourites/i }).first()
    ).toBeVisible();
    await expect(
      sideNav.getByRole('link', { name: 'Saved Searches' })
    ).toBeVisible();
    await expect(
      sideNav.getByRole('link', { name: 'Details' })
    ).toBeVisible();
    await expect(
      sideNav.getByRole('link', { name: 'Change Password' })
    ).toBeVisible();
  });
});

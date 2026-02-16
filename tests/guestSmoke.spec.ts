import { test, expect } from '@playwright/test';

test.describe('Homepage & search filters', () => {
  test('open homepage and apply search', async ({ page }) => {
    // Open EN site with basic auth
    await page.goto('https://tip:tip@tip.stg.wearebrain.com/en-gb/');

    // Click header logo and verify EN URL
    await page.getByRole('link', { name: 'TIP USED logo' }).click();
    await expect(page).toHaveURL(/\/en-gb\//);

    // Verify hero heading is visible on NL page
    await expect(page.getByRole('heading', { name: 'Committed to Quality' })).toBeVisible();

    // Verify footer content blocks
    await expect(page.getByText('Buy used equipment')).toBeVisible();
    await expect(page.getByText('About TIP')).toBeVisible();
    await expect(page.getByText('Other TIP services')).toBeVisible();

    // Select vehicle type tiles (Trailer / Truck / SwapBody)
    await page.locator('.image-wrapper').first().click();
    await page.locator('div:nth-child(2) > label > .image-wrapper').click();
    await page.locator('div:nth-child(3) > label > .image-wrapper').click();

    // Brand = Krone
    await page.locator('div:nth-child(4) > .multiselect > .multiselect__select').click();
    await page.locator('span', { hasText: 'Krone' }).first().click();

    // Country = Netherlands
    await page.getByLabel('Country', { exact: true }).locator('.multiselect__select').click();
    await page.getByLabel('Country', { exact: true }).getByText('Netherlands').click();

    // Run search
    await page.getByRole('button', { name: 'Search' }).click();

    // Remove selected filters and clear all
    await page.getByRole('button', { name: 'ClearAll' }).click();

    // Basic smoke check that page is still responsive
    await expect(page).not.toHaveTitle(/Error/i);
  });
});

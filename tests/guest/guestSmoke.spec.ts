// tests/guest/guestSmoke.spec.ts
import { test, expect } from '@playwright/test';


const BASE_URL = 'https://tip:tip@tip.stg.wearebrain.com/en-gb/';

test.describe('Guest user smoke tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  });

  test('homepage loads with all key elements', async ({ page }) => {
    // Header
    await expect(page.getByRole('link', { name: 'TIP USED logo' })).toBeVisible();
    await expect(page.getByRole('button', { name: /Select country and language/i })).toBeVisible();
    
    // Hero section
    await expect(page.getByRole('heading', { name: 'COMMITTED TO QUALITY' })).toBeVisible();
    
    // Search form
    await expect(page.locator('[data-test-id="vehicle-type-trailer"], img[alt*="Trailer"]').first()).toBeVisible();
    await expect(page.getByRole('combobox', { name: 'Superstructure' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'SEARCH' })).toBeVisible();
    
    // Newest section
    await expect(page.getByRole('heading', { name: 'Newest' })).toBeVisible();
    await expect(page.getByRole('link', { name: /SHOW ALL/i })).toBeVisible();
    
    // Shop By Brand
    await expect(page.getByRole('heading', { name: 'Shop By Brand' })).toBeVisible();
    
    // Our stock
    await expect(page.getByRole('heading', { name: 'Our stock' })).toBeVisible();
    
    // Footer sections
    const footer = page.getByRole('contentinfo');
    await expect(footer.getByText('BUY USED EQUIPMENT')).toBeVisible();
    await expect(footer.getByText('ABOUT TIP')).toBeVisible();
    await expect(footer.getByText('OTHER TIP SERVICES')).toBeVisible();
  });

  // test('can browse "Newest" vehicles and view details', async ({ page }) => {
  //   // Click first vehicle in Newest
  //   const firstVehicle = page.locator('a[href*="/used/"]').first();
  //   const vehicleTitle = await firstVehicle.locator('heading').first().textContent();
    
  //   await firstVehicle.click();
    
  //   // Verify unit detail page opened
  //   await expect(page).toHaveURL(/\/used\/.+\/.+\/.+\/.+/);
  //   await expect(page.getByText(/UNIT NUMBER:/i)).toBeVisible();
  //   await expect(page.getByText(/excl\. VAT/i)).toBeVisible();
  // });

  // test('can use basic search and view results', async ({ page }) => {
  //   // Select vehicle type - Trailer
  //   await page.locator('img[alt*="Trailer"]').click();
    
  //   // Click Search without other filters
  //   await page.getByRole('button', { name: 'SEARCH' }).click();
    
  //   // Verify search results page
  //   await expect(page).toHaveURL(/\/search/);
    
  //   // Should have vehicle cards or empty state
  //   const cards = page.locator('a[href*="/used/"]');
  //   const count = await cards.count();
    
  //   if (count > 0) {
  //     await expect(cards.first()).toBeVisible();
  //   } else {
  //     await expect(page.getByText(/No vehicles found/i)).toBeVisible();
  //   }
  // });

  test('can filter by brand from "Shop By Brand"', async ({ page }) => {
    // Scroll to Shop By Brand section
    await page.getByRole('heading', { name: 'Shop By Brand' }).scrollIntoViewIfNeeded();
    
    // Click Krone brand
    const kroLink = page.getByRole('link', { name: /View KRO vehicles/i });
    await expect(kroLink).toBeVisible();
    await kroLink.click();
    
    // Verify filtered results
    await expect(page).toHaveURL(/brandIds=KRO/);
    
    const cards = page.locator('a[href*="/used/"]');
    if (await cards.count() > 0) {
      // Verify at least first card contains Krone
      await expect(cards.first()).toContainText(/Krone/i);
    }
  });

  test('can navigate via "Our stock" categories', async ({ page }) => {
    await page.getByRole('heading', { name: 'Our stock' }).scrollIntoViewIfNeeded();
    
    // Click Curtainsiders
    const curtainsiderLink = page.getByRole('link', { name: /Curtainsiders/i }).first();
    await curtainsiderLink.click();
    
    await expect(page).toHaveURL(/curtainsider-trailer/);
    
    const cards = page.locator('a[href*="/used/"]');
    if (await cards.count() > 0) {
      await expect(cards.first()).toBeVisible();
    }
  });

  // test('can add vehicle to Favourites (localStorage)', async ({ page }) => {
  //   // Find first vehicle card
  //   const firstCard = page.locator('a[href*="/used/"]').first();
  //   await firstCard.scrollIntoViewIfNeeded();
    
  //   // Click Favourite button
  //   const favButton = firstCard.getByRole('button', { name: /Add to saved units|Favourite/i });
  //   await favButton.click();
    
  //   // Check localStorage has favourites
  //   const favStorage = await page.evaluate(() => localStorage.getItem('favourites'));
  //   expect(favStorage).not.toBeNull();
  //   expect(favStorage).toContain('[');
  // });

  // test('can add vehicle to Compare (localStorage)', async ({ page }) => {
  //   const firstCard = page.locator('a[href*="/used/"]').first();
  //   await firstCard.scrollIntoViewIfNeeded();
    
  //   const compareButton = firstCard.getByRole('button', { name: /Add to comparison|Сompare/i });
  //   await compareButton.click();
    
  //   const compareStorage = await page.evaluate(() => localStorage.getItem('compareVehicles'));
  //   expect(compareStorage).not.toBeNull();
  // });

  // test('footer links navigate correctly', async ({ page }) => {
  //   const footer = page.getByRole('contentinfo');
    
  //   // Test About us
  //   await footer.getByRole('link', { name: 'About us' }).click();
  //   await expect(page).toHaveURL(/\/about-us/);
  //   await expect(page.locator('h1, h2').first()).toBeVisible();
    
  //   await page.goto(BASE_URL);
    
  //   // Test Contact
  //   await footer.getByRole('link', { name: 'Contact' }).click();
  //   await expect(page).toHaveURL(/\/contact/);
    
  //   await page.goto(BASE_URL);
    
  //   // Test FAQ
  //   await footer.getByRole('link', { name: 'FAQ' }).click();
  //   await expect(page).toHaveURL(/\/faq/);
  // });

  // test('language switcher works', async ({ page }) => {
  //   // Open language selector
  //   await page.getByRole('button', { name: /Select country and language/i }).click();
    
  //   // Select different country (e.g., Netherlands)
  //   await page.getByRole('option', { name: /Netherlands/i }).click();
    
  //   // Select language
  //   await page.getByRole('option', { name: /Dutch|Nederlands/i }).click();
    
  //   // Should navigate to NL locale
  //   await expect(page).toHaveURL(/\/nl-nl/);
    
  //   // Switch back to EN
  //   await page.getByRole('button', { name: /Select country and language/i }).click();
  //   await page.getByRole('option', { name: /United Kingdom & Ireland/i }).click();
  //   await page.getByRole('option', { name: /English|Engels/i }).click();
    
  //   await expect(page).toHaveURL(/\/en-gb/);
  // });

  test('"Show all" from Newest opens full search', async ({ page }) => {
    await page.getByRole('link', { name: /SHOW ALL/i }).click();
    
    await expect(page).toHaveURL(/\/search/);
    await expect(page.locator('a[href*="/used/"]').first()).toBeVisible();
  });

  // test('blog/knowledge center links work', async ({ page }) => {
  //   await page.getByRole('link', { name: /Checklist before buying/i }).click();
    
  //   // External link to knowledge center
  //   await expect(page).toHaveURL(/blog\/knowledge-center/);
  // });
});

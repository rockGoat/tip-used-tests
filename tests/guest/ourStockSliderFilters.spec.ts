import { test, expect } from '@playwright/test';

test.describe('Our stock tiles apply correct filters', () => {
  const base = 'https://tip:tip@tip.stg.wearebrain.com';

  const cases = [
    {
      name: 'Curtainsiders',
      linkText: 'Curtainsiders',
      expectedUrl: /\/en-gb\/used\/trailer\/curtainsider-trailer\/?$/,
      expectedSuperstructure: 'Curtainsider',
    },
    {
      name: 'Reefers',
      linkText: 'Reefers',
      expectedUrl: /\/en-gb\/used\/trailer\/reefer-trailer\/?$/,
      expectedSuperstructure: 'Reefer',
    },
    // add Vans / Flats / Chassis / Tankers, etc.
  ];

  for (const c of cases) {
    test(`${c.name} tile shows only ${c.expectedSuperstructure}`, async ({ page }) => {
      await page.goto(`${base}/en-gb/`, { waitUntil: 'networkidle' });

      await page.getByRole('heading', { name: 'Our stock' }).scrollIntoViewIfNeeded();

      const desktopTile = page
        .locator('.vehicles-desktop .vehicle')
        .filter({ hasText: c.linkText })
        .first();

      if (await desktopTile.isVisible()) {
        await desktopTile.click();
      } else {
        await page
          .locator('.vehicles-mobile .vehicle')
          .filter({ hasText: c.linkText })
          .first()
          .click();
      }

// URL corresponds to category
await expect(page).toHaveURL(c.expectedUrl);

const cards = page.locator('a.listing-item');
const count = await cards.count();

if (count === 0) {
  // Just assert that there are no cards; do NOT check specific empty-state text
  await expect(cards).toHaveCount(0);
  return;
}

// For non-empty result set – every card matches expected Superstructure
for (let i = 0; i < count; i++) {
  const card = cards.nth(i);
  const details = card.locator('.detailstable');

  await expect(
    details.locator('tr', { hasText: 'Superstructure' }).locator('td').nth(1)
  ).toHaveText(c.expectedSuperstructure);
}
    });
  }
});


// tests/dealer/savedSearchSmoke.spec.ts
import { test, expect } from './fixtures/dealerFixtures';

test.describe('Dealer Saved Search smoke', () => {
  test('saved searches functionality', async ({ dealerLoggedIn: page }) => {
    // 1. Відкрити saved searches
    await page.goto('https://tip.stg.wearebrain.com/en-gb/saved-searches');
    await expect(page).toHaveURL(/\/saved-searches/);

    // 2. Дочекатись завантаження контенту
    await page.waitForLoadState('networkidle');

    // 3. Просто screenshot для візуальної перевірки
    // await page.screenshot({ path: 'test-results/saved-searches-smoke.png', fullPage: true });

    console.log('✓ Saved searches page smoke test passed');
  });
});

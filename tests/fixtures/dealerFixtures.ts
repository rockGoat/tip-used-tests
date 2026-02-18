// tests/fixtures/dealerFixtures.ts
import { test as base, expect, Page } from '@playwright/test';

type DealerFixtures = {
  dealerLoggedIn: Page;
};

export const test = base.extend<DealerFixtures>({
  dealerLoggedIn: async ({ page }, use) => {
    // Логін
    await page.goto('https://tip.stg.wearebrain.com/en-gb/');
    await page.getByRole('link', { name: 'Login' }).click();

    await page.getByRole('textbox', { name: 'E-mail*' }).fill('dealercontact460@gmail.com');
    await page.getByRole('button', { name: 'Login' }).click();

    await page.getByRole('textbox', { name: 'Password' }).fill('Testdc123');
    await page.getByRole('button', { name: 'Sign in' }).click();

    await page.waitForURL('**/welcome/**', { timeout: 15000 });

    // // Перехід на search з фільтрами
    // await page.goto(
    //   'https://tip.stg.wearebrain.com/en-gb/search?vehicleTypeId=TRAILER&superStructureId=TC&minModelYear=2015&countryIds=NL'
    // );

    // Проста перевірка - чекаємо текст "Save Search" (означає, що сторінка готова)
    // await expect(page.getByText('Save Search')).toBeVisible({ timeout: 15000 });

    await use(page);
  },
});

export { expect };

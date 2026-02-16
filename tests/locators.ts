// tests/locators.ts
import { Page, Locator } from '@playwright/test';

export const locators = {
  // Vehicle type buttons (иконки)
  vehicleType: (page: Page, type: 'Trailer' | 'Truck' | 'SwapBody'): Locator =>
    page.getByRole('button', { name: type }), // если это кнопки; если просто иконки-линки, заміни на getByRole('link')

  // Superstructure (radio)
  superstructureAll: (page: Page): Locator =>
    page.getByRole('radio', { name: 'All' }),

  superstructureRadio: (page: Page, label: string): Locator =>
    page.getByRole('radio', { name: label }), // 'Curtainsider', 'Reefer', 'Skeletal', 'Tanker', 'Tilt Trailer', 'Van', ...

  // Axles
  axlesAll: (page: Page): Locator =>
    page.getByRole('checkbox', { name: 'All' }).nth(2), // третий All по DOM: Subgroup All (1), Axles All (2), Brand All (3) и т.п.
  // Надёжнее – через heading + locator:
  // axlesAll: (page: Page) =>
  //   page.getByRole('heading', { name: 'Axles' }).locator('..').getByRole('checkbox', { name: 'All' })

  axlesCheckbox: (page: Page, axles: string): Locator =>
    page.getByRole('heading', { name: 'Axles' })
      .locator('..')
      .getByRole('checkbox', { name: axles }),

  // Brand
  brandAll: (page: Page): Locator =>
    page.getByRole('heading', { name: 'Brand' })
      .locator('..')
      .getByRole('checkbox', { name: 'All' }),

  brandCheckbox: (page: Page, brandCode: string): Locator => {
    // мапим коды на aria-label из DOM
    const map: Record<string, string> = {
      KRO: 'Krone',
      FFR: 'Fruehauf',
      SCH: 'Schmitz',
      MON: 'Montracon',
    };
    return page.getByRole('heading', { name: 'Brand' })
      .locator('..')
      .getByRole('checkbox', { name: map[brandCode] });
  },

  // Country
  countryAll: (page: Page): Locator =>
    page.getByRole('heading', { name: 'Country' })
      .locator('..')
      .getByRole('checkbox', { name: 'All' }),

  countryCheckbox: (page: Page, countryCode: string): Locator => {
    const map: Record<string, string> = {
      DK: 'Denmark',
      FR: 'France',
      DE: 'Germany',
      NL: 'Netherlands',
      SE: 'Sweden',
      GB: 'United Kingdom',
    };
    return page.getByRole('heading', { name: 'Country' })
      .locator('..')
      .getByRole('checkbox', { name: map[countryCode] });
  },

  // Model Year
  yearMin: (page: Page): Locator =>
    page.getByLabel('Minimum Model Year'),

  yearMax: (page: Page): Locator =>
    page.getByLabel('Maximum Model Year'),

  // Price
  priceMin: (page: Page): Locator =>
    page.getByLabel('Minimum price'),

  priceMax: (page: Page): Locator =>
    page.getByLabel('Maximum price'),

  // Cards list
  cards: (page: Page): Locator =>
    page.locator('a[href*="/used/"]').filter({ hasText: 'UNIT NUMBER:' }),
  // при желании можно обернуть каждый card в div, если есть обёртка, но по DOM якоря выглядят как карточки

  // Таблица деталей внутри карточки (на детальной, если там table)
  cardDetailsTable: (card: Locator): Locator =>
    card.locator('table'),

  // Цена в листинге
  cardPriceList: (card: Locator): Locator =>
    card.locator('text=excl. VAT').first().locator('..'),

  // Пагинация "Showing ..."
  paginationCount: (page: Page): Locator =>
    page.locator('text=results').first(), // можно уточнить через hasText 'results' или 'Showing'

  // Empty state (когда 0 результатов)
  emptyState: (page: Page): Locator =>
    page.locator('text=No results').first(), // подставь реальный текст пустого состояния
};

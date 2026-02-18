import { test, expect } from '@playwright/test';

test('server is healthy (no 5xx on main page)', async ({ page }) => {
  const url = 'https://tip-used.com'; // свій base URL

  const responses: { url: string; status: number }[] = [];

  page.on('response', response => {
    const status = response.status();
    if (status >= 500) {
      responses.push({ url: response.url(), status });
    }
  });

  await page.goto(url, { waitUntil: 'networkidle' });

  // Якщо були 5xx — валимо тест одним асертом
  if (responses.length > 0) {
    const details = responses
      .map(r => `[${r.status}] ${r.url}`)
      .join('\n');

    expect(
      responses.length,
      `Server returned 5xx during health-check:\n${details}`,
    ).toBe(0);
  }
});

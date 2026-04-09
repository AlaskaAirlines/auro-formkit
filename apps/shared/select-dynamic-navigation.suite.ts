import { test, expect, type Page } from '@playwright/test';

const INITIAL_VALUE = 'bar';
const OPTIONS_LOAD_TIMEOUT = 5_000;

/** Poll until auro-select.value equals the expected value. */
async function waitForSelectValue(page: Page, expected: string, timeout = OPTIONS_LOAD_TIMEOUT) {
  await page.waitForFunction(
    ([selector, val]) =>
      (document.querySelector(selector as string) as any)?.value === val,
    ['auro-select', expected],
    { timeout },
  );
}

/** Wait until at least one auro-menuoption is attached (options loaded). */
async function waitForOptionsLoaded(page: Page, timeout = OPTIONS_LOAD_TIMEOUT) {
  await page.waitForSelector('auro-menuoption', { state: 'attached', timeout });
}

async function waitForSelectReady(page: Page) {
  await page.waitForFunction(
    () => customElements.get('auro-select') !== undefined,
    { timeout: 10_000 },
  );
  await waitForOptionsLoaded(page);
}

export function selectDynamicNavigationSuite(framework: string) {
  test.describe(`auro-select preselected value with dynamic menu after SPA navigation in ${framework}`, () => {
    test('value equals preselected value after SPA navigation and dynamic options load', async ({ page }) => {
      await page.goto('/select-dynamic-navigate');

      await page.waitForURL('**/select-dynamic', { timeout: 5_000 });
      await waitForSelectReady(page);
      await waitForSelectValue(page, INITIAL_VALUE);

      const value = await page.locator('auro-select').evaluate((el: any) => el.value);
      expect(value, 'auro-select.value should equal the preselected value after options load').toBe(INITIAL_VALUE);
    });

    // Control: direct navigation + dynamic options
    test('value equals preselected value on direct navigation with dynamic options (control)', async ({ page }) => {
      await page.goto('/select-dynamic');
      await waitForSelectReady(page);
      await waitForSelectValue(page, INITIAL_VALUE);

      const value = await page.locator('auro-select').evaluate((el: any) => el.value);
      expect(value, 'auro-select.value should equal the preselected value after options load').toBe(INITIAL_VALUE);
    });
  });
}

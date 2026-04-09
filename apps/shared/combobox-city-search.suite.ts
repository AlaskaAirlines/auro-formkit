import { test, expect, type Page } from '@playwright/test';

/** Type text into the auro-combobox's internal shadow-DOM input. */
async function typeIntoCombobox(page: Page, text: string) {
  // Current combobox internals keep role="combobox" inputs visually hidden.
  // Drive filtering via the component's public inputValue event instead.
  await page.locator('auro-combobox').evaluate((el: any, value: string) => {
    el.typedValue = value;
    el.dispatchEvent(new CustomEvent('inputValue', {
      bubbles: true,
      composed: true,
      detail: { value },
    }));
  }, text);
}

/** Wait until auro-menuoption elements with the given value are present in the DOM. */
async function waitForOption(page: Page, value: string, timeout = 5000) {
  await page.waitForSelector(`auro-menuoption[value="${value}"]`, { timeout });
}

/** Wait until no auro-menuoption elements are visible (results cleared). */
async function waitForOptionsCleared(page: Page, timeout = 5000) {
  await page.waitForFunction(
    () => document.querySelectorAll('auro-menuoption:not([static])').length === 0,
    { timeout },
  );
}

/** Get the combobox element's value property. */
function getComboboxValue(page: Page) {
  return page.locator('auro-combobox').evaluate((el: any) => el.value);
}

export function comboboxCitySearchSuite(framework: string) {
  const route = '/combobox-city-search';

  test.describe(`auro-combobox city search in ${framework}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(route);
      await page.waitForFunction(() => customElements.get('auro-combobox') !== undefined, {
        timeout: 10_000,
      });
    });

    test('typing "sea" loads Seattle option', async ({ page }) => {
      await typeIntoCombobox(page, 'sea');
      await waitForOption(page, 'SEA');

      const option = page.locator('auro-menuoption[value="SEA"]');
      await expect(option).toBeAttached();
    });

    test('selecting an option sets combobox value to the IATA code', async ({ page }) => {
      await typeIntoCombobox(page, 'portland');
      await waitForOption(page, 'PDX');

      await page.locator('auro-menuoption[value="PDX"]').click();

      await page.waitForFunction(
        () => (document.querySelector('auro-combobox') as any)?.value === 'PDX',
        { timeout: 3000 },
      );

      const value = await getComboboxValue(page);
      expect(value).toBe('PDX');
    });

    test('typing a new query replaces previous options', async ({ page }) => {
      await typeIntoCombobox(page, 'sea');
      await waitForOption(page, 'SEA');

      await typeIntoCombobox(page, 'anchorage');
      await waitForOption(page, 'ANC');

      // SEA should no longer be present
      const seaOption = page.locator('auro-menuoption[value="SEA"]');
      await expect(seaOption).not.toBeAttached();
    });

    test('typing gibberish shows no results message', async ({ page }) => {
      await typeIntoCombobox(page, 'xyzxyzxyz');

      // Wait for loading to finish (debounce + search)
      await page.waitForSelector('[data-testid="no-results"]', { timeout: 5000 });

      const noResults = page.locator('[data-testid="no-results"]');
      await expect(noResults).toBeAttached();
    });

    test('metro area results include sub-station options', async ({ page }) => {
      await typeIntoCombobox(page, 'san francisco');
      await waitForOption(page, 'SFO');

      // Parent metro entry
      const metroOption = page.locator('auro-menuoption[value="BA3"]');
      await expect(metroOption).toBeAttached();

      // Sub-station entries
      await expect(page.locator('auro-menuoption[value="SFO"]')).toBeAttached();
      await expect(page.locator('auro-menuoption[value="OAK"]')).toBeAttached();
      await expect(page.locator('auro-menuoption[value="SJC"]')).toBeAttached();
    });

    test('value persists after DOM remount', async ({ page }) => {
      // Select a city
      await typeIntoCombobox(page, 'denver');
      await waitForOption(page, 'DEN');
      await page.locator('auro-menuoption[value="DEN"]').click();

      await page.waitForFunction(
        () => (document.querySelector('auro-combobox') as any)?.value === 'DEN',
        { timeout: 3000 },
      );

      // Unmount
      await page.locator('#toggle').click();
      await page.waitForSelector('auro-combobox', { state: 'detached' });

      // Remount
      await page.locator('#toggle').click();
      await page.waitForSelector('auro-combobox', { state: 'attached' });

      // The selected value display should reflect DEN
      const displayValue = await page.locator('[data-testid="selected-value"]').textContent();
      expect(displayValue).toBe('DEN');
    });

    test('selected value is reflected in the display element', async ({ page }) => {
      await typeIntoCombobox(page, 'anchorage');
      await waitForOption(page, 'ANC');
      await page.locator('auro-menuoption[value="ANC"]').click();

      await page.waitForFunction(
        () => (document.querySelector('[data-testid="selected-value"]') as HTMLElement)?.textContent === 'ANC',
        { timeout: 3000 },
      );

      const display = page.locator('[data-testid="selected-value"]');
      await expect(display).toHaveText('ANC');
    });
  });
}

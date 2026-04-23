import { test, expect, type Page } from './coverage-fixture';

async function typeIntoCombobox(page: Page, text: string) {
  await page.waitForFunction(() => {
    const combobox = document.querySelector('auro-combobox') as any;
    return !!combobox?.input;
  }, { timeout: 8000 });

  await page.locator('auro-combobox').evaluate((el: any, value: string) => {
    const input = el.input;
    if (!input) {
      throw new Error('Combobox input is not initialized');
    }

    if (typeof el.focus === 'function') {
      el.focus();
    }
    if (typeof input.focus === 'function') {
      input.focus();
    }

    const nativeInput = input.inputElement;
    if (nativeInput) {
      nativeInput.value = value;
      input.value = value;
      nativeInput.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
      return;
    }

    input.value = value;
    el.handleInputValueChange({ target: input });
  }, text);

  await page.waitForFunction((value: string) => {
    const combobox = document.querySelector('auro-combobox') as any;
    if (!combobox || !combobox.input) {
      return false;
    }

    const triggerValue = combobox.input.value || '';
    const bibValue = combobox.inputInBib?.value || triggerValue;
    return triggerValue === value && bibValue === value;
  }, text, { timeout: 8000 });

  await page.locator('auro-combobox').evaluate((el: any) => {
    if (el.dropdown && !el.dropdownOpen && typeof el.dropdown.show === 'function') {
      el.dropdown.show();
    }
  });
}

async function waitForOption(page: Page, value: string, timeout = 8000) {
  try {
    await page.waitForSelector(`auro-menuoption[value="${value}"]`, { timeout });
  } catch {
    await page.locator('auro-combobox').evaluate((el: any) => {
      if (typeof el.focus === 'function') {
        el.focus();
      }
      if (el.input && typeof el.input.focus === 'function') {
        el.input.focus();
      }
      if (!el.dropdownOpen && typeof el.showBib === 'function') {
        el.showBib();
      }
    });

    await page.waitForSelector(`auro-menuoption[value="${value}"]`, { timeout });
  }
}

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

      const seaOption = page.locator('auro-menuoption[value="SEA"]');
      await expect(seaOption).not.toBeAttached();
    });

    test('typing gibberish shows no results message', async ({ page }) => {
      await typeIntoCombobox(page, 'xyzxyzxyz');

      await page.waitForSelector('[data-testid="no-results"]', { timeout: 5000 });

      const noResults = page.locator('[data-testid="no-results"]');
      await expect(noResults).toBeAttached();
    });

    test('metro area results include sub-station options', async ({ page }) => {
      await typeIntoCombobox(page, 'san francisco');
      await waitForOption(page, 'SFO');

      const metroOption = page.locator('auro-menuoption[value="BA3"]');
      await expect(metroOption).toBeAttached();

      await expect(page.locator('auro-menuoption[value="SFO"]')).toBeAttached();
      await expect(page.locator('auro-menuoption[value="OAK"]')).toBeAttached();
      await expect(page.locator('auro-menuoption[value="SJC"]')).toBeAttached();
    });

    test('value persists after DOM remount', async ({ page }) => {
      await typeIntoCombobox(page, 'denver');
      await waitForOption(page, 'DEN');
      await page.locator('auro-menuoption[value="DEN"]').click();

      await page.waitForFunction(
        () => (document.querySelector('auro-combobox') as any)?.value === 'DEN',
        { timeout: 3000 },
      );

      await page.locator('#toggle').click();
      await page.waitForSelector('auro-combobox', { state: 'detached' });

      await page.locator('#toggle').click();
      await page.waitForSelector('auro-combobox', { state: 'attached' });

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

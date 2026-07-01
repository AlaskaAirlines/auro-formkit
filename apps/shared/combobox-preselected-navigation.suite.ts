import { test, expect, type Page } from './coverage-fixture';

const PRESELECTED_VALUE = 'SFO';

async function waitForCombobox(page: Page) {
  await page.waitForFunction(
    () => {
      const el = document.querySelector('auro-combobox') as any;
      return (
        customElements.get('auro-combobox') !== undefined &&
        el != null &&
        el.dropdown != null
      );
    },
    { timeout: 10_000 },
  );
}

async function getComboboxState(page: Page) {
  return page.locator('auro-combobox').evaluate((el: any) => {
    return {
      value: el.value,
      dropdownOpen: el.dropdownOpen,
    };
  });
}

async function waitForPreselectedPath(page: Page) {
  await page.waitForFunction(
    () => window.location.pathname.endsWith('/combobox-city-search-preselected'),
    { timeout: 10_000 },
  );
}

export function comboboxPreselectedNavigationSuite(framework: string) {
  test.describe(`auro-combobox preselected value after SPA navigation in ${framework}`, () => {
    test.skip('value equals preselected value after SPA navigation from homepage', async ({ page }) => {
      await page.goto('/combobox-city-search-preselected-navigate');

      await waitForPreselectedPath(page);
      await waitForCombobox(page);

      const result = await getComboboxState(page);

      expect(result.value, 'combobox.value should equal the preselected value').toBe(PRESELECTED_VALUE);
      expect(result.dropdownOpen, 'menu should not open on its own after navigation').toBe(false);
    });

    test.skip('selected-value display reflects preselected value after SPA navigation', async ({ page }) => {
      await page.goto('/combobox-city-search-preselected-navigate');

      await waitForPreselectedPath(page);
      await waitForCombobox(page);

      const display = page.locator('[data-testid="selected-value"]');
      await expect(display).toContainText(PRESELECTED_VALUE);
    });

    test('value equals preselected value on direct navigation (control)', async ({ page }) => {
      await page.goto('/combobox-city-search-preselected');
      await waitForCombobox(page);

      const result = await getComboboxState(page);

      expect(result.value, 'combobox.value should equal the preselected value').toBe(PRESELECTED_VALUE);
      expect(result.dropdownOpen, 'menu should not open on direct navigation').toBe(false);
    });
  });
}

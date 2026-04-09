import { test, expect, type Page } from '@playwright/test';

const PRESELECTED_VALUE = 'SEA';

/** Wait for the combobox custom element to be defined and its dropdown initialized. */
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

export function comboboxPreselectedNavigationSuite(framework: string) {
  test.describe(`auro-combobox preselected value after SPA navigation in ${framework}`, () => {
    test('value equals preselected value after SPA navigation from homepage', async ({ page }) => {
      await page.goto('/combobox-city-search-preselected-navigate');

      // Wait for the SPA navigation to complete (URL changes to the preselected page)
      await page.waitForURL('**/combobox-city-search-preselected', { timeout: 5_000 });

      await waitForCombobox(page);

      const result = await page.locator('auro-combobox').evaluate((el: any) => ({
        value: el.value,
        dropdownOpen: el.dropdownOpen,
      }));

      expect(result.value, 'combobox.value should equal the preselected value').toBe(PRESELECTED_VALUE);
      expect(result.dropdownOpen, 'bib should not open on its own after navigation').toBe(false);
    });

    test('selected-value display reflects preselected value after SPA navigation', async ({ page }) => {
      await page.goto('/combobox-city-search-preselected-navigate');

      await page.waitForURL('**/combobox-city-search-preselected', { timeout: 5_000 });
      await waitForCombobox(page);

      const display = page.locator('[data-testid="selected-value"]');
      await expect(display).toContainText(PRESELECTED_VALUE);
    });

    // Control: direct navigation should always work correctly
    test('value equals preselected value on direct navigation (control)', async ({ page }) => {
      await page.goto('/combobox-city-search-preselected');
      await waitForCombobox(page);

      const result = await page.locator('auro-combobox').evaluate((el: any) => ({
        value: el.value,
        dropdownOpen: el.dropdownOpen,
      }));

      expect(result.value, 'combobox.value should equal the preselected value').toBe(PRESELECTED_VALUE);
      expect(result.dropdownOpen, 'bib should not open on direct navigation').toBe(false);
    });
  });
}

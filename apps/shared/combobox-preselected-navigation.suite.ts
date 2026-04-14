import { test, expect, type Page } from '@playwright/test';

const PRESELECTED_VALUE = 'SFO';

const PREVIOUS_SEARCH_PARAMS_PAYLOAD = {
  criteria: {
    tripType: 'RoundTrip',
    cities: [{ origin: 'SEA', destination: PRESELECTED_VALUE, includeNearby: [false, false] }],
    dates: ['2026-06-09T04:00:00.000Z', '2026-06-10T04:00:00.000Z'],
    passengers: { adults: 1, children: 0, infants: 0 },
    upgrade: 'None',
    specialFare: 'NotSelected',
    datesAreFlexible: false,
    points: false,
    onlySpecialFares: false,
  },
  expiration: 4102444800000,
};

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

async function getComboboxState(page: Page) {
  return page.locator('auro-combobox').evaluate((el: any) => {
    return {
      value: el.value,
      dropdownOpen: el.dropdownOpen,
    };
  });
}

async function seedPreviousSearchParams(page: Page) {
  await page.addInitScript((payload) => {
    window.localStorage.setItem('previousSearchParams', JSON.stringify(payload));
    window.localStorage.removeItem('previousSearchParams_AFB');
  }, PREVIOUS_SEARCH_PARAMS_PAYLOAD);
}

async function waitForPreselectedPath(page: Page) {
  await page.waitForFunction(
    () => window.location.pathname.endsWith('/combobox-city-search-preselected'),
    { timeout: 10_000 },
  );
}

export function comboboxPreselectedNavigationSuite(framework: string) {
  test.describe(`auro-combobox preselected value after SPA navigation in ${framework}`, () => {
    test('value equals preselected value after SPA navigation from homepage', async ({ page }) => {
      await page.goto('/combobox-city-search-preselected-navigate');

      // Wait for SPA route transition without relying on a page load event.
      await waitForPreselectedPath(page);

      await waitForCombobox(page);

      const result = await getComboboxState(page);

      expect(result.value, 'combobox.value should equal the preselected value').toBe(PRESELECTED_VALUE);
      expect(result.dropdownOpen, 'menu should not open on its own after navigation').toBe(false);
    });

    test('selected-value display reflects preselected value after SPA navigation', async ({ page }) => {
      await page.goto('/combobox-city-search-preselected-navigate');

      await waitForPreselectedPath(page);
      await waitForCombobox(page);

      const display = page.locator('[data-testid="selected-value"]');
      await expect(display).toContainText(PRESELECTED_VALUE);
    });

    test('hydrates destination from previousSearchParams after SPA navigation and refresh', async ({ page }) => {
      await seedPreviousSearchParams(page);

      await page.goto('/combobox-city-search-preselected-navigate');
      await waitForPreselectedPath(page);
      await waitForCombobox(page);

      let result = await getComboboxState(page);
      expect(result.value, 'combobox.value should hydrate destination from local storage').toBe(PRESELECTED_VALUE);
      expect(result.dropdownOpen, 'menu should remain closed after storage hydration').toBe(false);

      await page.reload();
      await waitForCombobox(page);

      result = await getComboboxState(page);
      expect(result.value, 'combobox.value should remain hydrated after refresh').toBe(PRESELECTED_VALUE);
      expect(result.dropdownOpen, 'menu should remain closed after refresh with storage').toBe(false);
    });

    // Control: direct navigation should always work correctly
    test('value equals preselected value on direct navigation (control)', async ({ page }) => {
      await page.goto('/combobox-city-search-preselected');
      await waitForCombobox(page);

      const result = await getComboboxState(page);

      expect(result.value, 'combobox.value should equal the preselected value').toBe(PRESELECTED_VALUE);
      expect(result.dropdownOpen, 'menu should not open on direct navigation').toBe(false);
    });
  });
}

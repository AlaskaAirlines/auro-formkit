import { test, expect, type Page } from '@playwright/test';

/** Poll until auro-select.value matches the expected value or we time out. */
async function waitForSelectValue(page: Page, expected: string, timeout = 5000) {
  await page.waitForFunction(
    ([selector, val]) =>
      (document.querySelector(selector as string) as any)?.value === val,
    ['auro-select', expected],
    { timeout },
  );
}

interface SuiteOptions {
  /** Route of the auto-navigate page (e.g. '/select-remount-navigate'). */
  navigateRoute: string;
  /** Destination route the auto-navigate page redirects to (e.g. '/select-remount'). */
  targetRoute: string;
  initialValue: string;
  multiselect?: boolean;
}

export function selectPreselectedNavigationSuite(framework: string, options: SuiteOptions) {
  const { navigateRoute, targetRoute, initialValue, multiselect = false } = options;
  const label = multiselect
    ? `auro-select (multiselect) preselected value after SPA navigation in ${framework}`
    : `auro-select preselected value after SPA navigation in ${framework}`;

  test.describe(label, () => {
    test('value equals preselected value after SPA navigation', async ({ page }) => {
      await page.goto(navigateRoute);

      await page.waitForURL(`**${targetRoute}`, { timeout: 5_000 });
      await page.waitForFunction(
        () => customElements.get('auro-select') !== undefined,
        { timeout: 10_000 },
      );

      await waitForSelectValue(page, initialValue);

      const value = await page.locator('auro-select').evaluate((el: any) => el.value);
      expect(value, 'auro-select.value should equal the preselected value').toBe(initialValue);

      if (multiselect) {
        const parsed = JSON.parse(value);
        expect(Array.isArray(parsed)).toBe(true);
        expect(parsed.length).toBeGreaterThan(0);
      }
    });

    // Control: direct navigation should always work correctly
    test('value equals preselected value on direct navigation (control)', async ({ page }) => {
      await page.goto(targetRoute);
      await page.waitForFunction(
        () => customElements.get('auro-select') !== undefined,
        { timeout: 10_000 },
      );

      await waitForSelectValue(page, initialValue);

      const value = await page.locator('auro-select').evaluate((el: any) => el.value);
      expect(value, 'auro-select.value should equal the preselected value').toBe(initialValue);
    });
  });
}

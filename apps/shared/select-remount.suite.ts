import { test, expect, type Page } from '@playwright/test';

/** Poll until auro-select.value matches the expected value or we time out. */
async function waitForSelectValue(page: Page, expected: string, timeout = 3000) {
  await page.waitForFunction(
    ([selector, val]) =>
      (document.querySelector(selector as string) as any)?.value === val,
    ['auro-select', expected],
    { timeout },
  );
}

interface SuiteOptions {
  route: string;
  initialValue: string;
  /** When true, asserts the value is a JSON array and checks each item. */
  multiselect?: boolean;
}

function assertValueSurfaces(page: Page, expectedValue: string) {
  return page.locator('auro-select').evaluate((el: any, val: string) => {
    return { value: el.value, attr: el.getAttribute('value'), match: el.value === val && el.getAttribute('value') === val };
  }, expectedValue);
}

export function selectRemountSuite(framework: string, options?: SuiteOptions) {
  // Default to the original single-select scenario so existing callers are unchanged
  const { route, initialValue, multiselect } = options ?? {
    route: '/select-remount',
    initialValue: 'bar',
    multiselect: false,
  };

  const label = multiselect ? `auro-select (multiselect) in ${framework}` : `auro-select in ${framework}`;

  test.describe(label, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(route);
      await page.waitForFunction(() => customElements.get('auro-select') !== undefined, { timeout: 10_000 });
    });

    test('initial value is set on first render', async ({ page }) => {
      await waitForSelectValue(page, initialValue);
      const { value, attr } = await assertValueSurfaces(page, initialValue);
      expect(value).toBe(initialValue);
      expect(attr).toBe(initialValue);

      if (multiselect) {
        const parsed = JSON.parse(value);
        expect(Array.isArray(parsed)).toBe(true);
        expect(parsed.length).toBeGreaterThan(0);
      }
    });

    test('value is restored after DOM remount', async ({ page }) => {
      await waitForSelectValue(page, initialValue);

      // Unmount
      await page.locator('#toggle').click();
      await page.waitForSelector('auro-select', { state: 'detached' });

      // Remount
      await page.locator('#toggle').click();
      await page.waitForSelector('auro-select', { state: 'attached' });

      await waitForSelectValue(page, initialValue);
      const { value, attr } = await assertValueSurfaces(page, initialValue);
      expect(value).toBe(initialValue);
      expect(attr).toBe(initialValue);

      if (multiselect) {
        const parsed = JSON.parse(value);
        expect(Array.isArray(parsed)).toBe(true);
        expect(parsed.length).toBeGreaterThan(0);
      }
    });
  });
}

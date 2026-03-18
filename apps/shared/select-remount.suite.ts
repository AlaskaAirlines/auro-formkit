import { test, expect, type Page } from '@playwright/test';

const INITIAL_VALUE = 'bar';

/** Poll until auro-select.value matches the expected value or we time out. */
async function waitForSelectValue(page: Page, expected: string, timeout = 3000) {
  await page.waitForFunction(
    ([selector, val]) =>
      (document.querySelector(selector as string) as any)?.value === val,
    ['auro-select', expected],
    { timeout },
  );
}

export function selectRemountSuite(framework: string) {
  test.describe(`auro-select in ${framework}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/select-remount');
      // Wait for the custom element registry to have auro-select defined
      await page.waitForFunction(() => customElements.get('auro-select') !== undefined, { timeout: 10_000 });
    });

    test('initial value is set on first render', async ({ page }) => {
      await waitForSelectValue(page, INITIAL_VALUE);
      const value = await page.locator('auro-select').evaluate((el: any) => el.value);
      const valueAttr = await page.locator('auro-select').evaluate((el: any) => el.getAttribute('value'));
      expect(value).toBe(INITIAL_VALUE);
      expect(valueAttr).toBe(INITIAL_VALUE);
    });

    test('value is restored after DOM remount', async ({ page }) => {
      await waitForSelectValue(page, INITIAL_VALUE);

      // Unmount
      await page.locator('#toggle').click();
      await page.waitForSelector('auro-select', { state: 'detached' });

      // Remount
      await page.locator('#toggle').click();
      await page.waitForSelector('auro-select', { state: 'attached' });

      await waitForSelectValue(page, INITIAL_VALUE);
      const value = await page.locator('auro-select').evaluate((el: any) => el.value);
      const valueAttr = await page.locator('auro-select').evaluate((el: any) => el.getAttribute('value'));
      expect(value).toBe(INITIAL_VALUE);
      expect(valueAttr).toBe(INITIAL_VALUE);
    });
  });
}

import { test, expect, type Page } from './coverage-fixture';

/** Poll until auro-combobox.value matches the expected value or we time out. */
async function waitForComboboxValue(page: Page, expected: string, timeout = 3000) {
  await page.waitForFunction(
    ([selector, val]) =>
      (document.querySelector(selector as string) as any)?.value === val,
    ['auro-combobox', expected],
    { timeout },
  );
}

function assertValue(page: Page, expectedValue: string) {
  return page.locator('auro-combobox').evaluate((el: any, val: string) => {
    return { value: el.value, match: el.value === val };
  }, expectedValue);
}

interface SuiteOptions {
  route: string;
  initialValue: string;
}

export function comboboxRemountSuite(framework: string, options?: SuiteOptions) {
  const { route, initialValue } = options ?? {
    route: '/combobox-remount',
    initialValue: 'Apples',
  };

  const label = `auro-combobox in ${framework}`;

  test.describe(label, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(route);
      await page.waitForFunction(() => customElements.get('auro-combobox') !== undefined, { timeout: 10_000 });
    });

    test('initial value is set on first render', async ({ page }) => {
      await waitForComboboxValue(page, initialValue);
      const { value } = await assertValue(page, initialValue);
      expect(value).toBe(initialValue);
    });

    test('value is restored after DOM remount', async ({ page }) => {
      await waitForComboboxValue(page, initialValue);

      // Unmount
      await page.locator('#toggle').click();
      await page.waitForSelector('auro-combobox', { state: 'detached' });

      // Remount
      await page.locator('#toggle').click();
      await page.waitForSelector('auro-combobox', { state: 'attached' });

      await waitForComboboxValue(page, initialValue);
      const { value } = await assertValue(page, initialValue);
      expect(value).toBe(initialValue);
    });

    test('setting an invalid value clears the selection', async ({ page }) => {
      await waitForComboboxValue(page, initialValue);

      await page.locator('#set-invalid').click();

      // Wait for value to be cleared
      await page.waitForFunction(
        () => (document.querySelector('auro-combobox') as any)?.value === undefined,
        { timeout: 3000 },
      );

      const result = await page.locator('auro-combobox').evaluate((el: any) => ({
        value: el.value,
        optionSelected: el.optionSelected,
      }));

      expect(result.value).toBeUndefined();
      expect(result.optionSelected).toBeUndefined();
    });

    test('double-clicking set-invalid keeps value cleared', async ({ page }) => {
      await waitForComboboxValue(page, initialValue);

      // First click - confirm the invalid value is cleared
      await page.locator('#set-invalid').click();
      await page.waitForFunction(
        () => (document.querySelector('auro-combobox') as any)?.value === undefined,
        { timeout: 3000 },
      );

      // Second click - ensure the assignment takes effect before polling for cleared state
      await page.locator('#set-invalid').click();
      await page.locator('auro-combobox').evaluate(async (el: any) => {
        await el.updateComplete;
      });
      await page.waitForFunction(
        () => (document.querySelector('auro-combobox') as any)?.value === undefined,
        { timeout: 3000 },
      );

      const result = await page.locator('auro-combobox').evaluate((el: any) => ({
        value: el.value,
        optionSelected: el.optionSelected,
      }));

      expect(result.value).toBeUndefined();
      expect(result.optionSelected).toBeUndefined();
    });
  });
}

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

    // Preserve contract: setting an unmatched programmatic value keeps the
    // freeform value on the combobox while clearing menu.value/optionSelected.
    // Matches the WTR "should clear menu.optionSelected when value is set to
    // an unmatched string" regression test.
    test('setting an invalid value clears menu selection but preserves the value', async ({ page }) => {
      await waitForComboboxValue(page, initialValue);

      await page.locator('#set-invalid').click();

      // Wait for the menu selection to clear.
      await page.waitForFunction(
        () => {
          const el = document.querySelector('auro-combobox') as any;
          return el?.menu?.value === undefined && el?.menu?.optionSelected === undefined;
        },
        { timeout: 3000 },
      );

      const result = await page.locator('auro-combobox').evaluate((el: any) => ({
        value: el.value,
        menuValue: el.menu?.value,
        menuOptionSelected: el.menu?.optionSelected,
      }));

      expect(result.value).toBe('invalid-option');
      expect(result.menuValue).toBeUndefined();
      expect(result.menuOptionSelected).toBeUndefined();
    });

    test('double-clicking set-invalid keeps the freeform value pinned', async ({ page }) => {
      await waitForComboboxValue(page, initialValue);

      // First click - confirm the menu state clears to the unmatched value.
      await page.locator('#set-invalid').click();
      await page.waitForFunction(
        () => {
          const el = document.querySelector('auro-combobox') as any;
          return el?.value === 'invalid-option' && el?.menu?.optionSelected === undefined;
        },
        { timeout: 3000 },
      );

      // Second click - re-assert the same value; state must remain identical.
      await page.locator('#set-invalid').click();
      await page.locator('auro-combobox').evaluate(async (el: any) => {
        await el.updateComplete;
      });
      await page.waitForFunction(
        () => {
          const el = document.querySelector('auro-combobox') as any;
          return el?.value === 'invalid-option' && el?.menu?.optionSelected === undefined;
        },
        { timeout: 3000 },
      );

      const result = await page.locator('auro-combobox').evaluate((el: any) => ({
        value: el.value,
        menuValue: el.menu?.value,
        menuOptionSelected: el.menu?.optionSelected,
      }));

      expect(result.value).toBe('invalid-option');
      expect(result.menuValue).toBeUndefined();
      expect(result.menuOptionSelected).toBeUndefined();
    });
  });
}

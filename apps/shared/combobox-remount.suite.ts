import { test, expect, type Page } from '@playwright/test';

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

      // Second click - value should still be cleared
      await page.locator('#set-invalid').click();
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

    test('no uncaught errors on initial mount', async ({ page }) => {
      const pageErrors: string[] = [];
      page.on('pageerror', (err) => pageErrors.push(err.message));

      await page.goto(route);
      await page.waitForFunction(() => customElements.get('auro-combobox') !== undefined, { timeout: 10_000 });
      await waitForComboboxValue(page, initialValue);

      const componentErrors = pageErrors.filter(
        (msg) =>
          msg.includes('selectOption') ||
          msg.includes('deselectOption') ||
          msg.includes("reading '0'") ||
          msg.includes('null'),
      );
      expect(componentErrors, `Expected no component errors on mount, got: ${componentErrors.join('; ')}`).toEqual([]);
    });

    test('no uncaught errors after DOM remount', async ({ page }) => {
      const pageErrors: string[] = [];
      page.on('pageerror', (err) => pageErrors.push(err.message));

      await page.goto(route);
      await page.waitForFunction(() => customElements.get('auro-combobox') !== undefined, { timeout: 10_000 });
      await waitForComboboxValue(page, initialValue);

      pageErrors.length = 0;

      // Unmount
      await page.locator('#toggle').click();
      await page.waitForSelector('auro-combobox', { state: 'detached' });

      // Remount
      await page.locator('#toggle').click();
      await page.waitForSelector('auro-combobox', { state: 'attached' });
      await waitForComboboxValue(page, initialValue);

      const componentErrors = pageErrors.filter(
        (msg) =>
          msg.includes('selectOption') ||
          msg.includes('deselectOption') ||
          msg.includes("reading '0'") ||
          msg.includes('null'),
      );
      expect(componentErrors, `Expected no component errors on remount, got: ${componentErrors.join('; ')}`).toEqual([]);
    });

    test('no TypeError when selected changes before menu context is delivered', async ({ page }) => {
      // Reproduces the timing race where auro-menuoption.updated() fires with
      // a selected change before ContextConsumer delivers the menuService.
      // Expected error: TypeError: Cannot read properties of null (reading 'selectOption')
      const pageErrors: string[] = [];
      page.on('pageerror', (err) => pageErrors.push(err.message));

      await page.goto(route);
      await page.waitForFunction(() => customElements.get('auro-combobox') !== undefined, { timeout: 10_000 });
      await waitForComboboxValue(page, initialValue);

      // Force the race: null out menuService then change selected.
      await page.evaluate(() => {
        const option = document.querySelector('auro-menuoption') as any;
        option.menuService = null;
        option.selected = !option.selected;
      });

      await page.waitForTimeout(500);

      const componentErrors = pageErrors.filter(
        (msg) =>
          msg.includes('selectOption') ||
          msg.includes('deselectOption') ||
          msg.includes('null'),
      );
      expect(
        componentErrors,
        `Expected no errors when selected changes before context delivery, got: ${componentErrors.join('; ')}`,
      ).toEqual([]);
    });

    test('no TypeError when menu valueChange event has undefined options', async ({ page }) => {
      // Reproduces the error where auro-menu.handleMenuChange accesses
      // event.options[0] without guarding for undefined options.
      // Expected error: TypeError: Cannot read properties of undefined (reading '0')
      const pageErrors: string[] = [];
      page.on('pageerror', (err) => pageErrors.push(err.message));

      await page.goto(route);
      await page.waitForFunction(() => customElements.get('auro-combobox') !== undefined, { timeout: 10_000 });
      await waitForComboboxValue(page, initialValue);

      // Wrapped in setTimeout so the throw becomes an uncaught page error
      // (captured by the pageerror listener) instead of rejecting page.evaluate.
      await page.evaluate(() => {
        const menu = document.querySelector('auro-menu') as any;
        setTimeout(() => {
          menu.handleMenuChange({
            type: 'valueChange',
            value: undefined,
            stringValue: undefined,
            keys: undefined,
            options: undefined,
          });
        }, 0);
      });

      await page.waitForTimeout(500);

      const componentErrors = pageErrors.filter(
        (msg) =>
          msg.includes("reading '0'") ||
          msg.includes("reading 'length'") ||
          msg.includes('undefined'),
      );
      expect(
        componentErrors,
        `Expected no errors when valueChange has undefined options, got: ${componentErrors.join('; ')}`,
      ).toEqual([]);
    });
  });
}

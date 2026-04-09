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

    if (multiselect) {
      test('setting an invalid value clears the selection', async ({ page }) => {
        await waitForSelectValue(page, initialValue);

        await page.locator('#set-invalid').click();

        // Wait for value to be cleared
        await page.waitForFunction(
          () => (document.querySelector('auro-select') as any)?.value === undefined,
          { timeout: 3000 },
        );

        const result = await page.locator('auro-select').evaluate((el: any) => ({
          value: el.value,
          optionSelectedLength: Array.isArray(el.optionSelected) ? el.optionSelected.length : -1,
        }));

        expect(result.value).toBeUndefined();
        expect(result.optionSelectedLength).toBe(0);
      });

      test('double-clicking set-invalid keeps value cleared', async ({ page }) => {
        await waitForSelectValue(page, initialValue);

        // First click - confirm the invalid value is cleared
        await page.locator('#set-invalid').click();
        await page.waitForFunction(
          () => (document.querySelector('auro-select') as any)?.value === undefined,
          { timeout: 3000 },
        );

        // Second click - value should still be cleared (bug: it was set to the invalid value)
        await page.locator('#set-invalid').click();
        await page.waitForFunction(
          () => (document.querySelector('auro-select') as any)?.value === undefined,
          { timeout: 3000 },
        );

        const result = await page.locator('auro-select').evaluate((el: any) => ({
          value: el.value,
          optionSelectedLength: Array.isArray(el.optionSelected) ? el.optionSelected.length : -1,
        }));

        expect(result.value).toBeUndefined();
        expect(result.optionSelectedLength).toBe(0);
      });
    }

    if (!multiselect) {
      test('setting an invalid value clears the selection', async ({ page }) => {
        await waitForSelectValue(page, initialValue);

        await page.locator('#set-invalid').click();

        // Wait for value to be cleared
        await page.waitForFunction(
          () => (document.querySelector('auro-select') as any)?.value === undefined,
          { timeout: 3000 },
        );

        const result = await page.locator('auro-select').evaluate((el: any) => ({
          value: el.value,
          optionSelected: el.optionSelected,
        }));

        expect(result.value).toBeUndefined();
        expect(result.optionSelected).toBeUndefined();
      });

      test('double-clicking set-invalid keeps value cleared', async ({ page }) => {
        await waitForSelectValue(page, initialValue);

        // First click - confirm the invalid value is cleared
        await page.locator('#set-invalid').click();
        await page.waitForFunction(
          () => (document.querySelector('auro-select') as any)?.value === undefined,
          { timeout: 3000 },
        );

        // Second click - value should still be cleared (bug: it was set to the invalid value)
        await page.locator('#set-invalid').click();
        await page.waitForFunction(
          () => (document.querySelector('auro-select') as any)?.value === undefined,
          { timeout: 3000 },
        );

        const result = await page.locator('auro-select').evaluate((el: any) => ({
          value: el.value,
          optionSelected: el.optionSelected,
        }));

        expect(result.value).toBeUndefined();
        expect(result.optionSelected).toBeUndefined();
      });
    }

    test('no uncaught errors on initial mount', async ({ page }) => {
      const pageErrors: string[] = [];
      page.on('pageerror', (err) => pageErrors.push(err.message));

      await page.goto(route);
      await page.waitForFunction(() => customElements.get('auro-select') !== undefined, { timeout: 10_000 });
      await waitForSelectValue(page, initialValue);

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
      await page.waitForFunction(() => customElements.get('auro-select') !== undefined, { timeout: 10_000 });
      await waitForSelectValue(page, initialValue);

      // Clear errors from initial load so we only check remount errors
      pageErrors.length = 0;

      // Unmount
      await page.locator('#toggle').click();
      await page.waitForSelector('auro-select', { state: 'detached' });

      // Remount
      await page.locator('#toggle').click();
      await page.waitForSelector('auro-select', { state: 'attached' });
      await waitForSelectValue(page, initialValue);

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
      // In production, framework remount can drive this race; here we force it
      // by nulling menuService then toggling selected on a live element.
      // Expected error: TypeError: Cannot read properties of null (reading 'selectOption')
      const pageErrors: string[] = [];
      page.on('pageerror', (err) => pageErrors.push(err.message));

      await page.goto(route);
      await page.waitForFunction(() => customElements.get('auro-select') !== undefined, { timeout: 10_000 });
      await waitForSelectValue(page, initialValue);

      // Force the race: null out menuService then change selected.
      // Lit batches both property changes into one update cycle, so updated()
      // sees changedProperties.has('selected') while this.menuService is null.
      await page.evaluate(() => {
        const option = document.querySelector('auro-menuoption') as any;
        option.menuService = null;
        option.selected = !option.selected;
      });

      // Wait for Lit microtask update to flush
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
      await page.waitForFunction(() => customElements.get('auro-select') !== undefined, { timeout: 10_000 });
      await waitForSelectValue(page, initialValue);

      // Force the error: deliver a valueChange notification through the menu
      // service with undefined options, simulating the event shape that occurs
      // during mount-order races in production.
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

      // Wait for update to flush
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

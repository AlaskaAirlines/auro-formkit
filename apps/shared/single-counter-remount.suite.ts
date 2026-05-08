import { test, expect, type Page } from './coverage-fixture';

const DEFAULT_INITIAL_VALUE = 3;

/** Poll until the standalone auro-counter's value matches or we time out. */
async function waitForCounterValue(page: Page, expected: number, timeout = 3000) {
  await page.waitForFunction(
    (val: number) => (document.querySelector('auro-counter') as any)?.value === val,
    expected,
    { timeout },
  );
}

interface SuiteOptions {
  route: string;
  initialValue: number;
}

export function singleCounterRemountSuite(framework: string, options?: SuiteOptions) {
  const { route, initialValue } = options ?? {
    route: '/single-counter-remount',
    initialValue: DEFAULT_INITIAL_VALUE,
  };

  test.describe(`auro-counter (single, remount) in ${framework}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(route);
      await page.waitForFunction(
        () => customElements.get('auro-counter') !== undefined,
        { timeout: 10_000 },
      );
    });

    test('initial value is set on first render', async ({ page }) => {
      await waitForCounterValue(page, initialValue);
      const value = await page.locator('auro-counter').evaluate((el: any) => el.value);
      expect(value).toBe(initialValue);
    });

    test('value is restored after DOM remount', async ({ page }) => {
      await waitForCounterValue(page, initialValue);

      // Unmount
      await page.locator('#toggle').click();
      await page.waitForSelector('auro-counter', { state: 'detached' });

      // Remount
      await page.locator('#toggle').click();
      await page.waitForSelector('auro-counter', { state: 'attached' });

      await waitForCounterValue(page, initialValue);
      const value = await page.locator('auro-counter').evaluate((el: any) => el.value);
      expect(value).toBe(initialValue);
    });
  });
}

import { test, expect, type Page } from '@playwright/test';

// --- Counter-group ---

const DEFAULT_GROUP_VALUES: Record<string, number> = {
  adults: 2,
  children: 1,
  infants: 0,
};

async function waitForGroupValue(
  page: Page,
  expected: Record<string, number>,
  timeout = 5000,
) {
  await page.waitForFunction(
    (exp: Record<string, number>) => {
      const group = document.querySelector('auro-counter-group') as any;
      if (!group?.value) return false;
      return Object.entries(exp).every(([key, val]) => group.value[key] === val);
    },
    expected,
    { timeout },
  );
}

interface GroupSuiteOptions {
  navigateRoute: string;
  targetRoute: string;
  initialValues: Record<string, number>;
}

export function counterGroupPreselectedNavigationSuite(
  framework: string,
  options: GroupSuiteOptions,
) {
  const { navigateRoute, targetRoute, initialValues } = options;

  test.describe(`auro-counter-group preselected values after SPA navigation in ${framework}`, () => {
    test('values equal preselected values after SPA navigation', async ({ page }) => {
      await page.goto(navigateRoute);

      await page.waitForURL(`**${targetRoute}`, { timeout: 5_000 });
      await page.waitForFunction(
        () => customElements.get('auro-counter-group') !== undefined,
        { timeout: 10_000 },
      );

      await waitForGroupValue(page, initialValues);

      const groupValue = await page.locator('auro-counter-group').evaluate((el: any) => el.value);
      expect(groupValue, 'auro-counter-group.value should match preselected values').toMatchObject(initialValues);
    });

    // Control: direct navigation should always work correctly
    test('values equal preselected values on direct navigation (control)', async ({ page }) => {
      await page.goto(targetRoute);
      await page.waitForFunction(
        () => customElements.get('auro-counter-group') !== undefined,
        { timeout: 10_000 },
      );

      await waitForGroupValue(page, initialValues);

      const groupValue = await page.locator('auro-counter-group').evaluate((el: any) => el.value);
      expect(groupValue, 'auro-counter-group.value should match preselected values').toMatchObject(initialValues);
    });
  });
}

// --- Single counter ---

async function waitForCounterValue(page: Page, expected: number, timeout = 5000) {
  await page.waitForFunction(
    (val: number) => (document.querySelector('auro-counter') as any)?.value === val,
    expected,
    { timeout },
  );
}

interface SingleCounterSuiteOptions {
  navigateRoute: string;
  targetRoute: string;
  initialValue: number;
}

export function singleCounterPreselectedNavigationSuite(
  framework: string,
  options: SingleCounterSuiteOptions,
) {
  const { navigateRoute, targetRoute, initialValue } = options;

  test.describe(`auro-counter (single) preselected value after SPA navigation in ${framework}`, () => {
    test('value equals preselected value after SPA navigation', async ({ page }) => {
      await page.goto(navigateRoute);

      await page.waitForURL(`**${targetRoute}`, { timeout: 5_000 });
      await page.waitForFunction(
        () => customElements.get('auro-counter') !== undefined,
        { timeout: 10_000 },
      );

      await waitForCounterValue(page, initialValue);

      const value = await page.locator('auro-counter').evaluate((el: any) => el.value);
      expect(value, 'auro-counter.value should equal the preselected value').toBe(initialValue);
    });

    // Control: direct navigation should always work correctly
    test('value equals preselected value on direct navigation (control)', async ({ page }) => {
      await page.goto(targetRoute);
      await page.waitForFunction(
        () => customElements.get('auro-counter') !== undefined,
        { timeout: 10_000 },
      );

      await waitForCounterValue(page, initialValue);

      const value = await page.locator('auro-counter').evaluate((el: any) => el.value);
      expect(value, 'auro-counter.value should equal the preselected value').toBe(initialValue);
    });
  });
}

export { DEFAULT_GROUP_VALUES };

import { test, expect, type Page } from './coverage-fixture';

/** Named initial values — keys match the `name` attributes on each auro-counter. */
const DEFAULT_INITIAL_VALUES: Record<string, number> = {
  adults: 2,
  children: 1,
  infants: 0,
};

/**
 * Poll until the auro-counter-group's computed `value` object matches the
 * expected map and every named counter's individual `value` also matches.
 */
async function waitForGroupValue(
  page: Page,
  expected: Record<string, number>,
  timeout = 3000,
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

interface SuiteOptions {
  route: string;
  initialValues: Record<string, number>;
}

export function counterRemountSuite(framework: string, options?: SuiteOptions) {
  const { route, initialValues } = options ?? {
    route: '/counter-remount',
    initialValues: DEFAULT_INITIAL_VALUES,
  };

  test.describe(`auro-counter-group (remount) in ${framework}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(route);
      // Wait for all framework JS (including SvelteKit's dynamic page imports) to
      // finish executing before interacting with the page. Without this, the onclick
      // handler on #toggle may not yet be attached on slower CI machines (Node 20),
      // causing waitForSelector('detached') to time out.
      await page.waitForLoadState('networkidle');
      await page.waitForFunction(
        () => customElements.get('auro-counter-group') !== undefined,
        { timeout: 10_000 },
      );
    });

    test('initial values are set on first render', async ({ page }) => {
      await waitForGroupValue(page, initialValues);

      // Verify group-level computed value object
      const groupValue = await page.locator('auro-counter-group').evaluate((el: any) => el.value);
      expect(groupValue).toMatchObject(initialValues);

      // Verify each individual counter matches its named entry
      const counterValues = await page.locator('auro-counter').evaluateAll(
        (els: any[]) => Object.fromEntries(els.map((el) => [el.getAttribute('name'), el.value])),
      );
      expect(counterValues).toMatchObject(initialValues);
    });

    test('values are restored after DOM remount', async ({ page }) => {
      await waitForGroupValue(page, initialValues);

      // Unmount
      await page.locator('#toggle').click();
      await page.waitForSelector('auro-counter-group', { state: 'detached' });

      // Remount
      await page.locator('#toggle').click();
      await page.waitForSelector('auro-counter-group', { state: 'attached' });

      // Wait for the custom element to finish upgrading after remount before
      // polling for values — mirrors the beforeEach guard on first render.
      await page.waitForFunction(
        () => {
          const group = document.querySelector('auro-counter-group') as any;
          return group != null && typeof group.value === 'object' && group.value !== null;
        },
        { timeout: 10_000 },
      );

      await waitForGroupValue(page, initialValues);

      // Verify group-level computed value object is restored
      const groupValue = await page.locator('auro-counter-group').evaluate((el: any) => el.value);
      expect(groupValue).toMatchObject(initialValues);

      const counterValues = await page.locator('auro-counter').evaluateAll(
        (els: any[]) => Object.fromEntries(els.map((el) => [el.getAttribute('name'), el.value])),
      );
      expect(counterValues).toMatchObject(initialValues);
    });
  });
}

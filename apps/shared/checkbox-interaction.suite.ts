import { test, expect, type Page, type Locator } from '@playwright/test';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Wait for auro-checkbox custom element to be fully registered. */
async function waitForCheckbox(page: Page) {
  await page.waitForFunction(
    () => customElements.get('auro-checkbox') !== undefined,
    { timeout: 10_000 },
  );
}

/** Return the checkbox element scoped to a data-testid section. */
function checkbox(page: Page, fixture: string, nth = 0): Locator {
  return page.locator(`[data-testid="${fixture}"] auro-checkbox`).nth(nth);
}

/** Return the checkbox-group element scoped to a data-testid section. */
function checkboxGroup(page: Page, fixture: string): Locator {
  return page.locator(`[data-testid="${fixture}"] auro-checkbox-group`);
}

/** Get the checked state of a checkbox. */
function isChecked(page: Page, fixture: string, nth = 0) {
  return checkbox(page, fixture, nth).evaluate((el: any) => el.checked);
}

/** Focus a checkbox element. */
async function focusCheckbox(page: Page, fixture: string, nth = 0) {
  await checkbox(page, fixture, nth).evaluate((el: any) => el.focus());
}

// ─── Suite ────────────────────────────────────────────────────────────────────

export function checkboxInteractionSuite(framework: string) {
  const label = `auro-checkbox interaction in ${framework}`;

  test.describe(`${label} — single checkbox`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/checkbox-interaction');
      await waitForCheckbox(page);
    });

    test.describe('Mouse interaction', () => {
      test('clicking a checkbox checks it', async ({ page }) => {
        expect(await isChecked(page, 'default')).toBe(false);
        await checkbox(page, 'default').click();
        await expect.poll(() => isChecked(page, 'default')).toBe(true);
      });

      test('clicking a checked checkbox unchecks it', async ({ page }) => {
        await checkbox(page, 'default').click();
        await expect.poll(() => isChecked(page, 'default')).toBe(true);

        await checkbox(page, 'default').click();
        await expect.poll(() => isChecked(page, 'default')).toBe(false);
      });

      test('clicking a disabled checkbox does not toggle it', async ({ page }) => {
        expect(await isChecked(page, 'disabled')).toBe(false);
        await checkbox(page, 'disabled').click({ force: true });
        // Small wait to ensure no async toggle
        await page.waitForTimeout(100);
        expect(await isChecked(page, 'disabled')).toBe(false);
      });

      test('clicking a pre-checked checkbox unchecks it', async ({ page }) => {
        expect(await isChecked(page, 'checked')).toBe(true);
        await checkbox(page, 'checked').click();
        await expect.poll(() => isChecked(page, 'checked')).toBe(false);
      });
    });

    test.describe('Keyboard interaction', () => {
      test('Space toggles the checkbox on', async ({ page }) => {
        await focusCheckbox(page, 'default');
        expect(await isChecked(page, 'default')).toBe(false);
        await page.keyboard.press('Space');
        await expect.poll(() => isChecked(page, 'default')).toBe(true);
      });

      test('Space toggles the checkbox off', async ({ page }) => {
        await focusCheckbox(page, 'default');
        await page.keyboard.press('Space');
        await expect.poll(() => isChecked(page, 'default')).toBe(true);

        await page.keyboard.press('Space');
        await expect.poll(() => isChecked(page, 'default')).toBe(false);
      });

      test('Space on a disabled checkbox does not toggle it', async ({ page }) => {
        await focusCheckbox(page, 'disabled');
        expect(await isChecked(page, 'disabled')).toBe(false);
        await page.keyboard.press('Space');
        // Small wait to ensure no async toggle
        await page.waitForTimeout(100);
        expect(await isChecked(page, 'disabled')).toBe(false);
      });
    });

    test.describe('ARIA attributes', () => {
      test('aria-checked reflects the checked state', async ({ page }) => {
        const ariaChecked = () =>
          checkbox(page, 'default').evaluate((el: any) => el.getAttribute('aria-checked'));

        expect(await ariaChecked()).toBe('false');

        await checkbox(page, 'default').click();
        await expect.poll(ariaChecked).toBe('true');

        await checkbox(page, 'default').click();
        await expect.poll(ariaChecked).toBe('false');
      });

      test('aria-disabled is set on disabled checkbox', async ({ page }) => {
        const ariaDisabled = await checkbox(page, 'disabled').evaluate((el: any) =>
          el.getAttribute('aria-disabled'),
        );
        expect(ariaDisabled).toBe('true');
      });

      test('checkbox has role="checkbox"', async ({ page }) => {
        const role = await checkbox(page, 'default').evaluate((el: any) =>
          el.getAttribute('role'),
        );
        expect(role).toBe('checkbox');
      });
    });

    test.describe('Events', () => {
      test('fires input event when clicked', async ({ page }) => {
        const received = await checkbox(page, 'default').evaluate((el: any) => {
          return new Promise<boolean>((resolve) => {
            el.addEventListener('input', () => resolve(true), { once: true });
            el.click();
          });
        });
        expect(received).toBe(true);
      });

      test('fires auroCheckbox-input event when clicked', async ({ page }) => {
        const received = await checkbox(page, 'default').evaluate((el: any) => {
          return new Promise<boolean>((resolve) => {
            el.addEventListener('auroCheckbox-input', () => resolve(true), { once: true });
            el.click();
          });
        });
        expect(received).toBe(true);
      });
    });
  });

  test.describe(`${label} — checkbox group`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/checkbox-interaction');
      await waitForCheckbox(page);
    });

    test.describe('Mouse interaction', () => {
      test('clicking multiple checkboxes in a group checks them independently', async ({ page }) => {
        await checkbox(page, 'group', 0).click();
        await checkbox(page, 'group', 1).click();

        await expect.poll(() => isChecked(page, 'group', 0)).toBe(true);
        await expect.poll(() => isChecked(page, 'group', 1)).toBe(true);
        expect(await isChecked(page, 'group', 2)).toBe(false);
      });

      test('unchecking one does not affect others', async ({ page }) => {
        await checkbox(page, 'group', 0).click();
        await checkbox(page, 'group', 1).click();
        await expect.poll(() => isChecked(page, 'group', 0)).toBe(true);
        await expect.poll(() => isChecked(page, 'group', 1)).toBe(true);

        await checkbox(page, 'group', 0).click();
        await expect.poll(() => isChecked(page, 'group', 0)).toBe(false);
        expect(await isChecked(page, 'group', 1)).toBe(true);
      });

      test('clicking a checkbox in a disabled group does not toggle it', async ({ page }) => {
        expect(await isChecked(page, 'disabled-group', 0)).toBe(false);
        await checkbox(page, 'disabled-group', 0).click({ force: true });
        await page.waitForTimeout(100);
        expect(await isChecked(page, 'disabled-group', 0)).toBe(false);
      });
    });

    test.describe('Keyboard interaction', () => {
      test('Tab navigates between checkboxes in a group', async ({ page }) => {
        await focusCheckbox(page, 'group', 0);
        await expect(checkbox(page, 'group', 0)).toBeFocused();

        await page.keyboard.press('Tab');
        await expect(checkbox(page, 'group', 1)).toBeFocused();

        await page.keyboard.press('Tab');
        await expect(checkbox(page, 'group', 2)).toBeFocused();
      });

      test('Space selects a checkbox after Tab navigation', async ({ page }) => {
        await focusCheckbox(page, 'group', 0);
        await page.keyboard.press('Tab');
        await expect(checkbox(page, 'group', 1)).toBeFocused();

        await page.keyboard.press('Space');
        await expect.poll(() => isChecked(page, 'group', 1)).toBe(true);
        // First checkbox should remain unchecked
        expect(await isChecked(page, 'group', 0)).toBe(false);
      });
    });

    test.describe('Validation', () => {
      test('required group shows error when no checkbox is selected after interaction', async ({ page }) => {
        // Check and then uncheck to trigger validation
        await checkbox(page, 'required-group', 0).click();
        await expect.poll(() => isChecked(page, 'required-group', 0)).toBe(true);

        await checkbox(page, 'required-group', 0).click();
        await expect.poll(() => isChecked(page, 'required-group', 0)).toBe(false);

        // Blur away to trigger validation
        await page.click('#outside-element');

        await expect.poll(() =>
          checkboxGroup(page, 'required-group').evaluate((el: any) => el.validity),
        ).toBe('valueMissing');
      });

      test('required group clears error when a checkbox is selected', async ({ page }) => {
        // Trigger validation error first
        await checkbox(page, 'required-group', 0).click();
        await checkbox(page, 'required-group', 0).click();
        await page.click('#outside-element');
        await expect.poll(() =>
          checkboxGroup(page, 'required-group').evaluate((el: any) => el.validity),
        ).toBe('valueMissing');

        // Now check an option to clear the error
        await checkbox(page, 'required-group', 0).click();
        await expect.poll(() =>
          checkboxGroup(page, 'required-group').evaluate((el: any) => el.validity),
        ).not.toBe('valueMissing');
      });
    });
  });
}

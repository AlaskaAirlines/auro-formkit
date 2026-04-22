import { test, expect, type Page, type Locator } from './coverage-fixture';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Wait for auro-radio and auro-radio-group to be registered and shadow DOM rendered. */
async function waitForRadio(page: Page) {
  await page.waitForFunction(
    () =>
      customElements.get('auro-radio') !== undefined &&
      customElements.get('auro-radio-group') !== undefined,
    { timeout: 10_000 },
  );
  // Wait for the first radio's shadow DOM input to be rendered
  await page.waitForFunction(
    () => {
      const el = document.querySelector('auro-radio');
      return el?.shadowRoot?.querySelector('input') !== null;
    },
    { timeout: 10_000 },
  );
}

/** Return the auro-radio-group inside a fixture section. */
function group(page: Page, fixture: string): Locator {
  return page.locator(`[data-testid="${fixture}"] auro-radio-group`);
}

/** Return an auro-radio by value inside a fixture section.
 *  Note: auro-radio's `value` property is not reflected as an attribute,
 *  so we use the `data-value` attribute set on the test page elements. */
function radio(page: Page, fixture: string, value: string): Locator {
  return page.locator(`[data-testid="${fixture}"] auro-radio[data-value="${value}"]`);
}

/** Click an auro-radio by value. */
async function clickRadio(page: Page, fixture: string, value: string) {
  await radio(page, fixture, value).click();
}

/** Get the group's value property. */
function groupValue(page: Page, fixture: string) {
  return group(page, fixture).evaluate((el: any) => el.value);
}

/** Get the group's validity property. */
function groupValidity(page: Page, fixture: string) {
  return group(page, fixture).evaluate((el: any) => el.validity);
}

/** Check if a radio is checked. */
function isChecked(page: Page, fixture: string, value: string) {
  return radio(page, fixture, value).evaluate((el: any) => el.checked);
}

// ─── Suite ────────────────────────────────────────────────────────────────────

export function radioInteractionSuite(framework: string) {
  const label = `auro-radio interaction in ${framework}`;

  test.describe(label, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/radio-interaction');
      await waitForRadio(page);
    });

    // ── Mouse click selection ─────────────────────────────────────────────

    test.describe('Mouse click selection', () => {
      test('clicking a radio selects it', async ({ page }) => {
        await clickRadio(page, 'default', 'red');

        await expect.poll(() => isChecked(page, 'default', 'red')).toBe(true);
        await expect.poll(() => groupValue(page, 'default')).toBe('red');
      });

      test('clicking a different radio changes selection', async ({ page }) => {
        await clickRadio(page, 'default', 'red');
        await expect.poll(() => groupValue(page, 'default')).toBe('red');

        await clickRadio(page, 'default', 'blue');

        await expect.poll(() => groupValue(page, 'default')).toBe('blue');
        await expect.poll(() => isChecked(page, 'default', 'red')).toBe(false);
        await expect.poll(() => isChecked(page, 'default', 'blue')).toBe(true);
      });

      test('clicking an already-selected radio keeps it selected', async ({ page }) => {
        await clickRadio(page, 'default', 'green');
        await expect.poll(() => groupValue(page, 'default')).toBe('green');

        await clickRadio(page, 'default', 'green');

        await expect.poll(() => groupValue(page, 'default')).toBe('green');
        await expect.poll(() => isChecked(page, 'default', 'green')).toBe(true);
      });

      test('fires input event on group when selection changes', async ({ page }) => {
        await group(page, 'default').evaluate((el: any) => {
          (el as any).__inputFired = false;
          el.addEventListener('input', () => {
            (el as any).__inputFired = true;
          }, { once: true });
        });

        await clickRadio(page, 'default', 'blue');

        await expect.poll(() =>
          group(page, 'default').evaluate((el: any) => (el as any).__inputFired),
        ).toBe(true);
      });
    });

    // ── Keyboard navigation ───────────────────────────────────────────────

    test.describe('Keyboard navigation', () => {
      test('ArrowDown selects next radio', async ({ page }) => {
        await clickRadio(page, 'default', 'red');
        await expect.poll(() => groupValue(page, 'default')).toBe('red');

        await page.keyboard.press('ArrowDown');

        await expect.poll(() => groupValue(page, 'default')).toBe('blue');
      });

      test('ArrowUp selects previous radio', async ({ page }) => {
        await clickRadio(page, 'default', 'blue');
        await expect.poll(() => groupValue(page, 'default')).toBe('blue');

        await page.keyboard.press('ArrowUp');

        await expect.poll(() => groupValue(page, 'default')).toBe('red');
      });

      test('ArrowDown wraps from last to first', async ({ page }) => {
        await clickRadio(page, 'default', 'green');
        await expect.poll(() => groupValue(page, 'default')).toBe('green');

        await page.keyboard.press('ArrowDown');

        await expect.poll(() => groupValue(page, 'default')).toBe('red');
      });

      test('ArrowUp wraps from first to last', async ({ page }) => {
        await clickRadio(page, 'default', 'red');
        await expect.poll(() => groupValue(page, 'default'), { timeout: 5_000 }).toBe('red');

        await page.keyboard.press('ArrowUp');

        await expect.poll(() => groupValue(page, 'default')).toBe('green');
      });

      test('ArrowDown skips disabled options', async ({ page }) => {
        await clickRadio(page, 'with-disabled', 'opt1');
        await expect.poll(() => groupValue(page, 'with-disabled')).toBe('opt1');

        await page.keyboard.press('ArrowDown');

        // Should skip disabled opt2 and go to opt3
        await expect.poll(() => groupValue(page, 'with-disabled')).toBe('opt3');
      });

      test('Space selects focused radio', async ({ page }) => {
        // Focus the first radio
        await radio(page, 'default', 'red').evaluate((el: any) => el.focus());
        await expect.poll(() =>
          radio(page, 'default', 'red').evaluate((el: any) =>
            el.shadowRoot?.activeElement != null || el.matches(':focus-within'),
          ),
          { timeout: 5_000 },
        ).toBe(true);

        await page.keyboard.press('Space');

        await expect.poll(() => groupValue(page, 'default')).toBe('red');
      });
    });

    // ── Disabled options ──────────────────────────────────────────────────

    test.describe('Disabled options', () => {
      test('clicking a disabled radio does not select it', async ({ page }) => {
        await radio(page, 'with-disabled', 'opt2').click({ force: true });
        await page.waitForTimeout(300);

        const val = await groupValue(page, 'with-disabled');
        expect(val == null).toBe(true);
      });

      test('disabled radio has aria-disabled attribute', async ({ page }) => {
        const ariaDisabled = await radio(page, 'with-disabled', 'opt2')
          .getAttribute('aria-disabled');
        // Boolean attribute: present means disabled (value may be "" or "true")
        expect(ariaDisabled).not.toBeNull();
      });
    });

    // ── Disabled group ────────────────────────────────────────────────────

    test.describe('Disabled group', () => {
      test('clicking radio in disabled group does not select', async ({ page }) => {
        await radio(page, 'disabled-group', 'a').click({ force: true });
        await page.waitForTimeout(300);

        const val = await groupValue(page, 'disabled-group');
        expect(val == null).toBe(true);
      });

      test('all radios in disabled group have disabled attribute', async ({ page }) => {
        const aDisabled = await radio(page, 'disabled-group', 'a')
          .evaluate((el: any) => el.disabled);
        const bDisabled = await radio(page, 'disabled-group', 'b')
          .evaluate((el: any) => el.disabled);

        expect(aDisabled).toBe(true);
        expect(bDisabled).toBe(true);
      });
    });

    // ── Preset value ──────────────────────────────────────────────────────

    test.describe('Preset value', () => {
      test('preset checked radio is selected on load', async ({ page }) => {
        await expect.poll(() => isChecked(page, 'preset', 'beta'), { timeout: 5_000 }).toBe(true);
        await expect.poll(() => groupValue(page, 'preset'), { timeout: 5_000 }).toBe('beta');
      });

      test('other radios in preset group are not checked', async ({ page }) => {
        await expect.poll(() => isChecked(page, 'preset', 'alpha')).toBe(false);
        await expect.poll(() => isChecked(page, 'preset', 'gamma')).toBe(false);
      });
    });

    // ── Validation ────────────────────────────────────────────────────────

    test.describe('Validation', () => {
      test('required group shows valueMissing after blur without selection', async ({ page }) => {
        await radio(page, 'required', 'yes').evaluate((el: any) => el.focus());
        await expect.poll(() =>
          radio(page, 'required', 'yes').evaluate((el: any) =>
            el.shadowRoot?.activeElement != null || el.matches(':focus-within'),
          ),
          { timeout: 5_000 },
        ).toBe(true);
        await page.click('#outside-element');

        await expect.poll(() => groupValidity(page, 'required'), { timeout: 5_000 }).toBe('valueMissing');
      });

      test('required group shows valid after making a selection', async ({ page }) => {
        await clickRadio(page, 'required', 'yes');
        await page.click('#outside-element');

        await expect.poll(() => groupValidity(page, 'required')).toBe('valid');
      });

      test('error attribute sets customError validity', async ({ page }) => {
        await expect.poll(() => groupValidity(page, 'with-error')).toBe('customError');
      });

      test('validated event fires after blur validation', async ({ page }) => {
        await group(page, 'required').evaluate((el: any) => {
          (el as any).__validatedFired = false;
          el.addEventListener('auroFormElement-validated', () => {
            (el as any).__validatedFired = true;
          }, { once: true });
        });

        await radio(page, 'required', 'yes').evaluate((el: any) => el.focus());
        // Confirm focus settled inside the shadow DOM before blurring
        await expect.poll(() =>
          radio(page, 'required', 'yes').evaluate((el: any) =>
            el.shadowRoot?.activeElement != null || el.matches(':focus-within'),
          ),
          { timeout: 5_000 },
        ).toBe(true);
        await page.click('#outside-element');

        await expect.poll(() =>
          group(page, 'required').evaluate((el: any) => (el as any).__validatedFired),
        ).toBe(true);
      });
    });

    // ── Reset ─────────────────────────────────────────────────────────────

    test.describe('Reset', () => {
      test('reset() clears selection and value', async ({ page }) => {
        await clickRadio(page, 'default', 'red');
        await expect.poll(() => groupValue(page, 'default')).toBe('red');

        await group(page, 'default').evaluate((el: any) => el.reset());

        await expect.poll(async () => {
          const val = await groupValue(page, 'default');
          return val == null;
        }).toBe(true);

        await expect.poll(() => isChecked(page, 'default', 'red')).toBe(false);
      });

      test('reset() clears validity', async ({ page }) => {
        await radio(page, 'required', 'yes').evaluate((el: any) => el.focus());
        await expect.poll(() =>
          radio(page, 'required', 'yes').evaluate((el: any) =>
            el.shadowRoot?.activeElement != null || el.matches(':focus-within'),
          ),
          { timeout: 5_000 },
        ).toBe(true);
        await page.click('#outside-element');
        await expect.poll(() => groupValidity(page, 'required'), { timeout: 5_000 }).toBe('valueMissing');

        await group(page, 'required').evaluate((el: any) => el.reset());

        await expect.poll(async () => {
          const v = await groupValidity(page, 'required');
          return v == null;
        }).toBe(true);
      });
    });

    // ── ARIA attributes ───────────────────────────────────────────────────

    test.describe('ARIA attributes', () => {
      test('group has role=radiogroup', async ({ page }) => {
        const role = await group(page, 'default').evaluate((el: any) =>
          el.shadowRoot.querySelector('fieldset')?.getAttribute('role'),
        );
        expect(role).toBe('radiogroup');
      });

      test('selected radio has aria-checked=true', async ({ page }) => {
        await clickRadio(page, 'default', 'red');

        await expect.poll(() =>
          radio(page, 'default', 'red').getAttribute('aria-checked'),
        ).toBe('true');
      });

      test('unselected radio has aria-checked=false', async ({ page }) => {
        await clickRadio(page, 'default', 'red');

        const ariaChecked = await radio(page, 'default', 'blue').getAttribute('aria-checked');
        expect(ariaChecked).toBe('false');
      });
    });

    // ── Mutual exclusivity ────────────────────────────────────────────────

    test.describe('Mutual exclusivity', () => {
      test('only one radio can be checked at a time', async ({ page }) => {
        await clickRadio(page, 'default', 'red');
        await expect.poll(() => groupValue(page, 'default')).toBe('red');

        await clickRadio(page, 'default', 'blue');
        await expect.poll(() => groupValue(page, 'default')).toBe('blue');

        await clickRadio(page, 'default', 'green');

        await expect.poll(() => isChecked(page, 'default', 'red')).toBe(false);
        await expect.poll(() => isChecked(page, 'default', 'blue')).toBe(false);
        await expect.poll(() => isChecked(page, 'default', 'green')).toBe(true);
      });
    });
  });
}

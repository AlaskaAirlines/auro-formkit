import { test, expect, type Page, type Locator } from './coverage-fixture';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Wait for auro-input custom element to be fully registered. */
async function waitForInput(page: Page) {
  await page.waitForFunction(
    () => customElements.get('auro-input') !== undefined,
    { timeout: 10_000 },
  );
}

/** Return the auro-input inside a fixture section. */
function auroInput(page: Page, fixture: string): Locator {
  return page.locator(`[data-testid="${fixture}"] auro-input`);
}

/** Focus the native input inside shadow DOM. */
async function focusNative(page: Page, fixture: string) {
  await auroInput(page, fixture).evaluate((el: any) => {
    const inp = el.shadowRoot.querySelector('input');
    if (inp) inp.focus();
  });
}

/** Type into the native input inside shadow DOM. */
async function typeIn(page: Page, fixture: string, text: string) {
  await focusNative(page, fixture);
  await page.keyboard.type(text, { delay: 30 });
}

/** Get the component's value property. */
function getValue(page: Page, fixture: string) {
  return auroInput(page, fixture).evaluate((el: any) => el.value);
}

/** Get the component's validity property. */
function getValidity(page: Page, fixture: string) {
  return auroInput(page, fixture).evaluate((el: any) => el.validity);
}

/** Get the native input's type attribute (resolved in shadow DOM). */
function getNativeType(page: Page, fixture: string) {
  return auroInput(page, fixture).evaluate((el: any) =>
    el.shadowRoot.querySelector('input')?.type,
  );
}

/** Clear the native input via keyboard (select-all + delete). */
async function clearViaKeyboard(page: Page, fixture: string) {
  await focusNative(page, fixture);
  await page.keyboard.press('ControlOrMeta+A');
  await page.keyboard.press('Backspace');
}

// ─── Suite ────────────────────────────────────────────────────────────────────

export function inputInteractionSuite(framework: string) {
  const label = `auro-input interaction in ${framework}`;

  test.describe(label, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/input-interaction');
      await waitForInput(page);
    });

    // ── Typing & value ────────────────────────────────────────────────────

    test.describe('Typing and value', () => {
      test('typing sets the value property', async ({ page }) => {
        await typeIn(page, 'default', 'John Doe');
        expect(await getValue(page, 'default')).toBe('John Doe');
      });

      test('preset value is reflected', async ({ page }) => {
        await expect.poll(() => getValue(page, 'preset')).toBe('Hello World');
      });

      test('clearing input resets value', async ({ page }) => {
        await typeIn(page, 'default', 'test');
        await clearViaKeyboard(page, 'default');
        const v = await getValue(page, 'default');
        expect(!v || v === '').toBe(true);
      });

      test('fires input event on typing', async ({ page }) => {
        await auroInput(page, 'default').evaluate((el: any) => {
          (el as any).__inputFired = false;
          el.addEventListener('input', () => {
            (el as any).__inputFired = true;
          }, { once: true });
        });

        await typeIn(page, 'default', 'x');

        await expect.poll(() =>
          auroInput(page, 'default').evaluate((el: any) => (el as any).__inputFired),
        ).toBe(true);
      });
    });

    // ── Validation ────────────────────────────────────────────────────────

    test.describe('Validation', () => {
      test('required field shows valueMissing on blur when empty', async ({ page }) => {
        await focusNative(page, 'required');
        await expect(auroInput(page, 'required').locator('input')).toBeFocused();
        await page.click('#outside-element');

        await expect.poll(() => getValidity(page, 'required')).toBe('valueMissing');
      });

      test('required field shows valid after filling', async ({ page }) => {
        await typeIn(page, 'required', 'something');
        await page.click('#outside-element');

        await expect.poll(() => getValidity(page, 'required')).toBe('valid');
      });

      test('email type rejects invalid email', async ({ page }) => {
        await typeIn(page, 'email', 'notanemail');
        await page.click('#outside-element');

        await expect.poll(() => getValidity(page, 'email')).toBe('patternMismatch');
      });

      test('email type accepts valid email', async ({ page }) => {
        await typeIn(page, 'email', 'user@example.com');
        await page.click('#outside-element');

        await expect.poll(() => getValidity(page, 'email')).toBe('valid');
      });

      test('minLength violation triggers tooShort', async ({ page }) => {
        await typeIn(page, 'length-constraints', 'ab');
        await page.click('#outside-element');

        await expect.poll(() => getValidity(page, 'length-constraints')).toBe('tooShort');
      });

      test('valid length passes validation', async ({ page }) => {
        await typeIn(page, 'length-constraints', 'abcde');
        await page.click('#outside-element');

        await expect.poll(() => getValidity(page, 'length-constraints')).toBe('valid');
      });

      test('pattern mismatch triggers patternMismatch', async ({ page }) => {
        await typeIn(page, 'pattern', 'abc');
        await page.click('#outside-element');

        await expect.poll(() => getValidity(page, 'pattern')).toBe('patternMismatch');
      });

      test('valid pattern passes validation', async ({ page }) => {
        await typeIn(page, 'pattern', '98101');
        await page.click('#outside-element');

        await expect.poll(() => getValidity(page, 'pattern')).toBe('valid');
      });

      test('noValidate prevents validation on blur', async ({ page }) => {
        await focusNative(page, 'no-validate');
        await expect(auroInput(page, 'no-validate').locator('input')).toBeFocused();
        await page.click('#outside-element');

        // validity should remain undefined/null (untouched)
        const v = await getValidity(page, 'no-validate');
        expect(v == null).toBe(true);
      });

      test('error attribute sets customError validity', async ({ page }) => {
        await expect.poll(() => getValidity(page, 'error-attr')).toBe('customError');
      });

      test('validated event fires after blur validation', async ({ page }) => {
        await auroInput(page, 'required').evaluate((el: any) => {
          (el as any).__validatedFired = false;
          el.addEventListener('auroFormElement-validated', () => {
            (el as any).__validatedFired = true;
          }, { once: true });
        });

        await focusNative(page, 'required');
        await expect(auroInput(page, 'required').locator('input')).toBeFocused();
        await page.click('#outside-element');

        await expect.poll(() =>
          auroInput(page, 'required').evaluate((el: any) => (el as any).__validatedFired),
        ).toBe(true);
      });
    });

    // ── Disabled & readonly ───────────────────────────────────────────────

    test.describe('Disabled and readonly', () => {
      test('disabled input does not accept typed input', async ({ page }) => {
        await auroInput(page, 'disabled').evaluate((el: any) => {
          const inp = el.shadowRoot.querySelector('input');
          if (inp) inp.focus();
        });
        await page.keyboard.type('extra');

        expect(await getValue(page, 'disabled')).toBe('Cannot edit');
      });

      test('readonly input does not accept typed input', async ({ page }) => {
        await auroInput(page, 'readonly').evaluate((el: any) => {
          const inp = el.shadowRoot.querySelector('input');
          if (inp) inp.focus();
        });
        await page.keyboard.type('extra');

        expect(await getValue(page, 'readonly')).toBe('Read only');
      });
    });

    // ── Password toggle ──────────────────────────────────────────────────

    test.describe('Password toggle', () => {
      test('password input masks text by default', async ({ page }) => {
        expect(await getNativeType(page, 'password')).toBe('password');
      });

      test('clicking toggle reveals password text', async ({ page }) => {
        await typeIn(page, 'password', 'secret123');

        // Find and click the password toggle button by class
        await auroInput(page, 'password').evaluate((el: any) => {
          const btn = el.shadowRoot.querySelector('.passwordBtn');
          if (btn) btn.click();
        });

        await expect.poll(() => getNativeType(page, 'password')).toBe('text');
      });

      test('clicking toggle again hides password', async ({ page }) => {
        await typeIn(page, 'password', 'secret123');

        // Toggle show
        await auroInput(page, 'password').evaluate((el: any) => {
          const btn = el.shadowRoot.querySelector('.passwordBtn');
          if (btn) btn.click();
        });
        await expect.poll(() => getNativeType(page, 'password')).toBe('text');

        // Toggle hide
        await auroInput(page, 'password').evaluate((el: any) => {
          const btn = el.shadowRoot.querySelector('.passwordBtn');
          if (btn) btn.click();
        });
        await expect.poll(() => getNativeType(page, 'password')).toBe('password');
      });
    });

    // ── Clear button ──────────────────────────────────────────────────────

    test.describe('Clear button', () => {
      test('clear button appears when input has value', async ({ page }) => {
        await typeIn(page, 'default', 'something');

        const hasClear = await auroInput(page, 'default').evaluate((el: any) => {
          const btn = el.shadowRoot.querySelector('.clearBtn');
          return btn !== null && !btn.classList.contains('util_displayHidden');
        });
        expect(hasClear).toBe(true);
      });

      test('clicking clear button removes value', async ({ page }) => {
        await typeIn(page, 'default', 'to be cleared');

        // Click the clear button
        await auroInput(page, 'default').evaluate((el: any) => {
          const btn = el.shadowRoot.querySelector('.clearBtn');
          if (btn) btn.click();
        });

        await expect.poll(async () => {
          const v = await getValue(page, 'default');
          return !v || v === '';
        }).toBe(true);
      });
    });

    // ── Credit card formatting ────────────────────────────────────────────

    test.describe('Credit card formatting', () => {
      test('formats Visa card number with spaces', async ({ page }) => {
        await typeIn(page, 'credit-card', '4111111111111111');

        // IMask should format with spaces: 4111 1111 1111 1111
        await expect.poll(async () => {
          const nativeVal = await auroInput(page, 'credit-card').evaluate((el: any) =>
            el.shadowRoot.querySelector('input')?.value,
          );
          return nativeVal?.includes(' ');
        }).toBe(true);
      });
    });

    // ── Focus management ──────────────────────────────────────────────────

    test.describe('Focus management', () => {
      test('focus() method focuses the native input', async ({ page }) => {
        await auroInput(page, 'default').evaluate((el: any) => el.focus());

        const isFocused = await auroInput(page, 'default').evaluate((el: any) => {
          const inp = el.shadowRoot.querySelector('input');
          return el.shadowRoot.activeElement === inp;
        });
        expect(isFocused).toBe(true);
      });

      test('input retains focus after programmatic focus()', async ({ page }) => {
        await auroInput(page, 'default').evaluate((el: any) => el.focus());

        // Type and verify value — confirms focus is correct
        await page.keyboard.type('focused text', { delay: 20 });
        expect(await getValue(page, 'default')).toBe('focused text');
      });
    });

    // ── Reset method ──────────────────────────────────────────────────────

    test.describe('Reset', () => {
      test('reset() clears value and validity', async ({ page }) => {
        await typeIn(page, 'required', 'temp');
        await page.click('#outside-element');
        await expect.poll(() => getValidity(page, 'required')).toBe('valid');

        await auroInput(page, 'required').evaluate((el: any) => el.reset());

        await expect.poll(async () => {
          const v = await getValue(page, 'required');
          return !v || v === '';
        }).toBe(true);

        const validity = await getValidity(page, 'required');
        expect(validity == null).toBe(true);
      });
    });
  });
}

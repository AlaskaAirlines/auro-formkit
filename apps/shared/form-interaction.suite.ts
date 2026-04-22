import { test, expect, type Page, type Locator } from './coverage-fixture';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Wait for auro-form and auro-input custom elements to be fully registered and shadow DOM rendered. */
async function waitForForm(page: Page) {
  await page.waitForFunction(
    () =>
      customElements.get('auro-form') !== undefined &&
      customElements.get('auro-input') !== undefined,
    { timeout: 10_000 },
  );
  // Wait for the first input's shadow DOM <input> to be rendered
  await page.waitForFunction(
    () => {
      const el = document.querySelector('auro-input');
      return el?.shadowRoot?.querySelector('input') !== null;
    },
    { timeout: 10_000 },
  );
}

/** Return the form element scoped to a data-testid section. */
function form(page: Page, fixture: string): Locator {
  return page.locator(`[data-testid="${fixture}"] auro-form`);
}

/** Return an auro-input inside the form by index. */
function input(page: Page, fixture: string, nth = 0): Locator {
  return page.locator(`[data-testid="${fixture}"] auro-input`).nth(nth);
}

/** Type into an auro-input's shadow DOM input element. */
async function typeInInput(page: Page, fixture: string, text: string, nth = 0) {
  await input(page, fixture, nth).evaluate((el: any) => {
    const inp = el.shadowRoot.querySelector('input');
    if (inp) inp.focus();
  });
  await page.keyboard.type(text, { delay: 30 });
}

/** Focus an auro-input's shadow DOM input element. */
async function focusInput(page: Page, fixture: string, nth = 0) {
  await input(page, fixture, nth).evaluate((el: any) => {
    const inp = el.shadowRoot.querySelector('input');
    if (inp) inp.focus();
  });
  // Confirm focus landed on the inner input
  await expect.poll(() =>
    input(page, fixture, nth).evaluate((el: any) => {
      const inp = el.shadowRoot.querySelector('input');
      return el.shadowRoot.activeElement === inp;
    }),
    { timeout: 5_000 },
  ).toBe(true);
}

/** Get the form's value object. */
function formValue(page: Page, fixture: string) {
  return form(page, fixture).evaluate((el: any) => el.value);
}

/** Get the form's validity string. */
function formValidity(page: Page, fixture: string) {
  return form(page, fixture).evaluate((el: any) => el.validity);
}

/** Get the form's isInitialState flag. */
function formIsInitial(page: Page, fixture: string) {
  return form(page, fixture).evaluate((el: any) => el.isInitialState);
}

/** Click the submit button in a form fixture. */
async function clickSubmit(page: Page, fixture: string) {
  await page.locator(`[data-testid="${fixture}"] button[type="submit"]`).click();
}

/** Click the reset button in a form fixture. */
async function clickReset(page: Page, fixture: string) {
  await page.locator(`[data-testid="${fixture}"] button[type="reset"]`).click();
}

/** Check if the submit button is disabled. */
function isSubmitDisabled(page: Page, fixture: string) {
  return page.locator(`[data-testid="${fixture}"] button[type="submit"]`).evaluate(
    (btn: any) => btn.disabled || btn.hasAttribute('disabled'),
  );
}

/** Check if the reset button is disabled. */
function isResetDisabled(page: Page, fixture: string) {
  return page.locator(`[data-testid="${fixture}"] button[type="reset"]`).evaluate(
    (btn: any) => btn.disabled || btn.hasAttribute('disabled'),
  );
}

// ─── Suite ────────────────────────────────────────────────────────────────────

export function formInteractionSuite(framework: string) {
  const label = `auro-form interaction in ${framework}`;

  test.describe(label, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/form-interaction');
      await waitForForm(page);
    });

    test.describe('Form value collection', () => {
      test('collects values from named inputs', async ({ page }) => {
        await typeInInput(page, 'simple', 'John', 0);
        await typeInInput(page, 'simple', 'Doe', 1);

        const value = await formValue(page, 'simple');
        expect(value.firstName).toBe('John');
        expect(value.lastName).toBe('Doe');
      });

      test('collects preset values on initialization', async ({ page }) => {
        // Allow initialization to complete
        await expect.poll(() => formValue(page, 'prefilled')).toHaveProperty('email');
        const value = await formValue(page, 'prefilled');
        expect(value.email).toBe('test@example.com');
      });

      test('collects checkbox-group values as array', async ({ page }) => {
        // Click a checkbox in the mixed form
        await page.locator('[data-testid="mixed"] auro-checkbox').nth(0).click();
        await expect.poll(async () => {
          const v = await formValue(page, 'mixed');
          return Array.isArray(v.preferences) && v.preferences.includes('newsletter');
        }).toBe(true);
      });
    });

    test.describe('Form validity', () => {
      test('validity is null when form is untouched', async ({ page }) => {
        const validity = await formValidity(page, 'simple');
        expect(validity).toBeNull();
      });

      test('validity is valid when all required fields are filled', async ({ page }) => {
        await typeInInput(page, 'simple', 'John', 0);
        // Blur to trigger validation
        await page.click('#outside-element');
        await typeInInput(page, 'simple', 'Doe', 1);
        await page.click('#outside-element');

        await expect.poll(() => formValidity(page, 'simple')).toBe('valid');
      });

      test('validity is invalid when required field is empty after interaction', async ({ page }) => {
        // Type and clear to trigger touched + invalid
        await typeInInput(page, 'validation', 'x', 0);
        // Select all and delete
        await page.keyboard.press('Backspace');
        await page.click('#outside-element');

        await expect.poll(() => formValidity(page, 'validation')).toBe('invalid');
      });
    });

    test.describe('isInitialState', () => {
      test('is true when form is first created', async ({ page }) => {
        await expect.poll(() => formIsInitial(page, 'simple')).toBe(true);
      });

      test('becomes false after typing in an input', async ({ page }) => {
        await typeInInput(page, 'simple', 'x', 0);
        await expect.poll(() => formIsInitial(page, 'simple')).toBe(false);
      });

      test('returns to true after reset', async ({ page }) => {
        await typeInInput(page, 'simple', 'x', 0);
        await expect.poll(() => formIsInitial(page, 'simple')).toBe(false);

        await expect.poll(() => isResetDisabled(page, 'simple')).toBe(false);
        await clickReset(page, 'simple');
        await expect.poll(() => formIsInitial(page, 'simple')).toBe(true);
      });
    });

    test.describe('Submit interaction', () => {
      test('clicking submit button fires submit event when valid', async ({ page }) => {
        await typeInInput(page, 'simple', 'John', 0);
        await page.click('#outside-element');
        await typeInInput(page, 'simple', 'Doe', 1);
        await page.click('#outside-element');

        // Wait for submit button to become enabled
        await expect.poll(() => isSubmitDisabled(page, 'simple')).toBe(false);

        await form(page, 'simple').evaluate((el: any) => {
          (el as any).__submitFired = false;
          (el as any).__submitDetail = null;
          el.addEventListener('submit', (e: any) => {
            (el as any).__submitFired = true;
            (el as any).__submitDetail = e.detail;
          }, { once: true });
        });

        await clickSubmit(page, 'simple');

        await expect.poll(() =>
          form(page, 'simple').evaluate((el: any) => (el as any).__submitFired),
        ).toBe(true);

        const detail = await form(page, 'simple').evaluate((el: any) => (el as any).__submitDetail);
        expect(detail.value.firstName).toBe('John');
        expect(detail.value.lastName).toBe('Doe');
      });

      test('calling submit() does not fire event when form is invalid', async ({ page }) => {
        await form(page, 'simple').evaluate((el: any) => {
          (el as any).__submitFired = false;
          el.addEventListener('submit', () => {
            (el as any).__submitFired = true;
          }, { once: true });
        });

        // Call submit() directly since button is disabled when invalid
        await form(page, 'simple').evaluate((el: any) => el.submit());
        await page.waitForTimeout(500);

        await expect.poll(() => form(page, 'simple').evaluate((el: any) => (el as any).__submitFired)).toBe(false);
      });
    });

    test.describe('Enter key submission', () => {
      test('Enter key in an input triggers form submit when valid', async ({ page }) => {
        await typeInInput(page, 'simple', 'John', 0);
        await typeInInput(page, 'simple', 'Doe', 1);
        await focusInput(page, 'simple', 0);

        // Set up listener, then press Enter
        await form(page, 'simple').evaluate((el: any) => {
          (el as any).__submitFired = false;
          (el as any).__submitDetail = null;
          el.addEventListener('submit', (e: any) => {
            (el as any).__submitFired = true;
            (el as any).__submitDetail = e.detail;
          }, { once: true });
        });

        await page.keyboard.press('Enter');

        await expect.poll(() =>
          form(page, 'simple').evaluate((el: any) => (el as any).__submitFired),
        ).toBe(true);

        const detail = await form(page, 'simple').evaluate((el: any) => (el as any).__submitDetail);
        expect(detail.value.firstName).toBe('John');
        expect(detail.value.lastName).toBe('Doe');
      });

      test('Enter key does not submit when form is invalid', async ({ page }) => {
        // Type in only one required field
        await typeInInput(page, 'simple', 'John', 0);
        await focusInput(page, 'simple', 0);

        await form(page, 'simple').evaluate((el: any) => {
          (el as any).__submitFired = false;
          el.addEventListener('submit', () => {
            (el as any).__submitFired = true;
          }, { once: true });
        });

        await page.keyboard.press('Enter');

        // Give time for any async submit handler to fire
        await expect.poll(() =>
          form(page, 'simple').evaluate((el: any) => (el as any).__submitFired),
          { timeout: 2_000 },
        ).toBe(false);
      });
    });

    test.describe('Reset interaction', () => {
      test('clicking reset button clears input values', async ({ page }) => {
        await typeInInput(page, 'simple', 'John', 0);
        await typeInInput(page, 'simple', 'Doe', 1);

        // Wait for reset button to become enabled
        await expect.poll(() => isResetDisabled(page, 'simple')).toBe(false);

        await clickReset(page, 'simple');

        // Wait for isInitialState to confirm reset completed
        await expect.poll(() => formIsInitial(page, 'simple')).toBe(true);

        const v = await formValue(page, 'simple');
        // After reset, values should be empty/undefined
        expect(!v.firstName || v.firstName === '').toBe(true);
        expect(!v.lastName || v.lastName === '').toBe(true);
      });

      test('clicking reset button fires reset event with previous values', async ({ page }) => {
        await typeInInput(page, 'simple', 'John', 0);
        await typeInInput(page, 'simple', 'Doe', 1);

        // Wait for reset button to become enabled
        await expect.poll(() => isResetDisabled(page, 'simple')).toBe(false);

        await form(page, 'simple').evaluate((el: any) => {
          (el as any).__resetFired = false;
          (el as any).__resetDetail = null;
          el.addEventListener('reset', (e: any) => {
            (el as any).__resetFired = true;
            (el as any).__resetDetail = e.detail;
          }, { once: true });
        });

        await clickReset(page, 'simple');

        await expect.poll(() =>
          form(page, 'simple').evaluate((el: any) => (el as any).__resetFired),
        ).toBe(true);

        const detail = await form(page, 'simple').evaluate((el: any) => (el as any).__resetDetail);
        expect(detail.previousValue.firstName).toBe('John');
        expect(detail.previousValue.lastName).toBe('Doe');
      });

      test('reset restores form to initial state', async ({ page }) => {
        await typeInInput(page, 'simple', 'John', 0);
        await expect.poll(() => formIsInitial(page, 'simple')).toBe(false);

        await expect.poll(() => isResetDisabled(page, 'simple')).toBe(false);
        await clickReset(page, 'simple');
        await expect.poll(() => formIsInitial(page, 'simple')).toBe(true);
      });
    });

    test.describe('Button disabled states', () => {
      test('submit button is disabled in initial state', async ({ page }) => {
        await expect.poll(() => isSubmitDisabled(page, 'simple')).toBe(true);
      });

      test('reset button is disabled in initial state', async ({ page }) => {
        await expect.poll(() => isResetDisabled(page, 'simple')).toBe(true);
      });

      test('reset button is enabled after a value change', async ({ page }) => {
        await typeInInput(page, 'simple', 'x', 0);
        await expect.poll(() => isResetDisabled(page, 'simple')).toBe(false);
      });

      test('submit button is enabled when form is valid', async ({ page }) => {
        await typeInInput(page, 'simple', 'John', 0);
        await page.click('#outside-element');
        await typeInInput(page, 'simple', 'Doe', 1);
        await page.click('#outside-element');

        await expect.poll(() => isSubmitDisabled(page, 'simple')).toBe(false);
      });
    });

    test.describe('Validation error display', () => {
      test('submit with empty required fields surfaces validation errors', async ({ page }) => {
        // Force submit (which calls validate(true) on all elements)
        await form(page, 'validation').evaluate((el: any) => el.submit());

        // The required input should now have a validity state
        await expect.poll(() =>
          input(page, 'validation', 0).evaluate((el: any) => el.validity),
        ).toBe('valueMissing');
      });
    });

    test.describe('Events', () => {
      test('fires change event when input value changes', async ({ page }) => {
        await form(page, 'simple').evaluate((el: any) => {
          (el as any).__changeFired = false;
          el.addEventListener('change', () => {
            (el as any).__changeFired = true;
          }, { once: true });
        });

        await typeInInput(page, 'simple', 'x', 0);

        await expect.poll(() =>
          form(page, 'simple').evaluate((el: any) => (el as any).__changeFired),
        ).toBe(true);
      });
    });

    test.describe('Mixed element form', () => {
      test('form collects values from input and checkbox-group', async ({ page }) => {
        await typeInInput(page, 'mixed', 'Jane', 0);
        await page.locator('[data-testid="mixed"] auro-checkbox').nth(0).click();
        // Wait for first checkbox to register before clicking the next
        await expect.poll(() => formValue(page, 'mixed').then((v: any) => v.preferences), { timeout: 5_000 }).toContain('newsletter');
        await page.locator('[data-testid="mixed"] auro-checkbox').nth(1).click();

        const value = await formValue(page, 'mixed');
        expect(value.fullName).toBe('Jane');
        expect(value.preferences).toContain('newsletter');
        expect(value.preferences).toContain('updates');
      });
    });
  });
}

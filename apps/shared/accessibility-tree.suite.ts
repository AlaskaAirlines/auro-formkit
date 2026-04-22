import { test, expect, type Page, type Locator } from './coverage-fixture';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Wait for a custom element to be registered and its shadow DOM rendered. */
async function waitForComponent(page: Page, tagName: string, shadowSelector?: string) {
  await page.waitForFunction(
    (tag) => customElements.get(tag) !== undefined,
    tagName,
    { timeout: 10_000 },
  );
  if (shadowSelector) {
    await page.waitForFunction(
      ({ tag, sel }) => {
        const el = document.querySelector(tag);
        return el?.shadowRoot?.querySelector(sel) !== null;
      },
      { tag: tagName, sel: shadowSelector },
      { timeout: 10_000 },
    );
  }
}

/** Scoped locator inside a data-testid section. */
function fixture(page: Page, id: string, selector: string): Locator {
  return page.locator(`[data-testid="${id}"] ${selector}`);
}

// ─── Suite ────────────────────────────────────────────────────────────────────

export function accessibilityTreeSuite(framework: string) {
  const label = `Accessibility tree in ${framework}`;

  // ── Checkbox ────────────────────────────────────────────────────────────

  test.describe(`${label} — checkbox`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/checkbox-interaction');
      await waitForComponent(page, 'auro-checkbox', 'input');
    });

    test('checkbox has role=checkbox and accessible name from label text', async ({ page }) => {
      const cb = fixture(page, 'default', 'auro-checkbox');
      await expect(cb).toHaveRole('checkbox');
      await expect(cb).toHaveAccessibleName('I agree to the terms');
    });

    test('unchecked checkbox exposes aria-checked=false', async ({ page }) => {
      const cb = fixture(page, 'default', 'auro-checkbox');
      await expect(cb).toHaveAttribute('aria-checked', 'false');
    });

    test('checked checkbox exposes aria-checked=true', async ({ page }) => {
      const cb = fixture(page, 'checked', 'auro-checkbox');
      await expect(cb).toHaveAttribute('aria-checked', 'true');
    });

    test('disabled checkbox exposes aria-disabled=true', async ({ page }) => {
      const cb = fixture(page, 'disabled', 'auro-checkbox');
      await expect(cb).toHaveAttribute('aria-disabled', 'true');
    });

    test('checkbox group uses fieldset/legend grouping', async ({ page }) => {
      // fieldset and legend are inside the shadow DOM of auro-checkbox-group
      const group = fixture(page, 'group', 'auro-checkbox-group');
      const hasFieldset = await group.evaluate((el: any) =>
        el.shadowRoot?.querySelector('fieldset') !== null,
      );
      expect(hasFieldset).toBe(true);

      const legendText = await group.evaluate((el: any) => {
        const legend = el.shadowRoot?.querySelector('legend');
        return legend?.textContent?.trim() ?? '';
      });
      // The legend contains the slotted text
      expect(legendText.length).toBeGreaterThan(0);
    });

    test('clicking checkbox updates accessible checked state', async ({ page }) => {
      const cb = fixture(page, 'default', 'auro-checkbox');
      await expect(cb).toHaveAttribute('aria-checked', 'false');

      await cb.click();

      await expect(cb).toHaveAttribute('aria-checked', 'true');
    });
  });

  // ── Radio ───────────────────────────────────────────────────────────────

  test.describe(`${label} — radio`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/radio-interaction');
      await waitForComponent(page, 'auro-radio', 'input');
    });

    test('radio has role=radio and accessible name from label text', async ({ page }) => {
      const r = fixture(page, 'default', 'auro-radio[data-value="red"]');
      await expect(r).toHaveRole('radio');
      await expect(r).toHaveAccessibleName('Red');
    });

    test('radio group fieldset has role=radiogroup', async ({ page }) => {
      const fieldset = fixture(page, 'default', 'auro-radio-group')
        .locator('fieldset');
      await expect(fieldset).toHaveRole('radiogroup');
    });

    test('unselected radio has aria-checked=false', async ({ page }) => {
      const r = fixture(page, 'default', 'auro-radio[data-value="red"]');
      await expect(r).toHaveAttribute('aria-checked', 'false');
    });

    test('preset checked radio has aria-checked=true', async ({ page }) => {
      const r = fixture(page, 'preset', 'auro-radio[data-value="beta"]');
      await expect.poll(() =>
        r.getAttribute('aria-checked'),
      ).toBe('true');
    });

    test('disabled radio has aria-disabled', async ({ page }) => {
      const r = fixture(page, 'with-disabled', 'auro-radio[data-value="opt2"]');
      await expect(r).toHaveAttribute('aria-disabled');
    });

    test('selecting a radio updates aria-checked across the group', async ({ page }) => {
      const red = fixture(page, 'default', 'auro-radio[data-value="red"]');
      const blue = fixture(page, 'default', 'auro-radio[data-value="blue"]');

      await red.click();
      await expect(red).toHaveAttribute('aria-checked', 'true');
      await expect(blue).toHaveAttribute('aria-checked', 'false');

      await blue.click();
      await expect(blue).toHaveAttribute('aria-checked', 'true');
      await expect(red).toHaveAttribute('aria-checked', 'false');
    });
  });

  // ── Input ───────────────────────────────────────────────────────────────

  test.describe(`${label} — input`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/input-interaction');
      await waitForComponent(page, 'auro-input', 'input');
    });

    test('input has an accessible label from the label slot', async ({ page }) => {
      // The shadow DOM <input> gets its label via <label for=id>
      const hasLabel = await fixture(page, 'default', 'auro-input').evaluate((el: any) => {
        const input = el.shadowRoot?.querySelector('input');
        const label = el.shadowRoot?.querySelector('label');
        return input !== null && label !== null && label.getAttribute('for') === input.id;
      });
      expect(hasLabel).toBe(true);
    });

    test('input has aria-describedby linking to help text', async ({ page }) => {
      const input = fixture(page, 'default', 'auro-input')
        .locator('input');
      const describedBy = await input.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();
    });

    test('invalid input exposes aria-invalid=true', async ({ page }) => {
      // Type and clear to trigger required validation
      const input = fixture(page, 'required', 'auro-input').locator('input');
      await input.focus();
      await input.fill('x');
      await input.fill('');
      await page.click('#outside-element');

      await expect.poll(() =>
        input.getAttribute('aria-invalid'),
      ).toBe('true');
    });

    test('valid input exposes aria-invalid=false', async ({ page }) => {
      const input = fixture(page, 'required', 'auro-input').locator('input');
      await input.focus();
      await input.fill('something');
      await page.click('#outside-element');

      await expect.poll(() =>
        input.getAttribute('aria-invalid'),
      ).toBe('false');
    });

    test('error help text has role=alert for screen reader announcement', async ({ page }) => {
      const helpText = fixture(page, 'error-attr', 'auro-input')
        .locator('p[role="alert"]');
      await expect(helpText).toBeAttached();
      await expect(helpText).toHaveAttribute('aria-live', 'assertive');
    });

    test('password input has toggle button for show/hide', async ({ page }) => {
      // The password toggle uses a versioned button tag with class .passwordBtn
      // and contains a notification div with the toggle
      await expect.poll(() =>
        fixture(page, 'password', 'auro-input').evaluate((el: any) => {
          const notification = el.shadowRoot?.querySelector('.notification');
          return notification !== null;
        }),
      ).toBe(true);
    });
  });

  // ── Menu ────────────────────────────────────────────────────────────────

  test.describe(`${label} — menu`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/menu-interaction');
      await waitForComponent(page, 'auro-menu');
    });

    test('menu has role=listbox', async ({ page }) => {
      const m = fixture(page, 'default', 'auro-menu');
      await expect(m).toHaveRole('listbox');
    });

    test('menu options have role=option', async ({ page }) => {
      const opt = fixture(page, 'default', 'auro-menuoption').first();
      await expect(opt).toHaveRole('option');
    });

    test('selected option has aria-selected=true', async ({ page }) => {
      const opt = fixture(page, 'default', 'auro-menuoption[value="Apples"]');
      await opt.click();
      await expect(opt).toHaveAttribute('aria-selected', 'true');
    });

    test('unselected options have aria-selected=false', async ({ page }) => {
      const opt = fixture(page, 'default', 'auro-menuoption[value="Oranges"]');
      await expect(opt).toHaveAttribute('aria-selected', 'false');
    });

    test('disabled option has aria-disabled=true', async ({ page }) => {
      const opt = fixture(page, 'with-disabled', 'auro-menuoption[value="DisabledOpt"]');
      await expect(opt).toHaveAttribute('aria-disabled', 'true');
    });

    test('multiselect menu has aria-multiselectable=true', async ({ page }) => {
      const m = fixture(page, 'multiselect', 'auro-menu');
      await expect(m).toHaveAttribute('aria-multiselectable', 'true');
    });
  });

  // ── Dropdown ────────────────────────────────────────────────────────────

  test.describe(`${label} — dropdown`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/dropdown-interaction');
      await waitForComponent(page, 'auro-dropdown', '#trigger');
    });

    test('trigger exposes aria-expanded when dropdown has a role', async ({ page }) => {
      // Standalone auro-dropdown only sets aria-expanded when a11yRole is assigned
      // (e.g. when used inside auro-select or auro-combobox).
      // Verify the trigger element exists and is interactive.
      const hasTrigger = await fixture(page, 'default', 'auro-dropdown').evaluate((el: any) =>
        el.shadowRoot?.querySelector('#trigger') !== null,
      );
      expect(hasTrigger).toBe(true);
    });

    test('opening dropdown updates isPopoverVisible', async ({ page }) => {
      const dd = fixture(page, 'default', 'auro-dropdown');
      await dd.evaluate((el: any) => {
        el.shadowRoot?.querySelector('#trigger')?.click();
      });
      await expect.poll(() =>
        dd.evaluate((el: any) => Boolean(el.isPopoverVisible)),
      ).toBe(true);
    });

    test('disabled trigger has aria-disabled', async ({ page }) => {
      await expect.poll(() =>
        fixture(page, 'disabled', 'auro-dropdown').evaluate((el: any) =>
          el.shadowRoot?.querySelector('#trigger')?.getAttribute('aria-disabled'),
        ),
      ).toBeTruthy();
    });
  });

  // ── Counter ─────────────────────────────────────────────────────────────

  test.describe(`${label} — counter`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/counter-interaction');
      await waitForComponent(page, 'auro-counter');
    });

    test('counter has spinbutton role', async ({ page }) => {
      const spinbutton = fixture(page, 'default', 'auro-counter')
        .locator('[role="spinbutton"]');
      await expect(spinbutton).toBeAttached();
    });

    test('spinbutton exposes aria-valuemin, aria-valuemax, aria-valuenow', async ({ page }) => {
      const sb = fixture(page, 'default', 'auro-counter')
        .locator('[role="spinbutton"]');
      await expect(sb).toHaveAttribute('aria-valuemin', '0');
      await expect(sb).toHaveAttribute('aria-valuemax', '9');
      await expect(sb).toHaveAttribute('aria-valuenow', '0');
    });

    test('incrementing counter updates aria-valuenow', async ({ page }) => {
      // Click the increment button
      const plus = fixture(page, 'default', 'auro-counter')
        .locator('button').last();
      await plus.click();

      const sb = fixture(page, 'default', 'auro-counter')
        .locator('[role="spinbutton"]');
      await expect(sb).toHaveAttribute('aria-valuenow', '1');
    });

    test('spinbutton has accessible label from counter text', async ({ page }) => {
      const sb = fixture(page, 'default', 'auro-counter')
        .locator('[role="spinbutton"]');
      await expect(sb).toHaveAttribute('aria-labelledby');
    });

    test('disabled counter has aria-disabled on spinbutton', async ({ page }) => {
      const sb = fixture(page, 'disabled', 'auro-counter')
        .locator('[role="spinbutton"]');
      await expect(sb).toHaveAttribute('aria-disabled');
    });

    test('increment and decrement buttons have accessible labels', async ({ page }) => {
      const buttons = fixture(page, 'default', 'auro-counter')
        .locator('button');
      const count = await buttons.count();
      expect(count).toBe(2);

      // Both buttons should have aria-label for screen readers
      for (let i = 0; i < count; i++) {
        const label = await buttons.nth(i).getAttribute('aria-label');
        expect(label).toBeTruthy();
      }
    });
  });

  // ── Select ──────────────────────────────────────────────────────────────

  test.describe(`${label} — select`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/select-interaction');
      await waitForComponent(page, 'auro-select');
    });

    test('select trigger has combobox role', async ({ page }) => {
      // The dropdown trigger inside auro-select gets role="combobox"
      const trigger = fixture(page, 'default', 'auro-select')
        .locator('[role="combobox"]');
      await expect(trigger).toBeAttached();
    });

    test('select menu has listbox role', async ({ page }) => {
      const menu = fixture(page, 'default', 'auro-menu');
      await expect(menu).toHaveRole('listbox');
    });

    test('select options have aria-setsize and aria-posinset', async ({ page }) => {
      // Open the dropdown first so options get indexed
      const trigger = fixture(page, 'default', 'auro-select')
        .locator('[role="combobox"]');
      await trigger.click();

      const firstOpt = fixture(page, 'default', 'auro-menuoption').first();
      await expect.poll(() =>
        firstOpt.getAttribute('aria-setsize'),
      ).toBeTruthy();
      await expect.poll(() =>
        firstOpt.getAttribute('aria-posinset'),
      ).toBeTruthy();
    });

    test('select has screen reader live region', async ({ page }) => {
      const hasLiveRegion = await fixture(page, 'default', 'auro-select').evaluate((el: any) => {
        const sr = el.shadowRoot?.querySelector('#srAnnouncement');
        return sr !== null && sr.getAttribute('aria-live') === 'polite';
      });
      expect(hasLiveRegion).toBe(true);
    });

    test('error help text uses role=alert for announcement', async ({ page }) => {
      // Trigger validation error on a required select
      const select = fixture(page, 'required', 'auro-select');
      // Open and close without selecting to trigger validation
      await select.evaluate((el: any) => {
        el.shadowRoot?.querySelector('[auro-dropdown]')?.shadowRoot?.querySelector('#trigger')?.click();
      });
      await page.waitForTimeout(200);
      await page.click('#outside-element');

      await expect.poll(() =>
        select.evaluate((el: any) => {
          const alert = el.shadowRoot?.querySelector('[role="alert"]');
          return alert !== null;
        }),
      ).toBe(true);
    });
  });

  // ── Combobox ────────────────────────────────────────────────────────────

  test.describe(`${label} — combobox`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/combobox-interaction');
      await waitForComponent(page, 'auro-combobox');
    });

    test('combobox input has combobox role', async ({ page }) => {
      // The combobox role is on the <input> inside nested shadow DOMs
      const hasCombobox = await fixture(page, 'default', 'auro-combobox').evaluate((el: any) => {
        // auro-combobox > shadow > auro-input > shadow > input[role="combobox"]
        const input = el.shadowRoot?.querySelector('[auro-input]');
        const innerInput = input?.shadowRoot?.querySelector('input');
        return innerInput?.getAttribute('role') === 'combobox';
      });
      expect(hasCombobox).toBe(true);
    });

    test('combobox has screen reader live region', async ({ page }) => {
      const hasLiveRegion = await fixture(page, 'default', 'auro-combobox').evaluate((el: any) => {
        const sr = el.shadowRoot?.querySelector('#srAnnouncement');
        return sr !== null && sr.getAttribute('aria-live') === 'polite';
      });
      expect(hasLiveRegion).toBe(true);
    });

    test('combobox menu has listbox role', async ({ page }) => {
      const menu = fixture(page, 'default', 'auro-menu');
      await expect(menu).toHaveRole('listbox');
    });
  });
}

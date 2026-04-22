import { test, expect, type Page, type Locator } from './coverage-fixture';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Wait for auro-menu and auro-menuoption to be registered. */
async function waitForMenu(page: Page) {
  await page.waitForFunction(
    () =>
      customElements.get('auro-menu') !== undefined &&
      customElements.get('auro-menuoption') !== undefined,
    { timeout: 10_000 },
  );
}

/** Return the auro-menu inside a fixture section. */
function menu(page: Page, fixture: string): Locator {
  return page.locator(`[data-testid="${fixture}"] > auro-menu`);
}

/** Return all auro-menuoption elements inside a fixture (top-level only). */
function options(page: Page, fixture: string): Locator {
  return page.locator(`[data-testid="${fixture}"] auro-menuoption`);
}

/** Get the menu's value property. */
function menuValue(page: Page, fixture: string) {
  return menu(page, fixture).evaluate((el: any) => el.value);
}

/** Get the menu's optionSelected property. */
function menuOptionSelected(page: Page, fixture: string) {
  return menu(page, fixture).evaluate((el: any) => {
    const sel = el.optionSelected;
    if (!sel) return null;
    if (Array.isArray(sel)) return sel.map((o: any) => o.value);
    return sel.value;
  });
}

/** Get the selected option's text label. */
function menuCurrentLabel(page: Page, fixture: string) {
  return menu(page, fixture).evaluate((el: any) => el.currentLabel);
}

/** Click a menuoption by its value attribute. */
async function clickOption(page: Page, fixture: string, value: string) {
  await page.locator(`[data-testid="${fixture}"] auro-menuoption[value="${value}"]`).click();
}

// ─── Suite ────────────────────────────────────────────────────────────────────

export function menuInteractionSuite(framework: string) {
  const label = `auro-menu interaction in ${framework}`;

  test.describe(label, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/menu-interaction');
      await waitForMenu(page);
    });

    // ── Mouse click selection ─────────────────────────────────────────────

    test.describe('Mouse click selection', () => {
      test('clicking an option selects it', async ({ page }) => {
        await clickOption(page, 'default', 'Apples');

        await expect.poll(() => menuValue(page, 'default')).toBe('Apples');
      });

      test('clicking a different option replaces selection', async ({ page }) => {
        await clickOption(page, 'default', 'Apples');
        await expect.poll(() => menuValue(page, 'default')).toBe('Apples');

        await clickOption(page, 'default', 'Bananas');
        await expect.poll(() => menuValue(page, 'default')).toBe('Bananas');
      });

      test('selected option gets selected attribute', async ({ page }) => {
        await clickOption(page, 'default', 'Oranges');

        await expect.poll(() =>
          page.locator('[data-testid="default"] auro-menuoption[value="Oranges"]')
            .evaluate((el: any) => el.selected),
        ).toBe(true);
      });

      test('previous option loses selected attribute', async ({ page }) => {
        await clickOption(page, 'default', 'Apples');
        await expect.poll(() => menuValue(page, 'default')).toBe('Apples');

        await clickOption(page, 'default', 'Oranges');

        await expect.poll(() =>
          page.locator('[data-testid="default"] auro-menuoption[value="Apples"]')
            .evaluate((el: any) => el.selected),
        ).toBe(false);
      });

      test('fires selectedOption event on click', async ({ page }) => {
        await menu(page, 'default').evaluate((el: any) => {
          (el as any).__selectedFired = false;
          (el as any).__selectedDetail = null;
          el.addEventListener('auroMenu-selectedOption', (e: any) => {
            (el as any).__selectedFired = true;
            (el as any).__selectedDetail = e.detail;
          }, { once: true });
        });

        await clickOption(page, 'default', 'Grapes');

        await expect.poll(() =>
          menu(page, 'default').evaluate((el: any) => (el as any).__selectedFired),
        ).toBe(true);

        const detail = await menu(page, 'default').evaluate((el: any) => (el as any).__selectedDetail);
        expect(detail.value).toBe('Grapes');
      });
    });

    // ── Disabled options ──────────────────────────────────────────────────

    test.describe('Disabled options', () => {
      test('clicking a disabled option does not select it', async ({ page }) => {
        // Disabled options have pointer-events: none; use force to bypass
        await page.locator('[data-testid="with-disabled"] auro-menuoption[value="DisabledOpt"]')
          .click({ force: true });
        await page.waitForTimeout(300);

        const val = await menuValue(page, 'with-disabled');
        expect(val == null).toBe(true);
      });

      test('disabled option has aria-disabled', async ({ page }) => {
        const ariaDisabled = await page.locator(
          '[data-testid="with-disabled"] auro-menuoption[value="DisabledOpt"]',
        ).getAttribute('aria-disabled');

        expect(ariaDisabled).toBe('true');
      });

      test('clicking enabled option after disabled works', async ({ page }) => {
        await clickOption(page, 'with-disabled', 'Enabled2');

        await expect.poll(() => menuValue(page, 'with-disabled')).toBe('Enabled2');
      });
    });

    // ── Multi-select ──────────────────────────────────────────────────────

    test.describe('Multi-select', () => {
      test('clicking multiple options selects all of them', async ({ page }) => {
        await clickOption(page, 'multiselect', 'Red');
        await clickOption(page, 'multiselect', 'Green');

        await expect.poll(async () => {
          const sel = await menuOptionSelected(page, 'multiselect');
          return Array.isArray(sel) && sel.includes('Red') && sel.includes('Green');
        }).toBe(true);
      });

      test('clicking a selected option deselects it', async ({ page }) => {
        await clickOption(page, 'multiselect', 'Blue');
        await expect.poll(async () => {
          const sel = await menuOptionSelected(page, 'multiselect');
          return Array.isArray(sel) && sel.includes('Blue');
        }).toBe(true);

        await clickOption(page, 'multiselect', 'Blue');

        await expect.poll(async () => {
          const sel = await menuOptionSelected(page, 'multiselect');
          // After deselect, Blue should not be in the array
          if (sel === null || sel === undefined) return true;
          if (Array.isArray(sel)) return !sel.includes('Blue');
          return sel !== 'Blue';
        }).toBe(true);
      });

      test('value is JSON array string in multi-select', async ({ page }) => {
        await clickOption(page, 'multiselect', 'Red');
        await clickOption(page, 'multiselect', 'Yellow');

        await expect.poll(async () => {
          const val = await menuValue(page, 'multiselect');
          try {
            const parsed = JSON.parse(val);
            return Array.isArray(parsed) && parsed.includes('Red') && parsed.includes('Yellow');
          } catch {
            return false;
          }
        }).toBe(true);
      });
    });

    // ── Preset value ──────────────────────────────────────────────────────

    test.describe('Preset value', () => {
      test('preset value selects matching option on load', async ({ page }) => {
        await expect.poll(() => menuValue(page, 'preset')).toBe('Oranges');

        const isSelected = await page.locator(
          '[data-testid="preset"] auro-menuoption[value="Oranges"]',
        ).evaluate((el: any) => el.selected);
        expect(isSelected).toBe(true);
      });

      test('currentLabel reflects preset selection', async ({ page }) => {
        await expect.poll(() => menuCurrentLabel(page, 'preset')).toBe('Oranges');
      });
    });

    // ── Allow deselect ────────────────────────────────────────────────────

    test.describe('Allow deselect', () => {
      test('clicking same option twice deselects it', async ({ page }) => {
        await clickOption(page, 'allow-deselect', 'One');
        await expect.poll(() => menuValue(page, 'allow-deselect')).toBe('One');

        await clickOption(page, 'allow-deselect', 'One');

        await expect.poll(async () => {
          const val = await menuValue(page, 'allow-deselect');
          return val == null || val === '';
        }).toBe(true);
      });

      test('deselect prevented without allowDeselect', async ({ page }) => {
        await menu(page, 'default').evaluate((el: any) => {
          (el as any).__deselectPrevented = false;
          el.addEventListener('auroMenu-deselectPrevented', () => {
            (el as any).__deselectPrevented = true;
          }, { once: true });
        });

        await clickOption(page, 'default', 'Apples');
        await expect.poll(() => menuValue(page, 'default')).toBe('Apples');

        await clickOption(page, 'default', 'Apples');

        await expect.poll(() =>
          menu(page, 'default').evaluate((el: any) => (el as any).__deselectPrevented),
        ).toBe(true);

        // Value should remain
        expect(await menuValue(page, 'default')).toBe('Apples');
      });
    });

    // ── Programmatic navigation ───────────────────────────────────────────

    test.describe('Programmatic navigation', () => {
      test('navigateOptions("down") highlights first option', async ({ page }) => {
        await menu(page, 'default').evaluate((el: any) => el.navigateOptions('down'));

        await expect.poll(() =>
          menu(page, 'default').evaluate((el: any) => el.optionActive?.value),
        ).toBe('Apples');
      });

      test('navigateOptions("down") advances to next option', async ({ page }) => {
        await menu(page, 'default').evaluate((el: any) => {
          el.navigateOptions('down');
          el.navigateOptions('down');
        });

        await expect.poll(() =>
          menu(page, 'default').evaluate((el: any) => el.optionActive?.value),
        ).toBe('Oranges');
      });

      test('navigateOptions("up") wraps from first to last', async ({ page }) => {
        await menu(page, 'default').evaluate((el: any) => {
          el.navigateOptions('down'); // Apples
          el.navigateOptions('up');   // wraps to Grapes
        });

        await expect.poll(() =>
          menu(page, 'default').evaluate((el: any) => el.optionActive?.value),
        ).toBe('Grapes');
      });

      test('navigateOptions skips disabled options', async ({ page }) => {
        await menu(page, 'with-disabled').evaluate((el: any) => {
          el.navigateOptions('down'); // Enabled1
          el.navigateOptions('down'); // skips DisabledOpt → Enabled2
        });

        await expect.poll(() =>
          menu(page, 'with-disabled').evaluate((el: any) => el.optionActive?.value),
        ).toBe('Enabled2');
      });

      test('navigateOptions skips hidden options', async ({ page }) => {
        await menu(page, 'with-hidden').evaluate((el: any) => {
          el.navigateOptions('down'); // Visible1
          el.navigateOptions('down'); // skips HiddenOpt → Visible2
        });

        await expect.poll(() =>
          menu(page, 'with-hidden').evaluate((el: any) => el.optionActive?.value),
        ).toBe('Visible2');
      });

      test('makeSelection selects the active option', async ({ page }) => {
        await menu(page, 'default').evaluate((el: any) => {
          el.navigateOptions('down'); // Apples
          el.navigateOptions('down'); // Oranges
          el.makeSelection();
        });

        await expect.poll(() => menuValue(page, 'default')).toBe('Oranges');
      });

      test('fires activatedOption event on navigate', async ({ page }) => {
        await menu(page, 'default').evaluate((el: any) => {
          (el as any).__activatedFired = false;
          el.addEventListener('auroMenu-activatedOption', () => {
            (el as any).__activatedFired = true;
          }, { once: true });
          el.navigateOptions('down');
        });

        await expect.poll(() =>
          menu(page, 'default').evaluate((el: any) => (el as any).__activatedFired),
        ).toBe(true);
      });
    });

    // ── Reset ─────────────────────────────────────────────────────────────

    test.describe('Reset', () => {
      test('reset() clears selection', async ({ page }) => {
        await clickOption(page, 'default', 'Bananas');
        await expect.poll(() => menuValue(page, 'default')).toBe('Bananas');

        await menu(page, 'default').evaluate((el: any) => el.reset());

        await expect.poll(async () => {
          const val = await menuValue(page, 'default');
          return val == null;
        }).toBe(true);
      });

      test('reset fires selectValueReset event', async ({ page }) => {
        await clickOption(page, 'default', 'Apples');
        await expect.poll(() => menuValue(page, 'default')).toBe('Apples');

        await menu(page, 'default').evaluate((el: any) => {
          (el as any).__resetFired = false;
          el.addEventListener('auroMenu-selectValueReset', () => {
            (el as any).__resetFired = true;
          }, { once: true });
          el.reset();
        });

        await expect.poll(() =>
          menu(page, 'default').evaluate((el: any) => (el as any).__resetFired),
        ).toBe(true);
      });
    });

    // ── No checkmark ──────────────────────────────────────────────────────

    test.describe('No checkmark', () => {
      test('selected option in noCheckmark menu has no check icon', async ({ page }) => {
        await clickOption(page, 'no-checkmark', 'Alpha');
        await expect.poll(() => menuValue(page, 'no-checkmark')).toBe('Alpha');

        const hasIcon = await page.locator(
          '[data-testid="no-checkmark"] auro-menuoption[value="Alpha"]',
        ).evaluate((el: any) => {
          const icon = el.shadowRoot.querySelector('[category="interface"][name="check-sm"]');
          return icon !== null;
        });
        expect(hasIcon).toBe(false);
      });
    });

    // ── Nested menu ───────────────────────────────────────────────────────

    test.describe('Nested menu', () => {
      test('clicking child option in nested menu selects it on root', async ({ page }) => {
        // Ensure the menuoption's context consumer has wired up menuService
        await expect.poll(() =>
          page.locator('[data-testid="nested"] auro-menuoption[value="Child1"]')
            .evaluate((el: any) => el.menuService != null),
          { timeout: 5_000 },
        ).toBe(true);

        await clickOption(page, 'nested', 'Child1');

        await expect.poll(() => menuValue(page, 'nested'), { timeout: 5_000 }).toBe('Child1');
      });

      test('clicking parent-level option still works', async ({ page }) => {
        // Ensure the menuoption's context consumer has wired up menuService
        await expect.poll(() =>
          page.locator('[data-testid="nested"] auro-menuoption[value="Parent1"]')
            .evaluate((el: any) => el.menuService != null),
          { timeout: 5_000 },
        ).toBe(true);

        await clickOption(page, 'nested', 'Parent1');

        await expect.poll(() => menuValue(page, 'nested'), { timeout: 5_000 }).toBe('Parent1');
      });

      test('navigation traverses into nested menu', async ({ page }) => {
        // Navigate: Parent1 → Child1 → Child2 → Parent2
        await menu(page, 'nested').evaluate((el: any) => {
          el.navigateOptions('down'); // Parent1
          el.navigateOptions('down'); // Child1
          el.navigateOptions('down'); // Child2
          el.navigateOptions('down'); // Parent2
        });

        await expect.poll(() =>
          menu(page, 'nested').evaluate((el: any) => el.optionActive?.value),
        ).toBe('Parent2');
      });
    });

    // ── ARIA attributes ───────────────────────────────────────────────────

    test.describe('ARIA attributes', () => {
      test('option gets aria-selected when selected', async ({ page }) => {
        await clickOption(page, 'default', 'Apples');

        await expect.poll(() =>
          page.locator('[data-testid="default"] auro-menuoption[value="Apples"]')
            .getAttribute('aria-selected'),
        ).toBe('true');
      });

      test('multiselect menu has aria-multiselectable', async ({ page }) => {
        const attr = await menu(page, 'multiselect').getAttribute('aria-multiselectable');
        expect(attr).toBe('true');
      });
    });
  });
}

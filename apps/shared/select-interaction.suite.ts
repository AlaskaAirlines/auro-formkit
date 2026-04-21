import { test, expect, type Page, type Locator } from './coverage-fixture';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Wait for auro-select custom element to be fully registered. */
async function waitForSelect(page: Page) {
  await page.waitForFunction(
    () => customElements.get('auro-select') !== undefined,
    { timeout: 10_000 },
  );
}

/** Return the select element scoped to a data-testid section. */
function select(page: Page, fixture: string): Locator {
  return page.locator(`[data-testid="${fixture}"] auro-select`);
}

/** Focus the select trigger via click. */
async function openBib(page: Page, fixture: string) {
  // Click the trigger to open — select opens on trigger click, not on typing
  await select(page, fixture).evaluate((el: any) => {
    const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
    const trigger = dropdown.querySelector('[slot="trigger"]');
    trigger.click();
  });
}

/** Check whether the dropdown bib is visible. */
function isBibVisible(page: Page, fixture: string) {
  return select(page, fixture).evaluate((el: any) => {
    const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
    return Boolean(dropdown?.isPopoverVisible);
  });
}

/** Get the value of the currently active option. */
function activeOptionValue(page: Page, fixture: string) {
  return select(page, fixture).evaluate(
    (el: any) => el.optionActive?.value ?? null,
  );
}

/** Get the select's selected value. */
function selectValue(page: Page, fixture: string) {
  return select(page, fixture).evaluate((el: any) => el.value);
}

/** Wait for the dropdown bib to become visible. */
async function waitForBibOpen(page: Page, fixture: string) {
  await expect.poll(() => isBibVisible(page, fixture), { timeout: 5_000 }).toBe(true);
}

/** Wait for the dropdown bib to close. */
async function waitForBibClosed(page: Page, fixture: string) {
  await expect.poll(() => isBibVisible(page, fixture), { timeout: 5_000 }).toBe(false);
}

/** Focus the select's trigger element (without opening). */
async function focusTrigger(page: Page, fixture: string) {
  await select(page, fixture).evaluate((el: any) => {
    const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
    dropdown.trigger.focus();
  });
  // Confirm focus landed on the trigger
  await expect.poll(() =>
    select(page, fixture).evaluate((el: any) => {
      const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
      return document.activeElement === dropdown.trigger ||
             dropdown.trigger?.matches(':focus');
    }),
    { timeout: 5_000 },
  ).toBe(true);
}

// ─── Suite ────────────────────────────────────────────────────────────────────

interface SuiteOptions {
  route: string;
}

export function selectInteractionSuite(framework: string, options?: SuiteOptions) {
  const route = options?.route ?? '/select-interaction';
  const label = `auro-select interaction in ${framework}`;

  // ─── Desktop tests ────────────────────────────────────────────────────────

  test.describe(`${label} — desktop`, () => {
    test.use({ viewport: { width: 1280, height: 800 } });

    test.beforeEach(async ({ page }) => {
      await page.goto(route);
      await waitForSelect(page);
    });

    // ── Keyboard Navigation ───────────────────────────────────────────────

    test.describe('Keyboard Navigation', () => {
      test('ArrowDown / ArrowUp cycle through options', async ({ page }) => {
        await openBib(page, 'default');
        await waitForBibOpen(page, 'default');

        // Wait for the menu to fully initialize its active option before pressing keys
        await expect.poll(() => activeOptionValue(page, 'default'), { timeout: 5_000 }).toBe('Apples');

        await page.keyboard.press('ArrowDown');
        await expect.poll(() => activeOptionValue(page, 'default')).toBe('Oranges');

        await page.keyboard.press('ArrowDown');
        await expect.poll(() => activeOptionValue(page, 'default')).toBe('Bananas');

        await page.keyboard.press('ArrowUp');
        await expect.poll(() => activeOptionValue(page, 'default')).toBe('Oranges');
      });

      test('ArrowDown / ArrowUp navigate nested menus', async ({ page }) => {
        await openBib(page, 'nested');
        await waitForBibOpen(page, 'nested');

        await expect.poll(() => activeOptionValue(page, 'nested')).toBe('option 1');

        await page.keyboard.press('ArrowDown');
        await expect.poll(() => activeOptionValue(page, 'nested')).toBe('option a');

        await page.keyboard.press('ArrowDown');
        await expect.poll(() => activeOptionValue(page, 'nested')).toBe('option b');

        await page.keyboard.press('ArrowDown');
        await expect.poll(() => activeOptionValue(page, 'nested')).toBe('option 2');

        await page.keyboard.press('ArrowUp');
        await expect.poll(() => activeOptionValue(page, 'nested')).toBe('option b');
      });

      test('Alt+ArrowDown jumps to the last option', async ({ page }) => {
        await openBib(page, 'default');
        await waitForBibOpen(page, 'default');
        await expect.poll(() => activeOptionValue(page, 'default'), { timeout: 5_000 }).toBe('Apples');

        await page.keyboard.press('Alt+ArrowDown');
        await expect.poll(() => activeOptionValue(page, 'default')).toBe('Grapes');
      });

      test('Meta+ArrowDown jumps to the last option', async ({ page }) => {
        await openBib(page, 'default');
        await waitForBibOpen(page, 'default');
        await expect.poll(() => activeOptionValue(page, 'default'), { timeout: 5_000 }).toBe('Apples');

        await page.keyboard.press('Meta+ArrowDown');
        await expect.poll(() => activeOptionValue(page, 'default')).toBe('Grapes');
      });

      test('Alt+ArrowUp jumps to the first option', async ({ page }) => {
        await openBib(page, 'default');
        await waitForBibOpen(page, 'default');
        await expect.poll(() => activeOptionValue(page, 'default'), { timeout: 5_000 }).toBe('Apples');

        // Navigate away first
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');

        await page.keyboard.press('Alt+ArrowUp');
        await expect.poll(() => activeOptionValue(page, 'default')).toBe('Apples');
      });

      test('Meta+ArrowUp jumps to the first option', async ({ page }) => {
        await openBib(page, 'default');
        await waitForBibOpen(page, 'default');
        await expect.poll(() => activeOptionValue(page, 'default'), { timeout: 5_000 }).toBe('Apples');

        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');

        await page.keyboard.press('Meta+ArrowUp');
        await expect.poll(() => activeOptionValue(page, 'default')).toBe('Apples');
      });

      test('Home jumps to the first option', async ({ page }) => {
        await openBib(page, 'default');
        await waitForBibOpen(page, 'default');
        await expect.poll(() => activeOptionValue(page, 'default'), { timeout: 5_000 }).toBe('Apples');

        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');

        await page.keyboard.press('Home');
        await expect.poll(() => activeOptionValue(page, 'default')).toBe('Apples');
      });

      test('End jumps to the last option', async ({ page }) => {
        await openBib(page, 'default');
        await waitForBibOpen(page, 'default');
        await expect.poll(() => activeOptionValue(page, 'default'), { timeout: 5_000 }).toBe('Apples');

        await page.keyboard.press('End');
        await expect.poll(() => activeOptionValue(page, 'default')).toBe('Grapes');
      });

      test('Home skips disabled first option', async ({ page }) => {
        await openBib(page, 'disabled-first');
        await waitForBibOpen(page, 'disabled-first');
        await expect.poll(() => activeOptionValue(page, 'disabled-first'), { timeout: 5_000 }).not.toBeNull();

        // Navigate away first
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');

        await page.keyboard.press('Home');
        // Should skip disabled 'Apples' and land on 'Oranges'
        await expect.poll(() => activeOptionValue(page, 'disabled-first')).toBe('Oranges');
      });

      test('End skips disabled last option', async ({ page }) => {
        await openBib(page, 'disabled-last');
        await waitForBibOpen(page, 'disabled-last');
        await expect.poll(() => activeOptionValue(page, 'disabled-last'), { timeout: 5_000 }).not.toBeNull();

        await page.keyboard.press('End');
        // Should skip disabled 'Grapes' and land on 'Bananas'
        await expect.poll(() => activeOptionValue(page, 'disabled-last')).toBe('Bananas');
      });

      test('Meta+ArrowDown skips disabled last option', async ({ page }) => {
        await openBib(page, 'disabled-last');
        await waitForBibOpen(page, 'disabled-last');
        await expect.poll(() => activeOptionValue(page, 'disabled-last'), { timeout: 5_000 }).not.toBeNull();

        await page.keyboard.press('Meta+ArrowDown');
        await expect.poll(() => activeOptionValue(page, 'disabled-last')).toBe('Bananas');
      });

      test('Alt+ArrowDown skips disabled last option', async ({ page }) => {
        await openBib(page, 'disabled-last');
        await waitForBibOpen(page, 'disabled-last');
        await expect.poll(() => activeOptionValue(page, 'disabled-last'), { timeout: 5_000 }).not.toBeNull();

        await page.keyboard.press('Alt+ArrowDown');
        await expect.poll(() => activeOptionValue(page, 'disabled-last')).toBe('Bananas');
      });

      test('ArrowDown opens the bib when collapsed', async ({ page }) => {
        await focusTrigger(page, 'default');
        await page.keyboard.press('ArrowDown');
        await waitForBibOpen(page, 'default');
      });

      test('ArrowUp opens the bib when collapsed', async ({ page }) => {
        await focusTrigger(page, 'default');
        await page.keyboard.press('ArrowUp');
        await waitForBibOpen(page, 'default');
      });

      test('Enter opens the bib when collapsed', async ({ page }) => {
        await focusTrigger(page, 'default');
        await page.keyboard.press('Enter');
        await waitForBibOpen(page, 'default');
      });

      test('Space toggles the bib open and closed', async ({ page }) => {
        await focusTrigger(page, 'default');

        await page.keyboard.press('Space');
        await waitForBibOpen(page, 'default');

        await page.keyboard.press('Space');
        await waitForBibClosed(page, 'default');
      });

      test('Enter selects the active option and closes the bib', async ({ page }) => {
        await openBib(page, 'default');
        await waitForBibOpen(page, 'default');
        await expect.poll(() => activeOptionValue(page, 'default'), { timeout: 5_000 }).toBe('Apples');

        await page.keyboard.press('ArrowDown');
        await expect.poll(() => activeOptionValue(page, 'default')).toBe('Oranges');

        await page.keyboard.press('Enter');
        await waitForBibClosed(page, 'default');
        await expect.poll(() => selectValue(page, 'default')).toBe('Oranges');
      });

      test('Tab selects the active option and closes the bib', async ({ page }) => {
        await openBib(page, 'default');
        await waitForBibOpen(page, 'default');
        await expect.poll(() => activeOptionValue(page, 'default'), { timeout: 5_000 }).toBe('Apples');

        await page.keyboard.press('ArrowDown');
        await expect.poll(() => activeOptionValue(page, 'default')).toBe('Oranges');

        await page.keyboard.press('Tab');
        await waitForBibClosed(page, 'default');
        await expect.poll(() => selectValue(page, 'default')).toBe('Oranges');
      });

      test('Shift+Tab selects the active option and closes the bib', async ({ page }) => {
        await openBib(page, 'default');
        await waitForBibOpen(page, 'default');
        await expect.poll(() => activeOptionValue(page, 'default'), { timeout: 5_000 }).toBe('Apples');

        await page.keyboard.press('ArrowDown');
        await expect.poll(() => activeOptionValue(page, 'default')).toBe('Oranges');

        await page.keyboard.press('Shift+Tab');
        await waitForBibClosed(page, 'default');
        await expect.poll(() => selectValue(page, 'default')).toBe('Oranges');
      });

      test('Escape closes the bib without making a selection', async ({ page }) => {
        await openBib(page, 'default');
        await waitForBibOpen(page, 'default');

        await page.keyboard.press('ArrowDown');

        await page.keyboard.press('Escape');
        await waitForBibClosed(page, 'default');

        const value = await selectValue(page, 'default');
        expect(value).toBeUndefined();
      });

      test('Escape is a no-op when the bib is already closed', async ({ page }) => {
        await page.keyboard.press('Escape');
        await page.waitForTimeout(50);

        const visible = await isBibVisible(page, 'default');
        expect(visible).toBe(false);
      });

      test('Home is a no-op when the bib is collapsed', async ({ page }) => {
        await focusTrigger(page, 'default');
        await page.keyboard.press('Home');
        await page.waitForTimeout(50);

        const visible = await isBibVisible(page, 'default');
        expect(visible).toBe(false);
      });

      test('End is a no-op when the bib is collapsed', async ({ page }) => {
        await focusTrigger(page, 'default');
        await page.keyboard.press('End');
        await page.waitForTimeout(50);

        const visible = await isBibVisible(page, 'default');
        expect(visible).toBe(false);
      });

      test('Shift+Tab is a no-op when the bib is closed', async ({ page }) => {
        await focusTrigger(page, 'default');
        await page.keyboard.press('Shift+Tab');
        await page.waitForTimeout(50);

        const value = await selectValue(page, 'default');
        expect(value).toBeUndefined();
      });

      test('Tab in multiselect selects the active option and closes', async ({ page }) => {
        await openBib(page, 'multiselect');
        await waitForBibOpen(page, 'multiselect');

        // Navigate to first option and select it
        await page.keyboard.press('Enter');
        await expect.poll(() => isBibVisible(page, 'multiselect')).toBe(true);

        // Tab to close and commit
        await page.keyboard.press('Tab');
        await waitForBibClosed(page, 'multiselect');
      });
    });

    // ── Type-ahead cycling ────────────────────────────────────────────────

    test.describe('Type-ahead cycling', () => {
      test('selects the first option matching the pressed key', async ({ page }) => {
        await focusTrigger(page, 'typeahead');

        await page.keyboard.press('b');

        await expect.poll(() => activeOptionValue(page, 'typeahead')).toBe('Banana');
      });

      test('cycles through options with the same starting letter', async ({ page }) => {
        await focusTrigger(page, 'typeahead');

        await page.keyboard.press('a');
        await expect.poll(() => activeOptionValue(page, 'typeahead')).toBe('Apple');

        await page.keyboard.press('a');
        await expect.poll(() => activeOptionValue(page, 'typeahead')).toBe('Apricot');

        await page.keyboard.press('a');
        await expect.poll(() => activeOptionValue(page, 'typeahead')).toBe('Avocado');

        // Wraps back to Apple
        await page.keyboard.press('a');
        await expect.poll(() => activeOptionValue(page, 'typeahead')).toBe('Apple');
      });

      test('does nothing when no option matches the pressed key', async ({ page }) => {
        await focusTrigger(page, 'typeahead');

        // Press 'a' to activate Apple
        await page.keyboard.press('a');
        await expect.poll(() => activeOptionValue(page, 'typeahead')).toBe('Apple');

        // Press 'z' — no match, should stay on Apple
        await page.keyboard.press('z');
        await expect.poll(() => activeOptionValue(page, 'typeahead')).toBe('Apple');
      });
    });

    // ── Multi-select keyboard interaction ─────────────────────────────────

    test.describe('Multi-select keyboard interaction', () => {
      test('Enter keeps the bib open in multiselect mode', async ({ page }) => {
        await openBib(page, 'multiselect');
        await waitForBibOpen(page, 'multiselect');

        await page.keyboard.press('Enter');
        // Bib should remain open
        await expect.poll(() => isBibVisible(page, 'multiselect')).toBe(true);
      });

      test('can select multiple items then Tab to close', async ({ page }) => {
        await openBib(page, 'multiselect');
        await waitForBibOpen(page, 'multiselect');

        // Select first option (Apples)
        await page.keyboard.press('Enter');
        await expect.poll(() => isBibVisible(page, 'multiselect')).toBe(true);

        // Move to Oranges and select
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');
        await expect.poll(() => isBibVisible(page, 'multiselect')).toBe(true);

        // Tab to close
        await page.keyboard.press('Tab');
        await waitForBibClosed(page, 'multiselect');

        const value = await selectValue(page, 'multiselect');
        expect(value).toBeDefined();
      });
    });

    // ── Click outside to close ────────────────────────────────────────────

    test.describe('Click outside to close', () => {
      test('closes the bib when clicking an element outside the select', async ({ page }) => {
        await openBib(page, 'default');
        await waitForBibOpen(page, 'default');

        await page.locator('#outside-element').click();

        await waitForBibClosed(page, 'default');
      });

      test('does not make a selection when clicking outside', async ({ page }) => {
        await openBib(page, 'default');
        await waitForBibOpen(page, 'default');

        await page.locator('#outside-element').click();
        await waitForBibClosed(page, 'default');

        const value = await selectValue(page, 'default');
        expect(value).toBeUndefined();
      });
    });

    // ── Mouse interaction ─────────────────────────────────────────────────

    test.describe('Mouse interaction', () => {
      test('clicking the trigger toggles the bib open and closed', async ({ page }) => {
        // Click to open
        await openBib(page, 'default');
        await waitForBibOpen(page, 'default');

        // Click to close
        await openBib(page, 'default');
        await waitForBibClosed(page, 'default');
      });

      test('clicking an option selects it and closes the bib', async ({ page }) => {
        await openBib(page, 'default');
        await waitForBibOpen(page, 'default');

        await page.waitForTimeout(50);

        await select(page, 'default').evaluate((el: any) => {
          const menu = el.querySelector('auro-menu');
          const option = menu.querySelector('auro-menuoption[value="Oranges"]');
          option.click();
        });

        await waitForBibClosed(page, 'default');
        await expect.poll(() => selectValue(page, 'default')).toBe('Oranges');
      });

      test('clicking a disabled option does not select or close the bib', async ({ page }) => {
        await openBib(page, 'disabled-first');
        await waitForBibOpen(page, 'disabled-first');

        await page.waitForTimeout(50);

        await select(page, 'disabled-first').evaluate((el: any) => {
          const menu = el.querySelector('auro-menu');
          const option = menu.querySelector('auro-menuoption[disabled]');
          option.click();
        });

        await page.waitForTimeout(100);

        const visible = await isBibVisible(page, 'disabled-first');
        expect(visible).toBe(true);

        const value = await selectValue(page, 'disabled-first');
        expect(value).toBeUndefined();
      });

      test('clicking an option in multiselect selects it and keeps the bib open', async ({ page }) => {
        await openBib(page, 'multiselect');
        await waitForBibOpen(page, 'multiselect');

        await page.waitForTimeout(50);

        await select(page, 'multiselect').evaluate((el: any) => {
          const menu = el.querySelector('auro-menu');
          const option = menu.querySelector('auro-menuoption[value="Apples"]');
          option.click();
        });

        await page.waitForTimeout(100);

        // Bib should stay open
        const visible = await isBibVisible(page, 'multiselect');
        expect(visible).toBe(true);

        // Value should be set
        const value = await selectValue(page, 'multiselect');
        expect(value).toBeDefined();
      });

      test('clicking an already-selected option in multiselect deselects it', async ({ page }) => {
        await openBib(page, 'multiselect');
        await waitForBibOpen(page, 'multiselect');

        await page.waitForTimeout(50);

        // Select Apples
        await select(page, 'multiselect').evaluate((el: any) => {
          const menu = el.querySelector('auro-menu');
          menu.querySelector('auro-menuoption[value="Apples"]').click();
        });

        await page.waitForTimeout(100);

        // Click Apples again to deselect
        await select(page, 'multiselect').evaluate((el: any) => {
          const menu = el.querySelector('auro-menu');
          menu.querySelector('auro-menuoption[value="Apples"]').click();
        });

        await page.waitForTimeout(100);

        // Bib should remain open
        const visible = await isBibVisible(page, 'multiselect');
        expect(visible).toBe(true);

        // Value should be cleared after deselect
        const selected = await select(page, 'multiselect').evaluate((el: any) => {
          const s = el.optionSelected;
          return Array.isArray(s) ? s.length : (s ? 1 : 0);
        });
        expect(selected).toBe(0);
      });

      test('clicking a disabled option in multiselect does nothing', async ({ page }) => {
        await openBib(page, 'disabled-multi');
        await waitForBibOpen(page, 'disabled-multi');

        await page.waitForTimeout(50);

        // Click the disabled option
        await select(page, 'disabled-multi').evaluate((el: any) => {
          const menu = el.querySelector('auro-menu');
          const option = menu.querySelector('auro-menuoption[disabled]');
          option.click();
        });

        await page.waitForTimeout(100);

        const visible = await isBibVisible(page, 'disabled-multi');
        expect(visible).toBe(true);

        const value = await selectValue(page, 'disabled-multi');
        expect(value).toBeUndefined();
      });
    });

    // ── Trigger focus return after selection ──────────────────────────────

    test.describe('Focus management', () => {
      test('returns focus to the trigger after selecting an option via Enter', async ({ page }) => {
        await openBib(page, 'default');
        await waitForBibOpen(page, 'default');

        await page.keyboard.press('Enter');
        await waitForBibClosed(page, 'default');

        // Check focus is on the trigger
        const isTriggerFocused = await select(page, 'default').evaluate((el: any) => {
          const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
          return dropdown.trigger.matches(':focus');
        });
        expect(isTriggerFocused).toBe(true);
      });

      test('returns focus to the trigger after selecting an option via click', async ({ page }) => {
        await openBib(page, 'default');
        await waitForBibOpen(page, 'default');

        // Wait for internal settle
        await page.waitForTimeout(50);

        // Click an option
        await select(page, 'default').evaluate((el: any) => {
          const menu = el.querySelector('auro-menu');
          const option = menu.querySelector('auro-menuoption[value="Oranges"]');
          option.click();
        });
        await waitForBibClosed(page, 'default');

        const isTriggerFocused = await select(page, 'default').evaluate((el: any) => {
          const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
          return dropdown.trigger.matches(':focus');
        });
        expect(isTriggerFocused).toBe(true);
      });
    });

    // ── Screen reader announcements ───────────────────────────────────────

    test.describe('Screen reader announcements', () => {
      test('populates live region when type-ahead activates an option', async ({ page }) => {
        await focusTrigger(page, 'typeahead');

        await page.keyboard.press('a');

        await expect.poll(async () => {
          return select(page, 'typeahead').evaluate((el: any) => {
            const root = el.shadowRoot;
            const liveRegion = root?.querySelector('#srAnnouncement');
            return liveRegion?.textContent ?? '';
          });
        }, { timeout: 3_000 }).not.toBe('');
      });

      test('clears live region after announcement duration', async ({ page }) => {
        await focusTrigger(page, 'typeahead');

        await page.keyboard.press('a');

        // Wait for announcement to appear
        await expect.poll(async () => {
          return select(page, 'typeahead').evaluate((el: any) => {
            const root = el.shadowRoot;
            return root?.querySelector('#srAnnouncement')?.textContent ?? '';
          });
        }, { timeout: 3_000 }).not.toBe('');

        // Wait for it to be cleared (~1000ms timer)
        await expect.poll(async () => {
          return select(page, 'typeahead').evaluate((el: any) => {
            const root = el.shadowRoot;
            return root?.querySelector('#srAnnouncement')?.textContent ?? '';
          });
        }, { timeout: 5_000 }).toBe('');
      });
    });
  });

  // ─── Mobile / fullscreen tests ──────────────────────────────────────────

  test.describe(`${label} — fullscreen mobile`, () => {
    test.use({ viewport: { width: 390, height: 844 } }); // iPhone 14

    test.beforeEach(async ({ page }) => {
      await page.goto(route);
      await waitForSelect(page);
    });

    test('opens fullscreen dialog on mobile viewport', async ({ page }) => {
      await openBib(page, 'default');
      await waitForBibOpen(page, 'default');

      const isFullscreen = await select(page, 'default').evaluate((el: any) => {
        const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
        return Boolean(dropdown?.isBibFullscreen);
      });
      expect(isFullscreen).toBe(true);
    });

    test('keyboard navigation works in fullscreen mode', async ({ page }) => {
      await openBib(page, 'default');
      await waitForBibOpen(page, 'default');

      // Wait for fullscreen to settle
      await expect.poll(async () =>
        select(page, 'default').evaluate((el: any) => {
          const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
          return Boolean(dropdown?.isBibFullscreen);
        }),
      ).toBe(true);

      await page.keyboard.press('ArrowDown');
      await expect.poll(() => activeOptionValue(page, 'default')).toBe('Oranges');
    });

    test('Enter selects option and closes fullscreen dialog', async ({ page }) => {
      await openBib(page, 'default');
      await waitForBibOpen(page, 'default');
      await expect.poll(() => activeOptionValue(page, 'default'), { timeout: 5_000 }).toBe('Apples');

      await page.keyboard.press('ArrowDown');
      await expect.poll(() => activeOptionValue(page, 'default')).toBe('Oranges');

      await page.keyboard.press('Enter');
      await waitForBibClosed(page, 'default');
      await expect.poll(() => selectValue(page, 'default')).toBe('Oranges');
    });

    test('Escape closes the fullscreen dialog', async ({ page }) => {
      await openBib(page, 'default');
      await waitForBibOpen(page, 'default');

      await page.keyboard.press('Escape');
      await waitForBibClosed(page, 'default');
    });

    test('Tab closes the fullscreen dialog', async ({ page }) => {
      await openBib(page, 'default');
      await waitForBibOpen(page, 'default');

      await page.keyboard.press('Tab');
      await waitForBibClosed(page, 'default');
    });

    test('trigger is set to inert while fullscreen dialog is open', async ({ page }) => {
      await openBib(page, 'default');
      await waitForBibOpen(page, 'default');

      await expect.poll(async () =>
        select(page, 'default').evaluate((el: any) => {
          const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
          return Boolean(dropdown?.isBibFullscreen);
        }),
      ).toBe(true);

      const triggerInert = await select(page, 'default').evaluate((el: any) => {
        const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
        return dropdown.trigger.inert;
      });
      expect(triggerInert).toBe(true);
    });

    test('trigger inert and focus are restored after fullscreen dialog closes', async ({ page }) => {
      await openBib(page, 'default');
      await waitForBibOpen(page, 'default');

      await expect.poll(async () =>
        select(page, 'default').evaluate((el: any) => {
          const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
          return Boolean(dropdown?.isBibFullscreen);
        }),
      ).toBe(true);

      // Verify trigger is inert while open
      await expect.poll(async () =>
        select(page, 'default').evaluate((el: any) => {
          const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
          return dropdown.trigger.inert;
        }),
      ).toBe(true);

      // Close via Escape
      await page.keyboard.press('Escape');
      await waitForBibClosed(page, 'default');

      // Trigger should no longer be inert
      await expect.poll(async () =>
        select(page, 'default').evaluate((el: any) => {
          const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
          return dropdown.trigger.inert;
        }),
      ).toBe(false);

      // Verify popover is closed
      await expect.poll(async () =>
        select(page, 'default').evaluate((el: any) => {
          const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
          return dropdown.isPopoverVisible;
        }),
      ).toBe(false);
    });

    test('screen reader announcements route to bib live region in fullscreen', async ({ page }) => {
      await openBib(page, 'default');
      await waitForBibOpen(page, 'default');

      // Wait for fullscreen to settle
      await expect.poll(async () =>
        select(page, 'default').evaluate((el: any) => {
          const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
          return Boolean(dropdown?.isBibFullscreen);
        }),
      ).toBe(true);

      await page.keyboard.press('ArrowDown');

      // Check announcement in either bib or host live region
      await expect.poll(async () => {
        return select(page, 'default').evaluate((el: any) => {
          const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
          const bibEl = dropdown?.bibElement?.value;
          const bibLiveRegion = bibEl?.shadowRoot?.querySelector('#srAnnouncement');
          const hostLiveRegion = el.shadowRoot?.querySelector('#srAnnouncement');
          const bibText = bibLiveRegion?.textContent ?? '';
          const hostText = hostLiveRegion?.textContent ?? '';
          return bibText || hostText;
        });
      }, { timeout: 3_000 }).not.toBe('');
    });
  });
}

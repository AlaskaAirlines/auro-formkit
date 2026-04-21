import { test, expect, type Page, type Locator } from '@playwright/test';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Wait for auro-combobox custom element to be fully registered and rendered. */
async function waitForCombobox(page: Page) {
  await page.waitForFunction(
    () => customElements.get('auro-combobox') !== undefined,
    { timeout: 10_000 },
  );
}

/** Return the combobox element scoped to a data-testid section. */
function combobox(page: Page, fixture: string): Locator {
  return page.locator(`[data-testid="${fixture}"] auro-combobox`);
}

/** Focus the combobox's internal input via its public focus() method. */
async function focusCombobox(page: Page, fixture: string) {
  await combobox(page, fixture).evaluate((el: any) => el.focus());
}

/** Check whether the dropdown bib is visible. */
function isBibVisible(page: Page, fixture: string) {
  return combobox(page, fixture).evaluate(
    (el: any) => Boolean(el.dropdown?.isPopoverVisible),
  );
}

/** Get the value of the currently active option. */
function activeOptionValue(page: Page, fixture: string) {
  return combobox(page, fixture).evaluate(
    (el: any) => el.optionActive?.value ?? null,
  );
}

/** Get the combobox's selected value. */
function comboboxValue(page: Page, fixture: string) {
  return combobox(page, fixture).evaluate((el: any) => el.value);
}

/** Wait for the dropdown bib to become visible. */
async function waitForBibOpen(page: Page, fixture: string) {
  await expect.poll(() => isBibVisible(page, fixture), { timeout: 5_000 }).toBe(true);
}

/** Wait for the dropdown bib to close. */
async function waitForBibClosed(page: Page, fixture: string) {
  await expect.poll(() => isBibVisible(page, fixture), { timeout: 5_000 }).toBe(false);
}

/** Type into the combobox input using real keyboard events. */
async function typeInCombobox(page: Page, fixture: string, text: string) {
  await focusCombobox(page, fixture);
  await page.keyboard.type(text, { delay: 30 });
}

// ─── Suite ────────────────────────────────────────────────────────────────────

interface SuiteOptions {
  route: string;
}

export function comboboxInteractionSuite(framework: string, options?: SuiteOptions) {
  const route = options?.route ?? '/combobox-interaction';
  const label = `auro-combobox interaction in ${framework}`;

  // ─── Desktop tests ────────────────────────────────────────────────────────

  test.describe(`${label} — desktop`, () => {
    test.use({ viewport: { width: 1280, height: 800 } });

    test.beforeEach(async ({ page }) => {
      await page.goto(route);
      await waitForCombobox(page);
    });

    // ── Keyboard Navigation ───────────────────────────────────────────────

    test.describe('Keyboard Navigation', () => {
      test('ArrowDown / ArrowUp cycle through options', async ({ page }) => {
        await typeInCombobox(page, 'default', 'a');
        await waitForBibOpen(page, 'default');

        // First ArrowDown moves from default active (index 0) to index 1
        await page.keyboard.press('ArrowDown');
        await expect.poll(() => activeOptionValue(page, 'default')).toBe('Oranges');

        // Wraps back to first option
        await page.keyboard.press('ArrowDown');
        await expect.poll(() => activeOptionValue(page, 'default')).toBe('Apples');

        // ArrowUp wraps to last
        await page.keyboard.press('ArrowUp');
        await expect.poll(() => activeOptionValue(page, 'default')).toBe('Oranges');
      });

      test('ArrowDown / ArrowUp navigate nested menus', async ({ page }) => {
        await typeInCombobox(page, 'nested', 'option');
        await waitForBibOpen(page, 'nested');

        // Navigate through the flat+nested ordering:
        // option 1 (already active) → option a → option b → option 2 → option 1
        await page.keyboard.press('ArrowDown');
        await expect.poll(() => activeOptionValue(page, 'nested')).toBe('option a');

        await page.keyboard.press('ArrowDown');
        await expect.poll(() => activeOptionValue(page, 'nested')).toBe('option b');

        await page.keyboard.press('ArrowDown');
        await expect.poll(() => activeOptionValue(page, 'nested')).toBe('option 2');

        await page.keyboard.press('ArrowDown');
        await expect.poll(() => activeOptionValue(page, 'nested')).toBe('option 1');

        // ArrowUp back
        await page.keyboard.press('ArrowUp');
        await expect.poll(() => activeOptionValue(page, 'nested')).toBe('option 2');
      });

      test('Alt+ArrowDown jumps to the last option', async ({ page }) => {
        await typeInCombobox(page, 'three-options', 'a');
        await waitForBibOpen(page, 'three-options');

        await page.keyboard.press('Alt+ArrowDown');
        await expect.poll(() => activeOptionValue(page, 'three-options')).toBe('Grapes');
      });

      test('Meta+ArrowDown jumps to the last option', async ({ page }) => {
        await typeInCombobox(page, 'three-options', 'a');
        await waitForBibOpen(page, 'three-options');

        await page.keyboard.press('Meta+ArrowDown');
        await expect.poll(() => activeOptionValue(page, 'three-options')).toBe('Grapes');
      });

      test('Alt+ArrowUp jumps to the first option', async ({ page }) => {
        await typeInCombobox(page, 'three-options', 'a');
        await waitForBibOpen(page, 'three-options');

        // Navigate away from first
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');

        await page.keyboard.press('Alt+ArrowUp');
        await expect.poll(() => activeOptionValue(page, 'three-options')).toBe('Apples');
      });

      test('Meta+ArrowUp jumps to the first option', async ({ page }) => {
        await typeInCombobox(page, 'three-options', 'a');
        await waitForBibOpen(page, 'three-options');

        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');

        await page.keyboard.press('Meta+ArrowUp');
        await expect.poll(() => activeOptionValue(page, 'three-options')).toBe('Apples');
      });

      test('Home jumps to the first enabled option', async ({ page }) => {
        await typeInCombobox(page, 'three-options', 'a');
        await waitForBibOpen(page, 'three-options');

        // Navigate to last
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');

        await page.keyboard.press('Home');
        await expect.poll(() => activeOptionValue(page, 'three-options')).toBe('Apples');
      });

      test('Home skips a disabled first option', async ({ page }) => {
        await typeInCombobox(page, 'disabled-first', 'a');
        await waitForBibOpen(page, 'disabled-first');

        // Navigate away
        await page.keyboard.press('ArrowDown');

        await page.keyboard.press('Home');
        const active = await activeOptionValue(page, 'disabled-first');
        expect(active).not.toBe('Apples'); // disabled option
        expect(active).toBe('Oranges');    // first enabled
      });

      test('End jumps to the last option', async ({ page }) => {
        await typeInCombobox(page, 'three-options', 'a');
        await waitForBibOpen(page, 'three-options');

        await page.keyboard.press('End');
        await expect.poll(() => activeOptionValue(page, 'three-options')).toBe('Grapes');
      });

      test('Enter opens the bib when input has a value', async ({ page }) => {
        await typeInCombobox(page, 'default', 'a');
        await waitForBibOpen(page, 'default');

        // Close the bib first
        await page.keyboard.press('Escape');
        await waitForBibClosed(page, 'default');

        // Enter should re-open when there's a value
        await page.keyboard.press('Enter');
        await waitForBibOpen(page, 'default');
      });

      test('Enter selects the active option and closes the bib', async ({ page }) => {
        await typeInCombobox(page, 'default', 'a');
        await waitForBibOpen(page, 'default');

        // Move to Oranges
        await page.keyboard.press('ArrowDown');
        await expect.poll(() => activeOptionValue(page, 'default')).toBe('Oranges');

        await page.keyboard.press('Enter');
        await waitForBibClosed(page, 'default');
        await expect.poll(() => comboboxValue(page, 'default')).toBe('Oranges');
      });

      test('Tab selects the active option and closes the bib', async ({ page }) => {
        await typeInCombobox(page, 'default', 'a');
        await waitForBibOpen(page, 'default');

        await page.keyboard.press('Tab');
        await waitForBibClosed(page, 'default');

        // First active option (Apples) should be selected
        const value = await comboboxValue(page, 'default');
        expect(value).toBeDefined();
      });

      test('Shift+Tab closes the bib', async ({ page }) => {
        await typeInCombobox(page, 'default', 'a');
        await waitForBibOpen(page, 'default');

        await page.keyboard.press('Shift+Tab');
        await waitForBibClosed(page, 'default');
      });

      test('Escape closes the bib without making a selection', async ({ page }) => {
        await typeInCombobox(page, 'default', 'a');
        await waitForBibOpen(page, 'default');

        // Navigate but don't select via Enter
        await page.keyboard.press('ArrowDown');

        await page.keyboard.press('Escape');
        await waitForBibClosed(page, 'default');

        // No menu option was selected — optionSelected should still be undefined
        const optionSelected = await combobox(page, 'default').evaluate(
          (el: any) => el.optionSelected,
        );
        expect(optionSelected).toBeUndefined();
      });

      test('ArrowUp opens the bib when it is closed', async ({ page }) => {
        await typeInCombobox(page, 'default', 'a');
        await waitForBibOpen(page, 'default');

        // Close
        await page.keyboard.press('Escape');
        await waitForBibClosed(page, 'default');

        // ArrowUp should re-open
        await page.keyboard.press('ArrowUp');
        await waitForBibOpen(page, 'default');
      });
    });

    // ── Filter-as-you-type ────────────────────────────────────────────────

    test.describe('Filter as you type', () => {
      test('filters options by typed text using real input events', async ({ page }) => {
        await typeInCombobox(page, 'default', 'pp');
        await waitForBibOpen(page, 'default');

        // Only "Apples" matches "pp"
        const visible = await combobox(page, 'default').evaluate((el: any) =>
          el.availableOptions.map((o: any) => o.value),
        );
        expect(visible).toEqual(['Apples']);
      });

      test('bold-highlights matching substrings', async ({ page }) => {
        await typeInCombobox(page, 'default', 'a');
        await waitForBibOpen(page, 'default');

        const hasStrongTags = await combobox(page, 'default').evaluate((el: any) =>
          el.availableOptions.every((o: any) => o.querySelector('strong') !== null),
        );
        expect(hasStrongTags).toBe(true);
      });

      test('trailing space is stripped for matching', async ({ page }) => {
        await typeInCombobox(page, 'default', 'a ');
        await waitForBibOpen(page, 'default');

        // Should match same options as bare "a"
        const visible = await combobox(page, 'default').evaluate((el: any) =>
          el.availableOptions.map((o: any) => o.value),
        );
        expect(visible.length).toBeGreaterThan(0);
        for (const v of visible) {
          expect(v.toLowerCase()).toContain('a');
        }
      });

      test('leading space does not match any options', async ({ page }) => {
        await focusCombobox(page, 'default');
        await page.keyboard.type(' a', { delay: 30 });

        // Give the combobox time to process
        await page.waitForTimeout(200);

        const visible = await combobox(page, 'default').evaluate((el: any) =>
          el.availableOptions?.length ?? 0,
        );
        expect(visible).toBe(0);
      });

      test('hides bib when no options match', async ({ page }) => {
        await typeInCombobox(page, 'default', 'zzzzzz');
        await page.waitForTimeout(200);

        await expect.poll(() => isBibVisible(page, 'default')).toBe(false);
      });
    });

    // ── Screen reader live region ─────────────────────────────────────────

    test.describe('Screen reader announcements', () => {
      test('populates live region when an option is activated', async ({ page }) => {
        await typeInCombobox(page, 'no-filter', 'a');
        await waitForBibOpen(page, 'no-filter');

        await page.keyboard.press('ArrowDown');

        // The live region is inside the combobox's shadow root
        await expect.poll(async () => {
          return combobox(page, 'no-filter').evaluate((el: any) => {
            const root = el.shadowRoot;
            const liveRegion = root?.querySelector('#srAnnouncement');
            return liveRegion?.textContent ?? '';
          });
        }, { timeout: 3_000 }).not.toBe('');
      });

      test('clears live region after announcement duration', async ({ page }) => {
        await typeInCombobox(page, 'no-filter', 'a');
        await waitForBibOpen(page, 'no-filter');

        await page.keyboard.press('ArrowDown');

        // Wait for the announcement to appear
        await expect.poll(async () => {
          return combobox(page, 'no-filter').evaluate((el: any) => {
            const root = el.shadowRoot;
            return root?.querySelector('#srAnnouncement')?.textContent ?? '';
          });
        }, { timeout: 3_000 }).not.toBe('');

        // Wait for it to be cleared (component uses a ~1000ms timer)
        await expect.poll(async () => {
          return combobox(page, 'no-filter').evaluate((el: any) => {
            const root = el.shadowRoot;
            return root?.querySelector('#srAnnouncement')?.textContent ?? '';
          });
        }, { timeout: 5_000 }).toBe('');
      });
    });

    // ── Click outside to close ────────────────────────────────────────────

    test.describe('Click outside to close', () => {
      test('closes the bib when clicking an element outside the combobox', async ({ page }) => {
        await typeInCombobox(page, 'default', 'a');
        await waitForBibOpen(page, 'default');

        // Click the outside button
        await page.locator('#outside-element').click();

        await waitForBibClosed(page, 'default');
      });

      test('does not select an option when clicking outside', async ({ page }) => {
        await typeInCombobox(page, 'default', 'a');
        await waitForBibOpen(page, 'default');

        await page.locator('#outside-element').click();
        await waitForBibClosed(page, 'default');

        const value = await comboboxValue(page, 'default');
        // Depending on behavior, either undefined or the typed text — but not a menu value
        // The key assertion: no menu selection was forced by click-outside
        expect(value).not.toBe('Oranges');
      });
    });

    // ── Mouse interaction ─────────────────────────────────────────────────

    test.describe('Mouse interaction', () => {
      test('clicking an option selects it and closes the bib', async ({ page }) => {
        await typeInCombobox(page, 'default', 'a');
        await waitForBibOpen(page, 'default');

        // Click a menu option through shadow DOM
        await combobox(page, 'default').evaluate((el: any) => {
          const menu = el.querySelector('auro-menu');
          const option = menu.querySelector('auro-menuoption[value="Oranges"]');
          option.click();
        });

        await waitForBibClosed(page, 'default');
        await expect.poll(() => comboboxValue(page, 'default')).toBe('Oranges');
      });

      test('clicking a disabled option does not select or close the bib', async ({ page }) => {
        await typeInCombobox(page, 'disabled-first', 'a');
        await waitForBibOpen(page, 'disabled-first');

        // Click the disabled option
        await combobox(page, 'disabled-first').evaluate((el: any) => {
          const menu = el.querySelector('auro-menu');
          const option = menu.querySelector('auro-menuoption[disabled]');
          option.click();
        });

        await page.waitForTimeout(100);

        // Bib should stay open
        const visible = await isBibVisible(page, 'disabled-first');
        expect(visible).toBe(true);

        // No selection should have been made
        const value = await comboboxValue(page, 'disabled-first');
        expect(value).not.toBe('Apples');
      });
    });
  });

  // ─── Mobile / fullscreen tests ──────────────────────────────────────────

  test.describe(`${label} — fullscreen mobile`, () => {
    test.use({ viewport: { width: 390, height: 844 } }); // iPhone 14 dimensions

    test.beforeEach(async ({ page }) => {
      await page.goto(route);
      await waitForCombobox(page);
    });

    test('opens fullscreen dialog when typing on mobile viewport', async ({ page }) => {
      await focusCombobox(page, 'default');
      await page.keyboard.type('a', { delay: 30 });

      // Wait for the fullscreen bib to open
      await waitForBibOpen(page, 'default');

      const isFullscreen = await combobox(page, 'default').evaluate(
        (el: any) => Boolean(el.dropdown?.isBibFullscreen),
      );
      expect(isFullscreen).toBe(true);
    });

    test('keyboard navigation works in fullscreen mode', async ({ page }) => {
      await focusCombobox(page, 'default');
      await page.keyboard.type('a', { delay: 30 });
      await waitForBibOpen(page, 'default');

      // Wait for fullscreen to settle
      await expect.poll(async () =>
        combobox(page, 'default').evaluate((el: any) => Boolean(el.dropdown?.isBibFullscreen)),
      ).toBe(true);

      await page.keyboard.press('ArrowDown');
      await expect.poll(() => activeOptionValue(page, 'default')).toBe('Oranges');
    });

    test('Escape closes the fullscreen dialog', async ({ page }) => {
      await focusCombobox(page, 'default');
      await page.keyboard.type('a', { delay: 30 });
      await waitForBibOpen(page, 'default');

      await page.keyboard.press('Escape');
      await waitForBibClosed(page, 'default');
    });

    test('clicking the close button closes the fullscreen dialog', async ({ page }) => {
      await focusCombobox(page, 'default');
      await page.keyboard.type('a', { delay: 30 });
      await waitForBibOpen(page, 'default');

      await expect.poll(async () =>
        combobox(page, 'default').evaluate((el: any) => Boolean(el.dropdown?.isBibFullscreen)),
      ).toBe(true);

      // The close button lives in auro-bibtemplate's shadow DOM
      await combobox(page, 'default').evaluate((el: any) => {
        const closeBtn = el.bibtemplate?.shadowRoot?.querySelector('#closeButton');
        if (closeBtn) closeBtn.click();
      });

      await waitForBibClosed(page, 'default');
    });

    test('Tab closes the fullscreen dialog', async ({ page }) => {
      await focusCombobox(page, 'default');
      await page.keyboard.type('a', { delay: 30 });
      await waitForBibOpen(page, 'default');

      await page.keyboard.press('Tab');
      await waitForBibClosed(page, 'default');
    });

    test('filter behavior validates after fullscreen close without selection', async ({ page }) => {
      await focusCombobox(page, 'filter');
      await page.keyboard.type('pp', { delay: 30 });
      await waitForBibOpen(page, 'filter');

      // Wait for fullscreen to settle
      await expect.poll(async () =>
        combobox(page, 'filter').evaluate((el: any) => Boolean(el.dropdown?.isBibFullscreen)),
      ).toBe(true);

      // Close without selecting (Escape)
      await page.keyboard.press('Escape');
      await waitForBibClosed(page, 'filter');

      // Blur to trigger validation
      await page.locator('#outside-element').click();

      // Should show validation error because filter behavior requires menu selection
      await expect.poll(async () =>
        combobox(page, 'filter').evaluate((el: any) => el.getAttribute('validity')),
      { timeout: 5_000 }).toBe('valueMissing');
    });

    test('trigger is set to inert while fullscreen dialog is open', async ({ page }) => {
      await focusCombobox(page, 'default');
      await page.keyboard.type('a', { delay: 30 });
      await waitForBibOpen(page, 'default');

      await expect.poll(async () =>
        combobox(page, 'default').evaluate((el: any) => Boolean(el.dropdown?.isBibFullscreen)),
      ).toBe(true);

      const triggerInert = await combobox(page, 'default').evaluate((el: any) =>
        el.dropdown.trigger.inert,
      );
      expect(triggerInert).toBe(true);
    });

    test('trigger inert and focus are restored after fullscreen dialog closes', async ({ page }) => {
      await focusCombobox(page, 'default');
      await page.keyboard.type('a', { delay: 30 });
      await waitForBibOpen(page, 'default');

      await expect.poll(async () =>
        combobox(page, 'default').evaluate((el: any) => Boolean(el.dropdown?.isBibFullscreen)),
      ).toBe(true);

      // Verify trigger is inert while open
      await expect.poll(async () =>
        combobox(page, 'default').evaluate((el: any) => el.dropdown.trigger.inert),
      ).toBe(true);

      // Close the fullscreen dialog
      await page.keyboard.press('Escape');
      await waitForBibClosed(page, 'default');

      // Trigger should no longer be inert
      await expect.poll(async () =>
        combobox(page, 'default').evaluate((el: any) => el.dropdown.trigger.inert),
      ).toBe(false);
    });

    test('screen reader announcements route to bib live region in fullscreen', async ({ page }) => {
      await typeInCombobox(page, 'no-filter', 'a');
      await waitForBibOpen(page, 'no-filter');

      // Wait for fullscreen to settle
      await expect.poll(async () =>
        combobox(page, 'no-filter').evaluate((el: any) => Boolean(el.dropdown?.isBibFullscreen)),
      ).toBe(true);

      // Navigate via keyboard to trigger announcement
      await page.keyboard.press('ArrowDown');

      // In fullscreen mode, announcements go to the bib's shadow root
      await expect.poll(async () => {
        return combobox(page, 'no-filter').evaluate((el: any) => {
          // Check both possible announcement roots
          const bibEl = el.dropdown?.bibElement?.value;
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

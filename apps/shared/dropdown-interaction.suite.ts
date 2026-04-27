import { test, expect, type Page, type Locator } from './coverage-fixture';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Wait for auro-dropdown custom element to be fully registered and shadow DOM rendered. */
async function waitForDropdown(page: Page) {
  await page.waitForFunction(
    () => customElements.get('auro-dropdown') !== undefined,
    { timeout: 10_000 },
  );
  // Wait for the first dropdown's shadow DOM trigger to be rendered
  await page.waitForFunction(
    () => {
      const el = document.querySelector('auro-dropdown');
      return !!el?.shadowRoot?.querySelector('#trigger');
    },
    { timeout: 10_000 },
  );
}

/** Return the dropdown element scoped to a data-testid section. */
function dropdown(page: Page, fixture: string): Locator {
  return page.locator(`[data-testid="${fixture}"] auro-dropdown`);
}

/** Check whether the dropdown bib is visible. */
function isBibVisible(page: Page, fixture: string) {
  return dropdown(page, fixture).evaluate(
    (el: any) => Boolean(el.isPopoverVisible),
  );
}

/** Wait for the dropdown bib to open. */
async function waitForBibOpen(page: Page, fixture: string) {
  await expect.poll(() => isBibVisible(page, fixture), { timeout: 5_000 }).toBe(true);
}

/** Wait for the dropdown bib to close. */
async function waitForBibClosed(page: Page, fixture: string) {
  await expect.poll(() => isBibVisible(page, fixture), { timeout: 5_000 }).toBe(false);
}

/** Focus the dropdown's trigger element. */
async function focusTrigger(page: Page, fixture: string) {
  await dropdown(page, fixture).evaluate((el: any) => {
    const trigger = el.shadowRoot.querySelector('#trigger');
    if (trigger) trigger.focus();
  });
  // Confirm focus landed on the trigger inside shadow DOM
  await expect.poll(() =>
    dropdown(page, fixture).evaluate((el: any) => {
      const trigger = el.shadowRoot.querySelector('#trigger');
      return el.shadowRoot.activeElement === trigger;
    }),
    { timeout: 5_000 },
  ).toBe(true);
}

/** Click the dropdown's trigger element. */
async function clickTrigger(page: Page, fixture: string) {
  await dropdown(page, fixture).evaluate((el: any) => {
    const trigger = el.shadowRoot.querySelector('#trigger');
    if (trigger) trigger.click();
  });
}

/** Check if the chevron shows the "up" state (bib open). */
function isChevronUp(page: Page, fixture: string) {
  return dropdown(page, fixture).evaluate((el: any) => {
    const icon = el.shadowRoot.querySelector('#showStateIcon auro-icon, #showStateIcon [auro-icon]');
    return icon?.getAttribute('name') === 'chevron-up';
  });
}

// ─── Suite ────────────────────────────────────────────────────────────────────

export function dropdownInteractionSuite(framework: string) {
  const label = `auro-dropdown interaction in ${framework}`;

  test.describe(`${label} — desktop`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/dropdown-interaction');
      await waitForDropdown(page);
    });

    test.describe('Click interaction', () => {
      test('clicking the trigger opens the dropdown', async ({ page }) => {
        await clickTrigger(page, 'default');
        await waitForBibOpen(page, 'default');
      });

      test('clicking the trigger again closes the dropdown', async ({ page }) => {
        await clickTrigger(page, 'default');
        await waitForBibOpen(page, 'default');

        await clickTrigger(page, 'default');
        await waitForBibClosed(page, 'default');
      });

      test('clicking a disabled trigger does not open the dropdown', async ({ page }) => {
        await clickTrigger(page, 'disabled');
        // Small wait to verify it doesn't open
        await page.waitForTimeout(200);
        await expect.poll(() => isBibVisible(page, 'disabled')).toBe(false);
      });

      test('noToggle: second click does not close the dropdown', async ({ page }) => {
        await clickTrigger(page, 'no-toggle');
        await waitForBibOpen(page, 'no-toggle');

        await clickTrigger(page, 'no-toggle');
        // Wait a moment to confirm it stays open
        await page.waitForTimeout(200);
        await expect.poll(() => isBibVisible(page, 'no-toggle')).toBe(true);
      });

      test('disableEventShow: click does not open the dropdown', async ({ page }) => {
        await clickTrigger(page, 'disable-event-show');
        await page.waitForTimeout(200);
        await expect.poll(() => isBibVisible(page, 'disable-event-show')).toBe(false);
      });

      test('disableEventShow: show() method opens the dropdown', async ({ page }) => {
        await dropdown(page, 'disable-event-show').evaluate((el: any) => el.show());
        await waitForBibOpen(page, 'disable-event-show');
      });
    });

    test.describe('Keyboard interaction', () => {
      test('Enter opens the dropdown', async ({ page }) => {
        await focusTrigger(page, 'default');
        await page.keyboard.press('Enter');
        await waitForBibOpen(page, 'default');
      });

      test('Space opens the dropdown', async ({ page }) => {
        await focusTrigger(page, 'default');
        await page.keyboard.press('Space');
        await waitForBibOpen(page, 'default');
      });

      test('Escape closes the dropdown', async ({ page }) => {
        await clickTrigger(page, 'default');
        await waitForBibOpen(page, 'default');

        await page.keyboard.press('Escape');
        await waitForBibClosed(page, 'default');
      });

      test('Escape returns focus to the trigger', async ({ page }) => {
        await focusTrigger(page, 'default');
        await page.keyboard.press('Enter');
        await waitForBibOpen(page, 'default');

        await page.keyboard.press('Escape');
        await waitForBibClosed(page, 'default');

        // Verify focus returned to the trigger
        await expect.poll(() =>
          dropdown(page, 'default').evaluate((el: any) => {
            const trigger = el.shadowRoot.querySelector('#trigger');
            return el.shadowRoot.activeElement === trigger || document.activeElement === el;
          }),
        ).toBe(true);
      });

      test('Enter on a disabled dropdown does not open it', async ({ page }) => {
        await focusTrigger(page, 'disabled');
        await page.keyboard.press('Enter');
        await page.waitForTimeout(200);
        await expect.poll(() => isBibVisible(page, 'disabled')).toBe(false);
      });

      test('disableKeyboardHandling: Enter and Space do not open', async ({ page }) => {
        await focusTrigger(page, 'disable-keyboard');
        await page.keyboard.press('Enter');
        await page.waitForTimeout(200);
        await expect.poll(() => isBibVisible(page, 'disable-keyboard')).toBe(false);

        await page.keyboard.press('Space');
        await page.waitForTimeout(200);
        await expect.poll(() => isBibVisible(page, 'disable-keyboard')).toBe(false);
      });
    });

    test.describe('Focus management', () => {
      test('focus loss closes the dropdown', async ({ page }) => {
        await clickTrigger(page, 'default');
        await waitForBibOpen(page, 'default');

        await page.locator('#outside-element').focus();
        await waitForBibClosed(page, 'default');
      });

      test('noHideOnThisFocusLoss: focus loss does not close the dropdown', async ({ page }) => {
        await clickTrigger(page, 'no-hide-focus-loss');
        await waitForBibOpen(page, 'no-hide-focus-loss');

        await page.locator('#outside-element').focus();
        // Wait a moment to confirm it stays open
        await page.waitForTimeout(300);
        await expect.poll(() => isBibVisible(page, 'no-hide-focus-loss')).toBe(true);
      });
    });

    test.describe('Chevron indicator', () => {
      test('chevron points down when closed and up when open', async ({ page }) => {
        // Closed — chevron should be down (not up)
        await expect.poll(() => isChevronUp(page, 'default')).toBe(false);

        await clickTrigger(page, 'default');
        await waitForBibOpen(page, 'default');

        // Open — chevron should be up
        await expect.poll(() => isChevronUp(page, 'default')).toBe(true);
      });
    });

    test.describe('Events', () => {
      test('fires auroDropdown-triggerClick when trigger is clicked', async ({ page }) => {
        const received = await dropdown(page, 'default').evaluate((el: any) => {
          return new Promise<boolean>((resolve) => {
            el.addEventListener('auroDropdown-triggerClick', () => resolve(true), { once: true });
            const trigger = el.shadowRoot.querySelector('#trigger');
            trigger.click();
          });
        });
        expect(received).toBe(true);
      });

      test('fires auroDropdown-toggled when opened', async ({ page }) => {
        const detail = await dropdown(page, 'default').evaluate((el: any) => {
          return new Promise<any>((resolve) => {
            el.addEventListener('auroDropdown-toggled', (e: any) => resolve(e.detail), { once: true });
            const trigger = el.shadowRoot.querySelector('#trigger');
            trigger.click();
          });
        });
        expect(detail.expanded).toBe(true);
      });

      test('fires auroDropdown-toggled when closed', async ({ page }) => {
        // Open first
        await clickTrigger(page, 'default');
        await waitForBibOpen(page, 'default');

        const detail = await dropdown(page, 'default').evaluate((el: any) => {
          return new Promise<any>((resolve) => {
            el.addEventListener('auroDropdown-toggled', (e: any) => resolve(e.detail), { once: true });
            const trigger = el.shadowRoot.querySelector('#trigger');
            trigger.click();
          });
        });
        expect(detail.expanded).toBe(false);
      });
    });
  });

  test.describe(`${label} — fullscreen mobile`, () => {
    test.use({ viewport: { width: 390, height: 844 } });

    test.beforeEach(async ({ page }) => {
      await page.goto('/dropdown-interaction');
      await waitForDropdown(page);
    });

    test('opens fullscreen dialog on mobile viewport', async ({ page }) => {
      await clickTrigger(page, 'fullscreen');
      await waitForBibOpen(page, 'fullscreen');

      await expect.poll(() =>
        dropdown(page, 'fullscreen').evaluate((el: any) => Boolean(el.isBibFullscreen)),
      ).toBe(true);
    });

    test('Escape closes the fullscreen dialog', async ({ page }) => {
      await clickTrigger(page, 'fullscreen');
      await waitForBibOpen(page, 'fullscreen');

      await page.keyboard.press('Escape');
      await waitForBibClosed(page, 'fullscreen');
    });
  });
}

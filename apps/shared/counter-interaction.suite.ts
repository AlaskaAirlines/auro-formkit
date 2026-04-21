import { test, expect, type Page, type Locator } from '@playwright/test';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Wait for auro-counter custom element to be fully registered. */
async function waitForCounter(page: Page) {
  await page.waitForFunction(
    () => customElements.get('auro-counter') !== undefined,
    { timeout: 10_000 },
  );
}

/** Return the counter element scoped to a data-testid section. */
function counter(page: Page, fixture: string): Locator {
  return page.locator(`[data-testid="${fixture}"] auro-counter`);
}

/** Return the counter-group element scoped to a data-testid section. */
function counterGroup(page: Page, fixture: string): Locator {
  return page.locator(`[data-testid="${fixture}"] auro-counter-group`);
}

/** Get the current numeric value of a counter. */
function counterValue(page: Page, fixture: string, nth = 0) {
  return counter(page, fixture).nth(nth).evaluate((el: any) => el.value);
}

/** Focus the spinbutton inside the counter. */
async function focusCounter(page: Page, fixture: string, nth = 0) {
  await counter(page, fixture).nth(nth).evaluate((el: any) => {
    const spinbutton = el.shadowRoot.querySelector('[role="spinbutton"]');
    if (spinbutton) spinbutton.focus();
  });
}

/** Click the minus button inside the counter's shadow DOM. */
async function clickMinus(page: Page, fixture: string, nth = 0) {
  await counter(page, fixture).nth(nth).evaluate((el: any) => {
    const btn = el.shadowRoot.querySelector('[part="controlMinus"]');
    if (btn) btn.click();
  });
}

/** Click the plus button inside the counter's shadow DOM. */
async function clickPlus(page: Page, fixture: string, nth = 0) {
  await counter(page, fixture).nth(nth).evaluate((el: any) => {
    const btn = el.shadowRoot.querySelector('[part="controlPlus"]');
    if (btn) btn.click();
  });
}

/** Check if the minus button is disabled. */
function isMinusDisabled(page: Page, fixture: string, nth = 0) {
  return counter(page, fixture).nth(nth).evaluate((el: any) => {
    const btn = el.shadowRoot.querySelector('[part="controlMinus"]');
    return btn?.hasAttribute('disabled') ?? false;
  });
}

/** Check if the plus button is disabled. */
function isPlusDisabled(page: Page, fixture: string, nth = 0) {
  return counter(page, fixture).nth(nth).evaluate((el: any) => {
    const btn = el.shadowRoot.querySelector('[part="controlPlus"]');
    return btn?.hasAttribute('disabled') ?? false;
  });
}

/** Check whether the dropdown bib is visible in a counter-group. */
function isBibVisible(page: Page, fixture: string) {
  return counterGroup(page, fixture).evaluate(
    (el: any) => Boolean(el.dropdown?.isPopoverVisible),
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

// ─── Suite ────────────────────────────────────────────────────────────────────

export function counterInteractionSuite(framework: string) {
  const label = `auro-counter interaction in ${framework}`;

  test.describe(`${label} — standalone counter`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/counter-interaction');
      await waitForCounter(page);
    });

    test.describe('Keyboard interaction', () => {
      test('ArrowUp increments the counter value', async ({ page }) => {
        await focusCounter(page, 'default');
        const before = await counterValue(page, 'default');
        await page.keyboard.press('ArrowUp');
        await expect.poll(() => counterValue(page, 'default')).toBe(before + 1);
      });

      test('ArrowDown decrements the counter value', async ({ page }) => {
        // Increment first so we can decrement
        await focusCounter(page, 'default');
        await page.keyboard.press('ArrowUp');
        await expect.poll(() => counterValue(page, 'default')).toBe(1);

        await page.keyboard.press('ArrowDown');
        await expect.poll(() => counterValue(page, 'default')).toBe(0);
      });

      test('ArrowUp does not exceed max value', async ({ page }) => {
        await focusCounter(page, 'at-max');
        await page.keyboard.press('ArrowUp');
        await expect.poll(() => counterValue(page, 'at-max')).toBe(9);
      });

      test('ArrowDown does not go below min value', async ({ page }) => {
        await focusCounter(page, 'at-min');
        await page.keyboard.press('ArrowDown');
        await expect.poll(() => counterValue(page, 'at-min')).toBe(0);
      });

      test('ArrowUp is a no-op when counter is disabled', async ({ page }) => {
        await focusCounter(page, 'disabled');
        await page.keyboard.press('ArrowUp');
        await expect.poll(() => counterValue(page, 'disabled')).toBe(3);
      });

      test('ArrowDown is a no-op when counter is disabled', async ({ page }) => {
        await focusCounter(page, 'disabled');
        await page.keyboard.press('ArrowDown');
        await expect.poll(() => counterValue(page, 'disabled')).toBe(3);
      });
    });

    test.describe('Mouse interaction', () => {
      test('clicking the plus button increments the value', async ({ page }) => {
        const before = await counterValue(page, 'default');
        await clickPlus(page, 'default');
        await expect.poll(() => counterValue(page, 'default')).toBe(before + 1);
      });

      test('clicking the minus button decrements the value', async ({ page }) => {
        // Increment first
        await clickPlus(page, 'default');
        await expect.poll(() => counterValue(page, 'default')).toBe(1);

        await clickMinus(page, 'default');
        await expect.poll(() => counterValue(page, 'default')).toBe(0);
      });

      test('plus button is disabled when value equals max', async ({ page }) => {
        await expect.poll(() => isPlusDisabled(page, 'at-max')).toBe(true);
      });

      test('minus button is disabled when value equals min', async ({ page }) => {
        await expect.poll(() => isMinusDisabled(page, 'at-min')).toBe(true);
      });

      test('clicking plus on a counter at max does not change the value', async ({ page }) => {
        await clickPlus(page, 'at-max');
        await expect.poll(() => counterValue(page, 'at-max')).toBe(9);
      });

      test('clicking minus on a counter at min does not change the value', async ({ page }) => {
        await clickMinus(page, 'at-min');
        await expect.poll(() => counterValue(page, 'at-min')).toBe(0);
      });

      test('clicking buttons on a disabled counter does not change the value', async ({ page }) => {
        await clickPlus(page, 'disabled');
        await expect.poll(() => counterValue(page, 'disabled')).toBe(3);
        await clickMinus(page, 'disabled');
        await expect.poll(() => counterValue(page, 'disabled')).toBe(3);
      });
    });

    test.describe('Accessibility', () => {
      test('counter has spinbutton role with correct ARIA attributes', async ({ page }) => {
        const aria = await counter(page, 'default').evaluate((el: any) => {
          const sb = el.shadowRoot.querySelector('[role="spinbutton"]');
          return {
            role: sb?.getAttribute('role'),
            valueMin: sb?.getAttribute('aria-valuemin'),
            valueMax: sb?.getAttribute('aria-valuemax'),
            valueNow: sb?.getAttribute('aria-valuenow'),
          };
        });
        expect(aria.role).toBe('spinbutton');
        expect(aria.valueMin).toBe('0');
        expect(aria.valueMax).toBe('9');
        expect(aria.valueNow).toBeDefined();
      });

      test('aria-valuenow updates after ArrowUp', async ({ page }) => {
        await focusCounter(page, 'default');
        await page.keyboard.press('ArrowUp');
        const valueNow = await counter(page, 'default').evaluate((el: any) =>
          el.shadowRoot.querySelector('[role="spinbutton"]')?.getAttribute('aria-valuenow'),
        );
        expect(valueNow).toBe('1');
      });
    });
  });

  test.describe(`${label} — counter-group dropdown`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/counter-interaction');
      await waitForCounter(page);
    });

    test.describe('Dropdown open/close', () => {
      test('clicking the trigger opens the dropdown', async ({ page }) => {
        await counterGroup(page, 'dropdown-group').evaluate((el: any) => {
          el.dropdown?.querySelector('#triggerFocus')?.click();
        });
        await waitForBibOpen(page, 'dropdown-group');
      });

      test('Escape closes the dropdown', async ({ page }) => {
        await counterGroup(page, 'dropdown-group').evaluate((el: any) => {
          el.dropdown?.querySelector('#triggerFocus')?.click();
        });
        await waitForBibOpen(page, 'dropdown-group');

        await page.keyboard.press('Escape');
        await waitForBibClosed(page, 'dropdown-group');
      });

      test('clicking outside closes the dropdown', async ({ page }) => {
        await counterGroup(page, 'dropdown-group').evaluate((el: any) => {
          el.dropdown?.querySelector('#triggerFocus')?.click();
        });
        await waitForBibOpen(page, 'dropdown-group');

        // Focus an element outside the dropdown to trigger focus-loss close
        await page.locator('#outside-element').focus();
        await waitForBibClosed(page, 'dropdown-group');
      });
    });

    test.describe('Keyboard interaction in dropdown', () => {
      test('ArrowUp increments a counter inside the dropdown', async ({ page }) => {
        // Open the dropdown
        await counterGroup(page, 'dropdown-group').evaluate((el: any) => {
          el.dropdown?.querySelector('#triggerFocus')?.click();
        });
        await waitForBibOpen(page, 'dropdown-group');

        // Tab to the first counter
        await page.keyboard.press('Tab');
        const before = await counterValue(page, 'dropdown-group', 0);
        await page.keyboard.press('ArrowUp');
        await expect.poll(() => counterValue(page, 'dropdown-group', 0)).toBe(before + 1);
      });

      test('ArrowDown decrements a counter inside the dropdown', async ({ page }) => {
        // Open the dropdown
        await counterGroup(page, 'dropdown-group').evaluate((el: any) => {
          el.dropdown?.querySelector('#triggerFocus')?.click();
        });
        await waitForBibOpen(page, 'dropdown-group');

        // Tab to the first counter, increment then decrement
        await page.keyboard.press('Tab');
        await page.keyboard.press('ArrowUp');
        await expect.poll(() => counterValue(page, 'dropdown-group', 0)).toBe(1);

        await page.keyboard.press('ArrowDown');
        await expect.poll(() => counterValue(page, 'dropdown-group', 0)).toBe(0);
      });

      test('Tab navigates between counters in the dropdown', async ({ page }) => {
        await counterGroup(page, 'dropdown-group').evaluate((el: any) => {
          el.dropdown?.querySelector('#triggerFocus')?.click();
        });
        await waitForBibOpen(page, 'dropdown-group');

        // Tab to first counter
        await page.keyboard.press('Tab');
        await expect(page.locator('[data-testid="dropdown-group"] auro-counter').nth(0)).toBeFocused();

        // Tab to second counter
        await page.keyboard.press('Tab');
        await expect(page.locator('[data-testid="dropdown-group"] auro-counter').nth(1)).toBeFocused();

        // Tab to third counter
        await page.keyboard.press('Tab');
        await expect(page.locator('[data-testid="dropdown-group"] auro-counter').nth(2)).toBeFocused();
      });
    });

    test.describe('Mouse interaction in dropdown', () => {
      test('clicking plus on a counter inside the dropdown increments it', async ({ page }) => {
        await counterGroup(page, 'dropdown-group').evaluate((el: any) => {
          el.dropdown?.querySelector('#triggerFocus')?.click();
        });
        await waitForBibOpen(page, 'dropdown-group');

        const before = await counterValue(page, 'dropdown-group', 0);
        await clickPlus(page, 'dropdown-group', 0);
        await expect.poll(() => counterValue(page, 'dropdown-group', 0)).toBe(before + 1);
      });

      test('clicking minus on a counter inside the dropdown decrements it', async ({ page }) => {
        await counterGroup(page, 'dropdown-group').evaluate((el: any) => {
          el.dropdown?.querySelector('#triggerFocus')?.click();
        });
        await waitForBibOpen(page, 'dropdown-group');

        // Increment first then decrement
        await clickPlus(page, 'dropdown-group', 0);
        await expect.poll(() => counterValue(page, 'dropdown-group', 0)).toBe(1);

        await clickMinus(page, 'dropdown-group', 0);
        await expect.poll(() => counterValue(page, 'dropdown-group', 0)).toBe(0);
      });
    });

    test.describe('Group max constraint', () => {
      test('incrementing counters up to group max disables all plus buttons', async ({ page }) => {
        // Group max is 6, start all at 0
        await counterGroup(page, 'dropdown-group').evaluate((el: any) => {
          el.dropdown?.querySelector('#triggerFocus')?.click();
        });
        await waitForBibOpen(page, 'dropdown-group');

        // Increment the first counter 6 times to hit group max
        for (let i = 0; i < 6; i++) {
          await clickPlus(page, 'dropdown-group', 0);
        }

        await expect.poll(() => counterValue(page, 'dropdown-group', 0)).toBe(6);

        // All plus buttons in the group should now be disabled
        await expect.poll(() => isPlusDisabled(page, 'dropdown-group', 0)).toBe(true);
        await expect.poll(() => isPlusDisabled(page, 'dropdown-group', 1)).toBe(true);
        await expect.poll(() => isPlusDisabled(page, 'dropdown-group', 2)).toBe(true);
      });

      test('group total reflects sum of all counters', async ({ page }) => {
        await counterGroup(page, 'dropdown-group').evaluate((el: any) => {
          el.dropdown?.querySelector('#triggerFocus')?.click();
        });
        await waitForBibOpen(page, 'dropdown-group');

        // Increment first counter twice, second counter once
        await clickPlus(page, 'dropdown-group', 0);
        await clickPlus(page, 'dropdown-group', 0);
        await clickPlus(page, 'dropdown-group', 1);

        await expect.poll(() =>
          counterGroup(page, 'dropdown-group').evaluate((el: any) => el.total),
        ).toBe(3);
      });
    });
  });
}

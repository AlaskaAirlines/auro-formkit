import { test, expect, type Page } from '@playwright/test';

/** Wait for auro-datepicker to be defined and for its internal dropdown to
 * be fully initialized.  Checking only customElements.get() is not
 * sufficient: in Svelte the component is lazy-loaded on route mount, so
 * the element instance's Lit lifecycle (firstUpdated → updated) may not
 * complete until a microtask after the class registration is observable.
 * We additionally gate on dropdown.bibContent, which is set at the end of
 * the dropdown's firstUpdated().  By that point the dropdown's updated()  
 * has also run and propagated fullscreenBreakpoint to the bib — the value
 * FloatingUI reads in getPositioningStrategy() to decide whether to use
 * fullscreen mode.  Without this guard, openBib() can fire before the
 * breakpoint is wired up, causing FloatingUI to fall back to floating mode
 * and leaving noHideOnThisFocusLoss false even on a mobile viewport. */
async function waitForDatepicker(page: Page) {
  await page.waitForFunction(
    () => {
      const el = document.querySelector('auro-datepicker') as any;
      return (
        customElements.get('auro-datepicker') !== undefined &&
        el?.dropdown?.bibContent != null
      );
    },
    { timeout: 10_000 },
  );
}

/** Click the datepicker's first input to open the bib. */
async function openBib(page: Page) {
  await page.locator('auro-datepicker').click();
}

/** Returns true when dropdown.isPopoverVisible is true on the datepicker. */
function isBibVisible(page: Page) {
  return page.evaluate(() => {
    const el = document.querySelector('auro-datepicker') as any;
    return Boolean(el?.dropdown?.isPopoverVisible);
  });
}

/** After openBib(), waits for the bib to be visible and in fullscreen mode.
 * Split into two sequential polls so each condition gets its own timeout
 * budget.  The two flags are set in separate Lit update cycles — ANDing them
 * in a single waitForFunction creates a race where the combined condition may
 * never be true within the window, especially under CI's slower JS engine. */
async function waitForBibReady(page: Page) {
  // Step 1: bib must be open
  await page.waitForFunction(
    () => (document.querySelector('auro-datepicker') as any)?.dropdown?.isPopoverVisible === true,
    { timeout: 8_000 },
  );
  // Step 2: positioning strategy must have resolved to fullscreen (next Lit cycle)
  await page.waitForFunction(
    () => (document.querySelector('auro-datepicker') as any)?.dropdown?.isBibFullscreen === true,
    { timeout: 5_000 },
  );
}

export function datepickerFullscreenSuite(framework: string) {
  test.describe(`auro-datepicker fullscreen focus-loss in ${framework}`, () => {
    test.use({ viewport: { width: 390, height: 844 } }); // iPhone 14 — triggers fullscreen bib

    test.beforeEach(async ({ page }) => {
      await page.goto('/datepicker-fullscreen');
      await waitForDatepicker(page);
    });

    test('bib stays open when focus moves outside in fullscreen mode', async ({ page }) => {
      await openBib(page);

      // Wait for fullscreen mode to settle and for noHideOnThisFocusLoss to be
      // synchronized before moving focus.  Under slower CI timing (Svelte
      // lazy-loads on route mount) the flag may lag a frame behind bib open.
      await waitForBibReady(page);

      // Move real browser focus to the button outside the datepicker.
      // In fullscreen mode noHideOnThisFocusLoss is true, so the bib must stay open.
      await page.locator('#outside').focus();
      await page.waitForTimeout(50);

      await expect.poll(() => isBibVisible(page)).toBe(true);
    });

    test('bib closes when explicitly dismissed in fullscreen mode', async ({ page }) => {
      await openBib(page);
      await waitForBibReady(page);

      await page.keyboard.press('Escape');

      await expect.poll(() => isBibVisible(page)).toBe(false);
    });
  });

  test.describe(`auro-datepicker non-fullscreen focus-loss in ${framework}`, () => {
    test.use({ viewport: { width: 1280, height: 800 } }); // Desktop — floating bib

    test.beforeEach(async ({ page }) => {
      await page.goto('/datepicker-fullscreen');
      await waitForDatepicker(page);
    });

    test('bib closes when focus moves outside in non-fullscreen mode', async ({ page }) => {
      await openBib(page);

      await expect.poll(() => isBibVisible(page)).toBe(true);

      // Tab focus to the outside button — simulates the user tabbing away.
      // noHideOnThisFocusLoss is false at desktop, so FloatingUI should close the bib.
      await page.locator('#outside').focus();
      await page.waitForTimeout(50);

      await expect.poll(() => isBibVisible(page)).toBe(false);
    });

    test('focus is not stolen back to datepicker after tab-out closes the bib', async ({ page }) => {
      await openBib(page);

      await expect.poll(() => isBibVisible(page)).toBe(true);

      await page.locator('#outside').focus();
      await page.waitForTimeout(100); // allow rAF in close handler to fire

      // Focus must remain on the outside button, not yanked back to the input.
      const focused = await page.evaluate(() => document.activeElement?.id);
      expect(focused).toBe('outside');
    });
  });

  // ─── Keyboard contract (transitional — see components/datepicker/docs/partials/keyboardBehavior.md) ───

  test.describe(`auro-datepicker keyboard contract (desktop) in ${framework}`, () => {
    test.use({ viewport: { width: 1280, height: 800 } });

    test.beforeEach(async ({ page }) => {
      await page.goto('/datepicker-fullscreen');
      await waitForDatepicker(page);
    });

    test('Enter does not open the bib', async ({ page }) => {
      // Focus the component via its public focus() method — no click, so bib stays closed.
      await page.evaluate(() => (document.querySelector('auro-datepicker') as any)?.focus());
      await page.keyboard.press('Enter');
      await page.waitForTimeout(50);
      await expect.poll(() => isBibVisible(page)).toBe(false);
    });

    test('Space does not open the bib', async ({ page }) => {
      await page.evaluate(() => (document.querySelector('auro-datepicker') as any)?.focus());
      await page.keyboard.press('Space');
      await page.waitForTimeout(50);
      await expect.poll(() => isBibVisible(page)).toBe(false);
    });
  });

  test.describe(`auro-datepicker keyboard contract (fullscreen) in ${framework}`, () => {
    test.use({ viewport: { width: 390, height: 844 } }); // iPhone 14 — triggers fullscreen bib

    test.beforeEach(async ({ page }) => {
      await page.goto('/datepicker-fullscreen');
      await waitForDatepicker(page);
    });

    test('Tab does not close the fullscreen bib', async ({ page }) => {
      await openBib(page);
      await waitForBibReady(page);

      // Tab cycles within the fullscreen <dialog> via native focus containment.
      // Unlike the old implementation, there is no keydown redirect that closes the bib.
      await page.keyboard.press('Tab');
      await page.waitForTimeout(50);

      await expect.poll(() => isBibVisible(page)).toBe(true);
    });
  });
}

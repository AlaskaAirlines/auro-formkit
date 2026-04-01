import { test, expect, type Page } from '@playwright/test';

/** Wait for auro-datepicker to be defined and upgraded in the page. */
async function waitForDatepicker(page: Page) {
  await page.waitForFunction(
    () => customElements.get('auro-datepicker') !== undefined,
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

/**
 * Waits until the datepicker bib is open in fullscreen mode AND the
 * focus-loss policy flag is already synchronized.  Under slower CI timing
 * (Svelte lazy-loads the component on route mount) the `auroDropdown-toggled`
 * event fires before FloatingUI has finished the strategy-change cycle, so
 * `noHideOnThisFocusLoss` may still be false for a frame or two after the bib
 * becomes visible.  Polling here avoids the race without adding an arbitrary
 * fixed-timeout sleep.
 */
async function waitForFullscreenReady(page: Page) {
  await page.waitForFunction(
    () => {
      const el = document.querySelector('auro-datepicker') as any;
      return (
        el?.dropdown?.isPopoverVisible === true &&
        el?.dropdown?.isBibFullscreen === true &&
        el?.dropdown?.noHideOnThisFocusLoss === true
      );
    },
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
      await waitForFullscreenReady(page);

      // Move real browser focus to the button outside the datepicker.
      // In fullscreen mode noHideOnThisFocusLoss is true, so the bib must stay open.
      await page.locator('#outside').focus();
      await page.waitForTimeout(50);

      await expect.poll(() => isBibVisible(page)).toBe(true);
    });

    test('bib closes when explicitly dismissed in fullscreen mode', async ({ page }) => {
      await openBib(page);
      await waitForFullscreenReady(page);

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
      await waitForFullscreenReady(page);

      // Tab cycles within the fullscreen <dialog> via native focus containment.
      // Unlike the old implementation, there is no keydown redirect that closes the bib.
      await page.keyboard.press('Tab');
      await page.waitForTimeout(50);

      await expect.poll(() => isBibVisible(page)).toBe(true);
    });
  });
}

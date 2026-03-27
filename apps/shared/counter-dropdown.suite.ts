import { test, expect, type Page } from '@playwright/test';

async function waitForReady(page: Page) {
  await page.waitForFunction(
    () => customElements.get('auro-counter-group') !== undefined,
    { timeout: 10_000 },
  );
}

export function counterDropdownSuite(framework: string) {
  test.describe(`auro-counter-group (dropdown) in ${framework}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/counter-dropdown');
      await waitForReady(page);
    });

    test('dropdown opens and all counter controls are visible', async ({ page }) => {
      await page.locator('#triggerFocus').click();
      await expect(page.getByRole('button', { name: '+' }).first()).toBeVisible({ timeout: 3_000 });
      await expect(page.getByRole('button', { name: '+' })).toHaveCount(3);
    });

    // Regression for PR #1398 — nativeFocusableContent=true must let Tab pass through
    // instead of the keyboard bridge intercepting it and closing the dropdown.
    test('Tab moves focus to second counter and keeps dropdown open', async ({ page }) => {
      await page.locator('#triggerFocus').click();

      const plusButtons = page.getByRole('button', { name: '+' });
      await expect(plusButtons).toHaveCount(3, { timeout: 3_000 });

      // Tab from the trigger into the bib. Each auro-counter host element has a
      // counterControl part with tabindex=0; the inner +/- buttons have
      // tabindex="-1" and are not in the Tab sequence. First Tab lands on counter 1.
      await page.keyboard.press('Tab');
      await expect(page.locator('auro-counter').nth(0)).toBeFocused();

      // Second Tab moves focus to counter 2, keeping the dropdown open.
      await page.keyboard.press('Tab');

      // After two Tabs, document.activeElement is the second auro-counter host element.
      await expect(page.locator('auro-counter').nth(1)).toBeFocused();

      // Dropdown must still be open — all 3 plus buttons still reachable
      await expect(plusButtons).toHaveCount(3);
    });

    test('Shift+Tab moves focus backward and keeps dropdown open', async ({ page }) => {
      await page.locator('#triggerFocus').click();

      const plusButtons = page.getByRole('button', { name: '+' });
      await expect(plusButtons).toHaveCount(3, { timeout: 3_000 });

      // Tab into the bib twice so focus lands on counter 2 natively.
      await page.keyboard.press('Tab');
      await expect(page.locator('auro-counter').nth(0)).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(page.locator('auro-counter').nth(1)).toBeFocused();

      // Shift+Tab moves focus back to counter 1, keeping the dropdown open.
      await page.keyboard.press('Shift+Tab');
      await expect(page.locator('auro-counter').nth(0)).toBeFocused();

      // Dropdown must still be open — all 3 plus buttons still reachable
      await expect(plusButtons).toHaveCount(3);
    });
  });
}

/**
 * Quarantined 5.9 excerpts from menu-interaction.suite.ts.
 * These test cases depend on the allowDeselect attribute and menuService property
 * which were removed in the v6 revert.
 *
 * Imports needed: { test, expect, type Page } from '@playwright/test'
 * The suite function pattern from the original menu-interaction.suite.ts
 */

// --- Excerpt 1: allowDeselect test (was at ~L235) ---
// test('deselect prevented without allowDeselect', async ({ page }) => {
//   await menu(page, 'default').evaluate((el: any) => {
//     (el as any).__deselectPrevented = false;
//     el.addEventListener('auroMenu-deselectPrevented', () => {
//       (el as any).__deselectPrevented = true;
//     }, { once: true });
//   });
//
//   await clickOption(page, 'default', 'Apples');
//   await expect.poll(() => menuValue(page, 'default')).toBe('Apples');
//
//   await clickOption(page, 'default', 'Apples');
//
//   await expect.poll(() =>
//     menu(page, 'default').evaluate((el: any) => (el as any).__deselectPrevented),
//   ).toBe(true);
//
//   // Value should remain
//   await expect.poll(() => menuValue(page, 'default')).toBe('Apples');
// });

// --- Excerpt 2: menuService != null assertions (were at ~L391-407) ---
// test('clicking child option in nested menu selects it on root', async ({ page }) => {
//   await expect.poll(() =>
//     page.locator('[data-testid="nested"] auro-menuoption[value="Child1"]')
//       .evaluate((el: any) => el.menuService != null),
//     { timeout: 5_000 },
//   ).toBe(true);
//
//   await clickOption(page, 'nested', 'Child1');
//   await expect.poll(() => menuValue(page, 'nested'), { timeout: 5_000 }).toBe('Child1');
// });
//
// test('clicking parent-level option still works', async ({ page }) => {
//   await expect.poll(() =>
//     page.locator('[data-testid="nested"] auro-menuoption[value="Parent1"]')
//       .evaluate((el: any) => el.menuService != null),
//     { timeout: 5_000 },
//   ).toBe(true);
//
//   await clickOption(page, 'nested', 'Parent1');
//   await expect.poll(() => menuValue(page, 'nested'), { timeout: 5_000 }).toBe('Parent1');
// });

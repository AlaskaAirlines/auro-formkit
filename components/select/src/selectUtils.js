/**
 * Returns the enabled (non-disabled) options for a menu, safely.
 *
 * Auro-menu's `options` getter returns `undefined` when the menu has no items
 * (initItems sets `items` to undefined for empty menus). Callers that reach for
 * `.find()` / `[...spread]` would otherwise crash; this helper normalizes the
 * empty case to `[]` so array methods are always safe.
 *
 * @param {HTMLElement} menu - The auro-menu element.
 * @returns {Array<HTMLElement>} Non-disabled options, empty array when none.
 */
export function getEnabledOptions(menu) {
  return (menu?.options || []).filter((option) => !option.disabled);
}

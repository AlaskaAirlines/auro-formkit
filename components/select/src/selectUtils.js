/**
 * Returns the enabled (non-disabled) options for a menu, safely.
 *
 * Auro-menu's `options` getter returns `undefined` when the menu has no items
 * (initItems sets `items` to undefined for empty menus). Callers that reach for
 * `.find()` / `[...spread]` would otherwise crash; this helper normalizes the
 * empty case to `[]` so array methods are always safe.
 *
 * @param {HTMLElement | null | undefined} menu - The auro-menu element.
 * @returns {Array<HTMLElement>} Non-disabled options, empty array when none.
 */
export function getEnabledOptions(menu) {
  return (menu?.options || []).filter((option) => !option.disabled);
}

/**
 * Returns the active (selectable + visible) options for type-ahead navigation.
 *
 * Uses auro-menuoption's `isActive` getter, which excludes disabled, hidden,
 * and static options (e.g. `static nomatch` placeholders) so the type-ahead
 * cursor never lands on a non-actionable item. Same empty-safe handling as
 * `getEnabledOptions`.
 *
 * @param {HTMLElement | null | undefined} menu - The auro-menu element.
 * @returns {Array<HTMLElement>} Active options, empty array when none.
 */
export function getActiveOptions(menu) {
  return (menu?.options || []).filter((option) => option.isActive);
}

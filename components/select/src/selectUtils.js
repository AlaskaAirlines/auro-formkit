/**
 * Checks whether an option's own `disabled` or any ancestor `auro-menu`'s
 * `disabled` (root or a nested submenu the option is slotted inside)
 * applies. A menu never writes `disabled` onto its options (AB#1566578), so
 * an ancestor's disabled state has to be resolved at check-time by walking
 * up, mirroring `auro-menu`'s own `isOptionInteractive()`/
 * `isSelectableByValue()` — duplicated here rather than imported since
 * `auro-select` only ever talks to `auro-menu` through its public DOM
 * contract, not its internal module.
 * @param {HTMLElement} option - The option to check.
 * @returns {boolean} True if the option or any ancestor menu is disabled.
 */
function isOptionOrAncestorMenuDisabled(option) {
  if (option.disabled) {
    return true;
  }

  let ancestor = option.closest('auro-menu, [auro-menu]');

  while (ancestor) {
    if (ancestor.disabled) {
      return true;
    }
    ancestor = ancestor.parentElement ? ancestor.parentElement.closest('auro-menu, [auro-menu]') : null;
  }

  return false;
}

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
  return (menu?.options || []).filter((option) => !isOptionOrAncestorMenuDisabled(option));
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

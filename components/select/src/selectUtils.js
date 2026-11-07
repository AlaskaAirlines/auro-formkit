/**
 * Checks whether an option's own `disabled` or any ancestor `auro-menu`'s
 * `disabled` (root or a nested submenu the option is slotted inside)
 * applies. A menu never writes `disabled` onto its options (AB#1566578), so
 * an ancestor's disabled state has to be resolved at check-time by walking
 * up, mirroring `auro-menu`'s own `isOptionInteractive()`/
 * `isSelectableByValue()`. It's duplicated here rather than imported because
 * `auro-select` only ever talks to `auro-menu` through its public DOM
 * contract, not its internal module.
 * @param {HTMLElement} option - The option to check.
 * @returns {boolean} True if the option or any ancestor menu is disabled; false otherwise.
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
 * Gets the options in a menu that aren't disabled, or an empty array when there are none.
 *
 * Options inside a disabled menu or submenu count as disabled. Use it instead of
 * reading `options` directly, because `auro-menu` returns `undefined` for a menu
 * with no options, and array methods such as `.find()` would throw.
 *
 * @param {HTMLElement | null | undefined} menu - The `<auro-menu>` element to read options from.
 * @returns {Array<HTMLElement>} The options that aren't disabled, or an empty array when there are none.
 */
export function getEnabledOptions(menu) {
  return (menu?.options || []).filter((option) => !isOptionOrAncestorMenuDisabled(option));
}

/**
 * Gets the options in a menu that keyboard and type-ahead navigation can land on, or an empty array when there are none.
 *
 * Leaves out options that are disabled, hidden, or static, such as a `static nomatch`
 * placeholder, using each option's `isActive` getter. Like `getEnabledOptions`, it
 * returns an empty array for a menu with no options.
 *
 * @param {HTMLElement | null | undefined} menu - The `<auro-menu>` element to read options from.
 * @returns {Array<HTMLElement>} The options that aren't disabled, hidden, or static, or an empty array when there are none.
 */
export function getActiveOptions(menu) {
  return (menu?.options || []).filter((option) => option.isActive);
}

/**
 * Retrieves the slotted menu option elements from an auro-menu element.
 * @param {HTMLElement} menu - The auro-menu element to query.
 * @returns {Element[]} The array of assigned option elements.
 */
export function getOptions(menu) {
  return menu.shadowRoot.querySelector('slot').assignedElements();
}

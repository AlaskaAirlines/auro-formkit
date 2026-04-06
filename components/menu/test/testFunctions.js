/**
 * Retrieves the slotted menu option nodes from an auro-menu element,
 * filtering out empty text nodes.
 * @param {HTMLElement} menu - The auro-menu element to query.
 * @returns {Node[]} The array of assigned option nodes.
 */
export function getOptions(menu) {
  const options = menu.shadowRoot.querySelector('slot').assignedNodes();

  for (let index = 0; index < options.length; index += 1) {
    if (JSON.stringify(options[index]) === '{}') {
      options.splice(index, 1);
    }
  }

  return options;
}

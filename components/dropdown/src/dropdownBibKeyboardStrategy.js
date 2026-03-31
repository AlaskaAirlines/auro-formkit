/**
 * Creates a keyboard strategy for dialog-specific key handling.
 * All other keydown behavior is left to the browser's native bubbling path.
 * @param {HTMLElement} bib - The dropdown bib element.
 * @returns {Object} Keyboard handlers keyed by `event.key`.
 */
// eslint-disable-next-line no-unused-vars
export function createDropdownBibKeyboardStrategy(bib) {
  return {
    // eslint-disable-next-line no-unused-vars
    Enter(_dialog, event) {
      // Floating UI handles Enter key to open the dropdown
    },
    // eslint-disable-next-line no-unused-vars
    Escape(_dialog, event) {
      // Floating UI handles Escape key to close the dropdown
    }
  };
}

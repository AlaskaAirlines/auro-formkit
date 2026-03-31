/**
 * Creates a keyboard strategy for dialog-specific key handling.
 * All other keydown behavior is left to the browser's native bubbling path.
 * @param {HTMLElement} bib - The dropdown bib element.
 * @returns {Object} Keyboard handlers keyed by `event.key`.
 */
export function createDropdownBibKeyboardStrategy(bib) {
  return {
    Enter(_dialog, event) {
      // Floating UI handles Enter key to open the dropdown
    },
    Escape(_dialog, event) {
      // Floating UI handles Escape key to close the dropdown
    }
  };
}

/**
 * Creates the keyboard strategy for the bib's dialog.
 * Its `Enter` and `Escape` handlers do nothing, because the dropdown's floating UI handles those keys, and all other keys keep the browser's default behavior.
 * @param {HTMLElement} bib - The dropdown bib element.
 * @returns {Object} The keyboard handlers, keyed by `event.key`.
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

/**
 * Sets the value of the native input inside an auro-input element and dispatches an input event.
 * @param {HTMLElement} el - The auro-input element under test.
 * @param {string} value - The value to set on the input.
 * @returns {void}
 */
export function setInputValue(el, value) {
  const input = el.shadowRoot.querySelector('input');
  input.value = value;
  input.dispatchEvent(new InputEvent('input'));
}

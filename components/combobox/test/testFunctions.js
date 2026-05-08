/**
 * Simulates user text entry for the combobox input in tests.
 *
 * Focuses the native input, sets its value, emits input events from both the
 * native input and `auro-input` wrapper, then emits a keyup event on the
 * combobox using the last typed character.
 *
 * @param {HTMLElement} el - The `auro-combobox` element under test.
 * @param {string} value - The text value to apply to the input.
 * @returns {void}
 */
export function setInputValue(el, value) {
  const auroInput = el.input;
  const input = auroInput.shadowRoot.querySelector('input');
  input.focus();
  input.value = value;
  input.dispatchEvent(new InputEvent('input'));
  auroInput.dispatchEvent(new InputEvent('input', {
    bubbles: true,
    composed: true
  }));
  el.dispatchEvent(new KeyboardEvent('keyup', {
    key: value.slice(value.length - 1),
    repeat: false
  }));
}

// ─── comboboxKeyboardStrategy — edge branches ─────────────────────────────────
/**
 * Returns the shadow root that contains the live region for screen reader
 * announcements. Mirrors `_getAnnouncementRoot()` on the component so tests
 * always query the correct root regardless of fullscreen state.
 *
 * @param {object} dropdown - The auro-dropdown element.
 * @param {ShadowRoot} fallbackShadowRoot - The host component's shadow root.
 * @returns {ShadowRoot}
 */
export function getAnnouncementRoot(dropdown, fallbackShadowRoot) {
  if (dropdown.isBibFullscreen && dropdown.isPopoverVisible && dropdown.bibElement?.value) {
    return dropdown.bibElement.value.shadowRoot;
  }
  return fallbackShadowRoot;
}

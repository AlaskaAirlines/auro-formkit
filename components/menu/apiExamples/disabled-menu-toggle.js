/**
 * Demonstrates AB#1566578: toggling the whole menu's `disabled` never
 * mutates an individual option's own authored `disabled` — "First class"
 * stays disabled (sold out) through every toggle, while the other options
 * correctly follow the menu's enabled/disabled state.
 */
export function auroMenuDisabledToggleExample() {
  const menuElem = document.querySelector('#disabledToggleExample');
  const toggleBtnElem = document.querySelector('#disabledToggleExampleBtn');

  if (menuElem && toggleBtnElem) {
    toggleBtnElem.addEventListener('click', () => {
      menuElem.disabled = !menuElem.disabled;
    });
  }
}

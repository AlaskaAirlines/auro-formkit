/**
 * Sets the value of the input.
 * @param {HTMLElement} auroInput - The input element.
 * @param {string} value - The value to set.
 * @returns {void}
 */
export function setInputValue(auroInput, value) {
  auroInput.value = value;
}

/**
 * Gets the input element from the datepicker.
 * @param {HTMLElement} el - The datepicker element.
 * @param {number} index - The index of the input element.
 * @returns {HTMLElement} The input element.
 */
export function getInput(el, index) {
  return el.inputList[index];
}


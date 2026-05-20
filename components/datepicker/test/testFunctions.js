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

/**
 * Returns the Cally calendar element rendered inside the datepicker shadow DOM.
 * @param {HTMLElement} el - The datepicker element.
 * @returns {HTMLElement|null}
 */
export function getCalendar(el) {
  return el.shadowRoot.querySelector('calendar-range, calendar-date');
}

/**
 * Returns all calendar-month elements inside the rendered calendar.
 * @param {HTMLElement} el - The datepicker element.
 * @returns {HTMLElement[]}
 */
export function getCalendarMonths(el) {
  const cal = getCalendar(el);
  if (!cal) return [];
  return [...cal.querySelectorAll('calendar-month')];
}

/**
 * Resolve a calendar day button by ISO date.
 * @param {HTMLElement} el - The datepicker element.
 * @param {string} iso - ISO date string.
 * @returns {HTMLButtonElement|null}
 */
export function getDayButton(el, iso) {
  const cal = getCalendar(el);
  if (!cal) return null;
  return cal.shadowRoot
    ? cal.shadowRoot.querySelector(`button[data-value="${iso}"]`)
    : cal.querySelector(`button[data-value="${iso}"]`);
}

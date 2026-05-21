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
 * Resolve a calendar day button by ISO date. Cally renders day buttons inside
 * each `calendar-month`'s shadow root as `<button class="num" part="...day...">`
 * with a localized `aria-label`. We match by formatted aria-label.
 * @param {HTMLElement} el - The datepicker element.
 * @param {string} iso - ISO date string (YYYY-MM-DD).
 * @param {Intl.DateTimeFormat} [formatter] - Override formatter for aria-label match.
 * @returns {HTMLButtonElement|null}
 */
export function getDayButton(el, iso, formatter) {
  const months = getCalendarMonths(el);
  if (months.length === 0) return null;
  const [yr, mo, dy] = iso.split('-').map(Number);
  const date = new Date(yr, mo - 1, dy);
  const fmt = formatter || new Intl.DateTimeFormat(undefined, {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  const target = fmt.format(date);
  for (const m of months) {
    if (!m.shadowRoot) continue;
    const buttons = m.shadowRoot.querySelectorAll('button.num');
    for (const btn of buttons) {
      if (btn.getAttribute('aria-label') === target) return btn;
    }
  }
  return null;
}

import { html } from 'lit';
import { AuroDatepickerUtilities } from './utilities.js';
import { dateFormatter } from '@aurodesignsystem/auro-library/scripts/runtime/dateUtilities/dateFormatter.mjs';

/**
 * Helpers the datepicker and its calendar use to set the month the calendar shows, and to choose and render the calendar's months.
 */
export class UtilitiesCalendarRender {
  constructor() {

    /**
     * The date helpers these methods use.
     * @private
     */
    this.util = new AuroDatepickerUtilities();
  }

  /**
   * Sets `centralDate` to the first day of the date's month, when the date is valid.
   * @param {Object} elem - The element to set `centralDate` on.
   * @param {string|Date|number} date - The date whose month to show: an ISO date string, a `Date` object, or a timestamp in milliseconds.
   * @private
   */
  updateCentralDate(elem, date) {
    // if date is already iso formatted string, we can skip the conversion and validation step
    if (typeof date === 'string' && dateFormatter.isValidDate(date)) {
      // eslint-disable-next-line
      elem.centralDate = date.replace(/(\d{4})-(\d{2})-(\d{2})/, '$1-$2-01'); // Set to first of the month
      return;
    }

    // Accept Date objects, Unix timestamps (numbers), and ISO strings
    const dateObj = new Date(date);

    if (isNaN(dateObj)) {
      return;
    }

    dateObj.setDate(1);
    dateObj.setHours(0, 0, 0, 0);
    elem.centralDate = dateFormatter.toISOFormatString(dateObj);
  }

  /**
   * Determines how many months to render based on the defined calendar range.
   * @param {Object} elem - The auro-calendar element.
   * @private
   * @returns {Number} The number of months from calendarStartDate through calendarEndDate.
   */
  determineDefinedCalendarRange(elem) {
    if (elem.getAttribute('calendarStartDate') && elem.getAttribute('calendarEndDate')) {
      // if we have a defined range of months, use that
      // prop is not in sync with attribute yet, use attribute value
      elem.calendarRangeMonths = elem.util.monthDiff(dateFormatter.stringToDateInstance(elem.getAttribute('calendarStartDate')), dateFormatter.stringToDateInstance(elem.getAttribute('calendarEndDate')));
    } else {
      // if we don't have a defined range of months, use undefined
      elem.calendarRangeMonths = undefined;
    }

    return elem.calendarRangeMonths;
  }

  /**
   * Determines how many calendar months can be rendered based on the screen size and defined range.
   * @param {Object} elem - The auro-calendar element.
   * @param {Boolean} isMobile - If true, sizes the calendar for the fullscreen mobile view. If false, sizes it for the dropdown.
   * @private
   * @returns {Number} The maximum number of months that can be rendered.
   */
  maximumRenderableMonths(elem, isMobile) {
    const definedRangeMonths = this.determineDefinedCalendarRange(elem);

    // number of calendars that could be rendered at a time
    let numCalendars = 1;

    // range supported calendars use two viewable months in desktop view
    if (!elem.noRange) {
      numCalendars = 2; // eslint-disable-line no-magic-numbers
    }

    // change the max calendar number when viewed on mobile
    if (isMobile) {
      // use definedRangeMonths if we have it otherwise default to 12
      numCalendars = definedRangeMonths || 12; // eslint-disable-line no-magic-numbers
    }

    // If we have a defined range of months and it's less than the numCalendars, use the defined range.
    // This covers the scenario where the datepicker has "range" but the available months are less than 2.
    if (definedRangeMonths && definedRangeMonths < numCalendars) {
      numCalendars = definedRangeMonths;
    }

    return numCalendars;
  }


  /**
   * Determines the number of months rendered inside the calendar.
   * @param {Object} elem - The auro-calendar element.
   * @param {Boolean} isMobile - If true, sizes the calendar for the fullscreen mobile view. If false, sizes it for the dropdown.
   * @private
   * @returns {void}
   */
  determineNumCalendarsToRender(elem, isMobile) {
    // 1. Determine the maximum number of months that can be rendered.
    //    This is based on the screen size and the defined range of months.
    const maxRenderableMonths = this.maximumRenderableMonths(elem, isMobile);

    // 2. Start by assuming we can render the max number of months.
    let calendarCount = maxRenderableMonths;

    // 3. If maximumRenderableMonths() returns 0 (e.g. an invalid/empty defined range),
    //    fall back to the min/max date range so something is rendered.
    if (!calendarCount && elem.minDate && elem.maxDate) {
      calendarCount = this.util.monthDiff(elem.minDateObject, elem.maxDateObject);
    }

    if (elem.numCalendars !== calendarCount) {
      elem.numCalendars = calendarCount;
      elem.requestUpdate();
    }
  }

  /**
   * Determines which month to render first.
   * @param {Object} elem - The auro-calendar element.
   * @private
   * @returns {void}
   */
  setFirstRenderableMonthDate(elem) {
    const start = elem.getAttribute('calendarStartDate');
    const min = elem.getAttribute('minDate');

    let firstMonthDate = new Date();

    if (start) {
      firstMonthDate = dateFormatter.stringToDateInstance(start);
    } else if (min) {
      firstMonthDate = dateFormatter.stringToDateInstance(min);
    }

    // sets to the first day of the month
    elem.firstMonthRenderable = elem.util.convertDateToFirstOfMonth(firstMonthDate);
  }

  /**
   * Renders an `auro-formkit-calendar-month` element for one month.
   * @private
   * @param {Object} elem - The auro-calendar element.
   * @param {Number} month - The month the calendar displays.
   * @param {Number} year - The year the calendar displays.
   * @returns {Object} The `auro-formkit-calendar-month` template.
   */
  renderCalendar(elem, month, year) {
    return html`
      <auro-formkit-calendar-month
        id="${`month-${month}-${year}`}"
        .disabledDays="${elem.disabledDays}"
        .min="${elem.minDateObject?.getTime() / 1000}"
        .max="${elem.maxDateObject?.getTime() / 1000}"
        ?noRange="${elem.noRange}"
        .monthFirst="${elem.monthFirst}"
        .dateTo="${elem.dateTo}"
        .dateFrom="${elem.dateFrom}"
        .locale="${elem.locale}"
        .localeCode="${elem.localeCode}"
        .monthNames="${elem.monthNames}"
        month="${month}"
        year="${year}"
        @hovered-date-changed="${elem.hoveredDateChanged}"
        @date-from-changed="${elem.dateFromChanged}"
        @date-to-changed="${elem.dateToChanged}"
      >
      </auro-formkit-calendar-month>
    `;
  }
}

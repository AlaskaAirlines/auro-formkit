import { html } from 'lit';
import { AuroDatepickerUtilities } from './utilities.js';
import { dateFormatter } from '@aurodesignsystem/auro-library/scripts/runtime/dateUtilities/dateFormatter.mjs';

export class UtilitiesCalendarRender {
  constructor() {
    this.util = new AuroDatepickerUtilities();
  }

  /**
   * Attempt to update the central date but only if the date is a valid date.
   * @param {Object} elem - The element to set the centralDate on.
   * @param {String} date - The date to set the centralDate to.
   * @private
   */
  updateCentralDate(elem, date) {
    // if date is already iso formatted string, we can skip the conversion and validation step
    if (typeof date === 'string' && !dateFormatter.isValidDate(date)) {
      elem.centralDate = date;
      return;
    }

    // Accept Date objects, Unix timestamps (numbers), and ISO strings
    const dateObj = date instanceof Date || typeof date === 'number' ? new Date(date) : dateFormatter.stringToDateInstance(date);

    if (!dateObj || isNaN(dateObj)) {
      return;
    }

    dateObj.setDate(1);
    dateObj.setHours(0, 0, 0, 0);
    elem.centralDate = dateFormatter.toISOFormatString(dateObj);
  }

  /**
   * Determine how many months to render based on the defined calendar range.
   * @param {Object} elem - The auro-calendar element.
   * @private
   * @returns {Number} Returns the number of months between the calendarStartDate and the calendarEndDate.
   */
  determineDefinedCalendarRange(elem) {
    if (elem.getAttribute('calendarStartDate') && elem.getAttribute('calendarEndDate')) {
      // if we have a defined range of months, use that
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
   * @param {Boolean} isMobile - True if it's to render for mobile view.
   * @private
   * @returns {Number} Returns the maximum number of months that can be rendered.
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
   * @param {Boolean} isMobile - True if it's to render for mobile view.
   * @private
   * @returns {void}
   */
  determineNumCalendarsToRender(elem, isMobile) {
    // 1. Determine the maximum number of months that can be rendered.
    //    This is based on the screen size and the defined range of months.
    const maxRenderableMonths = this.maximumRenderableMonths(elem, isMobile);

    // 2. Start by assuming we can render the max number of months.
    let calendarCount = maxRenderableMonths;

    // 3. If we didn't get a count early, restrict based on min/max date.
    if (!calendarCount && elem.minDate && elem.maxDate) {
      const monthsInRange = this.util.monthDiff(dateFormatter.stringToDateInstance(elem.minDate), dateFormatter.stringToDateInstance(elem.maxDate));

      if (monthsInRange < maxRenderableMonths) {
        calendarCount = monthsInRange;
      }
    }

    if (elem.numCalendars !== calendarCount) {
      elem.numCalendars = calendarCount;
      elem.requestUpdate();
    }
  }

  /**
   * Determine which month is to be rendered first.
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
   * Renders one auro-calendar-month HTML for the given month/date combination.
   * @private
   * @param {Object} elem - The auro-calendar element.
   * @param {Number} month - Month the calendar displays.
   * @param {Number} year - Year the calendar displays.
   * @returns {Object} Returns the auro-calendar-month HTML.
   */
  renderCalendar(elem, month, year) {
    return html`
      <auro-formkit-calendar-month
        id="${`month-${month}-${year}`}"
        .disabledDays="${elem.disabledDays}"
        .min="${elem.min}"
        .max="${elem.max}"
        ?noRange="${elem.noRange}"
        .monthFirst="${elem.monthFirst}"
        .hoveredDate="${elem.hoveredDate}"
        .dateTo="${elem.dateTo}"
        .dateFrom="${elem.dateFrom}"
        .locale="${elem.locale}"
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

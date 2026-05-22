import { AuroDatepickerUtilities } from './utilities.js';
import { dateFormatter } from '@aurodesignsystem/auro-library/scripts/runtime/dateUtilities/dateFormatter.mjs';

export class CalendarUtilities {
  constructor() {
    this.util = new AuroDatepickerUtilities();
  }


  /**
   * Scroll the calendar month list to a given valid date if in mobile view.
   * @param {Object} elem - The calendar element.
   * @param {String} date - The date to scroll into view.
   * @param {String} format - The format of the date.
   * @returns {void}
   */
  scrollMonthIntoView(elem, date) {
    const mobileLayout = window.innerWidth < elem.mobileBreakpoint;

    if (dateFormatter.isValidDate(date) && mobileLayout) {
      const dateObj = dateFormatter.stringToDateInstance(date);
      const month = dateObj.getMonth() + 1;
      const year = dateObj.getFullYear();
      const selector = `#month-${month}-${year}`;
      const monthElem = elem.shadowRoot.querySelector(selector);

      monthElem.scrollIntoView();
    }
  }

  /**
   * Sends an event requesting the dropdown bib be closed.
   * @private
   * @returns {void}
   */
  requestDismiss() {
    this.dispatchEvent(new CustomEvent('auroCalendar-dismissRequest', {
      bubbles: true,
      cancelable: false,
      composed: true,
    }));
  }

  /**
   * Handles the visibility of the previous and next month buttons.
   * @param {Object} elem - The auro-calendar element.
   * @returns {void}
   */
  assessNavigationButtonVisibility(elem) {

    /**
     * Hide/show the previous month button.
     */

    // 1. Compare the first rendered month to the earliest renderable month to determine if the previous month button should be hidden or shown
    if (!elem.hasAttribute('calendarStartDate') && !elem.hasAttribute('minDate')) {
      elem.showPrevMonthBtn = true;
    } else if (elem.centralDateObject <= elem.firstMonthRenderable) {
      elem.showPrevMonthBtn = false;
    } else {
      elem.showPrevMonthBtn = true;
    }

    /**
     * Hide/show the next month button.
     */

    // 1. Determine the last month that can possibly be rendered into the DOM.
    let lastRenderableMonth = undefined; // eslint-disable-line no-undef-init

    if (elem.hasAttribute('calendarEndDate')) {
      lastRenderableMonth = dateFormatter.stringToDateInstance(elem.getAttribute('calendarEndDate'));
    } else if (elem.maxDateObject) {
      lastRenderableMonth = elem.maxDateObject;
    }

    if (lastRenderableMonth) {
      lastRenderableMonth = this.util.convertDateToFirstOfMonth(lastRenderableMonth);
    }

    // 2. Determine the last month currently rendered into the DOM.
    let lastRenderedMonth = elem.centralDateObject;

    if (!elem.noRange) {
      lastRenderedMonth = new Date(lastRenderedMonth.setMonth(lastRenderedMonth.getMonth() + 1));
    }

    lastRenderedMonth = this.util.convertDateToFirstOfMonth(lastRenderedMonth);

    // 3. Compare the two and choose to show or hide the next month button
    if (lastRenderedMonth >= lastRenderableMonth) {
      elem.showNextMonthBtn = false;
    } else {
      elem.showNextMonthBtn = true;
    }

    // Request an update to the component needed to actually show/hide the buttons in the DOM
    elem.requestUpdate();
  }

  /**
   * Handles the change of the centralDate property.
   * @param {Object} elem - The auro-calendar element.
   * @private
   * @returns {void}
   */
  centralDateChanged(elem) {
    this.assessNavigationButtonVisibility(elem);

    elem.dispatchEvent(new CustomEvent('auroCalendar-centralDateChanged', {
      detail: {
        bubbles: true,
        cancelable: false,
        composed: true,
        date: elem.centralDate
      }
    }));
  }

  /**
   * Updates the month and year when the user navigates to a different calendar month.
   * @param {Object} elem - The auro-calendar element.
   * @param {String} direction - The direction the user is navigating.
   * @returns {void}
   */
  handleMonthChange(elem, direction) {
    // Determine if the month number is going to be incremented or decremented
    let increment = 0;

    if (direction === 'next') {
      increment = 1;
    } else if (direction === 'prev') {
      increment = -1; // eslint-disable-line no-magic-numbers
    }

    // Get new central date for calendar view
    const {firstRenderedMonth, centralDateObject} = elem;
    let newCentralDate = null;

    if (centralDateObject) {
      // Use current central date as base and adjust month by increment
      newCentralDate = new Date(centralDateObject).setMonth(centralDateObject.getMonth() + increment, 1);
    } else {
      // Fallback to first rendered month if central date invalid
      newCentralDate = new Date(firstRenderedMonth).setMonth(new Date(firstRenderedMonth).getMonth() + increment, 1);
    }

    elem.centralDate = dateFormatter.toISOFormatString(new Date(newCentralDate));
  }
}

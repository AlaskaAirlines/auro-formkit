/* eslint-disable array-element-newline, dot-location */

import { dateFormatter } from '@aurodesignsystem/auro-library/scripts/runtime/dateUtilities/dateFormatter.mjs';

export class AuroDatepickerUtilities {

  /**
   * Converts an ISO date string (yyyy-mm-dd) to any display format.
   * @param {string} isoStr - ISO date string.
   * @param {string} format - Target display format (e.g. "mm/dd/yyyy", "dd/mm/yyyy").
   * @returns {string|undefined}
   */
  toCustomFormat(isoStr, format) {
    if (!isoStr || !format) return undefined;
    try {
      const date = dateFormatter.stringToDateInstance(isoStr);
      const year = String(date.getFullYear()).padStart(4, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return format.toLowerCase()
        .replace(/yyyy/iu, year)
        .replace(/yy/iu, year.slice(-2))
        .replace(/mm/iu, month)
        .replace(/dd/iu, day);
    } catch {
      return undefined;
    }
  }

  /**
   * Converts any date object to a date object representing the first day of the month.
   * @param {Object} date - Date to convert to the first day of the month.
   * @returns {Object}
   */
  convertDateToFirstOfMonth(date) {
    const dateObj = new Date(date);
    return new Date(dateObj.getFullYear(), dateObj.getMonth(), 1);
  }

  /**
   * Calculate the number of months between two dates.
   * @param {Object} date1 - First date to compare.
   * @param {Object} date2 - Second date to compare.
   * @returns {Number}
   */
  monthDiff(date1, date2) {
    let months = 0;
    months = (date2.getFullYear() - date1.getFullYear()) * 12; // eslint-disable-line no-magic-numbers
    months -= date1.getMonth();
    months += date2.getMonth();
    months += 1;
    return months <= 0 ? 0 : months;
  }

  /**
   * Convert a date object or timestamp to an ISO string (yyyy-mm-dd).
   * @param {Date|number} date - Date object or timestamp.
   * @returns {string|undefined}
   */
  getDateAsString(date) {
    if (!date) return undefined;
    try {
      const d = date instanceof Date ? date : new Date(date);
      return dateFormatter.toISOFormatString(d);
    } catch {
      return undefined;
    }
  }

  /**
   * Function to format a number to two digits.
   * @private
   * @param {Number} num - Number to format.
   * @returns {String}
   */
  formatTwoDigits(num) {
    const singleDigitThreshold = 10;
    return num < singleDigitThreshold ? `0${num}` : num;
  }

  /**
   * Function to generate checkmark svg.
   * @private
   * @param {Object} icon - Icon object containing the SVG.
   * @returns {Object}
   */
  generateIconHtml(icon) {
    this.dom = new DOMParser().parseFromString(icon.svg, 'text/html');
    this.svg = this.dom.body.firstChild;
    return this.svg;
  }

  /**
   * Compares two dates to see if they match.
   * @private
   * @param {Object} date1 - First date to compare.
   * @param {Object} date2 - Second date to compare.
   * @returns {Boolean}
   */
  datesMatch(date1, date2) {
    return new Date(date1).getTime() === new Date(date2).getTime();
  }
}

/* eslint-disable array-element-newline, dot-location */

import { dateFormatter } from '@aurodesignsystem/auro-library/scripts/runtime/dateUtilities/dateFormatter.mjs';

export class AuroDatepickerUtilities {

  /**
   * Converts a date to a `Date` object for the first day of its month, at local midnight.
   * @param {Date} date - The date to convert.
   * @returns {Date} The first day of the date's month.
   */
  convertDateToFirstOfMonth(date) {
    const dateObj = new Date(date);
    return new Date(dateObj.getFullYear(), dateObj.getMonth(), 1);
  }

  /**
   * Counts the calendar months from `date1` through `date2`, including both months. Returns 0 when `date2` is in an earlier month.
   * @param {Date} date1 - The first date.
   * @param {Date} date2 - The last date.
   * @returns {Number} The number of months.
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
   * Creates an SVG element from an icon's markup.
   * @private
   * @param {Object} icon - The icon object containing the SVG.
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
   * @param {Object} date1 - The first date to compare.
   * @param {Object} date2 - The second date to compare.
   * @returns {Boolean} True if the dates match; false otherwise.
   */
  datesMatch(date1, date2) {
    return new Date(date1).getTime() === new Date(date2).getTime();
  }
}

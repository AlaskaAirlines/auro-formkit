/* eslint-disable array-element-newline, dot-location */

import { dateFormatter } from '@aurodesignsystem/auro-library/scripts/runtime/dateUtilities/dateFormatter.mjs';

export class AuroDatepickerUtilities {

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

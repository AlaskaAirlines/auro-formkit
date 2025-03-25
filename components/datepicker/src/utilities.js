/* eslint-disable array-element-newline, dot-location */

import { AuroDateUtilities } from '@aurodesignsystem/auro-library/scripts/runtime/dateUtilities.mjs';

export class AuroDatepickerUtilities extends AuroDateUtilities {

  /**
   * Converts a date string to a custom date format.
   * @private
   * @param {string} dateStr - Date string to parse.
   * @param {string} format - Date format to parse.
   * @returns {void}
   */
  toCustomFormat(dateStr, format) {
    const [month, day, year] = dateStr.split('/');

    if (!month || !day || !year) {
      return undefined;
    }

    let formattedDate = format;

    formattedDate = formattedDate
      .replace('mm', month)
      .replace('dd', day)
      .replace('yyyy', year);

    return formattedDate;
  }

  /**
   * Converts any date object to a date object representing the first day of the month.
   * @param {Object} date - Date to convert to the first day of the month.
   * @returns {Object} Returns the auro-calendar-months HTML.
   */
  convertDateToFirstOfMonth(date) {
    const dateObj = new Date(date);

    return new Date(dateObj.getFullYear(), dateObj.getMonth(), 1);
  }

  /**
   * Calculate the number of months between two dates.
   * @param {Object} date1 - First date to compare.
   * @param {Object} date2 - Second date to compare.
   * @returns {Number} Returns the number of months between the two dates.
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
   * @returns {Object} Returns the svg portion of the icon object.
   */
  generateIconHtml(icon) {
    this.dom = new DOMParser().parseFromString(icon.svg, 'text/html');
    this.svg = this.dom.body.firstChild;

    return this.svg;
  }
}

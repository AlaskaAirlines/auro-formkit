// Copyright (c) 2026 Alaska Airlines. All rights reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

const DATE_STR_LENGTH = 10;

export class AuroDatepickerUtilities {

  /**
   * True if `date` is a valid date string in the given `format`.
   * @param {string} date
   * @param {string} format
   * @returns {boolean}
   */
  validDateStr(date, format) {
    if (!date || !format || date.length !== DATE_STR_LENGTH) {
      return false;
    }

    const iso = this.displayToIso(date, format);
    if (!iso) {
      return false;
    }
    return !Number.isNaN(Date.parse(iso));
  }

  /**
   * Convert a display-formatted date string (e.g. `mm/dd/yyyy`) to ISO `YYYY-MM-DD`.
   * Returns undefined for invalid input.
   * @param {string} dateStr
   * @param {string} format
   * @returns {string|undefined}
   */
  displayToIso(dateStr, format) {
    const parsed = this.parseDate(dateStr, format);
    if (!parsed) {
      return undefined;
    }
    const { year, month, day } = parsed;
    if (!year || !month || !day) {
      return undefined;
    }
    return `${year}-${month}-${day}`;
  }

  /**
   * Convert an ISO `YYYY-MM-DD` date string to the given display `format`.
   * Returns undefined for invalid input.
   * @param {string} iso
   * @param {string} format
   * @returns {string|undefined}
   */
  isoToDisplay(iso, format) {
    if (!iso || iso.length !== DATE_STR_LENGTH) {
      return undefined;
    }
    const match = iso.match(/^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})$/u);
    if (!match || !match.groups) {
      return undefined;
    }
    const { year, month, day } = match.groups;
    const f = format || 'mm/dd/yyyy';
    return f.
      replace('yyyy', year).
      replace('mm', month).
      replace('dd', day);
  }

  /**
   * Parse a date string into `{year, month, day}` components according to `format`.
   * @param {string} dateStr
   * @param {string} format
   * @returns {{year:string, month:string, day:string}|undefined}
   */
  parseDate(dateStr, format) {
    if (!dateStr) {
      return undefined;
    }
    const dateFormat = format || 'mm/dd/yyyy';
    const formatPatterns = {
      'yyyy': '(?<year>\\d{4})',
      'mm': '(?<month>\\d{2})',
      'dd': '(?<day>\\d{2})'
    };
    let regexPattern = dateFormat.replace(/(?:yyyy|mm|dd)/gu, (m) => formatPatterns[m]);
    regexPattern = `^${regexPattern}$`;
    const match = dateStr.match(new RegExp(regexPattern, 'u'));
    if (match && match.groups) {
      return {
        year: match.groups.year,
        month: match.groups.month,
        day: match.groups.day
      };
    }
    return undefined;
  }

  /**
   * Convert any value the platform accepts (Date or ISO string) to ISO `YYYY-MM-DD`.
   * @param {Date|string|number|undefined} input
   * @returns {string|undefined}
   */
  toIso(input) {
    if (input === undefined || input === null || input === '') {
      return undefined;
    }
    if (typeof input === 'string' && (/^\d{4}-\d{2}-\d{2}$/u).test(input)) {
      return input;
    }
    const d = input instanceof Date ? input : new Date(input);
    if (Number.isNaN(d.getTime())) {
      return undefined;
    }
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  /**
   * Parse an ISO `YYYY-MM-DD` string into a local-time Date at midnight.
   * Avoids timezone interpretation that `new Date("YYYY-MM-DD")` (UTC) would apply.
   * @param {string} iso
   * @returns {Date|undefined}
   */
  isoToDate(iso) {
    if (!iso || typeof iso !== 'string') {
      return undefined;
    }
    const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/u);
    if (!m) {
      return undefined;
    }
    const [
      , y,
      mo,
      d
    ] = m;
    return new Date(Number(y), Number(mo) - 1, Number(d));
  }

  /**
   * True if two ISO date strings refer to the same day.
   * @param {string|undefined} a
   * @param {string|undefined} b
   * @returns {boolean}
   */
  isoMatch(a, b) {
    return Boolean(a) && Boolean(b) && a === b;
  }
}

// Copyright (c) 2026 Alaska Airlines. All rights reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

/* eslint-disable no-magic-numbers, id-length, prefer-named-capture-group */

import { buildPatternMask } from '../../input/src/localeMask.js';

const ISO_LENGTH = 10;

export class AuroDatepickerUtilities {

  /**
   * True if `date` is a valid date string in the given `format`.
   * @param {string} date - Display-formatted date string.
   * @param {string} format - Lowercase token pattern (e.g. `dd.mm.yyyy`).
   * @returns {boolean} True when the input parses to a valid Date.
   */
  validDateStr(date, format) {
    if (!date || !format) {
      return false;
    }
    const parsed = this.parseDate(date, format);
    if (!parsed) {
      return false;
    }
    const { year, month, day } = parsed;
    if (!year || !month || !day) {
      return false;
    }
    return !Number.isNaN(new Date(Number(year), Number(month) - 1, Number(day)).getTime());
  }

  /**
   * Convert a display-formatted date string to ISO `YYYY-MM-DD`.
   * Returns undefined for invalid input.
   * @param {string} dateStr - Display-formatted date string.
   * @param {string} format - Lowercase token pattern.
   * @returns {string|undefined} ISO date string.
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
   * @param {string} iso - ISO 8601 date string.
   * @param {string} format - Lowercase token pattern.
   * @returns {string|undefined} Display-formatted date.
   */
  isoToDisplay(iso, format) {
    if (!iso || iso.length !== ISO_LENGTH) {
      return undefined;
    }
    const match = iso.match(/^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})$/u);
    if (!match || !match.groups) {
      return undefined;
    }
    const { year, month, day } = match.groups;
    const pattern = format || 'mm/dd/yyyy';
    return pattern.
      replace('yyyy', year).
      replace('mm', month).
      replace('dd', day);
  }

  /**
   * Parse a date string into `{year, month, day}` components according to `format`.
   * Uses `buildPatternMask` so arbitrary literal separators (`.`, `年`, `月`, `日`) parse.
   * @param {string} dateStr - Display-formatted date string.
   * @param {string} format - Lowercase token pattern.
   * @returns {{year:string, month:string, day:string}|undefined} Parsed components.
   */
  parseDate(dateStr, format) {
    if (!dateStr) {
      return undefined;
    }
    const pattern = format || 'mm/dd/yyyy';
    const date = buildPatternMask(pattern).parse(dateStr);
    if (!date) {
      return undefined;
    }
    return {
      year: String(date.getFullYear()).padStart(4, '0'),
      month: String(date.getMonth() + 1).padStart(2, '0'),
      day: String(date.getDate()).padStart(2, '0')
    };
  }

  /**
   * Convert any value the platform accepts (Date or ISO string) to ISO `YYYY-MM-DD`.
   * @param {Date|string|number|undefined} input - Source value to convert.
   * @returns {string|undefined} ISO date string, or undefined if invalid.
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
   * @param {string} iso - ISO date string in `YYYY-MM-DD` form.
   * @returns {Date|undefined} Local-time Date, or undefined if input is malformed.
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
   * @param {string|undefined} a - First ISO date string.
   * @param {string|undefined} b - Second ISO date string.
   * @returns {boolean} True when both are present and equal.
   */
  isoMatch(a, b) {
    return Boolean(a) && Boolean(b) && a === b;
  }
}

/* eslint-disable no-magic-numbers, no-unused-vars */

import { dateFormatter } from "@aurodesignsystem/auro-library/scripts/runtime/dateUtilities/dateFormatter.mjs";
import { AuroInputUtilities } from "./utilities.js";

/**
 * Converts an ISO date string (`yyyy-mm-dd`) to the same date written in another format.
 *
 * Works like `AuroInputUtil.toISOFormatString` in reverse:
 * instead of `Date` to ISO, it goes from ISO to a display format.
 *
 * @param {string} isoStr - The ISO date string, such as `2024-01-15`.
 * @param {string} format - The display format, such as `mm/dd/yyyy`, `dd/mm/yyyy`, or `yyyy/mm/dd`.
 * @returns {string|undefined} The date in the display format, or `undefined` if either argument is empty or the date isn't valid.
 */
function formatISODate(isoStr, format) {
  if (!isoStr || !format) {
    return undefined;
  }

  try {
    const date = dateFormatter.stringToDateInstance(isoStr);

    // `stringToDateInstance` returns an `Invalid Date` for malformed strings
    // and `null` for non-string input — it does NOT throw. Without this
    // guard, `getFullYear()`/`getMonth()`/`getDate()` on an Invalid Date
    // yield `NaN`, and `String(NaN).padStart(4, '0')` produces literals
    // like "0NaN/0NaN/0NaN" instead of `undefined`.
    if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
      return undefined;
    }

    const year = String(date.getFullYear()).padStart(4, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return format.toLowerCase().
      replace(/yyyy/iu, year).
      replace(/yy/iu, year.slice(-2)).
      replace(/mm/iu, month).
      replace(/dd/iu, day);
  } catch (err) {
    // Defensive: the Date-returning path is guarded above, but `parseDate`
    // (inside `stringToDateInstance`) could throw on pathological input
    // future-library-versions might introduce. Treat any thrown error as
    // "not a valid date" and return undefined.
    return undefined;
  }
}

/**
 * Helpers that convert dates between `Date` objects, ISO date strings (`YYYY-MM-DD`), and display formats, such as `mm/dd/yyyy`.
 */
export const AuroInputUtil = {
  toISOFormatString: dateFormatter.toISOFormatString,
  formatISODate,
  toFormattedValue: AuroInputUtilities.prototype.toFormattedValue.bind(new AuroInputUtilities()),
};

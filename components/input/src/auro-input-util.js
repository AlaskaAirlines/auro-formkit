/* eslint-disable no-magic-numbers, no-unused-vars */

import { dateFormatter } from "@aurodesignsystem/auro-library/scripts/runtime/dateUtilities/dateFormatter.mjs";
import { AuroInputUtilities } from "./utilities.js";

/**
 * Converts an ISO date string (yyyy-mm-dd) to a display string in the given format.
 *
 * Mirrors the approach of `toISOFormatString` in dateFormatter.mjs but in reverse:
 * instead of Date → ISO, this goes ISO → display format.
 *
 * @param {string} isoStr - ISO date string in yyyy-mm-dd format.
 * @param {string} format - Target display format (e.g. "mm/dd/yyyy", "dd/mm/yyyy", "yyyy/mm/dd").
 * @returns {string|undefined} Display-formatted date string, or undefined if the input is invalid.
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

export const AuroInputUtil = {
  toISOFormatString: dateFormatter.toISOFormatString,
  formatISODate,
  toFormattedValue: AuroInputUtilities.prototype.toFormattedValue.bind(new AuroInputUtilities()),
};

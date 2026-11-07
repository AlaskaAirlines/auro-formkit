/**
 * Single source of truth for parsing and matching blackout dates across the
 * datepicker. Both `auro-calendar` (memoized Set + `isDateBlackout`) and the
 * pre-`firstUpdated` fallback inside `auro-calendar-cell` route through these
 * helpers so the YYYY-MM-DD → seconds conversion and the merge-with-legacy
 * `disabledDays` rules are defined exactly once.
 */

/**
 * Converts a `YYYY-MM-DD` ISO date string to a Unix timestamp (seconds)
 * representing local midnight on that calendar day. Returns `null` for
 * inputs that don't parse to a finite timestamp.
 *
 * Uses the `new Date(year, monthIndex, day)` constructor, not
 * `new Date(isoStr)`, so the result is local midnight rather than UTC
 * midnight. This keeps the calendar grid aligned with the user's
 * local calendar day in negative-offset timezones.
 *
 * @param {string} isoStr - The date string, in `YYYY-MM-DD` format.
 * @returns {number|null} The local-midnight Unix timestamp, in seconds, or null.
 */
export function parseIsoToTimestamp(isoStr) {
  // Strict YYYY-MM-DD matcher with named groups. Rejects trailing garbage
  // ("2024x-01-01"), short segments ("2024-1-1"), and any non-digit
  // characters. `parseInt` alone accepted both because it stops at the
  // first non-digit and doesn't require a minimum length.
  const ISO_DATE_RE = /^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})$/u;
  const MAX_MONTH = 12;
  const MAX_DAY = 31;

  if (typeof isoStr !== 'string') {
    return null;
  }
  const match = ISO_DATE_RE.exec(isoStr);
  if (!match) {
    return null;
  }
  const year = Number(match.groups.year);
  const month = Number(match.groups.month);
  const day = Number(match.groups.day);
  // Reject overflow values like "2024-13-40" — JS `new Date(year, month, day)`
  // silently normalizes those to a different calendar day, which would
  // disable the wrong date if we let the result through.
  if (month < 1 || month > MAX_MONTH || day < 1 || day > MAX_DAY) {
    return null;
  }
  const date = new Date(year, month - 1, day);
  // Guard the residual case where JS still rolls a value (e.g. Feb 30 → Mar 2).
  // After construction, getFullYear/getMonth/getDate should match the inputs.
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null;
  }
  const ts = Math.floor(date.getTime() / 1000);
  return Number.isFinite(ts) ? ts : null;
}

/**
 * Creates a `Set<number>` of Unix timestamps, in seconds, from both the
 * deprecated `disabledDays` timestamp array and the ISO `blackoutDates`
 * array. Use it for fast lookups in code that runs often, such as cell rendering.
 *
 * @param {Array<string|number>|undefined} disabledDays - The deprecated array of Unix timestamps.
 * @param {Array<string>|undefined} blackoutDates - The array of ISO `YYYY-MM-DD` date strings.
 * @returns {Set<number>} The blackout dates, as Unix timestamps in seconds.
 */
export function buildBlackoutSet(disabledDays, blackoutDates) {
  const set = new Set();
  if (Array.isArray(disabledDays)) {
    for (const day of disabledDays) {
      const ts = parseInt(day, 10);
      if (Number.isFinite(ts)) {
        set.add(ts);
      }
    }
  }
  if (Array.isArray(blackoutDates)) {
    for (const isoStr of blackoutDates) {
      const ts = parseIsoToTimestamp(isoStr);
      if (ts !== null) {
        set.add(ts);
      }
    }
  }
  return set;
}

/**
 * Checks whether one timestamp is a blackout date in either source.
 * Creates a new `Set` on each call, so use it only in code that runs rarely,
 * such as a cell's first render. In code that runs often, keep the `Set` from
 * `buildBlackoutSet` and call its `has()` method instead.
 *
 * @param {number} dateTs - The Unix timestamp, in seconds, to check.
 * @param {Array<string|number>|undefined} disabledDays - The deprecated array of Unix timestamps.
 * @param {Array<string>|undefined} blackoutDates - The array of ISO `YYYY-MM-DD` date strings.
 * @returns {boolean} True if the timestamp is a blackout date; false otherwise.
 */
export function isBlackoutTimestamp(dateTs, disabledDays, blackoutDates) {
  return buildBlackoutSet(disabledDays, blackoutDates).has(dateTs);
}

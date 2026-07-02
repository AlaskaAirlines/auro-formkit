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
 * Uses the `new Date(year, monthIndex, day)` constructor (NOT
 * `new Date(isoStr)`) so the result is local-midnight rather than UTC
 * midnight — required to keep the calendar grid aligned with the user's
 * local calendar day in negative-offset timezones.
 *
 * @param {string} isoStr - Date string in `YYYY-MM-DD` format.
 * @returns {number|null} Local-midnight Unix timestamp (seconds), or null.
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
 * Builds a `Set<number>` of seconds-since-epoch timestamps covering both the
 * legacy `disabledDays` (already-numeric) array and the ISO `blackoutDates`
 * array. Use this for O(1) membership checks in hot paths.
 *
 * @param {Array<string|number>|undefined} disabledDays - Legacy timestamp array.
 * @param {Array<string>|undefined} blackoutDates - ISO `YYYY-MM-DD` array.
 * @returns {Set<number>}
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
 * One-shot membership test for a single timestamp against both blackout
 * sources. Allocates a Set on each call; only use this in cold paths
 * (e.g. the pre-`firstUpdated` cell fallback). Hot paths should hold the
 * Set returned from `buildBlackoutSet` and `.has(ts)` directly.
 *
 * @param {number} dateTs - Unix timestamp (seconds) to test.
 * @param {Array<string|number>|undefined} disabledDays - Legacy timestamp array.
 * @param {Array<string>|undefined} blackoutDates - ISO `YYYY-MM-DD` array.
 * @returns {boolean}
 */
export function isBlackoutTimestamp(dateTs, disabledDays, blackoutDates) {
  return buildBlackoutSet(disabledDays, blackoutDates).has(dateTs);
}

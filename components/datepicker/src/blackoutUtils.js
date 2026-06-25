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
  if (typeof isoStr !== 'string') {
    return null;
  }
  const parts = isoStr.split('-');
  if (parts.length !== 3) {
    return null;
  }
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);
  if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) {
    return null;
  }
  // Reject overflow values like "2024-13-40" — JS `new Date(year, month, day)`
  // silently normalizes those to a different calendar day, which would
  // disable the wrong date if we let the result through.
  if (month < 1 || month > 12 || day < 1 || day > 31) {
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

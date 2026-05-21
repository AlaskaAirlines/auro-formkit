// Copyright (c) 2026 Alaska Airlines. All rights reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

/* eslint-disable no-underscore-dangle, no-magic-numbers, id-length, prefer-named-capture-group, no-continue */

/**
 * Bridge utilities that adapt Cally calendars to auro-datepicker behaviors:
 *  - Hover-range preview via custom parts injected through `getDayParts`.
 *  - Month-change deduping for the `auroDatePicker-monthChanged` event.
 *  - Mapping `referenceDates` + `dayDecorations` into Cally part strings.
 */
/**
 * Default Sunday/Monday week-start table for Firefox or older runtimes where
 * `Intl.Locale.prototype.getWeekInfo` is unavailable. CLDR's most common values.
 * Locales not listed default to Monday (`1`).
 */
const WEEK_START_FALLBACK = {
  'en-US': 0,
  'en-CA': 0,
  'ja-JP': 0,
  'zh-CN': 0,
  'zh-TW': 0,
  'ko-KR': 0,
  'th-TH': 0,
  'ar-SA': 6,
  'ar-EG': 6,
  'fa-IR': 6,
  'he-IL': 0
};

/**
 * Resolve `firstDayOfWeek` for the given locale.
 *  - Prefer `new Intl.Locale(locale).getWeekInfo().firstDay` (Chromium/Safari).
 *  - Fall back to a small CLDR-aligned table when `getWeekInfo` is absent.
 *  - Default to Monday (`1`) when the locale is unknown.
 * @param {string} locale - BCP47 locale.
 * @returns {number} 0 (Sun) through 6 (Sat).
 */
export function firstDayOfWeekForLocale(locale) {
  if (!locale) {
    return 1;
  }
  try {
    const intlLocale = new Intl.Locale(locale);
    if (typeof intlLocale.getWeekInfo === 'function') {
      const info = intlLocale.getWeekInfo();
      if (info && typeof info.firstDay === 'number') {
        // Intl returns 1=Mon..7=Sun; Cally expects 0=Sun..6=Sat.
        return info.firstDay === 7 ? 0 : info.firstDay;
      }
    }
  } catch {
    // fall through
  }
  if (WEEK_START_FALLBACK[locale] !== undefined) {
    return WEEK_START_FALLBACK[locale];
  }
  const [base] = locale.split('-');
  for (const [
    key,
    value
  ] of Object.entries(WEEK_START_FALLBACK)) {
    if (key.startsWith(`${base}-`) || key === base) {
      return value;
    }
  }
  return 1;
}

/**
 * Convert a Date to a `YYYY-MM-DD` string using local-time components.
 * @param {Date} date - Date to convert.
 * @returns {string} ISO date string.
 */
export function toIsoLocal(date) {
  if (!date) {
    return '';
  }
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Parse `YYYY-MM-DD` to a local-time `Date` at midnight.
 *
 * F4: Single canonical local-time ISO→Date helper. `new Date(iso)` interprets
 * an ISO date-only string as UTC midnight, which lands on the previous calendar
 * day in any negative UTC offset (e.g. `Pacific/Honolulu` flips `2025-01-01`
 * back to Dec 31). Constructing from year/month/day components sidesteps that.
 * The five `*Object` getters in `auro-datepicker` all route through this.
 *
 * @param {string} iso - ISO date string.
 * @returns {Date|undefined} Local-time Date, or `undefined` if the string is empty/malformed.
 */
export function parseIsoLocal(iso) {
  if (!iso) {
    return undefined;
  }
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/u);
  if (!m) {
    return undefined;
  }
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}

/**
 * Parse `YYYY-MM-DD` to a local-time ms timestamp at midnight.
 * @param {string} iso - ISO date string.
 * @returns {number|undefined} Millisecond timestamp.
 */
function isoMs(iso) {
  const d = parseIsoLocal(iso);
  return d ? d.getTime() : undefined;
}

export class CalendarBridge {
  constructor() {
    this._lastMonth = undefined;
    this._lastYear = undefined;
    this._hoverIso = undefined;
    this._resolvedLocale = 'en-US';
  }

  /**
   * Update the bridge's resolved locale. Returns the previous value so callers
   * can decide whether to remount Cally if the locale changed.
   * @param {string} locale - BCP47 locale.
   * @returns {string} Previous resolved locale.
   */
  setLocale(locale) {
    const prev = this._resolvedLocale;
    this._resolvedLocale = locale || 'en-US';
    return prev;
  }

  /**
   * Currently-resolved locale, default `en-US`.
   * @returns {string} BCP47 locale.
   */
  get resolvedLocale() {
    return this._resolvedLocale;
  }

  /**
   * First day of week derived from the resolved locale (0=Sun..6=Sat).
   * @returns {number} 0..6.
   */
  get firstDayOfWeek() {
    return firstDayOfWeekForLocale(this._resolvedLocale);
  }

  /**
   * Reset internal hover/month-change state.
   */
  reset() {
    this._lastMonth = undefined;
    this._lastYear = undefined;
    this._hoverIso = undefined;
  }

  /**
   * Update the currently-hovered ISO date used to render the hover-range preview.
   * @param {string|undefined} iso - Hovered ISO date.
   */
  setHoverIso(iso) {
    this._hoverIso = iso || undefined;
  }

  /**
   * Build a `getDayParts(date)` function appropriate for Cally that composes:
   *  - reference dates (`reference`)
   *  - user-supplied dayDecorations parts
   *  - hover-range preview (`hover-range-inner`, `hover-range-end`).
   *
   * @param {object} opts - Configuration for the day-parts builder.
   * @param {Set<string>} opts.referenceIsoSet - ISO date strings to mark as `reference`.
   * @param {Function|undefined} opts.dayDecorations - User callback `(Date) => {parts?, label?, ariaLabel?}|null`.
   * @param {string|undefined} opts.rangeStartIso - Active range start ISO date (for hover preview).
   * @param {string|undefined} opts.rangeEndIso - Active range end ISO date (kills hover preview).
   * @returns {(date: Date) => string}
   */
  buildGetDayParts({ referenceIsoSet, dayDecorations, rangeStartIso, rangeEndIso }) {
    return (date) => {
      const parts = [];
      const iso = toIsoLocal(date);

      if (referenceIsoSet && referenceIsoSet.has(iso)) {
        parts.push('reference');
      }

      if (typeof dayDecorations === 'function') {
        try {
          const result = dayDecorations(date);
          if (result && Array.isArray(result.parts)) {
            for (const p of result.parts) {
              parts.push(p);
            }
          }
        } catch {
          // user code threw; ignore decoration
        }
      }

      // Hover-range preview: only meaningful while exactly one end is set
      // (start chosen, end not yet selected).
      if (rangeStartIso && !rangeEndIso && this._hoverIso) {
        const startMs = isoMs(rangeStartIso);
        const hoverMs = isoMs(this._hoverIso);
        const dayMs = date.getTime();
        if (startMs !== undefined && hoverMs !== undefined && hoverMs > startMs) {
          if (dayMs > startMs && dayMs < hoverMs) {
            parts.push('hover-range-inner');
          } else if (dayMs === hoverMs) {
            parts.push('hover-range-end');
          }
        }
      }

      return parts.join(' ');
    };
  }

  /**
   * Compare incoming month/year against the last observed and return true on change.
   * @param {number} month - 1-based month.
   * @param {number} year - Full year.
   * @returns {boolean} True if month or year changed since last call.
   */
  monthChanged(month, year) {
    if (this._lastMonth === month && this._lastYear === year) {
      return false;
    }
    this._lastMonth = month;
    this._lastYear = year;
    return true;
  }
}

/**
 * Build a Set of ISO date strings from an array of mixed-format reference dates
 * (legacy `MM/DD/YYYY` or `MM-DD-YYYY`).
 * @param {string[]|undefined} referenceDates - Source dates to normalize.
 * @returns {Set<string>}
 */
export function normalizeReferenceDates(referenceDates) {
  const set = new Set();
  if (!Array.isArray(referenceDates)) {
    return set;
  }
  for (const entry of referenceDates) {
    if (typeof entry !== 'string') {
      continue;
    }
    const normalized = entry.replace(/-/gu, '/');
    const parts = normalized.split('/');
    if (parts.length !== 3) {
      continue;
    }
    const [
      mm,
      dd,
      yyyy
    ] = parts;
    if (mm && dd && yyyy && yyyy.length === 4) {
      set.add(`${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`);
    }
  }
  return set;
}

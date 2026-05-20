// Copyright (c) 2026 Alaska Airlines. All rights reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

/**
 * Bridge utilities that adapt Cally calendars to auro-datepicker behaviors:
 *  - Hover-range preview via custom parts injected through `getDayParts`.
 *  - Month-change deduping for the `auroDatePicker-monthChanged` event.
 *  - Mapping `referenceDates` + `dayDecorations` into Cally part strings.
 */
export class CalendarBridge {
  constructor() {
    this._lastMonth = undefined;
    this._lastYear = undefined;
    this._hoverIso = undefined;
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
   * @param {string|undefined} iso
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
   * @param {object} opts
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
        } catch (e) {
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
   * @param {number} year
   * @returns {boolean}
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
 * Convert a Date to a `YYYY-MM-DD` string using local-time components.
 * @param {Date} date
 * @returns {string}
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
 * Parse `YYYY-MM-DD` to a local-time ms timestamp at midnight.
 * @param {string} iso
 * @returns {number|undefined}
 */
function isoMs(iso) {
  if (!iso) {
    return undefined;
  }
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/u);
  if (!m) {
    return undefined;
  }
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])).getTime();
}

/**
 * Build a Set of ISO date strings from an array of mixed-format reference dates
 * (legacy `MM/DD/YYYY` or `MM-DD-YYYY`).
 * @param {string[]|undefined} referenceDates
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

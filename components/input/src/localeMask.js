// Copyright (c) 2026 Alaska Airlines. All rights reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

/* eslint-disable no-magic-numbers, max-lines */

import IMask from 'imask';

const SENTINEL = new Date(Date.UTC(2000, 1, 3));
const SENTINEL_YEAR = '2000';
const SENTINEL_MONTH = '02';
const SENTINEL_DAY = '03';

const cache = new Map();

/**
 * Strip the `-u-ca-*` (calendar) extension so non-Gregorian locales still
 * produce a Gregorian-shaped mask.
 * @param {string} locale - BCP47 locale tag.
 * @returns {string} Locale with calendar extension removed.
 */
function stripCalendarExtension(locale) {
  if (!locale) {
    return 'en-US';
  }
  return locale.replace(/-u-ca-[A-Za-z0-9-]+/u, '');
}

/**
 * Strip Unicode bidi formatting characters (LRM, RLM, LRE/RLE/PDF, LRI/RLI/FSI/PDI)
 * from a literal so the user-facing pattern only contains visible separators.
 * `Intl.DateTimeFormat` for RTL locales (e.g. `ar-SA`) injects U+200F between
 * tokens; if left in the pattern the parse regex never matches user input.
 * @param {string} value - Raw literal from `Intl.DateTimeFormat.formatToParts`.
 * @returns {string} Literal with bidi marks removed.
 */
function stripBidiMarks(value) {
  return value.replace(/[\u200E\u200F\u202A-\u202E\u2066-\u2069]/gu, '');
}

/**
 * Walk Intl parts derived from a sentinel date and produce a lowercase
 * pattern like `dd/mm/yyyy`, `yyyy/mm/dd`, `dd.mm.yyyy`, or `yyyy年mm月dd日`.
 * @param {Intl.DateTimeFormatPart[]} parts - Output of `Intl.DateTimeFormat.formatToParts`.
 * @returns {{pattern: string, tokenOrder: string[], separators: string[]}} Parsed pattern.
 */
function partsToPattern(parts) {
  let pattern = '';
  const tokenOrder = [];
  const separators = [];
  let currentLiteral = '';

  for (const part of parts) {
    if (part.type === 'year') {
      if (currentLiteral) {
        separators.push(currentLiteral);
        currentLiteral = '';
      }
      pattern += 'yyyy';
      tokenOrder.push('yyyy');
    } else if (part.type === 'month') {
      if (currentLiteral) {
        separators.push(currentLiteral);
        currentLiteral = '';
      }
      pattern += 'mm';
      tokenOrder.push('mm');
    } else if (part.type === 'day') {
      if (currentLiteral) {
        separators.push(currentLiteral);
        currentLiteral = '';
      }
      pattern += 'dd';
      tokenOrder.push('dd');
    } else if (part.type === 'literal') {
      const cleaned = stripBidiMarks(part.value);
      if (cleaned) {
        currentLiteral += cleaned;
        pattern += cleaned;
      }
    }
  }
  if (currentLiteral) {
    separators.push(currentLiteral);
  }

  return {
    pattern,
    tokenOrder,
    separators
  };
}

/**
 * Build an `Intl.DateTimeFormat` and call `formatToParts` on the sentinel date,
 * falling back to `en-US` if the locale tag is invalid or unsupported.
 * @param {string} locale - Normalized BCP47 locale tag.
 * @returns {Intl.DateTimeFormatPart[]} Parts derived from the sentinel date.
 */
function safeFormatToParts(locale) {
  try {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      calendar: 'gregory',
      numberingSystem: 'latn'
    }).formatToParts(SENTINEL);
  } catch {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).formatToParts(SENTINEL);
  }
}

const patternCache = new Map();

/**
 * Walk a pattern string and split it into `tokenOrder` + literal `separators`.
 * @param {string} pattern - Lowercase pattern containing `dd`/`mm`/`yyyy` tokens.
 * @returns {{tokenOrder: string[], separators: string[]}} Token sequence and literals between them.
 */
function parsePattern(pattern) {
  const tokenOrder = [];
  const separators = [];
  const matches = pattern.matchAll(/yyyy|mm|dd/gu);
  let lastIndex = 0;
  for (const tok of matches) {
    if (tok.index > lastIndex) {
      separators.push(pattern.slice(lastIndex, tok.index));
    }
    tokenOrder.push(tok[0]);
    lastIndex = tok.index + tok[0].length;
  }
  if (lastIndex < pattern.length) {
    separators.push(pattern.slice(lastIndex));
  }
  return {
    tokenOrder,
    separators
  };
}

/**
 * Build an Imask configuration from an explicit pattern string.
 * Handles arbitrary literal separators (e.g. `/`, `.`, `年`/`月`/`日`).
 * @param {string} pattern - Lowercase pattern containing `dd`/`mm`/`yyyy` tokens.
 * @returns {object} Mask config with pattern, blocks, format, parse, separator, separators, tokenOrder.
 */
export function buildPatternMask(pattern) {
  if (patternCache.has(pattern)) {
    return patternCache.get(pattern);
  }

  const { tokenOrder, separators } = parsePattern(pattern);
  const separator = separators[0] || '/';

  const blocks = {};
  if (pattern.includes('yyyy')) {
    blocks.yyyy = {
      mask: IMask.MaskedRange,
      from: 1900,
      to: 2100
    };
  }
  if (pattern.includes('mm')) {
    blocks.mm = {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12
    };
  }
  if (pattern.includes('dd')) {
    blocks.dd = {
      mask: IMask.MaskedRange,
      from: 1,
      to: 31
    };
  }

  const format = (date) => {
    if (!date) {
      return '';
    }
    const yyyy = String(date.getFullYear()).padStart(4, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return pattern.
      replace('yyyy', yyyy).
      replace('mm', mm).
      replace('dd', dd);
  };

  const parse = (str) => {
    if (!str) {
      return null;
    }
    const escaped = pattern.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
    const regexSrc = `^${escaped.
      replace('yyyy', '(?<year>\\d{4})').
      replace('mm', '(?<month>\\d{2})').
      replace('dd', '(?<day>\\d{2})')}$`;
    const match = str.match(new RegExp(regexSrc, 'u'));
    if (!match || !match.groups) {
      return null;
    }
    const year = Number(match.groups.year);
    const month = Number(match.groups.month);
    const day = Number(match.groups.day);
    if (!year || !month || !day) {
      return null;
    }
    const date = new Date(year, month - 1, day);
    if (Number.isNaN(date.getTime())) {
      return null;
    }
    return date;
  };

  const result = {
    pattern,
    blocks,
    format,
    parse,
    separator,
    separators,
    tokenOrder
  };
  patternCache.set(pattern, result);
  return result;
}

/**
 * Build a locale-aware Imask configuration for a date input.
 *
 * @param {string} locale - BCP47 locale (e.g. `en-US`, `de-DE`, `ja-JP`).
 * @returns {object} Mask config with pattern, blocks, format, parse, separator, separators, tokenOrder.
 */
export function buildLocaleDateMask(locale) {
  const normalized = stripCalendarExtension(locale || 'en-US');
  if (cache.has(normalized)) {
    return cache.get(normalized);
  }

  const parts = safeFormatToParts(normalized);
  const { pattern } = partsToPattern(parts);
  const result = buildPatternMask(pattern);
  cache.set(normalized, result);
  return result;
}

/**
 * Convert an ISO `YYYY-MM-DD` string to the locale display format.
 * @param {string} iso - ISO 8601 date string.
 * @param {string} locale - BCP47 locale.
 * @returns {string|undefined} Locale-formatted display string, or undefined if input invalid.
 */
export function isoToLocaleDisplay(iso, locale) {
  if (!iso || typeof iso !== 'string') {
    return undefined;
  }
  const match = iso.match(/^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})$/u);
  if (!match || !match.groups) {
    return undefined;
  }
  const { year, month, day } = match.groups;
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  return buildLocaleDateMask(locale).format(date);
}

/**
 * Convert a locale-formatted display string to ISO `YYYY-MM-DD`.
 * @param {string} display - Locale-formatted date string.
 * @param {string} locale - BCP47 locale used to parse.
 * @returns {string|undefined} ISO date string, or undefined if input invalid.
 */
export function localeDisplayToIso(display, locale) {
  if (!display) {
    return undefined;
  }
  const date = buildLocaleDateMask(locale).parse(display);
  if (!date) {
    return undefined;
  }
  const yyyy = String(date.getFullYear()).padStart(4, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Clear the per-locale and per-pattern caches. Intended for tests only.
 * @returns {void}
 */
export function clearLocaleMaskCacheForTests() {
  cache.clear();
  patternCache.clear();
}

export const LOCALE_MASK_SENTINEL_TOKENS = {
  year: SENTINEL_YEAR,
  month: SENTINEL_MONTH,
  day: SENTINEL_DAY
};

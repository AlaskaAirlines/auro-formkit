/**
 * Build an Imask configuration from an explicit pattern string.
 * Handles arbitrary literal separators (e.g. `/`, `.`, `年`/`月`/`日`).
 * @param {string} pattern - Lowercase pattern containing `dd`/`mm`/`yyyy` tokens.
 * @returns {object} Mask config with pattern, blocks, format, parse, separator, separators, tokenOrder.
 */
export function buildPatternMask(pattern: string): object;
/**
 * Build a locale-aware Imask configuration for a date input.
 *
 * @param {string} locale - BCP47 locale (e.g. `en-US`, `de-DE`, `ja-JP`).
 * @returns {object} Mask config with pattern, blocks, format, parse, separator, separators, tokenOrder.
 */
export function buildLocaleDateMask(locale: string): object;
/**
 * Convert an ISO `YYYY-MM-DD` string to the locale display format.
 * @param {string} iso - ISO 8601 date string.
 * @param {string} locale - BCP47 locale.
 * @returns {string|undefined} Locale-formatted display string, or undefined if input invalid.
 */
export function isoToLocaleDisplay(iso: string, locale: string): string | undefined;
/**
 * Convert a locale-formatted display string to ISO `YYYY-MM-DD`.
 * @param {string} display - Locale-formatted date string.
 * @param {string} locale - BCP47 locale used to parse.
 * @returns {string|undefined} ISO date string, or undefined if input invalid.
 */
export function localeDisplayToIso(display: string, locale: string): string | undefined;
/**
 * Clear the per-locale and per-pattern caches. Intended for tests only.
 * @returns {void}
 */
export function clearLocaleMaskCacheForTests(): void;
export namespace LOCALE_MASK_SENTINEL_TOKENS {
    export { SENTINEL_YEAR as year };
    export { SENTINEL_MONTH as month };
    export { SENTINEL_DAY as day };
}
declare const SENTINEL_YEAR: "2000";
declare const SENTINEL_MONTH: "02";
declare const SENTINEL_DAY: "03";
export {};

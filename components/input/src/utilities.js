
import * as dateFns from 'date-fns';
import { dateFormatter } from "@aurodesignsystem/auro-library/scripts/runtime/dateUtilities/dateFormatter.mjs";

// Copyright (c) 2025 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

/* eslint-disable no-magic-numbers, dot-location, no-extra-parens, object-property-newline, radix, no-nested-ternary */

import IMask from 'imask';

export class AuroInputUtilities {

  /**
   * Creates an instance of AuroInputUtilities.
   * @param {object} config - Configuration object for the utilities.
   * @param {string} config.locale - BCP 47 language tag (e.g. "en-US", "fr-FR", "ja-JP").
   * @param {string} config.format - Optional Date format override string.
   */
  constructor(config = { locale: undefined, format: undefined }) {
    if (config.locale) {
      try {
        this.locale = new Intl.Locale(config.locale).toString();
      } catch (error) {
        console.debug('Invalid locale provided, defaulting to en-US', error); // eslint-disable-line no-console
        this.locale = 'en-US';
      }
    } else {
      this.locale = 'en-US';
    }
    this.overrideFormat = config.format;
    this.formatter = new Intl.DateTimeFormat(this.locale);

    // Bindings - many of these are passed into IMask callbacks,
    // so we need to bind 'this' context for them to work properly.
    // ------------------------------------------------------------------------------
    this.getDateMaskFromLocale = this.getDateMaskFromLocale.bind(this);
    this.parseDateByMask = this.parseDateByMask.bind(this);
    this.getMaskOptions = this.getMaskOptions.bind(this);
  }

  /**
   * Updates the date format override.
   * @param {string} newFormat - New date format string.
   * @returns {void}
   */
  updateFormat(newFormat) {
    this.overrideFormat = newFormat;
  }

  /**
   * Converts an IMask-style date mask to a date-fns compatible format string.
   * @param {string} mask - IMask date mask (e.g. "MM/DD/YYYY").
   * @returns {string} A date-fns format string (e.g. "MM/dd/yyyy").
   */
  toDateFnsMask(mask) {
    return mask
      .replace('mm', 'MM')
      .replace('DD', 'dd')
      .replace('YYYY', 'yyyy')
      .replace('YY', 'yy');
  }

  /**
   * Generates a date mask based on the provided locale.
   * @param {string} [locale] - BCP 47 language tag (e.g. "en-US", "fr-FR", "ja-JP").
   * @returns {string}
   */
  getDateMaskFromLocale(locale) {
    // Break out if we have an override format
    if (this.overrideFormat) {
      // IMask wants uppercase, everything else wants lower
      return this.overrideFormat.toUpperCase();
    }

    const formatter = new Intl.DateTimeFormat(this.locale || locale, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    // Format to parts does not need a relevant date when formatting our mask, just a valid Date object!
    // I've chosen November 18, 2002, as that's Metroid Prime's release date :)
    const parts = formatter.formatToParts(new Date(2002, 10, 18));

    // Format parts is an array of DateTimeFormatPart objects, we want a string
    return parts
      .map((part) => {
        switch (part.type) {
          case "day":
            return "DD";
          case "month":
            return "MM";
          case "year":
            return "YYYY";
          default:
            return part.value;
        }
      })
      .join("")
      // Remove whitespace and leading/trailing special characters for IMask compatibility
      // for example, ko-KR's format is `YYYY. MM. DD.` which causes issues with IMask if we don't remove the trailing period.
      .replace(/\s/gu, '')
      .replace(/^[^A-Z0-9]+|[^A-Z0-9]+$/gu, '');
  }

  /**
   * Parses a date string using the provided mask.
   * @private
   * @param {string} dateString - The date string to parse.
   * @param {string} mask - The date mask to use for parsing.
   * @returns {string}
   */
  parseDateByMask(dateString, mask) {
    return dateFns.parse(dateString, this.toDateFnsMask(mask), new Date());
  }

  /**
   * Configures the mask to be used on the input element based on format and/or type.
   * IMask tool documentation: https://imask.js.org/.
   * @private
   * @param {string} type - The input type.
   * @param {string} format - The format of the mask to apply.
   * @returns {object} - The mask options object.
   */
  getMaskOptions(type, format) {
    if (type) {
      if (type === 'credit-card') {
        return {
          mask: format || '0000 0000 0000 0000',
          placeholderChar: '',
          lazy: true,
          overwrite: false
        };
      }

      if (type === 'tel') {
        return {
          mask: format || '+1 (000) 000-0000',
          placeholderChar: '',
          lazy: true,
          overwrite: false
        };
      }

      if (type === 'date') {
        // Get canonical pattern for locale
        const pattern = this.getDateMaskFromLocale(this.locale);

        // dateFormat is only used to determine if we have a full pattern or partial date pattern.
        const dateFormat = format || this.overrideFormat || pattern || 'mm/dd/yyyy';

        if (dateFormat === 'dd' || dateFormat === 'yy' || dateFormat === 'yyyy') {
          const fromValue = dateFormat === 'yyyy' ? 1900 : (dateFormat === 'yy' ? 0 : 1);
          const maxValue = dateFormat === 'dd' ? 31 : (dateFormat === 'yy' ? 99 : 2100);
          return {
            mask: IMask.MaskedRange,
            from: fromValue,
            to: maxValue,
            lazy: true,
            placeholderChar: '',
            format(value) {
              return value.toString().padStart(dateFormat.length, '0');
            },
            parse(str) {
              const num = parseInt(str, 10);
              return isNaN(num) ? null : num;
            }
          };
        }

        const blocks = {};

        if (dateFormat.includes('yyyy')) {
          blocks.yyyy = { mask: IMask.MaskedRange, from: 1900, to: 2100 };
        } else if (dateFormat.includes('yy')) {
          blocks.yy = { mask: IMask.MaskedRange, from: 0, to: 99 };
        }

        if (dateFormat.includes('mm')) {
          blocks.mm = { mask: IMask.MaskedRange, from: 1, to: 12 };
        }

        if (dateFormat.includes('dd')) {
          blocks.dd = { mask: IMask.MaskedRange, from: 1, to: 31 };
        }

        const dateFnsMask = this.toDateFnsMask(dateFormat);

        return {
          mask: Date,
          pattern: dateFormat.toLowerCase(),
          blocks,
          format(date) {
            if (!date || !dateFns.isValid(date)) {
              return '';
            }
            return dateFns.format(date, dateFnsMask);
          },
          parse: (str) => dateFns.parse(str, dateFnsMask, new Date()),
          lazy: true,
          placeholderChar: ''
        };
      }
    }

    if (format) {
      return {
        mask: format,
        placeholderChar: '',
        lazy: true
      };
    }

    return {};
  }

  /**
   * Determines if the given type and format combination represents a full year/month/day date.
   * @private
   * @param {string} type - The input type.
   * @param {string} format - The date format string.
   * @returns {boolean}
   */
  isFullDateFormat(type, format) {
    const normalizedFormat = format ? format.toLowerCase() : '';

    return type === 'date' && normalizedFormat.includes('yy') && normalizedFormat.includes('mm') && normalizedFormat.includes('dd');
  }

  /**
   * Validates a value against a partial date format (one that lacks yy/mm/dd all three).
   * Day- and year-only formats (dd/yy/yyyy) are checked as integer ranges; other partial formats use
   * a date-fns parse + round-trip to confirm both validity and exact formatting.
   * @param {string} value - The user-facing display value.
   * @param {string} format - The partial date format string (e.g. "mm/yyyy", "yyyy", "dd").
   * @returns {boolean}
   */
  isValidPartialDate(value, format) {
    if (!value || !format) {
      return false;
    }
    const normalizedFormat = format.toLowerCase();

    if (normalizedFormat === 'dd') {
      const num = Number(value);
      return (/^\d{2}$/u).test(value) && num >= 1 && num <= 31;
    }
    if (normalizedFormat === 'yy') {
      const num = Number(value);
      return (/^\d{2}$/u).test(value) && num >= 0 && num <= 99;
    }
    if (normalizedFormat === 'yyyy') {
      const num = Number(value);
      return (/^\d{4}$/u).test(value) && num >= 1900 && num <= 2100;
    }

    const dateFnsMask = this.toDateFnsMask(normalizedFormat);
    // Use the 1st of the current month as the reference so that formats
    // omitting a day (e.g. MM/yyyy) never roll over on days 29–31.
    const referenceDate = new Date();
    referenceDate.setDate(1);
    const parsed = dateFns.parse(value, dateFnsMask, referenceDate);
    if (!dateFns.isValid(parsed) || dateFns.format(parsed, dateFnsMask) !== value) {
      return false;
    }
    if (normalizedFormat.includes('yyyy')) {
      const year = parsed.getFullYear();
      return year >= 1900 && year <= 2100;
    }
    return true;
  }

  /**
   * Converts a display string to its model value.
   * For full date formats, converts the display string to an ISO date string.
   * @private
   * @param {string} inputValue - String from the rendered input.
   * @param {string} format - The date format string.
   * @returns {string}
   */
  toModelValue(inputValue, format) {
    if (!this.isFullDateFormat('date', format) || !inputValue) {
      return inputValue;
    }

    if (inputValue.length !== format.length) {
      return inputValue;
    }

    const normalizedFormat = format.toLowerCase();
    const parsedDate = this.parseDateByMask(inputValue, normalizedFormat);

    if (!(parsedDate instanceof Date) || Number.isNaN(parsedDate.getTime())) {
      return inputValue;
    }

    return dateFormatter.toISOFormatString(parsedDate);
  }

  /**
   * Converts a model value to a display value for the input element.
   * For full date formats, converts an ISO model value to the configured display format.
   * @private
   * @param {Date|undefined} valueObject - Date object representation of value.
   * @param {string} format - The date format string.
   * @returns {string | undefined}
   */
  toFormattedValue(valueObject, format) {
    // Exposed publicly via `AuroInputUtil.toFormattedValue`, so a missing
    // `format` argument has to fail gracefully rather than throw on
    // `format.toLowerCase()`. Treat any falsy value (undefined, null, '')
    // as "no format → no display value".
    if (!format) {
      return undefined;
    }
    const normalizedFormat = format.toLowerCase();
    const maskOptions = this.getMaskOptions('date', normalizedFormat);

    if (!(valueObject instanceof Date) || Number.isNaN(valueObject.getTime()) || !maskOptions || typeof maskOptions.format !== 'function') {
      console.debug('Invalid date object or mask options for formatting', { valueObject, maskOptions }); // eslint-disable-line no-console
      return undefined;
    }

    return maskOptions.format(valueObject);
  }
}

/**
 * Derives a locale-aware date format string suitable for use in input masks. This helper exposes the internal AuroInputUtilities locale logic in a simple function form.
 *
 * @param {string} locale - BCP 47 language tag used to determine the date format (e.g. "en-US", "fr-FR").
 * @returns {string} A lowercase date format mask string corresponding to the provided locale.
 */
export function getDateFormatFromLocale (locale) {
  return new AuroInputUtilities({ locale }).
    getDateMaskFromLocale().
    toLowerCase();
}

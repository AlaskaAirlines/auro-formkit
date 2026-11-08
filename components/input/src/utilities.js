
import * as dateFns from 'date-fns';
import { dateFormatter } from "@aurodesignsystem/auro-library/scripts/runtime/dateUtilities/dateFormatter.mjs";

// Copyright (c) 2025 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

/* eslint-disable no-magic-numbers, dot-location, no-extra-parens, object-property-newline, no-nested-ternary, complexity, max-lines */

import IMask from 'imask';

export class AuroInputUtilities {

  /**
   * Creates a set of date and mask helpers for one locale and format.
   * @param {object} config - The settings for the helpers.
   * @param {string} [config.locale] - The BCP 47 language tag, such as `en-US`, `fr-FR`, or `ja-JP`. Defaults to `en-US` when missing or invalid.
   * @param {string} [config.format] - The date format to use instead of the locale's format, such as `mm/dd/yyyy`.
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
   * Sets the date format to use instead of the locale's format.
   * @param {string} newFormat - The new date format, such as `dd/mm/yyyy`.
   * @returns {void}
   */
  updateFormat(newFormat) {
    this.overrideFormat = newFormat;
  }

  /**
   * Converts an IMask date mask to a date-fns format string.
   * @param {string} mask - The IMask date mask, such as `MM/DD/YYYY`.
   * @returns {string} The date-fns format string, such as `MM/dd/yyyy`.
   */
  toDateFnsMask(mask) {
    return mask
      .replace('mm', 'MM')
      .replace('DD', 'dd')
      .replace('YYYY', 'yyyy')
      .replace('YY', 'yy');
  }

  /**
   * Gets the uppercase date mask for the instance's locale, such as `MM/DD/YYYY` for `en-US`.
   * Returns the override format in uppercase instead when one is set.
   * @param {string} [locale] - A BCP 47 language tag, such as `fr-FR`. Used only when the instance has no locale, which doesn't happen because the constructor always sets one.
   * @returns {string} The uppercase date mask.
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
   * @returns {Date}
   */
  parseDateByMask(dateString, mask) {
    return dateFns.parse(dateString, this.toDateFnsMask(mask), new Date());
  }

  /**
   * Gets the IMask options for the inner `<input>` element based on `type` and `format`.
   * See the IMask documentation at https://imask.js.org/.
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
   * Checks whether the type and format describe a full date with a year, month, and day.
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
   * Checks whether a value is a valid date in a partial date format, meaning one without all of a year, month, and day.
   * Day-only and year-only formats (`dd`, `yy`, `yyyy`) are checked as number ranges; other partial formats are parsed
   * with date-fns and formatted back to confirm the date is valid and written exactly in the format.
   * @param {string} value - The value as shown in the field.
   * @param {string} format - The partial date format, such as `mm/yyyy`, `yyyy`, or `dd`.
   * @returns {boolean} True if the value is a valid date in the format; false otherwise.
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
   * Converts the text shown in the field to the value stored in `value`.
   * For full date formats, converts a complete date to an ISO date string; other text is returned unchanged.
   * @private
   * @param {string} inputValue - The text in the inner `<input>` element.
   * @param {string} format - The date format.
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
   * Converts a `Date` to the text shown in the field for a date format.
   * Returns `undefined` when `valueObject` isn't a valid `Date` or `format` is empty.
   * @private
   * @param {Date|undefined} valueObject - The date to format, such as the input's `valueObject`.
   * @param {string} format - The date format, such as `mm/dd/yyyy`.
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
 * Gets the date format a locale uses, such as `mm/dd/yyyy` for `en-US` or `dd.mm.yyyy` for `de-DE`.
 *
 * @param {string} locale - The BCP 47 language tag, such as `en-US` or `fr-FR`. Invalid tags fall back to `en-US`.
 * @returns {string} The locale's date format in lowercase.
 */
export function getDateFormatFromLocale (locale) {
  return new AuroInputUtilities({ locale }).
    getDateMaskFromLocale().
    toLowerCase();
}

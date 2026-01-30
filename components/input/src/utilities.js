import * as dateFns from 'date-fns';

// Copyright (c) 2025 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

/* eslint-disable no-magic-numbers, dot-location, no-extra-parens, object-property-newline, init-declarations, radix, no-nested-ternary */

import IMask from 'imask';

export class AuroInputUtilities {

  /**
   * Creates an instance of AuroInputUtilities.
   * @param {object} config
   * @param {string} config.locale - BCP 47 language tag (e.g. "en-US", "fr-FR", "ja-JP").
   * @param {string} config.format - Optional Date format override string.
   */
  constructor(config = { locale: 'en-US', format: undefined }) {
    // NOTE: normalize locale as we set it
    this.locale = config.locale || 'en-US';
    this.overrideFormat = config.format;
    this.formatter = new Intl.DateTimeFormat(this.locale);

    // Bindings - many of these are passed into IMask callbacks,
    // so we need to bind 'this' context for them to work properly.
    // ------------------------------------------------------------------------------
    this.getDateFormatterFromLocale = this.getDateFormatterFromLocale.bind(this);
    this.getDateMaskFromLocale = this.getDateMaskFromLocale.bind(this);
    this.parseDateByMask = this.parseDateByMask.bind(this);
    this.getMaskOptions = this.getMaskOptions.bind(this);
  }

  /**
   * Updates the locale used for date formatting.
   * @param {string} newLocale - New BCP 47 language tag (e.g. "en-US", "fr-FR", "ja-JP").
   * @returns {void}
   */
  updateLocale(newLocale) {
    this.locale = newLocale || 'en-US';
    this.formatter = new Intl.DateTimeFormat(this.locale);
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
   * Generates an Intl.DateTimeFormat based on the provided locale.
   * @param {string} locale - BCP 47 language tag (e.g. "en-US", "fr-FR", "ja-JP").
   * @param {Intl.DateTimeFormatOptions?} options - Intl.DateTimeFormat options.
   * @returns {Intl.DateTimeFormat}
   */
  getDateFormatterFromLocale(locale, options) {
    return new Intl.DateTimeFormat(locale, options);
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

    const formatter = this.getDateFormatterFromLocale(this.locale || locale, {
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
      .join("");
  }

  /**
   * Parses a date string using the provided mask.
   * @param {string} dateString
   * @param {string} mask
   * @return {string}
   */
  parseDateByMask(dateString, mask) {
    return dateFns.format(
      dateString,
      mask
        // MM must be uppercase to distinguish from minutes, or we get strange, invalid dates
        .replace('mm', 'MM')
        // Same with DD and YYYY, we want lowercase for date-fns
        .replace('DD', 'dd')
        .replace('YYYY', 'yyyy')
        .replace('YY', 'yy')
    );
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
          const maxValue = dateFormat === 'dd' ? 31 : (dateFormat === 'yy' ? 99 : 9999);
          return {
            mask: IMask.MaskedRange,
            from: 1,
            to: maxValue,
            lazy: true,
            placeholderChar: '',
            format(value) {
              return value.toString().padStart(dateFormat.length, '0');
            },
            parse(str) {
              return parseInt(str) || null;
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

        return {
          mask: Date,
          pattern: dateFormat.toLowerCase(),
          blocks,
          format(date) {
            if (!date) {
              return '';
            }

            // NOTE: use dateFormat here as it already accounts for `this` context and closures
            if (dateFormat) {
              return dateFns.format(
                date,
                dateFormat
                  // MM must be uppercase to distinguish from minutes, or we get strange, invalid dates
                  .replace('mm', 'MM')
                  // Same with DD and YYYY, we want lowercase for date-fns
                  .replace('DD', 'dd')
                  .replace('YYYY', 'yyyy')
                  .replace('YY', 'yy')
              );
            }

            // eslint-disable-next-line new-cap
            return Intl.DateTimeFormat(this.locale).format(new Date(date));
          },
          // Parse directly with date-fns. Parsing manually is NOT RECOMMENDED.
          // Manual parsing is incredibly complex for international support
          parse: (str) => dateFns.parse(
            str,
            // Replace DD with dd
            dateFormat
              // MM must be uppercase to distinguish from minutes, or we get strange, invalid dates
              .replace('mm', 'MM')
              // Same with DD and YYYY, we want lowercase for date-fns
              .replace('DD', 'dd')
              .replace('YYYY', 'yyyy')
              .replace('YY', 'yy'),
            new Date()
          ),
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
   * @private
   * @param {string} dateStr - Date string to format.
   * @param {string?} [format] - DEPRECATED: Date format to use.
   * @returns {{ formattedDate: string, dateForComparison: string }}
   */
  toNorthAmericanFormat(dateStr, format) {
    const maskForLocale = this.getDateMaskFromLocale(this.locale);
    const parsedDate = this.parseDateByMask(dateStr, format || maskForLocale);

    // Legacy, this object was returned this way before. Unsure why but keeping for now.
    return {
      formattedDate: dateFns.formatDate(parsedDate, 'MM/dd/yyyy'),
      dateForComparison: parsedDate
    };
  }
}

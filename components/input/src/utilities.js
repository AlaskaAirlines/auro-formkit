// Copyright (c) 2025 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

/* eslint-disable no-magic-numbers, dot-location, no-extra-parens, object-property-newline, init-declarations, radix, no-nested-ternary */

import IMask from 'imask';
import { AuroDateUtilities } from '@aurodesignsystem/auro-library/scripts/runtime/dateUtilities.mjs';

export class AuroInputUtilities extends AuroDateUtilities {

  /**
   * Configures the mask to be used on the input element based on format and/or type.
   * IMask tool documentation: https://imask.js.org/.
   * @private
   * @param {string} type - The input type.
   * @param {string} format - The format of the mask to apply.
   * @returns {void}
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
        const dateFormat = format || 'mm/dd/yyyy';

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
        }

        if (dateFormat.includes('yy')) {
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
          pattern: format,
          blocks,
          format(date) {
            if (!date) {
              return '';
            }

            const day = date.getDate()
              .toString()
              .padStart(2, '0');
            const month = (date.getMonth() + 1)
              .toString()
              .padStart(2, '0');
            const year = date
              .getFullYear()
              .toString();
            const shortYear = year.slice(-2);

            let formattedDate = this.mask;

            if (formattedDate.includes('dd')) {
              formattedDate = formattedDate.replace('dd', day);
            }

            if (formattedDate.includes('mm')) {
              formattedDate = formattedDate.replace('mm', month);
            }

            if (formattedDate.includes('yyyy')) {
              formattedDate = formattedDate.replace('yyyy', year);
            }

            if (formattedDate.includes('yy')) {
              formattedDate = formattedDate.replace('yy', shortYear);
            }

            return formattedDate;
          },
          parse(str) {
            if (!str) {
              return null;
            }

            const parts = str.split('/');
            const formatParts = this.mask.split('/');

            let day = 1, month, year = new Date().getFullYear();

            formatParts.forEach((part, index) => {
              if (part === 'dd') {
                day = parseInt(parts[index]) || 1;
              }

              if (part === 'mm') {
                month = parseInt(parts[index]) - 1;
              }

              if (part === 'yyyy') {
                year = parseInt(parts[index]);
              }

              if (part === 'yy') {
                year = parseInt(parts[index]);
                year = year <= 25 ? 2000 + year : 1900 + year;
              }
            });

            if (isNaN(month) || isNaN(year)) {
              return null;
            }
            return new Date(year, month, day);
          },
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
}

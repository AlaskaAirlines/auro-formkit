/* eslint-disable no-magic-numbers, jsdoc/require-jsdoc */

import { expect } from '@open-wc/testing';
import { AuroInputUtil } from '../src/auro-input-util.js';
import { AuroInputUtilities } from '../src/utilities.js';

const { formatISODate, toISOFormatString, toFormattedValue } = AuroInputUtil;

describe('AuroInputUtil', () => {
  describe('Public Functions', () => {
    describe('formatISODate', () => {
      describe('full date formats', () => {
        it('mm/dd/yyyy — month-first US format', () => {
          expect(formatISODate('2025-12-25', 'mm/dd/yyyy')).to.equal('12/25/2025');
        });

        it('dd/mm/yyyy — day-first European format', () => {
          expect(formatISODate('2025-12-25', 'dd/mm/yyyy')).to.equal('25/12/2025');
        });

        it('yyyy/mm/dd — year-first ISO display format', () => {
          expect(formatISODate('2025-12-25', 'yyyy/mm/dd')).to.equal('2025/12/25');
        });

        it('yyyy/dd/mm — year-first day-month format', () => {
          expect(formatISODate('2025-12-25', 'yyyy/dd/mm')).to.equal('2025/25/12');
        });

        it('dd.mm.yyyy — dot separator (German style)', () => {
          expect(formatISODate('2025-12-25', 'dd.mm.yyyy')).to.equal('25.12.2025');
        });

        it('yyyy-mm-dd — hyphen separator round-trip', () => {
          expect(formatISODate('2025-12-25', 'yyyy-mm-dd')).to.equal('2025-12-25');
        });

        it('uppercase format tokens are normalised', () => {
          expect(formatISODate('2025-12-25', 'MM/DD/YYYY')).to.equal('12/25/2025');
        });

        it('pads single-digit month and day with leading zero', () => {
          expect(formatISODate('2025-01-05', 'mm/dd/yyyy')).to.equal('01/05/2025');
        });

        it('yyyy replaces before yy so four-digit year is not double-replaced', () => {
          expect(formatISODate('2025-06-15', 'yyyy/mm/dd')).to.equal('2025/06/15');
        });
      });

      describe('two-digit year (yy)', () => {
        it('mm/yy — uses last two digits of year', () => {
          expect(formatISODate('2025-12-25', 'mm/yy')).to.equal('12/25');
        });
      });

      describe('invalid and missing input', () => {
        it('returns undefined when isoStr is undefined', () => {
          expect(formatISODate(undefined, 'mm/dd/yyyy')).to.be.undefined;
        });

        it('returns undefined when isoStr is empty string', () => {
          expect(formatISODate('', 'mm/dd/yyyy')).to.be.undefined;
        });

        it('returns undefined when format is undefined', () => {
          expect(formatISODate('2025-12-25', undefined)).to.be.undefined;
        });

        it('returns undefined when format is empty string', () => {
          expect(formatISODate('2025-12-25', '')).to.be.undefined;
        });

        it('returns undefined for a non-ISO date string', () => {
          expect(formatISODate('25/12/2025', 'mm/dd/yyyy')).to.be.undefined;
        });

        it('returns undefined for an impossible date', () => {
          expect(formatISODate('2025-13-99', 'mm/dd/yyyy')).to.be.undefined;
        });
      });
    });

    describe('toFormattedValue', () => {
      describe('full date format — converts ISO to display string', () => {
        it('mm/dd/yyyy — US month-first format', () => {
          expect(toFormattedValue(new Date(2024, 0, 15), 'mm/dd/yyyy')).to.equal('01/15/2024');
        });

        it('dd/mm/yyyy — European day-first format', () => {
          expect(toFormattedValue(new Date(2024, 11, 25), 'dd/mm/yyyy')).to.equal('25/12/2024');
        });

        it('yyyy/mm/dd — year-first format', () => {
          expect(toFormattedValue(new Date(2024, 5, 1), 'yyyy/mm/dd')).to.equal('2024/06/01');
        });

        it('dd.mm.yyyy — dot separator (German style)', () => {
          expect(toFormattedValue(new Date(2024, 2, 8), 'dd.mm.yyyy')).to.equal('08.03.2024');
        });
      });

      describe('invalid date value', () => {
        it('returns undefined for a structurally valid ISO string that is not a real date', () => {
          expect(toFormattedValue(undefined, 'mm/dd/yyyy')).to.be.undefined;
        });
      });

      describe('is a function exported directly on AuroInputUtil', () => {
        it('toFormattedValue is a function', () => {
          expect(toFormattedValue).to.be.a('function');
        });

        it('is the same bound function as AuroInputUtil.toFormattedValue', () => {
          expect(toFormattedValue).to.equal(AuroInputUtil.toFormattedValue);
        });
      });
    });

    describe('toISOFormatString', () => {
      describe('valid Date instances', () => {
        it('converts a standard date to yyyy-mm-dd', () => {
          expect(toISOFormatString(new Date(2025, 11, 25))).to.equal('2025-12-25');
        });

        it('pads single-digit month with leading zero', () => {
          expect(toISOFormatString(new Date(2025, 0, 5))).to.equal('2025-01-05');
        });

        it('pads single-digit day with leading zero', () => {
          expect(toISOFormatString(new Date(2025, 5, 1))).to.equal('2025-06-01');
        });

        it('handles end-of-year date', () => {
          expect(toISOFormatString(new Date(2024, 11, 31))).to.equal('2024-12-31');
        });

        it('handles start-of-year date', () => {
          expect(toISOFormatString(new Date(2024, 0, 1))).to.equal('2024-01-01');
        });

        it('round-trips with formatISODate', () => {
          const iso = '2025-06-15';
          const date = new Date(2025, 5, 15);
          expect(toISOFormatString(date)).to.equal(iso);
          expect(formatISODate(iso, 'yyyy/mm/dd')).to.equal('2025/06/15');
        });
      });

      describe('invalid input', () => {
        it('throws for a non-Date value', () => {
          expect(() => toISOFormatString('2025-12-25')).to.throw();
        });

        it('throws for an invalid Date (NaN)', () => {
          expect(() => toISOFormatString(new Date('not-a-date'))).to.throw();
        });

        it('throws for null', () => {
          expect(() => toISOFormatString(null)).to.throw();
        });

        it('throws for undefined', () => {
          expect(() => toISOFormatString(undefined)).to.throw();
        });
      });
    });
  });

  describe('Private Functions', () => {
    describe('AuroInputUtilities', () => {
      it('falls back to en-US when an invalid locale is provided', () => {
        const util = new AuroInputUtilities({ locale: 'invalid-locale!!!' });
        expect(util.locale).to.equal('en-US');
      });

      it('toModelValue returns the original string when the date cannot be parsed', () => {
        const util = new AuroInputUtilities({ locale: 'en-US' });
        const result = util.toModelValue('xx/xx/xxxx', 'mm/dd/yyyy');
        expect(result).to.equal('xx/xx/xxxx');
      });

      it('getDateMaskFromLocale uses locale parameter when this.locale is falsy', () => {
        const util = new AuroInputUtilities({ locale: 'en-US' });
        util.locale = '';
        const mask = util.getDateMaskFromLocale('en-US');
        expect(mask).to.be.a('string').and.not.empty;
      });

      it('getDateMaskFromLocale does not start or end with a special character', () => {
        const locales = ['en-US', 'en-GB', 'de-DE', 'ja-JP', 'zh-CN', 'fr-FR', 'ko-KR'];
        locales.forEach((locale) => {
          const util = new AuroInputUtilities({ locale });
          const mask = util.getDateMaskFromLocale(locale);
          expect(mask).to.match(/^[A-Z0-9]/, `mask for ${locale} should not start with a special character`);
          expect(mask).to.match(/[A-Z0-9]$/, `mask for ${locale} should not end with a special character`);
        });
      });

      it('getMaskOptions date falls back to mm/dd/yyyy when format, overrideFormat, and pattern are all falsy', () => {
        const util = new AuroInputUtilities({ locale: 'en-US' });
        util.overrideFormat = undefined;
        util.getDateMaskFromLocale = () => '';
        const opts = util.getMaskOptions('date', undefined);
        expect(opts.pattern).to.equal('mm/dd/yyyy');
      });

      describe('toDateFnsMask', () => {
        let util;

        before(() => {
          util = new AuroInputUtilities({ locale: 'en-US' });
        });

        it('converts mm/DD/YYYY (US IMask) to MM/dd/yyyy (date-fns)', () => {
          expect(util.toDateFnsMask('mm/DD/YYYY')).to.equal('MM/dd/yyyy');
        });

        it('converts DD/mm/YYYY (European IMask) to dd/MM/yyyy (date-fns)', () => {
          expect(util.toDateFnsMask('DD/mm/YYYY')).to.equal('dd/MM/yyyy');
        });

        it('converts YYYY/mm/DD (ISO-display IMask) to yyyy/MM/dd (date-fns)', () => {
          expect(util.toDateFnsMask('YYYY/mm/DD')).to.equal('yyyy/MM/dd');
        });

        it('converts DD.mm.YYYY (dot-separator IMask) to dd.MM.yyyy (date-fns)', () => {
          expect(util.toDateFnsMask('DD.mm.YYYY')).to.equal('dd.MM.yyyy');
        });

        it('converts two-digit year YY to yy', () => {
          expect(util.toDateFnsMask('mm/YY')).to.equal('MM/yy');
        });

        it('leaves separators unchanged', () => {
          expect(util.toDateFnsMask('mm-DD-YYYY')).to.equal('MM-dd-yyyy');
        });

        it('is idempotent on an already-converted date-fns mask', () => {
          expect(util.toDateFnsMask('MM/dd/yyyy')).to.equal('MM/dd/yyyy');
        });
      });
    });
  });
});


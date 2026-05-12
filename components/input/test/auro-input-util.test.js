/* eslint-disable no-magic-numbers, jsdoc/require-jsdoc */

import { expect } from '@open-wc/testing';
import { AuroInputUtil } from '../src/auro-input-util.js';
import { AuroInputUtilities } from '../src/utilities.js';

const { formatISODate, toISOFormatString } = AuroInputUtil;

describe('formatISODate', () => {
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
      });

      describe('two-digit year (yy)', () => {
        it('mm/yy — uses last two digits of year', () => {
          expect(formatISODate('2025-12-25', 'mm/yy')).to.equal('12/25');
        });

        it('yyyy replaces before yy so four-digit year is not double-replaced', () => {
          expect(formatISODate('2025-06-15', 'yyyy/mm/dd')).to.equal('2025/06/15');
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

      it('toDisplayValue returns the value when valueObject is not a Date', () => {
        const util = new AuroInputUtilities({ locale: 'en-US' });
        const result = util.toDisplayValue('2024-01-15', undefined, 'mm/dd/yyyy');
        expect(result).to.equal('2024-01-15');
      });

      it('getDateMaskFromLocale uses locale parameter when this.locale is falsy', () => {
        const util = new AuroInputUtilities({ locale: 'en-US' });
        util.locale = '';
        const mask = util.getDateMaskFromLocale('en-US');
        expect(mask).to.be.a('string').and.not.empty;
      });

      it('getMaskOptions date falls back to mm/dd/yyyy when format, overrideFormat, and pattern are all falsy', () => {
        const util = new AuroInputUtilities({ locale: 'en-US' });
        util.overrideFormat = undefined;
        util.getDateMaskFromLocale = () => '';
        const opts = util.getMaskOptions('date', undefined);
        expect(opts.pattern).to.equal('mm/dd/yyyy');
      });
    });
  });
});


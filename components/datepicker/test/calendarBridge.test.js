import { expect } from '@open-wc/testing';

import { CalendarBridge, normalizeReferenceDates, toIsoLocal } from '../src/calendarBridge.js';

describe('calendarBridge', () => {
  describe('toIsoLocal', () => {
    it('formats a local Date as YYYY-MM-DD', () => {
      expect(toIsoLocal(new Date(2025, 5, 15))).to.equal('2025-06-15');
    });

    it('returns empty string for falsy input', () => {
      expect(toIsoLocal(null)).to.equal('');
      expect(toIsoLocal(undefined)).to.equal('');
    });

    it('pads single-digit month/day to two digits', () => {
      expect(toIsoLocal(new Date(2025, 0, 3))).to.equal('2025-01-03');
    });
  });

  describe('normalizeReferenceDates', () => {
    it('returns an empty Set when input is undefined', () => {
      expect(normalizeReferenceDates(undefined).size).to.equal(0);
    });

    it('accepts legacy MM/DD/YYYY entries', () => {
      const set = normalizeReferenceDates(['06/15/2025', '12/01/2025']);
      expect(set.has('2025-06-15')).to.equal(true);
      expect(set.has('2025-12-01')).to.equal(true);
    });

    it('accepts legacy MM-DD-YYYY entries', () => {
      const set = normalizeReferenceDates(['06-15-2025']);
      expect(set.has('2025-06-15')).to.equal(true);
    });

    it('silently skips malformed entries', () => {
      const set = normalizeReferenceDates(['nope', null, undefined, '13/40/abc']);
      expect(set.size).to.equal(0);
    });
  });

  describe('CalendarBridge.monthChanged', () => {
    it('returns true on first observation and false on repeats', () => {
      const bridge = new CalendarBridge();
      expect(bridge.monthChanged(6, 2025)).to.equal(true);
      expect(bridge.monthChanged(6, 2025)).to.equal(false);
      expect(bridge.monthChanged(7, 2025)).to.equal(true);
      expect(bridge.monthChanged(7, 2025)).to.equal(false);
    });

    it('reset clears the dedupe state', () => {
      const bridge = new CalendarBridge();
      bridge.monthChanged(6, 2025);
      bridge.reset();
      expect(bridge.monthChanged(6, 2025)).to.equal(true);
    });
  });

  describe('CalendarBridge.buildGetDayParts', () => {
    const date = new Date(2025, 5, 15);

    it('emits "reference" for dates in the reference set', () => {
      const bridge = new CalendarBridge();
      const fn = bridge.buildGetDayParts({
        referenceIsoSet: new Set(['2025-06-15']),
        dayDecorations: undefined,
        rangeStartIso: undefined,
        rangeEndIso: undefined
      });
      expect(fn(date).split(' ')).to.include('reference');
    });

    it('appends parts returned by a dayDecorations callback', () => {
      const bridge = new CalendarBridge();
      const fn = bridge.buildGetDayParts({
        referenceIsoSet: new Set(),
        dayDecorations: () => ({ parts: ['holiday', 'special'] }),
        rangeStartIso: undefined,
        rangeEndIso: undefined
      });
      const parts = fn(date).split(' ');
      expect(parts).to.include('holiday');
      expect(parts).to.include('special');
    });

    it('swallows errors thrown by dayDecorations', () => {
      const bridge = new CalendarBridge();
      const fn = bridge.buildGetDayParts({
        referenceIsoSet: new Set(),
        dayDecorations: () => { throw new Error('boom'); },
        rangeStartIso: undefined,
        rangeEndIso: undefined
      });
      expect(() => fn(date)).not.to.throw();
      expect(fn(date)).to.equal('');
    });

    it('ignores a dayDecorations return without a parts array', () => {
      const bridge = new CalendarBridge();
      const fn = bridge.buildGetDayParts({
        referenceIsoSet: new Set(),
        dayDecorations: () => ({ label: 'no parts' }),
        rangeStartIso: undefined,
        rangeEndIso: undefined
      });
      expect(fn(date)).to.equal('');
    });

    it('emits hover-range-inner for dates between start and hover', () => {
      const bridge = new CalendarBridge();
      bridge.setHoverIso('2025-06-20');
      const fn = bridge.buildGetDayParts({
        referenceIsoSet: new Set(),
        dayDecorations: undefined,
        rangeStartIso: '2025-06-15',
        rangeEndIso: undefined
      });
      const inner = fn(new Date(2025, 5, 17));
      expect(inner.split(' ')).to.include('hover-range-inner');
    });

    it('emits hover-range-end exactly on the hover date', () => {
      const bridge = new CalendarBridge();
      bridge.setHoverIso('2025-06-20');
      const fn = bridge.buildGetDayParts({
        referenceIsoSet: new Set(),
        dayDecorations: undefined,
        rangeStartIso: '2025-06-15',
        rangeEndIso: undefined
      });
      expect(fn(new Date(2025, 5, 20)).split(' ')).to.include('hover-range-end');
    });

    it('does not emit hover-range parts when both range ends are set', () => {
      const bridge = new CalendarBridge();
      bridge.setHoverIso('2025-06-25');
      const fn = bridge.buildGetDayParts({
        referenceIsoSet: new Set(),
        dayDecorations: undefined,
        rangeStartIso: '2025-06-15',
        rangeEndIso: '2025-06-22'
      });
      const out = fn(new Date(2025, 5, 20));
      expect(out).to.equal('');
    });
  });
});

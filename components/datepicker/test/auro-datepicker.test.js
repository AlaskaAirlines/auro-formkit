import { aTimeout, elementUpdated, expect, fixture, html, oneEvent } from '@open-wc/testing';

import '../src/registered.js';
import {
  decorationsFixture,
  fullscreenFixture,
  inDialogFixture,
  inDrawerFixture,
  rangeFixture
} from './testFixtures.js';
import { getCalendar } from './testFunctions.js';

describe('auro-datepicker', () => {
  describe('registration', () => {
    it('is defined', () => {
      expect(customElements.get('auro-datepicker')).to.exist;
    });

    it('registers Cally calendar elements', () => {
      expect(customElements.get('calendar-date')).to.exist;
      expect(customElements.get('calendar-range')).to.exist;
      expect(customElements.get('calendar-month')).to.exist;
    });
  });

  describe('value contract (ISO YYYY-MM-DD)', () => {
    it('accepts ISO value via attribute', async () => {
      const el = await fixture(html`<auro-datepicker value="2025-06-15"></auro-datepicker>`);
      expect(el.value).to.equal('2025-06-15');
    });

    it('accepts ISO valueEnd via attribute when range', async () => {
      const el = await fixture(html`
        <auro-datepicker range value="2025-06-15" valueEnd="2025-06-22"></auro-datepicker>
      `);
      expect(el.value).to.equal('2025-06-15');
      expect(el.valueEnd).to.equal('2025-06-22');
    });

    it('reflects ISO value to the inner input in the configured display format', async () => {
      const el = await fixture(html`<auro-datepicker value="2025-06-15"></auro-datepicker>`);
      await elementUpdated(el);
      const input = el.inputList[0];
      expect(input.value).to.equal('06/15/2025');
    });

    it('exposes values getter as an array for range', async () => {
      const el = await fixture(html`
        <auro-datepicker range value="2025-06-15" valueEnd="2025-06-22"></auro-datepicker>
      `);
      expect(el.values).to.deep.equal(['2025-06-15', '2025-06-22']);
    });
  });

  describe('calendar rendering', () => {
    it('renders <calendar-date> for single mode', async () => {
      const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
      await elementUpdated(el);
      const cal = getCalendar(el);
      expect(cal).to.exist;
      expect(cal.tagName.toLowerCase()).to.equal('calendar-date');
    });

    it('renders <calendar-range> for range mode', async () => {
      const el = await fixture(html`<auro-datepicker range></auro-datepicker>`);
      await elementUpdated(el);
      const cal = getCalendar(el);
      expect(cal).to.exist;
      expect(cal.tagName.toLowerCase()).to.equal('calendar-range');
    });

    it('passes minDate/maxDate to the Cally calendar', async () => {
      const el = await fixture(html`
        <auro-datepicker minDate="2025-01-01" maxDate="2025-12-31"></auro-datepicker>
      `);
      await elementUpdated(el);
      const cal = getCalendar(el);
      expect(cal.getAttribute('min')).to.equal('2025-01-01');
      expect(cal.getAttribute('max')).to.equal('2025-12-31');
    });
  });

  describe('public methods', () => {
    it('clear() resets value and valueEnd', async () => {
      const el = await fixture(html`
        <auro-datepicker range value="2025-06-15" valueEnd="2025-06-22"></auro-datepicker>
      `);
      el.clear();
      await elementUpdated(el);
      expect(el.value).to.be.oneOf([undefined, null, '']);
      expect(el.valueEnd).to.be.oneOf([undefined, null, '']);
    });

    it('reset() clears value', async () => {
      const el = await fixture(html`<auro-datepicker value="2025-06-15"></auro-datepicker>`);
      el.reset();
      await elementUpdated(el);
      expect(el.value).to.be.oneOf([undefined, null, '']);
    });

    it('showBib() and hideBib() open and close the dropdown', async () => {
      const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
      await elementUpdated(el);
      el.showBib();
      await elementUpdated(el);
      expect(el.dropdown.isPopoverVisible).to.equal(true);
      el.hideBib();
      await elementUpdated(el);
      expect(el.dropdown.isPopoverVisible).to.equal(false);
    });
  });

  describe('referenceDates back-compat', () => {
    it('accepts ISO-format reference dates and stores them as a list', async () => {
      const el = await fixture(html`
        <auro-datepicker
          referenceDates='["2025-10-05","2025-10-15","2025-10-20"]'>
        </auro-datepicker>
      `);
      await elementUpdated(el);
      expect(Array.isArray(el.referenceDates)).to.equal(true);
      expect(el.referenceDates.length).to.equal(3);
    });
  });

  describe('dayDecorations API', () => {
    it('accepts a function and stores it on the element', async () => {
      const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
      const fn = (date) => ({ label: String(date.getDate()) });
      el.dayDecorations = fn;
      await elementUpdated(el);
      expect(el.dayDecorations).to.equal(fn);
    });
  });

  describe('appearance', () => {
    it('reflects the appearance attribute', async () => {
      const el = await fixture(html`<auro-datepicker appearance="inverse"></auro-datepicker>`);
      expect(el.getAttribute('appearance')).to.equal('inverse');
    });
  });

  describe('range mode', () => {
    it('reports hasAllValues=true when both endpoints are set', async () => {
      const el = await fixture(html`
        <auro-datepicker range value="2025-06-15" valueEnd="2025-06-22"></auro-datepicker>
      `);
      await elementUpdated(el);
      expect(el.hasAllValues).to.equal(true);
    });

    it('reports hasAllValues=false when only one endpoint is set', async () => {
      const el = await fixture(html`<auro-datepicker range value="2025-06-15"></auro-datepicker>`);
      await elementUpdated(el);
      expect(el.hasAllValues).to.equal(false);
    });
  });

  describe('events', () => {
    it('fires auroDatePicker-toggled when the bib opens', async () => {
      const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
      await elementUpdated(el);
      setTimeout(() => el.showBib(), 0);
      const evt = await oneEvent(el, 'auroDatePicker-toggled');
      expect(evt.detail).to.have.property('expanded');
    });
  });

  describe('embedded in containers', () => {
    it('renders inside an auro-dialog', async () => {
      const dialog = await inDialogFixture();
      const dp = dialog.querySelector('auro-datepicker');
      expect(dp).to.exist;
    });

    it('renders inside an auro-drawer', async () => {
      const drawer = await inDrawerFixture();
      const dp = drawer.querySelector('auro-datepicker');
      expect(dp).to.exist;
    });
  });

  describe('input contract', () => {
    it('typing a valid display date populates ISO value', async () => {
      const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
      await elementUpdated(el);
      const input = el.inputList[0];
      input.value = '06/15/2025';
      input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
      await elementUpdated(el);
      expect(el.value).to.equal('2025-06-15');
    });

    it('typing fires auroDatePicker-valueSet', async () => {
      const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
      await elementUpdated(el);
      const input = el.inputList[0];
      setTimeout(() => {
        input.value = '06/15/2025';
        input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
      }, 0);
      const evt = await oneEvent(el, 'auroDatePicker-valueSet');
      expect(evt).to.exist;
    });

    it('locale dd/mm/yyyy round-trips ISO via the format-aware parser', async () => {
      const el = await fixture(html`<auro-datepicker format="dd/mm/yyyy"></auro-datepicker>`);
      await elementUpdated(el);
      const input = el.inputList[0];
      input.value = '15/06/2025';
      input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
      await elementUpdated(el);
      expect(el.value).to.equal('2025-06-15');
    });
  });

  describe('calendar selection (Cally change event)', () => {
    it('single change writes ISO value and closes bib', async () => {
      const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
      await elementUpdated(el);
      el.showBib();
      await elementUpdated(el);
      const cal = getCalendar(el);
      cal.value = '2025-06-15';
      cal.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
      await elementUpdated(el);
      expect(el.value).to.equal('2025-06-15');
      expect(el.dropdown.isPopoverVisible).to.equal(false);
    });

    it('range change splits value/valueEnd and leaves bib open', async () => {
      const el = await rangeFixture();
      await elementUpdated(el);
      el.showBib();
      await elementUpdated(el);
      const cal = getCalendar(el);
      cal.value = '2025-06-15/2025-06-22';
      cal.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
      await elementUpdated(el);
      expect(el.value).to.equal('2025-06-15');
      expect(el.valueEnd).to.equal('2025-06-22');
      expect(el.dropdown.isPopoverVisible).to.equal(true);
    });
  });

  describe('Cally event boundary', () => {
    it('malformed range value with empty end clears valueEnd but keeps start', async () => {
      // Documents current behavior: handleCalendarChange treats undefined end as a clear.
      const el = await rangeFixture('2025-06-15', '2025-06-22');
      await elementUpdated(el);
      const cal = getCalendar(el);
      cal.value = '2025-06-15/';
      cal.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
      await elementUpdated(el);
      expect(el.value).to.equal('2025-06-15');
      expect(el.valueEnd).to.be.oneOf([undefined, null, '']);
    });

    it('focusday with a non-Date detail is ignored', async () => {
      const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
      await elementUpdated(el);
      const cal = getCalendar(el);
      const before = el.calendarFocusDate;
      cal.dispatchEvent(new CustomEvent('focusday', { detail: { day: 'not-a-date' }, bubbles: true, composed: true }));
      await elementUpdated(el);
      expect(el.calendarFocusDate).to.equal(before);
    });
  });

  describe('keyboard strategy', () => {
    it('ArrowDown on the input opens the bib', async () => {
      const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
      await elementUpdated(el);
      const input = el.inputList[0];
      input.focus();
      const evt = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, composed: true });
      input.dispatchEvent(evt);
      await elementUpdated(el);
      expect(el.dropdown.isPopoverVisible).to.equal(true);
    });

    it('Escape on an open bib closes it', async () => {
      const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
      await elementUpdated(el);
      el.showBib();
      await elementUpdated(el);
      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, composed: true }));
      await elementUpdated(el);
      expect(el.dropdown.isPopoverVisible).to.equal(false);
    });

    it('Enter on the input opens the bib without submitting', async () => {
      const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
      await elementUpdated(el);
      const input = el.inputList[0];
      input.focus();
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true }));
      await elementUpdated(el);
      expect(el.dropdown.isPopoverVisible).to.equal(true);
    });
  });

  describe('fullscreen lifecycle', () => {
    it('exposes a bibtemplate that close-click hides the bib through', async () => {
      const el = await fullscreenFixture();
      await elementUpdated(el);
      el.showBib();
      await elementUpdated(el);
      expect(el.bibtemplate).to.exist;
      el.bibtemplate.dispatchEvent(new Event('close-click', { bubbles: true, composed: true }));
      await elementUpdated(el);
      expect(el.dropdown.isPopoverVisible).to.equal(false);
    });
  });

  describe('dayDecorations integration', () => {
    it('wires the callback into calendar.getDayParts after firstUpdated', async () => {
      const fn = () => ({ parts: ['holiday'] });
      const el = await decorationsFixture(fn);
      await elementUpdated(el);
      const cal = getCalendar(el);
      expect(typeof cal.getDayParts).to.equal('function');
      expect(cal.getDayParts(new Date(2025, 5, 15)).split(' ')).to.include('holiday');
    });

    it('rebuilds getDayParts when the callback changes', async () => {
      const el = await decorationsFixture(() => ({ parts: ['first'] }));
      await elementUpdated(el);
      el.dayDecorations = () => ({ parts: ['second'] });
      await elementUpdated(el);
      const cal = getCalendar(el);
      expect(cal.getDayParts(new Date(2025, 5, 15)).split(' ')).to.include('second');
    });
  });

  describe('referenceDates shim', () => {
    it('legacy MM/DD/YYYY entries emit a "reference" part on the matching cell', async () => {
      const el = await fixture(html`
        <auro-datepicker referenceDates='["06/15/2025"]'></auro-datepicker>
      `);
      await elementUpdated(el);
      const cal = getCalendar(el);
      expect(cal.getDayParts(new Date(2025, 5, 15)).split(' ')).to.include('reference');
      expect(cal.getDayParts(new Date(2025, 5, 16)).split(' ')).to.not.include('reference');
    });
  });

  describe('hover-range preview', () => {
    it('paints hover-range-inner between start and hover when only start is set', async () => {
      const el = await rangeFixture('2025-06-15');
      await elementUpdated(el);
      el.bridge.setHoverIso('2025-06-20');
      // eslint-disable-next-line no-underscore-dangle
      el._refreshGetDayParts();
      const cal = getCalendar(el);
      expect(cal.getDayParts(new Date(2025, 5, 17)).split(' ')).to.include('hover-range-inner');
      expect(cal.getDayParts(new Date(2025, 5, 20)).split(' ')).to.include('hover-range-end');
    });

    it('does not paint hover-range parts once both ends are set', async () => {
      const el = await rangeFixture('2025-06-15', '2025-06-22');
      await elementUpdated(el);
      el.bridge.setHoverIso('2025-06-25');
      // eslint-disable-next-line no-underscore-dangle
      el._refreshGetDayParts();
      const cal = getCalendar(el);
      expect(cal.getDayParts(new Date(2025, 5, 20))).to.equal('');
    });
  });

  describe('month-change event', () => {
    it('dedupes consecutive focusday events within the same month/year', async () => {
      const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
      await elementUpdated(el);
      const cal = getCalendar(el);
      let count = 0;
      el.addEventListener('auroDatePicker-monthChanged', () => count++);
      cal.dispatchEvent(new CustomEvent('focusday', { detail: { day: new Date(2025, 5, 1) }, bubbles: true, composed: true }));
      cal.dispatchEvent(new CustomEvent('focusday', { detail: { day: new Date(2025, 5, 20) }, bubbles: true, composed: true }));
      cal.dispatchEvent(new CustomEvent('focusday', { detail: { day: new Date(2025, 6, 5) }, bubbles: true, composed: true }));
      await elementUpdated(el);
      expect(count).to.equal(2);
    });
  });

  describe('min/max enforcement', () => {
    it('clears value when minDate is set above current value', async () => {
      const el = await fixture(html`<auro-datepicker value="2025-06-15"></auro-datepicker>`);
      await elementUpdated(el);
      el.minDate = '2025-07-01';
      await elementUpdated(el);
      expect(el.value).to.be.oneOf([undefined, null, '']);
    });

    it('clears value when maxDate is set below current value', async () => {
      const el = await fixture(html`<auro-datepicker value="2025-06-15"></auro-datepicker>`);
      await elementUpdated(el);
      el.maxDate = '2025-05-31';
      await elementUpdated(el);
      expect(el.value).to.be.oneOf([undefined, null, '']);
    });
  });

  describe('range coherence', () => {
    it('drops valueEnd when value > valueEnd', async () => {
      const el = await rangeFixture();
      await elementUpdated(el);
      el.value = '2025-06-20';
      el.valueEnd = '2025-06-15';
      await elementUpdated(el);
      expect(el.valueEnd).to.be.oneOf([undefined, null, '']);
    });
  });

  describe('calendarFocusDate defaults', () => {
    it('defaults calendarFocusDate to value when value is set and focus-date is unset', async () => {
      const el = await fixture(html`<auro-datepicker value="2025-06-15"></auro-datepicker>`);
      await elementUpdated(el);
      expect(el.calendarFocusDate).to.equal('2025-06-15');
    });
  });

  describe('clear action', () => {
    it('clears both ISO props and fires auroDatePicker-valueSet', async () => {
      const el = await rangeFixture('2025-06-15', '2025-06-22');
      await elementUpdated(el);
      let fired = 0;
      el.addEventListener('auroDatePicker-valueSet', () => fired++);
      // eslint-disable-next-line no-underscore-dangle
      el.handleClearClick(new Event('click'));
      await elementUpdated(el);
      expect(el.value).to.be.oneOf([undefined, null, '']);
      expect(el.valueEnd).to.be.oneOf([undefined, null, '']);
      expect(fired).to.be.greaterThan(0);
    });
  });

  describe('error helptext a11y', () => {
    it('renders the error message with role="alert" and aria-live="assertive"', async () => {
      const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
      el.validity = 'badInput';
      el.errorMessage = 'Bad date';
      await elementUpdated(el);
      const alert = el.shadowRoot.querySelector('[role="alert"]');
      expect(alert).to.exist;
      expect(alert.getAttribute('aria-live')).to.equal('assertive');
    });
  });
});

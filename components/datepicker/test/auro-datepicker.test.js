import { elementUpdated, expect, fixture, html, oneEvent } from '@open-wc/testing';

import '../src/registered.js';
import { inDialogFixture, inDrawerFixture } from './testFixtures.js';
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
});

/* eslint-disable max-lines, no-unused-expressions, no-undef, jsdoc/require-jsdoc */

import { fixture, fixtureSync, html, expect, elementUpdated } from '@open-wc/testing';
import { useAccessibleIt } from "@aurodesignsystem/auro-library/scripts/test-plugin/iterateWithA11Check.mjs";
import '../src/registered.js';
import { dateFormatter } from "@aurodesignsystem/auro-library/scripts/runtime/dateUtilities/dateFormatter.mjs";

useAccessibleIt();

const { toISOFormatString } = dateFormatter;

function setInputValue(el, value) {
  const input = el.shadowRoot.querySelector('input');
  input.value = value;
  input.dispatchEvent(new InputEvent('input'));
}

describe('auro-input locale prop', () => {
  it('defaults to en-US date format when no locale is provided', async () => {
    const el = await fixture(html`
      <auro-input type="date"></auro-input>
    `);

    expect(el.locale).to.equal('en-US');
    expect(el.format).to.equal('mm/dd/yyyy');
    expect(el.placeholderStr).to.equal('MM/DD/YYYY');
  });

  it('uses locale-specific default date format for en-GB', async () => {
    const el = await fixture(html`
      <auro-input type="date" locale="en-GB"></auro-input>
    `);

    expect(el.locale).to.equal('en-GB');
    expect(el.format).to.equal('dd/mm/yyyy');
    expect(el.placeholderStr).to.equal('DD/MM/YYYY');
  });

  it('uses locale-specific default date format for zh-CN', async () => {
    const el = await fixture(html`
      <auro-input type="date" locale="zh-CN"></auro-input>
    `);

    expect(el.locale).to.equal('zh-CN');
    expect(el.format).to.equal('yyyy/mm/dd');
    expect(el.placeholderStr).to.equal('YYYY/MM/DD');
  });

  it('does not auto-set en-GB date format when format is explicitly set', async () => {
    const el = await fixture(html`
      <auro-input type="date" locale="en-GB" format="yyyy/mm/dd"></auro-input>
    `);

    expect(el.locale).to.equal('en-GB');
    expect(el.format).to.equal('yyyy/mm/dd');
    expect(el.placeholderStr).to.equal('YYYY/MM/DD');

    setInputValue(el, '20001231');
    await elementUpdated(el);

    expect(el.value).to.equal('2000-12-31');
    expect(el.inputElement.value).to.equal('2000/12/31');
  });

  it('uses nearest data-locale when locale prop is not set', async () => {
    const wrapper = fixtureSync(html`
      <div data-locale="de-DE">
        <auro-input type="date"></auro-input>
      </div>
    `);

    const el = wrapper.querySelector('auro-input');
    await elementUpdated(el);

    expect(el.locale).to.equal('de-DE');
    expect(el.format).to.equal('dd.mm.yyyy');
    expect(el.placeholderStr).to.equal('DD.MM.YYYY');
  });

  it('locale prop takes precedence over inherited data-locale', async () => {
    const wrapper = fixtureSync(html`
      <div data-locale="de-DE">
        <auro-input type="date" locale="en-US"></auro-input>
      </div>
    `);

    const el = wrapper.querySelector('auro-input');
    await elementUpdated(el);

    expect(el.locale).to.equal('en-US');
    expect(el.format).to.equal('mm/dd/yyyy');
    expect(el.placeholderStr).to.equal('MM/DD/YYYY');
  });

  it('updates date format when locale changes and format is not explicitly overridden', async () => {
    const el = await fixture(html`
      <auro-input type="date" locale="en-US"></auro-input>
    `);

    expect(el.format).to.equal('mm/dd/yyyy');

    el.locale = 'en-GB';
    await elementUpdated(el);

    expect(el.format).to.equal('dd/mm/yyyy');
  });

  it('does not update date format when locale changes and format is explicitly overridden', async () => {
    const el = await fixture(html`
      <auro-input type="date" locale="en-US" format="yyyy/mm/dd"></auro-input>
    `);

    expect(el.format).to.equal('yyyy/mm/dd');

    el.locale = 'en-GB';
    await elementUpdated(el);

    expect(el.format).to.equal('yyyy/mm/dd');
  });

  it('uses en-GB auto format unless an explicit format is later provided', async () => {
    const el = await fixture(html`
      <auro-input type="date" locale="en-GB"></auro-input>
    `);

    expect(el.format).to.equal('dd/mm/yyyy');

    el.format = 'yyyy/mm/dd';
    await elementUpdated(el);

    expect(el.format).to.equal('yyyy/mm/dd');

    el.locale = 'en-US';
    await elementUpdated(el);

    expect(el.format).to.equal('yyyy/mm/dd');
  });

  it('updates locale format while preserving existing valueObject/minObject/maxObject data', async () => {
    const el = await fixture(html`
      <auro-input type="date" locale="en-US"></auro-input>
    `);

    const expectedValue = "2024-12-31";
    const expectedMin = "2024-01-01";
    const expectedMax = "2024-12-31";

    el.value = expectedValue;
    el.min = expectedMin;
    el.max = expectedMax;
    await elementUpdated(el);

    expect(el.format).to.equal('mm/dd/yyyy');
    expect(el.value).to.equal(expectedValue);
    expect(el.min).to.equal(expectedMin);
    expect(el.max).to.equal(expectedMax);
    expect(el.valueObject).to.be.instanceOf(Date);
    expect(el.minObject).to.be.instanceOf(Date);
    expect(el.maxObject).to.be.instanceOf(Date);
    expect(toISOFormatString(el.valueObject)).to.equal(expectedValue);
    expect(toISOFormatString(el.minObject)).to.equal(expectedMin);
    expect(toISOFormatString(el.maxObject)).to.equal(expectedMax);
    const initialDisplayValue = el.inputElement.value;

    el.locale = 'en-GB';
    await elementUpdated(el);

    expect(el.format).to.equal('dd/mm/yyyy');
    expect(el.value).to.equal(expectedValue);
    expect(el.min).to.equal(expectedMin);
    expect(el.max).to.equal(expectedMax);
    expect(toISOFormatString(el.valueObject)).to.equal(expectedValue);
    expect(toISOFormatString(el.minObject)).to.equal(expectedMin);
    expect(toISOFormatString(el.maxObject)).to.equal(expectedMax);
    expect(el.inputElement.value).to.equal("31/12/2024");
    expect(el.inputElement.value).to.not.equal(initialDisplayValue);
  });
});

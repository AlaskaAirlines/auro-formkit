/* eslint-disable no-unused-expressions, no-undef, no-magic-numbers */

import { fixture, html, expect } from '@open-wc/testing';
import { useAccessibleIt } from "@aurodesignsystem/auro-library/scripts/test-plugin/iterateWithA11Check.mjs";
import '../src/registered.js';

useAccessibleIt();

describe('auro-counter: increment', () => {
  it('increments the value by 1 when no argument is provided', async () => {
    const el = await fixture(html`<auro-counter>Counter</auro-counter>>`);
    el.increment();
    expect(el.value).to.equal(1);
  });

  it('increments the value by the provided argument', async () => {
    const el = await fixture(html`<auro-counter>Counter</auro-counter>>`);
    el.increment(5);
    expect(el.value).to.equal(5);
  });

  it('increments the value correctly when it is already set', async () => {
    const el = await fixture(html`<auro-counter value="3">Counter</auro-counter>>`);
    el.increment(2);
    expect(el.value).to.equal(5);
  });

  it('does not increment the value when disabled', async () => {
    const el = await fixture(html`<auro-counter disabled>Counter</auro-counter>>`);
    el.increment();
    expect(el.value).to.equal(0);
  });
});

describe('auro-counter: decrement', () => {

  it('decrements the value by 1 when no argument is provided', async () => {
    const el = await fixture(html`<auro-counter value="5">Counter</auro-counter>>`);
    el.decrement();
    expect(el.value).to.equal(4);
  });

  it('decrements the value by the provided argument', async () => {
    const el = await fixture(html`<auro-counter value="5">Counter</auro-counter>>`);
    el.decrement(2);
    expect(el.value).to.equal(3);
  });

  it('decrements the value correctly when it is already set', async () => {
    const el = await fixture(html`<auro-counter value="5">Counter</auro-counter>>`);
    el.decrement(3);
    expect(el.value).to.equal(2);
  });

  it('does not decrement the value when disabled', async () => {
    const el = await fixture(html`<auro-counter value="5" disabled>Counter</auro-counter>>`);
    el.decrement();
    expect(el.value).to.equal(5);
  });
});

describe('auro-counter: isIncrementDisabled', () => {

  it('returns false when value is undefined', async () => {
    const el = await fixture(html`<auro-counter>Counter 1</auro-counter>`);
    el.value = undefined;
    expect(el.isIncrementDisabled(el.max)).to.be.false;
  });

  it('returns false when extrema is min and value is greater than min', async () => {
    const el = await fixture(html`<auro-counter value="5" min="0">Counter 1</auro-counter>`);
    expect(el.isIncrementDisabled(el.min)).to.be.false;
  });

  it('returns false when extrema is max and value is less than max', async () => {
    const el = await fixture(html`<auro-counter value="5" max="10">Counter 1</auro-counter>`);
    expect(el.isIncrementDisabled(el.max)).to.be.false;
  });

  it('returns true when value is equal to min', async () => {
    const el = await fixture(html`<auro-counter>Counter 1</auro-counter>`);
    expect(el.isIncrementDisabled(el.min)).to.be.true;
  });

  it('returns true when value is equal to max', async () => {
    const el = await fixture(html`<auro-counter value="10" max="10">Counter 1</auro-counter>`);
    expect(el.isIncrementDisabled(el.max)).to.be.true;
  });
});

describe('auro-counter: spinbutton input', () => {
  it('renders the spinbutton as an input element', async () => {
    const el = await fixture(html`<auro-counter>Counter</auro-counter>`);
    const spinbutton = el.shadowRoot.querySelector('[role="spinbutton"]');
    expect(spinbutton.tagName.toLowerCase()).to.equal('input');
  });

  it('spinbutton input is readonly', async () => {
    const el = await fixture(html`<auro-counter>Counter</auro-counter>`);
    const spinbutton = el.shadowRoot.querySelector('[role="spinbutton"]');
    expect(spinbutton.hasAttribute('readonly')).to.be.true;
  });

  it('spinbutton input has autocomplete set to off', async () => {
    const el = await fixture(html`<auro-counter>Counter</auro-counter>`);
    const spinbutton = el.shadowRoot.querySelector('[role="spinbutton"]');
    expect(spinbutton.getAttribute('autocomplete')).to.equal('off');
  });

  it('spinbutton input is labelled by the counter-label element', async () => {
    const el = await fixture(html`<auro-counter>Counter</auro-counter>`);
    const spinbutton = el.shadowRoot.querySelector('[role="spinbutton"]');
    expect(spinbutton.getAttribute('aria-labelledby')).to.equal('counter-label');
  });

  it('spinbutton value attribute reflects the counter value', async () => {
    const el = await fixture(html`<auro-counter value="3">Counter</auro-counter>`);
    const spinbutton = el.shadowRoot.querySelector('[role="spinbutton"]');
    expect(spinbutton.getAttribute('value')).to.equal('3');
  });

  // This is to ensure that screen readers read the value as a string, preventing mispronunciation with percentage values
  it('spinbutton aria-valuetext wraps value in single quotes', async () => {
    const el = await fixture(html`<auro-counter value="5">Counter</auro-counter>`);
    const spinbutton = el.shadowRoot.querySelector('[role="spinbutton"]');
    expect(spinbutton.getAttribute('aria-valuetext')).to.equal("'5'");
  });

  it('spinbutton aria-valuetext uses min when value is undefined', async () => {
    const el = await fixture(html`<auro-counter min="1">Counter</auro-counter>`);
    const spinbutton = el.shadowRoot.querySelector('[role="spinbutton"]');
    expect(spinbutton.getAttribute('aria-valuetext')).to.equal("'1'");
  });
});

describe('auro-counter: button ariaControlsElements wiring', () => {
  it('decrement button has data-spinbutton-operation="decrement"', async () => {
    const el = await fixture(html`<auro-counter>Counter</auro-counter>`);
    const decrementBtn = el.shadowRoot.querySelector('[part="controlMinus"]');
    expect(decrementBtn.getAttribute('data-spinbutton-operation')).to.equal('decrement');
  });

  it('increment button has data-spinbutton-operation="increment"', async () => {
    const el = await fixture(html`<auro-counter>Counter</auro-counter>`);
    const incrementBtn = el.shadowRoot.querySelector('[part="controlPlus"]');
    expect(incrementBtn.getAttribute('data-spinbutton-operation')).to.equal('increment');
  });
});


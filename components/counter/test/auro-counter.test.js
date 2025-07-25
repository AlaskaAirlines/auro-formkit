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

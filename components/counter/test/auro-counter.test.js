/* eslint-disable no-unused-expressions, no-undef, no-magic-numbers, arrow-parens */

import { fixture, html, expect, assert } from '@open-wc/testing';
import '../src/index.js';

describe('auro-counter: increment', () => {
  it('increments the value by 1 when no argument is provided', async () => {
    const el = await fixture(html`<auro-counter></auro-counter>`);
    el.increment();
    expect(el.value).to.equal(1);
  });

  it('increments the value by the provided argument', async () => {
    const el = await fixture(html`<auro-counter></auro-counter>`);
    el.increment(5);
    expect(el.value).to.equal(5);
  });

  it('increments the value correctly when it is already set', async () => {
    const el = await fixture(html`<auro-counter value="3"></auro-counter>`);
    el.increment(2);
    expect(el.value).to.equal(5);
  });

  it('does not increment the value when disabled', async () => {
    const el = await fixture(html`<auro-counter disabled></auro-counter>`);
    el.increment();
    expect(el.value).to.equal(0);
  });
});

describe('auro-counter: decrement', () => {

  it('decrements the value by 1 when no argument is provided', async () => {
    const el = await fixture(html`<auro-counter value="5"></auro-counter>`);
    el.decrement();
    expect(el.value).to.equal(4);
  });

  it('decrements the value by the provided argument', async () => {
    const el = await fixture(html`<auro-counter value="5"></auro-counter>`);
    el.decrement(2);
    expect(el.value).to.equal(3);
  });

  it('decrements the value correctly when it is already set', async () => {
    const el = await fixture(html`<auro-counter value="5"></auro-counter>`);
    el.decrement(3);
    expect(el.value).to.equal(2);
  });

  it('does not decrement the value when disabled', async () => {
    const el = await fixture(html`<auro-counter value="5" disabled></auro-counter>`);
    el.decrement();
    expect(el.value).to.equal(5);
  });
});

describe('auro-counter: isIncrementDisabled', () => {

  it('returns false when value is undefined', async () => {
    const el = await fixture(html`<auro-counter></auro-counter>`);
    el.value = undefined;
    expect(el.isIncrementDisabled(el.max)).to.be.false;
  });

  it('returns false when extrema is min and value is greater than min', async () => {
    const el = await fixture(html`<auro-counter value="5" min="0"></auro-counter>`);
    expect(el.isIncrementDisabled(el.min)).to.be.false;
  });

  it('returns false when extrema is max and value is less than max', async () => {
    const el = await fixture(html`<auro-counter value="5" max="10"></auro-counter>`);
    expect(el.isIncrementDisabled(el.max)).to.be.false;
  });

  it('returns true when value is equal to min', async () => {
    const el = await fixture(html`<auro-counter></auro-counter>`);
    expect(el.isIncrementDisabled(el.min)).to.be.true;
  });

  it('returns true when value is equal to max', async () => {
    const el = await fixture(html`<auro-counter value="10" max="10"></auro-counter>`);
    expect(el.isIncrementDisabled(el.max)).to.be.true;
  });
});

describe('auro-counter: accessibility tests', () => {
  const ignoredRules = {
    ignoredRules: ['color-contrast'],
  };

  it('is accessible', async () => {
    const el = await fixture(html`<auro-counter value="5" min="0" max="10">Counter</auro-counter>`);
    await assert.isAccessible(el, ignoredRules);
  });

  it('is accessible when disabled', async () => {
    const el = await fixture(html`<auro-counter value="5" min="0" max="10" disabled>Counter</auro-counter>`);
    await assert.isAccessible(el, ignoredRules);
  });
});

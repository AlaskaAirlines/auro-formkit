/* eslint-disable no-unused-expressions, no-undef, no-magic-numbers, arrow-parens */

import { fixture, html, expect } from '@open-wc/testing';
import '../src/index.js';

describe('auro-counter: increment', () => {
  it('increments the value by 1 when no argument is provided', async () => {
    const el = await fixture(html`<auro-counter></auro-counter>`);
    el.value = 0;
    el.increment();
    expect(el.value).to.equal(1);
  });

  it('increments the value by the provided argument', async () => {
    const el = await fixture(html`<auro-counter></auro-counter>`);
    el.value = 0;
    el.increment(5);
    expect(el.value).to.equal(5);
  });

  it('increments the value correctly when it is already set', async () => {
    const el = await fixture(html`<auro-counter></auro-counter>`);
    el.value = 3;
    el.increment(2);
    expect(el.value).to.equal(5);
  });

  it('does not increment the value when disabled', async () => {
    const el = await fixture(html`<auro-counter disabled></auro-counter>`);
    el.value = 0;
    el.increment();
    expect(el.value).to.equal(0);
  });
});

describe('auro-counter: decrement', () => {

  it('decrements the value by 1 when no argument is provided', async () => {
    const el = await fixture(html`<auro-counter></auro-counter>`);
    el.value = 5;
    el.decrement();
    expect(el.value).to.equal(4);
  });

  it('decrements the value by the provided argument', async () => {
    const el = await fixture(html`<auro-counter></auro-counter>`);
    el.value = 5;
    el.decrement(2);
    expect(el.value).to.equal(3);
  });

  it('decrements the value correctly when it is already set', async () => {
    const el = await fixture(html`<auro-counter></auro-counter>`);
    el.value = 5;
    el.decrement(3);
    expect(el.value).to.equal(2);
  });

  it('does not decrement the value when disabled', async () => {
    const el = await fixture(html`<auro-counter disabled></auro-counter>`);
    el.value = 5;
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
    const el = await fixture(html`<auro-counter></auro-counter>`);
    el.value = 5;
    el.min = 0;
    expect(el.isIncrementDisabled(el.min)).to.be.false;
  });

  it('returns false when extrema is max and value is less than max', async () => {
    const el = await fixture(html`<auro-counter></auro-counter>`);
    el.value = 5;
    el.max = 10;
    expect(el.isIncrementDisabled(el.max)).to.be.false;
  });

  it('returns true when value is equal to min', async () => {
    const el = await fixture(html`<auro-counter></auro-counter>`);
    el.value = 0;
    el.min = 0;
    expect(el.isIncrementDisabled(el.min)).to.be.true;
  });

  it('returns true when value is equal to max', async () => {
    const el = await fixture(html`<auro-counter></auro-counter>`);
    el.value = 10;
    el.max = 10;
    expect(el.isIncrementDisabled(el.max)).to.be.true;
  });
});

/* eslint-disable no-undef, no-magic-numbers */

import { fixture, html, expect } from '@open-wc/testing';
import '../src/index.js';

describe('auro-counter-group: configureCounters', () => {
  it('updates the counters property with all auro-counter elements', async () => {
    const el = await fixture(html`
            <auro-counter-group>
                <auro-counter></auro-counter>
                <auro-counter></auro-counter>
            </auro-counter-group>
        `);

    el.configureCounters();

    expect(el.counters.length).to.equal(2);
  });

  it('does not attach listeners to non-auro-counter elements', async () => {
    const el = await fixture(html`
            <auro-counter-group>
                <auro-counter></auro-counter>
                <div></div>
            </auro-counter-group>
        `);

    el.configureCounters();

    expect(el.counters.length).to.equal(1);
  });
});

describe('auro-counter-group: updateValue', () => {
  it('updates the value property with the correct values from counters', async () => {
    const el = await fixture(html`
            <auro-counter-group>
                <auro-counter name="counter1" value="2"></auro-counter>
                <auro-counter name="counter2" value="3"></auro-counter>
            </auro-counter-group>
        `);

    el.configureCounters();
    el.updateValue();

    expect(el.value).to.deep.equal({ counter1: 2,
      counter2: 3 });
  });

  it('updates the total property with the sum of counter values', async () => {
    const el = await fixture(html`
            <auro-counter-group>
                <auro-counter value="2"></auro-counter>
                <auro-counter value="3"></auro-counter>
            </auro-counter-group>
        `);

    el.configureCounters();
    el.updateValue();

    expect(el.total).to.equal(5);
  });

  it('disables increment button if total is at or above max', async () => {
    const el = await fixture(html`
            <auro-counter-group max="5">
                <auro-counter value="2"></auro-counter>
                <auro-counter value="3"></auro-counter>
            </auro-counter-group>
        `);

    el.configureCounters();
    el.updateValue();

    el.counters.forEach((counter) => {
      expect(counter.disableMax).to.be.true;
    });
  });

  it('disables decrement button if total is at or below min', async () => {
    const el = await fixture(html`
            <auro-counter-group min="5">
                <auro-counter value="2"></auro-counter>
                <auro-counter value="3"></auro-counter>
            </auro-counter-group>
        `);

    el.configureCounters();
    el.updateValue();

    el.counters.forEach((counter) => {
      expect(counter.disableMin).to.be.true;
    });
  });

  it('does not disable buttons if total is within min and max range', async () => {
    const el = await fixture(html`
            <auro-counter-group min="1" max="10">
                <auro-counter value="2"></auro-counter>
                <auro-counter value="3"></auro-counter>
            </auro-counter-group>
        `);

    el.configureCounters();
    el.updateValue();

    el.counters.forEach((counter) => {
      expect(counter.disableMax).to.be.false;
      expect(counter.disableMin).to.be.false;
    });
  });
});

describe('auro-counter-group: configureDropdownCounters', () => {
  it('updates the counters property with all auro-counter elements within the dropdown', async () => {
    const el = await fixture(html`
        <auro-counter-group isDropdown>
                <auro-counter></auro-counter>
                <auro-counter></auro-counter>
        </auro-counter-group>
    `);

    expect(el.counters.length).to.equal(2);
  });

  it('attaches input event listeners to all auro-counter elements within the dropdown', async () => {
    const el = await fixture(html`
        <auro-counter-group isDropdown>
                <auro-counter></auro-counter>
                <auro-counter></auro-counter>
        </auro-counter-group>
    `);

    el.counters.forEach((counter) => {
      const event = new Event('input');
      counter.dispatchEvent(event);
      expect(el.value).to.exist;
    });
  });

  it('does not attach listeners to non-auro-counter elements within the dropdown', async () => {
    const el = await fixture(html`
        <auro-counter-group isDropdown>
                <auro-counter></auro-counter>
                <div></div>
        </auro-counter-group>
    `);

    expect(el.counters.length).to.equal(1);
  });
});

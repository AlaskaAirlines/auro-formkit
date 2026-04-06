/* eslint-disable no-unused-expressions, no-undef, no-magic-numbers */

import { fixture, html, expect, oneEvent } from '@open-wc/testing';
import { useAccessibleIt } from "@aurodesignsystem/auro-library/scripts/test-plugin/iterateWithA11Check.mjs";
import '../src/registered.js';

useAccessibleIt();

describe('Rendering', () => {
  // Add all missing tests
});

describe('User Stories', () => {
  describe('Increment', () => {
    it('should increment the value by 1 when no argument is provided', async () => {
      const el = await fixture(html`<auro-counter>Counter</auro-counter>>`);
      el.increment();
      expect(el.value).to.equal(1);
    });

    it('should increment the value by the provided argument', async () => {
      const el = await fixture(html`<auro-counter>Counter</auro-counter>>`);
      el.increment(5);
      expect(el.value).to.equal(5);
    });

    it('should increment the value correctly when it is already set', async () => {
      const el = await fixture(html`<auro-counter value="3">Counter</auro-counter>>`);
      el.increment(2);
      expect(el.value).to.equal(5);
    });

    it('should not increment the value when disabled', async () => {
      const el = await fixture(html`<auro-counter disabled>Counter</auro-counter>>`);
      el.increment();
      expect(el.value).to.equal(0);
    });
  });

  describe('Decrement', () => {

    it('should decrement the value by 1 when no argument is provided', async () => {
      const el = await fixture(html`<auro-counter value="5">Counter</auro-counter>>`);
      el.decrement();
      expect(el.value).to.equal(4);
    });

    it('should decrement the value by the provided argument', async () => {
      const el = await fixture(html`<auro-counter value="5">Counter</auro-counter>>`);
      el.decrement(2);
      expect(el.value).to.equal(3);
    });

    it('should decrement the value correctly when it is already set', async () => {
      const el = await fixture(html`<auro-counter value="5">Counter</auro-counter>>`);
      el.decrement(3);
      expect(el.value).to.equal(2);
    });

    it('should not decrement the value when disabled', async () => {
      const el = await fixture(html`<auro-counter value="5" disabled>Counter</auro-counter>>`);
      el.decrement();
      expect(el.value).to.equal(5);
    });
  });
});

describe('Properties', () => {
  describe('value', () => {
    // add preset value tests here

    describe('Disabled based on value', () => {

      it('should not be disabled when value is undefined and no min or max is set', async () => {
        const el = await fixture(html`<auro-counter>Counter 1</auro-counter>`);
        el.value = undefined;
        expect(el.isIncrementDisabled(el.max)).to.be.false;
      });
    });
  });

  describe('appearance', () => {
    // add tests for this property
  });

  describe('disabled', () => {
    // add tests for this property
  });

  describe('error', () => {
    // add tests for this property

  });

  describe('max', () => {
    it('should return false when max is defined and value is less than max', async () => {
      const el = await fixture(html`<auro-counter value="5" max="10">Counter 1</auro-counter>`);
      expect(el.isIncrementDisabled(el.max)).to.be.false;
    });

    it('should return true when value is equal to max', async () => {
      const el = await fixture(html`<auro-counter value="10" max="10">Counter 1</auro-counter>`);
      expect(el.isIncrementDisabled(el.max)).to.be.true;
    });
  });

  describe('min', () => {

    it('should return false when extrema is min and value is greater than min', async () => {
      const el = await fixture(html`<auro-counter value="5" min="0">Counter 1</auro-counter>`);
      expect(el.isIncrementDisabled(el.min)).to.be.false;
    });

    it('should return true when value is equal to min', async () => {
      const el = await fixture(html`<auro-counter>Counter 1</auro-counter>`);
      expect(el.isIncrementDisabled(el.min)).to.be.true;
    });
  });

  describe('onDark', () => {
    // add tests for this property
  });

  describe('validity', () => {
    // add tests for this property
  });
});

describe('A11Y', () => {
  it('should set aria-describedby elements on the spin button when a description element is slotted', async () => {
    const el = await fixture(html`
      <auro-counter>
        Counter
        <span slot="description">Description text</span>
      </auro-counter>
    `);

    const spinbutton = el.shadowRoot.querySelector('[role="spinbutton"]');
    const descriptionEl = el.querySelector('[slot="description"]');

    expect(spinbutton.ariaDescribedByElements).to.deep.equal([descriptionEl]);
  });

  it('should clear aria-describedby elements on the spin button when the description element is removed', async () => {
    const el = await fixture(html`
      <auro-counter>
        Counter
        <span slot="description">Description text</span>
      </auro-counter>
    `);

    const spinbutton = el.shadowRoot.querySelector('[role="spinbutton"]');
    const descriptionEl = el.querySelector('[slot="description"]');

    expect(spinbutton.ariaDescribedByElements).to.deep.equal([descriptionEl]);

    const descSlot = el.shadowRoot.querySelector('slot[name="description"]');
    const slotChangePromise = oneEvent(descSlot, 'slotchange');
    el.removeChild(descriptionEl);
    await slotChangePromise;

    // Per spec, setting ariaDescribedByElements to an empty sequence unsets it (returns null)
    expect(spinbutton.ariaDescribedByElements.length).to.equal(0);
  });

  it('should set aria-describedby elements when a description element is added dynamically', async () => {
    const el = await fixture(html`<auro-counter>Counter</auro-counter>`);

    const spinbutton = el.shadowRoot.querySelector('[role="spinbutton"]');
    const descSlot = el.shadowRoot.querySelector('slot[name="description"]');

    const desc = document.createElement('span');
    desc.setAttribute('slot', 'description');
    desc.textContent = 'Added description';

    const slotChangePromise = oneEvent(descSlot, 'slotchange');
    el.appendChild(desc);
    await slotChangePromise;

    expect(spinbutton.ariaDescribedByElements).to.deep.equal([desc]);
  });

  it('should not use the aria-describedby attribute on the spin button', async () => {
    const el = await fixture(html`
      <auro-counter>
        Counter
        <span slot="description">Description text</span>
      </auro-counter>
    `);

    const spinbutton = el.shadowRoot.querySelector('[role="spinbutton"]');

    expect(spinbutton.getAttribute('aria-describedby') === "" || !spinbutton.hasAttribute('aria-describedby')).to.be.true;
  });
});

describe('Mouse Behavior', () => {
  describe('Click', () => {
    it('should increment value when increment button is clicked', async () => {
      const el = await fixture(html`<auro-counter>Counter</auro-counter>`);
      const incrementBtn = el.shadowRoot.querySelector('[part="controlPlus"]');

      incrementBtn.click();

      expect(el.value).to.equal(1);
    });

    it('should decrement value when decrement button is clicked', async () => {
      const el = await fixture(html`<auro-counter value="3">Counter</auro-counter>`);
      const decrementBtn = el.shadowRoot.querySelector('[part="controlMinus"]');

      decrementBtn.click();

      expect(el.value).to.equal(2);
    });
  });
});

describe('Keyboard Behavior', () => {
  // Add all missing tests
});

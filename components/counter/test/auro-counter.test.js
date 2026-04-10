/* eslint-disable no-unused-expressions, no-undef, no-magic-numbers */

import { fixture, html, expect, oneEvent } from '@open-wc/testing';
import { useAccessibleIt } from "@aurodesignsystem/auro-library/scripts/test-plugin/iterateWithA11Check.mjs";
import '../src/registered.js';

useAccessibleIt();

describe('Rendering', () => {
  // Add all missing tests
});

describe('User Stories', () => {
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

describe('Slots', () => {
  describe('default', () => {
    it('should render content in the default slot', async () => {
      const el = await fixture(html`<auro-counter>Guests</auro-counter>`);

      const slot = el.shadowRoot.querySelector('slot:not([name])');

      await expect(slot).to.exist;
      const assigned = slot.assignedNodes().filter((n) => n.nodeType === Node.ELEMENT_NODE || n.nodeType === Node.TEXT_NODE);

      await expect(assigned.length).to.be.greaterThan(0);
    });
  });

  describe('ariaLabel.minus', () => {
    it('should render content in the ariaLabel.minus slot', async () => {
      const el = await fixture(html`<auro-counter>Guests<span slot="ariaLabel.minus">Remove guest</span></auro-counter>`);

      const slotContent = el.querySelector('[slot="ariaLabel.minus"]');

      await expect(slotContent).to.exist;
    });
  });

  describe('ariaLabel.plus', () => {
    it('should render content in the ariaLabel.plus slot', async () => {
      const el = await fixture(html`<auro-counter>Guests<span slot="ariaLabel.plus">Add guest</span></auro-counter>`);

      const slotContent = el.querySelector('[slot="ariaLabel.plus"]');

      await expect(slotContent).to.exist;
    });
  });

  describe('helpText', () => {
    it('should render content in the helpText slot', async () => {
      const el = await fixture(html`<auro-counter>Guests<span slot="helpText">Max 10 guests</span></auro-counter>`);

      const slotContent = el.querySelector('[slot="helpText"]');

      await expect(slotContent).to.exist;
    });
  });

  describe('description', () => {
    it('should render content in the description slot', async () => {
      const el = await fixture(html`<auro-counter>Guests<span slot="description">Number of guests</span></auro-counter>`);

      const slotContent = el.querySelector('[slot="description"]');

      await expect(slotContent).to.exist;
    });
  });

});

describe('Public Functions', () => {
  describe('register', () => {
    // TODO: test needs to be added
  });

  describe('increment', () => {
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

  describe('decrement', () => {
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

  describe('validate', () => {
    // TODO: test needs to be added
  });
});

describe('Private Functions', () => {
  // No private function tests
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

/* eslint-disable max-lines, no-unused-expressions, no-undef, no-magic-numbers */

import { fixture, html, expect, oneEvent } from '@open-wc/testing';
import { useAccessibleIt } from "@aurodesignsystem/auro-library/scripts/test-plugin/iterateWithA11Check.mjs";
import '../src/registered.js';

useAccessibleIt();

describe('Rendering', () => {
  it('should be defined as a custom element', async () => {
    const el = await Boolean(customElements.get('auro-counter'));
    await expect(el).to.be.true;
  });

  it('should be successfully created in the document', async () => {
    const el = document.createElement('auro-counter');
    await expect(el.localName).to.equal('auro-counter');
  });

  it('should render a spinbutton role element', async () => {
    const el = await fixture(html`<auro-counter>Counter</auro-counter>`);
    const spinbutton = el.shadowRoot.querySelector('[role="spinbutton"]');
    await expect(spinbutton).to.exist;
  });
});

describe('User Stories', () => {
});

describe('Properties', () => {
  describe('value', () => {
    it('should initialize value to min when undefined', async () => {
      const el = await fixture(html`<auro-counter>Counter</auro-counter>`);
      await expect(el.value).to.equal(0);
    });

    it('should accept a preset value', async () => {
      const el = await fixture(html`<auro-counter value="5">Counter</auro-counter>`);
      await expect(el.value).to.equal(5);
    });

    describe('Disabled based on value', () => {

      it('should not be disabled when value is undefined and no min or max is set', async () => {
        const el = await fixture(html`<auro-counter>Counter 1</auro-counter>`);
        el.value = undefined;
        expect(el.isIncrementDisabled(el.max)).to.be.false;
      });
    });
  });

  describe('appearance', () => {
    it('should default to default appearance', async () => {
      const el = await fixture(html`<auro-counter>Counter</auro-counter>`);
      await expect(el.appearance).to.equal('default');
    });

    it('should reflect the appearance attribute', async () => {
      const el = await fixture(html`
        <div style="background-color: #222222">
          <auro-counter appearance="inverse">Counter</auro-counter>
        </div>
      `);
      const counter = el.querySelector('auro-counter');
      await expect(counter.getAttribute('appearance')).to.equal('inverse');
    });
  });

  describe('disabled', () => {
    it('should default to false', async () => {
      const el = await fixture(html`<auro-counter>Counter</auro-counter>`);
      await expect(el.disabled).to.be.false;
    });

    it('should reflect the disabled attribute', async () => {
      const el = await fixture(html`<auro-counter disabled>Counter</auro-counter>`);
      await expect(el.disabled).to.be.true;
      await expect(el.hasAttribute('disabled')).to.be.true;
    });

    it('should prevent increment when disabled', async () => {
      const el = await fixture(html`<auro-counter disabled>Counter</auro-counter>`);
      el.increment();
      await expect(el.value).to.equal(0);
    });

    it('should prevent decrement when disabled', async () => {
      const el = await fixture(html`<auro-counter value="5" disabled>Counter</auro-counter>`);
      el.decrement();
      await expect(el.value).to.equal(5);
    });
  });

  describe('error', () => {
    it('should default to undefined', async () => {
      const el = await fixture(html`<auro-counter>Counter</auro-counter>`);
      await expect(el.error).to.be.undefined;
    });

    it('should set error state and message', async () => {
      const el = await fixture(html`<auro-counter error="Too many">Counter</auro-counter>`);
      await expect(el.error).to.equal('Too many');
    });
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
    it('should default to false', async () => {
      const el = await fixture(html`<auro-counter>Counter</auro-counter>`);
      await expect(el.onDark).to.be.false;
    });

    it('should reflect the onDark attribute', async () => {
      const el = await fixture(html`
        <div style="background-color: #222222">
          <auro-counter ondark>Counter</auro-counter>
        </div>
      `);
      const counter = el.querySelector('auro-counter');
      await expect(counter.onDark).to.be.true;
      await expect(counter.hasAttribute('ondark')).to.be.true;
    });
  });

  describe('validity', () => {
    it('should be valid after initialization', async () => {
      const el = await fixture(html`<auro-counter>Counter</auro-counter>`);
      await expect(el.validity).to.equal('valid');
    });

    it('should reflect customError after validation with error attribute', async () => {
      const el = await fixture(html`<auro-counter error="Error msg">Counter</auro-counter>`);
      el.validate(true);
      await expect(el.validity).to.equal('customError');
    });
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
    it('should register the element as a custom element', async () => {
      const el = await Boolean(customElements.get('auro-counter'));
      await expect(el).to.be.true;
    });
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
    it('should set customError validity when error attribute is set', async () => {
      const el = await fixture(html`<auro-counter error="Error msg">Counter</auro-counter>`);
      el.validate(true);
      await expect(el.validity).to.equal('customError');
    });

    it('should validate without error when no error attribute', async () => {
      const el = await fixture(html`<auro-counter>Counter</auro-counter>`);
      el.validate(true);
      await expect(el.validity).to.not.equal('customError');
    });
  });
});

describe('Events', () => {
  describe('input', () => {
    it('should fire input event when value changes via increment', async () => {
      const el = await fixture(html`<auro-counter>Counter</auro-counter>`);

      const listener = oneEvent(el, 'input');
      el.increment();
      const event = await listener;

      await expect(event).to.exist;
      await expect(event.detail.value).to.equal(1);
    });

    it('should fire input event when value changes via decrement', async () => {
      const el = await fixture(html`<auro-counter value="5">Counter</auro-counter>`);

      const listener = oneEvent(el, 'input');
      el.decrement();
      const event = await listener;

      await expect(event).to.exist;
      await expect(event.detail.value).to.equal(4);
    });
  });
});

describe('Private Functions', () => {
  // No private function tests
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
  it('should increment value on ArrowUp', async () => {
    const el = await fixture(html`<auro-counter>Counter</auro-counter>`);
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    await expect(el.value).to.equal(1);
  });

  it('should decrement value on ArrowDown', async () => {
    const el = await fixture(html`<auro-counter value="5">Counter</auro-counter>`);
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await expect(el.value).to.equal(4);
  });

  it('should not increment beyond max on ArrowUp', async () => {
    const el = await fixture(html`<auro-counter value="9" max="9">Counter</auro-counter>`);
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    await expect(el.value).to.equal(9);
  });

  it('should not decrement below min on ArrowDown', async () => {
    const el = await fixture(html`<auro-counter value="0" min="0">Counter</auro-counter>`);
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await expect(el.value).to.equal(0);
  });
});

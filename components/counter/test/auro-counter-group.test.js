/* eslint-disable no-undef, no-magic-numbers, max-lines, no-unused-expressions, prefer-destructuring */

import { fixture, html, expect, elementUpdated, assert } from '@open-wc/testing';
import { useAccessibleIt } from "@aurodesignsystem/auro-library/scripts/test-plugin/iterateWithA11Check.mjs";
import '../src/registered.js';

useAccessibleIt();

describe('auro-counter-group: configureCounters', () => {
  it('updates the counters property with all auro-counter elements', async () => {
    const el = await fixture(html`
            <auro-counter-group>
                <auro-counter>Counter1</auro-counter>
                <auro-counter>Counter2</auro-counter>
            </auro-counter-group>
        `);

    el.configureCounters();

    expect(el.counters.length).to.equal(2);
  });

  it('does not attach listeners to non-auro-counter elements', async () => {
    const el = await fixture(html`
            <auro-counter-group>
                <auro-counter>Counter</auro-counter>
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
                <auro-counter name="counter1" value="2">Counter1</auro-counter>
                <auro-counter name="counter2" value="3">Counter2</auro-counter>
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
                <auro-counter value="2">Counter1</auro-counter>
                <auro-counter value="3">Counter2</auro-counter>
            </auro-counter-group>
        `);

    el.configureCounters();
    el.updateValue();

    expect(el.total).to.equal(5);
  });

  it('disables increment button if total is at or above max', async () => {
    const el = await fixture(html`
            <auro-counter-group max="5">
                <auro-counter value="2">Counter1</auro-counter>
                <auro-counter value="3">Counter2</auro-counter>
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
                <auro-counter value="2">Counter1</auro-counter>
                <auro-counter value="3">Counter2</auro-counter>
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
                <auro-counter value="2">Counter1</auro-counter>
                <auro-counter value="3">Counter2</auro-counter>
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
                <auro-counter>Counter1</auro-counter>
                <auro-counter>Counter2</auro-counter>
        </auro-counter-group>
    `);

    expect(el.counters.length).to.equal(2);
  });

  it('attaches input event listeners to all auro-counter elements within the dropdown', async () => {
    const el = await fixture(html`
        <auro-counter-group isDropdown>
                <auro-counter>Counter1</auro-counter>
                <auro-counter>Counter2</auro-counter>
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

describe('auro-counter-group: rendering logic', () => {

  it('handles empty counter group correctly', async () => {
    const el = await fixture(html`
          <auro-counter-group isDropdown>
            <div slot="valueText">Value</div>
          </auro-counter-group>
        `);
    await elementUpdated(el);
    expect(el.counters.length).to.equal(0);
  });

  // against a11y
  // it('handles counters with empty labels correctly', async () => {
  //   const el = await fixture(html`
  //         <auro-counter-group isDropdown>
  //           <div slot="valueText">Value</div>
  //           <auro-counter value="2"></auro-counter>
  //           <auro-counter value="3"></auro-counter>
  //         </auro-counter-group>
  //       `);
  //   await elementUpdated(el);
  //   expect(el.counters.length).to.equal(2);
  // });

  // against a11y
  // it('handles mix of labeled and unlabeled counters correctly', async () => {
  //   const el = await fixture(html`
  //         <auro-counter-group isDropdown>
  //           <div slot="valueText">Value</div>
  //           <auro-counter value="2">Labeled</auro-counter>
  //           <auro-counter value="3"></auro-counter>
  //           <auro-counter value="0">Zero Value</auro-counter>
  //         </auro-counter-group>
  //       `);
  //   await elementUpdated(el);
  //   expect(el.counters.length).to.equal(3);
  // });

  it('handles counters with zero values correctly', async () => {
    const el = await fixture(html`
          <auro-counter-group isDropdown>
            <div slot="valueText">Value</div>
            <auro-counter value="0">Zero Counter</auro-counter>
            <auro-counter value="0">Another Zero</auro-counter>
          </auro-counter-group>
        `);
    await elementUpdated(el);
    expect(el.counters.length).to.equal(2);
    expect(el.counters[0].value).to.equal(0);
    expect(el.counters[1].value).to.equal(0);
  });

  it('renders the correct value text in the dropdown trigger slot', async () => {
    const el = await fixture(html`
            <auro-counter-group isDropdown>
                <div slot="valueText">Value</div>
                <auro-counter value="2">counter1</auro-counter>
                <auro-counter value="3">counter2</auro-counter>
            </auro-counter-group>
        `);

    await elementUpdated(el);

    const triggerSlot = el.shadowRoot.querySelector('div[slot="trigger"] slot[name="valueText"]');

    expect(triggerSlot.assignedNodes()[0].textContent.trim()).to.equal('Value');
  });

  it('renders the correct label in the dropdown label slot', async () => {
    const el = await fixture(html`
            <auro-counter-group isDropdown>
                <span slot="label">Counter Group Label</span>
                <auro-counter value="2">counter1</auro-counter>
                <auro-counter value="3">counter2</auro-counter>
            </auro-counter-group>
        `);

    await elementUpdated(el);

    const labelSlot = el.shadowRoot.querySelector('slot[name="label"]');
    const labelSpan = labelSlot.assignedNodes()[0];
    expect(labelSpan.tagName).to.equal('SPAN');
    expect(labelSpan.textContent.trim()).to.equal('Counter Group Label');
  });

  it('renders the correct help text in the dropdown helpText slot', async () => {
    const el = await fixture(html`
            <auro-counter-group isDropdown>
                <span slot="helpText">Help Text</span>
                <auro-counter value="2">counter1</auro-counter>
                <auro-counter value="3">counter2</auro-counter>
            </auro-counter-group>
        `);

    await elementUpdated(el);

    const helpTextSlot = el.shadowRoot.querySelector('div[slot="helpText"] slot[name="helpText"]');
    expect(helpTextSlot.assignedNodes()[0].textContent.trim()).to.equal('Help Text');
  });

});

describe('auro-counter-group: keyboard navigation', () => {
  it('should increment/decrement values with arrow keys', async () => {
    const el = await fixture(html`
      <auro-counter-group isDropdown>
        <auro-counter value="2">Counter 1</auro-counter>
        <auro-counter value="3">Counter 2</auro-counter>
      </auro-counter-group>
    `);

    // Open dropdown
    el.dropdown.show();
    await elementUpdated(el);

    const [firstCounter] = el.counters;
    firstCounter.focus();

    // Test arrow up
    firstCounter.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    await elementUpdated(el);
    expect(firstCounter.value).to.equal(3);

    // Test arrow down
    firstCounter.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await elementUpdated(el);
    expect(firstCounter.value).to.equal(2);
  });

  // it.skip('should cycle focus through interactive elements with tab', async () => {
  //   const el = await fixture(html`
  //     <auro-counter-group isDropdown>
  //       <auro-counter value="2">Counter 1</auro-counter>
  //       <auro-counter value="3">Counter 2</auro-counter>
  //     </auro-counter-group>
  //   `);

  //   // Ensure dropdown is fully rendered
  //   el.dropdown.show();
  //   await elementUpdated(el);

  //   // Verify counters exist
  //   expect(el.counters.length).to.equal(2);

  //   // Focus first counter and verify
  //   const firstCounter = el.counters[0];
  //   const secondCounter = el.counters[1];
  //   firstCounter.focus();
  //   await elementUpdated(el);
  //   expect(document.activeElement).to.equal(firstCounter);

  //   // Tab to second counter
  //   const tabEvent = new KeyboardEvent('keydown', {
  //     key: 'Tab',
  //     bubbles: true,
  //     cancelable: true
  //   });
  //   firstCounter.dispatchEvent(tabEvent);
  //   await elementUpdated(el);
  //   expect(document.activeElement).to.equal(secondCounter);

  //   // Shift+Tab back to first counter
  //   const shiftTabEvent = new KeyboardEvent('keydown', {
  //     key: 'Tab',
  //     shiftKey: true,
  //     bubbles: true,
  //     cancelable: true
  //   });
  //   secondCounter.dispatchEvent(shiftTabEvent);
  //   await elementUpdated(el);
  //   expect(document.activeElement).to.equal(firstCounter);
  // });

  it('should close dropdown when pressing Escape', async () => {
    const el = await fixture(html`
      <auro-counter-group isDropdown>
        <auro-counter value="2">Counter 1</auro-counter>
        <auro-counter value="3">Counter 2</auro-counter>
      </auro-counter-group>
    `);

    // Open dropdown
    el.dropdown.show();
    await elementUpdated(el);
    expect(el.dropdown.isPopoverVisible).to.be.true;

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await elementUpdated(el);
    expect(el.dropdown.isPopoverVisible).to.be.false;
  });
});

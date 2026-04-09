/* eslint-disable no-undef, no-magic-numbers, max-lines, no-unused-expressions, prefer-destructuring */

import { fixture, html, expect, elementUpdated } from '@open-wc/testing';
import { useAccessibleIt } from "@aurodesignsystem/auro-library/scripts/test-plugin/iterateWithA11Check.mjs";
import '@aurodesignsystem/auro-dialog';
import '@aurodesignsystem/auro-drawer';
import '../src/registered.js';

// Save original `it` before useAccessibleIt replaces it, so tests that
// involve third-party components with pre-existing a11y issues (e.g.,
// auro-drawer's missing aria-dialog-name) can opt out of the automatic check.
const rawIt = it;

useAccessibleIt();
describe('auro-counter-group', () => {
  describe('Rendering', () => {
    // Add missing tests

    it('should render the correct label in the dropdown label slot', async () => {
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

    it('should render the correct help text in the dropdown helpText slot', async () => {
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

  describe('User Stories', () => {
    // Add missing tests

    it('should handle an empty counter group without errors', async () => {
      const el = await fixture(html`
            <auro-counter-group isDropdown>
              <div slot="valueText">Value</div>
            </auro-counter-group>
          `);
      await elementUpdated(el);
      expect(el.counters.length).to.equal(0);
    });

    it('should handle counters with zero values correctly', async () => {
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

    it('should render the correct value text in the dropdown trigger slot', async () => {
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

    describe('auro-counter-group: updateValue', () => {
      it('should update the value property with the correct values from counters', async () => {
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

      it('should update the total property with the sum of counter values', async () => {
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

      it('should disable increment button when total is at or above max', async () => {
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

      it('should disable decrement button when total is at or below min', async () => {
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

      it('should not disable buttons when total is within min and max range', async () => {
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

    it('should update the counters property with all auro-counter elements within the dropdown', async () => {
      const el = await fixture(html`
          <auro-counter-group isDropdown>
                  <auro-counter>Counter1</auro-counter>
                  <auro-counter>Counter2</auro-counter>
          </auro-counter-group>
      `);

      expect(el.counters.length).to.equal(2);
    });

    it('should attach input event listeners to all auro-counter elements within the dropdown', async () => {
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

    it('should not attach listeners to non-auro-counter elements within the dropdown', async () => {
      const el = await fixture(html`
          <auro-counter-group isDropdown>
                  <auro-counter></auro-counter>
                  <div></div>
          </auro-counter-group>
      `);

      expect(el.counters.length).to.equal(1);
    });

    it('should update the counters property with all auro-counter elements', async () => {
      const el = await fixture(html`
              <auro-counter-group>
                  <auro-counter>Counter1</auro-counter>
                  <auro-counter>Counter2</auro-counter>
              </auro-counter-group>
          `);

      el.configureCounters();

      expect(el.counters.length).to.equal(2);
    });

    it('should not attach listeners to non-auro-counter elements', async () => {
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

  describe('Properties', () => {
    describe('appearance', () => {
      // add tests for this property
    });

    describe('autoPlacement', () => {
      // add tests for this property
    });

    describe('error', () => {
      // add tests for this property
    });

    describe('fullscreenBreakpoint', () => {
      // add tests for this property
    });

    describe('isDropdown', () => {
      // add tests for this property
    });

    describe('largeFullscreenHeadline', () => {
      // add tests for this property
    });

    describe('layout', () => {
      // add tests for this property
    });

    describe('matchWidth', () => {
      // add tests for this property
    });

    describe('max', () => {
      // add tests for this property
    });

    describe('min', () => {
      // add tests for this property
    });

    describe('noFlip', () => {
      // add tests for this property
    });

    describe('offset', () => {
      // add tests for this property
    });

    describe('onDark', () => {
      // add tests for this property
    });

    describe('placement', () => {
      // add tests for this property
    });

    describe('shift', () => {
      // add tests for this property
    });

    describe('total', () => {
      // add tests for this property
    });

    describe('validity', () => {
      // add tests for this property
    });

    describe('value', () => {
      // add tests for this property
    });
  });

  describe('Slots', () => {
    describe('default', () => {
      // add tests for this slot
    });

    describe('ariaLabel.bib.close', () => {
      // add tests for this slot
    });

    describe('bib.fullscreen.headline', () => {
      // add tests for this slot
    });

    describe('bib.fullscreen.footer', () => {
      // add tests for this slot
    });

    describe('label', () => {
      // add tests for this slot
    });

    describe('valueText', () => {
      // add tests for this slot
    });

    describe('helpText', () => {
      // add tests for this slot
    });
  });

  describe('Public Functions', () => {
    describe('register', () => {
      // TODO: test needs to be added
    });

    describe('hideBib', () => {
      // TODO: test needs to be added
    });

    describe('showBib', () => {
      // TODO: test needs to be added
    });

    describe('validate', () => {
      // TODO: test needs to be added
    });
  });

  describe('Private Functions', () => {
    // No private function tests
  });

  describe('A11Y', () => {
    // Add missing tests


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

  });

  describe('Mouse Behavior', () => {
    describe('Click', () => {
      it('should increment the counter value when increment button is clicked', async () => {
        const el = await fixture(html`
          <auro-counter-group isDropdown>
            <auro-counter value="2">Counter 1</auro-counter>
            <auro-counter value="3">Counter 2</auro-counter>
          </auro-counter-group>
        `);

        el.dropdown.show();
        await elementUpdated(el);

        const [firstCounter] = el.counters;
        const incrementBtn = firstCounter.shadowRoot.querySelector('[part="controlPlus"]');

        incrementBtn.click();
        await elementUpdated(el);
        expect(firstCounter.value).to.equal(3);
      });

      it('should decrement the counter value when decrement button is clicked', async () => {
        const el = await fixture(html`
          <auro-counter-group isDropdown>
            <auro-counter value="2">Counter 1</auro-counter>
            <auro-counter value="3">Counter 2</auro-counter>
          </auro-counter-group>
        `);

        el.dropdown.show();
        await elementUpdated(el);

        const [firstCounter] = el.counters;
        const decrementBtn = firstCounter.shadowRoot.querySelector('[part="controlMinus"]');

        decrementBtn.click();
        await elementUpdated(el);
        expect(firstCounter.value).to.equal(1);
      });
    });
  });

  describe('Keyboard Behavior', () => {

    describe('ArrowUp', () => {
      it('should increment the counter value', async () => {
        const el = await fixture(html`
          <auro-counter-group isDropdown>
            <auro-counter value="2">Counter 1</auro-counter>
            <auro-counter value="3">Counter 2</auro-counter>
          </auro-counter-group>
        `);

        el.dropdown.show();
        await elementUpdated(el);

        const [firstCounter] = el.counters;
        firstCounter.focus();

        firstCounter.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
        await elementUpdated(el);
        expect(firstCounter.value).to.equal(3);
      });
    });

    describe('ArrowDown', () => {
      it('should decrement the counter value', async () => {
        const el = await fixture(html`
          <auro-counter-group isDropdown>
            <auro-counter value="2">Counter 1</auro-counter>
            <auro-counter value="3">Counter 2</auro-counter>
          </auro-counter-group>
        `);

        el.dropdown.show();
        await elementUpdated(el);

        const [firstCounter] = el.counters;
        firstCounter.focus();

        firstCounter.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        await elementUpdated(el);
        expect(firstCounter.value).to.equal(1);
      });
    });

    describe('Escape', () => {
      it('should close the dropdown', async () => {
        const el = await fixture(html`
          <auro-counter-group isDropdown>
            <auro-counter value="2">Counter 1</auro-counter>
            <auro-counter value="3">Counter 2</auro-counter>
          </auro-counter-group>
        `);

        el.dropdown.show();
        await elementUpdated(el);
        expect(el.dropdown.isPopoverVisible).to.be.true;

        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        await elementUpdated(el);
        expect(el.dropdown.isPopoverVisible).to.be.false;
      });

      it('should close the counter-group dropdown without closing a parent auro-dialog', async () => {
        const dialog = await fixture(html`
          <auro-dialog open>
            <span slot="header">Counter in Dialog</span>
            <div slot="content">
              <auro-counter-group isDropdown>
                <auro-counter value="2">Counter 1</auro-counter>
                <auro-counter value="3">Counter 2</auro-counter>
              </auro-counter-group>
            </div>
          </auro-dialog>
        `);
        await elementUpdated(dialog);

        const el = dialog.querySelector('auro-counter-group');
        await elementUpdated(el);

        el.dropdown.show();
        await elementUpdated(el);
        expect(el.dropdown.isPopoverVisible).to.be.true;

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, composed: true }));
        await elementUpdated(el);

        expect(el.dropdown.isPopoverVisible).to.be.false;
        expect(dialog.hasAttribute('open')).to.be.true;
      });

      // Uses rawIt to skip automatic a11y check — auro-drawer has a
      // pre-existing aria-dialog-name violation on its internal bib element.
      rawIt('should close the counter-group dropdown without closing a parent auro-drawer', async () => {
        const drawer = await fixture(html`
          <auro-drawer open aria-label="Counter in Drawer">
            <span slot="header">Counter in Drawer</span>
            <div slot="content">
              <auro-counter-group isDropdown>
                <auro-counter value="2">Counter 1</auro-counter>
                <auro-counter value="3">Counter 2</auro-counter>
              </auro-counter-group>
            </div>
          </auro-drawer>
        `);
        await elementUpdated(drawer);

        const el = drawer.querySelector('auro-counter-group');
        await elementUpdated(el);

        el.dropdown.show();
        await elementUpdated(el);
        expect(el.dropdown.isPopoverVisible).to.be.true;

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, composed: true }));
        await elementUpdated(el);

        expect(el.dropdown.isPopoverVisible).to.be.false;
        expect(drawer.hasAttribute('open')).to.be.true;
      });
    });

    describe('Tab', () => {
      it('should not close the dropdown while the bib is open', async () => {
        const el = await fixture(html`
          <auro-counter-group isDropdown>
            <auro-counter value="2">Counter 1</auro-counter>
            <auro-counter value="3">Counter 2</auro-counter>
          </auro-counter-group>
        `);

        el.dropdown.show();
        await elementUpdated(el);
        expect(el.dropdown.isPopoverVisible).to.be.true;

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true }));
        await elementUpdated(el);

        expect(el.dropdown.isPopoverVisible).to.be.true;
      });
    });
  });
});

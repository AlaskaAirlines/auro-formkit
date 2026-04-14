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
    it('should be defined as a custom element', async () => {
      const el = await Boolean(customElements.get('auro-counter-group'));
      await expect(el).to.be.true;
    });

    it('should be successfully created in the document', async () => {
      const el = document.createElement('auro-counter-group');
      await expect(el.localName).to.equal('auro-counter-group');
    });

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
      it('should default to default appearance', async () => {
        const el = await fixture(html`
          <auro-counter-group>
            <auro-counter>Counter</auro-counter>
          </auro-counter-group>
        `);
        await expect(el.appearance).to.equal('default');
      });

      it('should reflect the appearance attribute', async () => {
        const el = await fixture(html`
          <auro-counter-group appearance="inverse">
            <auro-counter>Counter</auro-counter>
          </auro-counter-group>
        `);
        await expect(el.getAttribute('appearance')).to.equal('inverse');
      });
    });

    describe('autoPlacement', () => {
      it('should default to false', async () => {
        const el = await fixture(html`
          <auro-counter-group>
            <auro-counter>Counter</auro-counter>
          </auro-counter-group>
        `);
        await expect(el.autoPlacement).to.be.false;
      });
    });

    describe('error', () => {
      it('should default to undefined', async () => {
        const el = await fixture(html`
          <auro-counter-group>
            <auro-counter>Counter</auro-counter>
          </auro-counter-group>
        `);
        await expect(el.error).to.be.undefined;
      });
    });

    describe('fullscreenBreakpoint', () => {
      it('should default to sm', async () => {
        const el = await fixture(html`
          <auro-counter-group isDropdown>
            <auro-counter>Counter</auro-counter>
          </auro-counter-group>
        `);
        await expect(el.fullscreenBreakpoint).to.equal('sm');
      });
    });

    describe('isDropdown', () => {
      it('should default to false', async () => {
        const el = await fixture(html`
          <auro-counter-group>
            <auro-counter>Counter</auro-counter>
          </auro-counter-group>
        `);
        await expect(el.isDropdown).to.be.false;
      });

      it('should render a dropdown when set to true', async () => {
        const el = await fixture(html`
          <auro-counter-group isDropdown>
            <auro-counter>Counter</auro-counter>
          </auro-counter-group>
        `);
        await expect(el.isDropdown).to.be.true;
        await expect(el.dropdown).to.exist;
      });
    });

    describe('largeFullscreenHeadline', () => {
      it('should default to false', async () => {
        const el = await fixture(html`
          <auro-counter-group isDropdown>
            <auro-counter>Counter</auro-counter>
          </auro-counter-group>
        `);
        await expect(el.largeFullscreenHeadline).to.be.false;
      });
    });

    describe('layout', () => {
      it('should default to classic', async () => {
        const el = await fixture(html`
          <auro-counter-group isDropdown>
            <auro-counter>Counter</auro-counter>
          </auro-counter-group>
        `);
        await expect(el.layout).to.equal('classic');
      });

      it('should reflect snowflake layout', async () => {
        const el = await fixture(html`
          <auro-counter-group isDropdown layout="snowflake">
            <auro-counter>Counter</auro-counter>
          </auro-counter-group>
        `);
        await expect(el.getAttribute('layout')).to.equal('snowflake');
      });
    });

    describe('matchWidth', () => {
      it('should default to false', async () => {
        const el = await fixture(html`
          <auro-counter-group isDropdown>
            <auro-counter>Counter</auro-counter>
          </auro-counter-group>
        `);
        await expect(el.matchWidth).to.be.false;
      });
    });

    describe('max', () => {
      it('should default to undefined', async () => {
        const el = await fixture(html`
          <auro-counter-group>
            <auro-counter>Counter</auro-counter>
          </auro-counter-group>
        `);
        await expect(el.max).to.be.undefined;
      });

      it('should disable increment on all counters when group total reaches max', async () => {
        const el = await fixture(html`
          <auro-counter-group max="5">
            <auro-counter value="3">Counter 1</auro-counter>
            <auro-counter value="2">Counter 2</auro-counter>
          </auro-counter-group>
        `);
        el.configureCounters();
        el.updateValue();
        el.counters.forEach((counter) => {
          expect(counter.disableMax).to.be.true;
        });
      });
    });

    describe('min', () => {
      it('should default to undefined', async () => {
        const el = await fixture(html`
          <auro-counter-group>
            <auro-counter>Counter</auro-counter>
          </auro-counter-group>
        `);
        await expect(el.min).to.be.undefined;
      });

      it('should disable decrement on all counters when group total reaches min', async () => {
        const el = await fixture(html`
          <auro-counter-group min="5">
            <auro-counter value="3">Counter 1</auro-counter>
            <auro-counter value="2">Counter 2</auro-counter>
          </auro-counter-group>
        `);
        el.configureCounters();
        el.updateValue();
        el.counters.forEach((counter) => {
          expect(counter.disableMin).to.be.true;
        });
      });
    });

    describe('noFlip', () => {
      it('should default to false', async () => {
        const el = await fixture(html`
          <auro-counter-group isDropdown>
            <auro-counter>Counter</auro-counter>
          </auro-counter-group>
        `);
        await expect(el.noFlip).to.be.false;
      });
    });

    describe('offset', () => {
      it('should not have offset attribute by default', async () => {
        const el = await fixture(html`
          <auro-counter-group isDropdown>
            <auro-counter>Counter</auro-counter>
          </auro-counter-group>
        `);
        await expect(el.hasAttribute('offset')).to.be.false;
      });
    });

    describe('onDark', () => {
      it('should default to false', async () => {
        const el = await fixture(html`
          <auro-counter-group>
            <auro-counter>Counter</auro-counter>
          </auro-counter-group>
        `);
        await expect(el.onDark).to.be.false;
      });
    });

    describe('placement', () => {
      it('should default to bottom-start', async () => {
        const el = await fixture(html`
          <auro-counter-group isDropdown>
            <auro-counter>Counter</auro-counter>
          </auro-counter-group>
        `);
        await expect(el.placement).to.equal('bottom-start');
      });
    });

    describe('shift', () => {
      it('should default to false', async () => {
        const el = await fixture(html`
          <auro-counter-group isDropdown>
            <auro-counter>Counter</auro-counter>
          </auro-counter-group>
        `);
        await expect(el.shift).to.be.false;
      });
    });

    describe('total', () => {
      it('should calculate total from child counter values', async () => {
        const el = await fixture(html`
          <auro-counter-group>
            <auro-counter value="2">Counter 1</auro-counter>
            <auro-counter value="3">Counter 2</auro-counter>
          </auro-counter-group>
        `);
        el.configureCounters();
        el.updateValue();
        await expect(el.total).to.equal(5);
      });
    });

    describe('validity', () => {
      it('should be valid after initialization', async () => {
        const el = await fixture(html`
          <auro-counter-group>
            <auro-counter>Counter</auro-counter>
          </auro-counter-group>
        `);
        await elementUpdated(el);
        await expect(el.validity).to.equal('valid');
      });
    });

    describe('value', () => {
      it('should aggregate individual counter values', async () => {
        const el = await fixture(html`
          <auro-counter-group>
            <auro-counter name="adults" value="2">Adults</auro-counter>
            <auro-counter name="children" value="1">Children</auro-counter>
          </auro-counter-group>
        `);
        el.configureCounters();
        el.updateValue();
        await expect(el.value).to.deep.equal({ adults: 2, children: 1 });
      });
    });
  });

  describe('Slots', () => {
    describe('default', () => {
      it('should render auro-counter elements in the default slot', async () => {
        const el = await fixture(html`
          <auro-counter-group>
            <auro-counter>Counter 1</auro-counter>
            <auro-counter>Counter 2</auro-counter>
          </auro-counter-group>
        `);
        const counters = el.querySelectorAll('auro-counter');
        await expect(counters.length).to.equal(2);
      });
    });

    describe('ariaLabel.bib.close', () => {
      it('should render content in the ariaLabel.bib.close slot', async () => {
        const el = await fixture(html`
          <auro-counter-group isDropdown>
            <span slot="ariaLabel.bib.close">Close menu</span>
            <auro-counter>Counter</auro-counter>
          </auro-counter-group>
        `);
        const slotContent = el.querySelector('[slot="ariaLabel.bib.close"]');
        await expect(slotContent).to.exist;
      });
    });

    describe('bib.fullscreen.headline', () => {
      it('should render content in the bib.fullscreen.headline slot', async () => {
        const el = await fixture(html`
          <auro-counter-group isDropdown>
            <span slot="bib.fullscreen.headline">Travelers</span>
            <auro-counter>Counter</auro-counter>
          </auro-counter-group>
        `);
        const slotContent = el.querySelector('[slot="bib.fullscreen.headline"]');
        await expect(slotContent).to.exist;
      });
    });

    describe('bib.fullscreen.footer', () => {
      it('should render content in the bib.fullscreen.footer slot', async () => {
        const el = await fixture(html`
          <auro-counter-group isDropdown>
            <span slot="bib.fullscreen.footer">Footer text</span>
            <auro-counter>Counter</auro-counter>
          </auro-counter-group>
        `);
        const slotContent = el.querySelector('[slot="bib.fullscreen.footer"]');
        await expect(slotContent).to.exist;
      });
    });

    describe('label', () => {
      it('should render content in the label slot', async () => {
        const el = await fixture(html`
          <auro-counter-group isDropdown>
            <span slot="label">Travelers</span>
            <auro-counter>Counter</auro-counter>
          </auro-counter-group>
        `);
        const slotContent = el.querySelector('[slot="label"]');
        await expect(slotContent).to.exist;
      });
    });

    describe('valueText', () => {
      it('should render content in the valueText slot', async () => {
        const el = await fixture(html`
          <auro-counter-group isDropdown>
            <div slot="valueText">5 travelers</div>
            <auro-counter>Counter</auro-counter>
          </auro-counter-group>
        `);
        const slotContent = el.querySelector('[slot="valueText"]');
        await expect(slotContent).to.exist;
      });
    });

    describe('helpText', () => {
      it('should render content in the helpText slot', async () => {
        const el = await fixture(html`
          <auro-counter-group isDropdown>
            <span slot="helpText">Select number of travelers</span>
            <auro-counter>Counter</auro-counter>
          </auro-counter-group>
        `);
        const slotContent = el.querySelector('[slot="helpText"]');
        await expect(slotContent).to.exist;
      });
    });
  });

  describe('Public Functions', () => {
    describe('register', () => {
      it('should register the element as a custom element', async () => {
        const el = await Boolean(customElements.get('auro-counter-group'));
        await expect(el).to.be.true;
      });
    });

    describe('hideBib', () => {
      it('should close the dropdown when called', async () => {
        const el = await fixture(html`
          <auro-counter-group isDropdown>
            <auro-counter>Counter</auro-counter>
          </auro-counter-group>
        `);
        el.dropdown.show();
        await elementUpdated(el);
        await expect(el.dropdown.isPopoverVisible).to.be.true;

        el.hideBib();
        await elementUpdated(el);
        await expect(el.dropdown.isPopoverVisible).to.be.false;
      });
    });

    describe('showBib', () => {
      it('should open the dropdown when called', async () => {
        const el = await fixture(html`
          <auro-counter-group isDropdown>
            <auro-counter>Counter</auro-counter>
          </auro-counter-group>
        `);
        await expect(el.dropdown.isPopoverVisible).to.be.false;

        el.showBib();
        await elementUpdated(el);
        await expect(el.dropdown.isPopoverVisible).to.be.true;
      });
    });

    describe('validate', () => {
      it('should run validation on the group', async () => {
        const el = await fixture(html`
          <auro-counter-group>
            <auro-counter>Counter</auro-counter>
          </auro-counter-group>
        `);
        await elementUpdated(el);
        el.validate(true);
        await elementUpdated(el);
        await expect(el.validity).to.equal('valid');
      });
    });
  });

  describe('Events', () => {
    describe('input', () => {
      it('should fire input event when a child counter value changes', async () => {
        const el = await fixture(html`
          <auro-counter-group>
            <auro-counter value="2">Counter 1</auro-counter>
            <auro-counter value="3">Counter 2</auro-counter>
          </auro-counter-group>
        `);
        el.configureCounters();

        let inputFired = false;
        el.addEventListener('input', () => { inputFired = true; });

        el.counters[0].increment();
        await elementUpdated(el);

        await expect(inputFired).to.be.true;
      });
    });
  });

  describe('Private Functions', () => {
    // No private function tests
  });

  describe('A11Y', () => {


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

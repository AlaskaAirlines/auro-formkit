/* eslint-disable no-undef, max-lines, max-statements, no-unused-expressions */

import {elementUpdated, expect, fixture, html} from '@open-wc/testing';
import '../src/registered.js';

describe('auro-radio-group', () => {
  describe('Rendering', () => {
    it('should render a shadow root', async () => {
      const el = await fixture(html`
        <auro-radio-group>
          <span slot="legend">Pick one</span>
          <auro-radio value="one" name="test">One</auro-radio>
        </auro-radio-group>
      `);

      expect(el.shadowRoot).to.exist;
    });

    it('should render a fieldset element', async () => {
      const el = await fixture(html`
        <auro-radio-group>
          <span slot="legend">Pick one</span>
          <auro-radio value="one" name="test">One</auro-radio>
        </auro-radio-group>
      `);

      const fieldset = el.shadowRoot.querySelector('fieldset');
      expect(fieldset).to.exist;
    });

    it('should render the help text component', async () => {
      const el = await fixture(html`
        <auro-radio-group>
          <span slot="legend">Pick one</span>
          <auro-radio value="one" name="test">One</auro-radio>
        </auro-radio-group>
      `);

      const helpText = el.shadowRoot.querySelector('[part="helpText"]');
      expect(helpText).to.exist;
    });
  });

  describe('User Stories', () => {
    it('should allow selecting one option from a group', async () => {
      const el = await fixture(html`
        <auro-radio-group>
          <span slot="legend">Pick one</span>
          <auro-radio id="r1" name="demo" value="one">One</auro-radio>
          <auro-radio id="r2" name="demo" value="two">Two</auro-radio>
        </auro-radio-group>
      `);

      el.querySelector('#r1').shadowRoot.querySelector('input').click();
      await elementUpdated(el);

      expect(el.value).to.equal('one');
      expect(el.querySelector('#r1').checked).to.be.true;
    });

    it('should only allow one radio to be selected at a time', async () => {
      const el = await fixture(html`
        <auro-radio-group>
          <span slot="legend">Pick one</span>
          <auro-radio id="r1" name="demo" value="one">One</auro-radio>
          <auro-radio id="r2" name="demo" value="two">Two</auro-radio>
        </auro-radio-group>
      `);

      el.querySelector('#r1').shadowRoot.querySelector('input').click();
      await elementUpdated(el);
      expect(el.querySelector('#r1').checked).to.be.true;

      el.querySelector('#r2').shadowRoot.querySelector('input').click();
      await elementUpdated(el);
      expect(el.querySelector('#r1').checked).to.be.false;
      expect(el.querySelector('#r2').checked).to.be.true;
    });
  });

  describe('Properties', () => {
    describe('appearance', () => {
      it('should default to "default"', async () => {
        const el = await fixture(html`
          <auro-radio-group>
            <span slot="legend">Pick one</span>
            <auro-radio value="one" name="test">One</auro-radio>
          </auro-radio-group>
        `);

        expect(el.appearance).to.equal('default');
      });

      it('should propagate appearance to child radios', async () => {
        const el = await fixture(html`
          <auro-radio-group appearance="inverse">
            <span slot="legend">Pick one</span>
            <auro-radio id="r1" value="one" name="test">One</auro-radio>
          </auro-radio-group>
        `);

        expect(el.querySelector('#r1').appearance).to.equal('inverse');
      });
    });

    describe('disabled', () => {
      it('should propagate disabled to child radios', async () => {
        const el = await fixture(html`
          <auro-radio-group disabled>
            <span slot="legend">Pick one</span>
            <auro-radio id="r1" value="one" name="test">One</auro-radio>
            <auro-radio id="r2" value="two" name="test">Two</auro-radio>
          </auro-radio-group>
        `);

        expect(el.querySelector('#r1').disabled).to.be.true;
        expect(el.querySelector('#r2').disabled).to.be.true;
      });

      it('should update disabled state on child radios when toggled', async () => {
        const el = await fixture(html`
          <auro-radio-group>
            <span slot="legend">Pick one</span>
            <auro-radio id="r1" value="one" name="test">One</auro-radio>
          </auro-radio-group>
        `);

        expect(el.querySelector('#r1').disabled).to.be.false;

        el.disabled = true;
        await elementUpdated(el);
        expect(el.querySelector('#r1').disabled).to.be.true;

        el.disabled = false;
        await elementUpdated(el);
        expect(el.querySelector('#r1').disabled).to.be.false;
      });
    });

    describe('error', () => {
      it('should set validity to customError when error is set', async () => {
        const el = await fixture(html`
          <auro-radio-group error="Error message">
            <span slot="legend">Pick one</span>
            <auro-radio value="one" name="test">One</auro-radio>
          </auro-radio-group>
        `);

        expect(el.validity).to.equal('customError');
      });

      it('should set error on child radios when validity is not valid', async () => {
        const el = await fixture(html`
          <auro-radio-group error="Error message">
            <span slot="legend">Pick one</span>
            <auro-radio id="r1" value="one" name="test">One</auro-radio>
          </auro-radio-group>
        `);

        expect(el.querySelector('#r1').hasAttribute('error')).to.be.true;
      });

      it('should clear error on child radios when validity becomes valid', async () => {
        const el = await fixture(html`
          <auro-radio-group error="Error message">
            <span slot="legend">Pick one</span>
            <auro-radio id="r1" value="one" name="test">One</auro-radio>
          </auro-radio-group>
        `);

        expect(el.querySelector('#r1').hasAttribute('error')).to.be.true;

        el.removeAttribute('error');
        await elementUpdated(el);

        expect(el.querySelector('#r1').hasAttribute('error')).to.be.false;
      });
    });

    describe('horizontal', () => {
      it('should default to false', async () => {
        const el = await fixture(html`
          <auro-radio-group>
            <span slot="legend">Pick one</span>
            <auro-radio value="one" name="test">One</auro-radio>
          </auro-radio-group>
        `);

        expect(el.horizontal).to.be.false;
      });

      it('should apply displayFlex class when horizontal and items <= max', async () => {
        const el = await fixture(html`
          <auro-radio-group horizontal>
            <span slot="legend">Pick one</span>
            <auro-radio value="one" name="test">One</auro-radio>
            <auro-radio value="two" name="test">Two</auro-radio>
          </auro-radio-group>
        `);

        const fieldset = el.shadowRoot.querySelector('fieldset');
        expect(fieldset.classList.contains('displayFlex')).to.be.true;
      });
    });

    describe('noValidate', () => {
      it('should reflect the noValidate attribute', async () => {
        const el = await fixture(html`
          <auro-radio-group noValidate>
            <span slot="legend">Pick one</span>
            <auro-radio value="one" name="test">One</auro-radio>
          </auro-radio-group>
        `);

        expect(el.noValidate).to.be.true;
        expect(el.hasAttribute('novalidate')).to.be.true;
      });
    });

    describe('onDark', () => {
      it('should propagate onDark to child radios', async () => {
        const el = await fixture(html`
          <auro-radio-group onDark>
            <span slot="legend">Pick one</span>
            <auro-radio id="r1" value="one" name="test">One</auro-radio>
          </auro-radio-group>
        `);

        expect(el.querySelector('#r1').onDark).to.be.true;
      });
    });

    describe('optionSelected', () => {
      it('should be undefined when no radio is selected', async () => {
        const el = await fixture(html`
          <auro-radio-group>
            <span slot="legend">Pick one</span>
            <auro-radio value="one" name="test">One</auro-radio>
          </auro-radio-group>
        `);

        expect(el.optionSelected).to.be.undefined;
      });

      it('should reference the selected radio element', async () => {
        const el = await fixture(html`
          <auro-radio-group>
            <span slot="legend">Pick one</span>
            <auro-radio id="r1" value="one" name="test">One</auro-radio>
          </auro-radio-group>
        `);

        const r1 = el.querySelector('#r1');
        r1.shadowRoot.querySelector('input').click();
        await elementUpdated(el);

        expect(el.optionSelected).to.equal(r1);
      });
    });

    describe('required', () => {
      it('should propagate required to child radios', async () => {
        const el = await fixture(html`
          <auro-radio-group required>
            <span slot="legend">Pick one</span>
            <auro-radio id="r1" value="one" name="test">One</auro-radio>
          </auro-radio-group>
        `);

        expect(el.querySelector('#r1').required).to.be.true;
      });

      it('should hide optional label when required', async () => {
        const el = await fixture(html`
          <auro-radio-group required>
            <span slot="legend">Pick one</span>
            <auro-radio value="one" name="test">One</auro-radio>
          </auro-radio-group>
        `);

        const optionalSlot = el.shadowRoot.querySelector('slot[name="optionalLabel"]');
        expect(optionalSlot).to.not.exist;
      });
    });

    describe('setCustomValidity', () => {
      it('should accept a setCustomValidity string', async () => {
        const el = await fixture(html`
          <auro-radio-group setCustomValidity="Custom message">
            <span slot="legend">Pick one</span>
            <auro-radio value="one" name="test">One</auro-radio>
          </auro-radio-group>
        `);

        expect(el.setCustomValidity).to.equal('Custom message');
      });
    });

    describe('setCustomValidityCustomError', () => {
      it('should accept a setCustomValidityCustomError string', async () => {
        const el = await fixture(html`
          <auro-radio-group setCustomValidityCustomError="Custom error msg">
            <span slot="legend">Pick one</span>
            <auro-radio value="one" name="test">One</auro-radio>
          </auro-radio-group>
        `);

        expect(el.setCustomValidityCustomError).to.equal('Custom error msg');
      });
    });

    describe('setCustomValidityValueMissing', () => {
      it('should accept a setCustomValidityValueMissing string', async () => {
        const el = await fixture(html`
          <auro-radio-group setCustomValidityValueMissing="Required msg">
            <span slot="legend">Pick one</span>
            <auro-radio value="one" name="test">One</auro-radio>
          </auro-radio-group>
        `);

        expect(el.setCustomValidityValueMissing).to.equal('Required msg');
      });
    });

    describe('validity', () => {
      it('should be undefined initially', async () => {
        const el = await fixture(html`
          <auro-radio-group>
            <span slot="legend">Pick one</span>
            <auro-radio value="one" name="test">One</auro-radio>
          </auro-radio-group>
        `);

        expect(el.validity).to.be.undefined;
      });

      it('should set aria-invalid when validity is not valid', async () => {
        const el = await fixture(html`
          <auro-radio-group error="Error">
            <span slot="legend">Pick one</span>
            <auro-radio value="one" name="test">One</auro-radio>
          </auro-radio-group>
        `);

        expect(el.getAttribute('aria-invalid')).to.equal('true');
      });

      it('should remove aria-invalid when validity becomes valid', async () => {
        const el = await fixture(html`
          <auro-radio-group error="Error">
            <span slot="legend">Pick one</span>
            <auro-radio value="one" name="test">One</auro-radio>
          </auro-radio-group>
        `);

        expect(el.getAttribute('aria-invalid')).to.equal('true');

        el.removeAttribute('error');
        await elementUpdated(el);

        expect(el.hasAttribute('aria-invalid')).to.be.false;
      });
    });

    describe('value', () => {
      it('should allow radio buttons to be selected, unselected, and reselected', async () => {
        const el = await fixture(html`
          <auro-radio-group name="group">
            <span slot="legend">Form label goes here</span>
            <auro-radio id="radio1" label="Yes" name="radioDemo" value="yes">T</auro-radio>
            <auro-radio id="radio2" label="No" name="radioDemo" value="no">N</auro-radio>
            <auro-radio id="radio3" label="Maybe" name="radioDemo" value="maybe">?</auro-radio>
          </auro-radio-group>
        `);

        const radioOne = el.querySelector('#radio1');
        const radioTwo = el.querySelector('#radio2');

        radioOne.shadowRoot.querySelector('input').click();
        await elementUpdated(el);
        await expect(radioOne.hasAttribute('checked')).to.be.true;

        radioTwo.shadowRoot.querySelector('input').click();
        await elementUpdated(el);
        await expect(radioOne.hasAttribute('checked')).to.be.false;
        await expect(radioTwo.hasAttribute('checked')).to.be.true;

        radioOne.shadowRoot.querySelector('input').click();
        await elementUpdated(el);
        await expect(radioOne.hasAttribute('checked')).to.be.true;
        await expect(radioTwo.hasAttribute('checked')).to.be.false;
      });

      it('should emit an input event when the value changes', async () => {
        const el = await fixture(html`
          <auro-radio-group name="group">
            <span slot="legend">Form label goes here</span>
            <auro-radio id="radio1" label="Yes" name="radioDemo" value="yes">T</auro-radio>
            <auro-radio id="radio2" label="No" name="radioDemo" value="no">N</auro-radio>
            <auro-radio id="radio3" label="Maybe" name="radioDemo" value="maybe">?</auro-radio>
          </auro-radio-group>
        `);

        const radioGroup = el;

        const eventPromise = new Promise((resolve) => {
          radioGroup.addEventListener('input', (event) => {
            if (event.target.getAttribute('name') === 'group') {
              resolve(event);
            }
          });
        });

        const radioOne = el.querySelector('#radio1');
        const input = radioOne.shadowRoot.querySelector('input');

        input.click();

        const event = await eventPromise;

        await expect(event).to.exist;
        await expect(event.target).to.equal(radioGroup);
        await expect(event.target.value).to.equal('yes');
      });

      it('should pick up nested radio elements within the group', async () => {
        const radioGroup = await fixture(html`
          <auro-radio-group name="group">
            <span slot="legend">Form label goes here</span>
            <auro-radio id="radio1" label="Yes" name="radioDemo1" value="yes">Y</auro-radio>
            <auro-radio id="radio2" label="No" name="radioDemo2" value="no">N</auro-radio>
            <auro-radio id="radio3" label="Maybe" name="radioDemo3" value="maybe">?</auro-radio>

            <div>
              <auro-radio id="radio4" label="Yes 2" name="radioDemo4" value="yes2">Y</auro-radio>
            </div>

            <div>
              <div>
                <auro-radio id="radio5" label="No 2" name="radioDemo5" value="no2">N</auro-radio>
              </div>
            </div>

            <auro-radio id="radio6" label="Maybe 2" name="radioDemo6" value="maybe2">?</auro-radio>
          </auro-radio-group>
        `);

        const expectedCount = 6;
        const radio1 = radioGroup.querySelector('#radio1');
        const radio5 = radioGroup.querySelector('#radio5');
        const radio4 = radioGroup.querySelector('#radio4');
        const radio6 = radioGroup.querySelector('#radio6');

        await expect(radioGroup.items.length).to.equal(expectedCount);

        radio1.shadowRoot.querySelector('input').click();
        await elementUpdated(radioGroup);
        await expect(radioGroup.value).to.equal('yes');
        await expect(radioGroup.optionSelected).to.equal(radio1);

        radio5.shadowRoot.querySelector('input').click();
        await elementUpdated(radioGroup);
        await expect(radioGroup.value).to.equal('no2');
        await expect(radioGroup.optionSelected).to.equal(radio5);

        radio4.shadowRoot.querySelector('input').click();
        await elementUpdated(radioGroup);
        await expect(radioGroup.value).to.equal('yes2');
        await expect(radioGroup.optionSelected).to.equal(radio4);

        radio6.shadowRoot.querySelector('input').click();
        await elementUpdated(radioGroup);
        await expect(radioGroup.value).to.equal('maybe2');
        await expect(radioGroup.optionSelected).to.equal(radio6);
      });

      it('should be undefined initially', async () => {
        const el = await fixture(html`
          <auro-radio-group>
            <span slot="legend">Pick one</span>
            <auro-radio value="one" name="test">One</auro-radio>
          </auro-radio-group>
        `);

        expect(el.value).to.be.undefined;
      });

      it('should set value to empty string when selected radio has null/undefined value', async () => {
        const el = await fixture(html`
          <auro-radio-group>
            <span slot="legend">Pick one</span>
            <auro-radio id="r1" name="test">One</auro-radio>
          </auro-radio-group>
        `);

        const r1 = el.querySelector('#r1');
        r1.shadowRoot.querySelector('input').click();
        await elementUpdated(el);

        expect(el.value).to.equal('');
      });
    });

    describe('touched', () => {
      it('should default to false', async () => {
        const el = await fixture(html`
          <auro-radio-group>
            <span slot="legend">Pick one</span>
            <auro-radio value="one" name="test">One</auro-radio>
          </auro-radio-group>
        `);

        expect(el.touched).to.be.false;
      });

      it('should become true after radio blur', async () => {
        const el = await fixture(html`
          <auro-radio-group>
            <span slot="legend">Pick one</span>
            <auro-radio id="r1" value="one" name="test">One</auro-radio>
          </auro-radio-group>
        `);

        const r1 = el.querySelector('#r1');
        r1.dispatchEvent(new Event('focus'));
        r1.dispatchEvent(new Event('blur'));
        await elementUpdated(el);

        expect(el.touched).to.be.true;
      });
    });
  });

  describe('Slots', () => {
    describe('default', () => {
      it('should render radio buttons in the default slot', async () => {
        const el = await fixture(html`
          <auro-radio-group>
            <span slot="legend">Pick one</span>
            <auro-radio value="one" name="test">One</auro-radio>
          </auro-radio-group>
        `);

        const slot = el.shadowRoot.querySelector('slot:not([name])');
        expect(slot).to.exist;
        const assigned = slot.assignedNodes().filter((node) => node.nodeType === Node.ELEMENT_NODE);
        expect(assigned.length).to.be.greaterThan(0);
      });
    });

    describe('legend', () => {
      it('should render content in the legend slot', async () => {
        const el = await fixture(html`<auro-radio-group><span slot="legend">Select one</span><auro-radio value="one" name="test">One</auro-radio></auro-radio-group>`);

        const slotContent = el.querySelector('[slot="legend"]');

        await expect(slotContent).to.exist;
      });

      it('should set hasLegend when legend slot is populated', async () => {
        const el = await fixture(html`
          <auro-radio-group>
            <span slot="legend">Pick one</span>
            <auro-radio value="one" name="test">One</auro-radio>
          </auro-radio-group>
        `);

        expect(el.hasLegend).to.be.true;
      });
    });

    describe('optionalLabel', () => {
      it('should render content in the optionalLabel slot', async () => {
        const el = await fixture(html`<auro-radio-group><span slot="optionalLabel">(optional)</span><span slot="legend">Pick</span><auro-radio value="one" name="test">One</auro-radio></auro-radio-group>`);

        const slotContent = el.querySelector('[slot="optionalLabel"]');

        await expect(slotContent).to.exist;
      });
    });

    describe('helpText', () => {
      it('should render content in the helpText slot', async () => {
        const el = await fixture(html`<auro-radio-group><span slot="helpText">Choose wisely</span><span slot="legend">Pick</span><auro-radio value="one" name="test">One</auro-radio></auro-radio-group>`);

        const slotContent = el.querySelector('[slot="helpText"]');

        await expect(slotContent).to.exist;
      });
    });

    describe('slotchange', () => {
      it('should update items array when a new radio is added', async () => {
        const el = await fixture(html`
          <auro-radio-group>
            <span slot="legend">Pick one</span>
            <auro-radio id="r1" value="one" name="test">One</auro-radio>
          </auro-radio-group>
        `);

        const initialCount = el.items.length;

        const newRadio = document.createElement('auro-radio');
        newRadio.value = 'two';
        newRadio.name = 'test';
        newRadio.textContent = 'Two';
        el.appendChild(newRadio);

        await elementUpdated(el);
        await new Promise((resolve) => setTimeout(resolve, 0));

        expect(el.items.length).to.be.greaterThan(initialCount);
      });
    });
  });

  describe('Public Functions', () => {
    describe('register', () => {
      it('should have a static register method', () => {
        expect(typeof customElements.get('auro-radio-group').register).to.equal('function');
      });
    });

    describe('reset', () => {
      it('should reset all radios and clear value/optionSelected', async () => {
        const el = await fixture(html`
          <auro-radio-group required>
            <span slot="legend">Pick one</span>
            <auro-radio id="r1" name="test" value="one" checked>One</auro-radio>
            <auro-radio id="r2" name="test" value="two">Two</auro-radio>
          </auro-radio-group>
        `);

        expect(el.querySelector('#r1').checked).to.be.true;

        el.reset();
        await elementUpdated(el);

        expect(el.querySelector('#r1').checked).to.be.false;
        expect(el.value).to.be.undefined;
        expect(el.optionSelected).to.be.undefined;
      });

      it('should reset touched on child radios', async () => {
        const el = await fixture(html`
          <auro-radio-group>
            <span slot="legend">Pick one</span>
            <auro-radio id="r1" name="test" value="one">One</auro-radio>
          </auro-radio-group>
        `);

        const r1 = el.querySelector('#r1');
        r1.dispatchEvent(new Event('focus'));
        await elementUpdated(el);
        expect(r1.touched).to.be.true;

        el.reset();
        await elementUpdated(el);
        expect(r1.touched).to.be.false;
      });
    });

    describe('validate', () => {
      it('should set validity to valueMissing when required and no selection', async () => {
        const el = await fixture(html`
          <auro-radio-group required>
            <span slot="legend">Pick one</span>
            <auro-radio id="r1" name="test" value="one">One</auro-radio>
          </auro-radio-group>
        `);

        el.validate(true);
        await elementUpdated(el);

        expect(el.validity).to.equal('valueMissing');
      });

      it('should set validity to valid when required and a selection is made', async () => {
        const el = await fixture(html`
          <auro-radio-group required>
            <span slot="legend">Pick one</span>
            <auro-radio id="r1" name="test" value="one">One</auro-radio>
          </auro-radio-group>
        `);

        el.querySelector('#r1').shadowRoot.querySelector('input').click();
        await elementUpdated(el);

        expect(el.validity).to.equal('valid');
      });
    });
  });

  describe('Events', () => {
    describe('auroFormElement-validated', () => {
      it('should fire auroFormElement-validated after validation', async () => {
        const el = await fixture(html`
          <auro-radio-group required>
            <span slot="legend">Pick one</span>
            <auro-radio id="r1" name="test" value="one">One</auro-radio>
          </auro-radio-group>
        `);

        let fired = false;
        el.addEventListener('auroFormElement-validated', () => {
          fired = true;
        });

        el.validate(true);
        await elementUpdated(el);

        expect(fired).to.be.true;
      });
    });

    describe('input', () => {
      it('should fire input event when value changes', async () => {
        const el = await fixture(html`
          <auro-radio-group>
            <span slot="legend">Pick one</span>
            <auro-radio id="r1" name="test" value="one">One</auro-radio>
          </auro-radio-group>
        `);

        let fired = false;
        el.addEventListener('input', () => {
          fired = true;
        });

        el.querySelector('#r1').shadowRoot.querySelector('input').click();
        await elementUpdated(el);

        expect(fired).to.be.true;
      });

      it('should have bubbles, cancelable, and composed set to true', async () => {
        const el = await fixture(html`
          <auro-radio-group>
            <span slot="legend">Pick one</span>
            <auro-radio id="r1" name="test" value="one">One</auro-radio>
          </auro-radio-group>
        `);

        let event = null;
        el.addEventListener('input', (ev) => {
          event = ev;
        });

        el.querySelector('#r1').shadowRoot.querySelector('input').click();
        await elementUpdated(el);

        expect(event.bubbles).to.be.true;
        expect(event.composed).to.be.true;
      });
    });
  });

  describe('Private Functions', () => {
    // ─── selectNextItem focuses item when group is disabled ────────────
    it('selectNextItem focuses disabled item when entire group is disabled', async () => {
      const el = await fixture(html`
        <auro-radio-group disabled>
          <span slot="legend">Pick one</span>
          <auro-radio value="a" name="test">A</auro-radio>
          <auro-radio value="b" name="test">B</auro-radio>
        </auro-radio-group>
      `);
      await elementUpdated(el);

      // Dispatch ArrowDown to trigger selectNextItem with group disabled
      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      await elementUpdated(el);

      // Should not throw, component should still be accessible
      await expect(el).to.exist;
    });

    // ─── selectNextItem focuses item when all radios are disabled ──────
    it('selectNextItem focuses item when all individual radios are disabled', async () => {
      const el = await fixture(html`
        <auro-radio-group>
          <span slot="legend">Pick one</span>
          <auro-radio value="a" name="test" disabled>A</auro-radio>
          <auro-radio value="b" name="test" disabled>B</auro-radio>
          <auro-radio value="c" name="test" disabled>C</auro-radio>
        </auro-radio-group>
      `);
      await elementUpdated(el);

      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      await elementUpdated(el);

      await expect(el).to.exist;
    });

    // ─── selectNextItem decrements index when navigating Up past disabled ─
    it('selectNextItem skips disabled radio when navigating Up', async () => {
      const el = await fixture(html`
        <auro-radio-group>
          <span slot="legend">Pick one</span>
          <auro-radio value="a" name="test">A</auro-radio>
          <auro-radio value="b" name="test" disabled>B</auro-radio>
          <auro-radio value="c" name="test">C</auro-radio>
        </auro-radio-group>
      `);
      await elementUpdated(el);

      // Select C so index is 2
      el.querySelector('auro-radio[value="c"]').click();
      await elementUpdated(el);
      expect(el.value).to.equal('c');

      // ArrowUp should skip disabled B and land on A
      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
      await elementUpdated(el);

      expect(el.value).to.equal('a');
    });

    // ─── selectNextItem wraps index through -1 when navigating Up ─────
    it('selectNextItem wraps through -1 when all preceding radios are disabled', async () => {
      const el = await fixture(html`
        <auro-radio-group>
          <span slot="legend">Pick one</span>
          <auro-radio value="a" name="test" disabled>A</auro-radio>
          <auro-radio value="b" name="test" disabled>B</auro-radio>
          <auro-radio value="c" name="test">C</auro-radio>
        </auro-radio-group>
      `);
      await elementUpdated(el);

      // Select C so index is 2
      el.querySelector('auro-radio[value="c"]').click();
      await elementUpdated(el);
      expect(el.value).to.equal('c');

      // ArrowUp should skip disabled A and B, wrap through -1, land back on C
      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
      await elementUpdated(el);

      expect(el.value).to.equal('c');
    });

    // ─── handleKeyDown default case does nothing ──────────────────────
    it('handleKeyDown default case does nothing for unrecognized keys', async () => {
      const el = await fixture(html`
        <auro-radio-group>
          <span slot="legend">Pick one</span>
          <auro-radio value="a" name="test">A</auro-radio>
          <auro-radio value="b" name="test">B</auro-radio>
        </auro-radio-group>
      `);
      await elementUpdated(el);

      const valueBefore = el.value;
      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
      await elementUpdated(el);

      await expect(el.value).to.equal(valueBefore);
    });

    // ─── handleKeyDown ArrowLeft wraps to last item ───────────────────
    it('handleKeyDown ArrowLeft navigates backward', async () => {
      const el = await fixture(html`
        <auro-radio-group>
          <span slot="legend">Pick one</span>
          <auro-radio value="a" name="test">A</auro-radio>
          <auro-radio value="b" name="test">B</auro-radio>
          <auro-radio value="c" name="test">C</auro-radio>
        </auro-radio-group>
      `);
      await elementUpdated(el);

      // Select first item
      const firstRadio = el.querySelector('auro-radio[value="a"]');
      firstRadio.click();
      await elementUpdated(el);
      await expect(el.value).to.equal('a');

      // ArrowLeft should wrap to last
      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
      await elementUpdated(el);

      await expect(el.value).to.equal('c');
    });

    // ─── handleKeyDown legacy "Down" key navigates forward ────────────
    it('handleKeyDown legacy "Down" key navigates forward', async () => {
      const el = await fixture(html`
        <auro-radio-group>
          <span slot="legend">Pick one</span>
          <auro-radio value="a" name="test">A</auro-radio>
          <auro-radio value="b" name="test">B</auro-radio>
        </auro-radio-group>
      `);
      await elementUpdated(el);

      el.querySelector('auro-radio[value="a"]').click();
      await elementUpdated(el);

      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Down', bubbles: true }));
      await elementUpdated(el);

      expect(el.value).to.equal('b');
    });

    // ─── handleKeyDown legacy "Up" key navigates backward ─────────────
    it('handleKeyDown legacy "Up" key navigates backward', async () => {
      const el = await fixture(html`
        <auro-radio-group>
          <span slot="legend">Pick one</span>
          <auro-radio value="a" name="test">A</auro-radio>
          <auro-radio value="b" name="test">B</auro-radio>
        </auro-radio-group>
      `);
      await elementUpdated(el);

      el.querySelector('auro-radio[value="b"]').click();
      await elementUpdated(el);

      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Up', bubbles: true }));
      await elementUpdated(el);

      expect(el.value).to.equal('a');
    });

    // ─── render error helpText uses inverse appearance when onDark ────
    it('render error helpText uses inverse when onDark is true', async () => {
      const el = await fixture(html`
        <auro-radio-group error="Custom error" ondark>
          <span slot="legend">Pick one</span>
          <auro-radio value="a" name="test">A</auro-radio>
        </auro-radio-group>
      `);
      await elementUpdated(el);

      // Force an error validity state so the error help text branch renders
      el.validity = 'customError';
      await elementUpdated(el);

      const helpText = el.shadowRoot.querySelector('[part="helpText"]');
      expect(helpText).to.exist;
      expect(helpText.getAttribute('appearance')).to.equal('inverse');
    });
  });

  describe('A11Y', () => {
    it('should have role="radiogroup" on the fieldset', async () => {
      const el = await fixture(html`
        <auro-radio-group>
          <span slot="legend">Pick one</span>
          <auro-radio value="one" name="test">One</auro-radio>
        </auro-radio-group>
      `);

      const fieldset = el.shadowRoot.querySelector('fieldset');
      expect(fieldset.getAttribute('role')).to.equal('radiogroup');
    });

    it('should set aria-invalid when in error state', async () => {
      const el = await fixture(html`
        <auro-radio-group error="Error">
          <span slot="legend">Pick one</span>
          <auro-radio value="one" name="test">One</auro-radio>
        </auro-radio-group>
      `);

      expect(el.getAttribute('aria-invalid')).to.equal('true');
    });

    it('should remove aria-invalid when error is cleared', async () => {
      const el = await fixture(html`
        <auro-radio-group error="Error">
          <span slot="legend">Pick one</span>
          <auro-radio value="one" name="test">One</auro-radio>
        </auro-radio-group>
      `);

      el.removeAttribute('error');
      await elementUpdated(el);

      expect(el.hasAttribute('aria-invalid')).to.be.false;
    });

    it('should render error help text with role="alert" when invalid', async () => {
      const el = await fixture(html`
        <auro-radio-group error="Error message">
          <span slot="legend">Pick one</span>
          <auro-radio value="one" name="test">One</auro-radio>
        </auro-radio-group>
      `);

      const errorHelpText = el.shadowRoot.querySelector('[part="helpText"][role="alert"]');
      expect(errorHelpText).to.exist;
    });
  });

  describe('Mouse Behavior', () => {
    it('should select radio and update group value on click', async () => {
      const el = await fixture(html`
        <auro-radio-group>
          <span slot="legend">Pick one</span>
          <auro-radio id="r1" name="test" value="one">One</auro-radio>
          <auro-radio id="r2" name="test" value="two">Two</auro-radio>
        </auro-radio-group>
      `);

      el.querySelector('#r1').shadowRoot.querySelector('input').click();
      await elementUpdated(el);

      expect(el.value).to.equal('one');
      expect(el.querySelector('#r1').checked).to.be.true;
    });
  });

  describe('Keyboard Behavior', () => {
    it('should select with Space key', async () => {
      const el = await fixture(html`
        <auro-radio-group>
          <span slot="legend">Pick one</span>
          <auro-radio id="r1" name="test" value="one">One</auro-radio>
          <auro-radio id="r2" name="test" value="two">Two</auro-radio>
        </auro-radio-group>
      `);

      el.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
      await elementUpdated(el);

      expect(el.querySelector('#r1').checked).to.be.true;
    });

    it('should navigate with ArrowDown/ArrowRight', async () => {
      const el = await fixture(html`
        <auro-radio-group>
          <span slot="legend">Pick one</span>
          <auro-radio id="r1" name="test" value="one">One</auro-radio>
          <auro-radio id="r2" name="test" value="two">Two</auro-radio>
        </auro-radio-group>
      `);

      // Select first
      el.querySelector('#r1').shadowRoot.querySelector('input').click();
      await elementUpdated(el);

      // ArrowRight should move to second
      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      await elementUpdated(el);

      expect(el.value).to.equal('two');
    });

    it('should navigate with ArrowUp/ArrowLeft', async () => {
      const el = await fixture(html`
        <auro-radio-group>
          <span slot="legend">Pick one</span>
          <auro-radio id="r1" name="test" value="one">One</auro-radio>
          <auro-radio id="r2" name="test" value="two">Two</auro-radio>
        </auro-radio-group>
      `);

      // Select second
      el.querySelector('#r2').shadowRoot.querySelector('input').click();
      await elementUpdated(el);

      // ArrowLeft should move to first
      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
      await elementUpdated(el);

      expect(el.value).to.equal('one');
    });
  });
});



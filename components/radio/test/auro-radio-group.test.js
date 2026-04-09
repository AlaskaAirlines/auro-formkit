/* eslint-disable no-undef, max-lines */

import {elementUpdated, expect, fixture, html} from '@open-wc/testing';
import '../src/registered.js';

describe('auro-radio-group', () => {
  describe('Rendering', () => {
    // Add missing tests
  });

  describe('User Stories', () => {
    // Add missing tests
  });

  describe('Properties', () => {
    describe('appearance', () => {
      // add tests for this property
    });

    describe('disabled', () => {
      // add tests for this property
    });

    describe('error', () => {
      // add tests for this property
    });

    describe('horizontal', () => {
      // add tests for this property
    });

    describe('noValidate', () => {
      // add tests for this property
    });

    describe('onDark', () => {
      // add tests for this property
    });

    describe('optionSelected', () => {
      // add tests for this property
    });

    describe('required', () => {
      // add tests for this property
    });

    describe('setCustomValidity', () => {
      // add tests for this property
    });

    describe('setCustomValidityCustomError', () => {
      // add tests for this property
    });

    describe('setCustomValidityValueMissing', () => {
      // add tests for this property
    });

    describe('validity', () => {
      // add tests for this property
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
    });
  });

  describe('Slots', () => {
    describe('default', () => {
      // add tests for this slot
    });

    describe('legend', () => {
      it('should render content in the legend slot', async () => {
        const el = await fixture(html`<auro-radio-group><span slot="legend">Select one</span><auro-radio value="one">One</auro-radio></auro-radio-group>`);

        const slotContent = el.querySelector('[slot="legend"]');

        await expect(slotContent).to.exist;
      });
    });

    describe('optionalLabel', () => {
      it('should render content in the optionalLabel slot', async () => {
        const el = await fixture(html`<auro-radio-group><span slot="optionalLabel">(optional)</span><span slot="legend">Pick</span><auro-radio value="one">One</auro-radio></auro-radio-group>`);

        const slotContent = el.querySelector('[slot="optionalLabel"]');

        await expect(slotContent).to.exist;
      });
    });

    describe('helpText', () => {
      it('should render content in the helpText slot', async () => {
        const el = await fixture(html`<auro-radio-group><span slot="helpText">Choose wisely</span><span slot="legend">Pick</span><auro-radio value="one">One</auro-radio></auro-radio-group>`);

        const slotContent = el.querySelector('[slot="helpText"]');

        await expect(slotContent).to.exist;
      });
    });
  });

  describe('Public Functions', () => {
    describe('register', () => {
      // TODO: test needs to be added
    });

    describe('reset', () => {
      // TODO: test needs to be added
    });

    describe('validate', () => {
      // TODO: test needs to be added
    });
  });

  describe('Events', () => {
    describe('auroFormElement-validated', () => {
      // add tests for this event
    });

    describe('input', () => {
      // add tests for this event
    });
  });

  describe('Private Functions', () => {
    // No private function tests
  });

  describe('A11Y', () => {
    // Add missing tests
  });

  describe('Mouse Behavior', () => {
    // Add missing tests
  });

  describe('Keyboard Behavior', () => {
    // Add missing tests
  });
});



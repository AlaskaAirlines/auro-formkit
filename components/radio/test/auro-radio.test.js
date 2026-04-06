/* eslint-disable no-undef, max-lines */

import {elementUpdated, expect, fixture, html} from '@open-wc/testing';
import '../src/registered.js';
import { errorFixture } from './testFixtures.js';

describe('auro-radio', () => {

  describe('Rendering', () => {
    // Add missing tests

    it('should be defined as a custom element', async () => {
      const el = await !!customElements.get("auro-radio");

      await expect(el).to.be.true;
    });

    it('should be successfully created in the document', async () => {
      // This test fails when attributes are put onto the component before it is attached to the DOM
      const radio = document.createElement('auro-radio');
      const radioGroup = document.createElement('auro-radio-group');

      await expect(radio.localName).to.equal('auro-radio');
      await expect(radioGroup.localName).to.equal('auro-radio-group');
    });
  });

  describe('User Stories', () => {
    // Add missing tests
  });

  describe('Properties', () => {
    describe('appearance', () => {
      // add tests for this property
    });

    describe('checked', () => {
      // add missing tests
    });

    describe('disabled', () => {
      it('should disable all radio buttons when group has disabled attribute', async () => {
        const el = await fixture(html`
          <auro-radio-group disabled>
            <span slot="legend">Form label goes here</span>
            <auro-radio id="radio1" label="Yes" name="radioDemo" value="yes">Yes</auro-radio>
            <auro-radio id="radio2" label="No" name="radioDemo" value="no">No</auro-radio>
          </auro-radio-group>
        `);

        const radioButtonOne = el.querySelector('#radio1');
        const radioButtonTwo = el.querySelector('#radio2');

        await expect(radioButtonOne.hasAttribute('disabled')).to.be.true;
        await expect(radioButtonTwo.hasAttribute('disabled')).to.be.true;
      });
    });

    describe('error', () => {
      it('should set validity to error state when error attribute is present', async () => {
        const el = await fixture(html`
          <auro-radio-group error="customError">
            <span slot="legend">Form label goes here</span>
            <auro-radio id="radio1" label="Yes" name="radioDemo" value="yes">Yes</auro-radio>
            <auro-radio id="radio2" label="No" name="radioDemo" value="no">No</auro-radio>
            <auro-radio id="radio3" label="Maybe" name="radioDemo" value="maybe">Maybe</auro-radio>
          </auro-radio-group>
        `);

        await expect(el.validity).to.equal('customError');
      });

      it('should rerun validity when error attribute is removed even with undefined value', async () => {
        const el = await errorFixture();

        await expect(el.getAttribute('validity')).to.equal('customError');

        el.removeAttribute('error');

        await elementUpdated(el);

        await expect(el.getAttribute('validity')).to.equal('valid');
      });
    });

    describe('id', () => {
      // add tests for this property
    });

    describe('label', () => {
      // add tests for this property
    });

    describe('name', () => {
      // add tests for this property
    });

    describe('onDark', () => {
      // add tests for this property
    });

    describe('required', () => {
      // add tests for this property
    });

    describe('value', () => {
      it('should assign the selected radio button to optionSelected attribute', async () => {
        const el = await fixture(html`
          <auro-radio-group>
            <span slot="legend">Form label goes here</span>
            <auro-radio id="radio1" label="Yes" name="radioDemo" value="yes">Y</auro-radio>
            <auro-radio id="radio2" label="No" name="radioDemo" value="no">N</auro-radio>
            <auro-radio id="radio3" label="Maybe" name="radioDemo" value="maybe">?</auro-radio>
          </auro-radio-group>
        `);

        await expect(el.hasAttribute('optionSelected')).to.be.false;
        await expect(el.hasAttribute('value')).to.be.false;

        const radioButtons = [...el.querySelectorAll('auro-radio')];
        const radioOne = radioButtons[0];

        radioOne.checked = true;

        await elementUpdated(el);

        await expect(radioButtons.indexOf(el.optionSelected)).to.equal(0);
        await expect(el.value).to.equal('yes');
      });
    });
  });

  describe('Public Functions', () => {
    describe('register', () => {
      // TODO: test needs to be added
    });

    describe('reset', () => {
      it('should reset all radio buttons to unchecked state when reset() is called', async () => {
        const el = await fixture(html`
          <auro-radio-group id="resetGroupTest" required>
            <span slot="legend">Form label goes here</span>
            <auro-radio id="radio1" label="Yes" name="radioDemo" value="yes" checked>Yes</auro-radio>
            <auro-radio id="radio2" label="No" name="radioDemo" value="no" checked>No</auro-radio>
          </auro-radio-group>
        `);

        const radioButtonOne = el.querySelector('#radio1');
        const radioButtonTwo = el.querySelector('#radio2');

        el.reset();

        await elementUpdated(el);

        await expect(radioButtonOne.hasAttribute('checked')).to.be.false;
        await expect(radioButtonTwo.hasAttribute('checked')).to.be.false;

        await expect(el.value).to.equal(undefined);
        await expect(el.optionSelected).to.equal(undefined);
        await expect(el.hasAttribute('validity')).to.be.false;
      });
    });
  });

  describe('Private Functions', () => {
    // No private function tests
  });

  describe('A11Y', () => {
    it('should be accessible', async () => {
      const el = await fixture(html`
        <auro-radio id="radio1" label="Yes" name="radioDemo" value="yes">Yes</auro-radio>
      `);

      await expect(el).to.be.accessible();
    });
  });

  describe('Mouse Behavior', () => {
    describe('Click', () => {
      it('should select a radio button and update value when clicked', async () => {
        const el = await fixture(html`
          <auro-radio-group>
            <span slot="legend">Form label goes here</span>
            <auro-radio id="radio1" label="Yes" name="radioDemo" value="yes">Yes</auro-radio>
            <auro-radio id="radio2" label="No" name="radioDemo" value="no">No</auro-radio>
            <auro-radio id="radio3" label="Maybe" name="radioDemo" value="maybe">Maybe</auro-radio>
          </auro-radio-group>
        `);

        const radioButton = el.querySelector('#radio1');
        const input = radioButton.shadowRoot.querySelector('input');

        const eventPromise = new Promise(resolve => {
          el.addEventListener('toggleSelected', resolve);
        });

        input.click();

        const event = await eventPromise;
        expect(event).to.exist;
        expect(event.target).to.equal(radioButton);
      });
    });
  });

  describe('Keyboard Behavior', () => {
    describe('Space', () => {
      it('should select the focused radio button when Space is pressed', async () => {
        const el = await fixture(html`
          <auro-radio-group error="customError">
            <span slot="legend">Form label goes here</span>
            <auro-radio id="radio1" label="Yes" name="radioDemo" value="yes">Y</auro-radio>
            <auro-radio id="radio2" label="No" name="radioDemo" value="no">N</auro-radio>
            <auro-radio id="radio3" label="Maybe" name="radioDemo" value="maybe">?</auro-radio>
          </auro-radio-group>
        `);

        const radioButtonOne = el.querySelector('#radio1');

        radioButtonOne.focus();

        await elementUpdated(el);

        const event = new KeyboardEvent('keydown', { key: ' ' });
        el.dispatchEvent(event);

        await elementUpdated(el);

        await expect(radioButtonOne.hasAttribute('checked')).to.be.true;
      });
    });
  });
});


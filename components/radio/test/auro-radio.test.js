/* eslint-disable no-undef, max-lines, max-statements, no-unused-expressions */

import {elementUpdated, expect, fixture, html} from '@open-wc/testing';
import '../src/registered.js';
import { errorFixture } from './testFixtures.js';

describe('auro-radio', () => {

  describe('Rendering', () => {
    it('should be defined as a custom element', async () => {
      const el = await !!customElements.get("auro-radio");

      await expect(el).to.be.true;
    });

    it('should be successfully created in the document', async () => {
      const radio = document.createElement('auro-radio');
      const radioGroup = document.createElement('auro-radio-group');

      await expect(radio.localName).to.equal('auro-radio');
      await expect(radioGroup.localName).to.equal('auro-radio-group');
    });

    it('should render a shadow root with an input element', async () => {
      const el = await fixture(html`<auro-radio value="test" name="test">Test</auro-radio>`);
      const input = el.shadowRoot.querySelector('input');

      expect(input).to.exist;
      expect(input.type).to.equal('radio');
    });

    it('should render slotted label text', async () => {
      const el = await fixture(html`<auro-radio value="test" name="test">My Label</auro-radio>`);
      const slot = el.shadowRoot.querySelector('slot:not([name])');
      const assigned = slot.assignedNodes().filter((node) => node.textContent.trim().length > 0);

      expect(assigned.length).to.be.greaterThan(0);
      expect(assigned[0].textContent).to.equal('My Label');
    });

    it('should render the error border when error is set', async () => {
      const el = await fixture(html`<auro-radio value="test" name="test" error>Test</auro-radio>`);
      const errorBorder = el.shadowRoot.querySelector('.errorBorder');

      expect(errorBorder).to.exist;
    });

    it('should derive inputId from the id attribute', async () => {
      const el = await fixture(html`<auro-radio id="my-radio" value="test" name="test">Test</auro-radio>`);
      const input = el.shadowRoot.querySelector('input');

      expect(input.id).to.equal('my-radio-input');
    });

    it('should generate a unique inputId when no id is set', async () => {
      const el = await fixture(html`<auro-radio value="test" name="test">Test</auro-radio>`);
      const input = el.shadowRoot.querySelector('input');

      expect(input.id).to.be.a('string');
      expect(input.id.length).to.be.greaterThan(0);
    });
  });

  describe('User Stories', () => {
    it('should allow a user to select a radio button', async () => {
      const el = await fixture(html`
        <auro-radio-group>
          <span slot="legend">Pick one</span>
          <auro-radio id="r1" name="demo" value="one">One</auro-radio>
          <auro-radio id="r2" name="demo" value="two">Two</auro-radio>
        </auro-radio-group>
      `);

      const r1 = el.querySelector('#r1');
      r1.shadowRoot.querySelector('input').click();
      await elementUpdated(el);

      expect(r1.checked).to.be.true;
      expect(el.value).to.equal('one');
    });

    it('should prevent interaction when disabled', async () => {
      const el = await fixture(html`<auro-radio value="opt" name="test" disabled>Option</auro-radio>`);
      const input = el.shadowRoot.querySelector('input');

      input.click();
      await elementUpdated(el);
      expect(el.checked).to.not.be.true;
    });
  });

  describe('Properties', () => {
    describe('appearance', () => {
      it('should default appearance to "default"', async () => {
        const el = await fixture(html`<auro-radio value="test" name="test">Test</auro-radio>`);

        expect(el.appearance).to.equal('default');
      });

      it('should reflect appearance attribute when set', async () => {
        const el = await fixture(html`<auro-radio value="test" name="test" appearance="inverse">Test</auro-radio>`);

        expect(el.getAttribute('appearance')).to.equal('inverse');
      });
    });

    describe('checked', () => {
      it('should default to unchecked', async () => {
        const el = await fixture(html`<auro-radio value="test" name="test">Test</auro-radio>`);

        expect(el.checked).to.be.false;
        expect(el.hasAttribute('checked')).to.be.false;
      });

      it('should reflect checked attribute when set', async () => {
        const el = await fixture(html`<auro-radio value="test" name="test" checked>Test</auro-radio>`);

        expect(el.checked).to.be.true;
        expect(el.hasAttribute('checked')).to.be.true;
      });

      it('should sync the internal input checked state', async () => {
        const el = await fixture(html`<auro-radio value="test" name="test">Test</auro-radio>`);
        const input = el.shadowRoot.querySelector('input');

        el.checked = true;
        await elementUpdated(el);
        expect(input.checked).to.be.true;

        el.checked = false;
        await elementUpdated(el);
        expect(input.checked).to.be.false;
      });
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

      it('should default to not disabled', async () => {
        const el = await fixture(html`<auro-radio value="test" name="test">Test</auro-radio>`);

        expect(el.disabled).to.be.false;
      });

      it('should disable the internal input element', async () => {
        const el = await fixture(html`<auro-radio value="test" name="test" disabled>Test</auro-radio>`);
        const input = el.shadowRoot.querySelector('input');

        expect(input.disabled).to.be.true;
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

      it('should default to no error on the radio', async () => {
        const el = await fixture(html`<auro-radio value="test" name="test">Test</auro-radio>`);

        expect(el.error).to.be.false;
      });

      it('should reflect error attribute on the radio', async () => {
        const el = await fixture(html`<auro-radio value="test" name="test" error>Test</auro-radio>`);

        expect(el.error).to.be.true;
        expect(el.hasAttribute('error')).to.be.true;
      });
    });

    describe('id', () => {
      it('should accept and reflect an id attribute', async () => {
        const el = await fixture(html`<auro-radio id="my-radio" value="test" name="test">Test</auro-radio>`);

        expect(el.getAttribute('id')).to.equal('my-radio');
      });
    });

    describe('label', () => {
      it('should accept a label property', async () => {
        const el = await fixture(html`<auro-radio value="test" name="test" label="My Label">Test</auro-radio>`);

        expect(el.label).to.equal('My Label');
      });
    });

    describe('name', () => {
      it('should pass name to the internal input element', async () => {
        const el = await fixture(html`<auro-radio name="rdoName" value="test">Test</auro-radio>`);
        const input = el.shadowRoot.querySelector('input');

        expect(input.name).to.equal('rdoName');
      });
    });

    describe('onDark', () => {
      it('should reflect the onDark attribute', async () => {
        const el = await fixture(html`<auro-radio value="test" name="test" onDark>Test</auro-radio>`);

        expect(el.onDark).to.be.true;
        expect(el.hasAttribute('ondark')).to.be.true;
      });
    });

    describe('required', () => {
      it('should reflect the required attribute', async () => {
        const el = await fixture(html`<auro-radio value="test" name="test" required>Test</auro-radio>`);

        expect(el.required).to.be.true;
        expect(el.hasAttribute('required')).to.be.true;
      });

      it('should set aria-required to true when required', async () => {
        const el = await fixture(html`<auro-radio value="test" name="test" required>Test</auro-radio>`);

        expect(el.getAttribute('aria-required')).to.equal('true');
      });
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

      it('should pass value to the internal input element', async () => {
        const el = await fixture(html`<auro-radio value="myVal" name="test">Test</auro-radio>`);
        const input = el.shadowRoot.querySelector('input');

        expect(input.value).to.equal('myVal');
      });
    });

    describe('touched', () => {
      it('should default to false', async () => {
        const el = await fixture(html`<auro-radio value="test" name="test">Test</auro-radio>`);

        expect(el.touched).to.be.false;
      });

      it('should become true after focus', async () => {
        const el = await fixture(html`<auro-radio value="test" name="test">Test</auro-radio>`);

        el.dispatchEvent(new Event('focus'));
        await elementUpdated(el);

        expect(el.touched).to.be.true;
      });
    });
  });

  describe('Public Functions', () => {
    describe('register', () => {
      it('should have a static register method', () => {
        expect(typeof customElements.get('auro-radio').register).to.equal('function');
      });
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

      it('should reset touched, checked, and error on an individual radio', async () => {
        const el = await fixture(html`<auro-radio value="test" name="test" checked error>Test</auro-radio>`);

        expect(el.checked).to.be.true;
        expect(el.error).to.be.true;

        el.reset();
        await elementUpdated(el);

        expect(el.checked).to.be.false;
        expect(el.error).to.be.false;
        expect(el.touched).to.be.false;
      });
    });
  });

  describe('Events', () => {
    describe('toggleSelected', () => {
      it('should fire toggleSelected when a radio input is clicked', async () => {
        const el = await fixture(html`<auro-radio value="test" name="test">Test</auro-radio>`);
        const input = el.shadowRoot.querySelector('input');

        let fired = false;
        el.addEventListener('toggleSelected', () => {
          fired = true;
        });

        input.click();
        await elementUpdated(el);

        expect(fired).to.be.true;
      });

      it('should have bubbles and composed set to true', async () => {
        const el = await fixture(html`<auro-radio value="test" name="test">Test</auro-radio>`);
        const input = el.shadowRoot.querySelector('input');

        let event = null;
        el.addEventListener('toggleSelected', (ev) => {
          event = ev;
        });

        input.click();
        await elementUpdated(el);

        expect(event.bubbles).to.be.true;
        expect(event.composed).to.be.true;
      });
    });

    describe('change', () => {
      it('should fire a change event when the internal input changes', async () => {
        const el = await fixture(html`<auro-radio value="test" name="test">Test</auro-radio>`);
        const input = el.shadowRoot.querySelector('input');

        let fired = false;
        el.addEventListener('change', () => {
          fired = true;
        });

        input.click();
        await elementUpdated(el);

        expect(fired).to.be.true;
      });
    });

    describe('input', () => {
      it('should fire an input event from the group when value changes', async () => {
        const el = await fixture(html`
          <auro-radio-group>
            <span slot="legend">Pick one</span>
            <auro-radio id="r1" name="demo" value="one">One</auro-radio>
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
    });

    describe('focusSelected', () => {
      it('should fire focusSelected on focus', async () => {
        const el = await fixture(html`<auro-radio value="test" name="test">Test</auro-radio>`);

        let fired = false;
        el.addEventListener('focusSelected', () => {
          fired = true;
        });

        el.focus();
        await elementUpdated(el);

        expect(fired).to.be.true;
      });

      it('should have bubbles and composed set to true', async () => {
        const el = await fixture(html`<auro-radio value="test" name="test">Test</auro-radio>`);

        let event = null;
        el.addEventListener('focusSelected', (ev) => {
          event = ev;
        });

        el.focus();
        await elementUpdated(el);

        expect(event.bubbles).to.be.true;
        expect(event.composed).to.be.true;
      });
    });

    describe('auroRadio-blur', () => {
      it('should fire auroRadio-blur on blur', async () => {
        const el = await fixture(html`<auro-radio value="test" name="test">Test</auro-radio>`);

        let fired = false;
        el.addEventListener('auroRadio-blur', () => {
          fired = true;
        });

        el.focus();
        el.blur();
        await elementUpdated(el);

        expect(fired).to.be.true;
      });
    });

    describe('resetRadio', () => {
      it('should fire resetRadio when checked changes', async () => {
        const el = await fixture(html`<auro-radio value="test" name="test">Test</auro-radio>`);

        let fired = false;
        el.addEventListener('resetRadio', () => {
          fired = true;
        });

        el.checked = true;
        await elementUpdated(el);

        expect(fired).to.be.true;
      });
    });

    describe('auroRadio-selected', () => {
      it('should fire auroRadio-selected when checked becomes true', async () => {
        const el = await fixture(html`<auro-radio value="test" name="test">Test</auro-radio>`);

        let fired = false;
        el.addEventListener('auroRadio-selected', () => {
          fired = true;
        });

        el.checked = true;
        await elementUpdated(el);

        expect(fired).to.be.true;
      });

      it('should not fire auroRadio-selected when checked becomes false', async () => {
        const el = await fixture(html`<auro-radio value="test" name="test" checked>Test</auro-radio>`);

        let fired = false;
        el.addEventListener('auroRadio-selected', () => {
          fired = true;
        });

        el.checked = false;
        await elementUpdated(el);

        expect(fired).to.be.false;
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

    it('should have role="radio" on the host element', async () => {
      const el = await fixture(html`<auro-radio value="test" name="test">Test</auro-radio>`);

      expect(el.getAttribute('role')).to.equal('radio');
    });

    it('should have aria-checked reflecting checked state', async () => {
      const el = await fixture(html`<auro-radio value="test" name="test">Test</auro-radio>`);

      expect(el.getAttribute('aria-checked')).to.equal('false');

      el.checked = true;
      await elementUpdated(el);
      expect(el.getAttribute('aria-checked')).to.equal('true');

      el.checked = false;
      await elementUpdated(el);
      expect(el.getAttribute('aria-checked')).to.equal('false');
    });

    it('should have aria-disabled when disabled', async () => {
      const el = await fixture(html`<auro-radio value="test" name="test" disabled>Test</auro-radio>`);

      expect(el.hasAttribute('aria-disabled')).to.be.true;

      el.disabled = false;
      await elementUpdated(el);
      expect(el.hasAttribute('aria-disabled')).to.be.false;
    });

    it('should set tabindex based on checked state', async () => {
      const el = await fixture(html`<auro-radio value="test" name="test">Test</auro-radio>`);

      expect(el.getAttribute('tabindex')).to.equal('-1');

      el.checked = true;
      await elementUpdated(el);
      expect(el.getAttribute('tabindex')).to.equal('0');

      el.checked = false;
      await elementUpdated(el);
      expect(el.getAttribute('tabindex')).to.equal('-1');
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

        const eventPromise = new Promise((resolve) => {
          el.addEventListener('toggleSelected', resolve);
        });

        input.click();

        const event = await eventPromise;
        expect(event).to.exist;
        expect(event.target).to.equal(radioButton);
      });

      it('should not select when disabled', async () => {
        const el = await fixture(html`<auro-radio value="test" name="test" disabled>Test</auro-radio>`);
        const input = el.shadowRoot.querySelector('input');

        input.click();
        await elementUpdated(el);

        expect(el.checked).to.not.be.true;
      });

      it('should delegate host click to internal input', async () => {
        const el = await fixture(html`<auro-radio value="test" name="test">Test</auro-radio>`);

        let fired = false;
        el.addEventListener('toggleSelected', () => {
          fired = true;
        });

        el.click();
        await elementUpdated(el);

        expect(fired).to.be.true;
        expect(el.checked).to.be.true;
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

    describe('Arrow keys', () => {
      it('should move selection with ArrowDown', async () => {
        const el = await fixture(html`
          <auro-radio-group>
            <span slot="legend">Pick one</span>
            <auro-radio id="r1" name="demo" value="one">One</auro-radio>
            <auro-radio id="r2" name="demo" value="two">Two</auro-radio>
            <auro-radio id="r3" name="demo" value="three">Three</auro-radio>
          </auro-radio-group>
        `);

        // Select first
        el.querySelector('#r1').shadowRoot.querySelector('input').click();
        await elementUpdated(el);
        expect(el.value).to.equal('one');

        // ArrowDown should move to second
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        await elementUpdated(el);
        expect(el.value).to.equal('two');
      });

      it('should move selection with ArrowUp', async () => {
        const el = await fixture(html`
          <auro-radio-group>
            <span slot="legend">Pick one</span>
            <auro-radio id="r1" name="demo" value="one">One</auro-radio>
            <auro-radio id="r2" name="demo" value="two">Two</auro-radio>
            <auro-radio id="r3" name="demo" value="three">Three</auro-radio>
          </auro-radio-group>
        `);

        // Select second
        el.querySelector('#r2').shadowRoot.querySelector('input').click();
        await elementUpdated(el);
        expect(el.value).to.equal('two');

        // ArrowUp should move to first
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
        await elementUpdated(el);
        expect(el.value).to.equal('one');
      });

      it('should wrap around from last to first with ArrowDown', async () => {
        const el = await fixture(html`
          <auro-radio-group>
            <span slot="legend">Pick one</span>
            <auro-radio id="r1" name="demo" value="one">One</auro-radio>
            <auro-radio id="r2" name="demo" value="two">Two</auro-radio>
          </auro-radio-group>
        `);

        // Select last
        el.querySelector('#r2').shadowRoot.querySelector('input').click();
        await elementUpdated(el);
        expect(el.value).to.equal('two');

        // ArrowDown should wrap to first
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        await elementUpdated(el);
        expect(el.value).to.equal('one');
      });

      it('should skip disabled items when navigating', async () => {
        const el = await fixture(html`
          <auro-radio-group>
            <span slot="legend">Pick one</span>
            <auro-radio id="r1" name="demo" value="one">One</auro-radio>
            <auro-radio id="r2" name="demo" value="two" disabled>Two</auro-radio>
            <auro-radio id="r3" name="demo" value="three">Three</auro-radio>
          </auro-radio-group>
        `);

        // Select first
        el.querySelector('#r1').shadowRoot.querySelector('input').click();
        await elementUpdated(el);
        expect(el.value).to.equal('one');

        // ArrowDown should skip disabled second and go to third
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        await elementUpdated(el);
        expect(el.value).to.equal('three');
      });
    });
  });
});


/* eslint-disable no-undef, no-underscore-dangle,max-lines,array-element-newline, dot-notation */

import {fixture, html, expect, elementUpdated} from '@open-wc/testing';
import { setViewport } from '@web/test-runner-commands';
import designTokens from '@aurodesignsystem/design-tokens/dist/legacy/auro-classic/JSONVariablesFlat.json' with { type: 'json' };

// !AURO ELEMENT REGISTRATION MUST BE DONE BEFORE AURO FORM REGISTRATION! //
import '../demo/registerDemoDeps.js';
import '../src/registered.js';

const mobileBreakpointWidth = parseInt(designTokens['ds-grid-breakpoint-sm'], 10) - 1;

/**
 * Runs the full form test suite for a given viewport mode.
 * @param {boolean} mobileView - Whether tests should run in small or large viewport mode.
 * @returns {void}
 */
function runFullTest(mobileView) {
  before(async () => {
    await setViewport(mobileView ? { width: mobileBreakpointWidth, height: 800 } : { width: 800, height: 800 });
  });

  describe('Rendering', () => {
    it('should have a custom element definition', async () => {
      await customElements.whenDefined("auro-form");
      const el = Boolean(customElements.get("auro-form"));

      await expect(el).to.be.true;
    });

    describe('Empty form', () => {
      it('should have empty formState with zero elements', async () => {
        const el = await fixture(html`<auro-form></auro-form>`);
        await elementUpdated(el);

        expect(Object.keys(el.formState).length).to.equal(0);
      });

      it('should report valid validity with zero elements', async () => {
        const el = await fixture(html`<auro-form></auro-form>`);
        await elementUpdated(el);

        expect(el.validity).to.not.equal('invalid');
      });

      it('should be in initial state with zero elements', async () => {
        const el = await fixture(html`<auro-form></auro-form>`);
        await elementUpdated(el);

        expect(el.isInitialState).to.be.true;
      });
    });

    describe('Deeply nested form elements', () => {
      it('should discover elements nested more than one level deep', async () => {
        const el = await fixture(html`
          <auro-form>
            <div>
              <div>
                <auro-input name="deepField" value="nested"></auro-input>
              </div>
            </div>
          </auro-form>
        `);
        await elementUpdated(el);

        expect(el.formState['deepField']).to.exist;
      });
    });
  });

  // Automatic input state behavior
  // -------------------------------------

  describe('when given multiple inputs', () => {
    it('should have INVALID state when multiple required inputs exist and only one is populated', async () => {
      const el = await fixture(html`
      <auro-form>
        <auro-input name="testInput" required></auro-input>
        <auro-input name="testInput2" required></auro-input>
      </auro-form>
    `);

      await expect(el.formState).to.have.keys('testInput', 'testInput2');
      await expect(el.formState.testInput.validity).to.be.null;
      await expect(el.formState.testInput2.validity).to.be.null;
      await expect(el.validity).to.be.null;

      const [inputEl] = el._elements;

      inputEl.focus();
      inputEl.value = 'zzz';
      inputEl.blur();

      await elementUpdated(el);

      await expect(el.formState.testInput.validity).to.equal('valid');
      await expect(el.validity).to.equal('invalid');
    });

    it('should have VALID state when multiple inputs exist and only one is required', async () => {
      const el = await fixture(html`
      <auro-form>
        <auro-input name="testInput" required></auro-input>
        <auro-input name="testInput2"></auro-input>
      </auro-form>
    `);

      await expect(el.formState).to.have.keys('testInput', 'testInput2');
      await expect(el.formState.testInput.validity).to.be.null;
      await expect(el.formState.testInput2.validity).to.be.null;
      await expect(el.validity).to.be.null;

      const [inputEl] = el._elements;

      inputEl.focus();
      inputEl.value = 'zzz';
      inputEl.blur();

      await elementUpdated(el);

      await expect(el.formState.testInput.validity).to.equal('valid');
      await expect(el.validity).to.equal('valid');
    });
  });

  describe('when elements are added to the DOM after initial render', () => {

    /**
     * Creates a required auro-input element for testing dynamic DOM insertion.
     * @returns {HTMLElement} A configured auro-input element.
     */
    function createInput() {
      const inputEl = document.createElement('auro-input');
      inputEl.setAttribute('name', 'testInput');
      inputEl.setAttribute('required', '');

      return inputEl;
    }

    // Detect slot change
    describe('in the case of direct children', () => {
      it('should handle slot updates for direct children', async () => {
        const el = await fixture(html`
          <auro-form>
          </auro-form>
        `);

        const inputEl = createInput();
        el.appendChild(inputEl);

        await elementUpdated(el);

        await expect(el._elements).to.have.length(1);
        await expect(el.formState).to.have.keys('testInput');
      });

      it('should have the same form state before and after slot updates', async () => {
        const el = await fixture(html`
          <auro-form>
            <auro-input name="existingInput" required></auro-input>
          </auro-form>
        `);

        const [existingInputEl] = el._elements;

        existingInputEl.focus();
        existingInputEl.value = 'existingValue';
        existingInputEl.blur();

        await elementUpdated(el);

        await expect(el.formState).to.have.keys('existingInput');
        await expect(el.value.existingInput).to.equal('existingValue');

        const newInputEl = createInput();
        el.appendChild(newInputEl);

        await elementUpdated(el);

        await expect(el.formState).to.have.keys('existingInput', 'testInput');
        await expect(el.value.existingInput).to.equal('existingValue');
      });
    });

    // MutationObserver test
    describe('in the case of nested children', () => {
      it('should handle insert updates for nested children', async () => {
        const el = await fixture(html`
          <auro-form>
            <div id="target"></div>
          </auro-form>
        `);

        const target = el.querySelector('#target');
        const inputEl = createInput();
        target.appendChild(inputEl);

        await elementUpdated(el);

        await expect(el._elements).to.have.length(1);
        await expect(el.formState).to.have.keys('testInput');
      });
    });
  });

  describe('when elements are removed from the DOM after initial render', () => {
    it('should update internal state and formState when a form element is removed', async () => {
      const el = await fixture(html`
        <auro-form>
        </auro-form>
      `);

      // Create the input element
      const inputEl = document.createElement('auro-input');

      inputEl.setAttribute('name', 'testInput');
      inputEl.setAttribute('required', '');
      el.appendChild(inputEl);

      await elementUpdated(el);

      // Validate the element is added
      await expect(el._elements).to.have.length(1);
      await expect(el.formState).to.have.keys('testInput');

      // Remove the element
      el.removeChild(inputEl);
      await elementUpdated(el);

      // Validate that the element removal is reflected correctly in the state
      await expect(el._elements).to.have.length(0);
      await expect(el.formState).to.not.have.keys('testInput');
    });

    // initializeState() prunes _initialValues of fields that no longer exist
    // in formState — otherwise apps that conditionally render fields would
    // leak captured initials indefinitely as field sets churn.
    it('prunes _initialValues when a tracked field is removed from the DOM', async () => {
      const el = await fixture(html`
        <auro-form>
          <auro-input name="willBeRemoved" value="initial"></auro-input>
        </auro-form>
      `);
      await elementUpdated(el);

      expect(el._initialValues).to.have.property('willBeRemoved');

      const inputEl = el.querySelector('auro-input[name="willBeRemoved"]');
      el.removeChild(inputEl);
      await elementUpdated(el);
      await el.updateComplete;

      expect(el._initialValues).to.not.have.property('willBeRemoved');
    });
  });

  describe('when auro-buttons are present', () => {
    it('should automatically detect type=submit buttons', async () => {
      const el = await fixture(html`
        <auro-form>
          <auro-button type="submit">Submit</auro-button>
        </auro-form>
      `);

      await elementUpdated(el);
      expect(el.submitElements).to.have.length(1);
    });

    it('should automatically detect type=reset buttons', async () => {
      const el = await fixture(html`
        <auro-form>
          <auro-button type="reset">Reset</auro-button>
        </auro-form>
      `);

      await elementUpdated(el);
      expect(el.resetElements).to.have.length(1);
    });

    it('should disable buttons when an empty required form has nothing to submit or reset', async () => {
      // Empty required field: nothing for the user to submit (constraint
      // violated) and nothing for reset to restore — both buttons disabled.
      const el = await fixture(html`
        <auro-form>
          <auro-input name="tester" required></auro-input>
          <auro-button type="submit">Submit</auro-button>
          <auro-button type="reset">Reset</auro-button>
        </auro-form>
      `);

      await elementUpdated(el);

      const [submitButton] = el.submitElements;
      const [resetButton] = el.resetElements;

      await elementUpdated(el);
      await expect(el.isInitialState).to.be.true;
      await expect(submitButton.hasAttribute("disabled")).to.be.true;
      await expect(resetButton.hasAttribute("disabled")).to.be.true;
    });

    it('should enable reset buttons when form is not in initial state', async () => {
      const el = await fixture(html`
        <auro-form>
          <auro-input name="tester"></auro-input>
          <auro-button type="reset">Reset</auro-button>
        </auro-form>
      `);

      const [button] = el.resetElements;
      await elementUpdated(el);

      // Form must transition out of initial state via a user edit; a
      // pre-filled value on its own no longer counts (matches HTML's
      // `dirtyValueFlag` semantics).
      const inputEl = el.querySelector('auro-input[name="tester"]');
      inputEl.value = 'user-typed';
      inputEl.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
      await elementUpdated(el);

      await expect(el.isInitialState).to.be.false;
      await expect(button.hasAttribute("disabled")).to.be.false;
    });

    it('should enable submit buttons when form is valid', async () => {
      const el = await fixture(html`
        <auro-form>
          <auro-input name="tester"></auro-input>
          <auro-button type="submit">Submit</auro-button>
        </auro-form>
      `);

      const [button] = el.submitElements;
      await elementUpdated(el);

      const inputEl = el.querySelector('auro-input[name="tester"]');
      inputEl.value = 'user-typed';
      inputEl.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
      await elementUpdated(el);

      await expect(el.isInitialState).to.be.false;
      await expect(el.validity).to.equal('valid');
      await expect(button.hasAttribute("disabled")).to.be.false;
    });

    it('should use the reactive _submitElements property declared in properties', async () => {
      const el = await fixture(html`
        <auro-form>
          <auro-input name="tester" value="some value"></auro-input>
          <auro-button type="submit">Submit</auro-button>
        </auro-form>
      `);

      await elementUpdated(el);

      // Verify submitElements returns the button via the reactive property
      expect(el.submitElements).to.have.length(1);
    });

    it('should attach a submit click handler to submit elements', async () => {
      const el = await fixture(html`
        <auro-form>
          <auro-input name="tester" value="some value"></auro-input>
          <auro-button type="submit">Submit</auro-button>
        </auro-form>
      `);

      const [button] = el.submitElements;

      await elementUpdated(el);

      const submitEvent = new Promise((res) => {
        el.addEventListener('submit', () => {
          res(true);
        });
      });
      await button.click();
      const eventSubmitted = await submitEvent;

      await expect(eventSubmitted).to.be.true;
    });

    it('should attach a reset click handler to reset elements', async () => {
      const el = await fixture(html`
        <auro-form>
          <auro-input name="tester" value="some value"></auro-input>
          <auro-button type="reset">Reset</auro-button>
        </auro-form>
      `);

      const [button] = el.resetElements;

      await elementUpdated(el);

      const resetEvent = new Promise((res) => {
        el.addEventListener('reset', () => {
          res(true);
        });
      });
      await button.click();
      const eventSubmitted = await resetEvent;
      await expect(eventSubmitted).to.be.true;
    });
  });

  describe('when calling submit() method', () => {
    it('should emit a submit event with the expected form values as JSON', async () => {
      const el = await fixture(html`
        <auro-form>
          <auro-input name="testInput" value="test" required></auro-input>
          <auro-input name="testInput2" value="test2" required></auro-input>
        </auro-form>
      `);

      const submitPromise = new Promise((res) => {
        el.addEventListener('submit', (event) => {
          res(event.target.value);
        });
      });

      el.submit();

      const formSubmissionValue = await submitPromise;
      await expect(formSubmissionValue).to.have.keys('testInput', 'testInput2');
      await expect(formSubmissionValue.testInput).to.equal('test');
      await expect(formSubmissionValue.testInput2).to.equal('test2');
    });
  });

  describe('Mouse Behavior', () => {
    describe('Click', () => {
      it('should submit when submit button is clicked', async () => {
        const el = await fixture(html`
          <auro-form>
            <auro-input name="tester" value="some value"></auro-input>
            <auro-button type="submit">Submit</auro-button>
          </auro-form>
        `);

        await elementUpdated(el);

        const [button] = el.submitElements;

        const submitEvent = new Promise((res) => {
          el.addEventListener('submit', () => res(true));
        });

        await button.click();

        const eventSubmitted = await submitEvent;
        await expect(eventSubmitted).to.be.true;
      });

      it('should reset when reset button is clicked', async () => {
        const el = await fixture(html`
          <auro-form>
            <auro-input name="tester" value="some value"></auro-input>
            <auro-button type="reset">Reset</auro-button>
          </auro-form>
        `);

        await elementUpdated(el);

        const [button] = el.resetElements;

        const resetEvent = new Promise((res) => {
          el.addEventListener('reset', () => res(true));
        });

        await button.click();

        const eventSubmitted = await resetEvent;
        await expect(eventSubmitted).to.be.true;
      });
    });
  });

  describe('Keyboard Behavior', () => {
    describe('Enter', () => {
      it('should submit the form when Enter is pressed on an input element', async () => {
        const el = await fixture(html`
          <auro-form>
            <auro-input name="testInput" value="test value" required></auro-input>
            <auro-input name="testInput2" value="test value 2" required></auro-input>
          </auro-form>
        `);

        const [inputEl] = el._elements;
        await elementUpdated(el);

        const submitPromise = new Promise((res) => {
          el.addEventListener('submit', (event) => {
            res(event.target.value);
          });
        });

        // Simulate Enter key press on the input
        const enterEvent = new KeyboardEvent('keydown', {
          key: 'Enter',
          bubbles: true,
          cancelable: true
        });
        inputEl.dispatchEvent(enterEvent);

        const formSubmissionValue = await submitPromise;
        await expect(formSubmissionValue).to.have.keys('testInput', 'testInput2');
        await expect(formSubmissionValue.testInput).to.equal('test value');
        await expect(formSubmissionValue.testInput2).to.equal('test value 2');
      });

      it('should prevent default Enter behavior on input elements', async () => {
        const el = await fixture(html`
          <auro-form>
            <auro-input name="testInput" value="test" required></auro-input>
          </auro-form>
        `);

        const [inputEl] = el._elements;
        await elementUpdated(el);

        let defaultPrevented = false;
        const enterEvent = new KeyboardEvent('keydown', {
          key: 'Enter',
          bubbles: true,
          cancelable: true
        });

        // Override preventDefault to track if it was called
        const originalPreventDefault = enterEvent.preventDefault.bind(enterEvent);
        enterEvent.preventDefault = () => {
          defaultPrevented = true;
          originalPreventDefault();
        };

        inputEl.dispatchEvent(enterEvent);

        await elementUpdated(el);
        await expect(defaultPrevented).to.be.true;
      });

      it('does not submit when Enter is pressed on a disabled form element', async () => {
        const el = await fixture(html`
          <auro-form>
            <auro-input name="field" value="hello" disabled></auro-input>
          </auro-form>
        `);
        await elementUpdated(el);

        let submitFired = false;
        el.addEventListener('submit', () => {
          submitFired = true;
        });

        const inputEl = el.querySelector('auro-input[name="field"]');
        inputEl.dispatchEvent(new KeyboardEvent('keydown', {
          key: 'Enter',
          bubbles: true,
          composed: true,
        }));
        await elementUpdated(el);

        expect(submitFired).to.be.false;
      });
    });
  });

  describe('Properties', () => {
    describe('value', () => {
      it('should automatically find auro elements in slot and add them to state', async () => {
        const defaultFormState = {
          testInput: {
            value: null,
            validity: null,
            required: true,
            disabled: false
          },
          dateExample: {
            value: null,
            validity: null,
            required: true,
            disabled: false
          }
        };

        const defaultFormValue = {
          testInput: null,
          dateExample: null
        };

        const el = await fixture(html`
          <auro-form>
            <auro-input name="testInput" required></auro-input>
            <auro-datepicker id="date-example" name="dateExample" required>
              <span slot="fromLabel">Choose a date</span>
              <span slot="bib.fullscreen.dateLabel">Choose a date</span>
            </auro-datepicker>
          </auro-form>
        `);

        await el.updateComplete;
        await expect(el.formState).to.deep.equal(defaultFormState);
        await expect(el.value).to.deep.equal(defaultFormValue);
        await expect(el.validity).to.equal(null);
      });

      it('should automatically populate inputs with preset values', async () => {
        const expectedFormState = {
          testInput: {
            value: "some-preset-value",
            validity: "valid",
            required: true,
            disabled: false
          }
        };

        const expectedFormValue = {
          testInput: "some-preset-value"
        };

        const el = await fixture(html`
          <auro-form>
            <auro-input name="testInput" value="some-preset-value" required></auro-input>
          </auro-form>
        `);

        await el.updateComplete;
        await expect(el.formState).to.deep.equal(expectedFormState);
        await expect(el.value).to.deep.equal(expectedFormValue);
        // Form-level validity is `null` at first render even though the
        // preset value is valid — the form is in its initial state and
        // stays quiet until the user interacts.
        await expect(el.validity).to.equal(null);
      });

      it('should update values when input events are emitted by form elements', async () => {
        const expectedFormState = {
          testInput: {
            value: "zzz",
            validity: "valid",
            required: true,
            disabled: false
          }
        };

        const expectedFormValue = {
          testInput: "zzz"
        };

        const el = await fixture(html`
          <auro-form>
            <auro-input name="testInput" value="some-preset-value" required></auro-input>
          </auro-form>
        `);

        // INTERNAL STATE KEY - FOR TESTING ONLY :)
        const [inputEl] = el._elements;

        inputEl.focus();
        inputEl.value = 'zzz';
        inputEl.blur();

        await elementUpdated(el);
        await expect(el.formState).to.deep.equal(expectedFormState);
        await expect(el.value).to.deep.equal(expectedFormValue);
        await expect(el.validity).to.equal("valid");
      });
    });

    describe('validity', () => {
      it('should update validity when events are submitted by form elements', async () => {
        const el = await fixture(html`
          <auro-form>
            <auro-input name="testInput" required></auro-input>
          </auro-form>
        `);

        await expect(el.formState).to.have.key('testInput');
        await expect(el.formState.testInput.validity).to.be.null;
        await expect(el.validity).to.be.null;

        // INTERNAL STATE KEY - used externally for testing only!
        const [inputEl] = el._elements;

        inputEl.focus();
        inputEl.value = 'zzz';
        inputEl.blur();

        await elementUpdated(el);

        await expect(el.formState.testInput.validity).to.equal('valid');
        await expect(el.validity).to.equal('valid');
      });
    });

    describe('isInitialState', () => {
      it('should return true when form is first created', async () => {
        const el = await fixture(html`<auro-form><auro-input name="testInput"></auro-input></auro-form>`);

        await expect(el.isInitialState).to.be.true;
      });

      it('should return false after an input value changes', async () => {
        const el = await fixture(html`<auro-form><auro-input name="testInput"></auro-input></auro-form>`);

        const [inputEl] = el._elements;

        inputEl.focus();
        inputEl.value = 'hello';
        inputEl.blur();

        await elementUpdated(el);

        await expect(el.isInitialState).to.be.false;
      });
    });
  });

  describe('Disabled elements', () => {
    it('omits disabled fields from form.value', async () => {
      const el = await fixture(html`
        <auro-form>
          <auro-input name="enabledField" value="hello"></auro-input>
          <auro-input name="disabledField" value="ignored" disabled></auro-input>
        </auro-form>
      `);
      await elementUpdated(el);

      expect(el.value).to.have.property('enabledField', 'hello');
      expect(el.value).to.not.have.property('disabledField');
    });

    it('omits disabled fields from the submit event payload', async () => {
      const el = await fixture(html`
        <auro-form>
          <auro-input name="enabledField"></auro-input>
          <auro-input name="disabledField" value="ignored" disabled></auro-input>
        </auro-form>
      `);

      const enabledEl = el.querySelector('auro-input[name="enabledField"]');
      enabledEl.focus();
      enabledEl.value = 'hello';
      enabledEl.blur();
      await elementUpdated(el);

      let submitDetail = null;
      el.addEventListener('submit', (event) => {
        submitDetail = event.detail;
      });

      await el.submit();

      await expect(submitDetail).to.not.be.null;
      await expect(submitDetail.value).to.have.property('enabledField', 'hello');
      await expect(submitDetail.value).to.not.have.property('disabledField');
    });

    it('does not mark the form invalid because of a disabled required field', async () => {
      const el = await fixture(html`
        <auro-form>
          <auro-input name="enabledField"></auro-input>
          <auro-input name="disabledRequired" required disabled></auro-input>
        </auro-form>
      `);

      const enabledEl = el.querySelector('auro-input[name="enabledField"]');
      enabledEl.focus();
      enabledEl.value = 'hello';
      enabledEl.blur();
      await elementUpdated(el);

      await expect(el.validity).to.not.equal('invalid');
    });

    it('does not taint isInitialState when a disabled field carries a value', async () => {
      const el = await fixture(html`
        <auro-form>
          <auro-input name="disabledField" value="hello" disabled></auro-input>
        </auro-form>
      `);
      await elementUpdated(el);

      await expect(el.isInitialState).to.be.true;
    });

    it('re-includes a field in form.value when its disabled attribute is removed', async () => {
      const el = await fixture(html`
        <auro-form>
          <auro-input name="toggleField" value="hello" disabled></auro-input>
        </auro-form>
      `);
      await elementUpdated(el);

      expect(el.value).to.not.have.property('toggleField');

      const inputEl = el.querySelector('auro-input[name="toggleField"]');
      inputEl.removeAttribute('disabled');
      await elementUpdated(el);

      expect(el.value).to.have.property('toggleField', 'hello');
    });

    // Spy on validate to prove the disabled field is never force-validated
    // during submit(), matching native HTML behavior.
    it('does not call validate(true) on disabled elements during submit', async () => {
      const el = await fixture(html`
        <auro-form>
          <auro-input name="enabledField"></auro-input>
          <auro-input name="disabledField" value="hello" disabled></auro-input>
        </auro-form>
      `);

      const enabledEl = el.querySelector('auro-input[name="enabledField"]');
      enabledEl.focus();
      enabledEl.value = 'hello';
      enabledEl.blur();
      await elementUpdated(el);

      const disabledInput = el.querySelector('auro-input[name="disabledField"]');
      const originalValidate = disabledInput.validate.bind(disabledInput);
      let disabledValidateCalls = 0;
      disabledInput.validate = (...args) => {
        disabledValidateCalls += 1;
        return originalValidate(...args);
      };

      await el.submit();

      await expect(disabledValidateCalls).to.equal(0);
    });

    // A disabled+required field must not block submission — that combination
    // is excluded from validity per the HTML spec, so the form is treated as
    // valid for submit-button enablement.
    it('enables the submit button when a disabled+required field is the only blocker', async () => {
      const el = await fixture(html`
        <auro-form>
          <auro-input name="enabledField" value="hello"></auro-input>
          <auro-input name="disabledRequired" required disabled></auro-input>
          <auro-button type="submit">Submit</auro-button>
        </auro-form>
      `);
      await elementUpdated(el);
      await el.updateComplete;

      const [submitButton] = el.submitElements;
      await expect(submitButton.hasAttribute('disabled')).to.be.false;
    });

    // Disabling a field that the user has already edited must NOT clear the
    // form's dirty state — matching HTML's `dirtyValueFlag` semantics.
    // `_setInitialState` compares each field's current value against its
    // captured initial value rather than short-circuiting on disabled.
    it('remains non-initial when a dirty field becomes disabled', async () => {
      const el = await fixture(html`
        <auro-form>
          <auro-input name="dirtyField"></auro-input>
        </auro-form>
      `);

      const inputEl = el.querySelector('auro-input[name="dirtyField"]');
      inputEl.focus();
      inputEl.value = 'typed';
      inputEl.blur();
      await elementUpdated(el);
      await expect(el.isInitialState).to.be.false;

      inputEl.setAttribute('disabled', '');
      await elementUpdated(el);
      await el.updateComplete;

      await expect(el.isInitialState).to.be.false;
    });

    // A field whose current value equals its declared default (no user
    // interaction has occurred) does not taint `isInitialState`. Confirms the
    // `_initialValues` capture vs `formState.value` comparison.
    it('considers a default-value field as initial state at first render', async () => {
      const el = await fixture(html`
        <auro-form>
          <auro-input name="preset" value="default-value"></auro-input>
        </auro-form>
      `);
      await elementUpdated(el);

      await expect(el.isInitialState).to.be.true;
    });

    // After reset, the form should report as initial regardless of any prior
    // user edits. element.reset() restores defaults, and `_initialValues`
    // persists across `initializeState` so current === initial again.
    it('returns to initial state after reset of a user-edited field', async () => {
      const el = await fixture(html`
        <auro-form>
          <auro-input name="field"></auro-input>
        </auro-form>
      `);
      const inputEl = el.querySelector('auro-input[name="field"]');
      inputEl.value = 'typed';
      inputEl.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
      await elementUpdated(el);
      expect(el.isInitialState).to.be.false;

      el.reset();
      await elementUpdated(el);
      await el.updateComplete;

      await expect(el.isInitialState).to.be.true;
    });

    // Submit-button enablement bypasses the validity gate so a pre-filled
    // valid form is submittable at first render — covers the "logged-in
    // user with pre-populated data, just clicks Submit to continue" flow.
    it('enables the submit button at first render when pre-filled with valid values', async () => {
      const el = await fixture(html`
        <auro-form>
          <auro-input name="firstName" value="Bob" required></auro-input>
          <auro-input name="lastName" value="Jones" required></auro-input>
          <auro-button type="submit">Submit</auro-button>
        </auro-form>
      `);
      await elementUpdated(el);

      // Form is in its initial state (no user edits), but ready to submit.
      await expect(el.isInitialState).to.be.true;
      const [submitButton] = el.submitElements;
      await expect(submitButton.hasAttribute('disabled')).to.be.false;
    });

    // Reset-button enablement is driven by whether any non-disabled field
    // has a value or a captured default — a pre-filled form has both, so
    // Reset is meaningful from the start.
    it('enables the reset button at first render when pre-filled with default values', async () => {
      const el = await fixture(html`
        <auro-form>
          <auro-input name="firstName" value="Bob"></auro-input>
          <auro-button type="reset">Reset</auro-button>
        </auro-form>
      `);
      await elementUpdated(el);

      const [resetButton] = el.resetElements;
      await expect(resetButton.hasAttribute('disabled')).to.be.false;
    });

    // Edge case: user edits a single field, then JS disables it. The form
    // still remembers being dirty (Decision 2), so the Reset button must
    // stay enabled even though the only field with a value is now disabled
    // — otherwise the user would have no UI path back to initial state.
    it('keeps the reset button enabled after the only edited field is disabled', async () => {
      const el = await fixture(html`
        <auro-form>
          <auro-input name="x"></auro-input>
          <auro-button type="reset">Reset</auro-button>
        </auro-form>
      `);
      await elementUpdated(el);

      const inputEl = el.querySelector('auro-input[name="x"]');
      inputEl.value = 'hello';
      inputEl.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
      await elementUpdated(el);

      const [resetButton] = el.resetElements;
      await expect(resetButton.hasAttribute('disabled')).to.be.false;

      inputEl.setAttribute('disabled', '');
      await elementUpdated(el);
      await el.updateComplete;

      await expect(el.isInitialState).to.be.false;
      await expect(resetButton.hasAttribute('disabled')).to.be.false;
    });

    // Regression: matches the "Disabling a field after user edits" example.
    // The toggle handler does BOTH `field.setAttribute('disabled', '')` AND
    // `toggle.textContent = 'Enable field'`. The textContent assignment is a
    // childList mutation on a non-form-element direct child of the form,
    // which fires the form's nested-child MutationObserver and re-runs
    // initializeState(). That re-init must not flip the form back to the
    // initial state — `_initialValues` capture preserves the original empty
    // value, so the now-typed value stays tainted.
    it('keeps the reset button enabled when a sibling button disables the edited field and changes its own text', async () => {
      const el = await fixture(html`
        <auro-form>
          <auro-input name="comment"></auro-input>
          <br />
          <auro-button id="toggle" type="button">Disable field</auro-button>
          <auro-button type="reset">Reset</auro-button>
        </auro-form>
      `);
      await elementUpdated(el);
      await el.updateComplete;

      const inputEl = el.querySelector('auro-input[name="comment"]');
      const toggle = el.querySelector('#toggle');
      await inputEl.updateComplete;
      await toggle.updateComplete;

      // Simulate a real keystroke through the inner native input.
      const nativeInput = inputEl.shadowRoot.querySelector('input');
      nativeInput.focus();
      nativeInput.value = 'hello';
      nativeInput.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
      await elementUpdated(el);
      await el.updateComplete;
      nativeInput.blur();
      await elementUpdated(el);
      await el.updateComplete;

      const [resetButton] = el.resetElements;
      await expect(el.isInitialState).to.be.false;
      await expect(resetButton.hasAttribute('disabled')).to.be.false;

      // Mirror the example's toggle handler exactly — both the attribute
      // change on the field AND the textContent change on the toggle itself.
      toggle.addEventListener('click', () => {
        inputEl.setAttribute('disabled', '');
        toggle.textContent = 'Enable field';
      });
      toggle.click();
      await elementUpdated(el);
      await el.updateComplete;
      await el.updateComplete;

      await expect(el.isInitialState).to.be.false;
      await expect(resetButton.hasAttribute('disabled')).to.be.false;
    });

    // Programmatic submit on a pre-filled valid form should fire the
    // submit event — gating on raw validity (not the public gated getter)
    // so the form isn't locked out by `isInitialState=true`.
    it('fires submit event on a pre-filled valid form without prior user edit', async () => {
      const el = await fixture(html`
        <auro-form>
          <auro-input name="firstName" value="Bob" required></auro-input>
        </auro-form>
      `);
      await elementUpdated(el);

      const submitPromise = new Promise((res) => {
        el.addEventListener('submit', (event) => res(event.detail.value));
      });

      el.submit();

      const submittedValue = await submitPromise;
      await expect(submittedValue).to.deep.equal({ firstName: 'Bob' });
    });

    // Renaming a tracked element at runtime previously left a stale key in
    // formState that `_isNameDisabled` could not resolve. The attribute
    // observer's `name` watch should re-key formState.
    it('re-keys formState when a tracked element is renamed at runtime', async () => {
      const el = await fixture(html`
        <auro-form>
          <auro-input name="originalName" value="abc"></auro-input>
        </auro-form>
      `);
      await elementUpdated(el);

      expect(el.formState).to.have.property('originalName');

      const inputEl = el.querySelector('auro-input[name="originalName"]');
      inputEl.setAttribute('name', 'renamedField');
      await elementUpdated(el);
      await el.updateComplete;

      expect(el.formState).to.not.have.property('originalName');
      expect(el.formState).to.have.property('renamedField');
    });

    // An element that initially renders without a `name` is invisible to
    // queryAuroElements() (which selects `[name]`). When the consumer adds a
    // name later, the rename path must both register the element in formState
    // AND attach the input/validation/keydown listeners; otherwise subsequent
    // typing would never propagate into formState.
    it('attaches listeners to elements that gain a name attribute after initial render', async () => {
      const el = await fixture(html`
        <auro-form>
          <auro-input id="lateName"></auro-input>
        </auro-form>
      `);
      await elementUpdated(el);

      expect(Object.keys(el.formState).length).to.equal(0);

      const inputEl = el.querySelector('auro-input#lateName');
      inputEl.setAttribute('name', 'addedLater');
      await elementUpdated(el);
      await el.updateComplete;

      expect(el.formState).to.have.property('addedLater');

      inputEl.value = 'hello';
      inputEl.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
      await elementUpdated(el);

      expect(el.formState.addedLater.value).to.equal('hello');
    });

    // Regression: a user-edited field that is then renamed must keep the
    // form non-initial. Without migrating `_initialValues` from the old name
    // to the new name, re-running initializeState() captures the typed value
    // as the new initial, current === initial under the new key, and the
    // form silently flips back to its initial state.
    it('keeps the form non-initial after a user-edited field is renamed', async () => {
      const el = await fixture(html`
        <auro-form>
          <auro-input name="originalName"></auro-input>
          <auro-button type="reset">Reset</auro-button>
        </auro-form>
      `);
      await elementUpdated(el);

      const inputEl = el.querySelector('auro-input[name="originalName"]');
      inputEl.value = 'hello';
      inputEl.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
      await elementUpdated(el);
      await el.updateComplete;

      expect(el.isInitialState).to.be.false;

      inputEl.setAttribute('name', 'renamedField');
      await elementUpdated(el);
      await el.updateComplete;

      expect(el.formState).to.have.property('renamedField');
      expect(el.formState).to.not.have.property('originalName');
      expect(el.isInitialState).to.be.false;

      const [resetButton] = el.resetElements;
      expect(resetButton.hasAttribute('disabled')).to.be.false;
    });

    // Slot-moves and framework reconciliation cycle the form through
    // disconnect/reconnect on the same element instance. The captured
    // baseline (`_initialValues`) must survive that cycle — otherwise the
    // next initializeState would re-baseline against the user's current
    // values and silently flip the form back to its initial state.
    it('preserves _initialValues across a disconnect/reconnect cycle', async () => {
      const el = document.createElement('auro-form');
      const inputEl = document.createElement('auro-input');
      inputEl.setAttribute('name', 'testInput');
      inputEl.setAttribute('value', 'captured');
      el.appendChild(inputEl);
      document.body.appendChild(el);
      await elementUpdated(el);

      expect(el._initialValues).to.have.property('testInput');
      const beforeDisconnect = { ...el._initialValues };

      document.body.removeChild(el);
      document.body.appendChild(el);

      // The bug being pinned: `disconnectedCallback` previously wiped
      // _initialValues on disconnect, which would erase the captured
      // baseline before any reconnect-driven re-init could see it.
      expect(el._initialValues).to.deep.equal(beforeDisconnect);

      // Cleanup
      document.body.removeChild(el);
    });

    // When the `name` attribute is removed entirely (rather than renamed),
    // the rename handler must drop the orphan key explicitly — otherwise
    // it would leak in _initialValues indefinitely.
    it('drops _initialValues for a field whose name attribute is removed', async () => {
      const el = await fixture(html`
        <auro-form>
          <auro-input name="willLoseName" value="original"></auro-input>
        </auro-form>
      `);
      await elementUpdated(el);
      expect(el._initialValues).to.have.property('willLoseName');

      const inputEl = el.querySelector('auro-input[name="willLoseName"]');
      inputEl.removeAttribute('name');
      await elementUpdated(el);
      await el.updateComplete;

      expect(el._initialValues).to.not.have.property('willLoseName');
      expect(el.value).to.not.have.property('willLoseName');
    });

    // Renaming a field to an existing name is a collision edge case. The
    // primary contract being pinned here is that no orphan key (the old
    // pre-rename name) is left in _initialValues afterwards.
    it('does not leak _initialValues when a rename creates a name collision', async () => {
      const el = await fixture(html`
        <auro-form>
          <auro-input name="a" value="A-value"></auro-input>
          <auro-input name="b" value="B-value"></auro-input>
        </auro-form>
      `);
      await elementUpdated(el);
      expect(Object.keys(el._initialValues).sort()).to.deep.equal(['a', 'b']);

      const inputB = el.querySelector('auro-input[name="b"]');
      inputB.setAttribute('name', 'a');
      await elementUpdated(el);
      await el.updateComplete;

      expect(el._initialValues).to.not.have.property('b');
      expect(Object.keys(el._initialValues)).to.deep.equal(['a']);
    });
  });

  describe('Slots', () => {
    describe('default', () => {
      it('should render content in the default slot', async () => {
        const el = await fixture(html`<auro-form><auro-input><span slot="label">Name</span></auro-input></auro-form>`);

        const slot = el.shadowRoot.querySelector('slot:not([name])');

        await expect(slot).to.exist;
        const assigned = slot.assignedNodes().filter((node) => node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE);

        await expect(assigned.length).to.be.greaterThan(0);
      });
    });

  });

  describe('Public Functions', () => {
    describe('reset', () => {
      it('should reset all form elements to their initial state', async () => {
        const el = await fixture(html`<auro-form><auro-input name="testInput"></auro-input></auro-form>`);

        const [inputEl] = el._elements;

        inputEl.focus();
        inputEl.value = 'hello';
        inputEl.blur();

        await elementUpdated(el);
        await expect(el.isInitialState).to.be.false;

        el.reset();
        await elementUpdated(el);
        // Wait for the nested updateComplete chain in reset()
        await el.updateComplete;
        await el.updateComplete;

        await expect(el.isInitialState).to.be.true;
      });

      // Regression: `_setInitialState` used to unconditionally write
      // `resetElement.disabled = false`, which inside reset() caused a
      // visible flicker — the button briefly switched on before the
      // deferred `setDisabledStateOnButtons` decided it should be off.
      // `setDisabledStateOnButtons` is the single source of truth for
      // button state; `_setInitialState` must not touch buttons.
      it('does not flicker reset button enablement during reset()', async () => {
        const el = await fixture(html`
          <auro-form>
            <auro-input name="testInput"></auro-input>
            <auro-button type="reset">Reset</auro-button>
          </auro-form>
        `);
        await elementUpdated(el);

        const [resetButton] = el.resetElements;

        // Force the reset button into a disabled sentinel state. If
        // _setInitialState re-acquires the bad habit of writing
        // `resetElement.disabled = false`, this sentinel flips and the
        // assertion below fails.
        resetButton.disabled = true;
        await elementUpdated(el);
        expect(resetButton.hasAttribute('disabled')).to.be.true;

        el._setInitialState();
        await elementUpdated(el);

        expect(resetButton.hasAttribute('disabled')).to.be.true;
      });
    });

    describe('submit', () => {
      it('should dispatch submit event with form values when form is valid', async () => {
        const el = await fixture(html`<auro-form><auro-input name="testInput"></auro-input></auro-form>`);

        const [inputEl] = el._elements;

        inputEl.focus();
        inputEl.value = 'hello';
        inputEl.blur();

        await elementUpdated(el);

        let submitDetail = null;
        el.addEventListener('submit', (event) => {
          submitDetail = event.detail;
        });

        await el.submit();

        await expect(submitDetail).to.not.be.null;
        await expect(submitDetail.value).to.have.property('testInput');
      });

      it('should not dispatch submit event when form is invalid', async () => {
        const el = await fixture(html`<auro-form><auro-input name="testInput" required></auro-input></auro-form>`);

        let submitFired = false;
        el.addEventListener('submit', () => {
          submitFired = true;
        });

        await el.submit();

        await expect(submitFired).to.be.false;
      });

      // Regression guard for the `_isFormValid()` rewrite that now blocks
      // only on `knownInvalid || (required && empty)` and treats `null`
      // validity as "not known invalid". The risk: an OPTIONAL field with
      // a malformed but non-empty value could slip through if its validity
      // stays `null` after submit()'s `validate(true)` pass.
      //
      // auro-input flips `type="email"` with a bad value to
      // `validity='patternMismatch'` during its updated() lifecycle, which
      // means `knownInvalid` should be true by the time `_isFormValid()`
      // reads it. If this test ever fails, the new gate is too permissive
      // and the prior shape should be restored:
      //   (validity !== 'valid' && required)
      //     || (validity !== 'valid' && value !== null)
      it('does not submit when an optional field has invalid (non-empty) input', async () => {
        const el = await fixture(html`
          <auro-form>
            <auro-input name="optionalEmail" type="email" value="not-an-email"></auro-input>
          </auro-form>
        `);
        await elementUpdated(el);

        let submitFired = false;
        el.addEventListener('submit', () => {
          submitFired = true;
        });

        await el.submit();

        expect(
          submitFired,
          'submit should be blocked on optional field with invalid value'
        ).to.be.false;

        expect(
          el._isFormValid(),
          '_isFormValid should reject the malformed value'
        ).to.be.false;
      });

      // A form whose every field is disabled has nothing to validate and
      // nothing to submit — but it should still successfully dispatch the
      // submit event with an empty payload. Disabled fields are excluded
      // from constraint validation per the HTML spec, so a `required`
      // disabled field must not block dispatch.
      it('handles all-disabled form: empty value, valid validity, submit fires with empty payload', async () => {
        const el = await fixture(html`
          <auro-form>
            <auro-input name="testInput" required disabled></auro-input>
          </auro-form>
        `);
        await elementUpdated(el);

        expect(el.value).to.deep.equal({});
        expect(el._isFormValid()).to.be.true;

        let submitDetail = null;
        el.addEventListener('submit', (event) => {
          submitDetail = event.detail;
        });

        await el.submit();

        expect(submitDetail).to.not.be.null;
        expect(submitDetail.value).to.deep.equal({});
      });
    });

    describe('register', () => {
      it('should have a static register method', async () => {
        const FormClass = customElements.get('auro-form');

        await expect(FormClass.register).to.be.a('function');
      });

      it('should register and render a custom-named form element', async () => {
        customElements.get('auro-form').register('custom-form');

        const el = await fixture(html`
          <custom-form>
            <auro-input name="testField" value="hello"></auro-input>
          </custom-form>
        `);

        expect(el.shadowRoot).to.exist;
        expect(el.shadowRoot.querySelector('form')).to.exist;
        expect(el.formState).to.have.property('testField');
      });
    });
  });

  describe('Events', () => {
    describe('input', () => {
      it('should fire input event when child element dispatches input event', async () => {
        const el = await fixture(html`
          <auro-form>
            <auro-input name="testInput"></auro-input>
          </auro-form>
        `);
        await elementUpdated(el);

        const inputEl = el.querySelector('auro-input');

        let inputEventFired = false;
        el.addEventListener('input', () => {
          inputEventFired = true;
        });

        inputEl.value = 'test value';
        inputEl.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
        await elementUpdated(el);

        await expect(inputEventFired).to.be.true;
      });

      it('input event should bubble and be composed', async () => {
        const el = await fixture(html`
          <auro-form>
            <auro-input name="field1"></auro-input>
          </auro-form>
        `);
        await elementUpdated(el);

        let eventProps = null;
        el.addEventListener('input', (e) => {
          eventProps = { bubbles: e.bubbles, composed: e.composed };
        });

        const input = el.querySelector('auro-input');
        input.value = 'test';
        input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
        await elementUpdated(el);

        expect(eventProps).to.exist;
        expect(eventProps.bubbles).to.be.true;
        expect(eventProps.composed).to.be.true;
      });
    });

    describe('change', () => {
      it('should fire change event when an input value changes', async () => {
        const el = await fixture(html`<auro-form><auro-input name="testInput"></auro-input></auro-form>`);

        const [inputEl] = el._elements;

        let changeFired = false;
        el.addEventListener('change', () => {
          changeFired = true;
        });

        inputEl.focus();
        inputEl.value = 'hello';
        inputEl.blur();

        await elementUpdated(el);

        await expect(changeFired).to.be.true;
      });
    });

    it('dispatches change event when initializeState runs', async () => {
      let changeFired = false;

      const container = document.createElement('div');
      container.addEventListener('change', () => {
        changeFired = true;
      });

      const el = await fixture(html`
        <auro-form>
          <auro-input name="field1"></auro-input>
        </auro-form>
      `, { parentNode: container });
      await elementUpdated(el);

      expect(changeFired).to.be.true;
    });

    describe('reset', () => {
      it('should fire reset event with previousValue detail', async () => {
        const el = await fixture(html`<auro-form><auro-input name="testInput"></auro-input></auro-form>`);

        const [inputEl] = el._elements;

        inputEl.focus();
        inputEl.value = 'hello';
        inputEl.blur();

        await elementUpdated(el);

        let resetDetail = null;
        el.addEventListener('reset', (event) => {
          resetDetail = event.detail;
        });

        el.reset();
        await elementUpdated(el);
        await el.updateComplete;
        await el.updateComplete;

        await expect(resetDetail).to.not.be.null;
        await expect(resetDetail.previousValue).to.have.property('testInput');
      });
    });

    describe('submit', () => {
      it('should fire submit event with value detail when form is valid', async () => {
        const el = await fixture(html`<auro-form><auro-input name="testInput"></auro-input></auro-form>`);

        const [inputEl] = el._elements;

        inputEl.focus();
        inputEl.value = 'hello';
        inputEl.blur();

        await elementUpdated(el);

        let submitDetail = null;
        el.addEventListener('submit', (event) => {
          submitDetail = event.detail;
        });

        await el.submit();

        await expect(submitDetail).to.not.be.null;
        await expect(submitDetail.value).to.have.property('testInput');
        await expect(submitDetail.value.testInput).to.equal('hello');
      });

      it('elements without name are excluded from form state', async () => {
        const el = await fixture(html`
          <auro-form>
            <auro-input name="named-field" value="hello"></auro-input>
            <auro-input value="no-name"></auro-input>
          </auro-form>
        `);
        await elementUpdated(el);

        // Named field should be in form state
        expect(el.formState['named-field']).to.exist;

        // Unnamed field should not be tracked
        const stateKeys = Object.keys(el.formState);
        expect(stateKeys.length).to.equal(1);
      });

      it('attribute-based element matching registers elements with tag-name attribute', async () => {
        const el = await fixture(html`
          <auro-form>
            <custom-element auro-input name="customField" value="test"></custom-element>
          </auro-form>
        `);
        await elementUpdated(el);

        // The form's _isElementTag checks hasAttribute(tagName),
        // so a <custom-element auro-input> should match the 'auro-input' tag selector
        const matches = el._elements.some((element) => element.getAttribute('name') === 'customField');
        expect(matches).to.be.true;
      });
    });
  });

  describe('Private Functions', () => {
    // ─── _addElementToState deduplication guard ────────────────────────
    it('_addElementToState does not overwrite existing element', async () => {
      const el = await fixture(html`
        <auro-form>
          <auro-input name="dupInput"></auro-input>
        </auro-form>
      `);
      await elementUpdated(el);

      // The element is already registered in formState
      const originalState = el.formState['dupInput'];
      await expect(originalState).to.exist;

      // Call _addElementToState again with same name - should be a no-op
      const inputEl = el.querySelector('auro-input[name="dupInput"]');
      el._addElementToState(inputEl);

      // State should remain the same reference
      await expect(el.formState['dupInput']).to.equal(originalState);
    });

    // ─── handleKeyDown textarea exemption ──────────────────────────────
    it('handleKeyDown does not submit when Enter is pressed on textarea', async () => {
      const el = await fixture(html`
        <auro-form>
          <auro-input name="testInput" textarea></auro-input>
        </auro-form>
      `);
      await elementUpdated(el);

      let submitted = false;
      el.addEventListener('submit', () => {
        submitted = true;
      });

      const inputEl = el.querySelector('auro-input');
      inputEl.value = 'test';
      await elementUpdated(el);

      // Dispatch Enter on the textarea element
      inputEl.dispatchEvent(new KeyboardEvent('keydown', {
        key: 'Enter',
        bubbles: true,
        composed: true
      }));
      await elementUpdated(el);

      await expect(submitted).to.be.false;
    });

    // ─── sharedInputListener range datepicker values ───────────────────
    it('sharedInputListener stores values for range datepicker', async () => {
      const el = await fixture(html`
        <auro-form>
          <auro-datepicker name="dates" range></auro-datepicker>
        </auro-form>
      `);
      await elementUpdated(el);

      const datepicker = el.querySelector('auro-datepicker');
      datepicker.value = '01/15/2024';
      datepicker.valueEnd = '01/20/2024';

      // Fire input event to trigger sharedInputListener
      datepicker.dispatchEvent(new Event('input', {
        bubbles: true,
        composed: true
      }));
      await elementUpdated(el);

      // formState should use .values for range datepicker
      await expect(el.formState['dates']).to.exist;
    });

    // ─── sharedInputListener adds unknown element to state ─────────────
    it('sharedInputListener adds element to state when not already tracked', async () => {
      const el = await fixture(html`
        <auro-form>
          <auro-input name="field1" label="Field"></auro-input>
        </auro-form>
      `);
      await elementUpdated(el);

      const input = el.querySelector('auro-input');

      // Remove from formState to simulate an element that fires input before initializeState runs
      delete el.formState['field1'];

      // Fire input event — sharedInputListener should re-add to formState
      input.dispatchEvent(new Event('input', {
        bubbles: true,
        composed: true
      }));
      await elementUpdated(el);

      await expect(el.formState['field1']).to.exist;
    });
  });

  describe('A11Y', () => {
    it('should be accessible', async () => {
      const el = await fixture(html`
        <auro-form></auro-form>
      `);

      await expect(el).to.be.accessible();
    });
  });
}

// Desktop Test Suite
describe('auro-form', () => {
  runFullTest(false);
});

// Mobile Test Suite
describe('auro-form in small viewport', () => {
  runFullTest(true);
});

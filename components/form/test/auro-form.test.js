/* eslint-disable no-underscore-dangle,max-lines,array-element-newline */

import {fixture, html, expect, elementUpdated} from '@open-wc/testing';

// !AURO ELEMENT REGISTRATION MUST BE DONE BEFORE AURO FORM REGISTRATION! //
import '../demo/registerDemoDeps.js';
import '../src/index.js';

describe('auro-form', () => {
  it('is accessible', async () => {
    const el = await fixture(html`
      <auro-form></auro-form>
    `);

    await expect(el).to.be.accessible();
  });

  it('has a customElement definition', async () => {
    await customElements.whenDefined("auro-form");
    const el = Boolean(customElements.get("auro-form"));

    await expect(el).to.be.true;
  });

  // Automatic input state behavior
  // -------------------------------------

  it('automatically finds specified auro elements in slot and adds to state', async () => {
    const defaultFormState = {
      testInput: {
        value: null,
        validity: null,
        required: true
      },
      dateExample: {
        value: null,
        validity: null,
        required: true
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
          <span slot="mobileDateLabel">Choose a date</span>
        </auro-datepicker>
      </auro-form>
    `);

    await el.updateComplete;
    await expect(el.formState).to.deep.equal(defaultFormState);
    await expect(el.value).to.deep.equal(defaultFormValue);
    await expect(el.validity).to.equal(null);
  });

  it('automatically populates inputs with preset values', async () => {
    const expectedFormState = {
      testInput: {
        value: "some-preset-value",
        validity: "valid",
        required: true
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
    await expect(el.validity).to.equal("valid");
  });

  it('updates values when input events are emitted by form elements', async () => {
    const expectedFormState = {
      testInput: {
        value: "zzz",
        validity: "valid",
        required: true
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

  it('updates validity when events are submitted by form elements', async () => {
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

  describe('when given multiple inputs', () => {
    it('has INVALID state when two or more required inputs are present, and only one is populated', async () => {
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

    it('has VALID state when two or more inputs are present, and only one is required', async () => {
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

  describe('when auro-buttons are present', () => {
    it('picks up type=submit buttons automatically', async () => {
      const el = await fixture(html`
        <auro-form>
          <auro-button type="submit">Submit</auro-button>
        </auro-form>
      `);

      await elementUpdated(el);
      expect(el.submitElements).to.have.length(1);
    });

    it('picks up type=reset buttons automatically', async () => {
      const el = await fixture(html`
        <auro-form>
          <auro-button type="reset">Reset</auro-button>
        </auro-form>
      `);

      await elementUpdated(el);
      expect(el.resetElements).to.have.length(1);
    });

    it('disables buttons when form is in initial state', async () => {
      const el = await fixture(html`
        <auro-form>
          <auro-input name="tester"></auro-input>
          <auro-button type="submit">Reset</auro-button>
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

    it('enables reset buttons when form is not in initial state', async () => {
      const el = await fixture(html`
        <auro-form>
          <auro-input name="tester" value="some value"></auro-input>
          <auro-button type="reset">Reset</auro-button>
        </auro-form>
      `);

      const [button] = el.resetElements;

      await elementUpdated(el);
      await expect(el.isInitialState).to.be.false;
      await expect(button.hasAttribute("disabled")).to.be.false;
    });

    it('enables submit buttons when form is valid', async () => {
      const el = await fixture(html`
        <auro-form>
          <auro-input name="tester" value="some value"></auro-input>
          <auro-button type="submit">Submit</auro-button>
        </auro-form>
      `);

      const [button] = el.submitElements;

      await elementUpdated(el);
      await expect(el.isInitialState).to.be.false;
      await expect(el.validity).to.equal('valid');
      await expect(button.hasAttribute("disabled")).to.be.false;
    });

    it('attaches submit click handler to submit elements', async () => {
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

    it('attaches reset click handler to reset elements', async () => {
      const el = await fixture(html`
        <auro-form>
          <auro-input name="tester" value="some value"></auro-input>
          <auro-button type="reset">Submit</auro-button>
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
    it('emits a "submit" event and has the expected `<element>.value` JSON object', async () => {
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

  describe('when calling reset() method', () => {
    it('emits a "reset" event', async () => {
      const el = await fixture(html`
        <auro-form>
          <auro-input name="testInput" required></auro-input>
          <auro-input name="testInput2" value="prefilled-value" required></auro-input>
        </auro-form>
      `);

      const resetEventPromise = new Promise((res) => {
        el.addEventListener('reset', (event) => {
          res(event.detail.previousValue);
        });
      });

      const [inputEl, inputEl2] = el._elements;

      inputEl.focus();
      inputEl.value = 'zzz';
      inputEl.blur();

      inputEl2.focus();
      inputEl.value = 'zzzzz';
      inputEl.blur();

      el.reset();

      await elementUpdated(el);

      await resetEventPromise;
      await expect(el.value).to.have.keys('testInput', 'testInput2');
      await expect(el.value.testInput).to.equal(null);
      await expect(el.value.testInput2).to.equal('prefilled-value');
    });
  });
});

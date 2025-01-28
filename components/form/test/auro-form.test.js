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
    // eslint-disable-next-line no-underscore-dangle
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
    // eslint-disable-next-line no-underscore-dangle
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

      // INTERNAL STATE KEY - used externally for testing only!
      // eslint-disable-next-line no-underscore-dangle
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

      // INTERNAL STATE KEY - used externally for testing only!
      // eslint-disable-next-line no-underscore-dangle
      const [inputEl] = el._elements;

      inputEl.focus();
      inputEl.value = 'zzz';
      inputEl.blur();

      await elementUpdated(el);

      await expect(el.formState.testInput.validity).to.equal('valid');
      await expect(el.validity).to.equal('valid');
    });
  });
});

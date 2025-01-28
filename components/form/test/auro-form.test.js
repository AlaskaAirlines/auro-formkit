import { fixture, html, expect } from '@open-wc/testing';

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
    await expect(JSON.stringify(el.formState)).to.equal(JSON.stringify(defaultFormState));
    await expect(JSON.stringify(el.value)).to.equal(JSON.stringify(defaultFormValue));
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
    await expect(JSON.stringify(el.formState)).to.equal(JSON.stringify(expectedFormState));
    await expect(JSON.stringify(el.value)).to.equal(JSON.stringify(expectedFormValue));
    await expect(el.validity).to.equal("valid");
  });
});

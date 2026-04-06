/* eslint-disable max-statements */
/* eslint-disable no-console */
/* eslint-disable one-var */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-lines */
import { fixture, html, expect, elementUpdated } from '@open-wc/testing';
import '../src/registered.js';

describe('auro-checkbox-group', () => {

  describe('Rendering', () => {
    // Add missing tests
  });

  describe('User Stories', () => {
    // Add missing tests

    it('should fire an input event with correct data when a checkbox is selected', async () => {
      const el = await fixture(html`
        <auro-checkbox-group>
          <auro-checkbox
            id="alaska"
            name="states"
            value="alaska"
          >Alaska</auro-checkbox>

          <auro-checkbox
            id="washington"
            name="states"
            value="washington"
          >Washington</auro-checkbox>
        </auro-checkbox-group>
      `);

      const alaskaCheckbox = el.querySelector("auro-checkbox[id=alaska]"),
        alaskaCheckboxInput = alaskaCheckbox.shadowRoot.querySelector('input');

      let result = false;

      el.addEventListener('input', (event) => {
        result = event.target.checked;
      });

      alaskaCheckboxInput.click();

      expect(result).to.be.true;
    });

    it('should uncheck a checkbox after it has been selected', async () => {
      const el = await fixture(html`
        <auro-checkbox
          id="alaska"
          name="states-unchecking"
          value="alaska"
        >Alaska</auro-checkbox>
      `);

      const alaskaCheckbox = el,
        alaskaCheckboxInput = alaskaCheckbox.shadowRoot.querySelector('input');

      alaskaCheckboxInput.click();
      alaskaCheckboxInput.dispatchEvent(new Event('input'));
      await alaskaCheckbox.updateComplete;
      expect(alaskaCheckboxInput.hasAttribute('checked')).to.be.true;

      alaskaCheckbox.checked = false;
      await alaskaCheckbox.updateComplete;
      expect(alaskaCheckboxInput.hasAttribute('checked'), 'the shadow input was not unchecked').to.be.false;
    });

    it('should allow selecting multiple checkboxes simultaneously', async () => {
      const el = await fixture(html`
        <auro-checkbox-group>
          <auro-checkbox
            id="alaska"
            name="states"
            value="alaska"
          >Alaska</auro-checkbox>

          <auro-checkbox
            id="washington"
            name="states"
            value="washington"
          >Washington</auro-checkbox>
        </auro-checkbox-group>
      `);

      const alaskaCheckbox = el.querySelector("auro-checkbox[id=alaska]"),
        alaskaCheckboxInput = alaskaCheckbox.shadowRoot.querySelector('input'),
        washingtonCheckbox = el.querySelector("auro-checkbox[id=washington]"),
        washingtonCheckboxInput = washingtonCheckbox.shadowRoot.querySelector('input');

      expect(alaskaCheckbox.checked).to.not.be.true;
      expect(washingtonCheckbox.checked).to.not.be.true;

      alaskaCheckboxInput.click();
      washingtonCheckboxInput.click();
      await elementUpdated(el);

      // Selecting the first radio button should make it `checked`
      expect(alaskaCheckbox.checked).to.be.true;
      expect(washingtonCheckbox.checked).to.be.true;
    });
  });

  describe('Properties', () => {
    describe('appearance', () => {
        // add tests for this property
    });

    describe('disabled', () => {
      it('should control child checkbox state after a slot change', async () => {
        const el = await fixture(html`
            <auro-checkbox-group disabled required error="Test message">
            <auro-checkbox
                id="alaska"
                name="states"
                value="alaska"
            >Alaska</auro-checkbox>
            <auro-checkbox
                id="washington"
                name="states"
                value="washington"
            >Washington</auro-checkbox>
            </auro-checkbox-group>
        `);

        const checkboxes = el.querySelectorAll('auro-checkbox');

        checkboxes.forEach((checkbox) => {
          expect(checkbox.disabled).to.be.true;
          expect(checkbox.error).to.be.true;
        });
      });

      it('should update disabled and error states on child checkboxes', async () => {
        const el = await fixture(html`
            <auro-checkbox-group>
            <auro-checkbox
                id="alaska"
                name="states"
                value="alaska"
                checked
            >Alaska</auro-checkbox>

            <auro-checkbox
                id="washington"
                name="states"
                value="washington"
            >Washington</auro-checkbox>
            </auro-checkbox-group>
        `);

        el.disabled = true;
        el.required = true;
        el.error = "This is an error";

        await elementUpdated(el);

        const checkboxes = el.querySelectorAll('auro-checkbox');

        checkboxes.forEach((checkbox) => {
          expect(checkbox.disabled, "child disabled state was not updated").to.be.true;
          expect(checkbox.error, "child error state was not updated").to.be.true;
        });
      });

      it('should update disabled state correctly on individual checkboxes', async () => {
        const el = await fixture(html`
            <auro-checkbox-group>
            <auro-checkbox
                id="alaska"
                name="states"
                value="alaska"
                disabled
            >Alaska</auro-checkbox>

            <auro-checkbox
                id="washington"
                name="states"
                value="washington"
            >Washington</auro-checkbox>
            </auro-checkbox-group>
        `);

        const alaskaCheckbox = document.getElementById('alaska');
        const washingtonCheckbox = document.getElementById('washington');

        expect(alaskaCheckbox.disabled).to.be.true;
        expect(washingtonCheckbox.disabled).to.be.false;

        el.disabled = true;

        await elementUpdated(el);

        expect(alaskaCheckbox.disabled).to.be.true;
        expect(washingtonCheckbox.disabled).to.be.true;

        el.disabled = false;

        await elementUpdated(el);

        expect(alaskaCheckbox.disabled).to.be.false;
        expect(washingtonCheckbox.disabled).to.be.false;
      });
    });

    describe('error', () => {
      it('should have the expected properties and validity in error state', async () => {
        const el = await fixture(html`
            <auro-checkbox-group error="custom error message">
            <auro-checkbox
                id="alaska"
                name="states"
                value="alaska"
            >Alaska</auro-checkbox>

            <auro-checkbox
                id="washington"
                name="states"
                value="washington"
            >Washington</auro-checkbox>
            </auro-checkbox-group>
        `);

        expect(el.hasAttribute('error')).to.be.true;
        expect(el.hasAttribute('aria-invalid')).to.be.true;
        expect(el.validity).to.equal('customError');

        el.removeAttribute('error');

        await elementUpdated(el);

        expect(el.hasAttribute('error')).to.be.false;
        expect(el.hasAttribute('aria-invalid')).to.be.false;
        expect(el.validity).to.equal('valid');
      });
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

    describe('required', () => {
      it('should have the expected properties and validity in required state', async () => {
        const el = await fixture(html`
            <auro-checkbox-group required>
            <auro-checkbox
                id="alaska"
                name="states"
                value="alaska"
            >Alaska</auro-checkbox>

            <auro-checkbox
                id="washington"
                name="states"
                value="washington"
            >Washington</auro-checkbox>
            </auro-checkbox-group>
        `);

        expect(el.required).to.be.true;
        expect(el.ariaRequired).to.equal('true');

        const alaskaCheckbox = el.querySelector("auro-checkbox[id=alaska]");

        alaskaCheckbox.shadowRoot.querySelector('input').click();

        await elementUpdated(el);

        expect(el.validity).to.equal('valid');

        alaskaCheckbox.shadowRoot.querySelector('input').click();

        await elementUpdated(el);

        expect(el.validity).to.equal('valueMissing');
      });
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
      it('should expose .value as an array of checked option strings', async () => {
        const el = await fixture(html`
            <auro-checkbox-group>
            <auro-checkbox
                id="alaska"
                name="states"
                value="alaska"
            >Alaska</auro-checkbox>
            <auro-checkbox
                id="washington"
                name="states"
                value="washington"
            >Washington</auro-checkbox>
            </auro-checkbox-group>
        `);

        const alaskaCheckbox = el.querySelector("auro-checkbox[id=alaska]"),
          alaskaCheckboxInput = alaskaCheckbox.shadowRoot.querySelector('input');

        // Click the first checkbox
        alaskaCheckboxInput.click();

        await expect(el.value).to.eql(['alaska']);
      });

      it('should reset value to an empty array when calling reset()', async () => {
        const el = await fixture(html`
            <auro-checkbox-group>
            <auro-checkbox
                id="alaska"
                name="states"
                value="alaska"
            >Alaska</auro-checkbox>
            <auro-checkbox
                id="washington"
                name="states"
                type="radio"
                value="washington"
            >Washington</auro-checkbox>
            </auro-checkbox-group>
        `);

        const alaskaCheckbox = el.querySelector("auro-checkbox[id=alaska]"),
          alaskaCheckboxInput = alaskaCheckbox.shadowRoot.querySelector('input');

        const group = document.querySelector('auro-checkbox-group');

        // Click the first checkbox
        alaskaCheckboxInput.click();

        await elementUpdated(el);

        expect(alaskaCheckbox.checked).to.be.true;
        expect(group.value).to.eql(['alaska']);

        group.reset();

        await elementUpdated(el);

        expect(group.value).to.eql(undefined);
      });
    });
  });

  describe('AllY', () => {
    // Add missing tests
  });

  describe('Mouse Behavior', () => {
    // Add missing tests
  });

  describe('Keyboard Behavior', () => {
    // Add missing tests
  });
});

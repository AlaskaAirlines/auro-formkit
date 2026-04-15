/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-lines */
/* no-warning-comments */
import { fixture, html, expect, elementUpdated } from '@open-wc/testing';
import { setViewport } from '@web/test-runner-commands';
import designTokens from '@aurodesignsystem/design-tokens/dist/legacy/auro-classic/JSONVariablesFlat.json' with { type: 'json' };
import '../src/registered.js';

const mobileBreakpointWidth = parseInt(designTokens['ds-grid-breakpoint-sm'], 10) - 1;

/**
 * Runs the full checkbox-group test suite for a given viewport mode.
 * @param {boolean} mobileView - Whether tests should run in small or large viewport mode.
 * @returns {void}
 */
function runFullTest(mobileView) {
  before(async () => {
    await setViewport(mobileView ? { width: mobileBreakpointWidth, height: 800 } : { width: 800, height: 800 });
  });


  describe('Rendering', () => {
    it('should render a shadow root with a fieldset', async () => {
      const el = await fixture(html`
        <auro-checkbox-group>
          <span slot="legend">Options</span>
          <auro-checkbox value="one">One</auro-checkbox>
        </auro-checkbox-group>
      `);

      expect(el.shadowRoot).to.exist;
      expect(el.shadowRoot.querySelector('fieldset')).to.exist;
    });

    it('should render the legend inside a fieldset', async () => {
      const el = await fixture(html`
        <auro-checkbox-group>
          <span slot="legend">Options</span>
          <auro-checkbox value="one">One</auro-checkbox>
        </auro-checkbox-group>
      `);

      const legend = el.shadowRoot.querySelector('legend');

      expect(legend).to.exist;
    });

    it('should show (optional) label when not required', async () => {
      const el = await fixture(html`
        <auro-checkbox-group>
          <span slot="legend">Options</span>
          <auro-checkbox value="one">One</auro-checkbox>
        </auro-checkbox-group>
      `);

      const optionalSlot = el.shadowRoot.querySelector('slot[name="optionalLabel"]');

      expect(optionalSlot).to.exist;
    });

    it('should hide (optional) label when required', async () => {
      const el = await fixture(html`
        <auro-checkbox-group required>
          <span slot="legend">Options</span>
          <auro-checkbox value="one">One</auro-checkbox>
        </auro-checkbox-group>
      `);

      const legend = el.shadowRoot.querySelector('legend');
      const optionalSlot = legend.querySelector('slot[name="optionalLabel"]');

      expect(optionalSlot).to.not.exist;
    });
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
      it('should default appearance to default', async () => {
        const el = await fixture(html`
          <auro-checkbox-group>
            <auro-checkbox value="one">One</auro-checkbox>
          </auro-checkbox-group>
        `);

        expect(el.appearance).to.equal('default');
      });

      it('should propagate appearance to child checkboxes', async () => {
        const el = await fixture(html`
          <auro-checkbox-group appearance="inverse">
            <auro-checkbox value="one">One</auro-checkbox>
            <auro-checkbox value="two">Two</auro-checkbox>
          </auro-checkbox-group>
        `);

        const checkboxes = el.querySelectorAll('auro-checkbox');

        checkboxes.forEach((cb) => {
          expect(cb.appearance).to.equal('inverse');
        });
      });
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
      it('should default horizontal to false', async () => {
        const el = await fixture(html`
          <auro-checkbox-group>
            <auro-checkbox value="one">One</auro-checkbox>
          </auro-checkbox-group>
        `);

        expect(el.horizontal).to.be.false;
      });

      it('should reflect the horizontal attribute', async () => {
        const el = await fixture(html`
          <auro-checkbox-group horizontal>
            <auro-checkbox value="one">One</auro-checkbox>
            <auro-checkbox value="two">Two</auro-checkbox>
          </auro-checkbox-group>
        `);

        expect(el.horizontal).to.be.true;
        expect(el.hasAttribute('horizontal')).to.be.true;
      });

      it('should apply displayFlex class when horizontal and checkboxes count is within max', async () => {
        const el = await fixture(html`
          <auro-checkbox-group horizontal>
            <auro-checkbox value="one">One</auro-checkbox>
            <auro-checkbox value="two">Two</auro-checkbox>
          </auro-checkbox-group>
        `);

        const fieldset = el.shadowRoot.querySelector('fieldset');

        expect(fieldset.classList.contains('displayFlex')).to.be.true;
      });

      it('should not apply displayFlex class when horizontal and checkboxes exceed max', async () => {
        const el = await fixture(html`
          <auro-checkbox-group horizontal>
            <auro-checkbox value="one">One</auro-checkbox>
            <auro-checkbox value="two">Two</auro-checkbox>
            <auro-checkbox value="three">Three</auro-checkbox>
            <auro-checkbox value="four">Four</auro-checkbox>
          </auro-checkbox-group>
        `);

        const fieldset = el.shadowRoot.querySelector('fieldset');

        expect(fieldset.classList.contains('displayFlex')).to.be.false;
      });
    });

    describe('noValidate', () => {
      it('should default noValidate to falsy', async () => {
        const el = await fixture(html`
          <auro-checkbox-group>
            <auro-checkbox value="one">One</auro-checkbox>
          </auro-checkbox-group>
        `);

        expect(el.noValidate).to.not.be.true;
      });

      it('should reflect the noValidate attribute', async () => {
        const el = await fixture(html`
          <auro-checkbox-group noValidate>
            <auro-checkbox value="one">One</auro-checkbox>
          </auro-checkbox-group>
        `);

        expect(el.noValidate).to.be.true;
        expect(el.hasAttribute('novalidate')).to.be.true;
      });
    });

    describe('onDark', () => {
      it('should default onDark to false', async () => {
        const el = await fixture(html`
          <auro-checkbox-group>
            <auro-checkbox value="one">One</auro-checkbox>
          </auro-checkbox-group>
        `);

        expect(el.onDark).to.be.false;
      });

      it('should propagate onDark to child checkboxes', async () => {
        const el = await fixture(html`
          <auro-checkbox-group onDark>
            <auro-checkbox value="one">One</auro-checkbox>
            <auro-checkbox value="two">Two</auro-checkbox>
          </auro-checkbox-group>
        `);

        const checkboxes = el.querySelectorAll('auro-checkbox');

        checkboxes.forEach((cb) => {
          expect(cb.onDark).to.be.true;
        });
      });
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
      it('should accept a custom validity message string', async () => {
        const el = await fixture(html`
          <auro-checkbox-group setCustomValidity="Custom message">
            <auro-checkbox value="one">One</auro-checkbox>
          </auro-checkbox-group>
        `);

        expect(el.setCustomValidity).to.equal('Custom message');
      });
    });

    describe('setCustomValidityCustomError', () => {
      it('should accept a custom error validity message', async () => {
        const el = await fixture(html`
          <auro-checkbox-group setCustomValidityCustomError="Custom error msg">
            <auro-checkbox value="one">One</auro-checkbox>
          </auro-checkbox-group>
        `);

        expect(el.setCustomValidityCustomError).to.equal('Custom error msg');
      });
    });

    describe('setCustomValidityValueMissing', () => {
      it('should accept a custom value missing validity message', async () => {
        const el = await fixture(html`
          <auro-checkbox-group setCustomValidityValueMissing="Please select one">
            <auro-checkbox value="one">One</auro-checkbox>
          </auro-checkbox-group>
        `);

        expect(el.setCustomValidityValueMissing).to.equal('Please select one');
      });
    });

    describe('validity', () => {
      it('should default validity to undefined', async () => {
        const el = await fixture(html`
          <auro-checkbox-group>
            <auro-checkbox value="one">One</auro-checkbox>
          </auro-checkbox-group>
        `);

        expect(el.validity).to.be.undefined;
      });

      it('should be valid when a required group has a checked checkbox', async () => {
        const el = await fixture(html`
          <auro-checkbox-group required>
            <auro-checkbox value="one" checked>One</auro-checkbox>
          </auro-checkbox-group>
        `);

        expect(el.validity).to.equal('valid');
      });

      it('should set error on child checkboxes when validity is not valid', async () => {
        const el = await fixture(html`
          <auro-checkbox-group error="Error">
            <auro-checkbox value="one">One</auro-checkbox>
            <auro-checkbox value="two">Two</auro-checkbox>
          </auro-checkbox-group>
        `);

        const checkboxes = el.querySelectorAll('auro-checkbox');

        checkboxes.forEach((cb) => {
          expect(cb.error).to.be.true;
        });
      });

      it('should clear error on child checkboxes when validity becomes valid', async () => {
        const el = await fixture(html`
          <auro-checkbox-group error="Error">
            <auro-checkbox value="one">One</auro-checkbox>
          </auro-checkbox-group>
        `);

        expect(el.querySelector('auro-checkbox').error).to.be.true;

        el.removeAttribute('error');
        await elementUpdated(el);

        expect(el.querySelector('auro-checkbox').error).to.not.be.true;
      });
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

      it('should populate value from pre-checked checkboxes on init', async () => {
        const el = await fixture(html`
          <auro-checkbox-group>
            <auro-checkbox value="one" checked>One</auro-checkbox>
            <auro-checkbox value="two">Two</auro-checkbox>
          </auro-checkbox-group>
        `);

        expect(el.value).to.eql(['one']);
      });

      it('should populate value from multiple pre-checked checkboxes on init', async () => {
        const el = await fixture(html`
          <auro-checkbox-group>
            <auro-checkbox value="one" checked>One</auro-checkbox>
            <auro-checkbox value="two" checked>Two</auro-checkbox>
          </auro-checkbox-group>
        `);

        expect(el.value).to.eql(['one', 'two']);
      });
    });

    describe('touched', () => {
      it('should default to false', async () => {
        const el = await fixture(html`
          <auro-checkbox-group>
            <auro-checkbox value="one">One</auro-checkbox>
          </auro-checkbox-group>
        `);

        expect(el.touched).to.be.false;
      });

      it('should become true after a child checkbox receives focus', async () => {
        const el = await fixture(html`
          <auro-checkbox-group>
            <auro-checkbox value="one">One</auro-checkbox>
          </auro-checkbox-group>
        `);

        expect(el.touched).to.be.false;

        const cb = el.querySelector('auro-checkbox');
        cb.click();
        await elementUpdated(el);

        expect(el.touched).to.be.true;
      });
    });
  });

  describe('Slots', () => {
    describe('default', () => {
      it('should render content in the default slot', async () => {
        const el = await fixture(html`<auro-checkbox-group><span slot="legend">Select options</span><auro-checkbox value="one">One</auro-checkbox></auro-checkbox-group>`);

        const slot = el.shadowRoot.querySelector('slot:not([name])');

        await expect(slot).to.exist;
        const assigned = slot.assignedNodes().filter((node) => node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE);

        await expect(assigned.length).to.be.greaterThan(0);
      });
    });

    describe('legend', () => {
      it('should render content in the legend slot', async () => {
        const el = await fixture(html`<auro-checkbox-group><span slot="legend">Select options</span><auro-checkbox value="one">One</auro-checkbox></auro-checkbox-group>`);

        const slotContent = el.querySelector('[slot="legend"]');

        await expect(slotContent).to.exist;
      });
    });

    describe('optionalLabel', () => {
      it('should render content in the optionalLabel slot', async () => {
        const el = await fixture(html`<auro-checkbox-group><span slot="legend">Pick</span><span slot="optionalLabel">(optional)</span><auro-checkbox value="one">One</auro-checkbox></auro-checkbox-group>`);

        const slotContent = el.querySelector('[slot="optionalLabel"]');

        await expect(slotContent).to.exist;
      });
    });

    describe('helpText', () => {
      it('should render content in the helpText slot', async () => {
        const el = await fixture(html`<auro-checkbox-group><span slot="legend">Pick</span><span slot="helpText">Choose any</span><auro-checkbox value="one">One</auro-checkbox></auro-checkbox-group>`);

        const slotContent = el.querySelector('[slot="helpText"]');

        await expect(slotContent).to.exist;
      });
    });

    describe('slotchange', () => {
      it('should update checkboxes array when a new checkbox is dynamically added', async () => {
        const el = await fixture(html`
          <auro-checkbox-group>
            <auro-checkbox value="one">One</auro-checkbox>
            <auro-checkbox value="two">Two</auro-checkbox>
          </auro-checkbox-group>
        `);

        expect(el.checkboxes.length).to.equal(2);

        const newCb = document.createElement('auro-checkbox');
        newCb.value = 'three';
        newCb.textContent = 'Three';
        el.appendChild(newCb);

        await elementUpdated(el);
        // slotchange is async — allow it to fire
        await new Promise((resolve) => setTimeout(resolve, 0));

        expect(el.checkboxes.length).to.equal(3);
      });

      it('should propagate group disabled state to dynamically added checkboxes', async () => {
        const el = await fixture(html`
          <auro-checkbox-group disabled>
            <auro-checkbox value="one">One</auro-checkbox>
          </auro-checkbox-group>
        `);

        const newCb = document.createElement('auro-checkbox');
        newCb.value = 'two';
        newCb.textContent = 'Two';
        el.appendChild(newCb);

        await elementUpdated(el);
        // slotchange is async
        await new Promise((resolve) => setTimeout(resolve, 0));

        // After slotchange, handleItems rebuilds the array
        expect(el.checkboxes.length).to.equal(2);

        // Toggling disabled off then on forces updated() to propagate to all children
        el.disabled = false;
        await elementUpdated(el);
        el.disabled = true;
        await elementUpdated(el);

        expect(newCb.disabled).to.be.true;
      });
    });

  });

  describe('Public Functions', () => {
    describe('register', () => {
      it('should have a static register method', () => {
        expect(typeof customElements.get('auro-checkbox-group').register).to.equal('function');
      });

      it('should register the component with a custom name', async () => {
        customElements.get('auro-checkbox-group').register('custom-checkbox-group');

        const el = await fixture(html`
          <custom-checkbox-group>
            <auro-checkbox value="one">One</auro-checkbox>
          </custom-checkbox-group>
        `);

        expect(el.shadowRoot).to.exist;
        expect(el.shadowRoot.querySelector('fieldset')).to.exist;
      });
    });

    describe('reset', () => {
      it('should reset all child checkboxes and validation state', async () => {
        const el = await fixture(html`
          <auro-checkbox-group required>
            <auro-checkbox value="one">One</auro-checkbox>
            <auro-checkbox value="two">Two</auro-checkbox>
          </auro-checkbox-group>
        `);

        const cb = el.querySelector('auro-checkbox');
        cb.shadowRoot.querySelector('input').click();
        await elementUpdated(el);

        expect(cb.checked).to.be.true;
        expect(el.value).to.eql(['one']);

        el.reset();
        await elementUpdated(el);

        expect(cb.checked).to.be.false;
        expect(cb.error).to.not.be.true;
      });
    });

    describe('validate', () => {
      it('should set validity to valueMissing when required and nothing checked', async () => {
        const el = await fixture(html`
          <auro-checkbox-group required>
            <auro-checkbox value="one">One</auro-checkbox>
          </auro-checkbox-group>
        `);

        el.validate(true);
        await elementUpdated(el);

        expect(el.validity).to.equal('valueMissing');
      });

      it('should set validity to valid when required and a checkbox is checked', async () => {
        const el = await fixture(html`
          <auro-checkbox-group required>
            <auro-checkbox value="one" checked>One</auro-checkbox>
          </auro-checkbox-group>
        `);

        el.validate(true);
        await elementUpdated(el);

        expect(el.validity).to.equal('valid');
      });
    });
  });

  describe('Events', () => {
    describe('input', () => {
      it('should fire an input event when a checkbox is toggled', async () => {
        const el = await fixture(html`
          <auro-checkbox-group>
            <auro-checkbox value="one">One</auro-checkbox>
          </auro-checkbox-group>
        `);

        let fired = false;
        el.addEventListener('input', () => {
          fired = true;
        });

        const cb = el.querySelector('auro-checkbox');
        cb.shadowRoot.querySelector('input').click();
        await elementUpdated(el);

        expect(fired).to.be.true;
      });
    });

    describe('auroFormElement-validated', () => {
      it('should fire auroFormElement-validated when validation runs', async () => {
        const el = await fixture(html`
          <auro-checkbox-group required>
            <auro-checkbox value="one">One</auro-checkbox>
          </auro-checkbox-group>
        `);

        let fired = false;
        el.addEventListener('auroFormElement-validated', () => {
          fired = true;
        });

        el.validate(true);
        await elementUpdated(el);

        expect(fired).to.be.true;
      });

      if (!mobileView) {
        it('should reset focusWithin when an outside click is detected', async () => {
          const el = await fixture(html`
            <auro-checkbox-group required>
              <auro-checkbox value="one">One</auro-checkbox>
            </auro-checkbox-group>
          `);

          const cb = el.querySelector('auro-checkbox');

          // Click the internal input to trigger the full event chain
          cb.shadowRoot.querySelector('input').click();
          await elementUpdated(el);

          expect(el.touched).to.be.true;
          expect(el.focusWithin).to.be.true;

          // Set the active group reference (normally done by auroCheckbox-focusout)
          document.auroCheckboxGroupActive = el;

          // Create and append an outside element, then click it
          const outsideEl = document.createElement('button');
          document.body.appendChild(outsideEl);

          outsideEl.dispatchEvent(new MouseEvent('click', { bubbles: true }));

          await new Promise((resolve) => setTimeout(resolve, 100));

          expect(el.focusWithin).to.be.false;

          // Cleanup
          document.body.removeChild(outsideEl);
        });
      }
    });
    describe('auroCheckbox-focusout', () => {
      it('should set document.auroCheckboxGroupActive to the group', async () => {
        const el = await fixture(html`
          <auro-checkbox-group>
            <auro-checkbox value="one">One</auro-checkbox>
          </auro-checkbox-group>
        `);

        const cb = el.querySelector('auro-checkbox');
        cb.dispatchEvent(new CustomEvent('auroCheckbox-focusout', { bubbles: true }));

        await expect(document.auroCheckboxGroupActive).to.equal(el);
      });

      it('should add focusin listener when focusWithin is true and validate on outside focus', async () => {
        const el = await fixture(html`
          <auro-checkbox-group required>
            <auro-checkbox value="one">One</auro-checkbox>
          </auro-checkbox-group>
        `);

        // First set focusWithin to true via focusin event
        const cb = el.querySelector('auro-checkbox');
        cb.dispatchEvent(new CustomEvent('auroCheckbox-focusin', { bubbles: true }));
        await expect(el.focusWithin).to.be.true;

        // Dispatch focusout — sets active group and adds window focusin listener
        cb.dispatchEvent(new CustomEvent('auroCheckbox-focusout', { bubbles: true }));
        await expect(document.auroCheckboxGroupActive).to.equal(el);

        // Simulate focus moving to an outside element
        const outsideEl = document.createElement('button');
        document.body.appendChild(outsideEl);

        // The listener is on window for 'focusin' — dispatch from the outside element so it bubbles
        outsideEl.dispatchEvent(new FocusEvent('focusin', { bubbles: true, composed: true }));

        await new Promise((resolve) => setTimeout(resolve, 100));

        await expect(el.focusWithin).to.be.false;
        document.body.removeChild(outsideEl);
      });

      it('should set focusWithin to true when focusWithin is false', async () => {
        const el = await fixture(html`
          <auro-checkbox-group>
            <auro-checkbox value="one">One</auro-checkbox>
          </auro-checkbox-group>
        `);

        await expect(el.focusWithin).to.not.be.true;

        const cb = el.querySelector('auro-checkbox');
        cb.dispatchEvent(new CustomEvent('auroCheckbox-focusout', { bubbles: true }));

        await expect(el.focusWithin).to.be.true;
      });
    });
  });

  describe('Private Functions', () => {
    // No private function tests
  });

  describe('A11Y', () => {
    it('should set aria-required when required', async () => {
      const el = await fixture(html`
        <auro-checkbox-group required>
          <auro-checkbox value="one">One</auro-checkbox>
        </auro-checkbox-group>
      `);

      expect(el.getAttribute('aria-required')).to.equal('true');
    });

    it('should remove aria-required when not required', async () => {
      const el = await fixture(html`
        <auro-checkbox-group required>
          <auro-checkbox value="one">One</auro-checkbox>
        </auro-checkbox-group>
      `);

      el.required = false;
      await elementUpdated(el);

      expect(el.hasAttribute('aria-required')).to.be.false;
    });

    it('should set aria-invalid when error is set', async () => {
      const el = await fixture(html`
        <auro-checkbox-group error="Error msg">
          <auro-checkbox value="one">One</auro-checkbox>
        </auro-checkbox-group>
      `);

      expect(el.getAttribute('aria-invalid')).to.equal('true');
    });

    it('should remove aria-invalid when error is cleared', async () => {
      const el = await fixture(html`
        <auro-checkbox-group error="Error msg">
          <auro-checkbox value="one">One</auro-checkbox>
        </auro-checkbox-group>
      `);

      el.removeAttribute('error');
      await elementUpdated(el);

      expect(el.hasAttribute('aria-invalid')).to.be.false;
    });

    it('should render a fieldset element for grouping', async () => {
      const el = await fixture(html`
        <auro-checkbox-group>
          <span slot="legend">Options</span>
          <auro-checkbox value="one">One</auro-checkbox>
        </auro-checkbox-group>
      `);

      expect(el.shadowRoot.querySelector('fieldset')).to.exist;
      expect(el.shadowRoot.querySelector('legend')).to.exist;
    });

    it('should render error help text with role alert when validity is not valid', async () => {
      const el = await fixture(html`
        <auro-checkbox-group error="Please select an option">
          <auro-checkbox value="one">One</auro-checkbox>
        </auro-checkbox-group>
      `);

      await elementUpdated(el);

      const helpText = el.shadowRoot.querySelector('[part="helpText"]');

      expect(helpText).to.exist;
      expect(helpText.hasAttribute('error')).to.be.true;
      expect(helpText.getAttribute('role')).to.equal('alert');
    });

    it('should render normal help text when validity is valid', async () => {
      const el = await fixture(html`
        <auro-checkbox-group>
          <span slot="helpText">Pick your favorites</span>
          <auro-checkbox value="one">One</auro-checkbox>
        </auro-checkbox-group>
      `);

      const helpText = el.shadowRoot.querySelector('[part="helpText"]');

      expect(helpText).to.exist;
      expect(helpText.hasAttribute('error')).to.be.false;
    });
  });

  describe('Mouse Behavior', () => {
    it('should update group value when a child checkbox is clicked', async () => {
      const el = await fixture(html`
        <auro-checkbox-group>
          <auro-checkbox value="one">One</auro-checkbox>
          <auro-checkbox value="two">Two</auro-checkbox>
        </auro-checkbox-group>
      `);

      const cb1 = el.querySelectorAll('auro-checkbox')[0];
      const cb2 = el.querySelectorAll('auro-checkbox')[1];

      cb1.shadowRoot.querySelector('input').click();
      await elementUpdated(el);

      expect(el.value).to.eql(['one']);

      cb2.shadowRoot.querySelector('input').click();
      await elementUpdated(el);

      expect(el.value).to.eql(['one', 'two']);

      cb1.shadowRoot.querySelector('input').click();
      await elementUpdated(el);

      expect(el.value).to.eql(['two']);
    });
  });

  describe('Keyboard Behavior', () => {
    it('should allow toggling a child checkbox with space key', async () => {
      const el = await fixture(html`
        <auro-checkbox-group>
          <auro-checkbox value="one">One</auro-checkbox>
        </auro-checkbox-group>
      `);

      const cb = el.querySelector('auro-checkbox');

      cb.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
      await elementUpdated(el);

      expect(cb.checked).to.be.true;
    });
  });
}

// Desktop Test Suite
describe('auro-checkbox-group', () => {
  runFullTest(false);
});

// Mobile Test Suite
describe('auro-checkbox-group in small viewport', () => {
  runFullTest(true);
});

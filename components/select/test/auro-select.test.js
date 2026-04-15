/* eslint-disable max-lines, jsdoc/require-jsdoc, no-return-await, no-undef, no-unused-expressions */
import { useAccessibleIt } from "@aurodesignsystem/auro-library/scripts/test-plugin/iterateWithA11Check.mjs";

import { fixture, html, expect, elementUpdated, waitUntil } from '@open-wc/testing';
import { sendKeys, setViewport } from '@web/test-runner-commands';
import '@aurodesignsystem/auro-dropdown';
import '../../menu/src/registered.js';
import '../src/registered.js';
import {
  defaultFixture,
  emphasizedFixture,
  snowflakeFixture,
  presetValueFixture,
  presetMultiSelectFixture,
  noCheckmarkFixture,
  errorFixture,
  multiSelectFixture,
  requiredFixture,
  nestedMenuFixture,
  inDialogFixture,
  inDrawerFixture,
} from './testFixtures.js';
import { setScreenSize, getAnnouncementRoot } from './testFunctions.js';

// Save original `it` before useAccessibleIt replaces it, so tests that
// involve third-party components with pre-existing a11y issues (e.g.,
// auro-drawer's missing aria-dialog-name) can opt out of the automatic check.
const rawIt = it;

useAccessibleIt();

function runTest(mobileView) {
  describe(`auro-select${mobileView ? ' in mobile' : ''}`, () => {
    before(async () => {
      await setScreenSize(mobileView);
    });

    describe('Rendering', () => {
      it('should be defined as a custom element', async () => {
        const el = await Boolean(customElements.get("auro-select"));

        await expect(el).to.be.true;
      });

      it('should be successfully created in the document', async () => {
        // This test fails when attributes are put onto the component before it is attached to the DOM
        const el = document.createElement('auro-select');

        await expect(el.localName).to.equal('auro-select');
      });

      it('should render a native select element for browser autofill support', async () => {
        const el = await defaultFixture();

        const nativeSelect = el.shadowRoot.querySelector('.nativeSelectWrapper select');
        await expect(nativeSelect).to.exist;
      });
    });

    describe('User Stories', () => {
      it('should close the bib when an option is selected', async () => {
        const el = await defaultFixture();
        const menu = el.querySelector('auro-menu');
        el.showBib();
        await elementUpdated(el);
        await expect(el.isPopoverVisible).to.be.true;

        el.value = 'Apples';
        await elementUpdated(el);
        await elementUpdated(menu);

        const selectedOption = menu.querySelector('auro-menuoption[value="Apples"]');

        await expect(el.value).to.eql('Apples');
        await expect(el.optionSelected).to.equal(selectedOption);

        await expect(el.isPopoverVisible).to.be.false;
      });

      if (mobileView) {
        it('should focus the close button when fullscreen dialog opens', async () => {
          const el = await defaultFixture();
          const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
          const trigger = dropdown.querySelector('[slot="trigger"]');

          trigger.click();
          await expect(dropdown.isPopoverVisible).to.be.true;

          // Wait for double-rAF focus cycle used by configureDropdown
          await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

          const closeBtn = el.bibtemplate.shadowRoot.querySelector('#closeButton');
          expect(closeBtn).to.exist;
          expect(el.bibtemplate.shadowRoot.activeElement).to.equal(closeBtn);
        });
      }
    });

    describe('Properties', () => {
      describe('appearance', () => {
        it('should default to default appearance', async () => {
          const el = await defaultFixture();
          await expect(el.appearance).to.equal('default');
        });

        it('should apply appearance="inverse" attribute', async () => {
          const el = await fixture(html`
            <div style="background-color: #222222">
              <auro-select appearance="inverse">
                <span slot="label">Name</span>
                <auro-menu>
                  <auro-menuoption value="Apples">Apples</auro-menuoption>
                </auro-menu>
              </auro-select>
            </div>
          `);
          const select = el.querySelector('auro-select');
          await expect(select.getAttribute('appearance')).to.equal('inverse');
        });
      });

      describe('autocomplete', () => {
        it('should pass the autocomplete attribute to the native select element', async () => {
          const el = await defaultFixture();
          el.autocomplete = 'name';
          await elementUpdated(el);
          const nativeSelect = el.shadowRoot.querySelector('.nativeSelectWrapper select');
          await expect(nativeSelect.getAttribute('autocomplete')).to.equal('name');
        });
      });

      describe('autoPlacement', () => {
        it('should default to false', async () => {
          const el = await defaultFixture();
          await expect(el.autoPlacement).to.be.false;
        });

        it('should reflect the autoPlacement attribute', async () => {
          const el = await fixture(html`
            <auro-select autoplacement>
              <span slot="label">Name</span>
              <auro-menu>
                <auro-menuoption value="Apples">Apples</auro-menuoption>
              </auro-menu>
            </auro-select>
          `);
          await expect(el.autoPlacement).to.be.true;
          await expect(el.hasAttribute('autoplacement')).to.be.true;
        });
      });

      describe('disabled', () => {
        it('should default to false', async () => {
          const el = await defaultFixture();
          await expect(el.disabled).to.not.be.true;
        });

        it('should reflect the disabled attribute', async () => {
          const el = await fixture(html`
            <auro-select disabled>
              <span slot="label">Name</span>
              <auro-menu>
                <auro-menuoption value="Apples">Apples</auro-menuoption>
              </auro-menu>
            </auro-select>
          `);
          await expect(el.disabled).to.be.true;
          await expect(el.hasAttribute('disabled')).to.be.true;
        });

        it('should not open the bib when disabled', async () => {
          const el = await fixture(html`
            <auro-select disabled>
              <span slot="label">Name</span>
              <auro-menu>
                <auro-menuoption value="Apples">Apples</auro-menuoption>
              </auro-menu>
            </auro-select>
          `);
          el.showBib();
          await elementUpdated(el);
          const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
          await expect(dropdown.isPopoverVisible).to.be.false;
        });
      });

      describe('error', () => {
        it('should rerun validity when error attribute is removed even with undefined value', async () => {
          const el = await errorFixture();

          await expect(el.getAttribute('validity')).to.be.equal('customError');

          el.removeAttribute('error');

          await elementUpdated(el);

          await expect(el.getAttribute('validity')).to.equal('valid');
        });

      });

      describe('flexMenuWidth', () => {
        it('should default to false', async () => {
          const el = await defaultFixture();
          await expect(el.flexMenuWidth).to.not.be.true;
        });

        it('should reflect the flexMenuWidth attribute', async () => {
          const el = await fixture(html`
            <auro-select flexmenuwidth>
              <span slot="label">Name</span>
              <auro-menu>
                <auro-menuoption value="Apples">Apples</auro-menuoption>
              </auro-menu>
            </auro-select>
          `);
          await expect(el.flexMenuWidth).to.be.true;
          await expect(el.hasAttribute('flexmenuwidth')).to.be.true;
        });
      });

      describe('fluid', () => {
        it('should default to false', async () => {
          const el = await defaultFixture();
          await expect(el.fluid).to.not.be.true;
        });

        it('should reflect the fluid attribute', async () => {
          const el = await fixture(html`
            <auro-select fluid>
              <span slot="label">Name</span>
              <auro-menu>
                <auro-menuoption value="Apples">Apples</auro-menuoption>
              </auro-menu>
            </auro-select>
          `);
          await expect(el.fluid).to.be.true;
          await expect(el.hasAttribute('fluid')).to.be.true;
        });
      });

      describe('forceDisplayValue', () => {
        it('should default to false', async () => {
          const el = await defaultFixture();
          await expect(el.forceDisplayValue).to.be.false;
        });

        it('should reflect the forceDisplayValue attribute', async () => {
          const el = await fixture(html`
            <auro-select forcedisplayvalue>
              <span slot="label">Name</span>
              <div slot="displayValue">Custom Display</div>
              <auro-menu>
                <auro-menuoption value="Apples">Apples</auro-menuoption>
              </auro-menu>
            </auro-select>
          `);
          await expect(el.forceDisplayValue).to.be.true;
          await expect(el.hasAttribute('forcedisplayvalue')).to.be.true;
        });
      });

      describe('fullscreenBreakpoint', () => {
        it('should default to sm', async () => {
          const el = await defaultFixture();
          const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
          await expect(dropdown.fullscreenBreakpoint).to.equal('sm');
        });

        it('should pass custom fullscreenBreakpoint to dropdown', async () => {
          const el = await fixture(html`
            <auro-select fullscreenBreakpoint="disabled">
              <span slot="label">Name</span>
              <auro-menu>
                <auro-menuoption value="Apples">Apples</auro-menuoption>
              </auro-menu>
            </auro-select>
          `);
          await elementUpdated(el);
          const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
          await expect(dropdown.fullscreenBreakpoint).to.equal('disabled');
        });
      });

      describe('largeFullscreenHeadline', () => {
        it('should default to false', async () => {
          const el = await defaultFixture();
          await expect(el.largeFullscreenHeadline).to.not.be.true;
        });

        it('should reflect the largeFullscreenHeadline attribute', async () => {
          const el = await fixture(html`
            <auro-select largefullscreenheadline>
              <span slot="label">Name</span>
              <auro-menu>
                <auro-menuoption value="Apples">Apples</auro-menuoption>
              </auro-menu>
            </auro-select>
          `);
          await expect(el.largeFullscreenHeadline).to.be.true;
        });
      });

      describe('layout', () => {
        it('should render in emphasized mode', async () => {
          const el = await emphasizedFixture();

          await expect(el.getAttribute('layout')).to.equal('emphasized');
          await expect(el.getAttribute('shape')).to.equal('pill');
          await expect(el.getAttribute('size')).to.equal('xl');
        });

        it('should render in snowflake mode', async () => {
          const el = await snowflakeFixture();

          await expect(el.getAttribute('layout')).to.equal('snowflake');
          await expect(el.getAttribute('shape')).to.equal('snowflake');
          await expect(el.getAttribute('placeholder')).to.equal('placeholder text');
        });

      });

      describe('matchWidth', () => {
        it('should default to false', async () => {
          const el = await defaultFixture();
          await expect(el.matchWidth).to.be.false;
        });

        it('should reflect the matchWidth attribute', async () => {
          const el = await fixture(html`
            <auro-select matchwidth>
              <span slot="label">Name</span>
              <auro-menu>
                <auro-menuoption value="Apples">Apples</auro-menuoption>
              </auro-menu>
            </auro-select>
          `);
          await expect(el.matchWidth).to.be.true;
          await expect(el.hasAttribute('matchwidth')).to.be.true;
        });
      });

      describe('multiSelect', () => {
        it('should return formattedValue as an object when multiselect is true', async () => {
          const element = await multiSelectFixture();
          element.value = '["Apples", "Bananas"]';
          await elementUpdated(element);
          const elValue = element.formattedValue;
          await expect(Array.isArray(elValue)).to.be.true;
          await expect(elValue.length).to.equal(2);
          await expect(elValue[0]).to.equal('Apples');
          await expect(elValue[1]).to.equal('Bananas');
        });

        it('should make a selection programmatically in multiselect mode', async () => {
          const el = await multiSelectFixture();
          const menu = el.querySelector('auro-menu');

          el.value = '["Apples", "Bananas"]';
          await elementUpdated(el);
          await elementUpdated(menu);

          const selectedOption1 = menu.querySelector('auro-menuoption[value="Apples"]');
          const selectedOption2 = menu.querySelector('auro-menuoption[value="Bananas"]');

          const jsonValue = JSON.parse(el.value);
          await expect(jsonValue[0]).to.eql('Apples');
          await expect(jsonValue[1]).to.eql('Bananas');

          await expect(el.optionSelected[0]).to.equal(selectedOption1);
          await expect(el.optionSelected[1]).to.equal(selectedOption2);
        });

        it('should retain preset values on initial render in multiselect mode', async () => {
          const el = await presetMultiSelectFixture();
          const menu = el.querySelector('auro-menu');

          await elementUpdated(el);
          await elementUpdated(menu);

          // multiSelect and value both arrive in the first Lit update cycle together;
          // clearSelection() must NOT fire because changedProperties also has 'value'.
          const parsed = JSON.parse(el.value);
          await expect(parsed).to.include('price');
          await expect(parsed).to.include('duration');
          await expect(Array.isArray(el.optionSelected)).to.be.true;
          await expect(el.optionSelected.length).to.equal(2);
        });

        it('should clear any existing single-select value when toggling multiSelect to true', async () => {
          const el = await presetValueFixture();
          const menu = el.querySelector('auro-menu');

          await elementUpdated(el);
          await elementUpdated(menu);
          await expect(el.value).to.eql('price');

          // Dynamically toggle to multiselect — clearSelection() should fire because
          // multiSelect changes (undefined → true) without a simultaneous value change.
          el.multiSelect = true;
          await elementUpdated(el);
          await elementUpdated(menu);

          await expect(el.value).to.be.undefined;
        });

        it('should keep value and optionSelected empty when setting an invalid value on multiselect with no prior selection', async () => {
          const el = await multiSelectFixture();
          const menu = el.querySelector('auro-menu');

          await elementUpdated(el);
          await elementUpdated(menu);

          el.value = '["Non-existent value"]';
          await elementUpdated(el);
          await elementUpdated(menu);

          await expect(el.value).to.be.undefined;
          await expect(Array.isArray(el.optionSelected)).to.be.true;
          await expect(el.optionSelected.length).to.equal(0);
        });

        it('should clear the selection when setting an invalid value on multiselect with preset values', async () => {
          const el = await presetMultiSelectFixture();
          const menu = el.querySelector('auro-menu');

          await elementUpdated(el);
          await elementUpdated(menu);

          const parsed = JSON.parse(el.value);
          await expect(parsed).to.include('price');
          await expect(parsed).to.include('duration');

          el.value = '["flight course"]';
          await elementUpdated(el);
          await elementUpdated(menu);

          await expect(el.value).to.be.undefined;
          await expect(Array.isArray(el.optionSelected)).to.be.true;
          await expect(el.optionSelected.length).to.equal(0);
        });

      });

      describe('name', () => {
        it('should pass the name attribute to the native select element', async () => {
          const element = await defaultFixture();
          const testName = 'test-name';
          element.name = testName;
          await elementUpdated(element);
          const nativeSelect = element.shadowRoot.querySelector('.nativeSelectWrapper select');
          await expect(nativeSelect.name).to.equal(testName);
        });

      });

      describe('noCheckmark', () => {
        it('should display a checkmark on the selected option by default', async () => {
          const el = await defaultFixture();
          const menu = el.querySelector('auro-menu');
          await expect(menu.hasAttribute('nocheckmark')).to.be.false;
        });

        it('should not display a checkmark on selected options when nocheckmark attribute is present', async () => {
          const el = await noCheckmarkFixture();
          const menu = el.querySelector('auro-menu');
          await expect(menu.hasAttribute('nocheckmark')).to.be.true;
        });

      });

      describe('noFlip', () => {
        it('should default to false', async () => {
          const el = await defaultFixture();
          await expect(el.noFlip).to.be.false;
        });

        it('should reflect the noFlip attribute', async () => {
          const el = await fixture(html`
            <auro-select noflip>
              <span slot="label">Name</span>
              <auro-menu>
                <auro-menuoption value="Apples">Apples</auro-menuoption>
              </auro-menu>
            </auro-select>
          `);
          await expect(el.noFlip).to.be.true;
          await expect(el.hasAttribute('noflip')).to.be.true;
        });
      });

      describe('noValidate', () => {
        it('should default to falsy', async () => {
          const el = await defaultFixture();
          await expect(el.noValidate).to.not.be.true;
        });

        it('should reflect the noValidate attribute', async () => {
          const el = await fixture(html`
            <auro-select required novalidate>
              <span slot="label">Name</span>
              <auro-menu>
                <auro-menuoption value="Apples">Apples</auro-menuoption>
              </auro-menu>
            </auro-select>
          `);
          await expect(el.noValidate).to.be.true;
          await expect(el.hasAttribute('novalidate')).to.be.true;
        });
      });

      describe('offset', () => {
        it('should default to 0', async () => {
          const el = await defaultFixture();
          await expect(el.offset).to.equal(0);
        });

        it('should reflect the offset attribute', async () => {
          const el = await fixture(html`
            <auro-select offset="10">
              <span slot="label">Name</span>
              <auro-menu>
                <auro-menuoption value="Apples">Apples</auro-menuoption>
              </auro-menu>
            </auro-select>
          `);
          await expect(el.offset).to.equal(10);
        });
      });

      describe('onDark', () => {
        it('should default to false', async () => {
          const el = await defaultFixture();
          await expect(el.onDark).to.not.be.true;
        });

        it('should reflect the onDark attribute', async () => {
          const el = await fixture(html`
            <div style="background-color: #222222">
              <auro-select ondark>
                <span slot="label">Name</span>
                <auro-menu>
                  <auro-menuoption value="Apples">Apples</auro-menuoption>
                </auro-menu>
              </auro-select>
            </div>
          `);
          const select = el.querySelector('auro-select');
          await expect(select.onDark).to.be.true;
          await expect(select.hasAttribute('ondark')).to.be.true;
        });
      });

      describe('optionSelected', () => {
        it('should reset selection value when reset() is called programmatically', async () => {
          const el = await presetValueFixture();
          const menu = el.querySelector('auro-menu');

          el.reset();
          await elementUpdated(el);
          await elementUpdated(menu);

          await expect(el.optionSelected).to.be.equal(undefined);
        });

      });

      describe('placeholder', () => {
        it('should display custom placeholder text', async () => {
          const el = await fixture(html`
            <auro-select placeholder="Choose an option">
              <span slot="label">Name</span>
              <auro-menu>
                <auro-menuoption value="Apples">Apples</auro-menuoption>
              </auro-menu>
            </auro-select>
          `);
          await expect(el.getAttribute('placeholder')).to.equal('Choose an option');
        });
      });

      describe('placement', () => {
        it('should default to bottom-start', async () => {
          const el = await defaultFixture();
          await expect(el.placement).to.equal('bottom-start');
        });

        it('should reflect custom placement', async () => {
          const el = await fixture(html`
            <auro-select placement="top">
              <span slot="label">Name</span>
              <auro-menu>
                <auro-menuoption value="Apples">Apples</auro-menuoption>
              </auro-menu>
            </auro-select>
          `);
          await expect(el.placement).to.equal('top');
          await expect(el.getAttribute('placement')).to.equal('top');
        });
      });

      describe('required', () => {
        it('should set valueMissing validity when required is set and blurred without selection', async () => {
          const el = await requiredFixture();
          await elementUpdated(el);

          // Simulate focus and blur without choosing an option
          el.dispatchEvent(new Event('focusin'));
          await elementUpdated(el);

          el.dispatchEvent(new Event('blur'));
          await elementUpdated(el);

          await expect(el.getAttribute('validity')).to.equal('valueMissing');
        });

      });

      describe('setCustomValidity', () => {
        it('should display custom validation message for all validity states', async () => {
          const el = await requiredFixture();
          el.setCustomValidity = 'Custom error message';
          await elementUpdated(el);

          el.validate(true);
          await elementUpdated(el);

          const helpText = el.shadowRoot.querySelector('[auro-helptext]');
          await expect(helpText.textContent.trim()).to.equal('Custom error message');
        });
      });

      describe('setCustomValidityCustomError', () => {
        it('should display custom message when validity is customError', async () => {
          const el = await fixture(html`
            <auro-select error="generic error">
              <span slot="label">Name</span>
              <auro-menu>
                <auro-menuoption value="Apples">Apples</auro-menuoption>
              </auro-menu>
            </auro-select>
          `);
          await elementUpdated(el);

          // setCustomValidityCustomError takes precedence over the error attribute text
          el.setCustomValidityCustomError = 'Custom error text';
          el.validate();
          await elementUpdated(el);

          await expect(el.getAttribute('validity')).to.equal('customError');
          const helpText = el.shadowRoot.querySelector('[auro-helptext]');
          await expect(helpText.textContent.trim()).to.equal('Custom error text');
        });
      });

      describe('setCustomValidityValueMissing', () => {
        it('should display custom message when required value is missing', async () => {
          const el = await requiredFixture();
          el.setCustomValidityValueMissing = 'Please select a value';
          await elementUpdated(el);

          el.validate(true);
          await elementUpdated(el);

          const helpText = el.shadowRoot.querySelector('[auro-helptext]');
          await expect(helpText.textContent.trim()).to.equal('Please select a value');
        });
      });

      describe('shape', () => {
        it('should default to classic', async () => {
          const el = await defaultFixture();
          await expect(el.shape).to.equal('classic');
        });

        it('should reflect a custom shape attribute', async () => {
          const el = await fixture(html`
            <auro-select shape="pill">
              <span slot="label">Name</span>
              <auro-menu>
                <auro-menuoption value="Apples">Apples</auro-menuoption>
              </auro-menu>
            </auro-select>
          `);
          await expect(el.getAttribute('shape')).to.equal('pill');
        });
      });

      describe('shift', () => {
        it('should default to false', async () => {
          const el = await defaultFixture();
          await expect(el.shift).to.be.false;
        });

        it('should reflect the shift attribute', async () => {
          const el = await fixture(html`
            <auro-select shift>
              <span slot="label">Name</span>
              <auro-menu>
                <auro-menuoption value="Apples">Apples</auro-menuoption>
              </auro-menu>
            </auro-select>
          `);
          await expect(el.shift).to.be.true;
          await expect(el.hasAttribute('shift')).to.be.true;
        });
      });

      describe('size', () => {
        it('should default to lg', async () => {
          const el = await defaultFixture();
          await expect(el.size).to.equal('lg');
        });

        it('should support xl size with emphasized layout', async () => {
          const el = await emphasizedFixture();
          await expect(el.getAttribute('size')).to.equal('xl');
        });
      });

      describe('validity', () => {
        it('should be customError when error attribute is set', async () => {
          const el = await errorFixture();
          await expect(el.getAttribute('validity')).to.equal('customError');
        });

        it('should be valueMissing when required and no value after validation', async () => {
          const el = await requiredFixture();
          el.validate(true);
          await elementUpdated(el);
          await expect(el.getAttribute('validity')).to.equal('valueMissing');
        });

        it('should be valid after selecting a value when required', async () => {
          const el = await requiredFixture();
          el.value = 'Apples';
          await elementUpdated(el);
          el.validate(true);
          await elementUpdated(el);
          await expect(el.getAttribute('validity')).to.equal('valid');
        });
      });

      describe('value', () => {
        it('should sync value changes from the native select to the component', async () => {
          const element = await defaultFixture();
          await elementUpdated(element);
          const {nativeSelect} = element;
          nativeSelect.value = 'Apples';
          nativeSelect.dispatchEvent(new Event('change'));

          await elementUpdated(element);

          const elValue = element.value;
          await expect(elValue).to.equal('Apples');

          // Also check that the visible selection matches
          const triggerText = element.shadowRoot.querySelector('#value').textContent.trim();
          await expect(triggerText).to.equal('Apples');
        });

        it('should sync value changes from the component to the native select', async () => {
          const element = await defaultFixture();
          element.value = 'Apples';

          await elementUpdated(element);

          const nativeSelect = element.shadowRoot.querySelector('.nativeSelectWrapper select');
          expect(nativeSelect.value).to.equal('Apples');
        });

        it('should make a selection when value is set programmatically', async () => {
          const el = await defaultFixture();
          const menu = el.querySelector('auro-menu');

          el.value = 'Apples';
          await elementUpdated(el);
          await elementUpdated(menu);

          const selectedOption = menu.querySelector('auro-menuoption[value="Apples"]');

          await expect(el.value).to.eql('Apples');
          await expect(el.optionSelected).to.equal(selectedOption);
        });

        it('should apply value from host attribute on initial render', async () => {
          const el = await fixture(html`
            <auro-select value="bar">
              <span slot="label">Name</span>
              <auro-menu>
                <auro-menuoption value="foo">Foo</auro-menuoption>
                <auro-menuoption value="bar">Bar</auro-menuoption>
                <auro-menuoption value="baz">Baz</auro-menuoption>
              </auro-menu>
            </auro-select>
          `);

          await elementUpdated(el);
          await new Promise((resolve) => setTimeout(resolve, 0));
          await elementUpdated(el);

          await expect(el.value).to.equal('bar');
          await expect(el.optionSelected?.value).to.equal('bar');
          await expect(el.getAttribute('value')).to.equal('bar');
        });

        it('should restore selection from value attribute after disconnect and reconnect', async () => {
          const wrapper = await fixture(html`<div></div>`);

          const mountSelect = () => {
            wrapper.innerHTML = `
              <auro-select value="bar">
                <span slot="label">Name</span>
                <auro-menu>
                  <auro-menuoption value="foo">Foo</auro-menuoption>
                  <auro-menuoption value="bar">Bar</auro-menuoption>
                  <auro-menuoption value="baz">Baz</auro-menuoption>
                </auro-menu>
              </auro-select>
            `;

            return wrapper.querySelector('auro-select');
          };

          let el = mountSelect();
          await elementUpdated(el);
          await new Promise((resolve) => setTimeout(resolve, 0));
          await elementUpdated(el);

          await expect(el.value).to.equal('bar');
          await expect(el.optionSelected?.value).to.equal('bar');

          wrapper.innerHTML = '';
          await new Promise((resolve) => setTimeout(resolve, 0));

          el = mountSelect();
          await elementUpdated(el);
          await new Promise((resolve) => setTimeout(resolve, 0));
          await elementUpdated(el);

          await expect(el.value).to.equal('bar');
          await expect(el.optionSelected?.value).to.equal('bar');
        });

        it('should clear value and optionSelected when setting an invalid value with no prior selection', async () => {
          const el = await defaultFixture();
          const menu = el.querySelector('auro-menu');

          el.value = 'Non-existent value';
          await elementUpdated(el);
          await elementUpdated(menu);

          await expect(el.value).to.be.undefined;
          await expect(el.optionSelected).to.be.undefined;
        });

        it('should reset value and optionSelected when setting an invalid value with an existing selection', async () => {
          const el = await presetValueFixture();
          const menu = el.querySelector('auro-menu');

          await elementUpdated(el);
          await elementUpdated(menu);
          await expect(el.value).to.eql('price');

          el.value = 'flight course';
          await elementUpdated(el);
          await elementUpdated(menu);

          await expect(el.value).to.be.undefined;
          await expect(el.optionSelected).to.be.equal(undefined);
          await expect(el.getAttribute('validity')).to.equal('valid');
        });

        it('should clear the value and validity state when reset() is called', async () => {
          const el = await presetValueFixture();
          await elementUpdated(el);

          await expect(el.value).to.eql('price');
          await expect(el.getAttribute('validity')).to.equal('valid');

          el.reset();
          await elementUpdated(el);

          await expect(el.value).to.be.undefined;
        });

      });
    });

    describe('Slots', () => {
      describe('default', () => {
        it('should render content in the default slot', async () => {
          const el = await defaultFixture();

          const slot = el.shadowRoot.querySelector('slot:not([name])');

          await expect(slot).to.exist;
          const assigned = slot.assignedNodes().filter((n) => n.nodeType === Node.ELEMENT_NODE);

          await expect(assigned.length).to.be.greaterThan(0);
        });
      });

      describe('ariaLabel.bib.close', () => {
        it('should render content in the ariaLabel.bib.close slot', async () => {
          const el = await fixture(html`<auro-select><span slot="label">Choose</span><span slot="ariaLabel.bib.close">Close menu</span><auro-menu><auro-menuoption value="one">One</auro-menuoption></auro-menu></auro-select>`);

          const slotContent = el.querySelector('[slot="ariaLabel.bib.close"]');

          await expect(slotContent).to.exist;
        });
      });

      describe('bib.fullscreen.headline', () => {
        it('should render content in the bib.fullscreen.headline slot', async () => {
          const el = await defaultFixture();

          const slotContent = el.querySelector('[slot="bib.fullscreen.headline"]');

          await expect(slotContent).to.exist;
        });
      });

      describe('label', () => {
        it('should render content in the label slot', async () => {
          const el = await defaultFixture();

          const slotContent = el.querySelector('[slot="label"]');

          await expect(slotContent).to.exist;
        });
      });

      describe('optionalLabel', () => {
        it('should render content in the optionalLabel slot', async () => {
          const el = await fixture(html`<auro-select><span slot="label">Choose</span><span slot="optionalLabel">(optional)</span><auro-menu><auro-menuoption value="one">One</auro-menuoption></auro-menu></auro-select>`);

          const slotContent = el.querySelector('[slot="optionalLabel"]');

          await expect(slotContent).to.exist;
        });
      });

      describe('helpText', () => {
        it('should render content in the helpText slot', async () => {
          const el = await fixture(html`<auro-select><span slot="label">Choose</span><span slot="helpText">Select an option</span><auro-menu><auro-menuoption value="one">One</auro-menuoption></auro-menu></auro-select>`);

          const slotContent = el.querySelector('[slot="helpText"]');

          await expect(slotContent).to.exist;
        });
      });

      describe('valueText', () => {
        it('should render content in the valueText slot', async () => {
          const el = await fixture(html`<auro-select><span slot="label">Choose</span><span slot="valueText">Custom display</span><auro-menu><auro-menuoption value="one">One</auro-menuoption></auro-menu></auro-select>`);

          const slotContent = el.querySelector('[slot="valueText"]');

          await expect(slotContent).to.exist;
        });
      });

      describe('displayValue', () => {
        it('should have a displayValue slot defined in shadow DOM', async () => {
          const el = await defaultFixture();

          const slot = el.shadowRoot.querySelector('slot[name="displayValue"]');

          await expect(slot).to.exist;
        });
      });
    });

    describe('Public Functions', () => {
      describe('register', () => {
        it('should register the element as a custom element', async () => {
          const el = await Boolean(customElements.get('auro-select'));
          await expect(el).to.be.true;
        });
      });

      describe('updateActiveOption', () => {
        it('should update the active option by index', async () => {
          const el = await defaultFixture();
          el.showBib();
          await elementUpdated(el);

          el.updateActiveOption(2);
          await elementUpdated(el);

          const menu = el.querySelector('auro-menu');
          const options = menu.querySelectorAll('auro-menuoption');
          await expect(options[2].classList.contains('active')).to.be.true;
        });
      });

      describe('hideBib', () => {
        it('should close the bib when hideBib() method is called', async () => {
          const el = await defaultFixture();

          const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
          await expect(dropdown.isPopoverVisible).to.be.false;

          el.showBib();
          await elementUpdated(el);
          await expect(dropdown.isPopoverVisible).to.be.true;

          el.hideBib();
          await elementUpdated(el);
          await expect(dropdown.isPopoverVisible).to.be.false;
        });
      });

      describe('showBib', () => {
        it('should open the bib when showBib() method is called', async () => {
          const el = await defaultFixture();

          const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
          await expect(dropdown.isPopoverVisible).to.be.false;

          el.showBib();
          await elementUpdated(el);
          await expect(dropdown.isPopoverVisible).to.be.true;
        });
      });

      describe('setMenuValue', () => {
        it('should set the menu value programmatically', async () => {
          const el = await defaultFixture();
          const menu = el.querySelector('auro-menu');

          el.setMenuValue('Oranges');
          await elementUpdated(el);
          await elementUpdated(menu);

          await expect(el.value).to.equal('Oranges');
        });
      });

      describe('reset', () => {
        it('should clear value and validation state', async () => {
          const el = await presetValueFixture();
          await elementUpdated(el);
          await expect(el.value).to.equal('price');

          el.reset();
          await elementUpdated(el);

          await expect(el.value).to.be.undefined;
          await expect(el.optionSelected).to.be.undefined;
        });
      });

      describe('validate', () => {
        it('should set valueMissing when required and no value', async () => {
          const el = await requiredFixture();
          await elementUpdated(el);

          el.validate(true);
          await elementUpdated(el);

          await expect(el.getAttribute('validity')).to.equal('valueMissing');
        });

        it('should set valid when value is present', async () => {
          const el = await requiredFixture();
          el.value = 'Apples';
          await elementUpdated(el);

          el.validate(true);
          await elementUpdated(el);

          await expect(el.getAttribute('validity')).to.equal('valid');
        });
      });

      describe('resetShapeClasses', () => {
        it('should be callable without error', async () => {
          const el = await fixture(html`
            <auro-select shape="pill" size="lg">
              <span slot="label">Name</span>
              <auro-menu>
                <auro-menuoption value="Apples">Apples</auro-menuoption>
              </auro-menu>
            </auro-select>
          `);
          await elementUpdated(el);

          el.shape = 'pill-left';
          el.resetShapeClasses();
          await elementUpdated(el);

          await expect(el.shape).to.equal('pill-left');
        });
      });

      describe('resetLayoutClasses', () => {
        it('should be callable without error', async () => {
          const el = await fixture(html`
            <auro-select layout="emphasized">
              <span slot="label">Name</span>
              <auro-menu>
                <auro-menuoption value="Apples">Apples</auro-menuoption>
              </auro-menu>
            </auro-select>
          `);
          await elementUpdated(el);

          el.layout = 'snowflake';
          el.resetLayoutClasses();
          await elementUpdated(el);

          await expect(el.layout).to.equal('snowflake');
        });
      });

      describe('updateComponentArchitecture', () => {
        it('should be callable and update layout and shape', async () => {
          const el = await fixture(html`
            <auro-select layout="emphasized" shape="pill" size="lg">
              <span slot="label">Name</span>
              <auro-menu>
                <auro-menuoption value="Apples">Apples</auro-menuoption>
              </auro-menu>
            </auro-select>
          `);
          await elementUpdated(el);

          el.layout = 'snowflake';
          el.shape = 'snowflake';
          el.updateComponentArchitecture();
          await elementUpdated(el);

          await expect(el.layout).to.equal('snowflake');
          await expect(el.shape).to.equal('snowflake');
        });
      });
    });

    describe('Events', () => {
      describe('auroSelect-valueSet', () => {
        it('should fire auroSelect-valueSet when a value is set', async () => {
          const el = await defaultFixture();
          const menu = el.querySelector('auro-menu');

          const eventPromise = new Promise((resolve) => {
            el.addEventListener('auroSelect-valueSet', (event) => resolve(event));
          });

          el.value = 'Apples';
          await elementUpdated(el);
          await elementUpdated(menu);

          const event = await eventPromise;
          await expect(event).to.exist;
        });
      });

      describe('input', () => {
        it('should fire input event when a value is selected', async () => {
          const el = await defaultFixture();
          const menu = el.querySelector('auro-menu');

          const eventPromise = new Promise((resolve) => {
            el.addEventListener('input', (event) => resolve(event));
          });

          el.value = 'Apples';
          await elementUpdated(el);
          await elementUpdated(menu);

          const event = await eventPromise;
          await expect(event).to.exist;
          await expect(event.detail.value).to.equal('Apples');
        });
      });

      describe('auroFormElement-validated', () => {
        it('should fire auroFormElement-validated when validation runs', async () => {
          const el = await requiredFixture();
          await elementUpdated(el);

          const eventPromise = new Promise((resolve) => {
            el.addEventListener('auroFormElement-validated', (event) => resolve(event));
          });

          el.validate(true);
          await elementUpdated(el);

          const event = await eventPromise;
          await expect(event).to.exist;
        });
      });
    });

    describe('Private Functions', () => {
      // ─── customBibWidth applies dropdown width ───────────────────────
      it('should apply customBibWidth to dropdown', async () => {
        const el = await defaultFixture();
        await elementUpdated(el);

        const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
        el.customBibWidth = '400px';
        el.configureDropdown();
        await elementUpdated(el);

        await expect(dropdown.dropdownWidth).to.equal('400px');
      });

      // ─── configureDropdown sets bibDialogLabel to undefined for empty label ──
      it('configureDropdown sets bibDialogLabel to undefined when label text is empty', async () => {
        const el = await defaultFixture();
        await elementUpdated(el);

        // Replace label content with an empty span
        const label = el.querySelector('[slot="label"]');
        label.textContent = '';
        el.configureDropdown();
        await elementUpdated(el);

        const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
        expect(dropdown.bibDialogLabel).to.equal(undefined);
      });

      // ─── updateOptionPositions returns early when menu is null ───────
      it('updateOptionPositions returns early when menu is null', async () => {
        const el = await defaultFixture();
        await elementUpdated(el);

        const savedMenu = el.menu;
        el.menu = null;
        // Should not throw
        el.updateOptionPositions();
        el.menu = savedMenu;
      });

      // ─── updateMenuShapeSize with no menu early return ───────────────
      it('updateMenuShapeSize returns early when menu is null', async () => {
        const el = await defaultFixture();
        await elementUpdated(el);

        const savedMenu = el.menu;
        el.menu = null;
        // Should not throw
        el.updateMenuShapeSize();
        el.menu = savedMenu;
      });

      // ─── configureMenu retries via setTimeout when menu not found ───
      it('configureMenu retries via setTimeout when menu is not in DOM', async () => {
        const el = await defaultFixture();
        await elementUpdated(el);

        // Save the real menu, remove it so querySelector returns null
        const menu = el.querySelector('auro-menu');
        menu.remove();

        // Override querySelector so it returns a stub for the first call
        // (to avoid the getAttribute crash on lines 778-779), then make
        // this.menu falsy before the guard check on line 781 using a getter.
        const origQS = el.querySelector;
        let menuStub = { getAttribute: () => null };

        el.querySelector = function(selector) {
          if (selector === 'auro-menu, [auro-menu]') {
            // Return the stub so getAttribute doesn't crash
            this.menu = menuStub;
            return menuStub;
          }
          return origQS.call(this, selector);
        };

        // After the stub is assigned on line 776, getAttribute runs on 778-779.
        // Then we need this.menu to be falsy on line 781.
        // Use defineProperty to make menu a getter that returns null after getAttribute calls.
        let getAttrCalls = 0;
        menuStub.getAttribute = () => {
          getAttrCalls++;
          if (getAttrCalls >= 2) { // eslint-disable-line no-magic-numbers
            // After both getAttribute calls, make el.menu falsy for the guard
            el.menu = null;
          }
          return null;
        };

        // Call configureMenu — it will: querySelector → stub, getAttribute×2 → null el.menu, guard → retry
        el.configureMenu();
        await elementUpdated(el);

        // Restore querySelector and re-add the menu
        el.querySelector = origQS;
        el.appendChild(menu);
        await elementUpdated(el);

        // The setTimeout retry should now find the menu
        await new Promise((resolve) => setTimeout(resolve, 50)); // eslint-disable-line no-magic-numbers
        await elementUpdated(el);

        expect(el.menu).to.not.be.null;
      });

      // ─── auroMenu-selectedOption options fallback to empty array ─────
      it('auroMenu-selectedOption falls back to empty array when options is undefined', async () => {
        const el = await defaultFixture();
        await elementUpdated(el);

        const menu = el.querySelector('auro-menu');

        // Dispatch a synthetic auroMenu-selectedOption event with no options in detail
        menu.dispatchEvent(new CustomEvent('auroMenu-selectedOption', {
          bubbles: true,
          composed: true,
          detail: {
            stringValue: '',
          }
        }));
        await elementUpdated(el);

        // optionSelected should be undefined (options[0] of empty array)
        expect(el.optionSelected).to.equal(undefined);
      });

      // ─── updateActiveOptionBasedOnKey option.value fallback to empty string ─
      it('updateActiveOptionBasedOnKey uses empty string when option has no value', async () => {
        const el = await defaultFixture();
        await elementUpdated(el);

        // Add an option with no value attribute so option.value is empty
        const menu = el.querySelector('auro-menu');
        const noValueOption = document.createElement('auro-menuoption');
        noValueOption.textContent = 'No Value';
        menu.appendChild(noValueOption);
        await elementUpdated(el);

        // Call the method — the option with no value uses '' fallback
        // Press 'z' which won't match anything, but the filter still runs on all options
        el.updateActiveOptionBasedOnKey('z');
        await elementUpdated(el);

        // Should not throw; no match expected
        expect(el).to.exist;
      });

      // ─── setMenuValue returns early when menu is null ───────────────
      it('setMenuValue returns early when menu is null', async () => {
        const el = await defaultFixture();
        await elementUpdated(el);

        const savedMenu = el.menu;
        el.menu = null;
        // Should not throw
        el.setMenuValue('test');
        el.menu = savedMenu;
      });

      // ─── scrollActiveOptionIntoView returns early when menu is null ──
      it('scrollActiveOptionIntoView returns early when menu is null', async () => {
        const el = await defaultFixture();
        await elementUpdated(el);

        const savedMenu = el.menu;
        el.menu = null;
        // Should not throw
        el.scrollActiveOptionIntoView();
        el.menu = savedMenu;
      });

      // ─── scrollActiveOptionIntoView uses auto behavior for reduced motion ──
      it('scrollActiveOptionIntoView uses auto behavior when prefers-reduced-motion matches', async () => {
        const el = await defaultFixture();
        await elementUpdated(el);

        // Ensure menu has an active option
        const firstOption = el.menu.options[0];
        el.menu.optionActive = firstOption;

        // Stub matchMedia to report prefers-reduced-motion: reduce
        const originalMatchMedia = window.matchMedia;
        window.matchMedia = (query) => {
          if (query === '(prefers-reduced-motion: reduce)') {
            return { matches: true };
          }
          return originalMatchMedia(query);
        };

        let capturedBehavior;
        const originalScrollIntoView = firstOption.scrollIntoView;
        firstOption.scrollIntoView = (opts) => { capturedBehavior = opts.behavior; };

        el.scrollActiveOptionIntoView();

        expect(capturedBehavior).to.equal('auto');

        // Restore
        window.matchMedia = originalMatchMedia;
        firstOption.scrollIntoView = originalScrollIntoView;
      });

      // ─── scrollSelectedOptionIntoView uses auto behavior for reduced motion ──
      it('scrollSelectedOptionIntoView uses auto behavior when prefers-reduced-motion matches', async () => {
        const el = await defaultFixture();
        await elementUpdated(el);

        // Select an option so optionSelected is set
        const firstOption = el.menu.options[0];
        el.menu.optionSelected = firstOption;

        // Stub matchMedia to report prefers-reduced-motion: reduce
        const originalMatchMedia = window.matchMedia;
        window.matchMedia = (query) => {
          if (query === '(prefers-reduced-motion: reduce)') {
            return { matches: true };
          }
          return originalMatchMedia(query);
        };

        let capturedBehavior;
        const originalScrollIntoView = firstOption.scrollIntoView;
        firstOption.scrollIntoView = (opts) => { capturedBehavior = opts.behavior; };

        el.scrollSelectedOptionIntoView();

        expect(capturedBehavior).to.equal('auto');

        // Restore
        window.matchMedia = originalMatchMedia;
        firstOption.scrollIntoView = originalScrollIntoView;
      });

      // ─── _handleNativeSelectChange returns early when no selected option ──
      it('_handleNativeSelectChange returns early when selectedOption is undefined', async () => {
        const el = await defaultFixture();
        await elementUpdated(el);

        const originalValue = el.value;

        // Simulate a change event from a native select with no valid selectedIndex
        el._handleNativeSelectChange({
          target: {
            options: [],
            selectedIndex: 0
          }
        });

        // Value should remain unchanged
        expect(el.value).to.equal(originalValue);
      });

      // ─── renderNativeSelect falls back to textContent when option has no value ──
      it('renderNativeSelect uses textContent when option.value is empty', async () => {
        const el = await defaultFixture();
        await elementUpdated(el);

        // Add an option without a value attribute
        const noValueOption = document.createElement('auro-menuoption');
        noValueOption.textContent = 'NoValueFruit';
        el.menu.appendChild(noValueOption);
        await elementUpdated(el);

        // Force a re-render so renderNativeSelect picks up the new option
        el.requestUpdate();
        await elementUpdated(el);

        const nativeSelect = el.shadowRoot.querySelector('select');
        const nativeOptions = [...nativeSelect.querySelectorAll('option')];

        // The last native option should use textContent as its value
        const lastOption = nativeOptions[nativeOptions.length - 1];
        expect(lastOption.value).to.equal('NoValueFruit');
      });

      // ─── renderHtmlHelpText uses inverse appearance when onDark with error ──
      it('renderHtmlHelpText uses inverse appearance for error helpText when onDark', async () => {
        const el = await defaultFixture();
        await elementUpdated(el);

        el.onDark = true;
        el.error = 'Test error';
        await elementUpdated(el);

        const helpText = el.shadowRoot.querySelector('[auro-helptext]');
        expect(helpText).to.exist;
        expect(helpText.getAttribute('appearance')).to.equal('inverse');
        expect(helpText.hasAttribute('error')).to.be.true;
      });

      // ─── renderLayoutEmphasized uses inverse dropdown appearance when onDark ──
      it('renderLayoutEmphasized passes inverse appearance to dropdown when onDark', async () => {
        const el = await emphasizedFixture();
        await elementUpdated(el);

        el.onDark = true;
        await elementUpdated(el);

        const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
        expect(dropdown.getAttribute('appearance')).to.equal('inverse');
      });

      // ─── renderLayoutEmphasized hides optionalLabel when required ──
      it('renderLayoutEmphasized hides optionalLabel slot when required is set', async () => {
        const el = await emphasizedFixture();
        await elementUpdated(el);

        el.required = true;
        await elementUpdated(el);

        const label = el.shadowRoot.querySelector('#dropdownLabel');
        const optionalSlot = label.querySelector('slot[name="optionalLabel"]');
        expect(optionalSlot).to.be.null;
      });

      // ─── renderLayoutSnowflake uses inverse dropdown appearance when onDark ──
      it('renderLayoutSnowflake passes inverse appearance to dropdown when onDark', async () => {
        const el = await snowflakeFixture();
        await elementUpdated(el);

        el.onDark = true;
        await elementUpdated(el);

        const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
        expect(dropdown.getAttribute('appearance')).to.equal('inverse');
      });

      it('renderLayoutSnowflake passes error to dropdown when validity is not valid', async () => {
        const el = await snowflakeFixture();
        await elementUpdated(el);

        el.validity = 'customError';
        await elementUpdated(el);

        const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
        expect(dropdown.hasAttribute('error')).to.be.true;
      });

      it('renderLayoutSnowflake hides optionalLabel slot when required', async () => {
        const el = await snowflakeFixture();
        await elementUpdated(el);

        el.required = true;
        await elementUpdated(el);

        const label = el.shadowRoot.querySelector('#dropdownLabel');
        const optionalSlot = label.querySelector('slot[name="optionalLabel"]');
        expect(optionalSlot).to.be.null;
      });

      // ─── updateMenuShapeSize emphasized layout sets bib shape ────────
      if (!mobileView) {
        it('updateMenuShapeSize sets bib shape to rounded for emphasized layout', async () => {
          const el = await emphasizedFixture();
          await elementUpdated(el);

          const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');

          // Open the bib so it exists
          el.showBib();
          await elementUpdated(el);

          el.updateMenuShapeSize();
          await elementUpdated(el);

          if (dropdown.bib) {
            await expect(dropdown.bib.shape).to.equal('rounded');
          }
        });
      }

      // ─── updateDisplayedValue multiSelect with no selections ─────────
      it('updateDisplayedValue clears text when multiSelect has no selections', async () => {
        const el = await multiSelectFixture();
        await elementUpdated(el);

        // First select an option so display has content
        const menu = el.querySelector('auro-menu');
        const firstOption = menu.querySelector('auro-menuoption[value="Apples"]');
        firstOption.click();
        await elementUpdated(el);
        await elementUpdated(menu);

        // Now deselect by clearing value
        menu.value = [];
        menu.optionSelected = [];
        el.updateDisplayedValue();
        await elementUpdated(el);

        const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
        const valueElem = dropdown.querySelector('[slot="trigger"]');

        // Value display should be empty (only non-placeholder content)
        const nonPlaceholderText = valueElem.querySelector('.valueText');
        if (nonPlaceholderText) {
          await expect(nonPlaceholderText.textContent.trim()).to.equal('');
        } else {
          // The value elem text should not contain any option text
          await expect(valueElem.textContent).to.not.include('Apples');
        }
      });

      // ─── handleMenuLoadingChange hides bib when loading starts ───────
      it('handleMenuLoadingChange hides bib when loading without placeholder', async () => {
        const el = await defaultFixture();
        await elementUpdated(el);

        const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');

        el.showBib();
        await elementUpdated(el);
        await expect(dropdown.isPopoverVisible).to.be.true;

        el.handleMenuLoadingChange({
          detail: { loading: true, hasLoadingPlaceholder: false }
        });
        await elementUpdated(el);

        await expect(el.isHiddenWhileLoading).to.be.true;
        await expect(dropdown.isPopoverVisible).to.be.false;
      });

      // ─── handleMenuLoadingChange shows bib when loading completes ────
      it('handleMenuLoadingChange shows bib when loading completes and select is focused', async () => {
        const el = await defaultFixture();
        await elementUpdated(el);

        const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
        const trigger = dropdown.querySelector('[slot="trigger"]');

        // Open and then hide due to loading
        trigger.click();
        await elementUpdated(el);
        await expect(dropdown.isPopoverVisible).to.be.true;

        el.handleMenuLoadingChange({
          detail: { loading: true, hasLoadingPlaceholder: false }
        });
        await elementUpdated(el);
        await expect(el.isHiddenWhileLoading).to.be.true;

        // Focus trigger so contains(activeElement) is true
        trigger.focus();
        await elementUpdated(el);

        el.handleMenuLoadingChange({
          detail: { loading: false, hasLoadingPlaceholder: false }
        });
        await elementUpdated(el);

        await expect(el.isHiddenWhileLoading).to.be.false;
      });

      // ─── _handleNativeSelectChange multiSelect adds value ────────────
      it('_handleNativeSelectChange adds selected value in multiSelect mode', async () => {
        const el = await multiSelectFixture();
        await elementUpdated(el);

        // Create a mock native select change event
        const fakeSelect = document.createElement('select');
        const option = document.createElement('option');
        option.value = 'Apples';
        fakeSelect.appendChild(option);
        fakeSelect.selectedIndex = 0;

        el._handleNativeSelectChange({ target: fakeSelect });
        await elementUpdated(el);

        await expect(el.value).to.include('Apples');
      });

      // ─── renderLayout emphasized-left ────────────────────────────────
      it('renderLayout returns emphasized template for emphasized-left', async () => {
        const el = await defaultFixture();
        await elementUpdated(el);

        el.layout = 'emphasized-left';
        await elementUpdated(el);

        // The component should render without error
        const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
        await expect(dropdown).to.exist;
      });

      // ─── renderLayout emphasized-right ───────────────────────────────
      it('renderLayout returns emphasized template for emphasized-right', async () => {
        const el = await defaultFixture();
        await elementUpdated(el);

        el.layout = 'emphasized-right';
        await elementUpdated(el);

        const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
        await expect(dropdown).to.exist;
      });

      // ─── renderLayout snowflake-left ─────────────────────────────────
      it('renderLayout returns snowflake template for snowflake-left', async () => {
        const el = await defaultFixture();
        await elementUpdated(el);

        el.layout = 'snowflake-left';
        await elementUpdated(el);

        const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
        await expect(dropdown).to.exist;
      });

      // ─── renderLayout snowflake-right ────────────────────────────────
      it('renderLayout returns snowflake template for snowflake-right', async () => {
        const el = await defaultFixture();
        await elementUpdated(el);

        el.layout = 'snowflake-right';
        await elementUpdated(el);

        const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
        await expect(dropdown).to.exist;
      });

      // ─── auroDropdown-strategy-change restores trigger.inert when not fullscreen ─
      it('strategy-change event sets trigger.inert to false when not fullscreen', async () => {
        const el = await defaultFixture();
        await elementUpdated(el);

        const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');

        // Simulate trigger being inert (e.g. was fullscreen before)
        dropdown.trigger.inert = true;

        // Ensure not fullscreen
        dropdown.isBibFullscreen = false;
        await elementUpdated(el);

        // Fire the strategy-change event on the dropdown
        dropdown.dispatchEvent(new CustomEvent('auroDropdown-strategy-change', {
          bubbles: true,
          composed: true
        }));
        await elementUpdated(el);

        await expect(dropdown.trigger.inert).to.be.false;
      });

      // ─── auroDropdown-strategy-change calls updateMenuShapeSize ─────
      it('strategy-change event updates menu shape and size', async () => {
        const el = await defaultFixture();
        await elementUpdated(el);

        const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
        const menu = el.querySelector('auro-menu');

        // Set fullscreen to trigger the fullscreen branch
        dropdown.isBibFullscreen = true;
        await elementUpdated(el);

        dropdown.dispatchEvent(new CustomEvent('auroDropdown-strategy-change', {
          bubbles: true,
          composed: true
        }));
        await elementUpdated(el);

        // Fullscreen should set menu to md/box
        await expect(menu.getAttribute('size')).to.equal('md');
        await expect(menu.getAttribute('shape')).to.equal('box');
      });

      // ─── auroDropdown-strategy-change fullscreen + visible sets trigger inert ─
      it('strategy-change event sets trigger inert and focuses close button when fullscreen and visible', async () => {
        const el = await defaultFixture();
        await elementUpdated(el);

        const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');

        // Open the bib first
        el.showBib();
        await elementUpdated(el);
        await expect(dropdown.isPopoverVisible).to.be.true;

        // Simulate switching to fullscreen while open
        dropdown.isBibFullscreen = true;
        await elementUpdated(el);

        dropdown.dispatchEvent(new CustomEvent('auroDropdown-strategy-change', {
          bubbles: true,
          composed: true
        }));
        await elementUpdated(el);

        // Trigger should be inert when switching to fullscreen while visible
        await expect(dropdown.trigger.inert).to.be.true;
      });
    });

    describe('A11Y', () => {
      // ─── §2.3.1  Trigger combobox ARIA attributes (P0) ──────────────────────
      it('should have role combobox with aria-expanded and aria-controls on dropdown trigger', async () => {
        const el = await defaultFixture();
        const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
        const trigger = dropdown.shadowRoot.querySelector('#trigger');

        await expect(trigger.getAttribute('role')).to.equal('combobox');
        await expect(trigger.hasAttribute('aria-expanded')).to.be.true;
        await expect(trigger.getAttribute('aria-expanded')).to.equal('false');
        await expect(trigger.hasAttribute('aria-controls')).to.be.true;

        // aria-expanded reflects open state
        el.showBib();
        await elementUpdated(el);

        await expect(trigger.getAttribute('aria-expanded')).to.equal('true');
      });

      // ─── §2.3.4 / §6.1  ariaActiveDescendantElement binding across shadow DOM (P0) ─
      it('should set ariaActiveDescendantElement on trigger to the activated menu option', async () => {
        const el = await defaultFixture();
        const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
        const trigger = dropdown.shadowRoot.querySelector('#trigger');
        const firstOption = el.querySelector('auro-menuoption[value="Apples"]');

        el.showBib();
        await elementUpdated(el);

        await expect(trigger.ariaActiveDescendantElement === firstOption).to.be.true;
      });

      describe('announceToScreenReader', function() {
        this.timeout(5000);

        it('should populate the live region when an option is activated', async () => {
          const el = await defaultFixture();
          await elementUpdated(el);

          // Type-ahead activates an option, which triggers announceToScreenReader
          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
          await elementUpdated(el);

          // Wait a frame for the rAF inside announceToScreenReader
          await new Promise((resolve) => requestAnimationFrame(resolve));

          const liveRegion = getAnnouncementRoot(el.dropdown, el.shadowRoot).querySelector('#srAnnouncement');
          expect(liveRegion).to.exist;
          expect(liveRegion.textContent).to.not.equal('');
        });

        it('should clear the live region after the announcement duration', async () => {
          const el = await defaultFixture();
          await elementUpdated(el);

          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
          await elementUpdated(el);

          await new Promise((resolve) => requestAnimationFrame(resolve));
          const liveRegion = getAnnouncementRoot(el.dropdown, el.shadowRoot).querySelector('#srAnnouncement');
          expect(liveRegion.textContent).to.not.equal('');

          // Multiple announcements can chain (e.g., active-option followed by selection),
          // each resetting the 1000ms cleanup timer. Wait long enough for the final
          // announcement's timer to expire.
          await new Promise((resolve) => setTimeout(resolve, 2200));
          expect(liveRegion.textContent).to.equal('');
        });

        if (mobileView) {
          it('should route announcements to the bib live region in fullscreen mode', async () => {
            const el = await defaultFixture();
            await elementUpdated(el);

            // Open the dropdown
            el.showBib();
            await waitUntil(() => el.dropdown.isPopoverVisible);

            // Simulate fullscreen (resize observers don't fire in test env)
            el.dropdown.isBibFullscreen = true;
            await elementUpdated(el.dropdown);

            // Navigate directly via the menu to trigger auroMenu-activatedOption,
            // bypassing the dialog keyboard bridge which doesn't fire in test env.
            el.menu.navigateOptions('down');
            await elementUpdated(el);

            // Wait a frame for the rAF inside announceToScreenReader
            await new Promise((resolve) => requestAnimationFrame(resolve));

            const bibEl = el.dropdown.bibElement.value;
            const bibLiveRegion = bibEl.shadowRoot.querySelector('#srAnnouncement');
            expect(bibLiveRegion).to.exist;
            expect(bibLiveRegion.textContent).to.not.equal('');
          });
        }
      });
    });

    describe('Mouse Behavior', () => {
      describe('Click', () => {
        describe('Trigger', () => {
          it('should toggle the bib on click', async () => {
            const el = await defaultFixture();

            const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
            const trigger = dropdown.querySelector('[slot="trigger"]');

            trigger.click();
            await expect(dropdown.isPopoverVisible).to.be.true;

            trigger.click();
            await expect(dropdown.isPopoverVisible).to.be.false;
          });

          // // BUG: The select uses popover='manual' which does not support light dismiss,
          // // and noHideOnThisFocusLoss is set to true, so clicking outside does not close the bib.
          // it('should close the bib when clicking outside the select element', async () => {
          //   const el = await defaultFixture();
          //   const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
          //   const trigger = dropdown.querySelector('[slot="trigger"]');

          //   trigger.click();
          //   await elementUpdated(el);
          //   await expect(dropdown.isPopoverVisible).to.be.true;

          //   // Click outside the select element
          //   document.body.click();
          //   await elementUpdated(el);

          //   await expect(dropdown.isPopoverVisible).to.be.false;
          // });
        });

        describe('Menu Option', () => {
          describe('Single Select', () => {
            it('should select an option and close the bib when a menuoption is clicked', async () => {
              const el = await defaultFixture();
              const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
              const trigger = dropdown.querySelector('[slot="trigger"]');

              trigger.click();
              await elementUpdated(el);
              await expect(dropdown.isPopoverVisible).to.be.true;

              // Wait for menu option internal state to settle
              await new Promise((resolve) => setTimeout(resolve, 0));

              const menu = el.querySelector('auro-menu');
              const option = menu.querySelector('auro-menuoption[value="Oranges"]');
              option.click();
              await elementUpdated(option);
              await elementUpdated(menu);
              await new Promise((resolve) => setTimeout(resolve, 0));
              await elementUpdated(el);

              await expect(el.value).to.equal('Oranges');
              await expect(dropdown.isPopoverVisible).to.be.false;
            });

            if (!mobileView) {
              it('should move focus to the trigger after selecting an option via click', async () => {
                const el = await defaultFixture();
                const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
                const trigger = dropdown.querySelector('[slot="trigger"]');

                trigger.click();
                await elementUpdated(el);
                await expect(dropdown.isPopoverVisible).to.be.true;

                await new Promise((resolve) => setTimeout(resolve, 0));

                const menu = el.querySelector('auro-menu');
                const option = menu.querySelector('auro-menuoption[value="Oranges"]');
                option.click();
                await elementUpdated(option);
                await elementUpdated(menu);
                await new Promise((resolve) => setTimeout(resolve, 0));
                await elementUpdated(el);

                await expect(dropdown.isPopoverVisible).to.be.false;
                await expect(dropdown.trigger.matches(':focus')).to.be.true;
              });
            }

            it('should not deselect and should close the bib when an already-selected menuoption is clicked', async () => {
              const el = await presetValueFixture();

              await elementUpdated(el);
              await new Promise((resolve) => setTimeout(resolve, 0));
              await elementUpdated(el);

              const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
              const trigger = dropdown.querySelector('[slot="trigger"]');

              trigger.click();
              await elementUpdated(el);
              await expect(dropdown.isPopoverVisible).to.be.true;

              const menu = el.querySelector('auro-menu');
              const selectedOption = menu.querySelector('auro-menuoption[value="price"]');
              await expect(selectedOption.selected).to.be.true;

              const valueBefore = el.value;

              // Wait for menu option internal state to settle
              await new Promise((resolve) => setTimeout(resolve, 0));

              selectedOption.click();
              await elementUpdated(selectedOption);
              await elementUpdated(menu);
              await new Promise((resolve) => setTimeout(resolve, 0));
              await elementUpdated(el);

              // In single-select mode, clicking an already-selected option should NOT deselect it
              await expect(selectedOption.selected).to.be.true;
              await expect(el.value).to.equal(valueBefore);
              await expect(dropdown.isPopoverVisible).to.be.false;
            });

            it('should not select or close the bib when a disabled menuoption is clicked', async () => {
              const el = await fixture(html`
                <auro-select>
                  <span slot="bib.fullscreen.headline">Bib Headline</span>
                  <span slot="label">Name</span>
                  <auro-menu>
                    <auro-menuoption value="Apples" disabled>Apples</auro-menuoption>
                    <auro-menuoption value="Oranges">Oranges</auro-menuoption>
                  </auro-menu>
                </auro-select>
              `);

              const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
              const trigger = dropdown.querySelector('[slot="trigger"]');

              trigger.click();
              await elementUpdated(el);
              await expect(dropdown.isPopoverVisible).to.be.true;

              const valueBefore = el.value;
              const menu = el.querySelector('auro-menu');
              const disabledOption = menu.querySelector('auro-menuoption[disabled]');

              disabledOption.click();
              await elementUpdated(disabledOption);
              await elementUpdated(el);

              await expect(el.value).to.equal(valueBefore);
              await expect(disabledOption.selected).to.be.false;
              await expect(dropdown.isPopoverVisible).to.be.true;
            });
          });

          describe('Multi Select', () => {
            it('should select an option and keep the bib open when a menuoption is clicked', async () => {
              const el = await multiSelectFixture();
              const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
              const trigger = dropdown.querySelector('[slot="trigger"]');

              trigger.click();
              await elementUpdated(el);
              await expect(dropdown.isPopoverVisible).to.be.true;

              // Wait for menu option internal state to settle
              await new Promise((resolve) => setTimeout(resolve, 0));

              const menu = el.querySelector('auro-menu');
              const option = menu.querySelector('auro-menuoption[value="Oranges"]');
              option.click();
              await elementUpdated(option);
              await elementUpdated(menu);
              await new Promise((resolve) => setTimeout(resolve, 0));
              await elementUpdated(el);

              const parsed = JSON.parse(el.value);
              await expect(parsed).to.include('Oranges');
              await expect(dropdown.isPopoverVisible).to.be.true;
            });

            it('should deselect and keep the bib open when an already-selected menuoption is clicked', async () => {
              const el = await presetMultiSelectFixture();

              await elementUpdated(el);
              await new Promise((resolve) => setTimeout(resolve, 0));
              await elementUpdated(el);

              const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
              const trigger = dropdown.querySelector('[slot="trigger"]');

              trigger.click();
              await elementUpdated(el);
              await expect(dropdown.isPopoverVisible).to.be.true;

              const menu = el.querySelector('auro-menu');
              const selectedOption = menu.querySelector('auro-menuoption[value="price"]');
              await expect(selectedOption.selected).to.be.true;

              // Wait for menu option internal state to settle
              await new Promise((resolve) => setTimeout(resolve, 0));

              selectedOption.click();
              await elementUpdated(selectedOption);
              await elementUpdated(menu);
              await new Promise((resolve) => setTimeout(resolve, 0));
              await elementUpdated(el);

              // In multiselect mode, clicking an already-selected option should deselect it
              await expect(selectedOption.selected).to.be.false;
              await expect(dropdown.isPopoverVisible).to.be.true;
            });

            it('should not select or close the bib when a disabled menuoption is clicked', async () => {
              const el = await fixture(html`
                <auro-select multiselect>
                  <span slot="bib.fullscreen.headline">Bib Headline</span>
                  <span slot="label">Name</span>
                  <auro-menu>
                    <auro-menuoption value="Apples" disabled>Apples</auro-menuoption>
                    <auro-menuoption value="Oranges">Oranges</auro-menuoption>
                  </auro-menu>
                </auro-select>
              `);

              const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
              const trigger = dropdown.querySelector('[slot="trigger"]');

              trigger.click();
              await elementUpdated(el);
              await expect(dropdown.isPopoverVisible).to.be.true;

              const valueBefore = el.value;
              const menu = el.querySelector('auro-menu');
              const disabledOption = menu.querySelector('auro-menuoption[disabled]');

              disabledOption.click();
              await elementUpdated(disabledOption);
              await elementUpdated(el);

              await expect(el.value).to.equal(valueBefore);
              await expect(disabledOption.selected).to.be.false;
              await expect(dropdown.isPopoverVisible).to.be.true;
            });
          });
        });
      });
    });

    describe('Keyboard Behavior', () => {

      describe('ArrowDown', () => {
        it('should navigate to the next option', async () => {
          const el = await defaultFixture();
          const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
          const trigger = dropdown.querySelector('[slot="trigger"]');

          trigger.click();
          await expect(dropdown.isPopoverVisible).to.be.true;

          const menu = el.querySelector('auro-menu');
          const menuOptions = menu.querySelectorAll('auro-menuoption');

          await expect(menuOptions[0].classList.contains('active')).to.be.true;
          await expect(menuOptions[1].classList.contains('active')).to.be.false;

          el.dispatchEvent(new KeyboardEvent('keydown', {
            'key': 'ArrowDown'
          }));

          await expect(menuOptions[0].classList.contains('active')).to.be.false;
          await expect(menuOptions[1].classList.contains('active')).to.be.true;

          el.dispatchEvent(new KeyboardEvent('keydown', {
            'key': 'ArrowUp'
          }));

          await expect(menuOptions[0].classList.contains('active')).to.be.true;
          await expect(menuOptions[1].classList.contains('active')).to.be.false;
        });

        it('should navigate through nested menu options', async () => {
          const el = await nestedMenuFixture();
          const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
          const trigger = dropdown.querySelector('[slot="trigger"]');
          const rootOptions = [...el.querySelectorAll(':scope > auro-menu > auro-menuoption')];
          const nestedMenu = el.querySelector('auro-menu auro-menu');
          const nestedOptions = [...nestedMenu.querySelectorAll('auro-menuoption')];

          trigger.click();
          await elementUpdated(el);
          await expect(dropdown.isPopoverVisible).to.be.true;

          await expect(el.optionActive === rootOptions[0]).to.be.true;

          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
          await elementUpdated(el);
          await expect(el.optionActive === nestedOptions[0]).to.be.true;

          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
          await elementUpdated(el);
          await expect(el.optionActive === nestedOptions[1]).to.be.true;

          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
          await elementUpdated(el);
          await expect(el.optionActive === rootOptions[1]).to.be.true;

          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
          await elementUpdated(el);
          await expect(el.optionActive === nestedOptions[1]).to.be.true;
        });

        it('should open the bib when collapsed', async () => {
          const el = await defaultFixture();

          await elementUpdated(el);

          const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
          await expect(dropdown.isPopoverVisible).to.be.false;

          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
          await elementUpdated(el);

          await expect(dropdown.isPopoverVisible).to.be.true;
        });

        describe('Meta', () => {
          it('should jump to the last enabled option', async () => {
            const el = await defaultFixture();

            await elementUpdated(el);
            el.showBib();
            await elementUpdated(el);

            const menu = el.querySelector('auro-menu');
            const lastOption = menu.querySelector('auro-menuoption[value="Grapes"]');

            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', metaKey: true }));
            await elementUpdated(el);

            await expect(el.optionActive === lastOption).to.equal(true);
          });

          it('should skip disabled options', async () => {
            const el = await fixture(html`
              <auro-select>
                <span slot="bib.fullscreen.headline">Bib Headline</span>
                <span slot="label">Name</span>
                <auro-menu>
                  <auro-menuoption value="Stops">Stops</auro-menuoption>
                  <auro-menuoption value="Price">Price</auro-menuoption>
                  <auro-menuoption value="Duration" disabled>Duration</auro-menuoption>
                </auro-menu>
              </auro-select>
            `);

            await elementUpdated(el);
            el.showBib();
            await elementUpdated(el);

            const menu = el.querySelector('auro-menu');
            const lastEnabledOption = menu.querySelector('auro-menuoption[value="Price"]');

            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', metaKey: true }));
            await elementUpdated(el);

            await expect(el.optionActive === lastEnabledOption).to.equal(true);
          });
        });

        describe('Alt', () => {
          it('should jump to the last enabled option', async () => {
            const el = await defaultFixture();

            await elementUpdated(el);
            el.showBib();
            await elementUpdated(el);

            const menu = el.querySelector('auro-menu');
            const lastOption = menu.querySelector('auro-menuoption[value="Grapes"]');

            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', altKey: true }));
            await elementUpdated(el);

            await expect(el.optionActive === lastOption).to.equal(true);
          });

          it('should skip disabled options', async () => {
            const el = await fixture(html`
              <auro-select>
                <span slot="bib.fullscreen.headline">Bib Headline</span>
                <span slot="label">Name</span>
                <auro-menu>
                  <auro-menuoption value="Stops">Stops</auro-menuoption>
                  <auro-menuoption value="Price">Price</auro-menuoption>
                  <auro-menuoption value="Duration" disabled>Duration</auro-menuoption>
                </auro-menu>
              </auro-select>
            `);

            await elementUpdated(el);
            el.showBib();
            await elementUpdated(el);

            const menu = el.querySelector('auro-menu');
            const lastEnabledOption = menu.querySelector('auro-menuoption[value="Price"]');

            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', altKey: true }));
            await elementUpdated(el);

            await expect(el.optionActive === lastEnabledOption).to.equal(true);
          });
        });
      });

      describe('ArrowUp', () => {
        it('should open the bib when collapsed', async () => {
          const el = await defaultFixture();

          const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
          await expect(dropdown.isPopoverVisible).to.be.false;

          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
          await elementUpdated(el);

          await expect(dropdown.isPopoverVisible).to.be.true;
        });

        describe('Meta', () => {
          it('should jump to the first enabled option', async () => {
            const el = await defaultFixture();

            await elementUpdated(el);
            el.showBib();
            await elementUpdated(el);

            // Move away from first option
            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
            await elementUpdated(el);
            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
            await elementUpdated(el);

            const menu = el.querySelector('auro-menu');
            const firstOption = menu.querySelector('auro-menuoption[value="Apples"]');

            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', metaKey: true }));
            await elementUpdated(el);

            await expect(el.optionActive === firstOption).to.equal(true);
          });
        });

        describe('Alt', () => {
          it('should jump to the first enabled option', async () => {
            const el = await defaultFixture();

            await elementUpdated(el);
            el.showBib();
            await elementUpdated(el);

            // Move away from first option
            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
            await elementUpdated(el);
            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
            await elementUpdated(el);

            const menu = el.querySelector('auro-menu');
            const firstOption = menu.querySelector('auro-menuoption[value="Apples"]');

            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', altKey: true }));
            await elementUpdated(el);

            await expect(el.optionActive === firstOption).to.equal(true);
          });
        });
      });

      describe('End', () => {
        it('should move to the last enabled option while expanded', async () => {
          const el = await defaultFixture();

          await elementUpdated(el);
          el.showBib();
          await elementUpdated(el);

          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));
          await elementUpdated(el);

          const menu = el.querySelector('auro-menu');
          const lastOption = menu.querySelector('auro-menuoption[value="Grapes"]');
          await expect(el.optionActive).to.equal(lastOption);
        });

        it('should skip disabled options when moving to last option', async () => {
          const el = await fixture(html`
            <auro-select>
              <span slot="bib.fullscreen.headline">Bib Headline</span>
              <span slot="label">Name</span>
              <auro-menu>
                <auro-menuoption value="Stops">Stops</auro-menuoption>
                <auro-menuoption value="Price">Price</auro-menuoption>
                <auro-menuoption value="Duration" disabled>Duration</auro-menuoption>
              </auro-menu>
            </auro-select>
          `);

          await elementUpdated(el);
          el.showBib();
          await elementUpdated(el);

          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));
          await elementUpdated(el);

          const menu = el.querySelector('auro-menu');
          const lastEnabledOption = menu.querySelector('auro-menuoption[value="Price"]');
          await expect(el.optionActive).to.equal(lastEnabledOption);

          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
          await elementUpdated(el);

          const firstOption = menu.querySelector('auro-menuoption[value="Stops"]');
          await expect(el.optionActive).to.equal(firstOption);
        });

        it('should do nothing when all options are disabled', async () => {
          const el = await fixture(html`
            <auro-select>
              <span slot="bib.fullscreen.headline">Bib Headline</span>
              <span slot="label">Name</span>
              <auro-menu>
                <auro-menuoption value="Stops" disabled>Stops</auro-menuoption>
                <auro-menuoption value="Price" disabled>Price</auro-menuoption>
                <auro-menuoption value="Duration" disabled>Duration</auro-menuoption>
              </auro-menu>
            </auro-select>
          `);

          await elementUpdated(el);
          el.showBib();
          await elementUpdated(el);

          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));
          await elementUpdated(el);

          await expect(el.optionActive).to.equal(undefined);
        });

        it('should do nothing while the bib is collapsed', async () => {
          const el = await defaultFixture();

          await elementUpdated(el);

          const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
          await expect(dropdown.isPopoverVisible).to.be.false;

          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));
          await elementUpdated(el);

          await expect(dropdown.isPopoverVisible).to.be.false;
        });
      });

      describe('Enter', () => {
        it('should open the bib when collapsed', async () => {
          const el = await defaultFixture();
          await elementUpdated(el);

          const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
          await expect(dropdown.isPopoverVisible).to.be.false;

          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
          await elementUpdated(el);

          await expect(dropdown.isPopoverVisible).to.be.true;
        });

        it('should select the active option and close the bib', async () => {
          const el = await defaultFixture();
          const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
          const trigger = dropdown.querySelector('[slot="trigger"]');

          trigger.click();
          await expect(dropdown.isPopoverVisible).to.be.true;

          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
          await elementUpdated(el);
          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
          await elementUpdated(el);

          await expect(el.value).to.equal('Oranges');
          await expect(dropdown.isPopoverVisible).to.be.false;
        });

        if (!mobileView) {
          it('should move focus to the trigger after selecting an option', async () => {
            const el = await defaultFixture();
            const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
            const trigger = dropdown.querySelector('[slot="trigger"]');

            trigger.click();
            await elementUpdated(el);
            await expect(dropdown.isPopoverVisible).to.be.true;

            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
            await elementUpdated(el);
            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
            await elementUpdated(el);

            await expect(dropdown.isPopoverVisible).to.be.false;
            await expect(dropdown.trigger.matches(':focus')).to.be.true;
          });
        }

        it('should not deselect and should close the bib when Enter is pressed on an already-selected menuoption', async () => {
          const el = await presetValueFixture();

          await elementUpdated(el);
          await new Promise((resolve) => setTimeout(resolve, 0));
          await elementUpdated(el);

          const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
          const trigger = dropdown.querySelector('[slot="trigger"]');

          trigger.click();
          await elementUpdated(el);
          await expect(dropdown.isPopoverVisible).to.be.true;

          const menu = el.querySelector('auro-menu');
          const selectedOption = menu.querySelector('auro-menuoption[value="price"]');
          await expect(selectedOption.selected).to.be.true;

          const valueBefore = el.value;
          let deselectPreventedEvent = null;

          menu.addEventListener('auroMenu-deselectPrevented', (event) => {
            deselectPreventedEvent = event;
          }, { once: true });

          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
          await elementUpdated(menu);
          await elementUpdated(el);
          await waitUntil(() => !!deselectPreventedEvent);

          await expect(deselectPreventedEvent).to.exist;
          await expect(deselectPreventedEvent.detail.values[0]).to.equal(selectedOption);
          await expect(selectedOption.selected).to.be.true;
          await expect(el.value).to.equal(valueBefore);
          await expect(dropdown.isPopoverVisible).to.be.false;
        });

        it('should keep the dropdown open in multiselect mode', async () => {
          const el = await multiSelectFixture();
          const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
          const trigger = dropdown.querySelector('[slot="trigger"]');

          trigger.click();
          await elementUpdated(el);
          await expect(dropdown.isPopoverVisible).to.be.true;

          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
          await elementUpdated(el);

          await expect(el.value).to.not.be.undefined;
          await expect(dropdown.isPopoverVisible).to.be.true;
        });

        if (mobileView) {
          it('should select the option and close the fullscreen dialog', async () => {
            const el = await defaultFixture();
            const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
            const trigger = dropdown.querySelector('[slot="trigger"]');

            trigger.click();
            await expect(dropdown.isPopoverVisible).to.be.true;

            // Wait for fullscreen dialog to settle (double-rAF used by focus migration)
            await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
            await elementUpdated(el);

            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
            await elementUpdated(el);

            await expect(el.value).to.equal('Oranges');
            await expect(dropdown.isPopoverVisible).to.be.false;
          });
        }
      });

      describe('Escape', () => {
        it('should close the bib without making a selection', async () => {
          const el = await defaultFixture();
          const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
          const trigger = dropdown.querySelector('[slot="trigger"]');

          trigger.click();
          await expect(dropdown.isPopoverVisible).to.be.true;

          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
          await elementUpdated(el);

          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
          await elementUpdated(el);

          await expect(dropdown.isPopoverVisible).to.be.false;
          await expect(el.value).to.be.undefined;
        });

        it('should do nothing when the bib is already collapsed', async () => {
          const el = await defaultFixture();
          await elementUpdated(el);

          const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
          await expect(dropdown.isPopoverVisible).to.be.false;

          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
          await elementUpdated(el);

          await expect(dropdown.isPopoverVisible).to.be.false;
        });

        if (!mobileView) {
          it('should close the select bib without closing a parent auro-dialog', async () => {
            const dialog = await inDialogFixture();
            await elementUpdated(dialog);

            const select = dialog.querySelector('auro-select');
            await elementUpdated(select);

            const dropdown = select.shadowRoot.querySelector('[auro-dropdown]');
            const trigger = dropdown.querySelector('[slot="trigger"]');

            trigger.click();
            await elementUpdated(select);
            await expect(dropdown.isPopoverVisible).to.be.true;

            select.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, composed: true }));
            await elementUpdated(select);

            await expect(dropdown.isPopoverVisible).to.be.false;
            await expect(dialog.hasAttribute('open')).to.be.true;
          });

          // Uses rawIt to skip automatic a11y check — auro-drawer has a
          // pre-existing aria-dialog-name violation on its internal bib element.
          rawIt('should close the select bib without closing a parent auro-drawer', async () => {
            const drawer = await inDrawerFixture();
            await elementUpdated(drawer);

            const select = drawer.querySelector('auro-select');
            await elementUpdated(select);

            const dropdown = select.shadowRoot.querySelector('[auro-dropdown]');
            const trigger = dropdown.querySelector('[slot="trigger"]');

            trigger.click();
            await elementUpdated(select);
            await expect(dropdown.isPopoverVisible).to.be.true;

            select.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, composed: true }));
            await elementUpdated(select);

            await expect(dropdown.isPopoverVisible).to.be.false;
            await expect(drawer.hasAttribute('open')).to.be.true;
          });
        }
      });

      describe('Home', () => {
        it('should move to the first enabled option while expanded', async () => {
          const el = await defaultFixture();

          el.showBib();
          await elementUpdated(el);

          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
          await elementUpdated(el);

          const menu = el.querySelector('auro-menu');
          const lastOption = menu.querySelector('auro-menuoption[value="Grapes"]');
          await expect(el.optionActive === lastOption).to.be.true;

          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home' }));
          await elementUpdated(el);

          const firstOption = menu.querySelector('auro-menuoption[value="Apples"]');
          await expect(el.optionActive === firstOption).to.be.true;

          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
          await elementUpdated(el);

          await expect(el.optionActive === lastOption).to.be.true;
        });

        it('should skip disabled options when moving to first option', async () => {
          const el = await defaultFixture();
          const menu = el.querySelector('auro-menu');
          menu.querySelector('auro-menuoption').setAttribute('disabled', '');

          await elementUpdated(el);
          el.showBib();
          await elementUpdated(el);

          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
          await elementUpdated(el);
          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
          await elementUpdated(el);
          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
          await elementUpdated(el);

          await expect(el.optionActive.value).to.equal('Oranges');

          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home' }));
          await elementUpdated(el);

          const firstEnabledOption = menu.querySelector('auro-menuoption[value="Oranges"]');
          await expect(el.optionActive).to.equal(firstEnabledOption);
        });

        it('should do nothing when all options are disabled', async () => {
          const el = await fixture(html`
            <auro-select>
              <span slot="bib.fullscreen.headline">Bib Headline</span>
              <span slot="label">Name</span>
              <auro-menu>
                <auro-menuoption value="Stops" disabled>Stops</auro-menuoption>
                <auro-menuoption value="Price" disabled>Price</auro-menuoption>
                <auro-menuoption value="Duration" disabled>Duration</auro-menuoption>
              </auro-menu>
            </auro-select>
          `);

          await elementUpdated(el);
          el.showBib();
          await elementUpdated(el);

          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home' }));
          await elementUpdated(el);

          await expect(el.optionActive).to.equal(undefined);
        });

        it('should do nothing while the bib is collapsed', async () => {
          const el = await defaultFixture();

          await elementUpdated(el);

          const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
          await expect(dropdown.isPopoverVisible).to.be.false;

          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home' }));
          await elementUpdated(el);

          await expect(dropdown.isPopoverVisible).to.be.false;
        });
      });

      describe('Space', () => {
        it('should expand the bib when collapsed', async () => {
          const el = await defaultFixture();

          await elementUpdated(el);

          const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
          await expect(dropdown.isPopoverVisible).to.be.false;

          el.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
          await elementUpdated(el);

          await expect(dropdown.isPopoverVisible).to.be.true;
        });

        it('should collapse the bib when expanded', async () => {
          const el = await defaultFixture();

          await elementUpdated(el);
          el.showBib();
          await elementUpdated(el);

          const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
          await expect(dropdown.isPopoverVisible).to.be.true;

          el.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
          await elementUpdated(el);

          await expect(dropdown.isPopoverVisible).to.be.false;
          await expect(el.value).to.be.undefined;
        });

        it('should do nothing when the select is disabled', async () => {
          const el = await defaultFixture();
          el.disabled = true;

          await elementUpdated(el);

          const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
          await expect(dropdown.isPopoverVisible).to.be.false;

          el.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
          await elementUpdated(el);

          await expect(dropdown.isPopoverVisible).to.be.false;
        });
      });

      describe('Tab', () => {
        it('should close the bib', async () => {
          const el = await defaultFixture();

          const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
          const trigger = dropdown.querySelector('[slot="trigger"]');

          trigger.click();
          await expect(dropdown.isPopoverVisible).to.be.true;

          el.dispatchEvent(new KeyboardEvent('keydown', {
            'key': 'Tab'
          }));

          await expect(dropdown.isPopoverVisible).to.be.false;
        });

        it('should select the active option and close the bib', async () => {
          const el = await defaultFixture();
          const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
          const trigger = dropdown.querySelector('[slot="trigger"]');

          trigger.click();
          await elementUpdated(el);
          await expect(dropdown.isPopoverVisible).to.be.true;

          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
          await elementUpdated(el);

          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
          await elementUpdated(el);

          await expect(dropdown.isPopoverVisible).to.be.false;
          await expect(el.value).to.equal('Oranges');
        });

        it('should select the active option and close the bib in multiSelect mode', async () => {
          const el = await multiSelectFixture();
          const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
          const trigger = dropdown.querySelector('[slot="trigger"]');

          trigger.click();
          await elementUpdated(el);
          await expect(dropdown.isPopoverVisible).to.be.true;

          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
          await elementUpdated(el);

          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
          await elementUpdated(el);

          await expect(dropdown.isPopoverVisible).to.be.false;
          await expect(el.value).to.not.be.undefined;
        });

        if (mobileView) {
          it('should close the fullscreen dialog', async () => {
            const el = await defaultFixture();
            const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
            const trigger = dropdown.querySelector('[slot="trigger"]');

            trigger.click();
            await expect(dropdown.isPopoverVisible).to.be.true;

            // Wait for fullscreen dialog to settle
            await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
            await elementUpdated(el);

            await expect(dropdown.isPopoverVisible).to.be.false;
          });

          it('should restore trigger inert and focus after fullscreen dialog closes', async () => {
            const el = await defaultFixture();
            const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
            const trigger = dropdown.querySelector('[slot="trigger"]');

            trigger.click();
            await expect(dropdown.isPopoverVisible).to.be.true;

            // Wait for fullscreen dialog to settle
            await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

            // Trigger should be inert while fullscreen is open
            expect(dropdown.trigger.inert).to.be.true;

            // Close the dialog
            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
            await elementUpdated(el);

            // Wait for rAF focus restoration
            await new Promise((r) => requestAnimationFrame(r));

            expect(dropdown.trigger.inert).to.be.false;
            expect(dropdown.isPopoverVisible).to.be.false;
          });
        }

        describe('Shift', () => {
          it('should select the active option and close the bib', async () => {
            const el = await defaultFixture();
            const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
            const trigger = dropdown.querySelector('[slot="trigger"]');

            trigger.click();
            await elementUpdated(el);
            await expect(dropdown.isPopoverVisible).to.be.true;

            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
            await elementUpdated(el);

            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true }));
            await elementUpdated(el);

            await expect(dropdown.isPopoverVisible).to.be.false;
            await expect(el.value).to.equal('Oranges');
          });

          it('should do nothing when the bib is closed', async () => {
            const el = await defaultFixture();
            const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');

            await expect(dropdown.isPopoverVisible).to.be.false;

            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true }));
            await elementUpdated(el);

            await expect(dropdown.isPopoverVisible).to.be.false;
            await expect(el.optionActive).to.be.undefined;
          });
        });
      });

      describe('Type-ahead', () => {
        it('should select the first option starting with the pressed key', async () => {
          const el = await fixture(html`
            <auro-select>
              <span slot="bib.fullscreen.headline">Bib Headline</span>
              <span slot="label">Name</span>
              <auro-menu>
                <auro-menuoption value="apple">Apple</auro-menuoption>
                <auro-menuoption value="banana">Banana</auro-menuoption>
                <auro-menuoption value="apricot">Apricot</auro-menuoption>
              </auro-menu>
            </auro-select>
          `);

          await elementUpdated(el);

          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }));

          await elementUpdated(el);

          const menu = el.menu; // eslint-disable-line

          await expect(menu.optionActive).to.exist;
          await expect(menu.optionActive.value).to.equal('banana');
          await expect(menu.optionActive.textContent.trim()).to.equal('Banana');
        });

        it('should cycle through options with the same starting letter', async () => {
          const el = await fixture(html`
            <auro-select>
              <span slot="bib.fullscreen.headline">Bib Headline</span>
              <span slot="label">Name</span>
              <auro-menu>
                <auro-menuoption value="apple">Apple</auro-menuoption>
                <auro-menuoption value="apricot">Apricot</auro-menuoption>
                <auro-menuoption value="banana">Banana</auro-menuoption>
              </auro-menu>
            </auro-select>
          `);

          await elementUpdated(el);

          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
          await elementUpdated(el);
          await expect(el.menu.optionActive).to.exist;
          await expect(el.menu.optionActive.value).to.equal('apple');
          await expect(el.menu.optionActive.textContent.trim()).to.equal('Apple');

          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
          await elementUpdated(el);
          await expect(el.menu.optionActive).to.exist;
          await expect(el.menu.optionActive.value).to.equal('apricot');
          await expect(el.menu.optionActive.textContent.trim()).to.equal('Apricot');
        });

        it('should do nothing if there is no matching option for the pressed key', async () => {
          const el = await fixture(html`
            <auro-select>
              <span slot="label">Name</span>
              <auro-menu>
                <auro-menuoption value="apple">Apple</auro-menuoption>
                <auro-menuoption value="banana">Banana</auro-menuoption>
              </auro-menu>
            </auro-select>
          `);

          await elementUpdated(el);

          el.value = 'apple';
          await elementUpdated(el);

          const previousActive = el.menu.optionActive;

          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'z' }));
          await elementUpdated(el);

          await expect(el.menu.optionActive).to.equal(previousActive);
        });

        it('should loop through matching options when the same key is pressed repeatedly', async () => {
          const el = await fixture(html`
            <auro-select>
              <span slot="bib.fullscreen.headline">Bib Headline</span>
              <span slot="label">Name</span>
              <auro-menu>
                <auro-menuoption value="apple">Apple</auro-menuoption>
                <auro-menuoption value="apricot">Apricot</auro-menuoption>
                <auro-menuoption value="avocado">Avocado</auro-menuoption>
                <auro-menuoption value="banana">Banana</auro-menuoption>
              </auro-menu>
            </auro-select>
          `);

          await elementUpdated(el);

          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
          await elementUpdated(el);
          await expect(el.menu.optionActive).to.exist;
          await expect(el.menu.optionActive.value).to.equal('apple');
          await expect(el.menu.optionActive.textContent.trim()).to.equal('Apple');

          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
          await elementUpdated(el);
          await expect(el.menu.optionActive).to.exist;
          await expect(el.menu.optionActive.value).to.equal('apricot');
          await expect(el.menu.optionActive.textContent.trim()).to.equal('Apricot');

          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
          await elementUpdated(el);
          await expect(el.menu.optionActive).to.exist;
          await expect(el.menu.optionActive.value).to.equal('avocado');
          await expect(el.menu.optionActive.textContent.trim()).to.equal('Avocado');

          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
          await elementUpdated(el);
          await expect(el.menu.optionActive).to.exist;
          await expect(el.menu.optionActive.value).to.equal('apple');
          await expect(el.menu.optionActive.textContent.trim()).to.equal('Apple');
        });
      });
    });
  });
}

runTest(false);
runTest(true);

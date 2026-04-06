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
} from './testFixtures.js';
import { setScreenSize, getAnnouncementRoot } from './testFunctions.js';

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
        // add tests for this property
      });

      describe('autocomplete', () => {
        // add tests for this property
      });

      describe('autoPlacement', () => {
        // add tests for this property
      });

      describe('disabled', () => {
        // add tests for this property
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
        // add tests for this property
      });

      describe('fluid', () => {
        // add tests for this property
      });

      describe('forceDisplayValue', () => {
        // add tests for this property
      });

      describe('fullscreenBreakpoint', () => {
        // add tests for this property
      });

      describe('largeFullscreenHeadline', () => {
        // add tests for this property
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
        // add tests for this property
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
        // add tests for this property
      });

      describe('noValidate', () => {
        // add tests for this property
      });

      describe('offset', () => {
        // add tests for this property
      });

      describe('onDark', () => {
        // add tests for this property
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
        // add tests for this property
      });

      describe('placement', () => {
        // add tests for this property
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
        // add tests for this property
      });

      describe('setCustomValidityCustomError', () => {
        // add tests for this property
      });

      describe('setCustomValidityValueMissing', () => {
        // add tests for this property
      });

      describe('shape', () => {
        // add tests for this property
      });

      describe('shift', () => {
        // add tests for this property
      });

      describe('size', () => {
        // add tests for this property
      });

      describe('validity', () => {
        // add tests for this property
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
        // TODO: test needs to be added
      });

      describe('updateActiveOption', () => {
        // TODO: test needs to be added
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
        // TODO: test needs to be added
      });

      describe('reset', () => {
        // TODO: test needs to be added
      });

      describe('validate', () => {
        // TODO: test needs to be added
      });

      describe('resetShapeClasses', () => {
        // TODO: test needs to be added
      });

      describe('resetLayoutClasses', () => {
        // TODO: test needs to be added
      });

      describe('updateComponentArchitecture', () => {
        // TODO: test needs to be added
      });
    });

    describe('Private Functions', () => {
      // No private function tests
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
          // it('should toggle the bib on click', async () => {
          //   const el = await defaultFixture();

          //   const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
          //   const trigger = dropdown.querySelector('[slot="trigger"]');

          //   trigger.click();
          //   await expect(dropdown.isPopoverVisible).to.be.true;

          //   trigger.click();
          //   await expect(dropdown.isPopoverVisible).to.be.false;
          // });

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

            // it('should not deselect and should close the bib when an already-selected menuoption is clicked', async () => {
            //   const el = await presetValueFixture();

            //   await elementUpdated(el);
            //   await new Promise((resolve) => setTimeout(resolve, 0));
            //   await elementUpdated(el);

            //   const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
            //   const trigger = dropdown.querySelector('[slot="trigger"]');

            //   trigger.click();
            //   await elementUpdated(el);
            //   await expect(dropdown.isPopoverVisible).to.be.true;

            //   const menu = el.querySelector('auro-menu');
            //   const selectedOption = menu.querySelector('auro-menuoption[value="price"]');
            //   await expect(selectedOption.selected).to.be.true;

            //   const valueBefore = el.value;

            //   // Wait for menu option internal state to settle
            //   await new Promise((resolve) => setTimeout(resolve, 0));

            //   selectedOption.click();
            //   await elementUpdated(selectedOption);
            //   await elementUpdated(menu);
            //   await new Promise((resolve) => setTimeout(resolve, 0));
            //   await elementUpdated(el);

            //   // In single-select mode, clicking an already-selected option should NOT deselect it
            //   await expect(selectedOption.selected).to.be.true;
            //   await expect(el.value).to.equal(valueBefore);
            //   await expect(dropdown.isPopoverVisible).to.be.false;
            // });

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

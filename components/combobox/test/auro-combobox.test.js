/* eslint-disable max-lines, function-paren-newline */
import { fixture, html, expect, waitUntil, elementUpdated, oneEvent } from '@open-wc/testing';
import { setViewport, sendKeys } from '@web/test-runner-commands';
import '../src/registered.js';
import '../../menu/src/registered.js';
import {
  persistInputFixture,
  shiftTabFixture,
  shiftTabDisabledFirstFixture,
  defaultFixture,
  nestedMenuFixture,
  presetValueFixture,
  checkmarkFixture,
  suggestFixture,
  requiredFixture,
  noMatchFixture,
  persistentFixture,
  filterFixture,
  requiredFilterBehaviorFixture,
  customEventFixture,
  noFilterFixture,
  inDialogFixture,
  inDrawerFixture,
} from './testFixtures.js';
import { setInputValue, getAnnouncementRoot } from './testFunctions.js';

/* eslint-disable no-undef, no-use-before-define, no-magic-numbers, max-statements-per-line, brace-style, no-underscore-dangle, no-unused-expressions */

// Desktop Test Suite
// "false" means large viewport = false
describe('auro-combobox', () => {
  runFullTest(false);
});

// Mobile Test Suite
// "true" means small viewport = true (full screen dialog)
describe('auro-combobox in small viewport', () => {
  runFullTest(true);
});

/**
 * Runs the full combobox test suite for a given viewport mode.
 * @param {boolean} mobileView - Whether tests should run in small or large viewport mode.
 * @returns {void}
 */
function runFullTest(mobileView) {
  describe('Rendering', () => {
    it('should be defined as a custom element', async () => {
      const el = await Boolean(customElements.get("auro-combobox"));

      await expect(el).to.be.true;
    });

    describe('disconnectedCallback', () => {
      it('should reset _inFullscreenTransition so validation is not suppressed after reconnect', async () => {
        const el = await defaultFixture(mobileView);
        await elementUpdated(el);

        // Simulate the flag being stuck mid-transition
        el._inFullscreenTransition = true;

        // Disconnect and reconnect
        const parent = el.parentNode;
        parent.removeChild(el);
        parent.appendChild(el);
        await elementUpdated(el);

        await expect(el._inFullscreenTransition).to.be.false;
      });
    });

    it('should use label slot content as the bib dialog label', async () => {
      const el = await fixture(html`
        <auro-combobox>
          <div slot="label">Custom Label</div>
          <auro-menu>
            <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
          </auro-menu>
        </auro-combobox>
      `);

      await elementUpdated(el);

      expect(el.dropdown.bibDialogLabel).to.equal('Custom Label');
    });
  });

  describe('User Stories', () => {

    // it('reset method clears the value and validity state', async () => {
    //   const el = await requiredFixture(mobileView);

    //   el.focus();
    //   el.shadowRoot.activeElement.blur();

    //   await elementUpdated(el);
    //   await expect(el.getAttribute('validity')).to.be.equal('valueMissing');

    //   el.reset();

    //   await elementUpdated(el);

    //   await expect(el.hasAttribute('validity')).to.be.false;
    //   await expect(el.value).to.equal(undefined);
    // });

    it('should hide the bib when there are no available options', async () => {
      const el = await defaultFixture(mobileView);

      setInputValue(el, 'zzzzzz');
      await expect(el.dropdown.isPopoverVisible).to.be.false;
    });

    it('should always display the persistent option regardless of filter results', async () => {
      const el = await persistentFixture(mobileView);

      const menu = el.querySelector('auro-menu');
      const menuOptions = menu.querySelectorAll('auro-menuoption');
      const visibleMenuOptions = [];

      setInputValue(el, 'pp');

      for (let oIndex = 0; oIndex < menuOptions.length; oIndex += 1) {
        if (!menuOptions[oIndex].hasAttribute('hidden')) {
          visibleMenuOptions.push(menuOptions[oIndex]);
        }
      };

      await expect(visibleMenuOptions.length).to.be.equal(2);
      await expect(visibleMenuOptions[0].innerText).to.be.equal('Apples');
      await expect(visibleMenuOptions[1].innerText).to.be.equal('Persistent');

      await expect(visibleMenuOptions[0].querySelector("strong")).to.exist;
    });

    it('should match additional options when the suggest attribute is set', async () => {
      const el = await suggestFixture(mobileView);

      const menu = el.querySelector('auro-menu');
      const menuOptions = menu.querySelectorAll('auro-menuoption');
      const visibleMenuOptions = [];

      setInputValue(el, 'pp');

      for (let oIndex = 0; oIndex < menuOptions.length; oIndex += 1) {
        if (!menuOptions[oIndex].hasAttribute('hidden')) {
          visibleMenuOptions.push(menuOptions[oIndex]);
        }
      };

      await expect(visibleMenuOptions.length).to.be.equal(2);
      await expect(visibleMenuOptions[0].innerText).to.be.equal('Apples');
      await expect(visibleMenuOptions[1].innerText).to.be.equal('Oranges');

      await expect(visibleMenuOptions[0].querySelector("strong")).to.exist;
    });

    it('should fire auroFormElement-validated event after validation completes', async () => {
      const el = await requiredFixture(mobileView);

      // error applied on blur
      el.focus();
      setTimeout(() => {
        el.shadowRoot.activeElement.blur();
      });
      await oneEvent(el, 'auroFormElement-validated');
    });

    it('should still match "n" after cursor-editing sequence with residual trailing space', async () => {
      const el = await defaultFixture(mobileView);
      const menu = el.querySelector('auro-menu');

      // Simulate the end result of the cursor-editing sequence:
      // space, a, space, ←, ←, backspace, →, backspace, a
      // which produces "a " (a with trailing space)
      setInputValue(el, 'n ');
      await elementUpdated(el);
      await elementUpdated(menu);

      await expect(el.availableOptions.length).to.be.greaterThan(0);
      await expect(el.availableOptions[0].textContent.toLowerCase()).to.include('n');
      await expect(el.availableOptions[0].querySelector('strong')).to.exist;
    });

    it('should fire auroCombobox-valueSet event on value update', async () => {
      const el = await defaultFixture(mobileView);

      setInputValue(el, 'a');
      await elementUpdated(el);

      setTimeout(() => {
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      });

      await oneEvent(el, 'auroCombobox-valueSet');
    });

    it('should fire input event when the user types', async () => {
      const el = await defaultFixture(mobileView);

      // Set up the event listener before triggering the input change
      const inputEventPromise = oneEvent(el, 'input');

      // Trigger input change
      setInputValue(el, 'a');

      // Wait for the input event to be fired
      await inputEventPromise;
    });

    it('should show the nomatch option only when no options match the typed value', async () => {
      const el = await noMatchFixture(mobileView);

      const menu = el.querySelector('auro-menu');
      const menuOptions = menu.querySelectorAll('auro-menuoption');
      const visibleMenuOptions = [];

      setInputValue(el, 'pp');

      for (let oIndex = 0; oIndex < menuOptions.length; oIndex += 1) {
        if (!menuOptions[oIndex].hasAttribute('hidden')) {
          visibleMenuOptions.push(menuOptions[oIndex]);
        }
      };

      await expect(visibleMenuOptions.length).to.be.equal(1);
      await expect(visibleMenuOptions[0].innerText).to.be.equal('Apples');

      await expect(visibleMenuOptions[0].querySelector('strong')).to.exist;
    });

    it('should display the nomatch option when no options match and nomatch attribute is set', async () => {
      const el = await noMatchFixture(mobileView);

      const menu = el.querySelector('auro-menu');
      const menuOptions = menu.querySelectorAll('auro-menuoption');
      const visibleMenuOptions = [];

      setInputValue(el, 'zzz');

      for (let oIndex = 0; oIndex < menuOptions.length; oIndex += 1) {
        if (!menuOptions[oIndex].hasAttribute('hidden')) {
          visibleMenuOptions.push(menuOptions[oIndex]);
        }
      };

      await expect(visibleMenuOptions.length).to.be.equal(1);
      await expect(visibleMenuOptions[0].innerText).to.be.equal('No Matching Option');
    });

    it('should hide the bib when an option is selected with a custom event', async () => {
      const el = await customEventFixture(mobileView);

      await expect(el.dropdown.isPopoverVisible).to.be.false;

      setInputValue(el, 'a');
      await elementUpdated(el);
      if (mobileView) {
        el.inputInBib.focus();
        await waitUntil(() => el.shadowRoot.activeElement === el.inputInBib);
      }

      el.dispatchEvent(new KeyboardEvent('keydown', {
        'key': 'Enter'
      }));


      el.dispatchEvent(new KeyboardEvent('keydown', {
        'key': 'ArrowDown'
      }));

      el.dispatchEvent(new KeyboardEvent('keydown', {
        'key': 'Enter'
      }));

      await expect(el.dropdown.isPopoverVisible).to.be.false;
    });

    it('should set the first menu option as active when the dropdown opens without a selection', async () => {
      const el = await defaultFixture(mobileView);
      const menuOptions = el.querySelector('auro-menu').querySelectorAll('auro-menuoption');

      // Simulate dropdown opening with no value set
      el.dropdown.dispatchEvent(new CustomEvent('auroDropdown-toggled', {
        detail: { expanded: true }
      }));

      // Wait for the 150ms expandedDelay to elapse
      await new Promise((res) => setTimeout(res, 200));
      await elementUpdated(el);

      await expect(el.optionActive).to.equal(menuOptions[0]);
      await expect(el.menu.index).to.equal(0);
    });

    it('should preserve leading space — " a" does not match options', async () => {
      const el = await defaultFixture(mobileView);
      const menu = el.querySelector('auro-menu');
      const menuOptions = menu.querySelectorAll('auro-menuoption');

      setInputValue(el, ' a');
      await elementUpdated(el);
      await elementUpdated(menu);

      const visibleMenuOptions = [...menuOptions].filter((opt) => !opt.hasAttribute('hidden'));

      await expect(visibleMenuOptions.length).to.be.equal(0);
    });

    it('should filter the list of options when the user types', async () => {
      const el = await defaultFixture(mobileView);

      const menu = el.querySelector('auro-menu');
      const menuOptions = menu.querySelectorAll('auro-menuoption');
      const visibleMenuOptions = [];

      setInputValue(el, 'pp');

      for (let oIndex = 0; oIndex < menuOptions.length; oIndex += 1) {
        if (!menuOptions[oIndex].hasAttribute('hidden')) {
          visibleMenuOptions.push(menuOptions[oIndex]);
        }
      };

      await expect(visibleMenuOptions.length).to.be.equal(1);
      await expect(visibleMenuOptions[0].innerText).to.be.equal('Apples');

      await expect(visibleMenuOptions[0].querySelector("strong")).to.exist;
    });

    it('should match options containing "a" with bold highlighting when typing "a"', async () => {
      const el = await defaultFixture(mobileView);
      const menu = el.querySelector('auro-menu');
      const menuOptions = menu.querySelectorAll('auro-menuoption');

      setInputValue(el, 'a');
      await elementUpdated(el);
      await elementUpdated(menu);

      const visibleMenuOptions = [...menuOptions].filter((opt) => !opt.hasAttribute('hidden'));

      await expect(visibleMenuOptions.length).to.be.greaterThan(0);
      for (const opt of visibleMenuOptions) {
        expect(opt.textContent.toLowerCase()).to.include('a');
        expect(opt.querySelector('strong')).to.exist;
      }
    });

    it('should strip trailing space — "a " matches same options as "a"', async () => {
      const el = await defaultFixture(mobileView);
      const menu = el.querySelector('auro-menu');
      const menuOptions = menu.querySelectorAll('auro-menuoption');

      // First get baseline with "a"
      setInputValue(el, 'a');
      await elementUpdated(el);
      await elementUpdated(menu);
      const baselineVisible = [...menuOptions].filter((opt) => !opt.hasAttribute('hidden'));
      const baselineValues = baselineVisible.map((opt) => opt.getAttribute('value'));

      // Reset
      setInputValue(el, '');
      await elementUpdated(el);
      await elementUpdated(menu);

      // Now test "a " (trailing space)
      setInputValue(el, 'a ');
      await elementUpdated(el);
      await elementUpdated(menu);
      const trailingSpaceVisible = [...menuOptions].filter((opt) => !opt.hasAttribute('hidden'));
      const trailingSpaceValues = trailingSpaceVisible.map((opt) => opt.getAttribute('value'));

      await expect(trailingSpaceValues).to.deep.equal(baselineValues);
    });

    it('should not match any options when only a space is typed', async () => {
      const el = await defaultFixture(mobileView);
      const menu = el.querySelector('auro-menu');
      const menuOptions = menu.querySelectorAll('auro-menuoption');

      setInputValue(el, ' ');
      await elementUpdated(el);
      await elementUpdated(menu);

      const visibleMenuOptions = [...menuOptions].filter((opt) => !opt.hasAttribute('hidden'));

      await expect(visibleMenuOptions.length).to.be.equal(0);
    });

    it('should filter options by space substring when only a space is typed', async () => {
      const el = await noMatchFixture(mobileView);
      const menu = el.querySelector('auro-menu');
      const menuOptions = menu.querySelectorAll('auro-menuoption');

      setInputValue(el, ' ');
      await elementUpdated(el);
      await elementUpdated(menu);

      const visibleMenuOptions = [...menuOptions].filter((opt) => !opt.hasAttribute('hidden'));

      // Options whose text contains a space will match (e.g. "No Matching Option").
      // Options without spaces in their text will be hidden.
      for (const opt of visibleMenuOptions) {
        expect(opt.textContent).to.include(' ');
      }
    });

    it('should hide the bib when there are no available options', async () => {
      const el = await defaultFixture(mobileView);

      setInputValue(el, 'zzzzzz');
      await expect(el.dropdown.isPopoverVisible).to.be.false;
    });

    // These tests require fullscreen (mobile) mode
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

    describe('behavior', () => {
      it('should enforce menu selection when behavior is set to filter', async () => {
        const el = await filterFixture(mobileView);

        // initial state
        await expect(el.value).to.be.undefined;
        await expect(el.hasAttribute('error')).to.be.false;

        // type in a value that matches an option
        setInputValue(el, 'pp');
        await elementUpdated(el);

        if (mobileView) {
          // Wait for the fullscreen dialog transition to settle —
          // focus moves from trigger to inputInBib via requestAnimationFrame after the dialog is shown, so we wait until the inputInBib is focused before proceeding with the test.
          el.inputInBib.focus();
          await waitUntil(() => el.shadowRoot.activeElement === el.inputInBib);
        }

        await expect(el.value).to.be.undefined;
        await expect(el.hasAttribute('error')).to.be.false;
        await expect(el.hasAttribute('validity')).to.be.false;

        if (mobileView) {
          // Close the fullscreen dialog without selecting an option.
          // After dialog.close(), a rAF callback restores focus to the trigger input.
          el.hideBib();
          // eslint-disable-next-line no-await-in-loop
          await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
          await elementUpdated(el);
        }

        // blur the input to trigger validation
        el.shadowRoot.activeElement.blur();
        await elementUpdated(el);

        // should be errored because no option was selected
        await expect(el.getAttribute('validity')).to.be.equal('valueMissing');
        await expect(el.errorMessage).to.be.equal('filter error');

        // select a value from the menu by setting the value of the combobox
        el.value = 'Apples';

        // wait for the combobox and dialog close to fully settle
        await elementUpdated(el);
        await new Promise((resolve) => setTimeout(resolve, 0));
        await elementUpdated(el);

        // blur to move focus away (dialog.close() restores focus to the combobox,
        // which prevents child input validation from running)
        el.blur();

        // trigger validation
        el.validate(true);
        await elementUpdated(el);

        // expect the value to be set to 'Apples' and the error to be cleared
        await expect(el.value).to.be.equal('Apples');
        await expect(el.hasAttribute('error')).to.be.false;
        await expect(el.getAttribute('validity')).to.be.equal('valid');
      });

      it('should update value from typed input when behavior is set to suggestion', async () => {
        const el = await requiredFixture(mobileView);

        await expect(el.behavior).to.equal('suggestion');
        await expect(el.value).to.be.undefined;

        setInputValue(el, 'App');
        await elementUpdated(el);

        await expect(el.input.value).to.equal('App');
        await expect(el.value).to.equal('App');

        // Close the fullscreen dialog without selecting an option.
        el.hideBib();

        if (mobileView) {
          await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
          await elementUpdated(el);
        }
        el.blur();
        // trigger validation
        el.validate(true);
        await elementUpdated(el);
        await expect(el.getAttribute('validity')).to.equal('valid');
      });

      it('should not update value from typed input when behavior is set to filter', async () => {
        const el = await requiredFilterBehaviorFixture(mobileView);

        await expect(el.behavior).to.equal('filter');
        await expect(el.value).to.be.undefined;

        setInputValue(el, 'App');
        await elementUpdated(el);

        await expect(el.input.value).to.equal('App');
        await expect(el.value).to.be.undefined;

        // Close the fullscreen dialog without selecting an option.
        el.hideBib();

        if (mobileView) {
          await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
          await elementUpdated(el);
        }
        el.blur();
        // trigger validation
        el.validate(true);
        await elementUpdated(el);
        await expect(el.getAttribute('validity')).to.equal('valueMissing');
      });

    });

    describe('checkmark', () => {
      it('should default to no checkmark on the selected option', async () => {
        const el = await defaultFixture(mobileView);

        const menu = el.querySelector('auro-menu');
        await expect(menu.hasAttribute('nocheckmark')).to.be.true;
      });

      it('should display a checkmark on selected options when checkmark attribute is present', async () => {
        const el = await checkmarkFixture(mobileView);

        const menu = el.querySelector('auro-menu');
        await expect(menu.hasAttribute('nocheckmark')).to.be.false;
      });

    });

    describe('disabled', () => {
      // add tests for this property
    });

    describe('dvInputOnly', () => {
      // add tests for this property
    });

    describe('error', () => {
      it('should show error state when error attribute is set', async () => {
        const el = await defaultFixture(mobileView);

        // Initial state should have no error
        await expect(el.hasAttribute('error')).to.be.false;
        await expect(el.validity).to.be.undefined;

        // Set error attribute
        el.setAttribute('error', 'This is an error message');
        await elementUpdated(el);

        // Should show error state with customError validity
        await expect(el.getAttribute('validity')).to.be.equal('customError');
        await expect(el.errorMessage).to.be.equal('This is an error message');

        // Remove error attribute
        el.removeAttribute('error');
        el.validate(true);
        await elementUpdated(el);

        // Should clear the customError state and return to valid
        await expect(el.getAttribute('validity')).to.be.equal('valid');
      });

    });

    describe('format', () => {
      // add tests for this property
    });

    describe('fullscreenBreakpoint', () => {
      // add tests for this property
    });

    describe('inputmode', () => {
      it('should pass inputmode attribute to the inner input element', async () => {
        const el = await defaultFixture(mobileView);
        const auroInput = el.input;
        const inputmode = 'numeric';
        auroInput.inputmode = inputmode;
        await elementUpdated(el);

        const input = auroInput.shadowRoot.querySelector("input");
        await expect(input.getAttribute("inputmode"), inputmode);

        input.removeAttribute('inputmode');
        await elementUpdated(el);
        await expect(input.hasAttribute("inputmode")).to.be.false;
      });

    });

    describe('largeFullscreenHeadline', () => {
      // add tests for this property
    });

    describe('layout', () => {
      // add tests for this property
    });

    describe('noFilter', () => {
      it('should not filter suggestions when noFilter attribute is set', async () => {
        const el = await noFilterFixture(mobileView);

        const menu = el.querySelector('auro-menu');
        const menuOptions = menu.querySelectorAll('auro-menuoption');
        const visibleMenuOptions = [];

        setInputValue(el, 'pp');

        for (let oIndex = 0; oIndex < menuOptions.length; oIndex += 1) {
          if (!menuOptions[oIndex].hasAttribute('hidden')) {
            visibleMenuOptions.push(menuOptions[oIndex]);
          }
        };

        await expect(visibleMenuOptions.length).to.be.equal(2);
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
      // add tests for this property
    });

    describe('persistInput', () => {
      it('should validate required state correctly when persistInput attribute is set', async () => {
        const el = await persistInputFixture(mobileView);

        el.focus();
        el.shadowRoot.activeElement.blur();
        await elementUpdated(el);

        // validity should be `valueMissing` because the input and combo box value are still undefined
        await expect(el.getAttribute('validity')).to.be.equal('valueMissing');

        setInputValue(el, 'pp');
        await elementUpdated(el);

        if (mobileView) {
          // Wait for the fullscreen dialog transition to settle,
          // then close the dialog and wait for focus to return to trigger
          el.inputInBib.focus();
          await waitUntil(() => el.shadowRoot.activeElement === el.inputInBib);
          el.hideBib();
          await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
          await elementUpdated(el);
        }

        el.shadowRoot.activeElement.blur();
        await elementUpdated(el);

        // validity should 'valid' because it's suggestion behavior mode
        await expect(el.getAttribute('validity')).to.be.equal('valid');
      });

    });

    describe('placement', () => {
      // add tests for this property
    });

    describe('placeholder', () => {
      // add tests for this property
    });

    describe('required', () => {
      it('should validate as required when required attribute is set and no value is selected', async () => {
        const el = await requiredFixture(mobileView);

        // error applied on blur
        el.focus();

        el.shadowRoot.activeElement.blur();
        await elementUpdated(el);

        await expect(el.getAttribute('validity')).to.be.equal('valueMissing');

        // error because no option was selected yet
        setInputValue(el, 'pp');
        el.shadowRoot.activeElement.blur();

        await elementUpdated(el);

        await expect(el.getAttribute('validity')).to.be.equal('valid');
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

    describe('setCustomValidityValueMissingFilter', () => {
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

    describe('triggerIcon', () => {
      // add tests for this property
    });

    describe('type', () => {
      // add tests for this property
    });

    describe('typedValue', () => {
      // add tests for this property
    });

    describe('validity', () => {
      // add tests for this property
    });

    describe('value', () => {
      it('should make a selection when value is set programmatically', async () => {
        const el = await defaultFixture(mobileView);

        el.value = 'Apples';
        await elementUpdated(el);

        const selectedOption = el.querySelector('auro-menuoption[value="Apples"]');
        el.optionSelected = selectedOption;
        await elementUpdated(el);

        await expect(el.value).to.deep.equal('Apples');
        await expect(el.optionSelected).to.equal(selectedOption);
      });

      it('should reset selection value when reset() is called programmatically', async () => {
        const el = await presetValueFixture(mobileView);

        el.reset();

        await elementUpdated(el);

        await expect(el.optionSelected === undefined).to.be.true;
      });

      it('should not throw an error when programmatically setting a value that doesn\'t match an option', async () => {
        const el = await defaultFixture(mobileView);

        await expect(el.hasAttribute('error')).to.be.false;

        el.value = 'Dragon Fruit';

        await elementUpdated(el);

        await expect(el.hasAttribute('error')).to.be.false;
      });

    });

  });

  describe('Slots', () => {
    describe('default', () => {
      it('should render content in the default slot', async () => {
        const el = await defaultFixture(mobileView);

        const slot = el.shadowRoot.querySelector('slot:not([name])');

        await expect(slot).to.exist;
        const assigned = slot.assignedNodes().filter((node) => node.nodeType === Node.ELEMENT_NODE);

        await expect(assigned.length).to.be.greaterThan(0);
      });
    });

    describe('optionalLabel', () => {
      it('should render content in the optionalLabel slot', async () => {
        const el = await fixture(html`<auro-combobox><span slot="label">Choose</span><span slot="optionalLabel">(optional)</span><auro-menu><auro-menuoption value="one">One</auro-menuoption></auro-menu></auro-combobox>`);

        const slotContent = el.querySelector('[slot="optionalLabel"]');

        await expect(slotContent).to.exist;
      });
    });

    describe('ariaLabel.input.clear', () => {
      it('should render content in the ariaLabel.input.clear slot', async () => {
        const el = await fixture(html`<auro-combobox><span slot="label">Choose</span><span slot="ariaLabel.input.clear">Clear input</span><auro-menu><auro-menuoption value="one">One</auro-menuoption></auro-menu></auro-combobox>`);

        const slotContent = el.querySelector('[slot="ariaLabel.input.clear"]');

        await expect(slotContent).to.exist;
      });
    });

    describe('ariaLabel.bib.close', () => {
      it('should render content in the ariaLabel.bib.close slot', async () => {
        const el = await fixture(html`<auro-combobox><span slot="label">Choose</span><span slot="ariaLabel.bib.close">Close menu</span><auro-menu><auro-menuoption value="one">One</auro-menuoption></auro-menu></auro-combobox>`);

        const slotContent = el.querySelector('[slot="ariaLabel.bib.close"]');

        await expect(slotContent).to.exist;
      });
    });

    describe('bib.fullscreen.headline', () => {
      it('should render content in the bib.fullscreen.headline slot', async () => {
        const el = await fixture(html`<auro-combobox><span slot="label">Choose</span><span slot="bib.fullscreen.headline">Select option</span><auro-menu><auro-menuoption value="one">One</auro-menuoption></auro-menu></auro-combobox>`);

        const slotContent = el.querySelector('[slot="bib.fullscreen.headline"]');

        await expect(slotContent).to.exist;
      });
    });

    describe('label', () => {
      it('should render content in the label slot', async () => {
        const el = await defaultFixture(mobileView);

        const slotContent = el.querySelector('[slot="label"]');

        await expect(slotContent).to.exist;
      });
    });

    describe('helpText', () => {
      it('should render content in the helpText slot', async () => {
        const el = await fixture(html`<auro-combobox><span slot="label">Choose</span><span slot="helpText">Type to search</span><auro-menu><auro-menuoption value="one">One</auro-menuoption></auro-menu></auro-combobox>`);

        const slotContent = el.querySelector('[slot="helpText"]');

        await expect(slotContent).to.exist;
      });
    });

    describe('displayValue', () => {
      it('should render content in the displayValue slot', async () => {
        const el = await fixture(html`<auro-combobox><span slot="label">Choose</span><span slot="displayValue">Custom value</span><auro-menu><auro-menuoption value="one">One</auro-menuoption></auro-menu></auro-combobox>`);

        const slotContent = el.querySelector('[slot="displayValue"]');

        await expect(slotContent).to.exist;
      });
    });

  });

  describe('Public Functions', () => {
    describe('isValid', () => {
      // TODO: test needs to be added
    });

    describe('register', () => {
      // TODO: test needs to be added
    });

    describe('hideBib', () => {
      // TODO: test needs to be added
    });

    describe('showBib', () => {
      // TODO: test needs to be added
    });

    describe('focus', () => {
      it('should programmatically apply focus to input when focus() is called', async () => {
        const el = await defaultFixture(mobileView);

        const { input } = el;

        el.focus();

        await expect(el.shadowRoot.activeElement).to.be.equal(input);
      });

      it('should programmatically apply focus to input when focus() is called', async () => {
        const el = await defaultFixture(mobileView);

        const { input } = el;

        el.focus();

        await expect(el.shadowRoot.activeElement).to.be.equal(input);
      });

      if (mobileView) {
        it('should focus input in bib when fullscreen dialog opens', async () => {
          const el = await defaultFixture(mobileView);

          setInputValue(el, 'a');
          await elementUpdated(el);

          // inputInBib should exist in fullscreen mode
          await expect(el.inputInBib).to.exist;

          // Follow existing mobile pattern: explicitly focus inputInBib
          el.inputInBib.focus();
          await waitUntil(() => el.shadowRoot.activeElement === el.inputInBib);
          expect(el.shadowRoot.activeElement).to.equal(el.inputInBib);
        });
      }
    });

    describe('setMenuValue', () => {
      // TODO: test needs to be added
    });

    describe('reset', () => {
      // TODO: test needs to be added
    });

    describe('clear', () => {
      // TODO: test needs to be added
    });

    describe('validate', () => {
      // TODO: test needs to be added
    });

    describe('updateActiveOption', () => {
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

    describe('inputValue', () => {
      // TODO: test needs to be added
    });
  });

  describe('Private Functions', () => {
    // No private function tests
  });

  describe('A11Y', () => {
    it('should be accessible', async () => {
      const el = await noFilterFixture(mobileView);

      await elementUpdated(el);

      await expect(el).to.be.accessible();
    });

    describe('Screen Reader', function() {
      this.timeout(5000);

      it('should populate the live region when an option is activated', async () => {
        const el = await noFilterFixture(mobileView);
        await elementUpdated(el);

        // Open the dropdown and navigate to the first option
        el.focus();
        setInputValue(el, 'a');
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        await elementUpdated(el);

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        await elementUpdated(el);

        // Wait a frame for the rAF inside announceToScreenReader
        await new Promise((resolve) => requestAnimationFrame(resolve));

        const liveRegion = getAnnouncementRoot(el.dropdown, el.shadowRoot).querySelector('#srAnnouncement');
        await expect(liveRegion).to.exist;
        await expect(liveRegion.textContent).to.not.equal('');
      });

      it('should clear the live region after the announcement duration', async () => {
        const el = await noFilterFixture(mobileView);
        await elementUpdated(el);

        el.focus();
        setInputValue(el, 'a');
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        await elementUpdated(el);

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
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
          const el = await noFilterFixture(mobileView);
          await elementUpdated(el);

          // Open the dropdown
          el.focus();
          setInputValue(el, 'a');
          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
          await elementUpdated(el);
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

        it('should set aria-activedescendant on inputInBib in fullscreen mode', async () => {
          const el = await noFilterFixture(mobileView);
          await elementUpdated(el);

          // Open the dropdown
          el.focus();
          setInputValue(el, 'a');
          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
          await elementUpdated(el);
          await waitUntil(() => el.dropdown.isPopoverVisible);

          // Simulate fullscreen (resize observers don't fire in test env)
          el.dropdown.isBibFullscreen = true;
          await elementUpdated(el.dropdown);

          // Wait for inputInBib's inner input to render
          await waitUntil(() => el.inputInBib && el.inputInBib.inputElement);

          // Navigate directly via the menu to trigger auroMenu-activatedOption,
          // bypassing the dialog keyboard bridge which doesn't fire in test env.
          el.menu.navigateOptions('down');
          await elementUpdated(el);
          // Wait for Lit to propagate optionActive to inputInBib's template
          await elementUpdated(el.inputInBib);

          expect(el.optionActive).to.exist;

          // The Lit template binding sets a11yActivedescendant on inputInBib
          // when optionActive is set, which renders as aria-activedescendant
          // on the native input.
          const nativeInput = el.inputInBib.inputElement;
          expect(nativeInput.getAttribute('aria-activedescendant')).to.exist;
        });

        it('should clear aria-activedescendant on inputInBib when dropdown closes', async () => {
          const el = await noFilterFixture(mobileView);
          await elementUpdated(el);

          // Open the dropdown
          el.focus();
          setInputValue(el, 'a');
          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
          await elementUpdated(el);
          await waitUntil(() => el.dropdown.isPopoverVisible);

          // Simulate fullscreen (resize observers don't fire in test env)
          el.dropdown.isBibFullscreen = true;
          await elementUpdated(el.dropdown);

          // Wait for inputInBib's inner input to render
          await waitUntil(() => el.inputInBib && el.inputInBib.inputElement);

          // Navigate directly via the menu to set activedescendant
          el.menu.navigateOptions('down');
          await elementUpdated(el);

          // Close the dropdown
          el.hideBib();
          await elementUpdated(el);
          await waitUntil(() => !el.dropdown.isPopoverVisible);
          await elementUpdated(el.inputInBib);

          const nativeInput = el.inputInBib.inputElement;
          expect(nativeInput.hasAttribute('aria-activedescendant')).to.be.false;
        });
      }
    });

    describe('updateBibDialogRole', () => {
      it('should set bib dialogRole to presentation on desktop to suppress verbose announcements', async () => {
        // Use a wide viewport so the bib does NOT go fullscreen
        await setViewport({
          width: 1024,
          height: 800
        });

        const el = await fixture(html`
          <auro-combobox>
            <span slot="label">Name</span>
            <auro-menu>
              <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
              <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
            </auro-menu>
          </auro-combobox>
        `);

        await elementUpdated(el);

        // Open the bib by typing
        setInputValue(el, 'a');
        await elementUpdated(el);
        await waitUntil(() => el.dropdown.isPopoverVisible);

        const bibEl = el.dropdown.bibElement.value;
        const dialog = bibEl.shadowRoot.querySelector('dialog');

        expect(bibEl.dialogRole).to.equal('presentation');
        expect(dialog.getAttribute('role')).to.equal('presentation');
      });

      it('should clear bib dialogRole in fullscreen mode to preserve native dialog semantics', async () => {
        const el = await defaultFixture(mobileView);

        await elementUpdated(el);

        // Open the bib by typing
        setInputValue(el, 'a');
        await elementUpdated(el);
        await waitUntil(() => el.dropdown.isPopoverVisible);

        // Simulate fullscreen strategy change (resize observers don't fire in test env)
        el.dropdown.isBibFullscreen = true;
        el.updateBibDialogRole();
        await elementUpdated(el);

        const bibEl = el.dropdown.bibElement.value;
        await elementUpdated(bibEl);
        const dialog = bibEl.shadowRoot.querySelector('dialog');

        await expect(bibEl.dialogRole).to.be.undefined;
        await expect(dialog.hasAttribute('role')).to.be.false;
      });
    });
  });

  describe('Mouse Behavior', () => {
    describe('Click', () => {
      describe('Trigger', () => {
        it('should show the bib on click only when a value is present in the input', async () => {
          const el = await defaultFixture(mobileView);
          const trigger = el.dropdown.querySelector('[slot="trigger"]');
          trigger.click();
          await expect(el.dropdown.isPopoverVisible).to.be.false;
          setInputValue(el, 'ra');

          trigger.click();

          await expect(el.dropdown.isPopoverVisible).to.be.true;
        });

        describe('Clear Button', () => {
          it('should clear the input value when clear button is clicked', async () => {
            const el = await defaultFixture(mobileView);

            el.focus();
            setInputValue(el, 'a');
            await elementUpdated(el);

            if (mobileView) {
              el.inputInBib.focus();
              await waitUntil(() => el.shadowRoot.activeElement === el.inputInBib);
            }

            const activeInput = mobileView ? el.inputInBib : el.input;
            const clearBtn = activeInput.shadowRoot.querySelector('.clearBtn');
            await expect(clearBtn).to.exist;

            clearBtn.click();
            await elementUpdated(el);

            await expect(activeInput.value).to.not.be.ok;
          });

          if (mobileView) {
            it('should clear the trigger input value when its clear button is clicked', async () => {
              const el = await defaultFixture(mobileView);

              el.focus();
              setInputValue(el, 'a');
              await elementUpdated(el);

              // In mobile mode the bib opens and inputInBib gets focus,
              // but the trigger input still holds the value and its clear button.
              el.inputInBib.focus();
              await waitUntil(() => el.shadowRoot.activeElement === el.inputInBib);

              const triggerInput = el.input;
              const clearBtn = triggerInput.shadowRoot.querySelector('.clearBtn');
              await expect(clearBtn).to.exist;

              clearBtn.click();
              await elementUpdated(el);

              await expect(triggerInput.value).to.not.be.ok;
            });
          }
        });

        describe('Menu Option', () => {
          it('should not select or close the bib when a disabled menuoption is clicked', async () => {
            const el = await shiftTabDisabledFirstFixture(mobileView);

            el.focus();
            setInputValue(el, 'a');
            await elementUpdated(el);

            if (mobileView) {
              el.inputInBib.focus();
              await waitUntil(() => el.shadowRoot.activeElement === el.inputInBib);
            }

            await expect(el.dropdown.isPopoverVisible).to.be.true;

            const valueBefore = el.value;
            const menu = el.querySelector('auro-menu');
            const disabledOption = menu.querySelector('auro-menuoption[disabled]');

            // Click the disabled option immediately (no settle wait)
            disabledOption.click();
            await elementUpdated(disabledOption);
            await elementUpdated(el);

            await expect(el.value).to.equal(valueBefore);
            await expect(disabledOption.selected).to.be.false;
            await expect(el.dropdown.isPopoverVisible).to.be.true;
          });

          it('should not deselect and should close the bib when an already-selected menuoption is clicked', async () => {
            const el = await presetValueFixture(mobileView);

            el.focus();
            await sendKeys({ press: 'Enter' });
            await elementUpdated(el);

            if (mobileView) {
              el.inputInBib.focus();
              await waitUntil(() => el.shadowRoot.activeElement === el.inputInBib);
            }

            await expect(el.dropdown.isPopoverVisible).to.be.true;

            const menu = el.querySelector('auro-menu');
            const selectedOption = menu.querySelector('auro-menuoption[value="Apples"]');

            await expect(selectedOption.selected).to.be.true;

            const valueBefore = el.value;

            // Click the already-selected option immediately (no settle wait)
            selectedOption.click();
            await elementUpdated(selectedOption);
            await elementUpdated(menu);
            await new Promise((resolve) => setTimeout(resolve, 0));
            await elementUpdated(el);

            await expect(el.value).to.equal(valueBefore);
            await expect(el.dropdown.isPopoverVisible).to.be.false;
          });

          it('should select an option and close the bib when a menuoption is clicked', async () => {
            const el = await defaultFixture(mobileView);

            el.focus();
            setInputValue(el, 'a');
            await elementUpdated(el);

            if (mobileView) {
              el.inputInBib.focus();
              await waitUntil(() => el.shadowRoot.activeElement === el.inputInBib);
            }

            await expect(el.dropdown.isPopoverVisible).to.be.true;

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
            await expect(el.dropdown.isPopoverVisible).to.be.false;
          });
        });

        describe('Close Button', () => {
          // The close button only exists in fullscreen (mobile) mode
          if (mobileView) {
            it('should close the fullscreen dialog when close button is clicked', async () => {
              const el = await defaultFixture(mobileView);

              el.focus();
              setInputValue(el, 'a');
              el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
              await elementUpdated(el);
              await expect(el.dropdown.isPopoverVisible).to.be.true;

              el.inputInBib.focus();
              await waitUntil(() => el.shadowRoot.activeElement === el.inputInBib);

              // Click the close button in the bibtemplate
              const closeBtn = el.bibtemplate.shadowRoot.querySelector('#closeButton');
              await expect(closeBtn).to.exist;
              closeBtn.click();

              await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
              await elementUpdated(el);

              await expect(el.dropdown.isPopoverVisible).to.be.false;
            });
          }
        });
      });
    });
  });

  describe('Keyboard Behavior', () => {

    describe('Old keyboard tests', () => {
      it('should navigate menu options with up and down arrow keys', async () => {
        const el = await defaultFixture(mobileView);

        // Validate bib is shown when hitting enter but there is a value in the input
        setInputValue(el, 'pp');
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        await elementUpdated(el);

        setInputValue(el, 'a');
        await elementUpdated(el);

        if (mobileView) {
          el.inputInBib.focus();
          await waitUntil(() => el.shadowRoot.activeElement === el.inputInBib);
        }

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        await elementUpdated(el);

        const menu = el.querySelector('auro-menu');
        const menuOptions = menu.querySelectorAll('auro-menuoption');

        await expect(el.optionActive).to.be.equal(menuOptions[1]);
        await expect(menuOptions[0].classList.contains('active')).to.be.false;
        await expect(menuOptions[1].classList.contains('active')).to.be.true;

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        await elementUpdated(el);

        await expect(el.optionActive).to.be.equal(menuOptions[0]);
        await expect(menuOptions[0].classList.contains('active')).to.be.true;
        await expect(menuOptions[1].classList.contains('active')).to.be.false;

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
        await elementUpdated(el);

        await expect(el.optionActive).to.be.equal(menuOptions[1]);
        await expect(menuOptions[0].classList.contains('active')).to.be.false;
        await expect(menuOptions[1].classList.contains('active')).to.be.true;
      });

      it('should navigate nested menu options with up and down arrow keys', async () => {
        const el = await nestedMenuFixture(mobileView);

        // Validate bib is shown when hitting enter but there is a value in the input
        setInputValue(el, 'pp');
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        await elementUpdated(el);

        setInputValue(el, 'option');
        await elementUpdated(el);

        if (mobileView) {
          el.inputInBib.focus();
          await waitUntil(() => el.shadowRoot.activeElement === el.inputInBib);
        }

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        await elementUpdated(el);
        await expect(el.optionActive.value).to.equal('option a');

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        await elementUpdated(el);
        await expect(el.optionActive.value).to.equal('option b');

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        await elementUpdated(el);
        await expect(el.optionActive.value).to.equal('option 2');

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        await elementUpdated(el);
        await expect(el.optionActive.value).to.equal('option 1');
        // await expect(el.optionActive).to.equal(rootOptions[1]);

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
        await elementUpdated(el);
        await expect(el.optionActive.value).to.equal('option 2');
      });

      it('should make a selection using the keyboard', async () => {
        const el = await defaultFixture(mobileView);

        setInputValue(el, 'a');
        await elementUpdated(el);

        if (mobileView) {
          el.inputInBib.focus();
          await waitUntil(() => el.shadowRoot.activeElement === el.inputInBib);
        }


        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        await elementUpdated(el);

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        await elementUpdated(el);

        await expect(el.value).to.equal('Oranges');
      });
    });

    describe('Enter', () => {
      it('should open the bib when pressed with a value in the input', async () => {
        const el = await defaultFixture(mobileView);

        // Validate bib is not shown when hitting enter but there is no value in the input
        el.focus();
        el.dispatchEvent(new KeyboardEvent('keydown', {
          'key': 'Enter'
        }));
        await expect(el.dropdown.isPopoverVisible).to.be.false;

        // Validate bib is shown when hitting enter but there is a value in the input
        setInputValue(el, 'pp');
        el.dispatchEvent(new KeyboardEvent('keydown', {
          'key': 'Enter'
        }));

        await expect(el.dropdown.isPopoverVisible).to.be.true;
      });

      it('should not propagate the event when opening the bib', async () => {
        const el = await defaultFixture(mobileView);

        el.focus();
        setInputValue(el, 'a');

        let propagated = false;
        const listener = () => { propagated = true; };
        // Listen on the parent to detect if the event bubbles past the combobox
        el.parentElement.addEventListener('keydown', listener);

        el.dispatchEvent(new KeyboardEvent('keydown', {
          key: 'Enter',
          bubbles: true,
          cancelable: true
        }));
        await elementUpdated(el);

        el.parentElement.removeEventListener('keydown', listener);

        await expect(propagated).to.be.false;
        await expect(el.dropdown.isPopoverVisible).to.be.true;
      });

      it('should select the active option and close the bib', async () => {
        const el = await defaultFixture(mobileView);

        el.focus();
        setInputValue(el, 'a');

        await elementUpdated(el);
        const options = el.querySelectorAll('auro-menuoption');
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        await new Promise((resolve) => setTimeout(resolve, 0));

        await expect(el.value).to.equal(options[0].getAttribute('value'));
        await expect(el.dropdown.isPopoverVisible).to.be.false;
      });

      describe('with clear button focused', () => {
        it('should not call preventDefault and should allow browser to activate clear button', async () => {
          const el = await defaultFixture(mobileView);

          el.focus();
          setInputValue(el, 'a');
          await elementUpdated(el);

          if (mobileView) {
            el.inputInBib.focus();
            await waitUntil(() => el.shadowRoot.activeElement === el.inputInBib);
          }

          const activeInput = mobileView ? el.inputInBib : el.input;
          const clearBtn = activeInput.shadowRoot.querySelector('.clearBtn');
          await expect(clearBtn).to.exist;

          const nativeBtn = clearBtn.shadowRoot.querySelector('button');
          await expect(nativeBtn).to.exist;
          nativeBtn.focus();
          await elementUpdated(el);

          await expect(clearBtn.shadowRoot.activeElement).to.not.be.null;

          const enterEvt = new KeyboardEvent('keydown', {
            key: 'Enter',
            bubbles: true,
            cancelable: true
          });
          el.dispatchEvent(enterEvt);
          await elementUpdated(el);

          await expect(enterEvt.defaultPrevented).to.be.false;
        });

        it('should clear the input when Enter activates the clear button', async () => {
          const el = await defaultFixture(mobileView);

          el.focus();
          setInputValue(el, 'a');
          await elementUpdated(el);

          if (mobileView) {
            el.inputInBib.focus();
            await waitUntil(() => el.shadowRoot.activeElement === el.inputInBib);
          }

          const activeInput = mobileView ? el.inputInBib : el.input;
          const clearBtn = activeInput.shadowRoot.querySelector('.clearBtn');
          await expect(clearBtn).to.exist;

          const nativeBtn = clearBtn.shadowRoot.querySelector('button');
          await expect(nativeBtn).to.exist;
          nativeBtn.focus();
          await elementUpdated(el);

          await expect(clearBtn.shadowRoot.activeElement).to.not.be.null;

          const enterEvt = new KeyboardEvent('keydown', {
            key: 'Enter',
            bubbles: true,
            cancelable: true
          });
          el.dispatchEvent(enterEvt);
          await elementUpdated(el);

          await expect(enterEvt.defaultPrevented).to.be.false;

          // Simulate the native button activation that the browser performs on Enter
          nativeBtn.click();
          await elementUpdated(el);

          await expect(activeInput.value).to.not.be.ok;
        });

        it('should not open the bib or change bib visibility', async () => {
          const el = await defaultFixture(mobileView);

          el.focus();
          setInputValue(el, 'a');
          await elementUpdated(el);

          if (mobileView) {
            el.inputInBib.focus();
            await waitUntil(() => el.shadowRoot.activeElement === el.inputInBib);
          }

          const activeInput = mobileView ? el.inputInBib : el.input;
          const clearBtn = activeInput.shadowRoot.querySelector('.clearBtn');
          await expect(clearBtn).to.exist;

          const nativeBtn = clearBtn.shadowRoot.querySelector('button');
          await expect(nativeBtn).to.exist;
          nativeBtn.focus();
          await elementUpdated(el);

          await expect(clearBtn.shadowRoot.activeElement).to.not.be.null;

          const bibWasVisible = el.dropdown.isPopoverVisible;

          const enterEvt = new KeyboardEvent('keydown', {
            key: 'Enter',
            bubbles: true,
            cancelable: true
          });
          el.dispatchEvent(enterEvt);
          await elementUpdated(el);

          await expect(enterEvt.defaultPrevented).to.be.false;
          await expect(el.dropdown.isPopoverVisible).to.equal(bibWasVisible);
        });
      });

      if (mobileView) {
        describe('on close button in fullscreen', () => {
          it('should close the fullscreen dialog', async () => {
            const el = await defaultFixture(mobileView);

            el.focus();
            setInputValue(el, 'a');
            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
            await elementUpdated(el);
            await expect(el.dropdown.isPopoverVisible).to.be.true;

            el.inputInBib.focus();
            await waitUntil(() => el.shadowRoot.activeElement === el.inputInBib);

            const closeBtn = el.bibtemplate.shadowRoot.querySelector('#closeButton');
            await expect(closeBtn).to.exist;
            closeBtn.dispatchEvent(new KeyboardEvent('keydown', {
              key: 'Enter',
              bubbles: true,
              cancelable: true
            }));
            closeBtn.click();

            await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
            await elementUpdated(el);

            await expect(el.dropdown.isPopoverVisible).to.be.false;
          });
        });
      }
    });

    describe('Tab', () => {
      it('should select the current active option and close the bib', async () => {
        const el = await defaultFixture(mobileView);

        el.input.inputElement.focus();
        await sendKeys({ press: 'a' });
        await elementUpdated(el);

        const options = el.querySelectorAll('auro-menuoption');

        await sendKeys({ press: 'Tab' });
        await elementUpdated(el);

        await expect(el.value).to.be.equal(options[0].textContent);

        el.input.inputElement.focus();
        await sendKeys({ press: 'Backspace' });
        await sendKeys({ press: 'Backspace' });
        await sendKeys({ press: 'Backspace' });
        await sendKeys({ press: 'Backspace' });
        await sendKeys({ press: 'Backspace' });
        await sendKeys({ press: 'Backspace' });

        await elementUpdated(el);

        await sendKeys({ press: 'o' });

        await elementUpdated(el);

        await sendKeys({ press: 'Tab' });

        await expect(el.value).to.be.equal(options[1].textContent);
      });

      it('should make a selection and close the bib', async () => {
        const el = await defaultFixture(mobileView);

        el.focus();
        setInputValue(el, 'a');
        await elementUpdated(el);
        await expect(el.dropdown.isPopoverVisible).to.be.true;
        await sendKeys({ press: 'Tab' });
        await elementUpdated(el.dropdown);
        await expect(el.dropdown.isPopoverVisible).to.be.false;
      });

      describe('Shift', () => {
        it('should make a selection and close the bib', async () => {
          const el = await defaultFixture(mobileView);

          el.focus();
          setInputValue(el, 'a');
          await elementUpdated(el);
          await expect(el.dropdown.isPopoverVisible).to.be.true;
          await sendKeys({ down: 'Shift' });
          await sendKeys({ press: 'Tab' });
          await sendKeys({ up: 'Shift' });
          await elementUpdated(el.dropdown);
          await expect(el.dropdown.isPopoverVisible).to.be.false;
        });
      });

      if (mobileView) {
        it('should close the fullscreen dialog', async () => {
          const el = await defaultFixture(mobileView);

          el.focus();
          setInputValue(el, 'a');
          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
          await elementUpdated(el);
          await expect(el.dropdown.isPopoverVisible).to.be.true;

          el.inputInBib.focus();
          await waitUntil(() => el.shadowRoot.activeElement === el.inputInBib);

          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));

          // Wait for dialog close + rAF focus restoration
          await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
          await elementUpdated(el);

          await expect(el.dropdown.isPopoverVisible).to.be.false;
        });

        it('should restore trigger inert and focus after fullscreen dialog closes', async () => {
          const el = await defaultFixture(mobileView);

          el.focus();
          setInputValue(el, 'a');
          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
          await elementUpdated(el);
          await expect(el.dropdown.isPopoverVisible).to.be.true;

          el.inputInBib.focus();
          await waitUntil(() => el.shadowRoot.activeElement === el.inputInBib);

          // Trigger should be inert while fullscreen is open
          await expect(el.dropdown.trigger.inert).to.be.true;

          // Close the dialog
          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
          await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
          await elementUpdated(el);

          await expect(el.dropdown.trigger.inert).to.be.false;
          await expect(el.dropdown.isPopoverVisible).to.be.false;
        });
      }
    });

    describe('Escape', () => {
      it('should close the bib without making a selection', async () => {
        const el = await defaultFixture(mobileView);

        setInputValue(el, 'a');
        await elementUpdated(el);
        await expect(el.dropdown.isPopoverVisible).to.be.true;

        if (mobileView) {
          el.inputInBib.focus();
          await waitUntil(() => el.shadowRoot.activeElement === el.inputInBib);
        }

        // Navigate to an option but don't select it
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        await elementUpdated(el);

        // Escape should close the bib
        el.dispatchEvent(new KeyboardEvent('keydown', {
          key: 'Escape',
          bubbles: true
        }));
        await elementUpdated(el);
        // Allow for rAF-based close in fullscreen mode
        await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        await elementUpdated(el);

        await expect(el.dropdown.isPopoverVisible).to.be.false;
        // No menu option was selected — optionSelected should still be undefined
        await expect(el.optionSelected).to.be.undefined;
      });

      it('should do nothing when the bib is already closed', async () => {
        const el = await defaultFixture(mobileView);

        el.focus();
        await elementUpdated(el);
        await expect(el.dropdown.isPopoverVisible).to.be.false;

        el.dispatchEvent(new KeyboardEvent('keydown', {
          key: 'Escape',
          bubbles: true
        }));
        await elementUpdated(el);

        await expect(el.dropdown.isPopoverVisible).to.be.false;
      });

      if (!mobileView) {
        it('should close the combobox bib without closing a parent auro-dialog', async () => {
          const dialog = await inDialogFixture();
          await elementUpdated(dialog);

          const el = dialog.querySelector('auro-combobox');
          await elementUpdated(el);

          setInputValue(el, 'a');
          await elementUpdated(el);
          await expect(el.dropdown.isPopoverVisible).to.be.true;

          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, composed: true }));
          await elementUpdated(el);
          await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
          await elementUpdated(el);

          await expect(el.dropdown.isPopoverVisible).to.be.false;
          await expect(dialog.hasAttribute('open')).to.be.true;
        });

        it('should close the combobox bib without closing a parent auro-drawer', async () => {
          const drawer = await inDrawerFixture();
          await elementUpdated(drawer);

          const el = drawer.querySelector('auro-combobox');
          await elementUpdated(el);

          setInputValue(el, 'a');
          await elementUpdated(el);
          await expect(el.dropdown.isPopoverVisible).to.be.true;

          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, composed: true }));
          await elementUpdated(el);
          await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
          await elementUpdated(el);

          await expect(el.dropdown.isPopoverVisible).to.be.false;
          await expect(drawer.hasAttribute('open')).to.be.true;
        });
      }
    });

    describe('ArrowDown', () => {
      it('should navigate down through menu options', async () => {
        const el = await defaultFixture(mobileView);

        setInputValue(el, 'pp');
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        await elementUpdated(el);

        setInputValue(el, 'a');
        await elementUpdated(el);

        if (mobileView) {
          el.inputInBib.focus();
          await waitUntil(() => el.shadowRoot.activeElement === el.inputInBib);
        }

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        await elementUpdated(el);

        const menu = el.querySelector('auro-menu');
        const menuOptions = menu.querySelectorAll('auro-menuoption');

        await expect(el.optionActive).to.be.equal(menuOptions[1]);
        await expect(menuOptions[1].classList.contains('active')).to.be.true;

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        await elementUpdated(el);

        await expect(el.optionActive).to.be.equal(menuOptions[0]);
        await expect(menuOptions[0].classList.contains('active')).to.be.true;
      });

      it('should navigate down through nested menu options', async () => {
        const el = await nestedMenuFixture(mobileView);

        setInputValue(el, 'pp');
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        await elementUpdated(el);

        setInputValue(el, 'option');
        await elementUpdated(el);

        if (mobileView) {
          el.inputInBib.focus();
          await waitUntil(() => el.shadowRoot.activeElement === el.inputInBib);
        }

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        await elementUpdated(el);
        await expect(el.optionActive.value).to.equal('option a');

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        await elementUpdated(el);
        await expect(el.optionActive.value).to.equal('option b');

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        await elementUpdated(el);
        await expect(el.optionActive.value).to.equal('option 2');

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        await elementUpdated(el);
        await expect(el.optionActive.value).to.equal('option 1');

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
        await elementUpdated(el);
        await expect(el.optionActive.value).to.equal('option 2');
      });

      it('should not navigate when clear button has focus', async () => {
        const el = await defaultFixture(mobileView);

        setInputValue(el, 'a');
        await elementUpdated(el);

        el.dispatchEvent(new KeyboardEvent('keydown', {
          'key': 'ArrowDown'
        }));

        await elementUpdated(el);
        await expect(el.dropdown.isPopoverVisible).to.be.true;

        document.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "Escape",
          }),
        );

        await elementUpdated(el);
        await expect(el.dropdown.isPopoverVisible).to.be.false;

        document.dispatchEvent(new KeyboardEvent('keydown', {
          'key': 'Tab'
        }));

        await elementUpdated(el);

        document.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "ArrowDown",
          }),
        );

        await elementUpdated(el);
        await expect(el.dropdown.isPopoverVisible).to.be.false;
      });
    });

    describe('ArrowUp', () => {
      it('should navigate up through menu options', async () => {
        const el = await defaultFixture(mobileView);

        setInputValue(el, 'pp');
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        await elementUpdated(el);

        setInputValue(el, 'a');
        await elementUpdated(el);

        if (mobileView) {
          el.inputInBib.focus();
          await waitUntil(() => el.shadowRoot.activeElement === el.inputInBib);
        }

        const menu = el.querySelector('auro-menu');
        const menuOptions = menu.querySelectorAll('auro-menuoption');

        // ArrowDown to move to second option
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        await elementUpdated(el);
        await expect(el.optionActive).to.be.equal(menuOptions[1]);

        // ArrowUp to move back to first option
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
        await elementUpdated(el);

        // Wraps: going up from second goes back to first (wrapping depends on menu size)
        await expect(menuOptions[0].classList.contains('active') || menuOptions[1].classList.contains('active')).to.be.true;
      });

      it('should not navigate when clear button has focus', async () => {
        const el = await defaultFixture(mobileView);

        setInputValue(el, 'a');
        await elementUpdated(el);

        el.dispatchEvent(new KeyboardEvent('keydown', {
          'key': 'ArrowUp'
        }));

        await elementUpdated(el);
        await expect(el.dropdown.isPopoverVisible).to.be.true;

        document.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "Escape",
          }),
        );

        await elementUpdated(el);
        await expect(el.dropdown.isPopoverVisible).to.be.false;

        document.dispatchEvent(new KeyboardEvent('keydown', {
          'key': 'Tab'
        }));

        await elementUpdated(el);

        document.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "ArrowUp",
          }),
        );

        await elementUpdated(el);
        await expect(el.dropdown.isPopoverVisible).to.be.false;
      });
    });

    describe('Home', () => {
      it('should activate the first enabled option when bib is open', async () => {
        const el = await shiftTabFixture(mobileView);

        setInputValue(el, 'a');
        await elementUpdated(el);
        await expect(el.dropdown.isPopoverVisible).to.be.true;

        if (mobileView) {
          el.inputInBib.focus();
          await waitUntil(() => el.shadowRoot.activeElement === el.inputInBib);
        }

        // Navigate away from the first option
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        await elementUpdated(el);
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        await elementUpdated(el);

        const menuOptions = el.querySelector('auro-menu').querySelectorAll('auro-menuoption');
        await expect(el.optionActive).to.not.equal(menuOptions[0]);

        // Home should jump to the first option
        el.dispatchEvent(new KeyboardEvent('keydown', {
          key: 'Home',
          bubbles: true,
          cancelable: true
        }));
        await elementUpdated(el);

        await expect(el.optionActive).to.equal(menuOptions[0]);
        await expect(el.dropdown.isPopoverVisible).to.be.true;
      });

      it('should skip disabled first option and activate the next enabled one', async () => {
        const el = await shiftTabDisabledFirstFixture(mobileView);

        setInputValue(el, 'a');
        await elementUpdated(el);
        await expect(el.dropdown.isPopoverVisible).to.be.true;

        if (mobileView) {
          el.inputInBib.focus();
          await waitUntil(() => el.shadowRoot.activeElement === el.inputInBib);
        }

        // Navigate to the last option
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        await elementUpdated(el);

        // Home should skip the disabled first option and activate the second
        el.dispatchEvent(new KeyboardEvent('keydown', {
          key: 'Home',
          bubbles: true,
          cancelable: true
        }));
        await elementUpdated(el);

        const menuOptions = el.querySelector('auro-menu').querySelectorAll('auro-menuoption:not([disabled])');
        await expect(el.optionActive).to.equal(menuOptions[0]);
        await expect(el.optionActive.hasAttribute('disabled')).to.be.false;
      });

      it('should do nothing when bib is closed', async () => {
        const el = await defaultFixture(mobileView);

        el.focus();
        await elementUpdated(el);
        await expect(el.dropdown.isPopoverVisible).to.be.false;

        el.dispatchEvent(new KeyboardEvent('keydown', {
          key: 'Home',
          bubbles: true,
          cancelable: true
        }));
        await elementUpdated(el);

        await expect(el.dropdown.isPopoverVisible).to.be.false;
      });
    });

    describe('End', () => {
      it('should activate the last enabled option when bib is open', async () => {
        const el = await shiftTabFixture(mobileView);

        setInputValue(el, 'a');
        await elementUpdated(el);
        await expect(el.dropdown.isPopoverVisible).to.be.true;

        if (mobileView) {
          el.inputInBib.focus();
          await waitUntil(() => el.shadowRoot.activeElement === el.inputInBib);
        }

        const menuOptions = el.querySelector('auro-menu').querySelectorAll('auro-menuoption');
        const lastOption = menuOptions[menuOptions.length - 1];

        // End should jump to the last option
        el.dispatchEvent(new KeyboardEvent('keydown', {
          key: 'End',
          bubbles: true,
          cancelable: true
        }));
        await elementUpdated(el);

        await expect(el.optionActive).to.equal(lastOption);
        await expect(el.dropdown.isPopoverVisible).to.be.true;
      });

      it('should do nothing when bib is closed', async () => {
        const el = await defaultFixture(mobileView);

        el.focus();
        await elementUpdated(el);
        await expect(el.dropdown.isPopoverVisible).to.be.false;

        el.dispatchEvent(new KeyboardEvent('keydown', {
          key: 'End',
          bubbles: true,
          cancelable: true
        }));
        await elementUpdated(el);

        await expect(el.dropdown.isPopoverVisible).to.be.false;
      });
    });
  });

}

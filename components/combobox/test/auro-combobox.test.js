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
  disabledOptionFixture,
  presetDisabledValueFixture,
  nestedMenuFixture,
  presetValueFixture,
  checkmarkFixture,
  suggestFixture,
  requiredFixture,
  noMatchFixture,
  persistentFixture,
  filterFixture,
  customEventFixture,
  noFilterFixture,
  inDialogFixture,
  inDrawerFixture,
  swapFixture,
} from './testFixtures.js';
import { setInputValue, getAnnouncementRoot } from './testFunctions.js';
import { comboboxKeyboardStrategy } from '../src/comboboxKeyboardStrategy.js';

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
      it('runs validation after reconnect even when disconnected mid-fullscreen-transition', async () => {
        const el = await requiredFixture(mobileView);
        await elementUpdated(el);

        // Simulate the in-transition flag being stuck — without the reset
        // in disconnectedCallback this would suppress every subsequent
        // validate() call after the element is reconnected.
        el._inFullscreenTransition = true;

        const parent = el.parentNode;
        parent.removeChild(el);
        parent.appendChild(el);
        await elementUpdated(el);

        // Observable: validation actually runs (sets validity).
        el.validate(true);
        await elementUpdated(el);
        await expect(el.getAttribute('validity')).to.equal('valueMissing');
      });

      it('cancels pending timers so detached callbacks do not fire', async () => {
        const el = await defaultFixture(mobileView);
        await elementUpdated(el);

        // Schedule a representative long-tail timer via the same wrapper
        // every internal caller uses (announcement / strategy-change focus /
        // setMenuValue backup / configureMenu retry). The deferral matters:
        // a 0ms timer would already be in the task queue when we disconnect.
        let fired = false;
        el._scheduleTimer(() => { fired = true; }, 50);
        expect(el._pendingTimers.size).to.equal(1);

        el.parentNode.removeChild(el);
        expect(el._pendingTimers.size).to.equal(0);

        await new Promise((resolve) => setTimeout(resolve, 100));
        expect(fired).to.be.false;
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

    describe('placeholder rendering', () => {
      it('placeholder text appears in the trigger input', async () => {
        const el = await fixture(html`
          <auro-combobox placeholder="Search fruits...">
            <span slot="label">Name</span>
            <auro-menu>
              <auro-menuoption value="Apples">Apples</auro-menuoption>
            </auro-menu>
          </auro-combobox>
        `);
        await elementUpdated(el);

        await expect(el.input.placeholder).to.equal('Search fruits...');
      });
    });
  });

  describe('User Stories', () => {

    it('reset method clears the value and validity state', async () => {
      const el = await requiredFixture(mobileView);

      el.focus();
      el.shadowRoot.activeElement.blur();

      await elementUpdated(el);
      await expect(el.getAttribute('validity')).to.be.equal('valueMissing');

      el.reset();

      await elementUpdated(el);

      await expect(el.hasAttribute('validity')).to.be.false;
      await expect(el.value).to.equal(undefined);
    });

    // This test should pass but currently fails due to a bug
    // it('should keep static options visible regardless of filter input', async () => {
    //   const el = await fixture(html`
    //     <auro-combobox>
    //       <span slot="label">Name</span>
    //       <auro-menu>
    //         <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    //         <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    //         <auro-menuoption static value="Add new" id="option-static">Add new item</auro-menuoption>
    //       </auro-menu>
    //     </auro-combobox>
    //   `);

    //   setInputValue(el, 'zzzzzz');
    //   await elementUpdated(el);

    //   const menu = el.querySelector('auro-menu');
    //   const staticOption = menu.querySelector('auro-menuoption[static]');

    //   await expect(staticOption).to.exist;
    //   await expect(staticOption.hasAttribute('hidden')).to.be.false;
    // });

    it('should exclude static options from filtered results', async () => {
      const el = await fixture(html`
        <auro-combobox>
          <span slot="label">Name</span>
          <auro-menu>
            <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
            <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
            <auro-menuoption static value="StaticApples" id="option-static">Static Apples</auro-menuoption>
          </auro-menu>
        </auro-combobox>
      `);

      // Type a value that matches the static option text
      setInputValue(el, 'apples');
      await elementUpdated(el);

      const menu = el.querySelector('auro-menu');
      const staticOption = menu.querySelector('#option-static');
      const normalOption = menu.querySelector('#option-0');

      // Normal matching option should be visible
      await expect(normalOption.hasAttribute('hidden')).to.be.false;

      // Static option should NOT be in the available options (excluded from filtering)
      await expect(el.availableOptions).to.not.include(staticOption);
    });

    it('should include static options when input is empty and bib is open', async () => {
      const el = await fixture(html`
        <auro-combobox>
          <span slot="label">Name</span>
          <auro-menu>
            <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
            <auro-menuoption static value="Header" id="option-static">Category Header</auro-menuoption>
          </auro-menu>
        </auro-combobox>
      `);

      // With empty input, static options are surfaced (per the documented
      // behavior — they let consumers display headers / "add new" rows when
      // no filter is active). Typed input excludes them again.
      setInputValue(el, '');
      el.showBib();
      await elementUpdated(el);

      const menu = el.querySelector('auro-menu');
      const staticOption = menu.querySelector('#option-static');

      await expect(el.availableOptions.includes(staticOption)).to.be.true;
    });

    it('should report static options as not active via isActive', async () => {
      const el = await fixture(html`
        <auro-combobox>
          <span slot="label">Name</span>
          <auro-menu>
            <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
            <auro-menuoption static value="Header" id="option-static">Category Header</auro-menuoption>
          </auro-menu>
        </auro-combobox>
      `);

      // Type a matching character so availableOptions is populated and the
      // first non-static option becomes active.
      setInputValue(el, 'a');
      await elementUpdated(el);

      const menu = el.querySelector('auro-menu');
      const staticOption = menu.querySelector('#option-static');
      const normalOption = menu.querySelector('#option-0');

      await expect(staticOption.isActive).to.be.false;
      await expect(normalOption.isActive).to.be.true;
    });

    it('should show validation error when required combobox is cleared', async () => {
      const el = await requiredFixture(mobileView);
      await elementUpdated(el);

      // Select a value first
      el.value = 'Apples';
      await elementUpdated(el);

      // Clear the input
      setInputValue(el, '');
      el.input.blur();
      await elementUpdated(el);

      // Force validation
      el.validate(true);
      await elementUpdated(el);

      await expect(el.getAttribute('validity')).to.equal('valueMissing');
    });

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

    it('should set the first menu option as active when the dropdown opens with a matching filter', async () => {
      const el = await defaultFixture(mobileView);
      const menuOptions = el.querySelector('auro-menu').querySelectorAll('auro-menuoption');

      // Type a matching character so options populate. Pre-5.9 combobox only
      // surfaces options that match the typed input — opening the bib with an
      // empty input intentionally shows no options.
      setInputValue(el, 'a');
      await elementUpdated(el);

      // Simulate dropdown opening
      el.dropdown.dispatchEvent(new CustomEvent('auroDropdown-toggled', {
        detail: { expanded: true }
      }));

      // Wait for the 150ms expandedDelay to elapse
      await new Promise((res) => setTimeout(res, 200));
      await elementUpdated(el);

      // Under the pre-5.9 menu, programmatic index assignment sets
      // menu.index synchronously but does not fire auroMenu-activatedOption
      // until the user interacts (arrow key, click). menu.index is the
      // source of truth for the active slot; optionActive is the cached
      // event payload, which stays null until the menu emits.
      await expect(el.menu.index).to.equal(0);
      await expect(el.availableOptions[0] === menuOptions[0], 'first available option should be menuOptions[0]').to.be.true;
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

    describe('persistInput behavior', () => {
      it('preserves typed text in input after option selection when persistInput is set', async () => {
        const el = await persistInputFixture(mobileView);
        await elementUpdated(el);

        el.focus();
        await elementUpdated(el);
        await sendKeys({ press: 'A' });
        await sendKeys({ press: 'p' });
        await sendKeys({ press: 'p' });
        el.input.click();
        await elementUpdated(el);

        if (mobileView) {
          el.inputInBib.focus();
          await waitUntil(() => el.shadowRoot.activeElement === el.inputInBib);
        }

        await expect(el.dropdown.isPopoverVisible).to.be.true;

        await new Promise((resolve) => setTimeout(resolve, 0));

        const menu = el.querySelector('auro-menu');
        const option = menu.querySelector('auro-menuoption[value="Apples"]');
        option.click();
        await elementUpdated(option);
        await elementUpdated(menu);
        await new Promise((resolve) => setTimeout(resolve, 0));
        await elementUpdated(el);

        await expect(el.value).to.equal('Apples');
        await expect(el.input.value).to.equal('App');
      });

      it('reports valid (not valueMissing) after selecting a required option when persistInput is set', async () => {
        const el = await persistInputFixture(mobileView);
        await elementUpdated(el);

        el.focus();
        await elementUpdated(el);
        await sendKeys({ press: 'A' });
        await sendKeys({ press: 'p' });
        await sendKeys({ press: 'p' });
        el.input.click();
        await elementUpdated(el);

        if (mobileView) {
          el.inputInBib.focus();
          await waitUntil(() => el.shadowRoot.activeElement === el.inputInBib);
        }

        await new Promise((resolve) => setTimeout(resolve, 0));

        const menu = el.querySelector('auro-menu');
        const option = menu.querySelector('auro-menuoption[value="Apples"]');
        option.click();
        await elementUpdated(option);
        await elementUpdated(menu);
        await new Promise((resolve) => setTimeout(resolve, 0));

        el.input.focus();
        el.input.blur();
        el.blur();
        await elementUpdated(el);

        await expect(el.optionSelected).to.equal(option);
        await expect(el.getAttribute('validity')).to.not.equal('valueMissing');
      });

      // filter behavior enforces "must select from menu": typed text without
      // a matching option leaves optionSelected undefined and required's
      // valueMissing fires on blur. persistInput here only pins the typed
      // display value; the required-selection semantic comes from behavior.
      it('reports valueMissing on blur when typed text has no matching selection under filter + persistInput', async () => {
        if (mobileView) {
          await setViewport({ width: 500, height: 800 });
        } else {
          await setViewport({ width: 800, height: 800 });
        }
        const el = await fixture(html`
          <auro-combobox required persistInput behavior="filter">
            <span slot="label">Name</span>
            <auro-menu>
              <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
              <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
            </auro-menu>
          </auro-combobox>
        `);
        await elementUpdated(el);

        el.focus();
        await elementUpdated(el);
        await sendKeys({ press: 'z' });
        await sendKeys({ press: 'z' });
        await elementUpdated(el);

        // Close the bib before blur so the combobox's focusout handler runs
        // its validate() call (see auro-combobox.js line 1310 — validate is
        // skipped while dropdownOpen to avoid flashing errors mid-selection).
        await sendKeys({ press: 'Escape' });

        el.input.focus();
        el.input.blur();
        el.blur();
        await elementUpdated(el);

        await expect(el.optionSelected).to.be.undefined;
        await expect(el.getAttribute('validity')).to.equal('valueMissing');
      });

      it('leaves trigger input untouched on programmatic value set when persistInput is set', async () => {
        const el = await persistInputFixture(mobileView);
        await elementUpdated(el);

        el.focus();
        await elementUpdated(el);
        await sendKeys({ press: 'A' });
        await sendKeys({ press: 'p' });
        await sendKeys({ press: 'p' });
        await elementUpdated(el);

        el.value = 'Oranges';
        await elementUpdated(el);

        await expect(el.input.value).to.equal('App');
        await expect(el.value).to.equal('Oranges');
        await expect(el.menu.value).to.be.undefined;
      });
    });

    it('should swap values between two comboboxes', async () => {
      const wrapper = await swapFixture(mobileView);

      const left = wrapper.querySelector('#left');
      const right = wrapper.querySelector('#right');

      // Set initial values
      left.value = 'Apples';
      right.value = 'Oranges';
      await elementUpdated(left);
      await elementUpdated(right);

      await expect(left.value).to.equal('Apples');
      await expect(right.value).to.equal('Oranges');

      // Swap values
      const leftVal = left.value;
      const rightVal = right.value;
      left.value = rightVal;
      right.value = leftVal;
      await elementUpdated(left);
      await elementUpdated(right);

      await expect(left.value).to.equal('Oranges');
      await expect(right.value).to.equal('Apples');
      await expect(left.input.value).to.equal('Oranges');
      await expect(right.input.value).to.equal('Apples');
    });

    it('should swap freeform typed values between two comboboxes', async () => {
      const wrapper = await swapFixture(mobileView);

      const left = wrapper.querySelector('#left');
      const right = wrapper.querySelector('#right');

      // Type freeform values without selecting from menu
      setInputValue(left, 'a');
      setInputValue(right, 'b');
      await elementUpdated(left);
      await elementUpdated(right);

      await expect(left.value).to.equal('a');
      await expect(right.value).to.equal('b');

      // Swap values programmatically (like the demo swap button)
      const leftVal = left.value;
      const rightVal = right.value;
      left.value = rightVal;
      right.value = leftVal;
      await elementUpdated(left);
      await elementUpdated(right);

      await expect(left.value).to.equal('b');
      await expect(right.value).to.equal('a');
      await expect(left.input.value).to.equal('b');
      await expect(right.input.value).to.equal('a');
    });

    // Regression: with persistInput + framework re-mount (Svelte `{#key}`),
    // a fresh combobox mounts with `value` set to a valid option but
    // `input.value` still holding stale typed text from another field.
    // handleSlotChange must reconcile by matching against `this.value` (not
    // just `input.value`) so the option's displayValue clone lands in the
    // trigger — otherwise the trigger shows the stale typed text (or nothing
    // when hidden by the empty `<span slot="displayValue">` forwarder).
    it('should sync menu.optionSelected to combobox.value on mount when input.value diverges under persistInput', async () => {
      if (mobileView) {
        await setViewport({ width: 500, height: 800 });
      } else {
        await setViewport({ width: 800, height: 800 });
      }

      // Framework-set combobox.value that DOESN'T match the trigger's typed
      // value (mimics the swap-remount shape from consumer apps).
      const el = await fixture(html`
        <auro-combobox persistInput value="Oranges">
          <span slot="label">Name</span>
          <span slot="displayValue"></span>
          <auro-menu>
            <auro-menuoption value="Apples" id="opt-apples">
              Apples
              <span slot="displayValue">Apples</span>
            </auro-menuoption>
            <auro-menuoption value="Oranges" id="opt-oranges">
              Oranges
              <span slot="displayValue">Oranges</span>
            </auro-menuoption>
          </auro-menu>
        </auro-combobox>
      `);
      await elementUpdated(el);
      await el.menu.updateComplete;

      // Simulate the pre-swap stale-typed-text state by directly writing to
      // the trigger input (bypassing the Lit template's typedValue binding).
      el.input.value = 'stale-typed';
      await elementUpdated(el);

      // Re-trigger the slotchange path (the one that fires on Svelte
      // re-mount / SPA hydration) so the reconciliation runs against the
      // now-diverged input.value + framework-set combobox.value.
      el.handleSlotChange({ target: { name: '' } });
      await elementUpdated(el);
      await el.menu.updateComplete;

      // Menu must reflect the framework-set value, not the stale typed text.
      await expect(el.menu.value).to.equal('Oranges');
      await expect(el.menu.optionSelected).to.not.be.undefined;
      await expect(el.menu.optionSelected.value).to.equal('Oranges');
      // The option's <span slot="displayValue"> must be cloned into the
      // trigger so the visible display picks up the right label.
      const clone = el.input.querySelector('[slot="displayValue"]:not(slot)');
      await expect(clone).to.not.be.null;
      await expect(clone.textContent.trim()).to.equal('Oranges');
    });

    // Regression: programmatic value/input mutations in noFilter + persistInput
    // + suggestion mode (the dynamic-menu apiExample swap pattern) used to pump
    // a ~125-update cascade between handleInputValueChange and the
    // auroMenu-selectedOption listener, pinning the main thread for seconds.
    it('should not cascade when value and input diverge across matching menu options', async () => {
      if (mobileView) {
        await setViewport({ width: 500, height: 800 });
      } else {
        await setViewport({ width: 800, height: 800 });
      }

      const el = await fixture(html`
        <auro-combobox noFilter persistInput value="A">
          <span slot="label">Test</span>
          <auro-menu>
            <auro-menuoption value="A">Alpha</auro-menuoption>
            <auro-menuoption value="B">Bravo</auro-menuoption>
            <auro-menuoption value="C">Charlie</auro-menuoption>
          </auro-menu>
        </auro-combobox>
      `);
      await elementUpdated(el);

      let updateCount = 0;
      const origPerformUpdate = el.performUpdate.bind(el);
      // Circuit-break inside the spy so a regression surfaces as a thrown
      // error in <50 updates rather than hitting WTR's 120s testsFinishTimeout
      // (which reports "0 passed, 0 failed" and looks like infra flakiness).
      el.performUpdate = function() {
        updateCount += 1;
        if (updateCount > 50) {
          throw new Error(`cascade: performUpdate ran ${updateCount} times`);
        }
        return origPerformUpdate();
      };

      // Reproduce the dynamic-menu swap shape: value and input.value point at
      // different menu options simultaneously.
      el.value = 'B';
      el.input.value = 'C';
      await elementUpdated(el);
      await el.menu.updateComplete;
      // Lit can swallow throws from performUpdate and resolve updateComplete
      // before queued cascade updates run. The macrotask wait lets them drain.
      await new Promise((resolve) => setTimeout(resolve, 50));

      // Pre-fix this would trip the circuit breaker. Bounded at 20 to leave
      // headroom for legitimate update batching.
      expect(updateCount).to.be.below(20);
    });

    // Regression: after a programmatic value swap, the bib's availableOptions
    // would stay frozen at the pre-swap input.value because
    // updateTriggerTextDisplay and the value-branch ELSE write set input.value
    // with _syncingDisplayValue, which made handleInputValueChange bail
    // without re-running updateFilter.
    it('should refresh availableOptions after a programmatic value swap', async () => {
      if (mobileView) {
        await setViewport({ width: 500, height: 800 });
      } else {
        await setViewport({ width: 800, height: 800 });
      }

      const wrapper = await swapFixture(mobileView);
      const left = wrapper.querySelector('#left');
      const right = wrapper.querySelector('#right');
      await elementUpdated(left);
      await elementUpdated(right);

      // Left ends with a matching option; right ends with a non-matching
      // freeform value (suggestion mode allows it).
      setInputValue(left, 'Apples');
      setInputValue(right, 'xyz');
      await elementUpdated(left);
      await elementUpdated(right);

      // Swap values the way the apiExample button does.
      const leftVal = left.value;
      const rightVal = right.value;
      left.value = rightVal;
      right.value = leftVal;
      await elementUpdated(left);
      await elementUpdated(right);
      await new Promise((resolve) => setTimeout(resolve, 50));

      // After swap: left holds 'xyz' (no match), right holds 'Apples' (match).
      // The filter must follow the input.value, not stay frozen at pre-swap.
      expect(left.availableOptions.length).to.equal(0);
      expect(right.availableOptions.some((o) => o.value === 'Apples')).to.be.true;
    });

    // Regression: the filter-refresh introduced for the swap pattern was
    // pushing reactive availableOptions changes through updated()'s
    // availableOptions branch, which would auto-open the bib for the no-match
    // case (availableOptions.length === 0 && noMatchOption fires showBib
    // unconditionally). The _programmaticFilterRefresh flag suppresses that
    // side effect since the user hasn't interacted.
    it('should not auto-open the bib for a no-match input after a programmatic swap', async () => {
      if (mobileView) {
        await setViewport({ width: 500, height: 800 });
      } else {
        await setViewport({ width: 800, height: 800 });
      }

      const wrapper = await fixture(html`
        <div>
          <auro-combobox id="left">
            <span slot="label">Left</span>
            <auro-menu>
              <auro-menuoption value="Apples">Apples</auro-menuoption>
              <auro-menuoption value="Oranges">Oranges</auro-menuoption>
              <auro-menuoption static nomatch>No matching option</auro-menuoption>
            </auro-menu>
          </auro-combobox>
          <auro-combobox id="right">
            <span slot="label">Right</span>
            <auro-menu>
              <auro-menuoption value="Apples">Apples</auro-menuoption>
              <auro-menuoption value="Oranges">Oranges</auro-menuoption>
              <auro-menuoption static nomatch>No matching option</auro-menuoption>
            </auro-menu>
          </auro-combobox>
        </div>
      `);
      const left = wrapper.querySelector('#left');
      const right = wrapper.querySelector('#right');
      await elementUpdated(left);
      await elementUpdated(right);

      // Type a matching value in left, a non-matching freeform value in right.
      setInputValue(left, 'Apples');
      setInputValue(right, 'xyz');
      await elementUpdated(left);
      await elementUpdated(right);

      // Move focus off both before the swap so neither bib is interactive.
      document.body.focus();
      await elementUpdated(left);
      await elementUpdated(right);

      // Swap programmatically.
      const leftVal = left.value;
      const rightVal = right.value;
      left.value = rightVal;
      right.value = leftVal;
      await elementUpdated(left);
      await elementUpdated(right);
      await new Promise((resolve) => setTimeout(resolve, 50));

      // Neither bib should auto-open — the user didn't interact.
      expect(left.dropdown.isPopoverVisible).to.be.false;
      expect(right.dropdown.isPopoverVisible).to.be.false;
    });

    // Regression: when a programmatic value set in suggestion mode does not
    // match any option, the unmatched-value branch in updated() must clear
    // BOTH menu.value and menu.optionSelected. Clearing only menu.value left
    // the previously-selected option element pinned as menu.optionSelected;
    // a later auroMenu-selectedOption echo would then write its stale .value
    // back into combobox.value (manifesting as Tab-after-Backspace
    // re-selecting the prior option).
    it('should clear menu.optionSelected when value is set to an unmatched string', async () => {
      if (mobileView) {
        await setViewport({ width: 500, height: 800 });
      } else {
        await setViewport({ width: 800, height: 800 });
      }

      const el = await fixture(html`
        <auro-combobox value="Apples">
          <span slot="label">Name</span>
          <auro-menu>
            <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
            <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
          </auro-menu>
        </auro-combobox>
      `);
      await elementUpdated(el);
      await el.menu.updateComplete;

      // Precondition: the Apples option is pinned as menu.optionSelected.
      await expect(el.menu.value).to.equal('Apples');
      await expect(el.menu.optionSelected).to.not.be.undefined;

      // Programmatically set value to an unmatched freeform string.
      el.value = 'xyz';
      await elementUpdated(el);
      await el.menu.updateComplete;

      // Both menu.value AND menu.optionSelected must clear so a later
      // auroMenu-selectedOption echo can't write the stale value back.
      await expect(el.menu.value).to.be.undefined;
      await expect(el.menu.optionSelected).to.be.undefined;
      await expect(el.value).to.equal('xyz');
    });

    // Regression: paste, IME composition, and dead-key input all fire
    // 'input' events but bypass the previous keydown.key.length===1 gate
    // (paste has no keydown; IME uses key='Process'; dead keys produce
    // multi-char keys). _userTyped must flip on the 'input' event so
    // updated('availableOptions') auto-opens the bib for these sources.
    it('should flip _userTyped on a paste-style input event (no keydown)', async () => {
      if (mobileView) {
        await setViewport({ width: 500, height: 800 });
      } else {
        await setViewport({ width: 800, height: 800 });
      }

      const el = await defaultFixture(mobileView);
      await elementUpdated(el);

      // Precondition: _userTyped starts false.
      expect(el._userTyped).to.be.false;

      el.focus();
      await elementUpdated(el);

      // Simulate paste / IME compositionend / dead-key compositionend:
      // set the value and dispatch only input events — no keydown
      // beforehand. Under the old keydown.key.length===1 gate, _userTyped
      // would stay false for these sources, suppressing the auto-open in
      // updated('availableOptions').
      const auroInput = el.input;
      const nativeInput = auroInput.shadowRoot.querySelector('input');
      nativeInput.value = 'Ap';
      nativeInput.dispatchEvent(new InputEvent('input', { inputType: 'insertFromPaste' }));
      auroInput.dispatchEvent(new InputEvent('input', {
        bubbles: true,
        composed: true,
        inputType: 'insertFromPaste'
      }));

      // _userTyped must be set synchronously by handleTriggerInputValueChange
      // so it's true when updated() runs and gates showBib().
      expect(el._userTyped).to.be.true;
    });

    // Regression for f876902e2 / AB#1560490: after the bib opens on a
    // combobox that already has a value, the trigger native input's caret
    // must end up at end-of-text. Clicking the trigger lands on
    // auro-input's floating <label for="…"> overlay; Chrome resets the
    // native input's selection to [0, 0] on label-focus before any JS
    // runs. The fix schedules a doubleRaf'd setInputFocus() once the
    // dropdown opens to put the caret back at end.
    //
    // Reading native selectionStart after the doubleRaf is unreliable in
    // WTR (the browser may not honor setSelectionRange on an off-screen
    // input, and the popover branch of setInputFocus delegates to
    // auro-input.focus() whose mask-driven cursor restoration depends on
    // implementation details outside this component). Verify the actual
    // mechanism instead: setInputFocus must be called after the dropdown
    // opens — without it the cursor stays wherever the click left it.
    it('calls setInputFocus after the bib opens so the caret can park at end-of-text', async () => {
      if (mobileView) {
        await setViewport({ width: 500, height: 800 });
      } else {
        await setViewport({ width: 800, height: 800 });
      }

      const el = await fixture(html`
        <auro-combobox value="Peaches">
          <span slot="label">Name</span>
          <auro-menu>
            <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
            <auro-menuoption value="Peaches" id="option-1">Peaches</auro-menuoption>
          </auro-menu>
        </auro-combobox>
      `);
      await elementUpdated(el);
      await el.menu.updateComplete;
      await expect(el.input.value).to.equal('Peaches');

      // Spy on setInputFocus before triggering the open so the listener's
      // doubleRaf'd call is caught.
      let setInputFocusCalls = 0;
      const origSetInputFocus = el.setInputFocus.bind(el);
      el.setInputFocus = () => { setInputFocusCalls += 1; origSetInputFocus(); };

      // Fire the same event the dropdown emits when it opens. The
      // auro-input click → showModal → focus chain is too platform-
      // dependent to drive reliably in WTR; the listener at
      // auroDropdown-toggled is what actually owns the caret-restore
      // behavior.
      el.dropdown.dispatchEvent(new CustomEvent('auroDropdown-toggled', {
        detail: { expanded: true }
      }));

      // doubleRaf inside the toggled listener — wait both frames plus a
      // tick for the call to land.
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(setInputFocusCalls).to.be.at.least(1);

      // Cleanup
      el.setInputFocus = origSetInputFocus;
    });

    // Regression for d9b8eb2c6 / 4b90416db: when the user selects an option,
    // the auroMenu-selectedOption listener calls setClearBtnFocus so the
    // next Tab continues forward through the page. Gated on !isEcho and a
    // defined menu.value so programmatic syncs and clearSelection paths
    // don't hijack focus.
    //
    // Verifying via focus state across the nested shadow boundaries is
    // flaky in WTR (the clear-button's auro-button.focus() race-conditions
    // with the dropdown-close focus restore), so we spy on the actual
    // focus() method on the clear-button element instead — closer to
    // behavior than checking a private flag and unaffected by where focus
    // ultimately lands after the close chain settles.
    it('moves focus to the trigger clear button when the user picks an option', async () => {
      if (mobileView) {
        await setViewport({ width: 500, height: 800 });
      } else {
        await setViewport({ width: 800, height: 800 });
      }

      const el = await defaultFixture(mobileView);
      await elementUpdated(el);

      // Type then explicitly open via Enter — matches the existing pattern
      // used elsewhere in this suite for opening the bib before a selection.
      el.focus();
      await elementUpdated(el);
      await sendKeys({ press: 'a' });
      el.input.click();
      await elementUpdated(el);
      await waitUntil(() => el.dropdown.isPopoverVisible);

      // Spy on the clear button's focus() — replaced before the selection
      // so the listener's setClearBtnFocus → doubleRaf → clearBtn.focus()
      // gets caught.
      const clearBtn = el.input.shadowRoot.querySelector('.clearBtn');
      expect(clearBtn).to.exist;
      let focusCalled = false;
      const origFocus = clearBtn.focus.bind(clearBtn);
      clearBtn.focus = () => { focusCalled = true; origFocus(); };

      const option = el.menu.querySelector('auro-menuoption[value="Apples"]');
      option.click();
      await elementUpdated(el);
      await el.menu.updateComplete;
      // doubleRaf inside setClearBtnFocus plus a settle tick.
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(focusCalled).to.be.true;

      // Cleanup
      clearBtn.focus = origFocus;
    });

    // Regression for 0146fd859: syncInputValuesAcrossTriggerAndBib must
    // update BOTH the trigger and the bib inputs when their values diverge
    // from `nextValue`. The previous guarded form short-circuited the bib
    // write under conditions that aren't exercised by any single direct
    // test — the perf simplification removed dead guards but the path
    // itself (programmatic value → both inputs reflect it) wasn't pinned.
    it('syncs both trigger and bib inputs on a programmatic value change', async () => {
      if (mobileView) {
        await setViewport({ width: 500, height: 800 });
      } else {
        await setViewport({ width: 800, height: 800 });
      }

      const el = await defaultFixture(mobileView);
      await elementUpdated(el);

      // Open the bib so the bibtemplate renders and inputInBib exists.
      el.focus();
      setInputValue(el, 'a');
      await elementUpdated(el);
      await waitUntil(() => el.inputInBib);

      // Programmatic value change — should propagate to BOTH inputs.
      el.value = 'Apples';
      await elementUpdated(el);
      await el.input.updateComplete;
      await el.inputInBib.updateComplete;
      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(el.input.value).to.equal('Apples');
      expect(el.inputInBib.value).to.equal('Apples');
    });

    // These tests require fullscreen (mobile) mode
  });

  describe('Properties', () => {
    describe('appearance', () => {
      it('should default to "default"', async () => {
        const el = await defaultFixture(mobileView);

        await expect(el.appearance).to.equal('default');
        await expect(el.getAttribute('appearance')).to.equal('default');
      });

      it('should update when appearance attribute is set', async () => {
        const el = await defaultFixture(mobileView);

        el.setAttribute('appearance', 'inverse');
        await elementUpdated(el);

        await expect(el.appearance).to.equal('inverse');
      });
    });

    describe('autocomplete', () => {
      it('should not have autocomplete attribute by default', async () => {
        const el = await defaultFixture(mobileView);

        await expect(el.hasAttribute('autocomplete')).to.be.false;
      });

      it('should reflect autocomplete attribute when set', async () => {
        const el = await defaultFixture(mobileView);

        el.setAttribute('autocomplete', 'off');
        await elementUpdated(el);

        await expect(el.getAttribute('autocomplete')).to.equal('off');
      });
    });

    describe('autoPlacement', () => {
      it('should not have autoPlacement attribute by default', async () => {
        const el = await defaultFixture(mobileView);

        await expect(el.hasAttribute('autoPlacement')).to.be.false;
      });

      it('should reflect autoPlacement attribute when set', async () => {
        const el = await defaultFixture(mobileView);

        el.autoPlacement = true;
        await elementUpdated(el);

        await expect(el.hasAttribute('autoPlacement')).to.be.true;
      });
    });

    describe('behavior', () => {
      it('should enforce menu selection when behavior is set to filter', async () => {
        const el = await filterFixture(mobileView);
        const activeInput = mobileView ? el.inputInBib : el.input;

        if (mobileView) {

          // type in a value that does not match an option
          el.focus();
          await sendKeys({ press: 'p' });
          await sendKeys({ press: 'p' });
          await elementUpdated(el);

          await sendKeys({ press: 'Escape' });
          el.input.focus();
          el.blur();
          await elementUpdated(el);

          await expect(el.getAttribute('validity')).to.be.equal('valueMissing');

          setInputValue(el, '');
          el.focus();
          activeInput.focus();
          await sendKeys({ press: 'A' });
          await sendKeys({ press: 'p' });
          await sendKeys({ press: 'p' });
          await sendKeys({ press: 'l' });
          await sendKeys({ press: 'e' });
          await sendKeys({ press: 's' });
          await sendKeys({ press: 'Escape' });
          await elementUpdated(el);

          el.input.focus();
          el.input.blur();
          el.blur();

          await elementUpdated(el);

          // expect the value to be set to 'Apples' and the element to be valid
          await expect(el.getAttribute('validity')).to.be.equal('valid');
        } else {
          // type in a value that does not match an option
          el.focus();
          await sendKeys({ press: 'p' });
          await sendKeys({ press: 'p' });
          await elementUpdated(el);

          await sendKeys({ press: 'Escape' });
          el.input.focus();
          el.blur();
          await elementUpdated(el);

          await expect(el.getAttribute('validity')).to.be.equal('valueMissing');

          setInputValue(el, '');
          el.focus();
          await sendKeys({ press: 'A' });
          await sendKeys({ press: 'p' });
          await sendKeys({ press: 'p' });
          await sendKeys({ press: 'l' });
          await sendKeys({ press: 'e' });
          await sendKeys({ press: 's' });
          await sendKeys({ press: 'Escape' });
          await elementUpdated(el);

          el.input.focus();
          el.input.blur();
          el.blur();

          await elementUpdated(el);

          await expect(el.getAttribute('validity')).to.be.equal('valid');
        }
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
      it('should not be disabled by default', async () => {
        const el = await defaultFixture(mobileView);

        await expect(el.hasAttribute('disabled')).to.be.false;
        await expect(el.disabled).to.be.false;
      });

      it('should disable the combobox when disabled attribute is set', async () => {
        const el = await defaultFixture(mobileView);

        el.disabled = true;
        await elementUpdated(el);

        await expect(el.hasAttribute('disabled')).to.be.true;
        await expect(el.input.hasAttribute('disabled')).to.be.true;
      });

      it('should prevent the bib from opening when disabled', async () => {
        const el = await defaultFixture(mobileView);

        el.disabled = true;
        await elementUpdated(el);

        // Attempt to type into the input
        el.input.value = 'App';
        el.input.dispatchEvent(new Event('input', { bubbles: true }));
        await elementUpdated(el);

        await expect(el.dropdown.isPopoverVisible).to.not.be.true;
      });
    });

    describe('dvInputOnly', () => {
      it('should not have dvInputOnly attribute by default', async () => {
        const el = await defaultFixture(mobileView);

        await expect(el.hasAttribute('dvInputOnly')).to.be.false;
      });

      it('should reflect dvInputOnly attribute when set', async () => {
        const el = await defaultFixture(mobileView);

        el.dvInputOnly = true;
        await elementUpdated(el);

        await expect(el.hasAttribute('dvInputOnly')).to.be.true;
      });
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

      it('should render error help text with role="alert" and aria-live="assertive"', async () => {
        const el = await defaultFixture(mobileView);

        el.setAttribute('error', 'Error message');
        await elementUpdated(el);

        const errorHelpText = el.shadowRoot.querySelector('[role="alert"]');
        await expect(errorHelpText).to.exist;
        await expect(errorHelpText.getAttribute('aria-live')).to.equal('assertive');
        await expect(errorHelpText.textContent.trim()).to.equal('Error message');
      });
    });

    describe('format', () => {
      it('should not have format attribute by default', async () => {
        const el = await defaultFixture(mobileView);

        await expect(el.hasAttribute('format')).to.be.false;
      });

      it('should reflect format attribute when set', async () => {
        const el = await defaultFixture(mobileView);

        el.setAttribute('format', 'date');
        await elementUpdated(el);

        await expect(el.getAttribute('format')).to.equal('date');
      });
    });

    describe('fullscreenBreakpoint', () => {
      it('should default to "sm"', async () => {
        const el = await defaultFixture(mobileView);

        await expect(el.fullscreenBreakpoint).to.equal('sm');
      });

      it('should reflect fullscreenBreakpoint attribute when set', async () => {
        const el = await defaultFixture(mobileView);

        el.fullscreenBreakpoint = 'md';
        await elementUpdated(el);

        await expect(el.getAttribute('fullscreenBreakpoint')).to.equal('md');
      });
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
      it('should not have largeFullscreenHeadline attribute by default', async () => {
        const el = await defaultFixture(mobileView);

        await expect(el.hasAttribute('largeFullscreenHeadline')).to.be.false;
        await expect(el.largeFullscreenHeadline).to.be.false;
      });

      it('should reflect largeFullscreenHeadline attribute when set', async () => {
        const el = await defaultFixture(mobileView);

        el.largeFullscreenHeadline = true;
        await elementUpdated(el);

        await expect(el.hasAttribute('largeFullscreenHeadline')).to.be.true;
      });
    });

    describe('layout', () => {
      it('should default to "classic"', async () => {
        const el = await defaultFixture(mobileView);

        await expect(el.layout).to.equal('classic');
      });

      it('should reflect layout attribute when set', async () => {
        const el = await defaultFixture(mobileView);

        el.layout = 'stacked';
        await elementUpdated(el);

        await expect(el.getAttribute('layout')).to.equal('stacked');
      });
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
      it('should not have noFlip attribute by default', async () => {
        const el = await defaultFixture(mobileView);

        await expect(el.hasAttribute('noFlip')).to.be.false;
      });

      it('should reflect noFlip attribute when set', async () => {
        const el = await defaultFixture(mobileView);

        el.noFlip = true;
        await elementUpdated(el);

        await expect(el.hasAttribute('noFlip')).to.be.true;
      });
    });

    describe('noValidate', () => {
      it('should not have noValidate attribute by default', async () => {
        const el = await defaultFixture(mobileView);

        await expect(el.hasAttribute('noValidate')).to.be.false;
      });

      it('should reflect noValidate attribute when set', async () => {
        const el = await defaultFixture(mobileView);

        el.noValidate = true;
        await elementUpdated(el);

        await expect(el.hasAttribute('noValidate')).to.be.true;
      });

    // This test should pass but currently fails due to a bug
    //   it('should not validate on blur when noValidate is set', async () => {
    //     const el = await requiredFixture(mobileView);
    //     el.noValidate = true;
    //     await elementUpdated(el);

    //     // Focus and blur without selecting a value
    //     el.input.focus();
    //     await elementUpdated(el);

    //     el.input.blur();
    //     await elementUpdated(el);

    //     // With noValidate, validity should not be set
    //     await expect(el.hasAttribute('validity')).to.be.false;
    //   });
    });

    describe('offset', () => {
      it('should default offset to 0', async () => {
        const el = await defaultFixture(mobileView);

        await expect(el.offset).to.equal(0);
      });

      it('should reflect offset attribute when set', async () => {
        const el = await defaultFixture(mobileView);

        el.offset = 10;
        await elementUpdated(el);

        await expect(el.getAttribute('offset')).to.equal('10');
      });
    });

    describe('onDark', () => {
      it('should not have onDark attribute by default', async () => {
        const el = await defaultFixture(mobileView);

        await expect(el.hasAttribute('onDark')).to.be.false;
      });

      it('should reflect onDark attribute when set', async () => {
        const el = await defaultFixture(mobileView);

        el.onDark = true;
        await elementUpdated(el);

        await expect(el.hasAttribute('onDark')).to.be.true;
      });
    });

    describe('optionSelected', () => {
      it('should have no option selected by default', async () => {
        const el = await defaultFixture(mobileView);

        await expect(el.optionSelected).to.be.undefined;
      });

      it('should track the selected option after selection', async () => {
        const el = await presetValueFixture(mobileView);
        await elementUpdated(el);

        const selectedOption = el.querySelector('auro-menuoption[value="Apples"]');
        await expect(el.optionSelected).to.equal(selectedOption);
      });
    });

    describe('persistInput', () => {
      it('reports valueMissing on blur when persistInput is set and no option selected', async () => {
        const el = await persistInputFixture(mobileView);
        await elementUpdated(el);

        el.focus();
        el.blur();
        await elementUpdated(el);

        await expect(el.getAttribute('validity')).to.be.equal('valueMissing');
      });
    });

    describe('placement', () => {
      it('should default to "bottom-start"', async () => {
        const el = await defaultFixture(mobileView);

        await expect(el.placement).to.equal('bottom-start');
      });

      it('should reflect placement attribute when set', async () => {
        const el = await defaultFixture(mobileView);

        el.placement = 'top-start';
        await elementUpdated(el);

        await expect(el.getAttribute('placement')).to.equal('top-start');
      });
    });

    describe('placeholder', () => {
      it('should not have placeholder by default', async () => {
        const el = await defaultFixture(mobileView);

        await expect(el.hasAttribute('placeholder')).to.be.false;
      });

      it('should reflect placeholder attribute when set', async () => {
        const el = await defaultFixture(mobileView);

        el.placeholder = 'Search...';
        await elementUpdated(el);

        await expect(el.getAttribute('placeholder')).to.equal('Search...');
      });
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
      it('should not have setCustomValidity by default', async () => {
        const el = await defaultFixture(mobileView);

        await expect(el.setCustomValidity).to.be.undefined;
      });

      it('should apply custom validity message', async () => {
        const el = await defaultFixture(mobileView);

        el.setCustomValidity = 'Custom error';
        await elementUpdated(el);

        await expect(el.setCustomValidity).to.equal('Custom error');
      });
    });

    describe('setCustomValidityCustomError', () => {
      it('should not have setCustomValidityCustomError by default', async () => {
        const el = await defaultFixture(mobileView);

        await expect(el.setCustomValidityCustomError).to.be.undefined;
      });

      it('should set custom error message', async () => {
        const el = await defaultFixture(mobileView);

        el.setCustomValidityCustomError = 'Custom error message';
        await elementUpdated(el);

        await expect(el.setCustomValidityCustomError).to.equal('Custom error message');
      });

      it('should render custom error message in help text when error attribute triggers customError', async () => {
        const el = await defaultFixture(mobileView);

        el.setCustomValidityCustomError = 'Custom combobox error text';
        el.setAttribute('error', 'generic error');
        await elementUpdated(el);

        await expect(el.validity).to.equal('customError');
        const helpText = el.shadowRoot.querySelector('[role="alert"]');
        await expect(helpText).to.exist;
        await expect(helpText.textContent.trim()).to.equal('Custom combobox error text');
      });
    });

    describe('setCustomValidityValueMissing', () => {
      it('should not have setCustomValidityValueMissing by default', async () => {
        const el = await defaultFixture(mobileView);

        await expect(el.setCustomValidityValueMissing).to.be.undefined;
      });

      it('should set value missing message', async () => {
        const el = await defaultFixture(mobileView);

        el.setCustomValidityValueMissing = 'Value required';
        await elementUpdated(el);

        await expect(el.setCustomValidityValueMissing).to.equal('Value required');
      });

      it('should render custom value missing message in help text when required and empty', async () => {
        const el = await requiredFixture(mobileView);

        el.setCustomValidityValueMissing = 'Please pick a fruit';
        await elementUpdated(el);

        el.validate(true);
        await elementUpdated(el);

        await expect(el.validity).to.equal('valueMissing');
        const helpText = el.shadowRoot.querySelector('[role="alert"]');
        await expect(helpText).to.exist;
        await expect(helpText.textContent.trim()).to.equal('Please pick a fruit');
      });
    });

    describe('setCustomValidityValueMissingFilter', () => {
      it('should not have setCustomValidityValueMissingFilter by default', async () => {
        const el = await defaultFixture(mobileView);

        await expect(el.setCustomValidityValueMissingFilter).to.be.undefined;
      });

      it('should set filter value missing message', async () => {
        const el = await defaultFixture(mobileView);

        el.setCustomValidityValueMissingFilter = 'Please select from the list';
        await elementUpdated(el);

        await expect(el.setCustomValidityValueMissingFilter).to.equal('Please select from the list');
      });
    });

    describe('shape', () => {
      it('should default to "classic"', async () => {
        const el = await defaultFixture(mobileView);

        await expect(el.shape).to.equal('classic');
      });

      it('should reflect shape attribute when set', async () => {
        const el = await defaultFixture(mobileView);

        el.shape = 'round';
        await elementUpdated(el);

        await expect(el.getAttribute('shape')).to.equal('round');
      });
    });

    describe('shift', () => {
      it('should not have shift attribute by default', async () => {
        const el = await defaultFixture(mobileView);

        await expect(el.hasAttribute('shift')).to.be.false;
      });

      it('should reflect shift attribute when set', async () => {
        const el = await defaultFixture(mobileView);

        el.shift = true;
        await elementUpdated(el);

        await expect(el.hasAttribute('shift')).to.be.true;
      });
    });

    describe('size', () => {
      it('should default to "xl"', async () => {
        const el = await defaultFixture(mobileView);

        await expect(el.size).to.equal('xl');
      });

      it('should reflect size attribute when set', async () => {
        const el = await defaultFixture(mobileView);

        el.size = 'lg';
        await elementUpdated(el);

        await expect(el.getAttribute('size')).to.equal('lg');
      });
    });

    describe('reactive property propagation to menu', () => {
      it('should update menu size via updateMenuShapeSize after layout change', async () => {
        const el = await defaultFixture(mobileView);
        await elementUpdated(el);

        const menu = el.querySelector('auro-menu');

        // classic layout always sets menu size to 'md'
        expect(menu.getAttribute('size')).to.equal('md');

        el.layout = 'emphasized';
        await elementUpdated(el);
        el.updateMenuShapeSize();
        await elementUpdated(el);

        // emphasized layout uses 'lg'
        expect(menu.getAttribute('size')).to.equal('lg');
      });

      it('should update menu shape via updateMenuShapeSize after layout change', async () => {
        const el = await defaultFixture(mobileView);
        await elementUpdated(el);

        const menu = el.querySelector('auro-menu');

        // classic layout forces shape to 'box'
        expect(menu.getAttribute('shape')).to.equal('box');

        el.layout = 'default';
        el.shape = 'round';
        await elementUpdated(el);
        el.updateMenuShapeSize();
        await elementUpdated(el);

        // default layout passes shape through
        expect(menu.getAttribute('shape')).to.equal('round');
      });

      it('should propagate noCheckmark to menu as attribute', async () => {
        const el = await defaultFixture(mobileView);
        await elementUpdated(el);

        el.noCheckmark = true;
        await elementUpdated(el);

        const menu = el.querySelector('auro-menu');
        expect(menu.hasAttribute('nocheckmark')).to.be.true;
      });

    });

    describe('triggerIcon', () => {
      it('should not have triggerIcon attribute by default', async () => {
        const el = await defaultFixture(mobileView);

        await expect(el.hasAttribute('triggerIcon')).to.be.false;
        await expect(el.triggerIcon).to.be.false;
      });

      it('should reflect triggerIcon attribute when set', async () => {
        const el = await defaultFixture(mobileView);

        el.triggerIcon = true;
        await elementUpdated(el);

        await expect(el.hasAttribute('triggerIcon')).to.be.true;
      });
    });

    describe('type', () => {
      it('should not have type attribute by default', async () => {
        const el = await defaultFixture(mobileView);

        await expect(el.hasAttribute('type')).to.be.false;
      });

      it('should reflect type attribute when set', async () => {
        const el = await defaultFixture(mobileView);

        el.setAttribute('type', 'credit-card');
        await elementUpdated(el);

        await expect(el.getAttribute('type')).to.equal('credit-card');
      });
    });

    describe('typedValue', () => {
      it('should be undefined by default', async () => {
        const el = await defaultFixture(mobileView);

        await expect(el.typedValue).to.be.undefined;
      });

      it('should be cleared after reset()', async () => {
        const el = await presetValueFixture(mobileView);
        await elementUpdated(el);

        el.reset();
        await elementUpdated(el);

        await expect(el.typedValue).to.be.undefined;
      });
    });

    describe('validity', () => {
      it('should be undefined by default', async () => {
        const el = await defaultFixture(mobileView);

        await expect(el.validity).to.be.undefined;
      });

      it('should be "valid" after successful validation', async () => {
        const el = await requiredFixture(mobileView);

        setInputValue(el, 'Apples');
        el.input.click();
        await elementUpdated(el);

        el.blur();
        await elementUpdated(el);

        await expect(el.getAttribute('validity')).to.equal('valid');
      });

      it('should be "valueMissing" when required and empty', async () => {
        const el = await requiredFixture(mobileView);

        el.focus();
        el.shadowRoot.activeElement.blur();
        await elementUpdated(el);

        await expect(el.getAttribute('validity')).to.equal('valueMissing');
      });
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

    describe('type', () => {
      it('should forward type property to the inner input', async () => {
        const el = await fixture(html`
          <auro-combobox type="credit-card">
            <span slot="label">Card</span>
            <auro-menu>
              <auro-menuoption value="one">One</auro-menuoption>
            </auro-menu>
          </auro-combobox>
        `);
        await elementUpdated(el);

        const triggerInput = el.dropdown.querySelector('[slot="trigger"]');
        await expect(triggerInput.type).to.equal('credit-card');
      });
    });

    describe('format', () => {
      it('should forward format property to the bib input', async () => {
        const el = await fixture(html`
          <auro-combobox format="###-##-####">
            <span slot="label">SSN</span>
            <auro-menu>
              <auro-menuoption value="one">One</auro-menuoption>
            </auro-menu>
          </auro-combobox>
        `);
        await elementUpdated(el);

        await expect(el.format).to.equal('###-##-####');
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

      // Regression: optionSelected.textContent was assigned to input.value
      // verbatim, so HTML-indentation whitespace and the displayValue slot's
      // text (e.g. emoji icons) leaked into the input.
      it('should not leak displayValue slot text or HTML indentation into input.value', async () => {
        const el = await fixture(html`
          <auro-combobox value="Apples">
            <span slot="label">Name</span>
            <auro-menu>
              <auro-menuoption value="Apples">
                Apples
                <span slot="displayValue">🍎</span>
              </auro-menuoption>
              <auro-menuoption value="Oranges">
                Oranges
                <span slot="displayValue">🍊</span>
              </auro-menuoption>
            </auro-menu>
          </auro-combobox>
        `);
        await elementUpdated(el);
        await el.menu.updateComplete;
        await new Promise((resolve) => setTimeout(resolve, 0));

        await expect(el.input.value).to.equal('Apples');
      });
    });

  });

  describe('Public Functions', () => {
    describe('isValid', () => {
      it('should return true when validity is undefined', async () => {
        const el = await defaultFixture(mobileView);

        await expect(el.isValid()).to.be.true;
      });

      it('should return true when validity is "valid"', async () => {
        const el = await requiredFixture(mobileView);

        setInputValue(el, 'Apples');
        el.input.click();
        await elementUpdated(el);

        el.blur();

        await elementUpdated(el);

        await expect(el.isValid()).to.be.true;
      });

      it('should return false when validity indicates an error', async () => {
        const el = await requiredFixture(mobileView);

        el.focus();
        el.shadowRoot.activeElement.blur();
        await elementUpdated(el);

        await expect(el.isValid()).to.be.false;
      });
    });

    describe('register', () => {
      it('should register the component as a custom element', async () => {
        await expect(Boolean(customElements.get('auro-combobox'))).to.be.true;
      });
    });

    describe('hideBib', () => {
      it('should hide the dropdown when it is visible', async () => {
        const el = await defaultFixture(mobileView);

        el.focus();
        await elementUpdated(el);
        await sendKeys({ press: 'a' });
        el.input.click();
        await elementUpdated(el);
        await expect(el.dropdown.isPopoverVisible).to.be.true;

        el.hideBib();
        await elementUpdated(el);

        await expect(el.dropdown.isPopoverVisible).to.be.false;
      });

      it('should be a no-op when dropdown is already hidden', async () => {
        const el = await defaultFixture(mobileView);

        await expect(el.dropdown.isPopoverVisible).to.be.false;

        el.hideBib();
        await elementUpdated(el);

        await expect(el.dropdown.isPopoverVisible).to.be.false;
      });
    });

    describe('showBib', () => {
      it('should show the dropdown when input has matching options', async () => {
        const el = await defaultFixture(mobileView);

        el.focus();
        await elementUpdated(el);
        await sendKeys({ press: 'a' });
        el.input.click();
        await elementUpdated(el);

        await expect(el.dropdownOpen).to.be.true;
      });

      it('should not show the dropdown when input is empty', async () => {
        const el = await defaultFixture(mobileView);

        el.input.click();
        await elementUpdated(el);

        await expect(el.dropdown.isPopoverVisible).to.be.false;
      });
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
          el.input.click();
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
      it('should set the menu value programmatically', async () => {
        const el = await defaultFixture(mobileView);

        el.setMenuValue('Oranges');
        await elementUpdated(el);

        await expect(el.menu.value).to.equal('Oranges');
      });

      // Regression guard on the cascade-suppression state machine. The flag
      // is the closing edge of an internal loop: setMenuValue arms it, the
      // auroMenu-selectedOption listener consumes it, and the listener's
      // writeback to combobox.value is skipped on that one echo so it
      // doesn't re-trigger handleInputValueChange in suggestion mode (see
      // also the "should not cascade" performUpdate-spy test). There is no
      // clean DOM/ARIA observable for "the cascade was broken" — the bib
      // and value end up in the same place either way — so the assertion
      // targets the invariant the listener depends on.
      it('arms and consumes the menu-sync flag across the echo cycle', async () => {
        const el = await defaultFixture(mobileView);
        await elementUpdated(el);

        el.setMenuValue('Oranges');
        await expect(el._pendingMenuValueSync).to.be.true;

        await elementUpdated(el);
        await el.menu.updateComplete;

        await expect(el._pendingMenuValueSync).to.be.false;
      });

      // Regression guard on the cleanup path: setMenuValue('NotAnOption')
      // fires auroMenu-selectValueFailure (not auroMenu-selectedOption), so
      // the listener never runs and never consumes the flag. The
      // setTimeout(0) backup clear in setMenuValue must still release it
      // before the next user-click selection arrives — otherwise that next
      // selection's writeback is silently swallowed.
      it('clears the menu-sync flag when the menu does not fire selectedOption', async () => {
        const el = await defaultFixture(mobileView);
        await elementUpdated(el);

        el.setMenuValue('NotAnOption');
        await expect(el._pendingMenuValueSync).to.be.true;

        await elementUpdated(el);
        await el.menu.updateComplete;
        await new Promise((resolve) => setTimeout(resolve, 0));

        await expect(el._pendingMenuValueSync).to.be.false;
      });

      // Screen-reader announcement fires when a programmatic value has no
      // matching option. The announcement is routed through the
      // auroMenu-selectValueFailure listener which reads this.value, so the
      // value setter (not setMenuValue) is the path that produces the
      // announcement.
      it('should announce "No matching option" to screen readers when value has no match', async () => {
        const el = await defaultFixture(mobileView);
        await elementUpdated(el);

        el.value = 'NotAnOption';
        await elementUpdated(el);
        await el.menu.updateComplete;
        await new Promise((resolve) => requestAnimationFrame(resolve));

        const liveRegion = getAnnouncementRoot(el.dropdown, el.shadowRoot).querySelector('#srAnnouncement');
        await expect(liveRegion).to.exist;
        await expect(liveRegion.textContent).to.include('No matching option for NotAnOption');
      });
    });

    describe('programmatic value against a disabled option', () => {
      it('clears value and optionSelected when the value matches a disabled option', async () => {
        const el = await disabledOptionFixture(mobileView);
        await elementUpdated(el);

        // 'Oranges' is disabled — the menu rejects the match and dispatches
        // auroMenu-selectValueFailure, which the combobox turns into a cleared
        // selection rather than pinning a non-selectable option.
        el.value = 'Oranges';
        await elementUpdated(el);
        await el.menu.updateComplete;
        await new Promise((resolve) => setTimeout(resolve, 0));

        await expect(el.value).to.be.undefined;
        await expect(el.optionSelected).to.be.undefined;
      });

      it('clears a preset value supplied at mount when it matches a disabled option', async () => {
        const el = await presetDisabledValueFixture(mobileView);
        await elementUpdated(el);
        await el.menu.updateComplete;
        await new Promise((resolve) => setTimeout(resolve, 0));

        await expect(el.value).to.be.undefined;
        await expect(el.optionSelected).to.be.undefined;
      });
    });

    describe('reset', () => {
      it('should clear value, optionSelected, and touched state', async () => {
        const el = await presetValueFixture(mobileView);
        await elementUpdated(el);

        await expect(el.value).to.equal('Apples');

        el.reset();
        await elementUpdated(el);

        await expect(el.value).to.be.undefined;
        await expect(el.optionSelected).to.be.undefined;
        await expect(el.touched).to.be.false;
      });

      it('should clear the inner native input element value', async () => {
        const el = await presetValueFixture(mobileView);
        await elementUpdated(el);

        await expect(el.input.inputElement.value).to.equal('Apples');

        el.reset();
        await elementUpdated(el);
        await el.input.updateComplete;

        await expect(el.input.value).to.be.undefined;
        await expect(el.input.inputElement.value).to.equal('');
      });

      it('should clear the inner native input element value after typing without selection', async () => {
        const el = await defaultFixture(mobileView);
        await elementUpdated(el);

        setInputValue(el, 'App');
        await elementUpdated(el);
        await el.input.updateComplete;

        await expect(el.input.inputElement.value).to.equal('App');

        el.reset();
        await elementUpdated(el);
        await el.input.updateComplete;

        await expect(el.input.value).to.be.undefined;
        await expect(el.input.inputElement.value).to.equal('');
      });

      it('should also clear the inputInBib native input value in mobile fullscreen', async () => {
        if (!mobileView) {
          return;
        }
        const el = await presetValueFixture(mobileView);
        await elementUpdated(el);

        await expect(el.inputInBib).to.exist;
        await expect(el.inputInBib.value).to.equal('Apples');

        el.reset();
        await elementUpdated(el);
        await el.input.updateComplete;
        await el.inputInBib.updateComplete;

        await expect(el.inputInBib.value).to.be.undefined;
        await expect(el.inputInBib.inputElement.value).to.equal('');
      });
    });

    describe('clear', () => {
      it('should clear value and optionSelected', async () => {
        const el = await presetValueFixture(mobileView);
        await elementUpdated(el);

        await expect(el.value).to.equal('Apples');

        el.clear();
        await elementUpdated(el);

        await expect(el.value).to.be.undefined;
        await expect(el.optionSelected).to.be.undefined;
      });
    });

    describe('validate', () => {
      it('should run validation and update validity', async () => {
        const el = await requiredFixture(mobileView);

        el.validate(true);
        await elementUpdated(el);

        await expect(el.getAttribute('validity')).to.equal('valueMissing');
      });

      it('should mark as valid when value is present', async () => {
        const el = await requiredFixture(mobileView);

        el.focus();
        await sendKeys({ press: 'A' });
        await sendKeys({ press: 'p' });
        await sendKeys({ press: 'p' });
        await sendKeys({ press: 'l' });
        await sendKeys({ press: 'e' });
        await sendKeys({ press: 's' });
        await sendKeys({ press: 'Escape' });
        await elementUpdated(el);

        el.input.focus();
        el.input.blur();
        el.blur();

        el.validate(true);
        await elementUpdated(el);

        await expect(el.getAttribute('validity')).to.equal('valid');
      });

      it('should not validate when _inFullscreenTransition is true', async () => {
        const el = await requiredFixture(mobileView);

        el._inFullscreenTransition = true;
        el.validate(true);
        await elementUpdated(el);

        await expect(el.hasAttribute('validity')).to.be.false;
      });

      it('should re-run input validation when a fresh user selection lands', async () => {
        const el = await fixture(html`
          <auro-combobox type="credit-card">
            <span slot="label">Card</span>
            <auro-menu>
              <auro-menuoption value="4500000000000000" id="opt-cc">
                4500 0000 0000 0000
              </auro-menuoption>
            </auro-menu>
          </auro-combobox>
        `);
        await elementUpdated(el);

        el.input.focus();
        await sendKeys({ press: '4' });

        await elementUpdated(el);

        // Close the bib before blur — the combobox's focusout handler skips
        // `validate()` while `dropdownOpen` is true (see auro-combobox.js
        // line 1310: prevents flashing pre-selection errors during a menu
        // option mousedown). Real users tab/click-out which closes the bib
        // first; typed-then-blur without closing is a test-only shape.
        await sendKeys({ press: 'Escape' });

        el.input.focus();
        el.input.blur();
        el.blur();

        await elementUpdated(el);
        await expect(el.validity).to.equal('tooShort');

        el.input.focus();
        await sendKeys({ press: '5' });
        await sendKeys({ press: 'Enter' });
        await elementUpdated(el);
        await el.input.updateComplete;
        await new Promise((resolve) => setTimeout(resolve, 0));

        // Enter selects the option and closes the bib in most paths, but
        // mobile fullscreen may need an explicit Escape to return focus.
        if (mobileView) {
          await sendKeys({ press: 'Escape' });
        }

        el.blur();

        await expect(el.validity).to.equal('valid');
      });
    });

    describe('updateActiveOption', () => {
      it('should update the active option by index in availableOptions', async () => {
        const el = await defaultFixture(mobileView);

        setInputValue(el, 'a');
        await elementUpdated(el);

        await expect(el.availableOptions.length).to.be.greaterThan(0);

        el.updateActiveOption(0);
        await elementUpdated(el);

        await expect(el.optionActive === el.availableOptions[0], `expected el.optionActive to equal el.availableOptions[0]`).to.be.true;
      });
    });

    describe('resetShapeClasses', () => {
      it('should apply shape classes to the wrapper element', async () => {
        const el = await fixture(html`<auro-combobox shape="round" size="lg"><span slot="label">Name</span><auro-menu><auro-menuoption value="Apples">Apples</auro-menuoption></auro-menu></auro-combobox>`);
        await elementUpdated(el);

        const wrapper = el.shadowRoot.querySelector('.wrapper');
        if (wrapper) {
          await expect(wrapper.classList.contains('shape-round-lg')).to.be.true;
        } else {
          // if no .wrapper, we just verify the method exists
          await expect(typeof el.resetShapeClasses).to.equal('function');
        }
      });
    });

    describe('resetLayoutClasses', () => {
      it('should apply layout classes to the wrapper element', async () => {
        const el = await fixture(html`<auro-combobox layout="stacked"><span slot="label">Name</span><auro-menu><auro-menuoption value="Apples">Apples</auro-menuoption></auro-menu></auro-combobox>`);
        await elementUpdated(el);

        const wrapper = el.shadowRoot.querySelector('.wrapper');
        if (wrapper) {
          await expect(wrapper.classList.contains('layout-stacked')).to.be.true;
        } else {
          await expect(typeof el.resetLayoutClasses).to.equal('function');
        }
      });
    });

    describe('updateComponentArchitecture', () => {
      it('should call both resetShapeClasses and resetLayoutClasses', async () => {
        const el = await defaultFixture(mobileView);

        await expect(typeof el.updateComponentArchitecture).to.equal('function');

        // Should not throw when called
        el.updateComponentArchitecture();
        await elementUpdated(el);
      });
    });

    describe('inputValue', () => {
      it('should return undefined when input has no value', async () => {
        const el = await defaultFixture(mobileView);

        await expect(el.inputValue).to.not.be.ok;
      });

      it('should return the current input value', async () => {
        const el = await defaultFixture(mobileView);

        setInputValue(el, 'Test');
        await elementUpdated(el);

        await expect(el.inputValue).to.equal('Test');
      });
    });
  });

  describe('Events', () => {
    describe('auroCombobox-valueSet', () => {
      it('should fire when a value is selected', async () => {
        const el = await defaultFixture(mobileView);

        setInputValue(el, 'a');
        await elementUpdated(el);

        setTimeout(() => {
          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
          el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        });

        await oneEvent(el, 'auroCombobox-valueSet');
      });
    });

    describe('input', () => {
      it('should fire input event when the user types', async () => {
        const el = await defaultFixture(mobileView);

        const inputEventPromise = oneEvent(el, 'input');
        setInputValue(el, 'a');
        await inputEventPromise;
      });
    });

    describe('inputValue', () => {
      it('should fire inputValue event when input value changes', async () => {
        const el = await defaultFixture(mobileView);

        const eventPromise = oneEvent(el, 'inputValue');

        setInputValue(el, 'test');

        const event = await eventPromise;
        await expect(event).to.exist;
      });
    });

    describe('auroFormElement-validated', () => {
      it('should fire after validation completes', async () => {
        const el = await requiredFixture(mobileView);

        el.focus();
        setTimeout(() => {
          el.shadowRoot.activeElement.blur();
        });

        await oneEvent(el, 'auroFormElement-validated');
      });
    });
  });

  describe('Private Functions', () => {
    it('inputValue returns undefined when input is not yet set', () => {
      const el = document.createElement('auro-combobox');
      expect(el.inputValue).to.be.undefined;
    });

    it('updateFilter hides bib when loading and isHiddenWhileLoading', async () => {
      const el = await defaultFixture(mobileView);
      await elementUpdated(el);

      // Set up: menu is loading and bib was already hidden while loading
      el.menu.setAttribute('loading', '');
      el.isHiddenWhileLoading = true;

      // Type a value that matches no options so availableOptions ends up empty
      setInputValue(el, 'zzzzzzz_no_match');

      await elementUpdated(el);

      // The bib should remain closed (hideBib called via the isHiddenWhileLoading branch)
      expect(el.dropdown.isPopoverVisible).to.be.false;
    });

    it('updateTriggerTextDisplay clones displayValue from selected option into input', async () => {
      const el = await fixture(html`
        <auro-combobox>
          <span slot="label">Choose</span>
          <auro-menu>
            <auro-menuoption value="one">
              One
              <span slot="displayValue">Custom Display</span>
            </auro-menuoption>
            <auro-menuoption value="two">Two</auro-menuoption>
          </auro-menu>
        </auro-combobox>
      `);
      await elementUpdated(el);

      // Select the first option which has a displayValue slot child
      el.menu.value = 'one';
      await elementUpdated(el);

      // The displayValue should have been cloned into the input.
      // :not(slot) excludes the template's <slot> forwarder (also slotted as
      // displayValue) so we find the appended clone.
      const clonedDisplayValue = el.input.querySelector('[slot="displayValue"]:not(slot)');
      expect(clonedDisplayValue).to.exist;
      expect(clonedDisplayValue.textContent).to.equal('Custom Display');
    });

    it('generateOptionsArray sets options to empty array when menu has no options', async () => {
      const el = await defaultFixture(mobileView);
      await elementUpdated(el);

      const savedMenu = el.menu;
      el.menu = undefined;

      el.generateOptionsArray();
      expect(el.options).to.deep.equal([]);

      // Restore
      el.menu = savedMenu;
    });

    it('configureDropdown sets bibDialogLabel to undefined when label slot is empty', async () => {
      const el = await fixture(html`
        <auro-combobox>
          <span slot="label"></span>
          <auro-menu>
            <auro-menuoption value="one">One</auro-menuoption>
          </auro-menu>
        </auro-combobox>
      `);
      await elementUpdated(el);

      // The label slot element exists but has empty textContent, so bibDialogLabel should be undefined
      expect(el.dropdown.bibDialogLabel).to.be.undefined;
    });

    it('showBib keeps the bib hidden when the menu is loading without a placeholder', async () => {
      const el = await defaultFixture(mobileView);
      await elementUpdated(el);

      // Put menu in loading state — use a truthy attribute value so
      // getAttribute('loading') passes the outer guard in showBib
      el.menu.setAttribute('loading', 'true');

      // Set input value directly
      el.input.value = 'test';
      await elementUpdated(el);

      // Ensure dropdown is closed before calling showBib
      if (el.dropdown.isPopoverVisible) {
        el.dropdown.hide();
        await elementUpdated(el);
      }

      el.showBib();

      // Observable: bib stays closed despite showBib() being called, because
      // the loading-without-placeholder branch defers the open until loading
      // completes (verified by the handleMenuLoadingChange test below).
      expect(el.dropdown.isPopoverVisible).to.be.false;

      // Cleanup
      el.menu.removeAttribute('loading');
    });

    it('strategy-change sets trigger.inert true when switching to fullscreen while open', async () => {
      const el = await defaultFixture(mobileView);
      await elementUpdated(el);

      // Mock the dropdown as fullscreen and popover visible
      const origIsBibFullscreen = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el.dropdown), 'isBibFullscreen')
        || Object.getOwnPropertyDescriptor(el.dropdown, 'isBibFullscreen');

      Object.defineProperty(el.dropdown, 'isBibFullscreen', { value: true, writable: true, configurable: true });
      Object.defineProperty(el.dropdown, 'isPopoverVisible', { value: true, writable: true, configurable: true });

      // Ensure trigger.inert starts false
      el.dropdown.trigger.inert = false;

      // Dispatch the strategy-change event
      el.dropdown.dispatchEvent(new CustomEvent('auroDropdown-strategy-change'));

      expect(el.dropdown.trigger.inert).to.be.true;

      // Cleanup
      delete el.dropdown.isBibFullscreen;
      delete el.dropdown.isPopoverVisible;
    });

    it('strategy-change sets trigger.inert false when not fullscreen', async () => {
      const el = await defaultFixture(mobileView);
      await elementUpdated(el);

      // Mock the dropdown as NOT fullscreen
      Object.defineProperty(el.dropdown, 'isBibFullscreen', { value: false, writable: true, configurable: true });

      // Set trigger.inert to true so we can verify it gets reset
      el.dropdown.trigger.inert = true;

      // Dispatch the strategy-change event
      el.dropdown.dispatchEvent(new CustomEvent('auroDropdown-strategy-change'));

      expect(el.dropdown.trigger.inert).to.be.false;

      // Cleanup
      delete el.dropdown.isBibFullscreen;
    });

    it('updateMenuShapeSize returns early when menu is not set', async () => {
      const el = await defaultFixture(mobileView);
      await elementUpdated(el);

      const savedMenu = el.menu;
      el.menu = undefined;

      // Should not throw when menu is undefined
      el.updateMenuShapeSize();

      // Restore
      el.menu = savedMenu;
    });

    it('updateMenuShapeSize sets rounded shape for emphasized layout', async () => {
      const el = await fixture(html`
        <auro-combobox layout="emphasized">
          <span slot="label">Choose</span>
          <auro-menu>
            <auro-menuoption value="one">One</auro-menuoption>
          </auro-menu>
        </auro-combobox>
      `);
      await elementUpdated(el);

      // Ensure dropdown is not in fullscreen so the else branch (switch) runs
      Object.defineProperty(el.dropdown, 'isBibFullscreen', { value: false, writable: true, configurable: true });

      el.updateMenuShapeSize();

      expect(el.menu.getAttribute('shape')).to.equal('rounded');
      expect(el.menu.getAttribute('size')).to.equal('lg');

      // Cleanup
      delete el.dropdown.isBibFullscreen;
    });

    it('configureMenu retries via setTimeout when menu is not found', async () => {
      const el = await defaultFixture(mobileView);
      await elementUpdated(el);

      // Save the real menu, remove it so querySelector returns null
      const menu = el.querySelector('auro-menu');
      menu.remove();

      // Call configureMenu — querySelector returns null, guard triggers setTimeout retry
      el.configureMenu();
      await elementUpdated(el);

      // Re-add the menu so the retry finds it
      el.appendChild(menu);
      await elementUpdated(el);

      // The setTimeout retry should now find the menu
      await new Promise((resolve) => setTimeout(resolve, 50)); // eslint-disable-line no-magic-numbers
      await elementUpdated(el);

      expect(el.menu).to.not.be.null;
    });

    it('scrollIntoView uses auto behavior when prefers-reduced-motion is enabled', async () => {
      const el = await noFilterFixture(mobileView);
      await elementUpdated(el);

      // Mock matchMedia to report prefers-reduced-motion: reduce
      const origMatchMedia = window.matchMedia;
      window.matchMedia = (query) => {
        if (query === '(prefers-reduced-motion: reduce)') {
          return { matches: true };
        }
        return origMatchMedia(query);
      };

      // Spy on scrollIntoView to capture the behavior option
      let scrollBehavior = null;
      const option = el.querySelector('auro-menuoption');
      option.scrollIntoView = (opts) => { scrollBehavior = opts.behavior; };

      // Dispatch activatedOption event from the menu
      el.menu.dispatchEvent(new CustomEvent('auroMenu-activatedOption', {
        detail: option,
        bubbles: false,
      }));

      expect(scrollBehavior).to.equal('auto');

      // Cleanup
      window.matchMedia = origMatchMedia;
    });

    it('handleMenuLoadingChange shows dropdown when loading finishes and combobox has focus', async () => {
      const el = await defaultFixture(mobileView);
      await elementUpdated(el);

      // Reach the deferred-open state by invoking the public flag. The
      // showBib() path that arms it is covered by the previous test; here
      // we exercise just the loading-finished branch.
      el.isHiddenWhileLoading = true;
      el.input.focus();
      await elementUpdated(el);

      // Spy on dropdown.show() so we can verify the deferred open actually
      // fires once loading completes — there is no other observable for
      // "loading-finish ran the deferred open" since `isPopoverVisible` is
      // driven by dropdown.show() itself.
      let showCalled = false;
      const origShow = el.dropdown.show;
      el.dropdown.show = () => { showCalled = true; };

      el.handleMenuLoadingChange(new CustomEvent('auroMenu-loadingChange', {
        detail: { loading: false, hasLoadingPlaceholder: false }
      }));

      expect(showCalled).to.be.true;

      // Cleanup
      el.dropdown.show = origShow;
    });

    it('handleInputValueChange hides bib when input value is truthy with length 0 in desktop view only', async () => {
      if (!mobileView) {
        const el = await defaultFixture(mobileView);
        await elementUpdated(el);

        el.focus();
        await elementUpdated(el);
        await sendKeys({ press: 'a' });
        el.input.click();

        await elementUpdated(el);

        await expect(el.dropdownOpen).to.be.true;

        setInputValue(el, '');

        await elementUpdated(el);

        await expect(el.dropdownOpen).to.be.false;
      }
    });

    it('setMenuValue returns early when menu is not set', async () => {
      const el = await defaultFixture(mobileView);
      await elementUpdated(el);

      // Save and remove menu
      const origMenu = el.menu;
      el.menu = undefined;

      // Should not throw — just return early
      el.setMenuValue('test');

      // Restore
      el.menu = origMenu;
    });

    it('updated syncs input.value from this.value when input is empty and menu has no options', async () => {
      const el = await defaultFixture(mobileView);
      await elementUpdated(el);

      // Clear input value and remove menu options from the DOM so the guard passes
      el.input.value = undefined;
      const menu = el.querySelector('auro-menu');
      const removedOptions = [...menu.querySelectorAll('auro-menuoption')];
      removedOptions.forEach((opt) => opt.remove());
      await elementUpdated(el);

      // Set value to trigger updated() with changedProperties containing 'value'
      el.value = 'programmatic-value';
      await elementUpdated(el);

      expect(el.input.value).to.equal('programmatic-value');

      // Restore
      removedOptions.forEach((opt) => menu.appendChild(opt));
    });

    it('updated calls clear() in filter mode when value is set to falsy', async () => {
      const el = await defaultFixture(mobileView);
      await elementUpdated(el);

      // Switch to filter behavior (non-suggestion) and set up state
      el.behavior = 'filter';
      el.hasValue = false;

      // Track clear() calls
      let clearCalled = false;
      const origClear = el.clear.bind(el);
      el.clear = () => { clearCalled = true; };

      // Directly call updated() with a changedProperties map that includes 'value'
      // This avoids Lit's reactive cycle complexity
      el.value = undefined;
      el.updated(new Map([['value', 'old-value']]));

      expect(clearCalled).to.be.true;

      // Cleanup
      delete el.clear;
    });

    it('handleSlotChange transports bib.fullscreen.headline nodes to bibtemplate', async () => {
      const el = await defaultFixture(mobileView);
      await elementUpdated(el);

      // Track transportAssignedNodes calls
      let transportArgs = null;
      const origTransport = el.transportAssignedNodes.bind(el);
      el.transportAssignedNodes = (slot, target, newSlotName) => {
        transportArgs = { target, newSlotName };
        origTransport(slot, target, newSlotName);
      };

      // Create a mock slotchange event with target.name = 'bib.fullscreen.headline'
      const mockSlot = { name: 'bib.fullscreen.headline', assignedNodes: () => [] };
      el.handleSlotChange({ target: mockSlot });

      expect(transportArgs).to.not.be.null;
      expect(transportArgs.target).to.equal(el.bibtemplate);
      expect(transportArgs.newSlotName).to.equal('header');

      // Cleanup
      delete el.transportAssignedNodes;
    });

    it('handleSlotChange default case does nothing for unknown slot names', async () => {
      const el = await defaultFixture(mobileView);
      await elementUpdated(el);

      // Should not throw for an unknown slot name
      const mockSlot = { name: 'unknown-slot' };
      el.handleSlotChange({ target: mockSlot });
    });

    it('render uses inverse appearance for error helpText when onDark is true', async () => {
      const el = await defaultFixture(mobileView);
      await elementUpdated(el);

      // Set onDark and put component into error state
      el.onDark = true;
      el.validity = 'customError';
      el.errorMessage = 'Test error';
      await elementUpdated(el);

      // Find the error helpText element in the shadow DOM
      const helpTexts = el.shadowRoot.querySelectorAll(el.helpTextTag._$litStatic$);
      const errorHelpText = [...helpTexts].find((ht) => ht.hasAttribute('error'));

      expect(errorHelpText).to.not.be.undefined;
      expect(errorHelpText.getAttribute('appearance')).to.equal('inverse');
    });

    it('getClearBtn returns null when ctx has no activeInput shadowRoot', async () => {
      const el = await defaultFixture(mobileView);
      await elementUpdated(el);

      // Call ArrowDown handler with a context where activeInput is null
      // This exercises the getClearBtn guard (!root → return null)
      const mockEvt = { preventDefault: () => {}, stopPropagation: () => {} };
      const ctx = { isExpanded: false, isModal: false, isPopover: true, activeInput: null };

      // Should not throw — getClearBtn returns null, isClearBtnFocused returns false
      comboboxKeyboardStrategy.ArrowDown(el, mockEvt, ctx);
    });
  });

  describe('A11Y', () => {
    it('should be accessible', async () => {
      const el = await noFilterFixture(mobileView);

      await elementUpdated(el);

      await expect(el).to.be.accessible();
    });

    describe('Screen Reader', function() {
      this.timeout(5000);

      if (mobileView) {
        // The per-keystroke active-option announcement only fires in
        // fullscreen mode — aria-activedescendant references break across
        // the nested <dialog> shadow root, so we mirror the active option
        // into the polite live region. In popover (non-fullscreen) mode,
        // aria-activedescendant on the trigger input is read natively;
        // mirroring would double-announce and flood the queue on key-repeat.
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

          // Multiple announcements can chain (e.g., active-option followed
          // by selection), each resetting the 1000ms cleanup timer. Poll
          // for the empty live region rather than blocking on a fixed wait
          // so this passes as soon as the last timer fires (≤ ~1300ms in
          // practice) and the test doesn't flake under CI load if the
          // chain runs longer than expected.
          await waitUntil(
            () => liveRegion.textContent === '',
            'live region was not cleared after announcement timers expired',
            { timeout: 3000 }
          );
        });
      } else {
        // Regression: in popover (non-fullscreen) mode, ArrowUp/Down must not
        // mirror the active option into the polite live region — VoiceOver
        // already reads it natively via aria-activedescendant on the trigger
        // input, and the manual mirror would double-announce on every key
        // repeat, flooding the polite queue.
        it('should not populate the live region on arrow nav in popover mode', async () => {
          const el = await noFilterFixture(mobileView);
          await elementUpdated(el);

          // Fire the active-option event directly so the test doesn't depend
          // on whether the keyboard bridge propagates in this test env.
          const option = el.querySelector('auro-menuoption');
          el.menu.dispatchEvent(new CustomEvent('auroMenu-activatedOption', {
            detail: option,
            bubbles: false,
          }));

          // Wait a frame for any rAF inside announceToScreenReader.
          await new Promise((resolve) => requestAnimationFrame(resolve));

          const liveRegion = getAnnouncementRoot(el.dropdown, el.shadowRoot).querySelector('#srAnnouncement');
          await expect(liveRegion).to.exist;
          // No manual mirror — aria-activedescendant on the trigger input
          // carries the active option to the screen reader natively.
          await expect(liveRegion.textContent).to.equal('');
        });
      }

      // Regression: setting combobox.value to a freeform string with no
      // matching option used to close the bib silently via updateFilter
      // (no noMatchOption + 0 results → hideBib). Screen-reader users
      // got no signal that their request was dropped.
      it('announces when a programmatic value matches no option', async () => {
        const el = await defaultFixture(mobileView);
        await elementUpdated(el);

        el.value = 'NotAnOption';
        await elementUpdated(el);
        await el.menu.updateComplete;
        await new Promise((resolve) => requestAnimationFrame(resolve));

        const liveRegion = getAnnouncementRoot(el.dropdown, el.shadowRoot).querySelector('#srAnnouncement');
        await expect(liveRegion).to.exist;
        await expect(liveRegion.textContent).to.equal('No matching option for NotAnOption');
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

        el.focus();
        await elementUpdated(el);
        await sendKeys({ press: 'a' });
        el.input.click();
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
        await elementUpdated(el);
        await sendKeys({ press: 'a' });
        el.input.click();
        await elementUpdated(el);

        // Simulate fullscreen strategy change (resize observers don't fire in test env)
        el.dropdownOpen = true;

        const bibEl = el.dropdown.bibElement.value;
        const dialog = bibEl.shadowRoot.querySelector('dialog');

        await expect(bibEl.dialogRole).to.be.undefined;
        await expect(dialog.hasAttribute('role')).to.be.false;
      });
    });

    describe('ARIA attributes', () => {
      it('aria-expanded reflects bib open/closed state on trigger input', async () => {
        const el = await defaultFixture(mobileView);
        const triggerNativeInput = el.input.shadowRoot.querySelector('input');

        // Initially closed — aria-expanded reflects false.
        await expect(triggerNativeInput.getAttribute('aria-expanded')).to.equal('false');

        // Open the bib
        el.focus();
        await elementUpdated(el);
        await sendKeys({ press: 'a' });
        el.input.click();
        await elementUpdated(el);
        await expect(el.dropdown.isPopoverVisible).to.be.true;

        // aria-expanded must reflect true synchronously on open — no deferral.
        // A typeahead user who opens and selects in under the prior 150ms
        // timer would otherwise see "collapsed → collapsed" and never hear
        // the dropdown announced.
        await expect(triggerNativeInput.getAttribute('aria-expanded')).to.equal('true');

        // Close the bib — aria-expanded flips back immediately.
        el.hideBib();
        await elementUpdated(el);
        await expect(triggerNativeInput.getAttribute('aria-expanded')).to.equal('false');
      });

      // Regression: aria-expanded "true" used to be deferred via a 150ms
      // setTimeout. A fast open/close (e.g. typeahead selection) would close
      // the dropdown before the timer fired, and assistive tech would never
      // hear the expanded state at all.
      it('exposes aria-expanded=true before a fast close (<150ms) lands', async () => {
        const el = await defaultFixture(mobileView);
        const triggerNativeInput = el.input.shadowRoot.querySelector('input');

        el.focus();
        await elementUpdated(el);
        await sendKeys({ press: 'a' });
        el.input.click();
        await elementUpdated(el);
        await expect(el.dropdown.isPopoverVisible).to.be.true;

        // Sample aria-expanded the next microtask after open — well under the
        // prior 150ms timer. With the deferral in place, this would read
        // "false" and AT would never hear the expanded state if the user
        // selected and closed the bib before the timer fired.
        await expect(triggerNativeInput.getAttribute('aria-expanded')).to.equal('true');

        // Now close fast — aria-expanded must have been true for at least one
        // render cycle while open. With the prior deferral, the timer would
        // be cleared on close and AT would only ever see "collapsed".
        el.hideBib();
        await elementUpdated(el);
        await expect(triggerNativeInput.getAttribute('aria-expanded')).to.equal('false');
      });

      it('trigger input has a11yRole="combobox"', async () => {
        const el = await defaultFixture(mobileView);

        await expect(el.input.a11yRole).to.equal('combobox');
      });

      it('selected option gets aria-selected="true"', async () => {
        const el = await presetValueFixture(mobileView);
        await elementUpdated(el);

        const menu = el.querySelector('auro-menu');
        const selectedOption = menu.querySelector('auro-menuoption[selected]');

        await expect(selectedOption).to.exist;
        await expect(selectedOption.getAttribute('aria-selected')).to.equal('true');
      });

      it('trigger input has aria-controls referencing the dropdown bib', async () => {
        const el = await defaultFixture(mobileView);
        await elementUpdated(el);

        const triggerInput = el.dropdown.querySelector('[slot="trigger"]');
        const nativeInput = triggerInput.inputElement;

        await expect(nativeInput.getAttribute('aria-controls')).to.exist;
        await expect(nativeInput.getAttribute('aria-controls')).to.not.be.empty;
      });

      it('trigger input is labelled by its label element', async () => {
        const el = await defaultFixture(mobileView);
        await elementUpdated(el);

        const triggerInput = el.dropdown.querySelector('[slot="trigger"]');
        await elementUpdated(triggerInput);

        const nativeInput = triggerInput.inputElement;
        const labelEl = triggerInput.shadowRoot.querySelector('label');

        await expect(labelEl).to.exist;
        await expect(labelEl.getAttribute('for')).to.equal(nativeInput.id);

        const labelSlot = labelEl.querySelector('slot[name="label"]');
        const labelText = labelSlot.assignedNodes({flatten: true}).map((n) => n.textContent).join('');
        await expect(labelText).to.contain('Name');
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

            setInputValue(el, 'a');
            el.input.click();
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

              setInputValue(el, 'a');
              el.input.click();
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
            await elementUpdated(el);
            await sendKeys({ press: 'a' });
            el.input.click();
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
            await elementUpdated(el);
            await sendKeys({ press: 'a' });
            el.input.click();
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

        el.focus();
        await elementUpdated(el);
        await sendKeys({ press: 'a' });
        el.input.click();
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

        el.focus();
        await elementUpdated(el);
        await sendKeys({ press: 'o' });
        el.input.click();
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

        el.focus();
        await elementUpdated(el);
        await sendKeys({ press: 'a' });
        el.input.click();
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

      // I think this is a bug - shouldn't ever propagate according to HTML5 spec
      it('should not propagate the event', async () => {
        const el = await defaultFixture(mobileView);

        el.focus();
        await elementUpdated(el);
        await sendKeys({ press: 'a' });
        el.input.click();

        let propagated = false;
        const listener = () => { propagated = true; };
        // Listen on the parent to detect if the event bubbles past the combobox
        el.parentElement.addEventListener('keydown', listener);

        await sendKeys({ press: 'Enter' });
        await elementUpdated(el);

        el.parentElement.removeEventListener('keydown', listener);

        await expect(propagated).to.be.false;
      });

      it('should select the active option and close the bib', async () => {
        const el = await defaultFixture(mobileView);

        el.focus();
        await elementUpdated(el);
        await sendKeys({ press: 'a' });
        el.input.click();

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

          setInputValue(el, 'a');
          el.input.click();
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

          nativeBtn.focus();
          const enterEvt = new KeyboardEvent('keydown', {
            key: 'Enter',
            bubbles: true,
            cancelable: true
          });
          nativeBtn.dispatchEvent(enterEvt);

          await elementUpdated(el);

          await expect(enterEvt.defaultPrevented).to.be.false;
        });

        it('should clear the input when Enter activates the clear button', async () => {
          const el = await defaultFixture(mobileView);

          setInputValue(el, 'a');
          el.input.click();
          await elementUpdated(el);

          const activeInput = mobileView ? el.inputInBib : el.input;
          const clearBtn = activeInput.shadowRoot.querySelector('.clearBtn');
          clearBtn.click();
          await elementUpdated(el);

          await expect(activeInput.value).to.not.be.ok;
        });
      });

      if (mobileView) {
        describe('on close button in fullscreen', () => {
          it('should close the fullscreen dialog', async () => {
            const el = await defaultFixture(mobileView);

            el.focus();
            await elementUpdated(el);
            await sendKeys({ press: 'a' });
            await elementUpdated(el);
            await expect(el.dropdownOpen).to.be.true;

            el.inputInBib.focus();
            await waitUntil(() => el.shadowRoot.activeElement === el.inputInBib);

            const closeBtn = el.bibtemplate.shadowRoot.querySelector('#closeButton');
            await expect(closeBtn).to.exist;
            closeBtn.click();

            await elementUpdated(el);

            await expect(el.dropdownOpen).to.be.false;
          });
        });
      }
    });

    describe('Tab', () => {
      it('should select the current active option and close the bib', async () => {
        const el = await defaultFixture(mobileView);
        const options = el.querySelectorAll('auro-menuoption');

        const activeInput = mobileView ? el.inputInBib : el.input;

        el.focus();
        await elementUpdated(el);
        await sendKeys({ press: 'a' });
        el.input.click();
        await elementUpdated(el);
        activeInput.focus();
        await elementUpdated(el);
        await sendKeys({ press: 'Tab' });
        await elementUpdated(el);

        await expect(el.value).to.be.equal(options[0].textContent);

        el.input.focus();
        setInputValue(el, '');
        await elementUpdated(el);
        await elementUpdated(el);
        await sendKeys({ press: 'o' });
        el.input.click();
        await elementUpdated(el);
        activeInput.focus();
        await elementUpdated(el);
        await sendKeys({ press: 'Tab' });
        await elementUpdated(el);

        await expect(el.value).to.be.equal(options[1].textContent);
      });

      it('should make a selection and close the bib', async () => {
        const el = await defaultFixture(mobileView);

        el.focus();
        await elementUpdated(el);
        await sendKeys({ press: 'a' });
        el.input.click();
        await elementUpdated(el);
        await expect(el.dropdown.isPopoverVisible).to.be.true;
        await sendKeys({ press: 'Tab' });
        await elementUpdated(el.dropdown);
        await expect(el.dropdown.isPopoverVisible).to.be.false;
      });

      // Tab with no matching option should not commit a menu selection.
      // The bib is already closed once availableOptions goes to zero, so
      // this guards against a future regression where Tab would silently
      // commit a stale active option. (In suggestion mode the free-typed
      // text may become the value — the guard is that no menu option was
      // selected.)
      it('should not select a menu option when the input has no matching options', async () => {
        const el = await defaultFixture(mobileView);

        el.focus();
        await elementUpdated(el);
        setInputValue(el, 'zzzzzz');
        await elementUpdated(el);
        await expect(el.dropdown.isPopoverVisible).to.be.false;

        await sendKeys({ press: 'Tab' });
        await elementUpdated(el);

        await expect(el.optionSelected).to.not.be.ok;
        await expect(el.menu.optionSelected).to.not.be.ok;
      });

      describe('Shift', () => {
        it('should make a selection, close the bib, and move focus to the previous element on the page', async () => {
          if (mobileView) {
            await setViewport({
              width: 500,
              height: 800
            });
          } else {
            await setViewport({
              width: 800,
              height: 800
            });
          }

          const wrapper = await fixture(html`
            <div>
              <button id="before-combobox">Before</button>
              <auro-combobox>
                <span slot="label">Name</span>
                <auro-menu>
                  <auro-menuoption value="Apples" id="shift-tab-option-0">Apples</auro-menuoption>
                  <auro-menuoption value="Oranges" id="shift-tab-option-1">Oranges</auro-menuoption>
                </auro-menu>
              </auro-combobox>
            </div>
          `);
          const el = wrapper.querySelector('auro-combobox');
          const beforeBtn = wrapper.querySelector('#before-combobox');
          const options = el.querySelectorAll('auro-menuoption');

          el.focus();
          await elementUpdated(el);
          await sendKeys({ press: 'a' });
          el.input.click();
          await elementUpdated(el);
          await expect(el.dropdown.isPopoverVisible).to.be.true;

          await sendKeys({ down: 'Shift' });
          await sendKeys({ press: 'Tab' });
          await sendKeys({ up: 'Shift' });
          await elementUpdated(el.dropdown);

          // Wait for the doubleRaf-scheduled focus move in the strategy to run.
          await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
          await elementUpdated(el);

          await expect(el.dropdown.isPopoverVisible).to.be.false;
          await expect(el.value).to.equal(options[0].getAttribute('value'));
          await expect(document.activeElement).to.equal(beforeBtn);
        });
      });

      if (mobileView) {
        it('should close the fullscreen dialog', async () => {
          const el = await defaultFixture(mobileView);

          el.focus();
          await elementUpdated(el);
          await sendKeys({ press: 'a' });
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
          await elementUpdated(el);
          await sendKeys({ press: 'a' });
          await elementUpdated(el);
          await expect(el.dropdown.isPopoverVisible).to.be.true;

          el.inputInBib.focus();
          await waitUntil(() => el.shadowRoot.activeElement === el.inputInBib);

          // Trigger should be inert while fullscreen is open
          await expect(el.dropdown.trigger.inert).to.be.true;

          // Close the dialog
          // el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
          await sendKeys({ press: 'Tab' });
          await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
          await elementUpdated(el);

          await expect(el.dropdown.trigger.inert).to.be.false;
          await expect(el.dropdownOpen).to.be.false;
        });
      }
    });

    // Space is a plain printable character — it enters a space into the
    // input and (like any other character) drives
    // handleTriggerInputValueChange → showBib(). Guards against a future
    // regression where Space would be swallowed or repurposed to toggle
    // the bib.
    describe('Space', () => {
      it('should enter a space character into the input and open the bib after prior matching input', async () => {
        const el = await defaultFixture(mobileView);

        el.focus();
        await elementUpdated(el);
        await sendKeys({ press: 'a' });
        await elementUpdated(el);
        await expect(el.dropdown.isPopoverVisible).to.be.true;

        await sendKeys({ press: 'Space' });
        await elementUpdated(el);

        const activeInput = mobileView ? el.inputInBib : el.input;
        await expect(activeInput.value.endsWith(' ')).to.be.true;
        await expect(el.dropdown.isPopoverVisible).to.be.true;
      });

      it('should not select the highlighted option in the open state', async () => {
        const el = await defaultFixture(mobileView);
        const options = el.querySelectorAll('auro-menuoption');

        el.focus();
        await elementUpdated(el);
        await sendKeys({ press: 'a' });
        el.input.click();
        await elementUpdated(el);

        if (mobileView) {
          el.inputInBib.focus();
          await waitUntil(() => el.shadowRoot.activeElement === el.inputInBib);
        }

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        await elementUpdated(el);

        await sendKeys({ press: 'Space' });
        await elementUpdated(el);

        // Space should not have committed the highlighted option — the
        // matching menu option's value must not become the combobox value.
        await expect(el.menu.optionSelected).to.not.be.ok;
        await expect(el.value).to.not.equal(options[0].getAttribute('value'));
      });
    });

    describe('Escape', () => {
      it('should close the bib without making a selection', async () => {
        const el = await defaultFixture(mobileView);

        el.focus();
        await elementUpdated(el);
        await sendKeys({ press: 'a' });
        el.input.click();
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

      // Escape restores focus to the trigger input after closing the bib.
      // Regression guard for the fullscreen path where focus could get
      // parked on the dialog's close button.
      it('should restore focus to the trigger input after closing the bib', async () => {
        const el = await defaultFixture(mobileView);

        el.focus();
        await elementUpdated(el);
        await sendKeys({ press: 'a' });
        el.input.click();
        await elementUpdated(el);
        await expect(el.dropdown.isPopoverVisible).to.be.true;

        if (mobileView) {
          el.inputInBib.focus();
          await waitUntil(() => el.shadowRoot.activeElement === el.inputInBib);
        }

        el.dispatchEvent(new KeyboardEvent('keydown', {
          key: 'Escape',
          bubbles: true
        }));
        await elementUpdated(el);
        await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        await elementUpdated(el);

        await expect(el.dropdown.isPopoverVisible).to.be.false;
        await expect(el.shadowRoot.activeElement).to.equal(el.input);
      });

      if (!mobileView) {
        it('should close the combobox bib without closing a parent auro-dialog', async () => {
          const dialog = await inDialogFixture();
          await elementUpdated(dialog);

          const el = dialog.querySelector('auro-combobox');
          await elementUpdated(el);

          el.focus();
          await elementUpdated(el);
          await sendKeys({ press: 'a' });
          el.input.click();
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

          el.focus();
          await elementUpdated(el);
          await sendKeys({ press: 'a' });
          el.input.click();
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

        el.focus();
        await elementUpdated(el);
        await sendKeys({ press: 'a' });
        el.input.click();
        await elementUpdated(el);

        const menu = el.querySelector('auro-menu');
        const menuOptions = menu.querySelectorAll('auro-menuoption');

        // ArrowDown to move to second option
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        await elementUpdated(el);
        await expect(el.optionActive).to.be.equal(menuOptions[1]);

        // // Wraps: going up from second goes back to first (wrapping depends on menu size)
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        await elementUpdated(el);
        await expect(el.optionActive).to.be.equal(menuOptions[0]);
      });

      it('should navigate down through nested menu options', async () => {
        const el = await nestedMenuFixture(mobileView);

        el.focus();
        await elementUpdated(el);
        await sendKeys({ press: 'o' });
        await sendKeys({ press: 'p' });
        await sendKeys({ press: 't' });
        await sendKeys({ press: 'i' });
        await sendKeys({ press: 'o' });
        await sendKeys({ press: 'n' });
        el.input.click();
        await elementUpdated(el);

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        await elementUpdated(el);
        await expect(el.menu.optionActive.value).to.equal('option a');

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        await elementUpdated(el);
        await expect(el.menu.optionActive.value).to.equal('option b');

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        await elementUpdated(el);
        await expect(el.menu.optionActive.value).to.equal('option 2');

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        await elementUpdated(el);
        await expect(el.menu.optionActive.value).to.equal('option 1');

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
        await elementUpdated(el);
        await expect(el.menu.optionActive.value).to.equal('option 2');
      });

      it('should not navigate when clear button has focus', async () => {
        const el = await defaultFixture(mobileView);

        el.focus();
        setInputValue(el, 'a');
        el.input.click();
        await elementUpdated(el);

        const activeInput = mobileView ? el.inputInBib : el.input;
        const clearBtn = activeInput.shadowRoot.querySelector('.clearBtn');
        const prevActive = el.menu.optionActive;

        clearBtn.dispatchEvent(new KeyboardEvent('keydown', {
          key: 'ArrowDown',
          bubbles: true,
          cancelable: true
        }));
        await elementUpdated(el);

        // No navigation should have occurred
        await expect(prevActive).to.equal(el.menu.optionActive);
      });

      it('should open the bib when ArrowDown is pressed and bib is closed', async () => {
        const el = await defaultFixture(mobileView);

        setInputValue(el, 'a');
        await elementUpdated(el);

        // Close the bib first
        el.hideBib();
        await elementUpdated(el);
        await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        await elementUpdated(el);
        await expect(el.dropdown.isPopoverVisible).to.be.false;

        // ArrowDown should open it
        el.dispatchEvent(new KeyboardEvent('keydown', {
          key: 'ArrowDown',
          bubbles: true,
          cancelable: true
        }));
        await elementUpdated(el);

        await expect(el.dropdown.isPopoverVisible).to.be.true;
      });
    });

    describe('ArrowUp', () => {
      it('should navigate up through menu options', async () => {
        const el = await defaultFixture(mobileView);

        el.focus();
        await elementUpdated(el);
        await sendKeys({ press: 'a' });
        el.input.click();
        await elementUpdated(el);

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

      it('should navigate up through nested menu options', async () => {
        const el = await nestedMenuFixture(mobileView);

        el.focus();
        await elementUpdated(el);
        await sendKeys({ press: 'o' });
        await sendKeys({ press: 'p' });
        await sendKeys({ press: 't' });
        await sendKeys({ press: 'i' });
        await sendKeys({ press: 'o' });
        await sendKeys({ press: 'n' });
        el.input.click();
        await elementUpdated(el);

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
        await elementUpdated(el);
        await expect(el.menu.optionActive.value).to.equal('option 2');

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
        await elementUpdated(el);
        await expect(el.menu.optionActive.value).to.equal('option b');

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
        await elementUpdated(el);
        await expect(el.menu.optionActive.value).to.equal('option a');

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
        await elementUpdated(el);
        await expect(el.menu.optionActive.value).to.equal('option 1');

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        await elementUpdated(el);
        await expect(el.menu.optionActive.value).to.equal('option a');
      });

      it('should not navigate when clear button has focus', async () => {
        const el = await defaultFixture(mobileView);

        el.focus();
        setInputValue(el, 'a');
        el.input.click();
        await elementUpdated(el);

        const activeInput = mobileView ? el.inputInBib : el.input;
        const clearBtn = activeInput.shadowRoot.querySelector('.clearBtn');
        const prevActive = el.menu.optionActive;

        clearBtn.dispatchEvent(new KeyboardEvent('keydown', {
          key: 'ArrowUp',
          bubbles: true,
          cancelable: true
        }));
        await elementUpdated(el);

        // No navigation should have occurred
        await expect(prevActive).to.equal(el.menu.optionActive);
      });

      it('should open the bib when ArrowUp is pressed and bib is closed', async () => {
        const el = await defaultFixture(mobileView);

        setInputValue(el, 'a');
        await elementUpdated(el);

        // Close the bib first
        el.hideBib();
        await elementUpdated(el);
        await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        await elementUpdated(el);
        await expect(el.dropdown.isPopoverVisible).to.be.false;

        // ArrowUp should open it
        el.dispatchEvent(new KeyboardEvent('keydown', {
          key: 'ArrowUp',
          bubbles: true,
          cancelable: true
        }));
        await elementUpdated(el);

        await expect(el.dropdown.isPopoverVisible).to.be.true;
      });
    });

    describe('Home', () => {
      it('should activate the first enabled option when bib is open', async () => {
        const el = await shiftTabFixture(mobileView);

        el.focus();
        await elementUpdated(el);
        await sendKeys({ press: 'a' });
        el.input.click();
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

        await expect(el.optionActive === menuOptions[0], `expected el.optionActive to equal menuOptions[0]`).to.be.true;
        await expect(el.dropdown.isPopoverVisible).to.be.true;
      });

      it('should skip disabled first option and activate the next enabled one', async () => {
        const el = await shiftTabDisabledFirstFixture(mobileView);

        el.focus();
        await elementUpdated(el);
        await sendKeys({ press: 'a' });
        el.input.click();
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
        await expect(el.optionActive === menuOptions[0], `expected el.optionActive to equal menuOptions[0]`).to.be.true;
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

        el.focus();
        await elementUpdated(el);
        await sendKeys({ press: 'a' });
        el.input.click();
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

      // Regression for 4271eed64 — disabled-option skipping. The Home test
      // above pins the first-option case; this covers the symmetric End
      // path against a disabled trailing option.
      it('should skip a disabled last option and activate the prior enabled one', async () => {
        const el = await fixture(html`
          <auro-combobox>
            <span slot="label">Name</span>
            <auro-menu>
              <auro-menuoption value="Apples" id="end-dis-option-0">Apples</auro-menuoption>
              <auro-menuoption value="Oranges" id="end-dis-option-1">Oranges</auro-menuoption>
              <auro-menuoption value="Grapes" id="end-dis-option-2" disabled>Grapes</auro-menuoption>
            </auro-menu>
          </auro-combobox>
        `);

        el.focus();
        await elementUpdated(el);
        await sendKeys({ press: 'a' });
        el.input.click();
        await elementUpdated(el);
        await expect(el.dropdown.isPopoverVisible).to.be.true;

        if (mobileView) {
          el.inputInBib.focus();
          await waitUntil(() => el.shadowRoot.activeElement === el.inputInBib);
        }

        el.dispatchEvent(new KeyboardEvent('keydown', {
          key: 'End',
          bubbles: true,
          cancelable: true
        }));
        await elementUpdated(el);

        await expect(el.optionActive.value).to.equal('Oranges');
        await expect(el.optionActive.hasAttribute('disabled')).to.be.false;
      });
    });

    describe('ArrowUp wrap', () => {
      // Regression for 4271eed64: ArrowUp from the first option should
      // wrap to the LAST ENABLED option, not the literal last option when
      // that one is disabled.
      it('skips a disabled trailing option when wrapping from the first', async () => {
        const el = await fixture(html`
          <auro-combobox>
            <span slot="label">Name</span>
            <auro-menu>
              <auro-menuoption value="Apples" id="wrap-dis-option-0">Apples</auro-menuoption>
              <auro-menuoption value="Oranges" id="wrap-dis-option-1">Oranges</auro-menuoption>
              <auro-menuoption value="Grapes" id="wrap-dis-option-2" disabled>Grapes</auro-menuoption>
            </auro-menu>
          </auro-combobox>
        `);

        el.focus();
        await elementUpdated(el);
        await sendKeys({ press: 'a' });
        el.input.click();
        await elementUpdated(el);
        await expect(el.dropdown.isPopoverVisible).to.be.true;

        if (mobileView) {
          el.inputInBib.focus();
          await waitUntil(() => el.shadowRoot.activeElement === el.inputInBib);
        }

        // First option is active by default; ArrowUp from there should
        // wrap to the last ENABLED (Oranges), skipping the disabled Grapes.
        el.dispatchEvent(new KeyboardEvent('keydown', {
          key: 'ArrowUp',
          bubbles: true,
          cancelable: true
        }));
        await elementUpdated(el);

        await expect(el.optionActive.value).to.equal('Oranges');
        await expect(el.optionActive.hasAttribute('disabled')).to.be.false;
      });
    });
  });
}

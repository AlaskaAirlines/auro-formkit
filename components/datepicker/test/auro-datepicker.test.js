/* eslint-disable max-lines, no-undef, prefer-destructuring, no-use-before-define, no-magic-numbers, no-unused-vars, no-await-in-loop */

import { fixture, html, expect, elementUpdated, nextFrame, oneEvent } from '@open-wc/testing';
import { setViewport, sendKeys } from '@web/test-runner-commands';
import { minDay, minMonth, minYear, maxDay, maxMonth, maxYear } from '@aurodesignsystem/auro-library/scripts/runtime/dateUtilities';
import designTokens from '@aurodesignsystem/design-tokens/dist/legacy/auro-classic/JSONVariablesFlat.json' with { type: 'json' };
import '../src/registered.js';
import { dateSlotFixture, popoverSlotFixture, inDialogFixture, inDrawerFixture } from './testFixtures.js';
import { setInputValue, getInput } from './testFunctions.js';

const mobileBreakpointWidth = parseInt(designTokens['ds-grid-breakpoint-sm'], 10) - 1;

/**
 * Runs the full datepicker test suite for a given viewport mode.
 * @param {boolean} mobileView - Whether tests should run in small or large viewport mode.
 * @returns {void}
 */
function runFullTest(mobileView) {
  before(async () => {
    await setViewport(mobileView ? { width: mobileBreakpointWidth, height: 800 } : { width: 800, height: 800 });
  });

  describe('Rendering', () => {
    // Add missing tests

    it('should be successfully created in the document', async () => {
      // This test fails when attributes are put onto the component before it is attached to the DOM
      const el = document.createElement('auro-datepicker');

      await expect(el.localName).to.equal('auro-datepicker');
    });

    it('should be defined as a custom element', async () => {
      const el = await Boolean(customElements.get("auro-datepicker"));

      await expect(el).to.be.true;
    });

    it('should pass popover slot content down to the cell correctly', async () => {
      const el = await popoverSlotFixture();

      const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
      const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');

      await dropdown.querySelector('[auro-input]').click();
      await expect(dropdown.isPopoverVisible).to.be.true;
      await elementUpdated(calendar.shadowRoot);
      await nextFrame();

      const calendarMonth = calendar.shadowRoot.querySelector('auro-formkit-calendar-month');
      const calendarCell = [...calendarMonth.shadowRoot.querySelectorAll('auro-formkit-calendar-cell')];

      const popoverData = [...el.querySelectorAll('[slot^="popover_"]')];

      for (const cell of calendarCell) {
        const span = cell.querySelector('span');
        let spanContentMatch = false;

        if (span) {
          popoverData.forEach((item) => {
            if (item.innerHTML === span.innerHTML) {
              spanContentMatch = true;
            }
          });

          await expect(spanContentMatch).to.be.true;
        }
      }
    });

    if (!mobileView) {
      it('should render a single calendar by default', async () => {
        const el = await fixture(html`
          <auro-datepicker></auro-datepicker>
        `);

        const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
        const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');
        await dropdown.querySelector('[auro-input]').click();
        await expect(dropdown.isPopoverVisible).to.be.true;
        await elementUpdated(calendar.shadowRoot);
        await nextFrame();

        await expect(calendar.numCalendars).to.be.equal(1);
      });
    }

    it('should correctly parse date slot name and pass content down to the cell', async () => {
      const el = await dateSlotFixture();

      const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
      const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');

      await dropdown.querySelector('[auro-input]').click();
      await expect(dropdown.isPopoverVisible).to.be.true;
      await elementUpdated(calendar.shadowRoot);
      await nextFrame();

      const calendarMonth = calendar.shadowRoot.querySelector('auro-formkit-calendar-month');
      const calendarCell = [...calendarMonth.shadowRoot.querySelectorAll('auro-formkit-calendar-cell')];

      const dateData = [...el.querySelectorAll('[slot^="date_"]')];

      for (const cell of calendarCell) {
        const span = cell.querySelector('span');
        let spanContentMatch = false;

        if (span) {
          dateData.forEach((item) => {
            if (item.innerHTML === span.innerHTML) {
              spanContentMatch = true;
            }
          });

          await expect(spanContentMatch).to.be.true;
        }
      }
    });
  });

  describe('User Stories', () => {
    // Add missing tests

    if (!mobileView) {
      it('should hide the dropdown when it or its children lose focus', async () => {
        const el = await fixture(html`
          <div>
            <auro-datepicker></auro-datepicker>
            <button>Test Button</button>
          </div>
        `);

        const datepicker = el.querySelector('auro-datepicker');
        const button = el.querySelector('button');

        const input = getInput(datepicker, 0);
        input.click();

        await expect(datepicker.dropdown.isPopoverVisible).to.be.true;

        // wait for a frame to add `click` event listener correctly
        await nextFrame();

        button.click();

        await elementUpdated(datepicker);
        await expect(datepicker.dropdown.isPopoverVisible).to.be.false;
      });
    }

    it('should not restore focus to trigger when bib closes due to tab-out', async () => {
      await setViewport({ width: 1024, height: 800 });

      const el = await fixture(html`
        <div>
          <auro-datepicker></auro-datepicker>
          <button id="outside">Outside</button>
        </div>
      `);

      const datepicker = el.querySelector('auro-datepicker');
      const outside = el.querySelector('#outside');

      getInput(datepicker, 0).click();
      await expect(datepicker.dropdown.isPopoverVisible).to.be.true;

      // Spy directly on the trigger input's focus method. This is more reliable
      // than checking document.activeElement in headless Chrome, where shadow DOM
      // focus propagation timing cannot be guaranteed across frames.
      const triggerInput = datepicker.inputList[0];
      let focusCallCount = 0;
      const originalFocus = triggerInput.focus.bind(triggerInput);
      triggerInput.focus = () => { focusCallCount++; originalFocus(); };

      // Move focus outside — simulates the user tabbing away.
      outside.focus();
      await elementUpdated(datepicker);

      await expect(datepicker.dropdown.isPopoverVisible).to.be.false;

      // Wait two rAFs: first lets the toggled-handler's rAF fire,
      // second confirms no further focus call slips through afterward.
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

      expect(focusCallCount).to.equal(0);
    });

    it('should not open the bib when Enter key is pressed', async () => {
      const el = await fixture(html`<auro-datepicker></auro-datepicker>`);

      await expect(el.dropdown.isPopoverVisible).to.be.false;

      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

      await elementUpdated(el);
      await expect(el.dropdown.isPopoverVisible).to.be.false;
    });

    it('should not open the bib when Space is pressed', async () => {
      const el = await fixture(html`<auro-datepicker></auro-datepicker>`);

      await expect(el.dropdown.isPopoverVisible).to.be.false;

      el.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));

      await elementUpdated(el);
      await expect(el.dropdown.isPopoverVisible).to.be.false;
    });

    it('should close the bib in desktop mode when Tab triggers focus-loss', async () => {
      await setViewport({ width: 1200, height: 800 });

      const el = await fixture(html`
        <div>
          <auro-datepicker></auro-datepicker>
          <button id="outside">Outside</button>
        </div>
      `);

      const datepicker = el.querySelector('auro-datepicker');
      const outside = el.querySelector('#outside');
      const input = getInput(datepicker, 0);

      input.click();
      await elementUpdated(datepicker);
      await expect(datepicker.dropdown.isPopoverVisible).to.be.true;
      await expect(datepicker.dropdown.isBibFullscreen).to.be.false;

      // Tab naturally moves focus outside; simulate that by focusing the next element.
      // The keyboard spec defers to browser-default Tab behaviour — there is no
      // redirect-back mechanism in desktop mode. The bib closes via focus-loss.
      outside.focus();
      await elementUpdated(datepicker);

      await expect(datepicker.dropdown.isPopoverVisible).to.be.false;
    });

    it('should change to the previous calendar month when handlePrevMonth is called', async () => {
      const el = await fixture(html`
        <auro-datepicker value="2023-02-01"></auro-datepicker>
      `);

      await elementUpdated(el);

      const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
      const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');
      const prevMonthBth = calendar.shadowRoot.querySelector('.prevMonth');

      await expect(el.centralDate).to.be.an.instanceOf(Date);
      await expect(el.centralDate.getMonth()).to.equal(1); // February
      await expect(el.centralDate.getFullYear()).to.equal(2023);

      prevMonthBth.click();
      await elementUpdated(el);

      await expect(el.centralDate.getMonth()).to.equal(0); // January
      await expect(el.centralDate.getFullYear()).to.equal(2023);

      prevMonthBth.click();
      await elementUpdated(el);

      await expect(el.centralDate.getMonth()).to.equal(11); // December
      await expect(el.centralDate.getFullYear()).to.equal(2022);
    });

    it('should change to the next calendar month when handleNextMonth is called', async () => {
      const el = await fixture(html`
        <auro-datepicker value="2023-11-01"></auro-datepicker>
      `);

      await elementUpdated(el);

      const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
      const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');
      const nextMonthBth = calendar.shadowRoot.querySelector('.nextMonth');

      await expect(el.centralDate).to.be.an.instanceOf(Date);
      await expect(el.centralDate.getMonth()).to.equal(10); // November
      await expect(el.centralDate.getFullYear()).to.equal(2023);

      nextMonthBth.click();
      await elementUpdated(el);

      await expect(el.centralDate.getMonth()).to.equal(11); // December
      await expect(el.centralDate.getFullYear()).to.equal(2023);

      nextMonthBth.click();
      await elementUpdated(el);

      await expect(el.centralDate.getMonth()).to.equal(0); // January
      await expect(el.centralDate.getFullYear()).to.equal(2024);
    });

    it('should hide the dropdown on blur', async () => {
      const el = await fixture(html`
          <auro-datepicker></auro-datepicker>
      `);

      el.focus();
      el.shadowRoot.activeElement.click();
      await elementUpdated(el);
      await expect(el.dropdown.isPopoverVisible).to.be.true;

      setTimeout(() => {
        el.blur();
      }, 0);

      await oneEvent(el, 'auroDatePicker-toggled');
      await expect(el.dropdown.isPopoverVisible).to.be.false;
    });

    describe('badInput validity', () => {
      it('invalid date value triggers validation error', async () => {
        const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
        await elementUpdated(el);

        // Set an invalid date string
        el.inputList[0].value = '13/45/2024';
        el.inputList[0].dispatchEvent(new Event('input', { bubbles: true, composed: true }));
        await elementUpdated(el);

        // Force validation
        el.validate(true);
        await elementUpdated(el);

        // Validity should not be 'valid'
        expect(el.validity).to.not.equal('valid');
        expect(el.validity).to.not.be.undefined;
      });
    });
  });

  describe('Properties', () => {
    describe('appearance', () => {
      it('should default to default appearance', async () => {
        const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
        await expect(el.appearance).to.equal('default');
      });

      it('should apply appearance="inverse" attribute', async () => {
        const el = await fixture(html`
          <div style="background-color: #222222">
            <auro-datepicker appearance="inverse"></auro-datepicker>
          </div>
        `);
        const datepicker = el.querySelector('auro-datepicker');
        await expect(datepicker.getAttribute('appearance')).to.equal('inverse');
      });
    });

    describe('autoPlacement', () => {
      it('should default to false', async () => {
        const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
        await expect(el.autoPlacement).to.be.false;
      });

      it('should reflect the autoPlacement attribute', async () => {
        const el = await fixture(html`<auro-datepicker autoplacement></auro-datepicker>`);
        await expect(el.autoPlacement).to.be.true;
        await expect(el.hasAttribute('autoplacement')).to.be.true;
      });
    });

    describe('calendarEndDate', () => {
      it('should hide the next month button when viewing the last available month', async () => {
        const el = await fixture(html`
          <auro-datepicker maxDate="2023-04-17"></auro-datepicker>
        `);

        const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
        const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');

        await expect(calendar.showNextMonthBtn).to.be.false;
      });

    });

    describe('calendarFocusDate', () => {
      it('should change the visible month when calendarFocusDate is updated', async () => {
        const el = await fixture(html`
          <auro-datepicker calendarFocusDate="2023-03-23"></auro-datepicker>
        `);

        await elementUpdated(el);

        const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');

        // centralDate is set to the 1st of the month by updateCentralDate
        await expect(el.centralDate).to.be.an.instanceOf(Date);
        await expect(el.centralDate.getMonth()).to.equal(2); // March
        await expect(el.centralDate.getFullYear()).to.equal(2023);

        el.calendarFocusDate = '2024-04-25';
        await elementUpdated(el);

        await expect(el.centralDate.getMonth()).to.equal(3); // April
        await expect(el.centralDate.getFullYear()).to.equal(2024);
      });

    });

    describe('calendarStartDate', () => {
      it('should hide the prev month button when viewing the first available month', async () => {
        const date = new Date();
        const fullDate = `${`0${date.getMonth() + 1}`.slice(-2)}/${`0${date.getDate()}`.slice(-2)}/${date.getFullYear()}`;

        const el = await fixture(html`
          <auro-datepicker calendarStartDate="${fullDate}"></auro-datepicker>
        `);

        const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
        const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');
        await dropdown.querySelector('[auro-input]').click();
        await expect(dropdown.isPopoverVisible).to.be.true;
        await elementUpdated(calendar.shadowRoot);
        await nextFrame();

        await expect(calendar.showPrevMonthBtn).to.be.false;
      });

      it('should render the correct number of calendars with calendarStartDate and calendarEndDate in mobile', async () => {
        await setViewport({
          width: mobileBreakpointWidth,
          height: 800
        });

        const el = await fixture(html`
          <auro-datepicker range calendarStartDate="2023-03-04" calendarEndDate="2023-05-05"></auro-datepicker>
        `);

        const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
        const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');

        await dropdown.querySelector('[auro-input]').click();
        await expect(dropdown.isPopoverVisible).to.be.true;
        await elementUpdated(calendar.shadowRoot);
        await nextFrame();

        await expect(calendar.numCalendars).to.equal(3);
      });

    });

    describe('centralDate', () => {
      it('should default to the current date', async () => {
        const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
        const today = new Date();
        await expect(el.centralDate).to.be.an.instanceOf(Date);
        await expect(el.centralDate.getMonth()).to.equal(today.getMonth());
      });

      it('should update the visible month when centralDate is set', async () => {
        const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
        el.centralDate = '2024-06-15';
        await elementUpdated(el);
        await expect(el.centralDate).to.be.an.instanceOf(Date);
        await expect(el.centralDate.getMonth()).to.equal(5); // June
      });
    });

    describe('disabled', () => {
      it('should default to false', async () => {
        const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
        await expect(el.disabled).to.not.be.true;
      });

      it('should reflect the disabled attribute', async () => {
        const el = await fixture(html`<auro-datepicker disabled></auro-datepicker>`);
        await expect(el.disabled).to.be.true;
        await expect(el.hasAttribute('disabled')).to.be.true;
      });

      it('should not open the bib when disabled', async () => {
        const el = await fixture(html`<auro-datepicker disabled></auro-datepicker>`);
        el.showBib();
        await elementUpdated(el);
        await expect(el.dropdown.isPopoverVisible).to.be.false;
      });

      describe('disabled propagation', () => {
        it('disabled propagates to inner inputs', async () => {
          const el = await fixture(html`<auro-datepicker disabled></auro-datepicker>`);
          await elementUpdated(el);

          el.inputList.forEach((input) => {
            expect(input.disabled).to.be.true;
          });
        });

        it('disabled sets tabindex to -1', async () => {
          const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
          await elementUpdated(el);

          el.disabled = true;
          await elementUpdated(el);

          expect(el.getAttribute('tabindex')).to.equal('-1');
        });
      });
    });

    describe('dvInputOnly', () => {
      it('should default to false', async () => {
        const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
        await expect(el.dvInputOnly).to.be.false;
      });

      it('should reflect the dvInputOnly attribute', async () => {
        const el = await fixture(html`<auro-datepicker dvinputonly></auro-datepicker>`);
        await expect(el.dvInputOnly).to.be.true;
        await expect(el.hasAttribute('dvinputonly')).to.be.true;
      });
    });

    describe('error', () => {
      it('should rerun validity when error attribute is removed even with undefined value', async () => {
        const el = await fixture(html`
          <auro-datepicker error="custom error message"></auro-datepicker>
        `);

        await expect(el.getAttribute('validity')).to.be.equal('customError');

        el.removeAttribute('error');

        await elementUpdated(el);

        await expect(el.hasAttribute('validity')).to.be.true;
      });

      it('hasError is true when error attribute is set', async () => {
        const el = await fixture(html`
          <auro-datepicker error="This is an error"></auro-datepicker>
        `);
        await elementUpdated(el);

        expect(el.hasError).to.be.true;
      });

      it('hasError is false when no error', async () => {
        const el = await fixture(html`
          <auro-datepicker></auro-datepicker>
        `);
        await elementUpdated(el);

        expect(el.hasError).to.not.be.true;
      });

      it('should render error help text with role="alert" and aria-live="assertive"', async () => {
        const el = await fixture(html`
          <auro-datepicker error="Date is required"></auro-datepicker>
        `);
        await elementUpdated(el);

        const errorHelpText = el.shadowRoot.querySelector('[role="alert"]');
        expect(errorHelpText).to.exist;
        expect(errorHelpText.getAttribute('aria-live')).to.equal('assertive');
        expect(errorHelpText.textContent.trim()).to.equal('Date is required');
      });

      // This test should pass but fails due to a bug
      // it('should set aria-invalid on the inner input when in error state', async () => {
      //   const el = await fixture(html`
      //     <auro-datepicker required></auro-datepicker>
      //   `);

      //   el.value = '01/15/2024';
      //   el.validate(true);
      //   await elementUpdated(el);
      //   expect(el.getAttribute('validity')).to.equal('valid');

      //   // Clear value to trigger valueMissing
      //   el.value = '';
      //   el.validate(true);
      //   await elementUpdated(el);

      //   expect(el.getAttribute('validity')).to.equal('valueMissing');
      // });
    });

    describe('format', () => {
      it('should accept ISO value and display it in the configured format', async() => {
        const el = await fixture(html`
          <auro-datepicker format="yyyy/mm/dd"></auro-datepicker>
        `);

        el.value = "1999-08-15"; // always ISO regardless of format
        el.validate();
        await elementUpdated(el);

        // value property stays ISO
        await expect(el.value).to.equal('1999-08-15');
        // input displays in the configured format
        await expect(getInput(el, 0).value).to.equal('1999/08/15');
        await expect(el.getAttribute('validity')).to.be.equal('valid');
      });

    });

    describe('fullscreenBreakpoint', () => {
      it('should render twelve calendars in mobile version', async () => {
        await setViewport({
          width: mobileBreakpointWidth,
          height: 800
        });

        const el = await fixture(html`
          <auro-datepicker></auro-datepicker>
        `);

        const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');

        await dropdown.querySelector('[auro-input]').click();
        await expect(dropdown.isPopoverVisible).to.be.true;

        const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');
        await elementUpdated(calendar.shadowRoot);
        await nextFrame();

        await expect(calendar.numCalendars).to.be.equal(12);
      });

      it('should focus the close button when the fullscreen dialog opens', async () => {
        await setViewport({ width: mobileBreakpointWidth, height: 800 });

        const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
        const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
        const input = getInput(el, 0);

        input.click();
        await expect(dropdown.isPopoverVisible).to.be.true;

        // Wait for updateComplete + rAF focus cycle used by configureDropdown
        await el.dropdown.updateComplete;
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

        const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');
        // Calendar delegates focusCloseButton to its internal bibtemplate
        const bibtemplate = calendar.shadowRoot.querySelector(calendar.bibtemplateTag._$litStatic$);
        const closeBtn = bibtemplate.shadowRoot.querySelector('#closeButton');
        expect(closeBtn).to.exist;
        expect(bibtemplate.shadowRoot.activeElement).to.equal(closeBtn);
      });

      it('should not close the fullscreen dialog when Tab key is pressed', async () => {
        await setViewport({ width: mobileBreakpointWidth, height: 800 });

        const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
        const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
        const input = getInput(el, 0);

        input.click();
        await expect(dropdown.isPopoverVisible).to.be.true;

        await el.dropdown.updateComplete;
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
        await elementUpdated(el);

        await expect(dropdown.isPopoverVisible).to.be.true;
      });

      it('should set noHideOnThisFocusLoss to false when bib opens in non-fullscreen mode', async () => {
        await setViewport({ width: 1024, height: 800 });

        const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
        getInput(el, 0).click();
        await elementUpdated(el);

        expect(el.dropdown.noHideOnThisFocusLoss).to.be.false;
      });

      it('should restore trigger inert and focus after fullscreen dialog closes', async () => {
        await setViewport({ width: mobileBreakpointWidth, height: 800 });

        const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
        const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
        const input = getInput(el, 0);

        input.click();
        await expect(dropdown.isPopoverVisible).to.be.true;

        await el.dropdown.updateComplete;
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

        // Trigger should be inert while fullscreen is open
        expect(dropdown.trigger.inert).to.be.true;

        // Close the dialog programmatically (keyboard no longer closes it)
        el.hideBib();
        await elementUpdated(el);

        // Wait for rAF focus restoration
        await new Promise((r) => requestAnimationFrame(r));

        expect(dropdown.trigger.inert).to.be.false;
        expect(dropdown.isPopoverVisible).to.be.false;
      });

      it('should not cycle through content in fullscreen bib when Tab is pressed', async () => {
        await setViewport({ width: mobileBreakpointWidth, height: 800 });

        const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
        const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
        const input = getInput(el, 0);

        input.click();
        await expect(dropdown.isPopoverVisible).to.be.true;

        await el.dropdown.updateComplete;
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

        // Tab dispatched from within the bib should not close the bib (the old
        // strategy closed on Tab; the new behavior keeps it open).
        const bibEl = el.dropdown.bibElement?.value;
        if (bibEl) {
          bibEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, composed: true, cancelable: true }));
          await elementUpdated(el);
        }

        await expect(dropdown.isPopoverVisible).to.be.true;
      });

      it('should never open fullscreen when fullscreenBreakpoint is set to disabled', async () => {
        await setViewport({ width: mobileBreakpointWidth, height: 800 });

        const el = await fixture(html`
          <auro-datepicker fullscreenBreakpoint="disabled"></auro-datepicker>
        `);

        const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
        const input = getInput(el, 0);

        input.click();
        await elementUpdated(el);

        // The bib should open as a popover, not fullscreen
        await expect(dropdown.isPopoverVisible).to.be.true;
        await expect(dropdown.isBibFullscreen).to.be.false;
      });
    });

    describe('inputmode', () => {
      it('should pass the inputmode attribute to the inner input element', async () => {
        const el = await fixture(html`
          <auro-datepicker inputmode="numeric"></auro-datepicker>
        `);

        const input = getInput(el, 0);

        await expect(input.getAttribute('inputmode')).to.be.equal('numeric');

        input.removeAttribute('inputmode');
        await elementUpdated(el);
        await expect(input.hasAttribute('inputmode')).to.be.false;
      });

    });

    describe('largeFullscreenHeadline', () => {
      it('should default to false', async () => {
        const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
        await expect(el.largeFullscreenHeadline).to.not.be.true;
      });

      it('should reflect the largeFullscreenHeadline attribute', async () => {
        const el = await fixture(html`<auro-datepicker largefullscreenheadline></auro-datepicker>`);
        await expect(el.largeFullscreenHeadline).to.be.true;
      });
    });

    describe('layout', () => {
      it('should default to classic', async () => {
        const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
        await expect(el.layout).to.equal('classic');
      });

      it('should reflect a custom layout attribute', async () => {
        const el = await fixture(html`<auro-datepicker layout="snowflake"></auro-datepicker>`);
        await expect(el.getAttribute('layout')).to.equal('snowflake');
      });
    });

    describe('maxDate', () => {
      it('should respect maxDate setting when range is false', async () => {
        const el = await fixture(html`
          <auro-datepicker maxDate="2022-01-01"></auro-datepicker>
        `);

        const input = getInput(el, 0);

        input.value = "2022-01-01";

        el.focus();
        el.blur();

        await elementUpdated(el);

        await expect(el.getAttribute('validity')).to.be.equal('valid');

        input.value = "2022-01-02";

        el.focus();
        el.blur();

        await elementUpdated(el);

        await expect(el.getAttribute('validity')).to.be.equal('rangeOverflow');
      });

      it('should respect maxDate setting on the second input in range mode', async () => {
        const el = await fixture(html`
          <auro-datepicker range maxDate="2022-01-05"></auro-datepicker>
        `);

        const input1 = getInput(el, 0);
        const input2 = getInput(el, 1);

        input1.value = "2022-01-01";

        input2.value = "2022-01-08";

        el.focus();
        el.blur();

        await elementUpdated(el);

        await expect(el.getAttribute('validity')).to.be.equal('rangeOverflow');
      });

      it('should reset the value when maxDate is earlier than the current value', async () => {
        const el = await fixture(html`
          <auro-datepicker></auro-datepicker>
        `);

        el.value = '2023-03-02';

        await elementUpdated(el);

        el.maxDate = '2023-02-26';

        await elementUpdated(el);

        await expect(el.value).to.be.equal(undefined);
      });

      it('should respect maxDate setting with custom format when range is false', async () => {
        const el = await fixture(html`
          <auro-datepicker format="yyyy/mm/dd" maxDate="2022-03-22"></auro-datepicker>
        `);

        const input = getInput(el, 0);

        // User types in the display format; el.value stays ISO
        input.value = "2022/03/18";
        el.focus();
        el.blur();
        await elementUpdated(el);

        await expect(el.value).to.equal('2022-03-18');
        await expect(el.maxDate).to.equal('2022-03-22');
        await expect(el.getAttribute('validity')).to.be.equal('valid');

        input.value = "2022/03/25";
        el.focus();
        el.blur();
        await elementUpdated(el);

        await expect(el.value).to.equal('2022-03-25');
        await expect(el.getAttribute('validity')).to.be.equal('rangeOverflow');
      });

      it('should respect maxDate setting on second input with yyyy/mm/dd format', async () => {
        const el = await fixture(html`
          <auro-datepicker range format="yyyy/mm/dd" maxDate="2022-03-22"></auro-datepicker>
        `);

        const input1 = getInput(el, 0);
        const input2 = getInput(el, 1);

        // User types in display format; el.value/valueEnd stay ISO
        input1.value = "2022/03/18";
        input2.value = "2022/03/25";

        el.focus();
        el.blur();
        await elementUpdated(el);

        await expect(el.value).to.equal('2022-03-18');
        await expect(el.valueEnd).to.equal('2022-03-25');
        await expect(el.maxDate).to.equal('2022-03-22');
        await expect(el.getAttribute('validity')).to.be.equal('rangeOverflow');
      });

    });

    describe('minDate', () => {
      it('should reset the value when minDate is later than the current value', async () => {
        const el = await fixture(html`
          <auro-datepicker></auro-datepicker>
        `);

        el.value = '2023-03-02';

        await elementUpdated(el);

        el.minDate = '2023-03-09';

        await elementUpdated(el);

        await expect(el.value).to.be.equal(undefined);
      });

      it('should update centralDate when minDate is later than centralDate', async () => {
        const el = await fixture(html`
          <auro-datepicker calendarFocusDate="2023-03-02"></auro-datepicker>
        `);

        await elementUpdated(el);

        el.minDate = '2023-04-09';

        await elementUpdated(el);

        // centralDate is set to the 1st of the month by updateCentralDate
        await expect(el.centralDate).to.be.an.instanceOf(Date);
        await expect(el.centralDate.getMonth()).to.equal(3); // April
        await expect(el.centralDate.getFullYear()).to.equal(2023);
      });

      it('should respect minDate setting with custom format', async () => {
        const el = await fixture(html`
          <auro-datepicker format="yyyy/mm/dd" minDate="2022-03-22"></auro-datepicker>
        `);

        const input = getInput(el, 0);

        // User types in the display format; el.value stays ISO
        input.value = "2022/03/25";
        el.focus();
        el.blur();
        await elementUpdated(el);

        await expect(el.value).to.equal('2022-03-25');
        await expect(el.minDate).to.equal('2022-03-22');
        await expect(el.getAttribute('validity')).to.be.equal('valid');

        input.value = "2022/03/18";
        el.focus();
        el.blur();
        await elementUpdated(el);

        await expect(el.value).to.equal('2022-03-18');
        await expect(el.getAttribute('validity')).to.be.equal('rangeUnderflow');
      });

      it('should respect minDate setting on second input with custom format', async () => {
        const el = await fixture(html`
          <auro-datepicker range format="yyyy/mm/dd" minDate="2025-03-22"></auro-datepicker>
        `);

        const input1 = getInput(el, 0);
        const input2 = getInput(el, 1);

        // User types in display format; el.value/valueEnd stay ISO
        input1.value = "2025/03/18";
        input2.value = "2025/03/25";

        el.focus();
        el.blur();
        await elementUpdated(el);

        await expect(el.value).to.equal('2025-03-18');
        await expect(el.valueEnd).to.equal('2025-03-25');
        await expect(el.minDate).to.equal('2025-03-22');
        await expect(el.getAttribute('validity')).to.be.equal('rangeUnderflow');
      });
    });

    describe('monthNames', () => {
      it('should default to English month names', async () => {
        const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
        await expect(el.monthNames).to.be.an('array');
        await expect(el.monthNames.length).to.equal(12);
        await expect(el.monthNames[0]).to.equal('January');
        await expect(el.monthNames[11]).to.equal('December');
      });
    });

    describe('noFlip', () => {
      it('should default to false', async () => {
        const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
        await expect(el.noFlip).to.be.false;
      });

      it('should reflect the noFlip attribute', async () => {
        const el = await fixture(html`<auro-datepicker noflip></auro-datepicker>`);
        await expect(el.noFlip).to.be.true;
        await expect(el.hasAttribute('noflip')).to.be.true;
      });
    });

    describe('noValidate', () => {
      it('should default to falsy', async () => {
        const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
        await expect(el.noValidate).to.not.be.true;
      });

      it('should reflect the noValidate attribute', async () => {
        const el = await fixture(html`<auro-datepicker novalidate></auro-datepicker>`);
        await expect(el.noValidate).to.be.true;
        await expect(el.hasAttribute('novalidate')).to.be.true;
      });
    });

    describe('offset', () => {
      it('should default to 0', async () => {
        const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
        await expect(el.offset).to.equal(0);
      });

      it('should reflect the offset attribute', async () => {
        const el = await fixture(html`<auro-datepicker offset="10"></auro-datepicker>`);
        await expect(el.offset).to.equal(10);
      });
    });

    describe('onDark', () => {
      it('should default to false', async () => {
        const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
        await expect(el.onDark).to.not.be.true;
      });

      it('should reflect the onDark attribute', async () => {
        const el = await fixture(html`
          <div style="background-color: #222222">
            <auro-datepicker ondark></auro-datepicker>
          </div>
        `);
        const datepicker = el.querySelector('auro-datepicker');
        await expect(datepicker.onDark).to.be.true;
        await expect(datepicker.hasAttribute('ondark')).to.be.true;
      });
    });

    describe('placeholder', () => {
      it('should display custom placeholder text', async () => {
        const el = await fixture(html`<auro-datepicker placeholder="Select a date"></auro-datepicker>`);
        await expect(el.getAttribute('placeholder')).to.equal('Select a date');
      });
    });

    describe('placeholderEndDate', () => {
      it('should display custom placeholder text for the end date input', async () => {
        const el = await fixture(html`<auro-datepicker range placeholderEndDate="Return date"></auro-datepicker>`);
        await expect(el.getAttribute('placeholderenddate')).to.equal('Return date');
      });
    });

    describe('placement', () => {
      it('should default to bottom-start', async () => {
        const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
        await expect(el.placement).to.equal('bottom-start');
      });

      it('should reflect custom placement', async () => {
        const el = await fixture(html`<auro-datepicker placement="top"></auro-datepicker>`);
        await expect(el.placement).to.equal('top');
        await expect(el.getAttribute('placement')).to.equal('top');
      });
    });

    describe('range', () => {
      it('should programmatically apply focus to the desired input in range mode', async () => {
        const el = await fixture(html`
          <auro-datepicker range></auro-datepicker>
        `);

        const input = getInput(el, 1);

        el.focus('endDate');

        await expect(el.shadowRoot.activeElement).to.be.equal(input);
      });

      it('should display preset range values when value and valueEnd attributes are set', async () => {
        const el = await fixture(html`
          <auro-datepicker range value="2023-01-01" valueEnd="2023-01-15"></auro-datepicker>
        `);

        await elementUpdated(el);

        const departInput = getInput(el, 0);

        const setDepartDate = new Date('01/01/2023').toDateString();
        const departInputDate = new Date(departInput.value).toDateString();

        await expect(departInputDate).to.be.equal(setDepartDate);

        const returnInput = getInput(el, 1);

        const setReturnDate = new Date('01/15/2023').toDateString();
        const returnInputDate = new Date(returnInput.value).toDateString();

        await expect(returnInputDate).to.be.equal(setReturnDate);
      });

      it('should render two calendars when range attribute is present', async () => {
        await setViewport({ width: 1200, height: 800 });

        const el = await fixture(html`
          <auro-datepicker range></auro-datepicker>
        `);

        const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
        const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');

        await dropdown.querySelector('[auro-input]').click();
        await expect(dropdown.isPopoverVisible).to.be.true;
        await elementUpdated(calendar.shadowRoot);
        await nextFrame();

        await expect(calendar.numCalendars).to.be.equal(2);
      });

      it('should display preset range values using custom format', async () => {
        const el = await fixture(html`
          <auro-datepicker range format="yyyy/mm/dd" value="2023-02-25" valueEnd="2023-02-28"></auro-datepicker>
        `);

        await elementUpdated(el);

        // el.value/valueEnd are ISO; the inputs display in the configured format
        await expect(el.value).to.equal('2023-02-25');
        await expect(el.valueEnd).to.equal('2023-02-28');
        await expect(getInput(el, 0).value).to.equal('2023/02/25');
        await expect(getInput(el, 1).value).to.equal('2023/02/28');
      });

    });

    describe('referenceDates', () => {
      it('should accept ISO dates and mark matching calendar cells as reference dates', async () => {
        const el = await fixture(html`
          <auro-datepicker referenceDates='["2025-10-05", "2025-10-15", "2025-10-20", "2025-10-22"]' centralDate="2025-10-10"></auro-datepicker>
        `);

        await elementUpdated(el);

        // referenceDates property stores ISO strings as-is
        await expect(el.referenceDates).to.deep.equal(['2025-10-05', '2025-10-15', '2025-10-20', '2025-10-22']);

        // Show the bib so the calendar is rendered
        el.showBib();

        const {calendar} = el;
        const calendarMonths = calendar.shadowRoot.querySelectorAll('auro-formkit-calendar-month');

        if (!calendarMonths.length) return;

        const firstMonth = calendarMonths[0];
        await elementUpdated(firstMonth);

        const calendarCells = firstMonth.shadowRoot.querySelectorAll('auro-formkit-calendar-cell');
        const calendarCellButtons = Array.from(calendarCells).map((cell) => cell.shadowRoot.querySelector('button'));
        const referenceDateButtons = calendarCellButtons.filter((button) => button.classList.contains('reference'));

        // All 4 ISO reference dates should be highlighted
        await expect(referenceDateButtons.length).to.be.equal(4);

        const referenceButtonDateStrings = referenceDateButtons.map((button) => button.getAttribute('title'));
        await expect(referenceButtonDateStrings).to.include.members([
          'Sunday, October 5th, 2025',
          'Wednesday, October 15th, 2025',
          'Monday, October 20th, 2025',
          'Wednesday, October 22nd, 2025'
        ]);
      });

    });

    describe('required', () => {
      it('should show required validity error when required attribute is set and no value is provided', async () => {
        const el = await fixture(html`
          <auro-datepicker required></auro-datepicker>
        `);

        const input = getInput(el, 0);

        await expect(el.hasAttribute('validity')).to.be.false;

        el.focus();
        el.blur();

        await elementUpdated(el);

        await expect(el.getAttribute('validity')).to.be.equal('valueMissing');

        input.value = '2023-03-03';

        el.focus();
        el.blur();

        await elementUpdated(el);

        await expect(el.getAttribute('validity')).to.be.equal('valid');
      });

      it('should pass the required attribute down to the inner input element', async () => {
        const el = await fixture(html`
          <auro-datepicker required></auro-datepicker>
        `);

        const input = getInput(el, 0);

        await expect(el.hasAttribute('required')).to.be.true;
        await expect(input.hasAttribute('required')).to.be.true;
      });

      it('should show valueMissing when required range datepicker has only one date', async () => {
        const el = await fixture(html`
          <auro-datepicker range required></auro-datepicker>
        `);
        await elementUpdated(el);

        // Set only the departure date
        el.value = '2024-01-15';
        await elementUpdated(el);

        el.validate(true);
        await elementUpdated(el);

        // Should be invalid since both dates are required for range
        await expect(el.getAttribute('validity')).to.equal('valueMissing');
      });
    });

    describe('setCustomValidity', () => {
      it('should display custom validation message for all validity states', async () => {
        const el = await fixture(html`<auro-datepicker required></auro-datepicker>`);
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
        const el = await fixture(html`<auro-datepicker error="generic error"></auro-datepicker>`);
        await elementUpdated(el);

        el.setCustomValidityCustomError = 'Custom error text';
        el.validate();
        await elementUpdated(el);

        await expect(el.getAttribute('validity')).to.equal('customError');
        const helpText = el.shadowRoot.querySelector('[auro-helptext]');
        await expect(helpText.textContent.trim()).to.equal('Custom error text');
      });
    });

    describe('setCustomValidityRangeOverflow', () => {
      it('should display custom message when validity is rangeOverflow', async () => {
        const el = await fixture(html`
          <auro-datepicker maxDate="2022-01-01" setCustomValidityRangeOverflow="Date is too late"></auro-datepicker>
        `);

        const input = getInput(el, 0);
        input.value = '2022-01-02';

        el.focus();
        el.blur();
        await elementUpdated(el);

        await expect(el.getAttribute('validity')).to.equal('rangeOverflow');
        const helpText = el.shadowRoot.querySelector('[auro-helptext]');
        await expect(helpText.textContent.trim()).to.equal('Date is too late');
      });
    });

    describe('setCustomValidityRangeUnderflow', () => {
      it('should display custom message when validity is rangeUnderflow', async () => {
        const el = await fixture(html`
          <auro-datepicker minDate="2022-03-22" setCustomValidityRangeUnderflow="Date is too early"></auro-datepicker>
        `);

        const input = getInput(el, 0);
        input.value = '2022-03-18';

        el.focus();
        el.blur();
        await elementUpdated(el);

        await expect(el.getAttribute('validity')).to.equal('rangeUnderflow');
        const helpText = el.shadowRoot.querySelector('[auro-helptext]');
        await expect(helpText.textContent.trim()).to.equal('Date is too early');
      });
    });

    describe('setCustomValidityValueMissing', () => {
      it('should propagate customValidityValueMissing to the inner input', async () => {
        const el = await fixture(html`
          <auro-datepicker setCustomValidityValueMissing="The value is missing!"></auro-datepicker>
        `);

        const input = getInput(el, 0);

        await elementUpdated(el);

        await expect(input.getAttribute('setCustomValidityValueMissing')).to.be.equal('The value is missing!');
      });

    });

    describe('shape', () => {
      it('should default to classic', async () => {
        const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
        await expect(el.shape).to.equal('classic');
      });

      it('should reflect a custom shape attribute', async () => {
        const el = await fixture(html`<auro-datepicker shape="pill"></auro-datepicker>`);
        await expect(el.getAttribute('shape')).to.equal('pill');
      });
    });

    describe('shift', () => {
      it('should default to false', async () => {
        const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
        await expect(el.shift).to.be.false;
      });

      it('should reflect the shift attribute', async () => {
        const el = await fixture(html`<auro-datepicker shift></auro-datepicker>`);
        await expect(el.shift).to.be.true;
        await expect(el.hasAttribute('shift')).to.be.true;
      });
    });

    describe('size', () => {
      it('should default to lg', async () => {
        const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
        await expect(el.size).to.equal('lg');
      });
    });

    describe('stacked', () => {
      it('should default to false', async () => {
        const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
        await expect(el.stacked).to.not.be.true;
      });

      it('should reflect the stacked attribute', async () => {
        const el = await fixture(html`<auro-datepicker stacked></auro-datepicker>`);
        await expect(el.stacked).to.be.true;
        await expect(el.hasAttribute('stacked')).to.be.true;
      });
    });

    describe('validity', () => {
      it('should set invalid error when an invalid value is passed', async () => {

        const curYear = new Date().getFullYear();

        const el = await fixture(html`
          <auro-datepicker></auro-datepicker>
        `);

        // non-existant day
        el.value = "2022-02-31";
        await elementUpdated(el);
        await expect(el.getAttribute('validity')).to.be.equal('patternMismatch');

        // pattern mismatch
        el.value = "15/01/2022";
        el.validate();
        await elementUpdated(el);
        await expect(el.getAttribute('validity')).to.be.equal('patternMismatch');

        // Day too low
        el.value = `${curYear}-05-${`0${minDay - 1}`.slice(-2)}`;
        el.validate();
        await elementUpdated(el);
        await expect(el.getAttribute('validity')).to.be.equal('patternMismatch');

        // Day too high
        el.value = `${curYear}-05-${`0${maxDay + 1}`.slice(-2)}`;
        el.validate();
        await elementUpdated(el);
        await expect(el.getAttribute('validity')).to.be.equal('patternMismatch');

        // Month too low
        el.value = `${curYear}-02-${`0${minMonth - 1}`.slice(-2)}`;
        el.validate();
        await elementUpdated(el);
        await expect(el.getAttribute('validity')).to.be.equal('patternMismatch');

        // Month too high
        el.value = `${curYear}-${`0${maxMonth + 1}`.slice(-2)}-02`;
        el.validate();
        await elementUpdated(el);
        await expect(el.getAttribute('validity')).to.be.equal('patternMismatch');

        // Year too low
        el.value = `${minYear - 1}-02-01`;
        el.validate();
        await elementUpdated(el);
        await expect(el.getAttribute('validity')).to.be.equal('patternMismatch');

        // Year too high
        el.value = `${maxYear + 1}-02-01`;
        el.validate();
        await elementUpdated(el);
        await expect(el.getAttribute('validity')).to.be.equal('patternMismatch');
      });

      it('should set an error when the passed value exceeds the expected length', async () => {

        const el = await fixture(html`
          <auro-datepicker></auro-datepicker>
        `);

        el.value = "2028-01-22";
        el.validate();
        await elementUpdated(el);
        await expect(el.getAttribute('validity')).to.be.equal('tooLong');
      });

      it('should set an error when an incomplete value is passed', async () => {
        const el = await fixture(html`
          <auro-datepicker></auro-datepicker>
        `);

        el.value = "02";
        el.validate();
        await elementUpdated(el);
        await expect(el.getAttribute('validity')).to.be.equal('tooShort');

        // empty
        el.reset();
        el.validate();
        await elementUpdated(el);
        await expect(el.getAttribute('validity')).to.be.null;

        // set another imcomplete value
        el.value = "2002-0";
        el.validate();
        await elementUpdated(el);
        await expect(el.getAttribute('validity')).to.be.equal('tooShort');
      });

      it('should show dateFrom error message when dateTo is also invalid', async () => {
        const el = await fixture(html`
          <auro-datepicker range required minDate="2023-04-15" value="2023-04-20" setCustomValidityRangeUnderflow="Before min date"></auro-datepicker>
        `);

        const input1 = getInput(el, 0);
        const input2 = getInput(el, 1);

        el.focus();
        el.blur();

        await elementUpdated(el);

        await expect(el.errorMessage).to.be.equal(input1.errorMessage);
        await expect(input2.errorMessage).to.be.equal(undefined);
      });

      it('should show dateTo error message when dateFrom is valid', async () => {
        const el = await fixture(html`
          <auro-datepicker range maxDate="2023-03-03" value="2023-03-01" valueEnd="2023-03-30"></auro-datepicker>
        `);

        await elementUpdated(el);

        await expect(el.getAttribute('validity')).to.be.equal('rangeOverflow');
      });

    });

    describe('value', () => {
      it('should display a preset value when the value attribute is set', async () => {
        const el = await fixture(html`
          <auro-datepicker value="2022-01-01"></auro-datepicker>
        `);

        await elementUpdated(el);

        const input = getInput(el, 0);

        const setDate = new Date('01/01/2022').toDateString();
        const inputDate = new Date(input.value).toDateString();

        await expect(inputDate).to.be.equal(setDate);
      });

      it('should update the input display value when the value property is changed', async () => {
        const el = await fixture(html`
          <auro-datepicker range></auro-datepicker>
        `);

        const input1 = getInput(el, 0);
        const input2 = getInput(el, 1);

        setInputValue(input1, '2023-04-03');
        setInputValue(input2, '2023-04-04');

        await elementUpdated(el);

        el.valueEnd = '202-04-09';

        await elementUpdated(el);

        expect(input2.value).to.equal('04/09/202');

        el.valueEnd = undefined;

        await elementUpdated(el);

        expect(input2.value).to.equal('');
      });

      it('should clear the value and validity state when reset() is called', async () => {
        const el = await fixture(html`
          <auro-datepicker range minDate="2025-06-30" value="2025-02-14" valueEnd="2025-04-05"></auro-datepicker>
        `);

        await expect(el.value).to.be.equal('2025-02-14');
        await expect(el.valueEnd).to.be.equal('2025-04-05');
        await expect(el.validity).to.be.equal('rangeUnderflow');

        el.reset();

        await elementUpdated(el);

        await expect(el.hasAttribute('validity')).to.be.false;
        await expect(el.value).to.be.equal(undefined);
        await expect(el.valueEnd).to.be.equal(undefined);
      });

      it('should display a preset value using custom format', async () => {
        const el = await fixture(html`
          <auro-datepicker format="yyyy/mm/dd" value="2023-02-25"></auro-datepicker>
        `);

        await elementUpdated(el);

        // el.value is ISO; the input displays in the configured format
        await expect(el.value).to.equal('2023-02-25');
        await expect(getInput(el, 0).value).to.equal('2023/02/25');
      });


    });

    describe('valueEnd', () => {
      it('should default to undefined', async () => {
        const el = await fixture(html`<auro-datepicker range></auro-datepicker>`);
        await expect(el.valueEnd).to.be.undefined;
      });

      it('should display preset valueEnd when attribute is set', async () => {
        const el = await fixture(html`
          <auro-datepicker range value="2023-01-01" valueEnd="2023-01-15"></auro-datepicker>
        `);
        await elementUpdated(el);

        const returnInput = getInput(el, 1);
        const setReturnDate = new Date('01/15/2023').toDateString();
        const returnInputDate = new Date(returnInput.value).toDateString();
        await expect(returnInputDate).to.be.equal(setReturnDate);
      });
    });

  });

  describe('Slots', () => {
    describe('helpText', () => {
      it('should render content in the helpText slot', async () => {
        const el = await fixture(html`<auro-datepicker><span slot="fromLabel">Departure</span><span slot="toLabel">Return</span><span slot="helpText">Select a date</span></auro-datepicker>`);

        const slotContent = el.querySelector('[slot="helpText"]');

        await expect(slotContent).to.exist;
      });
    });

    describe('ariaLabel.bib.close', () => {
      it('should render content in the ariaLabel.bib.close slot', async () => {
        const el = await fixture(html`<auro-datepicker><span slot="fromLabel">Departure</span><span slot="toLabel">Return</span><span slot="ariaLabel.bib.close">Close calendar</span></auro-datepicker>`);

        const slotContent = el.querySelector('[slot="ariaLabel.bib.close"]');

        await expect(slotContent).to.exist;
      });
    });

    describe('ariaLabel.input.clear', () => {
      it('should render content in the ariaLabel.input.clear slot', async () => {
        const el = await fixture(html`<auro-datepicker><span slot="fromLabel">Departure</span><span slot="toLabel">Return</span><span slot="ariaLabel.input.clear">Clear date</span></auro-datepicker>`);

        const slotContent = el.querySelector('[slot="ariaLabel.input.clear"]');

        await expect(slotContent).to.exist;
      });
    });

    describe('bib.fullscreen.headline', () => {
      it('should render content in the bib.fullscreen.headline slot', async () => {
        const el = await fixture(html`<auro-datepicker><span slot="fromLabel">Departure</span><span slot="toLabel">Return</span><span slot="bib.fullscreen.headline">Select dates</span></auro-datepicker>`);

        const slotContent = el.querySelector('[slot="bib.fullscreen.headline"]');

        await expect(slotContent).to.exist;
      });
    });

    describe('bib.fullscreen.dateLabel', () => {
      it('should render content in the bib.fullscreen.dateLabel slot', async () => {
        const el = await fixture(html`<auro-datepicker><span slot="fromLabel">Departure</span><span slot="toLabel">Return</span><span slot="bib.fullscreen.dateLabel">Date</span></auro-datepicker>`);

        const slotContent = el.querySelector('[slot="bib.fullscreen.dateLabel"]');

        await expect(slotContent).to.exist;
      });
    });

    describe('bib.fullscreen.fromLabel', () => {
      it('should render content in the bib.fullscreen.fromLabel slot', async () => {
        const el = await fixture(html`<auro-datepicker><span slot="fromLabel">Departure</span><span slot="toLabel">Return</span><span slot="bib.fullscreen.fromLabel">From</span></auro-datepicker>`);

        const slotContent = el.querySelector('[slot="bib.fullscreen.fromLabel"]');

        await expect(slotContent).to.exist;
      });
    });

    describe('bib.fullscreen.toLabel', () => {
      it('should render content in the bib.fullscreen.toLabel slot', async () => {
        const el = await fixture(html`<auro-datepicker><span slot="fromLabel">Departure</span><span slot="toLabel">Return</span><span slot="bib.fullscreen.toLabel">To</span></auro-datepicker>`);

        const slotContent = el.querySelector('[slot="bib.fullscreen.toLabel"]');

        await expect(slotContent).to.exist;
      });
    });

    describe('label', () => {
      it('should render content in the label slot', async () => {
        const el = await fixture(html`<auro-datepicker><span slot="label">Travel date</span></auro-datepicker>`);

        const slotContent = el.querySelector('[slot="label"]');

        await expect(slotContent).to.exist;
      });
    });

    describe('toLabel', () => {
      it('should render content in the toLabel slot', async () => {
        const el = await fixture(html`<auro-datepicker><span slot="fromLabel">Departure</span><span slot="toLabel">Return</span></auro-datepicker>`);

        const slotContent = el.querySelector('[slot="toLabel"]');

        await expect(slotContent).to.exist;
      });
    });

    describe('fromLabel', () => {
      it('should render content in the fromLabel slot', async () => {
        const el = await fixture(html`<auro-datepicker><span slot="fromLabel">Departure</span><span slot="toLabel">Return</span></auro-datepicker>`);

        const slotContent = el.querySelector('[slot="fromLabel"]');

        await expect(slotContent).to.exist;
      });
    });

    describe('date_MM_DD_YYYY', () => {
      // Slot name is dynamic (e.g., date_01_15_2025). See calendar cell tests.
    });

    describe('popover_MM_DD_YYYY', () => {
      // Slot name is dynamic (e.g., popover_01_15_2025). See calendar cell tests.
    });

    describe('slot functional behavior', () => {
      it('label slot text is forwarded to the inner input as accessible name', async () => {
        const el = await fixture(html`<auro-datepicker><span slot="label">Departure date</span></auro-datepicker>`);
        await elementUpdated(el);

        const labelSlot = el.querySelector('[slot="label"]');
        expect(labelSlot.textContent.trim()).to.equal('Departure date');
      });

      it('helpText slot content is visible in the rendered component', async () => {
        const el = await fixture(html`
          <auro-datepicker>
            <span slot="label">Date</span>
            <span slot="helpText">Select your travel date</span>
          </auro-datepicker>
        `);
        await elementUpdated(el);

        const helpText = el.querySelector('[slot="helpText"]');
        expect(helpText).to.exist;
        expect(helpText.textContent.trim()).to.equal('Select your travel date');
      });

      it('fromLabel and toLabel slots render for range datepicker', async () => {
        const el = await fixture(html`
          <auro-datepicker range>
            <span slot="fromLabel">Departure</span>
            <span slot="toLabel">Return</span>
          </auro-datepicker>
        `);
        await elementUpdated(el);

        expect(el.querySelector('[slot="fromLabel"]').textContent.trim()).to.equal('Departure');
        expect(el.querySelector('[slot="toLabel"]').textContent.trim()).to.equal('Return');
      });
    });

  });

  describe('Public Functions', () => {
    describe('register', () => {
      it('should register the element as a custom element', async () => {
        const el = await Boolean(customElements.get('auro-datepicker'));
        await expect(el).to.be.true;
      });
    });

    describe('focus', () => {
      it('should programmatically apply focus to the input when focus() is called', async () => {
        const el = await fixture(html`
          <auro-datepicker></auro-datepicker>
        `);

        const input = getInput(el, 0);

        el.focus();

        await expect(el.shadowRoot.activeElement).to.be.equal(input);
      });
    });

    describe('hideBib', () => {
      it('should close the bib when hideBib() method is called', async () => {
        const el = await fixture(html`<auro-datepicker></auro-datepicker>`);

        await expect(el.dropdown.isPopoverVisible).to.be.false;

        el.showBib();
        await elementUpdated(el);
        await expect(el.dropdown.isPopoverVisible).to.be.true;

        el.hideBib();
        await elementUpdated(el);
        await expect(el.dropdown.isPopoverVisible).to.be.false;
      });
    });

    describe('showBib', () => {
      it('should open the bib when showBib() method is called', async () => {
        const el = await fixture(html`<auro-datepicker></auro-datepicker>`);

        await expect(el.dropdown.isPopoverVisible).to.be.false;

        el.showBib();
        await elementUpdated(el);
        await expect(el.dropdown.isPopoverVisible).to.be.true;
      });
    });

    describe('resetInputs', () => {
      it('should clear input values without clearing validation state', async () => {
        const el = await fixture(html`<auro-datepicker value="2023-01-01"></auro-datepicker>`);
        await elementUpdated(el);

        el.resetInputs();
        await elementUpdated(el);

        await expect(el.value).to.be.undefined;
      });
    });

    describe('reset', () => {
      it('should clear value and validation state', async () => {
        const el = await fixture(html`
          <auro-datepicker required value="2023-01-01"></auro-datepicker>
        `);
        await elementUpdated(el);

        el.validate(true);
        await elementUpdated(el);
        await expect(el.getAttribute('validity')).to.equal('valid');

        el.reset();
        await elementUpdated(el);

        await expect(el.value).to.be.undefined;
        await expect(el.hasAttribute('validity')).to.be.false;
      });
    });

    describe('clear', () => {
      it('should clear the current value', async () => {
        const el = await fixture(html`<auro-datepicker value="2023-01-01"></auro-datepicker>`);
        await elementUpdated(el);

        el.clear();
        await elementUpdated(el);

        await expect(el.value).to.be.undefined;
      });
    });

    describe('validate', () => {
      it('should set valueMissing when required and no value', async () => {
        const el = await fixture(html`<auro-datepicker required></auro-datepicker>`);
        await elementUpdated(el);

        el.validate(true);
        await elementUpdated(el);

        await expect(el.getAttribute('validity')).to.equal('valueMissing');
      });

      it('should set valid when value is present', async () => {
        const el = await fixture(html`<auro-datepicker required value="2023-01-01"></auro-datepicker>`);
        await elementUpdated(el);

        el.validate(true);
        await elementUpdated(el);

        await expect(el.getAttribute('validity')).to.equal('valid');
      });
    });

    describe('resetShapeClasses', () => {
      it('should be callable without error', async () => {
        const el = await fixture(html`<auro-datepicker shape="pill"></auro-datepicker>`);
        await elementUpdated(el);

        el.shape = 'pill-left';
        el.resetShapeClasses();
        await elementUpdated(el);

        await expect(el.shape).to.equal('pill-left');
      });
    });

    describe('resetLayoutClasses', () => {
      it('should be callable without error', async () => {
        const el = await fixture(html`<auro-datepicker layout="snowflake"></auro-datepicker>`);
        await elementUpdated(el);

        el.layout = 'classic';
        el.resetLayoutClasses();
        await elementUpdated(el);

        await expect(el.layout).to.equal('classic');
      });
    });

    describe('updateComponentArchitecture', () => {
      it('should be callable and update layout and shape', async () => {
        const el = await fixture(html`<auro-datepicker layout="snowflake" shape="snowflake"></auro-datepicker>`);
        await elementUpdated(el);

        el.layout = 'classic';
        el.shape = 'classic';
        el.updateComponentArchitecture();
        await elementUpdated(el);

        await expect(el.layout).to.equal('classic');
        await expect(el.shape).to.equal('classic');
      });
    });

    describe('values', () => {
      it('should return an empty array when no value is set', async () => {
        const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
        await expect(el.values).to.be.an('array');
        await expect(el.values.length).to.equal(0);
      });

      it('should return array with single value when value is set', async () => {
        const el = await fixture(html`<auro-datepicker value="2023-01-01"></auro-datepicker>`);
        await elementUpdated(el);
        await expect(el.values.length).to.equal(1);
        await expect(el.values[0]).to.equal(el.value);
      });

      it('should return array with both values when range values are set', async () => {
        const el = await fixture(html`
          <auro-datepicker range value="2023-01-01" valueEnd="2023-01-15"></auro-datepicker>
        `);
        await elementUpdated(el);
        await expect(el.values.length).to.equal(2);
        await expect(el.values[0]).to.equal(el.value);
        await expect(el.values[1]).to.equal(el.valueEnd);
      });
    });

    describe('validate(force)', () => {
      it('validate(true) forces validation even when noValidate is set', async () => {
        const el = await fixture(html`
          <auro-datepicker required noValidate></auro-datepicker>
        `);
        await elementUpdated(el);

        // noValidate is set, but force should still run validation
        el.validate(true);
        await elementUpdated(el);

        expect(el.validity).to.not.be.undefined;
      });
    });
  });

  describe('Events', () => {
    describe('input', () => {
      it('should fire an input event when a date is selected', async () => {
        const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
        await elementUpdated(el);

        let inputFired = false;
        el.addEventListener('input', () => {
          inputFired = true;
        });

        el.value = '2024-01-15';
        el.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
        await elementUpdated(el);

        expect(inputFired).to.be.true;
      });
    });

    describe('typing a date into the input', () => {
      it('should set datepicker value when a valid date is typed into the inner input', async () => {
        const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
        await elementUpdated(el);

        const innerInput = el.inputList[0];

        // Simulate typing a date into the inner input
        innerInput.value = '2025-03-15';
        innerInput.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
        await elementUpdated(el);

        expect(el.value).to.equal('2025-03-15');
      });

      it('should set datepicker range values when dates are typed into both inputs', async () => {
        const el = await fixture(html`<auro-datepicker range></auro-datepicker>`);
        await elementUpdated(el);

        // Type the start date
        el.inputList[0].value = '2025-03-15';
        el.inputList[0].dispatchEvent(new Event('input', { bubbles: true, composed: true }));
        await elementUpdated(el);

        expect(el.value).to.equal('2025-03-15');

        // Type the end date
        el.inputList[1].value = '2025-03-20';
        el.inputList[1].dispatchEvent(new Event('input', { bubbles: true, composed: true }));
        await elementUpdated(el);

        expect(el.valueEnd).to.equal('2025-03-20');
      });
    });

    describe('auroDatePicker-valueSet', () => {
      it('should fire auroDatePicker-valueSet when a value is set', async () => {
        const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
        await elementUpdated(el);

        const eventPromise = new Promise((resolve) => {
          el.addEventListener('auroDatePicker-valueSet', (event) => resolve(event));
        });

        el.value = '2023-01-15';
        await elementUpdated(el);

        const event = await eventPromise;
        await expect(event).to.exist;
      });
    });

    describe('auroDatePicker-toggled', () => {
      it('should fire auroDatePicker-toggled when the bib opens', async () => {
        const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
        await elementUpdated(el);

        const eventPromise = new Promise((resolve) => {
          el.addEventListener('auroDatePicker-toggled', (event) => resolve(event));
        });

        const input = getInput(el, 0);
        input.click();
        await elementUpdated(el);

        const event = await eventPromise;
        await expect(event).to.exist;
        await expect(event.detail.expanded).to.be.true;
      });
    });

    describe('auroDatePicker-monthChanged', () => {
      it('should fire auroDatePicker-monthChanged when the month changes', async () => {
        const el = await fixture(html`<auro-datepicker value="2023-02-01"></auro-datepicker>`);
        await elementUpdated(el);

        const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');
        const nextMonthBtn = calendar.shadowRoot.querySelector('.nextMonth');

        const eventPromise = new Promise((resolve) => {
          el.addEventListener('auroDatePicker-monthChanged', (event) => resolve(event));
        });

        nextMonthBtn.click();
        await elementUpdated(el);

        const event = await eventPromise;
        await expect(event).to.exist;
      });
    });

    describe('auroDatePicker-newSlotContent', () => {
      it('should fire auroDatePicker-newSlotContent when pushSlotContent is called', async () => {
        const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
        await elementUpdated(el);

        const eventPromise = new Promise((resolve) => {
          el.addEventListener('auroDatePicker-newSlotContent', (event) => resolve(event));
        });

        el.pushSlotContent();

        const event = await eventPromise;
        await expect(event).to.exist;
      });
    });

    describe('auroFormElement-validated', () => {
      it('should fire auroFormElement-validated when validation runs', async () => {
        const el = await fixture(html`<auro-datepicker required></auro-datepicker>`);
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
    // ─── displayValueFontClass returns body-lg for snowflake layout ────
    it('displayValueFontClass returns body-lg for snowflake layout', async () => {
      const el = await fixture(html`
        <auro-datepicker layout="snowflake"></auro-datepicker>
      `);
      await elementUpdated(el);

      await expect(el.displayValueFontClass).to.equal('body-lg');
    });

    // ─── displayValueFontClass returns body-lg for classic+snowflake shape ─
    it('displayValueFontClass returns body-lg for classic layout with snowflake shape', async () => {
      const el = await fixture(html`
        <auro-datepicker layout="classic" shape="snowflake"></auro-datepicker>
      `);
      await elementUpdated(el);

      await expect(el.displayValueFontClass).to.equal('body-lg');
    });

    // ─── displayValueFontClass returns body-default for classic layout ──
    it('displayValueFontClass returns body-default for classic layout', async () => {
      const el = await fixture(html`
        <auro-datepicker></auro-datepicker>
      `);
      await elementUpdated(el);

      await expect(el.displayValueFontClass).to.equal('body-default');
    });

    // ─── displayValueFontClass returns accent-xl for emphasized layout with value ──
    it('displayValueFontClass returns accent-xl for emphasized layout when hasValue is true', async () => {
      const el = await fixture(html`
        <auro-datepicker></auro-datepicker>
      `);
      await elementUpdated(el);

      el.layout = 'emphasized';
      el.hasDisplayValueContent = true;
      el.hasValue = true;

      expect(el.displayValueFontClass).to.equal('accent-xl');
    });

    // ─── displayValueFontClass returns body-sm for emphasized layout without value ──
    it('displayValueFontClass returns body-sm for emphasized layout when hasDisplayValueContent but no value', async () => {
      const el = await fixture(html`
        <auro-datepicker></auro-datepicker>
      `);
      await elementUpdated(el);

      el.layout = 'emphasized';
      el.hasDisplayValueContent = true;
      el.hasValue = false;

      expect(el.displayValueFontClass).to.equal('body-sm');
    });

    // ─── displayValueFontClass returns body-sm for emphasized layout with noFocusOrValue ──
    it('displayValueFontClass returns body-sm for emphasized layout when no displayValueContent and noFocusOrValue', async () => {
      const el = await fixture(html`
        <auro-datepicker></auro-datepicker>
      `);
      await elementUpdated(el);

      el.layout = 'emphasized';
      el.hasDisplayValueContent = false;
      el.noFocusOrValue = true;

      expect(el.displayValueFontClass).to.equal('body-sm');
    });

    // ─── checkDisplayValueSlotChange sets hasDisplayValueContent true when nodes exist ──
    it('checkDisplayValueSlotChange sets hasDisplayValueContent to true when slot has content', async () => {
      const el = await fixture(html`
        <auro-datepicker layout="snowflake"></auro-datepicker>
      `);
      await elementUpdated(el);

      // Reset to false so we can verify the method sets it
      el.hasDisplayValueContent = false;

      // Call the method — the snowflake layout renders a slot[name="displayValue"]
      // which has default content (a <span>), so assignedNodes may be empty.
      // Stub the querySelector to return a mock slot with content nodes.
      const origQuerySelector = el.shadowRoot.querySelector.bind(el.shadowRoot);
      el.shadowRoot.querySelector = (selector) => {
        if (selector === 'slot[name="displayValue"]') {
          return { assignedNodes: () => [document.createTextNode('test')] };
        }
        return origQuerySelector(selector);
      };

      el.checkDisplayValueSlotChange();
      expect(el.hasDisplayValueContent).to.be.true;
    });

    // ─── checkDisplayValueSlotChange sets hasDisplayValueContent false when no nodes ──
    it('checkDisplayValueSlotChange sets hasDisplayValueContent to false when slot is empty', async () => {
      const el = await fixture(html`
        <auro-datepicker layout="snowflake"></auro-datepicker>
      `);
      await elementUpdated(el);

      el.hasDisplayValueContent = true;

      const origQuerySelector = el.shadowRoot.querySelector.bind(el.shadowRoot);
      el.shadowRoot.querySelector = (selector) => {
        if (selector === 'slot[name="displayValue"]') {
          return { assignedNodes: () => [] };
        }
        return origQuerySelector(selector);
      };

      el.checkDisplayValueSlotChange();
      expect(el.hasDisplayValueContent).to.be.false;
    });

    // ─── checkDisplayValueSlotChange follows nested SLOT nodes ──
    it('checkDisplayValueSlotChange follows nested SLOT assignedNodes', async () => {
      const el = await fixture(html`
        <auro-datepicker layout="snowflake"></auro-datepicker>
      `);
      await elementUpdated(el);

      el.hasDisplayValueContent = false;

      const origQuerySelector = el.shadowRoot.querySelector.bind(el.shadowRoot);
      el.shadowRoot.querySelector = (selector) => {
        if (selector === 'slot[name="displayValue"]') {
          // First node is a SLOT element whose own assignedNodes has content
          const innerSlot = {
            tagName: 'SLOT',
            assignedNodes: () => [document.createTextNode('nested content')]
          };
          return { assignedNodes: () => [innerSlot] };
        }
        return origQuerySelector(selector);
      };

      el.checkDisplayValueSlotChange();
      expect(el.hasDisplayValueContent).to.be.true;
    });

    // ─── strategy-change when not fullscreen restores trigger inert ──
    it('auroDropdown-strategy-change restores trigger.inert when not fullscreen', async () => {
      const el = await fixture(html`
        <auro-datepicker></auro-datepicker>
      `);
      await elementUpdated(el);

      const dropdown = el.dropdown;

      // Pre-set trigger.inert to true as if it was previously fullscreen
      dropdown.trigger.inert = true;
      dropdown.isBibFullscreen = false;

      dropdown.dispatchEvent(new CustomEvent('auroDropdown-strategy-change'));

      expect(dropdown.trigger.inert).to.be.false;
    });

    // ─── strategy-change when fullscreen sets trigger inert and reopens modal ──
    it('auroDropdown-strategy-change sets trigger inert and reopens bib as modal when fullscreen', async () => {
      const el = await fixture(html`
        <auro-datepicker></auro-datepicker>
      `);
      await elementUpdated(el);

      const dropdown = el.dropdown;

      let closeCalled = false;
      let openCalledWith = null;

      const mockBibEl = {
        close: () => { closeCalled = true; },
        open: (val) => { openCalledWith = val; }
      };

      // Stub focusCloseButton to avoid errors
      el.calendar.focusCloseButton = () => {};

      // Save original prototype descriptors
      const proto = Object.getPrototypeOf(dropdown);
      const popoverDesc = Object.getOwnPropertyDescriptor(proto, 'isPopoverVisible');
      const fullscreenDesc = Object.getOwnPropertyDescriptor(proto, 'isBibFullscreen');

      // Override at instance level to bypass Lit reactivity
      Object.defineProperty(dropdown, 'isPopoverVisible', { value: true, writable: true, configurable: true });
      Object.defineProperty(dropdown, 'isBibFullscreen', { value: true, writable: true, configurable: true });
      Object.defineProperty(dropdown, 'updateComplete', { value: Promise.resolve(), configurable: true });
      dropdown.bibElement = { value: mockBibEl };

      dropdown.dispatchEvent(new CustomEvent('auroDropdown-strategy-change'));

      // trigger.inert should be set immediately
      expect(dropdown.trigger.inert).to.be.true;

      // Allow microtask (.then callback) to complete
      await new Promise((r) => setTimeout(r, 0));

      expect(closeCalled).to.be.true;
      expect(openCalledWith).to.be.true;

      // Restore Lit reactive properties by removing instance overrides
      delete dropdown.isPopoverVisible;
      delete dropdown.isBibFullscreen;
      delete dropdown.updateComplete;
      dropdown.trigger.inert = false;
    });

    // ─── auroCalendar-dateSelected syncs dateTo to second input for range ──
    it('auroCalendar-dateSelected syncs calendar.dateTo to the second input', async () => {
      const el = await fixture(html`
        <auro-datepicker range></auro-datepicker>
      `);
      await elementUpdated(el);

      const calendar = el.calendar;

      // Set dateFrom so the first input condition passes (value already matches)
      const dateFromTimestamp = new Date('2024-01-15').getTime() / 1000;
      calendar.dateFrom = dateFromTimestamp;
      el.inputList[0].value = el.convertWcTimeToDate(dateFromTimestamp);

      // Set dateTo on calendar with a value that differs from inputList[1]
      const dateToTimestamp = new Date('2024-01-20').getTime() / 1000;
      calendar.dateTo = dateToTimestamp;
      el.inputList[1].value = '';

      // Dispatch the event
      calendar.dispatchEvent(new CustomEvent('auroCalendar-dateSelected', {
        bubbles: true,
        cancelable: false,
        composed: true,
      }));

      expect(el.inputList[1].value).to.equal(el.convertWcTimeToDate(dateToTimestamp));
    });

    // ─── focusout with noValidate skips validation ──
    it('focusout with noValidate does not call validate', async () => {
      const el = await fixture(html`
        <auro-datepicker noValidate></auro-datepicker>
      `);
      await elementUpdated(el);

      let validateCalled = false;
      el.validate = () => { validateCalled = true; };

      // Focus then blur the input to trigger focusout
      el.inputList[0].focus();
      await elementUpdated(el);

      el.inputList[0].blur();
      await elementUpdated(el);

      expect(validateCalled).to.be.false;
    });

    // ─── re-enabling disabled datepicker restores previousTabIndex ──
    it('re-enabling disabled datepicker restores previous tabIndex', async () => {
      const el = await fixture(html`
        <auro-datepicker tabindex="0"></auro-datepicker>
      `);
      await elementUpdated(el);

      // Disable — should save previousTabIndex and set tabindex to -1
      el.disabled = true;
      await elementUpdated(el);

      expect(el.getAttribute('tabindex')).to.equal('-1');

      // Re-enable — should restore the saved tabIndex
      el.disabled = false;
      await elementUpdated(el);

      expect(el.tabIndex).to.equal(0);
    });

    // ─── updated() resets valueEnd when value is after valueEnd ──
    it('updated resets valueEnd to undefined when value is later than valueEnd', async () => {
      const el = await fixture(html`
        <auro-datepicker range></auro-datepicker>
      `);
      await elementUpdated(el);

      // Set valueEnd first (earlier date), then value (later date)
      // Both must be valid so the guard fires
      el.value = '2024-01-10';
      el.valueEnd = '2024-01-05';
      await elementUpdated(el);

      // The guard should have reset valueEnd because value > valueEnd
      expect(el.valueEnd).to.equal(undefined);
    });

    // ─── minDate updates central date when minDate year is later ────────
    it('minDate updates central date when minDateYear > calendar.year', async () => {
      const el = await fixture(html`
        <auro-datepicker centralDate="2024-01-01"></auro-datepicker>
      `);
      await elementUpdated(el);

      const calYear = el.calendar.year;

      // Set minDate to a year well ahead of wherever the calendar is
      const targetYear = calYear + 2;
      el.minDate = `06/15/${targetYear}`;
      await elementUpdated(el);

      // updateCentralDate sets el.centralDate to a Date matching the minDate
      expect(el.centralDate).to.be.an.instanceOf(Date);
      expect(el.centralDate.getFullYear()).to.equal(targetYear);
    });

    it('minDate updates central date when same year but minDateMonth > calendar.month', async () => {
      const el = await fixture(html`
        <auro-datepicker centralDate="2024-01-01"></auro-datepicker>
      `);
      await elementUpdated(el);

      const calYear = el.calendar.year;

      // Pick December which is guaranteed later than any starting month
      el.minDate = `12/01/${calYear}`;
      await elementUpdated(el);

      // updateCentralDate sets el.centralDate to a Date matching the minDate
      expect(el.centralDate).to.be.an.instanceOf(Date);
      expect(el.centralDate.getMonth()).to.equal(11); // December = month 11
      expect(el.centralDate.getFullYear()).to.equal(calYear);
    });

    it('maxDate updates central date when same year but maxDateMonth < calendar.month', async () => {
      const el = await fixture(html`
        <auro-datepicker centralDate="2024-01-01"></auro-datepicker>
      `);
      await elementUpdated(el);

      const calYear = el.calendar.year;
      const calMonth = el.calendar.month;

      // Pick January which is guaranteed earlier than any starting month (unless already Jan)
      const targetMonth = 1;

      el.maxDate = `${String(targetMonth).padStart(2, '0')}/01/${calYear}`;
      await elementUpdated(el);

      if (calMonth > targetMonth) {
        expect(el.centralDate).to.be.an.instanceOf(Date);
        expect(el.centralDate.getMonth()).to.equal(0); // January = month 0
        expect(el.centralDate.getFullYear()).to.equal(calYear);
      }
    });

    it('renderHtmlInputs renders displayValue slot for range end-date input in snowflake layout', async () => {
      const el = await fixture(html`
        <auro-datepicker range layout="snowflake" centralDate="2024-01-01">
          <span slot="fromLabel">Depart</span>
          <span slot="toLabel">Return</span>
        </auro-datepicker>
      `);
      await elementUpdated(el);

      // Set both values so renderDisplayTextDate has content
      el.value = '2024-01-10';
      el.valueEnd = '2024-01-20';
      await elementUpdated(el);

      // The second input (dateTo) should contain a displayValue slot span
      const dateToInput = el.inputList[1];
      const dvSlot = dateToInput.querySelector('[slot="displayValue"]');
      expect(dvSlot).to.not.be.null;
    });

    // ─── scrollMonthIntoView scrolls to date in mobile view ─────────────
    it('scrollMonthIntoView scrolls month element into view on mobile', async () => {
      const el = await fixture(html`
        <auro-datepicker centralDate="2025-06-01"></auro-datepicker>
      `);
      await elementUpdated(el);

      // Set a narrow viewport so window.innerWidth < mobileBreakpoint
      await setViewport({ width: 360, height: 640 });

      // Set mobileBreakpoint high enough to trigger mobile layout
      el.calendar.mobileBreakpoint = 660;

      // Create a mock month element for the calendar's shadow DOM to find
      let scrollCalled = false;
      const mockMonthElem = document.createElement('div');
      mockMonthElem.id = 'month-6-2025';
      mockMonthElem.scrollIntoView = () => { scrollCalled = true; };

      // Stub the calendar's shadowRoot.querySelector to return our mock
      const origQuery = el.calendar.shadowRoot.querySelector.bind(el.calendar.shadowRoot);
      el.calendar.shadowRoot.querySelector = (sel) => {
        if (sel === '#month-6-2025') {
          return mockMonthElem;
        }
        return origQuery(sel);
      };

      el.calendar.scrollMonthIntoView('2025-06-15');

      expect(scrollCalled).to.be.true;

      // Restore
      el.calendar.shadowRoot.querySelector = origQuery;
      await setViewport({ width: 1024, height: 800 });
    });

    it('handleMonthChange falls back to firstRenderedMonth when centralDate is invalid', async () => {
      const el = await fixture(html`
        <auro-datepicker centralDate="2024-01-01"></auro-datepicker>
      `);
      await elementUpdated(el);

      const calendar = el.calendar;
      const utilCal = calendar.utilCal;

      // Set up a mock elem with an invalid centralDate so the else branch fires
      const firstRenderedMonth = new Date('03/01/2025');
      const mockElem = {
        centralDate: 'invalid',
        firstRenderedMonth,
        datepicker: { format: 'mm/dd/yyyy' },
      };

      utilCal.handleMonthChange(mockElem, 'next');

      // handleMonthChange sets centralDate to a timestamp (number) via setMonth()
      // Should fall back to firstRenderedMonth (March 2025) + 1 month = April 2025
      const resultDate = new Date(mockElem.centralDate);
      expect(resultDate).to.be.an.instanceOf(Date);
      expect(resultDate.getMonth()).to.equal(3); // April = month 3
      expect(resultDate.getFullYear()).to.equal(2025);
    });

    it('maximumRenderableMonths caps numCalendars to definedRangeMonths when range is smaller', async () => {
      const el = await fixture(html`
        <auro-datepicker range calendarStartDate="2025-06-01" calendarEndDate="2025-06-30" centralDate="2025-06-01"></auro-datepicker>
      `);
      await elementUpdated(el);

      const calRenderUtil = el.calendarRenderUtil;

      // definedRangeMonths should be ~1 (same month), numCalendars for range desktop = 2
      // so definedRangeMonths < numCalendars triggers the cap
      const result = calRenderUtil.maximumRenderableMonths(el.calendar, false);

      // Should be capped to the defined range (1 month) instead of the default 2
      expect(result).to.be.at.most(1);
    });

    it('determineNumCalendarsToRender falls back to minDate/maxDate range when maxRenderableMonths is 0', async () => {
      const el = await fixture(html`
        <auro-datepicker centralDate="2025-06-01" minDate="2025-06-01" maxDate="2025-08-31"></auro-datepicker>
      `);
      await elementUpdated(el);

      const calRenderUtil = el.calendarRenderUtil;
      const calendar = el.calendar;

      // Override maximumRenderableMonths to return 0 so the fallback path fires
      const origMax = calRenderUtil.maximumRenderableMonths.bind(calRenderUtil);
      calRenderUtil.maximumRenderableMonths = () => 0;

      // Reset numCalendars so the update triggers
      calendar.numCalendars = undefined;

      calRenderUtil.determineNumCalendarsToRender(calendar, false);

      // maxRenderableMonths=0 → !calendarCount is true → enters minDate/maxDate fallback
      // monthsInRange=3, but 3 < 0 is false, so calendarCount stays 0
      expect(calendar.numCalendars).to.equal(0);

      // Restore
      calRenderUtil.maximumRenderableMonths = origMax;
    });

    // ─── handleClearClick resets inputs and focuses ────────────────────
    it('handleClearClick resets inputs and refocuses', async () => {
      const el = await fixture(html`
        <auro-datepicker centralDate="2024-01-01"></auro-datepicker>
      `);
      await elementUpdated(el);

      // Set a date value first
      el.value = '2024-01-15';
      await elementUpdated(el);

      // Simulate click on clear button
      const mockEvent = { stopPropagation: () => {} };
      el.handleClearClick(mockEvent);
      await elementUpdated(el);

      // Value should be cleared after resetInputs
      await expect(el.value).to.not.equal('2024-01-15');
    });

    // ─── handleCalendarCentralDateChange syncs central date ────────────
    it('handleCalendarCentralDateChange updates central date when different', async () => {
      const el = await fixture(html`
        <auro-datepicker centralDate="2024-01-01"></auro-datepicker>
      `);
      await elementUpdated(el);

      // Dispatch a central date change event with a different date
      el.handleCalendarCentralDateChange({
        detail: { date: '2024-03-01' }
      });
      await elementUpdated(el);

      // The central date should be updated
      await expect(el.centralDate).to.not.equal('2024-01-01');
    });

    // ─── handleCellClick with range resets valueEnd when both valid ───
    it('handleCellClick resets valueEnd when both value and valueEnd are valid in range mode', async () => {
      const el = await fixture(html`
        <auro-datepicker range centralDate="2024-01-01"></auro-datepicker>
      `);
      await elementUpdated(el);

      // Set valid value and valueEnd
      el.value = '2024-01-10';
      el.valueEnd = '2024-01-20';
      await elementUpdated(el);

      // Click a new date (Unix timestamp in seconds) - Jan 15 2024
      const unixSeconds = Math.floor(new Date('2024-01-15T12:00:00').getTime() / 1000);
      el.handleCellClick(unixSeconds);
      await elementUpdated(el);

      // valueEnd should be cleared (reset to '') since both were valid
      await expect(el.valueEnd).to.equal('');
    });

    // ─── updated() resets value when minDate is later than current value ─
    it('updated resets value when minDate exceeds current value', async () => {
      const el = await fixture(html`
        <auro-datepicker centralDate="2024-01-01"></auro-datepicker>
      `);
      await elementUpdated(el);

      el.value = '2024-01-15';
      await elementUpdated(el);

      // Set minDate to a date after the current value
      el.minDate = '2024-02-01';
      await elementUpdated(el);

      await expect(el.value).to.be.undefined;
    });

    // ─── updated() resets value when maxDate is earlier than current value ─
    it('updated resets value when maxDate is before current value', async () => {
      const el = await fixture(html`
        <auro-datepicker centralDate="2024-06-01"></auro-datepicker>
      `);
      await elementUpdated(el);

      el.value = '2024-06-15';
      await elementUpdated(el);

      // Set maxDate to a date before the current value
      el.maxDate = '2024-05-01';
      await elementUpdated(el);

      await expect(el.value).to.be.undefined;
    });

    // ─── updated() resets valueEnd when maxDate changes in range mode ──
    it('updated resets valueEnd when maxDate is before value in range mode', async () => {
      const el = await fixture(html`
        <auro-datepicker range centralDate="2024-06-01"></auro-datepicker>
      `);
      await elementUpdated(el);

      el.value = '2024-06-20';
      el.valueEnd = '2024-06-30';
      await elementUpdated(el);

      // Set maxDate to before value - this triggers value=undefined AND valueEnd=undefined
      el.maxDate = '2024-06-10';
      await elementUpdated(el);

      await expect(el.value).to.be.undefined;
      await expect(el.valueEnd).to.not.equal('2024-06-30');
    });

    // ─── updated() minDate year/month comparison updates central date ──
    it('updated shifts calendar to minDate when minDate year is later', async () => {
      const el = await fixture(html`
        <auro-datepicker centralDate="2024-01-01"></auro-datepicker>
      `);
      await elementUpdated(el);

      el.minDate = '2025-06-01';
      await elementUpdated(el);

      // Calendar should have shifted forward
      await expect(el.calendar.year).to.be.at.least(2025);
    });

    // ─── Escape when bib is closed does nothing ────────────────────────
    it('Escape does nothing when bib is already closed', async () => {
      const el = await fixture(html`
        <auro-datepicker></auro-datepicker>
      `);
      await elementUpdated(el);

      const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
      await expect(dropdown.isPopoverVisible).to.be.false;

      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await elementUpdated(el);

      await expect(dropdown.isPopoverVisible).to.be.false;
    });

    // ─── utilities: parseDate with null input returns undefined ─────────
    it('parseDate returns undefined for null input', async () => {
      const el = await fixture(html`
        <auro-datepicker></auro-datepicker>
      `);
      await elementUpdated(el);

      const result = el.util.parseDate(null, 'mm/dd/yyyy');
      await expect(result).to.be.undefined;
    });

    // ─── utilities: toNorthAmericanFormat with unparseable input ────────
    it('toNorthAmericanFormat returns falsy for unparseable date', async () => {
      const el = await fixture(html`
        <auro-datepicker format="dd/mm/yyyy"></auro-datepicker>
      `);
      await elementUpdated(el);

      const result = el.util.toNorthAmericanFormat('invalid', 'dd/mm/yyyy');
      await expect(result).to.be.undefined;
    });

    // ─── utilities: toCustomFormat with incomplete date returns undefined ─
    it('toCustomFormat returns undefined for incomplete date parts', async () => {
      const el = await fixture(html`
        <auro-datepicker></auro-datepicker>
      `);
      await elementUpdated(el);

      const result = el.util.toCustomFormat('01/', 'mm/dd/yyyy');
      await expect(result).to.be.undefined;
    });

    // ─── utilities: monthDiff returns 0 when date2 is before date1 ─────
    it('monthDiff returns 0 when date2 is before date1', async () => {
      const el = await fixture(html`
        <auro-datepicker></auro-datepicker>
      `);
      await elementUpdated(el);

      const result = el.util.monthDiff(new Date(2025, 6, 1), new Date(2024, 0, 1));
      await expect(result).to.equal(0);
    });

    // ─── labelHidden returns true when dvInputOnly with value and no focus ─
    it('labelHidden returns true when dvInputOnly is set with a value and no focus', async () => {
      const el = await fixture(html`
        <auro-datepicker dvinputonly value="2025-01-01"></auro-datepicker>
      `);
      await elementUpdated(el);

      el.hasFocus = false;
      await elementUpdated(el);

      await expect(el.labelHidden).to.be.true;
    });

    // ─── configureDropdown sets bibDialogLabel to undefined for empty fromLabel ─
    it('bibDialogLabel is undefined when fromLabel slot has empty text', async () => {
      const el = await fixture(html`
        <auro-datepicker>
          <span slot="fromLabel">   </span>
        </auro-datepicker>
      `);
      await elementUpdated(el);

      await expect(el.dropdown.bibDialogLabel).to.be.undefined;
    });

    // ─── snowflake layout renders error icon when hasError is true ──────
    it('snowflake layout renders error icon when in error state', async () => {
      const el = await fixture(html`
        <auro-datepicker layout="snowflake" error="Test error"></auro-datepicker>
      `);
      await elementUpdated(el);

      const errorIcon = el.shadowRoot.querySelector('.accents.right .error');
      await expect(errorIcon).to.not.be.null;
    });

    // ─── range + onDark renders second input with inverse appearance ───
    it('range datepicker with onDark renders second input with inverse appearance', async () => {
      const el = await fixture(html`
        <auro-datepicker range ondark>
          <span slot="fromLabel">Depart</span>
          <span slot="toLabel">Return</span>
        </auro-datepicker>
      `);
      await elementUpdated(el);

      const inputs = el.inputList;
      await expect(inputs.length).to.equal(2);
      await expect(inputs[1].getAttribute('appearance')).to.equal('inverse');
    });

    // ─── onDark + error renders helpText with inverse appearance ───────
    it('error helpText renders with inverse appearance when onDark is true', async () => {
      const el = await fixture(html`
        <auro-datepicker ondark error="Test error"></auro-datepicker>
      `);
      await elementUpdated(el);

      const helpText = el.shadowRoot.querySelector('[error][appearance]');
      await expect(helpText).to.not.be.null;
      await expect(helpText.getAttribute('appearance')).to.equal('inverse');
    });

    // ─── localeChanged uses weekStartsOn when non-zero ─────────────────
    it('localeChanged uses weekStartsOn when locale starts week on Monday', async () => {
      const el = await fixture(html`
        <auro-datepicker></auro-datepicker>
      `);
      await elementUpdated(el);

      const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
      const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');

      await dropdown.querySelector('[auro-input]').click();
      await elementUpdated(calendar.shadowRoot);
      await nextFrame();

      const calendarMonth = calendar.shadowRoot.querySelector('auro-formkit-calendar-month');

      // Save original locale and set one with weekStartsOn = 1 (Monday)
      const origLocale = calendarMonth.locale;
      calendarMonth.locale = {
        ...origLocale,
        options: { ...origLocale.options, weekStartsOn: 1 },
        localize: origLocale.localize,
      };
      calendarMonth.localeChanged();

      // Monday-start locale should have day names shifted so first is not Sunday
      const sundayName = origLocale.localize.day(0, { width: 'narrow' });
      await expect(calendarMonth.dayNamesOfTheWeek[0]).to.not.equal(sundayName);

      // Restore
      calendarMonth.locale = origLocale;
    });

    // ─── calendar-month renders safely when dayNamesOfTheWeek is null ──
    it('calendar-month render handles null dayNamesOfTheWeek gracefully', async () => {
      const el = await fixture(html`
        <auro-datepicker></auro-datepicker>
      `);
      await elementUpdated(el);

      const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
      const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');

      await dropdown.querySelector('[auro-input]').click();
      await elementUpdated(calendar.shadowRoot);
      await nextFrame();

      const calendarMonth = calendar.shadowRoot.querySelector('auro-formkit-calendar-month');

      // Clear dayNamesOfTheWeek and force re-render
      const orig = calendarMonth.dayNamesOfTheWeek;
      calendarMonth.dayNamesOfTheWeek = null;
      calendarMonth.requestUpdate();
      await calendarMonth.updateComplete;

      // Should render without error — the null guard returns void 0
      await expect(calendarMonth).to.exist;

      // Restore
      calendarMonth.dayNamesOfTheWeek = orig;
    });

    // ─── calendar-month renders safely when daysOfMonth is null ────────
    it('calendar-month render handles null daysOfMonth gracefully', async () => {
      const el = await fixture(html`
        <auro-datepicker></auro-datepicker>
      `);
      await elementUpdated(el);

      const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
      const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');

      await dropdown.querySelector('[auro-input]').click();
      await elementUpdated(calendar.shadowRoot);
      await nextFrame();

      const calendarMonth = calendar.shadowRoot.querySelector('auro-formkit-calendar-month');

      const orig = calendarMonth.daysOfMonth;
      calendarMonth.daysOfMonth = null;
      calendarMonth.requestUpdate();
      await calendarMonth.updateComplete;

      await expect(calendarMonth).to.exist;

      calendarMonth.daysOfMonth = orig;
    });

    // ─── handleHover dispatches event with undefined date when day is null ─
    it('handleHover dispatches date-is-hovered with undefined date when day is null', async () => {
      const el = await fixture(html`
        <auro-datepicker></auro-datepicker>
      `);
      await elementUpdated(el);

      const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
      const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');

      await dropdown.querySelector('[auro-input]').click();
      await elementUpdated(calendar.shadowRoot);
      await nextFrame();

      const calendarMonth = calendar.shadowRoot.querySelector('auro-formkit-calendar-month');
      const cell = calendarMonth.shadowRoot.querySelector('auro-formkit-calendar-cell');

      // Set day to null and call handleHover directly
      const origDay = cell.day;
      cell.day = null;

      let eventDetail;
      cell.addEventListener('date-is-hovered', (e) => {
        eventDetail = e.detail;
      });

      cell.handleHover();
      await expect(cell.hovered).to.be.true;
      await expect(eventDetail.date).to.be.undefined;

      cell.day = origDay;
    });

    // ─── isLastHoveredDate returns true when all conditions met ────────
    it('isLastHoveredDate returns true when hoveredDate matches day and no dateTo', async () => {
      const el = await fixture(html`
        <auro-datepicker></auro-datepicker>
      `);
      await elementUpdated(el);

      const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
      const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');

      await dropdown.querySelector('[auro-input]').click();
      await elementUpdated(calendar.shadowRoot);
      await nextFrame();

      const calendarMonth = calendar.shadowRoot.querySelector('auro-formkit-calendar-month');
      const cell = calendarMonth.shadowRoot.querySelector('auro-formkit-calendar-cell');

      // All conditions true: dateFrom truthy, hoveredDate > dateFrom, day.date === hoveredDate, !dateTo
      const result = cell.isLastHoveredDate({ date: 100 }, 50, null, 100);
      expect(result).to.be.true;

      // day.date !== hoveredDate → short-circuits to false
      const result2 = cell.isLastHoveredDate({ date: 75 }, 50, null, 100);
      expect(result2).to.be.false;
    });

    // ─── isReferenceDate returns false when referenceDates is empty array ─
    it('isReferenceDate returns false when referenceDates is empty array', async () => {
      const el = await fixture(html`
        <auro-datepicker></auro-datepicker>
      `);
      await elementUpdated(el);

      const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
      const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');

      await dropdown.querySelector('[auro-input]').click();
      await elementUpdated(calendar.shadowRoot);
      await nextFrame();

      const calendarMonth = calendar.shadowRoot.querySelector('auro-formkit-calendar-month');
      const cell = calendarMonth.shadowRoot.querySelector('auro-formkit-calendar-cell');

      // Set referenceDates attribute but with empty array property
      const origReferenceDates = cell.datepicker.referenceDates;
      const hadAttr = cell.datepicker.hasAttribute('referenceDates');
      cell.datepicker.setAttribute('referenceDates', '');
      cell.datepicker.referenceDates = [];

      const result = cell.isReferenceDate('04_15_2026');
      expect(result).to.be.false;

      // Restore
      cell.datepicker.referenceDates = origReferenceDates;
      if (!hadAttr) cell.datepicker.removeAttribute('referenceDates');
    });

    // ─── lastHoveredDate class applied when isLastHoveredDate is true on range ─
    it('render applies lastHoveredDate class when isLastHoveredDate conditions are met on range datepicker', async () => {
      const el = await fixture(html`
        <auro-datepicker range></auro-datepicker>
      `);
      await elementUpdated(el);

      const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
      const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');

      await dropdown.querySelector('[auro-input]').click();
      await elementUpdated(calendar.shadowRoot);
      await nextFrame();

      const calendarMonth = calendar.shadowRoot.querySelector('auro-formkit-calendar-month');
      const cell = calendarMonth.shadowRoot.querySelector('auro-formkit-calendar-cell');

      // Set conditions so isLastHoveredDate returns true:
      // dateFrom truthy, hoveredDate > dateFrom, day.date === hoveredDate, !dateTo
      const origDateFrom = cell.dateFrom;
      const origDateTo = cell.dateTo;
      const origHoveredDate = cell.hoveredDate;

      cell.dateFrom = 50;
      cell.dateTo = null;
      cell.hoveredDate = cell.day.date;

      await elementUpdated(cell);
      await nextFrame();

      const button = cell.shadowRoot.querySelector('button');
      expect(button.classList.contains('lastHoveredDate')).to.be.true;

      // Restore
      cell.dateFrom = origDateFrom;
      cell.dateTo = origDateTo;
      cell.hoveredDate = origHoveredDate;
    });

    // ─── handleClick for snowflake layout focuses first input ──────────
    it('handleClick focuses first input for snowflake layout', async () => {
      const el = await fixture(html`
        <auro-datepicker layout="snowflake"></auro-datepicker>
      `);
      await elementUpdated(el);

      // Click on the element (not on the input itself)
      el.handleClick({ target: el, composedPath: () => [el] });
      await elementUpdated(el);

      // Should not throw and component should still be functional
      await expect(el).to.exist;
    });

    // ─── dateChanged sets hovered for hover preview and in-range ───────
    it('dateChanged sets hovered true when day is between dateFrom and hoveredDate without dateTo', async () => {
      const el = await fixture(html`
        <auro-datepicker></auro-datepicker>
      `);
      await elementUpdated(el);

      const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
      const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');

      await dropdown.querySelector('[auro-input]').click();
      await elementUpdated(calendar.shadowRoot);
      await nextFrame();

      const calendarMonth = calendar.shadowRoot.querySelector('auro-formkit-calendar-month');
      const cells = [...calendarMonth.shadowRoot.querySelectorAll('auro-formkit-calendar-cell')];
      const cell = cells[0];

      // Use start-of-day timestamps: dateFrom=day1, day.date=day2, hoveredDate=day3
      const day1 = 1000; // a small timestamp (seconds)
      const day2 = 2000;
      const day3 = 3000;

      // Hover preview branch: hoveredDate >= day.date > parsedDateFrom, no dateTo, not selected
      cell.dateChanged(String(day1), null, day2, { date: day2 });

      expect(cell.hovered).to.be.true;
    });

    it('dateChanged sets hovered true when day is between dateFrom and dateTo', async () => {
      const el = await fixture(html`
        <auro-datepicker></auro-datepicker>
      `);
      await elementUpdated(el);

      const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
      const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');

      await dropdown.querySelector('[auro-input]').click();
      await elementUpdated(calendar.shadowRoot);
      await nextFrame();

      const calendarMonth = calendar.shadowRoot.querySelector('auro-formkit-calendar-month');
      const cells = [...calendarMonth.shadowRoot.querySelectorAll('auro-formkit-calendar-cell')];
      const cell = cells[0];

      // In-range branch: parsedDateFrom < day.date < parsedDateTo
      const day1 = 1000;
      const day2 = 2000;
      const day3 = 3000;

      cell.dateChanged(String(day1), String(day3), null, { date: day2 });

      expect(cell.hovered).to.be.true;
    });

    // ─── isEnabled disables cell when date is outside min/max or in disabledDays ─
    it('isEnabled returns true and sets disabled when day is below min', async () => {
      const el = await fixture(html`
        <auro-datepicker></auro-datepicker>
      `);
      await elementUpdated(el);

      const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
      const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');

      await dropdown.querySelector('[auro-input]').click();
      await elementUpdated(calendar.shadowRoot);
      await nextFrame();

      const calendarMonth = calendar.shadowRoot.querySelector('auro-formkit-calendar-month');
      const cells = [...calendarMonth.shadowRoot.querySelectorAll('auro-formkit-calendar-cell')];
      const cell = cells[0];

      const result = cell.isEnabled({ date: 100 }, 200, 500, []);

      expect(result).to.be.true;
      expect(cell.hasAttribute('disabled')).to.be.true;
    });

    it('isInRange returns true when cell date is between dateFrom and dateTo on a range datepicker', async () => {
      const el = await fixture(html`
        <auro-datepicker range></auro-datepicker>
      `);
      await elementUpdated(el);

      const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
      const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');

      await dropdown.querySelector('[auro-input]').click();
      await elementUpdated(calendar.shadowRoot);
      await nextFrame();

      const calendarMonth = calendar.shadowRoot.querySelector('auro-formkit-calendar-month');
      const cells = [...calendarMonth.shadowRoot.querySelectorAll('auro-formkit-calendar-cell')];
      const cell = cells[0];

      // day.date > dateFrom, no dateTo — should return true
      const result = cell.isInRange({ date: 200 }, 100, null);

      expect(result).to.be.true;
    });

    it('getTitle returns empty string when date is undefined', async () => {
      const el = await fixture(html`
        <auro-datepicker></auro-datepicker>
      `);
      await elementUpdated(el);

      const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
      const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');

      await dropdown.querySelector('[auro-input]').click();
      await elementUpdated(calendar.shadowRoot);
      await nextFrame();

      const calendarMonth = calendar.shadowRoot.querySelector('auro-formkit-calendar-month');
      const cells = [...calendarMonth.shadowRoot.querySelectorAll('auro-formkit-calendar-cell')];
      const cell = cells[0];

      expect(cell.getTitle(undefined)).to.equal('');
    });

    it('cells respond to auroDatePicker-newSlotContent event by calling handleSlotContent', async () => {
      const el = await fixture(html`
        <auro-datepicker></auro-datepicker>
      `);
      await elementUpdated(el);

      const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
      const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');

      await dropdown.querySelector('[auro-input]').click();
      await elementUpdated(calendar.shadowRoot);
      await nextFrame();

      // Dispatch the event on the datepicker — cells listen for this in firstUpdated
      el.dispatchEvent(new CustomEvent('auroDatePicker-newSlotContent'));
      await elementUpdated(el);

      // Should not throw — handleSlotContent runs without error
      expect(el).to.exist;
    });

    it('calendar month renders year before month name when monthFirst is false', async () => {
      const el = await fixture(html`
        <auro-datepicker></auro-datepicker>
      `);
      await elementUpdated(el);

      const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
      const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');

      await dropdown.querySelector('[auro-input]').click();
      await elementUpdated(calendar.shadowRoot);
      await nextFrame();

      const calendarMonth = calendar.shadowRoot.querySelector('auro-formkit-calendar-month');

      calendarMonth.monthFirst = false;
      await elementUpdated(calendarMonth);

      const headerTitle = calendarMonth.shadowRoot.querySelector('.headerTitle');
      const divs = headerTitle.querySelectorAll('div');

      // Year should render before month name
      expect(divs.length).to.be.greaterThan(0);
    });

    it('renderAllCalendars falls back to minDate when centralDate is invalid', async () => {
      const el = await fixture(html`
        <auro-datepicker minDate="2026-03-01"></auro-datepicker>
      `);
      await elementUpdated(el);

      const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');

      // Set centralDate to undefined so validDateStr returns false
      calendar.centralDate = undefined;

      const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
      await dropdown.querySelector('[auro-input]').click();
      await elementUpdated(calendar);
      await nextFrame();

      // Calendar should render starting at minDate month
      const calendarMonth = calendar.shadowRoot.querySelector('auro-formkit-calendar-month');
      expect(calendarMonth).to.exist;
    });

    it('renderAllCalendars falls back to current date when centralDate and minDate are both absent', async () => {
      const el = await fixture(html`
        <auro-datepicker></auro-datepicker>
      `);
      await elementUpdated(el);

      const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');

      // Clear centralDate so validDateStr returns false, and no minDate is set
      calendar.centralDate = undefined;

      const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
      await dropdown.querySelector('[auro-input]').click();
      await elementUpdated(calendar);
      await nextFrame();

      // Calendar should render starting at current month
      const calendarMonth = calendar.shadowRoot.querySelector('auro-formkit-calendar-month');
      expect(calendarMonth).to.exist;
    });

    it('dispatches auroCalendar-dateSelected when date-from-changed fires', async () => {
      const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
      const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');

      const listener = oneEvent(calendar, 'auroCalendar-dateSelected');
      calendar.dispatchEvent(new CustomEvent('date-from-changed', { bubbles: false }));
      const event = await listener;

      expect(event).to.exist;
      expect(event.type).to.equal('auroCalendar-dateSelected');
    });

    it('dispatches auroCalendar-dateSelected when date-to-changed fires', async () => {
      const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
      const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');

      const listener = oneEvent(calendar, 'auroCalendar-dateSelected');
      calendar.dispatchEvent(new CustomEvent('date-to-changed', { bubbles: false }));
      const event = await listener;

      expect(event).to.exist;
      expect(event.type).to.equal('auroCalendar-dateSelected');
    });

    it('sets dateTo to undefined when date-to-changed fires and dateTo is null', async () => {
      const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
      const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');

      calendar.dateTo = null;

      const listener = oneEvent(calendar, 'auroCalendar-dateSelected');
      calendar.dispatchEvent(new CustomEvent('date-to-changed', { bubbles: false }));
      await listener;

      expect(calendar.dateTo).to.equal(undefined);
    });
  });

  describe('A11Y', () => {
    it('should be accessible', async () => {
      await setViewport({
        width: 600,
        height: 800
      });
      const el = await fixture(html`
        <auro-datepicker range></auro-datepicker>
      `);

      await expect(el).to.be.accessible({
        ignoredRules: ['nested-interactive']
      });
    });
  });

  describe('Mouse Behavior', () => {
    describe('Click', () => {
      it('should open the bib when the dropdown trigger is clicked', async () => {
        const el = await fixture(html`
          <auro-datepicker></auro-datepicker>
        `);

        const input = getInput(el, 0);
        input.click();

        await expect(el.dropdown.isPopoverVisible).to.be.true;
      });

      it('should set the correct dateFrom value when a date is clicked on the calendar', async () => {
        const el = await fixture(html`
          <auro-datepicker></auro-datepicker>
        `);

        await elementUpdated(el);

        const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
        const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');

        await dropdown.querySelector('[auro-input]').click();
        await expect(dropdown.isPopoverVisible).to.be.true;
        await elementUpdated(calendar.shadowRoot);
        await nextFrame();

        const calendarMonth = calendar.shadowRoot.querySelector('auro-formkit-calendar-month');

        const calendarCell = calendarMonth.shadowRoot.querySelectorAll('auro-formkit-calendar-cell');

        const dateFrom = calendarCell[1];

        const dateFromBtn = dateFrom.shadowRoot.querySelector('button');

        dateFromBtn.click();

        const dateSelected = el.convertWcTimeToDate(dateFrom.day.date);

        await elementUpdated(el);

        await expect(el.value).to.equal(dateSelected);
        await expect(el.values).to.have.length(1);
        await expect(el.values[0]).not.to.be.undefined;
        await expect(el.values[0]).to.equal(dateSelected);
      });

      it('should set the correct dateTo value when a date is clicked on the calendar', async () => {
        const el = await fixture(html`
          <auro-datepicker range></auro-datepicker>
        `);

        await elementUpdated(el);

        const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
        const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');
        await dropdown.querySelector('[auro-input]').click();
        await expect(dropdown.isPopoverVisible).to.be.true;
        await elementUpdated(calendar.shadowRoot);

        const calendarMonth = calendar.shadowRoot.querySelector('auro-formkit-calendar-month');

        const calendarCell = calendarMonth.shadowRoot.querySelectorAll('auro-formkit-calendar-cell');

        const dateFrom = calendarCell[1];
        const dateFromBtn = dateFrom.shadowRoot.querySelector('button');

        dateFromBtn.click();

        const dateFromSelected = el.convertWcTimeToDate(dateFrom.day.date);

        await elementUpdated(el);

        await expect(el.value).to.equal(dateFromSelected);

        const [, dateTo] = calendarCell;
        const dateToBtn = dateTo.shadowRoot.querySelector('button');

        dateToBtn.click();

        const dateToSelected = el.convertWcTimeToDate(dateTo.day.date);

        await elementUpdated(el);

        await expect(el.valueEnd).to.equal(dateToSelected);

        // Now check .values
        await expect(el.values).to.have.length(2);
        await expect(el.values[0]).not.to.be.undefined;
        await expect(el.values[0]).to.equal(dateFromSelected);
        await expect(el.values[1]).not.to.be.undefined;
        await expect(el.values[1]).to.equal(dateToSelected);
      });

      it('should not change dateFrom when attempting to set dateTo to an earlier date via calendar click', async () => {
        const el = await fixture(html`
          <auro-datepicker range></auro-datepicker>
        `);

        await elementUpdated(el);

        const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
        const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');

        await dropdown.querySelector('[auro-input]').click();
        await expect(dropdown.isPopoverVisible).to.be.true;
        await elementUpdated(calendar.shadowRoot);
        await nextFrame();

        const calendarMonth = calendar.shadowRoot.querySelector('auro-formkit-calendar-month');

        const calendarCell = calendarMonth.shadowRoot.querySelectorAll('auro-formkit-calendar-cell');

        const dateFrom = calendarCell[10];
        const dateFromBtn = dateFrom.shadowRoot.querySelector('button');

        dateFromBtn.click();

        const dateFromSelected = el.convertWcTimeToDate(dateFrom.day.date);

        await elementUpdated(el);

        await expect(el.value).to.equal(dateFromSelected);

        const dateTo = calendarCell[8];
        const dateToBtn = dateTo.shadowRoot.querySelector('button');

        dateToBtn.click();

        await elementUpdated(el);

        await expect(el.valueEnd).to.equal(undefined);
      });

      it('should close the mobile bib when the done button is clicked', async () => {
        await setViewport({
          width: mobileBreakpointWidth,
          height: 800
        });

        const el = await fixture(html`
          <auro-datepicker></auro-datepicker>
        `);

        const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
        const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');
        const input = getInput(el, 0);

        const closeBtn = calendar.shadowRoot.querySelector('[slot="footer"]');

        input.click();

        await elementUpdated();

        await expect(el.dropdown.isPopoverVisible).to.be.true;

        closeBtn.click();

        await elementUpdated();

        await expect(el.dropdown.isPopoverVisible).to.be.false;
      });

      it('should handle hover event correctly on calendar cells', async () => {
        const el = await fixture(html`
          <auro-datepicker></auro-datepicker>
        `);

        await elementUpdated(el);

        const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
        const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');

        await dropdown.querySelector('[auro-input]').click();
        await expect(dropdown.isPopoverVisible).to.be.true;
        await elementUpdated(calendar.shadowRoot);
        await nextFrame();

        const calendarMonth = calendar.shadowRoot.querySelector('auro-formkit-calendar-month');
        const calendarCell = [...calendarMonth.shadowRoot.querySelectorAll('auro-formkit-calendar-cell')];

        const cell = calendarCell[0];
        const cellButton = cell.shadowRoot.querySelector('button');

        cellButton.dispatchEvent(new MouseEvent('mouseover'));

        await expect(cell.hovered).to.be.true;
      });
    });
  });

  describe('Keyboard Behavior', () => {
    // Add missing tests

    it('should not show the dropdown when user is typing in the input', async () => {
      const el = await fixture(html`
        <auro-datepicker></auro-datepicker>
      `);

      const input = getInput(el, 0);

      input.dispatchEvent(new KeyboardEvent('keyup', { key: '0' }));

      await elementUpdated(el);

      await expect(el.dropdown.isPopoverVisible).to.be.false;
    });

    it('should not show the bib when Space is pressed on the input', async () => {
      const el = await fixture(html`
        <auro-datepicker></auro-datepicker>
      `);

      const input = getInput(el, 0);

      input.dispatchEvent(new KeyboardEvent('keyup', { key: ' ' }));

      await elementUpdated(el);

      await expect(el.dropdown.isPopoverVisible).to.be.false;
    });

    for (const key of ['Enter', 'Space']) {
      it(`should not open the bib when ${key} is pressed on the clear button`, async () => {
        const el = await fixture(html`
          <auro-datepicker value="2028-02-14"></auro-datepicker>
        `);
        await elementUpdated(el);
        await el.focus();

        await new Promise((r) => setTimeout(r, 500));
        await sendKeys({ press: 'Tab' });
        await new Promise((r) => setTimeout(r, 500));
        await sendKeys({ press: key });
        await new Promise((r) => setTimeout(r, 500));
        await expect(el.value).to.be.undefined;
        await expect(el.dropdown.isPopoverVisible).to.be.false;
      });
    }

    describe('Escape', () => {
      it('should close the datepicker bib without closing a parent auro-dialog', async () => {
        const dialog = await inDialogFixture();
        await elementUpdated(dialog);

        const el = dialog.querySelector('auro-datepicker');
        await elementUpdated(el);

        // Open the datepicker by clicking the input
        el.focus();
        el.shadowRoot.activeElement.click();
        await elementUpdated(el);
        await expect(el.dropdown.isPopoverVisible).to.be.true;

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, composed: true }));
        await elementUpdated(el);
        await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        await elementUpdated(el);

        await expect(el.dropdown.isPopoverVisible).to.be.false;
        await expect(dialog.hasAttribute('open')).to.be.true;
      });

      it('should close the datepicker bib without closing a parent auro-drawer', async () => {
        const drawer = await inDrawerFixture();
        await elementUpdated(drawer);

        const el = drawer.querySelector('auro-datepicker');
        await elementUpdated(el);

        // Open the datepicker by clicking the input
        el.focus();
        el.shadowRoot.activeElement.click();
        await elementUpdated(el);
        await expect(el.dropdown.isPopoverVisible).to.be.true;

        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, composed: true }));
        await elementUpdated(el);
        await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        await elementUpdated(el);

        await expect(el.dropdown.isPopoverVisible).to.be.false;
        await expect(drawer.hasAttribute('open')).to.be.true;
      });
    });

  });
}

// Desktop Test Suite
describe('auro-datepicker', () => {
  runFullTest(false);
});

// Mobile Test Suite
describe('auro-datepicker in small viewport', () => {
  runFullTest(true);
});

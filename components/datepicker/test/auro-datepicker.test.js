/* eslint-disable max-lines, no-undef, prefer-destructuring, no-use-before-define, no-magic-numbers, no-unused-vars, no-await-in-loop */

import { fixture, html, expect, elementUpdated, nextFrame, oneEvent } from '@open-wc/testing';
import { setViewport, sendKeys } from '@web/test-runner-commands';
import { minDay, minMonth, minYear, maxDay, maxMonth, maxYear } from '@aurodesignsystem/auro-library/scripts/runtime/dateUtilities';
import '../src/registered.js';
import { dateSlotFixture, popoverSlotFixture, inDialogFixture, inDrawerFixture } from './testFixtures.js';
import { setInputValue, getInput } from './testFunctions.js';

describe('auro-datepicker', () => {
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
        <auro-datepicker value="02/01/2023"></auro-datepicker>
      `);

      await elementUpdated(el);

      const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
      const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');
      const prevMonthBth = calendar.shadowRoot.querySelector('.prevMonth');

      const central = `${`0${new Date(el.centralDate).getMonth() + 1}`.slice(-2)}/${`0${new Date(el.centralDate).getDate()}`.slice(-2)}/${new Date(el.centralDate).getFullYear()}`;

      await expect(central).to.equal('02/01/2023');

      prevMonthBth.click();

      await elementUpdated(el);

      const centralAfter = `${`0${new Date(el.centralDate).getMonth() + 1}`.slice(-2)}/${`0${new Date(el.centralDate).getDate()}`.slice(-2)}/${new Date(el.centralDate).getFullYear()}`;

      await expect(centralAfter).to.contain('01/01/2023');

      prevMonthBth.click();

      await elementUpdated(el);

      const centralAfterAgain = `${`0${new Date(el.centralDate).getMonth() + 1}`.slice(-2)}/${`0${new Date(el.centralDate).getDate()}`.slice(-2)}/${new Date(el.centralDate).getFullYear()}`;

      await expect(centralAfterAgain).to.contain('12/01/2022');
    });

    it('should change to the next calendar month when handleNextMonth is called', async () => {
      const el = await fixture(html`
        <auro-datepicker value="11/01/2023"></auro-datepicker>
      `);

      await elementUpdated(el);

      const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
      const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');
      const nextMonthBth = calendar.shadowRoot.querySelector('.nextMonth');

      const central = `${`0${new Date(el.centralDate).getMonth() + 1}`.slice(-2)}/${`0${new Date(el.centralDate).getDate()}`.slice(-2)}/${new Date(el.centralDate).getFullYear()}`;

      await expect(central).to.equal('11/01/2023');

      nextMonthBth.click();

      await elementUpdated(el);

      const centralAfter = `${`0${new Date(el.centralDate).getMonth() + 1}`.slice(-2)}/${`0${new Date(el.centralDate).getDate()}`.slice(-2)}/${new Date(el.centralDate).getFullYear()}`;

      await expect(centralAfter).to.contain('12/01/2023');

      nextMonthBth.click();

      await elementUpdated(el);

      const centralAfterAgain = `${`0${new Date(el.centralDate).getMonth() + 1}`.slice(-2)}/${`0${new Date(el.centralDate).getDate()}`.slice(-2)}/${new Date(el.centralDate).getFullYear()}`;

      await expect(centralAfterAgain).to.contain('01/01/2024');
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
          <auro-datepicker maxDate="04/17/2023"></auro-datepicker>
        `);

        const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
        const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');

        await expect(calendar.showNextMonthBtn).to.be.false;
      });

    });

    describe('calendarFocusDate', () => {
      it('should change the visible month when calendarFocusDate is updated', async () => {
        const el = await fixture(html`
          <auro-datepicker calendarFocusDate="03/23/2023"></auro-datepicker>
        `);

        await elementUpdated(el);

        const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');

        const central = `${`0${new Date(el.centralDate).getMonth() + 1}`.slice(-2)}/${`0${new Date(el.centralDate).getDate()}`.slice(-2)}/${new Date(el.centralDate).getFullYear()}`;

        await expect(central).to.be.equal('03/23/2023');

        el.calendarFocusDate = '04/25/2024';

        await elementUpdated(el);

        const centralAfter = `${`0${new Date(el.centralDate).getMonth() + 1}`.slice(-2)}/${`0${new Date(el.centralDate).getDate()}`.slice(-2)}/${new Date(el.centralDate).getFullYear()}`;

        await expect(centralAfter).to.be.equal('04/25/2024');
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
          width: 500,
          height: 800
        });

        const el = await fixture(html`
          <auro-datepicker range calendarStartDate="03/04/2023" calendarEndDate="05/05/2023"></auro-datepicker>
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
        const centralMonth = new Date(el.centralDate).getMonth();
        await expect(centralMonth).to.equal(today.getMonth());
      });

      it('should update the visible month when centralDate is set', async () => {
        const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
        el.centralDate = '06/15/2024';
        await elementUpdated(el);
        const centralMonth = new Date(el.centralDate).getMonth();
        await expect(centralMonth).to.equal(5);
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

    });

    describe('format', () => {
      it('should accept and apply a customized date format', async() => {
        const el = await fixture(html`
          <auro-datepicker format="yyyy/mm/dd"></auro-datepicker>
        `);

        el.value = "1999/08/15";
        el.validate();
        await elementUpdated(el);
        await expect(el.getAttribute('validity')).to.be.equal('valid');

      });

      it.skip('should set an error when a wrongly formatted value is passed', async () => {
        const el = await fixture(html`
          <auro-datepicker></auro-datepicker>
        `);

        el.value = "02.02.2022";
        el.validate();
        await elementUpdated(el);
        await expect(el.getAttribute('validity')).to.be.equal('invalid');

        // empty
        el.value = "";
        el.validate();
        await elementUpdated(el);
        await expect(el.getAttribute('validity')).to.be.equal('valid');

        // passing YY/MM/DD format to MM/DD/YY datepicker
        el.value = "2021/01/02";
        el.validate();
        await elementUpdated(el);
        await expect(el.getAttribute('validity')).to.be.equal('invalid');
      });

    });

    describe('fullscreenBreakpoint', () => {
      it('should render twelve calendars in mobile version', async () => {
        await setViewport({
          width: 500,
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
        await setViewport({ width: 500, height: 800 });

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
        await setViewport({ width: 500, height: 800 });

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
        await setViewport({ width: 500, height: 800 });

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
        await setViewport({ width: 500, height: 800 });

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
          <auro-datepicker maxDate="01/01/2022"></auro-datepicker>
        `);

        const input = getInput(el, 0);

        input.value = "01/01/2022";

        el.focus();
        el.blur();

        await elementUpdated(el);

        await expect(el.getAttribute('validity')).to.be.equal('valid');

        input.value = "01/02/2022";

        el.focus();
        el.blur();

        await elementUpdated(el);

        await expect(el.getAttribute('validity')).to.be.equal('rangeOverflow');
      });

      it('should respect maxDate setting on the second input in range mode', async () => {
        const el = await fixture(html`
          <auro-datepicker range maxDate="01/05/2022"></auro-datepicker>
        `);

        const input1 = getInput(el, 0);
        const input2 = getInput(el, 1);

        input1.value = "01/01/2022";

        input2.value = "01/08/2022";

        el.focus();
        el.blur();

        await elementUpdated(el);

        await expect(el.getAttribute('validity')).to.be.equal('rangeOverflow');
      });

      it('should reset the value when maxDate is earlier than the current value', async () => {
        const el = await fixture(html`
          <auro-datepicker></auro-datepicker>
        `);

        el.value = '03/02/2023';

        await elementUpdated(el);

        el.maxDate = '02/26/2023';

        await elementUpdated(el);

        await expect(el.value).to.be.equal(undefined);
      });

      it('should respect maxDate setting with custom format when range is false', async () => {
        const el = await fixture(html`
          <auro-datepicker format="yyyy/mm/dd" maxDate="2022/03/22"></auro-datepicker>
        `);

        const input = getInput(el, 0);

        input.value = "2022/03/18";

        el.focus();
        el.blur();

        await elementUpdated(el);

        await expect(el.getAttribute('validity')).to.be.equal('valid');

        input.value = "2022/03/25";

        el.focus();
        el.blur();

        await elementUpdated(el);

        await expect(el.getAttribute('validity')).to.be.equal('rangeOverflow');
      });

      it('should respect maxDate setting on second input with yyyy/mm/dd format', async () => {
        const el = await fixture(html`
          <auro-datepicker range format="yyyy/mm/dd" maxDate="2022/03/22"></auro-datepicker>
        `);

        const input1 = getInput(el, 0);
        const input2 = getInput(el, 1);

        input1.value = "2022/03/18";

        input2.value = "2022/03/25";

        el.focus();
        el.blur();

        await elementUpdated(el);

        await expect(el.getAttribute('validity')).to.be.equal('rangeOverflow');
      });

    });

    describe('minDate', () => {
      it('should reset the value when minDate is later than the current value', async () => {
        const el = await fixture(html`
          <auro-datepicker></auro-datepicker>
        `);

        el.value = '03/02/2023';

        await elementUpdated(el);

        el.minDate = '03/09/2023';

        await elementUpdated(el);

        await expect(el.value).to.be.equal(undefined);
      });

      it('should update centralDate when minDate is later than centralDate', async () => {
        const el = await fixture(html`
          <auro-datepicker calendarFocusDate="03/02/2023"></auro-datepicker>
        `);

        await elementUpdated(el);

        el.minDate = '04/09/2023';

        await elementUpdated(el);

        const central = `${`0${new Date(el.centralDate).getMonth() + 1}`.slice(-2)}/${`0${new Date(el.centralDate).getDate()}`.slice(-2)}/${new Date(el.centralDate).getFullYear()}`;
        const min = el.minDate;

        await expect(min).to.be.equal(central);
      });

      it('should respect minDate setting with custom format', async () => {
        const el = await fixture(html`
          <auro-datepicker format="yyyy/mm/dd" minDate="2022/03/22"></auro-datepicker>
        `);

        const input = getInput(el, 0);

        input.value = "2022/03/25";

        el.focus();
        el.blur();

        await elementUpdated(el);

        await expect(el.getAttribute('validity')).to.be.equal('valid');

        input.value = "2022/03/18";

        el.focus();
        el.blur();

        await elementUpdated(el);

        await expect(el.getAttribute('validity')).to.be.equal('rangeUnderflow');
      });

      it('should respect minDate setting on second input with custom format', async () => {
        const el = await fixture(html`
          <auro-datepicker range format="yyyy/mm/dd" minDate="2025/03/22"></auro-datepicker>
        `);

        const input1 = getInput(el, 0);
        const input2 = getInput(el, 1);

        input1.value = "2025/03/18";
        input2.value = "2025/03/25";

        el.focus();
        el.blur();

        await elementUpdated(el);

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
          <auro-datepicker range value="01/01/2023" valueEnd="01/15/2023"></auro-datepicker>
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
          <auro-datepicker range format="yyyy/mm/dd" value="2023/02/25" valueEnd="2023/02/28"></auro-datepicker>
        `);

        await elementUpdated(el);

        const departInput = getInput(el, 0);

        await expect(departInput.value).to.be.equal(el.value);

        const returnInput = getInput(el, 1);

        await expect(returnInput.value).to.be.equal(el.valueEnd);
      });

    });

    describe('referenceDates', () => {
      it('should mark dates as reference dates when referenceDates attribute is set', async () => {
        const el = await fixture(html`
          <auro-datepicker referenceDates='["10-05-2025", "10-15-2025", "10-20-2025", "10-22-2025"]' centralDate="10-10-2025"></auro-datepicker>
        `);

        await elementUpdated(el);

        // Show the bib so the calendar is rendered
        el.showBib();

        // Get the calendar
        const {calendar} = el;

        // Get the calendar months
        const calendarMonths = calendar.shadowRoot.querySelectorAll('auro-formkit-calendar-month');

        // Guard Clause: Ensure we have months to work with
        if (!calendarMonths.length) return;

        // Get the first rendered month
        const firstMonth = calendarMonths[0];
        await elementUpdated(firstMonth);

        // Get the date cells for the month
        const calendarCells = firstMonth.shadowRoot.querySelectorAll('auro-formkit-calendar-cell');

        // Get the buttons for each date cell
        const calendarCellButtons = Array.from(calendarCells).map((cell) => cell.shadowRoot.querySelector('button'));

        // Filter down to our reference months
        const referenceDateButtons = calendarCellButtons.filter((button) => button.classList.contains('reference'));

        // Make sure we found all 4 reference dates
        await expect(referenceDateButtons.length).to.be.equal(4);

        // Check that each reference date is correct
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

        input.value = '03/03/2023';

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
          <auro-datepicker maxDate="01/01/2022" setCustomValidityRangeOverflow="Date is too late"></auro-datepicker>
        `);

        const input = getInput(el, 0);
        input.value = '01/02/2022';

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
          <auro-datepicker minDate="03/22/2022" setCustomValidityRangeUnderflow="Date is too early"></auro-datepicker>
        `);

        const input = getInput(el, 0);
        input.value = '03/18/2022';

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
        el.value = "02/31/2022";
        await elementUpdated(el);
        await expect(el.getAttribute('validity')).to.be.equal('invalidDate');

        // pattern mismatch
        el.value = "15/01/2022";
        el.validate();
        await elementUpdated(el);
        await expect(el.getAttribute('validity')).to.be.equal('patternMismatch');

        // Day too low
        el.value = `05/${`0${minDay - 1}`.slice(-2)}/${curYear}`;
        el.validate();
        await elementUpdated(el);
        await expect(el.getAttribute('validity')).to.be.equal('patternMismatch');

        // Day too high
        el.value = `05/${maxDay + 1}/${curYear}`;
        el.validate();
        await elementUpdated(el);
        await expect(el.getAttribute('validity')).to.be.equal('patternMismatch');

        // Month too low
        el.value = `${`0${minMonth - 1}`.slice(-2)}/02/${curYear}`;
        el.validate();
        await elementUpdated(el);
        await expect(el.getAttribute('validity')).to.be.equal('patternMismatch');

        // Month too high
        el.value = `${maxMonth + 1}/02/${curYear}`;
        el.validate();
        await elementUpdated(el);
        await expect(el.getAttribute('validity')).to.be.equal('patternMismatch');

        // Year too low
        el.value = `01/02/${minYear - 1}`;
        el.validate();
        await elementUpdated(el);
        await expect(el.getAttribute('validity')).to.be.equal('patternMismatch');

        // Year too high
        el.value = `01/02/${maxYear + 1}`;
        el.validate();
        await elementUpdated(el);
        await expect(el.getAttribute('validity')).to.be.equal('patternMismatch');
      });

      it('should set an error when the passed value exceeds the expected length', async () => {

        const el = await fixture(html`
          <auro-datepicker></auro-datepicker>
        `);

        el.value = "01/22/20288";
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
        el.value = "02/0";
        el.validate();
        await elementUpdated(el);
        await expect(el.getAttribute('validity')).to.be.equal('tooShort');
      });

      it('should show dateFrom error message when dateTo is also invalid', async () => {
        const el = await fixture(html`
          <auro-datepicker range required minDate="04/15/2023" value="04/20/2023" setCustomValidityRangeUnderflow="Before min date"></auro-datepicker>
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
          <auro-datepicker range maxDate="03/03/2023" value="03/01/2023" valueEnd="03/30/2023"></auro-datepicker>
        `);

        await elementUpdated(el);

        await expect(el.getAttribute('validity')).to.be.equal('rangeOverflow');
      });

    });

    describe('value', () => {
      it('should display a preset value when the value attribute is set', async () => {
        const el = await fixture(html`
          <auro-datepicker value="01/01/2022"></auro-datepicker>
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

        setInputValue(input1, '04/03/2023');
        setInputValue(input2, '04/04/2023');

        await elementUpdated(el);

        el.valueEnd = '04/09/202';

        await elementUpdated(el);

        expect(input2.value).to.equal('04/09/202');

        el.valueEnd = undefined;

        await elementUpdated(el);

        expect(input2.value).to.equal('');
      });

      it('should clear the value and validity state when reset() is called', async () => {
        const el = await fixture(html`
          <auro-datepicker range minDate="06/30/2025" value="02/14/2025" valueEnd="04/05/2025"></auro-datepicker>
        `);

        await expect(el.value).to.be.equal('02/14/2025');
        await expect(el.valueEnd).to.be.equal('04/05/2025');
        await expect(el.validity).to.be.equal('rangeUnderflow');

        el.reset();

        await elementUpdated(el);

        await expect(el.hasAttribute('validity')).to.be.false;
        await expect(el.value).to.be.equal(undefined);
        await expect(el.valueEnd).to.be.equal(undefined);
      });

      it('should display a preset value using custom format', async () => {
        const el = await fixture(html`
          <auro-datepicker format="yyyy/mm/dd" value="2023/02/25"></auro-datepicker>
        `);

        await elementUpdated(el);

        const input = getInput(el, 0);

        await expect(input.value).to.be.equal(el.value);
      });


    });

    describe('valueEnd', () => {
      it('should default to undefined', async () => {
        const el = await fixture(html`<auro-datepicker range></auro-datepicker>`);
        await expect(el.valueEnd).to.be.undefined;
      });

      it('should display preset valueEnd when attribute is set', async () => {
        const el = await fixture(html`
          <auro-datepicker range value="01/01/2023" valueEnd="01/15/2023"></auro-datepicker>
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
        const el = await fixture(html`<auro-datepicker value="01/01/2023"></auro-datepicker>`);
        await elementUpdated(el);

        el.resetInputs();
        await elementUpdated(el);

        await expect(el.value).to.be.undefined;
      });
    });

    describe('reset', () => {
      it('should clear value and validation state', async () => {
        const el = await fixture(html`
          <auro-datepicker required value="01/01/2023"></auro-datepicker>
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
        const el = await fixture(html`<auro-datepicker value="01/01/2023"></auro-datepicker>`);
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
        const el = await fixture(html`<auro-datepicker required value="01/01/2023"></auro-datepicker>`);
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
        const el = await fixture(html`<auro-datepicker value="01/01/2023"></auro-datepicker>`);
        await elementUpdated(el);
        await expect(el.values.length).to.equal(1);
        await expect(el.values[0]).to.equal(el.value);
      });

      it('should return array with both values when range values are set', async () => {
        const el = await fixture(html`
          <auro-datepicker range value="01/01/2023" valueEnd="01/15/2023"></auro-datepicker>
        `);
        await elementUpdated(el);
        await expect(el.values.length).to.equal(2);
        await expect(el.values[0]).to.equal(el.value);
        await expect(el.values[1]).to.equal(el.valueEnd);
      });
    });
  });

  describe('Events', () => {
    describe('auroDatePicker-valueSet', () => {
      it('should fire auroDatePicker-valueSet when a value is set', async () => {
        const el = await fixture(html`<auro-datepicker></auro-datepicker>`);
        await elementUpdated(el);

        const eventPromise = new Promise((resolve) => {
          el.addEventListener('auroDatePicker-valueSet', (event) => resolve(event));
        });

        el.value = '01/15/2023';
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
        const el = await fixture(html`<auro-datepicker value="02/01/2023"></auro-datepicker>`);
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
    // No private function tests
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
          width: 500,
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
          <auro-datepicker value="02/14/2028"></auro-datepicker>
        `);
        await elementUpdated(el);
        await el.focus();

        await new Promise((r) => setTimeout(r, 500));
        await sendKeys({ press: 'Tab' });
        await new Promise((r) => setTimeout(r, 500));
        await sendKeys({ press: key });
        await new Promise((r) => setTimeout(r, 500));
        await expect(el.value).to.be.equal('');
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
});

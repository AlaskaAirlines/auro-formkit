/* eslint-disable max-lines */
import { fixture, html, expect, waitUntil, elementUpdated, oneEvent } from '@open-wc/testing';
import { setViewport } from '@web/test-runner-commands';
import '../src/registered.js';
import '../../menu/src/registered.js';

// Desktop Test Suite
// "false" means mobileview = false
describe('auro-combobox', () => {
  runFulltest(false);
});

// Mobile Test Suite
// "true" means mobileview = true (full screen dialog)
describe('auro-combobox in mobile screen', () => {
  runFulltest(true);
});

function runFulltest(mobileview) {
  it('auro-combobox custom element is defined', async () => {
    const el = await Boolean(customElements.get("auro-combobox"));

    await expect(el).to.be.true;
  });

  it('auro-combobox is accessible', async () => {
    const el = await noFilterFixture(mobileview);

    await elementUpdated(el);

    await expect(el).to.be.accessible();
  });

  it('should pass inputmode to the input element', async () => {
    const el = await defaultFixture(mobileview);
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

  it('enforces menu selection when behavior is set to filter', async () => {
    const el = await filterFixture(mobileview);
    const {menu} = el;
    
    // initial state
    await expect(el.value).to.be.undefined;
    await expect(el.hasAttribute('error')).to.be.false;

    // type in a value that matches an option
    setInputValue(el, 'pp');
    await elementUpdated(el);

    if (mobileview) {
      // Wait for the fullscreen dialog transition to settle —
      // focus moves from trigger to inputInBib via requestAnimationFrame after the dialog is shown, so we wait until the inputInBib is focused before proceeding with the test.
      el.inputInBib.focus();
      await waitUntil(() => el.shadowRoot.activeElement === el.inputInBib);
    }

    await expect(el.value).to.be.undefined;
    await expect(el.hasAttribute('error')).to.be.false;
    await expect(el.hasAttribute('validity')).to.be.false;

    if (mobileview) {
      // Close the fullscreen dialog without selecting an option.
      // After dialog.close(), a rAF callback restores focus to the trigger input.
      el.hideBib();
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
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
    await new Promise((r) => setTimeout(r, 0));
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

  it('noFilter attribute results in no suggestion filtering', async () => {
    const el = await noFilterFixture(mobileview);

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

  it('can programmatically apply focus to input', async () => {
    const el = await defaultFixture(mobileview);

    const { input } = el;

    el.focus();

    await expect(el.shadowRoot.activeElement).to.be.equal(input);
  });

  it('shows the bib on click only when a value is typed', async () => {
    const el = await defaultFixture(mobileview);
    const trigger = el.dropdown.querySelector('[slot="trigger"]');
    trigger.click();
    await expect(el.dropdown.isPopoverVisible).to.be.false;
    setInputValue(el, 'ra');

    trigger.click();

    await expect(el.dropdown.isPopoverVisible).to.be.true;
  });

  it('shows the bib when pressing enter and a value is typed', async () => {
    const el = await defaultFixture(mobileview);

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

  it('Enter key does not propagate when opening the bib', async () => {
    const el = await defaultFixture(mobileview);

    el.focus();
    setInputValue(el, 'a');

    let propagated = false;
    const listener = () => { propagated = true; };
    // Listen on the parent to detect if the event bubbles past the combobox
    el.parentElement.addEventListener('keydown', listener);

    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
    await elementUpdated(el);

    el.parentElement.removeEventListener('keydown', listener);

    await expect(propagated).to.be.false;
    await expect(el.dropdown.isPopoverVisible).to.be.true;
  });

  it('hides the bib when there are no available options', async () => {
    const el = await defaultFixture(mobileview);

    setInputValue(el, 'zzzzzz');
    await expect(el.dropdown.isPopoverVisible).to.be.false;
  });

  it(`hides the bib when making a selection with Enter`, async () => {
    const el = await defaultFixture(mobileview);

    el.focus();
    setInputValue(el, 'a');
    el.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'Enter'
    }));

    await elementUpdated(el);
    await expect(el.dropdown.isPopoverVisible).to.be.true;

    const options = el.querySelectorAll('auro-menuoption');
    setTimeout(() => {
      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    });

    await oneEvent(el, 'auroMenu-selectedOption');
    await expect(el.value === options[0].textContent);

    await oneEvent(el, 'auroDropdown-toggled');
    await expect(el.dropdown.isPopoverVisible).to.be.false;
  });

  it(`selects the current active option when hitting Tab key`, async () => {
    const el = await defaultFixture(mobileview);

    el.focus();
    setInputValue(el, 'a');

    await elementUpdated(el);

    const options = el.querySelectorAll('auro-menuoption');
    setTimeout(() => {
      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
    });

    await expect(el.value === options[0].textContent);
  });

  // it('hides the bib when tabbing away from combobox', async () => {
  //   const el = await defaultFixture(mobileview);
  //   const trigger = el.dropdown.querySelector('[slot="trigger"]');

  //   setInputValue(el, 'p');
  //   trigger.click();
  //   await expect(el.dropdown.isPopoverVisible).to.be.true;

  //   document.activeElement.dispatchEvent(new KeyboardEvent('keydown', {
  //     'key': 'Tab'
  //   }));

  //   await expect(el.dropdown.isPopoverVisible).to.be.false;
  // });

  // These tests require fullscreen (mobile) mode
  if (mobileview) {
    it('focuses input in bib when fullscreen dialog opens', async () => {
      const el = await defaultFixture(mobileview);

      setInputValue(el, 'a');
      await elementUpdated(el);

      // inputInBib should exist in fullscreen mode
      expect(el.inputInBib).to.exist;

      // Follow existing mobile pattern: explicitly focus inputInBib
      el.inputInBib.focus();
      await waitUntil(() => el.shadowRoot.activeElement === el.inputInBib);
      expect(el.shadowRoot.activeElement).to.equal(el.inputInBib);
    });

    it('Tab key closes fullscreen dialog', async () => {
      const el = await defaultFixture(mobileview);

      el.focus();
      setInputValue(el, 'a');
      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await elementUpdated(el);
      await expect(el.dropdown.isPopoverVisible).to.be.true;

      el.inputInBib.focus();
      await waitUntil(() => el.shadowRoot.activeElement === el.inputInBib);

      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));

      // Wait for dialog close + rAF focus restoration
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      await elementUpdated(el);

      await expect(el.dropdown.isPopoverVisible).to.be.false;
    });

    it('restores trigger inert and focus after fullscreen dialog closes', async () => {
      const el = await defaultFixture(mobileview);

      el.focus();
      setInputValue(el, 'a');
      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await elementUpdated(el);
      await expect(el.dropdown.isPopoverVisible).to.be.true;

      el.inputInBib.focus();
      await waitUntil(() => el.shadowRoot.activeElement === el.inputInBib);

      // Trigger should be inert while fullscreen is open
      expect(el.dropdown.trigger.inert).to.be.true;

      // Close the dialog
      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      await elementUpdated(el);

      expect(el.dropdown.trigger.inert).to.be.false;
      expect(el.dropdown.isPopoverVisible).to.be.false;
    });
  }

  it('hides the bib when selecting an option with a custom event', async () => {
    const el = await customEventFixture(mobileview);

    await expect(el.dropdown.isPopoverVisible).to.be.false;

    setInputValue(el, 'a');
    await elementUpdated(el);
    if (mobileview) {
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

  it('navigates menu with up and down arrow keys', async () => {
    const el = await defaultFixture(mobileview);

    // Validate bib is shown when hitting enter but there is a value in the input
    setInputValue(el, 'pp');
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await elementUpdated(el);

    setInputValue(el, 'a');
    await elementUpdated(el);

    if (mobileview) {
      el.inputInBib.focus();
      await waitUntil(() => el.shadowRoot.activeElement === el.inputInBib);
    }

    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await elementUpdated(el);

    const menu = el.querySelector('auro-menu');
    const menuOptions = menu.querySelectorAll('auro-menuoption');

    await expect(el.optionActive).to.be.equal(menuOptions[0]);
    await expect(menuOptions[0].classList.contains('active')).to.be.true;
    await expect(menuOptions[1].classList.contains('active')).to.be.false;

    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await elementUpdated(el);

    await expect(el.optionActive).to.be.equal(menuOptions[1]);
    await expect(menuOptions[0].classList.contains('active')).to.be.false;
    await expect(menuOptions[1].classList.contains('active')).to.be.true;

    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    await elementUpdated(el);

    await expect(el.optionActive).to.be.equal(menuOptions[0]);
    await expect(menuOptions[0].classList.contains('active')).to.be.true;
    await expect(menuOptions[1].classList.contains('active')).to.be.false;
  });

  it('typing filters list of options', async () => {
    const el = await defaultFixture(mobileview);

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

  it('fired `auroCombobox-valueSet` event on value update', async () => {
    const el = await defaultFixture(mobileview);

    setInputValue(el, 'a');
    await elementUpdated(el);

    setTimeout(() => {
      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    });

    await oneEvent(el, 'auroCombobox-valueSet');
  });

  it('fires input event on typing', async () => {
    const el = await defaultFixture(mobileview);

    // Set up the event listener before triggering the input change
    const inputEventPromise = oneEvent(el, 'input');
    
    // Trigger input change
    setInputValue(el, 'a');
    
    // Wait for the input event to be fired
    await inputEventPromise;
  });

  it('using the nomatch attribute with a matching value', async () => {
    const el = await noMatchFixture(mobileview);

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

  it('using the nomatch attribute with no matching value', async () => {
    const el = await noMatchFixture(mobileview);

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

  it('using the persistent attribute always displays the persistent option', async () => {
    const el = await persistentFixture(mobileview);

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

  it('using the suggest attribute matches additional options', async () => {
    const el = await suggestFixture(mobileview);

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

  it('makes a selection programmatically', async () => {
    const el = await defaultFixture(mobileview);

    el.value = 'Apples';
    await elementUpdated(el);

    const selectedOption = el.querySelector('auro-menuoption[value="Apples"]');
    el.optionSelected = selectedOption;
    await elementUpdated(el);

    await expect(el.value).to.deep.equal('Apples');
    await expect(el.optionSelected).to.equal(selectedOption);
  });

  it('reset selection value programmatically', async () => {
    const el = await presetValueFixture(mobileview);

    el.value = undefined;

    await elementUpdated(el);

    await expect(el.optionSelected === undefined).to.be.true;
  });

  it('makes a selection using the keyboard', async () => {
    const el = await defaultFixture(mobileview);

    setInputValue(el, 'a');
    await elementUpdated(el);

    if (mobileview) {
      el.inputInBib.focus();
      await waitUntil(() => el.shadowRoot.activeElement === el.inputInBib);
    }


    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await elementUpdated(el);

    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await elementUpdated(el);

    await expect(el.value).to.equal('Apples');
  });

  it('Does not throw an error state when trying to programmatically set a value that doesn\'t match an option', async () => {
    const el = await defaultFixture(mobileview);

    await expect(el.hasAttribute('error')).to.be.false;

    el.value = 'Dragon Fruit';

    await elementUpdated(el);

    await expect(el.hasAttribute('error')).to.be.false;
  });

  it('handles the required state being set', async () => {
    const el = await requiredFixture(mobileview);

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

  it('handles the required state with persistInput set', async () => {
    const el = await persistInputFixture(mobileview);

    el.focus();
    el.shadowRoot.activeElement.blur();
    await elementUpdated(el);

    // validity should be `valueMissing` because the input and combo box value are still undefined
    await expect(el.getAttribute('validity')).to.be.equal('valueMissing');

    setInputValue(el, 'pp');
    await elementUpdated(el);

    if (mobileview) {
      // Wait for the fullscreen dialog transition to settle,
      // then close the dialog and wait for focus to return to trigger
      el.inputInBib.focus();
      await waitUntil(() => el.shadowRoot.activeElement === el.inputInBib);
      el.hideBib();
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      await elementUpdated(el);
    }

    el.shadowRoot.activeElement.blur();
    await elementUpdated(el);

    // validity should still be `valueMissing` because no menu option was selected
    await expect(el.getAttribute('validity')).to.be.equal('valueMissing');
  });

  it('fires `auroFormElement-validated` event after validation', async () => {
    const el = await requiredFixture(mobileview);

    // error applied on blur
    el.focus();
    setTimeout(() => {
      el.shadowRoot.activeElement.blur();
    });
    await oneEvent(el, 'auroFormElement-validated');
  });

  it('default to nocheckmark on selected option', async () => {
    const el = await defaultFixture(mobileview);

    const menu = el.querySelector('auro-menu');
    await expect(menu.hasAttribute('nocheckmark')).to.be.true;
  });

  it('selected options have checkmark when checkmark attribute is present', async () => {
    const el = await checkmarkFixture(mobileview);

    const menu = el.querySelector('auro-menu');
    await expect(menu.hasAttribute('nocheckmark')).to.be.false;
  });

  // it('reset method clears the value and validity state', async () => {
  //   const el = await requiredFixture(mobileview);

  //   el.focus();
  //   el.shadowRoot.activeElement.blur();

  //   await elementUpdated(el);
  //   await expect(el.getAttribute('validity')).to.be.equal('valueMissing');

  //   el.reset();

  //   await elementUpdated(el);

  //   await expect(el.hasAttribute('validity')).to.be.false;
  //   await expect(el.value).to.equal(undefined);
  // });

  it('shows error state when error attribute is set', async () => {
    const el = await defaultFixture(mobileview);

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

  describe('announceToScreenReader', function() {
    this.timeout(5000);

    it('populates the live region when an option is activated', async () => {
      const el = await noFilterFixture(mobileview);
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

      const liveRegion = el.shadowRoot.querySelector('#srAnnouncement');
      expect(liveRegion).to.exist;
      expect(liveRegion.textContent).to.not.equal('');
    });

    it('clears the live region after the announcement duration', async () => {
      const el = await noFilterFixture(mobileview);
      await elementUpdated(el);

      el.focus();
      setInputValue(el, 'a');
      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await elementUpdated(el);

      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      await elementUpdated(el);

      await new Promise((resolve) => requestAnimationFrame(resolve));
      const liveRegion = el.shadowRoot.querySelector('#srAnnouncement');
      expect(liveRegion.textContent).to.not.equal('');

      // Multiple announcements can chain (e.g., active-option followed by selection),
      // each resetting the 1000ms cleanup timer. Wait long enough for the final
      // announcement's timer to expire.
      await new Promise((resolve) => setTimeout(resolve, 2200));
      expect(liveRegion.textContent).to.equal('');
    });
  });

  describe('updateBibDialogRole', () => {
    it('sets bib dialogRole to presentation on desktop to suppress verbose announcements', async () => {
      // Use a wide viewport so the bib does NOT go fullscreen
      await setViewport({ width: 1024, height: 800 });

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

    it('clears bib dialogRole in fullscreen mode to preserve native dialog semantics', async () => {
      const el = await defaultFixture(mobileview);

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

      expect(bibEl.dialogRole).to.be.undefined;
      expect(dialog.hasAttribute('role')).to.be.false;
    });
  });

  describe('disconnectedCallback', () => {
    it('resets _inFullscreenTransition so validation is not suppressed after reconnect', async () => {
      const el = await defaultFixture(mobileview);
      await elementUpdated(el);

      // Simulate the flag being stuck mid-transition
      el._inFullscreenTransition = true;

      // Disconnect and reconnect
      const parent = el.parentNode;
      parent.removeChild(el);
      parent.appendChild(el);
      await elementUpdated(el);

      expect(el._inFullscreenTransition).to.be.false;
    });
  });

  it('hitting Enter on clear button clears the input', async () => {
    const el = await defaultFixture(mobileview);

    el.focus();
    setInputValue(el, 'a');
    await elementUpdated(el);

    if (mobileview) {
      el.inputInBib.focus();
      await waitUntil(() => el.shadowRoot.activeElement === el.inputInBib);
    }

    // Navigate to the clear button via Tab
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true }));
    await elementUpdated(el);

    const activeInput = mobileview ? el.inputInBib : el.input;
    const clearBtn = activeInput.shadowRoot.querySelector('.clearBtn');
    expect(clearBtn).to.exist;

    // Hit Enter on the clear button
    clearBtn.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
    clearBtn.click();
    await elementUpdated(el);

    expect(activeInput.value).to.not.be.ok;
  });

  it('clicking clear button clears the input', async () => {
    const el = await defaultFixture(mobileview);

    el.focus();
    setInputValue(el, 'a');
    await elementUpdated(el);

    if (mobileview) {
      el.inputInBib.focus();
      await waitUntil(() => el.shadowRoot.activeElement === el.inputInBib);
    }

    const activeInput = mobileview ? el.inputInBib : el.input;
    const clearBtn = activeInput.shadowRoot.querySelector('.clearBtn');
    expect(clearBtn).to.exist;

    clearBtn.click();
    await elementUpdated(el);

    expect(activeInput.value).to.not.be.ok;
  });

  // The close button only exists in fullscreen (mobile) mode
  if (mobileview) {
    it('hitting Enter on close button closes the dialog', async () => {
      const el = await defaultFixture(mobileview);

      el.focus();
      setInputValue(el, 'a');
      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await elementUpdated(el);
      await expect(el.dropdown.isPopoverVisible).to.be.true;

      el.inputInBib.focus();
      await waitUntil(() => el.shadowRoot.activeElement === el.inputInBib);

      // Find the close button in the bibtemplate and activate it with Enter
      const closeBtn = el.bibtemplate.shadowRoot.querySelector('#closeButton');
      expect(closeBtn).to.exist;
      closeBtn.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
      closeBtn.click();

      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      await elementUpdated(el);

      await expect(el.dropdown.isPopoverVisible).to.be.false;
    });

    it('clicking close button closes the dialog', async () => {
      const el = await defaultFixture(mobileview);

      el.focus();
      setInputValue(el, 'a');
      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await elementUpdated(el);
      await expect(el.dropdown.isPopoverVisible).to.be.true;

      el.inputInBib.focus();
      await waitUntil(() => el.shadowRoot.activeElement === el.inputInBib);

      // Click the close button in the bibtemplate
      const closeBtn = el.bibtemplate.shadowRoot.querySelector('#closeButton');
      expect(closeBtn).to.exist;
      closeBtn.click();

      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      await elementUpdated(el);

      await expect(el.dropdown.isPopoverVisible).to.be.false;
    });
  }

  it('selects label slot content', async () => {
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
}

/**
 *
 */
async function persistInputFixture(mobileview) {
  if (mobileview) {
    await setViewport({
      width: 500,
      height: 800
    });
  } else {
    await setViewport({
      width: 800,
      height: 800
    });
  };

  return fixture(html`
  <auro-combobox required persistInput>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  `);
};

/**
 *
 */
async function defaultFixture(mobileview) {
  if (mobileview) {
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
  return fixture(html`
  <auro-combobox>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  `);
}

/**
 *
 */
async function presetValueFixture(mobileview) {
  if (mobileview) {
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
  return fixture(html`
    <auro-combobox value="Apples">
      <span slot="label">Name</span>
      <auro-menu>
        <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
        <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      </auro-menu>
    </auro-combobox>
  `);
}

/**
 *
 */
async function checkmarkFixture(mobileview) {
  if (mobileview) {
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
  return fixture(html`
  <auro-combobox checkmark>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  `);
}


/**
 *
 */
async function suggestFixture(mobileview) {
  if (mobileview) {
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
  return fixture(html`
  <auro-combobox>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" suggest="Apples" id="option-1">Oranges</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  `);
}

/**
 *
 */
async function requiredFixture(mobileview) {
  if (mobileview) {
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
  return fixture(html`
  <auro-combobox required>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  `);
}

/**
 *
 */
async function noMatchFixture(mobileview) {
  if (mobileview) {
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
  return fixture(html`
  <auro-combobox>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption nomatch id="option-noMatch">No Matching Option</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  `);
}

/**
 *
 */
async function persistentFixture(mobileview) {
  if (mobileview) {
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
  return fixture(html`
  <auro-combobox>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption persistent id="option-noMatch">Persistent</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  `);
}

/**
 * 
 */
async function filterFixture(mobileview) {
  if (mobileview) {
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
  return fixture(html`
    <auro-combobox behavior="filter" setCustomValidityValueMissingFilter="filter error">
      <span slot="label">Name</span>
      <auro-menu>
        <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
        <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
        <auro-menuoption persistent id="option-noMatch">Persistent</auro-menuoption>
      </auro-menu>
    </auro-combobox>
  `);
}

/**
 *
 */
async function customEventFixture(mobileview) {
  if (mobileview) {
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
  return fixture(html`
  <auro-combobox>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption event="mycustomevent">Add new fruit</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  `);
}

/**
 *
 */
async function noFilterFixture(mobileview) {
  if (mobileview) {
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
  return fixture(html`
  <auro-combobox noFilter>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  `);
}

/**
 *
 */
function setInputValue(el, value) {
  const auroInput = el.input;
  const input = auroInput.shadowRoot.querySelector('input');
  input.focus();
  input.value = value;
  input.dispatchEvent(new InputEvent('input'));
  auroInput.dispatchEvent(new InputEvent('input', {
    bubbles: true,
    composed: true
  }));
  el.dispatchEvent(new KeyboardEvent('keyup', {
    key: value.slice(value.length - 1),
    repeat: false
  }));
}

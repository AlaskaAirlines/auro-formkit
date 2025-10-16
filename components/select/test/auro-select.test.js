/* eslint-disable max-lines, jsdoc/require-jsdoc, no-return-await, no-undef */
import { useAccessibleIt } from "@aurodesignsystem/auro-library/scripts/test-plugin/iterateWithA11Check.mjs";

import { fixture, html, expect, elementUpdated } from '@open-wc/testing';
import { setViewport } from '@web/test-runner-commands';
import '@aurodesignsystem/auro-dropdown';
import '../../menu/src/registered.js';
import '../src/registered.js';

useAccessibleIt();

async function setScreenSize(mobileView) {
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
}

async function defaultFixture() {
  return await fixture(html`
  <auro-select>
    <span slot="bib.fullscreen.headline">Bib Headline</span>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    </auro-menu>
  </auro-select>
  `);
}

async function presetValueFixture() {
  return await fixture(html`
  <auro-select value="price">
    <span slot="bib.fullscreen.headline">Bib Headline</span>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="stops">Stops</auro-menuoption>
      <auro-menuoption value="price" id="presetOption">Price</auro-menuoption>
      <auro-menuoption value="duration">Duration</auro-menuoption>
      <auro-menuoption value="departure">Departure</auro-menuoption>
      <auro-menuoption value="arrival">Arrival</auro-menuoption>
      <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
    </auro-menu>
  </auro-select>
  `);
}

async function noCheckmarkFixture() {
  return await fixture(html`
  <auro-select nocheckmark>
    <span slot="bib.fullscreen.headline">Bib Headline</span>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    </auro-menu>
  </auro-select>
  `);
}

async function errorFixture() {
  return await fixture(html`
  <auro-select error="custom error message">
    <span slot="bib.fullscreen.headline">Bib Headline</span>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    </auro-menu>
  </auro-select>
  `);
}

async function multiSelectFixture() {
  return await fixture(html`
  <auro-select multiselect>
    <span slot="bib.fullscreen.headline">Bib Headline</span>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Bananas" id="option-2">Bananas</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    </auro-menu>
  </auro-select>
  `);
}

function runTest(mobileView) {
  describe(`auro-select${mobileView ? ' in mobile' : ''}`, () => {
    before(async () => {
      await setScreenSize(mobileView);
    });

    it('auro-select custom element is defined', async () => {
      const el = await Boolean(customElements.get("auro-select"));

      await expect(el).to.be.true;
    });

    it('web component is successfully created in the document', async () => {
      // This test fails when attributes are put onto the component before it is attached to the DOM
      const el = document.createElement('auro-select');

      await expect(el.localName).to.equal('auro-select');
    });

    it('should have a native select element for autofill', async () => {
      const el = await defaultFixture();

      const nativeSelect = el.shadowRoot.querySelector('.nativeSelectWrapper select');
      await expect(nativeSelect).to.exist;
    });

    it('should open bib with showBib() method', async () => {
      const el = await defaultFixture();

      const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
      await expect(dropdown.isPopoverVisible).to.be.false;

      el.showBib();
      await elementUpdated(el);
      await expect(dropdown.isPopoverVisible).to.be.true;
    });

    it('should close bib with hideBib() method', async () => {
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

    it('formattedValue should return objet format value when multiselect is true', async () => {
      const element = await multiSelectFixture();
      element.value = '["Apples", "Bananas"]';
      await elementUpdated(element);
      const elValue = element.formattedValue;
      await expect(Array.isArray(elValue)).to.be.true;
      await expect(elValue.length).to.equal(2);
      await expect(elValue[0]).to.equal('Apples');
      await expect(elValue[1]).to.equal('Bananas');
    });

    it('should pass the name to the native select', async () => {
      const element = await defaultFixture();
      const testName = 'test-name';
      element.name = testName;
      await elementUpdated(element);
      const nativeSelect = element.shadowRoot.querySelector('.nativeSelectWrapper select');
      await expect(nativeSelect.name).to.equal(testName);
    });

    it('should sync value changes from native select to component', async () => {
      const element = await defaultFixture();
      element.setAttribute('required', '');
      const nativeSelect = element.shadowRoot.querySelector('.nativeSelectWrapper select');
      nativeSelect.value = 'Apples';
      nativeSelect.dispatchEvent(new Event('change'));

      await elementUpdated(element);

      const elValue = element.value;
      await expect(elValue).to.equal('Apples');

      // Also check that the visible selection matches
      const triggerText = element.shadowRoot.querySelector('[slot="trigger"]').textContent.trim();
      await expect(triggerText).to.equal('Apples');
    });

    it('should sync value changes from component to native select', async () => {
      const element = await defaultFixture();
      element.value = 'Apples';

      await elementUpdated(element);

      const nativeSelect = element.shadowRoot.querySelector('.nativeSelectWrapper select');
      expect(nativeSelect.value).to.equal('Apples');
    });

    it('toggles the bib on click', async () => {
      const el = await defaultFixture();

      const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
      const trigger = dropdown.querySelector('[slot="trigger"]');

      trigger.click();
      await expect(dropdown.isPopoverVisible).to.be.true;

      trigger.click();
      await expect(dropdown.isPopoverVisible).to.be.false;
    });

    it('tabbing away from the element closes the bib in non-mobile view', async () => {
      const el = await defaultFixture();

      const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
      const trigger = dropdown.querySelector('[slot="trigger"]');

      trigger.click();
      await expect(dropdown.isPopoverVisible).to.be.true;

      el.dispatchEvent(new KeyboardEvent('keydown', {
        'key': 'Tab'
      }));

      if (mobileView) {
        await expect(dropdown.isPopoverVisible).to.be.true;
      } else {
        await expect(dropdown.isPopoverVisible).to.be.false;
      }
    });

    it('Navigates the menu with arrow keys', async () => {
      const el = await defaultFixture();

      const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
      const trigger = dropdown.querySelector('[slot="trigger"]');

      trigger.click();
      await expect(dropdown.isPopoverVisible).to.be.true;
      el.dispatchEvent(new KeyboardEvent('keydown', {
        'key': 'ArrowDown'
      }));

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

    it('makes a selection programmatically', async () => {
      const el = await defaultFixture();
      const menu = el.querySelector('auro-menu');

      el.value = 'Apples';
      await elementUpdated(el);
      await elementUpdated(menu);

      const selectedOption = menu.querySelector('auro-menuoption[value="Apples"]');

      await expect(el.value).to.eql('Apples');
      await expect(el.optionSelected).to.equal(selectedOption);
    });

    it('makes a selection programmatically in multiselect', async () => {
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


    it('should close when selecting an option', async () => {
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

    it('should clear selection when non-existent value is set programmatically', async () => {
      const el = await defaultFixture();
      const menu = el.querySelector('auro-menu');

      el.value = 'Non-existent value';
      await elementUpdated(el);
      await elementUpdated(menu);

      await expect(el.optionSelected).to.be.undefined;
    });

    // TODO: Remake this test, likely a false positive, and is no longer working after component updates
    // it('making invalid selection programmatically results in resetting of component', async () => {
    //   const el = await presetValueFixture();
    //   await elementUpdated(el);
    //   await expect(el.value).to.eql('price');

    //   el.value = 'flight course';
    //   await elementUpdated(el);

    //   await expect(el.optionSelected).to.be.equal(undefined);
    //   await expect(el.getAttribute('validity')).to.equal('valid');
    // });

    it('reset selection value programmatically', async () => {
      const el = await presetValueFixture();
      const menu = el.querySelector('auro-menu');

      el.reset();
      await elementUpdated(el);
      await elementUpdated(menu);

      await expect(el.optionSelected).to.be.equal(undefined);
    });

    it('default to checkmark on selected option', async () => {
      const el = await defaultFixture();
      const menu = el.querySelector('auro-menu');
      await expect(menu.hasAttribute('nocheckmark')).to.be.false;
    });

    it('selected options have nocheckmark when nocheckmark attribute is present', async () => {
      const el = await noCheckmarkFixture();
      const menu = el.querySelector('auro-menu');
      await expect(menu.hasAttribute('nocheckmark')).to.be.true;
    });

    it('removing error attribute reruns validity even when value is undefined', async () => {
      const el = await errorFixture();

      await expect(el.getAttribute('validity')).to.be.equal('customError');

      el.removeAttribute('error');

      await elementUpdated(el);

      await expect(el.getAttribute('validity')).to.equal('valid');
    });

    it('reset method clears the value and validity state', async () => {
      const el = await presetValueFixture();
      await elementUpdated(el);

      await expect(el.value).to.eql('price');
      await expect(el.getAttribute('validity')).to.equal('valid');

      el.reset();
      await elementUpdated(el);

      await expect(el.value).to.be.undefined;
    });
  });

  describe('auro-select keyboard interaction', () => {
    it('selects the first option starting with pressed key', async () => {
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

      // Simulate pressing "b"
      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }));

      await elementUpdated(el);

      // The menu's active option should be "banana"
      const menu = el.menu; // eslint-disable-line

      await expect(menu.optionActive).to.exist;
      await expect(menu.optionActive.value).to.equal('banana');
      await expect(menu.optionActive.textContent.trim()).to.equal('Banana');
    });

    it('cycles through options with the same starting letter', async () => {
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

      // Press "a" once
      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
      await elementUpdated(el);
      await expect(el.menu.optionActive).to.exist;
      await expect(el.menu.optionActive.value).to.equal('apple');
      await expect(el.menu.optionActive.textContent.trim()).to.equal('Apple');

      // Press "a" again to cycle to next "a" option
      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
      await elementUpdated(el);
      await expect(el.menu.optionActive).to.exist;
      await expect(el.menu.optionActive.value).to.equal('apricot');
      await expect(el.menu.optionActive.textContent.trim()).to.equal('Apricot');
    });

    it('does nothing if there is no matching value for pressed key', async () => {
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

      // Set an initial value and active option
      el.value = 'apple';
      await elementUpdated(el);

      const previousActive = el.menu.optionActive;

      // Press a key that does not match any option
      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'z' }));
      await elementUpdated(el);

      // The menu's active option should remain unchanged
      await expect(el.menu.optionActive).to.equal(previousActive);
    });

    it('loops through available values if the same key is pressed repeatedly', async () => {
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

      // Press "a" repeatedly and check that it cycles through all "a" options
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

      // Should loop back to the first "a" option
      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
      await elementUpdated(el);
      await expect(el.menu.optionActive).to.exist;
      await expect(el.menu.optionActive.value).to.equal('apple');
      await expect(el.menu.optionActive.textContent.trim()).to.equal('Apple');
    });
  });
}

runTest(false);
runTest(true);

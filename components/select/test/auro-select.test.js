import { useAccessibleIt } from "@aurodesignsystem/auro-library/scripts/test-plugin/iterateWithA11Check.mjs";

import { fixture, html, expect, elementUpdated } from '@open-wc/testing';
import '@aurodesignsystem/auro-dropdown';
import '../../menu/src/registered.js';
import '../src/registered.js';

useAccessibleIt();

describe('auro-select', () => {
  it('auro-select custom element is defined', async () => {
    const el = await !!customElements.get("auro-select");

    await expect(el).to.be.true;
  });

  it('web component is successfully created in the document', async () => {
    // This test fails when attributes are put onto the component before it is attached to the DOM
    const el = document.createElement('auro-select');

    await expect(el.localName).to.equal('auro-select');
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

  it('tabbing away from the element closes the bib', async () => {
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

  it('Navigates the menu with arrow keys', async () => {
    const el = await defaultFixture();

    const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
    const trigger = dropdown.querySelector('[slot="trigger"]');

    trigger.click();
    await expect(dropdown.isPopoverVisible).to.be.true;
    el.dispatchEvent(new KeyboardEvent('keydown', {
      'key': 'ArrowDown'
    }));

    const menu = dropdown.bibContent.querySelector('auro-menu');
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

  it('makes a selection programatically', async () => {
    const el = await defaultFixture();
    const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
    const menu = dropdown.bibContent.querySelector('auro-menu');
    
    el.value = ['Apples'];
    await elementUpdated(el);
    await elementUpdated(menu);
    
    const selectedOption = menu.querySelector('auro-menuoption[value="Apples"]');
    
    await expect(el.value).to.deep.equal(['Apples']);
    await expect(el.optionSelected[0]).to.equal(selectedOption);
  });

  it('making invalid selection programmatically results in resetting of component', async () => {
    const el = await presetValueFixture();
    await elementUpdated(el);
    await expect(el.value).to.deep.equal(['price']);

    el.value = ['flight course'];
    await elementUpdated(el);
    
    await expect(el.optionSelected).to.be.equal(undefined);
    await expect(el.getAttribute('validity')).to.equal('valid');
  });

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

    const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
    const menu = dropdown.bibContent.querySelector('auro-menu');
    await expect(menu.hasAttribute('nocheckmark')).to.be.false;
  });

  it('selected options have nocheckmark when nocheckmark attribute is present', async () => {
    const el = await noCheckmarkFixture();

    const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
    const menu = dropdown.bibContent.querySelector('auro-menu');
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

    await expect(el.value).to.deep.equal(['price']);
    await expect(el.getAttribute('validity')).to.equal('valid');

    el.reset();
    await elementUpdated(el);

    await expect(el.value).to.be.undefined;
  });
});

async function defaultFixture() {
  return await fixture(html`
  <auro-select>
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
  <auro-select value='["price"]'>
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
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    </auro-menu>
  </auro-select>
  `);
}

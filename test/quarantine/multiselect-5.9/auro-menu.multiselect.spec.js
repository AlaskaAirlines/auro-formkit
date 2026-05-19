/* eslint-disable max-lines, no-undef, no-unused-expressions, no-magic-numbers */
// Quarantined 5.9 multiSelect tests for auro-menu.
// Imports needed: { fixture, html, expect, oneEvent, elementUpdated } from '@open-wc/testing';
// 'components/menu/src/registered.js'

import { fixture, html, expect, oneEvent, elementUpdated } from '@open-wc/testing';
import '../../../components/menu/src/registered.js';
import {
  multiSelectDuplicateValuesFixture,
  multiSelectDuplicateValuesSelectAllFixture,
} from './testFixtures.multiselect.js';

describe.skip('Quarantined 5.9 — auro-menu selectAllMatchingOptions', () => {
  it('should only select the first matching option when duplicates exist and selectAllMatchingOptions is not set', async () => {
    const menu = await multiSelectDuplicateValuesFixture();
    await elementUpdated(menu);
    const {options} = menu;

    menu.value = 'option 2';
    await elementUpdated(menu);

    expect(options[1].hasAttribute('selected')).to.be.true;
    expect(options[4].hasAttribute('selected')).to.be.false;
  });

  it('should select all matching options when duplicates exist and selectAllMatchingOptions is set', async () => {
    const menu = await multiSelectDuplicateValuesSelectAllFixture();
    await elementUpdated(menu);
    const {options} = menu;

    menu.value = 'option 2';
    await elementUpdated(menu);

    expect(options[1].hasAttribute('selected')).to.be.true;
    expect(options[4].hasAttribute('selected')).to.be.true;
  });
});

describe.skip('Quarantined 5.9 — auro-menu selectAllMatchingOptions property', () => {
  it('should default to false', async () => {
    const el = await fixture(html`
      <div>
        <auro-menu aria-label="test">
          <auro-menuoption value="option 1">option 1</auro-menuoption>
        </auro-menu>
      </div>
    `);
    const menuEl = el.querySelector('auro-menu');

    expect(menuEl.selectAllMatchingOptions).to.be.false;
  });

  it('should select all matching duplicate values when true', async () => {
    const el = await multiSelectDuplicateValuesSelectAllFixture();
    await elementUpdated(el);

    el.value = '["option 2"]';
    await elementUpdated(el);

    const selected = el.selectedOptions;
    expect(selected.length).to.be.greaterThan(1);
  });
});

describe.skip('Quarantined 5.9 — auro-menu allowDeselect (value states)', () => {
  it('should not allow deselection of a selected option in single-select mode without allowDeselect set', async () => {
    const el = await fixture(html`
      <div>
        <auro-menu aria-label="test">
          <auro-menuoption value="option 1">option 1</auro-menuoption>
          <auro-menuoption value="option 2">option 2</auro-menuoption>
        </auro-menu>
      </div>
    `);
    const menu = el.querySelector('auro-menu');

    menu.navigateOptions('down');
    await elementUpdated(menu);
    menu.makeSelection();
    await elementUpdated(menu);

    expect(menu.value).to.eql('option 1');

    menu.makeSelection();
    await elementUpdated(menu);

    expect(menu.value).to.eql('option 1');
  });

  it('should allow deselection of a selected option in single-select mode with allowDeselect set', async () => {
    const el = await fixture(html`
      <div>
        <auro-menu aria-label="test">
          <auro-menuoption value="option 1">option 1</auro-menuoption>
          <auro-menuoption value="option 2">option 2</auro-menuoption>
        </auro-menu>
      </div>
    `);
    const menu = el.querySelector('auro-menu');
    menu.allowDeselect = true;
    await elementUpdated(menu);

    menu.value = 'option 1';
    await elementUpdated(menu);

    expect(menu.value).to.eql('option 1');

    menu.navigateOptions('down');
    menu.makeSelection();
    await elementUpdated(menu);

    expect(menu.value).to.equal(undefined);
    expect(menu.optionSelected).to.equal(undefined);
  });
});

describe.skip('Quarantined 5.9 — auro-menu allowDeselect property', () => {
  it('should default to false', async () => {
    const el = await fixture(html`
      <div>
        <auro-menu aria-label="test">
          <auro-menuoption value="option 1">option 1</auro-menuoption>
        </auro-menu>
      </div>
    `);
    const menuEl = el.querySelector('auro-menu');

    expect(menuEl.allowDeselect).to.be.false;
  });

  it('should allow deselection when set to true', async () => {
    const el = await fixture(html`
      <auro-menu allowDeselect aria-label="test">
        <auro-menuoption value="opt1">Opt 1</auro-menuoption>
      </auro-menu>
    `);

    el.navigateOptions('down');
    await elementUpdated(el);
    el.makeSelection();
    await elementUpdated(el);
    expect(el.value).to.equal('opt1');

    el.makeSelection();
    await elementUpdated(el);
    expect(el.value).to.be.undefined;
  });
});

describe.skip('Quarantined 5.9 — auro-menu auroMenu-deselectPrevented event', () => {
  it('should fire when trying to deselect in single-select mode without allowDeselect', async () => {
    const el = await fixture(html`
      <div>
        <auro-menu aria-label="test">
          <auro-menuoption value="option 1">option 1</auro-menuoption>
          <auro-menuoption value="option 2">option 2</auro-menuoption>
        </auro-menu>
      </div>
    `);
    const menuEl = el.querySelector('auro-menu');

    menuEl.navigateOptions('down');
    await elementUpdated(menuEl);
    menuEl.makeSelection();
    await elementUpdated(menuEl);

    const listener = oneEvent(menuEl, 'auroMenu-deselectPrevented');
    menuEl.makeSelection();

    const event = await listener;
    expect(event).to.exist;
  });
});

describe.skip('Quarantined 5.9 — auro-menu MenuService coverage', () => {
  it('selectByValue should clear selection for empty string', async () => {
    const el = await fixture(html`
      <div>
        <auro-menu aria-label="test">
          <auro-menuoption value="option 1">option 1</auro-menuoption>
        </auro-menu>
      </div>
    `);
    const menu = el.querySelector('auro-menu');
    await elementUpdated(menu);

    menu.menuService.selectByValue('');
    expect(menu.menuService.selectedOptions.length).to.equal(0);
  });

  it('selectByValue should clear selection for null', async () => {
    const el = await fixture(html`
      <div>
        <auro-menu aria-label="test">
          <auro-menuoption value="option 1">option 1</auro-menuoption>
        </auro-menu>
      </div>
    `);
    const menu = el.querySelector('auro-menu');
    await elementUpdated(menu);

    menu.menuService.selectByValue(null);
    expect(menu.menuService.selectedOptions.length).to.equal(0);
  });

  it('selectByValue should clear selection for empty array', async () => {
    const el = await fixture(html`
      <div>
        <auro-menu aria-label="test">
          <auro-menuoption value="option 1">option 1</auro-menuoption>
        </auro-menu>
      </div>
    `);
    const menu = el.querySelector('auro-menu');
    await elementUpdated(menu);

    menu.menuService.selectByValue([]);
    expect(menu.menuService.selectedOptions.length).to.equal(0);
  });

  it('selectByValue should queue pending value when options not loaded', async () => {
    const el = await fixture(html`
      <div>
        <auro-menu aria-label="test">
          <auro-menuoption value="option 1">option 1</auro-menuoption>
        </auro-menu>
      </div>
    `);
    const menu = el.querySelector('auro-menu');
    await elementUpdated(menu);

    menu.menuService._menuOptions = [];
    menu.menuService.selectByValue('test');
    expect(menu.menuService._pendingValue).to.equal('test');
  });

  it('selectByValue should warn for multi-value in single-select', async () => {
    const el = await fixture(html`
      <div>
        <auro-menu aria-label="test">
          <auro-menuoption value="option 1">option 1</auro-menuoption>
        </auro-menu>
      </div>
    `);
    const menu = el.querySelector('auro-menu');
    await elementUpdated(menu);

    menu.menuService.selectByValue(['Stop 1', 'Stop 2']);
  });

  it('currentValue should return undefined for empty string', async () => {
    const el = await fixture(html`
      <div>
        <auro-menu aria-label="test">
          <auro-menuoption value="option 1">option 1</auro-menuoption>
        </auro-menu>
      </div>
    `);
    const menu = el.querySelector('auro-menu');
    await elementUpdated(menu);

    expect(menu.menuService.currentValue).to.be.undefined;
  });
});

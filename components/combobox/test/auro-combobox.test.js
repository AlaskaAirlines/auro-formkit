import { fixture, html, expect, waitUntil, elementUpdated } from '@open-wc/testing';
import { setViewport } from '@web/test-runner-commands';
import '../src/registered.js';
import '../../menu/src/registered.js';

describe('auro-combobox', () => {
  runFulltest(false);
});

describe('auro-combobox in mobile screen', () => {
  runFulltest(true);
});



function runFulltest(mobileview) {
  it('auro-combobox custom element is defined', async () => {
    const el = await Boolean(customElements.get("auro-combobox"));

    await expect(el).to.be.true;
  });

  it('noFilter attribute results in no suggestion filtering', async () => {
    const el = await noFilterFixture(mobileview);

    const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
    const menu = dropdown.bibContent.querySelector('auro-menu');
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

    const {input} = el;

    el.focus();

    await expect(el.shadowRoot.activeElement).to.be.equal(input);
  });

  it('shows the bib on click only when a value is typed', async () => {
    const el = await defaultFixture(mobileview);
    const trigger = el.dropdown.querySelector('[slot="trigger"]');
    trigger.click();
    await expect(el.dropdown.isPopoverVisible).to.be.false;
    if (mobileview) {
      // wait until input settles in dropdown
      await waitUntil(() => {
        return el.input.parentNode === el.dropdown;
      });
    }
    el.focus();
    setInputValue(el, 'p');
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

  it('hides the bib when there are no available options', async () => {
    const el = await defaultFixture(mobileview);

    setInputValue(el, 'zzzzzz');
    await expect(el.dropdown.isPopoverVisible).to.be.false;
  });

  it('hides the bib when making a selection', async () => {
    const el = await defaultFixture(mobileview);
    const trigger = el.dropdown.querySelector('[slot="trigger"]');

    setInputValue(el, 'p');
    trigger.click();
    await elementUpdated(el);

    el.menu.dispatchEvent(new CustomEvent('auroMenu-selectedOption', {
      bubbles: true,
      composed: true
    }));
    await elementUpdated(el);

    await expect(el.dropdown.isPopoverVisible).to.be.false;
  });

  it('hides the bib when tabbing away from combobox', async () => {
    const el = await defaultFixture(mobileview);
    const trigger = el.dropdown.querySelector('[slot="trigger"]');

    el.focus();

    setInputValue(el, 'p');
    trigger.click();
    await expect(el.dropdown.isPopoverVisible).to.be.true;

    document.activeElement.dispatchEvent(new KeyboardEvent('keydown', {
      'key': 'Tab'
    }));

    await expect(el.dropdown.isPopoverVisible).to.be.false;
  });

  it('hides the bib when selecting an option with a custom event', async () => {
    const el = await customEventFixture(mobileview);

    await expect(el.dropdown.isPopoverVisible).to.be.false;

    setInputValue(el, 'a');
    el.dispatchEvent(new KeyboardEvent('keydown', {
      'key': 'Enter'
    }));

    await expect(el.dropdown.isPopoverVisible).to.be.true;

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
    el.focus();

    // Validate bib is shown when hitting enter but there is a value in the input
    setInputValue(el, 'pp');
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await elementUpdated(el);

    if (mobileview) {
      await waitUntil(() => {
        // wait until input settles in dropdown
        return el.input.parentNode === el.dropdown;
      });
    }
    setInputValue(el, 'a');
    await elementUpdated(el);

    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await elementUpdated(el);


    const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
    const menu = dropdown.bibContent.querySelector('auro-menu');
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

    const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
    const menu = dropdown.bibContent.querySelector('auro-menu');
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
  });

  it('using the nomatch attribute with a matching value', async () => {
    const el = await noMatchFixture(mobileview);

    const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
    const menu = dropdown.bibContent.querySelector('auro-menu');
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
  });

  it('using the nomatch attribute with no matching value', async () => {
    const el = await noMatchFixture(mobileview);

    const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
    const menu = dropdown.bibContent.querySelector('auro-menu');
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

    const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
    const menu = dropdown.bibContent.querySelector('auro-menu');
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
  });

  it('using the suggest attribute matches additional options', async () => {
    const el = await suggestFixture(mobileview);

    const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
    const menu = dropdown.bibContent.querySelector('auro-menu');
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
  });

  it('makes a selection programmatically', async () => {
    const el = await defaultFixture(mobileview);

    el.value = ['Apples'];
    await elementUpdated(el);

    const selectedOption = el.querySelector('auro-menuoption[value="Apples"]');
    el.optionSelected = [selectedOption];
    await elementUpdated(el);

    await expect(el.value).to.deep.equal(['Apples']);
    await expect(el.optionSelected[0]).to.equal(selectedOption);
  });

  it('reset selection value programmatically', async () => {
    const el = await presetValueFixture(mobileview);

    el.value = undefined;

    await elementUpdated(el);

    await expect(el.optionSelected).to.be.equal(undefined);
  });

  it('makes a selection using the keyboard', async () => {
    const el = await defaultFixture(mobileview);

    setInputValue(el, 'a');
    await elementUpdated(el);

    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await elementUpdated(el);

    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await elementUpdated(el);

    await expect(Array.isArray(el.value)).to.be.true;
    await expect(el.value[0]).to.equal('Apples');
  });

  it('Does not throw an error state when trying to programmatically set a value that doesn\'t match an option', async () => {
    const el = await defaultFixture(mobileview);

    const menu = el.querySelector('auro-menu');

    await expect(el.hasAttribute('error')).to.be.false;

    el.value = ['Dragon Fruit'];

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

    el.focus();

    // no error when input has a value
    setInputValue(el, 'pp');
    el.input.blur();

    await elementUpdated(el);

    await expect(el.getAttribute('validity')).to.be.equal('valid');
  });

  it('default to nocheckmark on selected option', async () => {
    const el = await defaultFixture(mobileview);

    const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
    const menu = dropdown.bibContent.querySelector('auro-menu');
    await expect(menu.hasAttribute('nocheckmark')).to.be.true;
  });

  it('selected options have checkmark when checkmark attribute is present', async () => {
    const el = await checkmarkFixture(mobileview);

    const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
    const menu = dropdown.bibContent.querySelector('auro-menu');
    await expect(menu.hasAttribute('nocheckmark')).to.be.false;
  });

  it('reset method clears the value and validity state', async () => {
    const el = await requiredFixture(mobileview);

    el.focus();
    el.shadowRoot.activeElement.blur();

    await elementUpdated(el);
    await expect(el.getAttribute('validity')).to.be.equal('valueMissing');

    el.reset();

    await elementUpdated(el);

    await expect(el.hasAttribute('validity')).to.be.false;
    await expect(el.value).to.equal(undefined);
  });
}

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
  return await fixture(html`
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
  return await fixture(html`
    <auro-combobox value='["Apples"]'>
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
  return await fixture(html`
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
  return await fixture(html`
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
  return await fixture(html`
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
  return await fixture(html`
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
  return await fixture(html`
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
  return await fixture(html`
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
  return await fixture(html`
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

  input.value = value;
  input.dispatchEvent(new InputEvent('input'));
  auroInput.dispatchEvent(new Event('input', {bubbles:true}));
}

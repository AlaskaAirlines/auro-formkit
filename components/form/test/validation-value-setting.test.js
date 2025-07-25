/* eslint-disable no-magic-numbers */
/* eslint-disable no-underscore-dangle,max-lines,array-element-newline */

import {fixture, html, expect, elementUpdated} from '@open-wc/testing';

// !AURO ELEMENT REGISTRATION MUST BE DONE BEFORE AURO FORM REGISTRATION! //

import '@aurodesignsystem/auro-menu/src/registered';

import '@aurodesignsystem/auro-checkbox/src/registered';
import '@aurodesignsystem/auro-combobox/src/registered';
import '@aurodesignsystem/auro-counter/src/registered';
import '@aurodesignsystem/auro-datepicker/src/registered';
import '@aurodesignsystem/auro-input/src/registered';
import '@aurodesignsystem/auro-radio/src/registered';
import '@aurodesignsystem/auro-select/src/registered';


const CHECKBOX_TEMPLATE = html`
<auro-checkbox-group required>
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="value1" name="basic" id="checkbox-basic1">Checkbox option</auro-checkbox>
  <auro-checkbox value="value2" name="basic" id="checkbox-basic2">Checkbox option</auro-checkbox>
  <auro-checkbox value="value3" name="basic" id="checkbox-basic3">Checkbox option that has some extra text that should wrap when rendered in a narrow container</auro-checkbox>
  <auro-checkbox value="value4" name="basic" id="checkbox-basic4">Checkbox option</auro-checkbox>
</auro-checkbox-group>
`;

const RADIO_TEMPLATE = html`
<auro-radio-group>
  <span slot="legend">Form label goes here</span>
  <auro-radio id="basicGroupRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
  <auro-radio id="basicGroupRadio2" label="No" name="radioDemo" value="no"></auro-radio>
  <auro-radio id="basicGroupRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
</auro-radio-group>
`;

const INPUT_TEMPLATE = html`
  <auro-input>
    <span slot="label">Label</span>
    <span slot="helpText">Help Text</span>
  </auro-input>
`;

const COMBOBOX_TEMPLATE = html`
<auro-combobox required>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
`;

const SELECT_TEMPLATE = html`
<auro-select required>
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <span slot="label">Select Example</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>

`;

const MULTI_SELECT_TEMPLATE = html`
<auro-select required multiSelect>
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <span slot="label">Select Example</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>
`;

const COUNTER_TEMPLATE = html`
<auro-counter min="1" max="5">
  Adults
  <span slot="description">Min: 1, Max: 5</span>
</auro-counter>
`;

const COUNTER_GROUP_TEMPLATE = html`
<auro-counter-group max="12" min="0">
  <auro-counter name="first">
    Short label
  </auro-counter>
  <auro-counter name="second">
    This is an example of the wrapping behavior for a long label
  </auro-counter>
</auro-counter-group>
`;

const DATEPICKER_TEMPLATE = html`
<auro-datepicker required layout="snowflake">
  <span slot="bib.fullscreen.headline">Datepicker Headline</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
`;

async function getFixtureWithValueAttr(htmlTemplate, value) {
  const element = await fixture(htmlTemplate);
  if (value) {
    element.setAttribute('value', value);
    await elementUpdated(element);
  }
  return element;
}

async function getFixtureWithValueProp(htmlTemplate, value) {
  const element = await fixture(htmlTemplate);
  if (value) {
    element.value = value;
    await elementUpdated(element);
  }
  return element;
}

// checkbox does not support this
describe.skip('checkbox', () => {
  it('value attribute works ', async () => {
    const el = await getFixtureWithValueAttr(CHECKBOX_TEMPLATE, ['value2']);
    await expect(el.value).to.equal(['value2']);
    await expect(el.children[2].hasAttribute('checked')).to.be.true;
  });

  it('value property works', async () => {
    const el = await getFixtureWithValueProp(CHECKBOX_TEMPLATE, ['value2', 'value3']);
    await expect(el.children[2].hasAttribute('checked')).to.be.true;
    await expect(el.children[3].hasAttribute('checked')).to.be.true;
  });
});

// radio does not support this
describe.skip('radio', () => {
  it('value attribute works ', async () => {
    const el = await getFixtureWithValueAttr(RADIO_TEMPLATE, 'yes');
    await expect(el.value).to.equal('yes');
    await expect(el.children[1].getAttribute('aria-checked')).to.equal('true');
  });

  it('value property works', async () => {
    const el = await getFixtureWithValueProp(RADIO_TEMPLATE, 'yes');
    await expect(el.value).to.equal('yes');
    await expect(el.children[1].getAttribute('aria-checked')).to.equal('true');
  });
});

describe('input', () => {
  it('value attribute works ', async () => {
    const el = await getFixtureWithValueAttr(INPUT_TEMPLATE, 'some text');
    await expect(el.value).to.equal('some text');

    const innerInput = el.shadowRoot.querySelector('input');
    await expect(innerInput.value).to.equal('some text');
  });

  it('value property works', async () => {
    const el = await getFixtureWithValueProp(INPUT_TEMPLATE, 'some text');
    await expect(el.value).to.equal('some text');

    const innerInput = el.shadowRoot.querySelector('input');
    await expect(innerInput.value).to.equal('some text');
  });
});


describe('combobox', () => {
  it('value attribute works ', async () => {
    const el = await getFixtureWithValueAttr(COMBOBOX_TEMPLATE, 'Apples');
    await expect(el.value).to.equal('Apples');

    const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
    const innerInput = dropdown.querySelector('[auro-input]');
    await expect(innerInput.value).to.equal('Apples');
  });

  it('value property works', async () => {
    const el = await getFixtureWithValueProp(COMBOBOX_TEMPLATE, 'Apples');
    await expect(el.value).to.equal('Apples');

    const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
    const innerInput = dropdown.querySelector('[auro-input]');
    await expect(innerInput.value).to.equal('Apples');
  });
});

describe('select', () => {
  it('value attribute works ', async () => {
    const el = await getFixtureWithValueAttr(SELECT_TEMPLATE, 'price');

    const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
    const trigger = dropdown.querySelector("#triggerFocus");
    await expect(trigger.textContent.includes("Price")).to.be.true;
    await expect(el.value).to.equal('price');
  });

  it('value property works', async () => {
    const el = await getFixtureWithValueProp(SELECT_TEMPLATE, 'price');
    await expect(el.value).to.equal('price');

    const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
    const trigger = dropdown.querySelector("#triggerFocus");
    await expect(trigger.textContent.includes("Price")).to.be.true;
  });
});


describe('select with multi-select', () => {
  it('value attribute works ', async () => {
    const initialValueObj = ['price', 'arrival'];
    const el = await getFixtureWithValueAttr(MULTI_SELECT_TEMPLATE, JSON.stringify(initialValueObj));
    await expect(JSON.parse(el.value)).to.eql(initialValueObj);

    const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
    const trigger = dropdown.querySelector("#triggerFocus");
    await expect(trigger.textContent.includes("Price")).to.be.true;
    await expect(trigger.textContent.includes("Arrival")).to.be.true;
  });

  it('value property works', async () => {
    const initialValueObj = ['price', 'arrival'];
    const el = await getFixtureWithValueProp(MULTI_SELECT_TEMPLATE, JSON.stringify(initialValueObj));
    await expect(JSON.parse(el.value)).to.eql(initialValueObj);

    const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
    const trigger = dropdown.querySelector("#triggerFocus");
    await expect(trigger.textContent.includes("Price")).to.be.true;
    await expect(trigger.textContent.includes("Arrival")).to.be.true;
  });
});

describe('counter', () => {
  it('value attribute works ', async () => {
    const el = await getFixtureWithValueAttr(COUNTER_TEMPLATE, 3);
    await expect(el.value).to.eql(3);
  });

  it('value property works', async () => {
    const el = await getFixtureWithValueProp(COUNTER_TEMPLATE, 3);
    await expect(el.value).to.eql(3);
  });
});

// counter-group does not support this
describe.skip('counter-group', () => {
  it('value attribute works ', async () => {
    const el = await getFixtureWithValueAttr(COUNTER_GROUP_TEMPLATE, JSON.stringify({'first': 2, 'second': 4}));

    await expect(el.children[0].value).to.eql(2);
    await expect(el.children[1].value).to.eql(4);
    await expect(el.value).to.eql(3);
  });

  it('value property works', async () => {
    const el = await getFixtureWithValueProp(COUNTER_GROUP_TEMPLATE, {'first': 2, 'second': 4});
    await expect(el.children[0].value).to.eql(2);
    await expect(el.children[1].value).to.eql(4);
    await expect(el.value).to.eql(3);
  });
});

describe('datepicker', () => {
  it('value attribute works ', async () => {
    const el = await getFixtureWithValueAttr(DATEPICKER_TEMPLATE, '04/03/2023');
    await expect(el.value).to.equal('04/03/2023');
    const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
    const innerInput = dropdown.querySelector('[auro-input]');
    await expect(innerInput.value).to.equal('04/03/2023');
  });

  it('value property works', async () => {
    const el = await getFixtureWithValueProp(DATEPICKER_TEMPLATE, '04/03/2023');
    await expect(el.value).to.equal('04/03/2023');

    const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
    const innerInput = dropdown.querySelector('[auro-input]');
    await expect(innerInput.value).to.equal('04/03/2023');
  });
});

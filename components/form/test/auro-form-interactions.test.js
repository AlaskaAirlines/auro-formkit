/* eslint-disable no-underscore-dangle,max-lines,array-element-newline */

import {fixture, html, expect, elementUpdated, oneEvent} from '@open-wc/testing';

// !AURO ELEMENT REGISTRATION MUST BE DONE BEFORE AURO FORM REGISTRATION! //
import '../demo/registerDemoDeps.js';
import '../src/registered.js';

/**
 * Shared tests to dedupe maintenance effort.
 * @param {string} name - Identifier for naming tests.
 * @param {*} markup - The HTML markup, including just one form and one form element.
 */
function useSharedTestBehavior(name, markup) {
  const getElement = () => fixture(markup);

  describe(`${name} automatic form behavior`, () => {
    it.skip('should be accessible', async () => {
      const form = await getElement();
      await expect(form).to.be.accessible();
    });

    it('should get included as an auro form element', async () => {
      const form = await getElement();
      await expect(form._elements).to.have.length(1);
    });

    it('value should be available on form.value via name attribute', async () => {
      const form = await getElement();
      const formMemberName = form._elements[0].getAttribute('name');

      await expect(form.value).to.have.key(formMemberName);
    });
  });
}

describe('auro-form', () => {
  describe('when an auro-input is present', () => {
    useSharedTestBehavior('auro-input', html`
      <auro-form>
        <auro-input name="myInput">
          <span slot="label">Input</span>
        </auro-input>
      </auro-form>
    `);
  });

  describe('when an auro-checkbox-group is present', () => {
    const componentTemplate = html`
      <auro-form>
        <auro-checkbox-group name="testGroup">
          <span slot="legend">Form label goes here</span>
          <auro-checkbox value="value1" id="checkbox-basic1">Checkbox option</auro-checkbox>
          <auro-checkbox value="value2" id="checkbox-basic2" checked>Checkbox option</auro-checkbox>
          <auro-checkbox value="value3" id="checkbox-basic3">Checkbox option</auro-checkbox>
          <auro-checkbox value="value4" id="checkbox-basic4">Checkbox option</auro-checkbox>
        </auro-checkbox-group>
      </auro-form>
    `;

    useSharedTestBehavior('auro-checkbox-group', componentTemplate);

    it('should surface checkbox group values as an array', async () => {
      const form = await fixture(componentTemplate);
      const [checkboxGroup] = form._elements;

      await elementUpdated(checkboxGroup);
      await expect(form.value.testGroup).to.eql(['value2']);
    });
  });

  describe('when an auro-datepicker is present', () => {
    const template = html`
      <auro-form>
        <auro-datepicker id="date-example" name="dateExample" required>
          <span slot="fromLabel">Choose a date</span>
          <span slot="bib.fullscreen.dateLabel">Choose a date</span>
        </auro-datepicker>
      </auro-form>
    `;

    useSharedTestBehavior('auro-datepicker', template);

    it.skip('should surface values from datepicker without `range` attribute as a string', async () => {
      const form = await fixture(template);
      const [datePicker] = form._elements;
      const [input] = datePicker.inputList;

      await expect(form.value.dateExample).to.equal(null);

      input.value = '04/03/2023';
      await elementUpdated(form);
      await expect(form.value.dateExample).to.equal('04/03/2023');
    });

    it.skip('should surface values from datepicker with `range` attribute as a string array', async () => {
      const form = await fixture(html`
        <auro-form>
          <auro-datepicker id="date-example" name="dateExample" range required>
            <span slot="fromLabel">Choose a date</span>
            <span slot="bib.fullscreen.dateLabel">Choose a date</span>
          </auro-datepicker>
        </auro-form>
      `);
      const [datePicker] = form._elements;
      const [input, input2] = datePicker.inputList;

      await expect(form.value.dateExample).to.equal(null);

      input.value = '04/03/2023';
      input2.value = '04/04/2023';

      await elementUpdated(form);
      await expect(form.value.dateExample).to.deep.equal(['04/03/2023', '04/04/2023']);
    });
  });

  describe('when an auro-radio-group is present', () => {
    const componentTemplate = html`
      <auro-form>
        <auro-radio-group name="testGroup">
          <span slot="legend">Form label goes here</span>
          <auro-radio id="radio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
          <auro-radio id="radio2" label="No" name="radioDemo" value="no"></auro-radio>
          <auro-radio id="radio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
        </auro-radio-group>
      </auro-form>
    `;

    useSharedTestBehavior('auro-radio-group', componentTemplate);

    // DOES NOT WORK. radio group needs to emit an input event!
    it('should surface radio group value as a string', async () => {
      const form = await fixture(componentTemplate);
      const [radioGroup] = form._elements;
      const [radioOne] = [...form.querySelectorAll('auro-radio')];
      const radioInput = radioOne.shadowRoot.querySelector('input');

      await expect(form.value.testGroup).to.equal(null);

      const eventPromise = new Promise((resolve) => {
        radioGroup.addEventListener('input', (event) => {
          if (event.target.getAttribute('name') === 'testGroup') {
            resolve(event);
          }
        });
      });

      await radioInput.click();

      await eventPromise;
      await elementUpdated(radioGroup);
      await elementUpdated(form);

      await expect(form.value.testGroup).to.equal('yes');
    });
  });

  describe('when an auro-combobox is present', () => {
    const componentTemplate = html`
      <auro-form>
        <auro-combobox name="comboTest">
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
      </auro-form>
    `;

    useSharedTestBehavior('auro-combobox', componentTemplate);

    it('should store combobox value as a string array', async () => {
      const form = await fixture(componentTemplate);
      const [combobox] = form._elements;

      setTimeout(() => {
        combobox.value = 'Oranges';
      }, 0);

      // wait form form.formState to update.
      await oneEvent(form, 'change');

      await expect(form.value.comboTest).to.deep.equal('Oranges');
    });
  });

  describe('when an auro-counter-group is present', () => {
    const componentTemplate = html`
      <auro-form>
        <auro-counter-group name="someCounterGroup" isDropdown>
          <auro-counter name="shortLabel">
            Short label
          </auro-counter>
        </auro-counter-group>
      </auro-form>
    `;

    useSharedTestBehavior('auro-counter-group', componentTemplate);

    it('should store counter group value as an object', async () => {
      const form = await fixture(componentTemplate);
      const [counterGroup] = form._elements;
      const someNumber = 5;

      counterGroup.counters[0].increment(someNumber);

      await elementUpdated(counterGroup);
      await elementUpdated(form);
      await expect(form.value.someCounterGroup).to.deep.equal({ shortLabel: someNumber });
    });
  });

  describe('when an auro-select is present', () => {
    const componentTemplate = html`
      <auro-form>
        <auro-select name="selectExample">
          <auro-menu>
            <auro-menuoption value="stops">Stops</auro-menuoption>
            <auro-menuoption value="price">Price</auro-menuoption>
            <auro-menuoption value="duration">Duration</auro-menuoption>
            <auro-menuoption value="departure">Departure</auro-menuoption>
            <auro-menuoption value="arrival">Arrival</auro-menuoption>
            <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
          </auro-menu>
        </auro-select>
      </auro-form>
    `;

    useSharedTestBehavior('auro-select', componentTemplate);

    it('should store select value as a string', async () => {
      const form = await fixture(componentTemplate);
      const [select] = form._elements;

      // wait for the select 'input' event to ensure we're testing that part of the code
      const selectEvent = new Promise((resolve) => {
        select.addEventListener('input', (event) => {
          if (event.target.getAttribute('name') === 'selectExample') {
            resolve(event);
          }
        });
      });

      select.value = 'stops';
      await selectEvent;
      await elementUpdated(form);

      await expect(form.value.selectExample).to.deep.equal('stops');
    });

    it('should store select value as a string', async () => {
      const form = await fixture(componentTemplate);
      const [select] = form._elements;
      select.multiSelect = true;
      await elementUpdated(select);

      // wait for the select 'input' event to ensure we're testing that part of the code
      const selectEvent = new Promise((resolve) => {
        select.addEventListener('input', (event) => {
          if (event.target.getAttribute('name') === 'selectExample') {
            resolve(event);
          }
        });
      });

      select.value = ['stops'];
      await selectEvent;
      await elementUpdated(form);

      await expect(form.value.selectExample).to.deep.equal(JSON.stringify(['stops']));
    });
  });
});

/* eslint-disable max-lines, no-unused-expressions, no-undef, no-plusplus, no-await-in-loop, no-implicit-coercion, jsdoc/require-jsdoc */

import { fixture, html, expect, elementUpdated, oneEvent } from '@open-wc/testing';
import { useAccessibleIt } from "@aurodesignsystem/auro-library/scripts/test-plugin/iterateWithA11Check.mjs";
import '../src/registered.js';
import { dateFormatter } from "@aurodesignsystem/auro-library/scripts/runtime/dateUtilities/dateFormatter.mjs";

useAccessibleIt();

const { toISOFormatString } = dateFormatter;

function setInputValue(el, value) {
  const input = el.shadowRoot.querySelector('input');
  input.value = value;
  input.dispatchEvent(new InputEvent('input'));
}

describe('auro-input type="date"', () => {
  it('date inputs use programmatic placeholder', async () => {
    // All date types and their default placeholders at their corresponding index
    const dateFormats = [
      'mm/dd/yyyy',
      'dd/mm/yyyy',
      'yyyy/mm/dd',
      'yyyy/dd/mm',
      'mm/yy',
      'yy/mm',
      'mm/yyyy',
      'yyyy/mm',
      'yy',
      'yyyy',
      'mm',
      'dd'
    ];

    for (let index = 0; index < dateFormats.length; index++) {
      const el = await fixture(html`
        <auro-input type="date" format=${dateFormats[index]}></auro-input>
      `);

      expect(el.placeholderStr).to.equal(dateFormats[index].toUpperCase());

      el.placeholder = "some date";

      expect(el.placeholderStr).not.to.equal(dateFormats[index].toUpperCase());
    }
  });

  it('type date validity checked correctly', async () => {
    const el = await fixture(html`
      <auro-input type="date"></auro-input>
    `);

    el.value = '10/10/202';

    await elementUpdated(el);

    expect(el.getAttribute('validity')).to.be.equal('tooShort');

    el.value = '10/10/2022';

    await elementUpdated(el);

    expect(el.getAttribute('validity')).to.be.equal('valid');
  });

  it('MM/YY format validity checked correctly', async () => {
    const el = await fixture(html`
      <auro-input type="date" format="MM/YY"></auro-input>
    `);

    el.value = '10/';

    await elementUpdated(el);

    expect(el.getAttribute('validity')).to.be.equal('tooShort');

    el.value = '10/22';

    await elementUpdated(el);

    expect(el.getAttribute('validity')).to.be.equal('valid');
  });

  it('format MM/YYYY validity checked correctly', async () => {
    const el = await fixture(html`
      <auro-input type="date" format="MM/YYYY"></auro-input>
    `);

    el.value = '10/';

    await elementUpdated(el);

    expect(el.getAttribute('validity')).to.be.equal('tooShort');

    el.value = '10/2022';

    await elementUpdated(el);

    expect(el.getAttribute('validity')).to.be.equal('valid');
  });

  it('format YYYY/MM/DD validity checked correctly', async () => {
    const el = await fixture(html`
      <auro-input type="date" format="YYYY/MM/DD"></auro-input>
    `);

    el.value = '20';

    await elementUpdated(el);

    expect(el.getAttribute('validity')).to.be.equal('tooShort');

    el.value = '2022/10/10';

    await elementUpdated(el);

    expect(el.getAttribute('validity')).to.be.equal('valid');
  });

  it('calendar-invalid full date is marked as invalid', async () => {
    const el = await fixture(html`
      <auro-input type="date" format="mm/dd/yyyy"></auro-input>
    `);

    el.value = '02/29/2023';

    await elementUpdated(el);

    expect(el.getAttribute('validity')).to.be.equal('invalidDate');
  });

  it('out-of-range month/day segments are marked as invalid', async () => {
    const el = await fixture(html`
      <auro-input type="date" format="mm/dd/yyyy"></auro-input>
    `);

    el.value = '13/32/2024';

    await elementUpdated(el);

    expect(el.getAttribute('validity')).to.be.equal('invalidDate');
  });

  it('type date validity checked correctly when using the max attribute', async () => {
    const el = await fixture(html`
      <auro-input type="date" max="2023-03-03"></auro-input>
    `);

    el.value = '2023-03-03';

    await elementUpdated(el);

    expect(el.getAttribute('validity')).to.be.equal('valid');

    el.value = '2023-03-04';

    await elementUpdated(el);

    expect(el.getAttribute('validity')).to.be.equal('rangeOverflow');
  });

  it('type date validity checked correctly when using the min attribute', async () => {
    const el = await fixture(html`
      <auro-input type="date" min="2023-03-03"></auro-input>
    `);

    el.value = '2023-03-04';

    await elementUpdated(el);

    expect(el.getAttribute('validity')).to.be.equal('valid');

    el.value = '2023-03-02';

    await elementUpdated(el);

    expect(el.getAttribute('validity')).to.be.equal('rangeUnderflow');
  });

  describe('handles date formatting', () => {
    it('mm/dd/yyyy', async () => {
      const el = await fixture(html`
        <auro-input type="date" format="mm/dd/yyyy"></auro-input>
      `);

      setInputValue(el, '12312000');
      await elementUpdated(el);
      expect(el.value).to.equal('2000-12-31');
      expect(el.inputElement.value).to.equal('12/31/2000');
    });

    it('dd/mm/yyyy', async () => {
      const el = await fixture(html`
        <auro-input id="format-date" type="date" format="dd/mm/yyyy"></auro-input>
      `);

      setInputValue(el, '31122000');
      await elementUpdated(el);
      expect(el.value).to.equal('2000-12-31');
      expect(el.inputElement.value).to.equal('31/12/2000');
    });

    it('yyyy/mm/dd', async () => {
      const el = await fixture(html`
        <auro-input id="format-date" type="date" format="yyyy/mm/dd"></auro-input>
      `);

      setInputValue(el, '20001231');
      await elementUpdated(el);
      expect(el.value).to.equal('2000-12-31');
      expect(el.inputElement.value).to.equal('2000/12/31');
    });

    it('yyyy/dd/mm', async () => {
      const el = await fixture(html`
        <auro-input id="format-date" type="date" format="yyyy/dd/mm"></auro-input>
      `);

      setInputValue(el, '20003112');
      await elementUpdated(el);
      expect(el.value).to.equal('2000-12-31');
      expect(el.inputElement.value).to.equal('2000/31/12');
    });

    it('mm/yy', async () => {
      const el = await fixture(html`
        <auro-input id="format-date" type="date" format="mm/yy"></auro-input>
      `);

      setInputValue(el, '1231');
      await elementUpdated(el);
      expect(el.value).to.equal('12/31');
    });

    it('yy/mm', async () => {
      const el = await fixture(html`
        <auro-input id="format-date" type="date" format="yy/mm"></auro-input>
      `);

      setInputValue(el, '9912');
      await elementUpdated(el);
      expect(el.value).to.equal('99/12');
    });

    it('mm/yyyy', async () => {
      const el = await fixture(html`
        <auro-input id="format-date" type="date" format="mm/yyyy"></auro-input>
      `);

      setInputValue(el, '122000');
      await elementUpdated(el);
      expect(el.value).to.equal('12/2000');
    });

    it('yyyy/mm', async () => {
      const el = await fixture(html`
        <auro-input id="format-date" type="date" format="yyyy/mm"></auro-input>
      `);

      setInputValue(el, '200012');
      await elementUpdated(el);
      expect(el.value).to.equal('2000/12');
    });

    it('yy', async () => {
      const el = await fixture(html`
        <auro-input id="format-date" type="date" format="yy"></auro-input>
      `);

      setInputValue(el, '99');
      await elementUpdated(el);
      expect(el.value).to.equal('99');
    });

    it('yyyy', async () => {
      const el = await fixture(html`
        <auro-input id="format-date" type="date" format="yyyy"></auro-input>
      `);

      setInputValue(el, '1999');
      await elementUpdated(el);
      expect(el.value).to.equal('1999');
    });

    it('mm', async () => {
      const el = await fixture(html`
        <auro-input id="format-date" type="date" format="mm"></auro-input>
      `);

      setInputValue(el, '12');
      await elementUpdated(el);
      expect(el.value).to.equal('12');
    });

    it('dd', async () => {
      const el = await fixture(html`
        <auro-input id="format-date" type="date" format="dd"></auro-input>
      `);

      setInputValue(el, '31');
      await elementUpdated(el);
      expect(el.value).to.equal('31');
    });
  });
});

describe('auro-input type="date" - initializeDateValue behavior', () => {
  it('does not run date initialization when type is not "date"', async () => {

    // Arrange
    const el = await fixture(html`
      <auro-input type="text" value="01/01/2024" min="2023-01-01" max="2024-12-31"></auro-input>
    `);

    const initialValue = el.value;
    const initialMin = el.min;
    const initialMax = el.max;

    // Act
    await elementUpdated(el);

    // Assert
    expect(el.value).to.equal(initialValue);
    expect(el.min).to.equal(initialMin);
    expect(el.max).to.equal(initialMax);
  });

  it('happy path: string value, min, max -> readonly object getters are populated', async () => {

    // Arrange
    const el = await fixture(html`
      <auro-input type="date"></auro-input>
    `);

    el.value = '2024-05-10';
    el.min = '2024-01-01';
    el.max = '2024-12-31';

    // Act

    await elementUpdated(el);

    // Assert
    expect(el.value).to.equal('2024-05-10');
    expect(el.min).to.equal('2024-01-01');
    expect(el.max).to.equal('2024-12-31');
    expect(toISOFormatString(el.valueObject)).to.equal('2024-05-10');
    expect(toISOFormatString(el.minObject)).to.equal('2024-01-01');
    expect(toISOFormatString(el.maxObject)).to.equal('2024-12-31');
  });

  it('happy path: string value, min, max but no objects -> objects populated from strings', async () => {

    // Arrange
    const el = await fixture(html`
      <auro-input type="date"></auro-input>
    `);

    // use ISO-like strings since initializeDateValue uses dateFormatter.stringToDate
    el.value = '2024-06-15';
    el.min = '2024-01-01';
    el.max = '2024-12-31';

    // Act

    await elementUpdated(el);

    // Assert
    expect(el.valueObject).to.be.instanceOf(Date);
    expect(toISOFormatString(el.valueObject)).to.equal('2024-06-15');

    expect(el.minObject).to.be.instanceOf(Date);
    expect(toISOFormatString(el.minObject)).to.equal('2024-01-01');

    expect(el.maxObject).to.be.instanceOf(Date);
    expect(toISOFormatString(el.maxObject)).to.equal('2024-12-31');
  });

  it('valueObject, minObject, and maxObject are readonly public getters', async () => {

    // Arrange
    const el = await fixture(html`
      <auro-input type="date"></auro-input>
    `);

    function findDescriptor(obj, prop) {
      let proto = Object.getPrototypeOf(obj);
      while (proto && proto !== Object.prototype) {
        const desc = Object.getOwnPropertyDescriptor(proto, prop);
        if (desc) return desc;
        proto = Object.getPrototypeOf(proto);
      }
      return undefined;
    }

    const valueObjectDescriptor = findDescriptor(el, 'valueObject');
    const minObjectDescriptor = findDescriptor(el, 'minObject');
    const maxObjectDescriptor = findDescriptor(el, 'maxObject');

    expect(valueObjectDescriptor).to.exist;
    expect(valueObjectDescriptor.get).to.be.a('function');
    expect(valueObjectDescriptor.set).to.be.undefined;
    expect(minObjectDescriptor).to.exist;
    expect(minObjectDescriptor.get).to.be.a('function');
    expect(minObjectDescriptor.set).to.be.undefined;
    expect(maxObjectDescriptor).to.exist;
    expect(maxObjectDescriptor.get).to.be.a('function');
    expect(maxObjectDescriptor.set).to.be.undefined;
  });

  it('value empty but min and max provided as strings -> only minObject and maxObject created', async () => {

    // Arrange
    const el = await fixture(html`
      <auro-input type="date"></auro-input>
    `);

    el.value = '';
    el.min = '2024-01-01';
    el.max = '2024-12-31';

    // Act

    await elementUpdated(el);

    // Assert
    expect(el.valueObject).to.be.undefined;

    expect(el.minObject).to.be.instanceOf(Date);
    expect(toISOFormatString(el.minObject)).to.equal('2024-01-01');

    expect(el.maxObject).to.be.instanceOf(Date);
    expect(toISOFormatString(el.maxObject)).to.equal('2024-12-31');
  });

  it('only value string provided, min/max missing -> only valueObject is created', async () => {

    // Arrange
    const el = await fixture(html`
      <auro-input type="date"></auro-input>
    `);

    el.value = '2024-03-10';

    // Act
    await elementUpdated(el);

    // Assert
    expect(el.valueObject).to.be.instanceOf(Date);
    expect(toISOFormatString(el.valueObject)).to.equal('2024-03-10');
    expect(el.minObject).to.be.undefined;
    expect(el.maxObject).to.be.undefined;
  });

  it('edge: min string provided, no max string -> minObject created and maxObject still remains undefined', async () => {

    // Arrange
    const el = await fixture(html`
      <auro-input type="date"></auro-input>
    `);

    // the underlying formatter expects yyyy-mm-dd; for coverage, we also leave max undefined
    el.min = '2024-01-01';
    el.max = undefined;

    // Act
    await elementUpdated(el);

    // Assert
    expect(el.minObject).to.be.instanceOf(Date);
    expect(toISOFormatString(el.minObject)).to.equal('2024-01-01');

    // Because of the "else if (this.min)" condition, it will call stringToDate(this.max)
    // which yields Date(undefined) -> Invalid Date, but still a Date instance.
    expect(el.maxObject).to.be.undefined;
  });

  it('edge: max string provided but min missing -> maxObject is set', async () => {

    // Arrange
    const el = await fixture(html`
      <auro-input type="date"></auro-input>
    `);

    el.max = '2024-12-31';

    // Act
    await elementUpdated(el);

    // Assert
    expect(el.maxObject).to.be.instanceOf(Date);
    expect(toISOFormatString(el.maxObject)).to.equal('2024-12-31');
    expect(el.minObject).to.be.undefined;
  });

  it('invalid value string does not populate valueObject', async () => {

    // Arrange
    const el = await fixture(html`
      <auro-input type="date"></auro-input>
    `);

    // Act: set an invalid ISO string
    el.value = '2024-99-99';
    await elementUpdated(el);

    // Assert: valueObject is not set for invalid dates
    expect(el.valueObject).to.be.undefined;
  });

  it('edge: all date-related fields undefined -> initializeDateValue is a no-op', async () => {

    // Arrange
    const el = await fixture(html`
      <auro-input type="date"></auro-input>
    `);

    el.value = undefined;
    el.min = undefined;
    el.max = undefined;

    // Act

    await elementUpdated(el);

    // Assert
    expect(el.value).to.be.undefined;
    expect(el.valueObject).to.be.undefined;
    expect(el.min).to.be.undefined;
    expect(el.minObject).to.be.undefined;
    expect(el.max).to.be.undefined;
    expect(el.maxObject).to.be.undefined;
  });

  it('keeps ISO model value and updates display when format changes after initialization', async () => {

    // Arrange
    const el = await fixture(html`
      <auro-input type="date" format="mm/dd/yyyy"></auro-input>
    `);

    const expectedISO = '2024-12-31';
    el.value = expectedISO;
    await elementUpdated(el);

    // Assert initial model/display
    expect(el.value).to.equal(expectedISO);
    const initialDisplayValue = el.inputElement.value;
    expect(initialDisplayValue).to.equal('12/31/2024');

    // Act
    el.format = 'dd/mm/yyyy';
    await elementUpdated(el);

    // Assert model remains ISO while display follows new format
    expect(el.value).to.equal(expectedISO);
    expect(el.inputElement.value).to.equal('31/12/2024');
    expect(el.inputElement.value).to.not.equal(initialDisplayValue);
  });

  it('does not sync valueObject/value for non-full-date formats', async () => {

    // Arrange
    const el = await fixture(html`
      <auro-input type="date" format="mm/yy"></auro-input>
    `);

    // Act + Assert: value should not parse into valueObject for partial formats
    el.value = '12/24';
    await elementUpdated(el);

    expect(el.value).to.equal('12/24');
    expect(el.valueObject).to.be.undefined;

    let proto = Object.getPrototypeOf(el);
    let valueObjectDescriptor;
    while (proto && proto !== Object.prototype) {
      valueObjectDescriptor = Object.getOwnPropertyDescriptor(proto, 'valueObject');
      if (valueObjectDescriptor) break;
      proto = Object.getPrototypeOf(proto);
    }
    expect(valueObjectDescriptor).to.exist;
    expect(valueObjectDescriptor.set).to.be.undefined;
  });
});

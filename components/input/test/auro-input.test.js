/* eslint-disable max-lines, no-unused-expressions, no-undef, no-plusplus, no-await-in-loop, no-implicit-coercion, jsdoc/require-jsdoc */

import { fixture, html, expect, elementUpdated, oneEvent } from '@open-wc/testing';
import { useAccessibleIt } from "@aurodesignsystem/auro-library/scripts/test-plugin/iterateWithA11Check.mjs";
import '../src/registered.js';

useAccessibleIt();

function setInputValue(el, value) {
  const input = el.shadowRoot.querySelector('input');
  input.value = value;
  input.dispatchEvent(new InputEvent('input'));
}

describe('auro-input', () => {
  it('web component is successfully created in the document', async () => {
    // This test fails when attributes are put onto the component before it is attached to the DOM
    const el = document.createElement('auro-input');

    await expect(el.localName).to.equal('auro-input');
  });

  it('sets value on the input', async () => {
    const el = await fixture(html`
      <auro-input value="other value" label="First name"></auro-input>
    `);

    const input = el.shadowRoot.querySelector('input');

    await expect(input.value).to.equal('other value');
  });

  it('sets placeholder on the input', async () => {
    const el = await fixture(html`
      <auro-input id="demo50" required placeholder="John Doe">
        <span slot="label">Full name</span>
      </auro-input>
    `);

    const input = el.shadowRoot.querySelector('input');

    await expect(input).to.have.attribute('placeholder', 'John Doe');
  });

  it('sets inputmode attribute on the input when passed as attribute or prop', async () => {
    const el = await fixture(html`
      <auro-input></auro-input>
    `);

    const inputmode = "numeric";
    el.inputmode = inputmode;
    await elementUpdated(el);

    const input = el.shadowRoot.querySelector('input');
    await expect(input.getAttribute("inputmode"), inputmode);

    input.removeAttribute('inputmode');
    await elementUpdated(el);
    await expect(input.hasAttribute('inputmode')).to.be.false;
  });

  it('allows the user to manually define inputmode for input types that set a default inputmode', async () => {
    const el = await fixture(html`
      <auro-input type="tel" inputmode="text"></auro-input>
    `);

    const input = el.shadowRoot.querySelector('input');
    expect(input).to.have.attribute('inputmode', 'text');
  });

  it('Sets custom pattern and setCustomValidity message', async () => {
    const el = await fixture(html`
      <auro-input value="other value" pattern="zzz" setCustomValidity="that is not a valid entry" keyValidate>
        <span slot="label">First name:</span>
      </auro-input>
    `);
    const input = el.shadowRoot.querySelector('input');
    const text = el.shadowRoot.querySelector('auro-helptext, [auro-helptext]').textContent;

    await elementUpdated(el);

    input.focus();
    el.value = 'aaa';
    input.blur();

    await elementUpdated(el);

    expect(text).to.contain(`that is not a valid entry`);

    input.focus();
    el.value = 'zzz';
    input.blur();

    await elementUpdated(el);

    expect(el.getAttribute('validity')).to.equal('valid');
  });

  it('clears the value when clicked', async () => {
    const el = await fixture(html`
      <auro-input value="other value" label="First name"></auro-input>
    `);

    const clearButton = el.shadowRoot.querySelector('.clearBtn');
    clearButton.click();
    await elementUpdated();
    expect(el.value).to.equal('');
  });

  it('flips hide-password bit', async () => {
    const el = await fixture(html`
      <auro-input type="password" value="password" label="password"></auro-input>
    `);

    const toggle = el.shadowRoot.querySelector('.passwordBtn');
    const input = el.shadowRoot.querySelector('input');

    input.focus();
    el.value = 'test';
    await elementUpdated();
    toggle.click();
    await elementUpdated(input);
    expect(input.type).to.equal('text');

    toggle.click();
    await elementUpdated(input);
    expect(input.type).to.equal('password');
  });

  it('allows email type', async () => {
    const el = await fixture(html`
      <auro-input type="email"></auro-input>
    `);

    const input = el.shadowRoot.querySelector('input');
    expect(input.type).to.equal('email');
  });

  it('allows type number', async () => {
    const el = await fixture(html`
      <auro-input type="number"></auro-input>
    `);

    expect(el.inputMode).to.equal('numeric');
  });

  it('does not allow color type', async () => {
    const el = await fixture(html`
      <auro-input type="color"></auro-input>
    `);

    const input = el.shadowRoot.querySelector('input');
    expect(input.type).to.equal('text');
  });

  it('sets name', async () => {
    const el = await fixture(html`
      <auro-input name="test"></auro-input>
    `);

    const input = el.shadowRoot.querySelector('input');
    expect(input.name).to.equal('test');
  });

  it('sets value when input event triggered', async () => {
    const el = await fixture(html`
      <auro-input></auro-input>
    `);

    el.value = 'triggered';
    expect(el.value).to.equal('triggered');
  });

  it('fires input event when setting the value programmatically', async () => {
    const el = await fixture(html`
      <auro-input></auro-input>
    `);

    const listener = oneEvent(el, 'input');
    el.value = 'test';

    await elementUpdated(el);

    const { result } = await listener;

    expect(result).to.equal(undefined);
  });

  it('sets disabled class on label when component disabled', async () => {
    const el = await fixture(html`
      <auro-input disabled label="Disabled input"></auro-input>
    `);

    const label = el.shadowRoot.querySelector('label');
    expect([...label.classList]).to.contain('is-disabled');
  });

  it('sets readonly attribute on HTML5 input', async () => {
    const el = await fixture(html`
      <auro-input readonly></auro-input>
    `);

    expect(el.inputElement.hasAttribute('readonly')).to.be.true;

    el.removeAttribute('readonly');

    await elementUpdated(el);

    expect(el.inputElement.hasAttribute('readonly')).to.be.false;
  });

  it('validates input after first blur', async () => {
    const el = await fixture(html`
      <auro-input required label="Label"></auro-input>
    `);
    const input = el.shadowRoot.querySelector('input');

    expect(el.hasAttribute('validity')).to.be.false;

    input.focus();
    input.blur();

    await elementUpdated(el);

    expect(el.hasAttribute('validity')).to.be.true;
  });

  it('fires input event when validation executes', async () => {
    const el = await fixture(html`
      <auro-input required></auro-input>
    `);

    const listener = oneEvent(el, 'auroFormElement-validated');
    const input = el.shadowRoot.querySelector('input');

    input.focus();
    el.value = 'whatever';
    input.blur();

    await elementUpdated(el);

    const { result } = await listener;

    expect(result).to.equal(undefined);
  });

  it('validates correctly with noValidate attribute set and force = true passed to validate method', async () => {
    const el = await fixture(html`
      <auro-input type="email" label="Label" noValidate></auro-input>
    `);
    expect(el.hasAttribute('validity')).to.be.false;

    const input = el.shadowRoot.querySelector('input');

    input.focus();
    el.value = 'whatever@alaskaair.com';
    input.blur();

    await elementUpdated(el);

    el.validate(true);

    await elementUpdated(el);

    expect(el.hasAttribute('validity')).to.be.true;
    expect(el.getAttribute('validity')).to.be.equal('valid');

    el.value = 'whatever';

    el.validate(true);

    await elementUpdated(el);

    expect(el.hasAttribute('validity')).to.be.true;
    expect(el.getAttribute('validity')).to.be.equal('patternMismatch');
  });

  it('validates type="email" correctly', async () => {
    const el = await fixture(html`
      <auro-input type="email" label="Label"></auro-input>
    `);
    expect(el.hasAttribute('validity')).to.be.false;
    el.value = 'whatever@alaskaair.com';
    await elementUpdated(el);

    expect(el.hasAttribute('validity')).to.be.true;
    expect(el.getAttribute('validity')).to.be.equal('valid');

    el.value = 'whatever';

    await elementUpdated(el);

    expect(el.getAttribute('validity')).to.be.equal('patternMismatch');
  });

  it('validates auro-input on input', async () => {
    const el = await fixture(html`
        <auro-input id="validation1" required validateOnInput pattern="[a-zA-Z-.']+( +[a-zA-Z-.']+)+" setCustomValidity="Full name requires two or more names with at least one space.">
          <span slot="label">Full Name</span>
          <span slot="helpText">Please enter your full name as it appears on the card.</span>
        </auro-input>
    `);
    const input = el.shadowRoot.querySelector('input');

    input.focus();
    setInputValue(el, 'dale');
    await elementUpdated(el);
    expect(el.getAttribute('validity')).to.be.equal('patternMismatch');
    setInputValue(el, 'dale sande');
    await elementUpdated(el);
    expect(el.getAttribute('validity')).to.be.equal('valid');
  });

  it('does not validate when novalidate is true', async () => {
    const el = await fixture(html`
      <auro-input required type="email" label="Label" novalidate></auro-input>
    `);
    const input = el.shadowRoot.querySelector('input');

    input.focus();
    input.blur();
    await elementUpdated(el);

    expect(el.hasAttribute('validity')).to.be.false;
  });

  it('sets aria-invalid', async () => {
    const el = await fixture(html`
      <auro-input required></auro-input>
    `);

    expect(el.hasAttribute('validity')).to.be.false;
    expect(el.inputElement.hasAttribute('aria-invalid')).to.be.true;

    el.value = 'some value';
    await elementUpdated(el);

    expect(el.getAttribute('validity')).to.be.equal('valid');
    expect(el.hasAttribute('aria-invalid')).to.be.false;

    el.value = '';
    el.touched = true;
    await elementUpdated(el);

    expect(el.getAttribute('validity')).to.be.equal('valueMissing');
    expect(el.inputElement.hasAttribute('aria-invalid')).to.be.true;
  });

  it('is programmatically focusable', async () => {
    const el = await fixture(html`
      <auro-input label="Label"></auro-input>
    `);

    el.focus();
    expect(document.activeElement === el).to.be.true;
  });

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

      let placeholder = el.getPlaceholder();

      expect(placeholder).to.equal(dateFormats[index].toUpperCase());

      el.placeholder = "some date";

      placeholder = el.getPlaceholder();

      expect(placeholder).not.to.equal(dateFormats[index].toUpperCase());
    }
  });

  it('error attribute sets custom validity', async () => {
    const el = await fixture(html`
      <auro-input error="Custom Error Message"></auro-input>
    `);

    expect(el.getAttribute('validity')).to.be.equal('customError');

    const helpTextElem = el.shadowRoot.querySelector('auro-helptext, [auro-helptext]');
    expect(helpTextElem.textContent).to.contain('Custom Error Message');
  });

  it('updates validity when error message removed after creation', async () => {
    const el = await fixture(html`
      <auro-input error="Custom Error Message"></auro-input>
    `);

    expect(el.getAttribute('validity')).to.be.equal('customError');

    const helpTextElem = el.shadowRoot.querySelector('auro-helptext, [auro-helptext]');
    expect(helpTextElem.textContent).to.be.contain('Custom Error Message');

    el.removeAttribute('error');

    await elementUpdated(el);

    expect(el.getAttribute('validity')).to.equal('valid');
  });

  it('minlength validity checked correctly', async () => {
    const el = await fixture(html`
      <auro-input minlength="2"></auro-input>
    `);

    el.value = 'a';

    await elementUpdated(el);

    expect(el.getAttribute('validity')).to.be.equal('tooShort');

    el.value = 'aa';

    await elementUpdated(el);

    expect(el.getAttribute('validity')).to.be.equal('valid');
  });

  it('maxlength validity checked correctly', async () => {
    const el = await fixture(html`
      <auro-input maxlength="2"></auro-input>
    `);

    el.value = 'aaa';

    await elementUpdated(el);

    expect(el.getAttribute('validity')).to.be.equal('tooLong');

    el.value = 'aa';

    await elementUpdated(el);

    expect(el.getAttribute('validity')).to.be.equal('valid');
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

  it('type date validity checked correctly when using the max attribute', async () => {
    const el = await fixture(html`
      <auro-input type="date" max="03/03/2023"></auro-input>
    `);

    el.value = '03/03/2023';

    await elementUpdated(el);

    expect(el.getAttribute('validity')).to.be.equal('valid');

    el.value = '03/04/2023';

    await elementUpdated(el);

    expect(el.getAttribute('validity')).to.be.equal('rangeOverflow');
  });

  it('type date validity checked correctly when using the min attribute', async () => {
    const el = await fixture(html`
      <auro-input type="date" min="03/03/2023"></auro-input>
    `);

    el.value = '03/04/2023';

    await elementUpdated(el);

    expect(el.getAttribute('validity')).to.be.equal('valid');

    el.value = '03/02/2023';

    await elementUpdated(el);

    expect(el.getAttribute('validity')).to.be.equal('rangeUnderflow');
  });

  it('type numeric checked correctly when using the min attribute', async () => {
    const el = await fixture(html`
      <auro-input type="number" min="10"></auro-input>
    `);

    el.value = '10';

    await elementUpdated(el);

    expect(el.getAttribute('validity')).to.be.equal('valid');

    el.value = '9';

    await elementUpdated(el);

    expect(el.getAttribute('validity')).to.be.equal('rangeUnderflow');
  });

  it('type numeric checked correctly when using the min attribute', async () => {
    const el = await fixture(html`
      <auro-input type="number" max="10"></auro-input>
    `);

    el.value = '10';

    await elementUpdated(el);

    expect(el.getAttribute('validity')).to.be.equal('valid');

    el.value = '11';

    await elementUpdated(el);

    expect(el.getAttribute('validity')).to.be.equal('rangeOverflow');
  });

  it('is accessible', async () => {
    const el = await fixture(html`
      <auro-input cssclass="testClass" id="input-test"></auro-input>
    `);

    await expect(el).to.be.accessible();
  });

  it('defines the custom element', async () => {
    const el = await !!customElements.get("auro-input");

    await expect(el).to.be.true;
  });

  it('Sets spellcheck and autocapitalize values', async () => {
    const el = await fixture(html`
      <auro-input id="checkSpellCheck" type="text" required spellcheck="false"></auro-input>
    `);

    expect(el.shadowRoot.querySelector('input')).to.have.attribute('spellcheck', 'false');
    expect(el.shadowRoot.querySelector('input')).to.have.attribute('autocorrect', 'off');
    expect(el.shadowRoot.querySelector('input')).to.have.attribute('autocapitalize', 'none');
  });

  it('Does not set spellcheck and autocapitalize values', async () => {
    const el = await fixture(html`
      <auro-input id="checkSpellCheck" type="text" required spellcheck="true"></auro-input>
    `);

    expect(el.shadowRoot.querySelector('input')).to.have.attribute('spellcheck', 'true');
    expect(el.shadowRoot.querySelector('input')).to.not.have.attribute('autocorrect');
    expect(el.shadowRoot.querySelector('input')).to.not.have.attribute('autocapitalize');
  });

  it('reset method clears the value and validity state', async () => {
    const el = await fixture(html`
      <auro-input required minlength="12" value="Auro Team"></auro-input>
    `);

    expect(el.getAttribute('validity')).to.be.equal('tooShort');

    el.reset();

    await elementUpdated(el);

    expect(el.hasAttribute('validity')).to.be.false;
    expect(el.value).to.equal(undefined);
  });

  it('input value is formatted with passed in format and respects the format restrictions', async () => {
    const el = await fixture(html`
      <auro-input format="47440000"></auro-input>
    `);

    setInputValue(el, 'www');

    await elementUpdated(el);

    expect(el.value).to.equal('4744');

    setInputValue(el, '1234');

    await elementUpdated(el);

    expect(el.value).to.equal('47441234');
  });

  describe('handles phone number formatting', () => {
    it('default north american phone format', async () => {
      const el = await fixture(html`
        <auro-input type="tel"></auro-input>
      `);

      setInputValue(el, '5091234567');

      await elementUpdated(el);

      expect(el.value).to.equal('+1 (509) 123-4567');
    });

    it('custom phone format', async () => {
      const el = await fixture(html`
        <auro-input type="tel" format="+52 000 000 0000"></auro-input>
      `);

      setInputValue(el, '1234567890');

      await elementUpdated(el);

      expect(el.value).to.equal('+52 123 456 7890');
    });
  });

  describe('handles date formatting', () => {
    it('mm/dd/yyyy', async () => {
      const el = await fixture(html`
        <auro-input type="date" format="mm/dd/yyyy"></auro-input>
      `);

      setInputValue(el, '12312000');
      await elementUpdated(el);
      expect(el.value).to.equal('12/31/2000');
    });

    it('dd/mm/yyyy', async () => {
      const el = await fixture(html`
        <auro-input id="format-date" type="date" format="dd/mm/yyyy"></auro-input>
      `);

      setInputValue(el, '31122000');
      await elementUpdated(el);
      expect(el.value).to.equal('31/12/2000');
    });

    it('yyyy/mm/dd', async () => {
      const el = await fixture(html`
        <auro-input id="format-date" type="date" format="yyyy/mm/dd"></auro-input>
      `);

      setInputValue(el, '20001231');
      await elementUpdated(el);
      expect(el.value).to.equal('2000/12/31');
    });

    it('yyyy/dd/mm', async () => {
      const el = await fixture(html`
        <auro-input id="format-date" type="date" format="yyyy/dd/mm"></auro-input>
      `);

      setInputValue(el, '20003112');
      await elementUpdated(el);
      expect(el.value).to.equal('2000/31/12');
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

  describe('handles i18n', () => {
    it('credit-card translation', async () => {
      const el = await fixture(html`
        <auro-input type="credit-card" required id="input01"></auro-input>
      `);

      const eli18n = await fixture(html`
        <auro-input type="credit-card" required lang="es" id="input01"></auro-input>
      `);

      const eli18nContent = eli18n.shadowRoot.querySelector('[name="helpText"]').innerHTML;
      const content = el.shadowRoot.querySelector('[name="helpText"]').innerHTML;

      expect(content).to.not.contain(`Por favor`);
      expect(eli18nContent).to.contain(`Por favor`);
      expect(eli18n.shadowRoot.querySelector('input')).to.have.attribute('lang', 'es');
    });
  });

  describe('handles credit card formatting', () => {
    it('starts with "34" is American Express', async () => {
      const el = await fixture(html`
        <auro-input id="format-ccWithIcon" type="credit-card" icon label="Credit Card Number with Icon" required></auro-input>
      `);


      el.value = '34';
      await elementUpdated(el);
      expect(el.shadowRoot.querySelector('.accentIcon')).to.have.attribute('name', 'cc-amex');
    });

    it('starts with "37" is American Express', async () => {
      const el = await fixture(html`
        <auro-input id="format-ccWithIcon" type="credit-card" icon label="Credit Card Number with Icon" required></auro-input>
      `);

      el.value = '37';
      await elementUpdated(el);
      expect(el.shadowRoot.querySelector('.accentIcon')).to.have.attribute('name', 'cc-amex');
    });

    it('starts with "4" is Visa', async () => {
      const el = await fixture(html`
        <auro-input id="format-ccWithIcon" type="credit-card" icon label="Credit Card Number with Icon" required></auro-input>
      `);

      el.value = '4';
      await elementUpdated(el);
      expect(el.shadowRoot.querySelector('.accentIcon')).to.have.attribute('name', 'cc-visa');
    });

    it('starts with "22" is MasterCard', async () => {
      const el = await fixture(html`
        <auro-input id="format-ccWithIcon" type="credit-card" icon label="Credit Card Number with Icon" required></auro-input>
      `);

      el.value = '5';
      await elementUpdated(el);
      expect(el.shadowRoot.querySelector('.accentIcon')).to.have.attribute('name', 'cc-mastercard');
    });

    it('starts with "644" is Discover Card', async () => {
      const el = await fixture(html`
        <auro-input id="format-ccWithIcon" type="credit-card" icon label="Credit Card Number with Icon" required></auro-input>
      `);

      el.value = '6';
      await elementUpdated(el);
      expect(el.shadowRoot.querySelector('.accentIcon')).to.have.attribute('name', 'cc-discover');
    });

    it('Undefined Value', async () => {
      const el = await fixture(html`
        <auro-input id="format-ccWithIcon" type="credit-card" icon label="Credit Card Number with Icon" required></auro-input>
      `);

      await setInputValue(el, undefined);
      await elementUpdated(el);
      expect(el.shadowRoot.querySelector('.accentIcon')).to.have.attribute('name', 'credit-card');
    });

    it('Empty Value', async () => {
      const el = await fixture(html`
        <auro-input id="format-ccWithIcon" type="credit-card" icon label="Credit Card Number with Icon" required></auro-input>
      `);

      el.value = '';
      await elementUpdated(el);
      expect(el.shadowRoot.querySelector('.accentIcon')).to.have.attribute('name', 'credit-card');
    });

    it('Alaska Visa Cards', async () => {
      const el = await fixture(html`
        <auro-input id="format-ccWithIcon" type="credit-card" icon label="Credit Card Number with Icon" required></auro-input>
      `);

      setInputValue(el, '4147 34');
      await elementUpdated(el);
      expect(el.shadowRoot.querySelector('.accentIcon')).to.have.attribute('name', 'cc-alaska');
    });

    it('Any Corp Card', async () => {
      const el = await fixture(html`
        <auro-input id="format-ccWithIcon" type="credit-card" icon label="Credit Card Number with Icon" required></auro-input>
      `);

      el.value = '2';
      await elementUpdated(el);
      expect(el.shadowRoot.querySelector('.accentIcon')).to.have.attribute('name', 'credit-card');
    });

    it('Alaska Corp Cards', async () => {
      const el = await fixture(html`
        <auro-input id="format-ccWithIcon" type="credit-card" icon label="Credit Card Number with Icon" required></auro-input>
      `);

      el.value = '27';
      await elementUpdated(el);
      expect(el.shadowRoot.querySelector('.accentIcon')).to.have.attribute('name', 'cc-alaska');
    });
  });
});

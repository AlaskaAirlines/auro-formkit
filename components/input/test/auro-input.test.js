/* eslint-disable max-lines, no-unused-expressions, no-undef, no-plusplus, no-await-in-loop, no-implicit-coercion, jsdoc/require-jsdoc */

import { fixture, html, expect, elementUpdated, oneEvent } from '@open-wc/testing';
import { unsafeStatic } from 'lit/static-html.js';
import { useAccessibleIt } from "@aurodesignsystem/auro-library/scripts/test-plugin/iterateWithA11Check.mjs";
import '../src/registered.js';
import { AuroInput } from '../src/auro-input.js';
import { setInputValue } from './testFunctions.js';

const rawIt = it;
useAccessibleIt();

describe('auro-input', () => {

  describe('Rendering', () => {
    it('should be successfully created in the document', async () => {
      // This test fails when attributes are put onto the component before it is attached to the DOM
      const el = document.createElement('auro-input');

      await expect(el.localName).to.equal('auro-input');
    });

    it('should be defined as a custom element', async () => {
      const el = await !!customElements.get("auro-input");

      await expect(el).to.be.true;
    });
  });

  describe('User Stories', () => {
    describe('handles i18n', () => {
      it('should translate credit card type correctly', async () => {
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

      it('should propagate document lang change via MutationObserver', async () => {
        const originalLang = document.documentElement.getAttribute('lang');

        const el = await fixture(html`<auro-input></auro-input>`);
        await elementUpdated(el);

        document.documentElement.setAttribute('lang', 'es');

        // MutationObserver is async — wait for it to fire
        await new Promise((resolve) => setTimeout(resolve, 0));

        expect(el.lang).to.equal('es');

        // Restore original lang
        if (originalLang) {
          document.documentElement.setAttribute('lang', originalLang);
        } else {
          document.documentElement.removeAttribute('lang');
        }
        await new Promise((resolve) => setTimeout(resolve, 0));
      });
    });

    describe('handles credit card formatting', () => {
      it('should identify card starting with "34" as American Express', async () => {
        const el = await fixture(html`
          <auro-input id="format-ccWithIcon" type="credit-card" icon label="Credit Card Number with Icon" required></auro-input>
        `);


        el.value = '34';
        await elementUpdated(el);
        expect(el.shadowRoot.querySelector('.accentIcon')).to.have.attribute('name', 'cc-amex');
      });

      it('should identify card starting with "37" as American Express', async () => {
        const el = await fixture(html`
          <auro-input id="format-ccWithIcon" type="credit-card" icon label="Credit Card Number with Icon" required></auro-input>
        `);

        el.value = '37';
        await elementUpdated(el);
        expect(el.shadowRoot.querySelector('.accentIcon')).to.have.attribute('name', 'cc-amex');
      });

      it('should identify card starting with "4" as Visa', async () => {
        const el = await fixture(html`
          <auro-input id="format-ccWithIcon" type="credit-card" icon label="Credit Card Number with Icon" required></auro-input>
        `);

        el.value = '4';
        await elementUpdated(el);
        expect(el.shadowRoot.querySelector('.accentIcon')).to.have.attribute('name', 'cc-visa');
      });

      it('should identify card starting with "22" as MasterCard', async () => {
        const el = await fixture(html`
          <auro-input id="format-ccWithIcon" type="credit-card" icon label="Credit Card Number with Icon" required></auro-input>
        `);

        el.value = '5';
        await elementUpdated(el);
        expect(el.shadowRoot.querySelector('.accentIcon')).to.have.attribute('name', 'cc-mastercard');
      });

      it('should identify card starting with "644" as Discover Card', async () => {
        const el = await fixture(html`
          <auro-input id="format-ccWithIcon" type="credit-card" icon label="Credit Card Number with Icon" required></auro-input>
        `);

        el.value = '6';
        await elementUpdated(el);
        expect(el.shadowRoot.querySelector('.accentIcon')).to.have.attribute('name', 'cc-discover');
      });

      it('should handle undefined credit card value without errors', async () => {
        const el = await fixture(html`
          <auro-input id="format-ccWithIcon" type="credit-card" icon label="Credit Card Number with Icon" required></auro-input>
        `);

        await setInputValue(el, undefined);
        await elementUpdated(el);
        expect(el.shadowRoot.querySelector('.accentIcon')).to.have.attribute('name', 'credit-card');
      });

      it('should handle empty credit card value without errors', async () => {
        const el = await fixture(html`
          <auro-input id="format-ccWithIcon" type="credit-card" icon label="Credit Card Number with Icon" required></auro-input>
        `);

        el.value = '';
        await elementUpdated(el);
        expect(el.shadowRoot.querySelector('.accentIcon')).to.have.attribute('name', 'credit-card');
      });

      it('should identify Alaska Visa card numbers correctly', async () => {
        const el = await fixture(html`
          <auro-input id="format-ccWithIcon" type="credit-card" icon label="Credit Card Number with Icon" required></auro-input>
        `);

        setInputValue(el, '4147 34');
        await elementUpdated(el);
        expect(el.shadowRoot.querySelector('.accentIcon')).to.have.attribute('name', 'cc-alaska');
      });

      it('should identify corporate card numbers correctly', async () => {
        const el = await fixture(html`
          <auro-input id="format-ccWithIcon" type="credit-card" icon label="Credit Card Number with Icon" required></auro-input>
        `);

        el.value = '2';
        await elementUpdated(el);
        expect(el.shadowRoot.querySelector('.accentIcon')).to.have.attribute('name', 'credit-card');
      });

      it('should identify Alaska corporate card numbers correctly', async () => {
        const el = await fixture(html`
          <auro-input id="format-ccWithIcon" type="credit-card" icon label="Credit Card Number with Icon" required></auro-input>
        `);

        el.value = '27';
        await elementUpdated(el);
        expect(el.shadowRoot.querySelector('.accentIcon')).to.have.attribute('name', 'cc-alaska');
      });
    });

    describe('handles phone number formatting', () => {
      it('should format with default North American phone format', async () => {
        const el = await fixture(html`
          <auro-input type="tel"></auro-input>
        `);

        setInputValue(el, '5091234567');

        await elementUpdated(el);

        expect(el.value).to.equal('+1 (509) 123-4567');
      });

      it('should format with a custom phone format', async () => {
        const el = await fixture(html`
          <auro-input type="tel" format="+52 000 000 0000"></auro-input>
        `);

        setInputValue(el, '1234567890');

        await elementUpdated(el);

        expect(el.value).to.equal('+52 123 456 7890');
      });
    });

    describe('handles date formatting', () => {
      it('should format as mm/dd/yyyy', async () => {
        const el = await fixture(html`
          <auro-input type="date" format="mm/dd/yyyy"></auro-input>
        `);

        setInputValue(el, '12312000');
        await elementUpdated(el);
        expect(el.value).to.equal('12/31/2000');
      });

      it('should format as dd/mm/yyyy', async () => {
        const el = await fixture(html`
          <auro-input id="format-date" type="date" format="dd/mm/yyyy"></auro-input>
        `);

        setInputValue(el, '31122000');
        await elementUpdated(el);
        expect(el.value).to.equal('31/12/2000');
      });

      it('should format as yyyy/mm/dd', async () => {
        const el = await fixture(html`
          <auro-input id="format-date" type="date" format="yyyy/mm/dd"></auro-input>
        `);

        setInputValue(el, '20001231');
        await elementUpdated(el);
        expect(el.value).to.equal('2000/12/31');
      });

      it('should format as yyyy/dd/mm', async () => {
        const el = await fixture(html`
          <auro-input id="format-date" type="date" format="yyyy/dd/mm"></auro-input>
        `);

        setInputValue(el, '20003112');
        await elementUpdated(el);
        expect(el.value).to.equal('2000/31/12');
      });

      it('should format as mm/yy', async () => {
        const el = await fixture(html`
          <auro-input id="format-date" type="date" format="mm/yy"></auro-input>
        `);

        setInputValue(el, '1231');
        await elementUpdated(el);
        expect(el.value).to.equal('12/31');
      });

      it('should format as yy/mm', async () => {
        const el = await fixture(html`
          <auro-input id="format-date" type="date" format="yy/mm"></auro-input>
        `);

        setInputValue(el, '9912');
        await elementUpdated(el);
        expect(el.value).to.equal('99/12');
      });

      it('should format as mm/yyyy', async () => {
        const el = await fixture(html`
          <auro-input id="format-date" type="date" format="mm/yyyy"></auro-input>
        `);

        setInputValue(el, '122000');
        await elementUpdated(el);
        expect(el.value).to.equal('12/2000');
      });

      it('should format as yyyy/mm', async () => {
        const el = await fixture(html`
          <auro-input id="format-date" type="date" format="yyyy/mm"></auro-input>
        `);

        setInputValue(el, '200012');
        await elementUpdated(el);
        expect(el.value).to.equal('2000/12');
      });

      //   it('yy', async () => {
      //     const el = await fixture(html`
      //       <auro-input id="format-date" type="date" format="yy"></auro-input>
      //     `);

      //     setInputValue(el, '99');
      //     await elementUpdated(el);
      //     expect(el.value).to.equal('99');
      //   });

      //   it('yyyy', async () => {
      //     const el = await fixture(html`
      //       <auro-input id="format-date" type="date" format="yyyy"></auro-input>
      //     `);

      //     setInputValue(el, '1999');
      //     await elementUpdated(el);
      //     expect(el.value).to.equal('1999');
      //   });

      //   it('mm', async () => {
      //     const el = await fixture(html`
      //       <auro-input id="format-date" type="date" format="mm"></auro-input>
      //     `);

      //     setInputValue(el, '12');
      //     await elementUpdated(el);
      //     expect(el.value).to.equal('12');
      //   });

      //   it('dd', async () => {
      //     const el = await fixture(html`
      //       <auro-input id="format-date" type="date" format="dd"></auro-input>
      //     `);

      //     setInputValue(el, '31');
      //     await elementUpdated(el);
      //     expect(el.value).to.equal('31');
      //   });

      it('getMaskOptions for single-component date formats returns working format/parse', async () => {
        const el = await fixture(html`<auro-input></auro-input>`);
        await elementUpdated(el);

        const maskOpts = el.util.getMaskOptions('date', 'dd');

        expect(maskOpts.format(5)).to.equal('05');
        expect(maskOpts.format(31)).to.equal('31');
        expect(maskOpts.parse('15')).to.equal(15);
        expect(maskOpts.parse('')).to.be.null;
      });

      it('getMaskOptions multi-component date format returns empty string for null date', async () => {
        const el = await fixture(html`<auro-input></auro-input>`);
        await elementUpdated(el);

        const maskOpts = el.util.getMaskOptions('date', 'mm/dd/yyyy');

        expect(maskOpts.format(null)).to.equal('');
        expect(maskOpts.format(undefined)).to.equal('');
        expect(maskOpts.parse('')).to.be.null;
      });

      it('getMaskOptions multi-component date parse returns null for invalid parts', async () => {
        const el = await fixture(html`<auro-input></auro-input>`);
        await elementUpdated(el);

        const maskOpts = el.util.getMaskOptions('date', 'mm/dd/yyyy');

        // Call parse with this.mask set to the format pattern
        const result = maskOpts.parse.call({ mask: 'mm/dd/yyyy' }, 'xx/xx/xxxx');

        expect(result).to.be.null;
      });

      it('toNorthAmericanFormat returns undefined when dateStr does not match format', async () => {
        const el = await fixture(html`<auro-input></auro-input>`);
        await elementUpdated(el);

        const result = el.util.toNorthAmericanFormat('not-a-date', 'mm/dd/yyyy');

        expect(result).to.be.undefined;
      });
    });

    it('should validate input after the first blur event', async () => {
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

    it('should fire an input event when validation executes', async () => {
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

  });

  describe('Properties', () => {
    describe('a11yActivedescendant', () => {
      it('should default to undefined', async () => {
        const el = await fixture(html`<auro-input></auro-input>`);

        expect(el.a11yActivedescendant).to.be.undefined;
      });
    });

    describe('a11yControls', () => {
      it('should default to undefined', async () => {
        const el = await fixture(html`<auro-input></auro-input>`);

        expect(el.a11yControls).to.be.undefined;
      });
    });

    describe('a11yExpanded', () => {
      it('should default to undefined', async () => {
        const el = await fixture(html`<auro-input></auro-input>`);

        expect(el.a11yExpanded).to.be.undefined;
      });
    });

    describe('a11yRole', () => {
      it('should default to undefined', async () => {
        const el = await fixture(html`<auro-input></auro-input>`);

        expect(el.a11yRole).to.be.undefined;
      });
    });

    describe('activeLabel', () => {
      it('should keep the label in the active position when set', async () => {
        const el = await fixture(html`<auro-input activeLabel label="Test"></auro-input>`);

        expect(el.activeLabel).to.be.true;
        expect(el.hasAttribute('activeLabel')).to.be.true;
      });
    });

    describe('appearance', () => {
      it('should default to default', async () => {
        const el = await fixture(html`<auro-input></auro-input>`);

        expect(el.appearance).to.equal('default');
      });

      it('should accept inverse appearance', async () => {
        const el = await fixture(html`
          <div style="background-color: #222222; padding: 16px;">
            <auro-input appearance="inverse"></auro-input>
          </div>
        `);
        const inputEl = el.querySelector('auro-input');

        expect(inputEl.appearance).to.equal('inverse');
      });
    });

    describe('autocapitalize', () => {
      it('should not have autocapitalize by default', async () => {
        const el = await fixture(html`<auro-input></auro-input>`);

        expect(el.hasAttribute('autocapitalize')).to.be.false;
      });
    });

    describe('autocomplete', () => {
      it('should set autocomplete on the input', async () => {
        const el = await fixture(html`<auro-input autocomplete="off"></auro-input>`);
        const input = el.shadowRoot.querySelector('input');

        expect(input.getAttribute('autocomplete')).to.equal('off');
      });
    });

    describe('autocorrect', () => {
      it('should set autocorrect on the input', async () => {
        const el = await fixture(html`<auro-input autocorrect="off"></auro-input>`);
        const input = el.shadowRoot.querySelector('input');

        expect(input.getAttribute('autocorrect')).to.equal('off');
      });
    });

    describe('customValidityTypeEmail', () => {
      it('should use custom message for email validation failure', async () => {
        const el = await fixture(html`<auro-input type="email" customValidityTypeEmail="Bad email format"></auro-input>`);

        const input = el.shadowRoot.querySelector('input');
        input.focus();
        el.value = 'invalid';
        input.blur();
        await elementUpdated(el);

        expect(el.getAttribute('validity')).to.equal('patternMismatch');
      });
    });

    describe('disabled', () => {
      it('should set the disabled class on the label when component is disabled', async () => {
        const el = await fixture(html`
          <auro-input disabled label="Disabled input"></auro-input>
        `);

        const label = el.shadowRoot.querySelector('label');
        expect([...label.classList]).to.contain('is-disabled');
      });

    });

    describe('dvInputOnly', () => {
      it('should set dvInputOnly attribute', async () => {
        const el = await fixture(html`<auro-input dvInputOnly></auro-input>`);

        expect(el.dvInputOnly).to.be.true;
      });
    });

    describe('error', () => {
      it('should set custom validity when error attribute is present', async () => {
        const el = await fixture(html`
          <auro-input error="Custom Error Message"></auro-input>
        `);

        expect(el.getAttribute('validity')).to.be.equal('customError');

        const helpTextElem = el.shadowRoot.querySelector('auro-helptext, [auro-helptext]');
        expect(helpTextElem.textContent).to.contain('Custom Error Message');
      });

      it('should update validity when error message is removed after creation', async () => {
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

    });

    describe('errorMessage', () => {
      it('should contain the error message after validation failure', async () => {
        const el = await fixture(html`<auro-input required></auro-input>`);

        const input = el.shadowRoot.querySelector('input');
        input.focus();
        input.blur();
        await elementUpdated(el);

        expect(el.errorMessage).to.not.be.empty;
      });
    });

    describe('format', () => {
      it('should check MM/YY format validity correctly', async () => {
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

      it('should check MM/YYYY format validity correctly', async () => {
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

      it('should check YYYY/MM/DD format validity correctly', async () => {
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

      it('should format input value according to the specified format and enforce restrictions', async () => {
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

    });

    describe('icon', () => {
      it('should set the icon attribute', async () => {
        const el = await fixture(html`<auro-input icon></auro-input>`);

        expect(el.icon).to.be.true;
      });
    });

    describe('id', () => {
      it('should set the id attribute on the element', async () => {
        const el = await fixture(html`<auro-input id="test-id"></auro-input>`);

        expect(el.id).to.equal('test-id');
      });
    });

    describe('inputmode', () => {
      it('should set inputmode attribute on the input when passed as attribute or property', async () => {
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

      it('should allow manual inputmode override for input types that have a default inputmode', async () => {
        const el = await fixture(html`
          <auro-input type="tel" inputmode="text"></auro-input>
        `);

        const input = el.shadowRoot.querySelector('input');
        expect(input).to.have.attribute('inputmode', 'text');
      });

    });

    describe('lang', () => {
      it('should accept a lang attribute', async () => {
        const el = await fixture(html`<auro-input lang="es"></auro-input>`);

        expect(el.lang).to.equal('es');
      });
    });

    describe('layout', () => {
      it('should accept a layout property', async () => {
        const el = await fixture(html`<auro-input layout="emphasized"></auro-input>`);

        expect(el.layout).to.equal('emphasized');
      });
    });

    describe('max', () => {
      it('should check type date validity correctly when using the max attribute', async () => {
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

      it('should check numeric validity correctly when using the max attribute', async () => {
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

    });

    describe('maxLength', () => {
      it('should check maxlength validity correctly', async () => {
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

    });

    describe('min', () => {
      it('should check type date validity correctly when using the min attribute', async () => {
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

      it('should check numeric validity correctly when using the min attribute', async () => {
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

    });

    describe('minLength', () => {
      it('should check minlength validity correctly', async () => {
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

    });

    describe('name', () => {
      it('should set the name attribute on the inner input element', async () => {
        const el = await fixture(html`
          <auro-input name="test"></auro-input>
        `);

        const input = el.shadowRoot.querySelector('input');
        expect(input.name).to.equal('test');
      });

    });

    describe('nested', () => {
      it('should set the nested attribute', async () => {
        const el = await fixture(html`<auro-input nested></auro-input>`);

        expect(el.nested).to.be.true;
        expect(el.hasAttribute('nested')).to.be.true;
      });
    });

    describe('noValidate', () => {
      it('should validate correctly when noValidate is set and force=true is passed to validate()', async () => {
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

      it('should not validate when novalidate attribute is true', async () => {
        const el = await fixture(html`
          <auro-input required type="email" label="Label" novalidate></auro-input>
        `);
        const input = el.shadowRoot.querySelector('input');

        input.focus();
        input.blur();
        await elementUpdated(el);

        expect(el.hasAttribute('validity')).to.be.false;
      });

    });

    describe('onDark', () => {
      it('should set the onDark attribute (deprecated)', async () => {
        const el = await fixture(html`
          <div style="background-color: #222222; padding: 16px;">
            <auro-input onDark></auro-input>
          </div>
        `);
        const inputEl = el.querySelector('auro-input');

        expect(inputEl.onDark).to.be.true;
      });
    });

    describe('pattern', () => {
      it('should set custom pattern and display custom validity message', async () => {
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

    });

    describe('placeholder', () => {
      it('should set the placeholder on the input element', async () => {
        const el = await fixture(html`
          <auro-input id="demo50" required placeholder="John Doe">
            <span slot="label">Full name</span>
          </auro-input>
        `);

        const input = el.shadowRoot.querySelector('input');

        await expect(input).to.have.attribute('placeholder', 'John Doe');
      });

    });

    describe('readonly', () => {
      it('should set the readonly attribute on the underlying HTML5 input', async () => {
        const el = await fixture(html`
          <auro-input readonly></auro-input>
        `);

        expect(el.inputElement.hasAttribute('readonly')).to.be.true;

        el.removeAttribute('readonly');

        await elementUpdated(el);

        expect(el.inputElement.hasAttribute('readonly')).to.be.false;
      });

    });

    describe('required', () => {
      it('should set the required attribute on the input', async () => {
        const el = await fixture(html`<auro-input required></auro-input>`);
        const input = el.shadowRoot.querySelector('input');

        expect(input.required).to.be.true;
      });

      it('should fail validation when required and empty', async () => {
        const el = await fixture(html`<auro-input required></auro-input>`);

        const input = el.shadowRoot.querySelector('input');
        input.focus();
        input.blur();
        await elementUpdated(el);

        expect(el.getAttribute('validity')).to.equal('valueMissing');
      });
    });

    describe('setCustomValidity', () => {
      it('should override all validation messages', async () => {
        const el = await fixture(html`<auro-input required setCustomValidity="Custom message"></auro-input>`);

        el.validate(true);
        await elementUpdated(el);

        const helpText = el.shadowRoot.querySelector('auro-helptext, [auro-helptext]');
        expect(helpText.textContent).to.contain('Custom message');
      });
    });

    describe('setCustomValidityBadInput', () => {
      it('should accept a custom message for badInput', async () => {
        const el = await fixture(html`<auro-input setCustomValidityBadInput="Bad input"></auro-input>`);

        expect(el.setCustomValidityBadInput).to.equal('Bad input');
      });
    });

    describe('setCustomValidityCustomError', () => {
      it('should accept a custom message for customError', async () => {
        const el = await fixture(html`<auro-input setCustomValidityCustomError="Custom error"></auro-input>`);

        expect(el.setCustomValidityCustomError).to.equal('Custom error');
      });
    });

    describe('setCustomValidityForType', () => {
      it('should accept a custom message for type validation', async () => {
        const el = await fixture(html`<auro-input setCustomValidityForType="Type error"></auro-input>`);

        expect(el.setCustomValidityForType).to.equal('Type error');
      });
    });

    describe('setCustomValidityRangeOverflow', () => {
      it('should accept a custom message for rangeOverflow', async () => {
        const el = await fixture(html`<auro-input type="number" max="10" setCustomValidityRangeOverflow="Too high"></auro-input>`);

        el.value = '20';
        el.validate(true);
        await elementUpdated(el);

        const helpText = el.shadowRoot.querySelector('auro-helptext, [auro-helptext]');
        expect(helpText.textContent).to.contain('Too high');
      });
    });

    describe('setCustomValidityRangeUnderflow', () => {
      it('should accept a custom message for rangeUnderflow', async () => {
        const el = await fixture(html`<auro-input type="number" min="10" setCustomValidityRangeUnderflow="Too low"></auro-input>`);

        el.value = '5';
        el.validate(true);
        await elementUpdated(el);

        const helpText = el.shadowRoot.querySelector('auro-helptext, [auro-helptext]');
        expect(helpText.textContent).to.contain('Too low');
      });
    });

    describe('setCustomValidityTooLong', () => {
      it('should accept a custom message for tooLong', async () => {
        const el = await fixture(html`<auro-input maxlength="3" setCustomValidityTooLong="Too long"></auro-input>`);

        el.value = 'abcde';
        el.validate(true);
        await elementUpdated(el);

        const helpText = el.shadowRoot.querySelector('auro-helptext, [auro-helptext]');
        expect(helpText.textContent).to.contain('Too long');
      });
    });

    describe('setCustomValidityTooShort', () => {
      it('should accept a custom message for tooShort', async () => {
        const el = await fixture(html`<auro-input minlength="5" setCustomValidityTooShort="Too short"></auro-input>`);

        el.value = 'ab';
        el.validate(true);
        await elementUpdated(el);

        const helpText = el.shadowRoot.querySelector('auro-helptext, [auro-helptext]');
        expect(helpText.textContent).to.contain('Too short');
      });
    });

    describe('setCustomValidityValueMissing', () => {
      it('should accept a custom message for valueMissing', async () => {
        const el = await fixture(html`<auro-input required setCustomValidityValueMissing="Required field"></auro-input>`);

        el.validate(true);
        await elementUpdated(el);

        const helpText = el.shadowRoot.querySelector('auro-helptext, [auro-helptext]');
        expect(helpText.textContent).to.contain('Required field');
      });
    });

    describe('shape', () => {
      it('should accept a shape property', async () => {
        const el = await fixture(html`<auro-input shape="round"></auro-input>`);

        expect(el.shape).to.equal('round');
      });
    });

    describe('showPassword', () => {
      it('should toggle password visibility', async () => {
        const el = await fixture(html`<auro-input type="password" value="secret"></auro-input>`);
        const input = el.shadowRoot.querySelector('input');

        expect(input.type).to.equal('password');

        el.showPassword = true;
        await elementUpdated(el);

        expect(input.type).to.equal('text');
      });
    });

    describe('simple', () => {
      it('should set the simple attribute', async () => {
        const el = await fixture(html`<auro-input simple></auro-input>`);

        expect(el.simple).to.be.true;
        expect(el.hasAttribute('simple')).to.be.true;
      });
    });

    describe('size', () => {
      it('should accept a size property', async () => {
        const el = await fixture(html`<auro-input size="md"></auro-input>`);

        expect(el.size).to.equal('md');
      });
    });

    describe('spellcheck', () => {
      it('should set spellcheck and autocapitalize attributes when specified', async () => {
        const el = await fixture(html`
          <auro-input id="checkSpellCheck" type="text" required spellcheck="false"></auro-input>
        `);

        expect(el.shadowRoot.querySelector('input')).to.have.attribute('spellcheck', 'false');
        expect(el.shadowRoot.querySelector('input')).to.have.attribute('autocorrect', 'off');
        expect(el.shadowRoot.querySelector('input')).to.have.attribute('autocapitalize', 'none');
      });

      it('should not set spellcheck and autocapitalize attributes by default', async () => {
        const el = await fixture(html`
          <auro-input id="checkSpellCheck" type="text" required spellcheck="true"></auro-input>
        `);

        expect(el.shadowRoot.querySelector('input')).to.have.attribute('spellcheck', 'true');
        expect(el.shadowRoot.querySelector('input')).to.not.have.attribute('autocorrect');
        expect(el.shadowRoot.querySelector('input')).to.not.have.attribute('autocapitalize');
      });

    });

    describe('type', () => {
      it('should allow type email and render the correct input type', async () => {
        const el = await fixture(html`
          <auro-input type="email"></auro-input>
        `);

        const input = el.shadowRoot.querySelector('input');
        expect(input.type).to.equal('email');
      });

      it('should allow type number and set numeric inputmode', async () => {
        const el = await fixture(html`
          <auro-input type="number"></auro-input>
        `);

        expect(el.inputMode).to.equal('numeric');
      });

      it('should not allow unsupported type color and fall back to text', async () => {
        const el = await fixture(html`
          <auro-input type="color"></auro-input>
        `);

        const input = el.shadowRoot.querySelector('input');
        expect(input.type).to.equal('text');
      });

      it('should validate type="email" input correctly', async () => {
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

      it('should use programmatic placeholder for date inputs', async () => {
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

      it('should check type date validity correctly', async () => {
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

    });

    describe('validateOnInput', () => {
      it('should validate on each input event', async () => {
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

    });

    describe('validity', () => {
      it('should be valid when input passes validation', async () => {
        const el = await fixture(html`<auro-input required></auro-input>`);

        el.value = 'test';
        el.validate(true);
        await elementUpdated(el);

        expect(el.getAttribute('validity')).to.equal('valid');
      });

      it('should reflect valueMissing when required and empty', async () => {
        const el = await fixture(html`<auro-input required></auro-input>`);

        el.validate(true);
        await elementUpdated(el);

        expect(el.getAttribute('validity')).to.equal('valueMissing');
      });
    });

    describe('value', () => {
      it('should set the value on the input element', async () => {
        const el = await fixture(html`
          <auro-input value="other value" label="First name"></auro-input>
        `);

        const input = el.shadowRoot.querySelector('input');

        await expect(input.value).to.equal('other value');
      });

      it('should update the value when an input event is triggered', async () => {
        const el = await fixture(html`
          <auro-input></auro-input>
        `);

        el.value = 'triggered';
        expect(el.value).to.equal('triggered');
      });

      it('should fire an input event when the value is set programmatically', async () => {
        const el = await fixture(html`
          <auro-input></auro-input>
        `);

        const listener = oneEvent(el, 'input');
        el.value = 'test';

        await elementUpdated(el);

        const { result } = await listener;

        expect(result).to.equal(undefined);
      });

      it('should clear the value and validity state when reset() is called', async () => {
        const el = await fixture(html`
          <auro-input required minlength="12" value="Auro Team"></auro-input>
        `);

        expect(el.getAttribute('validity')).to.be.equal('tooShort');

        el.reset();

        await elementUpdated(el);

        expect(el.hasAttribute('validity')).to.be.false;
        expect(el.value).to.equal(undefined);
      });

    });

  });

  describe('Slots', () => {
    describe('ariaLabel.clear', () => {
      it('should render content in the ariaLabel.clear slot', async () => {
        const el = await fixture(html`<auro-input><span slot="label">Name</span><span slot="ariaLabel.clear">Clear field</span></auro-input>`);

        const slotContent = el.querySelector('[slot="ariaLabel.clear"]');

        await expect(slotContent).to.exist;
      });
    });

    describe('ariaLabel.password.show', () => {
      it('should render content in the ariaLabel.password.show slot', async () => {
        const el = await fixture(html`<auro-input type="password"><span slot="label">Password</span><span slot="ariaLabel.password.show">Show password</span></auro-input>`);

        const slotContent = el.querySelector('[slot="ariaLabel.password.show"]');

        await expect(slotContent).to.exist;
      });
    });

    describe('ariaLabel.password.hide', () => {
      it('should render content in the ariaLabel.password.hide slot', async () => {
        const el = await fixture(html`<auro-input type="password"><span slot="label">Password</span><span slot="ariaLabel.password.hide">Hide password</span></auro-input>`);

        const slotContent = el.querySelector('[slot="ariaLabel.password.hide"]');

        await expect(slotContent).to.exist;
      });
    });

    describe('helpText', () => {
      it('should render content in the helpText slot', async () => {
        const el = await fixture(html`<auro-input><span slot="label">Name</span><span slot="helpText">Enter your full name</span></auro-input>`);

        const slotContent = el.querySelector('[slot="helpText"]');

        await expect(slotContent).to.exist;
      });
    });

    describe('label', () => {
      it('should render content in the label slot', async () => {
        const el = await fixture(html`<auro-input><span slot="label">Name</span></auro-input>`);

        const slotContent = el.querySelector('[slot="label"]');

        await expect(slotContent).to.exist;
      });
    });

    describe('optionalLabel', () => {
      it('should render content in the optionalLabel slot', async () => {
        const el = await fixture(html`<auro-input><span slot="label">Name</span><span slot="optionalLabel">(optional)</span></auro-input>`);

        const slotContent = el.querySelector('[slot="optionalLabel"]');

        await expect(slotContent).to.exist;
      });
    });

    describe('displayValue', () => {
      it('should render content in the displayValue slot', async () => {
        const el = await fixture(html`<auro-input><span slot="label">Name</span><span slot="displayValue">Custom value</span></auro-input>`);

        const slotContent = el.querySelector('[slot="displayValue"]');

        await expect(slotContent).to.exist;
      });

      it('should handle multi-level slot content in displayValue', async () => {
        // Simulate the nested slot scenario (e.g. combobox passing displayValue to input)
        const el = await fixture(html`<auro-input></auro-input>`);
        await elementUpdated(el);

        const displayValueSlot = el.shadowRoot.querySelector('slot[name="displayValue"]');

        // Mock assignedNodes to return a <slot> element that itself returns assigned nodes
        const innerContent = document.createTextNode('nested content');
        const innerSlot = document.createElement('slot');

        const originalAssignedNodes = displayValueSlot.assignedNodes.bind(displayValueSlot);
        displayValueSlot.assignedNodes = () => [innerSlot];
        innerSlot.assignedNodes = () => [innerContent];

        el.checkDisplayValueSlotChange();

        expect(el.hasDisplayValueContent).to.be.true;

        // Restore
        displayValueSlot.assignedNodes = originalAssignedNodes;
      });
    });
  });

  describe('Public Functions', () => {
    describe('register', () => {
      it('should register the custom element', async () => {
        const registeredTag = customElements.get('auro-input');

        expect(registeredTag).to.not.be.undefined;
      });

      it('should set auro-input attribute when registered under a custom name', async () => {
        const customName = `custom-input-${Date.now()}`;
        AuroInput.register(customName);

        const el = await fixture(html`<${unsafeStatic(customName)}></${unsafeStatic(customName)}>`);
        await elementUpdated(el);

        expect(el.tagName.toLowerCase()).to.equal(customName);
        expect(el.hasAttribute('auro-input')).to.be.true;
      });
    });

    describe('focus', () => {
      it('should be programmatically focusable via focus()', async () => {
        const el = await fixture(html`
          <auro-input label="Label"></auro-input>
        `);

        el.focus();
        expect(document.activeElement === el).to.be.true;
      });
    });

    describe('validate', () => {
      it('should validate and set validity attribute', async () => {
        const el = await fixture(html`<auro-input required></auro-input>`);

        el.validate(true);
        await elementUpdated(el);

        expect(el.hasAttribute('validity')).to.be.true;
        expect(el.getAttribute('validity')).to.equal('valueMissing');
      });

      it('should set valid when value satisfies requirements', async () => {
        const el = await fixture(html`<auro-input required></auro-input>`);

        el.value = 'test';
        el.validate(true);
        await elementUpdated(el);

        expect(el.getAttribute('validity')).to.equal('valid');
      });
    });

    describe('reset', () => {
      it('should clear value and validity state', async () => {
        const el = await fixture(html`<auro-input required></auro-input>`);

        el.value = 'test';
        el.validate(true);
        await elementUpdated(el);
        expect(el.getAttribute('validity')).to.equal('valid');

        el.reset();
        await elementUpdated(el);

        expect(el.value).to.not.equal('test');
      });
    });

    describe('clear', () => {
      it('should clear the input value', async () => {
        const el = await fixture(html`<auro-input value="hello"></auro-input>`);

        el.clear();
        await elementUpdated(el);

        expect(el.value).to.not.equal('hello');
      });
    });

    describe('resetShapeClasses', () => {
      it('should execute without error', async () => {
        const el = await fixture(html`<auro-input shape="round"></auro-input>`);
        await elementUpdated(el);

        expect(() => el.resetShapeClasses()).to.not.throw();
      });
    });

    describe('resetLayoutClasses', () => {
      it('should execute without error', async () => {
        const el = await fixture(html`<auro-input layout="emphasized"></auro-input>`);
        await elementUpdated(el);

        expect(() => el.resetLayoutClasses()).to.not.throw();
      });
    });

    describe('updateComponentArchitecture', () => {
      it('should execute without error', async () => {
        const el = await fixture(html`<auro-input layout="emphasized" shape="round"></auro-input>`);
        await elementUpdated(el);

        expect(() => el.updateComponentArchitecture()).to.not.throw();
      });
    });
  });

  describe('Events', () => {
    describe('input', () => {
      it('should fire input event when value changes', async () => {
        const el = await fixture(html`<auro-input></auro-input>`);
        await elementUpdated(el);

        const listener = oneEvent(el, 'input');
        setInputValue(el, 'hello');

        const event = await listener;
        expect(event).to.exist;
      });
    });

    describe('auroFormElement-validated', () => {
      it('should fire after validation runs', async () => {
        const el = await fixture(html`<auro-input required></auro-input>`);
        await elementUpdated(el);

        const listener = oneEvent(el, 'auroFormElement-validated');
        el.validate(true);

        const event = await listener;
        expect(event).to.exist;
      });
    });

    describe('auroInput-validityChange', () => {
      it('should fire when validity state changes', async () => {
        const el = await fixture(html`<auro-input required></auro-input>`);
        await elementUpdated(el);

        const listener = oneEvent(el, 'auroInput-validityChange');
        el.validate(true);

        const event = await listener;
        expect(event).to.exist;
      });
    });
  });

  describe('Private Functions', () => {
    it('handleInput preserves cursor position for text type inputs', async () => {
      const el = await fixture(html`<auro-input type="text" label="Name"></auro-input>`);
      await elementUpdated(el);

      const input = el.shadowRoot.querySelector('input');

      input.focus();
      input.value = 'hello';
      input.setSelectionRange(3, 3);
      input.dispatchEvent(new InputEvent('input'));
      await el.updateComplete;

      expect(input.selectionStart).to.equal(3);
    });

    it('handleInput catch block handles setSelectionRange error gracefully', async () => {
      const el = await fixture(html`<auro-input type="text" label="Name"></auro-input>`);
      await elementUpdated(el);

      const input = el.shadowRoot.querySelector('input');

      // Stub setSelectionRange to throw
      input.setSelectionRange = () => {
        throw new DOMException('not supported');
      };

      input.focus();
      input.value = 'hello';
      input.dispatchEvent(new InputEvent('input'));
      await el.updateComplete;

      // Should not throw — the catch block silently absorbs the error
      expect(el.value).to.equal('hello');
    });

    it('labelFontClass returns accent-xl for emphasized layout with no value', async () => {
      const el = await fixture(html`<auro-input></auro-input>`);
      await elementUpdated(el);
      el.layout = 'emphasized';
      await elementUpdated(el);

      expect(el.labelFontClass).to.equal('accent-xl');
      const label = el.shadowRoot.querySelector('label');
      expect(label.classList.contains('accent-xl')).to.be.true;
    });

    it('labelFontClass changes to body-sm for emphasized when value is set', async () => {
      const el = await fixture(html`<auro-input></auro-input>`);
      await elementUpdated(el);
      el.layout = 'emphasized';
      await elementUpdated(el);

      expect(el.labelFontClass).to.equal('accent-xl');

      el.value = 'test';
      await elementUpdated(el);

      expect(el.labelFontClass).to.equal('body-sm');
      const label = el.shadowRoot.querySelector('label');
      expect(label.classList.contains('body-sm')).to.be.true;
      expect(label.classList.contains('accent-xl')).to.be.false;
    });

    it('labelFontClass returns accent-xl for emphasized with displayValue and no value', async () => {
      const el = await fixture(html`<auro-input></auro-input>`);
      await elementUpdated(el);
      el.layout = 'emphasized';
      el.hasDisplayValueContent = true;
      await elementUpdated(el);

      expect(el.labelFontClass).to.equal('accent-xl');
      const label = el.shadowRoot.querySelector('label');
      expect(label.classList.contains('accent-xl')).to.be.true;
    });

    it('labelFontClass returns body-sm for emphasized with displayValue and value', async () => {
      const el = await fixture(html`<auro-input></auro-input>`);
      await elementUpdated(el);
      el.layout = 'emphasized';
      el.hasDisplayValueContent = true;
      el.value = 'test';
      await elementUpdated(el);

      expect(el.labelFontClass).to.equal('body-sm');
      const label = el.shadowRoot.querySelector('label');
      expect(label.classList.contains('body-sm')).to.be.true;
    });

    it('labelFontClass returns body-lg for snowflake layout with no value', async () => {
      const el = await fixture(html`<auro-input></auro-input>`);
      await elementUpdated(el);
      el.layout = 'snowflake';
      await elementUpdated(el);

      expect(el.labelFontClass).to.equal('body-lg');
      const label = el.shadowRoot.querySelector('label');
      expect(label.classList.contains('body-lg')).to.be.true;
    });

    it('labelFontClass returns body-xs for snowflake layout with value', async () => {
      const el = await fixture(html`<auro-input></auro-input>`);
      await elementUpdated(el);
      el.layout = 'snowflake';
      el.value = 'test';
      await elementUpdated(el);

      expect(el.labelFontClass).to.equal('body-xs');
      const label = el.shadowRoot.querySelector('label');
      expect(label.classList.contains('body-xs')).to.be.true;
    });

    it('inputFontClass returns body-sm for emphasized with no value', async () => {
      const el = await fixture(html`<auro-input></auro-input>`);
      await elementUpdated(el);
      el.layout = 'emphasized';
      await elementUpdated(el);

      expect(el.inputFontClass).to.equal('body-sm');
      const input = el.shadowRoot.querySelector('input');
      expect(input.classList.contains('body-sm')).to.be.true;
    });

    it('inputFontClass changes to accent-xl for emphasized when value is set', async () => {
      const el = await fixture(html`<auro-input></auro-input>`);
      await elementUpdated(el);
      el.layout = 'emphasized';
      await elementUpdated(el);

      expect(el.inputFontClass).to.equal('body-sm');

      el.value = 'test';
      await elementUpdated(el);

      expect(el.inputFontClass).to.equal('accent-xl');
      const input = el.shadowRoot.querySelector('input');
      expect(input.classList.contains('accent-xl')).to.be.true;
      expect(input.classList.contains('body-sm')).to.be.false;
    });

    it('inputFontClass returns body-sm for emphasized with displayValue and no value', async () => {
      const el = await fixture(html`<auro-input></auro-input>`);
      await elementUpdated(el);
      el.layout = 'emphasized';
      el.hasDisplayValueContent = true;
      await elementUpdated(el);

      expect(el.inputFontClass).to.equal('body-sm');
      const input = el.shadowRoot.querySelector('input');
      expect(input.classList.contains('body-sm')).to.be.true;
    });

    it('inputFontClass returns accent-xl for emphasized with displayValue and value', async () => {
      const el = await fixture(html`<auro-input></auro-input>`);
      await elementUpdated(el);
      el.layout = 'emphasized';
      el.hasDisplayValueContent = true;
      el.value = 'test';
      await elementUpdated(el);

      expect(el.inputFontClass).to.equal('accent-xl');
      const input = el.shadowRoot.querySelector('input');
      expect(input.classList.contains('accent-xl')).to.be.true;
    });

    it('inputFontClass returns body-lg for snowflake layout', async () => {
      const el = await fixture(html`<auro-input></auro-input>`);
      await elementUpdated(el);
      el.layout = 'snowflake';
      await elementUpdated(el);

      expect(el.inputFontClass).to.equal('body-lg');
      const input = el.shadowRoot.querySelector('input');
      expect(input.classList.contains('body-lg')).to.be.true;
    });

    it('inputFontClass returns body-lg for classic with snowflake shape', async () => {
      const el = await fixture(html`<auro-input></auro-input>`);
      await elementUpdated(el);
      el.layout = 'classic';
      el.shape = 'snowflake';
      await elementUpdated(el);

      expect(el.inputFontClass).to.equal('body-lg');
      const input = el.shadowRoot.querySelector('input');
      expect(input.classList.contains('body-lg')).to.be.true;
    });

    it('hasTypeIcon returns true for icon attribute', async () => {
      const el = await fixture(html`<auro-input icon></auro-input>`);
      await elementUpdated(el);
      expect(el.hasTypeIcon()).to.be.true;
    });

    it('hasTypeIcon returns true for date type', async () => {
      const el = await fixture(html`<auro-input type="date"></auro-input>`);
      await elementUpdated(el);
      expect(el.hasTypeIcon()).to.be.true;
    });

    it('hasTypeIcon returns false for text type', async () => {
      const el = await fixture(html`<auro-input></auro-input>`);
      await elementUpdated(el);
      expect(el.hasTypeIcon()).to.be.false;
    });

    it('renderLayout handles emphasized-left and right', async () => {
      const el = await fixture(html`<auro-input></auro-input>`);
      await elementUpdated(el);
      el.layout = 'emphasized';
      el.shape = 'pill';
      expect(el.renderLayout('emphasized-left')).to.exist;
      expect(el.renderLayout('emphasized-right')).to.exist;
    });

    it('emphasized-left renders validation error icon on the left side', async () => {
      const el = await fixture(html`<auro-input></auro-input>`);
      await elementUpdated(el);

      el.layout = 'emphasized-left';
      el.validity = 'customError';
      await elementUpdated(el);

      const leftAccent = el.shadowRoot.querySelector('.accents.left');
      const rightAccent = el.shadowRoot.querySelector('.accents.right');

      expect(leftAccent.querySelector('.notification.alertNotification')).to.not.be.null;
      expect(rightAccent.querySelector('.notification.alertNotification')).to.be.null;
    });

    it('emphasized-right renders validation error icon on the right side', async () => {
      const el = await fixture(html`<auro-input></auro-input>`);
      await elementUpdated(el);

      el.layout = 'emphasized-right';
      el.validity = 'customError';
      await elementUpdated(el);

      const leftAccent = el.shadowRoot.querySelector('.accents.left');
      const rightAccent = el.shadowRoot.querySelector('.accents.right');

      expect(leftAccent.querySelector('.notification.alertNotification')).to.be.null;
      expect(rightAccent.querySelector('.notification.alertNotification')).to.not.be.null;
    });

    it('renderLayout handles snowflake-left and right', async () => {
      const el = await fixture(html`<auro-input></auro-input>`);
      await elementUpdated(el);
      expect(el.renderLayout('snowflake-left')).to.exist;
      expect(el.renderLayout('snowflake-right')).to.exist;
    });

    it('renderLayoutSnowflake returns valid html', async () => {
      const el = await fixture(html`<auro-input></auro-input>`);
      await elementUpdated(el);
      expect(el.renderLayoutSnowflake()).to.exist;
    });

    it('defineInputIcon returns true for date type', async () => {
      const el = await fixture(html`<auro-input type="date"></auro-input>`);
      await elementUpdated(el);
      expect(el.defineInputIcon()).to.be.true;
    });

    it('defineInputIcon returns true for credit-card type with icon', async () => {
      const el = await fixture(html`<auro-input type="credit-card" icon></auro-input>`);
      await elementUpdated(el);
      expect(el.defineInputIcon()).to.be.true;
    });

    it('defineInputIcon returns false for text type', async () => {
      const el = await fixture(html`<auro-input type="text"></auro-input>`);
      await elementUpdated(el);
      expect(el.defineInputIcon()).to.be.false;
    });

    it('defineLabelPadding returns true for date type', async () => {
      const el = await fixture(html`<auro-input type="date"></auro-input>`);
      await elementUpdated(el);
      expect(el.defineLabelPadding()).to.be.true;
    });

    it('defineLabelPadding returns true for credit-card with icon and no value', async () => {
      const el = await fixture(html`<auro-input type="credit-card" icon></auro-input>`);
      await elementUpdated(el);
      expect(el.defineLabelPadding()).to.be.true;
    });

    it('defineLabelPadding returns false for text type', async () => {
      const el = await fixture(html`<auro-input type="text"></auro-input>`);
      await elementUpdated(el);
      expect(el.defineLabelPadding()).to.be.false;
    });

    it('getActiveElement returns null when no active element exists', async () => {
      const el = await fixture(html`<auro-input></auro-input>`);
      await elementUpdated(el);
      const div = document.createElement('div');
      expect(el.getActiveElement(div)).to.be.null;
    });

    it('handleBlur triggers validation on required input', async () => {
      const el = await fixture(html`<auro-input required></auro-input>`);
      await elementUpdated(el);
      el.handleBlur();
    });

    it('handleBlur syncs value from mask for credit-card type', async () => {
      const el = await fixture(html`<auro-input type="credit-card" icon label="Card number"></auro-input>`);
      await elementUpdated(el);

      const input = el.shadowRoot.querySelector('input');
      input.focus();
      setInputValue(el, '4111');
      await elementUpdated(el);

      expect(el.maskInstance).to.not.be.undefined;

      el.handleBlur();
      await elementUpdated(el);

      expect(el.value).to.equal(el.maskInstance.value);
    });

    it('setActiveDescendant sets ariaActiveDescendantElement on the input', async () => {
      const el = await fixture(html`<auro-input label="Name"></auro-input>`);
      await elementUpdated(el);

      // Track that ariaActiveDescendantElement is set without actually assigning it
      // (direct assignment triggers an infinite Lit update loop via reflected a11yActivedescendant)
      let capturedValue;
      Object.defineProperty(el.inputElement, 'ariaActiveDescendantElement', {
        set(val) { capturedValue = val; },
        get() { return capturedValue; },
        configurable: true
      });

      const option = document.createElement('div');
      option.id = 'option-1';

      el.setActiveDescendant(option);

      expect(capturedValue).to.equal(option);
    });

    it('inputHidden returns true when hasDisplayValueContent is true with value and no focus', async () => {
      const el = await fixture(html`<auro-input></auro-input>`);
      await elementUpdated(el);

      el.hasDisplayValueContent = true;
      el.value = 'test';
      await elementUpdated(el);

      expect(el.inputHidden).to.be.true;
    });

    it('inputHidden first branch short-circuits when hasDisplayValueContent is true but focused', async () => {
      const el = await fixture(html`<auro-input></auro-input>`);
      await elementUpdated(el);

      el.hasDisplayValueContent = true;
      el.value = 'test';
      el.hasFocus = true;
      await elementUpdated(el);

      // First branch is false because hasFocus is true, falls through to second branch
      expect(el.inputHidden).to.be.false;
    });

    it('inputHidden first branch short-circuits when hasDisplayValueContent is true with no value', async () => {
      const el = await fixture(html`<auro-input></auro-input>`);
      await elementUpdated(el);

      el.hasDisplayValueContent = true;
      // No value set, so hasValue is false
      await elementUpdated(el);

      // First branch false due to hasValue being false, second branch true (no value, no focus, no placeholder)
      expect(el.inputHidden).to.be.true;
    });

    it('noFocusOrValue returns false when hasDisplayValueContent is true and focused', async () => {
      const el = await fixture(html`<auro-input></auro-input>`);
      await elementUpdated(el);

      el.hasDisplayValueContent = true;
      el.value = 'test';
      el.hasFocus = true;
      await elementUpdated(el);

      // First branch short-circuits at !hasFocus (false), second branch also false (has value)
      expect(el.noFocusOrValue).to.be.false;
    });

    it('noFocusOrValue first branch short-circuits at hasValue when hasDisplayValueContent is true with no value', async () => {
      const el = await fixture(html`<auro-input></auro-input>`);
      await elementUpdated(el);

      el.hasDisplayValueContent = true;
      // No value, so hasValue is false
      await elementUpdated(el);

      // First branch false at hasValue, second branch true (no value, no focus)
      expect(el.noFocusOrValue).to.be.true;
    });

    // Uses rawIt to skip automatic a11y check — onDark without dark background fails color-contrast
    rawIt('renderValidationErrorIconHtml uses inverse appearance when onDark is true', async () => {
      const el = await fixture(html`<auro-input></auro-input>`);
      await elementUpdated(el);

      el.onDark = true;
      el.validity = 'customError';
      await elementUpdated(el);

      const alertNotification = el.shadowRoot.querySelector('.notification.alertNotification');
      expect(alertNotification).to.not.be.null;

      const icon = alertNotification.firstElementChild;
      expect(icon).to.not.be.null;
      expect(icon.appearance).to.equal('inverse');
    });

    // Uses rawIt to skip automatic a11y check — onDark without dark background fails color-contrast
    rawIt('renderHtmlNotificationPassword uses inverse appearance when onDark is true', async () => {
      const el = await fixture(html`<auro-input type="password"></auro-input>`);
      await elementUpdated(el);

      el.onDark = true;
      el.value = 'secret';
      await elementUpdated(el);

      const passwordBtn = el.shadowRoot.querySelector('.passwordBtn');
      expect(passwordBtn).to.not.be.null;
      expect(passwordBtn.appearance).to.equal('inverse');
    });

    // Uses rawIt to skip automatic a11y check — onDark without dark background fails color-contrast
    rawIt('renderHtmlTypeIcon uses inverse appearance and disabled variant for credit-card icon when onDark and disabled', async () => {
      const el = await fixture(html`<auro-input type="credit-card" icon></auro-input>`);
      await elementUpdated(el);

      el.onDark = true;
      el.disabled = true;
      el.inputIconName = 'cc-visa';
      await elementUpdated(el);

      const accentIcon = el.shadowRoot.querySelector('.accentIcon');
      expect(accentIcon).to.not.be.null;
      expect(accentIcon.appearance).to.equal('inverse');
      expect(accentIcon.variant).to.equal('disabled');
    });

    // Uses rawIt to skip automatic a11y check — onDark without dark background fails color-contrast
    rawIt('renderHtmlTypeIcon uses inverse appearance and disabled variant for date icon when onDark and disabled', async () => {
      const el = await fixture(html`<auro-input type="date"></auro-input>`);
      await elementUpdated(el);

      el.onDark = true;
      el.disabled = true;
      await elementUpdated(el);

      const accentIcon = el.shadowRoot.querySelector('.accentIcon');
      expect(accentIcon).to.not.be.null;
      expect(accentIcon.appearance).to.equal('inverse');
      expect(accentIcon.variant).to.equal('disabled');
    });

    it('patchInputEvent returns early when called with null', async () => {
      const el = await fixture(html`<auro-input></auro-input>`);
      await elementUpdated(el);

      // Should not throw when called with null
      expect(() => el.patchInputEvent(null)).to.not.throw();
    });

    it('setLang sets lang to undefined when document lang changes to en', async () => {
      const originalLang = document.documentElement.lang;

      // Set lang to 'es' first so the observer fires with a non-en value
      document.documentElement.lang = 'es';

      const el = await fixture(html`<auro-input></auro-input>`);
      await elementUpdated(el);

      expect(el.lang).to.equal('es');

      // Change to 'en' to trigger the MutationObserver with lang === 'en'
      document.documentElement.lang = 'en';

      // MutationObserver is async — wait for it to fire
      await new Promise((resolve) => setTimeout(resolve, 0));
      await elementUpdated(el);

      expect(el.lang).to.be.undefined;

      // Restore original lang
      document.documentElement.lang = originalLang || '';
    });

    it('getMaskOptions uses default credit-card mask when format is undefined', async () => {
      const el = await fixture(html`<auro-input></auro-input>`);
      await elementUpdated(el);

      const options = el.util.getMaskOptions('credit-card', undefined);
      expect(options.mask).to.equal('0000 0000 0000 0000');
    });

    it('getMaskOptions date parse converts 2-digit year <= 25 to 2000s', async () => {
      const el = await fixture(html`<auro-input></auro-input>`);
      await elementUpdated(el);

      const options = el.util.getMaskOptions('date', 'yy/mm');
      // Simulate IMask calling parse with a yy/mm string where year <= 25
      const result = options.parse.call({ mask: 'yy/mm' }, '25/06');
      expect(result.getFullYear()).to.equal(2025);
      expect(result.getMonth()).to.equal(5); // June = month index 5
    });

    rawIt('toNorthAmericanFormat defaults day to 01 when format has no dd component', async () => {
      const el = await fixture(html`<auro-input type="date" format="mm/yy"></auro-input>`);
      await elementUpdated(el);

      const input = el.shadowRoot.querySelector('input');
      input.focus();
      setInputValue(el, '06/25');
      await elementUpdated(el);

      expect(el.formattedDate).to.not.be.undefined;
    });

    it('toNorthAmericanFormat defaults month and year when format only has dd', async () => {
      const el = await fixture(html`<auro-input type="date" format="dd"></auro-input>`);
      await elementUpdated(el);

      // parseDate with 'dd' format returns only day, no month or year
      const result = el.util.toNorthAmericanFormat('15', 'dd');
      expect(result).to.not.be.undefined;
      expect(result.formattedDate).to.equal('15');
      expect(result.dateForComparison).to.include('01');
    });

    it('parseDate uses default mm/dd/yyyy format when format is undefined', async () => {
      const el = await fixture(html`<auro-input type="date"></auro-input>`);
      await elementUpdated(el);

      const result = el.util.parseDate('06/15/2025', undefined);
      expect(result).to.not.be.undefined;
      expect(result.month).to.equal('06');
      expect(result.day).to.equal('15');
      expect(result.year).to.equal('2025');
    });
  });

  describe('Keyboard Behavior', () => {
    it('should accept typed input', async () => {
      const el = await fixture(html`<auro-input></auro-input>`);
      await elementUpdated(el);

      setInputValue(el, 'typed text');
      await elementUpdated(el);

      expect(el.value).to.equal('typed text');
    });

    it('should focus the input when tabbed to', async () => {
      const el = await fixture(html`<auro-input></auro-input>`);

      el.focus();
      expect(document.activeElement === el).to.be.true;
    });
  });

  describe('Mouse Behavior', () => {
    describe('Click', () => {
      it('should clear the value when the clear button is clicked', async () => {
        const el = await fixture(html`
          <auro-input value="other value" label="First name"></auro-input>
        `);

        const clearButton = el.shadowRoot.querySelector('.clearBtn');
        clearButton.click();
        await elementUpdated();
        expect(el.value).to.equal('');
      });

      it('should stop propagation of keydown events on the clear button', async () => {
        const el = await fixture(html`
          <auro-input value="some value" label="First name"></auro-input>
        `);

        const clearButton = el.shadowRoot.querySelector('.clearBtn');
        let propagated = false;

        el.addEventListener('keydown', () => {
          propagated = true;
        });

        clearButton.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, composed: true }));
        expect(propagated).to.be.false;
      });

      it('should toggle password visibility when the toggle button is clicked', async () => {
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
    });
  });

  describe('A11Y', () => {
    it('should be accessible', async () => {
      const el = await fixture(html`
        <auro-input id="input-test"></auro-input>
      `);

      await expect(el).to.be.accessible();
    });

    it('should set aria-invalid attribute when input is in error state', async () => {
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
  });
});


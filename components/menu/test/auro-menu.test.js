/* eslint-disable max-lines, no-undef, no-underscore-dangle, max-statements-per-line, no-extra-parens, no-implicit-coercion, no-magic-numbers, no-unused-expressions, no-console, no-plusplus, no-await-in-loop, init-declarations */

import { fixture, html, expect, oneEvent, elementUpdated } from '@open-wc/testing';
import { setViewport } from '@web/test-runner-commands';
import designTokens from '@aurodesignsystem/design-tokens/dist/legacy/auro-classic/JSONVariablesFlat.json' with { type: 'json' };
import '../src/registered.js';

const mobileBreakpointWidth = parseInt(designTokens['ds-grid-breakpoint-sm'], 10) - 1;
import { arrayConverter, arraysAreEqual, isOptionInteractive } from '../src/auro-menu-utils.js';
import {
  defaultFixture,
  noninteractiveOptionsFixture,
  nestedMenuFixture,
  customEventFixture,
  emptyItemsFixture,
  multiSelectFixture,
} from './testFixtures.js';
import { getOptions } from './testFunctions.js';

/**
 * Runs the full menu test suite for a given viewport mode.
 * @param {boolean} mobileView - Whether tests should run in small or large viewport mode.
 * @returns {void}
 */
function runFullTest(mobileView) {
  before(async () => {
    await setViewport(mobileView ? { width: mobileBreakpointWidth, height: 800 } : { width: 800, height: 800 });
  });


  describe('Rendering', () => {
    // Add missing tests

    it('should be defined as a custom element', async () => {
      const el = await !!customElements.get("auro-menu");

      await expect(el).to.be.true;
    });

    describe('auro-menuoption', () => {
      describe('auto-generated IDs', () => {
        it('should generate an ID when none is provided', async () => {
          const el = await fixture(html`
            <auro-menu aria-label="test">
              <auro-menuoption value="test">Test</auro-menuoption>
            </auro-menu>
          `);

          const option = el.querySelector('auro-menuoption');

          expect(option.id).to.not.be.empty;
          expect(option.id).to.match(/^menuoption-/u);
        });

        it('should preserve an explicit ID when one is set', async () => {
          const el = await fixture(html`
            <auro-menu aria-label="test">
              <auro-menuoption id="my-custom-id" value="test">Test</auro-menuoption>
            </auro-menu>
          `);

          const option = el.querySelector('auro-menuoption');

          expect(option.id).to.equal('my-custom-id');
        });

        it('should generate unique IDs across multiple options', async () => {
          const el = await fixture(html`
            <auro-menu aria-label="test">
              <auro-menuoption value="a">A</auro-menuoption>
              <auro-menuoption value="b">B</auro-menuoption>
              <auro-menuoption value="c">C</auro-menuoption>
            </auro-menu>
          `);

          const options = el.querySelectorAll('auro-menuoption');
          const ids = [...options].map((opt) => opt.id);
          const uniqueIds = new Set(ids);

          expect(uniqueIds.size).to.equal(ids.length, 'all generated IDs should be unique');
        });
      });
    });

    describe('multiSelect initial state', () => {
      it('should handle no initial selection correctly in multi-select mode', async () => {
        const el = await multiSelectFixture();
        const menuEl = el.querySelector('auro-menu');

        // Verify initial state
        expect(menuEl.value).to.equal(undefined);
        expect(menuEl.optionSelected).to.equal(undefined);
      });

      it('should maintain undefined value until the first selection is made', async () => {
        const el = await multiSelectFixture();
        const menuEl = el.querySelector('auro-menu');

        // Navigate without selecting
        menuEl.navigateOptions('down');
        await elementUpdated(menuEl);

        menuEl.navigateOptions('down');
        await elementUpdated(menuEl);

        // Verify value remains undefined
        expect(menuEl.value).to.equal(undefined);
        expect(menuEl.optionSelected).to.equal(undefined);

        // Make first selection
        menuEl.makeSelection();
        await elementUpdated(menuEl);

        // Verify value is now an array
        const jsonValue = JSON.parse(menuEl.value);
        expect(jsonValue.length).to.equal(1);
      });
    });

    describe('checkmark icon', () => {
      it('9.10: selected option shows checkmark icon', async () => {
        const el = await fixture(html`
          <auro-menu>
            <auro-menuoption value="opt1">Option 1</auro-menuoption>
            <auro-menuoption value="opt2">Option 2</auro-menuoption>
          </auro-menu>
        `);
        await elementUpdated(el);

        const opt = el.querySelector('auro-menuoption');
        opt.click();
        await elementUpdated(opt);

        expect(opt.selected).to.be.true;
        expect(opt.hasAttribute('selected')).to.be.true;
      });
    });
  });

  describe('User Stories', () => {

    it('should prevent selection on a disabled menu', async () => {
      const el = await fixture(html`
        <auro-menu aria-label="test" disabled>
          <auro-menuoption value="option 1">option 1</auro-menuoption>
          <auro-menuoption value="option 2">option 2</auro-menuoption>
        </auro-menu>
      `);

      expect(el.disabled).to.be.true;

      // Try to select an option by clicking
      const option = el.querySelector('auro-menuoption');
      option.click();
      await elementUpdated(el);

      // Value should not be set
      expect(el.value).to.not.equal('option 1');
    });

    // This test should pass but fails due to a bug
    // it('should render pre-selected option when selected attribute is set', async () => {
    //   const el = await fixture(html`
    //     <auro-menu aria-label="test">
    //       <auro-menuoption value="option 1">option 1</auro-menuoption>
    //       <auro-menuoption value="option 2" selected>option 2</auro-menuoption>
    //     </auro-menu>
    //   `);
    //   await elementUpdated(el);

    //   const selectedOption = el.querySelector('auro-menuoption[selected]');
    //   expect(selectedOption).to.exist;
    //   expect(selectedOption.value).to.equal('option 2');
    //   expect(el.value).to.equal('option 2');
    // });

    it('should apply role="group" on a nested menu', async () => {
      const el = await nestedMenuFixture();
      const nestedMenu = el.querySelector('auro-menu auro-menu');
      await elementUpdated(nestedMenu);

      expect(nestedMenu.getAttribute('role')).to.equal('group');
    });

    describe('multiSelect', () => {
      it('should allow multiple options to be selected in multiSelect mode', async () => {
        const el = await multiSelectFixture();
        const menuEl = el.querySelector('auro-menu');
        const options = getOptions(menuEl);

        // Select first option
        menuEl.navigateOptions('down');
        await elementUpdated(menuEl);

        menuEl.makeSelection();
        await elementUpdated(menuEl);

        // Select second option
        menuEl.navigateOptions('down');
        await elementUpdated(menuEl);

        menuEl.makeSelection();
        await elementUpdated(menuEl);

        // Verify both options are selected
        const jsonValue = JSON.parse(menuEl.value);
        expect(jsonValue).to.eql([
          'option1',
          'option2'
        ]);
        expect(options[0].hasAttribute('selected')).to.be.true;
        expect(options[1].hasAttribute('selected')).to.be.true;
        expect(options[2].hasAttribute('selected')).to.be.false;

        // Verify optionSelected is an array with two elements
        expect(menuEl.optionSelected).to.be.an('array').with.lengthOf(2);
        expect(menuEl.optionSelected[0]).to.equal(options[0]);
        expect(menuEl.optionSelected[1]).to.equal(options[1]);
      });

      it('should correctly deselect an option in multi-select mode', async () => {
        const el = await multiSelectFixture();
        const menuEl = el.querySelector('auro-menu');
        const options = getOptions(menuEl);

        // Make selections
        menuEl.index = 0;
        menuEl.makeSelection();
        await elementUpdated(menuEl);

        menuEl.index = 1;
        menuEl.makeSelection();
        await elementUpdated(menuEl);

        menuEl.index = 2;
        menuEl.makeSelection();
        await elementUpdated(menuEl);

        // Verify initial selections

        expect(JSON.parse(menuEl.value)).to.eql([
          'option1',
          'option2',
          'option3'
        ]);
        expect(options[0].hasAttribute('selected')).to.be.true;
        expect(options[1].hasAttribute('selected')).to.be.true;
        expect(options[2].hasAttribute('selected')).to.be.true;

        // Deselect middle option
        menuEl.index = 1;
        menuEl.makeSelection();
        await elementUpdated(menuEl);

        // Verify state after deselection
        expect(JSON.parse(menuEl.value)).to.eql([
          'option1',
          'option3'
        ]);
        expect(options[0].hasAttribute('selected')).to.be.true;
        expect(options[1].hasAttribute('selected')).to.be.false;
        expect(options[2].hasAttribute('selected')).to.be.true;

        // Verify aria-selected states
        expect(options[0].getAttribute('aria-selected')).to.equal('true');
        expect(options[1].getAttribute('aria-selected')).to.equal('false');
        expect(options[2].getAttribute('aria-selected')).to.equal('true');

        // Deselect all remaining options
        menuEl.index = 0;
        menuEl.makeSelection();
        menuEl.index = 2;
        menuEl.makeSelection();
        await elementUpdated(menuEl);

        // Verify value is undefined when no options are selected
        expect(menuEl.value).to.be.undefined;
        options.forEach((option) => {
          expect(option.hasAttribute('selected')).to.be.false;
          expect(option.getAttribute('aria-selected')).to.equal('false');
        });
      });

      it('should not allow selection of disabled options in multi-select mode', async () => {
        const el = await multiSelectFixture();
        const menuEl = el.querySelector('auro-menu');
        const options = getOptions(menuEl);

        // Select disabled option
        menuEl.index = 3;
        menuEl.makeSelection();
        await elementUpdated(menuEl);

        // Verify disabled option remains unselected
        expect(options[3].hasAttribute('selected')).to.be.false;
        expect(options[3].getAttribute('aria-selected')).to.equal('false');

        // Select valid options
        menuEl.index = 0;
        menuEl.makeSelection();
        menuEl.index = 1;
        menuEl.makeSelection();
        await elementUpdated(menuEl);

        // Select disabled option again
        menuEl.index = 3;
        menuEl.makeSelection();
        await elementUpdated(menuEl);

        // Verify previous selections remain intact
        expect(options[0].hasAttribute('selected')).to.be.true;
        expect(options[1].hasAttribute('selected')).to.be.true;
        expect(options[3].hasAttribute('selected')).to.be.false;

        // Verify excluded options are still excluded
        expect(menuEl.value).to.include('option1');
        expect(menuEl.value).to.include('option2');
        expect(menuEl.value).to.not.include('option4');
      });

      it('should maintain disabled state on an option when toggling other options in multi-select mode', async () => {
        const el = await multiSelectFixture();
        const menuEl = el.querySelector('auro-menu');
        const options = getOptions(menuEl);

        // Select and deselect other options multiple times
        menuEl.index = 0;
        menuEl.makeSelection();
        await elementUpdated(menuEl);

        menuEl.index = 1;
        menuEl.makeSelection();
        await elementUpdated(menuEl);

        menuEl.index = 0;
        // Deselect first option
        menuEl.makeSelection();
        await elementUpdated(menuEl);

        // Verify disabled option remained unselected
        expect(options[3].hasAttribute('selected')).to.be.false;
        expect(options[3].getAttribute('aria-selected')).to.equal('false');
        expect(options[3].hasAttribute('disabled')).to.be.true;

        // Verify other options can still be toggled
        expect(options[0].hasAttribute('selected')).to.be.false;
        expect(options[1].hasAttribute('selected')).to.be.true;
      });

      describe('multiSelect programmatic updates', () => {
        it('should update selections when multiple values are set programmatically', async () => {
          const el = await multiSelectFixture();
          const menuEl = el.querySelector('auro-menu');
          const options = getOptions(menuEl);

          // Make programmatic selections
          menuEl.index = 0;
          menuEl.makeSelection();
          await elementUpdated(menuEl);

          menuEl.index = 2;
          menuEl.makeSelection();
          await elementUpdated(menuEl);

          // Verify selections
          expect(options[0].hasAttribute('selected')).to.be.true;
          expect(options[1].hasAttribute('selected')).to.be.false;
          expect(options[2].hasAttribute('selected')).to.be.true;
          expect(options[3].hasAttribute('selected')).to.be.false;

          // Verify aria-selected states are updated
          expect(options[0].getAttribute('aria-selected')).to.equal('true');
          expect(options[1].getAttribute('aria-selected')).to.equal('false');
          expect(options[2].getAttribute('aria-selected')).to.equal('true');
          expect(options[3].getAttribute('aria-selected')).to.equal('false');
        });

        it('should handle deselection of all options in multi-select mode', async () => {
          const el = await multiSelectFixture();
          const menuEl = el.querySelector('auro-menu');
          const options = getOptions(menuEl);

          // Make selections
          menuEl.index = 0;
          menuEl.makeSelection();
          await elementUpdated(menuEl);

          menuEl.index = 1;
          menuEl.makeSelection();
          await elementUpdated(menuEl);

          // Deselect
          menuEl.index = 0;
          menuEl.makeSelection();
          await elementUpdated(menuEl);

          menuEl.index = 1;
          menuEl.makeSelection();
          await elementUpdated(menuEl);

          options.forEach((option) => {
            expect(option.hasAttribute('selected')).to.be.false;
            expect(option.getAttribute('aria-selected')).to.equal('false');
          });

          // Verify value is undefined or empty after all deselections
          expect(menuEl.value === undefined || (Array.isArray(menuEl.value) && menuEl.value.length === 0)).to.be.true;
        });

        it('should respect disabled state when making programmatic selections', async () => {
          const el = await multiSelectFixture();
          const menuEl = el.querySelector('auro-menu');
          const options = getOptions(menuEl);

          // Select disabled option
          menuEl.index = 3;
          menuEl.makeSelection();
          await elementUpdated(menuEl);

          // Verify disabled option remains unselected
          expect(options[3].hasAttribute('selected')).to.be.false;
          expect(options[3].getAttribute('aria-selected')).to.equal('false');

          // Verify selectable options remain selectable
          menuEl.index = 0;
          menuEl.makeSelection();
          await elementUpdated(menuEl);

          expect(options[0].hasAttribute('selected')).to.be.true;
          expect(options[0].getAttribute('aria-selected')).to.equal('true');

          // Verify final selection state excludes disabled option
          const selectedOptions = Array.from(options).filter((opt) => opt.hasAttribute('selected'));
          expect(selectedOptions).to.have.lengthOf(1);
          expect(selectedOptions[0]).to.equal(options[0]);
        });
      });

      it('should allow deselection of individual options in multi-select mode', async () => {
        const el = await multiSelectFixture();
        const menuEl = el.querySelector('auro-menu');
        const options = getOptions(menuEl);

        // Select first option
        menuEl.navigateOptions('down');
        await elementUpdated(menuEl);

        menuEl.makeSelection();
        await elementUpdated(menuEl);

        // Select second option
        menuEl.navigateOptions('down');
        await elementUpdated(menuEl);

        menuEl.makeSelection();
        await elementUpdated(menuEl);

        // Deselect first option
        menuEl.navigateOptions('up');
        await elementUpdated(menuEl);

        menuEl.makeSelection();
        await elementUpdated(menuEl);

        // Verify only second option remains selected
        const jsonValue = JSON.parse(menuEl.value);
        expect(jsonValue).to.eql(['option2']);
        expect(options[0].hasAttribute('selected')).to.be.false;
        expect(options[1].hasAttribute('selected')).to.be.true;
      });

      it('should maintain correct aria-selected states across multiple selections', async () => {
        const el = await multiSelectFixture();
        const menuEl = el.querySelector('auro-menu');
        const options = getOptions(menuEl);

        // Select first option
        menuEl.navigateOptions('down');
        await elementUpdated(menuEl);

        menuEl.makeSelection();
        await elementUpdated(menuEl);

        // Select third option
        menuEl.navigateOptions('down');
        await elementUpdated(menuEl);

        menuEl.navigateOptions('down');
        await elementUpdated(menuEl);

        menuEl.makeSelection();
        await elementUpdated(menuEl);

        // Verify aria-selected states
        const jsonValue = JSON.parse(menuEl.value);
        expect(jsonValue).to.eql([
          'option1',
          'option3'
        ]);
        expect(options[0].getAttribute('aria-selected')).to.equal('true');
        expect(options[1].getAttribute('aria-selected')).to.equal('false');
        expect(options[2].getAttribute('aria-selected')).to.equal('true');
      });

      it('should initialize with preset values when multiSelect is enabled', async () => {
        // Start with regular fixture
        const el = await multiSelectFixture();
        const menuEl = el.querySelector('auro-menu');
        const options = getOptions(menuEl);

        // Set initial selections
        menuEl.index = 0;
        menuEl.makeSelection();
        menuEl.index = 2;
        menuEl.makeSelection();

        await elementUpdated(menuEl);

        // Verify initial selections
        expect(menuEl.value.indexOf('[')).to.be.equal(0);
        expect(menuEl.value).to.include('option1');
        expect(menuEl.value).to.include('option3');
        expect(menuEl.value).to.not.include('option2');

        // Verify options have correct selected state
        expect(options[0].hasAttribute('selected')).to.be.true;
        expect(options[1].hasAttribute('selected')).to.be.false;
        expect(options[2].hasAttribute('selected')).to.be.true;
        expect(options[3].hasAttribute('selected')).to.be.false;

        // Verify aria-selected states
        expect(options[0].getAttribute('aria-selected')).to.equal('true');
        expect(options[1].getAttribute('aria-selected')).to.equal('false');
        expect(options[2].getAttribute('aria-selected')).to.equal('true');
        expect(options[3].getAttribute('aria-selected')).to.equal('false');
      });

    });

    describe('value states', () => {
      it('should initialize with an undefined value before any selection', async () => {
        const el = await defaultFixture();
        const menu = el.querySelector('auro-menu');

        expect(menu.value).to.equal(undefined);
        expect(menu.optionSelected).to.equal(undefined);
      });

      it('should dispatch a single selectedOption event for one programmatic value change', async () => {
        const el = await defaultFixture();
        const menu = el.querySelector('auro-menu');
        let selectedEventCount = 0;

        menu.addEventListener('auroMenu-selectedOption', () => {
          selectedEventCount += 1;
        });

        menu.value = 'option 2';
        await elementUpdated(menu);
        await new Promise((resolve) => setTimeout(resolve, 0));

        expect(menu.value).to.equal('option 2');
        expect(menu.optionSelected && menu.optionSelected.value).to.equal('option 2');
        expect(selectedEventCount).to.equal(1);
      });

      it('should persist selection when clicking the same option again in single-select mode', async () => {
        const el = await defaultFixture();
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

      // Verify reset() returns to undefined
      it('should handle undefined vs array state correctly in multi-select mode', async () => {
        const el = await multiSelectFixture();
        const menu = el.querySelector('auro-menu');

        // Initial state
        expect(menu.value).to.equal(undefined);

        // Select in multiselect
        menu.navigateOptions('down');
        await elementUpdated(menu);

        menu.makeSelection();
        await elementUpdated(menu);

        // After selection, should be array
        expect(menu.value.indexOf('[')).to.be.equal(0);
        const jsonValue = JSON.parse(menu.value);
        expect(jsonValue).to.eql(['option1']);

        // Deselect
        menu.makeSelection();
        await elementUpdated(menu);

        // After deselection, should be undefined
        expect(menu.value).to.equal(undefined);
      });
    });

    describe('arrayConverter', () => {
      let originalConsoleError;

      beforeEach(() => {
        // Store original console.error
        originalConsoleError = console.error;
        // Replace with no-op to suppress logs during tests
        console.error = () => { };
      });

      afterEach(() => {
        // Restore original console.error
        console.error = originalConsoleError;
      });

      describe('valid inputs', () => {
        it('should pass through actual arrays unchanged', () => {
          const input = [
            1,
            2,
            3
          ];
          const result = arrayConverter(input);
          expect(result).to.eql([
            1,
            2,
            3
          ]);
        });

        it('should return undefined when input is undefined', () => {
          const result = arrayConverter(undefined);
          expect(result).to.be.undefined;
        });

        it('should parse valid JSON array strings into arrays', () => {
          const input = '[1,2,3]';
          const result = arrayConverter(input);
          expect(result).to.eql([
            1,
            2,
            3
          ]);
        });
      });

      describe('invalid inputs', () => {
        it('should throw an error for a comma-separated string', () => {
          const input = 'item1,item2';
          expect(() => arrayConverter(input)).to.throw(Error);
        });

        it('should throw an error for a single non-JSON string', () => {
          const input = 'item1';
          expect(() => arrayConverter(input)).to.throw(Error);
        });

        it('should throw an error for a JSON object string', () => {
          const input = '{"key":"value"}';
          expect(() => arrayConverter(input)).to.throw(Error);
        });

        it('should throw an error for a number input', () => {
          const input = 123;
          expect(() => arrayConverter(input)).to.throw(Error);
        });
      });
    });

    it('should mark option as active after navigating down then up', async () => {
      const el = await defaultFixture();
      const menuEl = el.querySelector('auro-menu');
      const options = getOptions(menuEl);

      // Initialize state by moving down first
      menuEl.navigateOptions('down');
      await elementUpdated(menuEl);

      // Move up
      menuEl.navigateOptions('up');
      await elementUpdated(menuEl);

      const selectedOption = options.find((opt) => opt.classList.contains('active'));
      expect(selectedOption).to.not.be.undefined;
    });

    it('should send custom events when an option is selected', async () => {
      const el = await customEventFixture();
      const menuEl = el.querySelector('auro-menu');
      const { options } = menuEl;
      const eventOption = options.find((opt) => opt.getAttribute('event') !== null);

      const listener1 = oneEvent(el, eventOption.event);
      const listener2 = oneEvent(el, 'auroMenu-customEventFired');

      // Wait a tick and then select the option to trigger the event
      setTimeout(() => {
        menuEl.value = eventOption.value;
      }, 0);

      const { detail: result } = await listener1;
      const { detail: result2 } = await listener2;
      expect(result.option).to.equal(eventOption);
      expect(result2.option).to.equal(eventOption);
    });

    it('should handle an empty items array without errors', async () => {
      const el = await emptyItemsFixture();
      const menuEl = el.querySelector('auro-menu');
      menuEl.makeSelection();

      const menuChild = menuEl.querySelector('[test-id=test-child]');
      menuChild.makeSelection();

      expect(menuEl.items).to.equal(undefined);
      expect(menuChild.items).to.equal(undefined);
    });

    describe('matchWord highlighting', () => {
      it('9.13: matchWord property is accepted on menu', async () => {
        const el = await fixture(html`
          <auro-menu matchword="ap">
            <auro-menuoption value="apple">Apple</auro-menuoption>
          </auro-menu>
        `);
        await elementUpdated(el);

        expect(el.matchWord).to.equal('ap');
      });
    });
  });

  describe('Properties', () => {
    describe('disabled', () => {
      it('should not allow selection of a disabled menu option', async () => {
        const el = await customEventFixture();
        const menuEl = el.querySelector('auro-menu');
        menuEl.setAttribute('disabled', '');

        expect(menuEl.disabled).to.be.true;
      });
    });

    describe('hasLoadingPlaceholder', () => {
      it('should be true when loadingText slot is populated', async () => {
        const el = await fixture(html`<auro-menu loading><span slot="loadingText">Loading...</span><auro-menuoption value="one">One</auro-menuoption></auro-menu>`);
        await elementUpdated(el);

        expect(el.hasLoadingPlaceholder).to.be.true;
      });
    });

    describe('layout', () => {
      it('should accept a layout property', async () => {
        const el = await fixture(html`<auro-menu layout="compact" aria-label="test"><auro-menuoption value="one">One</auro-menuoption></auro-menu>`);

        expect(el.layout).to.equal('compact');
      });
    });

    describe('loading', () => {
      it('should default to false', async () => {
        const el = await defaultFixture();
        const menuEl = el.querySelector('auro-menu');

        expect(menuEl.loading).to.be.false;
      });

      it('should reflect the loading attribute', async () => {
        const el = await fixture(html`<auro-menu loading aria-label="test"><auro-menuoption value="one">One</auro-menuoption></auro-menu>`);

        expect(el.loading).to.be.true;
        expect(el.hasAttribute('loading')).to.be.true;
      });
    });

    describe('matchWord', () => {
      it('should correctly match options using the matchWord feature', async () => {
        const el = await customEventFixture();
        const menuEl = el.querySelector('auro-menu');
        expect(menuEl.innerHTML.includes('<strong')).to.be.true;
      });
    });

    describe('multiSelect', () => {
      it('should default to false', async () => {
        const el = await defaultFixture();
        const menuEl = el.querySelector('auro-menu');

        expect(menuEl.multiSelect).to.be.false;
      });

      it('should reflect the multiSelect attribute', async () => {
        const el = await multiSelectFixture();
        const menuEl = el.querySelector('auro-menu');

        expect(menuEl.multiSelect).to.be.true;
      });

      it('should accept preset value as JSON array string in multiSelect mode', async () => {
        const el = await fixture(html`
          <div>
            <auro-menu multiselect aria-label="test">
              <auro-menuoption value="option 1">option 1</auro-menuoption>
              <auro-menuoption value="option 2">option 2</auro-menuoption>
              <auro-menuoption value="option 3">option 3</auro-menuoption>
            </auro-menu>
          </div>
        `);
        const menuEl = el.querySelector('auro-menu');
        await elementUpdated(menuEl);

        menuEl.value = '["option 1","option 3"]';
        await elementUpdated(menuEl);

        const options = menuEl.querySelectorAll('auro-menuoption');
        expect(options[0].hasAttribute('selected')).to.be.true;
        expect(options[1].hasAttribute('selected')).to.be.false;
        expect(options[2].hasAttribute('selected')).to.be.true;
      });
    });

    describe('noCheckmark', () => {
      it('should not display checkmarks on selected options when noCheckmark is set', async () => {
        const el = await nestedMenuFixture();
        const menuEl = el.querySelector('auro-menu');

        const childMenu = document.createElement('auro-menu');
        menuEl.appendChild(childMenu);
        menuEl.setAttribute('noCheckmark', '');

        expect(menuEl.hasAttribute('noCheckmark')).to.be.true;
      });
    });

    describe('onDark', () => {
      it('should default to undefined', async () => {
        const el = await defaultFixture();
        const menuEl = el.querySelector('auro-menu');

        expect(menuEl.hasAttribute('ondark')).to.be.false;
      });
    });

    describe('optionActive', () => {
      it('should be undefined initially', async () => {
        const el = await defaultFixture();
        const menuEl = el.querySelector('auro-menu');

        expect(menuEl.optionActive).to.be.undefined;
      });

      it('should update after navigation', async () => {
        const el = await defaultFixture();
        const menuEl = el.querySelector('auro-menu');
        const options = getOptions(menuEl);

        menuEl.navigateOptions('down');
        await elementUpdated(menuEl);

        expect(menuEl.optionActive).to.equal(options[0]);
      });
    });

    describe('optionSelected', () => {
      it('should mark option as selected when makeSelection is called', async () => {
        const el = await defaultFixture();
        const menuEl = el.querySelector('auro-menu');
        const options = getOptions(menuEl);
        const index = 0;

        // Navigate to first option
        menuEl.navigateOptions('down');
        await elementUpdated(menuEl);

        // Select active option
        menuEl.makeSelection();
        await elementUpdated(menuEl);

        // Verify selection
        expect(options[index].hasAttribute('selected')).to.be.true;
        expect(options[index].getAttribute('aria-selected')).to.equal('true');
        expect(menuEl.optionSelected).to.equal(options[index]);
      });

      it('should mark option as selected after navigating down and calling makeSelection', async () => {
        const el = await defaultFixture();
        const menuEl = el.querySelector('auro-menu');
        const options = getOptions(menuEl);

        // Navigate down
        menuEl.navigateOptions('down');
        await elementUpdated(menuEl);

        // Another down to get to second option
        menuEl.navigateOptions('down');
        await elementUpdated(menuEl);

        // Select active option
        menuEl.makeSelection();
        await elementUpdated(menuEl);

        expect(menuEl.optionSelected).to.equal(options[1]);
      });
    });

    describe('shape', () => {
      it('should default to box', async () => {
        const el = await defaultFixture();
        const menuEl = el.querySelector('auro-menu');

        expect(menuEl.shape).to.equal('box');
      });

      it('should accept a shape property', async () => {
        const el = await fixture(html`<auro-menu shape="round" aria-label="test"><auro-menuoption value="one">One</auro-menuoption></auro-menu>`);

        expect(el.shape).to.equal('round');
      });
    });

    describe('size', () => {
      it('should default to sm', async () => {
        const el = await defaultFixture();
        const menuEl = el.querySelector('auro-menu');

        expect(menuEl.size).to.equal('sm');
      });

      it('should accept a size property', async () => {
        const el = await fixture(html`<auro-menu size="md" aria-label="test"><auro-menuoption value="one">One</auro-menuoption></auro-menu>`);

        expect(el.size).to.equal('md');
      });
    });

    describe('value', () => {
      it('should default to undefined', async () => {
        const el = await defaultFixture();
        const menuEl = el.querySelector('auro-menu');

        expect(menuEl.value).to.be.undefined;
      });

      it('should update value when an option is selected', async () => {
        const el = await defaultFixture();
        const menuEl = el.querySelector('auro-menu');

        menuEl.navigateOptions('down');
        await elementUpdated(menuEl);
        menuEl.makeSelection();
        await elementUpdated(menuEl);

        expect(menuEl.value).to.equal('option 1');
      });

      it('should select an option when value is set programmatically', async () => {
        const el = await defaultFixture();
        const menuEl = el.querySelector('auro-menu');

        menuEl.value = 'option 1';
        await elementUpdated(menuEl);

        expect(menuEl.optionSelected).to.not.be.undefined;
        expect(menuEl.optionSelected.value).to.equal('option 1');
      });
    });

    describe('options', () => {
      it('should return the list of registered options', async () => {
        const el = await defaultFixture();
        const menuEl = el.querySelector('auro-menu');

        expect(menuEl.options).to.be.an('array');
        expect(menuEl.options.length).to.be.greaterThan(0);
      });

      it('should return an empty array for a menu with no options', async () => {
        const el = await emptyItemsFixture();
        const menuEl = el.querySelector('auro-menu');
        const opts = menuEl.options;

        expect(opts === undefined || (Array.isArray(opts) && opts.length === 0)).to.be.true;
      });
    });

    describe('currentLabel', () => {
      it('should return empty string when no option is selected', async () => {
        const el = await defaultFixture();
        const menuEl = el.querySelector('auro-menu');

        expect(menuEl.currentLabel).to.equal('');
      });

      it('should return the label of the selected option', async () => {
        const el = await defaultFixture();
        const menuEl = el.querySelector('auro-menu');

        menuEl.navigateOptions('down');
        await elementUpdated(menuEl);
        menuEl.makeSelection();
        await elementUpdated(menuEl);

        expect(menuEl.currentLabel).to.not.equal('');
      });
    });

    describe('items', () => {
      it('should return the same value as options (deprecated alias)', async () => {
        const el = await defaultFixture();
        const menuEl = el.querySelector('auro-menu');

        expect(menuEl.items).to.deep.equal(menuEl.options);
      });
    });

    describe('index', () => {
      it('should default to -1', async () => {
        const el = await defaultFixture();
        const menuEl = el.querySelector('auro-menu');

        expect(menuEl.index).to.equal(-1);
      });

      it('should update after navigating options', async () => {
        const el = await defaultFixture();
        const menuEl = el.querySelector('auro-menu');

        menuEl.navigateOptions('down');
        await elementUpdated(menuEl);

        expect(menuEl.index).to.equal(0);
      });

      it('should highlight the correct option when set programmatically', async () => {
        const el = await defaultFixture();
        const menuEl = el.querySelector('auro-menu');
        const options = getOptions(menuEl);

        menuEl.index = 2;
        await elementUpdated(menuEl);

        expect(menuEl.optionActive).to.equal(options[2]);
      });
    });

    describe('selectedOptions', () => {
      it('should return an empty array when no option is selected', async () => {
        const el = await defaultFixture();
        const menuEl = el.querySelector('auro-menu');

        expect(menuEl.selectedOptions).to.be.an('array');
        expect(menuEl.selectedOptions.length).to.equal(0);
      });

      it('should contain the selected option after making a selection', async () => {
        const el = await defaultFixture();
        const menuEl = el.querySelector('auro-menu');

        menuEl.navigateOptions('down');
        await elementUpdated(menuEl);
        menuEl.makeSelection();
        await elementUpdated(menuEl);

        expect(menuEl.selectedOptions.length).to.equal(1);
      });

      it('should contain multiple selected options in multiSelect mode', async () => {
        const el = await multiSelectFixture();
        const menuEl = el.querySelector('auro-menu');

        menuEl.navigateOptions('down');
        await elementUpdated(menuEl);
        menuEl.makeSelection();
        await elementUpdated(menuEl);

        menuEl.navigateOptions('down');
        await elementUpdated(menuEl);
        menuEl.makeSelection();
        await elementUpdated(menuEl);

        expect(menuEl.selectedOptions.length).to.equal(2);
      });
    });

    describe('selectedOption', () => {
      it('should return undefined when no option is selected', async () => {
        const el = await defaultFixture();
        const menuEl = el.querySelector('auro-menu');

        expect(menuEl.selectedOption).to.not.exist;
      });

      it('should return the selected option after making a selection', async () => {
        const el = await defaultFixture();
        const menuEl = el.querySelector('auro-menu');

        menuEl.navigateOptions('down');
        await elementUpdated(menuEl);
        menuEl.makeSelection();
        await elementUpdated(menuEl);

        expect(menuEl.selectedOption).to.not.be.null;
        expect(menuEl.selectedOption.value).to.equal('option 1');
      });
    });
  });

  describe('Slots', () => {
    describe('default', () => {
      it('should render content in the default slot', async () => {
        const el = await defaultFixture();

        const menu = el.querySelector('auro-menu');
        const slot = menu.shadowRoot.querySelector('slot:not([name])');

        await expect(slot).to.exist;
        const assigned = slot.assignedNodes().filter((node) => node.nodeType === Node.ELEMENT_NODE);

        await expect(assigned.length).to.be.greaterThan(0);
      });
    });

    describe('loadingText', () => {
      it('should render content in the loadingText slot', async () => {
        const el = await fixture(html`<auro-menu loading><span slot="loadingText">Loading...</span><auro-menuoption value="one">One</auro-menuoption></auro-menu>`);

        const slotContent = el.querySelector('[slot="loadingText"]');

        await expect(slotContent).to.exist;
      });
    });

    describe('dividers', () => {
      it('should render hr elements between menu options', async () => {
        const el = await fixture(html`
          <div>
            <auro-menu aria-label="test">
              <auro-menuoption value="opt1">Option 1</auro-menuoption>
              <hr>
              <auro-menuoption value="opt2">Option 2</auro-menuoption>
              <hr>
              <auro-menuoption value="opt3">Option 3</auro-menuoption>
            </auro-menu>
          </div>
        `);
        const menuEl = el.querySelector('auro-menu');

        const dividers = menuEl.querySelectorAll('hr');
        expect(dividers.length).to.equal(2);
      });

      it('should skip dividers during keyboard navigation', async () => {
        const el = await fixture(html`
          <div>
            <auro-menu aria-label="test">
              <auro-menuoption value="opt1">Option 1</auro-menuoption>
              <hr>
              <auro-menuoption value="opt2">Option 2</auro-menuoption>
            </auro-menu>
          </div>
        `);
        const menuEl = el.querySelector('auro-menu');
        await elementUpdated(menuEl);

        menuEl.navigateOptions('down');
        await elementUpdated(menuEl);

        // First down should land on opt1
        expect(menuEl.index).to.equal(0);

        menuEl.navigateOptions('down');
        await elementUpdated(menuEl);

        // Second down should skip the hr and land on opt2
        expect(menuEl.index).to.equal(1);
      });
    });

    describe('loadingIcon', () => {
      it('should render content in the loadingIcon slot', async () => {
        const el = await fixture(html`<auro-menu loading><span slot="loadingIcon">⏳</span><auro-menuoption value="one">One</auro-menuoption></auro-menu>`);

        const slotContent = el.querySelector('[slot="loadingIcon"]');

        await expect(slotContent).to.exist;
      });
    });
  });

  describe('Public Functions', () => {
    describe('register', () => {
      it('should register the custom element', () => {
        const registeredTag = customElements.get('auro-menu');

        expect(registeredTag).to.not.be.undefined;
      });
    });

    describe('updateActiveOption', () => {
      it('should set the given option as the active option', async () => {
        const el = await defaultFixture();
        const menuEl = el.querySelector('auro-menu');
        const options = getOptions(menuEl);

        menuEl.updateActiveOption(options[2]);
        await elementUpdated(menuEl);

        expect(menuEl.optionActive).to.equal(options[2]);
      });
    });

    describe('reset', () => {
      it('should return value to undefined only after reset() is called', async () => {
        const el = await defaultFixture();
        const menu = el.querySelector('auro-menu');

        // Initial state
        expect(menu.value).to.equal(undefined);
        expect(menu.optionSelected).to.equal(undefined);

        // Select an option
        menu.navigateOptions('down');
        await elementUpdated(menu);

        menu.makeSelection();
        await elementUpdated(menu);

        // Verify selection
        expect(menu.value).to.eql('option 1');

        // Reset
        menu.reset();
        await elementUpdated(menu);

        // After reset, should be undefined
        expect(menu.value).to.equal(undefined);
        expect(menu.optionSelected).to.equal(undefined);
      });

      it('should maintain the current selection in single-select mode until reset() is called', async () => {
        const el = await defaultFixture();
        const menu = el.querySelector('auro-menu');

        // Initial state
        expect(menu.value).to.equal(undefined);
        expect(menu.optionSelected).to.equal(undefined);

        // Select and verify
        menu.navigateOptions('down');
        await elementUpdated(menu);

        menu.makeSelection();
        await elementUpdated(menu);

        // Verify array after selection
        expect(menu.value).to.eql('option 1');

        // Try to deselect - should have no effect
        menu.makeSelection();
        await elementUpdated(menu);

        // Selection should persist
        expect(menu.value).to.eql('option 1');

        // Reset
        menu.reset();
        await elementUpdated(menu);

        // After reset, should be undefined
        expect(menu.value).to.equal(undefined);
        expect(menu.optionSelected).to.equal(undefined);
      });
    });

    describe('resetShapeClasses', () => {
      it('should execute without error', async () => {
        const el = await fixture(html`<auro-menu shape="round" size="md" aria-label="test"><auro-menuoption value="one">One</auro-menuoption></auro-menu>`);
        await elementUpdated(el);

        expect(() => el.resetShapeClasses()).to.not.throw();
      });
    });

    describe('resetLayoutClasses', () => {
      it('should execute without error', async () => {
        const el = await fixture(html`<auro-menu layout="compact" aria-label="test"><auro-menuoption value="one">One</auro-menuoption></auro-menu>`);
        await elementUpdated(el);

        expect(() => el.resetLayoutClasses()).to.not.throw();
      });
    });

    describe('updateComponentArchitecture', () => {
      it('should execute without error', async () => {
        const el = await fixture(html`<auro-menu layout="compact" shape="round" size="md" aria-label="test"><auro-menuoption value="one">One</auro-menuoption></auro-menu>`);
        await elementUpdated(el);

        expect(() => el.updateComponentArchitecture()).to.not.throw();
      });
    });
  });

  describe('Events', () => {
    describe('auroMenu-activatedOption', () => {
      it('should fire when an option is highlighted via navigation', async () => {
        const el = await defaultFixture();
        const menuEl = el.querySelector('auro-menu');

        const listener = oneEvent(menuEl, 'auroMenu-activatedOption');
        menuEl.navigateOptions('down');

        const event = await listener;
        expect(event).to.exist;
        expect(event.detail).to.exist;
      });

      it('should fire when index is set programmatically', async () => {
        const el = await defaultFixture();
        const menuEl = el.querySelector('auro-menu');

        const listener = oneEvent(menuEl, 'auroMenu-activatedOption');
        menuEl.index = 1;

        const event = await listener;
        expect(event).to.exist;
      });
    });

    describe('auroMenu-customEventFired', () => {
      it('should fire when selecting an option with an event attribute', async () => {
        const el = await customEventFixture();
        const menuEl = el.querySelector('auro-menu');

        const listener = oneEvent(menuEl, 'auroMenu-customEventFired');
        menuEl.navigateOptions('down');
        await elementUpdated(menuEl);
        menuEl.makeSelection();

        const event = await listener;
        expect(event).to.exist;
      });
    });

    describe('auroMenu-loadingChange', () => {
      it('should fire when loading property changes', async () => {
        const el = await defaultFixture();
        const menuEl = el.querySelector('auro-menu');

        const listener = oneEvent(menuEl, 'auroMenu-loadingChange');
        menuEl.loading = true;
        await elementUpdated(menuEl);

        const event = await listener;
        expect(event).to.exist;
        expect(event.detail.loading).to.be.true;
      });
    });

    describe('auroMenu-selectValueFailure', () => {
      it('should fire when value is set to a non-existent option', async () => {
        const el = await defaultFixture();
        const menuEl = el.querySelector('auro-menu');

        const listener = oneEvent(menuEl, 'auroMenu-selectValueFailure');
        menuEl.value = 'non-existent-value';
        await elementUpdated(menuEl);

        const event = await listener;
        expect(event).to.exist;
      });

      it('should have already cleared optionSelected when the event fires', async () => {
        // Synchronous listeners (e.g. auro-select's updateDisplayedValue) read
        // menu.optionSelected to decide what to render. If the dispatch happens
        // before the clear, listeners see the stale prior selection and re-render
        // the old label.
        const el = await defaultFixture();
        const menuEl = el.querySelector('auro-menu');

        // Establish a prior selection so the stale value is observable.
        menuEl.value = 'option 1';
        await elementUpdated(menuEl);
        expect(menuEl.optionSelected, 'precondition: prior selection set').to.exist;

        let optionSelectedAtDispatch = 'unread';
        menuEl.addEventListener('auroMenu-selectValueFailure', () => {
          optionSelectedAtDispatch = menuEl.optionSelected;
        }, { once: true });

        menuEl.value = 'non-existent-value';
        await elementUpdated(menuEl);

        expect(optionSelectedAtDispatch).to.be.undefined;
      });
    });

    describe('auroMenu-selectValueReset', () => {
      it('should fire when reset() is called', async () => {
        const el = await defaultFixture();
        const menuEl = el.querySelector('auro-menu');

        // Select an option first
        menuEl.navigateOptions('down');
        await elementUpdated(menuEl);
        menuEl.makeSelection();
        await elementUpdated(menuEl);

        const listener = oneEvent(menuEl, 'auroMenu-selectValueReset');
        menuEl.reset();

        const event = await listener;
        expect(event).to.exist;
      });
    });

    describe('auroMenu-selectedOption', () => {
      it('should fire when an option is selected', async () => {
        const el = await defaultFixture();
        const menuEl = el.querySelector('auro-menu');

        const listener = oneEvent(menuEl, 'auroMenu-selectedOption');
        menuEl.navigateOptions('down');
        await elementUpdated(menuEl);
        menuEl.makeSelection();

        const event = await listener;
        expect(event).to.exist;
        expect(event.detail).to.deep.equal({ source: undefined });
      });

      it('should include only source in the event detail', async () => {
        const el = await defaultFixture();
        const menuEl = el.querySelector('auro-menu');

        const listener = oneEvent(menuEl, 'auroMenu-selectedOption');
        menuEl.navigateOptions('down');
        await elementUpdated(menuEl);
        menuEl.makeSelection();

        const event = await listener;
        expect(event.detail).to.deep.equal({ source: undefined });
      });
    });

    describe('auroMenu-optionsChange', () => {
      it('should fire when options are added', async () => {
        const el = await fixture(html`<auro-menu aria-label="test"></auro-menu>`);

        const listener = oneEvent(el, 'auroMenu-optionsChange');
        const option = document.createElement('auro-menuoption');
        option.value = 'new-option';
        option.textContent = 'New Option';
        el.appendChild(option);

        const event = await listener;
        expect(event).to.exist;
      });
    });
  });

  describe('Private Functions', () => {
    describe('makeSelection', () => {
      it('should select a nested option when makeSelection is called', async () => {
        const el = await nestedMenuFixture();
        const rootMenu = el.querySelector('auro-menu');
        const nestedMenu = el.querySelector('auro-menu auro-menu');
        const nestedOptions = [...nestedMenu.querySelectorAll('auro-menuoption')];

        // Navigate to first nested option (option a)
        rootMenu.navigateOptions('down');
        await elementUpdated(rootMenu);
        rootMenu.navigateOptions('down');
        await elementUpdated(rootMenu);

        // Select it
        rootMenu.makeSelection();
        await elementUpdated(rootMenu);

        expect(rootMenu.optionSelected).to.equal(nestedOptions[0]);
        expect(nestedOptions[0].hasAttribute('selected')).to.be.true;
        expect(rootMenu.value).to.equal('option a');
      });
    });
  });

  describe('A11Y', () => {
    it('should be accessible', async () => {
      const el = await nestedMenuFixture();

      await expect(el).to.be.accessible();
    });

    it('should set aria-multiselectable attribute on the menu when multiSelect is enabled', async () => {
      const el = await multiSelectFixture();
      const menuEl = el.querySelector('auro-menu');

      expect(menuEl.getAttribute('aria-multiselectable')).to.equal('true');
    });

    it('should remove aria-multiselectable attribute when multiSelect is disabled', async () => {
      const el = await multiSelectFixture();
      const menuEl = el.querySelector('auro-menu');

      expect(menuEl.getAttribute('aria-multiselectable')).to.equal('true');

      menuEl.multiSelect = false;
      await elementUpdated(menuEl);

      expect(menuEl.hasAttribute('aria-multiselectable')).to.be.false;
    });

    describe('aria-busy on loading', () => {
      it('loading state sets aria-busy on menu', async () => {
        const el = await fixture(html`<auro-menu loading></auro-menu>`);
        await elementUpdated(el);

        expect(el.getAttribute('aria-busy')).to.equal('true');
      });
    });

    describe('nested menu aria-label', () => {
      it('9.7: nested menu gets aria-label="submenu"', async () => {
        const el = await fixture(html`
          <auro-menu>
            <auro-menuoption value="opt1">Option 1</auro-menuoption>
            <auro-menu>
              <auro-menuoption value="sub1">Sub Option 1</auro-menuoption>
            </auro-menu>
          </auro-menu>
        `);
        await elementUpdated(el);

        const nestedMenu = el.querySelector('auro-menu');
        expect(nestedMenu.getAttribute('aria-label')).to.equal('submenu');
      });
    });
  });

  describe('Mouse Behavior', () => {
    describe('Click', () => {
      it('should handle mouseover and mousedown events on menu options', async () => {
        const el = await defaultFixture();
        const menuEl = el.querySelector('auro-menu');
        const optionEl = menuEl.querySelector('auro-menuoption');

        optionEl.dispatchEvent(new KeyboardEvent('mouseover', {
          bubbles: true,
          composed: true
        }));

        optionEl.dispatchEvent(new KeyboardEvent('mousedown', {
          bubbles: true,
          composed: true
        }));
      });
    });
  });

  describe('Keyboard Behavior', () => {

    describe('ArrowDown', () => {
      it('should loop to the first option in the slot from the last option', async () => {
        const el = await defaultFixture();
        const menuEl = el.querySelector('auro-menu');
        const options = getOptions(menuEl);

        // Press down repeatedly to reach last option
        for (let index = 0; index < options.length + 1; index++) {
          menuEl.navigateOptions('down');
          await elementUpdated(menuEl);
        }

        expect(menuEl.optionActive).to.equal(options[1]);
      });

      it('should skip hidden and disabled menu options when navigating', async () => {
        const el = await noninteractiveOptionsFixture();
        const menuEl = el.querySelector('auro-menu');
        const options = getOptions(menuEl);

        // Navigate down - should skip disabled and hidden options
        menuEl.navigateOptions('down');
        await elementUpdated(menuEl);

        // Should have skipped to option 3 (index 2) since first two are non-interactive
        expect(menuEl.optionActive).to.equal(options[2]);
      });

      it('should move from a root option into nested options', async () => {
        const el = await nestedMenuFixture();
        const rootMenu = el.querySelector('auro-menu');
        const nestedMenu = el.querySelector('auro-menu auro-menu');
        const nestedOptions = [...nestedMenu.querySelectorAll('auro-menuoption')];

        // First ArrowDown → highlights option 1 (root)
        rootMenu.navigateOptions('down');
        await elementUpdated(rootMenu);

        // Second ArrowDown → highlights option a (first nested option)
        rootMenu.navigateOptions('down');
        await elementUpdated(rootMenu);

        expect(rootMenu.optionActive).to.equal(nestedOptions[0]);
      });

      it('should move from the last nested option to the next root option', async () => {
        const el = await nestedMenuFixture();
        const rootMenu = el.querySelector('auro-menu');
        const rootOptions = [...el.querySelectorAll(':scope > auro-menu > auro-menuoption')];

        // Navigate to option 1 → option a → option b → option 2
        for (let index = 0; index < 4; index++) {
          rootMenu.navigateOptions('down');
          await elementUpdated(rootMenu);
        }

        expect(rootMenu.optionActive).to.equal(rootOptions[1]);
      });
    });

    describe('ArrowUp', () => {
      it('should move to the last option in the slot from the first option', async () => {
        const el = await defaultFixture();
        const menuEl = el.querySelector('auro-menu');
        const options = getOptions(menuEl);
        const lastIndex = options.length - 1;

        // Then move up to trigger wrapping behavior
        menuEl.navigateOptions('up');
        await elementUpdated(menuEl);

        expect(menuEl.optionActive).to.equal(options[lastIndex]);
      });

      it('should move from the first nested option back to the preceding root option', async () => {
        const el = await nestedMenuFixture();
        const rootMenu = el.querySelector('auro-menu');
        const rootOptions = [...el.querySelectorAll(':scope > auro-menu > auro-menuoption')];

        // Navigate down to the first nested option (option a)
        rootMenu.navigateOptions('down');
        await elementUpdated(rootMenu);
        rootMenu.navigateOptions('down');
        await elementUpdated(rootMenu);

        // ArrowUp should go back to option 1 (root)
        rootMenu.navigateOptions('up');
        await elementUpdated(rootMenu);

        expect(rootMenu.optionActive).to.equal(rootOptions[0]);
      });

      it('should wrap to the last option from the top of a nested menu', async () => {
        const el = await nestedMenuFixture();
        const rootMenu = el.querySelector('auro-menu');
        const allOptions = [...el.querySelectorAll('auro-menuoption')];

        // ArrowUp with no active option wraps to the last option
        rootMenu.navigateOptions('up');
        await elementUpdated(rootMenu);

        expect(rootMenu.optionActive).to.equal(allOptions[allOptions.length - 1]);
      });
    });
  });

  describe('auro-menu-utils', () => {
    it('arraysAreEqual should return true for identical arrays', () => {
      expect(arraysAreEqual([
        1,
        2,
        3
      ], [
        1,
        2,
        3
      ])).to.be.true;
    });

    it('arraysAreEqual should return false for different arrays', () => {
      expect(arraysAreEqual([
        1,
        2
      ], [
        1,
        3
      ])).to.be.false;
    });

    it('arraysAreEqual should return false for different lengths', () => {
      expect(arraysAreEqual([
        1,
        2
      ], [
        1,
        2,
        3
      ])).to.be.false;
    });

    it('arraysAreEqual should return true when both undefined', () => {
      expect(arraysAreEqual(undefined, undefined)).to.be.true;
    });

    it('arraysAreEqual should return false when one undefined', () => {
      expect(arraysAreEqual([1], undefined)).to.be.false;
    });

    it('isOptionInteractive should return true for enabled visible option', () => {
      const opt = document.createElement('auro-menuoption');
      expect(isOptionInteractive(opt)).to.be.true;
    });

    it('isOptionInteractive should return false for hidden option', () => {
      const opt = document.createElement('auro-menuoption');
      opt.setAttribute('hidden', '');
      expect(isOptionInteractive(opt)).to.be.false;
    });

    it('isOptionInteractive should return false for disabled option', () => {
      const opt = document.createElement('auro-menuoption');
      opt.setAttribute('disabled', '');
      expect(isOptionInteractive(opt)).to.be.false;
    });

    it('isOptionInteractive should return false for static option', () => {
      const opt = document.createElement('auro-menuoption');
      opt.setAttribute('static', '');
      expect(isOptionInteractive(opt)).to.be.false;
    });
  });

  describe('Public API coverage', () => {
    it('selectByValue should clear selection for empty string', async () => {
      const el = await defaultFixture();
      const menu = el.querySelector('auro-menu');
      await elementUpdated(menu);

      menu.selectByValue('');
      await elementUpdated(menu);
      expect(menu.value).to.be.undefined;
    });

    it('selectByValue should clear selection for null', async () => {
      const el = await defaultFixture();
      const menu = el.querySelector('auro-menu');
      await elementUpdated(menu);

      menu.selectByValue(null);
      await elementUpdated(menu);
      expect(menu.value).to.be.undefined;
    });

    it('selectByValue should clear selection for empty array', async () => {
      const el = await defaultFixture();
      const menu = el.querySelector('auro-menu');
      await elementUpdated(menu);

      menu.selectByValue([]);
      await elementUpdated(menu);
      expect(menu.value).to.be.undefined;
    });

    it('selectByValue should select a matching option', async () => {
      const el = await defaultFixture();
      const menu = el.querySelector('auro-menu');
      await elementUpdated(menu);

      menu.selectByValue('option 2');
      await elementUpdated(menu);
      expect(menu.value).to.equal('option 2');
    });

    it('selectByValue should not throw when no matching option exists', async () => {
      const el = await defaultFixture();
      const menu = el.querySelector('auro-menu');
      await elementUpdated(menu);

      expect(() => menu.selectByValue('non-existent')).to.not.throw();
    });

    it('value should be undefined before any selection', async () => {
      const el = await defaultFixture();
      const menu = el.querySelector('auro-menu');
      await elementUpdated(menu);

      expect(menu.value).to.be.undefined;
    });

    it('isOptionSelected should return false when no selection', async () => {
      const el = await defaultFixture();
      const menu = el.querySelector('auro-menu');
      await elementUpdated(menu);

      const option = el.querySelector('auro-menuoption');
      expect(menu.isOptionSelected(option)).to.be.false;
    });

    it('isOptionSelected should return true for selected option', async () => {
      const el = await defaultFixture();
      const menu = el.querySelector('auro-menu');
      await elementUpdated(menu);

      const option = el.querySelector('auro-menuoption');
      menu.optionSelected = option;

      expect(menu.isOptionSelected(option)).to.be.true;
    });

    it('isOptionSelected should check array in multiSelect mode', async () => {
      const el = await multiSelectFixture();
      const menu = el.querySelector('auro-menu');
      await elementUpdated(menu);

      const options = [...el.querySelectorAll('auro-menuoption')];
      menu.optionSelected = [options[0]];
      menu.multiSelect = true;

      expect(menu.isOptionSelected(options[0])).to.be.true;
      expect(menu.isOptionSelected(options[1])).to.be.false;
    });

    it('handleCustomEvent should dispatch auroMenu-customEventFired', async () => {
      const el = await customEventFixture();
      const menu = el.querySelector('auro-menu');
      await elementUpdated(menu);

      const option = el.querySelector('auro-menuoption[event]');
      const listener = oneEvent(menu, 'auroMenu-customEventFired');
      menu.handleCustomEvent(option);

      const event = await listener;
      expect(event).to.exist;
    });

    it('clearSelection should reset optionSelected and value', async () => {
      const el = await defaultFixture();
      const menu = el.querySelector('auro-menu');
      await elementUpdated(menu);

      menu.optionSelected = 'something';
      menu.value = 'some value';
      menu.clearSelection();

      expect(menu.optionSelected).to.be.undefined;
      expect(menu.value).to.be.undefined;
    });

    it('reset should not throw, clear value, and fire auroMenu-selectValueReset', async () => {
      const el = await defaultFixture();
      const menu = el.querySelector('auro-menu');
      await elementUpdated(menu);

      menu.value = 'option 1';
      await elementUpdated(menu);

      const listener = oneEvent(menu, 'auroMenu-selectValueReset');
      expect(() => menu.reset()).to.not.throw();

      const event = await listener;
      expect(event).to.exist;
      expect(menu.value).to.be.undefined;
    });

    it('auroMenu-selectValueReset should have no detail payload', async () => {
      const el = await defaultFixture();
      const menu = el.querySelector('auro-menu');
      await elementUpdated(menu);

      menu.value = 'option 1';
      await elementUpdated(menu);

      const listener = oneEvent(menu, 'auroMenu-selectValueReset');
      menu.reset();

      const event = await listener;
      expect(event.detail).to.be.null;
    });

    it('updateActiveOption should not throw', async () => {
      const el = await defaultFixture();
      const menu = el.querySelector('auro-menu');
      await elementUpdated(menu);

      const option = el.querySelector('auro-menuoption');
      expect(() => menu.updateActiveOption(option)).to.not.throw();
    });

    it('makeSelection should not throw and should fire auroMenu-selectedOption', async () => {
      const el = await defaultFixture();
      const menu = el.querySelector('auro-menu');
      await elementUpdated(menu);

      menu.navigateOptions('down');
      await elementUpdated(menu);

      const listener = oneEvent(menu, 'auroMenu-selectedOption');
      expect(() => menu.makeSelection()).to.not.throw();

      const event = await listener;
      expect(event).to.exist;
    });

    it('auroMenu-selectValueFailure should fire without a detail payload', async () => {
      const el = await defaultFixture();
      const menu = el.querySelector('auro-menu');
      await elementUpdated(menu);

      const listener = oneEvent(menu, 'auroMenu-selectValueFailure');
      menu.value = 'non-existent-value';
      await elementUpdated(menu);

      const event = await listener;
      expect(event).to.exist;
      expect(event.detail).to.be.null;
    });

    it('auroMenu-activatedOption should fire with the option element as detail', async () => {
      const el = await defaultFixture();
      const menu = el.querySelector('auro-menu');
      await elementUpdated(menu);

      const listener = oneEvent(menu, 'auroMenu-activatedOption');
      menu.navigateOptions('down');

      const event = await listener;
      expect(event).to.exist;
      expect(event.detail).to.be.an.instanceOf(HTMLElement);
    });

    it('auroMenu-selectedOption should include only source in detail', async () => {
      const el = await defaultFixture();
      const menu = el.querySelector('auro-menu');
      await elementUpdated(menu);

      const listener = oneEvent(menu, 'auroMenu-selectedOption');
      menu.navigateOptions('down');
      await elementUpdated(menu);
      menu.makeSelection();

      const event = await listener;
      expect(event.detail).to.deep.equal({ source: undefined });
    });

    it('auroMenu-loadingChange should include hasLoadingPlaceholder', async () => {
      const el = await fixture(html`
        <auro-menu>
          <span slot="loadingText">Loading...</span>
          <auro-menuoption value="one">One</auro-menuoption>
        </auro-menu>
      `);
      await elementUpdated(el);

      const listener = oneEvent(el, 'auroMenu-loadingChange');
      el.loading = true;
      await elementUpdated(el);

      const event = await listener;
      expect(event).to.exist;
      expect(event.detail).to.have.property('loading', true);
      expect(event.detail).to.have.property('hasLoadingPlaceholder');
    });
  });

  describe('Dynamic option lifecycle', () => {
    it('should handle removing a menuoption without errors', async () => {
      const el = await defaultFixture();
      const menu = el.querySelector('auro-menu');
      await elementUpdated(menu);

      const option = menu.querySelector('auro-menuoption');
      option.remove();
      await elementUpdated(menu);

      expect(() => menu.navigateOptions('down')).to.not.throw();
    });

    it('should handle replacing a menuoption in the slot', async () => {
      const el = await defaultFixture();
      const menu = el.querySelector('auro-menu');
      await elementUpdated(menu);

      const oldOption = menu.querySelector('auro-menuoption');
      const newOption = document.createElement('auro-menuoption');
      newOption.value = 'replacement';
      newOption.textContent = 'Replacement';

      menu.replaceChild(newOption, oldOption);
      await elementUpdated(menu);

      expect(() => menu.navigateOptions('down')).to.not.throw();
      expect(menu.querySelector('auro-menuoption[value="replacement"]')).to.exist;
    });
  });

  describe('size/shape propagation', () => {
    it('should propagate size and shape from menu to menuoptions that have neither set', async () => {
      const el = await fixture(html`
        <auro-menu size="md" shape="rounded" aria-label="test">
          <auro-menuoption value="opt1">Opt 1</auro-menuoption>
          <auro-menuoption value="opt2">Opt 2</auro-menuoption>
        </auro-menu>
      `);
      await elementUpdated(el);

      const options = el.querySelectorAll('auro-menuoption');
      options.forEach((opt) => {
        expect(opt.getAttribute('size')).to.equal('md');
        expect(opt.getAttribute('shape')).to.equal('rounded');
      });
    });

    it('should not override size/shape on a menuoption that already has them set', async () => {
      const el = await fixture(html`
        <auro-menu size="md" shape="rounded" aria-label="test">
          <auro-menuoption value="opt1" size="lg" shape="pill">Opt 1</auro-menuoption>
          <auro-menuoption value="opt2">Opt 2</auro-menuoption>
        </auro-menu>
      `);
      await elementUpdated(el);

      const [explicit, inherited] = el.querySelectorAll('auro-menuoption');

      // Author-set values are preserved
      expect(explicit.getAttribute('size')).to.equal('lg');
      expect(explicit.getAttribute('shape')).to.equal('pill');

      // Siblings without explicit values still inherit from the menu
      expect(inherited.getAttribute('size')).to.equal('md');
      expect(inherited.getAttribute('shape')).to.equal('rounded');

      // Subsequent menu-level changes still skip the explicit option
      el.size = 'xl';
      el.shape = 'box';
      await elementUpdated(el);

      expect(explicit.getAttribute('size')).to.equal('lg');
      expect(explicit.getAttribute('shape')).to.equal('pill');
      expect(inherited.getAttribute('size')).to.equal('xl');
      expect(inherited.getAttribute('shape')).to.equal('box');
    });
  });

  describe('noCheckmark property propagation', () => {
    it('should propagate noCheckmark to child options when set via property', async () => {
      const el = await fixture(html`
        <auro-menu aria-label="test">
          <auro-menuoption value="opt1">Opt 1</auro-menuoption>
          <auro-menuoption value="opt2">Opt 2</auro-menuoption>
        </auro-menu>
      `);
      await elementUpdated(el);

      el.noCheckmark = true;
      await elementUpdated(el);

      expect(el.noCheckmark).to.be.true;
    });

    it('should propagate noCheckmark=false to nested options after toggling back', async () => {
      const el = await fixture(html`
        <auro-menu aria-label="test">
          <auro-menuoption value="opt1">Opt 1</auro-menuoption>
          <auro-menuoption value="opt2">Opt 2</auro-menuoption>
        </auro-menu>
      `);
      await elementUpdated(el);

      el.noCheckmark = true;
      await elementUpdated(el);
      const options = el.querySelectorAll('auro-menuoption');
      expect(options[0].noCheckmark).to.be.true;

      el.noCheckmark = false;
      await elementUpdated(el);

      expect(options[0].noCheckmark).to.be.false;
      expect(options[1].noCheckmark).to.be.false;
    });
  });

  describe('Regression: bug fixes', () => {
    describe('matchWord XSS safety', () => {
      it('should render literal HTML in option text without injecting elements', async () => {
        const el = await fixture(html`
          <auro-menu matchword="foo" aria-label="test">
            <auro-menuoption value="bad">&lt;img src=x onerror=alert(1)&gt;foo</auro-menuoption>
          </auro-menu>
        `);
        await elementUpdated(el);

        const option = el.querySelector('auro-menuoption');
        // No injected <img> from option text content.
        expect(option.querySelector('img')).to.be.null;
        // The literal text should still be present in textContent.
        expect(option.textContent).to.contain('<img');
        expect(option.textContent).to.contain('onerror=alert(1)');
        // The match itself should still be highlighted via DOM (not innerHTML).
        const strong = option.querySelector('strong');
        expect(strong).to.not.be.null;
        expect(strong.textContent).to.equal('foo');
      });
    });

    describe('selectByValue with raw Array', () => {
      it('should JSON-stringify an Array assigned via selectByValue and reflect attribute', async () => {
        const el = await multiSelectFixture();
        const menuEl = el.querySelector('auro-menu');
        await elementUpdated(menuEl);

        menuEl.selectByValue(['option1', 'option3']);
        await elementUpdated(menuEl);

        expect(menuEl.value).to.equal('["option1","option3"]');
        expect(menuEl.getAttribute('value')).to.equal('["option1","option3"]');
        expect(menuEl.formattedValue).to.eql(['option1', 'option3']);
      });
    });

    describe('formattedValue defensive parsing (multiSelect)', () => {
      it('should coerce a non-string value to a single-item array without throwing', async () => {
        const el = await multiSelectFixture();
        const menuEl = el.querySelector('auro-menu');
        await elementUpdated(menuEl);

        // Assign a number directly to the String-typed property; should not throw.
        menuEl.value = 42;
        await elementUpdated(menuEl);

        expect(() => menuEl.formattedValue).to.not.throw();
        expect(menuEl.formattedValue).to.eql(['42']);
      });

      it('should fall back to a single-item array when value looks like JSON but is malformed', async () => {
        const el = await multiSelectFixture();
        const menuEl = el.querySelector('auro-menu');
        await elementUpdated(menuEl);

        menuEl.value = '[abc';
        await elementUpdated(menuEl);

        expect(() => menuEl.formattedValue).to.not.throw();
        expect(menuEl.formattedValue).to.eql(['[abc']);
      });

      it('should return the Array directly when value is an Array (not a JSON string)', async () => {
        const el = await multiSelectFixture();
        const menuEl = el.querySelector('auro-menu');
        await elementUpdated(menuEl);

        menuEl.value = ['option1', 'option3'];
        await elementUpdated(menuEl);

        expect(() => menuEl.formattedValue).to.not.throw();
        expect(menuEl.formattedValue).to.eql(['option1', 'option3']);
      });
    });

    describe('items initialization before value matching', () => {
      it('should not fire auroMenu-selectValueFailure when items get appended after value is set', async () => {
        const menu = document.createElement('auro-menu');
        menu.setAttribute('aria-label', 'test');
        document.body.appendChild(menu);
        await elementUpdated(menu);

        // After init with no children, items is undefined.
        expect(menu.items).to.be.undefined;

        const opt = document.createElement('auro-menuoption');
        opt.value = 'late';
        opt.textContent = 'Late';
        menu.appendChild(opt);

        let failureFired = false;
        const handler = () => {
          failureFired = true;
        };
        menu.addEventListener('auroMenu-selectValueFailure', handler);

        menu.value = 'late';
        await elementUpdated(menu);

        menu.removeEventListener('auroMenu-selectValueFailure', handler);
        document.body.removeChild(menu);

        expect(failureFired).to.be.false;
      });
    });

    describe('single auroMenu-selectedOption per selection', () => {
      it('should fire exactly one auroMenu-selectedOption event for a single click', async () => {
        const el = await defaultFixture();
        const menuEl = el.querySelector('auro-menu');
        await elementUpdated(menuEl);

        let count = 0;
        menuEl.addEventListener('auroMenu-selectedOption', () => {
          count += 1;
        });

        const option = menuEl.querySelector('auro-menuoption[value="option 1"]');
        option.click();
        await elementUpdated(menuEl);

        expect(count).to.equal(1);
      });

      it('should fire exactly one auroMenu-selectedOption event when re-clicking the already-selected option in single-select', async () => {
        const el = await defaultFixture();
        const menuEl = el.querySelector('auro-menu');
        await elementUpdated(menuEl);

        const option = menuEl.querySelector('auro-menuoption[value="option 1"]');
        option.click();
        await elementUpdated(menuEl);

        let count = 0;
        menuEl.addEventListener('auroMenu-selectedOption', () => {
          count += 1;
        });

        option.click();
        await elementUpdated(menuEl);

        expect(count).to.equal(1);
      });
    });

    describe('Tab keydown does not preventDefault', () => {
      it('should allow Tab to move focus out of the menu', async () => {
        const el = await defaultFixture();
        const menuEl = el.querySelector('auro-menu');
        await elementUpdated(menuEl);

        const tabEvent = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
        menuEl.dispatchEvent(tabEvent);

        expect(tabEvent.defaultPrevented).to.be.false;
      });

      it('should preventDefault on ArrowDown, ArrowUp, and Enter', async () => {
        const el = await defaultFixture();
        const menuEl = el.querySelector('auro-menu');
        await elementUpdated(menuEl);

        for (const key of ['ArrowDown', 'ArrowUp', 'Enter']) {
          const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });
          menuEl.dispatchEvent(event);
          expect(event.defaultPrevented, `${key} should preventDefault`).to.be.true;
        }
      });
    });
  });

  describe('auro-menuoption coverage', () => {
    it('handleMenuChange should ignore events without type or property', async () => {
      const el = await defaultFixture();
      const option = el.querySelector('auro-menuoption');
      await elementUpdated(option);

      // Should not throw
      option.handleMenuChange({});
      option.handleMenuChange(null);
    });

    it('setSelected should update selected property', async () => {
      const el = await defaultFixture();
      const option = el.querySelector('auro-menuoption');
      await elementUpdated(option);

      option.setSelected(true);
      expect(option.selected).to.be.true;
      option.setSelected(false);
      expect(option.selected).to.be.false;
    });

    it('updateActive should set active state and update classes', async () => {
      const el = await defaultFixture();
      const option = el.querySelector('auro-menuoption');
      await elementUpdated(option);

      option.updateActive(true);
      expect(option.active).to.be.true;
      expect(option.classList.contains('active')).to.be.true;

      option.updateActive(false);
      expect(option.active).to.be.false;
      expect(option.classList.contains('active')).to.be.false;
    });

    it('attachTo should do nothing when service is null', async () => {
      const el = await defaultFixture();
      const option = el.querySelector('auro-menuoption');
      await elementUpdated(option);

      // Should not throw
      option.attachTo(null);
    });

    it('disabled property should set aria-disabled', async () => {
      const el = await defaultFixture();
      const option = el.querySelector('auro-menuoption');
      await elementUpdated(option);

      option.disabled = true;
      await elementUpdated(option);
      expect(option.getAttribute('aria-disabled')).to.equal('true');

      option.disabled = false;
      await elementUpdated(option);
      expect(option.hasAttribute('aria-disabled')).to.be.false;
    });
  });
}

// Desktop Test Suite
describe('auro-menu', () => {
  runFullTest(false);
});

// Mobile Test Suite
describe('auro-menu in small viewport', () => {
  runFullTest(true);
});

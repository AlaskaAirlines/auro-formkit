/* eslint-disable max-lines, no-undef, no-magic-numbers, no-unused-expressions, no-console, no-plusplus, no-await-in-loop, init-declarations */

import { fixture, html, expect, oneEvent, elementUpdated } from '@open-wc/testing';
import '../src/registered.js';
import { arrayConverter } from '../src/auro-menu-utils.js';
import {
  defaultFixture,
  multiSelectDuplicateValuesFixture,
  multiSelectDuplicateValuesSelectAllFixture,
  noninteractiveOptionsFixture,
  nestedMenuFixture,
  customEventFixture,
  emptyItemsFixture,
  multiSelectFixture,
} from './testFixtures.js';
import { getOptions } from './testFunctions.js';

describe('auro-menu', () => {

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
  });

  describe('User Stories', () => {
    // Add missing tests

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

      it('should only select the first matching option when duplicates exist and selectAllMatchingOptions is not set', async () => {
        const menu = await multiSelectDuplicateValuesFixture();
        await elementUpdated(menu);
        const {options} = menu;

        // Set value that matches multiple options
        menu.value = 'option 2';
        await elementUpdated(menu);

        // Verify only the first matching option is selected
        expect(options[1].hasAttribute('selected')).to.be.true;
        expect(options[4].hasAttribute('selected')).to.be.false;
      });

      it('should select all matching options when duplicates exist and selectAllMatchingOptions is set', async () => {
        const menu = await multiSelectDuplicateValuesSelectAllFixture();
        await elementUpdated(menu);
        const {options} = menu;

        // Set value that matches multiple options
        menu.value = 'option 2';
        await elementUpdated(menu);

        // Verify all matching options are selected
        expect(options[1].hasAttribute('selected')).to.be.true;
        expect(options[4].hasAttribute('selected')).to.be.true;
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

      // Verify selection persists in single-select
      it('should not allow deselection of a selected option in single-select mode without allowDeselect set', async () => {
        const el = await defaultFixture();
        const menu = el.querySelector('auro-menu');

        // Select first option
        menu.navigateOptions('down');
        await elementUpdated(menu);

        menu.makeSelection();
        await elementUpdated(menu);

        // Verify selection results in array
        expect(menu.value).to.eql('option 1');

        // Try to deselect by clicking again
        menu.makeSelection();
        await elementUpdated(menu);

        // Selection should persist
        expect(menu.value).to.eql('option 1');
      });

      it('should allow deselection of a selected option in single-select mode with allowDeselect set', async () => {
        const el = await defaultFixture();
        const menu = el.querySelector('auro-menu');
        menu.allowDeselect = true;
        await elementUpdated(menu);

        menu.value = 'option 1';
        await elementUpdated(menu);

        // Verify selection
        expect(menu.value).to.eql('option 1');

        // Deselect by clicking again
        menu.navigateOptions('down');
        menu.makeSelection();
        await elementUpdated(menu);

        // Should be undefined after deselection
        expect(menu.value).to.equal(undefined);
        expect(menu.optionSelected).to.equal(undefined);
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

      const selectedOption = options.find(opt => opt.classList.contains('active'));
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
  });

  describe('Properties', () => {
    describe('allowDeselect', () => {
      // add tests for this property
    });

    describe('disabled', () => {
      it('should not allow selection of a disabled menu option', async () => {
        const el = await customEventFixture();
        const menuEl = el.querySelector('auro-menu');
        menuEl.setAttribute('disabled', '');

        expect(menuEl.disabled).to.be.true;
      });
    });

    describe('hasLoadingPlaceholder', () => {
      // add tests for this property
    });

    describe('layout', () => {
      // add tests for this property
    });

    describe('loading', () => {
      // add tests for this property
    });

    describe('matchWord', () => {
      it('should correctly match options using the matchWord feature', async () => {
        const el = await customEventFixture();
        const menuEl = el.querySelector('auro-menu');
        expect(menuEl.innerHTML.includes('<strong')).to.be.true;
      });
    });

    describe('multiSelect', () => {
      // add tests for this property
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
      // add tests for this property
    });

    describe('optionActive', () => {
      // add tests for this property
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

    describe('selectAllMatchingOptions', () => {
      // add tests for this property
    });

    describe('shape', () => {
      // add tests for this property
    });

    describe('size', () => {
      // add tests for this property
    });

    describe('value', () => {
      // add tests for this property
    });

    describe('options', () => {
      // add tests for this property
    });

    describe('currentLabel', () => {
      // add tests for this property
    });

    describe('items', () => {
      // add tests for this property
    });

    describe('index', () => {
      // add tests for this property
    });

    describe('selectedOptions', () => {
      // add tests for this property
    });

    describe('selectedOption', () => {
      // add tests for this property
    });
  });

  describe('Slots', () => {
    describe('default', () => {
      it('should render content in the default slot', async () => {
        const el = await defaultFixture();

        const menu = el.querySelector('auro-menu');
        const slot = menu.shadowRoot.querySelector('slot:not([name])');

        await expect(slot).to.exist;
        const assigned = slot.assignedNodes().filter((n) => n.nodeType === Node.ELEMENT_NODE);

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
      // TODO: test needs to be added
    });

    describe('updateActiveOption', () => {
      // TODO: test needs to be added
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
      // TODO: test needs to be added
    });

    describe('resetLayoutClasses', () => {
      // TODO: test needs to be added
    });

    describe('updateComponentArchitecture', () => {
      // TODO: test needs to be added
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

});

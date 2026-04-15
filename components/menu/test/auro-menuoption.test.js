/* eslint-disable no-undef, no-unused-expressions */

import { fixture, html, expect, elementUpdated, oneEvent } from '@open-wc/testing';
import { setViewport } from '@web/test-runner-commands';
import designTokens from '@aurodesignsystem/design-tokens/dist/legacy/auro-classic/JSONVariablesFlat.json' with { type: 'json' };
import '../src/registered.js';

const mobileBreakpointWidth = parseInt(designTokens['ds-grid-breakpoint-sm'], 10) - 1;

/**
 * Runs the full menuoption test suite for a given viewport mode.
 * @param {boolean} mobileView - Whether tests should run in small or large viewport mode.
 * @returns {void}
 */
function runFullTest(mobileView) {
  before(async () => {
    await setViewport(mobileView ? { width: mobileBreakpointWidth, height: 800 } : { width: 800, height: 800 });
  });

  describe('Rendering', () => {
    it('should be defined as a custom element', async () => {
      const el = await Boolean(customElements.get("auro-menuoption"));

      await expect(el).to.be.true;
    });
  });

  describe('User Stories', () => {
    it('should select an option when clicked', async () => {
      const el = await fixture(html`
        <auro-menu>
          <auro-menuoption value="one">One</auro-menuoption>
          <auro-menuoption value="two">Two</auro-menuoption>
        </auro-menu>
      `);
      await elementUpdated(el);

      const option = el.querySelector('auro-menuoption[value="one"]');
      option.click();
      await elementUpdated(el);

      expect(option.selected).to.be.true;
    });
  });

  describe('Properties', () => {
    describe('disabled', () => {
      it('should default to false', async () => {
        const el = await fixture(html`<auro-menu><auro-menuoption value="one">One</auro-menuoption></auro-menu>`);
        const option = el.querySelector('auro-menuoption');

        expect(option.disabled).to.be.false;
      });

      it('should set aria-disabled when disabled', async () => {
        const el = await fixture(html`<auro-menu><auro-menuoption value="one" disabled>One</auro-menuoption></auro-menu>`);
        const option = el.querySelector('auro-menuoption');

        expect(option.getAttribute('aria-disabled')).to.equal('true');
      });

      it('should not select on click when disabled', async () => {
        const el = await fixture(html`<auro-menu><auro-menuoption value="one" disabled>One</auro-menuoption></auro-menu>`);
        await elementUpdated(el);
        const option = el.querySelector('auro-menuoption');

        option.click();
        await elementUpdated(el);

        expect(option.selected).to.be.false;
      });
    });

    describe('key', () => {
      it('should default to the value when not explicitly set', async () => {
        const el = await fixture(html`<auro-menu><auro-menuoption value="one">One</auro-menuoption></auro-menu>`);
        await elementUpdated(el);
        const option = el.querySelector('auro-menuoption');

        expect(option.key).to.equal('one');
      });

      it('should use explicit key when provided', async () => {
        const el = await fixture(html`<auro-menu><auro-menuoption value="one" key="custom-key">One</auro-menuoption></auro-menu>`);
        await elementUpdated(el);
        const option = el.querySelector('auro-menuoption');

        expect(option.key).to.equal('custom-key');
      });
    });

    describe('selected', () => {
      it('should default to false', async () => {
        const el = await fixture(html`<auro-menu><auro-menuoption value="one">One</auro-menuoption></auro-menu>`);
        const option = el.querySelector('auro-menuoption');

        expect(option.selected).to.be.false;
      });

      it('should set aria-selected to true when selected', async () => {
        const el = await fixture(html`<auro-menu><auro-menuoption value="one">One</auro-menuoption></auro-menu>`);
        await elementUpdated(el);
        const option = el.querySelector('auro-menuoption');

        option.click();
        await elementUpdated(option);

        expect(option.getAttribute('aria-selected')).to.equal('true');
      });
    });

    describe('tabIndex', () => {
      it('should have a tabIndex property', async () => {
        const el = await fixture(html`<auro-menu><auro-menuoption value="one">One</auro-menuoption></auro-menu>`);
        const option = el.querySelector('auro-menuoption');

        expect(option).to.have.property('tabIndex');
      });
    });

    describe('value', () => {
      it('should accept a value property', async () => {
        const el = await fixture(html`<auro-menu><auro-menuoption value="test-value">Test</auro-menuoption></auro-menu>`);
        const option = el.querySelector('auro-menuoption');

        expect(option.value).to.equal('test-value');
      });

      it('should reflect the value attribute', async () => {
        const el = await fixture(html`<auro-menu><auro-menuoption value="test-value">Test</auro-menuoption></auro-menu>`);
        const option = el.querySelector('auro-menuoption');

        expect(option.getAttribute('value')).to.equal('test-value');
      });
    });
  });

  describe('Slots', () => {
    describe('default', () => {
      it('should render content in the default slot', async () => {
        const el = await fixture(html`<auro-menu><auro-menuoption value="one">Option Text</auro-menuoption></auro-menu>`);
        const option = el.querySelector('auro-menuoption');

        expect(option.textContent.trim()).to.equal('Option Text');
      });
    });
  });

  describe('Public Functions', () => {
    describe('register', () => {
      it('should register the custom element', () => {
        const registeredTag = customElements.get('auro-menuoption');

        expect(registeredTag).to.not.be.undefined;
      });
    });

    describe('isActive', () => {
      it('should return true for a normal visible option', async () => {
        const el = await fixture(html`<auro-menu><auro-menuoption value="one">One</auro-menuoption></auro-menu>`);
        const option = el.querySelector('auro-menuoption');

        expect(option.isActive).to.be.true;
      });

      it('should return false for a disabled option', async () => {
        const el = await fixture(html`<auro-menu><auro-menuoption value="one" disabled>One</auro-menuoption></auro-menu>`);
        const option = el.querySelector('auro-menuoption');

        expect(option.isActive).to.be.false;
      });

      it('should return false for a hidden option', async () => {
        const el = await fixture(html`<auro-menu><auro-menuoption value="one" hidden>One</auro-menuoption></auro-menu>`);
        const option = el.querySelector('auro-menuoption');

        expect(option.isActive).to.be.false;
      });

      it('should return false for a static option', async () => {
        const el = await fixture(html`<auro-menu><auro-menuoption value="one" static>One</auro-menuoption></auro-menu>`);
        const option = el.querySelector('auro-menuoption');

        expect(option.isActive).to.be.false;
      });
    });
  });

  describe('Events', () => {
    describe('auroMenuOption-mouseover', () => {
      it('should fire on mouseover', async () => {
        const el = await fixture(html`<auro-menu><auro-menuoption value="one">One</auro-menuoption></auro-menu>`);
        await elementUpdated(el);
        const option = el.querySelector('auro-menuoption');

        const listener = oneEvent(option, 'auroMenuOption-mouseover');
        option.dispatchEvent(new MouseEvent('mouseover', {
          bubbles: true,
          composed: true
        }));

        const event = await listener;
        expect(event).to.exist;
      });
    });

    describe('auroMenuOption-click', () => {
      it('should fire when option is clicked', async () => {
        const el = await fixture(html`<auro-menu><auro-menuoption value="one">One</auro-menuoption></auro-menu>`);
        await elementUpdated(el);
        const option = el.querySelector('auro-menuoption');

        const listener = oneEvent(option, 'auroMenuOption-click');
        option.click();

        const event = await listener;
        expect(event).to.exist;
      });

      it('should not fire when disabled option is clicked', async () => {
        const el = await fixture(html`<auro-menu><auro-menuoption value="one" disabled>One</auro-menuoption></auro-menu>`);
        await elementUpdated(el);
        const option = el.querySelector('auro-menuoption');

        let fired = false;
        option.addEventListener('auroMenuOption-click', () => {
          fired = true;
        });
        option.click();
        await elementUpdated(el);

        expect(fired).to.be.false;
      });
    });
  });

  describe('Private Functions', () => {
    // No private function tests
  });

  describe('A11Y', () => {
    it('should be accessible', async () => {
      const el = await fixture(html`
        <div>
          <span id="menu-label">Options</span>
          <auro-menu aria-labelledby="menu-label">
            <auro-menuoption value="one">One</auro-menuoption>
          </auro-menu>
        </div>
      `);

      await elementUpdated(el);

      await expect(el).to.be.accessible();
    });
  });

  describe('Mouse Behavior', () => {
    describe('Click', () => {
      it('should toggle selection on click', async () => {
        const el = await fixture(html`
          <auro-menu allowDeselect>
            <auro-menuoption value="one">One</auro-menuoption>
          </auro-menu>
        `);
        await elementUpdated(el);
        const option = el.querySelector('auro-menuoption');

        option.click();
        await elementUpdated(option);
        expect(option.selected).to.be.true;

        option.click();
        await elementUpdated(option);
        expect(option.selected).to.be.false;
      });
    });
  });

  describe('Keyboard Behavior', () => {
    it('should have role option for keyboard navigation', async () => {
      const el = await fixture(html`<auro-menu><auro-menuoption value="one">One</auro-menuoption></auro-menu>`);
      const option = el.querySelector('auro-menuoption');

      expect(option.getAttribute('role')).to.equal('option');
    });
  });
}

// Desktop Test Suite
describe('auro-menuoption', () => {
  runFullTest(false);
});

// Mobile Test Suite
describe('auro-menuoption in small viewport', () => {
  runFullTest(true);
});

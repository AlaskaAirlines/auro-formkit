/* eslint-disable max-lines, no-undef, no-unused-expressions, no-confusing-arrow */

import { fixture, html, expect, elementUpdated } from '@open-wc/testing';
import { setViewport } from '@web/test-runner-commands';
import designTokens from '@aurodesignsystem/design-tokens/dist/legacy/auro-classic/JSONVariablesFlat.json' with { type: 'json' };
import '../src/registered.js';

const mobileBreakpointWidth = parseInt(designTokens['ds-grid-breakpoint-sm'], 10) - 1;

/**
 * Runs the full helptext test suite for a given viewport mode.
 * @param {boolean} mobileView - Whether tests should run in small or large viewport mode.
 * @returns {void}
 */
function runFullTest(mobileView) {
  before(async () => {
    await setViewport(mobileView ? { width: mobileBreakpointWidth, height: 800 } : { width: 800, height: 800 });
  });

  describe('Rendering', () => {
    it('should be defined as a custom element', async () => {
      const el = await Boolean(customElements.get("auro-helptext"));

      await expect(el).to.be.true;
    });

    it('should render a shadow root', async () => {
      const el = await fixture(html`<auro-helptext>Help</auro-helptext>`);

      expect(el.shadowRoot).to.exist;
    });

    it('should render a helptext-wrapper div', async () => {
      const el = await fixture(html`<auro-helptext>Help</auro-helptext>`);

      const wrapper = el.shadowRoot.querySelector('.helptext-wrapper');
      expect(wrapper).to.exist;
    });

    it('should set visible attribute on wrapper when slot has text content', async () => {
      const el = await fixture(html`<auro-helptext>Help text here</auro-helptext>`);
      await elementUpdated(el);

      const wrapper = el.shadowRoot.querySelector('.helptext-wrapper');
      expect(wrapper.hasAttribute('visible')).to.be.true;
    });

    it('should not set visible attribute on wrapper when slot is empty', async () => {
      const el = await fixture(html`<auro-helptext></auro-helptext>`);
      await elementUpdated(el);

      const wrapper = el.shadowRoot.querySelector('.helptext-wrapper');
      expect(wrapper.hasAttribute('visible')).to.be.false;
    });
  });

  describe('User Stories', () => {
    it('should display help text to the user', async () => {
      const el = await fixture(html`<auro-helptext>Fill in your name</auro-helptext>`);
      await elementUpdated(el);

      const slot = el.shadowRoot.querySelector('slot');
      const assigned = slot.assignedNodes().filter((node) => node.textContent.trim().length > 0);
      expect(assigned.length).to.be.greaterThan(0);
      expect(assigned[0].textContent).to.equal('Fill in your name');
    });

    it('should display error text when error is set', async () => {
      const el = await fixture(html`<auro-helptext error>This field is required</auro-helptext>`);
      await elementUpdated(el);

      expect(el.error).to.be.true;
      expect(el.hasTextContent).to.be.true;
    });
  });

  describe('Properties', () => {
    describe('appearance', () => {
      it('should default to "default"', async () => {
        const el = await fixture(html`<auro-helptext>Help</auro-helptext>`);

        expect(el.appearance).to.equal('default');
      });

      it('should reflect appearance attribute when set', async () => {
        const el = await fixture(html`<auro-helptext appearance="inverse">Help</auro-helptext>`);

        expect(el.getAttribute('appearance')).to.equal('inverse');
      });

      it('should update when changed programmatically', async () => {
        const el = await fixture(html`<auro-helptext>Help</auro-helptext>`);

        el.appearance = 'inverse';
        await elementUpdated(el);

        expect(el.getAttribute('appearance')).to.equal('inverse');
      });
    });

    describe('error', () => {
      it('should default to false', async () => {
        const el = await fixture(html`<auro-helptext>Help</auro-helptext>`);

        expect(el.error).to.be.false;
        expect(el.hasAttribute('error')).to.be.false;
      });

      it('should reflect the error attribute', async () => {
        const el = await fixture(html`<auro-helptext error>Help</auro-helptext>`);

        expect(el.error).to.be.true;
        expect(el.hasAttribute('error')).to.be.true;
      });

      it('should update when toggled programmatically', async () => {
        const el = await fixture(html`<auro-helptext>Help</auro-helptext>`);

        el.error = true;
        await elementUpdated(el);
        expect(el.hasAttribute('error')).to.be.true;

        el.error = false;
        await elementUpdated(el);
        expect(el.hasAttribute('error')).to.be.false;
      });
    });

    describe('onDark', () => {
      it('should default to false', async () => {
        const el = await fixture(html`<auro-helptext>Help</auro-helptext>`);

        expect(el.onDark).to.be.false;
      });

      it('should reflect the onDark attribute', async () => {
        const el = await fixture(html`<auro-helptext onDark>Help</auro-helptext>`);

        expect(el.onDark).to.be.true;
        expect(el.hasAttribute('ondark')).to.be.true;
      });
    });

    describe('hasTextContent', () => {
      it('should be true when slot has text', async () => {
        const el = await fixture(html`<auro-helptext>Some text</auro-helptext>`);
        await elementUpdated(el);

        expect(el.hasTextContent).to.be.true;
      });

      it('should be false when slot is empty', async () => {
        const el = await fixture(html`<auro-helptext></auro-helptext>`);
        await elementUpdated(el);

        expect(el.hasTextContent).to.be.false;
      });

      it('should be false when slot contains only whitespace', async () => {
        const el = await fixture(html`<auro-helptext>   </auro-helptext>`);
        await elementUpdated(el);

        expect(el.hasTextContent).to.be.false;
      });

      it('should update when slot content changes dynamically', async () => {
        const el = await fixture(html`<auro-helptext></auro-helptext>`);
        await elementUpdated(el);
        expect(el.hasTextContent).to.be.false;

        el.textContent = 'New help text';
        await elementUpdated(el);
        await new Promise((resolve) => setTimeout(resolve, 0));

        expect(el.hasTextContent).to.be.true;
      });
    });
  });

  describe('Slots', () => {
    describe('default', () => {
      it('should render content in the default slot', async () => {
        const el = await fixture(html`<auro-helptext>Help text</auro-helptext>`);

        const slot = el.shadowRoot.querySelector('slot');
        expect(slot).to.exist;
        const assigned = slot.assignedNodes().filter((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
        expect(assigned.length).to.be.greaterThan(0);
      });

      it('should render element content in the default slot', async () => {
        const el = await fixture(html`<auro-helptext><span>Styled help</span></auro-helptext>`);

        const slot = el.shadowRoot.querySelector('slot');
        const assigned = slot.assignedNodes().filter((node) => node.nodeType === Node.ELEMENT_NODE);
        expect(assigned.length).to.be.greaterThan(0);
        expect(assigned[0].textContent).to.equal('Styled help');
      });
    });
  });

  describe('Public Functions', () => {
    describe('register', () => {
      it('should have a static register method', () => {
        expect(typeof customElements.get('auro-helptext').register).to.equal('function');
      });
    });
  });

  describe('Events', () => {
    // No events dispatched by this component
  });

  describe('Private Functions', () => {
    describe('checkSlotsForContent', () => {
      it('should return false when given null/undefined nodes', async () => {
        const el = await fixture(html`<auro-helptext>Help</auro-helptext>`);

        expect(el.checkSlotsForContent(null)).to.be.false;
        expect(el.checkSlotsForContent(undefined)).to.be.false;
      });

      it('should return true when nodes contain text', async () => {
        const el = await fixture(html`<auro-helptext>Help</auro-helptext>`);
        const textNode = document.createTextNode('Some text');

        expect(el.checkSlotsForContent([textNode])).to.be.true;
      });

      it('should return false when nodes contain only empty text', async () => {
        const el = await fixture(html`<auro-helptext>Help</auro-helptext>`);
        const textNode = document.createTextNode('   ');

        expect(el.checkSlotsForContent([textNode])).to.be.false;
      });

      it('should return false for an element node with no text and no nested slot', async () => {
        const el = await fixture(html`<auro-helptext>Help</auro-helptext>`);
        const emptyDiv = document.createElement('div');

        expect(el.checkSlotsForContent([emptyDiv])).to.be.false;
      });

      it('should return false for node without querySelector (non-element with empty text)', async () => {
        const el = await fixture(html`<auro-helptext>Help</auro-helptext>`);
        // A processing instruction or comment with empty content
        const node = {
          textContent: '   ',
          querySelector: undefined
        };

        expect(el.checkSlotsForContent([node])).to.be.false;
      });

      it('should recurse into nested slot assignedNodes', async () => {
        const el = await fixture(html`<auro-helptext>Help</auro-helptext>`);

        // Mock a slot element with assignedNodes returning a text node with content
        const mockSlot = {
          textContent: '',
          tagName: 'SLOT',
          querySelector: () => null,
          assignedNodes: () => [document.createTextNode('nested content')]
        };

        expect(el.checkSlotsForContent([mockSlot])).to.be.true;
      });

      it('should recurse into slot found via querySelector', async () => {
        const el = await fixture(html`<auro-helptext>Help</auro-helptext>`);

        // Mock an element containing a nested slot
        const innerSlot = {
          assignedNodes: () => [document.createTextNode('deep content')]
        };
        const wrapperDiv = {
          textContent: '',
          tagName: 'DIV',
          querySelector: (sel) => sel === 'slot' ? innerSlot : null
        };

        expect(el.checkSlotsForContent([wrapperDiv])).to.be.true;
      });
    });
  });

  describe('A11Y', () => {
    it('should be accessible', async () => {
      const el = await fixture(html`
        <auro-helptext>Help text content</auro-helptext>
      `);

      await elementUpdated(el);

      await expect(el).to.be.accessible();
    });

    it('should be accessible with error state', async () => {
      const el = await fixture(html`
        <auro-helptext error>Error message</auro-helptext>
      `);

      await elementUpdated(el);

      await expect(el).to.be.accessible();
    });
  });

  describe('Mouse Behavior', () => {
    // No mouse behavior — display-only component
  });

  describe('Keyboard Behavior', () => {
    // No keyboard behavior — display-only component
  });
}

// Desktop Test Suite
describe('auro-helptext', () => {
  runFullTest(false);
});

// Mobile Test Suite
describe('auro-helptext in small viewport', () => {
  runFullTest(true);
});

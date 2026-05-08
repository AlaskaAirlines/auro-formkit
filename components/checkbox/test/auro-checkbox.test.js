/* eslint-disable max-statements */
/* eslint-disable no-console */
/* eslint-disable one-var */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-lines */
import { fixture, html, expect, elementUpdated } from '@open-wc/testing';
import { setViewport } from '@web/test-runner-commands';
import { useAccessibleIt } from "@aurodesignsystem/auro-library/scripts/test-plugin/iterateWithA11Check.mjs";
import designTokens from '@aurodesignsystem/design-tokens/dist/legacy/auro-classic/JSONVariablesFlat.json' with { type: 'json' };
import '../src/registered.js';

const mobileBreakpointWidth = parseInt(designTokens['ds-grid-breakpoint-sm'], 10) - 1;

useAccessibleIt();

/**
 * Runs the full checkbox test suite for a given viewport mode.
 * @param {boolean} mobileView - Whether tests should run in small or large viewport mode.
 * @returns {void}
 */
function runFullTest(mobileView) {
  before(async () => {
    await setViewport(mobileView ? { width: mobileBreakpointWidth, height: 800 } : { width: 800, height: 800 });
  });


  describe('Rendering', () => {
    it('should render a shadow root with an input element', async () => {
      const el = await fixture(html`<auro-checkbox value="test">Test</auro-checkbox>`);
      const input = el.shadowRoot.querySelector('input');

      expect(input).to.exist;
      expect(input.type).to.equal('checkbox');
    });

    it('should render slotted label text', async () => {
      const el = await fixture(html`<auro-checkbox value="test">My Label</auro-checkbox>`);
      const slot = el.shadowRoot.querySelector('slot:not([name])');
      const assigned = slot.assignedNodes().filter((n) => n.textContent.trim().length > 0);

      expect(assigned.length).to.be.greaterThan(0);
      expect(assigned[0].textContent).to.equal('My Label');
    });

    it('should render checkmark SVG when checked', async () => {
      const el = await fixture(html`<auro-checkbox value="test" checked>Test</auro-checkbox>`);
      const svg = el.shadowRoot.querySelector('.svg--cbx');

      expect(svg).to.exist;
    });

    it('should not render checkmark SVG when unchecked', async () => {
      const el = await fixture(html`<auro-checkbox value="test">Test</auro-checkbox>`);
      const svg = el.shadowRoot.querySelector('.svg--cbx');

      expect(svg).to.not.exist;
    });

    it('should derive inputId from the id attribute', async () => {
      const el = await fixture(html`<auro-checkbox id="my-cb" value="test">Test</auro-checkbox>`);
      const input = el.shadowRoot.querySelector('input');

      expect(input.id).to.equal('my-cb-input');
    });

    it('should generate a unique inputId when no id is set', async () => {
      const el = await fixture(html`<auro-checkbox value="test">Test</auro-checkbox>`);
      const input = el.shadowRoot.querySelector('input');

      expect(input.id).to.be.a('string');
      expect(input.id.length).to.be.greaterThan(0);
    });
  });

  describe('User Stories', () => {
    it('should allow a user to check and uncheck the checkbox', async () => {
      const el = await fixture(html`<auro-checkbox value="opt">Option</auro-checkbox>`);
      const input = el.shadowRoot.querySelector('input');

      expect(el.checked).to.not.be.true;

      input.click();
      await elementUpdated(el);
      expect(el.checked).to.be.true;

      input.click();
      await elementUpdated(el);
      expect(el.checked).to.not.be.true;
    });

    it('should prevent interaction when disabled', async () => {
      const el = await fixture(html`<auro-checkbox value="opt" disabled>Option</auro-checkbox>`);
      const input = el.shadowRoot.querySelector('input');

      input.click();
      await elementUpdated(el);
      expect(el.checked).to.not.be.true;
    });
  });

  describe('Properties', () => {
    describe('appearance', () => {
      it('should default appearance property to default', async () => {
        const el = await fixture(html`<auro-checkbox value="test">Test</auro-checkbox>`);

        expect(el.appearance).to.equal('default');
      });

      it('should reflect appearance attribute when set to inverse', async () => {
        const el = await fixture(html`<auro-checkbox value="test" appearance="inverse">Test</auro-checkbox>`);

        expect(el.getAttribute('appearance')).to.equal('inverse');
      });
    });

    describe('checked', () => {
      it('should default to unchecked', async () => {
        const el = await fixture(html`<auro-checkbox value="test">Test</auro-checkbox>`);

        expect(el.checked).to.not.be.true;
        expect(el.hasAttribute('checked')).to.be.false;
      });

      it('should reflect checked attribute when set', async () => {
        const el = await fixture(html`<auro-checkbox value="test" checked>Test</auro-checkbox>`);

        expect(el.checked).to.be.true;
        expect(el.hasAttribute('checked')).to.be.true;
      });

      it('should sync the internal input checked state', async () => {
        const el = await fixture(html`<auro-checkbox value="test">Test</auro-checkbox>`);
        const input = el.shadowRoot.querySelector('input');

        el.checked = true;
        await elementUpdated(el);
        expect(input.checked).to.be.true;

        el.checked = false;
        await elementUpdated(el);
        expect(input.checked).to.be.false;
      });
    });

    describe('disabled', () => {
      it('should default to not disabled', async () => {
        const el = await fixture(html`<auro-checkbox value="test">Test</auro-checkbox>`);

        expect(el.disabled).to.not.be.true;
        expect(el.hasAttribute('disabled')).to.be.false;
      });

      it('should reflect the disabled attribute', async () => {
        const el = await fixture(html`<auro-checkbox value="test" disabled>Test</auro-checkbox>`);

        expect(el.disabled).to.be.true;
        expect(el.hasAttribute('disabled')).to.be.true;
      });

      it('should disable the internal input element', async () => {
        const el = await fixture(html`<auro-checkbox value="test" disabled>Test</auro-checkbox>`);
        const input = el.shadowRoot.querySelector('input');

        expect(input.disabled).to.be.true;
      });
    });

    describe('error', () => {
      it('should default to no error', async () => {
        const el = await fixture(html`<auro-checkbox value="test">Test</auro-checkbox>`);

        expect(el.error).to.not.be.true;
        expect(el.hasAttribute('error')).to.be.false;
      });

      it('should reflect the error attribute', async () => {
        const el = await fixture(html`<auro-checkbox value="test" error>Test</auro-checkbox>`);

        expect(el.error).to.be.true;
        expect(el.hasAttribute('error')).to.be.true;
      });

      it('should render the error border when error is set', async () => {
        const el = await fixture(html`<auro-checkbox value="test" error>Test</auro-checkbox>`);
        const errorBorder = el.shadowRoot.querySelector('.errorBorder');

        expect(errorBorder).to.exist;
      });

      it('should remove the error border when error is cleared', async () => {
        const el = await fixture(html`<auro-checkbox value="test" error>Test</auro-checkbox>`);

        expect(el.shadowRoot.querySelector('.errorBorder')).to.exist;

        el.error = false;
        await elementUpdated(el);

        expect(el.shadowRoot.querySelector('.errorBorder')).to.not.exist;
      });
    });

    describe('id', () => {
      it('should accept and reflect an id attribute', async () => {
        const el = await fixture(html`<auro-checkbox id="my-cb" value="test">Test</auro-checkbox>`);

        expect(el.getAttribute('id')).to.equal('my-cb');
      });
    });

    describe('name', () => {
      it('should pass name to the internal input element', async () => {
        const el = await fixture(html`<auro-checkbox name="cbName" value="test">Test</auro-checkbox>`);
        const input = el.shadowRoot.querySelector('input');

        expect(input.name).to.equal('cbName');
      });
    });

    describe('onDark', () => {
      it('should reflect the onDark attribute', async () => {
        const el = await fixture(html`<auro-checkbox value="test" onDark>Test</auro-checkbox>`);

        expect(el.onDark).to.be.true;
        expect(el.hasAttribute('ondark')).to.be.true;
      });
    });

    describe('value', () => {
      it('should pass value to the internal input element', async () => {
        const el = await fixture(html`<auro-checkbox value="myVal">Test</auro-checkbox>`);
        const input = el.shadowRoot.querySelector('input');

        expect(input.value).to.equal('myVal');
      });
    });

    describe('touched', () => {
      it('should default to false', async () => {
        const el = await fixture(html`<auro-checkbox value="test">Test</auro-checkbox>`);

        expect(el.touched).to.be.false;
      });

      it('should become true after user interaction', async () => {
        const el = await fixture(html`<auro-checkbox value="test">Test</auro-checkbox>`);

        expect(el.touched).to.be.false;

        el.click();
        await elementUpdated(el);

        expect(el.touched).to.be.true;
      });
    });
  });

  describe('Slots', () => {
    describe('default', () => {
      it('should render content in the default slot', async () => {
        const el = await fixture(html`<auro-checkbox value="alaska">Alaska</auro-checkbox>`);

        const slot = el.shadowRoot.querySelector('slot:not([name])');

        await expect(slot).to.exist;
        const assigned = slot.assignedNodes().filter((node) => node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE);

        await expect(assigned.length).to.be.greaterThan(0);
      });
    });

  });

  describe('Public Functions', () => {
    describe('register', () => {
      it('should have a static register method', () => {
        expect(typeof customElements.get('auro-checkbox').register).to.equal('function');
      });

      it('should register the component with a custom name', async () => {
        customElements.get('auro-checkbox').register('custom-checkbox');

        const el = await fixture(html`<custom-checkbox value="test">Test</custom-checkbox>`);

        expect(el.shadowRoot).to.exist;
        expect(el.shadowRoot.querySelector('input')).to.exist;
      });
    });

    describe('reset', () => {
      it('should reset checked, error, and touched to false', async () => {
        const el = await fixture(html`<auro-checkbox value="test" checked error>Test</auro-checkbox>`);

        expect(el.checked).to.be.true;
        expect(el.error).to.be.true;

        el.reset();
        await elementUpdated(el);

        expect(el.checked).to.be.false;
        expect(el.error).to.be.false;
        expect(el.touched).to.be.false;
      });
    });
  });

  describe('Events', () => {
    describe('change', () => {
      it('should fire a change event when checked state changes', async () => {
        const el = await fixture(html`<auro-checkbox value="test">Test</auro-checkbox>`);
        const input = el.shadowRoot.querySelector('input');

        let fired = false;
        el.addEventListener('change', () => {
          fired = true;
        });

        input.click();
        await elementUpdated(el);

        expect(fired).to.be.true;
      });

      it('should not fire a change event when checked is set programmatically', async () => {
        const el = await fixture(html`<auro-checkbox value="test">Test</auro-checkbox>`);

        let fired = false;
        el.addEventListener('change', () => {
          fired = true;
        });

        el.checked = true;
        await elementUpdated(el);

        expect(fired).to.be.false;
      });
    });

    describe('input', () => {
      it('should fire an input event when checked state changes', async () => {
        const el = await fixture(html`<auro-checkbox value="test">Test</auro-checkbox>`);
        const input = el.shadowRoot.querySelector('input');

        let fired = false;
        el.addEventListener('input', () => {
          fired = true;
        });

        input.click();
        await elementUpdated(el);

        expect(fired).to.be.true;
      });
    });

    describe('auroCheckbox-input', () => {
      it('should fire auroCheckbox-input when user toggles the checkbox', async () => {
        const el = await fixture(html`<auro-checkbox value="test">Test</auro-checkbox>`);
        const input = el.shadowRoot.querySelector('input');

        let fired = false;
        el.addEventListener('auroCheckbox-input', () => {
          fired = true;
        });

        input.click();
        await elementUpdated(el);

        expect(fired).to.be.true;
      });
    });

    describe('auroCheckbox-focusin', () => {
      it('should fire auroCheckbox-focusin on click', async () => {
        const el = await fixture(html`<auro-checkbox value="test">Test</auro-checkbox>`);

        let fired = false;
        el.addEventListener('auroCheckbox-focusin', () => {
          fired = true;
        });

        el.click();
        await elementUpdated(el);

        expect(fired).to.be.true;
      });

      it('should fire auroCheckbox-focusin on focus', async () => {
        const el = await fixture(html`<auro-checkbox value="test">Test</auro-checkbox>`);

        let fired = false;
        el.addEventListener('auroCheckbox-focusin', () => {
          fired = true;
        });

        el.focus();
        await elementUpdated(el);

        expect(fired).to.be.true;
      });

      it('should have bubbles and composed set to true', async () => {
        const el = await fixture(html`<auro-checkbox value="test">Test</auro-checkbox>`);

        let event = null;
        el.addEventListener('auroCheckbox-focusin', (e) => {
          event = e;
        });

        el.click();
        await elementUpdated(el);

        expect(event.bubbles).to.be.true;
        expect(event.composed).to.be.true;
      });
    });

    describe('auroCheckbox-focusout', () => {
      it('should fire auroCheckbox-focusout on blur', async () => {
        const el = await fixture(html`<auro-checkbox value="test">Test</auro-checkbox>`);

        let fired = false;
        el.addEventListener('auroCheckbox-focusout', () => {
          fired = true;
        });

        el.focus();
        el.blur();
        await elementUpdated(el);

        expect(fired).to.be.true;
      });
    });
  });

  describe('Private Functions', () => {
    // No private function tests
  });

  describe('A11Y', () => {
    it('should have role="checkbox" attribute on the host element', async () => {
      const el = await fixture(html`
        <auro-checkbox value="test">Test</auro-checkbox>
      `);

      expect(el.getAttribute('role')).to.equal('checkbox');
    });

    it('should have aria-checked attribute that reflects the checked state', async () => {
      const el = await fixture(html`
        <auro-checkbox value="test">Test</auro-checkbox>
      `);

      expect(el.getAttribute('aria-checked')).to.equal('false');

      el.checked = true;
      await elementUpdated(el);

      expect(el.getAttribute('aria-checked')).to.equal('true');

      el.checked = false;
      await elementUpdated(el);

      expect(el.getAttribute('aria-checked')).to.equal('false');
    });

    it('should have aria-disabled attribute when disabled', async () => {
      const el = await fixture(html`
        <auro-checkbox value="test" disabled>Test</auro-checkbox>
      `);

      expect(el.getAttribute('aria-disabled')).to.equal('true');

      el.disabled = false;
      await elementUpdated(el);

      expect(el.hasAttribute('aria-disabled')).to.be.false;

      el.disabled = true;
      await elementUpdated(el);

      expect(el.getAttribute('aria-disabled')).to.equal('true');
    });

    it('should have tabindex="0" for keyboard accessibility', async () => {
      const el = await fixture(html`
        <auro-checkbox value="test">Test</auro-checkbox>
      `);

      expect(el.getAttribute('tabindex')).to.equal('0');
    });

    it('should derive aria-label from slot content text', async () => {
      const el = await fixture(html`
        <auro-checkbox value="test">My checkbox label</auro-checkbox>
      `);

      expect(el.getAttribute('aria-label')).to.equal('My checkbox label');
    });

    it('should update aria-label when slot content changes', async () => {
      const el = await fixture(html`
        <auro-checkbox value="test">Original label</auro-checkbox>
      `);

      expect(el.getAttribute('aria-label')).to.equal('Original label');

      el.textContent = 'Updated label';
      await elementUpdated(el);

      // Wait for slotchange event to fire
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(el.getAttribute('aria-label')).to.equal('Updated label');
    });
  });

  describe('Mouse Behavior', () => {
    it('should toggle checked state when checkbox is clicked', async () => {
      const el = await fixture(html`
        <auro-checkbox value="alaska">Alaska</auro-checkbox>
      `);

      const input = el.shadowRoot.querySelector('input');
      expect(el.checked).to.not.be.true;

      input.click();
      await elementUpdated(el);
      expect(el.checked).to.be.true;

      input.click();
      await elementUpdated(el);
      expect(el.checked).to.be.false;
    });

    it('should fire events when host element is clicked', async () => {
      const el = await fixture(html`
        <auro-checkbox value="alaska">Alaska</auro-checkbox>
      `);

      let changeFired = false;
      let inputFired = false;
      el.addEventListener('change', () => { changeFired = true; });
      el.addEventListener('auroCheckbox-input', () => { inputFired = true; });

      el.click();
      await elementUpdated(el);

      expect(changeFired).to.be.true;
      expect(inputFired).to.be.true;
    });

    it('should not toggle checked state when disabled checkbox is clicked', async () => {
      const el = await fixture(html`
        <auro-checkbox value="alaska" disabled>Alaska</auro-checkbox>
      `);

      const input = el.shadowRoot.querySelector('input');
      expect(el.checked).to.not.be.true;

      input.click();
      await elementUpdated(el);
      expect(el.checked).to.not.be.true;
    });

    it('should not toggle checked state when the host element is clicked while disabled', async () => {
      const el = await fixture(html`
        <auro-checkbox value="alaska" disabled>Alaska</auro-checkbox>
      `);

      expect(el.checked).to.not.be.true;

      el.click();
      await elementUpdated(el);
      expect(el.checked).to.not.be.true;
    });
  });

  describe('Keyboard Behavior', () => {
    it('should toggle checked when space key is pressed', async () => {
      const el = await fixture(html`<auro-checkbox value="test">Test</auro-checkbox>`);

      expect(el.checked).to.not.be.true;

      el.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
      await elementUpdated(el);

      expect(el.checked).to.be.true;
    });

    it('should uncheck when space key is pressed on a checked checkbox', async () => {
      const el = await fixture(html`<auro-checkbox value="test" checked>Test</auro-checkbox>`);

      expect(el.checked).to.be.true;

      el.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
      await elementUpdated(el);

      expect(el.checked).to.be.false;
    });

    it('should call preventDefault on space key to prevent page scroll', async () => {
      const el = await fixture(html`<auro-checkbox value="test">Test</auro-checkbox>`);

      const event = new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true });
      el.dispatchEvent(event);

      expect(event.defaultPrevented).to.be.true;
    });

    it('should not toggle checked when enter key is pressed', async () => {
      const el = await fixture(html`<auro-checkbox value="test">Test</auro-checkbox>`);

      expect(el.checked).to.not.be.true;

      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      await elementUpdated(el);

      expect(el.checked).to.not.be.true;
    });

    it('should not toggle checked when space key is pressed while disabled', async () => {
      const el = await fixture(html`<auro-checkbox value="test" disabled>Test</auro-checkbox>`);

      expect(el.checked).to.not.be.true;

      el.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
      await elementUpdated(el);

      expect(el.checked).to.not.be.true;
    });

    it('should not respond to keydown after disconnection from DOM', async () => {
      const el = await fixture(html`<auro-checkbox value="test">Test</auro-checkbox>`);

      el.parentNode.removeChild(el);

      el.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));

      expect(el.checked).to.not.be.true;
    });
  });
}

// Desktop Test Suite
describe('auro-checkbox', () => {
  runFullTest(false);
});

// Mobile Test Suite
describe('auro-checkbox in small viewport', () => {
  runFullTest(true);
});

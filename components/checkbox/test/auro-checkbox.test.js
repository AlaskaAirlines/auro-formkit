/* eslint-disable max-statements */
/* eslint-disable no-console */
/* eslint-disable one-var */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-lines */
import { fixture, html, expect, elementUpdated } from '@open-wc/testing';
import { useAccessibleIt } from "@aurodesignsystem/auro-library/scripts/test-plugin/iterateWithA11Check.mjs";
import '../src/registered.js';

useAccessibleIt();

describe('Old tests to refactor', () => {

  it('should have the expected properties when attributes are set', async () => {
    const expectedId = "testId",
      expectedName = "testName",
      expectedValue = "testValue";

    const el = await fixture(html`
      <auro-checkbox
        id="${expectedId}"
        name="${expectedName}"
        value="${expectedValue}"
        checked
        disabled
        error
      >Checkbox option</auro-checkbox>
    `);

    const root = el.shadowRoot;
    const input = root.querySelector('input');
    const errorBorder = root.querySelector('.errorBorder');

    expect(input.checked).to.be.true;
    expect(input.disabled).to.be.true;
    expect(input.value).to.equal(expectedValue);
    expect(input.name).to.equal(expectedName);
    expect(input.type).to.equal('checkbox');
    expect(errorBorder).to.not.be.undefined;
    expect(el.getAttribute('id')).to.equal(expectedId);
    expect(el.getAttribute('name')).to.equal(expectedName);
    expect(el.getAttribute('value')).to.equal(expectedValue);
    expect(el.hasAttribute('error')).to.be.true;
    expect(el.hasAttribute('checked')).to.be.true;
    expect(el.hasAttribute('disabled')).to.be.true;
    expect(el.getAttribute('role')).to.equal('checkbox');
    expect(el.getAttribute('aria-checked')).to.equal('true');
    expect(el.getAttribute('aria-disabled')).to.equal('true');
    expect(el.getAttribute('aria-label')).to.equal('Checkbox option');
    expect(el.getAttribute('tabindex')).to.equal('0');
  });
});

describe('auro-checkbox', () => {

  describe('Rendering', () => {
    // Add missing tests
  });

  describe('User Stories', () => {
    // Add missing tests
  });

  describe('Properties', () => {
    describe('appearance', () => {
      // add tests for this property
    });

    describe('checked', () => {
      // add tests for this property
    });

    describe('disabled', () => {
      // add tests for this property
    });

    describe('error', () => {
      // add tests for this property
    });

    describe('id', () => {
      // add tests for this property
    });

    describe('name', () => {
      // add tests for this property
    });

    describe('onDark', () => {
      // add tests for this property
    });

    describe('value', () => {
      // add tests for this property
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
      // TODO: test needs to be added
    });

    describe('reset', () => {
      // TODO: test needs to be added
    });
  });

  describe('Events', () => {
    describe('change', () => {
      // add tests for this event
    });

    describe('input', () => {
      // add tests for this event
    });

    describe('auroCheckbox-input', () => {
      // add tests for this event
    });

    describe('auroCheckbox-focusin', () => {
      // add tests for this event
    });

    describe('auroCheckbox-focusout', () => {
      // add tests for this event
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
  });

  describe('Keyboard Behavior', () => {
    // add missing tests for keyboard interaction (space / enter key toggling checked state)
  });
});

/* eslint-disable no-undef, no-unused-expressions */

import { fixture, html, expect, elementUpdated } from '@open-wc/testing';
import '../src/registered.js';

describe('auro-menuoption', () => {
  describe('Rendering', () => {
    it('should be defined as a custom element', async () => {
      const el = await Boolean(customElements.get("auro-menuoption"));

      await expect(el).to.be.true;
    });
  });

  describe('User Stories', () => {
    // add tests for user stories
  });

  describe('Properties', () => {
    describe('disabled', () => {
      // add tests for this property
    });

    describe('key', () => {
      // add tests for this property
    });

    describe('selected', () => {
      // add tests for this property
    });

    describe('tabIndex', () => {
      // add tests for this property
    });

    describe('value', () => {
      // add tests for this property
    });
  });

  describe('Slots', () => {
    describe('default', () => {
      // add tests for this slot
    });
  });

  describe('Public Functions', () => {
    describe('register', () => {
      // TODO: test needs to be added
    });

    describe('isActive', () => {
      // TODO: test needs to be added
    });
  });

  describe('Private Functions', () => {
    // No private function tests
  });

  describe('A11Y', () => {
    it('should be accessible', async () => {
      const el = await fixture(html`
        <auro-menu>
          <auro-menuoption value="one">One</auro-menuoption>
        </auro-menu>
      `);

      await elementUpdated(el);

      await expect(el).to.be.accessible();
    });
  });

  describe('Mouse Behavior', () => {
    describe('Click', () => {
      // add tests for click behavior
    });
  });

  describe('Keyboard Behavior', () => {
    // add tests for keyboard behavior
  });
});

/* eslint-disable no-undef, no-unused-expressions */

import { fixture, html, expect, elementUpdated } from '@open-wc/testing';
import '../src/registered.js';

describe('auro-helptext', () => {
  describe('Rendering', () => {
    it('should be defined as a custom element', async () => {
      const el = await Boolean(customElements.get("auro-helptext"));

      await expect(el).to.be.true;
    });
  });

  describe('User Stories', () => {
    // add tests for user stories
  });

  describe('Properties', () => {
    describe('appearance', () => {
      // add tests for this property
    });

    describe('error', () => {
      // add tests for this property
    });

    describe('onDark', () => {
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
  });

  describe('Private Functions', () => {
    // No private function tests
  });

  describe('A11Y', () => {
    it('should be accessible', async () => {
      const el = await fixture(html`
        <auro-helptext>Help text content</auro-helptext>
      `);

      await elementUpdated(el);

      await expect(el).to.be.accessible();
    });
  });

  describe('Mouse Behavior', () => {
    // No mouse behavior tests
  });

  describe('Keyboard Behavior', () => {
    // No keyboard behavior tests
  });
});

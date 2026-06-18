/* eslint-disable jsdoc/require-jsdoc */
import { fixture, html, expect } from '@open-wc/testing';
import '../../menu/src/registered.js';
import { getActiveOptions, getEnabledOptions } from '../src/selectUtils.js';

describe('selectUtils', () => {
  describe('getEnabledOptions', () => {
    it('returns only non-disabled options when the menu has items', async () => {
      const menu = await fixture(html`
        <auro-menu>
          <auro-menuoption value="a">Apples</auro-menuoption>
          <auro-menuoption value="b" disabled>Bananas</auro-menuoption>
          <auro-menuoption value="c">Cherries</auro-menuoption>
        </auro-menu>
      `);

      const enabled = getEnabledOptions(menu);

      expect(enabled).to.have.lengthOf(2);
      expect(enabled.map((opt) => opt.value)).to.deep.equal(['a', 'c']);
    });

    it('returns an empty array when the menu has no items (options getter is undefined)', async () => {
      const menu = await fixture(html`<auro-menu></auro-menu>`);

      // Sanity-check the precondition: this is the case the util exists to handle.
      expect(menu.options).to.be.undefined;

      expect(getEnabledOptions(menu)).to.deep.equal([]);
    });

    it('returns an empty array when the menu is null or undefined', () => {
      expect(getEnabledOptions(undefined)).to.deep.equal([]);
      expect(getEnabledOptions(null)).to.deep.equal([]);
    });
  });

  describe('getActiveOptions', () => {
    it('returns only active options (excludes disabled, hidden, static)', async () => {
      const menu = await fixture(html`
        <auro-menu>
          <auro-menuoption value="a">Apples</auro-menuoption>
          <auro-menuoption value="b" disabled>Bananas</auro-menuoption>
          <auro-menuoption value="c" hidden>Cherries</auro-menuoption>
          <auro-menuoption value="d" static>No match</auro-menuoption>
          <auro-menuoption value="e">Elderberries</auro-menuoption>
        </auro-menu>
      `);

      const active = getActiveOptions(menu);
      expect(active.map((opt) => opt.value)).to.deep.equal(['a', 'e']);
    });

    it('returns an empty array when the menu has no items', async () => {
      const menu = await fixture(html`<auro-menu></auro-menu>`);
      expect(getActiveOptions(menu)).to.deep.equal([]);
    });

    it('returns an empty array when the menu is null or undefined', () => {
      expect(getActiveOptions(undefined)).to.deep.equal([]);
      expect(getActiveOptions(null)).to.deep.equal([]);
    });
  });
});

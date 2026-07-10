/* eslint-disable no-undef, no-unused-expressions */
// Quarantined 5.9 tests for auro-menuoption `key` attribute.
// Imports needed: { fixture, html, expect, elementUpdated } from '@open-wc/testing';
// 'components/menu/src/registered.js'

import { fixture, html, expect, elementUpdated } from '@open-wc/testing';
import '../../components/menu/src/registered.js';

describe.skip('Quarantined 5.9 — auro-menuoption key property', () => {
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

/* eslint-disable jsdoc/require-jsdoc, no-return-await */

import { fixture, html } from '@open-wc/testing';
import '../src/registered.js';

export async function errorFixture() {
  return await fixture(html`
  <auro-radio-group error="There is an error with this form entry">
    <span slot="legend">Form label goes here</span>
    <auro-radio label="Yes" name="radioDemo" value="yes">Y</auro-radio>
    <auro-radio label="No" name="radioDemo" value="no">N</auro-radio>
    <auro-radio label="Maybe" name="radioDemo" value="maybe">?</auro-radio>
  </auro-radio-group>
  `);
}

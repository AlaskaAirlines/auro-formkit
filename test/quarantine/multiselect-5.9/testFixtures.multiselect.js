/* eslint-disable jsdoc/require-jsdoc, no-return-await */
// Quarantined fixtures for 5.9 multiSelect tests.
// Imports needed: { fixture, html } from '@open-wc/testing'; 'components/menu/src/registered.js'

import { fixture, html } from '@open-wc/testing';
import '../../../components/menu/src/registered.js';

export async function multiSelectDuplicateValuesFixture() {
  return await fixture(html`
    <auro-menu multiselect>
      <auro-menuoption value="option 1">option 1</auro-menuoption>
      <auro-menuoption value="option 2">option 2</auro-menuoption>
      <auro-menuoption value="option 4">option 4</auro-menuoption>
      <auro-menuoption value="option 3">option 3</auro-menuoption>
      <auro-menuoption value="option 2">option 2</auro-menuoption>
      <auro-menuoption value="option 5">option 5</auro-menuoption>
      <auro-menuoption value="option 4">option 4</auro-menuoption>
      <auro-menuoption value="option 6">option 6</auro-menuoption>
    </auro-menu>
  `);
}

export async function multiSelectDuplicateValuesSelectAllFixture() {
  return await fixture(html`
    <auro-menu multiselect selectAllMatchingOptions>
      <auro-menuoption value="option 1">option 1</auro-menuoption>
      <auro-menuoption value="option 2">option 2</auro-menuoption>
      <auro-menuoption value="option 4">option 4</auro-menuoption>
      <auro-menuoption value="option 3">option 3</auro-menuoption>
      <auro-menuoption value="option 2">option 2</auro-menuoption>
      <auro-menuoption value="option 5">option 5</auro-menuoption>
      <auro-menuoption value="option 4">option 4</auro-menuoption>
      <auro-menuoption value="option 6">option 6</auro-menuoption>
    </auro-menu>
  `);
}

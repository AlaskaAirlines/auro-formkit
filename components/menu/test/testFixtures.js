/* eslint-disable jsdoc/require-jsdoc, no-return-await */

import { fixture, html } from '@open-wc/testing';
import '../src/registered.js';

export async function defaultFixture() {
  return await fixture(html`
    <div>
      <auro-menu aria-label="test">
        <auro-menuoption value="option 1">option 1</auro-menuoption>
        <auro-menuoption value="option 2">option 2</auro-menuoption>
        <auro-menuoption disabled value="option 3">option 3</auro-menuoption>
        <auro-menuoption value="lorem ipsum lorem ipsum">lorem ipsum lorem ipsum</auro-menuoption>
        <auro-menuoption value="departures">Departures</auro-menuoption>
        <auro-menuoption value="arrivals">Arrivals</auro-menuoption>
      </auro-menu>
    </div>
  `);
}

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
};

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
};

export async function noninteractiveOptionsFixture() {
  return await fixture(html`
    <div>
      <auro-menu aria-label="test">
        <auro-menuoption disabled value="option 1">option 1</auro-menuoption>
        <auro-menuoption hidden value="option 2">option 2</auro-menuoption>
        <auro-menuoption value="option 3">option 3</auro-menuoption>
        <auro-menuoption value="lorem ipsum lorem ipsum">lorem ipsum lorem ipsum</auro-menuoption>
        <auro-menuoption value="departures">Departures</auro-menuoption>
        <auro-menuoption value="arrivals">Arrivals</auro-menuoption>
      </auro-menu>
    </div>
  `);
}

export async function nestedMenuFixture() {
  return await fixture(html`
      <div>
        <auro-menu aria-label="test">
          <auro-menuoption value="option 1">option 1</auro-menuoption>
          <auro-menu>
            <auro-menuoption value="option a">option a</auro-menuoption>
            <auro-menuoption value="option b">option b</auro-menuoption>
          </auro-menu>
          <auro-menuoption value="option 2">option 2</auro-menuoption>
        </auro-menu>
      </div>
  `);
}

export async function customEventFixture() {
  return await fixture(html`
      <div>
        <auro-menu matchword="o">
          <auro-menuoption value="option 1" event="uniqueEventName">option 1</auro-menuoption>
        </auro-menu>
      </div>
  `);
}

export async function emptyItemsFixture() {
  return await fixture(html`
    <div>
      <auro-menu aria-label="test">
        <auro-menu aria-label="test-child" test-id="test-child">
        </auro-menu>
      </auro-menu>
    </div>
  `);
}

export async function multiSelectFixture() {
  return await fixture(html`
    <div>
      <auro-menu multiSelect aria-label="test">
        <auro-menuoption value="option1">Option 1</auro-menuoption>
        <auro-menuoption value="option2">Option 2</auro-menuoption>
        <auro-menuoption value="option3">Option 3</auro-menuoption>
        <auro-menuoption disabled value="option4">Option 4</auro-menuoption>
      </auro-menu>
    </div>
  `);
}

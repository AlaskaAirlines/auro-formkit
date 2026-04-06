/* eslint-disable jsdoc/require-jsdoc, no-return-await */

import { fixture, html } from '@open-wc/testing';
import '@aurodesignsystem/auro-dropdown';
import '../../menu/src/registered.js';
import '../src/registered.js';

export async function defaultFixture() {
  return await fixture(html`
    <auro-select>
      <span slot="bib.fullscreen.headline">Bib Headline</span>
      <span slot="label">Name</span>
      <auro-menu>
        <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
        <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
        <auro-menuoption value="Bananas" id="option-2">Bananas</auro-menuoption>
        <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      </auro-menu>
    </auro-select>
  `);
}

export async function emphasizedFixture() {
  return await fixture(html`
    <auro-select layout="emphasized" shape="pill" size="xl" value="flights">
      <span slot="ariaLabel.bib.close">Close Popup</span>
      <span slot="label">Select Example</span>
      <auro-menu nocheckmark>
        <auro-menuoption value="flights">
          <auro-icon category="terminal" name="plane-diag-stroke" customcolor></auro-icon> Flights
          <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="terminal" name="plane-diag-fill" customcolor></auro-icon>
        </auro-menuoption>
        <auro-menuoption value="cars">
          <auro-icon category="destination" name="car-rental-stroke" customcolor></auro-icon> Cars
          <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="destination" name="car-rental-stroke" customcolor></auro-icon>
        </auro-menuoption>
        <auro-menuoption value="hotels">
          <auro-icon category="destination" name="hotel-stroke" customcolor></auro-icon> Hotels
          <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="destination" name="hotel-filled" customcolor></auro-icon>
        </auro-menuoption>
        <auro-menuoption value="packages">
          <auro-icon category="shop" name="gift-stroke" customcolor></auro-icon> Packages
          <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="shop" name="gift-filled" customcolor></auro-icon>
        </auro-menuoption>
        <auro-menuoption value="cruises">
          <auro-icon category="in-flight" name="boarding" customcolor></auro-icon> Cruises
          <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="in-flight" name="boarding" customcolor></auro-icon>
        </auro-menuoption>
      </auro-menu>
    </auro-select>
  `);
}

export async function snowflakeFixture() {
  return await fixture(html`
    <auro-select placeholder="placeholder text" layout="snowflake" shape="snowflake">
      <span slot="ariaLabel.bib.close">Close Popup</span>
      <span slot="label">Select Example</span>
      <auro-menu nocheckmark>
        <auro-menuoption value="flights">
          <auro-icon category="terminal" name="plane-diag-stroke" customcolor></auro-icon> Flights
          <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="terminal" name="plane-diag-fill" customcolor></auro-icon>
        </auro-menuoption>
        <auro-menuoption value="cars">
          <auro-icon category="destination" name="car-rental-stroke" customcolor></auro-icon> Cars
          <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="destination" name="car-rental-stroke" customcolor></auro-icon>
        </auro-menuoption>
        <auro-menuoption value="hotels">
          <auro-icon category="destination" name="hotel-stroke" customcolor></auro-icon> Hotels
          <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="destination" name="hotel-filled" customcolor></auro-icon>
        </auro-menuoption>
        <auro-menuoption value="packages">
          <auro-icon category="shop" name="gift-stroke" customcolor></auro-icon> Packages
          <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="shop" name="gift-filled" customcolor></auro-icon>
        </auro-menuoption>
        <auro-menuoption value="cruises">
          <auro-icon category="in-flight" name="boarding" customcolor></auro-icon> Cruises
          <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="in-flight" name="boarding" customcolor></auro-icon>
        </auro-menuoption>
      </auro-menu>
    </auro-select>
  `);
}

export async function presetValueFixture() {
  return await fixture(html`
  <auro-select value="price">
    <span slot="bib.fullscreen.headline">Bib Headline</span>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="stops">Stops</auro-menuoption>
      <auro-menuoption value="price" id="presetOption">Price</auro-menuoption>
      <auro-menuoption value="duration">Duration</auro-menuoption>
      <auro-menuoption value="departure">Departure</auro-menuoption>
      <auro-menuoption value="arrival">Arrival</auro-menuoption>
      <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
    </auro-menu>
  </auro-select>
  `);
}

export async function presetMultiSelectFixture() {
  return await fixture(html`
  <auro-select multiselect value='["price","duration"]'>
    <span slot="bib.fullscreen.headline">Bib Headline</span>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="stops">Stops</auro-menuoption>
      <auro-menuoption value="price" id="presetMultiOption-0">Price</auro-menuoption>
      <auro-menuoption value="duration" id="presetMultiOption-1">Duration</auro-menuoption>
      <auro-menuoption value="departure">Departure</auro-menuoption>
      <auro-menuoption value="arrival">Arrival</auro-menuoption>
    </auro-menu>
  </auro-select>
  `);
}

export async function noCheckmarkFixture() {
  return await fixture(html`
  <auro-select nocheckmark>
    <span slot="bib.fullscreen.headline">Bib Headline</span>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    </auro-menu>
  </auro-select>
  `);
}

export async function errorFixture() {
  return await fixture(html`
  <auro-select error="custom error message">
    <span slot="bib.fullscreen.headline">Bib Headline</span>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    </auro-menu>
  </auro-select>
  `);
}

export async function multiSelectFixture() {
  return await fixture(html`
  <auro-select multiselect>
    <span slot="bib.fullscreen.headline">Bib Headline</span>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Bananas" id="option-2">Bananas</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    </auro-menu>
  </auro-select>
  `);
}

export async function requiredFixture() {
  return await fixture(html`
  <auro-select required>
    <span slot="bib.fullscreen.headline">Bib Headline</span>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    </auro-menu>
  </auro-select>
  `);
}

export async function nestedMenuFixture() {
  return await fixture(html`
  <auro-select>
    <span slot="bib.fullscreen.headline">Bib Headline</span>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="option 1" id="nested-option-0">option 1</auro-menuoption>
      <auro-menu>
        <auro-menuoption value="option a" id="nested-option-1">option a</auro-menuoption>
        <auro-menuoption value="option b" id="nested-option-2">option b</auro-menuoption>
      </auro-menu>
      <auro-menuoption value="option 2" id="nested-option-3">option 2</auro-menuoption>
    </auro-menu>
  </auro-select>
  `);
}

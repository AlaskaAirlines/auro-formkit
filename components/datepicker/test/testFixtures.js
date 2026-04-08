import { fixture, html } from '@open-wc/testing';
import '@aurodesignsystem/auro-dialog';
import '@aurodesignsystem/auro-drawer';
import '../src/registered.js';

/**
 * Fixture for date slot testing.
 * @returns {Promise<HTMLElement>} The fixture element.
 */
export function dateSlotFixture() {
  return fixture(html`
    <auro-datepicker centralDate="10/01/2023">
      <span slot="date_10_01_2023">$1322</span>
      <span slot="date_10_02_2023">$234</span>
      <span slot="date_10_11_2023">$784</span>
      <span slot="date_10_15_2023">$567</span>
      <span slot="date_10_16_2023">$12345</span>
    </auro-datepicker>
  `);
}

/**
 * Fixture for popover slot testing.
 * @returns {Promise<HTMLElement>} The fixture element.
 */
export function popoverSlotFixture() {
  return fixture(html`
    <auro-datepicker centralDate="10/01/2023">
      <span slot="popover_10_01_2023">$1322</span>
      <span slot="popover_10_02_2023">$234</span>
      <span slot="popover_10_11_2023">$784</span>
      <span slot="popover_10_15_2023">$567</span>
      <span slot="popover_10_16_2023">$12345</span>
    </auro-datepicker>
  `);
}

export function inDialogFixture() {
  return fixture(html`
    <auro-dialog open>
      <span slot="header">Datepicker in Dialog</span>
      <div slot="content">
        <auro-datepicker></auro-datepicker>
      </div>
    </auro-dialog>
  `);
}

export function inDrawerFixture() {
  return fixture(html`
    <auro-drawer open aria-label="Datepicker in Drawer">
      <span slot="header">Datepicker in Drawer</span>
      <div slot="content">
        <auro-datepicker></auro-datepicker>
      </div>
    </auro-drawer>
  `);
}

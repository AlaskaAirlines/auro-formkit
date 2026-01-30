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
    <auro-datepicker centralDate="2023-10-01">
      <span slot="date_2023_10_01">$1322</span>
      <span slot="date_2023_10_02">$234</span>
      <span slot="date_2023_10_11">$784</span>
      <span slot="date_2023_10_15">$567</span>
      <span slot="date_2023_10_16">$12345</span>
    </auro-datepicker>
  `);
}

/**
 * Fixture for popover slot testing.
 * @returns {Promise<HTMLElement>} The fixture element.
 */
export function popoverSlotFixture() {
  return fixture(html`
    <auro-datepicker centralDate="2023-10-01">
      <span slot="popover_2023_10_01">$1322</span>
      <span slot="popover_2023_10_02">$234</span>
      <span slot="popover_2023_10_11">$784</span>
      <span slot="popover_2023_10_15">$567</span>
      <span slot="popover_2023_10_16">$12345</span>
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

import { fixture, html } from '@open-wc/testing';
import '@aurodesignsystem/auro-dialog';
import '@aurodesignsystem/auro-drawer';
import '../src/registered.js';

export function rangeFixture(value, valueEnd) {
  return fixture(html`
    <auro-datepicker range value="${value || ''}" valueEnd="${valueEnd || ''}"></auro-datepicker>
  `);
}

export function fullscreenFixture() {
  return fixture(html`
    <auro-datepicker fullscreenBreakpoint="xxl"></auro-datepicker>
  `);
}

export function decorationsFixture(dayDecorations) {
  return fixture(html`
    <auro-datepicker .dayDecorations="${dayDecorations}"></auro-datepicker>
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

import styleCss from "./styles/style-auro-calendar-month-css.js";
import colorCss from "./styles/color-month-css.js";
import tokensCss from "./styles/tokens-css.js";

import { html } from 'lit';

import { RangeDatepickerCalendar } from './vendor/wc-range-datepicker/range-datepicker-calendar.js';
import './auro-calendar-cell.js';

// See https://git.io/JJ6SJ for "How to document your components using JSDoc"

/* eslint-disable no-magic-numbers, dot-location */

export class AuroCalendarMonth extends RangeDatepickerCalendar {
  static get styles() {
    return [
      // ...super.styles,
      styleCss,
      colorCss,
      tokensCss
    ];
  }

  static get properties() {
    return {

      /**
       * @private
       */
      monthFirst: {
        type: Boolean,
        reflect: true
      }
    };
  }

  async firstUpdated() {
    this.monthsList = [
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
    ];
    setTimeout(() => {
      this.setYears(1930, 2100);
    });

    await this.updateComplete;
  }

  /**
   * Returns month name to be rendered in the calendar header.
   * @private
   * @param {Number} month - The month number (1-12).
   * @returns {String} The name of the month.
   */
  computeCurrentMonthName(month) {
    return this.monthNames[month - 1];
  }

  /**
   * Returns the unique heading ID for this month, used by aria-labelledby.
   * @private
   * @returns {String} The heading ID.
   */
  getHeadingId() {
    return `month-heading-${this.month}-${this.year}`;
  }

  /**
   * Determines the current month name based on locale.
   * Also builds parallel arrays of full day names for abbr attributes.
   * This is a rewrite of the function used in the class RangeDatepickerCalendar and should not be removed from here.
   * @private
   * @returns {void}
   */
  localeChanged() {
    const dayNamesOfTheWeek = [];
    const dayFullNames = [];
    for (let int = 0; int < 7; int += 1) {
      dayNamesOfTheWeek.push(this.locale.localize.day(int, { width: 'narrow' }));
      dayFullNames.push(this.locale.localize.day(int, { width: 'long' }));
    }
    const firstDayOfWeek = this.locale.options.weekStartsOn
      ? this.locale.options.weekStartsOn
      : 0;
    const tmp = dayNamesOfTheWeek.slice().splice(0, firstDayOfWeek);
    const newDayNamesOfTheWeek = dayNamesOfTheWeek
      .slice()
      .splice(firstDayOfWeek, dayNamesOfTheWeek.length)
      .concat(tmp);
    this.dayNamesOfTheWeek = newDayNamesOfTheWeek;

    const tmpFull = dayFullNames.slice().splice(0, firstDayOfWeek);
    const newDayFullNames = dayFullNames
      .slice()
      .splice(firstDayOfWeek, dayFullNames.length)
      .concat(tmpFull);
    this.dayFullNames = newDayFullNames;
  }

  /**
   * Renders a day-of-week header with abbr attribute for the full day name.
   * @private
   * @param {String} dayOfWeek - The short day name.
   * @param {Number} index - The index in the dayNamesOfTheWeek array.
   * @returns {Object} The header HTML.
   */
  renderDayOfWeek(dayOfWeek, index) {
    const fullName = this.dayFullNames ? this.dayFullNames[index] : dayOfWeek;
    return html`<div class="th body-default"><abbr title="${fullName}">${dayOfWeek}</abbr></div>`;
  }

  /**
   * Returns all focusable cell elements (enabled + blackout, not out-of-range) in this month.
   * @returns {Array} Array of auro-formkit-calendar-cell elements.
   */
  getFocusableCells() {
    const cells = Array.from(this.shadowRoot.querySelectorAll('auro-formkit-calendar-cell'));
    return cells.filter((cell) => {
      if (!cell.day) {
        return false;
      }
      return !cell.isOutOfRange(cell.day, cell.min, cell.max);
    });
  }

  /**
   * Overrides the base class handler to prevent setting `this.hoveredDate`
   * as a reactive property. Instead, just dispatches the event upward so
   * the calendar can handle range preview imperatively.
   * @private
   * @param {CustomEvent} event - The date-is-hovered event from a cell.
   * @returns {void}
   */
  handleDateHovered(event) {
    this.dispatchEvent(new CustomEvent('hovered-date-changed', {
      detail: { value: event.detail.date },
    }));
  }

  renderWeek(week) {
    return html`
      <div class="tr" role="row">${week.map((day) => this.renderDay(day))}</div>
    `;
  }

  renderDay(day) {
    return html`
      <div class="td ${this.tdIsEnabled(day)}">
        ${day
          ? html`
              <auro-formkit-calendar-cell
                .disabledDays="${this.disabledDays}"
                .min="${this.min}"
                .max="${this.max}"
                .month="${this.month}"
                .dateTo="${this.dateTo}"
                .dateFrom="${this.dateFrom}"
                .locale="${this.locale}"
                .day="${day}"
                ?isCurrentDate="${this.isCurrentDate(day)}"
                @date-is-selected="${this.handleDateSelected}"
                @date-is-hovered="${this.handleDateHovered}"
              >
              </auro-formkit-calendar-cell>
          `
          : html`<div aria-hidden="true" inert></div>`}
      </div>
    `;
  }

  /* Disabling linter for render as this code is directly from range-datepicker-calendar */
  /* eslint-disable */
  render() {
    var _a, _b;

    return html `
      <div>
        <div class="header">
          ${this.renderPrevButton()}
          <div class="headerTitle heading-xs" id="${this.getHeadingId()}" aria-hidden="true">
            ${this.monthFirst ? html`
              <div>${this.computeCurrentMonthName(this.month)}</div>
              <div>${this.renderYear()}</div>
            ` : html`
              <div>${this.renderYear()}</div>
              <div>${this.computeCurrentMonthName(this.month)}</div>
            `}
          </div>
          ${this.renderNextButton()}
        </div>

        <div class="table" role="grid">
          <div class="thead" aria-hidden="true">
            <div class="tr">
              ${(_a = this.dayNamesOfTheWeek) === null || _a === void 0 ? void 0 : _a.map((dayNameOfWeek, index) => this.renderDayOfWeek(dayNameOfWeek, index))}
            </div>
          </div>
          <div class="tbody" role="rowgroup">
            ${(_b = this.daysOfMonth) === null || _b === void 0 ? void 0 : _b.map(week => this.renderWeek(week))}
          </div>
        </div>
      </div>
    `;
  }
  /* eslint-enable */
}

if (!customElements.get('auro-formkit-calendar-month')) {
  customElements.define('auro-formkit-calendar-month', AuroCalendarMonth);
}

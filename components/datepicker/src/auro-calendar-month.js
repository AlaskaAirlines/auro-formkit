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
   * Determines the current month name based on locale.
   * This is a rewrite of the function used in the class RangeDatepickerCalendar and should not be removed from here.
   * @private
   * @returns {void}
   */
  localeChanged() {
    const dayNamesOfTheWeek = [];
    for (let int = 0; int < 7; int += 1) {
      dayNamesOfTheWeek.push(this.locale.localize.day(int, { width: 'narrow' }));
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
                .hoveredDate="${this.hoveredDate}"
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
          : null}
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
          <div class="headerTitle heading-xs">
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

        <div class="table">
          <div class="thead">
            <div class="tr">
              ${(_a = this.dayNamesOfTheWeek) === null || _a === void 0 ? void 0 : _a.map(dayNameOfWeek => this.renderDayOfWeek(dayNameOfWeek))}
            </div>
          </div>
          <div class="tbody">
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

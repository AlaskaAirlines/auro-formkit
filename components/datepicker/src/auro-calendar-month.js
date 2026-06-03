import styleCss from "./styles/style-auro-calendar-month-css.js";
import colorCss from "./styles/color-month-css.js";
import tokensCss from "./styles/tokens-css.js";

import { html } from 'lit';

import { RangeDatepickerCalendar } from './vendor/wc-range-datepicker/range-datepicker-calendar.js';
import './auro-calendar-cell.js';

// See https://git.io/JJ6SJ for "How to document your components using JSDoc"

/* eslint-disable no-magic-numbers, dot-location */

const getMonthNamesFromLocale = (locale) => {
  const fmt = new Intl.DateTimeFormat(locale || 'en-US', { month: 'long' });
  return Array.from({ length: 12 }, (_, i) => fmt.format(new Date(2000, i, 1)));
};

/**
 * Generates the localized short names for each day of the week.
 * The list always starts with the day that corresponds to Sunday in the target locale.
 * @private
 * @param {String} locale - The BCP 47 language tag for localization (e.g. "en-US").
 * @returns {Array} An array of seven localized narrow weekday names, starting from Sunday.
 */
const getWeekdayNames = (locale) => {
  const fmt = new Intl.DateTimeFormat(locale|| 'en-US', { weekday: 'narrow' });
  // Jan 5 2025 is a known Sunday; iterate to get all 7 narrow day names starting from Sunday
  const sundayMs = new Date(2025, 0, 5).getTime();
  const msPerDay = 864e5;
  const allDays = [];
  for (let day = 0; day < 7; day += 1) {
    const offsetMs = day * msPerDay;
    allDays.push(fmt.format(new Date(sundayMs + offsetMs)));
  }
  return allDays;
}


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
      },

      /**
       * BCP 47 locale tag (such as `en-US`) for calendar localization.
       * as wc-range-datepicker expects a `locale` prop, we use `localeCode` to avoid conflicts.
       */
      localeCode: {
        type: String
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
    return this.monthNames?.[month - 1] || getMonthNamesFromLocale(this.localeCode)[month - 1] || '';
  }

  /**
   * Determines the current month name based on locale.
   * This is a rewrite of the function used in the class RangeDatepickerCalendar and should not be removed from here.
   * @private
   * @returns {void}
   */
  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('localeCode')) {
      this.localeChanged();
    }
  }

  localeChanged() {
    // get localized weekday names based on current locale and store in a property for use in day name rendering
    const allDays = getWeekdayNames(this.localeCode);

    // Week starts on Sunday (index 0)
    const firstDayOfWeek = this.locale?.options?.weekStartsOn || 0;
    this.dayNamesOfTheWeek = allDays.slice(firstDayOfWeek).concat(allDays.slice(0, firstDayOfWeek));
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
                .locale="${this.localeCode}"
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

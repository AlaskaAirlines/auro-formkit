/* eslint-disable no-underscore-dangle */
import styleCss from "./styles/style-auro-calendar-month-css.js";
import colorCss from "./styles/color-month-css.js";
import tokensCss from "./styles/tokens-css.js";

import { html } from 'lit';

import { RangeDatepickerCalendar } from './vendor/wc-range-datepicker/range-datepicker-calendar.js';
import './auro-calendar-cell.js';

// See https://git.io/JJ6SJ for "How to document your components using JSDoc"

/* eslint-disable no-magic-numbers, dot-location */


const getMonthNamesFromLocale = (locale) => {
  const fmt = new Intl.DateTimeFormat(locale, {
    month: 'long',
    timeZone: 'UTC'
  });
  // eslint-disable-next-line id-length
  return Array.from({ length: 12 }, (_, i) => fmt.format(Date.UTC(2000, i, 1)));
};

/**
 * Generates the localized narrow names for each day of the week, starting from Sunday.
 * Uses UTC dates to avoid DST-related day drift across timezones.
 * @private
 * @param {String} locale - The BCP 47 language tag for localization (e.g. "en-US").
 * @returns {Array} An array of seven localized narrow weekday names, starting from Sunday.
 */
const getWeekdayNames = (locale) => {
  const fmt = new Intl.DateTimeFormat(locale, {
    weekday: 'narrow',
    timeZone: 'UTC'
  });
  // Jan 5 2025 is a known Sunday; use Date.UTC to avoid DST-related day drift
  const allDays = [];
  for (let day = 0; day < 7; day += 1) {
    allDays.push(fmt.format(Date.UTC(2025, 0, 5 + day)));
  }
  return allDays;
};


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
      },

      /**
       * Names of all 12 months. When omitted, names are derived from `localeCode`.
       */
      monthNames: {
        type: Array
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
    if (this.monthNames?.[month - 1]) {
      return this.monthNames[month - 1];
    }
    if (!this._cachedMonthNames || this._cachedMonthNamesLocale !== this.localeCode) {
      this._cachedMonthNames = getMonthNamesFromLocale(this.localeCode);
      this._cachedMonthNamesLocale = this.localeCode;
    }
    return this._cachedMonthNames[month - 1] || '';
  }

  /**
   * Determines the current month name based on locale.
   * This is a rewrite of the function used in the class RangeDatepickerCalendar and should not be removed from here.
   * @private
   * @param {Object} changedProperties - The properties that have changed since the last update.
   * @returns {void}
   */
  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('localeCode')) {
      this.localeChanged();
    }
  }

  localeChanged() {
    // Week always starts on Sunday; use Intl-derived names directly without rotation
    this.dayNamesOfTheWeek = getWeekdayNames(this.localeCode);
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

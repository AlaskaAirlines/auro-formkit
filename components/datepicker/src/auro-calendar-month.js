/* eslint-disable no-underscore-dangle */
import styleCss from "./styles/style-auro-calendar-month-css.js";
import colorCss from "./styles/color-month-css.js";
import tokensCss from "./styles/tokens-css.js";

import { html } from 'lit';

import { RangeDatepickerCalendar } from './vendor/wc-range-datepicker/range-datepicker-calendar.js';
import './auro-calendar-cell.js';

// See https://git.io/JJ6SJ for "How to document your components using JSDoc"

/* eslint-disable no-magic-numbers */


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
 * @param {String} weekday - The format of the weekday name ('narrow', 'short', 'long').
 * @returns {Array} An array of seven localized weekday names, starting from Sunday.
 */
const getWeekdayNames = (locale, weekday) => {
  const fmt = new Intl.DateTimeFormat(locale, {
    weekday,
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
       * As wc-range-datepicker expects a `locale` prop, we use `localeCode` to avoid conflicts.
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
    this.dayNamesOfTheWeek = getWeekdayNames(this.localeCode, 'narrow');
    this.dayFullNames = getWeekdayNames(this.localeCode, 'long');
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
    return html`<div class="th body-default" aria-label="${fullName}" role="columnheader">${dayOfWeek}</div>`;
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

  /**
   * Dispatches a bubbling event when the mouse leaves the date grid body
   * so the parent calendar can clear the range hover preview.
   * @private
   * @returns {void}
   */
  handleTbodyMouseLeave() {
    this.dispatchEvent(new CustomEvent('calendar-month-mouseleave', {
      bubbles: true,
      composed: true,
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
                .locale="${this.localeCode}"
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
          <div class="headerTitle heading-xs" id="${this.getHeadingId()}">
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
          <div class="thead">
            <div class="tr">
              ${(_a = this.dayNamesOfTheWeek) === null || _a === void 0 ? void 0 : _a.map((dayNameOfWeek, index) => this.renderDayOfWeek(dayNameOfWeek, index))}
            </div>
          </div>
          <div class="tbody" role="rowgroup" @mouseleave="${this.handleTbodyMouseLeave}">
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

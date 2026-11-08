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
 * Gets the localized names of the days of the week, starting from Sunday, in the given style.
 * Uses UTC dates to avoid DST-related day drift across timezones.
 * @private
 * @param {String} locale - The BCP 47 language tag for localization, such as "en-US".
 * @param {String} weekday - The style of the weekday name: 'narrow', 'short', or 'long'.
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


/**
 * One month of the datepicker's calendar: a localized heading and a grid of day cells people can select.
 * @event hovered-date-changed - Notifies that the date currently hovered within the month grid has changed.
 * @event calendar-month-mouseleave - Notifies that the pointer left the month's date grid, so the calendar can clear the range preview.
 */
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
       * Shows the month name before the year in the month's heading.
       */
      monthFirst: {
        type: Boolean,
        attribute: 'monthfirst',
        reflect: true
      },

      /**
       * Sets the language and region for the month and weekday names, such as `en-US` (a BCP 47 language tag). It's named `localeCode` because the base class already uses `locale`.
       */
      localeCode: {
        type: String,
        attribute: 'localecode'
      },

      /**
       * Sets the 12 month names shown in the heading, from January to December, such as translated names. When not set, the names come from `localeCode`.
       * @type {string[]}
       */
      monthNames: {
        type: Array,
        attribute: 'monthnames'
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
   * Gets the month name shown in the heading, from `monthNames` or else from `localeCode`.
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
   * Gets the unique ID of this month's heading element.
   * @private
   * @returns {String} The heading ID.
   */
  getHeadingId() {
    return `month-heading-${this.month}-${this.year}`;
  }


  /**
   * Updates the weekday names when `localeCode` changes.
   * Overrides the RangeDatepickerCalendar method, so don't remove it.
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

  /** @internal */
  localeChanged() {
    this.dayNamesOfTheWeek = getWeekdayNames(this.localeCode, 'narrow');
    this.dayFullNames = getWeekdayNames(this.localeCode, 'long');
  }

  /**
   * Renders a day-of-week column header that shows the short day name and gives screen readers the full name with `aria-label`.
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
   * Gets the cells in this month that keyboard users can reach: enabled and blackout dates, but not dates before the earliest or after the latest date people can choose.
   * @returns {Array} The auro-formkit-calendar-cell elements.
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

  /**
   * Renders one row of the month grid.
   * @param {Array<Object>} week - The days in the week, one per column.
   * @returns {import("lit").TemplateResult}
   * @internal
   */
  renderWeek(week) {
    return html`
      <div class="tr" role="row">${week.map((day) => this.renderDay(day))}</div>
    `;
  }

  /**
   * Renders one grid cell: a calendar cell for the day, or an empty placeholder when there's no day.
   * @param {Object} day - The day to show: an object with `date`, a Unix timestamp in seconds, and `title`, the day of the month.
   * @returns {import("lit").TemplateResult}
   * @internal
   */
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

import { html } from "lit/static-html.js";

import styleCss from './styles/style-auro-calendar-css.js';
import colorCss from './styles/color-calendar-css.js';
import tokensCss from './styles/tokens-css.js';

import './auro-calendar-month.js';
import { RangeDatepicker } from './vendor/wc-range-datepicker/range-datepicker.js';
import chevronLeft from '@alaskaairux/icons/dist/icons/interface/chevron-left.mjs';
import chevronRight from '@alaskaairux/icons/dist/icons/interface/chevron-right.mjs';

import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';
import { AuroDependencyVersioning } from '@aurodesignsystem/auro-library/scripts/runtime/dependencyTagVersioning.mjs';

import { AuroDatepickerUtilities } from './utilities.js';
import { CalendarUtilities } from './utilitiesCalendar.js';
import { UtilitiesCalendarRender } from './utilitiesCalendarRender.js';

import { AuroBibtemplate } from '@aurodesignsystem/auro-bibtemplate';
import bibTemplateVersion from './bibtemplateVersion.js';

// See https://git.io/JJ6SJ for "How to document your components using JSDoc"
/**
 * @prop {Object} firstDayOfWeek - Weekday that will be displayed in first column of month grid.
 * 0: sunday, 1: monday, 2: tuesday, 3: wednesday , 4: thursday, 5: friday, 6: saturday
 * Default is 0.
 * @prop {Date | null} focusedDate - The currently focused date (if any).
 * @prop {Date} maxDate - Maximum date. All dates after will be disabled.
 * @prop {Date} minDate - Minimum date. All dates before will be disabled.
 * @prop {Date | undefined} selectedDate - The selected date, usually synchronized with datepicker-input.
 * Not to be confused with the focused date (therefore not necessarily in active month view).
 * @prop {string} weekdayHeaderNotation - Weekday header notation, based on Intl DatetimeFormat:.
 * @prop {Boolean} visible - Flag indicating if the calendar is visible.
 * - 'short' (e.g., Thu)
 * - 'narrow' (e.g., T).
 * Default is 'short'.
 * @event auroCalendar-dateSelected - Notifies that a date has been selected in the calendar.
 * @event auroCalendar-monthChanged - Notifies that the visible calendar month(s) have changed.
 */

/* eslint-disable no-magic-numbers, no-undef-init, max-lines, lit/binding-positions, lit/no-invalid-html */

// class AuroCalendar extends LitElement {
export class AuroCalendar extends RangeDatepicker {
  constructor() {
    super();

    /**
     * @private
     */
    this.util = new AuroDatepickerUtilities();

    /**
     * @private
     */
    this.utilCal = new CalendarUtilities();

    /**
     * @private
     */
    this.utilCalRender = new UtilitiesCalendarRender();

    this.calendarStartDate = undefined;
    this.calendarEndDate = undefined;
    this.centralDate = undefined;
    this.showPrevMonthBtn = true;
    this.showNextMonthBtn = true;

    /**
     * @private
     */
    this.firstMonthRenderable = undefined;

    /**
     * @private
     */
    this.calendarRangeMonths = null;

    /**
     * @private
     */
    this.numCalendars = undefined;


    this.visible = false;


    /**
     * @private
     */
    this.slots = {};

    const versioning = new AuroDependencyVersioning();

    /**
     * @private
     */
    this.bibtemplateTag = versioning.generateTag('auro-bibtemplate', bibTemplateVersion, AuroBibtemplate);

    /**
     * @private
     */
    this.dropdown = undefined;
  }

  static get styles() {
    return [
      styleCss,
      colorCss,
      tokensCss
    ];
  }

  static get properties() {
    return {
      numCalendars: {
        type: Number
      },
      dateFrom: {
        type: String
      },
      dateTo: {
        type: String
      },
      maxDate: {
        type: String,
        reflect: true
      },
      minDate: {
        type: String,
        reflect: true
      },
      calendarStartMonth: {
        type: String,
        reflect: true
      },
      calendarEndMonth: {
        type: String,
        reflect: true
      },
      centralDate: {
        type: String,
        reflect: true
      },
      visible: {
        type: Boolean,
        reflect: false
      },
      largeMobileHeadline: {
        type: Boolean,
        reflect: true
      },
      isFullscreen: {
        type: Boolean,
        reflect: true
      },

      /**
       * @private
       */
      monthFirst: {
        type: Boolean
      }
    };
  }

  /**
   * Updates the month and year when the user navigates to the previous calendar month.
   * @private
   * @returns {void}
   */
  handlePrevMonth() {
    this.utilCal.handleMonthChange(this, 'prev');
  }

  /**
   * Updates the month and year when the user navigates to the next calendar month.
   * @private
   * @returns {void}
   */
  handleNextMonth() {
    this.utilCal.handleMonthChange(this, 'next');
  }

  /**
   * Renders all of the auro-calendar-months HTML.
   * @private
   * @returns {Object} Returns the auro-calendar-months HTML.
   */
  renderAllCalendars() {
    let renderedHtml = undefined;
    if (this.visible) {
      this.utilCalRender.setFirstRenderableMonthDate(this);
      this.utilCal.assessNavigationButtonVisibility(this);

      const dropdown = AuroLibraryRuntimeUtils.prototype.closestElement('auro-dropdown, [auro-dropdown]', this);
      const dropdownbib = dropdown ? dropdown.bibContent : AuroLibraryRuntimeUtils.prototype.closestElement('auro-dropdownbib, [auro-dropdownbib]', this);
      this.isFullscreen = dropdownbib.hasAttribute('isFullscreen');
      this.utilCalRender.determineNumCalendarsToRender(this, this.isFullscreen);


      // Determine which month to render first
      let dateMatches = undefined;

      if (!this.isFullscreen && this.centralDate) {
        // On Desktop start the calendar at the central date if it exists, then minDate and finally the current date.
        if (this.centralDate) {
          dateMatches = this.util.datesMatch(this.firstRenderedMonth, this.util.convertDateToFirstOfMonth(this.centralDate));

          if (!dateMatches) {
            this.firstRenderedMonth = this.util.convertDateToFirstOfMonth(this.centralDate);
          }
        } else if (this.minDate) {
          dateMatches = this.util.datesMatch(this.firstRenderedMonth, this.util.convertDateToFirstOfMonth(this.minDate));

          if (!dateMatches) {
            this.firstRenderedMonth = this.util.convertDateToFirstOfMonth(this.minDate);
          }
        } else {
          const now = new Date();

          dateMatches = this.util.datesMatch(this.firstRenderedMonth, this.util.convertDateToFirstOfMonth(now));

          if (!dateMatches) {
            this.firstRenderedMonth = this.util.convertDateToFirstOfMonth(now);
          }
        }
      } else {
        // On mobile start the calendar at the previously determined first renderable month.
        this.firstRenderedMonth = this.firstMonthRenderable;
      }

      // Add the first calendar to the HTML
      const firstMonth = this.firstRenderedMonth.getMonth() + 1;
      const firstYear = this.firstRenderedMonth.getFullYear();

      renderedHtml = html`${renderedHtml}${this.utilCalRender.renderCalendar(this, firstMonth, firstYear)}`;

      // Loop through the number of remaining calendars to render and add the HTML
      let newMonthDate = undefined;

      for (let cal = 0; cal < this.numCalendars - 1; cal += 1) {

        const date = newMonthDate || this.firstRenderedMonth;

        const oldMonth = date.getMonth() + 1;
        const oldYear = date.getFullYear();

        let newMonth = undefined;
        let newYear = undefined;

        if (oldMonth === 12) {
          newMonth = 1;
          newYear = oldYear + 1;
        } else {
          newMonth = oldMonth + 1;
          newYear = oldYear;
        }

        const newMonthDateStr = `${newMonth}/1/${newYear}`;
        newMonthDate = new Date(newMonthDateStr);

        renderedHtml = html`${renderedHtml}${this.utilCalRender.renderCalendar(this, newMonth, newYear)}`;
      }
    }
    return renderedHtml;
  }

  /**
   * Request the calendar be scrolled to a given date.
   * @param {String} date - The date to scroll into view.
   * @returns {void}
   */
  scrollMonthIntoView(date) {
    this.utilCal.scrollMonthIntoView(this, date, this.format);
  }

  firstUpdated() {
    this.addEventListener('date-from-changed', () => {
      this.dispatchEvent(new CustomEvent('auroCalendar-dateSelected', {
        bubbles: true,
        cancelable: false,
        composed: true,
      }));
    });

    this.addEventListener('date-to-changed', () => {
      if (this.dateTo === null) {
        this.dateTo = undefined;
      }
      this.dispatchEvent(new CustomEvent('auroCalendar-dateSelected', {
        bubbles: true,
        cancelable: false,
        composed: true,
      }));
    });
  }

  injectSlot(slotName, nodes) {
    this.slots[slotName] = nodes;
  }

  updated(changedProperties) {
    if (changedProperties.has('noRange')) {
      this.noRangeChanged(this.noRange, changedProperties.get('noRange'));
    }

    if (changedProperties.has('narrow')) {
      this.dispatchEvent(new CustomEvent('narrow-changedProperties', { detail: { value: this.narrow } }));
    }

    if (changedProperties.has('locale')) {
      this.localeChanged();
    }

    if (changedProperties.has('centralDate')) {
      this.utilCal.centralDateChanged(this);
    }

    if (changedProperties.has('visible')) {
      setTimeout(() => this.requestUpdate());
    }
  }

  render() {
    return html`
    <${this.bibtemplateTag}
      ?large="${this.largeMobileHeadline}"
      ?isFullscreen="${this.isFullscreen}"
      @close-click="${this.utilCal.requestDismiss}">

      <span slot="header">${this.slots.mobileHeadline}</span>

      <div slot="subheader" class="mobileHeader">
        <div class="headerDateFrom">
          <span class="mobileDateLabel">${this.slots.mobileDateLabel}</span>
          <slot name="mobileDateFromStr"></slot>
        </div>
        <div class="headerDateTo"><slot name="mobileDateToStr"></slot></div>
      </div>

      <div class="calendarWrapper">

        <div class="calendars">
          ${this.renderAllCalendars()}
        </div>
        <div class="calendarNavButtons">
          ${this.showPrevMonthBtn ? html`
            <button class="calendarNavBtn prevMonth" @click="${this.handlePrevMonth}">
              ${this.util.generateIconHtml(chevronLeft)}
            </button>
          ` : undefined}
          ${this.showNextMonthBtn ? html`
            <button class="calendarNavBtn nextMonth" @click="${this.handleNextMonth}">
              ${this.util.generateIconHtml(chevronRight)}
            </button>
          ` : undefined}
        </div>
      </div>

      <auro-button slot="footer" fluid @click="${this.utilCal.requestDismiss}">Done</auro-button>
    </${this.bibtemplateTag}>
    `;
  }
}

if (!customElements.get('auro-calendar')) {
  customElements.define('auro-calendar', AuroCalendar);
}

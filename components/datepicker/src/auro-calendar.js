import { html } from "lit/static-html.js";

import styleCss from './styles/style-auro-calendar-css.js';
import colorCss from './styles/color-calendar-css.js';
import tokensCss from './styles/tokens-css.js';

import './auro-calendar-month.js';
import { RangeDatepicker } from './vendor/wc-range-datepicker/range-datepicker.js';
import chevronLeft from '@alaskaairux/icons/dist/icons/interface/chevron-left.mjs';
import chevronRight from '@alaskaairux/icons/dist/icons/interface/chevron-right.mjs';

import { AuroDependencyVersioning } from '@aurodesignsystem/auro-library/scripts/runtime/dependencyTagVersioning.mjs';

import { AuroDatepickerUtilities } from './utilities.js';
import { CalendarUtilities } from './utilitiesCalendar.js';
import { UtilitiesCalendarRender } from './utilitiesCalendarRender.js';

import { AuroBibtemplate } from '@aurodesignsystem/auro-bibtemplate';
import formkitVersion from '@aurodesignsystem/version';

import { AuroButton } from "@aurodesignsystem/auro-button/class";
import buttonVersion from './buttonVersion.js';

/* eslint-disable no-magic-numbers, no-undef-init, max-lines, lit/binding-positions, lit/no-invalid-html */


// See https://git.io/JJ6SJ for "How to document your components using JSDoc"
/**
 * @event auroCalendar-dateSelected - Notifies that a date has been selected in the calendar.
 * @event auroCalendar-monthChanged - Notifies that the visible calendar month(s) have changed.
 */
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

    this.visible = false;
    this.largeFullscreenHeadline = false;
    this.isFullscreen = false;

    /**
     * The date of the currently active cell (Unix timestamp).
     * Only one cell across the entire calendar has tabindex="0" at a time.
     * @private
     */
    this.activeCellDate = null;

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

    /**
     * @private
     */
    this.slots = {};

    const versioning = new AuroDependencyVersioning();

    /**
     * @private
     */
    this.bibtemplateTag = versioning.generateTag('auro-formkit-datepicker-bibtemplate', formkitVersion, AuroBibtemplate);

    /**
     * @private
     */
    this.buttonTag = versioning.generateTag('auro-formkit-datepicker-button', buttonVersion, AuroButton);

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
      /**
       * The last month that may be displayed in the calendar.
       */
      calendarEndMonth: {
        type: String,
        reflect: true
      },

      /**
       * The first month that may be displayed in the calendar.
       */
      calendarStartMonth: {
        type: String,
        reflect: true
      },

      /**
       * The date that determines the currently visible month.
       */
      centralDate: {
        type: String,
        reflect: true
      },

      /**
       * The starting date of the selected range.
       */
      dateFrom: {
        type: String
      },

      /**
       * The ending date of the selected range.
       */
      dateTo: {
        type: String
      },

      /**
       * Dropdown element that contains the calendar.
       * @private
       */
      dropdown: {
        type: Object
      },

      /**
       * Flag indicating if the calendar is in fullscreen mode.
       */
      isFullscreen: {
        type: Boolean,
        reflect: true
      },

      /**
       * If declared, make bib.fullscreen.headline in HeadingDisplay.
       * Otherwise, Heading 600.
       */
      largeFullscreenHeadline: {
        type: Boolean,
        reflect: true
      },

      /**
       * Maximum date. All dates after will be disabled.
       */
      maxDate: {
        type: String,
        reflect: true
      },

      /**
       * Minimum date. All dates before will be disabled.
       */
      minDate: {
        type: String,
        reflect: true
      },

      /**
       * Mobile breakpoint for responsive design.
       * @private
       */
      mobileBreakpoint: {
        type: Number,
        reflect: false
      },

      /**
       * @private
       */
      monthFirst: {
        type: Boolean
      },

      /**
       * Number of calendars to render.
       * @private
       */
      numCalendars: {
        type: Number
      },

      /**
       * Flag indicating if the calendar is visible.
       */
      visible: {
        type: Boolean,
        reflect: false
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

      this.isFullscreen = this.dropdown.bibContent.hasAttribute('isFullscreen');
      this.utilCalRender.determineNumCalendarsToRender(this, this.isFullscreen);

      // Determine which month to render first
      let dateMatches = undefined;

      if (!this.isFullscreen) {
        const formattedDateStr = this.util.getDateAsString(new Date(this.centralDate), this.datepicker.format);

        // On Desktop start the calendar at the central date if it exists, then minDate and finally the current date.
        if (this.util.validDateStr(formattedDateStr, this.datepicker.format)) {
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

        const newMonthDateStr = `${newMonth}/01/${newYear}`;
        newMonthDate = new Date(newMonthDateStr);

        renderedHtml = html`${renderedHtml}${this.utilCalRender.renderCalendar(this, newMonth, newYear)}`;
      }
    }

    return renderedHtml;
  }

  /**
   * Focuses the close button inside the calendar's bibtemplate.
   * Used by datepicker to set initial focus when the fullscreen dialog opens.
   * @returns {void}
   */
  focusCloseButton() {
    const bibtemplate = this.shadowRoot.querySelector(this.bibtemplateTag._$litStatic$);
    if (bibtemplate) bibtemplate.focusCloseButton();
  }

  /**
   * Request the calendar be scrolled to a given date.
   * @param {String} date - The date to scroll into view.
   * @returns {void}
   */
  scrollMonthIntoView(date) {
    this.utilCal.scrollMonthIntoView(this, date, this.format);
  }

  /**
   * Gets all rendered month components.
   * @private
   * @returns {Array} Array of auro-formkit-calendar-month elements.
   */
  getMonthComponents() {
    return Array.from(this.shadowRoot.querySelectorAll('auro-formkit-calendar-month'));
  }

  /**
   * Gets all focusable cells across all rendered months.
   * @private
   * @returns {Array} Array of auro-formkit-calendar-cell elements.
   */
  getAllFocusableCells() {
    const months = this.getMonthComponents();
    let cells = [];
    months.forEach(month => {
      cells = cells.concat(month.getFocusableCells());
    });
    return cells;
  }

  /**
   * Sets the active cell across all months. Only one cell has tabindex="0" at a time.
   * @param {Number} date - Unix timestamp of the cell to activate.
   * @returns {void}
   */
  setActiveCell(date) {
    const allCells = this.getAllFocusableCells();

    allCells.forEach(cell => {
      cell.active = cell.day && cell.day.date === date;
    });

    this.activeCellDate = date;
  }

  /**
   * Focuses the currently active cell. If activeCellDate is set but no cell
   * has the active attribute yet, sets it first. Waits for the cell's render
   * to complete so the focused button is the final DOM element.
   * @returns {void}
   */
  focusActiveCell() {
    if (this.activeCellDate != null) {
      this.setActiveCell(this.activeCellDate);
    }

    const allCells = this.getAllFocusableCells();
    const activeCell = allCells.find(cell => cell.active);
    if (activeCell) {
      activeCell.updateComplete.then(() => {
        activeCell.focusButton();
      });
    }
  }

  /**
   * Computes the initial active date from data properties alone — no DOM required.
   * Priority:
   *   1. Selected date (dateFrom) if within range
   *   2. Today's date if not disabled (in-range and not blackout)
   *   3. First future non-disabled date (scans day-by-day from today up to 1 year)
   *   4. First previous non-disabled date (scans day-by-day from today up to 1 year)
   *   5. undefined — no valid target
   *
   * @private
   * @returns {Number|undefined} Unix timestamp (seconds) of the date to activate, or undefined.
   */
  computeActiveDate() {
    const ONE_DAY = 86400; // seconds
    const MAX_SCAN_DAYS = 366; // scan at most ~1 year in each direction

    const rawMin = Number(this.min);
    const rawMax = Number(this.max);

    // When min/max are NaN (no minDate/maxDate configured), treat as unbounded.
    const minTs = Number.isFinite(rawMin) ? rawMin : -Infinity;
    const maxTs = Number.isFinite(rawMax) ? rawMax : Infinity;

    // Build a Set of blackout timestamps for O(1) lookup.
    const blackoutSet = new Set(
      (this.disabledDays || []).map(d => parseInt(d, 10))
    );

    /**
     * A date (unix timestamp in seconds, midnight-aligned) is "enabled" when
     * it is within [min, max] AND not a blackout day.
     */
    const isEnabled = (ts) => ts >= minTs && ts <= maxTs && !blackoutSet.has(ts);

    /**
     * A date is "in range" (focusable in the grid) when it is within [min, max].
     * Blackout dates are focusable but not selectable.
     */
    const isInRange = (ts) => ts >= minTs && ts <= maxTs;

    // 1. Selected date — always valid target if within range (user chose it).
    if (this.dateFrom) {
      const parsedFrom = parseInt(this.dateFrom, 10);
      if (Number.isFinite(parsedFrom) && isInRange(parsedFrom)) return parsedFrom;
    }

    // 2. Today's date (midnight-aligned) if enabled.
    const now = Math.floor(new Date().setHours(0, 0, 0, 0) / 1000);

    if (isEnabled(now)) return now;

    // 3. First future enabled date (scan forward from tomorrow, capped by max and MAX_SCAN_DAYS).
    const scanMax = Number.isFinite(maxTs)
      ? Math.min(maxTs, now + (MAX_SCAN_DAYS * ONE_DAY))
      : now + (MAX_SCAN_DAYS * ONE_DAY);

    for (let ts = now + ONE_DAY; ts <= scanMax; ts += ONE_DAY) {
      if (isEnabled(ts)) return ts;
    }

    // 4. First previous enabled date (scan backward from yesterday, capped by min and MAX_SCAN_DAYS).
    const scanMin = Number.isFinite(minTs)
      ? Math.max(minTs, now - (MAX_SCAN_DAYS * ONE_DAY))
      : now - (MAX_SCAN_DAYS * ONE_DAY);

    for (let ts = now - ONE_DAY; ts >= scanMin; ts -= ONE_DAY) {
      if (isEnabled(ts)) return ts;
    }

    // 5. If scans missed (e.g. min/max range is far from today), fall back to
    //    the first enabled date in the [min, max] range.
    if (Number.isFinite(minTs) && Number.isFinite(maxTs)) {
      for (let ts = minTs; ts <= maxTs; ts += ONE_DAY) {
        if (isEnabled(ts)) return ts;
      }
    }

    return undefined;
  }

  /**
   * Handles cross-month boundary navigation events from month components.
   * @private
   * @param {CustomEvent} event - The boundary event with direction and source date info.
   * @returns {void}
   */
  handleMonthBoundary(event) {
    const { direction, fromDate, key } = event.detail;

    if (key === 'ArrowRight' || key === 'ArrowLeft') {
      // Linear navigation: find adjacent focusable cell across months
      const allCells = this.getAllFocusableCells();
      const currentIndex = allCells.findIndex(cell => cell.day && cell.day.date === fromDate);

      if (currentIndex === -1) return;

      let targetIndex;
      if (direction === 'next') {
        targetIndex = currentIndex + 1;
      } else {
        targetIndex = currentIndex - 1;
      }

      if (targetIndex >= 0 && targetIndex < allCells.length) {
        const targetCell = allCells[targetIndex];
        this.setActiveCell(targetCell.day.date);
        this.scrollToActiveCell();
        this.focusActiveCell();
      } else if (direction === 'next' && this.showNextMonthBtn) {
        // Navigate to next month and try again
        this.handleNextMonth();
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const cells = this.getAllFocusableCells();
            if (cells.length > 0) {
              this.setActiveCell(cells[0].day.date);
              this.focusActiveCell();
            }
          });
        });
      } else if (direction === 'prev' && this.showPrevMonthBtn) {
        // Navigate to previous month and try again
        this.handlePrevMonth();
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const cells = this.getAllFocusableCells();
            if (cells.length > 0) {
              this.setActiveCell(cells[cells.length - 1].day.date);
              this.focusActiveCell();
            }
          });
        });
      }
    } else if (key === 'ArrowDown' || key === 'ArrowUp') {
      // Vertical navigation: find same day-of-week +/- 7 days
      const increment = key === 'ArrowDown' ? 7 : -7;
      const targetDate = fromDate + (increment * 86400);

      const allCells = this.getAllFocusableCells();
      let targetCell = allCells.find(cell => cell.day && cell.day.date === targetDate);

      if (targetCell) {
        this.setActiveCell(targetCell.day.date);
        this.scrollToActiveCell();
        this.focusActiveCell();
      } else {
        // Target might be in an unrendered month, navigate there
        const navDirection = key === 'ArrowDown' ? 'next' : 'prev';
        if ((navDirection === 'next' && this.showNextMonthBtn) || (navDirection === 'prev' && this.showPrevMonthBtn)) {
          if (navDirection === 'next') {
            this.handleNextMonth();
          } else {
            this.handlePrevMonth();
          }
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              const cells = this.getAllFocusableCells();
              const target = cells.find(cell => cell.day && cell.day.date === targetDate);
              if (target) {
                this.setActiveCell(target.day.date);
                this.focusActiveCell();
              } else if (cells.length > 0) {
                // Clamp to nearest focusable cell
                const nearest = navDirection === 'next' ? cells[0] : cells[cells.length - 1];
                this.setActiveCell(nearest.day.date);
                this.focusActiveCell();
              }
            });
          });
        }
      }
    }
  }

  /**
   * Handles cell activation events from month components.
   * @private
   * @param {CustomEvent} event - The activation event with target date.
   * @returns {void}
   */
  handleCellActivate(event) {
    const { date } = event.detail;
    this.setActiveCell(date);
    this.focusActiveCell();
  }

  /**
   * Scrolls the calendar to ensure the month containing the active cell is visible.
   * @private
   * @returns {void}
   */
  scrollToActiveCell() {
    if (this.activeCellDate == null) return;

    const date = new Date(this.activeCellDate * 1000);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const selector = `#month-${month}-${year}`;
    const monthElem = this.shadowRoot.querySelector(selector);

    if (monthElem) {
      monthElem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }

  /**
   * Announces a date selection via the live region.
   * @private
   * @param {String} dateStr - The localized date string to announce.
   * @returns {void}
   */
  announceSelection(dateStr) {
    const liveRegion = this.shadowRoot.querySelector('#calendar-live-region');
    if (liveRegion) {
      liveRegion.textContent = '';
      // Use microtask to ensure SR picks up the change
      Promise.resolve().then(() => {
        liveRegion.textContent = dateStr;
      });
    }
  }

  /**
   * Formats a Unix timestamp (seconds) as a localized date string for SR announcements.
   * @private
   * @param {String|Number} timestamp - Unix timestamp in seconds.
   * @returns {String} Localized date string.
   */
  formatAnnouncementDate(timestamp) {
    const date = new Date(parseInt(timestamp, 10) * 1000);
    const formatter = new Intl.DateTimeFormat(undefined, {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
    return formatter.format(date);
  }

  firstUpdated() {
    this.addEventListener('date-from-changed', () => {
      this.dispatchEvent(new CustomEvent('auroCalendar-dateSelected', {
        bubbles: true,
        cancelable: false,
        composed: true,
      }));

      // Announce selection via live region
      if (this.dateFrom) {
        this.announceSelection(this.formatAnnouncementDate(this.dateFrom));
      }
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

      // Announce end date selection via live region
      if (this.dateTo) {
        this.announceSelection(this.formatAnnouncementDate(this.dateTo));
      }
    });

    // Listen for cross-month boundary navigation events
    this.addEventListener('calendar-month-boundary', (event) => {
      this.handleMonthBoundary(event);
    });

    // Listen for cell activation events
    this.addEventListener('calendar-cell-activate', (event) => {
      this.handleCellActivate(event);
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
      if (this.visible) {
        // Compute the active date eagerly from data — no DOM needed.
        if (this.activeCellDate == null) {
          this.activeCellDate = this.computeActiveDate();
        }

        this.requestUpdate();
      } else {
        this.requestUpdate();
      }
    }
  }

  render() {
    return html`
    <${this.bibtemplateTag}
      ?large="${this.largeFullscreenHeadline}"
      ?isFullscreen="${this.isFullscreen}"
      ?showFooter="${!this.isFullscreen && this.dropdown?.desktopModal}"
      @close-click="${this.utilCal.requestDismiss}">
      <span slot="ariaLabel.close">${this.slots["ariaLabel.bib.close"]}</span>

      ${this.slots["bib.fullscreen.headline"] ? html`<span slot="header">${this.slots["bib.fullscreen.headline"]}</span>` : ''}

      <div slot="subheader" class="mobileHeader">
        <div class="headerDateFrom">
          ${this.slots["bib.fullscreen.dateLabel"] ? html`<span class="mobileDateLabel body-xs">${this.slots["bib.fullscreen.dateLabel"]}</span>` : ''}
          ${this.slots["bib.fullscreen.fromLabel"] ? html`<span class="mobileDateLabel body-xs">${this.slots["bib.fullscreen.fromLabel"]}</span>` : ''}
          <slot name="bib.fullscreen.fromStr"></slot>
        </div>
        <div class="headerDateTo">
          ${this.slots["bib.fullscreen.toLabel"] ? html`<span class="mobileDateLabel body-xs">${this.slots["bib.fullscreen.toLabel"]}</span>` : ''}
          <slot name="bib.fullscreen.toStr"></slot>
        </div>
      </div>

      <div class="calendarWrapper ${!this.isFullscreen && this.dropdown?.desktopModal ? 'hasFooter' : ''}">
        <div class="calendarNavButtons">
          ${this.showPrevMonthBtn ? html`
          <button tabIndex="0" class="calendarNavBtn prevMonth" aria-label="${this.datepicker?.navLabelPrevMonth || 'Previous month'}" @click="${this.handlePrevMonth}">
            ${this.util.generateIconHtml(chevronLeft)}
          </button>
          ` : undefined}
          ${this.showNextMonthBtn ? html`
          <button tabIndex="0" class="calendarNavBtn nextMonth" aria-label="${this.datepicker?.navLabelNextMonth || 'Next month'}" @click="${this.handleNextMonth}">
            ${this.util.generateIconHtml(chevronRight)}
          </button>
          ` : undefined}
        </div>
        <div class="calendars">
          ${this.renderAllCalendars()}
        </div>
      </div>

      <div id="calendar-live-region" aria-live="assertive" aria-atomic="true" class="sr-only"></div>

      <${this.buttonTag} slot="footer" fluid @click="${this.utilCal.requestDismiss}">Done</${this.buttonTag}>
    </${this.bibtemplateTag}>
    `;
  }
}

if (!customElements.get('auro-formkit-calendar')) {
  customElements.define('auro-formkit-calendar', AuroCalendar);
}

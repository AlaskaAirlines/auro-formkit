import { html } from "lit/static-html.js";

import styleCss from './styles/style-auro-calendar-css.js';
import colorCss from './styles/color-calendar-css.js';
import tokensCss from './styles/tokens-css.js';

import './auro-calendar-month.js';
import { RangeDatepicker } from './vendor/wc-range-datepicker/range-datepicker.js';
import chevronLeft from '@alaskaairux/icons/dist/icons/interface/chevron-left.mjs';
import chevronRight from '@alaskaairux/icons/dist/icons/interface/chevron-right.mjs';

import { AuroDependencyVersioning } from '@aurodesignsystem/auro-library/scripts/runtime/dependencyTagVersioning.mjs';

import { dateFormatter } from '@aurodesignsystem/auro-library/scripts/runtime/dateUtilities/dateFormatter.mjs';
import { AuroDatepickerUtilities } from './utilities.js';
import { CalendarUtilities } from './utilitiesCalendar.js';
import { UtilitiesCalendarRender } from './utilitiesCalendarRender.js';

import { AuroBibtemplate } from '@aurodesignsystem/auro-bibtemplate';
import formkitVersion from '@aurodesignsystem/version';

import { AuroButton } from "@aurodesignsystem/auro-button/class";
import buttonVersion from './buttonVersion.js';

/* eslint-disable no-magic-numbers, complexity, line-comment-position, no-undef-init, max-lines, line-comment-position, no-underscore-dangle, lit/binding-positions, lit/no-invalid-html, no-inline-comments */


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
     * Whether the #calendarGrid wrapper currently has focus.
     * Used to determine whether the visualFocus ring should be shown.
     * @private
     */
    this._gridHasFocus = false;

    /**
     * @private
     */
    this.firstMonthRenderable = undefined;

    /**
     * @private
     */
    this.calendarRangeMonths = null;

    /**
     * Legacy array of disabled-date timestamps.
     * @private
     */
    this.disabledDays = [];

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

    /**
     * Unique instance ID for the live region element.
     * @private
     */
    this._calendarInstanceId = Date.now().toString(36);
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
       * If true, the month will be displayed before the year in the calendar header.
       * Passed to AuroCalendarMonth via utilitesCalendarRender.
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
      },

      /**
       * BCP 47 locale tag (such as `en-US`) for calendar localization.
       * as wc-range-datepicker expects a `locale` prop, we use `localeCode` to avoid conflicts and pass the locale down to calendar-month elements.
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

  // ─── Read-only *Object properties ─────────────────────────────────────────

  /** @returns {Date|undefined} */
  get centralDateObject() {
    return this.centralDate && dateFormatter.isValidDate(this.centralDate) ? dateFormatter.stringToDateInstance(this.centralDate) : undefined;
  }

  /** @returns {Date|undefined} */
  get minDateObject() {
    return this.minDate && dateFormatter.isValidDate(this.minDate) ? dateFormatter.stringToDateInstance(this.minDate) : undefined;
  }

  /** @returns {Date|undefined} */
  get maxDateObject() {
    return this.maxDate && dateFormatter.isValidDate(this.maxDate) ? dateFormatter.stringToDateInstance(this.maxDate) : undefined;
  }

  /**
   * Updates the month and year when the user navigates to the previous calendar month.
   * @private
   * @param {Object} [options] - Optional settings.
   * @param {boolean} [options.skipActiveUpdate=false] - When true, skip the active cell
   *   recomputation. Used by arrow key handlers that manage the active cell themselves.
   * @returns {void}
   */
  handlePrevMonth(options) {
    const opts = options instanceof Event ? {} : options || {};
    this.clearRangePreview({ force: true });
    this.utilCal.handleMonthChange(this, 'prev');
    if (!opts.skipActiveUpdate) {
      this.updateActiveCellForVisibleMonth();
    }
    this.announceMonthChange();
  }

  /**
   * Updates the month and year when the user navigates to the next calendar month.
   * @private
   * @param {Object} [options] - Optional settings.
   * @param {boolean} [options.skipActiveUpdate=false] - When true, skip the active cell
   *   recomputation. Used by arrow key handlers that manage the active cell themselves.
   * @returns {void}
   */
  handleNextMonth(options) {
    const opts = options instanceof Event ? {} : options || {};
    this.clearRangePreview({ force: true });
    this.utilCal.handleMonthChange(this, 'next');
    if (!opts.skipActiveUpdate) {
      this.updateActiveCellForVisibleMonth();
    }
    this.announceMonthChange();
  }

  /**
   * Announces the current month and year via the live region after navigation.
   * @private
   * @returns {void}
   */
  announceMonthChange() {
    // Cancel any pending debounced cell announcement so it does not
    // overwrite this month navigation announcement.
    if (this._focusAnnounceTimer) {
      clearTimeout(this._focusAnnounceTimer);
      this._focusAnnounceTimer = null;
    }

    const date = this.centralDateObject;
    const formatter = new Intl.DateTimeFormat(this.localeCode, { month: 'long',
      year: 'numeric' });
    this.announceSelection(formatter.format(date));
  }

  /**
   * Updates the active cell after month navigation (prev/next buttons).
   * Always moves the active cell to the first enabled date in the newly
   * visible months so that tabbing back to the grid lands on an enabled cell.
   * @private
   * @returns {void}
   */
  updateActiveCellForVisibleMonth() {
    // Use double-rAF to ensure child month/cell components have fully
    // rendered and cached their button references before we set tabindex.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const newDate = this.computeActiveDate({ skipDateFrom: true });

        if (newDate !== null && newDate !== undefined) {
          this.activeCellDate = newDate;
          this.setActiveCell(this.activeCellDate);
        }
      });
    });
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
        // On Desktop start the calendar at the central date if it exists, then minDate and finally the current date.
        if (this.centralDateObject) {
          dateMatches = this.util.datesMatch(this.firstRenderedMonth, this.util.convertDateToFirstOfMonth(this.centralDateObject));

          if (!dateMatches) {
            this.firstRenderedMonth = this.util.convertDateToFirstOfMonth(this.centralDateObject);
          }
        } else if (this.minDateObject) {
          dateMatches = this.util.datesMatch(this.firstRenderedMonth, this.util.convertDateToFirstOfMonth(this.minDateObject));

          if (!dateMatches) {
            this.firstRenderedMonth = this.util.convertDateToFirstOfMonth(this.minDateObject);
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

        const newMonthDateStr = `${String(newMonth).padStart(2, '0')}/01/${newYear}`;
        newMonthDate = dateFormatter.stringToDateInstance(newMonthDateStr, 'mm/dd/yyyy');

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
    if (bibtemplate) {
      bibtemplate.focusCloseButton();
    }
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
    months.forEach((month) => {
      cells = cells.concat(month.getFocusableCells());
    });
    return cells;
  }

  /**
   * Sets the active cell across all months. Only one cell has tabindex="0" at a time.
   * Uses imperative DOM manipulation — no Lit re-render triggered. DOM focus
   * stays on the grid wrapper; the live region (see getOrCreateLiveRegion)
   * is what announces the active cell to assistive tech.
   * @param {Number} date - Unix timestamp of the cell to activate.
   * @returns {void}
   */
  setActiveCell(date) {
    const allCells = this.getAllFocusableCells();

    let newActiveCell = null;
    allCells.forEach((cell) => {
      if (cell.day && cell.day.date === date) {
        cell.setActive();
        newActiveCell = cell;
      } else if (cell.active) {
        cell.clearActive();
      }
    });

    this.activeCellDate = date;

    // Apply activeCell ring only when the grid currently has focus.
    if (newActiveCell && this._gridHasFocus) {
      const btn = newActiveCell._cachedButton || newActiveCell.shadowRoot.querySelector('button.day');
      if (btn) {
        btn.classList.add('activeCell');
      }
    }
  }

  /**
   * Focuses the calendar grid wrapper and sets the active cell.
   * DOM focus stays on the grid wrapper; the aria-live region
   * tells the screen reader which cell is "active".
   * @returns {void}
   */
  focusActiveCell() {
    if (this.activeCellDate !== null && this.activeCellDate !== undefined) {
      this.setActiveCell(this.activeCellDate);
    }

    const gridWrapper = this.shadowRoot.querySelector('#calendarGrid');
    if (gridWrapper) {
      gridWrapper.focus({ preventScroll: true,
        focusVisible: true });
    }
  }

  /**
   * Shows the activeCell ring when the grid gains focus.
   * @private
   * @returns {void}
   */
  handleGridFocusIn() {
    this._gridHasFocus = true;
    const activeCell = this.getAllFocusableCells().find((cell) => cell.active);
    if (activeCell) {
      const btn = activeCell._cachedButton || activeCell.shadowRoot.querySelector('button.day');
      if (btn) {
        btn.classList.add('activeCell');
      }
    }
  }

  /**
   * Hides the activeCell ring when the grid loses focus.
   * @private
   * @returns {void}
   */
  handleGridFocusOut() {
    this._gridHasFocus = false;
    // Remove activeCell from ALL cells to prevent stale rings.
    const allCells = this.getAllFocusableCells();
    for (const cell of allCells) {
      const btn = cell._cachedButton || cell.shadowRoot.querySelector('button.day');
      if (btn) {
        btn.classList.remove('activeCell');
      }
    }
    // Clear range hover preview so no highlight lingers after focus leaves the grid.
    this.clearRangePreview();
  }

  /**
   * Computes the initial active date from data properties alone — no DOM required.
   * Priority:
   *   1. Selected date (dateFrom) if within range
   *   2. Today's date if not disabled (in-range and not blackout)
   *   3. First future non-disabled date (scans day-by-day from today up to 1 year)
   *   4. First previous non-disabled date (scans day-by-day from today up to 1 year)
   *   5. First enabled date in finite [min, max] range
   *   5b. First enabled date scanning forward from finite min (unbounded max)
   *   5c. First enabled date scanning backward from finite max (unbounded min)
   *   6. First in-range date (even if blackout) so focus can land somewhere
   *   7. Undefined — no valid target.
   *
   * @private
   * @param {Object} [options] - Optional settings.
   * @param {boolean} [options.skipDateFrom=false] - When true, skip the selected-date
   *   shortcut (step 1). Used after month navigation so the active cell lands in the
   *   newly visible month instead of jumping back to the selected date's month.
   * @returns {Number|undefined} Unix timestamp (seconds) of the date to activate, or undefined.
   */
  computeActiveDate(options = {}) {
    const MAX_SCAN_DAYS = 366; // scan at most ~1 year in each direction

    /**
     * Adds days to a timestamp using Date arithmetic to handle DST correctly.
     * Returns a local-midnight-aligned timestamp in seconds.
     * @param {Number} ts - Unix timestamp in seconds.
     * @param {Number} days - Number of days to add.
     * @returns {Number} The adjusted timestamp in seconds.
     */
    const addDays = (ts, days) => {
      const date = new Date(ts * 1000);
      date.setDate(date.getDate() + days);
      date.setHours(0, 0, 0, 0);
      return Math.floor(date.getTime() / 1000);
    };

    const rawMin = this.minDateObject?.getTime() / 1000;
    const rawMax = this.maxDateObject?.getTime() / 1000;

    // When min/max are NaN (no minDate/maxDate configured), treat as unbounded.
    const minTs = Number.isFinite(rawMin) ? rawMin : -Infinity;
    const maxTs = Number.isFinite(rawMax) ? rawMax : Infinity;

    // Build a Set of blackout timestamps for O(1) lookup.
    const blackoutSet = new Set(this.disabledDays.map((day) => parseInt(day, 10)));

    // Also include ISO-format blackoutDates from the datepicker if available.
    // Parse YYYY-MM-DD as local date to avoid UTC shift issues.
    const isoBlackouts = this.datepicker?.blackoutDates;
    if (Array.isArray(isoBlackouts)) {
      for (const isoStr of isoBlackouts) {
        const parts = isoStr.split('-');
        const ts = Math.floor(new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10)).getTime() / 1000);
        if (Number.isFinite(ts)) {
          blackoutSet.add(ts);
        }
      }
    }

    /**
     * A date (unix timestamp in seconds, midnight-aligned) is "enabled" when
     * it is within [min, max] AND not a blackout day.
     * @param {Number} ts - Unix timestamp in seconds.
     * @returns {boolean} True if the date is enabled.
     */
    const isEnabled = (ts) => ts >= minTs && ts <= maxTs && !blackoutSet.has(ts);

    /**
     * A date is "in range" (focusable in the grid) when it is within [min, max].
     * Blackout dates are focusable but not selectable.
     * @param {Number} ts - Unix timestamp in seconds.
     * @returns {boolean} True if the date is in range.
     */
    const isInRange = (ts) => ts >= minTs && ts <= maxTs;

    // 1. Selected date — always valid target if within range (user chose it).
    //    Skipped when called from month navigation so the active cell lands in
    //    the newly visible month rather than the (possibly off-screen) selection.
    if (!options.skipDateFrom && this.dateFrom) {
      const parsedFrom = parseInt(this.dateFrom, 10);
      if (Number.isFinite(parsedFrom) && isInRange(parsedFrom)) {
        return parsedFrom;
      }
    }

    // 2. Today's date (midnight-aligned) if enabled.
    const now = Math.floor(new Date().setHours(0, 0, 0, 0) / 1000);

    // When centralDate is configured, prefer a date within the month(s) that
    // will actually be rendered. If today falls outside the visible range, an
    // active cell set to today would have no matching DOM element and keyboard
    // focus could not enter the calendar.

    if (this.centralDateObject) {
      const centralMonth = this.centralDateObject.getMonth();
      const centralYear = this.centralDateObject.getFullYear();
      const todayDate = new Date(now * 1000);
      const todayMonth = todayDate.getMonth();
      const todayYear = todayDate.getFullYear();

      // Today is outside the centralDate's month — scan for an enabled date
      // within the visible month instead.
      if (todayMonth !== centralMonth || todayYear !== centralYear) {
        const visibleStart = new Date(centralYear, centralMonth, 1);
        visibleStart.setHours(0, 0, 0, 0);
        const visibleEnd = new Date(centralYear, centralMonth + 1, 0); // last day of month
        visibleEnd.setHours(0, 0, 0, 0);
        const startTs = Math.floor(visibleStart.getTime() / 1000);
        const daysInMonth = visibleEnd.getDate();

        for (let idx = 0; idx < daysInMonth; idx += 1) {
          const ts = addDays(startTs, idx);
          if (isEnabled(ts)) {
            return ts;
          }
        }

        // No enabled date in the visible month — fall back to first in-range
        // date in the month so focus still lands on a focusable cell.
        for (let idx = 0; idx < daysInMonth; idx += 1) {
          const ts = addDays(startTs, idx);
          if (isInRange(ts)) {
            return ts;
          }
        }
      }
    }

    if (isEnabled(now)) {
      return now;
    }

    // When a centralDate is configured (or inferred), constrain the scan to the
    // rendered month(s) first so a single-month calendar does not pick a date
    // that has no DOM cell. Determine the visible range based on centralDate and
    // the number of rendered months.
    const renderedMonths = Math.max(this.numCalendars, 1);
    const visibleAnchor = this.centralDateObject ?? new Date(now * 1000);
    const visMonthStart = new Date(visibleAnchor.getFullYear(), visibleAnchor.getMonth(), 1);
    visMonthStart.setHours(0, 0, 0, 0);
    const visMonthEnd = new Date(visibleAnchor.getFullYear(), visibleAnchor.getMonth() + renderedMonths, 0);
    visMonthEnd.setHours(0, 0, 0, 0);
    const visStartTs = Math.floor(visMonthStart.getTime() / 1000);
    const visEndTs = Math.floor(visMonthEnd.getTime() / 1000);
    const visDays = Math.round((visEndTs - visStartTs) / 86400) + 1;

    // Scan visible months for an enabled date.
    for (let idx = 0; idx < visDays; idx += 1) {
      const ts = addDays(visStartTs, idx);
      if (isEnabled(ts)) {
        return ts;
      }
    }

    // No enabled date in visible months — try an in-range (focusable) date so
    // keyboard focus still has a tabindex="0" target.
    for (let idx = 0; idx < visDays; idx += 1) {
      const ts = addDays(visStartTs, idx);
      if (isInRange(ts)) {
        return ts;
      }
    }

    // 3. First future enabled date (scan forward from tomorrow, capped by max and MAX_SCAN_DAYS).
    for (let idx = 1; idx <= MAX_SCAN_DAYS; idx += 1) {
      const ts = addDays(now, idx);
      if (Number.isFinite(maxTs) && ts > maxTs) {
        break;
      }
      if (isEnabled(ts)) {
        return ts;
      }
    }

    // 4. First previous enabled date (scan backward from yesterday, capped by min and MAX_SCAN_DAYS).
    for (let idx = 1; idx <= MAX_SCAN_DAYS; idx += 1) {
      const ts = addDays(now, -idx);
      if (Number.isFinite(minTs) && ts < minTs) {
        break;
      }
      if (isEnabled(ts)) {
        return ts;
      }
    }

    // 5. If scans missed (e.g. min/max range is far from today), fall back to
    //    the first enabled date in the [min, max] range.
    if (Number.isFinite(minTs) && Number.isFinite(maxTs)) {
      let ts = minTs;
      for (let idx = 0; ts <= maxTs; idx += 1) {
        if (isEnabled(ts)) {
          return ts;
        }
        ts = addDays(minTs, idx + 1);
      }
    }

    // 5b. Finite min with unbounded max (e.g. minDate far in the future):
    //     scan forward from min for up to MAX_SCAN_DAYS.
    if (Number.isFinite(minTs) && !Number.isFinite(maxTs)) {
      for (let idx = 0; idx <= MAX_SCAN_DAYS; idx += 1) {
        const ts = addDays(minTs, idx);
        if (isEnabled(ts)) {
          return ts;
        }
      }
    }

    // 5c. Unbounded min with a finite max far in the past (e.g. birth-date picker):
    //     scan backward from max for up to MAX_SCAN_DAYS.
    if (!Number.isFinite(minTs) && Number.isFinite(maxTs)) {
      for (let idx = 0; idx <= MAX_SCAN_DAYS; idx += 1) {
        const ts = addDays(maxTs, -idx);
        if (isEnabled(ts)) {
          return ts;
        }
      }
    }

    // 6. All dates are blackout — fall back to the first in-range date so focus
    //    still lands on a focusable (but not selectable) cell.
    if (Number.isFinite(minTs) && isInRange(minTs)) {
      return minTs;
    }
    if (isInRange(now)) {
      return now;
    }

    return undefined;
  }

  /**
   * Checks if a target date (unix seconds) is within the configured [min, max] range.
   * Returns false if the date falls outside the range, preventing navigation
   * to months where all dates are disabled.
   * @private
   * @param {Number} targetTs - Unix timestamp in seconds.
   * @returns {Boolean} True if the date is within range.
   */
  isDateInRange(targetTs) {
    const rawMin = this.minDateObject?.getTime() / 1000;
    const rawMax = this.maxDateObject?.getTime() / 1000;
    if (Number.isFinite(rawMin) && targetTs < rawMin) {
      return false;
    }
    if (Number.isFinite(rawMax) && targetTs > rawMax) {
      return false;
    }
    return true;
  }

  /**
   * Handles arrow key navigation on the calendar grid wrapper.
   * Focus stays on the grid wrapper; only the visual active-cell indicator
   * changes. The live region announces the new active cell.
   * @private
   * @param {KeyboardEvent} event - The keyboard event.
   * @returns {void}
   */
  handleGridKeyDown(event) {
    const { key } = event;
    const actionKeys = [
      'ArrowRight',
      'ArrowLeft',
      'ArrowDown',
      'ArrowUp',
      'Enter',
      ' '
    ];

    if (!actionKeys.includes(key)) {
      return;
    }

    event.preventDefault();

    const allCells = this.getAllFocusableCells();
    if (allCells.length === 0) {
      return;
    }

    const activeCell = allCells.find((cell) => cell.active);
    if (!activeCell) {
      return;
    }

    // Handle Enter/Space to select the active cell
    if (key === 'Enter' || key === ' ') {
      activeCell.handleTap();
      return;
    }

    const activeIndex = allCells.indexOf(activeCell);

    if (key === 'ArrowRight' || key === 'ArrowLeft') {
      const direction = key === 'ArrowRight' ? 1 : -1;
      const targetIndex = activeIndex + direction;

      if (targetIndex >= 0 && targetIndex < allCells.length) {
        // Target cell exists in rendered months
        this.setActiveCell(allCells[targetIndex].day.date);
        this.scrollToActiveCell();
        // Dispatch focus event for the cell so live region + range preview update
        this.handleCellFocused({ detail: { date: allCells[targetIndex].day.date } });
      } else {
        // At boundary — need to navigate to next/prev month
        const navDir = direction === 1 ? 'next' : 'prev';
        const targetDate = new Date(activeCell.day.date * 1000);
        targetDate.setDate(targetDate.getDate() + direction);
        targetDate.setHours(0, 0, 0, 0);
        const targetTs = Math.floor(targetDate.getTime() / 1000);

        if (this.isDateInRange(targetTs) && ((navDir === 'next' && this.showNextMonthBtn) || (navDir === 'prev' && this.showPrevMonthBtn))) { // eslint-disable-line no-extra-parens

          if (navDir === 'next') {
            this.handleNextMonth({ skipActiveUpdate: true });
          } else {
            this.handlePrevMonth({ skipActiveUpdate: true });
          }
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              const cells = this.getAllFocusableCells();
              const target = cells.find((cell) => cell.day && cell.day.date === targetTs);
              if (target) {
                this.setActiveCell(target.day.date);
                this.handleCellFocused({ detail: { date: target.day.date } });
              } else if (cells.length > 0) {
                const fallback = navDir === 'next' ? cells[cells.length - 1] : cells[0];
                this.setActiveCell(fallback.day.date);
                this.handleCellFocused({ detail: { date: fallback.day.date } });
              }
              // Re-focus grid wrapper after month change re-render
              this.focusActiveCell();
            });
          });
        }
      }
    } else if (key === 'ArrowDown' || key === 'ArrowUp') {
      const increment = key === 'ArrowDown' ? 7 : -7;
      const currentDate = new Date(activeCell.day.date * 1000);
      currentDate.setDate(currentDate.getDate() + increment);
      currentDate.setHours(0, 0, 0, 0);
      const targetDate = Math.floor(currentDate.getTime() / 1000);

      const targetCell = allCells.find((cell) => cell.day && cell.day.date === targetDate);

      if (targetCell) {
        this.setActiveCell(targetCell.day.date);
        this.scrollToActiveCell();
        this.handleCellFocused({ detail: { date: targetCell.day.date } });
      } else if (this.isDateInRange(targetDate)) {
        // Target might be in an unrendered month
        const navDirection = key === 'ArrowDown' ? 'next' : 'prev';
        if ((navDirection === 'next' && this.showNextMonthBtn) || (navDirection === 'prev' && this.showPrevMonthBtn)) { // eslint-disable-line no-extra-parens
          if (navDirection === 'next') {
            this.handleNextMonth({ skipActiveUpdate: true });
          } else {
            this.handlePrevMonth({ skipActiveUpdate: true });
          }
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              const cells = this.getAllFocusableCells();
              const target = cells.find((cell) => cell.day && cell.day.date === targetDate);
              if (target) {
                this.setActiveCell(target.day.date);
                this.handleCellFocused({ detail: { date: target.day.date } });
              } else if (cells.length > 0) {
                let nearest = null;

                if (navDirection === 'next') {
                  [nearest] = cells;
                } else {
                  nearest = cells[cells.length - 1];
                }
                this.setActiveCell(nearest.day.date);
                this.handleCellFocused({ detail: { date: nearest.day.date } });
              }
              this.focusActiveCell();
            });
          });
        }
      }
    }
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
      const currentIndex = allCells.findIndex((cell) => cell.day && cell.day.date === fromDate);

      if (currentIndex === -1) {
        return;
      }

      let targetIndex = -1;
      if (direction === 'next') {
        targetIndex = currentIndex + 1;
      }

      if (targetIndex >= 0 && targetIndex < allCells.length) {
        const targetCell = allCells[targetIndex];
        this.setActiveCell(targetCell.day.date);
        this.scrollToActiveCell();
        this.focusActiveCell();
      } else if (direction === 'next' && this.showNextMonthBtn) {
        // Navigate to next month and focus the computed next date.
        // Using the target date (fromDate + 1 day) instead of cells[0]
        // avoids jumping backward in range datepickers where cells[0]
        // belongs to the previous (still-rendered) month.
        const nextDate = new Date(fromDate * 1000);
        nextDate.setDate(nextDate.getDate() + 1);
        nextDate.setHours(0, 0, 0, 0);
        const nextTs = Math.floor(nextDate.getTime() / 1000);

        if (!this.isDateInRange(nextTs)) {
          return;
        }

        this.handleNextMonth({ skipActiveUpdate: true });
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const cells = this.getAllFocusableCells();
            const target = cells.find((cell) => cell.day && cell.day.date === nextTs);
            if (target) {
              this.setActiveCell(target.day.date);
              this.focusActiveCell();
            } else if (cells.length > 0) {
              // Fallback: first cell of the last rendered month
              this.setActiveCell(cells[cells.length - 1].day.date);
              this.focusActiveCell();
            }
          });
        });
      } else if (direction === 'prev' && this.showPrevMonthBtn) {
        // Navigate to previous month and focus the computed previous date.
        const prevDate = new Date(fromDate * 1000);
        prevDate.setDate(prevDate.getDate() - 1);
        prevDate.setHours(0, 0, 0, 0);
        const prevTs = Math.floor(prevDate.getTime() / 1000);

        if (!this.isDateInRange(prevTs)) {
          return;
        }

        this.handlePrevMonth({ skipActiveUpdate: true });
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const cells = this.getAllFocusableCells();
            const target = cells.find((cell) => cell.day && cell.day.date === prevTs);
            if (target) {
              this.setActiveCell(target.day.date);
              this.focusActiveCell();
            } else if (cells.length > 0) {
              // Fallback: last cell of the first rendered month
              this.setActiveCell(cells[0].day.date);
              this.focusActiveCell();
            }
          });
        });
      }
    } else if (key === 'ArrowDown' || key === 'ArrowUp') {
      // Vertical navigation: find same day-of-week +/- 7 days
      // Use Date arithmetic instead of fixed seconds to handle DST correctly
      const increment = key === 'ArrowDown' ? 7 : -7;
      const currentDate = new Date(fromDate * 1000);
      currentDate.setDate(currentDate.getDate() + increment);
      currentDate.setHours(0, 0, 0, 0);
      const targetDate = Math.floor(currentDate.getTime() / 1000);

      const allCells = this.getAllFocusableCells();
      const targetCell = allCells.find((cell) => cell.day && cell.day.date === targetDate);

      if (targetCell) {
        this.setActiveCell(targetCell.day.date);
        this.scrollToActiveCell();
        this.focusActiveCell();
      } else if (this.isDateInRange(targetDate)) {
        // Target might be in an unrendered month, navigate there
        const navDirection = key === 'ArrowDown' ? 'next' : 'prev';
        if ((navDirection === 'next' && this.showNextMonthBtn) || (navDirection === 'prev' && this.showPrevMonthBtn)) { // eslint-disable-line no-extra-parens
          if (navDirection === 'next') {
            this.handleNextMonth({ skipActiveUpdate: true });
          } else {
            this.handlePrevMonth({ skipActiveUpdate: true });
          }
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              const cells = this.getAllFocusableCells();
              const target = cells.find((cell) => cell.day && cell.day.date === targetDate);
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

    // Don't call focusActiveCell() here. The tap/click already placed
    // focus on the cell button, and moving it to #calendarGrid would
    // trigger focusout on the button, closing any open popover on the
    // cell. Keyboard events are composed and still bubble through
    // shadow DOM boundaries to the grid's @keydown handler, so
    // subsequent keyboard navigation continues to work.
  }

  /**
   * Handles focus events from calendar cells.
   * Updates the live region with an SR announcement and triggers
   * the imperative range preview if applicable.
   * @private
   * @param {CustomEvent} event - The calendar-cell-focused event.
   * @returns {void}
   */
  handleCellFocused(event) {
    const { date } = event.detail;
    if (date === null) {
      return;
    }

    // DOM focus stays on the grid wrapper while arrow keys move the active
    // cell, so cell buttons never receive native focus. The debounced live
    // region carries the full-context announcement instead.
    const announcement = this.buildFocusAnnouncement(date);
    this.announceFocusDebounced(announcement);

    // Update the range preview imperatively if in range-preview mode.
    this.updateRangePreview(date);
  }

  /**
   * Builds a full SR announcement string for a focused cell date.
   * Includes the localized date, range position, popover content,
   * and blackout status.
   * @private
   * @param {Number} date - Unix timestamp (seconds) of the focused cell.
   * @returns {String} The announcement string.
   */
  buildFocusAnnouncement(date) {
    let label = this.formatAnnouncementDate(date);

    // Append date slot content (e.g. prices) if present.
    const dateObj = new Date(date * 1000);
    const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
    const dd = String(dateObj.getDate()).padStart(2, '0');
    const yyyy = dateObj.getFullYear();
    const dateStr = `${yyyy}_${mm}_${dd}`;
    const dateSlotEl = this.datepicker?.querySelector(`[slot="date_${dateStr}"]`);
    if (dateSlotEl) {
      const text = dateSlotEl.innerText?.trim();
      if (text) {
        label += `, ${text}`;
      }
    }

    // Append popover content if present.
    const popoverEl = this.datepicker?.querySelector(`[slot="popover_${dateStr}"]`);
    if (popoverEl) {
      const text = popoverEl.innerText?.trim();
      if (text) {
        label += `, ${text}`;
      }
    }

    // Append range position context.
    if (this.datepicker?.hasAttribute('range')) {
      const rangeLabel = this.getRangePositionLabel(date);
      if (rangeLabel) {
        label += `, ${rangeLabel}`;
      }
    }

    // Append blackout label.
    if (this.isDateBlackout(date)) {
      label += `, ${this.datepicker?.blackoutLabel || 'unavailable'}`;
    }

    return label;
  }

  /**
   * Determines the range position label for a given date.
   * @private
   * @param {Number} date - Unix timestamp (seconds).
   * @returns {String|null} The range position label, or null.
   */
  getRangePositionLabel(date) {
    const parsedFrom = Number.parseInt(this.dateFrom, 10);
    if (!Number.isFinite(parsedFrom)) {
      return null;
    }

    const departTs = new Date(parsedFrom * 1000).setHours(0, 0, 0, 0) / 1000;
    const parsedTo = Number.parseInt(this.dateTo, 10);
    const hasTo = Number.isFinite(parsedTo);
    const returnTs = hasTo ? new Date(parsedTo * 1000).setHours(0, 0, 0, 0) / 1000 : null;

    if (date === departTs) {
      return this.datepicker.rangeLabelStart || 'range start';
    }
    if (hasTo && date === returnTs) {
      return this.datepicker.rangeLabelEnd || 'range end';
    }
    if (date < departTs) {
      return this.datepicker.rangeLabelBeforeRange || 'before range';
    }
    if (hasTo && date > departTs && date < returnTs) {
      return this.datepicker.rangeLabelInRange || 'in range';
    }
    if (!hasTo && date > departTs) {
      return this.datepicker.rangeLabelEndPreview || 'previewing range end';
    }
    return this.datepicker.rangeLabelAfterRange || 'after range';
  }

  /**
   * Checks whether a given date is a blackout date.
   * @private
   * @param {Number} dateTs - Unix timestamp (seconds).
   * @returns {Boolean} True if the date is blacked out.
   */
  isDateBlackout(dateTs) {
    // Check legacy disabledDays.
    if (Array.isArray(this.disabledDays) && this.disabledDays.length > 0) {
      if (this.disabledDays.findIndex((day) => parseInt(day, 10) === dateTs) !== -1) {
        return true;
      }
    }

    // Check ISO blackoutDates.
    const blackoutDates = this.datepicker?.blackoutDates;
    if (Array.isArray(blackoutDates) && blackoutDates.length > 0) {
      const date = new Date(dateTs * 1000);
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      if (blackoutDates.includes(`${yyyy}-${mm}-${dd}`)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Updates the range preview classes imperatively across all cells.
   * Only active when in range mode with dateFrom set and dateTo not yet set.
   * @private
   * @param {Number} hoveredDate - Unix timestamp of the hovered/focused date.
   * @returns {void}
   */
  updateRangePreview(hoveredDate) {
    if (this.noRange || !this.dateFrom || this.dateTo) {
      return;
    }

    const parsedDateFrom = parseInt(this.dateFrom, 10);
    const allCells = this.getAllFocusableCells();

    allCells.forEach((cell) => {
      cell.updateRangePreviewClasses(hoveredDate, parsedDateFrom);
    });
  }

  /**
   * Clears range preview classes from all cells.
   * @private
   * @param {Object} [options] - Optional settings.
   * @param {boolean} [options.force=false] - When true, clears classes even
   *   when both dateFrom and dateTo are set. Used by month nav handlers
   *   since the subsequent re-render re-applies classMap-managed classes,
   *   while `lastHoveredDate` (not in classMap) would otherwise persist.
   * @returns {void}
   */
  clearRangePreview(options) {
    const opts = options instanceof Event ? {} : options || {};
    if (!opts.force && this.dateFrom && this.dateTo) {
      return;
    }

    const allCells = this.getAllFocusableCells();
    allCells.forEach((cell) => {
      cell.clearRangePreviewClasses();
    });
  }

  /**
   * Overrides the base class handler to prevent setting `this.hoveredDate`
   * as a reactive property. Instead, handles the range preview imperatively.
   * @private
   * @param {CustomEvent} event - The hovered-date-changed event from a month.
   * @returns {void}
   */
  hoveredDateChanged(event) {
    const hoveredDate = event.detail.value;
    this.updateRangePreview(hoveredDate);
  }

  /**
   * Scrolls the calendar to ensure the month containing the active cell is visible.
   * @private
   * @returns {void}
   */
  scrollToActiveCell() {
    if (this.activeCellDate === null || this.activeCellDate === undefined) {
      return;
    }

    const date = new Date(this.activeCellDate * 1000);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const selector = `#month-${month}-${year}`;
    const monthElem = this.shadowRoot.querySelector(selector);

    if (monthElem) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      monthElem.scrollIntoView({ block: 'nearest',
        behavior: prefersReducedMotion ? 'instant' : 'smooth' });
    }
  }

  /**
   * Returns (and lazily creates) an aria-live region inside the dropdown's
   * <dialog> element. This placement is critical for two reasons:
   *
   * 1. Inside the dialog's accessible scope — dialog.showModal() makes
   *    everything outside the top-layer dialog inert, and desktop modal
   *    mode uses _setPageInert() on document.body siblings. A live region
   *    on document.body would be invisible to screen readers in both cases.
   *
   * 2. Not nested in shadow DOM — Chrome inconsistently observes aria-live
   *    mutations inside shadow DOM across machines and versions. The dialog
   *    element is only one shadow root deep (the dropdown bib's shadow DOM),
   *    which Chrome handles reliably. The calendar's own shadow DOM (nested
   *    inside the bib via slotting) is two+ levels deep and unreliable.
   *
   * @private
   * @returns {HTMLElement} The live region element.
   */
  getOrCreateLiveRegion() {
    if (this._liveRegion && this._liveRegion.isConnected) {
      return this._liveRegion;
    }

    // Access the dialog element inside the dropdown bib's shadow DOM.
    const dialog = this.dropdown?.bibContent?.shadowRoot?.querySelector('dialog');
    if (!dialog) {
      return null;
    }

    // Check if we already created one for this calendar instance.
    const regionId = `auro-calendar-live-${this._calendarInstanceId}`;
    const existing = dialog.querySelector(`#${regionId}`);
    if (existing) {
      this._liveRegion = existing;
      return existing;
    }

    const el = document.createElement('div');
    el.id = regionId;
    el.setAttribute('aria-live', 'assertive');
    el.setAttribute('aria-atomic', 'true');
    el.style.cssText = 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;';
    dialog.appendChild(el);

    this._liveRegion = el;
    return el;
  }

  /**
   * Removes the live region when this calendar is disconnected.
   * @private
   * @returns {void}
   */
  disconnectedCallback() {
    super.disconnectedCallback();

    // Cancel any pending announcements so they don't fire after teardown.
    if (this._announceRafId) {
      cancelAnimationFrame(this._announceRafId);
      this._announceRafId = null;
    }
    if (this._focusAnnounceTimer) {
      clearTimeout(this._focusAnnounceTimer);
      this._focusAnnounceTimer = null;
    }

    if (this._liveRegion && this._liveRegion.isConnected) {
      this._liveRegion.remove();
    }
    this._liveRegion = null;
  }

  /**
   * Announces a date selection or focus change via the live region.
   * Uses requestAnimationFrame to ensure the clear and set happen in
   * separate rendering frames — Chrome may coalesce synchronous or
   * microtask-deferred mutations into a single accessibility tree update.
   * @private
   * @param {String} dateStr - The localized date string to announce.
   * @returns {void}
   */
  announceSelection(dateStr) {
    // Cancel any previously queued rAF announcement so a rapid
    // sequence of calls (e.g. bib open → month nav) only announces
    // the last one.
    if (this._announceRafId) {
      cancelAnimationFrame(this._announceRafId);
    }
    const liveRegion = this.getOrCreateLiveRegion();
    if (!liveRegion) {
      return;
    }

    // Double-rAF: clear in frame N, set in frame N+1. Chrome batches
    // accessibility tree mutations within a single animation frame, so
    // a same-frame clear+set can be coalesced into a no-op if the new
    // value matches a recently announced string. Splitting across two
    // frames guarantees Chrome sees two distinct tree states and fires
    // a new accessibility event for the content change.
    liveRegion.textContent = '';
    this._announceRafId = requestAnimationFrame(() => {
      this._announceRafId = requestAnimationFrame(() => {
        liveRegion.textContent = dateStr;
        this._announceRafId = null;
      });
    });
  }

  /**
   * Debounced version of announceSelection for focus navigation.
   * Uses the assertive live region with a 150ms debounce so only the
   * final cell after rapid arrow-key traversal is announced. We
   * originally tried aria-live="polite" here, but VoiceOver treats
   * polite as "wait until idle" — which never happens during active
   * keyboard navigation — so the announcements were silently dropped.
   * @private
   * @param {String} dateStr - The localized date string to announce.
   * @returns {void}
   */
  announceFocusDebounced(dateStr) {
    if (this._focusAnnounceTimer) {
      clearTimeout(this._focusAnnounceTimer);
    }
    this._focusAnnounceTimer = setTimeout(() => {
      this.announceSelection(dateStr);
      this._focusAnnounceTimer = null;
    }, 150);
  }

  /**
   * Formats a Unix timestamp (seconds) as a localized date string for SR announcements.
   * @private
   * @param {String|Number} timestamp - Unix timestamp in seconds.
   * @returns {String} Localized date string.
   */
  formatAnnouncementDate(timestamp) {
    const date = new Date(parseInt(timestamp, 10) * 1000);
    const formatter = new Intl.DateTimeFormat(this.localeCode, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
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

    // Listen for cross-month boundary navigation events
    this.addEventListener('calendar-month-boundary', (event) => {
      this.handleMonthBoundary(event);
    });

    // Listen for cell activation events
    this.addEventListener('calendar-cell-activate', (event) => {
      this.handleCellActivate(event);
    });

    // Listen for cell focus events (SR announcements + range preview)
    this.addEventListener('calendar-cell-focused', (event) => {
      this.handleCellFocused(event);
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
        if (this.activeCellDate == null) { // eslint-disable-line no-eq-null, eqeqeq
          this.activeCellDate = this.computeActiveDate();
        }

        this.requestUpdate();
      } else {
        this.requestUpdate();
      }
    }

    // Announce date selection to screen readers when user clicks/selects a cell
    const isCellClick = this.datepicker?.wasCellClick || this.datepicker?.cellClickActive;

    if (changedProperties.has('dateFrom') && this.dateFrom && isCellClick) {
      const dateStr = this.formatAnnouncementDate(this.dateFrom);
      const isRange = !this.noRange;

      if (isRange) {
        const rangeLabel = this.datepicker.rangeLabelStart || 'range start';
        this.announceSelection(`${dateStr}, selected as ${rangeLabel}`);
      } else {
        this.announceSelection(`${dateStr}, selected`);
      }
    }

    if (changedProperties.has('dateTo') && this.dateTo && isCellClick) {
      const dateStr = this.formatAnnouncementDate(this.dateTo);
      const rangeLabel = this.datepicker.rangeLabelEnd || 'range end';
      this.announceSelection(`${dateStr}, selected as ${rangeLabel}`);
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
        <div id="calendarGrid" class="calendars" role="group" tabindex="0" aria-label="${this.datepicker?.calendarGridLabel}" @keydown="${this.handleGridKeyDown}" @focusin="${this.handleGridFocusIn}" @focusout="${this.handleGridFocusOut}" @calendar-month-mouseleave="${this.clearRangePreview}">
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

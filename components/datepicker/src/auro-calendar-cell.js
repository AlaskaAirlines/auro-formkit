import { LitElement, nothing } from "lit";
import { html } from 'lit/static-html.js';
import { classMap } from 'lit/directives/class-map.js';

import styleCss from './styles/style-auro-calendar-cell-css.js';
import colorCss from './styles/color-cell-css.js';
import tokensCss from './styles/tokens-css.js';

import { AuroDependencyVersioning } from '@aurodesignsystem/auro-library/scripts/runtime/dependencyTagVersioning.mjs';

import { AuroPopover } from '@aurodesignsystem/auro-popover/class';
import popoverVersion from './popoverVersion.js';

import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';

import { isBlackoutTimestamp } from './blackoutUtils.js';

/* eslint-disable curly, max-lines, no-underscore-dangle, no-magic-numbers, no-underscore-dangle, max-params, no-extra-parens, arrow-parens, max-lines, line-comment-position, no-inline-comments, lit/binding-positions, lit/no-invalid-html */

/**
 * One day in the datepicker's calendar: a button people select to choose that date.
 *
 * @event calendar-cell-activate - Notifies that someone activated this cell with a click, a tap, or Enter or Space.
 * @event date-is-hovered - Notifies that the pointer moved over this cell's date.
 * @event calendar-cell-focused - Notifies that this cell's button has received focus.
 * @csspart dateSlot - The container under the day number that holds the date's `date_YYYY_MM_DD` slot content, shown only when that slot has content.
 * @internal
 */
export class AuroCalendarCell extends LitElement {
  constructor() {
    super();

    this.day = null;
    this.selected = false;
    this.dateTo = null;
    this.dateFrom = null;
    this.month = null;
    this.min = null;
    this.max = null;
    this.disabled = false;

    /** @type {number[]} */
    this.disabledDays = [];
    this.isCurrentDate = false;

    /** @internal */
    this._locale = null;
    this.dateStr = null;
    this.renderForDateSlot = false; // When false, the numerical date will render vertically centered. When true, the date will render off-center to the top and leave room below for the slot content.
    /** @internal */
    this.active = false;
    this.hasPopoverContent = false;

    /** @internal */
    this.runtimeUtils = new AuroLibraryRuntimeUtils();

    /**
     * Generate unique names for dependency components.
     */
    const versioning = new AuroDependencyVersioning();

    /** @internal */
    this.popoverTag = versioning.generateTag('auro-formkit-datepicker-popover', popoverVersion, AuroPopover);
  }

  // This function is to define props used within the scope of this component
  // Be sure to review  https://lit-element.polymer-project.org/guide/properties#reflected-attributes
  // to understand how to use reflected attributes with your property settings.
  static get properties() {
    return {
      // ...super.properties,

      /**
       * Sets the day this cell shows: an object with the date as a Unix timestamp in seconds (`date`) and the day of the month (`title`).
       */
      day:           { type: Object },

      /**
       * Shows the cell in the selected style. The cell sets it itself when its date matches `dateFrom` or `dateTo`.
       */
      selected:      { type: Boolean },

      /**
       * Sets the end date of the chosen range, as a Unix timestamp in seconds.
       */
      dateTo:        {
        type: String,
        attribute: 'dateto'
      },

      /**
       * Sets the chosen date, or the start date of a range, as a Unix timestamp in seconds.
       */
      dateFrom:      {
        type: String,
        attribute: 'datefrom'
      },

      /**
       * Sets the month this cell belongs to. The cell doesn't currently use it.
       */
      month:         { type: String },

      /**
       * Sets the earliest date people can choose, as a Unix timestamp in seconds. When the cell's date is earlier, its button is turned off.
       */
      min:           { type: Number },

      /**
       * Sets the latest date people can choose, as a Unix timestamp in seconds. When the cell's date is later, its button is turned off.
       */
      max:           { type: Number },

      /**
       * Stops clicks and Enter or Space from selecting the cell's date. The cell doesn't currently set it itself: dates outside `min` and `max` turn off their button instead.
       */
      disabled:      {
        type: Boolean,
        reflect: true
      },

      /**
       * Deprecated: Use `blackoutDates` on `auro-datepicker` instead.
       * Sets dates people can't select, as Unix timestamps in seconds.
       * @deprecated Use `blackoutDates` on `auro-datepicker` instead.
       * @type {number[]}
       */
      disabledDays:  {
        type: Array,
        attribute: 'disableddays'
      },

      /**
       * Marks the cell as today's date, which tells screen readers it's the current date (`aria-current="date"`). It doesn't currently change how the cell looks.
       */
      isCurrentDate: {
        type: Boolean,
        attribute: 'iscurrentdate'
      },

      /**
       * Sets the language and region used to format the cell's date for screen readers, such as `en-US` (a BCP 47 language tag). Uses `en-US` when not set.
       */
      locale:        { type: String },

      /**
       * Sets the cell's date in `YYYY_MM_DD` format, which names its `date_` and `popover_` slots. The cell sets it from `day`.
       */
      dateStr:       {
        type: String,
        attribute: 'datestr'
      },

      /**
       * Moves the day number up to leave room below it for date slot content. The cell sets it when the datepicker has content for the cell's `date_YYYY_MM_DD` slot.
       */
      renderForDateSlot: {
        type: Boolean,
        attribute: 'renderfordateslot'
      },

      /**
       * Shows the cell inside a popover. The cell sets it when the datepicker has content for the cell's `popover_YYYY_MM_DD` slot.
       */
      hasPopoverContent: {
        type: Boolean,
        attribute: 'haspopovercontent'
      }
    };
  }

  get locale() {
    return this._locale || 'en-US';
  }

  set locale(value) {
    const oldValue = this._locale;
    this._locale = value;
    this.requestUpdate('locale', oldValue);
  }

  static get styles() {
    return [
      // ...super.styles,
      styleCss,
      colorCss,
      tokensCss
    ];
  }

  /**
   * Sets `selected` when the cell's date matches the start or end date of the selection.
   * @private
   * @param {Number} dateFrom - The start date, as a Unix timestamp in seconds.
   * @param {Number} dateTo - The end date, as a Unix timestamp in seconds.
   * @param {Object} day - The day this cell shows: an object with `date`, a Unix timestamp in seconds, and `title`, the day of the month.
   * @returns {void}
   */
  dateChanged(dateFrom, dateTo, day) {
    this.selected = false;

    const parsedDateFrom = parseInt(dateFrom, 10);
    const parsedDateTo = parseInt(dateTo, 10);

    if (day) {
      const departTimestamp = new Date(parsedDateFrom * 1000).setHours(0, 0, 0, 0) / 1000;
      const returnTimestamp = new Date(parsedDateTo * 1000).setHours(0, 0, 0, 0) / 1000;

      if (day.date === departTimestamp || day.date === returnTimestamp) {
        this.selected = true;
      }
    }
  }

  /**
   * Called when someone clicks the cell's button, or presses Enter or Space while it's the active cell.
   * Selects the cell's date unless the cell is turned off or the date is a blackout date, and fires
   * `calendar-cell-activate` so the calendar makes the cell the active cell.
   * @private
   * @returns {void}
   */
  handleTap() {
    if (!this.disabled && !this.isBlackout()) {
      this.datepicker.handleCellClick(this.day.date);
    }

    // Set this cell as the active cell regardless of blackout status
    if (this.day) {
      this.dispatchEvent(new CustomEvent('calendar-cell-activate', {
        bubbles: true,
        composed: true,
        detail: { date: this.day.date }
      }));
    }
  }

  /**
   * Called when the pointer moves over the cell's button. Fires `date-is-hovered` with the cell's date.
   * Doesn't set any reactive properties, because the calendar updates the range preview
   * directly to avoid re-rendering every cell.
   * @private
   * @returns {void}
   */
  handleHover() {
    this.dispatchEvent(new CustomEvent('date-is-hovered', {
      detail: { date: this.day?.date },
    }));
  }

  /**
   * Called when the cell's button gets focus. Fires `calendar-cell-focused` so the calendar can
   * announce the date to screen readers and update the range preview without re-rendering the cell.
   * @private
   * @returns {void}
   */
  handleFocus() {
    this.dispatchEvent(new CustomEvent('calendar-cell-focused', {
      bubbles: true,
      composed: true,
      detail: { date: this.day?.date },
    }));
  }

  /**
   * Checks whether the cell's date is earlier than `min` or later than `max`.
   * Out-of-range cells aren't focusable and are hidden from screen readers.
   * @private
   * @param {Object} day - The day this cell shows: an object with `date`, a Unix timestamp in seconds, and `title`, the day of the month.
   * @param {Number} min - The earliest date people can choose, as a Unix timestamp in seconds.
   * @param {Number} max - The latest date people can choose, as a Unix timestamp in seconds.
   * @returns {Boolean} True if the date is out of range; false otherwise.
   */
  isOutOfRange(day, min, max) {
    if (day && day.date !== null && day.date !== undefined) {
      return day.date < min || day.date > max;
    }
    return false;
  }

  /**
   * Checks whether the cell's date is a blackout date, from the datepicker's `blackoutDates` or the deprecated `disabledDays`, and within `min` and `max`.
   * Blackout cells are focusable but not selectable.
   * @private
   * @returns {Boolean} True if the date is a blackout date; false otherwise.
   */
  isBlackout() {
    if (!this.day || this.day.date === null || this.day.date === undefined || this.isOutOfRange(this.day, this.min, this.max)) {
      return false;
    }

    // Delegate to the calendar's memoized blackout Set for O(1) lookup
    // (instead of rescanning disabledDays + blackoutDates per render). The
    // Set is rebuilt only when either source array reference changes — see
    // auro-calendar.js#_getBlackoutSet.
    if (this.calendar && typeof this.calendar._getBlackoutSet === 'function') {
      if (this.calendar._getBlackoutSet().has(this.day.date)) {
        return true;
      }
      // If the cell's local disabledDays diverged from the calendar's (a
      // consumer or test mutated cell.disabledDays directly), the Set does
      // not reflect that addition — fall through to the per-cell scan only
      // when the reference no longer matches. Production data flow keeps
      // these identical, so this branch stays cold. Guarded with
      // Array.isArray to match `_getBlackoutSet`'s contract: non-array
      // values are treated as empty rather than crashing on `.findIndex`.
      if (Array.isArray(this.disabledDays) && this.disabledDays !== this.calendar.disabledDays && this.disabledDays.length > 0) {
        if (this.disabledDays.findIndex((dd) => parseInt(dd, 10) === this.day.date) !== -1) {
          return true;
        }
      }
      return false;
    }

    // Pre-firstUpdated fallback — the cell may render once before the
    // ancestor calendar is wired up. Routes through the shared
    // blackoutUtils helper so the parsing rules stay in one place.
    return isBlackoutTimestamp(this.day.date, this.disabledDays, this.datepicker?.blackoutDates);
  }

  /**
   * Checks whether the cell's date is turned off because it's outside `min` and `max` or in the
   * deprecated `disabledDays`, and sets the host's `disabled` attribute to match. Despite its name,
   * it returns true for a turned-off date. Blackout dates are handled separately by `isBlackout()`.
   * @private
   * @param {Object} day - The day this cell shows: an object with `date`, a Unix timestamp in seconds, and `title`, the day of the month.
   * @param {Number} min - The earliest date people can choose, as a Unix timestamp in seconds.
   * @param {Number} max - The latest date people can choose, as a Unix timestamp in seconds.
   * @param {Array} disabledDays - The deprecated array of dates people can't select, as Unix timestamps in seconds.
   * @returns {Boolean} True if the date is turned off; false otherwise.
   */
  isEnabled(day, min, max, disabledDays) {
    this.removeAttribute('disabled');

    if (disabledDays && day && day.date &&
      (day.date < min || day.date > max || disabledDays.findIndex(disabledDay => parseInt(disabledDay, 10) === day.date) !== -1)) {
      this.setAttribute('disabled', true);
      return true;
    }

    return false;
  }

  /**
   * Generates a unique cell ID in the format `cell-YYYY-MM-DD`.
   * @private
   * @returns {String} The unique cell ID, or an empty string when the cell has no date.
   */
  getCellId() {
    if (!this.day || !this.day.date) return '';
    const date = new Date(this.day.date * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `cell-${year}-${month}-${day}`;
  }

  /**
   * Generates the cell's localized `aria-label` with `Intl.DateTimeFormat`.
   * Adds the date slot and popover content, the range position, and the blackout label.
   * @private
   * @returns {String} The `aria-label` text, or an empty string when the cell has no date.
   */
  getAriaLabel() {
    if (!this.day || this.day.date === undefined) return '';

    const date = new Date(this.day.date * 1000);

    // Generate localized full date string using the configured locale
    const dateFormatter = new Intl.DateTimeFormat(this.locale, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    let label = dateFormatter.format(date);

    // Append date slot content (e.g. prices) so it is announced with the date.
    if (this.renderForDateSlot) {
      const dateSlotEl = this.querySelector(`[slot="date_${this.dateStr}"]`);
      if (dateSlotEl) {
        const text = dateSlotEl.innerText?.trim();
        if (text) {
          label += `, ${text}`;
        }
      }
    }

    // appending popover content here so that it gets read in a logical order with the other date content.
    if (this.hasPopoverContent) {
      const popoverEl = this.querySelector(`[slot="popover_${this.dateStr}"]`);
      if (popoverEl) {
        label += `, ${popoverEl.innerText.trim()}`;
      }
    }

    // Append range position label for range datepickers
    const rangePosition = this.getRangePosition();
    if (rangePosition) {
      label += `, ${rangePosition}`;
    }

    // Append blackout label for blackout cells
    if (this.isBlackout()) {
      label += `, ${this.datepicker?.blackoutLabel || 'unavailable'}`;
    }

    return label;
  }

  /**
   * Determines the range position of this cell relative to the current selection.
   * @private
   * @returns {String|null} The range position label, or null when the datepicker isn't a range or has no start date.
   */
  getRangePosition() {
    if (!this.datepicker || !this.datepicker.hasAttribute('range')) return null;

    const parsedDateFrom = Number.parseInt(this.dateFrom, 10);
    if (!Number.isFinite(parsedDateFrom)) return null;

    const departTimestamp = new Date(parsedDateFrom * 1000).setHours(0, 0, 0, 0) / 1000;
    const dayDate = this.day.date;

    const parsedDateTo = Number.parseInt(this.dateTo, 10);
    const hasDateTo = Number.isFinite(parsedDateTo);
    const returnTimestamp = hasDateTo ? new Date(parsedDateTo * 1000).setHours(0, 0, 0, 0) / 1000 : null;

    if (dayDate === departTimestamp) return this.datepicker.rangeLabelStart || 'range start';

    if (hasDateTo && dayDate === returnTimestamp) return this.datepicker.rangeLabelEnd || 'range end';

    if (dayDate < departTimestamp) return this.datepicker.rangeLabelBeforeRange || 'before range';

    if (hasDateTo && dayDate > departTimestamp && dayDate < returnTimestamp) return this.datepicker.rangeLabelInRange || 'in range';

    if (!hasDateTo && dayDate > departTimestamp) return this.datepicker.rangeLabelEndPreview || 'previewing range end';

    // After end date when both dateFrom and dateTo are set.
    return this.datepicker.rangeLabelAfterRange || 'after range';
  }

  /**
   * Checks whether the cell's date is the selected start date.
   * @private
   * @param {Object} day - The day this cell shows: an object with `date`, a Unix timestamp in seconds, and `title`, the day of the month.
   * @param {Number} dateFrom - The start date, as a Unix timestamp in seconds.
   * @returns {Boolean} True if the cell is selected and its date is the start date; false otherwise.
   */
  isDepartDate(day, dateFrom) {
    const parsedDateFrom = parseInt(dateFrom, 10);
    const departTimestamp = new Date(parsedDateFrom * 1000).setHours(0, 0, 0, 0) / 1000;

    return this.selected && day.date === departTimestamp;
  }

  /**
   * Checks whether the cell's date is the selected end date.
   * @private
   * @param {Object} day - The day this cell shows: an object with `date`, a Unix timestamp in seconds, and `title`, the day of the month.
   * @param {Number} dateFrom - The start date, as a Unix timestamp in seconds.
   * @param {Number} dateTo - The end date, as a Unix timestamp in seconds.
   * @returns {Boolean} True if the cell is selected, a start date is set, and the cell's date is the end date; false otherwise.
   */
  isReturnDate(day, dateFrom, dateTo) {
    const parsedDateTo = parseInt(dateTo, 10);
    const returnTimestamp = new Date(parsedDateTo * 1000).setHours(0, 0, 0, 0) / 1000;

    return this.selected && day.date === returnTimestamp && dateFrom;
  }

  /**
   * Checks whether the cell's date is between `dateFrom` and `dateTo`.
   * @private
   * @param {Object} day - The day this cell shows: an object with `date`, a Unix timestamp in seconds, and `title`, the day of the month.
   * @param {Number} dateFrom - The start date, as a Unix timestamp in seconds.
   * @param {Number} dateTo - The end date, as a Unix timestamp in seconds.
   * @returns {Boolean} True if the datepicker is a range and the cell's date is after `dateFrom` and, when `dateTo` is set, before `dateTo`; false otherwise.
   */
  isInRange(day, dateFrom, dateTo) {

    /**
     * Cell is in not range if any of the following are true:
     * - Datepicker does not support range selection.
     * - First date has not been selected.
     * - Cell date is before or equal first date.
     * - Both range dates selected and current cell is after the second date.
     */
    if (!this.datepicker.hasAttribute('range') || (!dateFrom || day.date <= dateFrom) || (dateTo && day.date >= dateTo)) {
      return false;
    }

    return true;
  }

  /**
   * Checks whether the cell's date is the hovered date while someone chooses the end date of a range.
   * @private
   * @param {Object} day - The day this cell shows: an object with `date`, a Unix timestamp in seconds, and `title`, the day of the month.
   * @param {Number} dateFrom - The start date, as a Unix timestamp in seconds.
   * @param {Number} dateTo - The end date, as a Unix timestamp in seconds.
   * @param {Number} hoveredDate - The hovered date, as a Unix timestamp in seconds.
   * @returns {Boolean} True if no end date is set and the cell's date is the hovered date, later than the start date; false otherwise.
   */
  isLastHoveredDate(day, dateFrom, dateTo, hoveredDate) {
    return dateFrom && hoveredDate > dateFrom && day.date === hoveredDate && !dateTo;
  }

  /**
   * Checks whether a date is one of the datepicker's `referenceDates`.
   * @param {string} dateStr - The date, in `YYYY_MM_DD` format.
   * @returns {boolean} True if the date is a reference date; false otherwise.
   */
  isReferenceDate(dateStr) {
    // If the datepicker has referenced dates specified
    if (this.datepicker && this.datepicker.hasAttribute('referenceDates')) {

      // Get the referenceDates attribute from the datepicker
      const {referenceDates} = this.datepicker;

      // Guard clause: no dates in the array
      if (!Array.isArray(referenceDates) || referenceDates.length === 0) return false;

      // eslint-disable-next-line require-unicode-regexp
      const cellISO = dateStr.replace(/_/g, '-');

      return referenceDates.includes(cellISO);
    };

    return false;
  }

  /**
   * Formats a date as a full date in the cell's `locale`, such as "Monday, April 21, 2025" for `en-US`.
   * @private
   * @param {Number} date - The date, as a Unix timestamp in seconds.
   * @returns {String} The formatted date, or an empty string when `date` is undefined.
   */
  getTitle(date) {
    if (date === undefined) {
      return '';
    }
    if (!this._titleFormatter || this._titleFormatterLocale !== this.locale) {
      this._titleFormatter = new Intl.DateTimeFormat(this.locale, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      this._titleFormatterLocale = this.locale;
    }
    return this._titleFormatter.format(new Date(date * 1000));
  }

  /**
   * Sets `dateStr` to the cell's date in `YYYY_MM_DD` format, which names its date slots, or to null when the cell has no date.
   * @private
   * @returns {void}
   */
  setDateSlotName() {
    if (!this.day || !this.day.date) {
      this.dateStr = null;
      return;
    }
    const date = new Date(this.day.date * 1000);

    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month.toString().length === 1) {
      month = `0${month}`;
    }

    if (day.toString().length === 1) {
      day = `0${day}`;
    }

    const year = date.getFullYear();

    this.dateStr = `${year}_${month}_${day}`;
  }

  /**
   * Removes the cell's copied slot content, then copies in the `date_YYYY_MM_DD` and `popover_YYYY_MM_DD` content for the cell's date from `auro-datepicker`.
   * @private
   * @returns {void}
   */
  handleSlotContent() {
    try {
      // Get the slot names for this cell
      const dateSlotName = `date_${this.dateStr}`;
      const popoverSlotName = `popover_${this.dateStr}`;

      // Remove any existing slot content from this cell
      const existingSlotContent = this.querySelectorAll(`[slot]`);

      existingSlotContent.forEach((slot) => {
        slot.remove();
      });

      // // Get any slots for this cell from the datepicker
      const dateSlotContent = this.datepicker.querySelector(`[slot="${dateSlotName}"]`);
      const popoverSlotContent = this.datepicker.querySelector(`[slot="${popoverSlotName}"]`);

      // Insert any fetched slot content into this cell
      if (dateSlotContent) {
        this.appendChild(dateSlotContent.cloneNode(true));
        this.setAttribute('renderForDateSlot', true);
      } else {
        this.removeAttribute('renderForDateSlot');
      }

      if (popoverSlotContent) {
        this.appendChild(popoverSlotContent.cloneNode(true));
        this.hasPopoverContent = true;
      } else {
        this.hasPopoverContent = false;
      }
    } catch (err) { // eslint-disable-line no-unused-vars
      // Error handling goes here
    }
  }

  firstUpdated() {
    this._initFromAncestors();
  }

  /**
   * Wires the cell to its ancestor calendar-month and calendar (and, via
   * the calendar, to the datepicker). Extracted from firstUpdated() so the
   * retry loop can re-attempt without recursively invoking a Lit lifecycle
   * method (which is outside the framework's contract).
   * @private
   * @returns {void}
   */
  _initFromAncestors() {
    const calendarMonth = this.runtimeUtils.closestElement('auro-formkit-calendar-month', this);
    const calendar = this.runtimeUtils.closestElement('auro-formkit-calendar', calendarMonth);

    if (!calendar) {
      // Retry on the next event-loop turn to give the ancestor chain a chance
      // to attach — but cap attempts so a permanently detached cell doesn't
      // spin forever. 10 turns is far more than any observed race needs.
      this._firstUpdatedRetries = (this._firstUpdatedRetries || 0) + 1;
      if (this._firstUpdatedRetries > 10) {
        return;
      }
      this._firstUpdatedRetryTimer = setTimeout(() => {
        this._firstUpdatedRetryTimer = null;
        this._initFromAncestors();
      }, 0);
      return;
    }
    this._firstUpdatedRetries = 0;
    this.calendar = calendar;
    this.datepicker = calendar.datepicker;
    this._slotContentHandler = () => {
      this.handleSlotContent();
      // Force re-render so isBlackout()/aria-disabled reflect updated blackoutDates.
      this.requestUpdate();
    };
    this.datepicker.addEventListener('auroDatePicker-newSlotContent', this._slotContentHandler);

    // Cache button reference for imperative class manipulation.
    this.updateComplete.then(() => {
      this._cachedButton = this.shadowRoot.querySelector('button.day');
    });

    // Trigger an initial update now that `this.datepicker` is assigned so
    // cells reflect blackout/slot state that was configured before first render.
    this.requestUpdate();

    this.calendarMonth = calendarMonth;
    this.configurePopover();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.datepicker && this._slotContentHandler) {
      this.datepicker.removeEventListener('auroDatePicker-newSlotContent', this._slotContentHandler);
    }
    if (this._firstUpdatedRetryTimer) {
      clearTimeout(this._firstUpdatedRetryTimer);
      this._firstUpdatedRetryTimer = null;
    }
  }

  /**
   * Configures the popover instance with the calendar month boundary.
   * Called from firstUpdated and updated because the popover element is only
   * rendered after hasPopoverContent becomes true (set by handleSlotContent).
   * @private
   * @returns {void}
   */
  configurePopover() {
    this.auroPopover = this.shadowRoot.querySelector(this.popoverTag._$litStatic$);

    if (this.auroPopover && this.calendarMonth) {
      this.auroPopover.boundary = this.calendarMonth;
    }
  }

  updated(properties) {
    if (properties.has('dateFrom') || properties.has('dateTo') || properties.has('day')) {
      this.dateChanged(this.dateFrom, this.dateTo, this.day);
    }

    if (properties.has('day') && this.day) {
      this.setDateSlotName();
      this.handleSlotContent();

      // Re-cache button reference when the day changes (cell may have re-rendered).
      this.updateComplete.then(() => {
        this._cachedButton = this.shadowRoot.querySelector('button.day');
      });

      // Keep the host's gridcell aria attributes in sync with the day data.
      this.updateHostAria();
    }

    // Update host aria when selection changes (aria-selected, range labels)
    // or when isCurrentDate flips (aria-current).
    if (properties.has('dateFrom') || properties.has('dateTo') || properties.has('selected') || properties.has('isCurrentDate')) {
      this.updateHostAria();
    }

    // When the rendered range shifts (month nav, min/max change), a cell
    // host may be re-rendered for a new date that is now out-of-range —
    // but its imperatively-set `active` flag and `activeCell` ring class
    // from the previous date persist because setActiveCell only iterates
    // focusable (in-range) cells when clearing the prior active state.
    // Drop the active state here so the disabled cell isn't left visually
    // ringed.
    if ((properties.has('day') || properties.has('min') || properties.has('max')) &&
      this.active && this.isOutOfRange(this.day, this.min, this.max)) {
      this.clearActive();
    }

    // Configure popover when it first becomes rendered
    if (properties.has('hasPopoverContent') && this.hasPopoverContent) {
      this.updateComplete.then(() => this.configurePopover());
    }
  }

  /**
   * Sets ARIA attributes on the cell so screen reader users browsing the month grid hear its date,
   * whether it's selected, and whether it's a blackout date. Removes them for a date outside `min` and `max`.
   * @private
   * @returns {void}
   */
  updateHostAria() {
    if (!this.day || this.day.date === undefined) return;

    const outOfRange = this.isOutOfRange(this.day, this.min, this.max);
    if (outOfRange) {
      // Strip every aria attribute the in-range branch may have set on a
      // previous render — if a cell flips from in-range to out-of-range
      // (calendar shifts months, minDate/maxDate change, etc.).
      this.removeAttribute('role');
      this.removeAttribute('aria-label');
      this.removeAttribute('aria-current');
      this.removeAttribute('aria-selected');
      this.removeAttribute('aria-disabled');
      return;
    }

    this.setAttribute('role', 'gridcell');
    this.setAttribute('aria-label', this.getAriaLabel());
    this.setAttribute('aria-selected', this.selected ? 'true' : 'false');

    if (this.isCurrentDate) {
      this.setAttribute('aria-current', 'date');
    } else {
      this.removeAttribute('aria-current');
    }

    if (this.isBlackout()) {
      this.setAttribute('aria-disabled', 'true');
    } else {
      this.removeAttribute('aria-disabled');
    }
  }

  /**
   * Moves keyboard focus to the cell's button.
   * Uses `focusVisible: true` so the focus ring shows even when
   * the calendar was opened with a mouse click.
   * @returns {void}
   */
  focusButton() {
    const button = this._cachedButton || this.shadowRoot.querySelector('button:not([disabled])');
    if (button) {
      button.focus({ focusVisible: true });
    }
  }

  /**
   * Marks the cell as the active cell and shows its popover, if it has one, without re-rendering.
   * Does nothing for a date outside `min` and `max`. Keyboard focus stays on the calendar grid,
   * and a live region announces the active date to screen readers.
   * @returns {void}
   */
  setActive() {
    if (this.isOutOfRange(this.day, this.min, this.max)) {
      return;
    }

    this.active = true;

    // Show the popover when this cell becomes active via keyboard navigation.
    if (this.auroPopover) {
      this.auroPopover.toggleShow();
    }
  }

  /**
   * Marks the cell as no longer active, removes its focus ring, and hides its popover, without re-rendering.
   * @returns {void}
   */
  clearActive() {
    this.active = false;
    const btn = this._cachedButton || this.shadowRoot.querySelector('button.day');
    if (btn) {
      btn.classList.remove('activeCell');
    }

    // Hide the popover when this cell loses active state.
    if (this.auroPopover) {
      this.auroPopover.toggleHide();
    }
  }

  /**
   * Updates the classes that preview a range on the cell's button, without re-rendering the cell.
   * The calendar calls it when the hovered or focused date changes while someone is choosing the end date of a range.
   * @param {Number} hoveredDate - The Unix timestamp of the date that's hovered or active.
   * @param {Number} dateFrom - The Unix timestamp of the chosen start date.
   * @returns {void}
   */
  updateRangePreviewClasses(hoveredDate, dateFrom) {
    const btn = this._cachedButton;
    if (!btn || !this.day) return;

    const dayDate = this.day.date;
    const departTimestamp = new Date(dateFrom * 1000).setHours(0, 0, 0, 0) / 1000;
    const isInRange = dayDate > departTimestamp && dayDate < hoveredDate;
    // `>=` so hovering the depart cell itself (a same-day round-trip
    // preview) still surfaces a visual cue: the depart cell receives both
    // rangeDepartDate and lastHoveredDate.
    const isLastHovered = dayDate === hoveredDate && hoveredDate >= departTimestamp;
    const isDepartWithPreview = dayDate === departTimestamp && hoveredDate >= departTimestamp;

    btn.classList.toggle('inRange', isInRange);
    btn.classList.toggle('lastHoveredDate', isLastHovered);
    btn.classList.toggle('rangeDepartDate', isDepartWithPreview);
  }

  /**
   * Removes the range preview classes from the cell's button, without re-rendering the cell.
   * The calendar calls it when someone moves to another month, and, until a range has both dates, when the pointer leaves a month's dates or keyboard focus leaves the calendar grid.
   * @returns {void}
   */
  clearRangePreviewClasses() {
    const btn = this._cachedButton;
    if (!btn) return;

    btn.classList.remove('inRange', 'lastHoveredDate', 'rangeDepartDate');
  }

  /**
   * Re-applies the classes that show a chosen range (`inRange`, `rangeDepartDate`,
   * and `rangeReturnDate`) from the cell's `day`, `dateFrom`, and `dateTo`.
   * The calendar calls it after month navigation, because classes removed by
   * `clearRangePreviewClasses()` aren't restored by the next render.
   * @returns {void}
   */
  applyCommittedRangeClasses() {
    if (!this.day) return;
    // Fall back to a shadowRoot query when `_cachedButton` hasn't
    // populated yet — this method's whole job is recovering from stale
    // DOM after a month re-render, so no-oping on a cache miss defeats
    // the fix (mirrors the fallback in `clearActive()`).
    const btn = this._cachedButton || this.shadowRoot?.querySelector('button.day');
    if (!btn) return;

    const hasRange = this.datepicker?.hasAttribute('range');
    const inRange = hasRange && this.dateTo && this.isInRange(this.day, this.dateFrom, this.dateTo);
    const isDepart = hasRange && this.isDepartDate(this.day, this.dateFrom) && this.dateTo;
    const isReturn = hasRange && this.isReturnDate(this.day, this.dateFrom, this.dateTo);

    btn.classList.toggle('inRange', Boolean(inRange));
    btn.classList.toggle('rangeDepartDate', Boolean(isDepart));
    btn.classList.toggle('rangeReturnDate', Boolean(isReturn));
  }

  /** @internal */
  renderCellButton() {
    const outOfRange = this.isOutOfRange(this.day, this.min, this.max);
    const blackout = this.isBlackout();

    // Static and selection-driven classes only. Hover-driven classes
    // (inRange, lastHoveredDate, rangeDepartDate during preview) are
    // managed imperatively via updateRangePreviewClasses() to avoid
    // O(N) Lit re-renders on every focus/hover event.
    const isFirstDay = this.day?.title === 1;
    const isLastDay = this.day?.date && (() => {
      const dt = new Date(this.day.date * 1000);
      return dt.getDate() === new Date(dt.getFullYear(), dt.getMonth() + 1, 0).getDate();
    })();

    const buttonClasses = {
      'day': true,
      'body-default': true,
      'currentDate': this.isCurrentDate,
      'selected': this.selected,
      'inRange': this.datepicker?.hasAttribute('range') && this.dateTo && this.isInRange(this.day, this.dateFrom, this.dateTo),
      'disabled': outOfRange,
      blackout,
      'rangeDepartDate': this.datepicker?.hasAttribute('range') && this.isDepartDate(this.day, this.dateFrom) && this.dateTo,
      'rangeReturnDate': this.datepicker?.hasAttribute('range') && this.isReturnDate(this.day, this.dateFrom, this.dateTo),
      'reference': this.isReferenceDate(this.dateStr),
      'sameDateTrip': this.datepicker?.hasAttribute('range') && this.dateFrom === this.dateTo,
      'firstDayOfMonth': isFirstDay,
      'lastDayOfMonth': isLastDay,
    };

    return html`
      <button
        slot="trigger"
        id="${this.getCellId()}"
        @click="${outOfRange ? undefined : this.handleTap}"
        @mouseover="${outOfRange ? undefined : this.handleHover}"
        @focus="${outOfRange ? undefined : this.handleFocus}"
        class="${classMap(buttonClasses)}"
        ?disabled="${outOfRange}"
        tabindex="-1">
        <div class="buttonWrapper" aria-hidden="true">
          <div class="currentDayMarker">${this.day?.title || nothing}</div>
          <div class="dateSlot body-2xs" part="dateSlot" aria-hidden="true" ?hidden="${!this.renderForDateSlot}">
            <slot name="date_${this.dateStr}"></slot>
          </div>
        </div>
      </button>
    `;
  }

  render() {
    const { hasPopoverContent } = this;

    if (hasPopoverContent) {
      return html`
        <${this.popoverTag}>
          <span aria-hidden="true"><slot name="popover_${this.dateStr}"></slot></span>
          ${this.renderCellButton()}
        </${this.popoverTag}>
      `;
    }

    return html`
      ${this.renderCellButton()}
    `;
  }
}

if (!customElements.get('auro-formkit-calendar-cell')) {
  customElements.define('auro-formkit-calendar-cell', AuroCalendarCell);
}

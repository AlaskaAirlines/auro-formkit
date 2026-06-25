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

/* eslint-disable curly, max-lines, no-underscore-dangle, no-magic-numbers, no-underscore-dangle, max-params, no-extra-parens, arrow-parens, max-lines, line-comment-position, no-inline-comments, lit/binding-positions, lit/no-invalid-html */

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
    this.disabledDays = [];
    this.isCurrentDate = false;
    this._locale = null;
    this.dateStr = null;
    this.renderForDateSlot = false; // When false, the numerical date will render vertically centered. When true, the date will render off-center to the top and leave room below for the slot content.
    this.active = false;
    this.hasPopoverContent = false;

    this.runtimeUtils = new AuroLibraryRuntimeUtils();

    /**
     * Generate unique names for dependency components.
     */
    const versioning = new AuroDependencyVersioning();
    this.popoverTag = versioning.generateTag('auro-formkit-datepicker-popover', popoverVersion, AuroPopover);
  }

  // This function is to define props used within the scope of this component
  // Be sure to review  https://lit-element.polymer-project.org/guide/properties#reflected-attributes
  // to understand how to use reflected attributes with your property settings.
  static get properties() {
    return {
      // ...super.properties,
      day:           { type: Object },
      selected:      { type: Boolean },
      dateTo:        { type: String },
      dateFrom:      { type: String },
      month:         { type: String },
      min:           { type: Number },
      max:           { type: Number },
      disabled:      {
        type: Boolean,
        reflect: true
      },
      disabledDays:  { type: Array },
      isCurrentDate: { type: Boolean },
      locale:        { type: String },
      dateStr:       { type: String },
      renderForDateSlot: { type: Boolean },
      hasPopoverContent: { type: Boolean }
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
   * Handles selected state of the calendar cell when the selection changes.
   * Also clears any imperative range preview classes so classMap is the
   * sole source of truth after a selection update.
   * @private
   * @param {Number} dateFrom - Depart date.
   * @param {Number} dateTo - Return date.
   * @param {Object} day - An object containing the dateFrom and day of month values.
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
   * Handles user click events and calls datepicker to update the value(s).
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
   * Handles user hover events and dispatches a custom event.
   * Does NOT set any reactive properties — the range preview is handled
   * imperatively by the calendar component to avoid O(N) re-renders.
   * @private
   * @returns {void}
   */
  handleHover() {
    this.dispatchEvent(new CustomEvent('date-is-hovered', {
      detail: { date: this.day?.date },
    }));
  }

  /**
   * Handles focus events on the cell button.
   * Dispatches a lightweight event for the calendar to handle SR
   * announcements and range preview updates without triggering
   * any Lit lifecycle updates.
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
   * Checks if the current date is outside the valid min/max range.
   * Out-of-range cells are not focusable and are hidden from screen readers.
   * @private
   * @param {Object} day - An object containing the dateFrom and day of month values.
   * @param {Number} min - The minimum date value.
   * @param {Number} max - The maximum date value.
   * @returns {Boolean} - True if the date is out of range.
   */
  isOutOfRange(day, min, max) {
    if (day && day.date !== null && day.date !== undefined) {
      return day.date < min || day.date > max;
    }
    return false;
  }

  /**
   * Checks if the current date is a blackout date (in disabledDays but within range).
   * Blackout cells are focusable but not selectable.
   * @private
   * @returns {Boolean} - True if the date is a blackout date.
   */
  isBlackout() {
    if (!this.day || this.day.date === null || this.day.date === undefined || this.isOutOfRange(this.day, this.min, this.max)) {
      return false;
    }

    // Check against disabledDays timestamps (legacy path)
    if (Array.isArray(this.disabledDays) && this.disabledDays.length > 0 &&
      (this.disabledDays.findIndex(dd => parseInt(dd, 10) === this.day.date) !== -1)) {
      return true;
    }

    // Check against blackoutDates (ISO format YYYY-MM-DD) on the datepicker
    const blackoutDates = this.datepicker?.blackoutDates;

    if (Array.isArray(blackoutDates) && blackoutDates.length > 0) {
      const date = new Date(this.day.date * 1000);
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      const cellDate = `${yyyy}-${mm}-${dd}`;
      if (blackoutDates.includes(cellDate)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Checks if the current date is disabled based on min/max range or the
   * legacy disabledDays timestamp list.  Sets the `disabled` attribute on the
   * host when the date falls outside the allowed range or appears in
   * disabledDays. Note: blackout dates are handled separately by `isBlackout()`.
   * @private
   * @param {Object} day - An object containing the dateFrom and day of month values.
   * @param {Number} min - The minimum date value.
   * @param {Number} max - The maximum date value.
   * @param {Array} disabledDays - An array of disabled dates.
   * @returns {Boolean} - True if the date is disabled.
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
   * Generates a unique cell ID in the format cell-YYYY-MM-DD.
   * @private
   * @returns {String} The unique cell ID.
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
   * Generates a localized aria-label for the cell button using Intl.DateTimeFormat.
   * Includes range position and blackout status.
   * @private
   * @returns {String} The aria-label string.
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
   * @returns {String|null} Range position label or null if not in range mode.
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
   * Checks if the current date is the depart date.
   * @private
   * @param {Object} day - An object containing the dateFrom and day of month values.
   * @param {Number} dateFrom - Depart date.
   * @returns {Boolean} True if the date is the depart date.
   */
  isDepartDate(day, dateFrom) {
    const parsedDateFrom = parseInt(dateFrom, 10);
    const departTimestamp = new Date(parsedDateFrom * 1000).setHours(0, 0, 0, 0) / 1000;

    return this.selected && day.date === departTimestamp;
  }

  /**
   * Checks if the current date is the return date.
   * @private
   * @param {Object} day - An object containing the dateFrom and day of month values.
   * @param {Number} dateFrom - Depart date.
   * @param {Number} dateTo - Return date.
   * @returns {Boolean} True if the date is the return date.
   */
  isReturnDate(day, dateFrom, dateTo) {
    const parsedDateTo = parseInt(dateTo, 10);
    const returnTimestamp = new Date(parsedDateTo * 1000).setHours(0, 0, 0, 0) / 1000;

    return this.selected && day.date === returnTimestamp && dateFrom;
  }

  /**
   * Checks if the current date is between dateFrom and dateTo.
   * @private
   * @param {Object} day - An object containing the dateFrom and day of month values.
   * @param {Number} dateFrom - Depart date.
   * @param {Number} dateTo - Return date.
   * @returns {Boolean} True if the current date is between dateFrom and dateTo.
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
   * Determines the hovered date appearing latest in the calendar.
   * @private
   * @param {Object} day - An object containing the dateFrom and day of month values.
   * @param {Number} dateFrom - Depart date.
   * @param {Number} dateTo - Return date.
   * @param {Number} hoveredDate - Hovered date.
   * @returns {Boolean} True if the hovered date is the latest hovered date in the calendar.
   */
  isLastHoveredDate(day, dateFrom, dateTo, hoveredDate) {
    return dateFrom && hoveredDate > dateFrom && day.date === hoveredDate && !dateTo;
  }

  /**
   * Checks if the current date is a referenced date.
   * @param {Object} dateStr - The date string in YYYY_MM_DD format.
   * @returns Boolean - True if the date is a referenced date.
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
   * Determines the title of the auro-calendar-cell.
   * @private
   * @param {Number} date - The date of the auro-calendar-cell.
   * @returns {String} The title of the auro-calendar-cell in the user's locale.
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
   * Gets the name of the date slot.
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
   * Remove existing cell slot content and clone any current slot content from the root `auro-datepicker` which matches this cells date.
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
    const calendarMonth = this.runtimeUtils.closestElement('auro-formkit-calendar-month', this);
    const calendar = this.runtimeUtils.closestElement('auro-formkit-calendar', calendarMonth);

    if (!calendar) {
      setTimeout(() => this.firstUpdated(), 0);
      return;
    }
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

    // Configure popover when it first becomes rendered
    if (properties.has('hasPopoverContent') && this.hasPopoverContent) {
      this.updateComplete.then(() => this.configurePopover());
    }
  }

  /**
   * Sets host-level ARIA so each cell exposes its date, selection state,
   * and blackout status to assistive tech browsing the month grid.
   * @private
   * @returns {void}
   */
  updateHostAria() {
    if (!this.day || this.day.date === undefined) return;

    const outOfRange = this.isOutOfRange(this.day, this.min, this.max);
    if (outOfRange) {
      this.removeAttribute('role');
      this.removeAttribute('aria-label');
      this.removeAttribute('aria-current');
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
   * Programmatically focuses the cell's interactive button element.
   * Uses focusVisible: true so the :focus-visible ring appears even when
   * the bib was opened via mouse click (which sets mouse input modality).
   * @returns {void}
   */
  focusButton() {
    const button = this._cachedButton || this.shadowRoot.querySelector('button:not([disabled])');
    if (button) {
      button.focus({ focusVisible: true });
    }
  }

  /**
   * Imperatively marks this cell as active without triggering a Lit re-render.
   * Buttons stay tabindex="-1" because DOM focus stays on the grid wrapper —
   * arrow keys move the active cell imperatively and the live region carries
   * the SR announcement.
   * @returns {void}
   */
  setActive() {
    this.active = true;

    // Show the popover when this cell becomes active via keyboard navigation.
    if (this.auroPopover) {
      this.auroPopover.toggleShow();
    }
  }

  /**
   * Imperatively marks this cell as inactive without triggering a Lit re-render.
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
   * Updates range preview classes imperatively (no Lit re-render).
   * Called by the calendar component when the hovered date changes
   * during range selection (dateFrom set, dateTo not yet set).
   * @param {Number} hoveredDate - Unix timestamp of the currently hovered/focused date.
   * @param {Number} dateFrom - Unix timestamp of the selected departure date.
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
   * Clears all imperative range preview classes from the cell button.
   * Called when a selection occurs so classMap becomes the sole source of truth.
   * @returns {void}
   */
  clearRangePreviewClasses() {
    const btn = this._cachedButton;
    if (!btn) return;

    btn.classList.remove('inRange', 'lastHoveredDate', 'rangeDepartDate');
  }

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

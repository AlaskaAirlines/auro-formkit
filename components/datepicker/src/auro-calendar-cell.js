import { LitElement, nothing } from "lit";
import { html } from 'lit/static-html.js';
import { classMap } from 'lit/directives/class-map.js';
import { format, startOfDay } from 'date-fns';
import { enUS } from 'date-fns/locale';

import styleCss from './styles/style-auro-calendar-cell-css.js';
import colorCss from './styles/color-cell-css.js';
import tokensCss from './styles/tokens-css.js';

import { AuroDependencyVersioning } from '@aurodesignsystem/auro-library/scripts/runtime/dependencyTagVersioning.mjs';

import { AuroPopover } from '@aurodesignsystem/auro-popover/class';
import popoverVersion from './popoverVersion.js';

import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';

/* eslint-disable curly, max-lines, no-underscore-dangle, no-magic-numbers, no-underscore-dangle, max-params, no-void, init-declarations, no-extra-parens, arrow-parens, max-lines, line-comment-position, no-inline-comments, lit/binding-positions, lit/no-invalid-html */

export class AuroCalendarCell extends LitElement {
  constructor() {
    super();

    this.day = null;
    this.selected = false;
    this.hovered = false;
    this.dateTo = null;
    this.dateFrom = null;
    this.month = null;
    this.min = null;
    this.max = null;
    this.disabled = false;
    this.disabledDays = [];
    this.hoveredDate = null;
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
      hovered:       { type: Boolean },
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
      hoveredDate:   { type: String },
      isCurrentDate: { type: Boolean },
      locale:        { type: Object },
      dateStr:       { type: String },
      renderForDateSlot: { type: Boolean },
      active:        {
        type: Boolean,
        reflect: true
      },
      hasPopoverContent: { type: Boolean }
    };
  }

  get locale() {
    return this._locale ? this._locale : enUS;
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
   * Handles selected and hovered states of the calendar cell when the date changes.
   * @private
   * @param {Number} dateFrom - Depart date.
   * @param {Number} dateTo - Return date.
   * @param {Number} hoveredDate - Hovered date.
   * @param {Object} day - An object containing the dateFrom and day of month values.
   * @returns {void}
   */
  dateChanged(dateFrom, dateTo, hoveredDate, day) {
    this.selected = false;
    this.hovered = false;

    const parsedDateFrom = parseInt(dateFrom, 10);
    const parsedDateTo = parseInt(dateTo, 10);

    if (day) {
      const departTimestamp = startOfDay(parsedDateFrom * 1000) / 1000;
      const returnTimestamp = startOfDay(parsedDateTo * 1000) / 1000;

      if (day.date === departTimestamp || day.date === returnTimestamp) {
        this.selected = true;
      }

      if (((hoveredDate === day.date || day.date < hoveredDate) && day.date > parsedDateFrom && !parsedDateTo && !Number.isNaN(parsedDateFrom) && parsedDateFrom !== undefined && !this.selected) || (day.date > parsedDateFrom && day.date < parsedDateTo)) {
        this.hovered = true;
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
   * Handles Enter/Space key on the cell button.
   * @private
   * @param {KeyboardEvent} event - The keyboard event.
   * @returns {void}
   */
  handleKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleTap();
    }
  }

  /**
   * Handles user hover events and dispatches a custom event.
   * @private
   * @returns {void}
   */
  handleHover() {
    if (this.hovered) return;
    this.hovered = true;

    let _a;
    this.dispatchEvent(new CustomEvent('date-is-hovered', {
      detail: { date: (_a = this.day) === null || _a === void 0 ? void 0 : _a.date },
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
    if (day && day.date != null) {
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
    if (!this.day || this.day.date == null || this.isOutOfRange(this.day, this.min, this.max)) {
      return false;
    }

    // Check against blackoutDates (ISO format YYYY-MM-DD) on the datepicker
    const blackoutDates = this.datepicker?.blackoutDates;

    if (Array.isArray(blackoutDates) && blackoutDates.length > 0) {
      const cellDate = new Date(this.day.date * 1000).toISOString().split('T')[0];
      if (blackoutDates.includes(cellDate)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Checks if the current date is a valid date depending on the min and max values.
   * Sets the disabled attribute for both out-of-range and blackout dates.
   * @private
   * @param {Object} day - An object containing the dateFrom and day of month values.
   * @param {Number} min - The minimum date value.
   * @param {Number} max - The maximum date value.
   * @param {Array} disabledDays - An array of disabled dates.
   * @returns {Boolean} - True if the date is disabled.
   */
  isEnabled(day, min, max, disabledDays) {
    this.removeAttribute('disabled');

    if (disabledDays && day && day.date) {
      if (day.date < min || day.date > max || disabledDays.findIndex(disabledDay => parseInt(disabledDay, 10) === day.date) !== -1) {
        this.setAttribute('disabled', true);
        return true;
      }
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

    // Generate localized full date string
    const dateFormatter = new Intl.DateTimeFormat(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    let label = dateFormatter.format(date);

    // appending popover content here so that it get's read in a logical order with the other date content.
    if (this.hasPopoverContent) {
      label += `, ${this.querySelector(`[slot="popover_${this.dateStr}"]`).innerText.trim()}`;
    }

    // Append range position if in range mode
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

    const departTimestamp = startOfDay(parsedDateFrom * 1000) / 1000;
    const dayDate = this.day.date;

    const parsedDateTo = Number.parseInt(this.dateTo, 10);
    const hasDateTo = Number.isFinite(parsedDateTo);
    const returnTimestamp = hasDateTo ? startOfDay(parsedDateTo * 1000) / 1000 : null;

    if (dayDate === departTimestamp) return this.datepicker.rangeLabelStart || 'range start';

    if (hasDateTo && dayDate === returnTimestamp) return this.datepicker.rangeLabelEnd || 'range end';

    if (dayDate < departTimestamp) return this.datepicker.rangeLabelBeforeRange || 'before range';

    if (hasDateTo && dayDate > departTimestamp && dayDate < returnTimestamp) return this.datepicker.rangeLabelInRange || 'in range';

    // After start date, no end date yet, or after end date
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
    const departTimestamp = startOfDay(parsedDateFrom * 1000) / 1000;

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
    const returnTimestamp = startOfDay(parsedDateTo * 1000) / 1000;

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
   * Checks if the current date is a highlighted date.
   * @param {Object} dateStr - The date string in MM_DD_YYYY format.
   * @returns Boolean - True if the date is a highlighted date.
   */
  isReferenceDate(dateStr) {
    // If the datepicker has highlighted dates specified
    if (this.datepicker && this.datepicker.hasAttribute('referenceDates')) {

      // Get the referenceDates attribute from the datepicker
      const {referenceDates} = this.datepicker;

      // Guard clause: no dates in the array
      if (!Array.isArray(referenceDates) || referenceDates.length === 0) return false;

      // Compare the dateStr (MM_DD_YYYY) to the referenceDates (MM/DD/YYYY)
      const compareDateStr = dateStr.replace(/_/gu, '/');

      // Check if the compareDateStr is in the referenceDates array
      return referenceDates.includes(compareDateStr);
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
    return format(date * 1000, 'PPPP', {
      locale: this.locale,
    });
  }

  /**
   * Gets the name of the date slot.
   * @private
   * @returns {void}
   */
  setDateSlotName() {
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

    this.dateStr = `${month}_${day}_${year}`;
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
    this.datepicker.addEventListener('auroDatePicker-newSlotContent', () => {
      this.handleSlotContent();
    });

    this.auroPopover = this.shadowRoot.querySelector(this.popoverTag._$litStatic$);

    if (this.auroPopover) {
      this.auroPopover.boundary = calendarMonth;
    }
  }

  updated(properties) {
    if (properties.has('dateFrom') || properties.has('dateTo') || properties.has('hoveredDate') || properties.has('day')) {
      this.dateChanged(this.dateFrom, this.dateTo, this.hoveredDate, this.day);
    }

    this.setDateSlotName();
    this.handleSlotContent();
  }

  /**
   * Programmatically focuses the cell's interactive button element.
   * @returns {void}
   */
  focusButton() {
    const button = this.shadowRoot.querySelector('button:not([aria-hidden])');
    if (button) {
      button.focus();
    }
  }

  renderCellButton() {
    const outOfRange = this.isOutOfRange(this.day, this.min, this.max);
    const role = outOfRange ? 'presentation' : 'gridcell';
    const blackout = this.isBlackout();

    const buttonClasses = {
      'day': true,
      'body-lg': true,
      'currentDate': this.currentDate,
      'selected': this.selected,
      'inRange': this.datepicker?.hasAttribute('range') && this.hovered && this.isInRange(this.day, this.dateFrom, this.dateTo),
      'lastHoveredDate': this.isLastHoveredDate(this.day, this.dateFrom, this.dateTo, this.hoveredDate) && this.datepicker && this.datepicker.hasAttribute('range'),
      'disabled': outOfRange,
      'blackout': blackout,
      'rangeDepartDate': this.datepicker?.hasAttribute('range') && this.isDepartDate(this.day, this.dateFrom) && (this.hoveredDate > this.dateFrom || this.dateTo),
      'rangeReturnDate': this.datepicker?.hasAttribute('range') && this.isReturnDate(this.day, this.dateFrom, this.dateTo),
      'reference': this.isReferenceDate(this.dateStr),
      'sameDateTrip': this.datepicker?.hasAttribute('range') && this.dateFrom === this.dateTo
    };

    return html`
      <button
        slot="trigger"
        id="${this.getCellId()}"
        role="${role}"
        @click="${outOfRange ? nothing : this.handleTap}"
        @mouseover="${outOfRange ? nothing : this.handleHover}"
        @focus="${outOfRange ? nothing : this.handleHover}"
        class="${classMap(buttonClasses)}"
        ?disabled="${outOfRange}"
        ?aria-disabled="${blackout}"
        ?aria-hidden="${outOfRange}"
        aria-selected="${this.selected ? 'true' : 'false'}"
        aria-current="${this.isCurrentDate ? 'date' : nothing}"
        tabindex="${this.active ? '0' : '-1'}">
        <span class="srOnly">${this.getAriaLabel()}</span>
        <div class="buttonWrapper" aria-hidden="true">
          <div class="currentDayMarker">${this.day?.title || nothing}</div>
        </div>
        <div class="dateSlot body-2xs" part="dateSlot" ?hidden="${!this.renderForDateSlot}">
          <slot name="date_${this.dateStr}"></slot>
        </div>
      </button>
    `;
  }

  render() {
    const hasPopoverContent = this.hasPopoverContent;

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

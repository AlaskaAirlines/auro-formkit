// Copyright (c) 2022 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

/* eslint-disable max-lines, max-depth, no-magic-numbers, complexity, newline-per-chained-call, no-underscore-dangle, lit/binding-positions,
   lit/no-invalid-html, no-unused-expressions */

// If using litElement base class
import { LitElement } from "lit";
import { html } from 'lit/static-html.js';

import AuroFormValidation from '@auro-formkit/form-validation';

import { AuroDependencyVersioning } from '@aurodesignsystem/auro-library/scripts/runtime/dependencyTagVersioning.mjs';
import { AuroDatepickerUtilities } from './utilities.js';
import { UtilitiesCalendarRender } from './utilitiesCalendarRender.js';

import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';

// Import touch detection lib
import styleCss from "./styles/style-css.js";
import colorCss from "./styles/color-css.js";
import tokensCss from "./styles/tokens-css.js";

import './auro-calendar.js';

import { AuroDropdown } from '@aurodesignsystem/auro-dropdown';
import dropdownVersion from './formkit/auro-dropdownVersion.js';

import { AuroInput } from '@aurodesignsystem/auro-input';
import inputVersion from './formkit/auro-inputVersion.js';

// See https://git.io/JJ6SJ for "How to document your components using JSDoc"
/**
 * @slot helpText - Defines the content of the helpText.
 * @slot mobileDateLabel - Defines the content to display above selected dates in the mobile layout.
 * @slot toLabel - Defines the label content for the second input when the `range` attribute is used.
 * @slot fromLabel - Defines the label content for the first input.
 * @slot date_MM_DD_YYYY - Defines the content to display in the auro-calendar-cell for the specified date. The content text is colored using the success state token when the `highlight` attribute is applied to the slot.
 * @slot popover_MM_DD_YYYY - Defines the content to display in the auro-calendar-cell popover for the specified date.
 * @csspart dropdown - Use for customizing the style of the dropdown.
 * @csspart trigger - Use for customizing the style of the datepicker trigger.
 * @csspart input - Use for customizing the style of the datepicker inputs.
 * @csspart calendarWrapper - Use for customizing the style of the calendar container.
 * @csspart calendar - Use for customizing the style of the calendar.
 * @csspart helpTextSpan - Use for customizing the style of the datepicker help text span.
 * @csspart helpText - Use for customizing the style of the datepicker help text.
 * @event auroDatePicker-valueSet - Notifies that the component has a new value set.
 * @event auroDatePicker-toggled - Notifies that the calendar dropdown has been opened/closed.
 * @event auroDatePicker-monthChanged - Notifies that the visible calendar month(s) have changed.
 * @event auroFormElement-validated - Notifies that the component value(s) have been validated.
 * @event auroDatePicker-newSlotContent - Notifies that new slot content has been added to the datepicker.
 */

// build the component class
export class AuroDatePicker extends LitElement {
  constructor() {
    super();

    /**
     * @private
     */
    this.util = new AuroDatepickerUtilities();

    /**
     * @private
     */
    this.calendarRenderUtil = new UtilitiesCalendarRender();

    // If `calendarStartDate` is set, use that as the central date. Otherwise, use the current date.
    if (this.getAttribute('calendarStartDate') && this.util.validDateStr(this.getAttribute('calendarStartDate'))) {
      this.calendarRenderUtil.updateCentralDate(this, this.getAttribute('calendarStartDate'));
    } else {
      this.calendarRenderUtil.updateCentralDate(this, new Date());
    }

    this.disabled = false;
    this.required = false;
    this.range = false;
    this.noValidate = false;
    this.validity = undefined;
    this.value = undefined;
    this.valueEnd = undefined;
    this.calendarStartDate = undefined;
    this.calendarEndDate = undefined;
    this.calendarFocusDate = this.value;
    this.monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    /**
     * @private
     */
    this.type = "month-day-year";

    /**
     * @private
     */
    this.dateSlotContent = [];

    /**
     * @private
     */
    this.validation = new AuroFormValidation();

    /**
     * @private
     */
    this.runtimeUtils = new AuroLibraryRuntimeUtils();

    /**
     * @private
     */
    this.forceScrollOnNextMobileCalendarRender = false;

    /**
     * Generate unique names for dependency components.
     */
    const versioning = new AuroDependencyVersioning();

    /**
     * @private
     */
    this.dropdownTag = versioning.generateTag('auro-dropdown', dropdownVersion, AuroDropdown);

    /**
     * @private
     */
    this.inputTag = versioning.generateTag('auro-input', inputVersion, AuroInput);
  }

  // This function is to define props used within the scope of this component
  // Be sure to review  https://lit-element.polymer-project.org/guide/properties#reflected-attributes
  // to understand how to use reflected attributes with your property settings.
  static get properties() {
    return {
      // ...super.properties,
      /**
       * The last date that may be displayed in the calendar.
       */
      calendarEndDate: {
        type: String,
        reflect: true
      },

      /**
       * The date that will first be visually rendered to the user in the calendar.
       */
      calendarFocusDate: {
        type: String,
        reflect: true
      },

      /**
       * The first date that may be displayed in the calendar.
       */
      calendarStartDate: {
        type: String,
        reflect: true
      },

      /**
       * The date that determines the currently visible month.
       */
      centralDate: {
        type: String
      },

      /**
       * If set, disables the datepicker.
       */
      disabled: {
        type: Boolean,
        reflect: true
      },

      /**
       * When defined, sets persistent validity to `customError` and sets the validation message to the attribute value.
       */
      error: {
        type: String,
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
       * Names of all 12 months to render in the calendar, used for localization of date string in mobile layout.
       */
      monthNames: {
        type: Array
      },

      /**
       * If set, disables auto-validation on blur.
       */
      noValidate: {
        type: Boolean
      },

      /**
       * If set, turns on date range functionality in auro-calendar.
       */
      range: {
        type: Boolean,
        reflect: true
      },

      /**
       * Populates the `required` attribute on the input. Used for client-side validation.
       */
      required: {
        type: Boolean,
        reflect: true
      },

      /**
       * Sets a custom help text message to display for all validityStates.
       */
      setCustomValidity: {
        type: String
      },

      /**
       * Custom help text message to display when validity = `customError`.
       */
      setCustomValidityCustomError: {
        type: String
      },

      /**
       * Custom help text message to display when validity = `rangeOverflow`.
       */
      setCustomValidityRangeOverflow: {
        type: String
      },

      /**
       * Custom help text message to display when validity = `rangeUnderflow`.
       */
      setCustomValidityRangeUnderflow: {
        type: String
      },

      /**
       * Custom help text message to display when validity = `valueMissing`.
       */
      setCustomValidityValueMissing: {
        type: String
      },

      /**
       * Specifies the `validityState` this element is in.
       */
      validity: {
        type: String,
        reflect: true
      },

      /**
       * Value selected for the datepicker.
       */
      value: {
        type: String
      },

      /**
       * Value selected for the second datepicker when using date range.
       */
      valueEnd: {
        type: String
      }
    };
  }

  static get styles() {
    return [
      styleCss,
      colorCss,
      tokensCss
    ];
  }

  /**
   * This will register this element with the browser.
   * @param {string} [name="auro-datepicker"] - The name of element that you want to register to.
   *
   * @example
   * AuroDatePicker.register("custom-datepicker") // this will register this element to <custom-datepicker/>
   *
   */
  static register(name = "auro-datepicker") {
    AuroLibraryRuntimeUtils.prototype.registerComponent(name, AuroDatePicker);
  }

  /**
   * Force the calendar view to the focus date when it changes.
   * @private
   * @returns {void}
   */
  handleFocusDateChange() {
    if (this.calendarFocusDate) {
      this.calendarRenderUtil.updateCentralDate(this, this.calendarFocusDate);

      this.forceScrollOnNextMobileCalendarRender = true;
    }
  }

  /**
   * @private
   * @param {Number} length - Number of characters for the returned random string.
   * @returns {string}
   */
  generateRandomString(length) {
    return Math.random().toString(36).substring(2, length + 2);
  }

  /**
   * Focuses the datepicker trigger input.
   * @param {String} focusInput - Pass in `endDate` to focus on the return input. No parameter is needed to focus on the depart input.
   * @returns {void}
   */
  focus(focusInput) {
    this.range && focusInput === 'endDate' ? this.inputList[1].focus() : this.inputList[0].focus();
  }


  /**
   * Converts valid time number to format used by wc-date-range API.
   * @private
   * @param {Date} date - Date to be converted.
   * @returns {Number} Simplified number.
   */
  convertToWcValidTime(date) {
    return new Date(date).getTime() / 1000;
  }

  /**
   * Converts date object into a string.
   * @private
   * @param {String} time - Unix timestamp to be converted to a date object.
   * @returns {Date} Date formatted as a string.
   */
  convertWcTimeToDate(time) {
    return new Date(time * 1000).toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  /**
   * Sends event notifying that the input has changed it's value.
   * @private
   * @returns {void}
   */
  notifyValueChanged() {
    let inputEvent = null;

    inputEvent = new Event('auroDatePicker-valueSet', {
      bubbles: true,
      composed: true,
    });

    // Dispatched event to alert outside shadow DOM context of event firing.
    this.dispatchEvent(inputEvent);
  }

  /**
   * Generates a date string used in the mobile calendar layout.
   * @private
   * @param {string} date - Date to parse into longer mobile version.
   * @returns {string}
   */
  getMobileDateStr(date) {
    let dateStr = '';
    const dateObj = new Date(date);

    if (date && this.util.validDateStr(date)) {
      dateStr += this.monthNames[dateObj.getMonth()].substring(0, 3);
      dateStr += ' ';
      dateStr += dateObj.getDate();
      dateStr += ', ';
      dateStr += dateObj.getFullYear();
      dateStr += ' (';
      // Need TODO: need to  make locale not be hardcoded - https://phrase.com/blog/posts/detecting-a-users-locale/
      dateStr += dateObj.toLocaleDateString('en-US', { weekday: 'short' });
      dateStr += ')';
    }

    return dateStr;
  }

  /**
   * Changes the calendar's visibility to reflect the value of the central date attribute.
   * @private
   * @returns {void}
   */
  handleCentralDateChange() {
    this.calendar.setAttribute('centralDate', this.centralDate);
  }

  /**
   * Sends event notifying that the calendar popover has been opened.
   * @private
   * @returns {void}
   */
  notifyDatepickerToggled() {
    this.dispatchEvent(new CustomEvent('auroDatePicker-toggled', {
      bubbles: true,
      composed: true,
      detail: {
        expanded: this.dropdown.isPopoverVisible,
      },
    }));
  }

  /**
   * Sends event notifying that the calendar's visible month has changed.
   * @param {Object} event - Event passed in from auro-calendar when the event triggered this function.
   * @private
   * @returns {void}
   */
  notifyMonthChanged(event) {
    this.dispatchEvent(new CustomEvent('auroDatePicker-monthChanged', {
      bubbles: true,
      composed: true,
      detail: {
        month: event.detail.month,
        year: event.detail.year,
        numCalendars: event.detail.numCalendars,
      },
    }));
  }

  /**
   * Binds all behavior needed to the dropdown after rendering.
   * @private
   * @returns {void}
   */
  configureDropdown() {
    this.dropdown = this.shadowRoot.querySelector(this.dropdownTag._$litStatic$);

    this.dropdown.addEventListener('auroDropdown-triggerClick', () => {
      if (!this.isPopoverVisible) {
        this.dropdown.show();
      }
    });

    this.dropdown.addEventListener('auroDropdown-toggled', () => {
      this.setAttribute('aria-expanded', this.dropdown.isPopoverVisible);
      this.notifyDatepickerToggled();

      this.calendar.visible = this.dropdown.isPopoverVisible;

      if (this.dropdown.getAttribute('data-show')) {
        if (this.forceScrollOnNextMobileCalendarRender) {
          this.calendar.scrollMonthIntoView(this.calendarFocusDate);
          this.forceScrollOnNextMobileCalendarRender = false;
        }
      }
    });

    if (!this.dropdown.hasAttribute('aria-expanded')) {
      this.dropdown.setAttribute('aria-expanded', this.dropdown.isPopoverVisible);
    }
  }

  /**
   * Binds all behavior needed to the input after rendering.
   * @private
   * @returns {void}
   */
  configureInput() {
    this.triggerInput = this.dropdown.querySelector('[slot="trigger"');

    this.inputList = [...this.dropdown.querySelectorAll(this.inputTag._$litStatic$)];

    this.handleReadOnly();

    this.inputList.forEach((input, index) => {
      // auto-show bib when manually editing the input value
      input.addEventListener('keyup', (evt) => {
        if (evt.key.length === 1 || evt.key === 'Delete' || evt.key === 'Backspace') {
          this.dropdown.show();
        }
      });

      input.addEventListener('input', () => {
        if (index === 0) {
          this.value = input.value;
        } else if (index === 1) {
          this.valueEnd = input.value;
        }

        this.notifyValueChanged();
      });

      input.addEventListener('auroFormElement-validated', (evt) => {
        if (evt.detail.validity === 'customError') {
          this.validity = evt.detail.validity;
          this.errorMessage = evt.detail.message;
        } else if (evt.target === this.inputList[0]) {
          this.validity = evt.detail.validity;
          this.errorMessage = evt.detail.message;
        } else if (this.inputList.length > 1 && evt.target === this.inputList[1] && (this.inputList[0].validity === 'valid' || this.inputList[0].validity === undefined)) {
          this.validity = evt.detail.validity;
          this.errorMessage = evt.detail.message;
        }
      });
    });
  }

  /**
   * Binds all behavior needed to the dropdown after rendering.
   * @private
   * @returns {void}
   */
  configureCalendar() {
    this.calendar = this.shadowRoot.querySelector('auro-calendar');
    this.calendar.datepicker = this;

    this.calendar.addEventListener('auroCalendar-dateSelected', () => {
      if (this.inputList[0].value !== this.calendar.dateFrom && this.calendar.dateFrom !== undefined) {
        this.inputList[0].value = this.convertWcTimeToDate(this.calendar.dateFrom);
      }

      if (this.inputList[1] && this.calendar.dateTo && this.inputList[1].value !== this.calendar.dateTo) {
        this.inputList[1].value = this.convertWcTimeToDate(this.calendar.dateTo);
      }
    });

    this.calendar.addEventListener('auroCalendar-dismissRequest', () => {
      this.dropdown.hide();
    });

    this.calendar.addEventListener('auroCalendar-centralDateChanged', (event) => {
      const match = this.util.datesMatch(event.detail.date, this.centralDate);

      if (!match) {
        this.calendarRenderUtil.updateCentralDate(this, event.detail.date);
      }

      this.notifyMonthChanged(event);
    });
  }

  /**
   * Binds all behavior needed to the datepicker after rendering.
   * @private
   * @returns {void}
   */
  configureDatepicker() {
    this.addEventListener('focusin', () => {

      /**
       * The datepicker is considered to be in it's initial state based on
       * if this.value === undefined. The first time we interact with the
       * datepicker manually, by applying focusin, we need to flag the
       * datepicker as no longer in the initial state.
       */
      if (this.value === undefined) {
        this.value = '';
      }

      if (this.valueEnd === undefined) {
        this.valueEnd = '';
      }
    });

    this.addEventListener('focusout', (evt) => {
      this.setAttribute('aria-expanded', this.dropdown.isPopoverVisible);

      if (!this.noValidate && !evt.detail.expanded && this.inputList[0].value !== undefined) {
        if (!this.contains(document.activeElement)) {
          this.validation.validate(this.inputList[0]);

          if (this.inputList[1] && this.inputList[1].value !== undefined) {
            this.validation.validate(this.inputList[1]);
          }
        }
      }
    });

    // Close the datepicker when clicking outside it
    document.addEventListener('click', (evt) => {
      if (!evt.composedPath().includes(this) &&
      !evt.composedPath().includes(this.dropdown.bibContent) &&
      this.dropdown.isPopoverVisible) {
        this.dropdown.hide();
      }
    });

    document.activeElement.addEventListener('focusin', () => {
      if (document.activeElement !== document.querySelector('body') &&
      !this.contains(document.activeElement) &&
      !this.dropdown.bibContent.contains(document.activeElement)) {
        this.dropdown.hide();
      }
    });

    if (this.hasAttribute('value') && this.getAttribute('value').length > 0) {
      this.calendar.dateFrom = new Date(this.value).getTime();
    }

    if (this.hasAttribute('valueEnd') && this.getAttribute('valueEnd').length > 0) {
      this.calendar.dateTo = new Date(this.valueEnd).getTime();
    }
  }

  /**
   * Sets the readonly attribute on the inputs based on the window width.
   * @private
   * @returns {void}
   */
  handleReadOnly() {
    // --ds-grid-breakpoint-sm
    const mobileBreakpoint = 576;

    this.inputList.forEach((input) => {
      if (window.innerWidth < mobileBreakpoint) {
        input.setAttribute('readonly', true);
      } else {
        input.removeAttribute('readonly');
      }
    });
  }

  /**
   * Keep the datepicker in sync with the calendar's central date.
   * @private
   * @param {Number} event - Event received from calendar with the new central date.
   * @returns {void}
   */
  handleCalendarCentralDateChange(event) {
    const match = this.util.datesMatch(event.detail.date, this.centralDate);

    if (!match) {
      this.calendarRenderUtil.updateCentralDate(this, event.detail.date);
    }
  }

  /**
   * Sets the datepicker's values to the auro-calendar-cell that was clicked.
   * @private
   * @param {Number} time - Unix timestamp to be converted to a date.
   * @returns {void}
   */
  handleCellClick(time) {
    this.cellClickActive = true;

    const newDate = this.convertWcTimeToDate(time);

    if (this.util.validDateStr(newDate)) {
      if (this.inputList.length > 1) {
        if (!this.value || !this.util.validDateStr(this.value)) {
          this.value = newDate;
        } else if (!this.valueEnd || !this.util.validDateStr(this.valueEnd)) {
          // verify the date is after this.value to insure we are setting a proper range
          if (new Date(newDate) >= new Date(this.value)) {
            this.valueEnd = newDate;
          } else {
            this.value = newDate;
          }
        } else {
          this.value = newDate;
          this.valueEnd = '';
        }
      } else {
        this.value = newDate;
      }
    }
  }

  /**
   * Emits an event to notify the calendar cells to fetch their slot content.
   * @private
   * @returns {void}
   */
  pushSlotContent() {
    this.dispatchEvent(new CustomEvent('auroDatePicker-newSlotContent'));
  }

  /**
   * Resets component to initial state.
   * @returns {void}
   */
  reset() {
    this.inputList.forEach((input) => {
      input.reset();
    });

    this.validation.reset(this);
  }

  updated(changedProperties) {
    if (changedProperties.has('calendarFocusDate')) {
      this.handleFocusDateChange();
    }

    if (changedProperties.has('calendarStartDate')) {
      this.calendar.setAttribute('calendarStartDate', this.getAttribute('calendarStartDate'));
    }

    if (changedProperties.has('calendarEndDate')) {
      this.calendar.setAttribute('calendarEndDate', this.getAttribute('calendarEndDate'));
    }

    if (changedProperties.has('minDate')) {
      // If the minDate was set to a valid date
      if (this.util.validDateStr(this.minDate)) {
        // When there is no focusDate and no value, set the focusDate to the minDate
        const nothingSet = !this.calendarFocusDate && !this.value;
        const earlierThanMinDate = new Date(this.calendarFocusDate) < new Date(this.minDate);

        if (nothingSet || earlierThanMinDate) {
          this.calendarFocusDate = this.minDate;
        }
      }
    }

    if (changedProperties.has('value')) {
      // Change the calendar focus to the first valid date value only the first time the value is set
      if (!this.calendarFocusDate && this.util.validDateStr(this.value)) {
        if (!this.dropdown.isPopoverVisible) {
          this.calendarFocusDate = this.value;
        }
      }

      if (this.cellClickActive) {
        this.cellClickActive = false;
      }

      if (this.value && this.util.validDateStr(this.value)) {
        if (this.calendar.dateFrom !== this.value) {
          this.calendar.dateFrom = this.convertToWcValidTime(this.value);
        }
      } else {
        if (this.inputList[0].value !== this.value) {
          if (this.value) {
            this.inputList[0].value = this.value;
          } else {
            this.inputList[0].value = '';
          }
        }

        if (this.calendar.dateFrom !== undefined) {
          this.calendar.dateFrom = undefined;
        }
      }

      // update the inputs
      if (this.inputList[0].value !== this.value) {
        if (this.value) {
          this.inputList[0].value = this.value;
        } else {
          this.inputList[0].value = '';
        }
      }

      this.validation.validate(this);
    }

    if (changedProperties.has('valueEnd') && this.inputList[1]) {
      // update the calendar
      if (this.valueEnd && this.util.validDateStr(this.valueEnd)) {
        this.calendar.dateTo = this.convertToWcValidTime(this.valueEnd);
      } else {
        if (this.inputList[1].value !== this.valueEnd) {
          if (this.valueEnd) {
            this.inputList[1].value = this.valueEnd;
          } else {
            this.inputList[1].value = '';
          }
        }

        if (this.calendar.dateTo !== undefined) {
          this.calendar.dateTo = undefined;
        }
      }

      // update the inputs
      if (this.inputList[1].value !== this.valueEnd) {
        if (this.valueEnd) {
          this.inputList[1].value = this.valueEnd;
        } else {
          this.inputList[1].value = '';
        }
      }

      this.validation.validate(this);
    }

    if (changedProperties.has('error')) {
      // Error attribute is passed down to the last input in the list to control the error state
      // This is done to prevent error icon from displaying on both inputs in range support
      const lastInput = this.inputList[this.inputList.length - 1];

      if (this.hasAttribute('error')) {
        // Set the error attribute on the last input
        lastInput.setAttribute('error', this.getAttribute('error'));
      } else {
        // Remove the error attribute on the last input
        lastInput.removeAttribute('error');
      }

      // Validate the last input
      this.validation.validate(lastInput, true);
    }

    if (this.value && this.valueEnd && this.util.validDateStr(this.value) && this.util.validDateStr(this.valueEnd)) {
      if (new Date(this.value) > new Date(this.valueEnd)) {
        this.valueEnd = undefined;
      }
    }

    // This resets the datepicker when the minDate is set to a new value that is
    // a later date than the current value date
    if (changedProperties.has('minDate')) {
      if (this.minDate) {
        const minDateMonth = Number(this.minDate.split('/')[0]);
        const minDateYear = Number(this.minDate.split('/')[2]);

        // This sets the visible month of the calendar to the minDate when the minDate is later
        // than the current visible date
        if (minDateYear > this.calendar.year) {
          this.calendarRenderUtil.updateCentralDate(this, this.minDate);
        } else if (minDateYear === this.calendar.year && minDateMonth > this.calendar.month) {
          this.calendarRenderUtil.updateCentralDate(this, this.minDate);
        }

        if (this.value) {
          if (new Date(this.minDate).getTime() > new Date(this.value).getTime()) {
            this.value = undefined;

            if (this.range && this.valueEnd) {
              this.valueEnd = undefined;
            }

            this.calendarRenderUtil.updateCentralDate(this, this.minDate);
          }
        }
      }
    }

    // This resets the datepicker when the maxDate is set to a new value that is
    // an earlier date than the current value date
    if (changedProperties.has('maxDate')) {
      const maxDateMonth = Number(this.maxDate.split('/')[0]);
      const maxDateYear = Number(this.maxDate.split('/')[2]);

      // This sets the visible month of the calendar to the maxDate when the maxDate is earlier
      // than the current visible date
      if (maxDateYear < this.calendar.year) {
        this.calendarRenderUtil.updateCentralDate(this, this.maxDate);
      } else if (maxDateYear === this.calendar.year && maxDateMonth < this.calendar.month) {
        this.calendarRenderUtil.updateCentralDate(this, this.maxDate);
      }

      if (this.maxDate) {
        if (this.value) {
          if (new Date(this.maxDate).getTime() < new Date(this.value).getTime()) {
            this.value = undefined;

            if (this.range && this.valueEnd) {
              this.valueEnd = undefined;
            }

            this.calendarRenderUtil.updateCentralDate(this, this.maxDate);
          }
        }
      }
    }

    if (changedProperties.has('centralDate')) {
      this.handleCentralDateChange();
    }
  }

  /**
   * Handles the transfer of content between slots in the component.
   *
   * @private
   * @method handleSlotToSlot
   * @param {Event} event - The event object containing information about the slot transfer.
   * @throws {Error} Throws an error if the slot cannot be found or injected.
   */
  handleSlotToSlot(event) {
    const slot = this.querySelector(`[slot='${event.target.name}']`);
    this.calendar.injectSlot(event.target.name, slot.cloneNode(true));
  }

  firstUpdated() {
    // Add the tag name as an attribute if it is different than the component name
    this.runtimeUtils.handleComponentTagRename(this, 'auro-datepicker');

    this.configureDropdown();
    this.configureInput();
    this.configureCalendar();
    this.configureDatepicker();

    window.addEventListener('resize', () => {
      this.handleReadOnly();
    });
  }

  // function that renders the HTML and CSS into  the scope of the component
  render() {
    return html`
      <div class="outerWrapper">
        <${this.dropdownTag}
          for="dropdownMenu"
          fluid
          bordered
          rounded
          ?disabled="${this.disabled}"
          ?error="${this.validity !== undefined && this.validity !== 'valid'}"
          disableEventShow
          noHideOnThisFocusLoss
          mobileFullscreenBreakpoint="sm"
          part="dropdown">
          <div slot="trigger" class="dpTriggerContent" part="trigger">
            <${this.inputTag}
              id="${this.generateRandomString(12)}"
              bordered
              class="dateFrom"
              ?required="${this.required}"
              noValidate
              .max="${this.maxDate}"
              .min="${this.minDate}"
              setCustomValidity="${this.setCustomValidity}"
              setCustomValidityCustomError="${this.setCustomValidityCustomError}"
              setCustomValidityValueMissing="${this.setCustomValidityValueMissing}"
              setCustomValidityRangeOverflow="${this.setCustomValidityRangeOverflow}"
              setCustomValidityRangeUnderflow="${this.setCustomValidityRangeUnderflow}"
              ?disabled="${this.disabled}"
              .type="${this.type}"
              part="input">
              <span slot="label"><slot name="fromLabel"></slot></span>
            </${this.inputTag}>
            ${this.range ? html`
              <${this.inputTag}
                id="${this.generateRandomString(12)}"
                bordered
                class="dateTo"
                ?required="${this.required}"
                noValidate
                .max="${this.maxDate}"
                .min="${this.minDate}"
                setCustomValidity="${this.setCustomValidity}"
                setCustomValidityCustomError="${this.setCustomValidityCustomError}"
                setCustomValidityValueMissing="${this.setCustomValidityValueMissing}"
                setCustomValidityRangeOverflow="${this.setCustomValidityRangeOverflow}"
                setCustomValidityRangeUnderflow="${this.setCustomValidityRangeUnderflow}"
                ?disabled="${this.disabled}"
                .type="${this.type}"
                part="input">
                <span slot="label"><slot name="toLabel"></slot></span>
              </${this.inputTag}>
            ` : undefined}
          </div>
          <div class="calendarWrapper" part="calendarWrapper">
            <auro-calendar
              ?noRange="${!this.range}"
              .min="${this.convertToWcValidTime(new Date(this.minDate))}"
              .max="${this.convertToWcValidTime(new Date(this.maxDate))}"
              .maxDate="${this.maxDate}"
              .minDate="${this.minDate}"
              part="calendar"
            >
              <slot slot="mobileDateLabel" name="mobileDateLabel" @slotchange="${this.handleSlotToSlot}"></slot>
              <span slot="mobileDateFromStr">${this.value ? this.getMobileDateStr(this.value) : html`<span class="placeholderDate">MM/DD/YYYY</span>`}</span>
              ${this.range ? html`<span slot="mobileDateToStr">${this.valueEnd ? this.getMobileDateStr(this.valueEnd) : html`<span class="placeholderDate">MM/DD/YYYY</span>`}</span>` : undefined}
            </auro-calendar>
          </div>
          <span slot="helpText" part="helpTextSpan">
            <!-- Help text and error message template -->
            ${!this.validity || this.validity === undefined || this.validity === 'valid'
              ? html`
                <slot name="helpText"></slot>
              ` : html`
                <p class="datepickerElement-helpText" role="alert" aria-live="assertive" part="helpText">
                  ${this.errorMessage}
                </p>`
            }
          </span>
        </${this.dropdownTag}>
      </div>
    `;
  }
}

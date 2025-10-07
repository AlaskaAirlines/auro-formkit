// Copyright (c) 2022 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

/* eslint-disable max-lines, no-magic-numbers, complexity, newline-per-chained-call, no-underscore-dangle, lit/binding-positions,
   lit/no-invalid-html, no-unused-expressions */

import { html } from 'lit/static-html.js';
import {classMap} from "lit/directives/class-map.js";

import AuroFormValidation from '@auro-formkit/form-validation';

import { AuroDependencyVersioning } from '@aurodesignsystem/auro-library/scripts/runtime/dependencyTagVersioning.mjs';
import { AuroDatepickerUtilities } from './utilities.js';
import { UtilitiesCalendarRender } from './utilitiesCalendarRender.js';

import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';

// Import touch detection lib
import styleCss from "./styles/style-css.js";
import colorCss from "./styles/color-css.js";
import tokensCss from "./styles/tokens-css.js";
import shapeSizeCss from "./styles/shapeSize-css.js";

// layouts
import classicLayoutStyle from "./styles/classic/style-css.js";
import classicLayoutColor from "./styles/classic/color-css.js";
import snowflakeStyle from "./styles/snowflake/style-css.js";
import snowflakeColors from "./styles/snowflake/color-css.js";

import './auro-calendar.js';

import { AuroDropdown } from '@aurodesignsystem/auro-dropdown';
import dropdownVersion from './dropdownVersion.js';

import { AuroInput } from '@aurodesignsystem/auro-input';
import inputVersion from './inputVersion.js';

import {AuroHelpText} from "@aurodesignsystem/auro-helptext";
import helpTextVersion from "@aurodesignsystem/auro-select/src/helptextVersion.js";

import { ifDefined } from "lit/directives/if-defined.js";
import {AuroElement} from "@aurodesignsystem/auro-layout-element";
import i18n from "@aurodesignsystem/auro-input/src/i18n.js";

import { AuroIcon } from '@aurodesignsystem-dev/auro-icon/class';
import iconVersion from './iconVersion.js';

import { AuroButton } from "@aurodesignsystem/auro-button/class";
import buttonVersion from './buttonVersion.js';
import { LitElement } from 'lit';


// See https://git.io/JJ6SJ for "How to document your components using JSDoc"
/**
 * @slot helpText - Defines the content of the helpText.
 * @slot ariaLabel.bib.close - Sets aria-label on close button in fullscreen bib
 * @slot ariaLabel.input.clear - Sets aria-label on clear button
 * @slot bib.fullscreen.headline - Defines the headline to display above bib.fullscreen.dateLabels in the mobile layout.
 * @slot bib.fullscreen.dateLabel - Defines the content to display above selected dates in the mobile layout.
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
export class AuroDatePicker extends AuroElement {
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
    if (this.getAttribute('calendarStartDate') && this.util.validDateStr(this.getAttribute('calendarStartDate'), this.getAttribute('format'))) {
      this.formattedStartDate = this.util.toNorthAmericanFormat(this.getAttribute('calendarStartDate'), this.getAttribute('format'));
      this.calendarRenderUtil.updateCentralDate(this, this.formattedStartDate);
    } else {
      this.calendarRenderUtil.updateCentralDate(this, new Date());
    }

    this.appearance = "default";
    this.touched = false;
    this.disabled = false;
    this.dvInputOnly = false;
    this.required = false;
    this.onDark = false;
    this.range = false;
    this.stacked = false;
    this.noValidate = false;
    this.validity = undefined;
    this.value = undefined;
    this.valueEnd = undefined;
    this.calendarStartDate = undefined;
    this.calendarEndDate = undefined;
    this.calendarFocusDate = this.value;
    this.format = 'mm/dd/yyyy';
    this.fullscreenBreakpoint = 'sm';
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

    // floaterConfig
    this.placement = 'bottom-start';
    this.offset = 0;
    this.noFlip = false;
    this.shift = false;
    this.autoPlacement = false;

    this.largeFullscreenHeadline = false;

    /**
     * @private
     */
    this.dateSlotContent = [];

    /**
     * @private
     */
    this.hasDisplayValueContent = true;

    /**
     * @private
     */
    this.hasFocus = false;

    /**
     * @private
     */
    this.hasValue = false;

    /**
     * @private
     */
    this.hasAllValues = false;

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
    this.dropdownTag = versioning.generateTag('auro-formkit-datepicker-dropdown', dropdownVersion, AuroDropdown);

    /**
     * @private
     */
    this.buttonTag = versioning.generateTag('auro-formkit-datepicker-button', buttonVersion, AuroButton);

    /**
     * @private
     */
    this.iconTag = versioning.generateTag('auro-formkit-input-icon', iconVersion, AuroIcon);

    /**
     * @private
     */
    this.inputTag = versioning.generateTag('auro-formkit-datepicker-input', inputVersion, AuroInput);

    /**
     * @private
     */
    this.helpTextTag = versioning.generateTag('auro-formkit-input-helptext', helpTextVersion, AuroHelpText);

    /** @private */
    this.handleClick = this.handleClick.bind(this);

    // Layout Config
    this.layout = 'classic';
    this.shape = 'classic';
    this.size = 'lg';

    /**
     * @private
     * @property {boolean} delegatesFocus - Whether the shadow root delegates focus.
     */
    this.constructor.shadowRootOptions = {
      ...LitElement.shadowRootOptions,
      delegatesFocus: true,
    };
  }

  // This function is to define props used within the scope of this component
  // Be sure to review  https://lit-element.polymer-project.org/guide/properties#reflected-attributes
  // to understand how to use reflected attributes with your property settings.
  static get properties() {
    return {
      // ...super.properties,

      /**
       * Defines whether the component will be on lighter or darker backgrounds.
       * @property {'default', 'inverse'}
       * @default 'default'
       */
      appearance: {
        type: String,
        reflect: true
      },

      /**
       * If declared, bib's position will be automatically calculated where to appear.
       * @default false
       */
      autoPlacement: {
        type: Boolean,
        reflect: true
      },

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
       * If defined, the display value slot content will only mask the HTML5 input element. The input's label will not be masked.
       */
      dvInputOnly: {
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

      hasFocus: {
        type: Boolean,
        reflect: false,
      },

      /**
       * @private
       */
      hasValue: {
        type: Boolean,
        reflect: false,
      },

      /**
       * @private
       */
      hasAllValues: {
        type: Boolean,
        reflect: false
      },

      /**
       * Specifies the date format. The default is `mm/dd/yyyy`.
       */
      format: {
        type: String,
        reflect: true
      },

      /**
       * Defines the screen size breakpoint (`xs`, `sm`, `md`, `lg`, `xl`, `disabled`)
       * at which the dropdown switches to fullscreen mode on mobile. `disabled` indicates a dropdown should _never_ enter fullscreen.
       *
       * When expanded, the dropdown will automatically display in fullscreen mode
       * if the screen size is equal to or smaller than the selected breakpoint.
       * @default sm
       */
      fullscreenBreakpoint: {
        type: String,
        reflect: true
      },

      /** Exposes inputmode attribute for input.  */
      inputmode: {
        type: String,
        attribute: true,
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
       * Names of all 12 months to render in the calendar, used for localization of date string in mobile layout.
       */
      monthNames: {
        type: Array
      },

      /**
       * @private
       */
      monthFirst: {
        type: Boolean
      },

      /**
       * If declared, the bib will NOT flip to an alternate position
       * when there isn't enough space in the specified `placement`.
       * @default false
       */
      noFlip: {
        type: Boolean,
        reflect: true
      },

      /**
       * If declared, the dropdown will shift its position to avoid being cut off by the viewport.
       * @default false
       */
      shift: {
        type: Boolean,
        reflect: true
      },

      /**
       * If set, disables auto-validation on blur.
       */
      noValidate: {
        type: Boolean,
        reflect: true
      },

      /**
       * Gap between the trigger element and bib.
       * @default 0
       */
      offset: {
        type: Number,
        reflect: true
      },

      /**
       * DEPRECATED - use `appearance` instead.
       */
      onDark: {
        type: Boolean,
        reflect: true
      },

      /**
       * Placeholder text to display in the input(s) when no value is set.
       */
      placeholder: {
        type: String,
        reflect: true
      },

      /**
       * Optional placeholder text to display in the second input when using date range.
       * By default, datepicker will use `placeholder` for both inputs if placeholder is
       * specified, but placeholderendDate is not.
       */
      placeholderEndDate: {
        type: String,
        reflect: true
      },

      /**
       * Position where the bib should appear relative to the trigger.
       * Accepted values:
       * "top" | "right" | "bottom" | "left" |
       * "bottom-start" | "top-start" | "top-end" |
       * "right-start" | "right-end" | "bottom-end" |
       * "left-start" | "left-end"
       * @default bottom-start
       */
      placement: {
        type: String,
        reflect: true
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
       * Set true to make datepicker stacked style.
       */
      stacked: {
        type: Boolean,
        reflect: true
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
      },

      /**
       * Indicates whether the datepicker is in a dirty state (has been interacted with).
       * @type {boolean}
       * @default false
       * @private
       */
      touched: {
        type: Boolean,
        reflect: true,
        attribute: false
      }
    };
  }

  static get styles() {
    return [
      styleCss,
      colorCss,
      tokensCss,

      // layout util
      shapeSizeCss,

      // layouts
      classicLayoutStyle,
      classicLayoutColor,
      snowflakeStyle,
      snowflakeColors
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
   * A convenience wrapper for `value` and `valueEnd`, uses the new Auro "array value pattern".
   * @returns {string[]}
   */
  get values() {
    // If range, and both populated, return both values in an array
    // - NOTE: both are required here, so we don't have something like `['10/22/25', undefined]`
    if (this.range && this.value && this.valueEnd) {
      return [
        this.value,
        this.valueEnd
      ];
    }

    // This if block catches instances where `value` is present, no matter if valueEnd is selected yet
    if (this.value) {
      return [this.value];
    }

    return [];
  }

  /**
   * Whether the label is being hidden currently based on state.
   * @returns {boolean} - Returns true if the label is hidden.
   * @private
   */
  get labelHidden() {
    return this.hasDisplayValueContent && this.dvInputOnly && !this.hasFocus && this.hasAllValues;
  }

  /**
   * Whether the displayValue container is being hidden currently based on state.
   * @returns {boolean} - Returns true if the label is hidden.
   * @private
   */
  get dvHidden() {
    return !this.hasDisplayValueContent || this.hasFocus || !this.hasAllValues;
  }

  /**
   * Returns the input font class based on layout and visibility state.
   * @private
   * @returns {string} - The font class for the input.
   */
  get displayValueFontClass() {
    if (this.layout.startsWith('emphasized')) {
      let typeSize = 'accent-xl';

      if (this.hasDisplayValueContent) {
        if (!this.hasValue) {
          typeSize = 'body-sm';
        }
      } else if (this.noFocusOrValue) {
        typeSize = 'body-sm';
      }

      return typeSize;
    }

    if (this.layout === 'snowflake') {
      // same for both hidden and visible
      return 'body-lg';
    }

    // edge case for enabling visual overrides in datepicker
    if (this.layout === 'classic' && this.shape === 'snowflake') {
      return 'body-lg';
    }

    // classic layout (default) - same for both hidden and visible
    return 'body-default';
  }

  get commonDisplayValueWrapperClasses() {
    return {
      'displayValueWrapper': true,
      'util_displayHiddenVisually': this.dvHidden,
      [this.displayValueFontClass]: true,
    };
  }

  /**
   * Function to determine if there is any displayValue content to render.
   * @private
   * @returns {void}
   */
  checkDisplayValueSlotChange() {
    let nodes = this.shadowRoot.querySelector('slot[name="displayValue"]').assignedNodes();

    // Handle when DisplayValue is multi-level slot content (e.g. combobox passing displayValue to input)
    if (nodes && nodes[0] && nodes[0].tagName === 'SLOT') {
      nodes = nodes[0].assignedNodes();
    }

    let hasContent = false;

    if (nodes.length > 0) {
      hasContent = true;
    }

    this.hasDisplayValueContent = hasContent;
  }

  /**
   * Force the calendar view to the focus date when it changes.
   * @private
   * @returns {void}
   */
  handleFocusDateChange() {
    if (this.formattedFocusDate) {
      this.calendarRenderUtil.updateCentralDate(this, this.formattedFocusDate);

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
  focus(focusInput = '') {
    this.hasFocus = true;
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
      this.notifyDatepickerToggled();

      this.calendar.visible = this.dropdown.isPopoverVisible;

      if (this.dropdown.getAttribute('data-show') && this.forceScrollOnNextMobileCalendarRender) {
        this.calendar.scrollMonthIntoView(this.formattedFocusDate);
        this.forceScrollOnNextMobileCalendarRender = false;
      }
    });
  }

  /**
   * Binds all behavior needed to the input after rendering.
   * @private
   * @returns {void}
   */
  configureInput() {
    this.triggerInput = this.dropdown.querySelector('[slot="trigger"]');

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
        // not to bubble up input's validated event.
        evt.stopPropagation();

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
    this.calendar = this.shadowRoot.querySelector('auro-formkit-calendar');
    this.calendar.datepicker = this;
    this.calendar.format = this.format;
    this.calendar.dropdown = this.dropdown;

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
      this.touched = true;
      this.hasFocus = true;
    });

    this.addEventListener('focusout', () => {
      this.hasFocus = false;

      if (this.noValidate) {
        return;
      }

      if (!this.contains(document.activeElement)) {
        this.validate();
      }
    });

    if (this.hasAttribute('value') && this.getAttribute('value').length > 0) {
      this.calendar.dateFrom = new Date(this.formattedValue).getTime();
    }

    if (this.hasAttribute('valueEnd') && this.getAttribute('valueEnd').length > 0) {
      this.calendar.dateTo = new Date(this.formattedValueEnd).getTime();
    }
  }

  /**
   * Blurs the datepicker and hides the dropdown as part of blur action.
   * @private
   * @returns {void}
   */
  blur() {
    super.blur();
    this.hideBib();
  }

  /**
   * Hides the dropdown bib if its open.
   * @returns {void}
   */
  hideBib() {
    if (this.dropdown && this.dropdown.isPopoverVisible) {
      this.dropdown.hide();
    }
  }

  /**
   * Shows the dropdown bib if there are options to show.
   * @returns {void}
   */
  showBib() {
    if (this.dropdown && !this.dropdown.isPopoverVisible) {
      this.dropdown.show();
    }
  }

  /**
   * Sets the readonly attribute on the inputs based on the window width.
   * @private
   * @returns {void}
   */
  handleReadOnly() {
    // --ds-grid-breakpoint-sm
    const docStyle = getComputedStyle(document.documentElement);
    const mobileBreakpoint = Number(docStyle.getPropertyValue('--ds-grid-breakpoint-sm').replace("px", ""));

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

    const convertedDate = this.convertWcTimeToDate(time);
    const newDate = this.util.toCustomFormat(convertedDate, this.format);

    let onEndValue = false;
    if (this.util.validDateStr(newDate, this.format)) {
      if (this.range) {
        const isValueValid = this.value && this.util.validDateStr(this.value, this.format);
        const isValueEndValid = this.valueEnd && this.util.validDateStr(this.valueEnd, this.format);

        if (isValueValid && !isValueEndValid) {
          // verify the date is after this.value to insure we are setting a proper range
          if (new Date(this.util.toNorthAmericanFormat(newDate, this.format)) >= new Date(this.formattedValue)) {
            onEndValue = true;
          }
        } else if (isValueValid && isValueEndValid) {
          // both dateTo and dateFrom are valid, then reset datTo
          this.valueEnd = '';
        }
      }

      if (onEndValue) {
        this.valueEnd = newDate;
        if (this.dropdown.isPopoverVisible && !this.dropdown.isBibFullscreen) {
          this.focus('startDate');
        }
      } else {
        this.value = newDate;
        if (this.dropdown.isPopoverVisible && !this.dropdown.isBibFullscreen) {
          this.focus('endDate');
        }
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
   * Handle enter/space keydown on the reset button.
   * @private
   * @param {KeyboardEvent} event - The keydown event.
   */
  handleKeydownReset(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.resetInputs();
      this.focus();
    }
  }

  /**
   * Resets values without resetting validation.
   */
  resetInputs() {
    this.inputList.forEach((input) => {
      input.reset();
    });
  }

  /**
   * Resets component to initial state.
   * @returns {void}
   */
  reset() {
    this.resetInputs();
    this.validation.reset(this);
  }

  /**
   * Clears the current value(s) of the datepicker.
   * @returns {void}
   */
  clear() {
    this.resetInputs();
  }

  /**
   * Validates value.
   * @param {boolean} [force=false] - Whether to force validation.
   */
  validate(force = false) {
    this.inputList[0].validate(force);
    if (this.range) {
      this.inputList[1].validate(force);
    }

    this.validation.validate(this, force);
  }

  /**
   * Private method for interacting with the `hasValue` property.
   * @private
   */
  setHasValue() {
    if (!this.range) {
      this.hasValue = this.value && this.value.length > 0;
      this.hasAllValues = this.hasValue;
      return;
    }

    // eslint-disable-next-line no-extra-parens
    this.hasValue = (this.value && this.value.length > 0) || (this.valueEnd && this.valueEnd.length > 0);
    this.hasAllValues = (this.value && this.value.length > 0) && (this.valueEnd && this.valueEnd.length > 0); // eslint-disable-line no-extra-parens
  }

  get hasError() {
    return this.validity !== undefined && this.validity !== 'valid';
  }

  updated(changedProperties) {
    if (changedProperties.has('format')) {
      this.monthFirst = this.format.indexOf('mm') < this.format.indexOf('yyyy');
    }

    if (changedProperties.has('disabled')) {
      if (this.disabled) {
        this.previousTabIndex = this.getAttribute('tabindex');
        this.setAttribute('tabindex', '-1');
      } else if (!this.disabled && this.previousTabIndex > -1) {
        this.tabIndex = this.previousTabIndex;
      } else {
        this.removeAttribute('tabindex');
      }
    }

    if (changedProperties.has('calendarFocusDate')) {
      this.formattedFocusDate = this.util.toNorthAmericanFormat(this.calendarFocusDate, this.format);

      this.handleFocusDateChange();
    }

    if (changedProperties.has('calendarStartDate')) {
      this.formattedStartDate = this.util.toNorthAmericanFormat(this.calendarStartDate, this.format);

      this.calendar.setAttribute('calendarStartDate', this.formattedStartDate);
    }

    if (changedProperties.has('calendarEndDate')) {
      this.formattedEndDate = this.util.toNorthAmericanFormat(this.calendarEndDate, this.format);

      this.calendar.setAttribute('calendarEndDate', this.formattedEndDate);
    }

    if (changedProperties.has('value')) {

      this.formattedValue = this.util.toNorthAmericanFormat(this.value, this.format);

      // Change the calendar focus to the first valid date value only the first time the value is set
      if (!this.calendarFocusDate && this.util.validDateStr(this.value, this.format)) {
        if (!this.dropdown.isPopoverVisible) {
          this.calendarFocusDate = this.value;
        }
      }

      if (this.cellClickActive) {
        this.cellClickActive = false;
      }

      if (this.value && this.util.validDateStr(this.value, this.format)) {
        if (this.calendar.dateFrom !== this.value) {
          this.calendar.dateFrom = this.convertToWcValidTime(this.formattedValue);
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

      if (this.value && this.value.length === this.inputList[0].lengthForType) {
        this.calendarRenderUtil.updateCentralDate(this, this.formattedValue);
      }

      this.setHasValue();
    }

    if (changedProperties.has('valueEnd') && this.inputList[1]) {

      this.formattedValueEnd = this.util.toNorthAmericanFormat(this.valueEnd, this.format);

      // update the calendar
      if (this.valueEnd && this.util.validDateStr(this.valueEnd, this.format)) {
        this.calendar.dateTo = this.convertToWcValidTime(this.formattedValueEnd);
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

      if (this.valueEnd && this.valueEnd.length === this.inputList[1].lengthForType) {
        this.calendarRenderUtil.updateCentralDate(this, this.formattedValueEnd);
      }

      this.validate();
      this.setHasValue();
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

    if (this.value && this.valueEnd && this.util.validDateStr(this.value, this.format) && this.util.validDateStr(this.valueEnd, this.format) && new Date(this.formattedValue) > new Date(this.formattedValueEnd)) {
      this.valueEnd = undefined;
    }

    // This resets the datepicker when the minDate is set to a new value that is
    // a later date than the current value date
    if (changedProperties.has('minDate')) {
      this.formattedMinDate = this.util.toNorthAmericanFormat(this.minDate, this.format);

      if (this.minDate) {
        const minDateMonth = Number(this.formattedMinDate.split('/')[0]);
        const minDateYear = Number(this.formattedMinDate.split('/')[2]);

        // This sets the visible month of the calendar to the minDate when the minDate is later
        // than the current visible date
        if (minDateYear > this.calendar.year) {
          this.calendarRenderUtil.updateCentralDate(this, this.formattedMinDate);
        } else if (minDateYear === this.calendar.year && minDateMonth > this.calendar.month) {
          this.calendarRenderUtil.updateCentralDate(this, this.formattedMinDate);
        }

        if (this.value) {
          if (new Date(this.formattedMinDate).getTime() > new Date(this.formattedValue).getTime()) {
            this.value = undefined;

            if (this.range && this.valueEnd) {
              this.valueEnd = undefined;
            }

            this.calendarRenderUtil.updateCentralDate(this, this.formattedMinDate);
          }
        }
      }

      // If the minDate was set to a valid date
      if (this.util.validDateStr(this.minDate, this.format)) {
        // When there is no focusDate and no value, set the focusDate to the minDate
        const nothingSet = !this.calendarFocusDate && !this.value;
        const earlierThanMinDate = new Date(this.formattedFocusDate) < new Date(this.formattedMinDate);

        if (nothingSet || earlierThanMinDate) {
          this.calendarFocusDate = this.minDate;
        }
      }

      this.calendar.requestUpdate();
    }

    // This resets the datepicker when the maxDate is set to a new value that is
    // an earlier date than the current value date
    if (changedProperties.has('maxDate')) {
      this.formattedMaxDate = this.util.toNorthAmericanFormat(this.maxDate, this.format);

      const maxDateMonth = Number(this.formattedMaxDate.split('/')[0]);
      const maxDateYear = Number(this.formattedMaxDate.split('/')[2]);

      // This sets the visible month of the calendar to the maxDate when the maxDate is earlier
      // than the current visible date
      if (maxDateYear < this.calendar.year) {
        this.calendarRenderUtil.updateCentralDate(this, this.formattedMaxDate);
      } else if (maxDateYear === this.calendar.year && maxDateMonth < this.calendar.month) {
        this.calendarRenderUtil.updateCentralDate(this, this.formattedMaxDate);
      }

      if (this.maxDate) {
        if (this.value) {
          if (new Date(this.formattedMaxDate).getTime() < new Date(this.formattedValue).getTime()) {
            this.value = undefined;

            if (this.range && this.valueEnd) {
              this.valueEnd = undefined;
            }

            this.calendarRenderUtil.updateCentralDate(this, this.formattedMaxDate);
          }
        }
      }

      this.calendar.requestUpdate();
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

  /**
   * Handles click events on the datepicker.
   * @param {PointerEvent} event - The pointer event object.
   * @private
   * @returns {void}
   */
  handleClick(event) {

    // Get the initial target of the click event
    const [initTarget] = event.composedPath();

    // Determine if the current layout requires special handling
    const layoutRequiresHandling = ['snowflake'].includes(this.layout);

    // Determine if the target is an input element
    const targetIsInput = initTarget.tagName === 'INPUT';
    const isFocusAlreadyOnInput = this.inputList.includes(this.shadowRoot.activeElement);

    if (layoutRequiresHandling && !targetIsInput && !isFocusAlreadyOnInput && !event.composedPath().includes(this.dropdown.bibContent)) {
      // Focus the first input
      this.inputList[0].focus();
    }
  }

  /**
   * Set up click handling for the datepicker.
   * @private
   * @returns {void}
   */
  configureClickHandler() {
    this.addEventListener('click', this.handleClick);
  }

  firstUpdated() {
    // Add the tag name as an attribute if it is different than the component name
    this.runtimeUtils.handleComponentTagRename(this, 'auro-datepicker');

    this.configureDropdown();
    this.configureInput();
    this.configureCalendar();
    this.configureDatepicker();
    this.configureClickHandler();

    window.addEventListener('resize', () => {
      this.handleReadOnly();
    });
  }

  connectedCallback() {
    super.connectedCallback();

    this.monthFirst = this.format.indexOf('mm') < this.format.indexOf('yyyy');
  }

  // layout render methods
  // ------------------------------------

  /**
   * Renders the snowflake layout for the datepicker.
   * @private
   * @returns {import("lit").TemplateResult}
   */
  renderSnowflakeLayout() {
    const accentsClassMap = {
      'error': this.hasError
    };

    const inputSectionClassMap = {
      'inputSection': true,

      'hasValue': this.hasValue,
      'hasFocus': this.hasFocus,
      'util_displayHiddenVisually': !this.dvHidden
    };

    const labelClassMap = {
      'mainLabel': true,

      'hasValue': this.hasValue,
      'hasFocus': this.hasFocus,
      'util_displayHiddenVisually': this.labelHidden,
      [this.hasFocus || this.hasValue ? 'body-xs' : 'body-lg']: true,
    };

    return html`
      <div
        class="wrapper trigger"
        part="wrapper">
        <div class="accents left">
          ${this.renderHtmlIconCalendar()}
        </div>
        <div class="mainContent">
          <label class="${classMap(labelClassMap)}" part="mainLabel">
            <slot name="label"></slot>
          </label>
          <div class="${classMap(inputSectionClassMap)}" part="inputSection">
            ${this.renderHtmlInputs()}
          </div>
          <div class="${classMap(this.commonDisplayValueWrapperClasses)}">
            <slot name="displayValue" @slotchange=${this.checkDisplayValueSlotChange}>
              <span>
                ${this.formatShortDate(this.value)}${this.range ? html`–${this.formatShortDate(this.valueEnd)}` : undefined}
              </span>
            </slot>
          </div>
        </div>
        <div class="accents right ${classMap(accentsClassMap)}">
          ${this.hasError
            ? this.renderHtmlIconError()
            : this.renderHtmlActionClear()
          }
        </div>
      </div>
    `;
  }

  /**
   * Renders the snowflake layout for the datepicker.
   * @private
   * @returns {import("lit").TemplateResult}
   */
  renderClassicLayout() {
    const accentsClassMap = {
      error: this.hasError
    };

    const inputSectionClassMap = {
      inputSection: true,

      hasValue: this.hasValue,
      hasFocus: this.hasFocus,
    };

    return html`
      <div
        class="wrapper trigger"
        part="wrapper">
        <div class="accents left">
          ${this.renderHtmlIconCalendar()}
        </div>
        <div class="mainContent">
          <div class="${classMap(inputSectionClassMap)}" part="inputSection">
            ${this.renderHtmlInputs()}
          </div>
        </div>
        <div class="accents right ${classMap(accentsClassMap)}">
          ${this.hasError
            ? this.renderHtmlIconError()
            : this.renderHtmlActionClear()
          }
        </div>
      </div>
    `;
  }

  /**
   * Renders the layout based on the `layout` attribute.
   * @private
   * @returns {import('lit').TemplateResult}
   */
  renderLayoutFromAttributes() {
    switch (this.layout) {
      case 'snowflake':
        return this.renderSnowflakeLayout();
      default:
        return this.renderClassicLayout();
    }
  }

  // eslint-disable-next-line no-warning-comments
  // TODO: move this to date utility when time allows :(
  /**
   * Simple formatter that ONLY WORKS FOR US DATES.
   * Returns formatted date like Apr 21 or Dec 25.
   * @private
   * @param {string} date - Date format should be in a format Date constructor accepts, like '2023-04-21' or '2023/04/21'.
   * @returns {string}
   */
  formatShortDate(date) {
    // should render like Apr 21
    const options = {
      month: 'short',
      day: '2-digit'
    };

    return new Date(date).toLocaleDateString('en-US', options).replace(',', '');
  }

  /**
   * Format and render the provided date value.
   * @private
   * @param {string} dateValue - The date value to format and render.
   * @returns {import('lit').TemplateResult}
   */
  renderDisplayTextDate(dateValue) {
    const displayTextClasses = {
      'displayValueText': true,
      'body-lg': true
    };

    return html`
        <div>
          <div class="${classMap(displayTextClasses)}">
            ${dateValue && this.util.validDateStr(dateValue, this.format)
        ? this.formatShortDate(dateValue)
        : undefined
      }
          </div>
        </div>
    `;
  }

  /**
   * Renders the HTML inputs for the datepicker.
   * @private
   * @returns {import('lit').TemplateResult}
   */
  renderHtmlInputs() {
    const inputClasses = {
      "util_displayHiddenVisually": !this.hasValue && !this.hasFocus && this.layout !== "classic",
      "parentBorder": this.layout === "classic"
    };

    return html`
      <div class="inputContainer">
        <${this.inputTag}
          appearance="${this.onDark ? 'inverse' : this.appearance}"
          ?disabled="${this.disabled}"
          ?required="${this.required}"
          .format="${this.format}"
          .max="${this.maxDate}"
          .min="${this.minDate}"
          .placeholder="${this.placeholder}"
          .size="${this.size}"
          .shape="${this.shape}"
          class="dateFrom ${classMap(inputClasses)}"
          id="${this.generateRandomString(12)}"
          inputmode="${ifDefined(this.inputmode)}"
          layout="classic"
          noValidate
          part="input"
          setCustomValidity="${this.setCustomValidity}"
          setCustomValidityCustomError="${this.setCustomValidityCustomError}"
          setCustomValidityValueMissing="${this.setCustomValidityValueMissing}"
          setCustomValidityRangeOverflow="${this.setCustomValidityRangeOverflow}"
          setCustomValidityRangeUnderflow="${this.setCustomValidityRangeUnderflow}"
          type="date"
        >
          ${this.layout !== "classic"
        ? html`
              <span slot="displayValue">
                ${this.renderDisplayTextDate(this.value)}
              </span>
            `
        : undefined
      }
          <span slot="ariaLabel.clear">${this.runtimeUtils.getSlotText(this, 'ariaLabel.input.clear') || i18n(this.lang, 'clearInput')}</span>
          <span slot="label"><slot name="fromLabel"></slot></span>
        </${this.inputTag}>
      </div>

      <!--  Divider  -->
      ${this.range ? html`
        <div class="inputDivider"></div>
      ` : undefined}

      ${this.range ? html`
        <div class="inputContainer">
          <${this.inputTag}
            appearance="${this.onDark ? 'inverse' : this.appearance}"
            ?disabled="${this.disabled}"
            ?required="${this.required}"
            .format="${this.format}"
            .max="${this.maxDate}"
            .min="${this.minDate}"
            .placeholder="${this.placeholderEndDate || this.placeholder}"
            .size="${this.size}"
            .shape="${this.shape}"
            class="dateTo ${classMap(inputClasses)}"
            id="${this.generateRandomString(12)}"
            layout="classic"
            noValidate
            part="input"
            setCustomValidity="${this.setCustomValidity}"
            setCustomValidityCustomError="${this.setCustomValidityCustomError}"
            setCustomValidityValueMissing="${this.setCustomValidityValueMissing}"
            setCustomValidityRangeOverflow="${this.setCustomValidityRangeOverflow}"
            setCustomValidityRangeUnderflow="${this.setCustomValidityRangeUnderflow}"
            type="date"
          >
            ${this.layout !== "classic"
          ? html`
              <span slot="displayValue">
                ${this.renderDisplayTextDate(this.valueEnd)}
              </span>
            `
          : undefined
        }
            <span slot="ariaLabel.clear">${this.runtimeUtils.getSlotText(this, 'ariaLabel.input.clear') || this.runtimeUtils.getSlotText(this, 'ariaLabel.input.clear') || i18n(this.lang, 'clearInput')}</span>
            <span slot="label"><slot name="toLabel"></slot></span>
          </${this.inputTag}>
        </div>
      ` : undefined}
    `;
  }

  // ------------------------------------
  // end of layout render

  // icons/actions
  // ------------------------------------

  /**
   * Renders the clear action button.
   * @private
   * @returns {import('lit').TemplateResult}
   */
  renderHtmlActionClear() {
    const clearActionClassMap = {
      'notification': true,
      'clear': true,
      'util_displayHidden': (!this.value || this.value.length === 0) && (!this.valueEnd || this.valueEnd.length === 0),
    };
    return html`
      <div class="${classMap(clearActionClassMap)}">
        <${this.buttonTag}
          @click="${this.resetInputs}"
          @keydown="${this.handleKeydownReset}"
          ?onDark="${this.onDark}"
          appearance="${this.onDark ? 'inverse' : this.appearance}"
          aria-label="${this.runtimeUtils.getSlotText(this, 'ariaLabel.input.clear') || i18n(this.lang, 'clearInput')}"
          class="notificationBtn clearBtn"
          shape="circle"
          size="sm"
          variant="ghost">
          <${this.iconTag}
            ?customColor="${this.onDark || this.appearance === 'inverse'}"
            category="interface"
            name="x-lg"
            >
          </${this.iconTag}>
        </${this.buttonTag}>
      </div>
    `;
  }

  /**
   * Renders the error icon.
   * @private
   * @returns {import('lit').TemplateResult}
   */
  renderHtmlIconError() {
    const clearActionClassMap = {
      'notification': true,
      'error': true,
      // 'util_displayHidden': (!this.value || this.value.length === 0) && (!this.valueEnd || this.valueEnd.length === 0),
    };

    return html`
      <div class="${classMap(clearActionClassMap)}">
        <${this.iconTag}
          category="alert"
          customColor
          name="error-stroke"
          >
        </${this.iconTag}>
      </div>
    `;
  }

  /**
   * Renders the calendar icon.
   * @private
   * @returns {import('lit').TemplateResult}
   */
  renderHtmlIconCalendar() {
    return html`
      <${this.iconTag}
        appearance="${this.onDark ? 'inverse' : this.appearance}"
        category="interface"
        class="accentIcon"
        name="calendar"
        part="accentIcon"
        variant="${this.disabled ? 'disabled' : 'muted'}">
      </${this.iconTag}>`;
  }

  /**
   * Returns HTML for the help text and error message.
   * @private
   * @returns {import('lit').TemplateResult} - Returns HTML for the help text and error message.
   */
  renderHtmlHelpText() {
    return html`
      ${!this.validity || this.validity === undefined || this.validity === 'valid'
        ? html`
          <${this.helpTextTag} appearance="${this.onDark ? 'inverse' : this.appearance}">
            <p id="${this.uniqueId}" part="helpText">
              <slot name="helpText"></slot>
            </p>
          </${this.helpTextTag}>
        `
        : html`
          <${this.helpTextTag} error appearance="${this.onDark ? 'inverse' : this.appearance}">
            <p id="${this.uniqueId}" role="alert" aria-live="assertive" part="helpText">
              ${this.errorMessage}
            </p>
          </${this.helpTextTag}>
        `
      }
    `;
  }

  /**
   * Separate method for rendering the calendar.
   * @private
   * @returns {import('lit').TemplateResult}
   */
  renderCalendar() {
    return html`
      <auro-formkit-calendar
        ?largeFullscreenHeadline="${this.largeFullscreenHeadline}"
        ?noRange="${!this.range}"
        .format="${this.format}"
        .monthFirst="${this.monthFirst}"
        .min="${this.convertToWcValidTime(new Date(this.formattedMinDate))}"
        .max="${this.convertToWcValidTime(new Date(this.formattedMaxDate))}"
        .maxDate="${this.maxDate}"
        .minDate="${this.minDate}"
        .monthNames="${this.monthNames}"
        part="calendar"
      >
        <slot name="ariaLabel.bib.close" slot="ariaLabel.close" @slotchange="${this.handleSlotToSlot}">Close</slot>
        <slot slot="bib.fullscreen.headline" name="bib.fullscreen.headline" @slotchange="${this.handleSlotToSlot}"></slot>
        <slot slot="bib.fullscreen.dateLabel" name="bib.fullscreen.dateLabel" @slotchange="${this.handleSlotToSlot}"></slot>
        <span slot="bib.fullscreen.fromStr">${this.value || html`<span class="placeholderDate">${this.format.toUpperCase()}</span>`}</span>
        ${this.range ? html`<span slot="mobileDateToStr">${this.valueEnd || html`<span class="placeholderDate">${this.format.toUpperCase()}</span>`}</span>` : undefined}
      </auro-formkit-calendar>
    `;
  }

  // function that renders the HTML and CSS into  the scope of the component
  render() {
    const dropdownElementClassMap = {
      hasFocus: this.hasFocus
    };

    // Base HTML render() handles dropdown and calendar bib
    return html`
      <!-- Hidden slot for clear button aria-label -->
      <slot name="ariaLabel.input.clear" hidden @slotchange=${this.requestUpdate}></slot>

      <${this.dropdownTag}
          appearance="${this.onDark ? 'inverse' : this.appearance}"
          ?autoPlacement="${this.autoPlacement}"}"
          ?disabled="${this.disabled}"
          ?error="${this.validity !== undefined && this.validity !== 'valid'}"
          ?noFlip="${this.noFlip}"
          ?shift="${this.shift}"
          .fullscreenBreakpoint="${this.fullscreenBreakpoint}"
          .layout="${this.layout}"
          .matchWidth="${false}"
          .offset="${this.offset}"
          .placement="${this.placement}"
          .shape="${this.shape}"
          .size="${this.size}"
          class="${classMap(dropdownElementClassMap)}"
          disableEventShow
          disableFocusTrap
          for="dropdownMenu"
          part="dropdown"
        >
          <div slot="trigger" class="dpTriggerContent" part="trigger">
            ${this.renderLayoutFromAttributes()}
          </div>

          <div class="calendarWrapper" part="calendarWrapper">
            ${this.renderCalendar()}
          </div>
          <div slot="helpText" part="helpTextSpan">
            ${this.renderHtmlHelpText()}
          </div>
        </${this.dropdownTag}>
    `;
  }
}

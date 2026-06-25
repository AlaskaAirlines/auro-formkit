// Copyright (c) 2025 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

/* eslint-disable max-lines, no-continue, new-cap, curly, no-underscore-dangle, no-inline-comments, line-comment-position */
/* eslint no-magic-numbers: ["error", { "ignore": [0] }] */

import i18n, { notifyOnLangChange, stopNotifyingOnLangChange } from './i18n.js';
import IMask from 'imask';
import AuroFormValidation from '@aurodesignsystem/form-validation';
import { AuroElement } from '../../layoutElement/src/auroElement.js';
import { AuroInputUtilities, getDateFormatFromLocale } from "./utilities.js";
import { UniqueId } from '@aurodesignsystem/auro-library/scripts/runtime/uniqueHash';
import { DomHandler } from '@aurodesignsystem/auro-library/scripts/runtime/domHandler';
import { dateFormatter } from "@aurodesignsystem/auro-library/scripts/runtime/dateUtilities/dateFormatter.mjs";

/**
 * Base class for auro-input component that provides core input functionality.
 * @event input - Event fires when the value of an `auro-input` has been changed.
 * @event auroFormElement-validated - Notifies that the `validity` and `errorMessage` value has changed.
 */
export default class BaseInput extends AuroElement {

  // Delegate focus to the native <input> inside the shadow root so that
  // showModal()'s dialog focusing steps reach the input element.
  // This keeps the mobile virtual keyboard open when the fullscreen dialog
  // opens, because the browser sees an input-to-input focus transfer.
  static get shadowRootOptions() {
    return {
      ...AuroElement.shadowRootOptions,
      delegatesFocus: true,
    };
  }

  constructor() {
    super();

    this.appearance = "default";
    this.disabled = false;
    this.layout = 'classic';
    this.locale = 'en-US';
    this.max = undefined;
    this._maxObject = undefined;
    this.maxLength = undefined;
    this.min = undefined;
    this._minObject = undefined;
    this.minLength = undefined;
    this.required = false;
    this.onDark = false;
    this.setCustomValidityForType = undefined;
    this.size = 'lg';
    this.shape = 'classic';
    this.value = undefined;
    this._valueObject = undefined;

    this._initializePrivateDefaults();
  }

  /**
   * Internal Defaults.
   * @private
   * @returns {void}
   */
  _initializePrivateDefaults() {
    this.activeLabel = false;
    this.appearance = "default";
    this.icon = false;
    this.disabled = false;
    this.dvInputOnly = false;
    this.hideLabelVisually = false;
    this.max = undefined;
    this.maxLength = undefined;
    this.min = undefined;
    this.minLength = undefined;
    this.noValidate = false;
    this.onDark = false;
    this.required = false;
    this.setCustomValidityForType = undefined;

    // Used for storing raw values returned from input mask.
    this._rawMaskValue = undefined;

    /**
     * @private
     */
    this.layout = 'classic';

    /**
     * @private
     */
    this.shape = 'classic';

    /**
     * @private
     */
    this.size = 'lg';

    this.touched = false;
    this.util = new AuroInputUtilities({
      locale: "en-US",
      format: this.format
    });
    this.validation = new AuroFormValidation();
    this.inputIconName = undefined;
    this.showPassword = false;
    this.validationCCLength = undefined;
    this.hasValue = false;
    this.label = 'Input label is undefined';


    this.allowedInputTypes = [
      "text",
      "number",
      "email",
      "password",
      "credit-card",
      "tel"
    ];
    this.icon = false;
    this.dateFormatMap = {
      'mm/dd/yyyy': 'dateMMDDYYYY',
      'dd/mm/yyyy': 'dateDDMMYYYY',
      'yyyy/mm/dd': 'dateYYYYMMDD',
      'yyyy/dd/mm': 'dateYYYYDDMM',
      'mm/yy': 'dateMMYY',
      'yy/mm': 'dateYYMM',
      'mm/yyyy': 'dateMMYYYY',
      'yyyy/mm': 'dateYYYYMM',
      'yy': 'dateYY',
      'yyyy': 'dateYYYY',
      'mm': 'dateMM',
      'dd': 'dateDD',
      'dd/mm': 'dateDDMM',
      'mm/dd': 'dateMMDD'
    };
    this.domHandler = new DomHandler();
    this.dvInputOnly = false;
    this.hasValue = false;
    this.inputIconName = undefined;
    this.label = 'Input label is undefined';
    this.noValidate = false;
    this._rawMaskValue = undefined; // Used for storing raw values returned from input mask.
    this.setSelectionInputTypes = [
      "text",
      "password",
      "email"
    ]; // Credit Card is not included as this caused cursor placement issues in Safari.
    this.showPassword = false;
    this.touched = false;
    this.uniqueId = new UniqueId().create();
    this.util = new AuroInputUtilities({
      locale: this.locale,
      format: this.format
    });
    this.validation = new AuroFormValidation();
    this.validationCCLength = undefined;
  }

  // function to define props used within the scope of this component
  static get properties() {
    return {
      ...super.properties,

      /**
       * The value for the role attribute.
       */
      a11yRole: {
        type: String,
        reflect: true
      },

      /**
       * The value for the aria-controls attribute.
       */
      a11yControls: {
        type: String,
        reflect: true
      },

      /**
       * The value for the aria-expanded attribute.
       */
      a11yExpanded: {
        type: Boolean,
        reflect: true
      },

      /**
       * The value for the aria-activedescendant attribute.
       * Points to the ID of the currently active/highlighted option in a listbox.
       */
      a11yActivedescendant: {
        type: String,
        reflect: true
      },

      /**
       * If set, the label will remain fixed in the active position.
       */
      activeLabel: {
        type: Boolean,
        reflect: true
      },

      /**
       * Defines whether the component will be on lighter or darker backgrounds.
       * @type {'default' | 'inverse'}
       * @default 'default'
       */
      appearance: {
        type: String,
        reflect: true
      },

      /**
       * An enumerated attribute that controls whether and how text input is automatically capitalized as it is entered/edited by the user. [off/none, on/sentences, words, characters].
       */
      autocapitalize: {
        type: String,
        reflect: true
      },

      /**
       * An enumerated attribute that defines what the user agent can suggest for autofill. At this time, only `autocomplete="off"` is supported.
       */
      autocomplete: {
        type: String,
        reflect: true
      },

      /**
       * When set to `off`, stops iOS from auto-correcting words when typed into a text box.
       */
      autocorrect: {
        type: String,
        reflect: true
      },

      /**
       * Custom help text message for email type validity.
       */
      customValidityTypeEmail: {
        type: String
      },

      /**
       * If set, disables the input.
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
       * When defined, sets persistent validity to `customError` and sets `setCustomValidity` = attribute value.
       */
      error: {
        type: String,
        reflect: true
      },

      /**
       * Contains the help text message for the current validity error.
       */
      errorMessage: {
        type: String
      },

      /**
       * Specifies the input mask format.
       */
      format: {
        type: String,
        reflect: true
      },

      /**
       * Flag to indicate if the input currently has focus.
       */
      hasFocus: {
        type: Boolean,
        reflect: false,
        attribute: false
      },

      /**
       * Flag to indicate if the input currently has value.
       */
      hasValue: {
        type: Boolean,
        reflect: false,
        attribute: false
      },

      /**
       * If set, the label will be hidden visually but still accessible to assistive technologies.
       * @private
       */
      hideLabelVisually: {
        type: Boolean,
        reflect: true
      },


      /**
       * If set, will render an icon inside the input to the left of the value. Support is limited to auro-input instances with credit card format.
       */
      icon: {
        type: Boolean,
        reflect: true
      },

      /**
       * The id global attribute defines an identifier (ID) which must be unique in the whole document.
       */
      id: {
        type: String,
        reflect: true
      },

      /**
       * The id for input node.
       * @private
       */
      inputId: {
        type: String,
        reflect: false,
        attribute: false
      },

      /** Exposes inputmode attribute for input.  */
      inputmode: {
        type: String,
        reflect: true
      },

      /**
       * Defines the language of an element.
       */
      lang: {
        type: String,
        reflect: true
      },

      /**
       * Defines the locale of an element.
       * Used for locale-specific formatting, such as date formats.
       */
      locale: {
        type: String,
        reflect: true
      },

      /**
       * The maximum value allowed. This only applies for inputs with a type of `number` and ISO format.
       */
      max: {
        type: String
      },

      /**
       * The maximum number of characters the user can enter into the text input. This must be an integer value `0` or higher.
       * **Note**: This attribute is not intended to be used with a `type` or `format` that already has a defined length, such as credit-cards, dates or phone numbers.
       */
      maxLength: {
        type: Number,
        reflect: true
      },

      /**
       * The minimum value allowed. This only applies for inputs with a type of `number` and ISO date format.
       */
      min: {
        type: String
      },

      /**
       * The minimum number of characters the user can enter into the text input. This must be a non-negative integer value smaller than or equal to the value specified by `maxlength`.
       */
      minLength: {
        type: Number,
        reflect: true
      },

      /**
       * Populates the `name` attribute on the input.
       */
      name: {
        type: String,
        reflect: true
      },

      /**
       * Sets styles for nested operation - removes borders, hides help + error text, and
       * hides accents.
       */
      nested: {
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
       * DEPRECATED - use `appearance="inverse"` instead.
       */
      onDark: {
        type: Boolean,
        reflect: true
      },

      /**
       * Specifies a regular expression the form control's value should match.
       */
      pattern: {
        type: String,
        reflect: true
      },

      /**
       * Define custom placeholder text.
       */
      placeholder: {
        type: String,
        reflect: true
      },

      /**
       * Makes the input read-only, but can be set programmatically.
       */
      readonly: {
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
       * Custom help text message to display when validity = `badInput`.
       */
      setCustomValidityBadInput: {
        type: String
      },

      /**
       * Custom help text message to display when validity = `customError`.
       */
      setCustomValidityCustomError: {
        type: String
      },

      /**
       * Custom help text message to display for the declared element `type` and type validity fails.
       */
      setCustomValidityForType: {
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
       * Custom help text message to display when validity = `tooLong`.
       */
      setCustomValidityTooLong: {
        type: String
      },

      /**
       * Custom help text message to display when validity = `tooShort`.
       */
      setCustomValidityTooShort: {
        type: String
      },

      /**
       * Custom help text message to display when validity = `valueMissing`.
       */
      setCustomValidityValueMissing: {
        type: String
      },

      /**
       * @ignore
       */
      showPassword: {
        state: true
      },

      /**
       * Simple makes the input render without a border.
       */
      simple: {
        type: Boolean,
        reflect: true
      },

      /**
       * An enumerated attribute defines whether the element may be checked for spelling errors. [true, false]. When set to `false` the attribute `autocorrect` is set to `off` and `autocapitalize` is set to `none`.
       */
      spellcheck: {
        type: String,
        reflect: true
      },

      /**
       * Indicates whether the input is in a dirty state (has been interacted with).
       * @private
       */
      touched: {
        type: Boolean,
        reflect: true,
        attribute: false
      },

      /**
       * Populates the `type` attribute on the input.
       * @type {'text' | 'password' | 'email' | 'credit-card' | 'tel' | 'number'}
       * @default 'text'
       */
      type: {
        type: String,
        reflect: true
      },

      /**
       * Sets validation mode to re-eval with each input.
       */
      validateOnInput: {
        type: Boolean
      },

      /**
       * Specifies the `validityState` this element is in.
       */
      validity: {
        type: String,
        reflect: true
      },

      /**
       * Populates the `value` attribute on the input. Can also be read to retrieve the current value of the input.
       * The format for this property should be ISO for `date` type inputs.
       */
      value: {
        type: String
      }
    };
  }

  /**
   * Read-only Date object representation of `value` for full date formats.
   * @returns {Date|undefined}
   */
  get valueObject() {
    return this._valueObject || this._computeDateObjectFallback(this.value);
  }

  /**
   * Read-only Date object representation of `min` for full date formats.
   * @returns {Date|undefined}
   */
  get minObject() {
    return this._minObject || this._computeDateObjectFallback(this.min);
  }

  /**
   * Read-only Date object representation of `max` for full date formats.
   * @returns {Date|undefined}
   */
  get maxObject() {
    return this._maxObject || this._computeDateObjectFallback(this.max);
  }

  /**
   * Parses a date string into a Date object when the corresponding `_*Object`
   * field hasn't been synced yet by `updated()`. Returns undefined when the
   * input type/format isn't a full date or the string is not a valid date.
   *
   * Why this exists: a parent (datepicker) can call `inputN.validate()` from
   * inside its own `updated()` before this input's `updated()` has run
   * `syncDateValues()` — so `_valueObject`/`_maxObject` are still `undefined`
   * and range checks would otherwise silently no-op (flipping the result to
   * `valid` or `patternMismatch`).
   * @private
   * @param {string|undefined} dateStr - ISO date string from `value`/`min`/`max`.
   * @returns {Date|undefined}
   */
  _computeDateObjectFallback(dateStr) {
    if (!dateStr || !this.util || !this.util.isFullDateFormat(this.type, this.format)) {
      return undefined;
    }
    if (!dateFormatter.isValidDate(dateStr)) {
      return undefined;
    }
    return dateFormatter.stringToDateInstance(dateStr);
  }

  /**
   * Internal setter for readonly date object properties.
   * @private
   * @param {'valueObject'|'minObject'|'maxObject'} propertyName - Public object property name.
   * @param {Date|undefined} propertyValue - Value to assign.
   * @returns {void}
   */
  setDateObjectProperty(propertyName, propertyValue) {
    const internalPropertyName = `_${propertyName}`;
    const previousValue = this[internalPropertyName];

    if (previousValue === propertyValue) {
      return;
    }

    this[internalPropertyName] = propertyValue;
    this.requestUpdate(propertyName, previousValue);
  }

  connectedCallback() {
    super.connectedCallback();

    // Mark for query selectors when registered under a versioned tag (e.g. inside
    // a datepicker/combobox). Must run before parent components call validate() on
    // their inner inputs — the validation framework matches via tag-or-attribute,
    // and parents trigger validation during their own updated() cycle, which can
    // precede this input's firstUpdated().
    if (this.tagName.toLowerCase() !== 'auro-input' && !this.hasAttribute('auro-input')) {
      this.setAttribute('auro-input', '');
    }

    this.locale = this.domHandler.getLocale(this);
    notifyOnLangChange(this);

    // Pre-compute lengthForType and date-object fields so a parent (e.g. datepicker)
    // calling our validate() synchronously during its own updated() cycle sees
    // populated values. Without this, range validation silently no-ops because
    // `max.length === lengthForType` fails when lengthForType is still undefined.
    // Rebuild util here (constructor seeded with en-US default) so configureDataForType's
    // locale-derived format lookup uses the actual locale just resolved above.
    this.util = new AuroInputUtilities({
      locale: this.locale,
      format: this.format
    });
    this.configureDataForType();
    this.syncDateValues();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    stopNotifyingOnLangChange(this);
  }

  firstUpdated() {
    // clicking anywhere in the main wrapper will focus the input. Clicking the helpText or label will not focus the input.
    this.wrapperElement = this.shadowRoot.querySelector('.wrapper');
    this.inputElement = this.renderRoot.querySelector('input');
    this.labelElement = this.shadowRoot.querySelector('label');

    this.patchInputEvent(this.inputElement);

    if (this.wrapperElement) {
      this.wrapperElement.addEventListener('click', this.handleClick);
    }

    // add attribute for query selectors when auro-input is registered under a custom name
    if (this.tagName.toLowerCase() !== 'auro-input' && !this.hasAttribute('auro-input')) {
      this.setAttribute('auro-input', '');
    }
    this.inputId = this.id ? `${this.id}-input` : window.crypto.randomUUID();

    // Normalize the format token to lowercase so case-mixed values supplied
    // via attribute (e.g. `format="MM/DD/YYYY"`) hit the `dateFormatMap`
    // lookup inside `setCustomHelpTextMessage`. Without this, an uppercase
    // format silently misses the map and leaves `setCustomValidityForType`
    // unset.
    if (this.format) {
      this.format = this.format.toLowerCase();
    }

    // use validity message override if declared when initializing the component
    if (this.hasAttribute('setCustomValidity')) {
      this.ValidityMessageOverride = this.setCustomValidity;
    }

    this.setCustomHelpTextMessage();
    this.configureAutoFormatting();
    this.configureDataForType();
    this.syncDateValues();
  }

  /**
   * Patches the input element to dispatch an 'input' event whenever its value is set programmatically.
   * This ensures that changes to the input's value are consistently communicated, even if not triggered by user input.
   *
   * @param {HTMLInputElement} input - The input element to patch.
   * @returns {void}
   * @private
   */
  patchInputEvent(input) {
    if (!input) return;
    if (input && !input.valuePatched) {
      const component = this; // eslint-disable-line consistent-this
      const nativeDescriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');
      Object.defineProperty(input, 'value', {
        get() {
          return nativeDescriptor.get.call(this);
        },
        set(val) {
          // Call the native setter
          nativeDescriptor.set.call(this, val);

          // If the input is not connected to the DOM do not dispatch the event
          if (!this.isConnected) return;

          // If the input has focus, do not dispatch the event because it was not programmatic
          if (this.matches(":focus")) return;

          // If the component has flagged to skip the next programmatic input event, do not dispatch the event
          if (component.skipNextProgrammaticInputEvent) {
            component.skipNextProgrammaticInputEvent = false;
            return;
          }

          // While configureAutoFormatting is running, imask's internal updateControl
          // writes el.value to align display with the masked value. A synthetic input
          // event from that write would re-enter handleInput → processCreditCard mid-setup
          // and clobber a Lit value that was just pushed by the parent combobox.
          if (component._configuringMask) return;

          // If all guard clauses are passed, dispatch the event
          const inputEvent = new InputEvent('input', {
            bubbles: true,
            composed: true,
            cancelable: false
          });
          inputEvent.isProgrammatic = true;
          this.dispatchEvent(inputEvent);
        }
      });
      input.valuePatched = true;
    }
  }

  /**
   * @private
   * @deprecated https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1557296
   * @returns {void} Sets the default help text for the input.
   */
  setCustomHelpTextMessage() {
    // if setCustomValidityForType is already set, don't override it
    if (this.setCustomValidityForType) {
      return;
    }

    const typeToI18n = [
      'password',
      'credit-card',
      'email',
      'tel'
    ];

    if (typeToI18n.includes(this.type)) {
      this.setCustomValidityForType = i18n(this.lang, this.type);
    } else if (!this.format && this.type === 'date') {
      this.setCustomValidityForType = i18n(this.lang, 'dateMMDDYYYY');
    } else if (this.dateFormatMap[this.format]) {
      this.setCustomValidityForType = i18n(this.lang, this.dateFormatMap[this.format]);
    }
  }

  /**
   * LitElement lifecycle method. Called after the DOM has been updated.
   * @param {Map<string, any>} changedProperties - Keys are the names of changed properties, values are the corresponding previous values.
   * @returns {void}
   */
  // eslint-disable-next-line complexity
  updated(changedProperties) {
    super.updated(changedProperties);

    // When locale changes without an explicit format override, derive format from the new locale.
    // Only runs if the current format is still the previous locale's default (not user-overridden).
    if (changedProperties.has('locale') && !changedProperties.has('format') && this.type === 'date') {
      const previousLocaleFormat = getDateFormatFromLocale(changedProperties.get('locale'));
      if (!this.format || this.format.toLowerCase() === previousLocaleFormat) {
        this.format = getDateFormatFromLocale(this.locale);
      }
    }

    if (changedProperties.has('format') || changedProperties.has('locale')) {
      this.util = new AuroInputUtilities({
        locale: this.locale,
        format: this.format
      });
      if (changedProperties.has('format')) {
        this.configureAutoFormatting();
      }
    }

    if (this.type === 'password') {
      this.spellcheck = 'false';
    }

    if (this.spellcheck === 'false') {
      this.autocorrect = 'off';
      this.autocapitalize = 'none';
    } else {
      this.autocorrect = this.autocorrect ? this.autocorrect : undefined;
      this.autocapitalize = undefined;
    }

    if (changedProperties.has('readonly')) {
      if (this.readonly) {
        this.inputElement.setAttribute('readonly', true);
        this.inputElement.setAttribute('aria-readonly', true);
      } else {
        this.inputElement.removeAttribute('readonly');
        this.inputElement.removeAttribute('aria-readonly');
      }
    }

    if (changedProperties.has('type') || changedProperties.has('format')) {
      this.configureDataForType();
    }

    this.syncDateValues(changedProperties);

    if (changedProperties.has('value')) {
      if (this.value && this.value.length > 0) {
        this.hasValue = true;
      } else {
        this.hasValue = false;
      }

      let formattedValue = this.value;
      if (this.type === 'date') {
        const formattedDate = this.util.toFormattedValue(this.valueObject, this.format);
        if (!formattedDate) {
          // if user entered unrecognized date format that cannot be parsed into a Date object,
          // keep the raw value in the input so they can edit it instead of overwriting with an empty string
          formattedValue = this.value;
        } else {
          formattedValue = formattedDate;
        }
      }

      if (formattedValue !== this.inputElement.value) {
        this.skipNextProgrammaticInputEvent = true;
        if (this.maskInstance && this.type === 'credit-card') {
          // Route through the mask so its _value and el.value stay in lock-step
          // (set value calls updateControl which writes el.value = displayValue).
          // Writing el.value directly leaves the mask thinking displayValue is
          // stale; _saveSelection on the next focus/click then warns. Scoped to
          // credit-card so date's own formattedValue (raw ISO when calendar-invalid)
          // isn't re-masked through the mm/dd/yyyy mask, which would truncate it
          // and flip validity from patternMismatch to tooShort.
          this.maskInstance.value = formattedValue || '';
        } else if (formattedValue) {
          this.inputElement.value = formattedValue;
        } else {
          this.inputElement.value = '';
        }

        if (!this.shadowRoot.contains(this.getActiveElement())) {
          this.validate();
        }
      } else if (this.value && !this.valueObject) {
        // invalid format or date value
        // run validate to update validity and error message

        this.validate();
      }

      this.notifyValueChanged();
    }

    if (changedProperties.has('error')) {
      this.validate(true);
    }

    if (changedProperties.has('validity')) {
      this.notifyValidityChange();
    }
  }

  /**
   * @private
   * @returns {void} Notify validity state changed via event.
   */
  notifyValidityChange() {
    this.dispatchEvent(new CustomEvent('auroInput-validityChange', {
      bubbles: true,
      cancelable: false,
      composed: true,
    }));
  }


  /**
   * Synchronizes the ISO string values and Date object representations for date-related properties.
   * This keeps the model and display values aligned when either side changes.
   *
   * When a full date format is in use, this method updates `value`, `min`, and `max` from their corresponding
   * Date objects or vice versa, based on which properties have changed. It only runs when the current configuration
   * represents a full year/month/day date format.
   *
   * @param {Map<string, unknown>|undefined} [changedProperties=undefined] - Optional map of changed properties used to limit which values are synchronized.
   * @returns {void}
   * @private
   */
  syncDateValues(changedProperties = undefined) {
    if (!this.util.isFullDateFormat(this.type, this.format)) {
      return;
    }

    this.syncSingleDateValue(changedProperties, 'valueObject', 'value');
    this.syncSingleDateValue(changedProperties, 'minObject', 'min');
    this.syncSingleDateValue(changedProperties, 'maxObject', 'max');
  }

  /**
   * Synchronizes one date object/string property pair.
   * @private
   * @param {Map<string, unknown>|undefined} changedProperties - Map of changed properties from Lit.
   * @param {string} objectProperty - Date object property name.
   * @param {string} valueProperty - ISO string property name.
   * @returns {void}
   */
  syncSingleDateValue(changedProperties, objectProperty, valueProperty) {
    const objectPropertyChanged = !changedProperties || changedProperties.has(objectProperty);

    // objectProperty wins over valueProperty when both changed
    if (objectPropertyChanged && this[objectProperty]) {
      this[valueProperty] = dateFormatter.toISOFormatString(this[objectProperty]);
      return;
    }

    const valuePropertyChanged = !changedProperties || changedProperties.has(valueProperty);
    if (!valuePropertyChanged) {
      return;
    }

    // when value is newly set to the same ISO string that corresponds to the existing Date object, do not clear the Date object (avoid unnecessary updates)
    if (
      changedProperties &&
      valueProperty === 'value' &&
      changedProperties.get('value') === undefined &&
      this[objectProperty] instanceof Date &&
      this[valueProperty] === dateFormatter.toISOFormatString(this[objectProperty])
    ) {
      return;
    }

    if (dateFormatter.isValidDate(this[valueProperty])) {
      this.setDateObjectProperty(objectProperty, dateFormatter.stringToDateInstance(this[valueProperty]));
    } else {
      this.setDateObjectProperty(objectProperty, undefined);
    }
  }

  /**
   * Sets up IMasks and logic based on auto-formatting requirements.
   * @private
   * @returns {void}
   */
  configureAutoFormatting() {
    // Re-entrancy guard. The patched-setter's synthetic input event (suppressed
    // by _configuringMask above) could otherwise trigger handleInput →
    // processCreditCard → configureAutoFormatting before the outer call's
    // set value has finished its alignCursor pass.
    if (this._configuringMask) return;
    this._configuringMask = true;
    try {
      if (this.maskInstance) {
        this.maskInstance.destroy();
      }

      // Pass new format to util
      this.util.updateFormat(this.format);

      const maskOptions = this.util.getMaskOptions(this.type, this.format);

      if (this.inputElement && maskOptions.mask) {

        // Stash and clear any existing value before IMask init.
        // IMask's constructor processes the current input value which requires
        // selection state — clearing first avoids that scenario entirely.
        // When the format changes (e.g. locale switch) and we have a valid ISO
        // model value, compute the display string for the NEW format instead of
        // re-using the old display string, which may be invalid in the new mask.
        let existingValue = this.inputElement.value;
        if (
          this.util.isFullDateFormat(this.type, this.format) &&
          this.value &&
          dateFormatter.isValidDate(this.value) &&
          this.valueObject instanceof Date &&
          !Number.isNaN(this.valueObject.getTime()) &&
          typeof maskOptions.format === 'function'
        ) {
          existingValue = maskOptions.format(this.valueObject);
        }

        this.skipNextProgrammaticInputEvent = true;
        this.inputElement.value = '';

        this.maskInstance = IMask(this.inputElement, maskOptions);

        this.maskInstance.on('accept', () => {
          // Suppress propagation during configureAutoFormatting's own value-restoration
          // (line below) — the mask emits 'accept' on every value-set, including ours,
          // and we don't want to overwrite a value the parent just pushed.
          if (this._configuringMask) return;
          this.value = this.util.toModelValue(this.maskInstance.value, this.format);
          if (this.type === "date") {
            this._rawMaskValue = this.maskInstance.value;
          }
        });

        this.maskInstance.on('complete', () => {
          if (this._configuringMask) return;
          this.value = this.util.toModelValue(this.maskInstance.value, this.format);
          if (this.type === "date") {
            this._rawMaskValue = this.maskInstance.value;
          }
        });

        // Restore the stashed value through IMask so it's properly masked
        if (existingValue) {
          this.maskInstance.value = existingValue;
        }
      }
    } finally {
      this._configuringMask = false;
    }
  }

  /**
   * Sends event notifying that the input has changed it's value.
   * @private
   * @returns {void}
   */
  notifyValueChanged() {
    let inputEvent = null;

    inputEvent = new Event('input', {
      bubbles: true,
      composed: true,
    });

    // Dispatched event to alert outside shadow DOM context of event firing.
    this.dispatchEvent(inputEvent);
  }


  /**
   * Handles clicking on the auro-input anywhere outside of the HTML5 input and still moving focus in.
   * @private
   * @return {void}
   */
  handleClick() {
    this.focus();
  }

  /**
   * Function to set element focus.
   * @return {void}
   */
  focus() {
    this.inputElement.focus();
  }

  /**
   * Handles event of clearing input content by clicking the X icon.
   * @private
   * @return {void}
   */
  handleClickClear() {
    this.inputElement.value = "";
    this.labelElement.classList.remove('inputElement-label--sticky');
    this.validation.reset(this);
    this.notifyValueChanged();
    this.focus();
  }

  /**
   * @param {Event} event - The input event.
   * @private
   * @returns {void}
   */
  handleInput(event) {
    // Process credit card type detection and formatting during input
    if (this.type === 'credit-card') {
      this.processCreditCard();
    }

    // Sets value property to value of element value (el.value).
    this.value = this.util.toModelValue(this.inputElement.value, this.format);

    // Determine if the value change was programmatic, including autofill.
    const inputWasProgrammatic = !this.matches(":focus") || event.isProgrammatic;

    // Validation on input or programmatic value change (including autofill).
    if (this.validateOnInput || inputWasProgrammatic) {
      this.touched = true;
      this.validation.validate(this);
    }

    // Prevents cursor jumping in Safari. Setting `this.value` triggers a Lit
    // update that can re-render the input and reset the native cursor; we
    // capture the caret position before that update commits and restore it
    // via `setSelectionRange` once the update has flushed. Gated on
    // `setSelectionInputTypes` so credit-card (and other masked types whose
    // formatter manages the cursor itself) doesn't get a competing write.
    const { selectionStart } = this.inputElement;

    if (this.setSelectionInputTypes.includes(this.type)) {
      this.updateComplete.then(() => {
        try {
          this.inputElement.setSelectionRange(selectionStart, selectionStart);
        } catch (error) { // eslint-disable-line
          // Some input types (number/email in certain UAs) throw on
          // setSelectionRange; swallow and let the native cursor stand.
        }
      });
    }
  }

  /**
   * Function to support @focusin event.
   * @private
   * @return {void}
   */
  handleFocusin() {
    this.hasFocus = true;

    this.touched = true;
  }

  /**
   * Function to support @focusout event.
   * @private
   * @return {void}
   */
  handleFocusout() {
    this.hasFocus = false;
  }

  /**
   * Function to support @blur event.
   * @private
   * @return {void}
   */
  handleBlur() {
    this.inputElement.scrollLeft = 100;

    if (!this.noValidate) {
      // For credit card inputs with mask, ensure value is synced from mask instance
      if (this.type === 'credit-card' && this.maskInstance) {
        this.value = this.maskInstance.value;
      }

      this.validation.validate(this);
    }
  }

  /**
   * Returns focused element, even if it's in the shadow DOM.
   * @private
   * @param {Object} root - Element to check for focus.
   * @returns {Object}
   */
  getActiveElement(root = document) {
    const activeEl = root.activeElement;

    if (!activeEl) {
      return null;
    }

    if (activeEl.shadowRoot) {
      return this.getActiveElement(activeEl.shadowRoot);
    }

    return activeEl;
  }

  /**
   * Sets the active descendant element for accessibility.
   * Uses ariaActiveDescendantElement to cross shadow DOM boundaries.
   * This function is used in components that contain `auro-input` to set the active descendant.
   * @private
   * @param {HTMLElement|null} element - The element to set as the active descendant, or null to clear.
   * @returns {void}
   */
  setActiveDescendant(element) {
    if (this.inputElement) {
      this.inputElement.ariaActiveDescendantElement = element;
    }
  }

  /**
   * Validates value.
   * @param {boolean} [force=false] - Whether to force validation.
   */
  validate(force = false) {
    this.validation.validate(this, force);
  }

  /**
   * Resets component to initial state, including resetting the touched state and validity.
   * @returns {void}
   */
  reset() {
    this.value = undefined;
    this.setDateObjectProperty('valueObject', undefined);
    this.validation.reset(this);
  }

  /**
   * Clears the input value.
   */
  clear() {
    this.value = undefined;
    this.setDateObjectProperty('valueObject', undefined);
  }

  /**
   * Sets configuration data used elsewhere based on the `type` attribute.
   * @private
   * @returns {void}
   */
  configureDataForType() {
    const defaultLengths = {
      'credit-card': 19,
      'tel': 17,
      'date': 10
    };

    if (this.type in defaultLengths) {
      this.lengthForType = this.format ? this.format.length : defaultLengths[this.type];
      this.maxLength = this.lengthForType;
      this.inputmode = this.inputmode || 'numeric';
    } else if (this.type === 'number') {
      this.inputmode = this.inputmode || 'numeric';
    }

    // Set default date format if type=date and no format is defined
    if (this.type === "date" && !this.format) {
      // Use locale to determine default date format
      this.format = this.util.getDateMaskFromLocale().toLowerCase();
      this.util.updateFormat(this.format);
    }
  }

  /**
   * Support placeholder text.
   * @private
   * @returns {void}
   */
  get placeholderStr() {
    if (!this.placeholder && this.type === 'date') {
      return this.format ? this.format.toUpperCase() : 'MM/DD/YYYY';
    }
    return this.placeholder || "";
  }

  // Functions specific to Credit Card component support
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  /**
   * Function to support credit-card feature type.
   * @private
   * @returns {void}
   */
  processCreditCard() {
    const creditCard = this.matchInputValueToCreditCard();
    const previousFormat = this.format;

    this.format = creditCard.maskFormat;

    this.maxLength = creditCard.formatLength;
    this.minLength = creditCard.formatMinLength;

    this.errorMessage = creditCard.errorMessage;

    if (this.icon) {
      this.inputIconName = creditCard.cardIcon;
    }

    // Only reconfigure the mask if the format has changed
    if (this.inputElement && previousFormat !== this.format) {
      this.configureAutoFormatting();
    }
  }

  /**
   * Function to support credit-card feature type.
   * @private
   * @deprecated https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1557296
   * @returns {object} JSON with data for credit card formatting.
   */
  matchInputValueToCreditCard() {
    const CreditCardValidationMessage = `${i18n(this.lang, 'validCard')}`;

    const creditCardTypes = [
      {
        name: 'Airlines',
        regex: /^(?<num>1|2)\d{0}/u,
        formatMinLength: 17,
        errorMessage: CreditCardValidationMessage,
        cardIcon: 'credit-card',
        maskFormat: "0000 0000 0000 0000 000"
      },
      {
        name: 'Commercial',
        regex: /^(?<num>2)\d{0}/u,
        formatMinLength: 8,
        errorMessage: CreditCardValidationMessage,
        cardIcon: 'credit-card',
        maskFormat: "0000 0000 000"
      },
      {
        name: 'Alaska Commercial',
        regex: /^(?<num>27)\d{0}/u,
        formatMinLength: 8,
        errorMessage: CreditCardValidationMessage,
        cardIcon: 'cc-alaska',
        maskFormat: "0000 0000 000"
      },
      {
        name: 'American Express',
        regex: /^(?<num>34|37)\d{0}/u,
        formatLength: 17,
        errorMessage: CreditCardValidationMessage,
        cardIcon: 'cc-amex',
        maskFormat: "0000 000000 00000"
      },
      {
        name: 'Diners club',
        regex: /^(?<num>30[0-5]|36|38)\d{0}/u,
        formatLength: 16,
        errorMessage: CreditCardValidationMessage,
        cardIcon: 'cc-dinersclub',
        maskFormat: "0000 000000 0000"
      },
      {
        name: 'Visa',
        regex: /^(?<num>4)\d{0}/u,
        formatLength: 19,
        errorMessage: CreditCardValidationMessage,
        cardIcon: 'cc-visa',
        maskFormat: "0000 0000 0000 0000"
      },
      {
        name: 'Alaska Airlines Visa',
        regex: /^(?<num>4147\s34|4888\s93|4800\s11|4313\s51|4313\s07)\d{0}/u,
        formatLength: 19,
        errorMessage: CreditCardValidationMessage,
        cardIcon: 'cc-alaska',
        maskFormat: "0000 0000 0000 0000"
      },
      {
        name: 'Master Card',
        regex: /^(?<num>5)\d{0}/u,
        formatLength: 19,
        errorMessage: CreditCardValidationMessage,
        cardIcon: 'cc-mastercard',
        maskFormat: "0000 0000 0000 0000"
      },
      {
        name: 'Discover Card',
        regex: /^(?<num>6)\d{0}/u,
        formatLength: 19,
        errorMessage: CreditCardValidationMessage,
        cardIcon: 'cc-discover',
        maskFormat: "0000 0000 0000 0000"
      }
    ];

    let type = {
      name: 'Default Card',
      formatLength: 19,
      errorMessage: CreditCardValidationMessage,
      cardIcon: 'credit-card',
      maskFormat: "0000 0000 0000 0000"
    };

    creditCardTypes.forEach((cardType) => {
      if (cardType.regex.exec(this.value)) {
        type = cardType;
      }
    });

    this.validationCCLength = type.formatLength;

    return type;
  }
}

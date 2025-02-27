// Copyright (c) 2025 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

/* eslint-disable max-lines, dot-location, new-cap */
/* eslint no-magic-numbers: ["error", { "ignore": [0] }] */

import { LitElement, css } from "lit";

import styleCss from "./styles/style-css.js";
import colorCss from "./styles/color-css.js";
import tokensCss from "./styles/tokens-css.js";

import i18n, {notifyOnLangChange, stopNotifyingOnLangChange} from './i18n.js';
import { AuroInputUtilities } from "./utilities.js";

import IMask from 'imask';

import AuroFormValidation from '@auro-formkit/form-validation';

/**
 * Auro-input provides users a way to enter data into a text field.
 *
 * @attr {Boolean} bordered - Applies bordered UI variant.
 * @attr {Boolean} borderless - Applies borderless UI variant.
 *
 * @slot helptext - Sets the help text displayed below the input.
 * @slot label - Sets the label text for the input.
 *
 * @csspart wrapper - Use for customizing the style of the root element
 * @csspart label - Use for customizing the style of the label element
 * @csspart helpText - Use for customizing the style of the helpText element
 * @csspart accentIcon - Use for customizing the style of the accentIcon element (e.g. credit card icon, calendar icon)
 * @csspart iconContainer - Use for customizing the style of the iconContainer (e.g. X icon for clearing input value)
 * @event input - Event fires when the value of an `auro-input` has been changed.
 * @event auroFormElement-validated - Notifies that the `validity` and `errorMessage` value has changed.
 */

export default class BaseInput extends LitElement {

  constructor() {
    super();

    this.icon = false;
    this.disabled = false;
    this.required = false;
    this.noValidate = false;
    this.max = undefined;
    this.min = undefined;
    this.maxLength = undefined;
    this.minLength = undefined;
    this.activeLabel = false;
    this.setCustomValidityForType = undefined;
  }

  /**
   * Internal Defaults.
   * @private
   * @returns {void}
   */
  privateDefaults() {
    this.util = new AuroInputUtilities();
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

    /**
     * Credit Card is not included as this caused cursor placement issues.
     * The Safari issue.
     */
    this.setSelectionInputTypes = [
      "text",
      "password",
      "email"
    ];

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

    const idLength = 36;
    const idSubstrEnd = 8;
    const idSubstrStart = 2;

    this.uniqueId = Math.random()
      .toString(idLength)
      .substring(idSubstrStart, idSubstrEnd);
  }

  // function to define props used within the scope of this componentstatic
  static get properties() {
    return {

      /**
       * If set, the label will remain fixed in the active position.
       */
      activeLabel: {
        type: Boolean,
        reflect: true
      },

      /**
       * An enumerated attribute that controls whether and how text input is automatically capitalized as it is entered/edited by the user. [off/none, on/sentences, words, characters].
       */
      autocapitalize: {
        type: String
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
        type: String
      },

      /**
       * If set, disables the input.
       */
      disabled: {
        type: Boolean
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
       * If set, will render an icon inside the input to the left of the value. Support is limited to auro-input instances with credit card format.
       */
      icon: {
        type: Boolean
      },

      /**
       * Sets the unique ID of the element.
       */
      id: {
        type: String
      },

      /**
       * Defines the language of an element.
       */
      lang: {
        type: String
      },

      /**
       * The maximum value allowed. This only applies for inputs with a type of `number` and all date formats.
       */
      max: {
        type: String
      },

      /**
       * The maximum number of characters the user can enter into the text input. This must be an integer value `0` or higher.
       */
      maxLength: {
        type: Number
      },

      /**
       * The minimum value allowed. This only applies for inputs with a type of `number` and all date formats.
       */
      min: {
        type: String
      },

      /**
       * The minimum number of characters the user can enter into the text input. This must be a non-negative integer value smaller than or equal to the value specified by `maxlength`.
       */
      minLength: {
        type: Number
      },

      /**
       * Populates the `name` attribute on the input.
       */
      name: {
        type: String
      },

      /**
       * If set, disables auto-validation on blur.
       */
      noValidate: {
        type: Boolean
      },

      /**
       * Specifies a regular expression the form control's value should match.
       */
      pattern: {
        type: String,
        reflect: true
      },

      /**
       * Define custom placeholder text, only supported by date input formats.
       */
      placeholder: {
        type: String
      },

      /**
       * Makes the input read-only, but can be set programmatically.
       */
      readonly: {
        type: Boolean
      },

      /**
       * Populates the `required` attribute on the input. Used for client-side validation.
       */
      required: {
        type: Boolean
      },

      /**
       * @ignore
       */
      showPassword: {
        state: true
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
       * Custom help text message for email type validity.
       */
      customValidityTypeEmail: {
        type: String
      },

      /**
       * An enumerated attribute defines whether the element may be checked for spelling errors. [true, false]. When set to `false` the attribute `autocorrect` is set to `off` and `autocapitalize` is set to `none`.
       */
      spellcheck: {
        type: String
      },

      /**
       * Populates the `type` attribute on the input. Allowed values are `password`, `email`, `credit-card`, `date`, `tel` or `text`. If given value is not allowed or set, defaults to `text`.
       */
      type: {
        type: String,
        reflect: true
      },

      /**
       * Populates the `value` attribute on the input. Can also be read to retrieve the current value of the input.
       */
      value: {
        type: String
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
      }
    };
  }


  static get styles() {
    return [
      css`${colorCss}`,
      css`${styleCss}`,
      css`${tokensCss}`
    ];
  }

  connectedCallback() {
    super.connectedCallback();

    this.privateDefaults();

    notifyOnLangChange(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    stopNotifyingOnLangChange(this);
  }

  firstUpdated() {
    // add attribute for query selectors when auro-input is registered under a custom name
    if (this.tagName.toLowerCase() !== 'auro-input') {
      this.setAttribute('auro-input', true);
    }

    this.inputElement = this.renderRoot.querySelector('input');
    this.labelElement = this.shadowRoot.querySelector('label');

    if (this.format) {
      this.format = this.format.toLowerCase();
    }

    // use validity message override if declared when initializing the component
    if (this.hasAttribute('setCustomValidity')) {
      this.ValidityMessageOverride = this.setCustomValidity;
    }

    this.setCustomHelpTextMessage();
    this.configureAutoFormatting();
  }

  /**
   * @private
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
  updated(changedProperties) {
    if (changedProperties.has('format')) {
      this.configureAutoFormatting();
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

    if (changedProperties.has('value')) {
      if (this.value && this.value.length > 0) {
        this.hasValue = true;
        this.requestUpdate();
      } else {
        this.hasValue = false;
        this.requestUpdate();
      }

      if (this.value !== this.inputElement.value) {
        if (this.value) {
          this.inputElement.value = this.value;
        } else {
          this.inputElement.value = '';
        }

        if (!this.shadowRoot.contains(this.getActiveElement())) {
          this.validation.validate(this);
        }

        this.notifyValueChanged();
      }
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
   * Sets up IMasks and logic based on auto-formatting requirements.
   * @private
   * @returns {void}
   */
  configureAutoFormatting() {
    if (this.maskInstance) {
      this.maskInstance.destroy();
    }

    const maskOptions = this.util.getMaskOptions(this.type, this.format);

    if (this.inputElement && maskOptions.mask) {
      this.maskInstance = IMask(this.inputElement, maskOptions);

      this.maskInstance.on('accept', () => {
        this.value = this.maskInstance.value;
      });

      this.maskInstance.on('complete', () => {
        this.value = this.maskInstance.value;

        // Format date to North American format
        if (this.type === 'date' && this.value && this.value.length === this.lengthForType && this.util.toNorthAmericanFormat(this.value, this.format)) {
          const formattedDates = this.util.toNorthAmericanFormat(this.value, this.format);

          this.formattedDate = formattedDates.formattedDate;
          this.comparisonDate = formattedDates.dateForComparison;
        }
      });
    }
  }

  /**
   * @private
   * @returns {string}
   */
  definePattern() {
    if (this.type === 'credit-card' && !this.noValidate && this.maxLength) {
      return `.{${this.maxLength},${this.maxLength}}`;
    }

    return this.pattern;
  }

  /**
   * Function to set element focus.
   * @private
   * @return {void}
   */
  focus() {
    this.inputElement.focus();
  }

  /**
   * Required to convert SVG icons from data to HTML string.
   * @private
   * @param {string} icon HTML string for requested icon.
   * @returns {object} Appended HTML for SVG.
   */
  getIconAsHtml(icon) {
    const dom = new DOMParser().parseFromString(icon.svg, 'text/html');

    return dom.body.firstChild;
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
   * Handles event of clearing input content by clicking the X icon.
   * @private
   * @return {void}
   */
  handleClickClear() {
    this.inputElement.value = "";
    this.value = "";
    this.labelElement.classList.remove('inputElement-label--sticky');
    this.focus();
    this.validation.validate(this);
    this.notifyValueChanged();
  }

  /**
   * @private
   * @return {void}
   */
  handleInput() {
    // Sets value property to value of element value (el.value).
    this.value = this.inputElement.value;

    // Validation on blur or input.
    if (this.validateOnInput) {
      this.validation.validate(this);
    }

    // Prevents cursor jumping in Safari.
    const { selectionStart } = this.inputElement;

    if (this.setSelectionInputTypes.includes(this.type)) {
      this.updateComplete.then(() => {
        try {
          this.inputElement.setSelectionRange(selectionStart, selectionStart);
        } catch (error) { // eslint-disable-line
          // do nothing
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

    /**
     * The input is considered to be in it's initial state based on
     * if this.value === undefined. The first time we interact with the
     * input manually, by applying focusin, we need to flag the
     * input as no longer in the initial state.
     */
    if (this.value === undefined) {
      this.value = '';
    }
  }

  /**
   * Function to support @blur event.
   * @private
   * @return {void}
   */
  handleBlur() {
    this.inputElement.scrollLeft = 100;

    if (!this.noValidate) {
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
   * Validates value.
   * @param {boolean} [force=false] - Whether to force validation.
   */
  validate(force = false) {
    this.validation.validate(this, force);
  }

  /**
   * Resets component to initial state.
   * @returns {void}
   */
  reset() {
    this.validation.reset(this);
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
      this.inputMode = 'numeric';
    } else if (this.type === 'number') {
      this.inputMode = 'numeric';
    }
  }

  /**
   * Validates against list of supported this.allowedInputTypes; return type=text if invalid request.
   * @private
   * @param {string} type Value entered into component prop.
   * @returns {string} Iterates over allowed types array.
   */
  getInputType(type) {
    if (this.allowedInputTypes.includes(type)) {
      return type;
    }

    return "text";
  }

  /**
   * Determines default help text string.
   * @private
   * @returns {string} Evaluates pre-determined help text.
   */
  getHelpText() {
    const typeHelpText = [
      'password',
      'email',
      'credit-card',
      'tel'
    ];

    if (typeHelpText.includes(this.type)) {
      return i18n(this.lang, this.type);
    }

    if (this.type === 'date') {
      return i18n(this.lang, this.dateFormatMap[this.format] || 'dateMMDDYYYY');
    }

    return '';
  }

  /**
   * Function to support show-password feature.
   * @private
   * @returns {void}
   */
  handleClickShowPassword() {
    this.showPassword = !this.showPassword;
    this.focus();
  }

  /**
   * Support placeholder text.
   * @private
   * @returns {string}
   */
  getPlaceholder() {
    if (this.placeholder) {
      return this.placeholder;
    } else if (this.type === 'date') {
      return this.format ? this.format.toUpperCase() : 'MM/DD/YYYY';
    }

    return '';
  }

  /**
   * Defines placement of input icon based on type, used with classMap.
   * @private
   * @returns {boolean}
   */
  defineInputIcon() {
    if (this.icon && this.type === 'credit-card') {
      return true;
    } else if (this.type === 'date') {
      return true;
    }

    return false;
  }

  /**
   * Defines padding of input label based on type, used with classMap.
   * @private
   * @returns {boolean}
   */
  defineLabelPadding() {
    if (this.icon && this.type === 'credit-card' && (this.value === "" || this.value === undefined)) {
      return true;
    } else if (this.type === 'date') {
      return true;
    }

    return false;
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

    this.format = creditCard.maskFormat;

    this.maxLength = creditCard.formatLength;
    this.minLength = creditCard.formatMinLength;

    this.errorMessage = creditCard.errorMessage;

    if (this.icon) {
      this.inputIconName = creditCard.cardIcon;
    }

    if (this.inputElement) {
      this.configureAutoFormatting();
    }
  }

  /**
   * Function to support credit-card feature type.
   * @private
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
        regex: /^(?<num>36|38)\d{0}/u,
        formatLength: 16,
        errorMessage: CreditCardValidationMessage,
        cardIcon: 'credit-card',
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

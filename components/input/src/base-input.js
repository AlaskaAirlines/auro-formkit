// Copyright (c) 2025 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

/* eslint-disable max-lines, new-cap, curly, no-underscore-dangle */
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
 * Shared base class for `auro-input` that handles the value, formatting, and validation.
 * @event input - Fires when the value changes, whether the user types or code sets the value. Events from code changes have `isProgrammatic` set to `true`.
 * @event auroFormElement-validated - Fires each time the input is validated, with the result in `event.detail.validity` and `event.detail.message`.
 * @event auroInput-validityChange - Fires when `validity` changes.
 */
export default class BaseInput extends AuroElement {

  // Delegate focus to the native <input> inside the shadow root so that
  // clicking anywhere on the input wrapper focuses the native input, and
  // programmatic .focus() calls on elements in the shadow DOM work correctly.
  // The initial-load focus theft was caused by the static `autofocus`
  // attribute on the bib input (now conditional), not by delegatesFocus.
  /**
   * Lit's options for creating the shadow root.
   * @internal
   */
  static get shadowRootOptions() {
    return {
      ...AuroElement.shadowRootOptions,
      delegatesFocus: true,
    };
  }

  constructor() {
    super();

    // Single-source initialization. Alphabetized so duplicate or stale
    // defaults are immediately obvious on a diff. Every field is assigned
    // exactly once here (previously the constructor + the old
    // `_initializePrivateDefaults` overlapped — both wrote ~14 of the same
    // fields and double-allocated `util` and `validation`, discarding the
    // first instance). `validation` is now allocated exactly once; `util`
    // is seeded here with an en-US default and then rebuilt in
    // `connectedCallback` once the consumer-resolved locale is available,
    // so a parent (datepicker/combobox) calling `validate()` synchronously
    // during its own update cycle sees a populated util instance.
    this.activeLabel = false;

    /**
     * @private
     * @type {string[]}
     */
    this.allowedInputTypes = [
      "text",
      "number",
      "email",
      "password",
      "credit-card",
      "tel"
    ];

    /** @type {'default' | 'inverse'} */
    this.appearance = "default";

    /**
     * @private
     * @type {Record<string, string>}
     */
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
    this.disabled = false;

    /** @private */
    this.domHandler = new DomHandler();
    this.dvInputOnly = false;
    this.hasValue = false;
    this.hideLabelVisually = false;
    this.icon = false;

    /** @private */
    this.inputIconName = undefined;

    /** @private */
    this.label = 'Input label is undefined';
    this.locale = 'en-US';

    /** @internal */
    this._format = undefined;

    /** @private */
    this._userSetFormat = false;
    this.max = undefined;
    this.maxLength = undefined;
    this.min = undefined;
    this.minLength = undefined;
    this.noValidate = false;
    this.onDark = false;
    this.required = false;
    this.setCustomValidityForType = undefined;
    // Credit Card is intentionally excluded — its mask manages the cursor
    // itself, and listing it here caused cursor placement issues in Safari.
    /**
     * @private
     * @type {string[]}
     */
    this.setSelectionInputTypes = [
      "text",
      "password",
      "email"
    ];

    /** @private */
    this.showPassword = false;
    this.touched = false;

    /** @private */
    this.uniqueId = new UniqueId().create();

    /** @private */
    this.util = new AuroInputUtilities({
      locale: this.locale,
      format: this.format
    });

    /** @private */
    this.validation = new AuroFormValidation();

    /** @private */
    this.validationCCLength = undefined;
    this.value = undefined;

    this.initializeArchitectureDefaults();
  }

  /**
   * Sets the default `layout`, `shape`, and `size` values.
   *
   * These are assigned in a helper method rather than the constructor body so
   * the CEM analyzer keeps their `@type` string-literal unions (a literal
   * assignment in the constructor would make the analyzer infer `string` and
   * override the union; see AlaskaAirlines/discussions#653, gotcha 1).
   * @private
   * @returns {void}
   */
  initializeArchitectureDefaults() {
    this.layout = 'classic';
    this.shape = 'classic';
    this.size = 'lg';
  }

  // function to define props used within the scope of this component
  static get properties() {
    return {
      ...super.properties,

      /**
       * Sets how the label and value are arranged. `classic` raises the label above the value
       * when the field has focus or a value; the `emphasized` and `snowflake` layouts always show the label inside the field.
       * @type {'classic' | 'emphasized' | 'emphasized-left' | 'emphasized-right' | 'snowflake' | 'snowflake-left' | 'snowflake-right'}
       * @default 'classic'
       * @category ui
       */
      layout: {
        type: String,
        attribute: "layout",
        reflect: true
      },

      /**
       * Sets the shape of the field's border. The emphasized layouts support `pill`, `pill-left`,
       * and `pill-right`, and the snowflake layout uses `snowflake`.
       * @type {'box' | 'classic' | 'pill' | 'pill-left' | 'pill-right' | 'rounded' | 'snowflake'}
       * @default 'classic'
       * @category ui
       */
      shape: {
        type: String,
        attribute: "shape",
        reflect: true
      },

      /**
       * Sets the field's size. The `classic` shape is the same height at every size, and the
       * emphasized layouts support only `xl`.
       * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl'}
       * @default 'lg'
       * @category ui
       */
      size: {
        type: String,
        attribute: "size",
        reflect: true
      },

      /**
       * Sets the role screen readers announce for the inner `<input>` element, such as `combobox`
       * when the input is part of `auro-combobox` (the input's `role`).
       * @category a11y
       */
      a11yRole: {
        type: String,
        attribute: 'a11yrole',
        reflect: true
      },

      /**
       * Sets the ID of the element the input controls, such as a combobox's list of options
       * (the inner `<input>` element's `aria-controls`).
       * @category a11y
       */
      a11yControls: {
        type: String,
        attribute: 'a11ycontrols',
        reflect: true
      },

      /**
       * Tells screen readers that the element the input controls, such as a list of options, is open
       * (the inner `<input>` element's `aria-expanded`).
       * @category a11y
       */
      a11yExpanded: {
        type: Boolean,
        attribute: 'a11yexpanded',
        reflect: true
      },

      /**
       * Sets the ID of the option screen readers announce as active while focus stays in the input,
       * such as the highlighted option in a list (the inner `<input>` element's `aria-activedescendant`).
       * @category a11y
       */
      a11yActivedescendant: {
        type: String,
        attribute: 'a11yactivedescendant',
        reflect: true
      },

      /**
       * Keeps the label raised above the value, even when the field is empty and doesn't have focus.
       * Applies only to the `classic` layout; the emphasized and snowflake layouts always show the label inside the field.
       * @relevantWhen layout === 'classic'
       * @category ui
       */
      activeLabel: {
        type: Boolean,
        attribute: 'activelabel',
        reflect: true
      },

      /**
       * Sets the color scheme. Use `inverse` on dark backgrounds and `default` on light backgrounds.
       * @type {'default' | 'inverse'}
       * @default 'default'
       * @category ui
       */
      appearance: {
        type: String,
        reflect: true
      },

      /**
       * Sets whether mobile keyboards capitalize text as the user types, such as `words` for names
       * (the input's `autocapitalize`). Does not currently apply: the input clears this value on every
       * update, unless `spellcheck="false"`, which sets it to `none`.
       * @type {'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters'}
       * @category behavior
       */
      autocapitalize: {
        type: String,
        reflect: true
      },

      /**
       * Sets what the browser can suggest when filling in the field, such as `off` to turn off
       * autofill suggestions (the input's `autocomplete`). Only `autocomplete="off"` is currently supported.
       * @category behavior
       */
      autocomplete: {
        type: String,
        reflect: true
      },

      /**
       * Sets whether Safari on iOS corrects words as the user types. Use `off` for names, codes, and
       * other text that isn't made of dictionary words. Always `off` when `spellcheck="false"`.
       * @type {'on' | 'off'}
       * @category behavior
       */
      autocorrect: {
        type: String,
        reflect: true
      },

      /**
       * Does not currently change any message. To set the error message for an invalid email address,
       * use `setCustomValidityForType`.
       * @relevantWhen !noValidate
       * @category behavior
       */
      customValidityTypeEmail: {
        type: String,
        attribute: 'customvaliditytypeemail'
      },

      /**
       * Turns the input off. A disabled input is shown in a muted style, can't be edited or reached
       * with the keyboard, and doesn't show the clear button.
       * @category ui
       */
      disabled: {
        type: Boolean,
        reflect: true
      },

      /**
       * Keeps the label visible while `displayValue` slot content is shown in place of the value.
       * Without it, the `displayValue` content hides both the label and the value.
       * @category ui
       */
      dvInputOnly: {
        type: Boolean,
        attribute: 'dvinputonly',
        reflect: true
      },

      /**
       * Shows an error that stays until you remove the attribute, and sets `validity` to `customError`.
       * The attribute value is the error message, unless `setCustomValidityCustomError` or `setCustomValidity` is set.
       * @category behavior
       */
      error: {
        type: String,
        reflect: true
      },

      /**
       * Holds the error message shown below the field for the current `validity`.
       * Validation sets it, so read it instead of setting it.
       * @category behavior
       */
      errorMessage: {
        type: String,
        attribute: 'errormessage'
      },

      /**
       * Sets the pattern the value is formatted to as the user types, such as `mm/dd/yyyy` for a date or
       * `+1 (000) 000-0000` for a phone number. Outside dates, `0` stands for a digit, `a` for a letter, and `*` for any character.
       * For `type="date"`, it replaces the format that `locale` would set.
       * @category behavior
       */
      format: {
        type: String,
        reflect: true,
        noAccessor: true
      },

      /**
       * Reports whether the input currently has focus. The input updates it, so read it instead of setting it.
       * @category behavior
       */
      hasFocus: {
        type: Boolean,
        reflect: false,
        attribute: false
      },

      /**
       * Reports whether the input currently has a value. The input updates it, so read it instead of setting it.
       * @category behavior
       */
      hasValue: {
        type: Boolean,
        reflect: false,
        attribute: false
      },

      /**
       * Hides the label visually while screen readers still announce it.
       * @private
       */
      hideLabelVisually: {
        type: Boolean,
        attribute: 'hidelabelvisually',
        reflect: true
      },


      /**
       * Shows a card icon left of the value that changes to the detected card brand, such as Visa, as the user types.
       * Applies only when `type="credit-card"`, and the emphasized layouts don't show it.
       * @relevantWhen type === 'credit-card'
       * @category ui
       */
      icon: {
        type: Boolean,
        reflect: true
      },

      /**
       * Sets a unique ID for the element, such as `email`. The inner `<input>` element uses this ID
       * followed by `-input`, such as `email-input`.
       * @category behavior
       */
      id: {
        type: String,
        reflect: true
      },

      /**
       * The ID of the inner `<input>` element.
       * @private
       */
      inputId: {
        type: String,
        reflect: false,
        attribute: false
      },

      /**
       * Sets which on-screen keyboard mobile devices show, such as `numeric` for digits only or `email`
       * (the input's `inputmode`). Defaults to `numeric` when `type` is `number`, `tel`, `credit-card`, or `date`.
       * @category behavior
       */
      inputmode: {
        type: String,
        reflect: true
      },

      /**
       * Sets the language of the input's built-in help text and error messages, such as `es` for Spanish.
       * Only `es` changes the text; other values use English. When not set, the input follows the page's `lang`.
       * @category behavior
       */
      lang: {
        type: String,
        reflect: true
      },

      /**
       * Sets the region whose date format `type="date"` uses, such as `en-GB` for `dd/mm/yyyy`.
       * When not set, the input uses the nearest ancestor's `data-locale` attribute, or `en-US`.
       * @category behavior
       */
      locale: {
        type: String,
        reflect: true
      },

      /**
       * Sets the largest value allowed, such as `10` for a number or `2025-12-31` for a date.
       * Applies only when `type` is `number`, or `date` with a full date format; write dates in ISO format (`YYYY-MM-DD`).
       * @category behavior
       */
      max: {
        type: String
      },

      /**
       * Sets the most characters the user can enter, as a whole number `0` or higher.
       * Don't set it when `type` is `credit-card`, `tel`, or `date`, because those types set their own length.
       * @category behavior
       */
      maxLength: {
        type: Number,
        attribute: 'maxlength',
        reflect: true
      },

      /**
       * Sets the smallest value allowed, such as `1` for a number or `2024-01-01` for a date.
       * Applies only when `type` is `number`, or `date` with a full date format; write dates in ISO format (`YYYY-MM-DD`).
       * @category behavior
       */
      min: {
        type: String
      },

      /**
       * Sets the fewest characters the value needs to be valid, as a whole number no larger than `maxlength`.
       * An empty value isn't checked against it; use `required` for that.
       * @category behavior
       */
      minLength: {
        type: Number,
        attribute: 'minlength',
        reflect: true
      },

      /**
       * Sets the field name `auro-form` uses for this input's value, such as `email`
       * (the inner `<input>` element's `name`).
       * @category behavior
       */
      name: {
        type: String,
        reflect: true
      },

      /**
       * Marks the input as placed inside another component, such as the trigger of `auro-dropdown`.
       * Does not currently change how the input looks or behaves; use `simple` to remove the border.
       * @category ui
       */
      nested: {
        type: Boolean,
        reflect: true
      },

      /**
       * Turns off validation when the input loses focus. Validation still runs when code sets the value
       * or when `validateOnInput` is set.
       * @category behavior
       */
      noValidate: {
        type: Boolean,
        attribute: 'novalidate',
        reflect: true
      },

      /**
       * Deprecated: Use `appearance="inverse"` instead.
       * Styles the input for a dark background.
       * @deprecated Use `appearance="inverse"` instead.
       * @category ui
       */
      onDark: {
        type: Boolean,
        attribute: 'ondark',
        reflect: true
      },

      /**
       * Sets a regular expression the whole value must match to be valid, such as `[a-z]{1,15}`
       * (the input's `pattern`). Use `setCustomValidityPatternMismatch` to set the error message.
       * @category behavior
       */
      pattern: {
        type: String,
        reflect: true
      },

      /**
       * Sets hint text shown in the empty field, such as `John Doe`.
       * When not set and `type="date"`, the input shows the date format, such as `MM/DD/YYYY`.
       * @category ui
       */
      placeholder: {
        type: String,
        reflect: true
      },

      /**
       * Stops the user from editing the value, while code can still set it.
       * A read-only input can still get focus, and doesn't show the clear button.
       * @category behavior
       */
      readonly: {
        type: Boolean,
        reflect: true
      },

      /**
       * Makes the input invalid when it's left empty, and removes the " (optional)" text after the label.
       * Use `setCustomValidityValueMissing` to set the error message.
       * @relevantWhen !noValidate
       * @category behavior
       */
      required: {
        type: Boolean,
        reflect: true
      },

      /**
       * Sets one error message for every kind of validation error. When set, it replaces the messages from
       * `error` and every other `setCustomValidity*` property.
       * @relevantWhen !noValidate
       * @category behavior
       */
      setCustomValidity: {
        type: String,
        attribute: 'setcustomvalidity'
      },

      /**
       * Sets the error message for `validity="badInput"`. Does not currently change any message,
       * because the input never reports `badInput`.
       * @relevantWhen !noValidate
       * @category behavior
       */
      setCustomValidityBadInput: {
        type: String,
        attribute: 'setcustomvaliditybadinput'
      },

      /**
       * Sets the error message shown while the `error` attribute is set, in place of the `error` value.
       * @relevantWhen !noValidate
       * @category behavior
       */
      setCustomValidityCustomError: {
        type: String,
        attribute: 'setcustomvaliditycustomerror'
      },

      /**
       * Sets the error message shown when the value doesn't fit its `type`, such as a badly formed email address,
       * an incomplete card number, or an incomplete date. When not set, `email`, `credit-card`, and most `date` inputs use a built-in message.
       * @relevantWhen !noValidate
       * @category behavior
       */
      setCustomValidityForType: {
        type: String,
        attribute: 'setcustomvalidityfortype'
      },

      /**
       * Sets the error message shown when the value doesn't match `pattern`, or when a date isn't a real calendar date.
       * For `pattern`, it does not currently work when set only as a property, so set the attribute instead.
       * @relevantWhen !noValidate
       * @category behavior
       */
      setCustomValidityPatternMismatch: {
        type: String,
        attribute: 'setcustomvaliditypatternmismatch'
      },

      /**
       * Sets the error message shown when the value is above `max`.
       * @relevantWhen !noValidate
       * @category behavior
       */
      setCustomValidityRangeOverflow: {
        type: String,
        attribute: 'setcustomvalidityrangeoverflow'
      },

      /**
       * Sets the error message shown when the value is below `min`.
       * @relevantWhen !noValidate
       * @category behavior
       */
      setCustomValidityRangeUnderflow: {
        type: String,
        attribute: 'setcustomvalidityrangeunderflow'
      },

      /**
       * Sets the error message shown when the value is longer than `maxlength`.
       * Does not currently work when set only as a property, so set the attribute instead.
       * @relevantWhen !noValidate
       * @category behavior
       */
      setCustomValidityTooLong: {
        type: String,
        attribute: 'setcustomvaliditytoolong'
      },

      /**
       * Sets the error message shown when the value is shorter than `minlength`.
       * Does not currently work when set only as a property, so set the attribute instead.
       * @relevantWhen !noValidate
       * @category behavior
       */
      setCustomValidityTooShort: {
        type: String,
        attribute: 'setcustomvaliditytooshort'
      },

      /**
       * Sets the error message shown when a `required` input is left empty.
       * @relevantWhen !noValidate
       * @category behavior
       */
      setCustomValidityValueMissing: {
        type: String,
        attribute: 'setcustomvalidityvaluemissing'
      },

      /**
       * @ignore
       */
      showPassword: {
        state: true,
        attribute: false
      },

      /**
       * Removes the field's border and background, such as for an input placed inside another component.
       * @category ui
       */
      simple: {
        type: Boolean,
        reflect: true
      },

      /**
       * Sets whether the browser checks the value for spelling mistakes (the input's `spellcheck`).
       * Use `false` for codes, names, and other text that isn't made of dictionary words; it also sets `autocorrect` to `off`
       * and `autocapitalize` to `none`. Password inputs always use `false`.
       * @type {'true' | 'false'}
       * @category behavior
       */
      spellcheck: {
        type: String,
        reflect: true
      },

      /**
       * Records whether the user has interacted with the input, such as by moving focus into it.
       * @private
       */
      touched: {
        type: Boolean,
        reflect: true,
        attribute: false
      },

      /**
       * Sets the kind of value the input expects, which controls its formatting, validation, and mobile keyboard.
       * `credit-card`, `tel`, and `date` format the value as the user types, and `password` hides the text and adds a show/hide button.
       * The show/hide button appears only in the `classic` layout.
       * @type {'text' | 'password' | 'email' | 'credit-card' | 'tel' | 'number' | 'date'}
       * @default 'text'
       * @category behavior
       */
      type: {
        type: String,
        reflect: true
      },

      /**
       * Validates the value as the user types, instead of waiting until the input loses focus.
       * Use it with `pattern` when the user needs feedback before leaving the field.
       * @category behavior
       */
      validateOnInput: {
        type: Boolean,
        attribute: 'validateoninput'
      },

      /**
       * Reports the result of the last validation, such as `valid`, `valueMissing`, or `patternMismatch`.
       * Validation sets it, so read it instead of setting it.
       * @category behavior
       */
      validity: {
        type: String,
        reflect: true
      },

      /**
       * Sets or gets the input's current value. For `type="date"` with a full date format, the value is an ISO date,
       * such as `2025-12-31`, whatever format the user sees; partial formats, such as `mm/yy`, use the text shown in the field.
       * @category behavior
       */
      value: {
        type: String
      }
    };
  }

  /**
   * Gets `value` as a `Date` object, or `undefined` when `value` isn't a valid ISO date (`YYYY-MM-DD`).
   * @returns {Date|undefined}
   * @category behavior
   */
  get valueObject() {
    return this.value && dateFormatter.isValidDate(this.value) ? dateFormatter.stringToDateInstance(this.value) : undefined;
  }

  /**
   * Gets `min` as a `Date` object, or `undefined` when `min` isn't a valid ISO date (`YYYY-MM-DD`).
   * @returns {Date|undefined}
   * @category behavior
   */
  get minObject() {
    return this.min && dateFormatter.isValidDate(this.min) ? dateFormatter.stringToDateInstance(this.min) : undefined;
  }

  /**
   * Gets `max` as a `Date` object, or `undefined` when `max` isn't a valid ISO date (`YYYY-MM-DD`).
   * @returns {Date|undefined}
   * @category behavior
   */
  get maxObject() {
    return this.max && dateFormatter.isValidDate(this.max) ? dateFormatter.stringToDateInstance(this.max) : undefined;
  }

  get format() {
    return this._format;
  }

  /*
   * Overrides Lit's generated accessor to record whether the consumer set
   * `format` directly. Locale-derived updates use `_setFormatFromLocale`
   * instead, which skips this flag.
   */
  set format(value) {
    const oldValue = this._format;
    this._format = value ? value.toLowerCase() : value;
    this._userSetFormat = Boolean(value);
    this.requestUpdate('format', oldValue);
  }

  /**
   * Sets `format` without marking it as set by the consumer. Used when `locale` sets the format,
   * so a later `locale` change can still update it.
   * @private
   * @param {string} value - The format to set.
   */
  _setFormatFromLocale(value) {
    const oldValue = this._format;
    this._format = value ? value.toLowerCase() : value;
    this.requestUpdate('format', oldValue);
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

    this.inputId = this.id ? `${this.id}-input` : window.crypto.randomUUID();

    // use validity message override if declared when initializing the component
    if (this.hasAttribute('setCustomValidity')) {
      this.ValidityMessageOverride = this.setCustomValidity;
    }

    this.setCustomHelpTextMessage();
    this.configureAutoFormatting();
    this.configureDataForType();
  }

  /**
   * Patches the inner `<input>` element so it fires an `input` event whenever code sets its value.
   * This reports value changes consistently, even when the user didn't type them.
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
   * Sets `setCustomValidityForType` to the built-in message for the current `type` or date format,
   * unless it's already set.
   * @private
   * @deprecated See https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1557296.
   * @returns {void}
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
    // COVERAGE: this `else if` branch is unreachable in WTR. connectedCallback
    // (L682) calls configureDataForType, which at L1266-1268 assigns
    // `this.format = this.util.getDateMaskFromLocale().toLowerCase()` for any
    // type=date input whose `format` attribute is unset. That runs before
    // firstUpdated invokes setCustomHelpTextMessage, so `!this.format` is
    // always false here. Retained as a defensive fallback; the whole function
    // is @deprecated per AB#1557296 and slated for removal.
    } else if (!this.format && this.type === 'date') {
      this.setCustomValidityForType = i18n(this.lang, 'dateMMDDYYYY');
    } else if (this.dateFormatMap[this.format]) {
      this.setCustomValidityForType = i18n(this.lang, this.dateFormatMap[this.format]);
    }
  }

  /**
   * Called after Lit updates the DOM.
   * @param {Map<string, any>} changedProperties - The changed properties, with each property's name as the key and its previous value as the value.
   * @returns {void}
   */
  // eslint-disable-next-line complexity
  updated(changedProperties) {
    super.updated(changedProperties);

    // When locale changes, auto-derive format unless the consumer explicitly set one.
    if (changedProperties.has('locale') && !changedProperties.has('format') && this.type === 'date') {
      if (!this._userSetFormat) {
        this._setFormatFromLocale(getDateFormatFromLocale(this.locale));
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
        if (this.maskInstance && this.type !== 'date') {
          // Route through the mask so its _value and el.value stay in lock-step
          // (set value calls updateControl which writes el.value = displayValue).
          // Writing el.value directly leaves the mask thinking displayValue is
          // stale; _saveSelection on the next focus/click then warns. Date is
          // excluded because its formattedValue can be raw ISO when the calendar
          // is invalid, and re-masking through mm/dd/yyyy would truncate it and
          // flip validity from patternMismatch to tooShort.
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
   * Fires the `auroInput-validityChange` event.
   * @private
   * @returns {void}
   */
  notifyValidityChange() {
    this.dispatchEvent(new CustomEvent('auroInput-validityChange', {
      bubbles: true,
      cancelable: false,
      composed: true,
    }));
  }

  /**
   * Sets up the IMask input mask for the current `type` and `format`.
   * @private
   * @returns {void}
   */
  configureAutoFormatting() {
    // _configuringMask gates two things: external re-entry into this method
    // while setup is mid-flight (from property changes that call back here),
    // and the accept/complete listeners below — both need to ignore the mask
    // events fired by our own value-restore step.
    if (this._configuringMask) return;
    this._configuringMask = true;
    try {
      // Destroy any prior mask so IMask can attach fresh under the new format.
      // Null the reference too — if the new maskOptions.mask is falsy (e.g.
      // type switched from credit-card to text) the IMask() reassignment
      // below is skipped, and downstream writes at line ~823 would otherwise
      // route through the destroyed instance.
      if (this.maskInstance) {
        this.maskInstance.destroy();
        this.maskInstance = null;
      }

      this.util.updateFormat(this.format);

      const maskOptions = this.util.getMaskOptions(this.type, this.format);

      if (this.inputElement && maskOptions.mask) {
        // Capture the current display so it can be re-applied after IMask
        // attaches. The restore at the bottom goes through maskInstance.value
        // (not inputElement.value directly) so the mask's internal state and
        // the input's displayed text stay in lock-step.
        let existingValue = this.inputElement.value;

        // Format-change case (e.g. locale switch): existingValue is the OLD
        // mask's display string and may not parse under the new mask. When
        // we have a valid date model, rebuild the display from valueObject
        // (the canonical source) using the new mask's format function.
        if (
          this.util.isFullDateFormat(this.type, this.format) &&
          this.value &&
          this.valueObject &&
          typeof maskOptions.format === 'function'
        ) {
          existingValue = maskOptions.format(this.valueObject);
        }

        // Clear before IMask attaches so the constructor seeds an empty
        // internal value. Otherwise IMask reads the stale unmasked string
        // and emits a spurious 'accept' before the restore below runs.
        this.skipNextProgrammaticInputEvent = true;
        this.inputElement.value = '';

        this.maskInstance = IMask(this.inputElement, maskOptions);

        // Mask fires 'accept' on every value change, including the restore
        // step below. Skip events fired during configureAutoFormatting so
        // we don't overwrite a value the parent just pushed.
        this.maskInstance.on('accept', () => {
          if (this._configuringMask) return;
          this.value = this.util.toModelValue(this.maskInstance.value, this.format);
        });

        // Mask fires 'complete' on the restore step below for any value that
        // happens to be a complete match. Same setup-suppression as 'accept'.
        this.maskInstance.on('complete', () => {
          if (this._configuringMask) return;
          this.value = this.util.toModelValue(this.maskInstance.value, this.format);
        });

        // Write existingValue through the mask (not the input directly) so
        // the mask reformats it under the new rules and keeps its internal
        // _value aligned with the input's displayed text.
        if (existingValue) {
          this.maskInstance.value = existingValue;
        }
      }
    } finally {
      this._configuringMask = false;
    }
  }

  /**
   * Fires an `input` event, marked `isProgrammatic`, to report that the value changed.
   * @private
   * @returns {void}
   */
  notifyValueChanged() {
    // This echoes Lit's reactive value update (and handleClickClear's
    // programmatic clear) — it is NOT a fresh user-input event. Mark it
    // `isProgrammatic` so consumers (e.g. auro-combobox) can distinguish
    // it from genuine user typing and skip clobbering their own
    // programmatic state during init-time renders.
    const inputEvent = new Event('input', {
      bubbles: true,
      composed: true,
    });
    inputEvent.isProgrammatic = true;

    this.dispatchEvent(inputEvent);
  }


  /**
   * Called when the user clicks anywhere in the field. Moves focus to the inner `<input>` element.
   * @private
   * @return {void}
   */
  handleClick() {
    this.focus();
  }

  /**
   * Moves focus to the input.
   * @return {void}
   */
  focus() {
    this.inputElement.focus();
  }

  /**
   * Called when the clear button is clicked. Clears the value, resets validation, and moves focus back to the input.
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
   * Called when the inner `<input>` element fires an `input` event. Updates `value` and validates
   * when `validateOnInput` is set or when code changed the value.
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
    // Capture the caret position INSIDE the gate — reading `selectionStart`
    // on input types that don't support text selection (number, email in
    // some browsers) throws InvalidStateError, which would crash all input
    // handling. Wrap the read in try/catch belt-and-suspenders even though
    // the gated types currently support it, since the list is a public
    // property a consumer could mutate.
    if (this.setSelectionInputTypes.includes(this.type)) {
      let selectionStart = null;
      try {
        ({ selectionStart } = this.inputElement);
      } catch {
        return;
      }
      if (typeof selectionStart !== 'number') {
        return;
      }
      this.updateComplete.then(() => {
        try {
          this.inputElement.setSelectionRange(selectionStart, selectionStart);
        } catch {
          // Some input types (number/email in certain UAs) throw on
          // setSelectionRange; swallow and let the native cursor stand.
        }
      });
    }
  }

  /**
   * Called when focus moves into the input. Sets `hasFocus` and `touched`.
   * @private
   * @return {void}
   */
  handleFocusin() {
    this.hasFocus = true;

    this.touched = true;
  }

  /**
   * Called when focus moves out of the input. Clears `hasFocus`.
   * @private
   * @return {void}
   */
  handleFocusout() {
    this.hasFocus = false;
  }

  /**
   * Called when the inner `<input>` element loses focus. Validates the value unless `noValidate` is set.
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
   * Gets the focused element, even when it's inside a shadow root.
   * @private
   * @param {Object} root - The document or shadow root to search.
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
   * Sets the option screen readers announce as active while focus stays in the input.
   * Uses `ariaActiveDescendantElement`, which works across shadow roots.
   * Components that contain `auro-input`, such as `auro-combobox`, call it.
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
   * Checks the value against the input's validation rules and updates `validity` and `errorMessage`.
   * @param {boolean} [force=false] - If true, validates even while the input has focus or before the user has interacted with it. If false, validates only when `validateOnInput` is set, or when the input doesn't have focus and has been interacted with or has a value.
   */
  validate(force = false) {
    this.validation.validate(this, force);
  }

  /**
   * Resets the input to its initial state: clears the value, the touched state, and `validity`.
   * @returns {void}
   */
  reset() {
    this.value = undefined;
    this.validation.reset(this);
  }

  /**
   * Clears the value. Unlike `reset()`, it doesn't clear the touched state, so a `required` input the user has already interacted with can show its error.
   */
  clear() {
    this.value = undefined;
  }

  /**
   * Sets the length, keyboard, and default date format for the current `type`.
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
      this._setFormatFromLocale(this.util.getDateMaskFromLocale().toLowerCase());
      this.util.updateFormat(this.format);
    }
  }

  /**
   * Gets the placeholder text to show: `placeholder`, or the uppercase date format when `type="date"` and no placeholder is set.
   * @private
   * @returns {string}
   */
  get placeholderStr() {
    if (!this.placeholder && this.type === 'date') {
      return this.format.toUpperCase();
    }
    return this.placeholder || "";
  }

  // Functions specific to Credit Card component support
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  /**
   * Applies the format, length, error message, and icon for the card brand detected from the value.
   * @private
   * @returns {void}
   */
  processCreditCard() {
    const creditCard = this.matchInputValueToCreditCard();
    const previousFormat = this.format;

    this._setFormatFromLocale(creditCard.maskFormat);

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
   * Gets the card brand settings that match the start of the value, such as the mask and icon for Visa.
   * @private
   * @deprecated See https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1557296.
   * @returns {object} The matching card brand's format, length, error message, and icon settings.
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
        // JCB is variable length (16-19 digits), like UnionPay, so it reuses the
        // formatMinLength/formatLength range machinery. The 35 prefix overlaps no
        // other brand (Amex is 34|37, Diners is 30[0-5]|36|38).
        name: 'JCB',
        regex: /^(?<num>35)\d{0}/u,
        formatMinLength: 19,
        formatLength: 23,
        errorMessage: CreditCardValidationMessage,
        cardIcon: 'cc-jcb',
        maskFormat: "0000 0000 0000 0000 000"
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
      },
      {
        // China UnionPay is variable length (16-19 digits). It must come after
        // Discover so the last-match-wins loop below gives its 62 prefix
        // precedence over the generic `6` that resolves to Discover. 81 is used
        // by UnionPay cards issued outside mainland China and overlaps no other
        // brand. 60 is intentionally excluded (it overlaps real Discover 6011).
        name: 'China UnionPay',
        regex: /^(?<num>62|81)\d{0}/u,
        formatMinLength: 19,
        formatLength: 23,
        errorMessage: CreditCardValidationMessage,
        cardIcon: 'cc-unionpay',
        maskFormat: "0000 0000 0000 0000 000"
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

    // Variable-length brands (both min and max defined, e.g. UnionPay) validate
    // against the minimum masked length so shorter-but-valid entries are not
    // flagged tooShort. Fixed-length brands keep their single formatLength.
    this.validationCCLength = type.formatMinLength && type.formatLength
      ? type.formatMinLength
      : type.formatLength;

    return type;
  }
}

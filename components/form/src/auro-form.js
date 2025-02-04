/* eslint-disable no-underscore-dangle,max-lines */

// Copyright (c) 2024 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

// If using litElement base class
import { LitElement, html } from "lit";

import styleCss from "./styles/style-css.js";

import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';

/**
 * @typedef {Object} FormStateMember - The form state member.
 * @property {string | number | boolean | string[] | null} value - The value of the form element.
 * @property {ValidityState} validity - The validity state of the form element, stored when fired from the form element.
 * @property {boolean} required - Whether the form element is required or not.
 * @property {HTMLElement} element - Whether the form element is required or not.
 */

/**
 * @typedef {Object.<string, FormStateMember>} FormState - The form state.
 */


// See https://git.io/JJ6SJ for "How to document your components using JSDoc"
/**
 * The auro-form element provides users a way to ... (it would be great if you fill this out).
 *
 * @attr {Boolean} fixed - Uses fixed pixel values for element shape
 * @attr {String} cssClass - Applies designated CSS class to demo element - you want to delete me!
 */

// build the component class
export class AuroForm extends LitElement {
  static get properties() {
    return {
      formState: { attribute: false },
      _validity: { attribute: false },
      _isInitialState: { attribute: false },
      _elements: { attribute: false },
      _submitElements: { attribute: false },
      _resetElements: { attribute: false },
    };
  }

  constructor() {
    super();

    /** @type {FormState} */
    this.formState = {};

    /** @type {"valid" | "invalid" | null} */
    this._validity = null;
    this._isInitialState = true;

    /** @type {(HTMLElement & {reset: () => void})[]} */
    this._elements = [];

    /** @type {HTMLButtonElement[]} */
    this._submitelements = [];

    /** @type {HTMLButtonElement[]} */
    this._resetElements = [];

    // Bind listeners
    this.reset = this.reset.bind(this);
    this.submit = this.submit.bind(this);
    this.sharedInputListener = this.sharedInputListener.bind(this);
    this.sharedValidationListener = this.sharedValidationListener.bind(this);
  }

  // Note: button is NOT considered a form element in this context
  // as it does not have a .value property.
  static get formElementTags() {
    return [
      'auro-input',
      'auro-select',
      'auro-datepicker',
      'auro-combobox',
      // checkbox and radio are grouped elements
      'auro-checkbox-group',
      'auro-radio-group',
      // while counter is groupable, the group is for min/max values and not for grouped values
      'auro-counter-group'
    ];
  }

  /**
   * Compare tag name with element to identify it (for API purposes).
   * @param {string} elementTag - The HTML tag name like `auro-datepicker`.
   * @param {HTMLElement} element - The actual HTML element to compare.
   * @returns {boolean}
   * @private
   */
  _isElementTag(elementTag, element) {
    return element.tagName.toLowerCase() === elementTag || element.hasAttribute(elementTag.toLowerCase());
  }

  /**
   * Shared code for determining if an element is something we care about (submit, form element, etc.).
   * @param {string[]} collection - The array to use for tag name search.
   * @param {HTMLElement} element - The element to compare against the master list.
   * @returns {boolean}
   * @private
   */
  _isInElementCollection(collection, element) {
    return collection.some((elementTag) => this._isElementTag(elementTag, element));
  }

  /**
   * Check if the tag name is a form element.
   * @param {HTMLElement} element - The element to check (attr or tag name).
   * @returns {boolean}
   */
  isFormElement(element) {
    return this._isInElementCollection(AuroForm.formElementTags, element);
  }

  /**
   * Validates if an event is from a valid form element with a name.
   * @param {Event} event - The event to validate.
   * @returns {boolean} - True if event is valid for processing.
   * @private
   */
  _eventIsValidFormEvent(event) {
    const targetName = event.target.getAttribute("name");
    return this.isFormElement(event.target) && targetName;
  }


  static get buttonElementTags() {
    return [
      'button',
      'auro-button',
    ];
  }

  /**
   * Check if the tag name is a button element.
   * @param {HTMLElement} element - The element to check.
   * @returns {boolean}
   */
  isButtonElement(element) {
    return this._isInElementCollection(AuroForm.buttonElementTags, element);
  }

  static get styles() {
    return [styleCss];
  }

  /**
   * Reduce the form value into a key-value pair.
   *
   * NOTE: form keys use `name` first, and `id` second if `name` is not available.
   * This follows standard HTML5 form behavior - submission uses `name` by default when creating
   * the FormData object.
   *
   * @returns {Record<string, string | number | boolean | string[] | null>} The form value.
   */
  get value() {
    return Object.keys(this.formState).reduce((acc, key) => {
      acc[key] = this.formState[key].value;
      return acc;
    }, {});
  }

  /**
   * Getter for internal _submitElements.
   * @returns {HTMLButtonElement[]}
   */
  get submitElements() {
    return this._submitelements;
  }

  /**
   * Getter for internal _resetElements.
   * @returns {HTMLButtonElement[]}
   */
  get resetElements() {
    return this._resetElements;
  }

  /**
   * Infer validity status based on current formState.
   * @private
   */
  _calculateValidity() {
    if (this.isInitialState) {
      this._validity = null;
    } else {
      // go through validity states and return the first invalid state (if any)
      const invalidKey = Object.keys(this.formState).
        find((key) => {
          const formKey = this.formState[key];
          // these are NOT extra parens
          // eslint-disable-next-line no-extra-parens
          return (formKey.validity !== 'valid' && formKey.required) || (formKey.validity !== 'valid' && formKey.value !== null);
        });
      this._validity = invalidKey ? 'invalid' : 'valid';
    }
  }

  /**
   * Current validity state of the form, based on form element events.
   * @returns {"valid" | "invalid"}
   */
  get validity() {
    // Force calculate, as sometimes validity won't reflect
    // the latest value while in-between renders.
    this._calculateValidity();
    return this._validity;
  }

  _setInitialState() {
    const anyTainted = Object.keys(this.formState).some((key) => this.formState[key].validity !== null || this.formState[key].value !== null);

    this._isInitialState = !anyTainted;

    this._resetElements.forEach((resetElement) => {
      if (resetElement.hasAttribute("disabled")) {
        resetElement.removeAttribute("disabled");
      }
    });
  }

  /**
   * Mostly internal way to determine if a form is in the initial state.
   * @returns {boolean}
   */
  get isInitialState() {
    return this._isInitialState;
  }

  setDisabledStateOnButtons() {
    this._resetElements.forEach((element) => {
      if (this.isInitialState) {
        element.setAttribute("disabled", "");
      } else {
        element.removeAttribute("disabled");
      }
    });

    this._submitelements.forEach((element) => {
      if (this.isInitialState || this.validity !== "valid") {
        element.setAttribute("disabled", "");
      } else {
        element.removeAttribute("disabled");
      }
    });
  }

  /**
   * Construct the query strings from elements, append them together, execute, and return the NodeList.
   * @returns {NodeList}
   */
  queryAuroElements() {
    const queries = [
      [
        AuroForm.formElementTags,
        '[name]'
      ],
      [
        AuroForm.buttonElementTags,
        '[type=submit]'
      ],
      [
        AuroForm.buttonElementTags,
        '[type=reset]'
      ]
    ];

    return this.querySelectorAll(queries.flatMap(([
      tags,
      extraAttributes
    ]) => tags.map((tag) => `${tag}${extraAttributes}, [${tag}]${extraAttributes}`)).join(', '));
  }

  /**
   * Store an element in state and on the _elements array.
   * @param {HTMLElement} element - The element to add to our state.
   * @private
   */
  _addElementToState(element) {
    const targetName = element.getAttribute('name');
    if (this.formState[targetName]) {
      return;
    }

    this.formState[targetName] = {
      value: element.value || element.getAttribute('value'),
      validity: element.validity || null,
      required: element.hasAttribute('required'),
      // element
    };

    this._elements.push(element);
  }

  /**
   * Initialize (or reinitialize) the form state.
   */
  initializeState() {
    this.formState = {};
    this._submitelements = [];
    this._resetElements = [];
    this._elements = [];

    this.queryAuroElements().forEach((element) => {
      if (this.isFormElement(element)) {
        this._addElementToState(element);
      }

      if (this.isButtonElement(element) && element.getAttribute('type') === 'submit') {
        element.removeEventListener('click', this.submit);
        element.addEventListener('click', this.submit);

        // Keep record of this element, so we can enable/disable as needed
        this._submitelements.push(element);
      }

      if (this.isButtonElement(element) && element.getAttribute('type') === 'reset') {
        // Keep record of this element, so we can enable/disable as needed
        element.removeEventListener('click', this.reset);
        element.addEventListener('click', this.reset);

        this._resetElements.push(element);
      }
    });

    // Set enabled/disabled states on buttons
    this.setDisabledStateOnButtons();
  }

  /**
   * Reset fires an event called `reset` - just as you would expect from a normal form.
   */
  reset() {
    const previousValue = this.value;
    this._elements.forEach((element) => element.reset());

    this.updateComplete.then(() => {
      this.initializeState();
      // Initial state must come first - validity can only be null if initial state is true
      this._setInitialState();
      this._calculateValidity();

      // Wait for the above changes to run through, then disable submit/reset
      this.updateComplete.then(() => {
        this.setDisabledStateOnButtons();

        this.dispatchEvent(new CustomEvent('reset', {
          bubbles: true,
          composed: true,
          detail: {
            previousValue
          }
        }));
      });
    });
  }

  /**
   * Submit fires an event called `submit` - just as you would expect from a normal form.
   */
  submit() {
    // Steps required to get out of beta:
    // 1. Submit triggers a forced validation on ALL elements
    // 2. Wait for validation to complete (this.updateComplete.then or similar)
    // 3. If still valid, go ahead with submit.
    this._elements.forEach((element) => {
      if (element.tagName.toLowerCase() !== "auro-datepicker") {
        // Next line currently does NOT force
        element.validate();
      }
    });

    this.dispatchEvent(new CustomEvent('submit', {
      bubbles: true,
      composed: true,
      detail: {
        value: this.value
      }
    }));
  }

  /**
   * This will register this element with the browser.
   * @param {string} [name="auro-form"] - The name of element that you want to register to.
   *
   * @example
   * AuroForm.register("custom-form") // this will register this element to <custom-form/>
   *
   */
  static register(name = "auro-form") {
    AuroLibraryRuntimeUtils.prototype.registerComponent(name, AuroForm);
  }

  /**
   * Shared input listener for all form elements.
   * @param {Event} event - The event that is fired from the form element.
   */
  sharedInputListener(event) {
    const targetName = event.target.getAttribute("name");

    // This should only happen if some bubble-up event is fired from inside a form element.
    if (!this._eventIsValidFormEvent(event)) {
      return;
    }

    // Occasionally, a form element will emit their event before the form can read data about the form element.
    if (!this.formState[targetName] && this.isFormElement(event.target)) {
      this._addElementToState(event.target);
    }

    // Check special input types and handle their edge cases
    if (this._isElementTag('auro-datepicker', event.target) && event.target.hasAttribute('range')) {
      this.formState[targetName].value = event.target.values;
      this.requestUpdate('formState');
    } else {
      this.formState[targetName].value = event.target.value;
      this.requestUpdate('formState');
    }
  }

  /**
   * Shared validation listener for all form elements.
   * @param {Event} event - The event that is fired from the form element.
   */
  sharedValidationListener(event) {
    const targetName = event.target.getAttribute("name");
    if (!this._eventIsValidFormEvent(event)) {
      return;
    }

    if (!this.formState[targetName]) {
      this._addElementToState(event.target);
    }

    this.formState[targetName].validity = event.detail.validity;
    this._calculateValidity();
  }

  _attachEventListeners() {
    this.queryAuroElements().forEach((element) => {
      // remove any existing event listeners (in case of re-initialization)
      element.removeEventListener('input', this.sharedInputListener);
      element.removeEventListener('auroFormElement-validated', this.sharedValidationListener);

      // add new event listeners
      element.addEventListener('input', this.sharedInputListener);
      element.addEventListener('auroFormElement-validated', this.sharedValidationListener);
    });
  }

  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);

    this._attachEventListeners();
  }

  updated(_changedProperties) {
    super.updated(_changedProperties);

    if (_changedProperties.has("formState")) {
      this._setInitialState();

      // Automatically infer disabled state now
      this.setDisabledStateOnButtons();
    }

    if (_changedProperties.has("_validity")) {
      this._setInitialState();
    }
  }

  onSlotChange() {
    this.initializeState();
    // Safe to call as we remove and re-add event listeners
    this._attachEventListeners();
  }

  // function that renders the HTML and CSS into the scope of the component
  render() {
    return html`
        <form>
          <slot @slotchange="${this.onSlotChange}"></slot>
        </form>
    `;
  }
}

/* eslint-disable no-underscore-dangle, max-lines, object-property-newline */

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

/**
 * The `auro-form` element provides users a way to create and manage forms in a consistent manner.
 * @customElement auro-form
 *
 * @slot default - The default slot for form elements.
 *
 * @event change - Fires when form state changes.
 * @event reset - Fires when the form is reset. The event detail contains the previous value of the form before reset.
 * @event submit - Fires when the form is submitted. The event detail contains the current value of the form.
 */
export class AuroForm extends LitElement {
  static get properties() {
    return {

      /** @private */
      formState: { type: Object, attribute: false },

      /** @private */
      _validity: { type: Object, attribute: false },

      /** @private */
      _isInitialState: { type: Boolean, attribute: false },

      /** @private */
      _elements: { type: Array, attribute: false },

      /** @private */
      _submitElements: { type: Array, attribute: false },

      /** @private */
      _resetElements: { type: Array, attribute: false },
    };
  }

  constructor() {
    super();

    /**
     * @type {FormState}
     * @private
     */
    this.formState = {};

    /**
     * @type {"valid" | "invalid" | null}
     * @private
     */
    this._validity = null;

    /** @private */
    this._isInitialState = true;

    /**
     * @type {(HTMLElement & {reset: () => void})[]}
     * @private
     */
    this._elements = [];

    /**
     * @type {HTMLButtonElement[]}
     * @private
     */
    this._submitelements = [];

    /**
     * @type {HTMLButtonElement[]}
     * @private
     */
    this._resetElements = [];

    /**
     * @private
     * @type {MutationObserver[]}
     */
    this.mutationObservers = [];

    // Bind listeners
    /** @private */
    this.reset = this.reset.bind(this);

    /** @private */
    this.submit = this.submit.bind(this);

    /** @private */
    this.sharedInputListener = this.sharedInputListener.bind(this);

    /** @private */
    this.sharedValidationListener = this.sharedValidationListener.bind(this);

    /** @private */
    this.mutationEventListener = this.mutationEventListener.bind(this);

    /** @private */
    this.handleKeyDown = this.handleKeyDown.bind(this);
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
   * @private
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
   * @private
   */
  isButtonElement(element) {
    return this._isInElementCollection(AuroForm.buttonElementTags, element);
  }

  static get styles() {
    return [styleCss];
  }

  /**
   * Returns the current values of all named form elements as a key-value object, keyed by each element's `name` attribute.
   * @returns {Record<string, string | number | boolean | string[] | null>} The current form values.
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
   * @private
   */
  get submitElements() {
    return this._submitelements;
  }

  /**
   * Returns a collection of elements that will reset the form.
   * @returns {HTMLButtonElement[]}
   * @private
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
   * Returns `'valid'` if all required and interacted-with form elements are valid, `'invalid'` if any are not, or `null` if the form has not been interacted with yet.
   * @returns {"valid" | "invalid" | null}
   */
  get validity() {
    // Force calculate, as sometimes validity won't reflect
    // the latest value while in-between renders.
    this._calculateValidity();
    return this._validity;
  }

  /**
   * Determines whether the form is in its initial (untouched) state and updates `_isInitialState` accordingly.
   * @returns {void}
   * @private
   */
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
   * Returns `true` if no form element has been interacted with or had its value changed since the form was initialized or last reset.
   * @returns {boolean}
   */
  get isInitialState() {
    return this._isInitialState;
  }

  /**
   * Enables or disables submit and reset buttons based on the current form state and validity.
   * @returns {void}
   * @private
   */
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
   * @private
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
   * @returns {void}
   * @private
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

    this.dispatchEvent(new Event('change', {
      bubbles: true,
      composed: true,
      cancelable: true
    }));

    // Set enabled/disabled states on buttons
    this.setDisabledStateOnButtons();
  }

  /**
   * Resets all form elements to their initial state and fires a `reset` event. The event's `detail.previousValue` contains the form values captured immediately before the reset.
   * @returns {void}
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
   * Validates all form elements. If all are valid, fires a `submit` event with `detail.value` containing the current form values. If any element is invalid, its error state is surfaced and the `submit` event is not fired.
   * @returns {Promise<void>}
   */
  async submit() {
    // Force validation on ALL elements
    this._elements.forEach((element) => {
      element.validate(true);
    });

    // Wait for validation to complete and formState to update
    await this.updateComplete;

    // Only dispatch submit event if form is valid
    if (this.validity === 'valid') {
      this.dispatchEvent(new CustomEvent('submit', {
        bubbles: true,
        composed: true,
        detail: {
          value: this.value
        }
      }));
    }
  }

  /**
   * Registers the `auro-form` custom element with the browser under a given tag name.
   * @param {string} [name="auro-form"] - The custom element tag name to register.
   *
   * @example
   * AuroForm.register("custom-form") // registers as <custom-form>
   */
  static register(name = "auro-form") {
    AuroLibraryRuntimeUtils.prototype.registerComponent(name, AuroForm);
  }

  /**
   * Shared input listener for all form elements.
   * @param {Event} event - The event that is fired from the form element.
   * @private
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
    } else {
      this.formState[targetName].value = event.target.value;
    }

    this.requestUpdate('formState');
    this.dispatchEvent(new CustomEvent('change', {
      bubbles: true,
      composed: true,
      cancelable: true
    }));
  }

  /**
   * Shared validation listener for all form elements.
   * @param {Event} event - The event that is fired from the form element.
   * @private
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
    this.requestUpdate('formState');
  }

  /**
   * Handle Enter key press on form elements.
   * @param {KeyboardEvent} event - The keyboard event.
   * @private
   */
  handleKeyDown(event) {
    if (event.key === 'Enter' && this.isFormElement(event.target)) {
      // Don't submit if it's a textarea (allow new lines)
      if (event.target.tagName.toLowerCase() === 'textarea' ||
          event.target.hasAttribute('textarea')) {
        return;
      }

      event.preventDefault();
      this.submit();
    }
  }

  /**
   * Attaches input, validation, and keydown listeners to all tracked form and button elements.
   * Removes existing listeners first to avoid duplicates on re-initialization.
   * @returns {void}
   * @private
   */
  _attachEventListeners() {
    this.queryAuroElements().forEach((element) => {
      // remove any existing event listeners (in case of re-initialization)
      element.removeEventListener('input', this.sharedInputListener);
      element.removeEventListener('auroFormElement-validated', this.sharedValidationListener);
      element.removeEventListener('keydown', this.handleKeyDown);

      // add new event listeners
      element.addEventListener('input', this.sharedInputListener);
      element.addEventListener('auroFormElement-validated', this.sharedValidationListener);
      element.addEventListener('keydown', this.handleKeyDown);
    });
  }

  /**
   * @param {import('lit').PropertyValues} _changedProperties - Map of changed properties with their previous values.
   * @returns {void}
   */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);

    this._attachEventListeners();
  }

  /**
   * @param {import('lit').PropertyValues} _changedProperties - Map of changed properties with their previous values.
   * @returns {void}
   */
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

  /**
   * Mutation observer for form elements. Slot change does not trigger unless
   * root-level elements are added/removed. This is a workaround to ensure
   * nested form elements are also observed.
   *
   * @returns {void}
   * @private
   */
  mutationEventListener() {
    this.initializeState();
    this._attachEventListeners();
  }

  /**
   * Slot change event listener. This is the main entry point for the form element.
   * @param {Event} event - The slot change event.
   * @returns {void}
   * @private
   */
  onSlotChange(event) {
    this.initializeState();
    // Safe to call as we remove and re-add event listeners
    this._attachEventListeners();

    // Get rid of old observers - we'll create new ones in a moment
    this.mutationObservers.forEach((mo) => mo.disconnect());
    this.mutationObservers = [];

    const slotNodes = event.currentTarget.assignedNodes();
    slotNodes.forEach((node) => {
      if (node.tagName && !this.isFormElement(node)) {
        const mo = new MutationObserver(this.mutationEventListener);
        mo.observe(node, {
          subtree: true,
          childList: true
        });
        this.mutationObservers.push(mo);
      }
    });
  }

  /**
   * @returns {import('lit').TemplateResult}
   */
  render() {
    return html`
        <form>
          <slot @slotchange="${this.onSlotChange}"></slot>
        </form>
    `;
  }
}

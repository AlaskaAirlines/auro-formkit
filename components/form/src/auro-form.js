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
  }

  // Note: button is NOT considered a form element in this context
  // as it does not have a .value property.
  static get formElementTags() {
    return [
      'auro-input',
      'auro-select',
      'auro-datepicker',
      'auro-checkbox-group',
    ];
  }

  /**
   * Shared code for determining if an element is something we care about (submit, form element, etc.).
   * @param {string[]} collection - The array to use for tag name search.
   * @param {HTMLElement} element - The element to compare against the master list.
   * @returns boolean
   * @private
   */
  _isInElementCollection(collection, element) {
    return collection.some((elementTag) => element.tagName.toLowerCase() === elementTag || element.hasAttribute(elementTag.toLowerCase()));
  }

  /**
   * Check if the tag name is a form element.
   * @param {HTMLElement} element - The element to check (attr or tag name).
   * @returns {boolean}
   */
  isFormElement(element) {
    return this._isInElementCollection(AuroForm.formElementTags, element);
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
  }

  getSubmitFunction() {
    // We return an arrow function here to ensure that the `this` context points at this same AuroForm context.
    // Otherwise, submission tries to read `this.value` on the button element.
    return (event) => {
      event.preventDefault();

      this.dispatchEvent(new CustomEvent('submit', {
        detail: {
          value: this.value
        }
      }));
    };
  }

  /**
   * Construct the query strings from elements, append them together, execute, and return the NodeList.
   * @returns {NodeList}
   */
  queryAuroElements() {
    const formElementQuery = AuroForm.formElementTags.map((tag) => `${tag}[name]`).join(',');
    const submitterQuery = AuroForm.buttonElementTags.map((tag) => `${tag}[type=submit]`).join(',');
    const resetButtonQuery = AuroForm.buttonElementTags.map((tag) => `${tag}[type=reset]`).join(',');

    // Alternatively, for renamed components...
    const renamedFormElementQuery = AuroForm.formElementTags.map((tag) => `[${tag}][name]`).join(',');
    const renamedSubmitterQuery = AuroForm.formElementTags.map((tag) => `[${tag}][type=submit]`).join(',');
    const renamedResetButtonQuery = AuroForm.buttonElementTags.map((tag) => `[${tag}][type=reset]`).join(',');

    const unifiedElementQuery = `${formElementQuery},${submitterQuery},${renamedFormElementQuery},${renamedSubmitterQuery},${resetButtonQuery},${renamedResetButtonQuery}`;

    return this.querySelectorAll(unifiedElementQuery);
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
        this.formState[element.getAttribute('name')] = {
          value: element.getAttribute('value'),
          validity: element.getAttribute('validity'),
          required: element.hasAttribute('required'),
          // element
        };

        this._elements.push(element);
      }

      if (this.isButtonElement(element) && element.getAttribute('type') === 'submit') {
        element.removeEventListener('click', this.getSubmitFunction());
        element.addEventListener('click', this.getSubmitFunction());

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

  reset() {
    this._elements.forEach((element) => element.reset());

    this.updateComplete.then(() => {
      this.initializeState();
      // Initial state must come first - validity can only be null if initial state is true
      this._setInitialState();
      this._calculateValidity();

      // Wait for the above changes to run through, then disable submit/reset
      this.updateComplete.then(() => {
        this.setDisabledStateOnButtons();
      });
    });
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

  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);

    const slot = this.shadowRoot.querySelector('slot');

    // Update the form state when a form element is detected
    slot.addEventListener('input', (event) => {
      const targetName = event.target.getAttribute("name");
      if (!this.isFormElement(event.target) || !targetName) {
        return;
      }

      this.formState[targetName].value = event.target.value;
      this.requestUpdate('formState');
    });

    slot.addEventListener('auroFormElement-validated', (event) => {
      const targetName = event.target.getAttribute("name");
      if (!this.isFormElement(event.target) || !targetName) {
        return;
      }

      this.formState[targetName].validity = event.detail.validity;
      this._calculateValidity();
    });
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

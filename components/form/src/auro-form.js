/* eslint-disable no-underscore-dangle */

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
      _formState: { attribute: false },
    };
  }

  constructor() {
    super();

    /** @type {FormState} */
    this._formState = {};
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

  static get submitElementTags() {
    return [
      'button',
      'auro-button',
    ];
  }

  /**
   * Check if the tag name is a submit element.
   * @param {HTMLElement} element - The element to check.
   * @returns {boolean}
   */
  isSubmitElement(element) {
    return this._isInElementCollection(AuroForm.submitElementTags, element);
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
    return Object.keys(this._formState).reduce((acc, key) => {
      acc[key] = this._formState[key].value;
      return acc;
    }, {});
  }

  get validity() {
    // go through validity states and return the first invalid state (if any)
    const invalidKey = Object.keys(this._formState).
      find((key) => {
        const formKey = this._formState[key];

        // these are NOT extra :(
        // eslint-disable-next-line no-extra-parens
        return (formKey.validity !== 'valid' && formKey.required) || (formKey.validity !== 'valid' && formKey.value !== null);
      });

    return invalidKey ? 'invalid' : 'valid';
  }

  // Below is not implemented yet
  get isInitialState() {
    const anyTainted = Object.keys(this._formState).some((key) => this._formState[key].validity !== null);

    return !anyTainted;
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
    const submitterQuery = AuroForm.submitElementTags.map((tag) => `${tag}[type=submit]`).join(',');

    // Alternatively, for renamed components...
    const renamedFormElementQuery = AuroForm.formElementTags.map((tag) => `[${tag}][name]`).join(',');
    const renamedSubmitterQuery = AuroForm.formElementTags.map((tag) => `[${tag}][type=submit]`).join(',');

    const unifiedElementQuery = `${formElementQuery},${submitterQuery},${renamedFormElementQuery},${renamedSubmitterQuery}`;

    return this.querySelectorAll(unifiedElementQuery);
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

      /** @type {HTMLInputElement} */
      const eventTarget = event.target;
      if (this.isFormElement(eventTarget)) {
        this._formState[eventTarget.getAttribute("name")].value = eventTarget.value;
      }
    });

    slot.addEventListener('auroFormElement-validated', (event) => {
      const oldValue = this._formState;

      this._formState[event.target.getAttribute("name")].validity = event.detail.validity;
      this.requestUpdate('formState', oldValue);
    });
  }

  onSlotChange() {
    this._formState = {};

    this.queryAuroElements().forEach((element) => {
      if (this.isFormElement(element)) {
        this._formState[element.getAttribute('name')] = {
          value: element.getAttribute('value'),
          validity: element.getAttribute('validity'),
          required: element.hasAttribute('required'),
          element
        };
      }

      if (this.isSubmitElement(element) && element.getAttribute('type') === 'submit') {
        element.removeEventListener('click', this.getSubmitFunction());
        element.addEventListener('click', this.getSubmitFunction());
      }
    });
  }

  // function that renders the HTML and CSS into the scope of the component
  render() {
    return html`
        <form>
          <p>Value: ${JSON.stringify(this.value)}</p>
          <p>Validity: ${this.validity}</p>
          <h3>Auro form example</h3>
          <slot @slotchange="${this.onSlotChange}"></slot>
        </form>
    `;
  }
}

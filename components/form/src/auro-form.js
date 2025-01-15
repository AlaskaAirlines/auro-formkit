/* eslint-disable no-underscore-dangle */

// Copyright (c) 2024 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

// If using litElement base class
import { LitElement, html } from "lit";

// If using auroElement base class
// See instructions for importing auroElement base class https://git.io/JULq4
// import { LitElement, html } from "lit";
// import AuroElement from '@aurodesignsystem/webcorestylesheets/dist/auroElement/auroElement';

// Import touch detection lib
import styleCss from "./styles/style-css.js";

import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';

/**
 * @typedef {Object} FormStateMember - The form state member.
 * @property {string | number | boolean | string[] | null} value - The value of the form element.
 * @property {ValidityState} validity - The validity state of the form element, stored when fired from the form element.
 * @property {boolean} required - Whether the form element is required or not.
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
   * Check if the tag name is a form element.
   * @param {string} tagName - The tag name to check.
   * @returns {boolean}
   */
  isFormElement(tagName) {
    return AuroForm.formElementTags.includes(tagName.toLowerCase());
  }

  static get submitElementTags() {
    return [
      'button',
      'auro-button',
    ];
  }

  /**
   * Check if the tag name is a submit element.
   * @param {string} tagName - The tag name to check.
   * @returns {boolean}
   */
  isSubmitElement(tagName) {
    return AuroForm.submitElementTags.includes(tagName.toLowerCase());
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
        return formKey.validity !== null && formKey.validity !== 'valid' && formKey.required;
      });

    return invalidKey ? 'invalid' : 'valid';
  }

  // Below is not implemented yet
  // get isInitialState() {
  //   // return true if all keys are null
  //   return true;
  // }

  getSubmitFunction() {
    // We return an arrow function here to ensure that the `this` context points at this same AuroForm context.
    // Otherwise, submission tries to read `this.value` on the button element.
    return (event) => {
      event.preventDefault();

      // eslint-disable-next-line no-console,no-magic-numbers
      // console.log(`Form internal state (not for public use) -> ${JSON.stringify(this._formState, null, 4)}`);

      // eslint-disable-next-line no-console,no-magic-numbers
      console.log(`Form submitted -> ${JSON.stringify(this.value, null, 4)}`);
    };
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
      if (AuroForm.formElementTags.includes(eventTarget.tagName.toLowerCase())) {
        if (!this._formState[eventTarget.getAttribute("name")]) {
          this._formState[eventTarget.getAttribute("name")] = {
            value: eventTarget.value,
            validity: eventTarget.getAttribute("validity"),
            required: eventTarget.hasAttribute('required'),
          };
        }

        this._formState[eventTarget.getAttribute("name")].value = eventTarget.value;
      }
    });

    slot.addEventListener('auroFormElement-validated', (event) => {
      const oldValue = this._formState;

      // eslint-disable-next-line no-console
      console.log(`${event.target.getAttribute("name")} -> ${event.detail.validity}`);
      this._formState[event.target.getAttribute("name")].validity = event.detail.validity;
      this.requestUpdate('formState', oldValue);
    });
  }

  onSlotChange(event) {
    const slot = event.target;
    const elements = slot.assignedElements();

    // Clear current form state - maybe we should call a reset function instead?
    this._formState = {};

    const tryAddToElements = (element) => {
      // Form elements get added to the form state
      if (this.isFormElement(element.tagName)) {
        this._formState[element.getAttribute('name')] = {
          value: element.getAttribute('value'),
          validity: element.getAttribute('validity'),
          required: element.hasAttribute('required'),
        };
      } else if (this.isSubmitElement(element.tagName) && element.getAttribute('type') === 'submit') {
        element.removeEventListener('click', this.getSubmitFunction());
        element.addEventListener('click', this.getSubmitFunction());
      } else {
        throw new Error(`Element ${element.tagName} is not a form element or a submit element`);
      }
    };

    elements.forEach((element) => {
      try {
        tryAddToElements(element);
      } catch (error) {
        if (error instanceof Error && error.message.includes('not a form element')) {
          // Not a form element, so we need to check if it has form elements inside (note: not shadow DOM)
          const query = AuroForm.formElementTags.concat(AuroForm.submitElementTags.map((tag) => `${tag}[type=submit]`)).join(',');
          element.querySelectorAll(query).forEach((formElement) => {
            try {
              tryAddToElements(formElement);
              // eslint-disable-next-line no-unused-vars
            } catch (_error) {
              // Do nothing - we don't care about this error
            }
          });
        }
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

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
  constructor() {
    super();

    /** @type {FormState} */
    this.formState = {};

    /** @type {HTMLInputElement[]} */
    this.formElements = [];
  }

  // Note: button is NOT considered a form element in this context
  // as it does not have a .value property.
  static get formElementTags() {
    return [
      'auro-input',
      'auro-select',
      'button',
    ];
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

  getSubmitFunction() {
    // We return an arrow function here to ensure that the `this` context points at this same AuroForm context.
    // Otherwise, submission tries to read `this.value` on the button element.
    return (event) => {
      event.preventDefault();

      // eslint-disable-next-line no-console
      console.log(`Form submitted -> ${JSON.stringify(this.value)}`);
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
        this.formState[eventTarget.name].value = eventTarget.value;
      }
    });
  }

  onSlotChange(event) {
    const slot = event.target;
    const elements = slot.assignedElements();

    const formElements = [];
    elements.forEach((element) => {
      // If one of the root elements is a form element, just push it to the formElements array
      if (AuroForm.formElementTags.includes(element.tagName.toLowerCase())) {
        formElements.push(element);
      } else {
        // If this root element is not a form element, query for form elements within it (note: NOT shadowRoot)
        element.querySelectorAll(AuroForm.formElementTags.join(',')).forEach((formElement) => {
          formElements.push(formElement);
        });
      }
    });

    for (const element of formElements) {
      if (element.tagName.toLowerCase() !== 'button') {
        this.formState[element.getAttribute('name')] = {
          value: element.getAttribute('value'),
          // THIS IS PROBABLY NOT DONE CORRECTLY :)
          validity: element.getAttribute('validity'),
          // THIS IS NOT DONE CORRECTLY :)
          required: element.getAttribute('required'),
        };
      } else if (element.tagName.toLowerCase() === 'button' && element.type === 'submit') {
        // eslint-disable-next-line no-console
        console.log('Button element detected');

        // Remove in case this button was already registered!
        element.removeEventListener('click', this.getSubmitFunction());
        element.addEventListener('click', this.getSubmitFunction());
      }
    }
  }

  // function that renders the HTML and CSS into the scope of the component
  render() {
    return html`
        <form>
          <h3>Auro form example</h3>
          <slot @slotchange="${this.onSlotChange}"></slot>
        </form>
    `;
  }
}

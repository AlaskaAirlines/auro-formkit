// Copyright (c) 2020 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

import { LitElement, html } from "lit";
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import styleCss from "./styles/auro-checkbox-css.js";
import colorCss from "./styles/color-css.js";
import tokensCss from "./styles/tokens-css.js";

import checkLg from '@alaskaairux/icons/dist/icons/interface/check-lg.mjs';

import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';

/**
 * Custom element for the purpose of allowing users to select one or more options of a limited number of choices.
 *
 * @prop {string} id - The id global attribute defines an identifier (ID) which must be unique in the whole document.
 * @attr id
 *
 * @csspart checkbox - apply css to a specific checkbox.
 * @csspart checkbox-input - apply css to a specific checkbox's input.
 * @csspart checkbox-label - apply css to a specific checkbox's label.
 */

// build the component class
export class AuroCheckbox extends LitElement {
  constructor() {
    super();
    this.checked = false;
    this.disabled = false;
    this.error = false;
    this.onDark = false;
    this.touched = false;

    /**
     * @private
     */
    this.runtimeUtils = new AuroLibraryRuntimeUtils();

    /**
     * @private
     * @property {boolean} delegatesFocus - Whether the shadow root delegates focus.
     */
    this.constructor.shadowRootOptions = {
      ...LitElement.shadowRootOptions,
      delegatesFocus: true,
    };
  }

  static get styles() {
    return [
      styleCss,
      colorCss,
      tokensCss
    ];
  }

  // function to define props used within the scope of this component
  static get properties() {
    return {
      ...super.properties,

      /**
       * If set to true, the checkbox will be filled with a checkmark.
       */
      checked: {
        type: Boolean,
        reflect: true
      },

      /**
       * If set to true, the checkbox will not be clickable.
       */
      disabled: {
        type: Boolean,
        reflect: true
      },

      /**
       * If set to true, the checkbox will be displayed with an error state.
       */
      error: {
        type: Boolean,
        reflect: true
      },

      /**
       * Accepts any string and is used to identify related checkboxes when submitting form data.
       */
      name: { type: String },

      /**
       * Sets onDark styles for component.
       */
      onDark: {
        type: Boolean,
        reflect: true
      },

      /**
       * Sets the element's input value. Must be unique within an auro-checkbox-group element.
       */
      value: {
        type: String,
        reflect: true
      },

      /**
       * Indicates whether the checkbox has been interacted with.
       * @type {boolean}
       * @private
       */
      touched: {
        type: Boolean,
        reflect: true,
        attribute: false
      },

      /**
       * The id for input node.
       * @private
       */
      inputId: {
        type: String,
        reflect: false,
        attribute: false
      }
    };
  }

  /**
   * This will register this element with the browser.
   * @param {string} [name="auro-checkbox"] - The name of element that you want to register to.
   *
   * @example
   * AuroCheckbox.register("custom-checkbox") // this will register this element to <custom-checkbox/>
   *
   */
  static register(name = "auro-checkbox") {
    AuroLibraryRuntimeUtils.prototype.registerComponent(name, AuroCheckbox);
  }

  /**
   * Handles the change event for the checkbox input.
   * Updates the checked state and dispatches a corresponding custom event.
   * This custom event is only for the purpose of supporting IE.
   * @private
   * @param {Event} event - The change event from the checkbox input.
   * @returns {void}
   */
  handleChange(event) {
    this.checked = event.target.checked;
    const customEvent = new CustomEvent(event.type, event);

    this.dispatchEvent(customEvent);
  }

  /**
   * Handles the input event for the checkbox input.
   * Updates the checked state and dispatches a custom 'auroCheckbox-input' event.
   * @private
   * @param {Event} event - The input event from the checkbox input.
   * @returns {void}
   */
  handleInput(event) {
    this.checked = event.target.checked;

    this.dispatchEvent(new CustomEvent('auroCheckbox-input', {
      bubbles: true,
      cancelable: false,
      composed: true,
    }));
  }

  /**
   * Function to support @focusin event.
   * @private
   * @returns {void}
   */
  handleFocusin() {
    this.touched = true;
    this.dispatchEvent(new CustomEvent('auroCheckbox-focusin', {
      bubbles: true,
      cancelable: false,
      composed: true,
    }));
  }

  /**
   * Function to generate checkmark svg.
   * @private
   * @returns {void}
   */
  generateIconHtml() {
    this.dom = new DOMParser().parseFromString(checkLg.svg, 'text/html');
    this.svg = this.dom.body.firstChild;

    this.svg.classList.add('svg--cbx');

    return this.svg;
  }

  /**
   * Resets component to initial state.
   * @returns {void}
   */
  reset() {
    this.checked = false;
    this.error = false;
    this.touched = false;
  }

  firstUpdated() {
    // Add the tag name as an attribute if it is different than the component name
    this.runtimeUtils.handleComponentTagRename(this, 'auro-checkbox');

    this.inputId = this.id ? `${this.id}-input` : window.crypto.randomUUID();

    this.addEventListener('click', () => {
      this.checked = !this.checked;
      this.handleFocusin();
    });

    this.addEventListener('focusin', () => {
      this.handleFocusin();
    });

    this.addEventListener('focusout', () => {
      this.dispatchEvent(new CustomEvent('auroCheckbox-focusout', {
        bubbles: true,
        cancelable: false,
        composed: true,
      }));
    });
  }

  /**
   * @private
   * @returns {HTMLElement}
   */
  render() {
    const labelClasses = {
      'label': true,
      'label--cbx': true,
      'errorBorder': this.error
    };

    return html`
      <div class="cbxContainer" part="checkbox">
        <div class="inputContainer">
          <input
            class="util_displayHiddenVisually cbx--input"
            part="checkbox-input"
            @change=${this.handleChange}
            @input="${this.handleInput}"
            ?disabled="${this.disabled}"
            .checked="${this.checked}"
            id="${this.inputId}"
            name="${ifDefined(this.name)}"
            type="checkbox"
            .value="${this.value}"
          />
          ${this.checked ? this.generateIconHtml() : undefined}
        </div>

        <label for="${this.inputId}" class="${classMap(labelClasses)}" part="checkbox-label">
          <slot></slot>
        </label>
      </div>
    `;
  }
}

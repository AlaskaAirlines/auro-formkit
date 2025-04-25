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

    /**
     * @private
     */
    this.runtimeUtils = new AuroLibraryRuntimeUtils();
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
       * Sets the individual `id` per element.
       */
      id: { type: String },

      /**
       * Accepts any string and is used to identify related checkboxes when submitting form data.
       */
      name: { type: String },

      /**
       * Sets the element's input value. Must be unique within an auro-checkbox-group element.
       */
      value: {
        type: String,
        reflect: true
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

  // This custom event is only for the purpose of supporting IE
  // .addEventListener('change', function() { })
  handleChange(event) {
    this.checked = event.target.checked;
    const customEvent = new CustomEvent(event.type, event);

    this.dispatchEvent(customEvent);
  }

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
  }

  firstUpdated() {
    // Add the tag name as an attribute if it is different than the component name
    this.runtimeUtils.handleComponentTagRename(this, 'auro-checkbox');

    this.addEventListener('click', () => {
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

  // function that renders the HTML and CSS into  the scope of the component
  render() {
    const labelClasses = {
      'label': true,
      'label--cbx': true,
      'errorBorder': this.error
    };

    return html`
      <div class="cbxContainer" part="checkbox">
        <input
          class="util_displayHiddenVisually cbx--input"
          part="checkbox-input"
          @change=${this.handleChange}
          @input="${this.handleInput}"
          ?disabled="${this.disabled}"
          .checked="${this.checked}"
          id="${ifDefined(this.id)}"
          name="${ifDefined(this.name)}"
          type="checkbox"
          .value="${this.value}"
        />

        <label for="${ifDefined(this.id)}" class="${classMap(labelClasses)}" part="checkbox-label">
          ${this.checked ? this.generateIconHtml() : undefined}
          <slot></slot>
        </label>
      </div>
    `;
  }
}

/* istanbul ignore else */
// define the name of the custom component
if (!customElements.get("auro-checkbox")) {
  customElements.define("auro-checkbox", AuroCheckbox);
}

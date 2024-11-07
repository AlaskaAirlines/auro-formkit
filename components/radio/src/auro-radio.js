// Copyright (c) 2020 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

import { LitElement, html } from "lit";
import { classMap } from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';

// Import touch detection lib
import "focus-visible/dist/focus-visible.min.js";
import styleCss from "./style-css.js";
import colorCss from './color-css.js';
import tokenCss from './tokens-css.js';

// Import library runtime utils
import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';

/**
 * @attr {Boolean} checked - If set to true, the radio button will be filled.
 * @attr {Boolean} disabled - If set to true, the radio button will be non-clickable.
 * @attr {Boolean} required - Defines element as required.
 * @attr {Boolean} error - If set to true, sets an error state on the radio button.
 * @event toggleSelected - Notifies that the component has toggled the checked/selected state.
 * @event focusSelected - Notifies that the component has gained focus.
 * @event auroRadio-blur - Notifies that the component has lost focus.
 * @event resetRadio - Notifies that the component has reset the checked/selected state.
 * @event auroRadio-selected - Notifies that the component has been marked as checked/selected.
 */

// build the component class
export class AuroRadio extends LitElement {
  constructor() {
    super();
    this.checked = false;
    this.disabled = false;
    this.required = false;
    this.error = false;
    this.tabIndex = -1;

    /**
     * @private
     */
    this.runtimeUtils = new AuroLibraryRuntimeUtils();
  }

  static get styles() {
    return [
      styleCss,
      colorCss,
      tokenCss
    ];
  }

  // function to define props used within the scope of this component
  static get properties() {
    return {
      checked: {
        type: Boolean,
        reflect: true
      },
      disabled: {
        type: Boolean,
        reflect: true
      },
      required: {
        type: Boolean,
        reflect: true
      },
      error: {
        type: Boolean,
        reflect: true
      },
      id:       { type: String },
      label:    { type: String },
      name:     { type: String },
      value:    { type: String },
      tabIndex: {
        type: Number,
        reflect: true
      }
    };
  }

  /**
   * This will register this element with the browser.
   * @param {string} [name="auro-radio"] - The name of element that you want to register to.
   *
   * @example
   * AuroRadio.register("custom-radio") // This will resgiter this element to <custom-radio/>
   *
   */
  static register(name = "auro-radio") {
    AuroLibraryRuntimeUtils.prototype.registerComponent(name, AuroRadio);
  }

  /**
   * Method for handling content when change event is fired.
   * @private
   * @param {Event} event - The trigger event tied to this function.
   * @returns {void}
   */
  handleChange(event) {
    this.checked = event.target.checked;
    const customEvent = new CustomEvent(event.type, event);

    this.dispatchEvent(customEvent);
  }

  /**
   * Method for handling content when input event is fired.
   * @private
   * @param {Event} event - The trigger event tied to this function.
   * @returns {void}
   */
  handleInput(event) {
    this.checked = event.target.checked;
    this.dispatchEvent(new CustomEvent('toggleSelected', {
      bubbles: true,
      composed: true,
      target: this
    }));
  }

  /**
   * Method for handling focus event.
   * @private
   * @param {Event} event - The trigger event tied to this function.
   * @returns {void}
   */
  handleFocus(event) {
    this.dispatchEvent(new CustomEvent('focusSelected', {
      bubbles: true,
      composed: true,
      target: event.target
    }));
  }

  /**
   * Method for handling blur event.
   * @private
   * @param {Event} event - The trigger event tied to this function.
   * @returns {void}
   */
  handleBlur(event) {
    this.dispatchEvent(new CustomEvent('auroRadio-blur', {
      bubbles: true,
      composed: true,
      target: event.target
    }));
  }

  updated(changedProperties) {
    if (changedProperties.has('checked')) {
      this.dispatchEvent(new CustomEvent('resetRadio', {
        bubbles: true,
        composed: true
      }));

      if (this.checked) {
        this.dispatchEvent(new CustomEvent('auroRadio-selected', {
          bubbles: true,
          composed: true
        }));
      }
    }
  }

  /**
   * Method for handling content when it is invalid accessibility wise.
   * @private
   * @param {Boolean} error - The element's error attribute.
   * @returns {void}
   */
  invalid(error) {
    if (error) {
      return 'true';
    }

    return 'false';
  }

  /**
   * Method for handling passing the required status to aria.
   * @private
   * @param {Boolean} required - The element's required attribute.
   * @returns {void}
   */
  isRequired(required) {
    if (required) {
      return 'true';
    }

    return 'false';
  }

  firstUpdated() {
    // Add the tag name as an attribute if it is different than the component name
    this.runtimeUtils.handleComponentTagRename(this, 'auro-radio');

    this.addEventListener('blur', this.handleBlur);

    this.input = this.shadowRoot.querySelector('input');

    this.addEventListener('click', () => {
      this.input.click();
    });
  }

  // function that renders the HTML and CSS into  the scope of the component
  render() {
    const labelClasses = {
      'ods-inputLabel': true,
      'ods-inputLabel--radio': true,
      'label': true,
      'label--rdo': true,
      'errorBorder': this.error
    };

    return html`
      <div class="ods-inputGroup rdoGroup">
        <input
          class="util_displayHiddenVisually ods-inputOption rdo--input"
          @focus="${this.handleFocus}"
          @input="${this.handleInput}"
          @change="${this.handleChange}"
          ?disabled="${this.disabled}"
          aria-invalid="${this.invalid(this.error)}"
          aria-required="${this.isRequired(this.required)}"
          .checked="${this.checked}"
          id="${ifDefined(this.id)}"
          name="${ifDefined(this.name)}"
          type="radio"
          .value="${this.value}"
          tabIndex="-1"
        />

        <label for="${ifDefined(this.id)}" class="${classMap(labelClasses)}">
          <slot>${this.label}</slot>
        </label>

      </div>
      <slot name="content" class="slotContent"></slot>
    `;
  }
}

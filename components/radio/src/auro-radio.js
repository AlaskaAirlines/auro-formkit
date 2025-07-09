/* eslint-disable max-lines */
// Copyright (c) 2020 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

import { LitElement, html } from "lit";
import { classMap } from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';

// Import touch detection lib
import "focus-visible/dist/focus-visible.min.js";

import styleCss from "./styles/style-css.js";
import colorCss from './styles/color-css.js';
import tokenCss from './styles/tokens-css.js';

// Import library runtime utils
import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';

/**
 * @attr {Boolean} checked - If set to true, the radio button will be filled.
 * @attr {Boolean} disabled - If set to true, the radio button will be non-clickable.
 * @attr {Boolean} required - Defines element as required.
 * @attr {Boolean} error - If set to true, sets an error state on the radio button.
 * @attr {Boolean} onDark - If set to true, the component will render with a dark theme.
 * @event toggleSelected - Notifies that the component has toggled the checked/selected state.
 *
 * @prop {string} id - The id global attribute defines an identifier (ID) which must be unique in the whole document.
 * @attr id
 *
 * @event focusSelected - Notifies that the component has gained focus.
 * @event auroRadio-blur - Notifies that the component has lost focus.
 * @event resetRadio - Notifies that the component has reset the checked/selected state.
 * @event auroRadio-selected - Notifies that the component has been marked as checked/selected.
 *
 * @csspart radio - apply css to a specific checkbox.
 * @csspart radio-input - apply css to a specific checkbox's input.
 * @csspart radio-label - apply css to a specific checkbox's label.
 */

// build the component class
export class AuroRadio extends LitElement {
  constructor() {
    super();
    this.checked = false;
    this.disabled = false;
    this.required = false;
    this.error = false;
    this.onDark = false;
    this.touched = false;
    this.role = 'radio';

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
      onDark: {
        type: Boolean,
        reflect: true
      },
      label:    { type: String },
      name:     { type: String },
      value:    { type: String },

      /**
       * Whether or not the radio button has been touched by the user.
       * @private
       */
      touched: {
        type: Boolean,
        reflect: true,
        attribute: false
      },

      /**
       * ID for input node.
       * @private
       */
      inputId: {
        type: String,
        reflect: false,
        attribute: false
      },

      /**
       * @private
       * not to add to api.md since changing of this can easily break a11y.
       */
      role: {
        type: String,
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
    this.touched = true;
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

  /**
   * Resets component to initial state.
   * @returns {void}
   */
  reset() {
    this.touched = false;
    this.checked = false;
    this.error = false;
  }

  updated(changedProperties) {
    if (changedProperties.has('error') || changedProperties.has('validity')) {
      this.setAttribute('aria-invalid', this.error || this.validity !== 'valid' ? 'true' : 'false');
    }

    if (changedProperties.has('required')) {
      this.setAttribute('aria-required', this.isRequired(this.required));
    }

    if (changedProperties.has('disabled')) {
      if (this.disabled) {
        this.setAttribute('aria-disabled', '');
      } else {
        this.removeAttribute('aria-disabled');
      }
    }

    if (changedProperties.has('checked')) {
      this.setAttribute('aria-checked', this.checked ? 'true' : 'false');
      // eslint-disable-next-line no-magic-numbers
      this.setAttribute('tabindex', this.checked ? 0 : -1);

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

    this.addEventListener('focus', this.handleFocus);
    this.addEventListener('blur', this.handleBlur);

    this.input = this.shadowRoot.querySelector('input');

    this.inputId = this.id ? `${this.id}-input` : window.crypto.randomUUID();

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
      <div class="ods-inputGroup rdoGroup body-default" part="radio">
        <input
          class="util_displayHidden ods-inputOption rdo--input"
          part="radio-input"
          @input="${this.handleInput}"
          @change="${this.handleChange}"
          ?disabled="${this.disabled}"
          .checked="${this.checked}"
          id="${this.inputId}"
          name="${ifDefined(this.name)}"
          type="radio"
          .value="${this.value}"
          aria-hidden="true"
          tabindex="-1"
        />

        <label for="${this.inputId}" class="${classMap(labelClasses)}" part="radio-label">
          <slot>${this.label}</slot>
        </label>
      </div>
      <slot name="content" class="slotContent"></slot>
    `;
  }
}

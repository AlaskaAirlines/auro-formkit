// Copyright (c) 2026 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

/* eslint-disable max-lines, no-underscore-dangle */

import { LitElement, html } from "lit";
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import styleCss from "./styles/auro-checkbox-css.js";
import colorCss from "./styles/color-css.js";
import tokensCss from "./styles/tokens-css.js";

import checkLg from '@alaskaairux/icons/dist/icons/interface/check-lg.mjs';

import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';

/**
 * The `auro-checkbox` element is for the purpose of allowing users to select one or more options of a limited number of choices.
 * @customElement auro-checkbox
 *
 * @csspart checkbox - apply css to a specific checkbox.
 * @csspart checkbox-input - apply css to a specific checkbox's input.
 * @csspart checkbox-label - apply css to a specific checkbox's label.
 *
 * @slot default - The default slot for the checkbox label.
 *
 * @fires {CustomEvent<any>} change - (Deprecated) Notifies when checked value is changed.
 * @fires {InputEvent} input - Notifies when when checked value is changed by user's interface.
 */

// build the component class
export class AuroCheckbox extends LitElement {
  constructor() {
    super();

    this._initializeDefaults();
  }

  _initializeDefaults() {
    this.apperance = 'default';
    this.checked = false;
    this.disabled = false;
    this.error = false;
    this.onDark = false;
    this.touched = false;
    this.tabIndex = 0;
    this.ariaChecked = 'false';
    this.role = 'checkbox';

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
      ...super.properties,

      /**
       * Defines whether the component will be on lighter or darker backgrounds.
       * @type {'default' | 'inverse'}
       * @default 'default'
       */
      appearance: {
        type: String,
        reflect: true
      },

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
       * The id global attribute defines an identifier (ID) which must be unique in the whole document.
       */
      id: {
        type: String
      },

      /**
       * The id for input node.
       * @private
       */
      inputId: {
        type: String,
        reflect: false,
        attribute: false
      },

      /**
       * Accepts any string and is used to identify related checkboxes when submitting form data.
       */
      name: { type: String },

      /**
       * DEPRECATED - use `appearance="inverse"` instead.
       */
      onDark: {
        type: Boolean,
        reflect: true
      },

      /**
       * Indicates whether the checkbox has been interacted with.
       * @private
       */
      touched: {
        type: Boolean,
        reflect: true,
        attribute: false
      },

      /**
       * Sets the element's input value. Must be unique within an auro-checkbox-group element.
       */
      value: {
        type: String,
        reflect: false
      },

      /**
       * The tabindex attribute for the checkbox.
       * @private
       */
      tabIndex: {
        type: Number,
        reflect: true,
        attribute: 'tabindex'
      },

      /**
       * The aria-checked attribute for the checkbox.
       * @private
       */
      ariaChecked: {
        type: String,
        reflect: true,
        attribute: 'aria-checked'
      },

      /**
       * The aria-disabled attribute for the checkbox.
       * @private
       */
      ariaDisabled: {
        type: String,
        reflect: true,
        attribute: 'aria-disabled'
      },

      /**
       * The ARIA role for the element. Must remain 'checkbox' for screen readers
       * to correctly identify this as a checkbox control.
       * @private
       */
      role: {
        type: String,
        reflect: true
      },

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

    // Old event we need to deprecate
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
   * @returns {HTMLElement}
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

  /**
   * Updates the aria-label based on slot content.
   * @private
   * @returns {void}
   */
  updateAriaLabel() {
    const slot = this.shadowRoot.querySelector('slot');
    const text = slot.assignedNodes().
      map((node) => node.textContent).
      join('').
      trim();
    if (text) {
      this.setAttribute('aria-label', text);
    }
  }

  firstUpdated() {
    // Add the tag name as an attribute if it is different than the component name
    this.runtimeUtils.handleComponentTagRename(this, 'auro-checkbox');

    this.inputId = this.id ? `${this.id}-input` : window.crypto.randomUUID();

    this.addEventListener('click', (evt) => {
      // Only prevent default for real user events, not tests or programmatic calls
      if (evt.isTrusted) {
        evt.preventDefault();
      }

      if (!this.disabled) {
        this.shadowRoot.querySelector('input').click();
        this.handleFocusin();
      }
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

  connectedCallback() {
    super.connectedCallback();

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.addEventListener('keydown', this.handleKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener('keydown', this.handleKeyDown);
  }

  /**
   * Updates ARIA attributes when properties change.
   * @private
   * @param {Map} changedProperties - Map of changed properties.
   * @returns {void}
   */
  updated(changedProperties) {
    super.updated(changedProperties);

    if (changedProperties.has('checked')) {
      this.ariaChecked = this.checked ? 'true' : 'false';
    }

    if (changedProperties.has('disabled')) {
      this.ariaDisabled = this.disabled ? 'true' : undefined;
    }
  }

  /**
   * Handles keydown event to toggle the checkbox with Space key.
   * @private
   * @param {KeyboardEvent} event - The keydown event from the checkbox input.
   * @returns {void}
   */
  handleKeyDown(event) {
    if (event.key === ' ' && !this.disabled) {
      event.preventDefault();

      this.shadowRoot.querySelector('input').click();
    }
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
      <div class="cbxContainer body-default" part="checkbox">
        <div class="inputContainer">
          <input
            class="util_displayHidden cbx--input"
            part="checkbox-input"
            @change="${this.handleChange}"
            @input="${this.handleInput}"
            ?disabled="${this.disabled}"
            ?checked="${this.checked}"
            id="${this.inputId}"
            name="${ifDefined(this.name)}"
            type="checkbox"
            .value="${this.value}"
            aria-hidden="true"
            tabindex="-1"
          />
          ${this.checked ? this.generateIconHtml() : undefined}
        </div>

        <span class="${classMap(labelClasses)}" part="checkbox-label">
          <slot @slotchange="${this.updateAriaLabel}"></slot>
        </span>
      </div>
    `;
  }
}

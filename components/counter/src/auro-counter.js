/* eslint-disable lit/binding-positions, lit/no-invalid-html */
// Copyright (c) 2024 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

import { LitElement } from "lit";
import { html } from "lit/static-html.js";

import { AuroDependencyVersioning } from "@aurodesignsystem/auro-library/scripts/runtime/dependencyTagVersioning.mjs";
import AuroLibraryRuntimeUtils from "@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs";

import { AuroIcon } from "@aurodesignsystem/auro-icon/src/auro-icon.js";
import iconVersion from "./iconVersion.js";
import AuroFormValidation from '@auro-formkit/form-validation';

import tokensCss from "./styles/tokens-css.js";
import colorCss from "./styles/color-css.js";
import styleCss from "./styles/style-css.js";

/**
 * AuroCounter is a customizable counter component for user interface interactions.
 *
 * This web component provides a flexible counter interface with increment and decrement buttons,
 * supporting optional sub-labels and disabled states.
 *
 * @element auro-counter
 * @extends LitElement
 * @property {boolean} disabled - Determines whether the counter is interactive or disabled.
 * @property {boolean} error - Indicates if the counter is in an error state.
 * @property {number} max - Maximum value of the counter.
 * @property {number} min - Minimum value of the counter.
 * @property {string} subLabel - Optional sub-label text for the counter.
 * @property {number} value - Value of the counter.
 * @property {string} validity - Indicates if the current value is valid.
 * @property {AuroFormValidation} validation - Instance of AuroFormValidation for validation purposes.
 * @property {string} iconTag - Dynamically generated icon tag for counter buttons.
 * @slot - Default slot for main label content
 * @csspart counterControl - Styling hook for counter control section
 * @csspart controlMinus - Styling hook for minus button
 * @csspart controlPlus - Styling hook for plus button
 */
export class AuroCounter extends LitElement {
  constructor() {
    super();

    this.disabled = false;
    this.error = false;
    this.max = 9;
    this.min = 0;
    this.subLabel = "";
    this.value = undefined;
    this.validity = undefined;

    /**
     * @private
     */
    this.validation = new AuroFormValidation();

    /**
     * Generate unique names for dependency components.
     * @private
     */
    const versioning = new AuroDependencyVersioning();

    /**
     * Dynamically generated icon tag for counter buttons.
     * @private
     * @type {string}
     */
    this.iconTag = versioning.generateTag("auro-icon", iconVersion, AuroIcon);
  }

  /**
   * Defines reactive properties for the component.
   * @returns {Object} Property configuration.
   */
  static get properties() {
    return {
      disabled: {
        type: Boolean,
        reflect: true,
      },
      error: {
        type: Boolean,
        reflect: true
      },
      max: {
        type: Number
      },
      min: {
        type: Number
      },
      noValidate: {
        type: Boolean
      },
      setCustomValidity: {
        type: String
      },
      setCustomValidityCustomError: {
        type: String
      },
      setCustomValidityValueMissing: {
        type: String
      },
      setCustomValidityRangeOverflow: {
        type: String
      },
      setCustomValidityRangeUnderflow: {
        type: String
      },
      subLabel: {
        type: String
      },
      validity: {
        type: String,
        reflect: true
      },
      value: {
        type: Number,
        reflect: true,
      }
    };
  }

  /**
   * Registers the custom element with the browser.
   * @param {string} [name="auro-counter"] - Custom element name to register.
   * @example
   * AuroCounter.register("custom-counter") // registers <custom-counter/>
   */
  static register(name = "auro-counter") {
    AuroLibraryRuntimeUtils.prototype.registerComponent(name, AuroCounter);
  }

  static get styles() {
    return [
      tokensCss,
      colorCss,
      styleCss
    ];
  }

  /**
   * Increments the counter value by 1 if it is less than the maximum value.
   * @method increment
   * @returns {void}
   */
  increment() {
    this.value += 1;
  }

  /**
   * Decrements the value of the counter by 1 if it is greater than the minimum value.
   * @method decrement
   * @returns {void}
   */
  decrement() {
    this.value -= 1;
  }

  /**
   * Initializes the value of the counter.
   * If the current value is undefined, it sets the value to the minimum value.
   */
  initValue() {
    if (this.value === undefined) {
      this.value = this.min;
    }
  }

  /**
   * Determines if the increment button should be disabled based on the current value and extrema.
   *
   * @param {number} extrema - The extreme value (either min or max) to compare against the current value.
   * @returns {boolean} - Returns true if the increment button should be disabled, otherwise false.
   */
  isIncrementDisabled(extrema) {
    if (this.value === undefined) {
      return false;
    } else if (extrema === this.min && this.value > extrema) {
      return false;
    } else if (extrema === this.max && this.value < extrema) {
      return false;
    }

    return true;
  }

  /**
   * Moves the focus to the first enabled button within the shadow DOM.
   * This method searches for the first `auro-counter-button` element that is not disabled
   * and sets the focus on it.
   */
  jumpFocusToEnabled() {
    const button = this.shadowRoot.querySelector('auro-counter-button:not([disabled])');
    if (button !== null) {
      button.focus();
    }
  }

  firstUpdated() {
    this.initValue();
  }

  updated(changedProperties) {
    if (changedProperties.has("value")) {
      this.validation.validate(this);
      this.dispatchEvent(new CustomEvent("input", {
        detail: {
          value: this.value,
        },
      }));
      if (this.value === this.max || this.value === this.min) {
        this.jumpFocusToEnabled();
      }
    }
  }

  render() {
    return html`
      <div class="counter">
        <div class="content">
          <label class="label"><slot></slot></label>
          <div class="subLabel"><slot name="subLabel"></slot></div>
        </div>
        
        <div part="counterControl">
          <auro-counter-button
            part="controlMinus"
            @click="${this.decrement}"
            ?disabled="${this.disabled || this.isIncrementDisabled(this.min)}"
            >
            <${this.iconTag} category="interface" name="minus-lg"class="controlIcon" slot="icon"></${this.iconTag}>
          </auro-counter-button>

          <div class="quantityWrapper">
            <div class="quantity">${this.value !== undefined ? this.value : this.min}</div>
          </div>

          <auro-counter-button
            part="controlPlus"
            @click="${this.increment}"
            ?disabled="${this.disabled || this.isIncrementDisabled(this.max)}"
            >
            <${this.iconTag} category="interface" name="plus-lg" class="controlIcon" slot="icon"> </${this.iconTag}>
          </auro-counter-button>
        </div>
      </div>
    `;
  }
}

/* istanbul ignore else */
// define the name of the custom component
if (!customElements.get("auro-counter")) {
  customElements.define("auro-counter", AuroCounter);
}

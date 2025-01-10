/* eslint-disable lit/binding-positions, lit/no-invalid-html, max-lines */
// Copyright (c) 2025 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

import { LitElement } from "lit";
import { html } from "lit/static-html.js";

import "./auro-counter-button.js";

import { AuroDependencyVersioning } from "@aurodesignsystem/auro-library/scripts/runtime/dependencyTagVersioning.mjs";
import AuroLibraryRuntimeUtils from "@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs";

import { AuroIcon } from "@aurodesignsystem/auro-icon/src/auro-icon.js";
import iconVersion from "./formkit/iconVersion.js";
import AuroFormValidation from "@auro-formkit/form-validation";

import tokensCss from "./styles/tokens-css.js";
import colorCss from "./styles/color-css.js";
import styleCss from "./styles/style-css.js";

/**
 * Auro Counter is a customizable counter component for user interface interactions.
 *
 * This web component provides a flexible counter interface with increment and decrement buttons,
 * supporting optional sub-labels and disabled states.
 *
 * @element auro-counter
 * @extends LitElement
 * @slot Default - Main label content for the counter.
 * @slot description - Descriptive content for the counter.
 * @csspart counterControl - Styling hook for counter control section.
 * @csspart controlMinus - Styling hook for minus button.
 * @csspart controlPlus - Styling hook for plus button.
 */
export class AuroCounter extends LitElement {
  constructor() {
    super();

    this.disabled = false;
    this.disableMax = false;
    this.disableMin = false;
    this.max = 9;
    this.min = 0;
    this.noValidate = false;
    this.validity = undefined;
    this.value = undefined;

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

      /**
       * Indicates if the counter is disabled.
       */
      disabled: {
        type: Boolean,
        reflect: true,
      },

      /**
       * Indicates if the maximum value is disabled.
       */
      disableMax: {
        type: Boolean,
      },

      /**
       * Indicates if the minimum value is disabled.
       */
      disableMin: {
        type: Boolean,
      },

      /**
       * The maximum value for the counter.
       */
      max: {
        type: Number,
      },

      /**
       * The minimum value for the counter.
       */
      min: {
        type: Number,
      },

      /**
       * Indicates if validation is disabled.
       */
      noValidate: {
        type: Boolean,
      },

      /**
       * Custom validity message.
       * @private
       */
      setCustomValidity: {
        type: String,
      },

      /**
       * Custom validity message for range overflow.
       * @private
       */
      setCustomValidityRangeOverflow: {
        type: String,
      },

      /**
       * Custom validity message for range underflow.
       * @private
       */
      setCustomValidityRangeUnderflow: {
        type: String,
      },

      /**
       * Custom validity message for value missing.
       * @private
       */
      setCustomValidityValueMissing: {
        type: String,
      },

      /**
       * The validity state of the counter.
       */
      validity: {
        type: String,
        reflect: true,
      },

      /**
       * The current value of the counter.
       */
      value: {
        type: Number,
      },
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
   * Increments the counter value by 1.
   * @method increment
   * @returns {void}
   */
  increment() {
    this.value += 1;
  }

  /**
   * Decrements the value of the counter by 1.
   * @method decrement
   * @returns {void}
   */
  decrement() {
    this.value -= 1;
  }

  /**
   * Initializes the value of the counter.
   * If the current value is undefined, it sets the value to the minimum value.
   * @private
   */
  initValue() {
    if (this.value === undefined) {
      this.value = this.min;
    }
  }

  /**
   * Checks if the "description" slot is empty.
   * This method retrieves the "description" slot from the shadow DOM and determines if it's empty.
   * An empty slot is defined as either a non-existent slot or a slot with no assigned nodes.
   *
   * @returns {boolean} `true` if the "description" slot is empty, `false` otherwise.
   * @private
   */
  checkDescriptionSlot() {
    const descriptionSlot = this.shadowRoot.querySelector('slot[name="description"]');
    return !descriptionSlot || descriptionSlot.assignedNodes().length === 0;
  }

  /**
   * Determines if the increment button should be disabled based on the current value and extrema.
   *
   * @param {number} extrema - The extreme value (either min or max) to compare against the current value.
   * @returns {boolean} - Returns true if the increment button should be disabled, otherwise false.
   * @private
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
   * @private
   */
  jumpFocusToEnabled() {
    const button = this.shadowRoot.querySelector("auro-counter-button:not([disabled])",);
    if (button !== null) {
      button.focus();
    }
  }

  firstUpdated() {
    this.initValue();
  }

  updated(changedProperties) {
    if (changedProperties.has("value")) {
      const oldValue = changedProperties.get("value");
      if (this.value !== oldValue && oldValue !== undefined) {
        this.validation.validate(this);
        this.dispatchEvent(new CustomEvent("input", {
          detail: {
            value: this.value,
          },
        }),);

        if (
          this.value === this.max ||
          this.value === this.min ||
          changedProperties.get("disableMax") ||
          changedProperties.get("disableMin")
        ) {
          this.jumpFocusToEnabled();
        }
      }
    }
    if (
      (changedProperties.has("disableMax") ||
        changedProperties.has("disableMin")) &&
      (changedProperties.get("disableMax") !== undefined ||
        changedProperties.get("disableMin") !== undefined)
    ) {
      this.jumpFocusToEnabled();
    }
  }

  render() {
    return html`
      <div class="counter">
      <div class="content">
        <label class="label"><slot></slot></label>
        ${this.checkDescriptionSlot() ? '' : html`<div class="description"><slot name="description"></slot></div>`}
      </div>
      
      <div part="counterControl">
        <auro-counter-button
        part="controlMinus"
        @click="${this.decrement}"
        ?disabled="${this.disabled || this.disableMin || this.isIncrementDisabled(this.min)}"
        >
        <${this.iconTag} category="interface" name="minus-lg"class="controlIcon" slot="icon"></${this.iconTag}>
        </auro-counter-button>

        <div class="quantityWrapper">
        <div class="quantity">${this.value !== undefined ? this.value : this.min}</div>
        </div>

        <auro-counter-button
        part="controlPlus"
        @click="${this.increment}"
        ?disabled="${this.disabled || this.disableMax || this.isIncrementDisabled(this.max)}"
        >
        <${this.iconTag} category="interface" name="plus-lg" class="controlIcon" slot="icon"> </${this.iconTag}>
        </auro-counter-button>
      </div>
      </div>
    `;
  }
}

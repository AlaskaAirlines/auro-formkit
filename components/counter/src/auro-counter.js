/* eslint-disable lit/binding-positions, lit/no-invalid-html */
// Copyright (c) 2025 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

import { LitElement } from "lit";
import { html } from "lit/static-html.js";

import "./auro-counter-button.js";

import { AuroDependencyVersioning } from "@aurodesignsystem/auro-library/scripts/runtime/dependencyTagVersioning.mjs";
import AuroLibraryRuntimeUtils from "@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs";

import { AuroIcon } from "@aurodesignsystem/auro-icon/src/auro-icon.js";
import iconVersion from "./iconVersion.js";
import AuroFormValidation from "@auro-formkit/form-validation";

import { IconUtil } from "@auro-formkit/utils";
import plusIcon from '@alaskaairux/icons/dist/icons/interface/plus-lg.mjs';
import minusIcon from '@alaskaairux/icons/dist/icons/interface/minus-lg.mjs';

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
 */
export class AuroCounter extends LitElement {
  constructor() {
    super();

    this.disabled = false;
    this.disableMax = false;
    this.disableMin = false;
    this.max = 9;
    this.min = 0;
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
       * Group will attach to counter to disable the increment button.
       * @private
       */
      disableMax: {
        type: Boolean,
      },

      /**
       * Group will attach to counter to disable the decrement button.
       * @private
       */
      disableMin: {
        type: Boolean,
      },

      /**
       * The maximum value for the counter.
       */
      max: {
        type: Number,
        reflect: true,
      },

      /**
       * The minimum value for the counter.
       */
      min: {
        type: Number,
        reflect: true,
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
   * Increments the counter value by 1. If a value is provided, it increments by that amount.
   * @method increment
   * @param {number} [value] - The amount to increment by.
   * @returns {void}
   */
  increment(value) {
    this.value += value !== undefined ? value : 1;
  }

  /**
   * Decrements the value of the counter by 1. If a value is provided, it decrements by that amount.
   * @method decrement
   * @param {number} [value] - The amount to decrement by.
   * @returns {void}
   */
  decrement(value) {
    this.value -= value !== undefined ? value : 1;
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
   * Determines if the increment button should be disabled based on the current value and extrema.
   *
   * @param {number} extrema - The extreme value (either min or max) to compare against the current value.
   * @returns {boolean} - Returns true if the increment button should be disabled, otherwise false.
   * @private
   */
  isIncrementDisabled(extrema) {
    // Initially, the value is undefined and then set to the minimum value. During this transition, the increment button should be disabled.
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
    const button = this.shadowRoot.querySelector("auro-counter-button:not([disabled])");
    if (button !== null) {
      button.focus();
    }
  }

  handleSlotChange() {
    this.checkSlots();
  }

  firstUpdated() {
    this.initValue();
  }

  updated(changedProperties) {
    if (changedProperties.has("value")) {
      this.validation.validate(this);
      this.dispatchEvent(
        new CustomEvent("input", {
          detail: {
            value: this.value,
          },
        }),
        {
          bubble: true,
          composable: true,
        }
      );

      if (
        this.value === this.max ||
        this.value === this.min ||
        changedProperties.get("disableMax") ||
        changedProperties.get("disableMin")
      ) {
        this.jumpFocusToEnabled();
      }
    }
    /* eslint-disable no-extra-parens */
    if (
      (changedProperties.has("disableMax") &&
        changedProperties.get("disableMax") !== undefined) ||
      (changedProperties.has("disableMin") &&
        changedProperties.get("disableMin") !== undefined)
    ) {
      this.jumpFocusToEnabled();
    }
    /* eslint-enable no-extra-parens */
  }

  render() {
    return html`
      <div class="counter">
        <div class="content" >
          <label class="label"><slot></slot></label>
          <slot name="description"></slot>
        </div>
        
        <div part="counterControl">
          <auro-counter-button
          part="controlMinus"
          @click="${() => this.decrement()}"
          ?disabled="${this.disabled || this.disableMin || this.isIncrementDisabled(this.min)}"
          >
            <${this.iconTag} class="controlIcon" slot="icon" customSvg> ${IconUtil.generateSvgHtml(minusIcon)} </${this.iconTag}>
          </auro-counter-button>

          <div class="quantityWrapper">
            <div class="quantity">${this.value !== undefined ? this.value : this.min}</div>
          </div>

          <auro-counter-button
          part="controlPlus"
          @click="${() => this.increment()}"
          ?disabled="${this.disabled || this.disableMax || this.isIncrementDisabled(this.max)}"
          >
            <${this.iconTag} class="controlIcon" slot="icon" customSvg> ${IconUtil.generateSvgHtml(plusIcon)} </${this.iconTag}>
          </auro-counter-button>
        </div>
      </div>
    `;
  }
}

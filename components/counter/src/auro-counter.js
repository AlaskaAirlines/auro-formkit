/* eslint-disable lit/binding-positions, lit/no-invalid-html, max-lines */
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

    this.defaultSlot = undefined;
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

    /**
     * @private
     * @property {boolean} delegatesFocus - Whether the shadow root delegates focus.
     */
    this.constructor.shadowRootOptions = {
      ...LitElement.shadowRootOptions,
      delegatesFocus: true,
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this.handleKeyDown);
  }

  disconnectedCallback() {
    this.removeEventListener('keydown', this.handleKeyDown);
    super.disconnectedCallback();
  }

  /**
   * Defines reactive properties for the component.
   * @returns {Object} Property configuration.
   */
  static get properties() {
    return {

      /**
       * The default slot content.
       * @type {string}
       * @private
       */
      defaultSlot: {
        type: String,
      },

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
    if (this.disabled || this.disableMax || this.value >= this.max) {
      return;
    }

    this.value += value !== undefined ? value : 1;
  }

  /**
   * Decrements the value of the counter by 1. If a value is provided, it decrements by that amount.
   * @method decrement
   * @param {number} [value] - The amount to decrement by.
   * @returns {void}
   */
  decrement(value) {
    if (this.disabled || this.disableMin || this.value <= this.min) {
      return;
    }

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
   * Validates value.
   * @param {boolean} [force=false] - Whether to force validation.
   */
  validate(force = false) {
    this.validation.validate(this, force);
  }

  /**
   * Handles the keydown event for the counter component.
   * @param {KeyboardEvent} event - The keyboard event object.
   * @returns {void}
   * @private
   */
  handleKeyDown(event) {
    if (this.disabled) {
      return;
    }

    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        this.increment();
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.decrement();
        break;
      default:
        break;
    }
  }

  firstUpdated() {
    this.initValue();
  }

  /**
   * Handles the change event for the default slot.
   * Updates the defaultSlot property with the trimmed text content of the first assigned node.
   *
   * @param {Event} event - The event object representing the slot change event.
   * @private
   */
  onDefaultSlotChange(event) {
    const assignedNodes = event.target.assignedNodes();
    if (assignedNodes.length > 0) {
      this.defaultSlot = assignedNodes[0].textContent.trim();
    }
  }

  updated(changedProperties) {
    if (changedProperties.has("value")) {
      this.validate();
      this.dispatchEvent(
        new CustomEvent("input", {
          detail: {
            value: this.value,
          },
        }),
        {
          bubbles: true,
          composed: true,
        }
      );
    }
  }

  render() {
    return html`
      <div class="counter">
        <div class="content" >
          <label id="counter-label" class="label"><slot @slotchange="${this.onDefaultSlotChange}" ></slot></label>
          <slot id="counter-description" name="description"></slot>
        </div>
        <div part="counterControl" aria-labelledby="counter-label" aria-describedby="counter-description" tabindex="${this.disabled ? '-1' : '0'}" role="spinbutton" aria-valuemin="${this.min}" aria-valuemax="${this.max}" aria-valuenow="${this.value}">
          <auro-counter-button
          aria-hidden="true"
          iconOnly
          tabindex="-1"
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
          aria-hidden="true"
          iconOnly
          tabindex="-1"
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

/* eslint-disable lit/binding-positions, lit/no-invalid-html, max-lines */
// Copyright (c) 2025 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

import { LitElement } from "lit";
import { html } from "lit/static-html.js";
import { ifDefined } from 'lit/directives/if-defined.js';

import "./auro-counter-button.js";

import { AuroDependencyVersioning } from "@aurodesignsystem/auro-library/scripts/runtime/dependencyTagVersioning.mjs";
import AuroLibraryRuntimeUtils from "@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs";

import { AuroIcon } from "@aurodesignsystem/auro-icon/class";
import iconVersion from "./iconVersion.js";
import AuroFormValidation from "@auro-formkit/form-validation";

import { IconUtil } from "@auro-formkit/utils";
import plusIcon from '@alaskaairux/icons/dist/icons/interface/plus-lg.mjs';
import minusIcon from '@alaskaairux/icons/dist/icons/interface/minus-lg.mjs';

import tokensCss from "./styles/tokens-css.js";
import colorCss from "./styles/color-css.js";
import styleCss from "./styles/style-css.js";
import { AuroHelpText } from "@aurodesignsystem/auro-helptext";
import helptextVersion from "./helptextVersion.js";

/**
 * Auro Counter is a customizable counter component for user interface interactions.
 *
 * This web component provides a flexible counter interface with increment and decrement buttons,
 * supporting optional sub-labels and disabled states.
 *
 * @element auro-counter
 * @extends LitElement
 * @slot - Main label content for the counter.
 * @slot ariaLabel.minus - Accessible label for the decrement button.
 * @slot ariaLabel.plus - Accessible label for the increment button.
 * @slot helpText - Help text content for the counter.
 * @slot description - Descriptive content for the counter.
 */
export class AuroCounter extends LitElement {
  constructor() {
    super();

    this.appearance = "default";
    this.defaultSlot = undefined;
    this.disabled = false;
    this.disableMax = false;
    this.disableMin = false;
    this.max = 9;
    this.min = 0;
    this.onDark = false;
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
    this.iconTag = versioning.generateTag("auro-formkit-counter-icon", iconVersion, AuroIcon);

    /**
     * @private
     */
    this.helpTextTag = versioning.generateTag('auro-formkit-input-helptext', helptextVersion, AuroHelpText);

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
       * Defines whether the component will be on lighter or darker backgrounds.
       * @property {'default', 'inverse'}
       * @default 'default'
       */
      appearance: {
        type: String,
        reflect: true
      },

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
       * Error state and message.
       * True if set, value is the error message.
       */
      error: {
        type: String,
        reflect: false,
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
       * DEPRECATED - use `appearance` instead.
       */
      onDark: {
        type: Boolean,
        reflect: true
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
    this.setTagAttribute("auro-counter");
  }

  /**
   * Sets an attribute that matches the default tag name if the tag name is not the default.
   * @param {string} tagName - The tag name to set as an attribute.
   * @private
   */
  setTagAttribute(tagName) {
    if (this.tagName.toLowerCase() !== tagName) {
      this.setAttribute(tagName, true);
    }
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

  /**
   * Returns HTML for the help text and error message.
   * @private
   * @returns {html} - Returns HTML for the help text and error message.
   */
  renderHelpText() {
    return html`
      ${!this.validity || this.validity === undefined || this.validity === 'valid'
        ? html`
          <${this.helpTextTag} appearance="${this.onDark ? 'inverse' : this.appearance}">
            <p id="${this.uniqueId}" part="helpText">
              <slot name="helpText"></slot>
            </p>
          </${this.helpTextTag}>
        `
        : html`
          <${this.helpTextTag} error appearance="${this.onDark ? 'inverse' : this.appearance}"">
            <p id="${this.uniqueId}" role="alert" aria-live="assertive" part="helpText">
              ${this.errorMessage}
            </p>
          </${this.helpTextTag}>
        `
      }
    `;
  }

  render() {
    return html`
      <!-- Hidden slots for button aria-labels -->
      <slot name="ariaLabel.minus" hidden @slotchange=${this.requestUpdate}></slot>
      <slot name="ariaLabel.plus" hidden @slotchange=${this.requestUpdate}></slot>

      <div class="counterWrapper">
        <div class="counter">
          <div class="content" >
            <label id="counter-label" class="label">
              <slot @slotchange="${this.onDefaultSlotChange}"></slot>
            </label>
            <slot id="counter-description" name="description" class="body-xs"></slot>
          </div>
          <div 
            part="counterControl" 
            aria-describedby="counter-description" 
            aria-disabled="${ifDefined(this.disabled ? 'true' : undefined)}" 
            aria-labelledby="counter-label" 
            aria-valuemax="${this.max}" 
            aria-valuemin="${this.min}" 
            aria-valuenow="${this.value}"
            aria-valuetext="${this.value !== undefined ? this.value : this.min}"
            role="spinbutton" 
            tabindex="${this.disabled ? '-1' : '0'}" 
          >
            <auro-counter-button
              aria-label="${this.runtimeUtils.getSlotText(this, 'ariaLabel.minus') || '−'}"
              .tabindex="${'-1'}"
              appearance="${this.onDark ? 'inverse' : this.appearance}"
              part="controlMinus"
              @click="${() => this.decrement()}"
              ?disabled="${this.disabled || this.disableMin || this.isIncrementDisabled(this.min)}"
            >
              <${this.iconTag} class="controlIcon" customSvg> ${IconUtil.generateSvgHtml(minusIcon)} </${this.iconTag}>
            </auro-counter-button>

            <div class="quantityWrapper body-lg">
              <div>${this.value !== undefined ? this.value : this.min}</div>
            </div>
            <auro-counter-button
              aria-label="${this.runtimeUtils.getSlotText(this, 'ariaLabel.plus') || '+'}"
              .tabindex="${'-1'}"
              appearance="${this.onDark ? 'inverse' : this.appearance}"
              part="controlPlus"
              @click="${() => this.increment()}"
              ?disabled="${this.disabled || this.disableMax || this.isIncrementDisabled(this.max)}"
            >
              <${this.iconTag} class="controlIcon" customSvg> ${IconUtil.generateSvgHtml(plusIcon)} </${this.iconTag}>
            </auro-counter-button>
          </div>
        </div>
       ${this.renderHelpText()}
      </div>
    `;
  }
}

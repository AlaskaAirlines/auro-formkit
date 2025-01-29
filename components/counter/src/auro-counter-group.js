/* eslint-disable lit/no-invalid-html, lit/binding-positions */

// Copyright (c) 2025 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

import { html } from "lit/static-html.js";
import { LitElement } from "lit";

import styleCss from "./styles/counter-group-css.js";

import AuroLibraryRuntimeUtils from "@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs";
import AuroFormValidation from "@auro-formkit/form-validation";

import { AuroDependencyVersioning } from "@aurodesignsystem/auro-library/scripts/runtime/dependencyTagVersioning.mjs";
import { AuroDropdown } from "@aurodesignsystem/auro-dropdown";
import dropdownVersion from "./dropdownVersion.js";

import './auro-counter-wrapper.js';

/**
 * Auro Counter Group is a group of counter components.
 *
 * This web component provides a flexible interface for grouping multiple counters, supporting
 * validation, custom validity messages, and disabled states based on the group's value.
 *
 * @element auro-counter-group
 * @extends LitElement
 * @slot Default - Slot for counter elements.
 * @slot Label - Dropdown label content. Only used when `isDropdown` is true.
 * @slot ValueText - Dropdown value text display. Only used when `isDropdown` is true.
 * @slot HelpText - Dropdown help text content. Only used when `isDropdown` is true.
 */
export class AuroCounterGroup extends LitElement {
  constructor() {
    super();

    this.isDropdown = false;

    this.max = undefined;
    this.min = undefined;
    this.total = undefined;
    this.validity = undefined;
    this.value = undefined;

    /**
     * @private
     */
    this.counters = undefined;

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
     * Dynamically generated dropdown tag.
     * @private
     * @type {string}
     */
    this.dropdownTag = versioning.generateTag("auro-dropdown", dropdownVersion, AuroDropdown);
  }

  static get styles() {
    return [styleCss];
  }

  static get properties() {
    return {

      /**
       * Indicates if the counter group is displayed as a dropdown.
       */
      isDropdown: {
        type: Boolean
      },

      /**
       * The maximum value allowed for the whole group of counters.
       */
      max: {
        type: Number,
        reflect: true,
      },

      /**
       * The minimum value allowed for the whole group of counters.
       */
      min: {
        type: Number,
        reflect: true,
      },

      /**
       * Reflects the validity state.
       */
      validity: {
        type: String,
        reflect: true,
      },

      /**
       * The total value of the counters.
       */
      total: {
        type: Number,
      },

      /**
       * The current individual values of the nested counters.
       */
      value: {
        type: Object,
      }
    };
  }

  /**
   * Dynamically disables increment/decrement buttons on a counter based on group value.
   * This method checks the total aggregated value against the group's min and max properties.
   * If the total value is at or below the minimum, the counter's decrement button is disabled; if at or above the maximum, the increment button is disabled.
   *
   * @param {HTMLElement} counter - The counter element to potentially disable.
   * @private
   */
  manageDisabled(counter) {
    counter.disableMax = false;
    counter.disableMin = false;

    if (this.total <= this.min) {
      counter.disableMin = true;
    } else if (this.total >= this.max) {
      counter.disableMax = true;
    }
  }

  /**
   * Attaches input event listeners to all auro-counter elements within the component.
   * This method selects all `auro-counter` and `[auro-counter]` elements and adds an `input` event listener to each.
   * The listener calls `this.updateValue()` whenever the value of a counter changes.
   * @private
   */
  configureCounters() {
    this.counters = this.querySelectorAll("auro-counter, [auro-counter]");
    this.counters.forEach((counter) => {
      counter.addEventListener("input", () => this.updateValue());
    });
  }

  /**
   * Configures the dropdown counters by selecting all `auro-counter` elements
   * and appending them to the `auro-counter-wrapper` element within the shadow DOM.
   * Adds an event listener to each counter to update the value on input.
   * @private
   */
  configureDropdownCounters() {
    const counterWrapper = this.shadowRoot.querySelector('auro-counter-wrapper');
    this.counters = this.querySelectorAll("auro-counter, [auro-counter]");

    this.counters.forEach((counter) => {
      counterWrapper.append(counter);
    });

    this.counters = counterWrapper.querySelectorAll("auro-counter, [auro-counter]");
    this.counters.forEach((counter) => {
      counter.addEventListener("input", () => this.updateValue());
    });
  }

  /**
   * Safely converts a value to a number, returning 0 if invalid.
   * @private
   * @param {*} value - The value to convert.
   * @returns {number} The converted number or 0 if invalid.
   */
  safeNumberConversion(value) {
    const num = Number(value);
    return Number.isNaN(num) ? 0 : num;
  }

  /**
   * Updates the aggregate value based on the values of contained auro-counter components.
   * This method queries for all `auro-counter` elements, sums their values, and updates the component's `value` property.
   * Additionally, it iterates through each counter and calls `manageDisabled()` on it.
   * @private
   */
  updateValue() {
    this.value = Array.from(this.counters).reduce((acc, counter, index) => {
      const name = counter.hasAttribute('name') ? counter.getAttribute('name') : `counter-${index}`;
      acc[name] = this.safeNumberConversion(counter.value);
      return acc;
    }, {});

    this.total = Array.from(this.counters).reduce(
      (total, counter) => total + this.safeNumberConversion(counter.value),
      0,
    );

    this.counters.forEach((counter) => {
      this.manageDisabled(counter);
    });
  }

  /**
   * Validates value.
   * @param {boolean} [force=false] - Whether to force validation.
   */
  validate(force = false) {
    this.validation.validate(this, force);
  }

  updated(changedProperties) {
    if (changedProperties.has("value")) {
      this.validate();
      this.dispatchEvent(
        new CustomEvent("input", {
          detail: {
            total: this.total,
            value: this.value
          },
        }),
        {
          bubble: true,
          composable: true,
        }
      );
    }
  }

  /**
   * Registers the custom element with the browser.
   * @param {string} [name="auro-counter-group"] - Custom element name to register.
   * @example
   * AuroCounterGroup.register("custom-counter-group") // registers <custom-counter-group/>
   */
  static register(name = "auro-counter-group") {
    AuroLibraryRuntimeUtils.prototype.registerComponent(name, AuroCounterGroup);
  }

  // function that renders the HTML and CSS into the scope of the component
  render() {
    return html`
    ${this.isDropdown
      ? html`<${this.dropdownTag} common chevron>
        <div slot="trigger"><slot name="valueText">
          ${this.counters && Array.from(this.counters).map((counter, index) => `${counter.value} ${counter.shadowRoot.querySelector('.label slot').assignedNodes()[0].textContent}${index !== this.counters.length - 1 ? ', ' : ''}`)}
        </slot></div>
        <div slot="label"><slot name="label"></slot></div>
        <div slot="helpText"><slot name="helpText"></slot></div>
        <auro-counter-wrapper isInDropdown>
        </auro-counter-wrapper>
      </${this.dropdownTag}>
      <slot @slotchange=${() => this.configureDropdownCounters()}></slot>`
      : html`<auro-counter-wrapper><slot @slotchange=${() => this.configureCounters()}></slot></auro-counter-wrapper>`
    }`;
  }
}

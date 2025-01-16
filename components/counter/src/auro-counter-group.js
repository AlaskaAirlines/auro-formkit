// Copyright (c) 2025 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

import { html } from "lit/static-html.js";
import { LitElement } from "lit";
import styleCss from "./styles/counter-group-css.js";
import colorCss from "./styles/counter-group-color-css.js";
import AuroLibraryRuntimeUtils from "@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs";
import AuroFormValidation from "@auro-formkit/form-validation";

/**
 * Auro Counter Group is a group of counter components.
 *
 * This web component provides a flexible interface for grouping multiple counters, supporting
 * validation, custom validity messages, and disabled states based on the group's value.
 *
 * @element auro-counter-group
 * @extends LitElement
 * @slot Default - Slot for counter elements.
 */
export class AuroCounterGroup extends LitElement {
  constructor() {
    super();

    this.max = undefined;
    this.min = undefined;
    this.validity = undefined;
    this.value = undefined;

    /**
     * @private
     */
    this.validation = new AuroFormValidation();
  }

  static get styles() {
    return [
      colorCss,
      styleCss
    ];
  }

  static get properties() {
    return {

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
       * The current value.
       */
      value: {
        type: Number,
      },
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

    if (this.value <= this.min) {
      counter.disableMin = true;
    } else if (this.value >= this.max) {
      counter.disableMax = true;
    }
  }


  /**
   * Attaches input event listeners to all auro-counter elements within the component.
   * This method selects all `auro-counter` and `[auto-counter]` elements and adds an `input` event listener to each.
   * The listener calls `this.updateValue()` whenever the value of a counter changes.
   * @private
   */
  configureCounters() {
    const counters = this.querySelectorAll("auro-counter, [auto-counter]");
    counters.forEach((counter) => {
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
    const counters = this.querySelectorAll("auro-counter, [auro-counter]");
    this.value = Array.from(counters).reduce(
      (total, counter) => total + this.safeNumberConversion(counter.value),
      0,
    );
    counters.forEach((counter) => {
      this.manageDisabled(counter);
    });
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
      <div class="counters">
        <slot @slotchange=${() => this.configureCounters()}></slot>
      </div>
    `;
  }
}

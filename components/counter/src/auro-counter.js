/* eslint-disable no-console, lit/binding-positions, lit/no-invalid-html */
// Copyright (c) 2024 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

import { LitElement } from "lit";
import { html } from "lit/static-html.js";

import { AuroDependencyVersioning } from "@aurodesignsystem/auro-library/scripts/runtime/dependencyTagVersioning.mjs";
import AuroLibraryRuntimeUtils from "@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs";

import { AuroIcon } from "@aurodesignsystem/auro-icon/src/auro-icon.js";
import iconVersion from "./iconVersion.js";

import tokensCss from "./styles/tokens-css.js";
import styleCss from "./styles/style-css.js";

/**
 * AuroCounter is a customizable counter component for user interface interactions.
 *
 * This web component provides a flexible counter interface with increment and decrement buttons,
 * supporting optional sub-labels and disabled states.
 *
 * @element auro-counter
 * @extends LitElement
 * @slot - Default slot for main label content
 * @csspart counterControl - Styling hook for counter control section
 * @csspart controlMinus - Styling hook for minus button
 * @csspart controlPlus - Styling hook for plus button
 */
export class AuroCounter extends LitElement {
  constructor() {
    super();

    /** @type {string} Optional sub-label text for the counter */
    this.subLabel = "";

    /** @type {boolean} Determines whether the counter is interactive or disabled */
    this.disabled = false;

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
      subLabel: { type: String },
      disabled: {
        type: Boolean,
        reflect: true,
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
      styleCss
    ];
  }

  renderCounterControl() {
    return html`
      <div part="counterControl">
        <auro-counter-button
          part="controlMinus"
          @click="${() => console.log("click")}"
          ?disabled="${this.disabled}"
          >

          <${this.iconTag}
            category="interface"
            name="minus-lg"
            part="controlIcon"
            slot="icon"
          >
          </${this.iconTag}>
        </auro-counter-button>

        <div class="quantityWrapper">
          <div class="counterQuantity">1</div>
        </div>

        <auro-counter-button
          part="controlPlus"
          @click="${() => console.log("click")}"
          ?disabled="${this.disabled}"
          >

          <${this.iconTag}
            category="interface"
            name="plus-lg"
            part="controlIcon"
            slot="icon"
          >
          </${this.iconTag}>
        </auro-counter-button>
      </div>
      `;
  }

  renderCounterContent() {
    return html`
      <div class="counterContent">
        <label class="counterLabel"><slot></slot></label>
        ${this.subLabel
          ? html` <span class="subLabel"> ${this.subLabel} </span>`
          : undefined}
      </div>
    `;
  }

  render() {
    return html`
      <div class="counter">
        ${this.renderCounterContent()} ${this.renderCounterControl()}
      </div>
    `;
  }
}

/* istanbul ignore else */
// define the name of the custom component
if (!customElements.get("auro-counter")) {
  customElements.define("auro-counter", AuroCounter);
}

// Copyright (c) 2025 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

import { html } from "lit/static-html.js";
import { LitElement } from "lit";

import styleCss from "./styles/counter-wrapper-css.js";
import colorCss from "./styles/counter-wrapper-color-css.js";

import AuroLibraryRuntimeUtils from "@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs";

/**
 * Auro Counter Wrapper is a group of counter components.
 *
 * This web component provides a flexible interface for grouping multiple counters, supporting
 * validation, custom validity messages, and disabled states based on the group's value.
 *
 * @element auro-counter-group
 * @extends LitElement
 * @slot Default - Slot for counter elements.
 */
export class AuroCounterWrapper extends LitElement {

  static get styles() {
    return [
      colorCss,
      styleCss
    ];
  }

  /**
   * Registers the custom element with the browser.
   * @param {string} [name="auro-counter-wrapper"] - Custom element name to register.
   * @example
   * AuroCounterWrapper.register("custom-counter-wrapper") // registers <custom-counter-wrapper/>
   */
  static register(name = "auro-counter-wrapper") {
    AuroLibraryRuntimeUtils.prototype.registerComponent(name, AuroCounterWrapper);
  }

  // function that renders the HTML and CSS into the scope of the component
  render() {
    return html`<slot></slot>`;
  }
}

/* istanbul ignore else */
// define the name of the custom component
if (!customElements.get("auro-counter-wrapper")) {
  customElements.define("auro-counter-wrapper", AuroCounterWrapper);
}


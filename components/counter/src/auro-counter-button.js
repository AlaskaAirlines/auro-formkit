// Copyright (c) 2026 Alaska Airlines. All rights reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

import styleButtonTokenCss from "./styles/tokens-css.js";
import styleButtonColorCss from "./styles/counter-button-color-css.js";
import styleButtonCss from "./styles/counter-button-css.js";

import { AuroButton } from "@aurodesignsystem/auro-button/class";

import * as RuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';

/**
 * The minus or plus button inside `auro-counter`.
 * @customElement auro-counter-button
 * @internal
 */
export class AuroCounterButton extends AuroButton {

  constructor() {
    super();

    this.size = "sm";
    this.shape = "rounded";
  }

  static get styles() {
    return [
      styleButtonCss,
      styleButtonColorCss,
      styleButtonTokenCss
    ];
  }

  /**
   * Registers the custom element with the browser.
   * @param {string} [name="auro-counter-button"] - The tag name to register the element under.
   *
   * @example
   * AuroCounterButton.register("custom-counter-button") // registers <custom-counter-button/>
   *
   */
  static register(name = "auro-counter-button") {
    RuntimeUtils.default.prototype.registerComponent(name, AuroCounterButton);
  }
}

/* istanbul ignore else */
// define the name of the custom component
if (!customElements.get("auro-counter-button")) {
  customElements.define("auro-counter-button", AuroCounterButton);
}

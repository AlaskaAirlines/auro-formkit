// Copyright (c) 2022 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

import styleButtonCss from "./styles/counter-button-css.js";
import styleCssAuroButton from "@aurodesignsystem/auro-button/src/style-css.js";

import { AuroButton } from "@aurodesignsystem/auro-button/src/auro-button.js";

import * as RuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';

// build the component class
export class AuroCounterButton extends AuroButton {
  static get styles() {
    return [
      styleCssAuroButton,
      styleButtonCss
    ];
  }

  /**
   * This will register this element with the browser.
   * @param {string} [name="auro-counter-button"] - The name of element that you want to register to.
   *
   * @example
   * AuroCounterButton.register("custom-counter-button") // this will register this element to <custom-counter-button/>
   *
   */
  static register(name = "auro-counter-button") {
    RuntimeUtils.default.prototype.registerComponent(name, AuroCounterButton);
  }
}

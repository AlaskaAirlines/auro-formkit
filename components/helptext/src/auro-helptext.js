// Copyright (c) 2020 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

import { LitElement, html } from "lit";

import styleCss from "./styles/style-css.js";
import tokensCss from "./styles/tokens-css.js";

import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';

/**
 * Custom element for the purpose of allowing users to select one or more options of a limited number of choices.
 */

// build the component class
export class AuroHelpText extends LitElement {

  constructor() {
    super();

    this.error = false;
    this.hasSlot = false;
  }

  static get styles() {
    return [
      styleCss,
      tokensCss
    ];
  }

  // function to define props used within the scope of this component
  static get properties() {
    return {

      /**
       * @private
       */
      hasSlot: {
        type: Boolean,
      },

      /**
       * If declared in combination with `bordered` property or `helpText` slot content, will apply red color to both.
       */
      error: {
        type: Boolean,
        reflect: true,
      },
    };
  }

  /**
   * This will register this element with the browser.
   * @param {string} [name="auro-helptext"] - The name of element that you want to register to.
   *
   * @example
   * AuroCheckbox.register("custom-helptext") // this will register this element to <custom-helptext/>
   *
   */
  static register(name = "auro-helptext") {
    AuroLibraryRuntimeUtils.prototype.registerComponent(name, AuroHelpText);
  }

  handleSlotChange(event) {
    const nodes = event.target.assignedNodes();
    this.hasSlot = nodes && nodes.length >= 1;
  }

  // function that renders the HTML and CSS into  the scope of the component
  render() {
    return html`
      <div class="helptext-wrapper" visible="${this.hasSlot}">
          <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
  }
}

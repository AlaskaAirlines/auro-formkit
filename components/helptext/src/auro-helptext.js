// Copyright (c) 2025 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

import { LitElement, html } from "lit";

import colorCss from "./styles/color-css.js";
import styleCss from "./styles/style-css.js";
import tokensCss from "./styles/tokens-css.js";

import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';

/**
 * Displays help text or error messages within form elements - Internal Use Only.
 */
export class AuroHelpText extends LitElement {

  constructor() {
    super();

    this.error = false;
    this.hasTextContent = false;
  }

  static get styles() {
    return [
      colorCss,
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
      slotNodes: {
        type: Boolean,
      },

      /**
       * @private
       */
      hasTextContent: {
        type: Boolean,
      },

      /**
       * If declared, make font color red.
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

  updated() {
    this.handleSlotChange();
  }

  handleSlotChange(event) {
    if (event) {
      this.slotNodes = event.target.assignedNodes();
    }

    if (this.slotNodes) {
      this.hasTextContent = this.slotNodes.some((slot) => {
        if (slot.textContent.trim()) {
          return true;
        }

        if (!slot.querySelector) {
          return false;
        }

        const nestedSlot = slot.tagName === 'SLOT' ? slot : slot.querySelector('slot');
        if (!nestedSlot) {
          return false;
        }
        const nestedSlotNodes = nestedSlot.assignedNodes();
        return nestedSlotNodes.some((ss) => Boolean(ss.textContent.trim()));
      });
    } else {
      this.hasTextContent = false;
    }
  }

  // function that renders the HTML and CSS into  the scope of the component
  render() {
    return html`
      <div class="helptext-wrapper" ?visible="${this.hasTextContent}">
          <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
  }
}

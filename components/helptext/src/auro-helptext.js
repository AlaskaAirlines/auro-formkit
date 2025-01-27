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
    this.hasTextContent = false;
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

  updated() {
    this.handleSlotChange();
  }

  handleSlotChange(event) {
    if (event) {
      this.slotNode = event.target.assignedNodes();
    }

    if (this.slotNode) {
      this.hasTextContent = this.slotNode.some((slot) => {
        if (slot.textContent.trim()) {
          return true;
        }

        if (!slot.querySelector) {
          return false;
        }

        const slotInSlot = slot.tagName === 'SLOT' ? slot : slot.querySelector('slot');
        if (!slotInSlot) {
          return false;
        }
        const slotsInSlotNodes = slotInSlot.assignedNodes();
        return slotsInSlotNodes.some((ss) => Boolean(ss.textContent.trim()));
      });
    } else {
      this.hasTextContent = false;
    }
  }

  // function that renders the HTML and CSS into  the scope of the component
  render() {
    return html`
      <div class="helptext-wrapper" visible="${this.hasTextContent}">
          <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
  }
}

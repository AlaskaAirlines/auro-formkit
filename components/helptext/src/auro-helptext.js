// Copyright (c) 2025 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

import { LitElement, html } from "lit";

import colorCss from "./styles/color-css.js";
import styleCss from "./styles/style-css.js";
import tokensCss from "./styles/tokens-css.js";

import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';

/**
 * Shows help text or an error message below a form element. It's meant for use inside Auro form components only.
 *
 * **Key capabilities**
 * - **Error style**: `error` shows the text in the error color.
 * - **Dark backgrounds**: `appearance="inverse"` switches to colors designed for dark backgrounds.
 * - **Hidden when empty**: The element always stays hidden until its slot has text content.
 *
 * **Example**
 * ```html
 * <auro-helptext error>Enter a valid email address.</auro-helptext>
 * ```
 *
 * @slot default - The help text or error message to show. The element stays hidden while this slot has no text.
 */
export class AuroHelpText extends LitElement {

  constructor() {
    super();

    this.error = false;

    /** @type {'default' | 'inverse'} */
    this.appearance = "default";
    this.onDark = false;
    this.hasTextContent = false;

    AuroLibraryRuntimeUtils.prototype.handleComponentTagRename(this, 'auro-helptext');
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
       * Sets the help text's colors. Use `default` on light backgrounds and `inverse` on dark backgrounds.
       * @type {'default' | 'inverse'}
       * @default 'default'
       */
      appearance: {
        type: String,
        reflect: true
      },

      /**
       * @private
       */
      slotNodes: {
        type: Boolean,
        attribute: 'slotnodes',
      },

      /**
       * @private
       */
      hasTextContent: {
        type: Boolean,
        attribute: 'hastextcontent',
      },

      /**
       * Shows the text in the error color. Use it when the help text is an error message.
       */
      error: {
        type: Boolean,
        reflect: true,
      },

      /**
       * Deprecated: Use `appearance="inverse"` instead.
       * Shows the text in colors designed for dark backgrounds.
       * @deprecated Use `appearance="inverse"` instead.
       */
      onDark: {
        type: Boolean,
        attribute: 'ondark',
        reflect: true
      }
    };
  }

  /**
   * Registers the element with the browser under a tag name.
   * @param {string} [name="auro-helptext"] - The tag name to register the element under.
   *
   * @example
   * AuroHelpText.register("custom-helptext") // registers as <custom-helptext>
   *
   */
  static register(name = "auro-helptext") {
    AuroLibraryRuntimeUtils.prototype.registerComponent(name, AuroHelpText);
  }

  updated() {
    this.handleSlotChange();
  }

  /**
   * Called when the slot's content changes and after each update. Checks whether the slot has text, so the element shows only when it does.
   * @param {Event} [event] - The `slotchange` event, when called from one.
   * @returns {void}
   */
  handleSlotChange(event) {
    if (event) {
      this.slotNodes = event.target.assignedNodes();
    }

    this.hasTextContent = this.checkSlotsForContent(this.slotNodes);
  }

  /**
   * Checks whether any of the nodes, or the nodes assigned to a slot nested in them, have non-empty text content.
   *
   * @param {Node[]} nodes - The list of nodes to check for content.
   * @returns {boolean} True if any node or nested slot node has non-empty text content; false otherwise.
   * @private
   */
  checkSlotsForContent(nodes) {
    if (!nodes) {
      return false;
    }

    return nodes.some((node) => {
      if (node.textContent.trim()) {
        return true;
      }

      if (!node.querySelector) {
        return false;
      }

      const nestedSlot = node.tagName === 'SLOT' ? node : node.querySelector('slot');
      if (!nestedSlot) {
        return false;
      }

      const nestedSlotNodes = nestedSlot.assignedNodes();
      return this.checkSlotsForContent(nestedSlotNodes);
    });
  }

  // function that renders the HTML and CSS into  the scope of the component
  render() {
    return html`
      <div class="helptext-wrapper body-xs" ?visible="${this.hasTextContent}">
          <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
  }
}

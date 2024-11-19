// Copyright (c) 2020 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

import { html } from "lit/static-html.js";
import { LitElement } from "lit";

import styleCss from "./styles/bibStyles-css.js";
import colorCss from "./styles/bibColors-css.js";
import tokensCss from "./styles/tokens-css.js";

/**
 * @attr { Boolean } common - If declared, will apply all styles for the common theme.
 * @attr { Boolean } rounded - If declared, will apply border-radius to the bib.
 * @attr { Boolean } inset - If declared, will apply extra padding to bib content.
 * @csspart bibContainer - Apply css to the bib container.
 */

export class AuroDropdownBib extends LitElement {

  static get styles() {
    return [
      styleCss,
      colorCss,
      tokensCss
    ];
  }

  static get properties() {
    return {
      common: {
        type: Boolean,
        reflect: true
      },
      inset: {
        type: Boolean,
        reflect: true
      },
      rounded: {
        type: Boolean,
        reflect: true
      }
    };
  }

  // function that renders the HTML and CSS into  the scope of the component
  render() {
    return html`
      <div class="container" part="bibContainer">
        <slot></slot>
      </div>
    `;
  }
}

// default internal definition
if (!customElements.get("auro-dropdownbib")) {
  customElements.define("auro-dropdownbib", AuroDropdownBib);
}

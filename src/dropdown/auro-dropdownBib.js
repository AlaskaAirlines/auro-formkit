// Copyright (c) 2020 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

import { html } from "lit/static-html.js";
import { LitElement } from "lit";

import styleCss from "./bibStyles-css.js";
// import colorCss from "./color-css.js";
// import tokensCss from "./tokens-css.js";

export class AuroDropdownBib extends LitElement {

  static get styles() {
    return [styleCss];
  }

  // createRenderRoot() {
  //   console.warn('createRenderRoot');
  //   return document.querySelector('body');
  // //   return document.querySelector('#auro-dropdownBibContent');
  // }

  // updated() {
  //   const elem = document.
  // }

  // function that renders the HTML and CSS into  the scope of the component
  render() {

    return html`
      <div class="container">
        <slot></slot>
      </div>
    `;
  }
}


// // default internal definition
// if (!customElements.get("auro-dropdownbib")) {
//   customElements.define("auro-dropdownbib", AuroDropdownBib);
// }

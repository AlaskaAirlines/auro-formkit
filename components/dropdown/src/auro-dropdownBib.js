// Copyright (c) 2020 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

/* eslint-disable no-underscore-dangle */

import { html } from "lit/static-html.js";
import { LitElement } from "lit";

import styleCss from "./styles/bibStyles-css.js";
import colorCss from "./styles/bibColors-css.js";
import tokensCss from "./styles/tokens-css.js";


const DESIGN_TOKEN_BREAKPOINT_PREFIX = '--ds-grid-breakpoint-';
const DESIGN_TOKEN_BREAKPOINT_OPTIONS = [
  'lg',
  'md',
  'sm',
  'xs',
];

/**
 * @prop { String } mobileFullscreenBreakpoint - Defines the screen size breakpoint (`lg`, `md`, `sm`, or `xs`) at which the dropdown switches to fullscreen mode on mobile. When expanded, the dropdown will automatically display in fullscreen mode if the screen size is equal to or smaller than the selected breakpoint.
 * @csspart bibContainer - Apply css to the bib container.
 */

export class AuroDropdownBib extends LitElement {

  constructor() {
    super();

    /**
     * @private
     */
    this._mobileBreakpointValue = undefined;
  }

  static get styles() {
    return [
      styleCss,
      colorCss,
      tokensCss
    ];
  }

  static get properties() {
    return {

      /**
       * If declared, will apply all styles for the common theme.
       */
      common: {
        type: Boolean,
        reflect: true
      },

      /**
       * If declared, will apply extra padding to bib content.
       */
      inset: {
        type: Boolean,
        reflect: true
      },

      /**
       * If declared, will apply border-radius to the bib.
       */
      rounded: {
        type: Boolean,
        reflect: true
      },
    };
  }

  set mobileFullscreenBreakpoint(value) {
    // verify the defined breakpoint is valid and exit out if not
    const validatedValue = DESIGN_TOKEN_BREAKPOINT_OPTIONS.includes(value) ? value : undefined;
    if (!validatedValue) {
      this._mobileBreakpointValue = undefined;
    } else {
      // get the pixel value for the defined breakpoint
      const docStyle = getComputedStyle(document.documentElement);
      this._mobileBreakpointValue = docStyle.getPropertyValue(DESIGN_TOKEN_BREAKPOINT_PREFIX + value);
    }
  }

  get mobileFullscreenBreakpoint() {
    return this._mobileBreakpointValue;
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

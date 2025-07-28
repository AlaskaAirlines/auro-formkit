// Copyright (c) Alaska Air. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

import { html } from "lit/static-html.js";

export class IconUtil {

  /**
   * Generates an HTML element containing an SVG icon based on the provided `svgContent`.
   *
   * @param {string} svgContent - The SVG content to be embedded.
   * @param {Object} _attributes - Additional attributes to set on the icon element.
   * @returns {Element} The HTML element containing the SVG icon.
   */
  static generateSvgHtml(svgContent) {
    try {
      const dom = new DOMParser().parseFromString(svgContent.svg, 'text/html');
      const svg = dom.body.firstChild;
      
      svg.setAttribute('slot', 'svg');

      return html`${svg}`;
    } catch (err) {
      return undefined;
    }
  }
}

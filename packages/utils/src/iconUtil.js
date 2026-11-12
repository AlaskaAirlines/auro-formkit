// Copyright (c) Alaska Air. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

import { html } from "lit/static-html.js";

export class IconUtil {

  /**
   * Creates a Lit template that renders an icon's `<svg>` element in the `svg` slot.
   *
   * @param {{ svg: string }} svgContent - The icon object, such as one imported from `@alaskaairux/icons`, whose `svg` property holds the SVG markup.
   * @returns {import('lit').TemplateResult|undefined} The template with the `<svg>` element, or undefined when the markup can't be parsed.
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

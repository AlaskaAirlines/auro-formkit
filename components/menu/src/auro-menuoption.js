// Copyright (c) 2021 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

/* eslint-disable lit/binding-positions, lit/no-invalid-html */

// ---------------------------------------------------------------------
import { html } from 'lit/static-html.js';

import styleCss from "./styles/default/style-menuoption-css.js";
import colorCss from "./styles/default/color-menuoption-css.js";
import tokensCss from "./styles/default/tokens-css.js";

import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';
import { AuroDependencyVersioning } from '@aurodesignsystem/auro-library/scripts/runtime/dependencyTagVersioning.mjs';

import { AuroElement } from "../../layoutElement/src/auroElement.js";

import { AuroIcon } from '@aurodesignsystem/auro-icon/src/auro-icon.js';
import iconVersion from './iconVersion.js';

import checkmarkIcon from '@alaskaairux/icons/dist/icons/interface/checkmark-sm.mjs';

/**
 * The auro-menu element provides users a way to define a menu option.
 *
 * @attr {String} value - Specifies the value to be sent to a server.
 * @attr {String} noCheckmark - When true, selected option will not show the checkmark.
 * @attr {Boolean} disabled - When true specifies that the menuoption is disabled.
 * @attr {Boolean} selected - Specifies that an option is selected.
 * @event auroMenuOption-mouseover - Notifies that this option has been hovered over.
 * @slot - Specifies text for an option, but is not the value.
 */
export class AuroMenuOption extends AuroElement {
  constructor() {
    super();

    this.size = "medium";
    this.shape = "rounded";

    /**
     * Generate unique names for dependency components.
     */
    const versioning = new AuroDependencyVersioning();
    this.iconTag = versioning.generateTag('auro-formkit-menuoption-icon', iconVersion, AuroIcon);

    this.selected = false;
    this.nocheckmark = false;
    this.disabled = false;

    /**
     * @private
     */
    this.tabIndex = -1;

    /**
     * @private
     */
    this.runtimeUtils = new AuroLibraryRuntimeUtils();
  }

  static get properties() {
    return {
      ...super.properties,
      nocheckmark: {
        type: Boolean,
        reflect: true
      },
      selected:  {
        type: Boolean,
        reflect: true
      },
      disabled:  {
        type: Boolean,
        reflect: true
      },
      value: {
        type: String
      },
      tabIndex: {
        type: Number,
        reflect: true
      }
    };
  }

  static get styles() {
    return [
      styleCss,
      colorCss,
      tokensCss
    ];
  }

  /**
   * This will register this element with the browser.
   * @param {string} [name="auro-menuoption"] - The name of element that you want to register to.
   *
   * @example
   * AuroMenuOption.register("custom-menuoption") // this will register this element to <custom-menuoption/>
   *
   */
  static register(name = "auro-menuoption") {
    AuroLibraryRuntimeUtils.prototype.registerComponent(name, AuroMenuOption);
  }

  firstUpdated() {
    // Add the tag name as an attribute if it is different than the component name
    this.runtimeUtils.handleComponentTagRename(this, 'auro-menuoption');

    this.setAttribute('role', 'option');
    this.setAttribute('aria-selected', 'false');

    this.addEventListener('mouseover', () => {
      this.dispatchEvent(new CustomEvent('auroMenuOption-mouseover', {
        bubbles: true,
        cancelable: false,
        composed: true,
        detail: this
      }));
    });
  }

  // observer for selected property changes
  updated(changedProperties) {
    super.updated(changedProperties);

    if (changedProperties.has('selected')) {
      this.setAttribute('aria-selected', this.selected.toString());
    }
  }

  /**
   * Generates an HTML element containing an SVG icon based on the provided `svgContent`.
   *
   * @private
   * @param {string} svgContent - The SVG content to be embedded.
   * @returns {Element} The HTML element containing the SVG icon.
   */
  generateIconHtml(svgContent) {
    const dom = new DOMParser().parseFromString(svgContent, 'text/html');
    const svg = dom.body.firstChild;

    svg.setAttribute('slot', 'svg');

    return html`<${this.iconTag} customColor customSvg slot="icon">${svg}</${this.iconTag}>`;
  }

  /**
   * Logic to determine the layout of the component.
   * @protected
   * @returns {void}
   */
  renderLayout() {
    return html`
      <div class="wrapper">
        ${this.selected && !this.nocheckmark
          ? this.generateIconHtml(checkmarkIcon.svg)
          : undefined}
        <slot></slot>
      </div>
    `;
  }
}

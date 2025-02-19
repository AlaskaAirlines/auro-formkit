// Copyright (c) 2025 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------


/* eslint-disable lit/no-invalid-html, lit/binding-positions */

import { LitElement } from "lit";
import { html } from "lit/static-html.js";

import styleCss from "./styles/style-css.js";
import colorCss from "./styles/color-css.js";

import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';
import { AuroDependencyVersioning } from '@aurodesignsystem/auro-library/scripts/runtime/dependencyTagVersioning.mjs';

import { AuroIcon } from '@aurodesignsystem/auro-icon/src/auro-icon.js';
import iconVersion from './iconVersion.js';

import { AuroHeader } from '@aurodesignsystem/auro-header/src/auro-header.js';
import headerVersion from './headerVersion.js';

export class AuroBibtemplate extends LitElement {

  constructor() {
    super();

    const versioning = new AuroDependencyVersioning();
    this.iconTag = versioning.generateTag('auro-icon', iconVersion, AuroIcon);
    this.headerTag = versioning.generateTag('auro-header', headerVersion, AuroHeader);
  }

  static get styles() {
    return [
      colorCss,
      styleCss
    ];
  }

  // function to define props used within the scope of this component
  static get properties() {
    return {
      isFullscreen: {
        type: Boolean,
        reflect: true,
      },
      large: {
        type: Boolean,
        reflect: true,
      }
    };
  }

  // function to define props used within the scope of this component
  /**
   * This will register this element with the browser.
   * @param {string} [name="auro-bibtemplate"] - The name of element that you want to register to.
   *
   * @example
   * AuroCheckbox.register("custom-bibtemplate") // this will register this element to <custom-bibtemplate/>
   *
   */
  static register(name = "auro-bibtemplate") {
    AuroLibraryRuntimeUtils.prototype.registerComponent(name, AuroBibtemplate);
  }

  onCloseButtonClick() {
    this.dispatchEvent(new Event("close-click", { bubbles: true,
      composed: true }));
  }

  /**
   * Exposes CSS parts for styling from parent components.
   * @returns {void}
   */
  exposeCssParts() {
    this.setAttribute('exportparts', 'bibtemplate:dropdownBibTemplate');
  }

  // function that renders the HTML and CSS into  the scope of the component
  render() {
    return html`
      <div id="bibTemplate" part="bibtemplate">
      ${this.isFullscreen ? html`
        <div id="headerContainer">
          <button id="closeButton" @click="${this.onCloseButtonClick}">
            <${this.iconTag} category="interface" name="x-lg"></${this.iconTag}>
          </button>
          <${this.headerTag} display="${this.large ? 'display' : '600'}" level="3" size="none" id="header">
            <slot name="header"></slot>
          </${this.headerTag}>
          <span id="subheader">
            <slot name="subheader"></slot>
          </span>
        </div>` : null}

        <div id="bodyContainer">
          <slot></slot>
        </div>

      ${this.isFullscreen ? html`
        <div id="footerContainer">
          <slot name="footer"></slot>
        </div>` : null}
      </div>
      `;
  }
}

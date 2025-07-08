// Copyright (c) 2025 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------


/* eslint-disable lit/no-invalid-html, lit/binding-positions */

import { LitElement } from "lit";
import { html } from "lit/static-html.js";

import colorCss from "./styles/color-css.js";
import styleCss from "./styles/style-css.js";
import tokenCss from "./styles/tokens-css.js";

import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';
import { AuroDependencyVersioning } from '@aurodesignsystem/auro-library/scripts/runtime/dependencyTagVersioning.mjs';

import { AuroButton } from '@aurodesignsystem/auro-button/src/auro-button.js';
import buttonVersion from './buttonVersion.js';

import { AuroIcon } from '@aurodesignsystem/auro-icon/src/auro-icon.js';
import iconVersion from './iconVersion.js';

import { AuroHeader } from '@aurodesignsystem/auro-header/src/auro-header.js';
import headerVersion from './headerVersion.js';

export class AuroBibtemplate extends LitElement {

  constructor() {
    super();

    this.large = false;

    AuroLibraryRuntimeUtils.prototype.handleComponentTagRename(this, 'auro-bibtemplate');

    const versioning = new AuroDependencyVersioning();

    /**
     * @private
     */
    this.iconTag = versioning.generateTag('auro-formkit-bibtemplate-icon', iconVersion, AuroIcon);

    /**
     * @private
     */
    this.headerTag = versioning.generateTag('auro-formkit-bibtemplate-header', headerVersion, AuroHeader);

    /**
     * @private
     */
    this.buttonTag = versioning.generateTag('auro-formkit-bibtemplate-button', buttonVersion, AuroButton);
  }

  static get styles() {
    return [
      colorCss,
      styleCss,
      tokenCss
    ];
  }

  // function to define props used within the scope of this component
  static get properties() {
    return {
      isFullscreen: {
        type: Boolean,
        reflect: true
      },
      large: {
        type: Boolean,
        reflect: true
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

  /**
   * Prevents scrolling of the body when touching empty areas of the component.
   * @param {Event} event - The touchmove event.
   * @returns {void}
   */
  preventBodyScroll(event) {
    if (event.target === this) {
      event.preventDefault();
    }
  }

  connectedCallback() {
    super.connectedCallback();

    this.preventBodyScroll = this.preventBodyScroll.bind(this);
    this.addEventListener('touchmove', this.preventBodyScroll, { passive: false });
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener('touchmove', this.preventBodyScroll, { passive: false });
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

  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);

    this.dispatchEvent(new CustomEvent("auro-bibtemplate-connected", {
      bubbles: true,
      composed: true,
      detail: {
        element: this
      }
    }));
  }

  // function that renders the HTML and CSS into  the scope of the component
  render() {
    return html`
      <div id="bibTemplate" part="bibtemplate">
      ${this.isFullscreen ? html`
        <div id="headerContainer">
          <${this.buttonTag} id="closeButton" aria-label="Close" variant="ghost" shape="circle" size="sm" @click="${this.onCloseButtonClick}">
            <${this.iconTag} category="interface" name="x-lg"></${this.iconTag}>
          </${this.buttonTag}>
          <${this.headerTag} display="${this.large ? 'display' : '600'}" level="3" size="none" id="header" no-margin-block>
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

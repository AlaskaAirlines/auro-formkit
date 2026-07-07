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

import { AuroIcon } from '@aurodesignsystem/auro-icon/class';
import iconVersion from './iconVersion.js';

import checkmarkIcon from '@alaskaairux/icons/dist/icons/interface/checkmark-sm.mjs';
import { classMap } from 'lit/directives/class-map.js';

let menuOptionIdCounter = 0;

/**
 * The `auro-menuoption` element provides users a way to define a menu option.
 * @customElement auro-menuoption
 *
 * @slot default - The default slot for the menu option text.
 *
 * @event auroMenuOption-mouseover - Notifies that this option has been hovered over.
 * @event auroMenuOption-click - Notifies that this option has been clicked.
 */
export class AuroMenuOption extends AuroElement {
  constructor() {
    super();

    /**
     * @private
     */
    this.shape = undefined;

    /**
     * @private
     */
    this.size = undefined;

    /**
     * Generate unique names for dependency components.
     */
    const versioning = new AuroDependencyVersioning();
    this.iconTag = versioning.generateTag('auro-formkit-menuoption-icon', iconVersion, AuroIcon);

    this.selected = false;
    this.noCheckmark = false;
    this.disabled = false;
    this.noMatch = false;

    /**
     * @private
     */
    this.tabIndex = -1;

    /**
     * @private
     */
    this.runtimeUtils = new AuroLibraryRuntimeUtils();

    this.addEventListener('click', this.handleClick.bind(this));
  }

  static get properties() {
    return {
      ...super.properties,
      noCheckmark: {
        type: Boolean,
        reflect: true
      },

      /**
       * **Deprecated.** Use the `value` attribute on `auro-menu` to set the selected option when the menu renders (or call `menu.selectByValue(value)` programmatically). Support for the child-level `selected` attribute will be removed in a future major release.
       *
       * @deprecated Use the `value` attribute on `auro-menu` instead.
       */
      selected: {
        type: Boolean,
        reflect: true
      },
      disabled: {
        type: Boolean,
        reflect: true
      },
      value: {
        type: String,
        reflect: true
      },
      tabIndex: {
        type: Number,
        reflect: true
      },

      /**
       * @private
       */
      event: {
        type: String,
        reflect: true
      },

      /**
       * When true, marks this option as the "no matching results" placeholder shown by combobox
       * when the user's input does not match any available options.
       */
      noMatch: {
        type: Boolean,
        reflect: true,
        attribute: 'nomatch'
      },
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

  /**
   * Returns whether the menu option is currently active and selectable.
   * @returns {boolean}
   */
  get isActive() {
    return !this.hasAttribute('hidden') &&
      !this.disabled &&
      !this.hasAttribute('static');
  }

  connectedCallback() {
    super.connectedCallback();

    this.runtimeUtils.handleComponentTagRename(this, 'auro-menuoption');
  }

  firstUpdated() {
    this.runtimeUtils.handleComponentTagRename(this, 'auro-menuoption');

    // firstUpdated can fire on an option that was detached before the first
    // render completed (e.g. dynamic-menu rebuilds clear and repopulate the
    // menu mid-cycle). parentElement is null in that case — fall back to
    // defaults; the next render after re-attachment will pick up real values.
    if (!this.hasAttribute('size')) {
      this.size = this.parentElement ? this.parentElement.getAttribute('size') || 'sm' : 'sm';
    }
    if (!this.hasAttribute('shape')) {
      this.shape = this.parentElement ? this.parentElement.getAttribute('shape') || 'box' : 'box';
    }

    if (!this.id) {
      menuOptionIdCounter += 1;
      this.id = `menuoption-${menuOptionIdCounter}`;
    }

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

  updated(changedProperties) {
    super.updated(changedProperties);

    if (changedProperties.has('selected')) {
      this.setAttribute('aria-selected', this.selected.toString());
    }

    if (changedProperties.has('disabled')) {
      if (this.disabled) {
        this.setAttribute('aria-disabled', 'true');
      } else {
        this.removeAttribute('aria-disabled');
      }
    }
  }

  handleMenuChange() {
    // no-op: menu owns state in the distributed architecture
  }

  setSelected(value) {
    this.selected = value;
  }

  updateActive(active) {
    this.active = active;
    if (active) {
      this.classList.add('active');
    } else {
      this.classList.remove('active');
    }
  }

  attachTo() {
    // no-op: menu owns state in the distributed architecture
  }

  /**
   * Handles click events on the menu option.
   * @private
   */
  handleClick() {
    if (!this.disabled) {
      // Pure event emitter: the parent menu owns selection state and will
      // update `selected` via setSelected(). Toggling here desyncs the option
      // UI from auro-menu.optionSelected (e.g. single-select re-click on the
      // already-selected option would flip the option off while the menu keeps it on).
      this.dispatchEvent(new CustomEvent('auroMenuOption-click', {
        bubbles: true,
        cancelable: false,
        composed: true,
        detail: this
      }));
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

    return html`<${this.iconTag} customColor customSvg>${svg}</${this.iconTag}>`;
  }

  /**
   * Logic to determine the layout of the component.
   * @protected
   * @returns {void}
   */
  renderLayout() {

    const fontClassMap = {
      xs: 'body-sm',
      sm: 'body-default',
      md: 'body-default',
      lg: 'body-lg',
      xl: 'body-lg'
    };

    const classes = classMap({
      'wrapper': true,
      [this.size ? fontClassMap[this.size] : 'body-sm']: true,
    });

    return html`
      <div class="${classes}">
        ${this.selected && !this.noCheckmark
          ? this.generateIconHtml(checkmarkIcon.svg)
          : undefined}
        <slot></slot>
      </div>
    `;
  }
}

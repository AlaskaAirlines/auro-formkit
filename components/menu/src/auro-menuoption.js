// Copyright (c) 2021 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

/* eslint-disable lit/binding-positions, lit/no-invalid-html */
/* eslint-disable max-lines -- JSDoc/CEM documentation additions push this file past the 300-line ceiling */

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
import { hasDisabledAncestorMenu } from './auro-menu-utils.js';

let menuOptionIdCounter = 0;

/**
 * One option in an `auro-menu` list, which people can highlight and select.
 *
 * **Key capabilities**
 * - **Disabled option**: Set `disabled` to show the option in a muted style and stop it from being selected.
 * - **Rows that can't be selected**: Set `static` to show a row, such as a section heading, that the arrow keys skip.
 * - **Custom actions**: Set `event` to have the menu fire a named event instead of selecting the option.
 * - **Unchanged text**: Set `persistent` to keep the option's text as written when the menu highlights matching text.
 *
 * @example
 * <auro-menu>
 *   <auro-menuoption value="stops">Stops</auro-menuoption>
 * </auro-menu>
 *
 * @summary One option in a menu, which can be disabled, shown as a row that can't be selected, or set to fire a custom event.
 * @customElement auro-menuoption
 *
 * @attr {Boolean} static - Shows the option as a row that can't be highlighted or selected, and that the arrow keys skip. Use it for section headings or informational rows inside a menu.
 * @slot default - The option's label text. {@requiredWhen always} {@category ui}
 *
 * @event auroMenuOption-mouseover - Fires when the pointer moves over the option.
 * @event auroMenuOption-click - Fires when the option is clicked, unless the option or a menu containing it is disabled.
 */
export class AuroMenuOption extends AuroElement {
  constructor() {
    super();

    this.shape = undefined;
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
    this.persistent = false;
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

      /**
       * Sets the option's corner shape. `box` and `snowflake` have square corners, and `pill` has fully rounded ends. Uses the parent menu's `shape` when not set.
       * @type {'box' | 'pill' | 'snowflake'}
       * @category ui
       */
      shape: {
        type: String,
        attribute: "shape",
        reflect: true
      },

      /**
       * Sets the option's text size and spacing, from `xs` (smallest) to `xl` (largest). Uses the parent menu's `size` when not set.
       * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl'}
       * @category ui
       */
      size: {
        type: String,
        attribute: "size",
        reflect: true
      },

      /**
       * Hides the checkmark when this option is selected. The menu replaces this value with its own `nocheckmark` setting when it first renders and whenever that setting changes, so set `nocheckmark` on the menu instead.
       * @category ui
       */
      noCheckmark: {
        type: Boolean,
        reflect: true,
        attribute: 'nocheckmark'
      },

      /**
       * Deprecated: Use the `value` attribute on `auro-menu`, or call its `selectByValue()` method, instead.
       * Shows whether the option is selected; the menu sets it to match its own selection. Support for setting it on the option will be removed in a future major release.
       *
       * @deprecated Use the `value` attribute on `auro-menu`, or call its `selectByValue()` method, instead.
       * @category behavior
       */
      selected: {
        type: Boolean,
        reflect: true
      },

      /**
       * Turns the option off. A disabled option is shown in a muted style and can't be highlighted or selected.
       * @category ui
       */
      disabled: {
        type: Boolean,
        reflect: true
      },

      /**
       * Sets the value that identifies this option, such as `stops`. The menu's `value` becomes this value when the option is selected.
       * @requiredWhen always
       * @category behavior
       */
      value: {
        type: String,
        reflect: true
      },

      /**
       * Sets the option's position in the keyboard tab order. Leave it at `-1` (the default) so options stay out of the tab order, because the arrow keys move between options instead.
       * @category a11y
       */
      tabIndex: {
        type: Number,
        reflect: true,
        attribute: 'tabindex'
      },

      /**
       * Sets the name of a custom event, such as `custom-flight-search`, that the menu fires instead of selecting the option when someone chooses it. The menu also fires `auroMenu-customEventFired`, with the option in `detail.option`.
       * @category behavior
       */
      event: {
        type: String,
        reflect: true
      },

      /**
       * Marks the option as the "no matching results" row that `auro-combobox` shows when nothing matches what someone typed.
       * @category behavior
       */
      noMatch: {
        type: Boolean,
        reflect: true,
        attribute: 'nomatch'
      },

      /**
       * Keeps the option's text as written when the menu highlights `matchword` text. Use it for utility rows, such as "Add new…", that should look the same whatever someone types.
       * @category behavior
       */
      persistent: {
        type: Boolean,
        reflect: true
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
   * Registers the element with the browser under a tag name.
   * @param {string} [name="auro-menuoption"] - The tag name to register the element under.
   *
   * @example
   * AuroMenuOption.register("custom-menuoption") // registers the element as <custom-menuoption>
   *
   */
  static register(name = "auro-menuoption") {
    AuroLibraryRuntimeUtils.prototype.registerComponent(name, AuroMenuOption);
  }

  /**
   * Checks whether the option can be highlighted and selected: it isn't `hidden`, `disabled`, or `static`, and no menu containing it is disabled.
   * @returns {boolean} True if the option can be highlighted and selected; false otherwise.
   * @category behavior
   */
  get isActive() {
    return !this.hasAttribute('hidden') &&
      !this.disabled &&
      !this.hasAttribute('static') &&
      !hasDisabledAncestorMenu(this);
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
      } else if (!hasDisabledAncestorMenu(this)) {
        // Authored `disabled` just turned off, but if an ancestor menu is
        // still disabled (AB#1566578) this option is still inert — don't
        // clear the announcement a still-disabled ancestor is responsible for.
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
    if (!this.disabled && !hasDisabledAncestorMenu(this)) {
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
   * @returns {import("lit").TemplateResult} The template for the icon element containing the SVG.
   */
  generateIconHtml(svgContent) {
    const dom = new DOMParser().parseFromString(svgContent, 'text/html');
    const svg = dom.body.firstChild;

    svg.setAttribute('slot', 'svg');

    return html`<${this.iconTag} customColor customSvg>${svg}</${this.iconTag}>`;
  }

  /**
   * Renders the option: its label, with a checkmark when it's selected and `nocheckmark` isn't set.
   * @protected
   * @returns {import("lit").TemplateResult} The template to render.
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

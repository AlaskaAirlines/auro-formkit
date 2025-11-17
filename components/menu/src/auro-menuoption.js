// Copyright (c) 2021 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

/* eslint-disable no-extra-parens, lit/binding-positions, lit/no-invalid-html, no-underscore-dangle, curly, max-lines */

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
import { MenuContext } from './auro-menu.context.js';
import { ContextConsumer } from '@lit/context';
import { dispatchMenuEvent } from './auro-menu-utils.js';

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

    this.bindEvents();

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
    this.nocheckmark = false;
    this.disabled = false;

    /**
     * @private
     */
    this.runtimeUtils = new AuroLibraryRuntimeUtils();

    // Initialize context-related properties
    this.menuService = null;
    this.unsubscribe = null;

    /**
     * @private
     */
    this.handleMenuChange = this.handleMenuChange.bind(this);
  }

  static get properties() {
    return {
      ...super.properties,
      disabled:  {
        type: Boolean,
        reflect: true
      },
      event: {
        type: String,
        reflect: true
      },
      key: {
        type: String,
        reflect: true
      },
      menuService: {
        type: Object,
        state: true
      },
      matchWord: {
        type: String,
        state: true
      },
      nocheckmark: {
        type: Boolean,
        reflect: true
      },
      selected:  {
        type: Boolean,
        reflect: true
      },
      tabIndex: {
        type: Number,
        reflect: true
      },
      value: {
        type: String,
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

  connectedCallback() {
    super.connectedCallback();

    // Add the tag name as an attribute if it is different than the component name
    // Add this step soon as this node gets attached to the DOM to avoid racing condition with menu's value setting logic.
    this.runtimeUtils.handleComponentTagRename(this, 'auro-menuoption');

    // Set up context consumption in connectedCallback
    this._contextConsumer = new ContextConsumer(this, {
      context: MenuContext,
      callback: this.attachTo.bind(this),
      subscribe: true
    });

    // Establish the key property as early as possible
    const valueAttr = this.getAttribute('value');
    const keyAttr = this.getAttribute('key');
    this.key = keyAttr !== null ? keyAttr : valueAttr;
  }

  attachTo(service) {
    if (!service) {
      return;
    }
    this.menuService = service;
    this.menuService.addMenuOption(this);
    this.menuService.subscribe(this.handleMenuChange);
  }

  handleMenuChange(event) {

    // Ignore events without a type or property
    if (!event || (!event.type && !event.property)) {
      return;
    }

    // Update reactive properties based on event type
    if (event.property && Object.keys(AuroMenuOption.properties).includes(event.property)) {
      this[event.property] = event.value;
    }

    // Handle highlight changes
    if (event.type === 'highlightChange') {
      const isActive = event.option === this;
      this.updateActive(isActive);
    }

    if (event.type === 'stateChange') {
      const isSelected = event.selectedOptions.includes(this);
      this.setInternalSelected(isSelected);
    }
  }

  setInternalSelected(isSelected) {
    this.internalUpdateInProgress = true;
    this.selected = isSelected;

    // Fire custom event if selected
    if (isSelected) {
      this.handleCustomEvent();
    }

    setTimeout(() => {
      this.internalUpdateInProgress = false;
    }, 0);
  }

  bindEvents() {
    this.addEventListener('click', this.handleClick.bind(this));
    this.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
  }

  setSelected(isSelected) {
    this.selected = isSelected;
  }

  updateActive(isActive) {

    // Set active state
    this.active = isActive;

    // Update class based on active state
    if (this.active) this.classList.add('active');
    else this.classList.remove('active');
  }

  disconnectedCallback() {
    if (this.menuService) {
      this.menuService.unsubscribe(this.handleMenuChange);
      this.menuService.removeMenuOption(this);
    }
  }

  updateTextHighlight() {

    // Regex for matchWord if needed
    let regexWord = null;

    if (this.matchWord && this.matchWord.length) {
      const escapedWord = this.matchWord.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
      regexWord = new RegExp(escapedWord, 'giu');
    }

    // Update text highlighting if matchWord changed
    if (regexWord &&
        this.isActive && !this.hasAttribute('persistent')) {
      const nested = this.querySelectorAll('.nestingSpacer');

      const displayValueEl = this.querySelector('[slot="displayValue"]');
      if (displayValueEl) {
        this.removeChild(displayValueEl);
      }

      // Create nested spacers
      const nestingSpacerBundle = [...nested].map(() => this.nestingSpacer).join('');

      // Update with spacers and matchWord
      this.innerHTML = nestingSpacerBundle +
        this.textContent.replace(
          regexWord,
          (match) => `<strong>${match}</strong>`
        );
      if (displayValueEl) {
        this.append(displayValueEl);
      }
    }
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

  get isActive() {
    return !this.hasAttribute('hidden') &&
      !this.disabled &&
      !this.hasAttribute('static');
  }

  handleCustomEvent() {
    if (this.event) {
      dispatchMenuEvent(this, this.event, { option: this });
      dispatchMenuEvent(this, 'auroMenu-customEventFired', { option: this });
    }
  }

  updated(changedProperties) {
    super.updated(changedProperties);

    // Update aria-selected attribute if selected changed
    if (changedProperties.has('selected')) {

      // Update aria-selected attribute
      this.setAttribute('aria-selected', this.selected.toString());

      // Update menu service selection state if this isn't an internal update
      if (this.internalUpdateInProgress !== true) {
        this.menuService[this.selected ? 'selectOption' : 'deselectOption'](this);
      }
    }

    // Update text highlight if matchWord changed
    if (changedProperties.has('matchWord')) {
      this.updateTextHighlight();
    }

    // Set the key to be the passed value if no key is provided
    if (changedProperties.has('value') && this.key === undefined) {
      this.key = this.value;
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

  dispatchClickEvent() {
    this.dispatchEvent(new CustomEvent('auroMenuOption-click', {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: this
    }));
  }

  handleClick() {
    if (!this.disabled) {
      this.dispatchClickEvent();
      this.selected = !this.selected;
    }
  }

  handleMouseEnter() {
    if (!this.disabled) {
      this.menuService.setHighlightedOption(this);
    }
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
        ${this.selected && !this.nocheckmark
          ? this.generateIconHtml(checkmarkIcon.svg)
          : undefined}
        <slot></slot>
      </div>
    `;
  }
}

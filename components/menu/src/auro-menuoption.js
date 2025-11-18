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
   * An option is considered active if it is not hidden, not disabled, and not static.
   * @returns {boolean} True if the option is active, false otherwise.
   */
  get isActive() {
    return !this.hasAttribute('hidden') &&
      !this.disabled &&
      !this.hasAttribute('static');
  }

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
      disabled: {
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
      selected: {
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

    if (changedProperties.has('active')) {
      this.updateActiveClasses();
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

  disconnectedCallback() {
    if (this.menuService) {
      this.menuService.unsubscribe(this.handleMenuChange);
      this.menuService.removeMenuOption(this);
    }
  }

  /**
   * Sets up event listeners for user interaction with the menu option.
   * This function enables click and mouse enter events to trigger selection and highlighting logic.
   */
  bindEvents() {
    this.addEventListener('click', this.handleClick.bind(this));
    this.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
  }

  /**
   * Attaches this menu option to a menu service and subscribes to its events.
   * This method enables the option to participate in menu selection and highlighting logic.
   * @param {Object} service - The menu service instance to attach to.
   */
  attachTo(service) {
    if (!service) {
      return;
    }
    this.menuService = service;
    this.menuService.addMenuOption(this);
    this.menuService.subscribe(this.handleMenuChange);
  }

  /**
   * Handles changes from the menu service and updates the option's state.
   * This function synchronizes the option's properties and selection/highlight state with menu events.
   * @param {Object} event - The event object from the menu service.
   */
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
      this.active = isActive;
    }

    if (event.type === 'stateChange') {
      const isSelected = event.selectedOptions.includes(this);
      this.setInternalSelected(isSelected);
    }
  }

  /**
   * Updates the internal selected state of the menu option bypassing 'updated' and triggers custom events if selected.
   * This function ensures the option's selection state is synchronized with menu logic and notifies listeners.
   * @param {boolean} isSelected - Whether the option should be marked as selected.
   */
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

  /**
   * Sets the selected state of the menu option.
   * This function updates whether the option is currently selected.
   * @param {boolean} isSelected - Whether the option should be marked as selected.
   * @deprecated Simply modify the `selected` property directly instead.
   */
  setSelected(isSelected) {
    this.selected = isSelected;
  }

  /**
   * Updates the active state and visual highlighting of the menu option.
   * This function toggles the option's active status and applies or removes the active CSS class.
   * @param {boolean} isActive - Whether the option should be marked as active.
   * @deprecated Simply modify the `active` property directly instead.
   */
  updateActive(isActive) {

    // Set active state
    this.active = isActive;
    this.updateActiveClasses();
  }

  /**
   * Updates the CSS class for the menu option based on its active state.
   * This function adds or removes the 'active' class to visually indicate the option's active status.
   * @private
   */
  updateActiveClasses() {
    // Update class based on active state
    if (this.active) this.classList.add('active');
    else this.classList.remove('active');
  }


  /**
   * Updates the visual highlighting of text within the menu option based on the current match word.
   * This function highlights matching text segments and manages nested spacers for display formatting.
   * @private
   */
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

  /**
   * Handles click events on the menu option, toggling its selected state.
   * This function dispatches a click event and updates selection if the option is not disabled.
   * @private
   */
  handleClick() {
    if (!this.disabled) {
      this.dispatchClickEvent();
      this.selected = !this.selected;
    }
  }

  /**
   * Handles mouse enter events to highlight the menu option.
   * This function updates the menu service to set this option as the currently highlighted item if not disabled.
   * @private
   */
  handleMouseEnter() {
    if (!this.disabled) {
      this.menuService.setHighlightedOption(this);
    }
  }

  /**
   * Dispatches custom events defined for this menu option.
   * This function notifies listeners when a custom event is triggered by the option.
   * @private
   */
  handleCustomEvent() {
    if (this.event) {
      dispatchMenuEvent(this, this.event, { option: this });
      dispatchMenuEvent(this, 'auroMenu-customEventFired', { option: this });
    }
  }

  /**
   * Dispatches a click event for this menu option.
   * This function notifies listeners that the option has been clicked.
   * @private
   */
  dispatchClickEvent() {
    this.dispatchEvent(new CustomEvent('auroMenuOption-click', {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: this
    }));
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
        ${this.selected && !this.nocheckmark
        ? this.generateIconHtml(checkmarkIcon.svg)
        : undefined}
        <slot></slot>
      </div>
    `;
  }
}

/* eslint-disable no-underscore-dangle, curly */
// Copyright (c) 2025 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

import { html } from "lit";

import styleCss from "./styles/default/style-menu-css.js";
import colorCss from "./styles/default/color-menu-css.js";
import tokensCss from "./styles/default/tokens-css.js";

import { AuroElement } from "../../layoutElement/src/auroElement.js";
import { MenuContext, MenuService } from "./auro-menu.context.js";

import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';
import {
  dispatchMenuEvent
} from './auro-menu-utils.js';
import { classMap } from "lit/directives/class-map.js";
import { ContextProvider } from "@lit/context";


/**
 * The auro-menu element provides users a way to select from a list of options.
 * @attr {HTMLElement|Array<HTMLElement>} optionSelected - An array of currently selected menu options, type `HTMLElement` by default. In multi-select mode, `optionSelected` is an array of HTML elements.
 * @attr {object} optionactive - Specifies the current active menuOption.
 * @attr {string} matchword - Specifies a string used to highlight matched string parts in options.
 * @attr {boolean} disabled - When true, the entire menu and all options are disabled;
 * @attr {boolean} nocheckmark - When true, selected option will not show the checkmark.
 * @attr {boolean} loading - When true, displays a loading state using the loadingIcon and loadingText slots if provided.
 * @attr {boolean} multiselect - When true, the selected option can be multiple options.
 * @attr {boolean} selectAllMatchingOptions - When true, selects all options that match the provided value/key when setting value and multiselect is enabled.
 * @attr {string} value - The value of the selected option. In multi-select mode, this is a JSON stringified array of selected option values.
 * @prop {string} size - Sets the size of the menu. Accepted values are 'sm' and 'md'. Default is 'sm'.
 * @prop {string} shape - Sets the shape of the menu options. Accepted values are 'box' and 'round'. Default is 'box'.
 * @prop {boolean} hasLoadingPlaceholder - Indicates whether the menu has a loadingIcon or loadingText to render when in a loading state.
 * @event {CustomEvent<Element>} auroMenu-activatedOption - Notifies that a menuoption has been made `active`.
 * @event {CustomEvent<any>} auroMenu-customEventFired - Notifies that a custom event has been fired.
 * @event {CustomEvent<{ loading: boolean; hasLoadingPlaceholder: boolean; }>} auroMenu-loadingChange - Notifies when the loading attribute is changed.
 * @event {CustomEvent<any>} auroMenu-selectValueFailure - Notifies that an attempt to select a menuoption by matching a value has failed.
 * @event {CustomEvent<any>} auroMenu-selectValueReset - Notifies that the component value has been reset.
 * @event {CustomEvent<any>} auroMenu-selectedOption - Notifies that a new menuoption selection has been made.
 * @slot loadingText - Text to show while loading attribute is set
 * @slot loadingIcon - Icon to show while loading attribute is set
 * @slot - Slot for insertion of menu options.
 */

/* eslint-disable no-magic-numbers, max-lines, no-extra-parens */

export class AuroMenu extends AuroElement {

  constructor() {
    super();

    // State properties (reactive)

    /**
     * @private
     */
    this.shape = "box";

    /**
     * @private
     */
    this.size = "sm";

    // Value of the selected options
    this.value = undefined;
    // Currently selected option
    this.optionSelected = undefined;
    // String used for highlighting/filtering
    this.matchWord = undefined;
    // Hide the checkmark icon on selected options
    this.noCheckmark = false;
    // Currently active option
    this.optionActive = undefined;
    // Loading state
    this.loading = false;
    // Multi-select mode
    this.multiSelect = false;
    // Allow deselecting of menu options
    this.allowDeselect = false;
    // Select all matching options when setting value in multi-select mode
    this.selectAllMatchingOptions = false;

    // Event Bindings

    /**
     * @private
     */
    this.handleKeyDown = this.handleKeyDown.bind(this);


    /**
     * @private
     */
    this.handleSlotChange = this.handleSlotChange.bind(this);

    // Instance properties (non-reactive)

    /**
     * @private
     */
    Object.assign(this, {
      // Root-level menu (true) or a nested submenu (false)
      rootMenu: true,
      // Currently focused/active menu item index
      _index: -1,
      // Nested menu spacer
      nestingSpacer: '<span class="nestingSpacer"></span>',
      // Loading indicator for slot elements
      loadingSlots: null,
    });
  }

  static get properties() {
    return {
      ...super.properties,

      /**
       * Allows deselecting an already selected option when clicked again in single-select mode.
       */
      allowDeselect: {
        type: Boolean,
        reflect: true,
      },
      noCheckmark: {
        type: Boolean,
        reflect: true,
        attribute: 'nocheckmark'
      },
      disabled: {
        type: Boolean,
        reflect: true
      },
      loading: {
        type: Boolean,
        reflect: true
      },
      optionSelected: {
        // Allow HTMLElement, HTMLElement[] arrays and undefined
        type: Object
      },
      optionActive: {
        type: Object,
        attribute: 'optionactive'
      },
      matchWord: {
        type: String,
        attribute: 'matchword'
      },
      multiSelect: {
        type: Boolean,
        reflect: true,
        attribute: 'multiselect'
      },
      selectAllMatchingOptions: {
        type: Boolean,
        reflect: true,
      },

      /**
       * Value selected for the component.
       */
      value: {
        type: String,
        reflect: true,
        attribute: 'value'
      },

      /**
       * Indent level for submenus.
       * @private
       */
      level: {
        type: Number,
        reflect: false,
        attribute: false
      },

      /**
       * Available menu options
       * @readonly
       */
      options: {
        type: Array,
        reflect: false,
        attribute: false
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
   * @readonly
   * @returns {Array<HTMLElement>} - Returns the array of available menu options.
   * @deprecated use `options` property instead.
   */
  get items() {
    return this.options;
  }

  get index() {
    return this._index;
  }

  set index(value) {
    this.menuService.setHighlightedIndex(value);
  }

  /**
   * This will register this element with the browser.
   * @param {string} [name="auro-menu"] - The name of element that you want to register to.
   *
   * @example
   * AuroMenu.register("custom-menu") // this will register this element to <custom-menu/>
   *
   */
  static register(name = "auro-menu") {
    AuroLibraryRuntimeUtils.prototype.registerComponent(name, AuroMenu);
  }

  /**
   * Formatted value based on `multiSelect` state.
   * Default type is `String`, changing to `Array<String>` when `multiSelect` is true.
   * @private
   * @returns {String|Array<String>}
   */
  get formattedValue() {
    return this.menuService.currentValue;
  }

  get propertyValues() {
    return {
      size: this.size,
      shape: this.shape,
      noCheckmark: this.nocheckmark,
      disabled: this.disabled
    };
  }

  provideContext() {
    this.menuService = new MenuService({host: this});
    this.menuService.setProperties(this.propertyValues);
    this.menuService.subscribe(this.handleMenuChange.bind(this));
    this._contextProvider = new ContextProvider(this, {
      context: MenuContext,
      initialValue: this.menuService
    });
  }

  updateActiveOption(option) {
    this.menuService.setHighlightedOption(option);
  }

  setInternalValue(value) {
    if (this.value !== value) {
      this.internalUpdateInProgress = true;
      this.value = value;

      setTimeout(() => {
        this.internalUpdateInProgress = false;
      });
    }
  }

  handleMenuChange(event) {
    if (event.type === 'valueChange') {

      // New option is array value or first option with fallback to undefined for empty array in all cases
      const newOption = this.multiSelect && event.options.length ? event.options : event.options[0] || undefined;
      const newValue = event.stringValue;

      // Check if the option or value has actually changed
      if (newValue === undefined || (this.optionSelected !== newOption || this.stringValue !== newValue)) {
        this.optionSelected = newOption;
        this.setInternalValue(newValue);
      }

      // Notify components of selection change
      this.notifySelectionChange(event);
    }

    if (event.type === 'highlightChange') {
      this.optionActive = event.option;
      this._index = event.index;
    }

    if (event.type === 'optionsChange') {
      this.options = event.options;
      this.dispatchEvent(new CustomEvent('auroMenu-optionsChange', {
        detail: {
          options: event.options
        }
      }));
    }
  }

  get selectedOptions() {
    return this.menuService ? this.menuService.selectedOptions : [];
  }

  get selectedOption() {
    return this.menuService ? this.menuService.selectedOptions[0] : null;
  }

  // Lifecycle Methods

  connectedCallback() {
    super.connectedCallback();

    this.provideContext();

    this.addEventListener('keydown', this.handleKeyDown);
    this.addEventListener('auroMenuOption-click', this.handleMouseSelect);
    this.addEventListener('auroMenuOption-mouseover', this.handleOptionHover);
    this.addEventListener('slotchange', this.handleSlotChange);
    this.setTagAttribute("auro-menu");
  }

  disconnectedCallback() {
    this.removeEventListener('keydown', this.handleKeyDown);
    this.removeEventListener('auroMenuOption-click', this.handleMouseSelect);
    this.removeEventListener('auroMenuOption-mouseover', this.handleOptionHover);
    this.removeEventListener('slotchange', this.handleSlotChange);

    super.disconnectedCallback();
  }

  firstUpdated() {
    AuroLibraryRuntimeUtils.prototype.handleComponentTagRename(this, 'auro-menu');

    this.loadingSlots = this.querySelectorAll("[slot='loadingText'], [slot='loadingIcon']");
    this.initializeMenu();
  }

  /**
   * Sets an attribute that matches the default tag name if the tag name is not the default.
   * @param {string} tagName - The tag name to set as an attribute.
   * @private
   */
  setTagAttribute(tagName) {
    if (this.tagName.toLowerCase() !== tagName) {
      this.setAttribute(tagName, true);
    }
  }

  updated(changedProperties) {
    super.updated(changedProperties);

    // Update menu service properties on host update
    if (changedProperties.has('value')) {
      this.menuService.selectByValue(this.value);
    }

    // Handle loading state changes
    if (changedProperties.has('loading')) {
      this.setLoadingState(this.loading);
    }
  }

  setLoadingState(isLoading) {
    this.setAttribute("aria-busy", isLoading);
    dispatchMenuEvent(this, "auroMenu-loadingChange", {
      loading: isLoading,
      hasLoadingPlaceholder: this.hasLoadingPlaceholder
    });
  }

  // Init Methods

  /**
   * Initializes the menu's state and structure.
   * @private
   */
  initializeMenu() {
    if (this.rootMenu) {
      this.setAttribute('role', 'listbox');
      this.setAttribute('root', '');
      this.handleNestedMenus(this);
    }
  }

  makeSelection() {
    this.menuService.selectHighlightedOption();
  }

  /**
   * Resets all options to their default state.
   * @private
   */
  clearSelection() {
    this.optionSelected = undefined;
    this.value = undefined;
    this._index = -1;
  }

  /**
   * Resets the menu to its initial state.
   * This is the only way to return value to undefined.
   * @public
   */
  reset() {
    this.menuService.reset();

    // Dispatch reset event
    dispatchMenuEvent(this, 'auroMenu-selectValueReset');
  }

  /**
   * Handles nested menu structure.
   * @private
   * @param {HTMLElement} menu - Root menu element.
   */
  handleNestedMenus(menu) {
    menu.level = menu.parentElement.level >= 0 ? menu.parentElement.level + 1 : 0;

    if (menu.level > 0) {
      menu.setAttribute('role', 'group');
      menu.removeAttribute("root");
      if (!menu.hasAttribute('aria-label')) {
        menu.setAttribute('aria-label', 'submenu');
      }
    }

    const options = menu.querySelectorAll(':scope > auro-menuoption, :scope > [auro-menuoption]');
    options.forEach((option) => {
      const regex = new RegExp(this.nestingSpacer, "gu");
      option.innerHTML = this.nestingSpacer.repeat(menu.level) + option.innerHTML.replace(regex, '');
    });
  }

  // Event Handlers

  /**
   * Handles keyboard navigation.
   * @private
   * @param {KeyboardEvent} event - Event object from the browser.
   */
  handleKeyDown(event) {
    event.preventDefault();
    switch (event.key) {
      case "ArrowDown":
        this.menuService.highlightNext();
        break;
      case "ArrowUp":
        this.menuService.highlightPrevious();
        break;
      case "Tab":
      case "Enter":
        this.menuService.selectHighlightedOption();
        break;
      default:
        break;
    }
  }

  navigateOptions(direction) {
    if (direction === 'up') {
      this.menuService.highlightPrevious();
    } else if (direction === 'down') {
      this.menuService.highlightNext();
    }
  }

  /**
   * Handles slot change events.
   * @private
   */
  handleSlotChange() {
    if (this.parentElement && this.parentElement.closest('auro-menu, [auro-menu]')) {
      this.rootMenu = false;
    }

    if (this.rootMenu) {
      this.initializeMenu();
    }
  }

  /**
   * Handles custom events defined on options.
   * @private
   * @param {HTMLElement} option - Option with custom event.
   */
  handleCustomEvent(option) {
    const eventName = option.getAttribute('event');
    dispatchMenuEvent(this, eventName);
    dispatchMenuEvent(this, 'auroMenu-customEventFired');
  }

  /**
   * Notifies selection change to parent components.
   * @param {any} source - The source that triggers this event.
   * @private
   */
  notifySelectionChange({value, stringValue, keys, options} = {}) {
    dispatchMenuEvent(this, 'auroMenu-selectedOption', {
      value,
      stringValue,
      keys,
      options
    });
  }

  /**
   * Checks if an option is currently selected.
   * @private
   * @param {HTMLElement} option - The option to check.
   * @returns {boolean}
   */
  isOptionSelected(option) {
    if (!this.optionSelected) {
      return false;
    }

    if (this.multiSelect) {
      // In multi-select mode, check if the option is in the selected array
      return Array.isArray(this.optionSelected) && this.optionSelected.some((selectedOption) => selectedOption === option);
    }

    return this.optionSelected === option;
  }

  /**
   * Getter for loading placeholder state.
   * @returns {boolean} - True if loading slots are present and non-empty.
   */
  get hasLoadingPlaceholder() {
    return this.loadingSlots && this.loadingSlots.length > 0;
  }

  /**
   * Getter for wrapper classes based on size.
   * @returns {Object} - Class map for the wrapper element.
   * @private
   */
  get wrapperClasses() {
    return classMap({
      'menuWrapper': true,
      [this.size]: true,
    });
  }

  /**
   * Logic to determine the layout of the component.
   * @protected
   * @returns {void}
   */
  renderLayout() {
    if (this.loading) {
      return html`
        <div class="${this.wrapperClasses}">
          <auro-menuoption
            disabled
            loadingplaceholder
            class="${this.hasLoadingPlaceholder ? "" : "empty"}"
          >
            <div>
              <slot name="loadingIcon" class="body-lg"></slot>
              <slot name="loadingText"></slot>
            </div>
          </auro-menuoption>
        </div>
      `;
    }

    return html`
      <div class="${this.wrapperClasses}">
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
  }
}


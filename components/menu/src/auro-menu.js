// Copyright (c) 2025 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

import { html } from "lit";

import styleCss from "./styles/default/style-menu-css.js";
import colorCss from "./styles/default/color-menu-css.js";
import tokensCss from "./styles/default/tokens-css.js";

import { AuroElement } from "../../layoutElement/src/auroElement.js";

import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';
import {
  isOptionInteractive,
  dispatchMenuEvent
} from './auro-menu-utils.js';
import { classMap } from "lit/directives/class-map.js";


// See https://git.io/JJ6SJ for "How to document your components using JSDoc"
/**
 * The auro-menu element provides users a way to select from a list of options.
 * @attr {HTMLElement|Array<HTMLElement>} optionSelected - An array of currently selected menu options, type `HTMLElement` by default. In multi-select mode, `optionSelected` is an array of HTML elements.
 * @attr {object} optionactive - Specifies the current active menuOption.
 * @attr {string} matchword - Specifies a string used to highlight matched string parts in options.
 * @attr {boolean} disabled - When true, the entire menu and all options are disabled;
 * @attr {boolean} nocheckmark - When true, selected option will not show the checkmark.
 * @attr {boolean} loading - When true, displays a loading state using the loadingIcon and loadingText slots if provided.
 * @attr {boolean} multiselect - When true, the selected option can be multiple options.
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

    // Event Bindings

    /**
     * @private
     */
    this.handleKeyDown = this.handleKeyDown.bind(this);

    /**
     * @private
     */
    this.handleMouseSelect = this.handleMouseSelect.bind(this);

    /**
     * @private
     */
    this.handleOptionHover = this.handleOptionHover.bind(this);

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
      index: -1,
      // Nested menu spacer
      nestingSpacer: '<span class="nestingSpacer"></span>',
      // Loading indicator for slot elements
      loadingSlots: null,
      // Store for menu items
      items: [],
    });
  }

  static get properties() {
    return {
      ...super.properties,
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
    if (this.multiSelect) {
      if (!this.value) {
        return undefined;
      }
      if (this.value.startsWith("[")) {
        return JSON.parse(this.value);
      }
      return [this.value];
    }
    return this.value;
  }

  // Lifecycle Methods

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener('keydown', this.handleKeyDown);
    this.addEventListener('mousedown', this.handleMouseSelect);
    this.addEventListener('auroMenuOption-mouseover', this.handleOptionHover);
    this.addEventListener('slotchange', this.handleSlotChange);
    this.setTagAttribute("auro-menu");
  }

  disconnectedCallback() {
    this.removeEventListener('keydown', this.handleKeyDown);
    this.removeEventListener('mousedown', this.handleMouseSelect);
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

    if (changedProperties.has('multiSelect') && !changedProperties.has("value")) {
      // Reset selection if multiSelect mode changes
      this.clearSelection();
    }


    if (changedProperties.has("value")) {
      console.warn('menu value updated', this.value);
      console.info('available options', this.availableOptions);
      // Handle null/undefined case
      if (this.value === undefined || this.value === null) {
        this.clearSelection();
      } else {
        if (this.multiSelect) {
          // In multiselect mode, this.value should be an array of strings
          const valueArray = this.formattedValue;
          const matchingOptions = this.items.filter((item) => valueArray.includes(item.value));

          this.optionSelected = matchingOptions.length > 0 ? matchingOptions : undefined;
        } else {
          console.info('single-select mode, looking for value', this.value);
          // In single-select mode, this.value should be a string
          const matchingOptions = this.items.find((item) => item.value === this.value);

          console.info('matchingOptions', matchingOptions);

          if (matchingOptions) {
            this.optionSelected = matchingOptions;
            this.index = this.items.indexOf(matchingOptions);
          } else {
            // If no matching option found, reset selection
            this.optionSelected = undefined;
            this.index = -1;
          }

          console.warn('optionSelected', this.optionSelected);
        }

        // If no matching options were found in either mode
        if (!this.optionSelected || (Array.isArray(this.optionSelected) && this.optionSelected.length === 0)) {
          dispatchMenuEvent(this, 'auroMenu-selectValueFailure');
          this.optionSelected = undefined;
          this.index = -1;
        }
      }

      // Update UI state
      this.updateItemsState(new Map([
        [
          'optionSelected',
          true
        ]
      ]));

      // Notify of changes
      if (this.optionSelected !== undefined) {
        this.notifySelectionChange();
      }
    }

    // Process all other UI updates
    this.updateItemsState(changedProperties);

    if (changedProperties.has('optionSelected')) {
      console.warn('updated: optionSelected', this.optionSelected);
      this.notifySelectionChange();
    }
  }

  /**
   * Updates the UI state and appearance of menu items based on changed properties.
   * @private
   * @param {Map<string, boolean>} changedProperties - LitElement's changed properties map.
   */
  updateItemsState(changedProperties) {
    if (!this.items) {
      return;
    }

    // Handle noCheckmark propagation to all menus and options
    if (changedProperties.has('noCheckmark') && this.noCheckmark) {
      // Update both menus and options
      this.querySelectorAll('auro-menu, [auro-menu], auro-menuoption, [auro-menuoption]').forEach((element) => element.setAttribute('noCheckmark', ''));
    }

    // Handle layout propagation to all menus and options
    const propagationTargets = this.querySelectorAll('auro-menu, [auro-menu], auro-menuoption, [auro-menuoption]');
    [
      'size',
      'shape'
    ].forEach((prop) => {
      if (changedProperties.has(prop)) {
        propagationTargets.forEach((el) => {
          el.setAttribute(prop, this[prop]);
        });
      }
    });

    // Regex for matchWord if needed
    let regexWord = null;

    if (changedProperties.has('matchWord') && this.matchWord && this.matchWord.length) {
      const escapedWord = this.matchWord.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
      regexWord = new RegExp(escapedWord, 'giu');
    }

    // Handle direct item updates
    this.items.forEach((option) => {
      // Update selection if option or value changed
      if (changedProperties.has('optionSelected') || changedProperties.has('value')) {
        const isSelected = this.isOptionSelected(option);
        option.setAttribute('aria-selected', isSelected ? 'true' : 'false');

        // Add/remove selected attribute based on state
        if (isSelected) {
          option.setAttribute('selected', '');
        } else {
          option.removeAttribute('selected');
        }
      }

      // Update text highlighting if matchWord changed
      if (changedProperties.has('matchWord') && regexWord &&
          isOptionInteractive(option) && !option.hasAttribute('persistent')) {
        const nested = option.querySelectorAll('.nestingSpacer');

        const displayValueEl = option.querySelector('[slot="displayValue"]');
        if (displayValueEl) {
          option.removeChild(displayValueEl);
        }

        // Create nested spacers
        const nestingSpacerBundle = [...nested].map(() => this.nestingSpacer).join('');

        // Update with spacers and matchWord
        option.innerHTML = nestingSpacerBundle +
          option.textContent.replace(
            regexWord,
            (match) => `<strong>${match}</strong>`
          );
        if (displayValueEl) {
          option.append(displayValueEl);
        }
      }

      // Update disabled state
      if (changedProperties.has('disabled')) {
        option.disabled = this.disabled;
      }
    });

    // Handle loading state changes
    if (changedProperties.has('loading')) {
      this.setAttribute("aria-busy", this.loading);
      dispatchMenuEvent(this, "auroMenu-loadingChange", {
        loading: this.loading,
        hasLoadingPlaceholder: this.hasLoadingPlaceholder
      });
    }
  }

  // Init Methods

  /**
   * Initializes the menu's state and structure.
   * @private
   */
  initializeMenu() {
    this.initItems();
    if (this.rootMenu) {
      this.setAttribute('role', 'listbox');
      this.setAttribute('root', '');
      this.handleNestedMenus(this);
    }
  }

  /**
   * Initializes menu items and their attributes.
   * @private
   */
  initItems() {
    this.items = Array.from(this.querySelectorAll('auro-menuoption, [auro-menuoption]'));
    if (this.noCheckmark) {
      this.updateItemsState(new Map([
        [
          'noCheckmark',
          true
        ]
      ]));
    }
  }

  // Logic Methods

  /**
   * Updates menu state when an option is selected.
   * @private
   * @param {HTMLElement} option - The option element to select.
   */
  handleSelectState(option) {
    if (this.multiSelect) {
      const currentValue = this.formattedValue || [];
      const currentSelected = this.optionSelected || [];

      if (!currentValue.includes(option.value)) {
        this.value = JSON.stringify([
          ...currentValue,
          option.value
        ]);
      }
      if (!currentSelected.includes(option)) {
        this.optionSelected = [
          ...currentSelected,
          option
        ];
      }
    } else {
      // Single select - use arrays with single values
      this.value = option.value;
      this.optionSelected = option;
    }

    this.index = this.items.indexOf(option);
  }

  /**
   * Deselects a menu option and updates related state.
   * @private
   * @param {HTMLElement} option - The menuoption to be deselected.
   */
  handleDeselectState(option) {
    if (this.multiSelect) {
      // Remove this option from array
      const newFormattedValue = (this.formattedValue || []).filter((val) => val !== option.value);

      // If array is empty after removal, set back to undefined
      if (newFormattedValue && newFormattedValue.length === 0) {
        this.value = undefined;
      } else {
        this.value = JSON.stringify(newFormattedValue);
      }

      this.optionSelected = this.optionSelected.filter((val) => val !== option);
      if (this.optionSelected.length === 0) {
        this.optionSelected = undefined;
      }
    } else {
      // For single-select: Back to undefined when deselected
      this.value = undefined;
      this.optionSelected = undefined;
    }

    // Update the index tracking
    this.index = this.items.indexOf(option);

    // Update UI to reflect changes
    this.updateItemsState(new Map([
      [
        'optionSelected',
        true
      ]
    ]));

    // Notify of selection change
    this.notifySelectionChange();
  }

  /**
   * Resets all options to their default state.
   * @private
   */
  clearSelection() {
    this.optionSelected = undefined;
    this.value = undefined;
    this.index = -1;
  }

  /**
   * Resets the menu to its initial state.
   * This is the only way to return value to undefined.
   * @public
   */
  reset() {
    // Reset to undefined - initial state
    this.value = undefined;
    this.optionSelected = undefined;
    this.index = -1;

    // Reset UI state
    this.updateItemsState(new Map([
      [
        'optionSelected',
        true
      ]
    ]));

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
        this.navigateOptions('down');
        break;
      case "ArrowUp":
        this.navigateOptions('up');
        break;
      case "Enter":
        this.makeSelection();
        break;
      default:
        break;
    }
  }

  /**
   * Makes a selection based on the current index or clicked option.
   * @private
   */
  makeSelection() {
    if (!this.items) {
      this.initItems();
    }

    // Get currently selected menu option based on index
    const option = this.items[this.index];

    // Return early if option is not interactive
    if (!option || !isOptionInteractive(option)) {
      return;
    }

    // Handle custom events first
    if (option.hasAttribute('event')) {
      this.handleCustomEvent(option);
      return;
    }

    if (this.multiSelect) {
      // In multiselect, toggle individual selections
      this.toggleOption(option);
      // In single select, only handle selection of new options
    } else if (this.option !== this.optionSelected || !this.isOptionSelected(option)) {
      this.clearSelection();
      this.handleSelectState(option);
    }

    this.notifySelectionChange();
  }

  /**
   * Toggle the selection state of the menuoption.
   * @private
   * @param {HTMLElement} option - The menuoption to toggle.
   */
  toggleOption(option) {
    const isCurrentlySelected = this.isOptionSelected(option);

    if (isCurrentlySelected) {
      this.handleDeselectState(option);
    } else if (option.value === undefined || option.value === '') {
      dispatchMenuEvent(this, 'auroMenu-selectValueFailure');
    } else {
      this.handleSelectState(option);
    }
  }

  /**
   * Handles option selection via mouse.
   * @private
   * @param {MouseEvent} event - Event object from the browser.
   */
  handleMouseSelect(event) {
    if (!this.rootMenu || event.target === this) {
      return;
    }

    const option = event.target.closest('auro-menuoption, [auro-menuoption]');
    if (option) {
      this.index = this.items.indexOf(option);
      this.makeSelection();
    }
  }

  /**
   * Handles option hover events.
   * @private
   * @param {CustomEvent} event - Event object from the browser.
   */
  handleOptionHover(event) {
    const option = event.target;
    this.index = this.items.indexOf(option);
    this.updateActiveOption(this.index);
  }

  /**
   * Handles slot change events.
   * @private
   * @param {Event} evt - Event object from the browser.
   */
  handleSlotChange(evt) {
    if (this.parentElement && this.parentElement.closest('auro-menu, [auro-menu]')) {
      this.rootMenu = false;
    }

    if (this.rootMenu) {
      this.initializeMenu();
    } else if (this.noCheckmark) {
      this.updateItemsState(new Map([
        [
          'noCheckmark',
          true
        ]
      ]));
    }

    if (this.value) {
      this.items.forEach((opt) => {
        if (opt.value === this.value || (this.multiSelect && this.formattedValue.includes(opt.value))) {
          this.handleSelectState(opt);
          this.notifySelectionChange(evt.type);
        }
      });
    }
  }

  /**
   * Navigates through options using keyboard.
   * @private
   * @param {string} direction - 'up' or 'down'.
   */
  navigateOptions(direction) {
    // Return early if no items exist
    if (!this.items || !this.items.length) {
      return;
    }

    let newIndex = this.index;
    const increment = direction === 'down' ? 1 : -1;
    const maxIterations = this.items.length;
    let iterations = 0;
    let foundInteractiveOption = false;

    do {
      newIndex = (newIndex + increment + this.items.length) % this.items.length;
      iterations += 1;

      // Check if current option is interactive
      const currentOption = this.items[newIndex];
      if (isOptionInteractive(currentOption)) {
        foundInteractiveOption = true;
        break;
      }

      // Break if all options were checked
      if (iterations >= maxIterations) {
        break;
      }
    } while (iterations < maxIterations);

    // Handle the results of the search
    if (foundInteractiveOption) {
      // Update only if an interactive option was found
      this.index = newIndex;
      this.updateActiveOption(this.index);
    } else {
      // All options are disabled or non-interactive
      // Keep the current index unchanged
      dispatchMenuEvent(this, 'auroMenu-navigateFailure', {
        reason: 'No interactive options available',
        direction,
        currentIndex: this.index
      });
    }
  }

  /**
   * Updates the active option state and dispatches events.
   * @param {number} index - Index of the option to make active.
   */
  updateActiveOption(index) {
    if (!this.items || !this.items[index]) {
      return;
    }

    this.items.forEach((item) => item.classList.remove('active'));
    this.items[index].classList.add('active');
    this.optionActive = this.items[index];
    this.index = index;

    dispatchMenuEvent(this, 'auroMenu-activatedOption', this.items[index]);
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
  notifySelectionChange(source = undefined) {
    dispatchMenuEvent(this, 'auroMenu-selectedOption', { source });
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


/* eslint-disable no-underscore-dangle, no-magic-numbers, max-lines, no-extra-parens */
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


/**
 * The `auro-menu` element provides users a way to select from a list of options.
 * @customElement auro-menu
 *
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
       * When true, the entire menu and all options are disabled.
       */
      disabled: {
        type: Boolean,
        reflect: true
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
       * When true, displays a loading state using the loadingIcon and loadingText slots if provided.
       */
      loading: {
        type: Boolean,
        reflect: true
      },

      /**
       * Specifies a string used to highlight matched string parts in options.
       */
      matchWord: {
        type: String,
        attribute: 'matchword'
      },

      /**
       * When true, the selected option can be multiple options.
       */
      multiSelect: {
        type: Boolean,
        reflect: true,
        attribute: 'multiselect'
      },

      /**
       * When true, selected option will not show the checkmark.
       */
      noCheckmark: {
        type: Boolean,
        reflect: true,
        attribute: 'nocheckmark'
      },

      /**
       * Specifies the current active menuOption.
       */
      optionActive: {
        type: Object,
        attribute: 'optionactive'
      },

      /**
       * An array of currently selected menu options, type `HTMLElement` by default. In multi-select mode, `optionSelected` is an array of HTML elements.
       */
      optionSelected: {
        // Allow HTMLElement, HTMLElement[] arrays and undefined
        type: Object
      },

      /**
       * The value of the selected option. In multi-select mode, this is a JSON stringified array of selected option values.
       */
      value: {
        type: String,
        reflect: true,
        attribute: 'value'
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
   * @readonly
   * @returns {Array<HTMLElement>} - Returns the array of available menu options.
   */
  get options() {
    return this.items;
  }

  /**
   * @returns {number} - Returns the index of the currently active option.
   */
  get index() {
    return this._index;
  }

  /**
   * @param {number} value - Sets the index of the currently active option.
   */
  set index(value) {
    this.updateActiveOption(value);
  }

  /**
   * Gets the currently selected options as an array.
   * @returns {Array<HTMLElement>}
   */
  get selectedOptions() {
    if (!this.optionSelected) {
      return [];
    }
    if (Array.isArray(this.optionSelected)) {
      return this.optionSelected;
    }
    return [this.optionSelected];
  }

  /**
   * Gets the first selected option, or null if none.
   * @returns {HTMLElement|null}
   */
  get selectedOption() {
    const opts = this.selectedOptions;
    return opts.length > 0 ? opts[0] : null;
  }

  /**
   * @readonly
   * @returns {string} - Returns the label of the currently selected option(s).
   */
  get currentLabel() {
    if (!this.optionSelected) {
      return '';
    }
    if (Array.isArray(this.optionSelected)) {
      return this.optionSelected.map((opt) => opt.textContent).join(', ');
    }
    return this.optionSelected.textContent || '';
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
      // Defensive: `value` is declared as String, but consumers may assign arrays or other
      // types programmatically. Normalize without throwing so render/update never hard-crashes.
      if (Array.isArray(this.value)) {
        return this.value;
      }
      if (typeof this.value !== 'string') {
        return [String(this.value)];
      }
      if (this.value.startsWith("[")) {
        // Malformed JSON (e.g. a literal string that happens to start with "[") falls back
        // to a single-item array rather than throwing during render.
        try {
          const parsed = JSON.parse(this.value);
          return Array.isArray(parsed) ? parsed : [this.value];
        } catch {
          return [this.value];
        }
      }
      return [this.value];
    }
    return this.value;
  }

  /**
   * Selects options by value.
   * @param {string|string[]|undefined|null} value - The value(s) to select.
   * @public
   */
  selectByValue(value) {
    const isEmpty = value === undefined ||
      value === null ||
      (Array.isArray(value) && value.length === 0) ||
      (typeof value === 'string' && value.trim() === '');

    if (isEmpty) {
      this.clearSelection();
      return;
    }

    // `value` is a String property; stringify arrays so attribute reflection and `formattedValue` parsing stay correct.
    this.value = Array.isArray(value) ? JSON.stringify(value) : value;
  }

  // Lifecycle Methods

  connectedCallback() {
    super.connectedCallback();

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

  // eslint-disable-next-line complexity
  updated(changedProperties) {
    super.updated(changedProperties);

    // Single source of truth for 'auroMenu-selectedOption'. Selection handlers
    // mutate optionSelected and let Lit's update cycle dispatch here; the prior
    // .value comparison missed multi-select array changes and combined with the
    // explicit calls in handleDeselectState/makeSelection produced 2-3 duplicate
    // events per selection.
    if (changedProperties.has('optionSelected')) {
      this.notifySelectionChange();
    }

    // Reset selection if multiSelect mode changes
    if (changedProperties.has('multiSelect') && !changedProperties.has("value")) {
      this.clearSelection();
    }

    if (changedProperties.has("value")) {
      // Ensure items are populated before matching. `firstUpdated` normally initializes them,
      // but a `value` change can arrive before slotted options are appended (e.g. parent sets
      // value before children render). Without this guard, matching against an empty `items`
      // would falsely dispatch `auroMenu-selectValueFailure` for valid initial values.
      if (!this.items) {
        this.initItems();
      }

      // Handle null/undefined case
      if (this.value === undefined || this.value === null) {
        this.clearSelection();
      } else {
        let newSelected = null;

        if (this.multiSelect) {
          // In multiselect mode, this.value should be an array of strings
          const valueArray = this.formattedValue;
          const matchingOptions = this.items ? this.items.filter((item) => valueArray.includes(item.value)) : [];
          newSelected = matchingOptions.length > 0 ? matchingOptions : undefined;
        } else {
          // In single-select mode, this.value should be a string
          const matchingOption = this.items ? this.items.find((item) => item.value === this.value) : undefined;

          if (matchingOption) {
            newSelected = matchingOption;
            this._index = this.items.indexOf(matchingOption);
          } else {
            // If no matching option found, reset selection
            newSelected = undefined;
            this._index = -1;
          }
        }

        // If no matching options were found in either mode
        if (!newSelected || (Array.isArray(newSelected) && newSelected.length === 0)) {
          dispatchMenuEvent(this, 'auroMenu-selectValueFailure');
          if (this.optionSelected !== undefined) {
            this.optionSelected = undefined;
          }
          this._index = -1;
        } else if (!this.selectionEquals(this.optionSelected, newSelected)) {
          this.optionSelected = newSelected;
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
        const selected = Array.isArray(this.optionSelected) ? this.optionSelected : [this.optionSelected];
        selected.forEach((opt) => {
          if (opt.hasAttribute('event')) {
            this.handleCustomEvent(opt);
          }
        });
      }
    }

    // Process all other UI updates
    if (changedProperties.has('multiSelect') && this.rootMenu) {
      if (this.multiSelect) {
        this.setAttribute('aria-multiselectable', 'true');
      } else {
        this.removeAttribute('aria-multiselectable');
      }
    }

    this.updateItemsState(changedProperties);
  }

  /**
   * Updates the UI state and appearance of menu items based on changed properties.
   * @private
   * @param {Map<string, boolean>} changedProperties - LitElement's changed properties map.
   */
  updateItemsState(changedProperties) {
    // Handle loading state changes
    if (changedProperties.has('loading')) {
      this.setAttribute("aria-busy", this.loading);
      dispatchMenuEvent(this, "auroMenu-loadingChange", {
        loading: this.loading,
        hasLoadingPlaceholder: this.hasLoadingPlaceholder
      });
    }

    if (!this.items) {
      return;
    }

    // Handle noCheckmark propagation to all menus and options.
    // Propagate in both directions so toggling back to false also clears nested elements
    // (otherwise nested menus/options would stay stuck in no-checkmark mode).
    if (changedProperties.has('noCheckmark')) {
      this.querySelectorAll('auro-menu, [auro-menu], auro-menuoption, [auro-menuoption]').forEach((element) => {
        element.noCheckmark = this.noCheckmark;
      });
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
        // Create nested spacers
        const nested = option.querySelectorAll('.nestingSpacer');

        const displayValueEl = option.querySelector('[slot="displayValue"]');
        if (displayValueEl) {
          option.removeChild(displayValueEl);
        }

        // Build highlighted content via DOM APIs rather than innerHTML so any
        // `<`, `>`, or `&` in the option text renders literally (prevents XSS).
        const originalText = option.textContent;
        option.textContent = '';

        nested.forEach(() => {
          const spacer = document.createElement('span');
          spacer.className = 'nestingSpacer';
          option.appendChild(spacer);
        });

        const matches = [...originalText.matchAll(regexWord)];
        let lastIndex = 0;
        matches.forEach((match) => {
          const [matchText] = match;
          if (match.index > lastIndex) {
            option.appendChild(document.createTextNode(originalText.slice(lastIndex, match.index)));
          }
          const strong = document.createElement('strong');
          strong.textContent = matchText;
          option.appendChild(strong);
          lastIndex = match.index + matchText.length;
        });
        if (lastIndex < originalText.length) {
          option.appendChild(document.createTextNode(originalText.slice(lastIndex)));
        }

        if (displayValueEl) {
          option.append(displayValueEl);
        }
      }

      // Update disabled state
      if (changedProperties.has('disabled')) {
        option.disabled = this.disabled;
      }
    });

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

      if (this.multiSelect) {
        this.setAttribute('aria-multiselectable', 'true');
      }

      this.handleNestedMenus(this);
    }
  }

  /**
   * Initializes menu items and their attributes.
   * @private
   */
  initItems() {
    const found = Array.from(this.querySelectorAll('auro-menuoption, [auro-menuoption]'));
    this.items = found.length > 0 ? found : undefined;

    if (this.noCheckmark) {
      this.updateItemsState(new Map([
        [
          'noCheckmark',
          true
        ]
      ]));
    }

    this.dispatchEvent(new CustomEvent('auroMenu-optionsChange', {
      detail: {
        options: this.items
      }
    }));
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
      this.value = option.value;
      this.optionSelected = option;
    }

    this._index = this.items.indexOf(option);
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
    this._index = this.items.indexOf(option);

    // Update UI to reflect changes
    this.updateItemsState(new Map([
      [
        'optionSelected',
        true
      ]
    ]));

    // Notification happens via updated() when optionSelected changes above.
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
    // Reset to undefined - initial state
    this.value = undefined;
    this.optionSelected = undefined;
    this._index = -1;

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
   * Makes a selection based on the current index.
   * @private
   */
  makeSelection() {
    if (!this.items) {
      this.initItems();
    }

    // Get currently selected menu option based on index
    const option = this.items ? this.items[this._index] : undefined;

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
    } else if (!this.isOptionSelected(option)) {
      this.clearSelection();
      this.handleSelectState(option);
    } else {
      // Re-selecting the already-selected option in single-select doesn't change
      // state, so updated() won't fire. Notify explicitly so consumers (e.g.
      // auro-select closing its dropdown on Enter) still get the event.
      this.notifySelectionChange();
    }
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
   * Handles keyboard navigation and selection.
   * @private
   * @param {KeyboardEvent} event - The keydown event.
   */
  handleKeyDown(event) {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        this.navigateOptions('down');
        break;
      case "ArrowUp":
        event.preventDefault();
        this.navigateOptions('up');
        break;
      case "Tab":
        // Do not preventDefault on Tab so focus can move out of the menu (a11y: avoid trapping keyboard users).
        this.makeSelection();
        break;
      case "Enter":
        event.preventDefault();
        this.makeSelection();
        break;
      default:
        break;
    }
  }

  /**
   * Handles option selection via click events from menuoptions.
   * @private
   * @param {CustomEvent} event - The auroMenuOption-click event.
   */
  handleMouseSelect(event) {
    if (!this.rootMenu || this.disabled) {
      return;
    }

    const option = event.detail;
    if (option && this.items) {
      const idx = this.items.indexOf(option);
      if (idx >= 0) {
        this._index = idx;
        this.makeSelection();
      }
    }
  }

  /**
   * Handles option hover events.
   * @private
   * @param {CustomEvent} event - Event object from the browser.
   */
  handleOptionHover(event) {
    const option = event.detail;
    if (this.items) {
      const idx = this.items.indexOf(option);
      if (idx >= 0) {
        this.updateActiveOption(idx);
      }
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
    } else if (this.noCheckmark) {
      this.updateItemsState(new Map([
        [
          'noCheckmark',
          true
        ]
      ]));
    }
  }

  /**
   * Navigates through options using keyboard.
   * @param {string} direction - 'up' or 'down'.
   */
  navigateOptions(direction) {
    // Return early if no items exist
    if (!this.items || !this.items.length) {
      return;
    }

    let newIndex = this._index;
    if (newIndex === -1 && direction === 'up') {
      newIndex = this.items.length;
    }
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

    // Update only if an interactive option was found
    if (foundInteractiveOption) {
      this.updateActiveOption(newIndex);
    }
  }

  /**
   * Updates the active option state and dispatches events.
   * Accepts either a numeric index or an HTMLElement option.
   * @param {number|HTMLElement} indexOrOption - Index of the option or the option element to make active.
   */
  updateActiveOption(indexOrOption) {
    let idx = -1;

    if (typeof indexOrOption === 'number') {
      idx = indexOrOption;
    } else {
      idx = this.items ? this.items.indexOf(indexOrOption) : -1;
    }

    if (!this.items || !this.items[idx]) {
      return;
    }

    this.items.forEach((item) => item.classList.remove('active'));
    this.items[idx].classList.add('active');
    this.optionActive = this.items[idx];
    this._index = idx;

    dispatchMenuEvent(this, 'auroMenu-activatedOption', this.items[idx]);
  }

  /**
   * Handles custom events defined on options.
   * @private
   * @param {HTMLElement} option - Option with custom event.
   */
  handleCustomEvent(option) {
    const eventName = option.getAttribute('event');
    dispatchMenuEvent(this, eventName, { option });
    dispatchMenuEvent(this, 'auroMenu-customEventFired', { option });
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
   * @private
   * @param {any} current - Current selection.
   * @param {any} next - New selection to compare.
   * @returns {boolean} Whether the selections are equal.
   */
  selectionEquals(current, next) {
    if (current === next) {
      return true;
    }
    if (!current || !next) {
      return false;
    }
    if (Array.isArray(current) && Array.isArray(next)) {
      if (current.length !== next.length) {
        return false;
      }
      return current.every((item, idx) => item === next[idx]);
    }
    return false;
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

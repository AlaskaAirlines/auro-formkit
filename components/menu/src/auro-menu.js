/* eslint-disable no-underscore-dangle, no-magic-numbers, max-lines, no-extra-parens, max-depth */
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
  isSelectableByValue,
  dispatchMenuEvent,
  serializeMultiSelectValue,
  resolveSelectedOption,
  resolveSelectedOptions
} from './auro-menu-utils.js';
import { classMap } from "lit/directives/class-map.js";

/**
 * Monotonically increasing counter used to give each menu instance a unique
 * `_menuInstanceId` prefix. Auto-generating the id (rather than using a random
 * string) keeps option keys deterministic and collision-free across menus.
 * @private
 */
let menuInstanceIdCounter = 0;


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

    menuInstanceIdCounter += 1;

    Object.assign(this, {
      // Root-level menu (true) or a nested submenu (false)
      rootMenu: true,
      // Currently focused/active menu item index
      _index: -1,
      // Nested menu spacer
      nestingSpacer: '<span class="nestingSpacer"></span>',
      // Loading indicator for slot elements
      loadingSlots: null,
      // Unique id for this menu instance; prefixes every auto-generated option
      // key so keys never collide across menus in the same document.
      _menuInstanceId: `menu-${menuInstanceIdCounter}`,
      // Monotonically increasing counter for option key generation. Never
      // resets, so a key is never reused within this instance's lifetime.
      _optionKeyCounter: 0,
      // Key(s) of the option(s) the user has actively selected. A single string
      // in single-select, an array in multi-select, undefined when nothing is
      // user-selected. Used to disambiguate options that share a `value`.
      _selectedKey: undefined,
      // True only for the one updated() cycle following a user selection, so
      // reconciliation trusts `_selectedKey`. A `value` change from a consumer's
      // direct property assignment leaves this false, dropping the stale key so
      // reconciliation falls back to first-by-value (see updated()).
      _valueChangeFromSelection: false,
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
       * @readonly
       */
      optionActive: {
        type: Object,
        attribute: false
      },

      /**
       * The currently selected menu option(s). In single-select mode this is a single `HTMLElement` (or `undefined` when nothing is selected). In multi-select mode this is an array of `HTMLElement`s.
       * @readonly
       */
      optionSelected: {
        // Allow HTMLElement, HTMLElement[] arrays and undefined
        type: Object,
        attribute: false
      },

      /**
       * The value of the selected option. In multi-select mode, this is a JSON stringified array of selected option values.
       * Options marked `disabled` or `static` are not selectable by value; `hidden` options remain selectable. In single-select mode, if the value matches a non-selectable option the selection is cleared (`optionSelected` becomes `undefined`) and `auroMenu-selectValueFailure` is dispatched. In multi-select mode, non-selectable entries are dropped from the value and the remaining selectable entries are selected; `auroMenu-selectValueFailure` is dispatched only when none of the entries match a selectable option.
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
          // any valid JSON starting with `[` ALWAYS parses to an array
          return JSON.parse(this.value);
        } catch {
          return [this.value];
        }
      }
      return [this.value];
    }
    return this.value;
  }

  /**
   * Selects options by value. Options marked `disabled` or `static` are not selectable; `hidden` options remain selectable. In single-select mode, if the value matches a non-selectable option the selection is cleared and `auroMenu-selectValueFailure` is dispatched. In multi-select mode, non-selectable entries are dropped and the remaining selectable entries are selected; `auroMenu-selectValueFailure` is dispatched only when none of the entries match a selectable option. Passing `undefined`, `null`, an empty string, or an empty array clears the selection without dispatching a failure.
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

    // A programmatic value set carries no positional intent, so drop any
    // `_selectedKey` left over from a prior user click. This makes reconciliation
    // in updated() fall back to first-by-value (single) / value-in-DOM-order
    // (multi), matching the documented contract for programmatic selection even
    // when a stale key would still resolve to a duplicate-value option.
    this._selectedKey = undefined;

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

    // Consume the selection-driven flag for THIS cycle up front. Clearing it
    // unconditionally — not only inside the `value` branch below — prevents it
    // from lingering `true` when a selection produces a serialized `value`
    // byte-identical to the current one, in which case Lit schedules no
    // `value`-change cycle to consume it. A lingering flag would misclassify a
    // later consumer's programmatic `value` set as selection-driven and keep a
    // stale `_selectedKey`. The reconcile path below re-sets the instance flag
    // after this point, so its intentional cross-cycle hand-off still works.
    const valueChangeFromSelection = this._valueChangeFromSelection;
    this._valueChangeFromSelection = false;

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

      // Distinguish a selection-driven `value` change (a user click, which set
      // the flag in handleSelectState / _sortSelectedByDomOrder) from a
      // programmatic assignment by a consumer. A programmatic set carries no
      // positional intent, so drop any leftover `_selectedKey` and let
      // reconciliation fall back to first-by-value (single) / value-in-DOM-order
      // (multi) — the same contract selectByValue() guarantees, even when a
      // stale key would otherwise still resolve to a duplicate-value option.
      if (!valueChangeFromSelection) {
        this._selectedKey = undefined;
      }

      // Set when reconciliation reassigns `value` below. That reassignment schedules a
      // second updated() cycle, so the `event`-attribute dispatch is deferred to that
      // cycle to avoid firing option custom events twice on the same selection.
      let valueReconciled = false;

      // Handle null/undefined/empty case — empty/whitespace strings clear selection
      // consistently with selectByValue(''), and avoid downstream `.includes('')` matches.
      if (this.value === undefined || this.value === null || (typeof this.value === 'string' && this.value.trim() === '')) {
        this.clearSelection();
      } else {
        let newSelected = null;

        if (this.multiSelect) {
          // In multiselect mode, this.value should be an array of strings.
          // Defensive default: `formattedValue` can be undefined for unexpected value types,
          // and calling `.includes` on undefined would throw during reconciliation.
          const valueArray = this.formattedValue || [];
          // Resolve by key first (the user's exact picks), then fall back to
          // value matching for any values not resolved by key — so pre-selection
          // and programmatic value sets keep working. Result is DOM-ordered.
          const matchingOptions = resolveSelectedOptions(this.items, valueArray, this._selectedKey);
          newSelected = matchingOptions.length > 0 ? matchingOptions : undefined;

          // Reconcile `value` with the selectable set. An occurrence is dropped
          // only when it is loaded but no selectable option can satisfy it —
          // every loaded item sharing that value is non-selectable, or the value
          // recurs more often than it has selectable options (a duplicate value
          // whose extra siblings are disabled/static). This is count-based, not
          // presence-based, so an enabled option is kept even when a disabled
          // sibling shares its value — mirroring how `resolveSelectedOptions`
          // resolves the same set. Entries with no matching item yet are
          // preserved so async preselection still works, and the toggle handlers
          // rebuild `value` from `formattedValue`, so a rejected entry cannot
          // resurface on the next select/deselect.
          const selectableByValue = new Map();
          const loadedValues = new Set();
          if (this.items) {
            this.items.forEach((item) => {
              loadedValues.add(item.value);
              if (isSelectableByValue(item)) {
                selectableByValue.set(item.value, (selectableByValue.get(item.value) || 0) + 1);
              }
            });
          }

          const reconciled = valueArray.filter((val) => {
            // Not loaded yet (async preselection) — keep for a later cycle.
            if (!loadedValues.has(val)) {
              return true;
            }
            // Consume one selectable option per occurrence; drop once exhausted.
            const remaining = selectableByValue.get(val) || 0;
            if (remaining > 0) {
              selectableByValue.set(val, remaining - 1);
              return true;
            }
            return false;
          });

          if (reconciled.length !== valueArray.length) {
            // This is an internal correction, not a consumer's programmatic set,
            // so preserve the selection-driven flag through the re-entrant
            // updated() cycle it schedules. Otherwise that cycle would treat the
            // reassignment as programmatic and drop `_selectedKey` mid-cascade,
            // flipping resolution and looping.
            this._valueChangeFromSelection = true;
            this.value = serializeMultiSelectValue(reconciled);
            valueReconciled = true;
          }
        } else {
          // In single-select mode, this.value should be a string. Reject
          // disabled/static options so a programmatic value pointing at a
          // non-selectable option falls through to the no-match path below
          // (dispatching auroMenu-selectValueFailure) instead of pinning it.
          // `hidden` is intentionally NOT excluded: the combobox toggles
          // `hidden` as its type-ahead filter, so a filtered-out option is
          // still a valid programmatic selection.
          // Prefer the option the user actually selected (tracked by
          // `_selectedKey`) so a click on the second of two options sharing a
          // `value` resolves back to that exact element instead of the first
          // value match. Falls back to first-by-value for programmatic sets.
          const matchingOption = resolveSelectedOption(this.items, this.value, this._selectedKey);

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
          // Defer failure when no options are loaded yet (async pattern: parent sets
          // value before slotted options render). handleSlotChange re-runs matching
          // once items arrive. Without this guard, a valid preselected value gets
          // cleared by the failure listener before options ever exist to match against.
          const hasItemsToMatch = this.items && this.items.length > 0;
          if (hasItemsToMatch) {
            // Clear state BEFORE dispatching so synchronous listeners (e.g. auro-select's
            // updateDisplayedValue) read fresh `optionSelected` rather than the stale prior
            // selection and re-render the old label.
            if (this.optionSelected !== undefined) {
              this.optionSelected = undefined;
            }
            this._index = -1;
            dispatchMenuEvent(this, 'auroMenu-selectValueFailure');
          }
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

      // Notify of changes. Skip when reconciliation just reassigned `value`: the
      // follow-on update cycle re-runs this branch and fires the events exactly once.
      if (this.optionSelected !== undefined && !valueReconciled) {
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

    // Handle layout propagation to all menus and options.
    // Skip elements that had size/shape set by the author (marked in initItems);
    // explicit per-option overrides must survive menu-level propagation.
    const propagationTargets = this.querySelectorAll('auro-menu, [auro-menu], auro-menuoption, [auro-menuoption]');
    [
      'size',
      'shape'
    ].forEach((prop) => {
      if (changedProperties.has(prop)) {
        const explicitKey = prop === 'size' ? '_explicitSize' : '_explicitShape';
        propagationTargets.forEach((el) => {
          if (el[explicitKey]) {
            return;
          }
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
    }

    // Must run for nested menus too — sets level, role="group", and aria-label="submenu" based on parent.
    this.handleNestedMenus(this);
  }

  /**
   * Initializes menu items and their attributes.
   * @private
   */
  initItems() {
    const found = Array.from(this.querySelectorAll('auro-menuoption, [auro-menuoption]'));
    this.items = found.length > 0 ? found : undefined;

    // Record whether each propagation target had an author-set size/shape attribute
    // BEFORE menu has had a chance to propagate. Marker is set once per element so a
    // later menu-driven setAttribute doesn't re-flag the element as "explicit".
    this.querySelectorAll('auro-menu, [auro-menu], auro-menuoption, [auro-menuoption]').forEach((el) => {
      if (el._explicitSize === undefined) {
        el._explicitSize = el.hasAttribute('size');
      }
      if (el._explicitShape === undefined) {
        el._explicitShape = el.hasAttribute('shape');
      }
    });

    // Assign private keys once items are populated. Only the root menu assigns
    // keys: its `items` is a deep query that already includes nested submenu
    // options, so a single pass keys the entire tree. Nested menus skip this
    // and inherit keys from the root.
    if (this.rootMenu) {
      this._assignOptionKeys();
    }

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

  /**
   * Assigns a private, auto-generated unique key (`_optionKey`) to each menu
   * option that does not already have one. Keys are internal state on the
   * element instance — never reflected as an attribute or exposed publicly —
   * and let selection tracking distinguish options that share the same `value`.
   *
   * The `_optionKey === undefined` guard makes this idempotent: options keep the
   * key they were first assigned across re-renders and slot changes, and if a
   * nested menu's lifecycle runs a pass before the root, options simply wait for
   * the root to key them (or keep whatever key they already hold).
   * @private
   */
  _assignOptionKeys() {
    if (!this.items) {
      return;
    }

    this.items.forEach((option) => {
      if (option._optionKey === undefined) {
        this._optionKeyCounter += 1;
        option._optionKey = `${this._menuInstanceId}-${this._optionKeyCounter}`;
      }
    });
  }

  // Logic Methods

  /**
   * Updates menu state when an option is selected.
   * @private
   * @param {HTMLElement} option - The option element to select.
   */
  handleSelectState(option) {
    if (this.multiSelect) {
      const currentSelected = this.optionSelected || [];

      if (!currentSelected.includes(option)) {
        this.optionSelected = [
          ...currentSelected,
          option
        ];
      }

      // Re-sort by DOM order and rebuild `_selectedKey`/`value` from the
      // selected set so display order stays consistent with the menu, not with
      // click order.
      this._sortSelectedByDomOrder();
    } else {
      this.value = option.value;
      this.optionSelected = option;
      // Track the specific option the user selected so the value→option
      // reconciliation in updated() resolves back to this exact element even
      // when another option shares the same `value`.
      this._selectedKey = option._optionKey;
      // Mark this `value` change as selection-driven so updated() trusts the key.
      this._valueChangeFromSelection = true;
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
      // Remove this exact element from the selection (identity, not value — two
      // options can share a `value`), then rebuild `value`/`_selectedKey` from
      // the remaining set in DOM order. An empty result collapses to undefined.
      this.optionSelected = this.optionSelected.filter((selected) => selected !== option);
      if (this.optionSelected.length === 0) {
        this.optionSelected = undefined;
        this._selectedKey = undefined;
        this.value = undefined;
      } else {
        this._sortSelectedByDomOrder();
      }
    } else {
      // For single-select: Back to undefined when deselected
      this.value = undefined;
      this.optionSelected = undefined;
      this._selectedKey = undefined;
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
    this._selectedKey = undefined;
    this._index = -1;
  }

  /**
   * Re-sorts the multi-select selection into DOM order and rebuilds the derived
   * `_selectedKey` and `value` from `optionSelected`. Selection is always stored
   * and serialized in the order options appear in the menu, never in click
   * order — so selecting C then A yields `[A, C]`.
   * @private
   */
  _sortSelectedByDomOrder() {
    if (!this.multiSelect || !Array.isArray(this.optionSelected) || !this.items) {
      return;
    }

    const indexMap = new Map(this.items.map((item, index) => [
      item,
      index
    ]));

    // Sorting in place mutates `optionSelected` without a new array reference,
    // which Lit's `===` change-detection cannot see on its own — but that is
    // intentional and safe: both callers (handleSelectState / handleDeselectState)
    // assign a fresh `optionSelected` array immediately before calling, so Lit
    // already has a changed reference to react to, and the `value` write below
    // schedules the updated() cycle that re-derives `optionSelected` in DOM order
    // via resolveSelectedOptions. Do not "fix" this into a new-array assignment.
    //
    // Sort any element no longer in `items` (a stale selection left over from a
    // dynamic rebuild that the consumer has not cleared) to the END rather than
    // the front, so it never displaces a live option to the head of the
    // serialized order. Value reconciliation drops it on the next updated() cycle.
    this.optionSelected.sort((optionA, optionB) => (indexMap.get(optionA) ?? this.items.length) - (indexMap.get(optionB) ?? this.items.length));
    this._selectedKey = this.optionSelected.map((option) => option._optionKey);
    this.value = serializeMultiSelectValue(this.optionSelected.map((option) => option.value));
    // Mark this `value` change as selection-driven so updated() trusts the keys.
    this._valueChangeFromSelection = true;
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
    this._selectedKey = undefined;
    this._index = -1;

    // Clear active option state so a follow-up open/navigation starts fresh
    // rather than reusing a stale reference from before the reset.
    this.items?.forEach((item) => item.classList.remove('active'));
    this.optionActive = undefined;

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
    // Slot changes can fire on a menu mid-teardown (e.g. while a parent menu
    // is removing children to rebuild its content). In that window the menu
    // is detached and parentElement is null. Skip — handleNestedMenus will
    // run again when the menu is reattached.
    if (!menu.parentElement) {
      return;
    }

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

    // Recover `_index` from the highlighted option when it has been reset to -1.
    // The updated() reconciliation resets `_index = -1` whenever the value
    // collapses to undefined while `optionActive` still points at the highlighted
    // option — e.g. deselecting the last remaining option in multi-select, or a
    // programmatic clearSelection() in single-select while keyboard focus is on an
    // option. Without this, reading `items[-1]` returns undefined and the re-select
    // no-ops until the highlight is moved away and back. Mirrors auro-combobox's
    // reconcileMenuIndex.
    if (this._index < 0 && this.optionActive && this.items) {
      const activeIndex = this.items.indexOf(this.optionActive);
      if (activeIndex >= 0) {
        this._index = activeIndex;
      }
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

    // Nested menus must also reinitialize so items, level, role="group", and aria-label refresh on content changes.
    // Root-specific attributes (listbox/root/aria-multiselectable) remain gated by `rootMenu` inside initializeMenu.
    this.initializeMenu();

    // When options arrive after `value` was set (async option load), re-run matching
    // against the now-populated items. The earlier updated('value') call deferred
    // the failure dispatch because items were empty; this triggers the match now.
    const hasPendingValue = this.value !== undefined &&
      this.value !== null &&
      !(typeof this.value === 'string' && this.value.trim() === '');
    if (hasPendingValue && this.items && this.items.length > 0 && this.optionSelected === undefined) {
      this.requestUpdate('value', undefined);
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
      // Compare as sets — selection order may differ from DOM order after value-driven
      // reconciliation, but the selected set is what matters for change detection.
      const nextSet = new Set(next);
      return current.every((item) => nextSet.has(item));
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
            nocheckmark
            class="${this.hasLoadingPlaceholder ? "" : "empty"}"
          >
            <div class="loadingWrapper">
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

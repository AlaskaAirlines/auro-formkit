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
  hasDisabledAncestorMenu,
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
 * A list of options that people choose from, used as the options list inside `auro-select` and `auro-combobox`.
 *
 * **Key capabilities**
 * - **Multiple selection**: Set `multiselect` to let people select more than one option.
 * - **Preset selection**: Set `value` to select the matching option when the menu renders.
 * - **Match highlighting**: Set `matchword` to show the matching text in each option in bold.
 * - **Loading state**: Set `loading` to show the `loadingIcon` and `loadingText` slots in place of the options.
 * - **Grouped options**: Nest an `auro-menu` inside another to indent a group of options, while the outer menu keeps track of the selection.
 * - **Disabled menu**: Set `disabled` to turn off every option without changing each option's own `disabled` setting.
 *
 * @example
 * <auro-menu>
 *   <auro-menuoption value="stops">Stops</auro-menuoption>
 *   <auro-menuoption value="price">Price</auro-menuoption>
 * </auro-menu>
 *
 * @summary A list of options with single or multiple selection, match highlighting, a loading state, and grouped options.
 * @customElement auro-menu
 *
 * @event {CustomEvent<Element>} auroMenu-activatedOption - Fires when an option becomes the active (highlighted) option, through the arrow keys, hover, or `updateActiveOption()`. The option is in `detail`.
 * @event {CustomEvent<any>} auroMenu-customEventFired - Fires right after the menu fires the event named in an option's `event` attribute. The option is in `detail.option`.
 * @event {CustomEvent<{ loading: boolean; hasLoadingPlaceholder: boolean; }>} auroMenu-loadingChange - Fires when `loading` changes.
 * @event {CustomEvent<{ options: Array<HTMLElement> }>} auroMenu-optionsChange - Fires when the set of options in the menu changes.
 * @event {CustomEvent<any>} auroMenu-selectValueFailure - Fires when a value doesn't match any option that can be selected, or when someone chooses an option with no `value` in multi-select mode.
 * @event {CustomEvent<any>} auroMenu-selectValueReset - Fires when `reset()` clears the menu.
 * @event {CustomEvent<any>} auroMenu-selectedOption - Fires when the selection changes, including when an option is deselected or the selection is cleared. In single-select mode, it also fires when someone chooses the option that's already selected.
 * @slot loadingText - Text shown while the menu is loading, such as "Loading...". {@relevantWhen loading} {@category ui}
 * @slot loadingIcon - Icon shown while the menu is loading, such as an `auro-loader`. {@relevantWhen loading} {@category ui}
 * @slot - The `auro-menuoption` elements to choose from. It can also hold `<hr>` dividers and nested `auro-menu` elements. {@requiredWhen always} {@category ui}
 */
export class AuroMenu extends AuroElement {

  constructor() {
    super();

    // State properties (reactive)

    this.initializeArchitectureDefaults();

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
      _menuInstanceId: `menu-${menuInstanceIdCounter += 1}`,
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

  // Defaults for the layout/shape/size architecture props are set in a helper
  // (not the constructor body) so the CEM analyzer keeps their `@type` unions
  // instead of inferring `string` from a constructor-literal assignment.
  // See AlaskaAirlines/discussions#653.
  /**
   * Sets the default `shape` and `size` values. Called from the constructor.
   * @internal
   */
  initializeArchitectureDefaults() {
    this.shape = "box";
    this.size = "sm";
  }

  static get properties() {
    return {
      ...super.properties,

      /**
       * Sets a layout name for the menu. The menu has no layouts, so this doesn't currently change how it looks.
       * @category ui
       */
      layout: {
        type: String,
        attribute: "layout",
        reflect: true
      },

      /**
       * Sets the corner shape of every option in the menu. `box` (the default) and `snowflake` have square corners, and `pill` has fully rounded ends. An option's own `shape` overrides it.
       * @type {'box' | 'pill' | 'snowflake'}
       * @default 'box'
       * @category ui
       */
      shape: {
        type: String,
        attribute: "shape",
        reflect: true
      },

      /**
       * Sets the text size and spacing of every option in the menu, from `xs` (smallest) to `xl` (largest). An option's own `size` overrides it.
       * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl'}
       * @default 'sm'
       * @category ui
       */
      size: {
        type: String,
        attribute: "size",
        reflect: true
      },

      /**
       * Turns off the whole menu. Every option is shown in a muted style and can't be highlighted or selected with the mouse or keyboard, but each option's own `disabled` setting stays unchanged.
       * @category ui
       */
      disabled: {
        type: Boolean,
        reflect: true
      },

      /**
       * Holds how deeply a nested menu is indented, which sets how many spacers its options get.
       * @private
       */
      level: {
        type: Number,
        reflect: false,
        attribute: false
      },

      /**
       * Shows a loading placeholder in place of the options, using the `loadingIcon` and `loadingText` slots when they have content. Also sets `aria-busy` so screen readers know the options aren't ready.
       * @category ui
       */
      loading: {
        type: Boolean,
        reflect: true
      },

      /**
       * Sets the text to highlight in each option, such as what someone has typed into a search field. Matching text is shown in bold, ignoring case. Options marked `persistent`, `disabled`, `hidden`, or `static` aren't highlighted.
       * @category behavior
       */
      matchWord: {
        type: String,
        attribute: 'matchword'
      },

      /**
       * Lets people select more than one option. Choosing a selected option again deselects it, and `value` holds the selected values as a JSON array string, such as `'["stops","price"]'`.
       * @category behavior
       */
      multiSelect: {
        type: Boolean,
        reflect: true,
        attribute: 'multiselect'
      },

      /**
       * Hides the checkmark next to selected options. Applies to every option in the menu, including options in nested menus.
       * @category ui
       */
      noCheckmark: {
        type: Boolean,
        reflect: true,
        attribute: 'nocheckmark'
      },

      /**
       * Gets the active option: the one highlighted by the arrow keys or hover. It's `undefined` when no option is highlighted.
       * @readonly
       * @type {HTMLElement}
       * @category behavior
       */
      optionActive: {
        type: Object,
        attribute: false
      },

      /**
       * Gets the selected option, or an array of the selected options in multi-select mode. It's `undefined` when nothing is selected.
       * @readonly
       * @type {HTMLElement | HTMLElement[]}
       * @category behavior
       */
      optionSelected: {
        // Allow HTMLElement, HTMLElement[] arrays and undefined
        type: Object,
        attribute: false
      },

      /**
       * Sets the selected option by its `value`, such as `stops`, and updates when someone selects an option. In multi-select mode, it's a JSON array string, such as `'["stops","price"]'`, and values that match only `disabled` or `static` options are dropped. Options marked `disabled` or `static` can't be selected by value, but `hidden` options can; when nothing selectable matches, the selection is cleared and `auroMenu-selectValueFailure` fires.
       * @category behavior
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
   * Registers the element with the browser under a tag name.
   * @param {string} [name="auro-menu"] - The tag name to register the element under.
   *
   * @example
   * AuroMenu.register("custom-menu") // registers the element as <custom-menu>
   *
   */
  static register(name = "auro-menu") {
    AuroLibraryRuntimeUtils.prototype.registerComponent(name, AuroMenu);
  }

  /**
   * Gets the options in the menu, including options in nested menus, in the order they appear.
   * @readonly
   * @returns {Array<HTMLElement>|undefined} The `auro-menuoption` elements, or undefined when the menu has none.
   * @category behavior
   */
  get options() {
    return this.items;
  }

  /**
   * Gets or sets the position in `options` of the option that Enter and Tab act on: the option last highlighted or selected. It's `-1` when there's none.
   * @returns {number} The position in `options`, or -1 when there's none.
   * @category behavior
   */
  get index() {
    return this._index;
  }

  /**
   * Gets or sets the position in `options` of the option that Enter and Tab act on: the option last highlighted or selected. Setting it highlights that option and fires `auroMenu-activatedOption`.
   * @param {number} value - The position in `options` of the option to highlight. Positions outside `options` are ignored.
   * @category behavior
   */
  set index(value) {
    this.updateActiveOption(value);
  }

  /**
   * Gets the selected options as an array.
   * @returns {Array<HTMLElement>} The selected options, or an empty array when nothing is selected.
   * @category behavior
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
   * Gets the first selected option, or `null` when nothing is selected.
   * @returns {HTMLElement|null} The first selected option, or null when nothing is selected.
   * @category behavior
   */
  get selectedOption() {
    const opts = this.selectedOptions;
    return opts.length > 0 ? opts[0] : null;
  }

  /**
   * Gets the text of the selected option. In multi-select mode, gets the text of every selected option, separated by commas.
   * @readonly
   * @returns {string} The selected options' text, or an empty string when nothing is selected.
   * @category behavior
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
   * Gets `value` in the shape the menu works with: the string itself, or, in multi-select mode,
   * an array of values parsed from the JSON array string.
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
   * Selects the option whose `value` matches, or in multi-select mode, the options that match an array of values. Options marked `disabled` or `static` can't be selected, but `hidden` options can; when nothing selectable matches, the selection is cleared and `auroMenu-selectValueFailure` fires. Passing `undefined`, `null`, an empty string, or an empty array clears the selection without firing that event.
   * @param {string|string[]|undefined|null} value - The value to select, or an array of values in multi-select mode.
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

      // Announce menu-level disabled to assistive tech. `disabled` is never
      // written onto the option (AB#1566578), but aria-disabled has to be
      // pushed proactively — unlike interactivity checks, AT reads it
      // directly off the DOM rather than through a JS getter. Only clear it
      // on re-enable when the option isn't itself authored `disabled` AND no
      // other ancestor menu in its chain is still disabled — `this.items` is
      // a deep query, so toggling an unrelated root back on must not strip
      // aria-disabled from a nested submenu's options that are still
      // independently disabled.
      if (changedProperties.has('disabled')) {
        if (this.disabled) {
          option.setAttribute('aria-disabled', 'true');
        } else if (!option.disabled && !hasDisabledAncestorMenu(option)) {
          option.removeAttribute('aria-disabled');
        }
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

    // Options slotted in (or re-initialized) while the menu is already
    // disabled never went through the `disabled`-change branch that pushes
    // `aria-disabled` (AB#1566578) — re-apply it here the same way
    // `noCheckmark` already re-applies above. Only the `true` case needs
    // replaying: re-enabling the menu already clears existing items via the
    // normal `disabled`-change path, and a newly-added item that isn't
    // disabled has no `aria-disabled` to clear yet.
    if (this.disabled) {
      this.updateItemsState(new Map([
        [
          'disabled',
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
   * element instance, never reflected as an attribute or exposed publicly,
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

    // Eagerly sync the option DOM to the now-empty selection. Nulling the
    // reactive properties above normally schedules updated() → updateItemsState,
    // but that only runs when a property actually changes. If an option still
    // carries a stale `selected`/`aria-selected` attribute while these
    // properties are already undefined (e.g. options were rebuilt after a value
    // was set), no re-render fires and the option keeps rendering as selected.
    // Strip that state now so no option looks selected after a clear (AB#1634259).
    // Intentionally leaves `active`/`optionActive` untouched so a highlighted
    // option remains keyboard-re-selectable after emptying the value (AB#1606433).
    this.updateItemsState(new Map([
      [
        'optionSelected',
        true
      ]
    ]));
  }

  /**
   * Re-sorts the multi-select selection into DOM order and rebuilds the derived
   * `_selectedKey` and `value` from `optionSelected`. Selection is always stored
   * and serialized in the order options appear in the menu, never in click
   * order, so selecting C then A yields `[A, C]`.
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
   * Clears the selection and the active option, and sets `value` to `undefined`. Fires `auroMenu-selectValueReset`.
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
    // A disabled menu is inert — called directly by auro-select/auro-combobox
    // keyboard strategies as well as this menu's own handleKeyDown, so the
    // guard lives here rather than only at the keydown entry point.
    if (this.disabled) {
      return;
    }

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
   * Toggles the selection state of the menuoption.
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
   * Called when a key is pressed in the menu. The arrow keys move the active option, and Enter and Tab select it.
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
   * Called when an option fires `auroMenuOption-click`. Selects the clicked option, unless the menu is disabled or nested in another menu.
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
   * Called when the pointer moves over an option. Makes it the active option, unless it can't be highlighted.
   * @private
   * @param {CustomEvent} event - The `auroMenuOption-mouseover` event.
   */
  handleOptionHover(event) {
    const option = event.detail;

    // `pointer-events: none` normally keeps a real hover from ever reaching
    // a disabled-ancestor option, but this guard protects the few paths
    // that don't rely on pointer hit-testing (a synthetic `mouseover`
    // dispatch, test automation) from still activating it.
    if (!option || !isOptionInteractive(option)) {
      return;
    }

    if (this.items) {
      const idx = this.items.indexOf(option);
      if (idx >= 0) {
        this.updateActiveOption(idx);
      }
    }
  }

  /**
   * Called when the menu's content changes. Sets the menu up again, and re-applies a `value` that was set before the options arrived.
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
   * Moves the active option to the next or previous option, wrapping around at either end. Skips options that are `disabled`, `hidden`, or `static`, and does nothing when the menu is disabled.
   * @param {string} direction - The direction to move, `up` or `down`.
   */
  navigateOptions(direction) {
    // A disabled menu is inert — no option becomes active via keyboard.
    if (this.disabled) {
      return;
    }

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
   * Makes an option the active (highlighted) option and fires `auroMenu-activatedOption`. Does nothing when the option or position isn't in `options`.
   * @param {number|HTMLElement} indexOrOption - The position in `options` of the option to make active, or the option element itself.
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
   * Fires the event named in the option's `event` attribute, then `auroMenu-customEventFired`, with the option in `detail.option`.
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
   * Checks whether two selections hold the same options, in any order.
   * @private
   * @param {any} current - The current selection.
   * @param {any} next - The new selection to compare.
   * @returns {boolean} True if both are the same option or hold the same set of options; false otherwise.
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
   * Checks whether the menu has content for the `loadingIcon` or `loadingText` slot. Only content present when the menu first renders counts.
   * @returns {boolean} True if either slot had content when the menu first rendered; false otherwise.
   */
  get hasLoadingPlaceholder() {
    return this.loadingSlots && this.loadingSlots.length > 0;
  }

  /**
   * Gets the wrapper element's classes, based on `size`.
   * @returns {Object} The class map for the wrapper element.
   * @private
   */
  get wrapperClasses() {
    return classMap({
      'menuWrapper': true,
      [this.size]: true,
    });
  }

  /**
   * Renders the menu's content: the options, or the loading placeholder while `loading` is set.
   * @protected
   * @returns {import("lit").TemplateResult} The template to render.
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

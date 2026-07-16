// Copyright (c) 2026 Alaska Airlines. All rights reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

/* eslint-disable complexity, max-lines, lit/binding-positions, lit/no-invalid-html, no-underscore-dangle, no-extra-parens */

// If using litElement base class
import { css } from "lit";
import { html } from 'lit/static-html.js';
import { classMap } from 'lit/directives/class-map.js';
import { AuroDependencyVersioning } from '@aurodesignsystem/auro-library/scripts/runtime/dependencyTagVersioning.mjs';

import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';
import AuroFormValidation from '@aurodesignsystem/form-validation';

import { announceToScreenReader, doubleRaf, guardTouchPassthrough, restoreTriggerAfterClose, applyKeyboardStrategy } from '@aurodesignsystem/utils';
import { comboboxKeyboardStrategy } from './comboboxKeyboardStrategy.js';

import { AuroDropdown } from '@aurodesignsystem/auro-dropdown';
import { AuroInput } from '@aurodesignsystem/auro-input';
import { AuroBibtemplate } from '@aurodesignsystem/auro-bibtemplate';
import formkitVersion from '@aurodesignsystem/version';

// Import touch detection lib
import styleCss from './styles/style-css.js';
import styleEmphasizedCss from './styles/emphasized/style-css.js';
import styleSnowflakeCss from './styles/snowflake/style-css.js';

import { AuroElement } from '../../layoutElement/src/auroElement.js';
import { AuroHelpText } from "@aurodesignsystem/auro-helptext";
import { ifDefined } from "lit/directives/if-defined.js";

/**
 * Strips only trailing whitespace from an input value so residual spaces
 * from cursor editing don't break filtering or highlighting.  Whitespace-only
 * values are preserved as-is to prevent a lone space from being treated as
 * empty input.
 * @param {string} value - Raw input value.
 * @returns {string} Normalized value.
 */
function normalizeFilterValue(value) {
  const raw = value || '';
  return raw.trim() ? raw.trimEnd() : raw;
}

/**
 * Returns the option's plain-text label suitable for input.value, with
 * HTML-indentation whitespace collapsed and the displayValue slot text
 * removed (the slot renders separately in the trigger).
 * @param {HTMLElement} option - An auro-menuoption element.
 * @returns {string} Normalized label.
 */
function getOptionLabel(option) {
  if (!option) {
    return '';
  }

  // Consumer-provided override: short-circuit the DOM walk entirely.
  if (option.dataset && option.dataset.label) {
    return option.dataset.label;
  }

  // Walk direct children — the `slot` attribute only applies to direct children
  // of the slot host, so a shallow filter is sufficient. Avoids the cloneNode +
  // querySelector allocation that ran on every keystroke via syncValuesAndStates.
  let text = '';
  for (const node of option.childNodes) {
    const isDisplayValueSlot = node.nodeType === Node.ELEMENT_NODE && node.getAttribute('slot') === 'displayValue';
    if (!isDisplayValueSlot) {
      text += node.textContent || '';
    }
  }
  return text.replace(/\s+/gu, ' ').trim();
}

// See https://git.io/JJ6SJ for "How to document your components using JSDoc"
/**
 * The `auro-combobox` element provides users with a way to select an option from a list of filtered or suggested options based on user input.
 * @customElement auro-combobox
 *
 * @slot - Default slot for the menu content.
 * @slot {HTMLSlotElement} optionalLabel - Allows overriding the optional display text "(optional)", which appears next to the label.
 * @slot ariaLabel.input.clear - Sets aria-label on clear button
 * @slot ariaLabel.bib.close - Sets aria-label on close button in fullscreen bib
 * @slot bib.fullscreen.headline - Defines the headline to display above menu-options
 * @slot label - Defines the content of the label.
 * @slot helpText - Defines the content of the helpText.
 * @slot displayValue - Allows custom HTML content to display the selected value when the combobox is not focused. Only works with `snowflake` and `emphasized` layouts.
 * @event auroCombobox-valueSet - (Deprecated) Notifies that the component has a new value set.
 * @event input - Notifies that the component has a new value set.
 * @event inputValue - Notifies that the components internal HTML5 input value has changed.
 * @event auroFormElement-validated - Notifies that the component value(s) have been validated.
 */
export class AuroCombobox extends AuroElement {

  constructor() {
    super();

    this._initializeDefaults();
  }

  /**
   * @private
   * @returns {void} Internal defaults.
   */
  _initializeDefaults() {
    // Defaults that effect the combobox behavior and state
    this.appearance = "default";
    this.disabled = false;
    this.msgSelectionMissing = 'Please select an option.';
    this.noFilter = false;
    this.noValidate = false;
    this.optionActive = null;
    this.persistInput = false;
    this.required = false;
    this.typedValue = undefined;
    this.behavior = "suggestion";
    this.clearBtnFocused = false;

    // Defaults that effect the overall layout of the combobox
    this.checkmark = false;
    this.dvInputOnly = false;
    this.fullscreenBreakpoint = 'sm';
    this.layout = 'classic';
    this.matchWidth = true;
    this.shape = 'classic';
    this.size = 'xl';
    this.triggerIcon = false;

    // Defaults that effect the dropdown
    this.placement = 'bottom-start';
    this.offset = 0;
    this.noFlip = false;
    this.shift = false;
    this.autoPlacement = false;

    // Private properties that manage internal state
    const versioning = new AuroDependencyVersioning();

    this.dropdownTag = versioning.generateTag('auro-formkit-combobox-dropdown', formkitVersion, AuroDropdown);
    this.bibtemplateTag = versioning.generateTag('auro-formkit-combobox-bibtemplate', formkitVersion, AuroBibtemplate);
    this.inputTag = versioning.generateTag('auro-formkit-combobox-input', formkitVersion, AuroInput);
    this.helpTextTag = versioning.generateTag('auro-formkit-input-helptext', formkitVersion, AuroHelpText);

    this.availableOptions = [];
    this.dropdownId = undefined;
    this.dropdownOpen = false;
    this._inFullscreenTransition = false;
    this.errorMessage = null;
    this.isHiddenWhileLoading = false;
    this.largeFullscreenHeadline = false;
    this.onDark = false;
    this.optionSelected = undefined;
    this.runtimeUtils = new AuroLibraryRuntimeUtils();
    this.touched = false;
    this.validation = new AuroFormValidation();
    this.validity = undefined;
    this._userTyped = false;
    // Tracks every setTimeout scheduled via _scheduleTimer so
    // disconnectedCallback can cancel them. Without this, a detached
    // combobox's pending timers still fire — most are no-ops, but
    // configureMenu's racing-condition retry would otherwise loop.
    this._pendingTimers = new Set();
  }

  /**
   * Wraps setTimeout and records the timer id so disconnectedCallback
   * can cancel any outstanding callbacks. The id is removed from the set
   * once the callback fires so the set doesn't grow unbounded.
   * @param {Function} fn - Callback to run.
   * @param {number} ms - Delay in milliseconds.
   * @returns {number} The timer id.
   * @private
   */
  _scheduleTimer(fn, ms) {
    const id = setTimeout(() => {
      this._pendingTimers.delete(id);
      fn();
    }, ms);
    this._pendingTimers.add(id);
    return id;
  }

  // This function is to define props used within the scope of this component
  // Be sure to review  https://lit-element.polymer-project.org/guide/properties#reflected-attributes
  // to understand how to use reflected attributes with your property settings.
  static get properties() {
    return {
      // ...super.properties,

      /**
       * Defines whether the component will be on lighter or darker backgrounds.
       * @property {'default' | 'inverse'} appearance - The visual appearance of the component.
       * @default 'default'
       */
      appearance: {
        type: String,
        reflect: true
      },

      /**
       * An enumerated attribute that defines what the user agent can suggest for autofill. At this time, only `autocomplete="off"` is supported.
       */
      autocomplete: {
        type: String,
        reflect: true
      },

      /**
       * If declared, bib's position will be automatically calculated where to appear.
       */
      autoPlacement: {
        type: Boolean,
        reflect: true
      },

      /**
       * Array of available options to display in the dropdown.
       * This array contains all non-hidden options (e.g., hidden by filtering on input value).
       * @private
       */
      availableOptions: {
        state: true,
        type: Array,
        reflect: false,
        hasChanged(newVal, oldVal) {
          if (!oldVal && !newVal) {
            return false;
          }
          if (!oldVal || !newVal) {
            return true;
          }
          if (newVal.length !== oldVal.length) {
            return true;
          }
          return newVal.some((opt, idx) => opt !== oldVal[idx]);
        }
      },

      /**
       * Sets the behavior of the combobox, "filter" or "suggestion".
       * "filter" requires the user to select an option from the menu.
       * "suggestion" allows the user to enter a value not present in the menu options.
       * @type {'filter' | 'suggestion'}
       * @default 'suggestion'
       */
      behavior: {
        type: String,
        reflect: true
      },

      /**
       * When attribute is present auro-menu will apply check marks to selected options.
       */
      checkmark: {
        type: Boolean,
        reflect: true
      },

      /**
       * If set, disables the combobox.
       */
      disabled: {
        type: Boolean,
        reflect: true
      },

      /**
       * ID for the dropdown.
       * @private
       */
      dropdownId: {
        type: String,
        reflect: false,
        attribute: false
      },

      /**
       * Whether or not the dropdown is open.
       * @private
       */
      dropdownOpen: {
        type: Boolean,
        reflect: false,
        attribute: false
      },

      /**
       * If defined, the display value slot content will only mask the HTML5 input element. The inputs label will not be masked.
       */
      dvInputOnly: {
        type: Boolean,
        reflect: true
      },

      /**
       * When defined, sets persistent validity to `customError` and sets the validation message to the attribute value.
       */
      error: {
        type: String,
        reflect: true
      },

      /**
       * Specifies the input mask format.
       */
      format: {
        type: String,
        reflect: true
      },

      /** Exposes inputmode attribute for input.  */
      inputmode: {
        type: String,
        attribute: true,
        reflect: true
      },

      /**
       * Sets the layout of the combobox.
       * @type {'classic' | 'emphasized' | 'snowflake'}
       * @default 'classic'
       */
      layout: {
        type: String,
        reflect: true
      },

      /**
       * If declared, the popover and trigger will be set to the same width.
       * @private
       */
      matchWidth: {
        type: Boolean,
        reflect: true
      },

      /**
       * If set, combobox will not filter menuoptions based on input.
       */
      noFilter: {
        type: Boolean,
        reflect: true
      },

      /**
       * If declared, the bib will NOT flip to an alternate position
       * when there isn't enough space in the specified `placement`.
       */
      noFlip: {
        type: Boolean,
        reflect: true
      },

      /**
       * If declared, the dropdown will shift its position to avoid being cut off by the viewport.
       */
      shift: {
        type: Boolean,
        reflect: true
      },

      /**
       * If set, disables auto-validation on blur.
       */
      noValidate: {
        type: Boolean,
        reflect: true
      },

      /**
       * Gap between the trigger element and bib.
       * @default 0
       */
      offset: {
        type: Number,
        reflect: true
      },

      /**
       * DEPRECATED - use `appearance="inverse"` instead.
       */
      onDark: {
        type: Boolean,
        reflect: true
      },

      /**
       * Specifies the current selected option.
       * @type {HTMLElement}
       */
      optionSelected: {
        type: Object
      },

      /**
       * If declared, selecting a menu option will not change the input value. By doing so,
       * the current menu filter will be preserved and the user can continue from their last
       * filter state. It is recommended to use this in combination with the `displayValue` slot.
       */
      persistInput: {
        type: Boolean,
        reflect: true
      },

      /**
       * Position where the bib should appear relative to the trigger.
       * @type {'top' | 'right' | 'bottom' | 'left' | 'bottom-start' | 'top-start' | 'top-end' | 'right-start' | 'right-end' | 'bottom-end' | 'left-start' | 'left-end'}
       * @default 'bottom-start'
       */
      placement: {
        type: String,
        reflect: true
      },

      /**
       * Define custom placeholder text, only supported by date input formats.
       */
      placeholder: {
        type: String,
        reflect: true
      },

      /**
       * Populates the `required` attribute on the input. Used for client-side validation.
       */
      required: {
        type: Boolean,
        reflect: true
      },

      /**
       * Sets a custom help text message to display for all validityStates.
       */
      setCustomValidity: {
        type: String
      },

      /**
       * Custom help text message to display when validity = `customError`.
       */
      setCustomValidityCustomError: {
        type: String
      },

      /**
       * Custom help text message to display when validity = `valueMissing`.
       */
      setCustomValidityValueMissing: {
        type: String
      },

      /**
       * Custom help text message to display when validity = `valueMissing` due to the user not choosing a menu option when behavior = "filter".
       */
      setCustomValidityValueMissingFilter: {
        type: String
      },

      /**
       * Indicates whether the combobox is in a dirty state (has been interacted with).
       * @private
       */
      touched: {
        type: Boolean,
        reflect: true,
        attribute: false
      },

      /**
       * If set, the `icon` attribute will be applied to the trigger `auro-input` element.
       * Icon rendering is currently limited to `type="credit-card"`. Setting `triggerIcon`
       * without a supported `type` propagates the attribute but does not render a visible icon.
       */
      triggerIcon: {
        type: Boolean,
        reflect: true
      },

      /**
       * Applies the defined value as the type attribute on `auro-input`.
       */
      type: {
        type: String,
        reflect: true
      },

      /**
       * Specifies the value of the input element within the combobox.
       */
      typedValue: {
        type: String,
        reflect: true
      },

      /**
       * Specifies the `validityState` this element is in.
       */
      validity: {
        type: String,
        reflect: true
      },

      /**
       * Value selected for the dropdown menu. When set programmatically or as a preset attribute, the value must match a selectable option. If it matches an option marked `disabled` or `static`, the selection is rejected: `value` and `optionSelected` are cleared to `undefined`. `hidden` options (including those filtered out by type-ahead) remain selectable by value.
       */
      value: {
        type: String
      },

      /* eslint-disable jsdoc/require-description-complete-sentence */
      /**
       * If declared, make bib.fullscreen.headline in HeadingDisplay.
       * Otherwise, Heading 600
       */
      largeFullscreenHeadline: {
        type: Boolean,
        reflect: true
      },
      /* eslint-enable jsdoc/require-description-complete-sentence */

      /**
       * Defines the screen size breakpointat which the dropdown switches to fullscreen mode on mobile. `disabled` indicates a dropdown should _never_ enter fullscreen.
       *
       * When expanded, the dropdown will automatically display in fullscreen mode
       * if the screen size is equal to or smaller than the selected breakpoint.
       * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'disabled'}
       * @default 'sm'
       */
      fullscreenBreakpoint: {
        type: String,
        reflect: true
      },

      /**
       * Specifies the currently active option.
       * @private
       */
      optionActive: {
        type: Object,
        reflect: false,
        attribute: false
      },

    };
  }

  static get styles() {
    return [
      css`${styleCss}`,
      css`${styleEmphasizedCss}`,
      css`${styleSnowflakeCss}`
    ];
  }

  /**
   * Returns the current value of the input element within the combobox.
   * @returns {string|undefined} The value of the input element, or undefined if the input is not present.
   */
  get inputValue() {
    if (!this.input) {
      return undefined;
    }
    return this.input.value;
  }

  /**
   * Checks if the element is valid.
   * @returns {boolean} - Returns true if the element is valid, false otherwise.
   */
  isValid() {
    let valid = true;

    if (this.validity !== undefined && this.validity !== 'valid') {
      valid = false;
    }

    return valid;
  }

  /**
   * This will register this element with the browser.
   * @param {string} [name='auro-combobox'] - The name of the element that you want to register.
   *
   * @example
   * AuroCombobox.register('custom-combobox') // this will register this element to <custom-combobox/>
   *
   */
  static register(name = 'auro-combobox') {
    AuroLibraryRuntimeUtils.prototype.registerComponent(name, AuroCombobox);
  }

  /**
   * Mark the first available (non-hidden), enabled option as `active`.
   * @private
   * @returns {void}
   */
  activateFirstEnabledAvailableOption() {
    const firstEnabledOptionIndex = this.availableOptions.findIndex((opt) => !opt.disabled && !opt.hasAttribute('nomatch'));
    this.updateActiveOption(firstEnabledOptionIndex);
  }

  /**
   * Mark the last available (non-hidden), enabled option as `active`.
   * @private
   * @returns {void}
   */
  activateLastEnabledAvailableOption() {
    let lastEnabledOptionIndex = -1;

    // Work backwards through the available options array to find the last enabled option
    for (let index = this.availableOptions.length - 1; index >= 0; index -= 1) {
      if (!this.availableOptions[index].disabled && !this.availableOptions[index].hasAttribute('nomatch')) {
        lastEnabledOptionIndex = index;
        break;
      }
    }

    this.updateActiveOption(lastEnabledOptionIndex);
  }

  /**
   * Updates the filter for the available options based on the input value.
   * @private
   */
  updateFilter() {
    // Reset available options if noFilter is set to false after being true.
    if (this.noFilter) {
      this.availableOptions = [...this.options];
      return;
    }

    this.noMatchOption = undefined;

    const filterValue = normalizeFilterValue(this.input.value).toLowerCase();

    this.options.forEach((option) => {
      let matchString = option.textContent.toLowerCase();

      if (option.hasAttribute('nomatch')) {
        this.noMatchOption = option;
      }

      if (option.hasAttribute('persistent')) {
        this.availableOptions.push(option);
      }

      if (option.hasAttribute('suggest')) {
        matchString = `${matchString} ${option.getAttribute('suggest')}`.toLowerCase();
      }

      if (!filterValue && option.hasAttribute('static')) {
        // Static options are shown when the input is empty so consumers can
        // surface headers / "add new" rows when no filter is active.
        option.removeAttribute('hidden');
        this.availableOptions.push(option);
      } else if (filterValue && matchString.includes(filterValue) && !option.hasAttribute('static')) {
        option.removeAttribute('hidden');
        this.availableOptions.push(option);
      } else if (!option.hasAttribute('persistent')) {
        option.setAttribute('hidden', '');
        option.removeAttribute('aria-setsize');
        option.removeAttribute('aria-posinset');
      }
    });

    if (this.availableOptions.length === 0) {
      // Only surface the nomatch option once the user has actually typed
      // something. Empty input is handled by the bib being closed.
      if (this.noMatchOption && filterValue) {
        this.noMatchOption.removeAttribute('hidden');
      } else if (!this.menu.loading || this.isHiddenWhileLoading) {
        this.hideBib();
      }
    } else if (this.noMatchOption) {
      this.noMatchOption.setAttribute('hidden', '');
    }
  }

  /**
   * Syncs the values and states of this component, the input, and the menu, including this.optionSelected and this.menu.optionSelected.
   * @private
   * @returns {void}
   */
  syncValuesAndStates() {
    // Do NOT call setMenuValue here — the caller (handleMenuOptions) already
    // guards setMenuValue with an option-match check. Calling it unconditionally
    // sets free-form values on the menu, triggering clearSelection which resets
    // _index and breaks subsequent makeSelection calls.
    if (this.menu) {
      this.menu.matchWord = normalizeFilterValue(this.input.value);
    }
    const label = getOptionLabel(this.menu.optionSelected);
    this.updateTriggerTextDisplay(label || this.value);
  }

  /**
   * Update displayValue or input.value, it's called when making a selection.
   * @param {string} label - The label of the selected option.
   * @private
   */
  updateTriggerTextDisplay(label) {
    // update the input content if persistInput is false
    // in suggestion mode, do not override input value if no selection has been made and the input currently has focus
    const isInputFocusedWithNoSelection = !this.menu.value && (this.input.matches(':focus-within') || (this.inputInBib && this.inputInBib.matches(':focus-within')));

    const suppressed = this.persistInput || (this.behavior === 'suggestion' && isInputFocusedWithNoSelection);
    if (!suppressed) {
      this.syncInputValuesAcrossTriggerAndBib(label || this.value);
    }

    // Replace any previously appended displayValue clone in the trigger.
    // :not(slot) excludes the template's <slot name="displayValue"
    // slot="displayValue"> forwarder, which also has slot="displayValue"
    // and would otherwise be matched first and removed.
    const displayValueInTrigger = this.input.querySelector('[slot="displayValue"]:not(slot)');

    if (displayValueInTrigger) {
      displayValueInTrigger.remove();
    }

    if (this.menu.optionSelected) {
      const displayValueEl = this.menu.optionSelected.querySelector("[slot='displayValue']");
      if (displayValueEl) {
        this.input.appendChild(displayValueEl.cloneNode(true));
      }

      // auro-input's hasDisplayValueContent is non-reactive; nudge it to
      // re-evaluate the slot and re-render so the displayValue wrapper
      // gets its hasContent class. Without this, the apple/icon stays
      // hidden when input.value is set in the same tick as the append.
      if (typeof this.input.checkDisplayValueSlotChange === 'function') {
        this.input.checkDisplayValueSlotChange();
        this.input.requestUpdate();
      }
    } else if (this.value) {
      // No optionSelected yet (e.g. setMenuValue was called but the menu's
      // auroMenu-selectedOption event hasn't fired yet, or we're on remount
      // with no options loaded). Synthesize a displayValue from the value so
      // the overlay isn't blank.
      const syntheticDV = document.createElement('span');
      syntheticDV.setAttribute('slot', 'displayValue');
      syntheticDV.textContent = this.value;
      this.input.appendChild(syntheticDV);
      if (typeof this.input.checkDisplayValueSlotChange === 'function') {
        this.input.checkDisplayValueSlotChange();
        this.input.requestUpdate();
      }
    }

    this.requestUpdate();
  }

  /**
   * Writes nextValue to the trigger input and the bib input when their current
   * value differs, then re-asserts imask after Lit's update flushes.
   * @param {string} nextValue - The value to write to both inputs.
   * @returns {Promise<void>} Resolves after both inputs flush and imask
   *   re-asserts; resolves immediately when no sync is needed.
   * @private
   */
  async syncInputValuesAcrossTriggerAndBib(nextValue) {
    // Only set the flag when there's an actual write to suppress —
    // syncValuesAndStates re-enters here during typing when both inputs
    // already match, and a no-op flag flip would make the bib branch's
    // bail eat legitimate user-input events.
    const triggerNeedsSync = this.input.value !== nextValue;
    const bibNeedsSync = Boolean(this.inputInBib) && this.inputInBib.value !== nextValue;
    if (!triggerNeedsSync && !bibNeedsSync) {
      return;
    }

    this._syncingDisplayValue = true;

    const pending = [];
    if (triggerNeedsSync) {
      this.input.value = nextValue;
      pending.push(this.input.updateComplete);
    }
    if (bibNeedsSync) {
      this.inputInBib.value = nextValue;
      pending.push(this.inputInBib.updateComplete);
    }
    // finally — not a bare .then — so that an imask throw (see commit
    // d1857401c: imask can throw on credit-card format change) doesn't strand
    // _syncingDisplayValue=true and silently swallow every subsequent input.
    try {
      await Promise.all(pending);
      // imask reasserts otherwise, and handleBlur reverts to its stale value.
      if (triggerNeedsSync && this.input.maskInstance && typeof this.input.maskInstance.updateValue === 'function') {
        this.input.maskInstance.updateValue();
      }
      if (bibNeedsSync && this.inputInBib.maskInstance && typeof this.inputInBib.maskInstance.updateValue === 'function') {
        this.inputInBib.maskInstance.updateValue();
      }
    } finally {
      this._syncingDisplayValue = false;
    }
  }

  /**
   * Processes hidden state of all menu options and determines if there are any available options not hidden.
   * @private
   * @param {object} [options={}] - Optional flag bag.
   * @param {boolean} [options.preferComboboxValue=false] - When true,
   *   handleMenuOptions matches the selected option against `this.value`
   *   first instead of `this.input.value`. Needed on mount and re-mount
   *   because under `persistInput` the consumer's typedValue prop can drift
   *   from the framework value (Svelte `{#key}` re-mount after a swap, or
   *   SPA preselect after route change) and the old input-first match would
   *   then pick the stale text. Only handleSlotChange passes this; typing
   *   and clearing paths keep the input-first match so user clears aren't
   *   undone.
   * @returns {void}
   */
  handleMenuOptions({ preferComboboxValue = false } = {}) {
    this.generateOptionsArray();
    this.availableOptions = [];
    // Single source of truth for the menu's filter/highlight token per call.
    // syncValuesAndStates re-writes the same value on exact-match keystrokes —
    // Lit's hasChanged makes that a no-op — and the prior duplicate set inside
    // handleTriggerInputValueChange is gone.
    if (this.menu) {
      this.menu.matchWord = normalizeFilterValue(this.input.value);
    }
    this.updateFilter();

    // Set aria-setsize/aria-posinset on each visible option so screen readers
    // can announce position even when the listbox context is broken by
    // shadow DOM boundaries in fullscreen dialog mode.
    const optionCount = this.availableOptions.length;
    this.availableOptions.forEach((option, index) => {
      option.setAttribute('aria-setsize', optionCount);
      option.setAttribute('aria-posinset', index + 1);
    });

    // On mount/re-mount (via handleSlotChange), prefer the framework-set
    // `this.value` when it matches a menu option. Covers SPA preselect and
    // consumer swap patterns (e.g. Svelte `{#key}` re-mount) where
    // `this.value` is authoritative but `this.input.value` may be empty or
    // carry stale typed text from another field. Event-driven callers do
    // not pass the flag, otherwise user clears would be undone by
    // re-syncing to the previous combobox.value.
    if (preferComboboxValue &&
        this.value &&
        this.menu.options?.some((opt) => opt.value === this.value)) {
      this.setMenuValue(this.value);
      this.syncValuesAndStates();
    } else if (this.input.value &&
        this.menu.options?.some((opt) => opt.value === this.input.value)) {
      this.setMenuValue(this.input.value);
      this.syncValuesAndStates();
    }

    // Re-activate when optionActive is not in the current scrollable viewport,
    // or when _index has been reset (e.g. by clearSelection in an async update)
    // so that makeSelection() can find the correct option.
    if (!this.availableOptions.includes(this.menu.optionActive) || this.menu._index < 0) {
      this.activateFirstEnabledAvailableOption();
    }
  }

  /**
   * Determines the element error state based on the `required` attribute and input value.
   * @private
   * @returns {void}
   */
  generateOptionsArray() {
    if (this.menu && this.menu.options) {
      this.options = this.menu.options;
    } else {
      this.options = [];
    }
  }

  /**
   * Hides the dropdown bib if its open.
   * @returns {void}
   */
  hideBib() {
    if (this.dropdown && this.dropdown.isPopoverVisible) {
      this.dropdown.hide();
    }
  }

  /**
   * Shows the dropdown bib if there are options to show.
   * @returns {void}
   */
  showBib() {
    // for fullscreen bib, with `noFilter` showBib() gets called again as availableOptions gets updated
    // to prevent closing bib in that case, adding guard not to hide bib for empty input on fullscreen bib
    if (!this.input.value && !this.dropdown.isBibFullscreen) {
      this.dropdown.hide();
      return;
    }
    if (!this.dropdown.isPopoverVisible && this.input.value && this.input.value.length > 0) {
      if (this.menu.getAttribute('loading') || this.availableOptions.length > 0 || this.noMatchOption !== undefined) {
        if (this.menu.hasAttribute('loading') && !this.menu.hasLoadingPlaceholder) {
          this.isHiddenWhileLoading = true;
        } else {
          this.dropdown.show();
        }
      }
    }
  }

  /**
   * Binds all behavior needed to the dropdown after rendering.
   * @private
   * @returns {void}
   */
  configureDropdown() {
    this.dropdown.a11yRole = "combobox";

    // Prevent dropdown from closing on focus loss since menu content is slotted
    // from combobox's light DOM and won't be detected by dropdown's contains() check.
    this.dropdown.noHideOnThisFocusLoss = true;

    // Listen for the ID to be added to the dropdown so we can capture it and use it for accessibility.
    this.dropdown.addEventListener('auroDropdown-idAdded', (event) => {
      this.dropdownId = event.detail.id;
    });

    // Listen for the dropdown to be shown or hidden
    this.dropdown.addEventListener("auroDropdown-toggled", (ev) => {
      this.dropdownOpen = ev.detail.expanded;
      this.updateMenuShapeSize();

      // Clear aria-activedescendant when dropdown closes
      if (!this.dropdownOpen && this.input) {
        this.input.setActiveDescendant(null);

        // Restore pointer events on the menu in case they were disabled
        // during fullscreen open to prevent touch pass-through.
        this.menu.style.pointerEvents = '';

        // When closing a fullscreen bib, restore focus to the trigger so that
        // keyboard navigation continues from the correct place in the page
        if (this.dropdown.isBibFullscreen) {
          restoreTriggerAfterClose(this.dropdown, this.input);

          // After the rAF inside restoreTriggerAfterClose() refocuses the
          // trigger, park the caret at end-of-text. Without this, the trigger
          // shows the new value (e.g. "Peaches") but its caret sits at [0, 0]
          // because nothing wrote to the native input between close and focus.
          doubleRaf(() => {
            this.setInputFocus();
          });
        }
      }

      if (this.dropdownOpen) {
        // Suppress or restore dialog semantics based on mode.
        // On desktop, VoiceOver verbosely announces "listbox inside of a dialog"
        // which is disruptive for combobox usage. Fullscreen needs dialog semantics.
        this.updateBibDialogRole();

        if (this.dropdown.isBibFullscreen) {
          // Guard against spurious validation during the focus transition
          // from trigger to bib input. Setting trigger.inert = true removes
          // focus, which fires focusout on the child auro-input before the
          // bib input receives focus. That focusout triggers the input's own
          // validate(), which dispatches a composed auroFormElement-validated
          // event. Because composed events are retargetted at each shadow DOM
          // boundary, the event appears to originate from the combobox itself
          // and its listener unconditionally sets this.validity — causing
          // premature validation. This flag suppresses all validation paths
          // (focusout handler, handleInputValueChange, validate(), and the
          // auroFormElement-validated listener) until focus settles in the bib.
          this._inFullscreenTransition = true;

          // Hide the trigger from assistive technology so VoiceOver cannot reach it
          // behind the fullscreen dialog
          this.dropdown.trigger.inert = true;

          guardTouchPassthrough(this.menu);

          // showModal() takes focus away from the trigger. Early focus once
          // the dialog has painted; the shared doubleRaf below is the fallback
          // for when the dialog needs an extra frame and also clears the
          // validation guard.
          requestAnimationFrame(() => {
            this.setInputFocus();
          });
        }
        // else (desktop popover-open): Chrome resets the trigger caret to
        // [0, 0] when its floating <label for="…"> overlay receives focus.
        // The shared doubleRaf below parks the caret back at end-of-text
        // after the dropdown layout settles.

        doubleRaf(() => {
          // Guard: skip if the dropdown closed before this rAF fired
          // (e.g. user selected an option immediately after the bib opened).
          if (this.dropdownOpen) {
            this.setInputFocus();
          }
          if (this._inFullscreenTransition) {
            this._inFullscreenTransition = false;
          }
        });
      }
    });

    this.dropdown.addEventListener('auroDropdown-triggerClick', () => {
      this.showBib();
    });

    // setting up bibtemplate
    this.bibtemplate = this.dropdown.querySelector(this.bibtemplateTag._$litStatic$);
    this.inputInBib = this.bibtemplate.querySelector(this.inputTag._$litStatic$);

    // Pass label text to the dropdown bib for accessible dialog naming
    const labelElement = this.querySelector('[slot="label"]');
    if (labelElement) {
      this.dropdown.bibDialogLabel = labelElement.textContent.trim() || undefined;
    }

    if (this.customBibWidth) {
      this.dropdown.dropdownWidth = this.customBibWidth;
    }

    // Exposes the CSS parts from the dropdown and bibtemplate for styling
    this.dropdown.exposeCssParts();
    this.bibtemplate.exposeCssParts();

    this.hideBib = this.hideBib.bind(this);
    this.bibtemplate.addEventListener('close-click', this.hideBib);

    this.setInputFocus = this.setInputFocus.bind(this);
    this.dropdown.addEventListener('auroDropdown-strategy-change', () => {
      // event when the strategy(bib mode) is changed between fullscreen and floating
      this.updateMenuShapeSize();
      this.updateBibDialogRole();

      // When switching to fullscreen while open, hide trigger from assistive technology
      if (this.dropdown.isBibFullscreen && this.dropdown.isPopoverVisible) {
        this.dropdown.trigger.inert = true;
      } else if (!this.dropdown.isBibFullscreen) {
        this.dropdown.trigger.inert = false;
      }

      this._scheduleTimer(() => {
        if (this.dropdown.isPopoverVisible) {
          this.setInputFocus();
        }
      }, 0);
    });
  }

  /**
   * @private
   */
  setClearBtnFocus() {
    doubleRaf(() => {
      // First establish focus inside the input's shadow root.
      // Without this, clearBtn.focus() silently fails when focus is on
      // document.body (e.g. after a click selection closes the bib dialog).
      // delegatesFocus on BaseInput routes this to the native <input>.
      this.input.focus();

      // Now move focus to the clear button within the same shadow root.
      const clearBtn = this.input.shadowRoot.querySelector('.clearBtn');
      if (clearBtn) {
        clearBtn.focus();
      }
    });
  }

  /**
   * @private
   */
  setTriggerInputFocus() {
    const input = this.input.shadowRoot.querySelector('input');
    if (input) {
      // Wait for the element to fully render across
      // multiple Lit update cycles before moving focus
      doubleRaf(() => {
        input.focus();
      });
    }
  }

  /**
   * @private
   */
  setInputFocus() {
    if (this.dropdown.isBibFullscreen && this.dropdown.isPopoverVisible) {
      // Sync the native input value synchronously before focusing.
      // Lit's property-to-attribute sync is async (microtask), so the
      // native <input> inside inputInBib may still hold a stale value
      // when focus moves here during the fullscreen transition. Without
      // this, keystrokes (e.g. Backspace) operate on the wrong content.
      const nativeInput = this.inputInBib.inputElement;
      const triggerNativeInput = this.input.inputElement;
      if (nativeInput && triggerNativeInput && nativeInput.value !== triggerNativeInput.value) {
        this.inputInBib.skipNextProgrammaticInputEvent = true;
        nativeInput.value = triggerNativeInput.value || '';
      }

      // Focus the native input directly to ensure it receives keystrokes
      // after the fullscreen dialog opens. The dialog's showModal() may
      // have moved focus to the dialog element itself; focusing the
      // auro-input custom element doesn't always reach the native input
      // when the dialog DOM isn't fully painted.
      if (nativeInput) {
        nativeInput.focus();
      } else {
        this.inputInBib.focus();
      }

      // Place cursor at end of existing text so the user can continue editing
      if (nativeInput && nativeInput.value) {
        const len = nativeInput.value.length;
        nativeInput.setSelectionRange(len, len);
      }
    } else {
      this.input.focus();
    }
  }

  /**
   * Suppresses or restores dialog semantics on the bib's dialog element.
   * On desktop (non-fullscreen), VoiceOver verbosely announces "listbox inside
   * of a dialog" which disrupts combobox usage. Setting role="presentation"
   * suppresses this. In fullscreen mode, dialog semantics are restored.
   * @private
   */
  updateBibDialogRole() {
    const bibEl = this.dropdown.bibElement && this.dropdown.bibElement.value;
    if (!bibEl) {
      return;
    }

    bibEl.dialogRole = this.dropdown.isBibFullscreen ? undefined : 'presentation';
  }

  /**
   * Update menu to default for fullscreen bib, otherwise to this.size and this.shape.
   * @private
   */
  updateMenuShapeSize() {
    if (!this.menu) {
      return;
    }

    if (this.dropdown && this.dropdown.isBibFullscreen) {
      this.menu.setAttribute('size', 'md');
      this.menu.setAttribute('shape', 'box');
    } else {
      this.menu.setAttribute('size', this.layout === 'emphasized' ? 'lg' : 'md');

      switch (this.layout) {
        case 'classic':
          this.menu.setAttribute('shape', 'box');
          break;
        case 'emphasized':
          if (this.dropdown && this.dropdown.bib) {
            this.dropdown.bib.shape = 'rounded';
          }
          this.menu.setAttribute('shape', 'rounded');
          break;
        default:
          this.menu.setAttribute('shape', this.defaultMenuShape || this.shape);
          break;
      }
    }
  }

  /**
   * Returns the shadow root containing the live region for screen reader announcements.
   * When the bib is open in fullscreen modal mode, everything outside the <dialog>
   * is inert, so we target the bib's own shadow root instead of the host's.
   * @private
   * @returns {ShadowRoot}
   */
  _getAnnouncementRoot() {
    if (this.dropdown.isBibFullscreen && this.dropdown.isPopoverVisible && this.dropdown.bibElement && this.dropdown.bibElement.value) {
      return this.dropdown.bibElement.value.shadowRoot;
    }
    return this.shadowRoot;
  }

  /**
   * Binds all behavior needed to the menu after rendering.
   * @private
   * @returns {void}
   */
  configureMenu() {
    this.menu = this.querySelector('auro-menu, [auro-menu]');

    // racing condition on custom-combobox with custom-menu
    if (!this.menu) {
      this._scheduleTimer(() => {
        this.configureMenu();
      }, 0);
      return;
    }

    this.defaultMenuShape = this.menu.getAttribute('shape');

    this.updateMenuShapeSize();

    // Sync options array like select does
    this.options = this.menu.options;
    this.menu.addEventListener("auroMenu-loadingChange", (event) => this.handleMenuLoadingChange(event));

    if (this.checkmark) {
      this.menu.removeAttribute('nocheckmark');
    } else {
      this.menu.setAttribute('nocheckmark', '');
    }

    // Handle menu option selection
    this.menu.addEventListener('auroMenu-selectedOption', (evt) => {
      // Capture before the consumption below — true means this event is the
      // echo of our own setMenuValue (programmatic value sync), false means
      // a fresh user selection.
      const isEcho = this._pendingMenuValueSync === true;

      if (this.menu.optionSelected) {
        const selected = this.menu.optionSelected;

        if (this.optionSelected !== selected) {
          this.optionSelected = selected;
        }

        // Skip writeback when this event is the echo of our own setMenuValue —
        // otherwise it cascades against handleInputValueChange in suggestion mode.
        if (this._pendingMenuValueSync) {
          this._pendingMenuValueSync = false;
        } else if (!this.value || this.value !== this.optionSelected.value) {
          this.value = this.optionSelected.value;
        }

        // Update display
        this.updateTriggerTextDisplay(getOptionLabel(this.optionSelected));

        // Update match word for filtering
        const trimmedInput = normalizeFilterValue(this.input.value);
        if (this.menu.matchWord !== trimmedInput) {
          this.menu.matchWord = trimmedInput;
        }
      }

      // Hide dropdown on selection (except during slot changes)
      if (evt.detail && evt.detail.source !== 'slotchange') {
        // do not close while typing in suggestion mode with no value selected, to allow freeform input
        this.hideBib();

        // Move focus to the clear button when the user makes a selection,
        // unless the Shift+Tab handler opted this selection out.
        if (this._suppressClearBtnFocusOnSelection) {
          this._suppressClearBtnFocusOnSelection = false;
        } else if (!isEcho && this.menu.value !== undefined) {
          this.setClearBtnFocus();
        }

        // Announce the selection after the dropdown closes so it isn't
        // overridden by VoiceOver's "collapsed" announcement from aria-expanded.
        // Skip when there's no selected value (e.g. menu.clearSelection() from
        // the unmatched-value path), otherwise VoiceOver reads "undefined".
        const selectedValue = this.menu.value;
        if (selectedValue) {
          const announcementDelay = 300;
          this._scheduleTimer(() => {
            announceToScreenReader(this._getAnnouncementRoot(), `${selectedValue}, selected`);
          }, announcementDelay);
        }
      }

      // Programmatic value syncs leave availableOptions stale because
      // updateTriggerTextDisplay sets input.value with _syncingDisplayValue
      // and handleInputValueChange bails. Refresh the filter on echo events
      // only — fresh user selections take the existing hideBib path.
      if (isEcho && this.menu.optionSelected) {
        this._programmaticFilterRefresh = true;
      }
    });

    this.menu.addEventListener('auroMenu-customEventFired', () => {
      this.hideBib();
    });

    // When the menu cannot match a programmatic value to any option,
    // clear the combobox selection state so it doesn't reference a
    // stale option. Safe from re-entrancy because any resulting
    // input.value changes dispatch isProgrammatic events.
    this.menu.addEventListener('auroMenu-selectValueFailure', () => {
      // Announce the rejection BEFORE we clear `this.value` so the live
      // region carries the attempted value — without this the bib closes
      // silently and screen-reader users get no signal that their request
      // (e.g. a direct setMenuValue() call) was dropped.
      const attemptedValue = this.value;
      if (attemptedValue) {
        announceToScreenReader(this._getAnnouncementRoot(), `No matching option for ${attemptedValue}`);
      }
      this.value = undefined;
      this.optionSelected = undefined;
    });

    this.menu.addEventListener('auroMenu-activatedOption', (evt) => {
      this.optionActive = evt.detail;

      if (this.input) {
        // setActiveDescendant runs after Lit's update finishes because the
        // template's `.a11yActivedescendant` binding calls setAttribute on
        // the internal <input> in auro-input.updated(), which clears the
        // reflected ariaActiveDescendantElement property. Setting the ref
        // synchronously here would get overwritten by that attribute write.
        // Awaiting updateComplete lets the attribute write finish first,
        // then the ref sticks and screen readers can cross the shadow-DOM
        // boundary to the auro-menuoption in light DOM.
        //
        // The equality check covers the async gap: this.optionActive can
        // change before the callback runs (user arrowed elsewhere, or the
        // menu closed and cleared it to null), so we bail if the target
        // no longer matches to avoid reinstating a stale ref.
        const targetOption = this.optionActive;
        this.updateComplete.then(() => {
          if (this.input && this.optionActive === targetOption) {
            this.input.setActiveDescendant(targetOption);
          }
        });
      }

      // In fullscreen mode the menu sits inside a nested <dialog> shadow root,
      // and aria-activedescendant references across that boundary are lost —
      // VoiceOver/NVDA don't read the active option natively, so we mirror it
      // into the polite live region. In popover mode aria-activedescendant on
      // the trigger input is read natively; double-announcing would flood the
      // queue on arrow-key repeat.
      if (this.optionActive && this.dropdown.isBibFullscreen) {
        const optionText = this.optionActive.textContent.trim();
        const selectedState = this.optionActive.hasAttribute('selected') ? ', selected' : ', not selected';
        const optionIndex = this.availableOptions.indexOf(this.optionActive) + 1;
        const optionCount = this.availableOptions.length;
        announceToScreenReader(this._getAnnouncementRoot(), `${optionText}${selectedState}, ${optionIndex} of ${optionCount}`);
      }

      // Check if user prefers reduced motion for accessibility
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      this.optionActive.scrollIntoView({
        alignToTop: false,
        block: "nearest",
        behavior: prefersReducedMotion ? "auto" : "smooth"
      });
    });

    // Handle slot changes
    this.menu.shadowRoot.addEventListener('slotchange', (event) => this.handleSlotChange(event));
  }

  /**
   * Binds all behavior needed to the input after rendering.
   * @private
   * @returns {void}
   */
  configureInput() {

    /**
     * Validate every time we remove focus from the combo box.
     */
    this.addEventListener('focusout', () => {
      // Skip while the dropdown is open — focus transits out briefly on
      // mousedown of a menu option (popover top-layer breaks :focus-within),
      // and validating against the pre-selection value flashes a stale error
      // between mousedown and mouseup. The next focusout fires after the
      // dropdown closes and validates against the post-selection value.
      if (!this.componentHasFocus && !this._inFullscreenTransition && !this.dropdownOpen) {
        this.validate();
      }
    });

    /**
     * Track focus on the clear button within the input.
     * This is used to prevent unwanted interactions when the clear button is focused.
     *
     * Use event delegation on the shadow root so the listener works regardless
     * of when .clearBtn is rendered (it only exists after a value is set).
     */
    this.input.shadowRoot.addEventListener('focusin', (event) => {
      if (event.target.closest('.clearBtn')) {
        this.clearBtnFocused = true;
      } else {
        this.clearBtnFocused = false;
      }
    });
  }

  /**
   * Manages the visibility of the dropdown based on loading state changes.
   *
   * This method listens for loading state changes and adjusts the visibility of the dropdown accordingly.
   * If the dropdown is visible and loading is true without any loading placeholders, it hides the dropdown
   * and sets a flag to indicate it is hidden while loading. If loading is false and the dropdown was previously
   * hidden, it checks if the active element is within the dropdown and shows it again if true.
   *
   * @private
   * @param {CustomEvent} event - The event object containing details about the loading state change.
   * @param {boolean} event.detail.loading - Indicates whether the menu is currently loading.
   * @param {boolean} event.detail.hasLoadingPlaceholder - Indicates if there are loading placeholders present.
   * @returns {void}
   */
  handleMenuLoadingChange(event) {
    if (!event.detail.loading && this.isHiddenWhileLoading) {
      if (this.contains(document.activeElement)) {
        this.dropdown.show();
      }
      this.isHiddenWhileLoading = false;
    }
  }

  /**
   * Handle changes to the input value and trigger changes that should result.
   * @private
   * @param {Event} event - The input event triggered by the input element.
   * @returns {void}
   */
  handleInputValueChange(event) {
    // When the event comes from the fullscreen bib input, sync the value to
    // the trigger input. Setting trigger.value triggers Lit's updated()
    // (async, microtask) which fires notifyValueChanged() → another 'input'
    // event from the trigger. The _syncingBibValue guard persists across the
    // async boundary and prevents that re-entrant event from running the
    // non-fullscreen path (which would call clear() → hideBib()).
    if (event.target === this.inputInBib) {
      // Mirror the trigger-branch bail below — programmatic inputInBib writes
      // notify back into this branch via Lit's notifyValueChanged.
      if (this._syncingDisplayValue) {
        return;
      }

      // Filtering runs via re-entrance: writing this.input.value below
      // dispatches an 'input' event that the trigger's listener routes to
      // handleTriggerInputValueChange, which refreshes the menu filter.
      if (this.input.value !== this.inputInBib.value) {
        this._syncingBibValue = true;
        this.input.value = this.inputInBib.value;
        this.input.updateComplete.then(() => {
          this._syncingBibValue = false;
        });
      }

      this.dispatchEvent(new CustomEvent('inputValue', { detail: { value: this.inputValue } }));
    } else if (event.target === this.input) {

      // Also sync the native input immediately so keystrokes arriving
      // before Lit's async update cycle (e.g. rapid Backspaces during a
      // fullscreen transition) operate on the correct content.
      // Skip the next programmatic input event to prevent the patched setter
      // from re-entering handleInputValueChange via the bib path.
      const bibNativeInput = this.inputInBib.inputElement;
      if (bibNativeInput && bibNativeInput.value !== this.input.value) {
        this.inputInBib.skipNextProgrammaticInputEvent = true;
        bibNativeInput.value = this.input.value || '';
      }
    }

    // SPA preselect guard: on init render, auro-input's notifyValueChanged
    // echoes an empty value through as an isProgrammatic input event before
    // the framework-set combobox.value has propagated down to the input.
    // Without this bail, the `this.value = this.input.value` below clobbers
    // the framework value with '' and clear() wipes optionSelected. Scoped
    // to the exact shape of that echo (isProgrammatic + non-empty combobox
    // value + empty input.value) so it doesn't affect the swap/typed paths
    // where value/input already track each other through the sync helpers.
    if (event && event.isProgrammatic && this.value && !this.input.value) {
      return;
    }

    this.value = this.input.value;

    // Ignore re-entrant input events caused by programmatic value sets.
    if (this._syncingBibValue || this._syncingDisplayValue) {
      return;
    }

    if (this.behavior === 'suggestion') {
      this.value = this.input.value;
    }

    if (!this.input.value && !this._clearing) {
      this.clear();
    }

    // Validate only if the value was set programmatically (not during user
    // interaction). In fullscreen dialog mode, componentHasFocus returns false
    // because focus is inside the top-layer dialog, so also check
    // dropdownOpen and the fullscreen transition flag.
    if (!this.componentHasFocus && !this.dropdownOpen && !this._inFullscreenTransition) {
      this.validate();
    }

    this.dispatchEvent(new CustomEvent('inputValue', { detail: { value: this.inputValue } }));
  }

  /**
   * Handles input value changes originating from the trigger input.
   * Refreshes menu options and filtering, delegates to handleInputValueChange
   * for value synchronization, and manages fullscreen bib focus.
   * @private
   * @param {Event} event - The input event from the trigger input element.
   * @returns {void}
   */
  handleTriggerInputValueChange(event) {
    // Clear a stale _programmaticFilterRefresh when the user is genuinely
    // interacting. On mount, updated('value') sets the flag, but the early
    // return at `this.value === this.input.value` exits before clearing it.
    // Without this, the first keystroke after mount fails to set _userTyped
    // and the bib doesn't open.
    if (this._programmaticFilterRefresh && this.componentHasFocus) {
      this._programmaticFilterRefresh = false;
    }

    // 'input' fires for every user-initiated value change — typing, paste,
    // IME composition end, dead-key composition, drag-drop. Flip _userTyped
    // here so updated('availableOptions') auto-opens the bib for sources
    // that keydown alone misses: paste fires no keydown, IME uses
    // key='Process', and dead keys produce multi-char keys (all bypass the
    // prior keydown.key.length===1 gate). Skip programmatic syncs.
    if (!this._syncingDisplayValue && !this._syncingBibValue && !this._programmaticFilterRefresh) {
      this._userTyped = true;
    }

    this.handleMenuOptions();
    this.optionActive = null;

    if (this.value === this.input.value) {
      return;
    }

    this.handleInputValueChange(event);

    if (this.dropdown.isBibFullscreen && this.input.value && this.input.value.length > 0 && this.dropdown.isPopoverVisible) {
      this.setInputFocus();
    }

    if (this._programmaticFilterRefresh) {
      this._programmaticFilterRefresh = false;
    }
  }

  /**
   * Binds all behavior needed to the combobox after rendering.
   * @private
   * @returns {void}
   */
  configureCombobox() {
    applyKeyboardStrategy(this, comboboxKeyboardStrategy, {
      // In modal mode the input moves into the bib; route keyboard events to that element instead.
      inputResolver: (comp, ctx) => (ctx.isModal && comp.inputInBib ? comp.inputInBib : comp.input),
    });

    this.addEventListener('focusin', (event) => {
      this.touched = true;

      if (event.composedPath()[0] === this) {
        this.focus();
      }
    });

    this.addEventListener('auroFormElement-validated', (evt) => {
      // During the fullscreen transition, child elements (auro-input) may fire
      // their own validation events when the trigger becomes inert and loses
      // focus. Those composed events bubble up through shadow DOM boundaries
      // and would incorrectly set combobox validity. Ignore them.
      if (this._inFullscreenTransition) {
        return;
      }

      // Ignore dispatches from the bib (fullscreen) input. It's re-validated
      // inside this.validate()'s auroInputElements loop with its own
      // (often undefined) validity, and the event is composed/bubbles up to
      // this listener with `target` retargeted to the combobox. Letting it
      // through would overwrite the trigger input's correct validity with
      // the bib input's stale one (e.g. wiping `tooShort` during typing).
      if (this.inputInBib && evt.composedPath()[0] === this.inputInBib && this.inputInBib !== this.input) {
        return;
      }

      this.input.validity = evt.detail.validity;
      this.input.errorMessage = evt.detail.message;
      this.validity = evt.detail.validity;
      this.errorMessage = evt.detail.message;
    });
  }

  /**
   * Handle element attributes on update.
   * @private
   * @returns {void}
   */
  performUpdate() {
    super.performUpdate();

    this.menus = [...this.querySelectorAll('auro-menu, [auro-menu]')];

    for (let index = 0; index < this.menus.length; index += 1) {
      if (this.checkmark) {
        this.menus[index].removeAttribute('nocheckmark');
      } else {
        this.menus[index].setAttribute('nocheckmark', '');
      }
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._inFullscreenTransition = false;
    // Cancel any outstanding timers so detached callbacks don't fire on
    // disposed DOM — most are no-ops, but configureMenu's racing-condition
    // retry would otherwise keep rescheduling itself indefinitely.
    this._pendingTimers.forEach((id) => clearTimeout(id));
    this._pendingTimers.clear();
  }

  firstUpdated() {
    // Add the tag name as an attribute if it is different than the component name
    this.runtimeUtils.handleComponentTagRename(this, 'auro-combobox');

    this.dropdown = this.shadowRoot.querySelector(this.dropdownTag._$litStatic$);
    this.input = this.dropdown.querySelector(this.inputTag._$litStatic$);

    this.configureInput();
    this.configureDropdown();
    this.configureCombobox();
    this.configureMenu();

  }

  /**
   * Focuses the combobox trigger input.
   * @returns {void}
   */
  focus() {
    if (!this.componentHasFocus) {
      this.input.focus();
    }
  }

  /**
   * Sets the menu value if menu is available.
   * @param {string} value - The value to set on the menu.
   * @returns {void}
   */
  setMenuValue(value) {
    if (!this.menu || this.menu.value === value) {
      return;
    }
    // One-shot flag consumed by the auroMenu-selectedOption listener so the
    // echo of this sync doesn't propagate back to this.value.
    this._pendingMenuValueSync = true;
    this.menu.value = value;
    // Backup clear: if menu.value === menu.optionSelected.value already, the
    // listener won't fire and the flag would swallow the next user click.
    this._scheduleTimer(() => {
      this._pendingMenuValueSync = false;
    }, 0);
  }

  /**
   * Resets component to initial state.
   * @returns {void}
   */
  reset() {
    this.optionSelected = undefined;
    this.value = undefined;
    this.typedValue = undefined;
    this.input.value = undefined;
    // Fullscreen bib mounts a second auro-input that holds the user-facing
    // native <input> on mobile; clearing only the trigger leaves stale text
    // there when the bib is reopened after reset.
    if (this.inputInBib) {
      this.inputInBib.value = undefined;
    }
    this.menu.value = undefined;
    this.validation.reset(this);
    this.touched = false;
    this.validity = undefined;
  }

  /**
   * Clears the current value of the combobox.
   * @returns {void}
   */
  clear() {
    // input.clear() fires an input event that re-enters handleInputValueChange
    // → which calls clear() again on empty input. Guard against that loop.
    if (this._clearing) {
      return;
    }
    this._clearing = true;
    try {
      this.optionSelected = undefined;
      this.value = undefined;

      // Clear the appended displayValue clone in the trigger if present.
      // :not(slot) excludes the template's <slot name="displayValue"
      // slot="displayValue"> forwarder (line 1816), which also has
      // slot="displayValue" and would otherwise be matched first and removed,
      // permanently breaking the consumer-provided displayValue slot.
      const displayValueInTrigger = this.input.querySelector('[slot="displayValue"]:not(slot)');

      if (displayValueInTrigger) {
        displayValueInTrigger.remove();
      }

      if (this.input.value) {
        this.input.clear();
      }
      if (this.menu.value || this.menu.optionSelected) {
        this.menu.reset();
      }
    } finally {
      this._clearing = false;
    }
  }

  /**
   * Validates value.
   * @param {boolean} [force=false] - Whether to force validation.
   */
  validate(force = false) {
    if (this._inFullscreenTransition) {
      return;
    }
    this.validation.validate(this, force);
  }

  updated(changedProperties) {
    // After the component is ready, propagate direct changes down to child components.
    if (changedProperties.has('value')) {
      // Only flag programmatic refreshes — user-typed value changes must not
      // suppress the availableOptions branch's showBib(). Firefox batches
      // 'value' and 'availableOptions' into the same updated() call, so
      // setting the flag unconditionally here masks the user-typed open path.
      if (!this._userTyped) {
        this._programmaticFilterRefresh = true;
      }

      if (this.input.value !== this.value) {
        // Clear menu.value AND menu.optionSelected together. Clearing only
        // menu.value leaves the previously-selected option element pinned
        // as menu.optionSelected; a later auroMenu-selectedOption event
        // would then write its stale .value back into combobox.value
        // (e.g. Tab-after-Backspace re-selecting the prior option).
        if (this.menu.value || this.menu.optionSelected) {
          this.menu.clearSelection();
        }

        if (!this.persistInput) {
          this.syncInputValuesAcrossTriggerAndBib(this.value || '');
        }

        // Programmatic value with no matching option: updateFilter will close
        // the bib silently (see line 648 — no noMatchOption + 0 results
        // hides). Announce so screen-reader users hear the request was
        // dropped. Gated on `input.value !== this.value` so this never fires
        // for user typing — that path always reconciles input.value to
        // this.value before updated() runs.
        if (
          this.value &&
          this.menu &&
          this.menu.options &&
          this.menu.options.length > 0 &&
          !this.menu.options.some((opt) => opt.value === this.value)
        ) {
          announceToScreenReader(this._getAnnouncementRoot(), `No matching option for ${this.value}`);
        }
      }

      if (!this.value) {
        this.clear();
      }

      // Sync the input and match word, but don't directly set menu.value again
      if (this.menu) {
        this.menu.matchWord = normalizeFilterValue(this.input.value);
      }

      this.dispatchEvent(new CustomEvent('input', {
        bubbles: true,
        cancelable: false,
        composed: true,
        detail: {
          optionSelected: this.menu.optionSelected,
          value: this.value
        }
      }));

      // Deprecated, need to be removed.
      this.dispatchEvent(new CustomEvent('auroCombobox-valueSet', {
        bubbles: true,
        cancelable: false,
        composed: true,
      }));
    }

    if (changedProperties.has('availableOptions')) {
      // dropdownOpen is set synchronously by the auroDropdown-toggled event
      // handler during showBib() → floater.showBib() → dispatchEventDropdownToggle(),
      // so it's already true by the time updated() runs. This prevents the else
      // branch from calling hideBib() when the dropdown was just opened but
      // :focus-within hasn't propagated through the top-layer dialog's nested
      // shadow DOM boundaries.
      // Skip the show/hide side effects when the availableOptions change came
      // from a programmatic filter refresh after a value swap — the user
      // didn't interact, so we shouldn't auto-open the bib (especially for
      // the no-match path where the existing condition unconditionally fires).
      if ((this.menu && !this._programmaticFilterRefresh)) {
        if (
          this.availableOptions.length > 0 ||
          this.menu.loading ||
          this.noMatchOption
        ) {
          if (this._userTyped && !this.dropdownOpen) {
            this.showBib();
          }
          this._userTyped = false;
        }

        if (!this.availableOptions.includes(this.menu.optionActive)) {
          this.activateFirstEnabledAvailableOption();
        }
      } else if (!this.dropdown.isBibFullscreen) {
        this.hideBib();
      }

      if (this._programmaticFilterRefresh) {
        this._programmaticFilterRefresh = false;
      }
    }

    if (changedProperties.has('error')) {
      if (this.hasAttribute('error')) {
        this.input.setAttribute('error', this.getAttribute('error'));
      } else {
        this.input.removeAttribute('error');
      }
      this.validate(true);
    }

    if (changedProperties.has('shape') && this.menu) {
      switch (this.layout) {
        case 'classic':
          this.menu.setAttribute('shape', 'box');
          break;
        case 'emphasized':
          this.menu.setAttribute('shape', 'rounded');
          break;
        default:
          this.menu.setAttribute('shape', this.defaultMenuShape || this.shape);
          break;
      }
    }

    if (changedProperties.has('size') && this.menu) {
      this.menu.setAttribute('size', this.layout === 'emphasized' ? 'lg' : 'md');
    }
  }

  /**
   * Applies slotted nodes to a target element with a new slot name.
   * @private
   * @param {HTMLSlotElement} slot - The slot element containing the nodes to apply.
   * @param {HTMLElement} target - The target element to apply the nodes to.
   * @param {string} newSlotName - The new slot name for the applied nodes.
   * @returns {void}
   */
  transportAssignedNodes(slot, target, newSlotName) {
    // Remove previous slot nodes if necessary.
    target.querySelectorAll(`[slot="${newSlotName}"]`).forEach((old) => old.remove());
    slot.assignedNodes().forEach((node) => {
      const clone = node.cloneNode(true);
      clone.setAttribute('slot', newSlotName);
      target.append(clone);
    });
  }

  /**
   * Updates the active option in the menu.
   * @param {number} index - Index of the option to make active.
   */
  updateActiveOption(index) {
    if (this.menu && this.menu.options && index >= 0 && this.availableOptions[index]) {
      // get index of all options including hidden ones,
      // since the active option can be hidden by filter
      const newIdx = this.menu.options.indexOf(this.availableOptions[index]);
      this.menu.index = newIdx;
    }
  }

  /**
   * Watch for slot changes and recalculate the menuoptions.
   * @private
   * @param {Event} event - `slotchange` event.
   * @returns {void}
   */
  handleSlotChange(event) {
    switch (event.target.name) {
      case '':
        if (!this.menu || this.menu !== this.querySelector('auro-menu, [auro-menu]')) {
          this.configureMenu();
        }

        if (!this.menu) {
          return;
        }

        // Treat only generic menuoptions.
        this.options = this.menu.querySelectorAll('auro-menuoption, [auro-menuoption]');
        this.options.forEach((opt) => {
          if (this.checkmark) {
            opt.removeAttribute('nocheckmark');
          } else {
            opt.setAttribute('nocheckmark', '');
          }
        });

        // Slot change (mount/re-mount): pass `preferComboboxValue` so that a
        // framework-set `this.value` wins over any stale `input.value` when
        // matching against the newly-available options. Fixes the display
        // for SPA preselect and Svelte `{#key}` re-mount swap patterns.
        this.handleMenuOptions({ preferComboboxValue: true });

        break;

      // Programmatically inject as the slot cannot be carried over to bibtemplate.
      // It's because the bib is/will be separated from dropdown to body.
      case 'label':
      case 'ariaLabel.input.clear':
      case 'optionalLabel':
        this.transportAssignedNodes(event.target, this.inputInBib, event.target.name);
        break;
      case 'bib.fullscreen.headline':
        this.transportAssignedNodes(event.target, this.bibtemplate, 'header');
        break;
      default: break;
    }
  }

  // function that renders the HTML and CSS into  the scope of the component
  render() {
    const helpTextContentClasses = {
      'util_displayHidden': this.validity !== undefined && this.validity !== 'valid',
      'helpTextMessage': true,
    };

    const errorTextContentClasses = {
      'util_displayHidden': this.validity === undefined || this.validity === 'valid',
      'errorMessage': true,
    };

    return html`
      <div>
        <span id="srAnnouncement" class="util_displayHiddenVisually" aria-live="polite" role="status"></span>
        <${this.dropdownTag}
          appearance="${this.onDark ? 'inverse' : this.appearance}"
          .fullscreenBreakpoint="${this.fullscreenBreakpoint}"
          .offset="${this.offset}"
          .placement="${this.placement}"
          ?autoPlacement="${this.autoPlacement}"
          ?disabled="${this.disabled}"
          ?error="${this.validity !== undefined && this.validity !== 'valid'}"
          ?noFlip="${this.noFlip}"
          ?shift="${this.shift}"
          disableEventShow
          fluid
          for="dropdownMenu"
          layout="${this.layout}"
          matchWidth="${ifDefined(this.matchWidth)}"
          nocheckmark
          rounded
          simple
          shape="${this.shape}"
          size="${this.size}">
            <${this.inputTag}
              @input="${this.handleTriggerInputValueChange}"
              appearance="${this.onDark ? 'inverse' : this.appearance}"
              .a11yActivedescendant="${this.dropdownOpen && this.optionActive ? this.optionActive.id : undefined}"
              .a11yExpanded="${this.dropdownOpen}"
              .a11yControls="${this.dropdownId}"
              .autocomplete="${this.autocomplete}"
              .inputmode="${this.inputmode}"
              .placeholder="${this.placeholder}"
              .type="${this.type}"
              .value="${this.typedValue}"
              ?disabled="${this.disabled}"
              ?icon="${this.triggerIcon}"
              ?dvInputOnly="${this.dvInputOnly}"
              ?required="${this.required}"
              a11yRole="combobox"
              id="${this.id}"
              layout="${this.layout}"
              noValidate="true"
              setCustomValidity="${this.setCustomValidity}"
              setCustomValidityCustomError="${this.setCustomValidityCustomError}"
              setCustomValidityValueMissing="${this.setCustomValidityValueMissing}"
              shape="${this.shape}"
              size="${this.size}"
              slot="trigger">
              <slot name="ariaLabel.input.clear" slot="ariaLabel.clear" @slotchange="${this.handleSlotChange}"></slot>
              <slot name="label" slot="label" @slotchange="${this.handleSlotChange}"></slot>
              <slot name="optionalLabel" slot="optionalLabel" @slotchange="${this.handleSlotChange}"> (optional)</slot>
              <slot name="displayValue" slot="displayValue"></slot>
            </${this.inputTag}>

          <${this.bibtemplateTag} ?large="${this.largeFullscreenHeadline}">
            <slot name="bib.fullscreen.headline" slot="header"></slot>
            <slot name="ariaLabel.bib.close" slot="ariaLabel.close">Close</slot>
            <slot @slotchange="${this.handleSlotChange}"></slot>
            <${this.inputTag}
              id="inputInBib"
              ?autofocus="${this.dropdownOpen && this.dropdown?.isBibFullscreen}"
              @input="${this.handleInputValueChange}"
              .a11yActivedescendant="${this.dropdownOpen && this.optionActive ? this.optionActive.id : undefined}"
              .a11yControls=${`${this.dropdownId}-floater-bib`}
              .autocomplete="${this.autocomplete}"
              .format="${this.format}"
              .inputmode="${this.inputmode}"
              .placeholder="${this.placeholder}"
              .type="${this.type}"
              .value="${this.typedValue}"
              ?disabled="${this.disabled}"
              ?icon="${this.triggerIcon}"
              ?required="${this.required}"
              a11yRole="combobox"
              .a11yExpanded="${this.dropdownOpen}"
              layout="classic"
              noValidate="true"
              shape="classic"
              simple
              size="sm"
              slot="subheader">
            </${this.inputTag}>
          </${this.bibtemplateTag}>

          <span slot="helpText">
            ${!this.validity || this.validity === 'valid'
        ? html`
                <${this.helpTextTag} class="${classMap(helpTextContentClasses)}" appearance="${this.onDark ? 'inverse' : this.appearance}"">
                  <p id="${this.uniqueId}" part="helpText">
                    <slot name="helpText"></slot>
                  </p>
                </${this.helpTextTag}>
              `
        : html`
                <${this.helpTextTag} class="${classMap(errorTextContentClasses)}" error appearance="${this.onDark ? 'inverse' : this.appearance}"">
                  <p id="${this.uniqueId}" role="alert" aria-live="assertive" part="helpText">
                    ${this.errorMessage}
                  </p>
                </${this.helpTextTag}>
              `
      }
          </span>
        </${this.dropdownTag}>
      </div>
    `;
  }
}

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
 * @param {string} value - The raw input value.
 * @returns {string} The value without trailing whitespace, or the value unchanged when it's only whitespace.
 */
function normalizeFilterValue(value) {
  const raw = value || '';
  return raw.trim() ? raw.trimEnd() : raw;
}

/**
 * Gets the option's plain-text label to put in `input.value`, with
 * HTML-indentation whitespace collapsed and the `displayValue` slot text
 * removed (the slot renders separately in the trigger). The option's
 * `data-label` attribute, when set, is used as-is.
 * @param {HTMLElement} option - An `auro-menuoption` element.
 * @returns {string} The option's label, or an empty string when there's no option.
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
 * A text field with a list of options that narrows as people type, so they can choose an option or enter their own value, such as a destination airport.
 *
 * **Key capabilities**
 * - **Suggestion or filter**: Set `behavior="filter"` to require choosing an option from the menu; the default, `suggestion`, also accepts typed text.
 * - **Filtering as people type**: Typing always hides options whose text doesn't include the typed text, unless `noFilter` is set.
 * - **Validation**: Set `required` to require a value, and `setCustomValidity` to change the error message.
 * - **Fullscreen on small screens**: Set `fullscreenBreakpoint` to choose the largest screen size at which the list opens as a fullscreen dialog.
 * - **Layouts**: Set `layout` to `classic`, `emphasized`, or `snowflake` to change the overall look.
 *
 * **Example**
 *
 * ```html
 * <auro-combobox>
 *   <span slot="bib.fullscreen.headline">Choose a destination</span>
 *   <span slot="label">Destination</span>
 *   <span slot="ariaLabel.input.clear">Clear destination</span>
 *   <auro-menu>
 *     <auro-menuoption value="SEA">Seattle</auro-menuoption>
 *     <auro-menuoption value="LAX">Los Angeles</auro-menuoption>
 *   </auro-menu>
 * </auro-combobox>
 * ```
 * @summary A text field with options that filter as people type, plus validation and a fullscreen mode for small screens.
 * @customElement auro-combobox
 *
 * @slot - The `<auro-menu>` that holds the options. {@requiredWhen always} {@category ui}
 * @slot {HTMLSlotElement} optionalLabel - Text shown after the label when `required` isn't set, such as a translated "(optional)". Defaults to "(optional)". {@relevantWhen !required} {@category ui}
 * @slot ariaLabel.input.clear - Text screen readers announce for the clear button, such as "Clear destination". The combobox has no default text, so without it the clear button has no accessible name. In the fullscreen bib, the clear button currently uses "Clear Input" instead. {@category a11y}
 * @slot ariaLabel.bib.close - Text screen readers announce for the close button in the fullscreen bib, such as "Close destination list". Defaults to "Close". {@requiredWhen always} {@category a11y}
 * @slot bib.fullscreen.headline - Headline shown above the options in the fullscreen bib, such as "Choose a destination". {@requiredWhen always} {@category ui}
 * @slot label - Label that names the combobox. Screen readers announce it as the name of the input and of the fullscreen dialog. {@requiredWhen always} {@category ui}
 * @slot helpText - Help text shown below the combobox. An error message replaces it while the combobox is invalid. {@category ui}
 * @slot displayValue - Content shown in the input in place of the selected option's text while the combobox doesn't have focus, such as an icon. Put it inside each `<auro-menuoption>` with `slot="displayValue"`, and the combobox copies the selected option's content here. {@category ui}
 * @csspart helpText - The help text or error message shown below the combobox.
 * @event auroCombobox-valueSet - Deprecated: Use the `input` event instead, which also includes the new value. Fires whenever `value` changes.
 * @event input - Fires whenever `value` changes, with the new `value` and `optionSelected` in `event.detail`.
 * @event inputValue - Fires when the text in the input changes, with the new text in `event.detail.value`.
 * @event auroFormElement-validated - Fires each time the combobox validates, with the current `validity` and error `message` in `event.detail`.
 */
export class AuroCombobox extends AuroElement {

  constructor() {
    super();

    this._initializeDefaults();
  }

  /**
   * Sets the default property values and internal state.
   * @private
   * @returns {void}
   */
  _initializeDefaults() {
    // Defaults that effect the combobox behavior and state
    /** @type {'default' | 'inverse'} */
    this.appearance = "default";
    this.disabled = false;
    this.msgSelectionMissing = 'Please select an option.';
    this.noFilter = false;
    this.noValidate = false;
    this.optionActive = null;
    this.persistInput = false;
    this.required = false;
    this.typedValue = undefined;

    /** @type {'filter' | 'suggestion'} */
    this.behavior = "suggestion";
    this.clearBtnFocused = false;

    // One-shot: set when the input's clear button is activated so the
    // SPA-preselect guard in handleInputValueChange doesn't swallow the
    // genuine clear (AB#1634257).
    this._clearBtnActivated = false;

    // Defaults that effect the overall layout of the combobox
    this.checkmark = false;
    this.dvInputOnly = false;

    /** @type {'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'disabled'} */
    this.fullscreenBreakpoint = 'sm';

    /** @type {'classic' | 'emphasized' | 'snowflake'} */
    this.layout = 'classic';
    this.matchWidth = true;

    /** @type {'box' | 'classic' | 'pill' | 'pill-left' | 'pill-right' | 'rounded' | 'snowflake'} */
    this.shape = 'classic';

    /** @type {'xs' | 'sm' | 'md' | 'lg' | 'xl'} */
    this.size = 'xl';
    this.triggerIcon = false;

    // Defaults that effect the dropdown
    /** @type {'top' | 'right' | 'bottom' | 'left' | 'bottom-start' | 'top-start' | 'top-end' | 'right-start' | 'right-end' | 'bottom-end' | 'left-start' | 'left-end'} */
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
   * Wraps `setTimeout` and records the timer ID so `disconnectedCallback`
   * can cancel any outstanding callbacks. The ID is removed from the set
   * once the callback fires, so the set doesn't keep growing.
   * @param {Function} fn - The callback to run.
   * @param {number} ms - The delay in milliseconds.
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
       * Sets the colors for the background the combobox sits on.
       * Use `inverse` on dark backgrounds and `default` everywhere else.
       * @type {'default' | 'inverse'}
       * @default 'default'
       * @category ui
       */
      appearance: {
        type: String,
        reflect: true
      },

      /**
       * Sets what the browser can suggest when filling in the field, such as `off` to turn off
       * autofill suggestions (the input's `autocomplete`). Only `autocomplete="off"` is currently supported.
       * @category behavior
       */
      autocomplete: {
        type: String,
        reflect: true
      },

      /**
       * Deprecated: Use `placement` instead.
       * Moves the bib to whichever side of the trigger has the most space.
       * The bib already flips to the opposite side when it doesn't fit, unless `noFlip` is set.
       * @deprecated Use `placement` instead.
       * @category ui
       */
      autoPlacement: {
        type: Boolean,
        attribute: 'autoplacement',
        reflect: true
      },

      /**
       * Holds the options shown in the menu: every option that isn't hidden,
       * such as by filtering on the typed text, plus `persistent` options.
       * @private
       * @type {HTMLElement[]}
       */
      availableOptions: {
        state: true,
        attribute: false,
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
       * Sets whether the combobox accepts typed text that isn't one of the options. Use `suggestion` (the default) when people
       * can enter their own value, and `filter` when they must choose an option from the menu.
       * In `filter` mode, typed text that doesn't match a chosen option fails validation, even when `required` isn't set.
       * @type {'filter' | 'suggestion'}
       * @default 'suggestion'
       * @category behavior
       */
      behavior: {
        type: String,
        reflect: true
      },

      /**
       * Shows a check mark next to the selected option in the menu.
       * @category ui
       */
      checkmark: {
        type: Boolean,
        reflect: true
      },

      /**
       * Turns the combobox off. A disabled combobox is shown in a muted style, and its input
       * can't be edited or reached with the keyboard.
       * @category ui
       */
      disabled: {
        type: Boolean,
        reflect: true
      },

      /**
       * Holds the dropdown's ID, which the trigger input uses for `aria-controls`.
       * @private
       */
      dropdownId: {
        type: String,
        reflect: false,
        attribute: false
      },

      /**
       * Records whether the bib is open.
       * @private
       */
      dropdownOpen: {
        type: Boolean,
        reflect: false,
        attribute: false
      },

      /**
       * Keeps the label visible while `displayValue` content is shown in place of the value.
       * Without it, the `displayValue` content hides both the label and the value.
       * @category ui
       */
      dvInputOnly: {
        type: Boolean,
        attribute: 'dvinputonly',
        reflect: true
      },

      /**
       * Shows an error that stays until you remove the attribute, and sets `validity` to `customError`.
       * The attribute value is the error message, unless `setCustomValidityCustomError` or `setCustomValidity` is set.
       * @category behavior
       */
      error: {
        type: String,
        reflect: true
      },

      /**
       * Sets the pattern the value is formatted to as the user types, such as `mm/dd/yyyy` for a date.
       * Does not currently apply to the trigger input, only to the input in the fullscreen bib.
       * @category behavior
       */
      format: {
        type: String,
        reflect: true
      },

      /**
       * Sets which on-screen keyboard mobile devices show, such as `numeric` for digits only
       * (the input's `inputmode`). Defaults to `numeric` when `type` is `number`, `tel`, `credit-card`, or `date`.
       * @category behavior
       */
      inputmode: {
        type: String,
        attribute: true,
        reflect: true
      },

      /**
       * Sets the overall style of the combobox. Use `emphasized` for a large, prominent combobox on light backgrounds,
       * and `snowflake` only on dark backgrounds with `appearance="inverse"`. The `emphasized` layout also shows larger menu options.
       * @type {'classic' | 'emphasized' | 'snowflake'}
       * @default 'classic'
       * @category ui
       */
      layout: {
        type: String,
        attribute: "layout",
        reflect: true
      },

      /**
       * Sets the shape of the trigger. Use `classic` with the `classic` layout, `pill`, `pill-left`, or `pill-right` with the
       * `emphasized` layout, and `snowflake` with the `snowflake` layout. In the `snowflake` layout, the menu options use the
       * same shape unless the `<auro-menu>` sets its own `shape`.
       * @type {'box' | 'classic' | 'pill' | 'pill-left' | 'pill-right' | 'rounded' | 'snowflake'}
       * @default 'classic'
       * @category ui
       */
      shape: {
        type: String,
        attribute: "shape",
        reflect: true
      },

      /**
       * Sets the height of the trigger. The menu options don't follow it: they use `lg` in the
       * `emphasized` layout and `md` otherwise.
       * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl'}
       * @default 'xl'
       * @category ui
       */
      size: {
        type: String,
        attribute: "size",
        reflect: true
      },

      /**
       * Makes the bib the same width as the trigger.
       * @private
       */
      matchWidth: {
        type: Boolean,
        attribute: 'matchwidth',
        reflect: true
      },

      /**
       * Shows every option whatever the user types, instead of hiding options that don't match.
       * Use it when your code replaces the options as the user types, such as with results from a server.
       * @category behavior
       */
      noFilter: {
        type: Boolean,
        attribute: 'nofilter',
        reflect: true
      },

      /**
       * Keeps the bib at its `placement` when there isn't enough space, instead of flipping it to the opposite side.
       * @category ui
       */
      noFlip: {
        type: Boolean,
        attribute: 'noflip',
        reflect: true
      },

      /**
       * Slides the bib along the trigger's edge to keep it inside the viewport.
       * @category ui
       */
      shift: {
        type: Boolean,
        reflect: true
      },

      /**
       * Turns off validation when focus leaves the combobox, and when its value changes while it doesn't have focus.
       * Setting `error` or calling `validate()` still validates.
       * @category behavior
       */
      noValidate: {
        type: Boolean,
        attribute: 'novalidate',
        reflect: true
      },

      /**
       * Sets the gap between the trigger and the bib in pixels, such as `8`.
       * @default 0
       * @category ui
       */
      offset: {
        type: Number,
        reflect: true
      },

      /**
       * Deprecated: Use `appearance="inverse"` instead.
       * Styles the combobox for a dark background.
       * @deprecated Use `appearance="inverse"` instead.
       * @category ui
       */
      onDark: {
        type: Boolean,
        attribute: 'ondark',
        reflect: true
      },

      /**
       * Holds the selected `<auro-menuoption>` element, or `undefined` when no option is selected.
       * The combobox updates it, so read it instead of setting it.
       * @type {HTMLElement}
       * @category behavior
       */
      optionSelected: {
        type: Object,
        attribute: false
      },

      /**
       * Keeps the typed text in the input when the user chooses an option, so the menu stays filtered
       * and they can choose again from the same results. Use it with the `displayValue` slot to show
       * the chosen option while the combobox doesn't have focus.
       * @category behavior
       */
      persistInput: {
        type: Boolean,
        attribute: 'persistinput',
        reflect: true
      },

      /**
       * Sets where the bib opens relative to the trigger, such as `bottom-start` for below the trigger, lined up with its start edge.
       * The bib flips to the opposite side when there isn't room, unless `noFlip` is set.
       * @type {'top' | 'right' | 'bottom' | 'left' | 'bottom-start' | 'top-start' | 'top-end' | 'right-start' | 'right-end' | 'bottom-end' | 'left-start' | 'left-end'}
       * @default 'bottom-start'
       * @category ui
       */
      placement: {
        type: String,
        reflect: true
      },

      /**
       * Sets hint text shown in the empty input, such as `Search airports`.
       * When not set and `type="date"`, the input shows the date format, such as `MM/DD/YYYY`.
       * @category ui
       */
      placeholder: {
        type: String,
        reflect: true
      },

      /**
       * Makes the combobox invalid when it's left empty, and removes the "(optional)" text after the label.
       * Use `setCustomValidityValueMissing` to set the error message.
       * @category behavior
       */
      required: {
        type: Boolean,
        reflect: true
      },

      /**
       * Sets one error message for every kind of validation error. When set, it replaces the messages from `error`
       * and every other `setCustomValidity*` property, except `setCustomValidityValueMissingFilter`.
       * @category behavior
       */
      setCustomValidity: {
        type: String,
        attribute: 'setcustomvalidity'
      },

      /**
       * Sets the error message shown while the `error` attribute is set, in place of the `error` value.
       * @relevantWhen error
       * @category behavior
       */
      setCustomValidityCustomError: {
        type: String,
        attribute: 'setcustomvaliditycustomerror'
      },

      /**
       * Sets the error message shown when a `required` combobox is left empty.
       * @relevantWhen required
       * @category behavior
       */
      setCustomValidityValueMissing: {
        type: String,
        attribute: 'setcustomvalidityvaluemissing'
      },

      /**
       * Sets the error message shown in `filter` mode when the typed text doesn't match a chosen option.
       * Set it as an attribute: setting only the property doesn't currently change the message.
       * @relevantWhen behavior === 'filter'
       * @category behavior
       */
      setCustomValidityValueMissingFilter: {
        type: String,
        attribute: 'setcustomvalidityvaluemissingfilter'
      },

      /**
       * Records whether the user has interacted with the combobox, such as by moving focus into it.
       * @private
       */
      touched: {
        type: Boolean,
        reflect: true,
        attribute: false
      },

      /**
       * Shows a card icon in the input that changes to the detected card brand, such as Visa, as the user types.
       * Applies only when `type="credit-card"`.
       * @relevantWhen type === 'credit-card'
       * @category ui
       */
      triggerIcon: {
        type: Boolean,
        attribute: 'triggericon',
        reflect: true
      },

      /**
       * Sets the kind of value the input expects, which controls its formatting, validation, and mobile keyboard.
       * `credit-card`, `tel`, and `date` format the value as the user types, and `password` hides the text.
       * Uses auro-input's default, `text`, when not set.
       * @type {'text' | 'password' | 'email' | 'credit-card' | 'tel' | 'number' | 'date'}
       * @category behavior
       */
      type: {
        type: String,
        reflect: true
      },

      /**
       * Sets the text in the input, such as a search the user started earlier.
       * It doesn't change as the user types, so read `inputValue` for the current text.
       * @category behavior
       */
      typedValue: {
        type: String,
        attribute: 'typedvalue',
        reflect: true
      },

      /**
       * Reports the result of the last validation, such as `valid`, `valueMissing`, or `customError`.
       * Validation sets it, so read it instead of setting it.
       * @category behavior
       */
      validity: {
        type: String,
        reflect: true
      },

      /**
       * Sets or gets the combobox's value: the chosen option's `value`, or the text in the input when no option is chosen.
       * A value that matches a `disabled` or `static` option is rejected, which clears `value` and `optionSelected` to `undefined`.
       * A value that matches a `hidden` option, such as one filtered out by typing, still selects it.
       * @category behavior
       */
      value: {
        type: String
      },

      /* eslint-disable jsdoc/require-description-complete-sentence */
      /**
       * Shows the `bib.fullscreen.headline` text in a larger heading style. Applies only when the bib is fullscreen.
       * @category ui
       */
      largeFullscreenHeadline: {
        type: Boolean,
        attribute: 'largefullscreenheadline',
        reflect: true
      },
      /* eslint-enable jsdoc/require-description-complete-sentence */

      /**
       * Sets the screen width, such as `sm`, at or below which the open bib fills the screen as a modal dialog.
       * Use `disabled` to keep the bib from ever going fullscreen.
       * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'disabled'}
       * @default 'sm'
       * @category ui
       */
      fullscreenBreakpoint: {
        type: String,
        attribute: "fullscreenbreakpoint",
        reflect: true
      },

      /**
       * Holds the active (highlighted) option.
       * @private
       * @type {HTMLElement}
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
   * Gets the text currently in the input, which changes as the user types.
   * @returns {string|undefined} The input's text, or undefined before the combobox first renders.
   * @category behavior
   */
  get inputValue() {
    if (!this.input) {
      return undefined;
    }
    return this.input.value;
  }

  /**
   * Checks whether the combobox passed its last validation.
   * @returns {boolean} True if `validity` is `valid` or the combobox hasn't been validated yet; false otherwise.
   */
  isValid() {
    let valid = true;

    if (this.validity !== undefined && this.validity !== 'valid') {
      valid = false;
    }

    return valid;
  }

  /**
   * Registers the element with the browser under a tag name.
   * @param {string} [name='auro-combobox'] - The tag name to register the element under.
   *
   * @example
   * AuroCombobox.register('custom-combobox') // registers the element as <custom-combobox>
   *
   */
  static register(name = 'auro-combobox') {
    AuroLibraryRuntimeUtils.prototype.registerComponent(name, AuroCombobox);
  }

  /**
   * Checks whether an option's own `disabled` or any ancestor `auro-menu`'s
   * `disabled` (root or a nested submenu the option is slotted inside)
   * applies. A menu never writes `disabled` onto its options (AB#1566578),
   * so an ancestor's disabled state has to be resolved at check-time by
   * walking up, mirroring `auro-menu`'s own `isOptionInteractive()`/
   * `isSelectableByValue()`. It's duplicated here rather than imported because
   * `auro-combobox` only ever talks to `auro-menu` through its public DOM
   * contract, not its internal module.
   * @private
   * @param {HTMLElement} option - The option to check.
   * @returns {boolean} True if the option or any ancestor menu is disabled; false otherwise.
   */
  isOptionOrAncestorMenuDisabled(option) {
    if (option.disabled) {
      return true;
    }

    let ancestor = option.closest('auro-menu, [auro-menu]');

    while (ancestor) {
      if (ancestor.disabled) {
        return true;
      }
      ancestor = ancestor.parentElement ? ancestor.parentElement.closest('auro-menu, [auro-menu]') : null;
    }

    return false;
  }

  /**
   * Marks the first available (non-hidden), enabled option as `active`.
   * @private
   * @returns {void}
   */
  activateFirstEnabledAvailableOption() {
    const firstEnabledOptionIndex = this.availableOptions.findIndex((opt) => !this.isOptionOrAncestorMenuDisabled(opt) && !opt.hasAttribute('nomatch'));
    this.updateActiveOption(firstEnabledOptionIndex);
  }

  /**
   * Marks the last available (non-hidden), enabled option as `active`.
   * @private
   * @returns {void}
   */
  activateLastEnabledAvailableOption() {
    let lastEnabledOptionIndex = -1;

    // Work backwards through the available options array to find the last enabled option
    for (let index = this.availableOptions.length - 1; index >= 0; index -= 1) {
      if (!this.isOptionOrAncestorMenuDisabled(this.availableOptions[index]) && !this.availableOptions[index].hasAttribute('nomatch')) {
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
   * Sets the menu's `matchWord` to the input text, then updates the input text and `displayValue` content from the selected option's label, or from `value` when no option is selected.
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
   * Updates the `displayValue` content and `input.value` after a selection.
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
      }
    } else if (this.value) {
      // No optionSelected yet (e.g. setMenuValue was called but the menu's
      // auroMenu-selectedOption event hasn't fired yet, or we're on remount
      // with no options loaded). Synthesize a displayValue from the value so
      // the overlay isn't blank.
      //
      // NOTE: This renders the raw machine value (e.g. "SEA"), not the
      // human-readable label (e.g. "Seattle, WA"). For consumers where
      // value ≠ label, this produces a brief flash of the raw value until
      // the option elements load and updateTriggerTextDisplay re-runs with
      // the correct label. This is intentionally preferred over a blank
      // state — the displayValueInTrigger.remove() cleanup above ensures
      // this placeholder is replaced once the real option is available.
      const syntheticDV = document.createElement('span');
      syntheticDV.setAttribute('slot', 'displayValue');
      syntheticDV.textContent = this.value;
      this.input.appendChild(syntheticDV);
      if (typeof this.input.checkDisplayValueSlotChange === 'function') {
        this.input.checkDisplayValueSlotChange();
      }
    }

    this.requestUpdate();
  }

  /**
   * Writes `nextValue` to the trigger input and the bib input when their current
   * value differs, then re-asserts imask after Lit's update flushes.
   * @param {string} nextValue - The value to write to both inputs.
   * @returns {Promise<void>} The promise that resolves after both inputs flush and imask
   *   re-asserts, or right away when no sync is needed.
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
   * @param {object} [options={}] - The optional flags.
   * @param {boolean} [options.preferComboboxValue=false] - If true,
   *   matches the selected option against `this.value` first. If false,
   *   matches against `this.input.value` first. Matching `this.value` first is needed on mount and re-mount
   *   because under `persistInput` the consumer's `typedValue` prop can drift
   *   from the framework value (Svelte `{#key}` re-mount after a swap, or
   *   SPA preselect after route change) and the old input-first match would
   *   then pick the stale text. Only `handleSlotChange` passes this; typing
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
   * Copies the menu's options into `this.options`, or sets an empty array when there's no menu.
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
   * Closes the bib if it's open.
   * @returns {void}
   */
  hideBib() {
    if (this.dropdown && this.dropdown.isPopoverVisible) {
      this.dropdown.hide();
    }
  }

  /**
   * Opens the bib when the input has text and there's something to show: options or a `nomatch` option.
   * When the menu is loading without `loadingText` or `loadingIcon` content, the bib opens once loading ends, if focus is still in the combobox.
   * Doesn't currently open the bib for a loading menu that has no options yet.
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

    // Suppress the dropdown's generic focus restoration on close — the combobox
    // manages its own focus via setClearBtnFocus / setInputFocus / keyboard strategy.
    this.dropdown.noFocusRestoreOnClose = true;

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
          // event. Because composed events are re-targeted at each shadow DOM
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

    // Mirror the trigger's clear-button tracking onto the fullscreen bib input
    // so clearing there also fully resets the combobox (AB#1634257). See
    // trackClearBtnActivation for why this must run in the capture phase.
    if (this.inputInBib && this.inputInBib !== this.input) {
      this.trackClearBtnActivation(this.inputInBib);
    }

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
   * of a dialog" which disrupts combobox usage. Setting `role="presentation"`
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
   * Sets the menu's `size` and `shape`: `md` and `box` in the fullscreen bib, otherwise based on `this.layout`.
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
   * Gets the shadow root containing the live region for screen reader announcements.
   * When the bib is open in fullscreen modal mode, everything outside the `<dialog>`
   * is inert, so this targets the bib's own shadow root instead of the host's.
   * @private
   * @returns {ShadowRoot} The shadow root to announce from.
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

        // Skip write-back when this event is the echo of our own setMenuValue —
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
        this.updateComplete.then(() => {
          this._programmaticFilterRefresh = false;
        });
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
     * Validates the combobox each time focus leaves it, unless `noValidate` is set.
     */
    this.addEventListener('focusout', () => {
      // Skip while the dropdown is open — focus transits out briefly on
      // mousedown of a menu option (popover top-layer breaks :focus-within),
      // and validating against the pre-selection value flashes a stale error
      // between mousedown and mouseup. The next focusout fires after the
      // dropdown closes and validates against the post-selection value.
      if (!this.noValidate && !this.componentHasFocus && !this._inFullscreenTransition && !this.dropdownOpen) {
        this.validate();
      } else if (this.noValidate && !this.componentHasFocus && !this._inFullscreenTransition && !this.dropdownOpen && this.validity !== undefined && !this.hasAttribute('error')) {
        // Clear stale error state left by a previous validate(true) call.
        // Do not clear when the error attribute is set — that is an externally forced error.
        this.validity = undefined;
        this.errorMessage = null;
      }
    });

    /**
     * Tracks whether the clear button within the input has focus,
     * to prevent unwanted interactions while it does.
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

    this.trackClearBtnActivation(this.input);
  }

  /**
   * Flags genuine clear-button activations on an auro-input so the SPA-preselect
   * guard in `handleInputValueChange` doesn't swallow them.
   *
   * The auro-input clear button fires an `isProgrammatic` input event (through
   * `notifyValueChanged`) that has the same shape as the SPA-preselect echo
   * that guard bails on (`isProgrammatic`, a set value, and an empty input).
   * Without this one-shot flag, clicking clear would leave `value` and
   * `optionSelected` stale (AB#1634257).
   *
   * Delegated on the shadow root so it works whenever `.clearBtn` renders
   * (it only exists after a value is set), and covers both real clicks and
   * programmatic `clearBtn.click()` calls, which no `focusin` precedes.
   * Registered in the capture phase so the flag is set before the button's own
   * `@click` handler (`handleClickClear`) fires its synchronous input event,
   * which is when `handleInputValueChange` reads the flag.
   * @private
   * @param {Element} inputEl - The auro-input whose clear button to track.
   * @returns {void}
   */
  trackClearBtnActivation(inputEl) {
    if (!inputEl || !inputEl.shadowRoot) {
      return;
    }
    inputEl.shadowRoot.addEventListener('click', (event) => {
      if (event.target.closest('.clearBtn')) {
        this._clearBtnActivated = true;

        // Bound the flag's lifetime to this synchronous clear -> input window.
        // auro-input's handleClickClear fires its input event synchronously
        // (before any macrotask runs), so handleInputValueChange consumes the
        // flag first and this reset is a harmless no-op. It only does real work
        // if that input event never arrives (e.g. auro-input throws mid-clear),
        // guaranteeing the flag can't survive to be misread as a genuine clear
        // by a later unrelated event such as an SPA-preselect echo (AB#1634257).
        // Scheduled via _scheduleTimer so disconnectedCallback cancels it if the
        // component tears down inside that window.
        this._scheduleTimer(() => {
          this._clearBtnActivated = false;
        }, 0);
      }
    }, true);
  }

  /**
   * Called when the menu's loading state changes.
   *
   * When loading starts while the input has text and focus, it calls `showBib()`, which opens the bib,
   * or, when the menu has no loading placeholder, sets `isHiddenWhileLoading` instead. When loading ends
   * and `isHiddenWhileLoading` is set, it opens the bib if focus is still inside the combobox, then clears the flag.
   *
   * @private
   * @param {CustomEvent} event - The event object containing details about the loading state change.
   * @param {boolean} event.detail.loading - Indicates whether the menu is currently loading.
   * @param {boolean} event.detail.hasLoadingPlaceholder - Indicates if there are loading placeholders present.
   * @returns {void}
   */
  handleMenuLoadingChange(event) {
    if (event.detail.loading) {
      // showBib() handles both cases: with placeholder → dropdown.show();
      // without placeholder → sets isHiddenWhileLoading = true so the
      // loading-finished branch below can reopen once data arrives.
      if (this.input.value && this.input.hasFocus) {
        this.showBib();
      }
    } else if (this.isHiddenWhileLoading) {
      // Call dropdown.show() directly — showBib() guards on availableOptions
      // being non-empty, which may not be true yet when loading ends.
      if (this.contains(document.activeElement)) {
        this.dropdown.show();
      }
      this.isHiddenWhileLoading = false;
    }
  }

  /**
   * Called when the text in the trigger input or the fullscreen bib input changes.
   * Keeps both inputs and `value` in sync, clears the combobox when the input is emptied,
   * validates when focus is outside the combobox unless `noValidate` is set, and fires `inputValue`.
   * @private
   * @param {Event} event - The input event triggered by the input element.
   * @returns {void}
   */
  handleInputValueChange(event) {
    // Consume the one-shot clear-button flag on EVERY entry, before any branch
    // below can early-return. trackClearBtnActivation sets it in the capture
    // phase right before auro-input's clear button fires its synchronous input
    // event; reading and immediately clearing it here guarantees the flag never
    // survives a handleInputValueChange call to leak into a later event (e.g.
    // the bib branch bailing at _syncingDisplayValue, or an SPA-preselect echo)
    // where it would defeat the guard below. Held in a local so that guard can
    // still tell a genuine clear from the init-render echo (AB#1634257).
    const clearBtnActivated = this._clearBtnActivated;
    this._clearBtnActivated = false;

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
    // The clear button's echo has the same shape (isProgrammatic + set value +
    // empty input) but is a genuine user clear that MUST reset this.value and
    // optionSelected below. clearBtnActivated (consumed at the top of this
    // method) is true only for that genuine clear, so only the real
    // SPA-preselect echo bails (AB#1634257).
    if (event && event.isProgrammatic && this.value && !this.input.value && !clearBtnActivated) {
      return;
    }

    // Skip this write during a display-value sync: that path sets the input to
    // the selected option's LABEL, which is not its machine value. When an
    // option's label differs from its value (and especially when several
    // options share a value but render distinct labels — AB#1602086), writing
    // the label back into this.value clobbers the machine value the selection
    // listener just set (this.value = optionSelected.value), collapsing the
    // selection. _syncingBibValue still tracks (that mirrors user-typed text
    // from the fullscreen bib, where value should follow the input).
    if (!this._syncingDisplayValue) {
      this.value = this.input.value;
    }

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
    if (!this.noValidate && !this.componentHasFocus && !this.dropdownOpen && !this._inFullscreenTransition) {
      this.validate();
    }

    this.dispatchEvent(new CustomEvent('inputValue', { detail: { value: this.inputValue } }));
  }

  /**
   * Called when the text in the trigger input changes.
   * Refreshes the menu's options and filtering, passes the change to `handleInputValueChange`,
   * and keeps focus in the fullscreen bib input while that bib is open.
   * @private
   * @param {Event} event - The input event from the trigger input element.
   * @returns {void}
   */
  handleTriggerInputValueChange(event) {
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
      // this listener with `target` re-targeted to the combobox. Letting it
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
   * Runs the update, then sets `nocheckmark` on every menu to match `checkmark`.
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

    // Cancelling the timers above drops the macrotask that would have reset
    // _clearBtnActivated, so reset it here too. Otherwise a disconnect inside
    // the clear-click -> macrotask window strands the flag `true`; instance
    // state survives reconnect, and the first matching input event (including
    // an SPA-preselect echo) would then bypass the guard in
    // handleInputValueChange and silently clear value/optionSelected (AB#1634257).
    this._clearBtnActivated = false;
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
   * Moves focus to the input, unless focus is already inside the combobox.
   * @returns {void}
   */
  focus() {
    if (!this.componentHasFocus) {
      this.input.focus();
    }
  }

  /**
   * Selects the menu option whose `value` matches. Does nothing when there's no menu or the menu already has that value;
   * when no option can be selected, it clears `value` and `optionSelected` to `undefined`.
   * @param {string} value - The `value` of the option to select.
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
   * Clears the value, the input text, and the selected option, and clears the validation state,
   * so no error shows until the combobox validates again.
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
   * Clears the value, the input text, and the selected option.
   * Doesn't clear the validation state; use `reset()` for that.
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
      } else {
        // The menu's selection properties are already cleared, but option
        // elements can still carry a stale `selected` attribute (e.g. the menu
        // options were rebuilt after the value was set, orphaning the DOM from
        // the now-null optionSelected). reset() is skipped above in that case,
        // so re-sync the option DOM directly to guarantee no option renders as
        // selected once the field is cleared (AB#1634259).
        this.menu.clearSelection();
      }
    } finally {
      this._clearing = false;
    }
  }

  /**
   * Checks the value against the validation rules, such as `required` and `behavior="filter"`, and updates `validity` and the error message.
   * @param {boolean} [force=false] - If true, validates even when the combobox has focus or hasn't been used yet.
   *   If false, validates only when focus is outside the combobox and it has been used or has a value.
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
        // Self-clear after this update cycle completes. This collapses
        // the previous scattered clear-points into one and prevents the
        // flag from surviving into the next user interaction.
        this.updateComplete.then(() => {
          this._programmaticFilterRefresh = false;
        });
      }

      if (this.input.value !== this.value) {
        // A fresh user selection leaves the input showing the option's LABEL
        // while this.value holds its machine value, so input.value !== this.value
        // is expected whenever label ≠ value. In that case the menu's current
        // selection is authoritative — and when several options share a value it
        // is the ONLY thing that records WHICH same-value option the user picked
        // (the menu tracks it by element identity via `_selectedKey`). Clearing
        // it here drops that key; the ensuing value-only re-resolution then
        // collapses the selection onto the first same-value option (AB#1602086).
        // So only treat the divergence as a stale menu when the selected option
        // does NOT match the new value.
        const menuSelectionMatchesValue =
          this.menu.optionSelected &&
          // optionSelected is a single element here (scalar `.value`). A multiselect
          // menu exposes it as an ARRAY, which has no scalar `.value` to compare, so
          // that shape can't be a single-option match — fall through to the clear path.
          !Array.isArray(this.menu.optionSelected) &&
          this.menu.optionSelected.value === this.value;

        if (!menuSelectionMatchesValue) {
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
   * Copies the nodes assigned to a slot into a target element under a new slot name, replacing earlier copies.
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
   * Sets the active (highlighted) option to the one at `index` among the options currently shown.
   * Does nothing when no shown option is at that position.
   * @param {number} index - The position of the option among the options currently shown, starting at 0.
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
   * Called when a slot's content changes. For the default slot, sets up the menu and recalculates its options;
   * for the `label`, `ariaLabel.input.clear`, `optionalLabel`, and `bib.fullscreen.headline` slots, copies the content into the bib.
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

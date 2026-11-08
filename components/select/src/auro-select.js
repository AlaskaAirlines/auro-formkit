// Copyright (c) 2026 Alaska Airlines. All rights reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

/* eslint-disable max-lines, no-underscore-dangle, lit/binding-positions, lit/no-invalid-html, curly */

// If using litElement base class
import { css } from "lit";
import { classMap } from 'lit/directives/class-map.js';
import { html } from 'lit/static-html.js';

import { AuroElement } from '../../layoutElement/src/auroElement.js';

import shapeSizeCss from "./styles/shapeSize-css.js";
import tokensCss from "./styles/tokens-css.js";

import AuroFormValidation from '@aurodesignsystem/form-validation';
import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';

import { announceToScreenReader, doubleRaf, guardTouchPassthrough, restoreTriggerAfterClose, applyKeyboardStrategy } from '@aurodesignsystem/utils';
import { selectKeyboardStrategy } from './selectKeyboardStrategy.js';
import { getActiveOptions } from './selectUtils.js';

import { AuroDependencyVersioning } from '@aurodesignsystem/auro-library/scripts/runtime/dependencyTagVersioning.mjs';

import { AuroDropdown } from '@aurodesignsystem/auro-dropdown';
import { AuroBibtemplate } from '@aurodesignsystem/auro-bibtemplate';
import { AuroHelpText } from '@aurodesignsystem/auro-helptext';

import formkitVersion from '@aurodesignsystem/version';

import styleCss from "./styles/style-css.js";
import emphasizedColorCss from "./styles/emphasized/color-css.js";
import { ifDefined } from "lit-html/directives/if-defined.js";

// See https://git.io/JJ6SJ for "How to document your components using JSDoc"
/**
 * A form control that lets people choose one option, or several, from a list, such as a sort order or a destination airport.
 *
 * **Key capabilities**
 * - **Multiple selection**: Set `multiSelect` to let people choose more than one option.
 * - **Validation**: Set `required` to require a selection, and `setCustomValidity` to change the error message.
 * - **Fullscreen on small screens**: Set `fullscreenBreakpoint` to choose the largest screen size at which the list opens as a fullscreen dialog.
 * - **Type-ahead**: Typing always moves to the first option whose text starts with the typed characters.
 * - **Layouts**: Set `layout` to `classic`, `emphasized`, or `snowflake` to change the overall look.
 *
 * **Example**
 *
 * ```html
 * <auro-select>
 *   <span slot="label">Sort by</span>
 *   <auro-menu>
 *     <auro-menuoption value="price">Price</auro-menuoption>
 *     <auro-menuoption value="duration">Duration</auro-menuoption>
 *   </auro-menu>
 * </auro-select>
 * ```
 * @summary A form control for choosing one or more options, with validation, type-ahead, and a fullscreen mode for small screens.
 * @customElement auro-select
 *
 * @slot - The `<auro-menu>` that holds the options. {@requiredWhen always} {@category ui}
 * @slot ariaLabel.bib.close - Text screen readers announce for the close button in the fullscreen bib, such as "Close sort options". Defaults to "Close". {@requiredWhen always} {@category a11y}
 * @slot bib.fullscreen.headline - Headline shown above the options in the fullscreen bib, such as "Sort by". {@requiredWhen always} {@category ui}
 * @slot label - Label that names the select. Screen readers announce it as the name of the select and of its option list. {@requiredWhen always} {@category ui}
 * @slot {HTMLSlotElement} optionalLabel - Text shown after the label when `required` isn't set, such as a translated "(optional)". Defaults to "(optional)". {@relevantWhen !required} {@category ui}
 * @slot helpText - Help text shown below the select. An error message replaces it while the select is invalid. {@category ui}
 * @slot valueText - Doesn't currently show its content. To change how the selected value looks, use the `displayValue` slot instead. {@category ui}
 * @slot displayValue - Content shown in the trigger in place of the selected option's text while the bib is closed, such as an icon. Put it inside each `<auro-menuoption>` with `slot="displayValue"`, and the select copies the selected option's content here. {@category ui}
 * @event auroSelect-valueSet - Fires whenever `value` changes. Use `input` in new code, which also includes the new value.
 * @event input - Fires whenever `value` changes, with the new `value` and `optionSelected` in `event.detail`.
 * @event auroFormElement-validated - Fires each time the select validates, with the current `validity` and error `message` in `event.detail`.
 * @csspart dropdownTrigger - The trigger that shows the label and selected value. Doesn't currently match any element, so styles set on it have no effect.
 * @csspart dropdownChevron - The container for the arrow icon that shows whether the bib is open.
 * @csspart dropdownSize - A hidden element whose `height`, `width`, `max-height`, and `max-width` are copied to the bib. Applies only when the bib matches the trigger's width: in the classic layout unless `flexMenuWidth` is set, and in other layouts when `matchWidth` is set.
 * @csspart helpText - The help text or error message shown below the select.
 * @csspart wrapper - The outermost element inside the select.
 * @csspart dropdown - The inner dropdown element that holds the trigger and the bib.
 * @csspart displayValue - The container for `displayValue` content in the trigger.
 */

// build the component class
export class AuroSelect extends AuroElement {
  constructor() {
    super();

    this._initializeDefaults();

    const idLength = 36;
    const idSubstrEnd = 8;
    const idSubstrStart = 2;

    this.matchWidth = false;

    // floaterConfig
    this.placement = 'bottom-start';
    this.offset = 0;
    this.noFlip = false;
    this.shift = false;
    this.autoPlacement = false;

    this.forceDisplayValue = false;

    /**
     * @private
     */
    this.uniqueId = Math.random().
      toString(idLength).
      substring(idSubstrStart, idSubstrEnd);

    /**
     * @private
     */
    this.validation = new AuroFormValidation();

    /**
     * @private
     */
    this.runtimeUtils = new AuroLibraryRuntimeUtils();

    /**
     * Generates unique tag names for the dependency components.
     */
    const versioning = new AuroDependencyVersioning();

    /**
     * @private
     */
    this.dropdownTag = versioning.generateTag('auro-formkit-select-dropdown', formkitVersion, AuroDropdown);

    /**
     * @private
     */
    this.bibtemplateTag = versioning.generateTag('auro-formkit-select-bibtemplate', formkitVersion, AuroBibtemplate);

    /**
     * @private
     */
    this.helpTextTag = versioning.generateTag('auro-formkit-input-helptext', formkitVersion, AuroHelpText);

    /**
     * @private
     */
    this.isHiddenWhileLoading = false;

    /**
     * @private
     */
    this.hasFocus = false;

    /**
     * @private
     */
    this.hasDisplayValueContent = false;

    /**
     * @private
     */
    this.typeaheadBuffer = '';

    /**
     * @private
     */
    this._typeaheadTimeout = null;
  }

  /**
   * Sets the default property values.
   * @private
   * @returns {void}
   */
  _initializeDefaults() {
    this.appearance = 'default';
    this.value = undefined;
    this.fullscreenBreakpoint = 'sm';
    this.onDark = false;
    this.isPopoverVisible = false;
    this.typeaheadTimeoutMs = 500;

    // Layout Config
    this.layout = 'classic';
    this.shape = 'classic';
    this.size = 'lg';
  }

  // This function is to define props used within the scope of this component
  // Be sure to review  https://lit-element.polymer-project.org/guide/properties#reflected-attributes
  // to understand how to use reflected attributes with your property settings.
  static get properties() {
    return {

      /**
       * Sets the colors to match the background behind the select. Use `inverse` on dark backgrounds and `default` on light ones.
       * @type {'default' | 'inverse'}
       * @default 'default'
       * @category ui
       */
      appearance: {
        type: String,
        reflect: true
      },

      /**
       * Deprecated: Use `placement` instead.
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
       * Sets the autofill hint for the hidden native select, such as `country-name` (the native `autocomplete` attribute).
       * Doesn't currently apply when `layout="emphasized"`, which has no hidden native select.
       * @relevantWhen layout !== 'emphasized'
       * @category behavior
       */
      autocomplete: {
        type: String,
        reflect: true
      },

      /**
       * Turns the select off. A disabled select is shown in a muted style and can't be opened, but keyboard users can still tab to it.
       * `auro-form` leaves a disabled select's value out of its form data.
       * @category ui
       */
      disabled: {
        type: Boolean,
        reflect: true
      },

      /**
       * Forces the select into the `customError` state and shows this text as the error message, such as `Choose another option`.
       * When `setCustomValidityCustomError` or `setCustomValidity` is set, that message replaces this text.
       * Remove the attribute to clear the error and validate normally.
       * @category behavior
       */
      error: {
        type: String,
        reflect: true
      },

      /**
       * Sizes the bib to fit its options instead of matching the trigger's width. Use it when option text is wider than the trigger.
       * Applies only when `layout="classic"`.
       * @relevantWhen layout === 'classic'
       * @category ui
       */
      flexMenuWidth: {
        type: Boolean,
        attribute: 'flexmenuwidth',
        reflect: true,
      },

      /**
       * Stretches the select to fill the full width of its container.
       * @category ui
       */
      fluid: {
        type: Boolean,
        reflect: true
      },

      /**
       * Shows the selected option's `displayValue` content in the trigger even while the bib is open, and visually hides the label and value text.
       * Applies only when the selected option has `displayValue` content.
       * @category ui
       */
      forceDisplayValue: {
        type: Boolean,
        attribute: 'forcedisplayvalue',
        reflect: true
      },

      /**
       * Sets the largest screen size at which the bib opens as a fullscreen dialog instead of a popover, such as `sm`.
       * Use `disabled` to never open it fullscreen.
       * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'disabled'}
       * @default 'sm'
       * @category ui
       */
      fullscreenBreakpoint: {
        type: String,
        attribute: 'fullscreenbreakpoint',
        reflect: true
      },

      /**
       * @private
       */
      hasDisplayValueContent: {
        type: Boolean,
        reflect: false,
        attribute: false
      },

      /**
       * @private
       */
      hasFocus: {
        type: Boolean,
        reflect: false,
        attribute: false
      },

      /**
       * @private
       */
      isPopoverVisible: {
        type: Boolean,
        attribute: false,
        reflect: false
      },

      /**
       * Makes the headline in the fullscreen bib larger, using the display heading style.
       * @category ui
       */
      largeFullscreenHeadline: {
        type: Boolean,
        attribute: 'largefullscreenheadline',
        reflect: true
      },

      /**
       * Sets the select's overall look. Use `emphasized` for a large, prominent select on light backgrounds, and `snowflake` only on dark backgrounds with `appearance="inverse"`.
       * @type {'classic' | 'emphasized' | 'snowflake'}
       * @default 'classic'
       * @category ui
       */
      layout: {
        type: String,
        reflect: true
      },

      /**
       * Makes the bib the same width as the trigger.
       * Applies only when `layout` isn't `classic`; the classic layout always matches the trigger's width unless `flexMenuWidth` is set.
       * @relevantWhen layout !== 'classic'
       * @category ui
       */
      matchWidth: {
        type: Boolean,
        attribute: 'matchwidth',
        reflect: true
      },

      /**
       * Lets people select more than one option, and keeps the bib open between selections. `value` becomes a JSON array string, such as `["stops","price"]`.
       * Consider checkboxes instead, which make choosing several options easier for everyone, including screen reader users.
       * @category behavior
       */
      multiSelect: {
        type: Boolean,
        reflect: true,
        attribute: 'multiselect'
      },

      /**
       * Sets the key for the select's value in form data, such as `sortOrder` (the native `name` attribute).
       * @category behavior
       */
      name: {
        type: String,
        reflect: true
      },

      /**
       * Hides the checkmark next to the selected option.
       * Removing the attribute doesn't currently bring the checkmark back.
       * @category ui
       */
      noCheckmark: {
        type: Boolean,
        attribute: 'nocheckmark',
        reflect: true
      },

      /**
       * Keeps the bib on the `placement` side even when there isn't enough room there.
       * By default, the bib flips to the opposite side.
       * @category ui
       */
      noFlip: {
        type: Boolean,
        attribute: 'noflip',
        reflect: true
      },

      /**
       * Turns off automatic validation when the select loses focus or its value changes.
       * Use it when your code validates the select, such as on form submit, by calling `validate()`.
       * @category behavior
       */
      noValidate: {
        type: Boolean,
        attribute: 'novalidate',
        reflect: true
      },

      /**
       * Sets the gap between the trigger and the bib, in pixels, such as `8`.
       * @default 0
       * @category ui
       */
      offset: {
        type: Number,
        reflect: true
      },

      /**
       * Deprecated: Use `appearance="inverse"` instead.
       * Sets the colors for a dark background.
       * @deprecated Use `appearance="inverse"` instead.
       * @category ui
       */
      onDark: {
        type: Boolean,
        attribute: 'ondark',
        reflect: true
      },

      /**
       * Gets the selected `<auro-menuoption>` element, or `undefined` when nothing is selected.
       * In `multiSelect` mode, it's an array of the selected options.
       * @type {HTMLElement|Array<HTMLElement>}
       * @category behavior
       */
      optionSelected: {
        type: Object,
        attribute: false
      },

      /**
       * Sets the text shown in the trigger before an option is selected, such as `Choose a destination`.
       * @category ui
       */
      placeholder: {
        type: String,
        reflect: true
      },

      /**
       * Sets where the bib opens relative to the trigger, such as `bottom-start` (below, lined up with the trigger's start edge) or `top`.
       * The bib flips to the opposite side when there isn't enough room, unless `noFlip` is set.
       * @type {'top' | 'right' | 'bottom' | 'left' | 'bottom-start' | 'top-start' | 'top-end' | 'right-start' | 'right-end' | 'bottom-end' | 'left-start' | 'left-end'}
       * @default 'bottom-start'
       * @category ui
       */
      placement: {
        type: String,
        reflect: true
      },

      /**
       * Requires a selection. A required select shows the `valueMissing` error when it's left empty, and doesn't show the "(optional)" text after the label.
       * @category behavior
       */
      required: {
        type: Boolean,
        reflect: true
      },

      /**
       * Sets one error message to show for every validation error, such as `Choose a sort order`.
       * When set, it replaces the `setCustomValidityValueMissing` and `setCustomValidityCustomError` messages and the `error` text.
       * @category behavior
       */
      setCustomValidity: {
        type: String,
        attribute: 'setcustomvalidity'
      },

      /**
       * Sets the error message shown while the `error` attribute is set, in place of the `error` text.
       * Ignored when `setCustomValidity` is set.
       * @relevantWhen error
       * @category behavior
       */
      setCustomValidityCustomError: {
        type: String,
        attribute: 'setcustomvaliditycustomerror'
      },

      /**
       * Sets the error message shown when a `required` select is left empty, such as `Choose a sort order`.
       * Ignored when `setCustomValidity` is set.
       * @relevantWhen required
       * @category behavior
       */
      setCustomValidityValueMissing: {
        type: String,
        attribute: 'setcustomvalidityvaluemissing'
      },

      /**
       * Sets the shape of the trigger. Use `classic` with the classic layout, `pill`, `pill-left`, or `pill-right` with the emphasized layout, and `snowflake` with the snowflake layout.
       * @type {'classic' | 'pill' | 'pill-left' | 'pill-right' | 'snowflake'}
       * @default 'classic'
       * @category ui
       */
      shape: {
        type: String,
        reflect: true
      },

      /**
       * Slides the bib along the trigger's edge to keep it on screen when it would otherwise be cut off.
       * Applies only when `layout="emphasized"`.
       * @relevantWhen layout === 'emphasized'
       * @category ui
       */
      shift: {
        type: Boolean,
        reflect: true
      },

      /**
       * Sets the height of the trigger. Use `xl` only with the emphasized layout, and `lg` with the other layouts.
       * @type {'lg' | 'xl'}
       * @default 'lg'
       * @category ui
       */
      size: {
        type: String,
        reflect: true
      },

      /**
       * Whether focus has moved into the select since it was created or last reset.
       * @private
       */
      touched: {
        type: Boolean,
        reflect: true,
        attribute: false
      },

      /**
       * Sets how long, in milliseconds, typed characters keep adding to the type-ahead search before it starts over.
       * Increase it, for example to `1000`, for people who type slowly.
       * @default 500
       * @category behavior
       */
      typeaheadTimeoutMs: {
        type: Number,
        attribute: 'typeaheadtimeoutms',
        reflect: true
      },

      /**
       * Reports the select's current validity state, such as `valid`, `valueMissing`, or `customError`.
       * Validation sets it, and it stays `undefined` until the select first validates.
       * @category behavior
       */
      validity: {
        type: String,
        reflect: true
      },

      /**
       * Sets the selected option by its value, such as `price`. In `multiSelect` mode, it's a JSON array string, such as `["stops","price"]`.
       * A value that matches no option, or matches a `disabled` or `static` option, clears both `value` and `optionSelected`; `hidden` options can still be selected by value.
       * @category behavior
       */
      value: {
        type: String,
        reflect: true,
        attribute: 'value'
      },
    };
  }

  static get styles() {
    return [
      css`${shapeSizeCss}`,
      css`${tokensCss}`,
      css`${styleCss}`,
      css`${emphasizedColorCss}`
    ];
  }

  /**
   * Gets the value formatted for the current mode: a string, or an array of strings in `multiSelect` mode.
   * @private
   * @returns {String|Array<String>} The formatted value.
   */
  get formattedValue() {
    return this.menu.formattedValue;
  }

  /**
   * Gets the class map for the label in every layout.
   * @private
   * @returns {Record<string, boolean>} The label's class names, each mapped to whether it applies.
   */
  get commonLabelClasses() {
    const obj = {
      'is-disabled': this.disabled,
      'withValue': false,
      'util_displayHiddenVisually': this.hasDisplayValueContent && !this.hasFocus && this.value && this.value.length > 0,
      [this.labelFontClass]: true
    };

    if (this.placeholder) {
      obj.withValue = true;
    } else if (this.optionSelected) {
      if (Array.isArray(this.optionSelected)) {
        obj.withValue = this.optionSelected.length > 0;
      } else {
        obj.withValue = true;
      }
    }
    return obj;
  }

  /**
   * Gets the label's font class for the current layout and selection state.
   * @private
   * @returns {string} - The font class for the label.
   */
  get labelFontClass() {
    const isSelected = this.hasValue;

    if (this.layout.startsWith('emphasized')) {
      return isSelected ? 'body-sm' : 'accent-xl';
    }

    if (this.layout === 'snowflake') {
      return isSelected ? 'body-xs' : 'body-lg';
    }

    // classic layout (default)
    return isSelected ? 'body-xs' : 'body-default';
  }

  /**
   * Checks whether the select has a value or a placeholder.
   * @returns {string|boolean|undefined} - A truthy value if the select has a value or placeholder; a falsy value otherwise.
   * @private
   */
  get hasValue() {
    return this.placeholder || (this.value && this.value.length > 0); // eslint-disable-line no-extra-parens
  }

  /**
   * Binds all behavior needed to the dropdown after rendering.
   * @private
   * @returns {void}
   */
  configureDropdown() {
    this.dropdown = this.shadowRoot.querySelector(this.dropdownTag._$litStatic$);

    // Prevent dropdown from closing on focus loss since menu content is slotted
    // from select's light DOM and won't be detected by dropdown's contains() check.
    // Select handles Tab key closing explicitly, `Escape` key via dialog cancel, and
    // click outside works correctly via composedPath().
    this.dropdown.noHideOnThisFocusLoss = true;


    this.dropdown.addEventListener('auroDropdown-toggled', () => {
      this.isPopoverVisible = this.dropdown.isPopoverVisible;

      // Clear aria-activedescendant when dropdown closes
      if (!this.dropdown.isPopoverVisible) {
        this.dropdown.setActiveDescendant(null);
        this.optionActive = null;

        if (this.dropdown.isBibFullscreen) {
          restoreTriggerAfterClose(this.dropdown, this.dropdown.trigger);
        }
      }

      if (this.dropdown.isPopoverVisible) {
        this.updateMenuShapeSize();

        // If there's a selected option, highlight it (per W3C APG combobox-select-only pattern)
        // No selection → first enabled option gets highlighted
        if (!this.menu.optionActive) {
          if (this.optionSelected && !Array.isArray(this.optionSelected)) {
            this.menu.updateActiveOption(this.optionSelected);
          } else if (this.multiSelect && Array.isArray(this.optionSelected) && this.optionSelected.length > 0) {
            this.menu.updateActiveOption(this.optionSelected[0]);
          } else {
            // If no activeOption has yet to be set, make the first active option
            // (non-disabled, non-hidden, non-static) active by default. "Active" —
            // not just "enabled" — so hidden rows and static placeholders never
            // land in aria-activedescendant on open.
            const [firstActive] = getActiveOptions(this.menu);
            this.menu.updateActiveOption(firstActive);
          }
        }

        // Scroll the selected option into view when dropdown opens
        this.scrollSelectedOptionIntoView();
        if (this.dropdown.isBibFullscreen) {
          // Hide the trigger from assistive technology so VoiceOver cannot reach it
          // behind the fullscreen dialog
          this.dropdown.trigger.inert = true;

          guardTouchPassthrough(this.menu);

          // Wait for the bibtemplate to fully render (close button) across
          // multiple Lit update cycles before moving focus into the bib
          doubleRaf(() => {
            this.bibtemplate.focusCloseButton();
          });
        } else {
          // wait til the bib gets fully rendered
          setTimeout(() => {
            // Keep focus on trigger so aria-activedescendant announces menu options
            this.dropdown.trigger.focus();

            // Scroll the selected option into view when dropdown opens
            this.scrollSelectedOptionIntoView();
          });
        }
      }
    });

    this.dropdown.addEventListener('auroDropdown-strategy-change', () => {
      this.updateMenuShapeSize();

      // When switching to fullscreen while open, focus the close button
      // so it's not stuck on the trigger behind the dialog
      if (this.dropdown.isBibFullscreen && this.dropdown.isPopoverVisible) {
        this.dropdown.trigger.inert = true;
        doubleRaf(() => {
          this.bibtemplate.focusCloseButton();
        });
      } else if (!this.dropdown.isBibFullscreen) {
        this.dropdown.trigger.inert = false;
      }
    });

    // setting up bibtemplate
    this.bibtemplate = this.dropdown.querySelector(this.bibtemplateTag._$litStatic$);

    if (this.customBibWidth) {
      this.dropdown.dropdownWidth = this.customBibWidth;
    }

    this._syncLabelText();

    // Exposes the CSS parts from the dropdown for styling
    this.dropdown.exposeCssParts();
  }

  /**
   * Reads the current label slot text and pushes it to the dropdown bib
   * (for dialog naming) and the menu (for listbox aria-label). Safe to call
   * before either child has been wired up, because each branch checks for it.
   * @private
   */
  _syncLabelText() {
    const labelElement = this.querySelector('[slot="label"]');
    const text = labelElement ? labelElement.textContent.trim() : '';
    if (this.dropdown) {
      this.dropdown.bibDialogLabel = text || undefined;
    }
    if (this.menu) {
      if (text) {
        this.menu.setAttribute('aria-label', text);
      } else {
        this.menu.removeAttribute('aria-label');
      }
    }
  }

  /**
   * Keeps the dialog and menu accessible names in sync when the label slot
   * changes at runtime, such as a locale swap. `slotchange` alone isn't
   * enough: it doesn't fire when the text of an already-assigned slotted node
   * changes, which is the common case. The observer watches only the label
   * node, not the whole host subtree, so option changes don't trigger label
   * re-syncs, and it re-targets on `slotchange` when the label element is
   * added or replaced.
   * @private
   */
  _observeLabelChanges() {
    if (this._labelObserver) return;
    this._labelObserver = new MutationObserver(() => this._syncLabelText());

    const retarget = () => {
      this._labelObserver.disconnect();
      const labelElement = this.querySelector('[slot="label"]');
      if (labelElement) {
        this._labelObserver.observe(labelElement, {
          childList: true,
          subtree: true,
          characterData: true
        });
      }
      this._syncLabelText();
    };

    retarget();

    this._retargetLabelObserver = retarget;
    this.shadowRoot.querySelectorAll('slot[name="label"]').forEach((slot) => {
      slot.addEventListener('slotchange', retarget);
    });
  }

  /**
   * Registers the element with the browser under a tag name, such as `custom-select`.
   * @param {string} [name="auro-select"] - The tag name to register the element under.
   *
   * @example
   * AuroSelect.register("custom-select") // registers the element as <custom-select>
   *
   */
  static register(name = "auro-select") {
    AuroLibraryRuntimeUtils.prototype.registerComponent(name, AuroSelect);
  }

  /**
   * Updates the displayed value in an Auro dropdown component based on optionSelected.
   * @private
   * @returns {void}
   */
  updateDisplayedValue() {
    const triggerContentEl = this.dropdown.querySelector('#triggerFocus');

    // Clear out old value
    const valueElem = triggerContentEl.querySelector('#value');
    if (valueElem) {
      valueElem.innerHTML = '';
    }

    const slot = this.shadowRoot.querySelector('slot[name="displayValue"]');
    const slottedElements = slot.assignedElements();

    slottedElements.forEach((element) => {
      element.remove();
    });

    // Handle selected options
    if (this.menu && this.menu.optionSelected) {

      // If multiSelect and we got an array of selected options
      if (this.multiSelect && Array.isArray(this.menu.optionSelected)) {

        // If we have selected options, join and display their text content
        if (this.menu.optionSelected.length > 0) {
          const displayText = this.menu.optionSelected.map((option) => option.textContent).join(', ');
          valueElem.textContent = displayText;

          // If no selected options, clear out value display
        } else {
          valueElem.textContent = '';
        }

        // If single select and we got an option that was selected, update value display
      } else if (!this.multiSelect && this.menu && this.menu.optionSelected instanceof HTMLElement) {
        valueElem.innerHTML = this.menu.optionSelected.innerHTML;
        const displayValueEl = this.menu.optionSelected.querySelector("[slot='displayValue']");

        if (displayValueEl) {
          this.appendChild(displayValueEl.cloneNode(true));
        }
        this.hasDisplayValueContent = displayValueEl !== null;
      }
    }

    this.dropdown.requestUpdate();
  }

  /**
   * Sets the menu's size and shape: the defaults in the fullscreen bib, otherwise based on `size`, `shape`, and `layout`.
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
      // set menu's default size if there it's not specified.
      this.menu.setAttribute('size', this.layout !== 'emphasized' ? 'md' : this.defaultMenuSize || this.size);

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
   * Sets aria-setsize and aria-posinset on each menu option so screen readers
   * can announce position even when the listbox context is broken by
   * shadow DOM boundaries.
   * @private
   * @returns {void}
   */
  updateOptionPositions() {
    if (!this.menu || !this.menu.options) return;
    const visibleOptions = this.menu.options;
    const count = visibleOptions.length;
    visibleOptions.forEach((option, index) => {
      option.setAttribute('aria-setsize', count);
      option.setAttribute('aria-posinset', index + 1);
    });
  }

  /**
   * Gets the shadow root containing the live region for screen reader announcements.
   * When the bib is open as a fullscreen modal, everything outside the `<dialog>`
   * is inert, so this returns the bib's own shadow root instead of the host's.
   * @private
   * @returns {ShadowRoot} The shadow root to announce in.
   */
  _getAnnouncementRoot() {
    if (this.dropdown.isBibFullscreen && this.dropdown.isPopoverVisible && this.dropdown.bibElement && this.dropdown.bibElement.value) {
      return this.dropdown.bibElement.value.shadowRoot;
    }
    return this.shadowRoot;
  }

  /**
   * Binds all behavior needed to the menu after rendering.
   *
   * The `<auro-menu>` reference is captured once and not re-targeted on
   * `slotchange`. Runtime option mutations are covered via
   * `auroMenu-optionsChange`, so swap options inside the menu freely, but don't
   * swap the `<auro-menu>` element itself under a live select. Remount the
   * parent `<auro-select>` instead.
   * @private
   * @returns {void}
   */
  configureMenu() {
    this.menu = this.querySelector('auro-menu, [auro-menu]');

    // racing condition on custom-select with custom-menu
    if (!this.menu) {
      setTimeout(() => {
        this.configureMenu();
      }, 0);
      return;
    }

    this.defaultMenuSize = this.menu.getAttribute('size');
    this.defaultMenuShape = this.menu.getAttribute('shape');

    this.updateMenuShapeSize();
    this.setMenuValue(this.value);

    this._syncLabelText();

    if (this.multiSelect) {
      this.menu.multiSelect = this.multiSelect;
    }

    // Menu's items are populated by initItems() during its firstUpdated/slotchange.
    // Since the parent select's firstUpdated runs before the child menu's, call initItems()
    // here so renderNativeSelect can render the native <option> list on first paint.
    if (typeof this.menu.initItems === 'function') {
      this.menu.initItems();
    }
    this.updateOptionPositions();
    // renderNativeSelect reads this.menu.options, which the parent doesn't
    // observe — request an update so the hidden native <option> list reflects
    // the menu's options after initItems populates them.
    this.requestUpdate();

    // Keep aria-setsize/aria-posinset (and the native <option> list) in sync
    // when the menu re-initializes its items — e.g., slotchange, async/lazy
    // loads, value-triggered re-init. Without this, stale set-size is
    // announced and the native select goes stale after dynamic mutations.
    this.menu.addEventListener('auroMenu-optionsChange', () => {
      this.updateOptionPositions();
      this.requestUpdate();
    });

    this.menu.addEventListener("auroMenu-loadingChange", (event) => this.handleMenuLoadingChange(event));

    this.menu.addEventListener("auroMenu-selectValueFailure", () => {
      // Menu dispatches this from two paths: a programmatic value mismatch
      // (menu pre-clears its own optionSelected to undefined before firing)
      // and a click on an unselected valueless option (menu leaves state
      // untouched). Only mirror the clear in the first case — otherwise a
      // valueless click in multiSelect would wipe every prior pick.
      if (this.menu.optionSelected !== undefined) {
        return;
      }
      // Skip when the select is already cleared (valueless click with no
      // prior selection): value/optionSelected are already empty and there
      // is no stale trigger text to refresh, so updateDisplayedValue would
      // just churn the DOM and request a needless dropdown re-render.
      const hasStaleState = this.value !== undefined ||
        (this.multiSelect ? this.optionSelected?.length > 0 : this.optionSelected !== undefined);
      if (!hasStaleState) {
        return;
      }
      this.value = undefined;
      this.optionSelected = this.multiSelect ? [] : undefined;
      // The trigger label is rendered imperatively into #value, so a property
      // change alone won't clear it. Refresh so stale text doesn't linger when
      // a runtime value change fails to match any option.
      this.updateDisplayedValue();
    });

    this.menu.addEventListener('auroMenu-activatedOption', (evt) => {
      this.optionActive = evt.detail;

      if (this.dropdown) {
        this.dropdown.setActiveDescendant(this.optionActive);
      }

      // Live-region announce only for [not selected] options. For activations
      // on an already-selected option — auto-activation on bib open, arrow
      // navigation back to the selection, or click in multiSelect — rely on
      // aria-activedescendant + aria-selected="true" to convey state per the
      // WAI-ARIA listbox pattern. This is intentional, not limited to the
      // initial activation on open: it also prevents a duplicate "X, selected"
      // when Enter on the active+selected option re-fires
      // auroMenu-selectedOption (see 03b289e39).
      if (this.optionActive && !this.optionActive.hasAttribute('selected')) {
        const optionText = this.optionActive.textContent.trim();
        const message = `${optionText}, not selected`;
        if (this.dropdown.isPopoverVisible) {
          announceToScreenReader(this._getAnnouncementRoot(), message);
        } else {
          // Typeahead-on-closed calls updateActiveOption() before show(), so
          // this handler runs with isPopoverVisible still false. queueMicrotask
          // is safe because show() → showBib() flips isPopoverVisible and
          // dialog.showModal() both run synchronously in the same task; the
          // microtask queue only drains once _handleTypeahead unwinds, by
          // which point _getAnnouncementRoot() resolves to the bib's shadow
          // root inside the now-open modal. Do NOT switch to auroDropdown-toggled
          // — it fires before showModal(), landing the announcement in the
          // host root while the dialog is still not-yet-modal.
          queueMicrotask(() => announceToScreenReader(this._getAnnouncementRoot(), message));
        }
      }

      if (this.dropdown.isPopoverVisible) {
        this.scrollActiveOptionIntoView();
      }
    });

    this.menu.addEventListener('auroMenu-selectedOption', () => {
      const previousSelected = this.optionSelected;

      // Update the displayed value
      this.updateDisplayedValue();

      this.value = this.menu.value;

      // Clone the multiselect array so external mutation of select.optionSelected
      // can't reach back into menu's internal state through a shared reference.
      let nextSelected = this.menu.optionSelected;
      if (this.multiSelect) {
        nextSelected = Array.isArray(nextSelected) ? [...nextSelected] : [];
      }
      this.optionSelected = nextSelected;

      if (this.dropdown.isPopoverVisible && !this.multiSelect) {
        this.dropdown.hide();
        this.dropdown.trigger.focus();
      }

      // Describe the actual change. In multiSelect, currentLabel is the
      // concatenated remaining list — announcing "{list}, selected" after a
      // deselect would falsely claim every remaining label was just added.
      // Diff previous vs next to recover the toggled option.
      let announcement = '';
      if (this.multiSelect) {
        const prev = Array.isArray(previousSelected) ? previousSelected : [];
        const removed = prev.find((opt) => !nextSelected.includes(opt));
        const added = nextSelected.find((opt) => !prev.includes(opt));
        if (removed) {
          announcement = `${removed.textContent.trim()}, not selected`;
        } else if (added) {
          announcement = `${added.textContent.trim()}, selected`;
        }
      } else {
        announcement = `${this.menu.currentLabel}, selected`;
      }

      // Delay so the utterance isn't overridden by VoiceOver's "collapsed"
      // announcement from aria-expanded when the dropdown closes.
      if (announcement) {
        const announcementDelay = 300;
        setTimeout(() => {
          announceToScreenReader(this._getAnnouncementRoot(), announcement);
        }, announcementDelay);
      }
    });
  }

  /**
   * Binds all behavior needed to the component after rendering.
   * @private
   * @returns {void}
   */
  configureSelect() {
    this.nativeSelect = this.shadowRoot.querySelector('select');

    applyKeyboardStrategy(this, selectKeyboardStrategy);

    this.addEventListener('focusin', this.handleFocusin);

    this.addEventListener('blur', () => {
      if (!this.noValidate) {
        this.validate();
      } else if (this.validity !== undefined && !this.hasAttribute('error')) {
        // Clear stale error state left by a previous validate(true) call.
        // Do not clear when the error attribute is set — that is an externally forced error.
        this.validity = undefined;
        this.errorMessage = '';
      }
      this.hasFocus = false;
      this._clearTypeaheadBuffer();
    });
  }

  /**
   * Sets the active option, the one keyboard users are on, by its position in the menu.
   * @param {number} index - The zero-based index of the option to make active.
   */
  updateActiveOption(index) {
    if (this.menu) {
      this.menu.index = index;
    }
  }

  /**
   * Gets the lowercase, trimmed text of a menu option.
   * @private
   * @param {HTMLElement} option - The menu option element.
   * @returns {string} The option's lowercase, trimmed text.
   */
  _getOptionDisplayText(option) {
    return (option.textContent || '').trim().toLowerCase();
  }

  /**
   * Empties the type-ahead buffer and cancels any pending reset timeout.
   * Called when focus leaves the component, when Escape closes the bib, and on disconnect
   * so a stale buffer never bridges into a fresh interaction.
   * @private
   */
  _clearTypeaheadBuffer() {
    if (this._typeaheadTimeout) {
      clearTimeout(this._typeaheadTimeout);
      this._typeaheadTimeout = null;
    }
    this.typeaheadBuffer = '';
  }

  /**
   * Updates the active option in the menu based on keyboard input.
   *
   * Implements the WAI-ARIA APG Listbox type-ahead pattern: accumulates printable
   * keystrokes into a buffer that resets after `typeaheadTimeoutMs` of inactivity.
   * A multi-character buffer matches the first option whose displayed text starts
   * with the buffer; repeating a single character cycles through options that start
   * with that character.
   * @private
   * @param {string} _key - The key pressed by the user.
   * @returns {void}
   */
  updateActiveOptionBasedOnKey(_key) {
    // Ignore non-printable keys (Shift, ArrowDown, Tab, etc.)
    if (typeof _key !== 'string' || _key.length !== 1) {
      return;
    }

    // No selectable options to match against — clear any stale buffer/timer so
    // Space stays a bib toggle and the next keystroke after fresh options load
    // starts cleanly. `getActiveOptions` excludes disabled, hidden, and static
    // options (e.g. `static nomatch` placeholders). Checked BEFORE mutating
    // the buffer.
    const options = getActiveOptions(this.menu);
    if (!options.length) {
      this._clearTypeaheadBuffer();
      return;
    }

    const key = _key.toLowerCase();

    // Reset the buffer after a period of inactivity
    if (this._typeaheadTimeout) {
      clearTimeout(this._typeaheadTimeout);
    }
    this._typeaheadTimeout = setTimeout(() => {
      this._clearTypeaheadBuffer();
    }, this.typeaheadTimeoutMs);

    this.typeaheadBuffer += key;

    // Prefer the literal buffer as a prefix per WAI-ARIA APG ("focus moves to the
    // next item with a name that starts with the string of characters typed").
    // Only fall back to single-char cycling when the repeated buffer has no
    // longer prefix match — e.g. "aa" cycles through ["Apple", "Apricot"] only
    // because no option starts with "aa".
    let match = options.find((option) => this._getOptionDisplayText(option).startsWith(this.typeaheadBuffer));

    const isRepeatedChar = !match && this.typeaheadBuffer.length > 1 && new Set(this.typeaheadBuffer).size === 1;
    if (isRepeatedChar) {
      const matches = options.filter((option) => this._getOptionDisplayText(option).startsWith(key));
      if (matches.length) {
        const cycleIndex = (this.typeaheadBuffer.length - 1) % matches.length;
        match = matches[cycleIndex];
      }
    } else if (!match && this.typeaheadBuffer.length > 1) {
      // Buffer has no prefix match and isn't a repeat-char cycle (e.g. "a" then
      // "b" against [Apple, Banana]). Reset to just the new key and retry —
      // mirrors native <select>, which falls back to a single-char search when
      // accumulated input matches nothing, rather than swallowing the keystroke.
      this.typeaheadBuffer = key;
      match = options.find((option) => this._getOptionDisplayText(option).startsWith(key));
    }

    // Intentional: no-match leaves the bib closed (deviates from APG / some native <select>).
    if (match) {
      // Pre-stash the match so the auroDropdown-toggled handler's `!optionActive`
      // guard short-circuits and skips the firstActive/selected fallback —
      // otherwise show() synchronously fires the handler, which writes
      // aria-activedescendant once before we overwrite it.
      this.menu.updateActiveOption(match);
      if (!this.dropdown.isPopoverVisible) {
        this.dropdown.show();
      }
    }
  }

  /**
   * Called when the menu's loading state changes. Hides the bib while the menu loads and shows it again afterward.
   *
   * When the bib is open and loading starts without a loading placeholder, it hides the bib and
   * remembers that it did. When loading ends, it shows the bib again if focus is still inside the select.
   *
   * @private
   * @param {CustomEvent} event - The event object containing details about the loading state change.
   * @param {boolean} event.detail.loading - Indicates whether the menu is currently loading.
   * @param {boolean} event.detail.hasLoadingPlaceholder - Indicates if there are loading placeholders present.
   * @returns {void}
   */
  handleMenuLoadingChange(event) {
    if (this.dropdown.isPopoverVisible && event.detail.loading && !event.detail.hasLoadingPlaceholder) {
      this.isHiddenWhileLoading = true;
      this.dropdown.hide();
    } else if (!event.detail.loading && this.isHiddenWhileLoading) {
      if (this.contains(document.activeElement)) {
        this.dropdown.show();
      }
      this.isHiddenWhileLoading = false;
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
   * Opens the bib if it's closed. Does nothing while the select is disabled.
   * @returns {void}
   */
  showBib() {
    if (this.dropdown && !this.dropdown.isPopoverVisible) {
      this.dropdown.show();
    }
  }

  /**
   * Called when focus moves into the select. Marks the select as focused and touched.
   * @private
   * @return {void}
   */
  handleFocusin() {

    this.hasFocus = true;
    this.touched = true;
  }

  /**
   * Called when the `bib.fullscreen.headline` slot changes. Copies its content into the fullscreen bib's header.
   * @private
   * @param {Event} event - The `slotchange` event.
   * @returns {void}
   */
  handleSlotChange(event) {
    // Remove previous slot nodes if necessary.
    const oldSlots = this.bibtemplate.querySelectorAll(`[slot="header"]`);
    oldSlots.forEach((old) => old.remove());

    const newSlots = event.target.assignedNodes();
    newSlots.forEach((node) => {
      const clone = node.cloneNode(true);
      clone.setAttribute('slot', "header");
      this.bibtemplate.append(clone);
    });
  }

  /**
   * Clears the value and syncs the menu's `multiSelect` mode.
   * @private
   */
  clearSelection() {
    this.value = undefined;
    this.menu.multiSelect = this.multiSelect;
  }

  /**
   * Syncs the error, disabled, and checkmark states to the dropdown and menu on each update.
   * @private
   * @returns {void}
   */
  performUpdate() {
    super.performUpdate();

    if (this.validity && this.validity !== 'valid') {
      this.dropdown.setAttribute('error', '');
    } else {
      this.dropdown.removeAttribute('error');
    }

    if (this.disabled) {
      this.dropdown.setAttribute('disabled', '');
    } else if (!this.disabled) {
      this.dropdown.removeAttribute('disabled');
    }

    if (this.noCheckmark) {
      this.menu.setAttribute('nocheckmark', '');
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._clearTypeaheadBuffer();
    if (this._labelObserver) {
      this._labelObserver.disconnect();
      this._labelObserver = null;
    }
    if (this._retargetLabelObserver && this.shadowRoot) {
      this.shadowRoot.querySelectorAll('slot[name="label"]').forEach((slot) => {
        slot.removeEventListener('slotchange', this._retargetLabelObserver);
      });
      this._retargetLabelObserver = null;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    // Regression guard: firstUpdated() fires once per instance, so the label
    // observer setup it triggers does NOT re-run on reconnect. After a
    // disconnect+reconnect (reparent, SPA route swap), runtime label mutations
    // would silently stop syncing menu aria-label / dropdown.bibDialogLabel
    // unless we re-wire the observer here.
    if (this.hasUpdated) {
      this._observeLabelChanges();
    }
  }

  // lifecycle runs only after the element's DOM has been updated the first time
  firstUpdated() {
    // Add the tag name as an attribute if it is different than the component name
    this.runtimeUtils.handleComponentTagRename(this, 'auro-select');

    this.configureDropdown();
    this.configureMenu();
    this.configureSelect();
    this._observeLabelChanges();
  }

  /**
   * Selects the menu option whose value matches, as setting `value` does.
   * A value that matches no option, or matches a `disabled` or `static` option, clears `value` and `optionSelected`; `hidden` options can still be selected.
   * @param {string} value - The option value to select, such as `price`.
   */
  setMenuValue(value) {
    if (!this.menu) return;
    this.menu.selectByValue(value);
  }

  /**
   * Scrolls the currently active option into view.
   * Respects user's motion preferences for accessibility.
   * @private
   */
  scrollActiveOptionIntoView() {
    if (!this.menu || !this.menu.optionActive) return;

    // Check if user prefers reduced motion for accessibility
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.menu.optionActive.scrollIntoView({
      alignToTop: false,
      block: "nearest",
      behavior: prefersReducedMotion ? "auto" : "smooth"
    });
  }

  /**
   * Scrolls the currently selected option into view.
   * Respects user's motion preferences for accessibility.
   * @private
   */
  scrollSelectedOptionIntoView() {
    if (!this.menu || !this.menu.optionSelected) return;

    const selectedOption = this.multiSelect && Array.isArray(this.menu.optionSelected)
      ? this.menu.optionSelected[0]
      : this.menu.optionSelected;

    if (selectedOption) {
      // Check if user prefers reduced motion for accessibility
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      selectedOption.scrollIntoView({
        alignToTop: true,
        block: "start",
        behavior: prefersReducedMotion ? "auto" : "smooth"
      });
    }
  }

  updated(changedProperties) {
    if (
      changedProperties.has('multiSelect') &&
      !changedProperties.has('value')
    ) {
      this.clearSelection();
    }

    if (changedProperties.has('value')) {
      // A value change ends the current interaction — whether it came from a
      // user commit, programmatic assignment, or reset(). Clear the buffer so
      // a stale prefix does not concatenate onto the next keystroke while the
      // host still has focus (the blur listener would otherwise be the only
      // focus-retained clear point, and hideBib() below does not blur).
      this._clearTypeaheadBuffer();

      this.setMenuValue(this.value);

      this._updateNativeSelect();
      if (!this.noValidate) {
        this.validate();
      }
      if (!this.multiSelect) {
        this.hideBib();
      }

      // LEGACY EVENT
      this.dispatchEvent(new CustomEvent('auroSelect-valueSet', {
        bubbles: true,
        cancelable: false,
        composed: true,
      }));

      this.dispatchEvent(new CustomEvent('input', {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: {
          optionSelected: this.menu.optionSelected,
          value: this.menu.value
        }
      }));
    }

    if (changedProperties.has('error')) {
      this.validate(true);
      this.nativeSelect.setCustomValidity(this.error || '');
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
      this.menu.setAttribute('size', this.layout !== 'emphasized' ? 'md' : this.defaultMenuSize || this.size);
    }
  }

  /**
   * Clears the selection and the validation state, and marks the select as not yet touched.
   * @returns {void}
   */
  reset() {
    // Defense-in-depth: updated()'s value-change branch also clears, but
    // reset-to-same-value (e.g. undefined → undefined) skips that path.
    this._clearTypeaheadBuffer();
    this.menu.reset();
    this.validation.reset(this);
  }

  /**
   * Checks the selection and updates `validity` and the error message. Runs even when `noValidate` is set.
   * @param {boolean} [force=false] - If true, validates right away, even before the user has interacted with the select. If false, validates only when focus is outside the select and the user has interacted with it or a value is set.
   */
  validate(force = false) {
    this.validation.validate(this, force);
  }

  /**
   * Syncs the value from the native select element to the component's value.
   * @param {Event} event - The `change` event from the native select element.
   * @returns {void}
   * @private
   */
  _handleNativeSelectChange(event) {
    // Hidden native <select> has no `multiple` attribute, so any change it fires
    // is a single raw value — applying it in multiSelect mode would collapse the
    // JSON-array `value` shape. Bfcache/autofill can reach this on a name-bearing
    // form control even with aria-hidden/tabindex=-1, so revert to the expected
    // mirror (formattedValue[0]) rather than letting the native select drift and
    // silently submit the autofilled scalar under `name`.
    if (this.multiSelect) {
      this._updateNativeSelect();
      return;
    }

    const selectedOption = event.target.options[event.target.selectedIndex];
    if (!selectedOption) return;
    const selectedValue = selectedOption.value;

    if (this.value !== selectedValue) {
      this.value = selectedValue;
    }
  }

  /**
   * Updates the native select element's value based on the component's value.
   * @returns {void}
   * @private
   */
  _updateNativeSelect() {
    if (!this.nativeSelect) return;

    let { formattedValue } = this;
    if (!formattedValue) formattedValue = this.multiSelect ? [] : '';

    const currentValue = this.nativeSelect.value;
    const newValue = this.multiSelect
      ? formattedValue[0] || ''
      : this.value || '';

    if (currentValue !== newValue) this.nativeSelect.value = newValue || '';
  }

  /**
   * Renders the hidden native `<select>`.
   * @private
   * @returns {html} - The template for the hidden native `<select>`.
   */
  renderNativeSelect() {
    return html`
      <div class="nativeSelectWrapper util_displayHiddenVisually">
        <select
          tabindex="-1"
          id="${`native-select-${this.id || this.uniqueId}`}"
          name="${this.name || ''}"
          ?disabled="${this.disabled}"
          ?required="${this.required}"
          aria-hidden="true"
          autocomplete="${ifDefined(this.autocomplete)}"
          @change="${this._handleNativeSelectChange}">
          <option value="" ?selected="${!this.value}"></option>
          ${this.menu && Array.isArray(this.menu.options) && this.menu.options.map((option) => {
      const optionValue = option.value || option.textContent;
      return html`
              <option
                value="${optionValue}"
                ?selected="${this.value === optionValue}">
                ${option.textContent}
              </option>
            `;
    })}
        </select>
      </div>
    `;
  }

  /**
   * Renders the help text, or the error message while the select is invalid.
   * @private
   * @returns {html} - The template for the help text or error message.
   */
  renderHtmlHelpText() {
    return html`
      ${!this.validity || this.validity === undefined || this.validity === 'valid'
        ? html`
          <${this.helpTextTag} appearance="${this.onDark ? 'inverse' : this.appearance}">
            <p id="${this.uniqueId}" part="helpText">
              <slot name="helpText"></slot>
            </p>
          </${this.helpTextTag}>
        `
        : html`
          <${this.helpTextTag} error appearance="${this.onDark ? 'inverse' : this.appearance}">
            <p id="${this.uniqueId}" role="alert" aria-live="assertive" part="helpText">
              ${this.errorMessage}
            </p>
          </${this.helpTextTag}>
        `
      }
    `;
  }

  /**
   * Renders the emphasized layout.
   * @private
   * @returns {import("lit").TemplateResult} - The template for the emphasized layout.
   */
  renderLayoutEmphasized() {
    const placeholderClass = {
      'util_displayHidden': this.value
    };

    const displayValueClasses = {
      'displayValue': true,
      'hasContent': this.hasDisplayValueContent,
      'hasFocus': this.isPopoverVisible,
      'withValue': this.commonLabelClasses.withValue,
      'force': this.forceDisplayValue,
    };

    const valueContainerClasses = {
      'valueContainer': true,
      'util_displayHiddenVisually': (this.forceDisplayValue || !(this.dropdown && this.dropdown.isPopoverVisible)) && this.hasDisplayValueContent
    };

    return html`
      <div
        part="wrapper">
        <div id="slotHolder" aria-hidden="true">
          <slot name="bib.fullscreen.headline" @slotchange="${this.handleSlotChange}"></slot>
        </div>
        <${this.dropdownTag}
          disableKeyboardHandling
          appearance="${this.onDark ? 'inverse' : this.appearance}"
          .a11yRole=${"combobox"}
          ?autoPlacement="${this.autoPlacement}"
          ?error="${this.validity !== undefined && this.validity !== 'valid'}"
          ?matchWidth="${this.matchWidth}"
          ?noFlip="${this.noFlip}"
          ?shift="${this.shift}"
          .fullscreenBreakpoint="${this.fullscreenBreakpoint}"
          .offset="${this.offset}"
          .placement="${this.placement}"
          chevron
          for="selectMenu"
          layout="${this.layout}"
          part="dropdown"
          shape="${this.shape}"
          size="${this.size}">
          <div slot="trigger" id="triggerFocus" class="triggerContent">
            <div class="accents left">
              <slot name="typeIcon"></slot>
            </div>
            <div class="mainContent">
              <div class="${classMap(valueContainerClasses)}">
                <span id="dropdownLabel" class="${classMap(this.commonLabelClasses)}">
                  <slot name="label"></slot>
                  ${this.required ? undefined : html`<slot name="optionalLabel"> (optional)</slot>`}
                </span>
                <div class="value" id="value"></div>
                <div id="placeholder" class="${classMap(placeholderClass)}">
                  ${this.placeholder}
                </div>
              </div>
              <div class="${classMap(displayValueClasses)}" aria-hidden="true" part="displayValue">
                <slot name="displayValue"></slot>
              </div>
            </div>
            <div class="accents right"></div>
          </div>
          <${this.bibtemplateTag} ?large="${this.largeFullscreenHeadline}" @close-click="${this.hideBib}">
            <slot name="ariaLabel.bib.close" slot="ariaLabel.close">Close</slot>
            <slot></slot>
          </${this.bibtemplateTag}>
          <div slot="helpText">
            ${this.renderHtmlHelpText()}
          </div>
        </${this.dropdownTag}>
        <span id="srAnnouncement" class="util_displayHiddenVisually" aria-live="polite" role="status"></span>
      </div>
    `;
  }

  /**
   * Renders the snowflake layout.
   * @private
   * @returns {import("lit").TemplateResult} - The template for the snowflake layout.
   */
  renderLayoutSnowflake() {
    const placeholderClass = {
      'util_displayHidden': this.value
    };

    const displayValueClasses = {
      'displayValue': true,
      'hasContent': this.hasDisplayValueContent,
      'hasFocus': this.isPopoverVisible,
      'withValue': this.commonLabelClasses.withValue,
      'force': this.forceDisplayValue,
    };

    const valueContainerClasses = {
      'valueContainer': true,
      'util_displayHiddenVisually': (this.forceDisplayValue || !(this.dropdown && this.dropdown.isPopoverVisible)) && this.hasDisplayValueContent
    };

    return html`
      <div
        part="wrapper">
        <div id="slotHolder" aria-hidden="true">
          <slot name="bib.fullscreen.headline" @slotchange="${this.handleSlotChange}"></slot>
        </div>
        <${this.dropdownTag}
          disableKeyboardHandling
          appearance="${this.onDark ? 'inverse' : this.appearance}"
          .a11yRole=${"combobox"}
          ?autoPlacement="${this.autoPlacement}"
          ?error="${this.validity !== undefined && this.validity !== 'valid'}"
          ?matchWidth="${this.matchWidth}"
          ?noFlip="${this.noFlip}"
          .fullscreenBreakpoint="${this.fullscreenBreakpoint}"
          .offset="${this.offset}"
          .placement="${this.placement}"
          chevron
          for="selectMenu"
          layout="${this.layout}"
          part="dropdown"
          shape="${this.shape}"
          size="${this.size}">
          <div slot="trigger" id="triggerFocus" class="triggerContent">
            <div class="accents left">
              <slot name="typeIcon"></slot>
            </div>
            <div class="mainContent">
              <div class="${classMap(valueContainerClasses)}">
                <span id="dropdownLabel" class="${classMap(this.commonLabelClasses)}">
                  <slot name="label"></slot>
                  ${this.required ? undefined : html`<slot name="optionalLabel"> (optional)</slot>`}
                </span>
                <div class="value body-default" id="value"></div>
                <div id="placeholder" class="${classMap(placeholderClass)}">
                  ${this.placeholder}
                </div>
              </div>
              <div class="${classMap(displayValueClasses)}" aria-hidden="true" part="displayValue">
                <slot name="displayValue"></slot>
              </div>
            </div>
            <div class="accents right"></div>
          </div>
          <${this.bibtemplateTag} ?large="${this.largeFullscreenHeadline}" @close-click="${this.hideBib}">
            <slot name="ariaLabel.bib.close" slot="ariaLabel.close">Close</slot>
            <slot></slot>
          </${this.bibtemplateTag}>
          <div slot="helpText">
            ${this.renderHtmlHelpText()}
          </div>
        </${this.dropdownTag}>
        ${this.renderNativeSelect()}
        <span id="srAnnouncement" class="util_displayHiddenVisually" aria-live="polite" role="status"></span>
      </div>
    `;
  }

  /**
   * Renders the classic layout.
   * @private
   * @returns {import("lit").TemplateResult} - The template for the classic layout.
   */
  renderLayoutClassic() {
    const placeholderClass = {
      'util_displayHidden': this.value
    };

    const displayValueClasses = {
      'displayValue': true,
      'hasContent': this.hasDisplayValueContent,
      'hasFocus': this.isPopoverVisible,
      'withValue': this.commonLabelClasses.withValue,
      'force': this.forceDisplayValue,
    };

    const valueContainerClasses = {
      'valueContainer': true,
      'util_displayHiddenVisually': (this.forceDisplayValue || !(this.dropdown && this.dropdown.isPopoverVisible)) && this.hasDisplayValueContent
    };

    const valueClasses = {
      'value': true,
      'body-default': true
    };

    return html`
      <div
        part="wrapper">
        <div id="slotHolder" aria-hidden="true">
          <slot name="bib.fullscreen.headline" @slotchange="${this.handleSlotChange}"></slot>
        </div>
        <${this.dropdownTag}
          disableKeyboardHandling
          appearance="${this.onDark ? 'inverse' : this.appearance}"
          .a11yRole=${"combobox"}
          ?autoPlacement="${this.autoPlacement}"
          ?error="${this.validity !== undefined && this.validity !== 'valid'}"
          ?matchWidth="${!this.flexMenuWidth}"
          ?noFlip="${this.noFlip}"
          .fullscreenBreakpoint="${this.fullscreenBreakpoint}"
          .offset="${this.offset}"
          .placement="${this.placement}"
          chevron
          for="selectMenu"
          layout="${this.layout}"
          part="dropdown"
          shape="${this.shape}"
          size="${this.size}">
          <div slot="trigger" id="triggerFocus" class="triggerContent">
            <div class="accents left">
              <slot name="typeIcon"></slot>
            </div>
            <div class="mainContent">
              <div class="${classMap(valueContainerClasses)}">
                <span id="dropdownLabel" class="${classMap(this.commonLabelClasses)}">
                  <slot name="label"></slot>
                  ${this.required ? undefined : html`<slot name="optionalLabel"> (optional)</slot>`}
                </span>
                <div class="${classMap(valueClasses)}" id="value"></div>
                <div id="placeholder" class="${classMap(placeholderClass)}">
                  ${this.placeholder}
                </div>
              </div>
              <div class="${classMap(displayValueClasses)}" aria-hidden="true" part="displayValue">
                <slot name="displayValue"></slot>
              </div>
            </div>
            <div class="accents right"></div>
          </div>
          <${this.bibtemplateTag} ?large="${this.largeFullscreenHeadline}" @close-click="${this.hideBib}">
            <slot name="ariaLabel.bib.close" slot="ariaLabel.close">Close</slot>
            <slot></slot>
          </${this.bibtemplateTag}>
          <div slot="helpText">
            ${this.renderHtmlHelpText()}
          </div>
        </${this.dropdownTag}>
        ${this.renderNativeSelect()}
        <span id="srAnnouncement" class="util_displayHiddenVisually" aria-live="polite" role="status"></span>
      </div>
    `;
  }

  /**
   * Renders the template for the current layout.
   * @private
   * @param {string} [ForcedLayout] - A layout name to render instead of `layout`, such as `emphasized`.
   * @returns {import("lit").TemplateResult} - The template for the layout.
   */
  renderLayout(ForcedLayout) {
    const layout = ForcedLayout || this.layout;

    switch (layout) {
      case 'emphasized':
        return this.renderLayoutEmphasized();
      case 'emphasized-left':
        return this.renderLayoutEmphasized();
      case 'emphasized-right':
        return this.renderLayoutEmphasized();
      case 'snowflake':
        return this.renderLayoutSnowflake();
      case 'snowflake-left':
        return this.renderLayoutSnowflake();
      case 'snowflake-right':
        return this.renderLayoutSnowflake();
      default:
        return this.renderLayoutClassic();
    }
  }

  // When using auroElement, use the following attribute and function when hiding content from screen readers.
  // aria-hidden="${this.hideAudible(this.hiddenAudible)}"
}

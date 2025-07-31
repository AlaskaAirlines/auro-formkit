// Copyright (c) 2021 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

/* eslint-disable
  max-lines,
  no-underscore-dangle,
  lit/binding-positions,
  lit/no-invalid-html,
  indent,
  curly
*/

// If using litElement base class
import { css } from "lit";
import { classMap } from 'lit/directives/class-map.js';
import { html } from 'lit/static-html.js';

import { AuroElement } from '../../layoutElement/src/auroElement.js';

import shapeSizeCss from "./styles/shapeSize-css.js";
import tokensCss from "./styles/tokens-css.js";

import AuroFormValidation from '@auro-formkit/form-validation';
import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';

import { AuroDependencyVersioning } from '@aurodesignsystem/auro-library/scripts/runtime/dependencyTagVersioning.mjs';

import { AuroDropdown } from '@aurodesignsystem/auro-dropdown';
import dropdownVersion from './dropdownVersion.js';

import { AuroBibtemplate } from '@aurodesignsystem/auro-bibtemplate';
import bibTemplateVersion from './bibtemplateVersion.js';

import { AuroHelpText } from '@aurodesignsystem/auro-helptext';
import helpTextVersion from './helptextVersion.js';

import styleCss from "./styles/style-css.js";
import emphasizedColorCss from "./styles/emphasized/color-css.js";
import { ifDefined } from "lit-html/directives/if-defined.js";

// See https://git.io/JJ6SJ for "How to document your components using JSDoc"
/**
 * The auro-select element is a wrapper for auro-dropdown and auro-menu to create a dropdown menu control.
 *
 * @slot - Default slot for the menu content.
 * @slot ariaLabel.bib.close - Sets aria-label on close button in fullscreen bib
 * @slot bib.fullscreen.headline - Defines the headline to display above menu-options
 * @slot label - Defines the content of the label.
 * @slot {HTMLSlotElement} optionalLabel - Allows overriding the optional display text "(optional)", which appears next to the label.
 * @slot helpText - Defines the content of the helpText.
 * @slot valueText - Dropdown value text display.
 * @slot displayValue - Allows custom HTML content to display the selected value when select is not focused.
 * @event auroSelect-valueSet - Notifies that the component has a new value set.
 * @event input - Notifies every time the value prop of the element is changed. The updated `value` and `optionSelected` will be delivered in `detail` object.
 * @event auroFormElement-validated - Notifies that the `validity` and `errorMessage` values have changed.
 *
 * @csspart dropdownTrigger - Apply CSS to the trigger content container.
 * @csspart dropdownChevron - Apply CSS to the collapsed/expanded state icon container.
 * @csspart dropdownSize - Apply size styles to the dropdown bib. (height, width, maxHeight, maxWidth only)
 * @csspart helpText - Apply CSS to the help text.
 */

// build the component class
export class AuroSelect extends AuroElement {
  constructor() {
    super();

    this.privateDefaults();

    const idLength = 36;
    const idSubstrEnd = 8;
    const idSubstrStart = 2;

    this.matchWidth = false;

    // floaterConfig
    this.placement = 'bottom-start';
    this.offset = 0;
    this.noFlip = false;
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
     * Generate unique names for dependency components.
     */
    const versioning = new AuroDependencyVersioning();

    /**
     * @private
     */
    this.dropdownTag = versioning.generateTag('auro-formkit-select-dropdown', dropdownVersion, AuroDropdown);

    /**
     * @private
     */
    this.bibtemplateTag = versioning.generateTag('auro-formkit-select-bibtemplate', bibTemplateVersion, AuroBibtemplate);

    /**
     * @private
     */
    this.helpTextTag = versioning.generateTag('auro-formkit-input-helptext', helpTextVersion, AuroHelpText);

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
  }

  /**
   * @private
   * @returns {void} Internal defaults.
   */
  privateDefaults() {
    this.options = [];
    this.optionActive = null;
    this.optionSelected = undefined;
    this.value = undefined;
    this.fullscreenBreakpoint = 'sm';
    this.onDark = false;
    this.isPopoverVisible = false;

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
       * If declared, sets the autocomplete attribute for the select element.
       */
      autocomplete: {
        type: String,
        reflect: true
      },

      /**
       * If declared, the label and value will be visually hidden and the displayValue will render 100% of the time.
       */
      forceDisplayValue: {
        type: Boolean,
        reflect: true
      },

      /**
       * If declared, bib's position will be automatically calculated where to appear.
       * @default false
       */
      autoPlacement: {
        type: Boolean,
        reflect: true
      },

      /**
       * When attribute is present, element shows disabled state.
       */
      disabled: {
        type: Boolean,
        reflect: true
      },

      /**
       * When attribute is present, element will be 100% width of container element.
       */
      fluid: {
        type: Boolean,
        reflect: true
      },

      /**
       * @private
       */
      isPopoverVisible: {
        type: Boolean,
        reflect: false
      },

      /**
       * If declared, the popover and trigger will be set to the same width.
       */
      matchWidth: {
        type: Boolean,
        reflect: true
      },

      /**
       * The name for the select element.
       */
      name: {
        type: String,
        reflect: true
      },

      /**
       * Defines the screen size breakpoint (`xs`, `sm`, `md`, `lg`, `xl`, `disabled`)
       * at which the dropdown switches to fullscreen mode on mobile. `disabled` indicates a dropdown should _never_ enter fullscreen.
       *
       * When expanded, the dropdown will automatically display in fullscreen mode
       * if the screen size is equal to or smaller than the selected breakpoint.
       * @default sm
       */
      fullscreenBreakpoint: {
        type: String,
        reflect: true
      },

      /**
       * If declared, make bib.fullscreen.headline in HeadingDisplay.
       * Otherwise, Heading 600.
       */
      largeFullscreenHeadline: {
        type: Boolean,
        reflect: true
      },

      /**
       * When true, checkmark on selected option will no longer be present.
       */
      noCheckmark: {
        type: Boolean,
        reflect: true
      },

      /**
       * If declared, the bib will NOT flip to an alternate position
       * when there isn't enough space in the specified `placement`.
       * @default false
       */
      noFlip: {
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
       * If declared, onDark styles will be applied to the trigger.
       */
      onDark: {
        type: Boolean,
        reflect: true
      },

      /**
       * @private
       */
      optionActive: {
        type: Object
      },

      /**
       * Specifies the current selected menuOption. Default type is `HTMLElement`, changing to `Array<HTMLElement>` when `multiSelect` is true.
       * @type {HTMLElement|Array<HTMLElement>}
       */
      optionSelected: {
        type: Object
      },

      /**
       * @private
       */
      options: {
        type: Array
      },

      /**
       * Position where the bib should appear relative to the trigger.
       * Accepted values:
       * "top" | "right" | "bottom" | "left" |
       * "bottom-start" | "top-start" | "top-end" |
       * "right-start" | "right-end" | "bottom-end" |
       * "left-start" | "left-end".
       * @default bottom-start
       */
      placement: {
        type: String,
        reflect: true
      },

      /**
       * Define custom placeholder text.
       */
      placeholder: {
        type: String,
        reflect: true
      },

      /**
       * Populates the `required` attribute on the element. Used for client-side validation.
       */
      required: {
        type: Boolean,
        reflect: true
      },

      /**
       * When defined, sets persistent validity to `customError` and sets `setCustomValidity` = attribute value.
       */
      error: {
        type: String,
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
       * Specifies the `validityState` this element is in.
       */
      validity: {
        type: String,
        reflect: true
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
       * Sets multi-select mode, allowing multiple options to be selected at once.
       */
      multiSelect: {
        type: Boolean,
        reflect: true,
        attribute: 'multiselect'
      },

      /**
       * Indicates whether the input is in a dirty state (has been interacted with).
       * @type {boolean}
       * @default false
       * @private
       */
      touched: {
        type: Boolean,
        reflect: true,
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
      hasDisplayValueContent: {
        type: Boolean,
        reflect: false,
        attribute: false
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

  /**
   * Returns classmap configuration for html5 input labels in all layouts.
   * @private
   * @returns {Record<string, boolean>}
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
   * Returns the label font class based on layout and selection state.
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
   * Whether or not the component has a value.
   * @returns {boolean} - Returns true if the component has a value or placeholder.
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

    this.dropdown.addEventListener('auroDropdown-toggled', () => {
      this.isPopoverVisible = this.dropdown.isPopoverVisible;

      if (this.dropdown.isPopoverVisible) {
        this.updateMenuShapeSize();
        // wait til the bib gets fully rendered
        setTimeout(() => {
          if (this.dropdown.isBibFullscreen) {

            // default focus indicator on the first menu option
            if (this.menu.index < 0) {
              this.menu.navigateOptions('down');
            }
          }
        });
      }
    });

    this.dropdown.addEventListener('auroDropdown-strategy-change', () => {
      this.updateMenuShapeSize();
    });

    // setting up bibtemplate
    this.bibtemplate = this.dropdown.querySelector(this.bibtemplateTag._$litStatic$);

    if (this.customBibWidth) {
      this.dropdown.dropdownWidth = this.customBibWidth;
    }

    // Exposes the CSS parts from the dropdown for styling
    this.dropdown.exposeCssParts();
  }

  /**
   * This will register this element with the browser.
   * @param {string} [name="auro-select"] - The name of element that you want to register to.
   *
   * @example
   * AuroSelect.register("custom-select") // this will register this element to <custom-select/>
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
    if (this.optionSelected) {
      if (this.multiSelect && this.optionSelected.length > 0) {
        const displayText = this.optionSelected.map((option) => option.textContent).join(', ');

        valueElem.textContent = displayText;
      } else {
        valueElem.innerHTML = this.optionSelected.innerHTML;
        const displayValueEl = this.optionSelected.querySelector("[slot='displayValue']");

        if (displayValueEl) {
          this.appendChild(displayValueEl.cloneNode(true));
        }
        this.hasDisplayValueContent = displayValueEl !== null;
      }
    }

    this.dropdown.requestUpdate();
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
      // set menu's default size if there it's not specified.
      if (!this.menu.getAttribute('size')) {
        this.menu.setAttribute('size', this.layout !== 'emphasized' ? 'md' : this.size);
      }

      if (!this.getAttribute('shape')) {
        this.menu.setAttribute('shape', this.layout === 'classic' ? 'box' : this.shape);
      }
    }
  }

  /**
   * Binds all behavior needed to the menu after rendering.
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

    this.updateMenuShapeSize();

    if (this.multiSelect) {
      this.menu.multiSelect = this.multiSelect;
    }

    this.menu.addEventListener("auroMenu-loadingChange", (event) => this.handleMenuLoadingChange(event));

    this.generateOptionsArray();

    this.menu.addEventListener('auroMenu-activatedOption', (evt) => {
      this.optionActive = evt.detail;
    });

    this.menu.addEventListener('auroMenu-selectedOption', () => {
      // Get array of selected options from menu
      this.optionSelected = this.menu.optionSelected;
      // For single select, we still use arrays but only take first value
      this.value = this.menu.value;

      if (this.dropdown.isPopoverVisible) {
        this.dropdown.hide();
      }
    });

    /**
     * When this.value is preset auro-menu.selectByValue(this.value) is called.
     * However, if this.value does not match one of the menu options,
     * auro-menu will notify via event. In this case, clear out this.value
     * so that it is not storing an invalid value which can then later be returned
     * with `auro-select.value`.
     */
    this.menu.addEventListener('auroMenu-selectValueFailure', () => {
      this.menu.clearSelection();
    });

    this.menu.addEventListener('auroMenu-selectValueReset', () => {
      this.optionSelected = this.menu.optionSelected;
      this.validate(this);
    });

    this.menu.addEventListener('auroMenu-activatedOption', () => {
      // if (evt.detail) {
      //   evt.detail.scrollIntoView({
      //     alignToTop: false,
      //     block: "nearest",
      //     behavior: "smooth"
      //   });
      // }
    });
  }

  /**
   * Binds all behavior needed to the component after rendering.
   * @private
   * @returns {void}
   */
  configureSelect() {
    this.nativeSelect = this.shadowRoot.querySelector('select');

    this.addEventListener('keydown', (evt) => {

      // When the focus is on the select element
      if (document.activeElement === this) {

        // Prevent scroll on space
        if (evt.code === "Space") {
          evt.preventDefault();
          this.dropdown.toggle();
        }
      }

      // when the focus is on trigger not on close button
      if (this.dropdown.isPopoverVisible) {
        if (evt.key === 'ArrowUp') {
          evt.preventDefault();

          this.dropdown.show();

          if (this.dropdown.isPopoverVisible) {
            this.menu.navigateOptions('up');
          }

          return;
        }

        if (evt.key === 'ArrowDown') {
          evt.preventDefault();

          this.dropdown.show();

          if (this.dropdown.isPopoverVisible) {
            this.menu.navigateOptions('down');
          }

          return;
        }

        if (evt.key === 'Enter') {
          evt.preventDefault();
          this.menu.makeSelection();

          return;
        }
      }

      // Handle all other key presses by updating the active option based on the key pressed
      this.updateActiveOptionBasedOnKey(evt.key);
    });

    this.addEventListener('focusin', this.handleFocusin);

    this.addEventListener('blur', () => {
      this.validate();
      this.hasFocus = false;
    });
  }

  /**
   * Updates the active option in the menu based on keyboard input.
   * @private
   * @param {string} _key - The key pressed by the user.
   * @returns {void}
   */
  updateActiveOptionBasedOnKey(_key) {

    // Get a lowercase version of the key pressed
    const key = _key.toLowerCase();

    // Calculate how many times the same letter has been pressed
    this.sameLetterTimes = key === this.lastLetter ? this.sameLetterTimes + 1 : 0;

    // Set last letter for tracking
    this.lastLetter = key;

    // Get all the options that start with the last letter pressed
    const letterOptions = this.options.filter((option) => {
      const optionText = option.value || '';
      return optionText.toLowerCase().startsWith(this.lastLetter);
    });

    // If we have options that match the letter pressed
    if (letterOptions.length) {

      // Show the dropdown if it is not already visible
      this.dropdown.show();

      // Get the index we're after based on how many times the letter has been pressed and the length of the letterOptions array
      const index = this.sameLetterTimes < letterOptions.length ? this.sameLetterTimes : this.sameLetterTimes % letterOptions.length;

      // Select the new option in the menu
      const newOption = letterOptions[index];
      const newOptionIndex = this.options.indexOf(newOption);
      this.menu.updateActiveOption(newOptionIndex);
    }
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
    if (this.dropdown && !this.dropdown.isPopoverVisible) {
      this.dropdown.show();
    }
  }

  /**
   * Function to support @focusin event.
   * @private
   * @return {void}
   */
  handleFocusin() {

    this.hasFocus = true;
    this.touched = true;
  }

  /**
   * Watch for slot changes and recalculate the menuoptions.
   * @private
   * @param {Event} event - `slotchange` event.
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
   * Determines the element error state based on the `required` attribute and input value.
   * @private
   * @returns {void}
   */
  generateOptionsArray() {
    if (this.menu) {
      this.options = [...this.menu.querySelectorAll('auro-menuoption, [auro-menuoption]')];
    } else {
      this.options = [];
    }
  }

  /**
   * Resets all options to their default state.
   * @private
   */
  clearSelection() {
    this.value = undefined;
    this.optionSelected = undefined;

    this.menu.multiSelect = this.multiSelect;
  }

  /**
   * Handle element attributes on update.
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

  // lifecycle runs only after the element's DOM has been updated the first time
  firstUpdated() {
    // Add the tag name as an attribute if it is different than the component name
    this.runtimeUtils.handleComponentTagRename(this, 'auro-select');

    this.configureDropdown();
    this.configureMenu();
    this.configureSelect();
  }

  /**
   * Update the menu value. With checks for menu existence. Awaits value update.
   * @param {string} value - The value to set in the menu.
   * @returns {void}
   * @private
   */
  async updateMenuValue(value) {
    if (!this.menu) return;

    this.menu.setAttribute('value', value);
    if (value) {
      this.menu.value = value;
    } else {
      this.menu.reset();
    }
    await this.menu.updateComplete;
  }

  async updated(changedProperties) {
    if (changedProperties.has('multiSelect') && !changedProperties.has('value')) {
      this.clearSelection();
    }

    if (changedProperties.has('value')) {
      if (this.value) {
        await this.updateMenuValue(this.value);

        if (this.menu) {
          this.optionSelected = this.menu.optionSelected;
        }
      } else {
        await this.updateMenuValue(undefined);
      }

      this._updateNativeSelect();
      this.validate();

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
          optionSelected: this.optionSelected,
          value: this.formattedValue
        }
      }));
    }

    if (changedProperties.has('optionSelected')) {
      this.updateDisplayedValue();
    }

    if (changedProperties.has('error')) {
      this.validate(true);
      this.nativeSelect.setCustomValidity(this.error || '');
    }

    if (changedProperties.has('shape') && this.menu) {
      this.menu.setAttribute('shape', this.layout === 'classic' ? 'box' : this.shape);
    }

    if (changedProperties.has('size') && this.menu) {
      this.menu.setAttribute('size', this.layout !== 'emphasized' ? 'md' : this.size);
    }
  }

  /**
   * Resets component to initial state.
   * @returns {void}
   */
  reset() {
    this.validation.reset(this);
  }

  /**
   * Validates value.
   * @param {boolean} [force=false] - Whether to force validation.
   */
  validate(force = false) {
    this.validation.validate(this, force);
  }

  /**
   * Syncs the value from the native select element to the component's value.
   * @param {Event} event // The change event from the native select element.
   * @returns {void}
   * @private
   */
  _handleNativeSelectChange(event) {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const selectedValue = selectedOption.value;

    if (this.multiSelect) {
      const currentArray = this.formattedValue;

      if (!currentArray.includes(selectedValue)) {
        this.value = JSON.stringify([
          ...currentArray,
          selectedValue
        ]);
      }
    } else {
      const currentValue = this.value;

      if (currentValue !== selectedValue) {
        this.value = selectedValue;
      }
    }
  }

  /**
   * Updates the native select element's value based on the component's value.
   * @returns {void}
   * @private
   */
  _updateNativeSelect() {
    if (!this.nativeSelect) {
      return;
    }

    if (this.multiSelect) {
     this.nativeSelect.value = this.multiSelect ? this.multiSelect[0] : '';
    } else {
      this.nativeSelect.value = this.value || '';
    }
  }

  /**
   * Returns HTML for the hidden a11y screen reader content.
   * @private
   * @returns {html} - Returns HTML for the hidden a11y screen reader content.
   */
  renderAriaHtml() {
    return html`
      <div aria-live="polite" class="util_displayHiddenVisually">
        ${this.optionActive && this.options.length > 0
          ? html`
            ${`${this.optionActive.innerText}, option ${this.options.indexOf(this.optionActive) + 1} of ${this.options.length}`}
          `
          : undefined
        };

        ${this.optionSelected && this.options.length > 0
          ? html`
          ${`${this.optionSelected.innerText} selected`}
          `
          : undefined
        };
      </div>
    `;
  }

  /**
   * Returns HTML for the hidden HTML5 select.
   * @private
   * @returns {html} - Returns HTML for the hidden HTML5 select.
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
          ${this.options.map((option) => {
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
   * Returns HTML for the help text and error message.
   * @private
   * @returns {html} - Returns HTML for the help text and error message.
   */
  renderHtmlHelpText() {
    return html`
      ${!this.validity || this.validity === undefined || this.validity === 'valid'
        ? html`
          <${this.helpTextTag} ?onDark="${this.onDark}">
            <p id="${this.uniqueId}" part="helpText">
              <slot name="helpText"></slot>
            </p>
          </${this.helpTextTag}>
        `
        : html`
          <${this.helpTextTag} error ?onDark="${this.onDark}">
            <p id="${this.uniqueId}" role="alert" aria-live="assertive" part="helpText">
              ${this.errorMessage}
            </p>
          </${this.helpTextTag}>
        `
      }
    `;
  }

  /**
   * Returns HTML for the emphasized layout.
   * @private
   * @returns {import("lit").TemplateResult} - Returns HTML for the emphasized layout.
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
          a11yRole="select"
          ?autoPlacement="${this.autoPlacement}"
          ?error="${this.validity !== undefined && this.validity !== 'valid'}"
          ?matchWidth="${this.matchWidth}"
          ?noFlip="${this.noFlip}"
          ?onDark="${this.onDark}"
          .fullscreenBreakpoint="${this.fullscreenBreakpoint}"
          .offset="${this.offset}"
          .placement="${this.placement}"
          chevron
          for="selectMenu"
          layout="${this.layout}"
          part="dropdown"
          shape="${this.shape}"
          size="${this.size}">
          <div slot="trigger" aria-haspopup="true" id="triggerFocus" class="triggerContent">
            <div class="accents left">
              <slot name="typeIcon"></slot>
            </div>
            <div class="mainContent">
              <div class="${classMap(valueContainerClasses)}">
                <label class="${classMap(this.commonLabelClasses)}">
                  <slot name="label"></slot>
                  ${this.required ? undefined : html`<slot name="optionalLabel"> (optional)</slot>`}
                </label>
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
          <div class="menuWrapper"></div>
          <${this.bibtemplateTag} ?large="${this.largeFullscreenHeadline}" @close-click="${this.hideBib}">
            <slot name="ariaLabel.bib.close" slot="ariaLabel.close">Close</slot>
            <slot></slot>
          </${this.bibtemplateTag}>
          <div slot="helpText">
            ${this.renderHtmlHelpText()}
          </div>
        </${this.dropdownTag}>
      </div>
    `;
  }

  /**
   * Returns HTML for the snowflake layout.
   * @private
   * @returns {import("lit").TemplateResult} - Returns HTML for the snowflake layout.
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
          ?autoPlacement="${this.autoPlacement}"
          ?error="${this.validity !== undefined && this.validity !== 'valid'}"
          ?matchWidth="${this.matchWidth}"
          ?noFlip="${this.noFlip}"
          ?onDark="${this.onDark}"
          .fullscreenBreakpoint="${this.fullscreenBreakpoint}"
          .offset="${this.offset}"
          .placement="${this.placement}"
          chevron
          for="selectMenu"
          layout="${this.layout}"
          part="dropdown"
          shape="${this.shape}"
          size="${this.size}">
          <div slot="trigger" aria-haspopup="true" id="triggerFocus" class="triggerContent">
            <div class="accents left">
              <slot name="typeIcon"></slot>
            </div>
            <div class="mainContent">
              <div class="${classMap(valueContainerClasses)}">
                <label class="${classMap(this.commonLabelClasses)}">
                  <slot name="label"></slot>
                  ${this.required ? undefined : html`<slot name="optionalLabel"> (optional)</slot>`}
                </label>
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
          <div class="menuWrapper"></div>
          <${this.bibtemplateTag} ?large="${this.largeFullscreenHeadline}" @close-click="${this.hideBib}">
            <slot name="ariaLabel.bib.close" slot="ariaLabel.close">Close</slot>
            <slot></slot>
          </${this.bibtemplateTag}>
          <div slot="helpText">
            ${this.renderHtmlHelpText()}
          </div>
        </${this.dropdownTag}>
        ${this.renderNativeSelect()}
      </div>
    `;
  }

  /**
   * Returns HTML for the classic layout.
   * @private
   * @returns {import("lit").TemplateResult} - Returns HTML for the classic layout.
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
          ?autoPlacement="${this.autoPlacement}"
          ?error="${this.validity !== undefined && this.validity !== 'valid'}"
          ?matchWidth="${!this.flexMenuWidth}"
          ?noFlip="${this.noFlip}"
          ?onDark="${this.onDark}"
          .fullscreenBreakpoint="${this.fullscreenBreakpoint}"
          .offset="${this.offset}"
          .placement="${this.placement}"
          chevron
          for="selectMenu"
          layout="${this.layout}"
          part="dropdown"
          shape="${this.shape}"
          size="${this.size}">
          <div slot="trigger" aria-haspopup="true" id="triggerFocus" class="triggerContent">
            <div class="accents left">
              <slot name="typeIcon"></slot>
            </div>
            <div class="mainContent">
              <div class="${classMap(valueContainerClasses)}">
                <label class="${classMap(this.commonLabelClasses)}">
                  <slot name="label"></slot>
                  ${this.required ? undefined : html`<slot name="optionalLabel"> (optional)</slot>`}
                </label>
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
          <div class="menuWrapper"></div>
          <${this.bibtemplateTag} ?large="${this.largeFullscreenHeadline}" @close-click="${this.hideBib}">
            <slot name="ariaLabel.bib.close" slot="ariaLabel.close">Close</slot>
            <slot></slot>
          </${this.bibtemplateTag}>
          <div slot="helpText">
            ${this.renderHtmlHelpText()}
          </div>
        </${this.dropdownTag}>
        ${this.renderNativeSelect()}
      </div>
    `;
  }

  /**
   * Logic to determine the layout of the component.
   * @private
   * @param {string} [ForcedLayout] - Used to force a specific layout, pass in the layout name to use.
   * @returns {void}
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

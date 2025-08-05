// Copyright (c) 2022 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

/* eslint-disable complexity, max-lines, lit/binding-positions, lit/no-invalid-html, no-underscore-dangle, curly */

// If using litElement base class
import { css } from "lit";
import { html } from 'lit/static-html.js';
import { classMap } from 'lit/directives/class-map.js';
import { AuroDependencyVersioning } from '@aurodesignsystem/auro-library/scripts/runtime/dependencyTagVersioning.mjs';

import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';
import AuroFormValidation from '@auro-formkit/form-validation';

import { AuroDropdown } from '@aurodesignsystem/auro-dropdown';
import dropdownVersion from './dropdownVersion.js';

import { AuroInput } from '@aurodesignsystem/auro-input';
import inputVersion from './inputVersion.js';

import { AuroBibtemplate } from '@aurodesignsystem/auro-bibtemplate';
import bibTemplateVersion from './bibtemplateVersion.js';

// Import touch detection lib
import styleCss from './styles/style-css.js';
import styleEmphasizedCss from './styles/emphasized/style-css.js';
import styleSnowflakeCss from './styles/snowflake/style-css.js';

import { AuroElement } from '../../layoutElement/src/auroElement.js';
import {AuroHelpText} from "@aurodesignsystem/auro-helptext";
import {ifDefined} from "lit/directives/if-defined.js";

// See https://git.io/JJ6SJ for "How to document your components using JSDoc"
/**
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

// build the component class
export class AuroCombobox extends AuroElement {

  constructor() {
    super();

    // Defaults that effect the combobox behavior and state
    this.disabled = false;
    this.msgSelectionMissing = 'Please select an option.';
    this.noFilter = false;
    this.noValidate = false;
    this.optionActive = null;
    this.persistInput = false;
    this.required = false;
    this.value = undefined;
    this.typedValue = undefined;

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
    this.autoPlacement = false;

    this.privateDefaults();
  }

  /**
   * @private
   * @returns {void} Internal defaults.
   */
  privateDefaults() {
    const versioning = new AuroDependencyVersioning();

    this.dropdownTag = versioning.generateTag('auro-formkit-combobox-dropdown', dropdownVersion, AuroDropdown);
    this.bibtemplateTag = versioning.generateTag('auro-formkit-combobox-bibtemplate', bibTemplateVersion, AuroBibtemplate);
    this.inputTag = versioning.generateTag('auro-formkit-combobox-input', inputVersion, AuroInput);
    this.helpTextTag = versioning.generateTag('auro-formkit-input-helptext', '1.0.0', AuroHelpText);

    this.availableOptions = [];
    this.dropdownId = undefined;
    this.dropdownOpen = false;
    this.errorMessage = null;
    this.isHiddenWhileLoading = false;
    this.largeFullscreenHeadline = false;
    this.onDark = false;
    this.optionSelected = undefined;
    this.runtimeUtils = new AuroLibraryRuntimeUtils();
    this.touched = false;
    this.validation = new AuroFormValidation();
    this.validity = undefined;
  }

  // This function is to define props used within the scope of this component
  // Be sure to review  https://lit-element.polymer-project.org/guide/properties#reflected-attributes
  // to understand how to use reflected attributes with your property settings.
  static get properties() {
    return {
      // ...super.properties,

      /**
       * An enumerated attribute that defines what the user agent can suggest for autofill. At this time, only `autocomplete="off"` is supported.
       * @default false
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
       * @private
       */
      availableOptions: {
        state: true,
        type: Array,
        reflect: false
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
       * If declared, the popover and trigger will be set to the same width.
       */
      matchWidth: {
        type: Boolean,
        reflect: true
      },

      /**
       * If set, combobox will not filter menuoptions based in input.
       */
      noFilter: {
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
       * @type {Boolean}
       */
      persistInput: {
        type: Boolean,
        reflect: true
      },

      /* eslint-disable jsdoc/require-description-complete-sentence */
      /**
       * Position where the bib should appear relative to the trigger.
       * Accepted values:
       * "top" | "right" | "bottom" | "left" |
       * "bottom-start" | "top-start" | "top-end" |
       * "right-start" | "right-end" | "bottom-end" |
       * "left-start" | "left-end"
       * @default bottom-start
       */
      placement: {
        type: String,
        reflect: true
      },
      /* eslint-enable jsdoc/require-description-complete-sentence */

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
       * Indicates whether the combobox is in a dirty state (has been interacted with).
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
       * If set, the `icon` attribute will be applied to the trigger `auro-input` element.
       */
      triggerIcon: {
        type: Boolean,
        reflect: true
      },

      /**
       * Applies the defined value as the type attribute on auro-input.
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
       * Value selected for the dropdown menu.
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

  // /**
  //  * Sets the value of the input element within the combobox.
  //  */
  // set inputValue(value) {
  //   this.input.value = value;
  // }

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
   * @param {string} [name='auro-combobox'] - The name of element that you want to register to.
   *
   * @example
   * AuroCombobox.register('custom-combobox') // this will register this element to <custom-combobox/>
   *
   */
  static register(name = 'auro-combobox') {
    AuroLibraryRuntimeUtils.prototype.registerComponent(name, AuroCombobox);
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

      // only count options that match the typed input value AND are not currently selected AND are not static
      if (this.input.value && matchString.includes(this.input.value.toLowerCase()) && !option.hasAttribute('static')) {
        option.removeAttribute('hidden');
        this.availableOptions.push(option);
      } else if (!option.hasAttribute('persistent')) {
        // Hide all other non-persistent options
        option.setAttribute('hidden', '');
      }
    });

    if (this.availableOptions.length === 0) {
      if (this.noMatchOption) {
        this.noMatchOption.removeAttribute('hidden');
      } else {
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
  async syncValuesAndStates() {
    this.menu.value = this.value;
    this.menu.matchWord = this.input.value;

    // Wait a lifecycle for child components to update
    await Promise.all([this.menu.updateComplete]);

    this.updateTriggerTextDisplay();
  }

  /**
   * Update displayValue or input.value, it's called when making a selection.
   * @private
   */
  updateTriggerTextDisplay() {
    // update the input content if persistInput is false
    if (!this.persistInput) {
      if (this.menu.optionSelected && this.menu.optionSelected.textContent.length > 0) {
        this.input.value = this.menu.optionSelected.textContent;
      } else {
        this.input.value = this.value;
      }
    }

    // update the displayValue in the trigger if displayValue slot content is present
    const displayValueInTrigger = this.input.querySelector('[slot="displayValue"]');

    if (displayValueInTrigger) {
      displayValueInTrigger.remove();
    }

    if (this.menu.optionSelected) {
      const displayValueEl = this.menu.optionSelected.querySelector("[slot='displayValue']");
      if (displayValueEl) {
        this.input.appendChild(displayValueEl.cloneNode(true));
      }
    }

    this.requestUpdate();
  }

  /**
   * Resets the menu matchWord to true.
   * @private
   */
  resetMenuMatchword() {
    this.menu.updateItemsState(new Map([
      [
        'matchWord',
        true
      ]
    ]));
  };

  /**
   * Processes hidden state of all menu options and determines if there are any available options not hidden.
   * @private
   * @returns {void}
   */
  handleMenuOptions() {
    this.resetMenuMatchword();

    this.generateOptionsArray();
    this.availableOptions = [];
    this.updateFilter();

    if (this.value && this.input.value && !this.menu.value) {
      this.syncValuesAndStates();
    }
  }

  /**
   * Determines the element error state based on the `required` attribute and input value.
   * @private
   * @returns {void}
   */
  generateOptionsArray() {
    if (this.menu) {
      this.options = this.menu.querySelectorAll('auro-menuoption, [auro-menuoption]');
    } else {
      this.options = [];
    }
  }

  /**
   * Hides the dropdown bib if its open.
   * @returns {void}
   */
  hideBib() {
    if (this.dropdown) this.dropdown.hide();
  }

  /**
   * Shows the dropdown bib if there are options to show.
   * @returns {void}
   */
  showBib() {
    if (this.dropdown) this.dropdown.show();
  }

  /**
   * Binds all behavior needed to the dropdown after rendering.
   * @private
   * @returns {void}
   */
  configureDropdown() {
    this.dropdown.a11yRole = "combobox";

    // Listen for the ID to be added to the dropdown so we can capture it and use it for accessibility.
    this.dropdown.addEventListener('auroDropdown-idAdded', (event) => {
      this.dropdownId = event.detail.id;
    });

    // Listen for the dropdown to be shown or hidden
    this.dropdown.addEventListener("auroDropdown-toggled", (ev) => {
      this.dropdownOpen = ev.detail.expanded;
      this.updateMenuShapeSize();

      // Don't show the bib if there are no options available
      if (this.dropdownOpen && this.options.length <= 1) this.hideBib();

      // wait a frame in case the bib gets hide immediately after showing because there is no value
      setTimeout(() => {
        if (this.componentHasFocus) {
          this.setInputFocus();
        }
      }, 0);
    });

    this.dropdown.addEventListener('auroDropdown-triggerClick', () => {
      this.showBib();
    });

    // setting up bibtemplate
    this.bibtemplate = this.dropdown.querySelector(this.bibtemplateTag._$litStatic$);
    this.inputInBib = this.bibtemplate.querySelector(this.inputTag._$litStatic$);

    // Exposes the CSS parts from the bibtemplate for styling
    this.bibtemplate.exposeCssParts();

    this.hideBib = this.hideBib.bind(this);
    this.bibtemplate.addEventListener('close-click', this.hideBib);

    this.setInputFocus = this.setInputFocus.bind(this);
    this.dropdown.addEventListener('auroDropdown-strategy-change', () => {
      // event when the strategy(bib mode) is changed between fullscreen and floating
      this.updateMenuShapeSize();
    });
  }

  /**
   * @private
   */
  setClearBtnFocus() {
    const clearBtn = this.input.shadowRoot.querySelector('.clearBtn');
    if (clearBtn) {
      clearBtn.focus();
    }
  }

  /**
   * @private
   */
  setInputFocus() {
    if (this.dropdown.isBibFullscreen && this.dropdown.isPopoverVisible) {
      this.inputInBib.focus();
    } else if (!this.input.componentHasFocus) {
      const focusedEl = this.querySelector(":focus");
      this.input.focus();
      // current focus is on a menuoption, after clicking on it.
      if (this.persistInput && focusedEl && (focusedEl.tagName.toLowerCase() === 'auro-menuoption' || focusedEl.hasAttribute('auro-menuoption'))) {
        this.setClearBtnFocus();
      }
    }
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

    this.menu.value = this.value;

    this.updateMenuShapeSize();

    // a racing condition on custom-combobox with custom-menu
    if (!this.menu || this.menuShadowRoot === null) {
      setTimeout(() => {
        this.configureMenu();
      }, 0);
      return;
    }

    this.menu.addEventListener('auroMenu-loadingChange', (event) => this.handleMenuLoadingChange(event));
    this.menu.shadowRoot.addEventListener('slotchange', (event) => this.handleSlotChange(event));

    if (this.checkmark) {
      this.menu.removeAttribute('nocheckmark');
    } else {
      this.menu.setAttribute('nocheckmark', '');
    }

    // handle the menu event for an option selection
    this.menu.addEventListener('auroMenu-selectedOption', (evt) => {
      if (this.menu.optionSelected) {
        const selected = this.menu.optionSelected;

        if (!this.optionSelected || this.optionSelected !== selected) {
          this.optionSelected = selected;
        }

        if (!this.value || this.value !== this.optionSelected.value) {
          this.value = this.optionSelected.value;
          // this.menu.value = this.value;
        }

        this.updateTriggerTextDisplay();

        if (this.menu.matchWord !== this.input.value) {
          this.menu.matchWord = this.input.value;
        }

        // update the hidden state of options based on newly selected value
        this.handleMenuOptions();
      }

      // dropdown bib should hide when making a selection
      if (evt.detail && evt.detail.source !== 'slotchange') {
        setTimeout(() => {
          this.hideBib();
        }, 0);
      }
    });

    this.menu.addEventListener('auroMenu-customEventFired', () => {
      this.hideBib();
    });

    this.menu.addEventListener('auroMenu-activatedOption', (evt) => {
      this.optionActive = evt.detail;

      this.optionActive.scrollIntoView({
        alignToTop: false,
        block: "nearest",
        behavior: "smooth"
      });
    });

    this.menu.addEventListener('auroMenu-selectValueFailure', () => {
      this.menu.clearSelection();
    });

    this.menu.addEventListener('auroMenu-selectValueReset', () => {
      this.clear();
    });
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
      if (!this.componentHasFocus) {
        this.validate();
      }
    });

    this.input.addEventListener('input', () => {
      this.dispatchEvent(new CustomEvent('inputValue', { detail: { value: this.inputValue} }));
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
      // if (this.contains(document.activeElement)) {
      //   this.dropdown.show();
      // }
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
    if (event.target === this.inputInBib) {
      this.input.value = this.inputInBib.value;
      return;
    }

    this.inputInBib.value = this.input.value;

    this.menu.matchWord = this.input.value;
    this.optionActive = null;

    if (!this.input.value) {
      this.clear();
    }
    this.handleMenuOptions();

    // Validate only if the value was set programmatically
    if (!this.componentHasFocus) {
      this.validate();
    }

    // // Hide menu if value is empty, otherwise show if there are available suggestions
    // if (this.input.value && this.input.value.length === 0) {
    //   this.hideBib();
    // }

    // Force dropdown bib to hide if input value has no matching suggestions
    if ((!this.availableOptions || this.availableOptions.length === 0) && !this.dropdown.isBibFullscreen) {
      this.hideBib();
    }
  }

  /**
   * Binds all behavior needed to the combobox after rendering.
   * @private
   * @returns {void}
   */
  configureCombobox() {
    this.addEventListener('keydown', async (evt) => {
      if (evt.key === 'Enter') {
        if (this.dropdown.isPopoverVisible && this.optionActive) {
          this.menu.makeSelection();

          await this.updateComplete;

          evt.preventDefault();
          evt.stopPropagation();
          this.setClearBtnFocus();
        } else {
          this.showBib();
        }
      }

      if (evt.key === 'Tab' && this.dropdown.isPopoverVisible) {
        if (this.dropdown.isBibFullscreen) {

          // when focus is on the input, move focus back to close button with Tab key
          if (document.activeElement.shadowRoot.activeElement === this.inputInBib) {
            evt.preventDefault();
            this.dropdown.focus();
          }
        } else {
          if (this.menu.optionActive && this.menu.optionActive.value) {
            this.menu.value = this.menu.optionActive.value;
          }

          setTimeout(() => {
            if (!this.componentHasFocus) {
              this.hideBib();
            }
          }, 0);
        }
      }

      /**
       * Prevent moving the cursor position while navigating the menu options.
       */
      if (evt.key === 'ArrowUp' || evt.key === 'ArrowDown') {
        if (this.availableOptions.length > 0 && !this.dropdown.isPopoverVisible) {
          this.showBib();
        }

        if (this.dropdown.isPopoverVisible) {
          evt.preventDefault();

          // navigate on menu only when the dropdown is open
          if (this.dropdown.isPopoverVisible) {
            const direction = evt.key.replace('Arrow', '').toLowerCase();
            this.menu.navigateOptions(direction);
          }
        }
      }

      if (evt.key === 'Escape') {
        this.hideBib();
      }
    });

    this.addEventListener('focusin', () => {
      this.touched = true;

      this.focus();
    });

    this.addEventListener('auroFormElement-validated', (evt) => {
      this.input.validity = evt.detail.validity;
      this.input.errorMessage = evt.detail.message;
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

  firstUpdated() {
    // Add the tag name as an attribute if it is different than the component name
    this.runtimeUtils.handleComponentTagRename(this, 'auro-combobox');

    this.dropdown = this.shadowRoot.querySelector(this.dropdownTag._$litStatic$);
    this.input = this.dropdown.querySelector(this.inputTag._$litStatic$);

    this.configureInput();
    this.configureDropdown();
    this.configureCombobox();
    this.configureMenu();

    // Set the initial value in auro-menu if defined
    if (this.hasAttribute('value') && this.getAttribute('value').length > 0) {
      this.menu.value = this.value;
    }
  }

  /**
   * Focuses the combobox trigger input.
   * @returns {void}
   */
  focus() {
    // if (!this.componentHasFocus) {
    //   this.input.focus();
    // }
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
    this.menu.value = undefined;
    this.validation.reset(this);
    this.touched = false;
  }

  /**
   * Clears the current value of the combobox.
   * @returns {void}
   */
  clear() {
    this.input.clear();
    if (this.menu.value || this.menu.optionSelected) {
      this.menu.reset();
    }
    this.optionSelected = undefined;
    this.value = undefined;
  }

  /**
   * Validates value.
   * @param {boolean} [force=false] - Whether to force validation.
   */
  validate(force = false) {
    this.validation.validate(this, force);
  }

  async updated(changedProperties) {
    // After the component is ready, send direct value changes to auro-menu.
    if (changedProperties.has('value')) {
      if (this.value && this.value.length > 0) {
        this.hasValue = true;
      } else {
        this.hasValue = false;
      }

      if (this.hasValue && !this.input.value && (!this.menu.availableOptions || this.menu.availableOptions.length === 0)) {
        this.input.value = this.value;
      }

      if (this.value) {
        // If the value got set programmatically make sure we hide the bib
        // when input is not taking the focus (input can be in dropdown.trigger or in bibtemplate)
        if (!this.contains(document.activeElement) && !this.bibtemplate.contains(document.activeElement)) {
          this.hideBib();
        }
      } else {
        this.clear();
      }

      // Sync the input, menu, and optionSelected states
      await this.syncValuesAndStates();

      this.dispatchEvent(new CustomEvent('input', {
        bubbles: true,
        cancelable: false,
        composed: true,
      }));

      // Deprecated, need to be removed.
      this.dispatchEvent(new CustomEvent('auroCombobox-valueSet', {
        bubbles: true,
        cancelable: false,
        composed: true,
      }));
    }

    if (changedProperties.has('availableOptions')) {
      if (this.availableOptions && this.availableOptions.length > 0 && this.componentHasFocus) {
        this.showBib();
      } else if (!this.dropdown.isBibFullscreen) {
        this.hideBib();
      }
    }

    if (changedProperties.has('error')) {
      this.input.setAttribute('error', this.getAttribute('error'));
      this.validate();
    }

    if (changedProperties.has('shape') && this.menu) {
      this.menu.setAttribute('shape', this.layout === 'classic' ? 'box' : this.shape);
    }

    if (changedProperties.has('size') && this.menu) {
      this.menu.setAttribute('size', this.layout !== 'emphasized' ? 'md' : this.size);
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
    if (this.menu) {
      this.menu.updateActiveOption(index);
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

        // Treat only generic menuoptions.
        this.options = this.menu.querySelectorAll('auro-menuoption, [auro-menuoption]');
        this.options.forEach((opt) => {
          if (this.checkmark) {
            opt.removeAttribute('nocheckmark');
          } else {
            opt.setAttribute('nocheckmark', '');
          }
        });

        this.handleMenuOptions();

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
        <div aria-live="polite" class="util_displayHiddenVisually">
          ${this.optionActive && this.availableOptions.length > 0
            ? html`
              ${`${this.optionActive.textContent}, selected, ${this.availableOptions.indexOf(this.optionActive) + 1} of ${this.availableOptions.length}`}
            `
            : undefined
          }
        </div>
        <${this.dropdownTag}
          .fullscreenBreakpoint="${this.fullscreenBreakpoint}"
          .offset="${this.offset}"
          .placement="${this.placement}"
          ?autoPlacement="${this.autoPlacement}"
          ?disabled="${this.disabled}"
          ?error="${this.validity !== undefined && this.validity !== 'valid'}"
          ?noFlip="${this.noFlip}"
          ?onDark="${this.onDark}"
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
              @input="${this.handleInputValueChange}"
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
              ?onDark="${this.onDark}"
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
            <slot name="ariaLabel.bib.close" slot="ariaLabel.close">Close</slot>
            <slot name="bib.fullscreen.headline" slot="header"></slot>
            <${this.inputTag}
              id="inputInBib"
              @input="${this.handleInputValueChange}"
              .a11yControls="${this.dropdownId}"
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
              a11yExpanded="true"
              layout="classic"
              noValidate="true"
              shape="classic"
              simple
              size="sm"
              slot="subheader">
            </${this.inputTag}>
            <slot></slot>
          </${this.bibtemplateTag}>

          <span slot="helpText">
            ${!this.validity || this.validity === 'valid'
              ? html`
                <${this.helpTextTag} class="${classMap(helpTextContentClasses)}" ?onDark="${this.onDark}">
                  <p id="${this.uniqueId}" part="helpText">
                    <slot name="helpText"></slot>
                  </p>
                </${this.helpTextTag}>
              `
              : html`
                <${this.helpTextTag} class="${classMap(errorTextContentClasses)}" error ?onDark="${this.onDark}">
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

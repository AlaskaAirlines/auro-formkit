// Copyright (c) 2022 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

/* eslint-disable max-lines, lit/binding-positions, lit/no-invalid-html */

// If using litElement base class
import { LitElement } from "lit";
import { html } from 'lit/static-html.js';
import { AuroDependencyVersioning } from '@aurodesignsystem/auro-library/scripts/runtime/dependencyTagVersioning.mjs';

import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';
import AuroFormValidation from '@auro-formkit/form-validation';

import { AuroDropdown } from '@aurodesignsystem/auro-dropdown';
import dropdownVersion from './formkit/auro-dropdownVersion.js';

import { AuroInput } from '@aurodesignsystem/auro-input';
import inputVersion from './formkit/auro-inputVersion.js';

// Import touch detection lib
import styleCss from "./styles/style-css.js";

// See https://git.io/JJ6SJ for "How to document your components using JSDoc"
/**
 * @prop {Object} optionSelected - Specifies the current selected option.
 * @prop {String} value - Value selected for the dropdown menu.
 * @prop {Boolean} checkmark - When attribute is present auro-menu will apply checkmarks to selected options.
 * @attr {String} error - When defined, sets persistent validity to `customError` and sets the validation message to the attribute value.
 * @attr {String} validity - Specifies the `validityState` this element is in.
 * @attr {String} setCustomValidity - Sets a custom help text message to display for all validityStates.
 * @attr {String} setCustomValidityCustomError - Custom help text message to display when validity = `customError`.
 * @attr {String} setCustomValidityValueMissing - Custom help text message to display when validity = `valueMissing`.
 * @attr {Boolean} disabled - If set, disables the combobox.
 * @attr {Boolean} noFilter - If set, combobox will not filter menuoptions based in input.
 * @attr {Boolean} noValidate - If set, disables auto-validation on blur.
 * @attr {Boolean} required - Populates the `required` attribute on the input. Used for client-side validation.
 * @attr {Boolean} triggerIcon - If set, the `icon` attribute will be applied to the trigger `auro-input` element.
 * @attr {String} type - Applies the defined value as the type attribute on auro-input.
 * @slot - Default slot for the menu content.
 * @slot label - Defines the content of the label.
 * @slot helpText - Defines the content of the helpText.
 * @event auroCombobox-valueSet - Notifies that the component has a new value set.
 * @event auroFormElement-validated - Notifies that the component value(s) have been validated.
 */

// build the component class
export class AuroCombobox extends LitElement {
  constructor() {
    super();

    this.noFilter = false;
    this.validity = undefined;
    this.value = null;
    this.optionSelected = null;

    this.privateDefaults();

    /**
     * @private
     */
    this.validation = new AuroFormValidation();

    /**
     * @private
     */
    this.runtimeUtils = new AuroLibraryRuntimeUtils();

    /**
     * @private
     */
    this.isHiddenWhileLoading = false;

    /**
     * Generate unique names for dependency components.
     */
    const versioning = new AuroDependencyVersioning();
    this.dropdownTag = versioning.generateTag('auro-dropdown', dropdownVersion, AuroDropdown);
    this.inputTag = versioning.generateTag('auro-input', inputVersion, AuroInput);
  }

  /**
   * @private
   * @returns {void} Internal defaults.
   */
  privateDefaults() {
    this.availableOptions = [];
    this.optionActive = null;
    this.msgSelectionMissing = 'Please select an option.';
  }

  // This function is to define props used within the scope of this component
  // Be sure to review  https://lit-element.polymer-project.org/guide/properties#reflected-attributes
  // to understand how to use reflected attributes with your property settings.
  static get properties() {
    return {
      // ...super.properties,
      error: {
        type: String,
        reflect: true
      },
      setCustomValidity: {
        type: String
      },
      setCustomValidityCustomError: {
        type: String
      },
      setCustomValidityValueMissing: {
        type: String
      },
      validity: {
        type: String,
        reflect: true
      },
      disabled: {
        type: Boolean,
        reflect: true
      },
      noFilter: {
        type: Boolean,
        reflect: true
      },
      optionSelected: { type: Object },
      noValidate: { type: Boolean },
      required: {
        type: Boolean,
        reflect: true
      },
      triggerIcon: {
        type: Boolean,
        reflect: true
      },
      type: {
        type: String,
        reflect: true
      },
      value: {
        type: String
      },
      checkmark: {
        type: Boolean,
        reflect: true
      },

      /**
       * @private
       */
      availableOptions: { type: Array },

      /**
       * @private
       */
      optionActive: { type: Object },

      /**
       * @private
       */
      msgSelectionMissing: { type: String },

      /**
       * @private
       */
      dropdownElementName: { type: String },

      /**
       * @private
       */
      dropdownTag: { type: Object },

      /**
       * @private
       */
      inputElementName: { type: String },

      /**
       * @private
       */
      inputTag: { type: Object }
    };
  }

  static get styles() {
    return [styleCss];
  }

  /**
   * This will register this element with the browser.
   * @param {string} [name="auro-combobox"] - The name of element that you want to register to.
   *
   * @example
   * AuroCombobox.register("custom-combobox") // this will register this element to <custom-combobox/>
   *
   */
  static register(name = "auro-combobox") {
    AuroLibraryRuntimeUtils.prototype.registerComponent(name, AuroCombobox);
  }

  /**
   * Processes hidden state of all menu options and determines if there are any available options not hidden.
   * @private
   * @returns {void}
   */
  handleMenuOptions() {
    this.generateOptionsArray();
    this.availableOptions = [];

    if (this.noFilter) {
      this.availableOptions = [...this.options];
    } else {
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

    const hasFocus = this.contains(document.activeElement);
    if (hasFocus) {
      this.showBib();
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
   * @private
   * @returns {void}
   */
  hideBib() {
    if (this.dropdown && this.dropdown.isPopoverVisible) {
      this.dropdown.hide();
    }
  }

  /**
   * Shows the dropdown bib if there are options to show.
   * @private
   * @returns {void}
   */
  showBib() {
    if (!this.input.value) {
      this.dropdown.hide();
      return;
    }
    if (!this.dropdown.isPopoverVisible && this.input.value && this.input.value.length > 0) {
      if (this.menu.getAttribute('loading') || (this.availableOptions && this.availableOptions.length > 0) || this.noMatchOption !== undefined) { // eslint-disable-line no-extra-parens
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
    this.menuWrapper = this.dropdown.querySelector('.menuWrapper');
    this.menuWrapper.append(this.menu);

    this.dropdown.setAttribute('role', 'combobox');

    this.dropdown.addEventListener('auroDropdown-triggerClick', () => {
      this.showBib();
    });

    if (!this.dropdown.hasAttribute('aria-expanded')) {
      this.dropdown.setAttribute('aria-expanded', this.dropdown.isPopoverVisible);
    }
  }

  /**
   * Binds all behavior needed to the menu after rendering.
   * @private
   * @returns {void}
   */
  configureMenu() {
    this.menu = this.querySelector('auro-menu, [auro-menu]');
    this.menu.addEventListener("auroMenu-loadingChange", (event) => this.handleMenuLoadingChange(event));

    // a racing condition on custom-combobox with custom-menu
    if (!this.menu) {
      setTimeout(() => {
        this.configureMenu();
        this.menuWrapper.append(this.menu);
      }, 0);
      return;
    }

    this.menu.shadowRoot.addEventListener('slotchange', (event) => this.handleSlotChange(event));

    if (this.checkmark) {
      this.menu.removeAttribute('nocheckmark');
    } else {
      this.menu.setAttribute('nocheckmark', '');
    }

    // handle the menu event for an option selection
    this.menu.addEventListener('auroMenu-selectedOption', () => {
      if (this.menu.optionSelected) {
        if (this.optionSelected !== this.menu.optionSelected) {
          this.optionSelected = this.menu.optionSelected;
        }

        if (this.value !== this.optionSelected.value) {
          this.value = this.optionSelected.value;
        }

        if (this.input.value !== this.optionSelected.textContent) {
          this.input.value = this.optionSelected.textContent;
        }

        if (this.menu.matchWord !== this.input.value) {
          this.menu.matchWord = this.input.value;
        }

        this.classList.add('combobox-filled');

        // update the hidden state of options based on newly selected value
        this.handleMenuOptions();

        this.dispatchEvent(new CustomEvent('auroCombobox-valueSet', {
          bubbles: true,
          cancelable: false,
          composed: true,
        }));
      }

      // dropdown bib should hide when making a selection
      this.hideBib();
    });

    this.menu.addEventListener('auroMenu-customEventFired', () => {
      this.hideBib();
    });

    this.menu.addEventListener('auroMenu-activatedOption', (evt) => {
      this.optionActive = evt.detail;
    });

    this.menu.addEventListener('auroMenu-selectValueFailure', () => {
      this.optionSelected = undefined;
    });

    this.menu.addEventListener('auroMenu-selectValueReset', () => {
      this.reset();
    });
  }

  /**
   * Binds all behavior needed to the input after rendering.
   * @private
   * @returns {void}
   */
  configureInput() {
    this.input.addEventListener('keyup', (evt) => {
      if (evt.key.length === 1 || evt.key === 'Backspace' || evt.key === 'Delete') {
        this.showBib();
      }
    });

    /**
     * Validate every time we remove focus from the datepicker.
     */
    this.addEventListener('focusout', () => {
      if (document.activeElement !== this) {
        this.validation.validate(this);
      }

      if (typeof this.value === 'object') {
        this.value = '';
      }
    });

    this.input.addEventListener('auroFormElement-validated', (evt) => {
      this.errorMessage = evt.detail.message;
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
   * @returns {void}
   */
  handleInputValueChange() {
    this.menu.matchWord = this.input.value;
    this.optionActive = null;

    let hasChange = false;

    if (this.value !== this.input.value) {
      this.value = this.input.value;
      hasChange = true;

      this.dispatchEvent(new CustomEvent('auroCombobox-valueSet', {
        bubbles: true,
        cancelable: false,
        composed: true,
      }));
    }

    if (this.value !== this.menu.value) {
      this.menu.value = this.value;
      hasChange = true;
    }

    if (this.optionSelected && this.input.value !== this.optionSelected.textContent) {
      this.optionSelected = undefined;
      hasChange = true;
    }

    if (!hasChange) {
      return;
    }

    this.menu.resetOptionsStates();
    this.handleMenuOptions();

    // validate if the value was set programmatically
    if (document.activeElement !== this) {
      this.validation.validate(this);
    }

    // hide the menu if the value is empty otherwise show if there are available suggestions
    if (this.input.value && this.input.value.length === 0) {
      this.hideBib();
      this.classList.remove('combobox-filled');
    } else if (!this.dropdown.isPopoverVisible && this.availableOptions) {
      const hasFocus = this.contains(document.activeElement);

      // if the focus is within the combobox, then show the bib
      // this will prevent the bib from being shown while loading & presetting the value
      if (hasFocus) {
        this.showBib();
      }

      this.classList.add('combobox-filled');
    }

    // force the dropdown bib to hide if the input value has no matching suggestions
    if (!this.availableOptions || this.availableOptions.length === 0) {
      this.hideBib();
    }
  }

  /**
   * Binds all behavior needed to the combobox after rendering.
   * @private
   * @returns {void}
   */
  configureCombobox() {
    this.addEventListener('keydown', (evt) => {
      if (evt.key === 'Enter') {
        if (this.dropdown.isPopoverVisible && this.optionActive) {
          this.menu.makeSelection();
        } else {
          this.showBib();
        }
      }

      if (evt.key === 'Tab') {
        this.hideBib();
      }

      /**
       * Prevent moving the cursor position while navigating the menu options.
       */
      if (evt.key === 'ArrowUp' || evt.key === 'ArrowDown') {
        if (this.availableOptions.length > 0) {
          this.showBib();
        }

        if (this.dropdown.isPopoverVisible) {
          evt.preventDefault();
        }
      }

      if (this.dropdown.isPopoverVisible) {
        if (evt.key === 'ArrowUp') {
          this.menu.selectNextItem('up');
        }

        if (evt.key === 'ArrowDown') {
          this.menu.selectNextItem('down');
        }
      }
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

    this.dropdown = this.shadowRoot.querySelector(this.dropdownTag._$litStatic$); // eslint-disable-line no-underscore-dangle
    this.input = this.dropdown.querySelector(this.inputTag._$litStatic$); // eslint-disable-line no-underscore-dangle

    this.configureMenu();
    this.configureInput();
    this.configureDropdown();
    this.configureCombobox();

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
    this.input.focus();
  }

  /**
   * Resets component to initial state.
   * @returns {void}
   */
  reset() {
    this.input.reset();
    this.validation.reset(this);
  }

  updated(changedProperties) {
    // After the component is ready, send direct value changes to auro-menu.
    if (changedProperties.has('value')) {
      if (this.value) {
        if (this.optionSelected && this.optionSelected.value === this.value) {
          // If value updates and the previously selected option already matches the new value
          // just update the input value to use the textContent of the optionSelected
          this.input.value = this.optionSelected.textContent;
        } else {
          // Otherwise just enter the value into the input
          this.optionSelected = undefined;
          this.input.value = this.value;

          // If the value got set programmatically make sure we hide the bib
          if (!this.contains(document.activeElement)) {
            this.hideBib();
          }
        }
      } else {
        this.input.value = '';
        this.menu.value = undefined;
      }
    }

    if (changedProperties.has('error')) {
      this.input.setAttribute('error', this.getAttribute('error'));
      this.validation.validate(this);
    }
  }

  /**
   * Watch for slot changes and recalculate the menuoptions.
   * @private
   * @param {Event} event - slotchange event
   * @returns {void}
   */
  handleSlotChange(event) {
    // treat only generic menuoptions
    if (!event.target.name) {
      this.options = this.menu.querySelectorAll('auro-menuoption, [auro-menuoption]');
      this.options.forEach((opt) => {
        if (this.checkmark) {
          opt.removeAttribute('nocheckmark');
        } else {
          opt.setAttribute('nocheckmark', '');
        }
      });

      this.handleMenuOptions();
    }
  }

  // function that renders the HTML and CSS into  the scope of the component
  render() {
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
          for="dropdownMenu"
          fluid
          bordered
          rounded
          matchWidth
          nocheckmark
          ?disabled="${this.disabled}"
          ?error="${this.validity !== undefined && this.validity !== 'valid'}"
          disableEventShow>
          <${this.inputTag}
            slot="trigger"
            bordered
            ?required="${this.required}"
            ?noValidate="${this.noValidate}"
            ?disabled="${this.disabled}"
            ?icon="${this.triggerIcon}"
            setCustomValidity="${this.setCustomValidity}"
            setCustomValidityValueMissing="${this.setCustomValidityValueMissing}"
            setCustomValidityCustomError="${this.setCustomValidityCustomError}"
            .type="${this.type}"
            @input="${this.handleInputValueChange}">
            <slot name="label" slot="label"></slot>
          </${this.inputTag}>
          <div class="menuWrapper">
          </div>
          <span slot="helpText">
          <!-- Help text and error message template -->
            ${!this.validity || this.validity === undefined || this.validity === 'valid'
              ? html`
                <slot name="helpText"></slot>
              ` : html`
                <p role="alert" aria-live="assertive" part="helpText">
                  ${this.errorMessage}
                </p>`
            }
          </span>
        </${this.dropdownTag}>
      </div>
    `;
  }
}

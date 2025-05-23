// Copyright (c) 2022 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

/* eslint-disable max-lines, lit/binding-positions, lit/no-invalid-html */

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

import { AuroElement } from '../../layoutElement/src/auroElement.js';
import {AuroHelpText} from "@aurodesignsystem/auro-helptext";

// See https://git.io/JJ6SJ for "How to document your components using JSDoc"
/**
 * @slot - Default slot for the menu content.
 * @slot bib.fullscreen.headline - Defines the headline to display above menu-options
 * @slot label - Defines the content of the label.
 * @slot helpText - Defines the content of the helpText.
 * @event auroCombobox-valueSet - Notifies that the component has a new value set.
 * @event auroFormElement-validated - Notifies that the component value(s) have been validated.
 */

// build the component class
export class AuroCombobox extends AuroElement {

  constructor() {
    super();

    this.privateDefaults();
  }

  /**
   * @private
   * @returns {void} Internal defaults.
   */
  privateDefaults() {
    this.dropdownOpen = false;
    this.dropdownId = undefined;
    this.onDark = false;

    this.noFilter = false;
    this.validity = undefined;
    this.value = undefined;
    this.optionSelected = undefined;

    this.checkmark = false;
    this.disabled = false;
    this.noValidate = false;
    this.required = false;
    this.triggerIcon = false;

    this.availableOptions = [];
    this.optionActive = null;
    this.msgSelectionMissing = 'Please select an option.';

    this.fullscreenBreakpoint = 'sm';
    this.largeFullscreenHeadline = false;

    this.validation = new AuroFormValidation();

    this.runtimeUtils = new AuroLibraryRuntimeUtils();

    this.isHiddenWhileLoading = false;

    // Error message
    this.errorMessage = null;

    // Layout Config
    this.layout = 'classic';
    this.shape = 'rounded';
    this.size = 'xl';

    // floaterConfig
    this.placement = 'bottom-start';
    this.offset = 0;
    this.noFlip = false;
    this.autoPlacement = false;

    const versioning = new AuroDependencyVersioning();

    this.dropdownTag = versioning.generateTag('auro-formkit-combobox-dropdown', dropdownVersion, AuroDropdown);
    this.bibtemplateTag = versioning.generateTag('auro-formkit-combobox-bibtemplate', bibTemplateVersion, AuroBibtemplate);
    this.inputTag = versioning.generateTag('auro-formkit-combobox-input', inputVersion, AuroInput);
    this.helpTextTag = versioning.generateTag('auro-formkit-input-helptext', '1.0.0', AuroHelpText);
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
       * When attribute is present auro-menu will apply checkmarks to selected options.
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
       * When defined, sets persistent validity to `customError` and sets the validation message to the attribute value.
       */
      error: {
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
       * Specifies the `validityState` this element is in.
       */
      validity: {
        type: String,
        reflect: true
      },

      /**
       * Value selected for the dropdown menu.
       * @type {string}
       */
      value: {
        type: Object
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
      css`${styleEmphasizedCss}`
    ];
  }

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
   * Processes hidden state of all menu options and determines if there are any available options not hidden.
   * @private
   * @returns {void}
   */
  handleMenuOptions() {
    // Reset menu matchword UI
    this.menu.updateItemsState(new Map([
      [
        'matchWord',
        true
      ]
    ]));

    this.generateOptionsArray();
    this.availableOptions = [];

    if (this.menu.optionSelected) {
      // Get first option since combobox is single-select
      const selected = this.menu.optionSelected;

      if (!this.optionSelected || this.optionSelected !== selected) {
        this.optionSelected = selected;
      }

      if (!this.value || this.value !== selected.value) {
        this.value = selected.value;

        this.menu.value = this.value;
      }

      if (this.input.value !== selected.textContent) {
        this.input.value = selected.textContent;
      }

      if (this.menu.matchWord !== this.input.value) {
        this.menu.matchWord = this.input.value;
      }

      this.classList.add('combobox-filled');
    }

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

    // Listen for the ID to be added to the dropdown so we can capture it and use it for accessibility.
    this.dropdown.addEventListener('auroDropdown-idAdded', (event) => {
      this.dropdownId = event.detail.id;
    });

    // Listen for the dropdown to be shown or hidden
    this.dropdown.addEventListener("auroDropdown-toggled", (ev) => {
      this.dropdownOpen = ev.detail.expanded;

      // wait a frame in case the bib gets hide immediately after showing because there is no value
      setTimeout(this.transportInput);
    });

    this.dropdown.addEventListener('auroDropdown-triggerClick', () => {
      this.showBib();
    });

    // this.dropdown.addEventListener('auroDropdown-show', () => {
    this.menuWrapper = this.dropdown.querySelector('.menuWrapper');
    if (this.menu) {
      this.menuWrapper.append(this.menu);
    }

    // setting up bibtemplate
    this.bibtemplate = this.dropdown.querySelector(this.bibtemplateTag._$litStatic$); // eslint-disable-line no-underscore-dangle
    this.bibtemplate.append(this.menuWrapper);

    // Exposes the CSS parts from the bibtemplate for styling
    this.bibtemplate.exposeCssParts();

    this.hideBib = this.hideBib.bind(this);
    this.bibtemplate.addEventListener('close-click', this.hideBib);

    this.transportInput = this.transportInput.bind(this);

    this.dropdown.addEventListener('auroDropdown-strategy-change', () => {
      // event when the strategy(bib mode) is changed between fullscreen and floating
      setTimeout(this.transportInput);
    });
  }

  /**
   * Binds all behavior needed to the menu after rendering.
   * @private
   * @returns {void}
   */
  configureMenu() {
    this.menu = this.querySelector('auro-menu, [auro-menu]');

    // a racing condition on custom-combobox with custom-menu
    if (!this.menu) {
      setTimeout(() => {
        this.configureMenu();
        this.menuWrapper.append(this.menu);
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
    this.menu.addEventListener('auroMenu-selectedOption', () => {
      if (this.menu.optionSelected) {
        const selected = this.menu.optionSelected;

        if (!this.optionSelected || this.optionSelected !== selected) {
          this.optionSelected = selected;
        }

        if (!this.value || this.value !== this.optionSelected.value) {
          this.value = this.optionSelected.value;
          this.menu.value = this.value;
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
      this.reset();
    });
  }

  /**
   * Dispatches input's keyboard events from host
   * This allows key events from the input to be handled by the parent.
   * @private
   * @param {KeyboardEvent} event - The keyboard event.
   */
  bubbleUpInputEvent(event) {
    // Do not need to bubble events if the input is not in bib.
    if (event.currentTarget.parentNode !== this.dropdown) {
      // prevents browsers to move cursor in input element.
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
      }
      const dupEvent = new event.constructor(event.type, event);
      this.dispatchEvent(dupEvent);
    }
  }

  /**
   * Binds all behavior needed to the input after rendering.
   * @private
   * @returns {void}
   */
  configureInput() {
    // When input is in bibtemplate, make the event to be fired at combobox element
    this.bubbleUpInputEvent = this.bubbleUpInputEvent.bind(this);

    const events = [
      'input',
      'keydown',
      'keyup'
    ];
    events.forEach((eventType) => {
      this.input.addEventListener(eventType, this.bubbleUpInputEvent);
    });

    this.addEventListener('keyup', (evt) => {
      if (evt.key.length === 1 || evt.key === 'Backspace' || evt.key === 'Delete') {
        if (!this.dropdown.isPopoverVisible) {
          this.showBib();
        }
      }
    });

    /**
     * Validate every time we remove focus from the datepicker.
     */
    this.addEventListener('focusout', () => {
      if (document.activeElement !== this) {
        this.validate();
      }
    });

    // Handle validation messages from auroFormElement-validated event
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
   * When the dropdown is visible in fullscreen mode, the input is moved to the subheader slot of bibtemplate.
   * Otherwise, it's moved back to the trigger slot.
   * @private
   * @returns {void}
   */
  transportInput() {
    if (!this.input) {
      return;
    }

    const inputHelpText = this.input.shadowRoot.querySelector('auro-helptext, [auro-helptext]');
    const inputAlertIcon = this.input.shadowRoot.querySelector(".alertNotification");

    if (this.dropdown.isPopoverVisible && this.dropdown.isBibFullscreen) {
      if (this.input.parentNode === this.dropdown) {
        // keep the trigger size the same even after input gets removed
        const parentSize = window.getComputedStyle(this.dropdown.trigger);
        this.dropdown.trigger.style.height = parentSize.height;

        // input will not have border on bib
        this.input.removeAttribute('bordered');
        this.input.setAttribute('borderless', true);
        this.input.setAttribute('slot', 'subheader');

        // set display of helpText and alert icon programmatically
        // because ::slotted and ::part do not work together
        inputHelpText.style.display = 'none';
        if (inputAlertIcon) {
          inputAlertIcon.style.display = 'none';
        }

        this.bibtemplate.append(this.input);
        this.input.focus();
      }
    } else if (this.input.parentNode !== this.dropdown) {
      this.input.setAttribute('bordered', true);
      this.input.removeAttribute('borderless');
      this.input.setAttribute('slot', 'trigger');

      // reset display of helpText and alert icon to be visible
      inputHelpText.style.display = '';
      if (inputAlertIcon) {
        inputAlertIcon.style.display = '';
      }

      this.dropdown.append(this.input);
      this.input.focus();
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

    if (!this.value || this.value !== this.input.value) {
      this.menu.value = this.input.value;
      this.value = this.menu.value;
      hasChange = true;
      this.dispatchEvent(new CustomEvent('auroCombobox-valueSet', {
        bubbles: true,
        cancelable: false,
        composed: true,
      }));
    }

    if (this.optionSelected && this.input.value !== this.optionSelected.textContent) {
      this.optionSelected = undefined;
      hasChange = true;
    }

    if (!hasChange) {
      return;
    }

    this.menu.clearSelection();
    this.handleMenuOptions();

    // Validate only if the value was set programmatically
    if (document.activeElement !== this) {
      this.validate();
    }

    // Hide menu if value is empty, otherwise show if there are available suggestions
    if (this.input.value && this.input.value.length === 0) {
      this.hideBib();
      this.classList.remove('combobox-filled');
    } else if (!this.dropdown.isPopoverVisible && this.availableOptions) {
      this.classList.add('combobox-filled');
    }

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

        if (this.dropdown.isPopoverVisible && this.dropdown.isBibFullscreen) {
          // if bib is open in fullscreen, just close the bib and do not move the focus to the next focasable element
          evt.preventDefault();
        }
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
          this.menu.navigateOptions(evt.key.replace('Arrow', '').toLowerCase());
        }
      }
    });

    this.addEventListener('focusin', () => {
      this.focus();
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
    this.menu.value = undefined;
  }

  /**
   * Validates value.
   * @param {boolean} [force=false] - Whether to force validation.
   */
  validate(force = false) {
    this.validation.validate(this, force);
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

          const inputValue = this.value;
          this.input.value = inputValue;

          // Update the menu value and matchWord
          this.menu.matchWord = inputValue;
          this.handleMenuOptions();

          // If the value got set programmatically make sure we hide the bib
          // when input is not taking the focus (input can be in dropdown.trigger or in bibtemplate)
          if (!this.contains(document.activeElement) && !this.bibtemplate.contains(document.activeElement)) {
            this.hideBib();
          }
        }
      } else {
        this.reset();
      }
    }

    if (changedProperties.has('error')) {
      this.input.setAttribute('error', this.getAttribute('error'));
      this.validate();
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
   * Watch for slot changes and recalculate the menuoptions.
   * @private
   * @param {Event} event - `slotchange` event.
   * @returns {void}
   */
  handleSlotChange(event) {
    switch (event.target.name) {
      case '':
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
      case 'label':
        // Programmatically inject as the slot cannot be carried over to bibtemplate.
        // It's because the bib is/will be separated from dropdown to body.
        this.transportAssignedNodes(event.target, this.input, 'label');
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
        <div class="util_displayHiddenVisually" aria-hidden="true">
          <slot name="label" @slotchange="${this.handleSlotChange}"></slot>
          <slot name="bib.fullscreen.headline" @slotchange="${this.handleSlotChange}"></slot>
        </div>
        <${this.dropdownTag}
          ?autoPlacement="${this.autoPlacement}"
          ?disabled="${this.disabled}"
          ?error="${this.validity !== undefined && this.validity !== 'valid'}"
          ?noFlip="${this.noFlip}"
          ?onDark="${this.onDark}"
          .fullscreenBreakpoint="${this.fullscreenBreakpoint}"
          .offset="${this.offset}"
          .placement="${this.placement}"
          bordered
          disableEventShow
          fluid
          for="dropdownMenu"
          layout="${this.layout}"
          matchWidth
          nocheckmark
          rounded
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
            ?onDark="${this.onDark}"
            ?required="${this.required}"
            ?noValidate="${this.noValidate}"
            ?disabled="${this.disabled}"
            ?icon="${this.triggerIcon}"
            a11yRole="combobox"
            bordered
            id="${this.id}"
            layout="${this.layout}"
            setCustomValidity="${this.setCustomValidity}"
            setCustomValidityValueMissing="${this.setCustomValidityValueMissing}"
            setCustomValidityCustomError="${this.setCustomValidityCustomError}"
            shape="${this.shape}"
            size="${this.size}"
            slot="trigger">
          </${this.inputTag}>

          <div class="menuWrapper"></div>

          <${this.bibtemplateTag} ?large="${this.largeFullscreenHeadline}">
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

// Copyright (c) 2021 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

/* eslint-disable prefer-named-capture-group, max-lines, no-underscore-dangle, lit/binding-positions, lit/no-invalid-html */

// If using litElement base class
import { LitElement } from "lit";
import { html } from 'lit/static-html.js';

import AuroFormValidation from '@auro-formkit/form-validation';
import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';

import { AuroDependencyVersioning } from '@aurodesignsystem/auro-library/scripts/runtime/dependencyTagVersioning.mjs';

import { AuroDropdown } from '@auro-formkit/auro-dropdown';
import dropdownVersion from './formkit/auro-dropdownVersion.js';

import styleCss from "./styles/style-css.js";
import colorCss from "./styles/color-css.js";
import tokensCss from "./styles/tokens-css.js";

// See https://git.io/JJ6SJ for "How to document your components using JSDoc"
/**
 * The auro-select element is a wrapper for auro-dropdown and auro-menu to create a dropdown menu control.
 *
 * @attr {String} validity - Specifies the `validityState` this element is in.
 * @attr {String} setCustomValidity - Sets a custom help text message to display for all validityStates.
 * @attr {String} setCustomValidityCustomError - Custom help text message to display when validity = `customError`.
 * @attr {String} setCustomValidityValueMissing - Custom help text message to display when validity = `valueMissing`.
 * @attr {String} error - When defined, sets persistent validity to `customError` and sets `setCustomValidity` = attribute value.
 * @attr {Boolean} noValidate - If set, disables auto-validation on blur.
 * @attr {Boolean} required - Populates the `required` attribute on the element. Used for client-side validation.
 * @attr {Boolean} flexMenuWidth - If set, makes dropdown bib width match the size of the content, rather than the width of the trigger.
 * @prop {String} placeholder - Define placeholder text to display before a value is manually selected.
 * @prop {String} value - Value selected for the component.
 * @prop {Boolean} disabled - When attribute is present element shows disabled state.
 * @prop {Boolean} noCheckmark - When true, checkmark on selected option will no longer be present.
 * @attr {Object} optionSelected - Specifies the current selected menuOption.
 * @slot - Default slot for the menu content.
 * @slot label - Defines the content of the label.
 * @slot helpText - Defines the content of the helpText.
 * @event auroSelect-valueSet - Notifies that the component has a new value set.
 * @event auroFormElement-validated - Notifies that the `validity` and `errorMessage` values have changed.
 * @csspart helpText - Apply CSS to the help text.
 */

// build the component class
export class AuroSelect extends LitElement {
  constructor() {
    super();

    this.placeholder = 'Please select option';
    this.optionSelected = undefined;
    this.validity = undefined;

    const idLength = 36;
    const idSubstrEnd = 8;
    const idSubstrStart = 2;

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
    this.dropdownTag = versioning.generateTag('auro-dropdown', dropdownVersion, AuroDropdown);
  }

  /**
   * @private
   * @returns {void} Internal defaults.
   */
  privateDefaults() {
    this.options = [];
    this.optionActive = null;
  }

  // This function is to define props used within the scope of this component
  // Be sure to review  https://lit-element.polymer-project.org/guide/properties#reflected-attributes
  // to understand how to use reflected attributes with your property settings.
  static get properties() {
    return {
      // ...super.properties,
      optionSelected: {
        type: Object
      },
      value: {
        type: String,
        reflect: true
      },
      noValidate: {
        type: Boolean,
        reflect: true
      },
      required: {
        type: Boolean,
        reflect: true
      },
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
      noCheckmark: {
        type: Boolean,
        reflect: true
      },
      flexMenuWidth: {
        type: Boolean,
        reflect: true
      },
      placeholder: { type: String },

      /**
       * @private
       */
      options: { type: Array },

      /**
       * @private
       */
      optionActive: { type: Object },
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
   * Binds all behavior needed to the dropdown after rendering.
   * @private
   * @returns {void}
   */
  configureDropdown() {
    this.dropdown = this.shadowRoot.querySelector(this.dropdownTag._$litStatic$);
    this.menuWrapper = this.dropdown.querySelector('.menuWrapper');

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
   * Updates the displayed value in an Auro dropdown component based on the provided option.
   * @param {string|HTMLElement} option - The option to display. If a string, a new span element with the value string is created. If an HTMLElement, the selected option is cloned and non-styling attributes are removed.
   * @private
   * @returns {void}
   */
  updateDisplayedValue(option) {
    const triggerContentEl = this.dropdown.querySelector('#triggerFocus');

    // remove all existing rendered value(s)
    triggerContentEl.querySelectorAll('auro-menuoption, [valuestr], [auro-menuoption]').forEach((elm) => {
      elm.remove();
    });

    if (typeof option === 'string' && option !== this.placeholder) {
      // create a new span element with the value string
      const valueElem = document.createElement('span');
      valueElem.setAttribute('valuestr', true);
      valueElem.textContent = option;

      // append the new element into the trigger content
      triggerContentEl.appendChild(valueElem);
    } else if (typeof option === 'object') {
      // clone the selected option and remove attributes that style it
      const clone = option.cloneNode(true);
      clone.removeAttribute('selected');
      clone.removeAttribute('class');

      // insert the non-styled clone into the trigger
      triggerContentEl.appendChild(clone);
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

    this.menu.setAttribute('aria-hidden', 'true');

    this.generateOptionsArray();

    this.addEventListener('auroMenu-activatedOption', (evt) => {
      this.optionActive = evt.detail;
    });

    this.menu.addEventListener('selectedOption', () => {
      this.optionSelected = this.menu.optionSelected;
      this.value = this.optionSelected.value;

      this.updateDisplayedValue(this.optionSelected);

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
      this.menu.optionSelected = undefined;
      this.optionSelected = this.menu.optionSelected;

      this.validity = 'badInput';

      // Capitalizes the first letter of each word in this.value string
      const valueStr = this.value.replace(/(^\w{1})|(\s+\w{1})/gu, (letter) => letter.toUpperCase());

      // Pass the new string to the trigger content
      this.updateDisplayedValue(valueStr);
    });

    this.menu.addEventListener('auroMenu-selectValueReset', () => {
      // set the trigger content back to the placeholder
      this.updateDisplayedValue(this.placeholder);

      this.optionSelected = undefined;
      this.value = undefined;

      this.validation.validate(this);
    });
  }

  /**
   * Binds all behavior needed to the component after rendering.
   * @private
   * @returns {void}
   */
  configureSelect() {
    // inject menu into menuWrapper
    this.menuWrapper.append(this.menu);

    this.addEventListener('keydown', (evt) => {
      if (evt.key === 'ArrowUp') {
        evt.preventDefault();

        this.dropdown.show();

        if (this.dropdown.isPopoverVisible) {
          this.menu.selectNextItem('up');
        }
      }

      if (evt.key === 'ArrowDown') {
        evt.preventDefault();

        this.dropdown.show();

        if (this.dropdown.isPopoverVisible) {
          this.menu.selectNextItem('down');
        }
      }

      if (evt.key === 'Enter') {
        if (!this.dropdown.isPopoverVisible) {
          evt.preventDefault();
          this.menu.makeSelection();
        }
      }

      if (evt.key === 'Tab') {
        this.dropdown.hide();
      }
    });

    this.addEventListener('focusin', this.handleFocusin);

    this.addEventListener('blur', () => {
      this.validation.validate(this);
    });

    this.labelForSr();
  }

  /**
   * Function to support @focusin event.
   * @private
   * @return {void}
   */
  handleFocusin() {

    /**
     * The input is considered to be in it's initial state based on
     * if this.value === undefined. The first time we interact with the
     * input manually, by applying focusin, we need to flag the
     * input as no longer in the initial state.
     */
    if (this.value === undefined) {
      this.value = '';
      this.removeEventListener('focusin', this.handleFocusin);
    }
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

    this.configureMenu();
    this.configureDropdown();
    this.configureSelect();

    // Set the initial value in auro-menu if defined
    if (this.hasAttribute('value') && this.getAttribute('value').length > 0) {
      this.menu.value = this.value;
    }
  }

  updated(changedProperties) {
    // After the component is ready, send direct value changes to auro-menu.
    if (changedProperties.has('value')) {
      if (this.value) {
        this.menu.value = this.value;
      } else {
        this.menu.value = undefined;
      }

      this.validation.validate(this);

      this.dispatchEvent(new CustomEvent('auroSelect-valueSet', {
        bubbles: true,
        cancelable: false,
        composed: true,
      }));
    }

    if (changedProperties.has('error')) {
      this.validation.validate(this, true);
    }
  }

  /**
   * Handles reading of auro-select by screen readers.
   * @private
   * @returns {void}
   */
  labelForSr() {
    const placeholderLabel = document.createElement("div");
    const textId = "label";

    placeholderLabel.setAttribute("id", textId);
    placeholderLabel.setAttribute("aria-live", "polite");

    const styles = {
      position: 'absolute',
      overflow: 'hidden',
      clipPath: 'inset(1px, 1px, 1px, 1px)',
      width: '1px',
      height: '1px',
      padding: '0',
      border: '0'
    };

    Object.assign(placeholderLabel.style, styles);

    this.addEventListener('focus', () => {
      document.body.appendChild(placeholderLabel);

      if (!this.optionSelected) {
        document.getElementById(textId).innerHTML = this.placeholder;
      } else {
        document.getElementById(textId).innerHTML = `${this.optionSelected.innerText}, ${this.placeholder}`;
      }
    });

    this.addEventListener('blur', () => {
      if (document.contains(placeholderLabel)) {
        document.body.removeChild(placeholderLabel);
      }
    });
  }

  // When using auroElement, use the following attribute and function when hiding content from screen readers.
  // aria-hidden="${this.hideAudible(this.hiddenAudible)}"

  // function that renders the HTML and CSS into  the scope of the component
  render() {
    return html`
      <div class="outerWrapper">
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
        <${this.dropdownTag}
          for="selectmenu"
          ?error="${this.validity !== undefined && this.validity !== 'valid'}"
          common
          ?matchWidth="${!this.flexMenuWidth}"
          chevron
          part="dropdown">
          <span slot="trigger" aria-haspopup="true" id="triggerFocus">
            ${this.value ? this.displayValue : html`<span class="placeholder">${this.placeholder}</span>`}
          </span>
          <div class="menuWrapper">
          </div>
          <slot name="label" slot="label"></slot>
          <span slot="helpText">
            ${!this.validity || this.validity === undefined || this.validity === 'valid'
              ? html`
                <p class="selectElement-helpText" id="${this.uniqueId}" part="helpText">
                  <slot name="helpText"></slot>
                </p>`
              : html`
                <p class="selectElement-helpText" id="${this.uniqueId}" role="alert" aria-live="assertive" part="helpText">
                  ${this.setCustomValidity}
                </p>`
            }
          </span>
        </${this.dropdownTag}>
        <!-- Help text and error message template -->
      </div>
    `;
  }
}

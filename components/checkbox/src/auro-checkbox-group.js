// Copyright (c) 2020 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

/* eslint-disable max-lines, lit/binding-positions, lit/no-invalid-html */

import { LitElement } from "lit";
import { html } from 'lit/static-html.js';
import { classMap } from 'lit/directives/class-map.js';

import AuroFormValidation from '@auro-formkit/form-validation';
import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';
import { AuroDependencyVersioning } from '@aurodesignsystem/auro-library/scripts/runtime/dependencyTagVersioning.mjs';

// Import the processed CSS file into the scope of the component
import styleCss from "./styles/auro-checkbox-group-css.js";
import colorCss from "./styles/colorGroup-css.js";
import tokensCss from "./styles/tokens-css.js";

import { AuroHelpText } from '@aurodesignsystem/auro-helptext';
import helpTextVersion from './helptextVersion.js';

/**
 * The auro-checkbox-group element is a wrapper for auro-checkbox element.
 *
 * @slot {HTMLSlotElement} legend - Allows for the legend to be overridden.
 * @slot {HTMLSlotElement} optionalLabel - Allows for the optional label to be overridden.
 * @slot {HTMLSlotElement} helpText - Allows for the helper text to be overridden.
 * @event auroFormElement-validated - Notifies that the `validity` and `errorMessage` values have changed.
 */

export class AuroCheckboxGroup extends LitElement {
  constructor() {
    super();

    this.validity = undefined;
    this.disabled = undefined;
    this.required = false;
    this.horizontal = false;
    this.onDark = false;

    /**
     * @private
     */
    this.value = undefined;

    /**
     * @private
     */
    this.index = 0;

    /**
     * @private
     */
    this.maxNumber = 3;

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
    this.helpTextTag = versioning.generateTag('auro-formkit-checkbox-helptext', helpTextVersion, AuroHelpText);
  }

  static get styles() {
    return [
      styleCss,
      colorCss,
      tokensCss
    ];
  }

  static get properties() {
    return {

      /**
       * If set, disables the checkbox group.
       */
      disabled: {
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
       * If set, checkboxes will be aligned horizontally.
       */
      horizontal: {
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
       * Sets onDark styles for component.
       */
      onDark: {
        type: Boolean,
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
      }
    };
  }

  /**
   * This will register this element with the browser.
   * @param {string} [name="auro-checkbox-group"] - The name of element that you want to register to.
   *
   * @example
   * AuroCheckboxGroup.register("custom-checkbox-group") // this will register this element to <custom-checkbox-group/>
   *
   */
  static register(name = "auro-checkbox-group") {
    AuroLibraryRuntimeUtils.prototype.registerComponent(name, AuroCheckboxGroup);
  }

  connectedCallback() {
    super.connectedCallback();
    this.handleItems();
  }

  /**
   * Helper method to handle checkbox value changing.
   * @private
   * @param {String} value - The value of the checkbox.
   * @param {Boolean} selected - The checked state of the checkbox.
   * @returns {void}
   */
  handleValueUpdate(value, selected) {
    if (selected) {
      // add if it isn't already in the value list
      if (!this.value.includes(value)) {
        this.value.push(value);
      }
    } else if (this.value.indexOf(value) > -1) { // eslint-disable-line no-magic-numbers
      // remove if it is in the value list
      const index = this.value.indexOf(value);

      this.value.splice(index, 1);
    }

    this.dispatchEvent(new CustomEvent('input', {
      bubbles: true,
      cancelable: false,
      composed: true,
    }));

    this.validate(true);
  }

  firstUpdated() {
    // Add the tag name as an attribute if it is different than the component name
    this.runtimeUtils.handleComponentTagRename(this, 'auro-checkbox-group');

    // must declare this function as a variable to correctly pass the reference to the removeEventListener
    const checkFocusWithin = function(evt) {
      if (document.auroCheckboxGroupActive && !document.auroCheckboxGroupActive.contains(evt.target)) {
        // if focus has left the group, cleanup and validate
        document.auroCheckboxGroupActive.focusWithin = false;
        window.removeEventListener('focusin', checkFocusWithin);
        document.removeEventListener('click', checkFocusWithin);
        // execute the validation
        document.auroCheckboxGroupActive.validation.validate(document.auroCheckboxGroupActive);
      }
    };

    this.addEventListener('auroCheckbox-focusin', () => {
      if (!this.value) {
        this.value = [];
      }

      // handle click outside the group
      if (!this.focusWithin) {
        document.addEventListener('click', checkFocusWithin);
      }

      this.focusWithin = true;
    });

    this.addEventListener('auroCheckbox-focusout', () => {
      document.auroCheckboxGroupActive = this;

      // Only add the focusWithin check event listener once as you move focus through the options
      if (this.focusWithin) {
        window.addEventListener('focusin', checkFocusWithin);
      } else {
        this.focusWithin = true;
      }
    });

    this.addEventListener('auroCheckbox-input', (evt) => {
      this.handleValueUpdate(evt.target.value, evt.target.checked);
    });
  }

  /**
   * Helper method that handles the state of preselected checkboxes.
   * @private
   * @returns {void}
   */
  handlePreselectedItems() {
    let preSelectedValues = false;

    this.checkboxes.forEach((item) => {
      if (item.hasAttribute('checked') && this.value === undefined) {
        preSelectedValues = true;
      }
    });

    if (preSelectedValues) {
      if (!this.value) {
        this.value = [];
      }

      this.checkboxes.forEach((item) => {
        this.handleValueUpdate(item.getAttribute('value'), Boolean(item.hasAttribute('checked')));
      });
    }
  }

  /**
   * Helper method that handles the state of checkboxes.
   * @private
   * @returns {void}
   */
  handleItems() {
    const groupTagName = this.tagName.toLowerCase();
    const checkboxTagName = groupTagName.substring(0, groupTagName.indexOf('-group'));

    this.checkboxes = Array.from(this.querySelectorAll(checkboxTagName));

    this.handlePreselectedItems();

    this.validate();
  }

  /**
   * Resets component to initial state.
   * @returns {void}
   */
  reset() {
    this.checkboxes.forEach((checkbox) => {
      checkbox.reset();
    });

    this.validation.reset(this);
  }

  /**
   * LitElement lifecycle method. Called after the DOM has been updated.
   * @param {Map<string, any>} changedProperties - Keys are the names of changed properties, values are the corresponding previous values.
   * @returns {void}
   */
  updated(changedProperties) {
    if (changedProperties.has('disabled')) {
      this.checkboxes.forEach((el) => {
        if (this.disabled) {
          el.setAttribute('disabled', true);
        } else {
          el.removeAttribute('disabled');
        }
      });
    }

    if (changedProperties.has('validity')) {
      this.checkboxes.forEach((el) => {
        if (this.validity && this.validity !== 'valid') {
          el.setAttribute('error', true);
        } else {
          el.removeAttribute('error');
        }
      });
    }

    if (changedProperties.has('required')) {
      if (this.required) {
        this.setAttribute('aria-required', true);
      } else {
        this.removeAttribute('aria-required');
      }
    }

    if (changedProperties.has('onDark')) {
      this.checkboxes.forEach((el) => {
        el.onDark = this.onDark;
      });
    }

    if (changedProperties.has('error')) {
      if (this.error) {
        this.setAttribute('aria-invalid', true);
      } else {
        this.removeAttribute('aria-invalid');
      }

      this.validate(true);
    }
  }

  /**
   * Validates value.
   * @param {boolean} [force=false] - Whether to force validation.
   */
  validate(force = false) {
    this.validation.validate(this, force);
  }

  render() {
    const groupClasses = {
      'displayFlex': this.horizontal && this.checkboxes.length <= this.maxNumber
    };

    return html`
      <fieldset class="${classMap(groupClasses)}">
        ${this.required
          ? html`<legend><slot name="legend"></slot></legend>`
          : html`<legend><slot name="legend"></slot> (optional)</legend>`
        }
        <slot @slotchange=${this.handleItems}></slot>
      </fieldset>

      ${!this.validity || this.validity === undefined || this.validity === 'valid'
        ? html`
          <${this.helpTextTag} large part="helpText">
            <slot name="helpText"></slot>
          </${this.helpTextTag}>`
        : html`
          <${this.helpTextTag} error large role="alert" aria-live="assertive" part="helpText">
            ${this.errorMessage}
          </${this.helpTextTag}>`
      }
    `;
  }
}

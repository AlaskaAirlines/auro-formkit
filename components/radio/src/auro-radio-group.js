// Copyright (c) Alaska Air. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.
// ---------------------------------------------------------------------

import { LitElement } from "lit";
import { html } from "lit/static-html.js";
import { classMap } from 'lit/directives/class-map.js';

// Import touch detection lib
import 'focus-visible/dist/focus-visible.min.js';

// Import the processed CSS file into the scope of the component
import styleCss from "./styles/auro-radio-group-css.js";
import colorCss from './styles/groupColor-css.js';
import tokenCss from './styles/tokens-css.js';

// Import formvalidation class
import AuroFormValidation from '@auro-formkit/form-validation';

// Import library runtime utils
import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';
import { AuroDependencyVersioning } from '@aurodesignsystem/auro-library/scripts/runtime/dependencyTagVersioning.mjs';

import { AuroHelpText } from '@aurodesignsystem/auro-helptext';
import helpTextVersion from './helptextVersion.js';

/* eslint no-magic-numbers: ["error", { "ignore": [0, 1, -1] }] */
/* eslint-disable max-lines, lit/binding-positions, lit/no-invalid-html */

/**
 * @attr {String} validity - Specifies the `validityState` this element is in.
 * @attr {String} setCustomValidity - Sets a custom help text message to display for all validityStates.
 * @attr {String} setCustomValidityCustomError - Custom help text message to display when validity = `customError`.
 * @attr {String} setCustomValidityValueMissing - Custom help text message to display when validity = `valueMissing`.
 * @attr {String} error - When defined, sets persistent validity to `customError` and sets `setCustomValidity` = attribute value.
 * @attr {Boolean} noValidate - If set, disables auto-validation on blur.
 * @attr {Boolean} onDark - Applies dark mode styles to the component.
 * @attr {Boolean} required - Populates the `required` attribute on the element. Used for client-side validation.
 * @attr {Object} optionSelected - Specifies the current selected radio button.
 * @csspart radio-group - Apply css to the fieldset element in the shadow DOM
 * @slot {HTMLSlotElement} legend - Allows for the legend to be overridden.
 * @slot {HTMLSlotElement} optionalLabel - Allows overriding the optional display text "(optional)", which appears next to the label.
 * @slot {HTMLSlotElement} helpText - Allows for the helper text to be overridden.
 * @event auroFormElement-validated - Notifies that the element has been validated.
 * @event input - Notifies every time the value prop of the element is changed.
 */

export class AuroRadioGroup extends LitElement {
  constructor() {
    super();
    this.disabled = false;
    this.horizontal = false;
    this.required = false;
    this.validity = undefined;
    this.value = undefined;
    this.optionSelected = undefined;
    this.onDark = false;
    this.touched = false;

    /**
     * @private
     */
    this.validation = new AuroFormValidation();

    /**
     * @private
     */
    this.index = 0;

    /**
     * @private
     */
    this.max = 3;

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
    this.helpTextTag = versioning.generateTag('auro-formkit-radio-helptext', helpTextVersion, AuroHelpText);
  }

  static get styles() {
    return [
      styleCss,
      colorCss,
      tokenCss
    ];
  }

  static get properties() {
    return {
      disabled:   {
        type: Boolean,
        reflect: true
      },
      horizontal: { type: Boolean },
      error:      {
        type: String,
        reflect: true
      },
      value: {
        type: String
      },
      noValidate: {
        type: Boolean,
        reflect: true
      },
      onDark: {
        type: Boolean,
        reflect: true
      },
      required: {
        type: Boolean,
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
      optionSelected: {
        type: Object
      },

      /**
       * Indicates whether the radio group is in a dirty state (has been interacted with).
       * @type {boolean}
       * @default false
       * @private
       */
      touched: {
        type: Boolean,
        reflect: true,
        attribute: false
      }
    };
  }

  /**
   * This will register this element with the browser.
   * @param {string} [name="auro-radio-group"] - The name of element that you want to register to.
   *
   * @example
   * AuroRadioGroup.register("custom-radio-group") // This will register this element to <custom-radio-group/>
   *
   */
  static register(name = "auro-radio-group") {
    AuroLibraryRuntimeUtils.prototype.registerComponent(name, AuroRadioGroup);
  }

  connectedCallback() {
    super.connectedCallback();
    this.handleItems();
    this.addEventListener('toggleSelected', this.handleToggleSelected);
    this.addEventListener('keydown', this.handleKeyDown);
    this.addEventListener('resetRadio', this.resetRadio);
    this.addEventListener('auroRadio-blur', this.handleRadioBlur);
    this.addEventListener('auroRadio-selected', this.handleSelection);
  }

  firstUpdated() {
    // Add the tag name as an attribute if it is different than the component name
    this.runtimeUtils.handleComponentTagRename(this, 'auro-radio-group');
  }

  /**
   * Method for handling of selection of a radio element.
   * @private
   * @param {Event} event - The trigger event tied to this function.
   * @returns {void}
   */
  handleSelection(event) {
    if (event.target.value) {
      this.value = event.target.value;
    } else {
      this.value = '';
    }

    this.optionSelected = event.target;

    this.validation.validate(this, this.optionSelected !== undefined);
  }

  /**
   * Method handles radio element blur.
   * @private
   * @returns {void}
   */
  handleRadioBlur() {
    this.touched = true;
    this.validation.validate(this);
  }

  /**
   * LitElement lifecycle method. Called after the DOM has been updated.
   * @param {Map<string, any>} changedProperties - Keys are the names of changed properties, values are the corresponding previous values.
   * @returns {void}
   */
  updated(changedProperties) {
    if (changedProperties.has('disabled')) {
      // only change the children if we are making everything disabled, or if we are making everything enabled and there are no individually-disabled radio buttons
      if (this.disabled || this.items.every((el) => el.disabled)) {
        this.items.forEach((el) => {
          el.disabled = this.disabled;
        });
      }
    }

    if (changedProperties.has('value')) {
      this.dispatchEvent(new CustomEvent('input', {
        bubbles: true,
        cancelable: true,
        composed: true,
      }));
    }

    if (changedProperties.has('required')) {
      this.items.forEach((el) => {
        el.required = this.required;
      });
    }

    if (changedProperties.has('onDark')) {
      this.items.forEach((el) => {
        el.onDark = this.onDark;
      });
    }

    if (changedProperties.has('error')) {
      this.validate(true);
    }

    if (changedProperties.has('validity')) {
      if (this.validity && this.validity !== 'valid') {
        this.items.forEach((el) => {
          el.setAttribute('error', true);
        });
      } else {
        this.items.forEach((el) => {
          el.removeAttribute('error');
        });
      }
    }
  }

  /**
   * Resets component to initial state.
   * @returns {void}
   */
  reset() {
    // Sets first radio button to receive focus during keyboard navigation
    this.index = 0;

    const buttons = this.querySelectorAll('auro-radio, [auro-radio]');

    buttons.forEach((button) => {
      button.reset();
    });

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
   * Method handles the reset event from a radio element.
   * @private
   * @returns {void}
   */
  resetRadio() {
    if (this.items.length === 0) {
      this.handleItems();
    }
  }

  /**
   * Method for handling the attributes of each radio input.
   * @private
   * @returns {void}
   */
  handleItems() {
    this.items = [...this.querySelectorAll(':scope auro-radio, :scope [auro-radio]')];
    this.initializeIndex();

    if (this.disabled) {
      this.items.forEach((el) => {
        el.disabled = this.disabled;
      });
    }

    this.items.forEach((el) => {
      el.required = this.required;
      el.error = Boolean(this.error);
    });
  }

  /**
   * Method for handling slot content changes.
   * @private
   * @returns {void}
   */
  handleSlotChange() {
    this.handleItems();
  }

  /**
   * Method for initializing the tab index of the checked radio input.
   * @private
   * @returns {void}
   */
  initializeIndex() {
    if (!this.disabled) {
      const index = this.items.findIndex((item) => item.hasAttribute('checked') && !item.hasAttribute('disabled'));
      const nextEnabledIndex = this.items.findIndex((item) => !item.hasAttribute('disabled'));

      this.index = index >= 0 ? index : nextEnabledIndex;
      this.items[this.index].setAttribute('tabindex', 0);
    }
  }

  /**
   * Method for handling a newly selected radio input.
   * @private
   * @param {Event} event - The trigger event tied to this function.
   * @returns {void}
   */
  handleToggleSelected(event) {
    this.index = this.items.indexOf(event.target);

    this.items.forEach((item) => {
      item.checked = item === event.target;
    });

    this.value = event.target.value;
    this.optionSelected = event.target;

    this.validation.validate(this);
  }

  /**
   * Method for selecting a radio input.
   * @private
   * @param {Number} index - The value of the element's index attribute.
   * @returns {void}
   */
  selectItem(index) {
    const sdItem = this.items[index];

    sdItem.click();
    sdItem.focus();
    this.index = index;
  }

  /**
   * Method for selecting the next radio input.
   * @private
   * @param {Number} index - The value of the element's index attribute.
   * @param {String} moveDirection - Arrow key pressed by user.
   * @returns {void}
   */
  selectNextItem(index, moveDirection) {
    let currIndex = index;

    for (currIndex; currIndex < this.items.length; moveDirection === "Down" ? currIndex += 1 : currIndex -= 1) {
      currIndex = currIndex === -1 ? this.items.length - 1 : currIndex;
      const sdItem = this.items[currIndex];
      if (sdItem) {
        if (this.disabled || this.items.every((item) => item.disabled === true)) {
          sdItem.focus();
          break;
        }
        if (!sdItem.disabled) {
          sdItem.click();
          sdItem.focus();
          this.index = currIndex;
          break;
        }
      }
    }
  }

  /**
   * Method for handling a keydown event.
   * @private
   * @param {Event} event - The trigger event tied to this function.
   * @returns {void}
   */
  handleKeyDown(event) {
    switch (event.key) {
      case " ":
        event.preventDefault();
        this.selectItem(this.index);
        break;

      case "Down":
      case "ArrowDown":
      case "Right":
      case "ArrowRight":
        event.preventDefault();
        this.selectNextItem(this.index === this.items.length - 1 ? 0 : this.index + 1, "Down");
        break;

      case "Up":
      case "ArrowUp":
      case "Left":
      case "ArrowLeft":
        event.preventDefault();
        this.selectNextItem(this.index === 0 ? this.items.length - 1 : this.index - 1, "Up");
        break;
      default:
        break;
    }
  }

  // function that renders the HTML and CSS into  the scope of the component
  render() {
    const groupClasses = {
      'displayFlex': this.horizontal && this.items.length <= this.max
    };

    return html`
      <fieldset class="${classMap(groupClasses)}" part="radio-group" role="radiogroup">
        <legend>
          <slot name="legend"></slot>
          ${this.required ? undefined : html`<slot name="optionalLabel"> (optional)</slot>`}
        </legend>
        <slot @slotchange=${this.handleSlotChange}></slot>
      </fieldset>

      ${!this.validity || this.validity === undefined || this.validity === 'valid'
        ? html`
          <${this.helpTextTag} ?onDark="${this.onDark}" part="helpText">
            <slot name="helpText"></slot>
          </${this.helpTextTag}>`
        : html`
          <${this.helpTextTag} ?onDark="${this.onDark}" role="alert" error aria-live="assertive" part="helpText">
            ${this.errorMessage}
          </${this.helpTextTag}>`
      }
    `;
  }
}

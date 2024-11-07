// Copyright (c) Alaska Air. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.
// ---------------------------------------------------------------------

import { LitElement, html } from "lit";
import { classMap } from 'lit/directives/class-map.js';

// Import touch detection lib
import 'focus-visible/dist/focus-visible.min.js';

// Import the processed CSS file into the scope of the component
import styleCss from "./auro-radio-group-css.js";
import colorCss from './groupColor-css.js';
import tokenCss from './tokens-css.js';

// Import formvalidation class
import AuroFormValidation from '@aurodesignsystem/auro-formvalidation/src/validation.js';

// Import library runtime utils
import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';


/* eslint no-magic-numbers: ["error", { "ignore": [0, 1, -1] }] */
/* eslint-disable max-lines */

/**
 * @attr {String} validity - Specifies the `validityState` this element is in.
 * @attr {String} setCustomValidity - Sets a custom help text message to display for all validityStates.
 * @attr {String} setCustomValidityCustomError - Custom help text message to display when validity = `customError`.
 * @attr {String} setCustomValidityValueMissing - Custom help text message to display when validity = `valueMissing`.
 * @attr {String} error - When defined, sets persistent validity to `customError` and sets `setCustomValidity` = attribute value.
 * @attr {Boolean} noValidate - If set, disables auto-validation on blur.
 * @attr {Boolean} required - Populates the `required` attribute on the element. Used for client-side validation.
 * @attr {Object} optionSelected - Specifies the current selected radio button.
 * @csspart radio-group - Apply css to the fieldset element in the shadow DOM
 * @slot {HTMLSlotElement} legend - Allows for the legend to be overridden.
 * @slot {HTMLSlotElement} optionalLabel - Allows for the optional label to be overridden.
 * @slot {HTMLSlotElement} helpText - Allows for the helper text to be overridden.
 * @event auroFormElement-validated - Notifies that the element has been validated.
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
        type: Array
      },
      noValidate: {
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

    this.validation.validate(this);
  }

  /**
   * Method handles radio element blur.
   * @private
   * @returns {void}
   */
  handleRadioBlur() {
    if (this.value === undefined) {
      this.value = '';
    }

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

    if (changedProperties.has('required')) {
      this.items.forEach((el) => {
        el.required = this.required;
      });
    }

    if (changedProperties.has('error')) {
      this.validation.validate(this, true);
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
   * Method for a total reset of the radio element.
   * @returns {void}
   */
  reset() {
    this.value = undefined;
    this.index = 0;
    this.optionSelected = undefined;
    const buttons = this.querySelectorAll('auro-radio, [auro-radio]');

    buttons.forEach((button) => {
      button.checked = false;
    });

    this.validation.validate(this);
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

    // handle tab index
    this.items.forEach((item) => {
      item.tabIndex = -1;
    });

    if (!this.disabled) {
      this.items[this.index].tabIndex = 0;
    }
  }

  /**
   * Method for handling the attributes of each radio input.
   * @private
   * @returns {void}
   */
  handleItems() {
    this.items = [...this.querySelectorAll(':scope > *:not([slot])')];
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

      if (this.index >= 0) {
        this.items[this.index].tabIndex = 0;
      }
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
      if (item === event.target) {
        item.tabIndex = 0;
        if (event.target.value) {
          this.value = event.target.value;
        }
      } else {
        const sdInput = item.shadowRoot.querySelector('input');

        sdInput.checked = false;
        item.checked = false;
        item.tabIndex = -1;
      }
    });

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
    const sdItem = this.items[index].shadowRoot.querySelector('input');

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
      const sdItem = this.items[currIndex].shadowRoot.querySelector('input');

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
      <fieldset class="${classMap(groupClasses)}" part="radio-group">
        ${this.required
        ? html`<legend><slot name="legend"></slot></legend>`
        : html`<legend><slot name="legend"></slot> <slot name="optionalLabel">(optional)</slot></legend>`
      }
        <slot @slotchange=${this.handleSlotChange}></slot>
      </fieldset>

      ${!this.validity || this.validity === undefined || this.validity === 'valid'
        ? html`
          <p class="radioGroupElement-helpText" part="helpText">
            <slot name="helpText"></slot>
          </p>`
        : html`
          <p class="radioGroupElement-helpText" role="alert" aria-live="assertive" part="helpText">
            ${this.setCustomValidity}
          </p>`
      }
    `;
  }
}

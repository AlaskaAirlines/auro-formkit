// Copyright (c) Alaska Air. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.
// ---------------------------------------------------------------------

import { LitElement } from "lit";
import { html } from "lit/static-html.js";
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

// Import touch detection lib
import 'focus-visible/dist/focus-visible.min.js';

// Import the processed CSS file into the scope of the component
import styleCss from "./styles/auro-radio-group-css.js";
import colorCss from './styles/groupColor-css.js';
import tokenCss from './styles/tokens-css.js';

// Import formValidation class
import AuroFormValidation from '@aurodesignsystem/form-validation';

// Import library runtime utils
import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';
import { AuroDependencyVersioning } from '@aurodesignsystem/auro-library/scripts/runtime/dependencyTagVersioning.mjs';
import { generateUUID } from '@aurodesignsystem/auro-library/scripts/runtime/generateUUID';

import { AuroHelpText } from '@aurodesignsystem/auro-helptext';
import formkitVersion from '@aurodesignsystem/version';

/* eslint no-magic-numbers: ["error", { "ignore": [0, 1, -1] }] */
/* eslint-disable max-lines, lit/binding-positions, lit/no-invalid-html, no-underscore-dangle */

/**
 * A group of radio buttons with a shared label that lets people choose exactly one option, and can require a choice.
 *
 * **Key capabilities**
 * - **One choice at a time**: The group always unchecks the other radio buttons when someone selects one.
 * - **Required selection**: Set `required` to show an error when someone leaves the group without selecting an option.
 * - **Custom error messages**: Set `setCustomValidityValueMissing` to show error text, or `error` to show an error of your own.
 * - **Horizontal layout**: Set `horizontal` to place up to three radio buttons side by side.
 * - **Dark backgrounds**: Set `appearance="inverse"` to use colors made for dark backgrounds.
 *
 * **Example**
 *
 * ```html
 * <auro-radio-group required>
 *   <span slot="legend">Seat preference</span>
 *   <auro-radio value="window" name="seat">Window seat</auro-radio>
 *   <auro-radio value="aisle" name="seat">Aisle seat</auro-radio>
 * </auro-radio-group>
 * ```
 * @summary A labeled group of radio buttons that allows one choice, with required-selection validation and a horizontal layout.
 * @customElement auro-radio-group
 *
 * @csspart radio-group - The `<fieldset>` element, with `role="radiogroup"`, that wraps the legend and the radio buttons.
 * @csspart helpText - The help text element below the group, which shows the help text or the error message.
 * @slot {HTMLSlotElement} legend - Label for the group, such as "Seat preference". Screen readers announce it as the group's name. {@requiredWhen always} {@category ui}
 * @slot {HTMLSlotElement} optionalLabel - Text shown after the legend when the group isn't `required`, such as a translated "(optional)". Defaults to "(optional)". {@relevantWhen !required} {@category ui}
 * @slot {HTMLSlotElement} helpText - Help text shown below the group, such as "Choose one". While the group shows an error, the error message replaces it. {@category ui}
 * @slot default - The `auro-radio` elements in the group.
 * @event auroFormElement-validated - Fires each time the group runs validation, with the result in `event.detail.validity` and `event.detail.message`.
 * @event input - Fires whenever the group's `value` changes, including when it's set in code or cleared by `reset()`.
 */

export class AuroRadioGroup extends LitElement {
  constructor() {
    super();

    this._initializeDefaults();
  }

  /**
   * Sets the initial property values. Called from the constructor.
   * @internal
   */
  _initializeDefaults() {
    this.appearance = "default";
    this.disabled = false;
    this.horizontal = false;
    this.required = false;
    this.validity = undefined;
    this.value = undefined;
    this.optionSelected = undefined;
    this.onDark = false;
    this.touched = false;
    this.hasLegend = false;

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
     * Creates unique tag names for dependency components.
     */
    const versioning = new AuroDependencyVersioning();

    /**
     * @private
     */
    this.helpTextTag = versioning.generateTag('auro-formkit-radio-helptext', formkitVersion, AuroHelpText);

    /**
     * @private
     */
    this.uniqueId = generateUUID();
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

      /**
       * Sets the group colors to match its background. Use `inverse` on dark backgrounds and `default` on light ones.
       * The group passes this value to the radio buttons it contains. Radio buttons you add later don't pick it up until this value changes.
       * @type {'default' | 'inverse'}
       * @default 'default'
       * @category ui
       */
      appearance: {
        type: String,
        reflect: true
      },

      /**
       * Turns off every radio button in the group.
       * Removing `disabled` later turns every radio button back on, including ones you disabled individually.
       * @category ui
       */
      disabled: {
        type: Boolean,
        reflect: true
      },

      /**
       * Shows the group in its error state with this message, such as "Select an option".
       * The error stays until you remove the attribute. When set, `setCustomValidityCustomError` or `setCustomValidity` replaces the message.
       * @category behavior
       */
      error: {
        type: String,
        reflect: true
      },

      /**
       * Records whether the `legend` slot has content.
       * @private
       */
      hasLegend: {
        type: Boolean,
        reflect: false,
        attribute: false
      },

      /**
       * Places the radio buttons side by side on one line.
       * Works for up to three radio buttons; groups with four or more stay stacked vertically.
       * @category ui
       */
      horizontal: { type: Boolean },

      /**
       * Stops the group from validating automatically when focus leaves it or the selection changes.
       * To validate the group yourself, call `validate(true)`, which checks right away, even before anyone has interacted with the group. The `error` attribute still applies.
       * @category behavior
       */
      noValidate: {
        type: Boolean,
        attribute: 'novalidate',
        reflect: true
      },

      /**
       * Deprecated: Use `appearance="inverse"` instead.
       * Shows the group and its radio buttons in colors made for dark backgrounds.
       * @deprecated Use `appearance="inverse"` instead.
       * @category ui
       */
      onDark: {
        type: Boolean,
        attribute: 'ondark',
        reflect: true
      },

      /**
       * Gets the selected `auro-radio` element, or `undefined` when nothing is selected.
       * @type {HTMLElement}
       * @category behavior
       */
      optionSelected: {
        type: Object,
        attribute: false
      },

      /**
       * Requires a selection in the group and hides the "(optional)" text after the legend.
       * Unless `noValidate` is set, the group shows an error when focus leaves it with nothing selected.
       * @category behavior
       */
      required: {
        type: Boolean,
        reflect: true
      },

      /**
       * Sets one error message for every kind of error, such as "Choose an option".
       * It replaces the `error` text and the `setCustomValidityValueMissing` and `setCustomValidityCustomError` messages.
       * @category behavior
       */
      setCustomValidity: {
        type: String,
        attribute: 'setcustomvalidity'
      },

      /**
       * Sets the error message shown while the `error` attribute is set, in place of the attribute's own text.
       * `setCustomValidity` takes priority when both are set.
       * @relevantWhen error
       * @category behavior
       */
      setCustomValidityCustomError: {
        type: String,
        attribute: 'setcustomvaliditycustomerror'
      },

      /**
       * Sets the error message shown when the group is `required` and nothing is selected, such as "Select an option".
       * The group has no default message, so set this or `setCustomValidity` to show one. `setCustomValidity` takes priority when both are set.
       * @relevantWhen required
       * @category behavior
       */
      setCustomValidityValueMissing: {
        type: String,
        attribute: 'setcustomvalidityvaluemissing'
      },

      /**
       * Records whether someone has interacted with the group.
       * @private
       */
      touched: {
        type: Boolean,
        reflect: true,
        attribute: false
      },

      /**
       * Gets the group's current validation state: `valid`, `valueMissing`, or `customError`.
       * It's `undefined` until the group is first validated.
       * @readonly
       * @category behavior
       */
      validity: {
        type: String,
        reflect: true
      },

      /**
       * Gets the `value` of the selected radio button, such as `window`.
       * Setting it doesn't select a radio button; set `checked` on the radio button instead.
       * @category behavior
       */
      value: {
        type: String
      }
    };
  }

  /**
   * Registers the element with the browser under a tag name.
   * @param {string} [name="auro-radio-group"] - The tag name to register the element under.
   *
   * @example
   * AuroRadioGroup.register("custom-radio-group") // registers the element as <custom-radio-group>
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
   * Called when a radio button in the group becomes checked.
   * Updates `value` and `optionSelected`, and validates the group unless `noValidate` is set.
   * @private
   * @param {Event} event - The `auroRadio-selected` event from the radio button.
   * @returns {void}
   */
  handleSelection(event) {
    // specifically check null and undefined in case if the value is false or 0
    if (event.target.value !== null && event.target.value !== undefined) {
      this.value = event.target.value;
    } else {
      this.value = '';
    }

    this.optionSelected = event.target;

    if (!this.noValidate) {
      this.validation.validate(this, this.optionSelected !== undefined);
    }
  }

  /**
   * Called when a radio button in the group loses focus.
   * Marks the group as interacted with and validates it unless `noValidate` is set.
   * @private
   * @returns {void}
   */
  handleRadioBlur() {
    this.touched = true;
    if (!this.noValidate) {
      this.validation.validate(this);
    } else if (this.validity !== undefined && !this.hasAttribute('error')) {
      // Clear stale error state left by a previous validate(true) call.
      // Do not clear when the error attribute is set — that is an externally forced error.
      this.validity = undefined;
      this.errorMessage = '';
    }
  }

  /**
   * Called after the group updates.
   * Passes `disabled`, `required`, `appearance`, and the invalid state to each radio button, dispatches `input` when `value` changes, and validates again when `error` changes.
   * @param {Map<string, any>} changedProperties - The names of the changed properties, mapped to their previous values.
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

    if (changedProperties.has('appearance')) {
      this.items.forEach((el) => {
        el.appearance = this.appearance;
      });
    }

    if (changedProperties.has('error')) {
      this.validate(true);
    }

    if (changedProperties.has('validity')) {
      this.syncItemValidity();
    }
  }

  /**
   * Checks whether the group is currently invalid.
   * `validity` is the source of truth, not `error`: `validate()` turns the
   * `error` attribute into `validity = 'customError'`, so `error` is already covered here.
   * Single definition of "invalid" for the whole component, used by `render()` and
   * `syncItemValidity()` so the fieldset and its children can never disagree.
   * @private
   * @returns {boolean}
   */
  get isInvalid() {
    return Boolean(this.validity && this.validity !== 'valid');
  }

  /**
   * Mirrors the group's invalid state onto each radio button.
   * Also runs from `handleItems()`, because a slot change or a
   * reconnect can happen without `validity` itself changing.
   * @private
   * @returns {void}
   */
  syncItemValidity() {
    const invalid = this.isInvalid;

    this.items.forEach((el) => {
      if (invalid) {
        el.setAttribute('error', true);
        el.setAttribute('aria-invalid', 'true');
      } else {
        el.removeAttribute('error');
        el.removeAttribute('aria-invalid');
      }
    });
  }

  /**
   * Resets the group: unchecks every radio button, including one that started out checked, and clears the value and validation state.
   * An error set with the `error` attribute stays.
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
   * Validates the group and shows an error message if it's invalid.
   * @param {boolean} [force=false] - If true, validates right away, even while the group has focus or before anyone has interacted with it. If false, validates only when focus is outside the group and it has been interacted with or has a value.
   */
  validate(force = false) {
    this.validation.validate(this, force);
  }

  /**
   * Called when a radio button's `checked` state changes (the `resetRadio` event).
   * Collects the radio buttons if the group hasn't found any yet.
   * @private
   * @returns {void}
   */
  resetRadio() {
    if (this.items.length === 0) {
      this.handleItems();
    }
  }

  /**
   * Called when the group connects or its slot content changes.
   * Collects the radio buttons, sets which one Tab reaches, passes `disabled` and `required` to each, and mirrors the invalid state.
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
    });

    this.syncItemValidity();
  }

  /**
   * Called when the default slot content changes.
   * @private
   * @returns {void}
   */
  handleSlotChange() {
    this.handleItems();
  }

  /**
   * Called when the `legend` slot content changes. Records whether a legend is set.
   * @private
   * @returns {void}
   */
  handleLegendSlotChange() {
    const slot = this.shadowRoot.querySelector('slot[name="legend"]');
    if (slot) {
      this.hasLegend = slot.assignedNodes().length > 0;
    }
  }

  /**
   * Makes the checked radio button, or the first enabled one when none is checked, reachable with Tab.
   * @private
   * @returns {void}
   */
  initializeIndex() {
    if (!this.disabled && this.items && this.items.length > 0) {
      const index = this.items.findIndex((item) => item.hasAttribute('checked') && !item.hasAttribute('disabled'));
      const nextEnabledIndex = this.items.findIndex((item) => !item.hasAttribute('disabled'));

      this.index = index >= 0 ? index : nextEnabledIndex;

      if (this.items[this.index]) {
        this.items[this.index].setAttribute('tabindex', 0);
      };
    }
  }

  /**
   * Called when someone selects a radio button in the group.
   * Unchecks the others, updates `value` and `optionSelected`, and validates the group unless `noValidate` is set.
   * @private
   * @param {Event} event - The `toggleSelected` event from the radio button.
   * @returns {void}
   */
  handleToggleSelected(event) {
    this.index = this.items.indexOf(event.target);

    this.items.forEach((item) => {
      item.checked = item === event.target;
    });

    this.value = event.target.value;
    this.optionSelected = event.target;

    if (!this.noValidate) {
      this.validation.validate(this);
    }
  }

  /**
   * Selects and focuses the radio button at the given position.
   * @private
   * @param {Number} index - The position of the radio button in the group, starting at 0.
   * @returns {void}
   */
  selectItem(index) {
    const sdItem = this.items[index];

    sdItem.click();
    sdItem.focus();
    this.index = index;
  }

  /**
   * Selects and focuses the first enabled radio button from `index` onward, moving in the given direction.
   * When the whole group is disabled, it only moves focus.
   * @private
   * @param {Number} index - The position to start searching from, starting at 0.
   * @param {String} moveDirection - The direction to move: `Down` or `Up`.
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
   * Called when a key is pressed inside the group.
   * Space selects the current radio button, and arrow keys select the next or previous enabled one.
   * @private
   * @param {Event} event - The `keydown` event.
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
    const legendClasses = {
      'hidden': !this.hasLegend && this.required
    };

    return html`
      <fieldset
        class="${classMap(groupClasses)}"
        part="radio-group"
        role="radiogroup"
        aria-invalid="${ifDefined(this.isInvalid ? 'true' : undefined)}"
        aria-describedby="${this.uniqueId}"
      >
        <legend class="${classMap(legendClasses)}">
          <slot name="legend" @slotchange=${this.handleLegendSlotChange}></slot>
          ${this.required ? undefined : html`<slot name="optionalLabel"> (optional)</slot>`}
        </legend>
        <slot @slotchange=${this.handleSlotChange}></slot>
      </fieldset>

      ${!this.isInvalid
        ? html`
          <${this.helpTextTag} id="${this.uniqueId}" appearance="${this.onDark ? 'inverse' : this.appearance}" part="helpText">
            <slot name="helpText"></slot>
          </${this.helpTextTag}>`
        : html`
          <${this.helpTextTag} id="${this.uniqueId}" appearance="${this.onDark ? 'inverse' : this.appearance}" role="alert" error aria-live="assertive" part="helpText">
            ${this.errorMessage}
          </${this.helpTextTag}>`
      }
    `;
  }
}

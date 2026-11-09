// Copyright (c) 2026 Alaska Airlines. All rights reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

/* eslint-disable max-lines, lit/binding-positions, lit/no-invalid-html, no-underscore-dangle */

import { LitElement } from 'lit';
import { html } from 'lit/static-html.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import AuroFormValidation from '@aurodesignsystem/form-validation';
import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';
import { AuroDependencyVersioning } from '@aurodesignsystem/auro-library/scripts/runtime/dependencyTagVersioning.mjs';
import { generateUUID } from '@aurodesignsystem/auro-library/scripts/runtime/generateUUID';

// Import the processed CSS file into the scope of the component
import styleCss from "./styles/auro-checkbox-group-css.js";
import colorCss from "./styles/colorGroup-css.js";
import tokensCss from "./styles/tokens-css.js";

import { AuroHelpText } from '@aurodesignsystem/auro-helptext';
import formkitVersion from '@aurodesignsystem/version';

/**
 * A group of related checkboxes with a shared label that lets people select one or more options and can require at least one choice.
 *
 * **Key capabilities**
 * - **Required selection**: Set `required` to show an error when someone leaves the group without checking any option.
 * - **Custom error messages**: Set `setCustomValidityValueMissing` to replace the error text, or `error` to show an error of your own.
 * - **Horizontal layout**: Set `horizontal` to place up to three checkboxes side by side.
 * - **Disable every option**: Set `disabled` to turn off all the checkboxes in the group at once.
 * - **Dark backgrounds**: Set `appearance="inverse"` to use colors made for dark backgrounds.
 *
 * **Example**
 *
 * ```html
 * <auro-checkbox-group required>
 *   <span slot="legend">Seat preferences</span>
 *   <auro-checkbox value="window" name="seat">Window seat</auro-checkbox>
 *   <auro-checkbox value="aisle" name="seat">Aisle seat</auro-checkbox>
 * </auro-checkbox-group>
 * ```
 * @summary A labeled group of checkboxes with required-selection validation, custom error messages, and a horizontal layout.
 * @customElement auro-checkbox-group
 *
 * @csspart checkbox-group - The `<fieldset>` element that wraps the legend and the checkboxes.
 * @csspart helpText - The help text element below the group, which shows the help text or the error message.
 *
 * @slot legend - Label for the group, such as "Seat preferences". Screen readers announce it as the group's name. {@requiredWhen always} {@category ui}
 * @slot optionalLabel - Text shown after the legend when the group isn't `required`, such as "- optional". Defaults to "(optional)". {@relevantWhen !required} {@category ui}
 * @slot helpText - Help text shown below the group, such as "Select all that apply". While the group shows an error, the error message replaces it. {@category ui}
 * @slot default - The `auro-checkbox` elements in the group. {@requiredWhen always} {@category ui}
 * @event auroFormElement-validated - Fires each time the group runs validation, with the result in `event.detail.validity` and `event.detail.message`.
 * @event input - Fires when a checkbox in the group is checked or unchecked, after the group's selected values update. It also fires once for each checkbox when the group loads with checkboxes that start out `checked`.
 */

export class AuroCheckboxGroup extends LitElement {
  constructor() {
    super();

    this._initializeDefaults();
  }

  /**
   * Sets the initial property values. Called from the constructor.
   * @internal
   */
  _initializeDefaults() {
    this.appearance = 'default';
    this.validity = undefined;
    this.disabled = undefined;
    this.required = false;
    this.horizontal = false;
    this.onDark = false;

    /**
     * Indicates whether the checkbox group is in a dirty state (has been interacted with).
     * @type {boolean}
     * @private
     */
    this.touched = false;

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
     * Creates unique tag names for dependency components.
     */
    const versioning = new AuroDependencyVersioning();

    /**
     * @private
     */
    this.helpTextTag = versioning.generateTag('auro-formkit-checkbox-helptext', formkitVersion, AuroHelpText);

    /**
     * @private
     */
    this.uniqueId = generateUUID();
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
      ...super.properties,

      /**
       * Sets the group colors to match its background. Use `inverse` on dark backgrounds and `default` on light ones.
       * The group passes this value to every checkbox in it.
       * @type {'default' | 'inverse'}
       * @default 'default'
       * @category ui
       */
      appearance: {
        type: String,
        reflect: true
      },

      /**
       * Turns off every checkbox in the group.
       * Removing `disabled` later turns every checkbox back on, including ones you disabled individually.
       * @category ui
       */
      disabled: {
        type: Boolean,
        reflect: true
      },

      /**
       * Shows the group in its error state with this message, such as "Select at least one option".
       * The error stays until you remove the attribute. When set, `setCustomValidityCustomError` or `setCustomValidity` replaces the message.
       * @category behavior
       */
      error: {
        type: String,
        reflect: true
      },

      /**
       * Places the checkboxes side by side on one line.
       * Works for up to three checkboxes; groups with four or more stay stacked vertically.
       * @category ui
       */
      horizontal: {
        type: Boolean,
        reflect: true
      },

      /**
       * Stops the group from validating automatically when focus leaves it or a checkbox changes.
       * To validate the group yourself, call `validate()`. The `error` attribute still applies.
       * @category behavior
       */
      noValidate: {
        type: Boolean,
        attribute: 'novalidate',
        reflect: true
      },

      /**
       * Deprecated: Use `appearance="inverse"` instead.
       * Shows the group and its checkboxes in colors made for dark backgrounds.
       * @deprecated Use `appearance="inverse"` instead.
       * @category ui
       */
      onDark: {
        type: Boolean,
        attribute: 'ondark',
        reflect: true
      },

      /**
       * Requires at least one checked checkbox in the group and hides the "(optional)" text after the legend.
       * Unless `noValidate` is set, the group shows an error when focus leaves it with nothing checked, or when someone unchecks the last checked option.
       * @category behavior
       */
      required: {
        type: Boolean,
        reflect: true
      },

      /**
       * Sets one error message for every kind of error, such as "Choose at least one option".
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
       * @relevantWhen error !== undefined
       * @category behavior
       */
      setCustomValidityCustomError: {
        type: String,
        attribute: 'setcustomvaliditycustomerror'
      },

      /**
       * Sets the error message shown when the group is `required` and no checkbox is checked, such as "Select at least one option".
       * `setCustomValidity` takes priority when both are set.
       * @relevantWhen required
       * @category behavior
       */
      setCustomValidityValueMissing: {
        type: String,
        attribute: 'setcustomvalidityvaluemissing'
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
      }
    };
  }

  /**
   * Registers the element with the browser under a tag name.
   * @param {string} [name="auro-checkbox-group"] - The tag name to register the element under.
   *
   * @example
   * AuroCheckboxGroup.register("custom-checkbox-group") // registers the element as <custom-checkbox-group>
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
   * Called when a checkbox is checked or unchecked.
   * Adds or removes its value, dispatches `input`, and validates the group unless `noValidate` is set.
   * @private
   * @param {String} value - The value of the checkbox.
   * @param {Boolean} selected - If true, adds the value to the group's selected values. If false, removes it.
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

    if (!this.noValidate) {
      this.validate(true);
    }
  }

  firstUpdated() {
    // Add the tag name as an attribute if it is different than the component name
    this.runtimeUtils.handleComponentTagRename(this, 'auro-checkbox-group');

    // must declare this function as a variable to correctly pass the reference to the removeEventListener
    const checkFocusWithin = function(evt) {
      if (document.auroCheckboxGroupActive && !document.auroCheckboxGroupActive.contains(evt.target)) {
        // if focus has left the group, cleanup and validate
        const group = document.auroCheckboxGroupActive;
        group.focusWithin = false;
        window.removeEventListener('focusin', checkFocusWithin);
        document.removeEventListener('click', checkFocusWithin);
        // execute the validation
        if (!group.noValidate) {
          group.validation.validate(group);
        } else if (group.validity !== undefined && !group.hasAttribute('error')) {
          // Clear stale error state left by a previous validate(true) call.
          // Do not clear when the error attribute is set — that is an externally forced error.
          group.validity = undefined;
          group.errorMessage = '';
        }
      }
    };

    this.addEventListener('auroCheckbox-focusin', () => {
      this.touched = true;

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
   * Adds the values of checkboxes that start out with `checked` to the group's selected values.
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
   * Called when the group connects or its slot content changes.
   * Collects the checkboxes, picks up preselected values, validates, and mirrors the invalid state onto each checkbox.
   * @private
   * @returns {void}
   */
  handleItems() {
    const groupTagName = this.tagName.toLowerCase();
    const checkboxTagName = groupTagName.substring(0, groupTagName.indexOf('-group'));

    this.checkboxes = Array.from(this.querySelectorAll(checkboxTagName));

    this.handlePreselectedItems();

    this.validate();
    this.syncCheckboxValidity();
  }

  /**
   * Checks whether the group is currently invalid.
   * `validity` is the source of truth, not `error`: `validate()` turns the
   * `error` attribute into `validity = 'customError'`, so `error` is already covered here.
   * Single definition of "invalid" for the whole component, used by `render()` and
   * `syncCheckboxValidity()` so the fieldset and its children can never disagree.
   * @private
   * @returns {boolean}
   */
  get isInvalid() {
    return Boolean(this.validity && this.validity !== 'valid');
  }

  /**
   * Mirrors the group's invalid state onto each checkbox.
   * Also runs from `handleItems()`, because a slot change can happen
   * without `validity` itself changing, so a checkbox slotted into an already-invalid
   * group would otherwise be missed.
   * @private
   * @returns {void}
   */
  syncCheckboxValidity() {
    const invalid = this.isInvalid;

    this.checkboxes.forEach((el) => {
      if (invalid) {
        el.setAttribute('error', true);
        el.setAttribute('aria-invalid', 'true');
      } else {
        // Group state is authoritative: an `error` set directly on an individual
        // checkbox by a consumer is cleared here, and because this method also runs
        // from `handleItems()` that now happens on every slot change, not just on a
        // validity change. Matches auro-radio-group. See docs/post-mortem/1636704.md,
        // "Breaking Change Assessment", for why this is not treated as a breaker.
        el.removeAttribute('error');
        el.removeAttribute('aria-invalid');
      }
    });
  }

  /**
   * Resets the group: unchecks every checkbox, including ones that started out checked, and clears the validation state.
   * An error set with the `error` attribute stays.
   * @returns {void}
   */
  reset() {
    this.checkboxes.forEach((checkbox) => {
      checkbox.reset();
    });

    this.validation.reset(this);
  }

  /**
   * Called after the group updates.
   * Passes `disabled`, `appearance`, and the invalid state to each checkbox, and validates again when `error` changes.
   * @param {Map<string, any>} changedProperties - The names of the changed properties, mapped to their previous values.
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
      this.syncCheckboxValidity();
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

    if (changedProperties.has('appearance')) {
      this.checkboxes.forEach((el) => {
        el.appearance = this.appearance;
      });
    }

    if (changedProperties.has('error')) {
      this.validate(true);
    }
  }

  /**
   * Validates the group and shows an error message if it's invalid.
   * @param {boolean} [force=false] - If true, validates right away, even while the group has focus or before anyone has interacted with it. If false, validates only when focus is outside the group and it has been interacted with or has a value.
   */
  validate(force = false) {
    this.validation.validate(this, force);
  }

  render() {
    const groupClasses = {
      'displayFlex': this.horizontal && this.checkboxes.length <= this.maxNumber
    };

    return html`
      <fieldset
        class="${classMap(groupClasses)}"
        part="checkbox-group"
        aria-invalid="${ifDefined(this.isInvalid ? 'true' : undefined)}"
        aria-describedby="${this.uniqueId}"
      >
        <legend>
          <slot name="legend"></slot>
          ${this.required ? undefined : html`<slot name="optionalLabel"> (optional)</slot>`}
        </legend>
        <slot @slotchange=${this.handleItems}></slot>
      </fieldset>

      ${!this.isInvalid
        ? html`
          <${this.helpTextTag} id="${this.uniqueId}" part="helpText" appearance="${this.onDark ? 'inverse' : this.appearance}">
            <slot name="helpText"></slot>
          </${this.helpTextTag}>`
        : html`
          <${this.helpTextTag} id="${this.uniqueId}" error appearance="${this.onDark ? 'inverse' : this.appearance}" role="alert" aria-live="assertive" part="helpText">
            ${this.errorMessage}
          </${this.helpTextTag}>`
      }
    `;
  }
}

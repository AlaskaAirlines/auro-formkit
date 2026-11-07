// Copyright (c) 2025 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

/* eslint-disable lit/binding-positions, lit/no-invalid-html, max-lines, no-underscore-dangle */

import { LitElement } from "lit";
import { html } from "lit/static-html.js";
import { ifDefined } from 'lit/directives/if-defined.js';

import "./auro-counter-button.js";

import { AuroDependencyVersioning } from "@aurodesignsystem/auro-library/scripts/runtime/dependencyTagVersioning.mjs";
import AuroLibraryRuntimeUtils from "@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs";

import { AuroIcon } from "@aurodesignsystem/auro-icon/class";
import iconVersion from "./iconVersion.js";
import AuroFormValidation from "@aurodesignsystem/form-validation";

import { applyKeyboardStrategy, IconUtil } from "@aurodesignsystem/utils";
import plusIcon from '@alaskaairux/icons/dist/icons/interface/plus-lg.mjs';
import minusIcon from '@alaskaairux/icons/dist/icons/interface/minus-lg.mjs';

import tokensCss from "./styles/tokens-css.js";
import colorCss from "./styles/color-css.js";
import styleCss from "./styles/style-css.js";
import { AuroHelpText } from "@aurodesignsystem/auro-helptext";
import formkitVersion from '@aurodesignsystem/version';

import { keyboardStrategy } from './keyboardStrategy.js';

/**
 * A counter that lets people choose a number, such as how many passengers are traveling, with minus and plus buttons.
 *
 * **Key capabilities**
 * - **Range limits**: The `min` and `max` attributes set the lowest and highest values, and the matching button turns off at each limit.
 * - **Keyboard support**: The counter is a single tab stop, and the Up Arrow and Down Arrow keys change its value.
 * - **Supporting text**: The `description` and `helpText` slots add text below the label.
 * - **Error state**: The `error` attribute marks the counter invalid and shows its value as the error message.
 * - **Dark backgrounds**: Set `appearance="inverse"` to use the counter on dark backgrounds.
 *
 * **Example**
 *
 * ```html
 * <auro-counter>
 *   Adults
 *   <span slot="ariaLabel.minus">Remove adult</span>
 *   <span slot="ariaLabel.plus">Add adult</span>
 * </auro-counter>
 * ```
 * @summary A counter with minus and plus buttons, range limits, keyboard support, and error messages.
 * @customElement auro-counter
 *
 * @slot default - The counter's label, such as "Adults". Screen readers read it, with any `description`, as the counter's name. {@requiredWhen always} {@category ui}
 * @slot ariaLabel.minus - Text screen readers announce for the minus button, such as "Remove adult". Defaults to "−" (a minus sign). {@requiredWhen always} {@category a11y}
 * @slot ariaLabel.plus - Text screen readers announce for the plus button, such as "Add adult". Defaults to "+". {@requiredWhen always} {@category a11y}
 * @slot helpText - Extra guidance shown below the counter. An error message replaces it while the counter is invalid. {@category ui}
 * @slot description - Short supporting text shown below the label, such as "18 years or older". Screen readers read it as part of the counter's name. {@category ui}
 *
 * @csspart counterControl - The spinbutton element that holds the minus button, the value, and the plus button.
 * @csspart controlMinus - The minus button, which lowers the value by 1.
 * @csspart controlPlus - The plus button, which raises the value by 1.
 * @csspart helpText - The paragraph that shows the help text, or the error message while the counter is invalid.
 *
 * @event input - Notifies that the counter's value has changed.
 */
export class AuroCounter extends LitElement {
  static get shadowRootOptions() {
    return {
      ...LitElement.shadowRootOptions,
      delegatesFocus: true,
    };
  }

  constructor() {
    super();

    this._initializeDefaults();
  }

  _initializeDefaults() {
    this.appearance = "default";
    this.defaultSlot = undefined;
    this.disabled = false;
    this.disableMax = false;
    this.disableMin = false;
    this.max = 9;
    this.min = 0;
    this.name = undefined;
    this.onDark = false;
    this.validity = undefined;
    this.value = undefined;

    /**
     * @private
     */
    this.validation = new AuroFormValidation();

    /**
     * Generate unique names for dependency components.
     * @private
     */
    const versioning = new AuroDependencyVersioning();

    /**
     * Dynamically generated icon tag for counter buttons.
     * @private
     * @type {string}
     */
    this.iconTag = versioning.generateTag("auro-formkit-counter-icon", iconVersion, AuroIcon);

    /**
     * @private
     */
    this.helpTextTag = versioning.generateTag('auro-formkit-input-helptext', formkitVersion, AuroHelpText);

    /**
     * @private
     */
    this.runtimeUtils = new AuroLibraryRuntimeUtils();

  }

  connectedCallback() {
    super.connectedCallback();
    applyKeyboardStrategy(this, keyboardStrategy);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  /**
   * Gets the current value of the counter.
   * @returns {number|undefined} The current value of the counter, or undefined if the value isn't set or isn't a number.
   * @category behavior
   */
  get value() {
    return this._value;
  }

  /**
   * Sets the counter's value. A value outside `min` and `max` (0–9 by default) isn't moved back into range; it marks the counter invalid instead. A value that's `undefined`, `null`, or not a number clears the value to `undefined`.
   * @param {number|string|undefined|null} val - The new value: a number, a string that converts to a number, `undefined`, or `null`.
   * @category behavior
   */
  set value(val) {
    const old = this._value;
    if (val === undefined || val === null) {
      this._value = undefined;
    } else {
      const num = Number(val);
      this._value = Number.isNaN(num) ? undefined : num;
    }
    this.requestUpdate('value', old);
  }

  /**
   * Gets the component's reactive properties.
   * @returns {Object} The property configuration.
   */
  static get properties() {
    return {

      /**
       * Sets the colors to match the background behind the counter. Use `inverse` on dark backgrounds and `default` on light ones.
       * @type {'default' | 'inverse'}
       * @category ui
       * @default 'default'
       */
      appearance: {
        type: String,
        reflect: true
      },

      /**
       * The trimmed text of the default slot, which `auro-counter-group` shows in its dropdown summary.
       * @private
       */
      defaultSlot: {
        type: String,
        attribute: "defaultslot"
      },

      /**
       * Turns the counter off. A disabled counter is shown in a muted style, its buttons can't be clicked, and it's removed from the keyboard tab order.
       * @category ui
       */
      disabled: {
        type: Boolean,
        reflect: true
      },

      /**
       * Turns off the plus button. Set by `auro-counter-group` when the group's total reaches its `max`.
       * @private
       * @category behavior
       */
      disableMax: {
        type: Boolean,
        attribute: "disablemax"
      },

      /**
       * Turns off the minus button. Set by `auro-counter-group` when the group's total is at or below its `min`.
       * @private
       * @category behavior
       */
      disableMin: {
        type: Boolean,
        attribute: "disablemin"
      },

      /**
       * Sets a custom error message, such as "Select at least one adult", and marks the counter invalid. The message replaces the help text. Set it with the `error` attribute: setting only the `error` property doesn't currently mark the counter invalid.
       * @category behavior
       */
      error: {
        type: String,
        reflect: false
      },

      /**
       * Sets the highest value the counter allows. The plus button turns off at this value.
       * @minimum 0
       * @maximum 9
       * @default 9
       * @category behavior
       */
      max: {
        type: Number,
        reflect: true
      },

      /**
       * Sets the lowest value the counter allows. The counter starts at this value, and the minus button turns off at it.
       * @minimum 0
       * @maximum 9
       * @default 0
       * @category behavior
       */
      min: {
        type: Number,
        reflect: true
      },

      /**
       * Sets the key for this counter's entry in the group's `value` object, such as `adults`. Applies only inside `auro-counter-group`, which uses `counter-0`, `counter-1`, and so on for counters without a name.
       * @category behavior
       */
      name: {
        type: String,
        reflect: true
      },

      /**
       * Deprecated: Use `appearance="inverse"` instead.
       * Shows the counter in colors for dark backgrounds.
       * @category ui
       * @deprecated Use `appearance="inverse"` instead.
       */
      onDark: {
        type: Boolean,
        attribute: "ondark",
        reflect: true
      },

      /**
       * Reports whether the counter passes validation: `valid`, or the reason it fails, such as `customError`, `rangeOverflow`, or `rangeUnderflow`.
       * @readonly
       * @category behavior
       */
      validity: {
        type: String,
        reflect: true
      },

      /**
       * Sets the counter's number, such as `2`. Starts at `min` when not set.
       * @category behavior
       */
      value: {
        type: Number
      },
    };
  }

  /**
   * Registers the custom element with the browser.
   * @param {string} [name="auro-counter"] - The tag name to register the element under.
   * @example
   * AuroCounter.register("custom-counter") // registers <custom-counter/>
   */
  static register(name = "auro-counter") {
    AuroLibraryRuntimeUtils.prototype.registerComponent(name, AuroCounter);
  }

  static get styles() {
    return [
      tokensCss,
      colorCss,
      styleCss
    ];
  }

  /**
   * Increases the value by 1, or by the given amount. Does nothing when the counter is disabled or already at its maximum, and doesn't cap a larger step at `max`.
   * @method increment
   * @param {number} [value] - The amount to add. Defaults to 1.
   * @returns {void}
   */
  increment(value) {
    if (this.disabled || this.disableMax || this.value >= this.max) {
      return;
    }

    this.value += value !== undefined ? value : 1;
  }

  /**
   * Decreases the value by 1, or by the given amount. Does nothing when the counter is disabled or already at its minimum, and doesn't stop a larger step at `min`.
   * @method decrement
   * @param {number} [value] - The amount to subtract. Defaults to 1.
   * @returns {void}
   */
  decrement(value) {
    if (this.disabled || this.disableMin || this.value <= this.min) {
      return;
    }

    this.value -= value !== undefined ? value : 1;
  }

  /**
   * Moves focus to the spinbutton control container.
   * The +/- buttons are internal `tabindex="-1"` controls; the container is the
   * widget's single focusable element. `focusVisible: true` forces the container's
   * `:focus-visible` ring to render even though the interaction was a pointer
   * click, so focus stays visible on the counter after using its buttons.
   * @private
   */
  focusControl() {
    const control = this.shadowRoot?.querySelector('[part="counterControl"]');
    if (control && !this.disabled) {
      // `focusVisible` is a progressive enhancement: it is not yet in the standard
      // FocusOptions interface (Chrome 86+, Firefox 116+, Safari 15.4+). Browsers
      // that do not recognize it still move focus correctly — they simply do not
      // render the `:focus-visible` ring. Do not treat a missing ring on an older
      // engine as a regression.
      control.focus({ focusVisible: true });
    }
  }

  /**
   * Called when someone clicks the minus or plus button.
   * A pointer click focuses the clicked button, so if the value change disables
   * that button at an extreme the browser would drop focus to the document body.
   * Move focus to the spinbutton container first, then change the value: focus is
   * no longer on the button when it becomes disabled, so it is never lost and the
   * counter (and any enclosing dropdown) stays operable (AB#1634231).
   * @param {'increment' | 'decrement'} action - The control action to perform.
   * @private
   */
  handleControlClick(action) {
    this.focusControl();
    this[action]();
  }

  /**
   * Initializes the value of the counter.
   * If the current value is undefined, it sets the value to the minimum value.
   * @private
   */
  initValue() {
    if (this.value === undefined) {
      this.value = this.min;
    }
  }

  /**
   * Checks whether the button for the given limit should be turned off, based on the current value.
   * Used for both buttons: pass `min` for the minus button and `max` for the plus button.
   *
   * @param {number} extrema - The limit to compare the current value against, either `min` or `max`.
   * @returns {boolean} True if the value is at or past that limit; false otherwise.
   * @private
   */
  isIncrementDisabled(extrema) {
    // Initially, the value is undefined and then set to the minimum value. During this transition, the increment button should be disabled.
    if (this.value === undefined) {
      return false;
    } else if (extrema === this.min && this.value > extrema) {
      return false;
    } else if (extrema === this.max && this.value < extrema) {
      return false;
    }

    return true;
  }

  /**
   * Checks the counter's value against `min`, `max`, and the `error` attribute, and updates `validity`.
   * @param {boolean} [force=false] - If true, validates even while the counter has focus. If false, skips validation while the counter has focus.
   */
  validate(force = false) {
    this.validation.validate(this, force);
  }

  /**
   * Sets the value back to `min` and clears the counter's validation state, as other Auro form elements do when reset.
   * @returns {void}
   */
  reset() {
    // validation.reset() clears validity/touched and sets value to undefined; initValue() then restores the min floor.
    this.validation.reset(this);
    this.initValue();
  }

  firstUpdated() {
    this.initValue();
    this.setTagAttribute("auro-counter");
  }

  /**
   * Sets an attribute that matches the default tag name if the tag name isn't the default.
   * @param {string} tagName - The tag name to set as an attribute.
   * @private
   */
  setTagAttribute(tagName) {
    if (this.tagName.toLowerCase() !== tagName) {
      this.setAttribute(tagName, true);
    }
  }

  /**
   * Called when the default slot's content changes.
   * Stores the trimmed text of the first assigned node in `defaultSlot`.
   *
   * @param {Event} event - The event object representing the slot change event.
   * @private
   */
  onDefaultSlotChange(event) {
    const assignedNodes = event.target.assignedNodes();
    if (assignedNodes.length > 0) {
      this.defaultSlot = assignedNodes[0].textContent.trim();
    }
  }

  updated(changedProperties) {
    if (changedProperties.has("value")) {
      this.validate();
      this.dispatchEvent(
        new CustomEvent("input", {
          detail: {
            value: this.value,
          },
        }),
        {
          bubbles: true,
          composed: true,
        }
      );
    }
  }

  /**
   * Renders the help text, or the error message while the counter is invalid.
   * @private
   * @returns {TemplateResult} The help text or error message template.
   */
  renderHelpText() {
    return html`
      ${!this.validity || this.validity === undefined || this.validity === 'valid'
        ? html`
          <${this.helpTextTag} appearance="${this.onDark ? 'inverse' : this.appearance}">
            <p id="${this.uniqueId}" part="helpText">
              <slot name="helpText"></slot>
            </p>
          </${this.helpTextTag}>
        `
        : html`
          <${this.helpTextTag} error appearance="${this.onDark ? 'inverse' : this.appearance}"">
            <p id="${this.uniqueId}" role="alert" aria-live="assertive" part="helpText">
              ${this.errorMessage}
            </p>
          </${this.helpTextTag}>
        `
      }
    `;
  }

  render() {
    return html`
      <!-- Hidden slots for button aria-labels -->
      <slot name="ariaLabel.minus" hidden @slotchange=${this.requestUpdate}></slot>
      <slot name="ariaLabel.plus" hidden @slotchange=${this.requestUpdate}></slot>

      <div class="counterWrapper">
        <div class="counter">
          <div class="content" id="counter-label">
            <label class="label">
              <slot @slotchange="${this.onDefaultSlotChange}"></slot>
            </label>
            <slot name="description" class="body-xs"></slot>
          </div>
          <div
            part="counterControl"
            aria-disabled="${ifDefined(this.disabled ? 'true' : undefined)}"
            aria-labelledby="counter-label"
            aria-valuemax="${this.max}"
            aria-valuemin="${this.min}"
            aria-valuenow="${this.value}"
            aria-valuetext="'${this.value !== undefined ? this.value : this.min}'"
            role="spinbutton"
            tabindex="${this.disabled ? '-1' : '0'}"
          >
            <auro-counter-button
              aria-label="${this.runtimeUtils.getSlotText(this, 'ariaLabel.minus') || '−'}"
              .tabindex="${'-1'}"
              appearance="${this.onDark ? 'inverse' : this.appearance}"
              part="controlMinus"
              @click="${() => this.handleControlClick('decrement')}"
              ?disabled="${this.disabled || this.disableMin || this.isIncrementDisabled(this.min)}"
            >
              <${this.iconTag} class="controlIcon" customSvg> ${IconUtil.generateSvgHtml(minusIcon)} </${this.iconTag}>
            </auro-counter-button>

            <div class="quantityWrapper body-lg">
              <div>${this.value !== undefined ? this.value : this.min}</div>
            </div>
            <auro-counter-button
              aria-label="${this.runtimeUtils.getSlotText(this, 'ariaLabel.plus') || '+'}"
              .tabindex="${'-1'}"
              appearance="${this.onDark ? 'inverse' : this.appearance}"
              part="controlPlus"
              @click="${() => this.handleControlClick('increment')}"
              ?disabled="${this.disabled || this.disableMax || this.isIncrementDisabled(this.max)}"
            >
              <${this.iconTag} class="controlIcon" customSvg> ${IconUtil.generateSvgHtml(plusIcon)} </${this.iconTag}>
            </auro-counter-button>
          </div>
        </div>
       ${this.renderHelpText()}
      </div>
    `;
  }
}

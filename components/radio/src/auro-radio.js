/* eslint-disable max-lines, no-underscore-dangle */
// Copyright (c) 2026 Alaska Airlines. All rights reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

import { LitElement, html } from "lit";
import { classMap } from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';

// Import touch detection lib
import "focus-visible/dist/focus-visible.min.js";

import styleCss from "./styles/style-css.js";
import colorCss from './styles/color-css.js';
import tokenCss from './styles/tokens-css.js';

// Import library runtime utils
import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';

/**
 * A radio button that lets people choose one option from a set, used inside an `auro-radio-group`.
 *
 * **Key capabilities**
 * - **Preselected option**: Set `checked` to show the option as selected when the page loads.
 * - **Disabled option**: Set `disabled` to stop people from selecting the option.
 * - **Extra description**: Put supporting text in the `content` slot to show it below the label.
 * - **Dark backgrounds**: Set `appearance="inverse"` to use colors made for dark backgrounds.
 *
 * **Example**
 *
 * ```html
 * <auro-radio-group>
 *   <span slot="legend">Seat preference</span>
 *   <auro-radio value="window" name="seat">Window seat</auro-radio>
 *   <auro-radio value="aisle" name="seat">Aisle seat</auro-radio>
 * </auro-radio-group>
 * ```
 * @summary A radio button for choosing one option from a set, with preselected, disabled, and dark-background styles.
 * @customElement auro-radio
 *
 * @slot default - Label text for the radio button, such as "Window seat". Replaces the `label` attribute when set.
 * @slot content - Extra content shown below the label, such as a short description of the option.
 *
 * @event toggleSelected - Fires when someone selects the radio button. `auro-radio-group` listens for it to update its selection.
 * @event {CustomEvent<any>} change - Deprecated: Use the `input` event instead. Fires when someone selects the radio button.
 * @event {Event} input - Fires when someone selects the radio button.
 * @event focusSelected - Fires when the radio button gets focus.
 * @event auroRadio-blur - Fires when the radio button loses focus.
 * @event resetRadio - Fires whenever the radio button's `checked` state changes, including on first render.
 * @event auroRadio-selected - Fires when the radio button becomes checked, whether someone selects it or `checked` is set in code.
 *
 * @csspart radio - The container that wraps the radio button's input and label.
 * @csspart radio-input - The native `<input type="radio">` element. It's visually hidden, so styles on this part don't change the visible circle.
 * @csspart radio-label - The `<label>` element that holds the label text and draws the visible circle.
 */
export class AuroRadio extends LitElement {
  constructor() {
    super();

    this._initializeDefaults();
  }

  _initializeDefaults() {
    this.appearance = "default";
    this.checked = false;
    this.disabled = false;
    this.required = false;
    this.error = false;
    this.onDark = false;
    this.touched = false;
    this.role = 'radio';

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

  // function to define props used within the scope of this component
  static get properties() {
    return {

      /**
       * Sets the radio button colors to match its background. Use `inverse` on dark backgrounds and `default` on light ones.
       * Inside an `auro-radio-group`, the group's `appearance` replaces this value.
       * @type {'default' | 'inverse'}
       * @default 'default'
       * @category ui
       */
      appearance: {
        type: String,
        reflect: true
      },

      /**
       * Selects the radio button and fills its circle. Set it in markup to preselect an option.
       * @category behavior
       */
      checked: {
        type: Boolean,
        reflect: true
      },

      /**
       * Turns the radio button off, so it can't be selected.
       * A disabled radio button is shown in a muted style, and arrow keys skip it.
       * @category ui
       */
      disabled: {
        type: Boolean,
        reflect: true
      },

      /**
       * Shows the radio button in its error style.
       * Inside an `auro-radio-group`, the group sets and clears this from its own validation, so set `error` on the group instead.
       * @category behavior
       */
      error: {
        type: Boolean,
        reflect: true
      },

      /**
       * Sets a unique identifier for the radio button, such as `seat-window` (the `id` attribute).
       * @category behavior
       */
      id: {
        type: String,
        reflect: true
      },

      /**
       * ID for input node.
       * @private
       */
      inputId: {
        type: String,
        reflect: false,
        attribute: false
      },

      /**
       * Sets the label text for the radio button, such as "Window seat".
       * Content in the default slot replaces it.
       * @category ui
       */
      label:    { type: String },

      /**
       * Sets the name of the radio button's inner `<input>` element, such as `seat` (the input's `name`).
       * This doesn't group radio buttons or add them to form data: `auro-radio-group` groups them, and `auro-form` reads the group's `name` attribute.
       * @category behavior
       */
      name:     { type: String },

      /**
       * Deprecated: Use `appearance="inverse"` instead.
       * Shows the radio button in colors made for dark backgrounds.
       * @deprecated Use `appearance="inverse"` instead.
       * @category ui
       */
      onDark: {
        type: Boolean,
        attribute: 'ondark',
        reflect: true
      },

      /**
       * Tells screen readers that a selection is required, by setting `aria-required`.
       * Inside an `auro-radio-group`, the group sets this from its own `required`, so set `required` on the group instead.
       * @category behavior
       */
      required: {
        type: Boolean,
        reflect: true
      },

      /**
       * Kept out of the API docs, because changing it can easily break accessibility.
       * @private
       */
      role: {
        type: String,
        reflect: true
      },

      /**
       * Whether or not the radio button has been touched by the user.
       * @private
       */
      touched: {
        type: Boolean,
        reflect: true,
        attribute: false
      },

      /**
       * Sets the value the group takes when this radio button is selected, such as `window`.
       * @requiredWhen always
       * @category behavior
       */
      value:    { type: String }
    };
  }

  /**
   * Registers the element with the browser under a tag name.
   * @param {string} [name="auro-radio"] - The tag name to register the element under.
   *
   * @example
   * AuroRadio.register("custom-radio") // registers the element as <custom-radio>
   *
   */
  static register(name = "auro-radio") {
    AuroLibraryRuntimeUtils.prototype.registerComponent(name, AuroRadio);
  }

  /**
   * Called when the inner `<input>` fires `change`.
   * Updates `checked` and dispatches the event again from the host, because a native `change` event doesn't cross the shadow DOM boundary.
   * @private
   * @param {Event} event - The `change` event from the inner `<input>`.
   * @returns {void}
   */
  handleChange(event) {
    this.checked = event.target.checked;
    const customEvent = new CustomEvent(event.type, event);
    this.dispatchEvent(customEvent);
  }

  /**
   * Called when the inner `<input>` fires `input`.
   * Updates `checked` and dispatches `toggleSelected` so the group can update its selection.
   * @private
   * @param {Event} event - The `input` event from the inner `<input>`.
   * @returns {void}
   */
  handleInput(event) {
    this.checked = event.target.checked;
    this.dispatchEvent(new CustomEvent('toggleSelected', {
      bubbles: true,
      composed: true,
      target: this
    }));
  }

  /**
   * Called when the radio button gets focus.
   * Marks it as interacted with and dispatches `focusSelected`.
   * @private
   * @param {Event} event - The `focus` event.
   * @returns {void}
   */
  handleFocus(event) {
    this.touched = true;
    this.dispatchEvent(new CustomEvent('focusSelected', {
      bubbles: true,
      composed: true,
      target: event.target
    }));
  }

  /**
   * Called when the radio button loses focus. Dispatches `auroRadio-blur`.
   * @private
   * @param {Event} event - The `blur` event.
   * @returns {void}
   */
  handleBlur(event) {
    this.dispatchEvent(new CustomEvent('auroRadio-blur', {
      bubbles: true,
      composed: true,
      target: event.target
    }));
  }

  /**
   * Resets the radio button: unchecks it, removes its error style, and marks it as not yet interacted with.
   * @returns {void}
   */
  reset() {
    this.touched = false;
    this.checked = false;
    this.error = false;
  }

  updated(changedProperties) {
    if (changedProperties.has('required')) {
      this.setAttribute('aria-required', this.isRequired(this.required));
    }

    if (changedProperties.has('disabled')) {
      if (this.disabled) {
        this.setAttribute('aria-disabled', '');
      } else {
        this.removeAttribute('aria-disabled');
      }
    }

    if (changedProperties.has('checked')) {
      this.setAttribute('aria-checked', this.checked ? 'true' : 'false');
      // eslint-disable-next-line no-magic-numbers
      this.setAttribute('tabindex', this.checked ? 0 : -1);

      this.dispatchEvent(new CustomEvent('resetRadio', {
        bubbles: true,
        composed: true
      }));

      if (this.checked) {
        this.dispatchEvent(new CustomEvent('auroRadio-selected', {
          bubbles: true,
          composed: true
        }));
      }
    }
  }

  /**
   * Gets the `aria-required` value for the radio button's required state.
   * @private
   * @param {Boolean} required - The radio button's `required` state.
   * @returns {string} The `aria-required` value: `'true'` or `'false'`.
   */
  isRequired(required) {
    if (required) {
      return 'true';
    }

    return 'false';
  }

  firstUpdated() {
    // Add the tag name as an attribute if it is different than the component name
    this.runtimeUtils.handleComponentTagRename(this, 'auro-radio');

    this.addEventListener('focus', this.handleFocus);
    this.addEventListener('blur', this.handleBlur);

    this.input = this.shadowRoot.querySelector('input');

    this.inputId = this.id ? `${this.id}-input` : window.crypto.randomUUID();

    this.addEventListener('click', () => {
      this.input.click();
    });
  }

  // function that renders the HTML and CSS into  the scope of the component
  render() {
    const labelClasses = {
      'ods-inputLabel': true,
      'ods-inputLabel--radio': true,
      'label': true,
      'label--rdo': true,
      'errorBorder': this.error
    };

    return html`
      <div class="ods-inputGroup rdoGroup body-default" part="radio">
        <input
          class="util_displayHidden ods-inputOption rdo--input"
          part="radio-input"
          @input="${this.handleInput}"
          @change="${this.handleChange}"
          ?disabled="${this.disabled}"
          .checked="${this.checked}"
          id="${this.inputId}"
          name="${ifDefined(this.name)}"
          type="radio"
          .value="${this.value}"
          aria-hidden="true"
          tabindex="-1"
        />

        <label for="${this.inputId}" class="${classMap(labelClasses)}" part="radio-label">
          <slot>${this.label}</slot>
        </label>
      </div>
      <slot name="content" class="slotContent"></slot>
    `;
  }
}

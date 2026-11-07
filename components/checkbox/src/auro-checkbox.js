// Copyright (c) 2026 Alaska Airlines. All rights reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

/* eslint-disable max-lines, no-underscore-dangle */

import { LitElement, html } from "lit";
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import styleCss from "./styles/auro-checkbox-css.js";
import colorCss from "./styles/color-css.js";
import tokensCss from "./styles/tokens-css.js";

import checkLg from '@alaskaairux/icons/dist/icons/interface/check-lg.mjs';

import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';

/**
 * A checkbox that lets people turn one option on or off, usually as one of several choices in an `auro-checkbox-group`.
 *
 * **Key capabilities**
 * - **Preselected options**: Set `checked` to show the option as selected when the page loads.
 * - **Disabled options**: Set `disabled` to stop people from changing the option.
 * - **Dark backgrounds**: Set `appearance="inverse"` to use colors made for dark backgrounds.
 * - **Accessible label**: The checkbox always uses its text content as the name screen readers announce.
 *
 * **Example**
 *
 * ```html
 * <auro-checkbox-group>
 *   <span slot="legend">Seat preferences</span>
 *   <auro-checkbox value="window" name="seat">Window seat</auro-checkbox>
 *   <auro-checkbox value="aisle" name="seat">Aisle seat</auro-checkbox>
 * </auro-checkbox-group>
 * ```
 * @summary A checkbox for turning a single option on or off, with preselected, disabled, and dark-background styles.
 * @customElement auro-checkbox
 *
 * @csspart checkbox - The container that wraps the checkbox's box and its label.
 * @csspart checkbox-input - The native `<input type="checkbox">` element. It's visually hidden, so styles on this part don't change the visible box.
 * @csspart checkbox-label - The element that wraps the label text from the default slot.
 *
 * @slot default - Label text for the checkbox, such as "Window seat". Screen readers announce this text as the checkbox's name. {@requiredWhen always} {@category ui}
 *
 * @event change - Deprecated: Use the `input` event instead. Fires when someone checks or unchecks the checkbox.
 * @event input - Fires when someone checks or unchecks the checkbox.
 * @event auroCheckbox-input - Deprecated: Use the `input` event instead. Fires when someone checks or unchecks the checkbox.
 * @event auroCheckbox-focusin - Fires when the checkbox gets focus or is clicked.
 * @event auroCheckbox-focusout - Fires when the checkbox loses focus.
 */

// build the component class
export class AuroCheckbox extends LitElement {
  constructor() {
    super();

    this._initializeDefaults();
  }

  _initializeDefaults() {
    this.appearance = 'default';
    this.checked = false;
    this.disabled = false;
    this.error = false;
    this.onDark = false;
    this.touched = false;
    this.tabIndex = 0;
    this.ariaChecked = 'false';
    this.role = 'checkbox';

    /**
     * @private
     */
    this.runtimeUtils = new AuroLibraryRuntimeUtils();
  }

  static get styles() {
    return [
      styleCss,
      colorCss,
      tokensCss
    ];
  }

  // function to define props used within the scope of this component
  static get properties() {
    return {
      ...super.properties,

      /**
       * Sets the checkbox colors to match its background. Use `inverse` on dark backgrounds and `default` on light ones.
       * Inside an `auro-checkbox-group`, the group's `appearance` replaces this value.
       * @type {'default' | 'inverse'}
       * @default 'default'
       * @category ui
       */
      appearance: {
        type: String,
        reflect: true
      },

      /**
       * Selects the checkbox and shows a checkmark. Set it in markup to preselect an option.
       * @category behavior
       */
      checked: {
        type: Boolean,
        reflect: true
      },

      /**
       * Turns the checkbox off, so clicks and the Space key don't change it.
       * A disabled checkbox is shown in a muted style but stays in the keyboard tab order.
       * @category ui
       */
      disabled: {
        type: Boolean,
        reflect: true
      },

      /**
       * Shows the checkbox in its error style.
       * Inside an `auro-checkbox-group`, the group sets and clears this from its own validation, so set `error` on the group instead.
       * @category behavior
       */
      error: {
        type: Boolean,
        reflect: true
      },

      /**
       * Sets a unique identifier for the checkbox, such as `seat-window` (the `id` attribute).
       * @category behavior
       */
      id: {
        type: String,
        reflect: true
      },

      /**
       * The `id` of the inner `<input>` element.
       * @private
       */
      inputId: {
        type: String,
        reflect: false,
        attribute: false
      },

      /**
       * Sets the name of the checkbox's inner `<input>` element, such as `seat` (the input's `name`).
       * This doesn't add the checkbox to form data: `auro-form` reads the `name` attribute of the `auro-checkbox-group` instead.
       * @category behavior
       */
      name: { type: String },

      /**
       * Deprecated: Use `appearance="inverse"` instead.
       * Shows the checkbox in colors made for dark backgrounds.
       * @deprecated Use `appearance="inverse"` instead.
       * @category ui
       */
      onDark: {
        type: Boolean,
        attribute: 'ondark',
        reflect: true
      },

      /**
       * Indicates whether the checkbox has been interacted with.
       * @private
       */
      touched: {
        type: Boolean,
        reflect: true,
        attribute: false
      },

      /**
       * Sets the value the checkbox adds to the group's selected values when it's checked, such as `window`.
       * Use a value that's unique within the `auro-checkbox-group`.
       * @requiredWhen always
       * @category behavior
       */
      value: {
        type: String,
        reflect: false
      },

      /**
       * The checkbox's `tabindex` attribute.
       * @private
       */
      tabIndex: {
        type: Number,
        reflect: true,
        attribute: 'tabindex'
      },

      /**
       * The checkbox's `aria-checked` attribute.
       * @private
       */
      ariaChecked: {
        type: String,
        reflect: true,
        attribute: 'aria-checked'
      },

      /**
       * The checkbox's `aria-disabled` attribute.
       * @private
       */
      ariaDisabled: {
        type: String,
        reflect: true,
        attribute: 'aria-disabled'
      },

      /**
       * The ARIA role for the element. Must remain `checkbox` for screen readers
       * to correctly identify this as a checkbox control.
       * @private
       */
      role: {
        type: String,
        reflect: true
      },

    };
  }

  /**
   * Registers the element with the browser under a tag name.
   * @param {string} [name="auro-checkbox"] - The tag name to register the element under.
   *
   * @example
   * AuroCheckbox.register("custom-checkbox") // registers the element as <custom-checkbox>
   *
   */
  static register(name = "auro-checkbox") {
    AuroLibraryRuntimeUtils.prototype.registerComponent(name, AuroCheckbox);
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
   * Updates `checked` and dispatches the deprecated `auroCheckbox-input` event, which `auro-checkbox-group` listens for.
   * @private
   * @param {Event} event - The `input` event from the inner `<input>`.
   * @returns {void}
   */
  handleInput(event) {
    this.checked = event.target.checked;

    // Old event we need to deprecate
    this.dispatchEvent(new CustomEvent('auroCheckbox-input', {
      bubbles: true,
      cancelable: false,
      composed: true,
    }));
  }

  /**
   * Called when the checkbox gets focus or is clicked.
   * Marks the checkbox as interacted with and dispatches `auroCheckbox-focusin`.
   * @private
   * @returns {void}
   */
  handleFocusin() {
    this.touched = true;
    this.dispatchEvent(new CustomEvent('auroCheckbox-focusin', {
      bubbles: true,
      cancelable: false,
      composed: true,
    }));
  }

  /**
   * Creates the checkmark SVG element shown while the checkbox is checked.
   * @private
   * @returns {SVGElement} The checkmark `<svg>` element.
   */
  generateIconHtml() {
    this.dom = new DOMParser().parseFromString(checkLg.svg, 'text/html');
    this.svg = this.dom.body.firstChild;

    this.svg.classList.add('svg--cbx');

    return this.svg;
  }

  /**
   * Resets the checkbox: unchecks it, removes its error style, and marks it as not yet interacted with.
   * @returns {void}
   */
  reset() {
    this.checked = false;
    this.error = false;
    this.touched = false;
  }

  /**
   * Called when the default slot content changes.
   * Sets the host's `aria-label` to the slot text, so screen readers announce it as the checkbox's name.
   * @private
   * @returns {void}
   */
  updateAriaLabel() {
    const slot = this.shadowRoot.querySelector('slot');
    const text = slot.assignedNodes().
      map((node) => node.textContent).
      join('').
      trim();
    if (text) {
      this.setAttribute('aria-label', text);
    }
  }

  firstUpdated() {
    // Add the tag name as an attribute if it is different than the component name
    this.runtimeUtils.handleComponentTagRename(this, 'auro-checkbox');

    this.inputId = this.id ? `${this.id}-input` : window.crypto.randomUUID();

    this.addEventListener('click', (evt) => {
      // Only prevent default for real user events, not tests or programmatic calls
      if (evt.isTrusted) {
        evt.preventDefault();
      }

      if (!this.disabled) {
        this.shadowRoot.querySelector('input').click();
        this.handleFocusin();
      }
    });

    this.addEventListener('focusin', () => {
      this.handleFocusin();
    });

    this.addEventListener('focusout', () => {
      this.dispatchEvent(new CustomEvent('auroCheckbox-focusout', {
        bubbles: true,
        cancelable: false,
        composed: true,
      }));
    });
  }

  connectedCallback() {
    super.connectedCallback();

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.addEventListener('keydown', this.handleKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener('keydown', this.handleKeyDown);
  }

  /**
   * Called after each update.
   * Keeps `aria-checked` and `aria-disabled` in sync with `checked` and `disabled`.
   * @private
   * @param {Map} changedProperties - The properties that changed in this update.
   * @returns {void}
   */
  updated(changedProperties) {
    super.updated(changedProperties);

    if (changedProperties.has('checked')) {
      this.ariaChecked = this.checked ? 'true' : 'false';
    }

    if (changedProperties.has('disabled')) {
      this.ariaDisabled = this.disabled ? 'true' : undefined;
    }
  }

  /**
   * Called when a key is pressed while the checkbox has focus.
   * Toggles the checkbox when the key is Space and the checkbox isn't disabled.
   * @private
   * @param {KeyboardEvent} event - The `keydown` event from the checkbox.
   * @returns {void}
   */
  handleKeyDown(event) {
    if (event.key === ' ' && !this.disabled) {
      event.preventDefault();

      this.shadowRoot.querySelector('input').click();
    }
  }

  /**
   * @private
   * @returns {import('lit').TemplateResult} The checkbox's rendered template.
   */
  render() {
    const labelClasses = {
      'label': true,
      'label--cbx': true,
      'errorBorder': this.error
    };

    return html`
      <div class="cbxContainer body-default" part="checkbox">
        <div class="inputContainer">
          <input
            class="util_displayHidden cbx--input"
            part="checkbox-input"
            @change="${this.handleChange}"
            @input="${this.handleInput}"
            ?disabled="${this.disabled}"
            ?checked="${this.checked}"
            id="${this.inputId}"
            name="${ifDefined(this.name)}"
            type="checkbox"
            .value="${this.value}"
            aria-hidden="true"
            tabindex="-1"
          />
          ${this.checked ? this.generateIconHtml() : undefined}
        </div>

        <span class="${classMap(labelClasses)}" part="checkbox-label">
          <slot @slotchange="${this.updateAriaLabel}"></slot>
        </span>
      </div>
    `;
  }
}

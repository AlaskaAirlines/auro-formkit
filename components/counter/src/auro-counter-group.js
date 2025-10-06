/*
  eslint-disable
  lit/no-invalid-html,
  lit/binding-positions,
  max-lines,
  no-underscore-dangle,
  arrow-parens,
  no-confusing-arrow,
  curly,
  dot-location,
  no-inline-comments,
  line-comment-position,
*/

// Copyright (c) 2025 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

import { html } from "lit/static-html.js";
import { LitElement } from "lit";

import tokens from "./styles/tokens-css.js";
import counterGroupStyles from "./styles/counter-group-css.js";
import shapeSizeCss from "./styles/shapeSize-css.js";

import AuroLibraryRuntimeUtils from "@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs";
import AuroFormValidation from "@auro-formkit/form-validation";

import { AuroDependencyVersioning } from "@aurodesignsystem/auro-library/scripts/runtime/dependencyTagVersioning.mjs";
import { AuroDropdown } from "@aurodesignsystem/auro-dropdown";
import dropdownVersion from "./dropdownVersion.js";

import { AuroBibtemplate } from '@aurodesignsystem/auro-bibtemplate';
import bibTemplateVersion from './bibtemplateVersion.js';

import { AuroHelpText } from '@aurodesignsystem/auro-helptext';
import helptextVersion from './helptextVersion.js';

import './auro-counter-wrapper.js';
import { AuroElement } from "../../layoutElement/src/auroElement.js";
import { classMap } from "lit/directives/class-map.js";

import { AuroIcon } from '@aurodesignsystem-dev/auro-icon/class';
import iconVersion from "./iconVersion.js";

/**
 * Auro Counter Group is a group of counter components.
 *
 * This web component provides a flexible interface for grouping multiple counters, supporting
 * validation, custom validity messages, and disabled states based on the group's value.
 *
 * @element auro-counter-group
 * @extends LitElement
 * @slot default - Slot for counter elements.
 * @slot ariaLabel.bib.close - Sets aria-label on close button in fullscreen bib
 * @slot bib.fullscreen.headline -  Defines the headline to display above menu-options. Only used when `isDropdown` is true. Required.
 * @slot bib.fullscreen.footer -  Defines the footer to display at the bottom of fullscreen bib. Only used when `isDropdown` is true.
 * @slot label - Dropdown label content. Only used when `isDropdown` is true.
 * @slot valueText - Dropdown value text display. Only used when `isDropdown` is true.
 * @slot helpText - Dropdown help text content. Only used when `isDropdown` is true.
 * @property {'classic'|'snowflake'} layout - Determines the layout style of the counter group when it is a dropdown. Options are 'classic' or 'snowflake'. Default is 'classic'.
 */
export class AuroCounterGroup extends AuroElement {
  constructor() {
    super();

    this.max = undefined;
    this.min = undefined;
    this.onDark = false;
    this.total = undefined;
    this.validity = undefined;
    this.value = undefined;

    this.matchWidth = false;
    this.isDropdown = false;
    this.fullscreenBreakpoint = 'sm';
    this.largeFullscreenHeadline = false;
    this.autoPlacement = false;
    this.noFlip = false;
    this.shift = false;

    this.placement = 'bottom-start';

    /**
     * @private
     */
    this.counters = undefined;

    /**
     * @private
     */
    this.dropdown = undefined;

    /**
     * @private
     */
    this.bibtemplate = undefined;

    /**
     * @private
     */
    this.validation = new AuroFormValidation();

    /** @private */
    this.updateValue = this.updateValue.bind(this);

    /** @private */
    this.updateValidity = this.updateValidity.bind(this);

    /**
     * Generate unique names for dependency components.
     * @private
     */
    const versioning = new AuroDependencyVersioning();

    /**
     * Dynamically generated dropdown tag.
     * @private
     * @type {string}
     */
    this.dropdownTag = versioning.generateTag("auro-formkit-counter-dropdown", dropdownVersion, AuroDropdown);

    /**
     * Dynamically generated bibtempalate tag.
     * @private
     * @type {string}
     */
    this.bibtemplateTag = versioning.generateTag('auro-formkit-counter-bibtemplate', bibTemplateVersion, AuroBibtemplate);

    /**
     * Dynamically generated helpText tag.
     * @private
     * @type {string}
     */
    this.helpTextTag = versioning.generateTag("auro-formkit-counter-helptext", helptextVersion, AuroHelpText);

    /**
     * @private
     */
    this.iconTag = versioning.generateTag('auro-formkit-input-icon', iconVersion, AuroIcon);
  }

  static get styles() {
    return [
      tokens,
      counterGroupStyles,
      shapeSizeCss
    ];
  }

  static get properties() {
    return {

      ...super.properties,

      /**
       * If declared, bib's position will be automatically calculated where to appear.
       * @default false
       */
      autoPlacement: {
        type: Boolean,
        reflect: true
      },

      /**
       * The current error message to display when the component is invalid.
       */
      error: {
        type: String,
        reflect: false
      },

      /**
       * The current error message to display when the component is invalid.
       * This is set by validation and is not available to consumers.
       * @private
       */
      errorMessage: {
        type: String,
        reflect: false,
        attribute: false
      },

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
       * Indicates if the counter group is displayed as a dropdown.
       */
      isDropdown: {
        type: Boolean
      },

      /**
       * If declared, the dropdown will expand to the width of its parent container.
       * Otherwise, the dropdown width will be determined by its content.
       */
      matchWidth: {
        type: Boolean,
        reflect: true
      },

      /**
       * The maximum value allowed for the whole group of counters.
       */
      max: {
        type: Number,
        reflect: true,
      },

      /**
       * The minimum value allowed for the whole group of counters.
       */
      min: {
        type: Number,
        reflect: true,
      },

      /**
       * If declared, make bib.fullscreen.headline in HeadingDisplay.
       * Otherwise, Heading 600.
       */
      largeFullscreenHeadline: {
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
       * If declared, the dropdown will shift its position to avoid being cut off by the viewport.
       * @default false
       */
      shift: {
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
       * If declared, counters and dropdown will be rendered with onDark styles.
       */
      onDark: {
        type: Boolean,
        reflect: true
      },

      /**
       * Position where the bib should appear relative to the trigger.
       * Accepted values:
       * "top" | "right" | "bottom" | "left" |
       * "bottom-start" | "top-start" | "top-end" |
       * "right-start" | "right-end" | "bottom-end" |
       * "left-start" | "left-end".
       * @default bottom-start
       */
      placement: {
        type: String,
        reflect: true
      },

      /**
       * The total value of the counters.
       */
      total: {
        type: Number,
      },

      /**
       * Reflects the validity state.
       */
      validity: {
        type: String,
        reflect: true,
      },

      /**
       * The current individual values of the nested counters.
       */
      value: {
        type: Object,
      },

      /**
       * The current text in the valueText slot.
       * @private
       */
      valueText: {
        type: String,
        reflect: false,
        attribute: false
      }
    };
  }

  /**
   * Dynamically disables increment/decrement buttons on a counter based on group value.
   * This method checks the total aggregated value against the group's min and max properties.
   * If the total value is at or below the minimum, the counter's decrement button is disabled; if at or above the maximum, the increment button is disabled.
   *
   * @param {HTMLElement} counter - The counter element to potentially disable.
   * @private
   */
  manageDisabled(counter) {
    counter.disableMax = false;
    counter.disableMin = false;

    if (this.total <= this.min) {
      counter.disableMin = true;
    } else if (this.total >= this.max) {
      counter.disableMax = true;
    }
  }

  /**
   * Attaches input event listeners to all auro-counter elements within the component.
   * This method selects all `auro-counter` and `[auro-counter]` elements and adds an `input` event listener to each.
   * The listener calls `this.updateValue()` whenever the value of a counter changes.
   * @private
   */
  configureCounters() {
    this.counters = this.querySelectorAll("auro-counter, [auro-counter]");
    this.counters.forEach((counter) => {
      counter.onDark = this.onDark;
      counter.addEventListener("input", this.updateValue);
      counter.addEventListener("auroFormElement-validated", this.updateValidity);
    });
  }

  /**
   * Renders help text error messages.
   * @param {Array<string>} messages - The error messages to render.
   * @returns {TemplateResult[]} - The rendered error messages rendered in a TemplateResult.
   * @private
   */
  renderHelpTextErrors(messages) {

    // Return empty template if no messages are provided
    if (!messages || messages.length === 0) return html``;

    // Return messages as a TemplateResult
    return messages.map(message => html`<p>${message}</p>`);
  }

  /**
   * Gets and returns an array of counters in an invalid state.
   * @returns {Array<HTMLElement>} - Returns an array of invalid counters.
   * @param {NodeList} counters - The NodeList of counter elements to check.
   * @private
   */
  getInvalidCounters(counters) {
    return Array.from(counters).filter(counter => counter.validity && counter.validity !== 'valid');
  }

  /**
   * Gets all valid error messages from errored counters.
   * @param {NodeList} invalidCounters - The NodeList of counter elements to check.
   * @returns {Array<string>} - Returns an array of error messages from invalid counters.
   * @private
   */
  getErrorMessages(invalidCounters) {
    return invalidCounters
      .map(counter => counter.errorMessage)
      .filter(message => message && message.length > 0);
  };

  /**
   * Updates the validity of the counter group based on the validity of its counters.
   * This method checks all counters within the group, determines if any are invalid, and updates the group's validity state and error message accordingly.
   * If any counter is invalid, it generates a combined error message from all invalid counters.
   * @returns {void}
   * @private
   */
  updateValidity () {

    // We don't need to do anything if there are no counters
    if (!this.counters) return;

    // Wait for initial validation to complete before updating validity and error message
    // This is necessary because we need the initial validation to know when to reset the validity and error message
    setTimeout(() => {

      // Get any invalid counters
      const invalidCounters = this.getInvalidCounters(this.counters);

      // Determine if we are in an invalid state based on the presence of invalid counters
      const isInvalid = invalidCounters.length > 0;

      // If we are in an invalid state
      if (isInvalid) {

        // Generate the error messages
        const errorMessages = this.getErrorMessages(invalidCounters);

        const errorMessage = isInvalid ? this.renderHelpTextErrors(errorMessages) : this.errorMessage;

        // Set the validity and error message
        // This needs to allow for the initial validation to come through
        this.validity =
          invalidCounters[0].validity || // The first invalid counter's validity
          this.validity || // incoming validity from validation
          undefined; // fallback

        this.errorMessage =
          errorMessage || // our message
          this.errorMessage || // incoming message from validation
          undefined; // fallback
      }

      if (!isInvalid && this.validity !== 'valid') {

        // If there are no invalid counters, reset validity and error message
        this.validity = 'valid';
        this.errorMessage = undefined;
      }
    });
  }

  /**
   * Hides the dropdown bib if its open.
   * @returns {void}
   */
  hideBib() {
    if (this.dropdown && this.dropdown.isPopoverVisible) {
      this.dropdown.hide();
    }
  }

  /**
   * Shows the dropdown bib if there are options to show.
   * @returns {void}
   */
  showBib() {
    if (this.dropdown && !this.dropdown.isPopoverVisible) {
      this.dropdown.show();
    }
  }

  /**
   * Configures the dropdown counters by selecting all `auro-counter` elements,
   * appending them to the `auro-counter-wrapper` element within the shadow DOM,
   * and setting up keyboard navigation and input event listeners.
   * @private
   */
  configureDropdownCounters() {
    this.dropdown = this.shadowRoot.querySelector(this.dropdownTag._$litStatic$);
    this.dropdown.requestUpdate();

    const counterWrapper = this.shadowRoot.querySelector('auro-counter-wrapper');
    const counterSlot = counterWrapper.querySelector('slot');
    this.counters = counterSlot.assignedElements().filter(el => el.tagName.toLowerCase() === 'auro-counter' || el.hasAttribute('auro-counter'));

    this.counters.forEach((counter) => {
      counter.addEventListener("input", this.updateValue);
      counter.addEventListener("auroFormElement-validated", this.updateValidity);
    });

    if (this.isDropdown) {
      this.configureBibtemplate();
    }
  }

  /**
   * This sets up a close event listener and moves any slotted `bib.fullscreen.headline` and `bib.fullscreen.footer` content into the bibtemplate.
   * @private
   */
  configureBibtemplate() {
    this.bibtemplate = this.dropdown.querySelector(this.bibtemplateTag._$litStatic$);
    this.bibtemplate.addEventListener('close-click', () => {
      if (this.dropdown.isPopoverVisible) {
        this.dropdown.hide();
      }
    });
  }

  /**
   * Watch for slot changes and recalculate the menuoptions.
   * @private
   * @param {Event} event - `slotchange` event.
   * @returns {void}
   */
  handleSlotChange(event) {
    let targetSlot = '';
    if (event.target.name === 'bib.fullscreen.headline') {
      targetSlot = 'header';
    } else if (event.target.name === 'bib.fullscreen.footer') {
      targetSlot = 'footer';
    }
    if (targetSlot) {
      if (!this.dropdown) {
        this.configureDropdownCounters();
      }

      this.bibtemplate.querySelectorAll(`[slot="${targetSlot}"]`).forEach((old) => old.remove());

      event.target.assignedNodes().forEach((node) => {
        const clone = node.cloneNode();
        [...node.childNodes].forEach((child) => {
          clone.append(child);
        });
        clone.setAttribute('slot', targetSlot);
        this.bibtemplate.append(clone);
      });
    }
  }

  /**
   * Safely converts a value to a number, returning 0 if invalid.
   * @private
   * @param {*} value - The value to convert.
   * @returns {number} The converted number or 0 if invalid.
   */
  safeNumberConversion(value) {
    const num = Number(value);
    return Number.isNaN(num) ? 0 : num;
  }

  /**
   * Updates the aggregate value based on the values of contained auro-counter components.
   * This method queries for all `auro-counter` elements, sums their values, and updates the component's `value` property.
   * Additionally, it iterates through each counter and calls `manageDisabled()` on it.
   * @private
   */
  updateValue() {
    if (!this.counters) {
      return;
    }

    this.value = Array.from(this.counters).reduce((acc, counter, index) => {
      const name = counter.hasAttribute('name') ? counter.getAttribute('name') : `counter-${index}`;
      acc[name] = this.safeNumberConversion(counter.value);
      return acc;
    }, {});

    this.total = Array.from(this.counters).reduce(
      (total, counter) => total + this.safeNumberConversion(counter.value),
      0,
    );

    this.counters.forEach((counter) => {
      this.manageDisabled(counter);
    });
  }

  /**
   * Updates the value text in the dropdown trigger based on the counters in the counter group.
   * @private
   */
  updateValueText() {
    const valueTextSlot = this.shadowRoot.querySelector('slot[name="valueText"]');
    if (valueTextSlot) {
      const assignedNodes = valueTextSlot.assignedNodes({ flatten: true });
      this.valueText = assignedNodes.map((node) => node.textContent).join(', ');
    } else {
      this.valueText = '';
    }
  }

  /**
   * Validates value.
   * @param {boolean} [force=false] - Whether to force validation.
   */
  validate(force = false) {
    this.validation.validate(this, force);
  }

  updated(changedProperties) {
    if (changedProperties.has("value")) {
      this.validate();
      this.dispatchEvent(
        new CustomEvent("input", {
          detail: {
            total: this.total,
            value: this.value
          },
        }),
        {
          bubbles: true,
          composed: true,
        }
      );
    }

    if (changedProperties.has("onDark") && !this.isDropdown) {
      this.configureCounters();
    }
  }

  firstUpdated() {
    super.firstUpdated();
    this.updateValue();
    this.updateValueText();
  }

  /**
   * Registers the custom element with the browser.
   * @param {string} [name="auro-counter-group"] - Custom element name to register.
   * @example
   * AuroCounterGroup.register("custom-counter-group") // registers <custom-counter-group/>
   */
  static register(name = "auro-counter-group") {
    AuroLibraryRuntimeUtils.prototype.registerComponent(name, AuroCounterGroup);
  }

  /**
   * Returns HTML for the help text and error message.
   * @private
   * @returns {html} - Returns HTML for the help text and error message.
   */
  renderHelpText() {
    return !this.validity || this.validity === undefined || this.validity === 'valid'
      ? html`
        <div slot="helpText">
          <${this.helpTextTag} ?onDark="${this.onDark}">
            <p id="${this.uniqueId}" part="helpText">
              <slot name="helpText"></slot>
            </p>
          </${this.helpTextTag}>
        </div>
      `
      : html`
        <div slot="helpText">
          <${this.helpTextTag} error ?onDark="${this.onDark}">
            <p id="${this.uniqueId}" part="helpText" role="alert" aria-live="assertive">
              ${this.error || this.errorMessage}
            </p>
          </${this.helpTextTag}>
        </div>
      `;
  }

  /**
   * Returns HTML for the validation error icon.
   * @private
   * @returns {html} - Returns HTML for the validation error icon.
   */
  renderValidationErrorIcon() {

    // Don't render in valid state
    if (!this.validity || this.validity === 'valid') return undefined;

    return html`
      ${this.validity && this.validity !== 'valid' ? html`
        <div class="notification alertNotification">
          <${this.iconTag}
            category="alert"
            name="error-stroke"
            variant="statusError"
            ?ondark="${this.onDark}">
          </${this.iconTag}>
        </div>
      ` : undefined}
    `;
  }

  /**
   * Render the dropdown structure for the counter group.
   * @returns {TemplateResult} The dropdown template.
   * @private
   */
  renderCounterDropdown() {
    return html`
      <${this.dropdownTag} 
        noHideOnThisFocusLoss
        chevron
        part="dropdown"
        ?autoPlacement="${this.autoPlacement}"
        ?error="${this.validity !== undefined && this.validity !== 'valid'}"
        ?matchWidth="${this.matchWidth}"
        ?noFlip="${this.noFlip}"
        ?shift="${this.shift}"
        ?onDark="${this.onDark}"
        .fullscreenBreakpoint="${this.fullscreenBreakpoint}"
        .offset="${this.offset}"
        .placement="${this.placement}"
        .layout="${this.layout}"
        .shape="${this.shape}"
        .size="${this.size}"
        .ondark="${this.onDark}"
      >
        ${this.renderDropdownTrigger()}
        ${this.renderBibTemplate()}
        ${this.renderHelpText()}
      </${this.dropdownTag}>
      ${this.renderFullscreenSlots()}
    `;
  }

  /**
   * Render the dropdown trigger for the dropdown.
   * @returns {TemplateResult} The dropdown trigger template.
   * @private
   */
  renderDropdownTrigger() {

    const labelClasses = {
      [typeof this.valueText === 'string' && this.valueText.length ? 'body-xs' : 'body-default']: true
    };

    return html`
      <div slot="trigger" aria-haspopup="true" id="triggerFocus" class="triggerContent">
        <div class="accents left">
          <slot name="typeIcon"></slot>
        </div>
        <div class="mainContent">
          <label class="${classMap(labelClasses)}">
            <slot name="label"></slot>
          </label>
          <div class="value">
            <slot name="valueText" @slotChange="${this.updateValueText}" class="body-default">
              ${this.counters && Array.from(this.counters).map((counter, index) => html`${counter.value} ${counter.defaultSlot}${index !== this.counters.length - 1 ? ', ' : ''}`)}
            </slot>
          </div>
        </div>
        <div class="accents right">
          ${this.renderValidationErrorIcon()}
        </div>
      </div>
    `;
  };

  /**
   * Render the dropdown bib template for the dropdown.
   * @returns {TemplateResult} The bib template.
   * @private
   */
  renderBibTemplate() {
    return html`
      <${this.bibtemplateTag} ?large="${this.largeFullscreenHeadline}">
        <slot name="ariaLabel.bib.close" slot="ariaLabel.close">Close</slot>
        ${this.renderCounterGroup(true)}
      </${this.bibtemplateTag}>
    `;
  }

  /**
   * Render the fullscreen bib slots for the dropdown.
   * @returns {TemplateResult} The fullscreen slots template.
   * @private
   */
  renderFullscreenSlots() {
    return html`
      <div id="slotHolder">
        <slot name="bib.fullscreen.headline" @slotchange="${this.handleSlotChange}"></slot>
        <slot name="bib.fullscreen.footer" @slotchange="${this.handleSlotChange}"></slot>
      </div>
    `;
  }

  /**
   * Render the counter group container.
   * @param {boolean} isInDropdown - Whether the counter group is inside a dropdown.
   * @returns {TemplateResult} The counter group template.
   * @private
   */
  renderCounterGroup(isInDropdown = this.isDropdown) {
    return html`
      <auro-counter-wrapper ?isInDropdown="${isInDropdown}">
        <div class="counters">
          <slot @slotchange=${() => this.isDropdown ? this.configureDropdownCounters() : this.configureCounters()}></slot>
        </div>
      </auro-counter-wrapper>
    `;
  }

  /**
   * Render the classic layout.
   * @returns {TemplateResult} The classic layout template.
   * @private
   */
  renderLayoutClassic() {
    this.shape = this.shape || "classic";
    this.layout = this.layout || "classic";
    this.size = this.size || "xl";

    return html`
    ${this.isDropdown
      ? this.renderCounterDropdown()
      : this.renderCounterGroup()
    }`;
  }

  /**
   * Render the snowflake layout.
   * @returns {TemplateResult} The snowflake layout template.
   * @private
   */
  renderLayoutSnowflake() {
    this.layout = this.layout || "snowflake";
    this.shape = this.shape || "snowflake";
    this.size = this.size || "lg";

    return html`
    ${this.isDropdown
      ? this.renderCounterDropdown()
      : this.renderCounterGroup()
    }`;
  }

  /**
   * Renders the component by layout type.
   * @param {string} [ForcedLayout] - Optionally force a specific layout for rendering.
   * @returns {TemplateResult} The layout template.
   * @private
   */
  renderLayout(ForcedLayout) {
    const layout = ForcedLayout || this.layout;

    switch (layout) {

      case 'snowflake':
        return this.renderLayoutSnowflake();
      case 'classic':
        return this.renderLayoutClassic();
      default:
        return this.renderLayoutClassic();
    }
  }
}

/* eslint-disable lit/no-invalid-html, lit/binding-positions, max-lines, prefer-destructuring, no-underscore-dangle */

// Copyright (c) 2025 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

import { html } from "lit/static-html.js";
import { LitElement } from "lit";

import styleCss from "./styles/counter-group-css.js";

import AuroLibraryRuntimeUtils from "@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs";
import AuroFormValidation from "@auro-formkit/form-validation";

import { AuroDependencyVersioning } from "@aurodesignsystem/auro-library/scripts/runtime/dependencyTagVersioning.mjs";
import { AuroDropdown } from "@aurodesignsystem/auro-dropdown";
import dropdownVersion from "./dropdownVersion.js";

import { AuroBibtemplate } from '@aurodesignsystem/auro-bibtemplate';
import bibTemplateVersion from './bibtemplateVersion.js';

import './auro-counter-wrapper.js';

/**
 * Auro Counter Group is a group of counter components.
 *
 * This web component provides a flexible interface for grouping multiple counters, supporting
 * validation, custom validity messages, and disabled states based on the group's value.
 *
 * @element auro-counter-group
 * @extends LitElement
 * @slot Default - Slot for counter elements.
 * @slot bib.fullscreen.headline -  Defines the headline to display above menu-options
 * @slot bib.fullscreen.footer -  Defines the footer to display at the bottom of fullscreen bib
 * @slot Label - Dropdown label content. Only used when `isDropdown` is true.
 * @slot ValueText - Dropdown value text display. Only used when `isDropdown` is true.
 * @slot HelpText - Dropdown help text content. Only used when `isDropdown` is true.
 */
export class AuroCounterGroup extends LitElement {
  constructor() {
    super();

    this.isDropdown = false;
    this.max = undefined;
    this.min = undefined;
    this.total = undefined;
    this.validity = undefined;
    this.value = undefined;
    this.fullscreenBreakpoint = 'sm';

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
    this.dropdownTag = versioning.generateTag("auro-dropdown", dropdownVersion, AuroDropdown);

    /**
     * Dynamically generated bibtempalate tag.
     * @private
     * @type {string}
     */
    this.bibtemplateTag = versioning.generateTag('auro-bibtemplate', bibTemplateVersion, AuroBibtemplate);
  }

  static get styles() {
    return [styleCss];
  }

  static get properties() {
    return {

      /**
       * Indicates if the counter group is displayed as a dropdown.
       */
      isDropdown: {
        type: Boolean
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
       * Reflects the validity state.
       */
      validity: {
        type: String,
        reflect: true,
      },

      /**
       * The total value of the counters.
       */
      total: {
        type: Number,
      },

      /**
       * The current individual values of the nested counters.
       */
      value: {
        type: Object,
      },

      /**
       * If declared, make mobileHeadline in HeadingDisplay.
       * Otherwise, Heading 600
       */
      largeMobileHeadline: {
        type: Boolean,
        reflect: true
      },

      /**
       * Defines the screen size breakpoint (`lg`, `md`, `sm`, or `xs`) at which the dropdown switches to fullscreen mode on mobile.
       * When expanded, the dropdown will automatically display in fullscreen mode if the screen size is equal to or smaller than the selected breakpoint.
       * @default sm
       */
      fullscreenBreakpoint: {
        type: String,
        reflect: true
      }
    };
  }

  /**
   * Traps keyboard tab interactions within dropdown when open.
   * @private
   * @param {KeyboardEvent} event - The keyboard event.
   * @param {NodeList} counters - The list of counter elements.
   */
  trapKeyboard(event, counters) {
    if (!this.dropdown.isPopoverVisible) {
      return;
    }

    event.stopPropagation();
    event.preventDefault();

    const firstFocusable = counters[0];
    const lastFocusable = counters[counters.length - 1];

    if (event.key === 'Enter') {
      firstFocusable.focus();
    }

    if (event.key === 'Escape') {
      this.dropdown.hide();
    }

    if (event.key === 'Tab' && event.target.offsetParent.id === 'bib') {
      this.dropdown.noHideOnThisFocusLoss = true;

      const currentIndex = Array.from(counters).indexOf(document.activeElement);

      if (event.shiftKey) {
        if (currentIndex === 0) {
          lastFocusable.focus();
        } else {
          counters[currentIndex - 1].focus();
        }
      } else if (currentIndex === counters.length - 1) {
        firstFocusable.focus();
      } else {
        counters[currentIndex + 1].focus();
      }

    }
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
      counter.addEventListener("input", () => this.updateValue());
    });
  }

  /**
   * Configures the dropdown counters by selecting all `auro-counter` elements,
   * appending them to the `auro-counter-wrapper` element within the shadow DOM,
   * and setting up keyboard navigation and input event listeners.
   * @private
   */
  configureDropdownCounters() {
    this.dropdown = this.shadowRoot.querySelector(this.dropdownTag._$litStatic$);
    this.dropdown.addEventListener('keydown', (event) => this.trapKeyboard(event, this.counters, 'dropdown'));
    // notify dropdown to reconfigure as the trigger text is updated
    this.dropdown.requestUpdate();

    this.addEventListener('auroDropdown-toggled', () => {
      if (!this.dropdown.isPopoverVisible) {
        this.dropdown.focus();
      }
    });

    const counterWrapper = this.shadowRoot.querySelector('auro-counter-wrapper');
    this.counters = this.querySelectorAll("auro-counter, [auro-counter]");

    this.counters.forEach((counter) => {
      counterWrapper.append(counter);
    });

    this.counters = counterWrapper.querySelectorAll("auro-counter, [auro-counter]");

    if (this.keydownHandler) {
      counterWrapper.removeEventListener('keydown', this.keydownHandler);
    }
    this.keydownHandler = (keydownEvent) => {
      this.trapKeyboard(keydownEvent, this.counters);
    };
    counterWrapper.addEventListener('keydown', this.keydownHandler);

    this.counters.forEach((counter) => {
      counter.addEventListener("input", () => this.updateValue());
    });

    if (this.isDropdown) {
      this.configureBibtemplate();
    }
  }

  /**
   * @private
   * This sets up a close event listener and moves any slotted `bib.fullscreen.headline` and `bib.fullscreen.footer` content into the bibtemplate.
   */
  configureBibtemplate() {
    this.bibtemplate = this.dropdown.querySelector(this.bibtemplateTag._$litStatic$); // eslint-disable-line no-underscore-dangle
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
        const clone = node.cloneNode(true);
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

  // function that renders the HTML and CSS into the scope of the component
  render() {
    return html`
    ${this.isDropdown
      ? html`<${this.dropdownTag} common chevron fullscreenBreakpoint="${this.fullscreenBreakpoint}">
        <div slot="trigger"><slot name="valueText">
          ${this.counters && Array.from(this.counters).map((counter, index) => `${counter.value} ${counter.defaultSlot}${index !== this.counters.length - 1 ? ', ' : ''}`)}
        </slot></div>
        <div slot="label"><slot name="label"></slot></div>
        <div slot="helpText"><slot name="helpText"></slot></div>

        <${this.bibtemplateTag} ?large="${this.largeMobileHeadline}">
          <auro-counter-wrapper isInDropdown>
          </auro-counter-wrapper>
        </${this.bibtemplateTag}>
      </${this.dropdownTag}>
      <slot @slotchange=${() => this.configureDropdownCounters()}></slot>
      <div id="slotHolder">
        <slot name="bib.fullscreen.headline" @slotchange="${this.handleSlotChange}"></slot>
        <slot name="bib.fullscreen.footer" @slotchange="${this.handleSlotChange}"></slot>
      </div>
      `
      : html`<auro-counter-wrapper><slot @slotchange=${() => this.configureCounters()}></slot></auro-counter-wrapper>`
    }`;
  }
}

/* eslint-disable lit/no-invalid-html, lit/binding-positions, max-lines, no-underscore-dangle, arrow-parens, no-confusing-arrow, curly, dot-location, no-inline-comments, line-comment-position,
*/

// Copyright (c) 2025 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

import { html } from "lit/static-html.js";

import tokens from "./styles/tokens-css.js";
import counterGroupStyles from "./styles/counter-group-css.js";
import colorCss from "./styles/counter-group-color-css.js";
import shapeSizeCss from "./styles/shapeSize-css.js";

import AuroLibraryRuntimeUtils from "@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs";
import AuroFormValidation from "@aurodesignsystem/form-validation";

import { AuroDependencyVersioning } from "@aurodesignsystem/auro-library/scripts/runtime/dependencyTagVersioning.mjs";
import { AuroDropdown } from "@aurodesignsystem/auro-dropdown";
import { AuroBibtemplate } from '@aurodesignsystem/auro-bibtemplate';

import { doubleRaf, applyKeyboardStrategy } from '@aurodesignsystem/utils';
import { AuroHelpText } from '@aurodesignsystem/auro-helptext';
import formkitVersion from '@aurodesignsystem/version';

import './auro-counter-wrapper.js';
import { AuroElement } from "../../layoutElement/src/auroElement.js";
import { classMap } from "lit/directives/class-map.js";
import { counterGroupKeyboardStrategy } from './counterGroupKeyboardStrategy.js';

import { AuroIcon } from '@aurodesignsystem/auro-icon/class';
import iconVersion from "./iconVersion.js";

/**
 * Groups related counters, such as passenger types, so they share one total and one set of limits.
 *
 * **Key capabilities**
 * - **Shared limits**: The `min` and `max` attributes limit the total of all counters, and every counter's minus or plus button turns off when the total reaches a limit.
 * - **Combined value**: The `value` property holds each counter's number, keyed by its `name`, and `total` adds them up.
 * - **Dropdown**: The `isDropdown` attribute shows the counters in a dropdown with a label and a summary of their values, which fills the screen on small screens.
 * - **Combined errors**: In a dropdown, the group's help text shows the error messages of every invalid counter.
 * - **Dark backgrounds**: Set `appearance="inverse"` to use the group on dark backgrounds.
 *
 * **Example**
 *
 * ```html
 * <auro-counter-group max="9">
 *   <auro-counter name="adults">
 *     Adults
 *     <span slot="ariaLabel.minus">Remove adult</span>
 *     <span slot="ariaLabel.plus">Add adult</span>
 *   </auro-counter>
 *   <auro-counter name="children">
 *     Children
 *     <span slot="ariaLabel.minus">Remove child</span>
 *     <span slot="ariaLabel.plus">Add child</span>
 *   </auro-counter>
 * </auro-counter-group>
 * ```
 * @summary A group of counters with a shared total, shared limits, combined errors, and an optional dropdown.
 * @customElement auro-counter-group
 *
 * @slot default - The `auro-counter` elements in the group. {@requiredWhen always} {@category ui}
 * @slot ariaLabel.bib.close - Text screen readers announce for the close button in the fullscreen dropdown, such as "Close passenger selector". Defaults to "Close". {@relevantWhen isDropdown} {@requiredWhen isDropdown} {@category a11y}
 * @slot bib.fullscreen.headline - The heading shown at the top of the fullscreen dropdown, such as "Passengers". Applies only when `isDropdown` is set. {@relevantWhen isDropdown} {@requiredWhen isDropdown} {@category ui}
 * @slot bib.fullscreen.footer - Content shown at the bottom of the fullscreen dropdown, such as Reset and Save buttons. Applies only when `isDropdown` is set. {@relevantWhen isDropdown} {@category ui}
 * @slot label - The label shown in the dropdown trigger, such as "Passengers". Applies only when `isDropdown` is set. {@relevantWhen isDropdown} {@requiredWhen isDropdown} {@category ui}
 * @slot valueText - Custom text shown in the dropdown trigger in place of the default summary of each counter's value and label. Applies only when `isDropdown` is set. {@relevantWhen isDropdown} {@category ui}
 * @slot helpText - Extra guidance shown below the dropdown. An error message replaces it while any counter is invalid. Applies only when `isDropdown` is set. {@relevantWhen isDropdown} {@category ui}
 * @slot typeIcon - An icon shown at the start of the dropdown trigger, such as a person icon for a passenger selector. Applies only when `isDropdown` is set. {@relevantWhen isDropdown} {@category ui}
 *
 * @csspart dropdown - The dropdown element, rendered when `isDropdown` is set.
 * @csspart helpText - The paragraph that shows the help text, or the combined error message while a counter is invalid. Rendered only when `isDropdown` is set.
 *
 * @event auroFormElement-validated - Fires each time the group is validated, with the result in `event.detail.validity` and `event.detail.message`.
 * @event input - Fires when any counter's value changes, with the new `total` and `value` in `event.detail`. It doesn't currently bubble, so listen on the group itself.
 */
export class AuroCounterGroup extends AuroElement {
  constructor() {
    super();

    /** @type {'default' | 'inverse'} */
    this.appearance = "default";
    this.max = undefined;
    this.min = undefined;
    this.onDark = false;

    /** @readonly */
    this.total = undefined;

    /** @readonly */
    this.validity = undefined;

    /** @readonly */
    this.value = undefined;

    this.matchWidth = false;
    this.isDropdown = false;

    /** @type {'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'disabled'} */
    this.fullscreenBreakpoint = 'sm';
    this.largeFullscreenHeadline = false;
    this.autoPlacement = false;
    this.noFlip = false;
    this.shift = false;

    /** @type {'top' | 'right' | 'bottom' | 'left' | 'bottom-start' | 'top-start' | 'top-end' | 'right-start' | 'right-end' | 'bottom-end' | 'left-start' | 'left-end'} */
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
    this.dropdownTag = versioning.generateTag("auro-formkit-counter-dropdown", formkitVersion, AuroDropdown);

    /**
     * Dynamically generated bib template tag.
     * @private
     * @type {string}
     */
    this.bibtemplateTag = versioning.generateTag('auro-formkit-counter-bibtemplate', formkitVersion, AuroBibtemplate);

    /**
     * Dynamically generated helpText tag.
     * @private
     * @type {string}
     */
    this.helpTextTag = versioning.generateTag("auro-formkit-counter-helptext", formkitVersion, AuroHelpText);

    /**
     * @private
     */
    this.iconTag = versioning.generateTag('auro-formkit-input-icon', iconVersion, AuroIcon);
  }

  static get styles() {
    return [
      tokens,
      colorCss,
      counterGroupStyles,
      shapeSizeCss
    ];
  }

  static get properties() {
    return {

      ...super.properties,

      /**
       * Sets the colors to match the background behind the group. Use `inverse` on dark backgrounds and `default` on light ones.
       * @type {'default' | 'inverse'}
       * @category ui
       * @default 'default'
       */
      appearance: {
        type: String,
        reflect: true
      },

      /**
       * Deprecated: Use `placement` instead.
       * Moves the open dropdown to whichever side of the trigger has the most space. Applies only when `isDropdown` is set.
       * @relevantWhen isDropdown
       * @deprecated Use `placement` instead.
       * @category ui
       */
      autoPlacement: {
        type: Boolean,
        attribute: "autoplacement",
        reflect: true
      },

      /**
       * Holds the error message shown while the group is invalid.
       * Validation sets it, and it isn't available to consumers.
       * @private
       */
      errorMessage: {
        type: String,
        reflect: false,
        attribute: false
      },

      /**
       * Sets the largest screen size at which the open dropdown fills the screen. Use `disabled` to keep it as a dropdown on every screen size. Applies only when `isDropdown` is set.
       * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'disabled'}
       * @relevantWhen isDropdown
       * @category ui
       * @default 'sm'
       */
      fullscreenBreakpoint: {
        type: String,
        attribute: "fullscreenbreakpoint",
        reflect: true
      },

      /**
       * Shows the counters in a dropdown with a label and a summary of their values. Use it to save space in forms.
       * @category ui
       */
      isDropdown: {
        type: Boolean,
        attribute: "isdropdown"
      },

      /**
       * Sets the dropdown's layout. Use `classic` for most forms, and `snowflake` only on dark backgrounds with `appearance="inverse"`. Applies only when `isDropdown` is set.
       * @type {'classic' | 'snowflake'}
       * @relevantWhen isDropdown
       * @category ui
       * @default 'classic'
       */
      layout: {
        type: String,
        attribute: "layout",
        reflect: true
      },

      /**
       * Sets the shape of the dropdown. Defaults to `snowflake` when `layout="snowflake"`, and to `classic` otherwise. Applies only when `isDropdown` is set.
       * @type {'box' | 'classic' | 'pill' | 'pill-left' | 'pill-right' | 'rounded' | 'snowflake'}
       * @relevantWhen isDropdown
       * @category ui
       * @default 'classic'
       */
      shape: {
        type: String,
        attribute: "shape",
        reflect: true
      },

      /**
       * Sets the size of the dropdown. Defaults to `lg` when `layout="snowflake"`, and to `xl` otherwise. Applies only when `isDropdown` is set.
       * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl'}
       * @relevantWhen isDropdown
       * @category ui
       * @default 'xl'
       */
      size: {
        type: String,
        attribute: "size",
        reflect: true
      },

      /**
       * Makes the open dropdown the same width as its trigger. Without it, the dropdown's content sets its width. Applies only when `isDropdown` is set.
       * @relevantWhen isDropdown
       * @category ui
       */
      matchWidth: {
        type: Boolean,
        attribute: "matchwidth",
        reflect: true
      },

      /**
       * Sets the highest total allowed across all counters. When the total reaches it, every counter's plus button turns off.
       * @category behavior
       */
      max: {
        type: Number,
        reflect: true,
      },

      /**
       * Sets the lowest total allowed across all counters. When the total is at or below it, every counter's minus button turns off.
       * @category behavior
       */
      min: {
        type: Number,
        reflect: true,
      },

      /**
       * Shows the fullscreen dropdown's headline in a larger heading style. Applies only when `isDropdown` is set.
       * @relevantWhen isDropdown
       * @category ui
       */
      largeFullscreenHeadline: {
        type: Boolean,
        attribute: "largefullscreenheadline",
        reflect: true
      },

      /**
       * Keeps the open dropdown on the side set by `placement`, even when there isn't enough space there. Without it, the dropdown flips to the opposite side. Applies only when `isDropdown` is set.
       * @relevantWhen isDropdown
       * @category ui
       */
      noFlip: {
        type: Boolean,
        attribute: "noflip",
        reflect: true
      },

      /**
       * Moves the open dropdown along its side so the edge of the screen doesn't cut it off. Applies only when `isDropdown` is set.
       * @relevantWhen isDropdown
       * @category ui
       */
      shift: {
        type: Boolean,
        reflect: true
      },

      /**
       * Sets the gap in pixels between the trigger and the open dropdown, such as `20`. Uses `0` when not set. Applies only when `isDropdown` is set.
       * @relevantWhen isDropdown
       * @category ui
       */
      offset: {
        type: Number,
        reflect: true
      },

      /**
       * Deprecated: Use `appearance="inverse"` instead.
       * Shows the group in colors for dark backgrounds.
       * @deprecated Use `appearance="inverse"` instead.
       * @category ui
       */
      onDark: {
        type: Boolean,
        attribute: "ondark",
        reflect: true
      },

      /**
       * Sets where the open dropdown appears relative to its trigger. The first word is the side, and `-start` or `-end` lines the dropdown up with the start or end edge of the trigger. Applies only when `isDropdown` is set.
       * @type {'top' | 'right' | 'bottom' | 'left' | 'bottom-start' | 'top-start' | 'top-end' | 'right-start' | 'right-end' | 'bottom-end' | 'left-start' | 'left-end'}
       * @relevantWhen isDropdown
       * @default 'bottom-start'
       * @category ui
       */
      placement: {
        type: String,
        reflect: true
      },

      /**
       * Gets the sum of every counter's value, such as `3` for 2 adults and 1 child.
       * @readonly
       * @category behavior
       */
      total: {
        type: Number,
        attribute: false
      },

      /**
       * Gets the group's validation result: `valid`, or the first invalid counter's reason, such as `customError` or `rangeOverflow`.
       * @readonly
       * @category behavior
       */
      validity: {
        type: String,
        reflect: true,
      },

      /**
       * Gets each counter's value, keyed by the counter's `name`, such as `{ adults: 2, children: 1 }`. Counters without a `name` use `counter-0`, `counter-1`, and so on.
       * @readonly
       * @type {Record<string, number>}
       * @category behavior
       */
      value: {
        type: Object,
        attribute: false
      },

      /**
       * Holds the text in the `valueText` slot.
       * @category behavior
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
      counter.appearance = this.appearance;
      counter.onDark = this.onDark;
      counter.addEventListener("input", this.updateValue);
      counter.addEventListener("auroFormElement-validated", this.updateValidity);
    });
    this.updateValue();
    this.updateValidity();
  }

  /**
   * Gets the counters in an invalid state.
   * @returns {Array<HTMLElement>} The counters whose `validity` is set and isn't `valid`.
   * @param {NodeList|Array<HTMLElement>} counters - The counter elements to check.
   * @private
   */
  getInvalidCounters(counters) {
    return Array.from(counters).filter(counter => counter.validity && counter.validity !== 'valid');
  }

  /**
   * Gets all valid error messages from errored counters.
   * @param {Array<HTMLElement>} invalidCounters - The invalid counters to read error messages from.
   * @returns {Array<string>} The non-empty error messages of the invalid counters.
   * @private
   */
  getErrorMessages(invalidCounters) {
    return invalidCounters
      .map(counter => counter.errorMessage)
      .filter(message => message && message.length > 0);
  };

  /**
   * Synchronously recomputes `this.validity` and `this.errorMessage` from the current
   * validity of the child counters. Extracted from `updateValidity()` so that
   * `validate()` can re-apply this aggregation immediately after the shared
   * validation engine runs, instead of waiting on a deferred timer.
   * @returns {void}
   * @private
   */
  computeValidityFromCounters() {

    // We don't need to do anything if there are no counters
    if (!this.counters) return;

    // Get any invalid counters
    const invalidCounters = this.getInvalidCounters(this.counters);

    // Determine if we are in an invalid state based on the presence of invalid counters
    const isInvalid = invalidCounters.length > 0;

    // If we are in an invalid state
    if (isInvalid) {

      // Generate the error messages as plain text, joined with sentence-ending
      // punctuation so multiple messages don't run together into one clause.
      const errorMessages = this.getErrorMessages(invalidCounters);
      const joinedMessage = errorMessages.join('. ');

      // Set the validity and error message
      // This needs to allow for the initial validation to come through
      this.validity =
        invalidCounters[0].validity || // The first invalid counter's validity
        this.validity || // incoming validity from validation
        undefined; // fallback

      // Always reflect the current invalid counters' messages, even when that
      // means clearing to undefined -- falling back to the previous
      // this.errorMessage here would let a stale message from a prior,
      // different invalid cause survive a transition into a cause with no
      // message of its own (e.g. customError -> rangeOverflow).
      this.errorMessage = joinedMessage || undefined;
    }

    if (!isInvalid && this.validity !== 'valid') {

      // If there are no invalid counters, reset validity and error message
      this.validity = 'valid';
      this.errorMessage = undefined;
    }
  }

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
    setTimeout(() => this.computeValidityFromCounters());
  }

  /**
   * Closes the dropdown if it's open. Does nothing unless `isDropdown` is set.
   * @returns {void}
   */
  hideBib() {
    if (this.dropdown && this.dropdown.isPopoverVisible) {
      this.dropdown.hide();
    }
  }

  /**
   * Opens the dropdown if it's closed. Does nothing unless `isDropdown` is set.
   * @returns {void}
   */
  showBib() {
    if (this.dropdown && !this.dropdown.isPopoverVisible) {
      this.dropdown.show();
    }
  }

  /**
   * Finds the dropdown and the counters slotted into its `auro-counter-wrapper`,
   * adds `input` and `auroFormElement-validated` listeners to each counter, and
   * updates `value` and the group's validity. Also sets up the bib template when `isDropdown` is set.
   * @private
   */
  configureDropdownCounters() {
    this.dropdown = this.shadowRoot.querySelector(this.dropdownTag._$litStatic$);

    // Counter rows are slotted into the bib through multiple shadow roots
    // (dropdown → bib → bibtemplate → counter-group → counter), so the floater's
    // `:focus-within` focus-loss check fails to match the dropdown host in Chromium
    // and the bib auto-closes immediately after opening. Mirrors auro-select.
    this.dropdown.noHideOnThisFocusLoss = true;

    this.dropdown.requestUpdate();

    const counterWrapper = this.shadowRoot.querySelector('auro-counter-wrapper');
    const counterSlot = counterWrapper.querySelector('slot');
    this.counters = counterSlot.assignedElements().filter(el => el.tagName.toLowerCase() === 'auro-counter' || el.hasAttribute('auro-counter'));

    this.counters.forEach((counter) => {
      counter.addEventListener("input", this.updateValue);
      counter.addEventListener("auroFormElement-validated", this.updateValidity);
    });

    this.updateValue();
    this.updateValidity();

    if (this.isDropdown) {
      this.configureBibtemplate();
    }
  }

  /**
   * Finds the bib template, closes the dropdown when its close button is clicked, and moves focus to the close button when the fullscreen dropdown opens.
   * @private
   */
  configureBibtemplate() {
    this.bibtemplate = this.dropdown.querySelector(this.bibtemplateTag._$litStatic$);
    this.bibtemplate.addEventListener('close-click', () => {
      if (this.dropdown.isPopoverVisible) {
        this.dropdown.hide();
      }
    });

    // Focus close button when fullscreen dialog opens
    this.dropdown.addEventListener('auroDropdown-toggled', () => {
      if (this.dropdown.isPopoverVisible && this.dropdown.isBibFullscreen) {
        doubleRaf(() => {
          this.bibtemplate.focusCloseButton();
        });
      }
    });
  }

  /**
   * Called when the `bib.fullscreen.headline` or `bib.fullscreen.footer` slot changes.
   * Moves the slotted content into the bib template's header or footer.
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
   * Rebuilds `value` and `total` from the group's counters, then calls `manageDisabled()` on each counter.
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
   * Updates the group's `validity` from its counters and fires `auroFormElement-validated`.
   * @param {boolean} [force=false] - If true, runs the group's own check even while it has focus. If false, skips that check while the group has focus; `validity` still updates from the counters.
   */
  validate(force = false) {
    this.validation.validate(this, force);

    // AuroFormValidation doesn't know how to derive validity from our object-valued
    // `value`, so it always resolves an otherwise-error-free group to 'valid' -- even
    // while a child counter is still invalid. Re-derive from the children's current
    // state immediately afterward so that invalid state survives forced validation,
    // and re-dispatch the validated event when the correction changes the outcome so
    // listeners like auro-form's submit path see the corrected result.
    //
    // This intentionally also runs for unforced calls (every child value change),
    // even though updateValidity()'s deferred, listener-driven aggregation computes
    // the same result a tick later: that deferred path only updates this.validity/
    // this.errorMessage, it never re-dispatches the event, so auro-form's formState
    // (and therefore the submit button's disabled state) would otherwise only ever
    // learn about a child-derived invalid state at the next forced validation --
    // not at initial load or on ordinary interaction. See docs/post-mortem/1642340.md,
    // "Iterations That Didn't Work", for the attempt to scope this to `force` and
    // why it broke that behavior.
    if (this.counters) {
      const previousValidity = this.validity;
      const previousMessage = this.errorMessage;

      this.computeValidityFromCounters();

      if (this.validity !== previousValidity || this.errorMessage !== previousMessage) {
        this.dispatchEvent(new CustomEvent('auroFormElement-validated', {
          bubbles: true,
          composed: true,
          detail: {
            validity: this.validity,
            message: this.errorMessage
          }
        }));
      }
    }
  }

  /**
   * Resets every counter to its `min` value and clears the group's validation state.
   * The group stays invalid while any counter has the `error` attribute.
   * `value` and `total` update as each counter finishes resetting.
   * @returns {void}
   */
  reset() {
    if (this.counters) {
      this.counters.forEach((counter) => counter.reset());
    }

    this.validation.reset(this);
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

    if ((changedProperties.has("onDark") || changedProperties.has("appearance")) && !this.isDropdown) {
      this.configureCounters();
    }
  }

  firstUpdated() {
    super.firstUpdated();
    this.updateValue();
    this.updateValueText();

    if (this.isDropdown) {
      applyKeyboardStrategy(this, counterGroupKeyboardStrategy);

      // noHideOnThisFocusLoss=true on the dropdown prevents handleFocusLoss from
      // closing the bib when focus moves out via Tab. Close explicitly via focusout:
      // if relatedTarget is outside the counter-group's light DOM, focus has left.
      this.addEventListener('focusout', (event) => {
        if (!this.dropdown?.isPopoverVisible || this.dropdown?.isBibFullscreen) {
          return;
        }

        // Focus moved to a specific element still inside the group — keep the bib open.
        if (event.relatedTarget && this.contains(event.relatedTarget)) {
          return;
        }

        // Focus moved to a known element outside the group (e.g. Tab to the next field).
        this.hideBib();
      });
    }
  }

  /**
   * Registers the custom element with the browser.
   * @param {string} [name="auro-counter-group"] - The tag name to register the element under.
   * @example
   * AuroCounterGroup.register("custom-counter-group") // registers <custom-counter-group/>
   */
  static register(name = "auro-counter-group") {
    AuroLibraryRuntimeUtils.prototype.registerComponent(name, AuroCounterGroup);
  }

  /**
   * Renders the help text, or the combined error message while a counter is invalid.
   * @private
   * @returns {TemplateResult} The help text or error message template.
   */
  renderHelpText() {
    return !this.validity || this.validity === undefined || this.validity === 'valid'
      ? html`
        <div slot="helpText">
          <${this.helpTextTag} appearance="${this.onDark ? 'inverse' : this.appearance}">
            <p id="${this.uniqueId}" part="helpText">
              <slot name="helpText"></slot>
            </p>
          </${this.helpTextTag}>
        </div>
      `
      : html`
        <div slot="helpText">
          <${this.helpTextTag} error appearance="${this.onDark ? 'inverse' : this.appearance}">
            <p id="${this.uniqueId}" part="helpText" role="alert" aria-live="assertive">
              ${this.errorMessage}
            </p>
          </${this.helpTextTag}>
        </div>
      `;
  }

  /**
   * Renders the error icon shown in the dropdown trigger while a counter is invalid.
   * @private
   * @returns {TemplateResult|undefined} The error icon template, or undefined while the group is valid.
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
            appearance="${this.onDark ? 'inverse' : this.appearance}">
          </${this.iconTag}>
        </div>
      ` : undefined}
    `;
  }

  /**
   * Renders the dropdown structure for the counter group.
   * @returns {TemplateResult} The dropdown template.
   * @private
   */
  renderCounterDropdown() {
    return html`
      <${this.dropdownTag}
        chevron
        part="dropdown"
        appearance="${this.onDark ? 'inverse' : this.appearance}"
        ?autoPlacement="${this.autoPlacement}"
        ?error="${this.validity !== undefined && this.validity !== 'valid'}"
        ?matchWidth="${this.matchWidth}"
        ?noFlip="${this.noFlip}"
        ?shift="${this.shift}"
        .fullscreenBreakpoint="${this.fullscreenBreakpoint}"
        .offset="${this.offset}"
        .placement="${this.placement}"
        .layout="${this.layout}"
        .shape="${this.shape}"
        .size="${this.size}"
      >
        ${this.renderDropdownTrigger()}
        ${this.renderBibTemplate()}
        ${this.renderHelpText()}
      </${this.dropdownTag}>
      ${this.renderFullscreenSlots()}
    `;
  }

  /**
   * Renders the dropdown trigger.
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
   * Renders the dropdown's bib template.
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
   * Renders the fullscreen bib slots for the dropdown.
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
   * Renders the counter group container.
   * @param {boolean} [isInDropdown=this.isDropdown] - If true, lays the counters out for the dropdown bib. If false, lays them out inline.
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
   * Renders the classic layout.
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
   * Renders the snowflake layout.
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
   * @param {string} [ForcedLayout] - The layout to render instead of `layout`.
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

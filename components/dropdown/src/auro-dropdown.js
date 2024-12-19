// Copyright (c) 2020 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

/* eslint-disable max-lines, lit-a11y/accessible-name, lit/no-invalid-html, lit/binding-positions,
arrow-body-style, no-extra-parens, block-spacing, brace-style, curly, template-curly-spacing, no-underscore-dangle */

import { html } from "lit/static-html.js";
import { LitElement } from "lit";

import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';
import AuroFloatingUI from './floatingUI.mjs';

import { AuroDependencyVersioning } from '@aurodesignsystem/auro-library/scripts/runtime/dependencyTagVersioning.mjs';

import { AuroIcon } from '@aurodesignsystem/auro-icon/src/auro-icon.js';
import iconVersion from './iconVersion.js';

import styleCss from "./styles/style-css.js";
import colorCss from "./styles/color-css.js";
import tokensCss from "./styles/tokens-css.js";

import './auro-dropdownBib.js';

/**
 * @attr { Boolean } bordered - If declared, applies a border around the trigger slot.
 * @attr { Boolean } common - If declared, the dropdown will be styled with the common theme.
 * @attr { Boolean } chevron - If declared, the dropdown displays an display state chevron on the right.
 * @attr { Boolean } disabled - If declared, the dropdown is not interactive.
 * @attr { Boolean } disableEventShow - If declared, the dropdown will only show by calling the API .show() public method.
 * @attr { Boolean } error - If declared in combination with `bordered` property or `helpText` slot content, will apply red color to both.
 * @attr {Boolean} fluid - Makes the trigger to be full width of its parent container
 * @attr { Boolean } matchWidth - If declared, the popover and trigger will be set to the same width.
 * @attr { Boolean } inset - If declared, will apply padding around trigger slot content.
 * @attr { Boolean } rounded - If declared, will apply border-radius to trigger and default slots.
 * @attr { Boolean } hoverToggle - if declared, the trigger will toggle the big on mouseover/mouseout.
 * @attr { Boolean } noToggle - If declared, the trigger will only show the dropdown bib.
 * @attr { Boolean } focusShow - if declared, the bib will display when focus is applied to the trigger.
 * @attr { Boolean } noHideOnThisFocusLoss - If declared, the dropdown will not hide when moving focus outside the element.
 * @attr { String } mobileFullscreenBreakpoint - Defines the screen size breakpoint (`lg`, `md`, `sm`, or `xs`) at which the dropdown switches to fullscreen mode on mobile. When expanded, the dropdown will automatically display in fullscreen mode if the screen size is equal to or smaller than the selected breakpoint.
 * @prop { Boolean } isPopoverVisible - If true, the dropdown bib is displayed.
 * @slot - Default slot for the popover content.
 * @slot label - Defines the content of the label.
 * @slot helpText - Defines the content of the helpText.
 * @slot trigger - Defines the content of the trigger.
 * @csspart trigger - The trigger content container.
 * @csspart chevron - The collapsed/expanded state icon container.
 * @csspart helpText - The helpText content container.
 * @csspart popover - The bib content container.
 * @event auroDropdown-triggerClick - Notifies that the trigger has been clicked.
 * @event auroDropdown-toggled - Notifies that the visibility of the dropdown bib has changed.
 */
export class AuroDropdown extends LitElement {
  constructor() {
    super();

    this.isPopoverVisible = false;
    this.matchWidth = false;
    this.noHideOnThisFocusLoss = false;

    this.privateDefaults();
  }

  /**
   * @private
   * @returns {void} Internal defaults.
   */
  privateDefaults() {
    this.bordered = false;
    this.chevron = false;
    this.disabled = false;
    this.error = false;
    this.inset = false;
    this.placement = 'bottom-start';
    this.rounded = false;
    this.tabIndex = 0;
    this.noToggle = false;

    /**
     * @private
     */
    this._hasTriggerContent = false;

    /**
     * @private
     */
    this.triggerContentSlot = undefined;

    /**
     * @private
     */
    this.runtimeUtils = new AuroLibraryRuntimeUtils();

    /**
     * @private
     */
    this.floater = new AuroFloatingUI();

    /**
     * @private
     */
    this.floaterConfig = {
      placement: 'bottom-start',
      flip: true,
      autoPlacement: false,
      offset: 0,
    };

    /**
     * Generate unique names for dependency components.
     */
    const versioning = new AuroDependencyVersioning();
    this.iconTag = versioning.generateTag('auro-icon', iconVersion, AuroIcon);
  }

  /**
   * Public method to hide the dropdown.
   * @returns {void}
   */
  hide() {
    this.floater.hideBib();
  }

  /**
   * Public method to show the dropdown.
   * @returns {void}
   */
  show() {
    this.floater.showBib();
  }

  // function to define props used within the scope of this component
  static get properties() {
    return {
      bordered: {
        type: Boolean,
        reflect: true
      },
      chevron: {
        type: Boolean,
        reflect: true
      },
      disabled: {
        type: Boolean,
        reflect: true
      },
      error: {
        type: Boolean,
        reflect: true
      },
      fluid: {
        type: Boolean,
        reflect: true,
      },
      focusShow: {
        type: Boolean,
        reflect: true
      },
      hoverToggle: {
        type: Boolean,
        reflect: true
      },
      inset: {
        type: Boolean,
        reflect: true
      },
      matchWidth: {
        type: Boolean,
        reflect: true
      },
      rounded: {
        type: Boolean,
        reflect: true
      },
      common: {
        type: Boolean,
        reflect: true
      },
      noToggle: {
        type: Boolean,
        reflect: true
      },
      noHideOnThisFocusLoss: {
        type: Boolean,
        reflect: true
      },
      isPopoverVisible: { type: Boolean },
      onSlotChange: {
        type: Function,
        reflect: false
      },
      mobileFullscreenBreakpoint: {
        type: String,
        reflect: true,
      },

      /**
       * @private
       */
      dropdownWidth: { type: Number },

      /**
       * @private
       */
      placement:     { type: String },

      /**
       * @private
       */
      tabIndex: { type: Number }
    };
  }

  static get styles() {
    return [
      styleCss,
      colorCss,
      tokensCss
    ];
  }

  /**
   * Sets the value of the hasTriggerContent property and requests an update if changed.
   *
   * This setter updates the internal `_hasTriggerContent` property only if the new value differs
   * from the current value. If a change is detected, it triggers a request for the component to
   * update, ensuring that UI elements are refreshed accordingly.
   *
   * @private
   * @setter hasTriggerContent
   * @param {boolean} value - The new value indicating whether the trigger content is present.
   * @returns {void}
   */
  set hasTriggerContent(value) {
    if (value !== this._hasTriggerContent) {
      this._hasTriggerContent = value;
      this.requestUpdate();
    }
  }

  /**
   * Retrieves the value of the hasTriggerContent property.
   *
   * @private
   * @getter hasTriggerContent
   * @type {boolean}
   * @returns {boolean} The current value of the hasTriggerContent property.
   */
  get hasTriggerContent() {
    return this._hasTriggerContent;
  }

  /**
   * This will register this element with the browser.
   * @param {string} [name="auro-dropdown"] - The name of element that you want to register to.
   *
   * @example
   * AuroDropdown.register("custom-dropdown") // this will register this element to <custom-dropdown/>
   *
   */
  static register(name = "auro-dropdown") {
    AuroLibraryRuntimeUtils.prototype.registerComponent(name, AuroDropdown);
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  updated(changedProperties) {
    this.floater.handleUpdate(changedProperties);

    if (changedProperties.has('mobileFullscreenBreakpoint')) {
      this.bibContent.mobileFullscreenBreakpoint = this.mobileFullscreenBreakpoint;
    }

    if (this.triggerContentSlot) {
      this.hasTriggerContent = this.triggerContentSlot.reduce((old, sl) => old || Boolean(sl.textContent.trim()), false);
    } else {
      this.hasTriggerContent = false;
    }
  }

  firstUpdated() {
    this.floater.configure(this);
    this.bibContent = this.floater.element.bib;

    // Add the tag name as an attribute if it is different than the component name
    this.runtimeUtils.handleComponentTagRename(this, 'auro-dropdown');
  }

  /**
   * Exposes CSS parts for styling from parent components.
   * @private
   * @returns {void}
   */
  exposeCssParts() {
    this.setAttribute('exportparts', 'trigger:dropdownTrigger, chevron:dropdownChevron, helpText:dropdownHelpText, size:dropdownSize');
  }

  /**
   * Determines if content is within a custom slot.
   * @private
   * @param {HTMLElement} element - The element to check.
   * @returns {Boolean}
   */
  isCustomSlotContent(element) {
    let path = []; // eslint-disable-line prefer-const
    let currentElement = element;

    let inCustomSlot = false;

    while (currentElement) {
      path.unshift(currentElement);
      currentElement = currentElement.parentElement;

      if (currentElement && currentElement.hasAttribute('slot')) {
        inCustomSlot = true;
        break;
      }
    }

    return inCustomSlot;
  }

  /**
   * Handles changes to the trigger content slot and updates related properties.
   *
   * It first updates the floater settings
   * Then, it retrieves the assigned nodes from the event target and checks if any of
   * the nodes contain non-empty text content, updating the `hasTriggerContent` property accordingly.
   *
   * @private
   * @method handleTriggerContentSlotChange
   * @param {Event} event - native slotchange event
   * @returns {void}
   */
  handleTriggerContentSlotChange(event) {
    this.floater.handleTriggerTabIndex();

    this.triggerContentSlot = event.target.assignedNodes();
    this.hasTriggerContent = this.triggerContentSlot.reduce((old, sl) => old || Boolean(sl.textContent.trim()), false);
  }

  /**
   * Handles the default slot change event and updates the content.
   *
   * This method retrieves all nodes assigned to the default slot of the event target and appends them
   * to the `bibContent` element. If a callback function `onSlotChange` is defined, it is invoked to
   * notify about the slot change.
   *
   * @private
   * @method handleDefaultSlot
   * @param {Event} event - The event object representing the slot change.
   * @fires Function#onSlotChange - Optional callback invoked when the slot content changes.
   */
  handleDefaultSlot(event) {
    [...event.target.assignedNodes()].forEach((node) => this.bibContent.append(node));

    if (this.onSlotChange) {
      this.onSlotChange();
    }
  }

  // function that renders the HTML and CSS into  the scope of the component
  render() {
    return html`
      <div>
        <div
          id="trigger"
          class="trigger"
          part="trigger"
          role="button"
          aria-labelledby="triggerLabel"
          aria-controls="popover"
          tabindex="${this.tabIndex}"
          >
          <div class="triggerContentWrapper">
            <label class="label" id="triggerLabel" hasTrigger=${this.hasTriggerContent}>
              <slot name="label"></slot>
            </label>
            <div class="triggerContent">
              <slot
                name="trigger"
                @slotchange="${(event) => this.handleTriggerContentSlotChange(event)}"></slot>
            </div>
          </div>
          ${this.chevron || this.common ? html`
              <div
                id="showStateIcon"
                part="chevron">
                <${this.iconTag}
                  category="interface"
                  name="chevron-down"
                  customColor
                  ?disabled=${this.disabled}
                  >
                </${this.iconTag}>
              </div>
            ` : undefined }
        </div>
        <div
          class="helpText"
          part="helpText">
          <slot name="helpText"></slot>
        </div>
        <div class="slotContent">
          <slot @slotchange="${this.handleDefaultSlot}"></slot>
        </div>
        <div id="bibSizer" part="size"></div>
        <auro-dropdownbib
          id="bib"
          role="tooltip"
          ?common="${this.common}"
          ?rounded="${this.common || this.rounded}"
          ?inset="${this.common || this.inset}">
        </auro-dropdownbib>
      </div>
    `;
  }
}

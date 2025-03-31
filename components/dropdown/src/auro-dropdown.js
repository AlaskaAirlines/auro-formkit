// Copyright (c) 2020 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

/* eslint-disable max-lines, lit/no-invalid-html, lit/binding-positions, template-curly-spacing, no-magic-numbers */

import { html } from "lit/static-html.js";
import { LitElement } from "lit";

import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';
import AuroFloatingUI from '@aurodesignsystem/auro-library/scripts/runtime/floatingUI.mjs';

import { AuroDependencyVersioning } from '@aurodesignsystem/auro-library/scripts/runtime/dependencyTagVersioning.mjs';

import { AuroIcon } from '@aurodesignsystem/auro-icon/src/auro-icon.js';
import iconVersion from './iconVersion.js';


import { AuroDropdownBib } from './auro-dropdownBib.js';
import dropdownVersion from './dropdownVersion.js';

import styleCss from "./styles/style-css.js";
import colorCss from "./styles/color-css.js";
import tokensCss from "./styles/tokens-css.js";

import { AuroHelpText } from '@aurodesignsystem/auro-helptext';
import helpTextVersion from './helptextVersion.js';

/**
 * @attr { Boolean } disableEventShow - If declared, the dropdown will only show by calling the API .show() public method.
 * @slot - Default slot for the popover content.
 * @slot label - Defines the content of the label.
 * @slot helpText - Defines the content of the helpText.
 * @slot trigger - Defines the content of the trigger.
 * @csspart trigger - The trigger content container.
 * @csspart chevron - The collapsed/expanded state icon container.
 * @csspart helpText - The helpText content container.
 * @event auroDropdown-triggerClick - Notifies that the trigger has been clicked.
 * @event auroDropdown-toggled - Notifies that the visibility of the dropdown bib has changed.
 */
export class AuroDropdown extends LitElement {
  constructor() {
    super();

    this.isPopoverVisible = false;
    this.isBibFullscreen = false;
    this.matchWidth = false;
    this.noHideOnThisFocusLoss = false;

    this.privateDefaults();

    /**
     * @private
     * @property {boolean} delegatesFocus - Whether the shadow root delegates focus.
     */
    this.constructor.shadowRootOptions = {
      ...LitElement.shadowRootOptions,
      delegatesFocus: true,
    };

    /**
     * @private
     */
    this.triggerContentFocusable = false;

    /**
     * @private
     */
    this.showTriggerBorders = true;
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
    this.role = 'button';
    this.autocomplete = 'none';
    this.labeled = true;

    /**
     * @private
     */
    this.hasTriggerContent = false;

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

    /**
     * @private
     */
    this.iconTag = versioning.generateTag('auro-formkit-dropdown-icon', iconVersion, AuroIcon);

    /**
     * @private
     */
    this.dropdownBibTag = versioning.generateTag('auro-formkit-dropdown-dropdownbib', dropdownVersion, AuroDropdownBib);

    /**
     * @private
     */
    this.helpTextTag = versioning.generateTag('auro-formkit-dropdown-helptext', helpTextVersion, AuroHelpText);
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

      /**
       * If declared, applies a border around the trigger slot.
       */
      bordered: {
        type: Boolean,
        reflect: true
      },

      /**
       * If declared, the dropdown displays a chevron on the right.
       * @attr {Boolean} chevron
       */
      chevron: {
        type: Boolean,
        reflect: true
      },

      /**
       * If declared, the dropdown will be styled with the common theme.
       */
      common: {
        type: Boolean,
        reflect: true
      },

      /**
       * If declared, the dropdown is not interactive.
       */
      disabled: {
        type: Boolean,
        reflect: true
      },

      /**
       * @private
       */
      dropdownWidth: {
        type: Number
      },

      /**
       * If declared in combination with `bordered` property or `helpText` slot content, will apply red color to both.
       */
      error: {
        type: Boolean,
        reflect: true
      },

      /**
       * If declared, the bib will display when focus is applied to the trigger.
       */
      focusShow: {
        type: Boolean,
        reflect: true
      },

      /**
       * Makes the trigger to be full width of its parent container.
       */
      fluid: {
        type: Boolean,
        reflect: true
      },

      /**
       * If declared, will apply padding around trigger slot content.
       */
      inset: {
        type: Boolean,
        reflect: true
      },

      /**
       * If true, the dropdown bib is displayed.
       */
      isPopoverVisible: {
        type: Boolean
      },

      /**
       * If true, the dropdown bib is taking the fullscreen when it's open.
       */
      isBibFullscreen: {
        type: Boolean,
        reflect: true,
      },

      /**
       * If declared, the trigger will toggle the dropdown on mouseover/mouseout.
       */
      hoverToggle: {
        type: Boolean,
        reflect: true
      },

      /**
       * @private
       */
      hasTriggerContent: {
        type: Boolean
      },

      /**
       * Defines the screen size breakpoint (`lg`, `md`, `sm`, or `xs`) at which the dropdown switches to fullscreen mode on mobile. When expanded, the dropdown will automatically display in fullscreen mode if the screen size is equal to or smaller than the selected breakpoint.
       */
      fullscreenBreakpoint: {
        type: String,
        reflect: true
      },

      /**
       * Defines if there is a label preset.
       * @private
       */
      labeled: {
        type: Boolean,
        reflect: true
      },

      /**
       * If declared, the popover and trigger will be set to the same width.
       */
      matchWidth: {
        type: Boolean,
        reflect: true
      },

      /**
       * If declared, the dropdown will not hide when moving focus outside the element.
       */
      noHideOnThisFocusLoss: {
        type: Boolean,
        reflect: true
      },

      /**
       * If declared, the trigger will only show the dropdown bib.
       */
      noToggle: {
        type: Boolean,
        reflect: true
      },

      onSlotChange: {
        type: Function,
        reflect: false
      },

      /**
       * @private
       */
      placement: {
        type: String
      },

      /**
       * If declared, will apply border-radius to trigger and default slots.
       */
      rounded: {
        type: Boolean,
        reflect: true
      },

      /**
       * @private
       */
      tabIndex: {
        type: Number
      },

      /**
       * aria-role value to be passed to the trigger node
       */
      role: {
        type: String,
        attribute: false,
      },

      /**
       * aria-autocomplete value to be passed to the trigger node
       */
      autocomplete: {
        type: String,
        attribute: false,
      }
    };
  }

  static get styles() {
    return [
      colorCss,
      styleCss,
      tokensCss
    ];
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
    this.floater.disconnect();
  }

  updated(changedProperties) {
    this.floater.handleUpdate(changedProperties);

    if (changedProperties.has('fullscreenBreakpoint')) {
      this.bibContent.mobileFullscreenBreakpoint = this.fullscreenBreakpoint;
    }

    // when trigger's content is changed without any attribute or node change,
    // `requestUpdate` needs to be called to update hasTriggerContnet
    if (changedProperties.size === 0 || changedProperties.has('isPopoverVisible')) {
      this.handleTriggerContentSlotChange();

      if (this.triggerContentSlot && this.triggerContentSlot[0].setAttribute) {
        this.triggerContentSlot[0].setAttribute('aria-expanded', this.isPopoverVisible ? 'true' : 'false');
      }
    }

  }

  firstUpdated() {
    this.floater.configure(this, 'auroDropdown');
    this.bibContent = this.floater.element.bib;

    // floatingUI will regenerate this id to be unique
    const bibId = this.bibContent.getAttribute('id');
    this.trigger.setAttribute('aria-controls', bibId);

    // Add the tag name as an attribute if it is different than the component name
    this.runtimeUtils.handleComponentTagRename(this, 'auro-dropdown');
  }

  /**
   * Exposes CSS parts for styling from parent components.
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
   * Determines if the element or any children are focusable.
   * @private
   * @param {HTMLElement} element - Element to check.
   * @returns {Boolean} - True if the element or any children are focusable.
   */
  containsFocusableElement(element) {
    this.showTriggerBorders = true;

    const nodes = [
      element,
      ...element.children
    ];

    const focusableElements = [
      'a',
      'auro-hyperlink',
      'button',
      'auro-button',
      'input',
      'auro-input',
    ];

    const focusableElementsThatNeedBorders = ['auro-input'];

    const result = nodes.some((node) => {
      const tagName = node.tagName.toLowerCase();

      if (node.tabIndex > -1) {
        return true;
      }

      if (focusableElements.includes(tagName)) {
        if ((tagName === 'a' || tagName === 'auro-hyperlink' || node.hasAttribute('auro-hyperlink')) && node.hasAttribute('href')) {
          return true;
        }
        if (!node.hasAttribute('disabled')) {
          return true;
        }
      }

      if (focusableElements.some((focusableElement) => focusableElement.startsWith('auro-') && (focusableElement === tagName || node.hasAttribute(focusableElement)))) {
        return true;
      }

      return false;
    });

    if (result) {
      this.showTriggerBorders = !nodes.some((node) => {
        const tagName = node.tagName.toLowerCase();
        return focusableElements.includes(tagName) && !focusableElementsThatNeedBorders.includes(tagName);
      });
    }

    return result;
  }

  /**
   * Sets aria attributes for the trigger element if a custom one is passed in.
   * @private
   * @method setTriggerAriaAttributes
   * @param { HTMLElement } triggerElement - The custom trigger element.
   */
  setTriggerA11yAttributes(triggerElement) {

    // Guard Clause: Ensure the element can have an attribute set
    if (!triggerElement.setAttribute) {
      return;
    }

    // Set appropriate attributes for a11y
    triggerElement.setAttribute('id', `${this.getAttribute('id')}-trigger-element`);
    triggerElement.setAttribute('role', this.role);
    triggerElement.setAttribute('aria-expanded', this.isPopoverVisible ? 'true' : 'false');
    if (this.autocomplete !== 'none') {
      triggerElement.setAttribute('aria-autocomplete', this.autocomplete);
    } else {
      triggerElement.removeAttribute('aria-autocomplete');
    }
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
   * @param {Event} event - Native slotchange event.
   * @returns {void}
   */
  handleTriggerContentSlotChange(event) {
    this.floater.handleTriggerTabIndex();

    const triggerSlot = this.shadowRoot.querySelector('.triggerContent slot');

    if (triggerSlot) {

      const triggerContentNodes = triggerSlot.assignedNodes();

      if (triggerContentNodes) {

        triggerContentNodes.forEach((node) => {
          if (!this.triggerContentFocusable) {
            this.triggerContentFocusable = this.containsFocusableElement(node);
          }
        });
      }
    }

    const trigger = this.shadowRoot.querySelector('#trigger');

    if (!this.triggerContentFocusable) {
      trigger.setAttribute('tabindex', '0');
      trigger.setAttribute('role', this.role);
    } else {
      trigger.removeAttribute('tabindex');
      trigger.removeAttribute('role');
    }

    if (event) {
      this.triggerNode = event.target;
      this.triggerContentSlot = event.target.assignedNodes();
    }

    if (this.triggerContentSlot) {
      this.setTriggerA11yAttributes(this.triggerContentSlot[0]);

      this.hasTriggerContent = this.triggerContentSlot.some((slot) => {
        if (slot.textContent.trim()) {
          return true;
        }
        const slotInSlot = slot.querySelector('slot');
        if (!slotInSlot) {
          return false;
        }
        const slotsInSlotNodes = slotInSlot.assignedNodes();
        return slotsInSlotNodes.some((ss) => Boolean(ss.textContent.trim()));
      });
    } else {
      this.hasTriggerContent = false;
    }
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

  /**
   * @private
   * @method handleLabelSlotChange
   * @param {event} event - The event object representing the slot change.
   * @description Handles the slot change event for the label slot.
   */
  handleLabelSlotChange (event) {

    // Get the nodes from the event
    const nodes = event.target.assignedNodes();

    // Guard clause for no nodes
    if (!nodes) {
      return;
    }

    // Convert the nodes to a measurable array so we can get the length
    const nodesArr = Array.from(nodes);

    // If the nodes array has a length, the dropdown is labeled
    this.labeled = nodesArr.length > 0;
  }

  // function that renders the HTML and CSS into  the scope of the component
  render() {
    return html`
      <div>
        <div
          id="trigger"
          class="trigger"
          part="trigger"
          aria-labelledby="triggerLabel"
          tabindex="${this.tabIndex}"
          ?showBorder="${this.showTriggerBorders}"
          >
          <div class="triggerContentWrapper">
            <label class="label" id="triggerLabel" hasTrigger=${this.hasTriggerContent}>
              <slot name="label" @slotchange="${this.handleLabelSlotChange}"></slot>
            </label>
            <div class="triggerContent">
              <slot
                name="trigger"
                @slotchange="${this.handleTriggerContentSlotChange}"></slot>
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
        <${this.helpTextTag} part="helpText" ?error="${this.error}">
          <slot name="helpText"></slot>
        </${this.helpTextTag}>
        <div class="slotContent">
          <slot @slotchange="${this.handleDefaultSlot}"></slot>
        </div>
        <div id="bibSizer" part="size"></div>
        <${this.dropdownBibTag}
          id="bib"
          ?data-show="${this.isPopoverVisible}"
          ?isfullscreen="${this.isBibFullscreen}"
          ?common="${this.common}"
          ?rounded="${this.common || this.rounded}"
          ?inset="${this.common || this.inset}">
        </${this.dropdownBibTag}>
      </div>
    `;
  }
}

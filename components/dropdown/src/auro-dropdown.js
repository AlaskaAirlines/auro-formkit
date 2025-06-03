// Copyright (c) 2020 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

/* eslint-disable max-lines, lit/no-invalid-html, lit/binding-positions, template-curly-spacing, no-magic-numbers */

import { html } from "lit/static-html.js";
import { classMap } from 'lit/directives/class-map.js';
import { LitElement } from "lit";

import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';
import AuroFloatingUI from '@aurodesignsystem/auro-library/scripts/runtime/floatingUI.mjs';

import { AuroDependencyVersioning } from '@aurodesignsystem/auro-library/scripts/runtime/dependencyTagVersioning.mjs';

import { AuroIcon } from '@aurodesignsystem/auro-icon/src/auro-icon.js';
import iconVersion from './iconVersion.js';


import { AuroDropdownBib } from './auro-dropdownBib.js';
import dropdownVersion from './dropdownVersion.js';

import shapeSizeCss from "./styles/shapeSize-css.js";
import colorCss from "./styles/color-css.js";
import tokensCss from "./styles/tokens-css.js";

// default layout
import classicColorCss from "./styles/default/color-css.js";
import classicLayoutCss from "./styles/default/style-css.js";


import styleEmphasizedCss from "./styles/emphasized/style-css.js";
import styleSnowflakeCss from "./styles/snowflake/style-css.js";

import { AuroHelpText } from '@aurodesignsystem/auro-helptext';
import helpTextVersion from './helptextVersion.js';
import { ifDefined } from "lit/directives/if-defined.js";

import { AuroElement } from '../../layoutElement/src/auroElement.js';

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
 * @event auroDropdown-idAdded - Notifies consumers that the unique ID for the dropdown bib has been generated.
 */
export class AuroDropdown extends AuroElement {
  constructor() {
    super();

    this.isPopoverVisible = false;
    this.isBibFullscreen = false;
    this.matchWidth = false;
    this.noHideOnThisFocusLoss = false;

    this.errorMessage = ''; // TODO!

    // Layout Config
    this.layout = 'classic';
    this.shape = 'rounded';
    this.size = 'xl';

    this.privateDefaults();
  }

  get commonLabelClasses() {
    return {
      // 'withValue': this.value && this.value.length > 0
    };
  }

  get commonWrapperClasses() {
    return {
      'trigger': true,
      'wrapper': true,
      'hasFocus': this.hasFocus,
      'simple': this.simple
    };
  }

  /**
   * @private
   * @returns {void} Internal defaults.
   */
  privateDefaults() {
    this.chevron = false;
    this.disabled = false;
    this.error = false;
    this.inset = false;
    this.rounded = false;
    this.tabIndex = 0;
    this.noToggle = false;
    this.a11yAutocomplete = 'none';
    this.labeled = true;
    this.a11yRole = 'button';
    this.onDark = false;
    this.showTriggerBorders = true;
    this.triggerContentFocusable = false;
    this.simple = false;

    // floaterConfig
    this.placement = 'bottom-start';
    this.offset = 0;
    this.noFlip = false;
    this.autoPlacement = false;

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

    /**
     * @private
     */
    this.bindFocusEventToTrigger = this.bindFocusEventToTrigger.bind(this);
  }

  /**
   * @ignore
   */
  get floaterConfig() {
    return {
      placement: this.placement,
      flip: !this.noFlip,
      autoPlacement: this.autoPlacement,
      offset: this.offset,
    };
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
       * If declared, bib's position will be automatically calculated where to appear.
       * @default false
       */
      autoPlacement: {
        type: Boolean,
        reflect: true
      },

      /**
       * If declared, applies a border around the trigger slot.
       */
      simple: {
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
       * The unique ID for the dropdown bib element.
       * @private
       */
      dropdownId: {
        type: String,
        reflect: false,
        attribute: false
      },

      /**
       * If declared in combination with not using the `simple` property or `helpText` slot content, will apply red color to both.
       */
      error: {
        type: Boolean,
        reflect: true
      },

      /**
       * Contains the help text message for the current validity error.
       */
      errorMessage: {
        type: String
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
        reflect: true
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
       * If declared, the bib will NOT flip to an alternate position
       * when there isn't enough space in the specified `placement`.
       * @default false
       */
      noFlip: {
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

      /**
       * Gap between the trigger element and bib.
       * @default 0
       */
      offset: {
        type: Number,
        reflect: true
      },

      /**
       *  If declared, onDark styles will be applied.
       */
      onDark: {
        type: Boolean,
        reflect: true
      },

      onSlotChange: {
        type: Function,
        reflect: false
      },

      /**
       * Position where the bib should appear relative to the trigger.
       * @default bottom-start
       */
      placement: {
        type: String,
        reflect: true
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
       * The value for the role attribute of the trigger element.
       */
      a11yRole: {
        type: String || undefined,
        attribute: false,
        reflect: false
      },

      /**
       * The value for the aria-autocomplete attribute of the trigger element.
       */
      a11yAutocomplete: {
        type: String,
        attribute: false,
      }
    };
  }

  static get styles() {
    return [
      colorCss,
      tokensCss,

      // default layout
      classicColorCss,
      classicLayoutCss,

      // emphasized layout
      styleEmphasizedCss,

      // snowflake layout
      styleSnowflakeCss,

      shapeSizeCss
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

  /**
   * Accessor for reusing the focusable entity query string.
   * @private
   * @returns {string}
   */
  get focusableEntityQuery () {
    return 'auro-input, [auro-input], auro-button, [auro-button], button, input';
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.floater.disconnect();
    this.clearTriggerFocusEventBinding();
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    this.floater.handleUpdate(changedProperties);

    // Note: `disabled` is not a breakpoint (it is not a screen size),
    // so it looks like we never consume this - however, dropdownBib handles this in the setter as "undefined"
    if (changedProperties.has('fullscreenBreakpoint')) {
      this.bibContent.mobileFullscreenBreakpoint = this.fullscreenBreakpoint;
    }

    // when trigger's content is changed without any attribute or node change,
    // `requestUpdate` needs to be called to update hasTriggerContent
    if (changedProperties.size === 0 || changedProperties.has('isPopoverVisible')) {
      this.handleTriggerContentSlotChange();
    }

  }

  firstUpdated() {

    // Configure the floater to, this will generate the ID for the bib
    this.floater.configure(this, 'auroDropdown');

    /**
     * @description Let subscribers know that the dropdown ID ha been generated and added.
     * @event auroDropdown-idAdded
     * @type {Object<key: 'id', value: string>} - The ID of the dropdown bib element.
     */
    this.dispatchEvent(new CustomEvent('auroDropdown-idAdded', {detail: {id: this.floater.element.id}}));

    // Set the bib ID locally if the user hasn't provided a focusable trigger
    if (!this.triggerContentFocusable) {
      this.dropdownId = this.floater.element.id;
    }

    this.bibContent = this.floater.element.bib;

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
   * Function to support @focusin event.
   * @private
   * @return {void}
   */
  handleFocusin() {
    this.hasFocus = true;
  }

  /**
   * Function to support @focusout event.
   * @private
   * @return {void}
   */
  handleFocusout() {
    this.hasFocus = false;
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
   * Creates and dispatches a duplicate focus event on the trigger element.
   * @private
   * @param {Event} event - The original focus event.
   */
  bindFocusEventToTrigger(event) {
    const dupEvent = new FocusEvent(event.type, {
      bubbles: false,
      cancelable: false,
      composed: true,
    });
    this.trigger.dispatchEvent(dupEvent);
  }

  /**
   * Sets up event listeners to deliver focus and blur events from nested Auro components within the trigger slot to trigger.
   * This ensures that focus/blur events originating from within these components are propagated to the trigger element itself.
   * @private
   */
  setupTriggerFocusEventBinding() {
    if (!this.triggerContentSlot || this.triggerContentSlot.length === 0) {
      return;
    }

    this.triggerContentSlot.forEach((node) => {
      if (node.querySelectorAll) {
        const auroElements = node.querySelectorAll(this.focusableEntityQuery);
        auroElements.forEach((auroEl) => {
          auroEl.addEventListener('focus', this.bindFocusEventToTrigger);
          auroEl.addEventListener('blur', this.bindFocusEventToTrigger);
        });
      }
    });
  }

  /**
   * Clears focus and blur event listeners from nested Auro components within the trigger slot.
   * @private
   * @returns {void}
   */
  clearTriggerFocusEventBinding() {
    if (!this.triggerContentSlot || this.triggerContentSlot.length === 0) {
      return;
    }

    this.triggerContentSlot.forEach((node) => {
      if (node.querySelectorAll) {
        const auroElements = node.querySelectorAll(this.focusableEntityQuery);
        auroElements.forEach((auroEl) => {
          auroEl.removeEventListener('focus', this.bindFocusEventToTrigger);
          auroEl.removeEventListener('blur', this.bindFocusEventToTrigger);
        });
      }
    });
  }

  /*
   * Sets aria attributes for the trigger element if a custom one is passed in.
   * @private
   * @method setTriggerAriaAttributes
   * @param { HTMLElement } triggerElement - The custom trigger element.
   */
  clearTriggerA11yAttributes(triggerElement) {

    if (!triggerElement || !triggerElement.removeAttribute) {
      return;
    }

    // Reset appropriate attributes for a11y
    triggerElement.removeAttribute('aria-labelledby');
    if (triggerElement.getAttribute('id') === `${this.id}-trigger-element`) {
      triggerElement.removeAttribute('id');
    }
    triggerElement.removeAttribute('role');
    triggerElement.removeAttribute('aria-expanded');

    triggerElement.removeAttribute('aria-controls');
    triggerElement.removeAttribute('aria-autocomplete');
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

    // Get the trigger
    const trigger = this.shadowRoot.querySelector('#trigger');

    // Get the trigger slot
    const triggerSlot = this.shadowRoot.querySelector('.triggerContent slot');

    // If there's a trigger slot
    if (triggerSlot) {

      // Get the content nodes to see if there are any children
      const triggerContentNodes = triggerSlot.assignedNodes();

      // If there are children
      if (triggerContentNodes) {

        // See if any of them are focusable elements
        this.triggerContentFocusable = triggerContentNodes.some((node) => this.containsFocusableElement(node));

        // If any of them are focusable elements
        if (this.triggerContentFocusable) {

          // Assume the consumer will be providing their own a11y in whatever they passed in
          this.clearTriggerA11yAttributes(trigger);

          // Remove the tabindex from the trigger so it doesn't interrupt focus flow
          trigger.removeAttribute('tabindex');
        } else {

          // Add the tabindex to the trigger so that it's in the focus flow
          trigger.setAttribute('tabindex', '0');
        }
      }
    }

    if (event) {
      this.triggerNode = event.target;
      this.triggerContentSlot = event.target.assignedNodes();
    }

    if (this.triggerContentSlot) {
      this.setupTriggerFocusEventBinding();

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

  /**
   * Returns HTML for the common portion of the layouts.
   * @private
   * @param {Object} helpTextClasses - Classes to apply to the help text container.
   * @returns {html} - Returns HTML.
   */
  renderBasicHtml(helpTextClasses) {
    return html`
      <div>
        <div
          id="trigger"
          class="${classMap(this.commonWrapperClasses)}" part="wrapper"
          tabindex="${this.tabIndex}"
          role="${ifDefined(this.triggerContentFocusable ? undefined : this.a11yRole)}"
          aria-expanded="${ifDefined(this.triggerContentFocusable ? undefined : this.isPopoverVisible)}"
          aria-controls="${ifDefined(this.triggerContentFocusable ? undefined : this.dropdownId)}"
          aria-labelledby="${ifDefined(this.triggerContentFocusable ? undefined : 'triggerLabel')}"
          @focusin="${this.handleFocusin}"
          @blur="${this.handleFocusOut}">
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
                  ?onDark="${this.onDark}"
                  variant="${this.disabled ? 'disabled' : 'muted'}">
                  >
                </${this.iconTag}>
              </div>
            ` : undefined }
        </div>
        <div class="${classMap(helpTextClasses)}">
          <slot name="helpText"></slot>
        </div>
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

  /**
   * Returns HTML for the classic layout. Does not support type="*".
   * @private
   * @returns {html} - Returns HTML for the classic layout.
   */
  renderLayoutClassic() {
    const helpTextClasses = {
      'helpText': true,
      'leftIndent': false,
      'rightIndent': false
    };

    return html`
      ${this.renderBasicHtml(helpTextClasses)}
    `;
    // return html`
    //   <div>
    //     <div
    //       id="trigger"
    //       class="trigger"
    //       part="trigger"
    //       tabindex="${this.tabIndex}"
    //       ?showBorder="${this.showTriggerBorders}"
    //       role="${ifDefined(this.triggerContentFocusable ? undefined : this.a11yRole)}"
    //       aria-expanded="${ifDefined(this.triggerContentFocusable ? undefined : this.isPopoverVisible)}"
    //       aria-controls="${ifDefined(this.triggerContentFocusable ? undefined : this.dropdownId)}"
    //       aria-labelledby="${ifDefined(this.triggerContentFocusable ? undefined : 'triggerLabel')}"
    //     >
    //       <div class="triggerContentWrapper">
    //         <label class="label" id="triggerLabel" hasTrigger=${this.hasTriggerContent}>
    //           <slot name="label" @slotchange="${this.handleLabelSlotChange}"></slot>
    //         </label>
    //         <div class="triggerContent">
    //           <slot
    //             name="trigger"
    //             @slotchange="${this.handleTriggerContentSlotChange}"></slot>
    //         </div>
    //       </div>
    //       ${this.chevron || this.common ? html`
    //           <div
    //             id="showStateIcon"
    //             part="chevron">
    //             <${this.iconTag}
    //               category="interface"
    //               name="chevron-down"
    //               ?onDark="${this.onDark}"
    //               variant="${this.disabled ? 'disabled' : 'muted'}">
    //               >
    //             </${this.iconTag}>
    //           </div>
    //         ` : undefined }
    //     </div>
    //     <div class="slotContent">
    //       <slot @slotchange="${this.handleDefaultSlot}"></slot>
    //     </div>
    //     <div id="bibSizer" part="size"></div>
    //     <${this.dropdownBibTag}
    //       id="bib"
    //       ?data-show="${this.isPopoverVisible}"
    //       ?isfullscreen="${this.isBibFullscreen}"
    //       ?common="${this.common}"
    //       ?rounded="${this.common || this.rounded}"
    //       ?inset="${this.common || this.inset}"
    //     >
    //     </${this.dropdownBibTag}>
    //   </div>
    // `;
  }

  /**
   * Returns HTML for the snowflake layout. Does not support type="*".
   * @private
   * @returns {html} - Returns HTML for the snowflake layout.
   */
  renderLayoutSnowflake() {
    const helpTextClasses = {
      'helpText': true,
      'leftIndent': true,
      'rightIndent': true
    };

    return html`
      ${this.renderBasicHtml(helpTextClasses)}
    `;
  }

  /**
   * Returns HTML for the emphasized layout. Does not support type="*".
   * @private
   * @returns {html} - Returns HTML for the emphasized layout.
   */
  renderLayoutEmphasized() {
    const helpTextClasses = {
      'helpText': true,
      'leftIndent': this.shape.toLowerCase().includes('pill') && !this.shape.toLowerCase().includes('right'),
      'rightIndent': this.shape.toLowerCase().includes('pill') && !this.shape.toLowerCase().includes('left')
    };

    return html`
      ${this.renderBasicHtml(helpTextClasses)}
    `;
  }

  /**
   * Logic to determine the layout of the component.
   * @private
   * @param {string} [ForcedLayout] - Used to force a specific layout, pass in the layout name to use.
   * @returns {HTMLCollection} - Returns the HTML for the layout.
   */
  renderLayout(ForcedLayout) {
    const layout = ForcedLayout || this.layout;

    switch (layout) {
      case 'emphasized':
        return this.renderLayoutEmphasized();
      case 'emphasized-left':
        return this.renderLayoutEmphasized();
      case 'emphasized-right':
        return this.renderLayoutEmphasized();
      case 'snowflake':
        return this.renderLayoutSnowflake();
      case 'snowflake-left':
        return this.renderLayoutSnowflake();
      case 'snowflake-right':
        return this.renderLayoutSnowflake();
      default:
        return this.renderLayoutClassic();
    }
  }
}

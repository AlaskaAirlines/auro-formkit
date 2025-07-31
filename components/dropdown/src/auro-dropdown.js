// Copyright (c) 2020 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

/* eslint-disable */

import { html } from "lit/static-html.js";
import { classMap } from 'lit/directives/class-map.js';
import { LitElement } from "lit";
import { createRef, ref } from 'lit/directives/ref.js';

import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';
import { getFocusableElements } from '@aurodesignsystem/auro-library/scripts/runtime/Focusables/index.mjs';

import { AuroDependencyVersioning } from '@aurodesignsystem/auro-library/scripts/runtime/dependencyTagVersioning.mjs';

import { AuroIcon } from '@aurodesignsystem/auro-icon/src/auro-icon.js';
import iconVersion from './iconVersion.js';

import { AuroDropdownBib } from './auro-dropdownBib.js';
import dropdownVersion from './dropdownVersion.js';

import { AuroLayover } from "@aurodesignsystem/auro-layover/class";
import layoverVersion from './layoverVersion.js';

import shapeSizeCss from "./styles/shapeSize-css.js";
import colorCss from "./styles/color-css.js";
import tokensCss from "./styles/tokens-css.js";

import styleCss from "./styles/style-css.js";

// default layout
import classicColorCss from "./styles/classic/color-css.js";
import classicLayoutCss from "./styles/classic/style-css.js";

import styleEmphasizedCss from "./styles/emphasized/style-css.js";
import styleSnowflakeCss from "./styles/snowflake/style-css.js";

import { AuroHelpText } from '@aurodesignsystem/auro-helptext';
import helpTextVersion from './helptextVersion.js';
import { ifDefined } from "lit/directives/if-defined.js";

import { AuroElement } from '../../layoutElement/src/auroElement.js';


/*
 * @slot - Default slot for the popover content.
 * @slot helpText - Defines the content of the helpText.
 * @slot trigger - Defines the content of the trigger.
 * @csspart trigger - The trigger content container.
 * @csspart chevron - The collapsed/expanded state icon container.
 * @csspart size - The size of the dropdown bib. (height, width, maxHeight, maxWidth only)
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

    this.errorMessage = undefined; // TODO - check with Doug if there is still more to do here

    // Layout Config
    this.layout = undefined;
    this.shape = undefined;
    this.size = undefined;

    this.parentBorder = false;

    /** @private */
    this.handleDropdownToggle = this._handleDropdownToggle.bind(this);

    this.privateDefaults();

    this._createElementRefs();

    this._handleTriggerClick = this._handleTriggerClick.bind(this);
  }

  /**
   * @private
   * @returns {object} Class definition for the wrapper element.
   */
  get commonWrapperClasses() {
    return {
      'trigger': true,
      'wrapper': true,
      'hasFocus': this.hasFocus,
      'simple': this.simple,
      'parentBorder': this.parentBorder
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
    this.tabIndex = 0;
    this.noToggle = false;
    this.a11yRole = 'button';
    this.onDark = false;
    this.showTriggerBorders = true;
    this.triggerContentFocusable = false;
    this.simple = false;

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
    // this.floater = new AuroFloatingUI();

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
    this.layoverTag = versioning.generateTag("auro-formkit-dropdown-layover", layoverVersion, AuroLayover);

    /**
     * @private
     */
    this.helpTextTag = versioning.generateTag('auro-formkit-dropdown-helptext', helpTextVersion, AuroHelpText);

    /**
     * @private
     */
    this.bindFocusEventToTrigger = this.bindFocusEventToTrigger.bind(this);
  }

  /** Creates refs for elements in the template @returns {void} @private */
  _createElementRefs() {

    // A reference to the layover element itself
    this._layoverRef = createRef();

    // A reference to the bib element inside of the layover
    this._bibRef = createRef();
  }

  get _layover() {
    return this._layoverRef.value;
  }

  get _bib() {
    return this._bibRef.value;
  }

  /**
   * @ignore
   */
  // get layoverConfig() {
  //   return {
  //     placement: this.placement,
  //     flip: !this.noFlip,
  //     autoPlacement: this.autoPlacement,
  //     offset: this.offset,
  //   };
  // }

  /**
   * Public method to toggle the dropdown.
   * @returns {void}
   */
  toggle() {
    if (this.layover) this._layover.toggle();
  }

  /**
   * Public method to hide the dropdown.
   * @returns {void}
   */
  hide() {
    if (this.layover) this._layover.hide();
  }

  /**
   * Public method to show the dropdown.
   * @returns {void}
   */
  show() {
    this._layover.show();
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
       * If declared, the dropdown will only show by calling the API .show() public method.
       * @default false
       */
      disableEventShow: {
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
       * If declared, the dropdown is not interactive.
       */
      disabled: {
        type: Boolean,
        reflect: true
      },

      /**
       * If declared, the focus trap inside of bib will be turned off.
       */
      disableFocusTrap: {
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
       * If true, the dropdown bib is displayed.
       */
      isPopoverVisible: {
        type: Boolean,
        reflect: true,
        attribute: 'open'
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
       * A reference to the input in the trigger element if it exists
       * @private
       */
      _inputInTrigger: {
        type: Object,
        state: true
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
       * Defines if the trigger should size based on the parent element providing the border UI.
       * @private
       */
      parentBorder: {
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

      /**
       *  If declared, and a function is set, that function will execute when the slot content is updated.
       */
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
      }
    };
  }

  static get styles() {
    return [
      styleCss,
      tokensCss,
      colorCss,

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
  get focusableEntityQuery() {
    return 'auro-input, [auro-input], auro-button, [auro-button], button, input';
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.layover) this.layover.disconnect();
    this.clearTriggerFocusEventBinding();
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    // this.layover.handleUpdate(changedProperties);

    // Note: `disabled` is not a breakpoint (it is not a screen size),
    // so it looks like we never consume this - however, dropdownBib handles this in the setter as "undefined"
    // if (changedProperties.has('fullscreenBreakpoint')) {
    //   this.bibContent.mobileFullscreenBreakpoint = this.fullscreenBreakpoint;
    // }

    // when trigger's content is changed without any attribute or node change,
    // `requestUpdate` needs to be called to update hasTriggerContent
    if (changedProperties.size === 0 || changedProperties.has('isPopoverVisible')) {
      this.handleTriggerContentSlotChange();
    }
  }

  /**
   * Toggles the state of the popover visibility to the legacy isPopoverVisible property.
   * @private
   */
  _handleDropdownToggle() {
    this.isPopoverVisible = this._layover.shown;

    this.dispatchEvent(new CustomEvent('auroDropdown-toggled', { detail: { expanded: this.isPopoverVisible } }));
  }

  _handleBeforeDropdownToggle() {
    this._calculateIsBibFullscreen();
  }

  _calculateIsBibFullscreen() {
    const styles = getComputedStyle(document.documentElement);
    const breakpoint = styles.getPropertyValue(`--ds-grid-breakpoint-${this.fullscreenBreakpoint}`).trim();
    const smallerThanBreakpoint = window.matchMedia(`(max-width: ${breakpoint})`).matches;
    this.isBibFullscreen = smallerThanBreakpoint;
    this.dispatchEvent(new CustomEvent('auroDropdown-strategy-change'));
  }

  firstUpdated() {

    // Configure the layover to, this will generate the ID for the bib
    // this.layover.configure(this, 'auroDropdown');
    this.addEventListener('auro-layover-change', this._handleDropdownToggle);
    this.addEventListener('auro-layover-beforechange', this._handleBeforeDropdownToggle);

    // Initial measuring of if we should be fullscreen
    this._calculateIsBibFullscreen();

    /**
     * @description Let subscribers know that the dropdown ID ha been generated and added.
     * @event auroDropdown-idAdded
     * @type {Object<key: 'id', value: string>} - The ID of the dropdown bib element.
     */
    // this.dispatchEvent(new CustomEvent('auroDropdown-idAdded', {detail: {id: this.floater.element.id}}));

    // Set the bib ID locally if the user hasn't provided a focusable trigger
    // if (!this.triggerContentFocusable) {
    //   this.dropdownId = this.floater.element.id;
    // }

    // this.bibContent = this.floater.element.bib;

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
    // this.floater.handleTriggerTabIndex();

    // Get the trigger
    const trigger = this.shadowRoot.querySelector('#trigger');

    // Get the trigger slot
    const triggerSlot = this.shadowRoot.querySelector('.triggerContentWrapper slot');

    // If there's a trigger slot
    if (triggerSlot) {

      // Get the content nodes to see if there are any children
      const triggerContentNodes = triggerSlot.assignedNodes();

      // If there are children
      if (triggerContentNodes) {

        // See if any of them are focusable elements
        this.triggerContentFocusable = triggerContentNodes.some((node) => getFocusableElements(node).length > 0);

        // If any of them are focusable elements
        if (this.triggerContentFocusable) {

          // Check if any of the focusable elements are input elements
          this._inputInTrigger = triggerContentNodes.find((node) => {
            return node.tagName && node.tagName.toLowerCase().match('input') ? node : false;
          });

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
      // Wrap in a try-catch block to handle errors when trying to use assignedNodes from the NodeJS test environment.
      try {
        this.triggerNode = event.target;
        this.triggerContentSlot = event.target.assignedNodes();
      } catch (error) {
        console.warn('auro-dropdown: Unable to access the trigger content slot.', error); // eslint-disable-line no-console
      }
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
   * @fires Function#onSlotChange - Optional callback invoked when the slot content changes.
   */
  handleDefaultSlot() {

    if (this.onSlotChange) {
      this.onSlotChange();
    }
  }

  _handleTriggerClick(evt) {
    this.dispatchEvent(new CustomEvent('auroDropdown-triggerClick', { detail: { event: evt } }));
  }

  get _currentBehavior() {

    // Handle input
    if (this._inputInTrigger) return this.isBibFullscreen ? 'input-fullscreen' : 'input-dropdown';

    // Fallback to the default behaviors
    return this.isBibFullscreen ? 'dialog-fullscreen' : 'dropdown'
  }

  /**
   * Returns HTML for the common portion of the layouts.
   * @private
   * @param {Object} helpTextClasses - Classes to apply to the help text container.
   * @returns {html} - Returns HTML.
   */
  renderBasicHtml(helpTextClasses) {
    return html`
      <${this.layoverTag} 
        ${ref(this._layoverRef)}
        .behavior="${this._currentBehavior}"
        .input="${this._inputInTrigger}"
        .minInputLength="${1}"
        .offset="${4}"
        .showOnFocus="${this._currentBehavior !== 'input-fullscreen'}"
        .showOnHover="${this.hoverToggle}"
        .matchWidth="${this.matchWidth && !this.isBibFullscreen}"
      >
        <div
          slot="trigger"
          id="trigger"
          part="wrapper"          
          class="${classMap(this.commonWrapperClasses)}"
          @click="${this._handleTriggerClick}"
        >
          <div class="triggerContentWrapper" id="triggerLabel">
            <slot
              name="trigger"
              @slotchange="${this.handleTriggerContentSlotChange}">
            </slot>
          </div>
          ${this.chevron ? html`
              <div
                id="showStateIcon"
                class="chevron"
                part="chevron">
                <${this.iconTag}
                  category="interface"
                  name="${this.isPopoverVisible ? 'chevron-up' : `chevron-down`}"
                  ?onDark="${this.onDark}"
                  variant="${this.disabled ? 'disabled' : 'muted'}">
                  >
                </${this.iconTag}>
              </div>
            ` : undefined}
        </div>
        <${this.dropdownBibTag}
          ${ref(this._bibRef)}
          id="bib"
          shape="${this.shape}"
          ?matchWidth="${this.matchWidth && !this.isBibFullscreen}"
          ?data-show="${this.isPopoverVisible}"
          ?isfullscreen="${this.isBibFullscreen}">
          <div class="slotContent">
            <slot @slotchange="${this.handleDefaultSlot}"></slot>
          </div>
        </${this.dropdownBibTag}>
      </${this.layoverTag}>
      <div class="${classMap(helpTextClasses)}">
        <slot name="helpText"></slot>
      </div>
    `;
  }

  /**
   * Returns HTML for the classic layout. Does not support type="*".
   * @private
   * @returns {html} - Returns HTML for the classic layout.
   */
  renderLayoutClassic() {
    // TODO: check with Doug why this was never used?
    const helpTextClasses = {
      'helpText': true
    };

    return html`
      ${this.renderBasicHtml(helpTextClasses)}
    `;
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

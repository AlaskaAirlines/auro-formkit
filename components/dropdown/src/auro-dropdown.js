// Copyright (c) 2026 Alaska Airlines. All rights reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

/* eslint-disable max-lines, lit/no-invalid-html, lit/binding-positions, template-curly-spacing, line-comment-position, no-inline-comments, no-warning-comments, no-underscore-dangle, consistent-this, prefer-destructuring */

import { html } from "lit/static-html.js";
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from "lit/directives/ref.js";

import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';
import AuroFloatingUI from '@aurodesignsystem/auro-library/scripts/runtime/floatingUI.mjs';
import { getFocusableElements } from '@aurodesignsystem/auro-library/scripts/runtime/Focusables/index.mjs';

import { AuroDependencyVersioning } from '@aurodesignsystem/auro-library/scripts/runtime/dependencyTagVersioning.mjs';

import { AuroIcon } from '@aurodesignsystem/auro-icon/class';
import iconVersion from './iconVersion.js';

import { AuroDropdownBib } from './auro-dropdownBib.js';

import shapeSizeCss from "./styles/shapeSize-css.js";
import colorCss from "./styles/color-css.js";
import tokensCss from "./styles/tokens-css.js";

import styleCss from "./styles/style-css.js";

import classicColorCss from "./styles/classic/color-css.js";
import classicLayoutCss from "./styles/classic/style-css.js";

import styleEmphasizedCss from "./styles/emphasized/style-css.js";
import styleSnowflakeCss from "./styles/snowflake/style-css.js";

import { AuroHelpText } from '@aurodesignsystem/auro-helptext';
import formkitVersion from '@aurodesignsystem/version';
import { ifDefined } from "lit/directives/if-defined.js";

import { AuroElement } from '../../layoutElement/src/auroElement.js';

/**
 * The `auro-dropdown` element provides a way to place content in a bib that can be toggled.
 * @customElement auro-dropdown
 *
 * @slot - Default slot for the dropdown bib content.
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
  static get shadowRootOptions() {
    return {
      ...AuroElement.shadowRootOptions,
    };
  }

  constructor() {
    super();

    this.isPopoverVisible = false;
    this.isBibFullscreen = false;
    this.matchWidth = false;
    this.noHideOnThisFocusLoss = false;

    /**
     * When true, the dropdown skips its generic focus restoration on close.
     * Set by consumers (e.g. combobox) that manage their own focus routing
     * via setClearBtnFocus / setInputFocus / keyboard strategy.
     * Separate from noHideOnThisFocusLoss (which controls auto-close behavior).
     * @private
     */
    this.noFocusRestoreOnClose = false;

    this.errorMessage = undefined; // TODO - check with Doug if there is still more to do here

    // Layout Config
    this.layout = undefined;
    this.shape = undefined;
    this.size = undefined;

    this.parentBorder = false;

    /** @private */
    this.handleDropdownToggle = this.handleDropdownToggle.bind(this);

    /** @private */
    this.bibElement = createRef();

    this._intializeDefaults();
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
  _intializeDefaults() {
    this.appearance = 'default';
    this.chevron = false;
    this.desktopModal = false;
    this.disabled = false;
    this.disableKeyboardHandling = false;
    this.error = false;
    this.tabIndex = 0;
    this.noToggle = false;
    this.a11yRole = 'button';
    this.onDark = false;
    this.showTriggerBorders = true;
    this.triggerContentFocusable = false;
    this.simple = false;

    // floaterConfig
    this.placement = 'bottom-start';
    this.offset = 0;
    this.noFlip = false;
    this.shift = false;
    this.autoPlacement = false;

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
    this.dropdownBibTag = versioning.generateTag('auro-formkit-dropdown-dropdownbib', formkitVersion, AuroDropdownBib);

    /**
     * @private
     */
    this.helpTextTag = versioning.generateTag('auro-formkit-dropdown-helptext', formkitVersion, AuroHelpText);

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
      shift: this.shift,
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

    // Open dialog synchronously so callers remain in the user gesture
    // chain. This is critical for mobile browsers (iOS Safari) to keep
    // the virtual keyboard open when transitioning from the trigger
    // input to an input inside the fullscreen dialog. Without this,
    // showModal() fires asynchronously via Lit's update cycle, which
    // falls outside the user activation window and causes iOS to
    // dismiss the keyboard.
    if (this.bibElement && this.bibElement.value) {
      this.bibElement.value.open(this.isBibFullscreen);
    }
  }

  /**
   * When bib is open, focus on the first element inside of bib.
   * If not, trigger element will get focus.
   */
  focus() {
    if (this.isPopoverVisible && this.bibContent) {
      const focusables = getFocusableElements(this.bibContent);
      if (focusables.length > 0) {
        focusables[0].focus();
      }
    } else {
      this.focusTrigger();
    }
  }

  /**
   * Focus the trigger content. When the trigger wrapper itself is focusable
   * (has tabindex), focus it directly. Otherwise, focus the first focusable
   * element slotted into the trigger slot (e.g. the auro-input).
   * @private
   */
  focusTrigger() {
    if (this.trigger.hasAttribute('tabindex')) {
      this.trigger.focus();
    } else {
      // Slotted content isn't a DOM child of the trigger div, so
      // getFocusableElements can't find it. Query assigned nodes directly.
      const slot = this.trigger.querySelector('slot[name="trigger"]');
      if (slot) {
        const assigned = slot.assignedElements();
        for (const el of assigned) {
          if (el.hasAttribute('disabled')) {
            continue;
          }
          // Try finding a focusable descendant first (handles non-focusable
          // wrappers like <div> containing a <button>). If none found, try
          // focusing the element directly (works for custom elements like
          // auro-input that have delegatesFocus or a custom focus() method).
          const descendants = getFocusableElements(el);
          if (descendants.length > 0) {
            descendants[0].focus();
            return;
          }
          el.focus();
          if (document.activeElement === el) {
            return;
          }
        }
      }
      // Fallback: try DOM children (non-slotted content)
      const focusables = getFocusableElements(this.trigger);
      if (focusables.length > 0) {
        focusables[0].focus();
      }
    }
  }

  /**
   * Sets the active descendant element for accessibility.
   * Uses ariaActiveDescendantElement to cross shadow DOM boundaries.
   * This function is used in components that contain `auro-dropdown` to set the active descendant.
   * @private
   * @param {HTMLElement|null} element - The element to set as the active descendant, or null to clear.
   * @returns {void}
   */
  setActiveDescendant(element) {
    if (!this.trigger) {
      return;
    }

    if (element) {
      this.trigger.ariaActiveDescendantElement = element;
    } else {
      this.trigger.ariaActiveDescendantElement = null;
      this.trigger.removeAttribute('aria-activedescendant');
    }

    // In fullscreen, focus stays on the close button while arrow keys
    // highlight options via active-descendant. Without this flag the
    // keyboard bridge clicks the close button on Enter (closing the
    // bib without selecting). When true, the bridge skips the button
    // click and forwards Enter to the parent to make the selection.
    if (this.bibContent) {
      this.bibContent.hasActiveDescendant = this.isBibFullscreen && Boolean(element);
    }
  }

  // function to define props used within the scope of this component
  static get properties() {
    return {

      /**
       * The value for the role attribute of the trigger element.
       */
      a11yRole: {
        type: String,
        attribute: false,
        reflect: false
      },

      /**
       * Defines whether the component will be on lighter or darker backgrounds.
       * @type {'default' | 'inverse'}
       * @default 'default'
       */
      appearance: {
        type: String,
        reflect: true
      },

      /**
       * If declared, bib's position will be automatically calculated where to appear.
       */
      autoPlacement: {
        type: Boolean,
        reflect: true
      },

      /**
       * If declared, the dropdown will behave as a modal dialog when in a desktop viewport size.
       */
      desktopModal: {
        type: Boolean,
        reflect: true
      },

      /**
       * If declared, the dropdown will only show by calling the API .show() public method.
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
       */
      chevron: {
        type: Boolean,
        reflect: true,
        attribute: 'chevron'
      },

      /**
       * If declared, the dropdown is not interactive.
       */
      disabled: {
        type: Boolean,
        reflect: true
      },

      /**
       * If declared, the dropdown will not handle keyboard events and will require the consumer to manage this behavior.
       */
      disableKeyboardHandling: {
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
       * If declared, will apply error UI to the dropdown.
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
       * Defines the screen size breakpoint at which the dropdown switches to fullscreen mode on mobile. `disabled` indicates a dropdown should _never_ enter fullscreen.
       *
       * When expanded, the dropdown will automatically display in fullscreen mode
       * if the screen size is equal to or smaller than the selected breakpoint.
       * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'disabled'}
       * @default 'sm'
       */
      fullscreenBreakpoint: {
        type: String,
        reflect: true
      },

      /**
       * Sets the layout of the dropdown.
       * @type {'classic' | 'emphasized' | 'snowflake'}
       * @default 'classic'
       */
      layout: {
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
       */
      noFlip: {
        type: Boolean,
        reflect: true
      },

      /**
       * If declared, the dropdown will shift its position to avoid being cut off by the viewport.
       */
      shift: {
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
       * DEPRECATED - use `appearance="inverse"` instead.
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
       * @type {'top' | 'right' | 'bottom' | 'left' | 'bottom-start' | 'top-start' | 'top-end' | 'right-start' | 'right-end' | 'bottom-end' | 'left-start' | 'left-end'}
       * @default 'bottom-start'
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
       * Accessible label for the dropdown bib dialog element.
       * @private
       */
      bibDialogLabel: {
        type: String,
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
   * @param {string} [name="auro-dropdown"] - The name of the element that you want to register.
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
    this._clearPageInert();
    if (this._bibTabHandler) {
      this.removeEventListener('keydown', this._bibTabHandler);
      this._bibTabHandler = undefined;
    }
    if (this.focusTrap) {
      this.focusTrap.disconnect();
      this.focusTrap = undefined;
    }
    if (this.floater) {
      this.floater.hideBib('disconnect');
      this.floater.disconnect();
    }
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

    if (changedProperties.has('isPopoverVisible') && this.bibElement.value) {
      if (this.isPopoverVisible) {
        // Fullscreen: use showModal() for native accessibility (inert outside, focus trap)
        // Desktop: use show() for Floating UI positioning + FocusTrap for focus management
        this.bibElement.value.open(this.isBibFullscreen);
        this.updateFocusTrap();

        // Desktop modal: make siblings inert so content outside is not interactive
        if (this.desktopModal && !this.isBibFullscreen) {
          this._setPageInert();
        }
      } else {
        this.bibElement.value.close();
        this._clearPageInert();
      }
    }

    // When fullscreen strategy changes while open, re-open dialog with correct mode
    // (e.g. resizing from desktop → mobile while dropdown is open)
    if (changedProperties.has('isBibFullscreen') && this.isPopoverVisible && this.bibElement.value) {
      this.bibElement.value.close();
      this.bibElement.value.open(this.isBibFullscreen);

      // Re-initialize focus management for the new strategy
      this.updateFocusTrap();

      // Toggle inert: desktop modal needs it, fullscreen showModal() handles it natively
      if (this.desktopModal && !this.isBibFullscreen) {
        this._setPageInert();
      } else {
        this._clearPageInert();
      }
    }

    // Handle desktopModal toggled while the dropdown is already open.
    // Re-initialize focus trapping and page inert state to match the new mode.
    if (changedProperties.has('desktopModal') && this.isPopoverVisible && !this.isBibFullscreen) {
      this.updateFocusTrap();
      if (this.desktopModal) {
        this._setPageInert();
      } else {
        this._clearPageInert();
      }
    }
  }

  /**
   * Handles the custom event `auroDropdown-toggled` to update the visibility of the dropdown bib.
   * @private
   * @param {CustomEvent} event - The custom event that contains the dropdown toggle information.
   */
  handleDropdownToggle(event) {
    this.isPopoverVisible = event.detail.expanded;

    // Tear down FocusTrap when closing. Creation happens in updated()
    // after the dialog is open so getFocusableElements can find content.
    if (!this.isPopoverVisible) {
      this.updateFocusTrap();
    }

    const eventType = event.detail.eventType || "unknown";
    if (!this.isPopoverVisible && this.hasFocus && eventType === "keydown" && !this.noFocusRestoreOnClose) {
      this.focusTrigger();
    }


    // On Tab-driven close (eventType "focusloss"), let focus advance naturally
    // — restoring to the trigger would trap the user on this dropdown, forcing
    // an extra Tab to move on. Escape and outside-click still restore.
    // When noFocusRestoreOnClose is true, the consumer (e.g. combobox) manages
    // its own focus restoration — skip the generic trigger focus to avoid races.
    if (!this.isPopoverVisible && eventType !== "focusloss" && !this.noFocusRestoreOnClose) {
      // wait til the bib gets fully closed and rendered
      setTimeout(() => {
        // Skip if the bib re-opened, or if focus moved intentionally outside the dropdown (not to body).
        // Restore focus to trigger when focus is still inside the bib (:focus-within) or fell to body.
        if (this.isPopoverVisible ||
          // eslint-disable-next-line no-extra-parens
          (!this.bibContent?.matches(':focus-within') &&
            document.activeElement !== document.body)) {
          return;
        }
        // Restore focus to the trigger.
        this.focusTrigger();
      });
    }
  }

  firstUpdated() {
    // Configure the floater to, this will generate the ID for the bib
    this.floater.configure(this, 'auroDropdown', !this.disableKeyboardHandling);

    // Prevent `contain: layout` on the dropdown host. Layout containment
    // creates a containing block for position:fixed descendants (the bib),
    // which clips the bib inside ancestor overflow contexts such as a
    // <dialog> element. Without it, the bib's position:fixed is relative
    // to the viewport, letting Floating UI's flip middleware detect
    // viewport boundaries and the bib escape overflow clipping.
    const origConfigureBibStrategy = this.floater.configureBibStrategy.bind(this.floater);
    this.floater.configureBibStrategy = (value) => {
      origConfigureBibStrategy(value);
      this.style.contain = '';
    };

    this.addEventListener('auroDropdown-toggled', this.handleDropdownToggle);

    // Handle ESC key from dialog's cancel event
    this.addEventListener('auro-bib-cancel', () => {
      this.floater.hideBib('keydown');
    });

    /**
     * @description Let subscribers know that the dropdown ID ha been generated and added.
     * @event auroDropdown-idAdded
     * @type {Object<key: 'id', value: string>} - The ID of the dropdown bib element.
     */
    this.dispatchEvent(new CustomEvent('auroDropdown-idAdded', {detail: {id: this.floater.element.id}}));

    // Set the bib ID locally for aria-controls (must be in the same shadow root as the trigger)
    if (!this.triggerContentFocusable) {
      this.dropdownId = this.floater.element.bib.id;
    }

    this.bibContent = this.floater.element.bib;

    // Add the tag name as an attribute if it is different than the component name
    this.runtimeUtils.handleComponentTagRename(this, 'auro-dropdown');

    this.trigger.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('auroDropdown-triggerClick', {
        bubbles: true,
        composed: true
      }));
    });
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
   * @private
   */
  updateFocusTrap() {
    // Always clean up existing handlers/traps before setting up new ones
    // to prevent duplicate listeners on repeated calls.
    if (this._bibTabHandler) {
      this.removeEventListener('keydown', this._bibTabHandler);
      this._bibTabHandler = undefined;
    }

    if (this.focusTrap) {
      this.focusTrap.disconnect();
      this.focusTrap = undefined;
    }

    // Restore the user-set noHideOnThisFocusLoss value, if we overrode it.
    if (this._noHideOverridden) {
      this.noHideOnThisFocusLoss = this._priorNoHide;
      this._noHideOverridden = false;
      this._priorNoHide = undefined;
    }

    if (this.isPopoverVisible) {
      if (!this.isBibFullscreen) {
        if (this.desktopModal) {
          // The floater's focus-loss check uses :focus-within, which does not
          // match the host when focus is on a slotted element projected through
          // multiple shadow roots. Without this override, focusing a button
          // inside the bib would be misread as focus leaving the dropdown and
          // close the bib immediately. desktopModal traps focus inside the
          // bib and inerts siblings, so suppressing focus-loss dismissal here
          // is safe — Escape and outside-click still close the bib.
          this._priorNoHide = this.noHideOnThisFocusLoss;
          this._noHideOverridden = true;
          this.noHideOnThisFocusLoss = true;

          // Desktop modal: trap focus only within the bib content.
          // Can't use FocusTrap on the bib element because keydown events
          // from slotted content bubble through the dropdown host (light DOM),
          // not through the bib (shadow projection target). Using FocusTrap
          // on the dropdown would include the trigger in the tab cycle.
          // Instead, listen for Tab on the dropdown and manually wrap focus
          // within the bib's focusable elements.
          this._bibTabHandler = (event) => {
            if (event.key !== 'Tab') {
              return;
            }

            // Collect focusable elements from the bib content.
            const focusables = getFocusableElements(this.bibContent);

            // Fallback: try from slotted content directly
            if (!focusables.length) {
              const slot = this.shadowRoot.querySelector('.slotContent slot');
              const assignedNodes = slot.assignedNodes({ flatten: true });

              for (const node of assignedNodes) {
                if (node.nodeType === Node.ELEMENT_NODE) {
                  focusables.push(...getFocusableElements(node));
                }
              }
            }

            if (!focusables.length) {
              return;
            }

            event.preventDefault();

            const direction = event.shiftKey ? -1 : 1; // eslint-disable-line no-magic-numbers

            // Walk the active element chain through shadow roots
            const actives = this._getActiveElements();

            let idx = focusables.findIndex((el) => actives.includes(el));

            if (idx === -1) { // eslint-disable-line no-magic-numbers
              // Focus is not on a known element — move to first/last
              idx = direction === 1 ? -1 : focusables.length; // eslint-disable-line no-magic-numbers
            }

            // Try each element in order, skipping any that can't receive focus
            // (e.g. hidden elements, elements in collapsed sections)
            for (let index = 0; index < focusables.length; index++) { // eslint-disable-line no-plusplus
              let nextIdx = idx + direction;

              // Wrap around
              if (nextIdx < 0) {
                nextIdx = focusables.length - 1;
              } else if (nextIdx >= focusables.length) {
                nextIdx = 0;
              }

              focusables[nextIdx].focus();

              // Verify focus actually moved to the target
              const newActives = this._getActiveElements();

              if (newActives.includes(focusables[nextIdx])) {
                return;
              }

              // Focus didn't stick — skip this element and try the next
              idx = nextIdx;
            }
          };
          this.addEventListener('keydown', this._bibTabHandler);

          // Suppress AuroFloatingUI's auto-hide-on-focus-loss while the
          // desktopModal trap owns focus management. Without this, the very
          // first focus move into the bib (from the RAF below) triggers
          // handleFocusLoss → hideBib, tearing down the trap before the
          // user can press Tab.
          this._priorNoHideOnFocusLoss = this.noHideOnThisFocusLoss;
          this.noHideOnThisFocusLoss = true;

          // Move initial focus into the bib content, matching FocusTrap behavior
          requestAnimationFrame(() => {
            const focusables = getFocusableElements(this.bibContent);
            if (focusables.length) {
              focusables[0].focus();
            }
          });
        } else {
          // Normal desktop (non-modal): move initial focus into the bib but
          // don't trap Tab. Tab should exit the bib and let the floater's
          // handleFocusLoss close it, matching native <select>/<details>
          // behavior. Deferred one frame because Floating UI positions the
          // popover asynchronously — a synchronous focus() would target
          // zero-dimension elements and be silently ignored.
          requestAnimationFrame(() => {
            const focusables = getFocusableElements(this.bibContent);
            if (focusables.length) {
              focusables[0].focus();
            }
          });
        }
      }
      // Fullscreen: showModal() provides native focus trapping
    }
  }

  /**
   * Returns the chain of active (focused) elements through shadow roots.
   * @private
   * @returns {Array<HTMLElement>}
   */
  _getActiveElements() {
    let { activeElement } = document;
    const actives = [activeElement];

    while (activeElement?.shadowRoot?.activeElement) {
      activeElement = activeElement.shadowRoot.activeElement;
      actives.push(activeElement);
    }

    return actives;
  }

  /**
   * Sets `inert` on sibling elements of the dropdown's top-level host
   * so that content outside the dropdown is not interactive while the modal is open.
   * Walks up through shadow DOM boundaries to find the outermost host element
   * in the light DOM, then sets `inert` on siblings at each ancestor level
   * to ensure all page content outside the host subtree is inert.
   * @private
   */
  _setPageInert() {
    if (this._inertSiblings) {
      return;
    }

    this._inertSiblings = [];

    // Walk up through shadow DOM boundaries to find the topmost host
    // element in the light DOM. For example, if this dropdown is inside
    // auro-datepicker's shadow DOM, we walk up to the datepicker element
    // so we set inert on its siblings — not on the datepicker itself.
    let host = this;
    while (host.getRootNode() instanceof ShadowRoot) {
      host = host.getRootNode().host;
    }

    // Walk up the ancestor chain, inerting siblings at each level
    // to ensure the entire page outside the host subtree is inert.
    // Uses a reference counter (data-auro-inert-count) so multiple
    // simultaneous modal dropdowns share inert state safely.
    let current = host;
    while (current.parentElement) {
      const parent = current.parentElement;
      for (const sibling of parent.children) {
        if (sibling !== current) {
          const count = parseInt(sibling.dataset.auroInertCount || '0', 10);
          if (count === 0) {
            sibling.dataset.auroInertWas = sibling.inert ? 'true' : 'false';
          }
          sibling.dataset.auroInertCount = String(count + 1);
          sibling.inert = true;
          this._inertSiblings.push(sibling);
        }
      }
      current = parent;
    }
  }

  /**
   * Restores `inert` state on siblings that were tracked by `_setPageInert`.
   * Uses reference counting so inert is only cleared when the last modal
   * dropdown releases a given element. Preserves the original inert state
   * so externally-inerted elements are not inadvertently re-enabled.
   * @private
   */
  _clearPageInert() {
    if (this._inertSiblings) {
      for (const sibling of this._inertSiblings) {
        const count = parseInt(sibling.dataset.auroInertCount || '1', 10) - 1;
        if (count <= 0) {
          const wasInert = sibling.dataset.auroInertWas === 'true';
          delete sibling.dataset.auroInertCount;
          delete sibling.dataset.auroInertWas;
          sibling.inert = wasInert;
        } else {
          sibling.dataset.auroInertCount = String(count);
        }
      }
      this._inertSiblings = undefined;
    }
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
          tabindex="${ifDefined(this.triggerContentFocusable ? undefined : this.tabIndex)}"
          role="${ifDefined(this.triggerContentFocusable ? undefined : this.a11yRole)}"
          aria-expanded="${ifDefined(this.a11yRole === 'button' || this.triggerContentFocusable ? undefined : this.isPopoverVisible)}"
          aria-controls="${ifDefined(this.a11yRole === 'button' || this.triggerContentFocusable ? undefined : this.dropdownId)}"
          aria-haspopup="${ifDefined(this.a11yRole === 'combobox' && !this.triggerContentFocusable ? 'listbox' : undefined)}"
          aria-labelledby="${ifDefined(this.triggerContentFocusable ? undefined : 'triggerLabel')}"
          aria-disabled="${ifDefined(this.disabled ? 'true' : undefined)}"
          @focusin="${this.handleFocusin}"
          @blur="${this.handleFocusOut}">
          <div class="triggerContentWrapper" id="triggerLabel">
            <slot
              name="trigger"
              @slotchange="${this.handleTriggerContentSlotChange}"></slot>
          </div>
          ${this.chevron ? html`
              <div
                id="showStateIcon"
                class="chevron"
                part="chevron"
                aria-hidden="true">
                <${this.iconTag}
                  category="interface"
                  name="${this.isPopoverVisible ? 'chevron-up' : `chevron-down`}"
                  appearance="${this.onDark ? 'inverse' : this.appearance}"
                  variant="${this.disabled ? 'disabled' : 'muted'}"
                  ariaHidden="true">
                </${this.iconTag}>
              </div>
            ` : undefined }
        </div>
        <div class="${classMap(helpTextClasses)}">
          <slot name="helpText"></slot>
        </div>
        <div id="bibSizer" part="size"></div>
        <${this.dropdownBibTag}
          id="bib"
          shape="${this.shape}"
          ?data-show="${this.isPopoverVisible}"
          ?isfullscreen="${this.isBibFullscreen}"
          ?desktopmodal="${this.desktopModal}"
          .dialogLabel="${this.bibDialogLabel}"
          ${ref(this.bibElement)}
          >
          <div class="slotContent">
            <slot @slotchange="${this.handleDefaultSlot}"></slot>
          </div>
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

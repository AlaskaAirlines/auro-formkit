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
 * A trigger that opens a panel, called the bib, to show interactive content, such as a list of options or a short form.
 *
 * **Key capabilities**
 * - **Any trigger and content**: The `trigger` slot takes text, an icon, or a control, and the default slot takes any markup.
 * - **Positioning**: `placement`, `offset`, and `shift` control where the bib opens, and it flips to the opposite side when it doesn't fit unless `noFlip` is set.
 * - **Small screens**: `fullscreenBreakpoint` sets the screen width, such as `sm`, at or below which the bib fills the screen as a modal dialog.
 * - **Modal on desktop**: `desktopModal` keeps keyboard focus in the open bib and makes the rest of the page inert.
 * - **States**: `disabled` stops the bib from opening, and `error` shows the trigger in an error style.
 * - **Light and dark backgrounds**: `appearance="inverse"` switches to colors designed for dark backgrounds.
 *
 * **Example**
 * ```html
 * <auro-dropdown>
 *   <span slot="trigger">Trip options</span>
 *   <p>Choose a seat, add bags, or change your flight.</p>
 * </auro-dropdown>
 * ```
 *
 * @summary A panel of interactive content that opens from a trigger, with flexible positioning and a fullscreen mode for small screens.
 * @customElement auro-dropdown
 *
 * @slot - Content shown in the bib, such as a list of options or a short form. {@requiredWhen always} {@category ui}
 * @slot helpText - Text shown below the trigger to help people understand or fill in the dropdown. {@category ui}
 * @slot trigger - Content people select to open and close the bib, such as text, an icon, or a button. When this content isn't focusable, screen readers also use it as the trigger's name. {@requiredWhen always} {@category ui}
 * @csspart trigger - The trigger content container. Not currently rendered, so styles set on it have no effect; use `wrapper` instead.
 * @csspart wrapper - The trigger wrapper element surrounding the trigger content and chevron.
 * @csspart chevron - The container for the icon that shows whether the bib is open. Exists only when `chevron` is set.
 * @csspart size - A hidden sizing element whose `width`, `height`, `max-width`, and `max-height` are copied to the bib. Applies only when `matchWidth` is set.
 * @csspart helpText - The help text container. Not currently rendered, so styles set on it have no effect; style the content in the `helpText` slot instead.
 * @event auroDropdown-triggerClick - Notifies that the trigger was clicked, or activated with Enter or Space. A click currently fires it twice: first with `event.detail.expanded`, then again without a detail, bubbling. With `disableEventShow` set, only the second one fires, and Enter and Space don't fire it.
 * @event auroDropdown-toggled - Notifies that the bib opened or closed, with `event.detail.expanded` set to true when it opened. When it closed, `event.detail.eventType` says why, such as `click`, `keydown`, or `focusloss`.
 * @event auroDropdown-idAdded - Notifies that the dropdown has an ID you can use to reference its bib, such as in `aria-controls`. The detail's `id` is the dropdown's own `id`, generated when not set, and the bib's ID is that value followed by `-floater-bib`.
 */
export class AuroDropdown extends AuroElement {

  /**
   * Lit's options for creating the shadow root.
   * @internal
   */
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
     * Skips the dropdown's usual step of moving focus back to the trigger when the bib closes.
     * Set by components that move focus themselves, such as combobox with `setClearBtnFocus`, `setInputFocus`, and its keyboard strategy.
     * Separate from `noHideOnThisFocusLoss`, which controls whether losing focus closes the bib.
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
   * Gets the classes for the trigger wrapper element, based on focus, `simple`, and `parentBorder`.
   * @private
   * @returns {object} The class map for the trigger wrapper element.
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
   * Sets the default property values and creates the helpers the dropdown uses, such as its floating UI and versioned tag names.
   * @private
   * @returns {void}
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
     * Creates versioned tag names for the components the dropdown renders, so they don't conflict with other versions on the page.
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
   * Closes the bib.
   * @returns {void}
   */
  hide() {
    this.floater.hideBib();
  }

  /**
   * Opens the bib.
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
   * Moves focus to the first focusable element in the bib when it's open, or to the trigger when it's closed.
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
   * Moves focus to the trigger.
   * When the trigger wrapper has a `tabindex`, focuses the wrapper.
   * Otherwise, focuses the first focusable element in the `trigger` slot, such as an `auro-input`.
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
            continue; // eslint-disable-line no-continue
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
   * Sets the trigger's active descendant, so screen readers announce the highlighted option while focus stays on the trigger.
   * Uses `ariaActiveDescendantElement` to reach across shadow DOM boundaries.
   * Called by components that wrap the dropdown.
   * @private
   * @param {HTMLElement|null} element - The element to set as the active descendant, or `null` to clear it.
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
       * Sets the ARIA role of the trigger, such as `combobox` when the trigger shows a chosen value and opens a list of options (the trigger's `role`).
       * Applies only when the `trigger` slot content isn't focusable.
       * With any role other than `button`, the trigger also gets `aria-expanded` and `aria-controls`, and `combobox` adds `aria-haspopup="listbox"`.
       * @default 'button'
       * @category a11y
       */
      a11yRole: {
        type: String,
        attribute: false,
        reflect: false
      },

      /**
       * Sets the colors for the background the dropdown sits on.
       * Use `inverse` on dark backgrounds and `default` everywhere else.
       * @type {'default' | 'inverse'}
       * @default 'default'
       * @category ui
       */
      appearance: {
        type: String,
        reflect: true
      },

      /**
       * Deprecated: Use `placement` instead.
       * Moves the bib to whichever side of the trigger has the most space.
       * The bib already flips to the opposite side when it doesn't fit, unless `noFlip` is set.
       * @deprecated Use `placement` instead.
       * @category ui
       */
      autoPlacement: {
        type: Boolean,
        attribute: 'autoplacement',
        reflect: true
      },

      /**
       * Makes the open bib act as a modal dialog when it isn't fullscreen.
       * Keyboard focus stays in the bib, and the rest of the page can't be used until the bib closes.
       * @category ui
       */
      desktopModal: {
        type: Boolean,
        attribute: 'desktopmodal',
        reflect: true
      },

      /**
       * Stops the trigger from opening or closing the bib, so the bib opens only when you call `show()`.
       * @category behavior
       */
      disableEventShow: {
        type: Boolean,
        attribute: 'disableeventshow',
        reflect: true
      },

      /**
       * Removes the trigger's border, background, and shadow.
       * Applies only when `shape` and `size` are both set.
       * @category ui
       */
      simple: {
        type: Boolean,
        reflect: true
      },

      /**
       * Shows a chevron after the trigger content that points up while the bib is open and down while it's closed.
       * @category ui
       */
      chevron: {
        type: Boolean,
        reflect: true,
        attribute: 'chevron'
      },

      /**
       * Turns the dropdown off.
       * The trigger is shown in a muted style and can't open the bib, and an open bib closes.
       * @category ui
       */
      disabled: {
        type: Boolean,
        reflect: true
      },

      /**
       * Stops the dropdown from handling Enter and Space on the trigger, and Escape while the bib isn't fullscreen, so you can handle those keys yourself.
       * Set it before the dropdown first renders, because changing it later has no effect until the dropdown is removed from the page and added again.
       * @category behavior
       */
      disableKeyboardHandling: {
        type: Boolean,
        attribute: 'disablekeyboardhandling',
        reflect: true
      },

      /**
       * Sets the width of the bib in pixels.
       * The dropdown doesn't currently apply this value to the bib itself.
       * @category ui
       */
      dropdownWidth: {
        type: Number,
        attribute: 'dropdownwidth'
      },

      /**
       * Sets the ID of the bib that the trigger's `aria-controls` points to.
       * @private
       */
      dropdownId: {
        type: String,
        reflect: false,
        attribute: false
      },

      /**
       * Shows the trigger in an error style.
       * Doesn't show a message, so put one in the `helpText` slot.
       * @category behavior
       */
      error: {
        type: Boolean,
        reflect: true
      },

      /**
       * Sets the message for the current validation error.
       * The dropdown doesn't currently show this message; put the text in the `helpText` slot to show it.
       * @category behavior
       */
      errorMessage: {
        type: String,
        attribute: 'errormessage'
      },

      /**
       * Opens the bib when the trigger gets focus.
       * @category behavior
       */
      focusShow: {
        type: Boolean,
        attribute: 'focusshow',
        reflect: true
      },

      /**
       * Marks the bib as open, and reflects as the `open` attribute.
       * To open or close the bib, call `show()` or `hide()` instead of setting this directly.
       * @category behavior
       */
      isPopoverVisible: {
        type: Boolean,
        reflect: true,
        attribute: 'open'
      },

      /**
       * Marks the bib as fullscreen.
       * The dropdown sets this itself from `fullscreenBreakpoint` and the screen width.
       * @category behavior
       */
      isBibFullscreen: {
        type: Boolean,
        attribute: 'isbibfullscreen',
        reflect: true
      },

      /**
       * Opens the bib when the pointer moves onto the trigger and closes it when the pointer leaves.
       * Doesn't currently work as an HTML attribute, because the dropdown clears it when it first renders; set the property in JavaScript after that instead.
       * @category behavior
       */
      hoverToggle: {
        type: Boolean,
        attribute: 'hovertoggle',
        reflect: true
      },

      /**
       * @private
       */
      hasTriggerContent: {
        type: Boolean,
        attribute: false
      },

      /**
       * Sets the screen width, such as `sm`, at or below which the open bib fills the screen as a modal dialog.
       * When not set, or set to `disabled`, the bib never goes fullscreen.
       * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'disabled'}
       * @category ui
       */
      fullscreenBreakpoint: {
        type: String,
        attribute: "fullscreenbreakpoint",
        reflect: true
      },

      /**
       * Sets the trigger's overall style.
       * Use `classic` for the standard look, and `emphasized` or `snowflake` only on dark backgrounds.
       * When not set, the classic layout styles aren't applied, so set `classic` explicitly.
       * @type {'classic' | 'emphasized' | 'snowflake'}
       * @category ui
       */
      layout: {
        type: String,
        attribute: "layout",
        reflect: true
      },

      /**
       * Sets the shape of the trigger.
       * Applies only when `size` is also set.
       * Match it to the layout: `classic` for the `classic` layout; `pill`, `pill-left`, or `pill-right` for the `emphasized` layout; and `snowflake` for the `snowflake` layout.
       * @relevantWhen size !== undefined
       * @type {'box' | 'classic' | 'pill' | 'pill-left' | 'pill-right' | 'rounded' | 'snowflake'}
       * @category ui
       */
      shape: {
        type: String,
        attribute: "shape",
        reflect: true
      },

      /**
       * Sets the height of the trigger, from `xs`, the shortest, to `xl`, the tallest.
       * Applies only when `shape` is also set.
       * The `classic` and `snowflake` shapes have a fixed height, so `size` doesn't change them.
       * @relevantWhen shape !== undefined
       * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl'}
       * @category ui
       */
      size: {
        type: String,
        attribute: "size",
        reflect: true
      },

      /**
       * Removes the trigger's border and shadow and shortens it to fit inside a parent element that draws the border.
       * Applies only when `shape` and `size` are both set.
       * @private
       */
      parentBorder: {
        type: Boolean,
        attribute: 'parentborder',
        reflect: true
      },

      /**
       * Makes the bib the same width as the trigger.
       * @category ui
       */
      matchWidth: {
        type: Boolean,
        attribute: 'matchwidth',
        reflect: true
      },

      /**
       * Keeps the bib at its `placement` when there isn't enough space, instead of flipping it to the opposite side.
       * @category ui
       */
      noFlip: {
        type: Boolean,
        attribute: 'noflip',
        reflect: true
      },

      /**
       * Slides the bib along the trigger's edge to keep it inside the viewport.
       * @category ui
       */
      shift: {
        type: Boolean,
        reflect: true
      },

      /**
       * Keeps the bib open when focus moves outside the dropdown.
       * Clicking outside the dropdown or pressing Escape still closes it.
       * @category behavior
       */
      noHideOnThisFocusLoss: {
        type: Boolean,
        attribute: 'nohideonthisfocusloss',
        reflect: true
      },

      /**
       * Makes the trigger only open the bib, not close it.
       * Pressing Escape or moving focus away still closes the bib.
       * @category behavior
       */
      noToggle: {
        type: Boolean,
        attribute: 'notoggle',
        reflect: true
      },

      /**
       * Sets the gap between the trigger and the bib in pixels, such as `8`.
       * @default 0
       * @category ui
       */
      offset: {
        type: Number,
        reflect: true
      },

      /**
       * Deprecated: Use `appearance="inverse"` instead.
       * Shows the dropdown in colors designed for dark backgrounds.
       * @deprecated Use `appearance="inverse"` instead.
       * @category ui
       */
      onDark: {
        type: Boolean,
        attribute: 'ondark',
        reflect: true
      },

      /**
       * Sets a function to call when the content in the default slot changes.
       * @type {() => void}
       * @category behavior
       */
      onSlotChange: {
        type: Function,
        attribute: false,
        reflect: false
      },

      /**
       * Sets where the bib opens relative to the trigger, such as `bottom-start` for below the trigger, lined up with its start edge.
       * The bib flips to the opposite side when there isn't room, unless `noFlip` is set.
       * @type {'top' | 'right' | 'bottom' | 'left' | 'bottom-start' | 'top-start' | 'top-end' | 'right-start' | 'right-end' | 'bottom-end' | 'left-start' | 'left-end'}
       * @default 'bottom-start'
       * @category ui
       */
      placement: {
        type: String,
        reflect: true
      },

      /**
       * Sets the trigger's position in the keyboard tab order (the trigger's `tabindex`).
       * Applies only when the `trigger` slot content isn't focusable.
       * @category a11y
       */
      tabIndex: {
        type: Number,
        attribute: 'tabindex'
      },

      /**
       * Sets the accessible name of the bib's `<dialog>` element.
       * Set by components that wrap the dropdown, such as combobox and datepicker, from their label.
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
   * Registers the element with the browser under a tag name.
   * @param {string} [name="auro-dropdown"] - The tag name to register the element under.
   *
   * @example
   * AuroDropdown.register("custom-dropdown") // registers the element as <custom-dropdown>
   *
   */
  static register(name = "auro-dropdown") {
    AuroLibraryRuntimeUtils.prototype.registerComponent(name, AuroDropdown);
  }

  /**
   * Gets the selector for the elements in the `trigger` slot whose `focus` and `blur` events the dropdown forwards to the trigger.
   * @private
   * @returns {string} The CSS selector list.
   */
  get focusableEntityQuery () {
    return 'auro-input, [auro-input], auro-button, [auro-button], button, input';
  }

  connectedCallback() {
    super.connectedCallback();
    // Re-register trigger event listeners removed by floater.disconnect() in
    // disconnectedCallback(). Fires when a parent element (e.g. auro-drawer)
    // moves this element to a new DOM location. firstUpdated() won't re-run,
    // so without this the trigger click/keydown handlers are permanently gone.
    // Guard on floater.element so this is a no-op on the initial connect
    // (before firstUpdated() has called configure()).
    if (this.floater?.element) {
      this.floater.configure(this, 'auroDropdown', !this.disableKeyboardHandling);
    }
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

  // eslint-disable-next-line complexity
  updated(changedProperties) {
    super.updated(changedProperties);
    this.floater.handleUpdate(changedProperties);

    // Close the dropdown if the disabled property is set to true
    if (changedProperties.has('disabled') && this.disabled && this.isPopoverVisible) {
      this.hide();
      this.isPopoverVisible = false;
    }

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
   * Called when the bib opens or closes (`auroDropdown-toggled`), to update `isPopoverVisible` and, when needed, move focus back to the trigger.
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
     * @description Notifies that the dropdown has an ID you can use to reference its bib.
     * @event auroDropdown-idAdded
     * @type {CustomEvent<{ id: string }>} - The detail's `id` is the dropdown's own `id`, generated when not set; the bib's ID is that value followed by `-floater-bib`.
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
   * Re-exports the `trigger`, `chevron`, `helpText`, and `size` CSS parts as `dropdownTrigger`, `dropdownChevron`, `dropdownHelpText`, and `dropdownSize`, so a component that wraps the dropdown can expose them. The `trigger` and `helpText` parts aren't currently rendered.
   * @returns {void}
   */
  exposeCssParts() {
    this.setAttribute('exportparts', 'trigger:dropdownTrigger, chevron:dropdownChevron, helpText:dropdownHelpText, size:dropdownSize');
  }

  /**
   * Checks whether an element is inside an element that has a `slot` attribute.
   * @private
   * @param {HTMLElement} element - The element to check.
   * @returns {Boolean} True if one of the element's ancestors has a `slot` attribute; false otherwise.
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
   * Called when focus moves into the trigger, to set `hasFocus`.
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
   * Gets the focused element at each level, from the document's active element down through each shadow root.
   * @private
   * @returns {Array<HTMLElement>} The focused elements, outermost first.
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
   * so that people can't interact with content outside the dropdown while the modal is open.
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
   * Restores the `inert` state of the siblings that `_setPageInert` changed.
   * Uses reference counting so `inert` is cleared only when the last modal
   * dropdown releases a given element. Keeps each element's original `inert` state,
   * so elements that something else made inert stay inert.
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
   * Clears `hasFocus` when focus leaves the trigger.
   * Not currently called, because the trigger's `blur` listener refers to `handleFocusOut`, which doesn't exist.
   * @private
   * @return {void}
   */
  handleFocusout() {
    this.hasFocus = false;
  }

  /**
   * Called when an element in the `trigger` slot gains or loses focus, to dispatch a matching `focus` or `blur` event on the trigger.
   * @private
   * @param {Event} event - The original `focus` or `blur` event.
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
   * Adds listeners that forward `focus` and `blur` events from inputs and buttons in the `trigger` slot, including `auro-input` and `auro-button`, to the trigger.
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
   * Removes the `focus` and `blur` listeners that `setupTriggerFocusEventBinding` added.
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

  /**
   * Removes the ARIA attributes the dropdown adds to the trigger, such as `role` and `aria-expanded`, because focusable trigger content provides its own.
   * @private
   * @param {HTMLElement} triggerElement - The trigger element to clear.
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
   * Called when the content in the `trigger` slot changes, and again after some updates, such as when the bib opens or closes.
   *
   * Sets the trigger's `tabindex` and ARIA attributes based on whether the content is focusable,
   * forwards focus events from that content to the trigger, and sets `hasTriggerContent` when the content has text.
   *
   * @private
   * @method handleTriggerContentSlotChange
   * @param {Event} [event] - The `slotchange` event, when the slot content changed.
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
   * Called when the content in the default slot changes, to call `onSlotChange` when it's set.
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
   * Renders the markup that every layout shares: the trigger, the help text, and the bib.
   * @private
   * @param {Object} helpTextClasses - The classes to apply to the help text container.
   * @returns {html} - The template for the shared markup.
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
   * Renders the classic layout.
   * @private
   * @returns {html} - The template for the classic layout.
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
   * Renders the snowflake layout, which indents the help text on both sides.
   * @private
   * @returns {html} - The template for the snowflake layout.
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
   * Renders the emphasized layout, which indents the help text on the rounded sides of a `pill` shape.
   * @private
   * @returns {html} - The template for the emphasized layout.
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
   * Renders the layout that `layout` sets, or the classic layout when it isn't set or isn't recognized.
   * @private
   * @param {string} [ForcedLayout] - The layout to render instead of `layout`, such as `emphasized`.
   * @returns {HTMLCollection} - The template for the layout.
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

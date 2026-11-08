// Copyright (c) 2020 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.
/* eslint-disable max-lines */
// ---------------------------------------------------------------------

/* eslint-disable no-underscore-dangle */

import { html } from "lit/static-html.js";
import { LitElement } from "lit";
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';
import { applyKeyboardStrategy } from '@aurodesignsystem/utils';

import styleCss from "./styles/classic/bibStyles-css.js";
import colorCss from "./styles/classic/bibColors-css.js";
import tokensCss from "./styles/tokens-css.js";
import { createDropdownBibKeyboardStrategy } from './dropdownBibKeyboardStrategy.js';

const DESIGN_TOKEN_BREAKPOINT_PREFIX = '--ds-grid-breakpoint-';
const DESIGN_TOKEN_BREAKPOINT_OPTIONS = [
  'xl',
  'lg',
  'md',
  'sm',
  'xs',
];

/**
 * The panel that holds a dropdown's content, shown as a floating popover or, on small screens, as a fullscreen modal dialog.
 * @csspart bibContainer - The `<dialog>` element that holds the bib content.
 * @event auro-dropdownbib-connected - Notifies that the bib has rendered for the first time. The detail's `element` is the bib.
 * @event auro-bib-cancel - Notifies that the bib was dismissed, such as with the Escape key, so a parent component can close it.
 */

export class AuroDropdownBib extends LitElement {
// not extending AuroElement because Bib needs only `shape` prop
  constructor() {
    super();

    /**
     * @private
     */
    this._mobileBreakpointName = undefined;

    AuroLibraryRuntimeUtils.prototype.handleComponentTagRename(this, 'auro-dropdownbib');

    this.matchWidth = false;
    this.hasActiveDescendant = false;

    this.initializeArchitectureDefaults();
  }

  // The `shape` default is set in a helper (not the constructor body) so the CEM
  // analyzer keeps its `@type` union instead of inferring `string` from a
  // constructor-literal assignment. See AlaskaAirlines/discussions#653.
  /**
   * Sets the bib's default `shape`, `rounded`.
   * @returns {void}
   */
  initializeArchitectureDefaults() {
    this.shape = "rounded";
  }

  static get styles() {
    return [
      styleCss,
      colorCss,
      tokensCss
    ];
  }

  static get properties() {
    return {

      /**
       * Shows the bib fullscreen.
       * The dropdown sets this itself from its `fullscreenBreakpoint` and the screen width.
       */
      isFullscreen: {
        type: Boolean,
        attribute: 'isfullscreen',
        reflect: true
      },

      /**
       * Rounds the bib's corners when it isn't fullscreen, and removes the corners and shadow when it is.
       * Has the same effect as `rounded`.
       */
      common: {
        type: Boolean,
        reflect: true
      },

      /**
       * Doesn't currently change the bib, because no styles use it.
       */
      inset: {
        type: Boolean,
        reflect: true
      },

      /**
       * Lets the bib be narrower than its content, by removing its `fit-content` minimum width.
       * The dropdown doesn't set this; its own `matchWidth` sizes the bib to the trigger.
       * @private
       */
      matchWidth: {
        type: Boolean,
        attribute: 'matchwidth',
        reflect: true
      },

      /**
       * Rounds the bib's corners when it isn't fullscreen, and removes the corners and shadow when it is.
       */
      rounded: {
        type: Boolean,
        reflect: true
      },

      /**
       * Sets the `auro-bibtemplate` element inside the bib.
       * The bib sets this itself when the template connects, and keeps the template's fullscreen state in sync with its own.
       */
      bibTemplate: {
        type: Object,
        attribute: false
      },

      /**
       * Sets the shape of the bib's corners when it isn't fullscreen.
       * `box` has square corners, `classic` has slightly rounded corners, `rounded` has rounder corners, and the `pill` and `snowflake` shapes have the roundest corners.
       * The dropdown passes its own `shape` to the bib.
       * @type {'box' | 'classic' | 'pill' | 'pill-left' | 'pill-right' | 'rounded' | 'snowflake'}
       * @default 'rounded'
       */
      shape: {
        type: String,
        attribute: "shape",
        reflect: true
      },

      /**
       * Sets the accessible name of the bib's `<dialog>` element.
       * Applied with `aria-labelledby` on a visually hidden element instead of
       * `aria-label`, because iOS VoiceOver doesn't reliably read `aria-label`
       * on `<dialog>` elements.
       * @private
       */
      dialogLabel: {
        type: String,
        attribute: 'dialoglabel'
      },

      /**
       * Sets the role of the bib's `<dialog>` element, such as `presentation` on a
       * desktop combobox, so VoiceOver doesn't announce "listbox inside of a dialog".
       * When not set, the dialog keeps its native role.
       * @private
       */
      dialogRole: {
        type: String,
        attribute: 'dialogrole'
      },

      /**
       * Marks that an option is highlighted while the bib is fullscreen.
       * The dropdown sets it, but nothing currently reads it.
       * @private
       */
      hasActiveDescendant: {
        type: Boolean,
        attribute: 'hasactivedescendant'
      }
    };
  }

  /**
   * Sets the screen width, such as `sm`, at or below which the bib goes fullscreen.
   * Accepts `xs`, `sm`, `md`, `lg`, or `xl`; any other value, such as `disabled`, turns fullscreen off.
   * Reading it returns that breakpoint's pixel width from the design tokens, such as `576px`.
   */
  set mobileFullscreenBreakpoint(value) {
    // verify the defined breakpoint is valid and exit out if not
    // 'disabled' is a design token breakpoint so it acts as our "undefined" value
    const validatedValue = DESIGN_TOKEN_BREAKPOINT_OPTIONS.includes(value) ? value : undefined;
    // Store the breakpoint NAME only. The CSS token pixel value is read lazily
    // in the getter so it is always resolved against the current document styles.
    // Caching the pixel value here races against stylesheet load in WebKit —
    // external CDN stylesheets may not yet be applied when the component upgrades,
    // causing getPropertyValue() to return "" and fullscreen mode to never activate.
    this._mobileBreakpointName = validatedValue;
  }

  get mobileFullscreenBreakpoint() {
    if (!this._mobileBreakpointName) {
      return undefined;
    }
    const value = getComputedStyle(document.documentElement).
      getPropertyValue(DESIGN_TOKEN_BREAKPOINT_PREFIX + this._mobileBreakpointName).
      trim();
    return value || undefined;
  }

  updated(changedProperties) {
    if (changedProperties.has('isFullscreen')) {
      this.childNodes.forEach((child) => {
        // skip any text that is not in an HTMLElement on setting `isFullscreen` attr.
        if (child.nodeName !== '#text') {
          if (this.isFullscreen) {
            child.setAttribute('isFullscreen', 'true');
          } else {
            child.removeAttribute('isFullscreen');
          }
        }
      });

      if (this.bibTemplate) {
        // If the bib template is found, set the fullscreen attribute
        if (this.isFullscreen) {
          this.bibTemplate.setAttribute('isFullscreen', 'true');
        } else {
          this.bibTemplate.removeAttribute('isFullscreen');
        }
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();

    // Listen for the auro-bibtemplate-connected event to set the fullscreen attribute
    this.addEventListener('auro-bibtemplate-connected', (event) => {
      const bibTemplate = event.detail.element;
      this.bibTemplate = bibTemplate;

      if (bibTemplate) {
        // If the bib template is found, set the fullscreen attribute
        if (this.isFullscreen) {
          bibTemplate.setAttribute('isFullscreen', 'true');
        } else {
          bibTemplate.removeAttribute('isFullscreen');
        }
      }
    });
  }

  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);

    const dialog = this.shadowRoot.querySelector('dialog');
    this._setupCancelHandler(dialog);
    applyKeyboardStrategy(dialog, createDropdownBibKeyboardStrategy(this));

    this.dispatchEvent(new CustomEvent('auro-dropdownbib-connected', {
      bubbles: true,
      composed: true,
      detail: {
        element: this
      }
    }));
  }

  /**
   * Forwards the dialog's native `cancel` event (fired on ESC) as
   * an `auro-bib-cancel` custom event so parent components can close.
   * @param {HTMLDialogElement} dialog - The dialog element to attach the cancel listener to.
   * @private
   */
  _setupCancelHandler(dialog) {
    dialog.addEventListener('cancel', (event) => {
      event.preventDefault();
      this.dispatchEvent(new CustomEvent('auro-bib-cancel', {
        bubbles: true,
        composed: true
      }));
    });
  }


  /**
   * Blocks touch-driven page scroll while a fullscreen modal dialog is open.
   *
   * The `showModal()` method puts the dialog in the browser's **top layer**,
   * a separate rendering layer above the page. On mobile, the browser pans
   * the visual viewport before it handles touches in the top layer, so a touch
   * gesture can pan the whole viewport, dialog included, and scroll the page
   * behind the dialog into view. To prevent this, adds a `touchmove` listener
   * that cancels the gesture unless it started in a scrollable element, such as
   * a scrolling list in the dialog.
   *
   * @private
   */
  _lockTouchScroll() {
    const dialog = this.shadowRoot.querySelector('dialog');

    this._touchMoveHandler = (event) => {
      // Walk the composed path (which crosses shadow DOM boundaries) to
      // check whether the touch started inside a scrollable element that
      // lives within the dialog.  If so, allow the scroll.
      for (const el of event.composedPath()) {
        if (el === dialog) {
          // Reached the dialog boundary without finding a scrollable child.
          break;
        }
        if (el instanceof HTMLElement && el.scrollHeight > el.clientHeight) {
          const { overflowY } = getComputedStyle(el);
          if (overflowY === 'auto' || overflowY === 'scroll') {
            return;
          }
        }
      }

      event.preventDefault();
    };

    document.addEventListener('touchmove', this._touchMoveHandler, { passive: false });
  }

  /**
   * Removes the `touchmove` listener that `_lockTouchScroll` added.
   * @private
   */
  _unlockTouchScroll() {
    if (this._touchMoveHandler) {
      document.removeEventListener('touchmove', this._touchMoveHandler);
      this._touchMoveHandler = undefined;
    }
  }

  /**
   * Opens the bib, unless it's already open.
   * @param {boolean} [modal=true] - If true, opens the bib as a modal dialog that blocks the rest of the page. If false, opens it as a popover that doesn't block the page or move focus.
   * @returns {void}
   */
  open(modal = true) {
    const dialog = this.shadowRoot.querySelector('dialog');

    if (dialog && !dialog.open) {
      if (modal) {
        // Prevent showModal() from scrolling the page to bring the dialog
        // into view. Locking overflow on <html> blocks the viewport scroll
        // that browsers perform natively; we release it immediately after
        // so it doesn't interfere with the modal's focus management.
        const { documentElement } = document;
        const prevOverflow = documentElement.style.overflow;
        documentElement.style.overflow = 'hidden';

        try {
          dialog.showModal();
        } finally {
          // Restore overflow immediately — the lock was only needed to
          // suppress the browser's native scroll-into-view behavior
          // triggered by showModal(). Keeping it locked would block
          // scrolling inside the modal.
          documentElement.style.overflow = prevOverflow;
        }

        this._lockTouchScroll();

      } else {
        // Open the inner dialog so slotted content renders.
        dialog.setAttribute('open', '');

        // Use popover on the host for top-layer placement without focus
        // management or inertness. This escapes ancestor container-type
        // containment that would trap position:fixed relative to the container.
        // Set popover dynamically to avoid UA [popover]:not(:popover-open) { display: none }
        // interfering with Floating UI measurement before showPopover().
        this.setAttribute('popover', 'manual');
        this.showPopover();
      }
    }
  }

  /**
   * Closes the bib, whether it's open as a modal dialog or as a popover.
   * @returns {void}
   */
  close() {
    this.hasActiveDescendant = false;

    const dialog = this.shadowRoot.querySelector('dialog');

    if (dialog && dialog.open) {
      this._unlockTouchScroll();
      dialog.close();
    }
    // Clean up the popover used for desktop top-layer placement.
    // Remove the attribute entirely so the UA rule
    // [popover]:not(:popover-open) { display: none } doesn't hide
    // the host while Floating UI measures it for the next open.
    if (this.matches(':popover-open')) {
      this.hidePopover();
      this.removeAttribute('popover');
    }
  }

  // function that renders the HTML and CSS into  the scope of the component
  render() {
    const classes = {
      container: true
    };

    // Since this class does not inherit from AuroElement, we apply the shape-related class within the `render` function,
    // mimicking the class naming convention used in AuroElement.resetShapeClasses.
    classes[`shape-${this.shape}`] = true;

    return html`
      <dialog tabindex="-1" class="${classMap(classes)}" part="bibContainer" role="${ifDefined(this.dialogRole)}" aria-labelledby="${ifDefined(this.dialogLabel ? 'dialogLabel' : undefined)}">
        ${this.dialogLabel ? html`<span id="dialogLabel" class="util_displayHiddenVisually">${this.dialogLabel}</span>` : ''}
        <slot></slot>
        <span id="srAnnouncement" class="util_displayHiddenVisually" aria-live="polite" role="status"></span>
      </dialog>
    `;
  }
}

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

import styleCss from "./styles/classic/bibStyles-css.js";
import colorCss from "./styles/classic/bibColors-css.js";
import tokensCss from "./styles/tokens-css.js";

const DESIGN_TOKEN_BREAKPOINT_PREFIX = '--ds-grid-breakpoint-';
const DESIGN_TOKEN_BREAKPOINT_OPTIONS = [
  'xl',
  'lg',
  'md',
  'sm',
  'xs',
];

/**
 * @prop { String } fullscreenBreakpoint - Defines the screen size breakpoint (`lg`, `md`, `sm`, or `xs`) at which the dropdown switches to fullscreen mode on mobile. When expanded, the dropdown will automatically display in fullscreen mode if the screen size is equal to or smaller than the selected breakpoint.
 * @csspart bibContainer - Apply css to the bib container.
 */

export class AuroDropdownBib extends LitElement {
// not extending AuroElement because Bib needs only `shape` prop
  constructor() {
    super();

    /**
     * @private
     */
    this._mobileBreakpointValue = undefined;

    AuroLibraryRuntimeUtils.prototype.handleComponentTagRename(this, 'auro-dropdownbib');

    this.shape = "rounded";
    this.matchWidth = false;
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
       * If declared, will take the fullscreen when the bib is displayed.
       */
      isFullscreen: {
        type: Boolean,
        reflect: true
      },

      /**
       * If declared, will apply all styles for the common theme.
       */
      common: {
        type: Boolean,
        reflect: true
      },

      /**
       * If declared, will apply extra padding to bib content.
       */
      inset: {
        type: Boolean,
        reflect: true
      },

      /**
       * If declared, the bib width will match the trigger width.
       * @private
       */
      matchWidth: {
        type: Boolean,
        reflect: true
      },

      /**
       * If declared, will apply border-radius to the bib.
       */
      rounded: {
        type: Boolean,
        reflect: true
      },

      /**
       * A reference to the associated bib template element.
       */
      bibTemplate: {
        type: Object
      },

      shape: {
        type: String,
        reflect: true
      },

      /**
       * Accessible label for the dialog element, used when displayed as a modal.
       * Applied via aria-labelledby on a visually hidden element rather than
       * aria-label because iOS VoiceOver does not reliably read aria-label
       * on <dialog> elements.
       * @private
       */
      dialogLabel: {
        type: String
      },

      /**
       * Overrides the native role of the dialog element.
       * For example, set to `"presentation"` on desktop combobox to prevent
       * VoiceOver from announcing "listbox inside of a dialog".
       * When `undefined`, the dialog keeps its native role.
       * @private
       */
      dialogRole: {
        type: String
      }
    };
  }

  set mobileFullscreenBreakpoint(value) {
    // verify the defined breakpoint is valid and exit out if not
    // 'disabled' is a design token breakpoint so it acts as our "undefined" value
    const validatedValue = DESIGN_TOKEN_BREAKPOINT_OPTIONS.includes(value) ? value : undefined;
    if (!validatedValue) {
      this._mobileBreakpointValue = undefined;
    } else {
      // get the pixel value for the defined breakpoint
      const docStyle = getComputedStyle(document.documentElement);
      this._mobileBreakpointValue = docStyle.getPropertyValue(DESIGN_TOKEN_BREAKPOINT_PREFIX + value);
    }
  }

  get mobileFullscreenBreakpoint() {
    return this._mobileBreakpointValue;
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
    this._setupKeyboardBridge(dialog);

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
   * @param {HTMLDialogElement} dialog
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
   * showModal() creates a closed focus scope — keyboard events inside
   * the dialog's shadow DOM do NOT bubble out to the combobox/select
   * keydown handlers in the parent shadow DOM. This handler bridges
   * that gap by re-dispatching navigation keys so they cross the
   * shadow boundary and reach the menu navigation logic in the parent
   * component.
   *
   * The trade-off: intercepting these keys means native keyboard
   * behaviors that would normally "just work" must be manually
   * re-implemented here:
   *
   * - Enter on buttons: Custom elements (auro-button) don't get the
   *   native Enter→click that <button> provides, so we call .click()
   *   directly when Enter is pressed on a button-like element.
   *
   * - Tab: Intercepted and re-dispatched so parent components
   *   (select/combobox) can select the active option and close the
   *   dialog. The <dialog> provides containment and isolation
   *   (inert background, VoiceOver focus trapping, top layer), while
   *   the content inside is a role="listbox" navigated via
   *   aria-activedescendant (options are not focusable). Tab keyboard
   *   behavior follows listbox conventions (select + close) because
   *   the dialog's native Tab trap only cycles between the close
   *   button and browser chrome.
   *
   * - Escape: The native <dialog> fires a `cancel` event on ESC
   *   (handled by _setupCancelHandler), so the re-dispatched Escape
   *   is a secondary path for parent components that also listen for
   *   Escape keydown.
   *
   * @param {HTMLDialogElement} dialog
   * @private
   */
  _setupKeyboardBridge(dialog) {
    const navKeys = new Set([
      'ArrowUp',
      'ArrowDown',
      'Enter',
      'Escape',
      'Tab'
    ]);

    dialog.addEventListener('keydown', (event) => {
      if (!navKeys.has(event.key)) {
        return;
      }

      // Custom elements (auro-button) don't get the native Enter→click
      // behavior that <button> has. Find the button in the composed path
      // and click it directly.
      if (event.key === 'Enter') {
        const buttonSelector = 'button, [role="button"], auro-button, [auro-button]';
        const btn = event.composedPath().find((el) => el.matches && el.matches(buttonSelector));
        if (btn) {
          event.preventDefault();
          event.stopPropagation();
          btn.click();
          return;
        }
      }

      event.preventDefault();
      event.stopPropagation();
      const newEvent = new KeyboardEvent('keydown', {
        key: event.key,
        code: event.code,
        shiftKey: event.shiftKey,
        altKey: event.altKey,
        ctrlKey: event.ctrlKey,
        metaKey: event.metaKey,
        bubbles: true,
        composed: true,
        cancelable: true
      });
      this.dispatchEvent(newEvent);
    });
  }

  /**
   * Blocks touch-driven page scroll while a fullscreen modal dialog is open.
   *
   * The showModal() function places the dialog in the browser's **top layer**,
   * which is a separate rendering layer above the normal DOM. On mobile, the
   * compositor processes visual-viewport panning before top-layer touch
   * handling. This means the entire viewport — including the top-layer dialog
   * — can be panned by a touch gesture, causing the page behind the dialog to
   * scroll into view. To prevent this, we add a touchmove listener that cancels
   * the event if the touch started outside the dialog or any scrollable child within it.
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
   * Removes the touchmove listener added by _lockTouchScroll().
   * @private
   */
  _unlockTouchScroll() {
    if (this._touchMoveHandler) {
      document.removeEventListener('touchmove', this._touchMoveHandler);
      this._touchMoveHandler = undefined;
    }
  }

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
          documentElement.style.overflow = prevOverflow;
        }

        this._lockTouchScroll();

      } else {
        // Use setAttribute instead of dialog.show() to avoid the dialog
        // focusing steps which steal focus from the trigger and cause
        // the floater's handleFocusLoss() to immediately hide the bib.
        dialog.setAttribute('open', '');
      }
    }
  }

  /**
   * Closes the dialog.
   */
  close() {
    const dialog = this.shadowRoot.querySelector('dialog');
    if (dialog && dialog.open) {
      this._unlockTouchScroll();
      dialog.close();
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
      <dialog class="${classMap(classes)}" part="bibContainer" role="${ifDefined(this.dialogRole)}" aria-labelledby="${ifDefined(this.dialogLabel ? 'dialogLabel' : undefined)}">
        ${this.dialogLabel ? html`<span id="dialogLabel" class="util_displayHiddenVisually" aria-hidden="true">${this.dialogLabel}</span>` : ''}
        <slot></slot>
      </dialog>
    `;
  }
}

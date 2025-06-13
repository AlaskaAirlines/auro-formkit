// Copyright (c) 2020 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

/* eslint-disable no-underscore-dangle */

import { html } from "lit/static-html.js";
import { LitElement } from "lit";
import { classMap } from 'lit/directives/class-map.js';

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

    // Dispatch a custom event when the component is connected
    this.dispatchEvent(new CustomEvent('auro-dropdownbib-connected', {
      bubbles: true,
      composed: true,
      detail: {
        element: this
      }
    }));
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
      <div class="${classMap(classes)}" part="bibContainer">
        <slot></slot>
      </div>
    `;
  }
}

// Copyright (c) 2020 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

/* eslint-disable max-lines, lit-a11y/accessible-name */

import { html } from "lit/static-html.js";
import { LitElement } from "lit";
// import Popover from "../lib/popover";
// import {computePosition, detectOverflow, autoUpdate, offset, autoPlacement, flip, shift, limitShift} from '@floating-ui/dom';

import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';
import AuroFloatingUI from './floatingUI.mjs';

import { AuroDependencyVersioning } from '@aurodesignsystem/auro-library/scripts/runtime/dependencyTagVersioning.mjs';

import { AuroIcon } from '@aurodesignsystem/auro-icon/src/auro-icon.js';
import iconVersion from './iconVersion';

import styleCss from "./style-css.js";
import colorCss from "./color-css.js";
import tokensCss from "./tokens-css.js";

import { AuroDropdownBib } from './auro-dropdownBib.js';

// default internal definition
if (!customElements.get("auro-dropdownbib")) {
  customElements.define("auro-dropdownbib", AuroDropdownBib);
}


/**
 * @attr { Boolean } bordered - If declared, applies a border around the trigger slot.
 * @attr { Boolean } chevron - If declared, the dropdown displays an display state chevron on the right.
 * @attr { Boolean } disabled - If declared, the dropdown is not interactive.
 * @attr { Boolean } disableEventShow - If declared, the dropdown will only show by calling the API .show() public method.
 * @attr { Boolean } error - If declared in combination with `bordered` property or `helpText` slot content, will apply red color to both.
 * @attr { Boolean } matchWidth - If declared, the popover and trigger will be set to the same width.
 * @attr { Boolean } inset - If declared, will apply padding around trigger slot content.
 * @attr { Boolean } rounded - If declared, will apply border-radius to trigger and default slots.
 * @attr { Boolean } hoverToggle - if declared, the trigger will toggle the big on mouseover/mouseout.
 * @attr { Boolean } noToggle - If declared, the trigger will only show the the dropdown bib.
 * @attr { Boolean } focusShow - if declared, the the bib will display when focus is applied to the trigger.
 * @attr { Boolean } noHideOnThisFocusLoss - If declared, the dropdown will not hide when moving focus outside the element.
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
 * @event dropdownToggled - (DEPRECATED) Notifies that the visibility of the dropdown bib has changed.
 * @event auroDropdown-ready - Notifies that the component has finished initializing.
 * @event auroDropdown-toggled - Notifies that the visibility of the dropdown bib has changed.
 */
export class AuroDropdown extends LitElement {
  constructor() {
    super();

    this.isPopoverVisible = false;
    this.matchWidth = false;
    this.noHideOnThisFocusLoss = false;

    // this.trigger = undefined;
    // this.tooltip = undefined;

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
    this.ready = false;
    this.tabIndex = 0;
    this.noToggle = false;

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
      noToggle: {
        type: Boolean,
        reflect: true
      },
      noHideOnThisFocusLoss: {
        type: Boolean,
        reflect: true
      },
      isPopoverVisible: { type: Boolean },
      ready:            { type: Boolean },
      onSlotChange: {
        type: Function,
        reflect: false
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

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  // handleTriggerTabIndex() {
  // const triggerSlotContentRoot = this.querySelector('[slot="trigger"');

  // // Don't overwrite any tabindex coded directly into the slotted trigger content
  // if (!triggerSlotContentRoot.getAttribute('tabindex')) {
  //   const focusableElementSelectors = [
  //     'a',
  //     'button',
  //     'input:not([type="hidden])',
  //     'select',
  //     'textarea',
  //     '[tabindex]:not([tabindex="-1"])',
  //     'auro-button',
  //     'auro-input',
  //     'auro-hyperlink'
  //   ];

  //   focusableElementSelectors.forEach((selector) => {
  //     // check if the trigger root element itself is focusable
  //     if (triggerSlotContentRoot.matches(selector)) {
  //       this.tabIndex = -1;

  //       return;
  //     }

  //     // check if any child content is focusable
  //     if (triggerSlotContentRoot.querySelector(selector)) {
  //       this.tabIndex = -1;
  //     }
  //   });
  // }
  // }

  updated(changedProperties) {
    this.floater.handleUpdate(changedProperties);
  }

  firstUpdated() {
    this.floater.configure(this);

    // Add the tag name as an attribute if it is different than the component name
    this.runtimeUtils.handleComponentTagRename(this, 'auro-dropdown');

    // this.fixWidth();

    // this.trigger = this.shadowRoot.querySelector(`#trigger`);

    // this.triggerChevron = this.shadowRoot.querySelector(`#showStateIcon`);

    // this.auroPopover = this.shadowRoot.querySelector('#popover');

    // const hideByKeyboard = (event) => {
    //   const key = event.key.toLowerCase();

    //   if (key === 'escape') {
    //     this.toggleHide();
    //   }
    // };

    // const showByKeyboard = (event) => {
    //   const key = event.key.toLowerCase();
    //   if (key === ' ' || key === 'enter') {
    //     event.preventDefault();
    //     handleShow();
    //   }
    // };

    // const toggleByKeyboard = (event) => {
    //   const key = event.key.toLowerCase();

    //   if (key === ' ' || key === 'enter') {
    //     event.preventDefault();
    //     toggleDropdown(); /* eslint-disable-line no-unused-expressions */
    //   }
    // };

    // const notifyTriggerClicked = () => {
    //   const event = new CustomEvent('auroDropdown-triggerClick', {
    //     composed: true
    //   });

    //   this.dispatchEvent(event);
    // };

    // // this.trigger.addEventListener('keydown', hideByKeyboard);
    // // this.auroPopover.addEventListener('keydown', hideByKeyboard);

    this.bibContent = this.shadowRoot.querySelector('auro-dropdownbib');

    document.body.append(this.bibContent);
  }

  // /**
  //  * @private
  //  * @returns {void} Dispatches event with an object showing the state of the dropdown.
  //  */
  // dispatchEventDropdownToggle() {
  //   const eventDeprecated = new CustomEvent('dropdownToggled', {
  //     detail: {
  //       expanded: this.isPopoverVisible,
  //     },
  //     composed: true
  //   });

  //   this.dispatchEvent(eventDeprecated);

  //   const event = new CustomEvent('auroDropdown-toggled', {
  //     detail: {
  //       expanded: this.isPopoverVisible,
  //     },
  //     composed: true
  //   });

  //   this.dispatchEvent(event);
  // }

  // applyBibContentFunctionality(bibElem) {
  //   console.warn('bibElem ----- ', bibElem);

  //   this.testInput = bibElem.querySelector('#testInput');

  //   this.testInput.addEventListener('input', () => {
  //     console.info('input value changed', this.testInput.value);
  //   });


  //   // console.info(bibElem);
  //   this.testInput2 = bibElem.querySelector('#testInputTwo');

  //   console.info('this.testInput2', this.testInput2);

  //   this.testInput2.addEventListener('input', () => {
  //     console.info('input 2 value changed', this.testInput2.value);
  //   });

  // }

  isCustomSlotContent(element) {
    let path = []; // eslint-disable-line prefer-const
    let currentElement = element;

    let inCustomSlot = false;

    while (currentElement) {
      path.unshift(currentElement);
      currentElement = currentElement.parentElement;

      if (currentElement && currentElement.hasAttribute('slot')) {
        inCustomSlot = true;
      }
    }

    return inCustomSlot;
  }

  handleDefaultSlot() {
    const allSlotContent = this.querySelectorAll(':not([slot])');
    this.defaultSlotContent = [];

    allSlotContent.forEach((item) => {
      if (!this.isCustomSlotContent(item)) {
        this.defaultSlotContent.push(item);
      }
    });

    this.defaultSlotContent.forEach((item) => {
      this.bibContent.append(item);
    });

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
          tabindex="${this.tabIndex}"
          aria-describedby="tooltip">
          <slot name="trigger"></slot>
        </div>
        <div
          class="helpText"
          part="helpText">
          <slot name="helpText"></slot>
      </div>
      <div class="slotContent">
        <slot @slotchange="${this.handleDefaultSlot}"></slot>
      </div>
      <auro-dropdownbib id="bib" role="tooltip">
      </auro-dropdownbib>
      </div>
    `;
  }
}

// default internal definition
if (!customElements.get("auro-dropdown")) {
  customElements.define("auro-dropdown", AuroDropdown);
}

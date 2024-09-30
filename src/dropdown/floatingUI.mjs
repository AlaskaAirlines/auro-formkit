/* eslint-disable line-comment-position, no-inline-comments */

import {autoUpdate, computePosition, offset, autoPlacement, flip} from '@floating-ui/dom';

export default class AuroFloatingUI {
  position() {
    // Define the middlware for the floater configuration
    const middleware = [
      offset(this.element.floaterConfig.offset || 0),
    ];

    // Add flip middleware if flip is enabled
    if (this.element.floaterConfig.flip) {
      middleware.push(flip());
    }

    // Add autoPlacement middleware if autoPlacement is enabled
    if (this.element.floaterConfig.autoPlacement) {
      middleware.push(autoPlacement());
    }

    // Compute the position of the bib
    computePosition(this.element.trigger, this.element.bib, {
      placement: this.element.floaterConfig.placement || 'bottom',
      middleware: middleware || []
    }).then(({x, y}) => { // eslint-disable-line id-length
      Object.assign(this.element.bib.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
    });
  }

  updateState() { 
    this.element.trigger.setAttribute('aria-expanded', this.element.isPopoverVisible);

    if (this.element.isPopoverVisible) {
      // this.element.bib.removeAttribute('hidden');
      this.element.bib.style.display = 'block';
    } else {
      // this.element.bib.setAttribute('hidden', true);
      this.element.bib.style.display = 'none';
    }

    if (!this.element.isPopoverVisible) {
      try {  
        this.element.cleanup();
        // this.element.bib.remove(); // is this doing anything? Seems like it's doing the wrong thing
      } catch (error) {
        // do nothing
      }
    }
  }

  setupHideHandlers() {
    // Hide when focus moves outside the dropdown (unless the element has `noHideOnThisFocusLoss`)
    document.activeElement.addEventListener('focusin', () => { // cleanup this event listener when it closes
      if (!this.element.noHideOnThisFocusLoss && !this.element.hasAttribute('noHideOnThisFocusLoss')) { // is this the right place to do this?
        if (document.activeElement !== document.querySelector('body') && !this.element.contains(document.activeElement) && !this.element.bibContent.contains(document.activeElement)) {
          this.hideBib();
        }
      }
    });

    // Hide when you click anywhere outside the dropdown
    window.addEventListener("click", (evt) => {
      if (!evt.composedPath().includes(this.element.trigger) && !evt.composedPath().includes(this.element.bibContent)) {
        this.hideBib();
      }
    });
  }

  handleUpdate(changedProperties) {
    if (changedProperties.has('isPopoverVisible')) {
      this.updateState();
    }
  }

  updateCurrentExpandedDropdown() {
    // First, close any other dropdown that is already open
    if (document.expandedAuroDropdown) {
      this.hideBib(document.expandedAuroDropdown);
    }

    document.expandedAuroDropdown = this;
  }

  showBib() {
    if (!this.element.disabled && !this.element.isPopoverVisible) {
      this.updateCurrentExpandedDropdown();
      this.element.isPopoverVisible = true;
      this.position();
      this.setupHideHandlers();

      // setup auto update to handle resize and scroll
      this.element.cleanup = autoUpdate(this.element.trigger, this.element.bib, () => {
        this.position();
      });
    }
  }

  hideBib() {
    if (this.element.isPopoverVisible && !this.element.disabled && !this.element.noToggle) { // do we really want noToggle here?
      this.element.isPopoverVisible = false;
    }
  }

  handleClick() {
    if (this.isPopoverVisible) {
      this.hideBib();
    } else {
      this.showBib();
    }

    // should this be left in dropdown?
    const event = new CustomEvent('auroDropdown-triggerClick', {
      composed: true,
      details: {
        expanded: this.isPopoverVisible
      }
    });

    this.element.dispatchEvent(event);
  }

  handleEvent(event) {
    if (!this.element.disableEventShow) {
      switch (event.type) {
        case 'mouseenter':
          if (this.element.hoverToggle) {
            this.showBib();
          }
          break;
        case 'mouseleave':
          if (this.element.hoverToggle) {
            this.hideBib();
          }
          break;
        case 'focus':
          if (this.element.focusShow) {
            // this needs to better handle clicking that gives focus - currently it shows and then immediately hides the bib
            this.showBib();
          }
          break;
        case 'blur':
          // this likely needs to be improved to handle focus within the bib for datepicker
          if (!this.element.noHideOnThisFocusLoss && !this.element.hasAttribute('noHideOnThisFocusLoss')) { // why do we have to do both here?
            this.hideBib();
          }
          break;
        case 'click':
          this.handleClick();
          break;
        default:
          // do nothing
        // add cases for show and toggle by keyboard space and enter key - maybe this is handled already?
      }
    }
  }

  /**
   * Make sure no content in the trigger is focusable (only the trigger element itself should be focusable)
   */
  handleTriggerTabIndex() {
    const focusableElementSelectors = [
      'a',
      'button',
      'input:not([type="hidden])', // why not just do all inputs anyways?
      'select',
      'textarea',
      '[tabindex]:not([tabindex="-1"])',
      'auro-button',
      'auro-input',
      'auro-hyperlink'
    ];
    const triggerNode = this.element.querySelectorAll('[slot="trigger"]')[0];
    const triggerNodeTagName = triggerNode.tagName.toLowerCase();

    focusableElementSelectors.forEach((selector) => {
      // check if the trigger node element itself is focusable
      if (triggerNodeTagName === selector) {
        triggerNode.tabIndex = -1;

        return;
      }

      // check if any child is focusable
      const nestedFocusableElements = triggerNode.querySelectorAll(selector);
      if (nestedFocusableElements) {
        nestedFocusableElements.forEach((nestedFocusableElement) => {
          nestedFocusableElement.tabIndex = -1;
        });
      }
    });
  }

  configure(elem) {
    this.element = elem;
    this.element.trigger = this.element.shadowRoot.querySelector('#trigger');
    this.element.bib = this.element.shadowRoot.querySelector('#bib');

    this.element.bib.style.display = 'none';
    this.element.bib.style.position = 'absolute';
    this.element.bib.style.zIndex = '1'; // make this configurable

    this.element.bib.setAttribute('hidden', true);

    this.handleTriggerTabIndex();

    this.element.trigger.addEventListener('click', (event) => this.handleEvent(event));
    this.element.trigger.addEventListener('mouseenter', (event) => this.handleEvent(event));
    this.element.trigger.addEventListener('mouseleave', (event) => this.handleEvent(event));
    this.element.trigger.addEventListener('focus', (event) => this.handleEvent(event));
    this.element.trigger.addEventListener('blur', (event) => this.handleEvent(event));
  }
}

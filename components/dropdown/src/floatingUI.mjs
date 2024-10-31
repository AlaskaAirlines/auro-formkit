/* eslint-disable line-comment-position, no-inline-comments */

import {autoUpdate, computePosition, offset, autoPlacement, flip} from '@floating-ui/dom';

export default class AuroFloatingUI {
  constructor() {
    // Store bound event listener references for cleanup
    this.boundFocusInHandler = null;
    this.boundClickHandler = null;
  }

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
    const isVisible = this.element.isPopoverVisible;
    this.element.trigger.setAttribute('aria-expanded', isVisible);
    // @TODO: Don't hardcode values
    this.element.bib.style.display = isVisible ? 'block' : 'none';
  
    if (!isVisible) {
      this.cleanupHideHandlers();
      try {
        this.element.cleanup?.();
      } catch (error) {
        // Do nothing
      }
    }
  }

  handleFocusLoss() {
    if (this.element.noHideOnThisFocusLoss || 
        this.element.hasAttribute('noHideOnThisFocusLoss')) {
      return;
    }

    const {activeElement} = document;
    if (activeElement === document.querySelector('body') ||
        this.element.contains(activeElement) ||
        this.element.bibContent?.contains(activeElement)) {
      return;
    }

    this.hideBib();
  }

  setupHideHandlers() {
    // Create bound event handler functions and store references
    this.boundFocusInHandler = () => this.handleFocusLoss();

    this.boundClickHandler = (evt) => {
      if (!evt.composedPath().includes(this.element.trigger) && 
          !evt.composedPath().includes(this.element.bibContent)) {
        this.hideBib();
      }
    };

    // Add event listeners using the stored references
    document.addEventListener('focusin', this.boundFocusInHandler);
    window.addEventListener('click', this.boundClickHandler);
  }

  cleanupHideHandlers() {
    // Remove event listeners if they exist
    if (this.boundFocusInHandler) {
      document.removeEventListener('focusin', this.boundFocusInHandler);
      this.boundFocusInHandler = null;
    }

    if (this.boundClickHandler) {
      window.removeEventListener('click', this.boundClickHandler);
      this.boundClickHandler = null;
    }
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
      
      // Clean up any existing handlers before setting up new ones
      this.cleanupHideHandlers();
      this.setupHideHandlers();

      // Setup auto update to handle resize and scroll
      this.element.cleanup = autoUpdate(this.element.trigger, this.element.bib, () => {
        this.position();
      });
    }
  }

  hideBib() {
    if (this.element.isPopoverVisible && !this.element.disabled && !this.element.noToggle) {
      this.element.isPopoverVisible = false;
    }
  }

  handleClick() {
    if (this.element.isPopoverVisible) {
      this.hideBib();
    } else {
      this.showBib();
    }

    const event = new CustomEvent('auroDropdown-triggerClick', {
      composed: true,
      details: {
        expanded: this.element.isPopoverVisible
      }
    });

    this.element.dispatchEvent(event);
  }

  handleEvent(event) {
    if (!this.element.disableEventShow) {
      switch (event.type) {
        case 'keydown':
          // Support both Enter and Space keys for accessibility
          // Space is included as it's expected behavior for interactive elements
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault(); // Prevent page scroll on space
            this.handleClick();
          }
          break;
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
            /*
              This needs to better handle clicking that gives focus - 
              currently it shows and then immediately hides the bib 
            */
            this.showBib();
          }
          break;
        case 'blur':
          this.handleFocusLoss();
          break;
        case 'click':
          this.handleClick();
          break;
        default:
          // Do nothing
      }
    }
  }

  handleTriggerTabIndex() {
    const focusableElementSelectors = [
      'a',
      'button',
      'input:not([type="hidden"])',
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
      // Check if the trigger node element is focusable
      if (triggerNodeTagName === selector) {
        triggerNode.tabIndex = -1;
        return;
      }

      // Check if any child is focusable
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

    // @TODO: Don't hardcode values
    this.element.bib.style.display = 'none';
    this.element.bib.style.position = 'absolute';
    this.element.bib.style.zIndex = '1';

    this.element.bib.setAttribute('hidden', true);

    this.handleTriggerTabIndex();

    this.element.trigger.addEventListener('keydown', (event) => this.handleEvent(event));
    this.element.trigger.addEventListener('click', (event) => this.handleEvent(event));
    this.element.trigger.addEventListener('mouseenter', (event) => this.handleEvent(event));
    this.element.trigger.addEventListener('mouseleave', (event) => this.handleEvent(event));
    this.element.trigger.addEventListener('focus', (event) => this.handleEvent(event));
    this.element.trigger.addEventListener('blur', (event) => this.handleEvent(event));
  }

  disconnect() {
    this.cleanupHideHandlers();
    this.element.cleanup?.();
    
    // Remove event & keyboard listeners
    if (this.element?.trigger) {
      this.element.trigger.removeEventListener('keydown', (event) => this.handleEvent(event));
      this.element.trigger.removeEventListener('click', (event) => this.handleEvent(event));
      this.element.trigger.removeEventListener('mouseenter', (event) => this.handleEvent(event));
      this.element.trigger.removeEventListener('mouseleave', (event) => this.handleEvent(event));
      this.element.trigger.removeEventListener('focus', (event) => this.handleEvent(event));
      this.element.trigger.removeEventListener('blur', (event) => this.handleEvent(event));
    }
  }
}
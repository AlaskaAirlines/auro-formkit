/* eslint-disable */
import { html, LitElement } from "lit";
import { createRef, ref } from 'lit/directives/ref.js';
import { PopoverPositioner } from "@auro-formkit/utils";

import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';
import { AuroDependencyVersioning } from '@aurodesignsystem/auro-library/scripts/runtime/dependencyTagVersioning.mjs';
import { StringBoolean } from "./StringBoolean.converter";

import styles from './styles/style-css.js';

const _DEFAULTS = {
  type: "manual",
  behavior: "dialog",
  showOnHover: false,
  showOnFocus: true,
  offset: 0,
  placement: "bottom-start",
  shown: false
};

const _POSITIONER_DEFAULTS = {
  offset: 0,
  placement: 'bottom-start'
};

const _NO_INPUT_ERROR = "\nAuroPopover: The input behavior requires an input element to be passed to the trigger slot.\n\nExample:\n<auro-popover>\n\t<auro-input slot='trigger'></auro-input>\n</auro-popover>\n";
const _MULTIPLE_TRIGGER_ELEMENTS_ERROR = "\nAuroPopover: The input behavior requires a single trigger element to be passed to the trigger slot.\n\nExample:\n<auro-popover>\n\t<auro-button slot='trigger'>Click me</auro-button>\n</auro-popover>\n\nPassing more than one element may lead to undesireable behavior.\n";
const _TEXT_NODE_IN_TRIGGER_SLOT_ERROR = "\nAuroPopover: The trigger slot should not contain text nodes.\n\nExample:\n<auro-popover>\n\t<auro-button slot='trigger'>Click me</auro-button>\n</auro-popover>\n";

export class AuroPopover extends LitElement {

  /** STATIC METHODS **/
  // Utility methods that can be used without instantiating the class

    static register(name = "auro-popover") { AuroLibraryRuntimeUtils.prototype.registerComponent(name, AuroPopover) }


  /** CONSTRUCTOR **/
    constructor() {
      super();
      
      this._setDefaults(_DEFAULTS);
      this._createInternalTags();
      this._createElementRefs();
    }


  /** INIT METHODS **/
  // These methods are called from the constructor when the component is initialized

    /** Creates internal tags for internal use (like button or icon) @returns {void} @private */
    _createInternalTags() {

      // Create a versioning instance to manage the versioning of the component
      const versioning = new AuroDependencyVersioning();

      // Define the input tag
      // this._inputTag = versioning.generateTag('auro-popover-input', inputVersion, AuroInput);
    };

    /** Creates refs for elements in the template @returns {void} @private */
    _createElementRefs() {

      // A reference to the popover element itself
      this._popoverRef = createRef();

      // The internal button that wraps the trigger slot (dialog and dropdown behaviors)
      this._buttonRef = createRef();

      // A reference to the positioning target element, this wraps the trigger slot for exact positioning
      this._positioningTargetRef = createRef();

      // A reference to the trigger slot element
      this._triggerSlotRef = createRef();
    }

    /**
     * Sets the default values of the component during startup
     * @param {object} defaults - The default values to set
     * @returns {void}
     * @private
     * */
    _setDefaults(defaults) { Object.keys(defaults).forEach(key => { if (this[key] === undefined) this[key] = defaults[key] }) }


  /** PROPERTIES AND PUBLIC GETTERS **/
  // Publically accessible properties and getters for the component

    static get properties() {
      return {
        /** @type {string} The title of the floater - REQUIRED FOR A11Y */
        title: { type: String, reflect: false },

        /** @type {string} The type of floater, e.g., "manual", "auto", or "hint" */
        type: { type: String, reflect: false },

        /** @type {string} The behavior of the popover, "dialog", "dropdown", "tooltip", or "input" */
        behavior: { type: String, reflect: false },

        /** @type {number} The offset distance of the floater */
        offset: { type: Number, reflect: false },

        /** @type {string} The position of the floater, e.g., "bottom-start", "top-end" etc. */
        placement: { type: String, reflect: false },

        /** @type {boolean} Whether the floater should show on hover */
        showOnHover: { type: Boolean, reflect: false },

        /** @type {boolean} Whether the floater should open on focus (input behavior only) */
        showOnFocus: { type: String, reflect: false, converter: StringBoolean },

        /** @type {boolean} Whether the floater is shown or not */
        shown: { type: Boolean, reflect: true },

        /** @type {number} The minimum number of characters the user must type before the popover is shown */
        minInputLength: { type: Number, reflect: false },

         /** @type {boolean} @private Whether the floater is open or not */
        _open: { type: Boolean, reflect: false, state: true },
      };
    }

    static get styles() {
      return [styles];
    }

    /**
     * A reference to the popover component's internal button element (trigger)
     * @returns {HTMLButtonElement} The button element that wraps the trigger slot
     */
    get button() { return this._buttonRef.value }

    /**
     * A reference to the popover component's internal popover element
     * @returns {HTMLElement} The popover element that contains the content
     */
    get popover() { return this._popoverRef.value }

  
  /** PUBLIC METHODS **/
  // Public methods that can be called on the component instance

    /**
     * Toggles the visibility of the floater.
     * @returns {void}
     */
    toggle() {
      this._open ? this.hide() : this.show();
    }

    /**
     * Shows the popover
     * @returns {void}
     * @private
     */
    show() {

      // Position the popover if it is not already positioned
      if (this._shouldPositionPopover) this._positionPopover();

      
      // Wait for a lifecycle since this is triggered by beforetoggle from the browser to ensure we check the state correctly
      setTimeout(() => {

        // Set shown to true to trigger visibility
        if (!this.popover.matches(':popover-open')) { this.popover.showPopover() }

        // The popover is positioned and ready, so we can set shown to true
        this.shown = true;
      })
    }

    /**
     * Shows the popover
     * @returns {void}
     * @private
     */
    hide() {

      // Stop positioning the popover
      this._cancelPositionPopover();

      // Wait a lifecycle since this is triggered by beforetoggle from the browser to ensure we check the state correctly
      setTimeout(() => {

        // Hide the popover if it is currently open
        if (this.popover.matches(':popover-open')) { this.popover.hidePopover() }
  
        // Update shown to hide the popover via styles
        this.shown = false;
      })
    }


  /** LIFECYCLE METHODS **/
  // Attachments to the component lifecycle, such as connectedCallback, updated, etc.

    updated(changedProperties) {

      // Make sure we adjust the popover visibility based on external changes from the browser
      if (changedProperties.has('_open')) this._open ? this.show() : this.hide();

      // If the behavior changes, adjust the popover accordingly
      if (changedProperties.has('behavior')) this._adjustForBehavior(this.behavior);
    };

    disconnectedCallback() {
      super.disconnectedCallback();
      this._resetBindings();
    }


  /** PRIVATE GETTERS **/
  // Utility getters that return values based on internal state or properties

    /**
     * Gets whether the popover should be positioned based on its behavior
     * @returns {boolean}
     * @private
     */
    get _shouldPositionPopover() {
      return ["dropdown", "tooltip", "input"].includes(this.behavior);
    }

    /**
     * Generates the dropdown options based on internal properties and defined defaults
     * @private
     * @returns {object}
     */
    get _dropdownOptions() {
      return {
        ..._POSITIONER_DEFAULTS,
        placement: this.placement,
        offset: this.offset,
      };
    }

    /**
     * Gets the trigger slot element
     * @returns {HTMLSlotElement}
     * @private
     */
    get _triggerSlot() { return this._triggerSlotRef.value }

    /**
     * Gets the positioning target element, which is the element that the popover will be positioned relative to
     * @returns {HTMLElement}
     * @private
     */
    get _positioningTarget() { return this._positioningTargetRef.value }

    /**
     * Gets the input element in the trigger slot if it exists
     * @throws {Error} If no input element is found in the trigger slot
     * @returns {void}
     * @private
     */
    get _inputInTriggerSlot() {

      const nodes = this._triggerSlot.assignedNodes({ flatten: true });
      const input = nodes.find(node => node.tagName && node.tagName.toLowerCase().match('input'));

      return input ?? undefined;
    }


  /** PRIVATE METHODS **/
  // Private methods that are used internally within the component only

    /**
     * Resets the bindings for the popover, detaching any event listeners or positioners
     * This is called when the component is disconnected or when the behavior changes
     * @returns {void}
     * @private
     */
    _resetBindings() {
      this._detachInput();
      this._detachHoverFromPositioningTarget();
      this._cancelPositionPopover();
    }

    /**
     * Makes adjustments based on a specific behavior type
     * @returns {void}
     * @private
     */
    _adjustForBehavior(behavior) {
      this._resetBindings();
      switch (behavior) {
        case 'input':
          this.type = 'manual';
          this._bindToInput();
          break;
        case 'dialog':
          this.type = 'auto';
          break;
        case 'dropdown':
          this.type = 'auto';
          break;
        case 'tooltip':
          this.type = 'hint';
          this.showOnHover = true;
          this._bindHoverToPositioningTarget();
          break;
        default:
          console.warn(`AuroPopover: Unknown behavior type "${behavior}"`);
      }
    }

    /**
     * Begins positioning the popover using the PopoverPositioner class
     * @returns {void}
     * @private
     */
    _positionPopover() {
      if (this._positioningTarget && this.popover) {
        this._positioner = new PopoverPositioner(
          this._positioningTarget,
          this.popover,
          this._dropdownOptions
        );
      }
    }
    
    /**
     * Cancels the positioning of the popover if it is currently active
     * @returns {void}
     * @private
     */
    _cancelPositionPopover() {
      if (this._positioner) {
        this._positioner.disconnect();
        this._positioner = null;
      }
    }

    /**
     * Binds the input element in the trigger slot to the popover's input behavior
     * @returns {void}
     * @private
     */
    _bindToInput() {
      const input = this._inputInTriggerSlot;
      if (input) {
        
        // If you add an event listener here, you must also remove it in _detachInput

        // Focus handling. Mouseup is required to not blur the input
        input.addEventListener('focus', this._handleInputFocus);

        // Input change handling.
        input.addEventListener('input', this._handleInputChange);

        // Blur handling.
        input.addEventListener('blur', this._handleInputBlur);
      } else {
        throw new Error(_NO_INPUT_ERROR);
      }
    }

    /**
     * Detaches the input element from the popover's input behavior
     * @returns {void}
     * @private
     */
    _detachInput() {
      const input = this._inputInTriggerSlot;
      if (input) {
        input.removeEventListener('focus', this._handleInputFocus);
        input.removeEventListener('input', this._handleInputChange);
        input.removeEventListener('blur', this._handleInputBlur);
      }
    }
    
    get _triggerElInSlot() {

      // Get the assigned nodes from the trigger slot
      const nodes = this._triggerSlot.assignedNodes({ flatten: true });

      // Warn the user if they pass more than one element to the trigger slot
      if (nodes.length > 1) console.warn(_MULTIPLE_TRIGGER_ELEMENTS_ERROR);

      const el = nodes.find(node => node.tagName); // Match any non-text node

      // If the user passes at least one element to the trigger slot but it doesn't pass our check, warn them
      if (nodes.length && !el) console.warn(_TEXT_NODE_IN_TRIGGER_SLOT_ERROR);

      // Return the first element that matches the tagName check, or undefined if no element is found
      return el ?? undefined;
    }

    /**
     * Binds hover events to the positioning target element
     * This is used for behaviors like tooltip where the popover should show on hover
     * @returns {void}
     * @private
     */
    _bindHoverToPositioningTarget() {
      const el = this._triggerElInSlot;
      if (el) {
        el.addEventListener('mouseover', this._handleOnHover);
        el.addEventListener('mouseout', this._handleOnHoverLeave);
      }
    }

    /**
     * Detaches hover events from the positioning target element
     * @returns {void}
     * @private
     */
    _detachHoverFromPositioningTarget() {
      this.removeEventListener('mouseover', this._handleOnHover);
      this.removeEventListener('mouseout', this._handleOnHoverLeave);
    }


  /** EVENT HANDLERS **/
  // These methods handle events triggered by user interactions or other component changes

    /**
     * Checks if the input passes the value check based on the minimum input length
     * @param {HTMLElement} input 
     * @returns {boolean}
     * @private
     */
    _inputPassesValueCheck = input => {
      // Check the input value against the minimum length
      const { value } = input;
      return value && value.length >= this.minInputLength || !this.minInputLength || this.minInputLength <= 0;
    }

    /**
     * Handles input changes, showing or hiding the popover based on the input value
     * @param {Event} event 
     * @returns {void}
     * @private
     */
    _handleInputChange = event => {
      const input = event.target;
      this._inputPassesValueCheck(input) ? this.show() : this.hide();
    }

    /**
     * Handles input focus events, showing the popover if all conditions are met
     * @param {Event} event 
     * @returns {void}
     * @private
     */
    _handleInputFocus = event => {
      const input = event.target;
      if (
        // If the input has a minimum length and the value is valid and we should show on focus
        this._inputPassesValueCheck(input) && this.showOnFocus
      ) this.show();
    }

    /**
     * Handles input blur events, hiding the popover
     * @returns {void}
     * @private
     */
    _handleInputBlur = () => {
      this.hide();
    }

    /** 
     * Handles changes to the trigger slot, adjusting the type if necessary
     * @returns {void}
     * @private
     * */
    _handleTriggerSlotChange() {

      // Don't try to adjust the type if the behavior is input
      if (this.behavior === 'input') return;

      // Get assigned nodes from the trigger slot
      const nodes = this._triggerSlot.assignedNodes({ flatten: true });

      // Force auto state if the user passes something to the trigger slot
      if (nodes.length > 0) this.type = 'auto';
    }

    /** Runs when the popover is toggled by the browser 
     * @param {Event} event - The event triggered by the popover toggle
     * @returns {void}
     * @private
     * */
    _handlePopoverToggle(event) { this._open = event.newState === 'open' }

    /**
     * Handles hover events on the trigger element, showing the popover if showOnHover is true
     * @returns {void}
     * @private
     */
    _handleOnHover = () => { if (this.showOnHover) this.show() }

    /**
     * Handles hover leave events on the trigger element, hiding the popover if showOnHover is true
     * @returns {void}
     * @private
     */
    _handleOnHoverLeave = () => { if (this.showOnHover) this.hide() }


  /** RENDER METHODS **/
  // These methods return the template for the component, including slots and elements

    /**
     * Renders the trigger slot for the trigger element
     * @returns {TemplateResult}
     * @private
     */
    _renderTriggerSlot() {
      return html`
        <div ${ref(this._positioningTargetRef)}>
          <slot 
            name="trigger"
            ${ref(this._triggerSlotRef)}
            @slotchange="${() => this._handleTriggerSlotChange()}"
          ></slot>
        </div>
      `;
    }

    /** Renders the trigger element for the popover (based on behavior type)
     * @returns {TemplateResult}
     * @private
     * */
    _renderTrigger() {

      // Return just the slot if the type is manual or input, neither of these types require a special wrapper
      if (['manual', 'input'].includes(this.type))
        return this._renderTriggerSlot();

      // Return a button that is tied to the popover if the type is auto or hint
      if (this.type === 'auto' || this.type === 'hint') 
        return html`
          <button
            ${ref(this._buttonRef)}
            class="popover-trigger"
            part="trigger"
            type="button"
            popovertarget="popover"
          >
            ${this._renderTriggerSlot()}
          </button>
        `;
    }

    /**
     * Renders the popover element
     * @private @returns {TemplateResult}
     */
    _renderPopover() {
      return html`
        <div 
          ${ref(this._popoverRef)}
          popover="${this.type}"
          id="popover"
          role="dialog"
          aria-label="${this.title}"
          class="auro-popover"
          @beforetoggle=${this._handlePopoverToggle.bind(this)}
        >
          <slot><span>No, this is Patrick.</span></slot>
        </div>
      `;
    }

    render() {
      return html`
        ${this._renderTrigger()}
        ${this._renderPopover()}
      `;
    }
};

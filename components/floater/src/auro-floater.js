/* eslint-disable */
import { html, LitElement, nothing } from "lit";
import { createRef, ref } from 'lit/directives/ref.js';

import { PopoverPositioner } from "@auro-formkit/utils";
import { FocusTrap } from "@aurodesignsystem/auro-library/scripts/runtime/FocusTrap/FocusTrap.mjs";

import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';
import { StringBoolean } from "./StringBoolean.converter";

import styles from './styles/style-css.js';

const _DEFAULTS = {
  type: "manual",
  behavior: "dropdown",
  showOnHover: false,
  showOnFocus: true,
  showOnChange: true,
  offset: 0,
  placement: "bottom-start",
  shown: false,
};

const _POSITIONER_DEFAULTS = {
  offset: 0,
  placement: 'bottom-start',
  useHide: true,
  useFlip: true,
  useAutoPlacement: false,
  strategy: 'absolute',
  inline: false,
};

const INPUT_TYPES = [ 'input', 'input-fullscreen', 'input-dropdown' ];
const DIALOG_TYPES = [ 'dialog', 'dialog-fullscreen' ];
const DROPDOWN_TYPES = [ 'dropdown' ];
const TOOLTIP_TYPES = [ 'tooltip' ];

const _NO_INPUT_ERROR = "\nAuroFloater: The input behavior requires an input element to be passed to the trigger slot.\n\nExample:\n<auro-popover>\n\t<auro-input slot='trigger'></auro-input>\n</auro-popover>\n";
const _MULTIPLE_TRIGGER_ELEMENTS_ERROR = "\nAuroFloater: The input behavior requires a single trigger element to be passed to the trigger slot.\n\nExample:\n<auro-popover>\n\t<auro-button slot='trigger'>Click me</auro-button>\n</auro-popover>\n\nPassing more than one element may lead to undesireable behavior.\n";
const _TEXT_NODE_IN_TRIGGER_SLOT_ERROR = "\nAuroFloater: The trigger slot should not contain text nodes.\n\nExample:\n<auro-popover>\n\t<auro-button slot='trigger'>Click me</auro-button>\n</auro-popover>\n";

/**
 * AuroFloater is a web component that provides a customizable popover element.
 * It supports various behaviors such as dialog, dropdown, tooltip, and input.
 * @fires auro-floater-shown - Fired when the floater is shown. Event detail contains {target: AuroFloater, newState: "shown"}.
 * @fires auro-floater-hidden - Fired when the floater is hidden. Event detail contains {target: AuroFloater, newState: "hidden"}.
 * @fires auro-floater-change - Fired when the floater's visibility state changes. Event detail contains {target: AuroFloater, newState: string} where newState is either "shown" or "hidden".
 */
export class AuroFloater extends LitElement {

  /** STATIC METHODS **/
  // Utility methods that can be used without instantiating the class

    static register(name = "auro-floater") { AuroLibraryRuntimeUtils.prototype.registerComponent(name, AuroFloater) }

  /** CONSTRUCTOR **/
    constructor() {
      super();
      
      this._setDefaults(_DEFAULTS);
      this._createElementRefs();
      this._runtimeUtils = new AuroLibraryRuntimeUtils();
    }


  /** INIT METHODS **/
  // These methods are called from the constructor when the component is initialized

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
  // Publicly accessible properties and getters for the component

    static get properties() {
      return {
        /** The title of the floater - REQUIRED FOR A11Y */
        title: { type: String, reflect: false },

        /** The type of floater, e.g., "manual", "auto", or "hint" */
        type: { type: String, reflect: false },

        /** The behavior of the popover, "dialog", "dialog-fullscreen", "dropdown", "tooltip", or "input", "input-fullscreen", "input-dropdown" */
        behavior: { type: String, reflect: true },

        /** The offset distance of the floater */
        offset: { type: Number, reflect: false },

        /** The position of the floater, e.g., "bottom-start", "top-end" etc. (do not use with useAutoPlacement) */
        placement: { type: String, reflect: false },

        /** Whether the floater should show on hover */
        showOnHover: { type: Boolean, reflect: false },

        /** Whether the floater should open on focus (input behavior only) */
        showOnFocus: { type: String, reflect: false, converter: StringBoolean },

        /** Whether the floater should show on change (input behavior only) */
        showOnChange: { type: String, reflect: false, converter: StringBoolean },

        /** Whether the floater is shown or not */
        shown: { type: Boolean, reflect: true },

        /** The minimum number of characters the user must type before the popover is shown */
        minInputLength: { type: Number, reflect: false },

        /** A reference to the input to attach to for input behavior */
        input: { type: Object, state: true },

        /** A reference to the arrow element (if desired) */
        arrowEl: { type: Object, reflect: false },

        /** Whether or not to use the hide behavior (hides element when trigger is not visible) */
        useHide: { type: String, reflect: false, converter: StringBoolean },

        /** Whether or not to use automatic placement for the floater (do not use with placement) */
        useAutoPlacement: { type: String, reflect: false, converter: StringBoolean },

        /** Whether or not to use the flip behavior (flips the element when it goes off-screen) */
        useFlip: { type: String, reflect: false, converter: StringBoolean },

        /** Whether or not the floater should try to align to an inline element like a hyperlink */
        inline: { type: String, reflect: false, converter: StringBoolean },

        /** Whether the floater is open or not */
        _open: { type: Boolean, reflect: false, state: true },

        /** Whether the trigger slot contains any elements */
        _hasTriggerContent: { type: Boolean, reflect: false, state: true },

        /** Internal state tracking the current behavior implementation */
        _currentBehaviorState: { type: String, state: true }
      };
    }

    static get styles() { return [styles] };

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

    get _shouldPosition () {
      return ["dropdown", "tooltip", "input", "input-dropdown"].includes(this.behavior);
    }

    /**
     * Shows the popover
     * @returns {void}
     * @private
     */
    show({internal = false} = {}) {

      // Show the popover if it this wasn't called internally by the beforetoggle event listener
      if (!internal) this.popover.showPopover();

      // Position the popover if behavior requires it
      if (this._shouldPosition) { this._attachPopoverPositioner();

      // Otherwise, reset the positioning styles
      } else { this._detachPopoverPositioner() }

      // Focus the popover to ensure accessibility
      if (this._shouldAdjustFocus) {
        this.popover.focus();
      }

      // Attach the focus trap to the popover if necessary
      this._attachFocusTrap(); // Attach focus trap to the popover

      // The popover is positioned and ready, so we can set shown to true
      this.shown = true;

      // Dispatch relevant events
      this._dispatchShowEvent();
    }

    /**
     * Shows the popover
     * @returns {void}
     * @private
     */
    hide({internal = false} = {}) {

      // Stop positioning the popover
      this._detachPopoverPositioner();

      // Hide the popover if it is currently open
      if (!internal) this.popover.hidePopover();

      // Update shown to hide the popover via styles
      this.shown = false;

      // Focus the trigger element to ensure accessibility
      if (this._shouldAdjustFocus) {
        const focusEl = this._triggerElInSlot || this.button;
        focusEl?.focus();
      }

      // Dispatch relevant events
      this._dispatchHideEvent();
    }


  /** LIFECYCLE METHODS **/
  // Attachments to the component lifecycle, such as connectedCallback, updated, etc.

    connectedCallback() {
      super.connectedCallback();
      this._runtimeUtils.handleComponentTagRename(this, 'auro-floater');
    }

    updated(changedProperties) {

      // Infer input behavior if the input element changes
      if (['input'].some(prop => changedProperties.has(prop))) {

        // Change to base input functionality if the user didn't already set it
        if (!!this.input && !this.behavior.match("input")) this.behavior = "input"; 
      }

      // If the behavior changes or trigger content changes, manage behavior transition
      if (['behavior', '_hasTriggerContent', 'input'].some(prop => changedProperties.has(prop))) {
        this._manageBehavior(this.behavior);
      }
    };

    disconnectedCallback() {
      super.disconnectedCallback();
      this._cleanupCurrentBehavior();
    }


  /** PRIVATE GETTERS **/
  // Utility getters that return values based on internal state or properties

    /**
     * Checks if the popover should adjust focus based on its behavior
     * @returns {boolean}
     * @private
     */
    get _shouldAdjustFocus() {
      return ![...INPUT_TYPES, ...TOOLTIP_TYPES].includes(this.behavior);
    }

    /**
     * Generates the dropdown options based on internal properties and defined defaults
     * @private
     * @returns {object}
     */
    get _dropdownOptions() {
      const { placement, offset, inline, arrowEl, useHide, useAutoPlacement, useFlip } = this;
      return {
        ..._POSITIONER_DEFAULTS,
        placement, offset, inline, arrowEl, useHide, useAutoPlacement, useFlip
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
     * Gets the trigger element in the slot
     */
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
     * Checks if a focus trap should be attached based on the behavior
     * @returns {boolean}
     * @private
     */
    get _shouldAttachFocusTrap() {
      return !['input', 'input-dropdown', ...TOOLTIP_TYPES].includes(this.behavior);
    };

  _calcType(behavior) {
    if (INPUT_TYPES.includes(behavior)) return "manual";
    if (DIALOG_TYPES.includes(behavior)) return this._hasTriggerContent ? "auto" : "manual";
    if (DROPDOWN_TYPES.includes(behavior)) return this._hasTriggerContent ? "auto" : "manual";
    if (TOOLTIP_TYPES.includes(behavior)) return "hint";
    return "manual"; // Default fallback
  }

  /** PRIVATE METHODS **/
  // Private methods that are used internally within the component only

    /**
     * Centralized method to manage behavior transitions and state
     * Called whenever behavior changes or when component needs reconfiguration
     * Note that some of these calls are reinforced in the show and hide methods
     * @param {string} newBehavior - The behavior to transition to
     * @param {boolean} force - Whether to force reconfiguration even if behavior hasn't changed
     * @returns {void}
     * @private
     */
    _manageBehavior(newBehavior = this.behavior, force = false) {

      // Set the new behavior state
      this._currentBehaviorState = newBehavior;

      // First, clean up any existing behavior
      this._cleanupCurrentBehavior();

      // Set the type based on the new behavior
      this.type = this._calcType(newBehavior);

      // Configure the new behavior
      switch(newBehavior) {
        case 'input':
        case 'input-dropdown':
        case 'input-fullscreen':
          this._bindToInput();
          break;
          
        case 'dropdown':
          
          // Only set up positioning if we're already shown
          if (this.shown) this._attachPopoverPositioner();
          break;
          
        case 'tooltip':
          // Configure tooltip behavior
          this.showOnHover = true;
          this._bindHoverToPositioningTarget();
          
          // Only set up positioning if we're already shown
          if (this.shown) this._attachPopoverPositioner();
          break;

        case 'dialog':
        case 'dialog-fullscreen':
          break;
          
        default:
          console.warn(`AuroFloater: Unknown behavior type "${newBehavior}"`);
      }
    }

    /**
     * Cleans up the current behavior implementation
     * @returns {void}
     * @private
     */
    _cleanupCurrentBehavior() {
      // Detach all behavior-specific handlers
      this._detachInput();
      this._detachHoverFromPositioningTarget();
      this._detachPopoverPositioner();
      
      // Focus trap is specific to certain behaviors
      if (this._focusTrap) {
        this._detachFocusTrap();
      }
    }

    /**
     * Resets the position styles for the popover
     * This is in case the popover was originally assigned a behavior that required positioning
     * @returns {void}
     * @private
     */
     _resetPositionStyles() {
      this.popover.style.margin = null;
      this.popover.style.position = null;
      this.popover.style.top = null;
      this.popover.style.left = null;
    }

    /**
     * Attaches a focus trap to the popover if necessary
     * @returns {void}
     * @private
     */
    _attachFocusTrap() {
      if (this._shouldAttachFocusTrap) {
        this._focusTrap = new FocusTrap(this.popover, true);

        // If the popover is shown, focus the first element
        // Wait a cycle for the popover API to be done doing stuff before we adjust the focus
        setTimeout(() => this._focusTrap.focusFirstElement());
      }
    }

    /**
     * Detaches the existing focus trap if it exists
     * @returns {void}
     * @private
     */
    _detachFocusTrap() {
      if (this._focusTrap) {
        this._focusTrap.disconnect();
        this._focusTrap = null;
      }
    }

    /**
     * Begins positioning the popover using the PopoverPositioner class
     * @returns {void}
     * @private
     */
    _attachPopoverPositioner() {
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
    _detachPopoverPositioner() {
      this._resetPositionStyles();
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
      const input = this.input;
      if (input) {
        
        // If you add an event listener here, you must also remove it in _detachInput

        // Input change handling.
        input.addEventListener('input', this._handleInputChange);

        // Focus handling.
        input.addEventListener('focus', this._handleInputFocus);

        // Blur handling.
        if (!(['input-fullscreen'].includes(this.behavior))) {
          input.addEventListener('blur', this._handleInputBlur);
        }
      } else {
        setTimeout(() => {
          if (!this._triggerEl) throw new Error(_NO_INPUT_ERROR);
        }, 50);
      }
    }

    /**
     * Detaches the input element from the popover's input behavior
     * @returns {void}
     * @private
     */
    _detachInput() {
      const input = this.input;
      if (input) {
        input.removeEventListener('focus', this._handleInputFocus);
        input.removeEventListener('input', this._handleInputChange);
        input.removeEventListener('blur', this._handleInputBlur);
      }
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
      const el = this._triggerElInSlot;
      if (el) {
        el.removeEventListener('mouseover', this._handleOnHover);
        el.removeEventListener('mouseout', this._handleOnHoverLeave);
      }
    }


  /** EVENT HANDLERS AND DISPATCHERS **/
  // These methods handle events triggered by user interactions or other component changes

    /**
     * Dispatches an event indicating the popover has been shown.
     * Notifies listeners that the popover is now visible and emits a change event.
     * @fires auro-floater-shown
     * @returns {void}
     * @private
     */
    _dispatchShowEvent() {

      this.dispatchEvent(new CustomEvent('auro-floater-shown', {
        detail: { target: this, newState: "shown" },
        bubbles: true,
        composed: true
      }));

      this._dispatchChangeEvent({state: "shown"});
    }

    /**
     * Dispatches an event indicating the popover has been hidden.
     * Notifies listeners that the popover is now hidden and emits a change event.
     * @fires auro-floater-hidden
     * @returns {void}
     * @private
     */
    _dispatchHideEvent() {
      this.dispatchEvent(new CustomEvent('auro-floater-hidden', {
        detail: { target: this, newState: "hidden" },
        bubbles: true,
        composed: true
      }));

      this._dispatchChangeEvent({state: "hidden"});
    }

    
    /**
     * Dispatches an event indicating the popover's visibility state has changed.
     * Notifies listeners when the popover transitions between shown and hidden states.
     * @fires auro-floater-change
     * @param {Object} param - An object containing the shown state.
     * @returns {void}
     * @private
     */
    _dispatchChangeEvent({state}) {
      this.dispatchEvent(new CustomEvent('auro-floater-change', {
        detail: { target: this, newState: state },
        bubbles: true,
        composed: true
      }));
    }

    /**
     * Dispatches an event indicating the popover's visibility state is about to change.
     * Notifies listeners when the popover transitions between shown and hidden states.
     * @fires auro-floater-change
     * @param {Object} param - An object containing the shown state.
     * @returns {void}
     * @private
     */
    _dispatchBeforeChangeEvent({state}) {
      this.dispatchEvent(new CustomEvent('auro-floater-beforechange', {
        detail: { target: this, newState: state },
        bubbles: true,
        composed: true
      }));
    }

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
      if (!this.showOnChange) return false;

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
      if (!this.showOnFocus) return false;

      const input = event.target;
      if (
        // If the input has a minimum length and the value is valid and we should show on focus
        this._inputPassesValueCheck(input)
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

      // Get assigned nodes from the trigger slot
      const nodes = this._triggerSlot.assignedNodes({ flatten: true });

      // Force auto state if the user passes something to the trigger slot
      this._hasTriggerContent = !!(nodes.length > 0);
    }

    /** Runs when the popover is toggled by the browser 
     * @param {Event} event - The event triggered by the popover toggle
     * @returns {void}
     * @private
     * */
    _handlePopoverToggle(event) {
      this._dispatchBeforeChangeEvent({ state: this._open ? "hidden" : "shown" });

      // Wait a cycle for event listeners to make adjustments for beforechange event
      event.newState === 'open' ? this.show({internal: true}) : this.hide({internal: true});
    }

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
        <span ${ref(this._positioningTargetRef)}>
          <slot 
            name="trigger"
            ${ref(this._triggerSlotRef)}
            @slotchange="${() => this._handleTriggerSlotChange()}"
          ></slot>
        </span>
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
            part="popover-trigger"
            class="popover-trigger"
            type="button"
            popovertarget="popover"
            tabindex="-1"
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
          part="popover"
          ${ref(this._popoverRef)}
          popover="${this.type}"
          id="popover"
          role="dialog"
          aria-label="${this.title}"
          @beforetoggle=${this._handlePopoverToggle.bind(this)}
          tabindex="-1"
        >
          <slot></slot>
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

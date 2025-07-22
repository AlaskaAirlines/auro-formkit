/* eslint-disable */
import { html, LitElement } from "lit";
import { createRef, ref } from 'lit/directives/ref.js';

import { PopoverPositioner } from "@auro-formkit/utils";
import { FocusTrap } from "@aurodesignsystem/auro-library/scripts/runtime/FocusTrap/FocusTrap.mjs";

import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';
import { AuroDependencyVersioning } from '@aurodesignsystem/auro-library/scripts/runtime/dependencyTagVersioning.mjs';
import { StringBoolean } from "./StringBoolean.converter";

import styles from './styles/style-css.js';

const _DEFAULTS = {
  type: "manual",
  behavior: "dropdown",
  showOnHover: false,
  showOnFocus: true,
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

const _NO_INPUT_ERROR = "\nAuroPopover: The input behavior requires an input element to be passed to the trigger slot.\n\nExample:\n<auro-popover>\n\t<auro-input slot='trigger'></auro-input>\n</auro-popover>\n";
const _MULTIPLE_TRIGGER_ELEMENTS_ERROR = "\nAuroPopover: The input behavior requires a single trigger element to be passed to the trigger slot.\n\nExample:\n<auro-popover>\n\t<auro-button slot='trigger'>Click me</auro-button>\n</auro-popover>\n\nPassing more than one element may lead to undesireable behavior.\n";
const _TEXT_NODE_IN_TRIGGER_SLOT_ERROR = "\nAuroPopover: The trigger slot should not contain text nodes.\n\nExample:\n<auro-popover>\n\t<auro-button slot='trigger'>Click me</auro-button>\n</auro-popover>\n";

/**
 * AuroPopover is a web component that provides a customizable popover element.
 * It supports various behaviors such as dialog, dropdown, tooltip, and input.
 * @fires auro-popover-shown - Fired when the popover is shown. Event detail contains {target: AuroPopover, newState: "shown"}.
 * @fires auro-popover-hidden - Fired when the popover is hidden. Event detail contains {target: AuroPopover, newState: "hidden"}.
 * @fires auro-popover-change - Fired when the popover's visibility state changes. Event detail contains {target: AuroPopover, newState: string} where newState is either "shown" or "hidden".
 */
export class AuroPopover extends LitElement {

  /** STATIC METHODS **/
  // Utility methods that can be used without instantiating the class

    static register(name = "auro-popover") { AuroLibraryRuntimeUtils.prototype.registerComponent(name, AuroPopover) }

  /** CONSTRUCTOR **/
    constructor() {
      super();
      
      this._setDefaults(_DEFAULTS);
      this._createElementRefs();
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

        /** The behavior of the popover, "dialog", "dropdown", "tooltip", or "input" */
        behavior: { type: String, reflect: false },

        /** The offset distance of the floater */
        offset: { type: Number, reflect: false },

        /** The position of the floater, e.g., "bottom-start", "top-end" etc. */
        placement: { type: String, reflect: false },

        /** Whether the floater should show on hover */
        showOnHover: { type: Boolean, reflect: false },

        /** Whether the floater should open on focus (input behavior only) */
        showOnFocus: { type: String, reflect: false, converter: StringBoolean },

        /** Whether the floater is shown or not */
        shown: { type: Boolean, reflect: true },

        /** The minimum number of characters the user must type before the popover is shown */
        minInputLength: { type: Number, reflect: false },

        /** Whether the floater is open or not */
        _open: { type: Boolean, reflect: false, state: true },

        /** Whether the trigger slot contains any elements */
        _hasTriggerContent: { type: Boolean, reflect: false, state: true },

        floatingUiConfig: { type: Object, reflect: false }
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

    /**
     * Shows the popover
     * @returns {void}
     * @private
     */
    show() {

       // If already open, do nothing
      if (this.popover.matches(":popover-open")) return;

      // Position the popover if it is not already positioned
      if (this._shouldPositionPopover) this._attachPopoverPositioner();

      // Focus the popover to ensure accessibility
      if (this._shouldAdjustFocus) this.popover.focus();
      
      // Wait for a lifecycle since this is triggered by beforetoggle from the browser to ensure we check the state correctly
      setTimeout(() => {

        // Show the popover if it isn't already open
        if (!this.popover.matches(':popover-open')) { this.popover.showPopover() }

        // The popover is positioned and ready, so we can set shown to true
        this.shown = true;

        // Attach the focus trap to the popover if necessary
        this._attachFocusTrap(); // Attach focus trap to the popover

        // Dispatch relevant events
        this._dispatchShowEvent();
      })
    }

    /**
     * Shows the popover
     * @returns {void}
     * @private
     */
    hide() {

      // Don't try to hide the popover if it is not open
      if (!this.popover.matches(':popover-open')) return;

      // Stop positioning the popover
      this._detachPopoverPositioner();

      // Wait a lifecycle since this is triggered by beforetoggle from the browser to ensure we check the state correctly
      setTimeout(() => {

        // Hide the popover if it is currently open
        if (this.popover.matches(':popover-open')) { this.popover.hidePopover() }
  
        // Update shown to hide the popover via styles
        this.shown = false;

        // Focus the trigger element to ensure accessibility
        if (this._shouldAdjustFocus) {
          const focusEl = this._triggerElInSlot || this.button;
          focusEl?.focus();
        }

        // Dispatch relevant events
        this._dispatchHideEvent();
      })
    }


  /** LIFECYCLE METHODS **/
  // Attachments to the component lifecycle, such as connectedCallback, updated, etc.

    updated(changedProperties) {

      // Make sure we adjust the popover visibility based on external changes from the browser
      if (changedProperties.has('_open')) this._open ? this.show() : this.hide();

      // If the behavior changes, adjust the popover accordingly
      if (['behavior', '_hasTriggerContent'].some(prop => changedProperties.has(prop))) 
          this._adjustForBehavior(this.behavior);
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
     * Checks if the popover should adjust focus based on its behavior
     * @returns {boolean}
     * @private
     */
    get _shouldAdjustFocus() {
      return !['input', 'tooltip'].includes(this.behavior);
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
        ...this.floatingUiConfig ?? {},
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
    get _shouldAttachFocusTrap() { return !['input', 'tooltip'].includes(this.behavior) };


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
      this._detachPopoverPositioner();
      this._detachFocusTrap();
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
          this.type = this._hasTriggerContent ? 'auto' : 'manual';
          break;
        case 'dropdown':
          this.type = this._hasTriggerContent ? 'auto' : 'manual';
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
     * Attaches a focus trap to the popover if necessary
     * @returns {void}
     * @private
     */
    _attachFocusTrap() {
      if (this._shouldAttachFocusTrap) {
        this._focusTrap = new FocusTrap(this.popover);
        this._focusTrap.focusFirstElement();
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


  /** EVENT HANDLERS AND DISPATCHERS **/
  // These methods handle events triggered by user interactions or other component changes

    /**
     * Dispatches an event indicating the popover has been shown.
     * Notifies listeners that the popover is now visible and emits a change event.
     * @fires auro-popover-shown
     * @returns {void}
     * @private
     */
    _dispatchShowEvent() {

      this.dispatchEvent(new CustomEvent('auro-popover-shown', {
        detail: { target: this, newState: "shown" },
        bubbles: true,
        composed: true
      }));

      this._dispatchChangeEvent({state: "shown"});
    }

    /**
     * Dispatches an event indicating the popover has been hidden.
     * Notifies listeners that the popover is now hidden and emits a change event.
     * @fires auro-popover-hidden
     * @returns {void}
     * @private
     */
    _dispatchHideEvent() {
      this.dispatchEvent(new CustomEvent('auro-popover-hidden', {
        detail: { target: this, newState: "hidden" },
        bubbles: true,
        composed: true
      }));

      this._dispatchChangeEvent({state: "hidden"});
    }

    
    /**
     * Dispatches an event indicating the popover's visibility state has changed.
     * Notifies listeners when the popover transitions between shown and hidden states.
     * @fires auro-popover-change
     * @param {Object} param0 - An object containing the shown state.
     * @returns {void}
     * @private
     */
    _dispatchChangeEvent({state}) {
      this.dispatchEvent(new CustomEvent('auro-popover-change', {
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
        <span><-- ${this.type} popover</span>
        <br>
        <span>Trigger slot content: ${this._hasTriggerContent ? 'Yes' : 'No'}</span>
        <div 
          ${ref(this._popoverRef)}
          popover="${this.type}"
          id="popover"
          role="dialog"
          aria-label="${this.title}"
          class="auro-popover"
          @beforetoggle=${this._handlePopoverToggle.bind(this)}
          tabindex="-1"
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

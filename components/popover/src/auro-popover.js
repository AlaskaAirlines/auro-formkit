/* eslint-disable */
import { html, LitElement } from "lit";
import { createRef, ref } from 'lit/directives/ref.js';
import { PopoverPositioner } from "@auro-formkit/utils";

import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';
import { AuroDependencyVersioning } from '@aurodesignsystem/auro-library/scripts/runtime/dependencyTagVersioning.mjs';

const _DEFAULTS = {
  type: "manual",
  behavior: "dialog",
  offset: 0,
  placement: "bottom-start",
  showOnHover: false,
  shown: false
};

const _POSITIONER_DEFAULTS = {
  offset: 0,
  placement: 'bottom-start'
};

const _NO_INPUT_ERROR = "\nAuroPopover: The input behavior requires an input element to be passed to the trigger slot.\n\nExample:\n<auro-popover>\n\t<auro-input slot='trigger'></auro-input>\n</auro-popover>\n";

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

        /** @type {string} The behavior of the popover, "dialog", "dropdown", or "input" */
        behavior: { type: String, reflect: false },

        /** @type {number} The offset distance of the floater */
        offset: { type: Number, reflect: false },

        /** @type {string} The position of the floater, e.g., "bottom-start", "top-end" etc. */
        placement: { type: String, reflect: false },

        /** @type {boolean} Whether the floater should show on hover */
        showOnHover: { type: Boolean, reflect: false },

        /** @type {boolean} Whether the floater is shown or not */
        shown: { type: Boolean, reflect: true },

        /** @type {boolean} Whether the floater is open or not */
        _open: { type: Boolean, reflect: false, state: true }
      };
    }

    get button() { return this._buttonRef.value }

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

      // Set shown to true to trigger visibility
      if (!this.popover.matches(':popover-open')) { this.popover.showPopover() }

      // Wait a lifecycle for positioning to take effect, then set shown to true to trigger visibility
      setTimeout(() => this.shown = true, 0);
    }

    /**
     * Shows the popover
     * @returns {void}
     * @private
     */
    hide() {

      // Stop positioning the popover
      this._cancelPositionPopover();

      // Hide the popover if it is currently open
      if (this.popover.matches(':popover-open')) { this.popover.hidePopover() }

      // Update shown to hide the popover via styles
      this.shown = false;
    }


  /** LIFECYCLE METHODS **/
  // Attachments to the component lifecycle, such as connectedCallback, updated, etc.

    updated(changedProperties) {
      if (changedProperties.has('_open')) this._open ? this.show() : this.hide();
      if (changedProperties.has('behavior')) {
        if (this.behavior === 'input') {
          this.type = "manual";
          this._bindToInput();
        }
      }
    };


  /** PRIVATE GETTERS **/
  // Utility getters that return values based on internal state or properties

    /**
     * Gets whether the popover should be positioned based on its behavior
     * @returns {boolean}
     * @private
     */
    get _shouldPositionPopover() {
      return ["dropdown", "hint", "input"].includes(this.behavior);
    }

    /**
     * Generates the dropdown options based on internal properties and defined defaults
     * @private
     * @returns {object}
     */
    get _dropdownOptions() {
      return Object.assign(_POSITIONER_DEFAULTS, {
        placement: this.placement,
        offset: this.offset,
      });
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
      if (nodes.length > 0) {
        const input = nodes.find(node => node.tagName && node.tagName.toLowerCase().match('input'));
        if (input) return input;
        else throw new Error(_NO_INPUT_ERROR);
      } else {
        throw new Error(_NO_INPUT_ERROR);
      }
    }


  /** PRIVATE METHODS **/
  // Private methods that are used internally within the component only

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

    _bindToInput() {
      const input = this._inputInTriggerSlot;
      if (input) {
        input.addEventListener('focus', () => {console.log("input focused"); this.show()});
        input.addEventListener('mouseup', () => {console.log("input mouseup"); this.show()});
        input.addEventListener('blur', () => {console.log("input blurred"); this.hide()});
        input.addEventListener('keydown', () => {console.log("input changed"); this.show()});
      }
    }


  /** EVENT HANDLERS **/
  // These methods handle events triggered by user interactions or other component changes

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
          popover="auto"
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

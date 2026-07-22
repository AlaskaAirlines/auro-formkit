/* eslint-disable no-underscore-dangle, max-lines, object-property-newline, dot-location */

// Copyright (c) 2026 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

// If using litElement base class
import { LitElement, html } from "lit";

import styleCss from "./styles/style-css.js";

import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';

/**
 * @typedef {Object} FormStateMember - The form state member.
 * @property {string | number | boolean | string[] | Record<string, number> | null} value - The value of the form element. Mirrors the child component's own `.value`, so the shape varies by element type (e.g. an array for `auro-checkbox-group`, an object keyed by counter name for `auro-counter-group`). A `range` `auro-datepicker` is the one form-specific case: its `.values` array is stored rather than its single `.value` string.
 * @property {ValidityState} validity - The validity state of the form element, stored when fired from the form element.
 * @property {boolean} required - Whether the form element is required or not.
 * @property {boolean} disabled - Whether the form element is currently disabled. Cached from the live attribute via the MutationObserver in `connectedCallback` and refreshed from `_handleAttributeMutations`.
 */

/**
 * @typedef {Object.<string, FormStateMember>} FormState - The form state.
 */

/**
 * The `auro-form` element provides users a way to create and manage forms in a consistent manner.
 * @customElement auro-form
 *
 * @slot default - The default slot for form elements.
 *
 * @event input - Fires when a child form element receives user input.
 * @event change - Fires when a child form element's value changes or the form is initialized.
 * @event reset - Fires when the form is reset. The event detail contains the previous value of the form before reset.
 * @event submit - Fires when the form is submitted. The event detail contains the current value of the form.
 */
export class AuroForm extends LitElement {
  static get properties() {
    return {

      /** @private */
      formState: { type: Object, attribute: false },

      /** @private */
      _validity: { type: Object, attribute: false },

      /** @private */
      _isInitialState: { type: Boolean, attribute: false },

      /** @private */
      _elements: { type: Array, attribute: false },

      /** @private */
      _submitElements: { type: Array, attribute: false },

      /** @private */
      _resetElements: { type: Array, attribute: false },
    };
  }

  constructor() {
    super();

    /**
     * @type {FormState}
     * @private
     */
    this.formState = {};

    /**
     * @type {"valid" | "invalid" | null}
     * @private
     */
    this._validity = null;

    /** @private */
    this._isInitialState = true;

    /**
     * @type {(HTMLElement & {reset: () => void})[]}
     * @private
     */
    this._elements = [];

    /**
     * @type {HTMLButtonElement[]}
     * @private
     */
    this._submitElements = [];

    /**
     * @type {HTMLButtonElement[]}
     * @private
     */
    this._resetElements = [];

    /**
     * @private
     * @type {MutationObserver[]}
     */
    this.mutationObservers = [];

    /**
     * Captured initial (default) value per field `name`. Populated on first
     * sight of each name in `_addElementToState` and preserved across
     * subsequent `initializeState` cycles (slot change, rename, reset) so
     * `_setInitialState` can detect user edits as `current !== initial`,
     * matching HTML's `dirtyValueFlag` semantics.
     * @private
     * @type {Record<string, string | number | boolean | string[] | Record<string, number> | null | undefined>}
     */
    this._initialValues = {};

    // Single subtree observer that watches `disabled` and `name` attribute
    // changes across all tracked form elements. The `name` watch is required:
    // without it, renaming a tracked field at runtime leaves a stale key in
    // `formState` that `_isNameDisabled` cannot resolve, so a renamed-but-
    // disabled field would re-appear in `.value`.
    /**
     * @private
     * @type {MutationObserver | null}
     */
    this._attributeObserver = null;

    /** @private */
    this._handleAttributeMutations = this._handleAttributeMutations.bind(this);

    // Bind listeners
    /** @private */
    this.reset = this.reset.bind(this);

    /** @private */
    this.submit = this.submit.bind(this);

    /** @private */
    this.sharedInputListener = this.sharedInputListener.bind(this);

    /** @private */
    this.sharedValidationListener = this.sharedValidationListener.bind(this);

    /** @private */
    this.mutationEventListener = this.mutationEventListener.bind(this);

    /** @private */
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  // Note: button is NOT considered a form element in this context
  // as it does not have a .value property.
  static get formElementTags() {
    return [
      'auro-input',
      'auro-select',
      'auro-datepicker',
      'auro-combobox',
      // checkbox and radio are grouped elements
      'auro-checkbox-group',
      'auro-radio-group',
      // while counter is groupable, the group is for min/max values and not for grouped values
      'auro-counter-group'
    ];
  }

  /**
   * Compare tag name with element to identify it (for API purposes).
   * @param {string} elementTag - The HTML tag name like `auro-datepicker`.
   * @param {HTMLElement} element - The actual HTML element to compare.
   * @returns {boolean}
   * @private
   */
  _isElementTag(elementTag, element) {
    return element.tagName.toLowerCase() === elementTag || element.hasAttribute(elementTag.toLowerCase());
  }

  /**
   * Shared code for determining if an element is something we care about (submit, form element, etc.).
   * @param {string[]} collection - The array to use for tag name search.
   * @param {HTMLElement} element - The element to compare against the master list.
   * @returns {boolean}
   * @private
   */
  _isInElementCollection(collection, element) {
    return collection.some((elementTag) => this._isElementTag(elementTag, element));
  }

  /**
   * Check if the tag name is a form element.
   * @param {HTMLElement} element - The element to check (attr or tag name).
   * @returns {boolean}
   * @private
   */
  isFormElement(element) {
    return this._isInElementCollection(AuroForm.formElementTags, element);
  }

  /**
   * Whether a given element is currently disabled. Disabled controls are excluded
   * from submission, validity, and initial-state checks per the HTML spec
   * (section 4.10.19.2 "Enabling and disabling form controls":
   * https://www.w3.org/TR/2011/WD-html5-20110113/association-of-controls-and-forms.html).
   *
   * Implementation note: we deliberately read only the attribute. Every Auro
   * form element in `formElementTags` declares `disabled` with `reflect: true`,
   * so the attribute and property stay in sync. Reading the attribute also
   * lets the MutationObserver in `connectedCallback` (which is filtered to
   * `['disabled', 'name']`) be the single source of truth for re-renders.
   * If a future form-element type ships without attribute reflection, expand
   * this helper to also read `element.disabled`.
   * @param {HTMLElement | undefined | null} element - The element to check.
   * @returns {boolean}
   * @private
   */
  _isDisabled(element) {
    return Boolean(element?.hasAttribute('disabled'));
  }

  /**
   * Whether the tracked form element registered under `name` is currently disabled.
   * See `_isDisabled` for the HTML-spec rationale behind excluding disabled
   * controls from form state.
   *
   * Reads a cached flag on `formState[name]` populated by `_addElementToState`
   * at registration and refreshed by `_handleAttributeMutations` whenever the
   * element's `disabled` attribute toggles. The cache is fed by the same
   * `hasAttribute('disabled')` read as `_isDisabled`, so the "future form-element
   * type without attribute reflection" caveat documented there applies here too.
   * @param {string} name - The `name` attribute used to register the element.
   * @returns {boolean}
   * @private
   */
  _isNameDisabled(name) {
    return Boolean(this.formState[name]?.disabled);
  }

  /**
   * Validates if an event is from a valid form element with a name.
   * @param {Event} event - The event to validate.
   * @returns {boolean} - True if event is valid for processing.
   * @private
   */
  _eventIsValidFormEvent(event) {
    const targetName = event.target.getAttribute("name");
    return this.isFormElement(event.target) && targetName;
  }


  static get buttonElementTags() {
    return [
      'button',
      'auro-button',
    ];
  }

  /**
   * Check if the tag name is a button element.
   * @param {HTMLElement} element - The element to check.
   * @returns {boolean}
   * @private
   */
  isButtonElement(element) {
    return this._isInElementCollection(AuroForm.buttonElementTags, element);
  }

  static get styles() {
    return [styleCss];
  }

  /**
   * Returns the current values of all named, enabled form elements as a key-value object, keyed by each element's `name` attribute. Each value is the child component's own `.value`, so the shape depends on the element type — see that component's documentation for its exact shape (for example, `auro-checkbox-group` yields an array, `auro-counter-group` yields an object keyed by counter name, and `auro-select` with `multiSelect` yields a JSON-encoded string). The one form-specific exception is a `range` `auro-datepicker`, whose `.values` array (`[start, end]`) is stored instead of its single `.value` string.
   * @returns {Record<string, string | number | boolean | string[] | Record<string, number> | null>} The current form values.
   */
  get value() {
    return Object.keys(this.formState).reduce((acc, key) => {
      if (this._isNameDisabled(key)) {
        return acc;
      }

      acc[key] = this.formState[key].value;
      return acc;
    }, {});
  }

  /**
   * Getter for internal _submitElements.
   * @returns {HTMLButtonElement[]}
   * @private
   */
  get submitElements() {
    return this._submitElements;
  }

  /**
   * Returns a collection of elements that will reset the form.
   * @returns {HTMLButtonElement[]}
   * @private
   */
  get resetElements() {
    return this._resetElements;
  }

  /**
   * Raw constraint-validation check. Returns `true` when no enabled field
   * has a validity error. Unlike the public `validity` getter, this does
   * NOT gate on `isInitialState` — callers that need to make a decision
   * based on the actual constraint state (submit-button enablement, the
   * internal `submit()` gate) read this so a pre-filled valid form is
   * correctly recognized as submittable at first render.
   * @returns {boolean}
   * @private
   */
  _isFormValid() {
    return !Object.keys(this.formState).some((key) => {
      if (this._isNameDisabled(key)) {
        return false;
      }

      const formKey = this.formState[key];
      // `null` validity means "not yet validated" — auro-input doesn't
      // re-validate on every keystroke, so validity stays `null` between
      // input events until blur. Treating `null` as invalid disables Submit
      // the moment a user types into any field, which is the wrong UX.
      // We treat a field as invalid in two cases:
      //   1. validity is known-bad (non-null, non-'valid')
      //   2. it's `required` and structurally empty — `valueMissing` is
      //      certain even without a validation pass.
      // `submit()` calls `validate(true)` on every enabled field before
      // reading `_isFormValid()`, so any not-yet-validated field that turns
      // out to fail another constraint still blocks dispatch.
      const knownInvalid = formKey.validity !== null && formKey.validity !== 'valid';
      const requiredAndEmpty = formKey.required && this._normalizeEmpty(formKey.value) === null;
      return knownInvalid || requiredAndEmpty;
    });
  }

  /**
   * Whether the reset button should be enabled. True when the form has
   * diverged from its initial state (so the user can always return to
   * defaults — even if the dirty value lives behind a now-disabled field),
   * OR when any non-disabled field has a current value or captured initial
   * value (covers pre-filled forms and user-cleared-back-to-empty cases).
   * @returns {boolean}
   * @private
   */
  _hasResetableState() {
    // Form is dirty — always allow Reset, even if the dirt is on a field
    // that has since been disabled. Without this branch, the user would
    // have no UI path to return the form to its initial state.
    if (!this._isInitialState) {
      return true;
    }

    return Object.keys(this.formState).some((key) => {
      if (this._isNameDisabled(key)) {
        return false;
      }
      const current = this._normalizeEmpty(this.formState[key].value);
      const initial = this._normalizeEmpty(this._initialValues[key]);
      return current !== null || initial !== null;
    });
  }

  /**
   * Collapse empty representations to a single canonical `null`.
   *
   * `_addElementToState` captures `null` for a field that mounts without a
   * `value` attribute (`element.value || element.getAttribute('value')` is
   * falsy → resolves to `null`), but `sharedInputListener` later stores the
   * raw `event.target.value` — which is `''` for a user-cleared text input.
   * Without this normalization, backspacing back to empty would taint the
   * form forever (`'' !== null`) and Reset would stay enabled with nothing
   * to actually reset.
   *
   * `''`, `undefined`, and `[]` all collapse to `null`. The empty-array case
   * covers checkbox-group, radio-group, and multiselect, where `[]` means
   * "no selection" — semantically the same as `null`/`''`. Genuine values
   * — including `0`, `false`, non-empty strings, and non-empty arrays —
   * pass through unchanged so number, boolean, and populated multi-value
   * fields still compare correctly.
   * @param {*} value - Value to normalize.
   * @returns {*}
   * @private
   */
  _normalizeEmpty(value) {
    if (value === '' || value === undefined) {
      return null;
    }
    if (Array.isArray(value) && value.length === 0) {
      return null;
    }
    return value;
  }

  /**
   * Infer validity status based on current formState.
   *
   * Validity stays `null` while the form is in its initial state — this is
   * the "stay quiet until the user interacts" UX contract that consumers
   * depend on to delay error indicators. Code that needs the raw
   * constraint-validation result regardless of interaction (e.g.,
   * submit-button enablement) should call `_isFormValid()` directly.
   * @private
   */
  _calculateValidity() {
    if (this.isInitialState) {
      this._validity = null;
    } else {
      this._validity = this._isFormValid() ? 'valid' : 'invalid';
    }
  }

  /**
   * Returns `'valid'` if all required and interacted-with form elements are valid, `'invalid'` if any are not, or `null` if the form has not been interacted with yet.
   * @returns {"valid" | "invalid" | null}
   */
  get validity() {
    // Force calculate, as sometimes validity won't reflect
    // the latest value while in-between renders.
    this._calculateValidity();
    return this._validity;
  }

  /**
   * Determines whether the form is in its initial (untouched) state.
   *
   * A field is tainted if either:
   *   - its value differs from the value captured on first render, OR
   *   - its validity is failing (anything other than `null` or `'valid'`).
   *
   * Validity acts as a backup signal: it catches users who interact with a
   * field without changing its value (e.g., focusing and blurring a required
   * field). We skip `null` (not yet validated) and `'valid'` (the default
   * after Auro's auto-validation on mount) because neither proves the user
   * touched anything.
   * @returns {void}
   * @private
   */
  _setInitialState() {
    const anyTainted = Object.keys(this.formState).some((key) => {
      // Normalize empty values so a freshly-captured `null` (no `value`
      // attribute at mount) and a user-cleared `''` (input emptied via
      // backspace) compare equal. Without this, backspacing back to an
      // empty field leaves the form permanently tainted.
      const initialValue = this._normalizeEmpty(this._initialValues[key]);
      const currentValue = this._normalizeEmpty(this.formState[key].value);
      const fieldValidity = this.formState[key].validity;
      // eslint-disable-next-line no-extra-parens
      return currentValue !== initialValue || (fieldValidity !== null && fieldValidity !== 'valid');
    });

    this._isInitialState = !anyTainted;
    // Button state is owned by setDisabledStateOnButtons (called from updated()
    // and reset()). Touching resetElement.disabled here causes a visible flicker
    // in reset(), where the final setDisabledStateOnButtons is deferred behind
    // an extra updateComplete.
  }

  /**
   * Returns `true` if no form element has been interacted with or had its value changed since the form was initialized or last reset.
   * @returns {boolean}
   */
  get isInitialState() {
    return this._isInitialState;
  }

  /**
   * Enables or disables submit and reset buttons based on the current form state and validity.
   * @returns {void}
   * @private
   */
  setDisabledStateOnButtons() {
    this._resetElements.forEach((element) => {
      // Reset is meaningful whenever any non-disabled field has a current
      // value OR a captured default value — i.e., whenever the click would
      // either clear something or restore a default.
      element.disabled = !this._hasResetableState();
    });

    this._submitElements.forEach((element) => {
      // Submit enablement reads raw validity (not the gated public getter)
      // so a pre-filled valid form is submittable at first render — the
      // public `validity` stays `null` during initial state to keep error
      // indicators quiet until the user interacts, but the button decision
      // bypasses that gate.
      element.disabled = !this._isFormValid();
    });
  }

  /**
   * Construct the query strings from elements, append them together, execute, and return the NodeList.
   * @returns {NodeList}
   * @private
   */
  queryAuroElements() {
    const queries = [
      [
        AuroForm.formElementTags,
        '[name]'
      ],
      [
        AuroForm.buttonElementTags,
        '[type=submit]'
      ],
      [
        AuroForm.buttonElementTags,
        '[type=reset]'
      ]
    ];

    return this.querySelectorAll(queries.flatMap(([
      tags,
      extraAttributes
    ]) => tags.map((tag) => `${tag}${extraAttributes}, [${tag}]${extraAttributes}`)).join(', '));
  }

  /**
   * Store an element in state and on the _elements array.
   * @param {HTMLElement} element - The element to add to our state.
   * @private
   */
  _addElementToState(element) {
    const targetName = element.getAttribute('name');
    if (this.formState[targetName]) {
      return;
    }

    this.formState[targetName] = {
      value: element.value || element.getAttribute('value'),
      validity: element.validity || null,
      required: element.hasAttribute('required'),
      disabled: element.hasAttribute('disabled'),
    };

    // Capture the initial (default) value once per name. Use `in` rather
    // than `??=` so a captured `null` (an empty field at first sight) is
    // preserved across rename/slot/reset cycles — `??=` would treat the
    // stored `null` as nullish and overwrite it with whatever value the
    // field has now, defeating the `current !== initial` taint check.
    if (!(targetName in this._initialValues)) {
      this._initialValues[targetName] = this.formState[targetName].value;
    }

    this._elements.push(element);
  }

  /**
   * Initialize (or reinitialize) the form state.
   * @returns {void}
   * @private
   */
  initializeState() {
    this.formState = {};
    this._submitElements = [];
    this._resetElements = [];
    this._elements = [];

    this.queryAuroElements().forEach((element) => {
      if (this.isFormElement(element)) {
        this._addElementToState(element);
      }

      if (this.isButtonElement(element) && element.getAttribute('type') === 'submit') {
        element.removeEventListener('click', this.submit);
        element.addEventListener('click', this.submit);

        // Keep record of this element, so we can enable/disable as needed
        this._submitElements.push(element);
      }

      if (this.isButtonElement(element) && element.getAttribute('type') === 'reset') {
        // Keep record of this element, so we can enable/disable as needed
        element.removeEventListener('click', this.reset);
        element.addEventListener('click', this.reset);

        this._resetElements.push(element);
      }
    });

    // Drop captured initial values for fields that no longer exist in the form.
    // Rename migration in _handleAttributeMutations has already re-keyed surviving
    // fields, so anything left here is a field that was removed from the DOM.
    for (const key of Object.keys(this._initialValues)) {
      if (!(key in this.formState)) {
        delete this._initialValues[key];
      }
    }

    this.dispatchEvent(new Event('change', {
      bubbles: true,
      composed: true,
      cancelable: true
    }));

    // Set enabled/disabled states on buttons
    this.setDisabledStateOnButtons();
  }

  /**
   * Resets all form elements to their initial state and fires a `reset` event. The event's `detail.previousValue` contains the form values captured immediately before the reset.
   * @returns {void}
   */
  reset() {
    const previousValue = this.value;
    this._elements.forEach((element) => element.reset());

    this.updateComplete.then(() => {
      this.initializeState();
      // Initial state must come first - validity can only be null if initial state is true
      this._setInitialState();
      this._calculateValidity();

      // Wait for the above changes to run through, then disable submit/reset
      this.updateComplete.then(() => {
        this.setDisabledStateOnButtons();

        this.dispatchEvent(new CustomEvent('reset', {
          bubbles: true,
          composed: true,
          detail: {
            previousValue
          }
        }));
      });
    });
  }

  /**
   * Validates all form elements. If all are valid, fires a `submit` event with `detail.value` containing the current form values. If any element is invalid, its error state is surfaced and the `submit` event is not fired.
   * @returns {Promise<void>}
   */
  async submit() {
    // Force validation on all enabled elements. Disabled fields are skipped
    // because disabled controls are not validated nor submitted per the HTML spec.
    this._elements.
      filter((element) => !this._isDisabled(element)).
      forEach((element) => {
        element.validate(true);
      });

    // Wait for validation to complete and formState to update
    await this.updateComplete;

    // Gate on raw constraint-validation rather than the public `validity`
    // getter (which is `null` while in initial state). A pre-filled valid
    // form should be submittable without a prior user edit.
    if (this._isFormValid()) {
      this.dispatchEvent(new CustomEvent('submit', {
        bubbles: true,
        composed: true,
        detail: {
          value: this.value
        }
      }));
    }
  }

  /**
   * Registers the `auro-form` custom element with the browser under a given tag name.
   * @param {string} [name="auro-form"] - The custom element tag name to register.
   *
   * @example
   * AuroForm.register("custom-form") // registers as <custom-form>
   */
  static register(name = "auro-form") {
    AuroLibraryRuntimeUtils.prototype.registerComponent(name, AuroForm);
  }

  /**
   * Shared input listener for all form elements.
   * @param {Event} event - The event that is fired from the form element.
   * @private
   */
  sharedInputListener(event) {
    const targetName = event.target.getAttribute("name");

    // This should only happen if some bubble-up event is fired from inside a form element.
    if (!this._eventIsValidFormEvent(event)) {
      return;
    }

    // Occasionally, a form element will emit their event before the form can read data about the form element.
    if (!this.formState[targetName] && this.isFormElement(event.target)) {
      this._addElementToState(event.target);
    }

    // Check special input types and handle their edge cases
    if (this._isElementTag('auro-datepicker', event.target) && event.target.hasAttribute('range')) {
      this.formState[targetName].value = event.target.values;
    } else {
      this.formState[targetName].value = event.target.value;
    }

    this.requestUpdate('formState');
    this.dispatchEvent(new CustomEvent('change', {
      bubbles: true,
      composed: true,
      cancelable: true
    }));
  }

  /**
   * Shared validation listener for all form elements.
   * @param {Event} event - The event that is fired from the form element.
   * @private
   */
  sharedValidationListener(event) {
    const targetName = event.target.getAttribute("name");
    if (!this._eventIsValidFormEvent(event)) {
      return;
    }

    if (!this.formState[targetName]) {
      this._addElementToState(event.target);
    }

    // `auroFormElement-validated` can fire with `detail.validity === undefined`
    // when auro-input's updated() lifecycle invokes `validate()` mid-edit but
    // the validation framework's gating conditions (not focused, touched-or-
    // has-value) aren't met — the dispatch still fires, just with the current
    // (untouched) validity. Normalize to `null` so the rest of the form treats
    // "no known status" identically whether it came from `_addElementToState`
    // at mount or from this passthrough mid-typing.
    this.formState[targetName].validity = event.detail.validity ?? null;
    this._calculateValidity();
    this.requestUpdate('formState');
  }

  /**
   * Handle Enter key press on form elements.
   * @param {KeyboardEvent} event - The keyboard event.
   * @private
   */
  handleKeyDown(event) {

    /**
     * Use `currentTarget` because it is the tracked form element
     * handling the event, while `target` may be an inner radio,
     * checkbox, or counter inside that form control.
     */
    const formElement = event.currentTarget;

    if (event.key === 'Enter' && this.isFormElement(formElement)) {
      // Disabled controls do not submit a form natively.
      if (this._isDisabled(formElement)) {
        return;
      }

      // Don't submit if it's a textarea (allow new lines)
      if (formElement.tagName.toLowerCase() === 'textarea' ||
          formElement.hasAttribute('textarea')) {
        return;
      }

      event.preventDefault();
      this.submit();
    }
  }

  /**
   * Attaches input, validation, and keydown listeners to all tracked form and button elements.
   * Removes existing listeners first to avoid duplicates on re-initialization.
   * @returns {void}
   * @private
   */
  _attachEventListeners() {
    this.queryAuroElements().forEach((element) => {
      // remove any existing event listeners (in case of re-initialization)
      element.removeEventListener('input', this.sharedInputListener);
      element.removeEventListener('auroFormElement-validated', this.sharedValidationListener);
      element.removeEventListener('keydown', this.handleKeyDown);

      // add new event listeners
      element.addEventListener('input', this.sharedInputListener);
      element.addEventListener('auroFormElement-validated', this.sharedValidationListener);
      element.addEventListener('keydown', this.handleKeyDown);
    });
  }

  /**
   * Handle batched MutationObserver records for `disabled` and `name`
   * attribute changes on tracked form elements. A `name` change invalidates
   * the formState keying — we resolve it by re-initializing state. A `disabled`
   * change simply needs a re-render (so `value` / `validity` getters re-evaluate)
   * and a refresh of the submit/reset button enablement.
   * @param {MutationRecord[]} mutations - The batched mutation records.
   * @returns {void}
   * @private
   */
  _handleAttributeMutations(mutations) {
    // Only mutations on tracked FORM elements matter here. The same observer
    // also sees attribute changes on the submit/reset buttons (which this
    // component itself toggles via `setDisabledStateOnButtons`); reacting to
    // those would create an infinite observer/update loop.
    const relevant = mutations.filter((mutation) => this.isFormElement(mutation.target));
    if (relevant.length === 0) {
      return;
    }

    const renameMutations = relevant.filter((mutation) => mutation.attributeName === 'name');
    if (renameMutations.length > 0) {
      // Migrate each renamed field's captured initial value from the old key
      // to the new key before `initializeState()` re-runs `_addElementToState`.
      // Without this, the new-name lookup in `_initialValues` would miss, the
      // field's current (possibly user-edited) value would be captured as the
      // new initial, and the form would incorrectly flip back to its initial
      // state. The old key would also leak in `_initialValues` indefinitely.
      renameMutations.forEach((mutation) => {
        const oldName = mutation.oldValue;
        const newName = mutation.target.getAttribute('name');
        if (!oldName || oldName === newName) {
          return;
        }
        if (newName === null) {
          // `name` attribute removed — field will fall out of formState on re-init.
          // Drop its captured initial so it doesn't leak in _initialValues.
          delete this._initialValues[oldName];
          return;
        }
        if (oldName in this._initialValues) {
          this._initialValues[newName] = this._initialValues[oldName];
          delete this._initialValues[oldName];
        }
      });
      // initializeState() rebuilds formState from scratch (re-keying any
      // renamed element) and also dispatches `change` + refreshes button state.
      // We also re-run _attachEventListeners() because elements that previously
      // had no `name` were skipped by queryAuroElements() (which selects
      // `[name]`) and therefore never received input/validation/keydown
      // listeners. Re-attaching is safe — the listener-removal step inside
      // _attachEventListeners() prevents duplicates on already-wired elements.
      this.initializeState();
      this._attachEventListeners();
      return;
    }

    // Refresh the cached `disabled` flag on each affected formState entry
    // before the re-render, so getters that read `_isNameDisabled` see the
    // current attribute state in the same tick.
    relevant
      .filter((mutation) => mutation.attributeName === 'disabled')
      .forEach((mutation) => {
        const name = mutation.target.getAttribute('name');
        if (name && this.formState[name]) {
          this.formState[name].disabled = mutation.target.hasAttribute('disabled');
        }
      });

    this.requestUpdate('formState');
    this.setDisabledStateOnButtons();
  }

  /**
   * @returns {void}
   */
  connectedCallback() {
    super.connectedCallback();

    // One observer rooted at the host catches `disabled` / `name` changes on
    // any tracked form element (light-DOM children, including those nested in
    // wrapper elements). Cheaper than allocating an observer per element and
    // resilient to runtime DOM mutations.
    if (!this._attributeObserver) {
      this._attributeObserver = new MutationObserver(this._handleAttributeMutations);
    }

    this._attributeObserver.observe(this, {
      attributes: true,
      subtree: true,
      attributeOldValue: true,
      attributeFilter: [
        'disabled',
        'name'
      ]
    });
  }

  /**
   * @returns {void}
   */
  disconnectedCallback() {
    // Disconnect everything we own to avoid leaking observers (and the strong
    // refs they hold to DOM nodes) past the form's lifetime.
    this._attributeObserver?.disconnect();
    this.mutationObservers.forEach((observer) => observer.disconnect());
    this.mutationObservers = [];
    // Intentionally do NOT clear _initialValues here. Slot-moves trigger a
    // disconnect/reconnect cycle; clearing would cause the next initializeState
    // to capture the user's edited values as the new "initial" and silently
    // flip the form back to its initial state.

    super.disconnectedCallback();
  }

  /**
   * @param {import('lit').PropertyValues} _changedProperties - Map of changed properties with their previous values.
   * @returns {void}
   */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);

    this._attachEventListeners();
  }

  /**
   * @param {import('lit').PropertyValues} _changedProperties - Map of changed properties with their previous values.
   * @returns {void}
   */
  updated(_changedProperties) {
    super.updated(_changedProperties);

    if (_changedProperties.has("formState")) {
      this._setInitialState();

      // Automatically infer disabled state now
      this.setDisabledStateOnButtons();
    }

    if (_changedProperties.has("_validity")) {
      this._setInitialState();
    }
  }

  /**
   * Mutation observer for form elements. Slot change does not trigger unless
   * root-level elements are added/removed. This is a workaround to ensure
   * nested form elements are also observed.
   *
   * @returns {void}
   * @private
   */
  mutationEventListener() {
    this.initializeState();
    this._attachEventListeners();
  }

  /**
   * Slot change event listener. This is the main entry point for the form element.
   * @param {Event} event - The slot change event.
   * @returns {void}
   * @private
   */
  onSlotChange(event) {
    this.initializeState();
    // Safe to call as we remove and re-add event listeners
    this._attachEventListeners();

    // Get rid of old observers - we'll create new ones in a moment
    this.mutationObservers.forEach((mo) => mo.disconnect());
    this.mutationObservers = [];

    const slotNodes = event.currentTarget.assignedNodes();
    slotNodes.forEach((node) => {
      if (node.tagName && !this.isFormElement(node)) {
        const mo = new MutationObserver(this.mutationEventListener);
        mo.observe(node, {
          subtree: true,
          childList: true
        });
        this.mutationObservers.push(mo);
      }
    });
  }

  /**
   * @returns {import('lit').TemplateResult}
   */
  render() {
    return html`
        <form>
          <slot @slotchange="${this.onSlotChange}"></slot>
        </form>
    `;
  }
}

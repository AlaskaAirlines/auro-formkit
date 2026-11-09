// Copyright (c) 2025 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

/* eslint-disable lit-a11y/click-events-have-key-events, lit/binding-positions, lit/no-invalid-html, max-lines, no-extra-parens */

import shapeSizeCss from "./styles/shapeSize-css.js";

import styleCss from "./styles/style-css.js";
import styleDefaultCss from "./styles/default/style-css.js";
import colorBaseCss from "./styles/color-css.js";
import tokensCss from "./styles/tokens-css.js";

import classicStyleCss from "./styles/classic/style-css.js";
import classicColorCss from "./styles/classic/color-css.js";

import emphasizedStyleCss from "./styles/emphasized/style-css.js";
import emphasizedColorCss from "./styles/emphasized/color-css.js";

import snowflakeStyleCss from "./styles/snowflake/style-css.js";

import { css } from "lit";
import { html } from 'lit/static-html.js';
import { repeat } from 'lit/directives/repeat.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import i18n from './i18n.js';

import BaseInput from './base-input.js';

import { AuroDependencyVersioning } from '@aurodesignsystem/auro-library/scripts/runtime/dependencyTagVersioning.mjs';
import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';

import { AuroIcon } from '@aurodesignsystem/auro-icon/class';
import iconVersion from './iconVersion.js';
import { AuroButton } from "@aurodesignsystem/auro-button/class";
import buttonVersion from './buttonVersion.js';

import { AuroHelpText } from '@aurodesignsystem/auro-helptext';
import formkitVersion from '@aurodesignsystem/version';

import { createRef, ref } from "lit/directives/ref.js";

/**
 * A single-line text field that lets people type a value, such as a name, email address, phone number, card number, or date.
 *
 * **Key capabilities**
 * - **Formatting as people type**: Set `type` to `credit-card`, `tel`, or `date`, or set `format`, to format the value as the user types.
 * - **Validation messages**: Set `required`, `minlength`, `maxlength`, `pattern`, `min`, or `max` to show an error message below the field when the value doesn't meet the rule.
 * - **Clear button**: The input always shows a button that clears the value when the field has a value, isn't disabled or read-only, and the user hovers over it or moves focus into it.
 * - **Password visibility**: Set `type="password"` to add a button that shows or hides the password in the `classic` layout.
 * - **Dark backgrounds**: Set `appearance="inverse"` to use colors made for dark backgrounds.
 *
 * **Example**
 *
 * ```html
 * <auro-input>
 *   <span slot="label">Full name</span>
 * </auro-input>
 * ```
 * @summary A text field with formatting as people type, validation messages, a clear button, and password visibility.
 * @customElement auro-input
 *
 * @slot ariaLabel.clear - Text screen readers announce for the clear button, for example "Clear full name". Defaults to "Clear Input". {@category a11y}
 * @slot ariaLabel.password.show - Text screen readers announce for the button that shows the password, for example "Show password". Defaults to "Show Password". {@category a11y}
 * @slot ariaLabel.password.hide - Text screen readers announce for the button that hides the password, for example "Hide password". Defaults to "Hide Password". {@category a11y}
 * @slot helpText - Help text shown below the field, such as a hint about what to enter. An error message replaces it while the input is invalid. When the slot is empty, `password`, `email`, `credit-card`, and `tel` inputs show built-in help text. {@category ui}
 * @slot label - The field's label, which screen readers also announce as the field's name. {@requiredWhen always} {@category ui}
 * @slot optionalLabel - Text shown after the label when the input isn't `required`, in place of the default " (optional)". To show nothing, put an empty element in the slot, such as `<span slot="optionalLabel"></span>`. {@relevantWhen !required} {@category ui}
 * @slot displayValue - Content shown in place of the value when the input has a value and doesn't have focus, such as a city name for an airport code. It also hides the label unless `dvInputOnly` is set. {@category ui}
 * @csspart wrapper - The field's outer box, which holds the label, value, and icons but not the help text.
 * @csspart label - The `<label>` element that holds the `label` slot.
 * @csspart helpText - The `<p>` element that holds the help text or error message.
 * @csspart input - The inner `<input>` element.
 * @csspart accentIcon - The icon left of the value: the card icon when `icon` is set with `type="credit-card"`, or the calendar icon when `type="date"`. Not rendered in the emphasized layouts.
 * @csspart accent-left - The area left of the value that holds `accentIcon`. Rendered only in the `classic` layout.
 * @csspart accent-right - The area right of the value that holds the error icon, the show/hide password button, and the clear button. Rendered only in the `classic` layout.
 * @csspart displayValue - The element that holds the `displayValue` slot content.
 * @csspart inputHelpText - The area below the field that holds the help text or error message.
 */
export class AuroInput extends BaseInput {

  constructor() {
    super();

    /**
     * Generate unique names for dependency components.
     */
    const versioning = new AuroDependencyVersioning();

    /**
     * @private
     */
    this.buttonTag = versioning.generateTag('auro-formkit-input-button', buttonVersion, AuroButton);

    /**
     * @private
     */
    this.hasDisplayValueContent = false;

    /**
     * @private
     */
    this.helpTextTag = versioning.generateTag('auro-formkit-input-helptext', formkitVersion, AuroHelpText);

    /**
     * @private
     */
    this.iconTag = versioning.generateTag('auro-formkit-input-icon', iconVersion, AuroIcon);

    /**
     * @private
     */
    this.clearButtonRef = createRef();
  }

  static get styles() {
    return [
      css`${classicStyleCss}`,
      css`${classicColorCss}`,
      css`${shapeSizeCss}`,
      css`${colorBaseCss}`,
      css`${styleCss}`,
      css`${styleDefaultCss}`,
      css`${tokensCss}`,
      css`${emphasizedStyleCss}`,
      css`${emphasizedColorCss}`,
      css`${snowflakeStyleCss}`
    ];
  }

  /**
   * Checks whether the input has a value the user can clear.
   * @private
   * @returns {boolean} - True if the input has a value and isn't read-only or disabled; false otherwise.
   */
  get isClearable() {
    return Boolean(this.hasValue && !this.readonly && !this.disabled);
  }

  /**
   * Gets the classes for the clear button's wrapper.
   * The wrapper is hidden on the same condition as the button, so an empty wrapper
   * never takes up space in the accents row on hover or focus.
   * @private
   * @returns {Record<string, boolean>} - The class map that shows or hides the clear button's wrapper.
   */
  get clearWrapperClassMap() {
    return {
      'notification': true,
      'clear': true,
      'util_displayHidden': !this.isClearable
    };
  }

  /**
   * Gets the classes for the clear button.
   * The button is hidden when the input has no value, is read-only, or is disabled.
   * @private
   * @returns {Record<string, boolean>} - The class map that shows or hides the clear button.
   */
  get clearBtnClassMap() {
    return {
      'notificationBtn': true,
      'clearBtn': true,
      'util_displayHidden': !this.isClearable
    };
  }

  /**
   * Checks whether the inner `<input>` element should be visually hidden.
   * It's hidden when `displayValue` content is shown in its place, or when the input is empty,
   * doesn't have focus, and has no placeholder, unless `activeLabel` keeps it visible in the classic layout.
   * @returns {boolean} - True if the inner `<input>` should be visually hidden; false otherwise.
   * @private
   */
  get inputHidden() {
    // In the classic/default layout, activeLabel keeps the input row visible so
    // the label stays raised rather than collapsing to the centered placeholder
    // position. Emphasized/snowflake always render the label inside the field,
    // so activeLabel does not apply there. This only overrides the empty/
    // unfocused clause — the display-value clause (combobox/datepicker) is
    // preserved regardless.
    const activeLabelRaisesInput = this.activeLabel && this.isClassicLayout;

    return (
      this.hasDisplayValueContent && !this.hasFocus && this.hasValue) ||
      (
        !activeLabelRaisesInput &&
        (!this.value || this.value.length === 0) &&
        !this.hasFocus &&
        (!this.placeholderStr || this.placeholderStr === '')
      );
  }

  /**
   * Checks whether the component renders the classic layout, meaning neither an
   * emphasized layout nor `snowflake`. Kept as a single source of truth so
   * layout-scoped behavior such as `activeLabel` stays consistent across getters.
   * @returns {boolean} - True if the classic layout is rendered; false otherwise.
   * @private
   */
  get isClassicLayout() {
    return !this.layout.startsWith('emphasized') && this.layout !== 'snowflake';
  }

  /**
   * Checks whether the input should look empty and unfocused.
   * That's the case when `displayValue` content is shown in place of the value,
   * or when the input has no value and doesn't have focus.
   * @returns {boolean} - True if the input should look empty and unfocused; false otherwise.
   * @private
   */
  get noFocusOrValue() {
    return (this.hasDisplayValueContent && !this.hasFocus && this.hasValue) || ((!this.value || this.value.length === 0) && !this.hasFocus);
  }

  /**
   * Checks whether the label is hidden because `displayValue` content is shown in its place.
   * @returns {boolean} - True if the label is hidden; false otherwise.
   * @private
   */
  get labelHidden() {
    return this.hasDisplayValueContent && !this.dvInputOnly && !this.hasFocus && this.hasValue;
  }

  /**
   * Gets the label's font class for the current layout and state.
   * @private
   * @returns {string} - The font class for the label.
   */
  get labelFontClass() {
    if (this.layout.startsWith('emphasized')) {
      let typeSize = 'body-sm';

      if (this.hasDisplayValueContent) {
        if (!this.hasValue) {
          typeSize = 'accent-xl';
        }
      } else if (this.noFocusOrValue) {
        typeSize = 'accent-xl';
      }

      return typeSize;
    }

    if (this.layout === 'snowflake') {
      return this.hasValue || this.hasFocus || this.placeholderStr ? 'body-xs' : 'body-lg';
    }

    // classic layout (default)
    return ((!this.value || this.value.length === 0) && !this.placeholderStr && !this.hasFocus && !this.activeLabel) ? 'body-default' : 'body-xs';
  }

  /**
   * Gets the inner `<input>` element's font class for the current layout and state.
   * @private
   * @returns {string} - The font class for the inner `<input>` element.
   */
  get inputFontClass() {
    if (this.layout.startsWith('emphasized')) {
      let typeSize = 'accent-xl';

      if (this.hasDisplayValueContent) {
        if (!this.hasValue) {
          typeSize = 'body-sm';
        }
      } else if (this.noFocusOrValue) {
        typeSize = 'body-sm';
      }

      return typeSize;
    }

    if (this.layout === 'snowflake') {
      // same for both hidden and visible
      return 'body-lg';
    }

    // edge case for enabling visual overrides in datepicker
    if (this.layout === 'classic' && this.shape === 'snowflake') {
      return 'body-lg';
    }

    // classic layout (default) - same for both hidden and visible
    return 'body-default';
  }

  /**
   * Gets the label classes shared by all layouts.
   * @private
   * @returns {Record<string, boolean>}
   */
  get commonLabelClasses() {
    return {
      'is-disabled': this.disabled,
      'withValue': this.hasValue,
      'util_displayHiddenVisually': this.labelHidden || this.hideLabelVisually,
      [this.labelFontClass]: true,
    };
  }

  /**
   * Gets the inner `<input>` element classes shared by all layouts.
   * @private
   * @returns {Record<string, boolean>} - The class map for the inner `<input>` element.
   */
  get commonInputClasses() {
    return {
      'util_displayHiddenVisually': this.inputHidden,
      [this.inputFontClass]: true,
    };
  }

  /**
   * Gets the classes for the element that wraps the `displayValue` slot.
   * @private
   * @returns {Record<string, boolean>}
   */
  get commonDisplayValueWrapperClasses() {
    return {
      'displayValueWrapper': true,
      [this.inputFontClass]: true,
    };
  }

  /**
   * Gets the inner `<input>` element classes for the classic layout.
   * @private
   * @returns {object} - The class map for the inner `<input>` element.
   */
  get legacyInputClasses() {
    return {
      ...this.commonInputClasses
    };
  }

  /**
   * Gets the wrapper element classes shared by all layouts.
   * @private
   * @returns {object} - The class map for the wrapper element.
   */
  get commonWrapperClasses() {
    return {
      'wrapper': true,
      'simple': this.simple,
      'withValue': this.hasValue,
      'hasFocus': this.hasFocus,
      'activeLabel': this.activeLabel
    };
  }

  /**
   * Gets the help text wrapper classes, which indent the help text for pill shapes.
   * @private
   * @returns {object} - The class map for the help text wrapper.
   */
  get helpTextClasses() {
    return {
      'helpTextWrapper': true,
      'leftIndent': this.shape.toLowerCase().includes('pill') && !this.shape.toLowerCase().includes('right'),
      'rightIndent': this.shape.toLowerCase().includes('pill') && !this.shape.toLowerCase().includes('left')
    };
  };

  /**
   * Registers the element with the browser under a tag name.
   * @param {string} [name="auro-input"] - The tag name to register the element under.
   *
   * @example
   * AuroInput.register("custom-input") // registers the element as <custom-input>
   *
   */
  static register(name = "auro-input") {
    AuroLibraryRuntimeUtils.prototype.registerComponent(name, AuroInput);
  }

  /**
   * Called when the `displayValue` slot changes. Checks whether the slot has visible content
   * and updates `hasDisplayValueContent`.
   * @private
   * @returns {void}
   */
  checkDisplayValueSlotChange() {
    const slot = this.shadowRoot?.querySelector('slot[name="displayValue"]');
    if (!slot) {
      // Shadow slot not yet rendered — fall back to checking light-DOM
      // children so hasDisplayValueContent isn't stuck false when called
      // before firstUpdated (e.g. from auro-combobox during mount).
      // Check for any element (including custom elements like <auro-icon>
      // that render via shadow DOM with no text content).
      const lightDomNodes = Array.from(this.querySelectorAll('[slot="displayValue"]:not(slot)'));
      const hasContent = lightDomNodes.some((node) => (
        node.textContent.trim().length > 0 ||
        node.children.length > 0 ||
        node.shadowRoot !== null
      ));
      if (this.hasDisplayValueContent !== hasContent) {
        this.hasDisplayValueContent = hasContent;
        this.requestUpdate();
      }
      return;
    }
    const nodes = slot.assignedNodes({ flatten: true });

    // Check for actual visible content, not just node existence.
    // An empty <span slot="displayValue"></span> forwarded from the
    // consumer should not be treated as "has content" — it causes the
    // displayValue wrapper to render (with hasContent class) but show
    // nothing, blocking the combobox's synthetic displayValue from
    // being visible on preset/deeplink load.
    // Custom elements (e.g. <auro-icon>) that render via shadow DOM are
    // treated as content even when they have no text or light-DOM children.
    const hasContent = nodes.some((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent.trim().length > 0;
      }
      if (node.nodeType === Node.ELEMENT_NODE) {
        return node.textContent.trim().length > 0 ||
          node.children.length > 0 ||
          node.shadowRoot !== null;
      }
      return false;
    });
    if (this.hasDisplayValueContent !== hasContent) {
      this.hasDisplayValueContent = hasContent;
      this.requestUpdate();
    }
  }

  firstUpdated() {
    super.firstUpdated();


    this.clearBtn = this.clearButtonRef.value;

    // This must get moved into inputKeyboardStrategy when implemented
    if (this.clearBtn) {
      this.clearBtn.addEventListener('keydown', (evt) => {
        evt.stopPropagation();
      });

      this.clearBtn.addEventListener('click', (evt) => {
        evt.stopPropagation();
      });
    }
  }

  /**
   * Gets the built-in help text for the current `type`.
   * @private
   * @deprecated See https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1557296.
   * @returns {string} The built-in help text for `password`, `email`, `credit-card`, and `tel` types, or an empty string for other types.
   */
  getHelpText() {
    const typeHelpText = [
      'password',
      'email',
      'credit-card',
      'tel'
    ];

    if (typeHelpText.includes(this.type)) {
      return i18n(this.lang, this.type);
    }

    return '';
  }

  /**
   * Gets the `type` to put on the inner `<input>` element.
   * @private
   * @param {string} type - The `type` set on the component.
   * @returns {string} The given type when it's in `allowedInputTypes`, or `text` otherwise.
   */
  getInputType(type) {
    if (this.allowedInputTypes.includes(type)) {
      return type;
    }

    return "text";
  }

  /**
   * Called when the show/hide password button is clicked. Shows or hides the password
   * and moves focus back to the inner `<input>` element.
   * @private
   * @returns {void}
   */
  handleClickShowPassword() {
    this.showPassword = !this.showPassword;
    this.focus();
  }

  /**
   * Gets the `pattern` for the inner `<input>` element. For credit card numbers,
   * builds a length check from `minLength` and `maxLength` instead, unless `noValidate` is set.
   * @private
   * @returns {string}
   */
  definePattern() {
    if (this.type === 'credit-card' && !this.noValidate && this.maxLength) {
      // Variable-length brands (e.g. UnionPay) set minLength, so accept a range;
      // fixed-length brands leave minLength undefined and keep an exact length.
      const minPatternLength = this.minLength || this.maxLength;
      return `.{${minPatternLength},${this.maxLength}}`;
    }

    return this.pattern;
  }

  /**
   * Renders the error icon shown while the input is invalid.
   * @private
   * @returns {import("lit").TemplateResult} - The error icon template, which is empty while the input is valid.
   */
  renderValidationErrorIconHtml() {
    return html`
      ${this.validity && this.validity !== 'valid' ? html`
        <div class="notification alertNotification">
          <${this.iconTag}
            appearance="${this.onDark ? 'inverse' : this.appearance}"
            category="alert"
            name="error-stroke"
            variant="statusError">
          </${this.iconTag}>
        </div>
      ` : undefined}
    `;
  }

  /**
   * Renders the label, the inner `<input>` element, and the `displayValue` slot.
   * @private
   * @param {boolean} [useLegacyHiddenState=false] - If true, uses the classic layout's classes to hide the inner `<input>` element. If false, uses the classes shared by all layouts.
   * @returns {import("lit").TemplateResult} - The label, input, and display value template.
   */
  renderHtmlInput(useLegacyHiddenState = false) {
    const displayValueClasses = {
      'displayValue': true,
      'hasContent': this.hasDisplayValueContent,
      'hasFocus': this.hasFocus,
      'withValue': this.hasValue,
    };

    // Remove this when the classic layout is sunset.
    const inputOverrideClasses = useLegacyHiddenState
      ? this.legacyInputClasses
      : this.commonInputClasses;

    return html`
      <label for=${this.inputId} class="${classMap(this.commonLabelClasses)}" part="label">
        <slot name="label">
          ${this.label}
        </slot>
        ${this.required ? undefined : html`<slot name="optionalLabel"> (optional)</slot>`}
      </label>

      <!-- Attributes are grouped into: basic attributes, event handlers, ARIA attributes, and input-specific attributes -->
      <input
        @blur="${this.handleBlur}"
        @focusin="${this.handleFocusin}"
        @focusout="${this.handleFocusout}"
        @input="${this.handleInput}"
        .placeholder=${this.placeholderStr}
        .role=${this.a11yRole}
        ?disabled="${this.disabled}"
        ?required="${this.required}"
        aria-activedescendant=${ifDefined(this.a11yActivedescendant)}
        aria-controls=${ifDefined(this.a11yControls)}
        aria-describedby="${this.uniqueId}"
        aria-expanded=${ifDefined(this.a11yExpanded)}
        aria-invalid="${this.validity !== 'valid'}"
        autocomplete="${ifDefined(this.autocomplete ? this.autocomplete : undefined)}"
        autocapitalize="${ifDefined(this.autocapitalize ? this.autocapitalize : undefined)}"
        autocorrect="${ifDefined(this.autocorrect ? this.autocorrect : undefined)}"
        class="${classMap(inputOverrideClasses)}"
        id="${this.inputId}"
        inputmode="${ifDefined(this.inputmode ? this.inputmode : undefined)}"
        lang="${ifDefined(this.lang)}"
        maxlength="${ifDefined(this.maxLength ? this.maxLength : undefined)}"
        minlength="${ifDefined(this.minLength ? this.minLength : undefined)}"
        name="${ifDefined(this.name)}"
        part="input"
        pattern="${ifDefined(this.definePattern())}"
        spellcheck="${ifDefined(this.spellcheck ? this.spellcheck : undefined)}"
        type="${this.type === "password" && this.showPassword ? "text" : this.getInputType(this.type)}"
      />
      <div class="${classMap(displayValueClasses)}" aria-hidden="true" part="displayValue">
        <div class="${classMap(this.commonDisplayValueWrapperClasses)}">
          <slot name="displayValue" @slotchange=${this.checkDisplayValueSlotChange}></slot>
        </div>
      </div>
    `;
  }

  /**
   * Renders the button that clears the value.
   * @private
   * @returns {import("lit").TemplateResult} - The clear button template.
   */
  renderHtmlActionClear() {
    return html`
      <div class="${classMap(this.clearWrapperClassMap)}">
        <${this.buttonTag}
          @click="${this.handleClickClear}"
          appearance="${this.onDark ? 'inverse' : this.appearance}"
          class="${classMap(this.clearBtnClassMap)}"
          shape="circle"
          size="sm"
          variant="ghost"
          ${ref(this.clearButtonRef)}>
          <span><slot name="ariaLabel.clear">Clear Input</slot></span>
          <${this.iconTag}
            aria-hidden="true"
            ?customColor="${this.onDark || this.appearance === 'inverse'}"
            category="interface"
            name="x-lg"
            >
          </${this.iconTag}>
        </${this.buttonTag}>
      </div>
    `;
  }

  /**
   * Renders the button that shows or hides the password.
   * @private
   * @returns {import("lit").TemplateResult} - The show/hide password button template.
   */
  renderHtmlNotificationPassword() {
    return html`
      <div class="notification">
        <${this.buttonTag}
          @click="${this.handleClickShowPassword}"
          appearance="${this.onDark ? 'inverse' : this.appearance}"
          aria-pressed="${this.showPassword ? 'true' : 'false'}"
          class="notificationBtn passwordBtn"
          shape="circle"
          size="sm"
          variant="ghost">
            <span>
            ${this.showPassword ? html`<slot name="ariaLabel.password.hide">Hide Password</slot>`
              : html`<slot name="ariaLabel.password.show">Show Password</slot>`}
            </span>
          <${this.iconTag}
            ?customColor="${this.onDark || this.appearance === 'inverse'}"
            aria-hidden="true"
            ?hidden=${!this.showPassword}
            category="interface"
            name="hide-password-stroke">
          </${this.iconTag}>
          <${this.iconTag}
            ?customColor="${this.onDark || this.appearance === 'inverse'}"
            aria-hidden="true"
            ?hidden=${this.showPassword}
            category="interface"
            name="view-password-stroke">
          </${this.iconTag}>
        </${this.buttonTag}>
      </div>
    `;
  }

  /**
   * Renders the icon for the current `type`: a card icon for `credit-card` when `icon` is set,
   * or a calendar icon for `date`.
   * @private
   * @returns {import("lit").TemplateResult} - The type icon template.
   */
  renderHtmlTypeIcon() {
    return html`
      <div class="typeIcon">
        ${this.type === 'credit-card' ? this.processCreditCard() : undefined}

        <!-- The repeat() method is used below in order to force auro-icon to re-render when the name value is updated.
          This should be cleaned up when auro-icon issue #31 is resolved. -->
        ${this.inputIconName
        ? repeat([this.inputIconName], (val) => val, (name) => html`
          <${this.iconTag}
            appearance="${this.onDark ? 'inverse' : this.appearance}"
            category="payment"
            class="accentIcon"
            name="${name}"
            part="accentIcon"
            variant="${this.disabled ? 'disabled' : 'muted'}">
          </${this.iconTag}>
        `) : undefined
        }
        ${this.type === 'date'
        ? html`
          <${this.iconTag}
            appearance="${this.onDark ? 'inverse' : this.appearance}"
            category="interface"
            class="accentIcon"
            name="calendar"
            part="accentIcon"
            variant="${this.disabled ? 'disabled' : 'muted'}">
          </${this.iconTag}>`
        : undefined
        }
      </div>
    `;
  }

  /**
   * Renders the help text, or the error message while the input is invalid.
   * @private
   * @returns {import("lit").TemplateResult} - The help text template.
   */
  renderHtmlHelpText() {
    // Single `<p>` with stable identity across validity transitions —
    // previously two distinct templates (valid vs invalid) caused Lit to
    // replace the node entirely on a flip, and VoiceOver wouldn't
    // re-announce because the live-region element it was watching had been
    // removed and a new one inserted. Keeping one node means the `role`,
    // `aria-live`, and text content all change in-place, which AT does
    // observe and announce.
    const isError = this.validity && this.validity !== 'valid';
    return html`
      <${this.helpTextTag}
        appearance="${this.onDark ? 'inverse' : this.appearance}"
        ?error=${isError}>
        <p
          id="${this.uniqueId}"
          part="helpText"
          role="${ifDefined(isError ? 'alert' : undefined)}"
          aria-live="${ifDefined(isError ? 'assertive' : undefined)}">
          ${isError
        ? this.errorMessage
        : html`<slot name="helpText">${this.getHelpText()}</slot>`
      }
        </p>
      </${this.helpTextTag}>
    `;
  }

  /**
   * Renders the classic layout.
   * @private
   * @returns {import("lit").TemplateResult} - The classic layout template.
   */
  renderLayoutClassic() {
    const classicClassMap = {
      ...this.commonWrapperClasses,
      'thin': !this.simple
    };

    return html`
      <div
        @click="${this.handleClick}"
        class="${classMap(classicClassMap)}"
        part="wrapper">
        <div part="accent-left" class="accents left">
           ${this.renderHtmlTypeIcon()}
        </div>
        <div class="mainContent">
          ${this.renderHtmlInput(true)}
        </div>
        <div part="accent-right" class="accents right">
          ${this.renderValidationErrorIconHtml()}
          ${this.hasValue && this.type === 'password' ? this.renderHtmlNotificationPassword() : undefined}
          ${this.renderHtmlActionClear()}
        </div>
      </div>
      <div class="helpTextWrapper leftIndent rightIndent" part="inputHelpText">
        ${this.renderHtmlHelpText()}
      </div>
    `;
  }

  /**
   * Renders the emphasized layouts. Doesn't render the `type` icon.
   * @private
   * @returns {import("lit").TemplateResult} - The emphasized layout template.
   */
  renderLayoutEmphasized() {
    return html`
      <div
        @click="${this.handleClick}"
        class="${classMap(this.commonWrapperClasses)}"
        part="wrapper">
        <div class="accents left">
          ${this.layout.includes('left') ? html`
            ${this.renderValidationErrorIconHtml()}
          ` : undefined}
        </div>
        <div class="mainContent">
          ${this.renderHtmlInput()}
        </div>
        <div class="accents right">
          ${this.layout.includes('right') || this.layout === "emphasized" ? html`
            ${this.renderValidationErrorIconHtml()}
          ` : undefined}
          ${this.renderHtmlActionClear()}
        </div>
      </div>
      <div class="${classMap(this.helpTextClasses)}" part="inputHelpText">
        ${this.renderHtmlHelpText()}
      </div>
    `;
  }

  /**
   * Renders the snowflake layouts.
   * @private
   * @returns {import("lit").TemplateResult} - The snowflake layout template.
   */
  renderLayoutSnowflake() {
    return html`
      <div
        @click="${this.handleClick}"
        class="${classMap(this.commonWrapperClasses)}"
        part="wrapper">
        <div class="accents left">
           ${this.renderHtmlTypeIcon()}
        </div>
        <div class="mainContent">
          ${this.renderHtmlInput()}
        </div>
        <div class="accents right">
          ${this.renderValidationErrorIconHtml()}
          ${this.renderHtmlActionClear()}
        </div>
      </div>
      <div class="helpTextWrapper leftIndent rightIndent" part="inputHelpText">
        ${this.renderHtmlHelpText()}
      </div>
    `;
  }

  /**
   * Renders the template for the current `layout`.
   * @private
   * @param {string} [ForcedLayout] - The layout to render instead of `layout`.
   * @returns {import("lit").TemplateResult} - The layout template.
   */
  renderLayout(ForcedLayout) {
    const layout = ForcedLayout || this.layout;

    switch (layout) {
      case 'emphasized':
        return this.renderLayoutEmphasized();
      case 'emphasized-left':
        return this.renderLayoutEmphasized();
      case 'emphasized-right':
        return this.renderLayoutEmphasized();
      case 'snowflake':
        return this.renderLayoutSnowflake();
      case 'snowflake-left':
        return this.renderLayoutSnowflake();
      case 'snowflake-right':
        return this.renderLayoutSnowflake();
      default:
        return this.renderLayoutClassic();
    }
  }
}

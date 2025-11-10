// Copyright (c) 2025 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

/* eslint-disable
  lit-a11y/click-events-have-key-events,
  lit/binding-positions,
  lit/no-invalid-html,
  max-lines,
  no-extra-parens
  */

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
import BaseInput from './base-input.js';

import { AuroDependencyVersioning } from '@aurodesignsystem/auro-library/scripts/runtime/dependencyTagVersioning.mjs';
import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';

import { AuroIcon } from '@aurodesignsystem/auro-icon/class';
import iconVersion from './iconVersion.js';
import { AuroButton } from "@aurodesignsystem/auro-button/class";
import buttonVersion from './buttonVersion.js';

import { AuroHelpText } from '@aurodesignsystem/auro-helptext';
import formkitVersion from '@auro-formkit/version';

// build the component class
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
   * Determines if the HTML input element should be visually hidden.
   * Returns true when display value content exists without focus and has a value,
   * or when the input has no value, is not focused, and has no placeholder text.
   * @returns {boolean} - True if the input should be visually hidden, false otherwise.
   * @private
   */
  get inputHidden() {
    return (
      this.hasDisplayValueContent && !this.hasFocus && this.hasValue) ||
      (
        (!this.value || this.value.length === 0) &&
        !this.hasFocus &&
        (!this.placeholderStr || this.placeholderStr === '')
      );
  }

  /**
   * Determines if the input should display in a state with no focus or value indication.
   * Returns true when the input has display content without focus and has a value,
   * or when the input has no value and is not focused.
   * @returns {boolean} - True if the input should show no focus or value state, false otherwise.
   * @private
   */
  get noFocusOrValue() {
    return (this.hasDisplayValueContent && !this.hasFocus && this.hasValue) || ((!this.value || this.value.length === 0) && !this.hasFocus);
  }

  /**
   * Whether the label is being hidden currently based on state.
   * @returns {boolean} - Returns true if the label is hidden.
   * @private
   */
  get labelHidden() {
    return this.hasDisplayValueContent && !this.dvInputOnly && !this.hasFocus && this.hasValue;
  }

  /**
   * Returns the label font class based on layout and visibility state.
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
    return ((!this.value || this.value.length === 0) && !this.placeholderStr && !this.hasFocus) ? 'body-default' : 'body-xs';
  }

  /**
   * Returns the input font class based on layout and visibility state.
   * @private
   * @returns {string} - The font class for the input.
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
   * Returns classmap configuration for html5 input labels in all layouts.
   * @private
   * @returns {Record<string, boolean>}
   */
  get commonLabelClasses() {
    return {
      'is-disabled': this.disabled,
      'withValue': this.hasValue,
      'util_displayHiddenVisually': this.labelHidden,
      [this.labelFontClass]: true,
    };
  }

  /**
   * Returns classmap configuration for html5 inputs in all layouts.
   * @private
   * @returns {Record<string, boolean>} - Returns classmap.
   */
  get commonInputClasses() {
    return {
      'util_displayHiddenVisually': this.inputHidden,
      [this.inputFontClass]: true,
    };
  }

  get commonDisplayValueWrapperClasses() {
    return {
      'displayValueWrapper': true,
      [this.inputFontClass]: true,
    };
  }

  /**
   * Returns classmap configuration for html5 inputs in each layout.
   * @private
   * @returns {object} - Returns classmap.
   */
  get legacyInputClasses() {
    return {
      ...this.commonInputClasses
    };
  }

  /**
   * Returns classmap configuration for wrapper elements in each layout.
   * @private
   * @returns {object} - Returns classmap.
   */
  get commonWrapperClasses() {
    return {
      'wrapper': true,
      'simple': this.simple,
      'withValue': this.hasValue,
      'hasFocus': this.hasFocus
    };
  }

  /**
   * Returns classmap configuration for helpText elements in each layout.
   * @private
   * @returns {object} - Returns classmap.
   */
  get helpTextClasses() {
    return {
      'helpTextWrapper': true,
      'leftIndent': this.shape.toLowerCase().includes('pill') && !this.shape.toLowerCase().includes('right'),
      'rightIndent': this.shape.toLowerCase().includes('pill') && !this.shape.toLowerCase().includes('left')
    };
  };

  /**
   * This will register this element with the browser.
   * @param {string} [name="auro-input"] - The name of element that you want to register to.
   *
   * @example
   * AuroInput.register("custom-input") // this will register this element to <custom-input/>
   *
   */
  static register(name = "auro-input") {
    AuroLibraryRuntimeUtils.prototype.registerComponent(name, AuroInput);
  }

  /**
   * Function to determine if the input is meant to render an icon visualizing the input type.
   * @private
   * @returns {boolean} - Returns true if the input type is meant to render an icon.
   */
  hasTypeIcon() {
    if (this.icon || this.type === 'date') {
      return true;
    }

    return false;
  }

  /**
   * Function to determine if there is any displayValue content to render.
   * @private
   * @returns {void}
   */
  checkDisplayValueSlotChange() {
    let nodes = this.shadowRoot.querySelector('slot[name="displayValue"]').assignedNodes();

    // Handle when DisplayValue is multi-level slot content (e.g. combobox passing displayValue to input)
    if (nodes && nodes[0] && nodes[0].tagName === 'SLOT') {
      nodes = nodes[0].assignedNodes();
    }

    let hasContent = false;

    if (nodes.length > 0) {
      hasContent = true;
    }

    this.hasDisplayValueContent = hasContent;
  }

  /**
   * Returns HTML for the validation error icon.
   * @private
   * @returns {html} - Returns HTML for the validation error icon.
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
   * Returns HTML for the HTML5 input element.
   * @private
   * @param {boolean} [useLegacyHiddenState=false] - If true, the input will be visually hidden when not focused and has no value.
   * @returns {html} - Returns HTML for the HTML5 input element.
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
        ?activeLabel="${this.activeLabel}"
        ?disabled="${this.disabled}"
        ?required="${this.required}"
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
   * Returns HTML for the clear action button.
   * @private
   * @returns {html} - Returns HTML for the clear action button.
   */
  renderHtmlActionClear() {
    return html`
      <div class="notification clear">
        <${this.buttonTag}
          @click="${this.handleClickClear}"
          appearance="${this.onDark ? 'inverse' : this.appearance}"
          class="notificationBtn clearBtn"
          shape="circle"
          size="sm"
          variant="ghost">
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
   * Returns HTML for the show password button.
   * @private
   * @returns {html} - Returns HTML for the show password button.
   */
  renderHtmlNotificationPassword() {
    return html`
      <div class="notification">
        <${this.buttonTag}
          @click="${this.handleClickShowPassword}"
          appearance="${this.onDark ? 'inverse' : this.appearance}"
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
   * Returns HTML for the input type icon.
   * @private
   * @returns {html} - Returns HTML for the input type icon.
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
   * Returns HTML for the help text and error message.
   * @private
   * @returns {html} - Returns HTML for the help text and error message.
   */
  renderHtmlHelpText() {
    return html`
      ${!this.validity || this.validity === undefined || this.validity === 'valid'
        ? html`
          <${this.helpTextTag}
            appearance="${this.onDark ? 'inverse' : this.appearance}">
            <p id="${this.uniqueId}" part="helpText">
              <slot name="helpText">${this.getHelpText()}</slot>
            </p>
          </${this.helpTextTag}>
        `
        : html`
          <${this.helpTextTag} error
            appearance="${this.onDark ? 'inverse' : this.appearance}">
            <p id="${this.uniqueId}" role="alert" aria-live="assertive" part="helpText">
              ${this.errorMessage}
            </p>
          </${this.helpTextTag}>
        `
      }
    `;
  }

  /**
   * Returns HTML for the classic layout.
   * @private
   * @returns {import("lit").TemplateResult} - Returns HTML for the classic layout.
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
          ${this.hasValue ? html`
            ${!this.disabled && !this.readonly ? html`
              ${this.renderHtmlActionClear()}
            ` : undefined}
          ` : undefined}
        </div>
      </div>
      <div class="helpTextWrapper leftIndent rightIndent" part="inputHelpText">
        ${this.renderHtmlHelpText()}
      </div>
    `;
  }

  /**
   * Returns HTML for the emphasized layout. Does not support type="*".
   * @private
   * @returns {html} - Returns HTML for the emphasized layout.
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
          ${this.hasValue ? html`
            ${!this.disabled && !this.readonly ? html`
              ${this.renderHtmlActionClear()}
            ` : undefined}
          ` : undefined}
        </div>
      </div>
      <div class="${classMap(this.helpTextClasses)}" part="inputHelpText">
        ${this.renderHtmlHelpText()}
      </div>
    `;
  }

  /**
   * Returns HTML for the emphasized layout. Does not support type="*".
   * @private
   * @returns {html} - Returns HTML for the emphasized layout.
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
          ${this.hasValue ? html`
            ${!this.disabled && !this.readonly ? html`
              ${this.renderHtmlActionClear()}
            ` : undefined}
          ` : undefined}
        </div>
      </div>
      <div class="helpTextWrapper leftIndent rightIndent" part="inputHelpText">
        ${this.renderHtmlHelpText()}
      </div>
    `;
  }

  /**
   * Logic to determine the layout of the component.
   * @private
   * @param {string} [ForcedLayout] - Used to force a specific layout, pass in the layout name to use.
   * @returns {void}
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

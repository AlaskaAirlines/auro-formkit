// Copyright (c) 2025 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

/* eslint-disable complexity, lit/binding-positions, lit/no-invalid-html, max-lines */

import shapeSizeCss from "./styles/shapeSize-css.js";
import styleCss from "./styles/default/style-css.js";
import colorCss from "./styles/default/color-css.js";
import tokensCss from "./styles/default/tokens-css.js";

import emphasizedStyleCss from "./styles/emphasized/style-css.js";
import emphasizedColorCss from "./styles/emphasized/color-css.js";

import { css } from "lit";
import { html } from 'lit/static-html.js';
import { repeat } from 'lit/directives/repeat.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import i18n from './i18n.js';
import BaseInput from './base-input.js';

import { AuroDependencyVersioning } from '@aurodesignsystem/auro-library/scripts/runtime/dependencyTagVersioning.mjs';
import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';

import { AuroIcon } from '@aurodesignsystem/auro-icon/src/auro-icon.js';
import iconVersion from './iconVersion.js';
import { AuroButton } from '@aurodesignsystem/auro-button/src/auro-button.js';
import buttonVersion from './buttonVersion.js';

import { AuroHelpText } from '@aurodesignsystem/auro-helptext';
import helpTextVersion from './helptextVersion.js';

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
    this.helpTextTag = versioning.generateTag('auro-formkit-input-helptext', helpTextVersion, AuroHelpText);

    /**
     * @private
     */
    this.iconTag = versioning.generateTag('auro-formkit-input-icon', iconVersion, AuroIcon);
  }

  static get styles() {
    return [
      css`${shapeSizeCss}`,
      css`${colorCss}`,
      css`${styleCss}`,
      css`${tokensCss}`,
      css`${emphasizedStyleCss}`,
      css`${emphasizedColorCss}`
    ];
  }

  get commonLabelClasses() {
    return {
      'withValue': this.value && this.value.length > 0
    };
  }

  get commonWrapperClasses() {
    return {
      'wrapper': true,
      'withValue': this.value && this.value.length > 0,
      'hasFocus': this.hasFocus
    };
  }

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
    const nodes = this.shadowRoot.querySelector('slot[name="displayValue"]').assignedNodes();

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
  getValidationErrorIconHtml() {
    return html`
      ${this.validity && this.validity !== 'valid' ? html`
        <div class="notification alertNotification">
          <${this.iconTag}
            category="alert"
            name="error-stroke"
            variant="statusError"
          >
          </${this.iconTag}>
        </div>
      ` : undefined}
    `;
  }

  /**
   * Returns HTML for the HTML5 input element.
   * @private
   * @returns {html} - Returns HTML for the HTML5 input element.
   */
  getHtmlInput() {
    const displayValueClasses = {
      'displayValue': true,
      'hasContent': this.hasDisplayValueContent,
      'hasFocus': this.hasFocus,
      'withValue': this.value && this.value.length > 0
    };

    return html`
      <label for=${this.id} class="${classMap(this.commonLabelClasses)}" part="label">
        <slot name="label">
          ${this.label}
        </slot>
      </label>
      <input
        @blur="${this.handleBlur}"
        @focusin="${this.handleFocusin}"
        @focusout="${this.handleFocusout}"
        @input="${this.handleInput}"
        ?activeLabel="${this.activeLabel}"
        ?disabled="${this.disabled}"
        ?required="${this.required}"
        .placeholder=${this.placeholderStr}
        aria-describedby="${this.uniqueId}"
        aria-invalid="${this.validity !== 'valid'}"
        autocapitalize="${ifDefined(this.autocapitalize ? this.autocapitalize : undefined)}"
        autocomplete="${ifDefined(this.autocomplete ? this.autocomplete : undefined)}"
        autocorrect="${ifDefined(this.autocorrect ? this.autocorrect : undefined)}"
        name="${ifDefined(this.name)}"
        id="${this.id}"
        inputMode="${ifDefined(this.inputMode ? this.inputMode : undefined)}"
        lang="${ifDefined(this.lang)}"
        maxlength="${ifDefined(this.maxLength ? this.maxLength : undefined)}"
        minlength="${ifDefined(this.minLength ? this.minLength : undefined)}"
        part="input"
        pattern="${ifDefined(this.definePattern())}"
        spellcheck="${ifDefined(this.spellcheck ? this.spellcheck : undefined)}"
        type="${this.type === 'password' && this.showPassword ? 'text' : this.getInputType(this.type)}" />
      <div class="${classMap(displayValueClasses)}" aria-hidden="true" part="displayValue">
        <slot name="displayValue" @slotchange=${this.checkDisplayValueSlotChange}></slot>
      </div>
    `;
  }

  /**
   * Returns HTML for the clear action button.
   * @private
   * @returns {html} - Returns HTML for the clear action button.
   */
  getHtmlActionClear() {
    return html`
      <div class="notification clear">
        <${this.buttonTag}
          @click="${this.handleClickClear}"
          ?onDark="${this.onDark}"
          aria-label="${i18n(this.lang, 'clearInput')}"
          class="notificationBtn clearBtn"
          tabindex="-1"
          variant="flat">
          <${this.iconTag}
            category="interface"
            customColor
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
  getHtmlNotificationPassword() {
    return html`
      <div class="notification">
        <${this.buttonTag}
          @click="${this.handleClickShowPassword}
          ?onDark="${this.onDark}"
          aria-hidden="true"
          class="notificationBtn passwordBtn"
          tabindex="-1"
          variant="flat">
          <${this.iconTag}
            ?hidden=${!this.showPassword}
            category="interface"
            customColor
            name="hide-password-stroke">
          </${this.iconTag}>
          <${this.iconTag}
            ?hidden=${this.showPassword}
            category="interface"
            customColor
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
  getHtmlTypeIcon() {
    return html`
      <div class="typeIcon">
        ${this.type === 'credit-card' ? this.processCreditCard() : undefined}

        <!-- The repeat() method is used below in order to force auro-icon to re-render when the name value is updated.
          This should be cleaned up when auro-icon issue #31 is resolved. -->
        ${this.inputIconName
        ? repeat([this.inputIconName], (val) => val, (name) => html`
          <${this.iconTag}
            ?onDark="${this.onDark}"
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
            ?onDark="${this.onDark}"
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
  getHtmlHelpText() {
    return html`
      ${!this.validity || this.validity === undefined || this.validity === 'valid'
        ? html`
          <${this.helpTextTag} ?onDark="${this.onDark}">
            <p id="${this.uniqueId}" part="helpText">
              <slot name="helptext">${this.getHelpText()}</slot>
            </p>
          </${this.helpTextTag}>
        `
        : html`
          <${this.helpTextTag} error ?onDark="${this.onDark}">
            <p id="${this.uniqueId}" role="alert" aria-live="assertive" part="helpText">
              ${this.errorMessage}
            </p>
          </${this.helpTextTag}>
        `
      }
    `;
  }

  /**
   * Returns HTML for the default layout.
   * @private
   * @returns {html} - Returns HTML for the default layout.
   */
  getLayoutClassic() {
    const wrapperClasses = {
      'layoutDefault': true
    };

    // is-disabled class - THIS IS ONLY HERE TO MAKE A TEST PASS AS FAR AS I CAN TELL
    const labelClasses = {
      'is-disabled': this.disabled,
      'withIcon': this.hasTypeIcon(),
      'withValue': this.value && this.value.length > 0
    };

    return html`
      <div class="${classMap(wrapperClasses)}" part="wrapper">
        <div class="main">
          <div class="typeIcon">
            ${this.type === 'credit-card' ? this.processCreditCard() : undefined}

            <!-- The repeat() method is used below in order to force auro-icon to re-render when the name value is updated.
              This should be cleaned up when auro-icon issue #31 is resolved. -->
            ${this.inputIconName
            ? repeat([this.inputIconName], (val) => val, (name) => html`
              <${this.iconTag}
                class="accentIcon"
                category="payment"
                name="${name}"
                part="accentIcon"
                ?onDark="${this.onDark}"
                variant="${this.disabled ? 'disabled' : 'muted'}">
              </${this.iconTag}>
            `) : undefined
            }

            ${this.type === 'date'
            ? html`
              <${this.iconTag}
                class="accentIcon"
                category="interface"
                name="calendar"
                part="accentIcon"
                ?onDark="${this.onDark}"
                variant="${this.disabled ? 'disabled' : 'muted'}">
              </${this.iconTag}>`
            : undefined
            }
          </div>
          <label for=${this.id} class="${classMap(labelClasses)}" part="label">
            <slot name="label">
              ${this.label}
            </slot>
            ${this.required ? '' : ` (${i18n(this.lang, 'optional')})`}
          </label>

          ${this.getHtmlInput()}
        </div>
        <div
          class="notificationIcons"
          part="notificationIcons"
          ?hasValue="${this.hasValue}">
          ${this.validity && this.validity !== 'valid' ? html`
            <div class="notification alertNotification">
              <${this.iconTag}
                category="alert"
                customColor
                name="error-stroke"
              </${this.iconTag}>
            </div>
          ` : undefined}
          ${this.hasValue ? html`
            ${this.type === 'password' ? html`
              <div class="notification">
                <${this.buttonTag}
                  @click="${this.handleClickShowPassword}"
                  ?onDark="${this.onDark}"
                  aria-hidden="true"
                  class="notificationBtn passwordBtn"
                  tabindex="-1"
                  variant="flat">
                  <${this.iconTag}
                    ?hidden=${!this.showPassword}
                    category="interface"
                    customColor
                    name="hide-password-stroke">
                  </${this.iconTag}>
                  <${this.iconTag}
                    ?hidden=${this.showPassword}
                    category="interface"
                    customColor
                    name="view-password-stroke">
                  </${this.iconTag}>
                </${this.buttonTag}>
              </div>
            ` : undefined}
            ${!this.disabled && !this.readonly ? html`
              <div class="notification">
                <${this.buttonTag}
                  @click="${this.handleClickClear}"
                  ?onDark="${this.onDark}"
                  aria-label="${i18n(this.lang, 'clearInput')}"
                  class="notificationBtn clearBtn"
                  variant="flat">
                  <${this.iconTag}
                    category="interface"
                    customColor
                    name="x-lg">
                  </${this.iconTag}>
                </${this.buttonTag}>
              </div>
            ` : undefined}
          ` : undefined}
        </div>
      </div>
      <!-- Help text and error message template -->
      ${!this.validity || this.validity === undefined || this.validity === 'valid'
      ? html`
        <${this.helpTextTag} ?onDark="${this.onDark}">
          <p id="${this.uniqueId}" part="helpText">
            <slot name="helptext">${this.getHelpText()}</slot>
          </p>
        </${this.helpTextTag}>
      `
      : html`
        <${this.helpTextTag} error ?onDark="${this.onDark}">
          <p id="${this.uniqueId}" role="alert" aria-live="assertive" part="helpText">
            ${this.errorMessage}
          </p>
        </${this.helpTextTag}>
      `
      }
    `;
  }

  /**
   * Returns HTML for the emphasized layout. Does not support type="*".
   * @private
   * @returns {html} - Returns HTML for the emphasized layout.
   */
  getLayoutEmphasized() {
    return html`
      <div class="${classMap(this.commonWrapperClasses)}" part="wrapper">
        <div class="accents left">
          ${this.layout.includes('left') ? html`
            ${this.getValidationErrorIconHtml()}
          ` : undefined}
        </div>
        <div class="mainContent">
          ${this.getHtmlInput()}
        </div>
        <div class="accents right">
          ${this.layout.includes('right') || this.layout === "emphasized" ? html`
            ${this.getValidationErrorIconHtml()}
          ` : undefined}
          ${this.hasValue ? html`
            ${!this.disabled && !this.readonly ? html`
              ${this.getHtmlActionClear()}
            ` : undefined}
          ` : undefined}
        </div>
      </div>
      <div class="${classMap(this.helpTextClasses)}" part="inputHelpText">
        ${this.getHtmlHelpText()}
      </div>
    `;
  }

  /**
   * Logic to determine the layout of the component.
   * @private
   * @param {string} [ForcedLayout] - Used to force a specific layout, pass in the layout name to use.
   * @returns {void}
   */
  getLayout(ForcedLayout) {
    const layout = ForcedLayout || this.layout;

    switch (layout) {
      case 'emphasized':
        return this.getLayoutEmphasized();
      case 'emphasized-left':
        return this.getLayoutEmphasized();
      case 'emphasized-right':
        return this.getLayoutEmphasized();
      default:
        return this.getLayoutClassic();
    }
  }
}

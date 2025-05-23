// Copyright (c) 2025 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

/* eslint-disable complexity, lit/binding-positions, lit/no-invalid-html */

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
    this.iconTag = versioning.generateTag('auro-formkit-input-icon', iconVersion, AuroIcon);

    /**
     * @private
     */
    this.buttonTag = versioning.generateTag('auro-formkit-input-button', buttonVersion, AuroButton);

    /**
     * @private
     */
    this.helpTextTag = versioning.generateTag('auro-formkit-input-helptext', helpTextVersion, AuroHelpText);
  }

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

  // function that renders the HTML and CSS into  the scope of the component
  render() {
    // is-disabled class - THIS IS ONLY HERE TO MAKE A TEST PASS AS FAR AS I CAN TELL
    const labelClasses = {
      'is-disabled': this.disabled,
      'withIcon': this.hasTypeIcon(),
      'withValue': this.value && this.value.length > 0
    };

    return html`
      <div class="wrapper" part="wrapper">
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
          <label for=${this.inputId} class="${classMap(labelClasses)}" part="label">
            <slot name="label">
              ${this.label}
            </slot>
            ${this.required ? '' : ` (${i18n(this.lang, 'optional')})`}
          </label>
          <input
            @input="${this.handleInput}"
            @focusin="${this.handleFocusin}"
            @blur="${this.handleBlur}"
            id="${this.inputId}"
            name="${ifDefined(this.name)}"
            type="${this.type === 'password' && this.showPassword ? 'text' : this.getInputType(this.type)}"
            pattern="${ifDefined(this.definePattern())}"
            maxlength="${ifDefined(this.maxLength ? this.maxLength : undefined)}"
            minlength="${ifDefined(this.minLength ? this.minLength : undefined)}"
            inputMode="${ifDefined(this.inputmode ? this.inputmode : undefined)}"
            ?required="${this.required}"
            ?disabled="${this.disabled}"
            aria-describedby="${this.uniqueId}"
            ?aria-invalid="${this.validity !== 'valid'}"
            placeholder=${this.getPlaceholder()}
            lang="${ifDefined(this.lang)}"
            ?activeLabel="${this.activeLabel}"
            spellcheck="${ifDefined(this.spellcheck ? this.spellcheck : undefined)}"
            autocorrect="${ifDefined(this.autocorrect ? this.autocorrect : undefined)}"
            autocapitalize="${ifDefined(this.autocapitalize ? this.autocapitalize : undefined)}"
            autocomplete="${ifDefined(this.autocomplete ? this.autocomplete : undefined)}"
            part="input"
            role="${ifDefined(this.a11yRole)}"
            aria-expanded="${ifDefined(this.a11yExpanded)}"
            aria-controls="${ifDefined(this.a11yControls)}"
          />
        </div>
        <div
          class="notificationIcons"
          part="notificationIcons"
          ?hasValue="${this.hasValue}">
          ${this.validity && this.validity !== 'valid' ? html`
            <div class="notification alertNotification">
              <${this.iconTag}
                category="alert"
                name="error-stroke"
                customColor
              </${this.iconTag}>
            </div>
          ` : undefined}
          ${this.hasValue ? html`
            ${this.type === 'password' ? html`
              <div class="notification">
                <${this.buttonTag}
                  variant="flat"
                  ?onDark="${this.onDark}"
                  aria-hidden="true"
                  tabindex="-1"
                  @click="${this.handleClickShowPassword}"
                  class="notificationBtn passwordBtn">
                  <${this.iconTag}
                    category="interface"
                    name="hide-password-stroke"
                    customColor
                    ?hidden=${!this.showPassword}>
                  </${this.iconTag}>
                  <${this.iconTag}
                    category="interface"
                    name="view-password-stroke"
                    customColor
                    ?hidden=${this.showPassword}>
                  </${this.iconTag}>
                </${this.buttonTag}>
              </div>
            ` : undefined}
            ${!this.disabled && !this.readonly ? html`
              <div class="notification">
                <${this.buttonTag}
                  variant="flat"
                  ?onDark="${this.onDark}"
                  class="notificationBtn clearBtn"
                  arialabel="${i18n(this.lang, 'clearInput')}"
                  @click="${this.handleClickClear}">
                  <${this.iconTag}
                    customColor
                    category="interface"
                    name="x-lg"
                    >
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
}

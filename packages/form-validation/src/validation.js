// Copyright (c) Alaska Air. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

/* eslint-disable complexity, max-depth, no-extra-parens, no-magic-numbers, line-comment-position, no-inline-comments, prefer-destructuring */
import { validDateStr, toNorthAmericanFormat, dateAndFormatMatch } from '@aurodesignsystem/auro-library/scripts/runtime/dateUtilities';
import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';

export default class AuroFormValidation {

  constructor() {
    this.runtimeUtils = new AuroLibraryRuntimeUtils();
  }

  /**
   * Resets the element to its initial state.
   * @private
   * @param {object} elem - HTML element to reset.
   * @returns {void}
   */
  reset(elem) {
    elem.validity = undefined;
    elem.value = undefined;
    elem.touched = false;

    // Resets the second value of the datepicker in range state
    if (elem.valueEnd) {
      elem.valueEnd = undefined;
    }

    // Resets selected option of element
    if (elem.optionSelected) {
      elem.optionSelected = undefined;
    }

    // Runs validation to handle error attribute
    this.validate(elem);
  }

  /**
   * Validates the attributes of a given element based on predefined validation rules.
   *
   * @param {HTMLElement} elem - The element to be validated.
   * @returns {void}
   *
   * @example
   * // Assuming `inputElement` is a reference to an input element in the DOM
   * validateElementAttributes(inputElement);
   *
   * The function checks the element's attributes against the validation rules defined for 'input' and 'counter' types.
   * If a validation rule is violated, it sets the element's validity state and error message accordingly.
   *
   * Validation rules:
   * - input:
   *   - length:
   *     - tooShort: Checks if the value length is less than the minimum length.
   *     - tooLong: Checks if the value length exceeds the maximum length.
   *   - pattern:
   *     - patternMismatch: Checks if the value does not match the specified pattern.
   * - counter:
   *   - range:
   *     - rangeOverflow: Checks if the value exceeds the maximum value.
   *     - rangeUnderflow: Checks if the value is less than the minimum value.
   */
  validateElementAttributes(elem) {
    const validationRules = {
      input: {
        length: [
          {
            check: (e) => e.value?.length > 0 && e.value?.length < e.minLength,
            validity: 'tooShort',
            message: e => e.getAttribute('setCustomValidityTooShort') || e.setCustomValidity || ''
          },
          {
            check: (e) => e.value?.length > e.maxLength,
            validity: 'tooLong',
            message: e => e.getAttribute('setCustomValidityTooLong') || e.setCustomValidity || ''
          }
        ],
        pattern: [
          {
            check: (e) => e.pattern && !new RegExp(`^${e.pattern}$`, 'u').test(e.value),
            validity: 'patternMismatch',
            message: e => e.getAttribute('setCustomValidityPatternMismatch') || e.setCustomValidity || ''
          }
        ]
      },
      counter: {
        range: [
          {
            check: (e) => e.max !== undefined && Number(e.max) < Number(e.value),
            validity: 'rangeOverflow',
            message: e => e.getAttribute('setCustomValidityRangeOverflow') || ''
          },
          {
            check: (e) => e.min !== undefined && Number(e.min) > Number(e.value),
            validity: 'rangeUnderflow',
            message: e => e.getAttribute('setCustomValidityRangeUnderflow') || ''
          }
        ]
      }
    };

    let elementType;
    if (this.runtimeUtils.elementMatch(elem, 'auro-input')) {
      elementType = 'input';
    } else if (this.runtimeUtils.elementMatch(elem, 'auro-counter') || this.runtimeUtils.elementMatch(elem, 'auro-counter-group')) {
      elementType = 'counter';
    }

    if (elementType) {
      const rules = validationRules[elementType];

      if (rules) {
        Object.values(rules).flat().forEach(rule => {
          if (rule.check(elem)) {
            elem.validity = rule.validity;
            elem.errorMessage = rule.message(elem);
          }
        });
      }
    }
  }

  /**
   * Determines the validity state of the element based on the type attribute.
   * @private
   * @param {object} elem - HTML element to validate.
   * @returns {void}
   */
  validateType(elem) {
    if (elem.hasAttribute('type')) {
      if (elem.type === 'email') {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; // eslint-disable-line require-unicode-regexp

        if (!elem.value.match(emailRegex)) {
          elem.validity = 'patternMismatch';
          elem.errorMessage = elem.setCustomValidityForType || elem.setCustomValidity || '';
          return;
        }
      } else if (elem.type === 'credit-card') {
        if (elem.value.length > 0 && elem.value.length < elem.validationCCLength) {
          elem.validity = 'tooShort';
          elem.errorMessage = elem.setCustomValidityForType || elem.setCustomValidity || '';
          return;
        }
      } else if (elem.type === 'number') {
        if (elem.max !== undefined && Number(elem.max) < Number(elem.value)) {
          elem.validity = 'rangeOverflow';
          elem.errorMessage = elem.setCustomValidityRangeOverflow || elem.setCustomValidity || '';
          return;
        }

        if (elem.min !== undefined && elem.value?.length > 0 && Number(elem.min) > Number(elem.value)) {
          elem.validity = 'rangeUnderflow';
          elem.errorMessage = elem.setCustomValidityRangeUnderflow || elem.setCustomValidity || '';
          return;
        }
      } else if (elem.type === 'date' && elem.value?.length > 0) {

        // Guard Clause: if the value is too short
        if (elem.value?.length < elem.lengthForType) {
          
          elem.validity = 'tooShort';
          elem.errorMessage = elem.setCustomValidityForType || elem.setCustomValidity || '';
          return;
        } 
        
        // Guard Clause: If the value is too long for the type
        if (elem.value?.length > elem.lengthForType) {

          elem.validity = 'tooLong';
          elem.errorMessage = elem.setCustomValidityForType || elem.setCustomValidity || '';
          return;
        }
        
        // Validate that the date passed was the correct format
        if (!dateAndFormatMatch(elem.value, elem.format)) {
          elem.validity = 'patternMismatch';
          elem.errorMessage = elem.setCustomValidityForType || elem.setCustomValidity || 'Invalid Date Format Entered';
          return;
        }
        
        // Validate that the date passed was a valid date
        if (!validDateStr(elem.value, elem.format)) {
          elem.validity = 'invalidDate';
          elem.errorMessage = elem.setCustomValidityInvalidDate || elem.setCustomValidity || 'Invalid Date Entered';
          return;
        }

        // Perform the rest of the validation
        const formattedValue = toNorthAmericanFormat(elem.value, elem.format);
        const valueDate = new Date(formattedValue);

        // // Validate max date
        if (elem.max?.length === elem.lengthForType) {

          const maxDate = new Date(toNorthAmericanFormat(elem.max, elem.format));

          if (valueDate > maxDate) {
            elem.validity = 'rangeOverflow';
            elem.errorMessage = elem.setCustomValidityRangeOverflow || elem.setCustomValidity || '';
            return;
          }
        }

        // Validate min date
        if (elem.min?.length === elem.lengthForType) {
          const minDate = new Date(toNorthAmericanFormat(elem.min, elem.format));

          if (valueDate < minDate) {
            elem.validity = 'rangeUnderflow';
            elem.errorMessage = elem.setCustomValidityRangeUnderflow || elem.setCustomValidity || '';
            return;
          }
        }
      }
    }
  }

  /**
   * Determines the validity state of the element.
   * @param {object} elem - HTML element to validate.
   * @param {boolean} force - Boolean that forces validation to run.
   * @returns {void}
   */
  validate(elem, force) {
    this.getInputElements(elem);
    this.getAuroInputs(elem);

    // Check if validation should run
    let validationShouldRun =

      // If the validation was forced
      force ||

      // If the validation should run on input
      elem.validateOnInput ||

      // State-based checks
      (
        // Element is not currently focused
        !elem.contains(document.activeElement) && // native input is not focused directly
        !document.activeElement.shadowRoot?.contains(elem) && // native input is not focused in the shadow DOM of another component

        // And element has been touched or is untouched but has a value
        ( elem.touched || (!elem.touched && typeof elem.value !== "undefined") )
      );

    if (elem.hasAttribute('error')) {
      elem.validity = 'customError';
      elem.errorMessage = elem.setCustomValidityCustomError || elem.error || elem.setCustomValidity || '';
      validationShouldRun = false;
    } else if (validationShouldRun) {
      elem.validity = 'valid';
      elem.errorMessage = '';

      /**
       * Only validate once we interact with the datepicker
       * elem.value === undefined is the initial state pre-interaction.
       *
       * The validityState definitions are located at https://developer.mozilla.org/en-US/docs/Web/API/ValidityState.
       */

      let hasValue = false;

      // Check string for having a value
      if (typeof elem.value === "string") {
        hasValue = elem.value && elem.value.length > 0;
      }

      // Check array value types for having a value
      if (Array.isArray(elem.value)) {
        hasValue = Boolean(
          elem.value.length > 0 &&
          elem.value.some((value) => typeof value === "string" && value.length > 0)
        )
      }

      // If there is a second input in the elem and that value is undefined or an empty string set hasValue to false;
      if (this.auroInputElements?.length === 2) {
        if (!this.auroInputElements[1].value || this.auroInputElements[1].length === 0) {
          hasValue = false;
        }
      }

      if (!hasValue && elem.required && elem.touched) {
        elem.validity = 'valueMissing';
        elem.errorMessage = elem.setCustomValidityValueMissing || elem.setCustomValidity || '';
      } else if (hasValue && this.runtimeUtils.elementMatch(elem, 'auro-input')) {
        this.validateType(elem);
        this.validateElementAttributes(elem);
      } else if (hasValue && (this.runtimeUtils.elementMatch(elem, 'auro-counter') || this.runtimeUtils.elementMatch(elem, 'auro-counter-group'))) {
        this.validateElementAttributes(elem);
      }
    }

    if (this.auroInputElements?.length > 0 && elem.validity !== "valueMissing") {
      elem.validity = this.auroInputElements[0].validity;
      elem.errorMessage = this.auroInputElements[0].errorMessage;

      // multiple input in one components (datepicker)
      // combobox has 2 inputs but no need to check validity on the 2nd one which is in fullscreen bib. 
      if (elem.validity === 'valid' && this.auroInputElements.length > 1 && !this.runtimeUtils.elementMatch(elem, 'auro-combobox')) {
        elem.validity = this.auroInputElements[1].validity;
        elem.errorMessage = this.auroInputElements[1].errorMessage;
      }
    }

    if (validationShouldRun || elem.hasAttribute('error')) {
      // Use the validity message override if it is declared
      if (elem.validity && elem.validity !== 'valid' && elem.ValidityMessageOverride) {
        elem.errorMessage = elem.ValidityMessageOverride;
      }

      this.getErrorMessage(elem);
    }

    elem.dispatchEvent(new CustomEvent('auroFormElement-validated', {
      bubbles: true,
      composed: true,
      detail: {
        validity: elem.validity,
        message: elem.errorMessage
      }
    }));
  }

  /**
   * Gets all the HTML5 `inputs` in the element shadow DOM.
   * @private
   * @param {object} elem - HTML element to validate.
   * @returns {void}
   */
  getInputElements(elem) {
    this.inputElements = elem.renderRoot.querySelectorAll('input');
  }

  /**
   * Gets all the `auro-inputs` in the element shadow DOM.
   * @private
   * @param {object} elem - HTML element to validate.
   * @returns {void}
   */
  getAuroInputs(elem) {
    this.auroInputElements = elem.shadowRoot.querySelectorAll('auro-input, [auro-input]');
  }

  /**
   * Return appropriate error message.
   * @private
   * @param {object} elem - HTML element to validate.
   * @returns {void}
   */
  getErrorMessage(elem) {
    if (elem.validity !== 'valid') {
      if (elem.setCustomValidity) {
        elem.errorMessage = elem.setCustomValidity;
      } else if (this.runtimeUtils.elementMatch(elem, 'auro-input') && elem.errorMessage === '') {
        const input = elem.renderRoot.querySelector('input');

        if (input.validationMessage.length > 0) {
          elem.errorMessage = input.validationMessage;
        }
      } else if (this.inputElements?.length > 0 && elem.errorMessage === '') {
        const firstInput = this.inputElements[0];

        if (firstInput.validationMessage.length > 0) {
          elem.errorMessage = firstInput.validationMessage;
        } else if (this.inputElements?.length === 2) {
          const secondInput = this.inputElements[1];

          if (secondInput.validationMessage.length > 0) {
            elem.errorMessage = secondInput.validationMessage;
          }
        }
      }
    } else {
      elem.errorMessage = '';
    }
  }
}

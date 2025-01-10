// Copyright (c) Alaska Air. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

/* eslint-disable complexity, max-depth, no-extra-parens, no-magic-numbers, line-comment-position, no-inline-comments, prefer-destructuring */

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
   * Determines the validity state of the element based on the common attribute restrictions (pattern).
   * @private
   * @param {object} elem - HTML input element to validate.
   * @returns {void}
   */
  validateInputAttributes(elem) {
    if (elem.pattern) {
      const pattern = new RegExp(`^${elem.pattern}$`, 'u');

      if (!pattern.test(elem.value)) {
        elem.validity = 'patternMismatch';
        elem.errorMessage = elem.setCustomValidityPatternMismatch || elem.setCustomValidity || '';
      }
    }

    // Length > 0 is required to prevent the error message from showing when the input is empty
    if (elem.value?.length > 0 && elem.value?.length < elem.minLength) {
      elem.validity = 'tooShort';
      elem.errorMessage = elem.setCustomValidityTooShort || elem.setCustomValidity || '';
    }
    
    if (elem.value?.length > elem.maxLength) {
      elem.validity = 'tooLong';
      elem.errorMessage = elem.setCustomValidityTooLong || elem.setCustomValidity || '';
    }
  }

  /**
   * Validates the attributes of a counter element.
   * This method checks if the element's value is within the allowed `min` and `max` range.
   * If the value is outside the valid range, the element's validity is set and a custom validity message is applied.
   *
   * @private
   * @param {HTMLElement} elem - The counter element to validate.
   * @returns {void}
   */
  validateCounterAttributes(elem) {
    if (elem.max !== undefined && Number(elem.max) < Number(elem.value)) {
      elem.validity = 'rangeOverflow';
      elem.setCustomValidity = elem.getAttribute('setCustomValidityRangeOverflow') || '';
    }

    if (elem.min !== undefined && Number(elem.min) > Number(elem.value)) {
      elem.validity = 'rangeUnderflow';
      elem.setCustomValidity = elem.getAttribute('setCustomValidityRangeUnderflow') || '';
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
        }
      } else if (elem.type === 'credit-card') {
        if (elem.value.length > 0 && elem.value.length < elem.validationCCLength) {
          elem.validity = 'tooShort';
          elem.errorMessage = elem.setCustomValidityForType || elem.setCustomValidity || '';
        }
      } else if (elem.type === 'number') {
        if (elem.max !== undefined && Number(elem.max) < Number(elem.value)) {
          elem.validity = 'rangeOverflow';
          elem.errorMessage = elem.setCustomValidityRangeOverflow || elem.setCustomValidity || '';
        }

        if (elem.min !== undefined && elem.value?.length > 0 && Number(elem.min) > Number(elem.value)) {
          elem.validity = 'rangeUnderflow';
          elem.errorMessage = elem.setCustomValidityRangeUnderflow || elem.setCustomValidity || '';
        }
      } else if (elem.type === 'month-day-year' ||
                 elem.type === 'month-year' ||
                 elem.type === 'month-fullYear' ||
                 elem.type === 'year-month-day'
      ) {
        if (elem.value?.length > 0 && elem.value.length < elem.dateStrLength) {
          elem.validity = 'tooShort';
          elem.errorMessage = elem.setCustomValidityForType || elem.setCustomValidity || '';
        } else {
          const valueDate = new Date(elem.value);

          // validate max
          if (elem.max !== undefined) {
            const maxDate = new Date(elem.max);

            if (valueDate > maxDate) {
              elem.validity = 'rangeOverflow';
              elem.errorMessage = elem.setCustomValidityRangeOverflow || elem.setCustomValidity || '';
            }
          }

          // validate min
          if (elem.min) {
            const minDate = new Date(elem.min);

            if (valueDate < minDate) {
              elem.validity = 'rangeUnderflow';
              elem.errorMessage = elem.setCustomValidityRangeUnderflow || elem.setCustomValidity || '';
            }
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

    // Validate only if noValidate is not true and the input does not have focus
    const validationShouldRun = force || (!elem.contains(document.activeElement) && elem.value !== undefined) || elem.validateOnInput;

    if (elem.hasAttribute('error')) {
      elem.validity = 'customError';
      elem.errorMessage = elem.setCustomValidityCustomError || elem.error || elem.setCustomValidity || '';
    } else if (validationShouldRun) {
      elem.validity = 'valid';
      elem.errorMessage = '';

      /**
       * Only validate once we interact with the datepicker
       * elem.value === undefined is the initial state pre-interaction.
       *
       * The validityState definitions are located at https://developer.mozilla.org/en-US/docs/Web/API/ValidityState.
       */

      let hasValue = elem.value && elem.value.length > 0;

      // If there is a second input in the elem and that value is undefined or an empty string set hasValue to false;
      if (this.auroInputElements?.length === 2) {
        if (!this.auroInputElements[1].value || this.auroInputElements[1].length === 0) {
          hasValue = false;
        }
      }

      if (!hasValue && elem.required) {
        elem.validity = 'valueMissing';
        elem.errorMessage = elem.setCustomValidityValueMissing || elem.setCustomValidity || '';
      } else if (this.runtimeUtils.elementMatch(elem, 'auro-input')) {
        this.validateType(elem);
        this.validateInputAttributes(elem);
      } else if (this.runtimeUtils.elementMatch(elem, 'auro-counter') || this.runtimeUtils.elementMatch(elem, 'auro-counter-group')) {
        this.validateCounterAttributes(elem);
      }
    }

    if (this.auroInputElements?.length > 0) {
      elem.validity = this.auroInputElements[0].validity;
      elem.errorMessage = this.auroInputElements[0].errorMessage;

      if (elem.validity === 'valid' && this.auroInputElements.length > 1) {
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

      elem.dispatchEvent(new CustomEvent('auroFormElement-validated', {
        bubbles: true,
        composed: true,
        detail: {
          validity: elem.validity,
          message: elem.errorMessage
        }
      }));
    }
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
      } else if (this.inputElements?.length > 0  && elem.errorMessage === '') {
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
      elem.errorMessage = undefined;
    }
  }
}

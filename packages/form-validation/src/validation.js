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
   * Determines the validity state of the element based on the common attribute restrictions (pattern).
   * @private
   * @param {object} elem - HTML element to validate.
   * @returns {void}
   */
  validateAttributes(elem) {
    if (elem.pattern) {
      const pattern = new RegExp(`^${elem.pattern}$`, 'u');

      if (!pattern.test(elem.value)) {
        elem.validity = 'badInput';
        elem.setCustomValidity = elem.setCustomValidityBadInput || '';
      }
    }

    // Length > 0 is required to prevent the error message from showing when the input is empty
    if (elem.value?.length > 0 && elem.value?.length < elem.minLength) {
      elem.validity = 'tooShort';
      elem.setCustomValidity = elem.setCustomValidityTooShort || '';
    }
    
    if (elem.value?.length > elem.maxLength) {
      elem.validity = 'tooLong';
      elem.setCustomValidity = elem.setCustomValidityTooLong || '';
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
          elem.validity = 'badInput';
          elem.setCustomValidity = elem.setCustomValidityForType || '';
        }
      } else if (elem.type === 'credit-card') {
        if (elem.value.length > 0 && elem.value.length < elem.validationCCLength) {
          elem.validity = 'tooShort';
          elem.setCustomValidity = elem.setCustomValidityForType || '';
        }
      } else if (elem.type === 'number' || elem.type === 'numeric') { // 'numeric` is a deprecated alias for number'
        if (elem.max !== undefined && Number(elem.max) < Number(elem.value)) {
          elem.validity = 'rangeOverflow';
          elem.setCustomValidity = elem.getAttribute('setCustomValidityRangeOverflow') || '';
        }

        if (elem.min !== undefined && Number(elem.min) > Number(elem.value)) {
          elem.validity = 'rangeUnderflow';
          elem.setCustomValidity = elem.getAttribute('setCustomValidityRangeUnderflow') || '';
        }

      } else if (elem.type === 'month-day-year' ||
                 elem.type === 'month-year' ||
                 elem.type === 'month-fullYear' ||
                 elem.type === 'year-month-day'
      ) {
        if (elem.value && elem.value.length > 0 && elem.value.length < elem.dateStrLength) {
          elem.validity = 'tooShort';
          elem.setCustomValidity = elem.setCustomValidityForType || '';
        } else {
          const valueDate = new Date(elem.value);

          // validate max
          if (elem.max !== undefined) {
            const maxDate = new Date(elem.max);

            if (valueDate > maxDate) {
              elem.validity = 'rangeOverflow';
              elem.setCustomValidity = elem.getAttribute('setCustomValidityRangeOverflow') || '';
            }
          }

          // validate min
          if (elem.min) {
            const minDate = new Date(elem.min);

            if (valueDate < minDate) {
              elem.validity = 'rangeUnderflow';
              elem.setCustomValidity = elem.getAttribute('setCustomValidityRangeUnderflow') || '';
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
      elem.setCustomValidity = elem.error;
    } else if (validationShouldRun) {
      elem.validity = 'valid';
      elem.setCustomValidity = '';

      /**
       * Only validate once we interact with the datepicker
       * elem.value === undefined is the initial state pre-interaction.
       *
       * The validityState definitions are located at https://developer.mozilla.org/en-US/docs/Web/API/ValidityState.
       */

      let hasValue = elem.value && elem.value.length > 0;

      // If there is a second input in the elem and that value is undefined or an empty string set hasValue to false;
      if (this.auroInputElements && this.auroInputElements.length === 2) {
        if (!this.auroInputElements[1].value || this.auroInputElements[1].length === 0) {
          hasValue = false;
        }
      }

      if (!hasValue && elem.required) {
        elem.validity = 'valueMissing';
        elem.setCustomValidity = elem.setCustomValidityValueMissing || '';
      } else if (this.runtimeUtils.elementMatch(elem, 'auro-input')) {
        this.validateType(elem);
        this.validateAttributes(elem);
      }
    }

    if (this.auroInputElements && this.auroInputElements.length > 0) {
      elem.validity = this.auroInputElements[0].validity;
      elem.setCustomValidity = this.auroInputElements[0].setCustomValidity;

      if (elem.validity === 'valid') {
        if (this.auroInputElements.length > 1) {
          elem.validity = this.auroInputElements[1].validity;
          elem.setCustomValidity = this.auroInputElements[1].setCustomValidity;
        }
      }
    }

    if (validationShouldRun || elem.hasAttribute('error')) {
      if (elem.validity && elem.validity !== 'valid') {
        elem.isValid = false;

        // Use the validity message override if it is declared
        if (elem.ValidityMessageOverride) {
          elem.setCustomValidity = elem.ValidityMessageOverride;
        }
      } else {
        elem.isValid = true;
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
      } else if (this.runtimeUtils.elementMatch(elem, 'auro-input')) {
        const input = elem.renderRoot.querySelector('input');

        if (input.validationMessage.length > 0) {
          elem.errorMessage = input.validationMessage;
        }
      } else if (this.inputElements && this.inputElements.length > 0) {
        const firstInput = this.inputElements[0];

        if (firstInput.validationMessage.length > 0) {
          elem.errorMessage = firstInput.validationMessage;
        } else if (this.inputElements.length === 2) {
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

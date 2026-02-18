/* eslint-disable jsdoc/require-jsdoc, no-magic-numbers, no-param-reassign */

import { classicExample } from '../apiExamples/classic/basic.js';
import { classicInverseExample } from '../apiExamples/classic/appearance-inverse.js';
import { customExample } from '../apiExamples/custom.js';

import { AuroDropdown } from '../src/auro-dropdown.js';
AuroDropdown.register();
AuroDropdown.register('custom-dropdown');

export function initExamples() {
  // javascript example function calls to be added here upon creation to test examples
  classicExample();
  classicInverseExample();
  customExample();
}

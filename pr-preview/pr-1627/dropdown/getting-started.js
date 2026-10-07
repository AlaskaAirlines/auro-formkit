/* eslint-disable jsdoc/require-jsdoc, no-magic-numbers, no-param-reassign */

import { AuroDropdown } from '../src/auro-dropdown.js';
import { AuroInput } from '@aurodesignsystem/auro-input';
AuroDropdown.register();
AuroDropdown.register('custom-dropdown');
AuroInput.register();

import { showExample } from '../apiExamples/programmatically-show.js';
import { hideExample } from '../apiExamples/programmatically-hide.js';
export function initExamples(initCount) {
  // javascript example function calls to be added here upon creation to test examples
  initCount = initCount || 0;

  try {
    showExample();
    hideExample();
  } catch {
    if (initCount <= 20) {
      setTimeout(() => {
        initExamples(initCount + 1);
      }, 100);
    }
  }
}

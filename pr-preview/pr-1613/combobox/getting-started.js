/* eslint-disable jsdoc/require-jsdoc, no-magic-numbers, no-param-reassign */

import { AuroCombobox } from '../src/auro-combobox.js';
import '../../menu/src/registered.js';

import { resetStateExample } from '../apiExamples/reset-state.js';

AuroCombobox.register();
AuroCombobox.register('custom-combobox');

export function initExamples(initCount) {
  initCount = initCount || 0;

  try {
    resetStateExample();
  } catch (err) {
    if (initCount <= 20) {
      setTimeout(() => {
        initExamples(initCount + 1);
      }, 100);
    }
  }
}

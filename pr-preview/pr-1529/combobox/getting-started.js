/* eslint-disable jsdoc/require-jsdoc, no-magic-numbers, no-param-reassign */

import { AuroCombobox } from '../src/auro-combobox.js';
import '../../menu/src/registered.js';

AuroCombobox.register();
AuroCombobox.register('custom-combobox');

export function initExamples(initCount) {
  initCount = initCount || 0;

  try {
    // Add any example initialization code here.
  } catch (err) {
    if (initCount <= 20) {
      setTimeout(() => {
        initExamples(initCount + 1);
      }, 100);
    }
  }
}

/* eslint-disable jsdoc/require-jsdoc, no-magic-numbers, no-param-reassign */

import { AuroCombobox } from '../src/auro-combobox.js';
import '../../menu/src/registered.js';

AuroCombobox.register();
AuroCombobox.register('custom-combobox');

export function initExamples(initCount) {
  initCount = initCount || 0;

  try {
    // example();
  } catch {
    if (initCount <= 20) {
      // setTimeout handles issue where content is sometimes loaded after the functions get called
      setTimeout(() => {
        initExamples(initCount + 1);
      }, 100);
    }
  }
}

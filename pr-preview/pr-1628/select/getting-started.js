/* eslint-disable jsdoc/require-jsdoc */

import { AuroSelect } from '../src/auro-select.js';
import '../../menu/src/registered.js';

import { resetStateExample } from '../apiExamples/reset-state.js';

AuroSelect.register();
AuroSelect.register('custom-select');

export function initExamples(initCount) {
  initCount = initCount || 0;

  try {
    resetStateExample();
  } catch (err) {
    if (initCount <= 20) {
      // setTimeout handles the case where example content is rendered after this function runs.
      setTimeout(() => {
        initExamples(initCount + 1);
      }, 100);
    }
  }
}

/* eslint-disable jsdoc/require-jsdoc, no-magic-numbers, no-param-reassign */

import { valueExample } from "../apiExamples/value";
import { resetStateExample } from "../apiExamples/reset-state";
import { updateActiveOptionExample } from "../apiExamples/update-active-option.js";
import { AuroSelect } from '../src/auro-select.js';
import '../../menu/src/registered.js';

AuroSelect.register();
AuroSelect.register('custom-select');

export function initExamples(initCount) {
  initCount = initCount || 0;

  try {
    valueExample();
    resetStateExample();
    updateActiveOptionExample();
  } catch (err) {
    if (initCount <= 20) {
      setTimeout(() => {
        initExamples(initCount + 1);
      }, 100);
    }
  }
}

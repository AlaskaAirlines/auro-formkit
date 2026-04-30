// import { exampleFunction } from "exampleFile.js";

/* eslint-disable jsdoc/require-jsdoc, no-magic-numbers, no-param-reassign */

import { AuroSelect } from '../src/auro-select.js';
import '../../menu/src/registered.js';

AuroSelect.register(); // registering to `auro-select`
AuroSelect.register('custom-select');

export function initExamples(initCount) {
  initCount = initCount || 0;

  try {
    // Add any example initialization code here. For instance, if you have examples that require JavaScript to set up, you can call those functions here.
  } catch (err) {
    if (initCount <= 20) {
      setTimeout(() => {
        initExamples(initCount + 1);
      }, 100);
    }
  }
}

/* eslint-disable jsdoc/require-jsdoc, no-magic-numbers, no-param-reassign */
// import { AuroDropdownBib } from '../src/auro-dropdownBib.js';
import { AuroCounter } from '../src/auro-counter.js';

// AuroDropdownBib.register();

AuroCounter.register();
AuroCounter.register('custom-dropdown');

export function initExamples(initialCount = 0) {
  try {
    // javascript example function calls to be added here upon creation to test examples
    // auroMenuResetExample();
  } catch (err) {
    if (initialCount <= 20) {
      // setTimeout handles issue where content is sometimes loaded after the functions get called
      setTimeout(() => {
        initExamples(initialCount + 1);
      }, 100);
    }
  }
}

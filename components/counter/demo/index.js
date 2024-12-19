/* eslint-disable jsdoc/require-jsdoc, no-magic-numbers, no-param-reassign */
import { AuroCounter } from '../src/auro-counter.js';
import { AuroCounterButton } from '../src/auro-counter-button.js';


AuroCounter.register();
AuroCounterButton.register();
AuroCounter.register('custom-counter');

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

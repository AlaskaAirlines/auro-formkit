/* eslint-disable jsdoc/require-jsdoc, no-magic-numbers, no-param-reassign */
import { AuroCounter } from '../src/auro-counter.js';
import { AuroCounterGroup } from '../src/auro-counter-group.js';

AuroCounter.register();
AuroCounterGroup.register();
AuroCounterGroup.register('custom-counter-group');
AuroCounter.register('custom-counter');

export function initExamples(initialCount = 0) {
  try {

  } catch (err) {
    if (initialCount <= 20) {
      // setTimeout handles issue where content is sometimes loaded after the functions get called
      setTimeout(() => {
        initExamples(initialCount + 1);
      }, 100);
    }
  }
}

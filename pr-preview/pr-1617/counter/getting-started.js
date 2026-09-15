import { AuroCounter } from '../src/auro-counter.js';
import { AuroCounterGroup } from '../src/auro-counter-group.js';

import { resetStateExample } from '../apiExamples/reset-state.js';

AuroCounter.register(); // registering to `auro-counter`
AuroCounterGroup.register(); // registering to `auro-counter-group`

AuroCounter.register('custom-counter');
AuroCounterGroup.register('custom-counter-group');

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

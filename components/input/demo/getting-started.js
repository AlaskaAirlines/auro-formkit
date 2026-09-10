import { AuroInput } from '../src/auro-input.js';

import { resetStateExample } from '../apiExamples/reset-state.js';

AuroInput.register();
AuroInput.register('custom-input');

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

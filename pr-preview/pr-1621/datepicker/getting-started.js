import { AuroDatePicker } from '../src/auro-datepicker.js';

import { resetStateExample } from '../apiExamples/reset-state.js';

AuroDatePicker.register(); // registering to auro-datepicker
AuroDatePicker.register('custom-datepicker');

export function initExamples(initCount) {
  initCount = initCount || 0;

  try {
    resetStateExample();
  } catch {
    if (initCount <= 20) {
      // setTimeout handles the case where example content is rendered after this function runs.
      setTimeout(() => {
        initExamples(initCount + 1);
      }, 100);
    }
  }
}

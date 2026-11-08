import { AuroDatePicker } from '../src/auro-datepicker.js';

import { errorExample } from '../apiExamples/error.js';
import { validityExample } from '../apiExamples/validity.js';

AuroDatePicker.register();

export function initExamples(initCount) {
  initCount = initCount || 0;

  try {
    errorExample();
    validityExample();
  } catch {
    if (initCount <= 20) {
      // setTimeout handles issue where content is sometimes loaded after the functions get called
      setTimeout(() => {
        initExamples(initCount + 1);
      }, 100);
    }
  }
}

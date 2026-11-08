import { AuroDatePicker } from '../src/auro-datepicker.js';
import { blackoutLabelExample } from '../apiExamples/blackout-label.js';

AuroDatePicker.register(); // registering to auro-datepicker
AuroDatePicker.register('custom-datepicker');

export function initExamples(initCount) {
  initCount = initCount || 0;

  try {
    // Only run when the demo element exists on the current page
    if (document.querySelector('#blackoutLabelExample')) {
      blackoutLabelExample();
    }
  } catch {
    if (initCount <= 20) {
      // setTimeout handles issue where content is sometimes loaded after the functions get called
      setTimeout(() => {
        initExamples(initCount + 1);
      }, 100);
    }
  }
}

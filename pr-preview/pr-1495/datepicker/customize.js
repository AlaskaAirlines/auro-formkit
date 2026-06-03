import { AuroDatePicker } from '../src/auro-datepicker.js';
import { localizationExample } from '../apiExamples/localization.js';

AuroDatePicker.register();

export function initExamples(initCount) {
  initCount = initCount || 0;

  try {
    localizationExample();
  } catch {
    if (initCount <= 20) {
      // setTimeout handles issue where content is sometimes loaded after the functions get called
      setTimeout(() => {
        initExamples(initCount + 1);
      }, 100);
    }
  }
}

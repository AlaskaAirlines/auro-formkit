import { AuroDatePicker } from '../src/auro-datepicker.js';
import { localizationCalendarStringsExample } from '../apiExamples/localization-calendar-strings.js';

AuroDatePicker.register();

export function initExamples(initCount) {
  initCount = initCount || 0;

  try {
    localizationCalendarStringsExample();
  } catch {
    if (initCount <= 20) {
      // setTimeout handles issue where content is sometimes loaded after the functions get called
      setTimeout(() => {
        initExamples(initCount + 1);
      }, 100);
    }
  }
}

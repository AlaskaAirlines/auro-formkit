import { alertValueExample } from './../apiExamples/alert-value';
import { errorExample } from './../apiExamples/error';
import { focusExample } from './../apiExamples/focus';
import { populateSlotContentExample } from './../apiExamples/dynamic-slot';
import { updateMaxDateExample } from './../apiExamples/update-max-date';
import { updateMinDateExample } from './../apiExamples/update-min-date';
import { validityExample } from './../apiExamples/validity';
import { inDialogExample } from '../apiExamples/in-dialog';
import { localizationExample } from '../apiExamples/localization';
import { resetStateExample } from '../apiExamples/reset-state';
import '../src/registered.js';

export function initExamples(initCount) {
  initCount = initCount || 0;

  try {
    alertValueExample();
    errorExample();
    focusExample();
    populateSlotContentExample();
    updateMaxDateExample();
    updateMinDateExample();
    validityExample();
    inDialogExample();
    localizationExample();
    resetStateExample();
  } catch (error) {
    if (initCount <= 20) {
      // setTimeout handles issue where content is sometimes loaded after the functions get called
      setTimeout(() => {
        initExamples(initCount + 1);
      }, 100);
    }
  }
}

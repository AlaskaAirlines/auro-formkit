import { alertValueExample } from './../apiExamples/alertValue.js';
import { errorExample } from './../apiExamples/error';
import { focusExample } from './../apiExamples/focus.js';
import { populateSlotContentExample } from './../apiExamples/dynamicSlot.js';
import { updateMaxDateExample } from './../apiExamples/updateMaxDate';
import { updateMinDateExample } from './../apiExamples/updateMinDate';
import { validityExample } from './../apiExamples/validity';
import { inDialogExample } from '../apiExamples/inDialog.js';
import { localizationExample } from '../apiExamples/localization.js';
import { resetStateExample } from '../apiExamples/resetState.js';
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

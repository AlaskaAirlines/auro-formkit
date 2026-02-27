import { customErrorValidityExample } from "../apiExamples/custom-error-validity";
import { valueExample } from "../apiExamples/value";
import { valueExtractionExample } from "../apiExamples/value-extraction";
import { valueAlertExample } from "../apiExamples/value-alert";
import { inDialogExample } from '../apiExamples/in-dialog';
import { resetStateExample } from "../apiExamples/reset-state";
import { updateActiveOptionExample } from "../apiExamples/update-active-option.js";
// import { auroMenuLoadingExample } from "../apiExamples/loading";

/* eslint-disable jsdoc/require-jsdoc, no-magic-numbers, no-param-reassign */
import { AuroSelect } from '../src/auro-select.js';
import '../../menu/src/registered.js';

AuroSelect.register(); // registering to `auro-select`

export function initExamples(initCount) {
  initCount = initCount || 0;

  try {
    // javascript example function calls to be added here upon creation to test examples
    customErrorValidityExample();
    valueExample();
    valueExtractionExample();
    valueAlertExample();
    inDialogExample();
    resetStateExample();
    updateActiveOptionExample();
    // auroMenuLoadingExample();
  } catch (err) {
    if (initCount <= 20) {
      // setTimeout handles issue where content is sometimes loaded after the functions get called
      setTimeout(() => {
        initExamples(initCount + 1);
      }, 100);
    }
  }
}

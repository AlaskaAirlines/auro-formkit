import { customErrorValidityExample } from "../apiExamples/customErrorValidity";
import { setErrorExample } from "../apiExamples/errorApi";
import { valueExample } from "../apiExamples/value";
import { valueExtractionExample } from "../apiExamples/valueExtraction";
import { valueAlertExample } from "../apiExamples/valueAlert.js";
import { inDialogExample } from '../apiExamples/inDialog';
import { resetStateExample } from "../apiExamples/resetState";
import { auroMenuLoadingExample } from "../apiExamples/loading";

/* eslint-disable jsdoc/require-jsdoc, no-magic-numbers, no-param-reassign */
import { AuroSelect } from '../src/auro-select.js';
import '../../menu/src/registered.js';

AuroSelect.register(); // registering to `auro-select`

export function initExamples(initCount) {
  initCount = initCount || 0;

  try {
    // javascript example function calls to be added here upon creation to test examples
    customErrorValidityExample();
    setErrorExample();
    valueExample();
    valueExtractionExample();
    valueAlertExample();
    inDialogExample();
    resetStateExample();
    auroMenuLoadingExample();
  } catch (err) {
    if (initCount <= 20) {
      // setTimeout handles issue where content is sometimes loaded after the functions get called
      setTimeout(() => {
        initExamples(initCount + 1);
      }, 100);
    }
  }
}

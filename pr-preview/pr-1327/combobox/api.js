/* eslint-disable jsdoc/require-jsdoc, no-magic-numbers, no-param-reassign */

import { focusExample } from '../apiExamples/focus';
import { resetStateExample } from '../apiExamples/reset-state';
// import { setupExternalSelectionExample } from '../apiExamples/external-selection';
import { valueExample } from '../apiExamples/value';
import { inDialogExample } from '../apiExamples/in-dialog';
import { persistentExample } from '../apiExamples/persistent';
import { swapValueExample } from '../apiExamples/swap-value';

import { AuroCombobox } from '../src/auro-combobox.js';
import '../../menu/src/registered.js';

AuroCombobox.register();

export function initExamples(initCount) {
  initCount = initCount || 0;

  try {
    // javascript example function calls to be added here upon creation to test examples
    focusExample();
    resetStateExample();
    // setupExternalSelectionExample();
    valueExample();
    inDialogExample();  
    persistentExample();
    swapValueExample();
  } catch (err) {
    if (initCount <= 20) {
      // setTimeout handles issue where content is sometimes loaded after the functions get called
      setTimeout(() => {
        initExamples(initCount + 1);
      }, 100);
    }
  }
}


/* eslint-disable jsdoc/require-jsdoc, no-magic-numbers, no-param-reassign */

import { dynamicMenuExample } from '../apiExamples/dynamicMenu';
import { setupExternalSelectionExample } from '../apiExamples/externalSelection.js';
import { valueExample } from '../apiExamples/value';
import { focusExample } from '../apiExamples/focus';
import { inDialogExample } from '../apiExamples/inDialog';
import { resetStateExample } from '../apiExamples/resetState';
import { auroMenuLoadingExample } from '../apiExamples/loading';


import { AuroCombobox } from '../src/auro-combobox.js';
import '../../menu/src/registered.js';

AuroCombobox.register();

export function initExamples(initCount) {
  initCount = initCount || 0;

  try {
    // javascript example function calls to be added here upon creation to test examples
    dynamicMenuExample();
    valueExample();
    focusExample();
    inDialogExample();
    resetStateExample();
    auroMenuLoadingExample();
    setupExternalSelectionExample();
  } catch (err) {
    if (initCount <= 20) {
      // setTimeout handles issue where content is sometimes loaded after the functions get called
      setTimeout(() => {
        initExamples(initCount + 1);
      }, 100);
    }
  }
}


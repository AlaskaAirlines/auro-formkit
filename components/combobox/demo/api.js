/* eslint-disable jsdoc/require-jsdoc, no-magic-numbers, no-param-reassign */

import { dynamicMenuExample } from '../apiExamples/dynamicMenu';
import { valueExample } from '../apiExamples/value';
import { focusExample } from '../apiExamples/focus';
import { inDialogExample } from '../apiExamples/inDialog.js';
import { auroMenuLoadingExample } from '../apiExamples/loading.js';


import { AuroCombobox } from '../src/auro-combobox.js';
import '../../menu/src/index.js';

AuroCombobox.register();

export function initExamples(initCount) {
  initCount = initCount || 0;

  try {
    // javascript example function calls to be added here upon creation to test examples
    dynamicMenuExample();
    valueExample();
    focusExample();
    inDialogExample();
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


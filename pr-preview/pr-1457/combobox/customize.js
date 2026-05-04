// import { exampleFunction } from "exampleFile.js";

/* eslint-disable jsdoc/require-jsdoc, no-magic-numbers, no-param-reassign */

import { AuroCombobox } from '../src/auro-combobox.js';
import '../../menu/src/registered.js';
import { dynamicMenuExample } from '../apiExamples/dynamic-menu.js';

AuroCombobox.register(); // registering to `auro-combobox`
AuroCombobox.register('custom-combobox');

export async function initExamples(initCount) {
  initCount = initCount || 0;

  try {
    await dynamicMenuExample();
  } catch (err) {
    if (initCount <= 20) {
      setTimeout(() => {
        initExamples(initCount + 1);
      }, 100);
    }
  }
}

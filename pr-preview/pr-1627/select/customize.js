/* eslint-disable jsdoc/require-jsdoc, no-magic-numbers, no-param-reassign */

import { AuroSelect } from '../src/auro-select.js';
import '../../menu/src/registered.js';
import { auroSelectLoadingExample } from '../apiExamples/loading.js';

AuroSelect.register();
AuroSelect.register('custom-select');

export async function initExamples(initCount) {
  initCount = initCount || 0;

  try {
    await auroSelectLoadingExample();
  } catch (err) {
    if (initCount <= 20) {
      setTimeout(() => {
        initExamples(initCount + 1);
      }, 100);
    }
  }
}

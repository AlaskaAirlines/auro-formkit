/* eslint-disable jsdoc/require-jsdoc, no-magic-numbers, no-param-reassign */

import { auroMenuResetExample } from '../apiExamples/reset';
import { auroMenuMatchWordExample } from '../apiExamples/match-word';
import { initKeysExample } from '../apiExamples/keys';
import { auroMenuLoadingExample } from '../apiExamples/loading';
import { initSelectAllMatchingOptionsExample } from '../apiExamples/select-all-matching-options';
import '../src/registered.js';

export function initExamples(initCount) {
  initCount = initCount || 0;

  try {
    // javascript example function calls to be added here upon creation to test examples
    initKeysExample();
    auroMenuLoadingExample();
    auroMenuMatchWordExample();
    initSelectAllMatchingOptionsExample();
    auroMenuResetExample();
  } catch (err) {
    if (initCount <= 20) {
      // setTimeout handles issue where content is sometimes loaded after the functions get called
      setTimeout(() => {
        initExamples(initCount + 1);
      }, 100);
    }
  }
}


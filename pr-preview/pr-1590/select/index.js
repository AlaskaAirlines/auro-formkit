/* eslint-disable jsdoc/require-jsdoc, no-magic-numbers, no-param-reassign */

import { AuroSelect } from '../src/auro-select.js';
import '../../menu/src/registered.js';

AuroSelect.register();
AuroSelect.register('custom-select');

export function initExamples(initCount) {
  initCount = initCount || 0;
}

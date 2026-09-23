import { AuroRadio } from '../src/auro-radio.js';
import { AuroRadioGroup } from '../src/auro-radio-group.js';

import { resetStateExample } from '../apiExamples/reset-state.js';

AuroRadio.register();
AuroRadioGroup.register();

AuroRadio.register('custom-radio');
AuroRadioGroup.register('custom-radio-group');

export async function initExamples(initCount) {
  initCount = initCount || 0;

  try {
    await resetStateExample();
  } catch (err) {
    if (initCount <= 20) {
      setTimeout(() => {
        initExamples(initCount + 1);
      }, 100);
    }
  }
}

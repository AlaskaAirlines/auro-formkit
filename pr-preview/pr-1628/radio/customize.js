import { AuroRadio } from '../src/auro-radio.js';
import { AuroRadioGroup } from '../src/auro-radio-group.js';

AuroRadio.register();
AuroRadioGroup.register();

AuroRadio.register('custom-radio');
AuroRadioGroup.register('custom-radio-group');

export function initExamples(initCount) {
  initCount = initCount || 0;

  try {
    // Add any example initialization code here.
  } catch (err) {
    if (initCount <= 20) {
      setTimeout(() => {
        initExamples(initCount + 1);
      }, 100);
    }
  }
}

import { AuroCheckbox } from '../src/auro-checkbox.js';
import { AuroCheckboxGroup } from '../src/auro-checkbox-group.js';

AuroCheckbox.register(); // registering to `auro-checkbox`
AuroCheckboxGroup.register(); // registering to `auro-checkbox-group`

AuroCheckbox.register('custom-checkbox');
AuroCheckboxGroup.register('custom-checkbox-group');

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

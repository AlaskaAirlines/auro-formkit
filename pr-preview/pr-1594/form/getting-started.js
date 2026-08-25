/* eslint-disable jsdoc/require-jsdoc */

import { AuroForm } from '../src/auro-form.js';
import './registerDemoDeps.js';
import { AuroInput } from '@aurodesignsystem/auro-input';
import { AuroDatePicker } from '@aurodesignsystem/auro-datepicker';
import { complexExample } from '../apiExamples/complex.js';

AuroInput.register('input-two');
AuroDatePicker.register();
AuroForm.register();
AuroForm.register('custom-form');

export async function initExamples(initCount) {
  initCount = initCount || 0;

  try {
    await complexExample();
  } catch (err) {
    if (initCount <= 20) {
      setTimeout(() => {
        initExamples(initCount + 1);
      }, 100);
    }
  }
}

initExamples();

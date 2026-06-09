import { AuroForm } from '../src/auro-form.js';
import './registerDemoDeps.js';
import { AuroInput } from '@aurodesignsystem/auro-input';
import { AuroDatePicker } from '@aurodesignsystem/auro-datepicker';

AuroInput.register('input-two');
AuroDatePicker.register();
AuroForm.register();
AuroForm.register('custom-form');


import { AuroDatePicker } from '../../src/auro-datepicker.js';

/**
 */
class AuroDatePickerWCA extends AuroDatePicker {}

if (!customElements.get("auro-datepicker")) {
  customElements.define("auro-datepicker", AuroDatePickerWCA);
}

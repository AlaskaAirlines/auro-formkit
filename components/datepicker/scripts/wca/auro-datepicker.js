import { AuroDatePicker } from '../../src/auro-datepicker.js';

/**
 * The `auro-datepicker` component provides users with a way to select a date or date range from a calendar popup or fullscreen calendar on mobile.
 */
class AuroDatePickerWCA extends AuroDatePicker {}

if (!customElements.get("auro-datepicker")) {
  customElements.define("auro-datepicker", AuroDatePickerWCA);
}

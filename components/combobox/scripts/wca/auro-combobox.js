import { AuroCombobox } from '../../src/auro-combobox.js';

/**
 * The `auro-combobox` element provides users with a way to select an option from a list of filtered or suggested options based on user input.
 */
class AuroComboboxWCA extends AuroCombobox {}

if (!customElements.get("auro-combobox")) {
  customElements.define("auro-combobox", AuroComboboxWCA);
}

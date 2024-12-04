
import { AuroCombobox } from '../../src/auro-combobox.js';

/**
 */
class AuroComboboxWCA extends AuroCombobox {}

if (!customElements.get("auro-combobox")) {
  customElements.define("auro-combobox", AuroComboboxWCA);
}

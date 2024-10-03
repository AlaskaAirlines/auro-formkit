import { AuroForm } from './src/auro-form.js';
import { AuroDropdown } from './src/dropdown/auro-dropdown.js';
import { AuroInput } from './src/input/auro-input.js';
import { MySelect } from './src/dropdown/select.js';

/**
 * Register Custom Element.
 * @param {Object} name - Name to use for custom element.
 * @returns {void}
 */
const registerComponent = (name = 'custom-form') => {
  // alias definition
  if (!customElements.get(name)) {
    customElements.define(name, class extends AuroForm {});
  }
}

export { registerComponent }

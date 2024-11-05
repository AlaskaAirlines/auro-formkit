import { AuroForm } from './src/auro-form.js';

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
};

export { registerComponent };

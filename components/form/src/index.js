import { Form } from './src/auro-component-form.js';

/**
 * Register Custom Element.
 * @param {Object} name - Name to use for custom element.
 * @returns {void}
 */
const registerComponent = (name = 'custom-form') => {
  // alias definition
  if (!customElements.get(name)) {
    customElements.define(name, class extends Form {});
  }
};

export { registerComponent };

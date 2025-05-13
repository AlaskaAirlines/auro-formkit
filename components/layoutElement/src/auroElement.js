import { LitElement, render } from "lit";

export class AuroElement extends LitElement {
  static get properties() {
    return {

      /**
       * Defines the language of an element.
       * @default {'default'}
       */
      layout: {
        type: String,
        attribute: "layout",
        reflect: true
      },

      shape: {
        type: String,
        attribute: "shape",
        reflect: true
      },

      size: {
        type: String,
        attribute: "size",
        reflect: true
      },
    };
  }

  resetShapeClasses() {
    if (this.shape && this.size) {
      const wrapper = this.shadowRoot.querySelector('.wrapper');

      if (wrapper) {
        wrapper.classList.add(`shape-${this.shape.toLowerCase()}-${this.size.toLowerCase()}`);
      }
    }
    // SUN TODO: cleanup old shape classes before adding new ones
  }

  updated() {
    this.resetShapeClasses();
  }

  // Try and render the defined `this.layout` layout. If that fails, fall back to the default layout.
  // This will catch if an invalid layout value is passed in and render the default layout.
  render() {
    try {
      return this.getLayout();
    } catch (error) {
      // failed to get the defined layout
      console.error('Failed to get the defined layout - using the default layout', error);
      return this.getLayout('default');
    }
  }
}

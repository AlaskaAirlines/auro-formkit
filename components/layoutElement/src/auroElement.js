import { LitElement } from "lit";

/**
 * AuroElement is the shared base class for layout-aware Auro form components.
 *
 * It defines the common `layout`, `shape`, `size`, and `ondark` reactive
 * properties and the architecture helpers (`renderLayout`, `resetShapeClasses`,
 * `resetLayoutClasses`) that subclasses use to render a chosen layout and apply
 * the matching `shape-*` / `layout-*` wrapper classes. Subclasses supply their
 * own default and valid value set for `layout`, `shape`, and `size`.
 */
export class AuroElement extends LitElement {
  static get properties() {
    return {

      /**
       * When true, renders the component styled for use on a dark background.
       */
      onDark: {
        type: Boolean,
        attribute: "ondark",
        reflect: true
      }

      // NOTE: `layout`, `shape`, and `size` are intentionally NOT declared here.
      // Their valid value sets differ per component, and the CEM analyzer roots
      // an inherited property's `type` in the class that declares it — a base
      // declaration would force every subclass's `@type` to be discarded and
      // emitted as plain `string`. Each subclass declares its own `layout` /
      // `shape` / `size` with an exact `@type` union instead. AuroElement still
      // consumes `this.layout` / `this.shape` / `this.size` in its render and
      // architecture helpers below (subclasses guarantee the reactive props).
      // See AlaskaAirlines/discussions#653.
    };
  }

  /**
   * Returns true if the element has focus.
   * @private
   * @returns {boolean} - Returns true if the element has focus.
   */
  get componentHasFocus() {
    return this.matches(':focus') || this.matches(':focus-within');
  }

  resetShapeClasses() {
    const wrapper = this.shadowRoot.querySelector('.wrapper');

    if (wrapper) {
      wrapper.classList.forEach((className) => {
        if (className.startsWith('shape-')) {
          wrapper.classList.remove(className);
        }
      });

      if (this.shape && this.size) {
        wrapper.classList.add(`shape-${this.shape.toLowerCase()}-${this.size.toLowerCase()}`);
      } else {
        wrapper.classList.add('shape-none');
      }
    }

  }

  resetLayoutClasses() {
    if (this.layout) {
      const wrapper = this.shadowRoot.querySelector('.wrapper');

      if (wrapper) {
        wrapper.classList.forEach((className) => {
          if (className.startsWith('layout-')) {
            wrapper.classList.remove(className);
          }
        });

        wrapper.classList.add(`layout-${this.layout.toLowerCase()}`);
      }
    }
  }

  updateComponentArchitecture() {
    this.resetLayoutClasses();
    this.resetShapeClasses();
  }

  updated(changedProperties) {
    if (changedProperties.has('layout') || changedProperties.has('shape') || changedProperties.has('size')) {
      this.updateComponentArchitecture();
    }
  }

  // Try to render the defined `this.layout` layout. If that fails, fall back to the default layout.
  // This will catch if an invalid layout value is passed in and render the default layout if so.
  render() {
    try {
      return this.renderLayout();
    } catch (error) {
      // failed to get the defined layout
      console.error('Failed to get the defined layout - using the default layout', error); // eslint-disable-line no-console

      // fallback to the default layout
      return this.getLayout('default');
    }
  }
}

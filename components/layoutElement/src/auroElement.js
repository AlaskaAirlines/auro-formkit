import { LitElement } from "lit";

/**
 * Shared base class for layout-aware Auro form components, such as `auro-input`, `auro-select`, and `auro-menu`.
 *
 * It declares the `onDark` property and provides helpers that apply the
 * `layout-*` and `shape-*` classes for the current `layout`, `shape`, and `size`
 * to the subclass's `.wrapper` element. Each subclass declares its own `layout`,
 * `shape`, and `size` properties with its own values and defaults, and
 * implements `renderLayout()`, which `render()` calls.
 *
 * **Key capabilities**
 * - **Layout and shape classes**: The base class always updates the `.wrapper` element's `layout-*` and `shape-*` classes when `layout`, `shape`, or `size` changes.
 * - **Dark background flag**: `ondark` tells a subclass that the component sits on a dark background, so the subclass can switch colors.
 *
 * **Example**
 * ```js
 * class MyField extends AuroElement {
 *   renderLayout() {
 *     return html`<div class="wrapper"><slot></slot></div>`;
 *   }
 * }
 * ```
 */
export class AuroElement extends LitElement {
  static get properties() {
    return {

      /**
       * Tells a subclass that the component sits on a dark background, so the subclass can switch colors. The base class doesn't change any styles itself, and `auro-menu` and `auro-menuoption` don't currently use it.
       * @category ui
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
   * Checks whether the element or anything inside it has focus.
   * @private
   * @returns {boolean} True if the element or one of its descendants has focus; false otherwise.
   */
  get componentHasFocus() {
    return this.matches(':focus') || this.matches(':focus-within');
  }

  /**
   * Sets the `shape-*` class on the `.wrapper` element to match the current `shape` and `size`, such as `shape-rounded-lg`, or to `shape-none` when either isn't set. Does nothing when there's no `.wrapper` element.
   * @returns {void}
   */
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

  /**
   * Sets the `layout-*` class on the `.wrapper` element to match the current `layout`, such as `layout-classic`. Does nothing when `layout` isn't set or there's no `.wrapper` element.
   * @returns {void}
   */
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

  /**
   * Updates the `layout-*` and `shape-*` classes on the `.wrapper` element. Called whenever `layout`, `shape`, or `size` changes.
   * @returns {void}
   */
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

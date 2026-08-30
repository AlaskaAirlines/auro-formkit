import { html } from 'lit';
import { AuroElement } from '../src/auroElement.js';

/**
 * A concrete test subclass of AuroElement that provides the
 * renderLayout() and getLayout() methods required by the base render().
 *
 * AuroElement no longer declares `layout`, `shape`, or `size` itself — each
 * real subclass declares its own typed reactive property so the CEM analyzer
 * roots the `@type` union in the subclass. This fixture stands in for a real
 * consumer, so it declares them the same way.
 */
export class TestAuroElement extends AuroElement {
  static get properties() {
    return {
      ...super.properties,

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
      }
    };
  }

  constructor() {
    super();
    this.forceRenderError = false;
  }

  renderLayout() {
    if (this.forceRenderError) {
      throw new Error('Forced render error for testing');
    }

    return html`<div class="wrapper"><slot></slot></div>`;
  }

  getLayout() {
    return html`<div class="wrapper"><slot></slot></div>`;
  }
}

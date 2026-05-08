import { html } from 'lit';
import { AuroElement } from '../src/auroElement.js';

/**
 * A concrete test subclass of AuroElement that provides the
 * renderLayout() and getLayout() methods required by the base render().
 */
export class TestAuroElement extends AuroElement {
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

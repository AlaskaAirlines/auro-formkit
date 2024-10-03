// Copyright (c) 2020 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

/* eslint-disable */

import { html } from "lit/static-html.js";
import { LitElement } from "lit";

import { AuroDropdown } from "./auro-dropdown.js";


export class MySelect extends LitElement {
  constructor() {
    super();

    this.value = undefined;
  }

  // function to define props used within the scope of this component
  static get properties() {

    return {
      value: {
        type: String,
        reflect: true
      }
    };
  }

  configureBibContent() {
    try {
      this.inputElement = this.dropdown.bibContent.querySelector('#selectInput');

      this.inputElement.addEventListener('input', (event) => {
        this.value = event.target.value;
      });
    } catch (error) {
      // console.error('error', error);
    }
  }

  firstUpdated() {
    this.dropdown = this.shadowRoot.querySelector('auro-dropdown');

    this.dropdown.onSlotChange = () => {
      this.configureBibContent();
    };
  }

  updated(changedProperties) {
    if (changedProperties.has('value')) {
      console.warn('select.value updated to', this.value);
    }
  }

  // function that renders the HTML and CSS into  the scope of the component
  render() {
    return html`
      <div>
        <auro-dropdown>
          <div slot="trigger">
            test
            <button>select button</button>
            <input />
          </div>
          <div>
            <input id="selectInput" value="Select Input Value" />
          </div>
        </auro-dropdown>
      </div>
    `;
  }
}

// default internal definition
if (!customElements.get("my-select")) {
  customElements.define("my-select", MySelect);
}

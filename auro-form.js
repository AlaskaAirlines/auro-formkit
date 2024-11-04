// Copyright (c) 2020 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

import { LitElement } from "lit";

// ---------------------------------------------------------------------

/* eslint-disable complexity, lit/binding-positions, lit/no-invalid-html */

// build the component class
export class AuroForm extends LitElement {
  constructor() {
    super();
    console.log('auro-form mounted');
  }
}

// default internal definition
if (!customElements.get("auro-form")) {
  customElements.define("auro-form", AuroForm);
}

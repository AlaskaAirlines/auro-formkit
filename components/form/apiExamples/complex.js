/* eslint-disable jsdoc/require-jsdoc */

/**
 * Displays the collected value of the complex booking form on submit, mirroring
 * the Disabled Fields example. Every field in this form — including the cabin
 * radio group — is collected into `form.value` automatically by `auro-form`; no
 * per-field wiring is needed.
 */
export async function complexExample() {
  await customElements.whenDefined('auro-form');

  const form = document.querySelector('#bookingForm');
  if (!form) {
    throw new Error('complexExample: #bookingForm not yet rendered');
  }

  const output = document.querySelector('#bookingFormOutput');
  if (!output) {
    throw new Error('complexExample: #bookingFormOutput not yet rendered');
  }

  await form.updateComplete;

  form.addEventListener('submit', (event) => {
    output.textContent = JSON.stringify(event.detail.value, null, 2);
  });
}

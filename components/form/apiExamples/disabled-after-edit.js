export async function disableAfterEditExample() {
  await customElements.whenDefined('auro-form');

  const form = document.querySelector('#disableAfterEditForm');
  const output = document.querySelector('#disableAfterEditOutput');
  const field = document.querySelector('#dae-field');
  const toggle = document.querySelector('#dae-toggle');

  if (!form || !output || !field || !toggle) {
    throw new Error('disableAfterEditExample: required nodes not yet rendered');
  }

  await form.updateComplete;

  toggle.addEventListener('click', () => {
    const willDisable = !field.hasAttribute('disabled');
    if (willDisable) {
      field.setAttribute('disabled', '');
      toggle.textContent = 'Enable field';
    } else {
      field.removeAttribute('disabled');
      toggle.textContent = 'Disable field';
    }
  });

  form.addEventListener('submit', (event) => {
    output.textContent = [
      'submit payload:',
      JSON.stringify(event.detail.value, null, 2),
      '',
      `form.isInitialState: ${form.isInitialState}`,
    ].join('\n');
  });
}

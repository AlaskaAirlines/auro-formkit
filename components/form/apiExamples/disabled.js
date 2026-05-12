export async function disabledExample() {
  await customElements.whenDefined('auro-form');

  const form = document.querySelector('#disabledExampleForm');
  const output = document.querySelector('#disabledExampleOutput');

  if (!form || !output) {
    throw new Error('disabledExample: required nodes not yet rendered');
  }

  await form.updateComplete;

  form.addEventListener('submit', (event) => {
    output.textContent = JSON.stringify(event.detail.value, null, 2);
  });
}

export function valueExample() {
  const valueExample = document.querySelector('#valueExample');

  valueExample.value = '["arrival"]';

  document.querySelector('#validValueExampleBtn').addEventListener('click', () => {
    valueExample.value = '["arrival", "prefer alaska"]';
  });

  document.querySelector('#invalidValueExampleBtn').addEventListener('click', () => {
    valueExample.value = '["flight course"]';
  });
}

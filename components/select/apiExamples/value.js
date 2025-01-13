export function valueExample() {
  const valueExample = document.querySelector('#valueExample');

  document.querySelector('#validValueExampleBtn').addEventListener('click', () => {
    valueExample.value = ['arrival'];
    console.log(valueExample.value);
  });

  document.querySelector('#invalidValueExampleBtn').addEventListener('click', () => {
    valueExample.value = ['flight course'];
    console.log(valueExample.value);
  });
}

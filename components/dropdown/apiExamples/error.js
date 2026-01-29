export function errorExample() {
  const btn = document.querySelector('#errorButton');
  const dropdown = document.querySelector('#error');

  btn?.addEventListener('click', () => {
    dropdown?.hide();
  });
}

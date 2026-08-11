export function errorExample() {
  const btn = document.querySelector('#errorButton');
  const dropdown = document.querySelector('#errorDropdownExample');

  btn.addEventListener('click', () => {
    dropdown.hide();
  });
}

export function matchWidthExample() {
  const btn = document.querySelector('#matchWidthButton');
  const dropdown = document.querySelector('#matchWidthDropdownExample');

  btn.addEventListener('click', () => {
    dropdown.hide();
  });
}

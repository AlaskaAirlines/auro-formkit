export function matchWidthExample() {
  const btn = document.querySelector('#matchWidthButton');
  const dropdown = document.querySelector('#matchWidth');

  btn?.addEventListener('click', () => {
    dropdown?.hide();
  });
}

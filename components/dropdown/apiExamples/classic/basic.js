export function classicExample() {
  const btn = document.querySelector('#classicButton');
  const dropdown = document.querySelector('#classic');

  btn?.addEventListener('click', () => {
    dropdown?.hide();
  });
}

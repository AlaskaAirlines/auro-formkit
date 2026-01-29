export function classicInverseExample() {
  const btn = document.querySelector('#classicInverseButton');
  const dropdown = document.querySelector('#classicInverse');

  btn?.addEventListener('click', () => {
    dropdown?.hide();
  });
}

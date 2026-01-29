export function inverseErrorExample() {
  const btn = document.querySelector('#inverseErrorButton');
  const dropdown = document.querySelector('#inverseError');

  btn?.addEventListener('click', () => {
    dropdown?.hide();
  });
}

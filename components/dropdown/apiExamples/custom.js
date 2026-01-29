export function customExample() {
  const btn = document.querySelector('#customCommonButton');
  const dropdown = document.querySelector('#customCommon');

  btn?.addEventListener('click', () => {
    dropdown?.hide();
  });
}

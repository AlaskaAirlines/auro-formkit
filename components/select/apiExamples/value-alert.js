export function valueAlertExample() {
  const select = document.querySelector('#valueAlert');
  const menu = document.querySelector('#valueAlertMenu');

  menu.addEventListener('auroMenu-selectedOption', () => {
    console.warn('Select value changed to:', select.value);
    console.warn('Select optionSelected changed to:', select.optionSelected);
  });
}

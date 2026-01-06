export function setupExternalSelectionExample() {
  const combobox = document.getElementById('externalSelectionExample');

  combobox.addEventListener('input', () => {
    const matchingMenuOption = 2;
    combobox.updateActiveOption(matchingMenuOption);
  });
}

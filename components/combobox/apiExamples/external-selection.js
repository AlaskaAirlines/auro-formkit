export function setupExternalSelectionExample() {
  const combobox = document.getElementById('externalSelectionExample');
  const iataCodes = ['sea', 'lax', 'jfk', 'ord', 'sfo'];

  combobox.addEventListener('input', () => {
    const input = combobox.inputValue?.toLowerCase();
    const matchIndex = iataCodes.indexOf(input);

    if (matchIndex !== -1) {
      combobox.updateActiveOption(matchIndex);
    }
  });
}

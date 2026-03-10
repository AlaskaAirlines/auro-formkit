export function updateActiveOptionExample() {
  const select = document.getElementById('updateActiveOptionExample');
  const dropdown = select.dropdown;

  dropdown.addEventListener('auroDropdown-toggled', () => {
    if (dropdown.isPopoverVisible) {
      select.updateActiveOption(2); // Set the active option to the third item (index 2)
    }
  });
}

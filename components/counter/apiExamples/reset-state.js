export function resetStateExample() {
  const group = document.querySelector('#resetStateGroup');

  document.querySelector('#resetStateBtn').addEventListener('click', () => {
    // Clears every counter in the group back to its min value.
    group.reset();
  });
}

export function auroMenuPersistentExample() {
  const input = document.querySelector('#persistentExampleInput');
  const menu = document.querySelector('#persistentExampleMenu');

  if (!input || !menu) {
    return;
  }

  input.addEventListener('keyup', () => {
    menu.matchWord = input.value;
  });
}

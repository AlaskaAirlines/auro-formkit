export function auroMenuPersistentExample() {
  const input = document.querySelector('#persistentExampleInput');
  const menu = document.querySelector('#persistentExampleMenu');

  input.addEventListener('keyup', () => {
    menu.matchWord = input.value;
  });
}

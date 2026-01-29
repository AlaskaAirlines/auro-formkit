export function fullscreenBreakpointExample() {
  const btn = document.querySelector('#fullscreenButton');
  const dropdown = document.querySelector('#fullscreen');

  btn?.addEventListener('click', () => {
    dropdown?.hide();
  });
}

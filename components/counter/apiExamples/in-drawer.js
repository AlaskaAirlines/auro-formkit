export function inDrawerExample() {
  document.querySelector("#counter-drawer-opener").addEventListener("click", () => {
    const drawer = document.querySelector("#counter-drawer");
    if (drawer.hasAttribute('open')) {
      drawer.removeAttribute('open');
    } else {
      drawer.setAttribute('open', true);
    }
  });
};

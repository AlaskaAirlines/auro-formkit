export function inDrawerExample() {
  document.querySelector("#select-drawer-opener").addEventListener("click", () => {
    const drawer = document.querySelector("#select-drawer");

    if (drawer.hasAttribute('open')) {
      drawer.removeAttribute('open');
    } else {
      drawer.setAttribute('open', true);
    }
  });
};

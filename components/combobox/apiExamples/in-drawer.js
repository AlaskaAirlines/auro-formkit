export function inDrawerExample() {
  document.querySelector("#combobox-drawer-opener").addEventListener("click", () => {
    const drawer = document.querySelector("#combobox-drawer");
    if (drawer.hasAttribute('open')) {
      drawer.removeAttribute('open');
    } else {
      drawer.setAttribute('open', true);
    }
  });
};

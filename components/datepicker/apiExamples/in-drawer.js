export function inDrawerExample() {
  document.querySelector("#datepicker-drawer-opener").addEventListener("click", () => {
    const drawer = document.querySelector("#datepicker-drawer");
    if (drawer.hasAttribute('open')) {
      drawer.removeAttribute('open');
    } else {
      drawer.setAttribute('open', true);
    }
  });
};

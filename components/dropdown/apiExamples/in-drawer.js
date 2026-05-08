export function inDrawerExample() {
  const openBtn = document.querySelector("#dropdown-drawer-opener");
  const closeBtn = document.querySelector("#in-drawer-dismiss-btn");
  const dropdown = document.querySelector("#in-drawer-dropdown");

  openBtn?.addEventListener("click", () => {
    const drawer = document.querySelector("#dropdown-drawer");
    if (drawer.hasAttribute('open')) {
      drawer.removeAttribute('open');
    } else {
      drawer.setAttribute('open', true);
    }
  });

  closeBtn?.addEventListener("click", () => {
    dropdown?.hide();
  });
};

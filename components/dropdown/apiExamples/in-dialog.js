export function inDialogExample() {
  const openBtn = document.querySelector("#dropdown-dialog-opener");
  const closeBtn = document.querySelector("#in-dialog-dismiss-btn");
  const dropdown = document.querySelector("#in-dialog-dropdown");

  openBtn?.addEventListener("click", () => {
    const dialog = document.querySelector("#dropdown-dialog");
    dialog.open = true;
  });

  closeBtn?.addEventListener("click", () => {
    dropdown?.hide();
  });
};

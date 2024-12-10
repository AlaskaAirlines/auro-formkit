export function inDialogExample() {
  document.querySelector("#dropdown-dialog-opener").addEventListener("click", () => {
    const dialog = document.querySelector("#dropdown-dialog");
    dialog.open = true;
  });
};

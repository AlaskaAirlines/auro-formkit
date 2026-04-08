export function inDialogExample() {
  document.querySelector("#counter-dialog-opener").addEventListener("click", () => {
    const dialog = document.querySelector("#counter-dialog");
    dialog.open = true;
  });
};

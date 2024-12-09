export function inDialogExample() {
  document.querySelector("#select-dialog-opener").addEventListener("click", () => {
    const dialog = document.querySelector("#select-dialog");
    dialog.open = true;
  });
};
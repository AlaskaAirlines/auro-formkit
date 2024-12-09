export function inDialogExample() {
  document.querySelector("#combobox-dialog-opener").addEventListener("click", () => {
    const dialog = document.querySelector("#combobox-dialog");
    dialog.open = true;
  });
};
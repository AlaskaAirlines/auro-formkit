export function inDialogExample() {
  document.querySelector("#datepicker-dialog-opener").addEventListener("click", () => {
    const dialog = document.querySelector("#datepicker-dialog");
    dialog.open = true;
  });
};

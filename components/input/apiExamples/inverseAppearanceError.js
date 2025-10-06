export function customErrorOnDark() {
  const elem = document.querySelector('#setCustomErrorExampleOnDark');
  // set custom error
  document.querySelector('#setCustomErrorBtnOnDark').addEventListener('click', () => {
    elem.error = "Custom Error Message";
  });

  // remove custom error
  document.querySelector('#setCustomErrorClearBtnOnDark').addEventListener('click', () => {
    elem.removeAttribute('error');
  });
}

export function valueTextExample() {
  const onValueTextSelectInput = (e) => {
    const valueText = e.target.querySelector("[slot=valueText]");

    valueText.textContent = e.detail.optionSelected.dataset.display;
  };

  const select = document.querySelector("#valueTextExample");
  select.addEventListener('input', onValueTextSelectInput);
}

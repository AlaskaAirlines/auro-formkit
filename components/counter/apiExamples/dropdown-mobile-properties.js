export function dropdownCounterExample() {
  const elem = document.querySelector('#dropdownCouterExample');
  const resetBtn = elem.querySelector("#dropdownCounterExampleResetbutton") || elem.dropdown.bib.querySelector("#dropdownCounterExampleResetbutton");
  const saveBtn = elem.querySelector("#dropdownCounterExampleSavebutton") || elem.dropdown.bib.querySelector("#dropdownCounterExampleSavebutton");

  resetBtn.addEventListener('click', () => {
    elem.counters.forEach(counter => {
      counter.value = 0;
    });
  });

  saveBtn.addEventListener('click', () => {
    elem.dropdown.hide();
  });
}

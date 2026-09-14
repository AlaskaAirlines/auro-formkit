export function dropdownCounterExample() {
  const elem = document.querySelector('#dropdownCouterExample');

  // Content slotted into `bib.fullscreen.footer` is relocated into the bib
  // template, so the buttons are no longer in the counter group's light DOM.
  const findButton = (id) => elem.querySelector(`#${id}`) || elem.bibtemplate?.querySelector(`#${id}`);

  const resetBtn = findButton("dropdownCounterExampleResetbutton");
  const saveBtn = findButton("dropdownCounterExampleSavebutton");

  resetBtn.addEventListener('click', () => {
    elem.counters.forEach(counter => {
      counter.value = 0;
    });
  });

  saveBtn.addEventListener('click', () => {
    elem.dropdown.hide();
  });
}

function toIso(date) {
  /* eslint-disable no-magic-numbers */
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  /* eslint-enable no-magic-numbers */
  return `${yyyy}-${mm}-${dd}`;
}

export function updateMinDateExample() {
  const minDateExample = document.getElementById('minDateExample');
  const changeMinDateButton = document.getElementById('minDateChange');
  const resetButton = document.getElementById('resetMinDate');

  const today = toIso(new Date());

  let nextWeek = new Date();
  // eslint-disable-next-line no-magic-numbers
  nextWeek.setDate(nextWeek.getDate() + 7);
  nextWeek = toIso(nextWeek);

  minDateExample.setAttribute('value', today);
  minDateExample.setAttribute('minDate', today);

  changeMinDateButton.addEventListener('click', () => {
    minDateExample.setAttribute('minDate', nextWeek);
  });

  resetButton.addEventListener('click', () => {
    minDateExample.setAttribute('value', today);
    minDateExample.setAttribute('minDate', today);
  });
}

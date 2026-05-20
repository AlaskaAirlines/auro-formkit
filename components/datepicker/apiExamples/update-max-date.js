function toIso(date) {
  /* eslint-disable no-magic-numbers */
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  /* eslint-enable no-magic-numbers */
  return `${yyyy}-${mm}-${dd}`;
}

export function updateMaxDateExample() {
  const maxDateExample = document.getElementById('maxDateExample');
  const changeMaxDateButton = document.getElementById('maxDateChange');
  const resetButton = document.getElementById('resetMaxDate');

  const today = toIso(new Date());

  let nextWeek = new Date();
  // eslint-disable-next-line no-magic-numbers
  nextWeek.setDate(nextWeek.getDate() + 7);
  nextWeek = toIso(nextWeek);

  maxDateExample.setAttribute('value', nextWeek);
  maxDateExample.setAttribute('maxDate', nextWeek);

  changeMaxDateButton.addEventListener('click', () => {
    maxDateExample.setAttribute('maxDate', today);
  });

  resetButton.addEventListener('click', () => {
    maxDateExample.setAttribute('value', nextWeek);
    maxDateExample.setAttribute('maxDate', nextWeek);
  });
}

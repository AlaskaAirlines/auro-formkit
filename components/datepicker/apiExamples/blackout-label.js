export function blackoutLabelExample() {
  const blackoutDP = document.querySelector('#blackoutLabelExample');

  function formatMMDDYYYY(date) {
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${mm}/${dd}/${date.getFullYear()}`;
  }

  function setup() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Set min to 1 week before today, max to 1 week after today
    const minDate = new Date(today);
    minDate.setDate(today.getDate() - 7);

    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 7);

    blackoutDP.setAttribute('minDate', formatMMDDYYYY(minDate));
    blackoutDP.setAttribute('maxDate', formatMMDDYYYY(maxDate));

    // Generate all dates within the min/max range
    const blackoutDates = [];

    for (let d = new Date(minDate); d <= maxDate; d.setDate(d.getDate() + 1)) {
      const current = new Date(d);
      const mm = String(current.getMonth() + 1).padStart(2, '0');
      const dd = String(current.getDate()).padStart(2, '0');
      const yyyy = current.getFullYear();
      const slotDateStr = `${mm}_${dd}_${yyyy}`;

      // Randomly mark ~30% of dates as blackout
      const isSoldOut = Math.random() < 0.3;

      if (isSoldOut) {
        blackoutDates.push(current.toISOString().split('T')[0]);

        const popover = document.createElement('span');
        popover.setAttribute('slot', `popover_${slotDateStr}`);
        popover.textContent = 'There are no tickets available for this date.';
        blackoutDP.appendChild(popover);
      } else {
        const price = Math.floor(Math.random() * 400) + 100;

        const dateSlot = document.createElement('span');
        dateSlot.setAttribute('slot', `date_${slotDateStr}`);
        dateSlot.textContent = `$${price}`;
        blackoutDP.appendChild(dateSlot);
      }
    }

    blackoutDP.blackoutDates = blackoutDates;
  }

  setup();
}

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

      // Mark every 3rd date as blackout (deterministic pattern)
      const dayOfMonth = current.getDate();
      const isSoldOut = dayOfMonth % 3 === 0;

      if (isSoldOut) {
        blackoutDates.push(current.toISOString().split('T')[0]);

        const popover = document.createElement('span');
        popover.setAttribute('slot', `popover_${slotDateStr}`);
        popover.textContent = 'There are no tickets available for this date.';
        blackoutDP.appendChild(popover);
      } else {
        // Use a fixed price based on day of month for deterministic output
        const price = 150 + (dayOfMonth * 17) % 400;

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

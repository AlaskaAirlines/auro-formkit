export function blackoutLabelExample() {
  const blackoutDP = document.querySelector('#blackoutLabelExample');

  function formatISO(date) {
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${date.getFullYear()}-${mm}-${dd}`;
  }

  function setup() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calendar starts 6 months in the future
    const startDate = new Date(today);
    startDate.setMonth(today.getMonth() + 6);

    // Calendar ends 12 months in the future
    const endDate = new Date(today);
    endDate.setMonth(today.getMonth() + 12);

    // Min date is 2 months after the start date
    const minDate = new Date(startDate);
    minDate.setMonth(startDate.getMonth() + 2);

    // Max date is 75 days after min date
    const maxDate = new Date(minDate);
    maxDate.setDate(minDate.getDate() + 75);

    blackoutDP.setAttribute('calendarStartDate', formatISO(startDate));
    blackoutDP.setAttribute('calendarEndDate', formatISO(endDate));
    blackoutDP.setAttribute('minDate', formatISO(minDate));
    blackoutDP.setAttribute('maxDate', formatISO(maxDate));

    // Generate all dates within the min/max range
    const blackoutDates = [];

    for (let d = new Date(minDate); d <= maxDate; d.setDate(d.getDate() + 1)) {
      const current = new Date(d);
      const mm = String(current.getMonth() + 1).padStart(2, '0');
      const dd = String(current.getDate()).padStart(2, '0');
      const yyyy = current.getFullYear();
      const slotDateStr = `${yyyy}_${mm}_${dd}`;

      // Mark every 3rd date as blackout (deterministic pattern)
      const dayOfMonth = current.getDate();
      const isSoldOut = dayOfMonth % 3 === 0;

      if (isSoldOut) {
        blackoutDates.push(`${yyyy}-${mm}-${dd}`);

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

// Per-day decoration data (fares, sold-out indicators) keyed by ISO date string.
// Replaces the legacy `date_MM_DD_YYYY` / `popover_MM_DD_YYYY` slot system.
const decorations = {
  '2023-12-01': { label: 'Sold', ariaLabel: 'Tickets for this date are sold out' },
  '2023-12-02': { label: 'Sold', ariaLabel: 'Tickets for this date are sold out' },
  '2023-12-03': { label: 'Sold', ariaLabel: 'Tickets for this date are sold out' },
  '2023-12-04': { label: 'Sold', ariaLabel: 'Tickets for this date are sold out' },
  '2023-12-05': { label: 'Sold', ariaLabel: 'Tickets for this date are sold out' },
  '2023-12-06': { label: 'Sold', ariaLabel: 'Tickets for this date are sold out' },
  '2023-12-07': { label: 'Sold', ariaLabel: 'Tickets for this date are sold out' },
  '2023-12-08': { label: 'Sold', ariaLabel: 'Tickets for this date are sold out' },
  '2023-12-09': { label: 'Sold', ariaLabel: 'Tickets for this date are sold out' },
  '2023-12-10': { label: 'Sold', ariaLabel: 'Tickets for this date are sold out' },
  '2023-12-11': { label: 'Sold', ariaLabel: 'Tickets for this date are sold out' },
  '2023-12-12': { label: 'Sold', ariaLabel: 'Tickets for this date are sold out' },
  '2023-12-13': { label: '$560', ariaLabel: 'Tickets for this date are $560' },
  '2023-12-14': { label: '$89', ariaLabel: 'Tickets for this date are $89', parts: ['highlight'] },
  '2023-12-15': { label: '$100', ariaLabel: 'Tickets for this date are $100' },
  '2023-12-16': { label: '$2345', ariaLabel: 'Tickets for this date are $2345' },
  '2023-12-17': { label: '$2345', ariaLabel: 'Tickets for this date are $2345' },
  '2023-12-18': { label: '$2345', ariaLabel: 'Tickets for this date are $2345' },
  '2023-12-19': { label: '$2345', ariaLabel: 'Tickets for this date are $2345' },
  '2023-12-20': { label: '$2345', ariaLabel: 'Tickets for this date are $2345' },
  '2024-01-14': { label: '$83', ariaLabel: 'Tickets for this date are $83', parts: ['highlight'] },
  '2024-01-15': { label: '$203', ariaLabel: 'Tickets for this date are $203' },
  '2024-01-16': { label: '$4444', ariaLabel: 'Tickets for this date are $4444' },
  '2024-01-17': { label: '$83', ariaLabel: 'Tickets for this date are $83', parts: ['highlight'] },
  '2024-01-18': { label: '$96', ariaLabel: 'Tickets for this date are $96', parts: ['highlight'] },
  '2024-01-19': { label: 'Sold', ariaLabel: 'Tickets for this date are sold out' },
  '2024-01-20': { label: 'Sold', ariaLabel: 'Tickets for this date are sold out' }
};

function toIsoLocal(date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export function populateDayDecorationsExample() {
  const example = document.querySelector('#dayDecorationsExample');

  example.dayDecorations = (date) => decorations[toIsoLocal(date)] || null;
}

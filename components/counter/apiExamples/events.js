export function eventCounterExample() {
  const counter = document.getElementById('eventExample');
  const output = document.getElementById('eventOutput');

  counter.addEventListener('input', (event) => {
    output.textContent = `Values updated: ${JSON.stringify(event.detail)}`;
  });
}

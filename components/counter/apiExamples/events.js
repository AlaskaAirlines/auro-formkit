export function eventCounterExample() {
  const counter = document.getElementById('eventExample');

  counter.addEventListener('input', (event) => {
    console.log(`Values updated: ${JSON.stringify(event.detail)}`);
  });
}

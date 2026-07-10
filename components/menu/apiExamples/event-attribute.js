export function auroMenuEventAttributeExample() {
  const menu = document.querySelector('#eventAttrExample');
  const output = document.querySelector('#eventAttrOutput');

  menu.addEventListener('auroMenu-customEventFired', (evt) => {
    const eventName = evt.detail.option.getAttribute('event');
    output.textContent = `${eventName} (from "${evt.detail.option.textContent}")`;
  });
}

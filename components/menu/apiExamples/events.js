export function auroMenuEventsExample() {
  const menu = document.querySelector('#eventsExampleMenu');
  const log = document.querySelector('#eventsExampleLog');
  const resetBtn = document.querySelector('#eventsExampleReset');
  const badValueBtn = document.querySelector('#eventsExampleBadValue');
  const clearBtn = document.querySelector('#eventsExampleClearLog');

  let entries = [];
  const write = (name, detail) => {
    const label = detail && detail.tagName ? detail.tagName.toLowerCase() : JSON.stringify(detail);
    entries.unshift(`${name}: ${label}`);
    log.textContent = entries.slice(0, 10).join('\n');
  };

  menu.addEventListener('auroMenu-selectedOption', () => {
    write('auroMenu-selectedOption', menu.optionSelected);
  });
  menu.addEventListener('auroMenu-activatedOption', (evt) => {
    write('auroMenu-activatedOption', evt.detail);
  });
  menu.addEventListener('auroMenu-optionsChange', (evt) => {
    write('auroMenu-optionsChange', { count: (evt.detail.options || []).length });
  });
  menu.addEventListener('auroMenu-selectValueReset', () => {
    write('auroMenu-selectValueReset', { value: menu.value });
  });
  menu.addEventListener('auroMenu-selectValueFailure', (evt) => {
    write('auroMenu-selectValueFailure', evt.detail);
  });

  resetBtn.addEventListener('click', () => menu.reset());
  badValueBtn.addEventListener('click', () => menu.selectByValue('nonexistent'));
  clearBtn.addEventListener('click', () => {
    entries = [];
    log.textContent = '(interact with the menu above)';
  });
}

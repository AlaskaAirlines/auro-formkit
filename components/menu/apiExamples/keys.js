export function initKeysExample() {
  const menu = document.getElementById('keys-menu');
  const stopsButton = document.getElementById('stopsButton');
  const stopsTopButton = document.getElementById('stopsTopButton');
  const output = document.getElementById('output');

  const createConsoleEntry = (message) => {
    const node = document.createElement('span');
    node.innerHTML = message;
    output.appendChild(node);
    output.appendChild(document.createElement('br'));
  };

  const resetConsole = () => {
    output.innerHTML = '';
  };

  const updateMenuValue = (value) => {
    resetConsole();
    createConsoleEntry(`Setting menu.value: <em>"${value}"</em>`);
    menu.value = '';
    menu.value = value;
    createConsoleEntry(`menu.value before next lifecycle: <em>"${menu.value}"</em>`);
    setTimeout(() => {
      createConsoleEntry(`menu.value after lifecycle: <em>"${menu.value}"</em>`);
    });
  };

  stopsButton.addEventListener('click', () => {
    updateMenuValue('stops');
  });

  stopsTopButton.addEventListener('click', () => {
    updateMenuValue('stops-top');
  });
};

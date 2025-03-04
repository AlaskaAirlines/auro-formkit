export function auroMenuLoadingExample() {
  const combobox = document.querySelector("#loadingExample");
  const menu = document.querySelector("#loadingExampleComboboxMenu");

  const emptyMenu = () => {
    const menuoptions = menu.querySelectorAll('auro-menuoption');
    menuoptions.forEach(mo => menu.removeChild(mo));
  }

  const fillMenu = () => {
    menu.innerHTML += `
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    `;
  }

  const load = () => {
    clearTimeout(load.id);
    emptyMenu();
    menu.setAttribute('loading', 'loading');
    load.id = setTimeout(() => {
      menu.removeAttribute('loading');
      fillMenu();
    }, 1000);

  }

  combobox.addEventListener("input", (e) => {
    if (e.target.value && e.target.value !== e.target.optionSelected?.textContent) {
      load();
    }
  });
}

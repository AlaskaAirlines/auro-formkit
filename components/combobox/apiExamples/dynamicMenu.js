// Javascript example file
// -----------------------
import { DynamicData } from './dynamicMenuDataApi';

export function dynamicMenuExample() {
  // Resets the root menu
  function resetMenu(root) {
    root.setAttribute('loading', "true");
    while (root.firstChild) {
      root.removeChild(root.firstChild);
    }
  }

  // Generates HTML for menu and submenus using country & city data from an external API
  function generateHtml(data) {
    const initialMenu = document.querySelector('#initMenu');

    resetMenu(initialMenu);

    for (let index = 0; index < data.length; index++) {
      const country = data[index]['country'];
      const cities = data[index]['cities'];

      generateMenuOptionHtml(initialMenu, country, country.substring(0, 3).toUpperCase());

      for (let indexB = 0; indexB < cities.length; indexB++) {
        const subMenu = document.createElement('auro-menu');

        generateMenuOptionHtml(subMenu, cities[indexB], cities[indexB].substring(0, 3).toUpperCase());

        initialMenu.appendChild(subMenu);
      }
    };
    initialMenu.removeAttribute('loading');
    console.log('done loading');
  }

  // Helper function that generates HTML for menuoptions
  function generateMenuOptionHtml(menu, label, value) {
    const option = document.createElement('auro-menuoption');
    const displayValue = document.createElement('div');
    displayValue.setAttribute("slot", "displayValue");
    displayValue.innerHTML = value;

    option.value = value;
    option.innerHTML = label;
    menu.appendChild(option);
    option.appendChild(displayValue);
  }

  // Main javascript that runs all JS to create example
  const dynamicData = new DynamicData();
  const dynamicMenuExample = document.querySelector('#dynamicMenuExample');
  const dropdownEl = dynamicMenuExample.shadowRoot.querySelector(dynamicMenuExample.dropdownTag._$litStatic$);
  const inputEl = dropdownEl.querySelector(dynamicMenuExample.inputTag._$litStatic$);

  inputEl.addEventListener('input', () => {
    let data = dynamicData.getData();
    data = dynamicData.filterData(data, inputEl.value);

    generateHtml(data);
  });
}

// Javascript example file
// -----------------------
import { DynamicData } from './dynamicMenuDataApi';

export async function dynamicMenuExample() {
  // Resets the root menu
  function resetMenu(root) {
    while (root.firstChild) {
      root.removeChild(root.firstChild);
    }
  }

  function swapValues() {
    const elOne = document.querySelector('#dynamicMenuExample');
    const elTwo = document.querySelector('#dynamicMenuExampleTwo');

    const elOneValue = elOne.value;
    const elTwoValue = elTwo.value;

    const elOneInputValue = elOne.input.value;
    const elTwoInputValue = elTwo.input.value;

    elOne.reset();
    elTwo.reset();

    elOne.value = elTwoValue;
    elTwo.value = elOneValue;


    setTimeout(() => {
      console.warn('timeout executed ============================');
      elOne.typedValue = elTwoInputValue;
      elTwo.typedValue = elOneInputValue;
    }, 0);
  }

  document.querySelector('#dynamicMenuSwapButton').addEventListener('click', () => {
    swapValues();
  });

  // Generates HTML for menu and submenus using country & city data from an external API
  function generateHtml(data, selector) {
    const initialMenu = document.querySelector(selector);

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
  const dynamicMenuExampleEl = document.querySelector('#dynamicMenuExample');
  const dropdownEl = dynamicMenuExampleEl.shadowRoot.querySelector(dynamicMenuExampleEl.dropdownTag._$litStatic$);
  const inputEl = dropdownEl.querySelector(dynamicMenuExampleEl.inputTag._$litStatic$);

  inputEl.addEventListener('input', () => {
    let data = dynamicData.getData();
    data = dynamicData.filterData(data, inputEl.value);

    generateHtml(data, '#initMenu');
  });


  if (dynamicMenuExampleEl.value && dynamicMenuExampleEl.value.length > 0 && dynamicMenuExampleEl.input.value && (!dynamicMenuExampleEl.menu.availableOptions || dynamicMenuExampleEl.menu.availableOptions.length === 0)) {
    let data = dynamicData.getData();
    data = dynamicData.filterData(data, inputEl.value);
    generateHtml(data, '#initMenu');
  }

  const dynamicDataTwo = new DynamicData();
  const dynamicMenuExampleElTwo = document.querySelector('#dynamicMenuExample');
  const dropdownElTwo = dynamicMenuExampleElTwo.shadowRoot.querySelector(dynamicMenuExampleElTwo.dropdownTag._$litStatic$);
  const inputElTwo = dropdownElTwo.querySelector(dynamicMenuExampleElTwo.inputTag._$litStatic$);

  inputElTwo.addEventListener('input', () => {
    let data = dynamicDataTwo.getData();
    data = dynamicDataTwo.filterData(data, inputEl.value);

    generateHtml(data, '#initMenuTwo');
  });

  if (dynamicMenuExampleElTwo.value && dynamicMenuExampleElTwo.value.length > 0 && dynamicMenuExampleElTwo.input.value && (!dynamicMenuExampleElTwo.menu.availableOptions || dynamicMenuExampleElTwo.menu.availableOptions.length === 0)) {
    let data = dynamicDataTwo.getData();
    data = dynamicDataTwo.filterData(data, inputElTwo.value);
    generateHtml(data, '#initMenuTwo');
  }
}

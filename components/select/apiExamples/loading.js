export function auroSelectLoadingExample() {
  const categorySelect = document.querySelector('#loadingSelectCategory');
  const itemSelect = document.querySelector('#loadingSelectItem');
  const itemMenu = document.querySelector('#loadingSelectItemMenu');

  const options = {
    Fruit: ['Apples', 'Oranges', 'Peaches', 'Grapes', 'Cherries'],
    Vegetable: ['Carrots', 'Broccoli', 'Spinach', 'Peppers', 'Onions'],
    Protein: ['Chicken', 'Beef', 'Salmon', 'Tofu', 'Eggs'],
  };

  const emptyMenu = () => {
    const menuoptions = itemMenu.querySelectorAll('auro-menuoption');
    menuoptions.forEach(mo => itemMenu.removeChild(mo));
  };

  const fillMenu = (category) => {
    itemMenu.innerHTML += options[category]
      .map(item => `<auro-menuoption value="${item}">${item}</auro-menuoption>`)
      .join('');
  };

  const load = (category) => {
    clearTimeout(load.id);
    emptyMenu();
    itemSelect.removeAttribute('disabled');
    itemMenu.setAttribute('loading', 'loading');
    setTimeout(() => {
      itemSelect.showBib();
    });
    load.id = setTimeout(() => {
      itemMenu.removeAttribute('loading');
      fillMenu(category);
    }, 2 * 1000);
  };

  categorySelect.addEventListener('input', (e) => {
    if (e.detail.value) {
      load(e.detail.value);
    } else {
      clearTimeout(load.id);
      itemMenu.removeAttribute('loading');
      emptyMenu();
    }
  });
}

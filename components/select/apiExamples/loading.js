export function auroMenuLoadingExample() {
  const select = document.querySelector("#loadingExample");
  const menu = document.querySelector("#loadingExampleSelectMenu");

  const emptyMenu = () => {
    const menuoptions = menu.querySelectorAll('auro-menuoption');
    menuoptions.forEach(mo => menu.removeChild(mo));
  }

  const fillMenu = () => {
      menu.innerHTML += `
      <auro-menuoption value="stops">Stops</auro-menuoption>
      <auro-menuoption value="price">Price</auro-menuoption>
      <auro-menuoption value="duration">Duration</auro-menuoption>
      <auro-menuoption value="departure">Departure</auro-menuoption>
      <auro-menuoption value="arrival">Arrival</auro-menuoption>
      <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>`;
  }

  select.addEventListener("click", () => {
    if (!menu.hasAttribute('loading')) {
      emptyMenu();
      menu.setAttribute('loading', 'loading');
      setTimeout(() => {
        menu.removeAttribute('loading');
        fillMenu();
      }, 1000);
    }
  });
}

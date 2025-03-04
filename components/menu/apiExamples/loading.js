export function auroMenuLoadingExample() {
  document.querySelector("#loadingExampleToggleButton").addEventListener("click", () => {
    document.querySelectorAll("#loadingExampleTable auro-menu").forEach(menu => menu.toggleAttribute("loading"));
  });
}

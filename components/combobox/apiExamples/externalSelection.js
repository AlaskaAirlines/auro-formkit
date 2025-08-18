import { AuroCombobox } from "../src/auro-combobox";

/**
 * Sets up demo  external selection in the combobox.
 */
export function setupExternalSelectionExample() {

  /** @type {AuroCombobox} */
  const combobox = document.getElementById('externalSelectionExample');

  combobox.addEventListener('input', () => {
    // Perform whatever matching logic you need here

    // This comes from your custom code, for example matching SEA to SeaTac IATA code.
    // This matches "peaches" as configured.
    const matchingMenuOption = 2;
    combobox.updateActiveOption(matchingMenuOption);
  });
}

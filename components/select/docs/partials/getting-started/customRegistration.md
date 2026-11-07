<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../../docs/partials/customRegistrationDescription.md) -->
<!-- AURO-GENERATED-CONTENT:END -->

```js
// Import the classes
import { AuroSelect } from '@aurodesignsystem/auro-formkit/auro-select/class';
import { AuroMenu, AuroMenuOption } from '@aurodesignsystem/auro-formkit/auro-menu/class';

// Register each component with a custom name
AuroSelect.register('[custom]-select');
AuroMenu.register('[custom]-menu');
AuroMenuOption.register('[custom]-menuoption');
```

The `<auro-menu>` and `<auro-menuoption>` components must also be custom registered when using a custom `<auro-select>` registration. All three components work together and need to be registered under the same custom naming convention.

This creates new custom elements that behave exactly like their standard counterparts, allowing both to coexist on the same page without interfering with each other.

```html
<custom-select placeholder="Placeholder text" id="custom-select">
  <span slot="bib.fullscreen.headline">Bib headline</span>
  <span slot="label">Label</span>
  <custom-menu>
    <custom-menuoption value="stops">Stops</custom-menuoption>
    <custom-menuoption value="price">Price</custom-menuoption>
    <custom-menuoption value="duration">Duration</custom-menuoption>
    <custom-menuoption value="departure">Departure</custom-menuoption>
    <custom-menuoption value="arrival">Arrival</custom-menuoption>
    <custom-menuoption value="prefer alaska">Prefer Alaska</custom-menuoption>
  </custom-menu>
</custom-select>
```

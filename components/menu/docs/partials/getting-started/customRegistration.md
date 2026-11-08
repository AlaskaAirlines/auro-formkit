Every Auro component has two key parts: the <auro-hyperlink href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes" target="_blank">class</auro-hyperlink> and the custom element definition. The class defines the component's behavior, while the custom element registers it under a specific name so it can be used in HTML.

Import only the component classes and call each one's `register(name)` method with a unique name:

```js
// Import the class only
import { AuroMenu, AuroMenuOption } from '@aurodesignsystem/auro-formkit/auro-menu/class';

// Register with a custom name if desired
AuroMenu.register('[custom]-menu');
AuroMenuOption.register('[custom]-menuoption');
```

This creates the custom elements `<custom-menu>` and `<custom-menuoption>`, which behave exactly like `<auro-menu>` and `<auro-menuoption>` and can be used on the same page without interfering with each other.

```html
<custom-menu>
  <custom-menuoption value="stops">Stops</custom-menuoption>
  <custom-menuoption value="price">Price</custom-menuoption>
  <custom-menuoption value="duration">Duration</custom-menuoption>
  <custom-menuoption value="departure">Departure</custom-menuoption>
  <custom-menuoption value="arrival">Arrival</custom-menuoption>
</custom-menu>
```

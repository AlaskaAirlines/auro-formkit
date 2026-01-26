## Custom Component Registration for Version Management

There are two key parts to every Auro component: the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes">class</a> and the custom element definition. The class defines the component’s behavior, while the custom element registers it under a specific name so it can be used in HTML.

When you install the component as described on the `Install` page, the class is imported automatically, and the component is registered globally for you.

However, if you need to load multiple versions of the same component on a single page (for example, when two projects depend on different versions), you can manually register the class under a custom element name to avoid conflicts.

You can do this by importing only the component class and using the `register(name)` method with a unique name:

```js
// Import the class only
import { AuroMenu, AuroMenuOption } from '@aurodesignsystem/auro-formkit/auro-menu/class';

// Register with a custom name if desired
AuroMenu.register('custom-menu');
AuroMenuOption.register('custom-menu-option');
```

This will create a new custom element `<custom-menu>` and `<custom-menu-option>` that behaves exactly like `<auro-menu>` and `<auro-menu-option>`, allowing both to coexist on the same page without interfering with each other.

<div class="exampleWrapper exampleWrapper--flex">
  <custom-menu>
    <custom-menuoption value="stops">Stops</custom-menuoption>
    <custom-menuoption value="price">Price</custom-menuoption>
    <custom-menuoption value="duration">Duration</custom-menuoption>
    <custom-menuoption value="departure">Departure</custom-menuoption>
    <custom-menuoption value="arrival">Arrival</custom-menuoption>
  </custom-menu>
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

```html
  <custom-menu>
    <custom-menuoption value="stops">Stops</custom-menuoption>
    <custom-menuoption value="price">Price</custom-menuoption>
    <custom-menuoption value="duration">Duration</custom-menuoption>
    <custom-menuoption value="departure">Departure</custom-menuoption>
    <custom-menuoption value="arrival">Arrival</custom-menuoption>
  </custom-menu>
```
</auro-accordion>

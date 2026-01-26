## Custom Component Registration for Version Management

There are two key parts to every Auro component: the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes">class</a> and the custom element definition. The class defines the component’s behavior, while the custom element registers it under a specific name so it can be used in HTML.

When you install the component as described on the `Install` page, the class is imported automatically, and the component is registered globally for you.

However, if you need to load multiple versions of the same component on a single page (for example, when two projects depend on different versions), you can manually register the class under a custom element name to avoid conflicts.

You can do this by importing only the component class and using the `register(name)` method with a unique name:

```js
// Import the class only
import { AuroRadio, AuroRadioGroup } from '@aurodesignsystem/auro-formkit/auro-radio/class';

// Register with a custom name if desired
AuroRadio.register('custom-radio');
AuroRadioGroup.register('custom-radio-group');
```

This will create a new custom element `<custom-radio>` and `<custom-radio-group>` that behaves exactly like `<auro-radio>` and `<auro-radio-group>`, allowing both to coexist on the same page without interfering with each other.

<div class="exampleWrapper exampleWrapper--flex">
  <custom-radio-group>
    <span slot="legend">Form label goes here</span>
    <custom-radio id="customRadio1" label="Yes" name="radioDemo" value="yes"></custom-radio>
    <custom-radio id="customRadio2" label="No" name="radioDemo" value="no"></custom-radio>
    <custom-radio id="customRadio3" label="Maybe" name="radioDemo" value="maybe"></custom-radio>
  </custom-radio-group>
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

```html
  <custom-radio-group>
    <span slot="legend">Form label goes here</span>
    <custom-radio id="customRadio1" label="Yes" name="radioDemo" value="yes"></custom-radio>
    <custom-radio id="customRadio2" label="No" name="radioDemo" value="no"></custom-radio>
    <custom-radio id="customRadio3" label="Maybe" name="radioDemo" value="maybe"></custom-radio>
  </custom-radio-group>
```
</auro-accordion>

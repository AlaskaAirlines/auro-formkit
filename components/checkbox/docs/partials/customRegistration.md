## Custom Component Registration for Version Management

There are two key parts to every Auro component: the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes">class</a> and the custom element definition. The class defines the component’s behavior, while the custom element registers it under a specific name so it can be used in HTML.

When you install the component as described on the `Install` page, the class is imported automatically, and the component is registered globally for you.

However, if you need to load multiple versions of the same component on a single page (for example, when two projects depend on different versions), you can manually register the class under a custom element name to avoid conflicts.

You can do this by importing only the component class and using the `register(name)` method with a unique name:

```js
// Import the class only
import { AuroCheckbox, AuroCheckboxGroup } from '@aurodesignsystem/auro-formkit/auro-checkbox/class';

// Register with a custom name if desired
AuroCheckbox.register('custom-checkbox');
AuroCheckboxGroup.register('custom-checkbox-group');
```

This will create a new custom element `<custom-checkbox>` and `<custom-checkbox-group>` that behaves exactly like `<auro-checkbox>` and `<auro-checkbox-group>`, allowing both to coexist on the same page without interfering with each other.

<div class="exampleWrapper exampleWrapper--flex">
  <custom-checkbox-group>
    <span slot="legend">Form label goes here</span>
    <custom-checkbox value="value1" name="custom" id="checkbox-custom1">Custom checkbox option</custom-checkbox>
    <custom-checkbox value="value2" name="custom" id="checkbox-custom2" checked>Custom checkbox option</custom-checkbox>
    <custom-checkbox value="value3" name="custom" id="checkbox-custom3">Custom checkbox option</custom-checkbox>
    <custom-checkbox value="value4" name="custom" id="checkbox-custom4">Custom checkbox option</custom-checkbox>
  </custom-checkbox-group>
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

```html
  <custom-checkbox-group>
    <span slot="legend">Form label goes here</span>
    <custom-checkbox value="value1" name="custom" id="checkbox-custom1">Custom checkbox option</custom-checkbox>
    <custom-checkbox value="value2" name="custom" id="checkbox-custom2" checked>Custom checkbox option</custom-checkbox>
    <custom-checkbox value="value3" name="custom" id="checkbox-custom3">Custom checkbox option</custom-checkbox>
    <custom-checkbox value="value4" name="custom" id="checkbox-custom4">Custom checkbox option</custom-checkbox>
  </custom-checkbox-group>
```
</auro-accordion>

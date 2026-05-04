<auro-header level="2" id="customRegistration">Custom Component Registration for Version Management</auro-header>

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

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/custom.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

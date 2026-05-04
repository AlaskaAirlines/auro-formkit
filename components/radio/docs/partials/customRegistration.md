<auro-header level="4" id="customRegistration">Custom Component Registration for Version Management</auro-header>

There are two key parts to every Auro component: the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes">class</a> and the custom element definition. The class defines the component’s behavior, while the custom element registers it under a specific name so it can be used in HTML.

You can do this by importing only the component class and using the `register(name)` method with a unique name:

```js
// Import the class only
import { AuroRadio, AuroRadioGroup } from '@aurodesignsystem/auro-formkit/auro-radio/class';

// Register with a custom name if desired
AuroRadio.register('custom-radio');
AuroRadioGroup.register('custom-radio-group');
```

This will create a new custom element `<custom-radio>` and `<custom-radio-group>` that behaves exactly like `<auro-radio>` and `<auro-radio-group>`, allowing both to coexist on the same page without interfering with each other.

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/custom.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

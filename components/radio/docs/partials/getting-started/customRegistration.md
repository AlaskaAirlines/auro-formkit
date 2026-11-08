<auro-header level="4" id="customRegistration">Custom component registration for version management</auro-header>

Every Auro component has two key parts: the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes">class</a> and the custom element definition. The class defines the component’s behavior, while the custom element registers it under a specific name so it can be used in HTML.

To register the component under your own name, import only the component class and call its `register(name)` method with a unique name:

```js
// Import the class only
import { AuroRadio, AuroRadioGroup } from '@aurodesignsystem/auro-formkit/auro-radio/class';

// Register with a custom name if desired
AuroRadio.register('custom-radio');
AuroRadioGroup.register('custom-radio-group');
```

This creates the custom elements `<custom-radio>` and `<custom-radio-group>`, which behave exactly like `<auro-radio>` and `<auro-radio-group>`, so both versions can coexist on the same page without interfering with each other.

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/custom.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

<auro-header level="2" id="customRegistration">Custom component registration for version management</auro-header>

Every Auro component has two key parts: the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes">class</a> and the custom element definition. The class defines the component’s behavior, while the custom element registers it under a specific name so it can be used in HTML.

To register the component under your own name, import only the component class and call its <code>register(name)</code> method with a unique name:

```js
// Import the class only
import { AuroCheckbox, AuroCheckboxGroup } from '@aurodesignsystem/auro-formkit/auro-checkbox/class';

// Register with a custom name if desired
AuroCheckbox.register('custom-checkbox');
AuroCheckboxGroup.register('custom-checkbox-group');
```

This creates the custom elements <code>&lt;custom-checkbox&gt;</code> and <code>&lt;custom-checkbox-group&gt;</code>, which behave exactly like <code>&lt;auro-checkbox&gt;</code> and <code>&lt;auro-checkbox-group&gt;</code>, so both versions can coexist on the same page without interfering with each other.

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/custom.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

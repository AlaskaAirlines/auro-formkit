<auro-header level="2" id="customRegistration">Custom Component Registration for Version Management</auro-header>

There are two key parts to every Auro component: the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes">class</a> and the custom element definition. The class defines the component’s behavior, while the custom element registers it under a specific name so it can be used in HTML.

You can do this by importing only the component class and using the <code>register(name)</code> method with a unique name:

```js
// Import the class only
import { AuroCheckbox, AuroCheckboxGroup } from '@aurodesignsystem/auro-formkit/auro-checkbox/class';

// Register with a custom name if desired
AuroCheckbox.register('custom-checkbox');
AuroCheckboxGroup.register('custom-checkbox-group');
```

This will create a new custom element <code>&gt;custom-checkbox&lt;</code> and <code>&gt;custom-checkbox-group&lt;</code> that behaves exactly like <code>&gt;auro-checkbox&lt;</code> and <code>&lt;auro-checkbox-group&gt;</code>, allowing both to coexist on the same page without interfering with each other.

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/custom.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

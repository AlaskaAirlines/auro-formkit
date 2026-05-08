<auro-header level="4">Custom Component Registration for Version Management</auro-header>

There are two key parts to every Auro component: the <auro-hyperlink href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes">class</auro-hyperlink> and the custom element definition. The class defines the component's behavior, while the custom element registers it under a specific name so it can be used in HTML.

You can do this by importing only the component class and using the `register(name)` method with a unique name:

```js
// Import the class only
import { AuroCounter, AuroCounterGroup } from '@aurodesignsystem/auro-formkit/auro-counter/class';

// Register with a custom name if desired
AuroCounter.register('custom-counter');
AuroCounterGroup.register('custom-counter-group');
```

This will create a new custom element <code>&lt;custom-counter&gt;</code> and <code>&lt;custom-counter-group&gt;</code> that behaves exactly like <code>&lt;auro-counter&gt;</code> and <code>&lt;auro-counter-group&gt;</code>, allowing both to coexist on the same page without interfering with each other.

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/custom.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

```js
// Import the class only
import { AuroCounter, AuroCounterGroup } from '@aurodesignsystem/auro-formkit/auro-counter/class';

// Register with a custom name if desired
AuroCounter.register('custom-counter');
AuroCounterGroup.register('custom-counter-group');
```

This will create a new custom element `<custom-counter>` and `<custom-counter-group>` that behaves exactly like `<auro-counter>` and `<auro-counter-group>`, allowing both to coexist on the same page without interfering with each other.

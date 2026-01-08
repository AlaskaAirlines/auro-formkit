```js
// Import the class only
import { AuroRadio, AuroRadioGroup } from '@aurodesignsystem/auro-formkit/auro-radio/class';

// Register with a custom name if desired
AuroRadio.register('custom-radio');
AuroRadioGroup.register('custom-radio-group');
```

This will create a new custom element `<custom-radio>` and `<custom-radio-group>` that behaves exactly like `<auro-radio>` and `<auro-radio-group>`, allowing both to coexist on the same page without interfering with each other.

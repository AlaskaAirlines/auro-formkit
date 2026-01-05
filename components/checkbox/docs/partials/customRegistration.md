```js
// Import the class only
import { AuroCheckbox, AuroCheckboxGroup } from '@aurodesignsystem/auro-formkit/auro-checkbox/class';

// Register with a custom name if desired
AuroCheckbox.register('custom-checkbox');
AuroCheckboxGroup.register('custom-checkbox-group');
```

This will create a new custom element `<custom-checkbox>` and `<custom-checkbox-group>` that behaves exactly like `<auro-checkbox>` and `<auro-checkbox-group>`, allowing both to coexist on the same page without interfering with each other.

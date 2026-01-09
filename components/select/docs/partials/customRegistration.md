```js
// Import the class only
import { AuroSelect } from '@aurodesignsystem/auro-formkit/auro-select/class';

// Register with a custom name if desired
AuroSelect.register('custom-select')
```

This will create a new custom element `<custom-select>` that behaves exactly like `<auro-select>`, allowing both to coexist on the same page without interfering with each other.

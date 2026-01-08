```js
// Import the class only
import { AuroInput } from '@aurodesignsystem/auro-formkit/auro-input/class';

// Register with a custom name if desired
AuroInput.register('custom-input')
```

This will create a new custom element `<custom-input>` that behaves exactly like `<auro-input>`, allowing both to coexist on the same page without interfering with each other.

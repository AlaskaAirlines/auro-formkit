```js
// Import the class only
import { AuroMenu, AuroMenuOption } from '@aurodesignsystem/auro-formkit/auro-menu/class';

// Register with a custom name if desired
AuroMenu.register('custom-menu');
AuroMenuOption.register('custom-menuoption');
```

This will create a new custom element `<custom-menu>` and `<custom-menuoption>` that behaves exactly like `<auro-menu>` and `<auro-menuoption>`, allowing both to coexist on the same page without interfering with each other.

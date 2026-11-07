<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../../docs/partials/customRegistrationDescription.md) -->
<!-- AURO-GENERATED-CONTENT:END -->

```js
// Import the class only
import { AuroDatePicker } from '@aurodesignsystem/auro-formkit/auro-datepicker/class';

// Register with a custom name if desired
AuroDatePicker.register('custom-datepicker');
```

This creates a new custom element `<custom-datepicker>` that behaves exactly like `<auro-datepicker>`, allowing both to coexist on the same page without interfering with each other.

```html
  <custom-datepicker>
    <span slot="bib.fullscreen.headline">custom-datepicker example</span>
    <span slot="fromLabel">Choose a date</span>
    <span slot="ariaLabel.bib.close">Close calendar</span>
    <span slot="bib.fullscreen.fromLabel">Choose a date</span>
  </custom-datepicker>
```

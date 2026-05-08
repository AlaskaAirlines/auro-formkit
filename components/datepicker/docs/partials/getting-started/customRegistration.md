<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../../docs/partials/customRegistrationDescription.md) -->
<!-- AURO-GENERATED-CONTENT:END -->

```js
// Import the class only
import { AuroDatepicker } from '@aurodesignsystem/auro-formkit/auro-datepicker/class';

// Register with a custom name if desired
AuroDatepicker.register('custom-datepicker');
```

This will create a new custom element `<custom-datepicker>` that behaves exactly like `<auro-datepicker>`, allowing both to coexist on the same page without interfering with each other.

```html
  <custom-datepicker>
    <span slot="bib.fullscreen.headline">custom-datepicker Example</span>
    <span slot="fromLabel">Choose a date</span>
    <span slot="bib.fullscreen.dateLabel">Choose a date</span>
  </custom-datepicker>
```

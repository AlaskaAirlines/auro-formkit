<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../../docs/partials/customRegistrationDescription.md) -->
<!-- AURO-GENERATED-CONTENT:END -->

```js
// Import the class only
import { AuroInput } from '@aurodesignsystem/auro-formkit/auro-input/class';

// Register with a custom name if desired
AuroInput.register('[custom]-input');
```

<p>This will create a new custom element <code>&lt;custom-input&gt;</code> that behaves exactly like <code>&lt;auro-input&gt;</code>, allowing both to coexist on the same page without interfering with each other.</p>

```html
  <custom-input>
    <span slot="label">Label</span>
    <span slot="helpText">Help Text</span>
  </custom-input>
```
</auro-accordion>

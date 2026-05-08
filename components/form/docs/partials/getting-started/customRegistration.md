## Custom Component Registration for Version Management

There are two key parts to every Auro component: the <auro-hyperlink href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes" target="_blank">class</auro-hyperlink> and the custom element definition. The class defines the component's behavior, while the custom element registers it under a specific name so it can be used in HTML.

You can do this by importing only the component class and using the <code>register(name)</code> method with a unique name:

```js
// Import the class only
import { AuroForm } from '@aurodesignsystem/auro-formkit/auro-form/class';

// Register with a custom name if desired
AuroForm.register('[custom]-form');
```

This will create a new custom element `<custom-form>` that behaves exactly like `<auro-form>`, allowing both to coexist on the same page without interfering with each other.

### Using Custom-Named Child Form Elements

When consuming custom-named Auro form elements (like `auro-input` registered as `custom-input`),
these elements _must_ be registered BEFORE auro-form due to rendering order limitations.
Auro form elements are automatically recognized based on their tag name (e.g. `auro-input`) or special auro attributes which are only assigned during the initial render.

For example, the following is correct:

```javascript
import { AuroInput } from '@aurodesignsystem/auro-formkit/auro-input/class';
import { AuroForm } from '@aurodesignsystem/auro-formkit/auro-form/class';

AuroInput.register('[custom]-input'); // adds an internal identifier auro-form uses to recognize the custom element
AuroForm.register('[custom]-form'); // render looks for said identifier
```

The following is NOT correct and will result in forms not working as expected:

```javascript
import { AuroInput } from '@aurodesignsystem/auro-formkit/auro-input/class';
import { AuroForm } from '@aurodesignsystem/auro-formkit/auro-form/class';

AuroForm.register('[custom]-form'); // forms start rendering, looking for auro inputs, or custom-named inputs
AuroInput.register('[custom]-input'); // too late, form has already rendered and did not find the custom element
```

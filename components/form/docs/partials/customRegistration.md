## Custom Component Registration for Version Management

There are two key parts to every Auro component: the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes">class</a> and the custom element definition. The class defines the component's behavior, while the custom element registers it under a specific name so it can be used in HTML.

When you install the component as described on the `Install` page, the class is imported automatically, and the component is registered globally for you.

However, if you need to load multiple versions of the same component on a single page (for example, when two projects depend on different versions), you can manually register the class under a custom element name to avoid conflicts.

You can do this by importing only the component class and using the `register(name)` method with a unique name:

```js
// Import the class only
import { AuroForm } from '@aurodesignsystem/auro-formkit/auro-form/class';

// Register with a custom name if desired
AuroForm.register('custom-form');
```

This will create a new custom element `<custom-form>` that behaves exactly like `<auro-form>`, allowing both to coexist on the same page without interfering with each other.

### Using Custom-Named Child Form Elements

When using custom-named Auro form elements (like `auro-input` registered as `my-custom-input`) inside an `auro-form`, those child elements _must_ be registered **before** `auro-form`. Auro form elements are recognized based on their tag name (e.g. `auro-input`) or special auro attributes which are only assigned during the initial render.

For example, the following is correct:

```javascript
import { AuroInput } from '@aurodesignsystem/auro-formkit/auro-input/class';
import { AuroForm } from '@aurodesignsystem/auro-formkit/auro-form/class';

AuroInput.register('my-custom-input'); // adds an internal identifier auro-form uses to recognize the custom element
AuroForm.register(); // render looks for said identifier
```

The following is NOT correct and will result in forms not working as expected:

```javascript
import { AuroInput } from '@aurodesignsystem/auro-formkit/auro-input/class';
import { AuroForm } from '@aurodesignsystem/auro-formkit/auro-form/class';

AuroForm.register(); // forms start rendering, looking for auro inputs, or custom-named inputs
AuroInput.register('my-custom-input'); // too late, form has already rendered and did not find the custom element
```

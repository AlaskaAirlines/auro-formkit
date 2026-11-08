## Custom component registration for version management

Every Auro component has two key parts: the <auro-hyperlink href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes" target="_blank">class</auro-hyperlink> and the custom element definition. The class defines the component's behavior, while the custom element registers it under a specific name so you can use it in HTML.

To register the component under your own name, import only the component class and call the <code>register(name)</code> method with a unique name:

```js
// Import the class only
import { AuroForm } from '@aurodesignsystem/auro-formkit/auro-form/class';

// Register with a custom name if desired
AuroForm.register('[custom]-form');
```

This creates a new custom element `<custom-form>` that behaves exactly like `<auro-form>`, so both can be on the same page without interfering with each other.

### Using custom-named child form elements

When you use custom-named Auro form elements, such as `auro-input` registered as `custom-input`,
register them _before_ `auro-form`, because of the order in which the elements render.
`auro-form` recognizes Auro form elements by their tag name, such as `auro-input`, or by a matching attribute that each custom-named element adds to itself once it's registered and on the page.

For example, the following is correct:

```javascript
import { AuroInput } from '@aurodesignsystem/auro-formkit/auro-input/class';
import { AuroForm } from '@aurodesignsystem/auro-formkit/auro-form/class';

AuroInput.register('[custom]-input'); // register child form elements first
AuroForm.register('[custom]-form'); // the form then recognizes each custom-input when it looks for its fields
```

The following is _not_ correct, and the form doesn't work as expected:

```javascript
import { AuroInput } from '@aurodesignsystem/auro-formkit/auro-input/class';
import { AuroForm } from '@aurodesignsystem/auro-formkit/auro-form/class';

AuroForm.register('[custom]-form'); // the form looks for its fields when it first renders
AuroInput.register('[custom]-input'); // too late: the form has already looked and didn't recognize the custom input
```

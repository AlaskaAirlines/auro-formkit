## Custom Component Registration for Version Management

Every Auro component has two key parts: the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes">class</a> and the custom element definition. The class defines the component’s behavior, while the custom element registers it under a specific name so it can be used in HTML.

To do this, import only the component class and call the `register(name)` method with a unique name:

```js
// Import the class only
import { AuroDropdown } from '@aurodesignsystem/auro-formkit/auro-dropdown/class';

// Register with a custom name if desired
AuroDropdown.register('custom-dropdown');
```

This creates a new custom element `<custom-dropdown>` that behaves exactly like `<auro-dropdown>`, allowing both to coexist on the same page without interfering with each other.

```html
  <custom-dropdown id="customCommon" layout="classic" shape="classic" size="lg">
    <div style="padding: var(--ds-size-150);">
      Seattle (SEA) to Anchorage (ANC), departs 8:15 AM
      <br />
      <auro-button id="customCommonButton">
        Dismiss dropdown
      </auro-button>
    </div>
    <span slot="helpText">
      Times are local to each airport
    </span>
    <div slot="trigger">
      Flight details
    </div>
  </custom-dropdown>
```

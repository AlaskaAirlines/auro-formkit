## Custom Component Registration for Version Management

There are two key parts to every Auro component: the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes">class</a> and the custom element definition. The class defines the component’s behavior, while the custom element registers it under a specific name so it can be used in HTML.

When you install the component as described on the `Install` page, the class is imported automatically, and the component is registered globally for you.

However, if you need to load multiple versions of the same component on a single page (for example, when two projects depend on different versions), you can manually register the class under a custom element name to avoid conflicts.

You can do this by importing only the component class and using the `register(name)` method with a unique name:

```js
// Import the class only
import { AuroDropdown } from '@aurodesignsystem/auro-formkit/auro-dropdown/class';

// Register with a custom name if desired
AuroDropdown.register('custom-dropdown');
```

This will create a new custom element `<custom-dropdown>` that behaves exactly like `<auro-dropdown>`, allowing both to coexist on the same page without interfering with each other.

<div class="exampleWrapper exampleWrapper--flex">
  <custom-dropdown id="customCommon" layout="classic" shape="classic" size="lg" aria-label="Label content for screen reader">
    <div style="padding: var(--ds-size-150);">
      Lorem ipsum solar
      <br />
      <auro-button id="customCommonButton">
        Dismiss Dropdown
      </auro-button>
    </div>
    <span slot="helpText">
      Help text
    </span>
    <div slot="trigger">
      Trigger
    </div>
  </custom-dropdown>
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

```html
  <custom-dropdown id="customCommon" layout="classic" shape="classic" size="lg" aria-label="Label content for screen reader">
    <div style="padding: var(--ds-size-150);">
      Lorem ipsum solar
      <br />
      <auro-button id="customCommonButton">
        Dismiss Dropdown
      </auro-button>
    </div>
    <span slot="helpText">
      Help text
    </span>
    <div slot="trigger">
      Trigger
    </div>
  </custom-dropdown>
```
</auro-accordion>

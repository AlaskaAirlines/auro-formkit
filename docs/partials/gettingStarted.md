To start using the Auro Formkit components, follow the instructions below:

### Usage

You can use Auro Formkit components in your project in two ways: default or custom registration.

#### Default Registration

For default registration, simply import the component:

```javascript
import "@aurodesignsystem/auro-formkit/auro-checkbox";
```

This will automatically register both the `<auro-checkbox>` and the included `<auro-checkbox-group>` component for use in your project. Note that not all Auro Formkit components have sub-components. Be sure to check the documentation for each component to understand its specific usage and registration requirements.

#### Class Custom Registration

If you prefer to register the component with a custom name, you can call the component class directly to create a custom registration:

```javascript
import { AuroCheckbox, AuroCheckboxGroup } from "@aurodesignsystem/auro-formkit/auro-checkbox/class";

AuroCheckbox.register('custom-checkbox');
AuroCheckbox.register('custom-checkbox-group');
```

This will register the component as `<custom-checkbox>` and `<custom-checkbox-group>`.

### Basic HTML Example

Here is an example of how to use the Auro Checkbox component in your HTML:

`index.html -> <head>`

```html
<script type="module">
    import "@aurodesignsystem/auro-formkit/auro-checkbox";
</script>
```

`index.html -> <body>`

```html
<auro-checkbox-group>
    <span slot="legend">
        Form label goes here
    </span>
    <auro-checkbox value="value1" name="basic" id="checkbox-basic1">
        Checkbox option
    </auro-checkbox>
    <auro-checkbox value="value2" name="basic" id="checkbox-basic2" checked>
        Checkbox option two
    </auro-checkbox>
</auro-checkbox-group>

```

By following these steps, you can easily integrate Auro Formkit components into your project.

<!--
The index.md file is a compiled document. No edits should be made directly to this file.

index.md is created by running `npm run build:markdownDocs`.

This file is generated based on a template fetched from `./docs/partials/index.md`
-->

# Form

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/description.md) -->
<!-- AURO-GENERATED-CONTENT:END -->

## Form data generation

As covered in the description, `auro-form` makes a developer's life easier by surfacing Auro form elements as a JSON object.
The most common use case the Auro team identified when building Form was the need to collect form data in a structured way.

The following is required for an Auro form element to be collected automatically:

1. It _must_ have a `name` attribute. This is required if vanilla HTML forms, and we follow the same pattern.
2. It _must_ be an Auro form element. See note below for custom elements.

That being said, we do _not_ require form elements to be direct children of `auro-form`.
They can be nested within other elements for styling, such as a `div`, `span` or `fieldset`.

## Important note for custom elements

When consuming custom-named Auro form elements (like `auro-input` as `my-custom-input`), these elements _must_ be registered
BEFORE auro-form due to rendering order and Shadown DOM limitations.

For example, the following is correct:

```javascript
import {AuroInput} from '@aurodesignsystem/auro-input';
import {AuroForm} from '@aurodesignsystem/auro-form';

AuroInput.register('my-custom-input'); // adds an internal identifier auro-form uses to recognize the custom element
AuroForm.register(); // render looks for said identifier
```

The following is NOT correct and will result in forms not working as expected:

```javascript
import {AuroInput} from '@aurodesignsystem/auro-input';
import {AuroForm} from '@aurodesignsystem/auro-form';

AuroForm.register(); // forms start rendering, looking for auro inputs, or custom-named inputs
AuroInput.register('my-custom-input'); // too late, form has already rendered and did not find the custom element
```

In a correctly registered scenario, `auro-form` will automatically recognize the custom element and collect its data in the following shape:

```typescript
interface AuroFormState {
  // value varies based on form element
  [key: string]: string | string[] | number | boolean | null;
}
```

A real-world example of this might be:

```json
{
  "hotelCity": "New York",
  "dates": ["2022-01-01", "2022-01-15"],
  "numberOfGuests": 2
}
```

## Examples

### Basic Form
The most basic form implementation requires an `auro-input` and an optional auro button with `type="submit"`.

By default, Auro Form connects a `submit` event to all `type="submit"` buttons within the form.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

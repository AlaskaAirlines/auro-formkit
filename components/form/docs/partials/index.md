<!--
The index.md file is a compiled document. No edits should be made directly to this file.

index.md is created by running `npm run build:markdownDocs`.

This file is generated based on a template fetched from `./docs/partials/index.md`
-->

# Form

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/description.md) -->
<!-- AURO-GENERATED-CONTENT:END -->

## Form value generation

Auro form exists to make a developer's life easier through surfacing all Auro form elements in a given form as a single
JSON object.
The most common use case the Auro team identified when building Form was the need to collect form data in
a structured way.

The following is required on each Auro form element in a form for it to be collected automatically:

1. It **must** have a `name` attribute. This is required if vanilla HTML forms, and we follow the same pattern.
2. It **must** be an Auro form element. See the section on custom elements for more information.

That being said, we do _not_ require form elements to be direct children of `auro-form`.
They can be nested within other elements for styling, such as a `div`, `span` or `fieldset`.

### Form data structure

In a correctly registered scenario, `auro-form`
will automatically recognize the auro form elements and collect data from each on the form's `value` key as a JSON object.

Each element will be added using the element's `name` attribute as the key, and the element's `value` as the value.

A real-world example of this might be:

```json
{
  "hotelCity": "New York",
  "dates": ["2022-01-01", "2022-01-15"],
  "numberOfGuests": 2
}
```

If your project uses TypeScript, consider using a type like this to represent the form data:

```typescript
// Generic type for form values
type AuroFormValue<T> = T | null;

// Example types
type AuroInputValue = AuroFormValue<string | number>;
type AuroDatePickerValue = AuroFormValue<string[]>;

// This is the type returned from the `AuroForm.value` getter
interface AuroFormState {
  // value varies based on form element
  hotelCity: AuroInputValue;
  dates: AuroDatePickerValue;
  numberOfGuests: AuroInputValue;
}
```

## Accessing form data

As Auro components are designed to be framework-agnostic, data can be retrieved using simple vanilla JavaScript patterns.
If you have ever worked with a standard HTML5 form, you are already equipped to work with Auro forms!

Once you have a reference to the form element (React ref, querySelector, etc.),
you can access the form data using the following methods:

**Data keys + get methods**:
- `.value` - Getter which returns the current form data as a JSON object.
- `.validity` - Returns the current validity state of the form (`valid` or `invalid`).

**Extra information**:
- `.isInitialState` - Returns a boolean indicating if the form is in its initial state.

**Events**
- `input` - Fires when the form state changes.
- `reset` - Fires when the form is reset.
- `submit` - Fires when the form is submitted.

**Advanced features**:
- `.formState` - This is the internal form state. It includes extra `required` and `validity` information for each form element.
This key is not required for normal form usage, but can add additional context for more complex forms.


## Important note for custom elements

This **only applies to custom-named elements**.

When consuming custom-named Auro form elements (like `auro-input` registered as `my-custom-input`),
these elements _must_ be registered BEFORE auro-form due to rendering order limitations.
Auro form elements are automatically recognized based on their tag name (e.g. `auro-input`) or special auro attributes
which are only assigned during the initial render.

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

### Form with column layout
Auro Form is designed to be completely unstyled by default, allowing developers to use divs, structural elements, or
custom CSS to style the form.

This example shows that you can use advanced layouts with Auro Form, such as a column layout.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/column-layout.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/column-layout.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>


### Complex form
Finally, a more complex form example with multiple form elements, including a date picker and a select element.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/complex.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/complex.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

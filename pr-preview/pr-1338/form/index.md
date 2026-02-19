<!--
The index.md file is a compiled document. No edits should be made directly to this file.

index.md is created by running `npm run build:markdownDocs`.

This file is generated based on a template fetched from `./docs/partials/index.md`
-->

# Form

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/description.md) -->
<!-- The below content is automatically added from ./../docs/partials/description.md -->
`<auro-form>` is a [HTML custom element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) designed to
serve as the base logic for all auro-constructed forms.

It automatically "scrapes" its inner content for any auro form elements, and surfaces
them (along with events) to the parent form element as a JSON object.
<!-- AURO-GENERATED-CONTENT:END -->

## Form Value Generation

Auro form exists to make a developer's life easier through surfacing all Auro form elements in a given form as a single
JSON object.
The most common use case the Auro team identified when building Form was the need to collect form data in
a structured way.

The following is required on each Auro form element in a form for it to be collected automatically:

1. It **must** have a `name` attribute. This is required if vanilla HTML forms, and we follow the same pattern.
2. It **must** be an Auro form element. See the section on custom elements for more information.

That being said, we do _not_ require form elements to be direct children of `auro-form`.
They can be nested within other elements for styling, such as a `div`, `span` or `fieldset`.

### Form Data Structure

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

## Accessing Form Data

As Auro components are designed to be framework-agnostic, data can be retrieved using simple vanilla JavaScript patterns.
If you have ever worked with a standard HTML5 form, you are already equipped to work with Auro forms!

Once you have a reference to the form element (React ref, querySelector, etc.),
you can access the form data using the following methods:

**Data Keys + Get Methods**:
- `.value` - Getter which returns the current form data as a JSON object.
- `.validity` - Returns the current validity state of the form (`valid` or `invalid`).

**Extra Information**:
- `.isInitialState` - Returns a boolean indicating if the form is in its initial state.

**Events**
- `input` - Fires when the form state changes.
- `reset` - Fires when the form is reset.
- `submit` - Fires when the form is submitted.

**Advanced Features**:
- `.formState` - This is the internal form state. It includes extra `required` and `validity` information for each form element.
This key is not required for normal form usage, but can add additional context for more complex forms.

## Important Note for Custom Elements

This **only applies to custom-named elements**.

When consuming custom-named Auro form elements (like `auro-input` registered as `my-custom-input`),
these elements _must_ be registered BEFORE auro-form due to rendering order limitations.
Auro form elements are automatically recognized based on their tag name (e.g. `auro-input`) or special auro attributes
which are only assigned during the initial render.

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

## Examples

### Basic Form

The most basic form implementation requires an `auro-input` and an optional auro button with `type="submit"`.

By default, Auro Form connects a `submit` event to all `type="submit"` buttons within the form.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
  <!-- The below content is automatically added from ./../apiExamples/basic.html -->
  <auro-form>
    <auro-input id="search-box" name="searchBox" required>
      <span slot="label">Search flights</span>
    </auro-input>
    <br />
    <auro-button type="submit">Submit</auro-button>
  </auro-form>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->

```html
<auro-form>
  <auro-input id="search-box" name="searchBox" required>
    <span slot="label">Search flights</span>
  </auro-input>
  <br />
  <auro-button type="submit">Submit</auro-button>
</auro-form>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Form with Column Layout

Auro Form is designed to be completely unstyled by default, allowing developers to use divs, structural elements, or
custom CSS to style the form.

This example shows that you can use advanced layouts with Auro Form, such as a column layout.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/column-layout.html) -->
  <!-- The below content is automatically added from ./../apiExamples/column-layout.html -->
  <style>
    .columned-form {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .columned-form div {
      display: flex;
      flex-direction: column;
      padding: 1rem;
    }

    .controls {
      display: flex;
      justify-content: flex-end;
      margin-top: 1rem;
    }
  </style>
  <auro-form>
    <div class="columned-form">
      <div>
        <auro-input id="search-box" name="searchBox" required>
          <span slot="label">Search flights</span>
        </auro-input>
        <auro-input id="last-name" name="lastName" required>
          <span slot="label">Last Name</span>
        </auro-input>
      </div>
      <div>
        <div class="datepickerBlock">
          <h4>Pick a date range</h4>
          <auro-datepicker id="date-range" name="dateRange" required range>
            <span slot="fromLabel">Start</span>
            <span slot="toLabel">End</span>
            <span slot="bib.fullscreen.dateLabel">Choose a range</span>
          </auro-datepicker>
        </div>
        <div class="controls">
          <auro-button type="submit">Submit</auro-button>
        </div>
      </div>
    </div>
  </auro-form>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/column-layout.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/column-layout.html -->

```html
<style>
  .columned-form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .columned-form div {
    display: flex;
    flex-direction: column;
    padding: 1rem;
  }

  .controls {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
  }
</style>
<auro-form>
  <div class="columned-form">
    <div>
      <auro-input id="search-box" name="searchBox" required>
        <span slot="label">Search flights</span>
      </auro-input>
      <auro-input id="last-name" name="lastName" required>
        <span slot="label">Last Name</span>
      </auro-input>
    </div>
    <div>
      <div class="datepickerBlock">
        <h4>Pick a date range</h4>
        <auro-datepicker id="date-range" name="dateRange" required range>
          <span slot="fromLabel">Start</span>
          <span slot="toLabel">End</span>
          <span slot="bib.fullscreen.dateLabel">Choose a range</span>
        </auro-datepicker>
      </div>
      <div class="controls">
        <auro-button type="submit">Submit</auro-button>
      </div>
    </div>
  </div>
</auro-form>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Complex Form

Finally, a more complex form example with multiple form elements, including a date picker and a select element.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/complex.html) -->
  <!-- The below content is automatically added from ./../apiExamples/complex.html -->
  <style>
    .submitBlock {
      margin-top: 1rem;
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
    }

    .datepickerBlock {
      margin-top: 1rem;
    }

    .complex-form {
      display: block;
      width: 100%;
      padding: 1rem;
      border: 1px solid #2a2a2a;
      border-radius: 1rem;
    }
  </style>
  <h2>auro-form testing</h2>
  <auro-form class="complex-form">
    <auro-input id="first-name" name="firstName" required>
      <span slot="label">First Name</span>
    </auro-input>
    <br />
    <auro-input id="last-name" name="lastName" autocomplete="family-name" required>
      <span slot="label">Last Name</span>
    </auro-input>
    <br />
    <auro-input id="occupation" name="occupation" required>
      <span slot="label">Occupation</span>
    </auro-input>
    <br />
    <auro-input-two id="cool-fact" name="coolFact" required>
      <span slot="label">Cool Fact</span>
    </auro-input-two>
    <div class="datepickerBlock">
      <h4>Pick a cool date</h4>
      <auro-datepicker id="date-example" name="dateExample" required>
        <span slot="fromLabel">Choose a date</span>
        <span slot="bib.fullscreen.dateLabel">Choose a date</span>
      </auro-datepicker>
    </div>
    <div class="datepickerBlock">
      <h4>Pick a date range</h4>
      <auro-datepicker id="date-range" name="dateRange" required range>
        <span slot="fromLabel">Start</span>
        <span slot="toLabel">End</span>
        <span slot="bib.fullscreen.dateLabel">Choose a range</span>
      </auro-datepicker>
    </div>
    <div class="submitBlock">
      <auro-button type="reset">Reset</auro-button>
      <auro-button type="submit">Submit</auro-button>
    </div>
  </auro-form>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/complex.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/complex.html -->

```html
<style>
  .submitBlock {
    margin-top: 1rem;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }

  .datepickerBlock {
    margin-top: 1rem;
  }

  .complex-form {
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid #2a2a2a;
    border-radius: 1rem;
  }
</style>
<h2>auro-form testing</h2>
<auro-form class="complex-form">
  <auro-input id="first-name" name="firstName" required>
    <span slot="label">First Name</span>
  </auro-input>
  <br />
  <auro-input id="last-name" name="lastName" autocomplete="family-name" required>
    <span slot="label">Last Name</span>
  </auro-input>
  <br />
  <auro-input id="occupation" name="occupation" required>
    <span slot="label">Occupation</span>
  </auro-input>
  <br />
  <auro-input-two id="cool-fact" name="coolFact" required>
    <span slot="label">Cool Fact</span>
  </auro-input-two>
  <div class="datepickerBlock">
    <h4>Pick a cool date</h4>
    <auro-datepicker id="date-example" name="dateExample" required>
      <span slot="fromLabel">Choose a date</span>
      <span slot="bib.fullscreen.dateLabel">Choose a date</span>
    </auro-datepicker>
  </div>
  <div class="datepickerBlock">
    <h4>Pick a date range</h4>
    <auro-datepicker id="date-range" name="dateRange" required range>
      <span slot="fromLabel">Start</span>
      <span slot="toLabel">End</span>
      <span slot="bib.fullscreen.dateLabel">Choose a range</span>
    </auro-datepicker>
  </div>
  <div class="submitBlock">
    <auro-button type="reset">Reset</auro-button>
    <auro-button type="submit">Submit</auro-button>
  </div>
</auro-form>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

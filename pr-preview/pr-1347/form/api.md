<!-- AURO-GENERATED-CONTENT:START (FILE:src=../docs/api.md) -->
<!-- The below content is automatically added from ../docs/api.md -->

# auro-form

The `auro-form` element provides users a way to create and manage forms in a consistent manner.

## Properties

| Property                   | Attribute  | Modifiers | Type                                             | Default | Description                                      |
|----------------------------|------------|-----------|--------------------------------------------------|---------|--------------------------------------------------|
| [cssClass](#cssClass)                 | `cssClass` |           | `boolean`                                        |         | Applies designated CSS class to demo element - you want to delete me! |
| [fixed](#fixed)                    | `fixed`    |           | `boolean`                                        |         | If declared, use fixed pixel values for element shape. |
| [formState](#formState)                |            |           | `FormState`                                      | {}      |                                                  |
| [handleKeyDown](#handleKeyDown)            |            |           |                                                  |         |                                                  |
| [isInitialState](#isInitialState)           |            | readonly  | `boolean`                                        |         | Mostly internal way to determine if a form is in the initial state. |
| [mutationEventListener](#mutationEventListener)    |            |           |                                                  |         |                                                  |
| [reset](#reset)                    |            |           |                                                  |         |                                                  |
| [resetElements](#resetElements)            |            | readonly  | `HTMLButtonElement[]`                            |         | Returns a collection of elements that will reset the form. |
| [sharedInputListener](#sharedInputListener)      |            |           |                                                  |         |                                                  |
| [sharedValidationListener](#sharedValidationListener) |            |           |                                                  |         |                                                  |
| [submit](#submit)                   |            |           |                                                  |         |                                                  |
| [submitElements](#submitElements)           |            | readonly  | `HTMLButtonElement[]`                            |         | Getter for internal _submitElements.             |
| [validity](#validity)                 |            | readonly  | `"valid" \| "invalid"`                           |         | Current validity state of the form, based on form element events. |
| [value](#value)                    |            | readonly  | `Record<string, string \| number \| boolean \| string[] \| null>` |         | Reduce the form value into a key-value pair.     |

## Methods

| Method                      | Type                              | Description                                      |
|-----------------------------|-----------------------------------|--------------------------------------------------|
| [initializeState](#initializeState)           | `(): void`                        | Initialize (or reinitialize) the form state.     |
| [isButtonElement](#isButtonElement)           | `(element: HTMLElement): boolean` | Check if the tag name is a button element.<br /><br />**element**: The element to check. |
| [isFormElement](#isFormElement)             | `(element: HTMLElement): boolean` | Check if the tag name is a form element.<br /><br />**element**: The element to check (attr or tag name). |
| [onSlotChange](#onSlotChange)              | `(event: Event): void`            | Slot change event listener. This is the main entry point for the form element.<br /><br />**event**: The slot change event. |
| [queryAuroElements](#queryAuroElements)         | `(): NodeList`                    | Construct the query strings from elements, append them together, execute, and return the NodeList. |
| [reset](#reset)                     | `(): void`                        | Reset fires an event called `reset` - just as you would expect from a normal form. |
| [setDisabledStateOnButtons](#setDisabledStateOnButtons) | `(): void`                        |                                                  |
| [submit](#submit)                    | `(): Promise<void>`               | Submit fires an event called `submit` - just as you would expect from a normal form. |

## Events

| Event    | Type                                             | Description                                      |
|----------|--------------------------------------------------|--------------------------------------------------|
| [change](#change) |                                                  | Fires when form state changes.                   |
| [reset](#reset)  | `CustomEvent<{ previousValue: Record<string, string \| number \| boolean \| string[] \| null>; }>` | Fires when the form is reset. The event detail contains the previous value of the form before reset. |
| [submit](#submit) | `CustomEvent<{ value: Record<string, string \| number \| boolean \| string[] \| null>; }>` | Fires when the form is submitted. The event detail contains the current value of the form. |

## Slots

| Name      | Description                         |
|-----------|-------------------------------------|
| [default](#default) | The default slot for form elements. |
<!-- AURO-GENERATED-CONTENT:END -->

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
    gap: 1rem;
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
    gap: 1rem;
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
    padding: 1rem;
    border: 1px solid #2a2a2a;
    border-radius: 1rem;
  }
</style>
<auro-form class="complex-form">
  <auro-input id="first-name" name="firstName" required>
    <span slot="label">First Name</span>
  </auro-input>
  <br />
  <auro-input id="last-name" name="lastName" required>
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
    padding: 1rem;
    border: 1px solid #2a2a2a;
    border-radius: 1rem;
  }
</style>
<auro-form class="complex-form">
  <auro-input id="first-name" name="firstName" required>
    <span slot="label">First Name</span>
  </auro-input>
  <br />
  <auro-input id="last-name" name="lastName" required>
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

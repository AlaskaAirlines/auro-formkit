<!-- AURO-GENERATED-CONTENT:START (FILE:src=../docs/api.md) -->
<!-- The below content is automatically added from ../docs/api.md -->

# auro-form

The `auro-form` element provides users a way to create and manage forms in a consistent manner.

## Properties

| Property         | Modifiers | Type                                             | Description                                      |
|------------------|-----------|--------------------------------------------------|--------------------------------------------------|
| `isInitialState` | readonly  | `boolean`                                        | Returns `true` if no form element has been interacted with or had its value changed since the form was initialized or last reset. |
| `validity`       | readonly  | `"valid" \| "invalid" \| null`                   | Returns `'valid'` if all required and interacted-with form elements are valid, `'invalid'` if any are not, or `null` if the form has not been interacted with yet. |
| `value`          | readonly  | `Record<string, string \| number \| boolean \| string[] \| null>` | Returns the current values of all named form elements as a key-value object, keyed by each element's `name` attribute. |

## Methods

| Method   | Type                | Description                                      |
|----------|---------------------|--------------------------------------------------|
| `reset`  | `(): void`          | Resets all form elements to their initial state and fires a `reset` event. The event's `detail.previousValue` contains the form values captured immediately before the reset. |
| `submit` | `(): Promise<void>` | Validates all form elements. If all are valid, fires a `submit` event with `detail.value` containing the current form values. If any element is invalid, its error state is surfaced and the `submit` event is not fired. |

## Events

| Event    | Type                                             | Description                                      |
|----------|--------------------------------------------------|--------------------------------------------------|
| `change` |                                                  | Fires when a child form element's value changes or the form is initialized. |
| `input`  |                                                  | Fires when a child form element receives user input. |
| `reset`  | `CustomEvent<{ previousValue: Record<string, string \| number \| boolean \| string[] \| null>; }>` | Fires when the form is reset. The event detail contains the previous value of the form before reset. |
| `submit` | `CustomEvent<{ value: Record<string, string \| number \| boolean \| string[] \| null>; }>` | Fires when the form is submitted. The event detail contains the current value of the form. |

## Slots

| Name      | Description                         |
|-----------|-------------------------------------|
| `default` | The default slot for form elements. |
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

<pre class="language-html"><code class="language-html">&lt;auro-form&gt;
  &lt;auro-input id="search-box" name="searchBox" required&gt;
    &lt;span slot="label"&gt;Search flights&lt;/span&gt;
  &lt;/auro-input&gt;
  &lt;br /&gt;
  &lt;auro-button type="submit"&gt;Submit&lt;/auro-button&gt;
&lt;/auro-form&gt;</code></pre>
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
<span slot="bib.fullscreen.fromLabel">Start</span>
<span slot="bib.fullscreen.toLabel">End</span>
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

<pre class="language-html"><code class="language-html">&lt;style&gt;
  .columned-form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
​
  .columned-form div {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
  }
​
  .controls {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
  }
&lt;/style&gt;
&lt;auro-form&gt;
  &lt;div class="columned-form"&gt;
    &lt;div&gt;
      &lt;auro-input id="search-box" name="searchBox" required&gt;
        &lt;span slot="label"&gt;Search flights&lt;/span&gt;
      &lt;/auro-input&gt;
      &lt;auro-input id="last-name" name="lastName" required&gt;
        &lt;span slot="label"&gt;Last Name&lt;/span&gt;
      &lt;/auro-input&gt;
    &lt;/div&gt;
    &lt;div&gt;
      &lt;div class="datepickerBlock"&gt;
        &lt;h4&gt;Pick a date range&lt;/h4&gt;
        &lt;auro-datepicker id="date-range" name="dateRange" required range&gt;
          &lt;span slot="fromLabel"&gt;Start&lt;/span&gt;
          &lt;span slot="toLabel"&gt;End&lt;/span&gt;
          &lt;span slot="bib.fullscreen.fromLabel"&gt;Start&lt;/span&gt;
          &lt;span slot="bib.fullscreen.toLabel"&gt;End&lt;/span&gt;
        &lt;/auro-datepicker&gt;
      &lt;/div&gt;
      &lt;div class="controls"&gt;
        &lt;auro-button type="submit"&gt;Submit&lt;/auro-button&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/auro-form&gt;</code></pre>
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
<span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
</div>
<div class="datepickerBlock">
<h4>Pick a date range</h4>
<auro-datepicker id="date-range" name="dateRange" required range>
<span slot="fromLabel">Start</span>
<span slot="toLabel">End</span>
<span slot="bib.fullscreen.fromLabel">Start</span>
<span slot="bib.fullscreen.toLabel">End</span>
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

<pre class="language-html"><code class="language-html">&lt;style&gt;
  .submitBlock {
    margin-top: 1rem;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }
​
  .datepickerBlock {
    margin-top: 1rem;
  }
​
  .complex-form {
    display: block;
    padding: 1rem;
    border: 1px solid #2a2a2a;
    border-radius: 1rem;
  }
&lt;/style&gt;
&lt;auro-form class="complex-form"&gt;
  &lt;auro-input id="first-name" name="firstName" required&gt;
    &lt;span slot="label"&gt;First Name&lt;/span&gt;
  &lt;/auro-input&gt;
  &lt;br /&gt;
  &lt;auro-input id="last-name" name="lastName" required&gt;
    &lt;span slot="label"&gt;Last Name&lt;/span&gt;
  &lt;/auro-input&gt;
  &lt;br /&gt;
  &lt;auro-input id="occupation" name="occupation" required&gt;
    &lt;span slot="label"&gt;Occupation&lt;/span&gt;
  &lt;/auro-input&gt;
  &lt;br /&gt;
  &lt;auro-input-two id="cool-fact" name="coolFact" required&gt;
    &lt;span slot="label"&gt;Cool Fact&lt;/span&gt;
  &lt;/auro-input-two&gt;
  &lt;div class="datepickerBlock"&gt;
    &lt;h4&gt;Pick a cool date&lt;/h4&gt;
    &lt;auro-datepicker id="date-example" name="dateExample" required&gt;
      &lt;span slot="fromLabel"&gt;Choose a date&lt;/span&gt;
      &lt;span slot="bib.fullscreen.fromLabel"&gt;Choose a date&lt;/span&gt;
    &lt;/auro-datepicker&gt;
  &lt;/div&gt;
  &lt;div class="datepickerBlock"&gt;
    &lt;h4&gt;Pick a date range&lt;/h4&gt;
    &lt;auro-datepicker id="date-range" name="dateRange" required range&gt;
      &lt;span slot="fromLabel"&gt;Start&lt;/span&gt;
      &lt;span slot="toLabel"&gt;End&lt;/span&gt;
      &lt;span slot="bib.fullscreen.fromLabel"&gt;Start&lt;/span&gt;
      &lt;span slot="bib.fullscreen.toLabel"&gt;End&lt;/span&gt;
    &lt;/auro-datepicker&gt;
  &lt;/div&gt;
  &lt;div class="submitBlock"&gt;
    &lt;auro-button type="reset"&gt;Reset&lt;/auro-button&gt;
    &lt;auro-button type="submit"&gt;Submit&lt;/auro-button&gt;
  &lt;/div&gt;
&lt;/auro-form&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

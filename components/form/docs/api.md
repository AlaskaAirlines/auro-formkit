# auro-form

Collects the values and validity of the Auro form elements inside it, and handles submitting and resetting them together.

**Key capabilities**
- **Collects values**: The form always gathers the value of every named, enabled Auro form element inside it, such as `auro-input` or `auro-select`, into one object in `value`.
- **Tracks validity and changes**: The form always reports whether its fields pass validation in `validity`, and whether any field has changed from its starting value in `isInitialState`.
- **Manages submit and reset buttons**: The form always turns on a `button` or `auro-button` with `type="submit"` only while no enabled field is invalid or required but empty, and one with `type="reset"` only when the form has changed or holds a value.
- **Submits on Enter**: Pressing Enter in a named, enabled form element always runs `submit()`.
- **Skips disabled fields**: The form always leaves fields with the `disabled` attribute out of `value`, validation, and the `submit` event.

**Example**
```html
<auro-form>
  <auro-input name="email" type="email" required>
    <span slot="label">Email</span>
  </auro-input>
  <auro-button type="submit">Submit</auro-button>
</auro-form>
```

### Properties and attributes

| Properties        | Attributes | Modifiers | Type                                                                                      | Default | Category | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ----------------- | ---------- | --------- | ----------------------------------------------------------------------------------------- | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| isInitialState    |            | readonly  | boolean                                                                                   |         | behavior | Checks whether the form is unchanged, with every field still holding its starting value, the value it had when the form first found it. The form counts as changed while any field's value differs from its starting value or any field has failed validation, so changing a value back makes this true again.                                                                                                                                                                                                                                                                            |
| validity          |            | readonly  | "valid" \| "invalid" \| null                                                              |         | behavior | Gets the form's overall validity: `invalid` when any enabled field has failed validation or is required but empty, and `valid` otherwise. Stays `null` while `isInitialState` is true, so you can hold back error messages until the user changes something.                                                                                                                                                                                                                                                                                                                              |
| value             |            | readonly  | Record<string, string \| number \| boolean \| string[] \| Record<string, number> \| null> |         | behavior | Gets the current values of all named, enabled form elements as one object, keyed by each element's `name` attribute. Each value is the child component's own `.value`, so its shape depends on the element type: for example, `auro-checkbox-group` gives an array, `auro-counter-group` gives an object keyed by counter name, and `auro-select` with `multiSelect` gives a JSON-encoded string. The one form-specific exception is a `range` `auro-datepicker`, which gives its `.values` array (`[start, end]`) instead of its single `.value` string once the user has entered dates. |
| buttonElementTags |            | readonly  | string[]                                                                                  |         |          | Gets the tag names of the buttons the form can use as submit and reset buttons, when they have `type="submit"` or `type="reset"`.                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| formElementTags   |            | readonly  | string[]                                                                                  |         |          | Gets the tag names of the Auro form elements the form tracks. Elements registered under a custom tag name are matched by an attribute named after the original tag, such as `auro-input`.                                                                                                                                                                                                                                                                                                                                                                                                 |

### Methods

| Name     | Parameters                                                 | Return        | Description                                                                                                                                                                                                                                                                                                 |
| -------- | ---------------------------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| register | `name` (string) - The custom element tag name to register. |               | Registers the `auro-form` custom element with the browser under a given tag name.                                                                                                                                                                                                                           |
| reset    | None                                                       | void          | Resets every tracked form element by calling its own `reset()`, then fires a `reset` event with the form's values from just before the reset in `detail.previousValue`. Each element decides what resetting means: for example, `auro-input` clears its value instead of restoring the one it started with. |
| submit   | None                                                       | Promise<void> | Validates every enabled form element and, when none is invalid or required but empty, fires a `submit` event with the form's current values in `detail.value`. Otherwise, each invalid field shows its error and the `submit` event doesn't fire.                                                           |

### Events

| Name   | Description                                                                                                                                         |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| change | Fires when a child form element's value changes, and when the form rebuilds its state, such as after its content changes or a reset.                |
| input  | Fires when a child form element receives user input.                                                                                                |
| reset  | Fires after the form resets. The event's `detail.previousValue` holds the form's values from just before the reset.                                 |
| submit | Fires when the form is submitted and no enabled field is invalid or required but empty. The event's `detail.value` holds the form's current values. |

### Slots

| Name    | Category | Required | Description                                                                                                                                                                                   |
| ------- | -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| default | ui       | Yes      | Named Auro form elements, such as `auro-input` and `auro-select`, plus the submit and reset buttons the form controls. Fields can be nested in other elements, such as a `div` or `fieldset`. |
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/api.md) -->
<!-- AURO-GENERATED-CONTENT:END -->

## Basic

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

## Property & Attribute Examples

### Appearance on Dark Backgrounds

Use the `appearance="inverse"` attribute to apply styling appropriate for dark backgrounds.

<div class="exampleWrapper--ondark">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

### Behavior

There are two behaviors available for the combo box: `suggestion` and `filter`.
The default behavior is `suggestion`.

#### Suggestion

With `behavior="suggestion"`, the menu options are displayed to the user as suggestions, but the user may enter whatever value they like into the input.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/suggestion.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/suggestion.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

#### Filter

With `behavior="filter"`, the menu options are displayed to the user, and the user is required to choose one of the menu options in order for the input to be considered valid.

The `setCustomValidityValueMissingFilter` attribute is also available to display a custom message to the user when this validation check fails.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/filter.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/filter.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

### Checkmark on Selected Option

Use the `checkmark` attribute to display a checkmark next to the selected option in the dropdown menu.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/checkmark.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/checkmark.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

### Customized Bib Position

The bib position can be customized with `placement`, `offset`, `flip`, `autoPlacement`, and `shift` attributes.

- `placement` specifies the preferred position where the bib should appear relative to the trigger.
- `offset` sets the distance between the trigger and the bib.
- When `autoPlacement` is enabled, smart positioning logic is applied to determine the best placement for the bib. If all sides have sufficient space, the bib will appear in the position specified by `placement`.
- Unless `noFlip` is enabled, if there isn't enough space for the preferred `placement`, the bib will automatically flip to an alternative position.
- `shift` when enabled, adjusts the bib position when it would overflow the viewport boundaries, ensuring it remains visible.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/floater-config.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/floater-config.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

### Disabled

Use the `disabled` attribute to disable the combobox.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<div class="exampleWrapper--ondark" aria-hidden>
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse-disabled.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse-disabled.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

#### Error

Using the `error` attribute with a given message sets a persistent error state (e.g. an error state returned from the server). 

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/error.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<div class="exampleWrapper--ondark" aria-hidden>
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse-error.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/error.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse-error.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

### Fullscreen Bib

You can make the dropdown open in fullscreen at a specific breakpoint by setting `fullscreenBreakpoint`.

The default value of `fullscreenBreakpoint` is `sm`. 

Breakpoint token can be found [here](https://auro.alaskaair.com/getting-started/developers/design-tokens).

To support fullcreen bib, setting `bib.fullscreen.headline` is **STRONGLY RECOMMENDED**.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/fullscreen-breakpoint.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/fullscreen-breakpoint.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

### Input Mode

You can manually set the `inputmode` for the input.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/inputmode.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>


<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/inputmode.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

### Layouts

#### Emphasized

Use `layout="emphasized"` to apply the emphasized style to the combobox. This layout is designed for use on light backgrounds.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/emphasized/basic.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/emphasized/basic.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
 
</auro-accordion>

#### Snowflake

Use `layout="snowflake"`, with `shape="snowflake"` and `appearance="inverse"` to apply the snowflake style to the combobox. This layout is designed for use on dark backgrounds.

<div class="exampleWrapper--ondark">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/snowflake/basic.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/snowflake/basic.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

### Turn off Filtering

If set, combobox will not do suggestion filtering of the menuoptions. This option is useful when the `<auro-menuoption>` elements are being pre-filtered externally to combobox (e.g. using the citysearch API).

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/no-filter.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/no-filter.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

### Turn off Validation

Set the `noValidate` attribute to disable auto-validation on blur. This is intended for use with the `required` attribute. 

By using these two attributes in combination, the validation for required fields is still computed for forms but no validation messaging will be generated in the UI.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/no-validate.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/no-validate.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

### Persistent Input

The `persistInput` attribute allows you to set the combobox to persist the value of the input regardless of the current value set for the combobox.

A persistent input is typically used in conjunction with display values to show the actual value of the selected option to the user when the input is not focused.

This is helpful for things like dynamic menus where you want the user to be able to continue their search where they left off but display a full selected value when the input is not focused.

**Note**: When using `persistInput` with the `required` attribute, you must also pass an error message for when there isn't a valid value but the user has typed something in the input to the `setCustomValidityValueMissing` attribute.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/persist-input.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/persist-input.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

### Required

Populates the `required` attribute on the input. Used for client-side validation.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/required.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/required.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

### Type

When defined, the `auro-input` in the combobox trigger will use the defined `type`. These examples use the `triggerIcon` attribute to provide context to the user about the expected input type.

#### Credit Card

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/type_credit-card.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/type_credit-card.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

#### Month-Day-Year

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/type_month-day-year.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/type_month-day-year.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

### Value

Use the `value` attribute to programmatically set the value of the combobox.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/programmatic-value.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/programmatic-value.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

## Method Examples

### Focus

The `focus()` method will apply focus state to the combobox input field.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/focus.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/focus.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/focus.js) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

### Reset

Use the `reset()` method to reset the `<auro-combobox>`'s `value` and `validity` state. Doing so will preserve all other attributes and properties.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/reset-state.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/reset-state.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/reset-state.js) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

### Updating Externally

The `updateActiveOption` method allows you to programmatically set which menu option is active/highlighted. This is useful for situations like matching IATA codes (sea -> SeaTac airport).

The method accepts an index parameter representing the position of the option to make active in the menu.

<div class="exampleWrapper--ondark">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/external-selection.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/external-selection.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/external-selection.js) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

## Slot Examples

### Custom Display Value

You can fully customize how selected values appear by using the `displayValue` slot. This slot allows you to pass in any HTML content. Only the `snowflake` and `emphasized` layouts are supported.

<div class="exampleWrapper--ondark">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/display-value.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/display-value.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

### Custom Optional Label

The `<auro-combobox>` supports an `optionalLabel` slot, where users can can override the default `(optional)` notification text.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/optional-label.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/optional-label.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

### Help Text

Sets the help text displayed below the trigger. The `helpText` slot can be used to provide additional context for the combobox. When using the `error` property, the `helpText` slot can be used to describe the error.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/help-text.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/help-text.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

## Common Usage Patterns & Functional Examples

### Static Menu Options when No Match

This example demonstrates a combobox populated with a static menu option that appears when there is not an option that matches the user's input. Use the `<auro-menuoptions>`'s `static` and `nomatch` attributes to achieve this behavior.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/no-match.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/no-match.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

</auro-accordion>

### Custom Bib Height

This example shows how to set a custom height for the bib from `<auro-menu>`. Custom height dimensions are set by applying a `max-height` rule and value on the `<auro-menu>`.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/max-height.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/max-height.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

### Airports example

Combobox populated with airport options.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/airports.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/airports.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

### Dynamically Set Value

Use the `value` attribute in combination with another element to dynamically set the value of the combobox.

Can be used in the following ways:
* Preset the value of the combobox to valid menu option
* Set the value of the combobox to invalid menu option
* Reset the value of the combobox to undefined

Note: using a value that does not match a menu option will reset the combobox value to undefined.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/value.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/value.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/value.js) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

### In Dialog

Example use of component within an `auro-dialog`.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/in-dialog.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/in-dialog.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/in-dialog.js) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

### Persistent Menu Option with a Custom Event

This example demonstrates a static menu option that will always appears regardless of the suggestion filtering performed. In this example "Add new address" will always be a displayed menu option.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/persistent.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/persistent.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/persistent.js) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

### Swapping Values Between Comboboxes

This example illustrates using a JavaScript function attached to an auro-button component click event to swap the values of two `auro-combobox` elements. An example of this use case would be swapping the departure and arrival airports in a flight search form.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/swap-value.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/swap-value.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/swap-value.js) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>



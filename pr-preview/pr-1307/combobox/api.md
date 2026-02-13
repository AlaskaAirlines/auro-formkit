<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/api.md) -->
<!-- The below content is automatically added from ./../docs/api.md -->

# auro-combobox

The `auro-combobox` element provides users with a way to select an option from a list of filtered or suggested options based on user input.

## Properties

| Property                              | Attribute                             | Modifiers | Type                                             | Default          | Description                                      |
|---------------------------------------|---------------------------------------|-----------|--------------------------------------------------|------------------|--------------------------------------------------|
| [appearance](#appearance)                          | `appearance`                          |           | `string`                                         | "'default'"      | Defines whether the component will be on lighter or darker backgrounds. |
| [autoPlacement](#autoPlacement)                       | `autoPlacement`                       |           | `boolean`                                        |                  | If declared, bib's position will be automatically calculated where to appear. |
| [autocomplete](#autocomplete)                        | `autocomplete`                        |           | `string`                                         |                  | An enumerated attribute that defines what the user agent can suggest for autofill. At this time, only `autocomplete="off"` is supported. |
| [behavior](#behavior)                            | `behavior`                            |           | `'filter' \| 'suggestion'`                       | "'suggestion'"   | Sets the behavior of the combobox, "filter" or "suggestion".<br />"filter" requires the user to select an option from the menu.<br />"suggestion" allows the user to enter a value not present in the menu options. |
| [checkmark](#checkmark)                           | `checkmark`                           |           | `boolean`                                        |                  | When attribute is present auro-menu will apply check marks to selected options. |
| [disabled](#disabled)                            | `disabled`                            |           | `boolean`                                        |                  | If set, disables the combobox.                   |
| [dvInputOnly](#dvInputOnly)                         | `dvInputOnly`                         |           | `boolean`                                        |                  | If defined, the display value slot content will only mask the HTML5 input element. The inputs label will not be masked. |
| [error](#error)                               | `error`                               |           | `string`                                         |                  | When defined, sets persistent validity to `customError` and sets the validation message to the attribute value. |
| [format](#format)                              | `format`                              |           | `string`                                         |                  | Specifies the input mask format.                 |
| [fullscreenBreakpoint](#fullscreenBreakpoint)                | `fullscreenBreakpoint`                |           | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'disabled'` | "'sm'"           | Defines the screen size breakpointat which the dropdown switches to fullscreen mode on mobile. `disabled` indicates a dropdown should _never_ enter fullscreen.<br /><br />When expanded, the dropdown will automatically display in fullscreen mode<br />if the screen size is equal to or smaller than the selected breakpoint. |
| [inputValue](#inputValue)                          |                                       | readonly  | `string \| undefined`                            |                  | Returns the current value of the input element within the combobox. |
| [inputmode](#inputmode)                           | `inputmode`                           |           | `string`                                         |                  | Exposes inputmode attribute for input.           |
| [largeFullscreenHeadline](#largeFullscreenHeadline)             | `largeFullscreenHeadline`             |           | `boolean`                                        |                  | If declared, make bib.fullscreen.headline in HeadingDisplay.<br />Otherwise, Heading 600 |
| [layout](#layout)                              | `layout`                              |           | `'classic' \| 'emphasized' \| 'snowflake'`       | "'classic'"      | Sets the layout of the combobox.                 |
| [noFilter](#noFilter)                            | `noFilter`                            |           | `boolean`                                        |                  | If set, combobox will not filter menuoptions based on input. |
| [noFlip](#noFlip)                              | `noFlip`                              |           | `boolean`                                        |                  | If declared, the bib will NOT flip to an alternate position<br />when there isn't enough space in the specified `placement`. |
| [noValidate](#noValidate)                          | `noValidate`                          |           | `boolean`                                        |                  | If set, disables auto-validation on blur.        |
| [offset](#offset)                              | `offset`                              |           | `number`                                         | "0"              | Gap between the trigger element and bib.         |
| [onDark](#onDark)                              | `onDark`                              |           | `boolean`                                        |                  | DEPRECATED - use `appearance="inverse"` instead. |
| [optionSelected](#optionSelected)                      | `optionSelected`                      |           | `HTMLElement`                                    |                  | Specifies the current selected option.           |
| [persistInput](#persistInput)                        | `persistInput`                        |           | `boolean`                                        |                  | If declared, selecting a menu option will not change the input value. By doing so,<br />the current menu filter will be preserved and the user can continue from their last<br />filter state. It is recommended to use this in combination with the `displayValue` slot. |
| [placeholder](#placeholder)                         | `placeholder`                         |           | `string`                                         |                  | Define custom placeholder text, only supported by date input formats. |
| [placement](#placement)                           | `placement`                           |           | `'top' \| 'right' \| 'bottom' \| 'left' \| 'bottom-start' \| 'top-start' \| 'top-end' \| 'right-start' \| 'right-end' \| 'bottom-end' \| 'left-start' \| 'left-end'` | "'bottom-start'" | Position where the bib should appear relative to the trigger. |
| [required](#required)                            | `required`                            |           | `boolean`                                        |                  | Populates the `required` attribute on the input. Used for client-side validation. |
| [setCustomValidity](#setCustomValidity)                   | `setCustomValidity`                   |           | `string`                                         |                  | Sets a custom help text message to display for all validityStates. |
| [setCustomValidityCustomError](#setCustomValidityCustomError)        | `setCustomValidityCustomError`        |           | `string`                                         |                  | Custom help text message to display when validity = `customError`. |
| [setCustomValidityValueMissing](#setCustomValidityValueMissing)       | `setCustomValidityValueMissing`       |           | `string`                                         |                  | Custom help text message to display when validity = `valueMissing`. |
| [setCustomValidityValueMissingFilter](#setCustomValidityValueMissingFilter) | `setCustomValidityValueMissingFilter` |           | `string`                                         |                  | Custom help text message to display when validity = `valueMissing` due to the user not choosing a menu option when behavior = "filter". |
| [shift](#shift)                               | `shift`                               |           | `boolean`                                        |                  | If declared, the dropdown will shift its position to avoid being cut off by the viewport. |
| [triggerIcon](#triggerIcon)                         | `triggerIcon`                         |           | `boolean`                                        |                  | If set, the `icon` attribute will be applied to the trigger `auro-input` element. |
| [type](#type)                                | `type`                                |           | `string`                                         |                  | Applies the defined value as the type attribute on `auro-input`. |
| [typedValue](#typedValue)                          | `typedValue`                          |           | `string`                                         |                  | Specifies the value of the input element within the combobox. |
| [validity](#validity)                            | `validity`                            |           | `string`                                         |                  | Specifies the `validityState` this element is in. |
| [value](#value)                               | `value`                               |           | `string`                                         |                  | Value selected for the dropdown menu.            |

## Methods

| Method               | Type                                   | Description                                      |
|----------------------|----------------------------------------|--------------------------------------------------|
| [clear](#clear)              | `(): void`                             | Clears the current value of the combobox.        |
| [focus](#focus)              | `(): void`                             | Focuses the combobox trigger input.              |
| [hideBib](#hideBib)            | `(): void`                             | Hides the dropdown bib if its open.              |
| [isValid](#isValid)            | `(): boolean`                          | Checks if the element is valid.                  |
| [reset](#reset)              | `(): void`                             | Resets component to initial state.               |
| [setMenuValue](#setMenuValue)       | `(value: string): void`                | Sets the menu value if menu is available.<br /><br />**value**: The value to set on the menu. |
| [showBib](#showBib)            | `(): void`                             | Shows the dropdown bib if there are options to show. |
| [updateActiveOption](#updateActiveOption) | `(index: number): void`                | Updates the active option in the menu.<br /><br />**index**: Index of the option to make active. |
| [validate](#validate)           | `(force?: boolean \| undefined): void` | Validates value.<br /><br />**force**: Whether to force validation. |

## Events

| Event                       | Type                                             | Description                                      |
|-----------------------------|--------------------------------------------------|--------------------------------------------------|
| `auroCombobox-valueSet`     | `CustomEvent<any>`                               | (Deprecated) Notifies that the component has a new value set. |
| `auroFormElement-validated` |                                                  | Notifies that the component value(s) have been validated. |
| [input](#input)                     | `CustomEvent<{ optionSelected: any; value: any; }>` | Notifies that the component has a new value set. |
| [inputValue](#inputValue)                | `CustomEvent<{ value: string \| undefined; }>`   | Notifies that the components internal HTML5 input value has changed. |

## Slots

| Name                      | Description                                      |
|---------------------------|--------------------------------------------------|
|                           | Default slot for the menu content.               |
| `ariaLabel.bib.close`     | Sets aria-label on close button in fullscreen bib |
| `ariaLabel.input.clear`   | Sets aria-label on clear button                  |
| `bib.fullscreen.headline` | Defines the headline to display above menu-options |
| [displayValue](#displayValue)            | Allows custom HTML content to display the selected value when the combobox is not focused. Only works with `snowflake` and `emphasized` layouts. |
| [helpText](#helpText)                | Defines the content of the helpText.             |
| [label](#label)                   | Defines the content of the label.                |
| [optionalLabel](#optionalLabel)           | Allows overriding the optional display text "(optional)", which appears next to the label. |
<!-- AURO-GENERATED-CONTENT:END -->

## Basic

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
  <!-- The below content is automatically added from ./../apiExamples/basic.html -->
  <auro-combobox>
    <span slot="ariaLabel.bib.close">Close combobox</span>
    <span slot="ariaLabel.input.clear">Clear All</span>
    <span slot="bib.fullscreen.headline">Bib Header</span>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->

```html
<auro-combobox>
  <span slot="ariaLabel.bib.close">Close combobox</span>
  <span slot="ariaLabel.input.clear">Clear All</span>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Property & Attribute Examples

### Appearance on Dark Backgrounds

Use the `appearance="inverse"` attribute to apply styling appropriate for dark backgrounds.

<div class="exampleWrapper--ondark">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse.html) -->
  <!-- The below content is automatically added from ./../apiExamples/appearance-inverse.html -->
  <auro-combobox appearance="inverse">
    <span slot="bib.fullscreen.headline">Bib Header</span>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/appearance-inverse.html -->

```html
<auro-combobox appearance="inverse">
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Behavior

There are two behaviors available for the combo box: `suggestion` and `filter`.
The default behavior is `suggestion`.

#### Suggestion

With `behavior="suggestion"`, the menu options are displayed to the user as suggestions, but the user may enter whatever value they like into the input.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/suggestion.html) -->
  <!-- The below content is automatically added from ./../apiExamples/suggestion.html -->
  <auro-combobox behavior="suggestion">
    <span slot="ariaLabel.bib.close">Close combobox</span>
    <span slot="ariaLabel.input.clear">Clear All</span>
    <span slot="bib.fullscreen.headline">Bib Header</span>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/suggestion.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/suggestion.html -->

```html
<auro-combobox behavior="suggestion">
  <span slot="ariaLabel.bib.close">Close combobox</span>
  <span slot="ariaLabel.input.clear">Clear All</span>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Filter

With `behavior="filter"`, the menu options are displayed to the user, and the user is required to choose one of the menu options in order for the input to be considered valid.

The `setCustomValidityValueMissingFilter` attribute is also available to display a custom message to the user when this validation check fails.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/filter.html) -->
  <!-- The below content is automatically added from ./../apiExamples/filter.html -->
  <auro-combobox behavior="filter" setCustomValidityValueMissingFilter="Please select an option from the list">
    <span slot="ariaLabel.bib.close">Close combobox</span>
    <span slot="ariaLabel.input.clear">Clear All</span>
    <span slot="bib.fullscreen.headline">Bib Header</span>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/filter.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/filter.html -->

```html
<auro-combobox behavior="filter" setCustomValidityValueMissingFilter="Please select an option from the list">
  <span slot="ariaLabel.bib.close">Close combobox</span>
  <span slot="ariaLabel.input.clear">Clear All</span>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Checkmark on Selected Option

Use the `checkmark` attribute to display a checkmark next to the selected option in the dropdown menu.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/checkmark.html) -->
  <!-- The below content is automatically added from ./../apiExamples/checkmark.html -->
  <auro-combobox checkmark>
      <span slot="bib.fullscreen.headline">Bib Header</span>
      <span slot="label">Name</span>
      <auro-menu>
          <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
          <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
          <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
          <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
          <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
          <auro-menuoption static nomatch>No matching option</auro-menuoption>
      </auro-menu>
  </auro-combobox>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/checkmark.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/checkmark.html -->

```html
<auro-combobox checkmark>
    <span slot="bib.fullscreen.headline">Bib Header</span>
    <span slot="label">Name</span>
    <auro-menu>
        <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
        <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
        <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
        <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
        <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
        <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
</auro-combobox>
```
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
  <!-- The below content is automatically added from ./../apiExamples/floater-config.html -->
  <div style="width: 350px">
    <auro-combobox offset="20" noFlip placement="bottom-end">
      <span slot="bib.fullscreen.headline">Bib Header</span>
      <span slot="label">Label</span>
      <span slot="helpText">bottom-end bib with 20px offset and noFlip</span>
      <auro-menu>
        <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
        <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
        <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
        <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
        <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
        <auro-menuoption static nomatch>No matching option</auro-menuoption>
      </auro-menu>
    </auro-combobox>
    <auro-combobox offset="20" placement="bottom-end">
      <span slot="bib.fullscreen.headline">Bib Header</span>
      <span slot="label">Label</span>
      <span slot="helpText">bottom-end bib with 20px offset and flip</span>
      <auro-menu>
        <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
        <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
        <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
        <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
        <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
        <auro-menuoption static nomatch>No matching option</auro-menuoption>
      </auro-menu>
    </auro-combobox>
    <auro-combobox offset="20" noFlip placement="right" autoPlacement>
      <span slot="bib.fullscreen.headline">Bib Header</span>
      <span slot="label">Label</span>
      <span slot="helpText">right bib with 20px offset, noFlip and autoPlacement</span>
      <auro-menu>
        <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
        <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
        <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
        <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
        <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
        <auro-menuoption static nomatch>No matching option</auro-menuoption>
      </auro-menu>
    </auro-combobox>
    <auro-combobox width="350px" offset="20" noFlip placement="bottom-start" shift>
      <span slot="bib.fullscreen.headline">Bib Header</span>
      <span slot="label">Label</span>
      <span slot="helpText">bottom-start bib with 20px offset, noFlip and shift</span>
      <auro-menu>
        <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
        <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
        <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
        <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
        <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
        <auro-menuoption static nomatch>No matching option</auro-menuoption>
      </auro-menu>
    </auro-combobox>
  </div>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/floater-config.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/floater-config.html -->

```html
<div style="width: 350px">
  <auro-combobox offset="20" noFlip placement="bottom-end">
    <span slot="bib.fullscreen.headline">Bib Header</span>
    <span slot="label">Label</span>
    <span slot="helpText">bottom-end bib with 20px offset and noFlip</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  <auro-combobox offset="20" placement="bottom-end">
    <span slot="bib.fullscreen.headline">Bib Header</span>
    <span slot="label">Label</span>
    <span slot="helpText">bottom-end bib with 20px offset and flip</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  <auro-combobox offset="20" noFlip placement="right" autoPlacement>
    <span slot="bib.fullscreen.headline">Bib Header</span>
    <span slot="label">Label</span>
    <span slot="helpText">right bib with 20px offset, noFlip and autoPlacement</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  <auro-combobox width="350px" offset="20" noFlip placement="bottom-start" shift>
    <span slot="bib.fullscreen.headline">Bib Header</span>
    <span slot="label">Label</span>
    <span slot="helpText">bottom-start bib with 20px offset, noFlip and shift</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
  </auro-combobox>
</div>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Disabled

Use the `disabled` attribute to disable the combobox.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled.html) -->
  <!-- The below content is automatically added from ./../apiExamples/disabled.html -->
  <auro-combobox disabled>
    <span slot="bib.fullscreen.headline">Bib Header</span>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<div class="exampleWrapper--ondark" aria-hidden>
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse-disabled.html) -->
  <!-- The below content is automatically added from ./../apiExamples/appearance-inverse-disabled.html -->
  <auro-combobox appearance="inverse" disabled>
    <span slot="bib.fullscreen.headline">Bib Header</span>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/disabled.html -->

```html
<auro-combobox disabled>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse-disabled.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/appearance-inverse-disabled.html -->

```html
<auro-combobox appearance="inverse" disabled>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Error

Using the `error` attribute with a given message sets a persistent error state (e.g. an error state returned from the server). 

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/error.html) -->
  <!-- The below content is automatically added from ./../apiExamples/error.html -->
  <auro-combobox error="Custom error message">
    <span slot="bib.fullscreen.headline">Bib Header</span>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<div class="exampleWrapper--ondark" aria-hidden>
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse-error.html) -->
  <!-- The below content is automatically added from ./../apiExamples/appearance-inverse-error.html -->
  <auro-combobox appearance="inverse" error="Custom error message">
    <span slot="bib.fullscreen.headline">Bib Header</span>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/error.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/error.html -->

```html
<auro-combobox error="Custom error message">
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse-error.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/appearance-inverse-error.html -->

```html
<auro-combobox appearance="inverse" error="Custom error message">
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Fullscreen Bib

You can make the dropdown open in fullscreen at a specific breakpoint by setting `fullscreenBreakpoint`.

The default value of `fullscreenBreakpoint` is `sm`. 

Breakpoint token can be found [here](https://auro.alaskaair.com/getting-started/developers/design-tokens).

To support fullcreen bib, setting `bib.fullscreen.headline` is **STRONGLY RECOMMENDED**.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/fullscreen-breakpoint.html) -->
  <!-- The below content is automatically added from ./../apiExamples/fullscreen-breakpoint.html -->
  <auro-combobox fullscreenBreakpoint="lg">
    <span slot="bib.fullscreen.headline">Bib Header</span>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/fullscreen-breakpoint.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/fullscreen-breakpoint.html -->

```html
<auro-combobox fullscreenBreakpoint="lg">
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Input Mode

You can manually set the `inputmode` for the input.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/inputmode.html) -->
  <!-- The below content is automatically added from ./../apiExamples/inputmode.html -->
  <auro-combobox inputmode="numeric">
    <span slot="bib.fullscreen.headline">Bib Header</span>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="1" id="option-0">1</auro-menuoption>
      <auro-menuoption value="2" id="option-1">2</auro-menuoption>
      <auro-menuoption value="3" id="option-2">3</auro-menuoption>
      <auro-menuoption value="4" id="option-3">4</auro-menuoption>
      <auro-menuoption value="5" id="option-4">5</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/inputmode.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/inputmode.html -->

```html
<auro-combobox inputmode="numeric">
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="1" id="option-0">1</auro-menuoption>
    <auro-menuoption value="2" id="option-1">2</auro-menuoption>
    <auro-menuoption value="3" id="option-2">3</auro-menuoption>
    <auro-menuoption value="4" id="option-3">4</auro-menuoption>
    <auro-menuoption value="5" id="option-4">5</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Layouts

#### Emphasized

Use `layout="emphasized"` to apply the emphasized style to the combobox. This layout is designed for use on light backgrounds.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/emphasized/basic.html) -->
  <!-- The below content is automatically added from ./../apiExamples/emphasized/basic.html -->
  <auro-combobox layout="emphasized" value="Oranges" shape="pill" size="xl" placeholder="Placeholder content" required style="width: 249px;">
    <span slot="ariaLabel.bib.close">Close combobox</span>
    <span slot="ariaLabel.input.clear">Clear All</span>
    <span slot="bib.fullscreen.headline">Bib Header</span>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
    <span slot="helpText">
      Help text - Lorem ipsum solar lorem ipsum solar
    </span>
    <span slot="displayValue">
      <div>
        <div class="mainText">Apples</div>
        <div class="subText">Fruit</div>
      </div>
    </span>
  </auro-combobox>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/emphasized/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/emphasized/basic.html -->

```html
<auro-combobox layout="emphasized" value="Oranges" shape="pill" size="xl" placeholder="Placeholder content" required style="width: 249px;">
  <span slot="ariaLabel.bib.close">Close combobox</span>
  <span slot="ariaLabel.input.clear">Clear All</span>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
  <span slot="helpText">
    Help text - Lorem ipsum solar lorem ipsum solar
  </span>
  <span slot="displayValue">
    <div>
      <div class="mainText">Apples</div>
      <div class="subText">Fruit</div>
    </div>
  </span>
</auro-combobox>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Snowflake

Use `layout="snowflake"`, with `shape="snowflake"` and `appearance="inverse"` to apply the snowflake style to the combobox. This layout is designed for use on dark backgrounds.

<div class="exampleWrapper--ondark">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/snowflake/basic.html) -->
  <!-- The below content is automatically added from ./../apiExamples/snowflake/basic.html -->
  <auro-combobox layout="snowflake" shape="snowflake" size="lg" placeholder="Placeholder content" required appearance="inverse" style="width: 249px;">
    <span slot="ariaLabel.bib.close">Close combobox</span>
    <span slot="ariaLabel.input.clear">Clear All</span>
    <span slot="bib.fullscreen.headline">Bib Header</span>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
    <span slot="helpText">
      Help text - Lorem ipsum solar lorem ipsum solar
    </span>
  </auro-combobox>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/snowflake/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/snowflake/basic.html -->

```html
<auro-combobox layout="snowflake" shape="snowflake" size="lg" placeholder="Placeholder content" required appearance="inverse" style="width: 249px;">
  <span slot="ariaLabel.bib.close">Close combobox</span>
  <span slot="ariaLabel.input.clear">Clear All</span>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
  <span slot="helpText">
    Help text - Lorem ipsum solar lorem ipsum solar
  </span>
</auro-combobox>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Turn off Filtering

If set, combobox will not do suggestion filtering of the menuoptions. This option is useful when the `<auro-menuoption>` elements are being pre-filtered externally to combobox (e.g. using the citysearch API).

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/no-filter.html) -->
  <!-- The below content is automatically added from ./../apiExamples/no-filter.html -->
  <auro-combobox noFilter>
    <span slot="bib.fullscreen.headline">noFilter Combobox Header</span>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/no-filter.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/no-filter.html -->

```html
<auro-combobox noFilter>
  <span slot="bib.fullscreen.headline">noFilter Combobox Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Turn off Validation

Set the `noValidate` attribute to disable auto-validation on blur. This is intended for use with the `required` attribute. 

By using these two attributes in combination, the validation for required fields is still computed for forms but no validation messaging will be generated in the UI.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/no-validate.html) -->
  <!-- The below content is automatically added from ./../apiExamples/no-validate.html -->
  <auro-combobox required noValidate>
    <span slot="bib.fullscreen.headline">noValidate Combobox Header</span>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/no-validate.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/no-validate.html -->

```html
<auro-combobox required noValidate>
  <span slot="bib.fullscreen.headline">noValidate Combobox Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Persistent Input

The `persistInput` attribute allows you to set the combobox to persist the value of the input regardless of the current value set for the combobox.

A persistent input is typically used in conjunction with display values to show the actual value of the selected option to the user when the input is not focused.

This is helpful for things like dynamic menus where you want the user to be able to continue their search where they left off but display a full selected value when the input is not focused.

**Note**: When using `persistInput` with the `required` attribute, you must also pass an error message for when there isn't a valid value but the user has typed something in the input to the `setCustomValidityValueMissing` attribute.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/persist-input.html) -->
  <!-- The below content is automatically added from ./../apiExamples/persist-input.html -->
  <auro-combobox
    required
    persistInput
    setCustomValidityValueMissing="Please select an option from the list."
    >
    <span slot="bib.fullscreen.headline">Persistant Input</span>
    <span slot="label">Persistant Input</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">
        Apples
        <div slot="displayValue">Apples</div>
      </auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">
        Oranges
        <div slot="displayValue">Oranges</div>
      </auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">
        Peaches
        <div slot="displayValue">Peaches</div>
      </auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">
        Grapes
        <div slot="displayValue">Grapes</div>
      </auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">
        Cherries
        <div slot="displayValue">Cherries</div>
      </auro-menuoption>
    </auro-menu>
  </auro-combobox>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/persist-input.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/persist-input.html -->

```html
<auro-combobox
  required
  persistInput
  setCustomValidityValueMissing="Please select an option from the list."
  >
  <span slot="bib.fullscreen.headline">Persistant Input</span>
  <span slot="label">Persistant Input</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">
      Apples
      <div slot="displayValue">Apples</div>
    </auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">
      Oranges
      <div slot="displayValue">Oranges</div>
    </auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">
      Peaches
      <div slot="displayValue">Peaches</div>
    </auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">
      Grapes
      <div slot="displayValue">Grapes</div>
    </auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">
      Cherries
      <div slot="displayValue">Cherries</div>
    </auro-menuoption>
  </auro-menu>
</auro-combobox>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Required

Populates the `required` attribute on the input. Used for client-side validation.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/required.html) -->
  <!-- The below content is automatically added from ./../apiExamples/required.html -->
  <auro-combobox required>
    <span slot="bib.fullscreen.headline">Bib Header</span>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/required.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/required.html -->

```html
<auro-combobox required>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Type

When defined, the `auro-input` in the combobox trigger will use the defined `type`. These examples use the `triggerIcon` attribute to provide context to the user about the expected input type.

#### Credit Card

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/type_credit-card.html) -->
  <!-- The below content is automatically added from ./../apiExamples/type_credit-card.html -->
  <auro-combobox type="credit-card" triggerIcon>
    <span slot="bib.fullscreen.headline">Credit Card</span>
    <span slot="label">Credit Card Number</span>
    <auro-menu>
      <auro-menuoption value="4500000000000000" id="option-cc-0">
        <auro-icon category="payment" customcolor name="cc-visa"></auro-icon>
        4000 0000 0000 0000
      </auro-menuoption>
      <auro-menuoption value="340000000000000" id="option-cc-1">
        <auro-icon category="payment" customcolor name="cc-amex"></auro-icon>
        3400 000000 00000
      </auro-menuoption>
      <auro-menuoption value="30000000000000" id="option-cc-2">
        <auro-icon category="payment" customcolor name="credit-card"></auro-icon>
        3000 000000 0000
      </auro-menuoption>
      <auro-menuoption value="5100000000000000" id="option-cc-4">
        <auro-icon category="payment" customcolor name="cc-mastercard"></auro-icon>
        5000 0000 0000 0000
      </auro-menuoption>
      <auro-menuoption value="6011000000000000" id="option-cc-5">
        <auro-icon category="payment" customcolor name="cc-discover"></auro-icon>
        6000 0000 0000 0000
      </auro-menuoption>
      <auro-menuoption static nomatch>No matching credit card saved</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/type_credit-card.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/type_credit-card.html -->

```html
<auro-combobox type="credit-card" triggerIcon>
  <span slot="bib.fullscreen.headline">Credit Card</span>
  <span slot="label">Credit Card Number</span>
  <auro-menu>
    <auro-menuoption value="4500000000000000" id="option-cc-0">
      <auro-icon category="payment" customcolor name="cc-visa"></auro-icon>
      4000 0000 0000 0000
    </auro-menuoption>
    <auro-menuoption value="340000000000000" id="option-cc-1">
      <auro-icon category="payment" customcolor name="cc-amex"></auro-icon>
      3400 000000 00000
    </auro-menuoption>
    <auro-menuoption value="30000000000000" id="option-cc-2">
      <auro-icon category="payment" customcolor name="credit-card"></auro-icon>
      3000 000000 0000
    </auro-menuoption>
    <auro-menuoption value="5100000000000000" id="option-cc-4">
      <auro-icon category="payment" customcolor name="cc-mastercard"></auro-icon>
      5000 0000 0000 0000
    </auro-menuoption>
    <auro-menuoption value="6011000000000000" id="option-cc-5">
      <auro-icon category="payment" customcolor name="cc-discover"></auro-icon>
      6000 0000 0000 0000
    </auro-menuoption>
    <auro-menuoption static nomatch>No matching credit card saved</auro-menuoption>
  </auro-menu>
</auro-combobox>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Month-Day-Year

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/type_month-day-year.html) -->
  <!-- The below content is automatically added from ./../apiExamples/type_month-day-year.html -->
  <auro-combobox type="date" triggerIcon>
    <span slot="bib.fullscreen.headline">Date Combobox Header</span>
    <span slot="label">Date</span>
    <auro-menu>
      <auro-menuoption value="01/02/2020" id="option-date-0">
        01/02/2020
      </auro-menuoption>
      <auro-menuoption value="05/16/2022" id="option-date-1">
        05/16/2022
      </auro-menuoption>
    </auro-menu>
  </auro-combobox>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/type_month-day-year.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/type_month-day-year.html -->

```html
<auro-combobox type="date" triggerIcon>
  <span slot="bib.fullscreen.headline">Date Combobox Header</span>
  <span slot="label">Date</span>
  <auro-menu>
    <auro-menuoption value="01/02/2020" id="option-date-0">
      01/02/2020
    </auro-menuoption>
    <auro-menuoption value="05/16/2022" id="option-date-1">
      05/16/2022
    </auro-menuoption>
  </auro-menu>
</auro-combobox>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Value

Use the `value` attribute to programmatically set the value of the combobox.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/programmatic-value.html) -->
  <!-- The below content is automatically added from ./../apiExamples/programmatic-value.html -->
  <auro-combobox>
    <span slot="bib.fullscreen.headline">Bib Header</span>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/programmatic-value.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/programmatic-value.html -->

```html
<auro-combobox>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Method Examples

### Focus

The `focus()` method will apply focus state to the combobox input field.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/focus.html) -->
  <!-- The below content is automatically added from ./../apiExamples/focus.html -->
  <auro-button id="focusExampleBtn">Apply focus to combobox</auro-button>
  <br /><br />
  <auro-combobox id="focusExample">
    <span slot="bib.fullscreen.headline">Bib Header</span>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/focus.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/focus.html -->

```html
<auro-button id="focusExampleBtn">Apply focus to combobox</auro-button>
<br /><br />
<auro-combobox id="focusExample">
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/focus.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/focus.js -->

```js
export function focusExample() {
  const focusExample = document.querySelector('#focusExample');
  const focusExampleBtnElem = document.querySelector('#focusExampleBtn');

  focusExampleBtnElem.addEventListener('click', () => {
    focusExample.focus();
  });
}
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Reset

Use the `reset()` method to reset the `<auro-combobox>`'s `value` and `validity` state. Doing so will preserve all other attributes and properties.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/reset-state.html) -->
  <!-- The below content is automatically added from ./../apiExamples/reset-state.html -->
  <auro-button id="resetStateBtn">Reset</auro-button>
  <br /><br />
  <auro-combobox id="resetStateExample" required>
    <span slot="bib.fullscreen.headline">Bib Header</span>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/reset-state.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/reset-state.html -->

```html
<auro-button id="resetStateBtn">Reset</auro-button>
<br /><br />
<auro-combobox id="resetStateExample" required>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/reset-state.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/reset-state.js -->

```js
export function resetStateExample() {
  const elem = document.querySelector('#resetStateExample');

  document.querySelector('#resetStateBtn').addEventListener('click', () => {
    elem.reset();
  });
}
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Slot Examples

### Custom Display Value

You can fully customize how selected values appear by using the `displayValue` slot. This slot allows you to pass in any HTML content. Only the `snowflake` and `emphasized` layouts are supported.

<div class="exampleWrapper--ondark">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/display-value.html) -->
  <!-- The below content is automatically added from ./../apiExamples/display-value.html -->
  <auro-combobox layout="snowflake" shape="snowflake" size="xl" appearance="inverse" value="Apples">
    <span slot="bib.fullscreen.headline">Bib Header</span>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
    <div slot="displayValue">
        <div class="mainText">Custom display value</div>
        <div class="subText">Any html can be used</div>
    </div>
  </auro-combobox>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/display-value.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/display-value.html -->

```html
<auro-combobox layout="snowflake" shape="snowflake" size="xl" appearance="inverse" value="Apples">
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
  <div slot="displayValue">
      <div class="mainText">Custom display value</div>
      <div class="subText">Any html can be used</div>
  </div>
</auro-combobox>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Custom Optional Label

The `<auro-combobox>` supports an `optionalLabel` slot, where users can can override the default `(optional)` notification text.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/optional-label.html) -->
  <!-- The below content is automatically added from ./../apiExamples/optional-label.html -->
  <auro-combobox>
    <span slot="bib.fullscreen.headline">Bib Header</span>
    <span slot="label">Name</span>
    <span slot="optionalLabel" style="font-size: small; color: grey"> - optional</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/optional-label.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/optional-label.html -->

```html
<auro-combobox>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <span slot="optionalLabel" style="font-size: small; color: grey"> - optional</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Help Text

Sets the help text displayed below the trigger. The `helpText` slot can be used to provide additional context for the combobox. When using the `error` property, the `helpText` slot can be used to describe the error.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/help-text.html) -->
  <!-- The below content is automatically added from ./../apiExamples/help-text.html -->
  <auro-combobox>
    <span slot="bib.fullscreen.headline">Bib Header</span>
    <span slot="label">Name</span>
    <span slot="helpText">Custom help text</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/help-text.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/help-text.html -->

```html
<auro-combobox>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <span slot="helpText">Custom help text</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Common Usage Patterns & Functional Examples

### Static Menu Options when No Match

This example demonstrates a combobox populated with a static menu option that appears when there is not an option that matches the user's input. Use the `<auro-menuoptions>`'s `static` and `nomatch` attributes to achieve this behavior.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/no-match.html) -->
  <!-- The below content is automatically added from ./../apiExamples/no-match.html -->
  <auro-combobox>
    <span slot="ariaLabel.bib.close">Close combobox</span>
    <span slot="ariaLabel.input.clear">Clear All</span>
    <span slot="bib.fullscreen.headline">Bib Header</span>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/no-match.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/no-match.html -->

```html
<auro-combobox>
  <span slot="ariaLabel.bib.close">Close combobox</span>
  <span slot="ariaLabel.input.clear">Clear All</span>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</auro-accordion>

### Custom Bib Height

This example shows how to set a custom height for the bib from `<auro-menu>`. Custom height dimensions are set by applying a `max-height` rule and value on the `<auro-menu>`.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/max-height.html) -->
  <!-- The below content is automatically added from ./../apiExamples/max-height.html -->
  <auro-combobox>
    <span slot="ariaLabel.bib.close">Close combobox</span>
    <span slot="ariaLabel.input.clear">Clear All</span>
    <span slot="bib.fullscreen.headline">Bib Header</span>
    <span slot="label">Name</span>
    <auro-menu style="max-height: 200px">
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption value="Strawberries" id="option-5">Strawberries</auro-menuoption>
      <auro-menuoption value="Blueberries" id="option-6">Blueberries</auro-menuoption>
      <auro-menuoption value="Raspberries" id="option-7">Raspberries</auro-menuoption>
      <auro-menuoption value="Blackberries" id="option-8">Blackberries</auro-menuoption>
      <auro-menuoption value="Cranberries" id="option-9">Cranberries</auro-menuoption>
      <auro-menuoption value="Bananas" id="option-10">Bananas</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/max-height.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/max-height.html -->

```html
<auro-combobox>
  <span slot="ariaLabel.bib.close">Close combobox</span>
  <span slot="ariaLabel.input.clear">Clear All</span>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu style="max-height: 200px">
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption value="Strawberries" id="option-5">Strawberries</auro-menuoption>
    <auro-menuoption value="Blueberries" id="option-6">Blueberries</auro-menuoption>
    <auro-menuoption value="Raspberries" id="option-7">Raspberries</auro-menuoption>
    <auro-menuoption value="Blackberries" id="option-8">Blackberries</auro-menuoption>
    <auro-menuoption value="Cranberries" id="option-9">Cranberries</auro-menuoption>
    <auro-menuoption value="Bananas" id="option-10">Bananas</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Airports example

Combobox populated with airport options.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/airports.html) -->
  <!-- The below content is automatically added from ./../apiExamples/airports.html -->
  <auro-combobox>
    <span slot="bib.fullscreen.headline">Airports</span>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="fca" id="airport-fca" suggest="fca montana kalispell">glacier park international</auro-menuoption>
      <auro-menuoption value="sfo" id="airport-sfo" suggest="sfo california san francisco">san francisco international</auro-menuoption>
      <auro-menuoption value="boi" id="airport-boi" suggest="boi idaho boise">gowen field</auro-menuoption>
      <auro-menuoption value="stl" id="airport-stl" suggest="stl missouri st louis">lambert st louis international</auro-menuoption>
      <auro-menuoption value="ylw" id="airport-ylw" suggest="ylw british columbia kelowna">kelowna international</auro-menuoption>
      <auro-menuoption value="ykm" id="airport-ykm" suggest="ykm washington yakima">yakima air terminal</auro-menuoption>
      <auro-menuoption value="puw" id="airport-puw" suggest="puw washington pullman">pullman moscow regional</auro-menuoption>
      <auro-menuoption value="yeg" id="airport-yeg" suggest="yeg alberta edmonton">edmonton international</auro-menuoption>
      <auro-menuoption value="tpa" id="airport-tpa" suggest="tpa florida tampa">tampa international</auro-menuoption>
      <auro-menuoption value="msp" id="airport-msp" suggest="msp minnesota minneapolis">minneapolis st paul international</auro-menuoption>
      <auro-menuoption value="ida" id="airport-ida" suggest="ida idaho idaho falls">idaho falls regional airport</auro-menuoption>
      <auro-menuoption value="mfr" id="airport-mfr" suggest="mfr oregon medford">rogue valley international</auro-menuoption>
      <auro-menuoption value="psp" id="airport-psp" suggest="psp california palm springs">palm springs international</auro-menuoption>
      <auro-menuoption value="lir" id="airport-lir" suggest="lir guanacaste liberia">guanacaste airport</auro-menuoption>
      <auro-menuoption value="oak" id="airport-oak" suggest="oak california oakland">oakland international</auro-menuoption>
      <auro-menuoption value="bos" id="airport-bos" suggest="bos massachusetts boston">logan international</auro-menuoption>
      <auro-menuoption value="bwi" id="airport-bwi" suggest="bwi maryland baltimore">thurgood marshall international</auro-menuoption>
      <auro-menuoption value="dal" id="airport-dal" suggest="dal texas dallas">dallas love field</auro-menuoption>
      <auro-menuoption value="sba" id="airport-sba" suggest="sba california santa barbara">santa barbara municipal</auro-menuoption>
      <auro-menuoption value="mci" id="airport-mci" suggest="mci missouri kansas city">kansas city international</auro-menuoption>
      <auro-menuoption value="koa" id="airport-koa" suggest="koa hawaii kona">kona international</auro-menuoption>
      <auro-menuoption value="pvr" id="airport-pvr" suggest="pvr jalisco puerto vallarta">licenciado gustavo diaz ordaz international</auro-menuoption>
      <auro-menuoption value="wrg" id="airport-wrg" suggest="wrg alaska wrangell">wrangell</auro-menuoption>
      <auro-menuoption value="scc" id="airport-scc" suggest="scc alaska prudhoe bay">deadhorse</auro-menuoption>
      <auro-menuoption value="lto" id="airport-lto" suggest="lto baja california loreto">loreto international</auro-menuoption>
      <auro-menuoption value="ome" id="airport-ome" suggest="ome alaska nome">nome</auro-menuoption>
      <auro-menuoption value="ict" id="airport-ict" suggest="ict kansas wichita">dwight d eisenhower national</auro-menuoption>
      <auro-menuoption value="phl" id="airport-phl" suggest="phl pennsylvania philadelphia">philadelphia international</auro-menuoption>
      <auro-menuoption value="dfw" id="airport-dfw" suggest="dfw texas dallas">dallas fort worth international</auro-menuoption>
      <auro-menuoption value="ind" id="airport-ind" suggest="ind indiana indianapolis">indianapolis international</auro-menuoption>
      <auro-menuoption value="smf" id="airport-smf" suggest="smf california sacramento">sacramento international</auro-menuoption>
      <auro-menuoption value="sit" id="airport-sit" suggest="sit alaska sitka">rocky gutierrez</auro-menuoption>
      <auro-menuoption value="dut" id="airport-dut" suggest="dut alaska dutch harbor">unalaska</auro-menuoption>
      <auro-menuoption value="cdv" id="airport-cdv" suggest="cdv alaska cordova">merle mudhole smith</auro-menuoption>
      <auro-menuoption value="psg" id="airport-psg" suggest="psg alaska petersburg">james a johnson</auro-menuoption>
      <auro-menuoption value="bna" id="airport-bna" suggest="bna tennessee nashville">nashville international</auro-menuoption>
      <auro-menuoption value="geg" id="airport-geg" suggest="geg washington spokane">spokane international</auro-menuoption>
      <auro-menuoption value="ktn" id="airport-ktn" suggest="ktn alaska ketchikan">ketchikan international</auro-menuoption>
      <auro-menuoption value="pit" id="airport-pit" suggest="pit pennsylvania pittsburgh">pittsburgh international</auro-menuoption>
      <auro-menuoption value="sbp" id="airport-sbp" suggest="sbp california san luis obispo">san luis obispo regional</auro-menuoption>
      <auro-menuoption value="bur" id="airport-bur" suggest="bur california burbank">hollywood burbank</auro-menuoption>
      <auro-menuoption value="msy" id="airport-msy" suggest="msy louisiana new orleans">louis armstrong international</auro-menuoption>
      <auro-menuoption value="pae" id="airport-pae" suggest="pae washington everett">paine field</auro-menuoption>
      <auro-menuoption value="cvg" id="airport-cvg" suggest="cvg ohio cincinnati">cincinnati northern kentucky international</auro-menuoption>
      <auro-menuoption value="yak" id="airport-yak" suggest="yak alaska yakutat">yakutat</auro-menuoption>
      <auro-menuoption value="pdx" id="airport-pdx" suggest="pdx oregon portland">portland international</auro-menuoption>
      <auro-menuoption value="anc" id="airport-anc" suggest="anc alaska anchorage">ted stevens</auro-menuoption>
      <auro-menuoption value="sea" id="airport-sea" suggest="sea washington seattle">seattle tacoma international</auro-menuoption>
      <auro-menuoption value="san" id="airport-san" suggest="san california san diego">san diego international</auro-menuoption>
      <auro-menuoption value="sat" id="airport-sat" suggest="sat texas san antonio">san antonio international</auro-menuoption>
      <auro-menuoption value="fat" id="airport-fat" suggest="fat california fresno">fresno yosemite international</auro-menuoption>
      <auro-menuoption value="aus" id="airport-aus" suggest="aus texas austin">austin bergstrom international</auro-menuoption>
      <auro-menuoption value="ord" id="airport-ord" suggest="ord illinois chicago">ohare international</auro-menuoption>
      <auro-menuoption value="gdl" id="airport-gdl" suggest="gdl jalisco guadalajara">guadalajara international</auro-menuoption>
      <auro-menuoption value="sjc" id="airport-sjc" suggest="sjc california san jose">san jose international</auro-menuoption>
      <auro-menuoption value="jnu" id="airport-jnu" suggest="jnu alaska juneau">juneau international</auro-menuoption>
      <auro-menuoption value="rdm" id="airport-rdm" suggest="rdm oregon redmond">roberts field</auro-menuoption>
      <auro-menuoption value="sts" id="airport-sts" suggest="sts california sonoma">charles m schulz</auro-menuoption>
      <auro-menuoption value="fai" id="airport-fai" suggest="fai alaska fairbanks">fairbanks international</auro-menuoption>
      <auro-menuoption value="rdu" id="airport-rdu" suggest="rdu north carolina raleigh">raleigh durham international</auro-menuoption>
      <auro-menuoption value="oma" id="airport-oma" suggest="oma nebraska omaha">eppley airfield</auro-menuoption>
      <auro-menuoption value="bzn" id="airport-bzn" suggest="bzn montana bozeman">bozeman yellowstone international</auro-menuoption>
      <auro-menuoption value="ont" id="airport-ont" suggest="ont california ontario">ontario international</auro-menuoption>
      <auro-menuoption value="ogg" id="airport-ogg" suggest="ogg hawaii maui">kahului international</auro-menuoption>
      <auro-menuoption value="sun" id="airport-sun" suggest="sun idaho sun valley">friedman memorial</auro-menuoption>
      <auro-menuoption value="mzt" id="airport-mzt" suggest="mzt sinaloa mazatlan">general rafael buelna international</auro-menuoption>
      <auro-menuoption value="dlg" id="airport-dlg" suggest="dlg alaska dillingham">dillingham</auro-menuoption>
      <auro-menuoption value="adq" id="airport-adq" suggest="adq alaska kodiak">kodiak</auro-menuoption>
      <auro-menuoption value="den" id="airport-den" suggest="den colorado denver">denver international</auro-menuoption>
      <auro-menuoption value="zlo" id="airport-zlo" suggest="zlo colima manzanillo">manzanillo international</auro-menuoption>
      <auro-menuoption value="sjd" id="airport-sjd" suggest="sjd baja california los cabos">los cabos international</auro-menuoption>
      <auro-menuoption value="elp" id="airport-elp" suggest="elp texas el paso">el paso international airport</auro-menuoption>
      <auro-menuoption value="atl" id="airport-atl" suggest="atl georgia atlanta">hartsfield jackson international</auro-menuoption>
      <auro-menuoption value="lax" id="airport-lax" suggest="lax california los angeles">los angeles international</auro-menuoption>
      <auro-menuoption value="rsw" id="airport-rsw" suggest="rsw florida fort myers">southwest florida international</auro-menuoption>
      <auro-menuoption value="cle" id="airport-cle" suggest="cle ohio cleveland">cleveland hopkins international airport</auro-menuoption>
      <auro-menuoption value="otz" id="airport-otz" suggest="otz alaska kotzebue">ralph wien memorial</auro-menuoption>
      <auro-menuoption value="bze" id="airport-bze" suggest="bze belize belize city">philip sw goldson international airport</auro-menuoption>
      <auro-menuoption value="eat" id="airport-eat" suggest="eat washington wenatchee">pangborn memorial</auro-menuoption>
      <auro-menuoption value="dtw" id="airport-dtw" suggest="dtw michigan detroit">detroit metropolitan</auro-menuoption>
      <auro-menuoption value="bet" id="airport-bet" suggest="bet alaska bethel">bethel</auro-menuoption>
      <auro-menuoption value="dca" id="airport-dca" suggest="dca district of columbia washington">ronald reagan national</auro-menuoption>
      <auro-menuoption value="rno" id="airport-rno" suggest="rno nevada reno">reno tahoe international</auro-menuoption>
      <auro-menuoption value="brw" id="airport-brw" suggest="brw alaska barrow">wiley post will rogers</auro-menuoption>
      <auro-menuoption value="mry" id="airport-mry" suggest="mry california monterey">monterey regional</auro-menuoption>
      <auro-menuoption value="hnl" id="airport-hnl" suggest="hnl hawaii oahu">honolulu international</auro-menuoption>
      <auro-menuoption value="okc" id="airport-okc" suggest="okc oklahoma oklahoma city">will rogers world</auro-menuoption>
      <auro-menuoption value="iad" id="airport-iad" suggest="iad virginia dulles">washington dulles international</auro-menuoption>
      <auro-menuoption value="mia" id="airport-mia" suggest="mia florida miami">miami international</auro-menuoption>
      <auro-menuoption value="bli" id="airport-bli" suggest="bli washington bellingham">bellingham international</auro-menuoption>
      <auro-menuoption value="hln" id="airport-hln" suggest="hln montana helena">helena regional</auro-menuoption>
      <auro-menuoption value="gtf" id="airport-gtf" suggest="gtf montana great falls">great falls international</auro-menuoption>
      <auro-menuoption value="zih" id="airport-zih" suggest="zih guerrero zihuatanejo">ixtapa zihuatanejo international</auro-menuoption>
      <auro-menuoption value="yyc" id="airport-yyc" suggest="yyc alberta calgary">calgary international</auro-menuoption>
      <auro-menuoption value="sna" id="airport-sna" suggest="sna california santa ana">john wayne</auro-menuoption>
      <auro-menuoption value="fll" id="airport-fll" suggest="fll florida fort lauderdale">fort lauderdale hollywood international</auro-menuoption>
      <auro-menuoption value="ewr" id="airport-ewr" suggest="ewr new jersey newark">newark liberty international</auro-menuoption>
      <auro-menuoption value="hdn" id="airport-hdn" suggest="hdn colorado steamboat springs">yampa valley regional</auro-menuoption>
      <auro-menuoption value="psc" id="airport-psc" suggest="psc washington pasco">tri cities</auro-menuoption>
      <auro-menuoption value="tus" id="airport-tus" suggest="tus arizona tucson">tucson international</auro-menuoption>
      <auro-menuoption value="abq" id="airport-abq" suggest="abq new mexico albuquerque">albuquerque international sunport</auro-menuoption>
      <auro-menuoption value="jfk" id="airport-jfk" suggest="jfk new york new york">john f kennedy international</auro-menuoption>
      <auro-menuoption value="yvr" id="airport-yvr" suggest="yvr british columbia vancouver">vancouver international</auro-menuoption>
      <auro-menuoption value="sjo" id="airport-sjo" suggest="sjo san jose alajuela province">juan santamaria international</auro-menuoption>
      <auro-menuoption value="las" id="airport-las" suggest="las nevada las vegas">harry reid international airport</auro-menuoption>
      <auro-menuoption value="lih" id="airport-lih" suggest="lih hawaii kauai">lihue international</auro-menuoption>
      <auro-menuoption value="mso" id="airport-mso" suggest="mso montana missoula">missoula international</auro-menuoption>
      <auro-menuoption value="alw" id="airport-alw" suggest="alw washington walla walla">walla walla regional</auro-menuoption>
      <auro-menuoption value="mke" id="airport-mke" suggest="mke wisconsin milwaukee">milwaukee mitchell international</auro-menuoption>
      <auro-menuoption value="eug" id="airport-eug" suggest="eug oregon eugene">mahlon sweet field</auro-menuoption>
      <auro-menuoption value="akn" id="airport-akn" suggest="akn alaska king salmon">king salmon</auro-menuoption>
      <auro-menuoption value="cun" id="airport-cun" suggest="cun quintana roo cancun">cancun international</auro-menuoption>
      <auro-menuoption value="rdd" id="airport-rdd" suggest="rdd california redding">redding municipal airport</auro-menuoption>
      <auro-menuoption value="mco" id="airport-mco" suggest="mco florida orlando">orlando international</auro-menuoption>
      <auro-menuoption value="slc" id="airport-slc" suggest="slc utah salt lake city">salt lake city international</auro-menuoption>
      <auro-menuoption value="phx" id="airport-phx" suggest="phx arizona phoenix">sky harbor international</auro-menuoption>
      <auro-menuoption value="bil" id="airport-bil" suggest="bil montana billings">billings logan international</auro-menuoption>
      <auro-menuoption value="gst" id="airport-gst" suggest="gst alaska gustavus">gustavus</auro-menuoption>
      <auro-menuoption value="adk" id="airport-adk" suggest="adk alaska adak">adak</auro-menuoption>
      <auro-menuoption value="cvg" id="airport-cvg" suggest="cvg kentucky hebron">cincinnati northern kentucky international</auro-menuoption>
      <auro-menuoption value="jac" id="airport-jac" suggest="jac wyoming jackson">jackson hole airport</auro-menuoption>
      <auro-menuoption value="cmh" id="airport-cmh" suggest="cmh ohio columbus">john glenn columbus international</auro-menuoption>
      <auro-menuoption value="yyj" id="airport-yyj" suggest="yyj british columbia victoria">victoria international</auro-menuoption>
      <auro-menuoption value="chs" id="airport-chs" suggest="chs south carolina charleston">charleston international</auro-menuoption>
      <auro-menuoption value="iah" id="airport-iah" suggest="iah texas houston">george bush intercontinental</auro-menuoption>
      <auro-menuoption static nomatch>Unknown airport... </auro-menuoption>
    </auro-menu>
  </auro-combobox>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/airports.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/airports.html -->

```html
<auro-combobox>
  <span slot="bib.fullscreen.headline">Airports</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="fca" id="airport-fca" suggest="fca montana kalispell">glacier park international</auro-menuoption>
    <auro-menuoption value="sfo" id="airport-sfo" suggest="sfo california san francisco">san francisco international</auro-menuoption>
    <auro-menuoption value="boi" id="airport-boi" suggest="boi idaho boise">gowen field</auro-menuoption>
    <auro-menuoption value="stl" id="airport-stl" suggest="stl missouri st louis">lambert st louis international</auro-menuoption>
    <auro-menuoption value="ylw" id="airport-ylw" suggest="ylw british columbia kelowna">kelowna international</auro-menuoption>
    <auro-menuoption value="ykm" id="airport-ykm" suggest="ykm washington yakima">yakima air terminal</auro-menuoption>
    <auro-menuoption value="puw" id="airport-puw" suggest="puw washington pullman">pullman moscow regional</auro-menuoption>
    <auro-menuoption value="yeg" id="airport-yeg" suggest="yeg alberta edmonton">edmonton international</auro-menuoption>
    <auro-menuoption value="tpa" id="airport-tpa" suggest="tpa florida tampa">tampa international</auro-menuoption>
    <auro-menuoption value="msp" id="airport-msp" suggest="msp minnesota minneapolis">minneapolis st paul international</auro-menuoption>
    <auro-menuoption value="ida" id="airport-ida" suggest="ida idaho idaho falls">idaho falls regional airport</auro-menuoption>
    <auro-menuoption value="mfr" id="airport-mfr" suggest="mfr oregon medford">rogue valley international</auro-menuoption>
    <auro-menuoption value="psp" id="airport-psp" suggest="psp california palm springs">palm springs international</auro-menuoption>
    <auro-menuoption value="lir" id="airport-lir" suggest="lir guanacaste liberia">guanacaste airport</auro-menuoption>
    <auro-menuoption value="oak" id="airport-oak" suggest="oak california oakland">oakland international</auro-menuoption>
    <auro-menuoption value="bos" id="airport-bos" suggest="bos massachusetts boston">logan international</auro-menuoption>
    <auro-menuoption value="bwi" id="airport-bwi" suggest="bwi maryland baltimore">thurgood marshall international</auro-menuoption>
    <auro-menuoption value="dal" id="airport-dal" suggest="dal texas dallas">dallas love field</auro-menuoption>
    <auro-menuoption value="sba" id="airport-sba" suggest="sba california santa barbara">santa barbara municipal</auro-menuoption>
    <auro-menuoption value="mci" id="airport-mci" suggest="mci missouri kansas city">kansas city international</auro-menuoption>
    <auro-menuoption value="koa" id="airport-koa" suggest="koa hawaii kona">kona international</auro-menuoption>
    <auro-menuoption value="pvr" id="airport-pvr" suggest="pvr jalisco puerto vallarta">licenciado gustavo diaz ordaz international</auro-menuoption>
    <auro-menuoption value="wrg" id="airport-wrg" suggest="wrg alaska wrangell">wrangell</auro-menuoption>
    <auro-menuoption value="scc" id="airport-scc" suggest="scc alaska prudhoe bay">deadhorse</auro-menuoption>
    <auro-menuoption value="lto" id="airport-lto" suggest="lto baja california loreto">loreto international</auro-menuoption>
    <auro-menuoption value="ome" id="airport-ome" suggest="ome alaska nome">nome</auro-menuoption>
    <auro-menuoption value="ict" id="airport-ict" suggest="ict kansas wichita">dwight d eisenhower national</auro-menuoption>
    <auro-menuoption value="phl" id="airport-phl" suggest="phl pennsylvania philadelphia">philadelphia international</auro-menuoption>
    <auro-menuoption value="dfw" id="airport-dfw" suggest="dfw texas dallas">dallas fort worth international</auro-menuoption>
    <auro-menuoption value="ind" id="airport-ind" suggest="ind indiana indianapolis">indianapolis international</auro-menuoption>
    <auro-menuoption value="smf" id="airport-smf" suggest="smf california sacramento">sacramento international</auro-menuoption>
    <auro-menuoption value="sit" id="airport-sit" suggest="sit alaska sitka">rocky gutierrez</auro-menuoption>
    <auro-menuoption value="dut" id="airport-dut" suggest="dut alaska dutch harbor">unalaska</auro-menuoption>
    <auro-menuoption value="cdv" id="airport-cdv" suggest="cdv alaska cordova">merle mudhole smith</auro-menuoption>
    <auro-menuoption value="psg" id="airport-psg" suggest="psg alaska petersburg">james a johnson</auro-menuoption>
    <auro-menuoption value="bna" id="airport-bna" suggest="bna tennessee nashville">nashville international</auro-menuoption>
    <auro-menuoption value="geg" id="airport-geg" suggest="geg washington spokane">spokane international</auro-menuoption>
    <auro-menuoption value="ktn" id="airport-ktn" suggest="ktn alaska ketchikan">ketchikan international</auro-menuoption>
    <auro-menuoption value="pit" id="airport-pit" suggest="pit pennsylvania pittsburgh">pittsburgh international</auro-menuoption>
    <auro-menuoption value="sbp" id="airport-sbp" suggest="sbp california san luis obispo">san luis obispo regional</auro-menuoption>
    <auro-menuoption value="bur" id="airport-bur" suggest="bur california burbank">hollywood burbank</auro-menuoption>
    <auro-menuoption value="msy" id="airport-msy" suggest="msy louisiana new orleans">louis armstrong international</auro-menuoption>
    <auro-menuoption value="pae" id="airport-pae" suggest="pae washington everett">paine field</auro-menuoption>
    <auro-menuoption value="cvg" id="airport-cvg" suggest="cvg ohio cincinnati">cincinnati northern kentucky international</auro-menuoption>
    <auro-menuoption value="yak" id="airport-yak" suggest="yak alaska yakutat">yakutat</auro-menuoption>
    <auro-menuoption value="pdx" id="airport-pdx" suggest="pdx oregon portland">portland international</auro-menuoption>
    <auro-menuoption value="anc" id="airport-anc" suggest="anc alaska anchorage">ted stevens</auro-menuoption>
    <auro-menuoption value="sea" id="airport-sea" suggest="sea washington seattle">seattle tacoma international</auro-menuoption>
    <auro-menuoption value="san" id="airport-san" suggest="san california san diego">san diego international</auro-menuoption>
    <auro-menuoption value="sat" id="airport-sat" suggest="sat texas san antonio">san antonio international</auro-menuoption>
    <auro-menuoption value="fat" id="airport-fat" suggest="fat california fresno">fresno yosemite international</auro-menuoption>
    <auro-menuoption value="aus" id="airport-aus" suggest="aus texas austin">austin bergstrom international</auro-menuoption>
    <auro-menuoption value="ord" id="airport-ord" suggest="ord illinois chicago">ohare international</auro-menuoption>
    <auro-menuoption value="gdl" id="airport-gdl" suggest="gdl jalisco guadalajara">guadalajara international</auro-menuoption>
    <auro-menuoption value="sjc" id="airport-sjc" suggest="sjc california san jose">san jose international</auro-menuoption>
    <auro-menuoption value="jnu" id="airport-jnu" suggest="jnu alaska juneau">juneau international</auro-menuoption>
    <auro-menuoption value="rdm" id="airport-rdm" suggest="rdm oregon redmond">roberts field</auro-menuoption>
    <auro-menuoption value="sts" id="airport-sts" suggest="sts california sonoma">charles m schulz</auro-menuoption>
    <auro-menuoption value="fai" id="airport-fai" suggest="fai alaska fairbanks">fairbanks international</auro-menuoption>
    <auro-menuoption value="rdu" id="airport-rdu" suggest="rdu north carolina raleigh">raleigh durham international</auro-menuoption>
    <auro-menuoption value="oma" id="airport-oma" suggest="oma nebraska omaha">eppley airfield</auro-menuoption>
    <auro-menuoption value="bzn" id="airport-bzn" suggest="bzn montana bozeman">bozeman yellowstone international</auro-menuoption>
    <auro-menuoption value="ont" id="airport-ont" suggest="ont california ontario">ontario international</auro-menuoption>
    <auro-menuoption value="ogg" id="airport-ogg" suggest="ogg hawaii maui">kahului international</auro-menuoption>
    <auro-menuoption value="sun" id="airport-sun" suggest="sun idaho sun valley">friedman memorial</auro-menuoption>
    <auro-menuoption value="mzt" id="airport-mzt" suggest="mzt sinaloa mazatlan">general rafael buelna international</auro-menuoption>
    <auro-menuoption value="dlg" id="airport-dlg" suggest="dlg alaska dillingham">dillingham</auro-menuoption>
    <auro-menuoption value="adq" id="airport-adq" suggest="adq alaska kodiak">kodiak</auro-menuoption>
    <auro-menuoption value="den" id="airport-den" suggest="den colorado denver">denver international</auro-menuoption>
    <auro-menuoption value="zlo" id="airport-zlo" suggest="zlo colima manzanillo">manzanillo international</auro-menuoption>
    <auro-menuoption value="sjd" id="airport-sjd" suggest="sjd baja california los cabos">los cabos international</auro-menuoption>
    <auro-menuoption value="elp" id="airport-elp" suggest="elp texas el paso">el paso international airport</auro-menuoption>
    <auro-menuoption value="atl" id="airport-atl" suggest="atl georgia atlanta">hartsfield jackson international</auro-menuoption>
    <auro-menuoption value="lax" id="airport-lax" suggest="lax california los angeles">los angeles international</auro-menuoption>
    <auro-menuoption value="rsw" id="airport-rsw" suggest="rsw florida fort myers">southwest florida international</auro-menuoption>
    <auro-menuoption value="cle" id="airport-cle" suggest="cle ohio cleveland">cleveland hopkins international airport</auro-menuoption>
    <auro-menuoption value="otz" id="airport-otz" suggest="otz alaska kotzebue">ralph wien memorial</auro-menuoption>
    <auro-menuoption value="bze" id="airport-bze" suggest="bze belize belize city">philip sw goldson international airport</auro-menuoption>
    <auro-menuoption value="eat" id="airport-eat" suggest="eat washington wenatchee">pangborn memorial</auro-menuoption>
    <auro-menuoption value="dtw" id="airport-dtw" suggest="dtw michigan detroit">detroit metropolitan</auro-menuoption>
    <auro-menuoption value="bet" id="airport-bet" suggest="bet alaska bethel">bethel</auro-menuoption>
    <auro-menuoption value="dca" id="airport-dca" suggest="dca district of columbia washington">ronald reagan national</auro-menuoption>
    <auro-menuoption value="rno" id="airport-rno" suggest="rno nevada reno">reno tahoe international</auro-menuoption>
    <auro-menuoption value="brw" id="airport-brw" suggest="brw alaska barrow">wiley post will rogers</auro-menuoption>
    <auro-menuoption value="mry" id="airport-mry" suggest="mry california monterey">monterey regional</auro-menuoption>
    <auro-menuoption value="hnl" id="airport-hnl" suggest="hnl hawaii oahu">honolulu international</auro-menuoption>
    <auro-menuoption value="okc" id="airport-okc" suggest="okc oklahoma oklahoma city">will rogers world</auro-menuoption>
    <auro-menuoption value="iad" id="airport-iad" suggest="iad virginia dulles">washington dulles international</auro-menuoption>
    <auro-menuoption value="mia" id="airport-mia" suggest="mia florida miami">miami international</auro-menuoption>
    <auro-menuoption value="bli" id="airport-bli" suggest="bli washington bellingham">bellingham international</auro-menuoption>
    <auro-menuoption value="hln" id="airport-hln" suggest="hln montana helena">helena regional</auro-menuoption>
    <auro-menuoption value="gtf" id="airport-gtf" suggest="gtf montana great falls">great falls international</auro-menuoption>
    <auro-menuoption value="zih" id="airport-zih" suggest="zih guerrero zihuatanejo">ixtapa zihuatanejo international</auro-menuoption>
    <auro-menuoption value="yyc" id="airport-yyc" suggest="yyc alberta calgary">calgary international</auro-menuoption>
    <auro-menuoption value="sna" id="airport-sna" suggest="sna california santa ana">john wayne</auro-menuoption>
    <auro-menuoption value="fll" id="airport-fll" suggest="fll florida fort lauderdale">fort lauderdale hollywood international</auro-menuoption>
    <auro-menuoption value="ewr" id="airport-ewr" suggest="ewr new jersey newark">newark liberty international</auro-menuoption>
    <auro-menuoption value="hdn" id="airport-hdn" suggest="hdn colorado steamboat springs">yampa valley regional</auro-menuoption>
    <auro-menuoption value="psc" id="airport-psc" suggest="psc washington pasco">tri cities</auro-menuoption>
    <auro-menuoption value="tus" id="airport-tus" suggest="tus arizona tucson">tucson international</auro-menuoption>
    <auro-menuoption value="abq" id="airport-abq" suggest="abq new mexico albuquerque">albuquerque international sunport</auro-menuoption>
    <auro-menuoption value="jfk" id="airport-jfk" suggest="jfk new york new york">john f kennedy international</auro-menuoption>
    <auro-menuoption value="yvr" id="airport-yvr" suggest="yvr british columbia vancouver">vancouver international</auro-menuoption>
    <auro-menuoption value="sjo" id="airport-sjo" suggest="sjo san jose alajuela province">juan santamaria international</auro-menuoption>
    <auro-menuoption value="las" id="airport-las" suggest="las nevada las vegas">harry reid international airport</auro-menuoption>
    <auro-menuoption value="lih" id="airport-lih" suggest="lih hawaii kauai">lihue international</auro-menuoption>
    <auro-menuoption value="mso" id="airport-mso" suggest="mso montana missoula">missoula international</auro-menuoption>
    <auro-menuoption value="alw" id="airport-alw" suggest="alw washington walla walla">walla walla regional</auro-menuoption>
    <auro-menuoption value="mke" id="airport-mke" suggest="mke wisconsin milwaukee">milwaukee mitchell international</auro-menuoption>
    <auro-menuoption value="eug" id="airport-eug" suggest="eug oregon eugene">mahlon sweet field</auro-menuoption>
    <auro-menuoption value="akn" id="airport-akn" suggest="akn alaska king salmon">king salmon</auro-menuoption>
    <auro-menuoption value="cun" id="airport-cun" suggest="cun quintana roo cancun">cancun international</auro-menuoption>
    <auro-menuoption value="rdd" id="airport-rdd" suggest="rdd california redding">redding municipal airport</auro-menuoption>
    <auro-menuoption value="mco" id="airport-mco" suggest="mco florida orlando">orlando international</auro-menuoption>
    <auro-menuoption value="slc" id="airport-slc" suggest="slc utah salt lake city">salt lake city international</auro-menuoption>
    <auro-menuoption value="phx" id="airport-phx" suggest="phx arizona phoenix">sky harbor international</auro-menuoption>
    <auro-menuoption value="bil" id="airport-bil" suggest="bil montana billings">billings logan international</auro-menuoption>
    <auro-menuoption value="gst" id="airport-gst" suggest="gst alaska gustavus">gustavus</auro-menuoption>
    <auro-menuoption value="adk" id="airport-adk" suggest="adk alaska adak">adak</auro-menuoption>
    <auro-menuoption value="cvg" id="airport-cvg" suggest="cvg kentucky hebron">cincinnati northern kentucky international</auro-menuoption>
    <auro-menuoption value="jac" id="airport-jac" suggest="jac wyoming jackson">jackson hole airport</auro-menuoption>
    <auro-menuoption value="cmh" id="airport-cmh" suggest="cmh ohio columbus">john glenn columbus international</auro-menuoption>
    <auro-menuoption value="yyj" id="airport-yyj" suggest="yyj british columbia victoria">victoria international</auro-menuoption>
    <auro-menuoption value="chs" id="airport-chs" suggest="chs south carolina charleston">charleston international</auro-menuoption>
    <auro-menuoption value="iah" id="airport-iah" suggest="iah texas houston">george bush intercontinental</auro-menuoption>
    <auro-menuoption static nomatch>Unknown airport... </auro-menuoption>
  </auro-menu>
</auro-combobox>
```
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
  <!-- The below content is automatically added from ./../apiExamples/value.html -->
  <auro-button id="valueValidExampleBtn">Set to an existing option</auro-button>
  <auro-button id="valueInvalidExampleBtn">Set to custom value</auro-button>
  <auro-button id="valueUndefinedExampleBtn">Reset</auro-button>
  <br/><br/>
  <auro-combobox id="valueExample">
    <span slot="bib.fullscreen.headline">Bib Header</span>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/value.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/value.html -->

```html
<auro-button id="valueValidExampleBtn">Set to an existing option</auro-button>
<auro-button id="valueInvalidExampleBtn">Set to custom value</auro-button>
<auro-button id="valueUndefinedExampleBtn">Reset</auro-button>
<br/><br/>
<auro-combobox id="valueExample">
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/value.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/value.js -->

```js
export function valueExample() {
  const valueExample = document.querySelector('#valueExample');

  document.querySelector('#valueValidExampleBtn').addEventListener('click', () => {
    valueExample.value = 'Oranges';
  });

  document.querySelector('#valueInvalidExampleBtn').addEventListener('click', () => {
    valueExample.value = 'Dragon Fruit';
  });

  document.querySelector('#valueUndefinedExampleBtn').addEventListener('click', () => {
    valueExample.value = undefined;
  });
}
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### In Dialog

Example use of component within an `auro-dialog`.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/in-dialog.html) -->
  <!-- The below content is automatically added from ./../apiExamples/in-dialog.html -->
  <div>
    <auro-button id="combobox-dialog-opener">Combobox in Dialog</auro-button>
    <auro-dialog id="combobox-dialog">
      <span slot="header">Combobox in Dialog</span>
      <div slot="content">
        <auro-combobox id="focusExample">
          <span slot="bib.fullscreen.headline">Bib Header</span>
          <span slot="label">Name</span>
          <auro-menu>
            <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
            <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
            <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
            <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
            <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
            <auro-menuoption static nomatch>No matching option</auro-menuoption>
          </auro-menu>
        </auro-combobox>
      </div>
    </auro-dialog>
  </div>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/in-dialog.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/in-dialog.html -->

```html
<div>
  <auro-button id="combobox-dialog-opener">Combobox in Dialog</auro-button>
  <auro-dialog id="combobox-dialog">
    <span slot="header">Combobox in Dialog</span>
    <div slot="content">
      <auro-combobox id="focusExample">
        <span slot="bib.fullscreen.headline">Bib Header</span>
        <span slot="label">Name</span>
        <auro-menu>
          <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
          <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
          <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
          <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
          <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
          <auro-menuoption static nomatch>No matching option</auro-menuoption>
        </auro-menu>
      </auro-combobox>
    </div>
  </auro-dialog>
</div>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/in-dialog.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/in-dialog.js -->

```js
export function inDialogExample() {
  document.querySelector("#combobox-dialog-opener").addEventListener("click", () => {
    const dialog = document.querySelector("#combobox-dialog");
    dialog.open = true;
  });
};
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Persistent Menu Option with a Custom Event

This example demonstrates a static menu option that will always appears regardless of the suggestion filtering performed. In this example "Add new address" will always be a displayed menu option.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/persistent.html) -->
  <!-- The below content is automatically added from ./../apiExamples/persistent.html -->
  <auro-combobox id="persistent">
    <span slot="bib.fullscreen.headline">Address Combobox</span>
    <span slot="label">Address</span>
    <auro-menu id="customEvent">
      <auro-menuoption value="555 Address Way Seattle, WA 99999">555 Address Way Seattle, WA 99999</auro-menuoption>
      <auro-menuoption value="333 Some Street Seattle, WA 99999">333 Some Street Seattle, WA 99999</auro-menuoption>
      <auro-menuoption event="addNewAddress" persistent>Add new address</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/persistent.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/persistent.html -->

```html
<auro-combobox id="persistent">
  <span slot="bib.fullscreen.headline">Address Combobox</span>
  <span slot="label">Address</span>
  <auro-menu id="customEvent">
    <auro-menuoption value="555 Address Way Seattle, WA 99999">555 Address Way Seattle, WA 99999</auro-menuoption>
    <auro-menuoption value="333 Some Street Seattle, WA 99999">333 Some Street Seattle, WA 99999</auro-menuoption>
    <auro-menuoption event="addNewAddress" persistent>Add new address</auro-menuoption>
  </auro-menu>
</auro-combobox>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/persistent.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/persistent.js -->

```js
export function persistentExample() {
  const persistentExample = document.querySelector('#persistent');

  persistentExample.addEventListener('addNewAddress', () => {
    console.warn('addNewAddress event fired');
    alert(`addNewAddress event fired`);
  });
}
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Swapping Values Between Comboboxes

This example illustrates using a JavaScript function attached to an auro-button component click event to swap the values of two `auro-combobox` elements. An example of this use case would be swapping the departure and arrival airports in a flight search form.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/swap-value.html) -->
  <!-- The below content is automatically added from ./../apiExamples/swap-value.html -->
  <div id="swapExample">
    <auro-combobox id="swapExampleLeft">
      <span slot="bib.fullscreen.headline">Left Combobox Header</span>
      <span slot="label">Name</span>
      <auro-menu>
        <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
        <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
        <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
        <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
        <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
        <auro-menuoption static nomatch>No matching option</auro-menuoption>
      </auro-menu>
    </auro-combobox>
    <auro-button id="swapExampleBtn" iconOnly>
      <auro-icon
        customColor
        category="terminal" 
        name="round-trip-arrows">
      </auro-icon>
    </auro-button>
    <auro-combobox id="swapExampleRight">
      <span slot="bib.fullscreen.headline">Right Combobox Header</span>
      <span slot="label">Name</span>
      <auro-menu>
        <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
        <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
        <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
        <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
        <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
        <auro-menuoption static nomatch>No matching option</auro-menuoption>
      </auro-menu>
    </auro-combobox>
  </div>
  <style>
    #swapExample {
      display: flex;
      flex-direction: row;

      align-items: center;
    }

    #swapExampleLeft,
    #swapExampleRight {
      flex: 1;
    }

    #swapExampleBtn {
      margin: 0 5px;
    }
  </style>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/swap-value.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/swap-value.html -->

```html
<div id="swapExample">
  <auro-combobox id="swapExampleLeft">
    <span slot="bib.fullscreen.headline">Left Combobox Header</span>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  <auro-button id="swapExampleBtn" iconOnly>
    <auro-icon
      customColor
      category="terminal" 
      name="round-trip-arrows">
    </auro-icon>
  </auro-button>
  <auro-combobox id="swapExampleRight">
    <span slot="bib.fullscreen.headline">Right Combobox Header</span>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
  </auro-combobox>
</div>
<style>
  #swapExample {
    display: flex;
    flex-direction: row;

    align-items: center;
  }

  #swapExampleLeft,
  #swapExampleRight {
    flex: 1;
  }

  #swapExampleBtn {
    margin: 0 5px;
  }
</style>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/swap-value.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/swap-value.js -->

```js
export function swapValueExample() {
  const btn = document.querySelector('#swapExampleBtn');
  const comboboxOne = document.querySelector('#swapExampleLeft');
  const comboboxTwo = document.querySelector('#swapExampleRight');

  btn.addEventListener('click', () => {
    const valueOne = comboboxOne.value;
    const valueTwo = comboboxTwo.value;

    comboboxOne.value = valueTwo;
    comboboxTwo.value = valueOne;
  });
}
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

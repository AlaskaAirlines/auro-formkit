<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/api.md) -->
<!-- The below content is automatically added from ./../docs/api.md -->

# auro-counter-group

The `auro-counter-group` element provides a flexible interface for grouping multiple counters, supporting validation, custom validity messages, and disabled states based on the group's value.

## Properties

| Property                  | Attribute                 | Type                                             | Default          | Description                                      |
|---------------------------|---------------------------|--------------------------------------------------|------------------|--------------------------------------------------|
| [appearance](#appearance)              | `appearance`              | `'default' \| 'inverse'`                         | "'default'"      | Defines whether the component will be on lighter or darker backgrounds. |
| [autoPlacement](#autoPlacement)           | `autoPlacement`           | `boolean`                                        | "false"          | If declared, bib's position will be automatically calculated where to appear. |
| [error](#error)                   | `error`                   | `string`                                         |                  | The current error message to display when the component is invalid. |
| [fullscreenBreakpoint](#fullscreenBreakpoint)    | `fullscreenBreakpoint`    | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'disabled'` | "'sm'"           | Defines the screen size breakpoint at which the dropdown switches to fullscreen mode on mobile. `disabled` indicates a dropdown should _never_ enter fullscreen.<br /><br />When expanded, the dropdown will automatically display in fullscreen mode<br />if the screen size is equal to or smaller than the selected breakpoint. |
| [isDropdown](#isDropdown)              | `isDropdown`              | `boolean`                                        | false            | If true, the counter group is displayed as a dropdown. |
| [largeFullscreenHeadline](#largeFullscreenHeadline) | `largeFullscreenHeadline` | `boolean`                                        | false            | If declared, make bib.fullscreen.headline in HeadingDisplay.<br />Otherwise, Heading 600. |
| [layout](#layout)                  | `layout`                  | `'classic' \| 'snowflake'`                       | "'classic'"      | Determines the layout style of the counter group when it is a dropdown. |
| [matchWidth](#matchWidth)              | `matchWidth`              | `boolean`                                        | false            | If declared, the dropdown will expand to the width of its parent container.<br />Otherwise, the dropdown width will be determined by its content. |
| [max](#max)                     | `max`                     | `number`                                         | "undefined"      | The maximum value allowed for the whole group of counters. |
| [min](#min)                     | `min`                     | `number`                                         | "undefined"      | The minimum value allowed for the whole group of counters. |
| [noFlip](#noFlip)                  | `noFlip`                  | `boolean`                                        | false            | If declared, the bib will NOT flip to an alternate position<br />when there isn't enough space in the specified `placement`. |
| [offset](#offset)                  | `offset`                  | `number`                                         | "0"              | Gap between the trigger element and bib.         |
| [onDark](#onDark)                  | `onDark`                  | `boolean`                                        | false            | DEPRECATED - use `appearance` instead.           |
| [placement](#placement)               | `placement`               | `'top' \| 'right' \| 'bottom' \| 'left' \| 'bottom-start' \| 'top-start' \| 'top-end' \| 'right-start' \| 'right-end' \| 'bottom-end' \| 'left-start' \| 'left-end'` | "'bottom-start'" | Position where the bib should appear relative to the trigger. |
| [shift](#shift)                   | `shift`                   | `boolean`                                        | false            | If declared, the dropdown will shift its position to avoid being cut off by the viewport. |
| [total](#total)                   | `total`                   | `number`                                         | "undefined"      | The total value of the counters.                 |
| [validity](#validity)                | `validity`                | `string`                                         | "undefined"      | Reflects the validity state.                     |
| [value](#value)                   | `value`                   | `object`                                         | "undefined"      | The current individual values of the nested counters. |

## Methods

| Method     | Type                                   | Description                                      |
|------------|----------------------------------------|--------------------------------------------------|
| [hideBib](#hideBib)  | `(): void`                             | Hides the dropdown bib if its open.              |
| [showBib](#showBib)  | `(): void`                             | Shows the dropdown bib if there are options to show. |
| [validate](#validate) | `(force?: boolean \| undefined): void` | Validates value.<br /><br />**force**: Whether to force validation. |

## Events

| Event   | Type                                             |
|---------|--------------------------------------------------|
| [input](#input) | `CustomEvent<{ total: number \| undefined; value: {} \| undefined; }>` |

## Slots

| Name                      | Description                                      |
|---------------------------|--------------------------------------------------|
| `ariaLabel.bib.close`     | Sets aria-label on close button in fullscreen bib |
| `bib.fullscreen.footer`   | Defines the footer to display at the bottom of fullscreen bib. Only used when `isDropdown` is true. |
| `bib.fullscreen.headline` | Defines the headline to display above menu-options. Only used when `isDropdown` is true. Required. |
| [default](#default)                 | Slot for counter elements.                       |
| [helpText](#helpText)                | Dropdown help text content. Only used when `isDropdown` is true. |
| [label](#label)                   | Dropdown label content. Only used when `isDropdown` is true. |
| [valueText](#valueText)               | Dropdown value text display. Only used when `isDropdown` is true. |

# auro-counter

The `auro-counter` element provides a flexible counter interface with increment and decrement buttons, supporting optional sub-labels and disabled states.

## Properties

| Property     | Attribute    | Type                     | Default     | Description                                      |
|--------------|--------------|--------------------------|-------------|--------------------------------------------------|
| [appearance](#appearance) | `appearance` | `'default' \| 'inverse'` | "'default'" | Defines whether the component will be on lighter or darker backgrounds. |
| [disabled](#disabled)   | `disabled`   | `boolean`                |             | Indicates if the counter is disabled.            |
| [error](#error)      | `error`      | `string`                 |             | Error state and message.<br />True if set, value is the error message. |
| [max](#max)        | `max`        | `number`                 |             | The maximum value for the counter.               |
| [min](#min)        | `min`        | `number`                 |             | The minimum value for the counter.               |
| [onDark](#onDark)     | `onDark`     | `boolean`                |             | DEPRECATED - use `appearance="inverse"` instead. |
| [validity](#validity)   | `validity`   | `string`                 |             | The validity state of the counter.               |
| [value](#value)      | `value`      | `number`                 |             | The current value of the counter.                |

## Methods

| Method      | Type                                   | Description                                      |
|-------------|----------------------------------------|--------------------------------------------------|
| [decrement](#decrement) | `(value?: number \| undefined): void`  | Decrements the value of the counter by 1. If a value is provided, it decrements by that amount.<br /><br />**value**: The amount to decrement by. |
| [increment](#increment) | `(value?: number \| undefined): void`  | Increments the counter value by 1. If a value is provided, it increments by that amount.<br /><br />**value**: The amount to increment by. |
| [validate](#validate)  | `(force?: boolean \| undefined): void` | Validates value.<br /><br />**force**: Whether to force validation. |

## Events

| Event   | Type                                           |
|---------|------------------------------------------------|
| [input](#input) | `CustomEvent<{ value: number \| undefined; }>` |

## Slots

| Name              | Description                                |
|-------------------|--------------------------------------------|
| `ariaLabel.minus` | Accessible label for the decrement button. |
| `ariaLabel.plus`  | Accessible label for the increment button. |
| [default](#default)         | Main label content for the counter.        |
| [description](#description)     | Descriptive content for the counter.       |
| [helpText](#helpText)        | Help text content for the counter.         |
<!-- AURO-GENERATED-CONTENT:END -->

## Basic Counter

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic-standalone.html) -->
  <!-- The below content is automatically added from ./../apiExamples/basic-standalone.html -->
  <auro-counter>
    Adults
  </auro-counter>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic-standalone.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic-standalone.html -->

```html
<auro-counter>
  Adults
</auro-counter>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Basic Counter Group

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
  <!-- The below content is automatically added from ./../apiExamples/basic.html -->
  <auro-counter-group>
    <auro-counter>
      Short label
    </auro-counter>
    <auro-counter>
      Another short label
    </auro-counter>
    <auro-counter>
      This is an example of the wrapping behavior for a long label
    </auro-counter>
  </auro-counter-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->

```html
<auro-counter-group>
  <auro-counter>
    Short label
  </auro-counter>
  <auro-counter>
    Another short label
  </auro-counter>
  <auro-counter>
    This is an example of the wrapping behavior for a long label
  </auro-counter>
</auro-counter-group>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Counter Properties & Attribute Examples

### Appearance on Dark Backgrounds

Use `appearance="inverse"` to ensure proper contrast on dark backgrounds.

<div class="exampleWrapper--ondark" aria-hidden>
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse.html) -->
  <!-- The below content is automatically added from ./../apiExamples/appearance-inverse.html -->
  <auro-counter appearance="inverse">
    Adults
  </auro-counter>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/appearance-inverse.html -->

```html
<auro-counter appearance="inverse">
  Adults
</auro-counter>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Disabled

A counter can be disabled by adding the `disabled` attribute.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/counter-disabled.html) -->
  <!-- The below content is automatically added from ./../apiExamples/counter-disabled.html -->
  <auro-counter disabled value="0">
    Disabled counter
    <span slot="description">This counter cannot be modified</span>
  </auro-counter>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<div class="exampleWrapper--ondark" aria-hidden>
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse-disabled.html) -->
  <!-- The below content is automatically added from ./../apiExamples/appearance-inverse-disabled.html -->
  <auro-counter appearance="inverse" disabled value="0">
    Disabled counter
    <span slot="description">This counter cannot be modified</span>
  </auro-counter>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/counter-disabled.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/counter-disabled.html -->

```html
<auro-counter disabled value="0">
  Disabled counter
  <span slot="description">This counter cannot be modified</span>
</auro-counter>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse-disabled.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/appearance-inverse-disabled.html -->

```html
<auro-counter appearance="inverse" disabled value="0">
  Disabled counter
  <span slot="description">This counter cannot be modified</span>
</auro-counter>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Error

A custom error can be set on the counter by adding the `error` attribute the desired message.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/counter-error.html) -->
  <!-- The below content is automatically added from ./../apiExamples/counter-error.html -->
  <auro-counter error="There is an error with the counter">
    Adults
  </auro-counter>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<div class="exampleWrapper--ondark" aria-hidden>
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse-error.html) -->
  <!-- The below content is automatically added from ./../apiExamples/appearance-inverse-error.html -->
  <auro-counter appearance="inverse" error="There is an error with the counter">
    Adults
  </auro-counter>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/counter-error.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/counter-error.html -->

```html
<auro-counter error="There is an error with the counter">
  Adults
</auro-counter>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse-error.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/appearance-inverse-error.html -->

```html
<auro-counter appearance="inverse" error="There is an error with the counter">
  Adults
</auro-counter>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Min/Max and Value

Use the `min`, `max`, and `value` attributes to set the minimum and maximum allowable values for the counter, as well as its initial value.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/counter-minmax.html) -->
  <!-- The below content is automatically added from ./../apiExamples/counter-minmax.html -->
  <auro-counter min="1" max="5" value="2">
    Adults
    <span slot="description">Min: 1, Max: 5</span>
  </auro-counter>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/counter-minmax.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/counter-minmax.html -->

```html
<auro-counter min="1" max="5" value="2">
  Adults
  <span slot="description">Min: 1, Max: 5</span>
</auro-counter>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Counter Slot Examples

### Description

A description can be added with the `description` slot. The description appears below the main label and is useful for displaying important information or requirements.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/description.html) -->
  <!-- The below content is automatically added from ./../apiExamples/description.html -->
  <auro-counter>
    Adults
    <span slot="description">18 years or older</span>
  </auro-counter>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<div class="exampleWrapper--ondark" aria-hidden>
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse-description.html) -->
  <!-- The below content is automatically added from ./../apiExamples/appearance-inverse-description.html -->
  <auro-counter appearance="inverse">
    Adults
    <span slot="description">18 years or older</span>
  </auro-counter>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/description.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/description.html -->

```html
<auro-counter>
  Adults
  <span slot="description">18 years or older</span>
</auro-counter>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse-description.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/appearance-inverse-description.html -->

```html
<auro-counter appearance="inverse">
  Adults
  <span slot="description">18 years or older</span>
</auro-counter>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Help Text

Help text is supported with counters, and can be added by targetting the `helptext` slot.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/counter-helptext.html) -->
  <!-- The below content is automatically added from ./../apiExamples/counter-helptext.html -->
  <auro-counter>
    Adults
    <span slot="helpText">This is help text for the counter</span>
  </auro-counter>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<div class="exampleWrapper--ondark" aria-hidden>
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse-helptext.html) -->
  <!-- The below content is automatically added from ./../apiExamples/appearance-inverse-helptext.html -->
  <auro-counter appearance="inverse">
    Adults
    <span slot="helpText">This is help text for the counter</span>
  </auro-counter>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/counter-helptext.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/counter-helptext.html -->

```html
<auro-counter>
  Adults
  <span slot="helpText">This is help text for the counter</span>
</auro-counter>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse-helptext.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/appearance-inverse-helptext.html -->

```html
<auro-counter appearance="inverse">
  Adults
  <span slot="helpText">This is help text for the counter</span>
</auro-counter>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Counter Group Properties & Attribute Examples

### Appearance on Dark Backgrounds

Use `appearance="inverse"` to ensure proper contrast on dark backgrounds.

<div class="exampleWrapper--ondark" aria-hidden>
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse-group.html) -->
  <!-- The below content is automatically added from ./../apiExamples/appearance-inverse-group.html -->
  <auro-counter-group appearance="inverse">
    <auro-counter>
      Short label
    </auro-counter>
    <auro-counter>
      Another short label
    </auro-counter>
    <auro-counter>
      This is an example of the wrapping behavior for a long label
    </auro-counter>
  </auro-counter-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse-group.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/appearance-inverse-group.html -->

```html
<auro-counter-group appearance="inverse">
  <auro-counter>
    Short label
  </auro-counter>
  <auro-counter>
    Another short label
  </auro-counter>
  <auro-counter>
    This is an example of the wrapping behavior for a long label
  </auro-counter>
</auro-counter-group>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Dropdown Counter Group

Use the `isDropdown` attribute to place a counter group into the dropdown menu. The dropdown mode provides a more compact interface, ideal for forms where space is limited. It collapses the counters into a dropdown that expands when clicked.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/dropdown.html) -->
  <!-- The below content is automatically added from ./../apiExamples/dropdown.html -->
  <auro-counter-group isDropdown>
    <span slot="ariaLabel.bib.close">Close Popup</span>
    <span slot="bib.fullscreen.headline">Passengers</span>
    <div slot="label">Passengers</div>
    <auro-counter>
      Adults
      <span slot="description">18 years or older</span>
    </auro-counter>
    <auro-counter>
      Children
      <span slot="description">Under 17 years old. Restrictions apply if traveling without an adult.</span>
    </auro-counter>
    <auro-counter>
      Lap Infants
      <span slot="description">Under 2 years</span>
    </auro-counter>
  </auro-counter-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<div class="exampleWrapper--ondark" aria-hidden>
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse-dropdown.html) -->
  <!-- The below content is automatically added from ./../apiExamples/appearance-inverse-dropdown.html -->
  <auro-counter-group appearance="inverse" isDropdown>
    <div slot="bib.fullscreen.headline">Passengers</div>
    <div slot="label">Passengers</div>
    <auro-counter>
      Adults
      <span slot="description">18 years or older</span>
    </auro-counter>
    <auro-counter>
      Children
      <span slot="description">2-17 years</span>
    </auro-counter>
  </auro-counter-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/dropdown.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/dropdown.html -->

```html
<auro-counter-group isDropdown>
  <span slot="ariaLabel.bib.close">Close Popup</span>
  <span slot="bib.fullscreen.headline">Passengers</span>
  <div slot="label">Passengers</div>
  <auro-counter>
    Adults
    <span slot="description">18 years or older</span>
  </auro-counter>
  <auro-counter>
    Children
    <span slot="description">Under 17 years old. Restrictions apply if traveling without an adult.</span>
  </auro-counter>
  <auro-counter>
    Lap Infants
    <span slot="description">Under 2 years</span>
  </auro-counter>
</auro-counter-group>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse-dropdown.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/appearance-inverse-dropdown.html -->

```html
<auro-counter-group appearance="inverse" isDropdown>
  <div slot="bib.fullscreen.headline">Passengers</div>
  <div slot="label">Passengers</div>
  <auro-counter>
    Adults
    <span slot="description">18 years or older</span>
  </auro-counter>
  <auro-counter>
    Children
    <span slot="description">2-17 years</span>
  </auro-counter>
</auro-counter-group>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Snowflake Layout

Counter dropdowns support an alternate "snowflake" layout, using `layout="snowflake"`.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/dropdown-snowflake.html) -->
  <!-- The below content is automatically added from ./../apiExamples/dropdown-snowflake.html -->
  <!-- Example of counter-group properties -->
  <auro-counter-group max="10" min="2" isDropdown layout="snowflake">
    <span slot="ariaLabel.bib.close">Close Popup</span>
    <div slot="bib.fullscreen.headline">Group fullscreen label</div>
    <auro-icon slot="typeIcon" category="interface" name="account-stroke" customColor></auro-icon>
    <div slot="label">Snowflake Dropdown Group</div>
    <div slot="helpText">Total must be between 2-10</div>
    <auro-counter>
      Counter 1
    </auro-counter>
    <auro-counter>
      Counter 2
    </auro-counter>
  </auro-counter-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<div class="exampleWrapper--ondark">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse-snowflake.html) -->
  <!-- The below content is automatically added from ./../apiExamples/appearance-inverse-snowflake.html -->
  <!-- Example of counter-group properties -->
  <auro-counter-group max="10" min="2" isDropdown layout="snowflake" appearance="inverse">
    <span slot="ariaLabel.bib.close">Close Popup</span>
    <div slot="bib.fullscreen.headline">Group fullscreen label</div>
    <auro-icon slot="typeIcon" category="interface" name="account-stroke" customColor></auro-icon>
    <div slot="label">Snowflake Dropdown Group</div>
    <div slot="helpText">Total must be between 2-10</div>
    <auro-counter>
      Counter 1
    </auro-counter>
    <auro-counter>
      Counter 2
    </auro-counter>
  </auro-counter-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/dropdown-snowflake.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/dropdown-snowflake.html -->

```html
<!-- Example of counter-group properties -->
<auro-counter-group max="10" min="2" isDropdown layout="snowflake">
  <span slot="ariaLabel.bib.close">Close Popup</span>
  <div slot="bib.fullscreen.headline">Group fullscreen label</div>
  <auro-icon slot="typeIcon" category="interface" name="account-stroke" customColor></auro-icon>
  <div slot="label">Snowflake Dropdown Group</div>
  <div slot="helpText">Total must be between 2-10</div>
  <auro-counter>
    Counter 1
  </auro-counter>
  <auro-counter>
    Counter 2
  </auro-counter>
</auro-counter-group>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse-snowflake.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/appearance-inverse-snowflake.html -->

```html
<!-- Example of counter-group properties -->
<auro-counter-group max="10" min="2" isDropdown layout="snowflake" appearance="inverse">
  <span slot="ariaLabel.bib.close">Close Popup</span>
  <div slot="bib.fullscreen.headline">Group fullscreen label</div>
  <auro-icon slot="typeIcon" category="interface" name="account-stroke" customColor></auro-icon>
  <div slot="label">Snowflake Dropdown Group</div>
  <div slot="helpText">Total must be between 2-10</div>
  <auro-counter>
    Counter 1
  </auro-counter>
  <auro-counter>
    Counter 2
  </auro-counter>
</auro-counter-group>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Counter Dropdown with Errored Counters

A counter dropdown with individual counters in an errored state will display the errors for each errored counter by default.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/dropdown-error.html) -->
  <!-- The below content is automatically added from ./../apiExamples/dropdown-error.html -->
  <auro-counter-group isDropdown>
    <span slot="ariaLabel.bib.close">Close Popup</span>
    <div slot="bib.fullscreen.headline">Passengers</div>
    <div slot="label">Passengers</div>
    <auro-counter error="Custom error on Adults counter">
      Adults
      <span slot="description">18 years or older</span>
    </auro-counter>
    <auro-counter error="Custom error on Children counter">
      Children
      <span slot="description">2-17 years</span>
    </auro-counter>
  </auro-counter-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/dropdown-error.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/dropdown-error.html -->

```html
<auro-counter-group isDropdown>
  <span slot="ariaLabel.bib.close">Close Popup</span>
  <div slot="bib.fullscreen.headline">Passengers</div>
  <div slot="label">Passengers</div>
  <auro-counter error="Custom error on Adults counter">
    Adults
    <span slot="description">18 years or older</span>
  </auro-counter>
  <auro-counter error="Custom error on Children counter">
    Children
    <span slot="description">2-17 years</span>
  </auro-counter>
</auro-counter-group>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Counter Dropdown with Custom Error

The `error` attribute can also be used on the counter group to set a custom error message. This will override any individual counter error messages.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/dropdown-error-group.html) -->
  <!-- The below content is automatically added from ./../apiExamples/dropdown-error-group.html -->
  <auro-counter-group error="Custom error on counter group" isDropdown>
    <span slot="ariaLabel.bib.close">Close Popup</span>
    <div slot="bib.fullscreen.headline">Passengers</div>
    <div slot="label">Passengers</div>
    <auro-counter error="Custom error on Adults counter">
      Adults
      <span slot="description">18 years or older</span>
    </auro-counter>
    <auro-counter error="Custom error on Children counter">
      Children
      <span slot="description">2-17 years</span>
    </auro-counter>
  </auro-counter-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/dropdown-error-group.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/dropdown-error-group.html -->

```html
<auro-counter-group error="Custom error on counter group" isDropdown>
  <span slot="ariaLabel.bib.close">Close Popup</span>
  <div slot="bib.fullscreen.headline">Passengers</div>
  <div slot="label">Passengers</div>
  <auro-counter error="Custom error on Adults counter">
    Adults
    <span slot="description">18 years or older</span>
  </auro-counter>
  <auro-counter error="Custom error on Children counter">
    Children
    <span slot="description">2-17 years</span>
  </auro-counter>
</auro-counter-group>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Group Max/Min

The group counter `max` or `min` property sets the property for all counters in the group. If a counter has a `max` value set, the group `max` attribute will override it. All increment buttons as a result will be disabled to prevent the group of counters from exceeding the group `max`.

**Example has group max set to 12**

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/group-max.html) -->
  <!-- The below content is automatically added from ./../apiExamples/group-max.html -->
  <auro-counter-group max="12" min="0">
    <auro-counter>
      Short label
    </auro-counter>
    <auro-counter>
      This is an example of the wrapping behavior for a long label
    </auro-counter>
  </auro-counter-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/group-max.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/group-max.html -->

```html
<auro-counter-group max="12" min="0">
  <auro-counter>
    Short label
  </auro-counter>
  <auro-counter>
    This is an example of the wrapping behavior for a long label
  </auro-counter>
</auro-counter-group>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Counter Max/Min within Group

You can also individually set the `max` or `min` value for each counter in a group.

**Example has group max set to 12**

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/group-counter-max.html) -->
  <!-- The below content is automatically added from ./../apiExamples/group-counter-max.html -->
  <auro-counter-group max="12" min="0">
    <auro-counter max="5">
      This counter has a max value of 5
    </auro-counter>
    <auro-counter max="8">
      This counter has a max value of 8
    </auro-counter>
  </auro-counter-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/group-counter-max.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/group-counter-max.html -->

```html
<auro-counter-group max="12" min="0">
  <auro-counter max="5">
    This counter has a max value of 5
  </auro-counter>
  <auro-counter max="8">
    This counter has a max value of 8
  </auro-counter>
</auro-counter-group>
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
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/floaterConfig.html) -->
  <!-- The below content is automatically added from ./../apiExamples/floaterConfig.html -->
  <div style="width: 350px">
    <auro-counter-group isDropdown offset="20" placement="bottom-end">
      <div slot="bib.fullscreen.headline">Passengers</div>
      <span slot="label">Label</span>
      <span slot="helpText">bottom-end bib with 20px offset</span>
      <auro-counter>
        Adults
        <span slot="description">18 years or older</span>
      </auro-counter>
      <auro-counter>
        Children
        <span slot="description">2-17 years</span>
      </auro-counter>
    </auro-counter-group>
    <auro-counter-group isDropdown offset="20" placement="bottom-end" noFlip>
      <div slot="bib.fullscreen.headline">Passengers</div>
      <span slot="label">Label</span>
      <span slot="helpText">bottom-end bib with 20px offset and noFlip</span>
      <auro-counter>
        Adults
        <span slot="description">18 years or older</span>
      </auro-counter>
      <auro-counter>
        Children
        <span slot="description">2-17 years</span>
      </auro-counter>
    </auro-counter-group>
    <auro-counter-group isDropdown offset="20" placement="right" noFlip autoPlacement>
      <div slot="bib.fullscreen.headline">Passengers</div>
      <span slot="label">Label</span>
      <span slot="helpText">right bib with 20px offset, noFlip and autoPlacement</span>
      <auro-counter>
        Adults
        <span slot="description">18 years or older</span>
      </auro-counter>
      <auro-counter>
        Children
        <span slot="description">2-17 years</span>
      </auro-counter>
    </auro-counter-group>
    <auro-counter-group width="350px" isDropdown offset="20" placement="bottom-start" shift noFlip>
      <div slot="bib.fullscreen.headline">Passengers</div>
      <span slot="label">Label</span>
      <span slot="helpText">bottom-start with 20px offset, noFlip and shift enabled</span>
      <auro-counter>
        Adults
        <span slot="description">18 years or older</span>
      </auro-counter>
      <auro-counter>
        Children
        <span slot="description">2-17 years</span>
      </auro-counter>
    </auro-counter-group>
  </div>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/floaterConfig.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/floaterConfig.html -->

```html
<div style="width: 350px">
  <auro-counter-group isDropdown offset="20" placement="bottom-end">
    <div slot="bib.fullscreen.headline">Passengers</div>
    <span slot="label">Label</span>
    <span slot="helpText">bottom-end bib with 20px offset</span>
    <auro-counter>
      Adults
      <span slot="description">18 years or older</span>
    </auro-counter>
    <auro-counter>
      Children
      <span slot="description">2-17 years</span>
    </auro-counter>
  </auro-counter-group>
  <auro-counter-group isDropdown offset="20" placement="bottom-end" noFlip>
    <div slot="bib.fullscreen.headline">Passengers</div>
    <span slot="label">Label</span>
    <span slot="helpText">bottom-end bib with 20px offset and noFlip</span>
    <auro-counter>
      Adults
      <span slot="description">18 years or older</span>
    </auro-counter>
    <auro-counter>
      Children
      <span slot="description">2-17 years</span>
    </auro-counter>
  </auro-counter-group>
  <auro-counter-group isDropdown offset="20" placement="right" noFlip autoPlacement>
    <div slot="bib.fullscreen.headline">Passengers</div>
    <span slot="label">Label</span>
    <span slot="helpText">right bib with 20px offset, noFlip and autoPlacement</span>
    <auro-counter>
      Adults
      <span slot="description">18 years or older</span>
    </auro-counter>
    <auro-counter>
      Children
      <span slot="description">2-17 years</span>
    </auro-counter>
  </auro-counter-group>
  <auro-counter-group width="350px" isDropdown offset="20" placement="bottom-start" shift noFlip>
    <div slot="bib.fullscreen.headline">Passengers</div>
    <span slot="label">Label</span>
    <span slot="helpText">bottom-start with 20px offset, noFlip and shift enabled</span>
    <auro-counter>
      Adults
      <span slot="description">18 years or older</span>
    </auro-counter>
    <auro-counter>
      Children
      <span slot="description">2-17 years</span>
    </auro-counter>
  </auro-counter-group>
</div>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Dropdown with Fullscreen Bib

You can make the dropdown open in fullscreen at a specific breakpoint by setting `fullscreenBreakpoint`.

The default value of `fullscreenBreakpoint` is `sm`. 

Breakpoint token can be found [here](https://auro.alaskaair.com/getting-started/developers/design-tokens).

To support fullscreen bib, setting the `bib.fullscreen.headline` slot is **REQUIRED**.
You can also set `bib.fullscreen.footer` slot to add any additional options on fullscreen view.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/dropdown-mobile-properties.html) -->
  <!-- The below content is automatically added from ./../apiExamples/dropdown-mobile-properties.html -->
  <div style="max-width: 350px;">
    <auro-counter-group id="dropdownCouterExample" isDropdown fullscreenBreakpoint="lg">
      <span slot="ariaLabel.bib.close">Close Popup</span>
      <span slot="label">Passengers</span>
      <span slot="bib.fullscreen.headline">Passengers</span>
      <div slot="helpText">This is help text</div>
      <auro-counter>
        Adults
        <span slot="description">18 years or older</span>
      </auro-counter>
      <auro-counter>
        Children
        <span slot="description">Under 17 years old. Restrictions apply if traveling without an adult.</span>
      </auro-counter>
      <auro-counter>
        Lap Infants
        <span slot="description">Under 2 years</span>
      </auro-counter>
      <div slot="bib.fullscreen.footer" style="display:flex; justify-content: stretch; gap: 1.5rem">
        <auro-button id="dropdownCounterExampleResetbutton" fluid variant="secondary" style="flex: 1 50%">Reset</auro-button>
        <auro-button id="dropdownCounterExampleSavebutton" fluid style="flex: 1 50%">Save</auro-button>
      </div>
    </auro-counter-group>
  </div>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/dropdown-mobile-properties.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/dropdown-mobile-properties.html -->

```html
<div style="max-width: 350px;">
  <auro-counter-group id="dropdownCouterExample" isDropdown fullscreenBreakpoint="lg">
    <span slot="ariaLabel.bib.close">Close Popup</span>
    <span slot="label">Passengers</span>
    <span slot="bib.fullscreen.headline">Passengers</span>
    <div slot="helpText">This is help text</div>
    <auro-counter>
      Adults
      <span slot="description">18 years or older</span>
    </auro-counter>
    <auro-counter>
      Children
      <span slot="description">Under 17 years old. Restrictions apply if traveling without an adult.</span>
    </auro-counter>
    <auro-counter>
      Lap Infants
      <span slot="description">Under 2 years</span>
    </auro-counter>
    <div slot="bib.fullscreen.footer" style="display:flex; justify-content: stretch; gap: 1.5rem">
      <auro-button id="dropdownCounterExampleResetbutton" fluid variant="secondary" style="flex: 1 50%">Reset</auro-button>
      <auro-button id="dropdownCounterExampleSavebutton" fluid style="flex: 1 50%">Save</auro-button>
    </div>
  </auro-counter-group>
</div>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Counter Group Slot Examples

### Display Value

Use the `valueText` slot to customize the value display in the dropdown trigger.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/dropdown-value-text.html) -->
  <!-- The below content is automatically added from ./../apiExamples/dropdown-value-text.html -->
  <div style="max-width: 350px;">
    <auro-counter-group isDropdown>
      <span slot="ariaLabel.bib.close">Close Popup</span>
      <span slot="bib.fullscreen.headline">Passengers</span>
      <div slot="valueText">Custom value text</div>
      <div slot="label"></div>
      <auro-counter>
        Adults
        <span slot="description">18 years or older</span>
      </auro-counter>
      <auro-counter>
        Children
        <span slot="description">Under 17 years old. Restrictions apply if traveling without an adult.</span>
      </auro-counter>
      <auro-counter>
        Lap Infants
        <span slot="description">Under 2 years</span>
      </auro-counter>
    </auro-counter-group>
  </div>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/dropdown-value-text.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/dropdown-value-text.html -->

```html
<div style="max-width: 350px;">
  <auro-counter-group isDropdown>
    <span slot="ariaLabel.bib.close">Close Popup</span>
    <span slot="bib.fullscreen.headline">Passengers</span>
    <div slot="valueText">Custom value text</div>
    <div slot="label"></div>
    <auro-counter>
      Adults
      <span slot="description">18 years or older</span>
    </auro-counter>
    <auro-counter>
      Children
      <span slot="description">Under 17 years old. Restrictions apply if traveling without an adult.</span>
    </auro-counter>
    <auro-counter>
      Lap Infants
      <span slot="description">Under 2 years</span>
    </auro-counter>
  </auro-counter-group>
</div>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Event Examples

### Input Event

Listen for `input` events to react to user interactions. Open the browser console to see the event output.

This event fires both on individual counter changes and when the counter group value changes. The event detail contains the current values of all counters in the group.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/events.html) -->
  <!-- The below content is automatically added from ./../apiExamples/events.html -->
  <auro-counter-group id="eventExample">
    <auro-counter>
      Adults
    </auro-counter>
    <auro-counter>
      Children
    </auro-counter>
  </auro-counter-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/events.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/events.html -->

```html
<auro-counter-group id="eventExample">
  <auro-counter>
    Adults
  </auro-counter>
  <auro-counter>
    Children
  </auro-counter>
</auro-counter-group>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/events.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/events.js -->

```js
export function eventCounterExample() {
  const counter = document.getElementById('eventExample');

  counter.addEventListener('input', (event) => {
    console.log(`Values updated: ${JSON.stringify(event.detail)}`);
  });
}
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Common Usage Patterns & Functional Examples

### All Counter Properties

This example demonstrates the use of all available counter properties.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/api-properties.html) -->
  <!-- The below content is automatically added from ./../apiExamples/api-properties.html -->
  <!-- Example of all counter properties -->
  <auro-counter-group>
    <!-- Basic counter with min/max -->
    <auro-counter min="1" max="5" value="2">
      Min 1, Max 5
    </auro-counter>
    <!-- Disabled counter -->
    <auro-counter disabled value="0">
      Disabled counter
    </auro-counter>
  </auro-counter-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/api-properties.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/api-properties.html -->

```html
<!-- Example of all counter properties -->
<auro-counter-group>
  <!-- Basic counter with min/max -->
  <auro-counter min="1" max="5" value="2">
    Min 1, Max 5
  </auro-counter>
  <!-- Disabled counter -->
  <auro-counter disabled value="0">
    Disabled counter
  </auro-counter>
</auro-counter-group>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### All Counter Group Properties

This example demonstrates the use of all available counter group properties.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/api-group-properties.html) -->
  <!-- The below content is automatically added from ./../apiExamples/api-group-properties.html -->
  <!-- Example of counter-group properties -->
  <auro-counter-group max="10" min="2" isDropdown>
    <div slot="bib.fullscreen.headline">Group fullscreen label</div>
    <div slot="label">Group with all properties</div>
    <div slot="helpText">Total must be between 2-10</div>
    <div slot="valueText">Custom total display</div>
    <auro-counter>
      Counter 1
    </auro-counter>
    <auro-counter>
      Counter 2
    </auro-counter>
  </auro-counter-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/api-group-properties.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/api-group-properties.html -->

```html
<!-- Example of counter-group properties -->
<auro-counter-group max="10" min="2" isDropdown>
  <div slot="bib.fullscreen.headline">Group fullscreen label</div>
  <div slot="label">Group with all properties</div>
  <div slot="helpText">Total must be between 2-10</div>
  <div slot="valueText">Custom total display</div>
  <auro-counter>
    Counter 1
  </auro-counter>
  <auro-counter>
    Counter 2
  </auro-counter>
</auro-counter-group>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### All Slots

All available slots for both components.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/api-slots.html) -->
  <!-- The below content is automatically added from ./../apiExamples/api-slots.html -->
  <!-- Example of all available slots -->
  <auro-counter-group isDropdown>
    <!-- Group slots -->
    <div slot="label">Group with all slots</div>
    <div slot="bib.fullscreen.headline">Group fullscreen label</div>
    <div slot="helpText">Help text appears below the group</div>
    <div slot="valueText">Custom value display</div>
    <!-- Counter with all slots -->
    <auro-counter>
      Default slot content
      <span slot="ariaLabel.minus">Custom Minus Button Label</span>
      <span slot="ariaLabel.plus">Custom Plus Button Label</span>
      <span slot="description">Description slot content</span>
    </auro-counter>
  </auro-counter-group>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/api-slots.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/api-slots.html -->

```html
<!-- Example of all available slots -->
<auro-counter-group isDropdown>
  <!-- Group slots -->
  <div slot="label">Group with all slots</div>
  <div slot="bib.fullscreen.headline">Group fullscreen label</div>
  <div slot="helpText">Help text appears below the group</div>
  <div slot="valueText">Custom value display</div>
  <!-- Counter with all slots -->
  <auro-counter>
    Default slot content
    <span slot="ariaLabel.minus">Custom Minus Button Label</span>
    <span slot="ariaLabel.plus">Custom Plus Button Label</span>
    <span slot="description">Description slot content</span>
  </auro-counter>
</auro-counter-group>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Restyle Component with CSS Variables

The component may be restyled by changing the values of the following token(s).

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../src/styles/tokens.scss) -->
<!-- The below code snippet is automatically added from ./../src/styles/tokens.scss -->

```scss
@use "@aurodesignsystem/design-tokens/dist/themes/alaska/SCSSVariables--alaska" as v;

:host(:not([ondark])),
:host(:not([appearance="inverse"])) {
  /* Snowflake Dropdown Tokens */
  --ds-auro-counter-border-color: var(--ds-basic-color-border-bold, #{v.$ds-basic-color-border-bold});
  --ds-auro-counter-background-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-counter-label-text-color: var(--ds-basic-color-texticon-muted, #{v.$ds-basic-color-texticon-muted});
  --ds-auro-counter-placeholder-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-counter-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-counter-error-icon-color: var(--ds-basic-color-status-error, #{v.$ds-basic-color-status-error});
  --ds-auro-counter-outline-color: transparent;

  /* Classic Tokens */
  --ds-auro-counter-control-background-color: var(--ds-advanced-color-button-tertiary-background, #{v.$ds-advanced-color-button-tertiary-background});
  --ds-auro-counter-control-border-color: var(--ds-advanced-color-state-focused, #{v.$ds-advanced-color-state-focused});
  --ds-auro-counter-description-text-color: var(--ds-basic-color-texticon-muted, #{v.$ds-basic-color-texticon-muted});
  --ds-auro-counter-icon-color: var(--ds-advanced-color-button-tertiary-text, #{v.$ds-advanced-color-button-tertiary-text});
  --ds-auro-counter-quantity-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-counter-divider-color: var(--ds-basic-color-border-divider, #{v.$ds-basic-color-border-divider});
}

:host([ondark]),
:host([appearance="inverse"]) {
  /* Snowflake Dropdown Tokens */
  --ds-auro-counter-border-color: var(--ds-basic-color-border-inverse, #{v.$ds-basic-color-border-inverse});
  --ds-auro-counter-background-color: var(--ds-advanced-color-shared-background-inverse, #{v.$ds-advanced-color-shared-background-inverse});
  --ds-auro-counter-label-text-color: var(--ds-basic-color-texticon-inverse-muted, #{v.$ds-basic-color-texticon-inverse-muted});
  --ds-auro-counter-placeholder-text-color: var(--ds-basic-color-texticon-inverse, #{v.$ds-basic-color-texticon-inverse});
  --ds-auro-counter-text-color: var(--ds-basic-color-texticon-inverse, #{v.$ds-basic-color-texticon-inverse});
  --ds-auro-counter-error-icon-color: var(--ds-advanced-color-state-error-inverse, #{v.$ds-advanced-color-state-error-inverse});
  --ds-auro-counter-outline-color: transparent;

  /* Classic Tokens */
  --ds-auro-counter-control-background-color: var(--ds-advanced-color-button-tertiary-background-inverse, #{v.$ds-advanced-color-button-tertiary-background-inverse});
  --ds-auro-counter-control-border-color: var(--ds-advanced-color-state-focused-inverse, #{v.$ds-advanced-color-state-focused-inverse});
  --ds-auro-counter-description-text-color: var(--ds-basic-color-texticon-muted, #{v.$ds-basic-color-texticon-muted});
  --ds-auro-counter-icon-color: var(--ds-advanced-color-button-tertiary-text-inverse, #{v.$ds-advanced-color-button-tertiary-text-inverse});
  --ds-auro-counter-quantity-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-counter-divider-color: var(--ds-basic-color-border-divider-inverse, #{v.$ds-basic-color-border-divider-inverse});
}
```
<!-- AURO-GENERATED-CONTENT:END -->

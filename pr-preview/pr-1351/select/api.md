<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/api.md) -->
<!-- The below content is automatically added from ./../docs/api.md -->

# auro-select

The `auro-select` element is a wrapper for auro-dropdown and auro-menu to create a dropdown menu control.

## Properties

| Property                        | Attribute                       | Type                                             | Default          | Description                                      |
|---------------------------------|---------------------------------|--------------------------------------------------|------------------|--------------------------------------------------|
| [appearance](#appearance)                    | `appearance`                    | `'default' \| 'inverse'`                         | "'default'"      | Defines whether the component will be on lighter or darker backgrounds. |
| [autoPlacement](#autoPlacement)                 | `autoPlacement`                 | `boolean`                                        | false            | If declared, bib's position will be automatically calculated where to appear. |
| [autocomplete](#autocomplete)                  | `autocomplete`                  | `string`                                         |                  | If declared, sets the autocomplete attribute for the select element. |
| [disabled](#disabled)                      | `disabled`                      | `boolean`                                        |                  | When attribute is present, element shows disabled state. |
| [error](#error)                         | `error`                         | `string`                                         |                  | When defined, sets persistent validity to `customError` and sets `setCustomValidity` = attribute value. |
| [flexMenuWidth](#flexMenuWidth)                 | `flexMenuWidth`                 | `boolean`                                        |                  | If declared, make the width of the bib match the width of the content, rather than the trigger. |
| [fluid](#fluid)                         | `fluid`                         | `boolean`                                        |                  | When attribute is present, element will be 100% width of container element. |
| [forceDisplayValue](#forceDisplayValue)             | `forceDisplayValue`             | `boolean`                                        | false            | If declared, the label and value will be visually hidden and the displayValue will render 100% of the time. |
| [fullscreenBreakpoint](#fullscreenBreakpoint)          | `fullscreenBreakpoint`          | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'disabled'` | "'sm'"           | Defines the screen size breakpoint at which the dropdown switches to fullscreen mode on mobile. `disabled` indicates a dropdown should _never_ enter fullscreen.<br /><br />When expanded, the dropdown will automatically display in fullscreen mode<br />if the screen size is equal to or smaller than the selected breakpoint. |
| [largeFullscreenHeadline](#largeFullscreenHeadline)       | `largeFullscreenHeadline`       | `boolean`                                        |                  | If declared, make bib.fullscreen.headline in HeadingDisplay.<br />Otherwise, Heading 600. |
| [layout](#layout)                        | `layout`                        | `'classic' \| 'emphasized' \| 'snowflake'`       | "'classic'"      | Determines the overall layout of the select component. |
| [matchWidth](#matchWidth)                    | `matchWidth`                    | `boolean`                                        | false            | If declared, the popover and trigger will be set to the same width. |
| [multiSelect](#multiSelect)                   | `multiselect`                   | `boolean`                                        |                  | Sets multi-select mode, allowing multiple options to be selected at once. |
| [name](#name)                          | `name`                          | `string`                                         |                  | The name for the select element.                 |
| [noCheckmark](#noCheckmark)                   | `noCheckmark`                   | `boolean`                                        |                  | When true, checkmark on selected option will no longer be present. |
| [noFlip](#noFlip)                        | `noFlip`                        | `boolean`                                        | false            | If declared, the bib will NOT flip to an alternate position<br />when there isn't enough space in the specified `placement`. |
| [noValidate](#noValidate)                    | `noValidate`                    | `boolean`                                        |                  | If set, disables auto-validation on blur.        |
| [offset](#offset)                        | `offset`                        | `number`                                         | "0"              | Gap between the trigger element and bib.         |
| [onDark](#onDark)                        | `onDark`                        | `boolean`                                        |                  | DEPRECATED - use `appearance="inverse"` instead. |
| [optionSelected](#optionSelected)                | `optionSelected`                | `HTMLElement\|Array<HTMLElement>`                |                  | Specifies the current selected menuOption. Default type is `HTMLElement`, changing to `Array<HTMLElement>` when `multiSelect` is true. |
| [placeholder](#placeholder)                   | `placeholder`                   | `string`                                         |                  | Define custom placeholder text.                  |
| [placement](#placement)                     | `placement`                     | `'top' \| 'right' \| 'bottom' \| 'left' \| 'bottom-start' \| 'top-start' \| 'top-end' \| 'right-start' \| 'right-end' \| 'bottom-end' \| 'left-start' \| 'left-end'` | "'bottom-start'" | Position where the bib should appear relative to the trigger. |
| [required](#required)                      | `required`                      | `boolean`                                        |                  | Populates the `required` attribute on the element. Used for client-side validation. |
| [setCustomValidity](#setCustomValidity)             | `setCustomValidity`             | `string`                                         |                  | Sets a custom help text message to display for all validityStates. |
| [setCustomValidityCustomError](#setCustomValidityCustomError)  | `setCustomValidityCustomError`  | `string`                                         |                  | Custom help text message to display when validity = `customError`. |
| [setCustomValidityValueMissing](#setCustomValidityValueMissing) | `setCustomValidityValueMissing` | `string`                                         |                  | Custom help text message to display when validity = `valueMissing`. |
| [shape](#shape)                         | `shape`                         | `'classic' \| 'pill' \| 'pill-left' \| 'pill-right' \| 'snowflake'` |                  | Determines the shape of the dropdown bib.        |
| [shift](#shift)                         | `shift`                         | `boolean`                                        | false            | If set, the dropdown will shift its position to avoid being cut off by the viewport. |
| [size](#size)                          | `size`                          | `'lg' \| 'xl'`                                   |                  | Determines the size of the dropdown bib. Only the `emphasized` layout supports size=`xl`, while all other layouts support size=`lg`. |
| [validity](#validity)                      | `validity`                      | `string`                                         |                  | Specifies the `validityState` this element is in. |
| [value](#value)                         | `value`                         | `string`                                         |                  | Value selected for the component.                |

## Methods

| Method         | Type                                   | Description                                      |
|----------------|----------------------------------------|--------------------------------------------------|
| [hideBib](#hideBib)      | `(): void`                             | Hides the dropdown bib if its open.              |
| [reset](#reset)        | `(): void`                             | Resets component to initial state.               |
| [setMenuValue](#setMenuValue) | `(value: any): void`                   |                                                  |
| [showBib](#showBib)      | `(): void`                             | Shows the dropdown bib if there are options to show. |
| [validate](#validate)     | `(force?: boolean \| undefined): void` | Validates value.<br /><br />**force**: Whether to force validation. |

## Events

| Event                       | Type                                             | Description                                      |
|-----------------------------|--------------------------------------------------|--------------------------------------------------|
| `auroFormElement-validated` |                                                  | Notifies that the `validity` and `errorMessage` values have changed. |
| `auroSelect-valueSet`       | `CustomEvent<any>`                               | Notifies that the component has a new value set. |
| [input](#input)                     | `CustomEvent<{ optionSelected: any; value: any; }>` | Notifies every time the value prop of the element is changed. The updated `value` and `optionSelected` will be delivered in `detail` object. |

## Slots

| Name                      | Description                                      |
|---------------------------|--------------------------------------------------|
|                           | Default slot for the menu content.               |
| `ariaLabel.bib.close`     | Sets aria-label on close button in fullscreen bib |
| `bib.fullscreen.headline` | Defines the headline to display above menu-options |
| [displayValue](#displayValue)            | Allows custom HTML content to display the selected value when select is not focused. |
| [helpText](#helpText)                | Defines the content of the helpText.             |
| [label](#label)                   | Defines the content of the label.                |
| [optionalLabel](#optionalLabel)           | Allows overriding the optional display text "(optional)", which appears next to the label. |
| [valueText](#valueText)               | Dropdown value text display.                     |

## CSS Shadow Parts

| Part              | Description                                      |
|-------------------|--------------------------------------------------|
| [dropdownChevron](#dropdownChevron) | Apply CSS to the collapsed/expanded state icon container. |
| [dropdownSize](#dropdownSize)    | Apply size styles to the dropdown bib (height, width, maxHeight, maxWidth only). |
| [dropdownTrigger](#dropdownTrigger) | Apply CSS to the trigger content container.      |
| [helpText](#helpText)        | Apply CSS to the help text.                      |
<!-- AURO-GENERATED-CONTENT:END -->

## Basic

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
  <!-- The below content is automatically added from ./../apiExamples/basic.html -->
  <auro-select>
    <span slot="ariaLabel.bib.close">Close Popup</span>
    <span slot="bib.fullscreen.headline">Bib Headline</span>
    <span slot="label">Select Example</span>
    <auro-menu>
      <auro-menuoption value="stops">Stops</auro-menuoption>
      <auro-menuoption value="price">Price</auro-menuoption>
      <auro-menuoption value="duration">Duration</auro-menuoption>
      <auro-menuoption value="departure">Departure</auro-menuoption>
      <auro-menuoption value="arrival">Arrival</auro-menuoption>
      <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
    </auro-menu>
  </auro-select>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->

```html
<auro-select>
  <span slot="ariaLabel.bib.close">Close Popup</span>
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <span slot="label">Select Example</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Property & Attribute Examples

### Appearance on Dark Backgrounds

Use the `appearance="inverse"` attribute to render the component for use on dark backgrounds.

<div class="exampleWrapper--ondark">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse.html) -->
  <!-- The below content is automatically added from ./../apiExamples/appearance-inverse.html -->
  <auro-select appearance="inverse">
    <span slot="bib.fullscreen.headline">Bib Headline</span>
    <span slot="label">Select Example</span>
    <auro-menu>
      <auro-menuoption value="stops">Stops</auro-menuoption>
      <auro-menuoption value="price">Price</auro-menuoption>
      <auro-menuoption value="duration">Duration</auro-menuoption>
      <auro-menuoption value="departure">Departure</auro-menuoption>
      <auro-menuoption value="arrival">Arrival</auro-menuoption>
      <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
    </auro-menu>
  </auro-select>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/appearance-inverse.html -->

```html
<auro-select appearance="inverse">
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <span slot="label">Select Example</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Autocomplete

Use the `autocomplete` attribute to let browser's know what information to use to fill out the form.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/autocomplete.html) -->
  <!-- The below content is automatically added from ./../apiExamples/autocomplete.html -->
  <div class="autofill-example-form">
    <div class="input-row">
      <auro-input autocomplete="given-name">
        <span slot="label">First Name</span>
        <span slot="bib.fullscreen.headline">First Name</span>
      </auro-input>
      <auro-input autocomplete="family-name">
        <span slot="label">Last Name</span>
        <span slot="bib.fullscreen.headline">Last Name</span>
      </auro-input>
    </div>
    <div class="input-row">
      <auro-input autocomplete="address-line1">
        <span slot="label">Street Address</span>
        <span slot="bib.fullscreen.headline">Street Address</span>
      </auro-input>
      <auro-input autocomplete="address-level2">
        <span slot="label">City</span>
        <span slot="bib.fullscreen.headline">City</span>
      </auro-input>
      <auro-select autocomplete="address-level1">
        <span slot="bib.fullscreen.headline">Select Your State</span>
        <span slot="label">Select Your State</span>
        <auro-menu>
          <auro-menuoption value="AL">Alabama</auro-menuoption>
          <auro-menuoption value="AK">Alaska</auro-menuoption>
          <auro-menuoption value="AZ">Arizona</auro-menuoption>
          <auro-menuoption value="AR">Arkansas</auro-menuoption>
          <auro-menuoption value="CA">California</auro-menuoption>
          <auro-menuoption value="CO">Colorado</auro-menuoption>
          <auro-menuoption value="CT">Connecticut</auro-menuoption>
          <auro-menuoption value="DE">Delaware</auro-menuoption>
          <auro-menuoption value="DC">District of Columbia</auro-menuoption>
          <auro-menuoption value="FL">Florida</auro-menuoption>
          <auro-menuoption value="GA">Georgia</auro-menuoption>
          <auro-menuoption value="HI">Hawaii</auro-menuoption>
          <auro-menuoption value="ID">Idaho</auro-menuoption>
          <auro-menuoption value="IL">Illinois</auro-menuoption>
          <auro-menuoption value="IN">Indiana</auro-menuoption>
          <auro-menuoption value="IA">Iowa</auro-menuoption>
          <auro-menuoption value="KS">Kansas</auro-menuoption>
          <auro-menuoption value="KY">Kentucky</auro-menuoption>
          <auro-menuoption value="LA">Louisiana</auro-menuoption>
          <auro-menuoption value="ME">Maine</auro-menuoption>
          <auro-menuoption value="MD">Maryland</auro-menuoption>
          <auro-menuoption value="MA">Massachusetts</auro-menuoption>
          <auro-menuoption value="MI">Michigan</auro-menuoption>
          <auro-menuoption value="MN">Minnesota</auro-menuoption>
          <auro-menuoption value="MS">Mississippi</auro-menuoption>
          <auro-menuoption value="MO">Missouri</auro-menuoption>
          <auro-menuoption value="MT">Montana</auro-menuoption>
          <auro-menuoption value="NE">Nebraska</auro-menuoption>
          <auro-menuoption value="NV">Nevada</auro-menuoption>
          <auro-menuoption value="NH">New Hampshire</auro-menuoption>
          <auro-menuoption value="NJ">New Jersey</auro-menuoption>
          <auro-menuoption value="NM">New Mexico</auro-menuoption>
          <auro-menuoption value="NY">New York</auro-menuoption>
          <auro-menuoption value="NC">North Carolina</auro-menuoption>
          <auro-menuoption value="ND">North Dakota</auro-menuoption>
          <auro-menuoption value="OH">Ohio</auro-menuoption>
          <auro-menuoption value="OK">Oklahoma</auro-menuoption>
          <auro-menuoption value="OR">Oregon</auro-menuoption>
          <auro-menuoption value="PA">Pennsylvania</auro-menuoption>
          <auro-menuoption value="RI">Rhode Island</auro-menuoption>
          <auro-menuoption value="SC">South Carolina</auro-menuoption>
          <auro-menuoption value="SD">South Dakota</auro-menuoption>
          <auro-menuoption value="TN">Tennessee</auro-menuoption>
          <auro-menuoption value="TX">Texas</auro-menuoption>
          <auro-menuoption value="UT">Utah</auro-menuoption>
          <auro-menuoption value="VT">Vermont</auro-menuoption>
          <auro-menuoption value="VA">Virginia</auro-menuoption>
          <auro-menuoption value="WA">Washington</auro-menuoption>
          <auro-menuoption value="WV">West Virginia</auro-menuoption>
          <auro-menuoption value="WI">Wisconsin</auro-menuoption>
          <auro-menuoption value="WY">Wyoming</auro-menuoption>
        </auro-menu>
      </auro-select>
    </div>
  </div>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/autocomplete.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/autocomplete.html -->

```html
<div class="autofill-example-form">
  <div class="input-row">
    <auro-input autocomplete="given-name">
      <span slot="label">First Name</span>
      <span slot="bib.fullscreen.headline">First Name</span>
    </auro-input>
    <auro-input autocomplete="family-name">
      <span slot="label">Last Name</span>
      <span slot="bib.fullscreen.headline">Last Name</span>
    </auro-input>
  </div>
  <div class="input-row">
    <auro-input autocomplete="address-line1">
      <span slot="label">Street Address</span>
      <span slot="bib.fullscreen.headline">Street Address</span>
    </auro-input>
    <auro-input autocomplete="address-level2">
      <span slot="label">City</span>
      <span slot="bib.fullscreen.headline">City</span>
    </auro-input>
    <auro-select autocomplete="address-level1">
      <span slot="bib.fullscreen.headline">Select Your State</span>
      <span slot="label">Select Your State</span>
      <auro-menu>
        <auro-menuoption value="AL">Alabama</auro-menuoption>
        <auro-menuoption value="AK">Alaska</auro-menuoption>
        <auro-menuoption value="AZ">Arizona</auro-menuoption>
        <auro-menuoption value="AR">Arkansas</auro-menuoption>
        <auro-menuoption value="CA">California</auro-menuoption>
        <auro-menuoption value="CO">Colorado</auro-menuoption>
        <auro-menuoption value="CT">Connecticut</auro-menuoption>
        <auro-menuoption value="DE">Delaware</auro-menuoption>
        <auro-menuoption value="DC">District of Columbia</auro-menuoption>
        <auro-menuoption value="FL">Florida</auro-menuoption>
        <auro-menuoption value="GA">Georgia</auro-menuoption>
        <auro-menuoption value="HI">Hawaii</auro-menuoption>
        <auro-menuoption value="ID">Idaho</auro-menuoption>
        <auro-menuoption value="IL">Illinois</auro-menuoption>
        <auro-menuoption value="IN">Indiana</auro-menuoption>
        <auro-menuoption value="IA">Iowa</auro-menuoption>
        <auro-menuoption value="KS">Kansas</auro-menuoption>
        <auro-menuoption value="KY">Kentucky</auro-menuoption>
        <auro-menuoption value="LA">Louisiana</auro-menuoption>
        <auro-menuoption value="ME">Maine</auro-menuoption>
        <auro-menuoption value="MD">Maryland</auro-menuoption>
        <auro-menuoption value="MA">Massachusetts</auro-menuoption>
        <auro-menuoption value="MI">Michigan</auro-menuoption>
        <auro-menuoption value="MN">Minnesota</auro-menuoption>
        <auro-menuoption value="MS">Mississippi</auro-menuoption>
        <auro-menuoption value="MO">Missouri</auro-menuoption>
        <auro-menuoption value="MT">Montana</auro-menuoption>
        <auro-menuoption value="NE">Nebraska</auro-menuoption>
        <auro-menuoption value="NV">Nevada</auro-menuoption>
        <auro-menuoption value="NH">New Hampshire</auro-menuoption>
        <auro-menuoption value="NJ">New Jersey</auro-menuoption>
        <auro-menuoption value="NM">New Mexico</auro-menuoption>
        <auro-menuoption value="NY">New York</auro-menuoption>
        <auro-menuoption value="NC">North Carolina</auro-menuoption>
        <auro-menuoption value="ND">North Dakota</auro-menuoption>
        <auro-menuoption value="OH">Ohio</auro-menuoption>
        <auro-menuoption value="OK">Oklahoma</auro-menuoption>
        <auro-menuoption value="OR">Oregon</auro-menuoption>
        <auro-menuoption value="PA">Pennsylvania</auro-menuoption>
        <auro-menuoption value="RI">Rhode Island</auro-menuoption>
        <auro-menuoption value="SC">South Carolina</auro-menuoption>
        <auro-menuoption value="SD">South Dakota</auro-menuoption>
        <auro-menuoption value="TN">Tennessee</auro-menuoption>
        <auro-menuoption value="TX">Texas</auro-menuoption>
        <auro-menuoption value="UT">Utah</auro-menuoption>
        <auro-menuoption value="VT">Vermont</auro-menuoption>
        <auro-menuoption value="VA">Virginia</auro-menuoption>
        <auro-menuoption value="WA">Washington</auro-menuoption>
        <auro-menuoption value="WV">West Virginia</auro-menuoption>
        <auro-menuoption value="WI">Wisconsin</auro-menuoption>
        <auro-menuoption value="WY">Wyoming</auro-menuoption>
      </auro-menu>
    </auro-select>
  </div>
</div>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Disabled

Use the `disabled` attribute to toggle the disabled UI.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled.html) -->
  <!-- The below content is automatically added from ./../apiExamples/disabled.html -->
  <auro-select disabled placeholder="Placeholder Text">
    <span slot="bib.fullscreen.headline">Bib Headline</span>
    <span slot="label">Label</span>
    <auro-menu>
      <auro-menuoption value="stops">Stops</auro-menuoption>
      <auro-menuoption value="price">Price</auro-menuoption>
      <auro-menuoption value="duration">Duration</auro-menuoption>
      <auro-menuoption value="departure">Departure</auro-menuoption>
      <auro-menuoption value="arrival">Arrival</auro-menuoption>
      <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
    </auro-menu>
  </auro-select>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/disabled.html -->

```html
<auro-select disabled placeholder="Placeholder Text">
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <span slot="label">Label</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<div class="exampleWrapper--ondark">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse-disabled.html) -->
  <!-- The below content is automatically added from ./../apiExamples/appearance-inverse-disabled.html -->
  <auro-select appearance="inverse" disabled placeholder="Placeholder Text">
    <span slot="bib.fullscreen.headline">Bib Headline</span>
    <span slot="label">Label</span>
    <auro-menu>
      <auro-menuoption value="stops">Stops</auro-menuoption>
      <auro-menuoption value="price">Price</auro-menuoption>
      <auro-menuoption value="duration">Duration</auro-menuoption>
      <auro-menuoption value="departure">Departure</auro-menuoption>
      <auro-menuoption value="arrival">Arrival</auro-menuoption>
      <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
    </auro-menu>
  </auro-select>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse-disabled.html) -->
<!-- The below content is automatically added from ./../apiExamples/appearance-inverse-disabled.html -->
<auro-select appearance="inverse" disabled placeholder="Placeholder Text">
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <span slot="label">Label</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Error

Use the `error` attribute to toggle the error UI.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/error.html) -->
  <!-- The below content is automatically added from ./../apiExamples/error.html -->
  <auro-select error="Custom error message" placeholder="Placeholder Text">
    <span slot="bib.fullscreen.headline">Bib Headline</span>
    <span slot="label">Label</span>
    <auro-menu>
      <auro-menuoption value="stops">Stops</auro-menuoption>
      <auro-menuoption value="price">Price</auro-menuoption>
      <auro-menuoption value="duration">Duration</auro-menuoption>
      <auro-menuoption value="departure">Departure</auro-menuoption>
      <auro-menuoption value="arrival">Arrival</auro-menuoption>
      <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
    </auro-menu>
  </auro-select>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/error.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/error.html -->

```html
<auro-select error="Custom error message" placeholder="Placeholder Text">
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <span slot="label">Label</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<div class="exampleWrapper--ondark" aria-hidden>
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse-error.html) -->
  <!-- The below content is automatically added from ./../apiExamples/appearance-inverse-error.html -->
  <auro-select appearance="inverse" error="Custom error message" placeholder="Placeholder Text">
    <span slot="bib.fullscreen.headline">Bib Headline</span>
    <span slot="label">Label</span>
    <auro-menu>
      <auro-menuoption value="stops">Stops</auro-menuoption>
      <auro-menuoption value="price">Price</auro-menuoption>
      <auro-menuoption value="duration">Duration</auro-menuoption>
      <auro-menuoption value="departure">Departure</auro-menuoption>
      <auro-menuoption value="arrival">Arrival</auro-menuoption>
      <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
    </auro-menu>
  </auro-select>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse-error.html) -->
<!-- The below content is automatically added from ./../apiExamples/appearance-inverse-error.html -->
<auro-select appearance="inverse" error="Custom error message" placeholder="Placeholder Text">
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <span slot="label">Label</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Flex Menu Width

Use the `flexMenuWidth` boolean attribute to toggle the width of the `<auro-select>` element to match the width of the bib content, rather than the width of the trigger.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/flex-menu-width.html) -->
  <!-- The below content is automatically added from ../apiExamples/flex-menu-width.html -->
  <auro-select flexMenuWidth id="flexMenuWidthExample" placeholder="Placeholder Text">
    <span slot="bib.fullscreen.headline">Bib Headline</span>
    <span slot="label">Label</span>
    <auro-menu>
      <auro-menuoption value="united states">United States has a country code of (+1)</auro-menuoption>
      <auro-menuoption value="costa rica">Costa Rica has a country code of (+506)</auro-menuoption>
      <auro-menuoption value="mexico">Mexico has a country code of (+52)</auro-menuoption>
      <auro-menuoption value="afghanistan">Afghanistan has a country code of (+93)</auro-menuoption>
      <auro-menuoption value="albania">Albania has a country code of (+355)</auro-menuoption>
    </auro-menu>
  </auro-select>
  <style>
    #flexMenuWidthExample::part(dropdownTrigger) {
      width: 25%;
    }
  </style>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/flex-menu-width.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/flex-menu-width.html -->

```html
<auro-select flexMenuWidth id="flexMenuWidthExample" placeholder="Placeholder Text">
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <span slot="label">Label</span>
  <auro-menu>
    <auro-menuoption value="united states">United States has a country code of (+1)</auro-menuoption>
    <auro-menuoption value="costa rica">Costa Rica has a country code of (+506)</auro-menuoption>
    <auro-menuoption value="mexico">Mexico has a country code of (+52)</auro-menuoption>
    <auro-menuoption value="afghanistan">Afghanistan has a country code of (+93)</auro-menuoption>
    <auro-menuoption value="albania">Albania has a country code of (+355)</auro-menuoption>
  </auro-menu>
</auro-select>
<style>
  #flexMenuWidthExample::part(dropdownTrigger) {
    width: 25%;
  }
</style>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Dropdown with Fullscreen Bib

You can make the dropdown open in fullscreen at a specific breakpoint by setting `fullscreenBreakpoint`.

The default value of `fullscreenBreakpoint` is `sm`. 

Breakpoint token can be found [here](https://auro.alaskaair.com/getting-started/developers/design-tokens)

To support fullcreen bib, setting `bib.fullscreen.headline` is **STRONGLY RECOMMENDED**.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/fullscreen-breakpoint.html) -->
  <!-- The below content is automatically added from ./../apiExamples/fullscreen-breakpoint.html -->
  <auro-select fullscreenBreakpoint="lg">
    <span slot="label">Select Example</span>
    <span slot="bib.fullscreen.headline">Bib Headline</span>
    <auro-menu>
      <auro-menuoption value="stops">Stops</auro-menuoption>
      <auro-menuoption value="price">Price</auro-menuoption>
      <auro-menuoption value="duration">Duration</auro-menuoption>
      <auro-menuoption value="departure">Departure</auro-menuoption>
      <auro-menuoption value="arrival">Arrival</auro-menuoption>
      <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
    </auro-menu>
  </auro-select>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/fullscreen-breakpoint.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/fullscreen-breakpoint.html -->

```html
<auro-select fullscreenBreakpoint="lg">
  <span slot="label">Select Example</span>
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Disabled Fullscreen Bib

This example overrides the default dropdown behavior to force a non-fullscreen view on any screen size. `disabled`
ensures that the dropdown will never be fullscreen.
Please use `xl` if you want the opposite behavior, where a dropdown is always fullscreen.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/fullscreen-disabled.html) -->
  <!-- The below content is automatically added from ./../apiExamples/fullscreen-disabled.html -->
  <auro-select fullscreenBreakpoint="disabled">
    <span slot="bib.fullscreen.headline">Bib Headline</span>
    <span slot="label">Select Example</span>
    <auro-menu>
      <auro-menuoption value="stops">Stops</auro-menuoption>
      <auro-menuoption value="price">Price</auro-menuoption>
      <auro-menuoption value="duration">Duration</auro-menuoption>
      <auro-menuoption value="departure">Departure</auro-menuoption>
      <auro-menuoption value="arrival">Arrival</auro-menuoption>
      <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
    </auro-menu>
  </auro-select>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/fullscreen-disabled.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/fullscreen-disabled.html -->

```html
<auro-select fullscreenBreakpoint="disabled">
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <span slot="label">Select Example</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Shape | Size | Layout Support

The `auro-select` component supports the `shape`, `size` and `layout` feature set. The component defaults to the `layout="classic"`, `shape="classic"` and `size="lg"`.

#### Classic Layout (Legacy)

The `classic` layout is default for `auro-select`. No customization is needed to achieve this look.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
  <!-- The below content is automatically added from ./../apiExamples/basic.html -->
  <auro-select>
    <span slot="ariaLabel.bib.close">Close Popup</span>
    <span slot="bib.fullscreen.headline">Bib Headline</span>
    <span slot="label">Select Example</span>
    <auro-menu>
      <auro-menuoption value="stops">Stops</auro-menuoption>
      <auro-menuoption value="price">Price</auro-menuoption>
      <auro-menuoption value="duration">Duration</auro-menuoption>
      <auro-menuoption value="departure">Departure</auro-menuoption>
      <auro-menuoption value="arrival">Arrival</auro-menuoption>
      <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
    </auro-menu>
  </auro-select>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->

```html
<auro-select>
  <span slot="ariaLabel.bib.close">Close Popup</span>
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <span slot="label">Select Example</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Emphasized Layout

The `emphasized` layout is only supported on light backgrounds.

The `emphasized` layout supports the following shapes:
- `pill`
- `pill-left`
- `pill-right`

The `emphasized` layout supports the following sizes:
- `xl`

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/emphasized/basic.html) -->
  <!-- The below content is automatically added from ./../apiExamples/emphasized/basic.html -->
  <div style="display: flex; flex-direction: row; gap: 10px;">
    <auro-select layout="emphasized" shape="pill" size="xl" value="flights" forceDisplayValue style="display:inline-block;">
      <span slot="ariaLabel.bib.close">Close Popup</span>
      <span slot="label">Select Example</span>
      <auro-menu nocheckmark>
        <auro-menuoption value="flights">
          <auro-icon category="terminal" name="plane-diag-stroke" customcolor></auro-icon> Flights
          <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="terminal" name="plane-diag-fill" customcolor></auro-icon>
        </auro-menuoption>
        <auro-menuoption value="cars">
          <auro-icon category="destination" name="car-rental-stroke" customcolor></auro-icon> Cars
          <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="destination" name="car-rental-stroke" customcolor></auro-icon>
        </auro-menuoption>
        <auro-menuoption value="hotels">
          <auro-icon category="destination" name="hotel-stroke" customcolor></auro-icon> Hotels
          <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="destination" name="hotel-filled" customcolor></auro-icon>
        </auro-menuoption>
        <auro-menuoption value="packages">
          <auro-icon category="shop" name="gift-stroke" customcolor></auro-icon> Packages
          <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="shop" name="gift-filled" customcolor></auro-icon>
        </auro-menuoption>
        <auro-menuoption value="cruises">
          <auro-icon category="in-flight" name="boarding" customcolor></auro-icon> Cruises
          <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="in-flight" name="boarding" customcolor></auro-icon>
        </auro-menuoption>
      </auro-menu>
    </auro-select>
    <auro-select layout="emphasized" shape="pill" size="xl" value="flights" style="display:inline-block;">
      <span slot="label">Select Example</span>
      <auro-menu nocheckmark>
        <auro-menuoption value="flights">
          <auro-icon category="terminal" name="plane-diag-stroke" customcolor></auro-icon> Flights
          <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="terminal" name="plane-diag-fill" customcolor></auro-icon>
        </auro-menuoption>
        <auro-menuoption value="cars">
          <auro-icon category="destination" name="car-rental-stroke" customcolor></auro-icon> Cars
          <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="destination" name="car-rental-stroke" customcolor></auro-icon>
        </auro-menuoption>
        <auro-menuoption value="hotels">
          <auro-icon category="destination" name="hotel-stroke" customcolor></auro-icon> Hotels
          <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="destination" name="hotel-filled" customcolor></auro-icon>
        </auro-menuoption>
        <auro-menuoption value="packages">
          <auro-icon category="shop" name="gift-stroke" customcolor></auro-icon> Packages
          <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="shop" name="gift-filled" customcolor></auro-icon>
        </auro-menuoption>
        <auro-menuoption value="cruises">
          <auro-icon category="in-flight" name="boarding" customcolor></auro-icon> Cruises
          <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="in-flight" name="boarding" customcolor></auro-icon>
        </auro-menuoption>
      </auro-menu>
    </auro-select>
    <auro-select layout="emphasized" shape="pill" size="xl" value="flights" required style="display:inline-block;">
      <span slot="label">Select Example</span>
      <span slot="helpText">no displayValue in menuoptions</span>
      <auro-menu nocheckmark>
        <auro-menuoption value="flights">
          <auro-icon category="terminal" name="plane-diag-stroke" customcolor></auro-icon> Flights
        </auro-menuoption>
        <auro-menuoption value="cars">
          <auro-icon category="destination" name="car-rental-stroke" customcolor></auro-icon> Cars
        </auro-menuoption>
        <auro-menuoption value="hotels">
          <auro-icon category="destination" name="hotel-stroke" customcolor></auro-icon> Hotels
        </auro-menuoption>
        <auro-menuoption value="packages">
          <auro-icon category="shop" name="gift-stroke" customcolor></auro-icon> Packages
        </auro-menuoption>
        <auro-menuoption value="cruises">
          <auro-icon category="in-flight" name="boarding" customcolor></auro-icon> Cruises
        </auro-menuoption>
      </auro-menu>
    </auro-select>
  </div>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/emphasized/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/emphasized/basic.html -->

```html
<div style="display: flex; flex-direction: row; gap: 10px;">
  <auro-select layout="emphasized" shape="pill" size="xl" value="flights" forceDisplayValue style="display:inline-block;">
    <span slot="ariaLabel.bib.close">Close Popup</span>
    <span slot="label">Select Example</span>
    <auro-menu nocheckmark>
      <auro-menuoption value="flights">
        <auro-icon category="terminal" name="plane-diag-stroke" customcolor></auro-icon> Flights
        <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="terminal" name="plane-diag-fill" customcolor></auro-icon>
      </auro-menuoption>
      <auro-menuoption value="cars">
        <auro-icon category="destination" name="car-rental-stroke" customcolor></auro-icon> Cars
        <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="destination" name="car-rental-stroke" customcolor></auro-icon>
      </auro-menuoption>
      <auro-menuoption value="hotels">
        <auro-icon category="destination" name="hotel-stroke" customcolor></auro-icon> Hotels
        <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="destination" name="hotel-filled" customcolor></auro-icon>
      </auro-menuoption>
      <auro-menuoption value="packages">
        <auro-icon category="shop" name="gift-stroke" customcolor></auro-icon> Packages
        <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="shop" name="gift-filled" customcolor></auro-icon>
      </auro-menuoption>
      <auro-menuoption value="cruises">
        <auro-icon category="in-flight" name="boarding" customcolor></auro-icon> Cruises
        <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="in-flight" name="boarding" customcolor></auro-icon>
      </auro-menuoption>
    </auro-menu>
  </auro-select>
  <auro-select layout="emphasized" shape="pill" size="xl" value="flights" style="display:inline-block;">
    <span slot="label">Select Example</span>
    <auro-menu nocheckmark>
      <auro-menuoption value="flights">
        <auro-icon category="terminal" name="plane-diag-stroke" customcolor></auro-icon> Flights
        <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="terminal" name="plane-diag-fill" customcolor></auro-icon>
      </auro-menuoption>
      <auro-menuoption value="cars">
        <auro-icon category="destination" name="car-rental-stroke" customcolor></auro-icon> Cars
        <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="destination" name="car-rental-stroke" customcolor></auro-icon>
      </auro-menuoption>
      <auro-menuoption value="hotels">
        <auro-icon category="destination" name="hotel-stroke" customcolor></auro-icon> Hotels
        <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="destination" name="hotel-filled" customcolor></auro-icon>
      </auro-menuoption>
      <auro-menuoption value="packages">
        <auro-icon category="shop" name="gift-stroke" customcolor></auro-icon> Packages
        <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="shop" name="gift-filled" customcolor></auro-icon>
      </auro-menuoption>
      <auro-menuoption value="cruises">
        <auro-icon category="in-flight" name="boarding" customcolor></auro-icon> Cruises
        <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="in-flight" name="boarding" customcolor></auro-icon>
      </auro-menuoption>
    </auro-menu>
  </auro-select>
  <auro-select layout="emphasized" shape="pill" size="xl" value="flights" required style="display:inline-block;">
    <span slot="label">Select Example</span>
    <span slot="helpText">no displayValue in menuoptions</span>
    <auro-menu nocheckmark>
      <auro-menuoption value="flights">
        <auro-icon category="terminal" name="plane-diag-stroke" customcolor></auro-icon> Flights
      </auro-menuoption>
      <auro-menuoption value="cars">
        <auro-icon category="destination" name="car-rental-stroke" customcolor></auro-icon> Cars
      </auro-menuoption>
      <auro-menuoption value="hotels">
        <auro-icon category="destination" name="hotel-stroke" customcolor></auro-icon> Hotels
      </auro-menuoption>
      <auro-menuoption value="packages">
        <auro-icon category="shop" name="gift-stroke" customcolor></auro-icon> Packages
      </auro-menuoption>
      <auro-menuoption value="cruises">
        <auro-icon category="in-flight" name="boarding" customcolor></auro-icon> Cruises
      </auro-menuoption>
    </auro-menu>
  </auro-select>
</div>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Snowflake Layout

The `snowflake` layout is a unique, one off layout that does not follow the normal pattern. There is only one way to use snowflake as shown in the following example.

The `snowflake` layout is only expected to be used on dark backgrounds, in conjunction with `appearance="inverse"`.

<div class="exampleWrapper--ondark">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/snowflake/basic.html) -->
  <!-- The below content is automatically added from ./../apiExamples/snowflake/basic.html -->
  <auro-select layout="snowflake" shape="snowflake" appearance="inverse" required style="width:300px;">
    <span slot="ariaLabel.bib.close">Close Popup</span>
    <span slot="label">Label</span>
    <span slot="helpText">Help Text</span>
    <auro-menu nocheckmark>
      <auro-menuoption value="flights">
        <auro-icon category="terminal" name="plane-diag-stroke" customColor></auro-icon> Flights
      </auro-menuoption>
      <auro-menuoption value="cars">
        <auro-icon category="destination" name="car-rental-stroke" customColor></auro-icon> Cars
      </auro-menuoption>
      <auro-menuoption value="hotels">
        <auro-icon category="destination" name="hotel-stroke" customColor></auro-icon> Hotels
      </auro-menuoption>
      <auro-menuoption value="packages">
        <auro-icon category="shop" name="gift-stroke" customColor></auro-icon> Packages
      </auro-menuoption>
      <auro-menuoption value="cruises">
        <auro-icon category="in-flight" name="boarding" customColor></auro-icon> Cruises
      </auro-menuoption>
    </auro-menu>
  </auro-select>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/snowflake/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/snowflake/basic.html -->

```html
<auro-select layout="snowflake" shape="snowflake" appearance="inverse" required style="width:300px;">
  <span slot="ariaLabel.bib.close">Close Popup</span>
  <span slot="label">Label</span>
  <span slot="helpText">Help Text</span>
  <auro-menu nocheckmark>
    <auro-menuoption value="flights">
      <auro-icon category="terminal" name="plane-diag-stroke" customColor></auro-icon> Flights
    </auro-menuoption>
    <auro-menuoption value="cars">
      <auro-icon category="destination" name="car-rental-stroke" customColor></auro-icon> Cars
    </auro-menuoption>
    <auro-menuoption value="hotels">
      <auro-icon category="destination" name="hotel-stroke" customColor></auro-icon> Hotels
    </auro-menuoption>
    <auro-menuoption value="packages">
      <auro-icon category="shop" name="gift-stroke" customColor></auro-icon> Packages
    </auro-menuoption>
    <auro-menuoption value="cruises">
      <auro-icon category="in-flight" name="boarding" customColor></auro-icon> Cruises
    </auro-menuoption>
  </auro-menu>
</auro-select>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Multi-Select

Sets multi-select mode, allowing multiple options to be selected at once.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/multi-select.html) -->
  <!-- The below content is automatically added from ./../apiExamples/multi-select.html -->
  <auro-select multiselect>
    <span slot="bib.fullscreen.headline">Bib Headline</span>
    <label slot="placeholder">Select one or more options</label>
    <span slot="label">multiselect select example</span>
    <auro-menu>
      <auro-menuoption value="1">Option 1</auro-menuoption>
      <auro-menuoption value="2">Option 2</auro-menuoption>
      <auro-menuoption value="3">Option 3</auro-menuoption>
    </auro-menu>
  </auro-select>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/multi-select.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/multi-select.html -->

```html
<auro-select multiselect>
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <label slot="placeholder">Select one or more options</label>
  <span slot="label">multiselect select example</span>
  <auro-menu>
    <auro-menuoption value="1">Option 1</auro-menuoption>
    <auro-menuoption value="2">Option 2</auro-menuoption>
    <auro-menuoption value="3">Option 3</auro-menuoption>
  </auro-menu>
</auro-select>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### No Checkmark

Applying the `noCheckmark` attribute will prevent the checkmark icon from being shown on the selected option. The left padding to reserve space for the checkmark will not be shown.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/no-checkmark.html) -->
  <!-- The below content is automatically added from ./../apiExamples/no-checkmark.html -->
  <auro-select nocheckmark placeholder="Placeholder Text">
    <span slot="bib.fullscreen.headline">Bib Headline</span>
    <span slot="label">Label</span>
      <auro-menu>
          <auro-menuoption value="stops">Stops</auro-menuoption>
          <auro-menuoption value="price">Price</auro-menuoption>
          <auro-menuoption value="duration">Duration</auro-menuoption>
          <auro-menuoption value="departure">Departure</auro-menuoption>
          <auro-menuoption value="arrival">Arrival</auro-menuoption>
          <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
      </auro-menu>
  </auro-select>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/no-checkmark.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/no-checkmark.html -->

```html
<auro-select nocheckmark placeholder="Placeholder Text">
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <span slot="label">Label</span>
    <auro-menu>
        <auro-menuoption value="stops">Stops</auro-menuoption>
        <auro-menuoption value="price">Price</auro-menuoption>
        <auro-menuoption value="duration">Duration</auro-menuoption>
        <auro-menuoption value="departure">Departure</auro-menuoption>
        <auro-menuoption value="arrival">Arrival</auro-menuoption>
        <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
    </auro-menu>
</auro-select>
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
    <auro-select offset="20" noFlip placement="bottom-end">
      <span slot="bib.fullscreen.headline">Bib Headline</span>
      <span slot="label">Label</span>
      <span slot="helpText">bottom-end bib with 20px offset and noFlip</span>
      <auro-menu>
        <auro-menuoption value="stops">Stops</auro-menuoption>
        <auro-menuoption value="price">Price</auro-menuoption>
        <auro-menuoption value="duration">Duration</auro-menuoption>
        <auro-menuoption value="departure">Departure</auro-menuoption>
        <auro-menuoption value="arrival">Arrival</auro-menuoption>
        <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
      </auro-menu>
    </auro-select>
    <auro-select offset="20" placement="bottom-end">
      <span slot="bib.fullscreen.headline">Bib Headline</span>
      <span slot="label">Label</span>
      <span slot="helpText">bottom-end bib with 20px offset and flip</span>
      <auro-menu>
        <auro-menuoption value="stops">Stops</auro-menuoption>
        <auro-menuoption value="price">Price</auro-menuoption>
        <auro-menuoption value="duration">Duration</auro-menuoption>
        <auro-menuoption value="departure">Departure</auro-menuoption>
        <auro-menuoption value="arrival">Arrival</auro-menuoption>
        <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
      </auro-menu>
    </auro-select>
    <auro-select offset="20" noFlip placement="right" autoPlacement noFlip >
      <span slot="bib.fullscreen.headline">Bib Headline</span>
      <span slot="label">Label</span>
      <span slot="helpText">right bib with 20px offset, noFlip and autoPlacement</span>
      <auro-menu>
        <auro-menuoption value="stops">Stops</auro-menuoption>
        <auro-menuoption value="price">Price</auro-menuoption>
        <auro-menuoption value="duration">Duration</auro-menuoption>
        <auro-menuoption value="departure">Departure</auro-menuoption>
        <auro-menuoption value="arrival">Arrival</auro-menuoption>
        <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
      </auro-menu>
    </auro-select>
    <auro-select width="350px" offset="20" noFlip placement="bottom-start" shift noFlip >
      <span slot="bib.fullscreen.headline">Bib Headline</span>
      <span slot="label">Label</span>
      <span slot="helpText">bottom-start bib with 20px offset, noFlip and shift</span>
      <auro-menu>
        <auro-menuoption value="stops">Stops</auro-menuoption>
        <auro-menuoption value="price">Price</auro-menuoption>
        <auro-menuoption value="duration">Duration</auro-menuoption>
        <auro-menuoption value="departure">Departure</auro-menuoption>
        <auro-menuoption value="arrival">Arrival</auro-menuoption>
        <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
      </auro-menu>
    </auro-select>
  </div>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/floater-config.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/floater-config.html -->

```html
<div style="width: 350px">
  <auro-select offset="20" noFlip placement="bottom-end">
    <span slot="bib.fullscreen.headline">Bib Headline</span>
    <span slot="label">Label</span>
    <span slot="helpText">bottom-end bib with 20px offset and noFlip</span>
    <auro-menu>
      <auro-menuoption value="stops">Stops</auro-menuoption>
      <auro-menuoption value="price">Price</auro-menuoption>
      <auro-menuoption value="duration">Duration</auro-menuoption>
      <auro-menuoption value="departure">Departure</auro-menuoption>
      <auro-menuoption value="arrival">Arrival</auro-menuoption>
      <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
    </auro-menu>
  </auro-select>
  <auro-select offset="20" placement="bottom-end">
    <span slot="bib.fullscreen.headline">Bib Headline</span>
    <span slot="label">Label</span>
    <span slot="helpText">bottom-end bib with 20px offset and flip</span>
    <auro-menu>
      <auro-menuoption value="stops">Stops</auro-menuoption>
      <auro-menuoption value="price">Price</auro-menuoption>
      <auro-menuoption value="duration">Duration</auro-menuoption>
      <auro-menuoption value="departure">Departure</auro-menuoption>
      <auro-menuoption value="arrival">Arrival</auro-menuoption>
      <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
    </auro-menu>
  </auro-select>
  <auro-select offset="20" noFlip placement="right" autoPlacement noFlip >
    <span slot="bib.fullscreen.headline">Bib Headline</span>
    <span slot="label">Label</span>
    <span slot="helpText">right bib with 20px offset, noFlip and autoPlacement</span>
    <auro-menu>
      <auro-menuoption value="stops">Stops</auro-menuoption>
      <auro-menuoption value="price">Price</auro-menuoption>
      <auro-menuoption value="duration">Duration</auro-menuoption>
      <auro-menuoption value="departure">Departure</auro-menuoption>
      <auro-menuoption value="arrival">Arrival</auro-menuoption>
      <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
    </auro-menu>
  </auro-select>
  <auro-select width="350px" offset="20" noFlip placement="bottom-start" shift noFlip >
    <span slot="bib.fullscreen.headline">Bib Headline</span>
    <span slot="label">Label</span>
    <span slot="helpText">bottom-start bib with 20px offset, noFlip and shift</span>
    <auro-menu>
      <auro-menuoption value="stops">Stops</auro-menuoption>
      <auro-menuoption value="price">Price</auro-menuoption>
      <auro-menuoption value="duration">Duration</auro-menuoption>
      <auro-menuoption value="departure">Departure</auro-menuoption>
      <auro-menuoption value="arrival">Arrival</auro-menuoption>
      <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
    </auro-menu>
  </auro-select>
</div>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Placeholder

Use the `placeholder` attribute to inject a custom placeholder option with the select element.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/placeholder.html) -->
  <!-- The below content is automatically added from ./../apiExamples/placeholder.html -->
  <auro-select placeholder="Please select your preferred option">
    <span slot="bib.fullscreen.headline">Bib Headline</span>
    <span slot="label">Label</span>
    <auro-menu>
      <auro-menuoption value="stops">Stops</auro-menuoption>
      <auro-menuoption value="price">Price</auro-menuoption>
      <auro-menuoption value="duration">Duration</auro-menuoption>
      <auro-menuoption value="departure">Departure</auro-menuoption>
      <auro-menuoption value="arrival">Arrival</auro-menuoption>
      <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
    </auro-menu>
  </auro-select>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/placeholder.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/placeholder.html -->

```html
<auro-select placeholder="Please select your preferred option">
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <span slot="label">Label</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Required

When present, the `required` attribute specifies that a select field must be filled out before submitting the form.

When the validity check fails the validityState, equals `valueMissing`. The error message for the `valueMissing` validityState can be set to a custom string using the `setCustomValidityValueMissing`. There is no default error message defined.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/required.html) -->
  <!-- The below content is automatically added from ./../apiExamples/required.html -->
  <auro-select required setCustomValidityValueMissing="Custom required validation error message." placeholder="Placeholder Text">
    <span slot="bib.fullscreen.headline">Bib Headline</span>
    <span slot="label">Label</span>
    <auro-menu>
      <auro-menuoption value="stops">Stops</auro-menuoption>
      <auro-menuoption value="price">Price</auro-menuoption>
      <auro-menuoption value="duration">Duration</auro-menuoption>
      <auro-menuoption value="departure">Departure</auro-menuoption>
      <auro-menuoption value="arrival">Arrival</auro-menuoption>
      <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
    </auro-menu>
  </auro-select>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/required.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/required.html -->

```html
<auro-select required setCustomValidityValueMissing="Custom required validation error message." placeholder="Placeholder Text">
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <span slot="label">Label</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Value

Use the `value` property to define a preset value on the `auro-select` element. The `value` of `auro-select` must match the `value` defined of a single `auro-menuoption`. Upon initially rendering the component, if the `value` does not match an `auro-menuoption`, the `value` of `auro-select` will be set to `undefined`.

To pre-set the value of auro-select on load, use the `value` property. The `selected` attribute on auro-menuoption is designed to illustrate state in the DOM.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/value.html) -->
  <!-- The below content is automatically added from ./../apiExamples/value.html -->
  <auro-button id="validValueExampleBtn">Set Value to Valid Option</auro-button>
  <auro-button id="invalidValueExampleBtn">Set Value to Invalid Option</auro-button>
  <br/><br/>
  <auro-select id="valueExample" multiselect value='["price", "duration"]'>
    <span slot="bib.fullscreen.headline">Bib Headline</span>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption id="option-0" value="stops">Stops</auro-menuoption>
      <auro-menuoption id="option-1" value="price">Price</auro-menuoption>
      <auro-menuoption id="option-2" value="duration">Duration</auro-menuoption>
      <auro-menuoption id="option-3" value="departure">Departure</auro-menuoption>
      <auro-menuoption id="option-4" value="arrival">Arrival</auro-menuoption>
      <auro-menuoption id="option-5" value="prefer alaska">Prefer Alaska</auro-menuoption>
    </auro-menu>
  </auro-select>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/value.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/value.html -->

```html
<auro-button id="validValueExampleBtn">Set Value to Valid Option</auro-button>
<auro-button id="invalidValueExampleBtn">Set Value to Invalid Option</auro-button>
<br/><br/>
<auro-select id="valueExample" multiselect value='["price", "duration"]'>
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption id="option-0" value="stops">Stops</auro-menuoption>
    <auro-menuoption id="option-1" value="price">Price</auro-menuoption>
    <auro-menuoption id="option-2" value="duration">Duration</auro-menuoption>
    <auro-menuoption id="option-3" value="departure">Departure</auro-menuoption>
    <auro-menuoption id="option-4" value="arrival">Arrival</auro-menuoption>
    <auro-menuoption id="option-5" value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/value.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/value.js -->

```js
export function valueExample() {
  const valueExample = document.querySelector('#valueExample');

  document.querySelector('#validValueExampleBtn').addEventListener('click', () => {
    valueExample.value = '["arrival", "prefer alaska"]';
  });

  document.querySelector('#invalidValueExampleBtn').addEventListener('click', () => {
    valueExample.value = '["flight course"]';
  });
}
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Method Examples

### Reset State

Use the `reset()` method to reset the `<auro-select>`'s `value` and `validity` state. Doing so will preserve all other attributes and properties.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/reset-state.html) -->
  <!-- The below content is automatically added from ./../apiExamples/reset-state.html -->
  <auro-button id="resetStateBtn">Reset</auro-button>
  <br/><br/>
  <auro-select id="resetStateExample" value="price" placeholder="Placeholder Text">
    <span slot="bib.fullscreen.headline">Bib Headline</span>
    <span slot="label">Label</span>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="stops">Stops</auro-menuoption>
      <auro-menuoption value="price">Price</auro-menuoption>
      <auro-menuoption value="duration">Duration</auro-menuoption>
      <auro-menuoption value="departure">Departure</auro-menuoption>
      <auro-menuoption value="arrival">Arrival</auro-menuoption>
      <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
    </auro-menu>
  </auro-select>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/reset-state.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/reset-state.html -->

```html
<auro-button id="resetStateBtn">Reset</auro-button>
<br/><br/>
<auro-select id="resetStateExample" value="price" placeholder="Placeholder Text">
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <span slot="label">Label</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>
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

### Custom Value Display

The `auro-select` supports the new formkit feature set enabling customized content displayed when a value is selected.

e.g. You may have a menu option that reads "SeaTac International Airport". However, when that option is selected, you would like the value displayed in the auro-select to just be the airport code "SEA".

The custom display value content is inserted using `slot="displayValue"` on each menu option. The `auro-select` component does not style or restrict the slotted content. It is the responsibility of the implementor to insure the content fits within the auro-select container and is styled appropriately.

The following example demonstrates menu options with an icon and text. When selected, the auro-select renders an icon with no text.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/emphasized/constant-display-value.html) -->
  <!-- The below content is automatically added from ./../apiExamples/emphasized/constant-display-value.html -->
  <auro-select layout="emphasized" shape="pill" size="xl" value="flights" forceDisplayValue style="display:inline-block;">
    <span slot="label">Select Example</span>
    <auro-menu nocheckmark>
      <auro-menuoption value="flights">
        <auro-icon category="terminal" name="plane-diag-stroke" customcolor></auro-icon> Flights
        <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="terminal" name="plane-diag-fill" customcolor></auro-icon>
      </auro-menuoption>
      <auro-menuoption value="cars">
        <auro-icon category="destination" name="car-rental-stroke" customcolor></auro-icon> Cars
        <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="destination" name="car-rental-stroke" customcolor></auro-icon>
      </auro-menuoption>
      <auro-menuoption value="hotels">
        <auro-icon category="destination" name="hotel-stroke" customcolor></auro-icon> Hotels
        <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="destination" name="hotel-filled" customcolor></auro-icon>
      </auro-menuoption>
      <auro-menuoption value="packages">
        <auro-icon category="shop" name="gift-stroke" customcolor></auro-icon> Packages
        <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="shop" name="gift-filled" customcolor></auro-icon>
      </auro-menuoption>
      <auro-menuoption value="cruises">
        <auro-icon category="in-flight" name="boarding" customcolor></auro-icon> Cruises
        <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="in-flight" name="boarding" customcolor></auro-icon>
      </auro-menuoption>
    </auro-menu>
  </auro-select>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/emphasized/constant-display-value.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/emphasized/constant-display-value.html -->

```html
<auro-select layout="emphasized" shape="pill" size="xl" value="flights" forceDisplayValue style="display:inline-block;">
  <span slot="label">Select Example</span>
  <auro-menu nocheckmark>
    <auro-menuoption value="flights">
      <auro-icon category="terminal" name="plane-diag-stroke" customcolor></auro-icon> Flights
      <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="terminal" name="plane-diag-fill" customcolor></auro-icon>
    </auro-menuoption>
    <auro-menuoption value="cars">
      <auro-icon category="destination" name="car-rental-stroke" customcolor></auro-icon> Cars
      <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="destination" name="car-rental-stroke" customcolor></auro-icon>
    </auro-menuoption>
    <auro-menuoption value="hotels">
      <auro-icon category="destination" name="hotel-stroke" customcolor></auro-icon> Hotels
      <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="destination" name="hotel-filled" customcolor></auro-icon>
    </auro-menuoption>
    <auro-menuoption value="packages">
      <auro-icon category="shop" name="gift-stroke" customcolor></auro-icon> Packages
      <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="shop" name="gift-filled" customcolor></auro-icon>
    </auro-menuoption>
    <auro-menuoption value="cruises">
      <auro-icon category="in-flight" name="boarding" customcolor></auro-icon> Cruises
      <auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="in-flight" name="boarding" customcolor></auro-icon>
    </auro-menuoption>
  </auro-menu>
</auro-select>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Help Text

Use the `helpText` slot to provide additional information back to your user about their selection option(s).

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/help-text.html) -->
  <!-- The below content is automatically added from ./../apiExamples/help-text.html -->
  <auro-select placeholder="Placeholder Text">
    <span slot="bib.fullscreen.headline">Bib Headline</span>
    <span slot="label">Label</span>
    <span slot="helpText">Custom help text message.</span>
    <auro-menu>
      <auro-menuoption value="stops">Stops</auro-menuoption>
      <auro-menuoption value="price">Price</auro-menuoption>
      <auro-menuoption value="duration">Duration</auro-menuoption>
      <auro-menuoption value="departure">Departure</auro-menuoption>
      <auro-menuoption value="arrival">Arrival</auro-menuoption>
      <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
    </auro-menu>
  </auro-select>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/help-text.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/help-text.html -->

```html
<auro-select placeholder="Placeholder Text">
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <span slot="label">Label</span>
  <span slot="helpText">Custom help text message.</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Label

Use the `label` slot to give your users contextual information about their selection options. This `label` content is also helpful for assistive devices.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/label.html) -->
  <!-- The below content is automatically added from ./../apiExamples/label.html -->
  <auro-select>
    <span slot="bib.fullscreen.headline">Bib Headline</span>
    <span slot="label">Please select a preference</span>
    <auro-menu>
      <auro-menuoption value="stops">Stops</auro-menuoption>
      <auro-menuoption value="price">Price</auro-menuoption>
      <auro-menuoption value="duration">Duration</auro-menuoption>
      <auro-menuoption value="departure">Departure</auro-menuoption>
      <auro-menuoption value="arrival">Arrival</auro-menuoption>
      <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
    </auro-menu>
  </auro-select>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/label.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/label.html -->

```html
<auro-select>
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <span slot="label">Please select a preference</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Optional Label

The `<auro-select>` supports an `optionalLabel` slot, where users can can override the default `(optional)` notification text.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/optional-label.html) -->
  <!-- The below content is automatically added from ./../apiExamples/optional-label.html -->
  <auro-select>
    <span slot="bib.fullscreen.headline">Bib Headline</span>
    <span slot="label">Please select a preference</span>
    <span slot="optionalLabel" style="color: grey; font-size: small"> - optional</span>
    <auro-menu>
      <auro-menuoption value="stops">Stops</auro-menuoption>
      <auro-menuoption value="price">Price</auro-menuoption>
      <auro-menuoption value="duration">Duration</auro-menuoption>
      <auro-menuoption value="departure">Departure</auro-menuoption>
      <auro-menuoption value="arrival">Arrival</auro-menuoption>
      <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
    </auro-menu>
  </auro-select>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/optional-label.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/optional-label.html -->

```html
<auro-select>
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <span slot="label">Please select a preference</span>
  <span slot="optionalLabel" style="color: grey; font-size: small"> - optional</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## CSS Shadow Part Examples

### Custom Bib Height

This example shows how to set a custom height for the bib from `<auro-dropdown>`.

Custom height dimensions are set by using the `dropdownSize` CSS Part and then applying a `max-height` rule and value.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/custom-bib-height.html) -->
  <!-- The below content is automatically added from ../apiExamples/custom-bib-height.html -->
  <auro-select id="customBibHeightExample" placeholder="Placeholder Text">
    <span slot="bib.fullscreen.headline">Bib Headline</span>
    <span slot="label">Label</span>
    <auro-menu>
      <auro-menuoption value="stops">Stops</auro-menuoption>
      <auro-menuoption value="price">Price</auro-menuoption>
      <auro-menuoption value="duration">Duration</auro-menuoption>
      <auro-menuoption value="departure">Departure</auro-menuoption>
      <auro-menuoption value="arrival">Arrival</auro-menuoption>
      <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
    </auro-menu>
  </auro-select>
  <style>
    #customBibHeightExample::part(dropdownSize) {
      max-height: 100px;
    }
  </style>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/custom-bib-height.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/custom-bib-height.html -->

```html
<auro-select id="customBibHeightExample" placeholder="Placeholder Text">
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <span slot="label">Label</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>
<style>
  #customBibHeightExample::part(dropdownSize) {
    max-height: 100px;
  }
</style>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Common Usage Patterns & Functional Examples

### Icons in Options

Displays an `<auro-select>` element with `<auro-icon>` elements in each option.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/with-icons.html) -->
  <!-- The below content is automatically added from ./../apiExamples/with-icons.html -->
  <auro-select placeholder="Placeholder Text">
    <span slot="bib.fullscreen.headline">Bib Headline</span>
    <span slot="label">Label</span>
    <auro-menu>
      <auro-menuoption value="air">
        <auro-icon label customColor category="health" name="air">Air</auro-icon>
      </auro-menuoption>
      <auro-menuoption value="covidtest">
        <auro-icon label customColor category="health" name="covid-test">Covid Test</auro-icon>
      </auro-menuoption>
      <auro-menuoption value="health">
        <auro-icon label customColor category="health" name="health">Health</auro-icon>
      </auro-menuoption>
      <auro-menuoption value="mask">
        <auro-icon label customColor category="health" name="mask">Mask</auro-icon>
      </auro-menuoption>
      <auro-menuoption value="spraybottle">
        <auro-icon label customColor category="health" name="spraybottle">Spray Bottle</auro-icon>
      </auro-menuoption>
    </auro-menu>
  </auro-select>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/with-icons.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/with-icons.html -->

```html
<auro-select placeholder="Placeholder Text">
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <span slot="label">Label</span>
  <auro-menu>
    <auro-menuoption value="air">
      <auro-icon label customColor category="health" name="air">Air</auro-icon>
    </auro-menuoption>
    <auro-menuoption value="covidtest">
      <auro-icon label customColor category="health" name="covid-test">Covid Test</auro-icon>
    </auro-menuoption>
    <auro-menuoption value="health">
      <auro-icon label customColor category="health" name="health">Health</auro-icon>
    </auro-menuoption>
    <auro-menuoption value="mask">
      <auro-icon label customColor category="health" name="mask">Mask</auro-icon>
    </auro-menuoption>
    <auro-menuoption value="spraybottle">
      <auro-icon label customColor category="health" name="spraybottle">Spray Bottle</auro-icon>
    </auro-menuoption>
  </auro-menu>
</auro-select>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Nested Submenus

This example shows nesting `<auro-menu>` elements to create submenus.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/with-submenus.html) -->
  <!-- The below content is automatically added from ./../apiExamples/with-submenus.html -->
  <auro-select placeholder="Placeholder Text">
    <span slot="bib.fullscreen.headline">Bib Headline</span>
    <span slot="label">Label</span>
    <auro-menu>
      <auro-menuoption value="stops">Stops</auro-menuoption>
      <auro-menuoption value="price">Price</auro-menuoption>
      <auro-menuoption value="duration">Duration</auro-menuoption>
      <hr>
      <auro-menu>
        <auro-menuoption value="apples">Apples</auro-menuoption>
        <auro-menuoption value="oranges">Oranges</auro-menuoption>
        <auro-menuoption value="pears">Pears</auro-menuoption>
        <auro-menuoption value="grapes">Grapes</auro-menuoption>
        <auro-menuoption value="kiwi">Kiwi</auro-menuoption>
        <hr>
        <auro-menu>
          <auro-menuoption value="person">Person</auro-menuoption>
          <auro-menuoption value="woman">Woman</auro-menuoption>
          <auro-menuoption value="man">Man</auro-menuoption>
          <auro-menuoption value="camera">Camera</auro-menuoption>
          <auro-menuoption value="tv">TV</auro-menuoption>
        </auro-menu>
      </auro-menu>
      <hr>
      <auro-menuoption value="departure">Departure</auro-menuoption>
      <auro-menuoption value="arrival">Arrival</auro-menuoption>
      <hr>
      <auro-menu>
        <auro-menuoption value="cars">Cars</auro-menuoption>
        <auro-menuoption value="trucks">Trucks</auro-menuoption>
        <auro-menuoption value="boats">Boats</auro-menuoption>
        <auro-menuoption value="planes">Planes</auro-menuoption>
        <auro-menuoption value="motorcycles">Motorcycles</auro-menuoption>
    </auro-menu>
  </auro-select>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/with-submenus.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/with-submenus.html -->

```html
<auro-select placeholder="Placeholder Text">
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <span slot="label">Label</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <hr>
    <auro-menu>
      <auro-menuoption value="apples">Apples</auro-menuoption>
      <auro-menuoption value="oranges">Oranges</auro-menuoption>
      <auro-menuoption value="pears">Pears</auro-menuoption>
      <auro-menuoption value="grapes">Grapes</auro-menuoption>
      <auro-menuoption value="kiwi">Kiwi</auro-menuoption>
      <hr>
      <auro-menu>
        <auro-menuoption value="person">Person</auro-menuoption>
        <auro-menuoption value="woman">Woman</auro-menuoption>
        <auro-menuoption value="man">Man</auro-menuoption>
        <auro-menuoption value="camera">Camera</auro-menuoption>
        <auro-menuoption value="tv">TV</auro-menuoption>
      </auro-menu>
    </auro-menu>
    <hr>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <hr>
    <auro-menu>
      <auro-menuoption value="cars">Cars</auro-menuoption>
      <auro-menuoption value="trucks">Trucks</auro-menuoption>
      <auro-menuoption value="boats">Boats</auro-menuoption>
      <auro-menuoption value="planes">Planes</auro-menuoption>
      <auro-menuoption value="motorcycles">Motorcycles</auro-menuoption>
  </auro-menu>
</auro-select>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Extract value

The following example illustrates how a user may query the `element.value` or `element.optionSelected` for the current value or complete option object that is selected.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/value-extraction.html) -->
  <!-- The below content is automatically added from ./../apiExamples/value-extraction.html -->
  <auro-select id="valueExtraction" placeholder="Placeholder Text">
    <span slot="bib.fullscreen.headline">Bib Headline</span>
    <span slot="label">Label</span>
    <auro-menu>
      <auro-menuoption value="stops">Stops</auro-menuoption>
      <auro-menuoption value="price">Price</auro-menuoption>
      <auro-menuoption value="duration">Duration</auro-menuoption>
      <auro-menuoption value="departure">Departure</auro-menuoption>
      <auro-menuoption value="arrival">Arrival</auro-menuoption>
      <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
    </auro-menu>
  </auro-select>
  <auro-button id="valueExtractionBtn">Get current value</auro-button>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/value-extraction.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/value-extraction.html -->

```html
<auro-select id="valueExtraction" placeholder="Placeholder Text">
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <span slot="label">Label</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>
<auro-button id="valueExtractionBtn">Get current value</auro-button>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/value-extraction.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/value-extraction.js -->

```js
export function valueExtractionExample() {
  const valueExtractionExample = document.querySelector('#valueExtraction');
  const valueExtractionBtn = document.querySelector('#valueExtractionBtn');

  valueExtractionBtn.addEventListener('click', () => {
    console.warn('Value selected:', valueExtractionExample.value);
    console.warn('Option selected:', valueExtractionExample.optionSelected);

    alert(`Value selected: ${valueExtractionExample.value}`);
  })
}
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Custom Validity with Error State

This example programmatically adds the `error` state when a user selects an option that is greater than `2`.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/custom-error-validity.html) -->
  <!-- The below content is automatically added from ./../apiExamples/custom-error-validity.html -->
  <auro-select id="primaryError" placeholder="Placeholder Text">
    <span slot="bib.fullscreen.headline">Bib Headline</span>
    <span slot="label">Label</span>
    <auro-menu>
      <auro-menuoption value="1">1</auro-menuoption>
      <auro-menuoption value="2">2</auro-menuoption>
      <auro-menuoption value="3">3</auro-menuoption>
      <auro-menuoption value="4">4</auro-menuoption>
      <auro-menuoption value="5">5</auro-menuoption>
      <auro-menuoption value="6">6</auro-menuoption>
    </auro-menu>
  </auro-select>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/custom-error-validity.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/custom-error-validity.html -->

```html
<auro-select id="primaryError" placeholder="Placeholder Text">
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <span slot="label">Label</span>
  <auro-menu>
    <auro-menuoption value="1">1</auro-menuoption>
    <auro-menuoption value="2">2</auro-menuoption>
    <auro-menuoption value="3">3</auro-menuoption>
    <auro-menuoption value="4">4</auro-menuoption>
    <auro-menuoption value="5">5</auro-menuoption>
    <auro-menuoption value="6">6</auro-menuoption>
  </auro-menu>
</auro-select>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/custom-error-validity.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/custom-error-validity.js -->

```js
export function customErrorValidityExample(elem) {
  const customErrorValidityExample = document.querySelector('#primaryError');

  customErrorValidityExample.addEventListener('auroSelect-valueSet', () => {
    if (+customErrorValidityExample.value > 2) {
      customErrorValidityExample.setAttribute('error', 'Quantity Exceeded');
    } else if (customErrorValidityExample.hasAttribute('error')) {
      customErrorValidityExample.removeAttribute('error');
    }
  })
};
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Max Height on Menu

Setting a max height on the menu will cause the bib to become scrollable when the content exceeds the max height.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/max-height.html) -->
  <!-- The below content is automatically added from ./../apiExamples/max-height.html -->
  <auro-select>
    <span slot="ariaLabel.bib.close">Close Popup</span>
    <span slot="bib.fullscreen.headline">Bib Headline</span>
    <span slot="label">Select Example</span>
    <auro-menu style="max-height: 150px;">
      <auro-menuoption value="stops">Stops</auro-menuoption>
      <auro-menuoption value="price">Price</auro-menuoption>
      <auro-menuoption value="duration">Duration</auro-menuoption>
      <auro-menuoption value="departure">Departure</auro-menuoption>
      <auro-menuoption value="arrival">Arrival</auro-menuoption>
      <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
    </auro-menu>
  </auro-select>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/max-height.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/max-height.html -->

```html
<auro-select>
  <span slot="ariaLabel.bib.close">Close Popup</span>
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <span slot="label">Select Example</span>
  <auro-menu style="max-height: 150px;">
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Select in Dialog

The component can be in a dialog.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/in-dialog.html) -->
  <!-- The below content is automatically added from ./../apiExamples/in-dialog.html -->
  <div>
    <auro-button id="select-dialog-opener">Select in Dialog</auro-button>
    <auro-dialog id="select-dialog">
      <span slot="header">Select in Dialog</span>
      <div slot="content">
        <auro-select id="valueExample" value="price">
          <span slot="bib.fullscreen.headline">Bib Headline</span>
          <span slot="label">Name</span>
          <auro-menu>
            <auro-menuoption id="option-0" value="stops">Stops</auro-menuoption>
            <auro-menuoption id="option-1" value="price">Price</auro-menuoption>
            <auro-menuoption id="option-2" value="duration">Duration</auro-menuoption>
            <auro-menuoption id="option-3" value="departure">Departure</auro-menuoption>
            <auro-menuoption id="option-4" value="arrival">Arrival</auro-menuoption>
            <auro-menuoption id="option-5" value="prefer alaska">Prefer Alaska</auro-menuoption>
          </auro-menu>
        </auro-select>
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
  <auro-button id="select-dialog-opener">Select in Dialog</auro-button>
  <auro-dialog id="select-dialog">
    <span slot="header">Select in Dialog</span>
    <div slot="content">
      <auro-select id="valueExample" value="price">
        <span slot="bib.fullscreen.headline">Bib Headline</span>
        <span slot="label">Name</span>
        <auro-menu>
          <auro-menuoption id="option-0" value="stops">Stops</auro-menuoption>
          <auro-menuoption id="option-1" value="price">Price</auro-menuoption>
          <auro-menuoption id="option-2" value="duration">Duration</auro-menuoption>
          <auro-menuoption id="option-3" value="departure">Departure</auro-menuoption>
          <auro-menuoption id="option-4" value="arrival">Arrival</auro-menuoption>
          <auro-menuoption id="option-5" value="prefer alaska">Prefer Alaska</auro-menuoption>
        </auro-menu>
      </auro-select>
    </div>
  </auro-dialog>
</div>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/in-dialog.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/in-dialog.js -->

```js
export function inDialogExample() {
  document.querySelector("#select-dialog-opener").addEventListener("click", () => {
    const dialog = document.querySelector("#select-dialog");
    dialog.open = true;
  });
};
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Watch for Value Changes

The following example listens for the `auroMenu-selectedOption` event. Once triggered, element.value or element.optionSelected may be queried for the new value or complete option object.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/value-alert.html) -->
  <!-- The below content is automatically added from ./../apiExamples/value-alert.html -->
  <auro-select id="valueAlert" placeholder="Placeholder Text">
    <span slot="bib.fullscreen.headline">Bib Headline</span>
    <span slot="label">Label</span>
    <auro-menu id="valueAlertMenu">
      <auro-menuoption value="stops">Stops</auro-menuoption>
      <auro-menuoption value="price">Price</auro-menuoption>
      <auro-menuoption value="duration">Duration</auro-menuoption>
      <auro-menuoption value="departure">Departure</auro-menuoption>
      <auro-menuoption value="arrival">Arrival</auro-menuoption>
      <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
    </auro-menu>
  </auro-select>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/value-alert.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/value-alert.html -->

```html
<auro-select id="valueAlert" placeholder="Placeholder Text">
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <span slot="label">Label</span>
  <auro-menu id="valueAlertMenu">
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
    <auro-menuoption value="departure">Departure</auro-menuoption>
    <auro-menuoption value="arrival">Arrival</auro-menuoption>
    <auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
  </auro-menu>
</auro-select>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/value-alert.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/value-alert.js -->

```js
export function valueAlertExample() {
  const select = document.querySelector('#valueAlert');
  const menu = document.querySelector('#valueAlertMenu');

  menu.addEventListener('auroMenu-selectedOption', () => {
    console.warn('Select value changed to:', select.value);
    console.warn('Select optionSelected changed to:', select.optionSelected);
  });
}
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Restyle Component with CSS Variables

The component may be restyled by changing the values of the following token(s).

<!-- Remove section if component does not have any component specific tokens -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../src/styles/tokens.scss) -->
<!-- The below code snippet is automatically added from ./../src/styles/tokens.scss -->

```scss
@use "@aurodesignsystem/design-tokens/dist/themes/alaska/SCSSVariables--alaska" as v;

:host(:not([ondark])),
:host(:not([appearance='inverse'])) {
  --ds-auro-select-border-color: var(--ds-basic-color-border-bold, #{v.$ds-basic-color-border-bold});
  --ds-auro-select-background-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-select-label-text-color: var(--ds-basic-color-texticon-muted, #{v.$ds-basic-color-texticon-muted});
  --ds-auro-select-placeholder-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-select-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-select-error-icon-color: var(--ds-basic-color-status-error, #{v.$ds-basic-color-status-error});
  --ds-auro-select-outline-color: transparent;
}

:host([ondark]),
:host([appearance='inverse']) {
  --ds-auro-select-border-color: var(--ds-basic-color-border-inverse, #{v.$ds-basic-color-border-inverse});
  --ds-auro-select-background-color: var(--ds-advanced-color-shared-background-inverse, #{v.$ds-advanced-color-shared-background-inverse});
  --ds-auro-select-label-text-color: var(--ds-basic-color-texticon-inverse-muted, #{v.$ds-basic-color-texticon-inverse-muted});
  --ds-auro-select-placeholder-text-color: var(--ds-basic-color-texticon-inverse, #{v.$ds-basic-color-texticon-inverse});
  --ds-auro-select-text-color: var(--ds-basic-color-texticon-inverse, #{v.$ds-basic-color-texticon-inverse});
  --ds-auro-select-error-icon-color: var(--ds-advanced-color-state-error-inverse, #{v.$ds-advanced-color-state-error-inverse});
  --ds-auro-select-outline-color: transparent;
}
```
<!-- AURO-GENERATED-CONTENT:END -->

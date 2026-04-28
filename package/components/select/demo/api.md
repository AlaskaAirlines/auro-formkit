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

| Method               | Type                                   | Description                                      |
|----------------------|----------------------------------------|--------------------------------------------------|
| [hideBib](#hideBib)            | `(): void`                             | Hides the dropdown bib if its open.              |
| [reset](#reset)              | `(): void`                             | Resets component to initial state.               |
| [setMenuValue](#setMenuValue)       | `(value: any): void`                   |                                                  |
| [showBib](#showBib)            | `(): void`                             | Shows the dropdown bib if there are options to show. |
| [updateActiveOption](#updateActiveOption) | `(index: number): void`                | Updates the active option in the menu.<br /><br />**index**: Index of the option to make active. |
| [validate](#validate)           | `(force?: boolean \| undefined): void` | Validates value.<br /><br />**force**: Whether to force validation. |

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

<pre class="language-html"><code class="language-html">&lt;auro-select&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close Popup&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
  &lt;span slot="label"&gt;Select Example&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="prefer alaska"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
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

<pre class="language-html"><code class="language-html">&lt;auro-select appearance="inverse"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
  &lt;span slot="label"&gt;Select Example&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="prefer alaska"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
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

<pre class="language-html"><code class="language-html">&lt;div class="autofill-example-form"&gt;
  &lt;div class="input-row"&gt;
    &lt;auro-input autocomplete="given-name"&gt;
      &lt;span slot="label"&gt;First Name&lt;/span&gt;
      &lt;span slot="bib.fullscreen.headline"&gt;First Name&lt;/span&gt;
    &lt;/auro-input&gt;
    &lt;auro-input autocomplete="family-name"&gt;
      &lt;span slot="label"&gt;Last Name&lt;/span&gt;
      &lt;span slot="bib.fullscreen.headline"&gt;Last Name&lt;/span&gt;
    &lt;/auro-input&gt;
  &lt;/div&gt;
  &lt;div class="input-row"&gt;
    &lt;auro-input autocomplete="address-line1"&gt;
      &lt;span slot="label"&gt;Street Address&lt;/span&gt;
      &lt;span slot="bib.fullscreen.headline"&gt;Street Address&lt;/span&gt;
    &lt;/auro-input&gt;
    &lt;auro-input autocomplete="address-level2"&gt;
      &lt;span slot="label"&gt;City&lt;/span&gt;
      &lt;span slot="bib.fullscreen.headline"&gt;City&lt;/span&gt;
    &lt;/auro-input&gt;
    &lt;auro-select autocomplete="address-level1"&gt;
      &lt;span slot="bib.fullscreen.headline"&gt;Select Your State&lt;/span&gt;
      &lt;span slot="label"&gt;Select Your State&lt;/span&gt;
      &lt;auro-menu&gt;
        &lt;auro-menuoption value="AL"&gt;Alabama&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="AK"&gt;Alaska&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="AZ"&gt;Arizona&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="AR"&gt;Arkansas&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="CA"&gt;California&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="CO"&gt;Colorado&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="CT"&gt;Connecticut&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="DE"&gt;Delaware&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="DC"&gt;District of Columbia&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="FL"&gt;Florida&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="GA"&gt;Georgia&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="HI"&gt;Hawaii&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="ID"&gt;Idaho&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="IL"&gt;Illinois&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="IN"&gt;Indiana&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="IA"&gt;Iowa&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="KS"&gt;Kansas&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="KY"&gt;Kentucky&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="LA"&gt;Louisiana&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="ME"&gt;Maine&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="MD"&gt;Maryland&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="MA"&gt;Massachusetts&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="MI"&gt;Michigan&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="MN"&gt;Minnesota&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="MS"&gt;Mississippi&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="MO"&gt;Missouri&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="MT"&gt;Montana&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="NE"&gt;Nebraska&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="NV"&gt;Nevada&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="NH"&gt;New Hampshire&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="NJ"&gt;New Jersey&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="NM"&gt;New Mexico&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="NY"&gt;New York&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="NC"&gt;North Carolina&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="ND"&gt;North Dakota&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="OH"&gt;Ohio&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="OK"&gt;Oklahoma&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="OR"&gt;Oregon&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="PA"&gt;Pennsylvania&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="RI"&gt;Rhode Island&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="SC"&gt;South Carolina&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="SD"&gt;South Dakota&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="TN"&gt;Tennessee&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="TX"&gt;Texas&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="UT"&gt;Utah&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="VT"&gt;Vermont&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="VA"&gt;Virginia&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="WA"&gt;Washington&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="WV"&gt;West Virginia&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="WI"&gt;Wisconsin&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="WY"&gt;Wyoming&lt;/auro-menuoption&gt;
      &lt;/auro-menu&gt;
    &lt;/auro-select&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
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

<pre class="language-html"><code class="language-html">&lt;auro-select disabled placeholder="Placeholder Text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="prefer alaska"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
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

<pre class="language-html"><code class="language-html">&lt;auro-select error="Custom error message" placeholder="Placeholder Text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="prefer alaska"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
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

<pre class="language-html"><code class="language-html">&lt;auro-select flexMenuWidth id="flexMenuWidthExample" placeholder="Placeholder Text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="united states"&gt;United States has a country code of (+1)&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="costa rica"&gt;Costa Rica has a country code of (+506)&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="mexico"&gt;Mexico has a country code of (+52)&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="afghanistan"&gt;Afghanistan has a country code of (+93)&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="albania"&gt;Albania has a country code of (+355)&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;
&lt;style&gt;
  #flexMenuWidthExample::part(dropdownTrigger) {
    width: 25%;
  }
&lt;/style&gt;</code></pre>
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

<pre class="language-html"><code class="language-html">&lt;auro-select fullscreenBreakpoint="lg"&gt;
  &lt;span slot="label"&gt;Select Example&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="prefer alaska"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
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

<pre class="language-html"><code class="language-html">&lt;auro-select fullscreenBreakpoint="disabled"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
  &lt;span slot="label"&gt;Select Example&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="prefer alaska"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
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

<pre class="language-html"><code class="language-html">&lt;auro-select&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close Popup&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
  &lt;span slot="label"&gt;Select Example&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="prefer alaska"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
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

<pre class="language-html"><code class="language-html">&lt;div style="display: flex; flex-direction: row; gap: 10px;"&gt;
  &lt;auro-select layout="emphasized" shape="pill" size="xl" value="flights" forceDisplayValue style="display:inline-block;"&gt;
    &lt;span slot="ariaLabel.bib.close"&gt;Close Popup&lt;/span&gt;
    &lt;span slot="label"&gt;Select Example&lt;/span&gt;
    &lt;auro-menu nocheckmark&gt;
      &lt;auro-menuoption value="flights"&gt;
        &lt;auro-icon category="terminal" name="plane-diag-stroke" customcolor&gt;&lt;/auro-icon&gt; Flights
        &lt;auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="terminal" name="plane-diag-fill" customcolor&gt;&lt;/auro-icon&gt;
      &lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="cars"&gt;
        &lt;auro-icon category="destination" name="car-rental-stroke" customcolor&gt;&lt;/auro-icon&gt; Cars
        &lt;auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="destination" name="car-rental-stroke" customcolor&gt;&lt;/auro-icon&gt;
      &lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="hotels"&gt;
        &lt;auro-icon category="destination" name="hotel-stroke" customcolor&gt;&lt;/auro-icon&gt; Hotels
        &lt;auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="destination" name="hotel-filled" customcolor&gt;&lt;/auro-icon&gt;
      &lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="packages"&gt;
        &lt;auro-icon category="shop" name="gift-stroke" customcolor&gt;&lt;/auro-icon&gt; Packages
        &lt;auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="shop" name="gift-filled" customcolor&gt;&lt;/auro-icon&gt;
      &lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="cruises"&gt;
        &lt;auro-icon category="in-flight" name="boarding" customcolor&gt;&lt;/auro-icon&gt; Cruises
        &lt;auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="in-flight" name="boarding" customcolor&gt;&lt;/auro-icon&gt;
      &lt;/auro-menuoption&gt;
    &lt;/auro-menu&gt;
  &lt;/auro-select&gt;
  &lt;auro-select layout="emphasized" shape="pill" size="xl" value="flights" style="display:inline-block;"&gt;
    &lt;span slot="label"&gt;Select Example&lt;/span&gt;
    &lt;auro-menu nocheckmark&gt;
      &lt;auro-menuoption value="flights"&gt;
        &lt;auro-icon category="terminal" name="plane-diag-stroke" customcolor&gt;&lt;/auro-icon&gt; Flights
        &lt;auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="terminal" name="plane-diag-fill" customcolor&gt;&lt;/auro-icon&gt;
      &lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="cars"&gt;
        &lt;auro-icon category="destination" name="car-rental-stroke" customcolor&gt;&lt;/auro-icon&gt; Cars
        &lt;auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="destination" name="car-rental-stroke" customcolor&gt;&lt;/auro-icon&gt;
      &lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="hotels"&gt;
        &lt;auro-icon category="destination" name="hotel-stroke" customcolor&gt;&lt;/auro-icon&gt; Hotels
        &lt;auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="destination" name="hotel-filled" customcolor&gt;&lt;/auro-icon&gt;
      &lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="packages"&gt;
        &lt;auro-icon category="shop" name="gift-stroke" customcolor&gt;&lt;/auro-icon&gt; Packages
        &lt;auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="shop" name="gift-filled" customcolor&gt;&lt;/auro-icon&gt;
      &lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="cruises"&gt;
        &lt;auro-icon category="in-flight" name="boarding" customcolor&gt;&lt;/auro-icon&gt; Cruises
        &lt;auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="in-flight" name="boarding" customcolor&gt;&lt;/auro-icon&gt;
      &lt;/auro-menuoption&gt;
    &lt;/auro-menu&gt;
  &lt;/auro-select&gt;
  &lt;auro-select layout="emphasized" shape="pill" size="xl" value="flights" required style="display:inline-block;"&gt;
    &lt;span slot="label"&gt;Select Example&lt;/span&gt;
    &lt;span slot="helpText"&gt;no displayValue in menuoptions&lt;/span&gt;
    &lt;auro-menu nocheckmark&gt;
      &lt;auro-menuoption value="flights"&gt;
        &lt;auro-icon category="terminal" name="plane-diag-stroke" customcolor&gt;&lt;/auro-icon&gt; Flights
      &lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="cars"&gt;
        &lt;auro-icon category="destination" name="car-rental-stroke" customcolor&gt;&lt;/auro-icon&gt; Cars
      &lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="hotels"&gt;
        &lt;auro-icon category="destination" name="hotel-stroke" customcolor&gt;&lt;/auro-icon&gt; Hotels
      &lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="packages"&gt;
        &lt;auro-icon category="shop" name="gift-stroke" customcolor&gt;&lt;/auro-icon&gt; Packages
      &lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="cruises"&gt;
        &lt;auro-icon category="in-flight" name="boarding" customcolor&gt;&lt;/auro-icon&gt; Cruises
      &lt;/auro-menuoption&gt;
    &lt;/auro-menu&gt;
  &lt;/auro-select&gt;
&lt;/div&gt;</code></pre>
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

<pre class="language-html"><code class="language-html">&lt;auro-select layout="snowflake" shape="snowflake" appearance="inverse" required style="width:300px;"&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close Popup&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help Text&lt;/span&gt;
  &lt;auro-menu nocheckmark&gt;
    &lt;auro-menuoption value="flights"&gt;
      &lt;auro-icon category="terminal" name="plane-diag-stroke" customColor&gt;&lt;/auro-icon&gt; Flights
    &lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="cars"&gt;
      &lt;auro-icon category="destination" name="car-rental-stroke" customColor&gt;&lt;/auro-icon&gt; Cars
    &lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="hotels"&gt;
      &lt;auro-icon category="destination" name="hotel-stroke" customColor&gt;&lt;/auro-icon&gt; Hotels
    &lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="packages"&gt;
      &lt;auro-icon category="shop" name="gift-stroke" customColor&gt;&lt;/auro-icon&gt; Packages
    &lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="cruises"&gt;
      &lt;auro-icon category="in-flight" name="boarding" customColor&gt;&lt;/auro-icon&gt; Cruises
    &lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
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

<pre class="language-html"><code class="language-html">&lt;auro-select multiselect&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
  &lt;label slot="placeholder"&gt;Select one or more options&lt;/label&gt;
  &lt;span slot="label"&gt;multiselect select example&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="1"&gt;Option 1&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="2"&gt;Option 2&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="3"&gt;Option 3&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
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

<pre class="language-html"><code class="language-html">&lt;auro-select nocheckmark placeholder="Placeholder Text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
    &lt;auro-menu&gt;
        &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="prefer alaska"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
    &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
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
<auro-select offset="20" noFlip placement="right">
<span slot="bib.fullscreen.headline">Bib Headline</span>
<span slot="label">Label</span>
<span slot="helpText">right bib with 20px offset and noFlip</span>
<auro-menu>
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
<auro-menuoption value="duration">Duration</auro-menuoption>
<auro-menuoption value="departure">Departure</auro-menuoption>
<auro-menuoption value="arrival">Arrival</auro-menuoption>
<auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
</auro-menu>
</auro-select>
<auro-select width="350px" offset="20" noFlip placement="bottom-start" shift>
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

<pre class="language-html"><code class="language-html">&lt;div style="width: 350px"&gt;
  &lt;auro-select offset="20" noFlip placement="bottom-end"&gt;
    &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
    &lt;span slot="label"&gt;Label&lt;/span&gt;
    &lt;span slot="helpText"&gt;bottom-end bib with 20px offset and noFlip&lt;/span&gt;
    &lt;auro-menu&gt;
      &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="prefer alaska"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
    &lt;/auro-menu&gt;
  &lt;/auro-select&gt;
  &lt;auro-select offset="20" placement="bottom-end"&gt;
    &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
    &lt;span slot="label"&gt;Label&lt;/span&gt;
    &lt;span slot="helpText"&gt;bottom-end bib with 20px offset and flip&lt;/span&gt;
    &lt;auro-menu&gt;
      &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="prefer alaska"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
    &lt;/auro-menu&gt;
  &lt;/auro-select&gt;
  &lt;auro-select offset="20" noFlip placement="right"&gt;
    &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
    &lt;span slot="label"&gt;Label&lt;/span&gt;
    &lt;span slot="helpText"&gt;right bib with 20px offset and noFlip&lt;/span&gt;
    &lt;auro-menu&gt;
      &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="prefer alaska"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
    &lt;/auro-menu&gt;
  &lt;/auro-select&gt;
  &lt;auro-select width="350px" offset="20" noFlip placement="bottom-start" shift&gt;
    &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
    &lt;span slot="label"&gt;Label&lt;/span&gt;
    &lt;span slot="helpText"&gt;bottom-start bib with 20px offset, noFlip and shift&lt;/span&gt;
    &lt;auro-menu&gt;
      &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="prefer alaska"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
    &lt;/auro-menu&gt;
  &lt;/auro-select&gt;
&lt;/div&gt;</code></pre>
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

<pre class="language-html"><code class="language-html">&lt;auro-select placeholder="Please select your preferred option"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="prefer alaska"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
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

<pre class="language-html"><code class="language-html">&lt;auro-select required setCustomValidityValueMissing="Custom required validation error message." placeholder="Placeholder Text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="prefer alaska"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
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

<pre class="language-html"><code class="language-html">&lt;auro-button id="validValueExampleBtn"&gt;Set Value to Valid Option&lt;/auro-button&gt;
&lt;auro-button id="invalidValueExampleBtn"&gt;Set Value to Invalid Option&lt;/auro-button&gt;
&lt;br/&gt;&lt;br/&gt;
&lt;auro-select id="valueExample" multiselect value='["price", "duration"]'&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
  &lt;span slot="label"&gt;Name&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption id="option-0" value="stops"&gt;Stops&lt;/auro-menuoption&gt;
    &lt;auro-menuoption id="option-1" value="price"&gt;Price&lt;/auro-menuoption&gt;
    &lt;auro-menuoption id="option-2" value="duration"&gt;Duration&lt;/auro-menuoption&gt;
    &lt;auro-menuoption id="option-3" value="departure"&gt;Departure&lt;/auro-menuoption&gt;
    &lt;auro-menuoption id="option-4" value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
    &lt;auro-menuoption id="option-5" value="prefer alaska"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/value.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/value.js -->

<pre class="language-js"><code class="language-js">export function valueExample() {
  const valueExample = document.querySelector('#valueExample');
​
  document.querySelector('#validValueExampleBtn').addEventListener('click', () =&gt; {
    valueExample.value = '["arrival", "prefer alaska"]';
  });
​
  document.querySelector('#invalidValueExampleBtn').addEventListener('click', () =&gt; {
    valueExample.value = '["flight course"]';
  });
}</code></pre>
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
<auro-select id="resetStateExample" value="price">
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
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/reset-state.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/reset-state.html -->

<pre class="language-html"><code class="language-html">&lt;auro-button id="resetStateBtn"&gt;Reset&lt;/auro-button&gt;
&lt;br/&gt;&lt;br/&gt;
&lt;auro-select id="resetStateExample" value="price"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="prefer alaska"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/reset-state.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/reset-state.js -->

<pre class="language-js"><code class="language-js">export function resetStateExample() {
  const elem = document.querySelector('#resetStateExample');
​
  document.querySelector('#resetStateBtn').addEventListener('click', () =&gt; {
    elem.reset();
  });
}</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Update Active Option

Use the `updateActiveOption(index)` method to programmatically set the active option in the menu.

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/update-active-option.html) -->
<!-- The below content is automatically added from ./../apiExamples/update-active-option.html -->
<auro-select id="updateActiveOptionExample">
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
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/update-active-option.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/update-active-option.html -->

<pre class="language-html"><code class="language-html">&lt;auro-select id="updateActiveOptionExample"&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close Popup&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
  &lt;span slot="label"&gt;Select Example&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="prefer alaska"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/update-active-option.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/update-active-option.js -->

<pre class="language-js"><code class="language-js">export function updateActiveOptionExample() {
  const select = document.getElementById('updateActiveOptionExample');
  const dropdown = select.dropdown;
​
  dropdown.addEventListener('auroDropdown-toggled', () =&gt; {
    if (dropdown.isPopoverVisible) {
      select.updateActiveOption(2); // Set the active option to the third item (index 2)
    }
  });
}</code></pre>
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

<pre class="language-html"><code class="language-html">&lt;auro-select layout="emphasized" shape="pill" size="xl" value="flights" forceDisplayValue style="display:inline-block;"&gt;
  &lt;span slot="label"&gt;Select Example&lt;/span&gt;
  &lt;auro-menu nocheckmark&gt;
    &lt;auro-menuoption value="flights"&gt;
      &lt;auro-icon category="terminal" name="plane-diag-stroke" customcolor&gt;&lt;/auro-icon&gt; Flights
      &lt;auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="terminal" name="plane-diag-fill" customcolor&gt;&lt;/auro-icon&gt;
    &lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="cars"&gt;
      &lt;auro-icon category="destination" name="car-rental-stroke" customcolor&gt;&lt;/auro-icon&gt; Cars
      &lt;auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="destination" name="car-rental-stroke" customcolor&gt;&lt;/auro-icon&gt;
    &lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="hotels"&gt;
      &lt;auro-icon category="destination" name="hotel-stroke" customcolor&gt;&lt;/auro-icon&gt; Hotels
      &lt;auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="destination" name="hotel-filled" customcolor&gt;&lt;/auro-icon&gt;
    &lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="packages"&gt;
      &lt;auro-icon category="shop" name="gift-stroke" customcolor&gt;&lt;/auro-icon&gt; Packages
      &lt;auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="shop" name="gift-filled" customcolor&gt;&lt;/auro-icon&gt;
    &lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="cruises"&gt;
      &lt;auro-icon category="in-flight" name="boarding" customcolor&gt;&lt;/auro-icon&gt; Cruises
      &lt;auro-icon style="--ds-auro-icon-size: 40px;" slot="displayValue" category="in-flight" name="boarding" customcolor&gt;&lt;/auro-icon&gt;
    &lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
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

<pre class="language-html"><code class="language-html">&lt;auro-select placeholder="Placeholder Text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
  &lt;span slot="helpText"&gt;Custom help text message.&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="prefer alaska"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
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

<pre class="language-html"><code class="language-html">&lt;auro-select&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
  &lt;span slot="label"&gt;Please select a preference&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="prefer alaska"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
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

<pre class="language-html"><code class="language-html">&lt;auro-select&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
  &lt;span slot="label"&gt;Please select a preference&lt;/span&gt;
  &lt;span slot="optionalLabel" style="color: grey; font-size: small"&gt; - optional&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="prefer alaska"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## CSS Shadow Part Examples

### Custom Bib Height

This example shows how to set a custom height for the bib from `<auro-dropdown>`.

Custom height dimensions are set by using the `dropdownSize` CSS Part and then applying a `max-height` rule and value.

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/custom-bib-height.html) -->
<!-- The below content is automatically added from ../apiExamples/custom-bib-height.html -->
<auro-select id="customBibHeightExample" value="pit">
<span slot="bib.fullscreen.headline">Bib Headline</span>
<span slot="label">Label</span>
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
</auro-select>
<style>
#customBibHeightExample::part(dropdownSize) {
max-height: 150px;
}
</style>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/custom-bib-height.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/custom-bib-height.html -->

<pre class="language-html"><code class="language-html">&lt;auro-select id="customBibHeightExample" value="pit"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="fca" id="airport-fca" suggest="fca montana kalispell"&gt;glacier park international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="sfo" id="airport-sfo" suggest="sfo california san francisco"&gt;san francisco international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="boi" id="airport-boi" suggest="boi idaho boise"&gt;gowen field&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="stl" id="airport-stl" suggest="stl missouri st louis"&gt;lambert st louis international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="ylw" id="airport-ylw" suggest="ylw british columbia kelowna"&gt;kelowna international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="ykm" id="airport-ykm" suggest="ykm washington yakima"&gt;yakima air terminal&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="puw" id="airport-puw" suggest="puw washington pullman"&gt;pullman moscow regional&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="yeg" id="airport-yeg" suggest="yeg alberta edmonton"&gt;edmonton international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="tpa" id="airport-tpa" suggest="tpa florida tampa"&gt;tampa international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="msp" id="airport-msp" suggest="msp minnesota minneapolis"&gt;minneapolis st paul international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="ida" id="airport-ida" suggest="ida idaho idaho falls"&gt;idaho falls regional airport&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="mfr" id="airport-mfr" suggest="mfr oregon medford"&gt;rogue valley international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="psp" id="airport-psp" suggest="psp california palm springs"&gt;palm springs international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="lir" id="airport-lir" suggest="lir guanacaste liberia"&gt;guanacaste airport&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="oak" id="airport-oak" suggest="oak california oakland"&gt;oakland international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="bos" id="airport-bos" suggest="bos massachusetts boston"&gt;logan international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="bwi" id="airport-bwi" suggest="bwi maryland baltimore"&gt;thurgood marshall international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="dal" id="airport-dal" suggest="dal texas dallas"&gt;dallas love field&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="sba" id="airport-sba" suggest="sba california santa barbara"&gt;santa barbara municipal&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="mci" id="airport-mci" suggest="mci missouri kansas city"&gt;kansas city international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="koa" id="airport-koa" suggest="koa hawaii kona"&gt;kona international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="pvr" id="airport-pvr" suggest="pvr jalisco puerto vallarta"&gt;licenciado gustavo diaz ordaz international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="wrg" id="airport-wrg" suggest="wrg alaska wrangell"&gt;wrangell&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="scc" id="airport-scc" suggest="scc alaska prudhoe bay"&gt;deadhorse&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="lto" id="airport-lto" suggest="lto baja california loreto"&gt;loreto international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="ome" id="airport-ome" suggest="ome alaska nome"&gt;nome&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="ict" id="airport-ict" suggest="ict kansas wichita"&gt;dwight d eisenhower national&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="phl" id="airport-phl" suggest="phl pennsylvania philadelphia"&gt;philadelphia international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="dfw" id="airport-dfw" suggest="dfw texas dallas"&gt;dallas fort worth international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="ind" id="airport-ind" suggest="ind indiana indianapolis"&gt;indianapolis international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="smf" id="airport-smf" suggest="smf california sacramento"&gt;sacramento international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="sit" id="airport-sit" suggest="sit alaska sitka"&gt;rocky gutierrez&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="dut" id="airport-dut" suggest="dut alaska dutch harbor"&gt;unalaska&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="cdv" id="airport-cdv" suggest="cdv alaska cordova"&gt;merle mudhole smith&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="psg" id="airport-psg" suggest="psg alaska petersburg"&gt;james a johnson&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="bna" id="airport-bna" suggest="bna tennessee nashville"&gt;nashville international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="geg" id="airport-geg" suggest="geg washington spokane"&gt;spokane international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="ktn" id="airport-ktn" suggest="ktn alaska ketchikan"&gt;ketchikan international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="pit" id="airport-pit" suggest="pit pennsylvania pittsburgh"&gt;pittsburgh international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="sbp" id="airport-sbp" suggest="sbp california san luis obispo"&gt;san luis obispo regional&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="bur" id="airport-bur" suggest="bur california burbank"&gt;hollywood burbank&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="msy" id="airport-msy" suggest="msy louisiana new orleans"&gt;louis armstrong international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="pae" id="airport-pae" suggest="pae washington everett"&gt;paine field&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="cvg" id="airport-cvg" suggest="cvg ohio cincinnati"&gt;cincinnati northern kentucky international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="yak" id="airport-yak" suggest="yak alaska yakutat"&gt;yakutat&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="pdx" id="airport-pdx" suggest="pdx oregon portland"&gt;portland international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="anc" id="airport-anc" suggest="anc alaska anchorage"&gt;ted stevens&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="sea" id="airport-sea" suggest="sea washington seattle"&gt;seattle tacoma international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="san" id="airport-san" suggest="san california san diego"&gt;san diego international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="sat" id="airport-sat" suggest="sat texas san antonio"&gt;san antonio international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="fat" id="airport-fat" suggest="fat california fresno"&gt;fresno yosemite international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="aus" id="airport-aus" suggest="aus texas austin"&gt;austin bergstrom international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="ord" id="airport-ord" suggest="ord illinois chicago"&gt;ohare international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="gdl" id="airport-gdl" suggest="gdl jalisco guadalajara"&gt;guadalajara international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="sjc" id="airport-sjc" suggest="sjc california san jose"&gt;san jose international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="jnu" id="airport-jnu" suggest="jnu alaska juneau"&gt;juneau international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="rdm" id="airport-rdm" suggest="rdm oregon redmond"&gt;roberts field&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="sts" id="airport-sts" suggest="sts california sonoma"&gt;charles m schulz&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="fai" id="airport-fai" suggest="fai alaska fairbanks"&gt;fairbanks international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="rdu" id="airport-rdu" suggest="rdu north carolina raleigh"&gt;raleigh durham international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="oma" id="airport-oma" suggest="oma nebraska omaha"&gt;eppley airfield&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="bzn" id="airport-bzn" suggest="bzn montana bozeman"&gt;bozeman yellowstone international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="ont" id="airport-ont" suggest="ont california ontario"&gt;ontario international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="ogg" id="airport-ogg" suggest="ogg hawaii maui"&gt;kahului international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="sun" id="airport-sun" suggest="sun idaho sun valley"&gt;friedman memorial&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="mzt" id="airport-mzt" suggest="mzt sinaloa mazatlan"&gt;general rafael buelna international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="dlg" id="airport-dlg" suggest="dlg alaska dillingham"&gt;dillingham&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="adq" id="airport-adq" suggest="adq alaska kodiak"&gt;kodiak&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="den" id="airport-den" suggest="den colorado denver"&gt;denver international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="zlo" id="airport-zlo" suggest="zlo colima manzanillo"&gt;manzanillo international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="sjd" id="airport-sjd" suggest="sjd baja california los cabos"&gt;los cabos international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="elp" id="airport-elp" suggest="elp texas el paso"&gt;el paso international airport&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="atl" id="airport-atl" suggest="atl georgia atlanta"&gt;hartsfield jackson international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="lax" id="airport-lax" suggest="lax california los angeles"&gt;los angeles international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="rsw" id="airport-rsw" suggest="rsw florida fort myers"&gt;southwest florida international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="cle" id="airport-cle" suggest="cle ohio cleveland"&gt;cleveland hopkins international airport&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="otz" id="airport-otz" suggest="otz alaska kotzebue"&gt;ralph wien memorial&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="bze" id="airport-bze" suggest="bze belize belize city"&gt;philip sw goldson international airport&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="eat" id="airport-eat" suggest="eat washington wenatchee"&gt;pangborn memorial&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="dtw" id="airport-dtw" suggest="dtw michigan detroit"&gt;detroit metropolitan&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="bet" id="airport-bet" suggest="bet alaska bethel"&gt;bethel&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="dca" id="airport-dca" suggest="dca district of columbia washington"&gt;ronald reagan national&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="rno" id="airport-rno" suggest="rno nevada reno"&gt;reno tahoe international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="brw" id="airport-brw" suggest="brw alaska barrow"&gt;wiley post will rogers&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="mry" id="airport-mry" suggest="mry california monterey"&gt;monterey regional&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="hnl" id="airport-hnl" suggest="hnl hawaii oahu"&gt;honolulu international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="okc" id="airport-okc" suggest="okc oklahoma oklahoma city"&gt;will rogers world&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="iad" id="airport-iad" suggest="iad virginia dulles"&gt;washington dulles international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="mia" id="airport-mia" suggest="mia florida miami"&gt;miami international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="bli" id="airport-bli" suggest="bli washington bellingham"&gt;bellingham international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="hln" id="airport-hln" suggest="hln montana helena"&gt;helena regional&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="gtf" id="airport-gtf" suggest="gtf montana great falls"&gt;great falls international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="zih" id="airport-zih" suggest="zih guerrero zihuatanejo"&gt;ixtapa zihuatanejo international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="yyc" id="airport-yyc" suggest="yyc alberta calgary"&gt;calgary international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="sna" id="airport-sna" suggest="sna california santa ana"&gt;john wayne&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="fll" id="airport-fll" suggest="fll florida fort lauderdale"&gt;fort lauderdale hollywood international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="ewr" id="airport-ewr" suggest="ewr new jersey newark"&gt;newark liberty international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="hdn" id="airport-hdn" suggest="hdn colorado steamboat springs"&gt;yampa valley regional&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="psc" id="airport-psc" suggest="psc washington pasco"&gt;tri cities&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="tus" id="airport-tus" suggest="tus arizona tucson"&gt;tucson international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="abq" id="airport-abq" suggest="abq new mexico albuquerque"&gt;albuquerque international sunport&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="jfk" id="airport-jfk" suggest="jfk new york new york"&gt;john f kennedy international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="yvr" id="airport-yvr" suggest="yvr british columbia vancouver"&gt;vancouver international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="sjo" id="airport-sjo" suggest="sjo san jose alajuela province"&gt;juan santamaria international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="las" id="airport-las" suggest="las nevada las vegas"&gt;harry reid international airport&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="lih" id="airport-lih" suggest="lih hawaii kauai"&gt;lihue international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="mso" id="airport-mso" suggest="mso montana missoula"&gt;missoula international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="alw" id="airport-alw" suggest="alw washington walla walla"&gt;walla walla regional&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="mke" id="airport-mke" suggest="mke wisconsin milwaukee"&gt;milwaukee mitchell international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="eug" id="airport-eug" suggest="eug oregon eugene"&gt;mahlon sweet field&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="akn" id="airport-akn" suggest="akn alaska king salmon"&gt;king salmon&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="cun" id="airport-cun" suggest="cun quintana roo cancun"&gt;cancun international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="rdd" id="airport-rdd" suggest="rdd california redding"&gt;redding municipal airport&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="mco" id="airport-mco" suggest="mco florida orlando"&gt;orlando international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="slc" id="airport-slc" suggest="slc utah salt lake city"&gt;salt lake city international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="phx" id="airport-phx" suggest="phx arizona phoenix"&gt;sky harbor international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="bil" id="airport-bil" suggest="bil montana billings"&gt;billings logan international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="gst" id="airport-gst" suggest="gst alaska gustavus"&gt;gustavus&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="adk" id="airport-adk" suggest="adk alaska adak"&gt;adak&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="cvg" id="airport-cvg" suggest="cvg kentucky hebron"&gt;cincinnati northern kentucky international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="jac" id="airport-jac" suggest="jac wyoming jackson"&gt;jackson hole airport&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="cmh" id="airport-cmh" suggest="cmh ohio columbus"&gt;john glenn columbus international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="yyj" id="airport-yyj" suggest="yyj british columbia victoria"&gt;victoria international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="chs" id="airport-chs" suggest="chs south carolina charleston"&gt;charleston international&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="iah" id="airport-iah" suggest="iah texas houston"&gt;george bush intercontinental&lt;/auro-menuoption&gt;
    &lt;auro-menuoption static nomatch&gt;Unknown airport... &lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;
&lt;style&gt;
  #customBibHeightExample::part(dropdownSize) {
    max-height: 150px;
  }
&lt;/style&gt;</code></pre>
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

<pre class="language-html"><code class="language-html">&lt;auro-select placeholder="Placeholder Text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="air"&gt;
      &lt;auro-icon label customColor category="health" name="air"&gt;Air&lt;/auro-icon&gt;
    &lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="covidtest"&gt;
      &lt;auro-icon label customColor category="health" name="covid-test"&gt;Covid Test&lt;/auro-icon&gt;
    &lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="health"&gt;
      &lt;auro-icon label customColor category="health" name="health"&gt;Health&lt;/auro-icon&gt;
    &lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="mask"&gt;
      &lt;auro-icon label customColor category="health" name="mask"&gt;Mask&lt;/auro-icon&gt;
    &lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="spraybottle"&gt;
      &lt;auro-icon label customColor category="health" name="spraybottle"&gt;Spray Bottle&lt;/auro-icon&gt;
    &lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
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

<pre class="language-html"><code class="language-html">&lt;auro-select placeholder="Placeholder Text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
    &lt;hr&gt;
    &lt;auro-menu&gt;
      &lt;auro-menuoption value="apples"&gt;Apples&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="oranges"&gt;Oranges&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="pears"&gt;Pears&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="grapes"&gt;Grapes&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="kiwi"&gt;Kiwi&lt;/auro-menuoption&gt;
      &lt;hr&gt;
      &lt;auro-menu&gt;
        &lt;auro-menuoption value="person"&gt;Person&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="woman"&gt;Woman&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="man"&gt;Man&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="camera"&gt;Camera&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="tv"&gt;TV&lt;/auro-menuoption&gt;
      &lt;/auro-menu&gt;
    &lt;/auro-menu&gt;
    &lt;hr&gt;
    &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
    &lt;hr&gt;
    &lt;auro-menu&gt;
      &lt;auro-menuoption value="cars"&gt;Cars&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="trucks"&gt;Trucks&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="boats"&gt;Boats&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="planes"&gt;Planes&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="motorcycles"&gt;Motorcycles&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
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

<pre class="language-html"><code class="language-html">&lt;auro-select id="valueExtraction" placeholder="Placeholder Text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="prefer alaska"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;
&lt;auro-button id="valueExtractionBtn"&gt;Get current value&lt;/auro-button&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/value-extraction.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/value-extraction.js -->

<pre class="language-js"><code class="language-js">export function valueExtractionExample() {
  const valueExtractionExample = document.querySelector('#valueExtraction');
  const valueExtractionBtn = document.querySelector('#valueExtractionBtn');
​
  valueExtractionBtn.addEventListener('click', () =&gt; {
    console.warn('Value selected:', valueExtractionExample.value);
    console.warn('Option selected:', valueExtractionExample.optionSelected);
​
    alert(`Value selected: ${valueExtractionExample.value}`);
  })
}</code></pre>
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

<pre class="language-html"><code class="language-html">&lt;auro-select id="primaryError" placeholder="Placeholder Text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="1"&gt;1&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="2"&gt;2&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="3"&gt;3&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="4"&gt;4&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="5"&gt;5&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="6"&gt;6&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/custom-error-validity.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/custom-error-validity.js -->

<pre class="language-js"><code class="language-js">export function customErrorValidityExample(elem) {
  const customErrorValidityExample = document.querySelector('#primaryError');
​
  customErrorValidityExample.addEventListener('auroSelect-valueSet', () =&gt; {
    if (+customErrorValidityExample.value &gt; 2) {
      customErrorValidityExample.setAttribute('error', 'Quantity Exceeded');
    } else if (customErrorValidityExample.hasAttribute('error')) {
      customErrorValidityExample.removeAttribute('error');
    }
  })
};</code></pre>
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

<pre class="language-html"><code class="language-html">&lt;div&gt;
  &lt;auro-button id="select-dialog-opener"&gt;Select in Dialog&lt;/auro-button&gt;
  &lt;auro-dialog id="select-dialog"&gt;
    &lt;span slot="header"&gt;Select in Dialog&lt;/span&gt;
    &lt;div slot="content"&gt;
      &lt;auro-select id="valueExample" value="price"&gt;
        &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
        &lt;span slot="label"&gt;Name&lt;/span&gt;
        &lt;auro-menu&gt;
          &lt;auro-menuoption id="option-0" value="stops"&gt;Stops&lt;/auro-menuoption&gt;
          &lt;auro-menuoption id="option-1" value="price"&gt;Price&lt;/auro-menuoption&gt;
          &lt;auro-menuoption id="option-2" value="duration"&gt;Duration&lt;/auro-menuoption&gt;
          &lt;auro-menuoption id="option-3" value="departure"&gt;Departure&lt;/auro-menuoption&gt;
          &lt;auro-menuoption id="option-4" value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
          &lt;auro-menuoption id="option-5" value="prefer alaska"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
        &lt;/auro-menu&gt;
      &lt;/auro-select&gt;
    &lt;/div&gt;
  &lt;/auro-dialog&gt;
&lt;/div&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/in-dialog.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/in-dialog.js -->

<pre class="language-js"><code class="language-js">export function inDialogExample() {
  document.querySelector("#select-dialog-opener").addEventListener("click", () =&gt; {
    const dialog = document.querySelector("#select-dialog");
    dialog.open = true;
  });
};</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Select in Drawer

The component can be in a drawer.

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/in-drawer.html) -->
<!-- The below content is automatically added from ./../apiExamples/in-drawer.html -->
<div>
<auro-button id="select-drawer-opener">Select in drawer</auro-button>
<auro-drawer id="select-drawer">
<span slot="header">Select in drawer</span>
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
</auro-drawer>
</div>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/in-drawer.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/in-drawer.html -->

<pre class="language-html"><code class="language-html">&lt;div&gt;
  &lt;auro-button id="select-drawer-opener"&gt;Select in drawer&lt;/auro-button&gt;
  &lt;auro-drawer id="select-drawer"&gt;
    &lt;span slot="header"&gt;Select in drawer&lt;/span&gt;
    &lt;div slot="content"&gt;
      &lt;auro-select id="valueExample" value="price"&gt;
        &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
        &lt;span slot="label"&gt;Name&lt;/span&gt;
        &lt;auro-menu&gt;
          &lt;auro-menuoption id="option-0" value="stops"&gt;Stops&lt;/auro-menuoption&gt;
          &lt;auro-menuoption id="option-1" value="price"&gt;Price&lt;/auro-menuoption&gt;
          &lt;auro-menuoption id="option-2" value="duration"&gt;Duration&lt;/auro-menuoption&gt;
          &lt;auro-menuoption id="option-3" value="departure"&gt;Departure&lt;/auro-menuoption&gt;
          &lt;auro-menuoption id="option-4" value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
          &lt;auro-menuoption id="option-5" value="prefer alaska"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
        &lt;/auro-menu&gt;
      &lt;/auro-select&gt;
    &lt;/div&gt;
  &lt;/auro-drawer&gt;
&lt;/div&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/in-drawer.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/in-drawer.js -->

<pre class="language-js"><code class="language-js">export function inDrawerExample() {
  document.querySelector("#select-drawer-opener").addEventListener("click", () =&gt; {
    const drawer = document.querySelector("#select-drawer");
​
    if (drawer.hasAttribute('open')) {
      drawer.removeAttribute('open');
    } else {
      drawer.setAttribute('open', true);
    }
  });
};</code></pre>
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

<pre class="language-html"><code class="language-html">&lt;auro-select id="valueAlert" placeholder="Placeholder Text"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Headline&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
  &lt;auro-menu id="valueAlertMenu"&gt;
    &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="prefer alaska"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/value-alert.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/value-alert.js -->

<pre class="language-js"><code class="language-js">export function valueAlertExample() {
  const select = document.querySelector('#valueAlert');
  const menu = document.querySelector('#valueAlertMenu');
​
  menu.addEventListener('auroMenu-selectedOption', () =&gt; {
    console.warn('Select value changed to:', select.value);
    console.warn('Select optionSelected changed to:', select.optionSelected);
  });
}</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Restyle Component with CSS Variables

The component may be restyled by changing the values of the following token(s).

<!-- Remove section if component does not have any component specific tokens -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../src/styles/tokens.scss) -->
<!-- The below code snippet is automatically added from ./../src/styles/tokens.scss -->

<pre class="language-scss"><code class="language-scss">@use "@aurodesignsystem/design-tokens/dist/themes/alaska/SCSSVariables--alaska" as v;
​
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
​
:host([ondark]),
:host([appearance='inverse']) {
  --ds-auro-select-border-color: var(--ds-basic-color-border-inverse, #{v.$ds-basic-color-border-inverse});
  --ds-auro-select-background-color: var(--ds-advanced-color-shared-background-inverse, #{v.$ds-advanced-color-shared-background-inverse});
  --ds-auro-select-label-text-color: var(--ds-basic-color-texticon-inverse-muted, #{v.$ds-basic-color-texticon-inverse-muted});
  --ds-auro-select-placeholder-text-color: var(--ds-basic-color-texticon-inverse, #{v.$ds-basic-color-texticon-inverse});
  --ds-auro-select-text-color: var(--ds-basic-color-texticon-inverse, #{v.$ds-basic-color-texticon-inverse});
  --ds-auro-select-error-icon-color: var(--ds-advanced-color-state-error-inverse, #{v.$ds-advanced-color-state-error-inverse});
  --ds-auro-select-outline-color: transparent;
}</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->

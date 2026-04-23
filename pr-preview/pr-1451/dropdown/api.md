<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/api.md) -->
<!-- The below content is automatically added from ./../docs/api.md -->

# auro-dropdown

The `auro-dropdown` element provides a way to place content in a bib that can be toggled.

## Properties

| Property                  | Attribute                 | Type                                             | Default          | Description                                      |
|---------------------------|---------------------------|--------------------------------------------------|------------------|--------------------------------------------------|
| `a11yRole`                |                           | `string`                                         |                  | The value for the role attribute of the trigger element. |
| [appearance](#appearance)              | `appearance`              | `'default' \| 'inverse'`                         | "'default'"      | Defines whether the component will be on lighter or darker backgrounds. |
| [autoPlacement](#autoPlacement)           | `autoPlacement`           | `boolean`                                        |                  | If declared, bib's position will be automatically calculated where to appear. |
| [chevron](#chevron)                 | `chevron`                 | `boolean`                                        |                  | If declared, the dropdown displays a chevron on the right. |
| [disableEventShow](#disableEventShow)        | `disableEventShow`        | `boolean`                                        |                  | If declared, the dropdown will only show by calling the API .show() public method. |
| [disableKeyboardHandling](#disableKeyboardHandling) | `disableKeyboardHandling` | `boolean`                                        |                  | If declared, the dropdown will not handle keyboard events and will require the consumer to manage this behavior. |
| [disabled](#disabled)                | `disabled`                | `boolean`                                        |                  | If declared, the dropdown is not interactive.    |
| [error](#error)                   | `error`                   | `boolean`                                        |                  | If declared, will apply error UI to the dropdown. |
| [errorMessage](#errorMessage)            | `errorMessage`            | `string`                                         | "undefined"      | Contains the help text message for the current validity error. |
| [focusShow](#focusShow)               | `focusShow`               | `boolean`                                        |                  | If declared, the bib will display when focus is applied to the trigger. |
| [fullscreenBreakpoint](#fullscreenBreakpoint)    | `fullscreenBreakpoint`    | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'disabled'` | "'sm'"           | Defines the screen size breakpoint at which the dropdown switches to fullscreen mode on mobile. `disabled` indicates a dropdown should _never_ enter fullscreen.<br /><br />When expanded, the dropdown will automatically display in fullscreen mode<br />if the screen size is equal to or smaller than the selected breakpoint. |
| [hoverToggle](#hoverToggle)             | `hoverToggle`             | `boolean`                                        |                  | If declared, the trigger will toggle the dropdown on mouseover/mouseout. |
| [isBibFullscreen](#isBibFullscreen)         | `isBibFullscreen`         | `boolean`                                        | false            | If true, the dropdown bib is taking the fullscreen when it's open. |
| [isPopoverVisible](#isPopoverVisible)        | `open`                    | `boolean`                                        | false            | If true, the dropdown bib is displayed.          |
| [layout](#layout)                  | `layout`                  | `'classic' \| 'emphasized' \| 'snowflake'`       | "'classic'"      | Sets the layout of the dropdown.                 |
| [matchWidth](#matchWidth)              | `matchWidth`              | `boolean`                                        | false            | If declared, the popover and trigger will be set to the same width. |
| [noFlip](#noFlip)                  | `noFlip`                  | `boolean`                                        |                  | If declared, the bib will NOT flip to an alternate position<br />when there isn't enough space in the specified `placement`. |
| [noHideOnThisFocusLoss](#noHideOnThisFocusLoss)   | `noHideOnThisFocusLoss`   | `boolean`                                        | false            | If declared, the dropdown will not hide when moving focus outside the element. |
| [noToggle](#noToggle)                | `noToggle`                | `boolean`                                        |                  | If declared, the trigger will only show the dropdown bib. |
| [offset](#offset)                  | `offset`                  | `number`                                         | "0"              | Gap between the trigger element and bib.         |
| [onDark](#onDark)                  | `onDark`                  | `boolean`                                        |                  | DEPRECATED - use `appearance="inverse"` instead. |
| [onSlotChange](#onSlotChange)            | `onSlotChange`            |                                                  |                  | If declared, and a function is set, that function will execute when the slot content is updated. |
| [placement](#placement)               | `placement`               | `'top' \| 'right' \| 'bottom' \| 'left' \| 'bottom-start' \| 'top-start' \| 'top-end' \| 'right-start' \| 'right-end' \| 'bottom-end' \| 'left-start' \| 'left-end'` | "'bottom-start'" | Position where the bib should appear relative to the trigger. |
| [shape](#shape)                   |                           |                                                  | "undefined"      |                                                  |
| [shift](#shift)                   | `shift`                   | `boolean`                                        |                  | If declared, the dropdown will shift its position to avoid being cut off by the viewport. |
| [simple](#simple)                  | `simple`                  | `boolean`                                        |                  | If declared, applies a border around the trigger slot. |
| [size](#size)                    |                           |                                                  | "undefined"      |                                                  |

## Methods

| Method           | Type       | Description                                      |
|------------------|------------|--------------------------------------------------|
| [exposeCssParts](#exposeCssParts) | `(): void` | Exposes CSS parts for styling from parent components. |
| [focus](#focus)          | `(): void` | When bib is open, focus on the first element inside of bib.<br />If not, trigger element will get focus. |
| [hide](#hide)           | `(): void` | Public method to hide the dropdown.              |
| [show](#show)           | `(): void` | Public method to show the dropdown.              |

## Events

| Event                       | Type                                 | Description                                      |
|-----------------------------|--------------------------------------|--------------------------------------------------|
| `auroDropdown-idAdded`      | `Object<key  : 'id', value: string>` | Notifies consumers that the unique ID for the dropdown bib has been generated. |
| `auroDropdown-toggled`      |                                      | Notifies that the visibility of the dropdown bib has changed. |
| `auroDropdown-triggerClick` | `CustomEvent<any>`                   | Notifies that the trigger has been clicked.      |

## Slots

| Name       | Description                                |
|------------|--------------------------------------------|
|            | Default slot for the dropdown bib content. |
| [helpText](#helpText) | Defines the content of the helpText.       |
| [trigger](#trigger)  | Defines the content of the trigger.        |

## CSS Shadow Parts

| Part       | Description                                      |
|------------|--------------------------------------------------|
| [chevron](#chevron)  | The collapsed/expanded state icon container.     |
| [helpText](#helpText) | The helpText content container.                  |
| [size](#size)     | The size of the dropdown bib. (height, width, maxHeight, maxWidth only) |
| [trigger](#trigger)  | The trigger content container.                   |
<!-- AURO-GENERATED-CONTENT:END -->

## Basic

The following examples demonstrate basic usage of the `auro-dropdown` component with different types of trigger content.

### Text

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic.html -->
<auro-dropdown aria-label="custom label">
Lorem ipsum solar
<div slot="trigger">
Trigger
</div>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->

<pre class="language-html"><code class="language-html">&lt;auro-dropdown aria-label="custom label"&gt;
  Lorem ipsum solar
  &lt;div slot="trigger"&gt;
    Trigger
  &lt;/div&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse.html) -->
<!-- The below content is automatically added from ./../apiExamples/appearance-inverse.html -->
<auro-dropdown appearance="inverse" aria-label="custom label">
Lorem ipsum solar
<div slot="trigger">
Trigger
</div>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Icon

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic-icon.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic-icon.html -->
<auro-dropdown aria-label="custom label">
Lorem ipsum solar
<div slot="trigger">
<auro-icon
category="interface"
name="arrow-down"></auro-icon>
</div>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic-icon.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic-icon.html -->

<pre class="language-html"><code class="language-html">&lt;auro-dropdown aria-label="custom label"&gt;
  Lorem ipsum solar
  &lt;div slot="trigger"&gt;
    &lt;auro-icon
      category="interface"
      name="arrow-down"&gt;&lt;/auro-icon&gt;
  &lt;/div&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Button

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic-button.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic-button.html -->
<auro-dropdown aria-label="custom label">
Lorem ipsum solar
<div slot="trigger">
<auro-button slot="trigger">
Dropdown
</auro-button>
</div>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic-button.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic-button.html -->

<pre class="language-html"><code class="language-html">&lt;auro-dropdown aria-label="custom label"&gt;
  Lorem ipsum solar
  &lt;div slot="trigger"&gt;
    &lt;auro-button slot="trigger"&gt;
      Dropdown
    &lt;/auro-button&gt;
  &lt;/div&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Property & Attribute Examples

### Appearance on Dark Backgrounds

Use the `appearance="inverse"` attribute to ensure proper styling when the dropdown is used on dark backgrounds.

<div class="exampleWrapper--ondark">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse.html) -->
<!-- The below content is automatically added from ./../apiExamples/appearance-inverse.html -->
<auro-dropdown appearance="inverse" aria-label="custom label">
Lorem ipsum solar
<div slot="trigger">
Trigger
</div>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/appearance-inverse.html -->

<pre class="language-html"><code class="language-html">&lt;auro-dropdown appearance="inverse" aria-label="custom label"&gt;
  Lorem ipsum solar
  &lt;div slot="trigger"&gt;
    Trigger
  &lt;/div&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Chevron

Use the `chevron` attribute to add a chevron icon to the dropdown trigger.

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/chevron.html) -->
<!-- The below content is automatically added from ./../apiExamples/chevron.html -->
<auro-dropdown aria-label="custom label" chevron>
Lorem ipsum solar
<div slot="trigger">
Trigger
</div>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/chevron.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/chevron.html -->

<pre class="language-html"><code class="language-html">&lt;auro-dropdown aria-label="custom label" chevron&gt;
  Lorem ipsum solar
  &lt;div slot="trigger"&gt;
    Trigger
  &lt;/div&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Disabled

Use the `disabled` attribute to disable interaction with the dropdown.

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled.html) -->
<!-- The below content is automatically added from ./../apiExamples/disabled.html -->
<auro-dropdown
aria-label="custom label"
disabled
chevron
layout="classic" shape="classic" size="lg">
Lorem ipsum solar
<div slot="trigger">
Trigger
</div>
<span slot="helpText">
Help text
</span>
<span slot="label">
Name
</span>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<div class="exampleWrapper--ondark" aria-hidden>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse-disabled.html) -->
<!-- The below content is automatically added from ./../apiExamples/appearance-inverse-disabled.html -->
<auro-dropdown
aria-label="custom label"
disabled
appearance="inverse"
chevron
layout="classic" shape="classic" size="lg">
Lorem ipsum solar
<div slot="trigger">
Trigger
</div>
<span slot="helpText">
Help text
</span>
<span slot="label">
Name
</span>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/disabled.html -->

<pre class="language-html"><code class="language-html">&lt;auro-dropdown
  aria-label="custom label"
  disabled
  chevron
  layout="classic" shape="classic" size="lg"&gt;
  Lorem ipsum solar
  &lt;div slot="trigger"&gt;
    Trigger
  &lt;/div&gt;
  &lt;span slot="helpText"&gt;
    Help text
  &lt;/span&gt;
  &lt;span slot="label"&gt;
    Name
  &lt;/span&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse-disabled.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/appearance-inverse-disabled.html -->

<pre class="language-html"><code class="language-html">&lt;auro-dropdown
  aria-label="custom label"
  disabled
  appearance="inverse"
  chevron
  layout="classic" shape="classic" size="lg"&gt;
  Lorem ipsum solar
  &lt;div slot="trigger"&gt;
    Trigger
  &lt;/div&gt;
  &lt;span slot="helpText"&gt;
    Help text
  &lt;/span&gt;
  &lt;span slot="label"&gt;
    Name
  &lt;/span&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Error

Use the `error` attribute to set persistent error state styling on the dropdown.

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/error.html) -->
<!-- The below content is automatically added from ./../apiExamples/error.html -->
<auro-dropdown id="error" layout="classic" shape="classic" size="lg" error id="errorDropdownExample">
<div style="padding: var(--ds-size-150);">
Lorem ipsum solar
<br />
<auro-button id="errorButton">
Dismiss Dropdown
</auro-button>
</div>
<span slot="helpText">
Help text
</span>
<span slot="label">
Element label (default text will be read by screen reader)
</span>
<div slot="trigger">
Trigger
</div>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<div class="exampleWrapper--ondark" aria-hidden>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse-error.html) -->
<!-- The below content is automatically added from ./../apiExamples/appearance-inverse-error.html -->
<auro-dropdown id="inverseError" appearance="inverse" layout="classic" shape="classic" size="lg" error>
<div style="padding: var(--ds-size-150);">
Lorem ipsum solar
<br />
<auro-button id="inverseErrorButton">
Dismiss Dropdown
</auro-button>
</div>
<span slot="helpText">
Help text
</span>
<span slot="label">
Element label (default text will be read by screen reader)
</span>
<div slot="trigger">
Trigger
</div>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/error.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/error.html -->

<pre class="language-html"><code class="language-html">&lt;auro-dropdown id="error" layout="classic" shape="classic" size="lg" error id="errorDropdownExample"&gt;
  &lt;div style="padding: var(--ds-size-150);"&gt;
    Lorem ipsum solar
    &lt;br /&gt;
    &lt;auro-button id="errorButton"&gt;
      Dismiss Dropdown
    &lt;/auro-button&gt;
  &lt;/div&gt;
  &lt;span slot="helpText"&gt;
    Help text
  &lt;/span&gt;
  &lt;span slot="label"&gt;
    Element label (default text will be read by screen reader)
  &lt;/span&gt;
  &lt;div slot="trigger"&gt;
    Trigger
  &lt;/div&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse-error.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/appearance-inverse-error.html -->

<pre class="language-html"><code class="language-html">&lt;auro-dropdown id="inverseError" appearance="inverse" layout="classic" shape="classic" size="lg" error&gt;
  &lt;div style="padding: var(--ds-size-150);"&gt;
    Lorem ipsum solar
    &lt;br /&gt;
    &lt;auro-button id="inverseErrorButton"&gt;
      Dismiss Dropdown
    &lt;/auro-button&gt;
  &lt;/div&gt;
  &lt;span slot="helpText"&gt;
    Help text
  &lt;/span&gt;
  &lt;span slot="label"&gt;
    Element label (default text will be read by screen reader)
  &lt;/span&gt;
  &lt;div slot="trigger"&gt;
    Trigger
  &lt;/div&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Fullscreen Bib

You can make the dropdown open in fullscreen at a specific breakpoint by setting `fullscreenBreakpoint`.

The default value of `fullscreenBreakpoint` is `sm`. 

Breakpoint token can be found [here](https://auro.alaskaair.com/getting-started/developers/design-tokens).

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/fullscreen-breakpoint.html) -->
<!-- The below content is automatically added from ./../apiExamples/fullscreen-breakpoint.html -->
<auro-dropdown id="fullscreen" fullscreenBreakpoint="sm" layout="classic" shape="classic" size="lg" chevron>
<div>
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</p>
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</p>
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</p>
</div>
<auro-button id="fullscreenButton">
Dismiss Dropdown
</auro-button>
<div slot="trigger">
Trigger
</div>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/fullscreen-breakpoint.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/fullscreen-breakpoint.html -->

<pre class="language-html"><code class="language-html">&lt;auro-dropdown id="fullscreen" fullscreenBreakpoint="sm" layout="classic" shape="classic" size="lg" chevron&gt;
  &lt;div&gt;
    &lt;p&gt;
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    &lt;/p&gt;
    &lt;p&gt;
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    &lt;/p&gt;
    &lt;p&gt;
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    &lt;/p&gt;
  &lt;/div&gt;
  &lt;auro-button id="fullscreenButton"&gt;
    Dismiss Dropdown
  &lt;/auro-button&gt;
  &lt;div slot="trigger"&gt;
    Trigger
  &lt;/div&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Layouts

The `auro-dropdown` element supports multiple layouts to fit different design needs. The available layouts are: `classic`, `emphasized`, and `snowflake`. Each layout offers a unique visual style while maintaining the same core functionality.

**Important**: The `emphasized` and `snowflake` layouts are designed specifically for dark backgrounds and should be used with the `appearance="inverse"` attribute.

#### Classic

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/classic/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/classic/basic.html -->
<auro-dropdown id="classic" layout="classic" shape="classic" size="lg" chevron aria-label="Label content for screen reader">
<div style="padding: var(--ds-size-150);">
Lorem ipsum solar
<br />
<auro-button id="classicButton">
Dismiss Dropdown
</auro-button>
</div>
<span slot="helpText">
Help text
</span>
<div slot="trigger">
Trigger
</div>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/classic/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/classic/basic.html -->

<pre class="language-html"><code class="language-html">&lt;auro-dropdown id="classic" layout="classic" shape="classic" size="lg" chevron aria-label="Label content for screen reader"&gt;
  &lt;div style="padding: var(--ds-size-150);"&gt;
    Lorem ipsum solar
    &lt;br /&gt;
    &lt;auro-button id="classicButton"&gt;
      Dismiss Dropdown
    &lt;/auro-button&gt;
  &lt;/div&gt;
  &lt;span slot="helpText"&gt;
    Help text
  &lt;/span&gt;
  &lt;div slot="trigger"&gt;
    Trigger
  &lt;/div&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<div class="exampleWrapper--ondark">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/classic/appearance-inverse.html) -->
<!-- The below content is automatically added from ./../apiExamples/classic/appearance-inverse.html -->
<auro-dropdown id="classicInverse" appearance="inverse" layout="classic" shape="classic" size="lg" chevron aria-label="Label content for screen reader">
<div style="padding: var(--ds-size-150);">
Lorem ipsum solar
<br />
<auro-button id="classicInverseButton">
Dismiss Dropdown
</auro-button>
</div>
<span slot="helpText">
Help text
</span>
<div slot="trigger">
Trigger
</div>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/classic/appearance-inverse.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/classic/appearance-inverse.html -->

<pre class="language-html"><code class="language-html">&lt;auro-dropdown id="classicInverse" appearance="inverse" layout="classic" shape="classic" size="lg" chevron aria-label="Label content for screen reader"&gt;
  &lt;div style="padding: var(--ds-size-150);"&gt;
    Lorem ipsum solar
    &lt;br /&gt;
    &lt;auro-button id="classicInverseButton"&gt;
      Dismiss Dropdown
    &lt;/auro-button&gt;
  &lt;/div&gt;
  &lt;span slot="helpText"&gt;
    Help text
  &lt;/span&gt;
  &lt;div slot="trigger"&gt;
    Trigger
  &lt;/div&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Emphasized

<div class="exampleWrapper--ondark">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/emphasized/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/emphasized/basic.html -->
<auro-dropdown aria-label="custom label" shape="pill" size="xl" layout="emphasized" style="width: 249px;" appearance="inverse">
Lorem ipsum solar
<div slot="trigger">
Trigger
</div>
<span slot="helpText">
Help text - Lorem ipsum solar lorem ipsum solar
</span>
</auro-dropdown>
<auro-dropdown aria-label="custom label" shape="pill-left" size="xl" layout="emphasized" style="width: 249px;" appearance="inverse">
Lorem ipsum solar
<div slot="trigger">
Trigger
</div>
<span slot="helpText">
Help text - Lorem ipsum solar lorem ipsum solar
</span>
</auro-dropdown>
<auro-dropdown aria-label="custom label" shape="pill-right" size="xl" layout="emphasized" style="width: 249px;" appearance="inverse">
Lorem ipsum solar
<div slot="trigger">
Trigger
</div>
<span slot="helpText">
Help text - Lorem ipsum solar lorem ipsum solar
</span>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/emphasized/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/emphasized/basic.html -->

<pre class="language-html"><code class="language-html">&lt;auro-dropdown aria-label="custom label" shape="pill" size="xl" layout="emphasized" style="width: 249px;" appearance="inverse"&gt;
  Lorem ipsum solar
  &lt;div slot="trigger"&gt;
    Trigger
  &lt;/div&gt;
  &lt;span slot="helpText"&gt;
    Help text - Lorem ipsum solar lorem ipsum solar
  &lt;/span&gt;
&lt;/auro-dropdown&gt;
&lt;auro-dropdown aria-label="custom label" shape="pill-left" size="xl" layout="emphasized" style="width: 249px;" appearance="inverse"&gt;
  Lorem ipsum solar
  &lt;div slot="trigger"&gt;
    Trigger
  &lt;/div&gt;
  &lt;span slot="helpText"&gt;
    Help text - Lorem ipsum solar lorem ipsum solar
  &lt;/span&gt;
&lt;/auro-dropdown&gt;
&lt;auro-dropdown aria-label="custom label" shape="pill-right" size="xl" layout="emphasized" style="width: 249px;" appearance="inverse"&gt;
  Lorem ipsum solar
  &lt;div slot="trigger"&gt;
    Trigger
  &lt;/div&gt;
  &lt;span slot="helpText"&gt;
    Help text - Lorem ipsum solar lorem ipsum solar
  &lt;/span&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Snowflake

<div class="exampleWrapper--ondark">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/snowflake/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/snowflake/basic.html -->
<auro-dropdown aria-label="custom label" shape="snowflake" size="lg" layout="snowflake" style="width: 249px;" appearance="inverse">
Lorem ipsum solar
<div slot="trigger">
Trigger
</div>
<span slot="helpText">
Help text - Lorem ipsum solar lorem ipsum solar
</span>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/snowflake/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/snowflake/basic.html -->

<pre class="language-html"><code class="language-html">&lt;auro-dropdown aria-label="custom label" shape="snowflake" size="lg" layout="snowflake" style="width: 249px;" appearance="inverse"&gt;
  Lorem ipsum solar
  &lt;div slot="trigger"&gt;
    Trigger
  &lt;/div&gt;
  &lt;span slot="helpText"&gt;
    Help text - Lorem ipsum solar lorem ipsum solar
  &lt;/span&gt;
&lt;/auro-dropdown&gt;</code></pre>
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
<style>
.floaterConfigDropdown::part(size) {
max-height: 200px;
}
</style>
<div aria-label="custom label">
<auro-dropdown class="floaterConfigDropdown" layout="classic" shape="classic" size="lg" chevron matchWidth placement="bottom-end" offset="20" noFlip>
<div>
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</p>
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</p>
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</p>
</div>
<div slot="trigger">
Trigger
</div>
<span slot="helpText">Trigger for bottom-end bib with 20px offset and noFlip</span>
</auro-dropdown>
</div>
<div aria-label="custom label">
<auro-dropdown class="floaterConfigDropdown" layout="classic" shape="classic" size="lg" chevron matchWidth placement="bottom-end" offset="20">
<div>
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</p>
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</p>
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</p>
</div>
<div slot="trigger">
Trigger
</div>
<div slot="helpText">
Trigger for bottom-end bib with 20px offset and flip
</div>
</auro-dropdown>
</div>
<div aria-label="custom label">
<auro-dropdown class="floaterConfigDropdown" layout="classic" shape="classic" size="lg" chevron matchWidth noFlip placement="right" offset="20">
<div>
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</p>
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</p>
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</p>
</div>
<div slot="trigger">
Trigger
</div>
<div slot="helpText">
Trigger for right bib with 20px offset and noFlip
</div>
</auro-dropdown>
</div>
<div aria-label="custom label">
<auro-dropdown width="350px" class="floaterConfigDropdown" layout="classic" shape="classic" size="lg" chevron matchWidth noFlip placement="bottom-start" shift offset="20">
<div width="500px">
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</p>
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</p>
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</p>
</div>
<div slot="trigger">
Trigger
</div>
<div slot="helpText">
Trigger for bottom-start bib with 20px offset, shift and noFlip
</div>
</auro-dropdown>
</div>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/floater-config.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/floater-config.html -->

<pre class="language-html"><code class="language-html">&lt;style&gt;
  .floaterConfigDropdown::part(size) {
    max-height: 200px;
  }
&lt;/style&gt;
&lt;div aria-label="custom label"&gt;
  &lt;auro-dropdown class="floaterConfigDropdown" layout="classic" shape="classic" size="lg" chevron matchWidth placement="bottom-end" offset="20" noFlip&gt;
    &lt;div&gt;
      &lt;p&gt;
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      &lt;/p&gt;
      &lt;p&gt;
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      &lt;/p&gt;
      &lt;p&gt;
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      &lt;/p&gt;
    &lt;/div&gt;
    &lt;div slot="trigger"&gt;
      Trigger
    &lt;/div&gt;
    &lt;span slot="helpText"&gt;Trigger for bottom-end bib with 20px offset and noFlip&lt;/span&gt;
  &lt;/auro-dropdown&gt;
&lt;/div&gt;
&lt;div aria-label="custom label"&gt;
  &lt;auro-dropdown class="floaterConfigDropdown" layout="classic" shape="classic" size="lg" chevron matchWidth placement="bottom-end" offset="20"&gt;
    &lt;div&gt;
      &lt;p&gt;
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      &lt;/p&gt;
      &lt;p&gt;
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      &lt;/p&gt;
      &lt;p&gt;
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      &lt;/p&gt;
    &lt;/div&gt;
    &lt;div slot="trigger"&gt;
      Trigger
    &lt;/div&gt;
    &lt;div slot="helpText"&gt;
      Trigger for bottom-end bib with 20px offset and flip
    &lt;/div&gt;
  &lt;/auro-dropdown&gt;
&lt;/div&gt;
&lt;div aria-label="custom label"&gt;
  &lt;auro-dropdown class="floaterConfigDropdown" layout="classic" shape="classic" size="lg" chevron matchWidth noFlip placement="right" offset="20"&gt;
    &lt;div&gt;
      &lt;p&gt;
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      &lt;/p&gt;
      &lt;p&gt;
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      &lt;/p&gt;
      &lt;p&gt;
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      &lt;/p&gt;
    &lt;/div&gt;
    &lt;div slot="trigger"&gt;
      Trigger
    &lt;/div&gt;
    &lt;div slot="helpText"&gt;
      Trigger for right bib with 20px offset and noFlip
    &lt;/div&gt;
  &lt;/auro-dropdown&gt;
&lt;/div&gt;
&lt;div aria-label="custom label"&gt;
  &lt;auro-dropdown width="350px" class="floaterConfigDropdown" layout="classic" shape="classic" size="lg" chevron matchWidth noFlip placement="bottom-start" shift offset="20"&gt;
    &lt;div width="500px"&gt;
      &lt;p&gt;
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      &lt;/p&gt;
      &lt;p&gt;
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      &lt;/p&gt;
      &lt;p&gt;
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      &lt;/p&gt;
    &lt;/div&gt;
    &lt;div slot="trigger"&gt;
      Trigger
    &lt;/div&gt;
    &lt;div slot="helpText"&gt;
      Trigger for bottom-start bib with 20px offset, shift and noFlip
    &lt;/div&gt;
  &lt;/auro-dropdown&gt;
&lt;/div&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Match Width

When the `matchWidth` attribute is applied, the width of the dropdown bib will match the width of the trigger element.

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/match-width.html) -->
<!-- The below content is automatically added from ./../apiExamples/match-width.html -->
<auro-dropdown id="matchWidth" layout="classic" shape="classic" size="lg" matchWidth aria-label="Label content for screen reader">
<div style="padding: var(--ds-size-150);">
Lorem ipsum solar
<br />
<auro-button id="matchWidthButton">
Dismiss Dropdown
</auro-button>
</div>
<span slot="helpText">
Help text
</span>
<div slot="trigger">
Trigger
</div>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/match-width.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/match-width.html -->

<pre class="language-html"><code class="language-html">&lt;auro-dropdown id="matchWidth" layout="classic" shape="classic" size="lg" matchWidth aria-label="Label content for screen reader"&gt;
  &lt;div style="padding: var(--ds-size-150);"&gt;
    Lorem ipsum solar
    &lt;br /&gt;
    &lt;auro-button id="matchWidthButton"&gt;
      Dismiss Dropdown
    &lt;/auro-button&gt;
  &lt;/div&gt;
  &lt;span slot="helpText"&gt;
    Help text
  &lt;/span&gt;
  &lt;div slot="trigger"&gt;
    Trigger
  &lt;/div&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### No Toggle

In cases where it is desired behavior for `auro-dropdown` to only show, not toggle, the bib content when activating the trigger the `noToggle` attribute must be applied.

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/no-toggle.html) -->
<!-- The below content is automatically added from ./../apiExamples/no-toggle.html -->
<auro-dropdown aria-label="custom label" noToggle>
Lorem ipsum solar
<div slot="trigger">
Trigger
</div>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/no-toggle.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/no-toggle.html -->

<pre class="language-html"><code class="language-html">&lt;auro-dropdown aria-label="custom label" noToggle&gt;
  Lorem ipsum solar
  &lt;div slot="trigger"&gt;
    Trigger
  &lt;/div&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Method Examples

### Hide

The `hide()` method can be called from within the default slot content. This is useful for cases such as `auro-select` when the dropdown should be collapsed after making a selection.

The `hide()` method may also be called from anywhere in your code by executing `document.querySelector('#idOfTheDropdownElement').hide()`.

This example demonstrations collapsing the dropdown by clicking a button within the dropdown bib content.

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/programmatically-hide.html) -->
<!-- The below content is automatically added from ./../apiExamples/programmatically-hide.html -->
<auro-dropdown id="hideExample" aria-label="custom label" layout="classic" shape="classic" size="lg">
<p>
Lorem ipsum solar
</p>
<div style="padding: var(--ds-size-150);">
<auro-button id="hideExampleBtn">
Hide Dropdown
</auro-button>
</div>
<span slot="trigger">
Trigger
</span>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/programmatically-hide.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/programmatically-hide.html -->

<pre class="language-html"><code class="language-html">&lt;auro-dropdown id="hideExample" aria-label="custom label" layout="classic" shape="classic" size="lg"&gt;
  &lt;p&gt;
    Lorem ipsum solar
  &lt;/p&gt;
  &lt;div style="padding: var(--ds-size-150);"&gt;
    &lt;auro-button id="hideExampleBtn"&gt;
      Hide Dropdown
    &lt;/auro-button&gt;
  &lt;/div&gt;
  &lt;span slot="trigger"&gt;
    Trigger
  &lt;/span&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/programmatically-hide.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/programmatically-hide.js -->

<pre class="language-js"><code class="language-js">export function hideExample() {
  const btn = document.querySelector('#hideExampleBtn');
  const dropdown = document.querySelector('#hideExample');
​
  btn?.addEventListener('click', () =&gt; {
    dropdown?.hide();
  });
}</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Show

The `show()` method may also be called from anywhere in your code by executing `document.querySelector('#idOfTheDropdownElement').show()`. This example will execute the `show()` method on a `keydown` event with focus in the input element.

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/programmatically-show.html) -->
<!-- The below content is automatically added from ./../apiExamples/programmatically-show.html -->
<auro-input id="showExampleTriggerInput" required>
<span slot="label">Enter a value to show the dropdown</span>
</auro-input>
<br />
<auro-dropdown id="showMethodExample" aria-label="custom label" layout="classic" shape="classic" size="lg">
<p>
Lorem ipsum solar
</p>
<span slot="trigger">Trigger Label</span>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/programmatically-show.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/programmatically-show.html -->

<pre class="language-html"><code class="language-html">&lt;auro-input id="showExampleTriggerInput" required&gt;
  &lt;span slot="label"&gt;Enter a value to show the dropdown&lt;/span&gt;
&lt;/auro-input&gt;
&lt;br /&gt;
&lt;auro-dropdown id="showMethodExample" aria-label="custom label" layout="classic" shape="classic" size="lg"&gt;
  &lt;p&gt;
    Lorem ipsum solar
  &lt;/p&gt;
  &lt;span slot="trigger"&gt;Trigger Label&lt;/span&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/programmatically-show.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/programmatically-show.js -->

<pre class="language-js"><code class="language-js">export function showExample() {
  const triggerInput = document.querySelector('#showExampleTriggerInput');
  const dropdownElem = document.querySelector('#showMethodExample');
​
  triggerInput?.addEventListener('keydown', () =&gt; {
    dropdownElem?.show();
  });
}</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Slot Examples

### Help Text

Content defined in the `helpText` slot will be rendered left aligned below the trigger. This slot requires the `auro-helptext` component be used as slot content for the helptext to render with the same styles as other form elements.

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/help-text.html) -->
<!-- The below content is automatically added from ./../apiExamples/help-text.html -->
<auro-dropdown
aria-label="custom label"
inset
bordered
rounded>
Lorem ipsum solar
<span slot="helpText">
Helper text
</span>
<div slot="trigger">
Trigger
</div>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/help-text.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/help-text.html -->

<pre class="language-html"><code class="language-html">&lt;auro-dropdown
  aria-label="custom label"
  inset
  bordered
  rounded&gt;
  Lorem ipsum solar
  &lt;span slot="helpText"&gt;
    Helper text
  &lt;/span&gt;
  &lt;div slot="trigger"&gt;
    Trigger
  &lt;/div&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Trigger

Content defined in the `trigger` slot will be rendered in the clickable trigger of the dropdown that is used to display the bib. Focus state visual effects will be disabled on the trigger when it contains a focusable element other than `<auro-input>`.

This slot may contain any static content (e.g. plain text) and/or no more than one of the following elements:
- `<a>`
- `<auro-hyperlink>`
- `<button>`
- `<auro-button>`
- `<input>`
- `<auro-input>`
- `<svg>`
- `<auro-icon>`

## Common Usage Patterns & Functional Examples

### Width and Sizing Behavior

- **Width:** The `auro-dropdown` element will automatically consume the full width of its parent container. Wrap the `auro-dropdown` in a container element with a defined width to control the overall width of the dropdown.

- **Scroll Behavior:** When the content exceeds the specified size, the browser will provide a scroll for the overflow.

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/custom-dimensions.html) -->
<!-- The below content is automatically added from ./../apiExamples/custom-dimensions.html -->
<div style="width: 100px;" aria-label="custom label">
<auro-dropdown id="customDropdown100" layout="classic" shape="classic" size="lg" chevron>
<div style="max-height: 200px;">
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</p>
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</p>
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</p>
</div>
<div slot="trigger">
Trigger
</div>
</auro-dropdown>
</div>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/custom-dimensions.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/custom-dimensions.html -->

<pre class="language-html"><code class="language-html">&lt;div style="width: 100px;" aria-label="custom label"&gt;
  &lt;auro-dropdown id="customDropdown100" layout="classic" shape="classic" size="lg" chevron&gt;
    &lt;div style="max-height: 200px;"&gt;
      &lt;p&gt;
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      &lt;/p&gt;
      &lt;p&gt;
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      &lt;/p&gt;
      &lt;p&gt;
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      &lt;/p&gt;
    &lt;/div&gt;
    &lt;div slot="trigger"&gt;
      Trigger
    &lt;/div&gt;
  &lt;/auro-dropdown&gt;
&lt;/div&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Dropdown in Dialog

The element used within an `auro-dialog`.

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/in-dialog.html) -->
<!-- The below content is automatically added from ./../apiExamples/in-dialog.html -->
<div>
<auro-button id="dropdown-dialog-opener">Dropdown in Dialog</auro-button>
<auro-dialog id="dropdown-dialog">
<span slot="header">Dropdown in Dialog</span>
<div slot="content">
<auro-dropdown id="in-dialog-dropdown" layout="classic" shape="classic" size="lg">
<div style="padding: var(--ds-size-150);">
Lorem ipsum solar
<br />
<auro-button id="in-dialog-dismiss-btn">
Dismiss Dropdown
</auro-button>
</div>
<span slot="helpText">
Help text
</span>
<span slot="label">
Element label (default text will be read by screen reader)
</span>
<div slot="trigger">
Dropdown Trigger in Dialog
</div>
</auro-dropdown>
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
  &lt;auro-button id="dropdown-dialog-opener"&gt;Dropdown in Dialog&lt;/auro-button&gt;
  &lt;auro-dialog id="dropdown-dialog"&gt;
    &lt;span slot="header"&gt;Dropdown in Dialog&lt;/span&gt;
    &lt;div slot="content"&gt;
      &lt;auro-dropdown id="in-dialog-dropdown" layout="classic" shape="classic" size="lg"&gt;
        &lt;div style="padding: var(--ds-size-150);"&gt;
          Lorem ipsum solar
          &lt;br /&gt;
          &lt;auro-button id="in-dialog-dismiss-btn"&gt;
            Dismiss Dropdown
          &lt;/auro-button&gt;
        &lt;/div&gt;
        &lt;span slot="helpText"&gt;
          Help text
        &lt;/span&gt;
        &lt;span slot="label"&gt;
          Element label (default text will be read by screen reader)
        &lt;/span&gt;
        &lt;div slot="trigger"&gt;
          Dropdown Trigger in Dialog
        &lt;/div&gt;
      &lt;/auro-dropdown&gt;
    &lt;/div&gt;
  &lt;/auro-dialog&gt;
&lt;/div&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/in-dialog.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/in-dialog.js -->

<pre class="language-js"><code class="language-js">export function inDialogExample() {
  const openBtn = document.querySelector("#dropdown-dialog-opener");
  const closeBtn = document.querySelector("#in-dialog-dismiss-btn");
  const dropdown = document.querySelector("#in-dialog-dropdown");
​
  openBtn?.addEventListener("click", () =&gt; {
    const dialog = document.querySelector("#dropdown-dialog");
    dialog.open = true;
  });
​
  closeBtn?.addEventListener("click", () =&gt; {
    dropdown?.hide();
  });
};</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Dropdown in Drawer

The element used within an `auro-drawer`.

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/in-drawer.html) -->
<!-- The below content is automatically added from ./../apiExamples/in-drawer.html -->
<div>
<auro-button id="dropdown-drawer-opener">Dropdown in Drawer</auro-button>
<auro-drawer id="dropdown-drawer">
<span slot="header">Dropdown in Drawer</span>
<div slot="content">
<auro-dropdown id="in-drawer-dropdown" layout="classic" shape="classic" size="lg">
<div style="padding: var(--ds-size-150);">
Lorem ipsum dolor
<br />
<auro-button id="in-drawer-dismiss-btn">
Dismiss Dropdown
</auro-button>
</div>
<span slot="helpText">
Help text
</span>
<span slot="label">
Element label (default text will be read by screen reader)
</span>
<div slot="trigger">
Dropdown Trigger in Drawer
</div>
</auro-dropdown>
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
  &lt;auro-button id="dropdown-drawer-opener"&gt;Dropdown in Drawer&lt;/auro-button&gt;
  &lt;auro-drawer id="dropdown-drawer"&gt;
    &lt;span slot="header"&gt;Dropdown in Drawer&lt;/span&gt;
    &lt;div slot="content"&gt;
      &lt;auro-dropdown id="in-drawer-dropdown" layout="classic" shape="classic" size="lg"&gt;
        &lt;div style="padding: var(--ds-size-150);"&gt;
          Lorem ipsum dolor
          &lt;br /&gt;
          &lt;auro-button id="in-drawer-dismiss-btn"&gt;
            Dismiss Dropdown
          &lt;/auro-button&gt;
        &lt;/div&gt;
        &lt;span slot="helpText"&gt;
          Help text
        &lt;/span&gt;
        &lt;span slot="label"&gt;
          Element label (default text will be read by screen reader)
        &lt;/span&gt;
        &lt;div slot="trigger"&gt;
          Dropdown Trigger in Drawer
        &lt;/div&gt;
      &lt;/auro-dropdown&gt;
    &lt;/div&gt;
  &lt;/auro-drawer&gt;
&lt;/div&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/in-drawer.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/in-drawer.js -->

<pre class="language-js"><code class="language-js">export function inDrawerExample() {
  const openBtn = document.querySelector("#dropdown-drawer-opener");
  const closeBtn = document.querySelector("#in-drawer-dismiss-btn");
  const dropdown = document.querySelector("#in-drawer-dropdown");
​
  openBtn?.addEventListener("click", () =&gt; {
    const drawer = document.querySelector("#dropdown-drawer");
    if (drawer.hasAttribute('open')) {
      drawer.removeAttribute('open');
    } else {
      drawer.setAttribute('open', true);
    }
  });
​
  closeBtn?.addEventListener("click", () =&gt; {
    dropdown?.hide();
  });
};</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Restyle Component with CSS Variables

The component may be restyled by changing the values of the following token(s).

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../src/styles/tokens.scss) -->
<!-- The below code snippet is automatically added from ./../src/styles/tokens.scss -->

<pre class="language-scss"><code class="language-scss">@use "@aurodesignsystem/design-tokens/dist/themes/alaska/SCSSVariables--alaska" as v;
@use "@aurodesignsystem/design-tokens/dist/legacy/auro-classic/SCSSVariables" as vac;
​
:host(:not([ondark])),
:host(:not([appearance="inverse"])) {
  --ds-auro-dropdown-label-text-color: var(--ds-basic-color-texticon-muted, #{v.$ds-basic-color-texticon-muted});
  --ds-auro-dropdown-trigger-background-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-dropdown-trigger-hover-background-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-dropdown-trigger-container-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-dropdown-trigger-border-color: var(--ds-basic-color-border-bold, #{v.$ds-basic-color-border-bold});
  --ds-auro-dropdown-trigger-outline-color: transparent;
  --ds-auro-dropdown-trigger-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-dropdownbib-boxshadow-color: var(--ds-elevation-200, #{vac.$ds-elevation-200});
  --ds-auro-dropdownbib-background-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-dropdownbib-container-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-dropdownbib-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
}
​
:host([ondark]),
:host([appearance="inverse"]) {
  --ds-auro-dropdown-label-text-color: var(--ds-basic-color-texticon-inverse-muted, #{v.$ds-basic-color-texticon-inverse-muted});
  --ds-auro-dropdown-trigger-background-color: var(--ds-advanced-color-shared-background-inverse, #{v.$ds-advanced-color-shared-background-inverse});
  --ds-auro-dropdown-trigger-hover-background-color: var(--ds-advanced-color-shared-background-inverse, #{v.$ds-advanced-color-shared-background-inverse});
  --ds-auro-dropdown-trigger-container-color: var(--ds-advanced-color-shared-background-inverse, #{v.$ds-advanced-color-shared-background-inverse});
  --ds-auro-dropdown-trigger-border-color: var(--ds-basic-color-border-inverse, #{v.$ds-basic-color-border-inverse});
  --ds-auro-dropdown-trigger-outline-color: transparent;
  --ds-auro-dropdown-trigger-text-color: var(--ds-basic-color-texticon-inverse, #{v.$ds-basic-color-texticon-inverse});
  --ds-auro-dropdownbib-boxshadow-color: var(--ds-elevation-200, #{vac.$ds-elevation-200});
  --ds-auro-dropdownbib-background-color: var(--ds-advanced-color-shared-background-inverse, #{v.$ds-advanced-color-shared-background-inverse});
  --ds-auro-dropdownbib-container-color: var(--ds-advanced-color-shared-background-inverse, #{v.$ds-advanced-color-shared-background-inverse});
  --ds-auro-dropdownbib-text-color: var(--ds-basic-color-texticon-inverse, #{v.$ds-basic-color-texticon-inverse});
}</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->

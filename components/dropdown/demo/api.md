<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/api.md) -->
<!-- The below content is automatically added from ./../docs/api.md -->

# auro-dropdown

## Attributes

| Attribute          | Type        | Description                                      |
|--------------------|-------------|--------------------------------------------------|
| [disableEventShow](#disableEventShow) | ` Boolean ` | If declared, the dropdown will only show by calling the API .show() public method. |

## Properties

| Property                     | Attribute                    | Type        | Default | Description                                      |
|------------------------------|------------------------------|-------------|---------|--------------------------------------------------|
| [bordered](#bordered)                   | `bordered`                   | ` Boolean ` |         | If declared, applies a border around the trigger slot. |
| [chevron](#chevron)                    | `chevron`                    | ` Boolean ` |         | If declared, the dropdown displays a chevron on the right. |
| [common](#common)                     | `common`                     | ` Boolean ` |         | If declared, the dropdown will be styled with the common theme. |
| [disabled](#disabled)                   | `disabled`                   | ` Boolean ` |         | If declared, the dropdown is not interactive.    |
| [error](#error)                      | `error`                      | ` Boolean ` |         | If declared in combination with `bordered` property or `helpText` slot content, will apply red color to both. |
| [fluid](#fluid)                      | `fluid`                      | `Boolean`   |         | Makes the trigger to be full width of its parent container. |
| [focusShow](#focusShow)                  | `focusShow`                  | ` Boolean ` |         | If declared, the bib will display when focus is applied to the trigger. |
| [hoverToggle](#hoverToggle)                | `hoverToggle`                | ` Boolean ` |         | If declared, the trigger will toggle the dropdown on mouseover/mouseout. |
| [inset](#inset)                      | `inset`                      | ` Boolean ` |         | If declared, will apply padding around trigger slot content. |
| [isPopoverVisible](#isPopoverVisible)           | `isPopoverVisible`           | ` Boolean ` | false   | If true, the dropdown bib is displayed.          |
| [matchWidth](#matchWidth)                 | `matchWidth`                 | ` Boolean ` | false   | If declared, the popover and trigger will be set to the same width. |
| [mobileFullscreenBreakpoint](#mobileFullscreenBreakpoint) | `mobileFullscreenBreakpoint` | ` String `  |         | Defines the screen size breakpoint (`lg`, `md`, `sm`, or `xs`) at which the dropdown switches to fullscreen mode on mobile. When expanded, the dropdown will automatically display in fullscreen mode if the screen size is equal to or smaller than the selected breakpoint. |
| [noHideOnThisFocusLoss](#noHideOnThisFocusLoss)      | `noHideOnThisFocusLoss`      | ` Boolean ` | false   | If declared, the dropdown will not hide when moving focus outside the element. |
| [noToggle](#noToggle)                   | `noToggle`                   | ` Boolean ` |         | If declared, the trigger will only show the dropdown bib. |
| [onSlotChange](#onSlotChange)               | `onSlotChange`               |             |         |                                                  |
| [rounded](#rounded)                    | `rounded`                    | ` Boolean ` |         | If declared, will apply border-radius to trigger and default slots. |

## Methods

| Method | Type       | Description                         |
|--------|------------|-------------------------------------|
| [hide](#hide) | `(): void` | Public method to hide the dropdown. |
| [show](#show) | `(): void` | Public method to show the dropdown. |

## Events

| Event                       | Description                                      |
|-----------------------------|--------------------------------------------------|
| `auroDropdown-toggled`      | Notifies that the visibility of the dropdown bib has changed. |
| `auroDropdown-triggerClick` | Notifies that the trigger has been clicked.      |

## Slots

| Name       | Description                           |
|------------|---------------------------------------|
|            | Default slot for the popover content. |
| [helpText](#helpText) | Defines the content of the helpText.  |
| [label](#label)    | Defines the content of the label.     |
| [trigger](#trigger)  | Defines the content of the trigger.   |

## CSS Shadow Parts

| Part       | Description                                  |
|------------|----------------------------------------------|
| [chevron](#chevron)  | The collapsed/expanded state icon container. |
| [helpText](#helpText) | The helpText content container.              |
| [popover](#popover)  | The bib content container.                   |
| [trigger](#trigger)  | The trigger content container.               |
<!-- AURO-GENERATED-CONTENT:END -->

## API Examples

### Basic

The most basic, simple version of `auro-dropdown`.

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

```html
<auro-dropdown aria-label="custom label">
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basicIcon.html) -->
<!-- The below content is automatically added from ./../apiExamples/basicIcon.html -->
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
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basicIcon.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basicIcon.html -->

```html
<auro-dropdown aria-label="custom label">
  Lorem ipsum solar
  <div slot="trigger">
    <auro-icon
      category="interface"
      name="arrow-down"></auro-icon>
  </div>
</auro-dropdown>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basicButton.html) -->
<!-- The below content is automatically added from ./../apiExamples/basicButton.html -->
<auro-dropdown aria-label="custom label">
  Lorem ipsum solar
  <div slot="trigger">
    <auro-button
      slot="trigger"
      fluid>
      Dropdown
    </auro-button>
  </div>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basicButton.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basicButton.html -->

```html
<auro-dropdown aria-label="custom label">
  Lorem ipsum solar
  <div slot="trigger">
    <auro-button
      slot="trigger"
      fluid>
      Dropdown
    </auro-button>
  </div>
</auro-dropdown>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Property Examples

#### bordered

Adds the border style around the dropdown trigger.

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/bordered.html) -->
<!-- The below content is automatically added from ./../apiExamples/bordered.html -->
<auro-dropdown aria-label="custom label" bordered>
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/bordered.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/bordered.html -->

```html
<auro-dropdown aria-label="custom label" bordered>
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### chevron

Adds the bib visibility state chevron to the right side of the trigger content.

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

```html
<auro-dropdown aria-label="custom label" chevron>
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/chevronIcon.html) -->
<!-- The below content is automatically added from ./../apiExamples/chevronIcon.html -->
<auro-dropdown aria-label="custom label" chevron>
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
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/chevronIcon.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/chevronIcon.html -->

```html
<auro-dropdown aria-label="custom label" chevron>
  Lorem ipsum solar
  <div slot="trigger">
    <auro-icon
      category="interface"
      name="arrow-down"></auro-icon>
  </div>
</auro-dropdown>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/chevronButton.html) -->
<!-- The below content is automatically added from ./../apiExamples/chevronButton.html -->
<auro-dropdown aria-label="custom label" chevron>
  Lorem ipsum solar
  <div slot="trigger">
    <auro-button
      slot="trigger"
      fluid>
      Dropdown
    </auro-button>
  </div>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/chevronButton.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/chevronButton.html -->

```html
<auro-dropdown aria-label="custom label" chevron>
  Lorem ipsum solar
  <div slot="trigger">
    <auro-button
      slot="trigger"
      fluid>
      Dropdown
    </auro-button>
  </div>
</auro-dropdown>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/chevronInput.html) -->
<!-- The below content is automatically added from ./../apiExamples/chevronInput.html -->
<auro-dropdown aria-label="custom label" chevron>
  Lorem ipsum solar
  <div slot="trigger">
    <auro-input
      slot="trigger"
      id="inputExampleTrigger">
    </auro-input>
  </div>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/chevronInput.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/chevronInput.html -->

```html
<auro-dropdown aria-label="custom label" chevron>
  Lorem ipsum solar
  <div slot="trigger">
    <auro-input
      slot="trigger"
      id="inputExampleTrigger">
    </auro-input>
  </div>
</auro-dropdown>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### disabled

Disables the trigger preventing the dropdown bib from being shown.

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled.html) -->
<!-- The below content is automatically added from ./../apiExamples/disabled.html -->
<auro-dropdown aria-label="custom label" disabled>
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/disabled.html -->

```html
<auro-dropdown aria-label="custom label" disabled>
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabledAll.html) -->
  <!-- The below content is automatically added from ./../apiExamples/disabledAll.html -->
  <auro-dropdown
    aria-label="custom label"
    disabled
    chevron
    rounded
    inset
    bordered>
    Lorem ipsum solar
    <div slot="trigger">
      Trigger
    </div>
    <span slot="helpText">
      Helper text
    </span>
    <span slot="label">
      Name
    </span>
  </auro-dropdown>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabledAll.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/disabledAll.html -->

```html
<auro-dropdown
  aria-label="custom label"
  disabled
  chevron
  rounded
  inset
  bordered>
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
  <span slot="helpText">
    Helper text
  </span>
  <span slot="label">
    Name
  </span>
</auro-dropdown>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### error

Adds the error state UI to the trigger.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/error.html) -->
  <!-- The below content is automatically added from ./../apiExamples/error.html -->
  <auro-dropdown aria-label="custom label" error>
    Lorem ipsum solar
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

```html
<auro-dropdown aria-label="custom label" error>
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/errorBordered.html) -->
  <!-- The below content is automatically added from ./../apiExamples/errorBordered.html -->
  <auro-dropdown
    aria-label="custom label"
    inset
    error
    rounded
    bordered>
    Lorem ipsum solar
    <div slot="trigger">
      Trigger
    </div>
  </auro-dropdown>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/errorBordered.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/errorBordered.html -->

```html
<auro-dropdown
  aria-label="custom label"
  inset
  error
  rounded
  bordered>
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### fluid

The `fluid` property makes the trigger to have the full width.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/fluid.html) -->
  <!-- The below content is automatically added from ./../apiExamples/fluid.html -->
  <auro-dropdown aria-label="custom label" fluid>
    Lorem ipsum solar
    <div slot="trigger">
      <auro-input
        borderless
        slot="trigger"
        id="inputExampleTrigger">
      </auro-input>
    </div>
  </auro-dropdown>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/fluid.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/fluid.html -->

```html
<auro-dropdown aria-label="custom label" fluid>
  Lorem ipsum solar
  <div slot="trigger">
    <auro-input
      borderless
      slot="trigger"
      id="inputExampleTrigger">
    </auro-input>
  </div>
</auro-dropdown>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### inset

The `inset` property applies a predefined amount of CSS `padding` to the `trigger` slot content. Use this property to apply borderless style.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/inset.html) -->
  <!-- The below content is automatically added from ./../apiExamples/inset.html -->
  <auro-dropdown aria-label="custom label" inset>
    Lorem ipsum solar
    <div slot="trigger">
      Trigger
    </div>
  </auro-dropdown>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/inset.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/inset.html -->

```html
<auro-dropdown aria-label="custom label" inset>
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/insetBordered.html) -->
  <!-- The below content is automatically added from ./../apiExamples/insetBordered.html -->
  <auro-dropdown
    aria-label="custom label"
    inset
    rounded
    bordered>
    Lorem ipsum solar
    <div slot="trigger">
      Trigger
    </div>
  </auro-dropdown>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/insetBordered.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/insetBordered.html -->

```html
<auro-dropdown
  aria-label="custom label"
  inset
  rounded
  bordered>
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### rounded

The `rounded` property applies `border-radius` CSS to the trigger and default slot content.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/rounded.html) -->
  <!-- The below content is automatically added from ./../apiExamples/rounded.html -->
  <auro-dropdown
    aria-label="custom label"
    rounded
    bordered>
    Lorem ipsum solar
    <div slot="trigger">
      Trigger
    </div>
  </auro-dropdown>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/rounded.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/rounded.html -->

```html
<auro-dropdown
  aria-label="custom label"
  rounded
  bordered>
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### noToggle

In cases where it is desired behavior for `auro-dropdown` to only show, not toggle, the bib content when activating the trigger the `noToggle` attribute must be applied.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/noToggle.html) -->
  <!-- The below content is automatically added from ./../apiExamples/noToggle.html -->
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
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/noToggle.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/noToggle.html -->

```html
<auro-dropdown aria-label="custom label" noToggle>
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### mobileFullscreenBreakpoint

On mobile view, adding the `mobileFullscreenBreakpoint="{breakpoint-token}"` will switch the dropdown to fullscreen mode. 

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/customDimensions300.html) -->
  <!-- The below content is automatically added from ./../apiExamples/customDimensions300.html -->
  <style>
    #customDropdown300::part(size) {
      width: 300px;
      max-height: 200px;
    }
    </style>
  <div style="width: 300px;" aria-label="custom label">
    <auro-dropdown id="customDropdown300" inset bordered rounded chevron mobileFullscreenBreakpoint="sm">
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
    </auro-dropdown>
  </div>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/customDimensions300.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/customDimensions300.html -->

```html
<style>
  #customDropdown300::part(size) {
    width: 300px;
    max-height: 200px;
  }
  </style>
<div style="width: 300px;" aria-label="custom label">
  <auro-dropdown id="customDropdown300" inset bordered rounded chevron mobileFullscreenBreakpoint="sm">
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
  </auro-dropdown>
</div>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Slot Examples

#### trigger & default

All examples shown on this page include default and `trigger` slot content.

#### label

Content defined in the `label` slot will be rendered left aligned inside the trigger above all other defined trigger slot content.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/label.html) -->
  <!-- The below content is automatically added from ./../apiExamples/label.html -->
  <auro-dropdown
    bordered
    rounded
    inset
    chevron>
    Lorem ipsum solar
    <span slot="label">Name</span>
    <div slot="trigger">
      Trigger
    </div>
  </auro-dropdown>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/label.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/label.html -->

```html
<auro-dropdown
  bordered
  rounded
  inset
  chevron>
  Lorem ipsum solar
  <span slot="label">Name</span>
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### helpText

Content defined in the `helpText` slot will be rendered left aligned below the trigger.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/helpText.html) -->
  <!-- The below content is automatically added from ./../apiExamples/helpText.html -->
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
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/helpText.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/helpText.html -->

```html
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
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#####

When combined with the `error` property the `helpText` slot content is colored red.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/helpTextError.html) -->
  <!-- The below content is automatically added from ./../apiExamples/helpTextError.html -->
  <auro-dropdown
    aria-label="custom label"
    inset
    bordered
    rounded
    error>
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
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/helpTextError.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/helpTextError.html -->

```html
<auro-dropdown
  aria-label="custom label"
  inset
  bordered
  rounded
  error>
  Lorem ipsum solar
  <span slot="helpText">
    Helper text
  </span>
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Method Examples

#### show

The `show` method may also be called from anywhere in your code by executing `document.querySelector('#idOfTheDropdownElement').show()`. This example will execute the `show` method on a `keydown` event with focus in the input element.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/programmaticallyShow.html) -->
  <!-- The below content is automatically added from ./../apiExamples/programmaticallyShow.html -->
  <auro-input id="showExampleTriggerInput" required>
    <span slot="label">Enter a value to show the dropdown</span>
  </auro-input>
  <auro-dropdown id="showMethodExample" aria-label="custom label" fluid rounded bordered inset>
    <p>
      Lorem ipsum solar
    </p>
    <span slot="trigger">Trigger Label</span>
  </auro-dropdown>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/programmaticallyShow.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/programmaticallyShow.html -->

```html
<auro-input id="showExampleTriggerInput" required>
  <span slot="label">Enter a value to show the dropdown</span>
</auro-input>
<auro-dropdown id="showMethodExample" aria-label="custom label" fluid rounded bordered inset>
  <p>
    Lorem ipsum solar
  </p>
  <span slot="trigger">Trigger Label</span>
</auro-dropdown>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/programmaticallyShow.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/programmaticallyShow.js -->

```js
export function showExample() {
  const triggerInput = document.querySelector('#showExampleTriggerInput');
  const dropdownElem = document.querySelector('#showMethodExample');

  triggerInput.addEventListener('keydown', () => {
    dropdownElem.show();
  });
}
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### hide

The `hide` method can be called from within the default slot content. This is useful for cases such as `auro-select` when the dropdown should be collapsed after making a selection.

The `hide` method may also be called from anywhere in your code by executing `document.querySelector('#idOfTheDropdownElement').hide()`.

This example demonstrations collapsing the dropdown by clicking a button within the dropdown bib content.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/programmaticallyHide.html) -->
  <!-- The below content is automatically added from ./../apiExamples/programmaticallyHide.html -->
  <auro-dropdown id="hideExample" aria-label="custom label" fluid rounded bordered inset>
    <p>
      Lorem ipsum solar
    </p>
    <auro-button id="hideExampleBtn">
      Dismiss Dropdown
    </auro-button>
    <auro-input
      slot="trigger"
      id="hideExampleTrigger">
    </auro-input>
  </auro-dropdown>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/programmaticallyHide.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/programmaticallyHide.html -->

```html
<auro-dropdown id="hideExample" aria-label="custom label" fluid rounded bordered inset>
  <p>
    Lorem ipsum solar
  </p>
  <auro-button id="hideExampleBtn">
    Dismiss Dropdown
  </auro-button>
  <auro-input
    slot="trigger"
    id="hideExampleTrigger">
  </auro-input>
</auro-dropdown>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</auro-accordion>

### Other Examples

#### Width and Sizing Behavior

- **Width:** The `auro-dropdown` component will automatically consume the full width of its parent container. To make it narrower, you can style the `size` part.

- **Styling Options:** Only the following styles can be applied to the `size` part:
  - `width`
  - `height`
  - `maxWidth`
  - `maxHeight`

- **Scroll Behavior:** When the content exceeds the specified size, the browser will provide a scroll for the overflow.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/customDimensions100.html) -->
  <!-- The below content is automatically added from ./../apiExamples/customDimensions100.html -->
  <style>
    #customDropdown100::part(size) {
      width: 100px;
      max-height: 200px;
    }
  </style>
  <div style="width: 100px;" aria-label="custom label">
    <auro-dropdown id="customDropdown100" inset bordered rounded chevron>
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
    </auro-dropdown>
  </div>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/customDimensions100.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/customDimensions100.html -->

```html
<style>
  #customDropdown100::part(size) {
    width: 100px;
    max-height: 200px;
  }
</style>
<div style="width: 100px;" aria-label="custom label">
  <auro-dropdown id="customDropdown100" inset bordered rounded chevron>
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
  </auro-dropdown>
</div>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Truncated trigger component with fixed width

`auro-dropdown` trigger component will be truncated if the text is too long than its container width.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/truncatedText.html) -->
  <!-- The below content is automatically added from ./../apiExamples/truncatedText.html -->
  <div style="width: 250px;">
    <auro-dropdown common aria-label="Label content for screen reader">
      <div style="padding: var(--ds-size-150); width: 500px;">
        I really prefer Alaska Airlines for my vacation travels
      </div>
      <span slot="helpText">
        Help text
      </span>
      <div slot="trigger">
        I really prefer Alaska Airlines for my vacation travels
      </div>
    </auro-dropdown>
  </div>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/truncatedText.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/truncatedText.html -->

```html
<div style="width: 250px;">
  <auro-dropdown common aria-label="Label content for screen reader">
    <div style="padding: var(--ds-size-150); width: 500px;">
      I really prefer Alaska Airlines for my vacation travels
    </div>
    <span slot="helpText">
      Help text
    </span>
    <div slot="trigger">
      I really prefer Alaska Airlines for my vacation travels
    </div>
  </auro-dropdown>
</div>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### in Dialog

The component can be in a dialog.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/inDialog.html) -->
  <!-- The below content is automatically added from ./../apiExamples/inDialog.html -->
  <div>
    <auro-button id="dropdown-dialog-opener">Dropdown in Dialog</auro-button>
    <auro-dialog id="dropdown-dialog">
      <span slot="header">Dropdown in Dialog</span>
      <div slot="content">
        <auro-dropdown id="commonSlot" common bordered rounded inset chevron>
          <div style="padding: var(--ds-size-150);">
            Lorem ipsum solar
            <br />
            <auro-button onclick="document.querySelector('#commonSlot').hide()">
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
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/inDialog.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/inDialog.html -->

```html
<div>
  <auro-button id="dropdown-dialog-opener">Dropdown in Dialog</auro-button>
  <auro-dialog id="dropdown-dialog">
    <span slot="header">Dropdown in Dialog</span>
    <div slot="content">
      <auro-dropdown id="commonSlot" common bordered rounded inset chevron>
        <div style="padding: var(--ds-size-150);">
          Lorem ipsum solar
          <br />
          <auro-button onclick="document.querySelector('#commonSlot').hide()">
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
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/inDialog.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/inDialog.js -->

```js
export function inDialogExample() {
  document.querySelector("#dropdown-dialog-opener").addEventListener("click", () => {
    const dialog = document.querySelector("#dropdown-dialog");
    dialog.open = true;
  });
};
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Theme Support

The component may be restyled using the following code sample and changing the values of the following token(s).

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../src/styles/tokens.scss) -->
<!-- The below code snippet is automatically added from ./../src/styles/tokens.scss -->

```scss
@import '@aurodesignsystem/design-tokens/dist/tokens/SCSSVariables';

:host {
  --ds-auro-dropdown-help-text-color: var(--ds-color-text-secondary-default, #{$ds-color-text-secondary-default});
  --ds-auro-dropdown-label-text-color: var(--ds-color-text-secondary-default, #{$ds-color-text-secondary-default});
  --ds-auro-dropdown-popover-container-color: var(--ds-color-container-primary-default, #{$ds-color-container-primary-default});
  --ds-auro-dropdown-popover-border-color: transparent;
  --ds-auro-dropdown-popover-text-color: var(--ds-color-text-primary-default, #{$ds-color-text-primary-default});
  --ds-auro-dropdown-trigger-container-color: var(--ds-color-container-primary-default, #{$ds-color-container-primary-default});
  --ds-auro-dropdown-trigger-border-color: transparent;
  --ds-auro-dropdown-trigger-text-color: var(--ds-color-text-primary-default, #{$ds-color-text-primary-default});
  --ds-auro-dropdownbib-boxshadow-color: var(--ds-elevation-200, #{$ds-elevation-200});
  --ds-auro-dropdownbib-container-color: var(--ds-color-container-primary-default, #{$ds-color-container-primary-default});
  --ds-auro-dropdownbib-text-color: var(--ds-color-text-primary-default, #{$ds-color-text-primary-default});
}
```
<!-- AURO-GENERATED-CONTENT:END -->

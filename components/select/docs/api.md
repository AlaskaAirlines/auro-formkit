# auro-select

The auro-select element is a wrapper for auro-dropdown and auro-menu to create a dropdown menu control.

## Properties

| Property                        | Attribute                       | Type      | Default        | Description                                      |
|---------------------------------|---------------------------------|-----------|----------------|--------------------------------------------------|
| `autoPlacement`                 | `autoPlacement`                 | `boolean` | "false"        | If declared, bib's position will be automatically calculated where to appear. |
| `disabled`                      | `disabled`                      | `boolean` |                | When attribute is present, element shows disabled state. |
| `error`                         | `error`                         | `string`  |                | When defined, sets persistent validity to `customError` and sets `setCustomValidity` = attribute value. |
| `flexMenuWidth`                 | `flexMenuWidth`                 | `boolean` |                | If set, makes dropdown width match the size of the content, rather than the width of the trigger. |
| `fullscreenBreakpoint`          | `fullscreenBreakpoint`          | `string`  | "sm"           | Defines the screen size breakpoint (`xs`, `sm`, `md`, `lg`, `xl`, `disabled`)<br />at which the dropdown switches to fullscreen mode on mobile. `disabled` indicates a dropdown should _never_ enter fullscreen.<br /><br />When expanded, the dropdown will automatically display in fullscreen mode<br />if the screen size is equal to or smaller than the selected breakpoint. |
| `largeFullscreenHeadline`       | `largeFullscreenHeadline`       | `boolean` |                | If declared, make bib.fullscreen.headline in HeadingDisplay.<br />Otherwise, Heading 600 |
| `multiSelect`                   | `multiselect`                   | `boolean` |                | Sets multi-select mode, allowing multiple options to be selected at once. |
| `noCheckmark`                   | `noCheckmark`                   | `boolean` |                | When true, checkmark on selected option will no longer be present. |
| `noFlip`                        | `noFlip`                        | `boolean` | "false"        | If declared, the bib will NOT flip to an alternate position<br />when there isn't enough space in the specified `placement`. |
| `noValidate`                    | `noValidate`                    | `boolean` |                | If set, disables auto-validation on blur.        |
| `offset`                        | `offset`                        | `number`  | "0"            | Gap between the trigger element and bib.         |
| `onDark`                        | `onDark`                        | `boolean` |                | If declared, onDark styles will be applied to the trigger. |
| `optionSelected`                | `optionSelected`                |           |                | Specifies the current selected menuOption.       |
| `placement`                     | `placement`                     | `string`  | "bottom-start" | Position where the bib should appear relative to the trigger.<br />Accepted values:<br />"top" \| "right" \| "bottom" \| "left" \|<br />"bottom-start" \| "top-start" \| "top-end" \|<br />"right-start" \| "right-end" \| "bottom-end" \|<br />"left-start" \| "left-end" |
| `required`                      | `required`                      | `boolean` |                | Populates the `required` attribute on the element. Used for client-side validation. |
| `setCustomValidity`             | `setCustomValidity`             | `string`  |                | Sets a custom help text message to display for all validityStates. |
| `setCustomValidityCustomError`  | `setCustomValidityCustomError`  | `string`  |                | Custom help text message to display when validity = `customError`. |
| `setCustomValidityValueMissing` | `setCustomValidityValueMissing` | `string`  |                | Custom help text message to display when validity = `valueMissing`. |
| `validity`                      | `validity`                      | `string`  |                | Specifies the `validityState` this element is in. |
| `value`                         | `value`                         |           |                | Value selected for the component.                |

## Methods

| Method     | Type                                   | Description                                      |
|------------|----------------------------------------|--------------------------------------------------|
| `reset`    | `(): void`                             | Resets component to initial state.               |
| `validate` | `(force?: boolean \| undefined): void` | Validates value.<br /><br />**force**: Whether to force validation. |

## Events

| Event                       | Type               | Description                                      |
|-----------------------------|--------------------|--------------------------------------------------|
| `auroFormElement-validated` |                    | Notifies that the `validity` and `errorMessage` values have changed. |
| `auroSelect-valueSet`       | `CustomEvent<any>` | Notifies that the component has a new value set. |
| `input`                     | `CustomEvent<any>` | Notifies every time the value prop of the element is changed. |

## Slots

| Name                      | Description                                      |
|---------------------------|--------------------------------------------------|
|                           | Default slot for the menu content.               |
| `bib.fullscreen.headline` | Defines the headline to display above menu-options |
| `helpText`                | Defines the content of the helpText.             |
| `label`                   | Defines the content of the label.                |
| `placeholder`             | Defines the content of the placeholder to be shown when there is no value |

## CSS Shadow Parts

| Part       | Description                 |
|------------|-----------------------------|
| `helpText` | Apply CSS to the help text. |

# auro-combobox

## Properties

| Property                        | Attribute                       | Type      | Default     | Description                                      |
|---------------------------------|---------------------------------|-----------|-------------|--------------------------------------------------|
| `autocomplete`                  | `autocomplete`                  | `string`  |             | An enumerated attribute that defines what the user agent can suggest for autofill. At this time, only `autocomplete="off"` is supported. |
| `checkmark`                     | `checkmark`                     | `boolean` |             | When attribute is present auro-menu will apply checkmarks to selected options. |
| `disabled`                      | `disabled`                      | `boolean` |             | If set, disables the combobox.                   |
| `error`                         | `error`                         | `string`  |             | When defined, sets persistent validity to `customError` and sets the validation message to the attribute value. |
| `fullscreenBreakpoint`          | `fullscreenBreakpoint`          | `string`  | "sm"        | Defines the screen size breakpoint (`lg`, `md`, `sm`, or `xs`) at which the dropdown switches to fullscreen mode on mobile.<br />When expanded, the dropdown will automatically display in fullscreen mode if the screen size is equal to or smaller than the selected breakpoint. |
| `largeFullscreenHeadline`       | `largeFullscreenHeadline`       | `boolean` |             | If declared, make mobileHeadline in HeadingDisplay.<br />Otherwise, Heading 600 |
| `noFilter`                      | `noFilter`                      | `boolean` | false       | If set, combobox will not filter menuoptions based in input. |
| `noValidate`                    | `noValidate`                    | `boolean` |             | If set, disables auto-validation on blur.        |
| `optionSelected`                | `optionSelected`                | `object`  | "undefined" | Specifies the current selected option.           |
| `required`                      | `required`                      | `boolean` |             | Populates the `required` attribute on the input. Used for client-side validation. |
| `setCustomValidity`             | `setCustomValidity`             | `string`  |             | Sets a custom help text message to display for all validityStates. |
| `setCustomValidityCustomError`  | `setCustomValidityCustomError`  | `string`  |             | Custom help text message to display when validity = `customError`. |
| `setCustomValidityValueMissing` | `setCustomValidityValueMissing` | `string`  |             | Custom help text message to display when validity = `valueMissing`. |
| `triggerIcon`                   | `triggerIcon`                   | `boolean` |             | If set, the `icon` attribute will be applied to the trigger `auro-input` element. |
| `type`                          | `type`                          | `string`  |             | Applies the defined value as the type attribute on auro-input. |
| `validity`                      | `validity`                      | `string`  | "undefined" | Specifies the `validityState` this element is in. |
| `value`                         | `value`                         |           | "undefined" | Value selected for the dropdown menu.            |

## Methods

| Method     | Type                                   | Description                                      |
|------------|----------------------------------------|--------------------------------------------------|
| `focus`    | `(): void`                             | Focuses the combobox trigger input.              |
| `reset`    | `(): void`                             | Resets component to initial state.               |
| `validate` | `(force?: boolean \| undefined): void` | Validates value.<br /><br />**force**: Whether to force validation. |

## Events

| Event                       | Type               | Description                                      |
|-----------------------------|--------------------|--------------------------------------------------|
| `auroCombobox-valueSet`     | `CustomEvent<any>` | Notifies that the component has a new value set. |
| `auroFormElement-validated` |                    | Notifies that the component value(s) have been validated. |

## Slots

| Name                      | Description                                      |
|---------------------------|--------------------------------------------------|
|                           | Default slot for the menu content.               |
| `bib.fullscreen.headline` | Defines the headline to display above menu-options |
| `helpText`                | Defines the content of the helpText.             |
| `label`                   | Defines the content of the label.                |

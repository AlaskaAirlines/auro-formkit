# auro-dropdown

The `auro-dropdown` element provides a way to place content in a bib that can be toggled.

## Properties

| Property                  | Attribute                 | Type                                             | Default          | Description                                      |
|---------------------------|---------------------------|--------------------------------------------------|------------------|--------------------------------------------------|
| `a11yRole`                |                           | `string`                                         | "'button'"       | Sets the ARIA role of the trigger, such as `combobox` when the trigger shows a chosen value and opens a list of options (the trigger's `role`).<br />Applies only when the `trigger` slot content isn't focusable.<br />With any role other than `button`, the trigger also gets `aria-expanded` and `aria-controls`, and `combobox` adds `aria-haspopup="listbox"`. |
| `appearance`              | `appearance`              | `'default' \| 'inverse'`                         | "'default'"      | Sets the colors for the background the dropdown sits on.<br />Use `inverse` on dark backgrounds and `default` everywhere else. |
| `autoPlacement`           | `autoplacement`           | `boolean`                                        |                  | Deprecated: Use `placement` instead.<br />Moves the bib to whichever side of the trigger has the most space.<br />The bib already flips to the opposite side when it doesn't fit, unless `noFlip` is set. |
| `chevron`                 | `chevron`                 | `boolean`                                        |                  | Shows a chevron after the trigger content that points up while the bib is open and down while it's closed. |
| `desktopModal`            | `desktopmodal`            | `boolean`                                        |                  | Makes the open bib act as a modal dialog when it isn't fullscreen.<br />Keyboard focus stays in the bib, and the rest of the page can't be used until the bib closes. |
| `disableEventShow`        | `disableeventshow`        | `boolean`                                        |                  | Stops the trigger from opening or closing the bib, so the bib opens only when you call `show()`. |
| `disableKeyboardHandling` | `disablekeyboardhandling` | `boolean`                                        |                  | Stops the dropdown from handling Enter and Space on the trigger, and Escape while the bib isn't fullscreen, so you can handle those keys yourself.<br />Set it before the dropdown first renders, because changing it later has no effect until the dropdown is removed from the page and added again. |
| `disabled`                | `disabled`                | `boolean`                                        |                  | Turns the dropdown off.<br />The trigger is shown in a muted style and can't open the bib, and an open bib closes. |
| `dropdownWidth`           | `dropdownwidth`           | `number`                                         |                  | Sets the width of the bib in pixels.<br />The dropdown doesn't currently apply this value to the bib itself. |
| `error`                   | `error`                   | `boolean`                                        |                  | Shows the trigger in an error style.<br />Doesn't show a message, so put one in the `helpText` slot. |
| `errorMessage`            | `errormessage`            | `string`                                         | "undefined"      | Sets the message for the current validation error.<br />The dropdown doesn't currently show this message; put the text in the `helpText` slot to show it. |
| `focusShow`               | `focusshow`               | `boolean`                                        |                  | Opens the bib when the trigger gets focus.       |
| `fullscreenBreakpoint`    | `fullscreenbreakpoint`    | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'disabled'` |                  | Sets the screen width, such as `sm`, at or below which the open bib fills the screen as a modal dialog.<br />When not set, or set to `disabled`, the bib never goes fullscreen. |
| `hoverToggle`             | `hovertoggle`             | `boolean`                                        |                  | Opens the bib when the pointer moves onto the trigger and closes it when the pointer leaves.<br />Doesn't currently work as an HTML attribute, because the dropdown clears it when it first renders; set the property in JavaScript after that instead. |
| `isBibFullscreen`         | `isbibfullscreen`         | `boolean`                                        | false            | Marks the bib as fullscreen.<br />The dropdown sets this itself from `fullscreenBreakpoint` and the screen width. |
| `isPopoverVisible`        | `open`                    | `boolean`                                        | false            | Marks the bib as open, and reflects as the `open` attribute.<br />To open or close the bib, call `show()` or `hide()` instead of setting this directly. |
| `layout`                  | `layout`                  | `'classic' \| 'emphasized' \| 'snowflake'`       | "undefined"      | Sets the trigger's overall style.<br />Use `classic` for the standard look, and `emphasized` or `snowflake` only on dark backgrounds.<br />When not set, the classic layout styles aren't applied, so set `classic` explicitly. |
| `matchWidth`              | `matchwidth`              | `boolean`                                        | false            | Makes the bib the same width as the trigger.     |
| `noFlip`                  | `noflip`                  | `boolean`                                        |                  | Keeps the bib at its `placement` when there isn't enough space, instead of flipping it to the opposite side. |
| `noHideOnThisFocusLoss`   | `nohideonthisfocusloss`   | `boolean`                                        | false            | Keeps the bib open when focus moves outside the dropdown.<br />Clicking outside the dropdown or pressing Escape still closes it. |
| `noToggle`                | `notoggle`                | `boolean`                                        |                  | Makes the trigger only open the bib, not close it.<br />Pressing Escape or moving focus away still closes the bib. |
| `offset`                  | `offset`                  | `number`                                         | "0"              | Sets the gap between the trigger and the bib in pixels, such as `8`. |
| `onDark`                  | `ondark`                  | `boolean`                                        |                  | Deprecated: Use `appearance="inverse"` instead.<br />Shows the dropdown in colors designed for dark backgrounds. |
| `onSlotChange`            |                           | `() => void`                                     |                  | Sets a function to call when the content in the default slot changes. |
| `placement`               | `placement`               | `'top' \| 'right' \| 'bottom' \| 'left' \| 'bottom-start' \| 'top-start' \| 'top-end' \| 'right-start' \| 'right-end' \| 'bottom-end' \| 'left-start' \| 'left-end'` | "'bottom-start'" | Sets where the bib opens relative to the trigger, such as `bottom-start` for below the trigger, lined up with its start edge.<br />The bib flips to the opposite side when there isn't room, unless `noFlip` is set. |
| `shape`                   | `shape`                   | `'box' \| 'classic' \| 'pill' \| 'pill-left' \| 'pill-right' \| 'rounded' \| 'snowflake'` | "undefined"      | Sets the shape of the trigger.<br />Applies only when `size` is also set.<br />Match it to the layout: `classic` for the `classic` layout; `pill`, `pill-left`, or `pill-right` for the `emphasized` layout; and `snowflake` for the `snowflake` layout. |
| `shift`                   | `shift`                   | `boolean`                                        |                  | Slides the bib along the trigger's edge to keep it inside the viewport. |
| `simple`                  | `simple`                  | `boolean`                                        |                  | Removes the trigger's border, background, and shadow.<br />Applies only when `shape` and `size` are both set. |
| `size`                    | `size`                    | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`           | "undefined"      | Sets the height of the trigger, from `xs`, the shortest, to `xl`, the tallest.<br />Applies only when `shape` is also set.<br />The `classic` and `snowflake` shapes have a fixed height, so `size` doesn't change them. |
| `tabIndex`                | `tabindex`                | `number`                                         |                  | Sets the trigger's position in the keyboard tab order (the trigger's `tabindex`).<br />Applies only when the `trigger` slot content isn't focusable. |

## Methods

| Method           | Type       | Description                                      |
|------------------|------------|--------------------------------------------------|
| `exposeCssParts` | `(): void` | Re-exports the `trigger`, `chevron`, `helpText`, and `size` CSS parts as `dropdownTrigger`, `dropdownChevron`, `dropdownHelpText`, and `dropdownSize`, so a component that wraps the dropdown can expose them. The `trigger` and `helpText` parts aren't currently rendered. |
| `focus`          | `(): void` | Moves focus to the first focusable element in the bib when it's open, or to the trigger when it's closed. |
| `hide`           | `(): void` | Closes the bib.                                  |
| `show`           | `(): void` | Opens the bib.                                   |

## Events

| Event                       | Type                          | Description                                      |
|-----------------------------|-------------------------------|--------------------------------------------------|
| `auroDropdown-idAdded`      | `CustomEvent<{ id: string }>` | Notifies that the dropdown has an ID you can use to reference its bib, such as in `aria-controls`. The detail's `id` is the dropdown's own `id`, generated when not set, and the bib's ID is that value followed by `-floater-bib`. |
| `auroDropdown-toggled`      |                               | Notifies that the bib opened or closed.          |
| `auroDropdown-triggerClick` | `CustomEvent<any>`            | Notifies that the trigger was clicked, or activated with Enter or Space. |

## Slots

| Name       | Description                                      |
|------------|--------------------------------------------------|
|            | Content shown in the bib, such as a list of options or a short form. {@requiredWhen always} {@category ui} |
| `helpText` | Text shown below the trigger to help people understand or fill in the dropdown. {@category ui} |
| `trigger`  | Content people select to open and close the bib, such as text, an icon, or a button. When this content isn't focusable, screen readers also use it as the trigger's name. {@requiredWhen always} {@category ui} |

## CSS Shadow Parts

| Part       | Description                                      |
|------------|--------------------------------------------------|
| `chevron`  | The container for the icon that shows whether the bib is open. Exists only when `chevron` is set. |
| `helpText` | The help text container. Not currently rendered, so styles set on it have no effect; style the content in the `helpText` slot instead. |
| `size`     | A hidden sizing element whose `width`, `height`, `max-width`, and `max-height` are copied to the bib. Applies only when `matchWidth` is set. |
| `trigger`  | The trigger content container. Not currently rendered, so styles set on it have no effect; use `wrapper` instead. |
| `wrapper`  | The trigger wrapper element surrounding the trigger content and chevron. |

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/api.md) -->
<!-- The below content is automatically added from ./../docs/api.md -->

# auro-counter

A counter that lets people choose a number, such as how many passengers are traveling, with minus and plus buttons.

**Key capabilities**
- **Range limits**: The `min` and `max` attributes set the lowest and highest values, and the matching button turns off at each limit.
- **Keyboard support**: The counter is a single tab stop, and the Up Arrow and Down Arrow keys change its value.
- **Supporting text**: The `description` and `helpText` slots add text below the label.
- **Error state**: The `error` attribute marks the counter invalid and shows its value as the error message.
- **Dark backgrounds**: Set `appearance="inverse"` to use the counter on dark backgrounds.

**Example**

<pre class="language-html"><code class="language-html">&lt;auro-counter&gt;
  Adults
  &lt;span slot="ariaLabel.minus"&gt;Remove adult&lt;/span&gt;
  &lt;span slot="ariaLabel.plus"&gt;Add adult&lt;/span&gt;
&lt;/auro-counter&gt;</code></pre>

### Properties and attributes

| Properties | Attributes | Modifiers | Type                   | Default   | Category | Range | Description                                                                                                                                                                                                                                                                                                                               |
| ---------- | ---------- | --------- | ---------------------- | --------- | -------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| appearance | appearance |           | `default` \| `inverse` | `default` | ui       |       | Sets the colors to match the background behind the counter. Use `inverse` on dark backgrounds and `default` on light ones.                                                                                                                                                                                                                |
| disabled   | disabled   |           | boolean                |           | ui       |       | Turns the counter off. A disabled counter is shown in a muted style, its buttons can't be clicked, and it's removed from the keyboard tab order.                                                                                                                                                                                          |
| onDark     | ondark     |           | boolean                |           | ui       |       | Deprecated: Use `appearance="inverse"` instead.<br>Shows the counter in colors for dark backgrounds.                                                                                                                                                                                                                                      |
| error      | error      |           | string                 |           | behavior |       | Sets a custom error message, such as "Select at least one adult", and marks the counter invalid. The message replaces the help text. Set the `error` attribute before the counter first renders, or call `validate()` after changing it: setting only the property, or changing the attribute later, doesn't currently update `validity`. |
| max        | max        |           | number                 | `9`       | behavior | 0–9   | Sets the highest value the counter allows. The plus button turns off at this value.                                                                                                                                                                                                                                                       |
| min        | min        |           | number                 | `0`       | behavior | 0–9   | Sets the lowest value the counter allows. The counter starts at this value, and the minus button turns off at it.                                                                                                                                                                                                                         |
| name       | name       |           | string                 |           | behavior |       | Sets the key for this counter's entry in the group's `value` object, such as `adults`. Applies only inside `auro-counter-group`, which uses `counter-0`, `counter-1`, and so on for counters without a name.                                                                                                                              |
| validity   | validity   | readonly  | string                 |           | behavior |       | Reports whether the counter passes validation: `valid`, or the reason it fails, such as `customError`, `rangeOverflow`, or `rangeUnderflow`.                                                                                                                                                                                              |
| value      | value      |           | number \| undefined    |           | behavior |       | Sets the counter's value. A value outside `min` and `max` (0–9 by default) isn't moved back into range; it marks the counter invalid instead. A value that's `undefined`, `null`, or not a number clears the value to `undefined`.                                                                                                        |

### Methods

| Name      | Parameters                                                                                                                       | Return | Description                                                                                                                                                     |
| --------- | -------------------------------------------------------------------------------------------------------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| decrement | `value` (number) - The amount to subtract. Defaults to 1.                                                                        | void   | Decreases the value by 1, or by the given amount. Does nothing when the counter is disabled or already at its minimum, and doesn't stop a larger step at `min`. |
| increment | `value` (number) - The amount to add. Defaults to 1.                                                                             | void   | Increases the value by 1, or by the given amount. Does nothing when the counter is disabled or already at its maximum, and doesn't cap a larger step at `max`.  |
| register  | `name` (string) - The tag name to register the element under.                                                                    |        | Registers the custom element with the browser.                                                                                                                  |
| reset     | None                                                                                                                             | void   | Sets the value back to `min` and clears the counter's validation state. A counter with the `error` attribute stays invalid.                                     |
| validate  | `force` (boolean) - If true, validates even while the counter has focus. If false, skips validation while the counter has focus. |        | Checks the counter's value against `min`, `max`, and the `error` attribute, and updates `validity`.                                                             |

### Events

| Name  | Description                                                                                                                                                                                    |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| input | Fires whenever `value` changes, including when the counter sets its starting value, with the new number in `event.detail.value`. It doesn't currently bubble, so listen on the counter itself. |

### Slots

| Name            | Category | Required | Description                                                                                                                     |
| --------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| ariaLabel.minus | a11y     | Yes      | Text screen readers announce for the minus button, such as "Remove adult". Defaults to "−" (a minus sign).                      |
| ariaLabel.plus  | a11y     | Yes      | Text screen readers announce for the plus button, such as "Add adult". Defaults to "+".                                         |
| default         | ui       | Yes      | The counter's label, such as "Adults". Screen readers read it, with any `description`, as the counter's name.                   |
| description     | ui       |          | Short supporting text shown below the label, such as "18 years or older". Screen readers read it as part of the counter's name. |
| helpText        | ui       |          | Extra guidance shown below the counter. An error message replaces it while the counter is invalid.                              |

### CSS shadow parts

| Name           | Description                                                                                |
| -------------- | ------------------------------------------------------------------------------------------ |
| controlMinus   | The minus button, which lowers the value by 1.                                             |
| controlPlus    | The plus button, which raises the value by 1.                                              |
| counterControl | The spinbutton element that holds the minus button, the value, and the plus button.        |
| helpText       | The paragraph that shows the help text, or the error message while the counter is invalid. |

# auro-counter-group

Groups related counters, such as passenger types, so they share one total and one set of limits.

**Key capabilities**
- **Shared limits**: The `min` and `max` attributes limit the total of all counters, and every counter's minus or plus button turns off when the total reaches a limit.
- **Combined value**: The `value` property holds each counter's number, keyed by its `name`, and `total` adds them up.
- **Dropdown**: The `isDropdown` attribute shows the counters in a dropdown with a label and a summary of their values, which fills the screen on small screens.
- **Combined errors**: In a dropdown, the group's help text shows the error messages of every invalid counter.
- **Dark backgrounds**: Set `appearance="inverse"` to use the group on dark backgrounds.

**Example**

<pre class="language-html"><code class="language-html">&lt;auro-counter-group max="9"&gt;
  &lt;auro-counter name="adults"&gt;
    Adults
    &lt;span slot="ariaLabel.minus"&gt;Remove adult&lt;/span&gt;
    &lt;span slot="ariaLabel.plus"&gt;Add adult&lt;/span&gt;
  &lt;/auro-counter&gt;
  &lt;auro-counter name="children"&gt;
    Children
    &lt;span slot="ariaLabel.minus"&gt;Remove child&lt;/span&gt;
    &lt;span slot="ariaLabel.plus"&gt;Add child&lt;/span&gt;
  &lt;/auro-counter&gt;
&lt;/auro-counter-group&gt;</code></pre>

### Properties and attributes

| Properties              | Attributes              | Modifiers | Type                                                                                                                                                               | Default        | Category | Relevant when | Description                                                                                                                                                                                                              |
| ----------------------- | ----------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- | -------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| appearance              | appearance              |           | `default` \| `inverse`                                                                                                                                             | `default`      | ui       |               | Sets the colors to match the background behind the group. Use `inverse` on dark backgrounds and `default` on light ones.                                                                                                 |
| fullscreenBreakpoint    | fullscreenbreakpoint    |           | `xs` \| `sm` \| `md` \| `lg` \| `xl` \| `disabled`                                                                                                                 | `sm`           | ui       | `isDropdown`  | Sets the largest screen size at which the open dropdown fills the screen. Use `disabled` to keep it as a dropdown on every screen size. Applies only when `isDropdown` is set.                                           |
| isDropdown              | isdropdown              |           | boolean                                                                                                                                                            | `false`        | ui       |               | Shows the counters in a dropdown with a label and a summary of their values. Use it to save space in forms.                                                                                                              |
| largeFullscreenHeadline | largefullscreenheadline |           | boolean                                                                                                                                                            | `false`        | ui       | `isDropdown`  | Shows the fullscreen dropdown's headline in a larger heading style. Applies only when `isDropdown` is set.                                                                                                               |
| layout                  | layout                  |           | `classic` \| `snowflake`                                                                                                                                           | `classic`      | ui       | `isDropdown`  | Sets the dropdown's layout. Use `classic` for most forms, and `snowflake` only on dark backgrounds with `appearance="inverse"`. Applies only when `isDropdown` is set.                                                   |
| matchWidth              | matchwidth              |           | boolean                                                                                                                                                            | `false`        | ui       | `isDropdown`  | Makes the open dropdown the same width as its trigger. Without it, the dropdown's content sets its width. Applies only when `isDropdown` is set.                                                                         |
| noFlip                  | noflip                  |           | boolean                                                                                                                                                            | `false`        | ui       | `isDropdown`  | Keeps the open dropdown on the side set by `placement`, even when there isn't enough space there. Without it, the dropdown flips to the opposite side. Applies only when `isDropdown` is set.                            |
| offset                  | offset                  |           | number                                                                                                                                                             |                | ui       | `isDropdown`  | Sets the gap in pixels between the trigger and the open dropdown, such as `20`. Uses `0` when not set. Applies only when `isDropdown` is set.                                                                            |
| placement               | placement               |           | `top` \| `right` \| `bottom` \| `left` \| `bottom-start` \| `top-start` \| `top-end` \| `right-start` \| `right-end` \| `bottom-end` \| `left-start` \| `left-end` | `bottom-start` | ui       | `isDropdown`  | Sets where the open dropdown appears relative to its trigger. The first word is the side, and `-start` or `-end` lines the dropdown up with the start or end edge of the trigger. Applies only when `isDropdown` is set. |
| shape                   | shape                   |           | `box` \| `classic` \| `pill` \| `pill-left` \| `pill-right` \| `rounded` \| `snowflake`                                                                            | `classic`      | ui       | `isDropdown`  | Sets the shape of the dropdown. Defaults to `snowflake` when `layout="snowflake"`, and to `classic` otherwise. Applies only when `isDropdown` is set.                                                                    |
| shift                   | shift                   |           | boolean                                                                                                                                                            | `false`        | ui       | `isDropdown`  | Moves the open dropdown along its side so the edge of the screen doesn't cut it off. Applies only when `isDropdown` is set.                                                                                              |
| size                    | size                    |           | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                                                                                                               | `xl`           | ui       | `isDropdown`  | Sets the size of the dropdown. Defaults to `lg` when `layout="snowflake"`, and to `xl` otherwise. Applies only when `isDropdown` is set.                                                                                 |
| autoPlacement           | autoplacement           |           | boolean                                                                                                                                                            | `false`        | ui       | `isDropdown`  | Deprecated: Use `placement` instead.<br>Moves the open dropdown to whichever side of the trigger has the most space. Applies only when `isDropdown` is set.                                                              |
| onDark                  | ondark                  |           | boolean                                                                                                                                                            | `false`        | ui       |               | Deprecated: Use `appearance="inverse"` instead.<br>Shows the group in colors for dark backgrounds.                                                                                                                       |
| max                     | max                     |           | number                                                                                                                                                             | `undefined`    | behavior |               | Sets the highest total allowed across all counters. When the total reaches it, every counter's plus button turns off.                                                                                                    |
| min                     | min                     |           | number                                                                                                                                                             | `undefined`    | behavior |               | Sets the lowest total allowed across all counters. When the total is at or below it, every counter's minus button turns off.                                                                                             |
| total                   |                         | readonly  | number                                                                                                                                                             | `undefined`    | behavior |               | Gets the sum of every counter's value, such as `3` for 2 adults and 1 child.                                                                                                                                             |
| validity                | validity                | readonly  | string                                                                                                                                                             | `undefined`    | behavior |               | Gets the group's validation result: `valid`, or the first invalid counter's reason, such as `customError` or `rangeOverflow`.                                                                                            |
| value                   |                         | readonly  | Record<string, number>                                                                                                                                             | `undefined`    | behavior |               | Gets each counter's value, keyed by the counter's `name`, such as `{ adults: 2, children: 1 }`. Counters without a `name` use `counter-0`, `counter-1`, and so on.                                                       |

### Methods

| Name                        | Parameters                                                                                                                                                                         | Return | Description                                                                                                                                                                                                                |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| hideBib                     | None                                                                                                                                                                               | void   | Closes the dropdown if it's open. Does nothing unless `isDropdown` is set.                                                                                                                                                 |
| register                    | `name` (string) - The tag name to register the element under.                                                                                                                      |        | Registers the custom element with the browser.                                                                                                                                                                             |
| reset                       | None                                                                                                                                                                               | void   | Resets every counter to its `min` value and clears the group's validation state.<br>The group stays invalid while any counter has the `error` attribute.<br>`value` and `total` update as each counter finishes resetting. |
| resetLayoutClasses          | None                                                                                                                                                                               | void   | Sets the `layout-*` class on the `.wrapper` element to match the current `layout`, such as `layout-classic`. Does nothing when `layout` isn't set or there's no `.wrapper` element.                                        |
| resetShapeClasses           | None                                                                                                                                                                               | void   | Sets the `shape-*` class on the `.wrapper` element to match the current `shape` and `size`, such as `shape-rounded-lg`, or to `shape-none` when either isn't set. Does nothing when there's no `.wrapper` element.         |
| showBib                     | None                                                                                                                                                                               | void   | Opens the dropdown if it's closed. Does nothing unless `isDropdown` is set.                                                                                                                                                |
| updateComponentArchitecture | None                                                                                                                                                                               | void   | Updates the `layout-*` and `shape-*` classes on the `.wrapper` element. Called whenever `layout`, `shape`, or `size` changes, unless a subclass overrides `updated()` without calling `super.updated()`.                   |
| validate                    | `force` (boolean) - If true, runs the group's own check even while it has focus. If false, skips that check while the group has focus; `validity` still updates from the counters. |        | Updates the group's `validity` from its counters and fires `auroFormElement-validated`.                                                                                                                                    |

### Events

| Name                      | Description                                                                                                                                             |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| auroFormElement-validated | Fires each time the group is validated, with the result in `event.detail.validity` and `event.detail.message`.                                          |
| input                     | Fires when any counter's value changes, with the new `total` and `value` in `event.detail`. It doesn't currently bubble, so listen on the group itself. |

### Slots

| Name                    | Category | Required     | Relevant when | Description                                                                                                                                         |
| ----------------------- | -------- | ------------ | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| ariaLabel.bib.close     | a11y     | `isDropdown` | `isDropdown`  | Text screen readers announce for the close button in the fullscreen dropdown, such as "Close passenger selector". Defaults to "Close".              |
| bib.fullscreen.footer   | ui       |              | `isDropdown`  | Content shown at the bottom of the fullscreen dropdown, such as Reset and Save buttons. Applies only when `isDropdown` is set.                      |
| bib.fullscreen.headline | ui       | `isDropdown` | `isDropdown`  | The heading shown at the top of the fullscreen dropdown, such as "Passengers". Applies only when `isDropdown` is set.                               |
| default                 | ui       | Yes          |               | The `auro-counter` elements in the group.                                                                                                           |
| helpText                | ui       |              | `isDropdown`  | Extra guidance shown below the dropdown. An error message replaces it while any counter is invalid. Applies only when `isDropdown` is set.          |
| label                   | ui       | `isDropdown` | `isDropdown`  | The label shown in the dropdown trigger, such as "Passengers". Applies only when `isDropdown` is set.                                               |
| typeIcon                | ui       |              | `isDropdown`  | An icon shown at the start of the dropdown trigger, such as a person icon for a passenger selector. Applies only when `isDropdown` is set.          |
| valueText               | ui       |              | `isDropdown`  | Custom text shown in the dropdown trigger in place of the default summary of each counter's value and label. Applies only when `isDropdown` is set. |

### CSS shadow parts

| Name     | Description                                                                                                                               |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| dropdown | The dropdown element, rendered when `isDropdown` is set.                                                                                  |
| helpText | The paragraph that shows the help text, or the combined error message while a counter is invalid. Rendered only when `isDropdown` is set. |
<!-- AURO-GENERATED-CONTENT:END -->

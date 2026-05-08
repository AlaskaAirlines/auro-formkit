# Manual Testing — auro-menu / auro-menuoption

## auro-menuoption

### Mouse Interactions

[ ] Hover over a menu option — verify it highlights (active visual state)
[ ] Click a menu option — verify it becomes selected (checkmark appears if not noCheckmark)
[ ] Click a disabled menu option — verify no selection change occurs and no highlight
[ ] Click a selected option (single-select) — verify it remains selected (no deselect unless allowDeselect)
[ ] Click a selected option with allowDeselect — verify it deselects
[ ] Mouse away from an option — verify the highlight clears

### Keyboard Interactions

Note: auro-menuoption is not designed for standalone keyboard use. It receives keyboard navigation from the parent auro-select or auro-combobox via `aria-activedescendant`. The following tests apply when the menu is used within a select or combobox context:

[ ] Arrow Down — verify the next option highlights
[ ] Arrow Up — verify the previous option highlights
[ ] Arrow keys skip disabled options — verify focus jumps over disabled options
[ ] Enter on a highlighted option — verify it becomes selected

### Touch / Tap Interactions

[ ] Tap a menu option — verify it becomes selected
[ ] Tap a disabled menu option — verify no change
[ ] Tap a selected option — verify behavior matches single-select or multi-select mode

### Property States

#### `selected`
[ ] Set selected attribute — verify the option renders as selected on load
[ ] Remove selected — verify the option renders as unselected

#### `disabled`
[ ] Set disabled — verify the option is visually grayed out and non-interactive
[ ] Remove disabled — verify the option becomes interactive

#### `value`
[ ] Set value — verify the value is passed to the menu and parent component when selected

#### `key`
[ ] Set key — verify option selection can be matched by key instead of value

### Accessibility

[ ] Verify each option has role="option"
[ ] Verify selected options have aria-selected="true"
[ ] Verify disabled options have aria-disabled="true"
[ ] Verify the option text content is announced by screen readers

### Slots

[ ] Set custom content in the default slot — verify it renders as the option text
[ ] Include an icon with the option text — verify it renders alongside the text

---

## auro-menu

### Mouse Interactions

[ ] Click an option in a single-select menu — verify it selects and the menu value updates
[ ] Click a different option — verify the previous selection clears and the new option is selected
[ ] Click an option in a multi-select menu — verify it toggles selected without deselecting others
[ ] Click multiple options — verify all clicked options show as selected
[ ] Click a disabled option — verify no selection change
[ ] Hover over options — verify proper visual highlighting

### Keyboard Interactions (within select/combobox context)

[ ] Arrow Down — verify the active option moves to the next non-disabled option
[ ] Arrow Up — verify the active option moves to the previous non-disabled option
[ ] Arrow Down at the end of the list — verify it wraps to the first option
[ ] Arrow Up at the beginning — verify it wraps to the last option
[ ] Enter on the active option — verify it selects the option
[ ] Home — verify the first option becomes active
[ ] End — verify the last option becomes active
[ ] Type-ahead — verify typing a character moves focus to the next option starting with that character

### Touch / Tap Interactions

[ ] Tap an option — verify it selects
[ ] Tap a selected option in multi-select — verify it deselects
[ ] Tap a disabled option — verify no change

### Property States

#### `value`
[ ] Set value programmatically — verify the matching option becomes selected
[ ] Read value after user selects an option — verify it matches the selected option's value
[ ] In multi-select, verify value returns a JSON stringified array of selected values

#### `multiSelect`
[ ] Set multiSelect — verify multiple options can be selected simultaneously
[ ] Remove multiSelect — verify only one option can be selected at a time

#### `allowDeselect`
[ ] Set allowDeselect in single-select mode — verify clicking a selected option deselects it

#### `noCheckmark`
[ ] Set noCheckmark — verify selected options do not show a checkmark indicator

#### `disabled`
[ ] Set disabled on the menu — verify all options are disabled

#### `loading`
[ ] Set loading — verify the loading state displays (loadingIcon and loadingText slots)
[ ] Remove loading — verify the menu options appear

#### `matchWord`
[ ] Set matchWord with a string — verify matching parts of option text are visually highlighted

### Events

[ ] Select an option — verify `auroMenu-selectedOption` event fires with the selected option details
[ ] Activate (highlight) an option — verify `auroMenu-activatedOption` event fires
[ ] Set loading — verify `auroMenu-loadingChange` event fires
[ ] Attempt to set a value that doesn't match any option — verify `auroMenu-selectValueFailure` fires

### Accessibility

[ ] Verify the menu has role="listbox"
[ ] Verify each option has role="option"
[ ] Verify selected options announce "selected" via screen reader
[ ] Verify disabled options announce "disabled" via screen reader
[ ] Verify active option is tracked via aria-activedescendant on the parent
[ ] Verify color contrast meets WCAG 2.1 AA

### Slots

[ ] Place auro-menuoption elements in the default slot — verify they render as selectable options
[ ] Place `<hr>` elements between options — verify they render as visual dividers
[ ] Set custom content in the `loadingText` slot — verify it displays during loading state
[ ] Set custom content in the `loadingIcon` slot — verify it displays during loading state

### Public Methods

[ ] Call `reset()` — verify the menu returns to its initial state (selections cleared)
[ ] Call `updateActiveOption(option)` — verify the specified option becomes active

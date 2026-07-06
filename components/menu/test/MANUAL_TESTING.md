# Manual Testing — auro-menu / auro-menuoption

**Key symbols:** ↓ = ArrowDown · ↑ = ArrowUp · ↵ = Enter · ⇥ = Tab

## auro-menuoption

### Mouse Interactions

- [ ] Hover over a menu option — verify it highlights (active visual state)
- [ ] Click a menu option — verify it becomes selected (checkmark appears if not `noCheckmark`)
- [ ] Click a disabled menu option — verify no selection change occurs and no highlight
- [ ] Click a selected option (single-select) — verify it remains selected (no deselect behavior)
- [ ] Move the mouse from one option to another — verify the previous option's active highlight clears when the new option gains active state
- [ ] Move the mouse off the menu entirely (without hovering another option) — verify the active highlight does NOT clear

### Keyboard Interactions

Note: `auro-menuoption` is not designed for standalone keyboard use. It receives its active state from the parent `auro-menu` (which is driven by `auro-select` / `auro-combobox` via `aria-activedescendant`). See [keyboard-behavior.md](../docs/pages/keyboard-behavior.md) for the full key/state matrix — the checks below cover what should be visible at the option level.

- [ ] ↓ / ↑ lands on an enabled option → the option renders with the active highlight style.
- [ ] ↓ / ↑ moves off an option → the previous option's active highlight clears.
- [ ] ↓ / ↑ passes over a `disabled` option → it is skipped; active state lands on the next enabled option.
- [ ] ↓ / ↑ passes over a `hidden` or `static` option → it is skipped; active state lands on the next enabled option.
- [ ] ↵ on the active option → it renders as selected (checkmark appears unless `noCheckmark`).

### Touch / Tap Interactions

- [ ] Tap a menu option — verify it becomes selected
- [ ] Tap a disabled menu option — verify no change
- [ ] Tap a selected option — verify behavior matches single-select or multi-select mode

### Property States

#### `selected`
- [ ] Set `selected` in markup — verify the option renders as selected on initial load
- [ ] Remove `selected` — verify the option renders as unselected
- [ ] Toggle `selected` on an option imperatively at runtime (via devtools) — verify the menu's `value` / `optionSelected` do not change to match; after the next menu-driven update (e.g., selecting an option via click/↵ or calling `menu.selectByValue()`), the option's `selected` state is re-stamped to match the menu state

#### `disabled`
- [ ] Set `disabled` — verify the option is visually grayed out and non-interactive
- [ ] Remove `disabled` — verify the option becomes interactive

#### `value`
- [ ] Set `value` — verify the value is passed to the menu and parent component when selected

#### `noCheckmark`
- [ ] Set `noCheckmark` on a single option — verify that option does not render a checkmark when selected
- [ ] Set `noCheckmark` on the parent `<auro-menu>` — verify it propagates to all nested options

#### `noMatch` (attribute: `nomatch`)
- [ ] Set `nomatch` on an option — verify the option renders as the "no matching results" placeholder used by `auro-combobox`
- [ ] With `nomatch` visible in `auro-combobox`, press ↓/↑ — verify arrow-key navigation does NOT land on the placeholder option (it is informational and not part of the navigable option set)

#### Inherited from parent `<auro-menu>`
- [ ] Slot an option (with no `size` / `shape` attribute) into `<auro-menu size="lg">` — verify the option renders at that size on mount
- [ ] Set `size` / `shape` explicitly on an option, then change the parent menu's `size` / `shape` — verify the option retains its author-set value (author-set attributes opt out of menu propagation)

#### Behavioral attributes (non-`@property`)
- [ ] `hidden` on an option — verify keyboard navigation skips it and it is not selectable via click
- [ ] `static` on an option — verify the option renders but is not selectable and is skipped by keyboard navigation
- [ ] `persistent` on an option — verify the option is excluded from `matchWord` highlighting (its text is not wrapped in `<strong>`)
- [ ] `event="my-event"` on an option — verify clicking or pressing Enter on that option dispatches a custom event named `my-event` from the menu **instead of** selecting it, and also dispatches `auroMenu-customEventFired`

### Accessibility

- [ ] Verify each option has role="option"
- [ ] Verify selected options have aria-selected="true"
- [ ] Verify disabled options have aria-disabled="true"
- [ ] Verify the option text content is announced by screen readers
- [ ] Verify each option renders with `tabindex="-1"` (options are not directly tabbable; the parent field owns focus and points at the active option via `aria-activedescendant`)
- [ ] Slot in an option without an `id` — verify it auto-receives a unique `id="menuoption-N"` (needed for `aria-activedescendant`). Set an explicit `id` — verify the auto-assignment is skipped and your id wins

### Slots

- [ ] Set custom content in the default slot — verify it renders as the option text
- [ ] Include an icon with the option text — verify it renders alongside the text

### Events

- [ ] Click an enabled option — verify `auroMenuOption-click` fires (bubbles, composed) with `detail` = the option element
- [ ] Hover over an option — verify `auroMenuOption-mouseover` fires (bubbles, composed) with `detail` = the option element
- [ ] Click a `disabled` option — verify `auroMenuOption-click` does NOT fire

### Public Methods / Getters

- [ ] Read `option.isActive` — verify it returns `false` when the option is `hidden`, `disabled`, or `static`, and `true` otherwise
- [ ] Call `option.setSelected(true)` / `setSelected(false)` from the devtools console — verify the option's selected state updates
- [ ] Call `option.updateActive(true)` / `updateActive(false)` — verify the option's active visual state toggles

---

## auro-menu

### Mouse Interactions

- [ ] Click an option in a single-select menu — verify it selects and the menu value updates
- [ ] Click a different option — verify the previous selection clears and the new option is selected
- [ ] Click an option in a multi-select menu — verify it toggles selected without deselecting others
- [ ] Click multiple options — verify all clicked options show as selected
- [ ] Click a disabled option — verify no selection change
- [ ] Hover over options — verify proper visual highlighting

### Keyboard Interactions

See [keyboard-behavior.md](../docs/pages/keyboard-behavior.md) for the full key/state matrix. `auro-menu` handles `ArrowDown`, `ArrowUp`, `Enter`, and `Tab` directly on its own element; `Home`, `End`, `Escape`, and type-ahead are provided by the parent `auro-select` (see the [select keyboard-behavior doc](../../select/docs/pages/keyboard-behavior.md)). The checks below describe the observable behavior when navigating the menu inside a select or combobox.

**ArrowDown (↓)**

- [ ] ↓ from above the first option (no active option) → active state lands on the first enabled option.
- [ ] ↓ from an active option with enabled options below → active state moves to the next enabled option.
- [ ] ↓ from the last enabled option → active state wraps to the first enabled option.
- [ ] ↓ with `disabled`, `hidden`, or `static` options between → those options are skipped; active state lands on the next enabled option.
- [ ] ↓ across an `<hr>` divider → the divider is skipped; active state lands on the next enabled option.
- [ ] ↓ on a menu with no options → nothing changes; no `auroMenu-activatedOption` event fires.
- [ ] ↓ on a menu where every option is disabled → nothing changes; no option becomes active.
- [ ] ↓ while the menu is `loading` → the loading placeholder is not selectable; no navigation occurs.

**ArrowUp (↑)**

- [ ] ↑ from below the last option (no active option) → active state lands on the last enabled option.
- [ ] ↑ from an active option with enabled options above → active state moves to the previous enabled option.
- [ ] ↑ from the first enabled option → active state wraps to the last enabled option.
- [ ] ↑ with disabled/hidden/static options between → those options are skipped.
- [ ] ↑ across an `<hr>` divider → the divider is skipped.
- [ ] ↑ on an empty or fully-disabled menu → nothing changes.

**Enter (↵)**

- [ ] ↵ on an active option in single-select mode → the option becomes selected; any previous selection clears; checkmark appears (unless `noCheckmark`).
- [ ] ↵ on an already-selected option in single-select mode → no state change, but `auroMenu-selectedOption` still fires so parent dropdowns (e.g. `auro-select`) can close on re-selection.
- [ ] ↵ on an active option in `multiSelect` mode → the option toggles selected; other selections are preserved.
- [ ] ↵ with no active option → no selection change; no event fires.
- [ ] ↵ on an active option → `auroMenu-selectedOption` fires; read the selected option from `event.target.optionSelected` (the event `detail` only carries `{ source }`).

**Tab (⇥)**

- [ ] ⇥ on an active option → the option is selected (same as `Enter`) AND focus moves to the next tabbable element (`Tab` does not trap focus in the menu).
- [ ] ⇥ with no active option → focus moves out of the menu with no selection change.

**Parent-provided keys (via `auro-select`)**

- [ ] `Home` → active state lands on the first enabled option.
- [ ] `End` → active state lands on the last enabled option.
- [ ] Type a printable character (e.g. "a") → active state lands on the first enabled option whose displayed text starts with that character.
- [ ] Type the same character repeatedly within the type-ahead timeout → active state cycles through matching options.
- [ ] Type a multi-character prefix quickly (e.g. "app") → active state lands on the first enabled option whose text starts with that prefix.
- [ ] `Escape` while expanded → the parent dropdown closes; type-ahead buffer clears.

### Touch / Tap Interactions

- [ ] Tap an option — verify it selects
- [ ] Tap a selected option in multi-select — verify it deselects
- [ ] Tap a disabled option — verify no change

### Property States

#### `value`
- [ ] Set `value` programmatically — verify the matching option becomes selected
- [ ] Read `value` after user selects an option — verify it matches the selected option's value
- [ ] In `multiSelect`, verify `value` is a JSON-stringified array of the selected option values (assign as a real array via `selectByValue()`; read `selectedOptions` for the array of elements)

#### `multiSelect`
- [ ] Set `multiSelect` — verify multiple options can be selected simultaneously
- [ ] Remove `multiSelect` — verify only one option can be selected at a time
- [ ] Select one or more options, then toggle `multiSelect` at runtime — verify the current selection clears and `menu.optionSelected` becomes `undefined` (and `menu.selectedOptions` becomes `[]`)

#### `noCheckmark`
- [ ] Set `noCheckmark` — verify selected options do not show a checkmark indicator (propagates to nested options and menus)

#### `disabled`
- [ ] Set `disabled` on the menu — verify all options render as disabled
- [ ] Click an option while the menu is `disabled` — verify no selection change occurs

#### `loading`
- [ ] Set `loading` — verify the loading state displays (`loadingIcon` and `loadingText` slots)
- [ ] Remove `loading` — verify the menu options appear

#### `matchWord`
- [ ] Set `matchWord` with a string — verify matching parts of option text are wrapped in `<strong>` (case-insensitive); options with `persistent` are excluded
- [ ] Set `matchWord` to a value containing regex specials (`.*`, `a+b`, `(x)`, `[y]`) — verify no error is thrown and the string highlights literally
- [ ] Put HTML-looking characters in option text (e.g. `"a <b> c"`) with `matchWord` active — verify the `<b>` renders as literal text, not as a bold tag
- [ ] Clear `matchWord` after highlighting — verify any existing `<strong>` wrappers are removed and the original text is restored

#### `size` / `shape`
- [ ] Set `size` on the menu (e.g. `size="lg"`) — verify all nested `<auro-menuoption>` elements without an author-set size inherit it visually
- [ ] Set `shape` on the menu — verify propagation the same way
- [ ] Nest a child `<auro-menu>` inside a menuoption — verify the child menu and its options also inherit `size` / `shape` from the root menu

#### `optionSelected` (public reactive property)
- [ ] Read `menu.optionSelected` after a selection — verify it returns the selected `HTMLElement` (single-select) or an array of elements (multi-select), or `undefined` when nothing is selected

#### `optionActive` (public reactive property, attribute: `optionactive`)
- [ ] Read `menu.optionActive` while an option is active — verify it returns the currently active option element

### Events

- [ ] Select an option — verify `auroMenu-selectedOption` fires; `event.detail` is `{ source }`, and the selected option(s) are read from `event.target.optionSelected`
- [ ] Activate (highlight) an option — verify `auroMenu-activatedOption` fires with `detail` = the activated option element
- [ ] Set `loading` — verify `auroMenu-loadingChange` fires with `detail` = `{ loading, hasLoadingPlaceholder }`
- [ ] Attempt to set a value that doesn't match any option — verify `auroMenu-selectValueFailure` fires
- [ ] Call `menu.reset()` — verify `auroMenu-selectValueReset` fires
- [ ] Slot in / remove options at runtime (via devtools) — verify `auroMenu-optionsChange` fires with `detail.options` = the array of currently slotted options
- [ ] Click / press Enter on an option that has an `event="my-event"` attribute — verify (a) the option is NOT selected, (b) a custom event named `my-event` fires from the menu with `detail.option`, and (c) `auroMenu-customEventFired` fires with `detail.option`
- [ ] Call `menu.selectByValue('x')` where the matching option has `event="my-event"` — verify the same two events fire (the `event=` behavior runs on programmatic selection too, not only on click/Enter)
- [ ] **Deferred value matching:** on an initially empty menu, set `menu.value = 'foo'` in devtools, then append an option with `value="foo"` — verify the option becomes selected on slotchange and `auroMenu-selectValueFailure` does **not** fire prematurely on the initial value set
- [ ] Same as above but append an option whose value does not match — verify `auroMenu-selectValueFailure` fires once on slotchange

### Accessibility

- [ ] Verify the root menu has `role="listbox"`
- [ ] Verify each option has `role="option"`
- [ ] Verify selected options announce "selected" via screen reader
- [ ] Verify disabled options announce "disabled" via screen reader
- [ ] Verify active option is tracked via `aria-activedescendant` on the parent
- [ ] Verify color contrast meets WCAG 2.1 AA
- [ ] Set `loading` on the menu — verify `aria-busy="true"` appears in the DOM inspector; remove `loading` — verify `aria-busy` is `"false"` / absent
- [ ] Toggle `multiSelect` at runtime on the root menu — verify `aria-multiselectable="true"` is added when true and removed when false
- [ ] Verify the top-level `<auro-menu>` has a `root` attribute in the DOM inspector; nested menus do not

### Nested menus

- [ ] Nest a child `<auro-menu>` inside an `<auro-menuoption>` — verify in the inspector:
  - Child menu has `role="group"` (not `listbox`) and `aria-label="submenu"`
  - Child menu does NOT have the `root` attribute
  - Child menu does NOT get `aria-multiselectable` even if the root has `multiSelect`
- [ ] Give the nested `<auro-menu>` an explicit `aria-label="Filters"` in markup — verify the author-supplied label is preserved (not overwritten with `submenu`)
- [ ] Inspect nested-menu options — verify each option's rendered content is prepended with one or more `<span class="nestingSpacer">` per nesting level (visual indentation)
- [ ] Move a menu that was root-level into another menu at runtime (or vice versa) — verify `role` / `root` / `aria-multiselectable` update after slotchange to reflect the new nesting

### Slots

- [ ] Place auro-menuoption elements in the default slot — verify they render as selectable options
- [ ] Place `<hr>` elements between options — verify they render as visual dividers
- [ ] Set custom content in the `loadingText` slot — verify it displays during loading state
- [ ] Set custom content in the `loadingIcon` slot — verify it displays during loading state

### Public Methods / Getters

- [ ] Call `reset()` — verify the menu returns to its initial selection state (`value` / `optionSelected` cleared) and `auroMenu-selectValueReset` fires
- [ ] Call `updateActiveOption(2)` (index) — verify the option at that index becomes active
- [ ] Call `updateActiveOption(optionEl)` (option element reference) — verify that option becomes active
- [ ] Call `selectByValue('foo')` — verify the option with `value="foo"` becomes selected
- [ ] Call `selectByValue(['foo', 'bar'])` in `multiSelect` mode — verify both matching options are selected
- [ ] Call `selectByValue('')` / `selectByValue(null)` / `selectByValue(undefined)` / `selectByValue([])` — verify selection is cleared
- [ ] Call `selectByValue('   ')` (whitespace-only string) — verify selection is cleared (whitespace treated as empty)
- [ ] In `multiSelect`, call `selectByValue(['nope1', 'nope2'])` with no matching options — verify `auroMenu-selectValueFailure` fires and selection is cleared
- [ ] Read `menu.selectedOptions` — verify it returns an array of the currently selected option elements
- [ ] Read `menu.selectedOption` — verify it returns the first selected option element, or `null` when nothing is selected
- [ ] Read `menu.currentLabel` — verify it returns a comma-joined string of the selected options' textContent
- [ ] Read `menu.options` — verify it returns the array of `auro-menuoption` elements currently slotted
- [ ] Set `menu.index = 2` — verify the option at that index becomes active and `auroMenu-activatedOption` fires; read `menu.index` — verify it returns the active option's index
- [ ] With `loading` set and slotted content in `loadingText` / `loadingIcon`, read `menu.hasLoadingPlaceholder` — verify `true`. With no such slotted content, verify `false`. Confirm `auroMenu-loadingChange.detail.hasLoadingPlaceholder` matches

# Manual Testing — auro-menu / auro-menuoption

Automated tests (`auro-menu.test.js`, `auro-menuoption.test.js`) already cover rendering, `value` / `selected` / `disabled` / `loading` / `multiSelect` / `noCheckmark` / `matchWord` state reflection, click and keyboard-driven selection and navigation (including skipping disabled / hidden / static options and `<hr>` dividers), event firing, ARIA attribute presence (`role`, `aria-selected`, `aria-disabled`, `aria-activedescendant`, `aria-busy`, `aria-multiselectable`), auto-generated option IDs, nested-menu `role="group"`, slot rendering, and public methods / getters. The manual cases below deliberately avoid re-verifying that logic and instead focus on what automation cannot confirm: real rendering and appearance, focus-indicator visibility, screen-reader announcements, touch input, nested-menu visual behavior, and cross-browser integration inside `auro-select` / `auro-combobox`.

**Key symbols:** ↓ = ArrowDown · ↑ = ArrowUp · ↵ = Enter · ⇥ = Tab

## Smoke Test

Run these first for a quick confidence check that the component works in a real browser.

### auro-menu / auro-menuoption

[ ] Load a menu with a few slotted `<auro-menuoption>` elements — verify all options render with their label text visible
[ ] Click an option — verify it visibly becomes selected (checkmark appears unless `noCheckmark`) and, in single-select, clicking a different option moves the selection
[ ] View a disabled option — verify it looks grayed out and does not respond to a click
[ ] Inside an `auro-select` / `auro-combobox`, press ↓ / ↑ — verify the active highlight visibly moves between options and a visible focus/active indicator tracks it
[ ] Press ↵ on the active option — verify it visibly renders as selected
[ ] Set `loading` on the menu — verify the loading placeholder (icon + text) is visibly displayed in place of options

## Depth

### auro-menu / auro-menuoption — Appearance & Theming

[ ] Verify the active (highlighted) option style is visually distinct from the resting and selected states
[ ] Verify the focus / active indicator is clearly visible when navigating options with the keyboard
[ ] Verify the `onDark` / inverse appearance renders correctly against a dark background (options, checkmark, active highlight, dividers)
[ ] Verify color contrast meets WCAG 2.1 AA for option text, active highlight, checkmark, and disabled state in both default and `onDark` appearances
[ ] Verify `size` (e.g. `sm` / `md` / `lg`) and `shape` (e.g. `box` / `round`) render at visibly correct dimensions, and that nested child menus / options inherit them visually
[ ] Verify `<hr>` dividers render as visible separators between options
[ ] Verify `matchWord` highlighting renders the matched substring visibly bolder (`<strong>`) without disturbing surrounding text or icons
[ ] Slot an icon alongside option text — verify the icon and text align and render together correctly
[ ] Verify options render correctly across supported browsers (Chrome, Safari, Firefox, Edge)

### auro-menu / auro-menuoption — Nested Menus (Visual)

[ ] Nest a child `<auro-menu>` inside an `<auro-menuoption>` — verify nested options render with visible indentation (one indent step per nesting level) so the hierarchy is readable
[ ] Verify selecting a nested option updates the visible selection state as expected from the user's point of view

### auro-menu / auro-menuoption — Touch / Device

[ ] Tap an option on a real touch device — verify it visibly selects
[ ] In `multiSelect`, tap several options — verify each toggles selected/deselected independently on tap
[ ] Tap a disabled option — verify no selection change and no highlight
[ ] Verify option tap targets are comfortably sized and reachable on a small mobile viewport, and the menu scrolls correctly when options overflow

### auro-menu / auro-menuoption — Screen Reader (VoiceOver macOS + iOS / NVDA)

Turn the screen reader on and verify the actual announced text. Expected wording is spec'd in [`../docs/pages/voiceover.md`](../docs/pages/voiceover.md).

[ ] Focus lands in the root menu — verify it announces as a list box with the item count (e.g. *"list box, 5 items"*)
[ ] Navigate options (VO+↓ / VO+↑ on macOS, swipe on iOS) — verify each option announces its label, role, and position (e.g. *"[label], option, 2 of 5"*)
[ ] Land on a selected option — verify *"selected"* is appended to the announcement
[ ] Land on a disabled option — verify *"dimmed"* (or equivalent) is appended
[ ] Navigate across `disabled`, `hidden`, or `static` options — verify they are not announced as active (they are skipped)
[ ] Select an option with ↵ — verify the label followed by *"selected"* is announced
[ ] Set `multiSelect` — verify the container is announced as multi-selectable
[ ] Set `loading` — verify a *"busy"* state is announced; clear `loading` — verify the busy state drops
[ ] Enter a nested `<auro-menu>` — verify it announces as *"group, submenu"* and position announcements are relative to the nested list (e.g. *"1 of 3"*, not the parent's count)
[ ] Give a nested menu an explicit `aria-label` (e.g. `"Filters"`) — verify the author label is announced instead of *"submenu"*
[ ] When the menu is hosted by `auro-select` / `auro-combobox` (focus stays on the parent trigger in a different shadow root), navigate options — verify the active option is still announced correctly

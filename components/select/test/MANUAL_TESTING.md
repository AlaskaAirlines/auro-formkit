# Manual Testing — auro-select

Automated tests (`auro-select.test.js` and `selectUtils.test.js`) already cover rendering, property/attribute reflection and defaults, slot rendering, mouse and keyboard interaction (arrow/Home/End/Enter/Escape/Space/Tab/type-ahead), event firing, ARIA attribute presence and routing, validation logic, placement, and public methods. The manual cases below focus on what automation cannot confirm: real rendering and theming, color contrast, focus-indicator visibility, actual screen-reader announcements, touch input, and true fullscreen/mobile-dialog behavior on real devices and browsers.

**Key symbols:** ↓ = ArrowDown · ↑ = ArrowUp · ↵ = Enter · ⇥ = Tab · ␣ = Space · ⎋ = Escape

## Smoke Test

A quick real-browser sanity pass. Run these in a real browser before deeper testing.

[ ] Load a select with a `placeholder` and no selection — verify it renders with the placeholder visible in the trigger
[ ] Click the trigger — verify the dropdown bib opens showing the menu options
[ ] Click an option — verify the bib closes and the trigger displays the selected value
[ ] ⇥ to the trigger and press ↵, then ↓ to an option and ↵ — verify the bib opens, the option becomes active, and it is selected on ↵
[ ] On a `required` select, focus and ⇥ away without selecting — verify the `valueMissing` error message renders
[ ] ⇥ to the trigger — verify a clearly visible focus indicator appears on the trigger

## Depth

### Appearance & Theming

[ ] Set `appearance="default"` — verify the light-background treatment applies to trigger, help text, and menu
[ ] Set `appearance="inverse"` (or the deprecated `onDark`) on a dark background — verify the dark treatment applies to the trigger AND the bib menu interior (options, checkmarks, hover states) in both popover and fullscreen modes
[ ] Render each `layout` (`classic`, `emphasized`, `snowflake`) with each `shape` (`classic`, `pill`, `pill-left`, `pill-right`, `snowflake`) — verify each visual style renders correctly and `size="lg"`/`size="xl"` (xl only on `emphasized`) look correct
[ ] Focus the trigger in each layout with each appearance (`default`, `inverse`) — verify a clearly visible focus indicator in all combinations
[ ] Verify color contrast meets WCAG 2.1 AA in both default and inverse appearances (trigger text, placeholder, help/error text, options, checkmarks)
[ ] Select an option with very long text (50+ characters) — verify the trigger truncates with ellipsis (classic) or wraps (emphasized/snowflake) without breaking layout
[ ] Add options with very long text (100+ characters) and 50+ options — verify options render and the menu scrolls bounded within the popover (desktop) and dialog (fullscreen) without layout breakage
[ ] Enable `prefers-reduced-motion: reduce`, then navigate options with ↓/↑ — verify options scroll into view instantly with no smooth animation
[ ] Repeat the core rendering checks across supported browsers (Chrome, Safari, Firefox, Edge) — verify consistent trigger, bib, and option rendering

### Touch / Tap

[ ] Tap the trigger on a touch device — verify the bib opens (popover on desktop-sized, fullscreen on mobile)
[ ] Tap an option — verify it selects and the bib closes; in multi-select verify it toggles and the bib stays open
[ ] Tap outside the bib — verify it closes and the selection persists
[ ] Tap a disabled option and the trigger of a disabled select — verify no change occurs

### Fullscreen / Mobile Dialog

Test on real mobile devices (iOS Safari, Android Chrome), not just an emulated viewport.

[ ] Open the select at a mobile breakpoint — verify the fullscreen dialog opens and the `bib.fullscreen.headline` content displays (larger HeadingDisplay style with `largeFullscreenHeadline`, Heading 600 without)
[ ] Verify the close button receives initial focus when the dialog opens and focus returns to the trigger after selecting or closing
[ ] Select an option — verify the dialog closes and the trigger shows the value; tap the close button — verify it closes without selecting
[ ] Rotate the device / resize past the `fullscreenBreakpoint` while the bib is open — verify the mode switches smoothly and focus lands sensibly (close button in fullscreen, trigger in popover)
[ ] Verify the trigger's content behind the dialog is not visible or reachable by touch while the dialog is open

### Screen Reader

Turn on a real screen reader and verify the actual announced wording. VoiceOver expected wording is spec'd in [`../docs/pages/voiceover.md`](../docs/pages/voiceover.md).

#### Trigger focus

[ ] Focus the trigger — verify VO announces *"[label], [current value or 'no selection'], combo box"*, plus *"collapsed"* / *"expanded"* and any of *"required"*, *"dimmed"* (disabled), or *"has auto complete"* that apply
[ ] Wait for the pause after the focus announcement — verify the `helpText` slot content is announced
[ ] Focus the trigger with `multiSelect` set — verify the role announced is still *"combo box"* (regression: not *"list box"*, not *"pop-up button"*)

#### Opening and navigating

[ ] Open the bib — verify VO announces the currently active option as *"[label], [state]"*
[ ] Navigate options — verify VO announces *"[label], [N] of [M]"* with *"selected"* or *"dimmed"* appended as applicable (backed by `aria-setsize` / `aria-posinset`)
[ ] Add or remove options dynamically while VO is reading — verify the *"N of M"* count updates on the next read

#### Single-select selection

[ ] Press ↵ on an active option — verify VO announces *"selected"*, the bib closes, and VO announces *"collapsed"*
[ ] Refocus the trigger after close — verify the new value is included in the focus announcement

#### Multi-select

[ ] Toggle-select an option — verify VO announces *"[label], selected"* (only the toggled option, not the full list)
[ ] Toggle-deselect a previously selected option — verify VO announces *"[label], not selected"* (regression: wording is *"not selected"*, not *"unselected"*)
[ ] Rapidly toggle multiple options — verify each add/remove announcement is heard and the *"collapsed"* announcement does not override them (announcements are delayed ~300 ms)
[ ] Deselect the last selected option — verify the placeholder returns to the trigger and is announced

#### Invalid state

[ ] Trigger an invalid state (blur a `required` empty select, or set an `error`) — verify VO announces the error immediately via the alert-role help text, not waiting for the next focus
[ ] Refocus the trigger while invalid — verify the error message is included in the focus announcement; VO does **not** announce *"invalid data"* (the trigger carries no `aria-invalid`)

#### Fullscreen (mobile) routing

[ ] Open the select at the mobile breakpoint — verify focus lands on the Close button, announced with the `ariaLabel.bib.close` slot's accessible name, and the trigger is unreachable (`inert`) until the dialog closes
[ ] On iOS VoiceOver, perform the two-finger scrub gesture (Z shape) — verify the dialog closes without selection and focus returns to the trigger
[ ] Select/deselect an option in the fullscreen dialog in multi-select — verify the announcement is heard (the live region is routed into the bib's shadow root because everything outside the `<dialog>` is inert)
[ ] At desktop (popover) sizes — verify the same announcements come from the host component's live region

# Dropdown Regression Testing Guideline

Master no-regression guideline for `auro-dropdown` and all components that consume it: **select**, **combobox**, **datepicker**, and **counter-group**. Covers both the **desktop non-fullscreen popover** path and the **fullscreen dialog** path.

> **Context:** PR #1346 replaced the Popover API with a `<dialog>` element for accessibility compliance. PR #1370 re-introduces the Popover API on the **bib host element only** (desktop mode) to escape `container-type` containment, while keeping the inner `<dialog>` and fullscreen `showModal()` path unchanged.

---

## Table of Contents

1. [Test Authoring Constraints](#test-authoring-constraints)
2. [How to Use This Document](#how-to-use-this-document)
3. [Architecture Summary](#architecture-summary)
4. [Platform Coverage Matrix](#platform-coverage-matrix)
5. [1 — auro-dropdown](#1--auro-dropdown)
6. [2 — auro-select](#2--auro-select)
7. [3 — auro-combobox](#3--auro-combobox)
8. [4 — auro-datepicker](#4--auro-datepicker)
9. [5 — auro-counter-group](#5--auro-counter-group)
10. [6 — Cross-Component Accessibility](#6--cross-component-accessibility)
11. [No-Regression Baseline (PR #1346)](#no-regression-baseline-pr-1346)
12. [Known Pre-Existing Issues](#known-pre-existing-issues)
13. [Automation Mapping](#automation-mapping)

---

## Test Authoring Constraints

### Tests must never modify component source code

Regression tests and new unit tests written against any formkit component — `auro-dropdown`, `auro-select`, `auro-combobox`, `auro-datepicker`, `auro-counter-group`, or any shared primitive (`auro-dropdownBib`, `auro-input`, `auro-menu`, etc.) — **must not require changes to that component's runtime source code in order to pass.**

This means:
- Do not add properties, methods, event listeners, or lifecycle hooks to a component solely to make a test observable or controllable.
- Do not modify component behavior, rendering logic, or internal state management to satisfy a test assertion.
- Test files (`.test.js`, `.stories.ts`) and test fixtures are the only files that may be created or edited as part of a test-authoring task.

### What to do when a test cannot be written without a component change

If a scenario in the **Gaps — New Tests Needed** table cannot be covered by a test that observes existing component behavior (public API, DOM output, emitted events, ARIA attributes), the scenario must be **deferred**:

1. Do not write a failing test and do not modify the component.
2. Leave the gap row in the **Gaps — New Tests Needed** table.
3. Add a **Deferred Work** entry at the bottom of this document (following the pattern of the §2.3.2/6.5 entry below) that records:
   - What observable state the test would need to assert.
   - What component change would be required to expose it.
   - Why the change is outside the test-only scope.
   - What a future component-change PR should implement before the test is restored.

### Rationale

The dialog role suppression revert (§2.3.2 / §6.5, see Deferred Work below) is the canonical example of this rule being violated and corrected. Tests that silently depend on component changes conflate two separate concerns — component behavior and test coverage — and make it impossible to land tests independently of feature work. Keeping them strictly separated preserves a clean, reviewable boundary between PRs.

### Ongoing maintenance

If at any point during test authoring or code review you encounter a scenario, gap, or limitation that cannot be addressed within the test-only scope — for any reason — add an entry to the **Deferred Work** section at the bottom of this document. Do not leave undocumented exceptions or silent omissions.

---

## How to Use This Document

Each scenario follows a consistent format:

> **Setup** — preconditions and fixture description
> **Action** — user or programmatic step(s)
> **Expected** — observable outcome to verify

Scenarios are tagged with priority:
- **P0** — Must not regress; blocks release
- **P1** — High-risk regression path; should be verified before merge
- **P2** — Lower-risk edge case; verify during RC

Checkbox `[ ]` items can be copied into a PR comment for manual QA tracking.

---

## Architecture Summary

### Desktop (non-fullscreen) — Popover + inner dialog

```
auro-dropdown
 └─ auro-dropdownBib (host)
      popover="manual"  ← set dynamically in open(); promotes host to top layer
      showPopover()      ← escapes ancestor container-type containment
      └─ <dialog open>   ← opened via setAttribute('open', ''); NOT showModal()
           └─ <slot>      ← bib content (menu, calendar, counters, etc.)
```

- Floating UI positions the bib host; `:host(:popover-open)` resets UA popover defaults so `top`/`left` take effect.
- `popover` attribute is removed on close to avoid UA stylesheet interference.
- Keyboard bridge on `<dialog>` re-dispatches `ArrowUp`, `ArrowDown`, `Enter`, `Escape`, `Tab` to cross the shadow DOM boundary.
- `dialogRole="presentation"` suppresses VoiceOver "dialog" announcements for combobox/select.

### Fullscreen (mobile) — showModal()

```
auro-dropdown
 └─ auro-dropdownBib (host)
      NO popover attribute
      └─ <dialog>         ← opened via dialog.showModal()
           └─ <slot>       ← bib content (menu, calendar, counters, etc.)
```

- `showModal()` promotes dialog to top layer, makes background inert, provides native focus trap.
- `document.documentElement.style.overflow` locked during modal to prevent scroll-to-dialog.
- Touch scroll locked via `_lockTouchScroll()`.
- ESC fires native `cancel` event → re-dispatched as `auro-bib-cancel` → dropdown closes.
- Keyboard bridge still active for arrow/Tab/Enter propagation across shadow boundary.

---

## Platform Coverage Matrix

Mirror of `.github/PULL_REQUEST_TEMPLATE.md` checklist:

### Browsers

| Platform | Browser | Desktop | Mobile |
|----------|---------|---------|--------|
| Android  | Chrome  | —       | [ ]    |
| Android  | Firefox | —       | [ ]    |
| iOS      | Chrome  | —       | [ ]    |
| iOS      | Firefox | —       | [ ]    |
| iOS      | Safari  | —       | [ ]    |
| Desktop  | Chrome  | [ ]     | —      |
| Desktop  | Firefox | [ ]     | —      |
| Desktop  | Safari  | [ ]     | —      |
| Desktop  | Edge    | [ ]     | —      |

### Assistive Technology

| AT            | Browser        | Mode        |
|---------------|----------------|-------------|
| VoiceOver     | Safari (macOS) | Desktop     |
| VoiceOver     | Safari (iOS)   | Mobile      |
| TalkBack      | Chrome (Android) | Mobile    |

---

## 1 — auro-dropdown

The base dropdown component; all consumers inherit these behaviors.

### 1.1 Desktop Popover Lifecycle

#### 1.1.1 Popover attribute management — P0

- [ ] **Setup:** Render `<auro-dropdown>` at desktop width.
- [ ] **Action:** Call `el.show()`.
- [ ] **Expected:** Bib host has `popover="manual"` attribute; `bibEl.matches(':popover-open')` is `true`; inner `<dialog>` has `open` attribute.
- [ ] **Action:** Call `el.hide()`.
- [ ] **Expected:** Bib host has **no** `popover` attribute; `bibEl.matches(':popover-open')` is `false`; inner dialog `open` is `false`.

#### 1.1.2 Popover attribute not set before first open — P1

- [ ] **Setup:** Render `<auro-dropdown>`, do not open.
- [ ] **Expected:** Bib host has **no** `popover` attribute. (Prevents UA `[popover]:not(:popover-open) { display: none }` from interfering with Floating UI measurement.)

#### 1.1.3 Multiple open/close cycles — P0

- [ ] **Setup:** Render `<auro-dropdown>`.
- [ ] **Action:** `show()` → `hide()` → `show()` → `hide()`.
- [ ] **Expected:** Each cycle correctly sets/removes `popover="manual"` and opens/closes the inner dialog. No stale state.

#### 1.1.4 Container-type containment escape — P0

> **Root cause:** `container-type` creates a new containing block that traps `position: fixed`
> elements relative to the container instead of the viewport. Floating UI positions the bib with
> `position: fixed` + computed `top`/`left`, so without the popover escape the bib is mispositioned
> or clipped. The bib host uses `popover="manual"` + `showPopover()` to promote itself to the
> browser top layer, escaping any ancestor containing block.

> **Visual Regression (Chromatic):** Six Storybook stories cover this scenario with
> `chromatic-enabled` tags. Each story renders `<auro-dropdown>` inside a distinct container-query
> CSS context and opens the dropdown before snapshot capture so any positioning regression is
> visually detectable.
>
> | Story Export | Container Variant |
> |---|---|
> | `DropdownInContainerTypeInlineSize` | `container-type: inline-size` — 400 px, baseline |
> | `DropdownInNarrowContainerType` | `container-type: inline-size` — 200 px narrow |
> | `DropdownInNestedContainerTypes` | Two nested `inline-size` ancestors |
> | `DropdownInClippingContainerType` | `inline-size` + `overflow: hidden` parent |
> | `DropdownInScrollableContainerType` | `inline-size` + `overflow: auto` scroll parent |
> | `DropdownInContainerTypeSize` | `container-type: size` (both axes constrained) |
>
> See [`component.stories.ts`](../components/dropdown/stories/component.stories.ts) §1.1.4a–f.

- [ ] **Setup:** Place `<auro-dropdown>` inside an ancestor with `container-type: inline-size`.
- [ ] **Action:** Open the dropdown.
- [ ] **Expected:** Bib is positioned correctly below the trigger (not centered or clipped by the container). Floating UI `top`/`left` values are applied.

#### 1.1.5 Bib positioning with Floating UI — P0

- [ ] **Setup:** Render `<auro-dropdown>` near the bottom of the viewport with `flip` enabled (default).
- [ ] **Action:** Open the dropdown.
- [ ] **Expected:** Bib flips above the trigger when insufficient space below. `shift` middleware keeps bib within viewport.

### 1.2 Fullscreen Dialog Lifecycle

#### 1.2.1 showModal path — P0

- [ ] **Setup:** Render `<auro-dropdown>` at mobile width (below fullscreen breakpoint).
- [ ] **Action:** `el.show()`.
- [ ] **Expected:** Inner dialog opened via `showModal()`. Dialog `open` is `true`. Background content is inert. Bib host does **not** have `popover` attribute.

#### 1.2.2 Scroll lock during modal — P1

- [ ] **Setup:** Page has scrollable content. Open dropdown in fullscreen mode.
- [ ] **Expected:** `document.documentElement.style.overflow` is set (scroll locked). Background page cannot be scrolled.
- [ ] **Action:** Close the dropdown.
- [ ] **Expected:** Scroll lock removed; page scrolls normally.

#### 1.2.3 ESC closes fullscreen dialog — P0

- [ ] **Setup:** Open dropdown in fullscreen mode.
- [ ] **Action:** Press Escape.
- [ ] **Expected:** Dialog closes. `auro-bib-cancel` event fired. `isPopoverVisible` is `false`.

#### 1.2.4 Responsive mode switch while open — P1

- [ ] **Setup:** Open dropdown in desktop mode (popover path).
- [ ] **Action:** Resize viewport below the fullscreen breakpoint while bib is open.
- [ ] **Expected:** Dropdown transitions to fullscreen mode. Bib content remains visible. `popover` attribute removed; `showModal()` path active.
- [ ] **Action:** Resize back to desktop width.
- [ ] **Expected:** Transitions back to popover mode. Positioning restored.

### 1.3 Trigger Interaction

#### 1.3.1 Click toggle — P0

- [ ] **Setup:** Render `<auro-dropdown>` (default toggle mode).
- [ ] **Action:** Click trigger → click trigger again.
- [ ] **Expected:** First click opens bib, second click closes bib.

#### 1.3.2 Spacebar / Enter open — P0

- [ ] **Setup:** Focus the dropdown trigger.
- [ ] **Action:** Press Space or Enter.
- [ ] **Expected:** Bib opens.

#### 1.3.3 noToggle attribute — P1

- [ ] **Setup:** Render `<auro-dropdown noToggle>`.
- [ ] **Action:** Click trigger twice.
- [ ] **Expected:** First click opens bib; second click does **not** close it.

#### 1.3.4 disableEventShow attribute — P1

- [ ] **Setup:** Render `<auro-dropdown disableEventShow>`.
- [ ] **Action:** Click trigger.
- [ ] **Expected:** Bib does **not** open.
- [ ] **Action:** Call `el.show()` programmatically.
- [ ] **Expected:** Bib opens.

### 1.4 Keyboard Bridge (Fullscreen)

#### 1.4.1 Navigation keys re-dispatched — P0

- [ ] **Setup:** Open dropdown in fullscreen mode.
- [ ] **Action:** Dispatch `ArrowUp`, `ArrowDown`, `Escape`, `Tab` keydown events inside the dialog.
- [ ] **Expected:** Each key is re-dispatched as a composed event that crosses the shadow boundary to the parent component. Modifier keys (`shiftKey`, `altKey`, `ctrlKey`, `metaKey`) are preserved.

#### 1.4.2 Non-navigation keys pass through — P1

- [ ] **Setup:** Open dropdown in fullscreen mode.
- [ ] **Action:** Dispatch a character key (e.g., `'a'`) inside the dialog.
- [ ] **Expected:** Key is **not** re-dispatched; passes through to native input handling.

#### 1.4.3 Enter on button-like elements — P1

- [ ] **Setup:** Open dropdown in fullscreen mode with a close button in the bib.
- [ ] **Action:** Focus the close button and press Enter.
- [ ] **Expected:** Button's `.click()` is invoked. Dialog closes.

### 1.5 Events

#### 1.5.1 auroDropdown-triggerClick — P0

- [ ] **Action:** Click the trigger.
- [ ] **Expected:** `auroDropdown-triggerClick` event fired.

#### 1.5.2 auroDropdown-toggled — P0

- [ ] **Action:** Open and close the dropdown.
- [ ] **Expected:** `auroDropdown-toggled` event fired each time visibility changes.

#### 1.5.3 auro-bib-cancel — P0

- [ ] **Action:** Press Escape while fullscreen dialog is open.
- [ ] **Expected:** `auro-bib-cancel` event fired on the bib element.

### 1.6 Public API

#### 1.6.1 show() / hide() / focus() — P0

- [ ] **Action:** Call `el.show()`, `el.hide()`, `el.focus()`.
- [ ] **Expected:** Each method works as documented. `show()` opens bib and opens dialog synchronously. `hide()` closes bib and cleans up popover/dialog. `focus()` puts focus on the first focusable element in the bib (if open) or trigger (if closed).

#### 1.6.2 setActiveDescendant() — P1

- [ ] **Action:** Call `el.setActiveDescendant(optionElement)`.
- [ ] **Expected:** `trigger.ariaActiveDescendantElement` is set to the passed element.
- [ ] **Action:** Call `el.setActiveDescendant(null)`.
- [ ] **Expected:** `ariaActiveDescendantElement` cleared; `aria-activedescendant` attribute removed.

### 1.7 Layout Variants

#### 1.7.1 Emphasized layout — P2

- [ ] **Setup:** Render `<auro-dropdown layout="emphasized" shape="pill">`.
- [ ] **Expected:** Trigger renders correctly with no visual regression.

#### 1.7.2 Snowflake layout — P2

- [ ] **Setup:** Render `<auro-dropdown layout="snowflake">`.
- [ ] **Expected:** Trigger renders correctly with no visual regression.

---

## 2 — auro-select

### 2.1 Desktop Popover Mode

#### 2.1.1 Open and select an option — P0

- [ ] **Setup:** Render `<auro-select>` with menu options at desktop width.
- [ ] **Action:** Click the trigger to open. Click an option.
- [ ] **Expected:** Option is selected. Bib closes. Trigger displays the selected value.

#### 2.1.2 Keyboard navigation — P0

- [ ] **Setup:** Focus `<auro-select>`.
- [ ] **Action:** Press Enter or Down Arrow to open. Use Arrow Down/Up to navigate options. Press Enter to select.
- [ ] **Expected:** Visual focus moves between options via `aria-activedescendant`. Selected option's value displayed in trigger. Bib closes.

#### 2.1.3 Tab selects active option and closes — P0

- [ ] **Setup:** Open `<auro-select>` and arrow-down to highlight an option.
- [ ] **Action:** Press Tab.
- [ ] **Expected:** Highlighted option is selected. Bib closes. Focus moves to next focusable element.

#### 2.1.4 Tab with no highlighted option — P1

- [ ] **Setup:** Open `<auro-select>`, do not navigate to any option.
- [ ] **Action:** Press Tab.
- [ ] **Expected:** Bib closes without selecting. Focus moves to next focusable element.

#### 2.1.5 Escape closes without selecting — P0

- [ ] **Setup:** Open `<auro-select>`, navigate to an option.
- [ ] **Action:** Press Escape.
- [ ] **Expected:** Bib closes. No option selected. Focus returns to trigger.

#### 2.1.6 Type-ahead search — P1

- [ ] **Setup:** Focus `<auro-select>` with bib open.
- [ ] **Action:** Type a character (e.g., `'o'` for "Oranges").
- [ ] **Expected:** Visual focus moves to the first matching option.

#### 2.1.7 showBib() / hideBib() — P0

- [ ] **Action:** Call `el.showBib()`.
- [ ] **Expected:** Dropdown opens.
- [ ] **Action:** Call `el.hideBib()`.
- [ ] **Expected:** Dropdown closes.

#### 2.1.8 Preset value — P1

- [ ] **Setup:** Render `<auro-select value="price">`.
- [ ] **Expected:** The "Price" option is visually selected and displayed in the trigger.

#### 2.1.9 Multi-select — P1

- [ ] **Setup:** Render `<auro-select multiselect>`.
- [ ] **Action:** Select multiple options.
- [ ] **Expected:** All selected options reflected in `value` and `formattedValue`. Bib does not close between selections.

#### 2.1.10 Error state — P1

- [ ] **Setup:** Render `<auro-select error="custom error message">`.
- [ ] **Expected:** Error message displayed. Error styling applied. Validation state reflects error.

#### 2.1.11 Required validation — P1

- [ ] **Setup:** Render `<auro-select required>`.
- [ ] **Action:** Focus and blur without selecting.
- [ ] **Expected:** Validity is `valueMissing`.

### 2.2 Fullscreen Dialog Mode

#### 2.2.1 Focus moves to close button on open — P0

- [ ] **Setup:** Render `<auro-select>` at mobile width.
- [ ] **Action:** Open the select.
- [ ] **Expected:** Fullscreen dialog opens via `showModal()`. Focus moves to the close button in the bib template.

#### 2.2.2 Tab closes fullscreen dialog — P0

- [ ] **Setup:** Open `<auro-select>` in fullscreen mode.
- [ ] **Action:** Press Tab.
- [ ] **Expected:** Dialog closes. Focus returns to the trigger.

#### 2.2.3 Option selection in fullscreen — P0

- [ ] **Setup:** Open `<auro-select>` in fullscreen mode.
- [ ] **Action:** Tap or press Enter on an option.
- [ ] **Expected:** Option selected. Dialog closes. Focus returns to trigger. Trigger displays selected value.

#### 2.2.4 Trigger becomes inert during fullscreen — P1

- [ ] **Setup:** Open `<auro-select>` in fullscreen.
- [ ] **Expected:** `dropdown.trigger.inert` is `true`. VoiceOver cannot reach the trigger behind the dialog.
- [ ] **Action:** Close the dialog.
- [ ] **Expected:** `dropdown.trigger.inert` restored to `false`.

#### 2.2.5 Touch pass-through prevention — P1

- [ ] **Setup:** Open `<auro-select>` in fullscreen on a touch device.
- [ ] **Action:** The tap that opens the dialog.
- [ ] **Expected:** The tap does **not** pass through to select a menu option beneath the finger. `pointer-events` on the menu are disabled on open and re-enabled on first `touchstart` inside the dialog.

#### 2.2.6 Background scroll prevention — P1

- [ ] **Setup:** Open `<auro-select>` in fullscreen on a page with scrollable content.
- [ ] **Action:** Try swiping up/down.
- [ ] **Expected:** Background page does not scroll. Only bib content scrolls if it overflows.

### 2.3 Screen Reader (Select)

#### 2.3.1 Trigger has role="combobox" — P0

- [ ] **Expected:** The trigger element has `role="combobox"`, `aria-expanded`, and `aria-controls`.

#### 2.3.2 Dialog role suppression on desktop — P1

- [ ] **Setup:** Open `<auro-select>` in desktop mode.
- [ ] **Expected:** Inner dialog has `role="presentation"`. VoiceOver does **not** announce "dialog" or "listbox inside of a dialog".

#### 2.3.3 Live region announcements — P1

- [ ] **Action:** Navigate to an option with arrow keys.
- [ ] **Expected:** `aria-live="polite"` region announces `"{Option Name}, not selected"`.
- [ ] **Action:** Select an option.
- [ ] **Expected:** Live region announces `"{Option Name}, selected"` after ~300ms delay.

#### 2.3.4 aria-activedescendant across shadow DOM — P0

- [ ] **Action:** Navigate to an option.
- [ ] **Expected:** `trigger.ariaActiveDescendantElement` points to the highlighted `auro-menuoption`. The option has an auto-generated `id` attribute.

### 2.4 Layout Variants (Select)

#### 2.4.1 Emphasized layout — P2

- [ ] **Setup:** Render `<auro-select layout="emphasized" shape="pill">`.
- [ ] **Expected:** Renders correctly, no visual regression, options selectable.

#### 2.4.2 Snowflake layout — P2

- [ ] **Setup:** Render `<auro-select layout="snowflake" shape="snowflake">`.
- [ ] **Expected:** Renders correctly, no visual regression, options selectable.

---

## 3 — auro-combobox

### 3.1 Desktop Popover Mode

#### 3.1.1 Typing opens bib with filtered options — P0

- [ ] **Setup:** Render `<auro-combobox>` with menu options.
- [ ] **Action:** Type `"ap"` in the input.
- [ ] **Expected:** Bib opens. Options are filtered to match. "Apples" visible; non-matching options hidden.

#### 3.1.2 Arrow key navigation — P0

- [ ] **Setup:** Type a value to open the bib.
- [ ] **Action:** Press Down Arrow.
- [ ] **Expected:** Visual focus moves to first option via `aria-activedescendant`.

#### 3.1.3 Enter selects and closes — P0

- [ ] **Action:** Navigate to an option, press Enter.
- [ ] **Expected:** Option selected. Bib closes. Input displays selected value.

#### 3.1.4 Tab selects active option — P1

- [ ] **Action:** Navigate to an option, press Tab.
- [ ] **Expected:** Highlighted option selected. Bib closes.

#### 3.1.5 Escape closes without selecting — P0

- [ ] **Action:** Press Escape with bib open.
- [ ] **Expected:** Bib closes. No selection made. Input retains typed text.

#### 3.1.6 No options hides bib — P1

- [ ] **Action:** Type a value that matches no options (e.g., `"zzzzzz"`).
- [ ] **Expected:** Bib closes or stays closed.

#### 3.1.7 Click opens only with value — P1

- [ ] **Setup:** Empty input.
- [ ] **Action:** Click trigger.
- [ ] **Expected:** Bib does **not** open.
- [ ] **Action:** Type a value, then click trigger.
- [ ] **Expected:** Bib opens.

#### 3.1.8 noFilter attribute — P1

- [ ] **Setup:** Render `<auro-combobox>` with `noFilter` and 2 options.
- [ ] **Action:** Type `"pp"`.
- [ ] **Expected:** Both options remain visible (no filtering applied).

#### 3.1.9 Filter behavior validation — P1

- [ ] **Setup:** Render `<auro-combobox>` with `behavior="filter"`.
- [ ] **Action:** Type text, do not select, blur away.
- [ ] **Expected:** Validation fires with `valueMissing` since no menu selection was made.
- [ ] **Action:** Select an option.
- [ ] **Expected:** Validity becomes `valid`, error clears.

### 3.2 Fullscreen Dialog Mode

#### 3.2.1 Focus moves to inputInBib on open — P0

- [ ] **Setup:** Render `<auro-combobox>` at mobile width.
- [ ] **Action:** Type to trigger bib open.
- [ ] **Expected:** Fullscreen dialog opens. Focus moves to `inputInBib` inside the dialog. Virtual keyboard stays open on iOS.

#### 3.2.2 Tab key cycles input → clear button → close — P0

- [ ] **Setup:** Open fullscreen combobox with a value typed (clear button visible).
- [ ] **Action:** Press Tab from input.
- [ ] **Expected:** Focus moves to clear button.
- [ ] **Action:** Press Tab from clear button.
- [ ] **Expected:** Dialog closes. Focus returns to trigger.

#### 3.2.3 Tab with no clear button closes dialog — P1

- [ ] **Setup:** Open fullscreen combobox with empty input (no clear button).
- [ ] **Action:** Press Tab.
- [ ] **Expected:** Dialog closes. Focus returns to trigger.

#### 3.2.4 Typing continues after fullscreen open — P0

- [ ] **Setup:** Open fullscreen combobox.
- [ ] **Action:** Continue typing in `inputInBib`.
- [ ] **Expected:** Characters appear in input. Options filter in real-time. Virtual keyboard remains open.

#### 3.2.5 Value sync between trigger input and bib input — P1

- [ ] **Setup:** Type `"ap"` in trigger input (triggers fullscreen open).
- [ ] **Expected:** `inputInBib` reflects `"ap"`. Options filtered accordingly.
- [ ] **Action:** Type more in `inputInBib`.
- [ ] **Expected:** Trigger input value stays in sync.

#### 3.2.6 Trigger becomes inert during fullscreen — P1

- [ ] **Expected:** Same as select 2.2.4 — trigger `inert = true` while dialog open; restored on close.

#### 3.2.7 Touch pass-through prevention — P1

- [ ] **Expected:** Same as select 2.2.5 — tap that opens dialog does not pass through to select an option.

#### 3.2.8 Validation suppressed during fullscreen transition — P1

- [ ] **Setup:** Render `<auro-combobox required>`.
- [ ] **Action:** Type to trigger fullscreen open. Close without selecting.
- [ ] **Expected:** Validation does **not** fire prematurely during the focus transition from trigger to bib input. Only fires after the dialog is fully closed and focus restored.

### 3.3 Screen Reader (Combobox)

#### 3.3.1 Deferred aria-expanded — P1

- [ ] **Action:** Open the combobox.
- [ ] **Expected:** `aria-expanded="true"` is set after ~150ms delay (so VoiceOver finishes character echo before announcing "expanded").
- [ ] **Action:** Close the combobox.
- [ ] **Expected:** `aria-expanded="false"` set immediately.

#### 3.3.2 Live region announcements — P1

- [ ] **Action:** Navigate to an option.
- [ ] **Expected:** Live region announces `"{Option Name}, not selected, {X} of {Y}"`.
- [ ] **Action:** Select an option.
- [ ] **Expected:** Live region announces `"{Option Name}, selected"` after ~300ms.

#### 3.3.3 aria-activedescendant on input — P0

- [ ] **Action:** Navigate to an option.
- [ ] **Expected:** Native `<input>` inside `auro-input` has `ariaActiveDescendantElement` pointing to the highlighted menu option.

---

## 4 — auro-datepicker

### 4.1 Desktop Popover Mode

#### 4.1.1 Open on input click — P0

- [ ] **Setup:** Render `<auro-datepicker>`.
- [ ] **Action:** Click the date input.
- [ ] **Expected:** Calendar bib opens below the trigger.

#### 4.1.2 Calendar renders and dates are selectable — P0

- [ ] **Action:** Click a date in the calendar.
- [ ] **Expected:** Date value set in input. Bib closes.

#### 4.1.3 Bib hides on outside focus — P0

- [ ] **Setup:** Open the datepicker bib.
- [ ] **Action:** Click a button outside the datepicker.
- [ ] **Expected:** Bib closes.

#### 4.1.4 Bib hides on blur — P0

- [ ] **Setup:** Focus the datepicker and open the bib.
- [ ] **Action:** Blur the datepicker.
- [ ] **Expected:** Bib closes.

#### 4.1.5 Range mode — P1

- [ ] **Setup:** Render `<auro-datepicker range>`.
- [ ] **Action:** Select start date, then end date.
- [ ] **Expected:** Both inputs populated. Range visually highlighted in calendar.

#### 4.1.6 Validation — P1

- [ ] **Setup:** Render `<auro-datepicker required>`.
- [ ] **Action:** Focus and blur without selecting a date.
- [ ] **Expected:** `validity` is `valueMissing`.

#### 4.1.7 Preset value — P1

- [ ] **Setup:** Render `<auro-datepicker value="01/01/2022">`.
- [ ] **Expected:** Input displays the preset date.

#### 4.1.8 Container-type containment — P0

- [ ] **Setup:** Place `<auro-datepicker>` inside a `container-type: inline-size` ancestor.
- [ ] **Action:** Open the datepicker.
- [ ] **Expected:** Calendar bib positioned correctly (escapes containment via popover top layer).

### 4.2 Fullscreen Dialog Mode

#### 4.2.1 Focus moves to close button on open — P0

- [ ] **Setup:** Render `<auro-datepicker>` at mobile width.
- [ ] **Action:** Open the datepicker.
- [ ] **Expected:** Fullscreen dialog opens. Focus moves to the close button via `calendar.focusCloseButton()`.

#### 4.2.2 Tab closes fullscreen dialog — P0

- [ ] **Setup:** Open datepicker in fullscreen mode.
- [ ] **Action:** Press Tab.
- [ ] **Expected:** Dialog closes. Focus returns to trigger.

#### 4.2.3 Date selection in fullscreen — P0

- [ ] **Action:** Tap a date in the fullscreen calendar.
- [ ] **Expected:** Date selected. For single mode, dialog closes and value is set. For range, first tap sets start date, second tap sets end date, then dialog closes.

#### 4.2.4 Close button works with Enter/Space — P1

- [ ] **Action:** Focus the close button in fullscreen and press Enter.
- [ ] **Expected:** Dialog closes.

---

## 5 — auro-counter-group

### 5.1 Desktop Popover Mode

#### 5.1.1 Dropdown renders with counter content — P0

- [ ] **Setup:** Render `<auro-counter-group isDropdown>` with counters.
- [ ] **Expected:** Trigger displays value text. Clicking opens bib with counter controls.

#### 5.1.2 Increment/decrement in bib — P0

- [ ] **Action:** Click `+` / `-` buttons in the bib.
- [ ] **Expected:** Counter values update. `value` and `total` properties reflect changes.

#### 5.1.3 Min/max enforcement — P1

- [ ] **Setup:** Render `<auro-counter-group max="5">` with counters totaling 5.
- [ ] **Expected:** Increment buttons disabled.

#### 5.1.4 Container-type containment — P1

- [ ] **Setup:** Place `<auro-counter-group isDropdown>` inside a `container-type: inline-size` ancestor.
- [ ] **Action:** Open the counter dropdown.
- [ ] **Expected:** Bib positioned correctly (escapes containment).

### 5.2 Fullscreen Dialog Mode

#### 5.2.1 Focus moves to close button on open — P0

- [ ] **Setup:** Render `<auro-counter-group isDropdown>` at mobile width.
- [ ] **Action:** Open the counter group.
- [ ] **Expected:** Fullscreen dialog opens. Focus moves to close button.

#### 5.2.2 Tab closes fullscreen dialog — P0

- [ ] **Setup:** Open counter-group in fullscreen mode.
- [ ] **Action:** Press Tab.
- [ ] **Expected:** Dialog closes. Focus returns to trigger.

#### 5.2.3 Counter interaction in fullscreen — P1

- [ ] **Action:** Tap `+` / `-` in fullscreen.
- [ ] **Expected:** Values update. No touch pass-through issues.

#### 5.2.4 VoiceOver +/- button accessibility — P1

- [ ] **Setup:** Enable VoiceOver on iOS. Open counter-group in fullscreen.
- [ ] **Action:** Activate `+` or `-` button via VoiceOver.
- [ ] **Expected:** Button activates correctly. Counter value changes.

---

## 6 — Cross-Component Accessibility

These apply to all dropdown consumers (select, combobox, datepicker, counter-group).

### 6.1 aria-activedescendant Across Shadow DOM — P0

- [ ] **Action:** Navigate options in select or combobox.
- [ ] **Expected:** `ariaActiveDescendantElement` on the trigger (select) or native input (combobox) references the highlighted `auro-menuoption`. Each option has a stable `id` (auto-generated if not provided).

### 6.2 Menu Options Have Correct Roles — P0

- [ ] **Expected:** Root `auro-menu` has `role="listbox"`. Each `auro-menuoption` has `role="option"`. Multi-select menus have `aria-multiselectable="true"`.

### 6.3 No Sticky Hover on Touch Devices — P1

- [ ] **Setup:** Open select or combobox on a touch device.
- [ ] **Action:** Tap an option, then scroll.
- [ ] **Expected:** Previously tapped option does **not** retain `:hover` styling. (Styles gated behind `@media (hover: hover)`.)

### 6.4 Popover Adds No ARIA Semantics — P1

- [ ] **Expected:** `popover="manual"` on the bib host adds **no implicit ARIA role or properties**. VoiceOver does not announce anything extra due to the popover attribute.

### 6.5 dialogRole="presentation" on Desktop — P1

- [ ] **Setup:** Open select or combobox in desktop mode.
- [ ] **Expected:** Inner dialog has `role="presentation"`. VoiceOver does not announce "dialog".

### 6.6 Fullscreen Dialog Announced Correctly — P1

- [ ] **Setup:** Open select or combobox in fullscreen mode.
- [ ] **Expected:** Dialog has native dialog role (no `role="presentation"` override). VoiceOver announces the dialog appropriately.

---

## No-Regression Baseline (PR #1346)

These behaviors were introduced or verified in PR #1346 and **must remain unchanged** after PR #1370:

| Behavior | Component(s) | Verification |
|---|---|---|
| `dialog.showModal()` for fullscreen mode | All consumers | Dialog opens; background inert; focus trapped |
| `dialog.setAttribute('open', '')` for desktop, preventing focus steal | All consumers | Desktop open doesn't move focus from trigger |
| `ariaActiveDescendantElement` cross-shadow binding | select, combobox | Option highlighted → trigger/input `ariaActiveDescendantElement` set |
| Native `cancel` event → `auro-bib-cancel` | dropdown | ESC in modal fires cancel; dropdown catches and hides |
| `noHideOnThisFocusLoss` prevents premature close | combobox, select, datepicker | Slotted content from light DOM doesn't trigger focusout close |
| `bibDialogLabel` for accessible dialog naming | combobox, select | Dialog has accessible name via visually hidden label |
| Deferred `aria-expanded` (150ms) | combobox | VoiceOver finishes character echo before "expanded" |
| Live region announcements | combobox, select | Active option position and selection confirmation announced |
| Touch pass-through prevention | combobox, select | Pointer-events disabled on open, re-enabled on touchstart |
| Trigger `inert = true` during fullscreen | combobox, select | VoiceOver cannot navigate to trigger behind dialog |
| Focus restoration to trigger on close | All consumers | After dialog closes, rAF restores focus to trigger |
| `_inFullscreenTransition` validation guard | combobox | Validation suppressed during focus migration |
| `delegatesFocus: true` on shadow roots | dropdown, input, counter, datepicker | Focus delegation from host to internal focusable element |
| Auto-generated IDs on menu options | menu | `menuoption-{counter}` on options without explicit `id` |

---

## Known Pre-Existing Issues

These are **not regressions** from PR #1346 or #1370. Do not block on these:

| Issue | Component | Ticket |
|---|---|---|
| Custom bib positions are off | dropdown, combobox, counter | — |
| Persistent error message disappears while typing | combobox | [ADO 1494311](https://itsals.visualstudio.com/E_Retain_Content/_workitems/edit/1494311) |
| Value attribute example doesn't preset value (doc issue) | combobox | [ADO 1494313](https://itsals.visualstudio.com/E_Retain_Content/_workitems/edit/1494313) |
| Matchword doesn't work on sub-menus | combobox | [ADO 1494315](https://itsals.visualstudio.com/E_Retain_Content/_workitems/edit/1494315) |
| Backspace to empty value closes bib | combobox | [ADO 1494432](https://itsals.visualstudio.com/E_Retain_Content/_workitems/edit/1494432) |
| Active label attribute not working | input | [ADO 1494433](https://itsals.visualstudio.com/E_Retain_Content/_workitems/edit/1494433) |
| Focusing readonly input enables active label | input | [ADO 1494436](https://itsals.visualstudio.com/E_Retain_Content/_workitems/edit/1494436) |
| Can type date before/after min/max | datepicker | [ADO 1494448](https://itsals.visualstudio.com/E_Retain_Content/_workitems/edit/1494448) |
| Stacked example layout broken | datepicker | [ADO 1494457](https://itsals.visualstudio.com/E_Retain_Content/_workitems/edit/1494457) |
| referenceDates attribute non-functional | datepicker | [ADO 1494477](https://itsals.visualstudio.com/E_Retain_Content/_workitems/edit/1494477) |
| Mobile header/label alignment | datepicker | [ADO 1494481](https://itsals.visualstudio.com/E_Retain_Content/_workitems/edit/1494481) |
| Long labels overflow container | datepicker | [ADO 1494482](https://itsals.visualstudio.com/E_Retain_Content/_workitems/edit/1494482) |
| No divider between range inputs in error | datepicker | [ADO 1494485](https://itsals.visualstudio.com/E_Retain_Content/_workitems/edit/1494485) |
| noToggle example breaks other dropdowns | dropdown | [ADO 1494298](https://itsals.visualstudio.com/E_Retain_Content/_workitems/edit/1494298) |
| Reset method causes validation error | combobox | [ADO 1494423](https://itsals.visualstudio.com/E_Retain_Content/_workitems/edit/1494423) |
| Max-height in mobile has no scroll indicator | select | [ADO 1494291](https://itsals.visualstudio.com/E_Retain_Content/_workitems/edit/1494291) |
| auro-button not rendering in counter API page | counter | [ADO 1510603](https://itsals.visualstudio.com/E_Retain_Content/_workitems/edit/1510603) |

---

## Automation Mapping

Maps each scenario section to existing automated test coverage and identifies gaps for new tests.

### Existing Coverage

| Scenario | Test File | Status |
|---|---|---|
| **1.1 Desktop popover lifecycle** | `components/dropdown/test/auro-dropdown.test.js` — "popover desktop mode" suite (9 tests) | **Covered** |
| **1.1.4 Container-type containment escape** | `auro-dropdown.test.js` — "container-type containment escape" suite (functional); `component.stories.ts` — 6 `chromatic-enabled` stories: `DropdownInContainerTypeInlineSize`, `DropdownInNarrowContainerType`, `DropdownInNestedContainerTypes`, `DropdownInClippingContainerType`, `DropdownInScrollableContainerType`, `DropdownInContainerTypeSize` (Chromatic visual) | **Covered (functional + visual)** |
| **1.2.1 showModal path** | `auro-dropdown.test.js` — "uses showModal for fullscreen bib" | **Covered** |
| **1.2.3 ESC closes fullscreen** | `auro-dropdown.test.js` — "handles auro-bib-cancel event" | **Covered** |
| **1.3 Trigger interaction** | `auro-dropdown.test.js` — toggle, spacebar, enter, noToggle, disableEventShow | **Covered** |
| **1.4 Keyboard bridge** | `auro-dropdown.test.js` — "dialog keyboard bridge" suite (6 tests) | **Covered** |
| **1.5 Events** | `auro-dropdown.test.js` — triggerClick, toggled | **Covered** |
| **1.6 show/hide/focus** | `auro-dropdown.test.js` — "programmatically hide" | **Covered** |
| **2.1.7 showBib/hideBib** | `components/select/test/auro-select.test.js` — showBib/hideBib | **Covered** |
| **2.1.8 Preset value** | `auro-select.test.js` — presetValueFixture | **Covered** |
| **2.1.9 Multi-select** | `auro-select.test.js` — multiSelectFixture | **Covered** |
| **2.2.1 Fullscreen focus → close button** | `auro-select.test.js` — "focuses close button when fullscreen dialog opens" | **Covered** |
| **2.2.2 Tab closes fullscreen** | `auro-select.test.js` — "Tab key closes fullscreen dialog" | **Covered** |
| **3.1.1 Typing opens bib** | `components/combobox/test/auro-combobox.test.js` — multiple tests | **Covered** |
| **3.1.3 Enter selects** | `auro-combobox.test.js` — "hides bib when making selection with Enter" | **Covered** |
| **3.1.4 Tab selects** | `auro-combobox.test.js` — "selects active option when hitting Tab" | **Covered** |
| **3.1.9 Filter validation** | `auro-combobox.test.js` — "enforces menu selection when behavior is set to filter" | **Covered** |
| **3.2.1 Focus → inputInBib** | `auro-combobox.test.js` — "focuses input in bib when fullscreen dialog opens" | **Covered** |
| **3.2.2 Tab closes fullscreen** | `auro-combobox.test.js` — "Tab key closes fullscreen dialog" | **Covered** |
| **4.1.1 Open on click** | `components/datepicker/test/auro-datepicker.test.js` — "opens bib on trigger click" | **Covered** |
| **4.1.3 Focus loss closes** | `auro-datepicker.test.js` — hides on outside click and blur | **Covered** |
| **4.1.6 Validation** | `auro-datepicker.test.js` — required, invalid date states | **Covered** |
| **5.1.1 Counter render** | `components/counter/test/auro-counter-group.test.js` — rendering logic suite | **Covered** |
| **5.1.2 Increment/decrement** | `auro-counter-group.test.js` — keyboard navigation | **Covered** |
| **5.1.3 Min/max** | `auro-counter-group.test.js` — updateValue suite | **Covered** |

### Gaps — New Tests Needed

| Scenario | Component | Priority | Suggested Test Location |
|---|---|---|---|
| **1.2.4 Responsive mode switch while open** | dropdown | P1 | `auro-dropdown.test.js` — use `setViewport` to resize during open; assert mode transition |
| **1.6.2 setActiveDescendant** | dropdown | P1 | `auro-dropdown.test.js` — call method, assert `ariaActiveDescendantElement` |
| **2.1.2 Full keyboard nav (desktop)** | select | P0 | `auro-select.test.js` — ArrowDown/Up/Enter/Escape cycle in desktop mode |
| **2.1.3 Tab selects active option (desktop)** | select | P0 | `auro-select.test.js` — highlight option + Tab; assert selection |
| **2.1.6 Type-ahead** | select | P1 | `auro-select.test.js` — type character, assert visual focus moves |
| **2.3.1 Trigger roles** | select | P0 | `auro-select.test.js` — assert `role="combobox"`, `aria-expanded`, `aria-controls` |
| **2.3.4 aria-activedescendant** | select | P0 | `auro-select.test.js` — navigate option, assert `ariaActiveDescendantElement` |
| **3.1.2 Arrow key navigation (desktop)** | combobox | P0 | `auro-combobox.test.js` — desktop viewport; ArrowDown/Up; assert activedescendant |
| **3.3.1 Deferred aria-expanded** | combobox | P1 | `auro-combobox.test.js` — open; check immediate `aria-expanded`; wait 150ms; re-check |
| **3.3.3 aria-activedescendant on input** | combobox | P0 | `auro-combobox.test.js` — navigate option; assert `inputElement.ariaActiveDescendantElement` |
| **4.1.8 Container-type containment** | datepicker | P0 | `auro-datepicker.test.js` — fixture with containment ancestor |
| **4.2.1 Focus → close button** | datepicker | P0 | `auro-datepicker.test.js` — mobile viewport; open; assert focus on close button |
| **4.2.2 Tab closes fullscreen** | datepicker | P0 | `auro-datepicker.test.js` — Tab keydown in fullscreen; assert dialog closed |
| **5.1.4 Container-type containment** | counter | P1 | `auro-counter-group.test.js` — fixture with containment ancestor |
| **5.2.1 Focus → close button (fullscreen)** | counter | P0 | `auro-counter-group.test.js` — mobile viewport; open; assert focus |
| **5.2.2 Tab closes fullscreen** | counter | P0 | `auro-counter-group.test.js` — Tab in fullscreen; assert close |
| **6.1 aria-activedescendant cross-shadow** | menu | P0 | Add integration test asserting `ariaActiveDescendantElement` resolves across shadow roots |
| **6.3 No sticky hover** | menu | P1 | Manual only — requires real touch device |
| **6.4 Popover no ARIA semantics** | dropdown | P1 | `auro-dropdown.test.js` — open desktop; assert no implicit ARIA role from popover |

### Container-Type Story Replication Template

When adding container-type visual regression coverage for a downstream dropdown consumer
(`auro-select`, `auro-combobox`, `auro-datepicker`, `auro-counter-group`), follow this exact
pattern so coverage is consistent across all components.

#### Step 1 — Add stories to `components/{component}/stories/component.stories.ts`

Add one story per container variant, each tagged `chromatic-enabled` and referencing the
appropriate scenario ID from that component's section of this guideline
(e.g. `§4.1.8` for datepicker, `§5.1.4` for counter-group):

```typescript
// ─── §X.Y  Container-type containment escape — P0 ──────────────────────────
export const {PascalComponent}InContainerTypeInlineSize: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<div style="container-type: inline-size; width: 400px; height: 300px; overflow: visible; border: 1px dashed #aaa; padding: 0.5rem;">
  <auro-{component} chevron aria-label="...">
    <!-- same props/content as the unit-test fixture for this scenario -->
  </auro-{component}>
</div>
  `,
  async play({ canvas, canvasElement }: { canvas: any; canvasElement: HTMLElement }) {
    const trigger = await canvas.findByShadowRole('button');
    await userEvent.click(trigger);
    const el = canvasElement.querySelector('auro-{component}');
    await expect(el).toHaveAttribute('open');
  },
};
```

Repeat for each of the six container variants defined in §1.1.4:

| Story suffix | Key `style` attributes |
|---|---|
| `InContainerTypeInlineSize` | `container-type: inline-size; width: 400px; overflow: visible` |
| `InNarrowContainerType` | `container-type: inline-size; width: 200px; overflow: visible` |
| `InNestedContainerTypes` | Two nested `container-type: inline-size` divs |
| `InClippingContainerType` | `container-type: inline-size; overflow: hidden; height: 120px` |
| `InScrollableContainerType` | `container-type: inline-size; overflow: auto; height: 250px` + tall inner div |
| `InContainerTypeSize` | `container-type: size; width: 450px; height: 350px` |

#### Step 2 — Update Automation Mapping in this guideline

Add a row to **Existing Coverage**:

```markdown
| **X.Y Container-type containment escape** | `{component}.test.js` — containment fixture (functional); `component.stories.ts` — 6 `chromatic-enabled` stories (Chromatic visual) | **Covered (functional + visual)** |
```

Remove the corresponding row from **Gaps — New Tests Needed**.

#### Step 3 — Naming convention

- Export: `{PascalComponent}In{Variant}` — e.g. `SelectInContainerTypeInlineSize`.
- Section comment: `§X.Y  Container-type containment escape — P0` (match guideline ID + priority).
- Tags: always `['!autodocs', 'chromatic-enabled']` — no exceptions.

---

### Running Automated Tests

```bash
# All tests (serial to avoid port conflicts)
npm run test

# Specific component
npx turbo run test --filter=@aurodesignsystem/auro-dropdown
npx turbo run test --filter=@aurodesignsystem/auro-select
npx turbo run test --filter=@aurodesignsystem/auro-combobox
npx turbo run test --filter=@aurodesignsystem/auro-datepicker
npx turbo run test --filter=@aurodesignsystem/auro-counter
```

---

## References

- [PR #1346 — Replace Popover API with dialog element](https://github.com/AlaskaAirlines/auro-formkit/pull/1346)
- [PR #1370 — Use Popover API to escape container-query containment](https://github.com/AlaskaAirlines/auro-formkit/pull/1370)
- [Issue #1310 — Replace Popover API with Dialog Element](https://github.com/AlaskaAirlines/auro-formkit/issues/1310)
- [Keyboard interaction spec](../docs/keyboard-spec.md)
- [Popover a11y assessment](../components/dropdown/popover-a11y-assessment.md)
- [WAI-ARIA Select-Only Combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/)
- [WAI-ARIA Dialog (Modal)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)

---

## Deferred Work — Dialog Role Suppression in auro-select (§2.3.2 / §6.5)

### What was attempted

During the select regression test pass, unit tests were written for §2.3.2 and §6.5 — specifically asserting that `auro-select`'s inner `<dialog>` has `role="presentation"` in desktop (non-fullscreen) mode so VoiceOver does not announce "dialog" around the listbox content. Three unit tests were added:

- **§6.4** — bib host has no `popover` attribute before first open
- **§6.4** — bib host gets `popover="manual"` on desktop open and removes it on close
- **§2.3.2 / §6.5** — inner dialog has `role="presentation"` when open on desktop

### Why it was reverted

Unlike `auro-combobox`, which already calls `updateBibDialogRole()` to set `dialogRole = 'presentation'` on the bib element, `auro-select` had no equivalent logic. The `dialogRole` property lives on `auro-dropdownBib` and is only set if the parent component explicitly assigns it. Without the component-level change the tests failed immediately — `dialog.getAttribute('role')` returned `null`.

To make the tests pass, `auro-select.js` required the following additions:

1. A new `updateBibDialogRole()` method mirroring combobox's implementation:
   ```js
   updateBibDialogRole() {
     const bibEl = this.dropdown?.bibElement?.value;
     if (!bibEl) return;
     bibEl.dialogRole = this.dropdown.isBibFullscreen ? undefined : 'presentation';
   }
   ```
2. Calls to that method in three places inside `configureDropdown()`: the `auroDropdown-toggled` listener, the `auroDropdown-strategy-change` listener, and once at the end for initial state.

These changes were outside the agreed test-only scope of this work (regression tests should not require component runtime changes), so both the implementation and the dependent tests were reverted.

### Why this should be fixed in a future PR

`auro-combobox` already suppresses the VoiceOver "dialog" announcement on desktop via `dialogRole = 'presentation'`. `auro-select` does not. This is an inconsistency — VoiceOver users navigating a `<auro-select>` on desktop may hear an unexpected "dialog" announcement when the bib opens, which disrupts the combobox pattern and does not match the WAI-ARIA Select-Only Combobox spec.

The fix is small and well-understood. When a dedicated component change PR is appropriate:

1. Add `updateBibDialogRole()` to `auro-select.js` (identical pattern as combobox).
2. Wire it into `configureDropdown()` as described above.
3. Restore the three unit tests removed here (§6.4 popover lifecycle ×2, §2.3.2/6.5 dialog role).
4. Update the **Automation Mapping → Existing Coverage** table to mark §2.3.2 and §6.5 as **Covered** for select.

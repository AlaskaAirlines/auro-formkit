# Release Notes — Keyboard Maps

## Migration Guide

This release includes changes that may require code updates beyond simply updating to the latest package version.

### 1. `disableFocusTrap` removed (auro-dropdown)

The `disableFocusTrap` attribute on `auro-dropdown` has been removed. If you were using this attribute, it can be safely removed from your markup — focus trapping is now managed automatically.

```html
<!-- Remove this attribute, no replacement needed -->
<auro-dropdown disableFocusTrap> ... </auro-dropdown>
```

### 2. Counter `value` property type coercion

The `value` property on `auro-counter` expects a number in string format (e.g., `"3"`). Values of `undefined`, `null`, or non-numeric strings are now normalized to `undefined`. If you were setting `value` to arbitrary strings, those will now resolve to `undefined`.

---

## New Features

### Keyboard handling overhaul

All dropdown-based components now have consistent, well-defined keyboard interactions following WAI-ARIA patterns:

- **auro-combobox** — ArrowUp/Down to navigate options, Enter to select, Tab to cycle through the clear button in fullscreen mode, Escape to close and return focus to the trigger
- **auro-counter** — ArrowUp to increment, ArrowDown to decrement when the counter is focused
- **auro-datepicker** — Escape closes the calendar; other keyboard events controlling the behavior of the dropdown and content within is now restricted. Full calendar keyboard navigation is planned for a future release as part of a component redesign.
- **auro-dropdown** — Enter/Space to toggle open/close, Escape to close, Tab to move through focusable content within the dropdown
- **auro-select** — ArrowUp/Down to navigate options, Enter to select, Space to open, Home/End to jump to first/last option, Tab to select-and-close, type-ahead character search

### Keyboard behavior documentation

New documentation for keyboard interactions has been added to each component, including detailed key-by-key behavior tables and interactive demos.

- [auro-combobox](https://auro.alaskaair.com/components/auro/combobox/keyboard)
- [auro-counter](https://auro.alaskaair.com/components/auro/counter/keyboard)
- [auro-counter-group](https://auro.alaskaair.com/components/auro/counter-group/keyboard)
- [auro-datepicker](https://auro.alaskaair.com/components/auro/datepicker/keyboard)
- [auro-dropdown](https://auro.alaskaair.com/components/auro/dropdown/keyboard)
- [auro-select](https://auro.alaskaair.com/components/auro/select/keyboard)

> Additional components will be added in a future update.

### `disableKeyboardHandling` attribute (auro-dropdown)

A new `disableKeyboardHandling` attribute has been added. If set, the dropdown will not handle any keyboard events internally, and you are responsible for managing keyboard interactions on the dropdown content.

```html
<auro-dropdown disableKeyboardHandling> ... </auro-dropdown>
```

---

## Bug Fixes

### auro-combobox

- **A11Y**
  - **Screen reader support in fullscreen mode** ([AB#1525392](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1525392) - Reported by: Dale Sande) — Combobox now correctly announces option navigation and selection to screen readers when displayed in fullscreen (mobile) mode. Previously, announcements could be missed because the trigger area was inert while the fullscreen dialog was open.
- **Keyboard Behavior**
  - **Escape no longer closes parent dialogs and drawers** — Pressing Escape to close the combobox dropdown inside an `auro-dialog` or `auro-drawer` no longer bubbles up and closes the parent container.
  - **Arrow keys no longer move the text cursor** — When the dropdown is open and you press ArrowUp/Down to navigate through options, the text cursor in the input field no longer jumps to the beginning or end of the text. The cursor stays in place while the option highlight moves.
  - **Alt/Meta + ArrowUp/Down supported** ([AB#1528758](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1528758)) — When the dropdown is open, pressing Alt+ArrowDown or Cmd+ArrowDown jumps to the last rendered option, and Alt+ArrowUp or Cmd+ArrowUp jumps to the first rendered option. Disabled options are skipped. Without a modifier, arrow keys continue to move one option at a time.
  - **Arrow keys no longer skip nested menus** ([AB#1523822](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1523822)) — Navigating options with ArrowUp/Down now correctly traverses items inside nested menus instead of skipping over them.
- **UI/UX**
  - **Active option updates after filtering** ([AB#1528032](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1528032)) — When available options change due to input filtering, the visually highlighted (focused, not selected) option is recalculated. If the previously highlighted option is no longer visible, the first available option is highlighted.
  - **Trailing whitespace no longer breaks filtering** ([AB#1520589](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1520589)) — When editing input text using cursor keys and backspace, residual trailing whitespace could remain in the input value (e.g., `"a "` instead of `"a"`), causing the filter to fail to match options. The input value is now trimmed correctly so filtering works as expected.
  - **Value updates on input**([AB#1528032](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1528032)) — Combobox behaves as a suggestion list by default, meaning any value typed in the input is valid and options are provided as suggestions. Previously, when a user typed text that didn't match any option, the combobox `value` property remained unchanged (stuck on the last selected option or empty). Now the `value` property updates in real time as the user types, regardless of whether the text matches an available option. This allows forms to capture free-text input from comboboxes. Note: this does not apply when `behavior="filter"` is set — in filter mode, the combobox requires an option to be selected for the value to update, and will fail validation if no option is selected.
  - **Fullscreen close no longer steals focus** — Previously, closing the combobox in desktop mode would force focus back to the input, even if the user had already moved focus elsewhere (e.g., by clicking on another element). Now focus is only explicitly returned to the input when closing a fullscreen (mobile) combobox, which requires it because the fullscreen dialog takes over the page. In desktop mode, the browser's natural focus behavior is preserved.
  - **Option list scrolls when it exceeds available space** — Previously, when there were more options than could fit in the dropdown, the option list did not scroll and overflowing options were inaccessible. The option list now scrolls correctly.

### auro-counter

- **A11Y**
  - **VoiceOver swipe gestures work in counter-group dropdown** ([AB#1516615](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1516615) - Reported by: Dale Sande) — On mobile devices using VoiceOver, swiping up and down now correctly increments and decrements counter values inside a counter-group dropdown. Previously, these gestures had no effect.
- **Events**
  - **Value updates fire correctly** — Counter components now reliably trigger value updates and input events.
- **Keyboard Behavior**
  - **Escape no longer closes parent dialogs and drawers** — Pressing Escape to close the counter-group dropdown inside an `auro-dialog` or `auro-drawer` no longer bubbles up and closes the parent container.
  - **Tab navigation within counter-group dropdown** — When a counter-group is displayed inside a dropdown, individual counters can now be tabbed through correctly. Previously, focus would get stuck on the first counter and not advance to subsequent counters.
- **UI/UX**
  - **Counter-group initializes with correct trigger value** — Previously, the counter-group's trigger text could appear empty or stale on initial render. The counter-group now calculates and displays the correct total in the trigger as soon as its counters are first rendered. This is particularly important when presetting counter values in the group, as the trigger now reflects the preset totals immediately without requiring user interaction.

### auro-datepicker

- **Keyboard Behavior**
  - **Escape no longer closes parent dialogs and drawers** — Pressing Escape to close the datepicker calendar inside an `auro-dialog` or `auro-drawer` no longer bubbles up and closes the parent container.
- **UI/UX**
  - **Calendar closes on focus loss** ([AB#1528738](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1528738)) — The datepicker calendar now properly closes when focus leaves the component, with correct handling of fullscreen transitions.
  - **Input clear button no longer reopens the calendar** — Clicking or pressing Enter/Space on the input's clear button no longer triggers the calendar to reopen.
  - **Focus restored correctly after closing fullscreen** — Previously, closing the fullscreen calendar would always pull focus back to the datepicker input, even if the user had already tabbed to another element on the page. Now focus is only returned to the input when the calendar is closed by an explicit action like pressing Escape or selecting a date.
  - **Out-of-range dates no longer appear interactive in the calendar** ([AB#1494448](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1494448)) — When a user types a date outside the allowed min/max range into the input and then opens the calendar, the corresponding date cell now correctly appears disabled. Previously, hovering over that date displayed interactive hover styles, implying it could be selected.

### auro-dropdown

- **A11Y**
  - **Disabled state announced to assistive technology** — The dropdown trigger now correctly communicates `aria-disabled` when the `disabled` attribute is set.
- **UI/UX**
  - **Fullscreen mode works with late-loading stylesheets** — The mobile breakpoint is now resolved lazily, fixing an issue where fullscreen mode failed to activate in WebKit when external stylesheets hadn't loaded yet at component initialization.
  - **`noToggle` example no longer breaks other dropdowns** ([AB#1494298](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1494298)) — Interacting with a `noToggle` dropdown no longer causes other dropdowns on the same page to stop functioning correctly.

### auro-menu

- **UI/UX**
  - **Consistent option height when selecting and deselecting** — Previously, selected menu options displaying a checkmark icon were slightly taller than deselected options without the icon, causing a visible height shift when toggling selections. All options now maintain a consistent height regardless of selection state.

### auro-select

- **A11Y**
  - **Screen reader support in fullscreen mode** ([AB#1525392](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1525392) - Reported by: Dale Sande) — Select now correctly announces option navigation and selection to screen readers when displayed in fullscreen (mobile) mode. Previously, announcements could be missed because the trigger area was inert while the fullscreen dialog was open.
- **Keyboard Behavior**
  - **Escape no longer closes parent dialogs and drawers** — Pressing Escape to close the select dropdown inside an `auro-dialog` or `auro-drawer` no longer bubbles up and closes the parent container.
  - **Enter no longer blocks form submission** — When the dropdown is closed, pressing Enter is no longer consumed by the select, allowing native form submission to proceed.
  - **Enter no longer silently toggles selection in multiselect** ([AB#1528031](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1528031)) — In multiselect mode, pressing Enter while the dropdown was closed would toggle the last highlighted option without opening the dropdown. Now pressing Enter opens the dropdown as expected instead of silently modifying the selection.
  - **Arrow keys no longer skip nested menus** ([AB#1523822](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1523822)) — Navigating options with ArrowUp/Down now correctly traverses items inside nested menus instead of skipping over them.
  - **Keyboard works immediately** — Select keyboard handling now works reliably as soon as the component renders.
  - **Option selection works on first Enter press** — Selecting an option with the keyboard no longer requires pressing Enter twice. Previously, the first Enter press only closed the dropdown without committing the selection, requiring a second Enter press to actually select the option. Now a single Enter press selects the highlighted option and closes the dropdown in one action.
- **UI/UX**
  - **Prevent deselect on single-select** — Selecting an already-selected option in single-select mode no longer deselects it.
  - **`value` property respected on hot reload** ([AB#1483855](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1483855) - Reported by: Mitchel Spears) — The select component now correctly responds to changes to the `value` property during a hot reload, ensuring the displayed selection stays in sync with the programmatic value.
  - **Option list scrolls when it exceeds available space** — Previously, when there were more options than could fit in the dropdown, the option list did not scroll and overflowing options were inaccessible. The option list now scrolls correctly.

### All dropdown-based components (select, combobox, datepicker, counter-group)

- **Keyboard Behavior**
  - **Escape no longer closes parent dialogs and drawers** — Pressing Escape to close a dropdown inside an `auro-dialog` or `auro-drawer` no longer bubbles up and closes the parent container. Only the dropdown itself closes; the dialog or drawer remains open.
- **UI/UX**
  - **Support for container query enabled content** ([AB#1514679](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1514679) - Reported by: Caleb Wells) — Dropdown components now work correctly when placed inside container query enabled content, such as elements using Tailwind CSS's `@container` class. Previously, `contain: layout` on an ancestor could prevent the dropdown popover from rendering in the correct position.

### General

- **Events**
  - **Input clear button key events no longer propagate** ([AB#1510818](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1510818)) — Key events on input and datepicker clear buttons no longer bubble up to parent components, preventing unintended dropdown opening or option selection. In combobox and select, this means pressing ArrowUp/Down while the clear button is focused no longer opens the dropdown.

- **Keyboard Behavior**
  - **Consistent Tab and Enter focus behavior** ([AB#1528762](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1528762)) — Fixed inconsistent focus movement when tabbing through and pressing Enter on dropdown-based components.

- **UI/UX**
  - **Focus restored after closing fullscreen dropdowns** — Focus is properly returned to the trigger element when a fullscreen dropdown closes.

---

## Improvements

### Performance

- **Lazy breakpoint resolution** — Mobile breakpoint CSS tokens are now resolved on-demand instead of cached at component initialization, eliminating a race condition with external stylesheets in WebKit.

### Accessibility

- **Fullscreen screen reader support** — Dropdown-based components are now fully screen reader compatible in both desktop and mobile/fullscreen viewports.
- **Disabled dropdown announcement** — Disabled dropdowns now announce their state to assistive technology.


---

## Testing

### New and Changed Unit Tests

| Component | Rendering | User Stories | Properties | Slots | Public Functions | A11Y | Mouse Behavior | Keyboard Behavior | Total |
|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| checkbox | — | 3 new | 7 new | 5 new | — | — | 2 new | — | 17 new |
| combobox | 1 new | 18 new, 1 changed | 13 new | 8 new | 3 new | 7 new | 7 new | 29 new | 86 new, 1 changed |
| counter | — | — | — | 5 new | — | — | 4 new | 6 new | 15 new |
| datepicker | — | 4 new | 5 new | 10 new | — | — | — | 4 new | 23 new |
| dropdown | 1 new | — | 3 new | 3 new | — | 3 new | 1 new | 2 new | 13 new |
| form | — | — | — | 1 new | — | — | 2 new | — | 3 new |
| input | — | — | — | 7 new | — | — | — | — | 7 new |
| menu | 3 new | 16 new | 5 new | 3 new | 2 new | — | 1 new | 7 new | 38 new |
| radio | — | — | 3 new | 3 new | — | — | — | — | 6 new |
| select | — | — | — | 8 new | — | 4 new | 7 new | 32 new | 51 new |
| **TOTALS** | **5 new** | **41 new, 1 changed** | **36 new** | **53 new** | **5 new** | **14 new** | **24 new** | **80 new** | **259 new, 1 changed** |

### Storybook visual regression changes

Chromatic visual regression tests updated in 4 components. These are render-only tests used for visual regression testing.

| Component | Total Stories | New | Changed |
|:---|:---:|:---:|:---:|
| combobox | 13 | 3 | 2 |
| datepicker | 10 | — | — |
| menu | 8 | 6 | — |
| select | 12 | 2 | 5 |
| **TOTALS** | **43** | **11** | **7** |

### Framework integration tests

New Playwright tests validate that Auro web components work correctly when consumed through React and Svelte wrapper layers — not just in a vanilla JavaScript environment. These tests catch framework-specific issues such as components losing state after a virtual DOM re-render, event bindings failing across framework boundaries, or props not syncing after a remount. The initial suites below target recently reported React and Svelte integration issues; coverage will be expanded in future releases.

| Component | Tests | What it covers |
|:---|:---:|:---|
| auro-combobox | 4 | Initial rendering, value persistence across DOM remount, invalid value handling |
| auro-counter-group | 3 | Dropdown rendering, Tab/Shift+Tab focus management within the dropdown |
| auro-counter-group | 2 | Initial rendering with preset values, value persistence across DOM remount |
| auro-datepicker | 7 | Focus-loss behavior in fullscreen and non-fullscreen modes, keyboard contract for bib open/close |
| auro-select | 8 | Single-select and multiselect initial rendering, value persistence across DOM remount, invalid value handling |
| auro-counter | 2 | Initial rendering, value persistence across DOM remount |
| **TOTALS** | **26** | |

### Manual Test Plans

Manual test plans have been introduced to complement the automated test suite, providing structured verification of interactive behaviors that are difficult to validate programmatically.

- [checkbox](https://github.com/AlaskaAirlines/auro-formkit/tree/dev/components/checkbox/test/MANUAL_TESTING.md)
- [combobox](https://github.com/AlaskaAirlines/auro-formkit/tree/dev/components/combobox/test/MANUAL_TESTING.md)
- [counter](https://github.com/AlaskaAirlines/auro-formkit/tree/dev/components/counter/test/MANUAL_TESTING.md)
- [datepicker](https://github.com/AlaskaAirlines/auro-formkit/tree/dev/components/datepicker/test/MANUAL_TESTING.md)
- [dropdown](https://github.com/AlaskaAirlines/auro-formkit/tree/dev/components/dropdown/test/MANUAL_TESTING.md)
- [form](https://github.com/AlaskaAirlines/auro-formkit/tree/dev/components/form/test/MANUAL_TESTING.md)
- [input](https://github.com/AlaskaAirlines/auro-formkit/tree/dev/components/input/test/MANUAL_TESTING.md)
- [menu](https://github.com/AlaskaAirlines/auro-formkit/tree/dev/components/menu/test/MANUAL_TESTING.md)
- [radio](https://github.com/AlaskaAirlines/auro-formkit/tree/dev/components/radio/test/MANUAL_TESTING.md)
- [select](https://github.com/AlaskaAirlines/auro-formkit/tree/dev/components/select/test/MANUAL_TESTING.md)

> All manual test plans have been executed as part of this release and will be included in the release process going forward.





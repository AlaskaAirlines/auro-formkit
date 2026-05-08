# Release Notes

This document outlines all changes since the 5.10.0 release.

## Migration Guide

1. **auro-datepicker — Update slot names for screen reader labels**
    - Remove any `bib.fullscreen.dateLabel` slot content.
    - Add `fromLabel` and `bib.fullscreen.fromLabel` slots (and `toLabel` / `bib.fullscreen.toLabel` if using `range`) to all `<auro-datepicker>` elements.

1. **auro-dropdown — Remove `disableFocusTrap` attribute**
    - The `disableFocusTrap` attribute has been removed. It can be safely deleted from any `<auro-dropdown>` usage — focus trapping is now managed automatically.

1. **auro-counter — `value` property expects a numeric string**
    - The `value` property now expects a number in string format (e.g., `"3"`). Values of `undefined`, `null`, or non-numeric strings are normalized to `undefined`.

## Features

### AURO-FORM

- **Smarter form submission** [AB#1485830](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1485830)

    Pressing the `Enter` key while focus is inside a form (e.g. focus in an auro-input) now submits the form.

    **Migration Guide:** _No changes required._

### AURO-DATEPICKER

- **Improved date picker labels** [AB#1398255](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1398255)

    The datepicker better implements ARIA labeling, making it easier to understand for people using screen readers, particularly when using the `snowflake` layout.

    **Migration Guide:**

    1. Remove any defined `bib.fullscreen.dateLabel` slot content.
    1. It is now *required* to use the `fromLabel` and `bib.fullscreen.fromLabel` slots (and the `toLabel` and `bib.fullscreen.toLabel` slots if using `range`) in order to ensure screen reader support with all `<auro-datepicker>` elements of any layout. Add slot content as necessary.

        ```diff
        <auro-datepicker range layout="snowflake" shape="snowflake" appearance="inverse" placeholder="MM/DD/YYYY">
            <span slot="ariaLabel.bib.close">Close Calendar</span>
            <span slot="label">Dates</span>
            <span slot="bib.fullscreen.headline">Datepicker Headline</span>
        -   <span slot="bib.fullscreen.dateLabel">Choose a date</span>
        +   <span slot="fromLabel">Choose a date</span>
        +   <span slot="toLabel">To Date Test</span>
        +   <span slot="bib.fullscreen.fromLabel">Choose a date</span>
        +   <span slot="bib.fullscreen.toLabel">To Date Test</span>
        </auro-datepicker>
        ```

- **Input event for value tracking**

    The datepicker now dispatches an `input` event when the value changes, making it easier to track value updates in real time.

    **Migration Guide:** _No changes required._

### AURO-COMBOBOX/COUNTER/DATEPICKER/DROPDOWN/SELECT

- **Keyboard handling overhaul**

    All dropdown-based components now have consistent, well-defined keyboard interactions following WAI-ARIA patterns:

    - **auro-combobox** — ArrowUp/Down to navigate options, Enter to select, Tab to cycle through the clear button in fullscreen mode, Escape to close and return focus to the trigger
    - **auro-counter** — ArrowUp to increment, ArrowDown to decrement when the counter is focused
    - **auro-datepicker** — Escape closes the calendar; other keyboard events controlling the behavior of the dropdown and content within are now restricted
    - **auro-dropdown** — Enter/Space to toggle open/close, Escape to close, Tab to move through focusable content within the dropdown
    - **auro-select** — ArrowUp/Down to navigate options, Enter to select, Space to open, Home/End to jump to first/last option, Tab to select-and-close, type-ahead character search

    **Migration Guide:**

    1. The `disableFocusTrap` attribute on `auro-dropdown` has been removed. If you were using this attribute, it can be safely removed — focus trapping is now managed automatically.

        ```diff
        - <auro-dropdown disableFocusTrap> ... </auro-dropdown>
        + <auro-dropdown> ... </auro-dropdown>
        ```

    1. The `value` property on `auro-counter` expects a number in string format (e.g., `"3"`). Values of `undefined`, `null`, or non-numeric strings are now normalized to `undefined`.

### AURO-DROPDOWN

- **`disableKeyboardHandling` attribute**

    A new `disableKeyboardHandling` attribute has been added. If set, the dropdown will not handle any keyboard events internally, and you are responsible for managing keyboard interactions on the dropdown content.

    **Migration Guide:** _No changes required._

### AURO-MENUOPTION

- **`noMatch` property for empty state**

    A new `noMatch` property on `auro-menuoption` allows it to serve as a "no matching results" placeholder. Options with `noMatch` set will not be highlighted or selectable when all regular options are filtered out.

    **Migration Guide:** _No changes required._

## Bug Fixes

_Note: Bug fixes do not require migration steps. Updating to this version is all that is necessary to implement these changes._

### AURO-COMBOBOX/COUNTER/DATEPICKER/SELECT

- **Mobile VoiceOver click through** — [AB#1385830](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1385830)

    Fixed an issue where a user could interact with page content behind a dropdown bib while using VoiceOver accessibility tools on a mobile device.

- **Mobile scroll lock** — [AB#1490375](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1490375)

    Fixed a bug where the page would get stuck and unable to scroll after closing a dropdown on a mobile device, including when using the browser back button.

- **Screen reader support in fullscreen mode** — [AB#1525392](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1525392)

    Dropdown-based components now correctly announce option navigation and selection to screen readers when displayed in fullscreen (mobile) mode.

- **Escape no longer closes parent dialogs and drawers**

    Pressing Escape to close a dropdown inside an `auro-dialog` or `auro-drawer` no longer bubbles up and closes the parent container. Only the dropdown itself closes.

- **Support inside dialog and drawer components**

    Dropdown and select components now work correctly when placed inside `auro-dialog` and `auro-drawer`.

- **Consistent Tab and Enter focus behavior** — [AB#1528762](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1528762)

    Fixed inconsistent focus movement when tabbing through and pressing Enter on dropdown-based components.

- **Support for container query enabled content** — [AB#1514679](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1514679)

    Dropdown components now work correctly when placed inside container query enabled content, such as elements using Tailwind CSS's `@container` class.

- **Mobile dropdown close on tap** — [AB#1536433](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1536433)

    Fixed an issue where tapping outside a dropdown on mobile did not close it reliably.

### AURO-COMBOBOX/SELECT

- **Menu selections with mobile device VoiceOver** — [AB#1467197](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1467197)

    Fixed an issue where mobile device VoiceOver users were unable to make menu selections.

### AURO-COMBOBOX

- **Async option load support**

    When options are loaded asynchronously (e.g., from an API), a programmatically set `value` is now preserved until the options arrive, then the matching option is selected automatically.

- **Value swap support**

    Programmatically swapping values between two comboboxes (e.g., origin/destination swap) now correctly updates both the internal state and the displayed input text.

- **Fullscreen bib stability** — [AB#1485868](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1485868)

    Fixed issues where the fullscreen bib could close prematurely when clearing input or could fail to reopen after being closed.

- **Emphasized layout in fullscreen**

    The `emphasized` layout color no longer incorrectly appears in the fullscreen dialog input.

- **Arrow keys no longer move the text cursor**

    When the dropdown is open and you press ArrowUp/Down to navigate through options, the text cursor in the input field no longer jumps to the beginning or end of the text.

- **Alt/Meta + ArrowUp/Down supported** — [AB#1528758](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1528758)

    When the dropdown is open, pressing Alt+ArrowDown or Cmd+ArrowDown jumps to the last rendered option, and Alt+ArrowUp or Cmd+ArrowUp jumps to the first rendered option. Disabled options are skipped.

- **Arrow keys no longer skip nested menus** — [AB#1523822](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1523822)

    Navigating options with ArrowUp/Down now correctly traverses items inside nested menus instead of skipping over them.

- **Active option updates after filtering** — [AB#1528032](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1528032)

    When available options change due to input filtering, the visually highlighted option is recalculated. If the previously highlighted option is no longer visible, the first available option is highlighted.

- **Trailing whitespace no longer breaks filtering** — [AB#1520589](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1520589)

    When editing input text using cursor keys and backspace, residual trailing whitespace no longer causes the filter to fail to match options.

- **Value updates on input** — [AB#1528032](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1528032)

    In default `suggestion` mode, the `value` property now updates in real time as the user types, regardless of whether the text matches an available option.

- **Reselecting a pre-selected option no longer deselects it**

    Clicking an already-selected option no longer toggles it off.

- **`noMatch` options are not marked active**

    When all regular options are filtered out, `noMatch` placeholder options are no longer visually highlighted as active.

### AURO-INPUT

- **Credit card autofill** — [AB#1481792](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1481792)

    Fixed a bug where auto-filling a credit card number could trigger a false validation error.

- **Clear button resets validity**

    Clicking the clear button now resets the input's validation state, preventing stale error messages from remaining visible after clearing the field.

### AURO-COUNTER

- **Screen reader accessibility** — [AB#1443553](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1443553)

    The `<auro-counter>` component now announces the correct numeric value to screen readers.

- **VoiceOver swipe gestures work in counter-group dropdown** — [AB#1516615](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1516615)

    On mobile devices using VoiceOver, swiping up and down now correctly increments and decrements counter values inside a counter-group dropdown.

- **Removed unsupported aria tag** — [AB#1516613](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1516613)

    Removed an unsupported ARIA attribute that could cause screen reader confusion.

- **Counter-group initializes with correct trigger value**

    The counter-group now calculates and displays the correct total in the trigger as soon as its counters are first rendered.

### AURO-DATEPICKER

- **Calendar month navigation** — [AB#1530050](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1530050)

    Fixed a bug where pressing the next/previous month button could skip a month.

- **`referenceDates` format consistency** — [AB#1485868](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1485868)

    The `referenceDates` property now uses the same date format as other date values for consistency. Backward compatibility with the previous format is maintained.

- **Calendar closes on focus loss** — [AB#1528738](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1528738)

    The datepicker calendar now properly closes when focus leaves the component.

- **Input clear button no longer reopens the calendar**

    Clicking or pressing Enter/Space on the input's clear button no longer triggers the calendar to reopen.

- **Out-of-range dates no longer appear interactive** — [AB#1494448](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1494448)

    When a user types a date outside the allowed min/max range, the corresponding calendar cell now correctly appears disabled with no hover styles.

### AURO-DROPDOWN

- **Disabled state announced to assistive technology**

    The dropdown trigger now correctly communicates `aria-disabled` when the `disabled` attribute is set.

- **Fullscreen mode works with late-loading stylesheets**

    The mobile breakpoint is now resolved lazily, fixing an issue where fullscreen mode failed to activate in WebKit when external stylesheets hadn't loaded yet.

### AURO-MENU

- **Disabled menu prevents selection**

    Clicking an option inside a disabled menu no longer selects it.

- **Consistent option height when selecting and deselecting**

    Selected menu options displaying a checkmark icon no longer cause a visible height shift. All options maintain a consistent height regardless of selection state.

### AURO-SELECT

- **Focus returns to trigger after click selection** — [AB#1528057](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1528057)

    After selecting an option by clicking it, focus now reliably returns to the dropdown trigger.

- **Enter no longer blocks form submission**

    When the dropdown is closed, pressing Enter is no longer consumed by the select, allowing native form submission to proceed.

- **Arrow keys no longer skip nested menus** — [AB#1523822](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1523822)

    Navigating options with ArrowUp/Down now correctly traverses items inside nested menus instead of skipping over them.

- **Option selection works on first Enter press**

    Selecting an option with the keyboard no longer requires pressing Enter twice.

- **Prevent deselect on single-select**

    Selecting an already-selected option in single-select mode no longer deselects it.

- **`value` property respected on hot reload** — [AB#1483855](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1483855)

    The select component now correctly responds to changes to the `value` property during a hot reload, ensuring the displayed selection stays in sync with the programmatic value.

### GENERAL

- **Clear button key events no longer propagate** — [AB#1510818](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1510818)

    Key events on input and datepicker clear buttons no longer bubble up to parent components, preventing unintended dropdown opening or option selection.

- **`id` attribute preserved in Svelte** — [AB#1551040](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1551040)

    The `id` attribute is now reflected inline so it is no longer removed during Svelte component updates.

- **Breakpoint values use design tokens**

    Mobile breakpoint values now use design tokens for consistency across components.

## Improvements

_Note: Improvements do not require migration steps. Updating to this version is all that is necessary to implement these changes._

### AURO-COMBOBOX/COUNTER/DATEPICKER/SELECT

- **Better focus management**

    When a popup panel closes, your focus is reliably returned to the right place on the page.

- **Keyboard navigation**

    Tabbing through auro-select, auro-combobox, and auro-datepicker now behaves more consistently and predictably across an entire form.

### AURO-SELECT

- **Smoother scrolling** [AB#1489578](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1489578)

    When opening the bib, the selected item is automatically scrolled into view so users don't have to hunt for it.

### AURO-COMBOBOX/COUNTER/DATEPICKER/SELECT

- **Fullscreen screen reader support**

    Dropdown-based components are now fully screen reader compatible in both desktop and mobile/fullscreen viewports.

### AURO-COMBOBOX/SELECT

- **Option list scrolls when it exceeds available space**

    Previously, when there were more options than could fit in the dropdown, the option list did not scroll and overflowing options were inaccessible. The option list now scrolls correctly.

## Documentation

- **Comprehensive component docs** — Documentation for all components has been rewritten or significantly expanded, including new or improved pages for [combobox](https://auro.alaskaair.com/components/auro/combobox/getting-started), [select](https://auro.alaskaair.com/components/auro/select/getting-started), [input](https://auro.alaskaair.com/components/auro/input/getting-started), [datepicker](https://auro.alaskaair.com/components/auro/datepicker/getting-started), [counter](https://auro.alaskaair.com/components/auro/counter/getting-started), [dropdown](https://auro.alaskaair.com/components/auro/dropdown/getting-started), [form](https://auro.alaskaair.com/components/auro/form/getting-started), [menu](https://auro.alaskaair.com/components/auro/menu/getting-started), [checkbox](https://auro.alaskaair.com/components/auro/checkbox/getting-started), and [radio](https://auro.alaskaair.com/components/auro/radio/getting-started).

- **Keyboard behavior documentation** — Added detailed keyboard interaction guides covering dropdown, combobox, counter, datepicker, and select components, aligned with the keyboard handling overhaul.

- **Accessibility documentation** — New accessibility pages added for select, including a VoiceOver demo page. HTML encoding issues in accessibility docs have been fixed.

- **Manual testing guides** — Added and updated manual testing documentation for multiple components, including a flight search planbook.

- **Customization content** — Customization documentation has been separated into its own dedicated page for easier discovery.

- **API page fixes** — Fixed broken API pages and added missing JSDoc comment blocks and event documentation (notably for auro-form and auro-menuoption).

- **Restructured page layout** — Doc pages have been restructured for better responsiveness and navigation, with the "layout" page renamed to "design" and README content updated across components.

## Testing

- **Cross-framework Playwright test suite** — A new shared test architecture runs the same 20 Playwright test suites against both React and Svelte framework apps, validating that all components behave identically regardless of the consuming framework.

- **Significant coverage expansion** — Over 26,000 net new lines of test code across 82 component-level test files, covering keyboard interactions, accessibility, screen reader announcements, slot rendering, public/private functions, and visual regression scenarios.

- **Accessibility testing** — Added Playwright-native accessibility tree assertions to validate screen reader behavior in both desktop and fullscreen (mobile) viewports.

- **Storybook interaction tests** — New Storybook tests added for multiple components, providing visual regression and interaction coverage that runs in CI.

- **Keyboard strategy unit tests** — Dedicated unit tests for the shared keyboard utility, verifying handler registration, context passing, and key dispatch behavior.

- **Flakiness improvements** — Multiple passes to eliminate flaky tests in CI, including increased timeouts, proper element-ready waits, and guards against race conditions in bib-ready state detection.

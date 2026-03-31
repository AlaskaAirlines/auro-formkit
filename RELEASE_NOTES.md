# Release Notes

## FormKit v5.11.0

_Release Notes — March 10, 2026_

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/releases/5_11_0.md) -->
<!-- The below content is automatically added from ./docs/releases/5_11_0.md -->

### Features

#### AURO-FORM

- **Smarter form submission** [AB#1485830](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1485830)

    Pressing the `Enter` key while focus is inside a form (e.g. focus in an auro-input) now submits the form.

    **Migration Guide:** _No changes required._

#### AURO-DATEPICKER

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

### Bug Fixes

_Note: Bug fixes do not require migration steps. Updating to this version is all that is necessary to implement these changes._

#### AURO-COMBOBOX/COUNTER/DATEPICKER/SELECT

- **Mobile VoiceOver Click through** — [AB#1385830](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1385830)

    Fixed an issue where a user could interact with page content behind a dropdown bib while using VoiceOver accessibility tools on a mobile device.

- **Mobile scroll lock** — [AB#1490375](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1490375) 

    Fixed a bug where the page would get stuck and unable to scroll after closing a dropdown on a mobile device, including when using the browser back button. 

#### AURO-COMBOBOX/SELECT

- **Menu selections with mobile device VoiceOver** — [AB#1467197](https://dev.azure.com/itsals/E_Retain_Content/_workitems/edit/1467197)

    Fixed an issue where mobile device VoiceOver users were unable to make menu selections.

#### AURO-INPUT

- **Credit card autofill** — Fixed a bug where auto-filling a credit card number could trigger a false validation error. [AB#1481792](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1481792)

#### AURO-COUNTER

- **Screen reader accessibility** — The `<auro-counter>` component now announces the correct numeric value to screen readers. [AB#1443553](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1443553)

<!-- - **Reset behavior** — Clearing a dropdown selection now fully resets the field as expected. -->

### Improvements

_Note: Improvements do not require migration steps. Updating to this version is all that is necessary to implement these changes._

#### AURO-COMBOBOX/COUNTER/DATEPICKER/SELECT

- **Better focus management**

    When a popup panel closes, your focus is reliably returned to the right place on the page.

#### AURO-COMBOBOX/COUNTER/DATEPICKER/SELECT

- **Keyboard navigation**

    Tabbing through auro-select, auro-combobox, and auro-datepicker now behaves more consistently and predictably across an entire form.

#### AURO-SELECT

- **Smoother scrolling** [AB#1489578](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/1489578)

    When opening the bib, the selected item is automatically scrolled into view so users don't have to hunt for it.
<!-- AURO-GENERATED-CONTENT:END -->
<!-- INSERT CHANGELOG BELOW - NO HEADING LEVEL REQUIRED AS IT'S ALREADY IN THE SOURCE CONTENT -->
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./CHANGELOG.md) -->
<!-- The below content is automatically added from ./CHANGELOG.md -->

# Changelog

You can view a complete history of changes to this repository on the GitHub releases page:

https://github.com/AlaskaAirlines/auro-formkit/releases
<!-- AURO-GENERATED-CONTENT:END -->

# Planbook Component — Manual Test Plan

Planbook is an **integration (composite) component** assembled from the underlying
auro-* form components (input, select, combobox, datepicker, counter, checkbox,
radio, dropdown, form). Each of those sub-components ships its own comprehensive
automated test suite, so isolated control mechanics — a counter incrementing, a
dropdown opening, a checkbox toggling, generic property reflection — are **already
covered by automation and are not re-tested here.** Manual testing focuses on what
only the composed component exercises: end-to-end search flows, cross-field business
rules, and the perceptual, device, and assistive-technology concerns that cannot be
asserted in a headless suite.

## Environment Setup

- **Browsers:** Chrome (latest), Safari (latest), Firefox (latest), Edge (latest)
- **Viewports:** Desktop (1280px+), Tablet (768px), Mobile (375px)
- **Themes:** Alaska (default), Hawaiian; Light & Dark modes

---

## Smoke Test

A fast, real-browser end-to-end sanity pass. Run this first on every build.

### Search Execution & Validation

| # | Test Case | Steps | Expected Result |
|---|-----------|-------|-----------------|
| S1 | Component renders with defaults | Load Planbook | Form renders with **1 adult** and **Round Trip** selected by default |
| S2 | Set origin | Type "SEA" in origin, select Seattle-Tacoma from the dropdown | Origin field populates with SEA |
| S3 | Set destination | Type "SFO" in destination, select San Francisco from the dropdown | Destination field populates with SFO |
| S4 | Pick dates | Select an outbound date and a return date | Both date fields populate as a valid range |
| S5 | Valid search | With all required fields filled, click **Search Flights** | Emits the `search` event / navigates to results |
| S6 | Required-field validation | Clear origin (or another required field), click **Search Flights** | Error header appears listing the missing-field error; no navigation occurs |

---

## Depth

Grouped by feature area and ordered to minimize tester context-switching: desktop
happy-path and cross-field logic first (mouse/keyboard), then visual theming and
responsive layout (eyes/resize), then touch, then assistive-tech last.

### Trip Type

| # | Test Case | Steps | Expected Result |
|---|-----------|-------|-----------------|
| T1 | Fields update per trip type | Switch between Round Trip, One Way, and Multi City | Visible fields recompose: One Way hides the return date; Multi City reveals segment rows |
| T2 | Validation reset on switch | Enter invalid data, trigger validation, then switch trip type | Previous validation errors clear |

### City Search (Origin & Destination)

Isolated combobox/dropdown filtering, selection, and keyboard navigation are covered
by the combobox and dropdown suites. These cases verify Planbook's airport dataset
and validation integration.

| # | Test Case | Steps | Expected Result |
|---|-----------|-------|-----------------|
| C1 | Match against airport dataset | Type "San Francisco" in destination | Results include SFO plus nearby airports from Planbook's dataset |
| C2 | Nested nearby/substations | Search for an airport that has substations | Nested menu exposes the nearby airport options |
| C3 | No matching airport | Type "XYZXYZ" in origin | Planbook shows the "No matching airport" empty-state message |
| C4 | Blur with invalid text | Type partial text that resolves to no airport, then tab away | Field shows the invalid-airport validation error |

### Swap Origin/Destination

| # | Test Case | Steps | Expected Result |
|---|-----------|-------|-----------------|
| SW1 | Basic swap | Set origin=SEA, destination=SFO, click swap | Origin becomes SFO, destination becomes SEA |
| SW2 | Swap preserves nearby state | Enable "Include nearby airports" on origin, then swap | The nearby-airport flag follows the airport to its new position |
| SW3 | Swap with an empty field | Leave destination empty, click swap | Origin value moves to destination; origin becomes empty |

### Nearby Airports

| # | Test Case | Steps | Expected Result |
|---|-----------|-------|-----------------|
| N1 | Flag flows into search criteria | Check "Include nearby airports" on origin and destination, run a search | Emitted search criteria include the nearby-origin and nearby-destination flags |
| N2 | Config-gated visibility | Set `showNearbyAirports=false` | Nearby-airport checkboxes do not render |

### Dates

Isolated datepicker mechanics (past-date blocking, single-field population) are
covered by the datepicker suite. These verify cross-field range and business-window logic.

| # | Test Case | Steps | Expected Result |
|---|-----------|-------|-----------------|
| D1 | Return constrained by outbound | Select an outbound date, then attempt a return date before it | Earlier returns are prevented / show a validation error; valid returns form a range |
| D2 | One Way single field | Switch to One Way, select a departure date | Only one date field is shown and populates |
| D3 | Booking-window max | Attempt to select a date beyond 331 days out | Date is not selectable (business max) |
| D4 | Flexible dates flag | Check "Show flexible dates", run a search | Toggle state is reflected in the emitted search criteria |

### Passengers

Counter increment/decrement and min/max button-disabling are covered by the counter
suite. These verify Planbook's cross-field caps and aggregated display.

| # | Test Case | Steps | Expected Result |
|---|-----------|-------|-----------------|
| P1 | Max 7 total passengers | Add passengers until total reaches 7 | All + buttons disable at 7 total |
| P2 | Infants capped at adults | Set 2 adults, try to add 3 infants | Infant counter stops at 2 (capped at adult count) |
| P3 | Aggregated display text | Set 2 adults, 3 children, 1 infant | Display reads "2 adults, 3 children, 1 infant" with correct pluralization |
| P4 | Passenger info drawer | Click the info icon next to Children/Infants | Drawer opens explaining the age ranges and passenger policies (Planbook composition — not covered by any sub-component suite) |

### Upgrade Tier

Opening the dropdown and selecting a tier are covered by the dropdown/select suites.

| # | Test Case | Steps | Expected Result |
|---|-----------|-------|-----------------|
| U1 | Guest Certificate disabled by Points | Enable "Use Miles", then open the upgrade dropdown | Guest Certificate option is disabled/greyed out |
| U2 | Upgrade info drawer | Click the upgrade info icon | Drawer opens explaining the upgrade tiers and eligibility (Planbook composition — not covered by any sub-component suite) |

### Discount Code

| # | Test Case | Steps | Expected Result |
|---|-----------|-------|-----------------|
| DC1 | Terms load from API | Open the discount info drawer | Drawer opens and discount terms populate from the API |
| DC2 | Invalid code on search | Enter an invalid code, click Search Flights | Invalid-discount-code error is displayed |
| DC3 | Disabled by AFB special fare | In AFB mode, select a special fare | Discount input becomes disabled |

### Points / Miles

| # | Test Case | Steps | Expected Result |
|---|-----------|-------|-----------------|
| PM1 | Disables guest upgrade | Enable points, open the upgrade dropdown | Guest Certificate is disabled |
| PM2 | Disables special fares (AFB) | In AFB mode, enable points | Special-fares dropdown and "Show only special fares" checkbox are disabled |
| PM3 | Resets selected special fare | Select a special fare, then enable points | Special fare resets to "Not Selected" |
| PM4 | Award airport filtering | Enable points, search an airport without award service | Award-only filtering shows the distinct error message |

### Multi City

| # | Test Case | Steps | Expected Result |
|---|-----------|-------|-----------------|
| MC1 | Add / max flights | Click "Add Flight" repeatedly | New segment rows appear up to 4; "Add Flight" disables at 4 |
| MC2 | Remove and re-index | Remove a middle segment | Row is removed; remaining rows re-index correctly |
| MC3 | Min-date cascade | Set a date on segment 1, then open segment 2's picker | Segment 2's min selectable date is >= segment 1's date; cascades across all segments |
| MC4 | Reset on trip-type change | Add 3 segments, switch to Round Trip, switch back to Multi City | Extra segments are removed; resets to a single city pair |

### Search Execution & Validation

| # | Test Case | Steps | Expected Result |
|---|-----------|-------|-----------------|
| SE1 | Duplicate origin/destination | Set both to SEA, click Search Flights | Error: origin and destination cannot be the same |
| SE2 | Aggregated error header | Leave both cities and dates empty, click Search Flights | Every relevant error is listed together in the error header |
| SE3 | Loading state | Click Search Flights with valid data | Button shows the loading spinner; `isLoading` is true during submission |
| SE4 | Criteria reflect form state | Set trip type, "Use Miles", "Flexible Dates", and nearby toggles, then submit | Emitted radio/checkbox criteria match the on-screen selections |
| SE5 | Reset to defaults | Change several radios/checkboxes, then reset/reload the form | All controls return to their default state |

### Edge Cases & Error Recovery

| # | Test Case | Steps | Expected Result |
|---|-----------|-------|-----------------|
| E1 | Clear all and search | Clear every field, click search | All required-field errors surface simultaneously in the header |
| E2 | Very long discount code | Enter a very long string in the discount field | Input handles it gracefully; no layout break |

### Theming

| # | Test Case | Steps | Expected Result |
|---|-----------|-------|-----------------|
| TH1 | Alaska theme (default) | Load with `brand=Alaska` | Alaska branding, colors, and typography applied |
| TH2 | Hawaiian theme | Load with `brand=Hawaiian` | Hawaiian branding, colors, and typography applied |
| TH3 | Light mode | Set `themeMode=Light` | Light color scheme applied cleanly across all controls |
| TH4 | Dark mode | Set `themeMode=Dark` | Dark color scheme applied cleanly across all controls |
| TH5 | System mode | Set `themeMode=System`, toggle OS dark mode | Theme follows OS preference live |

### Responsive Layout

| # | Test Case | Steps | Expected Result |
|---|-----------|-------|-----------------|
| R1 | Desktop (wide) | View at 1280px+ | Full layout; all options visible; no accordion collapse |
| R2 | Tablet | View at 768px | Fields adjust/stack; accordion may appear |
| R3 | Mobile | View at 375px | Fully stacked layout; "More Options" accordion present |
| R4 | More Options accordion | On a narrow viewport, expand "More Options" | Upgrade and Discount inputs are revealed only when expanded |
| R5 | Resize behavior | Resize desktop → mobile → desktop | Layout transitions smoothly with no broken/stuck state |

### Touch

| # | Test Case | Steps | Expected Result |
|---|-----------|-------|-----------------|
| TC1 | Tap targets | On a real touch device, tap each control | Swap, counters, toggles, and search are comfortably tappable (no mis-taps) |
| TC2 | Date picker on touch | Open and select dates by tapping | Calendar is usable; dates select without needing hover |
| TC3 | Dropdown scroll on touch | Open a long airport dropdown, scroll and tap a result | List scrolls smoothly; selection lands on the tapped option |

### Accessibility

| # | Test Case | Steps | Expected Result |
|---|-----------|-------|-----------------|
| A1 | Keyboard-only full form | Tab/Shift+Tab and operate every control end to end | All inputs, toggles, counters, and buttons are reachable and operable; focus order is logical |
| A2 | Screen reader labels | Traverse with VoiceOver/NVDA | Every control has a descriptive label; icon buttons expose `aria-label` |
| A3 | Error announcements | Trigger validation errors | Errors are announced via the `aria-live` region |
| A4 | Swap announcement | Activate the swap button with a screen reader on | The origin/destination swap is announced |

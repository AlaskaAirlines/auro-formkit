# Planbook Component — Manual Test Plan

## Environment Setup

- **Browsers:** Chrome (latest), Safari (latest), Firefox (latest), Edge (latest)
- **Viewports:** Desktop (1280px+), Tablet (768px), Mobile (375px)
- **Themes:** Alaska (default), Hawaiian; Light & Dark modes

---

## 1. Trip Type Selection

| # | Test Case | Steps | Expected Result |
|---|-----------|-------|-----------------|
| 1.1 | Validation reset on switch | Enter invalid data, trigger validation, then switch trip type | Previous validation errors clear |

---

## 2. City Search (Origin & Destination)

| # | Test Case | Steps | Expected Result |
|---|-----------|-------|-----------------|
| 2.1 | Search by airport code | Type "SEA" in origin field | Dropdown shows Seattle-Tacoma with code SEA; selecting it populates the field |
| 2.2 | Search by city name | Type "San Francisco" in destination | Dropdown shows SFO and nearby airports |
| 2.3 | Search by partial name | Type "Port" in origin | Dropdown shows Portland (PDX), Portland (PWM), and other matching airports |
| 2.4 | Select airport from dropdown | Click a dropdown result | Field populates with 3-letter IATA code, dropdown closes |
| 2.5 | No matching airport | Type "XYZXYZ" in origin | Dropdown shows "No matching airport" message |
| 2.6 | Clear and retype | Select an airport, clear the field, type new text | Previous selection removed; new dropdown appears |
| 2.7 | Nearby/substations | Search for an airport that has substations | Nested menu shows nearby airport options |
| 2.8 | Keyboard navigation | Use arrow keys and Enter to navigate/select in the dropdown | Focus moves through options; Enter selects highlighted option |
| 2.9 | Blur with invalid text | Type partial text and tab away | Field shows validation error for invalid airport |

---

## 3. Swap Origin/Destination

| # | Test Case | Steps | Expected Result |
|---|-----------|-------|-----------------|
| 3.1 | Basic swap | Set origin=SEA, destination=SFO, click swap button | Origin becomes SFO, destination becomes SEA |
| 3.2 | Swap preserves nearby | Enable "Include nearby airports" on origin, then swap | Nearby airport state follows the airport to its new position |
| 3.3 | Swap with empty fields | Leave destination empty, click swap | Origin moves to destination; origin becomes empty |
| 3.4 | Screen reader announcement | Activate swap button | SR announces origin/destination swap |

---

## 4. Nearby Airports

| # | Test Case | Steps | Expected Result |
|---|-----------|-------|-----------------|
| 4.1 | Toggle nearby origin | Check "Include nearby airports" under origin | Checkbox is checked; search criteria includes nearby airports flag |
| 4.2 | Toggle nearby destination | Check "Include nearby airports" under destination | Checkbox is checked; search criteria includes nearby destination flag |
| 4.3 | Hidden when disabled | Set `showNearbyAirports=false` prop | Nearby airport checkboxes do not appear |

---

## 5. Date Selection

| # | Test Case | Steps | Expected Result |
|---|-----------|-------|-----------------|
| 5.1 | Select outbound date (RT) | In Round Trip, click date picker and select a future date | Outbound date populates correctly |
| 5.2 | Select return date (RT) | After outbound, select a return date >= outbound | Return date populates; forms a valid range |
| 5.3 | Return before outbound | Try selecting a return date before outbound date | Prevented or shows validation error |
| 5.4 | One Way date | Switch to One Way; select a departure date | Only one date field shown; populates correctly |
| 5.5 | Multi City dates | In Multi City, select dates for each segment | Each segment has its own date; min date for segment N+1 >= segment N's date |
| 5.6 | Past date validation | Attempt to select a date in the past | Date is not selectable or shows error |
| 5.7 | Max date boundary | Attempt to select a date beyond 331 days out | Date is not selectable |
| 5.8 | Flexible dates toggle | Check "Show flexible dates" | Toggle state reflected in search criteria |

---

## 6. Passenger Selection

| # | Test Case | Steps | Expected Result |
|---|-----------|-------|-----------------|
| 6.1 | Default passengers | Load component | Shows "1 adult" by default |
| 6.2 | Increment adults | Click + on adults counter | Adults count increases (up to 7 total) |
| 6.3 | Add children | Click + on children counter | Children count increases; display updates (e.g., "1 adult, 1 child") |
| 6.4 | Add infants | Click + on infants counter | Infants count increases; limited to number of adults |
| 6.5 | Max 7 passengers | Add passengers until total is 7 | All + buttons disabled when total reaches 7 |
| 6.6 | Infant limit | Set 2 adults, try to add 3 infants | Infant counter stops at 2 (capped at adult count) |
| 6.7 | Decrement to minimum | Try to reduce adults below 1 | Adults counter does not go below 1 |
| 6.8 | Passenger info drawers | Click info icon next to "Children" or "Infants" | Drawer opens explaining age ranges and policies |
| 6.9 | Display text formatting | Set 2 adults, 3 children, 1 infant | Display shows "2 adults, 3 children, 1 infant" with correct pluralization |

---

## 7. Upgrade Tier Selection

| # | Test Case | Steps | Expected Result |
|---|-----------|-------|-----------------|
| 7.1 | Default upgrade | Load component | Upgrade is set to "None" |
| 7.2 | Select a tier | Open upgrade dropdown, select "Tier 1" | Upgrade updates to Tier 1 |
| 7.3 | Guest certificate | Select "Guest Certificate" from dropdown | Upgrade updates to Guest |
| 7.4 | Guest disabled with Points | Enable "Use Miles" toggle, then open upgrade dropdown | Guest Certificate option is disabled/greyed out |
| 7.5 | Info drawer | Click the upgrade info link/icon | Upgrade info drawer opens with tier definitions |
| 7.6 | Accordion visibility | On narrow viewport, collapse accordion; upgrade should be inside | Upgrade input hidden until "More Options" expanded |

---

## 8. Discount Code

| # | Test Case | Steps | Expected Result |
|---|-----------|-------|-----------------|
| 8.1 | Enter discount code | Type "ABC123" in discount field | Code is accepted; field shows entered text |
| 8.2 | Info drawer | Click discount info icon | Discount terms drawer opens; terms load from API |
| 8.3 | Invalid code on search | Enter invalid code, click "Search Flights" | Appropriate error message displayed (e.g., "Invalid discount code") |
| 8.4 | Discount disabled with special fare (AFB) | In AFB mode, select a special fare | Discount input becomes disabled |
| 8.5 | Accordion visibility | On narrow viewport, collapse accordion | Discount input hidden until "More Options" expanded |


---

## 9. Points / Miles Toggle

| # | Test Case | Steps | Expected Result |
|---|-----------|-------|-----------------|
| 9.1 | Toggle points on | Check "Use Miles" checkbox | Points mode enabled |
| 9.2 | Points disables guest upgrade | Enable points, open upgrade dropdown | Guest Certificate is disabled |
| 9.3 | Points disables special fares (AFB) | In AFB mode, enable points | Special fares dropdown and "Show only special fares" checkbox disabled |
| 9.4 | Points resets special fares | Select a special fare, then enable points | Special fare resets to "Not Selected" |
| 9.5 | Award airport filtering | Enable points, search for an airport without award service | Different error message shown (award-only filtering) |

---

## 10. Multi City Specific

| # | Test Case | Steps | Expected Result |
|---|-----------|-------|-----------------|
| 10.1 | Add flights | Click "Add Flight" | New city pair row appears (up to 4 max) |
| 10.2 | Maximum flights | Add flights until 4 total | "Add Flight" button is disabled |
| 10.3 | Remove a flight | Click remove/delete on a city pair | City pair row removed; remaining rows re-index |
| 10.4 | Min date cascading | Set date for flight 1, then select date for flight 2 | Flight 2 min date is >= flight 1 date |
| 10.5 | Switch away from Multi City | Add 3 flights in Multi City, switch to Round Trip, then back to Multi City | Extra flights removed; reset to single city pair |

---

## 11. Search Execution & Validation

| # | Test Case | Steps | Expected Result |
|---|-----------|-------|------------------|
| 11.1 | Valid search | Fill all required fields correctly, click "Search Flights" | Redirects to search results page (or emits `search` event) |
| 11.2 | Missing origin | Leave origin empty, click search | Error: origin required; error header visible |
| 11.3 | Missing destination | Leave destination empty, click search | Error: destination required |
| 11.4 | Missing dates | Clear dates, click search | Error: dates required |
| 11.5 | Duplicate origin/destination | Set both to SEA, click search | Error: origin and destination cannot be the same |
| 11.6 | Multiple errors | Leave both cities and dates empty, click search | All relevant errors shown in error header |
| 11.7 | Loading state | Click search with valid data | Button shows loading spinner; `isLoading` is true |

---

## 12. Theming

| # | Test Case | Steps | Expected Result |
|---|-----------|-------|------------------|
| 12.1 | Alaska theme (default) | Load with `brand=Alaska` | Alaska branding, colors, and typography applied |
| 12.2 | Hawaiian theme | Load with `brand=Hawaiian` | Hawaiian branding, colors, and typography applied |
| 12.3 | Dark mode | Set `themeMode=Dark` | Dark color scheme applied |
| 12.4 | Light mode | Set `themeMode=Light` | Light color scheme applied |
| 12.5 | System mode | Set `themeMode=System` | Follows OS preference (toggle OS dark mode to verify) |

---

## 13. Responsive Layout

| # | Test Case | Steps | Expected Result |
|---|-----------|-------|------------------|
| 13.1 | Desktop (wide) | View at 1280px+ width | Full layout; all options visible; no accordion collapse |
| 13.2 | Tablet | View at 768px width | Responsive adjustments; fields may stack; accordion may appear |
| 13.3 | Mobile | View at 375px width | Fully stacked layout; "More Options" accordion visible; upgrade/discount collapsed |
| 13.4 | Accordion collapse | On narrow viewport, verify "More Options" trigger | Clicking "More Options" expands to reveal Upgrade and Discount inputs |
| 13.5 | Resize behavior | Start at desktop, resize to mobile and back | Layout transitions smoothly without broken state |

---

## 14. Accessibility

| # | Test Case | Steps | Expected Result |
|---|-----------|-------|------------------|
| 14.1 | Keyboard-only navigation | Tab through all interactive elements | All inputs, buttons, and controls are reachable and operable via keyboard |
| 14.2 | Screen reader labels | Navigate with VoiceOver/NVDA | All form controls have descriptive labels; icons have `aria-label` |
| 14.3 | Error announcements | Trigger validation errors | Errors announced via `aria-live` region |
| 14.4 | Dynamic content announcements | Swap origin/destination | Screen reader announces the swap action |

---

## 15. Search Criteria Filters (Radio Buttons & Checkboxes)

| # | Test Case | Steps | Expected Result |
|---|-----------|-------|------------------|
| 15.1 | Preset filters — radio buttons | Submit a flight search | All radio buttons reflect the preset values (e.g., trip type matches the provided value) |
| 15.2 | Preset filters — checkboxes | Submit a flight search | All checkboxes reflect the preset values (e.g., "Use Miles", "Flexible Dates", "Include nearby airports" match provided state) |
| 15.3 | Reset filters | Change radio buttons and checkboxes to non-default values, then reset/reload the form | All radio buttons and checkboxes return to their default state |

## 16. Edge Cases & Error Recovery

| # | Test Case | Steps | Expected Result |
|---|-----------|-------|------------------|
| 16.1 | Clear all and search | Clear all fields and click search | All required field errors shown simultaneously |
| 16.2 | Very long discount code | Enter a very long string in discount field | Input handles gracefully; no layout break |

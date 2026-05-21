# Post-mortem: `auro-datepicker` localization, ISO contract, and Cally integration

**Branch:** `cfriedberg/datepicker`
**Period:** Cally swap → TRD #1300 completion (2026-05)
**Scope:** `components/datepicker`, `components/input` (shared mask + locale wiring)

## Summary

Two adjacent workstreams landed on this branch:

1. **Cally integration** — replaced the legacy in-house calendar grid with the [Cally](https://wicky.nillia.ms/cally/) web component (`<calendar-date>` / `<calendar-range>` / `<calendar-month>`). This was the prerequisite that made native locale support tractable.
2. **TRD #1300 — date localization & ISO 8601 contract** — added locale-aware display, `data-locale` ancestor inheritance, a strict ISO `YYYY-MM-DD` property/event contract, local-time `Date` getters, and removed the hardcoded English `monthNames` table.

Net diff: **+1,573 / −149** across 17 files.

## User stories (TRD #1300)

| # | Story | Where it lives now |
|---|---|---|
| 1 | **International date input** — A non-US guest can type a date in their locale's pattern (DD/MM/YYYY, YYYY/MM/DD, DD.MM.YYYY, …) and have the field accept it. | `components/input/src/localeMask.js` `buildLocaleDateMask(locale)` drives the IMask `format`/`parse` callbacks. `auro-input.locale` is forwarded by `auro-datepicker` to both trigger and bib inputs. |
| 2 | **Locale detection** — A developer doesn't have to wire locale on every datepicker; setting `data-locale` on any ancestor (including across shadow DOM) cascades. | `auro-datepicker._resolveLocale()` delegates to `DomHandler.getLocale(this)` (own `locale` attr → nearest ancestor `data-locale` → `en-US`). A `MutationObserver` on `document.documentElement` re-resolves when ancestor `data-locale` flips at runtime. |
| 3 | **Localized month names** — Calendar headers and the `monthNames` property reflect the resolved locale, with explicit override still supported. | `auro-datepicker.monthNames` is now an auto-derived getter (per-locale `Intl.DateTimeFormat({month:'long'})` cache); setter accepts a 12-element override. Cally renders its own header from its `locale` attribute. |
| 4 | **Date range formatting** — Range display in the collapsed input uses locale-appropriate separators (e.g. `～` in `ja-JP`). | `auro-datepicker._formatRange(startIso, endIso)` uses `Intl.DateTimeFormat(locale, {dateStyle:'long'}).formatRange(...)` with a string fallback for browsers missing `formatRange`. |

## TRD #1300 acceptance criteria → resolution

| TRD requirement | Resolution |
|---|---|
| Manual date entry works across major + mobile browsers using the target locale's format. | IMask `MaskedDate` with dynamic `pattern` / `blocks` / `format` / `parse` from `buildLocaleDateMask`. Sentinel-date approach (`Intl.DateTimeFormat(locale).formatToParts(new Date(Date.UTC(2000, 1, 3)))`) derives the pattern without hardcoded tables. |
| Screen reader accessibility in multiple languages. | Calendar prev/next aria-labels routed through `i18nStrings.js#translate(locale, key)` with base-language fallback (`fr-CA → fr → en`). Cally itself ships localized internal labels keyed off its `locale` attribute. |
| Date ranges render correctly for all supported locales. | `_formatRange` (above) for the collapsed display; `<calendar-range locale="…">` for the in-popover grid. |
| Locale inference works with or without explicit component configuration. | `DomHandler.getLocale` chain: own `locale` attr → ancestor `data-locale` (shadow-DOM-aware walk) → `en-US`. `navigator.language` / `html[lang]` / `Intl.DateTimeFormat` resolved-options probing were **not** added — see "Scope decisions" below. |
| Programmatic date constraints remain functional. | `value` / `valueEnd` / `minDate` / `maxDate` / `calendarFocusDate` retained, but switched to a strict ISO `YYYY-MM-DD` contract (with setter guards + `console.warn` on non-ISO assignment). Read-only `*Object` getters return local-time `Date` instances via `new Date(y, m-1, d)`. |
| Month names generate from detected/provided locale while allowing overrides. | `monthNames` is now computed (cached per locale); explicit 12-element override still wins. |
| Locale obtainable through existing mechanisms. | `DomHandler.getLocale` from `@aurodesignsystem/auro-library`. No new resolver utility was introduced — the existing shared one was reused on both `auro-input` and `auro-datepicker`. |

## Cally integration (prerequisite work)

The branch started with a swap of the legacy calendar grid for Cally. This wasn't strictly part of TRD #1300, but it shaped every downstream decision in the localization work:

- **Removed:** `calendarStartDate` / `calendarEndDate` properties. Cally positions the visible month from the actual `value` (and `valueEnd` in range mode), not from a separate "calendar position" prop.
- **Bridge layer:** `components/datepicker/src/calendarBridge.js` mediates between Cally's ISO-native event model and the datepicker's reactive state. `toIsoLocal(date)` (line 109) and `isoMs(iso)` (line 124) became the canonical local-time ISO ↔ Date helpers — every later piece of localization work reuses them instead of re-implementing.
- **Native locale attr:** Cally accepts `locale="…"` and renders weekday labels, month headers, and aria-labels via `Intl.DateTimeFormat` internally. This is why our `monthNames` override is effectively cosmetic — Cally doesn't read it.
- **`first-day-of-week`:** derived from `Intl.Locale(locale).getWeekInfo?.().firstDay` with a Firefox fallback table; passed as a Cally attribute. (Firefox lacks `getWeekInfo` in some versions.)
- **Event surface:** Cally dispatches a standard `change` event with ISO `value`. We map it through `handleCalendarChange` (auro-datepicker.js:484–520) into the datepicker's existing reactive setters.

Risk that the swap exposed and the localization PR closed:

- The legacy calendar's hardcoded English `monthNames` was a leak: changing locale at runtime never updated the displayed month names. With Cally handling render, `monthNames` only matters for consumer-facing reads; we made it locale-derived anyway for parity.
- Cally's `change` event carries ISO. That made the case for an ISO property contract self-evident — we were already converting once on the way in.

## Key implementation details

### ISO 8601 property contract

Five properties were converted to enforce ISO `YYYY-MM-DD` only:

- `value`, `valueEnd`, `minDate`, `maxDate`, `calendarFocusDate`

Implementation: Lit's `noAccessor: true` plus manual getter/setter pairs that route through a shared `_setIsoProp(storage, propName, incoming)` helper. Non-ISO assignment is rejected with `console.warn(`auro-datepicker: "${v}" is not ISO 8601 (YYYY-MM-DD); ignoring`)`. `undefined` / `null` / `''` clears the stored value.

Five read-only `*Object` getters (`valueObject`, `valueEndObject`, `minDateObject`, `maxDateObject`, `calendarFocusDateObject`) parse via `new Date(y, m-1, d)` rather than `new Date(iso)`. This is the off-by-one guard for negative UTC offsets: `new Date('2025-06-15')` interprets the string as UTC midnight, which falls on June 14 in `Pacific/Honolulu`. The local-time constructor sidesteps the issue.

### Event contract

`auroDatePicker-valueSet` was the legacy non-standard event. The branch still fires it for one release window, but it now also fires a standard `input` event:

```js
this.dispatchEvent(new CustomEvent('input', {
  composed: true,
  bubbles: true,
  detail: { value: this._value, valueEnd: this._valueEnd }
}));
```

Both `detail.value` and `detail.valueEnd` are ISO strings or `undefined`. A static `_deprecationWarned` boolean emits a one-time `console.warn` on the first `auroDatePicker-valueSet` dispatch per page session (early implementation used a per-instance `WeakSet`, which warned on every fixture in the test suite — wrong granularity).

### `format` / `locale` precedence

Tracked via a private `_prevLocaleDefaultFormat`. When `_resolvedLocale` changes:

- If `this.format` is unset **or** equals `_prevLocaleDefaultFormat` → flip to the new locale's default pattern.
- Else → leave `this.format` alone (consumer explicitly set it).

Mirrored shape lives on `auro-input` (`components/input/src/base-input.js`) so a bare `<auro-input type="date">` reacts to ancestor `data-locale` the same way without needing a datepicker wrapper.

### Mask sanitization (ar-SA fix)

`Intl.DateTimeFormat('ar-SA', { calendar: 'gregory', numberingSystem: 'latn' }).formatToParts` injects U+200F (RTL mark) between tokens. Left in the pattern, those invisible characters cause the parse regex to never match user input (the user types `20/05/2026` with no RTL marks; the regex expects `\u200F/` between tokens).

`partsToPattern` in `localeMask.js` now runs literal values through `stripBidiMarks(value)`, which removes U+200E, U+200F, U+202A–202E, and U+2066–2069. The pattern stays purely visible characters.

## Scope decisions (locked, with reasoning)

- **No `navigator.language` / `html[lang]` / `Intl.DateTimeFormat` resolved-options fallback.** The TRD lists this as a 5-step priority chain, but the existing `DomHandler.getLocale` chain is what every other Auro form component uses. Adding two more probing steps just here would diverge `auro-datepicker` from the rest of the system. Closes the gap with a single mechanism instead of stacking three.
- **`format` kept, not deprecated.** Consumers with explicit `format` overrides keep working. Precedence rules (above) handle the locale interaction.
- **Tier-1 locales:** `en-US`, `en-GB`, `de-DE`, `fr-FR`, `ja-JP`, `ar-SA`. Tier-1 means visual QA + i18n string coverage + Storybook example. Other BCP47 tags still work — they just inherit English UI strings via the `t()` base-language fallback.
- **Gregorian calendar only in v1.** The mask builder strips `-u-ca-*` extensions before building. Non-Gregorian calendars (`ja-JP-u-ca-japanese`, `th-TH-u-ca-buddhist`) are out of scope; users get a Gregorian-shaped pattern.

## What broke and how it was caught

1. **`auroDatePicker-valueSet` deprecation warning spam.** Initial implementation used a per-instance `WeakSet` to dedupe warnings. The plan said "once per page session" — the test suite ran 76 fixtures and would have logged 76 warnings. Caught during test review. Switched to a `static _deprecationWarned = false` flag.

2. **`elementUpdated` timeout in the "ancestor data-locale" test.** The test wrapped `<auro-datepicker>` in a `<div data-locale="ja-JP">` via `fixture()`. `await fixture()` internally calls `elementUpdated` on the wrapper, which (for non-Lit elements) waits for `nextFrame`. The cascading reactive chain — `_resolveLocale` → `_applyLocaleFormatPrecedence` → `this.format = 'yyyy/mm/dd'` → triggers another update — kept Lit emitting "scheduled an update after update completed" warnings and the test mocha timeout hit before settling. Resolution: switched the test to plain `document.createElement` + `appendChild`; `_resolveLocale` runs synchronously in `connectedCallback`, so the assertion doesn't need an async settle. Other six locale tests use `await fixture(html\`<auro-datepicker locale="…">\`)` and pass — they don't have the wrapper-vs-inner-element split that confused `elementUpdated`.

3. **ar-SA "Invalid Date Entered" with valid input.** Discovered visually in Storybook: the field rendered `2026/05/20` (RTL-reordered display via bidi marks) and refused all user input as invalid. Root cause was the RTL marks baked into the pattern (above). Fixed by stripping bidi formatting chars in `partsToPattern`.

4. **Lit `noAccessor: true` ergonomics.** Default Lit property declaration auto-generates getter/setter. We needed custom setter guards on five ISO properties; that requires `noAccessor: true` plus manual getter/setter blocks. eslint flagged `lines-between-class-members` between paired `get` / `set` blocks — resolved by adding blank lines. JSDoc inline `@returns` flagged `require-returns` + period rules — resolved by switching to multi-line JSDoc.

## Files touched

| Area | File | Change |
|---|---|---|
| Datepicker core | `src/auro-datepicker.js` | +412 lines: `locale` prop, ISO setter guards, `*Object` getters, locale plumbing to Cally + auro-input, `_formatRange`, `monthNames` auto-derive, deprecated `auroDatePicker-valueSet`, standard `input` event |
| Calendar bridge | `src/calendarBridge.js` | +84 lines: `setLocale`, `resolvedLocale`, `firstDayOfWeekForLocale` |
| Datepicker utils | `src/utilities.js` | Parsing rewritten to consume `tokenOrder` / `separator` from `buildLocaleDateMask` |
| Datepicker i18n | `src/i18nStrings.js` | **New** — string table + `translate(locale, key, vars)` with base-language fallback |
| Datepicker docs | `docs/api.md` | Locale prop, ISO contract, `*Object` getters, deprecations |
| Datepicker docs | `docs/migration-locale-iso.md` | **New** — consumer migration guide |
| Datepicker examples | `apiExamples/localization.html` | 6 Tier-1 locales |
| Datepicker examples | `apiExamples/iso-properties.html` | **New** — value + valueObject demo |
| Datepicker examples | `apiExamples/data-locale-ancestor.html` | **New** — ancestor inheritance demo |
| Datepicker tests | `test/auro-datepicker.test.js` | +165 lines: locale resolution, format/locale precedence, ISO guards, `*Object` getters, `input` event, `monthNames` auto-derive, first-day-of-week |
| Input | `src/auro-input.js` (via base) | `locale` prop, format/locale precedence logic |
| Input base | `src/base-input.js` | Drop `dateFormatMap`; parameterized `invalidFormat`; remount mask on locale change |
| Input utils | `src/utilities.js` | Wire `buildLocaleDateMask` into mask config; rename `_isFullDatePattern` → `isFullDatePattern` |
| Input mask | `src/localeMask.js` | **New** — `buildLocaleDateMask` / `buildPatternMask` / `isoToLocaleDisplay` / `localeDisplayToIso`; bidi mark stripping |
| Input i18n | `src/i18n.js` | Collapse `dateMMDDYYYY` / `dateDDMMYYYY` into parameterized `invalidFormat`; add `fr` / `ja` / `de` / `ar` |

## Test posture

- **76 passed, 0 failed** in the datepicker suite at branch tip.
- **Coverage:** 82.92% on `components/datepicker`.
- New describe blocks: `locale resolution and plumbing`, `format/locale precedence`, `ISO setter guards`, `local-time Date getters`, `standard input event`, `monthNames auto-derivation`, `first-day-of-week derivation`.
- Pre-existing tests that asserted display-format `value` (MM/DD/YYYY strings) were rewritten to assert ISO. None were deleted — every legacy assertion has a converted equivalent.

## Follow-up workstream (deliberately deferred)

The plan's "Follow-up Optimizations" section (F1–F17) was scoped out of this PR per user direction. Highest-leverage items flagged for separate PRs:

- **F10 + F11** — Cally contract pin test + Renovate gate. Prevents a silent Cally minor bump from re-introducing English headers in non-English locales.
- **F1** — Demote `monthNames` to a lazy passthrough. Cally renders its own header from `locale`; our auto-derived array is computed for nobody.
- **F4** — Extract `parseIsoLocal(iso)` into a shared util; the five `*Object` getters are over-budget for what they do.
- **F8** — Audit Cally's localized aria-labels; trim `i18nStrings.js` to only strings the Auro shell renders.

## Ticket-by-ticket verification (datepicker locale 1–4)

Each acceptance criterion below was verified against branch tip (`cfriedberg/datepicker`) on 2026-05-21.

### Ticket 1 — ISO 8601 property contract

**Scope reconciliation:** the ticket lists 7 date properties. Two of them — `calendarStartDate` and `calendarEndDate` — were **removed entirely in the prior Cally swap** (before this branch), not converted. Cally positions the visible month from the actual `value` (and `valueEnd` in range mode), so the two "calendar position" props had no downstream consumer left. They are documented as removed (not migrated) in `migration-locale-iso.md`. Five surviving date props were converted to ISO.

| Criterion | Status | Evidence |
|---|---|---|
| `value="2025-12-25"` stores correctly and round-trips as ISO | ✅ | `_setIsoProp` helper (auro-datepicker.js); test `value contract (ISO YYYY-MM-DD)` describe block |
| `valueObject` returns `new Date(2025, 11, 25)` (local midnight) | ✅ | `_isoToLocalDate(iso)` uses `new Date(y, m-1, d)`; getter at line 458; test "local-time Date getters" |
| `input` event fires with ISO `event.detail` on date selection | ✅ | `notifyValueChanged()` (line 662) dispatches `CustomEvent('input', {detail:{value, valueEnd}})`; test "standard input event" |
| `auroDatePicker-valueSet` still fires but is marked deprecated | ✅ | Lines 655–660; static `_deprecationWarned` emits one-time console.warn; `@deprecated` in JSDoc + migration guide |
| `minDate`/`maxDate` constrain calendar selection | ✅ | Forwarded to Cally's native `min`/`max` attributes; pre-existing min/max tests pass |
| `calendarStartDateObject` / `calendarEndDateObject` getters | ⚠️ N/A by removal | Source props were removed in the Cally swap — see scope reconciliation |
| `calendarFocusDateObject` getter returns local-time Date | ✅ | Line 490; covered by "all object getters" test |

### Ticket 2 — `locale` property + child input forwarding

| Criterion | Status | Evidence |
|---|---|---|
| `locale: { type: String, reflect: true }` | ✅ | auro-datepicker.js properties block |
| Resolution chain: own `locale` → ancestor `data-locale` → `en-US` | ✅ | `_resolveLocale()` → `DomHandler.getLocale(this)`; default in constructor |
| Resolution crosses shadow DOM boundaries | ✅ | `DomHandler.closestWithAttribute` walks `getRootNode().host` chains (domHandler.mjs:29–40) |
| `format` / `locale` precedence in `updated()` | ✅ | `_applyLocaleFormatPrecedence()` (line 1039); test "format/locale precedence" |
| `.locale` forwarded to both trigger and bib `<auro-input>` | ✅ | `renderDateInputs()` (line 1260); test "forwards locale to both inputs in range mode" |
| `auro-input` locale considers shadow DOM levels | ✅ | `base-input.js` uses same `DomHandler.getLocale` chain |

### Ticket 3 — Localize calendar UI (month/day names)

**Scope reconciliation:** the ticket references `range-datepicker-calendar`, `day`, and `range-datepicker-cell` — these were the legacy in-house calendar internals **removed during the Cally swap**. Cally (`<calendar-date>` / `<calendar-range>` / `<calendar-month>`) replaces them and natively renders month + weekday labels via `Intl.DateTimeFormat` from its `locale` attribute. The localization requirement is satisfied by forwarding `locale` to Cally rather than by patching now-deleted vendor code.

| Criterion | Status | Evidence |
|---|---|---|
| `<auro-datepicker locale="fr-FR">` shows French month and day names | ✅ | Cally tags receive `locale="${this._resolvedLocale}"` (lines 1503, 1516, 1521); Cally renders via Intl |
| `monthNames` auto-populates from locale | ✅ | Auto-derived getter at line 499 with per-locale `Intl.DateTimeFormat` cache; test "monthNames auto-derivation" |
| Explicit `monthNames` array still overrides | ✅ | Setter at line 513 stores override; getter returns it preferentially; test "monthNames override" |
| No `date-fns` locale bundle import required | ✅ | `package.json` has no `date-fns` dependency; localization is pure `Intl` + Cally |
| Curated static locale set (no dynamic imports) | ✅ | `i18nStrings.js` is a static module; `Intl` ships with the runtime |

### Ticket 4 — Tests + API documentation

| Criterion | Status | Evidence |
|---|---|---|
| ISO contract tests (set ISO → read ISO, all surviving date props) | ✅ | `value contract (ISO YYYY-MM-DD)` describe block; `ISO setter guards` describe block |
| `*Object` correctness + local-time parsing | ✅ | `local-time Date getters` describe block; explicit test for `2025-01-01` local-midnight |
| `input` event emits ISO | ✅ | `standard input event` describe block |
| Locale propagation tests | ✅ | `locale resolution and plumbing` — 6 tests covering default, attr, ancestor, Cally forwarding, single + range input forwarding |
| `format` preservation across locale changes | ✅ | `format/locale precedence` — 2 tests |
| `data-locale` ancestor inheritance | ✅ | "inherits data-locale from an ancestor" test |
| `monthNames` auto-population + override | ✅ | `monthNames auto-derivation` — 2 tests |
| Week start day derivation via `Intl` | ✅ | `first-day-of-week derivation` test asserts numeric attribute on Cally |
| `api.md` reflects final public API | ✅ | `components/datepicker/docs/api.md` updated |
| Migration guide complete | ✅ | `migration-locale-iso.md` covers ISO property change (incl. `calendarStartDate`/`calendarEndDate` removal), `*Object` getters, `locale` + `data-locale`, `format` precedence, `monthNames` auto-derive, `auroDatePicker-valueSet` → `input` migration, SSR caveat |
| All new tests pass + existing tests still pass | ✅ | **76 passing / 0 failing**, 82.92% coverage |

## Risk register (carry-forward)

- **SSR:** `DomHandler.getLocale` is DOM-only. During SSR the component resolves to `en-US`; on first client paint it re-resolves and may flip the display format if `format` wasn't explicitly set. Documented in `migration-locale-iso.md`; no code workaround in scope.
- **Cally `Intl.DateTimeFormat` cache invalidation on locale flip.** Cally caches per-instance `DateTimeFormat`; mid-mount locale changes should invalidate it. A Lit `key=${_resolvedLocale}` remount is held in reserve if a regression is found — not currently needed.
- **RTL keyboard semantics.** In RTL, Left arrow = next day. Cally handles this internally; `datepickerKeyboardStrategy.js` is direction-neutral. Verify if the Cally team ever changes default RTL arrow behavior.
- **CLDR drift.** Each Renovate bump of Cally / Node / ICU could shift a locale's separator (e.g. `ja-JP` `/` → `年`). Per-locale string assertions in our test suite are deliberately minimal so this doesn't cause brittle red runs — but it means a CLDR shift could ship undetected. The proposed F10 Cally contract test closes this gap.

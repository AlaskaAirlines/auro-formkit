# Migration guide: locale-aware dates & ISO 8601 contract

This release of `auro-datepicker` introduces locale-aware date display, a new
`locale` attribute (with ancestor `data-locale` inheritance), and a strict
ISO 8601 `YYYY-MM-DD` contract on all date properties. It also deprecates the
non-standard `auroDatePicker-valueSet` event in favor of the standard `input`
event.

## Property format: ISO 8601 only

`value`, `valueEnd`, `minDate`, `maxDate`, and `calendarFocusDate` now accept
and emit ISO `YYYY-MM-DD` strings only. Non-ISO assignments are ignored and
log a `console.warn`.

```js
// Before
picker.value = '06/15/2025';

// After
picker.value = '2025-06-15';
```

`calendarStartDate` and `calendarEndDate` were removed in the earlier Cally
upgrade. Set `value` (and `valueEnd` for range mode) directly to position the
calendar.

## Local-time `Date` getters

Read-only getters return a local-time `Date` parsed via `new Date(y, m-1, d)`,
which is off-by-one safe in negative UTC offsets (`new Date(iso)` interprets
ISO date-only strings as UTC):

```js
picker.value = '2025-06-15';
picker.valueObject;            // Date 2025-06-15 00:00:00 local
picker.valueEndObject;
picker.minDateObject;
picker.maxDateObject;
picker.calendarFocusDateObject;
```

## `locale` attribute and `data-locale` inheritance

Set `locale` on the component, or `data-locale` on any ancestor (including
ancestors across shadow DOM boundaries). Resolution order:

1. The component's own `locale` attribute.
2. The closest ancestor `data-locale` attribute (walks `getRootNode().host`).
3. Default `en-US`.

```html
<auro-datepicker locale="de-DE"></auro-datepicker>

<div data-locale="ja-JP">
  <auro-datepicker></auro-datepicker>
</div>
```

Changing `data-locale` on an ancestor live re-resolves the locale and updates
display formatting; the stored ISO `value` is unchanged.

## `format` / `locale` precedence

- If `format` is unset, it defaults to the resolved locale's pattern
  (`dd.mm.yyyy` for `de-DE`, `yyyy/mm/dd` for `ja-JP`, etc.).
- If `format` was set automatically by a previous locale and the locale
  changes, `format` flips to the new locale's pattern.
- If you explicitly set `format`, it sticks. The locale still drives calendar
  rendering, weekday labels, and aria-labels — but the input mask uses your
  pattern.

```html
<!-- de-DE display, no explicit format → dd.mm.yyyy input mask -->
<auro-datepicker locale="de-DE"></auro-datepicker>

<!-- de-DE display, explicit dd/mm/yyyy mask -->
<auro-datepicker locale="de-DE" format="dd/mm/yyyy"></auro-datepicker>
```

## `monthNames` is now auto-derived

The hardcoded English `monthNames` array is gone. The property is computed
from the resolved locale via `Intl.DateTimeFormat`. To override (rare),
assign a 12-element array:

```js
picker.monthNames = ['Jan', 'Feb', /* ... */ 'Dec'];
```

Cally renders its own month-header internally from its `locale` attribute, so
overriding `monthNames` only affects code that reads the property; the calendar
header is locale-driven regardless.

## Standard `input` event (replaces `auroDatePicker-valueSet`)

`auroDatePicker-valueSet` is deprecated. Listen for the standard `input`
event; `event.detail.value` and `event.detail.valueEnd` are ISO strings or
`undefined`:

```js
picker.addEventListener('input', (event) => {
  const { value, valueEnd } = event.detail;
  // value, valueEnd are ISO `YYYY-MM-DD` strings or undefined
});
```

Both events fire in parallel for one release window. A one-time `console.warn`
is emitted on the first `auroDatePicker-valueSet` dispatch per page session.

## Server-side rendering

`DomHandler.getLocale` is DOM-only. During SSR the component resolves to
`en-US`; on first client paint it re-resolves to the detected locale, which
may flip the display format if `format` wasn't explicitly set.

## Accessibility

This release preserves and slightly improves the prior a11y posture, but the
changes were verified by code review only. A full VoiceOver/NVDA pass has not
yet been performed on this branch.

### Keyboard (preserved — code review)

- `datepickerKeyboardStrategy.js` only intercepts `Escape`, `ArrowDown`, and
  `Enter` on the trigger inputs (open/close bib + move focus into calendar).
- Cally owns calendar-grid navigation: arrow keys, `Home`/`End`,
  `PageUp`/`PageDown`, and `Enter`/`Space` on a day cell.
- The note in `test/MANUAL_TESTING.md` saying "Calendar keyboard navigation is
  NOT YET FULLY SUPPORTED" is stale — Cally provides full grid navigation.
  Refresh that doc before running a QA pass against it.

### Screen reader (preserved + improved — code review)

- Cally's internal aria-labels (table caption, day cells, selected state) are
  driven by its `locale` attribute, which the datepicker now forwards. So
  `<calendar-month locale="de-DE">` reads German labels.
- Auro-shell aria-labels (prev/next chevrons, close button) are localized via
  `translate()` from `src/i18nStrings.js`. This is an improvement over the
  pre-TRD English-only labels.
- The `ariaLabel.bib.close` consumer slot still works for overrides.
- The `ar-SA` example sets `dir="rtl"` on the host so SR direction follows.

### Not verified — manual QA required before merge

1. **VoiceOver (macOS) + NVDA (Windows) pass on Tier-1 locales.** No
   evidence in this branch that one was run. Until done, a11y parity is
   asserted from code review, not verified.
2. **RTL keyboard semantics in `ar-SA`.** In RTL, Left arrow should = next
   day. Cally is *believed* to handle this; not confirmed against a real
   RTL flow on this branch.
3. **IME composition** (Japanese / Korean input). The mask path uses IMask
   defaults; no `compositionend` test exists. Plan called for one — deferred.
4. **`test/MANUAL_TESTING.md` is partially stale.** References removed props
   (`calendarStartDate` / `calendarEndDate`), the deprecated
   `auroDatePicker-valueSet`, and MM/DD/YYYY-only direct input. Should be
   refreshed before manual QA runs against it.

### Recommended pre-merge QA

Run Tier-1 locales (`en-US`, `de-DE`, `ja-JP`, `ar-SA` at minimum) through:

- VoiceOver on Safari + Chrome — confirm month header, weekday strip, prev/next
  buttons, and selected-day announcement read in the target language.
- The keyboard sequence in `test/MANUAL_TESTING.md` (after refresh) — Tab,
  ArrowDown to open, grid navigation, Escape to close, focus return.
- `ar-SA` specifically — RTL grid direction, RTL arrow swap, input acceptance
  (the recent bidi-mark fix in `localeMask.js` was discovered via this path).

If a regression turns up, expect it in the Auro shell glue or RTL strategy —
not in Cally itself, since `test/cally-contract.test.js` (F10) now guards
that side.

## Optimizations (applied)

The following clean-ups were folded in alongside the main TRD work. None are
breaking — they're noted here for consumer awareness.

### F1 — `monthNames` is a lazy getter

`monthNames` does **not** eagerly recompute when `locale` changes. It is a
getter that runs `Intl.DateTimeFormat({month:'long'})` only when consumer code
reads the property, then caches per locale. Cally renders its own month header
directly from its `locale` attribute, so the array is only relevant for
consumer code reading `.monthNames` — paying for it on every locale change
would be waste. If your code reads `monthNames` immediately after construction
without first awaiting `updateComplete`, the value reflects the resolved
locale at that moment (not before `connectedCallback` ran).

### F4 — `parseIsoLocal(iso)` is exported from `calendarBridge.js`

The local-time ISO→`Date` helper that powers all five `*Object` getters is
now exported. If you build adjacent components that need the same negative-
UTC-offset guard, import it instead of writing your own `new Date(iso)`:

```js
import { parseIsoLocal } from '@aurodesignsystem/auro-datepicker/src/calendarBridge.js';

const d = parseIsoLocal('2025-01-01');
// d.getDate() === 1, d.getMonth() === 0 — local midnight, no UTC drift.
```

### F8 — i18n string scope

The audit confirmed Cally's internal aria-labels (calendar grid, table caption)
are already localized via its `locale` attribute. The keys retained in
`src/i18nStrings.js` (`datepicker.calendar.prevMonth`, `datepicker.calendar.nextMonth`,
`datepicker.bib.close`, `datepicker.input.invalidFormat`) are all for elements
the Auro shell renders itself (prev/next chevron buttons, close button, input
validation message). No keys were trimmed — but the rationale is now in code.

### F10 — Cally locale-contract pin test

`components/datepicker/test/cally-contract.test.js` mounts raw `<calendar-month>`,
`<calendar-date>`, and `<calendar-range>` with no Auro wrapper and asserts
Cally's locale-driven label rendering and ISO event emission. This is the
canary against any silent Cally upgrade that breaks the contract — if a
future Renovate batch ships English headers in non-English locales, this
test catches it before the shell tests do.

### F12 — softened CLDR string assertions

`monthNames` and Cally-rendered string assertions no longer pin exact CLDR
text (e.g. `"Januar"`). They assert only the contract Auro owns
("locale-distinct output, correct shape"). This stops a CLDR/ICU update from
turning every PR red over a `／` → `/` shift in a separator.

## Optimizations deferred to follow-up PRs

The following are tracked but not implemented in this release. Most depend on
either external tooling, post-deprecation cleanup, or a consumer audit that's
larger than the localization PR itself:

- **F2** — Delete the legacy display↔ISO converters in `components/datepicker/src/utilities.js`. Requires a grep across consumer repos (Borealis, ecomm) to confirm nothing imports them.
- **F3** — Skip `Intl.formatRange` for the in-popover range display (Cally already paints it). Needs screen-reader verification first — a11y users may rely on the live-region range string.
- **F5** — Direct Cally `change` listener (drop the bespoke bridge dispatch). Hold until the `auroDatePicker-valueSet` deprecation window closes.
- **F6** — Upstream `firstDayOfWeek` derivation into Cally itself. External maintainer timeline.
- **F7** — Promote the per-locale formatter cache into `packages/util`. Premature until a second Auro component needs it.
- **F9** — Subscribe to a Cally context-protocol provider for `data-locale` if upstream ever ships one. Speculative.
- **F11** — Renovate / Dependabot gate that groups Cally bumps separately and requires the F10 contract test to pass. CI-config change, outside the localization PR's blast radius.
- **F13** — Storybook + Chromatic visual snapshots per Tier-1 locale. Requires Chromatic budget decision.
- **F14** — `fast-check` property-based round-trip test for `buildLocaleDateMask`. Requires adding `fast-check` as a dev dependency.
- **F15** — Move `buildLocaleDateMask` unit tests from any future datepicker test back into the input package, since the utility lives at `components/input/src/localeMask.js`. Pure refactor when those tests land.
- **F16** — Split RTL/IME/a11y coverage into unit + `axe-core` + manual checklist. Requires `axe-core` integration.
- **F17** — Locale-flip perf / cache-leak test (mount + flip 50× across Tier-1, assert bounded memory). Preventative — earns its keep only if production telemetry flags a leak.

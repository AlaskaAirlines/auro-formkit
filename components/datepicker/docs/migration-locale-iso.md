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

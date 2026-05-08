<auro-header level="3" id="minimalConfig">Minimal Configuration</auro-header>

Every <code>&lt;auro-datepicker&gt;</code> implementation requires the following:

1. **A label in the `fromLabel` slot** — Provides an accessible label for the date input.
2. **A `bib.fullscreen.headline` slot** — Provides a headline for the fullscreen (mobile) calendar view.
3. **A `bib.fullscreen.fromLabel` slot** — Provides a label for the date input in the fullscreen view.

```html
<auro-datepicker>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.headline">Select Date</span>
  <span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
```

When using the `range` attribute, also provide `toLabel` and `bib.fullscreen.toLabel`:

```html
<auro-datepicker range>
  <span slot="fromLabel">Departure</span>
  <span slot="toLabel">Return</span>
  <span slot="bib.fullscreen.headline">Select Dates</span>
  <span slot="bib.fullscreen.fromLabel">Departure</span>
  <span slot="bib.fullscreen.toLabel">Return</span>
</auro-datepicker>
```

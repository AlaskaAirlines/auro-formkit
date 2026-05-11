<auro-header level="3" id="minimalConfig">Minimal Configuration</auro-header>
<p>Every <code>&lt;auro-datepicker&gt;</code> implementation requires the following:</p>
<ul>
  <li><strong>A label in the `fromLabel` slot</strong> — Provides an accessible label for the date input.</li>
  <li><strong>A `bib.fullscreen.headline` slot</strong> — Provides a headline for the fullscreen (mobile) calendar view.</li>
  <li><strong>A `bib.fullscreen.fromLabel` slot</strong> — Provides a label for the date input in the fullscreen view.</li>
</ul>
```html
<auro-datepicker>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.headline">Select Date</span>
  <span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
```
<p>When using the `range` attribute, also provide `toLabel` and `bib.fullscreen.toLabel`:/<p>
```html
<auro-datepicker range>
  <span slot="fromLabel">Departure</span>
  <span slot="toLabel">Return</span>
  <span slot="bib.fullscreen.headline">Select Dates</span>
  <span slot="bib.fullscreen.fromLabel">Departure</span>
  <span slot="bib.fullscreen.toLabel">Return</span>
</auro-datepicker>
```
</p>

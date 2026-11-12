<auro-header level="3" id="minimalConfig">Minimal configuration</auro-header>
<p>Every <code>&lt;auro-datepicker&gt;</code> implementation requires the following:</p>
<ul>
  <li><strong>A label in the <code>fromLabel</code> slot</strong>: Provides an accessible label for the date input.</li>
  <li><strong>An <code>ariaLabel.bib.close</code> slot</strong>: Provides the accessible name of the close button in the fullscreen calendar, which has no default.</li>
  <li><strong>A <code>bib.fullscreen.headline</code> slot</strong>: Provides a headline for the fullscreen (mobile) calendar view.</li>
  <li><strong>A <code>bib.fullscreen.fromLabel</code> slot</strong>: Provides a label for the date input in the fullscreen view.</li>
</ul>
```html
<auro-datepicker>
  <span slot="fromLabel">Choose a date</span>
  <span slot="ariaLabel.bib.close">Close calendar</span>
  <span slot="bib.fullscreen.headline">Select date</span>
  <span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
```
<p>When using the <code>range</code> attribute, also provide <code>toLabel</code> and <code>bib.fullscreen.toLabel</code>:</p>
```html
<auro-datepicker range>
  <span slot="fromLabel">Departure</span>
  <span slot="toLabel">Return</span>
  <span slot="ariaLabel.bib.close">Close calendar</span>
  <span slot="bib.fullscreen.headline">Select dates</span>
  <span slot="bib.fullscreen.fromLabel">Departure</span>
  <span slot="bib.fullscreen.toLabel">Return</span>
</auro-datepicker>
```

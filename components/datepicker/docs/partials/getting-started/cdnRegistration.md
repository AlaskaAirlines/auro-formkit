<p>Add the following script tag to your HTML to load the component directly from a CDN:</p>
```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@aurodesignsystem/auro-formkit@latest/auro-datepicker/+esm"></script>
```
<p>This script registers the <code>&lt;auro-datepicker&gt;</code> custom element globally. You can then use it in your HTML:</p>
```html
<auro-datepicker>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.headline">Select Date</span>
  <span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
```

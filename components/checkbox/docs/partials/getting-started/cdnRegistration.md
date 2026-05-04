<p>Add the following script tag to your HTML to load the component directly from a CDN:</p>
```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@aurodesignsystem/auro-formkit@latest/auro-checkbox/+esm"></script>
```
<p>This script registers the <code>&lt;auro-checkbox&gt;</code> and <code>&lt;auro-checkbox-group&gt;</code> custom elements globally. You can then use them in your HTML:</p>
```html
<auro-checkbox-group>
  <span slot="legend">Choose your options</span>
  <auro-checkbox value="option1" name="cdn" id="cb-cdn1">Option 1</auro-checkbox>
  <auro-checkbox value="option2" name="cdn" id="cb-cdn2">Option 2</auro-checkbox>
</auro-checkbox-group>
```

<p>Add the following script tag to your HTML to load the component directly from a CDN:</p>
```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@aurodesignsystem/auro-formkit@latest/auro-input/+esm"></script>
```
<p>This script registers the <code>&lt;auro-input&gt;</code> custom element globally. You can then use it in your HTML:</p>
```html
<auro-input>
  <span slot="label">Enter your name</span>
</auro-input>
```

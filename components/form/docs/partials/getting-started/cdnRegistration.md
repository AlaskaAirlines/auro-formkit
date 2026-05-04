<p>Add the following script tag to your HTML to load the component directly from a CDN:</p>
```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@aurodesignsystem/auro-formkit@latest/auro-form/+esm"></script>
```
<p>This script registers the <code>&lt;auro-form&gt;</code> custom element globally. You can then use it in your HTML:</p>
```html
<auro-form>
  <auro-input name="searchBox" required>
    <span slot="label">Search flights</span>
  </auro-input>
  <br />
  <auro-button type="submit">Submit</auro-button>
</auro-form>
```

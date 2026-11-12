<p>After installing, import the component's registered module:</p>
```js
import '@aurodesignsystem/auro-formkit/auro-combobox';
```
<p>This import registers the <code>&lt;auro-combobox&gt;</code> custom element globally. Then use it in your HTML:</p>
```html
<auro-combobox>
  <span slot="bib.fullscreen.headline">Choose an option</span>
  <span slot="label">Choose an option</span>
  <span slot="ariaLabel.input.clear">Clear selection</span>
  <auro-menu>
    <auro-menuoption value="option1">Option 1</auro-menuoption>
    <auro-menuoption value="option2">Option 2</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
```

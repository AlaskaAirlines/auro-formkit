<p>Once installed, the component can be used in your project by importing the component's registered module:</p>
```js
import '@aurodesignsystem/auro-formkit/auro-select';
```
<p>This import registers the <code>&lt;auro-select&gt;</code> custom element globally. You can then use it in your HTML:</p>
```html
<auro-select id="default-select">
  <span slot="label">Choose an option</span>
  <auro-menu>
    <auro-menuoption value="option1">Option 1</auro-menuoption>
    <auro-menuoption value="option2">Option 2</auro-menuoption>
  </auro-menu>
</auro-select>
```

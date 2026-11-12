<p>After you install the package, import the component's registered module to use it in your project:</p>
```js
import '@aurodesignsystem/auro-formkit/auro-checkbox';
```
<p>This import registers the <code>&lt;auro-checkbox&gt;</code> and <code>&lt;auro-checkbox-group&gt;</code> custom elements globally. Then use them in your HTML:</p>
```html
<auro-checkbox-group>
  <span slot="legend">Choose your options</span>
  <auro-checkbox value="option1" name="default" id="cb1">Option 1</auro-checkbox>
  <auro-checkbox value="option2" name="default" id="cb2">Option 2</auro-checkbox>
</auro-checkbox-group>
```

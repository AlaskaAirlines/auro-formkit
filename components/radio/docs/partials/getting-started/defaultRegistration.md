Import the component and its dependencies, then register the custom elements:

```js
import '@aurodesignsystem/auro-formkit/auro-radio';
```

Then use the elements in your HTML:

```html
<auro-radio-group>
  <span slot="legend">Form label goes here</span>
  <auro-radio id="radio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
  <auro-radio id="radio2" label="No" name="radioDemo" value="no"></auro-radio>
  <auro-radio id="radio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
</auro-radio-group>
```

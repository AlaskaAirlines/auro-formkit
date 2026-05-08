Import the component, then register the custom element:

```js
import '@aurodesignsystem/auro-formkit/auro-form';
```

Then use the element in your HTML:

```html
<auro-form>
  <auro-input name="searchBox" required>
    <span slot="label">Search flights</span>
  </auro-input>
  <br />
  <auro-button type="submit">Submit</auro-button>
</auro-form>
```

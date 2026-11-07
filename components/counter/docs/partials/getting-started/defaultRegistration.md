Import the component, which also registers its custom elements:

```js
import '@aurodesignsystem/auro-formkit/auro-counter';
```

Then use the elements in your HTML:

```html
<auro-counter-group>
  <auro-counter>
    Adults
    <span slot="ariaLabel.minus">Remove adult</span>
    <span slot="ariaLabel.plus">Add adult</span>
  </auro-counter>
  <auro-counter>
    Children
    <span slot="ariaLabel.minus">Remove child</span>
    <span slot="ariaLabel.plus">Add child</span>
  </auro-counter>
</auro-counter-group>
```

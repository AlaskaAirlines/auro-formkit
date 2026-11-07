Load the counter components from a CDN, with no build step:

```html
<script src="https://cdn.jsdelivr.net/npm/@aurodesignsystem/auro-formkit@latest/auro-counter/+esm" type="module"></script>
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

Load the dropdown from a CDN, without a build step:

```html
<script src="https://cdn.jsdelivr.net/npm/@aurodesignsystem/auro-formkit@latest/auro-dropdown/+esm" type="module"></script>
```

Then use the element in your HTML:

```html
<auro-dropdown>
  Seattle (SEA) to Anchorage (ANC), departs 8:15 AM
  <div slot="trigger">
    Flight details
  </div>
</auro-dropdown>
```

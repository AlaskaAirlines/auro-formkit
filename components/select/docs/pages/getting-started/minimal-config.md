<auro-header level="3" id="minimalConfig">Minimal Configuration</auro-header>

Every <code>&lt;auro-select&gt;</code> implementation requires three things:

1. **A unique `id` attribute** — Required when the select is used within a form so it can be properly identified during submission and validation.
2. **A label in the `label` slot** — Provides an accessible label for the select element.
3. **One or more `<auro-menuoption>` elements** — Placed inside an `<auro-menu>` in the default slot to define the available choices.

```html
<auro-select id="flightFilter">
  <span slot="label">Filter by</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
  </auro-menu>
</auro-select>
```

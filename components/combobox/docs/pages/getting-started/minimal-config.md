<auro-header level="3" id="minimalConfig">Minimal Configuration</auro-header>

Every <code>&lt;auro-combobox&gt;</code> implementation requires three things:

1. **A unique `id` attribute** — Required when the combobox is used within a form so it can be properly identified during submission and validation.
2. **A label in the `label` slot** — Provides an accessible label for the combobox element.
3. **One or more `<auro-menuoption>` elements** — Placed inside an `<auro-menu>` in the default slot to define the available choices.

```html
<auro-combobox id="airportSearch">
  <span slot="label">Search airports</span>
  <auro-menu>
    <auro-menuoption value="SEA">Seattle-Tacoma International</auro-menuoption>
    <auro-menuoption value="LAX">Los Angeles International</auro-menuoption>
    <auro-menuoption value="JFK">John F. Kennedy International</auro-menuoption>
    <auro-menuoption static nomatch>No matching airport</auro-menuoption>
  </auro-menu>
</auro-combobox>
```

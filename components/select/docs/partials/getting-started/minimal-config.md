<auro-header level="3" id="minimalConfig">Minimal Configuration</auro-header>
<p>Every <code>&lt;auro-select&gt;</code> implementation requires three things:</p>
<ul>
  <li><strong>A unique `id` attribute</strong> — Required when the select is used within a form so it can be properly identified during submission and validation.</li>
  <li><strong>A label in the `label` slot</strong> — Provides an accessible label for the select element.</li>
  <li><strong>One or more <code>&lt;auro-menuoption&gt;</code> elements</strong> — Placed inside an <code>&lt;auro-menu&gt;</code> in the default slot to define the available choices.</li>
</ul>
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

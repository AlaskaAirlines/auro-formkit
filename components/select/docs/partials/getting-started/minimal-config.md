<auro-header level="3" id="minimalConfig">Minimal configuration</auro-header>
<p>Every <code>&lt;auro-select&gt;</code> needs the following:</p>
<ul>
  <li><strong>A label in the <code>label</code> slot:</strong> Gives the select an accessible name that screen readers announce.</li>
  <li><strong>One or more <code>&lt;auro-menuoption&gt;</code> elements:</strong> Placed inside an <code>&lt;auro-menu&gt;</code> in the default slot to define the available choices.</li>
  <li><strong>A <code>name</code> attribute inside an <code>auro-form</code>:</strong> <code>auro-form</code> uses it as the key for the select's value.</li>
</ul>
```html
<auro-select name="flightFilter">
  <span slot="label">Filter by</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
  </auro-menu>
</auro-select>
```

<auro-header level="3" id="minimalConfig">Minimal configuration</auro-header>
<p>Every <code>&lt;auro-combobox&gt;</code> needs the following content:</p>
<ul>
  <li><strong>A label in the <code>label</code> slot</strong>: Names the combobox for screen readers.</li>
  <li><strong>Text in the <code>ariaLabel.input.clear</code> slot</strong>: Names the clear button for screen readers, such as "Clear airport". The combobox has no default text for it.</li>
  <li><strong>A headline in the <code>bib.fullscreen.headline</code> slot</strong>: Shown above the options when the bib opens fullscreen on small screens.</li>
  <li><strong>One or more <code>&lt;auro-menuoption&gt;</code> elements</strong>: Placed inside an <code>&lt;auro-menu&gt;</code> in the default slot to define the available choices.</li>
</ul>
<p>Inside an <code>&lt;auro-form&gt;</code>, also set a unique <code>name</code> attribute, which the form uses to track the combobox's value and validity.</p>
```html
<auro-combobox name="airportSearch">
  <span slot="bib.fullscreen.headline">Search airports</span>
  <span slot="label">Search airports</span>
  <span slot="ariaLabel.input.clear">Clear airport</span>
  <auro-menu>
    <auro-menuoption value="SEA">Seattle-Tacoma International</auro-menuoption>
    <auro-menuoption value="LAX">Los Angeles International</auro-menuoption>
    <auro-menuoption value="JFK">John F. Kennedy International</auro-menuoption>
    <auro-menuoption static nomatch>No matching airport</auro-menuoption>
  </auro-menu>
</auro-combobox>
```

<auro-header level="3" id="cssParts">CSS shadow parts</auro-header>
<p>CSS shadow parts let you style elements inside a web component's shadow DOM using the <code>::part()</code> pseudo-element. <code>&lt;auro-combobox&gt;</code> exposes the following parts.</p>
<table class="auro_table">
  <thead>
    <tr>
      <th>Part</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><code>dropdownTrigger</code></td><td>Doesn't currently style anything, because the dropdown inside the combobox doesn't render a <code>trigger</code> part.</td></tr>
    <tr><td><code>dropdownChevron</code></td><td>Doesn't currently style anything, because the combobox doesn't show a chevron.</td></tr>
    <tr><td><code>dropdownSize</code></td><td>The element that sets the bib's size. Only <code>height</code>, <code>width</code>, <code>max-height</code>, and <code>max-width</code> apply.</td></tr>
    <tr><td><code>helpText</code></td><td>The help text and error message below the combobox.</td></tr>
  </tbody>
</table>

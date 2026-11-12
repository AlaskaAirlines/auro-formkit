<auro-header level="3" id="cssParts">CSS shadow parts</auro-header>
<p>CSS shadow parts let you style elements inside a web component's shadow DOM using the <code>::part()</code> pseudo-element. <code>&lt;auro-select&gt;</code> exposes the following parts.</p>
<table class="auro_table">
  <thead>
    <tr>
      <th>Part</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><code>wrapper</code></td><td>The outermost element inside the select.</td></tr>
    <tr><td><code>dropdown</code></td><td>The inner dropdown element that holds the trigger and the bib.</td></tr>
    <tr><td><code>dropdownTrigger</code></td><td>The trigger that shows the label and selected value. Doesn't currently match any element, so styles set on it have no effect.</td></tr>
    <tr><td><code>dropdownChevron</code></td><td>The container for the arrow icon that shows whether the bib is open.</td></tr>
    <tr><td><code>dropdownSize</code></td><td>A hidden element whose <code>height</code>, <code>width</code>, <code>max-height</code>, and <code>max-width</code> are copied to the bib. Applies only when the bib matches the trigger's width: in the classic layout unless <code>flexMenuWidth</code> is set, and in other layouts when <code>matchWidth</code> is set.</td></tr>
    <tr><td><code>displayValue</code></td><td>The container for <code>displayValue</code> content in the trigger.</td></tr>
    <tr><td><code>helpText</code></td><td>The help text or error message shown below the select.</td></tr>
  </tbody>
</table>

<p>CSS shadow parts let you style elements inside a web component's shadow DOM using the <code>::part()</code> pseudo-element. <code>&lt;auro-checkbox-group&gt;</code> and <code>&lt;auro-checkbox&gt;</code> expose the following parts.</p>
<table class="auro_table">
  <thead>
    <tr>
      <th>Part</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><code>checkbox-group</code></td><td>The <code>&lt;fieldset&gt;</code> element in the <code>&lt;auro-checkbox-group&gt;</code> shadow DOM that wraps the legend and the checkboxes. It also carries the group's <code>aria-invalid</code> state.</td></tr>
    <tr><td><code>helpText</code></td><td>The help text element below the <code>&lt;auro-checkbox-group&gt;</code>, which shows the help text or the error message.</td></tr>
    <tr><td><code>checkbox</code></td><td>The container that wraps the checkbox's box and its label.</td></tr>
    <tr><td><code>checkbox-input</code></td><td>The native <code>&lt;input type="checkbox"&gt;</code> element. It's hidden with <code>display: none</code>, so styles on this part don't change the visible box.</td></tr>
    <tr><td><code>checkbox-label</code></td><td>The element that wraps the label text from the default slot.</td></tr>
  </tbody>
</table>

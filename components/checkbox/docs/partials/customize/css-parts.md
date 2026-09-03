<p>CSS Shadow Parts allow you to style elements inside a web component's shadow DOM using the <code>::part()</code> pseudo-element. The following parts are exposed by <code>&lt;auro-checkbox-group&gt;</code> and <code>&lt;auro-checkbox&gt;</code>.</p>
<table class="auro_table">
  <thead>
    <tr>
      <th>Part</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><code>checkbox-group</code></td><td>The fieldset element in the <code>&lt;auro-checkbox-group&gt;</code> shadow DOM. Use this to style the group container, and to query the element that carries the group's <code>aria-invalid</code> state.</td></tr>
    <tr><td><code>checkbox</code></td><td>The checkbox container element.</td></tr>
    <tr><td><code>checkbox-input</code></td><td>The checkbox input element.</td></tr>
    <tr><td><code>checkbox-label</code></td><td>The checkbox label element.</td></tr>
  </tbody>
</table>

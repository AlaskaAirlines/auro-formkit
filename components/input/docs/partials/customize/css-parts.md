<auro-header level="3" id="cssParts">CSS shadow parts</auro-header>
<p>Use the <code>::part()</code> pseudo-element to style elements inside the component's shadow DOM. <code>&lt;auro-input&gt;</code> exposes the following parts.</p>
<table class="auro_table">
  <thead>
    <tr>
      <th>Part</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><code>wrapper</code></td><td>The field's outer box, which holds the label, value, and icons but not the help text.</td></tr>
    <tr><td><code>label</code></td><td>The <code>&lt;label&gt;</code> element that holds the <code>label</code> slot.</td></tr>
    <tr><td><code>helpText</code></td><td>The <code>&lt;p&gt;</code> element that holds the help text or error message.</td></tr>
    <tr><td><code>input</code></td><td>The inner <code>&lt;input&gt;</code> element.</td></tr>
    <tr><td><code>accentIcon</code></td><td>The icon left of the value: the card icon when <code>icon</code> is set with <code>type="credit-card"</code>, or the calendar icon when <code>type="date"</code>. Not rendered in the emphasized layouts.</td></tr>
    <tr><td><code>accent-left</code></td><td>The area left of the value that holds <code>accentIcon</code>. Rendered only in the <code>classic</code> layout.</td></tr>
    <tr><td><code>accent-right</code></td><td>The area right of the value that holds the error icon, the show/hide password button, and the clear button. Rendered only in the <code>classic</code> layout.</td></tr>
    <tr><td><code>displayValue</code></td><td>The element that holds the <code>displayValue</code> slot content.</td></tr>
    <tr><td><code>inputHelpText</code></td><td>The area below the field that holds the help text or error message.</td></tr>
  </tbody>
</table>

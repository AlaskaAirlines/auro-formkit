<auro-header level="3" id="cssParts">CSS shadow parts</auro-header>
<p>CSS shadow parts let you style elements inside a web component's shadow DOM using the <code>::part()</code> pseudo-element. The following parts are exposed by <code>&lt;auro-datepicker&gt;</code>.</p>
<table class="auro_table">
  <thead>
    <tr>
      <th>Part</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><code>dropdown</code></td><td>The outer dropdown container.</td></tr>
    <tr><td><code>trigger</code></td><td>The trigger content container.</td></tr>
    <tr><td><code>wrapper</code></td><td>The container inside <code>trigger</code> that lays out the calendar icon, the inputs, and the clear button or error icon.</td></tr>
    <tr><td><code>mainLabel</code></td><td>The label for the whole datepicker, rendered only when <code>layout="snowflake"</code>.</td></tr>
    <tr><td><code>inputSection</code></td><td>The container that holds the date inputs.</td></tr>
    <tr><td><code>accentIcon</code></td><td>The calendar icon shown before the inputs in the <code>snowflake</code> layout. The <code>classic</code> layout hides it and shows the start date input's own calendar icon instead.</td></tr>
    <tr><td><code>input</code></td><td>The date input element(s).</td></tr>
    <tr><td><code>calendarWrapper</code></td><td>The container in the dropdown that holds the calendar.</td></tr>
    <tr><td><code>calendar</code></td><td>The calendar element.</td></tr>
    <tr><td><code>helpTextSpan</code></td><td>The help text container wrapper.</td></tr>
    <tr><td><code>helpText</code></td><td>The help text element.</td></tr>
  </tbody>
</table>

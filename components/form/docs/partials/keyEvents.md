<table>
  <thead>
    <tr>
      <th>Key</th>
      <th>Modifier</th>
      <th>Current State</th>
      <th>Focus Element</th>
      <th>Behavior</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Enter</td>
      <td>-</td>
      <td>Focus on a form element (not a textarea)</td>
      <td>Any tracked form element (input, select, datepicker, etc.)</td>
      <td>
        Prevents default behavior and calls <code>submit()</code> on the form. Validates all elements and dispatches the <code>submit</code> event if the form is valid.
      </td>
    </tr>
  </tbody>
</table>
<div class="note">
  <p><strong>Note:</strong> The <code>Enter</code> key handler is skipped for <code>&lt;textarea&gt;</code> elements and elements with a <code>textarea</code> attribute to allow normal newline entry.</p>
</div>

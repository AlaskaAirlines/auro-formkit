<table>
  <thead>
    <tr>
      <th>Key</th>
      <th>Modifier</th>
      <th>Current state</th>
      <th>Focus element</th>
      <th>Behavior</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Enter</td>
      <td>-</td>
      <td>Focus is on an enabled form element</td>
      <td>Any tracked form element, such as <code>auro-input</code>, <code>auro-select</code>, or <code>auro-datepicker</code></td>
      <td>
        Prevents the default behavior and calls <code>submit()</code> on the form, which validates every enabled form element and fires the <code>submit</code> event when none is invalid or required but empty.
      </td>
    </tr>
  </tbody>
</table>
<div class="note">
  <p><strong>Note:</strong> Enter doesn't submit the form from a disabled form element, a <code>&lt;textarea&gt;</code> element, or an element with a <code>textarea</code> attribute, so those elements keep their normal Enter behavior, such as starting a new line.</p>
</div>

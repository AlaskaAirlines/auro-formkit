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
      <td>Space</td>
      <td>-</td>
      <td>Not disabled</td>
      <td>Checkbox element</td>
      <td>
        Toggles the <code>checked</code> state. Calls <code>preventDefault()</code> to block page scroll.
      </td>
    </tr>
  </tbody>
</table>
<div class="note">
  <p><strong>Note:</strong> Arrow key navigation within a <code>&lt;auro-checkbox-group&gt;</code> is not currently supported. Each checkbox participates independently in the browser's default <code>tabindex</code> sequence.</p>
</div>

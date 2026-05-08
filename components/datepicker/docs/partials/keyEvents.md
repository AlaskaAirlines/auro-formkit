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
      <td>Escape</td>
      <td>-</td>
      <td>Bib (popover) is visible</td>
      <td>
        Component <code>:host</code> or any <strong>focusable</strong> element within the component.
      </td>
      <td>
        Closes the bib. Calls <code>stopPropagation()</code> to prevent parent containers (e.g., dialogs) from also closing.
      </td>
    </tr>
  </tbody>
</table>
<div class="note">
  <p><strong>Note:</strong> Full keyboard navigation of the calendar grid (e.g., arrow keys to move between dates) is not currently supported. This functionality is planned for a future major redesign. All date entry is handled via the trigger input(s) using the keyboard.</p>
</div>

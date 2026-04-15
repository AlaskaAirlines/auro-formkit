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
      <td>Radio element</td>
      <td>
        Selects the radio at the current focus index.
      </td>
    </tr>
    <tr>
      <td>ArrowDown</td>
      <td>-</td>
      <td>Focus within the radio group</td>
      <td>Any radio in the group</td>
      <td>
        Selects and focuses the next enabled radio. Wraps from last to first. Skips disabled items. Calls <code>preventDefault()</code>.
      </td>
    </tr>
    <tr>
      <td>ArrowRight</td>
      <td>-</td>
      <td>Focus within the radio group</td>
      <td>Any radio in the group</td>
      <td>
        Same as ArrowDown.
      </td>
    </tr>
    <tr>
      <td>ArrowUp</td>
      <td>-</td>
      <td>Focus within the radio group</td>
      <td>Any radio in the group</td>
      <td>
        Selects and focuses the previous enabled radio. Wraps from first to last. Skips disabled items. Calls <code>preventDefault()</code>.
      </td>
    </tr>
    <tr>
      <td>ArrowLeft</td>
      <td>-</td>
      <td>Focus within the radio group</td>
      <td>Any radio in the group</td>
      <td>
        Same as ArrowUp.
      </td>
    </tr>
  </tbody>
</table>

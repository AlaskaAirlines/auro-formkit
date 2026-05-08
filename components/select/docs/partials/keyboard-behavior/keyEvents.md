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
      <td rowspan="6">ArrowDown</td>
      <td rowspan="2">-</td>
      <td>Collapsed</td>
      <td>Trigger element</td>
      <td>Opens the bib.</td>
    </tr>
    <tr>
      <td>Expanded</td>
      <td>Trigger element</td>
      <td>
        Advances the <code>focused</code> option to the next enabled option in the list. If the current <code>focused</code> option is the last enabled option, selection wraps to the first enabled option.
      </td>
    </tr>
    <tr>
      <td rowspan="2">Command</td>
      <td>Collapsed</td>
      <td>Trigger element</td>
      <td>Opens the bib.</td>
    </tr>
    <tr>
      <td>Expanded</td>
      <td>Trigger element</td>
      <td>
        Advances the <code>focused</code> option to the last enabled option in the list.
      </td>
    </tr>
    <tr>
      <td rowspan="2">Option</td>
      <td>Collapsed</td>
      <td>Trigger element</td>
      <td>Opens the bib.</td>
    </tr>
    <tr>
      <td>Expanded</td>
      <td>Trigger element</td>
      <td>
        Advances the <code>focused</code> option to the last enabled option in the list.
      </td>
    </tr>
    <tr>
      <td rowspan="6">ArrowUp</td>
      <td rowspan="2">-</td>
      <td>Collapsed</td>
      <td>Trigger element</td>
      <td>Opens the bib.</td>
    </tr>
    <tr>
      <td>Expanded</td>
      <td>Trigger element</td>
      <td>
        Advances the <code>focused</code> option to the previous enabled option in the list. If the current <code>focused</code> option is the first enabled option, selection wraps to the last enabled option.
      </td>
    </tr>
    <tr>
      <td rowspan="2">Command</td>
      <td>Collapsed</td>
      <td>Trigger element</td>
      <td>Opens the bib.</td>
    </tr>
    <tr>
      <td>Expanded</td>
      <td>Trigger element</td>
      <td>
        Advances the <code>focused</code> option to the first enabled option in the list.
      </td>
    </tr>
    <tr>
      <td rowspan="2">Option</td>
      <td>Collapsed</td>
      <td>Trigger element</td>
      <td>Opens the bib.</td>
    </tr>
    <tr>
      <td>Expanded</td>
      <td>Trigger element</td>
      <td>
        Advances the <code>focused</code> option to the first enabled option in the list.
      </td>
    </tr>
    <tr>
      <td>End</td>
      <td>-</td>
      <td>Expanded</td>
      <td>Trigger element</td>
      <td>
        Advances the <code>focused</code> option to the last enabled option in the list.
      </td>
    </tr>
    <tr>
      <td rowspan="2">Enter</td>
      <td rowspan="2">-</td>
      <td>
        Expanded, without <code>multiSelect</code>
      </td>
      <td>Trigger element</td>
      <td>
        The current <code>focused</code> option is selected, closes the bib.
      </td>
    </tr>
    <tr>
      <td>
        Expanded, with <code>multiSelect</code>
      </td>
      <td>Trigger element</td>
      <td>
        The current <code>focused</code> option is toggled, does not close the bib.
      </td>
    </tr>
    <tr>
      <td>Home</td>
      <td>-</td>
      <td>Expanded</td>
      <td>Trigger element</td>
      <td>
        Advances the <code>focused</code> option to the first enabled option in the list.
      </td>
    </tr>
    <tr>
      <td rowspan="2">Tab</td>
      <td>-</td>
      <td>Expanded</td>
      <td>Trigger element</td>
      <td>
        The current <code>focused</code> option is selected.
        <div class="note">
          <strong>Note:</strong> the page will also navigate to the next focusable element in the tabindex sequence.
        </div>
      </td>
    </tr>
    <tr>
      <td>Shift</td>
      <td>Expanded</td>
      <td>Trigger element</td>
      <td>
        The current <code>focused</code> option is selected.
        <div class="note">
          <strong>Note:</strong> the page will also navigate to the previous focusable element in the tabindex sequence.
        </div>
      </td>
    </tr>
  </tbody>
</table>

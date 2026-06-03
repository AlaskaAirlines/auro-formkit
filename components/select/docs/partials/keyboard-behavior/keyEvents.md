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
      <td rowspan="8">ArrowDown</td>
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
      <td rowspan="2">Meta (Command / Windows key)</td>
      <td>Collapsed</td>
      <td>Trigger element</td>
      <td>
        Opens the bib.
        <div class="note">
          <strong>Note:</strong> On Windows, <code>Meta</code> + arrow key combinations are reserved by the operating system for window management. Windows users should use <code>Control</code> or <code>Alt</code> instead.
        </div>
      </td>
    </tr>
    <tr>
      <td>Expanded</td>
      <td>Trigger element</td>
      <td>
        Advances the <code>focused</code> option to the last enabled option in the list.
      </td>
    </tr>
    <tr>
      <td rowspan="2">Alt (Option)</td>
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
      <td rowspan="2">Control</td>
      <td>Collapsed</td>
      <td>Trigger element</td>
      <td>
        Opens the bib.
        <div class="note">
          <strong>Note:</strong> On macOS, <code>Control</code> + arrow key combinations are reserved by the operating system for Mission Control and Application Windows. macOS users should use <code>Meta</code> or <code>Alt</code> instead.
        </div>
      </td>
    </tr>
    <tr>
      <td>Expanded</td>
      <td>Trigger element</td>
      <td>
        Advances the <code>focused</code> option to the last enabled option in the list.
      </td>
    </tr>
    <tr>
      <td rowspan="8">ArrowUp</td>
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
      <td rowspan="2">Meta (Command / Windows key)</td>
      <td>Collapsed</td>
      <td>Trigger element</td>
      <td>
        Opens the bib.
        <div class="note">
          <strong>Note:</strong> On Windows, <code>Meta</code> + arrow key combinations are reserved by the operating system for window management. Windows users should use <code>Control</code> or <code>Alt</code> instead.
        </div>
      </td>
    </tr>
    <tr>
      <td>Expanded</td>
      <td>Trigger element</td>
      <td>
        Advances the <code>focused</code> option to the first enabled option in the list.
      </td>
    </tr>
    <tr>
      <td rowspan="2">Alt (Option)</td>
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
      <td rowspan="2">Control</td>
      <td>Collapsed</td>
      <td>Trigger element</td>
      <td>
        Opens the bib.
        <div class="note">
          <strong>Note:</strong> On macOS, <code>Control</code> + arrow key combinations are reserved by the operating system for Mission Control and Application Windows. macOS users should use <code>Meta</code> or <code>Alt</code> instead.
        </div>
      </td>
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
    <tr>
      <td>Printable character</td>
      <td>-</td>
      <td>Collapsed or Expanded</td>
      <td>Trigger element</td>
      <td>
        Activates type-ahead navigation. Opens the bib if collapsed, then advances the <code>focused</code> option to the first enabled option whose displayed text starts with the buffered keystrokes. Repeated keystrokes within <code>typeaheadTimeoutMs</code> extend the buffer; pressing the same character repeatedly cycles through matching options. See the <a href="customize.html#typeAhead">Type-Ahead</a> section on the Customize page.
      </td>
    </tr>
  </tbody>
</table>

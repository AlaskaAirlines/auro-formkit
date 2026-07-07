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
          <strong>Note:</strong> On macOS, <code>Control</code> + arrow key combinations are reserved by the operating system for Mission Control and Application Windows. macOS users should use <code>Alt</code> instead.
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
          <strong>Note:</strong> On macOS, <code>Control</code> + arrow key combinations are reserved by the operating system for Mission Control and Application Windows. macOS users should use <code>Alt</code> instead.
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
      <td rowspan="2">End</td>
      <td rowspan="2">-</td>
      <td>Collapsed</td>
      <td>Trigger element</td>
      <td>
        Opens the bib and advances the <code>focused</code> option to the last enabled option in the list.
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
      <td rowspan="2">Home</td>
      <td rowspan="2">-</td>
      <td>Collapsed</td>
      <td>Trigger element</td>
      <td>
        Opens the bib and advances the <code>focused</code> option to the first enabled option in the list.
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
      <td>Space</td>
      <td>-</td>
      <td>Collapsed or Expanded</td>
      <td>Trigger element</td>
      <td>
        When the type-ahead buffer is empty, Space behaves as documented in the inherited Space row below. While the buffer is active, Space extends the buffer instead — the <code>focused</code> option advances if the buffer matches an enabled option, and the bib state is unchanged. See the <a href="customize.html#typeAhead">Type-Ahead</a> section on the Customize page.
      </td>
    </tr>
    <tr>
      <td>Any printable character (other than Space)</td>
      <td>-</td>
      <td>Collapsed or Expanded</td>
      <td>Trigger element</td>
      <td>
        Extends the type-ahead buffer. When the buffer matches an enabled option's displayed text, the <code>focused</code> option advances to that option and the bib opens if it was collapsed. A keystroke that does not match any option leaves the bib state unchanged. Repeated keystrokes within <code>typeaheadTimeoutMs</code> extend the buffer; pressing the same character repeatedly cycles through matching options. See the <a href="customize.html#typeAhead">Type-Ahead</a> section on the Customize page.
      </td>
    </tr>
  </tbody>
</table>

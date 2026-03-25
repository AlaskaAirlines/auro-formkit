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
      <td>*<sup><a href="#fn_FocusAll">1</a></sup></td>
      <td>Opens the bib.</td>
    </tr>
    <tr>
      <td>Expanded</td>
      <td>*<sup><a href="#fn_FocusAll">1</a></sup></td>
      <td>
        Advances the <code>activeOption</code> to the next enabled option in the list. If the current <code>activeOption</code> is the last enabled option, selection wraps to the first enabled option.
      </td>
    </tr>
    <tr>
      <td rowspan="2">Command</td>
      <td>Collapsed</td>
      <td>*<sup><a href="#fn_FocusAll">1</a></sup></td>
      <td>Opens the bib.</td>
    </tr>
    <tr>
      <td>Expanded</td>
      <td>*<sup><a href="#fn_FocusAll">1</a></sup></td>
      <td>
        Advances the <code>activeOption</code> to the last enabled option in the list.
      </td>
    </tr>
    <tr>
      <td rowspan="2">Option</td>
      <td>Collapsed</td>
      <td>*<sup><a href="#fn_FocusAll">1</a></sup></td>
      <td>Opens the bib.</td>
    </tr>
    <tr>
      <td>Expanded</td>
      <td>*<sup><a href="#fn_FocusAll">1</a></sup></td>
      <td>
        Advances the <code>activeOption</code> to the last enabled option in the list.
      </td>
    </tr>
    <tr>
      <td rowspan="6">ArrowUp</td>
      <td rowspan="2">-</td>
      <td>Collapsed</td>
      <td>*<sup><a href="#fn_FocusAll">1</a></sup></td>
      <td>Opens the bib.</td>
    </tr>
    <tr>
      <td>Expanded</td>
      <td>*<sup><a href="#fn_FocusAll">1</a></sup></td>
      <td>
        Advances the <code>activeOption</code> to the previous enabled option in the list. If the current <code>activeOption</code> is the first enabled option, selection wraps to the last enabled option.
      </td>
    </tr>
    <tr>
      <td rowspan="2">Command</td>
      <td>Collapsed</td>
      <td>*<sup><a href="#fn_FocusAll">1</a></sup></td>
      <td>Opens the bib.</td>
    </tr>
    <tr>
      <td>Expanded</td>
      <td>*<sup><a href="#fn_FocusAll">1</a></sup></td>
      <td>
        Advances the <code>activeOption</code> to the first enabled option in the list.
      </td>
    </tr>
    <tr>
      <td rowspan="2">Option</td>
      <td>Collapsed</td>
      <td>*<sup><a href="#fn_FocusAll">1</a></sup></td>
      <td>Opens the bib.</td>
    </tr>
    <tr>
      <td>Expanded</td>
      <td>*<sup><a href="#fn_FocusAll">1</a></sup></td>
      <td>
        Advances the <code>activeOption</code> to the first enabled option in the list.
      </td>
    </tr>
    <tr>
      <td>End</td>
      <td>-</td>
      <td>Expanded</td>
      <td>*<sup><a href="#fn_FocusAll">1</a></sup></td>
      <td>
        Advances the <code>activeOption</code> to the last enabled option in the list.
      </td>
    </tr>
      <tr>
      <td>Enter</td>
      <td>-</td>
      <td>Expanded</td>
      <td>*<sup><a href="#fn_FocusAll">1</a></sup></td>
      <td>
        The current <code>activeOption</code> is selected.
      </td>
    </tr>
    <tr>
      <td>Home</td>
      <td>-</td>
      <td>Expanded</td>
      <td>*<sup><a href="#fn_FocusAll">1</a></sup></td>
      <td>
        Advances the <code>activeOption</code> to the first enabled option in the list.
      </td>
    </tr>
    <tr>
      <td>PageDown</td>
      <td>-</td>
      <td>Expanded</td>
      <td>*<sup><a href="#fn_FocusAll">1</a></sup></td>
      <td>
        The browser advances the <code>activeOption</code> by approximately one “page” of visible options (typically equal to the number of rendered rows). The scroll position updates in tandem so that the newly active option is brought into view, usually aligning near the bottom of the visible list.
      </td>
    </tr>
    <tr>
      <td>PageUp</td>
      <td>-</td>
      <td>Expanded</td>
      <td>*<sup><a href="#fn_FocusAll">1</a></sup></td>
      <td>
        The browser moves the <code>activeOption</code> up by approximately one “page” of visible items (typically equal to the number of rendered rows). The scroll position updates accordingly so the newly active option is brought into view, often aligning near the top of the visible list.
      </td>
    </tr>
    <tr>
      <td rowspan="2">Tab</td>
      <td>-</td>
      <td>Expanded</td>
      <td>*<sup><a href="#fn_FocusAll">1</a></sup></td>
      <td>
        The current <code>activeOption</code> is selected.
        <br />
        <i><strong>Note:</strong> the page will also navigate to the next focusable element in the tabindex order.</i>
      </td>
    </tr>
    <tr>
      <td>Shift</td>
      <td>Expanded</td>
      <td>*<sup><a href="#fn_FocusAll">1</a></sup></td>
      <td>
        Advances the <code>activeOption</code> to the first enabled option in the list.
        <br />
        <i><strong>Note:</strong> the page will <strong>NOT</strong> navigate to the previous focusable element in the tabindex order.</i>
      </td>
    </tr>
  </tbody>
</table>
<div class="note">
  <p><strong>Static vs. dynamic option list:</strong> Some keys work only once the options are in the DOM, as noted in the <strong>Current state</strong> column of the following table. This matters because the combobox supports option lists built <em>after</em> someone types in the <strong>input</strong>.</p>
</div>
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
      <td rowspan="2">ArrowDown</td>
      <td rowspan="2">-</td>
      <td>Collapsed, the input has text, and list options have been populated</td>
      <td>
        Trigger input element, <strong>NOT</strong> the trigger input clear button
      </td>
      <td>Opens the bib.</td>
    </tr>
    <tr>
      <td>Expanded</td>
      <td>
        Input element, <strong>NOT</strong> the input clear button
        <div class="note">
          <strong>Note:</strong> Includes both trigger and bib content inputs depending on viewport size.
        </div>
      </td>
      <td>
        Moves the active option to the next enabled option in the list. If the active option is the last enabled option, the active option wraps to the first enabled option.
      </td>
    </tr>
    <tr>
      <td rowspan="2">ArrowUp</td>
      <td rowspan="2">-</td>
      <td>Collapsed, the input has text, and list options have been populated</td>
      <td>
        Trigger input element, <strong>NOT</strong> the trigger input clear button
      </td>
      <td>Opens the bib.</td>
    </tr>
    <tr>
      <td>Expanded</td>
      <td>
        Input element, <strong>NOT</strong> the input clear button
        <div class="note">
          <strong>Note:</strong> Includes both trigger and bib content inputs.
        </div>
      </td>
      <td>
        Moves the active option to the previous enabled option in the list. If the active option is the first enabled option, the active option wraps to the last enabled option.
      </td>
    </tr>
    <tr>
      <td>End</td>
      <td>-</td>
      <td>Expanded</td>
      <td>
        Input element, <strong>NOT</strong> the input clear button
        <div class="note">
          <strong>Note:</strong> Includes both trigger and bib content inputs.
        </div>
      </td>
      <td>
        Moves the active option to the last enabled option in the list.
      </td>
    </tr>
    <tr>
      <td rowspan="4">Enter</td>
      <td rowspan="4">-</td>
      <td>Collapsed, the input has text, and list options have been populated</td>
      <td>
        Trigger input, <strong>NOT</strong> the input clear button
      </td>
      <td>
       Opens the bib.
      </td>
    </tr>
    <tr>
      <td>Collapsed</td>
      <td>
        Input clear button, <strong>NOT</strong> the input element
      </td>
      <td>
        Clears the <strong>input</strong> value and moves <strong>focus</strong> to the trigger input element.
      </td>
    </tr>
    <tr>
      <td>Expanded, large viewport device</td>
      <td>
        Trigger input element, <strong>NOT</strong> the trigger input clear button
      </td>
      <td>
        Selects the active option, closes the bib, and moves <strong>focus</strong> to the <strong>clear button</strong> in the trigger input.
      </td>
    </tr>
    <tr>
      <td>Expanded, small viewport device</td>
      <td>
        Dialog input element, <strong>NOT</strong> the dialog input clear button
      </td>
      <td>
        Selects the active option, closes the bib, and returns <strong>focus</strong> to the trigger input element.
      </td>
    </tr>
    <tr>
      <td>Escape</td>
      <td>-</td>
      <td>Expanded</td>
      <td>
        Input element, <strong>NOT</strong> the input clear button
        <div class="note">
          <strong>Note:</strong> Includes both trigger and bib content inputs.
        </div>
      </td>
      <td>
        Closes the bib and moves <strong>focus</strong> to the trigger input element.
      </td>
    </tr>
    <tr>
      <td>Home</td>
      <td>-</td>
      <td>Expanded</td>
      <td>
        Input element, <strong>NOT</strong> the input clear button
        <div class="note">
          <strong>Note:</strong> Includes both trigger and bib content inputs.
        </div>
      </td>
      <td>
        Moves the active option to the first enabled option in the list.
      </td>
    </tr>
    <tr>
      <td rowspan="2">Tab</td>
      <td>-</td>
      <td>Expanded</td>
      <td>
        Input element, <strong>NOT</strong> the input clear button
        <div class="note">
          <strong>Note:</strong> Includes both trigger and bib content inputs.
        </div>
      </td>
      <td>
        Selects the active option, closes the bib, and moves <strong>focus</strong> to the <strong>clear button</strong> in the component trigger.
      </td>
    </tr>
    <tr>
      <td>Shift</td>
      <td>Expanded</td>
      <td>
        Input element, <strong>NOT</strong> the input clear button
        <div class="note">
          <strong>Note:</strong> Includes both trigger and bib content inputs.
        </div>
      </td>
      <td>
        Selects the active option, closes the bib, and moves <strong>focus</strong> to the previous focusable element on the page.
      </td>
    </tr>
  </tbody>
</table>

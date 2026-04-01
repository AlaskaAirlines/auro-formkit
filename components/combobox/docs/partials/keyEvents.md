<div class="note">
  <p><strong>Static vs Dynamic Option List:</strong> The <strong>expanded</strong> state can never be applied without list options rendered into the DOM. Since the component supports dynamic option lists generated <em>after</em> a value is typed into the <strong>input</strong>, certain key events (as noted in the <strong>Current State</strong> column of the table below) only function with the option list rendered into the DOM.</p>
</div>
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
      <td>Collapsed, list options have been populated</td>
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
        Advances the <code>focused</code> option to the next enabled option in the list. If the current <code>focused</code> option is the last enabled option, selection wraps to the first enabled option.
      </td>
    </tr>
    <tr>
      <td rowspan="2">Command</td>
      <td>Collapsed, list options have been populated</td>
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
        Advances the <code>focused</code> option to the last enabled option in the list.
      </td>
    </tr>
    <tr>
      <td rowspan="2">Option</td>
      <td>Collapsed, list options have been populated</td>
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
        Advances the <code>focused</code> option to the last enabled option in the list.
      </td>
    </tr>
    <tr>
      <td rowspan="6">ArrowUp</td>
      <td rowspan="2">-</td>
      <td>Collapsed, list options have been populated</td>
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
        Advances the <code>focused</code> option to the previous enabled option in the list. If the current <code>focused</code> option is the first enabled option, selection wraps to the last enabled option.
      </td>
    </tr>
    <tr>
      <td rowspan="2">Command</td>
      <td>Collapsed, list options have been populated</td>
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
        Advances the <code>focused</code> option to the first enabled option in the list.
      </td>
    </tr>
    <tr>
      <td rowspan="2">Option</td>
      <td>Collapsed, list options have been populated</td>
      <td>
        Input element, <strong>NOT</strong> the input clear button
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
        Advances the <code>focused</code> option to the first enabled option in the list.
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
        Advances the <code>focused</code> option to the last enabled option in the list.
      </td>
    </tr>
    <tr>
      <td rowspan="5">Enter</td>
      <td rowspan="5">-</td>
      <td>Collapsed, list options have been populated</td>
      <td>
        Trigger input, <strong>NOT</strong> the input clear button
      </td>
      <td>
       The bib is opened.
      </td>
    </tr>
    <tr>
      <td>Collapsed</td>
      <td>
        Input clear button, <strong>NOT</strong> the input element
      </td>
      <td>
        The <strong>input</strong> value is cleared, <strong>focus</strong> moves to the trigger input element.
      </td>
    </tr>
    <tr>
      <td rowspan="2">Expanded, large viewport device</td>
      <td>
        Trigger input element, <strong>NOT</strong> the trigger input clear button
      </td>
      <td>
        The current <code>focused</code> option is selected, closes the bib and <strong>focus</strong> is returned to the trigger input element.
      </td>
    </tr>
    <tr>
      <td>
        Trigger input clear button, <strong>NOT</strong> the trigger input 
      </td>
      <td>
        The input value is cleared and <strong>focus</strong> is moved to the trigger input element.
      </td>
    </tr>
    <tr>
      <td>Expanded, small viewport device</td>
      <td>
        Dialog input element, <strong>NOT</strong> the dialog input clear button
      </td>
      <td>
        The current <code>focused</code> option is selected, closes the bib and <strong>focus</strong> is returned to the trigger input element.
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
        Closes the bib, moves <strong>focus</strong> to the trigger input element.
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
        Advances the <code>focused</code> option to the first enabled option in the list.
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
        The current <code>focused</code> option is selected, the bib is closed and <strong>focus</strong> is moved to the <strong>clear button</strong> in the component trigger.
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
        The current <code>focused</code> option is selected, the bib is closed and <strong>focus</strong> is moved to the previous focusable element.
      </td>
    </tr>
  </tbody>
</table>

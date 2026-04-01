<auro-header level="1" id="overview">Combobox - Keyboard Behavior</auro-header>
<div class="contentWrapper">
  <div class="mainContent">
    <div class="scrollWrapper">
      <auro-header level="2" id="tabBehavior">Tab Behavior</auro-header>
      <p>The component trigger contains an <code>&lt;auro-input&gt;</code> which has two focusable elements:</p>
      <ol>
        <li><strong>Input</strong></li>
        <li><strong>Clear button:</strong> only shown when the input has a value.</li>
      </ol>
      <p>Each focusable element <em>(when shown)</em> participates in the browser window's default <code>tabindex</code> sequence.</p>
      <p>When the component is <code>disabled</code> it is removed from the <code>tabindex</code> sequence. VoiceOver's virtual cursor <em>(swipe navigation)</em> can still encounter the component, but standard keyboard <code>Tab</code> navigation skips it.</p>
      <p>On <strong>large viewport devices</strong> (e.g., desktop browser, tablet) there is no focusable content inside the component bib.</p>
      <p>On <strong>small viewport devices</strong> (e.g., phone) the bib opens a modal dialog with a focusable <strong>input</strong> and <strong>clear button</strong> which may be tabbed through naturally.</p>
      <auro-header level="2" id="keyEvents">Key Events</auro-header>
      <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/keyEvents.md) -->
      <!-- The below content is automatically added from ./../docs/partials/keyEvents.md -->
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
      <!-- AURO-GENERATED-CONTENT:END -->
      <div class="note">
        <p><strong>Note:</strong> The following keyboard behavior is unsupported at this time:</p>
        <ul>
          <li><strong>PageUp:</strong> The browser moves the <code>focused</code> option up by approximately one <strong>page</strong> of visible options (typically equal to the number of rendered rows). The scroll position updates in tandem so that the newly focused option is brought into view, usually aligning near the top of the visible list.</li>
          <li><strong>PageDown:</strong> The browser advances the <code>focused</code> option down by approximately one <strong>page</strong> of visible items (typically equal to the number of rendered rows). The scroll position updates accordingly so the newly focused option is brought into view, often aligning near the bottom of the visible list.</li>
        </ul>
      </div>
    </div>
  </div>
</div>

## DEVELOPER NOTES / CODE ACTION ITEMS / TODO ITEMS
1. Remove the bridge for keyboard event bubbling out of the bib
1. Prevent auro-dropdown `Enter` and `Space` key behavior for opening and closing the bib.
1. Strip out key event listeners not listed in this document

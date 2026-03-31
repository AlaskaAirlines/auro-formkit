<auro-header level="1" id="overview">Counter & Counter Group - Keyboard Behavior</auro-header>
<div class="contentWrapper">
  <div class="mainContent">
  <div class="scrollWrapper">
    <auro-header level="2" id="tabBehavior">Tab Behavior</auro-header>
    <auro-header level="3" id="tabBehaviorCounter">Counter</auro-header>
    <p>The counter component is itself a focusable element. There are no sub-parts that are separately focusable.</p>
    <auro-header level="3" id="tabBehaviorCounterGroup">Counter Group</auro-header>
    <p>When multiple counters are placed inside a counter group the component behaves as an auro-dropdown. The trigger element renders a counter group label and a summary of all counter labels and current values. The dropdown bib renders all counters inside of the group.</p>
    <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../dropdown/docs/partials/tabindex.md) -->
    <!-- The below content is automatically added from ./../../dropdown/docs/partials/tabindex.md -->
    <p>The trigger is a focusable element and participates in the standard tab order, responding to <code>Tab</code> and <code>Shift+Tab</code> key events per <auro-hyperlink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/tabindex">native browser behavior, i.e., these keys step through the browser tabindex sequence.</auro-hyperlink></p>
    <p> When the component is <code>disabled</code> it is removed from the <code>tabindex</code> sequence. VoiceOver's virtual cursor <em>(swipe navigation)</em> can still encounter the component, but standard keyboard <code>Tab</code> navigation skips it.</p>
    <p>When the bib is collapsed, the bib content is excluded from the tab sequence. When <strong>expanded</strong>, focusable elements within the bib content are included in the natural tab order. In fullscreen mode, focus is trapped within the bib, and the tab sequence cycles through the bib content focusable elements until the bib is closed or the viewport no longer meets the fullscreen condition and is rendered as a popover.</p>
    <!-- AURO-GENERATED-CONTENT:END -->
    <auro-header level="2" id="keyEvents">Key Events</auro-header>
    <auro-header level="3" id="keyEventsCounter">Counter</auro-header>
    <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/keyEvents-counter.md) -->
    <!-- The below content is automatically added from ./../docs/partials/keyEvents-counter.md -->
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
          <td>ArrowDown</td>
          <td>-</td>
          <td>*</td>
          <td>
            Trigger element.
          </td>
          <td>Decrements the counter value by 1.</td>
        </tr>
        <tr>
          <td>ArrowUp</td>
          <td>-</td>
          <td>*</td>
          <td>
            Trigger element.
          </td>
          <td>Increments the counter value by 1.</td>
        </tr>
      </tbody>
    </table>
    <!-- AURO-GENERATED-CONTENT:END -->
    <div class="note">
      <p><strong>Note:</strong> The following keyboard behavior is unsupported at this time:</p>
      <ul>
        <li><strong>Home:</strong> sets the counter value to the defined minimum (default 0)</li>
        <li><strong>End:</strong> sets the counter value to the defined maximum (default 9)</li>
        <li><strong>PageUp:</strong> (optional) Increases the value by a larger step than Up Arrow.</li>
        <li><strong>PageDown:</strong> (optional) Decreases the value by a larger step than Down Arrow.</li>
      </ul>
    </div>
    <auro-header level="3" id="keyEventsCounterGroup">Counter Group</auro-header>
    <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/keyEvents-counterGroup.md) -->
    <!-- The below content is automatically added from ./../docs/partials/keyEvents-counterGroup.md -->
    <p>The counter group itself does not have any key event handlers other than those inherited from the dropdown component. However, when the counter group is <strong>expanded</strong> | <strong>opened</strong> the first counter in the bib receives <strong>focus</strong>. When the counter group is <strong>collapsed</strong> | <strong>closed</strong> by any method other than the <code>Tab</code> key (e.g., the <strong>Esc</strong> key), <strong>focus</strong> moves to the trigger element.</p>
    <!-- AURO-GENERATED-CONTENT:END -->
    <auro-header level="4" id="keyEventsDropdown">Key Events inherited from Auro-Dropdown</auro-header>
    <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../dropdown/docs/partials/keyEvents.md) -->
    <!-- The below content is automatically added from ./../../dropdown/docs/partials/keyEvents.md -->
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
          <td rowspan="2">Enter</td>
          <td>-</td>
          <td>Collapsed</td>
          <td>
            Trigger or any <strong>focusable</strong> element within the trigger.
          </td>
          <td>Opens the bib.</td>
        </tr>
        <tr>
          <td>-</td>
          <td>Expanded</td>
          <td>
            Trigger or any <strong>focusable</strong> element within the trigger.
          </td>
          <td>Closes the bib.</td>
        </tr>
        <tr>
          <td>Escape</td>
          <td>-</td>
          <td>Expanded</td>
          <td>
            Component <code>:host</code> or any <strong>focusable</strong> element within the component.
          </td>
          <td>Closes the bib.</td>
        </tr>
        <tr>
          <td rowspan="2">Space</td>
          <td>-</td>
          <td>Collapsed</td>
          <td>
            Trigger or any <strong>focusable</strong> element within the trigger.
          </td>
          <td>Opens the bib.</td>
        </tr>
        <tr>
          <td>-</td>
          <td>Expanded</td>
          <td>
            Trigger or any <strong>focusable</strong> element within the trigger.
          </td>
          <td>Closes the bib.</td>
        </tr>
      </tbody>
    </table>
    <!-- AURO-GENERATED-CONTENT:END -->
  </div>
</div>

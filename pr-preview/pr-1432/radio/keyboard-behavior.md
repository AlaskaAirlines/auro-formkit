<auro-header level="1" id="overview">Radio - Keyboard Behavior</auro-header>
<div class="contentWrapper">
  <div class="mainContent">
    <div class="scrollWrapper">
      <auro-header level="2" id="tabBehavior">Tab Behavior</auro-header>
      <p>Within an <code>&lt;auro-radio-group&gt;</code>, the currently selected radio (or the first enabled radio if none is selected) participates in the browser's default <code>tabindex</code> sequence. Arrow keys move focus and selection between radios within the group.</p>
      <p>When the component is <code>disabled</code> it is removed from the <code>tabindex</code> sequence.</p>
      <auro-header level="2" id="keyEvents">Key Events</auro-header>
      <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/keyEvents.md) -->
      <!-- The below content is automatically added from ./../docs/partials/keyEvents.md -->
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
      <!-- AURO-GENERATED-CONTENT:END -->
    </div>
  </div>
</div>
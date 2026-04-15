<auro-header level="1" id="overview">Checkbox - Keyboard Behavior</auro-header>
<div class="contentWrapper">
  <div class="mainContent">
    <div class="scrollWrapper">
      <auro-header level="2" id="tabBehavior">Tab Behavior</auro-header>
      <p>Each <code>&lt;auro-checkbox&gt;</code> participates independently in the browser's default <code>tabindex</code> sequence. When a checkbox is <code>disabled</code> it is removed from the <code>tabindex</code> sequence.</p>
      <p>Arrow key navigation within a <code>&lt;auro-checkbox-group&gt;</code> is not currently supported.</p>
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
            <td>Checkbox element</td>
            <td>
              Toggles the <code>checked</code> state. Calls <code>preventDefault()</code> to block page scroll.
            </td>
          </tr>
        </tbody>
      </table>
      <div class="note">
        <p><strong>Note:</strong> Arrow key navigation within a <code>&lt;auro-checkbox-group&gt;</code> is not currently supported. Each checkbox participates independently in the browser's default <code>tabindex</code> sequence.</p>
      </div>
      <!-- AURO-GENERATED-CONTENT:END -->
    </div>
  </div>
</div>
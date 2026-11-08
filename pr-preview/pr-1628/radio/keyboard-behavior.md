<auro-header level="1" id="overview">Radio - Keyboard behavior</auro-header>
<div class="contentWrapper">
<div class="mainContent">
<div class="scrollWrapper">
<auro-header level="2" id="tabBehavior">Tab behavior</auro-header>
<p>Within an <code>&lt;auro-radio-group&gt;</code>, Tab reaches only the selected radio button, or the first enabled one when none is selected. Arrow keys move focus and selection between the radio buttons in the group.</p>
<p>When the group is <code>disabled</code>, unchecked radio buttons are removed from the tab order, but a checked radio button stays in it. Arrow keys then move focus without changing the selection.</p>
<auro-header level="2" id="keyEvents">Key events</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/keyboard-behavior/key-events.md) -->
<!-- The below content is automatically added from ./../docs/partials/keyboard-behavior/key-events.md -->
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
              Selects and focuses the next enabled radio. Wraps from last to first. Skips disabled items, but doesn't currently wrap to the first radio when every radio after the current one is disabled. Calls <code>preventDefault()</code>.
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

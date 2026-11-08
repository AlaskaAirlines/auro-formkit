<auro-header level="1" id="overview">Checkbox: Keyboard behavior</auro-header>
<div class="contentWrapper">
<div class="mainContent">
<div class="scrollWrapper">
<auro-header level="2" id="tabBehavior">Tab behavior</auro-header>
<p>Each <code>&lt;auro-checkbox&gt;</code> is its own stop in the page's tab order. A disabled checkbox stays in the tab order, but pressing <kbd>Space</kbd> doesn't change it.</p>
<p><code>&lt;auro-checkbox-group&gt;</code> doesn't currently support arrow key navigation.</p>
<auro-header level="2" id="keyEvents">Key events</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/keyEvents.md) -->
<!-- The below content is automatically added from ./../docs/partials/keyEvents.md -->
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
<td>Checkbox element</td>
<td>
              Toggles the <code>checked</code> state. Calls <code>preventDefault()</code> to block page scroll.
</td>
</tr>
</tbody>
</table>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
</div>
</div>

<auro-header level="1" id="overview">Form - Keyboard Behavior</auro-header>
<div class="contentWrapper">
<div class="mainContent">
<div class="scrollWrapper">
<auro-header level="2" id="tabBehavior">Tab Behavior</auro-header>
<p>The <code>&lt;auro-form&gt;</code> component is a container element that does not participate in the <code>tabindex</code> sequence itself. The form elements it wraps (e.g., <code>&lt;auro-input&gt;</code>, <code>&lt;auro-select&gt;</code>, <code>&lt;auro-datepicker&gt;</code>) each participate independently in the browser's default <code>tabindex</code> sequence.</p>
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
<td>Enter</td>
<td>-</td>
<td>Focus on a form element (not a textarea)</td>
<td>Any tracked form element (input, select, datepicker, etc.)</td>
<td>
Prevents default behavior and calls <code>submit()</code> on the form. Validates all elements and dispatches the <code>submit</code> event if the form is valid.
</td>
</tr>
</tbody>
</table>
<div class="note">
<p><strong>Note:</strong> The <code>Enter</code> key handler is skipped for <code>&lt;textarea&gt;</code> elements and elements with a <code>textarea</code> attribute to allow normal newline entry.</p>
</div>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
</div>
</div>

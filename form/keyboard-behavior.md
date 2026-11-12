<auro-header level="1" id="overview">Form: Keyboard behavior</auro-header>
<div class="contentWrapper">
<div class="mainContent">
<div class="scrollWrapper">
<auro-header level="2" id="tabBehavior">Tab behavior</auro-header>
<p>The <code>&lt;auro-form&gt;</code> component is a container that keyboard users don't tab to. Keyboard users reach each form element it wraps, such as <code>&lt;auro-input&gt;</code>, <code>&lt;auro-select&gt;</code>, and <code>&lt;auro-datepicker&gt;</code>, in the normal tab order.</p>
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
<td>Enter</td>
<td>-</td>
<td>Focus is on an enabled form element</td>
<td>Any tracked form element, such as <code>auro-input</code>, <code>auro-select</code>, or <code>auro-datepicker</code></td>
<td>
              Prevents the default behavior and calls <code>submit()</code> on the form, which validates every enabled form element and fires the <code>submit</code> event when none is invalid or required but empty.
</td>
</tr>
</tbody>
</table>
<div class="note">
<p><strong>Note:</strong> Enter doesn't submit the form from a disabled form element, a <code>&lt;textarea&gt;</code> element, or an element with a <code>textarea</code> attribute, so those elements keep their normal Enter behavior, such as starting a new line. Enter also doesn't submit the form while focus is on the clear button in an <code>auro-input</code> or <code>auro-combobox</code>, so Enter clears the field instead.</p>
</div>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
</div>
</div>

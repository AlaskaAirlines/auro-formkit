<auro-header level="2" id="keyboardBehavior">Auro-Dropdown Keyboard Behavior</auro-header>
<auro-header level="3" id="tabBehavior">Tab Behavior</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/tabindex.md) -->
<!-- The below content is automatically added from ./../docs/partials/tabindex.md -->
<p>The trigger is a focusable element and participates in the standard tab order, responding to <code>Tab</code> and <code>Shift+Tab</code> key events per <auro-hyperlink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/tabindex">native browser behavior</auro-hyperlink>, i.e., these keys step through the browser tabindex sequence.</p>
<p>When the component is <code>disabled</code> it is removed from the <code>tabindex</code> sequence. VoiceOver's virtual cursor <em>(swipe navigation)</em> can still encounter the component, but standard keyboard <code>Tab</code> navigation skips it.</p>
<p>When the bib is collapsed, the bib content is excluded from the tab sequence. When <strong>expanded</strong>, focusable elements within the bib content are included in the natural tab order. In fullscreen mode, focus is trapped within the bib, and the tab sequence cycles through the bib content focusable elements until the bib is closed or the viewport no longer meets the fullscreen condition and is rendered as a popover.</p>
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="3" id="keyEvents">Key Events</auro-header>
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

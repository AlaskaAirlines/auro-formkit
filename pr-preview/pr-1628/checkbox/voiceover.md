<auro-header level="1" id="overview">Checkbox: VoiceOver behavior</auro-header>
<p>This page documents the VoiceOver experience when using the <code>&lt;auro-checkbox&gt;</code> component. It covers announcements and gestures for interacting with checkbox groups.</p>
<auro-header level="2" id="voiceOverInteractiveAnnouncements">Interactive announcements</auro-header>
<auro-header level="3" id="voiceOverFocusAnnouncement">Focus</auro-header>
<p>When focus moves to a checkbox, VoiceOver announces the following:</p>
<ol>
<li><strong>Label:</strong> The checkbox label text (default slot content)</li>
<li><strong>State:</strong> <em>"checked"</em> or <em>"unchecked"</em></li>
<li><strong>Role:</strong> <em>"checkbox"</em></li>
<li>
<strong>State hints:</strong>
<table class="compressed body-xs">
<thead>
<tr>
<th>State</th>
<th>What gets announced</th>
</tr>
</thead>
<tbody>
<tr>
<td>Disabled</td>
<td><em>"dimmed"</em></td>
</tr>
<tr>
<td>Invalid</td>
<td><em>"invalid data"</em></td>
</tr>
</tbody>
</table>
</li>
</ol>
<auro-header level="3" id="voiceOverGroupContext">Group context</auro-header>
<p>When entering a checkbox group, VoiceOver announces the legend text followed by <em>"group"</em> to provide context for the set of related checkboxes.</p>
<auro-header level="3" id="voiceOverToggle">Toggle announcement</auro-header>
<p>When the user toggles a checkbox via <kbd>Space</kbd> or double-tap, VoiceOver announces the new state: <em>"checked"</em> or <em>"unchecked"</em>.</p>
<auro-header level="3" id="voiceOverNavigation">Navigation</auro-header>
<p>Each checkbox is an independent tab stop. Users navigate between checkboxes using <kbd>Tab</kbd> / <kbd>Shift+Tab</kbd> or VoiceOver's swipe gestures. The group doesn't currently support arrow key navigation.</p>

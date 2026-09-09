<auro-header level="1" id="overview">Radio - VoiceOver Behavior</auro-header>
<p>This page documents the VoiceOver experience when using the <code>&lt;auro-radio&gt;</code> component. It covers announcements and gestures for interacting with radio groups.</p>
<auro-header level="2" id="voiceOverInteractiveAnnouncements">Interactive Announcements</auro-header>
<auro-header level="3" id="voiceOverFocusAnnouncement">Focus</auro-header>
<p>When focus moves to a radio button the following is announced:</p>
<ol>
<li><strong>Label:</strong> The radio button label text</li>
<li><strong>State:</strong> <em>"selected"</em> or <em>"unselected"</em></li>
<li><strong>Role:</strong> <em>"radio button"</em></li>
<li><strong>Position:</strong> e.g. <em>"1 of 3"</em></li>
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
<auro-header level="3" id="voiceOverGroupContext">Group Context</auro-header>
<p>When navigating into a radio group, VoiceOver announces the legend text, providing group context. The group is identified as a <em>"group"</em> via the native <code>&lt;fieldset&gt;</code> element.</p>
<auro-header level="3" id="voiceOverSelection">Selection</auro-header>
<p>When a radio button is selected (via Space or arrow keys), VoiceOver announces:</p>
<ol>
<li><strong>Label</strong> of the newly selected radio</li>
<li><em>"selected, radio button"</em></li>
<li><strong>Position:</strong> e.g. <em>"2 of 3"</em></li>
</ol>
<auro-header level="3" id="voiceOverNavigation">Navigation</auro-header>
<p>Within a radio group, arrow keys move focus and selection simultaneously. VoiceOver announces each radio button as it becomes focused and selected.</p>

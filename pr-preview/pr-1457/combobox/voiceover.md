<auro-header level="1" id="overview">Combobox - VoiceOver Behavior</auro-header>
<p>This page documents the VoiceOver experience when using the <code>&lt;auro-combobox&gt;</code> component. It covers announcements, gestures, and workflows for both large and small viewports.</p>
<auro-header level="2" id="voiceOverInteractiveAnnouncements">Interactive Announcements</auro-header>
<auro-header level="3" id="voiceOverFocusAnnouncement">Focus</auro-header>
<p>When focus is given to the component trigger the following is announced:</p>
<ol>
<li><strong>Label:</strong> <code>label</code> slot content</li>
<li><strong>Current value:</strong> [current value or <em>"no selection"</em>]</li>
<li><strong>Role:</strong> <em>"combo box"</em></li>
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
<td>Expanded</td>
<td><em>"collapsed"</em> or <em>"expanded"</em></td>
</tr>
<tr>
<td>Required</td>
<td><em>"required"</em></td>
</tr>
<tr>
<td>Invalid</td>
<td><em>"invalid data"</em></td>
</tr>
<tr>
<td>Disabled</td>
<td><em>"dimmed"</em></td>
</tr>
<tr>
<td>autocomplete</td>
<td><em>"has auto complete"</em></td>
</tr>
</tbody>
</table>
</li>
<li><strong>Additional description:</strong> <code>helptext</code> slot content if present (after a brief pause)</li>
</ol>
<auro-header level="3" id="voiceOverNavigateAnnouncement">Navigating Options</auro-header>
<p>Announces each option <em>"[option label], [<em>"selected"</em> if <code>selected</code>], [<em>"dimmed"</em> if <code>disabled</code>]"</em> as you move.</p>
<p>3 finger swipe gesture may be used to scroll the option list.</p>
<auro-header level="3" id="voiceOverCloseGesture">Close Gesture</auro-header>
<p>The component may be <strong>closed</strong> | <strong>collapsed</strong> using a gesture.</p>
<ul>
<li><strong>iOS VoiceOver:</strong> The two-finger <em>"scrub"</em> (zigzag / a <em>"Z"</em> shape) gesture acts as the <em>'Escape'</em> key, commonly used to dismiss modal views.</li>
<li>
<strong>Android TalkBack:</strong> users typically swipe down then left (an <em>"L"</em> gesture) or use the back gesture to go back/close.<br />
<div class="note">
<strong>How to Perform Android back/close gesture:</strong> Swipe inwards from either the left or right edge of the screen, typically from the middle-edge, to go to the previous screen.
</div>
</li>
</ul>
<auro-header level="3" id="voiceOverCollapseAnnouncement">Closed | Collapsed Announcements</auro-header>
<p>When the component is <strong>closed</strong> | <strong>collapsed</strong> announces the <strong>expanded</strong> state change.</p>
<auro-header level="2" id="voiceOverLargeVPAnnouncements">Large Viewport Workflow</auro-header>
<p>Examples: large tablet, typical size or larger desktop browser window</p>
<ol>
<li><strong>Focus</strong></li>
<li>
<strong>Open | Expand:</strong> When the component is <strong>opened</strong> | <strong>expanded</strong> announces the active option <em>"[option label], ['selected' if <code>selected</code>]"</em>.
<div class="note">
<strong>Note:</strong> <code>disabled</code> options can not be <strong>active</strong>, this state would never be included in this announcement.
</div>
</li>
<li><strong>Navigate options</strong></li>
<li>
<strong>Select an option:</strong> Collapses the list, announces the <strong>expanded</strong> state change.
<p>~OR~</p>
<strong>Close | Collapse without selecting an option:</strong> Collapses the list, announces the <strong>expanded</strong> state change.
</li>
</ol>
<auro-header level="2" id="voiceOverSmallVPAnnouncements">Small Viewport Workflow</auro-header>
<p>Examples: mobile phone, very small desktop browser window</p>
<ol>
<li><strong>Focus</strong></li>
<li>
<strong>Open | Expand:</strong> Focus is moved to the fullscreen modal dialog <strong>Close</strong> button, announces the active option <em>"[option label], [<em>'selected'</em> if <code>selected</code>]"</em>.
<div class="note">
<strong>Note:</strong> <code>disabled</code> options can not be <strong>active</strong>, this state would never be included in this announcement.
</div>
</li>
<li><strong>Navigate options</strong></li>
<li>
<strong>Select option:</strong> Closes the fullscreen modal dialog, announces the <strong>expanded</strong> state change.
<p>~OR~</p>
<strong>Close | Collapse without selecting an option:</strong> Closes the fullscreen modal dialog, announces the <strong>expanded</strong> state change.
</li>
</ol>
<p>Key characteristics across both platforms:</p>
<ul>
<li>The <code>label</code> is always read first.</li>
<li>The component <strong>role</strong> is announced as <em>"combo box"</em>.</li>
<li><code>disabled</code> options are announced as <em>"dimmed"</em> and cannot be selected.</li>
</ul>
<auro-header level="2" id="voiceOverStates">Impact of State</auro-header>
<auro-header level="3" id="voiceOverStateDisabled">Disabled</auro-header>
<p>What VoiceOver does:</p>
<ul>
<li>Focuses the element and announces it (e.g., <em>"[label], dimmed, combo box"</em> on macOS / <em>"[label], dimmed"</em> on iOS).</li>
<li>The word <strong>"dimmed"</strong> is VoiceOver's way of indicating disabled.</li>
<li>The element remains in the focus order (Tab still reaches it).</li>
<li>The user cannot interact with it — the option list can not be expanded, and no selection can be made.</li>
</ul>
<p>Key distinction from <code>aria-hidden</code>: A disabled element is <em>reachable but not operable</em>. If you want VoiceOver to skip it entirely, you would need <code>aria-hidden="true"</code> or <code>tabindex="-1"</code>, but that is generally not recommended for disabled controls — users benefit from knowing the field exists and why it may be unavailable.</p>
<p>This is consistent across NVDA and JAWS as well, though the announcement wording differs (e.g., NVDA says <em>"unavailable"</em>).</p>
<auro-header level="3" id="voiceOverStateInvalid">Invalid</auro-header>
<p>When an <code>&lt;auro-combobox&gt;</code> is invalid the following occurs:</p>
<ul>
<li><code>Focus</code> — VoiceOver announces <em>"invalid data"</em> (macOS) or <em>"invalid entry"</em> (iOS) after the element's label.</li>
<li>The Help Text will render the error message and it will be included in the VoiceOver focus announcement.</li>
</ul>
<p>Example: when focusing on an invalid <code>&lt;auro-combobox&gt;</code> the VoiceOver announces something like <em>"Destination, invalid data, combo box, Please select a destination"</em>.</p>

<auro-header level="1" id="overview">Dropdown: VoiceOver behavior</auro-header>
<p>This page documents the VoiceOver experience when using the <code>&lt;auro-dropdown&gt;</code> component. It covers announcements, gestures, and workflows for both large and small viewports.</p>
<auro-header level="2" id="voiceOverInteractiveAnnouncements">Interactive announcements</auro-header>
<auro-header level="3" id="voiceOverFocusAnnouncement">Focus</auro-header>
<p>When focus moves to the trigger, VoiceOver announces:</p>
<ol>
<li><strong>Label:</strong> The text content of the <code>trigger</code> slot</li>
<li><strong>Role:</strong> <em>"button"</em> or <em>"pop-up button"</em></li>
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
<td><em>"collapsed"</em> or <em>"expanded"</em>, only when <code>a11yRole</code> isn't <code>button</code></td>
</tr>
<tr>
<td>Disabled</td>
<td><em>"dimmed"</em></td>
</tr>
</tbody>
</table>
</li>
<li><strong>Additional description:</strong> None. The dropdown doesn't currently connect the <code>helpText</code> slot content to the trigger, so VoiceOver doesn't announce it on focus.</li>
</ol>
<auro-header level="3" id="voiceOverExpandAnnouncement">Expand and collapse</auro-header>
<p>When <code>a11yRole</code> isn't <code>button</code>, VoiceOver announces the state change when the dropdown expands or collapses.</p>
<auro-header level="3" id="voiceOverCloseGesture">Close gesture</auro-header>
<p>People can also <strong>close</strong> the dropdown with a gesture:</p>
<ul>
<li><strong>iOS VoiceOver:</strong> The two-finger <em>scrub</em> gesture, a <em>"Z"</em> shape, acts as the <code>Escape</code> key.</li>
<li><strong>Android TalkBack:</strong> Swipe down then left (an <em>"L"</em> gesture) or use the back gesture.</li>
</ul>
<auro-header level="2" id="voiceOverLargeVPWorkflow">Large viewport workflow</auro-header>
<p>For example, a large tablet or a desktop browser window.</p>
<ol>
<li><strong>Focus trigger:</strong> Announces the trigger label and state.</li>
<li><strong>Open | Expand:</strong> Activating the trigger opens the dropdown bib; focus moves to the first focusable element within the bib.</li>
<li><strong>Navigate bib content:</strong> Tab through focusable elements within the bib.</li>
<li><strong>Close | Collapse:</strong> Pressing Escape or clicking outside collapses the dropdown.</li>
</ol>
<auro-header level="2" id="voiceOverSmallVPWorkflow">Small viewport workflow</auro-header>
<p>For example, a mobile phone or a very small desktop browser window.</p>
<ol>
<li><strong>Focus trigger:</strong> Announces the trigger label and state.</li>
<li><strong>Open | Expand:</strong> Opens a fullscreen modal and keeps focus in the bib content.</li>
<li><strong>Navigate bib content:</strong> Swipe or Tab through focusable elements.</li>
<li><strong>Close:</strong> Activate a close button in the bib content, such as the one <code>auro-bibtemplate</code> provides, or use the scrub gesture (two-finger zigzag) to dismiss.</li>
</ol>
<auro-header level="2" id="voiceOverStates">Impact of state</auro-header>
<auro-header level="3" id="voiceOverStateDisabled">Disabled</auro-header>
<p><strong>What VoiceOver does:</strong></p>
<ul>
<li>Focuses the element and announces it with <strong>"dimmed"</strong>, indicating the control is disabled.</li>
<li>The element remains in the focus order but can't be operated.</li>
<li>The dropdown can't be opened.</li>
</ul>

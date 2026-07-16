<auro-header level="1" id="overview">Dropdown - VoiceOver Behavior</auro-header>
<p>This page documents the VoiceOver experience when using the <code>&lt;auro-dropdown&gt;</code> component. It covers announcements, gestures, and workflows for both large and small viewports.</p>
<auro-header level="2" id="voiceOverInteractiveAnnouncements">Interactive Announcements</auro-header>
<auro-header level="3" id="voiceOverFocusAnnouncement">Focus</auro-header>
<p>When focus moves to the trigger the following is announced:</p>
<ol>
<li><strong>Label:</strong> The trigger content or <code>aria-label</code> value</li>
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
<td><em>"collapsed"</em> or <em>"expanded"</em></td>
</tr>
<tr>
<td>Disabled</td>
<td><em>"dimmed"</em></td>
</tr>
</tbody>
</table>
</li>
<li><strong>Additional description:</strong> <code>helpText</code> slot content if present</li>
</ol>
<auro-header level="3" id="voiceOverExpandAnnouncement">Expand / Collapse</auro-header>
<p>When the dropdown is expanded or collapsed, VoiceOver announces the state change.</p>
<auro-header level="3" id="voiceOverCloseGesture">Close Gesture</auro-header>
<p>The dropdown may be <strong>closed</strong> | <strong>collapsed</strong> using a gesture.</p>
<ul>
<li><strong>iOS VoiceOver:</strong> The two-finger <em>"scrub"</em> (zigzag / a <em>"Z"</em> shape) gesture acts as the <em>'Escape'</em> key.</li>
<li><strong>Android TalkBack:</strong> Swipe down then left (an <em>"L"</em> gesture) or use the back gesture.</li>
</ul>
<auro-header level="2" id="voiceOverLargeVPWorkflow">Large Viewport Workflow</auro-header>
<p>Examples: large tablet, typical size or larger desktop browser window</p>
<ol>
<li><strong>Focus trigger:</strong> Announces the trigger label and state</li>
<li><strong>Open | Expand:</strong> Activating the trigger opens the dropdown bib; focus moves to the first focusable element within the bib</li>
<li><strong>Navigate bib content:</strong> Tab through focusable elements within the bib</li>
<li><strong>Close | Collapse:</strong> Pressing Escape or clicking outside collapses the dropdown</li>
</ol>
<auro-header level="2" id="voiceOverSmallVPWorkflow">Small Viewport Workflow</auro-header>
<p>Examples: mobile phone, very small desktop browser window</p>
<ol>
<li><strong>Focus trigger:</strong> Announces the trigger label and state</li>
<li><strong>Open | Expand:</strong> Opens a fullscreen modal; focus is trapped within the bib content</li>
<li><strong>Navigate bib content:</strong> Swipe or Tab through focusable elements</li>
<li><strong>Close:</strong> Activate the close button or use the scrub gesture (two-finger zigzag) to dismiss</li>
</ol>
<auro-header level="2" id="voiceOverStates">Impact of State</auro-header>
<auro-header level="3" id="voiceOverStateDisabled">Disabled</auro-header>
<p><strong>What VoiceOver does:</strong></p>
<ul>
<li>Focuses the element and announces it with <strong>"dimmed"</strong>, indicating the control is disabled.</li>
<li>The element remains in the focus order but cannot be operated.</li>
<li>The dropdown cannot be opened.</li>
</ul>

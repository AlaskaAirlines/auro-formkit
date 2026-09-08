<auro-header level="1" id="overview">Counter - VoiceOver Behavior</auro-header>
<p>This page documents the VoiceOver experience when using the <code>&lt;auro-counter&gt;</code> component. It covers announcements and gestures for interacting with standalone counters, counter groups, and dropdown counter groups.</p>
<auro-header level="2" id="voiceOverInteractiveAnnouncements">Interactive Announcements</auro-header>
<auro-header level="3" id="voiceOverFocusAnnouncement">Focus</auro-header>
<p>When focus moves to a counter's spinbutton the following is announced:</p>
<ol>
<li><strong>Label:</strong> The counter label text (from the default slot)</li>
<li><strong>Role:</strong> <em>"incrementable"</em> or <em>"stepper"</em> (spinbutton)</li>
<li><strong>Current value:</strong> The current numeric value</li>
<li><strong>Range:</strong> <em>"from [min] to [max]"</em> when min/max are set</li>
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
<auro-header level="3" id="voiceOverButtonAnnouncement">Increment / Decrement Buttons</auro-header>
<p>When focus moves to a counter button the following is announced:</p>
<ol>
<li><strong>Label:</strong> The button's accessible label (e.g. <em>"decrease [counter label]"</em> or <em>"increase [counter label]"</em>)</li>
<li><strong>Role:</strong> <em>"button"</em></li>
<li><strong>State:</strong> <em>"dimmed"</em> when the counter is at its min or max boundary</li>
</ol>
<p>Custom button labels can be provided using the <code>ariaLabel.minus</code> and <code>ariaLabel.plus</code> slots.</p>
<auro-header level="3" id="voiceOverValueChange">Value Change</auro-header>
<p>When the counter value changes (via button activation or arrow keys), VoiceOver announces the updated value through the <code>aria-valuenow</code> attribute on the spinbutton.</p>
<auro-header level="2" id="voiceOverStandaloneWorkflow">Standalone Counter Workflow</auro-header>
<ol>
<li><strong>Focus decrement button:</strong> Announces button label and state</li>
<li><strong>Focus spinbutton:</strong> Announces label, value, and range</li>
<li><strong>Focus increment button:</strong> Announces button label and state</li>
<li><strong>Interact:</strong> Activate buttons or use arrow keys to change the value</li>
</ol>
<auro-header level="2" id="voiceOverDropdownWorkflow">Dropdown Counter Workflow</auro-header>
<auro-header level="3" id="voiceOverDropdownLargeVP">Large Viewport</auro-header>
<p>Examples: large tablet, typical size or larger desktop browser window</p>
<ol>
<li><strong>Focus trigger:</strong> Announces the label and current summary value</li>
<li><strong>Open | Expand:</strong> Activating the trigger expands the dropdown bib containing the counters</li>
<li><strong>Navigate counters:</strong> Tab through individual counter controls within the bib</li>
<li><strong>Close | Collapse:</strong> Pressing Escape collapses the dropdown</li>
</ol>
<auro-header level="3" id="voiceOverDropdownSmallVP">Small Viewport</auro-header>
<p>Examples: mobile phone, very small desktop browser window</p>
<ol>
<li><strong>Focus trigger:</strong> Announces the label and current summary value</li>
<li><strong>Open | Expand:</strong> Opens a fullscreen modal dialog; focus moves to the close button</li>
<li><strong>Navigate counters:</strong> Swipe or Tab through individual counter controls</li>
<li><strong>Close:</strong> Activate the close button or use the scrub gesture (two-finger zigzag) to dismiss</li>
</ol>
<auro-header level="2" id="voiceOverStates">Impact of State</auro-header>
<auro-header level="3" id="voiceOverStateDisabled">Disabled</auro-header>
<p><strong>What VoiceOver does:</strong></p>
<ul>
<li>Focuses the element and announces it with <strong>"dimmed"</strong>, indicating the control is disabled.</li>
<li>The element remains in the focus order but cannot be operated.</li>
<li>Increment and decrement buttons are also announced as <em>"dimmed"</em> and cannot be activated.</li>
</ul>
<auro-header level="3" id="voiceOverStateBoundary">Min/Max Boundary</auro-header>
<p>When the counter reaches its minimum or maximum value:</p>
<ul>
<li>The corresponding button (decrement at min, increment at max) is announced as <em>"dimmed"</em>.</li>
<li>The button cannot be activated, preventing the value from going out of range.</li>
</ul>

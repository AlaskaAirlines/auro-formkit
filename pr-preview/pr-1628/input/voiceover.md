<auro-header level="1" id="overview">Input: VoiceOver behavior</auro-header>
<p>This page documents the VoiceOver experience when using the <code>&lt;auro-input&gt;</code> component. It covers announcements, focus behavior, and how different states affect the screen reader experience.</p>
<auro-header level="2" id="voiceOverInteractiveAnnouncements">Interactive announcements</auro-header>
<auro-header level="3" id="voiceOverFocusAnnouncement">Focus</auro-header>
<p>When the input gets focus, VoiceOver announces the following:</p>
<ol>
<li><strong>Label:</strong> <code>label</code> slot content</li>
<li><strong>Current value:</strong> [current value if present]</li>
<li><strong>Role:</strong> <em>"text field"</em> (or <em>"secure text field"</em> for <code>type="password"</code>)</li>
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
<td>Readonly</td>
<td><em>"read only"</em></td>
</tr>
</tbody>
</table>
</li>
<li><strong>Additional description:</strong> <code>helpText</code> slot content if present (after a brief pause)</li>
</ol>
<auro-header level="3" id="voiceOverClearButton">Clear button</auro-header>
<p>When the clear button is visible (input has a value, isn't <code>disabled</code> or <code>readonly</code>, and the component has focus or is being hovered), it participates in the tab order. When focused, VoiceOver announces the <code>ariaLabel.clear</code> slot content (defaults to <em>"Clear Input"</em>) followed by <em>"button"</em>.</p>
<auro-header level="3" id="voiceOverPasswordToggle">Password toggle button</auro-header>
<p>When <code>type="password"</code> is set, the input has a value, and the component has focus or is being hovered, the show/hide password button is visible in the <code>classic</code> layout. When focused, VoiceOver announces the <code>ariaLabel.password.show</code> or <code>ariaLabel.password.hide</code> slot content followed by <em>"button"</em>.</p>
<auro-header level="3" id="voiceOverValidationAnnouncement">Validation error</auro-header>
<p>When a validation error occurs, the error message is rendered with <code>role="alert"</code> and <code>aria-live="assertive"</code>, causing VoiceOver to immediately announce the error message without requiring the user to move focus.</p>
<auro-header level="2" id="voiceOverStates">Impact of state</auro-header>
<auro-header level="3" id="voiceOverStateDisabled">Disabled</auro-header>
<p>What VoiceOver does:</p>
<ul>
<li>Focuses the element and announces it, for example <em>"[label], dimmed, text field"</em> on macOS / <em>"[label], dimmed"</em> on iOS.</li>
<li>The word <strong>"dimmed"</strong> is VoiceOver's way of indicating disabled.</li>
<li>Tab skips the element, because the inner <code>&lt;input&gt;</code> element is disabled.</li>
<li>The user can't interact with it: they can't enter text, and the clear button isn't shown.</li>
</ul>
<p>Key distinction from <code>aria-hidden</code>: A disabled element is <em>reachable but not operable</em>. If you want VoiceOver to skip it entirely, you would need <code>aria-hidden="true"</code> or <code>tabindex="-1"</code>, but that's generally not recommended for disabled controls, because users benefit from knowing the field exists and why it may be unavailable.</p>
<p>This is consistent across NVDA and JAWS as well, though the announcement wording differs. For example, NVDA says <em>"unavailable"</em>.</p>
<auro-header level="3" id="voiceOverStateInvalid">Invalid</auro-header>
<p>When an <code>&lt;auro-input&gt;</code> is invalid the following occurs:</p>
<ul>
<li><strong>Focus:</strong> VoiceOver announces <em>"invalid data"</em> (macOS) or <em>"invalid entry"</em> (iOS) after the element's label.</li>
<li>The help text shows the error message, and VoiceOver reads it as part of the focus announcement.</li>
</ul>
<p>Example: when focusing on an invalid <code>&lt;auro-input&gt;</code> the VoiceOver announces something like <em>"Full name, invalid data, text field, required, Please fill in this field"</em>.</p>
<auro-header level="3" id="voiceOverStateReadonly">Readonly</auro-header>
<p>When <code>readonly</code> is set:</p>
<ul>
<li>The input is focusable and VoiceOver announces <em>"read only"</em> as part of the element description.</li>
<li>The user can navigate to the field but can't modify its value.</li>
</ul>

<auro-header level="1" id="overview">Datepicker - VoiceOver Behavior</auro-header>
<p>This page documents the VoiceOver experience when using the <code>&lt;auro-datepicker&gt;</code> component. It covers announcements, gestures, and workflows for both large and small viewports.</p>
<auro-header level="2" id="voiceOverInteractiveAnnouncements">Interactive Announcements</auro-header>
<auro-header level="3" id="voiceOverFocusAnnouncement">Focus</auro-header>
<p>When focus is given to the datepicker trigger input the following is announced:</p>
<ol>
<li><strong>Label:</strong> <code>fromLabel</code> slot content (e.g. <em>"Choose a date"</em>)</li>
<li><strong>Current value:</strong> [current date value or empty]</li>
<li><strong>Role:</strong> <em>"text field"</em></li>
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
</tbody>
</table>
</li>
<li><strong>Additional description:</strong> <code>helptext</code> slot content if present (after a brief pause)</li>
</ol>
<auro-header level="3" id="voiceOverClearButton">Clear Button</auro-header>
<p>When the clear button is focused, VoiceOver announces the <code>aria-label</code> from the <code>ariaLabel.input.clear</code> slot (or the default i18n text), followed by <em>"button"</em>.</p>
<auro-header level="3" id="voiceOverCalendarNavigation">Calendar Navigation</auro-header>
<p>When the calendar bib is open, users can navigate calendar cells using VoiceOver gestures (swipe left/right). Each cell announces:</p>
<ul>
<li>The date (e.g. <em>"January 15, 2026"</em>)</li>
<li>Whether the date is selected or within the selected range</li>
<li>Whether the date is disabled (outside min/max bounds)</li>
</ul>
<auro-header level="3" id="voiceOverCloseGesture">Close Gesture</auro-header>
<p>The calendar bib may be <strong>closed</strong> using a gesture.</p>
<ul>
<li><strong>iOS VoiceOver:</strong> The two-finger <em>"scrub"</em> (zigzag / a <em>"Z"</em> shape) gesture acts as the <em>'Escape'</em> key, commonly used to dismiss modal views.</li>
<li>
<strong>Android TalkBack:</strong> users typically swipe down then left (an <em>"L"</em> gesture) or use the back gesture to go back/close.<br />
<div class="note">
<strong>How to Perform Android back/close gesture:</strong> Swipe inwards from either the left or right edge of the screen, typically from the middle-edge, to go to the previous screen.
</div>
</li>
</ul>
<auro-header level="3" id="voiceOverValidationAnnouncement">Validation Error</auro-header>
<p>When the component is invalid, the error message is rendered with <code>role="alert"</code> and <code>aria-live="assertive"</code>. VoiceOver will immediately announce the error message when it appears.</p>
<auro-header level="2" id="voiceOverLargeVPAnnouncements">Large Viewport Workflow</auro-header>
<p>Examples: large tablet, typical size or larger desktop browser window</p>
<ol>
<li><strong>Focus</strong> — Tab to the datepicker input.</li>
<li><strong>Type a date</strong> — Enter a date value directly or click/tap to open the calendar.</li>
<li><strong>Calendar opens</strong> — The dropdown bib opens with the calendar. Navigate dates with VoiceOver gestures.</li>
<li><strong>Select a date</strong> — Activate a calendar cell to select the date. The calendar closes and the selected date populates the input.</li>
</ol>
<auro-header level="2" id="voiceOverSmallVPAnnouncements">Small Viewport Workflow</auro-header>
<p>Examples: mobile phone, very small desktop browser window</p>
<ol>
<li><strong>Focus</strong> — Tab or swipe to the datepicker input.</li>
<li>
<strong>Open:</strong> Focus is moved to the fullscreen modal dialog <strong>Close</strong> button.
</li>
<li><strong>Navigate dates</strong> — Swipe through calendar cells.</li>
<li>
<strong>Select a date:</strong> Closes the fullscreen modal dialog, the selected date populates the input.
<p>~OR~</p>
<strong>Close without selecting:</strong> Closes the fullscreen modal dialog.
</li>
</ol>
<auro-header level="2" id="voiceOverStates">Impact of State</auro-header>
<auro-header level="3" id="voiceOverStateDisabled">Disabled</auro-header>
<p>What VoiceOver does:</p>
<ul>
<li>Focuses the element and announces it (e.g., <em>"[label], dimmed, text field"</em> on macOS / <em>"[label], dimmed"</em> on iOS).</li>
<li>The word <strong>"dimmed"</strong> is VoiceOver's way of indicating disabled.</li>
<li>The element remains in the focus order (Tab still reaches it).</li>
<li>The user cannot interact with it — the calendar can not be opened, and no date can be entered.</li>
</ul>
<p>Key distinction from <code>aria-hidden</code>: A disabled element is <em>reachable but not operable</em>. If you want VoiceOver to skip it entirely, you would need <code>aria-hidden="true"</code> or <code>tabindex="-1"</code>, but that is generally not recommended for disabled controls — users benefit from knowing the field exists and why it may be unavailable.</p>
<p>This is consistent across NVDA and JAWS as well, though the announcement wording differs (e.g., NVDA says <em>"unavailable"</em>).</p>
<auro-header level="3" id="voiceOverStateInvalid">Invalid</auro-header>
<p>When an <code>&lt;auro-datepicker&gt;</code> is invalid the following occurs:</p>
<ul>
<li><code>Focus</code> — VoiceOver announces <em>"invalid data"</em> (macOS) or <em>"invalid entry"</em> (iOS) after the element's label.</li>
<li>The Help Text will render the error message and it will be included in the VoiceOver focus announcement.</li>
</ul>
<p>Example: when focusing on an invalid <code>&lt;auro-datepicker&gt;</code> the VoiceOver announces something like <em>"Choose a date, invalid data, text field, Please select a valid date"</em>.</p>

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
<p>When the calendar bib is open, users can navigate calendar cells using VoiceOver gestures (swipe left/right) or arrow keys. Each cell announces:</p>
<ul>
<li>The full localized date (e.g. <em>"Thursday, May 14, 2026"</em>)</li>
<li>Range position when in range mode (e.g. <em>", range start"</em>, <em>", in range"</em>, <em>", before range"</em>)</li>
<li><em>", unavailable"</em> for blackout dates (dates within the min/max range that are explicitly disabled)</li>
<li><em>"current date"</em> for today's date (via <code>aria-current="date"</code>)</li>
<li>Selection state: <em>"selected"</em> or not (via <code>aria-selected</code>)</li>
</ul>
<p>Out-of-range cells (outside min/max bounds) are completely hidden from VoiceOver with <code>aria-hidden="true"</code>.</p>
<auro-header level="3" id="voiceOverDateSelection">Date Selection</auro-header>
<p>When a date is selected, an <code>aria-live="assertive"</code> region announces the selected date (e.g. <em>"Thursday, May 14, 2026"</em>). For range datepickers, both the start and end selections are announced.</p>
<auro-header level="3" id="voiceOverDialogName">Dialog Name</auro-header>
<p>The calendar dialog receives its accessible name from the <code>fromLabel</code> slot content. VoiceOver announces the dialog as e.g. <em>"Departure date, dialog"</em> when it opens.</p>
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
<li><strong>Type a date</strong> — Enter a date value directly, or press Enter/Space to open the calendar.</li>
<li><strong>Calendar opens</strong> — Focus moves to the active date cell inside the calendar grid. Navigate dates with VoiceOver gestures (swipe) or arrow keys.</li>
<li><strong>Select a date</strong> — Activate a calendar cell (double-tap with VoiceOver, or Enter/Space with keyboard) to select the date. The selected date is announced via a live region and populates the input. The calendar remains open; close it by pressing Escape or activating the Done button.</li>
</ol>
<auro-header level="2" id="voiceOverSmallVPAnnouncements">Small Viewport Workflow</auro-header>
<p>Examples: mobile phone, very small desktop browser window</p>
<ol>
<li><strong>Focus</strong> — Tab or swipe to the datepicker input.</li>
<li>
<strong>Open:</strong> The fullscreen modal dialog opens. VoiceOver announces the dialog name (e.g. <em>"Departure date, dialog"</em>). Focus is moved to the active date cell inside the calendar grid.
</li>
<li><strong>Navigate dates</strong> — Swipe through calendar cells or use arrow keys.</li>
<li>
<strong>Select a date:</strong> The selected date is announced via a live region and populates the input. The fullscreen modal remains open so additional dates can be reviewed.
<p>~OR~</p>
<strong>Close:</strong> Activate the close button, press Escape, or use the VoiceOver scrub gesture to close the fullscreen modal dialog.
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

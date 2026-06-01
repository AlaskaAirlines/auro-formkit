<auro-header level="1" id="overview">Datepicker - Keyboard Behavior</auro-header>
<div class="contentWrapper">
<div class="mainContent">
<div class="scrollWrapper">
<auro-header level="2" id="tabBehavior">Tab Behavior</auro-header>
<p>The component trigger contains <code>&lt;auro-input&gt;</code> element(s) which each have two focusable elements:</p>
<ol>
<li><strong>Input</strong></li>
<li><strong>Clear button:</strong> only shown when the input has a value.</li>
</ol>
<p>Each focusable element <em>(when shown)</em> participates in the browser window's default <code>tabindex</code> sequence.</p>
<p>When the component is <code>disabled</code> it is removed from the <code>tabindex</code> sequence. VoiceOver's virtual cursor <em>(swipe navigation)</em> can still encounter the component, but standard keyboard <code>Tab</code> navigation skips it.</p>
<div class="note">
<p><strong>Note:</strong> The datepicker supports full interaction via touch, click, VoiceOver, and keyboard. The trigger input accepts typed dates, and the calendar bib supports arrow-key navigation between date cells, Enter/Space to select, and Escape to close.</p>
</div>
<auro-header level="3" id="keyEventsCounterGroup">Key Events</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/keyEvents.md) -->
<!-- The below content is automatically added from ./../docs/partials/keyEvents.md -->
<auro-header level="3" id="keyEvents-trigger">Trigger input</auro-header>
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
<td>Enter</td>
<td>-</td>
<td>Collapsed</td>
<td>Trigger input, <strong>NOT</strong> the input clear button</td>
<td>Opens the calendar bib. Focus moves to the active date cell inside the calendar grid. The Enter key behavior overrides the inherited <code>auro-dropdown</code> key behavior outlined below.</td>
</tr>
<tr>
<td>Space</td>
<td>-</td>
<td>Collapsed</td>
<td>Trigger input, <strong>NOT</strong> the input clear button</td>
<td>Opens the calendar bib. Focus moves to the active date cell inside the calendar grid. The Space key behavior overrides the inherited <code>auro-dropdown</code> key behavior outlined below.</td>
</tr>
</tbody>
</table>
<auro-header level="3" id="keyEvents-calendar">Calendar</auro-header>
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
<td rowspan="3">Enter</td>
<td rowspan="3">-</td>
<td rowspan="3">Expanded</td>
<td>Previous Month Button</td>
<td>Re-renders the calendar to show the previous month</td>
</tr>
<tr>
<td>Next Month Button</td>
<td>Re-renders the calendar to show the next month</td>
</tr>
<tr>
<td>Done button</td>
<td>Collapses the bib.</td>
</tr>
<tr>
<td rowspan="3">Space</td>
<td rowspan="3">-</td>
<td rowspan="3">Expanded</td>
<td>Previous Month Button</td>
<td>Re-renders the calendar to show the previous month</td>
</tr>
<tr>
<td>Next Month Button</td>
<td>Re-renders the calendar to show the next month</td>
</tr>
<tr>
<td>Done button</td>
<td>Collapses the bib.</td>
</tr>
</tbody>
</table>
<auro-header level="3" id="keyEvents-calendarGrid">Calendar grid</auro-header>
<p>When the calendar bib is open, one date cell is the <em>active</em> cell (roving <code>tabindex="0"</code>). All other cells have <code>tabindex="-1"</code>. Arrow keys move the active cell without wrapping — when a boundary is reached the calendar navigates to the adjacent month.</p>
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
<td>ArrowRight</td>
<td>-</td>
<td>Expanded</td>
<td>Any date cell</td>
<td>Moves focus to the next day. If at the end of the month, navigates to the first focusable day of the next month.</td>
</tr>
<tr>
<td>ArrowLeft</td>
<td>-</td>
<td>Expanded</td>
<td>Any date cell</td>
<td>Moves focus to the previous day. If at the start of the month, navigates to the last focusable day of the previous month.</td>
</tr>
<tr>
<td>ArrowDown</td>
<td>-</td>
<td>Expanded</td>
<td>Any date cell</td>
<td>Moves focus to the same day of the week in the next week (+7 days). Navigates to the next month if needed.</td>
</tr>
<tr>
<td>ArrowUp</td>
<td>-</td>
<td>Expanded</td>
<td>Any date cell</td>
<td>Moves focus to the same day of the week in the previous week (−7 days). Navigates to the previous month if needed.</td>
</tr>
<tr>
<td>Enter / Space</td>
<td>-</td>
<td>Expanded</td>
<td>Any date cell</td>
<td>Selects the focused date. Blackout dates receive focus but cannot be selected.</td>
</tr>
<tr>
<td>Escape</td>
<td>-</td>
<td>Expanded</td>
<td>Any date cell</td>
<td>Closes the calendar bib and returns focus to the trigger input.</td>
</tr>
<tr>
<td>Tab</td>
<td>-</td>
<td>Expanded</td>
<td>Any date cell</td>
<td>Moves focus to the next focusable element outside the calendar grid (e.g., month navigation buttons or the close button in fullscreen mode).</td>
</tr>
</tbody>
</table>
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="4" id="keyEventsDropdown">Key Events inherited from Auro-Dropdown</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../dropdown/docs/partials/keyEvents.md) -->
<!-- The below content is automatically added from ./../../dropdown/docs/partials/keyEvents.md -->
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
</div>
</div>
</div>

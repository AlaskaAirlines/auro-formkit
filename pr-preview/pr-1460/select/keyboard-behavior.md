<auro-header level="1" id="overview">Select - Keyboard Behavior</auro-header>
<div class="contentWrapper">
<nav>
<auro-nav anchorNavContent=".scrollWrapper">
<!-- <span slot="label">Anchor Navigation</span> -->
<span slot="mobileToggleCollapsed">View More</span>
<span slot="mobileToggleExpanded">View Less</span>
<auro-anchorlink fluid href="#tabBehavior">Tab Behavior</auro-anchorlink>
<auro-anchorlink fluid href="#keyEvents">Key Events</auro-anchorlink>
</auro-nav>
</nav>
<div class="mainContent">
<div class="scrollWrapper">
<auro-header level="2" id="tabBehavior">Tab Behavior</auro-header>
<p>The <code>&lt;auro-select></code> component inherits the default tabindex behavior of <code>&lt;auro-dropdown></code> with no modifications.</p>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../dropdown/docs/partials/tabindex.md) -->
<!-- The below content is automatically added from ./../../dropdown/docs/partials/tabindex.md -->
<p>The trigger is a focusable element and participates in the standard tab order, responding to <code>Tab</code> and <code>Shift+Tab</code> key events per <auro-hyperlink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/tabindex">native browser behavior</auro-hyperlink>, i.e., these keys step through the browser tabindex sequence.</p>
<p>When the component is <code>disabled</code> it is removed from the <code>tabindex</code> sequence. VoiceOver's virtual cursor <em>(swipe navigation)</em> can still encounter the component, but standard keyboard <code>Tab</code> navigation skips it.</p>
<p>When the bib is collapsed, the bib content is excluded from the tab sequence. When <strong>expanded</strong>, focusable elements within the bib content are included in the natural tab order. In fullscreen mode, focus is trapped within the bib, and the tab sequence cycles through the bib content focusable elements until the bib is closed or the viewport no longer meets the fullscreen condition and is rendered as a popover.</p>
<!-- AURO-GENERATED-CONTENT:END -->
<p>There are no focusable elements inside the <code>&lt;auro-select></code> bib content.</p>
<div class="note">
<strong>Note:</strong> The following HTML5 select element keyboard behavior is unsupported in <code>&lt;auro-select multiSelect></code>:
<ul>
<li><strong>Extending selection (Shift+Arrow)</strong></li>
<li><strong>Select all (Cmd+A):</strong> Select all options</li>
</ul>
</div>
<auro-header level="2" id="keyEvents">Key Events</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/keyboard-behavior/keyEvents.md) -->
<!-- The below content is automatically added from ./../docs/partials/keyboard-behavior/keyEvents.md -->
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
<td rowspan="6">ArrowDown</td>
<td rowspan="2">-</td>
<td>Collapsed</td>
<td>Trigger element</td>
<td>Opens the bib.</td>
</tr>
<tr>
<td>Expanded</td>
<td>Trigger element</td>
<td>
Advances the <code>focused</code> option to the next enabled option in the list. If the current <code>focused</code> option is the last enabled option, selection wraps to the first enabled option.
</td>
</tr>
<tr>
<td rowspan="2">Command</td>
<td>Collapsed</td>
<td>Trigger element</td>
<td>Opens the bib.</td>
</tr>
<tr>
<td>Expanded</td>
<td>Trigger element</td>
<td>
Advances the <code>focused</code> option to the last enabled option in the list.
</td>
</tr>
<tr>
<td rowspan="2">Option</td>
<td>Collapsed</td>
<td>Trigger element</td>
<td>Opens the bib.</td>
</tr>
<tr>
<td>Expanded</td>
<td>Trigger element</td>
<td>
Advances the <code>focused</code> option to the last enabled option in the list.
</td>
</tr>
<tr>
<td rowspan="6">ArrowUp</td>
<td rowspan="2">-</td>
<td>Collapsed</td>
<td>Trigger element</td>
<td>Opens the bib.</td>
</tr>
<tr>
<td>Expanded</td>
<td>Trigger element</td>
<td>
Advances the <code>focused</code> option to the previous enabled option in the list. If the current <code>focused</code> option is the first enabled option, selection wraps to the last enabled option.
</td>
</tr>
<tr>
<td rowspan="2">Command</td>
<td>Collapsed</td>
<td>Trigger element</td>
<td>Opens the bib.</td>
</tr>
<tr>
<td>Expanded</td>
<td>Trigger element</td>
<td>
Advances the <code>focused</code> option to the first enabled option in the list.
</td>
</tr>
<tr>
<td rowspan="2">Option</td>
<td>Collapsed</td>
<td>Trigger element</td>
<td>Opens the bib.</td>
</tr>
<tr>
<td>Expanded</td>
<td>Trigger element</td>
<td>
Advances the <code>focused</code> option to the first enabled option in the list.
</td>
</tr>
<tr>
<td>End</td>
<td>-</td>
<td>Expanded</td>
<td>Trigger element</td>
<td>
Advances the <code>focused</code> option to the last enabled option in the list.
</td>
</tr>
<tr>
<td rowspan="2">Enter</td>
<td rowspan="2">-</td>
<td>
Expanded, without <code>multiSelect</code>
</td>
<td>Trigger element</td>
<td>
The current <code>focused</code> option is selected, closes the bib.
</td>
</tr>
<tr>
<td>
Expanded, with <code>multiSelect</code>
</td>
<td>Trigger element</td>
<td>
The current <code>focused</code> option is toggled, does not close the bib.
</td>
</tr>
<tr>
<td>Home</td>
<td>-</td>
<td>Expanded</td>
<td>Trigger element</td>
<td>
Advances the <code>focused</code> option to the first enabled option in the list.
</td>
</tr>
<tr>
<td rowspan="2">Tab</td>
<td>-</td>
<td>Expanded</td>
<td>Trigger element</td>
<td>
The current <code>focused</code> option is selected.
<div class="note">
<strong>Note:</strong> the page will also navigate to the next focusable element in the tabindex sequence.
</div>
</td>
</tr>
<tr>
<td>Shift</td>
<td>Expanded</td>
<td>Trigger element</td>
<td>
The current <code>focused</code> option is selected.
<div class="note">
<strong>Note:</strong> the page will also navigate to the previous focusable element in the tabindex sequence.
</div>
</td>
</tr>
</tbody>
</table>
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="3" id="keyEventsDropdown">Key Events inherited from Auro-Dropdown</auro-header>
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

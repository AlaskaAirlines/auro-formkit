<auro-header level="1" id="overview">Select: Keyboard behavior</auro-header>
<div class="contentWrapper">
<nav>
<auro-nav anchorNavContent=".scrollWrapper">
<!-- <span slot="label">Anchor Navigation</span> -->
<span slot="mobileToggleCollapsed">View more</span>
<span slot="mobileToggleExpanded">View less</span>
<auro-anchorlink fluid href="#tabBehavior">Tab behavior</auro-anchorlink>
<auro-anchorlink fluid href="#keyEvents">Key events</auro-anchorlink>
</auro-nav>
</nav>
<div class="mainContent">
<div class="scrollWrapper">
<auro-header level="2" id="tabBehavior">Tab behavior</auro-header>
<p>The <code>&lt;auro-select></code> component inherits the default tabindex behavior of <code>&lt;auro-dropdown></code> with no modifications.</p>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../dropdown/docs/partials/tabindex.md) -->
<!-- The below content is automatically added from ./../../dropdown/docs/partials/tabindex.md -->
<p>The trigger is a focusable element and participates in the standard tab order, responding to <code>Tab</code> and <code>Shift+Tab</code> key events per <auro-hyperlink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/tabindex">native browser behavior</auro-hyperlink>: these keys move through the page's tab sequence.</p>
<p>When the component is <code>disabled</code>, the trigger stays in the tab sequence but can't open the bib.</p>
<p>While the bib is collapsed, its content isn't in the tab sequence. When the bib <strong>expands</strong>, focus moves to the first focusable element in it, and its focusable elements join the natural tab order. In fullscreen mode, focus stays in the bib, and <code>Tab</code> cycles through its focusable elements until the bib closes or the screen grows wider than the <code>fullscreenBreakpoint</code> width.</p>
<p>When <code>desktopModal</code> is set, focus also stays in the bib when it isn't fullscreen. The dropdown makes the rest of the page <code>inert</code>, so people can't interact with content outside the dropdown until it closes.</p>
<!-- AURO-GENERATED-CONTENT:END -->
<p>Apart from the close button in the fullscreen bib, the <code>&lt;auro-select></code> bib content has no focusable elements.</p>
<div class="note">
<strong>Note:</strong> The following native <code>&lt;select&gt;</code> keyboard behavior isn't supported in <code>&lt;auro-select multiSelect></code>:
<ul>
<li><strong>Extending selection (Shift+Arrow)</strong></li>
<li><strong>Select all (Cmd+A):</strong> Select all options</li>
</ul>
</div>
<auro-header level="2" id="keyEvents">Key events</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/keyboard-behavior/keyEvents.md) -->
<!-- The below content is automatically added from ./../docs/partials/keyboard-behavior/keyEvents.md -->
<div class="note">
<p><strong>Note:</strong> The "Focused element" column below indicates the initial <code>event.target</code>: the element that has DOM focus when the key is pressed. The select's keyboard strategy listener is attached once to the <code>&lt;auro-select&gt;</code> host; it receives events via composed bubbling regardless of display mode. When the bib is displayed as a fullscreen dialog (see <code>fullscreenBreakpoint</code>), focus moves to the dialog's close button rather than remaining on the trigger, but keydown events still bubble across the shadow-root boundary up to the host listener, and <code>aria-activedescendant</code> continues to track the active option. In this table, an "enabled option" is one that isn't <code>disabled</code>, <code>hidden</code>, or <code>static</code>. Navigation and type-ahead skip all other options.</p>
</div>
<table>
<thead>
<tr>
<th>Key</th>
<th>Modifier</th>
<th>Current state</th>
<th>Focused element</th>
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
            Moves the active option to the next enabled option in the list. If the active option is the last enabled option, it wraps to the first enabled option.
</td>
</tr>
<tr>
<td rowspan="2">Alt (Option)</td>
<td>Collapsed</td>
<td>Trigger element</td>
<td>Opens the bib.</td>
</tr>
<tr>
<td>Expanded</td>
<td>Trigger element</td>
<td>
            Moves the active option to the last enabled option in the list.
</td>
</tr>
<tr>
<td rowspan="2">Control</td>
<td>Collapsed</td>
<td>Trigger element</td>
<td>
            Opens the bib.
<div class="note">
<strong>Note:</strong> On macOS, <code>Control</code> + arrow key combinations are reserved by the operating system for Mission Control and Application Windows. macOS users should use <code>Alt</code> instead.
</div>
</td>
</tr>
<tr>
<td>Expanded</td>
<td>Trigger element</td>
<td>
            Moves the active option to the last enabled option in the list.
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
            Moves the active option to the previous enabled option in the list. If the active option is the first enabled option, it wraps to the last enabled option.
</td>
</tr>
<tr>
<td rowspan="2">Alt (Option)</td>
<td>Collapsed</td>
<td>Trigger element</td>
<td>Opens the bib.</td>
</tr>
<tr>
<td>Expanded</td>
<td>Trigger element</td>
<td>
            Moves the active option to the first enabled option in the list.
</td>
</tr>
<tr>
<td rowspan="2">Control</td>
<td>Collapsed</td>
<td>Trigger element</td>
<td>
            Opens the bib.
<div class="note">
<strong>Note:</strong> On macOS, <code>Control</code> + arrow key combinations are reserved by the operating system for Mission Control and Application Windows. macOS users should use <code>Alt</code> instead.
</div>
</td>
</tr>
<tr>
<td>Expanded</td>
<td>Trigger element</td>
<td>
            Moves the active option to the first enabled option in the list.
</td>
</tr>
<tr>
<td rowspan="2">End</td>
<td rowspan="2">-</td>
<td>Collapsed</td>
<td>Trigger element</td>
<td>
            Opens the bib and moves the active option to the last enabled option in the list.
</td>
</tr>
<tr>
<td>Expanded</td>
<td>Trigger element</td>
<td>
            Moves the active option to the last enabled option in the list.
</td>
</tr>
<tr>
<td rowspan="3">Enter</td>
<td rowspan="3">-</td>
<td>Collapsed</td>
<td>Trigger element</td>
<td>Opens the bib. Doesn't submit a parent form.</td>
</tr>
<tr>
<td>Expanded, without <code>multiSelect</code></td>
<td>Trigger element</td>
<td>
            Selects the <code>active</code> option and closes the bib.
</td>
</tr>
<tr>
<td>Expanded, with <code>multiSelect</code></td>
<td>Trigger element</td>
<td>
            Selects or deselects the <code>active</code> option. The bib stays open so you can select more options.
</td>
</tr>
<tr>
<td rowspan="3">Escape</td>
<td rowspan="3">-</td>
<td>Collapsed</td>
<td>Trigger element</td>
<td>
            Clears the type-ahead buffer. No other change; the event is allowed to bubble so an ancestor dialog or drawer may still handle it.
</td>
</tr>
<tr>
<td>Expanded</td>
<td>Trigger element</td>
<td>
            Clears the type-ahead buffer and closes the bib. An ancestor dialog, drawer, or popup stays open.
</td>
</tr>
<tr>
<td>Expanded, fullscreen bib</td>
<td>Close button</td>
<td>
            Clears the type-ahead buffer and closes the bib, as in the popover. Focus returns to the trigger.
</td>
</tr>
<tr>
<td rowspan="2">Home</td>
<td rowspan="2">-</td>
<td>Collapsed</td>
<td>Trigger element</td>
<td>
            Opens the bib and moves the active option to the first enabled option in the list.
</td>
</tr>
<tr>
<td>Expanded</td>
<td>Trigger element</td>
<td>
            Moves the active option to the first enabled option in the list.
</td>
</tr>
<tr>
<td rowspan="2">Tab</td>
<td>-</td>
<td>Expanded</td>
<td>Trigger element</td>
<td>
            Selects the <code>active</code> option, or in <code>multiSelect</code> mode selects or deselects it, and closes the bib. If no option is active, closes the bib without changing the selection.
<div class="note">
<strong>Note:</strong> <code>Tab</code> doesn't call <code>preventDefault()</code>, so the browser continues to move focus to the next element in the tabindex sequence after the selection is applied.
</div>
</td>
</tr>
<tr>
<td>Shift</td>
<td>Expanded</td>
<td>Trigger element</td>
<td>
            Same as <code>Tab</code>, but focus moves to the previous element in the tab order.
</td>
</tr>
<tr>
<td rowspan="2">Space</td>
<td rowspan="2">-</td>
<td>Collapsed or expanded, type-ahead buffer active</td>
<td>Trigger element</td>
<td>
            Extends the type-ahead buffer with a space character. When the buffer matches an enabled option's displayed text, the <code>active</code> option moves to that option and the bib opens if it was collapsed. See the <a href="customize.html#typeAhead">Type-ahead</a> section on the Customize page.
</td>
</tr>
<tr>
<td>Collapsed or expanded, type-ahead buffer empty</td>
<td>Trigger element</td>
<td>
            Toggles the bib: opens it when collapsed and closes it when expanded. No selection change occurs.
</td>
</tr>
<tr>
<td>Any printable character (other than Space)</td>
<td>-</td>
<td>Collapsed or expanded</td>
<td>Trigger element</td>
<td>
            Extends the type-ahead buffer. When the buffer matches an enabled option's displayed text, the active option moves to that option and the bib opens if it was collapsed. A keystroke that doesn't match any option leaves the bib state unchanged. Repeated keystrokes within <code>typeaheadTimeoutMs</code> (default 500&nbsp;ms) extend the buffer; pressing the same character repeatedly cycles through matching options. Keys chorded with <code>Ctrl</code>, <code>Meta</code>, or <code>Alt</code> are ignored so browser and OS shortcuts don't leak into the buffer. See the <a href="customize.html#typeAhead">Type-ahead</a> section on the Customize page.
</td>
</tr>
</tbody>
</table>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
</div>

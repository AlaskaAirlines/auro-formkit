<auro-header level="1" id="overview">Counter and counter group: Keyboard behavior</auro-header>
<div class="contentWrapper">
<div class="mainContent">
<div class="scrollWrapper">
<auro-header level="2" id="tabBehavior">Tab behavior</auro-header>
<auro-header level="3" id="tabBehaviorCounter">Counter</auro-header>
<p>The counter is a single tab stop. Its minus and plus buttons aren't in the tab order; use the Up Arrow and Down Arrow keys to change the value.</p>
<auro-header level="3" id="tabBehaviorCounterGroup">Counter group</auro-header>
<p>When a counter group has the <code>isDropdown</code> attribute, it behaves as an <code>auro-dropdown</code>. The trigger element renders the counter group label and a summary of each counter's current value and label. The dropdown bib renders all counters inside of the group.</p>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../dropdown/docs/partials/tabindex.md) -->
<!-- The below content is automatically added from ./../../dropdown/docs/partials/tabindex.md -->
<p>The trigger is a focusable element and participates in the standard tab order, responding to <code>Tab</code> and <code>Shift+Tab</code> key events per <auro-hyperlink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/tabindex">native browser behavior</auro-hyperlink>: these keys move through the page's tab sequence.</p>
<p>When the component is <code>disabled</code>, the trigger stays in the tab sequence but can't open the bib.</p>
<p>While the bib is collapsed, its content isn't in the tab sequence. When the bib <strong>expands</strong>, focus moves to the first focusable element in it, and its focusable elements join the natural tab order. In fullscreen mode, focus stays in the bib, and <code>Tab</code> cycles through its focusable elements until the bib closes or the screen grows wider than the <code>fullscreenBreakpoint</code> width.</p>
<p>When <code>desktopModal</code> is set, focus also stays in the bib when it isn't fullscreen. The dropdown makes the rest of the page <code>inert</code>, so people can't interact with content outside the dropdown until it closes.</p>
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="2" id="keyEvents">Key events</auro-header>
<auro-header level="3" id="keyEventsCounter">Counter</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/keyEvents-counter.md) -->
<!-- The below content is automatically added from ./../docs/partials/keyEvents-counter.md -->
<table>
<thead>
<tr>
<th>Key</th>
<th>Modifier</th>
<th>Current state</th>
<th>Focus element</th>
<th>Behavior</th>
</tr>
</thead>
<tbody>
<tr>
<td>ArrowDown</td>
<td>-</td>
<td>*</td>
<td>
            Counter.
</td>
<td>Decreases the value by 1, unless the counter is disabled or at its minimum.</td>
</tr>
<tr>
<td>ArrowUp</td>
<td>-</td>
<td>*</td>
<td>
            Counter.
</td>
<td>Increases the value by 1, unless the counter is disabled or at its maximum.</td>
</tr>
</tbody>
</table>
<!-- AURO-GENERATED-CONTENT:END -->
<div class="note">
<p><strong>Note:</strong> The counter doesn't currently support the following keys:</p>
<ul>
<li><strong>Home:</strong> Sets the value to the minimum, <code>min</code> (0 by default).</li>
<li><strong>End:</strong> Sets the value to the maximum, <code>max</code> (9 by default).</li>
<li><strong>PageUp:</strong> (optional) Increases the value by a larger step than Up Arrow.</li>
<li><strong>PageDown:</strong> (optional) Decreases the value by a larger step than Down Arrow.</li>
</ul>
</div>
<auro-header level="3" id="keyEventsCounterGroup">Counter group</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/keyEvents-counterGroup.md) -->
<!-- The below content is automatically added from ./../docs/partials/keyEvents-counterGroup.md -->
<p>The counter group adds two key handlers to the ones it inherits from the dropdown component. <strong>Escape</strong> closes the open bib without also closing a dialog or drawer the group sits in. In a bib that isn't fullscreen, <strong>Shift+Tab</strong> on the first counter closes the bib and moves focus to whatever comes before the group on the page. When the bib opens as a popover, focus doesn't currently move into it and stays on the trigger. When the bib opens fullscreen, focus moves to its close button. When <strong>Escape</strong> closes the bib, focus moves back to the trigger.</p>
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="4" id="keyEventsDropdown">Key events inherited from auro-dropdown</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../dropdown/docs/partials/keyEvents.md) -->
<!-- The below content is automatically added from ./../../dropdown/docs/partials/keyEvents.md -->
<table>
<thead>
<tr>
<th>Key</th>
<th>Modifier</th>
<th>Current state</th>
<th>Focus element</th>
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
            Trigger or any <strong>focusable</strong> element within the trigger, except an <code>&lt;input&gt;</code>.
</td>
<td>Opens the bib.</td>
</tr>
<tr>
<td>-</td>
<td>Expanded</td>
<td>
            Trigger or any <strong>focusable</strong> element within the trigger, except an <code>&lt;input&gt;</code>.
</td>
<td>Closes the bib.</td>
</tr>
</tbody>
</table>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
</div>

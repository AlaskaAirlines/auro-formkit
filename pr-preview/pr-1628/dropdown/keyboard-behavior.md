<auro-header level="2" id="keyboardBehavior">Dropdown keyboard behavior</auro-header>
<auro-header level="3" id="tabBehavior">Tab behavior</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/tabindex.md) -->
<!-- The below content is automatically added from ./../docs/partials/tabindex.md -->
<p>The trigger is a focusable element and participates in the standard tab order, responding to <code>Tab</code> and <code>Shift+Tab</code> key events per <auro-hyperlink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/tabindex">native browser behavior</auro-hyperlink>: these keys move through the page's tab sequence.</p>
<p>When the component is <code>disabled</code>, the trigger stays in the tab sequence but can't open the bib.</p>
<p>While the bib is collapsed, its content isn't in the tab sequence. When the bib <strong>expands</strong>, focus moves to the first focusable element in it, and its focusable elements join the natural tab order. In fullscreen mode, focus stays in the bib, and <code>Tab</code> cycles through its focusable elements until the bib closes or the screen grows wider than the <code>fullscreenBreakpoint</code> width.</p>
<p>When <code>desktopModal</code> is set, focus also stays in the bib when it isn't fullscreen. The dropdown makes the rest of the page <code>inert</code>, so people can't interact with content outside the dropdown until it closes.</p>
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="3" id="keyEvents">Key events</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/keyEvents.md) -->
<!-- The below content is automatically added from ./../docs/partials/keyEvents.md -->
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
